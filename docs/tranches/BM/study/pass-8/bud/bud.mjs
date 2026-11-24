// BM pass 8 (presentations; DESIGN §10): the figures behind the bud, the exits, the birth on a glass host, the counts
// and the bytes. Arithmetic in Node and rolldown bundles of glass-ui source; no browser, no device reading.
// Run (from the glass-ui checkout): ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-8/bud/bud.mjs
import { readFileSync, writeFileSync } from "node:fs";
import { gzipSync } from "node:zlib";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { rolldown } from "rolldown";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const REPO = "/Users/mkbabb/Programming/glass-ui";
const gz = (s) => gzipSync(Buffer.from(s), { level: 9 }).length;
const out = { method: "pass-8/bud/bud.mjs: closed-form springs, the exit curve sampled, geometry, and standalone gzip -9 of minified bundles or comment-stripped CSS (upper bounds)" };

// ── 1. The entry rows (SPRING_PRESETS, springPresets.ts:66-117) and Apple's menu fit (rida.dev, sim, [RU §5.3]) ──
const ROWS = { present: [0.22, 1.0], bloom: [0.42, 0.9], panel: [0.4, 0.71], dock: [0.3, 0.88], apple_menu_sim: [0.341, 0.758] };
const step = (r, z, t) => {
  const w = (2 * Math.PI) / r;
  if (z >= 1) return 1 - (1 + w * t) * Math.exp(-w * t);
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + (z / Math.sqrt(1 - z * z)) * Math.sin(wd * t));
};
out.entry = {};
for (const [k, [r, z]] of Object.entries(ROWS)) {
  let t90 = null, t98 = null, peak = 0, settle2 = 0;
  for (let t = 0; t < 2; t += 1 / 4000) { const x = step(r, z, t); if (t90 === null && x >= 0.9) t90 = t; if (t98 === null && x >= 0.98) t98 = t; peak = Math.max(peak, x); if (Math.abs(1 - x) > 0.02) settle2 = t; }
  out.entry[k] = { response: r, damping: z, to90_ms: +(t90 * 1000).toFixed(0), to98_ms: +(t98 * 1000).toFixed(0), overshoot_pct: +((peak - 1) * 100).toFixed(2), band2_ms: +(settle2 * 1000).toFixed(0) };
}
// The settle tokens and 11.1.1's derived exits (scheme-spring.css:102-119: 0.6 × settle, clamped 0.12 to 0.25 s).
const SETTLE = { press: 0.12, present: 0.2, dock: 0.21, panel: 0.45, bloom: 0.37, world: 0.57 };
out.exits_11_1_1 = Object.fromEntries(Object.entries(SETTLE).map(([k, s]) => [k, +(Math.min(0.25, Math.max(0.12, s * 0.6)) * 1000).toFixed(0)]));
out.exits_11_1_1_by_surface = { menu_and_select: "bloom exit, 222 ms (the menu's clip grows on bloom, reveal.css:120-122)", popover_toast_dialog_default: "panel exit, 250 ms (--exit-overlay-duration, motion-registers.css:147)", tooltip: "present exit, 120 ms (reveal.css:134-136)" };

// ── 2. The exit curve, --exit-curve: cubic-bezier(0.3, 0.2, 0.7, 0.8) (motion-registers.css:152), at each clock ──
const bez = (x1, y1, x2, y2) => (x) => { let lo = 0, hi = 1; for (let i = 0; i < 60; i++) { const m = (lo + hi) / 2, bx = 3 * (1 - m) ** 2 * m * x1 + 3 * (1 - m) * m * m * x2 + m ** 3; if (bx < x) lo = m; else hi = m; } const m = (lo + hi) / 2; return 3 * (1 - m) ** 2 * m * y1 + 3 * (1 - m) * m * m * y2 + m ** 3; };
const exitCurve = bez(0.3, 0.2, 0.7, 0.8);
const share = (D, f) => { let mx = 0; for (let t = 0; t + f <= D; t += 0.25) mx = Math.max(mx, exitCurve((t + f) / D) - exitCurve(t / D)); return +mx.toFixed(3); };
out.exitClocks = [100, 110, 120, 150, 180, 222, 250].map((D) => ({ ms: D, frames60: +(D / 16.67).toFixed(1), frames30: +(D / 33.33).toFixed(1), maxShare60: share(D, 16.67), maxShare30: share(D, 33.33), withinFifth60: share(D, 16.67) <= 0.2, inP0aOutRow: D >= 75 && D <= 120, inHA: D >= 100 && D <= 150 }));

// P0a's weight clock (motion-canon.md:97-100), read linearly: 0.2 s at 40 px to 0.45 s at 320 px; a menu's grow travels
// its height less the strip (192 − 44 px on P8-present), against HA's "popups read as done by 200 ms" ([IN HA 4]).
const weight = (px) => +(Math.min(0.45, Math.max(0.2, 0.2 + ((px - 40) / 280) * 0.25)) * 1000).toFixed(0);
out.weightClock = { grow148px_ms: weight(148), grow100px_ms: weight(100), grow240px_ms: weight(240), note: "linear between P0a's two points; a box that resizes" };

