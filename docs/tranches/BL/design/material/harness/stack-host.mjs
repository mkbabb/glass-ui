#!/usr/bin/env node
// STACK · Every grasp host forms a stacking context (H3-11). A host that mounts the grasp carriers keeps them, at
// z-index −1, inside itself only if it forms a stacking context; otherwise the held veil drops behind an opaque ancestor.
// The unit arm pass 2 shipped (A′, `glass-subtlety.test.ts:1100-1113`) accepted any `z-index` digit on the host, and a
// z-index on a non-positioned element that is not a flex or grid item forms none (A′ critique §3.4). This check reads
// the host in paint conditions: computed style in the held cells (capture.mjs GEOM `stacking`: the root; position fixed
// or sticky; positioned with z-index; a flex or grid item with z-index; opacity < 1; transform, scale, rotate,
// translate, filter, backdrop-filter, clip-path, mask, perspective; mix-blend-mode; isolation; contain layout, paint,
// strict or content; container-type; will-change of one of those). Every host of every held surface, both themes,
// black, white and c1. A held cell with no grasp host is a FAIL row (the hold never mounted the carriers).
//   node stack-host.mjs <capdir> [--gate chromium[,webkit]]
import { cli, loadCapture, gateEngines, report, tag, THEMES, SCENE_GROUNDS } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = gateEngines(a);
const { have, lines, missing } = need(cap, gate, { themes: THEMES, grounds: SCENE_GROUNDS.held, scenes: ["held"] });
const t = tally(); t.add(true, false, missing);
for (const { cell, gated } of have) {
  const hosts = cell.specs.flatMap((s) => (s.hosts || []).map((h) => ({ spec: s.id, ...h })));
  if (!hosts.length) { t.add(gated, false); lines.push(`${tag(cell)}: no grasp host mounted ✗`); continue; }
  const parts = hosts.map((h) => { const ok = h.stack.forms; t.add(gated, ok);
    return `${h.spec} host .${h.cls}: ${ok ? "forms (" + h.stack.why.slice(0, 2).join(", ") + ")" : `forms none (position ${h.stack.position}, z-index ${h.stack.zIndex}, parent ${h.stack.parentDisplay}) ✗`}`; });
  lines.push(`${tag(cell)}${gated ? "" : " [info]"}: ${parts.join(" · ")}`);
}
report(cap, { id: "STACK", title: "every grasp host forms a stacking context (computed, in the held cells; a z-index digit alone is not one)", lines, ...t, gate });
