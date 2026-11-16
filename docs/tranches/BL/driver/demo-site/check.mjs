// The demo-site checker: runs FORM.md's reviewer checklist (page form lines 1-15,
// the editor checklist, the landing checks) on a list of routes in three cells and
// prints one row per route per line, pass or fail with the measured number.
//
// Built from ../../audit/demo-site/tools/probe.mjs. It reads the page's own markers
// (`data-story-header`, `data-story-stage`, `data-story-variants`, `data-story-code`);
// a route without them is an unrebuilt page and gets the render checks only.
//
// Machine law (~/.claude/CLAUDE.md): run only through `~/.claude/guard/guarded`, never
// `--light` (it launches a browser). Chromium headless shell only. The launch flags
// `--use-angle=metal --enable-gpu --ignore-gpu-blocklist` are the one named exception
// (FORM.md's checks need GPU canvases to render); no other browser flags. One browser
// per run, a new context per route and cell, everything closed in `finally`. Pixels
// come from page.screenshot; no getContext is ever called on a page canvas.
//
// usage: node check.mjs --base http://localhost:5451 --routes /,/display/buttons
//        [--cells d1440,l1440,m390] [--budget /display/buttons=40] [--out rows.jsonl]
import { chromium } from "playwright";
import fs from "node:fs";

const args = Object.fromEntries(
    process.argv.slice(2).reduce((acc, a, i, all) => {
        if (a.startsWith("--")) acc.push([a.slice(2), all[i + 1]]);
        return acc;
    }, []),
);
const BASE = args.base ?? "http://localhost:5451";
const ROUTES = (args.routes ?? "/").split(",");
const CELL_IDS = (args.cells ?? "d1440,l1440,m390").split(",");
const BUDGET = Object.fromEntries(
    (args.budget ?? "").split(",").filter(Boolean).map((kv) => {
        const [r, n] = kv.split("=");
        return [r, Number(n)];
    }),
);
const OUT = args.out ? fs.createWriteStream(args.out, { flags: "a" }) : null;

export const CELLS = {
    d1440: { viewport: { width: 1440, height: 900 }, scheme: "dark", touch: false },
    l1440: { viewport: { width: 1440, height: 900 }, scheme: "light", touch: false },
    m390: { viewport: { width: 390, height: 844 }, scheme: "dark", touch: true },
};

const INIT = (scheme) => `try { localStorage.setItem("vueuse-color-scheme", ${JSON.stringify(scheme)}); } catch {}`;

