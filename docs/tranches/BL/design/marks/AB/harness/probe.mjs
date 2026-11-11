// The AB sheet probe: one harness, every candidate, one engine per run.
//   node probe.mjs <engine> <out> ctl=<url> a=<url> b=<url>   (each url = a worktree's vite root)
// Per viewport × candidate × shape: the rest state light and dark, the glyph-only and mark-only
// passes (extent, descender intersections, weight, seat, lines, ink), a mid-draw frame, the
// animations and the read ledger. At 1440: reduced motion, print, forced colours, no script,
// and the in-view scene.
import { mkdirSync, writeFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PNG, decodePng, launch, oklch, open } from "./lib.mjs";

const [engine, out, ...cands] = process.argv.slice(2);
const C = Object.fromEntries(cands.map((s) => s.split("=")));
const TREES = { ctl: process.env.TREE_CTL, a: process.env.TREE_A, b: process.env.TREE_B };
const png = join(out, "png");
mkdirSync(png, { recursive: true });
const SMOKE = !!process.env.SMOKE;
const VPS = SMOKE ? [{ w: 1440, h: 1500 }] : [{ w: 390, h: 2600 }, { w: 1440, h: 1500 }];
const SHAPES = SMOKE ? ["underline"] : ["underline", "highlight"];
const IDS = ["h16", "h48", "h85", "h112", "wake", "google", "wrap", "atlas21", "atlas42", "rtl"];
const rec = { engine, cells: [], still: [], inview: [], errors: [] };

const url = (c, q) => `${C[c]}/ab/index.html?${q}`;

async function settle(page, n = IDS.length, ms = 5000) {
    await page.waitForFunction((n) => window.__draw.drawn.length >= n, n, { timeout: ms }).catch(() => {});
    await page.waitForTimeout(250);
}

const geometry = (page) =>
    page.evaluate(() => {
        window.__phase = "probe";
        const out = {};
        for (const host of document.querySelectorAll("[data-probe]")) {
            const id = host.dataset.probe;
            const cs = getComputedStyle(host);
            const walk = document.createTreeWalker(host, NodeFilter.SHOW_TEXT);
            const r = document.createRange();
            const rows = [];
            for (let n = walk.nextNode(); n; n = walk.nextNode()) {
                if (!n.textContent.trim()) continue;
                if (n.parentElement.closest('[aria-hidden="true"], svg')) continue;
                r.selectNodeContents(n);
                for (const q of r.getClientRects()) {
                    if (q.width <= 0 || q.height <= 0) continue;
                    const row = rows.find((o) => Math.min(o.b, q.bottom) - Math.max(o.t, q.top) > Math.min(o.b - o.t, q.height) / 2);
                    if (!row) rows.push({ l: q.left, r: q.right, t: q.top, b: q.bottom });
                    else Object.assign(row, { l: Math.min(row.l, q.left), r: Math.max(row.r, q.right), t: Math.min(row.t, q.top), b: Math.max(row.b, q.bottom) });
                }
            }
            rows.sort((a, b) => a.t - b.t);
            const nx = host.nextElementSibling;
            const bl = nx?.classList.contains("bl") ? nx.getBoundingClientRect().bottom : null;
            out[id] = { fs: parseFloat(cs.fontSize), dir: cs.direction, rows, bl };
        }
        const sw = document.querySelector(".ink-swatch")?.getBoundingClientRect();
        const sheet = document.querySelector(".sheet").getBoundingClientRect();
        return { marks: out, swatch: sw ? { x: sw.left + sw.width / 2, y: sw.top + sw.height / 2 } : null, sheet: { h: sheet.height, w: sheet.width } };
    });

const ledger = (page) =>
    page.evaluate(() => {
        const d = window.__draw;
        const last = d.drawn.length ? Math.max(...d.drawn) : null;
        const by = {};
        const inDraw = {};
        for (const r of window.__reads) {
            if (r.phase === "probe") continue;
            (by[r.phase] ??= {})[r.api] = (by[r.phase][r.api] ?? 0) + 1;
            if (d.start !== null && r.t > d.start && last !== null && r.t <= last) (inDraw[r.phase] ??= {})[r.api] = (inDraw[r.phase][r.api] ?? 0) + 1;
        }
        return { byPhase: by, inDrawWindow: inDraw, drawStart: d.start, lastDrawn: last, drawnEvents: d.drawn.length, animationNames: [...d.names] };
    });

