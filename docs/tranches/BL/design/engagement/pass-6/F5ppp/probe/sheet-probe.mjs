#!/usr/bin/env node
// F5‴ r2's Sheet probe (D5 pass 6; REGISTRY §P5-8.2, F-12): E-4 `sheet repeat landing` fails in Chromium on F5‴
// (-160 or -35 px from the same drive, 3/3 runs at loads 28-38). Not a witness and not a CK row: it opens the mechanism.
// The drive is E-4's own (e4-momentum.mjs `release`): mouse press on the detent handle, 120 ms, three 40 px moves up
// 16 ms apart, the release at once; 700×500, light, a fresh page per run. Per run it prints:
//   v        the release velocity the Sheet's rule measures, replicated from the pointer events the page saw (window
//            capture; the chord across the samples no older than RELEASE_RULE.windowMs = 100 ms against the lift, the
//            lift a sample; ring 8), in px/s and as the fraction/s the Sheet feeds `resolveRelease` (÷ the dialog's span)
//   dts      the gaps between the delivered move events and the lift, ms (the drive's own timing, as the page saw it)
//   land     the dialog's top edge 2000 ms after the release, minus its top before the press (px, page frame)
//   node sheet-probe.mjs --build <dir> --engine chromium --runs 8 --out <dir>
import { witness, openPage, center, f } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";

async function run(E, T) {
  const P = await openPage(E, T, "sheet", { vp: { width: 700, height: 500 } });
  try {
    await P.page.evaluate(() => {
      window.__ev = [];
      for (const t of ["pointerdown", "pointermove", "pointerup"]) window.addEventListener(t, (e) => window.__ev.push({ t, ts: e.timeStamp, y: e.clientY }), true);
    });
    const top = () => P.page.evaluate(() => document.querySelector('[role="dialog"]')?.getBoundingClientRect().top ?? NaN);
    const span = await P.page.evaluate(() => window.innerHeight);
    const c = await center(P.page, '[data-slot="sheet-detent-handle"]');
    const t0 = await top();
    await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
    for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x, c.y - 40 * k); await P.page.waitForTimeout(16); }
    await P.page.mouse.up();
    await P.page.waitForTimeout(2000);
    const t1 = await top();
    const ev = await P.page.evaluate(() => window.__ev);
    const up = ev.find((e) => e.t === "pointerup"); const s = [...ev.filter((e) => e.t !== "pointerup").slice(-7), up];
    const first = s.find((e) => up.ts - e.ts <= 100); const dt = (up.ts - first.ts) / 1000;
    const v = dt > 0 ? (up.y - first.y) / dt : 0; // px/s, negative = up (toward open)
    const inWin = s.filter((e) => up.ts - e.ts <= 100).length;
    const dts = ev.slice(1).map((e, i) => `${e.t[7] ?? e.t[0]}${(e.ts - ev[i].ts).toFixed(1)}`).join(" ");
    return { v, frac: -v / span, inWin, chord: `${(up.y - first.y).toFixed(0)} px / ${(dt * 1000).toFixed(1)} ms`, dts, land: t1 - t0 };
  } finally { await P.close(); }
}

await witness("F-12s", "the Sheet's repeat landing: release velocity against landing (probe)", async ({ a, E, T, cell, guard }) => {
  const runs = Number(a.runs ?? 8); const rows = [];
  for (let k = 0; k < runs; k++) {
    const r = await guard(`run ${k + 1}`, () => run(E, T), 60000);
    if (r.crashed) { cell(`F-12s run ${k + 1}`, "FAIL", r.line); continue; }
    rows.push(r);
    cell(`F-12s run ${k + 1}`, "REPORT", `land ${f(r.land, 1)} px · v ${f(r.v, 0)} px/s = ${f(r.frac, 2)} fraction/s · chord ${r.chord} over ${r.inWin} samples in the window · event gaps (d down, m move, u up; ms) ${r.dts}`);
  }
  const by = {}; for (const r of rows) (by[f(r.land, 0)] ??= []).push(r.frac);
  cell("F-12s landing by velocity", "REPORT", Object.entries(by).map(([l, vs]) => `land ${l} px: ${vs.length} run(s), v ${vs.map((x) => f(x, 2)).join(", ")} fraction/s`).join(" · "));
}, 1200);
