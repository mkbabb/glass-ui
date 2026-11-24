// BM pass 7, Critic B: the figures behind critique-B.md. Two parts.
//
// 1. model (no browser; light):
//      ~/.claude/guard/guarded --light --timeout 2 -- node docs/tranches/BM/study/pass-7/critique-B-check.mjs model
//    The neck's lifetime in time on P7-fuse's own springs and geometry (the page's `spring` and `geo`, copied), for
//    A, B and D (gap = 60p - 52) and for C as the page builds it (its glass window has no `translate`, so its glass is
//    anchored at the dock's right end: gap = 244p - 236); the hold at 2.5 px in each; `--seat-from` as DESIGN §9.3 and
//    `seat-under.next.css` state it; the filter region of the model, the sketch and the page.
//
// 2. chromium (a browser run; never --light):
//      ~/.claude/guard/guarded --timeout 5 -- node docs/tranches/BM/study/pass-7/critique-B-check.mjs chromium
//    P7-fuse in headless Chromium at 390 x 844, on a flat ground with the glyphs hidden: for each lane of section 1,
//    the runs of columns along the dock's centre line that differ from the ground, folded (p = 0) and at the first
//    hold. Layout and clipping only, which both engines draw alike; no backdrop is involved (Frost is off). One
//    browser, one context per cell, closed in finally. Writes critique-B-check.json beside this file.
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
const HERE = path.dirname(new URL(import.meta.url).pathname);
const mode = process.argv[2] || "model";

