// Fix seat 2: critic 1's clipcheck on Chromium's GPU lane (ANGLE Metal), with the renderer
// string recorded. Critic 1's note: where inside a phone plate is the backdrop painted blurred? Opens the dock
// Select and the dock DropdownMenu at 390 with touch over the striped ground, hides their
// text, and reads the plate's interior on a 3 x 3 grid: the share of horizontally
// adjacent pixel pairs whose luminance steps by more than 0.02 (a hard stripe edge seen
// through the plate; a blurred backdrop has none). Read three ways: as shipped, with the
// plate's resting clip-path removed, and at a device pixel ratio of 1. Saves the whole
// viewport each time. One browser per run, closed in finally.
//   node clipcheck.mjs <chromium|webkit> <base url> <label> <shots dir>
import { chromium, webkit } from "@playwright/test";
import pngjs from "pngjs";
import { writeFileSync } from "node:fs";
const [engine, base, label, shots] = process.argv.slice(2);
const browser =
    engine === "webkit"
        ? await webkit.launch({ executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` })
        : await chromium.launch({ args: ["--headless=new", "--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"] });
const surfaces = [
    { id: "select", trigger: '[data-testid="x-select"]', content: '[data-testid="x-select-content"]' },
    { id: "menu", trigger: '[data-testid="x-menu"]', content: '[data-testid="x-menu-content"]' },
];
const lum = (r, g, b) => {
    const f = (v) => { const c = v / 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const grid = (png) => {
    const cells = [];
    for (let gy = 0; gy < 3; gy++) {
        const row = [];
        for (let gx = 0; gx < 3; gx++) {
            let hard = 0, n = 0;
            const x0 = Math.floor((gx * png.width) / 3), x1 = Math.floor(((gx + 1) * png.width) / 3) - 1;
            const y0 = Math.floor((gy * png.height) / 3), y1 = Math.floor(((gy + 1) * png.height) / 3);
            for (let y = y0; y < y1; y += 2)
                for (let x = x0; x < x1; x++) {
                    const i = (y * png.width + x) * 4;
                    const d = Math.abs(lum(png.data[i], png.data[i + 1], png.data[i + 2]) - lum(png.data[i + 4], png.data[i + 5], png.data[i + 6]));
                    n++;
                    if (d > 0.02) hard++;
                }
            row.push(+((100 * hard) / n).toFixed(2));
        }
        cells.push(row);
    }
    return cells;
};
const out = [];
try {
    for (const dpr of [3, 1]) {
        for (const scheme of ["light", "dark"]) {
            for (const s of surfaces) {
                for (const variant of ["shipped"]) {
                    const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, deviceScaleFactor: dpr, hasTouch: true, isMobile: true });
                    try {
                        const page = await ctx.newPage();
                        await page.goto(`${base}/tests-visual/release-11-1-1/exits-harness.html?scheme=${scheme}`);
                        await page.locator("body[data-ready='1']").waitFor({ state: "attached" });
                        await page.waitForTimeout(400);
                        if (variant === "no-clip") await page.addStyleTag({ content: `${s.content} { clip-path: none !important; }` });
                        const tb = await page.locator(s.trigger).boundingBox();
                        await page.touchscreen.tap(tb.x + tb.width / 2, tb.y + tb.height / 2);
                        await page.locator(`${s.content}[data-state="open"]`).waitFor({ timeout: 5000 });
                        await page.waitForTimeout(1200);
                        const renderer = await page.evaluate(() => {
                            const gl = document.createElement("canvas").getContext("webgl");
                            const ext = gl && gl.getExtension("WEBGL_debug_renderer_info");
                            return gl ? gl.getParameter(ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER) : "no webgl";
                        });
                        const style = await page.locator(s.content).evaluate((el) => {
                            const cs = getComputedStyle(el);
                            const r = el.getBoundingClientRect();
                            return { backdrop: cs.backdropFilter || cs.webkitBackdropFilter, clip: cs.clipPath, box: [Math.round(r.left), Math.round(r.top), Math.round(r.width), Math.round(r.height)], running: el.getAnimations().filter((a) => a.playState === "running").length };
                        });
                        const tag = `${label}-${engine}-dpr${dpr}-${scheme}-${s.id}-${variant}`;
                        writeFileSync(`${shots}/clip-${tag}-whole.png`, await page.screenshot());
                        await page.addStyleTag({ content: `${s.content}, ${s.content} * { color: transparent !important; } ${s.content} svg { visibility: hidden !important; }` });
                        await page.waitForTimeout(150);
                        const b = await page.locator(s.content).boundingBox();
                        const shot = await page.screenshot({ clip: { x: b.x + 14, y: b.y + 14, width: b.width - 28, height: b.height - 28 } });
                        writeFileSync(`${shots}/clip-${tag}-plate.png`, shot);
                        out.push({ dpr, scheme, id: s.id, variant, renderer, ...style, hardEdgePercent: grid(pngjs.PNG.sync.read(shot)) });
                    } catch (e) {
                        out.push({ dpr, scheme, id: s.id, variant, error: String(e).slice(0, 160) });
                    } finally {
                        await ctx.close();
                    }
                }
            }
        }
    }
    console.log(JSON.stringify({ engine, version: browser.version(), label, out }));
} finally {
    await browser.close();
}
