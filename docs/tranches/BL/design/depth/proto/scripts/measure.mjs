// W-B.19 prototype gates, per cell. One browser per run, a new context per cell, every
// page and context closed in finally.
//
//   node measure.mjs <engine> <cells> [--strips] [--bite NAME]
//     engine: chromium | webkit
//     cells:  comma list of WxH[:coarse][:dark][:reduce][:mask]   e.g. 1440x900,390x844:coarse:dark
//
// Writes ../data/<engine>-<cell>[-bite].json; with --strips also writes one strip per
// composition under ../strips/ (frames are composed in the scratch dir and deleted).
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { BITES } from "./bites.mjs";

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = join(HERE, "..", "data");
const STRIPS = join(HERE, "..", "strips");
const SCRATCH = process.env.DEPTH_SCRATCH;
const BASE = process.env.DEPTH_BASE ?? "http://localhost:5467/demo/depth/index.html";
mkdirSync(DATA, { recursive: true });

const [engineName, cellArg, ...rest] = process.argv.slice(2);
const wantStrips = rest.includes("--strips");
const biteName = rest.includes("--bite") ? rest[rest.indexOf("--bite") + 1] : null;
const bite = biteName ? BITES[biteName] : null;
if (biteName && !bite) throw new Error(`no bite ${biteName}`);
const extraQuery = rest.includes("--query") ? rest[rest.indexOf("--query") + 1] : "";
const tag = rest.includes("--tag") ? rest[rest.indexOf("--tag") + 1] : "";

const parseCell = (s) => {
    const [wh, ...flags] = s.split(":");
    const [w, h] = wh.split("x").map(Number);
    return { w, h, coarse: flags.includes("coarse"), dark: flags.includes("dark"), reduce: flags.includes("reduce"), mask: flags.includes("mask"), id: s.replace(/:/g, "-") };
};

// ── pixels ────────────────────────────────────────────────────────────────────
const decode = (buf) => PNG.sync.read(buf);
const lum = (r, g, b) => {
    const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => { const [x, y] = a > b ? [a, b] : [b, a]; return (x + 0.05) / (y + 0.05); };
const diff = (p, q, i) => Math.abs(p[i] - q[i]) + Math.abs(p[i + 1] - q[i + 1]) + Math.abs(p[i + 2] - q[i + 2]);
const parseRgb = (s) => (s.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);

// Ink cover and contrast for one run inside one clip, from four frames:
// A figure hidden + run inked, B figure hidden + run clear, C figure shown + run inked,
// D figure shown + run clear. Ink = pixels the run paints (|A-B|). Covered = ink pixels
// at which the run no longer shows (|C-D| under 35 % of |A-B|).
function inkRead(A, B, C, D, rgb, rect, clip, depth, dbg) {
    const W = A.width;
    const x0 = Math.max(0, Math.floor(rect.x - clip.x)), x1 = Math.min(W, Math.ceil(rect.x + rect.width - clip.x));
    const y0 = Math.max(0, Math.floor(rect.y - clip.y)), y1 = Math.min(A.height, Math.ceil(rect.y + rect.height - clip.y));
    const rl = lum(...rgb);
    let ink = 0, covered = 0, solid = 0, low = 0;
    const ratios = [];
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * W + x) * 4;
        const dAB = diff(A.data, B.data, i);
        if (dAB < 60) continue;
        ink++;
        const dCD = diff(C.data, D.data, i);
        const isCovered = dCD < 0.35 * dAB;
        if (isCovered) { covered++; if (dbg) dbg.push([x, y]); continue; }
        // a behind run reads only where the figure paints nothing (|D-B| small)
        if (depth === "behind" && diff(D.data, B.data, i) >= 30) continue;
        // solid ink: the inked frame shows the run's colour here
        const dc = Math.abs(C.data[i] - rgb[0]) + Math.abs(C.data[i + 1] - rgb[1]) + Math.abs(C.data[i + 2] - rgb[2]);
        if (dc > 45) continue;
        solid++;
        const r = contrast(rl, lum(D.data[i], D.data[i + 1], D.data[i + 2]));
        ratios.push(r);
        if (r < 4.5) low++;
    }
    ratios.sort((a, b) => a - b);
    return {
        ink, covered, cover: ink ? covered / ink : 0, solid,
        cMin: ratios.length ? +ratios[0].toFixed(2) : null,
        cP5: ratios.length ? +ratios[Math.floor(ratios.length * 0.05)].toFixed(2) : null,
        lowShare: solid ? +(low / solid).toFixed(4) : null,
    };
}

