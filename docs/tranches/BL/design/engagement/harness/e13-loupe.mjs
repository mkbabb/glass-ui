#!/usr/bin/env node
// E-13 · CK-25: the loupe (pass 8, H8; REGISTRY §P7-8.1: "the loupe alone leaves its place, and paints whole"; §P7-7 item 9:
// "a cure measured where its cost cannot show"). On scenes whose row names `loupe` ({ lens, window, clone, fill, track }).
// A held slider's loupe, sustained 1200 ms (velocity 0), fine (a mouse hold on the thumb) and coarse (a held touch, H-4):
//   loupe k max <pointer> <theme>   on loupe rows without a `clip` (P-E7's four loupe cells, moved here from its probe, the
//                    candidate's construction their reference): geometry, the band (the clone's painted height) over the
//                    held track's height = the lens's --loupe-k-max ± 5 %; registration, the magnified fill's tip within 2 px
//                    of the window's centre; paint, on one still of the housing: seam (the band's centre row: no column within
//                    2 px of the window's centre leaves the range of its ±8 px flanks by more than 6 levels: a ruled line at
//                    the tip is an extremum, the fill's own edge is monotone), line (the clear-glass row midway between the
//                    window's top and the band's top: no column within 2 px of the centre departs from its flanks' mean by
//                    more than 6 levels), runs on (the band's RGB distance from the glass above it 0.12 band inside the
//                    window's start is ≤ 0.35 of the same 1.5 bands inside: the band dissolves rather than ending on the
//                    window's pill end); the housing's opacity > 0.9. Plant `e13-loupemark` (P-E7's `loupe6`)
//   loupe whole · edge|mid · <pointer>   on loupe rows WITH a `clip` (C-A7's `cliploupe`, made a gating cell): the rest box
//                    4 px below its scroller's top edge (edge) or mid-box (mid); the loupe's own box read on one still held
//                    and one released 900 ms later; a row of the box is PAINTED when ≥ 3 of its pixels differ by ≥ 8 levels.
//                    The painted fraction of the lens's rows must reach the same fraction read on the first loupe row
//                    without a clip (the unclipped reference, read in the same run, same pointer) − 0.05, the housing's
//                    opacity > 0.9: the lens paints whole wherever its control sits. The row's `veil` is hidden (a page-wide
//                    paint, not the lens). The geometry (how much of the lens
//                    lies above the scroller's clip edge) is printed. Plant `e13-loupecut` (the lens rides inside the box)
//   H9 (pass 9; REGISTRY §P8-7 item 5, C-E8's ce8-probe loupe cells; CK-25 "the loupe carries its track's painted transform
//                    and paints whole at the viewport's top"), on loupe rows WITH a `clip`:
//   loupe place · none|translate|scale · <pointer>   the scroller under `translate: 0 30px`, `scale: 0.8` (origin 0 0) or
//                    neither, the rest box 50 px inside it, a hold sustained 1200 ms: k = the band (the clone's painted
//                    height) over the held track's painted height within ±5 % of --loupe-k-max; the lens's centre at the
//                    same fraction along the painted track as untransformed (Δ × the painted track's width ≤ 2 px); its
//                    bottom's distance to the track's painted top within 2 px of the untransformed one; opacity > 0.9.
//                    Plant `e13-loupeplace` (the lens without its ancestors' scale)
//   loupe viewport · <pointer>   the scroller moved to the viewport's top (its edge 2 px below it), the rest box 4 px below
//                    the scroller's edge: the lens's painted rows (inside the viewport; a row above it is unpainted) over
//                    all its rows ≥ the unclipped reference's fraction − 0.05, opacity > 0.9; the lens's extent above the
//                    viewport printed. Plant `e13-loupeviewport` (no fallback at the root scroller's edge)
//   H10 (pass 10; REGISTRY §P9-7 items 3-5; C-E9 §1.3 "E-13's 1200 ms hold passed it"; CK-25 "within 2 px of its track on every
//                    frame it shows"), on loupe rows WITH a `clip`:
//   loupe clock · enter|exit · none|translate|scale · <pointer>   the card as `loupe place`, nothing scrolled: per frame (a task posted
//                    from requestAnimationFrame, after that frame's paint) from before the press (enter) or the release (exit):
//                    the lens's pinned edge (bottom on the track's painted top; top on its bottom when it hangs below) and its
//                    centre across the track's; on every frame the lens shows (opacity > 0.05) both ≤ 2 px; NOT DRIVEN unless a
//                    frame reads opacity or scale in flight. Plant `e13-loupeclock` (the correction inside the animated
//                    transform, both engines); the pass-9 candidate in Chromium (`../pass-10/H10.md`)
//   loupe exit scroll · none|scale   REPORT (§P9-7 item 5): a fine hold, the scroller scrolled 2 px a frame across the release; the
//                    pinned edge on each frame the lens shows. Control `e13-exitfrozen` (prints the separation)
//   H11 (pass 11; REGISTRY §P10-7 items 1, 4): `loupe clock · enter|exit · zoom 0.8|1.25|2|2.5 · fine`, the scroller under an ancestor
//                    CSS zoom, the same read. Plant `e13-loupeclockzoom` (the lens's writes in painted px, not its own zoomed CSS px);
//                    the pass-10 candidate (`../pass-11/H11.md`)
//   `--part clock` runs H10's cells alone. (with H11's)
// Light theme for the whole cells; the k max cells light and dark. Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node e13-loupe.mjs --build <dir> | --fixture [--fault e13-loupecut] [--engine webkit] [--frames <dir>]
import fs from "node:fs";
import path from "node:path";
import { witness, openPage, openTouchPage, scenesFor, center, f, GLASS } from "./lib.mjs";
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const lumaOf = (buf) => { const p = PNG.sync.read(buf); const o = new Float32Array(p.width * p.height); for (let i = 0, j = 0; i < p.data.length; i += 4, j++) o[j] = 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2];
  const px = (x, y) => { const i = (Math.round(y) * p.width + Math.round(x)) * 4; return [p.data[i], p.data[i + 1], p.data[i + 2]]; };
  const cd = (x0, y0, x1, y1) => { const u = px(x0, y0), v = px(x1, y1); return Math.hypot(u[0] - v[0], u[1] - v[1], u[2] - v[2]); };
  return { w: p.width, h: p.height, o, at: (x, y) => o[Math.round(y) * p.width + Math.round(x)], cd }; };
