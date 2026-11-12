#!/usr/bin/env node
// The site as a visitor's browser receives it: each route loads with every request
// answered below 400, no console error, no page error, no CSP violation and no request
// to another host. Anything the edge injects (an analytics beacon) shows only here.
//
//   node scripts/check-live.mjs <origin> [--browser chromium|webkit] [--emulate-headers dist-demo/_headers]
//
// --emulate-headers applies a Pages `_headers` file to every same-origin response, so
// `vite preview` (which ignores _headers) is held to the deployed CSP. Locally:
//   npm run demo:dist:serve, then node scripts/check-live.mjs http://localhost:5200 --emulate-headers dist-demo/_headers
// One browser per run, one context per cell, both closed in `finally`.
import { readFileSync } from "node:fs";
import { chromium, webkit } from "playwright";

const args = process.argv.slice(2);
const opt = (name) => (args.includes(name) ? args[args.indexOf(name) + 1] : undefined);
const engine = opt("--browser") ?? "chromium";
const headersFile = opt("--emulate-headers");
const origin = (args.find((a, i) => !a.startsWith("--") && !args[i - 1]?.startsWith("--")) ?? "https://glass.babb.dev").replace(/\/$/, "");
const host = new URL(origin).host;
/** The landing and one deep route: a story that boots the WebGPU aurora. */
const ROUTES = ["/", "/substrates/aurora"];
const WIDTHS = [390, 1440];

/** Pages `_headers` rules as [matcher, [name, value][]]; every matching rule applies. */
function parseHeaders(text) {
    const rules = [];
    for (const line of text.split("\n")) {
        if (!line.trim() || line.trim().startsWith("#")) continue;
        if (!/^\s/.test(line)) {
            const re = new RegExp(`^${line.trim().replace(/[.+?^${}()|[\]\\]/g, "\\$&").replace(/\*/g, ".*")}$`);
            rules.push([re, []]);
        } else {
            const i = line.indexOf(":");
            rules.at(-1)[1].push([line.slice(0, i).trim().toLowerCase(), line.slice(i + 1).trim()]);
        }
    }
    return (path) => {
        const out = {};
        for (const [re, hs] of rules)
            if (re.test(path)) for (const [k, v] of hs) out[k] = out[k] ? `${out[k]}, ${v}` : v;
        return out;
    };
}
const headersFor = headersFile ? parseHeaders(readFileSync(headersFile, "utf8")) : null;

const problems = [];
let loads = 0;
const browser = await { chromium, webkit }[engine].launch();
try {
    for (const scheme of ["light", "dark"]) {
        for (const width of WIDTHS) {
            for (const route of ROUTES) {
                const cell = `${engine} ${scheme} ${width} ${route}`;
                const context = await browser.newContext({ colorScheme: scheme, viewport: { width, height: 900 } });
                let page;
                try {
                    await context.addInitScript(() =>
                        document.addEventListener("securitypolicyviolation", (e) =>
                            console.error(`CSP violation: ${e.violatedDirective} blocked ${e.blockedURI || "inline"}`),
                        ),
                    );
                    if (headersFor)
                        await context.route("**/*", async (r) => {
                            const u = new URL(r.request().url());
                            if (u.host !== host) return r.continue();
                            try {
                                const response = await r.fetch();
                                await r.fulfill({ response, headers: { ...response.headers(), ...headersFor(u.pathname) } });
                            } catch {
                                // A failed fetch surfaces as `requestfailed`; after the cell it is a no-op.
                                await r.abort().catch(() => {});
                            }
                        });
                    page = await context.newPage();
                    page.on("console", (m) => m.type() === "error" && problems.push(`${cell}: console: ${m.text()}`));
                    page.on("pageerror", (e) => problems.push(`${cell}: pageerror: ${e}`));
                    page.on("requestfailed", (r) => problems.push(`${cell}: failed ${r.url()} (${r.failure()?.errorText})`));
                    page.on("response", (r) => r.status() >= 400 && problems.push(`${cell}: HTTP ${r.status()} ${r.url()}`));
                    page.on("request", (r) => {
                        const u = new URL(r.url());
                        if (u.protocol.startsWith("http") && u.host !== host) problems.push(`${cell}: foreign request ${r.url()}`);
                    });
                    const res = await page.goto(`${origin}${route}`, { waitUntil: "networkidle" }).catch((e) => e);
                    if (res instanceof Error) {
                        problems.push(`${cell}: ${res.message.split("\n")[0]}`);
                        continue;
                    }
                    if (res?.status() !== 200) problems.push(`${cell}: document HTTP ${res?.status()}`);
                    await page.waitForTimeout(1500);
                    const notFound = await page.getByText("Page not found").count();
                    if (notFound) problems.push(`${cell}: the route rendered the 404 page`);
                    if (!(await page.locator("#app > *").count())) problems.push(`${cell}: #app is empty`);
                    loads++;
                } finally {
                    page?.removeAllListeners(); // the cell is judged; teardown aborts are not problems
                    await context.unrouteAll({ behavior: "ignoreErrors" });
                    await context.close();
                }
            }
        }
    }
} finally {
    await browser.close();
}

if (problems.length) {
    for (const p of problems) console.error(`::error title=live::${p}`);
    process.exit(1);
}
console.log(`live PASS: ${loads} loads (${ROUTES.join(", ")} × ${WIDTHS.join("/")} × light/dark, ${engine}${headersFile ? `, headers from ${headersFile}` : ""}) on ${origin}: every request < 400, no console error, no CSP violation, no foreign request`);
