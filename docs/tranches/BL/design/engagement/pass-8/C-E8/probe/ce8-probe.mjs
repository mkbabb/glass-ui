#!/usr/bin/env node
// ce8-probe · C-E8's own cells (D5 pass 8, the critic), on the harness's own app and lib (H8 owns ../../../harness; nothing
// there is edited). Every cell reads the `clipstale` row (a 400×120 scrolling card holding the slider) unless named.
//   anc <kind> · <mode>   THE INVARIANT on ancestor kinds H8 does not read (REGISTRY §P7-8.1: "an engaged control's body paints
//          exactly what its place would paint (every clip, mask, radius and transform of its ancestors)"). The card is given
//          <kind> (none | opacity 0.5 | filter invert(1) | clip-path inset(0 45% 0 0) | rotate 3deg | the row's feather, read
//          two-sided over the whole card), the rest box 40 px inside the card. Region: the card's painted box + 8 px. vis(x) =
//          Σ|luma(x) − luma(the same region with the control hidden)|. ratio = vis(engaged) / vis(released 800 ms later). The
//          cell: ratio(kind) / ratio(none), same mode, TWO-SIDED, 0.90..1.10 (an in-place body reads 1; H8's feather bound is
//          the upper side only). Also printed: px² differing ≥ 16 levels engaged against released, kind over none. Modes:
//          keyboard (promotes), touch (promotes; the loupe hidden: the invariant exempts it), fine (in place: the control)
//   trail · <drive> · <mode>   "in the same frame its place moves" (P-E8 §8 gap 3: a scroll the main thread does not run). The
//          spacer above the control painted red, the slider root's own paint below it; a recorded film of the card (1:1, no mid-film
//          screenshot); per decoded frame, in one column through the root (12 px in from its left end), the row where the red
//          spacer ends and the first row below it that is neither red nor the page's white (the root's top); their distance must stay within 1.5 px of its median over every
//          frame where both are found (a body that trails its place by a frame moves that distance by the frame's scroll).
//          Drives: wheel-away (six 8 px wheel ticks at the card's bottom-left, not over the control: Chromium scrolls
//          that on the compositor), wheel-over (the same over the control: the stage's own wheel listener), raf (scrollTop
//          += 6 per animation frame, 8 frames, main thread). Modes: keyboard (promoted) ×3, released ×2 (in place, never
//          engaged: the control). WebKit's 25 fps film is printed, not read as a one-frame witness (H8 §5)
//   loupe place · <tf> · <pointer>   the loupe over its track under an ancestor transform (the card translate 0 30px or
//          scale 0.8 from its corner, or none): sustained 1200 ms, the lens's centre x against the held track's painted centre
//          x, the lens's bottom against the track's painted top, and the band (the clone's painted height) over the held
//          track's painted height = k. Cell: |Δx|, |Δy| against the same read untransformed ≤ 2 px, and k within ±5 % of
//          the lens's --loupe-k-max (E-13's bound)
//   loupe viewport · <pointer>   the loupe at the VIEWPORT's top edge (the card moved to the page's top, the rest box 4 px
//          below the card's edge, as E-13's edge cell): the lens's top ≥ 0 (it paints whole)
// Real Safari: UNMEASURED (owner's safaridriver checkbox). Playwright WebKit is not Safari.
//   node ce8-probe.mjs --build <dir> [--engine webkit] [--out <dir>] [--frames <dir>] [--only anc,trail,loupe]
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { execFileSync } from "node:child_process";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, openTouchPage, center, tabKey, f, GLASS, INIT } = await import(`${H}/lib.mjs`);
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const luma = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; return { w: p.width, h: p.height, o }; };
const SC = "clipstale", BOX = '[data-t="box"]', REST = '[data-t="slider-a"]', ROOT = '[data-t="slider-a"] .glass-slider', THUMB = '[data-t="slider-a"] [role="slider"]';
const LENS = ".glass-loupe", CLONE = ".glass-loupe-clone", TRACK = '[data-t="slider-a"] .slider-track';
const KINDS = { none: {}, opacity: { opacity: "0.5" }, filter: { filter: "invert(1)" }, clippath: { clipPath: "inset(0 45% 0 0)" }, rotate: { rotate: "3deg" }, feather: "feather" };
const RR = 0.10, TRAIL = 1.5, PLACE = 2, KTOL = 0.05;

