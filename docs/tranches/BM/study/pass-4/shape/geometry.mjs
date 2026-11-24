// BM pass 4 (Q1, the shape channel): what each way of growing a glass plate draws, frame by frame, without a browser.
// Run from the glass-ui checkout:
//   ~/.claude/guard/guarded --light --timeout 5 -- node docs/tranches/BM/study/pass-4/shape/geometry.mjs
//
// Two motions, the ones Q1 names:
//   bud   a 44 px seat (a circle, radius 22) grows into a 250 × 188 menu panel (radius 16, `--radius-card`,
//         overlay-plate.css:64), anchored at the seat's corner. 188 = four 44 px rows and two 10 px pads (D1's
//         44 px coarse floor). The ideal bud at progress p is a rounded rectangle [0,w]×[0,h] with
//         w = 44 + 206p, h = 44 + 144p and a circular corner whose radius runs 22 → 16.
//   fold  a 236 × 52 capsule dock (radius 26) folds to a 52 px disc; the ideal at p is a capsule of width
//         236 − 184p (radius 26 throughout: a stadium is a capsule at every width).
// Each lane is what the CSS draws, reduced to its outline: an elliptical corner (a, b) or a circular one (r).
// The distance between a lane's outline and the ideal's is the largest gap between the two corner curves,
// sampled (both directions, so it is the Hausdorff distance of the corners; the straight edges coincide).
// The work column is WebKit's (UNION I12; [IOS §2.3]): transform-family and opacity animations are handed to the
// compositor; width, height, border-radius and clip-path run on the page's thread.
import { writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);

// A corner curve tangent to the x and y axes at the box's top-left, as points: quarter ellipse with semi-axes a, b.
function corner(a, b, n = 400) {
  const pts = [];
  for (let i = 0; i <= n; i++) { const t = (i / n) * (Math.PI / 2); pts.push([a - a * Math.cos(t), b - b * Math.sin(t)]); }
  return pts; // runs from (0, b) to (a, 0)
}
// The outline near the corner: the curve plus the straight runs out to `ext` px along each edge.
function outline(a, b, ext) {
  const pts = corner(a, b);
  for (let x = a; x <= ext; x += 0.25) pts.push([x, 0]);
  for (let y = b; y <= ext; y += 0.25) pts.push([0, y]);
  return pts;
}
const segDist = (p, q, r) => { const [x, y] = p, [x1, y1] = q, [x2, y2] = r, dx = x2 - x1, dy = y2 - y1, L = dx * dx + dy * dy;
  const t = L ? Math.max(0, Math.min(1, ((x - x1) * dx + (y - y1) * dy) / L)) : 0; return Math.hypot(x - (x1 + t * dx), y - (y1 + t * dy)); };
function dist(P, Q) { // max over P of the distance to the polyline Q (Q sorted along the curve is enough here: dense)
  let m = 0;
  for (const p of P) { let d = Infinity; for (let i = 0; i + 1 < Q.length; i++) d = Math.min(d, segDist(p, Q[i], Q[i + 1])); m = Math.max(m, d); }
  return m;
}
const sortCurve = (pts) => pts.slice().sort((u, v) => Math.atan2(v[1], -v[0]) - Math.atan2(u[1], -u[0]));
function gap(drawn, ideal, ext) {
  const D = sortCurve(outline(drawn[0], drawn[1], ext)), I = sortCurve(outline(ideal[0], ideal[1], ext));
  return Math.max(dist(D, I), dist(I, D));
}
const lerp = (a, b, p) => a + (b - a) * p;

const SEAT = 44, PW = 250, PH = 188, PR = 16, SR = 22;
const ps = Array.from({ length: 21 }, (_, i) => i / 20);
const bud = {};
const lanes = {
  // A: the full panel scaled from the seat's corner, `scale: sx sy`; the corner becomes an ellipse 16·sx × 16·sy,
  // and the 1 px edge becomes sx px wide on the vertical sides and sy px tall on the horizontal ones.
  A_scale: (p) => { const w = lerp(SEAT, PW, p), h = lerp(SEAT, PH, p), sx = w / PW, sy = h / PH; return { corner: [PR * sx, PR * sy], edge_px: [+sx.toFixed(3), +sy.toFixed(3)] }; },
  // B: the plate's own width, height and border-radius written each frame: exactly the ideal.
  B_size: (p) => { const r = lerp(SR, PR, p); return { corner: [r, r], edge_px: [1, 1] }; },
  // C: the full panel cut by clip-path: inset(0 R B 0 round r(p)), written each frame: exactly the ideal shape;
  // the plate's own edge and shadow lie outside the clip until it reaches the panel's box.
  C_clip: (p) => { const r = lerp(SR, PR, p); return { corner: [r, r], edge_px: p < 1 ? "growing sides: none" : [1, 1] }; },
  // D: the panel seen through three windows of its own shape, each moved by translate: every corner is the
  // panel's own radius, 16, at every frame.
  D_windows: () => ({ corner: [PR, PR], edge_px: "plate's own two sides only until rest" }),
};
for (const [k, f] of Object.entries(lanes)) {
  bud[k] = ps.map((p) => { const w = lerp(SEAT, PW, p), h = lerp(SEAT, PH, p), r = lerp(SR, PR, p), o = f(p);
    return { p, w: +w.toFixed(1), h: +h.toFixed(1), ideal_r: +r.toFixed(2), corner: o.corner.map((v) => +v.toFixed(2)), gap_px: +gap(o.corner, [r, r], Math.min(w, h) / 2).toFixed(2), edge_px: o.edge_px }; });
}
// E: the panel enters at its own size by opacity and a uniform scale 0.96 → 1 from the seat's corner. It never
// takes the seat's shape; its corner is a circle of 16·s, so its gap from its own ideal (the panel at that scale)
// is 0, and the comparison with the bud's ideal does not apply.
bud.E_bloom = ps.map((p) => { const s = lerp(0.96, 1, p); return { p, w: +(PW * s).toFixed(1), h: +(PH * s).toFixed(1), corner: [+(PR * s).toFixed(2), +(PR * s).toFixed(2)], gap_to_own_shape_px: 0 }; });

