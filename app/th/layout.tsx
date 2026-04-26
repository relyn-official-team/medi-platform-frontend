export default function ThLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='th'" }} />
      {children}
    </>
  );
}
