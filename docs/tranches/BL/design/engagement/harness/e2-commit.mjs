#!/usr/bin/env node
// E-2 · CK-02: the commit, by one of three arms, on a commit that happened (pass 2; REGISTRY §P1-6 CK-02).
// Per scene gated "E-2", light and dark, filmed every frame for 800 ms (lib.mjs __film: the target, the body
// [data-e~=body], the painted face [data-e~=face] (default the target) and the face's light):
//   precondition   the scene's state (window.__e.state(), the model the scene binds) changed across the commit; a
//                  commit that changed nothing is NOT DRIVEN and FAILS, never passes (X-5: a radio's ArrowDown that
//                  moves focus without selecting graded a commit that never happened)
//   commit         passes by ONE admitted arm (lib.mjs commitArms): (i) a body's travel with an overshoot; (ii) a
//                  geometric pop whose excursion on the painted face exceeds 0.8 px, with a bounce; (iii) a light
//                  commit: the face's luminance rises above its committed rest and decays to it on an
//                  ENGAGE_ENVELOPES row's clock. Admitted arms default to i,iii: (ii) waits on the owner's Q-5 ruling
//                  (`--commit-arms i,ii,iii` admits it; every line prints all three readings either way). Paths, each
//                  gating: keyboard (Tab in from the sentinel, then the scene's key or keys; the pointer never moves),
//                  programmatic (__e.commit() with focus parked after), pointer (press 150 ms, read from the release),
//                  tap on a coarse pointer
//   Tab entry      Tab from the sentinel into the scene: scale range < 0.002, no body moves ≥ 1 px, no light rise
//                  ≥ 0.01, and the state unchanged
//   mount (H-8)    mounted already committed (?on=1&defer=1, filmed across __e.mount()): nothing commits (lib.mjs
//                  commitsIn, H3: no light above its committed rest ≥ 0.01 on any frame, read without a rise from below,
//                  so a light lit on the first frame and decaying counts; no scale or body in flight)
//   arrival (CK-03, H3; C-CP probe/arrival.mjs made a cell) the scene deferred (?defer=1), its model set:
//                  pre       in the same task as the mount call, before it renders (mounts committed): 0 commits
//                  own       in the mount's own task, after its render (await mount(); commit()): 0 commits
//                  ownflush  as own, after one computed-style read of every element of the scene and its ::before and
//                            ::after (the style-read control: C-CP found A quiet on `own` only while nothing read
//                            style during the mount, 2/2 with the read against 0/2 without): 0 commits
//                  late      after first paint (two frames): 1 commit, by an admitted arm (the programmatic commit)
//                  the state must change across each (else NOT DRIVEN); the film starts after the model is set, so the
//                  harness's own reads are not the style read. A `stateless` scene has no model to arrive: REPORT
//   stateless      (H3 ruling) a scene marked `stateless` (Button, the action Chip) has no model: its programmatic
//                  commit is its activation, `element.click()` on the target, driven here, not through __e.commit
// A commit that fails on janky frames (median interval > 20 ms) is re-read twice; a failure that does not reproduce
// prints NOT-REPRODUCED and passes. An engine that closes or hangs (PF-1) is relaunched and the cell re-run once (H-3).
//   node e2-commit.mjs --build <dir> | --fixture [--fault e2-prog] [--engine webkit] [--scenes a,b] [--themes light]
//                      [--commit-arms i,ii,iii]
import { witness, openPage, scenesFor, commitArms, commitsIn, quiet, medianDt, tabKey, center, BOUNCE, LIGHT_RISE, DEFAULT_ARMS, KEY_DWELL, f } from "./lib.mjs";

