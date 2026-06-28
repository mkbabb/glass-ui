import { readFileSync } from "node:fs";
// Independent re-parse: strip comments, collapse multiline export blocks, extract every named symbol.
function parse(file) {
  let src = readFileSync(file, "utf8");
  // strip block comments and line comments
  src = src.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\/\/[^\n]*/g, "");
  const syms = [];
  // match: export [type] { ... } from "..."   (single or multi line)
  const re = /export\s+(?:type\s+)?\{([^}]*)\}\s*from\s*["'][^"']+["']/g;
  let m;
  while ((m = re.exec(src))) {
    for (let part of m[1].split(",")) {
      part = part.trim();
      if (!part) continue;
      // handle "X as Y" -> exported name is Y
      const asMatch = part.match(/\bas\s+(\w+)/);
      const name = asMatch ? asMatch[1] : part.replace(/^type\s+/, "").trim();
      if (name) syms.push(name);
    }
  }
  // also single-symbol form export type X from? (none expected) ; and bare value exports inside the export { } at line 36
  return syms;
}
const idx = parse("src/api/index.ts");
const extra = parse("src/api/types-extra.ts");
const all = [...idx, ...extra];
const counts = {};
for (const s of all) counts[s] = (counts[s]||0)+1;
const dups = Object.entries(counts).filter(([,c])=>c>1);
const unique = Object.keys(counts);
console.log("index.ts named symbols:", idx.length);
console.log("types-extra.ts named symbols:", extra.length);
console.log("TOTAL named:", all.length, "UNIQUE:", unique.length);
console.log("DUPLICATES (appear >1x):", JSON.stringify(dups));
// load the migration rows
const rows = JSON.parse(readFileSync("/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/b6d23e41-2f2a-4407-ba89-e126e9497583/scratchpad/bh-research/proto/api-migration-rows.json","utf8"));
const mapSyms = new Set(rows.map(r=>r.symbol));
const mine = new Set(unique);
const inMineNotMap = [...mine].filter(s=>!mapSyms.has(s));
const inMapNotMine = [...mapSyms].filter(s=>!mine.has(s));
console.log("migration-map symbol count:", mapSyms.size);
console.log("IN MY-PARSE NOT IN MAP:", JSON.stringify(inMineNotMap));
console.log("IN MAP NOT IN MY-PARSE:", JSON.stringify(inMapNotMine));
