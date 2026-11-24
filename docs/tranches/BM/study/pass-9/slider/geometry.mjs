// BM pass 9 (choice 23 under O-426; DESIGN §12): the Slider's expanded view, A as BL built it (W-B.18 R-10, R-11) and
// B refined after the ChatGPT app's construction (BL design/slider/MEASURE.md §2.2). Arithmetic in Node, not a reading.
// g is BL's outset: min(0.5rem, 2H/3) (R-10). Every outset in B is a fraction of g, so one number sets the view.
// The grow plays on present's single curve (pass-2/delivery/curves.json) over 200 ms in and 120 ms out
// (scheme-spring.css:103, :115). Run: ~/.claude/guard/guarded --light --timeout 5 -- node geometry.mjs (writes slider.json)
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const sizes = { "fourier 6 px": 6, "value.js sm 9 px": 9, sm: 12, md: 20, lg: 28 };
const g = (H) => Math.min(8, (2 * H) / 3);
const bez = (x1, y1, x2, y2) => (x) => { const B = (a, b, t) => 3 * a * t * (1 - t) ** 2 + 3 * b * t * t * (1 - t) + t ** 3; let lo = 0, hi = 1; for (let k = 0; k < 60; k++) { const m = (lo + hi) / 2; (B(x1, x2, m) < x ? (lo = m) : (hi = m)); } return B(y1, y2, lo); };
const present = bez(0.197, 0, 0.124, 0.808);
const r2 = (x) => +x.toFixed(2);
const out = { method: "pass-9/slider/geometry.mjs; closed-form geometry, not a reading", chatgpt: { source: "BL design/slider/MEASURE.md §2.2 (OpenAI's promotional GIF, 1.04 px/pt)", shell: 68, fill: 42, knob: 34, knobInset: 4, shellToFill: 13, ratio: "1.62 : 1 : 0.81" }, sizes: {} };
for (const [name, H] of Object.entries(sizes)) {
  const G = g(H);
  const A = { shell: H + 2 * G, band: H, disc: H + G, discScale: r2((H + G) / H), discProudOfBand: r2(G / 2), discInsetInShell: r2(G / 2) };
  const B = { shell: H + 2 * G, band: H + G, knob: H + G / 2, knobScaleOfRest: r2((H + G / 2) / H), knobRestShareOfGrown: r2(H / (H + G / 2)), shellRing: r2(G / 2), knobInsetInBand: r2(G / 4), ratio: `${r2((H + 2 * G) / (H + G))} : 1 : ${r2((H + G / 2) / (H + G))}` };
  out.sizes[name] = { H, g: r2(G), A, B };
}
// Per frame at 60 Hz through the grow (200 ms) and the shrink (120 ms) on present's curve: every ring's width.
// B: the shell's ring (g/2)c, the knob's inset (g/4)c; both >= 0 on every frame, and both reach 0 together at rest.
// A on one thread: the disc stands (g/2)c outside the band and (g/2)c inside the shell. A on two threads (its disc's
// `scale` on WebKit's compositor, its shell's `clip-path` on the page's thread, DESIGN §4.1): with the page's thread
// stalled at frame k, the disc runs on and the shell holds; the worst frame puts the disc g/2 outside the shell.
const frames = (D) => Array.from({ length: Math.ceil(D / 16.67) + 1 }, (_, k) => Math.min(1, (k * 16.67) / D));
const md = 20, G = g(md);
out.mdPerFrame = {
  grow200: frames(200).map((u) => { const c = present(u); return { u: r2(u), c: r2(c), B_shellRing: r2((G / 2) * c), B_knobInset: r2((G / 4) * c), A_discOutsideBand: r2((G / 2) * c) }; }),
  shrink120: frames(120).map((u) => { const c = 1 - present(u); return { u: r2(u), c: r2(c), B_shellRing: r2((G / 2) * c), B_knobInset: r2((G / 4) * c) }; }),
  A_twoThreads_worst: { stallFrom: "frame 1 of the grow", discOutsideShell_px: r2(G / 2), note: "derived from where WebKit runs each property, not read" },
};
writeFileSync(path.join(HERE, "slider.json"), JSON.stringify(out, null, 1));
console.log(JSON.stringify(out.sizes, null, 1));
