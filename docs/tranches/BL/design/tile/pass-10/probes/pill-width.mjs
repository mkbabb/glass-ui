#!/usr/bin/env node
// D4 pass 10 · BUILD seat probe, re-read (b) of REGISTRY §P9-6: a pill's width at rest and selected, reported, so the
// pill question (§P9-5: is the selected weight load-bearing on pills, and does "a property of the primitive" bind a
// pill's sideways shift) is asked on a number. Not a witness and not hashed: every cell is info.
// Scenes (library pills): `single` (sm, the keyframes.js family filter), `pill-icon`, `pill-badge`, `vertical`. Per
// scene and mode (light, dark): nothing selected, then each pill selected in turn by a real click (pointer parked
// after, the page settled); every pill's border box is read with transforms, transitions and animations neutralised.
// Cells (info): per scene × mode, the largest change of a pill's own width between rest and selected, and the largest
// move of any pill (x, y, w, h) in the row; plus each pill's weight at rest and selected. Run it on D′ v9 and on the
// planted `weight-step` library (harness/plants.mjs) to read what the 600 did.
//   node pill-width.mjs --build <route build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../harness/lib.mjs";

const SCENES = ["single", "pill-icon", "pill-badge", "vertical"];
const NEUTRAL = "[data-scene], [data-scene] *, [data-scene] *::before, [data-scene] *::after { transform: none !important; scale: none !important; translate: none !important; rotate: none !important; transition: none !important; animation: none !important; }";
const READ = (neutral) => {
  const st = document.createElement("style"); st.textContent = neutral; document.head.append(st);
  const g = document.querySelector("[data-scene] [data-group]"), gb = g.getBoundingClientRect();
  const out = [...g.querySelectorAll("[data-item]")].map((el) => { const b = el.getBoundingClientRect(); return { x: b.left - gb.left, y: b.top - gb.top, w: b.width, h: b.height, fw: getComputedStyle(el).fontWeight, on: el.dataset.state === "on", text: el.textContent.trim() }; });
  st.remove(); return out;
};
const settle = async (page) => { await page.waitForTimeout(120); for (let t = 0; t < 80; t++) { if (!(await page.evaluate(() => document.getAnimations().some((a) => a.playState === "running")))) break; await page.waitForTimeout(50); } };

await cli("PILL-WIDTH", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const scene of SCENES) for (const mode of ["light", "dark"]) {
    const P = await openPage(target, engine, scene, { mode, query: { sel: "none" } });
    let rest, per = [];
    try {
      const { page } = P;
      await page.mouse.move(2, 2); await settle(page);
      rest = await page.evaluate(READ, NEUTRAL);
      for (let k = 0; k < rest.length; k++) { await page.locator("[data-scene] [data-item]").nth(k).click(); await page.mouse.move(2, 2); await settle(page); per.push(await page.evaluate(READ, NEUTRAL)); }
    } finally { await P.close(); }
    let own = 0, ownAt = "", move = 0, moveAt = "";
    const weights = [];
    per.forEach((s, k) => {
      const dw = s[k].w - rest[k].w;
      if (Math.abs(dw) > Math.abs(own)) { own = dw; ownAt = `«${rest[k].text}» ${f2(rest[k].w)} → ${f2(s[k].w)}`; }
      weights.push(`${rest[k].fw}→${s[k].fw}${s[k].on ? "" : "(NOT ON)"}`);
      s.forEach((it, j) => { const d = Math.max(...["x", "y", "w", "h"].map((q) => Math.abs(it[q] - rest[j][q]))); if (d > move) { move = d; moveAt = `pill ${j} «${rest[j].text}» (${f2(rest[j].x)},${f2(rest[j].y)} ${f2(rest[j].w)}×${f2(rest[j].h)} → ${f2(it.x)},${f2(it.y)} ${f2(it.w)}×${f2(it.h)}) with pill ${k} selected`; } });
    });
    cells.push({ gating: false, pass: Math.abs(own) <= 0.5 && move <= 0.5, line: `${scene} ${P.modeLabel}${P.modeOk ? "" : " (MODE NOT APPLIED)"} · ${rest.length} pills · own width selected − rest: max ${f2(own)} px${ownAt ? ` (${ownAt})` : ""} · largest move in the row ${f2(move)} px${moveAt ? ` (${moveAt})` : ""} · weight rest→selected ${weights.join(" ")} · widths at rest ${rest.map((r) => f2(r.w)).join(", ")}` });
  }
  return { id: "PILL-WIDTH", title: "re-read (b): a pill's width at rest and selected, and its row's move (pass-10 BUILD probe, info only)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
