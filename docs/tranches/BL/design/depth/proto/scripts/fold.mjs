// W-B.19 fold readings: the clauses the challenge added to the gates. One browser per
// run, a new context per cell, every page and context closed in finally.
//
//   node fold.mjs <engine> <cells> [--query q] [--tag t] [--shots]
//     engine: chromium | webkit
//     cells:  comma list of WxH[:coarse][:dark]
//
// Per scene, with the trailing figure held at -T, 0 and +T (the two ends of its travel
// and its drawn place): ink cover per line and per letter of every `behind` run, the
// share of every `front` run's ink that stands on the figure, and contrast. Also: the
// share of the figure's body that a run's box takes from the pointer, the stage's
// accessible name and selection, sideways overflow, the blur through a glass Card as
// the figure (?card=1), and the rate of a figure that fills its scene (?fill=).
//
// Writes ../data/fold-<engine>-<cell>[-tag].json; with --shots one strip per cell under
// ../strips/ (frames are composed in the scratch dir and deleted).
import { chromium, webkit } from "playwright";
import { PNG } from "pngjs";
import { mkdirSync, writeFileSync, rmSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const HERE = dirname(fileURLToPath(import.meta.url));
const DATA = join(HERE, "..", "data");
const STRIPS = join(HERE, "..", "strips");
const SCRATCH = process.env.DEPTH_SCRATCH;
const BASE = process.env.DEPTH_BASE ?? "http://localhost:5467/demo/depth/index.html";
mkdirSync(DATA, { recursive: true });

const [engineName, cellArg, ...rest] = process.argv.slice(2);
const opt = (k) => (rest.includes(k) ? rest[rest.indexOf(k) + 1] : "");
const extraQuery = opt("--query");
const tag = opt("--tag");
const wantShots = rest.includes("--shots");

const parseCell = (s) => {
    const [wh, ...flags] = s.split(":");
    const [w, h] = wh.split("x").map(Number);
    return { w, h, coarse: flags.includes("coarse"), dark: flags.includes("dark"), id: s.replace(/:/g, "-") };
};

const decode = (buf) => PNG.sync.read(buf);
const lum = (r, g, b) => {
    const f = (c) => { c /= 255; return c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4; };
    return 0.2126 * f(r) + 0.7152 * f(g) + 0.0722 * f(b);
};
const contrast = (a, b) => { const [x, y] = a > b ? [a, b] : [b, a]; return (x + 0.05) / (y + 0.05); };
const diff = (p, q, i) => Math.abs(p[i] - q[i]) + Math.abs(p[i + 1] - q[i + 1]) + Math.abs(p[i + 2] - q[i + 2]);
const parseRgb = (s) => (s.match(/[\d.]+/g) ?? []).slice(0, 3).map(Number);
const r2 = (v) => +v.toFixed(3);

// A figure hidden + run inked, B figure hidden + run clear, C figure shown + run inked,
// D figure shown + run clear. Ink = |A-B|. Covered = ink where the run no longer shows
// (|C-D| under 35 % of |A-B|). On the figure = ink under which the figure paints (|D-B|).
function inkRead(A, B, C, D, rgb, rect, clip, depth) {
    const W = A.width;
    const x0 = Math.max(0, Math.floor(rect.x - clip.x)), x1 = Math.min(W, Math.ceil(rect.x + rect.width - clip.x));
    const y0 = Math.max(0, Math.floor(rect.y - clip.y)), y1 = Math.min(A.height, Math.ceil(rect.y + rect.height - clip.y));
    const rl = lum(...rgb);
    let ink = 0, covered = 0, onFigure = 0, cMin = Infinity;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * W + x) * 4;
        const dAB = diff(A.data, B.data, i);
        if (dAB < 60) continue;
        ink++;
        const figHere = diff(D.data, B.data, i) >= 10;
        if (figHere) onFigure++;
        if (diff(C.data, D.data, i) < 0.35 * dAB) { covered++; continue; }
        if (depth === "behind" && figHere) continue;
        const dc = Math.abs(C.data[i] - rgb[0]) + Math.abs(C.data[i + 1] - rgb[1]) + Math.abs(C.data[i + 2] - rgb[2]);
        if (dc > 45) continue;
        const r = contrast(rl, lum(D.data[i], D.data[i + 1], D.data[i + 2]));
        if (r < cMin) cMin = r;
    }
    return { ink, cover: ink ? r2(covered / ink) : 0, onFigure: ink ? r2(onFigure / ink) : 0, cMin: Number.isFinite(cMin) ? +cMin.toFixed(2) : null };
}