// ── page helpers (run in the page) ─────────────────────────────────────────────
const READ = () => {
    const sy = scrollY;
    const el = (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height, top: r.top + sy }; };
    const scenes = [...document.querySelectorAll(".depth")].map((s, si) => {
        const runs = [...s.querySelectorAll('[data-depth="behind"],[data-depth="front"]')].map((r, ri) => {
            const cs = getComputedStyle(r);
            // the ink colour of a plate is its text's colour
            const inkEl = r.matches("[data-slot=card]") ? r : r;
            return { ri, depth: r.dataset.depth, text: r.textContent.trim(), rect: el(r), fontSize: parseFloat(cs.fontSize), color: getComputedStyle(inkEl).color };
        });
        const fig = s.querySelector('[data-depth="figure"]');
        const lagEls = [...s.querySelectorAll("[data-depth-lag]")];
        const lag = lagEls[0];
        const tr = lag ? getComputedStyle(lag).translate : null;
        return {
            si, cls: s.className, rect: el(s), inline: s.clientWidth, runs, fig: fig ? el(fig) : null,
            lagCount: lagEls.length, lag: lag ? { rect: el(lag), translate: tr, within: lag.dataset.depthLag === "within" } : null,
            depthLagVar: getComputedStyle(s).getPropertyValue("--depth-lag").trim(),
        };
    });
    const d = document.documentElement;
    return { sy, S: innerHeight, W: innerWidth, scrollWidth: d.scrollWidth, clientWidth: d.clientWidth, scrollHeight: d.scrollHeight, scenes };
};

async function settle(page, target) {
    for (let k = 0; k < 40; k++) {
        const y = await page.evaluate(() => new Promise((res) => requestAnimationFrame(() => requestAnimationFrame(() => res(scrollY)))));
        if (target == null || Math.abs(y - target) < 0.5) return y;
    }
    return page.evaluate(() => scrollY);
}

const shot = async (page, clip) => decode(await page.screenshot({ clip, scale: "css", animations: "allow", caret: "hide" }));

async function coverAt(page, scene, frame) {
    // clip: the union of the scene's runs and its figure, inside the viewport
    const rs = [...scene.runs.map((r) => r.rect), scene.fig].filter(Boolean);
    const x0 = Math.max(0, Math.min(...rs.map((r) => r.x))), y0 = Math.max(0, Math.min(...rs.map((r) => r.y)));
    const x1 = Math.min(frame.W, Math.max(...rs.map((r) => r.x + r.width))), y1 = Math.min(frame.S, Math.max(...rs.map((r) => r.y + r.height)));
    if (x1 - x0 < 4 || y1 - y0 < 4) return null;
    const clip = { x: Math.floor(x0), y: Math.floor(y0), width: Math.floor(x1 - x0), height: Math.floor(y1 - y0) };
    // A: figure hidden, all inked. C: figure shown, all inked. Per run r: B_r figure
    // hidden and r clear; D_r figure shown and r clear (only r: runs overlap line boxes).
    const set = (hideFig, clearRi) => page.evaluate(([si, h, c]) => {
        const s = document.querySelectorAll(".depth")[si];
        s.classList.toggle("__hidefig", h);
        s.querySelectorAll('[data-depth="behind"],[data-depth="front"]').forEach((r, i) => r.classList.toggle("__clearme", i === c));
    }, [scene.si, hideFig, clearRi]);
    const grab = async (h, c) => {
        await set(h, c);
        await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
        return shot(page, clip);
    };
    const A = await grab(true, -1), C = await grab(false, -1);
    const out = [];
    for (const run of scene.runs) {
        const inView = run.rect.y >= 0 && run.rect.y + run.rect.height <= frame.S;
        if (!inView) { out.push(null); continue; }
        const B = await grab(true, run.ri), D = await grab(false, run.ri);
        const rgb = parseRgb(run.color);
        const dbg = process.env.DEPTH_DEBUG ? [] : null;
        const r = { ri: run.ri, depth: run.depth, text: run.text, fontSize: run.fontSize, ...inkRead(A, B, C, D, rgb, run.rect, clip, run.depth, dbg) };
        if (dbg && dbg.length && SCRATCH && !globalThis.__dbgDone?.[run.text]) {
            (globalThis.__dbgDone ??= {})[run.text] = 1;
            for (const [k, f] of Object.entries({ A, B, C, D })) writeFileSync(join(SCRATCH, `dbg-${run.text.slice(0, 6)}-${k}.png`), PNG.sync.write(f));
            writeFileSync(join(SCRATCH, `dbg-${run.text.slice(0, 6)}-pts.json`), JSON.stringify({ clip, pts: dbg.slice(0, 4000) }));
        }
        out.push(r);
    }
    await set(false, -1);
    return out;
}

