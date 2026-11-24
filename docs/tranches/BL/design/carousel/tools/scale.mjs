#!/usr/bin/env node
// scale.mjs — the travel scale, v11.1.0 (written per scroll) beside the cure (view timeline).
//
//   node scale.mjs --engine chromium|webkit --ports 5381,5382
//
// For the hero (full-width members) and the demo's peek exhibit (narrower members), at
// 1440 and 390: the computed `scale` of each member and of its content node, at rest on
// member 1 and with the strip held a quarter and a half member past it. One browser, a
// context per cell, closed in finally.
import { createRequire } from "node:module";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const pw = createRequire(join(resolve(HERE, "../trees/red"), "package.json"))("playwright");
const opt = { engine: "chromium", ports: [5381, 5382] };
const a = process.argv.slice(2);
for (let i = 0; i < a.length; i++) {
    if (a[i] === "--engine") opt.engine = a[++i];
    else if (a[i] === "--ports") opt.ports = a[++i].split(",").map(Number);
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const NO_AUTOPLAY = `(() => { const si = window.setInterval; window.setInterval = function (f, ms, ...r) { if (ms === 4200) return 0; return si.call(this, f, ms, ...r); }; })();`;
const PAGES = [
    { name: "hero", url: "/?c=carousel-hero&content=none", root: "[data-testid=hero-carousel]" },
    { name: "peek", url: "/?c=carousel", root: "[data-testid=carousel-1]" },
];

const READ = (sel) => {
    const strip = document.querySelector(sel);
    const kids = [...strip.children];
    const num = (v) => (v === "none" || v === "" ? 1 : parseFloat(v));
    return kids.slice(0, 3).map((m) => {
        const c = m.querySelector(".carousel-item-content") || m.firstElementChild;
        return +(num(getComputedStyle(m).scale) * num(getComputedStyle(c).scale)).toFixed(4);
    });
};

async function cell(browser, port, p, w) {
    const phone = w <= 500;
    const context = await browser.newContext({ viewport: { width: w, height: phone ? 844 : 900 }, deviceScaleFactor: phone ? 3 : 2, hasTouch: phone, reducedMotion: "no-preference", colorScheme: "light" });
    try {
        await context.addInitScript(NO_AUTOPLAY);
        const page = await context.newPage();
        await page.goto(`http://127.0.0.1:${port}${p.url}`, { waitUntil: "load" });
        const sel = `${p.root} [data-slot=carousel-content]`;
        await page.waitForSelector(sel);
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), p.root);
        await sleep(500);
        const geo = await page.evaluate((s) => {
            const st = document.querySelector(s);
            const k = [...st.children];
            return { pitch: k[1].offsetLeft - k[0].offsetLeft, member: k[0].offsetWidth, strip: st.clientWidth, range: CSS.supports("animation-range", "exit -100% exit 100%"), timeline: CSS.supports("animation-timeline", "view(inline)") };
        }, sel);
        const out = { port, page: p.name, w, ...geo };
        for (const [k, f] of [
            ["rest1", 1],
            ["q", 1.25],
            ["h", 1.5],
        ]) {
            await page.evaluate(([s, x]) => {
                const st = document.querySelector(s);
                st.style.scrollSnapType = "none";
                st.scrollTo({ left: x, behavior: "instant" });
            }, [sel, f * geo.pitch]);
            await sleep(400);
            out[k] = await page.evaluate(READ, sel);
        }
        return out;
    } finally {
        await context.close().catch(() => {});
    }
}

async function main() {
    let browser;
    try {
        browser = await pw[opt.engine].launch({ headless: true, args: opt.engine === "chromium" ? ["--use-angle=metal", "--enable-gpu-rasterization"] : [] });
        console.log(JSON.stringify({ engine: opt.engine, version: browser.version() }));
        for (const port of opt.ports)
            for (const p of PAGES)
                for (const w of [1440, 390]) console.log(JSON.stringify(await cell(browser, port, p, w).catch((e) => ({ port, page: p.name, w, error: String(e.message || e).slice(0, 200) }))));
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
