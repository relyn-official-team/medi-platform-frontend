export default function JaLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <script dangerouslySetInnerHTML={{ __html: "document.documentElement.lang='ja'" }} />
      {children}
    </>
  );
}
