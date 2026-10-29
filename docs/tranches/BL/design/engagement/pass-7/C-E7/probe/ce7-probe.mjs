#!/usr/bin/env node
// C-E7 probe: CK-20's place invariant on the paths P-E7's cells do not drive (P-E7 §7 gap 5 names them unread), on the
// harness's own app (scene `clipstale`), the scroller restyled by a style write as the harness's own drives do. One
// browser per run (the harness's Engine), a context per cell, closed in finally.
//   shape     the promoted control (keyboard: Tab from the before-sentinel) against two clips the library itself
//             produces and E7's rectangle-from-overflow construction does not read:
//             · radius  the scroller rounded (`border-radius: 40px`, the slider row unpadded) so the control's ends sit in
//                       the corners: px² of the corner regions OUTSIDE the rounded padding box (1.5 px antialias band
//                       excluded) that differ (≥ 16 levels) from the released still at the same scroll. Bound ≤ 16 px²
//             · mask    the scroller given the library's own `.fading-scroll .fading-scroll--y[data-fade-start]
//                       [data-fade-end]` recipe (FadingScroll, the Configurator's controls column), scrolled so its start
//                       edge feathers, the control 4 px inside the edge: its visibility in the box's top 28 px
//                       (Σ|luma − the empty box|) promoted (keyboard) over in flow (released after Escape, focus kept so
//                       the ring is in both). Bound: ≤ 1.25 × the same ratio with the feather off (the grow's own gain)
//   place     the promotion keeps its place under an ancestor transform (translate 0 30px; scale 0.8; none): the
//             control's centre moves ≤ 2 px at the promotion and its width changes only by the grow (×0.99..1.07)
//   film      the clip while the scroller MOVES (P-E7 §7 gap 5: "no film read the clip edge during a scroll"): the context
//             records video (Playwright recordVideo, viewport 1:1); keyboard-engaged, the control 30 px inside the box,
//             (1) twelve 8 px wheel ticks over the box's own area 16 ms apart, (2) a smooth `scrollBy` of 90 px; the same
//             two drives released after Escape are the control. Per decoded frame: px² of the 24 px strip above the box
//             differing by ≥ 40 levels (video coding noise) from the first frame. Bound: no frame over 3 rows × width
//   node ce7-probe.mjs --build <dir> [--engine webkit] [--only shape,place,film] [--out <dir>] [--frames <dir>] [--label l]
import { mkdirSync, writeFileSync, readFileSync, rmSync, readdirSync } from "node:fs";
import { execFileSync } from "node:child_process";
import path from "node:path";
import { witness, openPage, center, f, GLASS, tabKey } from "../../../harness/lib.mjs";
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const STEP = 16, ROWS = 3;

await witness("C-E7 probe", "CK-20's place invariant on unread clips (radius, mask, scale) and during a scroll (film)", async ({ a, E, T, cell, guard, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const want = (m) => !only || only.has(m);
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) mkdirSync(frames, { recursive: true });
  const label = typeof a.label === "string" ? a.label : "ce7";
  const BOX = '[data-t="box"]', REST = '[data-t="slider-a"]', ROOT = '[data-t="slider-a"] .glass-slider';
  // place the rest box `hid` px past the box's painted top edge (negative: inside), two frames
  const setHid = (page, hid, edge = "top") => page.evaluate(([BOX, REST, ROOT, hid, edge]) => {
    const b = document.querySelector(BOX), q = document.querySelector(REST), h = document.querySelector(ROOT);
    const br = b.getBoundingClientRect(); const rr = q.getBoundingClientRect();
    if (edge === "top") b.scrollTop += (rr.top - (br.top + b.clientTop - hid)) / (br.height / b.offsetHeight);
    else b.scrollTop += (rr.bottom - (br.bottom + hid)) / (br.height / b.offsetHeight);
    return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => { const b2 = b.getBoundingClientRect(), r2 = q.getBoundingClientRect(); ok({ bl: b2.left, bt: b2.top, br: b2.right, bb: b2.bottom, st: b.scrollTop, qt: r2.top, qb: r2.bottom, eng: h.hasAttribute("data-engaged"), promoted: h.matches(":popover-open"), clip: h.style.clipPath, hw: h.offsetWidth }); })));
  }, [BOX, REST, ROOT, hid, edge]);
  const engageKey = async (page) => { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); };
  const engaged = (page) => page.evaluate((ROOT) => { const h = document.querySelector(ROOT); return { eng: h.hasAttribute("data-engaged"), promoted: h.matches(":popover-open"), clip: h.style.clipPath }; }, ROOT);
  const save = (name, buf) => { if (frames) writeFileSync(path.join(frames, `${label}-${engine}-${name}.png`), buf); };

  let maskOn = null, maskCtl = null;
  if (want("shape")) {
    // ── radius ──
    {
      const name = "clip shape · radius (rounded scroller, keyboard promoted)";
      const r = await guard(name, async () => {
        const P = await openPage(E, T, "clipstale");
        try {
          const { page } = P;
          await page.evaluate(([BOX, REST]) => { document.querySelector(BOX).style.borderRadius = "40px"; document.querySelector(REST).style.padding = "0"; }, [BOX, REST]);
          await engageKey(page);
          const g = await setHid(page, 6);
          const clip = { x: Math.floor(g.bl), y: Math.floor(g.bt), width: Math.ceil(g.br - g.bl), height: 44 };
          await page.waitForTimeout(80);
          const eb = await page.screenshot({ clip }); const e = luma(eb); const st = await engaged(page);
          await page.keyboard.press("Escape"); await page.waitForTimeout(800);
          const g2 = await setHid(page, 6); await page.waitForTimeout(80);
          const zb = await page.screenshot({ clip }); const z = luma(zb);
          save("radius-engaged", eb); save("radius-released", zb);
          // the region the rounded padding box clips: inside the rect, outside the arc (+1.5 px band), top corners
          const R = 40 - 1, W = clip.width; let n = 0, m = 0;
          for (let y = 0; y < clip.height; y++) for (let x = 0; x < W; x++) {
            const dx = x < R ? R - x : x > W - 1 - R ? x - (W - 1 - R) : 0, dy = y < R ? R - y : 0;
            if (!dx || !dy) continue; if (Math.hypot(dx, dy) <= R + 1.5) continue;
            m++; const i = y * W + x; if (Math.abs(e.o[i] - z.o[i]) >= STEP) n++;
          }
          return { n, m, st, g, g2 };
        } finally { await P.close(); }
      }, 120000);
      if (r.crashed) cell(name, "FAIL", r.line);
      else { const bound = 16; const driven = r.st.eng && r.st.promoted && !r.g2.eng;
        cell(name, !driven ? "FAIL" : r.n <= bound ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (engaged ${r.st.eng}, promoted ${r.st.promoted}, released ${!r.g2.eng}) · `}scroller border-radius 40 px, the control 6 px past its top edge · px² of the top corners OUTSIDE the rounded padding box (${r.m} px² read, 1.5 px antialias band excluded) that differ ≥ ${STEP} levels engaged vs released: ${r.n} (bound ≤ ${bound} px²: the antialias band is already excluded, so this is paint where the card clips) · clip-path written ${JSON.stringify(r.st.clip)}`); }
    }
    // ── mask ──
    // the control's visibility in the box's top 28 px (Σ|luma − the empty box, same mask|) in two states that differ only
    // in the promotion: released after Escape (focus kept, so the focus ring is in both) and promoted (keyboard). Read
    // with the library's feather on and, as the control, off: the promotion's own gain (the grow) is the unmasked ratio;
    // a masked ratio above 1.25 × it is the mask not reaching the promoted control
    for (const masked of [true, false]) {
      const name = `clip shape · mask ${masked ? "on" : "off (control)"} (the library's .fading-scroll feather, keyboard promoted)`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, "clipstale");
        try {
          const { page } = P;
          if (masked) await page.evaluate((BOX) => { const b = document.querySelector(BOX); b.classList.add("fading-scroll", "fading-scroll--y"); b.setAttribute("data-fade-start", ""); b.setAttribute("data-fade-end", ""); }, BOX);
          const band = async (hid) => { const g = await setHid(page, hid); await page.waitForTimeout(150); const clip = { x: Math.floor(g.bl) + 2, y: Math.floor(g.bt) + 2, width: Math.ceil(g.br - g.bl) - 4, height: 28 }; const buf = await page.screenshot({ clip }); return { g, buf, L: luma(buf) }; };
          const empty = await band(-140);
          const fade = await page.evaluate((BOX) => getComputedStyle(document.querySelector(BOX)).getPropertyValue("--fade-start").trim(), BOX);
          const vis = (x) => { let s = 0; for (let i = 0; i < x.L.o.length; i++) s += Math.abs(x.L.o[i] - empty.L.o[i]); return s; };
          await engageKey(page);
          const pr = await band(-4); const prSt = await engaged(page);
          await page.keyboard.press("Escape"); await page.waitForTimeout(900);
          const rel = await band(-4); const relSt = await engaged(page);
          const focused = await page.evaluate(() => !!document.activeElement?.closest('[data-t="slider-a"]'));
          save(`mask-${masked ? "on" : "off"}-promoted`, pr.buf); save(`mask-${masked ? "on" : "off"}-released`, rel.buf);
          return { fade, vPr: vis(pr), vRel: vis(rel), prSt, relSt, focused };
        } finally { await P.close(); }
      }, 120000);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      const ratio = r.vPr / Math.max(1, r.vRel);
      if (!masked) { maskCtl = ratio; cell(name, "REPORT", `unmasked control: visibility released (focused ${r.focused}) ${f(r.vRel, 0)}, promoted ${f(r.vPr, 0)} = ×${f(ratio, 2)} (the grow's own gain)`); continue; }
      maskOn = { ...r, ratio };
    }
    if (maskOn) {
      const r = maskOn; const bound = 1.25 * (maskCtl ?? 1);
      const driven = r.prSt.promoted && !r.relSt.eng && parseFloat(r.fade) > 0 && r.focused;
      cell("clip shape · mask (promoted against in flow, feather on)", !driven ? "FAIL" : r.ratio <= bound ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (promoted ${r.prSt.promoted}, released ${!r.relSt.eng}, focus kept ${r.focused}, --fade-start ${r.fade}) · `}the box feathers its start edge (--fade-start ${r.fade}), the control 4 px inside it · visibility in the box's top 28 px: in flow (released, focused) ${f(r.vRel, 0)}, promoted ${f(r.vPr, 0)} = ×${f(r.ratio, 2)} · bound ≤ 1.25 × the unmasked control's ×${f(maskCtl, 2)} = ×${f(bound, 2)}`);
    }
  }

  if (want("place")) {
    // the promotion keeps its place under an ancestor transform (the scroller translated, as a Sheet's detent or a
    // dialog's entrance moves its content; and scaled): the control's painted centre in flow, then promoted (keyboard)
    for (const [tag, css] of [["translate", { translate: "0 30px" }], ["scale", { scale: "0.8", transformOrigin: "0 0" }], ["none", {}]]) {
      const name = `place under an ancestor transform · ${tag} (keyboard promoted)`;
      const r = await guard(name, async () => {
        const P = await openPage(E, T, "clipstale");
        try {
          const { page } = P;
          await page.evaluate(([BOX, css]) => Object.assign(document.querySelector(BOX).style, css), [BOX, css]);
          await setHid(page, -40);
          const rectOf = () => page.evaluate((ROOT) => { const r = document.querySelector(ROOT).getBoundingClientRect(); return { x: r.left + r.width / 2, y: r.top + r.height / 2, w: r.width }; }, ROOT);
          const before = await rectOf();
          await engageKey(page);
          const during = await rectOf(); const st = await engaged(page);
          save(`place-${tag}-engaged`, await page.screenshot({ clip: { x: 0, y: 100, width: 700, height: 260 } }));
          await page.keyboard.press("Escape"); await page.waitForTimeout(800);
          save(`place-${tag}-released`, await page.screenshot({ clip: { x: 0, y: 100, width: 700, height: 260 } }));
          return { before, during, st };
        } finally { await P.close(); }
      }, 120000);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      const dc = Math.hypot(r.during.x - r.before.x, r.during.y - r.before.y), kw = r.during.w / r.before.w;
      cell(name, !r.st.promoted ? "FAIL" : dc <= 2 && kw >= 0.99 && kw <= 1.07 ? "PASS" : "FAIL", `${r.st.promoted ? "" : "NOT DRIVEN · "}the control's centre in flow (${f(r.before.x, 1)}, ${f(r.before.y, 1)}), width ${f(r.before.w, 1)} px → promoted (${f(r.during.x, 1)}, ${f(r.during.y, 1)}), width ${f(r.during.w, 1)} px: the centre moves ${f(dc, 1)} px at the promotion (bound ≤ 2 px), width ×${f(kw, 3)} (bound 0.99..1.07: the grow)`);
    }
  }

  if (want("film")) {
    const name = "clip film · scroll under a keyboard engagement";
    const vdir = path.join(typeof a.out === "string" ? a.out : ".", `video-${label}-${engine}`);
    const r = await guard(name, async () => {
      rmSync(vdir, { recursive: true, force: true }); mkdirSync(vdir, { recursive: true });
      const b = await E.nav();
      const runs = [];
      for (const mode of ["engaged", "released", "engaged", "released", "engaged", "released"]) {
        const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1, reducedMotion: "no-preference", recordVideo: { dir: vdir, size: { width: 700, height: 500 } } });
        let page;
        try {
          page = await ctx.newPage();
          await page.goto(`${T.url}?${new URLSearchParams({ scene: "clipstale", theme: "light" })}`);
          await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
          if (mode === "engaged") await engageKey(page);
          const g = await setHid(page, -30);
          await page.waitForTimeout(700);
          // (1) wheel ticks over the box's own area (left gutter, below the control's place)
          await page.mouse.move(g.bl + 8, g.bb - 10);
          for (let k = 0; k < 12; k++) { await page.mouse.wheel(0, 8); await page.waitForTimeout(16); }
          await page.waitForTimeout(700);
          await setHid(page, -30); await page.waitForTimeout(500);
          // (2) a smooth programmatic scroll
          await page.evaluate((BOX) => document.querySelector(BOX).scrollBy({ top: 90, behavior: "smooth" }), BOX);
          await page.waitForTimeout(900);
          const st = await engaged(page);
          runs.push({ mode, g, st, video: null });
        } finally { const v = page?.video(); await ctx.close(); if (v) runs.at(-1) && (runs.at(-1).video = await v.path()); }
      }
      // decode the 24 px strip above the box from each film
      const out = [];
      for (const x of runs) {
        const cx = Math.max(0, Math.floor(x.g.bl)), cy = Math.max(0, Math.floor(x.g.bt) - 26), W = Math.floor(x.g.br - x.g.bl), H = 24;
        const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-vf", `crop=${W}:${H}:${cx}:${cy}`, "-pix_fmt", "gray", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
        const n = Math.floor(raw.length / (W * H)); const area = [];
        for (let k = 0; k < n; k++) { let c = 0; for (let i = 0; i < W * H; i++) if (Math.abs(raw[k * W * H + i] - raw[i]) >= 40) c++; area.push(c); }
        out.push({ mode: x.mode, n, area, hw: x.g.hw, st: x.st, eng0: x.g.eng, video: path.basename(x.video) });
        if (frames && x.mode === "engaged") { const k = area.indexOf(Math.max(...area)); try { execFileSync("ffmpeg", ["-v", "error", "-y", "-i", x.video, "-vf", `select=eq(n\\,${k}),crop=${W + 40}:${H + 90}:${Math.max(0, cx - 20)}:${cy}`, "-frames:v", "1", path.join(frames, `${label}-${engine}-film-worst-${out.length}.png`)]); } catch {} }
      }
      return { out };
    }, 480000);
    if (r.crashed) cell(name, "FAIL", r.line);
    else {
      const rel = r.out.filter((x) => x.mode === "released"), eng = r.out.filter((x) => x.mode === "engaged");
      const relMax = Math.max(...rel.map((x) => Math.max(...x.area))); const hw = r.out[0].hw;
      const bound = relMax + hw; // the released films' noise floor plus one row of the control (a moving edge's antialiasing)
      for (const x of r.out) {
        const most = Math.max(...x.area); const k = x.area.indexOf(most);
        const driven = x.mode === "engaged" ? x.eng0 : !x.eng0;
        const big = x.area.map((v, i) => (v > 100 ? `${i}:${v}` : null)).filter(Boolean);
        cell(`${name} · ${x.mode}`, x.mode === "released" ? "REPORT" : !driven ? "FAIL" : most <= bound ? "PASS" : "FAIL", `${driven ? "" : "NOT DRIVEN · "}${x.n} decoded frames (${x.video}) · px² of the 24 px strip above the box differing ≥ 40 levels from the first frame: largest ${most} at frame ${k}${x.mode === "engaged" ? ` (bound ≤ the released films' largest ${relMax} + one row × ${hw} px = ${bound})` : ""} · frames over 100 px²: ${big.join(" ") || "none"}`);
      }
    }
  }
});
