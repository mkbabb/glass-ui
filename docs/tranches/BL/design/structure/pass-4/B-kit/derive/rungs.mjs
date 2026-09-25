#!/usr/bin/env node
// rungs.mjs — DERIVE step B-S4b (LAW §6): the one rung move the one-door rule forces.
//
// card/scroll.css. B3: one door per unit, so card's two sheets join the cascade at one
// rung, card's own (after dock). card/scroll.css writes the .card-scroll-host and
// [data-shrink] header rules; it is a LISTED reorder, judged pair by pair by the floor's
// FD-4 (cascade.mjs verify --reorders, P4-F7): a swapped pair that shares a declared
// property in one layer at one specificity on co-occurring classes is a risk.
// (Pass 3's accent-tone rung is withdrawn, REGISTRY §P3-5: the sheet moves into the glass
// module that loads it at S4a and keeps its HEAD rung, so no order changes for it.)
// The row is exact text (lib/row.mjs), computed from the tree, frozen and recorded.
//   node derive/rungs.mjs --root <wt> --out frozen/S4b-rungs.json
import { readFileSync, writeFileSync } from "node:fs";
import { join, resolve } from "node:path";
import { arg } from "../lib/floor.mjs";
import { applyRow, makeRow } from "../lib/row.mjs";
import { KIT, recordStep } from "../lib/sequence.mjs";

const args = process.argv.slice(2);
const root = resolve(arg(args, "--root"));
const read = (f) => readFileSync(join(root, f), "utf8");
const once = (text, needle, what) => { const n = text.split(needle).length - 1; if (n !== 1) throw new Error(`rungs: ${what}: ${n} matches`); };

const AGG = "src/styles/index.css";
let agg = read(AGG);

const cardScroll = `/* Component-owned real-box contraction for <CardHeader shrink>, and the scroll
   owner + edge feather it requires. */
@import "../components/card/scroll.css";
`;
once(agg, cardScroll, "card/scroll.css rung");
agg = agg.replace(cardScroll, "");
const cardAt = `@import "../components/card/styles.css";\n`;
once(agg, cardAt, "card/styles.css rung");
agg = agg.replace(cardAt, `${cardAt}/* Component-owned real-box contraction for <CardHeader shrink>, and the scroll
   owner + edge feather it requires. It joins card's rung (one door per unit, B3); no
   sheet between here and its old rung (after scroll-choreography) targets its rules. */
@import "../components/card/scroll.css";
`);

const row = makeRow(root, "B-S4b the one rung move the one-door rule forces (LAW §6)", { [AGG]: agg });
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id: "S4b", kind: "row", file, why: "card/scroll.css joins card's rung (B3): a listed reorder, judged pair by pair by FD-4 (P4-F7)" });
