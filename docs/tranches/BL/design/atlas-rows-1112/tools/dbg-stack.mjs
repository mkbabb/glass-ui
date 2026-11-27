// Debug trace for GL-12's focus return: open the lower surface and the top Dialog, press
// Escape, and log every focus move (with the caller's stack) and activeElement for two
// seconds. One browser, a context per repeat, closed in finally; the server stops on exit.
// usage: node dbg-stack.mjs <dist> <cell> <chromium|webkit> [repeats]
import { chromium, webkit } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const [DIST, CELL, ENG, REPEATS] = process.argv.slice(2);
const server = createServer((req, res) => {
    let f = join(DIST, new URL(req.url, "http://x").pathname.slice(1) || "index.html");
    if (!existsSync(f) || statSync(f).isDirectory()) f = join(DIST, "index.html");
    res.writeHead(200, { "content-type": { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }[extname(f)] ?? "application/octet-stream" });
    res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
let browser;
try {
    browser = await (ENG === "webkit" ? webkit : chromium).launch(ENG === "webkit" ? {} : { ignoreDefaultArgs: ["--hide-scrollbars"] });
    for (let i = 0; i < Number(REPEATS ?? 2); i++) {
        const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
        try {
            const page = await context.newPage();
            await page.goto(`http://127.0.0.1:${server.address().port}/?cell=${CELL}`);
            await page.waitForFunction(() => window.__ready === true);
            await sleep(300);
            if (CELL === "stack-expand") await page.click('[data-mode="expand"]');
            else await page.click('[data-t="lower-trigger"]');
            await sleep(1000);
            await page.click('[data-t="top-trigger"]');
            await sleep(1000);
            await page.evaluate(() => {
                const d = (el) => (!el ? "null" : el === document.body ? "body" : `${el.tagName.toLowerCase()}${el.dataset.t ? "[" + el.dataset.t + "]" : ""}${el.dataset.slot ? "{" + el.dataset.slot + "}" : ""}`);
                window.__log = [];
                const t0 = performance.now();
                const own = HTMLElement.prototype.focus;
                HTMLElement.prototype.focus = function (o) {
                    const st = new Error().stack.split("\n").slice(2, 6).map((s) => s.trim().replace(/\(?http:\/\/[^/]+\/assets\//, "").slice(0, 80)).join(" < ");
                    own.call(this, o);
                    window.__log.push(`${Math.round(performance.now() - t0)} focus(${d(this)}) -> ${d(document.activeElement)} :: ${st}`);
                };
                document.addEventListener("focusout", (e) => window.__log.push(`${Math.round(performance.now() - t0)} focusout ${d(e.target)} rel=${d(e.relatedTarget)}`), true);
                document.addEventListener("focusin", (e) => window.__log.push(`${Math.round(performance.now() - t0)} focusin ${d(e.target)}`), true);
                let last = "";
                const tick = () => {
                    const now = d(document.activeElement);
                    if (now !== last) window.__log.push(`${Math.round(performance.now() - t0)} active ${now}`);
                    last = now;
                    if (performance.now() - t0 < 2500) requestAnimationFrame(tick);
                };
                tick();
            });
            await page.keyboard.press("Escape");
            await sleep(2600);
            console.log(`--- ${CELL} #${i}`);
            console.log((await page.evaluate(() => window.__log)).join("\n"));
        } finally {
            await context.close();
        }
    }
} finally {
    await browser?.close();
    server.close();
}
