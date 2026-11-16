// Lane L4 witness probe (the vite-served harness): the class is the mode (O-175 (2)),
// the dock grain is never an LCP entry (O-185), and the blob paints past its box while
// its offscreen park still stops the frame loop (O-204 (3)).
//
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label> <tree:green|red>
//
// One browser per run, a new context per cell, every context and the browser closed in
// `finally`. Headless shell for Chromium (Playwright's default); WebKit is Playwright's
// build 2287, pinned by executablePath as lanes L1 to L3 do. Each run writes
// <out-dir>/<label>-<engine>.json and cropped paint to png/.
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { join } from "node:path";

const [engineName, base, outDir, label, tree = "green"] = process.argv.slice(2);
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });

const WEBKIT_2287 = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
const launch = () =>
    engineName === "webkit"
        ? webkit.launch(existsSync(WEBKIT_2287) ? { executablePath: WEBKIT_2287 } : {})
        : chromium.launch();

const PATH = "/docs/release-11.1.0/lane-L4/harness/index.html";
const WIDTHS = [390, 1440];
const THEMES = ["light", "dark"];
const results = { engine: engineName, label, tree, base, cells: [] };
const verdicts = [];
const verdict = (item, cell, pass, detail) => verdicts.push({ item, cell, pass, detail });

