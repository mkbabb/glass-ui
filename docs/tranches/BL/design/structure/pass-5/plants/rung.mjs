#!/usr/bin/env node
// rung.mjs <tree> a|c — the planted rung moves of the P5-F3 plant, as exact-text edits (each
// asserts one match):
//   a  card/scroll.css joins card's rung (after card/styles.css): pass 4's safe listed rung
//      (pass-4/plants/rung.mjs a), the rung a route reviewed and listed
//   c  music-staff/styles.css moves after scroll-progress-rim/styles.css: a second reorder in
//      the same entry (./styles) that no one reviewed. No swapped pair of it shares a property
//      on co-occurring classes, so FD-4's pair judge alone reads it safe; only a listing
//      that names the rule set it reviewed sees it as outside the rung (P5-F3, cB4 §5.2)
import { readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const [root, which] = process.argv.slice(2);
const once = (file, from, to) => {
    const p = join(root, file);
    const t = readFileSync(p, "utf8");
    const n = t.split(from).length - 1;
    if (n !== 1) throw new Error(`rung ${which}: ${file}: ${n} matches for ${JSON.stringify(from.slice(0, 60))}`);
    writeFileSync(p, t.replace(from, () => to));
};
const move = (file, line, after) => {
    once(file, `${line}\n`, "");
    once(file, `${after}\n`, `${after}\n${line}\n`);
};
if (which === "a") move("src/styles/index.css", `@import "../components/card/scroll.css";`, `@import "../components/card/styles.css";`);
else if (which === "c") move("src/styles/index.css", `@import "../components/music-staff/styles.css";`, `@import "../components/scroll-progress-rim/styles.css";`);
else throw new Error("rung.mjs <tree> a|c");
console.log(`rung ${which} planted in ${root}`);
