#!/usr/bin/env node
// arrival.mjs · C-CP, CK-03's async arrival on the CP members (the scene app's deferred mount, `&defer=1`):
//   pre     the model set before the mount renders (mount() and commit() in one task, nothing awaited): mounts committed, 0 lights
//   own     the model set in the mount's own task, after its render (await mount(); commit()): 0 lights
//   ownflush  as own, with one getComputedStyle read of the seat before the write (cause control for `own`)
//   late    the model set after first paint (await mount(); two frames; commit()): 1 light
// Read: the light seat's P (opacity × background alpha) peak over 600 ms, and the state after.
//   node arrival.mjs --build <dir> --label <l> --engine chromium|webkit
import { Engine, serveTarget, openPage, acquireLock, load, parseArgs, f } from "../../../harness/lib.mjs";
const a = parseArgs(); const engine = a.engine === "webkit" ? "webkit" : "chromium";
await acquireLock(); const T = await serveTarget({ build: a.build }); const E = new Engine(engine); await E.browser();
const SC = { switch: ['[role="switch"]', '[role="switch"] [data-engage-light]', null, "data-state"], accordion: [".disclosure-trigger", ".disclosure-trigger", "::after", "data-state"] };
try {
  for (const theme of ["light", "dark"]) for (const [scene, [tgt, seat, ps, attr]] of Object.entries(SC)) for (const mode of (a.modes ?? "pre,own,late").split(",")) {
    const P = await openPage(E, T, scene, { theme, q: { defer: "1" } });
    const r = await P.page.evaluate(({ tgt, seat, ps, attr, mode }) => new Promise(async (ok) => {
      const raf = () => new Promise((r) => requestAnimationFrame(r));
      if (mode === "pre") { window.__e.mount(); window.__e.commit(); await new Promise((r) => setTimeout(r, 0)); }
      else if (mode === "own") { await window.__e.mount(); window.__e.commit(); }
      else if (mode === "ownflush") { await window.__e.mount(); const s = document.querySelector(seat); if (s) getComputedStyle(s, ps).opacity; window.__e.commit(); }
      else { await window.__e.mount(); await raf(); await raf(); window.__e.commit(); }
      let pk = 0; const t0 = performance.now();
      const tick = () => { const s = document.querySelector(seat); if (s) { const cs = getComputedStyle(s, ps); const c = window.__rgba(cs.backgroundColor); pk = Math.max(pk, +cs.opacity * (c ? c[3] : 0)); } if (performance.now() - t0 < 600) requestAnimationFrame(tick); else ok({ pk, st: document.querySelector(tgt)?.getAttribute(attr) }); };
      requestAnimationFrame(tick);
    }), { tgt, seat, ps, attr, mode });
    const want = mode === "late" ? 1 : 0; const got = r.pk >= 0.005 ? 1 : 0;
    console.log(`  ${(got === want ? "PASS" : "FAIL").padEnd(5)} ${a.label} ${engine} ${theme} ${scene} ${mode.padEnd(4)} · state ${r.st} · seat peak P ${f(r.pk, 4)} · lights ${got} (want ${want}) · load ${load()}`);
    await P.close();
  }
} finally { await E.close(); T.close(); }
