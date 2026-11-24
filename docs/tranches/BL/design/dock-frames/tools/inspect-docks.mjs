#!/usr/bin/env node
// inspect-docks.mjs <url>... : one headless Chromium, a context per (url, width); lists
// every .glass-dock on the page with its box, classes, seats and any theme seat, so the
// scenarios can name their selectors. Prints JSON.
import { createRequire } from "node:module";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
const HERE = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(HERE, "../trees/v11.1.0/package.json"));
const pw = require("playwright");
const urls = process.argv.slice(2);
const widths = [
    { w: 1440, h: 900, coarse: false },
    { w: 390, h: 844, coarse: true },
];
const out = [];
let browser;
try {
    browser = await pw.chromium.launch({ headless: true, args: ["--use-angle=metal", "--enable-gpu-rasterization"] });
    for (const url of urls) {
        for (const v of widths) {
            const ctx = await browser.newContext({
                viewport: { width: v.w, height: v.h },
                deviceScaleFactor: 2,
                hasTouch: v.coarse,
                isMobile: v.coarse,
                colorScheme: "light",
            });
            try {
                const page = await ctx.newPage();
                const errors = [];
                page.on("pageerror", (e) => errors.push(String(e).slice(0, 200)));
                page.on("console", (m) => (m.type() === "error" || m.type() === "warning") && errors.push(m.type() + ": " + m.text().slice(0, 200)));
                page.on("requestfailed", (r) => errors.push("requestfailed: " + r.url().slice(0, 120) + " " + (r.failure()?.errorText || "")));
                page.on("response", (r) => r.status() >= 400 && errors.push("http " + r.status() + ": " + r.url().slice(0, 120)));
                await page.goto(url, { waitUntil: "load", timeout: 45000 });
                await page.waitForTimeout(8000);
                const info = await page.evaluate(() => {
                    const box = (e) => {
                        const r = e.getBoundingClientRect();
                        return [+r.x.toFixed(1), +r.y.toFixed(1), +r.width.toFixed(1), +r.height.toFixed(1)];
                    };
                    const name = (e) => e.getAttribute("aria-label") || e.getAttribute("title") || e.textContent.trim().slice(0, 30);
                    const path = (e) => {
                        const parts = [];
                        for (let n = e; n && n.nodeType === 1 && parts.length < 4; n = n.parentElement) {
                            parts.unshift(n.tagName.toLowerCase() + (n.id ? "#" + n.id : "") + (typeof n.className === "string" && n.className ? "." + n.className.trim().split(/\s+/).slice(0, 3).join(".") : ""));
                        }
                        return parts.join(" > ");
                    };
                    return {
                        title: document.title,
                        href: location.href,
                        app: (document.querySelector("#app")?.innerHTML || "").slice(0, 400),
                        text: document.body.innerText.slice(0, 200),
                        testids: [...document.querySelectorAll("[data-testid]")].map((e) => e.getAttribute("data-testid")).slice(0, 40),
                        html: document.documentElement.className,
                        mounted: !!document.querySelector("#app")?.__vue_app__,
                        captureReady: window.__captureReady ?? null,
                        scripts: performance.getEntriesByType("resource").filter((e) => /\.js/.test(e.name)).length,
                        docks: [...document.querySelectorAll(".glass-dock")].map((d) => ({
                            path: path(d),
                            cls: d.className,
                            testid: d.getAttribute("data-testid"),
                            label: d.getAttribute("aria-label"),
                            box: box(d),
                            plate: d.querySelector(".dock-plate") ? box(d.querySelector(".dock-plate")) : null,
                            summary: d.querySelector(".dock-layer--summary") ? box(d.querySelector(".dock-layer--summary")) : null,
                            seats: [...d.querySelectorAll("[data-glass-dock-seat], .dock-layer--full button, .dock-persistent button, .dock-layer--full a")]
                                .filter((e, i, a) => a.indexOf(e) === i)
                                .map((e) => ({ tag: e.tagName.toLowerCase(), cls: (e.className && e.className.baseVal === undefined ? e.className : "").slice(0, 80), name: name(e), seat: e.hasAttribute("data-glass-dock-seat"), box: box(e) })),
                            theme: [...d.querySelectorAll("*")]
                                .filter((e) => /dark|light|theme|scheme|sun|moon/i.test((e.getAttribute("aria-label") || "") + " " + (e.getAttribute("title") || "") + " " + (typeof e.className === "string" ? e.className : "")))
                                .slice(0, 6)
                                .map((e) => ({ tag: e.tagName.toLowerCase(), cls: typeof e.className === "string" ? e.className.slice(0, 80) : "", label: e.getAttribute("aria-label"), title: e.getAttribute("title"), pressed: e.getAttribute("aria-pressed"), box: box(e) })),
                        })),
                        themeOutside: [...document.querySelectorAll("button, a")]
                            .filter((e) => !e.closest(".glass-dock") && /dark|light|theme|scheme/i.test((e.getAttribute("aria-label") || "") + " " + (e.getAttribute("title") || "")))
                            .slice(0, 4)
                            .map((e) => ({ path: path(e), label: e.getAttribute("aria-label"), title: e.getAttribute("title"), box: box(e) })),
                        scroll: { doc: document.documentElement.scrollHeight, main: document.querySelector("main") ? [document.querySelector("main").scrollHeight, document.querySelector("main").clientHeight, getComputedStyle(document.querySelector("main")).overflowY] : null },
                    };
                });
                out.push({ url, w: v.w, errors, ...info });
            } catch (e) {
                out.push({ url, w: v.w, error: String(e).slice(0, 300) });
            } finally {
                await ctx.close().catch(() => {});
            }
        }
    }
} finally {
    if (browser) await browser.close().catch(() => {});
}
console.log(JSON.stringify(out, null, 1));
