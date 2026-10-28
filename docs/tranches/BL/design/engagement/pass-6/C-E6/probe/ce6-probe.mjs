#!/usr/bin/env node
// C-E6 adversarial probe (D5 pass 6, the fresh critic of A+E). Not a witness: each cell is scored in C-E6.md against
// the CK row it would break. App: the harness's own scene app (build.mjs), scenes `restale` and `clipstale`. One
// browser per run, a context per cell, every page/context/browser closed in finally (lib.mjs openPage/Engine; WebKit
// relaunches every NAV_CAP navigations, H3-1). Films take no screenshot; the one frame cell shoots after its read.
//   node ce6-probe.mjs --build <out>/builds/<label> [--engine chromium|webkit] [--label l] [--frames dir] [--only a,b]
// Cells:
//   clip-pointer · <top|bottom> · <reveal|conceal|control>  (CK-20; the cell H6 left UNMEASURED: "scrolling the box
//        ends a mouse hold"). This driver never scrolls under the hold: the box is scrolled BEFORE the press so the
//        slider stands fully in view 2 px inside the named edge, the mouse is pressed and held on it, and only then
//        the spacer (a style write) moves the rest box 70 % past that edge. 500 ms later the spacer moves it toward
//        the visible side by hidden − 2 px (reveal), away from it (conceal), or not at all (control); 400 ms later a
//        node is appended below the box and the host is filmed 900 ms. Bound ≤ 4 px per 16.7 ms (ce5-probe's).
//        NOT DRIVEN unless engaged throughout, clipped before the move, and the move landed (±1 px)
//   page-scroll · keyboard  (CK-20, the promoted control on its anchor): the page is made tall before the engagement,
//        Tab engages the slider (promoted on every arm), then the window scrolls 12 px per frame for 20 frames. Per
//        frame: |host centre − footprint centre| (both from getBoundingClientRect, same frame). Bound ≤ 1 px
//   idle loop · keyboard  (CK-16, REPORT + one grade): requestAnimationFrame registrations per second, counted by a
//        wrapper installed before any page script, over 2 s windows: before any engagement (the page's own), engaged
//        by Tab and left idle, and 1.5 s after Escape. Chromium also reads LayoutCount/RecalcStyleCount over the same
//        windows (CDP Performance.getMetrics). Graded: after Escape the rate returns to the page's own (≤ +2/s), the
//        stage's "the loop stops when the stage empties". The idle-engaged rate and layouts are REPORT
//   ro-loop · keyboard  (CK-21/CK-20 REPORT, graded 0 errors): engaged by Tab, then four moves 120 ms apart (inset,
//        centred shrink, viewport 700 → 520, translate): every console error and page error (a "ResizeObserver loop"
//        error is the per-frame re-observe answering its own write)
//   clip-overpaint · keyboard  (CK-25 frame, REPORT): clipstale, Tab engaged, the box scrolled so 70 % of the rest
//        box is hidden past the top edge. The promoted host's painted rect against the box's visible rect: how many px
//        the control paints outside the card that clips its place. One frame shot after the read
import { parseArgs, serveTarget, Engine, openPage, acquireLock, load, f, tabKey } from "../../../harness/lib.mjs";
import fs from "node:fs";

const a = parseArgs();
const engine = typeof a.engine === "string" ? a.engine : "chromium";
const label = typeof a.label === "string" ? a.label : "probe";
const frames = typeof a.frames === "string" ? a.frames : null;
const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
const want = (k) => !only || only.has(k);
const out = [];
const cell = (name, v, line) => { const s = `  ${v.padEnd(10)} ${name} · ${line} · load ${load()}`; out.push(s); console.log(s); };
const NOM = 1000 / 60, STEP = 4, SPACER = 60;
const A = '[data-t="slider-a"] .glass-slider';