// The fold: a 236 × 52 capsule to a 52 disc.
const DW = 236, DH = 52, DR = 26;
const fold = {
  // F: the capsule plate at full width inside a capsule window of the same size; the window's translate sets one
  // end, the plate's sets the other. Checked on a pixel grid: the visible region is a capsule of width w.
  F_window: ps.map((p) => {
    const w = lerp(DW, DH, p), a = 0, b = w; // visible [a, b]: plate at [a, a+DW], window at [b−DW, b]
    const inCap = (x, y, x0, W) => { const r = DH / 2, cx = Math.min(Math.max(x, x0 + r), x0 + W - r); return (x - cx) ** 2 + (y - r) ** 2 <= r * r; };
    let worst = 0;
    for (let y = 0.125; y < DH; y += 0.25) for (let x = -2; x < DW + 2; x += 0.25) {
      const vis = inCap(x, y, a, DW) && inCap(x, y, b - DW, DW), ideal = inCap(x, y, a, w);
      if (vis !== ideal) worst = Math.max(worst, 0.25); // a disagreeing sample is a quarter-pixel boundary miss
    }
    return { p, w: +w.toFixed(1), corner: [DR, DR], region_mismatch_px: worst };
  }),
  // G: the capsule scaled to width w, `scale: (w/236) 1`: its ends become ellipses 26·sx × 26.
  G_scale: ps.map((p) => { const w = lerp(DW, DH, p), sx = w / DW; const c = [DR * sx, DR];
    return { p, w: +w.toFixed(1), corner: c.map((v) => +v.toFixed(2)), gap_px: +gap(c, [DR, DR], DH / 2).toFixed(2) }; }),
};

// Cost and the ceiling, per open (bud) and per fold, from the lanes as built on pages/P4-bud.html.
const cost = {
  A_scale: { animates: ["scale"], thread: "compositor", main_thread_per_frame: "none", nodes_added: 0, animations_per_open: 2, properties_per_node: 1, backdrop: "resampled under a non-uniform scale (R1 D)" },
  B_size: { animates: ["width", "height", "border-radius"], thread: "page", main_thread_per_frame: "style, layout, paint (and the backdrop re-rendered at the new size)", nodes_added: 0, animations_per_open: 4, properties_per_node: 3, backdrop: "follows border-radius (WebKit reads it, [IOS §4.7])" },
  C_clip: { animates: ["clip-path"], thread: "page", main_thread_per_frame: "style and the clip's path (no layout)", nodes_added: 0, animations_per_open: 2, properties_per_node: 1, backdrop: "unread: WebKit's backdrop geometry does not read clip-path ([IOS §4.7]; R1 B and C)" },
  D_windows: { animates: ["translate"], thread: "compositor", main_thread_per_frame: "none", nodes_added: 2, animations_per_open: 4, properties_per_node: 1, backdrop: "unread: whether WebKit clips a backdrop by an ancestor's rounded overflow clip (P4-bud, D with Frost on)" },
  E_bloom: { animates: ["opacity", "scale"], thread: "compositor", main_thread_per_frame: "none", nodes_added: 0, animations_per_open: 2, properties_per_node: 2, backdrop: "a uniform scale (R1 D is the non-uniform case)" },
  F_window: { animates: ["translate"], thread: "compositor", main_thread_per_frame: "none", nodes_added: "0 when the window is the part's own element and the plate its ::before", animations_per_fold: 2, properties_per_node: 1, backdrop: "unread (P4-bud, F with Frost on)" },
  G_scale: { animates: ["scale"], thread: "compositor", main_thread_per_frame: "none", nodes_added: 0, animations_per_fold: 1, properties_per_node: 1, backdrop: "resampled (R1 D)" },
};
const summary = Object.fromEntries(Object.entries({ ...bud, ...fold }).map(([k, rows]) => [k, {
  frame0: rows[0], mid: rows[10], max_gap_px: Math.max(...rows.map((r) => r.gap_px ?? r.region_mismatch_px ?? r.gap_to_own_shape_px ?? 0)),
}]));
const out = { at: new Date().toISOString(), bud, fold, cost, summary };
writeFileSync(path.join(HERE, "geometry.json"), JSON.stringify(out, null, 1));
for (const [k, s] of Object.entries(summary)) console.log(k.padEnd(10), "max gap", s.max_gap_px, "frame 0", JSON.stringify(s.frame0), "mid", JSON.stringify(s.mid));
