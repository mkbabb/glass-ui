#!/usr/bin/env node
// C-E3 (D5 pass 3, fresh critic of route E): adversarial cells the harness's scenes do not reach. Not a scoring read of
// a witness; each cell hunts a counterexample to a CK row. Two builds of the critic's worktree:
//   --build   the probe app (../../E3/probe/App.vue, P-E3's fork: slider2, numfield, dialog scenes)
//   --hbuild  the harness's own app (scenes passive, gallery) for CK-16
// Cells:
//   modal veil [PRM]     an open Dialog's own `.glass-focus-veil` at +900 ms: visible, opacity > 0.9 (E-M5: P-E3's
//                        `visibility: hidden` rest also reaches the presented veil)
//   A-B-A rapid N ms     Tab A, Tab B, Shift+Tab back to A N ms later (A re-engaged inside its own exit): each host's
//                        largest one-frame move <= 4 px per 16.7 ms and gap from its own footprint <= 1 px; at the end one
//                        footprint, A engaged and promoted, B not (CK-20, CK-15)
//   scroll pin           A keyboard-engaged, the page scrolled 120 px: A's gap from its footprint <= 1 px every frame (CK-20)
//   cycle leak           12 x (Tab A, Tab B, Escape), focus away, +1.5 s: no footprint, no promoted host, no inline
//                        position-anchor, veil hidden (CK-20/CK-15)
//   consumer anchor restored  a consumer's inline `position-anchor` on A, engaged then released: E-M1 says it is
//                        "overwritten while it is engaged"; after release the consumer's own value must be back (CK-22)
//   scrub bad pitch      `--scrub-pitch: nonsense` on the input, a 60 px scrub: exactly 1 console error naming it, value
//                        unchanged (CK-21)
//   right-button press   a secondary-button press on A's thumb: REPORT whether it promotes and raises the veil
//                        (§P2-7 class 12: `useHold` acquires on any button)
//   CK-16 <member> rest / off-screen   Skeleton and StatusDot isolated in an emptied body: animated properties (compositor
//                        set: opacity, transform, scale, translate, rotate), layouts/s over 2 s (Chromium: CDP
//                        Performance LayoutCount; WebKit has no layout counter: UNMEASURED), then moved 3000 px below the
//                        viewport: whether its animations stop (playState, currentTime advance over 1 s)
// Every page, context and browser closed in finally (lib.mjs); WebKit relaunches every NAV_CAP navigations.
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
      row.h.push({ cx: (r.left + r.right) / 2 + window.scrollX, cy: (r.top + r.bottom) / 2 + window.scrollY, pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), gap });
    }
    fr.push(row);
    if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr);
  };
  requestAnimationFrame(tick);
});
const maxMove = (fr, i) => Math.max(0, ...fr.slice(1).map((x, k) => (Math.hypot(x.h[i].cx - fr[k].h[i].cx, x.h[i].cy - fr[k].h[i].cy) * NOM) / Math.max(NOM, x.t - fr[k].t)));
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
    veil: v ? { open: v.matches(":popover-open"), vis: cs.visibility, op: +(+cs.opacity).toFixed(2), eng: v.hasAttribute("data-engaged") } : null,
  };
};