async function open(browser, { width, os = "light", query, init }) {
    const context = await browser.newContext({ viewport: { width, height: 800 }, deviceScaleFactor: 1, colorScheme: os });
    const page = await context.newPage();
    if (init) await page.addInitScript(init);
    await page.goto(`${base}${PATH}?${query}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 });
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(400);
    return { context, page };
}
const clipOf = (box, pad) => ({ x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 });
const shot = (page, name, box, pad = 8) => page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip: clipOf(box, pad) });

// ── O-175 (2) · the class is the mode ─────────────────────────────────────────────────
// Four states: the OS scheme crossed with the `.dark` class. The surfaces and inks of
// a state must equal those of the same class on the opposite OS scheme.
const readScheme = (page) =>
    page.evaluate(() => {
        const cs = (sel) => getComputedStyle(document.querySelector(sel));
        return {
            htmlScheme: getComputedStyle(document.documentElement).colorScheme,
            page: getComputedStyle(document.body).backgroundColor,
            card: cs('[data-probe="card"]').backgroundColor,
            ink: cs('[data-probe="ink"]').color,
            muted: cs('[data-probe="muted"]').color,
            popover: cs('[data-probe="pop"]').backgroundColor,
            popoverInk: cs('[data-probe="pop"]').color,
        };
    });
async function scheme(browser, width) {
    const states = {};
    for (const os of ["light", "dark"]) for (const cls of ["none", "dark"]) {
        const { context, page } = await open(browser, { width, os, query: `scene=scheme&cls=${cls}` });
        try {
            states[`${os}-os/${cls}-class`] = await readScheme(page);
            const card = await page.locator('[data-probe="card"]').boundingBox();
            await shot(page, `o175-${width}-${os}os-${cls}cls`, card, 12);
        } finally {
            await context.close();
        }
    }
    const keys = ["page", "card", "ink", "muted", "popover", "popoverInk"];
    const diff = (a, b) => keys.filter((k) => a[k] !== b[k]);
    const noClassLeak = diff(states["dark-os/none-class"], states["light-os/none-class"]);
    const classWins = diff(states["light-os/dark-class"], states["dark-os/dark-class"]);
    results.cells.push({ item: "O-175(2)", width, states, noClassLeak, classWins });
    verdict("O-175(2)", `${width} dark OS, no class == light OS, no class`, noClassLeak.length === 0, { differs: noClassLeak });
    verdict("O-175(2)", `${width} light OS, .dark == dark OS, .dark`, classWins.length === 0, { differs: classWins });
}

// ── O-185 · the dock grain is never an LCP entry ──────────────────────────────────────
const LCP_INIT = () => {
    window.__lcp = [];
    window.__lcpSupported =
        typeof PerformanceObserver !== "undefined" &&
        (PerformanceObserver.supportedEntryTypes ?? []).includes("largest-contentful-paint");
    if (!window.__lcpSupported) return;
    new PerformanceObserver((list) => {
        for (const e of list.getEntries()) {
            const el = e.element;
            window.__lcp.push({
                size: e.size,
                url: (e.url || "").slice(0, 48),
                time: Math.round(e.startTime),
                element: el ? `${el.tagName.toLowerCase()}.${[...el.classList].join(".")}` : null,
                dockPlate: !!el && el.classList.contains("dock-plate"),
            });
        }
    }).observe({ type: "largest-contentful-paint", buffered: true });
};
async function grain(browser, width, theme) {
    const cell = `${width}-${theme}`;
    const { context, page } = await open(browser, { width, os: theme, query: `scene=grain&theme=${theme}`, init: LCP_INIT });
    try {
        await page.waitForTimeout(1500);
        const m = await page.evaluate(() => {
            const plate = document.querySelector(".dock-plate");
            const after = getComputedStyle(plate, "::after");
            const urlPaint = [...document.querySelectorAll("*")].flatMap((el) =>
                [getComputedStyle(el).backgroundImage, getComputedStyle(el, "::before").backgroundImage, getComputedStyle(el, "::after").backgroundImage]
                    .filter((v) => v && v.includes("url("))
                    .map(() => el.className && typeof el.className === "string" ? el.className.split(" ")[0] : el.tagName),
            );
            return {
                lcpSupported: window.__lcpSupported,
                lcp: window.__lcp,
                after: {
                    backgroundImage: after.backgroundImage.slice(0, 40),
                    maskImage: (after.maskImage || after.webkitMaskImage || "").slice(0, 40),
                    backgroundColor: after.backgroundColor,
                    opacity: after.opacity,
                    blend: after.mixBlendMode,
                },
                urlBackgrounds: urlPaint,
            };
        });
        const box = await page.locator(".dock-plate").boundingBox();
        await shot(page, `o185-${cell}`, box, 6);
        results.cells.push({ item: "O-185", cell, ...m });
        const named = m.lcp.filter((e) => e.dockPlate);
        const maskPaint = m.after.backgroundImage.startsWith("radial-gradient") && !m.after.backgroundImage.includes("url(") && !m.after.maskImage.includes("url(");
        verdict("O-185", `${cell} no LCP entry names .dock-plate`, m.lcpSupported ? named.length === 0 : null, {
            lcpSupported: m.lcpSupported,
            entries: m.lcp,
        });
        verdict("O-185", `${cell} the grain paints as generated gradients, with no url() image`, maskPaint, m.after);
    } finally {
        await context.close();
    }
}

// ── O-204 (3) · the blob paints past its box ──────────────────────────────────────────
function pixelReader(buf) {
    const img = PNG.sync.read(buf);
    return (x, y) => {
        const xi = Math.round(x), yi = Math.round(y);
        if (xi < 0 || yi < 0 || xi >= img.width || yi >= img.height) throw new Error(`pixel ${xi},${yi} outside the capture`);
        const i = (img.width * yi + xi) << 2;
        return [img.data[i], img.data[i + 1], img.data[i + 2]];
    };
}
const dist = (a, b) => Math.max(...a.map((v, i) => Math.abs(v - b[i])));
async function blobReach(browser, width, theme) {
    const cell = `${width}-${theme}`;
    const { context, page } = await open(browser, { width, os: theme, query: `scene=blob&theme=${theme}` });
    try {
        await page.waitForTimeout(2500);
        const wrap = await page.evaluate(() => {
            const el = document.querySelector(".goo-blob-wrapper");
            const r = el.getBoundingClientRect();
            const cs = getComputedStyle(el);
            return { x: r.x, y: r.y, w: r.width, h: r.height, contain: cs.contain, contentVisibility: cs.contentVisibility, canvas: !!el.querySelector("canvas") };
        });
        const full = await page.screenshot();
        const px = pixelReader(full);
        const cx = wrap.x + wrap.w / 2, cy = wrap.y + wrap.h / 2;
        const ground = px(Math.min(cx + wrap.w / 2 + 150, width - 4), cy);
        const out = {
            right: px(wrap.x + wrap.w + 10, cy),
            left: px(wrap.x - 10, cy),
            top: px(cx, wrap.y - 10),
            bottom: px(cx, wrap.y + wrap.h + 10),
        };
        const inside = px(cx, cy);
        const deltas = Object.fromEntries(Object.entries(out).map(([k, v]) => [k, dist(v, ground)]));
        await shot(page, `o204-${cell}`, { x: wrap.x, y: wrap.y, width: wrap.w, height: wrap.h }, 70);
        results.cells.push({ item: "O-204(3)", cell, wrap, ground, inside, out, deltas });
        const drawn = dist(inside, ground) > 40;
        verdict("O-204(3)", `${cell} the body paints 10 px outside the wrapper on all four sides`, drawn && Object.values(deltas).every((d) => d > 40), {
            drawn, deltas, contain: wrap.contain, contentVisibility: wrap.contentVisibility,
        });
    } finally {
        await context.close();
    }
}
async function blobPark(browser, width) {
    const cell = `${width}-light`;
    const { context, page } = await open(browser, { width, os: "light", query: "scene=blob&blob=park" });
    try {
        await page.waitForTimeout(1500);
        const count = async () => {
            const a = await page.evaluate(() => window.__rafCalls);
            await page.waitForTimeout(1000);
            return (await page.evaluate(() => window.__rafCalls)) - a;
        };
        const visible = await count();
        await page.evaluate(() => window.scrollTo(0, 4000));
        await page.waitForTimeout(800);
        const away = await count();
        await page.evaluate(() => window.scrollTo(0, 0));
        await page.waitForTimeout(800);
        const back = await count();
        results.cells.push({ item: "O-204(3) park", cell, visible, away, back });
        verdict("O-204(3)", `${cell} park: frames while visible > 0, while scrolled away 0, back > 0`, visible > 0 && away === 0 && back > 0, { visible, away, back });
    } finally {
        await context.close();
    }
}

const browser = await launch();
try {
    results.version = browser.version();
    for (const width of WIDTHS) {
        await scheme(browser, width);
        for (const theme of THEMES) {
            await grain(browser, width, theme);
            await blobReach(browser, width, theme);
        }
        await blobPark(browser, width);
    }
} finally {
    await browser.close();
}
results.verdicts = verdicts;
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify(results, null, 1));
for (const v of verdicts) console.log(`${v.pass === null ? "N/A " : v.pass ? "PASS" : "FAIL"} ${v.item} ${v.cell} ${JSON.stringify(v.detail).slice(0, 220)}`);
const failed = verdicts.filter((v) => v.pass === false).length;
console.log(`${label} ${engineName}: ${verdicts.filter((v) => v.pass).length} pass, ${failed} fail, ${verdicts.filter((v) => v.pass === null).length} n/a`);
process.exitCode = failed ? 1 : 0;
