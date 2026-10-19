// P-A4 probe (not a witness): the committed control bit's face in PAINT, against the fill's clock (CK-02/CK-10; REGISTRY
// §P3-7 item 2: read the light's envelope against the fill's clock before a ceiling is ruled). After a programmatic
// commit, the committed face is screenshotted (an inner clip, 3 px inset, the dot or thumb included) at ~20-900 ms, and
// its mean sRGB relative luminance printed beside the light layer's computed opacity × alpha and the face fill's alpha.
// The excess is the peak above the face's luminance at 900 ms (the committed rest). The fill rides `press-drain`
// release (120 ms), the light the `control-engage` envelope (60 / 180 ms). One browser, a page per cell, closed in finally.
//   node facefilm.mjs --build <dir> [--engine chromium|webkit] [--scenes radio,checkbox,switch,accordion,toggle,tabs] [--prm]
// (a face-less member: its target, and its `::after` seat as the light; the tab: the committed tab and its light span)
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";
import pngjs from "/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js"; const { PNG } = pngjs;
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
const scenes = String(a.scenes ?? "radio,checkbox,switch").split(",");
const lum = (buf) => { const p = PNG.sync.read(buf); let s = 0, n = 0; const L = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
  for (let i = 0; i < p.data.length; i += 4) { s += 0.2126 * L(p.data[i]) + 0.7152 * L(p.data[i + 1]) + 0.0722 * L(p.data[i + 2]); n++; } return s / n; };
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const AT = [20, 60, 100, 140, 180, 220, 260, 320, 400, 500, 900];
// a face-less member's face is its target (its `::after` is the seat); the tab's is the committed tab
const FACE = { accordion: '[data-e~="target"]', toggle: '[data-e~="target"]', tabs: ".segmented-tab:nth-of-type(2)" };
console.log(`# facefilm engine ${E.name} load ${load()} at start${a.prm ? " PRM" : ""}`);
try {
  for (const sc of scenes) for (const theme of ["light", "dark"]) {
    const P = await openPage(E, T, sc, { theme, prm: !!a.prm });
    try {
      await sleep(300);
      const t0 = Date.now();
      await P.page.evaluate(() => window.__e.commit());
      const rows = [];
      for (const at of AT) {
        while (Date.now() - t0 < at) await sleep(3);
        const face = await P.page.$(FACE[sc] ?? '[data-state="checked"] .control-bit__face');
        if (!face) { rows.push({ t: at, miss: true }); continue; }
        const bb = await face.boundingBox(); const t = Date.now() - t0;
        const [buf, cs] = await Promise.all([
          P.page.screenshot({ clip: { x: bb.x + 3, y: bb.y + 3, width: Math.max(2, bb.width - 6), height: Math.max(2, bb.height - 6) } }),
          face.evaluate((f) => { const l = f.querySelector("[data-engage-light]"); const cl = l ? getComputedStyle(l) : getComputedStyle(f, "::after"); const al = (c) => { const m = c.match(/\/\s*([\d.]+)\)$/) ?? c.match(/rgba\([^)]*,\s*([\d.]+)\)$/); return m ? +m[1] : (c.startsWith("rgb(") || c.startsWith("color(") ? 1 : 0); };
            return { light: cl ? +cl.opacity * al(cl.backgroundColor) : null, fill: al(getComputedStyle(f).backgroundColor) }; }),
        ]);
        rows.push({ t, L: lum(buf), ...cs });
      }
      const rest = rows.at(-1).L; const pk = rows.filter((r) => !r.miss).reduce((m, r) => (r.L > m.L ? r : m), { L: -1 });
      console.log(`  REPORT ${sc} ${theme} · peak L ${pk.L.toFixed(4)} at +${pk.t} · rest (+900) ${rest.toFixed(4)} · excess ${(pk.L - rest).toFixed(4)} · ${rows.map((r) => (r.miss ? `+${r.t} -` : `+${r.t} L ${r.L.toFixed(4)} light ${r.light?.toFixed(3)} fill ${r.fill?.toFixed(2)}`)).join(" | ")} · load ${load()}`);
    } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }
