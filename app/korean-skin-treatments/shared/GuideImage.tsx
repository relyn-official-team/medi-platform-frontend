import type { ImgHTMLAttributes } from "react";
import { guideImages } from "./image-manifest";

type Props = Omit<ImgHTMLAttributes<HTMLImageElement>, "src" | "srcSet" | "alt"> & { src: string; alt: string };

// Match the shared article column, including the tablet sidebar breakpoint.
export const articleImageSizes = "(max-width: 600px) calc(100vw - 40px), (max-width: 808px) calc(100vw - 60px), (max-width: 920px) 748px, (max-width: 1150px) calc(100vw - 292px), 748px";

export default function GuideImage({ src, alt, sizes = articleImageSizes, loading = "lazy", decoding = "async", ...props }: Props) {
  const image = guideImages[src];
  const fallback = image?.variants.find(variant => variant.width >= 768) ?? image?.variants.at(-1);
  // Already resized/encoded at authoring time: no first-request image optimizer or client JS is needed.
  // eslint-disable-next-line @next/next/no-img-element
  return <img {...props} src={fallback?.src ?? src} alt={alt} width={props.width ?? image?.width} height={props.height ?? image?.height}
    srcSet={image?.variants.map(variant => `${variant.src} ${variant.width}w`).join(", ")}
    sizes={sizes} loading={loading} decoding={decoding} />;
}
