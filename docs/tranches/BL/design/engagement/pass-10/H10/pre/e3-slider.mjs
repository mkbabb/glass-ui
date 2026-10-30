#!/usr/bin/env node
// E-3 · CK-04: the held slider, and the keyboard engagement's contract (T1 GROW, W-J.2 §2.2 appendix A; L05a-16's
// phone arm; pass 2 restates it with the release, phone and keyboard plants of REGISTRY §P1-6 CK-04).
//   desk  (700×500, fine) light and dark:
//     pointer-held      pointer held 450 ms on the thumb: the engaged box ≥ ×1.03 of rest in width, sustained (read at
//                       450 ms, not a peak)
//     keyboard-focused  Tab from the sentinel, 450 ms: ≥ ×1.03
//     keyboard register at that moment the slider does not paint the HAND's register: no [data-held] in its subtree
//                       (data-held stays the hand's; the keyboard engagement is signalled by its own state), no
//                       `cursor: grabbing` on the root, the thumb or the body, no squish (the root's and the body's height
//                       ≥ 0.99 of rest)
//     afterdrag         a pointer drag and release, then +600 ms (syn/afterdrag.mjs's read, X-1): ×1 ± 0.002
//     modifier          after a drag, Shift, Meta, Control and Alt each held alone 400 ms: ×1 ± 0.002, no [data-held]
//     unacted key       after a drag, the key "k" (a slider does not act on it): ×1 ± 0.002 and no veil
//     script focus      a fresh page, the thumb focused by element.focus() with no key event, +450 ms: ×1 ± 0.002, no veil
//   phone (390×844, coarse, ?phone=1: the slider fills a 16 px-gutter column) light and dark:
//     touch-held        touch held 450 ms: the engaged box ≥ ×1.03 of rest on the inline OR the block axis (X-2: R-C's
//                       rest-inset and R-E's block grow are both admissible readings)
//     gutter            the engaged box stays inside the gutter (left ≥ 16 px, right ≤ 374 px)
//   PRM (H-9) under reduced motion the grow retires: keyboard-focused (desk) and touch-held (phone) stay within
//                       ×1 ± 0.002 on both axes, and the touch-held phone slider keeps a light leg: ≥ 1 paint property
//                       on the root, the thumb or the body changes from rest
// The engaged box is the larger of [data-e=root] and a promoted projection [data-engage-projection] if a route
// mounts one (D5-E; HARNESS.md §1.3). A veil is any [data-engaged] node or the scene's `veil` selector.
//   node e3-slider.mjs --build <dir> | --fixture [--fault e3-gutter] [--engine webkit]
import { witness, openPage, openTouchPage, scenesFor, tabKey, center, paintDiff, f } from "./lib.mjs";

