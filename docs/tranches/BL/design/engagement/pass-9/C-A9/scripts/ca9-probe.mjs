#!/usr/bin/env node
// C-A9 adversarial probe (D5 pass 9, the fresh critic of HEAD + pass-9/P-E9.patch). Not a witness: each cell is scored in
// C-A9.md against the CK row it would break, or placed as a next-pass class. On the harness's own scene app (`slider`,
// `slider2`), through the harness's lib: one browser per run, a fresh context per cell, every page and context closed in a
// finally, the browser closed by witness(); WebKit retires its browser every NAV_CAP navigations (tile H3-1).
//   node ca9-probe.mjs --build <out>/builds/<label> [--engine webkit] [--out <dir>] [--frames <dir>] [--label l]
//        [--only stack,loop,idle,flip,zoom]
// Cells:
//   stack <mode>   §P8-8.3 "the stacking difference in a frame": in `slider` a later positioned sibling of the host (an
//        absolutely positioned 44×10 px red bar, pointer-events none) laid across the thumb. Red fraction of the bar's box at
//        rest and engaged (keyboard: Tab; fine: a mouse hold on the thumb). In place the bar stays over the body (red kept);
//        a promoted body paints over it. REPORT (no row asks for either); stills saved.
//   loop <release> O-103f (3): rAF and ResizeObserver callbacks counted page-wide (both constructors wrapped by an init
//        script before any page script), per window: rest 1 s; engaged 600..2600 ms; after the release 0-150, 150-450,
//        450-1500, 1500-3000 ms. Releases: keyboard·escape, keyboard·tabout, keyboard·clickaway, fine·mouseup,
//        handoff (slider2: Tab A, 1 s, Tab B, 1 s, Tab out). Bound (P-E9's own, O-103f (3)): engaged > 30/s, every window
//        from the release on ≤ 2/s. Chromium also prints LayoutCount/RecalcStyleCount over the engaged window (CDP).
//   idle           O-103f (1) re-measured by a non-builder: keyboard-engaged idle, 2 s on-screen: rAF/s, RO/s, and in
//        Chromium layouts/s and recalcs/s. REPORT against the bar (pass 8's candidate: 120.3 + 120.3 per s Chromium, 0 layouts,
//        0 recalcs; WebKit 98.0-98.3), read on the probe build in the same run.
//   flip <place>   CK-25/CK-20, a path no cell drives: a fine hold (the loupe shown, 1300 ms), then the page scrolled 3 px a
//        frame for 90 frames (a programmatic scroll, the slider 230 px below the viewport's top at the start), the
//        slider's wrapper under `scale: 0.8` (origin 0 0) or nothing. Per frame, read in a ResizeObserver created after the
//        stage's (so after its lens write): the lens's and the track's painted boxes and the lens's side. Printed: the gap
//        (lens edge to the track's near edge, ≤ 2 px is flush) on every frame, its worst, and the gap on the flip frame; the
//        lens's largest one-frame move relative to its track, and the flip frame's. REPORT.
//   zoom <kind>    CK-25 "the loupe carries its track's painted transform", off H9's cells: the slider's wrapper under
//        `zoom: 0.8`, `scale: 0.8` (origin 0 0; H9's cell, the control) or nothing; a fine hold 1300 ms: k = the clone's
//        painted height over the held track's painted height (E-13's k), the lens's bottom to the track's painted top, its
//        centre to the track's centre. Bound as E-13: k within ±5 % of --loupe-k-max, both offsets ≤ 2 px.
import fs from "node:fs";
import path from "node:path";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, center, f, INIT, tabKey, load } = await import(`${H}/lib.mjs`);
const { PNG } = (await import(`/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js`)).default;

const COUNTER = () => {
  window.__cnt = { raf: 0, ro: 0 };
  const R = window.requestAnimationFrame.bind(window);
  window.requestAnimationFrame = (cb) => R((t) => { window.__cnt.raf++; cb(t); });
  const RO = window.ResizeObserver;
  window.ResizeObserver = class extends RO { constructor(cb) { super((e, o) => { window.__cnt.ro++; cb(e, o); }); } };
};

