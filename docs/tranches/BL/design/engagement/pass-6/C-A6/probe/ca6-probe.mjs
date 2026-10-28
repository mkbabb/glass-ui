#!/usr/bin/env node
// C-A6 adversarial probe (D5 pass 6, the fresh critic of the candidate A+E = F5‴ + P-A6 + P-E6-noveil-coarse).
// Not a witness: each cell is scored in C-A6.md against the CK row it would break. App: the harness's own scene app.
// Through the harness's lib: one browser per run, a fresh context per cell, every page/context closed in a finally,
// the browser closed by witness(); WebKit relaunches every NAV_CAP navigations (H3-1). Films take no screenshot.
//   node ca6-probe.mjs --build <out>/builds/<label> [--engine webkit] [--out <dir>] [--only prmplant,idle,crest,chip]
// Cells:
//   prmplant <scene>   CK-02 PRM / CK-27 "a gate that cannot fail": the A6 probe's PRM cell (Tab in, the scene's
//        commit key, film 600 ms) with a PLANT that resurrects the pop under reduce (a later `@layer components` block,
//        more specific than the instant fallback, gives the pop's members `transition-duration: 400ms !important` and
//        the pop's transform back). The cell must FAIL (scale range ≥ 0.002) for the PRM cell to be able to fail.
//   idle <mode>        CK-16 / D-1 cost: a slider engaged by the keyboard (Tab from the sentinel) and left idle.
//        Counts, per second, the page's requestAnimationFrame calls and ResizeObserver callbacks (instrumented before
//        any page script), and in Chromium the CDP LayoutCount / RecalcStyleCount deltas, over 3 s windows:
//        before engagement (rest), engaged idle on-screen, engaged idle scrolled off-screen, after Escape.
//        REPORT cells; the reading is C-A6.md's.
//   crest <token> <scene>  CK-21: the pop's inputs other than the `--engage-*` clocks (E-11 enumerates only those):
//        `--scale-commit-pop`, `--scale-commit-pop-bit`, `--spring-panel-duration`, `--spring-panel`, planted
//        `nonsense` on <html> before the first script. A programmatic commit is filmed. PASS when ≥ 1 console.error
//        names the token or the crest, or the pop is intact (peak within 0.002 of the unplanted peak). FAIL when the
//        pop degraded and nothing was said (a silent degradation). The unplanted read is printed as the control.
//   chip <theme>       D-2 on the composer P-A6 took off the capsule: the Configurator preset chip's paint at rest,
//        under a fine hover (400 ms) and under a held fine press (250 ms): the fraction of its pixels that change by
//        ≥ 16 levels, and its scale. REPORT.
import { witness, openPage, scenesFor, f, tabKey, KEY_DWELL } from "../../../harness/lib.mjs";
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const { PNG } = require("pngjs");

const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const changed = (a, b) => { if (!a || !b || a.w !== b.w || a.h !== b.h) return NaN; let n = 0; for (let i = 0; i < a.o.length; i++) if (Math.abs(a.o[i] - b.o[i]) >= 16) n++; return n / a.o.length; };
const bbox = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }, sel);
const shot = async (page, bb) => (bb ? luma(await page.screenshot({ clip: { x: Math.max(0, Math.floor(bb.x) - 4), y: Math.max(0, Math.floor(bb.y) - 4), width: Math.ceil(bb.w) + 8, height: Math.ceil(bb.h) + 8 }, animations: "allow", caret: "initial" })) : null);
const film = ([target, ms]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const tick = () => { const a = document.querySelector(target); fr.push({ t: performance.now() - t0, s: a ? window.__eff(a).s : NaN }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); };
  requestAnimationFrame(tick);
});
const PLANT_CSS = `@layer components { @media (prefers-reduced-motion: reduce) { html body :is(.engage-chosen, .engage-pressed, .engage-disclosed), html body :is(.engage-chosen, .engage-pressed, .engage-disclosed) * { transition-duration: 400ms !important; } html body :is(.engage-chosen, .engage-pressed, .engage-disclosed) { transform: scale(calc(1 + (var(--rung-crest) - 1) * sin(var(--rung-commit) * 180deg))); } } }`;
// instrumentation, before any page script: rAF calls and ResizeObserver callbacks
const COUNT = () => {
  window.__ca6 = { raf: 0, ro: 0 };
  const r = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => { window.__ca6.raf++; return r(cb); };
  const RO = window.ResizeObserver;
  window.ResizeObserver = class extends RO { constructor(cb) { super((...x) => { window.__ca6.ro++; return cb(...x); }); } };
};

