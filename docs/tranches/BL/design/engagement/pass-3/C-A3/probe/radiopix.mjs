// C-A3: the Radio's commit light in PAINT (P-A3 §6 item 2: E-2 reads rise 0.0000 in the dark theme). Screenshots of the
// committed item's face (the 20 px face clip) at t ≈ 40, 90, 160 ms and 900 ms after a programmatic commit; mean sRGB
// luminance of the clip. Also the checkbox as a control (it passes arm iii). One browser, a context per cell, closed in finally.
//   node radiopix.mjs --build <dir> [--engine chromium|webkit]
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";
import pngjs from "/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js"; const { PNG } = pngjs;
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
const lum = (buf) => { const p = PNG.sync.read(buf); let s = 0, n = 0; const L = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  for (let i = 0; i < p.data.length; i += 4) { s += 0.2126 * L(p.data[i]) + 0.7152 * L(p.data[i + 1]) + 0.0722 * L(p.data[i + 2]); n++; } return s / n; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
console.log(`# radiopix engine ${E.name} load ${load()} at start`);
try {
  for (const sc of ["radio", "checkbox"]) for (const theme of ["light", "dark"]) {
    const P = await openPage(E, T, sc, { theme });
    try {
      await sleep(300);
      const t0 = Date.now();
      await P.page.evaluate(() => window.__e.commit());
      const rows = [];
      for (const at of [40, 90, 160, 900]) {
        while (Date.now() - t0 < at) await sleep(4);
        const face = await P.page.$('[data-state="checked"] [data-engage-face], [data-state="checked"][data-engage-face], [data-state="checked"] .control-bit__face');
        if (!face) { rows.push(`t${at}: no checked face`); continue; }
        const bb = await face.boundingBox();
        const buf = await P.page.screenshot({ clip: { x: bb.x + 3, y: bb.y + 3, width: Math.max(2, bb.width - 6), height: Math.max(2, bb.height - 6) } });
        rows.push(`t${Date.now() - t0}: L ${lum(buf).toFixed(4)}`);
      }
      console.log(`  REPORT     ${sc} ${theme} face (inner clip, 3 px inset) after a programmatic commit · ${rows.join(" · ")} · load ${load()}`);
    } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }
