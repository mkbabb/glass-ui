// overflow.mjs (D2-G critic): does a build's morph scene overflow the 1440 × 900 viewport? Per engine, per scene
// (morph, morph&neighbour=1), at rest collapsed, at rest expanded and mid-expand: the document's scroll size and
// the elements whose box reaches past the viewport. One browser per engine, a fresh context per cell (openScene),
// every page, context and browser closed in finally.
//   node overflow.mjs --build <dir> --adapter <file> --engine chromium|webkit
import { parseArgs, engines, openTarget, launch, openScene, waitRest } from "../../../harness/lib.mjs";
const args = parseArgs(); const target = await openTarget(args);
try {
  for (const engine of engines(args)) {
    const browser = await launch(engine);
    try {
      for (const q of [{}, { neighbour: "1" }]) {
        const s = await openScene(browser, target, "morph", { query: q, ctx: { deviceScaleFactor: 1 } });
        try {
          const read = (tag) => s.page.evaluate((tag) => {
            const de = document.documentElement, vw = innerWidth, vh = innerHeight;
            const past = [...document.querySelectorAll("body *")].map((e) => [e, e.getBoundingClientRect()]).filter(([, r]) => r.width && (r.right > vw + 0.5 || r.bottom > vh + 0.5)).slice(0, 6)
              .map(([e, r]) => `${e.tagName.toLowerCase()}.${String(e.className?.baseVal ?? e.className).split(" ").slice(0, 2).join(".")} r${r.right.toFixed(1)} b${r.bottom.toFixed(1)}`);
            return `${tag}: scroll ${de.scrollWidth}×${de.scrollHeight} (client ${de.clientWidth}×${de.clientHeight}, inner ${vw}×${vh}); past the viewport: ${past.join(" | ") || "none"}`;
          }, tag);
          await s.page.evaluate(() => window.__scene.collapse()); await waitRest(s.page, { quiet: 400, cap: 6000 });
          console.log(engine, JSON.stringify(q), await read("collapsed"));
          await s.page.evaluate(() => window.__scene.expand()); await s.page.waitForTimeout(90);
          console.log(engine, JSON.stringify(q), await read("mid-expand"));
          await waitRest(s.page, { quiet: 400, cap: 6000 });
          console.log(engine, JSON.stringify(q), await read("expanded"));
        } finally { await s.close(); }
      }
    } finally { await browser.close(); }
  }
} finally { await target.close(); }
