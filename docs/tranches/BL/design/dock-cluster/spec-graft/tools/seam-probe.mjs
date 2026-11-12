import fs from "node:fs"; import path from "node:path"; import http from "node:http";
import { createRequire } from "node:module"; import { pathToFileURL } from "node:url";
const NM = "/Users/mkbabb/Programming/glass-ui/node_modules";
const playwright = await import(pathToFileURL(path.join(NM, "playwright/index.mjs")).href);
const { PNG } = createRequire(path.join(NM, "_.cjs"))("pngjs");
const site = process.argv[2]; const W = +(process.argv[3] ?? 1440); const theme = process.argv[4] ?? "light";
const server = http.createServer((req, res) => { const u = new URL(req.url, "http://x"); let p = path.join(site, decodeURIComponent(u.pathname)); if (!fs.existsSync(p) || fs.statSync(p).isDirectory()) p = path.join(site, "index.html"); res.writeHead(200, { "content-type": { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }[path.extname(p)] ?? "application/octet-stream" }); fs.createReadStream(p).pipe(res); });
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const base = `http://127.0.0.1:${server.address().port}`;
const browser = await playwright.chromium.launch({ headless: true });
try {
  const ctx = await browser.newContext({ viewport: { width: W, height: 560 }, deviceScaleFactor: 2, colorScheme: theme });
  const page = await ctx.newPage();
  page.on("pageerror", (e) => console.log("ERR", e.message));
  page.on("console", (m) => console.log("console", m.type(), m.text()));
  await page.goto(`${base}/?mode=${process.argv[5] ?? "flat"}&fused=0${theme === "dark" ? "&dark=1" : ""}`);
  await page.waitForFunction(() => window.__ab?.ready); await page.waitForTimeout(500);
  await page.evaluate(() => window.__ab.set(true)); await page.waitForTimeout(1500);
  const info = await page.evaluate(() => {
    const root = document.querySelector("[data-testid=cluster]");
    const ds = [...root.querySelectorAll(":scope > .glass-dock")];
    const r = (e) => { const b = e.getBoundingClientRect(); return [b.left, b.right, b.top, b.bottom].map((x) => +x.toFixed(3)); };
    return { root: r(root), docks: ds.map(r), plates: ds.map((d) => r(d.querySelector(".dock-plate"))), lenses: [...root.querySelectorAll(".dock-cluster-lens")].map(r), luma: ds.map((d) => getComputedStyle(d.querySelector(".dock-plate")).getPropertyValue("--glass-backdrop-luma")), clips: ds.map((d) => getComputedStyle(d.querySelector(".dock-plate")).clipPath), hit: [782.25, 782.75, 783.25].map((x) => { const e = document.elementFromPoint(x, 282); if (!e) return "none"; return e.className + "@" + (e.closest(".glass-dock")?.getAttribute("aria-label") ?? ""); }), insets: ds.map((d) => d.querySelector(".dock-plate").style.inset + " | radius " + getComputedStyle(d.querySelector(".dock-plate")).borderTopRightRadius + " | " + d.querySelector(".dock-plate").style.clipPath.slice(0, 200)), dockStyle: ds.map((d) => [getComputedStyle(d).borderLeftWidth, getComputedStyle(d).paddingLeft, getComputedStyle(d).transform, getComputedStyle(d).scale, getComputedStyle(d).willChange].join(" ")) };
  });
  console.log(JSON.stringify(info));
  const jx = (info.docks[0][1] + info.docks[1][0]) / 2, y = (info.docks[0][2] + info.docks[0][3]) / 2;
  const prof = async (label) => { const buf = await page.screenshot({ clip: { x: jx - 8, y: y - 1, width: 16, height: 2 } }); const png = PNG.sync.read(buf); const v = []; for (let x = 0; x < png.width; x++) { const i = (1 * png.width + x) * 4; v.push(Math.round(0.2126 * png.data[i] + 0.7152 * png.data[i + 1] + 0.0722 * png.data[i + 2])); } console.log(label.padEnd(10), v.join(" ")); };
  await prof("as-is");
  const variant = async (label, css) => { const t = await page.addStyleTag({ content: css }); await page.waitForTimeout(120); await prof(label); await t.evaluate((n) => n.remove()); await page.waitForTimeout(60); };
  await variant("only-p2", ".dock-cluster > .glass-dock[aria-label=Pages] > .dock-plate { visibility: hidden }");
  await variant("only-p1", ".dock-cluster > .glass-dock[aria-label='Page controls'] > .dock-plate { visibility: hidden }");
  await variant("p2-solid", ".dock-cluster > .glass-dock[aria-label='Page controls'] > .dock-plate { background: rgb(0 0 0) !important }");
  await variant("wc", ".dock-cluster > .glass-dock > .dock-plate { will-change: transform }");
  await variant("no-before", ".dock-cluster > .glass-dock > .dock-plate::before { display: none }");
  await variant("no-after", ".dock-cluster > .glass-dock > .dock-plate::after { display: none }");
  await variant("ctl-hidden", ".dock-cluster .dock-controls { visibility: hidden }");
  console.log("cut", jx, "dpr-snapped cut", Math.round(jx * 2) / 2);
} finally { await browser.close(); server.close(); }
