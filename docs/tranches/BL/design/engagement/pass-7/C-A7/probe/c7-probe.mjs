#!/usr/bin/env node
// C-A7 adversarial probe (C-A7b: stateless controls driven by element.click(), as E-2 drives them; an undriven control is UNMEASURED) (D5 pass 7, the fresh critic of the candidate HEAD + P-E7.patch). Not a witness: each cell is
// scored in C-A7.md against the CK row it would break, or recorded as a next-pass class. App: the harness's own scene
// app. Through the harness's lib: one browser per run, a fresh context per cell, every page/context closed in a
// finally (P.close), the browser closed by witness(); WebKit relaunches every NAV_CAP navigations (H3-1). Stills only.
//   node c7-probe.mjs --build <out>/builds/<label> [--engine webkit] [--out <dir>] [--frames <dir>]
//        [--only chipfine,crestinput,clipwheel,cliploupe]
// Cells:
//   chipfine <theme>    CK-27/CK-25/D-2: the Configurator preset chip's hover and press, read finer than C-A6's ≥ 16
//        level cell: per state change, the fraction of the chip's pixels moving ≥ 16, ≥ 8 and ≥ 4 levels of luma and
//        the mean |Δluma|; beside it, the same read on the Button scene's target under the same hover (a library
//        hover rung for scale). REPORT.
//   crestinput <tok>    CK-21/CK-12: the crest's new input `--scale-press` (the crest is now calc(2 − press)) and
//        `--scale-engage`, planted `nonsense` on <html> before the first script; a programmatic commit is filmed on
//        chip, switch, checkbox, button. PASS when the pop is intact or ≥ 1 console.error names the crest or the token.
//   clipwheel           CK-20: the keyboard-promoted slider in `clipstale` with the scroller moved by real wheel
//        events (3 px each, 14 events), one still of the 24 px strip above the scroller right after each wheel event
//        (no rAF wait), against the released control at the same scrollTop. px² differing ≥ 16 levels per step;
//        bound as E-10's: no step over 3 rows × the control's width, adjacent steps likewise.
//   cliploupe           CK-25 (and the CK-20 clause's cost): a touch hold on a slider whose rest box sits 4 px below
//        its scroller's top edge (fully visible): the loupe's box against the clip edge (the fraction of its height
//        above the edge, which the clip now cuts), the frame saved. Control: the slider mid-box. REPORT.
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { witness, openPage, openTouchPage, center, f, GLASS, scenesFor, tabKey } from "../../../harness/lib.mjs";
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const delta = (a, b) => { if (!a || !b || a.w !== b.w || a.h !== b.h) return null; let n16 = 0, n8 = 0, n4 = 0, s = 0; const N = a.o.length; for (let i = 0; i < N; i++) { const d = Math.abs(a.o[i] - b.o[i]); s += d; if (d >= 16) n16++; if (d >= 8) n8++; if (d >= 4) n4++; } return { p16: n16 / N, p8: n8 / N, p4: n4 / N, mean: s / N }; };
const fmtD = (d) => (d ? `≥16: ${f(d.p16 * 100, 1)} % · ≥8: ${f(d.p8 * 100, 1)} % · ≥4: ${f(d.p4 * 100, 1)} % · mean |Δ| ${f(d.mean, 2)} levels` : "unread");
const bbox = (page, sel) => page.evaluate((s) => { const e = document.querySelector(s); if (!e) return null; const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, w: r.width, h: r.height }; }, sel);
const shotBox = async (page, bb) => luma(await page.screenshot({ clip: { x: Math.max(0, Math.floor(bb.x) - 4), y: Math.max(0, Math.floor(bb.y) - 4), width: Math.ceil(bb.w) + 8, height: Math.ceil(bb.h) + 8 }, animations: "allow", caret: "initial" }));

