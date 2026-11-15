// round-pct.mjs <chromium|webkit>: RU-27's first reading. Does the engine resolve
// `max-inline-size: calc(round(down, 100% - R + G, P) - G + R)` on a content-box flex item
// of a grid, and does the cap stay out of the container's preferred size? One browser, one
// context, closed in finally. No server: the page is a data URL.
import { chromium, webkit } from "playwright";
const eng = process.argv[2] || "chromium";
const html = `<!doctype html><style>
body{margin:0} .host{display:inline-grid;grid-template-columns:auto;max-inline-size:var(--room)}
.run{display:flex;gap:8px;padding-inline-start:4px;box-sizing:content-box;overflow:hidden;justify-self:center;
 --R:4px;--G:8px;--P:52px;max-inline-size:calc(round(down, 100% - var(--R) + var(--G), var(--P)) - var(--G) + var(--R))}
.run>i{flex:0 0 44px;block-size:44px;background:#888}
.n{max-inline-size:calc(0% + var(--n) * var(--P) - var(--G) + var(--R))}
</style>
<div class="host" id="a" style="--room:334px"><div class="run" id="ra">${"<i></i>".repeat(7)}</div></div>
<div class="host" id="b" style="--room:1000px"><div class="run" id="rb">${"<i></i>".repeat(7)}</div></div>
<div class="host" id="c" style="--room:334px"><div class="run n" id="rc" style="--n:6">${"<i></i>".repeat(7)}</div></div>`;
const B = eng === "webkit" ? webkit : chromium;
const browser = await B.launch({ headless: true, ...(eng === "webkit" ? { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` } : {}) });
try {
    const ctx = await browser.newContext();
    const page = await ctx.newPage();
    await page.setContent(html);
    const r = await page.evaluate(() => {
        const q = (id) => { const e = document.getElementById(id), cs = getComputedStyle(e); return { w: e.getBoundingClientRect().width, client: e.clientWidth, maxInline: cs.maxInlineSize, host: e.parentElement.getBoundingClientRect().width }; };
        const probe = document.createElement("div"); probe.style.maxInlineSize = "calc(round(down, 100% - 4px + 8px, 52px) - 8px + 4px)";
        return { supportsRoundPct: CSS.supports("max-inline-size", "calc(round(down, 100% - 4px + 8px, 52px) - 8px + 4px)"), parsed: probe.style.maxInlineSize, a: q("ra"), b: q("rb"), c: q("rc"), ua: navigator.userAgent };
    });
    console.log(JSON.stringify({ eng, ...r }, null, 1));
    await ctx.close();
} finally {
    await browser.close();
}
