#!/usr/bin/env node
// inspect.mjs --engine chromium|webkit --port 5391 --plan plan.json [--out f.json]
// One headless browser (closed in finally), one context per job. A plan is a list of
// jobs: { name, cell: "390t-light", url, do: ["tap:<sel>", "fclick:<sel>", "wait:900", "key:Escape",
// "eval:<js>", "swipe:<sel>:<dx>:<dy>"], sel: ["<sel>", ...] }. For every element
// matching each selector the job prints its box, its scroll extents and the computed
// properties that decide horizontal bounding, plus the document's scrollWidth. Used to
// root a fault the sweep found and to witness it RED (base) and GREEN (cure).
import { createRequire } from "node:module";
import { readFileSync, writeFileSync } from "node:fs";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const require = createRequire(join(resolve(HERE, "../trees/v11.1.1"), "package.json"));
const { chromium, webkit } = require("playwright");
const a = Object.fromEntries(process.argv.slice(2).reduce((acc, v, i, all) => (v.startsWith("--") && acc.push([v.slice(2), all[i + 1]]), acc), []));
const ENGINE = a.engine || "chromium";
const PORT = a.port || 5391;
const plan = JSON.parse(readFileSync(a.plan, "utf8"));
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function swipe(page, cdp, sel, dx, dy, from) {
    const box = await page.$eval(sel, (el) => {
        const r = el.getBoundingClientRect();
        return { x: Math.min(Math.max(r.left + r.width / 2, 8), innerWidth - 8), y: Math.min(Math.max(r.top + r.height / 2, 8), innerHeight - 8) };
    });
    if (!cdp) return "no touch input in this engine";
    const t = (type, x, y) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x, y, id: 1 }] });
    // Centred on the element by default; `start` begins the touch on the element's centre,
    // which is where the engine picks the scroller a gesture goes to.
    const x0 = from === "start" ? box.x : box.x - dx / 2, y0 = from === "start" ? box.y : box.y - dy / 2;
    await t("touchStart", x0, y0);
    for (let i = 1; i <= 12; i++) {
        await t("touchMove", x0 + (dx * i) / 12, y0 + (dy * i) / 12);
        await sleep(16);
    }
    await t("touchEnd");
    await sleep(600);
    return "ok";
}

const browser = await (ENGINE === "webkit" ? webkit : chromium).launch({ headless: true });
const out = { engine: ENGINE, version: browser.version(), port: PORT, jobs: [] };
try {
    for (const job of plan) {
        const [w, scheme] = (job.cell || "390t-light").split("-");
        const touch = w.endsWith("t");
        const viewport = parseInt(w, 10) === 390 ? { width: 390, height: 844 } : { width: 1440, height: 900 };
        const context = await browser.newContext({ viewport, hasTouch: touch, isMobile: touch, deviceScaleFactor: 2, colorScheme: scheme === "dark" ? "dark" : "light" });
        const rec = { name: job.name, tree: job.tree || null, port: job.port || PORT, cell: job.cell, url: job.url, log: [], read: [] };
        try {
            const page = await context.newPage();
            const cdp = ENGINE === "chromium" ? await context.newCDPSession(page) : null;
            page.on("pageerror", (e) => rec.log.push("pageerror: " + String(e).slice(0, 160)));
            await page.goto(`http://127.0.0.1:${job.port || PORT}${job.url}`, { waitUntil: "load" });
            await page.waitForSelector("main", { timeout: 15000 });
            await sleep(1200);
            for (const act of job.do || []) {
                const [verb, ...rest] = act.split(":");
                const arg = rest.join(":");
                try {
                    if (verb === "wait") await sleep(+arg);
                    else if (verb === "key") await page.keyboard.press(arg);
                    else if (verb === "eval") rec.log.push(`eval: ${JSON.stringify(await page.evaluate(arg))}`.slice(0, 600));
                    else if (verb === "tap" || verb === "click") {
                        const h = await page.$(arg);
                        if (!h) rec.log.push(`no element: ${arg}`);
                        else if (touch && verb === "tap") await h.tap();
                        else await h.click();
                    } else if (verb === "fclick") {
                        // A mouse click at the element's centre without Playwright's
                        // stability wait (a trigger that never settles: StageSwap, motion).
                        const h = await page.$(arg);
                        if (!h) rec.log.push(`no element: ${arg}`);
                        else await h.click({ force: true, timeout: 5000 });
                    } else if (verb === "swipe") {
                        const [sel, dx, dy, from] = arg.split("@");
                        rec.log.push(`swipe ${sel} ${dx},${dy}${from ? " from " + from : ""}: ${await swipe(page, cdp, sel, +dx, +dy, from)}`);
                    }
                } catch (e) {
                    rec.log.push(`${act}: ${String(e).slice(0, 160)}`);
                }
            }
            await sleep(job.settle ?? 900);
            rec.docSW = await page.evaluate(() => document.documentElement.scrollWidth);
            rec.read = await page.evaluate((sels) => {
                const r1 = (n) => Math.round(n * 10) / 10;
                return sels.map((sel) => ({
                    sel,
                    els: [...document.querySelectorAll(sel)].slice(0, 6).map((el) => {
                        const r = el.getBoundingClientRect();
                        const cs = getComputedStyle(el);
                        return {
                            x: r1(r.left), w: r1(r.width), right: r1(r.right), sw: el.scrollWidth, cw: el.clientWidth, sl: el.scrollLeft,
                            display: cs.display, width: cs.width, minW: cs.minWidth, maxW: cs.maxWidth, flex: cs.flex,
                            ox: cs.overflowX, oy: cs.overflowY, contain: cs.contain, ws: cs.whiteSpace, wrap: cs.overflowWrap, to: cs.textOverflow,
                            gtc: cs.gridTemplateColumns.slice(0, 60), ml: cs.marginLeft, mr: cs.marginRight, translate: cs.translate,
                        };
                    }),
                }));
            }, job.sel || ["html"]);
        } catch (e) {
            rec.log.push(String(e).slice(0, 200));
        } finally {
            await context.close().catch(() => {});
        }
        out.jobs.push(rec);
        console.log(`## ${rec.name} ${rec.tree || ""} [${ENGINE} ${job.cell}] doc=${rec.docSW}`);
        for (const l of rec.log) console.log("   " + l);
        for (const r of rec.read) {
            console.log("  " + r.sel);
            for (const e of r.els) console.log(`     x=${e.x} w=${e.w} right=${e.right} sw/cw=${e.sw}/${e.cw} sl=${e.sl} ${e.display} width=${e.width} minW=${e.minW} maxW=${e.maxW} ox/oy=${e.ox}/${e.oy} contain=${e.contain} ws=${e.ws} wrap=${e.wrap} to=${e.to} gtc=${e.gtc} m=${e.ml}/${e.mr}`);
        }
    }
} finally {
    await browser.close();
}
if (a.out) writeFileSync(a.out, JSON.stringify(out, null, 1));