const film = ([sel, ms]) => new Promise((ok) => {
  const fr = []; const t0 = performance.now();
  const tick = () => { const e = document.querySelector(sel); const r = e.getBoundingClientRect(); fr.push({ t: performance.now() - t0, x: r.left + r.width / 2, y: r.top + r.height / 2, eng: e.hasAttribute("data-engaged") }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); };
  requestAnimationFrame(tick);
});
const steps = (fr) => fr.slice(1).map((x, k) => ({ t: x.t, d: (Math.hypot(x.y - fr[k].y, x.x - fr[k].x) * NOM) / Math.max(NOM, x.t - fr[k].t), dy: x.y - fr[k].y }));
const read = ([sel]) => {
  const h = document.querySelector(sel); const fp = h.previousElementSibling?.classList.contains("engage-footprint") ? h.previousElementSibling : null; const rest = fp ?? h;
  const b = document.querySelector('[data-t="box"]'); const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop, visBot = visTop + b.clientHeight;
  // the rest box free of the grow: a footprint's rect, or the in-place host's layout box about its painted centre
  const hr = h.getBoundingClientRect();
  const r = fp ? fp.getBoundingClientRect() : { top: hr.top + hr.height / 2 - h.offsetHeight / 2, bottom: hr.top + hr.height / 2 + h.offsetHeight / 2, height: h.offsetHeight };
  const vis = Math.max(0, Math.min(r.bottom, visBot) - Math.max(r.top, visTop));
  return { eng: h.hasAttribute("data-engaged"), pop: h.matches(":popover-open"), rest: fp ? "footprint" : "host", top: r.top, bottom: r.bottom, h: r.height, vis, visTop, visBot, hostTop: hr.top, hostBot: hr.bottom, hostL: hr.left, hostR: hr.right, boxL: br.left + b.clientLeft, boxR: br.left + b.clientLeft + b.clientWidth, sx: hr.width / h.offsetWidth };
};
const RAF_COUNT = () => {
  const raw = window.requestAnimationFrame.bind(window); window.__rafN = 0;
  window.requestAnimationFrame = (cb) => { window.__rafN++; return raw(cb); };
};
const rafRate = async (page, ms) => { const n0 = await page.evaluate(() => window.__rafN); await page.waitForTimeout(ms); const n1 = await page.evaluate(() => window.__rafN); return ((n1 - n0) * 1000) / ms; };

