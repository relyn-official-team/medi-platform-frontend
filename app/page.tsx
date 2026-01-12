async function getData() {
  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://127.0.0.1:3000";

  const res = await fetch(`${baseUrl}/api/proxy/health`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("API proxy fetch failed");
  }

  return res.json();
}

export default async function Home() {
  const data = await getData();

  return (
    <main className="p-8">
      <h1 className="text-2xl font-bold mb-4">
        Medi Platform Front (Next.js)
      </h1>
      <pre className="bg-gray-100 p-4 rounded">
        {JSON.stringify(data, null, 2)}
      </pre>
    </main>
  );
}
