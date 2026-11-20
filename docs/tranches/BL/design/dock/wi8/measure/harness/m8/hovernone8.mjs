// hovernone8.mjs: MEASURE-8 H4, why G-14's touch plant cannot bite in WebKit 2287. The plant opens every dock under
// (hover: none); this reads whether WebKit 2287 matches (hover: none) and (pointer: coarse) in the context the G-14
// WebKit project uses (desktop, no touch) and in the two touch forms a context can take (hasTouch; hasTouch with
// isMobile), Chromium beside it. One browser per engine, a context per form, closed in finally.
// Log: logs/m8-hovernone.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const out = [];
for (const engine of ["chromium", "webkit"]) {
    let browser;
    try {
        browser = await pw[engine].launch({ headless: true, ...(engine === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
        for (const [form, opts] of [["desktop (the G-14 webkit project)", {}], ["hasTouch", { hasTouch: true }], ["hasTouch, isMobile", { hasTouch: true, isMobile: true }]]) {
            let ctx;
            try {
                ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, ...opts });
                const page = await ctx.newPage();
                await page.setContent("<!doctype html><title>m</title>");
                const r = await page.evaluate(() => ({ hoverNone: matchMedia("(hover: none)").matches, hoverHover: matchMedia("(hover: hover)").matches, coarse: matchMedia("(pointer: coarse)").matches, ua: navigator.userAgent.slice(0, 120) }));
                out.push({ engine, version: browser.version(), form, ...r });
            } catch (e) {
                out.push({ engine, form, error: String(e).slice(0, 200) });
            } finally {
                await ctx?.close();
            }
        }
    } finally {
        await browser?.close();
    }
}
writeFileSync(new URL("../../logs/m8-hovernone.json", import.meta.url), JSON.stringify(out, null, 1));
for (const r of out) console.log(JSON.stringify(r));
