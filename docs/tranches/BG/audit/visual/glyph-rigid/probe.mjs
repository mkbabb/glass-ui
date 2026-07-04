import { chromium } from "playwright-core";
const MODE = process.argv[2] || "light";
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const browser = await chromium.connectOverCDP("http://127.0.0.1:9222");
const ctx = browser.contexts()[0] || (await browser.newContext());
const page = await ctx.newPage();
await page.setViewportSize({ width: 1440, height: 900 });
await page.goto(`http://localhost:5200/?capture=${encodeURIComponent("/dock/overview")}&mode=${MODE}`, { waitUntil: "load" });
for (let i = 0; i < 120; i++) {
    if (await page.evaluate(() => document.documentElement.hasAttribute("data-capture-ready"))) break;
    await sleep(100);
}
// find collapsible dock (idx 1 — has persistent, was 223 wide)
const idx = await page.evaluate(() => {
    const docks = [...document.querySelectorAll(".glass-dock")];
    // the collapsible demo: a dock with .dock-persistent Home + Search/Bell/Settings, NOT alwaysExpanded
    for (let i = 0; i < docks.length; i++) {
        const d = docks[i];
        if (d.querySelector(".dock-persistent") && d.getBoundingClientRect().width < 300 && !d.classList.contains("vertical")) {
            // check it is the collapsible (has multiple icon buttons + separator)
            const icons = d.querySelectorAll(".dock-icon-button, [class*=dock-icon]");
            return { i, w: d.getBoundingClientRect().width, icons: icons.length, cls: d.className };
        }
    }
    return null;
});
console.log("chosen:", JSON.stringify(idx));

async function stateOf() {
    return await page.evaluate((i) => {
        const d = [...document.querySelectorAll(".glass-dock")][i];
        const r = d.getBoundingClientRect();
        return { w: +r.width.toFixed(1), h: +r.height.toFixed(1), morphing: d.getAttribute("data-morphing"), scale: getComputedStyle(d).scale, sizeScale: getComputedStyle(d).getPropertyValue("--dock-size-scale").trim(), collapsed: d.classList.contains("collapsed") || d.getAttribute("data-collapsed"), cls: d.className };
    }, idx.i);
}
console.log("initial:", JSON.stringify(await stateOf()));

// pointer far away to trigger collapse
const box = await page.evaluate((i) => { const d=[...document.querySelectorAll(".glass-dock")][i]; const r=d.getBoundingClientRect(); return {cx:r.left+r.width/2, cy:r.top+r.height/2}; }, idx.i);
await page.mouse.move(box.cx, box.cy);
await sleep(50);
await page.mouse.move(30, 860);
// poll for collapse over up to 5s
let collapsedAt = null;
const t0 = Date.now();
for (let i = 0; i < 100; i++) {
    const s = await stateOf();
    if (s.w < 120) { collapsedAt = Date.now() - t0; console.log("COLLAPSED at ~"+collapsedAt+"ms:", JSON.stringify(s)); break; }
    await sleep(80);
}
if (collapsedAt == null) console.log("did NOT collapse in 8s; last:", JSON.stringify(await stateOf()));

await page.close();
await browser.close();