// ---------- in-page measurement ----------
const MEASURE = async ({ shotB64, vw, vh }) => {
    const WORD = /[\p{L}\p{N}][\p{L}\p{N}'’-]*/gu;
    const words = (s) => (s.match(WORD) || []).length;
    const main = document.querySelector("#demo-main");
    const article = main?.querySelector("article");
    const header = main?.querySelector("[data-story-header]");
    const stages = [...(main?.querySelectorAll("[data-story-stage]") ?? [])];
    const stage = stages[0] ?? null;
    const variants = main?.querySelector("[data-story-variants]");
    const code = main?.querySelector("[data-story-code]");

    // our own canvas for colour and pixel reads (never a page canvas)
    const oc = new OffscreenCanvas(1, 1);
    const ox = oc.getContext("2d", { willReadFrequently: true });
    const toRGBA = (css) => {
        ox.clearRect(0, 0, 1, 1);
        ox.fillStyle = "#000";
        ox.fillStyle = css;
        ox.fillRect(0, 0, 1, 1);
        const d = ox.getImageData(0, 0, 1, 1).data;
        return [d[0], d[1], d[2], d[3] / 255];
    };
    const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
    const CR = (a, b) => {
        const x = L(a), y = L(b);
        return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05);
    };
    let img = null;
    if (shotB64) {
        const bin = Uint8Array.from(atob(shotB64), (c) => c.charCodeAt(0));
        const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
        const c2 = new OffscreenCanvas(bmp.width, bmp.height);
        const x2 = c2.getContext("2d", { willReadFrequently: true });
        x2.drawImage(bmp, 0, 0);
        img = x2.getImageData(0, 0, bmp.width, bmp.height);
    }
    const px = (x, y) => {
        const i = (y * img.width + x) * 4;
        return [img.data[i], img.data[i + 1], img.data[i + 2]];
    };
    // the modal background colour in a rect: the colour most samples share
    const bgOf = (r) => {
        const x0 = Math.max(0, Math.floor(r.left)), y0 = Math.max(0, Math.floor(r.top));
        const x1 = Math.min(img.width - 1, Math.ceil(r.right)), y1 = Math.min(img.height - 1, Math.ceil(r.bottom));
        if (x1 <= x0 || y1 <= y0) return null;
        const bins = new Map();
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
            const p = px(x, y);
            const k = (p[0] >> 4) * 256 + (p[1] >> 4) * 16 + (p[2] >> 4);
            const b = bins.get(k) || [0, 0, 0, 0];
            b[0] += p[0]; b[1] += p[1]; b[2] += p[2]; b[3]++;
            bins.set(k, b);
        }
        let best = null;
        for (const b of bins.values()) if (!best || b[3] > best[3]) best = b;
        return [best[0] / best[3], best[1] / best[3], best[2] / best[3]];
    };

    const rectOf = (el) => {
        const r = el.getBoundingClientRect();
        return { left: r.left, top: r.top, right: r.right, bottom: r.bottom, width: r.width, height: r.height };
    };

    // text runs in the article: grouped by parent element
    const runs = [];
    if (article) {
        const groups = new Map();
        const tw = document.createTreeWalker(article, NodeFilter.SHOW_TEXT);
        for (let n = tw.nextNode(); n; n = tw.nextNode()) {
            if (!/[\p{L}\p{N}]/u.test(n.data)) continue;
            const el = n.parentElement;
            if (!el || el.closest("script,style")) continue;
            if (!el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
            const g = groups.get(el) || [];
            g.push(n);
            groups.set(el, g);
        }
        for (const [el, nodes] of groups) {
            let l = 1e9, t = 1e9, r = -1e9, b = -1e9, text = "";
            for (const n of nodes) {
                const rg = document.createRange();
                rg.selectNodeContents(n);
                for (const q of rg.getClientRects()) {
                    if (q.width < 1 || q.height < 1) continue;
                    l = Math.min(l, q.left); t = Math.min(t, q.top); r = Math.max(r, q.right); b = Math.max(b, q.bottom);
                }
                text += n.data;
            }
            if (r < 0) continue;
            runs.push({ el, rect: { left: l, top: t, right: r, bottom: b }, text: text.replace(/\s+/g, " ").trim() });
        }
    }
    const inStage = (el) => stages.some((s) => s.contains(el));
    const inCode = (el) => !!(code && code.contains(el));
    const pageRuns = runs.filter((r) => !inStage(r.el) && !inCode(r.el));
    const pageWords = pageRuns.reduce((s, r) => s + words(r.text), 0);
    const stageTop = stage ? rectOf(stage).top : null;
    const wordsBefore = stage
        ? pageRuns.filter((r) => stage.compareDocumentPosition(r.el) & Node.DOCUMENT_POSITION_PRECEDING).reduce((s, r) => s + words(r.text), 0)
        : null;
    const ledeEl = header?.querySelector("p");
    const lede = ledeEl?.textContent.trim() ?? "";
    const title = header?.querySelector("h1")?.textContent.trim() ?? "";

    // first-screen areas on an 8 px grid inside main's box
    const mr = main ? main.getBoundingClientRect() : { left: 0, top: 0, right: vw, bottom: vh };
    const G = 8, cols = Math.ceil(vw / G), rows = Math.ceil(vh / G);
    const compA = new Uint8Array(cols * rows), proA = new Uint8Array(cols * rows);
    const paint = (arr, r) => {
        const x0 = Math.max(mr.left, r.left, 0), y0 = Math.max(mr.top, r.top, 0);
        const x1 = Math.min(mr.right, r.right, vw), y1 = Math.min(mr.bottom, r.bottom, vh);
        if (x1 <= x0 || y1 <= y0) return;
        for (let y = Math.floor(y0 / G); y < Math.ceil(y1 / G); y++)
            for (let x = Math.floor(x0 / G); x < Math.ceil(x1 / G); x++) arr[y * cols + x] = 1;
    };
    for (const s of stages) paint(compA, rectOf(s));
    if (variants) for (const it of variants.querySelectorAll(".story-variant-items > *, [role=tablist], [role=group]")) paint(compA, rectOf(it));
    for (const r of pageRuns) if (!(variants && variants.contains(r.el) && r.el.closest(".story-variant-items"))) paint(proA, r.rect);
    let ca = 0, pa = 0;
    for (let i = 0; i < compA.length; i++) { ca += compA[i]; pa += proA[i] && !compA[i] ? 1 : 0; }
    const vpArea = vw * vh;

    // header contrast (every run in the header, against what is behind it)
    const contrast = [];
    if (header && img) {
        for (const r of runs.filter((r) => header.contains(r.el))) {
            const cs = getComputedStyle(r.el);
            const ink = toRGBA(cs.color);
            let op = 1;
            for (let e = r.el; e; e = e.parentElement) op *= parseFloat(getComputedStyle(e).opacity);
            const bg = bgOf({ left: r.rect.left - 2, top: r.rect.top, right: r.rect.right + 2, bottom: r.rect.bottom });
            if (!bg) continue;
            const a = ink[3] * op;
            const inkC = [0, 1, 2].map((i) => ink[i] * a + bg[i] * (1 - a));
            contrast.push({ text: r.text.slice(0, 40), cr: +CR(inkC, bg).toFixed(2) });
        }
        if (variants) for (const lab of variants.querySelectorAll(".story-variant-label")) {
            const rr = rectOf(lab);
            if (rr.bottom > vh || rr.top < 0) continue;
            const ink = toRGBA(getComputedStyle(lab).color);
            const bg = bgOf({ left: rr.left - 2, top: rr.top, right: rr.right + 2, bottom: rr.bottom });
            if (bg) contrast.push({ text: lab.textContent.trim(), cr: +CR(ink, bg).toFixed(2) });
        }
    }

    // docks: corner radii against half the cross size
    const docks = [...document.querySelectorAll(".glass-dock")].map((d) => {
        const plate = d.querySelector(":scope > .dock-plate") || d;
        const r = plate.getBoundingClientRect();
        const cs = getComputedStyle(plate);
        const raw = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map((v) => parseFloat(v));
        const vertical = d.classList.contains("vertical");
        const cross = vertical ? r.width : r.height;
        const eff = raw.map((v) => Math.min(v, Math.min(r.width, r.height) / 2));
        return { testid: d.dataset.testid ?? null, vertical, w: Math.round(r.width), h: Math.round(r.height), radius: eff.map((v) => +v.toFixed(1)), pill: eff.every((e) => e >= cross / 2 - 1), state: d.classList.contains("collapsed") ? "folded" : "open" };
    });

    // banned words in the rendered article text
    const text = article ? article.innerText : "";
    const banned = [];
    const tests = [/\b[A-Z]{1,3}-?\d+\b/g, /#\d+/g, /stage 1/gi, /stage 2/gi, /\bshipped\b/gi, /\bretired\b/gi, /\bstruck\b/gi, /--[a-z]/g, /WebGPU/g, /WebGL/g, /Canvas2D/g, /\bSDF\b/g, /\bshader/gi];
    for (const t of tests) for (const m of text.matchAll(t)) banned.push(m[0]);

    // duplicate headings / paragraphs
    const dup = (sel) => {
        const m = new Map();
        for (const e of main?.querySelectorAll(sel) ?? []) {
            const t = e.textContent.replace(/\s+/g, " ").trim();
            if (t.length >= 3) m.set(t, (m.get(t) || 0) + 1);
        }
        return [...m].filter(([, n]) => n > 1).map(([t]) => t.slice(0, 40));
    };
    const headingEqTitle = [...(main?.querySelectorAll("h2,h3,h4") ?? [])].filter((h) => h.textContent.trim() === title).length;

    // editor
    let editor = null;
    const cfg = main?.querySelector("[data-story-stage=fill] [data-slot=configurator]");
    if (cfg) {
        const st = cfg.querySelector(".configurator-stage");
        const aside = cfg.querySelector(".configurator-aside");
        const gal = cfg.querySelector("[data-gallery-dock]");
        // wide: the editor is the right column (presets over the aside); stacked: the aside
        const stacked = gal && st && rectOf(gal).bottom <= rectOf(st).top + 1;
        const u = (stacked ? [aside] : [aside, gal]).filter(Boolean).map(rectOf);
        const ed = {
            left: Math.min(...u.map((r) => r.left)), top: Math.min(...u.map((r) => r.top)),
            right: Math.max(...u.map((r) => r.right)), bottom: Math.max(...u.map((r) => r.bottom)),
        };
        const rowsEl = [...cfg.querySelectorAll(".story-editor-row")];
        const asideR = aside ? rectOf(aside) : null;
        editor = {
            stage: st ? [Math.round(rectOf(st).width), Math.round(rectOf(st).height)] : null,
            stageShare: st ? +((rectOf(st).width * rectOf(st).height) / vpArea).toFixed(3) : null,
            editor: [Math.round(ed.right - ed.left), Math.round(ed.bottom - ed.top)],
            presetsH: gal ? Math.round(rectOf(gal).height) : null,
            rowMaxH: rowsEl.length ? Math.max(...rowsEl.map((r) => Math.round(rectOf(r).height))) : null,
            rows: rowsEl.length,
            rowsVisible: asideR ? rowsEl.filter((r) => { const q = rectOf(r); return q.height > 0 && q.top >= asideR.top - 1 && q.bottom <= asideR.bottom + 1; }).length : 0,
            descriptions: cfg.querySelectorAll("[data-slot=configurator-row-description], .configurator-row-description").length,
            pageScrolls: main.scrollHeight > main.clientHeight + 1,
            studioShare: +((rectOf(cfg).width * rectOf(cfg).height) / vpArea).toFixed(3),
        };
    }

    // landing (`/` and the section pages)
    let landing = null;
    const cards = [...(main?.querySelectorAll("[data-story-card]") ?? [])];
    if (cards.length) {
        const h1 = header?.querySelector("h1");
        const lp = header?.querySelector("p");
        const tr = h1 ? rectOf(h1) : null, lr = lp ? rectOf(lp) : null;
        landing = {
            cards: cards.length,
            titleShare: tr ? +(tr.height / vh).toFixed(3) : null,
            titleToLede: tr && lr ? Math.round(lr.top - tr.bottom) : null,
            ledeWords: words(lp?.textContent ?? ""),
            cardP: cards.reduce((s, c) => s + c.querySelectorAll("p").length, 0),
            cardImg: cards.reduce((s, c) => s + c.querySelectorAll("img").length, 0),
            cardRadius: [...new Set(cards.map((c) => getComputedStyle(c).borderTopLeftRadius + "/" + getComputedStyle(c).borderBottomRightRadius))],
            withPreview: cards.filter((c) => c.querySelector('[data-card-preview="live"]')).length,
            // every card one size; every specimen whole inside its plate
            cardSizes: [...new Set(cards.map((c) => { const r = rectOf(c); return `${Math.round(r.width)}x${Math.round(r.height)}`; }))],
            specimensClipped: cards.filter((c) => {
                const p = c.querySelector("[data-card-preview]"), sp = c.querySelector("[data-card-specimen]");
                if (!p || !sp) return false;
                const a = rectOf(p), b = rectOf(sp);
                return b.left < a.left - 0.5 || b.right > a.right + 0.5 || b.top < a.top - 0.5 || b.bottom > a.bottom + 0.5;
            }).length,
            firstRowInView: rectOf(cards[0]).bottom <= vh,
            canvases: cards.reduce((s, c) => s + c.querySelectorAll("canvas").length, 0),
        };
    }

    return {
        marked: !!(header && stage),
        title, lede,
        ledeWords: words(lede),
        ledeSentences: lede ? lede.split(/[.!?]+\s+(?=\S)/).length : 0,
        headerH: header ? Math.round(rectOf(header).height) : null,
        wordsBefore, pageWords,
        stages: stages.length,
        stageSize: stage?.dataset.storyStage ?? null,
        stageTop: stageTop == null ? null : Math.round(stageTop),
        stageRect: stage ? [Math.round(rectOf(stage).width), Math.round(rectOf(stage).height)] : null,
        stageShare: stage ? +((Math.min(rectOf(stage).width, vw) * Math.min(rectOf(stage).height, vh)) / vpArea).toFixed(3) : null,
        compShare: +((ca * G * G) / vpArea).toFixed(3),
        proseShare: +((pa * G * G) / vpArea).toFixed(3),
        imgInStage: stages.reduce((s, st) => s + st.querySelectorAll("img").length, 0),
        canvases: document.querySelectorAll("canvas").length,
        variantRows: variants ? variants.querySelectorAll(".story-variant-row").length : 0,
        variantLabels: variants ? [...variants.querySelectorAll(".story-variant-label")].map((l) => l.textContent.trim()) : [],
        variantP: variants ? variants.querySelectorAll("p").length : 0,
        contrast,
        banned,
        dupHeadings: dup("h1,h2,h3,h4"), dupParas: dup("p"), headingEqTitle,
        docks,
        overflowX: main ? main.scrollWidth > main.clientWidth : null,
        screens: main ? +(main.scrollHeight / main.clientHeight).toFixed(2) : null,
        editor, landing,
        overlaps: (() => {
            const vis = runs.filter((r) => r.rect.top < vh && r.rect.bottom > 0);
            const out = [];
            for (let i = 0; i < vis.length; i++) for (let j = i + 1; j < vis.length; j++) {
                const A = vis[i], B = vis[j];
                if (A.el.contains(B.el) || B.el.contains(A.el)) continue;
                const ix = Math.min(A.rect.right, B.rect.right) - Math.max(A.rect.left, B.rect.left);
                const iy = Math.min(A.rect.bottom, B.rect.bottom) - Math.max(A.rect.top, B.rect.top);
                if (ix > 2 && iy > 2) out.push(`${A.text.slice(0, 20)} × ${B.text.slice(0, 20)}`);
            }
            return out;
        })(),
    };
};

// buttons inside their tracks (the Buttons page's own acceptance)
const TRACKS = () => {
    const stage = document.querySelector("[data-story-stage]");
    if (!stage) return null;
    const out = [];
    for (const b of stage.querySelectorAll("button")) {
        const grid = b.parentElement;
        const br = b.getBoundingClientRect();
        const sr = stage.getBoundingClientRect();
        out.push(br.left >= sr.left - 0.5 && br.right <= sr.right + 0.5 && b.scrollWidth <= b.clientWidth + 1);
        void grid;
    }
    return { buttons: out.length, inside: out.filter(Boolean).length };
};

// The face the page title paints. `document.fonts.check` alone is not enough: with
// `font-display: optional` it reads true while a missed face leaves the title in the
// fallback for the page's life, so the platform font is read through CDP as well.
async function titleFace(ctx, page) {
    const sel = (await page.locator("[data-story-title]").count()) ? "[data-story-title]" : "h1";
    const first = await page.evaluate((s) => {
        const t = document.querySelector(s);
        if (!t) return null;
        const fam = getComputedStyle(t).fontFamily.split(",")[0].trim().replace(/^["']|["']$/g, "");
        return { fam, check: document.fonts.check(`${getComputedStyle(t).fontWeight} 16px "${fam}"`) };
    }, sel);
    if (!first) return null;
    const cdp = await ctx.newCDPSession(page);
    try {
        await cdp.send("DOM.enable");
        await cdp.send("CSS.enable");
        const { root } = await cdp.send("DOM.getDocument");
        const { nodeId } = await cdp.send("DOM.querySelector", { nodeId: root.nodeId, selector: sel });
        const { fonts } = await cdp.send("CSS.getPlatformFontsForNode", { nodeId });
        const top = [...fonts].sort((a, b) => b.glyphCount - a.glyphCount)[0];
        return { first: first.fam, check: first.check, painted: top?.familyName ?? null };
    } finally {
        await cdp.detach().catch(() => {});
    }
}

function rowsFor(route, cell, m, errors, extra) {
    const W = cell === "m390";
    const budget = Math.min(60, BUDGET[route] ?? 60);
    const R = [];
    const add = (line, name, pass, value) => R.push({ route, cell, line, name, pass: pass === null ? "n/a" : pass ? "pass" : "FAIL", value });
    add(12, "console", errors.length === 0, errors.length ? errors.slice(0, 3) : 0);
    add(13, "no sideways overflow", !m.overflowX, m.overflowX ? "overflow" : "ok");
    if (extra?.face) {
        const F = extra.face;
        add("F1", "title paints its first loaded face", F.check && F.painted === F.first, `${F.first} check=${F.check} painted=${F.painted}`);
    }
    if (m.landing) {
        const L = m.landing;
        add("L1", "title block ≤ 22% vh", L.titleShare <= 0.22, L.titleShare);
        add("L2", "title ends ≥ 8 px above lede", L.titleToLede >= 8, L.titleToLede);
        add("L3", "lede ≤ 12 words", L.ledeWords <= 12, L.ledeWords);
        add("L4", "no card paragraph", L.cardP === 0, L.cardP);
        add("L5", "no img in cards", L.cardImg === 0, L.cardImg);
        add("L6", "card corners 24 px", L.cardRadius.every((r) => r === "24px/24px"), L.cardRadius.join(" "));
        add("L7", "cards with a live preview", null, `${L.withPreview}/${L.cards}`);
        add("L8", "live canvases in cards ≤ 4", L.canvases <= 4, L.canvases);
        add("L10", "every card one size", L.cardSizes.length === 1, L.cardSizes.join(" "));
        add("L11", "every card specimen whole", L.specimensClipped === 0, L.specimensClipped);
        add("L9", "first row of cards in first screen", W ? null : L.firstRowInView, L.firstRowInView);
    }
    if (!m.marked) return R;
    const editorPage = !!m.editor;
    add(1, "words before stage ≤ 24", m.wordsBefore <= 24, m.wordsBefore);
    add("1b", "lede ≤ 16 words, one sentence", m.ledeWords <= (editorPage ? 12 : 16) && m.ledeSentences <= 1, `${m.ledeWords}w/${m.ledeSentences}s`);
    add(2, `page words ≤ ${editorPage ? 30 : budget}`, m.pageWords <= (editorPage ? 30 : budget), m.pageWords);
    add(3, `stage top ≤ ${W ? 200 : 184}`, m.stageTop <= (W ? 200 : 184), m.stageTop);
    if (m.stageSize === "tall") add(4, "tall stage ≥ 45%", m.stageShare >= 0.45, m.stageShare);
    else if (m.stageSize === "fit") add(4, `fit stage ≥ ${W ? 22 : 24}%`, m.stageShare >= (W ? 0.22 : 0.24), m.stageShare);
    add(5, "live ≥ 4× prose, prose ≤ 8%", m.compShare >= 4 * m.proseShare && m.proseShare <= 0.08, `comp ${m.compShare} prose ${m.proseShare}`);
    add(6, "one stage, no dup heading/para", m.stages === 1 && m.headingEqTitle === 0 && m.dupParas.length === 0, `stages ${m.stages} eqTitle ${m.headingEqTitle} dupP ${m.dupParas.length}`);
    add(7, "no img in stage", m.imgInStage === 0, m.imgInStage);
    add(8, "variant rows ≤ 3, labels ≤ 3 words, no p", m.variantRows <= 3 && m.variantLabels.every((l) => l.split(/\s+/).length <= 3) && m.variantP === 0, `${m.variantRows} [${m.variantLabels.join("|")}]`);
    const minCr = m.contrast.length ? Math.min(...m.contrast.map((c) => c.cr)) : null;
    add(9, "header/label text ≥ 4.5:1", minCr === null ? null : minCr >= 4.5, minCr);
    add(10, "no banned words", m.banned.length === 0, m.banned.slice(0, 5).join(" ") || 0);
    add(11, "every dock a full pill", m.docks.every((d) => d.pill), m.docks.map((d) => `${d.testid ?? "dock"}:${d.state}:${d.w}x${d.h}:r${Math.min(...d.radius)}`).join(" "));
    add(14, `page ≤ ${W ? 3 : 2} screens`, m.screens <= (W ? 3 : 2), m.screens);
    if (editorPage) {
        const E = m.editor;
        add("E1", W ? "stage ≥ 350×296" : "stage ≥ 860×640, ≥ 44%", W ? E.stage[0] >= 350 && E.stage[1] >= 296 : E.stage[0] >= 860 && E.stage[1] >= 640 && E.stageShare >= 0.44, `${E.stage.join("×")} ${E.stageShare}`);
        add("E2", W ? "editor ≥ 350×288" : "editor ≥ 380×640", W ? E.editor[0] >= 350 && E.editor[1] >= 288 : E.editor[0] >= 380 && E.editor[1] >= 640, E.editor.join("×"));
        add("E3", "page does not scroll", !E.pageScrolls, E.pageScrolls ? "scrolls" : "still");
        add("E4", `presets ≤ ${W ? 52 : 64} px`, E.presetsH <= (W ? 52 : 64), E.presetsH);
        add("E5", "row ≤ 48 px, no descriptions", E.rowMaxH <= 48 && E.descriptions === 0, `${E.rowMaxH}px, ${E.descriptions} desc, ${E.rowsVisible}/${E.rows} rows visible`);
        add("E6", "one canvas of the subject", null, `${m.canvases} canvas on page`);
    }
    if (extra?.tracks) add("B1", "every button inside its track", extra.tracks.inside === extra.tracks.buttons, `${extra.tracks.inside}/${extra.tracks.buttons}`);
    if (m.overlaps) add("B2", "no text runs overlap", m.overlaps.length === 0, m.overlaps.slice(0, 3).join("; ") || 0);
    return R;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function run() {
    const browser = await chromium.launch({
        headless: true,
        args: ["--use-angle=metal", "--enable-gpu", "--ignore-gpu-blocklist"],
    });
    const all = [];
    try {
        for (const cellId of CELL_IDS) {
            const C = CELLS[cellId];
            for (const route of ROUTES) {
                const ctx = await browser.newContext({
                    viewport: C.viewport, colorScheme: C.scheme, hasTouch: C.touch, isMobile: C.touch, deviceScaleFactor: 1,
                });
                const errors = [];
                try {
                    await ctx.addInitScript(INIT(C.scheme));
                    const page = await ctx.newPage();
                    page.on("console", (msg) => {
                        if (msg.type() === "error" || msg.type() === "warning") errors.push(`${msg.type()}: ${msg.text().slice(0, 160)}`);
                    });
                    page.on("pageerror", (e) => errors.push(`pageerror: ${String(e.message).slice(0, 160)}`));
                    await page.goto(BASE + route, { waitUntil: "load", timeout: 45000 });
                    await page.waitForSelector("#demo-main", { timeout: 15000 });
                    await sleep(2500);
                    const shot = (await page.screenshot({ type: "png" })).toString("base64");
                    const m = await page.evaluate(MEASURE, { shotB64: shot, vw: C.viewport.width, vh: C.viewport.height });
                    const tracks = route === "/display/buttons" ? await page.evaluate(TRACKS) : null;
                    const face = await titleFace(ctx, page);
                    // open the code disclosure, to load it with its console clean
                    const codeBtn = page.locator("[data-story-code] button").first();
                    if (await codeBtn.count()) {
                        await codeBtn.click();
                        await sleep(600);
                    }
                    const rows = rowsFor(route, cellId, m, errors, { tracks, face });
                    for (const r of rows) {
                        all.push(r);
                        OUT?.write(JSON.stringify(r) + "\n");
                    }
                    OUT?.write(JSON.stringify({ route, cell: cellId, measure: { ...m, contrast: m.contrast.slice(0, 8) } }) + "\n");
                } catch (e) {
                    const r = { route, cell: cellId, line: "run", name: "render", pass: "FAIL", value: String(e?.message ?? e).slice(0, 200) };
                    all.push(r);
                    OUT?.write(JSON.stringify(r) + "\n");
                } finally {
                    await ctx.close().catch(() => {});
                }
            }
        }
    } finally {
        await browser.close().catch(() => {});
        OUT?.end();
    }
    for (const r of all) {
        process.stdout.write(`${r.pass.padEnd(4)} ${r.cell} ${r.route} [${r.line}] ${r.name}: ${typeof r.value === "object" ? JSON.stringify(r.value) : r.value}\n`);
    }
}

await run();