await witness("CE8-probe", "C-E8's cells: the invariant on more ancestor kinds, the body's trail on a compositor scroll, the loupe's place", async ({ a, E, T, cell, guard, engine }) => {
  const only = new Set(typeof a.only === "string" ? a.only.split(",") : ["anc", "trail", "loupe"]);
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const shotOf = (P, clip) => (P.shot ? P.shot(clip) : P.page.screenshot({ clip, animations: "allow" }));
  const hideSel = (page, sels) => page.evaluate((s) => { const st = document.createElement("style"); st.textContent = `${s} { visibility: hidden !important; }`; document.head.appendChild(st); }, sels);
  const setHid = (page, hid) => page.evaluate(([B, Q, hid]) => { const b = document.querySelector(B), q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k - hid)) / k; return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => ok(b.scrollTop)))); }, [BOX, REST, hid]);
  const stateOf = (page) => page.evaluate((R) => { const h = document.querySelector(R); return { eng: h.matches("[data-engaged]"), promoted: h.matches(":popover-open") }; }, ROOT);
  const engage = async (P, mode, during) => {
    const { page } = P;
    if (mode === "keyboard") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); const d = await during(); await page.keyboard.press("Escape"); return d; }
    const c = await center(page, THUMB);
    if (mode === "fine") { await page.mouse.move(c.x, c.y); await page.mouse.down(); try { await page.waitForTimeout(700); return await during(); } finally { await page.mouse.up(); } }
    const [d] = await P.holdAt(c.x, c.y, [700], during); return d;
  };
  const open = (mode, o = {}) => (mode === "fine" || mode === "keyboard" ? openPage(E, T, SC, o) : openTouchPage(E, T, SC, o));

  // ── anc: the invariant on more ancestor kinds, two-sided ──
  if (only.has("anc")) {
    const res = {};
    for (const mode of ["keyboard", "touch", "fine"]) for (const kind of Object.keys(KINDS)) {
      const name = `CE8 anc ${kind} · ${mode}`;
      const r = await guard(name, async () => {
        const P = await open(mode);
        try {
          if (mode === "touch" && !P.modeOk) return { mode: P.modeLine };
          const { page } = P;
          await hideSel(page, `.glass-focus-veil${mode !== "keyboard" ? ", .glass-loupe" : ""}`);
          const k = KINDS[kind];
          if (k === "feather") await page.evaluate((B) => { const e = document.querySelector(B); e.classList.add("fading-scroll", "fading-scroll--y"); e.setAttribute("data-fade-start", ""); e.setAttribute("data-fade-end", ""); }, BOX);
          else await page.evaluate(([B, css]) => Object.assign(document.querySelector(B).style, css), [BOX, k]);
          await setHid(page, kind === "feather" ? -4 : -40); await page.waitForTimeout(150);
          const reg = await page.evaluate((B) => { const r = document.querySelector(B).getBoundingClientRect(); return { x: r.left, y: r.top, w: r.width, h: r.height }; }, BOX);
          const clip = { x: Math.max(0, Math.floor(reg.x) - 8), y: Math.max(0, Math.floor(reg.y) - 8), width: Math.ceil(reg.w) + 16, height: Math.ceil(reg.h) + 16 };
          await page.evaluate((Q) => { document.querySelector(Q).style.visibility = "hidden"; }, REST); await page.waitForTimeout(100);
          const empty = luma(await shotOf(P, clip));
          await page.evaluate((Q) => { document.querySelector(Q).style.visibility = ""; }, REST); await page.waitForTimeout(150);
          let engBuf = null;
          const d = await engage(P, mode, async () => { engBuf = await shotOf(P, clip); return { st: await stateOf(page) }; });
          await page.waitForTimeout(800);
          const relBuf = await shotOf(P, clip); const z = await stateOf(page);
          return { d, z, empty, eng: luma(engBuf), rel: luma(relBuf), engBuf, relBuf };
        } finally { await P.close(); }
      }, 120000);
      res[`${kind}|${mode}`] = r;
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
      const vis = (x) => { let s = 0; for (let i = 0; i < x.o.length; i++) s += Math.abs(x.o[i] - r.empty.o[i]); return s; };
      let n = 0; for (let i = 0; i < r.eng.o.length; i++) if (Math.abs(r.eng.o[i] - r.rel.o[i]) >= 16) n++;
      r.ratio = vis(r.eng) / Math.max(1, vis(r.rel)); r.n = n;
      if (frames) { fs.writeFileSync(path.join(frames, `ce8-${engine}-anc-${kind}-${mode}-engaged.png`), r.engBuf); fs.writeFileSync(path.join(frames, `ce8-${engine}-anc-${kind}-${mode}-released.png`), r.relBuf); }
      const base = res[`none|${mode}`];
      const driven = r.d.st.eng && !r.z.eng;
      if (kind === "none") { cell(name, driven ? "REPORT" : "FAIL", `${driven ? "" : "NOT DRIVEN · "}${mode} engaged (promoted ${r.d.st.promoted}) · the reference: visibility engaged over released ×${f(r.ratio, 3)} (the grow's own gain); ${n} px² differ ≥ 16 levels`); continue; }
      if (!base || base.crashed || base.mode || !base.ratio) { cell(name, "UNMEASURED", `no reference read for ${mode}`); continue; }
      const rr = r.ratio / base.ratio, nn = n / Math.max(1, base.n);
      cell(name, !driven ? "FAIL" : Math.abs(rr - 1) <= RR ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN (engaged ${r.d.st.eng}, released ${!r.z.eng}) · `}${mode} engaged (promoted ${r.d.st.promoted}) · the card ${kind} · visibility over the card's region engaged over released ×${f(r.ratio, 3)} against ×${f(base.ratio, 3)} untouched · ratio of ratios ${f(rr, 3)} (bound ${1 - RR}..${1 + RR}; an in-place body reads 1) · px² differing ≥ 16 levels engaged against released ${n} against ${base.n} untouched (×${f(nn, 2)})`);
    }
  }

  // ── trail: does the promoted body move in the frame its place moves ──
  if (only.has("trail")) for (const drive of ["wheel-away", "wheel-over", "raf"]) {
    const name = `CE8 trail · ${drive}`;
    const r = await guard(name, async () => {
      const vdir = fs.mkdtempSync(path.join(os.tmpdir(), "ce8trail-"));
      try {
        const b = await E.nav(); const runs = [];
        for (const mode of ["engaged", "released", "engaged", "released", "engaged"]) {
          const ctx = await b.newContext({ viewport: { width: 700, height: 500 }, deviceScaleFactor: 1, reducedMotion: "no-preference", recordVideo: { dir: vdir, size: { width: 700, height: 500 } } });
          let page, x = null, t0 = 0;
          try {
            page = await ctx.newPage(); t0 = Date.now();
            await page.addInitScript(INIT);
            await page.goto(`${T.url}?${new URLSearchParams({ scene: SC, theme: "light" })}`);
            await page.waitForFunction(() => window.__e && window.__e.ready === true, null, { timeout: 60000 });
            await page.evaluate(() => { const st = document.createElement("style"); st.textContent = `.glass-focus-veil { visibility: hidden !important; } [data-t="spacer"] { background: rgb(230, 0, 0) !important; } [data-t="slider-a"] .glass-slider { background: rgb(0, 0, 230) !important; outline: none !important; }`; document.head.appendChild(st); });
            if (mode === "engaged") { await page.focus('[data-sentinel="before"]'); await page.keyboard.press(tabKey(engine)); await page.waitForTimeout(600); }
            await setHid(page, -92); await page.waitForTimeout(500);
            const g = await page.evaluate(([B, R]) => { const b = document.querySelector(B).getBoundingClientRect(), r = document.querySelector(R).getBoundingClientRect(); return { bl: b.left, bt: b.top, br: b.right, bb: b.bottom, rl: r.left, rt: r.top, rb: r.bottom, rc: r.left + r.width / 2, rm: r.top + r.height / 2 }; }, [BOX, ROOT]);
            const st0 = await stateOf(page); const s0 = await page.evaluate((B) => document.querySelector(B).scrollTop, BOX);
            const lead = Math.max(0, Date.now() - t0 - 300);
            if (drive === "wheel-away") { await page.mouse.move(g.bl + 8, g.bb - 6); for (let k = 0; k < 6; k++) { await page.mouse.wheel(0, 8); await page.waitForTimeout(16); } }
            else if (drive === "wheel-over") { await page.mouse.move(g.rc + 40, g.rm); for (let k = 0; k < 6; k++) { await page.mouse.wheel(0, 8); await page.waitForTimeout(16); } }
            else await page.evaluate((B) => new Promise((ok) => { const b = document.querySelector(B); let n = 0; const t = () => { b.scrollTop += 6; if (++n < 8) requestAnimationFrame(t); else ok(); }; requestAnimationFrame(t); }), BOX);
            await page.waitForTimeout(700);
            const s1 = await page.evaluate((B) => document.querySelector(B).scrollTop, BOX); const st1 = await stateOf(page);
            x = { mode, g, st0, st1, moved: s1 - s0, lead };
          } finally { const v = page?.video(); await ctx.close(); if (x && v) { x.video = await v.path(); runs.push(x); } }
        }
        const out = [];
        for (const x of runs) {
          const cx = Math.round(x.g.rl + 12), y0 = Math.max(0, Math.floor(x.g.bt) - 4), Hh = 2 * Math.ceil((x.g.bb - x.g.bt + 8) / 2);
          const raw = execFileSync("ffmpeg", ["-v", "error", "-i", x.video, "-ss", `${x.lead / 1000}`, "-vf", `crop=2:${Hh}:${cx}:${y0}`, "-pix_fmt", "rgb24", "-f", "rawvideo", "-"], { maxBuffer: 1 << 28 });
          const N = Math.floor(raw.length / (Hh * 6)); const d = [];
          for (let k = 0; k < N; k++) {
            const fr = raw.subarray(k * Hh * 6, (k + 1) * Hh * 6); const col = Buffer.alloc(Hh * 3); for (let y = 0; y < Hh; y++) fr.copy(col, y * 3, y * 6, y * 6 + 3);
            const red = (y) => col[y * 3] > 150 && col[y * 3 + 1] < 90 && col[y * 3 + 2] < 90, blue = (y) => !red(y) && Math.abs(col[y * 3] - 250) + Math.abs(col[y * 3 + 1] - 249) + Math.abs(col[y * 3 + 2] - 247) > 40;
            let rEnd = -1, bTop = -1;
            for (let y = 0; y < Hh; y++) if (red(y)) rEnd = y;
            for (let y = Math.max(0, rEnd + 1); y < Hh; y++) if (blue(y)) { bTop = y; break; }
            if (rEnd >= 0 && rEnd < Hh - 2 && bTop > rEnd) d.push({ k, dist: bTop - rEnd, rEnd });
          }
          if (process.env.CE8_DEBUG && out.length === 0) { const k = 2; const fr = raw.subarray(k * Hh * 6, (k + 1) * Hh * 6); const rows = []; for (let y = 0; y < Hh; y += 4) rows.push(`${y}:${fr[y * 6]},${fr[y * 6 + 1]},${fr[y * 6 + 2]}`); console.log(`  debug ${x.mode} cx ${cx} y0 ${y0} Hh ${Hh} g ${JSON.stringify(x.g)} · ${rows.join(" ")}`); }
          const sorted = d.map((q) => q.dist).sort((p, q) => p - q); const med = sorted.length ? sorted[sorted.length >> 1] : NaN;
          const dev = d.map((q) => Math.abs(q.dist - med)); const worst = dev.length ? Math.max(...dev) : NaN;
          const moving = new Set(d.filter((q, i) => i && q.rEnd !== d[i - 1].rEnd).map((q) => q.k));
          out.push({ mode: x.mode, n: N, found: d.length, med, worst, at: d.filter((q) => Math.abs(q.dist - med) > TRAIL).map((q) => `${q.k}:${q.dist - med}`).slice(0, 12), movingFrames: moving.size, eng0: x.st0.eng, prom0: x.st0.promoted, moved: x.moved });
        }
        return { out };
      } finally { fs.rmSync(vdir, { recursive: true, force: true }); }
    }, 480000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    const eng = r.out.filter((x) => x.mode === "engaged"), rel = r.out.filter((x) => x.mode === "released");
    const line = (x) => `${x.found} of ${x.n} frames read (${x.movingFrames} with the spacer moving), distance median ${x.med} px, worst ${x.worst} px off${x.at.length ? ` (frame:Δ ${x.at.join(" ")})` : ""}, scrolled ${f(x.moved, 0)} px`;
    const undriven = eng.filter((x) => !x.prom0 || !(x.moved > 20) || x.movingFrames < 2).length + rel.filter((x) => x.eng0 || !(x.moved > 20)).length;
    const bad = eng.filter((x) => x.worst > TRAIL);
    const status = engine === "webkit" ? "REPORT" : undriven ? "FAIL" : bad.length ? "FAIL" : "PASS";
    cell(`${name} · engaged`, status, `${undriven ? `NOT DRIVEN (${undriven} films not promoted, not engaged as named, or not scrolled) · ` : ""}keyboard-promoted, the card moved by ${drive} · the red spacer's end to the root's top, per film frame, against its median (bound ≤ ${TRAIL} px) · ${eng.map(line).join(" | ")} · ${bad.length} of ${eng.length} over${engine === "webkit" ? " (WebKit's 25 fps film: printed, not a one-frame witness)" : ""}`);
    cell(`${name} · released`, "REPORT", rel.map(line).join(" | "));
  }

  // ── the loupe's place under an ancestor transform, and at the viewport's edge ──
  if (only.has("loupe")) {
    const geo = (page) => page.evaluate(([L, C, Tr]) => { const l = document.querySelector(L), c = document.querySelector(C), t = document.querySelector(Tr); if (!l || !c || !t) return null; const R = (e) => e.getBoundingClientRect(); const a = R(l), b = R(c), d = R(t); if (!(a.width > 0)) return null; return { lx: a.left + a.width / 2, lt: a.top, lb: a.bottom, lh: a.height, band: b.height, tx: d.left + d.width / 2, tt: d.top, th: d.height, kmax: Number.parseFloat(getComputedStyle(l).getPropertyValue("--loupe-k-max")), op: +getComputedStyle(l).opacity }; }, [LENS, CLONE, TRACK]);
    for (const pointer of ["fine", "coarse"]) {
      const base = {};
      for (const [tf, css] of [["none", {}], ["translate", { translate: "0 30px" }], ["scale", { scale: "0.8", transformOrigin: "0 0" }]]) {
        const name = `CE8 loupe place · ${tf} · ${pointer}`;
        const r = await guard(name, async () => {
          const P = pointer === "fine" ? await openPage(E, T, SC) : await openTouchPage(E, T, SC);
          try {
            if (pointer === "coarse" && !P.modeOk) return { mode: P.modeLine };
            await hideSel(P.page, ".glass-focus-veil");
            await P.page.evaluate(([B, css]) => Object.assign(document.querySelector(B).style, css), [BOX, css]);
            await setHid(P.page, -50); await P.page.waitForTimeout(150);
            const c = await center(P.page, THUMB); let g, buf;
            const read = async () => { g = await geo(P.page); if (g) buf = await shotOf(P, { x: Math.max(0, Math.floor(Math.min(g.lx - 90, g.tx - 200))), y: Math.max(0, Math.floor(g.lt) - 10), width: 400, height: Math.ceil(g.tt + g.th - g.lt) + 30 }); return g; };
            if (pointer === "fine") { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); try { await P.page.waitForTimeout(1200); await read(); } finally { await P.page.mouse.up(); } }
            else await P.holdAt(c.x, c.y, [1200], read);
            return { g, buf };
          } finally { await P.close(); }
        }, 90000);
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
        if (!r.g) { cell(name, "FAIL", "NO LOUPE"); continue; }
        if (frames && r.buf) fs.writeFileSync(path.join(frames, `ce8-${engine}-loupe-place-${tf}-${pointer}.png`), r.buf);
        const g = r.g; const dx = g.lx - g.tx, dy = g.lb - g.tt, k = g.band / g.th;
        if (tf === "none") { base.dx = dx; base.dy = dy; }
        const ddx = dx - (base.dx ?? dx), ddy = dy - (base.dy ?? dy); const kOk = Math.abs(k / g.kmax - 1) <= KTOL;
        const ok = Math.abs(ddx) <= PLACE && Math.abs(ddy) <= PLACE && kOk && g.op > 0.9;
        cell(name, ok ? "PASS" : "FAIL", `${pointer} hold sustained 1200 ms · the card ${tf} · the lens's centre ${f(dx, 1)} px from the held track's painted centre, its bottom ${f(dy, 1)} px from the track's painted top (untransformed: ${f(base.dx, 1)}, ${f(base.dy, 1)}; Δ ${f(ddx, 1)}, ${f(ddy, 1)}, bound ≤ ${PLACE}) · band ${f(g.band, 1)} px over the painted track's ${f(g.th, 1)} px = ×${f(k, 3)} (k max ${f(g.kmax, 2)} ±${KTOL * 100} %) · lens ${f(g.lh, 1)} px tall, opacity ${f(g.op, 2)}`);
      }
      const name = `CE8 loupe viewport · ${pointer}`;
      const r = await guard(name, async () => {
        const P = pointer === "fine" ? await openPage(E, T, SC) : await openTouchPage(E, T, SC);
        try {
          if (pointer === "coarse" && !P.modeOk) return { mode: P.modeLine };
          await P.page.evaluate((B) => { const st = document.createElement("style"); st.textContent = `.glass-focus-veil { visibility: hidden !important; } body > #app p:first-of-type, #app p { display: none !important; }`; document.head.appendChild(st); const b = document.querySelector(B); let y = b.getBoundingClientRect().top; document.body.style.marginTop = `${-(y - 2)}px`; }, BOX);
          await P.page.evaluate(([B, Q]) => { const b = document.querySelector(B), q = document.querySelector(Q); const br = b.getBoundingClientRect(), rr = q.getBoundingClientRect(); b.scrollTop += rr.top - (br.top + b.clientTop + 4); }, [BOX, REST]);
          await P.page.waitForTimeout(200);
          const c = await center(P.page, THUMB); let g;
          if (pointer === "fine") { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); try { await P.page.waitForTimeout(1200); g = await geo(P.page); } finally { await P.page.mouse.up(); } }
          else [g] = await P.holdAt(c.x, c.y, [1200], () => geo(P.page));
          const bt = await P.page.evaluate((B) => document.querySelector(B).getBoundingClientRect().top, BOX);
          return { g, bt };
        } finally { await P.close(); }
      }, 90000);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
      if (!r.g) { cell(name, "FAIL", "NO LOUPE"); continue; }
      const off = Math.max(0, -r.g.lt);
      cell(name, off <= 0.5 ? "PASS" : "FAIL", `${pointer} hold, the card at the viewport's top (its edge at ${f(r.bt, 1)} px), the rest box 4 px below it · the lens ${f(r.g.lt, 1)}..${f(r.g.lb, 1)} px: ${f(off, 1)} of ${f(r.g.lh, 1)} px (${f((100 * off) / r.g.lh, 0)} %) above the viewport, unpainted`);
    }
  }
});
