// Round 3 readings (v7), on /ovf.html?v7side: a detented right Sheet (non-modal, rung
// 0.9) whose header holds a strip that fits (three tabs) and one that does not (eight).
// The sheet's drag shares the strip's axis, so the header rule is read here on every
// build: the base, v6, v7 with the rule on top and bottom sheets only (`v7tb`) and v7.
//
// node v7-side.mjs <engine> <out.json> <name:port>...
// One browser per run, one context per cell and build, each closed in finally. Touch
// gestures run in Chromium's 390 touch cell only (CDP touch input), each on a freshly
// loaded page with the sheet opened, and each begun on a tab that is not selected (see
// v7.mjs) or on the sheet's title. WebKit and the 1440 cell read computed styles.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";

const TREE = new URL(`../../trees/${process.env.OVF_TREE || "r3b"}/package.json`, import.meta.url).pathname;
const pw = createRequire(TREE)("playwright");

const [ENGINE, OUT, ...BUILD_ARGS] = process.argv.slice(2);
const BUILDS = BUILD_ARGS.map((a) => {
    const [name, port] = a.split(":");
    return { name, port: +port };
});
const CELLS = [
    { name: "390t", viewport: { width: 390, height: 844 }, touch: true },
    { name: "1440", viewport: { width: 1440, height: 900 }, touch: false },
];
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const rec = { engine: ENGINE, builds: BUILDS, rows: [] };
const push = (row) => {
    rec.rows.push(row);
    console.log(JSON.stringify(row));
};

function install() {
    const ev = { down: 0, moves: 0, cancel: 0, up: 0 };
    addEventListener("pointerdown", (e) => e.pointerType === "touch" && ev.down++, true);
    addEventListener("pointermove", (e) => e.pointerType === "touch" && ev.moves++, true);
    addEventListener("pointercancel", () => ev.cancel++, true);
    addEventListener("pointerup", (e) => e.pointerType === "touch" && ev.up++, true);
    window.__side = {
        ev,
        reset() {
            Object.keys(ev).forEach((k) => (ev[k] = 0));
        },
        left() {
            const s = document.querySelector('[data-testid="v7-side"]');
            return s ? Math.round(s.getBoundingClientRect().left * 10) / 10 : null;
        },
        strips() {
            const out = {};
            for (const id of ["v7-side-fit", "v7-side-over"]) {
                const s = document.querySelector(`[data-testid="${id}"] .segmented-tabs`);
                if (!s) continue;
                const cs = getComputedStyle(s);
                out[id] = {
                    flag: s.hasAttribute("data-overflow"),
                    ox: cs.overflowX,
                    ta: cs.touchAction,
                    tabTa: getComputedStyle(s.querySelector(".segmented-tab")).touchAction,
                    sw: s.scrollWidth,
                    cw: s.clientWidth,
                    headerTa: getComputedStyle(s.closest('[data-slot="dialog-header"]')).touchAction,
                };
            }
            const s = document.querySelector('[data-testid="v7-side"]');
            out.sheet = s ? { w: Math.round(s.getBoundingClientRect().width), side: s.getAttribute("data-side"), detents: s.hasAttribute("data-detents") } : null;
            return out;
        },
    };
}

async function touch(cdp, pts, gap) {
    const t = (type, p) => cdp.send("Input.dispatchTouchEvent", { type, touchPoints: type === "touchEnd" ? [] : [{ x: p.x, y: p.y, id: 1, radiusX: 4, radiusY: 4, force: 1 }] });
    await t("touchStart", pts[0]);
    for (const p of pts.slice(1)) {
        await t("touchMove", p);
        await sleep(gap);
    }
}
const touchEnd = (cdp) => cdp.send("Input.dispatchTouchEvent", { type: "touchEnd", touchPoints: [] });
const path = (x0, y0, dx, dy, n) => Array.from({ length: n + 1 }, (_, i) => ({ x: x0 + (dx * i) / n, y: y0 + (dy * i) / n }));
const left = (page) => page.evaluate(() => window.__side.left());

async function openSheet(page, cell, url) {
    await page.goto(url, { waitUntil: "load" });
    await page.evaluate(install);
    await sleep(1200);
    const o = page.locator('[data-testid="v7-open-side"]');
    if (cell.touch && ENGINE === "chromium") await o.tap();
    else await o.click();
    let last = null;
    for (let i = 0; i < 30; i++) {
        await sleep(200);
        const l = await left(page);
        if (l !== null && l === last) break;
        last = l;
    }
}

