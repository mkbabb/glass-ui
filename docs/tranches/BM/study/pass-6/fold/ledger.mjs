// BM pass 6's fold (B5-10, A5-14): the mark's bytes with its input, both sides. The additions are the amended
// sketches, comments stripped; the writer bundled alone with rolldown and minified, its player and estimator external
// (the player is §4.7's 655 B; keyframes.js's estimator replaces useDragVelocity's 809 B). The removals are pass 1's
// measurements. Every figure is a standalone gzip -9: an upper bound on both sides, so no net is claimed.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-6/fold/ledger.mjs
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
  added: { "mark.next.css (the mark, its window form, the options' ink, plate and press, the forced-colours and more-contrast edges)": gz(css), "selectionMark.next.ts (the writer with its input: press, follow, release, cancel, tap, keys; player and estimator external)": gz(output[0].code) },
  removed_pass1: { useSelectionIndicator: row("useSelectionIndicator"), useDockRunMark: row("useDockRunMark"), "run mark rules (run.css)": row("run mark rules"), "useDragMorph (the follow and snap under useTabDragMorph)": row("useDragMorph") },
};
writeFileSync(path.join(HERE, "ledger.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out));