await acquireLock();
console.log(`C-E6 probe ${label} · ${engine} · load ${load()} at start`);
const T = await serveTarget({ build: a.build });
const E = new Engine(engine);
try {
  // ── clip-pointer: a held mouse in a clipping scroller, never scrolled under the hold ──────────────────────────
  if (want("clip-pointer")) for (const side of ["top", "bottom"]) for (const dir of ["reveal", "conceal", "control"]) {
    const P = await openPage(E, T, "clipstale");
    try {
      const { page } = P;
      // before the press: the slider fully in view, 2 px inside the named edge
      await page.evaluate(([sel, side]) => {
        const h = document.querySelector(sel); const b = document.querySelector('[data-t="box"]'); const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop, visBot = visTop + b.clientHeight;
        const r = h.getBoundingClientRect(); b.scrollTop += side === "top" ? r.top - (visTop + 2) : r.bottom - (visBot - 2);
      }, [A, side]);
      await page.waitForTimeout(200);
      const p = await page.evaluate(([sel]) => { const r = document.querySelector(sel).getBoundingClientRect(); return { x: r.left + r.width * 0.5, y: r.top + r.height / 2 }; }, [A]);
      const st0 = await page.evaluate(() => document.querySelector('[data-t="box"]').scrollTop);
      await page.mouse.move(p.x, p.y); await page.mouse.down();
      await page.waitForTimeout(400);
      const sA = await page.evaluate(read, [A]);
      const hidden = Math.round(sA.h * 0.7);
      // the clip by a style write: top → the spacer shrinks by 2 + hidden; bottom → it grows by 2 + hidden
      const sp1 = side === "top" ? SPACER - (2 + hidden) : SPACER + (2 + hidden);
      await page.evaluate((g) => window.__e.grow(g), sp1);
      await page.waitForTimeout(500);
      const s0 = await page.evaluate(read, [A]);
      const d = Math.max(2, hidden - 2);
      const sign = dir === "control" ? 0 : (side === "top") === (dir === "reveal") ? 1 : -1;
      if (sign) await page.evaluate((g) => window.__e.grow(g), sp1 + sign * d);
      await page.waitForTimeout(400);
      const s1 = await page.evaluate(read, [A]);
      const pr = page.evaluate(film, [A, 900]);
      await page.waitForTimeout(80);
      await page.evaluate(() => window.__e.tick());
      const fr = await pr;
      const st1 = await page.evaluate(() => document.querySelector('[data-t="box"]').scrollTop);
      await page.mouse.up();
      const stp = steps(fr); const worst = stp.reduce((m, x) => (x.d > m.d ? x : m), { d: 0, t: 0, dy: 0 });
      const moved = s1.top - s0.top;
      const clipped = s0.vis > 0 && s0.vis < s0.h - 0.5;
      const landed = Math.abs(Math.abs(moved) - (sign ? d : 0)) <= 1;
      const driven = sA.eng && s0.eng && fr.every((x) => x.eng) && clipped && landed && st0 === st1;
      cell(`clip-pointer · ${side} · ${dir}`, !driven ? "FAIL NOT DRIVEN" : worst.d <= STEP ? "PASS" : "FAIL",
        `held, engaged ${s0.eng} (top layer ${s0.pop}, ×${f(s0.sx)}, rest box = ${s0.rest}, ${f(s0.h, 1)} px tall) · box scrollTop ${st0} before the press, ${st1} after the film (never scrolled under the hold) · clipped by the spacer to ${f(s0.vis, 1)} px visible · ${sign ? `then ${sign > 0 ? "+" : "−"}${d} px (${dir})` : "no move (control)"}: rest top ${f(s0.top, 1)} → ${f(s1.top, 1)} (Δ ${f(moved, 1)}) · a node appended: over ${fr.length} frames the host's largest one-frame move ${f(worst.d, 1)} px at +${f(worst.t, 0)} ms (dy ${f(worst.dy, 1)}) (bound ≤ ${STEP})`);
    } finally { await P.close(); }
  }

  // ── page-scroll: the promoted control on its anchor while the window scrolls ──────────────────────────────────
  if (want("page-scroll")) {
    const P = await openPage(E, T, "restale");
    try {
      const { page } = P;
      await page.evaluate(() => { const t = document.createElement("div"); t.setAttribute("data-ce6", "tall"); t.style.height = "2000px"; document.body.append(t); });
      await page.waitForTimeout(200);
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
      const fr = await page.evaluate(([sel]) => new Promise((ok) => {
        const out = []; let n = 0;
        const tick = () => {
          const h = document.querySelector(sel); const fp = h.previousElementSibling?.classList.contains("engage-footprint") ? h.previousElementSibling : null;
          const hr = h.getBoundingClientRect(); const r = fp ? fp.getBoundingClientRect() : null;
          out.push({ sy: scrollY, eng: h.hasAttribute("data-engaged"), pop: h.matches(":popover-open"), fp: !!fp, dx: r ? hr.left + hr.width / 2 - (r.left + r.width / 2) : NaN, dy: r ? hr.top + hr.height / 2 - (r.top + r.height / 2) : NaN });
          if (n++ < 20) { window.scrollBy(0, 12); requestAnimationFrame(tick); } else ok(out);
        };
        requestAnimationFrame(tick);
      }), [A]);
      const worst = fr.reduce((m, x) => Math.max(m, Math.hypot(x.dx, x.dy)), 0);
      const driven = fr.every((x) => x.eng && x.fp) && fr.at(-1).sy > fr[0].sy;
      cell("page-scroll · keyboard", !driven ? "FAIL NOT DRIVEN" : worst <= 1 ? "PASS" : "FAIL",
        `engaged ${fr[0].eng}, top layer ${fr[0].pop}, footprint ${fr[0].fp} · scrollY ${fr[0].sy} → ${fr.at(-1).sy} over ${fr.length} frames · largest |host centre − footprint centre| in one frame ${f(worst, 2)} px (bound ≤ 1)`);
    } finally { await P.close(); }
  }

  // ── idle loop: what runs while engaged and idle, and after the release ───────────────────────────────────────
  if (want("idle-loop")) {
    const P = await openPage(E, T, "restale");
    try {
      const { page } = P;
      await page.evaluate(RAF_COUNT);
      let cdp = null;
      if (engine === "chromium") { cdp = await page.context().newCDPSession(page); await cdp.send("Performance.enable"); }
      const metrics = async () => { if (!cdp) return null; const m = (await cdp.send("Performance.getMetrics")).metrics; const g = (k) => m.find((x) => x.name === k)?.value ?? NaN; return { L: g("LayoutCount"), S: g("RecalcStyleCount") }; };
      const win = async (ms) => { const m0 = await metrics(); const r = await rafRate(page, ms); const m1 = await metrics(); return { r, L: m0 ? ((m1.L - m0.L) * 1000) / ms : NaN, S: m0 ? ((m1.S - m0.S) * 1000) / ms : NaN }; };
      await page.waitForTimeout(500);
      const w0 = await win(2000);
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(800);
      const eng1 = await page.evaluate(([s]) => document.querySelector(s).hasAttribute("data-engaged"), [A]);
      const w1 = await win(2000);
      await page.keyboard.press("Escape"); await page.waitForTimeout(1500);
      const eng2 = await page.evaluate(([s]) => document.querySelector(s).hasAttribute("data-engaged"), [A]);
      const w2 = await win(2000);
      const line = (w) => `${f(w.r, 1)} rAF/s${Number.isFinite(w.L) ? `, ${f(w.L, 1)} layouts/s, ${f(w.S, 1)} style recalcs/s` : ""}`;
      cell("idle loop · keyboard", !(eng1 && !eng2) ? "FAIL NOT DRIVEN" : w2.r <= w0.r + 2 ? "PASS" : "FAIL",
        `before any engagement: ${line(w0)} · engaged by Tab (${eng1}) and idle: ${line(w1)} · 1.5 s after Escape (engaged ${eng2}): ${line(w2)} (graded: after ≤ before + 2 rAF/s)`);
      if (cdp) await cdp.detach().catch(() => {});
    } finally { await P.close(); }
  }

  // ── ro-loop: errors under four moves while engaged ──────────────────────────────────────────────────────────
  if (want("ro-loop")) {
    const P = await openPage(E, T, "restale");
    try {
      const { page } = P;
      await page.evaluate(() => { window.__roErr = 0; window.addEventListener("error", (e) => { if (/ResizeObserver/.test(String(e.message))) window.__roErr++; }); });
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
      const eng = await page.evaluate(([s]) => document.querySelector(s).hasAttribute("data-engaged"), [A]);
      const w = () => page.evaluate(() => document.querySelector('[data-t="wrap"]'));
      await page.evaluate(() => { const w = document.querySelector('[data-t="wrap"]'); w.style.width = "300px"; w.style.marginLeft = "60px"; }); await page.waitForTimeout(120);
      await page.evaluate(() => { const w = document.querySelector('[data-t="wrap"]'); w.style.width = "240px"; w.style.marginLeft = "60px"; }); await page.waitForTimeout(120);
      await page.setViewportSize({ width: 520, height: 500 }); await page.waitForTimeout(120);
      await page.evaluate(() => { const w = document.querySelector('[data-t="wrap"]'); w.style.width = "360px"; w.style.marginLeft = "120px"; }); await page.waitForTimeout(400);
      await page.evaluate(() => window.__e.tick()); await page.waitForTimeout(300);
      const ro = await page.evaluate(() => window.__roErr);
      const errs = P.errors.slice();
      cell("ro-loop · keyboard", !eng ? "FAIL NOT DRIVEN" : errs.length === 0 && ro === 0 ? "PASS" : "FAIL",
        `engaged ${eng} · four moves 120 ms apart, a node appended · console/page errors ${errs.length}${errs.length ? ` (${errs.slice(0, 3).join(" | ")})` : ""} · window ResizeObserver error events ${ro}`);
      void w;
    } finally { await P.close(); }
  }

  // ── clip-overpaint: the promoted control against the card that clips its place ──────────────────────────────
  if (want("clip-overpaint")) for (const [theme, frac] of [["light", 0.7], ["dark", 0.7], ["light", 1.6]]) {
    const P = await openPage(E, T, "clipstale", { theme });
    try {
      const { page } = P;
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
      await page.evaluate(([sel, frac]) => {
        const h = document.querySelector(sel); const fp = h.previousElementSibling?.classList.contains("engage-footprint") ? h.previousElementSibling : null; const rest = fp ?? h;
        const b = document.querySelector('[data-t="box"]'); const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop;
        const r = rest.getBoundingClientRect(); b.scrollTop += r.top - (visTop - Math.round(r.height * frac));
      }, [A, frac]);
      await page.waitForTimeout(700);
      const s = await page.evaluate(read, [A]);
      const over = Math.max(0, Math.min(s.hostBot, s.visTop) - s.hostTop); const shown = await page.evaluate(([sel]) => { const h = document.querySelector(sel); const cs = getComputedStyle(h); return `visibility ${cs.visibility}, position-visibility ${cs.getPropertyValue("position-visibility") || "(unsupported)"}`; }, [A]);
      let shot = "";
      if (frames) { fs.mkdirSync(frames, { recursive: true }); shot = `${frames}/ce6-${label}-${engine}-${theme}-clip-overpaint-${Math.round(frac * 100)}.png`; await page.screenshot({ path: shot, clip: { x: 0, y: 0, width: 700, height: 300 } }); }
      cell(`clip-overpaint · keyboard · ${theme} · ${Math.round(frac * 100)} % hidden`, s.eng ? "REPORT" : "FAIL NOT DRIVEN",
        `engaged ${s.eng}, top layer ${s.pop}, rest box = ${s.rest} (${f(s.vis, 1)} of ${f(s.h, 1)} px visible in the card) · the host paints ${f(s.hostTop, 1)} → ${f(s.hostBot, 1)} px against the card's visible top ${f(s.visTop, 1)}: ${f(over, 1)} px of the control painted outside the card (${shown})${shot ? ` · frame ${shot.split("/engagement/")[1] ?? shot}` : ""}`);
    } finally { await P.close(); }
  }

  // ── clip-vanish: the promoted control as its footprint scrolls out of the card, 1 px per step ───────────────
  // (CK-20, a new instance). Per step: the box scrolled so `hid` px of the 20 px rest box are past the card's top
  // edge, 2 frames, then ONE shot of the strip above the card (not a film). The strip's pixels that differ by ≥ 16
  // levels of luma from the same strip with the control at rest (Escape: not engaged, so the card clips it) are
  // the control painted outside its card. Graded: between adjacent 1-px steps the painted-outside area may change by
  // at most 3 rows of the control's width (a 1 px scroll moves ≤ 1 px of the control); a larger drop is the control
  // leaving the paint in one step
  if (want("clip-vanish")) {
    const P = await openPage(E, T, "clipstale");
    try {
      const { page } = P;
      const { PNG } = (await import("module")).createRequire("/Users/mkbabb/Programming/glass-ui/package.json")("pngjs");
      const lum = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return o; };
      await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600);
      const setHid = (hid) => page.evaluate(([sel, hid]) => {
        const h = document.querySelector(sel); const fp = h.previousElementSibling?.classList.contains("engage-footprint") ? h.previousElementSibling : null; const rest = fp ?? h;
        const b = document.querySelector('[data-t="box"]'); const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop;
        const r = rest.getBoundingClientRect(); b.scrollTop += r.top - (visTop - hid);
        return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => ok({ visTop, l: br.left + b.clientLeft, w: b.clientWidth, eng: h.hasAttribute("data-engaged"), hw: h.offsetWidth }))));
      }, [A, hid]);
      const g0 = await setHid(14);
      const clip = { x: Math.floor(g0.l), y: Math.max(0, Math.floor(g0.visTop) - 26), width: Math.floor(g0.w), height: 24 };
      const HIDS = [14, 15, 16, 17, 18, 19, 20, 21, 22];
      const engShots = []; let engAll = true;
      for (const hid of HIDS) { const g = await setHid(hid); engAll = engAll && g.eng; await page.waitForTimeout(60); engShots.push(lum(await page.screenshot({ clip }))); }
      await page.keyboard.press("Escape"); await page.waitForTimeout(700);
      const restShots = [];
      for (const hid of HIDS) { await setHid(hid); await page.waitForTimeout(60); restShots.push(lum(await page.screenshot({ clip }))); }
      const area = engShots.map((e, k) => { let n = 0; const r = restShots[k]; for (let i = 0; i < e.length; i++) if (Math.abs(e[i] - r[i]) >= 16) n++; return n; });
      const drops = area.slice(1).map((v, k) => area[k] - v);
      const worst = Math.max(...drops.map(Math.abs)); const bound = 3 * g0.hw;
      cell("clip-vanish · keyboard", !engAll ? "FAIL NOT DRIVEN" : worst <= bound ? "PASS" : "FAIL",
        `engaged throughout ${engAll} · px of the control painted above the card per 1-px step of the rest box past the card's top edge (hidden ${HIDS.join("/")} of 20 px): ${area.join(" / ")} · largest change between adjacent steps ${worst} px² (bound ≤ 3 rows × ${g0.hw} px = ${bound})`);
    } finally { await P.close(); }
  }

  // ── select-press: what the E-12 `capsule select press fine` cell sees (REPORT, the cause of that cell's read) ──
  // A fine mouse down on the SelectTrigger, held; the trigger's effective scale every frame for 600 ms (no shot),
  // and whether the select opened. A pop (crest above ×1.002 before the dip) is the commit's geometry, not a press
  if (want("select-press")) for (const theme of ["light", "dark"]) {
    const P = await openPage(E, T, "capsule", { theme });
    try {
      const { page } = P;
      const S = '[data-t="cap-select"] [data-slot="select-trigger"]';
      await page.waitForTimeout(250); await page.mouse.move(2, 2); await page.waitForTimeout(200);
      const p = await page.evaluate((s) => { const e = document.querySelector(s); e.scrollIntoView({ block: "center" }); const r = e.getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2 }; }, S);
      await page.waitForTimeout(100); await page.mouse.move(p.x, p.y); await page.waitForTimeout(400);
      const pr = page.evaluate((s) => new Promise((ok) => { const fr = []; const t0 = performance.now(); const tick = () => { const e = document.querySelector(s); fr.push({ t: performance.now() - t0, s: window.__eff(e).s, open: e.getAttribute("data-state") ?? e.getAttribute("aria-expanded") }); if (performance.now() - t0 < 600) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); }), S);
      await page.waitForTimeout(30); await page.mouse.down();
      const fr = await pr; await page.mouse.up();
      const pre = fr.filter((x) => x.t < 30); const post = fr.filter((x) => x.t >= 30);
      const mx = post.reduce((m, x) => (x.s > m.s ? x : m), { s: -Infinity, t: 0 }); const mn = post.reduce((m, x) => (x.s < m.s ? x : m), { s: Infinity, t: 0 });
      const at250 = post.reduce((m, x) => (Math.abs(x.t - 280) < Math.abs(m.t - 280) ? x : m), post[0]);
      cell(`select-press fine · ${theme}`, "REPORT", `state before ${pre.at(-1)?.open} → after ${post.at(-1)?.open} · scale crest ×${f(mx.s, 4)} at +${f(mx.t - 30, 0)} ms, trough ×${f(mn.s, 4)} at +${f(mn.t - 30, 0)} ms, ×${f(at250.s, 4)} at +${f(at250.t - 30, 0)} ms after the press · ${mx.s > 1.002 && mx.t < mn.t ? "a pop then its rebound: the commit (open) on pointerdown, not a press rung" : "no crest before the dip"}`);
    } finally { await P.close(); }
  }
} finally {
  await E.close();
  T.close();
}
const fails = out.filter((l) => /^\s+FAIL/.test(l)).length;
const passes = out.filter((l) => /^\s+PASS/.test(l)).length;
console.log(`ce6-probe ${label} ${engine} · ${passes} pass, ${fails} fail, ${out.length - passes - fails} other · load ${load()} at end`);
process.exit(fails ? 1 : 0);