/** Every animation and transition on the marks while the draw runs. */
async function animations(page) {
    const seen = {};
    for (let i = 0; i < 120; i++) {
        const snap = await page.evaluate(() => {
            const was = window.__phase;
            window.__phase = "probe";
            const out = [];
            for (const a of document.getAnimations()) {
                const t = a.effect?.target;
                if (!t || !t.closest?.("[data-probe]")) continue;
                const kf = a.effect.getKeyframes();
                const props = [...new Set(kf.flatMap((k) => Object.keys(k)))].filter((k) => !["offset", "computedOffset", "easing", "composite"].includes(k));
                const ct = a.effect.getComputedTiming();
                out.push({ kind: a.constructor.name, name: a.animationName ?? a.transitionProperty ?? "", props, duration: ct.duration, delay: ct.delay, easing: a.effect.getTiming().easing, el: t.getAttribute("class") ?? t.tagName });
            }
            const sp = getComputedStyle(document.querySelector(".spring-probe"));
            window.__phase = was;
            return { out, presentDuration: parseFloat(sp.animationDuration) * 1000, presentEasing: sp.animationTimingFunction, drawn: window.__draw.drawn.length };
        });
        for (const a of snap.out) seen[`${a.kind}|${a.name}|${a.el}|${a.props.join("+")}|${a.duration}|${a.easing}`] = a;
        if (snap.drawn >= IDS.length) return { list: Object.values(seen), presentDuration: snap.presentDuration, presentEasing: snap.presentEasing };
        await page.waitForTimeout(16);
    }
    return { list: Object.values(seen), timeout: true };
}

function img(buf) { const p = decodePng(buf); return { w: p.width, h: p.height, d: p.data }; }
const diffW = (im, x, y) => { const i = (y * im.w + x) * 4; return Math.max(255 - im.d[i], 255 - im.d[i + 1], 255 - im.d[i + 2]); };
const rgbAt = (im, x, y) => { const i = (y * im.w + x) * 4; return [im.d[i], im.d[i + 1], im.d[i + 2]]; };
const med = (a) => { if (!a.length) return null; const s = [...a].sort((x, y) => x - y); return s[Math.floor(s.length / 2)]; };