// A gesture from `sel` on a freshly opened sheet: the moves the page saw, any cancel,
// how far the sheet's left edge moved by the last move (positive: toward closed) and
// where it rests, how far the eight-tab strip panned, and how far the page scrolled.
async function gesture(page, cdp, cell, url, sel, dx, dy, n, gap) {
    await openSheet(page, cell, url);
    const p = await page.evaluate((sel) => {
        const r = document.querySelector(sel)?.getBoundingClientRect();
        return r ? { x: r.left + r.width / 2, y: r.top + r.height / 2 } : null;
    }, sel);
    if (!p) return { error: `nothing at ${sel}` };
    const strip = () => page.evaluate(() => document.querySelector('[data-testid="v7-side-over"] .segmented-tabs')?.scrollLeft ?? null);
    const l0 = await left(page);
    const s0 = await strip();
    const y0 = await page.evaluate(() => scrollY);
    await page.evaluate(() => window.__side.reset());
    await touch(cdp, path(p.x, p.y, dx, dy, n), gap);
    await sleep(60);
    const l1 = await left(page);
    await touchEnd(cdp);
    await sleep(1500);
    const l2 = await left(page);
    const s2 = await strip();
    const y2 = await page.evaluate(() => scrollY);
    const ev = await page.evaluate(() => ({ ...window.__side.ev }));
    return {
        gesture: `${dx ? `${dx} px sideways` : `${dy} px vertical`} in ${n} moves, ${gap} ms apart`,
        ...ev,
        followed: l0 === null || l1 === null ? null : Math.round(l1 - l0),
        rest: l2 === null ? "closed" : Math.round(l2 - l0),
        stripPanned: s0 === null || s2 === null ? null : Math.round(s2 - s0),
        page: Math.round(y2 - y0),
    };
}

const browser = await pw[ENGINE].launch({ headless: true });
rec.version = browser.version();
try {
    for (const cell of CELLS) {
        for (const build of BUILDS) {
            const context = await browser.newContext({ viewport: cell.viewport, hasTouch: cell.touch, isMobile: cell.touch && ENGINE === "chromium", deviceScaleFactor: 2, reducedMotion: "no-preference" });
            const at = { build: build.name, cell: cell.name };
            try {
                const page = await context.newPage();
                const cdp = ENGINE === "chromium" && cell.touch ? await context.newCDPSession(page) : null;
                const url = `http://127.0.0.1:${build.port}/ovf.html?v7side`;
                await openSheet(page, cell, url);
                push({ case: "side-strips", ...at, ...(await page.evaluate(() => window.__side.strips())) });
                if (cdp) {
                    const tab = (id) => `[data-testid="${id}"] .segmented-tab:not([data-active])`;
                    const title = '[data-testid="v7-side-title"]';
                    push({ case: "side", id: "v7-side-over", ...at, ...(await gesture(page, cdp, cell, url, tab("v7-side-over"), -150, 0, 12, 16)) });
                    push({ case: "side", id: "v7-side-over", ...at, ...(await gesture(page, cdp, cell, url, tab("v7-side-over"), 70, 0, 30, 16)) });
                    push({ case: "side", id: "v7-side-over", ...at, ...(await gesture(page, cdp, cell, url, tab("v7-side-over"), 0, -240, 12, 16)) });
                    push({ case: "side", id: "v7-side-fit", ...at, ...(await gesture(page, cdp, cell, url, tab("v7-side-fit"), 70, 0, 30, 16)) });
                    push({ case: "side", id: "v7-side-fit", ...at, ...(await gesture(page, cdp, cell, url, tab("v7-side-fit"), 0, -240, 12, 16)) });
                    push({ case: "side", id: "title", ...at, ...(await gesture(page, cdp, cell, url, title, 70, 0, 30, 16)) });
                }
                await cdp?.detach().catch(() => {});
                await page.close();
            } catch (e) {
                push({ error: String(e).slice(0, 400), ...at });
            } finally {
                await context.close().catch(() => {});
            }
        }
    }
} finally {
    await browser.close();
}
writeFileSync(OUT, JSON.stringify(rec, null, 1));
