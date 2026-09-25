#!/usr/bin/env node
// rung.mjs <tree> a|b — the two planted rung moves of the P4-F7 battery, as exact-text edits
// (each asserts one match). They are the two rungs route B's S4b moved (pass-3 B-kit
// derive/rungs.mjs), re-planted on HEAD's layout:
//   a  card/scroll.css joins card's rung (after card/styles.css): a listed reorder the law
//      must ACCEPT when no swapped pair can change a value
//   b  chip/accent-tone.css moves after glass/glass-chip.css: the reorder cB-R9 measured,
//      `.glass-chip` and `.accent-tone` both declare --accent-band-strength in one layer at
//      (0,1,0) and co-occur in chipVariants.ts, so 22%/25% becomes 18%. It must be REFUSED,
//      naming the pair, unless a band spec that reads it ran.
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
if (which === "a") {
    once("src/styles/index.css", `@import "../components/card/scroll.css";\n`, "");
    once("src/styles/index.css", `@import "../components/card/styles.css";\n`, `@import "../components/card/styles.css";\n@import "../components/card/scroll.css";\n`);
} else if (which === "b") {
    once("src/styles/glass.css", `@import "../components/chip/accent-tone.css";\n`, "");
    once("src/styles/glass.css", `@import "./glass/glass-chip.css";\n`, `@import "./glass/glass-chip.css";\n@import "../components/chip/accent-tone.css";\n`);
} else throw new Error("rung.mjs <tree> a|b");
console.log(`rung ${which} planted in ${root}`);
