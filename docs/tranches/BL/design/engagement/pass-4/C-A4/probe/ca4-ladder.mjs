// C-A4 probe: the disclosed trigger's fine-pointer ladder (CK-25 read, D-2). Hover only, then hover + press held,
// then release with the pointer still over it: the trigger's computed background and a sampled pixel per step.
// An engagement ladder deepens from hover to press; a press lighter than its hover reads as a let-go.
//   node ca4-ladder.mjs --build <dir> [--engine chromium|webkit]
import { parseArgs, serveTarget, Engine, openPage, center, load } from "../../../harness/lib.mjs";
const a = parseArgs(); const E = new Engine(a.engine ?? "chromium"); const T = await serveTarget({ build: a.build });
console.log(`# ca4-ladder engine ${E.name} load ${load()} at start`);
try {
  for (const sc of ["accordion"]) for (const theme of ["light", "dark"]) {
    const P = await openPage(E, T, sc, { theme });
    try {
      await P.page.waitForTimeout(300);
      const sel = '[data-e~="target"]'; const c = await center(P.page, sel);
      const rd = async () => { const bg = await P.page.evaluate((s) => getComputedStyle(document.querySelector(s)).backgroundColor, sel);
        const buf = await P.page.screenshot({ clip: { x: c.x - 60, y: c.y - 4, width: 8, height: 8 } });
        const png = (await import("/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js")).default.PNG.sync.read(buf);
        return `${bg} px(${png.data[0]},${png.data[1]},${png.data[2]})`; };
      const rest = await rd();
      await P.page.mouse.move(c.x - 60, c.y); await P.page.waitForTimeout(400); const hover = await rd();
      await P.page.mouse.down(); await P.page.waitForTimeout(400); const press = await rd();
      await P.page.mouse.up(); await P.page.waitForTimeout(400); const after = await rd();
      const L = (s) => +s.match(/px\((\d+)/)[1];
      const inverted = theme === "light" ? L(press) > L(hover) : L(press) < L(hover);
      console.log(`  ${inverted ? "FAIL" : "PASS"}       ladder ${sc} ${theme} fine · rest ${rest} · hover ${hover} · hover+press ${press} · released, still hovered ${after} · the press ${inverted ? "is LIGHTER than the hover it deepens (inverted)" : "deepens the hover"} · load ${load()}`);
    } finally { await P.close(); }
  }
} finally { await E.close(); T.close(); }