if (mode === "model") {
  const DOCK = { r: 0.3, z: 0.88 }, PRESS = { r: 0.2, z: 0.8 };
  const spring = (row, d0, v0, t, slow = 1) => {
    const w = (2 * Math.PI) / (row.r * slow), a = row.z * w, wd = w * Math.sqrt(1 - row.z * row.z), B = (v0 + a * d0) / wd;
    return Math.exp(-a * t) * (d0 * Math.cos(wd * t) + B * Math.sin(wd * t));
  };
  const lanes = { "A, B, D (gap = 60p - 52)": (p) => 60 * p - 52, "C as built (gap = 244p - 236)": (p) => 244 * p - 236 };
  const out = {};
  for (const [rowName, row] of Object.entries({ dock: DOCK, press: PRESS })) for (const slow of [1, 4]) for (const [lane, gap] of Object.entries(lanes)) for (const dir of ["open", "fold"]) {
    // open: p from 0 to 1 (d0 = -1 about the target 1); fold: p from 1 to 0 (d0 = 1 about the target 0)
    const p = (t) => (dir === "open" ? 1 + spring(row, -1, 0, t, slow) : spring(row, 1, 0, t, slow));
    let t0 = null, t1 = null, touch = null;
    for (let t = 0; t < 3 * slow; t += 0.0001) {
      const g = gap(p(t)), inNeck = g >= 0 && g < 5;
      if (touch === null && Math.abs(g) < 0.05) touch = t;
      if (inNeck && t0 === null) t0 = t;
      if (inNeck) t1 = t;
    }
    const ms = t0 === null ? 0 : (t1 - t0) * 1000;
    out[`${rowName} x${slow} ${dir} ${lane}`] = { from_ms: t0 === null ? null : +(t0 * 1000).toFixed(1), to_ms: t1 === null ? null : +(t1 * 1000).toFixed(1), neck_ms: +ms.toFixed(1), frames_60: +(ms / 16.67).toFixed(2), frames_30: +(ms / 33.33).toFixed(2) };
  }
  // The first hold, at p = (52 + 2.5) / 60, in A/B/D and in C as built.
  const ph = (52 + 2.5) / 60, xe = 52 + 184 * ph, xs = 244 * ph;
  const hold = { p: +ph.toFixed(4), ABD: { plate: [0, +xe.toFixed(2)], seat: [+xs.toFixed(2), +(xs + 52).toFixed(2)], gap_px: +(xs - xe).toFixed(2) },
    C_as_built: { glass: [+(236 - xe).toFixed(2), 236], seat: [+xs.toFixed(2), +(xs + 52).toFixed(2)], gap_px: +(xs - 236).toFixed(2) },
    C_folded: { glass: [184, 236], seat: [0, 52] } };
  // --seat-from as written: the open width less the disc's, plus the gap and the seat's width less the disc's.
  const OPEN = 236, DISC = 52, GAP = 8, SEATW = 52, seatOpenLeft = OPEN + GAP;
  const seatFrom = (OPEN - DISC) + GAP + (SEATW - DISC);
  const seatFromForm = { written_px: seatFrom, folded_seat: [seatOpenLeft - seatFrom, seatOpenLeft - seatFrom + SEATW], disc: [0, DISC], inside_disc: seatOpenLeft - seatFrom >= 0 && seatOpenLeft - seatFrom + SEATW <= DISC, page_and_model_px: seatOpenLeft };
  // The filter region, CSS px and device px at DPR 3.
  const region = (w, h, xm, ym) => { const W = w * (1 + 2 * xm), H = h * (1 + 2 * ym); return { css: `${+W.toFixed(1)} x ${+H.toFixed(1)}`, device_px_dpr3: Math.round(W * H * 9) }; };
  const regions = { model_fuse_json: { css: "320 x 76", device_px_dpr3: 218880 }, sketch_layer_is_dock_root_236x52: region(236, 52, 0.1, 0.6), page_layer_is_stage_330x120: region(330, 120, 0.1, 0.6) };
  regions.sketch_layer_is_dock_root_236x52.covers_x = [-23.6, 259.6];
  console.log(JSON.stringify({ neck: out, hold, seatFromForm, regions }, null, 1));
} else {
  const { chromium } = await import("playwright");
  const html = `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<style>body{margin:0}</style></head><body>${readFileSync(path.resolve(HERE, "../pages/P7-fuse.html"), "utf8")}</body></html>`;
  const FLAT = `.stage{background:var(--stripe-b)!important}.stage::after{display:none!important}.faces,.moon{display:none!important}`;
  const rows = [];
  const browser = await chromium.launch({ headless: true });
  try {
    for (const cell of ["folded", "hold"]) {
      const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: 1, colorScheme: "light", reducedMotion: "no-preference" });
      try {
        const page = await ctx.newPage();
        await page.setContent(html, { waitUntil: "load" });
        await page.addStyleTag({ content: FLAT });
        if (cell === "hold") { await page.click('[data-hold="seat"]'); await page.waitForTimeout(1500); }
        for (const lane of ["under", "meet", "goo", "cut"]) {
          const stage = page.locator(`.stage[data-lane="${lane}"]`);
          const shot = (await stage.screenshot({ type: "png" })).toString("base64");
          const runs = await page.evaluate(async (shot) => {
            const img = new Image(); img.src = "data:image/png;base64," + shot; await img.decode();
            const cv = document.createElement("canvas"); cv.width = img.width; cv.height = img.height;
            const g = cv.getContext("2d"); g.drawImage(img, 0, 0);
            const y = 60, px = g.getImageData(0, y, cv.width, 1).data, ground = [px[4], px[5], px[6]];
            const runs = []; let start = null;
            for (let x = 0; x < cv.width; x++) {
              const d = Math.abs(px[4 * x] - ground[0]) + Math.abs(px[4 * x + 1] - ground[1]) + Math.abs(px[4 * x + 2] - ground[2]);
              if (d > 6 && start === null) start = x;
              if (d <= 6 && start !== null) { runs.push([start, x - 1]); start = null; }
            }
            if (start !== null) runs.push([start, cv.width - 1]);
            return runs;
          }, shot);
          rows.push({ cell, lane, runs_at_centre_line: runs });
        }
      } finally { await ctx.close(); }
    }
  } finally { await browser.close(); }
  writeFileSync(path.join(HERE, "critique-B-check.json"), JSON.stringify({ at: new Date().toISOString(), engine: "playwright chromium headless (no GPU; layout and clipping only)", rows }, null, 1));
  for (const r of rows) console.log(r.cell.padEnd(7), r.lane.padEnd(6), JSON.stringify(r.runs_at_centre_line));
}
