#!/usr/bin/env node
// E-2 · the commit bar, generalized (D4 T-6 / H-4 carried component-wide; PORTFOLIO §1.1).
// Per scene gated "E-2", light and dark, sampled every frame for 800 ms on the committed element:
//   commit bar     a pop that peaks ≥ 0.015 above its settle (the last sampled scale) and bounces ≥ 0.002 below
//                  it, or a [data-e=body] that travels ≥ 4 px and overshoots its landing by ≥ 0.5 px
//                  (tile/harness/measure.mjs:403, unchanged). Four commits, each gating: keyboard (Tab in from the
//                  sentinel, then the scene's key; the pointer never moves), programmatic (__e.commit() with focus
//                  parked on the after-sentinel), pointer (press 150 ms, read from the release) and tap (coarse:
//                  hasTouch, isMobile in Chromium, verified (hover: none) and (pointer: coarse)).
//   Tab entry      Tab from the sentinel into the scene: scale range < 0.002 and no body moves ≥ 1 px.
//   mount (H-8)    the scene mounted already committed (?on=1&defer=1, sampled across __e.mount()): scale range
//                  < 0.002 and no body moves ≥ 1 px. A component that mounts in its committed state pops nothing.
// A commit that fails on janky frames (median interval > 20 ms) is re-read twice; a failure that does not
// reproduce prints NOT-REPRODUCED and passes. An engine that closes or hangs (PF-1) is relaunched and the cell re-run
// once (H-3); a crash that reproduces fails loud.
//   node e2-commit.mjs --build <dir> | --fixture [--fault e2-prog] [--engine webkit] [--scenes a,b] [--themes light]
import { witness, openPage, scenesFor, commitBar, quiet, medianDt, tabKey, center, BOUNCE } from "./lib.mjs";

const JANK = 20;
await witness("E-2", "the commit bar, generalized", async ({ a, T, E, cell, guard, idx, engine }) => {
  const only = typeof a.scenes === "string" ? a.scenes.split(",") : null;
  const themes = typeof a.themes === "string" ? a.themes.split(",") : ["light", "dark"];
  const SEL = ['[data-e~="target"]', '[data-e~="body"]'];
  const sample = (P, ms = 800) => P.page.evaluate(([t, b, ms]) => window.__sample(t, b, ms), [...SEL, ms]);
  const reread = async (fn) => {
    let r = await fn();
    if (r.pass || r.med <= JANK) return r;
    for (let k = 0; k < 2; k++) { const again = await fn(); if (again.pass) return { ...again, line: `${again.line} · NOT-REPRODUCED: first read failed on janky frames (median ${r.med.toFixed(1)} ms): ${r.line}` }; r = again; }
    return r;
  };
  const emit = (name, r) => cell(name, r.crashed ? "FAIL" : r.unmeasured ? "UNMEASURED" : r.pass ? "PASS" : "FAIL", `${r.line}${r.note ? ` · ${r.note}` : ""}`);
  for (const [sc, m] of scenesFor(idx, "E-2")) {
    if (only && !only.includes(sc)) continue;
    for (const theme of themes) {
      // Tab entry, then the keyboard commit on the same page (the pointer never enters it)
      let tabEntry;
      const kb = await guard(`${sc} keyboard`, () => reread(async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          await P.page.focus('[data-sentinel="before"]');
          const pr = sample(P, 700); await P.page.keyboard.press(tabKey(engine)); const fr = await pr;
          const q = quiet(fr); tabEntry = { pass: q.range < BOUNCE && q.moved < 1, line: `scale range ${q.range.toFixed(3)} body moved ${q.moved.toFixed(2)} px · focus on ${await P.page.evaluate(() => document.activeElement?.getAttribute("role") ?? document.activeElement?.tagName)}` };
          const pr2 = sample(P); await P.page.keyboard.press(m.key); const fr2 = await pr2;
          return { ...commitBar(fr2), med: medianDt(fr2) };
        } finally { await P.close(); }
      }), 45000);
      if (tabEntry && !kb.crashed) emit(`E-2 ${sc} Tab-entry ${theme}`, tabEntry);
      emit(`E-2 ${sc} commit·keyboard(${m.key}) ${theme}`, kb);
      // programmatic: focus parked on the after-sentinel, the model changes
      emit(`E-2 ${sc} commit·programmatic ${theme}`, await guard(`${sc} programmatic`, () => reread(async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          await P.page.focus('[data-sentinel="after"]');
          const pr = sample(P); await P.page.evaluate(() => window.__e.commit()); const fr = await pr;
          return { ...commitBar(fr), med: medianDt(fr) };
        } finally { await P.close(); }
      }), 45000));
      // pointer: press 150 ms, release; read from the release
      emit(`E-2 ${sc} commit·pointer ${theme}`, await guard(`${sc} pointer`, () => reread(async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          const c = await center(P.page, SEL[0]);
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(150);
          const pr = sample(P); await P.page.mouse.up(); const fr = await pr;
          return { ...commitBar(fr), med: medianDt(fr) };
        } finally { await P.close(); }
      }), 45000));
      // tap on a coarse pointer
      emit(`E-2 ${sc} commit·tap(coarse) ${theme}`, await guard(`${sc} tap`, () => reread(async () => {
        const P = await openPage(E, T, sc, { theme, coarse: true });
        try {
          if (!P.modeOk) return { unmeasured: true, pass: false, med: 0, line: `MODE NOT APPLIED (${P.modeLine}): Playwright ${engine} gives no coarse pointer here` };
          const c = await center(P.page, SEL[0]);
          const pr = sample(P); await P.page.touchscreen.tap(c.x, c.y); const fr = await pr;
          return { ...commitBar(fr), med: medianDt(fr) };
        } finally { await P.close(); }
      }), 45000));
      // the mount case (H-8)
      emit(`E-2 ${sc} mount(committed) ${theme}`, await guard(`${sc} mount`, async () => {
        const P = await openPage(E, T, sc, { theme, q: { on: "1", defer: "1" } });
        try {
          const fr = await P.page.evaluate(async ([t, b]) => { const p = window.__sample(t, b, 800); await window.__e.mount(); return p; }, SEL);
          const q = quiet(fr); const present = fr.filter((x) => x.a).length;
          return { pass: present > 10 && q.range < BOUNCE && q.moved < 1, line: `after mount: scale range ${Number.isFinite(q.range) ? q.range.toFixed(3) : "n/a"} body moved ${Number.isFinite(q.moved) ? q.moved.toFixed(2) : "n/a"} px over ${present} of ${fr.length} frames with the target present` };
        } finally { await P.close(); }
      }, 45000));
    }
  }
});