const PROBE_CSS = `
.__hidefig [data-depth="figure"] { visibility: hidden !important; }
.__clearme, .__clearme * { color: transparent !important; -webkit-text-fill-color: transparent !important; }
`;

// ── cell ──────────────────────────────────────────────────────────────────────
async function runCell(browser, cell) {
    const ctx = await browser.newContext({
        viewport: { width: cell.w, height: cell.h },
        deviceScaleFactor: cell.coarse ? 2 : 1,
        hasTouch: cell.coarse,
        isMobile: cell.coarse && engineName === "chromium",
        reducedMotion: cell.reduce ? "reduce" : "no-preference",
        colorScheme: cell.dark ? "dark" : "light",
    });
    const out = { engine: engineName, cell, bite: biteName, query: extraQuery };
    try {
        const page = await ctx.newPage();
        const errs = [];
        page.on("pageerror", (e) => errs.push(String(e)));
        if (cell.mask) {
            // Mask view-timeline support off: the @supports condition reads a value no engine has.
            await page.route(/demo\.css/, async (route) => {
                const resp = await route.fetch();
                let body = await resp.text();
                const n = body.split("(animation-timeline: view())").length - 1;
                body = body.replaceAll("(animation-timeline: view())", "(animation-timeline: gl-masked-timeline())");
                out.maskReplacements = n;
                await route.fulfill({ response: resp, body });
            });
        }
        const q = new URLSearchParams({ paused: "1", ...(cell.dark ? { theme: "dark" } : {}) });
        if (extraQuery) for (const [k, v] of new URLSearchParams(extraQuery)) q.set(k, v);
        await page.goto(`${BASE}?${q}`, { waitUntil: "load" });
        await page.addStyleTag({ content: PROBE_CSS });
        await page.waitForTimeout(2500);
        if (bite) await page.evaluate(bite);
        await page.waitForTimeout(300);

        out.ua = await page.evaluate(() => navigator.userAgent);
        out.support = await page.evaluate(() => ({
            view: CSS.supports("animation-timeline", "view()") && !CSS.supports("animation-timeline", "gl-not-a-real-timeline"),
            range: CSS.supports("animation-range", "cover"),
            lvb: CSS.supports("height", "1lvb"),
        }));
        out.animations = await page.evaluate(() => document.getAnimations().map((a) => {
            const t = a.effect?.target;
            const scene = t?.closest?.(".depth");
            const props = new Set();
            for (const k of a.effect?.getKeyframes?.() ?? []) for (const p of Object.keys(k)) if (!["offset", "easing", "composite", "computedOffset"].includes(p)) props.add(p);
            return { name: a.animationName ?? a.id, inScene: !!scene, scene: scene ? [...document.querySelectorAll(".depth")].indexOf(scene) : -1, props: [...props], target: t?.tagName };
        }));

        // ── static reads: name, duplicates, selection ──
        out.name = [];
        for (const [i, sel] of [".hero", ".plate-figure", ".stage"].entries()) {
            const loc = page.locator(sel);
            if (!(await loc.count())) continue;
            out.name.push({ scene: i, aria: await loc.ariaSnapshot() });
        }
        out.dom = await page.evaluate(() => [...document.querySelectorAll(".depth")].map((s) => {
            const texts = [];
            const w = document.createTreeWalker(s, NodeFilter.SHOW_TEXT);
            while (w.nextNode()) { const t = w.currentNode.textContent.trim(); if (t) texts.push(t); }
            const blocks = [...s.querySelectorAll("h1,h2,figcaption,output")].map((e) => e.textContent.trim().replace(/\s+/g, " "));
            const dupBlocks = blocks.filter((b, i) => blocks.indexOf(b) !== i);
            const sel = getSelection(); sel.removeAllRanges(); sel.selectAllChildren(s);
            const all = sel.toString(); sel.removeAllRanges();
            return {
                textNodes: texts, dupBlocks,
                ariaHidden: [...s.querySelectorAll("[aria-hidden=true]")].filter((e) => e.textContent.trim()).map((e) => e.tagName + ":" + e.textContent.trim()),
                selectAll: all.replace(/\s+/g, " ").trim(),
                elements: s.querySelectorAll("*").length,
            };
        }));
        // restraint: placement + lag counts
        out.restraint = await page.evaluate(() => ({
            badPlacement: [...document.querySelectorAll(".depth,[data-depth]")].filter((e) => e.parentElement?.closest("p,ul,ol,table,nav,button,input,select,textarea,dialog,[popover]")).length,
            lagPerScene: [...document.querySelectorAll(".depth")].map((s) => s.querySelectorAll("[data-depth-lag]").length),
            lagOnText: [...document.querySelectorAll("[data-depth-lag]")].filter((e) => e.matches('[data-depth="behind"],[data-depth="front"]') || e.querySelector('[data-depth="behind"],[data-depth="front"]')).length,
            lagValues: [...document.querySelectorAll(".depth")].map((s) => getComputedStyle(s).getPropertyValue("--depth-lag").trim()),
        }));

        // ── the scroll: 100 px wheel steps, top to bottom ──
        await page.evaluate(() => scrollTo(0, 0));
        await settle(page, 0);
        const steps = [];
        const coverSteps = [];
        const first = await page.evaluate(READ);
        const maxScroll = first.scrollHeight - first.S;
        await page.mouse.move(cell.w / 2, cell.h / 2);
        let y = 0;
        for (let k = 0; k < 400; k++) {
            const frame = await page.evaluate(READ);
            steps.push({
                sy: frame.sy, scrollWidth: frame.scrollWidth, clientWidth: frame.clientWidth, scrollHeight: frame.scrollHeight,
                scenes: frame.scenes.map((s) => ({ top: s.rect.y, fig: s.fig?.y, runs: s.runs.map((r) => r.rect.y), lag: s.lag ? { y: s.lag.rect.y, translate: s.lag.translate } : null })),
            });
            // cover at every step where a scene's runs are in view
            const covers = [];
            for (const s of frame.scenes) {
                const anyIn = s.runs.some((r) => r.rect.y >= 0 && r.rect.y + r.rect.height <= frame.S);
                if (!anyIn) continue;
                covers.push({ si: s.si, runs: await coverAt(page, s, frame) });
            }
            if (covers.length) coverSteps.push({ sy: frame.sy, covers });
            if (y >= maxScroll) break;
            const target = Math.min(maxScroll, y + 100);
            await page.mouse.wheel(0, 100);
            y = await settle(page, target);
            if (y < target - 0.5) { await page.evaluate((t) => scrollTo(0, t), target); y = await settle(page, target); out.wheelFallback = (out.wheelFallback ?? 0) + 1; }
        }
        out.layout = first;
        out.steps = steps;
        out.coverSteps = coverSteps;

        // ── selection by pointer, on the hero heading (G-SELECT) ──
        await page.evaluate(() => scrollTo(0, 0));
        await settle(page, 0);
        out.select = await selectionReads(page);

        // ── strips ──
        if (wantStrips && SCRATCH) out.strips = await strips(page, cell, first);
        out.errors = errs;
    } finally {
        await ctx.close();
    }
    return out;
}

