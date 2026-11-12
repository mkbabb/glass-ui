// Proposal B capture + measure harness. One browser per run, one context per cell,
// everything closed in finally. Usage: node capture.mjs <chromium|webkit> <outDir> [base]
import { chromium, webkit } from "/Users/mkbabb/Programming/glass-ui/node_modules/playwright/index.mjs";
import { mkdirSync, writeFileSync } from "node:fs";

const [engineName, out] = process.argv.slice(2);
const WT = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/cluster/proposal-B";
// The dev server lives inside this run and stops with it (one guarded browser run).
const { createServer } = await import(WT + "/node_modules/vite/dist/node/index.js");
process.chdir(WT);
const server = await createServer({ root: WT, configFile: WT + "/vite.config.ts", server: { port: 5471, strictPort: true, host: "localhost" }, logLevel: "warn" });
await server.listen();
const base = "http://localhost:5471";
const engine = engineName === "webkit" ? webkit : chromium;
const URL = `${base}/demo/fixtures/dock-cluster.html`;
mkdirSync(out, { recursive: true });
const results = [];

// The frames: rest-split, three mid-morph frames on the fuse, rest-fused.
const FRAMES = [
    ["rest-split", 0],
    ["mid-j0.25", 0.25],
    ["mid-j0.55", 0.55],
    ["mid-j0.80", 0.8],
    ["rest-fused", 1],
];

async function crop(page) {
    const r = await page.getByTestId("cluster").boundingBox();
    const pad = 28;
    return { x: Math.max(0, r.x - pad), y: Math.max(0, r.y - pad), width: r.width + 2 * pad, height: r.height + 2 * pad };
}

async function cell(browser, { width, dark, n }) {
    const ctx = await browser.newContext({ viewport: { width, height: 400 }, deviceScaleFactor: 2, colorScheme: dark ? "dark" : "light" });
    try {
        const page = await ctx.newPage();
        const errors = [];
        page.on("pageerror", (e) => errors.push(String(e)));
        page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
        await page.goto(`${URL}?n=${n}&dark=${dark ? 1 : 0}`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
        const tag = `${engineName}-${width}-${dark ? "dark" : "light"}-n${n}`;
        const clip = await crop(page);
        for (const [name, j] of FRAMES) {
            await page.evaluate(([jj, k]) => window.__cluster.seat(Array.from({ length: k }, () => jj)), [j, n - 1]);
            await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
            await page.screenshot({ path: `${out}/${tag}-${name}.png`, clip });
        }
        // Computed radii and clip strings at a mid frame: no % anywhere.
        await page.evaluate((k) => window.__cluster.seat(Array.from({ length: k }, () => 0.55)), n - 1);
        const geo = await page.evaluate(() => {
            const els = [...document.querySelectorAll(".dock-cluster-plate, .dock-cluster-rim, .dock-cluster-shadow, .dock-cluster-shadow-fill")];
            return els.map((e) => {
                const cs = getComputedStyle(e);
                return { cls: e.className, radius: cs.borderRadius, clip: cs.clipPath.slice(0, 60), clipHasPct: /%/.test(cs.clipPath), bf: cs.backdropFilter || cs.webkitBackdropFilter };
            });
        });
        results.push({ tag, errors, geo });
    } finally {
        await ctx.close();
    }
}

// Decode a PNG in the page and return luma rows (device px) for the given css-px y's,
// over the css-px x span [x0, x1). Reads from ONE full-crop screenshot.
async function rowsFrom(page, clip, dsf, ys, x0, x1) {
    const buf = await page.screenshot({ clip });
    return page.evaluate(async ({ b64, clip, dsf, ys, x0, x1 }) => {
        const img = new Image(); img.src = "data:image/png;base64," + b64; await img.decode();
        const c = document.createElement("canvas"); c.width = img.width; c.height = img.height;
        const g = c.getContext("2d"); g.drawImage(img, 0, 0);
        const out = {};
        for (const [label, y] of ys) {
            const row = Math.round((y - clip.y) * dsf);
            const a = Math.round((x0 - clip.x) * dsf), b = Math.round((x1 - clip.x) * dsf);
            const d = g.getImageData(a, row, b - a, 1).data; const ls = [];
            for (let i = 0; i < d.length; i += 4) ls.push(Math.round(0.2126 * d[i] + 0.7152 * d[i + 1] + 0.0722 * d[i + 2]));
            out[label] = ls;
        }
        return out;
    }, { b64: buf.toString("base64"), clip, dsf, ys, x0, x1 });
}
const sd = (ls) => { const m = ls.reduce((a, b) => a + b, 0) / ls.length; return Number(Math.sqrt(ls.reduce((a, b) => a + (b - m) ** 2, 0) / ls.length).toFixed(2)); };

// Backdrop probe: luma std-dev along one text-free row through a plate over the 6px
// stripe field (blurred glass reads ~0-2; an unblurred stripe field reads ~40+).
async function probe(browser, variant, dark) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 400 }, deviceScaleFactor: 1, colorScheme: dark ? "dark" : "light" });
    try {
        const page = await ctx.newPage();
        await page.goto(`${URL}?variant=${variant}&n=3&fused=1&dark=${dark ? 1 : 0}`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
        const r = await page.getByTestId("cluster").boundingBox();
        const clip = { x: r.x - 20, y: r.y - 20, width: r.width + 40, height: r.height + 40 };
        await page.screenshot({ path: `${out}/${engineName}-probe-${variant}-${dark ? "dark" : "light"}.png`, clip });
        // Cluster: the fused bridge between plate 0 and 1 (no glyphs there). Others: the plate centre.
        let x0 = r.x + r.width / 2 - 20, x1 = r.x + r.width / 2 + 20;
        if (variant === "cluster") {
            const cut = await page.evaluate(() => { const d = [...document.querySelectorAll(".dock-cluster > .glass-dock")].map((e) => e.getBoundingClientRect()); return (d[0].right + d[1].left) / 2; });
            x0 = cut - 8; x1 = cut + 8;
        }
        const rows = await rowsFrom(page, clip, 1, [["mid", r.y + r.height / 2], ["outside", r.y - 10]], x0, x1);
        results.push({ tag: `probe-${engineName}-${variant}-${dark ? "dark" : "light"}`, lumaStdPlate: sd(rows.mid), lumaStdOutside: sd(rows.outside) });
    } finally {
        await ctx.close();
    }
}

