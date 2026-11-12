// Challenge probe. node probe.mjs <chromium|webkit> <base> <out> <modes>
// One browser per run, a new context per cell, all closed in finally.
import { chromium, webkit } from "playwright";
import { createRequire } from "node:module";
import { existsSync, mkdirSync, writeFileSync } from "node:fs";
import { homedir } from "node:os";
import { dirname, join } from "node:path";

const require = createRequire(import.meta.url);
const { PNG } = require(join(dirname(require.resolve("playwright-core")), "lib/utilsBundle.js"));
const [engine, base, outDir, modesArg = "clear,skip,misc,comp,late,far,zoom", tag = "", variant = ""] = process.argv.slice(2);
const VQ = variant ? `&v=${variant}` : "";
const modes = new Set(modesArg.split(","));
const pngDir = join(outDir, "png");
mkdirSync(pngDir, { recursive: true });
const WEBKIT_2287 = join(homedir(), "Library/Caches/ms-playwright/webkit-2287/pw_run.sh");
const launch = () => (engine === "webkit" ? webkit.launch(existsSync(WEBKIT_2287) ? { executablePath: WEBKIT_2287 } : {}) : chromium.launch());
const PATH = "/proto/challenge/index.html";
const out = { engine, version: null, cells: {} };
const save = () => writeFileSync(join(outDir, `${engine}-${tag || modesArg.replace(/,/g, "+")}.json`), JSON.stringify(out, null, 1));
const pfx = tag ? `${tag}-` : "";

