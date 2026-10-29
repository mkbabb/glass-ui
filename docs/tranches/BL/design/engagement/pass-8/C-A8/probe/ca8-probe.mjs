#!/usr/bin/env node
// C-A8 adversarial probe (D5 pass 8, the fresh critic of the candidate HEAD + pass-8/P-E8.patch). Not a witness: each cell
// is scored in C-A8.md against the CK row it would break, or recorded as a next-pass class. App: the harness's own scene app
// (`clipstale`, `button`, `chip`), except `dlg`, which needs a Slider inside the library's Dialog and runs on C-A8's probe
// fork of that app (probe/App-dlg.vue: one Slider added to the `presented` Dialog). Through the harness's lib: one browser
// per run, a fresh context per cell, every page and context closed in a finally, the browser closed by witness(); WebKit
// retires its browser every NAV_CAP navigations (tile H3-1). Films take no screenshot.
//   node ca8-probe.mjs --build <out>/builds/<label> [--engine webkit] [--out <dir>] [--frames <dir>] [--label l]
//        [--only trail,ancestor,dlg,glidescale,feather,crest]
// Cells (THE INVARIANT, REGISTRY §P7-8.1: "an engaged control's body paints exactly what its place would paint (every clip,
// mask, radius and transform of its ancestors) in the same frame its place moves"):
//   trail <drive>   CK-20, P-E8 §8 gap 3: keyboard-engaged in `clipstale` (dark), a marker (10×8 px, white) set in the
//        scroller's content beside the control before the engagement; the scroller or the page scrolled by 20 wheel ticks of
//        3 px, 16 ms apart, with the pointer (on) over the control, (away) over the scroller's content left of the control,
//        (page) over the page outside the scroller (the page made 1600 px taller first). Recorded video 1:1; per frame the
//        vertical centroid of the thumb's ink and of the marker's, each against the film's first kept frame: trail = Δthumb −
//        Δmarker (px). Three engaged and three released films per drive. Bound: no engaged frame's |trail| over the released
//        films' largest + 1 px.
//   ancestor <kind> CK-20 (ancestor kinds P-E8 §8 gap 2 names uncarried): the scroller given `opacity: 0.5` (the Dialog's
//        own fade writes opacity on its plate), `clip-path: inset(0 50% 0 0)`, `rotate: 4deg`, or nothing (the control).
//        The control 50 px inside the scroller; visibility over the scroller's box (Σ|luma − the box with the control
//        scrolled away|), keyboard-engaged over released (Escape, focus kept), divided by the same ratio with nothing set.
//        Bound 0.90..1.10 (the in-place body reads 1; H8's fixture scatter is 0.99-1.00).
//   dlg <drive>     CK-20 on the library's Dialog: a Slider inside the presented Dialog, keyboard-engaged (Tab from the
//        Dialog's button), then the Dialog dismissed: (esc2) Escape, 40 ms, Escape; (scrim) a click outside the plate. A
//        film per frame of the plate's computed opacity and the slider host's state (promoted, engaged, connected). While
//        the host is promoted it paints at opacity 1 whatever the plate paints; in place it paints the plate's. Mismatch =
//        1 − plate opacity on promoted frames; the leave step = the effective opacity's change in the frame the host leaves
//        the top layer (1 → the plate's) or is removed while promoted (1 → 0). Bound: mismatch ≤ 0.10 and step ≤ 0.10. One
//        still per drive (separate page) 150 ms after the dismissal.
//   glidescale <s>  CK-20 (the re-render glide): keyboard-engaged in `clipstale`, the scroller under `scale: 0.8` (origin 0 0)
//        or not (the control); a 40 px block inserted before the control's row inside the scroller (a childList mutation:
//        the stage's re-render glide). rAF film: the jump = the root's painted centre in the first frame after the insertion
//        against the frame before (the glide must start from the place last painted). Bound ≤ 1 px.
//   feather <ring>  CK-20, P-E8 §0 item 3 (WebKit keyboard ×0.58): H8's feather cell (the library's .fading-scroll on the
//        scroller, the control 4 px inside the feathered top edge; visibility in the top 28 px engaged over released,
//        feathered over unfeathered), keyboard only, with the focus ring kept (ring) or suppressed by a style write on the
//        slider's descendants (noring). Two-sided reading: 0.90..1.10.
//   crest <scene>   CK-12: the committed crest in paint: the button (element.click(), a stateless command: crest
//        `--scale-engage`) and the selectable chip (`__e.commit()`: crest `--scale-commit-pop`); the face's peak scale over
//        700 ms against its crest token's computed value. Bound |peak − crest| ≤ 0.004; a face that never moves is UNMEASURED.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, center, f, GLASS, INIT, tabKey } = await import(`${H}/lib.mjs`);
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const BOX = '[data-t="box"]', REST = '[data-t="slider-a"]', ROOT = '[data-t="slider-a"] .glass-slider', THUMB = '[data-t="slider-a"] [role="slider"]';
const NOM = 1000 / 60;

