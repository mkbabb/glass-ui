// P-A5 probe (not a witness): the fine-pointer ladder on EVERY disclosed trigger the harness app renders (CK-25, "every
// disclosed press deepens over its hover"), C-A4's ca4-ladder method widened: rest, hovered, hovered + pressed, and
// released with the pointer still over it; the trigger's computed background and the mean luminance of an 8×8 px patch
// inside it, away from its label. The press must move the paint further from rest than the hover did (bound 0.002).
// The accordion is pressed by the mouse. A gallery trigger whose press opens a layer over it (the select's listbox, the
// menu) is pressed by its MARK: the pointer hovers it and the door's `data-press` is set on it by script, so the read is
// the recipe's press paint over its hover, not whatever the opened layer covers it with (labelled "mark").
//   node a5-ladder.mjs --build <dir> [--engine chromium|webkit]
import { parseArgs, serveTarget, Engine, openPage, load } from "../../../harness/lib.mjs";
import pngjs from "/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js"; const { PNG } = pngjs;
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
const lin = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
const lum = (buf) => { const p = PNG.sync.read(buf); let s = 0, n = 0; for (let i = 0; i < p.data.length; i += 4) { s += 0.2126 * lin(p.data[i]) + 0.7152 * lin(p.data[i + 1]) + 0.0722 * lin(p.data[i + 2]); n++; } return s / n; };
// [scene, selector, label]: the accordion exemplar, and the disclosed members the gallery renders
const ROWS = [["accordion", '[data-e~="target"]', "accordion"], ["gallery", '[data-slot="select-trigger"]', "select"], ["gallery", '[data-slot="collapsible-trigger"]', "collapsible"], ["gallery", '[data-slot="configurator-layer-trigger"]', "configurator"], ["gallery", '[data-slot="menu-trigger"]', "menu"]];
console.log(`# a5-ladder engine ${E.name} load ${load()} at start`);
let fails = 0;
try {
  for (const [sc, sel, label] of ROWS) for (const theme of ["light", "dark"]) {
    const P = await openPage(E, T, sc, { theme });
    try {
      await P.page.waitForTimeout(300);
      const el = await P.page.$(sel);
      if (!el) { console.log(`  UNMEASURED ladder ${label} ${theme} fine · no ${sel} in the ${sc} scene`); continue; }
      await el.scrollIntoViewIfNeeded(); await P.page.waitForTimeout(150);
      const bb = await el.boundingBox();
      // a patch near the trailing edge, clear of a leading label, inside the box
      const px = { x: bb.x + bb.width - Math.min(28, bb.width / 3), y: bb.y + bb.height / 2 - 4, width: 8, height: 8 };
      const rd = async () => { const bg = await el.evaluate((n) => getComputedStyle(n).backgroundColor); return { bg, L: lum(await P.page.screenshot({ clip: px })) }; };
      const rest = await rd();
      await P.page.mouse.move(px.x + 4, px.y + 4); await P.page.waitForTimeout(400);
      const hit = await el.evaluate((n, p) => n.contains(document.elementFromPoint(p.x, p.y)), { x: px.x + 4, y: px.y + 4 });
      if (!hit) { console.log(`  UNMEASURED ladder ${label} ${theme} fine · the pointer at the patch does not hit ${sel}`); continue; }
      const hover = await rd(); const byMark = sc !== "accordion";
      if (byMark) await el.evaluate((n) => n.setAttribute("data-press", "")); else await P.page.mouse.down();
      await P.page.waitForTimeout(400); const press = await rd();
      if (byMark) await el.evaluate((n) => n.removeAttribute("data-press")); else await P.page.mouse.up();
      await P.page.waitForTimeout(400); const after = await rd();
      await P.page.keyboard.press("Escape").catch(() => {});
      const dir = Math.sign(hover.L - rest.L) || Math.sign(press.L - rest.L) || 1;
      const back = (hover.L - press.L) * dir; // > 0: the press moved back toward rest past the hover
      const ok = back <= 0.002;
      if (!ok) fails++;
      console.log(`  ${ok ? "PASS" : "FAIL"}       ladder ${label} ${theme} fine${byMark ? " (mark)" : ""} · rest L ${rest.L.toFixed(4)} (${rest.bg}) · hover ${hover.L.toFixed(4)} (${hover.bg}) · hover+press ${press.L.toFixed(4)} (${press.bg}) · released, still hovered ${after.L.toFixed(4)} · the press ${ok ? `deepens the hover by ${(-back).toFixed(4)}` : `moves back toward rest past the hover by ${back.toFixed(4)}`} · load ${load()}`);
    } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }
console.log(`# a5-ladder done · ${fails} FAIL · load ${load()}`);
process.exit(fails ? 1 : 0);
