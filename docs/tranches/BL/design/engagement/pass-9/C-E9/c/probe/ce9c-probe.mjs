#!/usr/bin/env node
// ce9c-probe · the completion seat's own cells (D5 pass 9, C-E9), on the harness's app and lib (nothing in ../../../../harness
// is edited). A critic's search on paths the battery and ce9-probe do not read. Every cell is REPORT.
//   lensfilm · none|scale   P-E9 §8 gap 2, the first seat's class 3: "a lens trailing its track on a compositor scroll, no film
//       reads it". A fine hold (the loupe shown), twelve 8 px wheel ticks over the thumb; a recorded film, no mid-film screenshot.
//       The lens painted flat blue, the track flat red; in one column through the track's centre, per decoded frame, the rows
//       from the lens's last blue row to the track's first red row; worst distance off its median. Three films per card.
//       Chromium is the one-frame witness; WebKit's 25 fps film is printed (H8 §5).
//   glidezoom · none|0.8|1.25   E-10's glidescale method under CSS `zoom` on the scroller (no cell drives it): keyboard-engaged,
//       a 40 px block inserted before the control's row; the root's painted centre's move in the insertion's frame. A glide
//       that starts on the place last painted reads about the unzoomed control.
//   flipjitter · none|scale   The lens's side has no hysteresis (`placeLens`: a boolean on the track's position): a fine hold,
//       the card carried up until the lens flips, then ±3 px every 2 frames for 40 frames. Flip count, worst step of the lens
//       against its track (post-frame main-thread read, §P8-7 item 9).
//   dlgloop · esc2|scrim    O-103f (3) on the library's own unmount path: a Slider keyboard-engaged in the presented Dialog,
//       the Dialog dismissed; requestAnimationFrame calls per second (wrapped after boot; stage.ts calls the global each frame),
//       engaged, then in 0-150 ms, 150-450 ms and 1.5-3 s after the dismissal, the Dialog's slider gone or not. Control
//       esc1-unengaged: the same Dialog dismissed with nothing engaged, so the Dialog's own exit frames are read apart from the stage's.
// Real Safari: UNMEASURED (owner's safaridriver checkbox). Playwright WebKit is not Safari.
//   node ce9c-probe.mjs --build <dir> --label <l> [--engine webkit] [--out <dir>] [--only a,b]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, center, f, tabKey, INIT } = await import(`${H}/lib.mjs`);
const BOX = '[data-t="box"]', REST = '[data-t="slider-a"]', CROOT = '[data-t="slider-a"] .glass-slider', CTHUMB = '[data-t="slider-a"] [role="slider"]';
const SCALE = { scale: "0.8", transformOrigin: "0 0" };

await witness("CE9c-probe", "the completion seat's cells: the lens on a film, the glide under zoom, the flip's hysteresis, the loop on the Dialog's unmount", async ({ a, E, T, cell, guard, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null; const want = (k) => !only || only.has(k);

  if (want("lensfilm")) for (const [tf, css, marker] of [["none", null, false], ["scale", SCALE, false], ["marker", null, true]]) {
    const name = `CE9c lensfilm · ${tf}`; // marker: the instrument's control, a flat blue block inside the scroller above the track (lens hidden): it moves with the track by construction, so a read off its median is the capture's, not a place defect
    const r = await guard(name, async () => {
      const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "ce9c-"));
      try {
        const b = await E.nav(); const runs = [];
        for (let i = 0; i < 3; i++) {
          const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1, reducedMotion: "no-preference", recordVideo: { dir: vdir, size: { width: 700, height: 500 } } });
          let page, x = null, t0 = 0;
          try {
            page = await ctx.newPage(); t0 = Date.now(); await page.addInitScript(INIT);
            await page.goto(`${T.url}?${new URLSearchParams({ scene: "clipstale", theme: "light" })}`);
            await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
            await page.evaluate(([B, Q, css, marker]) => {
              const st = document.createElement("style"); st.textContent = `.glass-loupe { background: rgb(0,0,230) !important; box-shadow: none !important; border-color: rgb(0,0,230) !important; backdrop-filter: none !important; -webkit-backdrop-filter: none !important; } .glass-loupe > * { visibility: hidden !important; } .slider-track { background: rgb(230,0,0) !important; box-shadow: none !important; border-color: rgb(230,0,0) !important; }`; document.head.appendChild(st);
              const b1 = document.querySelector(B); if (css) Object.assign(b1.style, css); b1.style.position = "relative"; const y = b1.getBoundingClientRect().top; if (y < 200) b1.style.top = `${200 - y}px`;
              const q = document.querySelector(Q); const br = b1.getBoundingClientRect(), k = br.height / b1.offsetHeight, rr = q.getBoundingClientRect(); b1.scrollTop += (rr.top - (br.top + b1.clientTop * k + 10)) / k;
              if (marker) { const st2 = document.createElement("style"); st2.textContent = ".glass-loupe { visibility: hidden !important; }"; document.head.appendChild(st2); const t = q.querySelector(".slider-track").getBoundingClientRect(), q2 = q.getBoundingClientRect(); q.style.position = "relative"; const m = document.createElement("div"); m.style.cssText = `position:absolute;left:${t.left + t.width / 2 - 20 - q2.left}px;top:${t.top - q2.top - 14}px;width:60px;height:10px;background:rgb(0,0,230);pointer-events:none`; q.appendChild(m); }
            }, [BOX, REST, css, marker]);
            await page.waitForTimeout(300);
            const c = await center(page, CTHUMB);
            await page.mouse.move(c.x, c.y); await page.mouse.down();
            try {
              await page.waitForTimeout(1200);
              const g = await page.evaluate((s) => { const t = document.querySelector(s).getBoundingClientRect(); const l = document.querySelector(".glass-loupe")?.getBoundingClientRect(); const bx = document.querySelector('[data-t="box"]'); return { cx: t.left + t.width / 2 + 6, tt: t.top, lt: l?.top, lb: l?.bottom, st: bx.scrollTop, lens: !!l, eng: !!document.querySelector("[data-engaged]") }; }, `${CROOT} .slider-track`);
              const lead = Math.max(0, Date.now() - t0 - 120);
              for (let k = 0; k < 12; k++) { await page.mouse.wheel(0, -8); await page.waitForTimeout(16); }
              await page.waitForTimeout(500);
              const st1 = await page.evaluate((B) => document.querySelector(B).scrollTop, BOX);
              x = { g, lead, moved: st1 - g.st };
            } finally { await page.mouse.up(); }
          } finally { const v = page?.video(); await ctx.close(); if (x && v) { x.video = await v.path(); runs.push(x); } }
        }
        const out = [];
        for (const x of runs) {
          const cx = Math.round(x.g.cx), y0 = 0, Hh = 500;
          const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=2:${Hh}:${cx}:${y0}`, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
          const N = Math.floor(raw.length / (Hh * 6)); const d = [];
          for (let k = 0; k < N; k++) {
            const fr = raw.subarray(k * Hh * 6, (k + 1) * Hh * 6); const px = (y) => [fr[y * 6], fr[y * 6 + 1], fr[y * 6 + 2]];
            let lEnd = -1, tTop = -1;
            for (let y = 0; y < Hh; y++) { const [R, G, B] = px(y); if (B > 150 && R < 90 && G < 90) lEnd = y; }
            for (let y = Math.max(0, lEnd + 1); y < Hh; y++) { const [R, G, B] = px(y); if (R > 150 && G < 90 && B < 90) { tTop = y; break; } }
            if (lEnd >= 0 && tTop > lEnd) d.push({ k, dist: tTop - lEnd, y: tTop });
          }
          const s = d.map((q) => q.dist).sort((p, q) => p - q); const med = s.length ? s[s.length >> 1] : NaN;
          const worst = d.length ? Math.max(...d.map((q) => Math.abs(q.dist - med))) : NaN;
          out.push({ n: N, found: d.length, med, worst, moving: d.filter((q, i) => i && q.y !== d[i - 1].y).length, off: d.filter((q) => Math.abs(q.dist - med) > 1).map((q) => `${q.k}:${q.dist - med}`).slice(0, 8).join(" "), moved: x.moved, lens: x.g.lens, eng: x.g.eng, gap0: x.g.tt - x.g.lb });
        }
        return { out };
      } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
    }, 240000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    cell(name, "REPORT", `fine hold, twelve 8 px wheel ticks over the thumb${tf === "scale" ? ", the card under scale 0.8" : ""}; ${marker ? "a blue block in the scroller (the control)" : "lens blue"}, track red, one column; per film: ${r.out.map((x) => `${x.found}/${x.n} frames read, ${x.moving} moving, scrolled ${f(x.moved, 0)} px, lens-to-track median ${x.med} px, worst off ${x.worst} px${x.off ? ` [${x.off}]` : ""} (main-thread gap at the start ${f(x.gap0, 1)} px)`).join(" | ")}${engine === "webkit" ? " · WebKit's film is no one-frame witness (H8 §5)" : ""}`);
  }

  if (want("glidezoom")) { let g0 = null; for (const [tag, css] of [["none", {}], ["0.8", { zoom: "0.8" }], ["1.25", { zoom: "1.25" }]]) {
    const name = `CE9c glidezoom · ${tag}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        await page.evaluate(([B, Q, css]) => { const b = document.querySelector(B); Object.assign(b.style, css); const q = document.querySelector(Q); const br = b.getBoundingClientRect(), rr = q.getBoundingClientRect(), k = br.height / b.offsetHeight; b.scrollTop += (rr.top - (br.top + 60)) / k; }, [BOX, REST, css]);
        await page.waitForTimeout(200);
        await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(700);
        return await page.evaluate(([root, rest]) => new Promise((ok) => {
          const fr = []; const t0 = performance.now(); const h = document.querySelector(root); let ins = -1, k = 0;
          const tick = () => { const r0 = h.getBoundingClientRect(); fr.push({ t: performance.now() - t0, cx: r0.left + r0.width / 2, cy: r0.top + r0.height / 2 }); k++;
            if (k === 6) { const q = document.querySelector(rest); const d = document.createElement("div"); d.style.height = "40px"; q.before(d); ins = fr.length; }
            if (performance.now() - t0 < 900) requestAnimationFrame(tick); else ok({ fr, ins, eng: h.matches("[data-engaged]") }); };
          requestAnimationFrame(tick);
        }), [CROOT, REST]);
      } finally { await P.close(); }
    }, 90000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const { fr, ins } = r; const jump = Math.hypot(fr[ins].cx - fr[ins - 1].cx, fr[ins].cy - fr[ins - 1].cy); const moved = Math.abs(fr[fr.length - 1].cy - fr[ins - 1].cy);
    let mv = 0; for (let k = ins + 1; k < fr.length; k++) mv = Math.max(mv, Math.hypot(fr[k].cx - fr[k - 1].cx, fr[k].cy - fr[k - 1].cy));
    if (tag === "none") g0 = jump;
    cell(name, "REPORT", `engaged ${r.eng}; the scroller ${tag === "none" ? "unzoomed (the control)" : `zoom ${tag}`}; a 40 px block inserted before the row · the root's painted centre moved ${f(jump, 2)} px in the insertion's frame${tag === "none" ? "" : ` (the control ${f(g0, 2)})`}, then at most ${f(mv, 2)} px per frame; the place moved ${f(moved, 1)} px in all`);
  } }

  if (want("flipjitter")) for (const [tf, css] of [["none", null], ["scale", SCALE]]) {
    const name = `CE9c flipjitter · ${tf}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "clipstale");
      try {
        const { page } = P;
        const top0 = await page.evaluate(([B, Q, css]) => { const b = document.querySelector(B); if (css) Object.assign(b.style, css); b.style.position = "relative"; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 6)) / k; const y = b.getBoundingClientRect().top; b.style.top = `${110 - y}px`; return 110 - y; }, [BOX, REST, css]);
        await page.waitForTimeout(250);
        const c = await center(page, CTHUMB);
        await page.mouse.move(c.x, c.y); await page.mouse.down();
        try {
          await page.waitForTimeout(900);
          return await page.evaluate(([B, track, top0]) => new Promise((ok) => {
            const b = document.querySelector(B), out = []; const ch = new MessageChannel(); let n = 0, top = top0, flipAt = -1, wasBelow = null, carried = 0;
            ch.port1.onmessage = () => { const l = document.querySelector(".glass-loupe"), t = document.querySelector(track); if (l && t) { const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); out.push({ n, below: l.hasAttribute("data-engage-lens-below"), rel: a1.top + a1.height / 2 - (d.top + d.height / 2) }); } };
            const tick = () => { n++; const l = document.querySelector(".glass-loupe"); const below = !!l && l.hasAttribute("data-engage-lens-below");
              if (wasBelow !== null && below !== wasBelow && flipAt < 0) flipAt = n; wasBelow = below;
              if (flipAt < 0 && carried < 90) { top -= 2; carried++; b.style.top = `${top}px`; }
              else if (flipAt >= 0) { const i = n - flipAt; if (i % 2 === 0) { top += (i % 4 === 0) ? 6 : -6; b.style.top = `${top}px`; } }
              ch.port2.postMessage(0); if (flipAt < 0 ? carried < 90 || n < 100 : n < flipAt + 40) requestAnimationFrame(tick); else setTimeout(() => ok({ out, flipAt }), 50); };
            requestAnimationFrame(tick);
          }), [BOX, `${CROOT} .slider-track`, top0]);
        } finally { await page.mouse.up(); }
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    const s = r.out ?? []; const after = s.filter((x) => r.flipAt >= 0 && x.n >= r.flipAt);
    let flips = 0, worst = 0; for (let i = 1; i < after.length; i++) { if (after[i].below !== after[i - 1].below) flips++; worst = Math.max(worst, Math.abs(after[i].rel - after[i - 1].rel)); }
    cell(name, "REPORT", `fine hold${tf === "scale" ? " under scale 0.8" : ""}; the card carried to the flip (frame ${r.flipAt}), then ±3 px about it every 2 frames for 40 frames · the lens changed side ${flips} times in ${after.length} post-frame samples · worst one-frame step of its centre against the track's ${f(worst, 1)} px`);
  }

  if (want("dlgloop")) for (const drive of ["esc2", "scrim", "esc1-unengaged"]) {
    const name = `CE9c dlgloop · ${drive}`;
    const r = await guard(name, async () => {
      const P = await openPage(E, T, "presented", { q: { slider: "1" } });
      try {
        const { page } = P; await page.waitForTimeout(700);
        await page.evaluate(() => { const o = window.requestAnimationFrame.bind(window); window.__raf = 0; window.requestAnimationFrame = (cb) => { window.__raf++; return o(cb); }; });
        const from = await page.evaluate(() => { const b = document.querySelector('[role="dialog"] .button'); if (b) b.setAttribute("data-ce9c-from", ""); return !!b; });
        if (from) await page.focus("[data-ce9c-from]"); if (drive !== "esc1-unengaged") await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(700);
        const count = async (ms) => { const a0 = await page.evaluate(() => window.__raf); const t0 = Date.now(); await page.waitForTimeout(ms); const a1 = await page.evaluate(() => window.__raf); return (a1 - a0) / ((Date.now() - t0) / 1000); };
        const st = await page.evaluate(() => { const h = document.querySelector('[data-t="dlg-slider"] .glass-slider') ?? document.querySelector('[role="dialog"] .glass-slider'); return { eng: !!h && h.matches("[data-engaged]") }; });
        const eng = await count(800);
        if (drive === "esc2") { await page.keyboard.press("Escape"); await page.waitForTimeout(40); await page.keyboard.press("Escape"); } else if (drive === "esc1-unengaged") await page.keyboard.press("Escape"); else await page.mouse.click(12, 12);
        const w0 = await count(150), w1 = await count(300); await page.waitForTimeout(1000); const w2 = await count(1500);
        const gone = await page.evaluate(() => !document.querySelector('[role="dialog"] .glass-slider'));
        return { st, eng, w0, w1, w2, gone };
      } finally { await P.close(); }
    }, 60000);
    if (r.crashed) { cell(name, "REPORT", r.line); continue; }
    cell(name, "REPORT", `${drive === "esc1-unengaged" ? "the control: nothing engaged" : "keyboard-engaged"} in the presented Dialog (engaged ${r.st.eng}), dismissed by ${drive}; the slider gone ${r.gone} · page-wide rAF/s engaged ${f(r.eng, 1)}; after the dismissal 0-150 ms ${f(r.w0, 1)}, 150-450 ms ${f(r.w1, 1)}, 1.5-3 s ${f(r.w2, 1)}`);
  }
});
