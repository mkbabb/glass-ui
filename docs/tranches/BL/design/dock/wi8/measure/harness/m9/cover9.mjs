// cover9.mjs <port> <tag>: MEASURE-9 part H, item H12 (RU-109 as amended for C8-M12): which code lines of
// src/components/dock no cell reaches. Chromium (V8's block coverage is Chromium's), the headless shell, on the tip's dev
// server (the source served unminified, each module with its inline source map). Every cell of the measure page
// (?c=dock-wi8&cell=...), every composition of dock-comp, and the dock harness pages of tests-visual, each in a new
// context at 1440 by 900 fine and again at 390 by 844 coarse (touch, a mobile viewport), and driven alike: loaded, the
// first dock hovered (or tapped) open, its first run seat pressed, Tab and the arrow keys through it, Escape, a press
// outside, the page scrolled, the viewport resized and back, then 1.2 s. Coverage is kept across navigations and read
// once per context; a byte range's count is the innermost range's, and a source line counts as reached when any of its
// mapped positions ran in any context. Per file of src/components/dock: the code lines (the counter's rule:
// s8/codelines.mjs) with a mapping, those reached, and those never reached, as ranges. CSS is not covered.
// Output: logs/m9-cover-<tag>.json and a text summary on stdout. One browser, a context per cell, closed in finally.
import { createRequire } from "node:module";
import { writeFileSync, readFileSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const { SourceMapConsumer } = require("source-map-js");
const [port, tag] = process.argv.slice(2);
const T = "/Users/mkbabb/Programming/glass-ui/.claude/worktrees/bl/dock/wi8/.m9-tip";
const CELLS = "w-atlas w-atlas-preset w-card w-color w-ctl w-ctl-mix w-ctl-own w-ctl1 w-ctl6 w-ctlm w-ctlout w-daraksha w-dk w-docks w-figure w-flow w-fourier w-fourier-app w-g7 w-g8 w-glyphs w-group w-inflow w-kf w-kfcode w-kfs w-layers w-long w-lseats w-many w-outlet w-persist w-pill w-pwords w-rail w-railp w-rim w-rounded w-sci w-seat w-seatset w-segpair w-std w-tall w-tallrow w-tiers w-transport w-trig w-two w-valuejs w-vert w-wide w-words w-xf".split(" ");
const COMP = "action-row canvas-tools chrome corner-controls dials figure-tools fission loose nav pager pill rail transport wash".split(" ");
const HARN = ["release-10-1-1/harness", "release-10-1-2/harness", "release-10-1-3/harness", "release-10-1-5/harness", "release-11-0-1/harness", "release-11-0-2/fold-harness", "release-11-0-2/fold-content-harness", "release-11-0-2/press-harness", "release-11-0-2/hover-harness", "release-11-0-2/popover-harness", "release-11-0-2/rail-harness", "release-11-0-2/static-harness", "release-11-0-2/radius-harness", "release-11-0-2/wheel-harness", "release-11-0-2/cutcap-harness", "ro-loop/ro-harness", "b7-shape/harness", "u-b7/harness"];
const URLS = [...CELLS.map((c) => `/?c=dock-wi8&cell=${c}`), ...COMP.map((p) => `/?c=dock-comp&page=${p}&ground=flat`), ...HARN.map((h) => `/tests-visual/${h}.html`)];
const D = "/src/components/dock/";
// per source file: line -> reached (true) / mapped and never reached (false)
const lines = new Map();
const maps = new Map();
function absorb(entry) {
    const u = new URL(entry.url);
    if (!u.pathname.startsWith(D) || /[?&]type=style|\.css$/.test(u.pathname + u.search)) return;
    const file = u.pathname.slice(1);
    const src = entry.source ?? "";
    const m = src.match(/\/\/# sourceMappingURL=data:application\/json;(?:charset=utf-8;)?base64,([A-Za-z0-9+/=]+)\s*$/);
    if (!m) return;
    const key = entry.url;
    let cons = maps.get(key);
    if (!cons) { cons = new SourceMapConsumer(JSON.parse(Buffer.from(m[1], "base64").toString("utf8"))); maps.set(key, cons); }
    // the count at each offset: ranges painted from the widest to the narrowest
    const counts = new Int32Array(src.length).fill(-1);
    const ranges = entry.functions.flatMap((f) => f.ranges).sort((a, b) => b.endOffset - b.startOffset - (a.endOffset - a.startOffset));
    for (const r of ranges) counts.fill(r.count, r.startOffset, Math.min(r.endOffset, src.length));
    const starts = [0];
    for (let i = 0; i < src.length; i++) if (src.charCodeAt(i) === 10) starts.push(i + 1);
    const own = lines.get(file) ?? new Map();
    cons.eachMapping((mp) => {
        if (mp.originalLine == null || !mp.source) return;
        if (!mp.source.replace(/^.*\/src\//, "src/").endsWith(file.replace(/^src\//, "")) && !mp.source.endsWith(file.split("/").pop())) return;
        const off = (starts[mp.generatedLine - 1] ?? 0) + mp.generatedColumn;
        const c = counts[off];
        if (c === -1 || c === undefined) return;
        const was = own.get(mp.originalLine);
        own.set(mp.originalLine, was === true || c > 0);
    });
    lines.set(file, own);
}
async function drive(page, coarse) {
    const dock = page.locator(".glass-dock").first();
    if (!(await dock.count())) return;
    const b = await dock.boundingBox().catch(() => null);
    if (!b) return;
    const cx = b.x + b.width / 2, cy = b.y + b.height / 2;
    if (coarse) await page.touchscreen.tap(cx, cy).catch(() => {});
    else { await page.mouse.move(b.x - 20, cy); await page.mouse.move(cx, cy, { steps: 4 }); }
    await page.waitForTimeout(900);
    const seat = page.locator(".glass-dock .dock-run > *").first();
    if (await seat.count()) await seat.click({ timeout: 2000, force: true }).catch(() => {});
    await page.waitForTimeout(500);
    await page.keyboard.press("Tab").catch(() => {});
    for (const k of ["ArrowRight", "ArrowRight", "ArrowLeft", "End", "Home", "Escape"]) await page.keyboard.press(k).catch(() => {});
    await page.waitForTimeout(400);
    if (coarse) await page.touchscreen.tap(8, 830).catch(() => {}); else await page.mouse.click(1430, 890);
    await page.waitForTimeout(700);
    await page.mouse.wheel(0, 240).catch(() => {});
    await page.evaluate(() => scrollBy(0, 200)).catch(() => {});
    await page.waitForTimeout(300);
    const vp = page.viewportSize();
    await page.setViewportSize({ width: Math.round(vp.width * 0.6), height: vp.height });
    await page.waitForTimeout(500);
    await page.setViewportSize(vp);
    await page.waitForTimeout(1200);
}
let browser;
const errors = [];
try {
    browser = await pw.chromium.launch({ headless: true });
    for (const coarse of [false, true]) for (const u of URLS) {
        const ctx = await browser.newContext({ viewport: coarse ? { width: 390, height: 844 } : { width: 1440, height: 900 }, ...(coarse ? { hasTouch: true, isMobile: true } : {}) });
        let page;
        try {
            page = await ctx.newPage();
            await page.coverage.startJSCoverage({ resetOnNavigation: false });
            await page.goto(`http://127.0.0.1:${port}${u}`, { timeout: 60000 });
            await page.waitForSelector(".glass-dock", { timeout: 20000 }).catch(() => {});
            await page.waitForTimeout(800);
            await drive(page, coarse);
        } catch (e) {
            errors.push(`${u} ${coarse ? "coarse" : "fine"}: ${String(e).slice(0, 160)}`);
        } finally {
            if (page) { try { for (const e of await page.coverage.stopJSCoverage()) absorb(e); } catch (e) { errors.push(`coverage ${u}: ${String(e).slice(0, 120)}`); } }
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    // the counter's rule on the tree's own file: a line is code unless blank or it opens or continues a comment
    const codeLines = (file) => {
        const L = readFileSync(`${T}/${file}`, "utf8").split("\n");
        const set = new Set();
        let inC = false, inStyle = false;
        L.forEach((l, i) => {
            const s = l.trim();
            if (/^<style/.test(s)) inStyle = true;
            if (inC) { if (s.includes("*/")) inC = false; return; }
            if (s.startsWith("/*") && !s.includes("*/")) { inC = true; return; }
            if (!s || s.startsWith("//") || s.startsWith("/*") || s.startsWith("<!--")) return;
            if (!inStyle) set.add(i + 1);
            if (/^<\/style>/.test(s)) inStyle = false;
        });
        return set;
    };
    const ranges = (ns) => { const out = []; let a = null, p = null; for (const n of ns) { if (a !== null && n === p + 1) { p = n; continue; } if (a !== null) out.push(a === p ? `${a}` : `${a}-${p}`); a = p = n; } if (a !== null) out.push(a === p ? `${a}` : `${a}-${p}`); return out; };
    const files = {};
    let tot = { code: 0, mapped: 0, reached: 0, never: 0 };
    for (const [file, own] of [...lines.entries()].sort()) {
        const code = codeLines(file);
        const mapped = [...own.keys()].filter((n) => code.has(n)).sort((x, y) => x - y);
        const never = mapped.filter((n) => own.get(n) === false);
        files[file] = { code: code.size, mapped: mapped.length, reached: mapped.length - never.length, never: never.length, neverRanges: ranges(never) };
        tot.code += code.size; tot.mapped += mapped.length; tot.reached += mapped.length - never.length; tot.never += never.length;
    }
    writeFileSync(new URL(`../../logs/m9-cover-${tag}.json`, import.meta.url), JSON.stringify({ tag, contexts: URLS.length * 2, urls: URLS, errors, total: tot, files }, null, 1));
    console.log(`contexts ${URLS.length * 2}, errors ${errors.length}; script code lines ${tot.code}, mapped ${tot.mapped}, reached ${tot.reached}, never ${tot.never}`);
    for (const [f, r] of Object.entries(files)) console.log(`${String(r.never).padStart(4)} never of ${String(r.mapped).padStart(4)} mapped (${r.code} code)  ${f}`);
}
