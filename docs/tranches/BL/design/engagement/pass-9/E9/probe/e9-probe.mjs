#!/usr/bin/env node
// e9-probe · P-E9's own cells (D5 pass 9), on the harness's own app and lib (H9 owns ../../../harness; nothing there is edited).
// O-103f condition (3) "the engaged frame loop runs only while engaged and stops at release, measured", and the loop's
// cost with the lens shown (the loupe laid each frame):
//   loop keyboard   the `slider` scene's slider engaged by Tab from the sentinel, idle 3 s, then Escape. Per window the
//                   page's requestAnimationFrame calls and ResizeObserver callbacks per second (instrumented before any
//                   page script; C-A6's counter), Chromium's CDP LayoutCount / RecalcStyleCount deltas, the number of
//                   [data-engaged] and [data-engage-stage] hosts: rest (3 s), engaged idle (3 s), then from the release
//                   on: 0-150 ms, 150-450 ms (the exit clock: the host is still on the stage), 1.5-4.5 s (after the exit).
//                   GATE: in every window from the release on (0-150 ms included: the exit clock can end inside it), rAF + RO ≤ 2 per second (the window's own edges; the loop
//                   at 60 fps reads ≈ 120/s), while the engaged window reads > 30/s (the loop exists to be stopped).
//                   Plant `plant-loop` (the candidate with the loop kept to the exit clock's end).
//   loop fine-hold  the same slider held by a mouse on its thumb 3 s (the loupe shown, laid each frame), then released:
//                   REPORT rAF, RO, layouts and recalcs per second while held still, and in the windows after release;
//                   the gate as above on the after-release windows.
// Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node e9-probe.mjs --build <dir> [--engine webkit] [--out <dir>]
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, center, f, tabKey } = await import(`${H}/lib.mjs`);

const COUNT = () => {
  window.__ca6 = { raf: 0, ro: 0 };
  const r = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => { window.__ca6.raf++; return r(cb); };
  const RO = window.ResizeObserver;
  window.ResizeObserver = class extends RO { constructor(cb) { super((...x) => { window.__ca6.ro++; return cb(...x); }); } };
};
const STOPPED = 2, RUNNING = 30;

await witness("E9-probe", "P-E9's loop cells (O-103f (3): the engaged frame loop stops at release)", async ({ E, T, cell, guard, engine }) => {
  for (const mode of ["keyboard", "fine-hold"]) {
    const name = `E9 loop ${mode}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "slider", { theme: "light" });
      await P.page.addInitScript(COUNT); await P.page.reload(); await P.page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
      let cdp = null;
      try {
        if (engine === "chromium") { cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable"); }
        const metrics = async () => { const o = { raf: 0, ro: 0, lay: NaN, sty: NaN }; Object.assign(o, await P.page.evaluate(() => ({ ...window.__ca6, eng: document.querySelectorAll("[data-engaged]").length, stage: document.querySelectorAll("[data-engage-stage]").length, lens: document.querySelectorAll(".glass-loupe").length, t: performance.now() }))); if (cdp) { const m = (await cdp.send("Performance.getMetrics")).metrics; o.lay = m.find((x) => x.name === "LayoutCount")?.value; o.sty = m.find((x) => x.name === "RecalcStyleCount")?.value; } return o; };
        const win = async (label, ms) => { const a0 = await metrics(); await P.page.waitForTimeout(ms); const a1 = await metrics(); const s = (a1.t - a0.t) / 1000; return { label, raf: (a1.raf - a0.raf) / s, ro: (a1.ro - a0.ro) / s, lay: (a1.lay - a0.lay) / s, sty: (a1.sty - a0.sty) / s, eng: `${a0.eng}→${a1.eng}`, stage: `${a0.stage}→${a1.stage}`, lens: `${a0.lens}→${a1.lens}`, ms: a1.t - a0.t }; };
        await P.page.waitForTimeout(500);
        const out = [await win("rest", 3000)];
        if (mode === "keyboard") {
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(800);
          out.push(await win("engaged idle", 3000));
          await P.page.keyboard.press("Escape");
        } else {
          const c = await center(P.page, '[role="slider"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(800);
          out.push(await win("held still, loupe shown", 3000));
          await P.page.mouse.up();
        }
        out.push(await win("release +0..150 ms", 150));
        out.push(await win("release +150..450 ms (exit clock)", 300));
        await P.page.waitForTimeout(1050);
        out.push(await win("release +1.5..4.5 s", 3000));
        return { out };
      } finally { await cdp?.detach().catch(() => {}); await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const run = r.out[1], after = r.out.slice(2);
    const rate = (w) => w.raf + w.ro;
    for (const w of r.out) cell(`${name} · ${w.label}`, "REPORT", `rAF ${f(w.raf, 1)}/s · RO callbacks ${f(w.ro, 1)}/s · layouts ${engine === "chromium" ? f(w.lay, 1) : "n/a"}/s · style recalcs ${engine === "chromium" ? f(w.sty, 1) : "n/a"}/s · [data-engaged] ${w.eng} · [data-engage-stage] ${w.stage} · loupe ${w.lens} · window ${f(w.ms, 0)} ms`);
    const ok = rate(run) > RUNNING && after.every((w) => rate(w) <= STOPPED);
    cell(`${name} · stops at release`, ok ? "PASS" : "FAIL", `engaged ${f(rate(run), 1)}/s (> ${RUNNING}: the loop runs); after release ${after.map((w) => `${w.label.replace("release ", "")} ${f(rate(w), 1)}/s`).join(", ")} (each ≤ ${STOPPED}) · [data-engage-stage] across the first window ${r.out[2].stage}`);
  }
});
