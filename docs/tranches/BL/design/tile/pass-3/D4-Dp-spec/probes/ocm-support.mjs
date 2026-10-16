// D4-Dp-spec/probes/ocm-support.mjs · does `overflow-clip-margin` widen the paint-containment clip, in each engine?
// A 100×40 box, 1 px border, `content-visibility: auto`, an absolute `::before` at inset −1px with a 2 px border
// (the floor's perimeter geometry). Reads CSS.supports and the painted perimeter thickness on the left edge.
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import { loadavg } from "node:os";
const load = () => loadavg().map((x) => x.toFixed(2)).join(" / ");
const arms = { none: "", ocm1: "overflow-clip-margin: 1px;", ocmbb: "overflow-clip-margin: border-box;", inset0: "" };
const page = (arm) => `<!doctype html><style>
body{margin:0;background:#fff}
.b{position:relative;margin:40px;width:100px;height:40px;border:1px solid #fff;border-radius:16px;content-visibility:auto;${arms[arm]}}
.b::before{content:"";position:absolute;inset:${arm === "inset0" ? "0" : "-1px"};border:2px solid #000;border-radius:inherit}
</style><div class="b"></div>`;
console.log(`ocm-support · load ${load()} at start`);
for (const [name, eng] of [["chromium", chromium], ["webkit", webkit]]) {
  const b = await eng.launch({ headless: true, ...(name === "chromium" && process.env.BL_GPU_CHROME ? { channel: "chromium" } : {}) });
  const p = await b.newPage({ deviceScaleFactor: 2 });
  for (const arm of Object.keys(arms)) {
    await p.setContent(page(arm));
    await p.waitForTimeout(100);
    const sup = await p.evaluate(() => [CSS.supports("overflow-clip-margin: 1px"), CSS.supports("overflow-clip-margin: border-box")]);
    const shot = await p.screenshot({ clip: { x: 36, y: 60, width: 8, height: 1 } });
    // count dark device pixels across the left edge (x 36..44 css → 16 device px)
    const { PNG } = await import("/Users/mkbabb/Programming/glass-ui/node_modules/pngjs/lib/png.js").catch(() => ({}));
    let dark = "n/a";
    if (PNG) { const img = PNG.sync.read(shot); dark = 0; for (let x = 0; x < img.width; x++) { const i = (x) * 4; if (img.data[i] < 128) dark++; } dark = `${dark / 2} css px`; }
    console.log(`  ${name} ${arm.padEnd(6)} · supports(1px, border-box) ${sup.join(", ")} · painted perimeter on the left edge ${dark}`);
  }
  await b.close();
}
console.log(`load ${load()} at end`);
