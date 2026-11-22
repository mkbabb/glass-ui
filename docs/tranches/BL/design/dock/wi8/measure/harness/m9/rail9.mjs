// rail9.mjs <port> <tag> [--engine chromium|webkit]: MEASURE-9 part H (H4; RU-90 as amended for C8-M15). The rail of
// release-11-0-2's `:1100` and `:1126` on the spec's own page (tests-visual/release-11-0-2/rail-harness.html, dark:
// `collapse: "closed"`, `expandOn: "press"`, no `#collapsed`), read at rest under a fine pointer (1280 by 800) and under
// coarse touch (390 by 844 with touch and a mobile viewport, the coarse-touch project's settings; WebKit 2287 as
// `webkit-touch`): the root's class and `data-morphing` 400 ms after the page is ready, then the spec's own `__collapse()`
// and `__expand()` each followed for 900 ms (the class after, and whether `data-morphing` was ever set, from a
// MutationObserver). One browser, a context per cell, closed in finally.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const [port, tag] = a;
const engine = a.includes("--engine") ? a[a.indexOf("--engine") + 1] : "chromium";
const out = { engine };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
    for (const coarse of [false, true]) {
        const ctx = await browser.newContext(coarse ? { viewport: { width: 390, height: 844 }, hasTouch: true, isMobile: true } : { viewport: { width: 1280, height: 800 } });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/tests-visual/release-11-0-2/rail-harness.html?theme=dark`);
            await page.locator("body[data-ready='1'] [data-witness='rail']").waitFor();
            await page.waitForTimeout(400);
            const state = () => page.evaluate(() => { const r = document.querySelector("[data-witness='rail']"); return { class: r.className, morphing: r.hasAttribute("data-morphing"), hoverNone: matchMedia("(hover: none)").matches, coarsePointer: matchMedia("(pointer: coarse)").matches }; });
            const rest = await state();
            const follow = async (act) => {
                await page.evaluate(() => { const r = document.querySelector("[data-witness='rail']"); window.__m = 0; window.__mo?.disconnect(); window.__mo = new MutationObserver(() => { if (r.hasAttribute("data-morphing")) window.__m++; }); window.__mo.observe(r, { attributes: true, attributeFilter: ["data-morphing", "class"] }); });
                await page.evaluate((act) => window[act](), act);
                await page.waitForTimeout(900);
                return { ...(await state()), morphRecords: await page.evaluate(() => window.__m) };
            };
            const collapse = await follow("__collapse");
            const expand = await follow("__expand");
            const collapse2 = await follow("__collapse");
            out[coarse ? "coarse" : "fine"] = { rest, collapse, expand, collapse2 };
        } finally {
            await ctx.close();
        }
        console.log(coarse ? "coarse" : "fine", JSON.stringify(out[coarse ? "coarse" : "fine"]));
    }
} finally {
    if (browser) await browser.close();
    writeFileSync(new URL(`../../logs/m9-rail.${tag}.${engine}.json`, import.meta.url), JSON.stringify(out, null, 1));
}