// Mean horizontal luminance step inside a rect of one frame (a sharpness reading).
function sharp(F, rect, clip) {
    const W = F.width;
    const x0 = Math.max(1, Math.floor(rect.x - clip.x)), x1 = Math.min(W, Math.ceil(rect.x + rect.width - clip.x));
    const y0 = Math.max(0, Math.floor(rect.y - clip.y)), y1 = Math.min(F.height, Math.ceil(rect.y + rect.height - clip.y));
    let sum = 0, n = 0;
    for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++) {
        const i = (y * W + x) * 4, j = i - 4;
        sum += Math.abs(F.data[i] - F.data[j]) + Math.abs(F.data[i + 1] - F.data[j + 1]) + Math.abs(F.data[i + 2] - F.data[j + 2]);
        n++;
    }
    return n ? sum / n : 0;
}

const READ = (si) => {
    const s = document.querySelectorAll(".depth")[si];
    const el = (e) => { const r = e.getBoundingClientRect(); return { x: r.x, y: r.y, width: r.width, height: r.height }; };
    const runs = [...s.querySelectorAll('[data-depth="behind"],[data-depth="front"]')].map((r, ri) => {
        const cs = getComputedStyle(r);
        const letters = [];
        if (parseFloat(cs.fontSize) >= 40) {
            const w = document.createTreeWalker(r, NodeFilter.SHOW_TEXT);
            while (w.nextNode()) {
                const n = w.currentNode;
                for (let k = 0; k < n.length; k++) {
                    if (!/\S/.test(n.data[k])) continue;
                    const g = document.createRange(); g.setStart(n, k); g.setEnd(n, k + 1);
                    letters.push({ ch: n.data[k], rect: el(g) });
                }
            }
        }
        return { ri, depth: r.dataset.depth, text: r.textContent.trim().replace(/\s+/g, " "), rect: el(r), fontSize: parseFloat(cs.fontSize), color: cs.color, display: cs.display, letters };
    });
    const fig = s.querySelector('[data-depth="figure"]');
    const lag = s.querySelector("[data-depth-lag]");
    const probe = document.createElement("i");
    probe.style.cssText = "position:absolute;visibility:hidden;inline-size:0;block-size:var(--depth-travel)";
    s.append(probe);
    const T = probe.getBoundingClientRect().height;
    probe.remove();
    return {
        si, scene: s.dataset.depthScene ?? "", rect: el(s), runs, fig: fig ? el(fig) : null, T,
        lag: lag ? { within: lag.dataset.depthLag === "within" } : null,
        padBlock: [parseFloat(getComputedStyle(s).paddingBlockStart), parseFloat(getComputedStyle(s).paddingBlockEnd)],
    };
};

const raf2 = (page) => page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
const shot = async (page, clip) => decode(await page.screenshot({ clip, scale: "css", animations: "allow", caret: "hide" }));

const PROBE_CSS = `
.__hidefig [data-depth="figure"] { visibility: hidden !important; }
.__clearme, .__clearme * { color: transparent !important; -webkit-text-fill-color: transparent !important; }
`;

