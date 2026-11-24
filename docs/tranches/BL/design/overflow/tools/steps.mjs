#!/usr/bin/env node
// steps.mjs <raw.json> [--route r] [--step base|open|variant|stress|long] [--all]
// One line per step: doc width, every non-designed sideways box (scroller or spill
// over 1 px, not ellipsis), every swipe that moved a scrollLeft.
import { readFileSync } from "node:fs";
const [file, ...rest] = process.argv.slice(2);
const o = Object.fromEntries(rest.reduce((a, v, i, all) => (v.startsWith("--") && a.push([v.slice(2), all[i + 1] ?? true]), a), []));
const d = JSON.parse(readFileSync(file, "utf8"));
const tail = (s, n = 2) => (s || "").split(" > ").slice(-n).join(" > ").slice(0, 110);
for (const r of d.routes) {
    if (o.route && !r.route.includes(o.route)) continue;
    for (const s of r.steps) {
        if (o.step && !s.step.startsWith(o.step)) continue;
        const fresh = o.new && s.newBoxes ? new Set(s.newBoxes) : null;
        const boxes = s.m.boxes.filter((b) => (!fresh || fresh.has(b.key)) && !b.ellipsis && !b.designed && (b.kind === "scroller" || (b.kind === "spill" && b.excess >= 2) || (o.all && b.kind === "clipped" && b.excess >= 2)));
        const moves = (s.gestures || []).filter((g) => g.moved);
        if (!boxes.length && !moves.length && s.m.docSW <= s.m.vw && !s.m.edge.length && !o.verbose) continue;
        console.log(`${r.route} [${s.step}${s.trigger ? ": " + s.trigger.slice(-60) : ""}] doc=${s.m.docSW}/${s.m.vw} pan=${s.m.pagePan}`);
        for (const b of boxes) {
            console.log(`   ${b.kind} +${b.excess} (${b.sw}/${b.cw}) ${b.part} :: ${tail(b.el)}`);
            for (const k of b.breakers.slice(0, 2)) console.log(`      <- +${k.over} ${k.side} w=${k.w} pw=${k.parentW} pos=${k.position} ws=${k.whiteSpace} minW=${k.minWidth} fs=${k.flexShrink} :: ${tail(k.el)} "${k.text.slice(0, 30)}"`);
        }
        if (!fresh) for (const e of s.m.edge) console.log(`   edge ${e.left}..${e.right}${e.fixed ? " fixed" : ""} ${e.part} :: ${tail(e.el)}`);
        for (const g of moves) console.log(`   SWIPE ${g.gesture} on ${tail(g.target.el, 1)} -> ${g.moved.map((m) => `${tail(m.el, 1)} ${m.d}`).join("; ")}`);
    }
}