/** Per mark, per line box: extent against the glyph ink, intersections, weight, seat, ink. */
function analyze(geo, glyph, mark, normals, shape, S = 2) {
    const res = {};
    for (const id of IDS) {
        const g = geo.marks[id];
        if (!g) continue;
        const em = g.fs;
        const lines = [];
        g.rows.forEach((row, k) => {
            const prev = g.rows[k - 1], next = g.rows[k + 1];
            // The line's own band: its glyph box, a hair above and 0.15em below, never into a neighbour.
            const y0 = Math.max(prev ? (prev.b + row.t) / 2 : row.t - 0.05 * em, 0);
            const y1 = next ? (row.b + next.t) / 2 : row.b + 0.15 * em;
            const x0 = Math.max(0, row.l - 0.6 * em), x1 = row.r + 0.6 * em;
            const X0 = Math.floor(x0 * S), X1 = Math.min(glyph.w - 1, Math.ceil(x1 * S)), Y0 = Math.floor(y0 * S), Y1 = Math.min(glyph.h - 1, Math.ceil(y1 * S));
            let maxM = 0;
            for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) maxM = Math.max(maxM, diffW(mark, x, y));
            const mTh = Math.max(16, maxM * 0.5);
            let gL = Infinity, gR = -Infinity, mL = Infinity, mR = -Infinity, inter = 0, markPx = 0;
            const cov = new Map();
            for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) {
                const gd = diffW(glyph, x, y), md = diffW(mark, x, y);
                const gi = gd > 128, mi = md > mTh;
                if (gi) { gL = Math.min(gL, x); gR = Math.max(gR, x); }
                if (mi) { mL = Math.min(mL, x); mR = Math.max(mR, x); markPx++; }
                if (gi && mi) inter++;
                if (maxM > 16) cov.set(x, (cov.get(x) ?? 0) + md / maxM);
            }
            const line = { glyphL: +(gL / S).toFixed(1), glyphR: +((gR + 1) / S).toFixed(1), marked: markPx > 4 };
            if (line.marked) {
                line.markL = +(mL / S).toFixed(1);
                line.markR = +((mR + 1) / S).toFixed(1);
                // Positive = ink past the text. Left/right are physical; start/end follow the direction.
                line.pastLeft = +((gL - mL) / S).toFixed(1);
                line.pastRight = +((mR - gR) / S).toFixed(1);
                line.intersectDevPx = inter;
                // Weight: median column coverage over the middle 40% of the mark.
                const c0 = mL + 0.3 * (mR - mL), c1 = mL + 0.7 * (mR - mL);
                const cols = [];
                for (let x = Math.ceil(c0); x <= c1; x++) if ((cov.get(x) ?? 0) > 0.5) cols.push(cov.get(x));
                line.weightPx = cols.length ? +(med(cols) / S).toFixed(2) : null;
                line.weightEm = line.weightPx ? +(line.weightPx / em).toFixed(4) : null;
                // Seat: the mark's top and bottom rows at the median column, against the baseline.
                if (g.bl !== null && k === 0) {
                    const xs = Math.round((c0 + c1) / 2);
                    let top = null, bot = null;
                    for (let y = Y0; y <= Y1; y++) if (diffW(mark, xs, y) > mTh) { top ??= y; bot = y; }
                    if (top !== null) {
                        line.topBelowBaselineEm = +((top / S - g.bl) / em).toFixed(3);
                        line.bottomBelowBaselineEm = +(((bot + 1) / S - g.bl) / em).toFixed(3);
                    }
                }
                // Ink: the normal pass's colour where the mark is solid and no glyph is.
                line.ink = {};
                for (const [theme, nm] of Object.entries(normals)) {
                    if (!nm) continue;
                    const px = [];
                    for (let y = Y0; y <= Y1; y += 1) for (let x = X0; x <= X1; x += 1)
                        if (diffW(mark, x, y) > maxM * 0.92 && diffW(glyph, x, y) < 8) px.push(rgbAt(nm, x, y));
                    if (px.length) line.ink[theme] = [0, 1, 2].map((c) => med(px.map((p) => p[c])));
                }
            }
            lines.push(line);
        });
        res[id] = { fs: g.fs, dir: g.dir, bl: g.bl, rows: g.rows.map((r) => [r.l, r.t, r.r, r.b].map((v) => +v.toFixed(1))), lines };
    }
    return res;
}

async function shot(page) { return img(await page.screenshot({ type: "png" })); }
async function savePng(page, name, clipH) {
    const vp = page.viewportSize();
    const buf = await page.screenshot({ type: "png", clip: { x: 0, y: 0, width: vp.width, height: Math.min(vp.height, clipH) } });
    writeFileSync(join(png, `${name}.png`), buf);
}