async function readScene(page, si, cell, frames) {
    // centre the scene in the viewport (a hero at the top of the page stays at 0)
    await page.evaluate((si) => {
        const s = document.querySelectorAll(".depth")[si];
        const r = s.getBoundingClientRect();
        scrollTo(0, Math.max(0, r.top + scrollY + r.height / 2 - innerHeight / 2));
    }, si);
    await raf2(page);
    const base = await page.evaluate(READ, si);
    const whole = base.lag && !base.lag.within;
    const offsets = whole ? [-base.T, 0, base.T] : [0];
    const out = { si, scene: base.scene, T: r2(base.T), padBlock: base.padBlock, sceneHeight: r2(base.rect.height), offsets: [] };
    for (const off of offsets) {
        // hold the trailing figure at this offset
        await page.evaluate(([si, off, whole]) => {
            const lag = document.querySelectorAll(".depth")[si].querySelector("[data-depth-lag]");
            if (lag && whole) { lag.style.animation = "none"; lag.style.translate = `0 ${off}px`; }
        }, [si, off, whole]);
        await raf2(page);
        const sc = await page.evaluate(READ, si);
        const rs = [...sc.runs.map((r) => r.rect), sc.fig].filter(Boolean);
        const x0 = Math.max(0, Math.min(...rs.map((r) => r.x))), y0 = Math.max(0, Math.min(...rs.map((r) => r.y)));
        const x1 = Math.min(cell.w, Math.max(...rs.map((r) => r.x + r.width))), y1 = Math.min(cell.h, Math.max(...rs.map((r) => r.y + r.height)));
        const clip = { x: Math.floor(x0), y: Math.floor(y0), width: Math.floor(x1 - x0), height: Math.floor(y1 - y0) };
        const set = (hideFig, clearRi) => page.evaluate(([si, h, c]) => {
            const s = document.querySelectorAll(".depth")[si];
            s.classList.toggle("__hidefig", h);
            s.querySelectorAll('[data-depth="behind"],[data-depth="front"]').forEach((r, i) => r.classList.toggle("__clearme", i === c));
        }, [si, hideFig, clearRi]);
        const grab = async (h, c) => { await set(h, c); await raf2(page); return shot(page, clip); };
        const A = await grab(true, -1), C = await grab(false, -1);
        const runs = [];
        for (const run of sc.runs) {
            const inView = run.rect.y >= 0 && run.rect.y + run.rect.height <= cell.h;
            const B = await grab(true, run.ri), D = await grab(false, run.ri);
            const rgb = parseRgb(run.color);
            const line = inkRead(A, B, C, D, rgb, run.rect, clip, run.depth);
            const letters = run.letters.map((l) => ({ ch: l.ch, ...inkRead(A, B, C, D, rgb, l.rect, clip, run.depth) }));
            const worst = letters.reduce((m, l) => (l.cover > (m?.cover ?? -1) ? l : m), null);
            runs.push({
                depth: run.depth, text: run.text, fontSize: run.fontSize, display: run.display, inView,
                box: [Math.round(run.rect.width), Math.round(run.rect.height)],
                cover: line.cover, onFigure: line.onFigure, cMin: line.cMin,
                letterMax: worst ? { ch: worst.ch, cover: worst.cover } : null,
                letters: letters.map((l) => `${l.ch}:${l.cover}`).join(" "),
            });
            // the blur through a glass plate as the figure: the same ink, figure hidden against shown
            if (run.depth === "behind" && sc.fig && off === 0) {
                const ix = Math.max(run.rect.x, sc.fig.x), iy = Math.max(run.rect.y, sc.fig.y);
                const ax = Math.min(run.rect.x + run.rect.width, sc.fig.x + sc.fig.width), ay = Math.min(run.rect.y + run.rect.height, sc.fig.y + sc.fig.height);
                if (ax - ix > 8 && ay - iy > 8) {
                    const inset = { x: ix + 4, y: iy + 4, width: ax - ix - 8, height: ay - iy - 8 };
                    const a = sharp(A, inset, clip), c = sharp(C, inset, clip);
                    runs[runs.length - 1].underFigure = { sharpHidden: r2(a), sharpShown: r2(c), ratio: a ? r2(c / a) : null };
                }
            }
        }
        await set(false, -1);
        if (frames) frames.push({ name: `${base.scene || "scene"}${whole ? (off < 0 ? "-up" : off > 0 ? "-down" : "-rest") : ""}`, png: C });
        out.offsets.push({ offset: r2(off), runs });
    }
    // the pointer: how much of the figure's body a text box takes (a disc of 0.22 of the box's width)
    out.pointer = await page.evaluate((si) => {
        const s = document.querySelectorAll(".depth")[si];
        const lag = s.querySelector("[data-depth-lag]:not([data-depth-lag=within])");
        if (lag) lag.style.translate = "0 0px";
        const f = s.querySelector('[data-depth="figure"]');
        if (!f) return null;
        const r = f.getBoundingClientRect();
        const cx = r.x + r.width / 2, cy = r.y + r.height / 2, rad = 0.22 * r.width;
        let n = 0, text = 0;
        for (let a = -1; a <= 1; a += 0.1) for (let b = -1; b <= 1; b += 0.1) {
            if (a * a + b * b > 1) continue;
            const e = document.elementFromPoint(cx + a * rad, cy + b * rad);
            n++;
            if (e && (e.closest("[data-depth=front],[data-depth=behind]") || /^H\d$/.test(e.tagName))) text++;
        }
        return { points: n, takenByText: +(text / n).toFixed(3) };
    }, si);
    // release the hold
    await page.evaluate((si) => {
        const lag = document.querySelectorAll(".depth")[si].querySelector("[data-depth-lag]");
        if (lag) { lag.style.animation = ""; lag.style.translate = ""; }
    }, si);
    return out;
}

