// crit-corner.mjs (D2-G pass-4 CRITIC): the square behind the collapsed stadium (CF frame c1-h-collapsed). In the
// demo's /dock/overview collapsed dock at rest, read every element under a point inside the root's box corner but
// outside its stadium (2 px in from the corner on the diagonal), with the paint it carries there (backdrop-filter,
// background, box-shadow, clip-path, radius), and the pixel at that point against the page beside the box.
//   node crit-corner.mjs --build <dir> --adapter <a> --engine chromium|webkit --out <json>
import fs from "node:fs";
import { parseArgs, openTarget, launch, openScene } from "../../../harness/lib.mjs";
const args = parseArgs();
const target = await openTarget(args);
const engine = args.engine;
const res = { engine, build: args.build, cells: [] };
const browser = await launch(engine);
try {
  for (const [v, route, sel] of [["h", "/dock/overview", "[data-testid=dock-horizontal-collapsed-first-paint]"], ["v", "/dock/vertical", "[data-testid=dock-vertical-collapsed-first-paint]"]]) {
    const t = { ...target, url: () => target.demoUrl(route), adapter: { ...target.adapter, rootSel: () => sel, sidebarRootSel: sel } };
    const s = await openScene(browser, t, "sidebar", { settle: 1500 });
    try {
      await s.page.evaluate(() => window.__dockProbe.root().scrollIntoView({ block: "center" }));
      await s.page.mouse.move(2, 2); await s.page.waitForTimeout(900);
      const r = await s.page.evaluate(() => {
        const root = window.__dockProbe.root(), q = root.getBoundingClientRect();
        const x = q.left + 2, y = q.top + 2;
        const els = document.elementsFromPoint(x, y).slice(0, 12).map((el) => { const cs = getComputedStyle(el), b = el.getBoundingClientRect();
          return { el: el.tagName.toLowerCase() + (el.className && typeof el.className === "string" ? "." + el.className.trim().split(/\s+/).slice(0, 3).join(".") : ""), rect: [b.left, b.top, b.width, b.height].map((n) => +n.toFixed(1)), backdrop: cs.backdropFilter || cs.webkitBackdropFilter, bg: cs.backgroundColor, shadow: cs.boxShadow.slice(0, 120), clip: cs.clipPath.slice(0, 80), radius: cs.borderTopLeftRadius, overflow: cs.overflow, pe: cs.pointerEvents }; });
        // painters inside the root with a backdrop-filter, wherever they sit
        const bf = [...root.querySelectorAll("*"), root].filter((el) => { const cs = getComputedStyle(el); const v = cs.backdropFilter || cs.webkitBackdropFilter; return v && v !== "none"; }).map((el) => { const cs = getComputedStyle(el), b = el.getBoundingClientRect(); return { el: el.tagName.toLowerCase() + "." + String(el.className).trim().split(/\s+/).slice(0, 3).join("."), rect: [b.left, b.top, b.width, b.height].map((n) => +n.toFixed(1)), backdrop: cs.backdropFilter || cs.webkitBackdropFilter, radius: cs.borderTopLeftRadius, clip: cs.clipPath.slice(0, 80) }; });
        return { root: [q.left, q.top, q.width, q.height].map((n) => +n.toFixed(1)), point: [x, y], under: els, backdropPainters: bf };
      });
      const png = await s.page.screenshot({ clip: { x: r.root[0] - 20, y: r.root[1] - 20, width: r.root[2] + 40, height: r.root[3] + 40 } });
      const shot = args.out.replace(/\.json$/, `-${v}.png`); fs.writeFileSync(shot, png);
      res.cells.push({ v, ...r, shot });
      console.log(`${engine} ${v}: root ${r.root}; ${r.backdropPainters.length} backdrop painter(s): ${r.backdropPainters.map((b) => `${b.el} ${b.rect} r=${b.radius} clip=${b.clip}`).join(" | ")}`);
    } finally { await s.close(); }
  }
} finally { await browser.close(); await target.close?.(); }
fs.writeFileSync(args.out, JSON.stringify(res, null, 1));
