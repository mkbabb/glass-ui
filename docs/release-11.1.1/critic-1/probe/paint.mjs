// Critic 1: is the plate's backdrop painted blurred? Opens the harness's dock Select, dock
// DropdownMenu and Popover over the striped ground, hides their text, screenshots the
// plate's interior and reads how hard the stripe edges still are behind it: the largest
// and the 99th-percentile luminance step between horizontally adjacent pixels (0 to 1).
// Hard stripes read near the ground's own step; a painted blur reads far below it.
// One browser per run, closed in finally.
//   node paint.mjs <chromium|webkit> <base url> <label> <shots dir>
import { chromium, webkit } from "@playwright/test";
import pngjs from "pngjs";
import { writeFileSync } from "node:fs";
const [engine, base, label, shots] = process.argv.slice(2);
const browser =
    engine === "webkit"
        ? await webkit.launch({ executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` })
        : await chromium.launch();
const forms = {
    phone: { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, hasTouch: true, isMobile: engine !== "webkit" ? true : true },
    desktop: { viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 },
};
const surfaces = [
    { id: "select", trigger: '[data-testid="x-select"]', content: '[data-testid="x-select-content"]' },
    { id: "menu", trigger: '[data-testid="x-menu"]', content: '[data-testid="x-menu-content"]' },
    { id: "popover", trigger: '[data-testid="x-popover"]', content: '[data-testid="x-popover-content"]' },
];
const lum = (r, g, b) => {
    const f = (v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const edges = (png) => {
    const steps = [];
    for (let y = 0; y < png.height; y += 3)
        for (let x = 0; x < png.width - 1; x++) {
            const i = (y * png.width + x) * 4;
            steps.push(Math.abs(lum(png.data[i], png.data[i + 1], png.data[i + 2]) - lum(png.data[i + 4], png.data[i + 5], png.data[i + 6])));
        }
    steps.sort((a, b) => a - b);
    return { max: +steps[steps.length - 1].toFixed(4), p99: +steps[Math.floor(steps.length * 0.99)].toFixed(4) };
};
const out = [];
try {
    for (const [form, opts] of Object.entries(forms)) {
        for (const scheme of ["dark", "light"]) {
            for (const s of surfaces) {
                const ctx = await browser.newContext(opts);
                try {
                    const page = await ctx.newPage();
                    await page.goto(`${base}/tests-visual/release-11-1-1/exits-harness.html?scheme=${scheme}`);
                    await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
                    await page.waitForTimeout(400);
                    const tb = await page.locator(s.trigger).boundingBox();
                    if (form === "phone") await page.touchscreen.tap(tb.x + tb.width / 2, tb.y + tb.height / 2);
                    else await page.mouse.click(tb.x + tb.width / 2, tb.y + tb.height / 2);
                    await page.locator(`${s.content}[data-state="open"]`).waitFor({ timeout: 5000 });
                    await page.waitForTimeout(1000);
                    if (form === "desktop") await page.mouse.move(700, 880);
                    const style = await page.locator(s.content).evaluate((el) => {
                        const cs = getComputedStyle(el);
                        return { backdrop: cs.backdropFilter || cs.webkitBackdropFilter, clip: cs.clipPath, plate: el.getAttribute("data-plate"), surface: el.getAttribute("data-surface"), bg: cs.backgroundColor };
                    });
                    await page.addStyleTag({ content: `${s.content}, ${s.content} * { color: transparent !important; } ${s.content} svg, ${s.content} [data-highlighted]::before { visibility: hidden !important; }` });
                    await page.waitForTimeout(150);
                    const b = await page.locator(s.content).boundingBox();
                    const clip = { x: b.x + 14, y: b.y + 14, width: b.width - 28, height: Math.min(b.height - 28, 160) };
                    const shot = await page.screenshot({ clip });
                    writeFileSync(`${shots}/${label}-${engine}-${form}-${scheme}-${s.id}.png`, shot);
                    // The ground's own edges, read beside the plate for scale.
                    const ground = await page.screenshot({ clip: { x: 0, y: form === "phone" ? 300 : 860, width: Math.min(390, opts.viewport.width), height: 20 } });
                    out.push({ form, scheme, surface: s.id, ...style, plateEdges: edges(pngjs.PNG.sync.read(shot)), groundEdges: edges(pngjs.PNG.sync.read(ground)) });
                } catch (e) {
                    out.push({ form, scheme, surface: s.id, error: String(e).slice(0, 160) });
                } finally {
                    await ctx.close();
                }
            }
        }
    }
    console.log(JSON.stringify({ engine, version: browser.version(), label, out }, null, 1));
} finally {
    await browser.close();
}
