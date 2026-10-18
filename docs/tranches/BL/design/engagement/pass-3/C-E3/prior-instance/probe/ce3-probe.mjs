#!/usr/bin/env node
// C-E3 (D5 pass 3, fresh critic of route E): adversarial cells on P-E3's probe app (../../E3/probe/App.vue, built with
// build.mjs --app against the critic's own worktree). Not a scoring read of a witness: each cell is a counterexample
// hunt against a CK row the harness's own scenes do not reach. Cells:
//   modal veil          an open Dialog's own `.glass-focus-veil` (the overlay child P-E3's `visibility` edit also
//                       reaches): visible and opacity > 0.9 at +900 ms (E-M5's claim; a regression of the presented veil)
//   modal veil PRM      the same under reduce
//   A-B-A rapid         Tab into A, Tab to B, Shift+Tab back to A 50 ms later (A re-engaged inside its own exit):
//                       per frame each host's centre move <= 4 px per 16.7 ms and its gap from its own footprint <= 1 px;
//                       at +1.2 s one footprint, A engaged and promoted, B not promoted (CK-20, CK-15)
//   scroll pin          A keyboard-engaged, the page scrolled 120 px in 4 steps: A's gap from its footprint <= 1 px in
//                       every frame (the anchor follows scroll with no listener, as the stage header claims)
//   cycle leak          12 hand-off cycles (Tab A, Tab B, Escape), then +1.5 s: 0 footprints, 0 promoted hosts, no inline
//                       position-anchor left, the stage veil hidden (CK-20/CK-15 hygiene)
//   consumer anchor kept a consumer's inline `position-anchor` on A's host, engaged and released: REPORT what is left
//                       (E-M1 says "overwritten while engaged")
//   scrub bad pitch     `--scrub-pitch: nonsense` on the input, a 60 px scrub: console errors, value, promotion (CK-21)
// Every page, context and browser closed in finally (lib.mjs); the WebKit engine relaunches every NAV_CAP navigations.
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey, center } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const label = typeof a.label === "string" ? a.label : "probe";
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const NOM = 1000 / 60;
const shift = engine === "webkit" ? "Alt+Shift+Tab" : "Shift+Tab";
const TAB = tabKey(engine);

const filmPair = (ms) => new Promise((ok) => {
  const sel = ['[data-t="slider-a"] .glass-slider', '[data-t="slider-b"] .glass-slider'];
  const fr = []; const t0 = performance.now();
  const tick = () => {
    const row = { t: performance.now() - t0, h: [] };
    for (const s of sel) {
      const e = document.querySelector(s); const r = e.getBoundingClientRect();
      const fp = e.previousElementSibling?.classList.contains("engage-footprint") ? e.previousElementSibling : null;
      const q = fp?.getBoundingClientRect();
      const gap = q ? Math.hypot((r.left + r.right) / 2 - (q.left + q.right) / 2, (r.top + r.bottom) / 2 - (q.top + q.bottom) / 2) : null;
      row.h.push({ cx: (r.left + r.right) / 2 + window.scrollX, cy: (r.top + r.bottom) / 2 + window.scrollY, vy: (r.top + r.bottom) / 2, pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), gap });
    }
    fr.push(row);
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr);
  };
  requestAnimationFrame(tick);
});
const maxMove = (fr, i, key = "cy") => Math.max(0, ...fr.slice(1).map((x, k) => (Math.hypot(x.h[i].cx - fr[k].h[i].cx, x.h[i][key] - fr[k].h[i][key]) * NOM) / Math.max(NOM, x.t - fr[k].t)));
const maxGap = (fr, i) => Math.max(0, ...fr.filter((x) => x.h[i].pop && x.h[i].gap != null).map((x) => x.h[i].gap));
const stageState = () => {
  const hosts = [...document.querySelectorAll(".glass-slider")];
  const v = document.querySelector("body > .glass-focus-veil"); const cs = v && getComputedStyle(v);
  return {
    fps: document.querySelectorAll(".engage-footprint").length,
    promoted: document.querySelectorAll("[popover][data-engage-stage]").length,
    anchors: hosts.map((h) => h.style.getPropertyValue("position-anchor")).filter(Boolean),
    engaged: hosts.map((h) => h.hasAttribute("data-engaged")),
    pops: hosts.map((h) => h.matches(":popover-open")),
    veil: v ? { open: v.matches(":popover-open"), vis: cs.visibility, op: +cs.opacity, eng: v.hasAttribute("data-engaged") } : null,
  };
};

