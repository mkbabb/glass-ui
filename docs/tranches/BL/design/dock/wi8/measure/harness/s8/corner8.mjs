// corner8.mjs <port> <tag> [--engine chromium|webkit] [--scheme light|dark] [--cells w-card,w-rounded]: ORCH-LINES-7
// item 4, the source seat's read. Each cell (dock-wi8.vue's w-card and w-rounded) is folded at rest, opened by hover and
// folded by a press outside, at 1440 by 900; every animation frame of both travels, and 0.5 s at each rest, reads the
// root (.glass-dock) and the plate (.dock-plate): the four computed corners, the used corner after CSS's overlap rule
// (each radius scaled by min(1, side / the sum of its two radii)), and the scale every transform, `scale` and `zoom`
// from the element up to the document puts on it, per axis. The corner a viewer sees is the used radius times that
// scale on each axis; a frame whose x and y differ by more than 0.5 px is unequal. The folded rest's box and corner are
// printed for the disc-or-corner look (recorded, not judged). One browser, a context per cell, closed in finally.
// Output: logs/s8-corner-<tag>.<engine>.<scheme>.json.
import { createRequire } from "node:module";
import { writeFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const scheme = val("--scheme", "light");
const CELLS = val("--cells", "w-card,w-rounded").split(",");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
const SAMPLER = () => {
    const parse = (v) => {
        const p = v.split(" ").map(parseFloat);
        return [p[0], p.length > 1 ? p[1] : p[0]];
    };
    const scaleOf = (el) => {
        let sx = 1, sy = 1;
        for (let n = el; n && n.nodeType === 1; n = n.parentElement) {
            const s = getComputedStyle(n);
            if (s.transform && s.transform !== "none") {
                const m = new DOMMatrix(s.transform);
                sx *= Math.hypot(m.a, m.b);
                sy *= Math.hypot(m.c, m.d);
            }
            if (s.scale && s.scale !== "none") {
                const p = s.scale.split(" ").map(parseFloat);
                sx *= p[0];
                sy *= p.length > 1 ? p[1] : p[0];
            }
            const z = parseFloat(s.zoom || "1");
            if (z && z !== 1) { sx *= z; sy *= z; }
        }
        return [sx, sy];
    };
    const read = (el) => {
        if (!el) return null;
        const s = getComputedStyle(el);
        const w = el.offsetWidth, h = el.offsetHeight;
        const tl = parse(s.borderTopLeftRadius), tr = parse(s.borderTopRightRadius), br = parse(s.borderBottomRightRadius), bl = parse(s.borderBottomLeftRadius);
        const f = Math.min(1, w / (tl[0] + tr[0] || 1), w / (bl[0] + br[0] || 1), h / (tl[1] + bl[1] || 1), h / (tr[1] + br[1] || 1));
        const [sx, sy] = scaleOf(el);
        const x = tl[0] * f * sx, y = tl[1] * f * sy;
        return { w, h, computed: s.borderTopLeftRadius, x: +x.toFixed(2), y: +y.toFixed(2), sx: +sx.toFixed(4), sy: +sy.toFixed(4) };
    };
    window.__frames = [];
    window.__on = true;
    const d = document.querySelector(`[data-testid=${window.__cell}]`);
    const tick = (t) => {
        window.__frames.push({ t: +t.toFixed(1), phase: window.__phase, morphing: d.hasAttribute("data-morphing"), expanded: d.classList.contains("expanded"), root: read(d), plate: read(d.querySelector(".dock-plate")) });
        if (window.__on) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
};
const out = { engine, scheme, viewport: [1440, 900], cells: {} };
let browser;
try {
    browser = engine === "webkit"
        ? await pw.webkit.launch({ headless: true, executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` })
        : await pw.chromium.launch({ headless: true });
    for (const cell of CELLS) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, colorScheme: scheme });
        try {
            const page = await ctx.newPage();
            await page.goto(`http://127.0.0.1:${port}/?c=dock-wi8&cell=${cell}`, { waitUntil: "load" });
            if (scheme === "dark") await page.evaluate(() => document.documentElement.classList.add("dark"));
            const sel = `[data-testid=${cell}]`;
            await page.waitForSelector(sel, { timeout: 30000 });
            await page.mouse.move(5, 5);
            await sleep(1500);
            await page.evaluate((c) => { window.__cell = c; window.__phase = "rest-folded"; }, cell);
            await page.evaluate(SAMPLER);
            await sleep(500);
            const box = await page.locator(sel).boundingBox();
            await page.evaluate(() => (window.__phase = "unfold"));
            await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2, { steps: 4 });
            await sleep(1500);
            await page.evaluate(() => (window.__phase = "rest-open"));
            await sleep(500);
            await page.evaluate(() => (window.__phase = "fold"));
            await page.mouse.move(8, 8, { steps: 4 });
            await page.mouse.down();
            await page.mouse.up();
            await sleep(1800);
            await page.evaluate(() => (window.__phase = "rest-folded-after"));
            await sleep(500);
            const frames = await page.evaluate(() => { window.__on = false; return window.__frames; });
            const unequal = (k) => frames.filter((f) => f[k] && Math.abs(f[k].x - f[k].y) > 0.5);
            const worst = (k) => unequal(k).reduce((m, f) => Math.max(m, Math.abs(f[k].x - f[k].y)), 0);
            const at = (p) => frames.filter((f) => f.phase === p).slice(-1)[0];
            out.cells[cell] = {
                frames: frames.length,
                byPhase: Object.fromEntries(["rest-folded", "unfold", "rest-open", "fold", "rest-folded-after"].map((p) => [p, frames.filter((f) => f.phase === p).length])),
                morphingFrames: frames.filter((f) => f.morphing).length,
                scaled: frames.filter((f) => f.plate && (f.plate.sx !== 1 || f.plate.sy !== 1)).length,
                unequalPlate: unequal("plate").length,
                unequalRoot: unequal("root").length,
                worstPlatePx: +worst("plate").toFixed(2),
                worstRootPx: +worst("root").toFixed(2),
                folded: at("rest-folded")?.plate ?? null,
                open: at("rest-open")?.plate ?? null,
                foldedAfter: at("rest-folded-after")?.plate ?? null,
                plateRadiusRange: [Math.min(...frames.filter((f) => f.plate).map((f) => f.plate.x)), Math.max(...frames.filter((f) => f.plate).map((f) => f.plate.x))],
                sample: frames.filter((_, i) => i % 6 === 0).map((f) => [f.phase, f.plate?.w, f.plate?.h, f.plate?.x, f.plate?.y, f.root?.x, f.root?.y]),
            };
            console.log(cell, JSON.stringify({ ...out.cells[cell], sample: undefined }));
        } finally {
            await ctx.close();
        }
    }
} finally {
    await browser?.close();
}
writeFileSync(new URL(`../../logs/s8-corner-${tag}.${engine}.${scheme}.json`, import.meta.url), JSON.stringify(out, null, 1));
