#!/usr/bin/env node
// R-E · owner-glance captures + the D5-E §6 measurements, on the glance page (glance/App.vue) built against a tree.
//   node glance.mjs --build <out>/glance/<label> --label <label> --shots <dir> [--engines chromium,webkit]
// Per engine and theme (desk 900×640 fine): rest; slider held 450 ms (+ promotion jump, drag-through, ::backdrop read,
// aria snapshot); released mid-exit (120 ms) and settled (1200 ms); slider keyboard-focused; switch held, committed;
// accordion pressed + open (WebKit: keyboard, PF-1); passive atoms held (Q-1). Phone 390×844 coarse: slider held
// (Chromium: long-tap; WebKit: a mouse hold in a coarse context, raw touch has no screenshot). The veil is read off
// the stage's one veil element (.glass-focus-veil)., with block growth.
// Q-5 (Chromium): two touch points on two sliders. Every line carries the load. The D5 harness lock is taken.
import fs from "node:fs";
import path from "node:path";
import os from "node:os";
const L = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness/lib.mjs";
const { serveTarget, Engine, openPage, acquireLock, center, load, parseArgs } = await import(L);

const a = parseArgs();
const label = a.label, shots = path.resolve(a.shots);
const engines = typeof a.engines === "string" ? a.engines.split(",") : ["chromium", "webkit"];
fs.mkdirSync(shots, { recursive: true });
const waited = await acquireLock(); console.log(`# ${label} lock wait ${waited.toFixed(1)} s · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const log = (e, t, k, v) => console.log(`${label.padEnd(4)} ${e.padEnd(8)} ${t.padEnd(5)} ${k.padEnd(26)} ${typeof v === "string" ? v : JSON.stringify(v)} · load ${load()}`);
const shot = (P, name) => P.page.screenshot({ path: path.join(shots, `${name}.png`) });
const R = (sel) => `(() => { const e = document.querySelector('${sel}'); if (!e) return null; const r = e.getBoundingClientRect();
  const bd = (() => { const v = document.querySelector('.glass-focus-veil'); if (!v) return null; const c = getComputedStyle(v); return { op: c.opacity, open: v.matches(':popover-open'), bf: c.backdropFilter || c.webkitBackdropFilter, x: v.style.getPropertyValue('--veil-x').slice(0, 6), w: Math.round(v.getBoundingClientRect().width) }; })();
  return { l: +r.left.toFixed(1), t: +r.top.toFixed(1), w: +r.width.toFixed(1), h: +r.height.toFixed(1), popover: e.matches('[popover]') && e.matches(':popover-open'),
    engaged: document.querySelectorAll('[data-engaged]').length, footprint: !!document.querySelector('.engage-footprint'), veilEls: document.querySelectorAll('.glass-focus-veil').length,
    loupe: !!document.querySelector('.glass-loupe'), active: document.activeElement?.getAttribute('role') ?? document.activeElement?.tagName, scale: getComputedStyle(e).scale, bd }; })()`;
const val = (sel) => `document.querySelector('${sel} [role=slider]')?.getAttribute('aria-valuenow')`;

for (const name of engines) {
  const E = new Engine(name); await E.browser();
  log(name, "", "engine", E.version);
  for (const theme of ["light", "dark"]) {
    const tag = (k) => `${label}-${name}-${theme}-${k}`;
    // ── desk
    let P = await openPage(E, T, "glance", { theme, vp: { width: 900, height: 640 } });
    try {
      await P.page.waitForTimeout(300); await P.page.mouse.move(890, 630);
      await shot(P, tag("desk-rest"));
      const S = '[data-g="slider-a"]';
      const rest = await P.page.evaluate(R(S)); log(name, theme, "slider rest", rest);
      const aria0 = await P.page.locator(S).ariaSnapshot().catch((e) => `ERR ${e.message}`);
      const c = await center(P.page, `${S} [role=slider]`);
      await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
      const t0 = await P.page.evaluate(`new Promise((ok) => requestAnimationFrame(() => ok(${R(S)})))`);
      log(name, theme, "slider held, first frame", t0);
      await P.page.waitForTimeout(450);
      const held = await P.page.evaluate(R(S)); log(name, theme, "slider held 450 ms", held);
      const aria1 = await P.page.locator(S).ariaSnapshot().catch((e) => `ERR ${e.message}`);
      log(name, theme, "aria rest → held", { rest: aria0.replace(/\n/g, " | "), held: aria1.replace(/\n/g, " | "), same: aria0 === aria1 });
      await shot(P, tag("desk-slider-held"));
      const v0 = await P.page.evaluate(val(S)); await P.page.mouse.move(c.x + 60, c.y, { steps: 4 }); await P.page.waitForTimeout(60);
      const v1 = await P.page.evaluate(val(S)); const cap = await P.page.evaluate(`(() => { const t = document.querySelector('${S} [role=slider]'); return t ? true : false; })()`);
      log(name, theme, "drag through promotion", `aria-valuenow ${v0} → ${v1} after +60 px (thumb present ${cap})`);
      await P.page.mouse.up(); await P.page.waitForTimeout(120);
      log(name, theme, "released +120 ms", await P.page.evaluate(R(S))); await shot(P, tag("desk-slider-released"));
      await P.page.waitForTimeout(1100);
      log(name, theme, "released +1220 ms", await P.page.evaluate(R(S)));
      // keyboard focus (in place)
      await P.page.focus(`${S} [role=slider]`); await P.page.keyboard.press("ArrowRight"); await P.page.waitForTimeout(500);
      log(name, theme, "slider keyboard-focused", await P.page.evaluate(R(S))); await shot(P, tag("desk-slider-focused"));
      await P.page.evaluate(() => document.activeElement?.blur()); await P.page.waitForTimeout(400);
      // switch
      const W = '[role="switch"]'; const cw = await center(P.page, W);
      await P.page.mouse.move(cw.x, cw.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
      log(name, theme, "switch held 450 ms", await P.page.evaluate(R(W))); await shot(P, tag("desk-switch-held"));
      await P.page.mouse.up(); await P.page.waitForTimeout(700); await P.page.mouse.move(890, 630); await P.page.waitForTimeout(300);
      log(name, theme, "switch committed", { ...(await P.page.evaluate(R(W))), checked: await P.page.getAttribute(W, "aria-checked") }); await shot(P, tag("desk-switch-committed"));
      // switch tap: does a tap frost the world? read the backdrop opacity across a 90 ms press
      const tap = await P.page.evaluate(async (sel) => {
        const e = document.querySelector(sel); const r = e.getBoundingClientRect(); const o = { bubbles: true, clientX: r.left + 5, clientY: r.top + 5, pointerType: "mouse", pointerId: 1 };
        e.dispatchEvent(new PointerEvent("pointerdown", o)); const peak = []; const t0 = performance.now();
        await new Promise((ok) => { const f = () => { let op = "n/a"; const v = document.querySelector(".glass-focus-veil"); if (v) op = getComputedStyle(v).opacity; peak.push(+op); if (performance.now() - t0 < 90) requestAnimationFrame(f); else ok(); }; requestAnimationFrame(f); });
        window.dispatchEvent(new PointerEvent("pointerup", o));
        const after = []; const t1 = performance.now();
        await new Promise((ok) => { const f = () => { let op = "n/a"; const v = document.querySelector(".glass-focus-veil"); if (v) op = getComputedStyle(v).opacity; after.push(+op); if (performance.now() - t1 < 500) requestAnimationFrame(f); else ok(); }; requestAnimationFrame(f); });
        return { maxDuringTap: Math.max(...peak.filter(Number.isFinite), 0), maxAfterRelease: Math.max(...after.filter(Number.isFinite), 0), frames: peak.length + after.length };
      }, W);
      log(name, theme, "switch 90 ms tap, veil", tap);
      await P.page.waitForTimeout(800);
      // accordion
      const A = '[data-g="accordion"]';
      if (name === "webkit") {
        await P.page.focus(A); await P.page.waitForTimeout(200); await shot(P, tag("desk-accordion-focused"));
        await P.page.keyboard.press("Enter"); await P.page.waitForTimeout(700);
        log(name, theme, "accordion (keyboard; PF-1)", { ...(await P.page.evaluate(R(A))), expanded: await P.page.getAttribute(A, "aria-expanded") }); await shot(P, tag("desk-accordion-open"));
      } else {
        const ca = await center(P.page, A); await P.page.mouse.move(ca.x, ca.y); await P.page.mouse.down(); await P.page.waitForTimeout(300);
        log(name, theme, "accordion pressed 300 ms", await P.page.evaluate(R(A))); await shot(P, tag("desk-accordion-pressed"));
        await P.page.mouse.up(); await P.page.waitForTimeout(700); await P.page.mouse.move(890, 630); await P.page.waitForTimeout(300);
        log(name, theme, "accordion committed", { ...(await P.page.evaluate(R(A))), expanded: await P.page.getAttribute(A, "aria-expanded") }); await shot(P, tag("desk-accordion-open"));
      }
      // passive atoms held (Q-1): nothing engages
      for (const g of ["sep", "skel"]) {
        const cp = await center(P.page, `[data-g="${g}"]`); await P.page.mouse.move(cp.x, cp.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
        const r = await P.page.evaluate(`({ engaged: document.querySelectorAll('[data-engaged]').length, stage: document.querySelectorAll('[data-engage-stage]').length })`);
        log(name, theme, `passive ${g} held 450 ms`, r); await P.page.mouse.up();
      }
    } catch (e) { log(name, theme, "desk ERROR", String(e.message).split("\n")[0]); }
    await P.close();
    // ── phone (coarse)
    P = await openPage(E, T, "glance", { theme, coarse: true, vp: { width: 390, height: 844 }, q: { phone: "1" } });
    try {
      await P.page.waitForTimeout(300);
      await shot(P, tag("phone-rest"));
      const S = '[data-g="slider-a"]'; const rest = await P.page.evaluate(R(S)); const c = await center(P.page, `${S} [role=slider]`);
      let held;
      if (name === "chromium") {
        const cdp = await P.ctx.newCDPSession(P.page);
        const g = cdp.send("Input.synthesizeTapGesture", { x: c.x, y: c.y, duration: 1000, tapCount: 1, gestureSourceType: "touch" });
        await P.page.waitForTimeout(450); held = await P.page.evaluate(R(S)); await shot(P, tag("phone-slider-held")); await g;
      } else {
        await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
        held = await P.page.evaluate(R(S)); await shot(P, tag("phone-slider-held")); await P.page.mouse.up();
      }
      log(name, theme, `phone slider ${name === "chromium" ? "touch" : "mouse(coarse)"}-held`, { rest, held, inline: +(held.w / rest.w).toFixed(3), block: +(held.h / rest.h).toFixed(3), mode: P.modeLine });
      if (name === "chromium") {
        // Q-5: two fingers, one on each slider
        await P.page.waitForTimeout(1300);
        const cdp = await P.ctx.newCDPSession(P.page);
        const b = await center(P.page, '[data-g="slider-b"] [role=slider]');
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: c.x, y: c.y, id: 1 }] });
        await P.page.waitForTimeout(300);
        const one = await P.page.evaluate(`({ a: document.querySelector('[data-g="slider-a"]').hasAttribute('data-engaged'), b: document.querySelector('[data-g="slider-b"]').hasAttribute('data-engaged'), open: document.querySelectorAll(':popover-open').length })`);
        await cdp.send("Input.dispatchTouchEvent", { type: "touchStart", touchPoints: [{ x: c.x, y: c.y, id: 1 }, { x: b.x, y: b.y, id: 2 }] });
        await P.page.waitForTimeout(300);
        const two = await P.page.evaluate(`({ a: document.querySelector('[data-g="slider-a"]').hasAttribute('data-engaged'), b: document.querySelector('[data-g="slider-b"]').hasAttribute('data-engaged'), aHeld: document.querySelector('[data-g="slider-a"]').hasAttribute('data-held'), bHeld: document.querySelector('[data-g="slider-b"]').hasAttribute('data-held'), open: document.querySelectorAll(':popover-open').length, footprints: document.querySelectorAll('.engage-footprint').length })`);
        await shot(P, tag("phone-two-fingers"));
        await cdp.send("Input.dispatchTouchEvent", { type: "touchMove", touchPoints: [{ x: c.x + 40, y: c.y, id: 1 }, { x: b.x - 40, y: b.y, id: 2 }] });
        await P.page.waitForTimeout(100);
        const vals = await P.page.evaluate(`[${val('[data-g="slider-a"]')}, ${val('[data-g="slider-b"]')}]`);
        await cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] }); await P.page.waitForTimeout(1300);
        const after = await P.page.evaluate(`({ engaged: document.querySelectorAll('[data-engaged]').length, open: document.querySelectorAll(':popover-open').length, footprints: document.querySelectorAll('.engage-footprint').length })`);
        log(name, theme, "Q-5 two fingers", { oneFinger: one, twoFingers: two, valuesAfterMove: vals, afterRelease: after });
      }
    } catch (e) { log(name, theme, "phone ERROR", String(e.message).split("\n")[0]); }
    await P.close();
  }
  await E.close();
}
T.close(); console.log(`# end · load ${load()}`);