await acquireLock();
console.log(`C-E3 probe ${label} · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const TH = typeof a.hbuild === "string" ? await serveTarget({ build: a.hbuild }) : null;
const E = new Engine(engine);
try {
  // ── modal veil ──────────────────────────────────────────────────────────────────────────────────
  for (const prm of [false, true]) {
    const P = await openPage(E, T, "dialog", { prm });
    try {
      const { page } = P;
      await page.waitForSelector('[role="dialog"]');
      await page.waitForTimeout(900);
      const r = await page.evaluate(() => [...document.querySelectorAll(".glass-focus-veil")].filter((v) => v.parentElement !== document.body).map((v) => { const cs = getComputedStyle(v); return { vis: cs.visibility, op: +cs.opacity, ps: v.parentElement?.getAttribute("data-state"), bf: cs.backdropFilter ?? cs.webkitBackdropFilter }; }));
      const ok = r.length > 0 && r.every((x) => x.vis === "visible" && x.op > 0.9);
      cell(`modal veil${prm ? " PRM" : ""}`, r.length ? (ok ? "PASS" : "FAIL") : "FAIL NOT DRIVEN", `open Dialog +900 ms: ${r.length} overlay veil(s) ${r.map((x) => `parent data-state ${x.ps}, visibility ${x.vis}, opacity ${f(x.op, 2)}, backdrop-filter ${x.bf}`).join(" | ")}`);
    } finally { await P.close(); }
  }

  // ── A → B → A inside A's exit ───────────────────────────────────────────────────────────────────
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
      cell(`A-B-A rapid ${gapMs} ms`, ok ? "PASS" : "FAIL", `frames ${fr.length} · A move ${f(mA, 1)} px gap ${f(gA, 1)} px · B move ${f(mB, 1)} px gap ${f(gB, 1)} px (bounds move <= 4 per 16.7 ms, gap <= 1) · at end: footprints ${end.fps}, engaged A ${end.engaged[0]} B ${end.engaged[1]}, promoted A ${end.pops[0]} B ${end.pops[1]}, veil ${JSON.stringify(end.veil)}`);
    } finally { await P.close(); }
  }

  // ── the pin under scroll ────────────────────────────────────────────────────────────────────────
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
      cell("cycle leak", ok ? "PASS" : "FAIL", `12 cycles then focus away +1.5 s: footprints ${s.fps}, promoted ${s.promoted}, inline position-anchor left [${s.anchors.join(", ")}], engaged ${s.engaged}, veil ${JSON.stringify(s.veil)} · console errors ${P.errors.length}`);
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
      const driven = during !== "" && during !== "--consumer-own";
      cell("consumer anchor restored", !driven ? "FAIL NOT DRIVEN" : after === "--consumer-own" ? "PASS" : "FAIL", `consumer inline position-anchor --consumer-own · while engaged "${during}" · after release +1.2 s "${after || "(removed)"}" (E-M1: "overwritten while it is engaged")`);
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

  // ── a secondary-button press (§P2-7 class 12) ───────────────────────────────────────────────────
  {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      const c = await center(page, '[data-t="slider-a"] [role="slider"]');
      await page.mouse.move(c.x, c.y); await page.mouse.down({ button: "right" }); await page.waitForTimeout(450);
      const mid = await page.evaluate(stageState);
      await page.mouse.up({ button: "right" }); await page.waitForTimeout(900);
      const end = await page.evaluate(stageState);
      cell("right-button press", "REPORT", `secondary press on A's thumb +450 ms: promoted ${mid.promoted}, engaged ${mid.engaged}, veil ${JSON.stringify(mid.veil)} · after release +900 ms: promoted ${end.promoted}, veil ${JSON.stringify(end.veil)}`);
    } finally { await P.close(); }
  }

  // ── CK-16: rest-running members, isolated ───────────────────────────────────────────────────────
  if (TH) {
    for (const [name, scene, sel] of [["Skeleton", "passive", '[data-t="skel"]'], ["StatusDot", "gallery", ".status-dot"]]) {
      const P = await openPage(E, TH, scene);
      try {
        const { page } = P;
        const found = await page.evaluate((sel) => {
          const el = document.querySelector(sel); if (!el) return false;
          const w = document.createElement("div"); w.id = "ck16"; w.style.cssText = "padding:40px;width:320px"; w.append(el);
          document.body.replaceChildren(w); return true;
        }, sel);
        if (!found) { cell(`CK-16 ${name}`, "FAIL NOT DRIVEN", `${sel} not rendered in scene ${scene}`); continue; }
        await page.waitForTimeout(1000);
        const anims = () => page.evaluate(() => document.getAnimations().filter((x) => { const t = x.effect?.target; return t && document.getElementById("ck16")?.contains(t); }).map((x) => ({ name: x.animationName ?? x.id, ps: x.playState, ct: Number(x.currentTime ?? 0), pe: x.effect.pseudoElement ?? "", props: [...new Set(x.effect.getKeyframes().flatMap((k) => Object.keys(k).filter((p) => !["offset", "computedOffset", "easing", "composite"].includes(p))))] })));
        let cdp = null;
        if (engine === "chromium") { cdp = await page.context().newCDPSession(page); await cdp.send("Performance.enable"); }
        const layouts = async (ms) => {
          if (!cdp) { await page.waitForTimeout(ms); return null; }
          const m0 = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
          await page.waitForTimeout(ms);
          const m1 = Object.fromEntries((await cdp.send("Performance.getMetrics")).metrics.map((m) => [m.name, m.value]));
          return { l: (m1.LayoutCount - m0.LayoutCount) / (ms / 1000), s: (m1.RecalcStyleCount - m0.RecalcStyleCount) / (ms / 1000) };
        };
        const COMP = new Set(["opacity", "transform", "scale", "translate", "rotate"]);
        const a0 = await anims(); const L0 = await layouts(2000);
        const comp = a0.length > 0 && a0.every((x) => x.props.every((p) => COMP.has(p)));
        const restOk = a0.length > 0 && comp && (L0 ? L0.l === 0 : true);
        cell(`CK-16 ${name} rest`, a0.length === 0 ? "REPORT" : !L0 ? (comp ? "UNMEASURED" : "FAIL") : restOk ? "PASS" : "FAIL",
          `animations ${a0.map((x) => `${x.name}${x.pe} [${x.props.join(",")}] ${x.ps}`).join("; ") || "none"} · compositor-only ${comp} · ${L0 ? `layouts ${f(L0.l, 1)}/s, style recalcs ${f(L0.s, 1)}/s over 2 s` : "layouts/s UNMEASURED (no layout counter in Playwright WebKit)"}`);
        await page.evaluate(() => { document.getElementById("ck16").style.marginTop = "3000px"; });
        await page.waitForTimeout(400);
        const vis = await page.evaluate(() => { const r = document.getElementById("ck16").getBoundingClientRect(); return r.top > innerHeight; });
        const b0 = await anims(); const L1 = await layouts(1000); const b1 = await anims();
        const adv = b1.map((x, i) => x.ct - (b0[i]?.ct ?? 0));
        const stopped = b1.every((x) => x.ps !== "running") || adv.every((d) => d === 0);
        cell(`CK-16 ${name} off-screen`, !vis || !b0.length ? "FAIL NOT DRIVEN" : stopped ? "PASS" : "FAIL",
          `3000 px below the viewport (off-screen ${vis}): ${b1.map((x, i) => `${x.name}${x.pe} ${x.ps}, currentTime +${f(adv[i], 0)} ms over 1 s`).join("; ")} · ${L1 ? `layouts ${f(L1.l, 1)}/s` : "layouts/s UNMEASURED"}`);
      } finally { await P.close(); }
    }
  }
} finally {
  await E.close();
  T.close(); TH?.close();
}
const fails = out.filter((l) => /^\s+FAIL/.test(l)).length;
const passes = out.filter((l) => /^\s+PASS/.test(l)).length;
console.log(`ce3-probe ${label} ${engine} · ${passes} pass, ${fails} fail, ${out.length - passes - fails} other · load ${load()} at end`);
process.exit(fails ? 1 : 0);
