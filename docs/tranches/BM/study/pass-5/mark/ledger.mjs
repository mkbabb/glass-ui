// BM pass 5: the mark's bytes (Q17), both sides. The additions are this pass's sketches, comments stripped, the
// writer bundled alone with rolldown and minified with its player import external (the player is pass 2's 655 B,
// already priced in DESIGN §4.7); the removals are pass 1's measurements (pass-1/ledger/ledger.json). Every figure is
// a standalone gzip -9, an upper bound inside a site's bundle, so no net is claimed: the per-entry net is pass 10's.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-5/mark/ledger.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { rolldown } from "rolldown";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const css = readFileSync(path.join(HERE, "sketch/mark.next.css"), "utf8").replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").replace(/\s*([{}:;,])\s*/g, "$1");
const entry = path.join(HERE, "sketch/selectionMark.next.ts");
const b = await rolldown({ input: entry, external: (id) => id !== entry, logLevel: "silent" });
const { output } = await b.generate({ format: "esm", minify: true }); await b.close();
const p1 = JSON.parse(readFileSync(path.join(HERE, "../../pass-1/ledger/ledger.json"), "utf8")).rows;
const row = (name) => p1.find((r) => r.name.startsWith(name)).gz;
const out = {
  at: new Date().toISOString(),
  added: { "mark.next.css (the window, its fill, the options' ink and hover, the forced-colours and more-contrast rings)": gz(css), "selectionMark.next.ts (the writer, the player external)": gz(output[0].code) },
  removed_pass1: { "useSelectionIndicator": row("useSelectionIndicator"), "useDockRunMark": row("useDockRunMark"), "run mark rules (run.css)": row("run mark rules") },
};
writeFileSync(path.join(HERE, "ledger.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
