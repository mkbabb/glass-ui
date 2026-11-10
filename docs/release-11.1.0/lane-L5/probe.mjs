// Lane L5 witness probe (the vite-served harness): HandMark as the heading mark (O-183) and
// off-screen marks that wait undrawn until they are scrolled to (O-190).
//
//   node probe.mjs <chromium|webkit> <base-url> <out-dir> <label> <tree:green|red>
//
// One browser per run, a new context per cell, every context and the browser closed in
// `finally`. Headless shell for Chromium (Playwright's default); WebKit is Playwright's
// build 2287, pinned by executablePath as lanes L1 to L4 do. Each run writes
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

const PATH = "/docs/release-11.1.0/lane-L5/harness/index.html";
const WIDTHS = [390, 1440];
const THEMES = ["light", "dark"];
const results = { engine: engineName, label, tree, base, cells: [] };
const verdicts = [];
const verdict = (item, cell, pass, detail) => verdicts.push({ item, cell, pass, detail });

async function open(browser, { width, theme, query, reducedMotion = "no-preference", media = "screen", settle = 400 }) {
    const context = await browser.newContext({
        viewport: { width, height: 800 },
        deviceScaleFactor: 1,
        colorScheme: theme,
        reducedMotion,
    });
    const page = await context.newPage();
    await page.emulateMedia({ media, reducedMotion, colorScheme: theme });
    await page.goto(`${base}${PATH}?${query}&theme=${theme}`, { waitUntil: "load" });
    await page.waitForFunction(() => window.__ready === true, null, { timeout: 30_000 });
    if (settle > 0) {
        await page.evaluate(() => document.fonts.ready);
        await page.waitForTimeout(settle);
    }
    return { context, page };
}
const clipOf = (box, pad) => ({ x: Math.max(0, box.x - pad), y: Math.max(0, box.y - pad), width: box.width + pad * 2, height: box.height + pad * 2 });
const shot = (page, name, box, pad = 8) => page.screenshot({ path: join(pngDir, `${label}-${engineName}-${name}.png`), clip: clipOf(box, pad) });