async function open(browser, query, { width = 1000, height = 3000, dpr = 2, colorScheme = "light", forcedColors = "none", late = 0 } = {}) {
    // glass's dark-mode composable writes an inline color-scheme from the emulated preference, so the context's scheme follows the theme.
    const context = await browser.newContext({ viewport: { width, height }, deviceScaleFactor: dpr, colorScheme, forcedColors });
    const page = await context.newPage();
    if (late) await page.route(/\?late$/, async (route) => { await new Promise((ok) => setTimeout(ok, late)); await route.continue(); });
    const errors = [];
    page.on("pageerror", (e) => errors.push(String(e)));
    page.on("console", (m) => { if (m.type() === "warning" && /\[Mark\]/.test(m.text())) errors.push("warn: " + m.text()); });
    await page.goto(`${base}${PATH}?${query}${VQ}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 90_000 });
    return { context, page, errors };
}
const shot = async (page, clip) => PNG.sync.read(await page.screenshot({ clip }));
const rowClip = (page, row, pad = 8) =>
    page.evaluate(({ row, pad }) => {
        const r = document.querySelector(`[data-row="${row}"]`).getBoundingClientRect();
        return { x: Math.max(0, Math.floor(r.left - pad)), y: Math.max(0, Math.floor(r.top - pad)), width: Math.ceil(Math.min(r.width, innerWidth - r.left) + 2 * pad), height: Math.ceil(r.height + 2 * pad) };
    }, { row, pad });
function diff(a, b, threshold = 48) {
    let n = 0, max = 0;
    const len = Math.min(a.data.length, b.data.length);
    for (let i = 0; i < len; i += 4) {
        const d = Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2]));
        if (d > max) max = d;
        if (d > threshold) n++;
    }
    return { pixels: n, maxChannelDelta: max };
}
function stack(images, gap = 6) {
    const width = Math.max(...images.map((i) => i.width));
    const height = images.reduce((s, i) => s + i.height, 0) + gap * (images.length - 1);
    const png = new PNG({ width, height });
    for (let i = 0; i < width * height; i++) png.data.set([128, 128, 128, 255], i * 4);
    let y = 0;
    for (const im of images) { PNG.bitblt(im, png, 0, 0, im.width, im.height, 0, y); y += im.height + gap; }
    return png;
}
const isGlyph = (d, i) => d[i] < 128 && d[i + 1] < 128 && d[i + 2] < 128;           // at least half-covered black
const isMark = (d, i) => d[i] > 200 && d[i + 2] > 200 && d[i + 1] < 128;            // at least half-covered magenta
const magenta = (img) => { let n = 0; for (let i = 0; i < img.data.length; i += 4) if (isMark(img.data, i)) n++; return n; };

/** One row from its glyph pass and its mark pass (same clip, device px at `dpr`). */
function measure(g, m, dpr, baselineY) {
    const W = g.width, H = g.height;
    let cross = 0, gx0 = Infinity, gx1 = -1, mx0 = Infinity, mx1 = -1, my0 = Infinity, my1 = -1, gy1 = -1;
    const mcol = new Uint8Array(W);
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) {
        const i = (y * W + x) * 4;
        const gg = isGlyph(g.data, i), mm = isMark(m.data, i);
        if (gg) { gx0 = Math.min(gx0, x); gx1 = Math.max(gx1, x); gy1 = Math.max(gy1, y); }
        if (mm) { mx0 = Math.min(mx0, x); mx1 = Math.max(mx1, x); my0 = Math.min(my0, y); my1 = Math.max(my1, y); mcol[x] = 1; }
        if (gg && mm) cross++;
    }
    const pieces = [];
    for (let x = 0, s = -1; x <= W; x++) {
        if (x < W && mcol[x]) { if (s < 0) s = x; } else if (s >= 0) { pieces.push(+((x - s) / dpr).toFixed(1)); s = -1; }
    }
    const r = (v) => +(v / dpr).toFixed(2);
    return {
        crossDevicePx: cross, pieces: pieces.length, pieceWidths: pieces,
        startPastInk: r(gx0 - mx0), endPastInk: r(mx1 - gx1),
        markTopBelowBaseline: baselineY == null ? null : r(my0 - baselineY * dpr), markBottomBelowBaseline: baselineY == null ? null : r(my1 + 1 - baselineY * dpr),
        glyphBottomBelowBaseline: baselineY == null ? null : r(gy1 + 1 - baselineY * dpr),
        thickness: r(my1 - my0 + 1),
    };
}

async function selCell(browser, theme) {
    const scheme = theme === "dark" ? "dark" : "light";
    const { context, page, errors } = await open(browser, `scene=static&group=sel&theme=${scheme}`, { height: 1400, colorScheme: scheme, forcedColors: theme === "forced" ? "active" : "none" });
    try {
        const res = { errors, supports: await page.evaluate(() => window.__supports), rows: {}, bands: {} };
        res.bands = await page.evaluate(() => Object.fromEntries(Array.from(document.querySelectorAll("[data-band]")).map((el) => [el.dataset.band, getComputedStyle(el).textDecorationColor])));
        res.schemeRules = await page.evaluate(() => window.__schemeRules);
        res.scheme = await page.evaluate(() => ({ colorScheme: getComputedStyle(document.documentElement).colorScheme, fg: getComputedStyle(document.body).color, bg: getComputedStyle(document.body).backgroundColor }));
        const near = (d, i, c, t = 48) => Math.abs(d[i] - c[0]) <= t && Math.abs(d[i + 1] - c[1]) <= t && Math.abs(d[i + 2] - c[2]) <= t;
        for (const id of ["ref", "final", "bite", "nobg", "hl", "inline", "fcbite", "route", "ul"]) {
            const geo = await page.evaluate((id) => {
                const row = document.querySelector(`[data-row="sel-${id}"]`);
                row.scrollIntoView({ block: "center" });
                const m = row.querySelector("[data-sel]").getBoundingClientRect();
                const c = document.createElement("canvas").getContext("2d"); c.fillStyle = getComputedStyle(row).color; c.fillRect(0, 0, 1, 1);
                return { clip: { x: Math.floor(m.left), y: Math.floor(m.top), width: Math.ceil(m.width), height: Math.ceil(m.height) }, text: Array.from(c.getImageData(0, 0, 1, 1).data).slice(0, 3) };
            }, id);
            const plain = await shot(page, geo.clip);
            await page.evaluate((id) => {
                const row = document.querySelector(`[data-row="sel-${id}"]`);
                const r = document.createRange(); r.selectNodeContents(row);
                const s = getSelection(); s.removeAllRanges(); s.addRange(r);
            }, id);
            await page.waitForTimeout(150);
            const sel = await shot(page, geo.clip);
            const rowImg = await shot(page, await rowClip(page, `sel-${id}`, 4));
            await page.evaluate(() => getSelection().removeAllRanges());
            // the commonest colour is the ground; ink is whatever stands 80 or more off it
            const stats = (img) => {
                const hist = new Map(); let textPx = 0;
                for (let i = 0; i < img.data.length; i += 4) { const k = (img.data[i] >> 3) << 10 | (img.data[i + 1] >> 3) << 5 | (img.data[i + 2] >> 3); hist.set(k, (hist.get(k) ?? 0) + 1); if (near(img.data, i, geo.text)) textPx++; }
                let best = 0, bk = 0; for (const [k, n] of hist) if (n > best) { best = n; bk = k; }
                const ground = [((bk >> 10) & 31) << 3, ((bk >> 5) & 31) << 3, (bk & 31) << 3];
                let ink = 0, lum = 0;
                const L = (r, g, b) => 0.2126 * r + 0.7152 * g + 0.0722 * b;
                for (let i = 0; i < img.data.length; i += 4) if (!near(img.data, i, ground, 80)) { ink++; lum += L(img.data[i], img.data[i + 1], img.data[i + 2]); }
                return { ground, groundShare: +(best / (img.data.length / 4)).toFixed(3), inkShare: +(ink / (img.data.length / 4)).toFixed(3), textColourPx: textPx, inkMeanLum: ink ? Math.round(lum / ink) : null, groundLum: Math.round(L(...ground)) };
            };
            res.rows[id] = { textColour: geo.text, plain: stats(plain), selected: stats(sel) };
            writeFileSync(join(pngDir, `${pfx}${engine}-sel-${theme}-${id}.png`), PNG.sync.write(rowImg));
        }
        for (const id of Object.keys(res.bands)) {
            const img = await shot(page, await rowClip(page, `band-${id}`, 2));
            writeFileSync(join(pngDir, `${pfx}${engine}-band-${theme}-${id}.png`), PNG.sync.write(img));
        }
        out.cells[`sel-${theme}`] = res;
    } finally { await context.close(); }
}

async function staticCell(browser, group) {
    const { context, page, errors } = await open(browser, `scene=static&group=${group}`, { height: 1200 });
    try {
        const rows = await page.evaluate(() => Array.from(document.querySelectorAll("[data-row]")).map((el) => ({ id: el.dataset.row, measured: !!el.querySelector("[data-m]") })));
        const res = { face: await page.evaluate(() => window.__face), errors, rows: {} };
        const info = {};
        for (const pass of ["glyph", "mark"]) {
            await page.evaluate((p) => document.documentElement.setAttribute("data-pass", p), pass);
            for (const { id, measured } of rows) {
                if (!measured) continue;
                await page.evaluate((id) => document.querySelector(`[data-row="${CSS.escape(id)}"]`).scrollIntoView({ block: "center" }), id);
                const geo = await page.evaluate((id) => {
                    const row = document.querySelector(`[data-row="${CSS.escape(id)}"]`);
                    const r = row.getBoundingClientRect();
                    const bl = row.querySelector(".bl");
                    const mk = row.querySelector("[data-m]");
                    const cs = getComputedStyle(mk);
                    const fs = parseFloat(cs.fontSize);
                    const c = document.createElement("canvas").getContext("2d");
                    c.font = `${cs.fontWeight} ${fs}px ${cs.fontFamily}`;
                    const x = c.measureText("x"), pm = c.measureText("p"), Hm = c.measureText("H");
                    return {
                        clip: { x: Math.max(0, Math.floor(r.left)), y: Math.floor(r.top), width: Math.ceil(r.width + 16), height: Math.ceil(r.height) + (new URLSearchParams(location.search).get("group") === "fold" ? 8 : 0) },
                        baseline: bl ? bl.getBoundingClientRect().bottom - Math.floor(r.top) : null, fs,
                        xHeightEm: x.actualBoundingBoxAscent / fs, pDescentEm: pm.actualBoundingBoxDescent / fs, capEm: Hm.actualBoundingBoxAscent / fs,
                        advanceRight: mk.getBoundingClientRect().right - Math.max(0, Math.floor(r.left)), advanceLeft: mk.getBoundingClientRect().left - Math.max(0, Math.floor(r.left)),
                        bandColor: cs.textDecorationColor,
                    };
                }, id);
                (info[id] ??= { geo })[pass] = await shot(page, geo.clip);
                if (pass === "mark") info[id].geoMark = geo;
            }
        }
        for (const [id, v] of Object.entries(info)) {
            const same = JSON.stringify(v.geo.clip) === JSON.stringify(v.geoMark.clip);
            const meas = measure(v.glyph, v.mark, 2, v.geo.baseline);
            const fs = v.geo.fs;
            res.rows[id] = {
                ...meas, clipStable: same, fs, xHeightEm: +v.geo.xHeightEm.toFixed(3), pDescentEm: +v.geo.pDescentEm.toFixed(3), capEm: +v.geo.capEm.toFixed(3),
                topEm: meas.markTopBelowBaseline == null ? null : +(meas.markTopBelowBaseline / fs).toFixed(3),
                bottomEm: meas.markBottomBelowBaseline == null ? null : +(meas.markBottomBelowBaseline / fs).toFixed(3),
                glyphBottomEm: meas.glyphBottomBelowBaseline == null ? null : +(meas.glyphBottomBelowBaseline / fs).toFixed(3),
                bandColor: v.geo.bandColor,
            };
        }
        // natural-colour captures of a few rows
        await page.evaluate(() => document.documentElement.removeAttribute("data-pass"));
        const keep = rows.filter((r) => /~0$/.test(r.id) || !r.measured || !/~/.test(r.id)).map((r) => r.id);
        for (const id of keep) {
            if (group === "skip" && !/-(plex|georgia|system)-/.test(id)) continue;
            await page.evaluate((id) => document.querySelector(`[data-row="${CSS.escape(id)}"]`).scrollIntoView({ block: "center" }), id);
            const clip = await rowClip(page, id, 4);
            writeFileSync(join(pngDir, `${pfx}${engine}-static-${id.replace(/~0$/, "")}.png`), PNG.sync.write(await shot(page, clip)));
        }
        if (group === "misc") {
            // selection over the two shapes
            for (const id of ["sel-highlight", "sel-underline"]) {
                await page.evaluate((id) => {
                    const row = document.querySelector(`[data-row="${id}"]`);
                    row.scrollIntoView({ block: "center" });
                    const r = document.createRange();
                    r.selectNodeContents(row);
                    const s = getSelection(); s.removeAllRanges(); s.addRange(r);
                }, id);
                await page.waitForTimeout(150);
                const clip = await rowClip(page, id, 4);
                writeFileSync(join(pngDir, `${pfx}${engine}-static-${id}-selected.png`), PNG.sync.write(await shot(page, clip)));
                await page.evaluate(() => getSelection().removeAllRanges());
            }
        }
        out.cells[`static-${group}`] = res;
    } finally { await context.close(); }
}

const seek = (page, f) =>
    page.evaluate((f) => {
        for (const host of document.querySelectorAll("[data-probe]")) {
            const wins = host.querySelectorAll(".mark-line");
            if (!wins.length) continue;
            const anims = host.getAnimations({ subtree: true });
            const dur = anims[0].effect.getComputedTiming().duration;
            for (const a of anims) { a.pause(); a.currentTime = f * wins.length * dur; }
        }
    }, f);
const land = (page) => page.evaluate(() => {
    const s = document.createElement("style"); s.id = "landed";
    s.textContent = ".mark-line, .mark-slide { animation-name: none !important; }";
    document.head.appendChild(s);
});
const release = (page) => page.evaluate(() => { document.getElementById("landed")?.remove(); document.getElementById("hold")?.remove(); });
const states = (page) => page.evaluate(() => Object.fromEntries(Array.from(document.querySelectorAll("[data-probe][data-ink]")).map((el) => [el.dataset.probe, {
    ink: el.dataset.ink, lines: el.querySelectorAll(".mark-line").length, rects: el.getClientRects().length, display: getComputedStyle(el).display,
    textContent: el.textContent, innerText: el.innerText, childElements: el.childElementCount, copiesCarryingHostAttrs: el.querySelectorAll(".mark-layer [data-probe]").length,
    selection: (() => { const s = getSelection(); s.removeAllRanges(); const r = document.createRange(); r.selectNodeContents(el); s.addRange(r); const t = s.toString(); s.removeAllRanges(); return t; })(),
    cloneFocus: (() => { const a = el.querySelector(".mark-layer a[href]"); if (!a) return null; a.focus(); const got = document.activeElement === a; if (got) a.blur(); return got; })(),
    layerInert: el.querySelector(".mark-layer")?.inert ?? null, copyAttrs: Array.from(el.querySelectorAll(".mark-slide > *")).slice(0, 1).map((c) => c.getAttributeNames()),
    layerUserSelect: el.querySelector(".mark-layer") ? [getComputedStyle(el.querySelector(".mark-layer")).userSelect, getComputedStyle(el.querySelector(".mark-layer")).webkitUserSelect] : null,
}])));

async function compCell(browser, shape, name, opts = {}) {
    const ROWS = ["inline", "flex", "grid", "iblock", "mixed", "track", "link", "vw", "rtl", "nested", "big", "clear", "linkin"];
    const { context, page, errors } = await open(browser, `scene=comp&shape=${shape}&hold=1`, opts);
    try {
        const res = { errors, atMount: await page.evaluate(() => window.__atMount), ssr: await page.evaluate(() => window.__ssr) };
        await page.waitForTimeout(1500);
        res.held = await states(page);
        const clips = {};
        for (const r of ROWS) clips[r] = await rowClip(page, r);
        const frames = Object.fromEntries(ROWS.map((r) => [r, []]));
        for (const f of [0.5]) { await seek(page, f); await page.waitForTimeout(150); for (const r of ROWS) frames[r].push(await shot(page, clips[r])); }
        await land(page);
        await page.waitForTimeout(150);
        const landed = {};
        for (const r of ROWS) landed[r] = await shot(page, clips[r]);
        await release(page);
        await page.waitForFunction((n) => window.__drawn.length >= n, ROWS.length, { timeout: 20_000 }).catch(() => {});
        await page.waitForTimeout(300);
        res.swap = {};
        for (const r of ROWS) {
            const rest = await shot(page, clips[r]);
            res.swap[r] = diff(landed[r], rest);
            writeFileSync(join(pngDir, `${pfx}${engine}-${name}-${shape}-${r}.png`), PNG.sync.write(stack([...frames[r], landed[r], rest])));
        }
        res.rest = await states(page);
        res.drawn = await page.evaluate(() => window.__drawn);
        out.cells[`${name}-${shape}`] = res;
    } finally { await context.close(); }
}

/** Marks more than half clipped: do they ever draw? No hold; the mark painted magenta. */
async function clippedCell(browser, shape) {
    const ROWS = ["ellipsis", "ellipsis-plain", "clamp", "clamp-plain", "scroller"];
    const { context, page, errors } = await open(browser, `scene=comp&shape=${shape}&probeink=1`);
    try {
        await page.waitForTimeout(3000);
        const res = { errors, after3s: await states(page), drawn: await page.evaluate(() => window.__drawn), magenta: {} };
        for (const r of ROWS) {
            const img = await shot(page, await rowClip(page, r, 4));
            res.magenta[r] = magenta(img);
            writeFileSync(join(pngDir, `${pfx}${engine}-clipped-${shape}-${r}.png`), PNG.sync.write(img));
        }
        const ratios = () => page.evaluate(() => new Promise((ok) => {
            const o = {};
            const io = new IntersectionObserver((es) => { for (const e of es) o[e.target.dataset.probe] = +e.intersectionRatio.toFixed(3); io.disconnect(); ok(o); });
            for (const p of ["ellipsis", "clamp", "scroller"]) io.observe(document.querySelector(`[data-probe="${p}"][data-ink]`));
        }));
        for (const r of ["ellipsis", "clamp", "scroller"]) res.magenta[r + "-rect"] = await page.evaluate((r) => document.querySelector(`[data-probe="${r}"]`).getClientRects().length, r);
        res.intersectionBefore = await ratios();
        // scroll the rail to its far end and back: does the mark ever draw?
        await page.evaluate(() => { const s = document.querySelector('[data-row="scroller"]'); s.scrollLeft = 120; });
        await page.waitForTimeout(1200);
        res.scrollerAfterNudge = (await states(page)).scroller.ink;
        res.intersectionAfterNudge = await ratios();
        out.cells[`clipped-${shape}`] = res;
    } finally { await context.close(); }
}

/** A face that arrives while the draw is under way. */
async function lateCell(browser, shape) {
    // the late face is held back 4 s on the network, so it lands while the draw is held
    const { context, page, errors } = await open(browser, `scene=comp&shape=${shape}&hold=1&only=late`, { late: 4000 });
    try {
        await page.waitForTimeout(1200);
        const res = { errors, before: await states(page), fontsBefore: await page.evaluate(() => ({ status: document.fonts.status, late: document.fonts.check('700 42px "Late C"') })) };
        await seek(page, 0.5);
        await page.waitForTimeout(150);
        const clip = await rowClip(page, "late");
        const mid = await shot(page, clip);
        await page.evaluate(() => window.__loadLate());
        await page.waitForTimeout(300);
        res.afterFace = await states(page);
        res.lateLoaded = await page.evaluate(() => window.__lateLoaded);
        res.lateEvent = "stylesheet face, held 4 s";
        res.drawnAfterFace = await page.evaluate(() => window.__drawn);
        const clip2 = await rowClip(page, "late");
        const midAfter = await shot(page, { ...clip, height: Math.max(clip.height, clip2.height) });
        await land(page);
        await page.waitForTimeout(150);
        const landed = await shot(page, { ...clip, height: Math.max(clip.height, clip2.height) });
        await release(page);
        await page.waitForFunction(() => window.__drawn.length >= 1, null, { timeout: 20_000 }).catch(() => {});
        await page.waitForTimeout(300);
        const rest = await shot(page, { ...clip, height: Math.max(clip.height, clip2.height) });
        res.swapLandedVsRest = diff(landed, rest);
        res.afterFaceVsRest = diff(midAfter, rest);
        res.after = await states(page);
        res.drawn = await page.evaluate(() => window.__drawn);
        writeFileSync(join(pngDir, `${pfx}${engine}-late-${shape}.png`), PNG.sync.write(stack([mid, midAfter, landed, rest])));
        out.cells[`late-${shape}`] = res;
    } finally { await context.close(); }
}

/** A mark that enters view while the page is still scrolling. */
async function farCell(browser, shape) {
    const { context, page, errors } = await open(browser, `scene=comp&shape=${shape}&hold=1&only=far&far=1`, { height: 800 });
    try {
        const res = { errors, atLoad: (await states(page)).far.ink, steps: [] };
        await page.waitForTimeout(1000);
        res.after1s = (await states(page)).far.ink;
        await page.mouse.move(400, 400);
        let entered = -1;
        for (let i = 0; i < 40; i++) {
            await page.mouse.wheel(0, 60);
            await page.waitForTimeout(30);
            const ink = (await states(page)).far.ink;
            if (ink === "draw" && entered < 0) entered = i;
            if (entered >= 0 && i >= entered + 4) break;      // keep scrolling four more notches under the draw
        }
        res.enteredAtStep = entered;
        res.scrollY = await page.evaluate(() => scrollY);
        await seek(page, 0.5);
        await page.waitForTimeout(150);
        const clip = await rowClip(page, "far");
        const mid = await shot(page, clip);
        await land(page); await page.waitForTimeout(150);
        const landed = await shot(page, clip);
        await release(page);
        await page.waitForFunction(() => window.__drawn.length >= 1, null, { timeout: 20_000 }).catch(() => {});
        await page.waitForTimeout(300);
        const rest = await shot(page, clip);
        res.swapLandedVsRest = diff(landed, rest);
        writeFileSync(join(pngDir, `${pfx}${engine}-far-${shape}.png`), PNG.sync.write(stack([mid, landed, rest])));
        out.cells[`far-${shape}`] = res;
    } finally { await context.close(); }
}

const browser = await launch();
try {
    out.version = browser.version();
    for (const t of ["light", "dark", "forced"]) if (modes.has("sel")) { await selCell(browser, t); save(); }
    for (const g of ["clear", "skip", "misc", "fold"]) if (modes.has(g)) { await staticCell(browser, g); save(); }
    for (const shape of ["underline", "highlight"]) {
        if (modes.has("comp")) { await compCell(browser, shape, "comp"); save(); }
        if (modes.has("clipped")) { await clippedCell(browser, shape); save(); }
        if (modes.has("late")) { await lateCell(browser, shape); save(); }
        if (modes.has("far")) { await farCell(browser, shape); save(); }
        // 200 % zoom: half the CSS viewport at twice the density
        if (modes.has("zoom")) { await compCell(browser, shape, "zoom200", { width: 500, height: 1400, dpr: 4 }); save(); }
    }
} catch (e) {
    out.error = String(e?.stack ?? e);
    console.error(out.error);
    process.exitCode = 1;
} finally {
    await browser.close();
    save();
}
