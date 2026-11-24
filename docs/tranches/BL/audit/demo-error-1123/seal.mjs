// The owner (2026-11-23 23:18): "the icon is offset and the dock animates poorly--the icon therein is offset and padded
// incorrectly". On glass.babb.dev's folded dock: the glyph's box against the disc's box, at 1440 and 390, light and dark.
// Run: guarded -- node seal.mjs chromium | guarded --exclusive webkit -- node seal.mjs webkit
import { chromium, webkit } from "playwright";
import { writeFileSync } from "node:fs";
const engine = process.argv[2] === "webkit" ? webkit : chromium;
const name = process.argv[2] === "webkit" ? "webkit" : "chromium";
const rows = [];
const browser = await engine.launch({ headless: true });
try {
  for (const w of [1440, 390]) for (const scheme of ["light", "dark"]) {
    const ctx = await browser.newContext({ viewport: { width: w, height: w === 390 ? 844 : 900 }, hasTouch: w === 390, colorScheme: scheme, deviceScaleFactor: 2 });
    try {
      const p = await ctx.newPage();
      await p.goto("https://glass.babb.dev/foundations", { waitUntil: "networkidle", timeout: 30000 });
      // Fold the sidebar: point into it, then away (collapse="open" folds when the pointer leaves).
      await p.mouse.move(40, 300); await p.waitForTimeout(700);
      await p.mouse.move(w * 0.6, 450); await p.waitForTimeout(1800);
      const m = await p.evaluate(() => {
        const r = (el) => { if (!el) return null; const b = el.getBoundingClientRect(); return { x: +b.x.toFixed(2), y: +b.y.toFixed(2), w: +b.width.toFixed(2), h: +b.height.toFixed(2), cx: +(b.x + b.width / 2).toFixed(2), cy: +(b.y + b.height / 2).toFixed(2) }; };
        return [...document.querySelectorAll(".glass-dock")].map((dock) => {
          const face = dock.querySelector(".demo-sidebar-face") || dock.querySelector("#collapsed");
          const svg = face && face.querySelector("svg");
          const cs = getComputedStyle(dock);
          const seat = svg && svg.closest("button, a, [role=button]");
          return { expanded: dock.getAttribute("data-expanded"), collapsedAttr: dock.className.slice(0, 120), dock: r(dock), face: r(face), seat: r(seat), glyph: r(svg), radius: cs.borderTopLeftRadius, faceOpacity: face && getComputedStyle(face).opacity };
        });
      });
      for (const d of m) {
        if (!d.glyph || !d.dock || !d.dock.w) { console.log(`${name} ${w} ${scheme} dock ${JSON.stringify(d.dock)} glyph ${JSON.stringify(d.glyph)} face ${JSON.stringify(d.face)}`); continue; }
        const off = { dx: +(d.glyph.cx - d.dock.cx).toFixed(2), dy: +(d.glyph.cy - d.dock.cy).toFixed(2) };
        const pad = { left: +(d.glyph.x - d.dock.x).toFixed(2), right: +(d.dock.x + d.dock.w - d.glyph.x - d.glyph.w).toFixed(2), top: +(d.glyph.y - d.dock.y).toFixed(2), bottom: +(d.dock.y + d.dock.h - d.glyph.y - d.glyph.h).toFixed(2) };
        rows.push({ engine: name, width: w, scheme, ...d, off, pad });
        console.log(`${name} ${w} ${scheme.padEnd(5)} dock ${d.dock.w}x${d.dock.h} r=${d.radius} glyph ${d.glyph.w}x${d.glyph.h} off dx=${off.dx} dy=${off.dy} pad L${pad.left} R${pad.right} T${pad.top} B${pad.bottom} faceOp=${d.faceOpacity}`);
      }
      const vis = p.locator(".glass-dock", { has: p.locator(".demo-sidebar-face") }).first();
      try { await vis.screenshot({ path: `seal-${name}-${w}-${scheme}.png`, timeout: 4000 }); } catch (e) { console.log("no crop: " + e.message.split("\n")[0]); }
    } finally { await ctx.close(); }
  }
} finally { await browser.close(); }
writeFileSync(`seal-${name}.json`, JSON.stringify(rows, null, 1));
