// BM pass 9's fold of pass 8's critiques: the figures the fold cites. Arithmetic in Node and rolldown bundles of the
// corrected sketches (pass-9/fold/sketch/); no browser, no device reading.
// Run: ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-9/fold/fold.mjs  (writes fold.json)
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import path from "node:path";
import { rolldown } from "rolldown";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const out = { method: "pass-9/fold/fold.mjs: single curves sampled, areas, and standalone gzip -9 of minified bundles or comment-stripped CSS (upper bounds)" };

// B8-10: present's single curve (pass-2/delivery/curves.json) over its 200 ms settle: when it reads 90 % and 98 %.
const bez = (x1, y1, x2, y2) => (x) => { // y at x for cubic-bezier(x1,y1,x2,y2), by bisection on t
  const B = (a, b, t) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3;
  let lo = 0, hi = 1; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; (B(x1, x2, m) < x ? (lo = m) : (hi = m)); } return B(y1, y2, lo);
};
const at = (f, D, level) => { for (let ms = 0; ms <= D; ms += 0.5) if (f(ms / D) >= level) return ms; return D; };
const present = bez(0.197, 0, 0.124, 0.808);
out.presentSingleCurve = { curve: "cubic-bezier(0.197, 0, 0.124, 0.808) over 200 ms", ms90: at(present, 200, 0.9), ms98: at(present, 200, 0.98), ms100: 200 };

// B8-6: a fade on the exit curve (0.3, 0.2, 0.7, 0.8): its steepest frame's share at 60 and 30 Hz, per clock.
const exitC = bez(0.3, 0.2, 0.7, 0.8);
const steep = (D, hz) => { const dt = 1000 / hz; let m = 0; for (let t = 0; t < D; t += 0.25) { const a = exitC(Math.min(1, t / D)), b = exitC(Math.min(1, (t + dt) / D)); m = Math.max(m, b - a); } return +m.toFixed(3); };
out.exitAt30 = Object.fromEntries([120, 150, 180, 190, 200, 222].map((D) => [D + "ms", { frames30: +(D / 33.33).toFixed(1), steepest30: steep(D, 30), steepest60: steep(D, 60) }]));

// A8-4: Q22's D, the veil a dim and the plate its one blur, beside bud.json's A to C (390 x 844 at DPR 3; plate 342 x 260).
const vp = 390 * 844 * 9, plate = 342 * 260 * 9;
out.q22 = { A_today: vp + plate, B_veil_alone: vp, C_dim_only: 0, D_plate_alone: plate, D_share_of_B: +(plate / vp).toFixed(3) };

// Bytes of the corrected sketches, measured as bud.mjs measured pass 8's.
const stripCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
const bundle = async (abs) => { const b = await rolldown({ input: abs, logLevel: "silent", external: () => true }); const { output } = await b.generate({ format: "es", minify: true }); return output[0].code; };
const SK = path.join(HERE, "sketch"), P8 = path.resolve(HERE, "../../pass-8/bud/sketch");
const bytes = {};
for (const f of ["usePresent.next.ts", "useSheetScroll.next.ts"]) bytes[f] = { pass9: gz(await bundle(path.join(SK, f))), pass8: gz(await bundle(path.join(P8, f))) };
for (const f of ["bud.next.css", "sheet-scroll.next.css", "dialog-veil.next.css"]) bytes[f] = { pass9: gz(stripCss(readFileSync(path.join(SK, f), "utf8"))), pass8: gz(stripCss(readFileSync(path.join(P8, f), "utf8"))) };
bytes["useMenuTouchSlide.next.ts"] = { pass8: gz(await bundle(path.join(P8, "useMenuTouchSlide.next.ts"))) };
// The same CSS as a marginal cost inside a real stylesheet: gzip of the main checkout's built glass-ui.css (a 2026-11-04
// build, used only as a dictionary) with the rules appended, less its gzip alone. Small rules repeat names the sheet
// already holds, so standalone gzip overstates them.
const base = readFileSync(path.resolve(HERE, "../../../../../../dist/glass-ui.css"), "utf8");
for (const f of ["bud.next.css", "sheet-scroll.next.css", "dialog-veil.next.css"]) bytes[f].pass9_marginal = gz(base + stripCss(readFileSync(path.join(SK, f), "utf8"))) - gz(base);
out.bytes = bytes;

// A8-7: 11.3.0 by entry, upper bounds (pass 8's removals: the presence hold 110 B; useSpringMount 791 B, §4.7).
const presence = bytes["usePresent.next.ts"].pass9, bud = bytes["bud.next.css"].pass9_marginal, veil = bytes["dialog-veil.next.css"].pass9_marginal, loader = 60;
out.net_11_3_0 = {
  note: "per site entry; script adds standalone gzip (upper bounds), CSS adds marginal in the built sheet; the slide loads on a menu's first touch, so an entry carries only its loader (about 60 B, estimated); exit readers in reveal.css not measured",
  entry_with_a_Dialog_or_side_Sheet: { adds: presence + bud + veil + loader, removes: 110 + 791, net: presence + bud + veil + loader - 110 - 791 },
  entry_with_menus_only: { adds: presence + bud + loader, removes: 110, net: presence + bud + loader - 110 },
};
writeFileSync(path.join(HERE, "fold.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
