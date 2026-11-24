// The owner's compass frame (2026-11-23 23:18): glass.babb.dev's sidebar rail, its active seat (the section's icon in
// its selection disc). Glyph box against the seat box and against the run's selection mark, at 1440, light and dark,
// at rest and hovered. Run: guarded -- node active.mjs chromium | guarded --exclusive webkit -- node active.mjs webkit
import { chromium, webkit } from "playwright";
import { writeFileSync } from "node:fs";
const name = process.argv[2] === "webkit" ? "webkit" : "chromium";
const engine = name === "webkit" ? webkit : chromium;
const rows = [];
const browser = await engine.launch({ headless: true });
try {
  for (const w of [1440, 1024]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: 900 }, colorScheme: scheme, deviceScaleFactor: 2 });
    try {
      const p = await ctx.newPage();
      await p.goto("https://glass.babb.dev/foundations", { waitUntil: "networkidle", timeout: 30000 });
      await p.mouse.move(w * 0.6, 450); await p.waitForTimeout(900);
      const read = (state) => p.evaluate((state) => {
        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), cx: +(b.x + b.width / 2).toFixed(2), cy: +(b.y + b.height / 2).toFixed(2) }; };
        const seat = [...document.querySelectorAll('.glass-dock [aria-current="page"]')].find((s) => s.getBoundingClientRect().x < 120 && s.querySelector("svg"));
        if (!seat) return { state, none: true };
        const svg = seat.querySelector("svg");
        const dock = seat.closest(".glass-dock");
        const mark = dock.querySelector(".dock-run-mark");
        const pb = getComputedStyle(seat, "::before");
        const s = r(seat), g = r(svg), m = r(mark);
        return { state, seat: s, glyph: g, mark: m, dock: r(dock), before: { inset: pb.inset, w: pb.width, h: pb.height, radius: pb.borderRadius, bg: pb.backgroundColor, op: pb.opacity, scale: pb.scale, transform: pb.transform },
          glyphVsSeat: { dx: +(g.cx - s.cx).toFixed(2), dy: +(g.cy - s.cy).toFixed(2) }, glyphVsMark: m && m.w ? { dx: +(g.cx - m.cx).toFixed(2), dy: +(g.cy - m.cy).toFixed(2) } : null,
          seatVsDock: { dx: +(s.cx - r(dock).cx).toFixed(2) }, pad: { l: +(g.x - s.x).toFixed(2), r: +(s.x + s.w - g.x - g.w).toFixed(2), t: +(g.y - s.y).toFixed(2), b: +(s.y + s.h - g.y - g.h).toFixed(2) } };
      }, state);
      const rest = await read("rest");
      const seatBox = rest.seat;
      if (seatBox) { await p.mouse.move(seatBox.cx, seatBox.cy); await p.waitForTimeout(700); }
      const hover = await read("hover");
      for (const m of [rest, hover]) {
        rows.push({ engine: name, width: w, scheme, ...m });
        console.log(`${name} ${w} ${scheme.padEnd(5)} ${m.state.padEnd(5)} seat ${m.seat && m.seat.w + "x" + m.seat.h} glyph ${m.glyph && m.glyph.w + "x" + m.glyph.h} g-seat ${JSON.stringify(m.glyphVsSeat)} g-mark ${JSON.stringify(m.glyphVsMark)} mark ${m.mark && m.mark.w + "x" + m.mark.h} seat-dock ${JSON.stringify(m.seatVsDock)} pad ${JSON.stringify(m.pad)} before ${m.before && m.before.w + "x" + m.before.h + " " + m.before.inset}`);
      }
      if (seatBox) { try { await p.locator('.glass-dock [aria-current="page"]').first().screenshot({ path: `active-${name}-${w}-${scheme}.png`, timeout: 3000 }); } catch {} }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`active-${name}.json`, JSON.stringify(rows, null, 1));
