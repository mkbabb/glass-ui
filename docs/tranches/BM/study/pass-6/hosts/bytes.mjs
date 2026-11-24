// BM pass 6: the bytes of the host pieces §8 removes or replaces, by pass 1's method: each module bundled alone from
// glass-ui master's src with rolldown, minified, every import outside it external, standalone gzip -9 (an upper bound).
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-6/hosts/bytes.mjs
import { writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { rolldown } from "rolldown";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const SRC = "/Users/mkbabb/Programming/glass-ui/src";
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const one = async (rel) => {
  const f = path.join(SRC, rel);
  const b = await rolldown({ input: f, external: (id) => id !== f, logLevel: "silent" });
  const { output } = await b.generate({ format: "esm", minify: true }); await b.close();
  return gz(output[0].code);
};
const out = { at: new Date().toISOString(), rows: {} };
for (const rel of ["composables/motion/morph/useLeadTrail.ts", "components/pager-dots/worm.ts", "components/tabs/composables/useTabDragMorph.ts", "composables/dom/useDragVelocity.ts"]) out.rows[rel] = await one(rel);
writeFileSync(path.join(HERE, "bytes.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