const PLACE = 2;
const HOLD = 1200, KTOL = 0.05, REG = 2, SEAM = 6, LINE = 6, RUNS = 0.35, ROW_PX = 3, ROW_LEVELS = 8, WHOLE_TOL = 0.05;

await witness("E-13", "CK-25 the loupe: k max, registration, seam, line, run-on; painted whole at a scroller's edge", async ({ a, E, T, cell, guard, idx, engine }) => {
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  const part = typeof a.part === "string" ? new Set(a.part.split(",")) : null; const old = !part || part.has("old"); const wantClock = !part || part.has("clock");
  const rows = scenesFor(idx, "E-13").filter(([, m]) => m.loupe);
  const shotOf = (P, clip) => (P.shot ? P.shot(clip) : P.page.screenshot({ clip, animations: "allow" }));
  const thumbOf = (m) => m.thumb ?? '[data-e~="thumb"]';
  // a held slider read at +HOLD ms: fine a mouse hold on the thumb, coarse a held touch
  const held = async (P, m, pointer, read) => {
    const c = await center(P.page, thumbOf(m));
    if (pointer === "fine") { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); try { await P.page.waitForTimeout(HOLD); return await read(); } finally { await P.page.mouse.up(); } }
    const [x] = await P.holdAt(c.x, c.y, [HOLD], read); return x;
  };
  const open = (sc, pointer, theme) => (pointer === "fine" ? openPage(E, T, sc, { theme }) : openTouchPage(E, T, sc, { theme }));

  // ── k max, registration, seam, line, run-on ──
  for (const [sc, m] of old ? rows.filter(([, m]) => !m.clip) : []) for (const pointer of ["fine", "coarse"]) for (const theme of ["light", "dark"]) {
    const name = `E-13 ${sc} loupe k max ${pointer} ${theme}`;
    const L = m.loupe;
    const r = await guard(name, async () => {
      const P = await open(sc, pointer, theme);
      try {
        if (pointer === "coarse" && !P.modeOk) return { mode: P.modeLine };
        return await held(P, m, pointer, async () => {
          const g = await P.page.evaluate((L) => {
            const lens = document.querySelector(L.lens), win = lens?.querySelector(L.window), clone = lens?.querySelector(L.clone), fill = lens?.querySelector(L.fill), track = document.querySelector(L.track);
            const R = (e) => (e ? e.getBoundingClientRect() : null); const l = R(lens), w = R(win), c = R(clone), fi = R(fill), t = R(track);
            if (!l || !w || !c || !t) return { missing: [["lens", l], ["window", w], ["clone", c], ["track", t]].filter(([, v]) => !v).map(([k]) => k) };
            return { lens: { x: l.left, y: l.top, w: l.width, h: l.height, op: +getComputedStyle(lens).opacity }, win: { x: w.left, y: w.top, w: w.width, h: w.height }, band: { y: c.top, h: c.height }, tip: fi ? fi.right : NaN, trackH: t.height, kmax: Number.parseFloat(getComputedStyle(lens).getPropertyValue("--loupe-k-max")) };
          }, L);
          if (g.missing) return { g };
          const clip = { x: Math.max(0, Math.floor(g.lens.x)), y: Math.max(0, Math.floor(g.lens.y)), width: Math.ceil(g.lens.w), height: Math.ceil(g.lens.h) };
          const buf = await shotOf(P, clip);
          if (frames) fs.writeFileSync(path.join(frames, `e13-${engine}-${sc}-${pointer}-${theme}-loupe.png`), buf);
          return { g, clip, Lm: lumaOf(buf) };
        });
      } finally { await P.close(); }
    }, 90000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
    if (r.g.missing) { cell(name, "FAIL", `NO LOUPE: the held slider renders no ${r.g.missing.join(", ")} (${Object.values(L).join(", ")})`); continue; }
    const { g, clip, Lm } = r;
    const X = (vx) => vx - clip.x, Y = (vy) => vy - clip.y;
    const cx = X(g.win.x + g.win.w / 2), yb = Y(g.band.y + g.band.h / 2), yg = Y((g.win.y + g.band.y) / 2), b = g.band.h;
    const k = g.band.h / g.trackH; const reg = g.tip - (g.win.x + g.win.w / 2);
    const B = (x) => Lm.at(x, yb), G = (x) => Lm.at(x, yg);
    let seam = 0; { const lo = Math.min(B(cx - 8), B(cx + 8)), hi = Math.max(B(cx - 8), B(cx + 8)); for (let x = cx - 2; x <= cx + 2; x++) seam = Math.max(seam, B(x) < lo ? lo - B(x) : B(x) > hi ? B(x) - hi : 0); }
    let line = 0; { const mm = (G(cx - 8) + G(cx + 8)) / 2; for (let x = cx - 2; x <= cx + 2; x++) line = Math.max(line, Math.abs(G(x) - mm)); }
    const xe = X(g.win.x) + 0.12 * b, xq = X(g.win.x) + 1.5 * b, yo = yb - 0.75 * b;
    const cE = Lm.cd(xe, yb, xe, yo), cQ = Lm.cd(xq, yb, xq, yo); const runs = cQ > 0 ? cE / cQ : NaN;
    const geoOk = Math.abs(k / g.kmax - 1) <= KTOL && Math.abs(reg) <= REG && g.lens.op > 0.9;
    const ok = geoOk && seam <= SEAM && line <= LINE && runs <= RUNS;
    cell(name, ok ? "PASS" : "FAIL", `sustained ${HOLD} ms · band ${f(b, 1)} px over the held track's ${f(g.trackH, 1)} px = ×${f(k, 3)} (k max ${f(g.kmax, 2)}; bound ±${KTOL * 100} %) · the magnified tip ${f(reg, 2)} px from the window's centre (≤ ${REG}) · seam: the band row's centre leaves its flanks' range by ${f(seam, 1)} levels (≤ ${SEAM}) · line: the glass row's centre departs from its flanks by ${f(line, 1)} levels (≤ ${LINE}) · runs on: the band's colour distance from the glass at the window's start ${f(cE, 1)} against ${f(cQ, 1)} inside = ${f(runs, 2)} (≤ ${RUNS}) · housing ${f(g.lens.w, 1)}×${f(g.lens.h, 1)} px, window ${f(g.win.w, 1)}×${f(g.win.h, 1)} px, opacity ${f(g.lens.op, 2)}`);
  }

  // ── painted whole: the lens's painted rows, held against released ──
  const ref = rows.find(([, m]) => !m.clip);
  const whole = async (sc, m, pointer, where) => {
    const P = await open(sc, pointer, "light");
    try {
      if (pointer === "coarse" && !P.modeOk) return { mode: P.modeLine };
      // a page-wide veil (the row's `veil`) is not the lens: hidden, so a row reads painted by the lens alone
      if (m.veil) await P.page.evaluate((v) => { const st = document.createElement("style"); st.textContent = `${v} { visibility: hidden !important; }`; document.head.appendChild(st); }, m.veil);
      if (where && m.clip) {
        await P.page.evaluate(([B, Q, where]) => { const b = document.querySelector(B), q = document.querySelector(Q); const br = b.getBoundingClientRect(), rr = q.getBoundingClientRect(); const want = where === "edge" ? br.top + b.clientTop + 4 : br.top + br.height / 2 - rr.height / 2; b.scrollTop += rr.top - want; }, [m.clip.box, m.clip.rest, where]);
        await P.page.waitForTimeout(200);
      }
      const geo = () => P.page.evaluate(([L, B]) => {
        const lens = document.querySelector(L.lens); const b = B ? document.querySelector(B) : null; const br = b?.getBoundingClientRect();
        const l = lens?.getBoundingClientRect(); return { lens: l && l.width > 0 ? { x: l.left, y: l.top, w: l.width, h: l.height, op: +getComputedStyle(lens).opacity } : null, edge: br ? br.top + b.clientTop : null };
      }, [m.loupe, m.clip?.box ?? null]);
      const h = await held(P, m, pointer, async () => { const g = await geo(); if (!g.lens) return { g }; const clip = { x: Math.max(0, Math.floor(g.lens.x) - 2), y: Math.max(0, Math.floor(g.lens.y) - 2), width: Math.ceil(g.lens.w) + 4, height: Math.ceil(g.lens.h) + 4 }; const buf = await shotOf(P, clip); return { g, clip, buf, Lh: lumaOf(buf) }; });
      if (!h.g.lens) return { none: true, g: h.g };
      await P.page.waitForTimeout(900);
      const Lr = lumaOf(await shotOf(P, h.clip));
      let painted = 0; const rowsN = h.clip.height - 4;
      for (let y = 2; y < h.clip.height - 2; y++) { let n = 0; for (let x = 0; x < h.clip.width; x++) { const i = y * h.clip.width + x; if (Math.abs(h.Lh.o[i] - Lr.o[i]) >= ROW_LEVELS) n++; } if (n >= ROW_PX) painted++; }
      return { g: h.g, frac: painted / rowsN, painted, rowsN, buf: h.buf };
    } finally { await P.close(); }
  };
  const clipRows = rows.filter(([, m]) => m.clip);
  for (const pointer of ["fine", "coarse"]) {
    if (!clipRows.length) break;
    // ── H10: the lens on its own clocks: the pinned edge per frame, raise and exit (REGISTRY §P9-7 items 3, 4) ──
    if (wantClock) for (const [sc, m] of clipRows) {
      const place = (P, css) => P.page.evaluate(([B, Q, css]) => { const b = document.querySelector(B); Object.assign(b.style, css); const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 50)) / k; }, [m.clip.box, m.clip.rest, css]);
      // the sampler: requestAnimationFrame posts a task, which runs after that frame's paint and reads the lens; `sc` scrolls the box
      const arm = (P, ms, scroll) => P.page.evaluate(([L, ms, B]) => { window.__lc = []; const ch = new MessageChannel(); const t0 = performance.now(); let n = 0; const b = B ? document.querySelector(B) : null;
        ch.port1.onmessage = () => { const l = document.querySelector(L.lens), t = document.querySelector(L.track); if (!l || !t) return; const a1 = l.getBoundingClientRect(), d = t.getBoundingClientRect(); if (!(a1.width > 0)) return; const cs = getComputedStyle(l); const rel = a1.top + a1.height / 2 - (d.top + d.height / 2); window.__lc.push({ n, t: performance.now() - t0, op: +cs.opacity, sc: cs.scale, pin: rel < 0 ? a1.bottom - d.top : a1.top - d.bottom, dx: a1.left + a1.width / 2 - (d.left + d.width / 2) }); };
        const tick = () => { n++; if (b && n <= 25) b.scrollTop += 2; ch.port2.postMessage(0); if (performance.now() - t0 < ms) requestAnimationFrame(tick); }; requestAnimationFrame(tick); }, [m.loupe, ms, scroll ? m.clip.box : null]);
      const inFlight = (x) => (x.op > 0.05 && x.op < 0.95) || (x.sc !== "none" && Math.abs(Number.parseFloat(x.sc) - 1) > 0.01);
      // H11 (REGISTRY §P10-7 items 1, 4; §P10-8.3 wave 1): the clocks under an ancestor CSS zoom, fine (the card's scroller zoomed; the
      // lens inherits it, top layer or not): 0.8, 1.25, 2 and 2.5, where the pass-10 candidate's per-frame correction diverges
      const ZOOMS = pointer === "fine" ? [["zoom 0.8", { zoom: "0.8" }], ["zoom 1.25", { zoom: "1.25" }], ["zoom 2", { zoom: "2" }], ["zoom 2.5", { zoom: "2.5" }]] : [];
      for (const phase of ["enter", "exit"]) for (const [tf, css] of [["none", {}], ["translate", { translate: "0 30px" }], ["scale", { scale: "0.8", transformOrigin: "0 0" }], ...ZOOMS]) {
        const name = `E-13 ${sc} loupe clock · ${phase} · ${tf} · ${pointer}`;
        const r = await guard(name, async () => {
          const P = await open(sc, pointer, "light");
          try {
            if (pointer === "coarse" && !P.modeOk) return { mode: P.modeLine };
            if (m.veil) await P.page.evaluate((v) => { const st = document.createElement("style"); st.textContent = `${v} { visibility: hidden !important; }`; document.head.appendChild(st); }, m.veil);
            await place(P, css); await P.page.waitForTimeout(200);
            const c = await center(P.page, thumbOf(m));
            if (pointer === "fine") {
              await P.page.mouse.move(c.x, c.y);
              if (phase === "enter") await arm(P, 750);
              await P.page.mouse.down();
              try { await P.page.waitForTimeout(phase === "enter" ? 800 : HOLD); if (phase === "exit") await arm(P, 1000); } finally { await P.page.mouse.up(); }
              await P.page.waitForTimeout(phase === "enter" ? 400 : 900);
            } else {
              if (phase === "enter") await arm(P, 750);
              await P.holdAt(c.x, c.y, [phase === "enter" ? 800 : HOLD], async () => { if (phase === "exit") await arm(P, 1800); });
              await P.page.waitForTimeout(900);
            }
            return { s: await P.page.evaluate(() => window.__lc) };
          } finally { await P.close(); }
        }, 90000);
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
        const S = (r.s ?? []).filter((x) => x.op > 0.05); const mids = S.filter(inFlight);
        if (!S.length) { cell(name, "FAIL", `NO LOUPE: the lens shows on no frame (${(r.s ?? []).length} read)`); continue; }
        if (!mids.length) { cell(name, "FAIL", `NOT DRIVEN: no frame reads the lens's opacity or scale in flight (${S.length} shown frames)`); continue; }
        const worst = S.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p.pin) ? x : p), S[0]); const wdx = S.reduce((p, x) => (Math.abs(x.dx) > Math.abs(p.dx) ? x : p), S[0]);
        const half = S.find((x) => x.op >= 0.5) ?? S[0];
        const ok = Math.abs(worst.pin) <= PLACE && Math.abs(wdx.dx) <= PLACE;
        cell(name, ok ? "PASS" : "FAIL", `${pointer} ${phase === "enter" ? "from before the press" : "from before the release"}, the card ${tf} · the lens shows on ${S.length} frames, ${mids.length} in flight · worst pinned edge ${f(worst.pin, 1)} px at frame ${worst.n} (opacity ${f(worst.op, 2)}, scale ${worst.sc}), worst across ${f(wdx.dx, 1)} px (each ≤ ${PLACE}) · at the first frame with opacity ≥ 0.5: ${f(half.pin, 1)} px · ${mids.slice(0, 8).map((x) => `${x.n}:${f(x.pin, 1)}@${f(x.op, 2)}`).join(" ")}`);
      }
      // ── the exit while the page moves: REPORT (§P9-7 item 5) ──
      if (pointer === "fine") for (const [tf, css] of [["none", {}], ["scale", { scale: "0.8", transformOrigin: "0 0" }]]) {
        const name = `E-13 ${sc} loupe exit scroll · ${tf}`;
        const r = await guard(name, async () => {
          const P = await open(sc, "fine", "light");
          try {
            if (m.veil) await P.page.evaluate((v) => { const st = document.createElement("style"); st.textContent = `${v} { visibility: hidden !important; }`; document.head.appendChild(st); }, m.veil);
            await place(P, css); await P.page.waitForTimeout(200);
            const c = await center(P.page, thumbOf(m)); await P.page.mouse.move(c.x, c.y); await P.page.mouse.down();
            try { await P.page.waitForTimeout(HOLD); await arm(P, 1000, true); } finally { await P.page.mouse.up(); }
            await P.page.waitForTimeout(900);
            return { s: await P.page.evaluate(() => window.__lc) };
          } finally { await P.close(); }
        }, 90000);
        if (r.crashed) { cell(name, "REPORT", r.line); continue; }
        const S = (r.s ?? []).filter((x) => x.op > 0.05); const mids = S.filter(inFlight);
        if (!S.length) { cell(name, "REPORT", "the lens shows on no frame"); continue; }
        const worst = S.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p.pin) ? x : p), S[0]);
        const wm = mids.length ? mids.reduce((p, x) => (Math.abs(x.pin) > Math.abs(p.pin) ? x : p), mids[0]) : null;
        cell(name, "REPORT", `a fine hold, the scroller scrolled 2 px a frame across the release, the card ${tf} · the lens shows on ${S.length} frames, ${mids.length} in flight · worst pinned edge ${f(worst.pin, 1)} px at frame ${worst.n} (opacity ${f(worst.op, 2)}); on the exit's own frames ${wm ? `${f(wm.pin, 1)} px at opacity ${f(wm.op, 2)}` : "none read"} · ${mids.slice(0, 10).map((x) => `${x.n}:${f(x.pin, 1)}@${f(x.op, 2)}`).join(" ")}`);
      }
    }
    if (!old) continue;
    let refR = null;
    if (ref) { refR = await guard(`E-13 ${ref[0]} loupe whole reference · ${pointer}`, () => whole(ref[0], ref[1], pointer, null), 90000); }
    const refOk = refR && !refR.crashed && !refR.none && !refR.mode;
    if (refR) cell(`E-13 ${ref[0]} loupe whole reference · ${pointer}`, "REPORT", refR.crashed ? `unread: ${refR.line}` : refR.mode ? `MODE NOT APPLIED ${refR.mode}` : refR.none ? "no loupe box while held" : `unclipped: ${refR.painted} of ${refR.rowsN} lens rows painted (${f(refR.frac * 100, 1)} %), opacity ${f(refR.g.lens.op, 2)}`);
    for (const [sc, m] of clipRows) for (const where of ["edge", "mid"]) {
      const name = `E-13 ${sc} loupe whole · ${where} · ${pointer}`;
      const r = await guard(name, () => whole(sc, m, pointer, where), 90000);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
      if (r.none) { cell(name, "FAIL", `NO LOUPE: the held slider renders no ${m.loupe.lens} box`); continue; }
      if (!refOk) { cell(name, "UNMEASURED", `no unclipped reference (${ref ? ref[0] : "no loupe row without a clip"}) · ${r.painted} of ${r.rowsN} lens rows painted`); continue; }
      if (frames && r.buf) fs.writeFileSync(path.join(frames, `e13-${engine}-${sc}-${where}-${pointer}-loupe-whole.png`), r.buf);
      const above = r.g.edge == null ? 0 : Math.max(0, Math.min(r.g.lens.y + r.g.lens.h, r.g.edge) - r.g.lens.y);
      const bound = refR.frac - WHOLE_TOL; const ok = r.frac >= bound && r.g.lens.op > 0.9;
      cell(name, ok ? "PASS" : "FAIL", `${pointer} hold, the rest box ${where === "edge" ? "4 px below its scroller's top edge" : "mid-box"} · ${r.painted} of ${r.rowsN} lens rows painted (${f(r.frac * 100, 1)} %; a row is painted when ≥ ${ROW_PX} of its pixels differ ≥ ${ROW_LEVELS} levels held against released) · bound ≥ the unclipped reference's ${f(refR.frac * 100, 1)} % − ${WHOLE_TOL * 100} = ${f(bound * 100, 1)} %, opacity ${f(r.g.lens.op, 2)} (> 0.9) · geometry: the lens ${f(r.g.lens.y, 1)}..${f(r.g.lens.y + r.g.lens.h, 1)} px, the scroller's clip edge at ${f(r.g.edge, 1)} px: ${f(above, 1)} of ${f(r.g.lens.h, 1)} px of the lens lie above it`);
    }
    // ── H9: the lens at the VIEWPORT's top (the root scroller's edge): every build of pass 8 drew 90-92 % of it above ──
    for (const [sc, m] of clipRows) {
      const name = `E-13 ${sc} loupe viewport · ${pointer}`;
      const r = await guard(name, async () => {
        const P = await open(sc, pointer, "light");
        try {
          if (pointer === "coarse" && !P.modeOk) return { mode: P.modeLine };
          if (m.veil) await P.page.evaluate((v) => { const st = document.createElement("style"); st.textContent = `${v} { visibility: hidden !important; }`; document.head.appendChild(st); }, m.veil);
          await P.page.evaluate(([B, Q]) => { const b = document.querySelector(B); const y = b.getBoundingClientRect().top; document.body.style.marginTop = `${-(y - 2)}px`; const q = document.querySelector(Q); const br = b.getBoundingClientRect(), rr = q.getBoundingClientRect(); b.scrollTop += rr.top - (br.top + b.clientTop + 4); }, [m.clip.box, m.clip.rest]);
          await P.page.waitForTimeout(200);
          const geo = () => P.page.evaluate(([L, B]) => { const lens = document.querySelector(L.lens); const l = lens?.getBoundingClientRect(); return { lens: l && l.width > 0 ? { x: l.left, y: l.top, w: l.width, h: l.height, op: +getComputedStyle(lens).opacity } : null, edge: document.querySelector(B).getBoundingClientRect().top }; }, [m.loupe, m.clip.box]);
          const h = await held(P, m, pointer, async () => { const g = await geo(); if (!g.lens) return { g }; const y0 = Math.max(0, Math.floor(g.lens.y) - 2), y1 = Math.min(500, Math.ceil(g.lens.y + g.lens.h) + 2); if (y1 - y0 < 4) return { g, none: true }; const clip = { x: Math.max(0, Math.floor(g.lens.x) - 2), y: y0, width: Math.ceil(g.lens.w) + 4, height: y1 - y0 }; const buf = await shotOf(P, clip); return { g, clip, buf, Lh: lumaOf(buf) }; });
          if (!h.g.lens) return { none: true, g: h.g };
          if (h.none) return { g: h.g, frac: 0, painted: 0, rowsN: Math.round(h.g.lens.h) };
          await P.page.waitForTimeout(900);
          const Lr = lumaOf(await shotOf(P, h.clip));
          // rows of the lens box inside the viewport that paint; the rows above the viewport count as unpainted
          const top = h.g.lens.y, rowsN = Math.round(h.g.lens.h); let painted = 0;
          for (let y = 0; y < h.clip.height; y++) { const vy = h.clip.y + y; if (vy < top || vy >= top + h.g.lens.h) continue; let n = 0; for (let x = 0; x < h.clip.width; x++) { const i = y * h.clip.width + x; if (Math.abs(h.Lh.o[i] - Lr.o[i]) >= ROW_LEVELS) n++; } if (n >= ROW_PX) painted++; }
          return { g: h.g, frac: painted / rowsN, painted, rowsN, buf: h.buf };
        } finally { await P.close(); }
      }, 90000);
      if (r.crashed) { cell(name, "FAIL", r.line); continue; }
      if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
      if (r.none && !r.g?.lens) { cell(name, "FAIL", `NO LOUPE: the held slider renders no ${m.loupe.lens} box`); continue; }
      if (!refOk) { cell(name, "UNMEASURED", `no unclipped reference · ${r.painted} of ${r.rowsN} lens rows painted`); continue; }
      if (frames && r.buf) fs.writeFileSync(path.join(frames, `e13-${engine}-${sc}-viewport-${pointer}-loupe.png`), r.buf);
      const above = Math.max(0, Math.min(r.g.lens.h, -r.g.lens.y)); const bound = refR.frac - WHOLE_TOL; const ok = r.frac >= bound && r.g.lens.op > 0.9;
      cell(name, ok ? "PASS" : "FAIL", `${pointer} hold, the scroller's top edge at ${f(r.g.edge, 1)} px (the viewport's top), the rest box 4 px below it · ${r.painted} of ${r.rowsN} lens rows painted (${f(r.frac * 100, 1)} %; a row above the viewport is unpainted) · bound ≥ the unclipped reference's ${f(refR.frac * 100, 1)} % − ${WHOLE_TOL * 100} = ${f(bound * 100, 1)} %, opacity ${f(r.g.lens.op, 2)} (> 0.9) · the lens ${f(r.g.lens.y, 1)}..${f(r.g.lens.y + r.g.lens.h, 1)} px: ${f(above, 1)} px above the viewport`);
    }
    // ── H9: the lens under an ancestor transform (C-E8's loupe place): it carries its track's painted transform ──
    for (const [sc, m] of clipRows) {
      let base = null;
      for (const [tf, css] of [["none", {}], ["translate", { translate: "0 30px" }], ["scale", { scale: "0.8", transformOrigin: "0 0" }]]) {
        const name = `E-13 ${sc} loupe place · ${tf} · ${pointer}`;
        const r = await guard(name, async () => {
          const P = await open(sc, pointer, "light");
          try {
            if (pointer === "coarse" && !P.modeOk) return { mode: P.modeLine };
            if (m.veil) await P.page.evaluate((v) => { const st = document.createElement("style"); st.textContent = `${v} { visibility: hidden !important; }`; document.head.appendChild(st); }, m.veil);
            await P.page.evaluate(([B, Q, css]) => { const b = document.querySelector(B); Object.assign(b.style, css); const q = document.querySelector(Q); const br = b.getBoundingClientRect(), k = br.height / b.offsetHeight, rr = q.getBoundingClientRect(); b.scrollTop += (rr.top - (br.top + b.clientTop * k + 50)) / k; }, [m.clip.box, m.clip.rest, css]);
            await P.page.waitForTimeout(200);
            let buf = null;
            const g = await held(P, m, pointer, async () => {
              const x = await P.page.evaluate((L) => { const l = document.querySelector(L.lens), c = l?.querySelector(L.clone), t = document.querySelector(L.track); if (!l || !c || !t) return null; const a1 = l.getBoundingClientRect(), b1 = c.getBoundingClientRect(), d = t.getBoundingClientRect(); if (!(a1.width > 0)) return null; return { lx: a1.left + a1.width / 2, lt: a1.top, lb: a1.bottom, lh: a1.height, band: b1.height, tl: d.left, tw: d.width, tt: d.top, th: d.height, kmax: Number.parseFloat(getComputedStyle(l).getPropertyValue("--loupe-k-max")), op: +getComputedStyle(l).opacity }; }, m.loupe);
              if (x && frames) buf = await shotOf(P, { x: Math.max(0, Math.floor(Math.min(x.lx - 90, x.tl)) - 4), y: Math.max(0, Math.floor(x.lt) - 10), width: Math.min(560, Math.ceil(Math.max(x.tw, 180)) + 8), height: Math.min(300, Math.ceil(x.tt + x.th - x.lt) + 30) });
              return x;
            });
            return { g, buf };
          } finally { await P.close(); }
        }, 90000);
        if (r.crashed) { cell(name, "FAIL", r.line); continue; }
        if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
        if (!r.g) { cell(name, "FAIL", `NO LOUPE: the held slider renders no ${m.loupe.lens} with its ${m.loupe.clone} and ${m.loupe.track}`); continue; }
        if (frames && r.buf) fs.writeFileSync(path.join(frames, `e13-${engine}-${sc}-place-${tf}-${pointer}-loupe.png`), r.buf);
        const g = r.g; const u = (g.lx - g.tl) / g.tw, dy = g.lb - g.tt, k = g.band / g.th;
        if (tf === "none") base = { u, dy };
        const du = base ? (u - base.u) * g.tw : NaN, ddy = base ? dy - base.dy : NaN;
        const kOk = Math.abs(k / g.kmax - 1) <= KTOL; const ok = base && Math.abs(du) <= PLACE && Math.abs(ddy) <= PLACE && kOk && g.op > 0.9;
        cell(name, ok ? "PASS" : "FAIL", `${pointer} hold sustained ${HOLD} ms · the scroller ${tf === "none" ? "untransformed (the reference)" : Object.entries(css).map(([p2, v]) => `${p2} ${v}`).join(", ")} · band ${f(g.band, 1)} px over the held track's painted ${f(g.th, 1)} px = ×${f(k, 3)} (k max ${f(g.kmax, 2)} ± ${KTOL * 100} %) · the lens's centre at ${f(u * 100, 1)} % along the painted track (Δ against untransformed ${f(du, 1)} px, ≤ ${PLACE}) · its bottom ${f(dy, 1)} px from the track's painted top (Δ ${f(ddy, 1)} px, ≤ ${PLACE}) · lens ${f(g.lh, 1)} px tall, opacity ${f(g.op, 2)}`);
      }
    }
  }
});
