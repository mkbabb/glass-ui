#!/usr/bin/env node
// P-E7 probe: the cells of E's pass-7 part (REGISTRY §P6-8.1) that the H7 battery does not carry, each with its plant
// read on a plant build. One browser per run (the harness's Engine), a context per cell, closed in finally. Stills only,
// no film screenshots.
//   carry     CK-05 · the slider's release carry read N times (`--reads`, default 10), each read a fling and a still
//             release of the same drive on fresh pages (E-4's drive: three 40 px mouse moves 16 ms apart from the thumb;
//             the still pauses 1000 ms). Per read it prints the RELEASE VELOCITY (the release rule's chord over 100 ms,
//             ring 8, replicated from the page's own pointer events, H7's E-4 method) and the value point's carry
//             difference (fling − still, the furthest forward excursion of the range's leading edge in the page
//             frame). The distribution is printed (min / quartiles / median / max), the velocity beside it, so a low
//             read can be told from a slow drive (a fling the event clock delivered late carries what the rule measured).
//             Cell PASS when every read whose fling measured ≥ 100 px/s carries ≥ 4 px (E-4's TRAVEL).
//   loupe     CK-25 · the loupe at k max (a hold sustained 1200 ms, velocity 0), fine and coarse, light and dark. One
//             still of the housing. Geometry: band (the clone's painted height) over the track's height (= k max ± 5 %);
//             registration (the magnified fill's tip within 2 px of the window's centre). Paint (luma of the still):
//             · seam  on the band's centre row, no column within 2 px of the centre leaves the range of its ±8 px flanks
//                     by more than 6 levels (a ruled line at the tip is an extremum; the fill's own edge is monotone)
//             · line  on the clear-glass row midway between the window's top and the band's top, no column within 2 px
//                     of the centre departs from its ±8 px flanks' mean by more than 6 levels (no line drawn over glass)
//             · runs on  the band's colour distance (RGB) from the glass above it (fill side) at 0.12 band inside the window's end is
//                     ≤ 0.35 of its contrast 1.5 bands inside: what the lens shows continues past it and dissolves,
//                     rather than ending on the window's pill end
//             Plant `loupe6` (the pass-6 loupe: the 2 px mark, no end fade) must FAIL seam or line, and runs on.
//   cliptouch CK-20 · the clip-vanish cell on a TOUCH promotion (H7's cell drives the keyboard's): a touch hold on the
//             thumb in the `clipstale` scene, then per 1 px step the scroller puts 14..22 px of the rest box past its
//             top edge, and one still of the 24 px strip above the scroller; the same steps released are the
//             reference. Two bounds, the row's two clauses: no step paints more than 3 rows × the control's width outside
//             the card (the edge's antialiasing), and adjacent steps change by no more than that (E-10's bound).
//   node e7-probe.mjs --build <dir> [--engine webkit] [--only carry,loupe,cliptouch] [--reads 10] [--frames <dir>]
import { mkdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { witness, openPage, openTouchPage, center, f, GLASS } from "../../../harness/lib.mjs";
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const lumaOf = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2];
  const px = (x, y) => { const i = (Math.round(y) * p.width + Math.round(x)) * 4; return [p.data[i], p.data[i + 1], p.data[i + 2]]; };
  // colour distance (RGB, 0-441): the fill against the glass differs in hue more than in luma in the light theme
  const cd = (x0, y0, x1, y1) => { const u = px(x0, y0), v = px(x1, y1); return Math.hypot(u[0] - v[0], u[1] - v[1], u[2] - v[2]); };
  return { w: p.width, h: p.height, o, at: (x, y) => o[Math.round(y) * p.width + Math.round(x)], cd }; };
const q = (xs, p) => { const s = [...xs].sort((a, b) => a - b); if (!s.length) return NaN; const i = (s.length - 1) * p; const lo = Math.floor(i), hi = Math.ceil(i); return s[lo] + (s[hi] - s[lo]) * (i - lo); };
const dist = (xs, n = 2) => `min ${f(q(xs, 0), n)} · q1 ${f(q(xs, 0.25), n)} · median ${f(q(xs, 0.5), n)} · q3 ${f(q(xs, 0.75), n)} · max ${f(q(xs, 1), n)}`;