async function sheetCells(browser, vp, c, shape) {
    const base = `scene=sheet&shape=${shape}`;
    const o = { width: vp.w, height: vp.h };
    const cell = { vp: vp.w, cand: c, shape };
    let geo;
    const normals = {};
    for (const theme of ["light", "dark"]) {
        const { context, page, errors } = await open(browser, url(c, `${base}&theme=${theme}`), { ...o, theme });
        try {
            if (theme === "light") cell.animations = await animations(page);
            await settle(page);
            if (theme === "light") cell.ledger = await ledger(page);
            const g = await geometry(page);
            geo ??= g;
            cell.sheetH = Math.ceil(g.sheet.h);
            normals[theme] = await shot(page);
            await savePng(page, `${engine}-${vp.w}-${c}-${shape}-${theme}`, cell.sheetH + 8);
            if (theme === "light" && vp.w === 1440) {
                const css = await page.evaluate(() => {
                    window.__phase = "probe";
                    return [...document.styleSheets].map((s) => { try { return [...s.cssRules].map((r) => r.cssText).join("\n"); } catch { return ""; } }).join("\n");
                });
                writeFileSync(join(TREES[c], "ab/static", `css-${shape}.css`), css);
                if (!existsSync(join(TREES[c], "ab/static", `ssr-${shape}.html`))) {
                    // SSR threw for this candidate: emulate the server's markup with the mounted DOM, the mark removed.
                    const html = await page.evaluate(() => {
                        const s = document.querySelector(".sheet").cloneNode(true);
                        s.querySelectorAll(".hm-reveal").forEach((n) => n.remove());
                        return s.outerHTML;
                    });
                    writeFileSync(join(TREES[c], "ab/static", `emul-${shape}.html`), html);
                }
                cell.swatch = rgbAt(normals.light, Math.round(g.swatch.x * 2), Math.round(g.swatch.y * 2));
            }
            if (theme === "dark") cell.swatchDark = rgbAt(normals.dark, Math.round(geo.swatch.x * 2), Math.round(geo.swatch.y * 2));
            if (errors.length) cell[`errors_${theme}`] = errors.slice(0, 5);
        } finally {
            await context.close();
        }
    }
    const passes = {};
    for (const pass of ["glyph", "mark"]) {
        const { context, page } = await open(browser, url(c, `${base}&theme=light&pass=${pass}`), o);
        try {
            await settle(page);
            passes[pass] = await shot(page);
            if (vp.w === 1440) await savePng(page, `${engine}-${vp.w}-${c}-${shape}-pass-${pass}`, cell.sheetH + 8);
        } finally {
            await context.close();
        }
    }
    cell.marks = analyze(geo, passes.glyph, passes.mark, normals, shape);
    // Mid-draw: the draw's own animations paused and sought to half of each mark's clock.
    {
        const { context, page } = await open(browser, url(c, `${base}&theme=light&hold=1`), o);
        try {
            const r = await page.evaluate(async (ids) => {
                const raf = () => new Promise((r) => requestAnimationFrame(r));
                for (let i = 0; i < 240; i++) {
                    const ok = ids.every((id) => (document.querySelector(`[data-probe="${id}"]`)?.getAnimations({ subtree: true }).length ?? 0) > 0);
                    if (ok) break;
                    await raf();
                }
                await raf();
                let n = 0;
                for (const id of ids) {
                    const host = document.querySelector(`[data-probe="${id}"]`);
                    const as = host?.getAnimations({ subtree: true }) ?? [];
                    const T = Math.max(0, ...as.map((a) => { const t = a.effect.getComputedTiming(); return (t.delay ?? 0) + (t.duration ?? 0); }));
                    for (const a of as) { a.pause(); a.currentTime = 0.5 * T; n++; }
                }
                await raf(); await raf();
                return n;
            }, IDS);
            cell.midDrawAnimationsSought = r;
            await savePng(page, `${engine}-${vp.w}-${c}-${shape}-mid50`, cell.sheetH + 8);
        } finally {
            await context.close();
        }
    }
    rec.cells.push(cell);
    console.log(`${engine} ${vp.w} ${c} ${shape} sheetH=${cell.sheetH} drawn=${cell.ledger?.drawnEvents}`);
}

/** Mark-pixel coverage per mark, against the rest state's mark pass. */
function coverage(geo, im, S = 2) {
    const o = {};
    for (const id of IDS) {
        const g = geo.marks[id];
        if (!g) continue;
        let n = 0;
        for (const row of g.rows) {
            const X0 = Math.floor(Math.max(0, row.l - 0.3 * g.fs) * S), X1 = Math.min(im.w - 1, Math.ceil((row.r + 0.3 * g.fs) * S));
            const Y0 = Math.floor(Math.max(0, row.t - 0.15 * g.fs) * S), Y1 = Math.min(im.h - 1, Math.ceil((row.b + 0.15 * g.fs) * S));
            for (let y = Y0; y <= Y1; y++) for (let x = X0; x <= X1; x++) if (diffW(im, x, y) > 24) n++;
        }
        o[id] = n;
    }
    return o;
}