await witness("CA6-probe", "C-A6's adversarial cells (CK-02 PRM plant, CK-16 idle engaged, CK-21 crest inputs, D-2 preset chip)", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const want = (k) => !only || only.has(k);

  if (want("prmplant")) for (const [sc, m] of scenesFor(idx, "E-2")) {
    if (m.stateless) continue;
    const name = `prmplant ${sc} light`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc, { theme: "light", prm: true });
      try {
        if (!P.modeOk) return { mode: P.modeLine };
        await P.page.addStyleTag({ content: PLANT_CSS });
        await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(300);
        const st = () => P.page.evaluate(() => JSON.stringify(window.__e.state?.() ?? null));
        const s0 = await st();
        const pf = P.page.evaluate(film, [m.target, 700]);
        await P.page.keyboard.press(m.key, KEY_DWELL); const fr = await pf; const s1 = await st();
        const s = fr.map((x) => x.s).filter(Number.isFinite);
        return { s0, s1, range: s.length ? Math.max(...s) - Math.min(...s) : NaN, n: s.length };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
    const driven = r.s0 !== r.s1;
    // the plant must make the PRM instant read fail: a scale range ≥ 0.002 on a commit that happened
    cell(name, !driven ? "UNMEASURED" : r.range >= 0.002 ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN · "}PLANT (pop resurrected under reduce): scale range ${f(r.range, 4)} over ${r.n} frames · PASS here means the PRM cell's bound (< 0.002) sees the planted pop; FAIL means the plant did not reach the face (the PRM cell would pass a resurrected pop)`);
  }

  if (want("idle")) {
    const name = "idle slider keyboard-engaged";
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "slider", { theme: "light" });
      // instrumentation must precede the page's scripts: reload with the init script in place
      await P.page.addInitScript(COUNT); await P.page.reload(); await P.page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
      let cdp = null;
      try {
        if (engine === "chromium") { cdp = await P.ctx.newCDPSession(P.page); await cdp.send("Performance.enable"); }
        const metrics = async () => { const o = { raf: 0, ro: 0, lay: NaN, sty: NaN }; Object.assign(o, await P.page.evaluate(() => ({ ...window.__ca6 }))); if (cdp) { const m = (await cdp.send("Performance.getMetrics")).metrics; o.lay = m.find((x) => x.name === "LayoutCount")?.value; o.sty = m.find((x) => x.name === "RecalcStyleCount")?.value; } return o; };
        const win = async (label, ms = 3000) => { const a0 = await metrics(); await P.page.waitForTimeout(ms); const a1 = await metrics(); const s = ms / 1000; return { label, raf: (a1.raf - a0.raf) / s, ro: (a1.ro - a0.ro) / s, lay: (a1.lay - a0.lay) / s, sty: (a1.sty - a0.sty) / s, eng: await P.page.evaluate(() => document.querySelectorAll("[data-engaged]").length) }; };
        await P.page.waitForTimeout(500);
        const out = [await win("rest")];
        await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(800);
        out.push(await win("engaged idle"));
        await P.page.evaluate(() => { const s = document.createElement("div"); s.style.height = "4000px"; s.setAttribute("data-ca6", "spacer"); document.body.append(s); window.scrollTo(0, 3000); });
        await P.page.waitForTimeout(800);
        const vis = await P.page.evaluate(() => { const e = document.querySelector("[data-engaged]") ?? document.activeElement; const r = e?.getBoundingClientRect(); return r ? `${r.top.toFixed(0)}..${r.bottom.toFixed(0)} of ${innerHeight}` : "none"; });
        const off = await win("engaged idle, scrolled off-screen"); off.vis = vis; out.push(off);
        await P.page.evaluate(() => window.scrollTo(0, 0)); await P.page.waitForTimeout(300);
        await P.page.keyboard.press("Escape"); await P.page.waitForTimeout(1500);
        out.push(await win("after Escape"));
        return { out };
      } finally { await cdp?.detach().catch(() => {}); await P.close(); }
    }, 60000);
    if (r.crashed) cell(name, "FAIL", r.line);
    else for (const w of r.out) cell(`${name} · ${w.label}`, "REPORT", `rAF calls ${f(w.raf, 1)}/s · ResizeObserver callbacks ${f(w.ro, 1)}/s · layouts ${engine === "chromium" ? f(w.lay, 1) : "n/a (no counter)"}/s · style recalcs ${engine === "chromium" ? f(w.sty, 1) : "n/a"}/s · [data-engaged] ${w.eng}${w.vis ? ` · engaged box ${w.vis}` : ""}`);
  }

  if (want("crest")) {
    const commits = scenesFor(idx, "E-2").filter(([, m]) => !m.stateless || true);
    const pick = commits.filter(([sc]) => /switch|button|accordion|chip|checkbox/.test(sc)).slice(0, 4);
    for (const [sc, m] of pick) {
      const runOnce = async (plant) => {
        const P = await openPage(E, T, sc, { theme: "light", ...(plant ? { plant } : {}) });
        try {
          await P.page.waitForTimeout(300);
          const fr = await P.page.evaluate(([tg, face]) => new Promise((ok) => { const el = () => document.querySelector(face) ?? document.querySelector(tg); const fr = []; const t0 = performance.now(); window.__e.commit(); const tick = () => { const e = el(); fr.push(e ? window.__eff(e).s : NaN); if (performance.now() - t0 < 700) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); }), [m.target, m.face ?? m.target]);
          const s = fr.filter(Number.isFinite);
          return { peak: s.length ? Math.max(...s) : NaN, errs: P.errors.slice() };
        } finally { await P.close(); }
      };
      const ctl = await guard(`crest control ${sc}`, () => runOnce(null), 60000);
      if (ctl.crashed) { cell(`crest control ${sc}`, "FAIL", ctl.line); continue; }
      cell(`crest control ${sc}`, "REPORT", `unplanted: peak ×${f(ctl.peak, 4)} · console errors ${ctl.errs.length}`);
      for (const tok of ["--scale-commit-pop", "--scale-commit-pop-bit", "--spring-panel-duration", "--spring-panel"]) {
        const name = `crest ${tok} ${sc}`;
        const r = await guard(name, () => runOnce([tok, "nonsense"]), 60000);
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        const said = r.errs.filter((e) => e.includes(tok) || e.includes("--rung-crest") || e.includes("spring-panel"));
        const intact = Math.abs(r.peak - ctl.peak) <= 0.002;
        cell(name, said.length || intact ? "PASS" : "FAIL", `planted nonsense: peak ×${f(r.peak, 4)} (unplanted ×${f(ctl.peak, 4)}; ${intact ? "intact" : "DEGRADED"}) · console errors naming it ${said.length} of ${r.errs.length}${said[0] ? ` · "${said[0].slice(0, 120)}"` : ""}`);
      }
    }
  }

  if (want("chip")) for (const theme of ["light", "dark"]) {
    const name = `chip preset ${theme}`;
    const sel = '[data-t="cap-configurator"] .configurator-preset-chip:not(.is-active)';
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "capsule", { theme });
      try {
        await P.page.waitForTimeout(400);
        const bb = await bbox(P.page, sel); if (!bb) return { none: true };
        const sc = () => P.page.evaluate((s) => window.__eff(document.querySelector(s)).s, sel);
        const rest = await shot(P.page, bb); const s0 = await sc();
        await P.page.mouse.move(bb.x + bb.w / 2, bb.y + bb.h / 2); await P.page.waitForTimeout(400);
        const hov = await shot(P.page, bb); const s1 = await sc();
        await P.page.mouse.down(); await P.page.waitForTimeout(250);
        const prs = await shot(P.page, bb); const s2 = await sc();
        await P.page.mouse.up();
        return { hover: changed(rest, hov), press: changed(hov, prs), s0, s1, s2 };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.none) { cell(name, "UNMEASURED", "no preset chip rendered"); continue; }
    cell(name, "REPORT", `rest → hover: ${f(r.hover * 100, 1)} % of pixels changed ≥ 16 levels, scale ×${f(r.s0, 4)} → ×${f(r.s1, 4)} · hover → held press 250 ms: ${f(r.press * 100, 1)} %, scale ×${f(r.s2, 4)}`);
  }
});