await witness("P-E7 probe", "E's pass-7 cells: CK-05 carry with velocity, CK-25 loupe, CK-20 touch clip-vanish", async ({ a, E, T, cell, guard, engine }) => {
  const only = typeof a.only === "string" ? new Set(a.only.split(",")) : null;
  const want = (m) => !only || only.has(m);
  const frames = typeof a.frames === "string" ? a.frames : null;
  const label = typeof a.label === "string" ? a.label : "e7";
  if (frames) mkdirSync(frames, { recursive: true });

  // ── carry ─────────────────────────────────────────────────────────────────────────────────────────
  if (want("carry")) {
    const N = Number(a.reads ?? 10);
    const once = async (still) => {
      const P = await openPage(E, T, "slider", { vp: { width: 700, height: 500 } });
      try {
        const { page } = P;
        await page.evaluate(() => {
          window.__ev = []; for (const t of ["pointerdown", "pointermove", "pointerup"]) addEventListener(t, (e) => window.__ev.push({ t, x: e.clientX, ts: e.timeStamp }), true);
          window.__lead = () => { const el = document.querySelector('[data-e~="point"]') ?? document.querySelector('[data-e~="thumb"]'); const r = el.getBoundingClientRect(); return r.right; };
          window.__film = (ms) => new Promise((ok) => { const fr = []; const t0 = performance.now(); const tick = () => { fr.push({ T: performance.now(), x: window.__lead() }); if (performance.now() - t0 < ms) requestAnimationFrame(tick); else ok(fr); }; requestAnimationFrame(tick); });
        });
        const c = await center(page, '[data-e~="thumb"]');
        const pr = page.evaluate((ms) => window.__film(ms), 120 + 48 + (still ? 1000 : 0) + 2400);
        await page.mouse.move(c.x, c.y); await page.mouse.down(); await page.waitForTimeout(120);
        for (let k = 1; k <= 3; k++) { await page.mouse.move(c.x + 40 * k, c.y); await page.waitForTimeout(16); }
        if (still) await page.waitForTimeout(1000);
        const tRel = await page.evaluate(() => performance.now());
        await page.mouse.up();
        const fr = await pr; const rel = fr.filter((x) => x.T >= tRel && x.T <= tRel + 2000);
        const x0 = rel[0]?.x; const carry = Math.max(0, ...rel.map((x) => x.x - x0));
        const ev = await page.evaluate(() => window.__ev); const up = ev.filter((e) => e.t === "pointerup").at(-1);
        let v = NaN;
        if (up) { const ring = [...ev.filter((e) => e.ts <= up.ts && e.t !== "pointerup").slice(-7), up]; const first = ring.find((e) => up.ts - e.ts <= 100); const dt = (up.ts - first.ts) / 1000; v = dt > 0 ? (up.x - first.x) / dt : 0; }
        return { carry, v, n: rel.length };
      } finally { await P.close(); }
    };
    const reads = [];
    for (let k = 0; k < N; k++) {
      const r = await guard(`carry read ${k + 1}`, async () => ({ fl: await once(false), st: await once(true) }), 90000);
      reads.push(r.crashed ? { bad: r.line } : { d: r.fl.carry - r.st.carry, fl: r.fl.carry, st: r.st.carry, v: r.fl.v, vs: r.st.v });
    }
    const ok = reads.filter((x) => !x.bad);
    const flings = ok.filter((x) => x.v >= 100);
    const pass = ok.length === N && flings.every((x) => x.d >= 4);
    cell("carry slider (CK-05)", pass ? "PASS" : "FAIL", `${N} reads (fling − still, the range's leading edge, page frame): ${reads.map((x, i) => (x.bad ? `${i + 1}: unread` : `${i + 1}: ${f(x.d, 2)} px @ ${f(x.v, 0)} px/s`)).join(" · ")} · distribution ${dist(ok.map((x) => x.d))} px · release velocity ${dist(ok.map((x) => x.v), 0)} px/s · ${ok.length - flings.length} read(s) whose fling the rule measured under 100 px/s · (bound: every read whose fling measured ≥ 100 px/s carries ≥ 4 px)`);
  }

  // ── loupe ─────────────────────────────────────────────────────────────────────────────────────────
  if (want("loupe")) {
    const geom = () => {
      const root = document.querySelector('[data-e~="root"]'); const lens = root?.querySelector(".glass-loupe");
      const win = lens?.querySelector(".glass-loupe-window"); const clone = lens?.querySelector(".glass-loupe-clone"); const fill = lens?.querySelector(".glass-loupe-fill");
      const track = root?.querySelector(".slider-track");
      const R = (e) => (e ? e.getBoundingClientRect() : null); const l = R(lens), w = R(win), c = R(clone), fi = R(fill), t = R(track);
      if (!l || !w || !c || !t) return null;
      return { lens: { x: l.left, y: l.top, w: l.width, h: l.height, op: +getComputedStyle(lens).opacity }, win: { x: w.left, y: w.top, w: w.width, h: w.height }, band: { y: c.top, h: c.height }, tip: fi ? fi.right : NaN, trackH: t.height, kmax: Number.parseFloat(getComputedStyle(lens).getPropertyValue("--loupe-k-max")) };
    };
    for (const pointer of ["fine", "coarse"]) for (const theme of ["light", "dark"]) {
      const name = `loupe ${pointer} ${theme} (CK-25)`;
      const r = await guard(name, async () => {
        const P = pointer === "fine" ? await openPage(E, T, "slider", { theme }) : await openTouchPage(E, T, "slider", { theme });
        try {
          const c = await center(P.page, '[data-e~="thumb"]');
          const read = async () => {
            const g = await P.page.evaluate(geom); if (!g) throw new Error("no loupe");
            const clip = { x: Math.floor(g.lens.x), y: Math.floor(g.lens.y), width: Math.ceil(g.lens.w), height: Math.ceil(g.lens.h) };
            const buf = P.shot ? await P.shot(clip) : await P.page.screenshot({ clip, animations: "allow" });
            if (frames) writeFileSync(path.join(frames, `${label}-${engine}-${pointer}-${theme}-loupe-sustained.png`), buf);
            return { g, clip, L: lumaOf(buf) };
          };
          if (pointer === "fine") { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); try { await P.page.waitForTimeout(1200); return await read(); } finally { await P.page.mouse.up(); } }
          const [x] = await P.holdAt(c.x, c.y, [1200], read); return x;
        } finally { await P.close(); }
      });
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      const { g, clip, L } = r;
      const X = (vx) => vx - clip.x, Y = (vy) => vy - clip.y;
      const cx = X(g.win.x + g.win.w / 2), yb = Y(g.band.y + g.band.h / 2), yg = Y((g.win.y + g.band.y) / 2), b = g.band.h;
      const k = g.band.h / g.trackH; const reg = (g.tip - (g.win.x + g.win.w / 2));
      const rowAt = (y) => (x) => L.at(x, y);
      const B = rowAt(yb), G = rowAt(yg);
      let seam = 0; { const lo = Math.min(B(cx - 8), B(cx + 8)), hi = Math.max(B(cx - 8), B(cx + 8)); for (let x = cx - 2; x <= cx + 2; x++) seam = Math.max(seam, B(x) < lo ? lo - B(x) : B(x) > hi ? B(x) - hi : 0); }
      let line = 0; { const m = (G(cx - 8) + G(cx + 8)) / 2; for (let x = cx - 2; x <= cx + 2; x++) line = Math.max(line, Math.abs(G(x) - m)); }
      const xe = X(g.win.x) + 0.12 * b, xq = X(g.win.x) + 1.5 * b, yo = yb - 0.75 * b;
      const cE = L.cd(xe, yb, xe, yo), cQ = L.cd(xq, yb, xq, yo);
      const runs = cQ > 0 ? cE / cQ : NaN;
      const geoOk = Math.abs(k / g.kmax - 1) <= 0.05 && Math.abs(reg) <= 2 && g.lens.op > 0.9;
      const ok = geoOk && seam <= 6 && line <= 6 && runs <= 0.35;
      cell(name, ok ? "PASS" : "FAIL", `sustained 1200 ms · band ${f(b, 1)} px over the track's ${f(g.trackH, 1)} px = ×${f(k, 3)} (k max ${f(g.kmax, 2)}; bound ±5 %) · the magnified tip ${f(reg, 2)} px from the window's centre (≤ 2) · seam: the band row's centre leaves its flanks' range by ${f(seam, 1)} levels (≤ 6) · line: the glass row's centre departs from its flanks by ${f(line, 1)} levels (≤ 6) · runs on: the fill's colour distance from the glass at the window's end ${f(cE, 1)} against ${f(cQ, 1)} inside = ${f(runs, 2)} (≤ 0.35) · housing ${f(g.lens.w, 1)}×${f(g.lens.h, 1)} px, window ${f(g.win.w, 1)}×${f(g.win.h, 1)} px, opacity ${f(g.lens.op, 2)}`);
    }
  }

  // ── cliptouch ─────────────────────────────────────────────────────────────────────────────────────
  if (want("cliptouch")) {
    const name = "clip-vanish · touch (CK-20)";
    const HIDS = [14, 15, 16, 17, 18, 19, 20, 21, 22];
    const r = await guard(name, async () => {
      const P = await openTouchPage(E, T, "clipstale");
      try {
        const { page } = P;
        const setHid = (hid) => page.evaluate(([hid]) => {
          const b = document.querySelector('[data-t="box"]'), qq = document.querySelector('[data-t="slider-a"]'), h = document.querySelector('[data-t="slider-a"] .glass-slider');
          const br = b.getBoundingClientRect(); const visTop = br.top + b.clientTop; const rr = qq.getBoundingClientRect();
          b.scrollTop += rr.top - (visTop - hid);
          return new Promise((ok) => requestAnimationFrame(() => requestAnimationFrame(() => { const b2 = b.getBoundingClientRect(); ok({ visTop: b2.top + b.clientTop, l: b2.left + b.clientLeft, w: b.clientWidth, eng: h.hasAttribute("data-engaged"), promoted: h.matches(":popover-open"), hw: h.offsetWidth }); })));
        }, [hid]);
        // the thumb must be in view for the touch: scroll the box so the slider sits mid-box first
        await page.evaluate(() => { const b = document.querySelector('[data-t="box"]'), qq = document.querySelector('[data-t="slider-a"]'); const br = b.getBoundingClientRect(), rr = qq.getBoundingClientRect(); b.scrollTop += rr.top - (br.top + br.height / 2 - rr.height / 2); });
        const c = await center(page, '[data-t="slider-a"] [role="slider"]');
        const shot = (clip) => (P.shot ? P.shot(clip) : page.screenshot({ clip }));
        let clipR = null, g0 = null; const engShots = []; let engAll = true, promotedAll = true;
        const times = HIDS.map((_, i) => 700 + 160 * i);
        await P.holdAt(c.x, c.y, times, async () => {
          const hid = HIDS[engShots.length]; const g = await setHid(hid);
          if (!g0) { g0 = g; clipR = { x: Math.max(0, Math.floor(g.l)), y: Math.max(0, Math.floor(g.visTop) - 26), width: Math.floor(g.w), height: 24 }; }
          engAll = engAll && g.eng; promotedAll = promotedAll && g.promoted;
          engShots.push(lumaOf(await shot(clipR)));
        });
        await page.waitForTimeout(800);
        const restShots = [];
        for (const hid of HIDS) { await setHid(hid); await page.waitForTimeout(60); restShots.push(lumaOf(await shot(clipR))); }
        const area = engShots.map((e, k) => { let n = 0; const z = restShots[k]; for (let i = 0; i < e.o.length; i++) if (Math.abs(e.o[i] - z.o[i]) >= 16) n++; return n; });
        return { area, engAll, promotedAll, hw: g0.hw, n: engShots.length };
      } finally { await P.close(); }
    }, 120000);
    if (r.crashed) cell(name, "FAIL", r.line);
    else {
      const steps = r.area.slice(1).map((x, k) => r.area[k] - x); const worst = Math.max(...steps.map(Math.abs)); const bound = 3 * r.hw;
      const most = Math.max(...r.area);
      const driven = r.engAll && r.promotedAll && r.n === HIDS.length;
      // two bounds, the row's two clauses: it never paints outside the box that clips its place (no step's area over
      // the edge's antialiasing, 3 rows × the control's width), and it never leaves in one step (adjacent steps)
      cell(name, !driven ? "FAIL" : worst <= bound && most <= bound ? "PASS" : "FAIL", `${driven ? "" : `NOT DRIVEN: engaged on every step ${r.engAll}, promoted on every step ${r.promotedAll}, ${r.n} of ${HIDS.length} steps · `}touch held, promoted · px² of the strip above the scroller differing from the released strip per 1 px step (hidden ${HIDS.join("/")}): ${r.area.join(" / ")} · painted outside its card: largest ${most} px² (bound ≤ 3 rows × ${r.hw} px = ${bound}) · largest change between adjacent steps ${worst} px² (bound ≤ ${bound})`);
    }
  }
});
