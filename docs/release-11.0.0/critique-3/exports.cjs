const ts = require("/Users/mkbabb/Programming/glass-ui/node_modules/typescript");
const path = require("path");
const root = process.argv[2];
const pkg = require(path.join(root, "package.json"));
const files = {};
for (const [k, v] of Object.entries(pkg.exports)) {
  const t = typeof v === "string" ? null : (v.types || (v.import && v.import.types));
  if (t && t.endsWith(".d.ts")) files[k] = path.join(root, t);
}
const prog = ts.createProgram(Object.values(files), { noEmit: true, skipLibCheck: true, moduleResolution: ts.ModuleResolutionKind.Bundler, module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2022, allowJs: false });
const chk = prog.getTypeChecker();
const out = {};
for (const [k, f] of Object.entries(files)) {
  const sf = prog.getSourceFile(f); if (!sf) { out[k] = ["<missing>"]; continue; }
  const sym = chk.getSymbolAtLocation(sf); out[k] = sym ? chk.getExportsOfModule(sym).map(s => s.name).sort() : [];
}
console.log(JSON.stringify(out));
