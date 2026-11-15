// Does a host's --glass-border-floating reach the dock plate's edge in paint? On the
// press harness, folded: a screenshot of the plate with the token unset, then set to an
// opaque red on the dock's root, then the same on a static dock; each read as the count
// of red pixels (r > 150, g and b < 90) in the plate's box. One browser, one context.
//   node edge-paint-probe.mjs <base-url> <chromium|webkit> <out-dir> <tag>
import fs from "node:fs";
import { createRequire } from "node:module";
import * as pw from "playwright";
const { PNG } = createRequire(import.meta.url)("pngjs");
const [base, engine, out, tag] = process.argv.slice(2);
fs.mkdirSync(out, { recursive: true });
const browser = await pw[engine].launch();
try {
    const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2 });
    try {
        const page = await context.newPage();
        let crashed = false;
        page.on("crash", () => (crashed = true));
        await page.goto(`${base}/tests-visual/release-11-0-2/press-harness.html`);
        await page.locator(".press-dock .dock-plate").waitFor();
        await page.waitForTimeout(700);
        const shot = async (name) => {
            await page.waitForTimeout(500);
            const box = await page.locator(".press-dock .dock-plate").boundingBox();
            const clip = { x: box.x - 4, y: box.y - 4, width: box.width + 8, height: box.height + 8 };
            const buf = await page.screenshot({ clip });
            fs.writeFileSync(`${out}/${tag}-${engine}-${name}.png`, buf);
            const png = PNG.sync.read(buf); let red = 0;
            for (let i = 0; i < png.data.length; i += 4) if (png.data[i] > 150 && png.data[i + 1] < 90 && png.data[i + 2] < 90) red++;
            const computed = await page.evaluate(() => getComputedStyle(document.querySelector(".press-dock .dock-plate")).borderTopColor);
            const cls = await page.evaluate(() => document.querySelector(".press-dock").className);
            return { name, red, of: png.width * png.height, box: [Math.round(box.width), Math.round(box.height)], computed, collapsed: /collapsed/.test(cls) };
        };
        const set = (v) => page.evaluate((v) => { const h = document.querySelector(".press-dock"); v ? h.style.setProperty("--glass-border-floating", v) : h.style.removeProperty("--glass-border-floating"); }, v);
        // The two hairline tokens against 11.0.1's form (the ink mixed with transparent),
        // on the dock's root, in light and in dark.
        const tokens = await page.evaluate(() => {
            const host = document.querySelector(".press-dock"); const out = {};
            const read = (c) => { const e = document.createElement("span"); e.style.borderTopColor = c; host.append(e); const v = getComputedStyle(e).borderTopColor; e.remove(); return v; };
            for (const mode of ["light", "dark"]) {
                document.documentElement.classList.toggle("dark", mode === "dark");
                out[mode] = {
                    floating: read("var(--glass-border-floating)"), floatingRef: read("color-mix(in srgb, var(--foreground) 5%, transparent)"),
                    dock: read("var(--glass-border-dock)"), dockRef: read("color-mix(in srgb, var(--foreground) 8%, transparent)"),
                };
            }
            document.documentElement.classList.remove("dark");
            return out;
        });
        console.log(JSON.stringify({ tokens }));
        await page.waitForTimeout(400);
        const rows = [];
        rows.push(await shot("folded-unset"));
        await set("rgb(220 0 0)");
        rows.push(await shot("folded-host"));
        await page.evaluate(() => document.querySelector(".press-dock").setAttribute("data-backdrop-mode", "static"));
        rows.push(await shot("static-folded-host"));
        await page.locator('[aria-label$="open the dock"]').first().hover();
        await page.waitForTimeout(1500);
        rows.push(await shot("static-open-host"));
        await set(null);
        rows.push(await shot("static-open-unset"));
        for (const r of rows) console.log(JSON.stringify(r));
        console.log(JSON.stringify({ crashed }));
    } finally {
        await context.close();
    }
} finally {
    await browser.close();
}
