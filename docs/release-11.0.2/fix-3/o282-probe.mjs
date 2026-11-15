// Fix seat 3, O-282: does the vertical dock's hover-only `will-change: transform` move a
// box, a text baseline or painted pixels? On the hover harness's vertical dock, three
// states are read: at rest; at rest with `will-change: transform` forced on the root (the
// promotion alone, no hover); and hovered on the dock's own padding, away from every
// seat (the promotion plus the dock's :hover, no seat hover). Each state reads the root's
// and every seat's box, every seat's first text line box (its baseline), and a
// screenshot of the dock, diffed against rest pixel by pixel. One browser, one context
// per shape, closed in finally.
//   node o282-probe.mjs <base-url> <chromium|webkit>
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";

const [base, engine = "chromium"] = process.argv.slice(2);
const browser = await (engine === "webkit" ? webkit : chromium).launch();
const out = {};

const read = (page) =>
    page.evaluate(() => {
        const root = document.querySelector(".glass-dock.vertical");
        const r = (e) => {
            const b = e.getBoundingClientRect();
            return [b.left, b.top, b.width, b.height];
        };
        const seats = {};
        for (const s of root.querySelectorAll("[data-seat]")) {
            const walker = document.createTreeWalker(s, NodeFilter.SHOW_TEXT, { acceptNode: (n) => (n.textContent.trim() ? 1 : 3) });
            const t = walker.nextNode();
            let line = null;
            if (t) {
                const range = document.createRange();
                range.selectNodeContents(t);
                const rects = range.getClientRects();
                if (rects.length) line = [rects[0].left, rects[0].top, rects[0].bottom];
            }
            seats[s.dataset.seat] = { box: r(s), line };
        }
        return { root: r(root), willChange: getComputedStyle(root).willChange, seats };
    });

const delta = (a, b) => {
    let max = 0;
    const walk = (x, y) => {
        if (Array.isArray(x)) x.forEach((v, i) => walk(v, y?.[i]));
        else if (x && typeof x === "object") for (const k of Object.keys(x)) walk(x[k], y?.[k]);
        else if (typeof x === "number" && typeof y === "number") max = Math.max(max, Math.abs(x - y));
    };
    walk(a, b);
    return +max.toFixed(3);
};

const diff = (a, b) => {
    const [x, y] = [PNG.sync.read(a), PNG.sync.read(b)];
    let changed = 0;
    let maxCh = 0;
    for (let i = 0; i < x.data.length; i += 4) {
        const d = Math.max(...[0, 1, 2].map((k) => Math.abs(x.data[i + k] - y.data[i + k])));
        if (d > 0) changed++;
        maxCh = Math.max(maxCh, d);
    }
    return { pixels: x.width * x.height, changed, maxChannel: maxCh };
};

try {
    for (const shape of ["pill", "rounded", "card"]) {
        const context = await browser.newContext({ viewport: { width: 1280, height: 900 }, deviceScaleFactor: 2 });
        try {
            const page = await context.newPage();
            await page.goto(`${base}/tests-visual/release-11-0-2/hover-harness.html?orientation=vertical&shape=${shape}`);
            await page.locator("body[data-ready='1'] .glass-dock.vertical").waitFor();
            await page.mouse.move(4, 4);
            await page.waitForTimeout(1200);
            const box = await page.locator(".glass-dock.vertical").boundingBox();
            const clip = { x: box.x - 8, y: box.y - 8, width: box.width + 16, height: box.height + 16 };
            const shot = () => page.screenshot({ clip, animations: "disabled" });
            const rest = { read: await read(page), png: await shot() };
            const tag = await page.addStyleTag({ content: ".glass-dock.vertical{will-change:transform !important}" });
            await page.waitForTimeout(300);
            const promoted = { read: await read(page), png: await shot() };
            await tag.evaluate((e) => e.remove());
            await page.waitForTimeout(300);
            // The dock's own padding: a point inside the root that no seat covers.
            const point = await page.evaluate(() => {
                const root = document.querySelector(".glass-dock.vertical");
                const b = root.getBoundingClientRect();
                for (let y = b.top + 2; y < b.bottom - 2; y += 1) {
                    for (const x of [b.left + 3, b.right - 3]) {
                        const hit = document.elementFromPoint(x, y);
                        if (hit && root.contains(hit) && !hit.closest("[data-seat]")) return { x, y };
                    }
                }
                return null;
            });
            let hovered = null;
            if (point) {
                await page.mouse.move(point.x, point.y);
                await page.waitForTimeout(900);
                hovered = { read: await read(page), png: await shot() };
            }
            const rest2 = { png: await (async () => { await page.mouse.move(4, 4); await page.waitForTimeout(900); return shot(); })() };
            out[shape] = {
                point,
                willChange: { rest: rest.read.willChange, promoted: promoted.read.willChange, hovered: hovered?.read.willChange },
                promoted: { boxes: delta(rest.read, promoted.read), paint: diff(rest.png, promoted.png) },
                hovered: hovered && { boxes: delta(rest.read, hovered.read), paint: diff(rest.png, hovered.png) },
                restAgain: { paint: diff(rest.png, rest2.png) },
            };
        } finally {
            await context.close();
        }
    }
} finally {
    await browser.close();
}
console.log(engine, JSON.stringify(out, null, 1));