const JANK = 20;
// A film the machine starved (under half its nominal frames, or one gap over 100 ms) is janky whatever its median reads:
// at load 264-1000 a control's 800 ms film came back with 19, 47 and 62 frames and a 2-frame mount (../pass-2/H2.md §2.3).
const starved = (fr, ms = 800) => fr.length < ms / 16.7 / 2 || fr.slice(1).some((x, k) => x.t - fr[k].t > 100);
const jank = (fl) => (starved(fl.fr) ? Infinity : medianDt(fl.fr));
await witness("E-2", "CK-02 the commit, by one arm, on a commit that happened", async ({ a, T, E, cell, guard, idx, engine }) => {
  const only = typeof a.scenes === "string" ? a.scenes.split(",") : null;
  const themes = typeof a.themes === "string" ? a.themes.split(",") : ["light", "dark"];
  const arms = typeof a["commit-arms"] === "string" ? a["commit-arms"].split(",") : DEFAULT_ARMS;
  console.log(`# admitted commit arms: ${arms.join(",")}${arms.includes("ii") ? " (arm ii admitted: the owner's Q-5 ruling must be cited by the run)" : " (arm ii printed, not admitted: Q-5 unruled, springPresets.ts:55-57 stands)"}`);
  const film = (P, m, ms = 800) => P.page.evaluate(([o]) => window.__film(o), [{ target: '[data-e~="target"]', body: '[data-e~="body"]', face: m.face ? '[data-e~="face"]' : '[data-e~="target"]', ms }]);
  const state = (P) => P.page.evaluate(() => JSON.stringify(window.__e.state?.() ?? null));
  const env = (P) => P.page.evaluate(() => window.__e.envelopes ?? []);
  const reread = async (fn) => {
    let r = await fn();
    if (r.pass || r.notDriven || r.med <= JANK) return r;
    for (let k = 0; k < 2; k++) { const again = await fn(); if (again.pass) return { ...again, line: `${again.line} · NOT-REPRODUCED: first read failed on janky frames (${Number.isFinite(r.med) ? `median ${r.med.toFixed(1)} ms` : "a starved film"}): ${r.line}` }; r = again; }
    return r;
  };
  // the commit's verdict: NOT DRIVEN when the state did not change, else the arms
  const judge = (s0, s1, fl, en) => {
    if (s0 === s1) return { pass: false, notDriven: true, med: jank(fl), line: `NOT DRIVEN: the scene's state did not change (${String(s0).slice(0, 80)}); a commit that never happened is not graded` };
    const r = commitArms(fl, arms, en); return { ...r, med: jank(fl), line: `state ${String(s0).slice(0, 40)} → ${String(s1).slice(0, 40)} · ${r.line}` };
  };
  const emit = (name, r) => cell(name, r.crashed ? "FAIL" : r.unmeasured ? "UNMEASURED" : r.pass ? "PASS" : "FAIL", `${r.line}${r.note ? ` · ${r.note}` : ""}`);
  const keys = (m) => (Array.isArray(m.keys) ? m.keys : [m.key]);
  for (const [sc, m] of scenesFor(idx, "E-2")) {
    if (only && !only.includes(sc)) continue;
    for (const theme of themes) {
      // Tab entry, then the keyboard commit on the same page (the pointer never enters it)
      let tabEntry;
      const kb = await guard(`${sc} keyboard`, () => reread(async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          const en = await env(P);
          await P.page.focus('[data-sentinel="before"]');
          const s0 = await state(P);
          const pr = film(P, m, 700); await P.page.keyboard.press(tabKey(engine)); const fl = await pr;
          const s1 = await state(P);
          const q = quiet(fl.fr); const lightQuiet = !(q.rise >= LIGHT_RISE);
          tabEntry = { pass: q.range < BOUNCE && q.moved < 1 && lightQuiet && s0 === s1, line: `scale range ${q.range.toFixed(3)} body moved ${q.moved.toFixed(2)} px light rise ${f(q.rise, 4)} (bounds < ${BOUNCE}, < 1 px, < ${LIGHT_RISE}) · state ${s0 === s1 ? "unchanged" : "CHANGED"} · focus on ${await P.page.evaluate(() => document.activeElement?.getAttribute("role") ?? document.activeElement?.tagName)}` };
          const pr2 = film(P, m); for (const k of keys(m)) await P.page.keyboard.press(k, KEY_DWELL); const fl2 = await pr2;
          return judge(s1, await state(P), fl2, en);
        } finally { await P.close(); }
      }), 45000);
      if (tabEntry && !kb.crashed) emit(`E-2 ${sc} Tab-entry ${theme}`, tabEntry);
      emit(`E-2 ${sc} commit·keyboard(${keys(m).join("+")}) ${theme}`, kb);
      // programmatic: focus parked on the after-sentinel, the model changes
      emit(`E-2 ${sc} commit·programmatic ${theme}`, await guard(`${sc} programmatic`, () => reread(async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          const en = await env(P);
          await P.page.focus('[data-sentinel="after"]'); const s0 = await state(P);
          // H3 ruling: a stateless control's programmatic commit is element.click() on its target
          const pr = film(P, m); await P.page.evaluate((sl) => (sl ? document.querySelector('[data-e~="target"]').click() : window.__e.commit()), !!m.stateless); const fl = await pr;
          const r = judge(s0, await state(P), fl, en); return m.stateless ? { ...r, line: `element.click() (stateless) · ${r.line}` } : r;
        } finally { await P.close(); }
      }), 45000));
      // pointer: press 150 ms, release; read from the release
      emit(`E-2 ${sc} commit·pointer ${theme}`, await guard(`${sc} pointer`, () => reread(async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          const en = await env(P);
          const c = await center(P.page, '[data-e~="target"]'); const s0 = await state(P);
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(150);
          const pr = film(P, m); await P.page.mouse.up(); const fl = await pr;
          return judge(s0, await state(P), fl, en);
        } finally { await P.close(); }
      }), 45000));
      // tap on a coarse pointer
      emit(`E-2 ${sc} commit·tap(coarse) ${theme}`, await guard(`${sc} tap`, () => reread(async () => {
        const P = await openPage(E, T, sc, { theme, coarse: true });
        try {
          if (!P.modeOk) return { unmeasured: true, pass: false, med: 0, line: `MODE NOT APPLIED (${P.modeLine}): Playwright ${engine} gives no coarse pointer here` };
          const en = await env(P);
          const c = await center(P.page, '[data-e~="target"]'); const s0 = await state(P);
          const pr = film(P, m); await P.page.touchscreen.tap(c.x, c.y); const fl = await pr;
          return judge(s0, await state(P), fl, en);
        } finally { await P.close(); }
      }), 45000));
      // the mount case (H-8)
      emit(`E-2 ${sc} mount(committed) ${theme}`, await guard(`${sc} mount`, () => reread(async () => {
        const P = await openPage(E, T, sc, { theme, q: { on: "1", defer: "1" } });
        try {
          const fl = await P.page.evaluate(async ([o]) => { const p = window.__film(o); await window.__e.mount(); return p; }, [{ target: '[data-e~="target"]', body: '[data-e~="body"]', face: m.face ? '[data-e~="face"]' : '[data-e~="target"]', ms: 800 }]);
          const q = quiet(fl.fr); const c = commitsIn(fl); const present = fl.fr.filter((x) => x.a).length;
          return { med: jank(fl), pass: present > 10 && q.range < BOUNCE && q.moved < 1 && c.n === 0 && c.ground, line: `after mount: scale range ${Number.isFinite(q.range) ? q.range.toFixed(3) : "n/a"} body moved ${Number.isFinite(q.moved) ? q.moved.toFixed(2) : "n/a"} px · ${c.line} · ${present} of ${fl.fr.length} frames with the target present` };
        } finally { await P.close(); }
      }), 45000));
      // CK-03's async arrival (H3)
      for (const mode of ["pre", "own", "ownflush", "late"]) {
        const nm = `E-2 ${sc} arrival·${mode} ${theme}`;
        if (m.stateless) { cell(nm, "REPORT", "stateless: no model to arrive (H3 ruling)"); continue; }
        emit(nm, await guard(`${sc} arrival ${mode}`, () => reread(async () => {
          const P = await openPage(E, T, sc, { theme, q: { defer: "1" } });
          try {
            const en = await env(P);
            const r = await P.page.evaluate(async ([o, mode]) => {
              const raf = () => new Promise((ok) => requestAnimationFrame(ok));
              const st = () => JSON.stringify(window.__e.state?.() ?? null);
              const s0 = st();
              if (mode === "pre") { window.__e.mount(); window.__e.commit(); }
              else {
                await window.__e.mount();
                if (mode === "ownflush") for (const e of document.querySelectorAll("main *")) { getComputedStyle(e).opacity; getComputedStyle(e, "::before").opacity; getComputedStyle(e, "::after").opacity; }
                if (mode === "late") { await raf(); await raf(); }
                window.__e.commit();
              }
              const fl = await window.__film(o);
              return { s0, s1: st(), fl };
            }, [{ target: '[data-e~="target"]', body: '[data-e~="body"]', face: m.face ? '[data-e~="face"]' : '[data-e~="target"]', ms: 800 }, mode]);
            if (r.s0 === r.s1) return { pass: false, notDriven: true, med: jank(r.fl), line: `NOT DRIVEN: the scene's state did not change (${String(r.s0).slice(0, 60)}); an arrival that set nothing is not graded` };
            const head = `state ${String(r.s0).slice(0, 30)} → ${String(r.s1).slice(0, 30)}`;
            if (mode === "late") { const a = commitArms(r.fl, arms, en); return { ...a, med: jank(r.fl), line: `${head} · after first paint, 1 commit wanted · ${a.line}` }; }
            const c = commitsIn(r.fl);
            return { pass: c.n === 0 && c.ground, med: jank(r.fl), line: `${head} · ${mode === "pre" ? "set before the mount rendered" : mode === "own" ? "set in the mount's own task" : "set in the mount's own task after a style read"}, 0 commits wanted, ${c.n} read · ${c.line}` };
          } finally { await P.close(); }
        }), 45000));
      }
    }
  }
});