// A figure that fills its scene and trails whole: its rate at every 20 px while any of
// it is on screen, and how far it stands outside its scene's box.
async function fillRead(page) {
    const idx = await page.evaluate(() => [...document.querySelectorAll(".depth")].findIndex((s) => s.classList.contains("fill-scene")));
    if (idx < 0) return null;
    const geo = await page.evaluate((i) => {
        const s = document.querySelectorAll(".depth")[i]; const r = s.getBoundingClientRect();
        return { top: r.top + scrollY, h: r.height, S: innerHeight, max: document.documentElement.scrollHeight - innerHeight };
    }, idx);
    const from = Math.max(0, Math.floor(geo.top - geo.S - 140)), to = Math.min(geo.max, Math.ceil(geo.top + geo.h + 140));
    const rows = [];
    for (let y = from; y <= to; y += 20) {
        await page.evaluate((y) => scrollTo(0, y), y);
        await raf2(page);
        rows.push(await page.evaluate((i) => {
            const s = document.querySelectorAll(".depth")[i]; const f = s.querySelector("[data-depth=figure]");
            const a = s.getBoundingClientRect(), b = f.getBoundingClientRect();
            return { sy: scrollY, sTop: a.top, sBot: a.bottom, fTop: b.top, fBot: b.bottom, onScreen: b.bottom > 0 && b.top < innerHeight };
        }, idx));
    }
    const rates = [];
    let outside = 0;
    for (let k = 1; k < rows.length; k++) {
        const p = rows[k - 1], q = rows[k];
        if (!(p.onScreen && q.onScreen)) continue;
        rates.push(r2((100 * (p.fTop - q.fTop)) / (q.sy - p.sy)));
        outside = Math.max(outside, q.sTop - q.fTop, q.fBot - q.sBot);
    }
    return { steps: rates.length, rateMin: Math.min(...rates), rateMax: Math.max(...rates), figureOutsideScenePx: r2(Math.max(0, outside)), sceneHeight: geo.h };
}

