#!/usr/bin/env node
// P-E14 part B (D5 pass 14, wave 3): the two cost cells P-E14 §S14-h adds, read on a built candidate. Not a witness of record: every cell
// is REPORT. The harness's own scene app and lib (witness(), openPage(), the E-13 loupe scene with no clip): one browser per run, a fresh
// context per cell, every page and context closed in a finally, the browser closed by witness().
//   carrier · rest|held   a page loop writes the slider's parent's inline `translate` every frame (a sine of 80 px over 500 ms, M5's carrier)
//                         for 3 s, at rest and with the slider held (a mouse press on its thumb). Chromium: CDP Performance metrics over the
//                         window, per frame (layouts, style recalcs, layout / recalc / script ms). WebKit: frames in the window and the
//                         median and p90 rAF interval (the engine's own metrics are not exposed)
//   step · inside|outside a 200 px block inserted above the held slider inside a card under `perspective(400px) rotateX(40deg)` (M1), or above
//                         the card (M2), 10 rounds. Chromium: CDP metrics over the act's frame and the next (layouts, recalcs, script ms).
//                         WebKit: the act frame's rAF interval against the median of the 10 frames before
//   usage: node cost14.mjs --build <dir> --label <l> --engine chromium|webkit --out <dir>
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, scenesFor, center, f } = await import(`${H}/lib.mjs`);
const q = (xs, p) => { const s = [...xs].sort((a, b) => a - b); return s.length ? s[Math.min(s.length - 1, Math.floor(p * s.length))] : NaN; };
await witness("PE14 cost", "S14-h's carrier-loop and step-frame cost cells, REPORT only", async ({ a, E, T, cell, guard, idx, engine }) => {
  const [sc, m] = scenesFor(idx, "E-13").find(([, x]) => x.loupe && !x.clip);
  const R = m.root ?? '[data-e~="root"]', TH = m.thumb ?? '[role="slider"]'; const label = typeof a.label === "string" ? a.label : "c";
  const metrics = async (cdp) => Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((x) => [x.name, x.value]));
  const press = async (P) => { const c = await center(P.page, TH); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); };
  for (const held of [false, true]) {
    const name = `carrier · ${held ? "held" : "rest"}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        const cdp = engine === "chromium" ? await P.ctx.newCDPSession(P.page) : null; if (cdp) await cdp.send("Performance.enable");
        await P.page.evaluate((R) => { const C = document.querySelector(R).parentElement; const t0 = performance.now(); const loop = (t) => { C.style.translate = `${80 * Math.sin(((t - t0) / 500) * 2 * Math.PI)}px 0`; window.__cl = requestAnimationFrame(loop); }; window.__cl = requestAnimationFrame(loop); }, R);
        if (held) { await press(P); await P.page.waitForTimeout(400); }
        const m0 = cdp ? await metrics(cdp) : null;
        const fr = await P.page.evaluate(() => new Promise((ok) => { const d = []; let last = 0; const t0 = performance.now(); const tick = (t) => { if (last) d.push(t - last); last = t; if (t - t0 < 3000) requestAnimationFrame(tick); else ok(d); }; requestAnimationFrame(tick); }));
        const m1 = cdp ? await metrics(cdp) : null;
        const eng = await P.page.evaluate(() => !!document.querySelector("[data-engaged]"));
        if (held) await P.page.mouse.up();
        return { fr, m0, m1, eng };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const n = r.fr.length + 1;
    const cdpLine = r.m0 ? ` · per frame: layouts ${f((r.m1.LayoutCount - r.m0.LayoutCount) / n, 3)}, recalcs ${f((r.m1.RecalcStyleCount - r.m0.RecalcStyleCount) / n, 3)}, layout ${f(((r.m1.LayoutDuration - r.m0.LayoutDuration) * 1000) / n, 4)} ms, recalc ${f(((r.m1.RecalcStyleDuration - r.m0.RecalcStyleDuration) * 1000) / n, 4)} ms, script ${f(((r.m1.ScriptDuration - r.m0.ScriptDuration) * 1000) / n, 4)} ms, task ${f(((r.m1.TaskDuration - r.m0.TaskDuration) * 1000) / n, 4)} ms` : "";
    cell(name, "REPORT", `${label} · a sine of 80 px / 500 ms on the slider's parent's translate for 3 s · frames ${n}, rAF interval median ${f(q(r.fr, 0.5), 2)} ms, p90 ${f(q(r.fr, 0.9), 2)} ms${cdpLine} · engaged ${r.eng}`);
  }
  for (const where of ["inside", "outside"]) {
    const name = `step · ${where} a perspective(400px) rotateX(40deg) card · 200 px insert above the held slider`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, {});
      try {
        const cdp = engine === "chromium" ? await P.ctx.newCDPSession(P.page) : null; if (cdp) await cdp.send("Performance.enable");
        await P.page.evaluate((R) => { const root = document.querySelector(R); const C = root.parentElement; const card = document.createElement("div"); card.id = "cost-card"; card.style.cssText = "transform: perspective(400px) rotateX(40deg); padding: 8px"; C.parentElement.insertBefore(card, C); card.appendChild(C); }, R);
        await P.page.waitForTimeout(200); await press(P); await P.page.waitForTimeout(500);
        const out = [];
        for (let k = 0; k < 10; k++) {
          const m0 = cdp ? await metrics(cdp) : null;
          const fr = await P.page.evaluate(([where, R]) => new Promise((ok) => { const d = []; let last = 0, n = 0; const card = document.getElementById("cost-card"); const root = document.querySelector(R);
            const tick = (t) => { if (last) d.push(t - last); last = t; n++; if (n === 11) { const b = document.createElement("div"); b.className = "cost-ins"; b.style.height = "200px"; if (where === "inside") root.parentElement.insertBefore(b, root); else card.parentElement.insertBefore(b, card); }
              if (n < 14) requestAnimationFrame(tick); else { document.querySelectorAll(".cost-ins").forEach((x) => x.remove()); ok(d); } }; requestAnimationFrame(tick); }), [where, R]);
          const m1 = cdp ? await metrics(cdp) : null;
          out.push({ fr, m0, m1 }); await P.page.waitForTimeout(400);
        }
        const eng = await P.page.evaluate(() => !!document.querySelector("[data-engaged]")); await P.page.mouse.up();
        return { out, eng };
      } finally { await P.close(); }
    }, 90000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const act = r.out.map((o) => o.fr[10]), before = r.out.map((o) => q(o.fr.slice(0, 10), 0.5));
    const per = (k) => r.out[0].m0 ? q(r.out.map((o) => o.m1[k] - o.m0[k]), 0.5) : NaN;
    const cdpLine = r.out[0].m0 ? ` · CDP over the 14-frame window (insert + removal), median of 10: layouts ${f(per("LayoutCount"), 1)}, recalcs ${f(per("RecalcStyleCount"), 1)}, layout ${f(per("LayoutDuration") * 1000, 3)} ms, recalc ${f(per("RecalcStyleDuration") * 1000, 3)} ms, script ${f(per("ScriptDuration") * 1000, 3)} ms` : "";
    cell(name, "REPORT", `${label} · the act frame's rAF interval median ${f(q(act, 0.5), 2)} ms (max ${f(Math.max(...act), 2)}) against the frames before ${f(q(before, 0.5), 2)} ms${cdpLine} · engaged ${r.eng}`);
  }
});