/** Forced colours: a real underline (a row of CanvasText under the text) or a Mark background. */
function forcedRead(geo, im, S = 2) {
    const o = {};
    const bg = rgbAt(im, 4, Math.round(im.h / 2) * 0 + 4);
    for (const id of IDS) {
        const g = geo.marks[id];
        if (!g) continue;
        const row = g.rows[0];
        const X0 = Math.floor(row.l * S), X1 = Math.ceil(row.r * S);
        // underline: the fraction of columns that hold a non-background pixel in the band under the glyph box's lower third
        const yTop = Math.floor((g.bl ?? row.b - 0.2 * g.fs) * S), yBot = Math.ceil(row.b * S + 0.1 * g.fs * S);
        let full = 0;
        for (let y = yTop; y <= Math.min(im.h - 1, yBot); y++) {
            let n = 0;
            for (let x = X0; x <= X1; x++) { const p = rgbAt(im, x, y); if (Math.max(Math.abs(p[0] - bg[0]), Math.abs(p[1] - bg[1]), Math.abs(p[2] - bg[2])) > 96) n++; }
            if (n / (X1 - X0 + 1) > 0.6) full++;
        }
        // highlight: share of the run box painted something other than the canvas and not text-coloured
        let tinted = 0, tot = 0;
        const colours = {};
        for (let y = Math.floor(row.t * S); y <= Math.ceil(row.b * S); y += 2) for (let x = X0; x <= X1; x += 2) {
            const p = rgbAt(im, x, y); tot++;
            const d = Math.max(Math.abs(p[0] - bg[0]), Math.abs(p[1] - bg[1]), Math.abs(p[2] - bg[2]));
            if (d > 40) { tinted++; const k = p.map((v) => Math.round(v / 32) * 32).join(","); colours[k] = (colours[k] ?? 0) + 1; }
        }
        const top = Object.entries(colours).sort((a, b) => b[1] - a[1]).slice(0, 3).map(([k, v]) => `${k}:${v}`);
        o[id] = { ruleRows: full, tintedShare: +(tinted / tot).toFixed(2), topColours: top };
    }
    return { bg, marks: o };
}

async function stillCells(browser, c, shape, restGeo, restMark) {
    const o = { width: 1440, height: 1500 };
    const base = `scene=sheet&shape=${shape}&theme=light`;
    const row = { cand: c, shape };
    // Reduced motion: frame 0 (two frames after mount) against the rest state.
    for (const [label, opt] of [["reduced", { reducedMotion: "reduce" }], ["print", { media: "print" }]]) {
        for (const pass of ["mark", null]) {
            const { context, page } = await open(browser, url(c, base + (pass ? `&pass=${pass}` : "")), { ...o, ...opt });
            try {
                const st = await page.evaluate(() => ({ running: document.getAnimations().filter((a) => a.effect?.target?.closest?.("[data-probe]") && a.playState === "running").length, drawn: window.__draw.drawn.length, t: performance.now() }));
                if (pass) {
                    const cov0 = coverage(restGeo, await shot(page));
                    await page.waitForTimeout(800);
                    const cov1 = coverage(restGeo, await shot(page));
                    const st1 = await page.evaluate(() => window.__draw.drawn.length);
                    row[label] = { frame0: st, drawnAfter800ms: st1, coverageFrame0VsRest: ratio(cov0, restMark), coverageAt800msVsRest: ratio(cov1, restMark) };
                } else await savePng(page, `${engine}-1440-${c}-${shape}-${label}`, 1500);
            } finally {
                await context.close();
            }
        }
    }
    // Forced colours.
    {
        const { context, page } = await open(browser, url(c, base), { ...o, forcedColors: "active" });
        try {
            await page.waitForTimeout(1200);
            const active = await page.evaluate(() => matchMedia("(forced-colors: active)").matches);
            row.forced = { active, ...forcedRead(restGeo, await shot(page)) };
            await savePng(page, `${engine}-1440-${c}-${shape}-forced`, 1500);
        } finally {
            await context.close();
        }
    }
    // No script: the server's markup (or its emulation) with the page's own CSS, scripts disabled.
    const tree = TREES[c];
    const ssrFile = join(tree, "ab/static", `ssr-${shape}.html`);
    const emul = join(tree, "ab/static", `emul-${shape}.html`);
    const body = existsSync(ssrFile) ? readFileSync(ssrFile, "utf8") : readFileSync(emul, "utf8");
    const css = readFileSync(join(tree, "ab/static", `css-${shape}.css`), "utf8");
    row.noscript = { markup: existsSync(ssrFile) ? "ssr" : "emulated (SSR threw)" };
    for (const pass of ["", "mark"]) {
        const f = `noscript-${shape}${pass ? "-" + pass : ""}.html`;
        writeFileSync(join(tree, "ab/static", f), `<!doctype html><html lang="en"${pass ? ` data-pass="${pass}"` : ""}><head><meta charset="utf-8"><style>${css}</style></head><body><span id="scr"></span><div id="app">${body}</div></body></html>`);
        for (const media of ["screen", "print"]) {
            const { context, page } = await open(browser, `${C[c]}/ab/static/${f}`, { ...o, js: false, media });
            try {
                await page.waitForTimeout(600);
                const im = await shot(page);
                if (pass) row.noscript[`coverageVsRest_${media}`] = ratio(coverage(restGeo, im), restMark);
                else {
                    const s = rgbAt(im, 10, 10);
                    row.noscript.scriptingNoneMatched = s[0] > 200 && s[2] < 80;
                    await savePng(page, `${engine}-1440-${c}-${shape}-noscript-${media}`, 1500);
                }
            } finally {
                await context.close();
            }
        }
    }
    rec.still.push(row);
    console.log(`${engine} still ${c} ${shape}`, JSON.stringify(row).slice(0, 400));
}
const ratio = (a, b) => Object.fromEntries(Object.keys(b).map((k) => [k, b[k] ? +((a[k] ?? 0) / b[k]).toFixed(2) : null]));