await acquireLock();
console.log(`C-E3 probe ${label} · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  // ── modal veil (E-M5: the presented veil after P-E3's `visibility` edit) ─────────────────────────
  for (const prm of [false, true]) {
    const P = await openPage(E, T, "dialog", { prm });
    try {
      const { page } = P;
      await page.waitForSelector('[role="dialog"]');
      await page.waitForTimeout(900);
      const r = await page.evaluate(() => {
        const vs = [...document.querySelectorAll(".glass-focus-veil")].filter((v) => v.parentElement !== document.body);
        return vs.map((v) => { const cs = getComputedStyle(v); return { vis: cs.visibility, op: +cs.opacity, parentState: v.parentElement?.getAttribute("data-state"), bf: cs.backdropFilter ?? cs.webkitBackdropFilter }; });
      });
      const ok = r.length > 0 && r.every((x) => x.vis === "visible" && x.op > 0.9);
      cell(`modal veil${prm ? " PRM" : ""}`, r.length ? (ok ? "PASS" : "FAIL") : "FAIL NOT DRIVEN", `open Dialog +900 ms: ${r.length} overlay veil(s) ${r.map((x) => `parent data-state ${x.parentState}, visibility ${x.vis}, opacity ${f(x.op, 2)}, backdrop-filter ${x.bf}`).join(" | ")}`);
    } finally { await P.close(); }
  }

  // ── A → B → A inside A's exit ─────────────────────────────────────────────────────────────────────
  for (const gapMs of [50, 120]) {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(TAB); await page.waitForTimeout(600);
      const pr = page.evaluate(filmPair, 1100); await page.waitForTimeout(32);
      await page.keyboard.press(TAB); await page.waitForTimeout(gapMs); await page.keyboard.press(shift);
      const fr = await pr;
      await page.waitForTimeout(200);
      const end = await page.evaluate(stageState);
      const mA = maxMove(fr, 0), mB = maxMove(fr, 1), gA = maxGap(fr, 0), gB = maxGap(fr, 1);
      const ok = mA <= 4 && mB <= 4 && gA <= 1 && gB <= 1 && end.fps === 1 && end.engaged[0] && end.pops[0] && !end.pops[1];
      cell(`A-B-A rapid ${gapMs} ms`, ok ? "PASS" : "FAIL", `frames ${fr.length} · A move ${f(mA, 1)} px gap ${f(gA, 1)} px · B move ${f(mB, 1)} px gap ${f(gB, 1)} px (bounds move <= 4 per 16.7 ms, gap <= 1) · at +1.3 s: footprints ${end.fps}, engaged A ${end.engaged[0]} B ${end.engaged[1]}, promoted A ${end.pops[0]} B ${end.pops[1]}, veil ${JSON.stringify(end.veil)}`);
    } finally { await P.close(); }
  }

  // ── the pin under scroll ─────────────────────────────────────────────────────────────────────────
  {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      await page.evaluate(() => { document.body.style.minHeight = "2400px"; });
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(TAB); await page.waitForTimeout(600);
      const pr = page.evaluate(filmPair, 700);
      for (let k = 0; k < 4; k++) { await page.evaluate(() => window.scrollBy(0, 30)); await page.waitForTimeout(60); }
      const fr = await pr;
      const pop = fr.filter((x) => x.h[0].pop).length;
      const gA = maxGap(fr, 0);
      const sy = await page.evaluate(() => window.scrollY);
      cell("scroll pin", pop && sy > 0 ? (gA <= 1 ? "PASS" : "FAIL") : "FAIL NOT DRIVEN", `A keyboard-engaged, scrolled to ${sy} px: promoted ${pop}/${fr.length} frames, largest gap from its own footprint ${f(gA, 1)} px (bound <= 1)`);
    } finally { await P.close(); }
  }

  // ── cycle leak ──────────────────────────────────────────────────────────────────────────────────
  {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      for (let k = 0; k < 12; k++) {
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(TAB); await page.waitForTimeout(40);
        await page.keyboard.press(TAB); await page.waitForTimeout(40); await page.keyboard.press("Escape"); await page.waitForTimeout(30);
      }
      await page.focus('[data-sentinel="after"]');
      await page.waitForTimeout(1500);
      const s = await page.evaluate(stageState);
      const ok = s.fps === 0 && s.promoted === 0 && s.anchors.length === 0 && !s.engaged.some(Boolean) && (!s.veil || !s.veil.open || s.veil.vis === "hidden");
      cell("cycle leak", ok ? "PASS" : "FAIL", `12 cycles (Tab A, Tab B, Escape) then focus away +1.5 s: footprints ${s.fps}, promoted ${s.promoted}, inline position-anchor left [${s.anchors.join(", ")}], engaged ${s.engaged}, veil ${JSON.stringify(s.veil)} · errors ${P.errors.length}`);
    } finally { await P.close(); }
  }

  // ── a consumer's inline position-anchor on the host ─────────────────────────────────────────────
  {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      await page.evaluate(() => { document.querySelector('[data-t="slider-a"] .glass-slider').style.setProperty("position-anchor", "--consumer-own"); });
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(TAB); await page.waitForTimeout(500);
      const during = await page.evaluate(() => document.querySelector('[data-t="slider-a"] .glass-slider').style.getPropertyValue("position-anchor"));
      await page.keyboard.press("Escape"); await page.waitForTimeout(1200);
      const after = await page.evaluate(() => document.querySelector('[data-t="slider-a"] .glass-slider').style.getPropertyValue("position-anchor"));
      cell("consumer anchor kept", "REPORT", `consumer inline position-anchor --consumer-own · while engaged: "${during}" · after release +1.2 s: "${after || "(removed)"}"`);
    } finally { await P.close(); }
  }

  // ── the scrub with an unreadable pitch ──────────────────────────────────────────────────────────
  {
    const P = await openPage(E, T, "numfield");
    try {
      const { page } = P;
      await page.evaluate(() => { document.querySelector(".number-field__input").style.setProperty("--scrub-pitch", "nonsense"); });
      const c = await center(page, ".number-field__input");
      await page.mouse.move(c.x, c.y); await page.mouse.down();
      for (let k = 1; k <= 6; k++) { await page.mouse.move(c.x + 10 * k, c.y); await page.waitForTimeout(16); }
      await page.waitForTimeout(300);
      const mid = await page.evaluate(() => { const h = document.querySelector(".number-field"); return { pop: h.matches(":popover-open"), eng: h.hasAttribute("data-engaged"), v: window.__e.value() }; });
      await page.mouse.up(); await page.waitForTimeout(500);
      const errs = P.errors.filter((e) => /scrub-pitch/.test(e));
      cell("scrub bad pitch", errs.length === 1 && mid.v === 50 ? "PASS" : "FAIL", `--scrub-pitch: nonsense, 60 px scrub: console errors naming it ${errs.length} (want 1), value 50 → ${mid.v}, promoted ${mid.pop}, engaged ${mid.eng}`);
    } finally { await P.close(); }
  }
} finally {
  await E.close();
  T.close();
}
const fails = out.filter((l) => /^\s+FAIL/.test(l)).length;
const passes = out.filter((l) => /^\s+PASS/.test(l)).length;
console.log(`ce3-probe ${label} ${engine} · ${passes} pass, ${fails} fail, ${out.length - passes - fails} other · load ${load()} at end`);
process.exit(fails ? 1 : 0);
