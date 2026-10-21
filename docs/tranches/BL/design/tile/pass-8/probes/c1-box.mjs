#!/usr/bin/env node
// D4 pass 8 · BUILD seat probe: O-103c's CONDITION on Q-10 (i), read on paint. "C1 is a cell in BOTH states; selection
// must not change its geometry (no layout shift)." It folds into T-3/T-4 as the registry fixes (C1's box identical rest
// vs selected, ±0.5 px, both engines); H8 is H7 plus the B-1 writer read only, so this read is a pass-8 probe and not a
// harness cell. Gating here, info nowhere else.
//   For each mode (light, dark, prt) it opens `c1-migrated` and walks the selection through every state: none selected
//   (`__tile.select(null)`, every option at rest), then each option selected in turn (`__tile.select(i)`, the model
//   write a pointer or a key makes). After each write it waits until no animation runs on the page (the commit kick is
//   450 ms on `transform`, the perimeter fade a transition), then reads every option and the group:
//     - the layout box (offsetLeft/Top/Width/Height: transforms excluded) and the settled border box
//       (getBoundingClientRect, transforms included, so a kick that never settles shows);
//     - the corner (computed border-top-left-radius), the flex direction and data-state.
//   Cells: `cell-both-states` every option in every state is a cell (corner = the field rung, 16px; column);
//   `no-shift` every option's box and the group's box are the same in every state (max deviation ≤ 0.5 px), so each
//   option's rest box equals its selected box and selecting one moves no sibling.
//   node c1-box.mjs --build <out>/builds/<D4-Dp8 route build> [--engine webkit] [--out <dir>]
import { cli, openPage, engineVersion, engineOf, f2 } from "../../harness/lib.mjs";

const READ = () => {
  const scene = document.querySelector("[data-scene]");
  const group = scene.querySelector("[data-group]");
  const items = [...scene.querySelectorAll("[data-item]")];
  const box = (el) => { const r = el.getBoundingClientRect(); return { ol: el.offsetLeft, ot: el.offsetTop, ow: el.offsetWidth, oh: el.offsetHeight, x: r.x, y: r.y, w: r.width, h: r.height }; };
  return {
    group: box(group),
    items: items.map((el) => { const c = getComputedStyle(el); return { ...box(el), r: c.borderTopLeftRadius, dir: c.flexDirection, state: el.dataset.state ?? el.getAttribute("aria-checked") }; }),
    animations: document.getAnimations().length,
  };
};
const settle = async (page) => {
  const t0 = Date.now();
  await page.waitForTimeout(80);
  while (Date.now() - t0 < 4000) {
    const n = await page.evaluate(() => document.getAnimations().filter((a) => a.playState === "running").length);
    if (n === 0) break;
    await page.waitForTimeout(50);
  }
  await page.waitForTimeout(120);
  return Date.now() - t0;
};
const dev = (a, b) => Math.max(...["ol", "ot", "ow", "oh", "x", "y", "w", "h"].map((k) => Math.abs(a[k] - b[k])));

await cli("C1BOX", async (args, target) => {
  const engine = engineOf(args), cells = [];
  for (const mode of ["light", "dark", "prt"]) {
    const P = await openPage(target, engine, "c1-migrated", { mode });
    const states = [];
    try {
      await P.page.mouse.move(2, 2);
      const n = await P.page.evaluate(() => document.querySelectorAll("[data-scene] [data-item]").length);
      for (const i of [null, ...Array.from({ length: n }, (_, k) => k)]) {
        await P.page.evaluate((x) => window.__tile.select(x), i);
        const waited = await settle(P.page);
        states.push({ sel: i, waited, ...(await P.page.evaluate(READ)) });
      }
    } finally { await P.close(); }
    const tag = `${mode}${P.modeOk ? "" : " (MODE NOT VERIFIED)"}`;
    if (!states.length || !states[0].items.length) { cells.push({ gating: true, pass: false, line: `${tag} · no C1 options found` }); continue; }
    const ref = states[0];
    // every option a cell in every state
    const bad = [];
    for (const s of states) s.items.forEach((it, k) => { if (it.r !== "16px" || it.dir !== "column") bad.push(`sel ${s.sel} opt ${k}: ${it.r} ${it.dir}`); });
    const onCount = states.map((s) => s.items.filter((it) => it.state === "on" || it.state === "true").length).join(",");
    cells.push({ gating: true, pass: bad.length === 0 && P.modeOk, what: "cell-both-states", line: `${tag} · cell-both-states · ${states.length} states (none, then each of ${ref.items.length} options selected; options on per state ${onCount}) · every option's corner and direction: ${bad.length ? `NOT A CELL in ${bad.length}: ${bad.slice(0, 4).join("; ")}` : `16px, column in every state`}` });
    // no shift: every option and the group, against the none-selected state
    let maxD = 0, where = "";
    for (const s of states.slice(1)) {
      const g = dev(s.group, ref.group); if (g > maxD) { maxD = g; where = `group, sel ${s.sel}`; }
      s.items.forEach((it, k) => { const d = dev(it, ref.items[k]); if (d > maxD) { maxD = d; where = `opt ${k}, sel ${s.sel}`; } });
    }
    // each option's own rest box against its own selected box
    const own = ref.items.map((it, k) => f2(dev(it, states[k + 1].items[k]))).join(" · ");
    const sizes = ref.items.map((it) => `${f2(it.w)}×${f2(it.h)}`).join(", ");
    cells.push({ gating: true, pass: maxD <= 0.5 && P.modeOk, what: "no-shift", line: `${tag} · no-shift · options at rest ${sizes}; group ${f2(ref.group.w)}×${f2(ref.group.h)} · each option rest vs its own selected (max of layout and settled box) ${own} px · max deviation over every option and the group, every state ${f2(maxD)} px${maxD ? ` (${where})` : ""} · want ≤ 0.50 · settle waits ${states.map((s) => s.waited).join("/")} ms` });
  }
  return { id: "C1BOX", title: "C1 is a cell at rest and selected, and selection moves no box (O-103c's condition; pass-8 BUILD probe)", engine, engineLabel: await engineVersion(engine), target: target.label, dev: target.meta.dev, cells };
});