const BOUND = 1.03, GUTTER = 16, BAND = 0.002, AFTER = 600;
const read = (P, veilSel) => P.page.evaluate((veilSel) => {
  const root = document.querySelector('[data-e~="root"]'); const proj = document.querySelector("[data-engage-projection]");
  const th = document.querySelector('[data-e~="thumb"]'); const body = document.querySelector('[data-e~="body"]');
  const rr = root.getBoundingClientRect(); const pr = proj?.getBoundingClientRect();
  const box = pr && pr.width * pr.height > rr.width * rr.height ? pr : rr;
  const veils = [...document.querySelectorAll(`[data-engaged]${veilSel ? `, ${veilSel}` : ""}`)].filter((e) => e !== root && !root.contains(e)).map((e) => +getComputedStyle(e).opacity).filter((o) => o > 0.05);
  const cur = [root, th, body].filter(Boolean).map((e) => getComputedStyle(e).cursor);
  return { w: box.width, h: box.height, l: box.left, r: box.right, vw: innerWidth, proj: !!pr, n: document.querySelectorAll("[data-engaged]").length, veil: veils.length,
    held: [root, ...root.querySelectorAll("[data-held]")].filter((e) => e.hasAttribute("data-held")).length, grabbing: cur.includes("grabbing"), bh: body ? body.getBoundingClientRect().height : NaN, rh: rr.height };
}, veilSel ?? null);
const lightRead = (P) => P.page.evaluate(() => ({ r: window.__paint('[data-e~="root"]'), t: window.__paint('[data-e~="thumb"]') }));
await witness("E-3", "CK-04 the held slider and the keyboard engagement's contract", async ({ T, E, cell, guard, idx, engine }) => {
  const ratio = (a, b) => `×${f(a.w / b.w)} × ${f(a.h / b.h)}`;
  const atRest = (a, b) => Math.abs(a.w / b.w - 1) < BAND && Math.abs(a.h / b.h - 1) < BAND;
  const drag = async (P) => {
    const c = await center(P.page, '[data-e~="thumb"]');
    await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
    for (let k = 1; k <= 4; k++) { await P.page.mouse.move(c.x + 10 * k, c.y); await P.page.waitForTimeout(60); }
    await P.page.mouse.up(); await P.page.mouse.move(2, 2); await P.page.waitForTimeout(AFTER);
  };
  for (const [sc, m] of scenesFor(idx, "E-3")) {
    for (const theme of ["light", "dark"]) {
      const d = await guard(`desk ${theme}`, async () => {
        const P = await openPage(E, T, sc, { theme, vp: { width: 700, height: 500 } });
        try {
          const rest = await read(P, m.veil);
          const c = await center(P.page, '[data-e~="thumb"]');
          await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); await P.page.waitForTimeout(450);
          const held = await read(P, m.veil); await P.page.mouse.up(); await P.page.mouse.move(2, 2); await P.page.waitForTimeout(AFTER);
          await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450);
          const kbd = await read(P, m.veil); const focus = await P.page.evaluate(() => document.activeElement?.getAttribute("role"));
          return { rest, held, kbd, focus };
        } finally { await P.close(); }
      });
      if (d.crashed) { for (const x of ["pointer-held", "keyboard-focused", "keyboard register"]) cell(`E-3 ${sc} desk ${x} ${theme}`, "FAIL", d.line); }
      else {
        const gH = d.held.w / d.rest.w, gK = d.kbd.w / d.rest.w;
        cell(`E-3 ${sc} desk pointer-held ${theme}`, gH >= BOUND ? "PASS" : "FAIL", `rest ${f(d.rest.w, 1)} px → held ${f(d.held.w, 1)} px (×${f(gH)}; [data-engaged] ${d.held.n}${d.held.proj ? "; projection" : ""}) · bound ×${BOUND} sustained at 450 ms${d.note ? ` · ${d.note}` : ""}`);
        cell(`E-3 ${sc} desk keyboard-focused ${theme}`, gK >= BOUND ? "PASS" : "FAIL", `rest ${f(d.rest.w, 1)} px → focused ${f(d.kbd.w, 1)} px (×${f(gK)}; focus on ${d.focus}) · bound ×${BOUND}`);
        const squish = d.kbd.rh / d.rest.rh < 0.99 || d.kbd.bh / d.rest.bh < 0.99;
        const hand = d.kbd.held > 0 || d.kbd.grabbing || squish;
        cell(`E-3 ${sc} desk keyboard register ${theme}`, hand ? "FAIL" : "PASS", `Tab-engaged: [data-held] ${d.kbd.held} · cursor grabbing ${d.kbd.grabbing} · root height ×${f(d.kbd.rh / d.rest.rh)} body height ×${f(d.kbd.bh / d.rest.bh)} (bound: no data-held, no grabbing, no squish < ×0.99: the hand's register is the pointer's)`);
      }
      // CK-04's release and keyboard plants, each on a fresh page
      const after = await guard(`afterdrag ${theme}`, async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          const rest = await read(P, m.veil); await drag(P); const a = await read(P, m.veil);
          const mods = {};
          for (const k of ["Shift", "Meta", "Control", "Alt"]) { await P.page.keyboard.down(k); await P.page.waitForTimeout(400); mods[k] = await read(P, m.veil); await P.page.keyboard.up(k); await P.page.waitForTimeout(250); }
          await P.page.keyboard.press("k"); await P.page.waitForTimeout(450); const ch = await read(P, m.veil);
          return { rest, a, mods, ch, focus: await P.page.evaluate(() => document.activeElement?.getAttribute("role") ?? document.activeElement?.tagName) };
        } finally { await P.close(); }
      });
      if (after.crashed) { for (const x of ["afterdrag", "modifier", "unacted key"]) cell(`E-3 ${sc} ${x} ${theme}`, "FAIL", after.line); }
      else {
        cell(`E-3 ${sc} afterdrag ${theme}`, atRest(after.a, after.rest) ? "PASS" : "FAIL", `a pointer drag and release, +${AFTER} ms: ${ratio(after.a, after.rest)} · [data-held] ${after.a.held} · veil ${after.a.veil} (bound ×1 ± ${BAND}, X-1)`);
        const bad = Object.entries(after.mods).filter(([, r]) => !atRest(r, after.rest) || r.held > 0);
        cell(`E-3 ${sc} modifier ${theme}`, bad.length ? "FAIL" : "PASS", `after a drag (focus on ${after.focus}), each held alone 400 ms: ${Object.entries(after.mods).map(([k, r]) => `${k} ${ratio(r, after.rest)} held ${r.held}`).join(" · ")} (bound ×1 ± ${BAND}, no data-held)`);
        cell(`E-3 ${sc} unacted key ${theme}`, atRest(after.ch, after.rest) && after.ch.veil === 0 ? "PASS" : "FAIL", `after a drag, "k" +450 ms: ${ratio(after.ch, after.rest)} · veil ${after.ch.veil} (bound ×1 ± ${BAND}, no veil: a key the control does not act on engages nothing)`);
      }
      const sf = await guard(`scriptfocus ${theme}`, async () => {
        const P = await openPage(E, T, sc, { theme });
        try {
          const rest = await read(P, m.veil);
          await P.page.evaluate(() => document.querySelector('[data-e~="thumb"]').focus()); await P.page.waitForTimeout(450);
          return { rest, s: await read(P, m.veil), focus: await P.page.evaluate(() => document.activeElement?.getAttribute("role")) };
        } finally { await P.close(); }
      });
      if (sf.crashed) cell(`E-3 ${sc} script focus ${theme}`, "FAIL", sf.line);
      else cell(`E-3 ${sc} script focus ${theme}`, atRest(sf.s, sf.rest) && sf.s.veil === 0 ? "PASS" : "FAIL", `element.focus() with no key event (focus on ${sf.focus}), +450 ms: ${ratio(sf.s, sf.rest)} · veil ${sf.s.veil} (bound ×1 ± ${BAND}, no veil)`);
      // phone
      const phone = (prm) => guard(`phone ${theme}${prm ? " PRM" : ""}`, async () => {
        const P = await openTouchPage(E, T, sc, { theme, prm, vp: { width: 390, height: 844 }, q: { phone: "1" } });
        try {
          if (!P.modeOk) return { mode: P.modeLine };
          const rest = await read(P, m.veil); const l0 = await lightRead(P);
          const c = await center(P.page, '[data-e~="thumb"]');
          const [held, l1] = await P.hold(c.x, c.y, 450, async () => [await read(P, m.veil), await lightRead(P)]);
          return { rest, held, light: [...paintDiff(l0.r, l1.r).map((k) => `root ${k}`), ...paintDiff(l0.t, l1.t).map((k) => `thumb ${k}`)] };
        } finally { await P.close(); }
      });
      const p = await phone(false);
      if (p.crashed || p.mode) { cell(`E-3 ${sc} phone touch-held ${theme}`, "FAIL", p.line ?? `MODE NOT APPLIED ${p.mode}`); cell(`E-3 ${sc} phone gutter ${theme}`, "FAIL", p.line ?? `MODE NOT APPLIED ${p.mode}`); }
      else {
        const gw = p.held.w / p.rest.w, gh = p.held.h / p.rest.h;
        cell(`E-3 ${sc} phone touch-held ${theme}`, gw >= BOUND || gh >= BOUND ? "PASS" : "FAIL", `390×844 coarse · rest ${f(p.rest.w, 1)} × ${f(p.rest.h, 1)} px → touch-held ${f(p.held.w, 1)} × ${f(p.held.h, 1)} px (inline ×${f(gw)}, block ×${f(gh)}; [data-engaged] ${p.held.n}) · bound ×${BOUND} on either axis${p.note ? ` · ${p.note}` : ""}`);
        const inside = p.held.l >= GUTTER - 0.5 && p.held.r <= p.held.vw - GUTTER + 0.5;
        cell(`E-3 ${sc} phone gutter ${theme}`, inside ? "PASS" : "FAIL", `engaged box ${f(p.held.l, 1)}..${f(p.held.r, 1)} px in a ${p.held.vw} px viewport · bound ${GUTTER}..${p.held.vw - GUTTER} px`);
      }
      // H-9: the grow retires under reduced motion; the light leg stays
      const dp = await guard(`desk ${theme} PRM`, async () => {
        const P = await openPage(E, T, sc, { theme, prm: true });
        try {
          if (!P.modeOk) return { mode: P.modeLine };
          const rest = await read(P, m.veil); await P.page.focus('[data-sentinel="before"]'); await P.page.keyboard.press(tabKey(engine)); await P.page.waitForTimeout(450);
          return { rest, kbd: await read(P, m.veil), focus: await P.page.evaluate(() => document.activeElement?.getAttribute("role")) };
        } finally { await P.close(); }
      });
      if (dp.crashed || dp.mode) cell(`E-3 ${sc} keyboard-focused PRM ${theme}`, "FAIL", dp.line ?? `MODE NOT APPLIED ${dp.mode}`);
      else cell(`E-3 ${sc} keyboard-focused PRM ${theme}`, atRest(dp.kbd, dp.rest) ? "PASS" : "FAIL", `reduce · rest → focused ${ratio(dp.kbd, dp.rest)} (focus on ${dp.focus}) · bound ×1 ± ${BAND}`);
      const pp = await phone(true);
      if (pp.crashed || pp.mode) cell(`E-3 ${sc} phone touch-held PRM ${theme}`, "FAIL", pp.line ?? `MODE NOT APPLIED ${pp.mode}`);
      else cell(`E-3 ${sc} phone touch-held PRM ${theme}`, atRest(pp.held, pp.rest) && pp.light.length > 0 ? "PASS" : "FAIL", `reduce · rest → touch-held ${ratio(pp.held, pp.rest)} · light leg [${pp.light.join(", ").slice(0, 160)}] (bound ×1 ± ${BAND} on both axes and ≥ 1 paint property)`);
    }
  }
});
