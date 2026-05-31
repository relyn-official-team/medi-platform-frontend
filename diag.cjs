const ts = require("typescript");
const fs = require("fs");
const f = "app/customerinquiry/CustomerInquiryClient.tsx";
const src = fs.readFileSync(f, "utf8");
const sf = ts.createSourceFile(f, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TSX);
const diags = sf.parseDiagnostics || [];
console.log("parseDiagnostics:", diags.length);
diags.slice(0,8).forEach(d=>{
  const p = sf.getLineAndCharacterOfPosition(d.start);
  console.log(`  line ${p.line+1}:${p.character+1}  ${ts.flattenDiagnosticMessageText(d.messageText,"\n")}`);
});
