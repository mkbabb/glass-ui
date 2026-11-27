// Debug read for the print cell: what keeps the popover and the toast on paper. One
// browser, closed in finally; the static server stops on exit.
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const DIST = process.argv[2];
const server = createServer((req, res) => { let f = join(DIST, new URL(req.url, "http://x").pathname.slice(1) || "index.html"); if (!existsSync(f) || statSync(f).isDirectory()) f = join(DIST, "index.html"); res.writeHead(200, { "content-type": { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }[extname(f)] ?? "application/octet-stream" }); res.end(readFileSync(f)); });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
let browser;
try {
  browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } });
  await page.goto(`http://127.0.0.1:${server.address().port}/?cell=print`);
  await page.waitForFunction(() => window.__ready === true);
  await new Promise((r) => setTimeout(r, 800));
  await page.emulateMedia({ media: "print" });
  await new Promise((r) => setTimeout(r, 300));
  console.log(await page.evaluate(() => getComputedStyle(document.querySelector('[data-slot="popover-content"]')).display));
  await new Promise((r) => setTimeout(r, 2500));
  console.log(await page.evaluate(() => {
    const out = [];
    for (const s of ['[data-slot="popover-content"]', '[data-slot="toast"]']) {
      for (const el of document.querySelectorAll(s)) {
        const cs = getComputedStyle(el);
        out.push({ s, anims: el.getAnimations().map((a) => (a.transitionProperty ?? a.animationName) + ":" + a.playState + ":" + a.effect?.getTiming().duration), tdur: cs.transitionDuration.slice(0,40), tprop: cs.transitionProperty.slice(0,80), tag: el.tagName, display: cs.display, style: el.getAttribute("style")?.slice(0, 160), rects: el.getClientRects().length, cls: el.className.toString().slice(0, 120) });
      }
    }
    out.push({ scrimToken: getComputedStyle(document.documentElement).getPropertyValue("--overlay-scrim"), print: matchMedia("print").matches });
    return JSON.stringify(out, null, 1);
  }));
} finally { await browser?.close(); server.close(); }
