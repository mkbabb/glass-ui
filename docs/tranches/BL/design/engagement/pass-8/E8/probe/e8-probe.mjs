#!/usr/bin/env node
// e8-probe · P-E8's own cells (D5 pass 8), on the harness's own app and lib (H8 owns ../../../harness; nothing there is edited).
//   tip <pointer> <theme>   CK-25 "no pill cap at the window's centre" (REGISTRY §P7-8.1; H8 §5 gap 1: no H8 cell reads it).
//                 The held slider's loupe, sustained 1200 ms, one still of the housing. Across the band's middle 60 % of rows,
//                 the column where the luma crosses the mid-level between the fill (8 px left of the window's centre) and
//                 the track (8 px right) is found within ±0.6 band of the centre; the spread of that column over the rows
//                 must be ≤ 1.5 px (the fill ends square at the value point). A pill cap curves the crossing by about half
//                 the band. Plant: the pass-7 construction (cand7, the fill's own pill cap).
// Real Safari: UNMEASURED (owner's safaridriver checkbox).
//   node e8-probe.mjs --build <dir> [--engine webkit] [--out <dir>] [--frames <dir>]
import fs from "node:fs";
import path from "node:path";
const H = "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/engagement/harness";
const { witness, openPage, openTouchPage, center, f, GLASS } = await import(`${H}/lib.mjs`);
const { PNG } = (await import(`${GLASS}/node_modules/pngjs/lib/png.js`)).default;
const HOLD = 1200, SPREAD = 1.5;

await witness("E8-probe", "P-E8's loupe tip cell (CK-25: no pill cap at the window's centre)", async ({ a, E, T, cell, guard, engine }) => {
  const frames = typeof a.frames === "string" ? a.frames : null; if (frames) fs.mkdirSync(frames, { recursive: true });
  for (const pointer of ["fine", "coarse"]) for (const theme of ["light", "dark"]) {
    const name = `E8 slider loupe tip square ${pointer} ${theme}`;
    const r = await guard(name, async () => {
      const P = pointer === "fine" ? await openPage(E, T, "slider", { theme }) : await openTouchPage(E, T, "slider", { theme });
      try {
        if (pointer === "coarse" && !P.modeOk) return { mode: P.modeLine };
        const c = await center(P.page, '[role="slider"]');
        const read = async () => {
          const g = await P.page.evaluate(() => {
            const lens = document.querySelector(".glass-loupe"), win = lens?.querySelector(".glass-loupe-window"), clone = lens?.querySelector(".glass-loupe-clone");
            if (!lens || !win || !clone) return null; const R = (e) => e.getBoundingClientRect(); const l = R(lens), w = R(win), cl = R(clone);
            return { lens: { x: l.left, y: l.top, w: l.width, h: l.height }, win: { x: w.left, w: w.width }, band: { y: cl.top, h: cl.height } };
          });
          if (!g) return { none: true };
          const clip = { x: Math.max(0, Math.floor(g.lens.x)), y: Math.max(0, Math.floor(g.lens.y)), width: Math.ceil(g.lens.w), height: Math.ceil(g.lens.h) };
          const buf = P.shot ? await P.shot(clip) : await P.page.screenshot({ clip, animations: "allow" });
          return { g, clip, buf };
        };
        let x;
        if (pointer === "fine") { await P.page.mouse.move(c.x, c.y); await P.page.mouse.down(); try { await P.page.waitForTimeout(HOLD); x = await read(); } finally { await P.page.mouse.up(); } }
        else { [x] = await P.holdAt(c.x, c.y, [HOLD], read); }
        return x;
      } finally { await P.close(); }
    }, 90000);
    if (r.crashed) { cell(name, "FAIL", r.line); continue; }
    if (r.mode) { cell(name, "FAIL", `MODE NOT APPLIED ${r.mode}`); continue; }
    if (r.none) { cell(name, "FAIL", "NO LOUPE"); continue; }
    if (frames) fs.writeFileSync(path.join(frames, `e8-${engine}-${pointer}-${theme}-tip.png`), r.buf);
    const p = PNG.sync.read(r.buf); const L = (x, y) => { const i = (Math.round(y) * p.width + Math.round(x)) * 4; return 0.2126 * p.data[i] + 0.7152 * p.data[i + 1] + 0.0722 * p.data[i + 2]; };
    const { g, clip } = r; const cx = g.win.x + g.win.w / 2 - clip.x; const b = g.band.h; const y0 = g.band.y - clip.y;
    const xs = [];
    for (let y = Math.ceil(y0 + 0.2 * b); y <= Math.floor(y0 + 0.8 * b); y++) {
      const lf = L(cx - 8, y), lt = L(cx + 8, y), mid = (lf + lt) / 2; if (Math.abs(lf - lt) < 6) continue;
      let hit = NaN; for (let xx = Math.round(cx - 0.6 * b); xx < Math.round(cx + 0.6 * b); xx++) { const u = L(xx, y) - mid, v = L(xx + 1, y) - mid; if (u === 0 || u * v < 0) { hit = xx + (u === 0 ? 0 : Math.abs(u) / (Math.abs(u) + Math.abs(v))); if (Math.abs(hit - cx) <= 0.6 * b) break; } }
      if (Number.isFinite(hit)) xs.push(hit);
    }
    if (xs.length < 4) { cell(name, "UNMEASURED", `the fill/track contrast row read on ${xs.length} rows (< 4)`); continue; }
    const spread = Math.max(...xs) - Math.min(...xs);
    cell(name, spread <= SPREAD ? "PASS" : "FAIL", `sustained ${HOLD} ms · the fill's end crosses its mid-level on ${xs.length} band rows at x ${f(Math.min(...xs) - cx, 2)}..${f(Math.max(...xs) - cx, 2)} px from the window's centre · spread ${f(spread, 2)} px (≤ ${SPREAD}: square, no cap) · band ${f(b, 1)} px`);
  }
});