await witness("C-A7 probe", "C-A7's adversarial cells (chip hover/press fine read, crest inputs, clip under wheel scroll, loupe at a clip edge)", async ({ a, E, T, cell, guard, idx, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const want = (k) => !only || only.has(k);
  const frames = typeof a.frames === "string" ? a.frames : null;
  if (frames) mkdirSync(frames, { recursive: true });

  if (want("chipfine")) for (const theme of ["light", "dark"]) {
    const name = `chipfine preset chip ${theme}`;
    const sel = '[data-t="cap-configurator"] .configurator-preset-chip:not(.is-active)';
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "capsule", { theme });
      try {
        await P.page.mouse.move(2, 2); await P.page.waitForTimeout(500);
        const bb = await bbox(P.page, sel); if (!bb) return { none: true };
        const cls = await P.page.evaluate((s) => document.querySelector(s).className, sel);
        const rest = await shotBox(P.page, bb);
        await P.page.mouse.move(bb.x + bb.w / 2, bb.y + bb.h / 2); await P.page.waitForTimeout(500);
        const hov = await shotBox(P.page, bb);
        await P.page.mouse.down(); await P.page.waitForTimeout(300);
        const prs = await shotBox(P.page, bb);
        const mark = await P.page.evaluate((s) => document.querySelector(s).hasAttribute("data-press"), sel);
        await P.page.mouse.up();
        return { hover: delta(rest, hov), press: delta(hov, prs), restPress: delta(rest, prs), cls, mark, w: bb.w, h: bb.h };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.none) { cell(name, "UNMEASURED", "no inactive preset chip rendered"); continue; }
    cell(name, "REPORT", `chip ${f(r.w, 1)}×${f(r.h, 1)} px, class "${r.cls}" · rest → hover: ${fmtD(r.hover)} · hover → held press 300 ms: ${fmtD(r.press)} (data-press ${r.mark}) · rest → press: ${fmtD(r.restPress)}`);
    // the library reference: the Button scene's target under the same hover
    const rn = `chipfine reference button hover ${theme}`;
    const rr = await guard(rn, async () => {
      const P = await openPage(E, T, "button", { theme });
      try {
        await P.page.mouse.move(2, 2); await P.page.waitForTimeout(500);
        const bb = await bbox(P.page, '[data-e~="target"]'); if (!bb) return { none: true };
        const rest = await shotBox(P.page, bb);
        await P.page.mouse.move(bb.x + bb.w / 2, bb.y + bb.h / 2); await P.page.waitForTimeout(500);
        const hov = await shotBox(P.page, bb);
        return { hover: delta(rest, hov), w: bb.w, h: bb.h };
      } finally { await P.close(); }
    }, 60000);
    if (rr.crashed) cell(rn, "FAIL", rr.line); else if (rr.none) cell(rn, "UNMEASURED", "no target"); else cell(rn, "REPORT", `button ${f(rr.w, 1)}×${f(rr.h, 1)} px · rest → hover: ${fmtD(rr.hover)}`);
  }

  if (want("crestinput")) {
    const pick = scenesFor(idx, "E-2").filter(([sc]) => /^(chip|switch|checkbox|button)$/.test(sc));
    for (const [sc, m] of pick) {
      const runOnce = async (plant) => {
        const P = await openPage(E, T, sc, { theme: "light", ...(plant ? { plant } : {}) });
        try {
          await P.page.waitForTimeout(400);
          const fr = await P.page.evaluate(([tg, face, stateless]) => new Promise((ok) => { const el = () => document.querySelector(face) ?? document.querySelector(tg); const fr = []; const t0 = performance.now(); if (stateless) document.querySelector(tg).click(); else window.__e.commit(); const tick = () => { const e = el(); fr.push(e ? window.__eff(e).s : NaN); if (performance.now() - t0 < 800) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); }), [m.target, m.face ?? m.target, !!m.stateless]);
          const s = fr.filter(Number.isFinite);
          const crest = await P.page.evaluate(([tg, face]) => { const e = document.querySelector(face) ?? document.querySelector(tg); return e ? getComputedStyle(e).getPropertyValue("--rung-crest").trim() : "none"; }, [m.target, m.face ?? m.target]);
          return { peak: s.length ? Math.max(...s) : NaN, errs: P.errors.slice(), crest };
        } finally { await P.close(); }
      };
      const ctl = await guard(`crestinput control ${sc}`, () => runOnce(null), 60000);
      if (ctl.crashed) { cell(`crestinput control ${sc}`, "FAIL", ctl.line); continue; }
      // C-A7b: a control that did not pop drove nothing; its planted cells would read "intact" vacuously
      if (!(ctl.peak > 1.005)) { cell(`crestinput ${sc}`, "UNMEASURED", `NOT DRIVEN: the unplanted commit popped ×${f(ctl.peak, 4)}`); continue; }
      cell(`crestinput control ${sc}`, "REPORT", `unplanted: peak ×${f(ctl.peak, 4)} · --rung-crest ${ctl.crest} · console errors ${ctl.errs.length}`);
      for (const tok of ["--scale-press", "--scale-engage"]) {
        const name = `crestinput ${tok} ${sc}`;
        const r = await guard(name, () => runOnce([tok, "nonsense"]), 60000);
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        const said = r.errs.filter((e) => e.includes(tok) || e.includes("--rung-crest") || /crest/i.test(e));
        const intact = Math.abs(r.peak - ctl.peak) <= 0.002;
        cell(name, said.length || intact ? "PASS" : "FAIL", `planted nonsense: peak ×${f(r.peak, 4)} (unplanted ×${f(ctl.peak, 4)}; ${intact ? "intact" : "DEGRADED"}) · --rung-crest ${r.crest} · console errors naming it ${said.length} of ${r.errs.length}${said[0] ? ` · "${said[0].slice(0, 140)}"` : ""}`);
      }
    }
  }

  const BOX = '[data-t="box"]', REST = '[data-t="slider-a"]', ROOT = '[data-t="slider-a"] .glass-slider';
  if (want("clipwheel")) {
    const name = "clipwheel · keyboard promoted, wheel-scrolled (CK-20)";
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        // the rest box 2 px below the scroller's top edge, then engage by the keyboard
        const place = (hid) => page.evaluate(([B, Q, hid]) => { const b = document.querySelector(B), q = document.querySelector(Q); const br = b.getBoundingClientRect(); b.scrollTop += q.getBoundingClientRect().top - (br.top + b.clientTop - hid); return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => ok(b.scrollTop)))); }, [BOX, REST, hid]);
        await place(-2);
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(700);
        const g = await page.evaluate(([B, R]) => { const b = document.querySelector(B), h = document.querySelector(R); const br = b.getBoundingClientRect(); return { visTop: br.top + b.clientTop, l: br.left + b.clientLeft, w: b.clientWidth, cx: br.left + br.width / 2, cy: br.top + br.height * 0.75, hw: h.offsetWidth, eng: h.hasAttribute("data-engaged"), promoted: h.matches(":popover-open") }; }, [BOX, ROOT]);
        const clipR = { x: Math.max(0, Math.floor(g.l)), y: Math.max(0, Math.floor(g.visTop) - 26), width: Math.floor(g.w), height: 24 };
        // the wheel needs the mouse over the scroller, away from the control
        await page.mouse.move(g.cx, g.cy);
        const eng = [], tops = [], states = [];
        for (let k = 0; k < 14; k++) {
          await page.mouse.wheel(0, 3);
          eng.push(luma(await page.screenshot({ clip: clipR })));
          const s = await page.evaluate(([B, R]) => { const h = document.querySelector(R); return { top: document.querySelector(B).scrollTop, eng: h.hasAttribute("data-engaged"), clip: h.style.clipPath }; }, [BOX, ROOT]);
          tops.push(s.top); states.push(s);
        }
        await page.keyboard.press("Escape"); await page.waitForTimeout(700);
        const rel = await page.evaluate((R) => document.querySelector(R).hasAttribute("data-engaged"), ROOT);
        const rest = [];
        for (const t of tops) { await page.evaluate(([B, t]) => { document.querySelector(B).scrollTop = t; return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(ok))); }, [BOX, t]); await page.waitForTimeout(60); rest.push(luma(await page.screenshot({ clip: clipR }))); }
        const area = eng.map((e, k) => { let n = 0; const z = rest[k]; for (let i = 0; i < e.o.length; i++) if (Math.abs(e.o[i] - z.o[i]) >= 16) n++; return n; });
        return { area, tops, g, rel, states };
      } finally { await P.close(); }
    }, 120000);
    if (r.crashed) cell(name, "FAIL", r.line);
    else {
      const bound = 3 * r.g.hw; const most = Math.max(...r.area); const steps = r.area.slice(1).map((x, k) => Math.abs(r.area[k] - x)); const worst = Math.max(...steps);
      const engAll = r.states.every((s) => s.eng); const driven = r.g.eng && r.g.promoted && engAll && !r.rel && new Set(r.tops).size > 3;
      cell(name, !driven ? "FAIL" : most <= bound && worst <= bound ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: engaged ${r.g.eng} promoted ${r.g.promoted} engaged every step ${engAll} released ${!r.rel} distinct scrollTops ${new Set(r.tops).size} · `}scrollTop per wheel event ${r.tops.join("/")} · px² of the strip above the scroller differing from the released strip: ${r.area.join(" / ")} · largest ${most}, largest adjacent change ${worst} (bound ${bound} = 3 rows × ${r.g.hw} px) · clip at the last step "${r.states.at(-1).clip}"`);
    }
  }

  if (want("cliploupe")) for (const where of ["edge", "mid"]) {
    const name = `cliploupe · touch hold, rest box ${where === "edge" ? "4 px below the scroller's top edge" : "mid-box (control)"}`;
    const r = await guard(name, async () => {
      const P = await openTouchPage(E, T, "clipstale");
      try {
        const { page } = P;
        await page.evaluate(([B, Q, where]) => { const b = document.querySelector(B), q = document.querySelector(Q); const br = b.getBoundingClientRect(), rr = q.getBoundingClientRect(); const want = where === "edge" ? br.top + b.clientTop + 4 : br.top + br.height / 2 - rr.height / 2; b.scrollTop += rr.top - want; }, [BOX, REST, where]);
        await page.waitForTimeout(200);
        const c = await center(page, `${REST} [role="slider"]`);
        const read = async () => {
          const g = await page.evaluate(([B, R]) => { const b = document.querySelector(B), h = document.querySelector(R); const lens = h.querySelector(".glass-loupe"); const br = b.getBoundingClientRect(); const L = lens?.getBoundingClientRect(); return { visTop: br.top + b.clientTop, lens: L ? { top: L.top, bottom: L.bottom, h: L.height, x: L.left, w: L.width, op: +getComputedStyle(lens).opacity } : null, promoted: h.matches(":popover-open"), eng: h.hasAttribute("data-engaged"), clip: h.style.clipPath }; }, [BOX, ROOT]);
          let buf = null;
          if (g.lens) { const top = Math.max(0, Math.floor(Math.min(g.lens.top, g.visTop)) - 6); const clip = { x: Math.max(0, Math.floor(g.lens.x) - 6), y: top, width: Math.ceil(g.lens.w) + 12, height: Math.ceil(Math.max(g.lens.bottom, g.visTop) - top) + 30 }; buf = P.shot ? await P.shot(clip) : await page.screenshot({ clip }); }
          return { g, buf };
        };
        const [x] = await P.holdAt(c.x, c.y, [1200], read);
        return x;
      } finally { await P.close(); }
    }, 90000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const { g, buf } = r;
    if (buf && frames) writeFileSync(path.join(frames, `c7-${engine}-cliploupe-${where}.png`), buf);
    if (!g.lens) { cell(name, "REPORT", `no loupe box · promoted ${g.promoted} engaged ${g.eng}`); continue; }
    const above = Math.max(0, Math.min(g.lens.bottom, g.visTop) - g.lens.top);
    cell(name, "REPORT", `promoted ${g.promoted} engaged ${g.eng} · loupe ${f(g.lens.top, 1)}..${f(g.lens.bottom, 1)} px (opacity ${f(g.lens.op, 2)}), the scroller's clip edge at ${f(g.visTop, 1)} px · ${f(above, 1)} of ${f(g.lens.h, 1)} px of the loupe lie above the edge (${f((100 * above) / g.lens.h, 0)} % cut by the clip) · clip-path "${g.clip}"`);
  }
});
