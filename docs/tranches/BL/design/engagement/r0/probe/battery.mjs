// D5 r0 battery: E-2 the commit bar (D4 T-6 / H-4 generalized), E-3 the slider grow, E-4 momentum, E-6 the idle rung.
// E-5 is e5.mjs (a real touch gesture); E-3's phone arm is e3m.mjs; E-1 is census.mjs.
// node battery.mjs <dist> [--plant] [--only E-2,E-3,E-4,E-6] [--engines chromium,webkit] [--scenes switch,chip]
// --plant injects a fixture that satisfies each witness (the self-test's PASS arm: the witness CAN go green).
// HEAD is each witness's FAIL arm. Every line carries os.loadavg(); other seats run browsers on this machine.
// Playwright WebKit hangs or closes on pointer entry over ToggleGroupItem and the accordion trigger (D4 PF-1 class):
// run WebKit per scene under `timeout 150`.
import os from "node:os"; import { serve, pw } from "./serve.mjs";
const argv = process.argv.slice(2); const dist = argv[0]; const PLANT = argv.includes("--plant");
const pick = (k, d) => { const i = argv.indexOf(k); return i > 0 ? argv[i + 1].split(",") : d; };
const ONLY = pick("--only", ["E-2", "E-3", "E-4", "E-6"]); const ENGINES = pick("--engines", ["chromium", "webkit"]); const SC = pick("--scenes", null);
const L = () => os.loadavg().map((x) => x.toFixed(1)).join("/");
const f = (x, n = 3) => (typeof x === "number" ? x.toFixed(n) : String(x));
const POP = 0.015, BOUNCE = 0.002, TRAVEL = 4, OVERSHOOT = 0.5; // D4 measure.mjs:403, unchanged
const PLANT_CSS = {
  "E-3": `.glass-slider:where(:active,:has(:focus-visible)){scale:1.06}`,
  "E-6": `@keyframes d5breath{50%{opacity:.9}} .switch{animation:d5breath 4s ease-in-out infinite}`,
};
// E-2's plant pops on `transform` so it multiplies with a component's own resting `scale` (a selected Chip rests at 1.068)
const PLANT_E2 = `{ const K = [{ transform: "scale(1)" }, { transform: "scale(1.06)", offset: 0.35 }, { transform: "scale(0.985)", offset: 0.6 }, { transform: "scale(1.004)", offset: 0.8 }, { transform: "scale(1)" }]; const pop = (el) => el && el.animate && el.animate(K, { duration: 500 }); new MutationObserver((ms) => ms.forEach((m) => pop(m.target))).observe(document.body, { subtree: true, attributes: true, attributeFilter: ["data-state", "aria-checked", "aria-pressed", "aria-selected", "data-d5-hit"] }); addEventListener("click", (e) => pop(e.target.closest("button"))); }`;
const PLANT_E4 = `addEventListener("pointerup", () => document.querySelector("[role=slider]").animate([{ translate: "0px" }, { translate: "14px" }, { translate: "10px" }], { duration: 420, easing: "ease-out", fill: "forwards" }))`;
const INIT = () => {
  window.__eff = (el) => { if (!el) return null; const r = el.getBoundingClientRect(); return { s: el.offsetWidth ? r.width / el.offsetWidth : 1, x: r.x + r.width / 2, y: r.y + r.height / 2, w: r.width, h: r.height }; };
  window.__sample = (sel, bodySel, ms) => new Promise((ok) => { const fr = []; const t0 = performance.now();
    const tick = () => { const t = performance.now() - t0; fr.push({ t, a: __eff(document.querySelector(sel)), b: bodySel ? __eff(document.querySelector(bodySel)) : null }); if (t < ms) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); });
};
const SCENES = {
  switch: { tgt: '[role="switch"]', body: ".switch__thumb", key: "Space" },
  checkbox: { tgt: '[role="checkbox"]', body: ".control-bit__mark", key: "Space" },
  radio: { tgt: '[role="radio"]:nth-of-type(2)', body: '[role="radio"]:nth-of-type(2) .radio-group__dot', key: "ArrowDown" },
  tabs: { tgt: ".segmented-tab:nth-of-type(2)", body: ".segmented-indicator", key: "ArrowRight" },
  toggle: { tgt: '[data-t="item-b"]', body: null, key: "ArrowRight" },
  chip: { tgt: ".glass-chip", body: null, key: "Space" },
  accordion: { tgt: ".disclosure-trigger", body: null, key: "Enter" },
  button: { tgt: ".button", body: null, key: "Space" },
};
// the commit bar (D4 measure.mjs:416-442): a pop that peaks ≥ POP above its settle and bounces ≥ BOUNCE below it,
// or a body that travels ≥ TRAVEL px and overshoots its landing by ≥ OVERSHOOT px
function bar(fr) {
  const s = fr.map((x) => x.a.s); let pk = 0; s.forEach((v, k) => { if (v > s[pk]) pk = k; });
  const settle = s[s.length - 1], trough = Math.min(...s.slice(pk)); const pop = s[pk] - settle >= POP, bounce = trough <= settle - BOUNCE;
  let travel = 0, over = 0; const B = fr.map((x) => x.b).filter(Boolean);
  if (B.length > 1) { const a = B[0], z = B[B.length - 1], d = [z.x - a.x, z.y - a.y], Ln = Math.hypot(...d); travel = Ln; if (Ln > 0) for (const r of B) over = Math.max(over, ((r.x - a.x) * d[0] + (r.y - a.y) * d[1]) / Ln - Ln); }
  const dts = fr.slice(1).map((x, k) => x.t - fr[k].t).sort((p, q) => p - q);
  return { pass: (pop && bounce) || (travel >= TRAVEL && over >= OVERSHOOT), line: `peak ${f(s[pk])} trough ${f(trough)} settle ${f(settle)} · body travel ${f(travel, 2)} px overshoot ${f(over, 2)} px · ${fr.length} frames, median ${f(dts[dts.length >> 1] ?? 0, 1)} ms` };
}
const s = await serve(dist); let bad = 0; const out = [];
const cell = (id, pass, line) => { if (!pass) bad++; const l = `${pass ? "PASS" : "FAIL"} ${id} · ${line} · load ${L()}`; out.push(l); console.log(l); };
for (const engine of ENGINES) {
  const b = await pw[engine].launch(); const TAB = engine === "webkit" ? "Alt+Tab" : "Tab";
  const open = async (scene, o = {}) => { const ctx = await b.newContext({ viewport: o.vp ?? { width: 700, height: 500 }, deviceScaleFactor: 1, reducedMotion: "no-preference" });
    const pg = await ctx.newPage(); await pg.addInitScript(INIT); await pg.goto(`${s.url}?scene=${scene}&theme=${o.theme ?? "light"}`); await pg.waitForFunction(() => window.__ready);
    if (PLANT && PLANT_CSS[o.w]) await pg.addStyleTag({ content: PLANT_CSS[o.w] });
    if (PLANT && o.w === "E-2") await pg.addScriptTag({ content: PLANT_E2 });
    if (PLANT && o.w === "E-4") await pg.addScriptTag({ content: PLANT_E4 });
    await pg.waitForTimeout(250); return { pg, ctx }; };
  try {
    if (ONLY.includes("E-2")) for (const [sc, c] of Object.entries(SCENES).filter(([k]) => !SC || SC.includes(k))) {
      // Tab entry: Tab from the sentinel into the component; nothing may pop or travel
      let { pg, ctx } = await open(sc, { w: "E-2" });
      await pg.focus('[data-t="before"]'); let pr = pg.evaluate(([a, bb]) => __sample(a, bb, 700), [c.tgt, c.body]); await pg.keyboard.press(TAB); let fr = await pr;
      const dev = Math.max(...fr.map((x) => x.a.s)) - Math.min(...fr.map((x) => x.a.s)); const B = fr.map((x) => x.b).filter(Boolean); const mv = B.length > 1 ? Math.hypot(B.at(-1).x - B[0].x, B.at(-1).y - B[0].y) : 0;
      cell(`E-2 ${engine} ${sc} Tab-entry`, dev < BOUNCE && mv < 1, `scale range ${f(dev)} body moved ${f(mv, 2)} px`);
      // keyboard commit (focus is on the component, or on the checked item of a group)
      pr = pg.evaluate(([a, bb]) => __sample(a, bb, 800), [c.tgt, c.body]); await pg.keyboard.press(c.key); fr = await pr; let r = bar(fr);
      cell(`E-2 ${engine} ${sc} commit·keyboard(${c.key})`, r.pass, r.line); await ctx.close();
      // programmatic commit, focus parked on the sentinel after
      ({ pg, ctx } = await open(sc, { w: "E-2" })); await pg.focus('[data-t="after"]');
      if (PLANT) await pg.evaluate((t) => document.querySelector(t)?.setAttribute("data-d5-hit", ""), c.tgt);
      pr = pg.evaluate(([a, bb]) => __sample(a, bb, 800), [c.tgt, c.body]); await pg.evaluate(() => __commit()); fr = await pr; r = bar(fr);
      cell(`E-2 ${engine} ${sc} commit·programmatic`, r.pass, r.line); await ctx.close();
      // pointer commit: press 150 ms, release; the bar is read from the release
      ({ pg, ctx } = await open(sc, { w: "E-2" })); const bx = await pg.locator(c.tgt).first().boundingBox();
      await pg.mouse.move(bx.x + bx.width / 2, bx.y + bx.height / 2); await pg.mouse.down(); await pg.waitForTimeout(150);
      pr = pg.evaluate(([a, bb]) => __sample(a, bb, 800), [c.tgt, c.body]); await pg.mouse.up(); fr = await pr; r = bar(fr);
      cell(`E-2 ${engine} ${sc} commit·pointer`, r.pass, r.line); await ctx.close();
    }
    if (ONLY.includes("E-3")) for (const theme of ["light", "dark"]) {
      // W-J.2 appendix A slider.mjs, re-run: the root's box, pointer-held 450 ms and keyboard-focused, against rest
      const { pg, ctx } = await open("slider", { w: "E-3", theme, vp: { width: 600, height: 400 } });
      const rd = () => pg.evaluate(() => { const el = document.querySelector(".glass-slider"); const r = el.getBoundingClientRect(); return { w: r.width, n: document.querySelectorAll("[data-engaged]").length }; });
      const rest = await rd(); const tb = await pg.locator('[role="slider"]').first().boundingBox();
      await pg.mouse.move(tb.x + tb.width / 2, tb.y + tb.height / 2); await pg.mouse.down(); await pg.waitForTimeout(450); const held = await rd(); await pg.mouse.up(); await pg.mouse.move(5, 5); await pg.waitForTimeout(600);
      await pg.focus('[data-t="before"]'); await pg.keyboard.press(TAB); await pg.waitForTimeout(450); const kbd = await rd();
      const gH = held.w / rest.w, gK = kbd.w / rest.w;
      cell(`E-3 ${engine} ${theme} slider grow`, gH >= 1.03 && gK >= 1.03, `rest ${f(rest.w, 1)} px · pointer-held ×${f(gH)} ([data-engaged] ${held.n}) · keyboard-focused ×${f(gK)} · bound ×1.03 sustained`); await ctx.close();
    }
    if (ONLY.includes("E-4")) {
      // a fling: three 40 px moves in quick succession, release; the thumb must carry past the release point, then settle
      const { pg, ctx } = await open("slider", { w: "E-4", vp: { width: 600, height: 400 } });
      const tb = await pg.locator('[role="slider"]').first().boundingBox(); const x0 = tb.x + tb.width / 2, y0 = tb.y + tb.height / 2;
      await pg.mouse.move(x0, y0); await pg.mouse.down(); for (let k = 1; k <= 3; k++) await pg.mouse.move(x0 + 40 * k, y0);
      const pr = pg.evaluate(() => __sample('[role="slider"]', null, 600)); await pg.mouse.up(); const fr = await pr;
      const xs = fr.map((x) => x.a.x); const carry = Math.max(...xs) - xs[0]; const settle = xs.at(-1) - xs[0];
      cell(`E-4 ${engine} slider fling carries velocity`, carry >= TRAVEL, `thumb at release ${f(xs[0], 1)} px; max travel after release ${f(carry, 2)} px; settle offset ${f(settle, 2)} px (bound ≥ ${TRAVEL} px carried)`); await ctx.close();
    }
    if (ONLY.includes("E-6")) {
      const { pg, ctx } = await open("switch", { w: "E-6" }); await pg.waitForTimeout(500);
      const a = await pg.evaluate(() => document.getAnimations().filter((x) => x.playState === "running").map((x) => `${x.constructor.name}:${x.animationName ?? x.transitionProperty ?? "?"}`));
      let lay = "n/a"; if (engine === "chromium") { const cdp = await ctx.newCDPSession(pg); await cdp.send("Performance.enable"); const m0 = (await cdp.send("Performance.getMetrics")).metrics; await pg.waitForTimeout(3000); const m1 = (await cdp.send("Performance.getMetrics")).metrics; const g = (m, n) => m.find((x) => x.name === n).value; lay = ((g(m1, "LayoutCount") - g(m0, "LayoutCount")) / 3).toFixed(1); }
      cell(`E-6 ${engine} switch idle rung (breathing), compositor-only`, a.length > 0 && (lay === "n/a" || +lay === 0), `running animations at rest ${a.length} [${a.join(", ")}] · layouts/s ${lay} (bound: ≥1 idle animation AND 0 layouts/s)`); await ctx.close();
    }
  } catch (e) { cell(`${engine} harness`, false, String(e.message).split("\n")[0]); }
  await b.close();
}
s.close(); console.log(`VERDICT d5-r0 ${PLANT ? "PLANT" : "HEAD"}: ${bad} failing cells of ${out.length}`); process.exit(bad ? 1 : 0);