async function selectionReads(page) {
    const pts = await page.evaluate(() => {
        const h = document.querySelector(".hero-title");
        const nodes = [];
        const w = document.createTreeWalker(h, NodeFilter.SHOW_TEXT);
        while (w.nextNode()) if (w.currentNode.textContent.trim()) nodes.push(w.currentNode);
        const rr = (n, a, b) => { const r = document.createRange(); r.setStart(n, a); r.setEnd(n, b); return r.getBoundingClientRect(); };
        const f = nodes[0], l = nodes[nodes.length - 1];
        const fi = f.textContent.search(/\S/), li = l.textContent.trimEnd().length;
        const a = rr(f, fi, fi + 1), b = rr(l, li - 1, li);
        const behind = h.querySelector('[data-depth="behind"]').getBoundingClientRect();
        const r0 = rr(f, fi, fi + 1);
        return { from: [a.x + 1, a.y + a.height / 2], to: [b.x + b.width - 1, b.y + b.height / 2], triple: [r0.x + r0.width / 2, r0.y + r0.height / 2], text: h.textContent.replace(/\s+/g, " ").trim() };
    });
    const read = () => page.evaluate(() => { const s = getSelection().toString(); getSelection().removeAllRanges(); return s.replace(/\s+/g, " ").trim(); });
    await page.mouse.move(...pts.from);
    await page.mouse.down();
    await page.mouse.move(...pts.to, { steps: 12 });
    await page.mouse.up();
    const drag = await read();
    await page.mouse.click(...pts.triple, { clickCount: 3 });
    const triple = await read();
    return { heading: pts.text, drag, triple };
}

