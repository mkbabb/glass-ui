#!/usr/bin/env node
// E-12 · the floor's and MIGRATION's harness cells (pass 4, H4; REGISTRY §P3-8.3 wave 1). Each cell sits inside the
// CK row it serves and has a plant in fixtures.mjs that fails it. Pass 3's critics read these by hand in their own
// probes (C-A3 `ca3-probe.mjs fcslop`, `ck16.mjs`; C-E3 `ce3-scroll.mjs`, `ce3-probe.mjs consumer anchor restored`);
// here they are harness cells, read on the harness's own app.
//   fcslop (CK-14 × CK-13)   scenes with floor "slop", coarse pointer, light and dark: each trigger (`slop` selector)
//                            read without forced colours (its `::after` hit-slop, and a point between the face's top
//                            edge and the slop's, which must hit the trigger) and again, on the same page, with
//                            `forced-colors: active` emulated. PASS when the slop still renders and the same point
//                            still hits the trigger. NOT DRIVEN (FAIL) when the scene renders no slop beyond the face
//                            without forced colours; UNMEASURED when the engine does not apply forced colours
//   fc-reach (CK-27 × CK-13) EVERY scene, fine and coarse, light: every element with a rendered `::after` is read
//                            without forced colours, with four probe points 3 px outside its border box (the edge
//                            midpoints) and whether each hits the element; then forced colours on the same page.
//                            The arm may remove paint: an `::after` it removes must take no hit area with it. FAIL
//                            when a probe point that hit the element no longer does under forced colours (the arm
//                            reached a pseudo-element that was a hit-slop, C-A3 §0.2's class); the line lists every
//                            `::after` the arm removes, so the reach is read on all of them, not on member seats only
//   rest-running (CK-16)     scenes with floor "rest": every infinite animation running at rest (getAnimations over
//                            the document) and, in Chromium, the page's layouts per second over 2 s at rest (CDP
//                            LayoutCount; W-F.6's bound 0; WebKit has no counter: UNMEASURED). Then the scene is put
//                            off-screen (a 4000 px block before the app, scrolled to the top); every such animation
//                            whose target is off-screen must stop: not running, or its currentTime advancing < 1 ms over
//                            1 s. A target still on-screen (a fixed portal) is named and not graded. Nothing running at
//                            rest: REPORT
//   wheel (CK-22)            scenes with floor "wheel": the scene's root moved into a 64 px `overflow: auto` box (200 px
//                            of content each side) on a page taller than the viewport. Control: with nothing engaged a
//                            30 px wheel over the root scrolls the box (else NOT DRIVEN). Then the root is keyboard-
//                            engaged (Tab; the row's `engaged` selector or ×1.03) and the same wheel is sent over its
//                            centre: PASS when the box scrolls and the page does not. A route whose MIGRATION row
//                            states the chaining instead passes `--migration wheel` and the cell REPORTs (the critic
//                            scores the row, with this line as its evidence; as `--unowned` in E-7)
//   consumer anchor (CK-22)  scenes with floor "anchor": a consumer's inline `position-anchor: --consumer-own` on the
//                            root (UNMEASURED if the engine does not parse it); Tab engages; the release (Escape, or
//                            Tab away) is driven to its END: polled until the root is not engaged, not in the top
//                            layer and back at ×1 ± 0.002, then +300 ms (FAIL when it never ends within 4 s). PASS when
//                            the consumer's value is the root's inline value after the release
// Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node e12-floor.mjs --build <dir> | --fixture [--fault e12-fcslop] [--engine webkit] [--migration wheel]
import { witness, openPage, tabKey, f } from "./lib.mjs";

const ENG = 1.03, TOL = 0.002;
const raf2 = (page) => page.evaluate(() => new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok))));