// ── 3. The birth on a glass host: a 44 px seat in a 52 px dock (4 px inset), a menu opening above the dock ──
// D's windows, as P4-bud draws them, start at the seat's own box; the rule moves the first window to the dock's edge.
const dock = { top: 0, h: 52 }, seat = { top: 4, h: 44, w: 44 };
const overlapH = (a0, a1, b0, b1) => Math.max(0, Math.min(a1, b1) - Math.max(a0, b0));
out.birth = {
  D_from_seat_box: { frame0_px2_over_dock: seat.w * overlapH(seat.top, seat.top + seat.h, dock.top, dock.top + dock.h), note: "the first window is the seat's box, wholly inside the dock's plate" },
  D_from_dock_edge: { frame0_px2_over_dock: 0, note: "the first window is the seat's width, starting 4 px (reka's sideOffset) past the dock's outer edge" },
  grow_C: { frame0_px2_over_dock: 0, note: "the strip is the panel's own edge facing the trigger, sideOffset past the anchor" },
  fade_E: { frame0_px2_over_dock: 0, note: "the panel at 0.96 about its edge facing the trigger, sideOffset past the anchor" },
};

// ── 4. A press that opens a panel from a dock seat, counted (law 4; §7.4's panel rule) ──
out.counts = {
  rule: "running at once on one press (restraint.md, the ceiling: 2); the trigger's held fill waits for the panel to land",
  grow_C: { press: ["the seat plate's press tone"], open: ["the panel's clip"], after: ["the seat's held fill"], maxAtOnce: 1, propsPerNode: 1 },
  fade_E: { press: ["the seat plate's press tone"], open: ["the panel's opacity", "the panel's scale"], after: ["the seat's held fill"], maxAtOnce: 2, propsPerNode: 2 },
  windows_D: { press: ["the seat plate's press tone"], open: ["three windows' translate", "the plate's translate"], after: ["the seat's held fill"], maxAtOnce: 4, propsPerNode: 1 },
  exit: { any: ["the panel's opacity, 120 ms", "the seat's held fill, out"], maxAtOnce: 2 },
};

// ── 5. Q22: live blurs per modal, and their area on a 390 x 844 phone at DPR 3 ──
const vp = 390 * 844 * 9, plate = 342 * 260 * 9;
out.q22 = {
  A_today: { liveBlurs: 2, device_px: vp + plate, note: "the veil's masked full-viewport backdrop-filter, and the dialog's plate over it" },
  B_veil_alone: { liveBlurs: 1, device_px: vp, note: "the plate samples nothing over the veil" },
  C_dim_only: { liveBlurs: 0, device_px: 0, note: "O-260 as written: the veil reads the floating rung, which goes to 0" },
};

// ── 6. Bytes ──
const stripCss = (s) => s.replace(/\/\*[\s\S]*?\*\//g, "").replace(/\s+/g, " ").trim();
const bundle = async (entryAbs, externalAll = true) => {
  const b = await rolldown({ input: entryAbs, logLevel: "silent", external: (id, imp) => (imp ? !id.startsWith(".") || externalAll : false) });
  const { output } = await b.generate({ format: "es", minify: true });
  return output[0].code;
};
const SK = path.join(HERE, "sketch");
const adds = {};
for (const f of ["usePresent.next.ts", "useMenuTouchSlide.next.ts", "useSheetScroll.next.ts"]) adds[f] = gz(await bundle(path.join(SK, f)));
for (const f of ["bud.next.css", "sheet-scroll.next.css", "dialog-veil.next.css"]) adds[f] = gz(stripCss(readFileSync(path.join(SK, f), "utf8")));
const git = (args) => execFileSync("git", ["-C", REPO, ...args], { encoding: "utf8", maxBuffer: 1 << 26 });
// The presence hold on 11.1.1: its rule in reveal.css and its keyframe in animations.css.
const reveal = git(["show", "release/11.1.1:src/styles/glass/reveal.css"]).split("\n");
const anim = git(["show", "release/11.1.1:src/styles/animations.css"]).split("\n");
const holdRule = reveal.find((l) => /animation:\s*glass-reveal-hold/.test(l)).trim(), holdKey = anim.slice(170, 175).join("\n");
const removes = {
  "the presence hold: its declaration (11.1.1 reveal.css:207) and keyframe (animations.css:171-175)": gz(stripCss(holdRule + holdKey)),
  "useSpringMount (pass 2, §4.7)": 791,
  "the sheet's detent engine (sheet/detents/use.ts with projection.ts, master, bundled alone)": gz(await bundle(path.join(REPO, "src/components/sheet/detents/use.ts"), false).catch(() => "")),
};
// projection.ts and use.ts alone, imports outside the folder external
try {
  const b = await rolldown({ input: path.join(REPO, "src/components/sheet/detents/use.ts"), logLevel: "silent", external: (id, imp) => !!imp && !(id.startsWith("./") || id.includes("/detents/")) });
  const { output } = await b.generate({ format: "es", minify: true });
  removes["the sheet's detent engine (sheet/detents/use.ts with projection.ts, master, bundled alone)"] = gz(output[0].code);
} catch (e) { removes["the sheet's detent engine (sheet/detents/use.ts with projection.ts, master, bundled alone)"] = "not measured: " + String(e.message).slice(0, 80); }
out.bytes = { adds, removes, note: "standalone gzip -9; upper bounds on both sides, so no net is claimed (pass 10 closes per entry)" };
writeFileSync(path.join(HERE, "bud.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out, null, 1));
