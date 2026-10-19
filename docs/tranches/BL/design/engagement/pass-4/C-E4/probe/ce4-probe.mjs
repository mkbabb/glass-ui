#!/usr/bin/env node
// C-E4 adversarial probe (D5 pass 4, the fresh critic of route E). Not a scoring read of a witness: each cell is scored
// against the CK row it would break, in C-E4.md. App: ce4-App.vue (built with build.mjs --app). One browser per run, a
// context per cell, every page/context/browser closed in finally (lib.mjs openPage/Engine); the WebKit engine relaunches
// every NAV_CAP (60) navigations (H3-1). Films take no screenshot.
//   node ce4-probe.mjs --build <out>/builds/ce4-<label> --label <veil|noveil>-<every|coarse> [--engine chromium|webkit]
// Cells:
//   stale place · keyboard|pointer   CK-20. A engaged (Tab: promoted on every arm; a mouse hold: in place on coarse,
//        promoted on every). The spacer above the sliders grows 120 px by a STYLE write (layout moves A; no childList
//        mutation, so stage.ts onMutation does not run and the holder's last-read place goes stale). 400 ms later a
//        node is appended to the ticker below the sliders (a childList mutation that moves nothing). A is filmed per
//        frame across that append: its place did not change, so the bound is the hand-off's: largest one-frame move
//        ≤ 4 px per 16.7 ms
//   stale place control · keyboard|pointer   the same with no spacer write (must PASS: the append alone moves nothing)
//   wheel <case>   CK-22 (E-M6). A 30 px wheel over the slider at rest, then keyboard-engaged (promoted on every arm):
//        the box and page deltas must equal the rest read (± 1 px). Cases: box can scroll (overscroll auto); box at its
//        end with overscroll-behavior contain; box at its end with auto (the chain to the page)
//   wheel film     REPORT: a 120 px wheel (up) over the slider, box scrollTop filmed per frame, at rest and engaged
//   clip           CK-22 (E-M7) REPORT: a mouse hold on a slider in a fitting overflow:hidden box; whether the grown
//                  control paints past the box (elementFromPoint 1 px inside the grown edge, outside the box)
//   important anchor   CK-22 (E-M1: "written back, with its priority"): a consumer `position-anchor: … !important`
//                  inline; Tab engages (must be pinned to its footprint, gap ≤ 1 px); Escape; off the stage, +300 ms:
//                  value and priority back
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey, center } from "../../../harness/lib.mjs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const label = typeof a.label === "string" ? a.label : "probe";
const every = /every/.test(label);
if (!every && !/coarse/.test(label)) { console.error(`label ${label} names no pointer arm`); process.exit(2); }
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const NOM = 1000 / 60, STEP = 4;
const A = '[data-t="slider-a"] .glass-slider';

