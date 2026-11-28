// Debug read for the sort button's height under touch: the control tokens as the root, the
// small Button and the sort button each compute them. One browser, a context per cell, both
// closed in finally; the static server stops on exit.
//
// usage: node dbg-sort.mjs <dist-dir> <chromium|webkit>
import { chromium, webkit } from "playwright";
import { createServer } from "node:http";
import { existsSync, readFileSync, statSync } from "node:fs";
import { extname, join, normalize } from "node:path";

const DIST = process.argv[2];
const ENGINE = process.argv[3] === "webkit" ? webkit : chromium;
const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
const server = createServer((req, res) => {
    const path = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^\/+/, "");
    let file = join(DIST, path || "index.html");
    if (!file.startsWith(DIST) || !existsSync(file) || statSync(file).isDirectory()) file = join(DIST, "index.html");
    res.writeHead(200, { "content-type": TYPES[extname(file)] ?? "application/octet-stream" });
    res.end(readFileSync(file));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const BASE = `http://127.0.0.1:${server.address().port}/`;
const PHONE = { viewport: { width: 390, height: 844 }, deviceScaleFactor: 3, isMobile: true, hasTouch: true };

const read = () => {
    const vars = ["--ui-scale", "--control-floor", "--control-h-sm", "--button-size"];
    const at = (el) => {
        if (!el) return null;
        const cs = getComputedStyle(el);
        const out = { tag: el.tagName.toLowerCase(), cls: String(el.className).slice(0, 60) };
        for (const v of vars) out[v] = cs.getPropertyValue(v).trim();
        out.minBlockSize = cs.minBlockSize;
        out.blockSize = cs.blockSize;
        out.height = el.getBoundingClientRect().height;
        return out;
    };
    // Every style rule that matches the element and sets its minimum block size, with the
    // media and layer it sits in.
    const rules = (el) => {
        if (!el) return null;
        const hits = [];
        const walk = (list, ctx) => {
            for (const r of list) {
                if (r instanceof CSSStyleRule) {
                    let ok = false;
                    try { ok = el.matches(r.selectorText); } catch {}
                    if (ok) for (const prop of ["min-block-size", "min-height", "block-size", "height"]) {
                        const v = r.style.getPropertyValue(prop);
                        if (v) hits.push(`${ctx.join(" > ")} | ${r.selectorText} { ${prop}: ${v} }`);
                    }
                    if (r.cssRules?.length) walk(r.cssRules, [...ctx, r.selectorText]);
                } else if (r.cssRules) {
                    const tag = r instanceof CSSMediaRule ? `@media ${r.conditionText}` : r instanceof CSSLayerBlockRule ? `@layer ${r.name}` : r.constructor.name;
                    if (r instanceof CSSMediaRule && !matchMedia(r.conditionText).matches) continue;
                    walk(r.cssRules, [...ctx, tag]);
                }
            }
        };
        for (const sheet of document.styleSheets) walk(sheet.cssRules, []);
        return hits;
    };
    return {
        smRules: rules(document.querySelector('[data-t="sm"]')),
        sortRules: rules(document.querySelector(".data-table-sort")),
        root: at(document.documentElement),
        sm: at(document.querySelector('[data-t="sm"]')),
        sort: at(document.querySelector(".data-table-sort")),
    };
};

let browser;
try {
    browser = await ENGINE.launch({ headless: true });
    for (const cell of ["button", "table"]) {
        const context = await browser.newContext(PHONE);
        try {
            const page = await context.newPage();
            await page.goto(`${BASE}?cell=${cell}`);
            await page.waitForFunction(() => window.__ready === true, null, { timeout: 15000 });
            console.log(cell, JSON.stringify(await page.evaluate(read), null, 1));
        } finally {
            await context.close();
        }
    }
} finally {
    await browser?.close();
    server.close();
}
