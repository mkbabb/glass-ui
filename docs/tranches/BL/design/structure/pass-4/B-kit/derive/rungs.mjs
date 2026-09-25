#!/usr/bin/env node
// rungs.mjs — DERIVE step B-S4b (LAW §6): the two rung moves the one-door rule forces.
//
// 1. accent-tone. B8: the kernel reads no unit, so the glass door may not import
//    chip/accent-tone.css. P3-R2 places the sheet by its load edge on the door channel: it
//    stays with its sole class consumer (chip) and joins the published cascade where every
//    unit joins it, in the ./styles aggregate, at the end of the glass block. The register
//    writes only the --accent-* custom properties and is their sole writer, so the rung
//    moves no computed value; the floor verifier lists it as a reorder and π checks the band.
// 2. card/scroll.css. B3: one door per unit, so card's two sheets join the cascade at one
//    rung, card's own (after dock). card/scroll.css writes the .card-scroll-host and
//    [data-shrink] header rules, which no sheet between the two rungs targets; the verifier
//    lists the reorder and π checks the card band.
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

const GLASS = "src/styles/glass/index.css";
const AGG = "src/styles/index.css";
let glass = read(GLASS);
let agg = read(AGG);

const accentBlock = `/* The contrast-floored 3-channel tonal-accent register
   (.accent-tone: one --tone → idle/active/edge/ink). AFTER ladder.css (reads the
   warm-cream --card surface the ladder mints); the SOLE writer of the --accent-*
   channels, so the placement is cascade-order-invariant. The register colocates
   with its sole class-consumer at components/chip/; the @import rung is unchanged. */
@import "../../components/chip/accent-tone.css";
`;
once(glass, accentBlock, "accent-tone block in the glass door");
glass = glass.replace(accentBlock, "");
const accentAgg = `@import "./glass/index.css";
/* The contrast-floored 3-channel tonal-accent register (.accent-tone: one --tone →
   idle/active/edge/ink), colocated with its sole class-consumer at components/chip/.
   It joins the cascade here, at the end of the glass block, because the kernel reads
   no unit (B8). It is the SOLE writer of the --accent-* channels, read at use-time,
   so this rung and its old one (after ladder.css) give the same computed values. */
@import "../components/chip/accent-tone.css";
`;
once(agg, `@import "./glass/index.css";\n`, "glass door rung in the aggregate");
agg = agg.replace(`@import "./glass/index.css";\n`, accentAgg);

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

const row = makeRow(root, "B-S4b the two rung moves the one-door rule forces (LAW §6)", { [GLASS]: glass, [AGG]: agg });
const file = arg(args, "--out");
writeFileSync(join(KIT, file), `${JSON.stringify(row, null, 1)}\n`);
console.log(JSON.stringify(applyRow(root, row)));
recordStep(root, { id: "S4b", kind: "row", file, why: "accent-tone joins the cascade in the aggregate after the glass block (B8); card/scroll.css joins card's rung (B3). Both listed reorders, π owed on the chip and card bands" });
