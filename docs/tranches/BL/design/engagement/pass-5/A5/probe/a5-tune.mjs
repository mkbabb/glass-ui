// P-A5 DEV probe (not a witness, never a score): the commit-light row's two clocks tuned against the two cells they must
// satisfy together, on the seat's own build: the light IN PAINT over the landing fill (lib.mjs paintFilm + paintRise, the
// E-2 arm-iii read) and C-A4's rebound at +60 / +200 (E-10's frozen-ms and pulse count, its rules restated here). The
// candidate clocks are injected as `--engage-commit-light-{attack,release}` on :root, so one build reads several rows.
//   node a5-tune.mjs --build <dir> [--engine chromium] --clocks 60/360,40/360 [--scenes radio,toggle] [--prm]
import { parseArgs, serveTarget, Engine, openPage, load, paintFilm, paintRise } from "../../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
const scenes = String(a.scenes ?? "radio,switch,checkbox,toggle,chip,accordion").split(",");
const clocks = String(a.clocks ?? "60/360").split(",").map((s) => s.split("/").map(Number));
const film = ([gap, ms]) => new Promise((res) => {
  const target = document.querySelector('[data-e~="target"]'); const face = document.querySelector('[data-e~="face"]') ?? target;
  const seat = () => { const s = face?.querySelector("[data-engage-light]"); return s ? [s, null] : [target, "::after"]; };
  const rd = () => { const [el, ps] = seat(); const cs = getComputedStyle(el, ps); const c = window.__rgba(cs.backgroundColor); return +cs.opacity * (c ? c[3] : 0); };
  const fr = []; const t0 = performance.now(); window.__e.commit(); let flipped = gap == null;
  const tick = () => { const t = performance.now() - t0; if (!flipped && t >= gap) { window.__e.commit(); flipped = true; } fr.push({ t, l: rd() }); if (t < ms) requestAnimationFrame(tick); else res(fr); };
  requestAnimationFrame(tick);
});
const grade = (fr) => { let p = 0, fz = 0, f0 = null; for (let k = 1; k < fr.length - 1; k++) if (fr[k].l > 0.02 && fr[k].l >= fr[k - 1].l && fr[k].l > fr[k + 1].l) p++;
  for (let k = 1; k < fr.length; k++) { const flat = fr[k].l > 0.01 && Math.abs(fr[k].l - fr[k - 1].l) <= 0.0005; if (flat) { if (f0 == null) f0 = fr[k - 1].t; fz = Math.max(fz, fr[k].t - f0); } else f0 = null; } return { p, fz: Math.round(fz) }; };
console.log(`# a5-tune engine ${E.name} load ${load()} at start${a.prm ? " PRM" : ""}`);
try {
  for (const [att, rel] of clocks) for (const sc of scenes) for (const theme of ["light", "dark"]) {
    const css = `:root, .dark { --engage-commit-light-attack: ${att}ms !important; --engage-commit-light-release: ${rel}ms !important; }` +
      (a.ease ? ` [data-engage-light], .engage-chosen::after, .engage-pressed::after, .engage-disclosed::after { transition-timing-function: ${a.ease} !important; }` : "");
    const out = [];
    for (const gap of ["paint", 60, 200]) {
      const P = await openPage(E, T, sc, { theme, prm: !!a.prm });
      try {
        await P.page.addStyleTag({ content: css }); await P.page.waitForTimeout(300);
        if (gap === "paint") {
          const sel = await P.page.evaluate((s) => { const m = window.__e.index[s]; return m.face ?? m.target ?? '[data-e~="target"]'; }, sc);
          const r = paintRise(await paintFilm(P.page, sel, () => P.page.evaluate(() => window.__e.commit())));
          out.push(`paint rise ${Number.isFinite(r.rise) ? r.rise.toFixed(4) : "NaN"} peak@+${r.peakT} rest ${r.rest}${r.starved ? " STARVED" : ""}`);
        } else { const g = grade(await P.page.evaluate(film, [gap, 900])); out.push(`+${gap}: pulses ${g.p} frozen ${g.fz} ms`); }
      } finally { await P.close(); }
    }
    console.log(`  REPORT ${att}/${rel}${a.ease ? ` ease[${a.ease}]` : ""} ${sc} ${theme} · ${out.join(" · ")} · load ${load()}`);
  }
} finally { await E.close(); T.close(); }
