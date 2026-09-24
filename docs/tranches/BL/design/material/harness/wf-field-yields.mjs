#!/usr/bin/env node
// W-F · D3-F's witness: the field yields under glass. With a glass rect registered over the substrate, the
// field's painted L under the rect lies in the theme band (light ≥ 0.876, dark ≤ 0.45) while 24 px outside it the
// field is unchanged (ΔE ≤ 0.005).
//   The field with glass mounted is the ladder scene's raw capture (every surface hidden, still mounted and so
//   still registered); the field with no glass is the empty scene (nothing mounted). Both are the reduced-motion
//   frozen field, which is identical across page loads.
//   Leg 1: per surface (plates, dock, popover), OKLab L of the raw field under its rect (inset 4 px): p05 ≥ 0.876
//          in light, p95 ≤ 0.45 in dark.
//   Leg 2: per surface, the pixels on the rectangle 24 px outside it (none within 2 px of any surface):
//          p95 ΔE_OK(raw, empty) ≤ 0.005.
//   node wf-field-yields.mjs <capdir>
import { cli, loadCapture, report, dE, lch, pct, at, f, tag, pick, FIELD_GROUNDS, THEMES } from "./lib.mjs";
import { need, tally } from "./rows.mjs";

const a = cli(), cap = loadCapture(a._[0]), gate = ["chromium"];
const n = need(cap, gate, { themes: THEMES, grounds: FIELD_GROUNDS, scenes: ["ladder"] });
const t = tally(), lines = [...n.lines]; t.add(true, false, n.missing);
for (const { cell } of n.have) {
  const empty = pick(cap, { engine: cell.engine, theme: cell.theme, ground: cell.ground, scene: "empty", variant: cell.variant || "base" })[0];
  if (!empty || empty.crashed) { t.add(true, false); lines.push(`${tag(cell)}: no empty-scene capture ✗`); continue; }
  const raw = cap.img(cell, "raw"), bare = cap.img(empty, "full");
  const rects = cell.specs.map((s) => s.rect);
  const inAny = (x, y) => rects.some(([rx, ry, rw, rh]) => x >= rx - 2 && x <= rx + rw + 2 && y >= ry - 2 && y <= ry + rh + 2);
  const parts = cell.specs.map((s) => {
    const [x0, y0, w, h] = s.rect, Ls = [];
    for (let y = Math.round(y0 + 4); y < y0 + h - 4; y += 2) for (let x = Math.round(x0 + 4); x < x0 + w - 4; x += 2) Ls.push(lch(at(raw, x, y))[0]);
    const Lq = cell.theme === "light" ? pct(Ls, 0.05) : pct(Ls, 0.95), ok1 = cell.theme === "light" ? Lq >= 0.876 : Lq <= 0.45;
    const d = [], X0 = Math.round(x0 - 24), X1 = Math.round(x0 + w + 24), Y0 = Math.round(y0 - 24), Y1 = Math.round(y0 + h + 24);
    const push = (x, y) => { if (x >= 0 && y >= 0 && x < raw.width && y < raw.height && !inAny(x, y)) d.push(dE(at(raw, x, y), at(bare, x, y))); };
    for (let x = X0; x <= X1; x++) { push(x, Y0); push(x, Y1); }
    for (let y = Y0; y <= Y1; y++) { push(X0, y); push(X1, y); }
    const q = d.length ? pct(d, 0.95) : null, ok2 = q != null && q <= 0.005;
    t.add(true, ok1); t.add(true, ok2);
    return `${s.id} L ${cell.theme === "light" ? "p05" : "p95"} ${f(Lq, 3)}${ok1 ? "" : " ✗"} · 24 px out ΔE p95 ${f(q, 4)} (${d.length} px)${ok2 ? "" : " ✗"}`;
  });
  lines.push(`${tag(cell)}:`); for (const p of parts) lines.push("    " + p);
}
report(cap, { id: "W-F", title: "D3-F · the field yields under glass (L in the theme band under each rect; unchanged 24 px outside)", lines, ...t, gate });
