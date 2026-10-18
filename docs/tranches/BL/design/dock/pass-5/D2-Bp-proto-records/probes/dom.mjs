// dom.mjs · print the outerHTML of the first matching element in a scene (one browser, closed in finally).
import { parseArgs, openTarget, launch, openScene } from "/Users/mkbabb/Programming/glass-ui/docs/tranches/BL/design/dock/harness/lib.mjs";
const args = parseArgs(); const target = await openTarget(args); const browser = await launch(args.engine ?? "chromium");
try { const s = await openScene(browser, target, args.scene ?? "swap", {}); try { console.log(await s.page.evaluate((sel) => [...document.querySelectorAll(sel)].slice(0, 2).map((e) => e.outerHTML.slice(0, 1500)).join("\n----\n"), args.sel)); } finally { await s.close(); } }
finally { await browser.close(); await target.close?.(); }