// ── colour: parse a computed colour into OKLCH ─────────────────────────────────────────
function srgbToOklch([r, g, b]) {
    const lin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const [R, G, B] = [r, g, b].map((c) => lin(c / 255));
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    const L = 0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s;
    const a = 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s;
    const bb = 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s;
    const C = Math.hypot(a, bb);
    const H = ((Math.atan2(bb, a) * 180) / Math.PI + 360) % 360;
    return { L, C, H };
}
function oklch(css) {
    const s = String(css).trim();
    let m = s.match(/^oklch\(\s*([\d.]+)(%?)\s+([\d.]+)\s+([\d.]+)/);
    if (m) return { L: Number(m[1]) / (m[2] ? 100 : 1), C: Number(m[3]), H: Number(m[4]) };
    m = s.match(/^rgba?\(\s*([\d.]+)[ ,]+([\d.]+)[ ,]+([\d.]+)/);
    if (m) return srgbToOklch([Number(m[1]), Number(m[2]), Number(m[3])]);
    m = s.match(/^color\(srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)/);
    if (m) return srgbToOklch([Number(m[1]) * 255, Number(m[2]) * 255, Number(m[3]) * 255]);
    return null;
}
const hueGap = (a, b) => Math.abs(((a - b + 540) % 360) - 180);

// ── paint: count pixels in a PNG crop that differ from a reference colour or crop ─────
function pixels(buf) {
    return PNG.sync.read(buf);
}
function diffCount(a, b, threshold = 40) {
    let n = 0;
    for (let i = 0; i < a.data.length; i += 4) {
        const d = Math.max(Math.abs(a.data[i] - b.data[i]), Math.abs(a.data[i + 1] - b.data[i + 1]), Math.abs(a.data[i + 2] - b.data[i + 2]));
        if (d > threshold) n++;
    }
    return n;
}
function groundCount(img, ground, threshold = 40) {
    let n = 0;
    for (let i = 0; i < img.data.length; i += 4) {
        const d = Math.max(Math.abs(img.data[i] - ground[0]), Math.abs(img.data[i + 1] - ground[1]), Math.abs(img.data[i + 2] - ground[2]));
        if (d > threshold) n++;
    }
    return n;
}

// ── in-page readers ───────────────────────────────────────────────────────────────────
// A guide's draw position as a fraction: 1 is undrawn, 0 is drawn. The branch dashes in
// `pathLength` units (dasharray 1); v11.0.0 dashes in px (dasharray = total length).
const GUIDE_FRACTION = `(g) => {
    const cs = getComputedStyle(g);
    const arr = parseFloat(cs.strokeDasharray) || 0;
    const off = parseFloat(cs.strokeDashoffset) || 0;
    return arr > 0 ? off / arr : off === 0 ? 0 : null;
}`;

async function readHeading(page) {
    return page.evaluate((GF) => {
        const frac = eval(GF);
        const q = (s) => document.querySelector(s);
        const mark = (probe) => q(`[data-probe="${probe}"]`);
        const lineCount = (el) => {
            const range = document.createRange();
            const tops = new Set();
            const walk = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
            for (let n = walk.nextNode(); n; n = walk.nextNode()) {
                if (!n.textContent.trim() || n.parentElement.closest("svg")) continue;
                range.selectNodeContents(n);
                for (const r of range.getClientRects()) if (r.width > 0) tops.add(Math.round(r.top));
            }
            return tops.size;
        };
        const root = getComputedStyle(document.documentElement);
        const settle = parseFloat(root.getPropertyValue("--spring-present-settle"));
        const tempo = parseFloat(root.getPropertyValue("--motion-tempo")) || 1;
        const readMark = (probe) => {
            const el = mark(probe);
            const inks = [...el.querySelectorAll("path.hm-ink")];
            const guides = [...el.querySelectorAll("path.hm-guide")];
            const decor = [el, ...el.querySelectorAll("svg.hm-mark"), ...inks].map((n) => {
                const cs = getComputedStyle(n);
                return { filter: cs.filter, boxShadow: cs.boxShadow, textShadow: cs.textShadow };
            });
            return {
                frames: el.querySelectorAll("svg.hm-mark").length,
                lines: lineCount(el),
                fontSize: parseFloat(getComputedStyle(el).fontSize),
                fill: inks[0] ? getComputedStyle(inks[0]).fill : null,
                guideStroke: guides.map((g) => Number(g.getAttribute("stroke-width"))),
                guideFraction: guides.map(frac),
                guideTiming: guides.map((g) =>
                    (g.getAnimations?.() ?? []).map((a) => {
                        const t = a.effect.getComputedTiming();
                        return {
                            kind: a.constructor.name,
                            name: a.animationName ?? null,
                            duration: t.duration,
                            delay: t.delay,
                            cssEasing: getComputedStyle(g).animationTimingFunction,
                            playState: a.playState,
                        };
                    }),
                ),
                decor,
                ornaments: el.querySelectorAll("filter, linearGradient, radialGradient, feGaussianBlur").length,
            };
        };
        return {
            presentMs: settle * 1000 * tempo,
            presentEasing: getComputedStyle(mark("spring")).animationTimingFunction,
            focal: getComputedStyle(mark("focal")).color,
            hero: readMark("hero-mark"),
            section: readMark("section-mark"),
            body: readMark("body-mark"),
        };
    }, GUIDE_FRACTION);
}

// ── O-183 · the heading mark: focal ink, the preset clock, wrapping, scale, no glow ──
async function heading(browser, width, theme) {
    const { context, page } = await open(browser, { width, theme, query: "scene=heading", settle: 700 });
    try {
        const r = await readHeading(page);
        const hero = await page.locator('[data-probe="hero"]').boundingBox();
        const section = await page.locator('[data-probe="section"]').boundingBox();
        await shot(page, `o183-hero-${width}-${theme}`, hero, 12);
        await shot(page, `o183-section-${width}-${theme}`, section, 12);
        results.cells.push({ item: "O-183", scene: "heading", width, theme, reading: r });
        const cell = `${width} ${theme}`;
        const focal = oklch(r.focal);
        const band = oklch(r.section.fill);
        verdict("O-183 wrap", cell, r.hero.lines >= 2 && r.hero.frames === r.hero.lines, { lines: r.hero.lines, frames: r.hero.frames });
        verdict("O-183 focal ink", cell, r.hero.fill === r.focal && r.body.fill === r.focal, { focal: r.focal, hero: r.hero.fill, body: r.body.fill });
        const gap = band && focal ? hueGap(band.H, focal.H) : null;
        verdict("O-183 band takes the focal hue", cell, gap !== null && gap <= 2, { band: r.section.fill, focal: r.focal, focalOklch: focal, hueGap: gap });
        const timings = [r.hero, r.section, r.body].flatMap((m) => m.guideTiming.map((ts) => ts.find((t) => (t.name ?? "").startsWith("hm-draw") || t.kind !== "CSSAnimation") ?? null));
        const clockOk = timings.length > 0 && timings.every((t) => t && Math.abs(t.duration - r.presentMs) < 0.5 && t.cssEasing === r.presentEasing);
        verdict("O-183 draw on the present clock", cell, clockOk, { presentMs: r.presentMs, durations: timings.map((t) => t?.duration ?? null), easingMatch: timings.map((t) => t?.cssEasing === r.presentEasing) });
        const delays = r.hero.guideTiming.map((ts) => ts[0]?.delay ?? null);
        results.cells.at(-1).heroDelays = delays;
        const ratio = r.hero.guideStroke[0] / r.body.guideStroke[0];
        verdict("O-183 nib follows the font size (hold)", cell, ratio > 2 && Number.isFinite(ratio), { heroStroke: r.hero.guideStroke[0], bodyStroke: r.body.guideStroke[0], fsRatio: r.hero.fontSize / r.body.fontSize, strokeRatio: ratio });
        const clean = [r.hero, r.section, r.body].every((m) => m.ornaments === 0 && m.decor.every((d) => d.filter === "none" && d.boxShadow === "none" && d.textShadow === "none"));
        verdict("O-183 no glow, sheen or shadow (hold)", cell, clean, { decor: r.hero.decor[0], ornaments: [r.hero.ornaments, r.section.ornaments, r.body.ornaments] });
        const settled = [r.hero, r.section, r.body].every((m) => m.guideFraction.every((f) => f !== null && Math.abs(f) < 0.001));
        verdict("O-183 marks rest drawn (hold)", cell, settled, { hero: r.hero.guideFraction, section: r.section.guideFraction });
    } finally {
        await context.close();
    }
}

// ── O-183 · reduced motion and print show the final state at frame 0 ─────────────────
async function frameZero(browser, width, theme, mode) {
    const opts = mode === "print" ? { media: "print" } : { reducedMotion: "reduce" };
    for (const scene of ["heading", "fold"]) {
        const { context, page } = await open(browser, { width, theme, query: `scene=${scene}`, settle: 0, ...opts });
        try {
            // Frame 0: the first read after mount, before any settle wait.
            const r = await page.evaluate((GF) => {
                const frac = eval(GF);
                const guides = [...document.querySelectorAll("path.hm-guide")];
                return {
                    fractions: guides.map(frac),
                    running: guides.flatMap((g) => g.getAnimations?.() ?? []).filter((a) => a.playState === "running").length,
                    marks: document.querySelectorAll("svg.hm-mark").length,
                };
            }, GUIDE_FRACTION);
            if (scene === "heading") {
                const hero = await page.locator('[data-probe="hero"]').boundingBox();
                await shot(page, `o183-${mode}-frame0-${width}-${theme}`, hero, 12);
            }
            results.cells.push({ item: "O-183", scene, mode, width, theme, frame0: r });
            const ok = r.marks > 0 && r.fractions.length > 0 && r.fractions.every((f) => f !== null && Math.abs(f) < 0.001) && r.running === 0;
            verdict(`O-183 ${mode} final at frame 0 (${scene})`, `${width} ${theme}`, ok, r);
        } finally {
            await context.close();
        }
    }
}

// ── O-190 · an off-screen in-view mark waits undrawn, then draws in when scrolled to ─
const FIRST_GUIDE = '[data-probe="below-mark"] path.hm-guide';
async function fold(browser, width, theme) {
    // (a) live: the computed draw while off-screen, then per frame after scrolling to it.
    {
        const { context, page } = await open(browser, { width, theme, query: "scene=fold", settle: 1500 });
        try {
            const r = await page.evaluate(async ({ GF, SEL }) => {
                const frac = eval(GF);
                const g = document.querySelector(SEL);
                const host = document.querySelector('[data-probe="below-mark"]');
                const offscreen = { fraction: frac(g), top: Math.round(host.getBoundingClientRect().top), vh: innerHeight, ink: host.dataset.ink ?? null };
                host.scrollIntoView({ block: "center" });
                const samples = [];
                const t0 = performance.now();
                await new Promise((done) => {
                    const step = () => {
                        samples.push(Math.round(frac(g) * 1000) / 1000);
                        if (performance.now() - t0 < 700) requestAnimationFrame(step);
                        else done();
                    };
                    requestAnimationFrame(step);
                });
                return { offscreen, samples };
            }, { GF: GUIDE_FRACTION, SEL: FIRST_GUIDE });
            const mids = r.samples.filter((f) => f > 0.02 && f < 0.98).length;
            results.cells.push({ item: "O-190", part: "live", width, theme, reading: r, drawFrames: mids });
            const cell = `${width} ${theme}`;
            verdict("O-190 off-screen mark waits undrawn", cell, r.offscreen.top > r.offscreen.vh && Math.abs(r.offscreen.fraction - 1) < 0.001, r.offscreen);
            verdict("O-190 draws in on entry (≥3 frames)", cell, mids >= 3 && r.samples.at(-1) < 0.001, { drawFrames: mids, first: r.samples[0], last: r.samples.at(-1) });
        } finally {
            await context.close();
        }
    }
    // (b) paint: on entry, pause the draw and step it, capturing each step.
    {
        const { context, page } = await open(browser, { width, theme, query: "scene=fold", settle: 1500 });
        try {
            const entry = await page.evaluate(async (SEL) => {
                const g = document.querySelector(SEL);
                const host = document.querySelector('[data-probe="below-mark"]');
                host.scrollIntoView({ block: "center" });
                const t0 = performance.now();
                let live = [];
                while (performance.now() - t0 < 1000) {
                    live = (g.getAnimations?.() ?? []).filter((a) => a.playState === "running" || a.pending);
                    if (live.length) break;
                    await new Promise((r) => requestAnimationFrame(r));
                }
                const all = [...host.querySelectorAll("path.hm-guide, path.hm-ink")].flatMap((n) => n.getAnimations?.() ?? []);
                for (const a of all) a.pause();
                window.__strip = all;
                return { running: live.length, paused: all.length };
            }, FIRST_GUIDE);
            const box = await page.evaluate(() => {
                const svg = document.querySelector('[data-probe="below-mark"] svg.hm-mark');
                const r = svg.getBoundingClientRect();
                const ink = svg.querySelector("path.hm-ink").getBBox();
                return { x: r.left + ink.x - 2, y: r.top + ink.y + ink.height * 0.45, width: ink.width + 4, height: ink.height * 0.55 + 2 };
            });
            const steps = [0, 0.25, 0.5, 0.75, 1];
            const crops = [];
            if (entry.running > 0) {
                for (const s of steps) {
                    await page.evaluate((s) => {
                        for (const a of window.__strip) {
                            const t = a.effect.getComputedTiming();
                            a.currentTime = (t.delay ?? 0) + s * (t.duration || 0);
                        }
                    }, s);
                    await page.evaluate(() => new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r))));
                    const buf = await page.screenshot({ path: join(pngDir, `${label}-${engineName}-o190-strip-${width}-${theme}-${Math.round(s * 100)}.png`), clip: clipOf(box, 0) });
                    crops.push(pixels(buf));
                }
            }
            const ground = await page.evaluate(() => {
                const c = getComputedStyle(document.body).backgroundColor.match(/[\d.]+/g).map(Number);
                return c.slice(0, 3);
            });
            const ink = crops.map((c) => groundCount(c, ground));
            const growing = ink.length === steps.length && ink[0] <= ink[ink.length - 1] * 0.05 && ink.every((v, i) => i === 0 || v >= ink[i - 1]) && ink[ink.length - 1] > 20;
            results.cells.push({ item: "O-190", part: "paint", width, theme, entry, inkPixels: ink, box });
            verdict("O-190 paint: undrawn at entry, then drawn in", `${width} ${theme}`, entry.running > 0 && growing, { entry, inkPixels: ink });
        } finally {
            await context.close();
        }
    }
    // (c) retrigger: draws, undraws when wholly out, draws again on the next entry.
    {
        const { context, page } = await open(browser, { width, theme, query: "scene=fold&retrigger=1", settle: 600 });
        try {
            const r = await page.evaluate(async ({ GF, SEL }) => {
                const frac = eval(GF);
                const g = document.querySelector(SEL);
                const host = document.querySelector('[data-probe="below-mark"]');
                const wait = (ms) => new Promise((r) => setTimeout(r, ms));
                const count = async () => {
                    const s = [];
                    const t0 = performance.now();
                    await new Promise((done) => {
                        const step = () => {
                            s.push(frac(g));
                            if (performance.now() - t0 < 700) requestAnimationFrame(step);
                            else done();
                        };
                        requestAnimationFrame(step);
                    });
                    return s.filter((f) => f > 0.02 && f < 0.98).length;
                };
                host.scrollIntoView({ block: "center" });
                const first = await count();
                window.scrollTo(0, 0);
                await wait(400);
                const away = { fraction: frac(g), ink: host.dataset.ink ?? null };
                host.scrollIntoView({ block: "center" });
                const second = await count();
                return { first, away, second };
            }, { GF: GUIDE_FRACTION, SEL: FIRST_GUIDE });
            results.cells.push({ item: "O-183", part: "retrigger", width, theme, reading: r });
            verdict("O-183 retrigger redraws on each entry", `${width} ${theme}`, r.first >= 3 && Math.abs(r.away.fraction - 1) < 0.001 && r.second >= 3, r);
        } finally {
            await context.close();
        }
    }
}

const browser = await launch();
try {
    for (const width of WIDTHS)
        for (const theme of THEMES) {
            await heading(browser, width, theme);
            await frameZero(browser, width, theme, "reduced-motion");
            await frameZero(browser, width, theme, "print");
            await fold(browser, width, theme);
        }
} finally {
    await browser.close();
}
const pass = verdicts.filter((v) => v.pass).length;
results.verdicts = verdicts;
results.summary = { pass, total: verdicts.length };
writeFileSync(join(outDir, `${label}-${engineName}.json`), JSON.stringify(results, null, 2));
const byItem = {};
for (const v of verdicts) {
    byItem[v.item] ??= [0, 0];
    byItem[v.item][1]++;
    if (v.pass) byItem[v.item][0]++;
}
for (const [k, [p, t]] of Object.entries(byItem)) console.log(`${k}: ${p}/${t}`);
console.log(`${label} ${engineName}: ${pass}/${verdicts.length}`);
process.exit(pass === verdicts.length ? 0 : 1);