const film = ([sel, ms]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const tick = () => { const e = document.querySelector(sel); const r = e.getBoundingClientRect(); fr.push({ t: performance.now() - t0, x: r.left, y: r.top, pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged") }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); };
  requestAnimationFrame(tick);
});
const steps = (fr) => fr.slice(1).map((x, k) => ({ t: x.t, d: (Math.hypot(x.y - fr[k].y, x.x - fr[k].x) * NOM) / Math.max(NOM, x.t - fr[k].t), dy: x.y - fr[k].y }));
const stageOf = (s) => { const e = document.querySelector(s); const r = e.getBoundingClientRect(); return { pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), sx: r.width / e.offsetWidth, y: r.top }; };

await acquireLock();
console.log(`C-E4 probe ${label} · ${engine} · pointer arm ${every ? "every" : "coarse"} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  // ── CK-20: a stale last-read place, glided on an unrelated mutation ──────────────────────────────
  for (const how of ["keyboard", "pointer"]) {
    for (const grow of how === "keyboard" ? [120, 0, "resize"] : [120, 0]) {
      const P = await openPage(E, T, "restale");
      try {
        const { page } = P;
        let c = null;
        if (how === "keyboard") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); }
        else { c = await center(page, '[data-t="slider-a"] [role="slider"]'); await page.mouse.move(c.x, c.y); await page.mouse.down(); }
        await page.waitForTimeout(600);
        const s0 = await page.evaluate(stageOf, A);
        // "resize": the viewport narrows to 380 px, so the paragraph above the sliders rewraps (a layout move a person
        // makes by turning a phone or resizing a window; no childList mutation)
        if (grow === "resize") await page.setViewportSize({ width: 380, height: 500 });
        else if (grow) await page.evaluate((g) => window.__e.grow(g), grow);
        await page.waitForTimeout(400);
        const s1 = await page.evaluate(stageOf, A);
        const pr = page.evaluate(film, [A, 900]);
        await page.waitForTimeout(80);
        await page.evaluate(() => window.__e.tick());
        const fr = await pr;
        if (c) await page.mouse.up();
        const st = steps(fr); const worst = st.reduce((m, x) => (x.d > m.d ? x : m), { d: 0, t: 0, dy: 0 });
        const yMin = Math.min(...fr.map((x) => x.y)), yMax = Math.max(...fr.map((x) => x.y));
        const driven = s0.eng && fr.every((x) => x.eng);
        const name = `stale place${grow === "resize" ? " (viewport resize)" : grow ? "" : " control"} · ${how}`;
        cell(name, !driven ? "FAIL NOT DRIVEN" : worst.d <= STEP ? "PASS" : "FAIL",
          `A engaged ${s0.eng} (top layer ${s0.pop}, ×${f(s0.sx)}) · ${grow === "resize" ? "viewport 700 → 380 px wide" : `spacer +${grow} px by style`}: A's top ${f(s0.y, 1)} → ${f(s1.y, 1)} px · then a node appended below the sliders (moves nothing): over ${fr.length} frames A's top spans ${f(yMin, 1)}..${f(yMax, 1)} px, largest one-frame move ${f(worst.d, 1)} px at +${f(worst.t, 0)} ms (dy ${f(worst.dy, 1)}) (bound ≤ ${STEP} per 16.7 ms)`);
      } finally { await P.close(); }
    }
  }

  // ── CK-22 (E-M6): the wheel over a promoted control, at a scroller's end and under containment ──
  const ctl = '[data-t="box"] .glass-slider';
  for (const [nm, q, dy] of [["box can scroll (wheel up)", { ob: "auto" }, -30], ["box at end, contain (wheel down)", { ob: "contain" }, 30], ["box at end, auto, chains (wheel down)", { ob: "auto" }, 30]]) {
    const P = await openPage(E, T, "scroller", { q });
    try {
      const { page } = P;
      const st = () => page.evaluate(() => [document.querySelector('[data-t="box"]').scrollTop, window.scrollY]);
      const put = (s) => page.evaluate((s) => { document.querySelector('[data-t="box"]').scrollTop = s[0]; window.scrollTo(0, s[1]); }, s);
      const toEnd = () => page.evaluate(() => { const b = document.querySelector('[data-t="box"]'); b.scrollTop = b.scrollHeight; window.scrollTo(0, 0); });
      const wheelAt = async () => { await toEnd(); await page.waitForTimeout(150); const s0 = await st(); const c = await center(page, ctl); await page.mouse.move(c.x, c.y); await page.mouse.wheel(0, dy); await page.waitForTimeout(400); const s1 = await st(); await put(s0); await page.waitForTimeout(150); return { box: +(s1[0] - s0[0]).toFixed(1), page: +(s1[1] - s0[1]).toFixed(1) }; };
      const rest = await wheelAt();
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(500);
      const e0 = await page.evaluate(stageOf, ctl);
      const eng = await wheelAt();
      const ok = e0.eng && e0.pop && Math.abs(eng.box - rest.box) <= 1 && Math.abs(eng.page - rest.page) <= 1;
      cell(`wheel ${nm}`, !(e0.eng && e0.pop) ? "FAIL NOT DRIVEN" : ok ? "PASS" : "FAIL", `wheel ${dy} px · rest: box +${rest.box}, page +${rest.page} · keyboard-engaged (top layer ${e0.pop}, ×${f(e0.sx)}): box +${eng.box}, page +${eng.page} (bound: equal to rest ± 1 px)`);
    } finally { await P.close(); }
  }
  {
    const P = await openPage(E, T, "scroller", { q: { ob: "auto" } });
    try {
      const { page } = P;
      const filmScroll = (ms) => page.evaluate((ms) => new Promise((ok) => { const b = document.querySelector('[data-t="box"]'); const fr = []; const t0 = performance.now(); const tk = () => { fr.push([performance.now() - t0, b.scrollTop]); if (performance.now() - t0 < ms) requestAnimationFrame(tk); else ok(fr); }; requestAnimationFrame(tk); }), ms);
      const one = async () => { await page.evaluate(() => { const b = document.querySelector('[data-t="box"]'); b.scrollTop = b.scrollHeight; }); await page.waitForTimeout(150); const c = await center(page, ctl); await page.mouse.move(c.x, c.y); const pr = filmScroll(700); await page.waitForTimeout(50); await page.mouse.wheel(0, -120); const fr = await pr; await page.evaluate(() => { const b = document.querySelector('[data-t="box"]'); b.scrollTop = b.scrollHeight; }); await page.waitForTimeout(200); const d = fr.slice(1).map((x, k) => x[1] - fr[k][1]); return { total: fr.at(-1)[1] - fr[0][1], moving: d.filter((x) => Math.abs(x) > 0.1).length, max: Math.max(0, ...d.map(Math.abs)) }; };
      const r = await one();
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(500);
      const e0 = await page.evaluate(stageOf, ctl);
      const g = await one();
      cell("wheel film", "REPORT", `a 120 px wheel (up) over the slider · rest: box +${f(r.total, 1)} over ${r.moving} moving frames, largest frame step ${f(r.max, 1)} px · keyboard-engaged (top layer ${e0.pop}): box +${f(g.total, 1)} over ${g.moving} moving frames, largest frame step ${f(g.max, 1)} px`);
    } finally { await P.close(); }
  }

  // ── CK-22 (E-M7): the in-place grow under an overflow:hidden ancestor, in paint ──────────────────
  {
    const P = await openPage(E, T, "clip");
    try {
      const { page } = P;
      const c = await center(page, '[role="slider"]');
      await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(500);
      const r = await page.evaluate(() => {
        const h = document.querySelector(".glass-slider"); const b = document.querySelector('[data-t="clipbox"]');
        const hr = h.getBoundingClientRect(), br = b.getBoundingClientRect();
        // the grown edge past the box, on the axis it overflows most
        const past = { left: br.left - hr.left, right: hr.right - br.right, top: br.top - hr.top, bottom: hr.bottom - br.bottom };
        const [side, by] = Object.entries(past).sort((p, q) => q[1] - p[1])[0];
        const cx = (hr.left + hr.right) / 2, cy = (hr.top + hr.bottom) / 2;
        const pt = side === "left" ? [hr.left + 1, cy] : side === "right" ? [hr.right - 1, cy] : side === "top" ? [cx, hr.top + 1] : [cx, hr.bottom - 1];
        const hit = by >= 1.5 ? document.elementFromPoint(pt[0], pt[1]) : null;
        return { eng: h.hasAttribute("data-engaged"), pop: h.matches(":popover-open"), sx: hr.width / h.offsetWidth, sy: hr.height / h.offsetHeight, side, by, hitHost: hit ? h.contains(hit) : null, hit: hit ? (hit.className?.toString?.() || hit.tagName).slice(0, 40) : "-" };
      });
      await page.mouse.up();
      cell("clip (E-M7)", "REPORT", `arm ${every ? "every" : "coarse"} · mouse hold: engaged ${r.eng}, top layer ${r.pop}, ×${f(r.sx)} inline / ×${f(r.sy)} block · grown past the overflow:hidden box by ${f(r.by, 1)} px (${r.side}) · a point 1 px inside that grown edge hits the control: ${r.hitHost} (${r.hit}) · E-M7 says a coarse-arm fine hold is clipped (hits false), a promotion escapes (hits true)`);
    } finally { await P.close(); }
  }

  // ── CK-22 (E-M1): an !important consumer anchor, written back with its priority ──────────────────
  {
    const P = await openPage(E, T, "slider2");
    try {
      const { page } = P;
      const set = await page.evaluate((A) => { const e = document.querySelector(A); e.style.setProperty("position-anchor", "--consumer-own", "important"); return [e.style.getPropertyValue("position-anchor"), e.style.getPropertyPriority("position-anchor")]; }, A);
      if (set[0] !== "--consumer-own") cell("important anchor", "UNMEASURED", `the engine does not parse an inline position-anchor (read back "${set[0]}")`);
      else {
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
        const during = await page.evaluate((A) => { const e = document.querySelector(A); const fp = e.previousElementSibling?.classList.contains("engage-footprint") ? e.previousElementSibling : null; const r = e.getBoundingClientRect(), q = fp?.getBoundingClientRect(); return { v: e.style.getPropertyValue("position-anchor"), p: e.style.getPropertyPriority("position-anchor"), pop: e.matches(":popover-open"), eng: e.hasAttribute("data-engaged"), gap: q ? Math.hypot((r.left + r.right) / 2 - (q.left + q.right) / 2, (r.top + r.bottom) / 2 - (q.top + q.bottom) / 2) : null }; }, A);
        await page.keyboard.press("Escape");
        const t0 = Date.now(); let end = null;
        while (Date.now() - t0 < 4000) { const x = await page.evaluate((A) => { const e = document.querySelector(A); return !e.matches(":popover-open") && !e.hasAttribute("data-engaged") && Math.abs(e.getBoundingClientRect().width / e.offsetWidth - 1) <= 0.002; }, A); if (x) { end = Date.now() - t0; break; } await page.waitForTimeout(50); }
        await page.waitForTimeout(300);
        const after = await page.evaluate((A) => { const e = document.querySelector(A); return [e.style.getPropertyValue("position-anchor"), e.style.getPropertyPriority("position-anchor")]; }, A);
        const driven = during.eng && during.pop && end !== null;
        const ok = driven && during.gap !== null && during.gap <= 1 && after[0] === "--consumer-own" && after[1] === "important";
        cell("important anchor", !driven ? "FAIL NOT DRIVEN" : ok ? "PASS" : "FAIL", `A carries --consumer-own !important · engaged ${during.eng}, top layer ${during.pop}, while engaged "${during.v}" ${during.p || "(no priority)"}, gap from its footprint ${f(during.gap, 1)} px (bound ≤ 1) · Escape: off the stage at ${end ?? "never"} ms, +300 ms: "${after[0] || "(removed)"}" ${after[1] || "(no priority)"} (bound: --consumer-own important)`);
      }
    } finally { await P.close(); }
  }
} finally {
  await E.close();
  T.close();
}
const fails = out.filter((l) => /^\s+FAIL/.test(l)).length;
const passes = out.filter((l) => /^\s+PASS/.test(l)).length;
console.log(`ce4-probe ${label} ${engine} · ${passes} pass, ${fails} fail, ${out.length - passes - fails} other · load ${load()} at end`);
process.exit(fails ? 1 : 0);
