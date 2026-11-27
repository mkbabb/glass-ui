// Debug read: serve <dist>, open ?cell=<cell> in <engine>, optionally switch to print
// media, wait, and print the value of the expression in <expr-file>. One browser, closed
// in finally; the static server stops on exit.
// usage: node dbg.mjs <dist> <cell> <chromium|webkit> <expr-file> [print] [query]
import { chromium, webkit } from "playwright";
import { createServer } from "node:http";
import { readFileSync, existsSync, statSync } from "node:fs";
import { join, extname } from "node:path";
const [DIST, CELL, ENG, EXPR, MODE, QUERY] = process.argv.slice(2);
const expr = readFileSync(EXPR, "utf8");
const server = createServer((req, res) => {
    let f = join(DIST, new URL(req.url, "http://x").pathname.slice(1) || "index.html");
    if (!existsSync(f) || statSync(f).isDirectory()) f = join(DIST, "index.html");
    res.writeHead(200, { "content-type": { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" }[extname(f)] ?? "application/octet-stream" });
    res.end(readFileSync(f));
});
await new Promise((r) => server.listen(0, "127.0.0.1", r));
let browser;
try {
    browser = await (ENG === "webkit" ? webkit : chromium).launch();
    const context = await browser.newContext({ viewport: { width: 1280, height: 800 } });
    try {
        const page = await context.newPage();
        page.on("console", (m) => console.log("console:", m.text()));
        await page.goto(`http://127.0.0.1:${server.address().port}/?cell=${CELL}${QUERY ?? ""}`);
        await page.waitForFunction(() => window.__ready === true);
        await new Promise((r) => setTimeout(r, 900));
        if (MODE === "print") {
            await page.emulateMedia({ media: "print" });
            await new Promise((r) => setTimeout(r, 400));
        }
        const out = await page.evaluate(`(async () => { ${expr} })()`);
        console.log(typeof out === "string" ? out : JSON.stringify(out, null, 1));
    } finally {
        await context.close();
    }
} finally {
    await browser?.close();
    server.close();
}