async function strips(page, cell, first) {
    const done = [];
    const names = ["hero", "figure", "stage"];
    for (const s of first.scenes) {
        const S = first.S, H = s.rect.height, top = s.rect.top;
        const dir = join(SCRATCH, `f-${engineName}-${cell.id}-${s.si}`);
        rmSync(dir, { recursive: true, force: true });
        mkdirSync(dir, { recursive: true });
        // five frames across the scene's pass, each frame the whole viewport
        const a = Math.max(0, top - S + Math.min(H, S) * 0.5), b = Math.min(first.scrollHeight - S, top + H - Math.min(H, S) * 0.5);
        for (let k = 0; k < 5; k++) {
            const t = Math.round(a + ((b - a) * k) / 4);
            await page.evaluate((t) => scrollTo(0, t), t);
            await settle(page, t);
            await page.screenshot({ path: join(dir, `${names[s.si]}-${String(k).padStart(2, "0")}.png`), scale: "css" });
        }
        const name = `${names[s.si]}-${engineName}-${cell.w}-${cell.dark ? "dark" : "light"}${cell.reduce ? "-reduce" : ""}${tag ? "-" + tag : ""}`;
        execFileSync("python3", ["-I", join(HERE, "compose.py"), dir, STRIPS, names[s.si], name, "--cols", cell.w > 800 ? "2" : "5"], { stdio: "pipe" });
        rmSync(dir, { recursive: true, force: true });
        done.push(name);
    }
    return done;
}

const B = { chromium, webkit }[engineName];
const browser = await B.launch();
try {
    for (const c of cellArg.split(",")) {
        const cell = parseCell(c);
        const t0 = Date.now();
        const res = await runCell(browser, cell);
        res.ms = Date.now() - t0;
        const file = join(DATA, `${engineName}-${cell.id}${biteName ? "-bite-" + biteName : ""}${tag ? "-" + tag : ""}.json`);
        writeFileSync(file, JSON.stringify(res));
        console.log(file, res.ms, "ms", res.errors?.length ? res.errors.slice(0, 3) : "");
    }
} finally {
    await browser.close();
}
