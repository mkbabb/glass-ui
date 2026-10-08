#!/usr/bin/env node
// sfc-split.mjs <linked worktree> keep|value — pass 6 · P6-F1's plant: the route's own
// Timeline → TimelineMarks SFC split (pass-5 frozen row S39-03, B-S11) applied to HEAD.
//   keep   the split as the route wrote it: the marks list, its logic and every scoped rule
//          whose subject is inside the list leave Timeline.vue for TimelineMarks.vue, values kept
//   value  the same split with one value changed under the re-homed scope
//          (`.tl__check path { stroke-width: 3 }` → 4 in TimelineMarks.vue)
// HEAD's Timeline.vue differs from the route's S39 input in one hunk only, its imports (the
// route's earlier steps re-pointed them through the motion door); that hunk is re-written to
// HEAD's import lines, and TimelineMarks.vue imports useLiquidPress by HEAD's path. The
// route's colocated contract test is not in HEAD and is not planted: the plant judges CSS.
// Every other hunk applies verbatim and must match exactly once. Refuses the main checkout.
import { execFileSync } from "node:child_process";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const [wtArg, mode] = process.argv.slice(2);
if (!wtArg || !["keep", "value"].includes(mode)) { console.error("usage: sfc-split.mjs <wt> keep|value"); process.exit(2); }
const wt = resolve(wtArg);
const git = (...a) => execFileSync("git", ["-C", wt, ...a], { encoding: "utf8" }).trim();
if (resolve(wt, git("rev-parse", "--git-dir")) === resolve(wt, git("rev-parse", "--git-common-dir"))) { console.error("sfc-split.mjs refuses the main checkout"); process.exit(2); }

const HERE = dirname(fileURLToPath(import.meta.url));
const row = JSON.parse(readFileSync(join(HERE, "../../pass-5/B-kit/frozen/S39-03-src-03-timeline.json"), "utf8"));
const TL = "src/components/timeline/Timeline.vue";
const MARKS = "src/components/timeline/TimelineMarks.vue";
const GEO = "src/components/timeline/geometry.ts";

const once = (text, from, to, where) => {
    const n = text.split(from).length - 1;
    if (n !== 1) throw new Error(`sfc-split: ${where}: expected 1 match, found ${n} for ${JSON.stringify(from.slice(0, 80))}`);
    return text.replace(from, () => to);
};
// the one translated hunk: the route's door spellings → HEAD's import of useLiquidPress dropped
const IMPORT_FROM = 'import { useLiquidPress } from "../../composables/motion/spring/useLiquidPress";\n';
let tl = readFileSync(join(wt, TL), "utf8");
tl = once(tl, IMPORT_FROM, "", `${TL} (hunk 0, translated)`);
row.files[TL].hunks.slice(1).forEach(([from, to], i) => { tl = once(tl, from, to, `${TL} hunk ${i + 1}`); });
let geo = readFileSync(join(wt, GEO), "utf8");
row.files[GEO].hunks.forEach(([from, to], i) => { geo = once(geo, from, to, `${GEO} hunk ${i}`); });
let marks = once(row.files[MARKS].create, 'import { useLiquidPress } from "../../composables/motion";\n', 'import { useLiquidPress } from "../../composables/motion/spring/useLiquidPress";\n', `${MARKS} import`);
if (mode === "value") marks = once(marks, "        stroke-width: 3;\n", "        stroke-width: 4;\n", `${MARKS} value`);
writeFileSync(join(wt, TL), tl);
writeFileSync(join(wt, GEO), geo);
writeFileSync(join(wt, MARKS), marks);
console.log(`sfc-split ${mode}: ${TL} ${tl.split("\n").length} lines, ${MARKS} created (${marks.length} B)${mode === "value" ? ", stroke-width 3 → 4 under TimelineMarks" : ""}`);
