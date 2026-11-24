#!/usr/bin/env node
// scale-stage.mjs — the travel scale on a strip that centres its slides with padding.
//
//   node scale-stage.mjs --engine chromium|webkit --ports 5381,5382
//
// The page is glass's own Carousel page (?c=carousel: release/11.1.1's CarouselStage,
// `scroll-snap-align: center` with the strip's `padding-inline` half of what a slide
// leaves). Per port and width (1440, 390), per variant:
//   built     the page as the tree built it
//   nopad     the strip's `scroll-padding-inline` set to 0 inline (the cure without
//             the stage's scroll-padding line)
//   hidden    every member `overflow: hidden`
//   clip      every member `overflow: clip`
// and the hero page (full-width members, start-aligned, no padding) as the control.
// Each cell: the strip is sent 30 % of a pitch past member 1 with snap on and left to
// snap (where it rests), then, with snap off, held at member 1 and at fractions of a
// pitch either side; at each hold the computed scale of members 0, 1 and 2 (member's
// scale times its content's). One browser per run, a context per cell, closed in finally.
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
const PAGES = [
    { name: "stage", url: "/?c=carousel", root: "[data-testid=carousel-0]", variants: ["built", "nopad", "hidden", "clip"] },
    { name: "hero", url: "/?c=carousel-hero&content=none", root: "[data-testid=hero-carousel]", variants: ["built"] },
];
const HOLDS = [-0.25, 0, 0.1, 0.2, 0.28, 0.5, 1];

const READ = (sel) => {
    const strip = document.querySelector(sel);
    const num = (v) => (v === "none" || v === "" ? 1 : parseFloat(v));
    return [...strip.children].slice(0, 3).map((m) => {
        const c = m.querySelector(".carousel-item-content") || m.firstElementChild;
        return +(num(getComputedStyle(m).scale) * num(getComputedStyle(c).scale)).toFixed(4);
    });
};

async function cell(browser, port, p, w, variant) {
    const phone = w <= 500;
    const context = await browser.newContext({ viewport: { width: w, height: phone ? 844 : 900 }, deviceScaleFactor: phone ? 3 : 2, hasTouch: phone, reducedMotion: "no-preference", colorScheme: "light" });
    try {
        const page = await context.newPage();
        await page.goto(`http://127.0.0.1:${port}${p.url}`, { waitUntil: "load" });
        const sel = `${p.root} [data-slot=carousel-content]`;
        await page.waitForSelector(sel);
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), p.root);
        await page.evaluate(
            ([s, v]) => {
                const st = document.querySelector(s);
                if (v === "nopad") st.style.scrollPaddingInline = "0px";
                if (v === "hidden" || v === "clip") for (const m of st.children) m.style.overflow = v;
            },
            [sel, variant],
        );
        await sleep(500);
        const geo = await page.evaluate((s) => {
            const st = document.querySelector(s);
            const k = [...st.children];
            const cs = getComputedStyle(st);
            return { pitch: k[1].offsetLeft - k[0].offsetLeft, member: k[0].getBoundingClientRect().width, strip: st.clientWidth, padding: cs.paddingLeft, scrollPadding: cs.scrollPaddingLeft, align: getComputedStyle(k[0]).scrollSnapAlign };
        }, sel);
        // Where the strip rests when it is let go 30 % of a pitch past member 1.
        const snapped = await page.evaluate(async ([s, x]) => {
            const st = document.querySelector(s);
            st.scrollTo({ left: x, behavior: "instant" });
            await new Promise((r) => setTimeout(r, 900));
            return +st.scrollLeft.toFixed(2);
        }, [sel, 1.3 * geo.pitch]);
        const out = { port, page: p.name, variant, w, ...geo, restsAt: snapped, restsIn: +(snapped / geo.pitch).toFixed(4), holds: {} };
        await page.evaluate((s) => {
            document.querySelector(s).style.scrollSnapType = "none";
        }, sel);
        for (const f of HOLDS) {
            await page.evaluate(([s, x]) => document.querySelector(s).scrollTo({ left: x, behavior: "instant" }), [sel, (1 + f) * geo.pitch]);
            await sleep(350);
            out.holds[f] = await page.evaluate(READ, sel);
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
        console.log(JSON.stringify({ engine: opt.engine, version: browser.version(), when: new Date().toISOString() }));
        for (const port of opt.ports)
            for (const p of PAGES)
                for (const variant of p.variants)
                    for (const w of [1440, 390]) console.log(JSON.stringify(await cell(browser, port, p, w, variant).catch((e) => ({ port, page: p.name, variant, w, error: String(e.message || e).slice(0, 200) }))));
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
