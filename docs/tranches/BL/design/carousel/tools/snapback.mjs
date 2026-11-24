#!/usr/bin/env node
// snapback.mjs — which per-scroll write makes WebKit snap a wheel back (ROOT.md §2, C5).
//
//   node snapback.mjs --engine webkit|chromium --port 5382 [--w 1440]
//
// The hero page with projection="none" (no library writes), and a scroll listener the
// page installs per variant, writing on every scroll event:
//   none        nothing (the control: the platform's snap alone, plus the Carousel)
//   member-var  a custom property on each member (the snap area), read by no rule
//   member-sc   --member-scale on each member (what the cured Carousel writes)
//   content-var --member-scale on each content node (read by its own `scale` rule)
//   content-sc  `scale` on each content node, directly
//   anim        no listener: a scroll-driven animation scales each content node
//               (animation-timeline: view(inline)), the write-free form
// With --travel, the page runs the Carousel's own projection="travel" instead (on the
// cure that is the view-timeline scale and the prev/next opacity), and the variants are:
//   travel        nothing added (the cure as it ships)
//   travel-cover  the scale's animation-range set back to normal (cover)
//   travel-flat   the neighbours' 0.7 opacity and its transition switched off
//   travel-still  the scale's animation switched off
//   travel-opc    the neighbours' 0.7 opacity and its transition moved from the member
//                 (the snap area) to its content node
// --only a,b runs just those variants; --repeat N runs each N times (a context each).
// Besides the scrollend count, each run reads the strip's offset every animation frame
// from the first wheel event to 300 ms after the last: the backward steps (still rows
// skipped, as analyze.mjs counts them), the largest, when the first comes, and each
// scrollend during the wheel classed as back (the strip below its furthest point so
// far) or on (at or past it).
// Then the probe's trackpad-like wheel (60 % of the strip, bare steps every 16 ms) and
// the same measures as wheel.py: the strip's offset when the last wheel event lands, the
// scrollend events during the wheel, and where the strip ends. One browser, a context
// per variant, closed in finally.
import { createRequire } from "node:module";
import { resolve, dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const pw = createRequire(join(resolve(HERE, "../trees/red"), "package.json"))("playwright");
const opt = { engine: "webkit", port: 5382, w: 1440, travel: false, repeat: 1 };
const a = process.argv.slice(2);
for (let i = 0; i < a.length; i++) {
    if (a[i] === "--engine") opt.engine = a[++i];
    else if (a[i] === "--port") opt.port = +a[++i];
    else if (a[i] === "--w") opt.w = +a[++i];
    else if (a[i] === "--travel") opt.travel = true;
    else if (a[i] === "--only") opt.only = a[++i].split(",");
    else if (a[i] === "--repeat") opt.repeat = +a[++i];
}
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const VARIANTS = (
    opt.travel
        ? ["travel", "travel-cover", "travel-flat", "travel-still", "travel-opc"]
        : ["none", "member-var", "member-sc", "content-var", "content-sc", "anim"]
).filter((v) => !opt.only || opt.only.includes(v));
const TRAVEL_CSS = {
    "travel-cover": "[data-testid=hero-carousel] .carousel-item-content { animation-range: normal !important; }",
    "travel-flat": "[data-testid=hero-carousel] .carousel-item { opacity: 1 !important; transition: none !important; }",
    "travel-still": "[data-testid=hero-carousel] .carousel-item-content { animation: none !important; }",
    "travel-opc":
        "[data-testid=hero-carousel] .carousel-item { opacity: 1 !important; transition: none !important; } " +
        "[data-testid=hero-carousel] .carousel-item-content { transition: opacity var(--spring-dock-duration) var(--spring-dock); } " +
        "[data-testid=hero-carousel] .carousel-item[data-state=prev] > .carousel-item-content, " +
        "[data-testid=hero-carousel] .carousel-item[data-state=next] > .carousel-item-content { opacity: 0.7; }",
};

const INSTALL = ([variant, css]) => {
    const strip = document.querySelector("[data-testid=hero-carousel] [data-slot=carousel-content]");
    const kids = () => [...strip.children];
    const pitch = () => kids()[1].offsetLeft - kids()[0].offsetLeft;
    window.__ev = [];
    strip.addEventListener("scrollend", () => window.__ev.push({ t: performance.now(), type: "scrollend", sl: strip.scrollLeft }));
    window.__rows = [];
    window.__sample = (ms) => {
        const t0 = performance.now();
        const tick = () => {
            window.__rows.push([performance.now(), strip.scrollLeft]);
            if (performance.now() - t0 < ms) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
    };
    if (variant.startsWith("travel")) {
        if (css) {
            const st = document.createElement("style");
            st.textContent = css;
            document.head.append(st);
        }
        return { pitch: pitch() };
    }
    if (variant === "anim") {
        const st = document.createElement("style");
        st.textContent = `@keyframes snapback-scale { 0%, 100% { scale: 0.965 } 50% { scale: 1 } }
            [data-testid=hero-carousel] .carousel-item-content { animation: snapback-scale linear both; animation-timeline: view(inline); }`;
        document.head.append(st);
        return { pitch: pitch(), supported: CSS.supports("animation-timeline: view()") };
    }
    if (variant === "none") return { pitch: pitch() };
    strip.addEventListener(
        "scroll",
        () => {
            const p = strip.scrollLeft / pitch();
            kids().forEach((m, i) => {
                const s = (1 - 0.035 * Math.min(1, Math.abs(i - p))).toFixed(4);
                const c = m.firstElementChild;
                if (variant === "member-var") m.style.setProperty("--unused", s);
                else if (variant === "member-sc") m.style.setProperty("--member-scale", s);
                else if (variant === "content-var") c.style.setProperty("--member-scale", s);
                else if (variant === "content-sc") c.style.scale = s;
            });
        },
        { passive: true },
    );
    return { pitch: pitch() };
};

async function run(browser, variant) {
    const phone = opt.w <= 500;
    const context = await browser.newContext({ viewport: { width: opt.w, height: phone ? 844 : 900 }, deviceScaleFactor: phone ? 3 : 2, hasTouch: phone, reducedMotion: "no-preference", colorScheme: "light" });
    try {
        const page = await context.newPage();
        await page.goto(`http://127.0.0.1:${opt.port}/?c=carousel-hero&content=none${opt.travel ? "" : "&projection=none"}`, { waitUntil: "load" });
        const sel = "[data-testid=hero-carousel] [data-slot=carousel-content]";
        await page.waitForSelector(sel);
        await page.evaluate((s) => document.querySelector(s).scrollIntoView({ block: "center", behavior: "instant" }), sel);
        await sleep(600);
        const info = await page.evaluate(INSTALL, [variant, TRAVEL_CSS[variant] || ""]);
        const b = await page.evaluate((s) => {
            const r = document.querySelector(s).getBoundingClientRect();
            return { x: r.x + r.width / 2, y: r.y + Math.min(r.height / 2, 300), w: r.width };
        }, sel);
        await page.mouse.move(b.x, b.y);
        // the probe's wheel: a rise then a decaying tail, bare steps every 16 ms
        const shape = [];
        for (let k = 1; k <= 8; k++) shape.push(k);
        let v = 8;
        for (let k = 0; k < 26; k++) shape.push((v *= 0.86));
        const sum = shape.reduce((x, y) => x + y, 0);
        const total = b.w * 0.6;
        const t0 = await page.evaluate(() => performance.now());
        await page.evaluate(() => window.__sample(900));
        const start = Date.now();
        let acc = 0;
        for (let k = 0; k < shape.length; k++) {
            const step = (shape[k] / sum) * total;
            acc += step;
            const dx = Math.round(acc) - Math.round(acc - step);
            if (dx) await page.mouse.wheel(dx, 0);
            const wait = start + (k + 1) * 16 - Date.now();
            if (wait > 0) await sleep(wait);
        }
        const t1 = await page.evaluate(() => performance.now());
        const atLast = await page.evaluate((s) => document.querySelector(s).scrollLeft, sel);
        await sleep(2000);
        const end = await page.evaluate((s) => document.querySelector(s).scrollLeft, sel);
        const ev = await page.evaluate(() => window.__ev);
        const rows = await page.evaluate(() => window.__rows);
        const during = ev.filter((e) => e.t >= t0 && e.t <= t1);
        // backward steps with still rows skipped, from the first wheel event to 300 ms after the last
        const win = rows.filter(([t]) => t <= t1 + 300);
        let last = 0,
            revs = 0,
            back = 0,
            firstBack = null;
        for (let k = 1; k < win.length; k++) {
            const step = win[k][1] - win[k - 1][1];
            if (Math.abs(step) <= 0.5) continue;
            if (last && Math.sign(step) !== Math.sign(last)) revs++;
            if (step < 0) {
                back = Math.max(back, -step);
                if (firstBack == null) firstBack = Math.round(win[k][0] - t0);
            }
            last = step;
        }
        const ends = during.map((e) => {
            const far = Math.max(0, ...rows.filter(([t]) => t <= e.t).map(([, x]) => x));
            return { ms: Math.round(e.t - t0), sl: Math.round(e.sl), kind: e.sl < far - 1 ? "back" : "on" };
        });
        const medianRow = (() => {
            const d = win.slice(1).map(([t], k) => t - win[k][0]).sort((x, y) => x - y);
            return d.length ? +d[Math.floor(d.length / 2)].toFixed(1) : null;
        })();
        return { variant, ...info, atLastWheel: Math.round(atLast), snapBacks: during.length, ends, reversals: revs, largestBack: Math.round(back), firstBackMs: firstBack, rowMs: medianRow, end: Math.round(end), slide: +(end / info.pitch).toFixed(2) };
    } finally {
        await context.close().catch(() => {});
    }
}

async function main() {
    let browser;
    try {
        browser = await pw[opt.engine].launch({ headless: true, args: opt.engine === "chromium" ? ["--use-angle=metal", "--enable-gpu-rasterization"] : [] });
        console.log(JSON.stringify({ engine: opt.engine, version: browser.version(), port: opt.port, w: opt.w }));
        for (let k = 0; k < opt.repeat; k++)
            for (const v of VARIANTS) console.log(JSON.stringify({ run: k + 1, ...(await run(browser, v).catch((e) => ({ variant: v, error: String(e.message || e).slice(0, 200) }))) }));
    } finally {
        if (browser) await browser.close().catch(() => {});
    }
}
main().catch((e) => {
    console.error(e);
    process.exit(1);
});