await witness("C-A8 probe", "C-A8's adversarial cells (CK-20's invariant off H8's cells; CK-12's crest in paint)", async ({ a, E, T, cell, guard, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const want = (k) => !only || only.has(k);
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const label = typeof a.label === "string" ? a.label : "ca8";
  const stateOf = (page, root = ROOT) => page.evaluate((r) => { const h = document.querySelector(r); return { eng: !!h && h.matches("[data-engaged]"), promoted: !!h && h.matches(":popover-open") }; }, root);
  // the rest box `hid` px past the scroller's painted top edge (negative: inside), two frames (H8's setHid, read-only copy)
  const setHid = (page, hid) => page.evaluate(([boxSel, restSel, hid]) => {
    const b = document.querySelector(boxSel), q = document.querySelector(restSel);
    const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect();
    b.scrollTop += (rr.top - (br.top + b.clientTop * k - hid)) / k;
    return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => { const b2 = b.getBoundingClientRect(); ok({ bl: b2.left, bt: b2.top, br: b2.right, bb: b2.bottom, st: b.scrollTop }); })));
  }, [BOX, REST, hid]);
  const kbd = async (page) => { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); };
  const vis = (x, e) => { let s = 0; for (let i = 0; i < x.o.length; i++) s += Math.abs(x.o[i] - e.o[i]); return s; };
  const save = (name, buf) => { if (frames) fs.writeFileSync(path.join(frames, `${label}-${engine}-${name}.png`), buf); };

  // ── trail ──
  if (want("trail")) for (const [drive, tick, nt] of [["on", 3, 14], ["away", 3, 14], ["page", 3, 14], ["away", 8, 6]]) {
    const name = `C-A8 trail · ${drive} · ${tick} px`;
    const r = await guard(name, async () => {
      const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "ca8trail-"));
      try {
        const runs = [];
        for (const mode of ["engaged", "released", "engaged", "released", "engaged", "released"]) {
          const b = await E.nav();
          const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1, colorScheme: "dark", reducedMotion: "no-preference", recordVideo: { dir: vdir, size: { width: 700, height: 500 } } });
          let page, x = null, t0 = 0;
          try {
            page = await ctx.newPage(); t0 = Date.now();
            await page.addInitScript(INIT);
            await page.goto(`${T.url}?${new URLSearchParams({ scene: "clipstale", theme: "dark" })}`);
            await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
            // the marker, in the scroller's content beside the control; the page made scrollable for `page`
            await page.evaluate(([rest, tall]) => { const q = document.querySelector(rest); q.style.position = "relative"; const m = document.createElement("div"); m.setAttribute("data-t", "ca8-marker"); m.style.cssText = "position:absolute;left:4px;top:50%;width:10px;height:8px;margin-top:-4px;background:#fff"; q.prepend(m); if (tall) document.querySelector("main").style.paddingBottom = "1600px"; }, [REST, drive === "page"]);
            await page.waitForTimeout(150);
            if (mode === "engaged") await kbd(page);
            const g = await setHid(page, -70); await page.waitForTimeout(400);
            const geo = await page.evaluate(([thumb, root]) => { const t = document.querySelector(thumb).getBoundingClientRect(), m = document.querySelector('[data-t="ca8-marker"]').getBoundingClientRect(), h = document.querySelector(root).getBoundingClientRect(); return { tx: t.left + t.width / 2, ty: t.top + t.height / 2, tw: t.width, mx: m.left + m.width / 2, my: m.top + m.height / 2, hl: h.left, hr: h.right, hy: h.top + h.height / 2 }; }, [THUMB, ROOT]);
            const st0 = await stateOf(page);
            const lead = Math.max(0, Date.now() - t0 - 250);
            const px = drive === "on" ? { x: geo.hl + (geo.hr - geo.hl) * 0.8, y: geo.hy } : drive === "away" ? { x: g.bl + 6, y: Math.min(g.bb - 6, geo.hy + 30) } : { x: 620, y: 420 };
            await page.mouse.move(px.x, px.y);
            const sy0 = await page.evaluate((b) => [document.querySelector(b).scrollTop, scrollY], BOX);
            for (let k = 0; k < nt; k++) { await page.mouse.wheel(0, tick); await page.waitForTimeout(16); }
            await page.waitForTimeout(700);
            const sy1 = await page.evaluate((b) => [document.querySelector(b).scrollTop, scrollY], BOX);
            const st1 = await stateOf(page);
            x = { mode, g, geo, st0, st1, moved: drive === "page" ? sy1[1] - sy0[1] : sy1[0] - sy0[0], lead };
          } finally { const v = page?.video(); await ctx.close(); if (x && v) { x.video = await v.path(); runs.push(x); } }
        }
        const out = [];
        for (const x of runs) {
          // crop: the scroller's box from 80 px above it to 10 px below (the page drive moves it up ≤ 60 px)
          const cx = Math.max(0, Math.floor(x.g.bl) - 2), cy = Math.max(0, Math.floor(x.g.bt) - 80), W = Math.min(700 - cx, Math.ceil(x.g.br - x.g.bl) + 4), Hh = Math.min(500 - cy, Math.ceil(x.g.bb - x.g.bt) + 90);
          const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=${W}:${Hh}:${cx}:${cy}`, "-pix_fmt", "gray", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
          const N = Math.floor(raw.length / (W * Hh));
          // ink centroid of the rows of a column band inside a ±16 px window that follows the feature frame to frame;
          // ink = |l − the window's median| − 24 levels (video coding noise)
          const band = (fr, xc, hw, yc) => {
            const x0 = Math.max(0, Math.round(xc - cx - hw)), x1 = Math.min(W - 1, Math.round(xc - cx + hw)), y0 = Math.max(0, Math.round(yc - 16)), y1 = Math.min(Hh - 1, Math.round(yc + 16)); const vals = []; for (let y = y0; y <= y1; y++) for (let xx = x0; xx <= x1; xx++) vals.push(fr[y * W + xx]); vals.sort((p, q) => p - q); const bg = vals[vals.length >> 1];
            let s = 0, sy = 0; for (let y = y0; y <= y1; y++) { let ink = 0; for (let xx = x0; xx <= x1; xx++) ink += Math.max(0, Math.abs(fr[y * W + xx] - bg) - 24); s += ink; sy += ink * y; } return s > 0 ? sy / s : NaN; };
          const track = (frs, xc, hw, y0) => { let y = y0; return frs.map((fr) => { const v = band(fr, xc, hw, y); const w = band(fr, xc, hw, Number.isFinite(v) ? v : y); if (Number.isFinite(w)) y = w; return w; }); };
          const fs2 = []; for (let k = 0; k < N; k++) { const fr = raw.subarray(k * W * Hh, (k + 1) * W * Hh); let s = 0, s2 = 0; for (let i = 0; i < fr.length; i++) { s += fr[i]; s2 += fr[i] * fr[i]; } if (Math.sqrt(Math.max(0, s2 / fr.length - (s / fr.length) ** 2)) >= 3) fs2.push(fr); }
          const ty = track(fs2, x.geo.tx, 4, x.geo.ty - cy), my = track(fs2, x.geo.mx, 3, x.geo.my - cy);
          const trail = ty.map((v, k) => (v - ty[0]) - (my[k] - my[0])).filter(Number.isFinite);
          const worst = trail.reduce((m, v) => (Math.abs(v) > Math.abs(m) ? v : m), 0);
          out.push({ mode: x.mode, n: N, kept: fs2.length, worst, trail: trail.map((v) => +v.toFixed(1)), moved: x.moved, eng0: x.st0.eng, prom0: x.st0.promoted, eng1: x.st1.eng });
        }
        return { out };
      } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
    }, 480000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const rel = r.out.filter((x) => x.mode === "released"), engd = r.out.filter((x) => x.mode === "engaged");
    const relMax = Math.max(0, ...rel.map((x) => Math.abs(x.worst))), bound = relMax + 1;
    const undriven = engd.filter((x) => !x.eng0 || !x.eng1 || !(Math.abs(x.moved) > 20)).concat(rel.filter((x) => x.eng0 || !(Math.abs(x.moved) > 20)));
    const bad = engd.filter((x) => Math.abs(x.worst) > bound);
    const line = (x) => `${x.kept}/${x.n} frames, worst trail ${f(x.worst, 1)} px, scrolled ${f(x.moved, 0)} px${x.mode === "engaged" ? `, promoted ${x.prom0}` : ""} [${x.trail.join(" ")}]`;
    cell(name, undriven.length ? "UNMEASURED" : bad.length ? "FAIL" : "PASS", `${undriven.length ? `NOT DRIVEN (${undriven.length} films not engaged/released as named or not scrolled > 20 px) · ` : ""}keyboard-engaged, ${drive === "on" ? "the scroller wheeled with the pointer over the control" : drive === "away" ? "the scroller wheeled with the pointer over its content left of the control" : "the page wheeled with the pointer outside the scroller"} (${nt} × ${tick} px) · thumb centroid minus the in-scroller marker's, per video frame · engaged: ${engd.map(line).join(" | ")} · released: ${rel.map(line).join(" | ")} · bound |trail| ≤ released ${f(relMax, 1)} + 1 = ${f(bound, 1)} px; ${bad.length} of ${engd.length} engaged films over it`);
  }

  // ── trailstill: where the promoted body stands after a wheel scroll has ended (a still, no film) ──
  // keyboard-engaged in `clipstale` (dark), the rest box 70 px inside the scroller, 14 wheel ticks of 3 px with the pointer
  // over the control (on) or the page outside the scroller (page; the page made 1600 px taller), +700 ms: the host's
  // painted centre against its footprint's (main thread), and in paint the thumb's ink row against the same still taken
  // released at the same scroll. Bound: |host − footprint| ≤ 1 px and |engaged − released thumb row| ≤ 1 px.
  if (want("trailstill")) for (const drive of ["on", "page"]) {
    const name = `C-A8 trailstill · ${drive}`;
    const shotRow = async (page) => { const g = await page.evaluate(([thumb, box]) => { const t = document.querySelector(thumb).getBoundingClientRect(), b = document.querySelector(box).getBoundingClientRect(); return { tx: t.left + t.width / 2, bl: b.left, bt: b.top, br: b.right, bb: b.bottom }; }, [THUMB, BOX]);
      const clip = { x: Math.max(0, Math.floor(g.bl)), y: Math.max(0, Math.floor(g.bt)), width: Math.ceil(g.br - g.bl), height: Math.ceil(g.bb - g.bt) };
      const buf = await page.screenshot({ clip }); const L = luma(buf); const x0 = Math.round(g.tx - clip.x) - 3, x1 = x0 + 6; const col = []; for (let y = 0; y < L.h; y++) { let s = 0; for (let x = x0; x <= x1; x++) s += L.o[y * L.w + x]; col.push(s / 7); }
      const bg = [...col].sort((a, b) => a - b)[col.length >> 1]; let w = 0, wy = 0; col.forEach((v, y) => { const ink = Math.max(0, Math.abs(v - bg) - 24); w += ink; wy += ink * y; }); return { row: w ? wy / w : NaN, buf }; };
    const once = (eng) => guard(`${name} ${eng ? "engaged" : "released"}`, async () => {
      const P = await openPage(E, T, "clipstale", { theme: "dark" });
      try {
        const { page } = P;
        if (drive === "page") await page.evaluate(() => { document.querySelector("main").style.paddingBottom = "1600px"; });
        if (eng) await kbd(page);
        const g = await setHid(page, -70); await page.waitForTimeout(300);
        const geo = await page.evaluate((r) => { const h = document.querySelector(r).getBoundingClientRect(); return { x: h.left + h.width * 0.8, y: h.top + h.height / 2 }; }, ROOT);
        await page.mouse.move(drive === "on" ? geo.x : 620, drive === "on" ? geo.y : 420);
        for (let k = 0; k < 14; k++) { await page.mouse.wheel(0, 3); await page.waitForTimeout(16); }
        await page.waitForTimeout(700);
        const rd = await page.evaluate(([r, b]) => { const h = document.querySelector(r); const fp = h.previousElementSibling?.classList.contains("engage-footprint") ? h.previousElementSibling.getBoundingClientRect() : null; const q = h.getBoundingClientRect(); return { hc: q.top + q.height / 2, fc: fp ? fp.top + fp.height / 2 : NaN, st: document.querySelector(b).scrollTop, sy: scrollY, eng: h.matches("[data-engaged]"), prom: h.matches(":popover-open"), top: h.style.top }; }, [ROOT, BOX]);
        const s = await shotRow(page); save(`trailstill-${drive}-${eng ? "engaged" : "released"}`, s.buf);
        return { rd, row: s.row, g };
      } finally { await P.close(); }
    }, 90000);
    const e = await once(true), r = await once(false);
    if (e.crashed || r.crashed) { cell(name, "FAIL", e.line ?? r.line); continue; }
    const dMain = e.rd.hc - e.rd.fc, dPaint = e.row - r.row;
    const driven = e.rd.eng && e.rd.prom && (drive === "on" ? e.rd.st === r.rd.st : e.rd.sy === r.rd.sy);
    cell(name, !driven ? "UNMEASURED" : Math.abs(dMain) <= 1 && Math.abs(dPaint) <= 1 ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (engaged ${e.rd.eng}, promoted ${e.rd.prom}, scroll ${e.rd.st}/${e.rd.sy} vs released ${r.rd.st}/${r.rd.sy}) · `}keyboard-engaged, ${drive === "on" ? "the scroller wheeled over the control" : "the page wheeled outside the scroller"} (14 × 3 px), +700 ms: scroller ${e.rd.st} px, page ${e.rd.sy} px · main thread: the host's centre minus its footprint's ${f(dMain, 2)} px (inline top ${e.rd.top}) · paint: the thumb's ink row engaged minus released at the same scroll ${f(dPaint, 2)} px · bound ≤ 1 px each`);
  }

  // ── ancestor ──
  if (want("ancestor")) {
    const kinds = [["none", {}], ["opacity", { opacity: "0.5" }], ["clippath", { clipPath: "inset(0 50% 0 0)" }], ["rotate", { rotate: "4deg" }]];
    const res = {};
    for (const [kind, css] of kinds) {
      const name = `C-A8 ancestor · ${kind}`;
      res[kind] = await guard(name, async () => {
        const P = await openPage(E, T, "clipstale");
        try {
          const { page } = P;
          await page.evaluate(([b, css]) => Object.assign(document.querySelector(b).style, css), [BOX, css]);
          const g0 = await setHid(page, -50);
          const clip = { x: Math.max(0, Math.floor(g0.bl) - 12), y: Math.max(0, Math.floor(g0.bt) - 12), width: Math.ceil(g0.br - g0.bl) + 24, height: Math.ceil(g0.bb - g0.bt) + 24 };
          await setHid(page, -170); await page.waitForTimeout(150); const empty = luma(await page.screenshot({ clip }));
          await setHid(page, -50); await page.waitForTimeout(150);
          await kbd(page); await setHid(page, -50); await page.waitForTimeout(150);
          const s1 = await stateOf(page); const b1 = await page.screenshot({ clip }); const eng = luma(b1);
          const host = await page.evaluate((r) => { const h = document.querySelector(r); const fp = h.previousElementSibling; const cs = getComputedStyle(h); return { transform: cs.transform, op: cs.opacity, fpRect: fp?.classList.contains("engage-footprint") ? (() => { const q = fp.getBoundingClientRect(); return [q.left, q.top, q.width, q.height].map((v) => +v.toFixed(1)); })() : null, hRect: (() => { const q = h.getBoundingClientRect(); return [q.left, q.top, q.width, q.height].map((v) => +v.toFixed(1)); })() }; }, ROOT);
          await page.keyboard.press("Escape"); await page.waitForTimeout(1000);
          const s2 = await stateOf(page); const b2 = await page.screenshot({ clip }); const rel = luma(b2);
          save(`ancestor-${kind}-engaged`, b1); save(`ancestor-${kind}-released`, b2);
          return { k: vis(eng, empty) / Math.max(1, vis(rel, empty)), s1, s2, host };
        } finally { await P.close(); }
      }, 120000);
    }
    const k0 = res.none?.k;
    for (const [kind] of kinds) {
      const r = res[kind]; const name = `C-A8 ancestor · ${kind}`;
      if (!r || r.crashed) { cell(name, "FAIL", r?.line ?? "no read"); continue; }
      const driven = r.s1.eng && !r.s2.eng; const rr = r.k / k0;
      const st = kind === "none" ? "REPORT" : !driven ? "UNMEASURED" : rr >= 0.9 && rr <= 1.1 ? "PASS" : "FAIL";
      cell(name, st, `${driven ? "" : `NOT DRIVEN (engaged ${r.s1.eng}, released ${!r.s2.eng}) · `}keyboard engaged (promoted ${r.s1.promoted}) · the scroller ${kind === "none" ? "unstyled (the control)" : `given ${kind}`} · visibility over the scroller's box, engaged over released ×${f(r.k, 3)}; over the control's ×${f(k0, 3)}: ratio of ratios ${f(rr, 3)} (bound 0.90..1.10) · host transform ${r.host.transform}, host rect ${JSON.stringify(r.host.hRect)}, footprint rect ${JSON.stringify(r.host.fpRect)}`);
    }
  }

  // ── dlg ──
  if (want("dlg")) for (const drive of ["esc2", "scrim"]) {
    const name = `C-A8 dlg · ${drive}`;
    const DR = '[data-t="dlg-slider"] .glass-slider', DT = '[data-t="dlg-slider"] [role="slider"]', PLATE = '[role="dialog"]';
    const run = async (still) => {
      const P = await openPage(E, T, "presented");
      try {
        const { page } = P;
        if (!(await page.$(DT))) return { absent: true };
        await page.focus('[role="dialog"] .button'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(700);
        const s0 = await stateOf(page, DR);
        const pb = await page.evaluate((p) => { const r = document.querySelector(p).getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }, PLATE);
        const film = page.evaluate(([dr, plate]) => new Promise((ok) => {
          const fr = []; const t0 = performance.now(); const host = document.querySelector(dr);
          const tick = () => { const p = document.querySelector(plate); fr.push({ t: performance.now() - t0, op: p ? +getComputedStyle(p).opacity : NaN, plate: !!p, conn: host.isConnected, prom: host.isConnected && host.matches(":popover-open"), eng: host.isConnected && host.matches("[data-engaged]") }); if (performance.now() - t0 < 1400) requestAnimationFrame(tick); else ok(fr); };
          requestAnimationFrame(tick);
        }), [DR, PLATE]);
        await page.waitForTimeout(50);
        if (drive === "esc2") { await page.keyboard.press("Escape"); await page.waitForTimeout(40); await page.keyboard.press("Escape"); }
        else await page.mouse.click(12, 12);
        let shot = null;
        if (still) { await page.waitForTimeout(150); shot = await page.screenshot({ clip: { x: Math.max(0, Math.floor(pb.x) - 20), y: Math.max(0, Math.floor(pb.y) - 20), width: Math.ceil(pb.w) + 40, height: Math.ceil(pb.h) + 40 } }); }
        const fr = await film;
        return { s0, fr, shot };
      } finally { await P.close(); }
    };
    const r = await guard(name, () => run(false), 120000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.absent) { cell(name, "UNMEASURED", "no slider in the Dialog: this build is not the probe fork (dlg-*)"); continue; }
    const fr = r.fr; let mis = 0, misAt = NaN, step = 0, stepAt = NaN, promFrames = 0, fadeProm = 0;
    for (let k = 0; k < fr.length; k++) {
      const x = fr[k];
      if (x.prom) { promFrames++; const m = x.plate ? 1 - x.op : 1; if (x.plate && x.op < 0.98) fadeProm++; if (m > mis) { mis = m; misAt = x.t; } }
      if (k > 0 && fr[k - 1].prom && !x.prom) { const s = x.conn && x.plate ? 1 - x.op : 1; if (s > step) { step = s; stepAt = x.t; } }
    }
    const closedAt = fr.find((x) => !x.plate)?.t; const opMin = Math.min(...fr.filter((x) => x.plate).map((x) => x.op));
    const driven = r.s0.eng && fr.some((x) => x.plate && x.op < 0.9);
    const st = !driven ? "UNMEASURED" : mis <= 0.1 && step <= 0.1 ? "PASS" : "FAIL";
    cell(name, st, `${driven ? "" : `NOT DRIVEN (engaged ${r.s0.eng}, the plate faded ${fr.some((x) => x.plate && x.op < 0.9)}) · `}a Slider in the presented Dialog, keyboard-engaged (promoted ${r.s0.promoted}), the Dialog dismissed by ${drive === "esc2" ? "Escape, 40 ms, Escape" : "a click outside the plate"} · ${fr.length} frames: the host promoted on ${promFrames}, of them ${fadeProm} while the plate's opacity was < 0.98; the plate's opacity fell to ${f(opMin, 2)}${closedAt != null ? `, the plate gone at +${f(closedAt, 0)} ms` : ""} · largest mismatch (promoted at 1 over a plate at p: 1 − p) ${f(mis, 2)}${Number.isFinite(misAt) ? ` at +${f(misAt, 0)} ms` : ""} · the leave step ${f(step, 2)}${Number.isFinite(stepAt) ? ` at +${f(stepAt, 0)} ms` : ""} · bound ≤ 0.10 each`);
    if (frames) { const s = await guard(`${name} still`, () => run(true), 120000); if (s?.shot) save(`dlg-${drive}-150ms`, s.shot); }
  }

  // ── glidescale ──
  let glide0 = null;
  if (want("glidescale")) for (const [tag, css] of [["none", {}], ["scale", { scale: "0.8", transformOrigin: "0 0" }]]) {
    const name = `C-A8 glidescale · ${tag}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        await page.evaluate(([b, css]) => Object.assign(document.querySelector(b).style, css), [BOX, css]);
        await setHid(page, -60); await page.waitForTimeout(100);
        await kbd(page);
        const s0 = await stateOf(page);
        const film = page.evaluate(([root, rest]) => new Promise((ok) => {
          const fr = []; const t0 = performance.now(); const h = document.querySelector(root); let ins = -1; let k = 0;
          const tick = () => {
            const r = h.getBoundingClientRect(); const fp = h.previousElementSibling?.classList.contains("engage-footprint") ? h.previousElementSibling.getBoundingClientRect() : null;
            fr.push({ t: performance.now() - t0, cy: r.top + r.height / 2, cx: r.left + r.width / 2, fy: fp ? fp.top + fp.height / 2 : NaN, ins: ins >= 0 });
            k++;
            if (k === 6) { const q = document.querySelector(rest); const d = document.createElement("div"); d.style.height = "40px"; d.setAttribute("data-t", "ca8-inserted"); q.before(d); ins = fr.length; }
            if (performance.now() - t0 < 900) requestAnimationFrame(tick); else ok({ fr, ins });
          };
          requestAnimationFrame(tick);
        }), [ROOT, REST]);
        const { fr, ins } = await film;
        const s1 = await stateOf(page);
        return { fr, ins, s0, s1 };
      } finally { await P.close(); }
    }, 90000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const { fr, ins } = r; const before = fr[ins - 1], after = fr[ins];
    const jump = Math.hypot(after.cx - before.cx, after.cy - before.cy);
    let mv = 0; for (let k = ins + 1; k < fr.length; k++) mv = Math.max(mv, (Math.hypot(fr[k].cx - fr[k - 1].cx, fr[k].cy - fr[k - 1].cy) * NOM) / Math.max(NOM, fr[k].t - fr[k - 1].t));
    const placeMoved = Math.abs(fr[fr.length - 1].cy - before.cy);
    const driven = r.s0.eng && r.s1.eng && placeMoved > 10;
    if (tag === "none") glide0 = driven ? jump : null;
    const st = tag === "none" ? "REPORT" : !driven || glide0 == null ? "UNMEASURED" : jump <= glide0 + 1 ? "PASS" : "FAIL";
    cell(name, st, `${driven ? "" : `NOT DRIVEN (engaged ${r.s0.eng}/${r.s1.eng}, place moved ${f(placeMoved, 1)} px) · `}keyboard-engaged (promoted ${r.s0.promoted}) in the scroller ${tag === "none" ? "untransformed (the control)" : "under scale 0.8"}; a 40 px block inserted before the control's row (a re-render: the stage's glide) · the root's painted centre moved ${f(jump, 2)} px in the insertion's frame (one frame of the glide; ${tag === "none" ? "the control" : `bound ≤ the untransformed control's ${f(glide0, 2)} + 1 px: the glide must start where the control was painted`}), then at most ${f(mv, 2)} px per 16.7 ms; the place moved ${f(placeMoved, 1)} px in all`);
  }

  // ── feather (two-sided, ring kept or suppressed) ──
  if (want("feather")) for (const ring of ["ring", "noring"]) {
    const name = `C-A8 feather · keyboard · ${ring}`;
    const res = {};
    for (const masked of [true, false]) {
      res[masked] = await guard(`${name} ${masked ? "on" : "off"}`, async () => {
        const P = await openPage(E, T, "clipstale");
        try {
          const { page } = P;
          await page.evaluate(([b, masked, ring, rest]) => {
            const e = document.querySelector(b);
            if (masked) { e.classList.add("fading-scroll", "fading-scroll--y"); e.setAttribute("data-fade-start", ""); e.setAttribute("data-fade-end", ""); }
            const s = document.createElement("style"); s.textContent = ".glass-focus-veil { visibility: hidden !important; }" + (ring === "noring" ? ` ${rest} *, ${rest} *:focus, ${rest} *:focus-visible { outline: none !important; }` : ""); document.head.appendChild(s);
          }, [BOX, masked, ring, REST]);
          const band = async (hid) => { const g = await setHid(page, hid); await page.waitForTimeout(150); return luma(await page.screenshot({ clip: { x: Math.floor(g.bl) + 2, y: Math.floor(g.bt) + 2, width: Math.ceil(g.br - g.bl) - 4, height: 28 } })); };
          const empty = await band(-140); await setHid(page, -50);
          await kbd(page);
          const L1 = await band(-4); const s1 = await stateOf(page);
          const paint = await page.evaluate((r) => { const h = document.querySelector(r); const cs = getComputedStyle(h); return `mask-clip ${cs.maskClip || cs.webkitMaskClip} · mask-composite ${cs.maskComposite || cs.webkitMaskComposite} · mask-image ${(cs.maskImage || cs.webkitMaskImage || "").slice(0, 40)} · outline ${cs.outlineStyle} ${cs.outlineWidth} · thumb outline ${getComputedStyle(document.activeElement).outlineStyle} ${getComputedStyle(document.activeElement).outlineWidth} offset ${getComputedStyle(document.activeElement).outlineOffset}`; }, ROOT);
          await page.keyboard.press("Escape"); await page.waitForTimeout(1000);
          const L2 = await band(-4); const s2 = await stateOf(page);
          if (masked) { save(`feather-${ring}-engaged`, await page.screenshot({ clip: { x: 0, y: 0, width: 700, height: 300 } }).catch(() => null) ?? Buffer.alloc(0)); }
          return { k: vis(L1, empty) / Math.max(1, vis(L2, empty)), s1, s2, paint };
        } finally { await P.close(); }
      }, 120000);
    }
    const on = res[true], off = res[false];
    if (on.crashed || off.crashed) { cell(name, "FAIL", on.line ?? off.line); continue; }
    const rr = on.k / off.k; const driven = on.s1.eng && !on.s2.eng && off.s1.eng && !off.s2.eng;
    cell(name, !driven ? "UNMEASURED" : rr >= 0.9 && rr <= 1.1 ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN · "}keyboard engaged (promoted ${on.s1.promoted}) · focus ring ${ring === "ring" ? "kept" : "suppressed (outline: none on the slider's descendants)"} · engaged over released ×${f(on.k, 3)} feathered, ×${f(off.k, 3)} unfeathered · ratio of ratios ${f(rr, 3)} (two-sided bound 0.90..1.10; H8's cell is one-sided ≤ 1.10) · promoted paint: ${on.paint}`);
  }

  // ── crest ──
  if (want("crest")) for (const sc of ["button", "chip"]) {
    const name = `C-A8 crest · ${sc}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, sc);
      try {
        const { page } = P;
        return await page.evaluate((sc) => new Promise((ok) => {
          const face = document.querySelector('[data-e~="face"]') ?? document.querySelector('[data-e~="target"]');
          const cs = getComputedStyle(face); const tok = { engage: +cs.getPropertyValue("--scale-engage"), press: +cs.getPropertyValue("--scale-press"), crest: +cs.getPropertyValue("--rung-crest") };
          const s0 = window.__e.state?.(); const fr = []; const t0 = performance.now();
          if (sc === "button") face.click(); else window.__e.commit();
          const tick = () => { fr.push(window.__eff(face).s); if (performance.now() - t0 < 700) requestAnimationFrame(tick); else ok({ peak: Math.max(...fr), tok, cls: face.className.slice(0, 90), moved: Math.max(...fr) - Math.min(...fr), s0: JSON.stringify(s0), s1: JSON.stringify(window.__e.state?.()) }); };
          requestAnimationFrame(tick);
        }), sc);
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    // the register's row, read independently of the crest the face resolves: a command's crest is the engaged row
    // (--scale-engage); a chosen face's is the press mirrored (2 − --scale-press, scale-paper.css:46)
    const crest = sc === "button" ? r.tok.engage : 2 - r.tok.press;
    cell(name, r.moved < 0.002 ? "UNMEASURED" : Math.abs(r.peak - crest) <= 0.004 ? "PASS" : "FAIL", `${r.moved < 0.002 ? "NOT DRIVEN (the face never moved) · " : ""}${sc === "button" ? "a stateless command, element.click(): the register row --scale-engage" : "the selectable chip, __e.commit(): the register row 2 − --scale-press"} = ${f(crest, 4)} (the face's --rung-crest ${f(r.tok.crest, 4)}) · state ${r.s0} → ${r.s1} · the face's peak scale ×${f(r.peak, 4)} (bound |peak − crest| ≤ 0.004)`);
  }
});
