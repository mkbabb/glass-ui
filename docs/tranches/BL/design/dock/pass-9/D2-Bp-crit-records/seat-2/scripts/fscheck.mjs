// fscheck.mjs (D2 pass 9, fresh critic; enters no row): on bp8fsi, swap?fs=1 both ways: does the constructed geometry arm a heir and is it gated?
import { parseArgs, openTarget, launch, openScene, waitRest } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs(); const target = await openTarget(args); const browser = await launch(args.engine ?? "chromium");
try { for (const [name, pre, go] of [["to-three", [], "long"], ["to-one", ["long"], "short"]]) {
  const s = await openScene(browser, target, "swap", { query: { fs: "1" } });
  try { for (const f of pre) { await s.page.evaluate((f) => window.__scene.setFace(f), f); await waitRest(s.page); await s.page.waitForTimeout(400); }
    const lines = []; s.page.on("console", (m) => { if (m.text().startsWith("CRIT-ARM ")) lines.push(m.text()); });
    await s.page.evaluate((f) => window.__scene.setFace(f), go); await waitRest(s.page); await s.page.waitForTimeout(500);
    console.log(name, lines.join(" | ") || "no arm");
    console.log(name, "rects", JSON.stringify(await s.page.evaluate(() => [...document.querySelectorAll('[data-testid="dock"] button')].map((b) => { const r = b.getBoundingClientRect(); return [(b.textContent||"").trim().slice(0,8), +r.left.toFixed(1), +r.width.toFixed(1)]; }))));
  } finally { await s.close().catch(() => {}); }
} } finally { await browser.close().catch(() => {}); await target.close?.().catch(() => {}); }
