#!/usr/bin/env node
// tokens-door.mjs — B-S4 row: `src/styles/tokens/index.ts` is the `./tokens` entry and a pure door
// (B14): it re-exports the leaf `tokens.ts` (the scale constants) and `manifest.ts`; the leaf's two
// re-export lines (relays through its own door) are deleted; the record names the door as the
// entry source and drops it from `doors`. The published name set is unchanged.
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
const args = process.argv.slice(2);
const root = resolve(args[args.indexOf("--root") + 1]);
const out = args[args.indexOf("--out") + 1];
const R = "docs/tranches/BL/design/structure/floor/records/entry-record.json";
const read = (p) => readFileSync(join(root, p), "utf8");
const leaf = read("src/styles/tokens/tokens.ts");
const relays = ['export { tokenDomains, semanticTokens } from "./index";\n', 'export type { TokenDomain, SemanticToken } from "./index";\n'];
for (const r of relays) if (!leaf.includes(r)) throw new Error(`missing ${r}`);
const own = [...leaf.matchAll(/^export const (\w+)/gm)].map((m) => m[1]);
const door = `// styles/tokens — the \`./tokens\` entry: the scale constants and the token manifest.\nexport { ${own.join(", ")} } from "./tokens";\nexport { semanticTokens, tokenDomains } from "./manifest";\nexport type { SemanticToken, TokenDomain } from "./manifest";\n`;
const rec = read(R);
const rec2 = rec.replace('["tokens","src/styles/tokens/tokens.ts"]', '["tokens","src/styles/tokens/index.ts"]').replace(/,\n\s*"src\/styles\/tokens\/index\.ts"/, "");
if (rec2 === rec || rec2.includes('"src/styles/tokens/index.ts"\n')) throw new Error("record edit failed");
const files = {
    "src/styles/tokens/tokens.ts": { before: leaf, after: relays.reduce((t, r) => t.replace(r, ""), leaf).replace(/\n+$/, "\n") },
    "src/styles/tokens/index.ts": { before: read("src/styles/tokens/index.ts"), after: door },
    [R]: { before: rec, after: rec2 },
};
writeFileSync(out, `${JSON.stringify({ step: "B-S4 tokens entry door", files }, null, 1)}\n`);
console.log(door);
