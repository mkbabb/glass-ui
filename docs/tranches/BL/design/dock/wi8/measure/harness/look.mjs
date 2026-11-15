// look.mjs <port> <cell> [--hover sel] [--png out] [--w 1440] [--h 900] [--q extra]
// One headless Chromium: loads ?c=dock-wi8&cell=<cell>, prints errors and the dock's boxes,
// optionally hovers a selector and waits, then writes a PNG of the stage.
import { createRequire } from "node:module";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, cell] = a;
let browser;
try {
    browser = await pw[val("--engine", "chromium")].launch({ headless: true, args: val("--engine", "chromium") === "chromium" ? ["--use-angle=metal", "--enable-gpu-rasterization"] : [] });
    const ctx = await browser.newContext({ viewport: { width: +val("--w", 1440), height: +val("--h", 900) }, deviceScaleFactor: 1, colorScheme: val("--scheme", "light") });
    const page = await ctx.newPage();
    const errs = [];
    page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errs.push(m.type() + " " + m.text().slice(0, 300)));
    page.on("pageerror", (e) => errs.push("pageerror " + String(e).slice(0, 300)));
    await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${cell}${val("--q", "")}`);
    await page.waitForFunction(() => window.__animReady === true, null, { timeout: 15000 });
    const boxes = () => page.evaluate(() => {
        const out = {};
        for (const d of document.querySelectorAll(".glass-dock")) {
            const r = (e) => { if (!e) return null; const b = e.getBoundingClientRect(); return [Math.round(b.x*10)/10, Math.round(b.y*10)/10, Math.round(b.width*10)/10, Math.round(b.height*10)/10]; };
            out[d.dataset.testid] = { cls: d.className, root: r(d), plate: r(d.querySelector(":scope > .dock-plate:not(.dock-neck):not(.dock-plate--beside)")), seat: r(d.querySelector(":scope > .dock-plate--beside")), neck: r(d.querySelector(":scope > .dock-neck")), beside: r(d.querySelector(".dock-beside")), layers: r(d.querySelector(".dock-layers")), t: d.style.getPropertyValue("--dock-expand-t"), morph: d.hasAttribute("data-morphing") };
        }
        return out;
    });
    console.log("rest", JSON.stringify(await boxes()));
    const hov = val("--hover");
    if (hov) {
        await page.mouse.move(5, 5);
        const b = await page.locator(hov).first().boundingBox();
        await page.mouse.move(b.x + b.width / 2 - 3, b.y + b.height / 2);
        await page.mouse.move(b.x + b.width / 2, b.y + b.height / 2, { steps: 4 });
        await page.waitForTimeout(+val("--wait", 900));
        console.log("hovered", JSON.stringify(await boxes()));
    }
    const ev = val("--eval");
    if (ev) { console.log("eval", JSON.stringify(await page.evaluate(ev))); await page.waitForTimeout(+val("--wait", 900)); console.log("after", JSON.stringify(await boxes())); }
    if (errs.length) console.log("errors:\n  " + errs.join("\n  "));
    const png = val("--png");
    if (png) { await page.locator("[data-testid=wi8-stage]").screenshot({ path: png }); console.log("wrote", png); }
} finally {
    if (browser) await browser.close();
}
