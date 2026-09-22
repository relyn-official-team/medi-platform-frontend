import { createHash } from "node:crypto";
import { mkdir, readdir, unlink, writeFile } from "node:fs/promises";
import path from "node:path";
import { setTimeout as delay } from "node:timers/promises";
import { isArticleReactionPage, type ArticleReactionPage } from "./article-reaction-pages";

export type ArticleReactionSnapshot = { count: number; liked: boolean };

function hasCode(error: unknown, code: string) {
  return error instanceof Error && "code" in error && error.code === code;
}

// One empty marker per anonymous browser and article. Exclusive creation and
// idempotent deletion avoid shared JSON read/modify/write races across workers.
// The count is derived from the markers, never accepted from a browser.
export function createArticleReactionStore(directory: string) {
  const root = path.resolve(directory);

  function location(page: ArticleReactionPage, visitor: string) {
    if (!isArticleReactionPage(page) || !/^[a-f0-9]{64}$/.test(visitor)) {
      throw new Error("Invalid article reaction identity");
    }
    const file = `${createHash("sha256").update(`relyn-article:${visitor}`).digest("hex")}.like`;
    return { directory: path.join(root, page), file };
  }

  async function read(page: ArticleReactionPage, visitor: string): Promise<ArticleReactionSnapshot> {
    const target = location(page, visitor);
    // Also detects an unusable parent path (Windows can report ENOENT rather
    // than ENOTDIR when a configured parent is actually a regular file).
    await mkdir(target.directory, { recursive: true, mode: 0o700 });
    try {
      const entries = await readdir(target.directory, { withFileTypes: true });
      const votes = entries.filter(entry => entry.isFile() && /^[a-f0-9]{64}\.like$/.test(entry.name));
      return { count: votes.length, liked: votes.some(entry => entry.name === target.file) };
    } catch (error) {
      if (hasCode(error, "ENOENT")) return { count: 0, liked: false };
      throw error;
    }
  }

  async function set(page: ArticleReactionPage, visitor: string, liked: boolean) {
    const target = location(page, visitor);
    if (typeof liked !== "boolean") throw new Error("Invalid reaction state");
    if (liked) {
      await mkdir(target.directory, { recursive: true, mode: 0o700 });
      try {
        await writeFile(path.join(target.directory, target.file), "", { flag: "wx", mode: 0o600 });
      } catch (error) {
        if (!hasCode(error, "EEXIST")) throw error;
      }
    } else {
      for (let attempt = 0; ; attempt++) {
        try {
          await unlink(path.join(target.directory, target.file));
          break;
        } catch (error) {
          if (hasCode(error, "ENOENT")) break;
          // Concurrent deletes can briefly return EPERM/EBUSY on Windows.
          if (attempt >= 3 || (!hasCode(error, "EPERM") && !hasCode(error, "EBUSY"))) throw error;
          await delay(20 * (attempt + 1));
        }
      }
    }
    return read(page, visitor);
  }

  return { read, set };
}

export function getArticleReactionStore() {
  const configuredDirectory = process.env.ARTICLE_LIKES_DATA_DIR;
  if (process.env.VERCEL && !configuredDirectory) {
    throw new Error("Article reactions require persistent writable storage");
  }
  return createArticleReactionStore(configuredDirectory || path.join(process.cwd(), ".data", "article-likes"));
}