await witness("E-12", "the floor's and MIGRATION's cells (CK-14, CK-16, CK-22, CK-27)", async ({ a, E, T, cell, guard, idx, engine }) => {
  const migrated = new Set(typeof a.migration === "string" ? a.migration.split(",") : []);
  const floor = (k) => Object.entries(idx).filter(([, m]) => (m.gates ?? []).includes("E-12") && (m.floor ?? []).includes(k));

  // ── fcslop ──
  for (const [sc, m] of floor("slop")) for (const theme of ["light", "dark"]) {
    const r = await guard(`${sc} fcslop ${theme}`, async () => {
      const P = await openPage(E, T, sc, { theme, coarse: true });
      try {
        if (!P.modeOk) return { mode: P.modeLine };
        await P.page.waitForTimeout(150);
        const read = (pts) => P.page.evaluate(([sel, pts]) => [...document.querySelectorAll(sel)].map((e, i) => {
          const s = getComputedStyle(e, "::after"); const b = e.getBoundingClientRect();
          const w = s.display === "none" || s.content === "none" ? 0 : parseFloat(s.width) || 0, h = s.display === "none" || s.content === "none" ? 0 : parseFloat(s.height) || 0;
          // the probe point: halfway between the face's top edge and the slop's, on the face's centre line
          const pt = pts?.[i] ?? { x: b.left + b.width / 2, y: b.top - Math.max(0, (h - b.height) / 4) };
          const hit = document.elementFromPoint(pt.x, pt.y);
          return { t: e.getAttribute("data-t") ?? e.className.slice(0, 40), fc: matchMedia("(forced-colors: active)").matches, display: s.display, content: s.content, w, h, face: [b.width, b.height], pt, beyond: Math.max(0, (h - b.height) / 2), hits: !!hit && e.contains(hit), hitDesc: hit ? `${hit.tagName.toLowerCase()}${hit.getAttribute("data-t") ? `[${hit.getAttribute("data-t")}]` : ""}` : "none" };
        }), [m.slop, pts]);
        const off = await read(null);
        await P.page.emulateMedia({ forcedColors: "active" }); await raf2(P.page);
        const on = await read(off.map((x) => x.pt));
        return { off, on };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(`E-12 ${sc} fcslop coarse ${theme}`, "FAIL", r.line); continue; }
    if (r.mode) { cell(`E-12 ${sc} fcslop coarse ${theme}`, "UNMEASURED", `MODE NOT APPLIED ${r.mode}`); continue; }
    if (!r.off.length) { cell(`E-12 ${sc} fcslop coarse ${theme}`, "FAIL", `no target: ${m.slop} renders nothing`); continue; }
    r.off.forEach((x, i) => {
      const y = r.on[i]; const nm = `E-12 ${sc} fcslop ${x.t} coarse ${theme}`;
      if (!y?.fc) { cell(nm, "UNMEASURED", "the engine does not apply (forced-colors: active) (engine limit)"); return; }
      if (!(x.beyond >= 2) || !x.hits) { cell(nm, "FAIL", `NOT DRIVEN: without forced colours the slop extends ${f(x.beyond, 1)} px past a ${x.face.map((v) => f(v, 1)).join("×")} px face and the probe point hits ${x.hitDesc} (no hit-slop to read)`); return; }
      const ok = y.display !== "none" && y.content !== "none" && y.w >= x.w - 0.5 && y.h >= x.h - 0.5 && y.hits;
      cell(nm, ok ? "PASS" : "FAIL", `slop ${f(x.w, 1)}×${f(x.h, 1)} px on a ${x.face.map((v) => f(v, 1)).join("×")} px face; a tap ${f(x.beyond / 2, 1)} px above the face hits the trigger · forced colours: ::after display ${y.display}, content ${y.content}, ${f(y.w, 1)}×${f(y.h, 1)} px, the same tap hits ${y.hits ? "the trigger" : y.hitDesc} (bound: the slop and its hit unchanged)`);
    });
  }

  // ── fc-reach ──
  const scenes = Object.keys(idx).filter((s) => s !== "__index");
  for (const sc of scenes) for (const coarse of [false, true]) {
    const ptr = coarse ? "coarse" : "fine"; const nm = `E-12 ${sc} fc-reach ${ptr}`;
    const r = await guard(`${sc} fc-reach ${ptr}`, async () => {
      const P = await openPage(E, T, sc, { coarse });
      try {
        if (!P.modeOk) return { mode: P.modeLine };
        await P.page.waitForTimeout(200);
        await P.page.evaluate(() => {
          const desc = (e) => `${e.tagName.toLowerCase()}${e.getAttribute("data-t") ? `[${e.getAttribute("data-t")}]` : ""}${[...e.classList].slice(0, 3).map((c) => "." + c).join("")}`.slice(0, 70);
          const rec = [];
          for (const e of document.querySelectorAll("body *")) {
            const s = getComputedStyle(e, "::after"); if (s.content === "none" || s.display === "none") continue;
            const b = e.getBoundingClientRect(); if (!b.width || !b.height) continue;
            const pts = [[b.left + b.width / 2, b.top - 3], [b.left + b.width / 2, b.bottom + 3], [b.left - 3, b.top + b.height / 2], [b.right + 3, b.top + b.height / 2]].filter(([x, y]) => x >= 0 && y >= 0 && x < innerWidth && y < innerHeight);
            const hits = pts.map(([x, y]) => { const h = document.elementFromPoint(x, y); return !!h && e.contains(h); });
            rec.push({ e, d: desc(e), pe: s.pointerEvents, pts, hits });
          }
          window.__fcRec = rec;
        });
        await P.page.emulateMedia({ forcedColors: "active" }); await raf2(P.page);
        return await P.page.evaluate(() => {
          const fc = matchMedia("(forced-colors: active)").matches;
          const removed = [], lost = [];
          for (const x of window.__fcRec) {
            const s = getComputedStyle(x.e, "::after"); const gone = s.content === "none" || s.display === "none";
            if (gone) removed.push(`${x.d}${x.pe === "none" ? "" : ` (pointer-events ${x.pe})`}`);
            const l = x.pts.filter(([px, py], i) => { if (!x.hits[i]) return false; const h = document.elementFromPoint(px, py); return !(h && x.e.contains(h)); });
            if (l.length) lost.push(`${x.d}: ${l.length} of ${x.hits.filter(Boolean).length} out-of-box hit point(s) lost${gone ? " with its ::after" : ""}`);
          }
          return { fc, n: window.__fcRec.length, removed, lost };
        });
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(nm, "FAIL", r.line); continue; }
    if (r.mode) { cell(nm, "UNMEASURED", `MODE NOT APPLIED ${r.mode}`); continue; }
    if (!r.fc) { cell(nm, "UNMEASURED", "the engine does not apply (forced-colors: active) (engine limit)"); continue; }
    cell(nm, r.lost.length ? "FAIL" : "PASS", `${r.n} element(s) render an ::after; forced colours removes ${r.removed.length}${r.removed.length ? `: ${[...new Set(r.removed)].slice(0, 8).join(", ")}` : ""} · hit area lost under forced colours: ${r.lost.length ? r.lost.slice(0, 4).join(" · ") : "none"} (bound: the arm removes paint, never a hit area)`.slice(0, 900));
  }

  // ── rest-running ──
  for (const [sc] of floor("rest")) {
    const r = await guard(`${sc} rest-running`, async () => {
      const P = await openPage(E, T, sc);
      try {
        await P.page.waitForTimeout(800);
        const at = await P.page.evaluate(() => {
          const desc = (e) => e ? `${e.tagName.toLowerCase()}${e.getAttribute("data-t") ? `[${e.getAttribute("data-t")}]` : ""}${[...e.classList].slice(0, 2).map((c) => "." + c).join("")}`.slice(0, 60) : "?";
          const run = document.getAnimations().filter((x) => x.playState === "running" && x.effect?.getTiming().iterations === Infinity);
          window.__rest = run;
          return run.map((x) => `${desc(x.effect?.target)} ${x.animationName ?? x.constructor.name}`);
        });
        let layouts = null;
        if (engine === "chromium") {
          const s = await P.ctx.newCDPSession(P.page); await s.send("Performance.enable");
          const g = async () => (await s.send("Performance.getMetrics")).metrics.find((x) => x.name === "LayoutCount").value;
          const l0 = await g(); const t0 = Date.now(); await P.page.waitForTimeout(2000); const l1 = await g(); layouts = (l1 - l0) / ((Date.now() - t0) / 1000);
        }
        const off = await P.page.evaluate(async () => {
          const sp = document.createElement("div"); sp.style.height = "4000px"; sp.setAttribute("data-t", "offscreen-block"); document.body.prepend(sp); window.scrollTo(0, 0);
          await new Promise((ok) => setTimeout(ok, 600));
          const desc = (e) => e ? `${e.tagName.toLowerCase()}${e.getAttribute("data-t") ? `[${e.getAttribute("data-t")}]` : ""}${[...e.classList].slice(0, 2).map((c) => "." + c).join("")}`.slice(0, 60) : "?";
          const rows = window.__rest.map((x) => { const t = x.effect?.target; const b = t?.getBoundingClientRect?.(); return { x, d: `${desc(t)} ${x.animationName ?? x.constructor.name}`, offs: !!b && (b.top >= innerHeight || b.bottom <= 0), top: b ? Math.round(b.top) : null, c0: x.currentTime }; });
          await new Promise((ok) => setTimeout(ok, 1000));
          return rows.map((r) => ({ d: r.d, offs: r.offs, top: r.top, ps: r.x.playState, adv: r.x.playState === "running" && r.c0 != null && r.x.currentTime != null ? +r.x.currentTime - +r.c0 : 0 }));
        });
        return { at, layouts, off, vh: await P.page.evaluate(() => innerHeight) };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(`E-12 ${sc} rest-running off-screen`, "FAIL", r.line); continue; }
    if (engine === "chromium") cell(`E-12 ${sc} rest layouts`, r.layouts === 0 ? "PASS" : "FAIL", `${f(r.layouts, 1)} layouts/s over 2 s at rest (W-F.6 bound 0) · running at rest: ${r.at.join(", ") || "none"}`);
    else cell(`E-12 ${sc} rest layouts`, "UNMEASURED", "no layout counter in this engine (CDP Performance is Chromium's)");
    if (!r.at.length) { cell(`E-12 ${sc} rest-running off-screen`, "REPORT", "nothing runs at rest (no infinite animation)"); continue; }
    const graded = r.off.filter((x) => x.offs), still = graded.filter((x) => x.adv >= 1), onscr = r.off.filter((x) => !x.offs);
    if (!graded.length) { cell(`E-12 ${sc} rest-running off-screen`, "FAIL", `NOT DRIVEN: no running target left the ${r.vh} px viewport (${onscr.map((x) => `${x.d} top ${x.top}`).join(", ")})`); continue; }
    cell(`E-12 ${sc} rest-running off-screen`, still.length ? "FAIL" : "PASS", `${graded.length} animation(s) running at rest, their targets moved off-screen (top ${graded.map((x) => x.top).join("/")} px against a ${r.vh} px viewport): ${still.length ? `still running: ${still.map((x) => `${x.d} (+${f(x.adv, 0)} ms over 1 s)`).join(", ")}` : `all stopped (${graded.map((x) => `${x.d} ${x.ps}`).join(", ")})`}${onscr.length ? ` · not graded, still on-screen: ${onscr.map((x) => x.d).join(", ")}` : ""} (bound: stops off-screen)`.slice(0, 900));
  }

  // ── wheel ──
  const engagedFn = ([root, sel, ENG]) => { const e = document.querySelector(root); if (!e) return { none: true }; return { eng: (sel ? e.matches(sel) : false) || window.__eff(e).s >= ENG, s: window.__eff(e).s, pop: e.matches(":popover-open"), attr: sel ? e.matches(sel) : null }; };
  for (const [sc, m] of floor("wheel")) {
    const root = '[data-e~="root"]';
    const r = await guard(`${sc} wheel`, async () => {
      const P = await openPage(E, T, sc);
      try {
        const { page } = P;
        const ok = await page.evaluate((root) => {
          const e = document.querySelector(root); if (!e) return false;
          document.body.style.minHeight = "2400px";
          const box = document.createElement("div"); box.setAttribute("data-t", "e12-scroller"); box.style.cssText = "height:64px;overflow:auto;overscroll-behavior:auto";
          const pad = () => { const d = document.createElement("div"); d.style.height = "200px"; return d; };
          e.before(box); box.append(pad(), e, pad());
          const eh = e.getBoundingClientRect().height; box.scrollTop = 200 - Math.max(0, (64 - eh) / 2); window.scrollTo(0, 0);
          return true;
        }, root);
        if (!ok) return { none: true };
        const st = () => page.evaluate(() => [document.querySelector('[data-t="e12-scroller"]').scrollTop, window.scrollY]);
        const put = (s) => page.evaluate((s) => { document.querySelector('[data-t="e12-scroller"]').scrollTop = s[0]; window.scrollTo(0, s[1]); }, s);
        const ctr = () => page.evaluate((root) => { const b = document.querySelector(root).getBoundingClientRect(); return { x: b.left + b.width / 2, y: b.top + b.height / 2 }; }, root);
        const wheelAt = async () => { const s0 = await st(); const c = await ctr(); await page.mouse.move(c.x, c.y); await page.mouse.wheel(0, 30); await page.waitForTimeout(300); const s1 = await st(); await put(s0); await page.waitForTimeout(100); return { box: s1[0] - s0[0], page: s1[1] - s0[1] }; };
        const ctl = await wheelAt();
        await page.mouse.move(2, 2);
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
        const e0 = await page.evaluate(engagedFn, [root, m.engaged ?? "[data-engaged]", ENG]);
        const eng = await wheelAt();
        return { ctl, e0, eng };
      } finally { await P.close(); }
    });
    const nm = `E-12 ${sc} wheel over engaged control`;
    if (r.crashed) { cell(nm, "FAIL", r.line); continue; }
    if (r.none) { cell(nm, "FAIL", "no target: the scene renders no root"); continue; }
    if (!(r.ctl.box > 0)) { cell(nm, "FAIL", `NOT DRIVEN: with nothing engaged a 30 px wheel over the root scrolls the box +${r.ctl.box} and the page +${r.ctl.page} (the scroller does not take the wheel here)`); continue; }
    if (!r.e0.eng) { cell(nm, "FAIL", `NOT DRIVEN: Tab did not engage the root (×${f(r.e0.s)}, engaged attribute ${r.e0.attr})`); continue; }
    const pass = r.eng.box > 0 && r.eng.page === 0;
    const line = `nothing engaged: box +${r.ctl.box}, page +${r.ctl.page} · keyboard-engaged (×${f(r.e0.s)}, top layer ${r.e0.pop}): a 30 px wheel over the control scrolls the box +${r.eng.box}, the page +${r.eng.page} (bound: the box scrolls, the page does not)`;
    if (!pass && migrated.has("wheel")) cell(nm, "REPORT", `${line} · the route's MIGRATION row states the chaining (--migration wheel): CK-22 is scored on that row`);
    else cell(nm, pass ? "PASS" : "FAIL", line);
  }

  // ── consumer anchor ──
  for (const [sc, m] of floor("anchor")) for (const how of ["escape", "blur"]) {
    const root = '[data-e~="root"]'; const nm = `E-12 ${sc} consumer anchor · ${how}`;
    const r = await guard(`${sc} anchor ${how}`, async () => {
      const P = await openPage(E, T, sc);
      try {
        const { page } = P;
        const parsed = await page.evaluate((root) => { const e = document.querySelector(root); if (!e) return null; e.style.setProperty("position-anchor", "--consumer-own"); return e.style.getPropertyValue("position-anchor"); }, root);
        if (parsed === null) return { none: true };
        if (parsed !== "--consumer-own") return { unparsed: parsed };
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(500);
        const e0 = await page.evaluate(engagedFn, [root, m.engaged ?? "[data-engaged]", ENG]);
        const during = await page.evaluate((root) => document.querySelector(root).style.getPropertyValue("position-anchor"), root);
        await page.keyboard.press(how === "escape" ? "Escape" : tabKey(engine));
        const t0 = Date.now(); let end = null;
        while (Date.now() - t0 < 4000) {
          const x = await page.evaluate(engagedFn, [root, m.engaged ?? "[data-engaged]", ENG]);
          if (!x.attr && !x.pop && Math.abs(x.s - 1) <= TOL) { end = Date.now() - t0; break; }
          await page.waitForTimeout(50);
        }
        await page.waitForTimeout(300);
        const after = await page.evaluate((root) => document.querySelector(root).style.getPropertyValue("position-anchor"), root);
        return { e0, during, end, after };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(nm, "FAIL", r.line); continue; }
    if (r.none) { cell(nm, "FAIL", "no target: the scene renders no root"); continue; }
    if (r.unparsed !== undefined) { cell(nm, "UNMEASURED", `the engine does not parse an inline position-anchor (read back "${r.unparsed}") (engine limit)`); continue; }
    if (!r.e0.eng) { cell(nm, "FAIL", `NOT DRIVEN: Tab did not engage the root (×${f(r.e0.s)}, engaged attribute ${r.e0.attr})`); continue; }
    if (r.end === null) { cell(nm, "FAIL", `the release never ended within 4 s (still engaged, in the top layer or off ×1) · consumer value while engaged "${r.during}"`); continue; }
    cell(nm, r.after === "--consumer-own" ? "PASS" : "FAIL", `a consumer's inline position-anchor --consumer-own · while engaged (×${f(r.e0.s)}, top layer ${r.e0.pop}) "${r.during || "(removed)"}" · ${how === "escape" ? "Escape" : "Tab away"}: the release ended at ${r.end} ms, then +300 ms: "${r.after || "(removed)"}" (bound: the consumer's own value)`);
  }
});
