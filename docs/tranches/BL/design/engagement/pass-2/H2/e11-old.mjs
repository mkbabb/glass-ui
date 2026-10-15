// e11-old.mjs · H2 §2.3: E-11 with its pre-2026-10-14 degradation rule (one planted read against a two-run spread), kept
// only to show the e11-noise control fails the old rule. Not a witness.
// E-11 · CK-21: no silent degradation (E-2, the engineering law's no masking fallback; pass 2, REGISTRY §P1-6 CK-21).
// Every token, clock or registered input the engagement code reads at runtime fails loud (a console.error) when it is
// unreadable. Per scene gated "E-11", per plant in its row's `failLoud` list ({ token, value, act, on? }): the act is
// run on fresh pages, twice clean and once with the token set (and, to confirm a degradation, once more each; below),
// with the token set to the plant's value on the scene's root (`on`,
// default [data-e~=root], else the target), and the engagement read both times:
//   kbd     Tab in from the sentinel, +450 ms: the root's scale, the veil, [data-engaged] count
//   fling   E-4's drive (three 40 px moves, released at once), the body's position read for 1200 ms: its furthest point
//   commit  __e.commit(), filmed 800 ms: the face's scale peak and light rise
// fail-loud <token>  PASS when the planted run raised ≥ 1 console.error (or a page error); FAIL when the planted read
//                    differs from the clean read (a degradation) with no error: the silent answer, including a
//                    registered property's initial value; UNMEASURED when nothing degraded and nothing was raised (the
//                    code does not read the token on this path: not a pass)
// The named plants (REGISTRY §P1-6 CK-21): C-E/plant-fallback.mjs's three (--space-section and --scale-engage on the
// slider, kbd; --spring-dock-settle, fling) and C-B's unreadable crest (--scale-commit-pop: 1 on the switch, commit).
//   node e11-fail-loud.mjs --build <dir> | --fixture [--fault e11-silent] [--engine webkit]
import { witness, openPage, scenesFor, center, tabKey, f } from "../../harness/lib.mjs";

const EPS_S = 0.003, EPS_PX = 1, EPS_L = 0.005;
await witness("E-11", "CK-21 no silent degradation", async ({ E, T, cell, guard, idx, engine }) => {
  for (const [sc, m] of scenesFor(idx, "E-11")) {
    for (const pl of m.failLoud ?? []) {
      const nm = `E-11 ${sc} fail-loud ${pl.token}${pl.value === "nonsense" ? "" : `=${pl.value}`} (${pl.act})`;
      const run = (plant) => guard(`${nm}${plant ? " plant" : ""}`, async () => {
        const P = await openPage(E, T, sc);
        try {
          await P.page.waitForTimeout(150); const e0 = P.errors.length;
          if (plant) await P.page.evaluate(([on, tok, v]) => { const el = document.querySelector(on ?? '[data-e~="root"]') ?? document.querySelector('[data-e~="target"]'); el?.style.setProperty(tok, v); }, [pl.on ?? null, pl.token, pl.value]);
          let read;
          if (pl.act === "kbd") {
            await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450);
            read = await P.page.evaluate(() => { const r = document.querySelector('[data-e~="root"]') ?? document.querySelector('[data-e~="target"]'); const v = [...document.querySelectorAll("[data-engaged], .glass-focus-veil, .fx-veil")].filter((e) => !r.contains(e)); return { s: window.__eff(r).s, veil: Math.max(0, ...v.map((e) => +getComputedStyle(e).opacity)), n: document.querySelectorAll("[data-engaged]").length }; });
          } else if (pl.act === "fling") {
            const c = await center(P.page, '[data-e~="thumb"]');
            const pr = P.page.evaluate(() => new Promise((ok) => { let mx = -1e9; const t0 = performance.now(); const tick = () => { const b = document.querySelector('[data-e~="body"]') ?? document.querySelector('[data-e~="thumb"]'); const r = b.getBoundingClientRect(); mx = Math.max(mx, r.right); if (performance.now() - t0 < 1700) requestAnimationFrame(tick); else ok({ x: mx }); }; requestAnimationFrame(tick); }));
            await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(120);
            for (let k = 1; k <= 3; k++) { await P.page.mouse.move(c.x + 40 * k, c.y); await P.page.waitForTimeout(16); }
            await P.page.mouse.up(); read = await pr;
          } else {
            const fl = await P.page.evaluate(async (o) => { const p = window.__film(o); window.__e.commit(); return p; }, { target: '[data-e~="target"]', face: '[data-e~="target"]', ms: 800 });
            const s = fl.fr.filter((x) => x.f).map((x) => x.f.s); const L = fl.fr.map((x) => x.L).filter(Number.isFinite);
            read = { peak: Math.max(...s) - s.at(-1), rise: L.length ? Math.max(...L) - L.at(-1) : 0 };
          }
          return { read, errors: P.errors.slice(e0) };
        } finally { await P.close(); }
      }, 60000);
      const a = await run(false), a2 = await run(false), b = await run(true);
      if (a.crashed || a2.crashed || b.crashed) { cell(nm, "FAIL", a.line ?? a2.line ?? b.line); continue; }
      const x = a.read, x2 = a2.read, y = b.read;
      const off = (k, eps) => Math.abs(x[k] - y[k]) > eps + Math.abs(x[k] - x2[k]);
      const degraded = pl.act === "kbd" ? off("s", EPS_S) || off("veil", 0.05) || (x.n !== y.n && x.n === x2.n) : pl.act === "fling" ? off("x", EPS_PX) : off("peak", EPS_S) || off("rise", EPS_L);
      const loud = b.errors.length > 0;
      const line = `clean ${JSON.stringify(x)} · clean again ${JSON.stringify(x2)} · planted ${JSON.stringify(y)} (old rule)`;
      cell(nm, loud ? "PASS" : degraded ? "FAIL" : "UNMEASURED", `${loud ? "fails loud" : degraded ? "SILENT DEGRADATION" : "no degradation, no error: the token is not read on this path"} · ${line}`);
    }
  }
});