// Seam: luminance rows across the join at rest-fused (the rim, the plate body, the
// bottom rim, and the shadow below), 24 css px centred on the cut.
async function seam(browser, width, dark) {
    const ctx = await browser.newContext({ viewport: { width, height: 400 }, deviceScaleFactor: 2, colorScheme: dark ? "dark" : "light" });
    try {
        const page = await ctx.newPage();
        await page.goto(`${URL}?n=3&fused=1&dark=${dark ? 1 : 0}`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
        const d = await page.evaluate(() => [...document.querySelectorAll(".dock-cluster > .glass-dock")].map((e) => { const r = e.getBoundingClientRect(); return { l: r.left, r: r.right, t: r.top, b: r.bottom }; }));
        const cut = (d[0].r + d[1].l) / 2;
        const clip = await crop(page);
        const rows = await rowsFrom(page, clip, 2, [["rim-top", d[0].t + 0.5], ["body-upper", d[0].t + 5], ["body-mid", (d[0].t + d[0].b) / 2], ["rim-bottom", d[0].b - 0.5], ["shadow-below", d[0].b + 3]], cut - 12, cut + 12);
        // A seam shows as a column that departs from its neighbours: max |x - median of row|.
        const dev = Object.fromEntries(Object.entries(rows).map(([k, ls]) => { const s2 = [...ls].sort((a, b) => a - b); const med = s2[Math.floor(s2.length / 2)]; return [k, Math.max(...ls.map((v) => Math.abs(v - med)))]; }));
        results.push({ tag: `seam-${engineName}-${width}-${dark ? "dark" : "light"}`, cut, maxDevFromRowMedian: dev, rows });
    } finally {
        await ctx.close();
    }
}

// Accessibility: the tab order and the focused control survive a fuse and a fission.
async function a11y(browser) {
    const ctx = await browser.newContext({ viewport: { width: 1440, height: 400 } });
    try {
        const page = await ctx.newPage();
        await page.goto(`${URL}?n=3`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
        const name = () => page.evaluate(() => { const e = document.activeElement; return e ? (e.getAttribute("aria-label") || e.textContent.trim()).slice(0, 20) : null; });
        const order = async () => { await page.evaluate(() => document.activeElement?.blur()); await page.mouse.click(5, 5); const o = []; for (let i = 0; i < 9; i++) { await page.keyboard.press("Tab"); o.push(await name()); } return o; };
        const tree = () => page.evaluate(() => [...document.querySelectorAll(".dock-cluster button, .dock-cluster [role]")].map((e) => `${e.getAttribute("role") || e.tagName}:${e.getAttribute("aria-label") || e.textContent.trim()}:${e.closest("[inert]") ? "inert" : "live"}`));
        const splitOrder = await order();
        const splitTree = await tree();
        // Focus the bookmark control, fuse mid-focus, read focus mid-morph and after.
        await page.getByRole("button", { name: "Bookmark" }).focus();
        await page.evaluate(() => window.__cluster.set(true));
        await page.waitForTimeout(90);
        const focusMid = await name();
        await page.waitForTimeout(600);
        const focusAfter = await name();
        const fusedOrder = await order();
        const fusedTree = await tree();
        results.push({ tag: `a11y-${engineName}`, sameOrder: JSON.stringify(splitOrder) === JSON.stringify(fusedOrder), sameTree: JSON.stringify(splitTree) === JSON.stringify(fusedTree), focusMid, focusAfter, splitOrder, fusedOrder, splitTree });
    } finally {
        await ctx.close();
    }
}

// Frame cost: a 1 s run of fuse/fission toggles; per-frame cluster paint() time and rAF intervals.
async function cost(browser, width) {
    const ctx = await browser.newContext({ viewport: { width, height: 400 }, deviceScaleFactor: 2 });
    try {
        const page = await ctx.newPage();
        await page.goto(`${URL}?n=3`, { waitUntil: "load" });
        await page.waitForFunction(() => window.__ready === true, null, { timeout: 30000 });
        let cdp = null;
        if (engineName === "chromium") {
            cdp = await ctx.newCDPSession(page);
            await cdp.send("Performance.enable");
        }
        const before = cdp ? (await cdp.send("Performance.getMetrics")).metrics : null;
        const res = await page.evaluate(async () => {
            const comp = document.querySelector(".dock-cluster").__vueParentComponent;
            const frames = [];
            let last = performance.now();
            let stop = false;
            const loop = (t) => {
                frames.push(t - last);
                last = t;
                if (!stop) requestAnimationFrame(loop);
            };
            requestAnimationFrame(loop);
            // Instrument paint() through a PerformanceObserver-free wrapper: time the clip writes.
            const t0 = performance.now();
            window.__cluster.set(true);
            await new Promise((r) => setTimeout(r, 450));
            window.__cluster.set(false);
            await new Promise((r) => setTimeout(r, 550));
            stop = true;
            const dur = performance.now() - t0;
            const iv = frames.slice(2);
            const sorted = [...iv].sort((a, b) => a - b);
            return {
                durationMs: Math.round(dur),
                frames: iv.length,
                meanIntervalMs: Number((iv.reduce((a, b) => a + b, 0) / iv.length).toFixed(2)),
                p95IntervalMs: Number(sorted[Math.floor(sorted.length * 0.95)].toFixed(2)),
                maxIntervalMs: Number(sorted[sorted.length - 1].toFixed(2)),
                over20ms: iv.filter((x) => x > 20).length,
                paintCalls: window.__clusterPaintStats?.calls ?? null,
                paintMeanMs: window.__clusterPaintStats ? Number((window.__clusterPaintStats.total / window.__clusterPaintStats.calls).toFixed(3)) : null,
                paintMaxMs: window.__clusterPaintStats ? Number(window.__clusterPaintStats.max.toFixed(3)) : null,
            };
        });
        let metrics = null;
        if (cdp) {
            const after = (await cdp.send("Performance.getMetrics")).metrics;
            const m = (arr, k) => arr.find((x) => x.name === k)?.value ?? 0;
            metrics = Object.fromEntries(["LayoutCount", "RecalcStyleCount", "LayoutDuration", "RecalcStyleDuration", "ScriptDuration", "TaskDuration"].map((k) => [k, Number((m(after, k) - m(before, k)).toFixed(4))]));
        }
        results.push({ tag: `cost-${engineName}-${width}`, ...res, metrics });
    } finally {
        await ctx.close();
    }
}

const browser = await engine.launch({ headless: true });
try {
    for (const width of [390, 1440]) {
        for (const dark of [false, true]) {
            for (const n of [2, 3]) await cell(browser, { width, dark, n });
            await seam(browser, width, dark);
        }
        await cost(browser, width);
    }
    await a11y(browser);
    for (const dark of [false, true]) {
        for (const v of ["cluster", "ancestor", "reference"]) await probe(browser, v, dark);
    }
} finally {
    await browser.close();
    await server.close();
    writeFileSync(`${out}/${engineName}-results.json`, JSON.stringify(results, null, 1));
}
console.log(JSON.stringify(results.filter((r) => !r.geo).map(({ rows, ...r }) => r)));