await witness("C-A9 probe", "C-A9's adversarial cells (stacking frame, loop at release, idle re-measure, lens flip, lens under zoom)", async ({ a, E, T, cell, guard, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const want = (k) => !only || only.has(k);
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const label = typeof a.label === "string" ? a.label : "ca9";
  const save = (name, buf) => { if (frames) fs.writeFileSync(path.join(frames, `${label}-${engine}-${name}.png`), buf); };
  const open = async (scene, o = {}) => {
    const b = await E.nav();
    const ctx = await b.newContext({ viewport: o.vp ?? { width: 700, height: 500 }, deviceScaleFactor: 1, colorScheme: o.theme === "dark" ? "dark" : "light", reducedMotion: "no-preference" });
    const page = await ctx.newPage();
    await page.addInitScript(INIT);
    if (o.count) await page.addInitScript(COUNTER);
    await page.goto(`${T.url}?${new URLSearchParams({ scene, theme: o.theme ?? "light" })}`);
    await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
    return { page, ctx, close: () => Promise.race([ctx.close().catch(() => {}), new Promise((r) => setTimeout(r, 5000))]) };
  };
  const ROOT = ".glass-slider", THUMB = '[role="slider"]';
  const engaged = (page, sel = ROOT) => page.evaluate((s) => { const h = document.querySelector(s); return { eng: !!h && h.matches("[data-engaged]"), promoted: !!h && h.matches(":popover-open") }; }, sel);
  const kbd = async (page) => { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); };
  const redFrac = (buf) => { const p = PNG.sync.read(buf); let n = 0, r = 0; for (let i = 0; i < p.data.length; i += 4) { n++; if (p.data[i] > 170 && p.data[i + 1] < 110 && p.data[i + 2] < 110) r++; } return r / n; };

  // ── stack ──
  if (want("stack")) for (const mode of ["keyboard", "fine"]) {
    const name = `C-A9 stack · ${mode}`;
    const r = await guard(name, async () => {
      const P = await open("slider");
      try {
        const { page } = P;
        const bar = await page.evaluate(([root, thumb]) => {
          const h = document.querySelector(root), t = h.querySelector(thumb), par = h.parentElement; par.style.position = "relative";
          const pr = par.getBoundingClientRect(), tr = t.getBoundingClientRect();
          const s = document.createElement("div"); s.setAttribute("data-t", "ca9-bar");
          s.style.cssText = `position:absolute;left:${tr.left + tr.width / 2 - 22 - pr.left}px;top:${tr.top + tr.height / 2 - 5 - pr.top}px;width:44px;height:10px;background:rgb(225,30,30);pointer-events:none`;
          par.appendChild(s); const b = s.getBoundingClientRect(); return { x: b.left, y: b.top, width: b.width, height: b.height, hx: h.getBoundingClientRect() };
        }, [ROOT, THUMB]);
        await page.waitForTimeout(200);
        const clip = { x: Math.floor(bar.x), y: Math.floor(bar.y), width: Math.round(bar.width), height: Math.round(bar.height) };
        const wide = { x: Math.max(0, Math.floor(bar.hx.left) - 20), y: Math.max(0, Math.floor(bar.hx.top) - 30), width: Math.round(bar.hx.width) + 40, height: Math.round(bar.hx.height) + 60 };
        const rest = redFrac(await page.screenshot({ clip })); save(`stack-${mode}-rest`, await page.screenshot({ clip: wide }));
        let st, eng;
        if (mode === "keyboard") { await kbd(page); st = await engaged(page); eng = redFrac(await page.screenshot({ clip })); save(`stack-${mode}-engaged`, await page.screenshot({ clip: wide })); }
        else { const c = await center(page, `${ROOT} ${THUMB}`); await page.mouse.move(c.x, c.y); await page.mouse.down(); try { await page.waitForTimeout(1300); st = await engaged(page); eng = redFrac(await page.screenshot({ clip })); save(`stack-${mode}-engaged`, await page.screenshot({ clip: wide })); } finally { await page.mouse.up(); } }
        return { rest, eng, st };
      } finally { await P.close(); }
    });
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    cell(name, r.st.eng ? "REPORT" : "UNMEASURED", `${r.st.eng ? "" : "NOT DRIVEN (not engaged) · "}a later positioned sibling (red bar) across the thumb · red fraction of the bar's box: rest ${f(r.rest)}, engaged ${f(r.eng)} (engaged ${r.st.eng}, promoted ${r.st.promoted}) · ${r.eng >= r.rest - 0.05 ? "the sibling stays OVER the engaged control (in place: its own stacking context, DOM order)" : "the engaged control paints OVER the later sibling"}`);
  }

  // ── loop (O-103f (3)) and idle (O-103f (1)) ──
  const counts = async (page) => page.evaluate(() => ({ ...window.__cnt, t: performance.now() }));
  const rate = (a0, a1) => ({ raf: ((a1.raf - a0.raf) * 1000) / (a1.t - a0.t), ro: ((a1.ro - a0.ro) * 1000) / (a1.t - a0.t), ms: a1.t - a0.t });
  const metrics = async (cdp) => { if (!cdp) return null; const m = (await cdp.send("Performance.getMetrics")).metrics; const g = (k) => m.find((x) => x.name === k)?.value ?? NaN; return { lay: g("LayoutCount"), rec: g("RecalcStyleCount"), t: Date.now() }; };
  const win = async (page, ms) => { const a0 = await counts(page); await page.waitForTimeout(ms); return rate(a0, await counts(page)); };
  if (want("loop")) for (const rel of ["keyboard·escape", "keyboard·tabout", "keyboard·clickaway", "fine·mouseup", "handoff·tabout"]) {
    const name = `C-A9 loop · ${rel} · stops at release`;
    const r = await guard(name, async () => {
      const P = await open(rel.startsWith("handoff") ? "slider2" : "slider", { count: true });
      try {
        const { page } = P; const cdp = engine === "chromium" ? await P.ctx.newCDPSession(page) : null; if (cdp) await cdp.send("Performance.enable");
        const rest = await win(page, 1000);
        let st0;
        if (rel.startsWith("keyboard")) { await kbd(page); }
        else if (rel.startsWith("handoff")) { await kbd(page); await page.waitForTimeout(400); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); }
        else { const c = await center(page, `${ROOT} ${THUMB}`); await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(600); }
        st0 = await page.evaluate(() => document.querySelectorAll("[data-engaged]").length);
        const m0 = await metrics(cdp); const eng = await win(page, 2000); const m1 = await metrics(cdp);
        if (rel.endsWith("escape")) await page.keyboard.press("Escape");
        else if (rel.endsWith("tabout")) { await page.focus('[data-sentinel="after"]'); }
        else if (rel.endsWith("clickaway")) await page.mouse.click(660, 470);
        else await page.mouse.up();
        const st1 = await page.evaluate(() => document.querySelectorAll("[data-engaged]").length);
        const after = [await win(page, 150), await win(page, 300), await win(page, 1050), await win(page, 1500)];
        const st2 = await page.evaluate(() => document.querySelectorAll("[data-engaged], [data-engage-stage]").length);
        return { rest, eng, after, st0, st1, st2, lay: m0 && m1 ? ((m1.lay - m0.lay) * 1000) / (m1.t - m0.t) : null, rec: m0 && m1 ? ((m1.rec - m0.rec) * 1000) / (m1.t - m0.t) : null };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const tot = (x) => x.raf + x.ro;
    const undriven = !(r.st0 >= 1);
    const bad = r.after.filter((x) => tot(x) > 2).length;
    const ok = !undriven && tot(r.eng) > 30 && bad === 0;
    const w = (x) => `${f(x.raf, 1)}+${f(x.ro, 1)}`;
    cell(name, undriven ? "UNMEASURED" : ok ? "PASS" : "FAIL", `${undriven ? "NOT DRIVEN (nothing engaged) · " : ""}rAF+RO per s: rest ${w(r.rest)} · engaged ${w(r.eng)}${r.lay != null ? ` (layouts ${f(r.lay, 1)}/s, recalcs ${f(r.rec, 1)}/s)` : ""} · after release 0-150 ms ${w(r.after[0])}, 150-450 ${w(r.after[1])}, 450-1500 ${w(r.after[2])}, 1.5-3 s ${w(r.after[3])} · engaged nodes before/at/after release ${r.st0}/${r.st1}/${r.st2} (st2 counts data-engage-stage too) · bound engaged > 30/s, every window from the release on ≤ 2/s: ${bad} over`);
  }
  if (want("idle")) {
    const name = "C-A9 idle · keyboard-engaged, on-screen 2 s";
    const r = await guard(name, async () => {
      const P = await open("slider", { count: true });
      try {
        const { page } = P; const cdp = engine === "chromium" ? await P.ctx.newCDPSession(page) : null; if (cdp) await cdp.send("Performance.enable");
        const m0r = await metrics(cdp); const rest = await win(page, 2000); const m1r = await metrics(cdp);
        await kbd(page); const st = await engaged(page);
        const m0 = await metrics(cdp); const eng = await win(page, 2000); const m1 = await metrics(cdp);
        const per = (a0, a1, k) => (a0 && a1 ? ((a1[k] - a0[k]) * 1000) / (a1.t - a0.t) : null);
        return { rest, eng, st, lay: per(m0, m1, "lay"), rec: per(m0, m1, "rec"), layR: per(m0r, m1r, "lay"), recR: per(m0r, m1r, "rec") };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) cell(name, "FAIL", r.line);
    else cell(name, r.st.eng ? "REPORT" : "UNMEASURED", `${r.st.eng ? "" : "NOT DRIVEN · "}rest rAF ${f(r.rest.raf, 1)}/s RO ${f(r.rest.ro, 1)}/s${r.layR != null ? ` layouts ${f(r.layR, 1)}/s recalcs ${f(r.recR, 1)}/s` : ""} · engaged idle rAF ${f(r.eng.raf, 1)}/s RO ${f(r.eng.ro, 1)}/s${r.lay != null ? ` layouts ${f(r.lay, 1)}/s recalcs ${f(r.rec, 1)}/s` : " (no layout counter)"} · promoted ${r.st.promoted}`);
  }

  // ── flip: the lens crossing to the track's underside during a live scroll ──
  const lensRead = `(() => { const L = document.querySelector("[data-engage-lens]"), T = document.querySelector("[data-engage-lens-subject]") ?? document.querySelector(".slider-track"); if (!L || !T) return null; const l = L.getBoundingClientRect(), t = T.getBoundingClientRect(), c = L.querySelector(".glass-loupe-clone")?.getBoundingClientRect(); return { below: L.hasAttribute("data-engage-lens-below"), lt: l.top, lb: l.bottom, lcx: l.left + l.width / 2, tt: t.top, tb: t.bottom, tcx: t.left + t.width / 2, th: t.height, ch: c ? c.height : NaN, op: +getComputedStyle(L).opacity, k: parseFloat(getComputedStyle(L).getPropertyValue("--loupe-k-max")) }; })()`;
  if (want("flip")) for (const place of ["none", "scale"]) {
    const name = `C-A9 flip · ${place} · fine`;
    const r = await guard(name, async () => {
      const P = await open("slider");
      try {
        const { page } = P;
        await page.evaluate(([root, place]) => { const m = document.querySelector("main") ?? document.body; m.style.paddingTop = "230px"; m.style.paddingBottom = "1600px"; if (place === "scale") Object.assign(document.querySelector(root).parentElement.style, { scale: "0.8", transformOrigin: "0 0" }); }, [ROOT, place]);
        await page.waitForTimeout(250);
        const c = await center(page, `${ROOT} ${THUMB}`); await page.mouse.move(c.x, c.y); await page.mouse.down();
        try {
          await page.waitForTimeout(1300);
          const before = await page.evaluate(lensRead);
          const film = await page.evaluate((src) => new Promise((ok) => {
            const out = []; let n = 0; const dummy = document.createElement("div"); dummy.style.cssText = "position:fixed;left:0;top:0;width:1px;height:1px"; document.body.appendChild(dummy);
            const ro = new ResizeObserver(() => { out.push({ n, y: scrollY, ...eval(src) }); });
            const tick = () => { ro.unobserve(dummy); ro.observe(dummy); if (n++ < 90) { scrollBy(0, 3); requestAnimationFrame(tick); } else { requestAnimationFrame(() => { ro.disconnect(); dummy.remove(); ok(out); }); } };
            requestAnimationFrame(tick);
          }), lensRead);
          return { before, film: film.filter((x) => x && x.lt != null) };
        } finally { await page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const fl = r.film; if (!fl.length || !r.before) { cell(name, "UNMEASURED", `NOT DRIVEN (no lens: before ${JSON.stringify(r.before)}, ${fl.length} frames)`); continue; }
    const gap = (x) => (x.below ? x.lt - x.tb : x.tb - x.tb + (x.tt - x.lb));
    const rel = (x) => x.lt - x.tt;
    let worstGap = 0, worstMove = 0, flipAt = -1, flipMove = 0, worstMoveNoFlip = 0;
    fl.forEach((x, i) => { if (Math.abs(gap(x)) > Math.abs(worstGap)) worstGap = gap(x); if (i) { const d = rel(x) - rel(fl[i - 1]); if (Math.abs(d) > Math.abs(worstMove)) worstMove = d; if (x.below !== fl[i - 1].below) { flipAt = i; flipMove = d; } else if (Math.abs(d) > Math.abs(worstMoveNoFlip)) worstMoveNoFlip = d; } });
    const gaps = fl.map((x) => +gap(x).toFixed(1));
    const flipGap = flipAt >= 0 ? `${f(gap(fl[flipAt]), 1)} px (next frame ${fl[flipAt + 1] ? f(gap(fl[flipAt + 1]), 1) : "—"} px)` : "no flip";
    cell(name, "REPORT", `a fine hold, the loupe shown (opacity ${f(r.before.op, 2)}, k ${f(r.before.ch / r.before.th, 3)} of ${r.before.k}), then the page scrolled 3 px per frame for ${fl.length} read frames${place === "scale" ? ", the wrapper under scale 0.8" : ""} · flip at frame ${flipAt} (track top ${flipAt >= 0 ? f(fl[flipAt].tt, 1) : "—"} px): the lens moves ${f(flipMove, 1)} px against its track in that one frame; gap there ${flipGap} · worst gap any frame ${f(worstGap, 1)} px; worst one-frame lens move against its track outside the flip ${f(worstMoveNoFlip, 1)} px · gaps per frame [${gaps.join(" ")}]`);
  }

  // ── flipstill: the two sides of the flip as painted (stills; the flip's frame count is the `flip` cell's) ──
  if (want("flipstill")) {
    const name = "C-A9 flipstill · none · fine";
    const r = await guard(name, async () => {
      const P = await open("slider");
      try {
        const { page } = P;
        await page.evaluate(() => { const m = document.querySelector("main") ?? document.body; m.style.paddingTop = "230px"; m.style.paddingBottom = "1600px"; });
        await page.waitForTimeout(250);
        const c = await center(page, `${ROOT} ${THUMB}`); await page.mouse.move(c.x, c.y); await page.mouse.down();
        const out = [];
        try {
          await page.waitForTimeout(1300);
          for (const top of [140, 84, 78, 40]) {
            await page.evaluate((top) => { const t = document.querySelector(".slider-track").getBoundingClientRect(); scrollBy(0, t.top - top); }, top);
            await page.waitForTimeout(120);
            const x = await page.evaluate(lensRead);
            save(`flipstill-track-at-${top}`, await page.screenshot({ clip: { x: 0, y: 0, width: 700, height: 260 } }));
            out.push({ top, below: x?.below, gap: x ? (x.below ? x.lt - x.tb : x.tt - x.lb) : NaN, lt: x?.lt });
          }
        } finally { await page.mouse.up(); }
        return { out };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) cell(name, "FAIL", r.line);
    else cell(name, "REPORT", `stills with the track's top at ${r.out.map((x) => `${x.top} px: lens ${x.below ? "below" : "above"}, top ${f(x.lt, 1)} px, gap ${f(x.gap, 1)} px`).join(" · ")}`);
  }

  // ── zoom: the lens over a zoomed card ──
  if (want("zoom")) for (const kind of ["none", "scale", "zoom"]) {
    const name = `C-A9 zoom · ${kind} · fine`;
    const r = await guard(name, async () => {
      const P = await open("slider");
      try {
        const { page } = P;
        await page.evaluate(([root, kind]) => { const m = document.querySelector("main") ?? document.body; m.style.paddingTop = "160px"; const w = document.querySelector(root).parentElement; if (kind === "scale") Object.assign(w.style, { scale: "0.8", transformOrigin: "0 0" }); if (kind === "zoom") w.style.zoom = "0.8"; }, [ROOT, kind]);
        await page.waitForTimeout(250);
        const c = await center(page, `${ROOT} ${THUMB}`); await page.mouse.move(c.x, c.y); await page.mouse.down();
        try {
          await page.waitForTimeout(1300);
          const x = await page.evaluate(lensRead);
          const tr = await page.evaluate(() => { const t = document.querySelector(".slider-track").getBoundingClientRect(); return t; });
          const shot = await page.screenshot({ clip: { x: Math.max(0, Math.floor(tr.left) - 20), y: Math.max(0, Math.floor(tr.top) - 110), width: Math.round(tr.width) + 40, height: 150 } }); save(`zoom-${kind}-held`, shot);
          return { x };
        } finally { await page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const x = r.x; if (!x) { cell(name, "UNMEASURED", "NOT DRIVEN (no lens)"); continue; }
    const k = x.ch / x.th, dB = x.below ? x.lt - x.tb : x.tt - x.lb, dC = x.lcx - x.tcx;
    const ok = Math.abs(k / x.k - 1) <= 0.05 && Math.abs(dB) <= 2 && Math.abs(dC) <= 2 && x.op > 0.9;
    cell(name, ok ? "PASS" : "FAIL", `the wrapper under ${kind === "none" ? "nothing" : kind === "scale" ? "scale 0.8 (H9's cell, the control)" : "zoom 0.8"} · k = clone ${f(x.ch, 2)} / held track ${f(x.th, 2)} = ×${f(k, 3)} (k max ${x.k}, ±5 %) · lens edge to the track's near edge ${f(dB, 1)} px · centre offset ${f(dC, 1)} px · below ${x.below} · opacity ${f(x.op, 2)}`);
  }
});
