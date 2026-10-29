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
const HOLD = 1200, KTOL = 0.05, REG = 2, SEAM = 6, LINE = 6, RUNS = 0.35, ROW_PX = 3, ROW_LEVELS = 8, WHOLE_TOL = 0.05;

await witness("E-13", "CK-25 the loupe: k max, registration, seam, line, run-on; painted whole at a scroller's edge", async ({ a, E, T, cell, guard, idx, engine }) => {
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
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
  for (const [sc, m] of rows.filter(([, m]) => !m.clip)) for (const pointer of ["fine", "coarse"]) for (const theme of ["light", "dark"]) {
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
  }
});
