#!/usr/bin/env node
// P-E6 probe (not a witness): CK-25's loupe framed whole. The harness's capture clips the held slider to its root ± 48 px,
// which cuts the raised lens off at its middle, so the owner-glance set gets a supplementary frame of the lens: the
// union of the slider root and the loupe housing, 16 px around, at the held instant (450 ms) and the sustained one
// (1200 ms), light and dark, fine (a mouse hold) and coarse (a touch hold: lib.mjs openTouchPage). It also prints the
// lens geometry it framed: the housing, the window and the band (the clone's painted height), so the read is numbers
// as well as pixels. One browser per run, a context per cell, closed in finally. Not a film: one still per instant.
//   node loupe-frame.mjs --build <out>/builds/<label> --label <label> --frames <dir> [--engine chromium|webkit]
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { witness, openPage, openTouchPage, center, f, parseArgs } from "../../../harness/lib.mjs";
const a = parseArgs();
const label = typeof a.label === "string" ? a.label : "e6";
const dir = typeof a.frames === "string" ? a.frames : ".";
mkdirSync(dir, { recursive: true });
const geom = () => {
  const root = document.querySelector('[data-e~="root"]'); const lens = root?.querySelector(".glass-loupe");
  const win = lens?.querySelector(".glass-loupe-window"); const clone = lens?.querySelector(".glass-loupe-clone");
  const R = (e) => (e ? e.getBoundingClientRect() : null); const r = R(root), l = R(lens), w = R(win), c = R(clone);
  if (!r) return null;
  const x0 = Math.min(r.left, l ? l.left : r.left) - 16, y0 = Math.min(r.top, l ? l.top : r.top) - 16;
  const x1 = Math.max(r.right, l ? l.right : r.right) + 16, y1 = Math.max(r.bottom, l ? l.bottom : r.bottom) + 16;
  return { clip: { x: Math.max(0, x0 + scrollX), y: Math.max(0, y0 + scrollY), width: x1 - Math.max(0, x0), height: y1 - Math.max(0, y0) },
    lens: l && { w: l.width, h: l.height, op: +getComputedStyle(lens).opacity }, win: w && { w: w.width, h: w.height }, band: c && c.height,
    kmax: lens ? getComputedStyle(lens).getPropertyValue("--loupe-k-max").trim() : "" };
};
await witness("P-E6 loupe-frame", "CK-25: the loupe framed whole (owner-glance supplement)", async ({ E, T, cell, guard, engine }) => {
  for (const pointer of ["fine", "coarse"]) for (const theme of ["light", "dark"]) {
    const name = `loupe ${pointer} ${theme}`;
    const r = await guard(name, async () => {
      const P = pointer === "fine" ? await openPage(E, T, "slider", { theme }) : await openTouchPage(E, T, "slider", { theme });
      const got = [];
      const shoot = async (Q, at) => {
        const g = await Q.page.evaluate(geom); if (!g) throw new Error("no slider root");
        const buf = Q.shot ? await Q.shot(g.clip) : await Q.page.screenshot({ clip: g.clip, animations: "allow" });
        const file = path.join(dir, `${label}-${engine}-${pointer}-${theme}-loupe-${at}.png`); writeFileSync(file, buf);
        got.push({ at, file: path.basename(file), ...g });
      };
      try {
        const c = await center(P.page, '[data-e~="thumb"]');
        if (pointer === "fine") {
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
          try { await P.page.waitForTimeout(450); await shoot(P, "held"); await P.page.waitForTimeout(750); await shoot(P, "sustained"); }
          finally { await P.page.mouse.up(); }
        } else {
          const order = ["held", "sustained"]; let k = 0;
          await P.holdAt(c.x, c.y, [450, 1200], () => shoot(P, order[k++]));
        }
        return got;
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const ok = r.every((x) => x.lens && x.lens.op > 0.9 && x.band > 0);
    cell(name, ok ? "REPORT" : "FAIL", r.map((x) => `${x.at}: ${x.file} · housing ${f(x.lens?.w, 1)}×${f(x.lens?.h, 1)} px (opacity ${f(x.lens?.op, 2)}) · window ${f(x.win?.w, 1)}×${f(x.win?.h, 1)} px · band ${f(x.band, 1)} px (${f(x.band / x.win?.h, 2)} of the window) · --loupe-k-max ${x.kmax}`).join(" | "));
  }
});