async function runCell(browser, cell) {
    const ctx = await browser.newContext({
        viewport: { width: cell.w, height: cell.h },
        deviceScaleFactor: cell.coarse ? 2 : 1,
        hasTouch: cell.coarse,
        isMobile: cell.coarse && engineName === "chromium",
        colorScheme: cell.dark ? "dark" : "light",
    });
    const out = { engine: engineName, cell, query: extraQuery };
    try {
        const page = await ctx.newPage();
        const errs = [];
        page.on("pageerror", (e) => errs.push(String(e)));
        const q = new URLSearchParams({ paused: "1", ...(cell.dark ? { theme: "dark" } : {}) });
        if (extraQuery) for (const [k, v] of new URLSearchParams(extraQuery)) q.set(k, v);
        await page.goto(`${BASE}?${q}`, { waitUntil: "load" });
        await page.addStyleTag({ content: PROBE_CSS });
        await page.waitForTimeout(2500);
        out.ua = await page.evaluate(() => navigator.userAgent);
        const n = await page.evaluate(() => document.querySelectorAll(".depth").length);
        const frames = wantShots && SCRATCH ? [] : null;
        out.scenes = [];
        for (let si = 0; si < n; si++) {
            const isFill = await page.evaluate((i) => document.querySelectorAll(".depth")[i].classList.contains("fill-scene"), si);
            if (isFill) continue;
            out.scenes.push(await readScene(page, si, cell, frames));
        }
        out.fill = await fillRead(page);
        out.flow = await page.evaluate(() => ({ scrollWidth: document.documentElement.scrollWidth, clientWidth: document.documentElement.clientWidth }));
        // sideways bleed: the title's figure pushed past the scene's end edge
        out.bleed = await page.evaluate(async () => {
            const st = document.createElement("style");
            st.textContent = ".hero-blob{margin-inline-start:40cqi !important}";
            document.head.append(st);
            await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
            const d = document.documentElement, f = document.querySelector(".hero-blob").getBoundingClientRect();
            const res = { figureRight: Math.round(f.right), scrollWidth: d.scrollWidth, clientWidth: d.clientWidth };
            st.remove();
            return res;
        });
        const stage = page.locator(".stage");
        if (await stage.count()) {
            out.stageName = await stage.ariaSnapshot();
            out.stageSelect = await page.evaluate(() => {
                const s = document.querySelector(".stage"), sel = getSelection();
                sel.removeAllRanges(); sel.selectAllChildren(s);
                const t = sel.toString().replace(/\s+/g, " ").trim(); sel.removeAllRanges(); return t;
            });
        }
        out.heroName = await page.locator(".hero").ariaSnapshot();
        out.errors = errs;
        if (frames?.length) {
            const dir = join(SCRATCH, `fold-${engineName}-${cell.id}${tag ? "-" + tag : ""}`);
            rmSync(dir, { recursive: true, force: true });
            mkdirSync(dir, { recursive: true });
            frames.forEach((f, k) => writeFileSync(join(dir, `${String(k).padStart(2, "0")}-${f.name}.png`), PNG.sync.write(f.png)));
            const name = `fold-${engineName}-${cell.w}-${cell.dark ? "dark" : "light"}${tag ? "-" + tag : ""}`;
            execFileSync("python3", ["-I", join(HERE, "fold-compose.py"), dir, STRIPS, name], { stdio: "inherit" });
            if (!process.env.DEPTH_KEEP) rmSync(dir, { recursive: true, force: true });
            out.strip = `${name}.png`;
        }
    } finally {
        await ctx.close();
    }
    return out;
}

const engine = { chromium, webkit }[engineName];
const browser = await engine.launch();
try {
    for (const c of cellArg.split(",").map(parseCell)) {
        let res;
        try { res = await runCell(browser, c); } catch (e) { res = { engine: engineName, cell: c, crash: String(e).slice(0, 300) }; }
        const file = join(DATA, `fold-${engineName}-${c.id}${tag ? "-" + tag : ""}.json`);
        writeFileSync(file, JSON.stringify(res, null, 1));
        if (res.crash) { console.log(`CRASH ${c.id} ${res.crash}`); continue; }
        for (const s of res.scenes) for (const o of s.offsets) for (const r of o.runs) {
            console.log(`${engineName} ${c.id}${tag ? " " + tag : ""} | ${s.scene} off ${o.offset} | ${r.depth} "${r.text.slice(0, 14)}" ${r.fontSize}px ${r.display} | cover ${r.cover} letter ${r.letterMax ? r.letterMax.ch + " " + r.letterMax.cover : "-"} | onFigure ${r.onFigure} | cMin ${r.cMin}${r.underFigure ? " | blur " + JSON.stringify(r.underFigure) : ""}`);
        }
        console.log(`  pointer ${res.scenes.map((s) => s.pointer?.takenByText).join(", ")} | flow ${res.flow.scrollWidth}/${res.flow.clientWidth} | bleed ${JSON.stringify(res.bleed)} | fill ${JSON.stringify(res.fill)}`);
        console.log(`  stage: ${res.stageName?.replace(/\n/g, " / ")} | select "${res.stageSelect}" | hero ${res.heroName?.replace(/\n/g, " / ")} | errors ${res.errors.length}`);
    }
} finally {
    await browser.close();
}