async function inview(browser, c) {
    const { context, page } = await open(browser, url(c, "scene=one&shape=underline&fold=1"), { width: 1440, height: 900 });
    try {
        await page.waitForTimeout(1000);
        const before = await page.evaluate(() => ({ drawn: window.__draw.drawn.length, starts: window.__draw.starts }));
        await page.evaluate(() => { window.__phase = "probe"; document.querySelector("[data-probe]").scrollIntoView({ block: "center" }); });
        await page.waitForTimeout(1200);
        const after = await page.evaluate(() => ({ drawn: window.__draw.drawn.length, starts: window.__draw.starts }));
        rec.inview.push({ cand: c, belowFoldAfter1s: before, afterScrollIntoView: after });
    } finally {
        await context.close();
    }
}

const browser = await launch(engine);
try {
    for (const c of Object.keys(C)) { const { context } = await open(browser, url(c, "scene=sheet&shape=underline"), { width: 1440, height: 1500 }); await context.close(); }
    const rest = {};
    for (const vp of VPS) for (const c of Object.keys(C)) for (const shape of SHAPES) {
        try { await sheetCells(browser, vp, c, shape); } catch (e) { rec.errors.push(`${vp.w} ${c} ${shape}: ${e}`); console.log("ERR", e); }
    }
    if (!SMOKE) for (const c of Object.keys(C)) for (const shape of SHAPES) {
        try {
            // The rest geometry and mark-pass coverage the still states are read against.
            const { context, page } = await open(browser, url(c, `scene=sheet&shape=${shape}&theme=light&pass=mark`), { width: 1440, height: 1500 });
            let geo, cov;
            try { await settle(page); geo = await geometry(page); cov = coverage(geo, await shot(page)); } finally { await context.close(); }
            rest[`${c}-${shape}`] = cov;
            await stillCells(browser, c, shape, geo, cov);
        } catch (e) { rec.errors.push(`still ${c} ${shape}: ${e}`); console.log("ERR", e); }
    }
    if (!SMOKE) for (const c of Object.keys(C)) await inview(browser, c).catch((e) => rec.errors.push(`inview ${c}: ${e}`));
} finally {
    await browser.close();
    writeFileSync(join(out, `sheet-${engine}.json`), JSON.stringify(rec, null, 1));
}
