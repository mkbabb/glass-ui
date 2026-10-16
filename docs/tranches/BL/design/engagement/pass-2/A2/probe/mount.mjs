// P-A2 probe: the tabs indicator from navigation onward (CK-03 mount glide), Chromium; closes what it opens.
import { serveTarget, load } from "../../../harness/lib.mjs";
const pw = await import("/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs");
const T = await serveTarget({ build: process.argv[2] });
const b = await pw.chromium.launch();
try {
  const p = await b.newPage();
  await p.addInitScript(() => {
    const out = (window.__trace = []); const t0 = performance.now();
    const tick = () => { const el = document.querySelector(".segmented-indicator"); if (el) { const cs = getComputedStyle(el); out.push([Math.round(performance.now() - t0), el.getBoundingClientRect().x.toFixed(1), cs.opacity, el.style.transition || "-", cs.translate]); } if (performance.now() - t0 < 1500) requestAnimationFrame(tick); };
    requestAnimationFrame(tick);
  });
  await p.goto(`${T.url}?scene=tabs&on=1`); await p.waitForTimeout(1700);
  const tr = await p.evaluate(() => window.__trace);
  let last = ""; for (const r of tr) { const k = r.slice(1).join(" "); if (k !== last) console.log(r.join(" | ")); last = k; }
  console.log(`load ${load()}`);
} finally { await b.close(); T.close?.(); process.exit(0); }
