// The demo-site checker: runs FORM.md's reviewer checklist (page form lines 1-15,
// the editor checklist, the landing checks) on a list of routes in three cells and
// prints one row per route per line, pass or fail with the measured number.
//
// Built from ../../audit/demo-site/tools/probe.mjs. It reads the page's own markers
// (`data-story-header`, `data-story-stage`, `data-story-variants`, `data-story-code`);
// a route without them is an unrebuilt page and gets the render checks only.
//
// Beyond FORM.md's lines: T1 (the lede is not cut) on every route; D1-D4 on the six
// dock routes whose stage carries a context (a Card the dock acts on); the arrival
// step on Dialog, Sheet and Menu (read the surface the page opens, close it with
// Escape, then run the page lines); and the reads for the Fourier notice and the
// small fixes of P14-RULING.md items 3 and 5. `--plant t1` sets a 60-character
// lede, so T1 can be seen to bite.
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
//        [--plant b2,l4,dock]
//
// `--plant` writes a known fault into each page before it is measured, so a line that
// was taught to skip something can be seen still to bite: `b2` two overlapping visible
// runs in the header (beside a clipped pair that must not count), `l4` a blurb paragraph
// in the first card's body, `dock` a square corner on the first dock in a card.
import { chromium, webkit } from "playwright";
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
const PLANTS = (args.plant ?? "").split(",").filter(Boolean);
// P14: `--nogpu 1` removes navigator.gpu before any page script runs (item 3's
// renderer-missing witness); `--engine webkit` runs Playwright WebKit (headless, no
// flags) for the same witness, under `guarded --exclusive webkit`.
const NOGPU = args.nogpu === "1";
const ENGINE = args.engine ?? "chromium";
const NOGPU_INIT = `try { delete Navigator.prototype.gpu; } catch {}`;

// ---------- planted faults (see the usage note) ----------
const PLANT = (plants) => {
    const header = document.querySelector("#demo-main [data-story-header]");
    if (plants.includes("b2") && header) {
        const box = document.createElement("div");
        box.style.cssText = "position:relative;block-size:2.5rem";
        box.innerHTML =
            '<span style="position:absolute;inset:0 auto auto 0">Planted overlap one</span>' +
            '<span style="position:absolute;inset:4px auto auto 4px">Planted overlap two</span>' +
            // a clipped pair: the line must not count these
            '<div style="position:absolute;inset:0;overflow:hidden;block-size:0">' +
            '<span style="position:absolute;inset:0 auto auto 0">Hidden pair one</span>' +
            '<span style="position:absolute;inset:4px auto auto 4px">Hidden pair two</span></div>';
        header.append(box);
    }
    const card = document.querySelector("#demo-main [data-story-card]");
    if (plants.includes("l4") && card) {
        const p = document.createElement("p");
        p.textContent = "A planted blurb under the card title.";
        card.append(p);
    }
    if (plants.includes("t1")) {
        const lede = document.querySelector("#demo-main p.story-header-lede");
        if (lede) lede.textContent = "A planted lede of sixty characters that does not fit a line.";
    }
    if (plants.includes("dock")) {
        const plate = document.querySelector("#demo-main [data-story-card] .glass-dock > .dock-plate");
        if (plate) plate.style.setProperty("border-radius", "4px", "important");
    }
};

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

    // A run's visible box: its text box cut by every ancestor that clips (overflow other
    // than visible: a closed disclosure, a scroll port, an sr-only box), up to `main`,
    // whose own scroll is the page's. Text whose visible box is empty is not on screen.
    const clipped = (el, r) => {
        let { left: l, top: t, right: rt, bottom: b } = r;
        for (let e = el; e && e !== main && e !== document.documentElement; e = e.parentElement) {
            const cs = getComputedStyle(e);
            const clipsX = cs.overflowX !== "visible", clipsY = cs.overflowY !== "visible";
            if (!clipsX && !clipsY && cs.clipPath === "none" && cs.clip === "auto") continue;
            const q = e.getBoundingClientRect();
            if (clipsX || cs.clip !== "auto") { l = Math.max(l, q.left); rt = Math.min(rt, q.right); }
            if (clipsY || cs.clip !== "auto") { t = Math.max(t, q.top); b = Math.min(b, q.bottom); }
            if (cs.clip !== "auto" && /rect\(0(px)?,? 0(px)?,? 0(px)?,? 0(px)?\)/.test(cs.clip)) return null;
            if (rt - l < 2 || b - t < 2) return null;
        }
        return { left: l, top: t, right: rt, bottom: b };
    };
    // Ink that paints nothing (a reserve copy sized for layout) is not visible text.
    const inkless = (el) => {
        const cs = getComputedStyle(el);
        return toRGBA(cs.color)[3] === 0 || toRGBA(cs.webkitTextFillColor || cs.color)[3] === 0;
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
            const vis = clipped(el, { left: l, top: t, right: r, bottom: b });
            if (!vis || inkless(el)) continue;
            runs.push({ el, rect: vis, text: text.replace(/\s+/g, " ").trim() });
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
        // layout pixels, not client ones: a card scales its specimen, and the radius
        // the style reports is in the unscaled box
        const r = { width: plate.offsetWidth, height: plate.offsetHeight };
        const cs = getComputedStyle(plate);
        const raw = [cs.borderTopLeftRadius, cs.borderTopRightRadius, cs.borderBottomRightRadius, cs.borderBottomLeftRadius].map((v) => parseFloat(v));
        const vertical = d.classList.contains("vertical");
        const cross = vertical ? r.width : r.height;
        const eff = raw.map((v) => Math.min(v, Math.min(r.width, r.height) / 2));
        const where = d.closest("[data-story-card]") ? "card" : d.closest("[data-story-stage]") ? "stage" : "shell";
        return { testid: d.dataset.testid ?? null, where, vertical, w: Math.round(r.width), h: Math.round(r.height), radius: eff.map((v) => +v.toFixed(1)), pill: eff.every((e) => e >= cross / 2 - 1), state: d.classList.contains("collapsed") ? "folded" : "open" };
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
            // A card is the preview, then the title (FORM.md section 3). A blurb is any
            // paragraph or word in the card outside its preview; a component inside the
            // preview keeps its own paragraphs (a Card's description, a live region).
            cardP: cards.reduce((s, c) => {
                const pv = c.querySelector("[data-card-preview]");
                const ps = [...c.querySelectorAll("p")].filter((p) => !pv?.contains(p)).length;
                const body = [...c.childNodes].filter((n) => n !== pv).map((n) => n.textContent).join(" ");
                const title = c.querySelector("[data-route-label]")?.textContent ?? "";
                return s + ps + Math.max(0, words(body) - words(title));
            }, 0),
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

    // a component page's lede, or a landing's (the hero's)
    const ledeP = main?.querySelector("p.story-header-lede, p.story-hero-lede") ?? null;
    return {
        ledeFits: ledeP ? ledeP.scrollWidth <= ledeP.clientWidth : null,
        ledeScroll: ledeP ? [ledeP.scrollWidth, ledeP.clientWidth] : null,
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
        canvasOwners: (() => {
            const o = { shell: 0, stage: 0, card: 0, other: 0 };
            for (const c of document.querySelectorAll("canvas")) {
                if (c.closest(".shell-aurora")) o.shell++;
                else if (c.closest("[data-story-card]")) o.card++;
                else if (c.closest("[data-story-stage]")) o.stage++;
                else o.other++;
            }
            return o;
        })(),
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

// ---------- P14: the ruling's added lines ----------
const ARRIVAL_ROUTES = ["/containers/dialog", "/containers/sheet", "/containers/dropdown-menu"];
const DOCK_ROUTES = {
    "/dock/nav": "tab",
    "/dock/rail": "section",
    "/dock/chrome": null,
    "/dock/transport": "play",
    "/dock/pager": "next",
    "/dock/corner-controls": "shuffle",
};

// The open surfaces on the page (outside landing cards and the shell's docks).
const OPEN_SURFACES = () => {
    const vis = (e) => {
        const r = e.getBoundingClientRect();
        return r.width > 8 && r.height > 8 && !e.closest("[data-story-card]");
    };
    const stage = document.querySelector("#demo-main [data-story-stage]");
    const sr = stage?.getBoundingClientRect() ?? null;
    const dialogs = [...document.querySelectorAll('[role="dialog"][data-state="open"], [role="alertdialog"][data-state="open"]')].filter(vis);
    const menus = [...document.querySelectorAll('[role="menu"]')].filter(vis).filter((e) => !e.closest(".demo-sidebar-rail") && !e.closest(".demo-bottom-dock"));
    const inStage = (e) => {
        if (!sr) return false;
        const r = e.getBoundingClientRect();
        return r.left >= sr.left - 0.5 && r.right <= sr.right + 0.5 && r.top >= sr.top - 0.5 && r.bottom <= sr.bottom + 0.5;
    };
    const a = document.activeElement;
    const trigger = stage?.querySelector("button") ?? null;
    return {
        dialogs: dialogs.length,
        menus: menus.length,
        menuInStage: menus.length ? menus.every(inStage) : null,
        menuRect: menus[0] ? (({ top, bottom, left, right }) => ({ top: Math.round(top), bottom: Math.round(bottom), left: Math.round(left), right: Math.round(right) }))(menus[0].getBoundingClientRect()) : null,
        stageRect: sr ? { top: Math.round(sr.top), bottom: Math.round(sr.bottom) } : null,
        focusInSurface: [...dialogs, ...menus].some((e) => e.contains(a)),
        focusOnTrigger: !!trigger && a === trigger,
        active: a ? `${a.tagName.toLowerCase()}${a.textContent ? ` "${a.textContent.trim().slice(0, 20)}"` : ""}` : null,
    };
};

// Arrival: read the surface the page opened, close it with Escape, read again.
async function arrive(page) {
    const at = await page.evaluate(OPEN_SURFACES);
    await page.keyboard.press("Escape");
    await sleep(900);
    const after = await page.evaluate(OPEN_SURFACES);
    return { at, after };
}

// In-page reads for D1, D4 and items 3 and 5. Pixels come from the page screenshot.
const P14READ = async ({ shotB64, route }) => {
    const bin = Uint8Array.from(atob(shotB64), (c) => c.charCodeAt(0));
    const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
    const cv = new OffscreenCanvas(bmp.width, bmp.height);
    const cx = cv.getContext("2d", { willReadFrequently: true });
    cx.drawImage(bmp, 0, 0);
    const img = cx.getImageData(0, 0, bmp.width, bmp.height);
    const px = (x, y) => {
        const i = (Math.round(y) * img.width + Math.round(x)) * 4;
        return [img.data[i], img.data[i + 1], img.data[i + 2]];
    };
    const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
    const CR = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const bgOf = (r) => {
        const bins = new Map();
        for (let y = Math.max(0, r.top | 0); y < Math.min(img.height, Math.ceil(r.bottom)); y++)
            for (let x = Math.max(0, (r.left | 0) - 2); x < Math.min(img.width, Math.ceil(r.right) + 2); x++) {
                const i = (y * img.width + x) * 4, k = (img.data[i] >> 4) * 256 + (img.data[i + 1] >> 4) * 16 + (img.data[i + 2] >> 4);
                const b = bins.get(k) || [0, 0, 0, 0]; b[0] += img.data[i]; b[1] += img.data[i + 1]; b[2] += img.data[i + 2]; b[3]++; bins.set(k, b);
            }
        let best = null; for (const b of bins.values()) if (!best || b[3] > best[3]) best = b;
        return best ? [best[0] / best[3], best[1] / best[3], best[2] / best[3]] : null;
    };
    // A run's ink from the pixels: the glyph pixel furthest from its own background.
    const inkCr = (el) => {
        const rg = document.createRange(); rg.selectNodeContents(el);
        const q = rg.getBoundingClientRect();
        if (q.width < 2 || q.height < 2) return null;
        const b = bgOf(q); if (!b) return null;
        let best = 1;
        for (let y = Math.max(0, q.top | 0); y < Math.min(img.height, Math.ceil(q.bottom)); y++)
            for (let x = Math.max(0, q.left | 0); x < Math.min(img.width, Math.ceil(q.right)); x++) {
                const i = (y * img.width + x) * 4;
                best = Math.max(best, CR([img.data[i], img.data[i + 1], img.data[i + 2]], b));
            }
        return +best.toFixed(2);
    };
    const visible = (e) => {
        const r = e.getBoundingClientRect();
        return r.width > 1 && r.height > 1 && e.checkVisibility({ opacityProperty: true, visibilityProperty: true });
    };
    const main = document.querySelector("#demo-main");
    const stage = main?.querySelector("[data-story-stage]");
    const out = {};

    // D1 and D4: the dock's context
    const ctxs = [...(main?.querySelectorAll(".scene-context") ?? [])].filter((c) => !c.closest("[data-story-card]"));
    if (ctxs.length) {
        out.d1 = ctxs.map((c) => {
            const card = c.querySelector('[data-slot="card"]');
            let texts = 0;
            if (card) {
                const tw = document.createTreeWalker(card, NodeFilter.SHOW_TEXT);
                for (let n = tw.nextNode(); n; n = tw.nextNode()) if (/[\p{L}\p{N}]/u.test(n.data) && visible(n.parentElement)) texts++;
            }
            const imgs = card ? [...card.querySelectorAll('[role="img"]')].filter(visible).length : 0;
            return { card: !!card, texts, imgs };
        });
        out.d4 = [...ctxs[0].querySelectorAll('[data-slot="card-title"]')].filter(visible).map((t) => ({ text: t.textContent.trim(), cr: inkCr(t) }));
    }

    if (route === "/data/metric") {
        const row = [...main.querySelectorAll(".story-variant-row")].find((r) => r.querySelector(".story-variant-label")?.textContent.trim() === "Layouts");
        const items = row?.querySelector(".story-variant-items");
        const kids = items ? [...items.children] : [];
        const tops = kids.map((k) => Math.round(k.getBoundingClientRect().top * 10) / 10);
        const rowH = row ? row.getBoundingClientRect().height : 0;
        const tallest = Math.max(...kids.map((k) => k.getBoundingClientRect().height), 0);
        out.metric = {
            children: kids.length,
            tops,
            topsSpread: tops.length ? +(Math.max(...tops) - Math.min(...tops)).toFixed(1) : null,
            rowH: Math.round(rowH), tallest: Math.round(tallest),
            ledgerW: kids[1] ? Math.round(kids[1].getBoundingClientRect().width) : null,
            stageDash: (stage?.innerText ?? "").includes("—"),
        };
    }
    if (route === "/foundations/paper-glass") {
        const article = main.querySelector("article");
        out.paper = {
            rows: main.querySelectorAll("[data-story-variants] .story-variant-row").length,
            labels: [...main.querySelectorAll("[data-story-variants] .story-variant-label")].map((l) => l.textContent.trim()),
            docksInArticle: article ? article.querySelectorAll(".glass-dock").length : null,
        };
    }
    if (route === "/foundations/radii") {
        out.radii = [...main.querySelectorAll(".radii-plate")].map((t) => {
            const r = t.getBoundingClientRect();
            const c = px(r.left + r.width / 2, r.top + r.height / 2);
            const beside = px(r.left - 8, r.top + r.height / 2);
            return { w: Math.round(r.width), centre: c, beside, cr: +CR(c, beside).toFixed(2) };
        });
    }
    if (route === "/data/table") {
        const sr = stage.getBoundingClientRect();
        const inside = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return r.top >= sr.top - 0.5 && r.bottom <= sr.bottom + 0.5 && r.left >= sr.left - 0.5 && r.right <= sr.right + 0.5; };
        const rows = stage.querySelectorAll("tbody tr");
        out.table = { caption: inside(stage.querySelector("caption")), total: inside(rows[rows.length - 1]), totalText: rows[rows.length - 1]?.innerText.replace(/\s+/g, " ").trim() ?? null };
    }
    if (route === "/display/buttons") {
        const rows = [...main.querySelectorAll("[data-story-variants] .story-variant-row")];
        const by = (l) => rows.find((r) => r.querySelector(".story-variant-label")?.textContent.trim() === l);
        const states = by("States"), icons = by("Icon only");
        out.buttons = {
            rows: rows.length,
            states: states ? states.querySelectorAll(".story-variant-items > button, .story-variant-items > *").length : null,
            icons: icons ? icons.querySelectorAll(".story-variant-items > *").length : null,
            iconLabels: icons ? [...icons.querySelectorAll(".story-variant-items > *")].map((b) => b.getAttribute("aria-label")) : null,
            iconEmphases: icons ? [...icons.querySelectorAll(".story-variant-items > *")].map((b) => b.dataset.emphasis ?? null) : null,
        };
    }
    if (route === "/substrates/fourier-field" || route === "/substrates" || route === "/") {
        // the Fourier notice only (other cards carry live regions of their own)
        const statuses = [...document.querySelectorAll('#demo-main .fourier-notice[role="status"]')].filter((s) => s.closest("[data-story-stage]") || s.closest("[data-story-card]"));
        out.fourier = {
            statuses: statuses.map((s) => ({ text: s.textContent.trim(), where: s.closest("[data-story-card]") ? "card" : "stage", cr: inkCr(s) })),
            pause: document.querySelectorAll('#demo-main [data-story-stage] .substrate-pause').length,
        };
    }
    if (route === "/containers") {
        const open = [...document.querySelectorAll('[role="dialog"][data-state="open"], [role="menu"], [role="alertdialog"]')].filter((e) => {
            const r = e.getBoundingClientRect();
            return r.width > 8 && r.height > 8 && !e.closest(".demo-sidebar-rail") && !e.closest(".demo-bottom-dock");
        });
        out.containersOpen = open.length;
    }
    return out;
};

// D3: the context's rect at rest, with the dock opened by hover, folded by a press
// elsewhere, and with the dock's element set to display: none.
async function independence(page) {
    const read = () => page.evaluate(() => {
        const c = document.querySelector("#demo-main [data-story-stage] .scene-context");
        const card = c?.querySelector('[data-slot="card"]');
        const dock = document.querySelector("#demo-main [data-story-stage] .scene-dock .glass-dock");
        const R = (e) => { if (!e) return null; const r = e.getBoundingClientRect(); return [r.left, r.top, r.width, r.height].map((v) => Math.round(v)).join(","); };
        return { ctx: R(c), card: R(card), dock: dock ? (dock.classList.contains("collapsed") ? "folded" : "open") : null, dockBox: R(dock) };
    });
    const states = [];
    states.push({ step: "rest", ...(await read()) });
    const box = await page.locator("#demo-main [data-story-stage] .scene-dock .glass-dock").first().boundingBox();
    if (box) {
        await page.mouse.move(box.x + box.width / 2, box.y + box.height / 2);
        await sleep(1200);
        states.push({ step: "hover", ...(await read()) });
    }
    // a press outside the dock (the page title) folds a dock that starts open
    const h1 = await page.locator("#demo-main [data-story-header] h1").first().boundingBox();
    if (h1) {
        await page.mouse.move(h1.x + 4, h1.y + 4);
        await page.mouse.down();
        await page.mouse.up();
        await sleep(1400);
        states.push({ step: "press-out", ...(await read()) });
    }
    await page.evaluate(() => {
        const dock = document.querySelector("#demo-main [data-story-stage] .scene-dock .glass-dock");
        if (dock) dock.style.setProperty("display", "none", "important");
    });
    await sleep(300);
    states.push({ step: "display-none", ...(await read()) });
    await page.evaluate(() => {
        const dock = document.querySelector("#demo-main [data-story-stage] .scene-dock .glass-dock");
        if (dock) dock.style.removeProperty("display");
    });
    await sleep(600);
    const ctxSet = new Set(states.map((s) => s.ctx)), cardSet = new Set(states.map((s) => s.card));
    return { equal: ctxSet.size === 1 && cardSet.size === 1, folds: [...new Set(states.map((s) => s.dock))], states };
}

// D2: the dock answers. A recorder samples the context every frame through one press.
const CONTEXT_REC = () => {
    const read = () => {
        const c = document.querySelector("#demo-main [data-story-stage] .scene-context");
        const t = c?.querySelector('[data-slot="card-title"]');
        const slide = c?.querySelector(".pager-slide > span");
        const bars = [...(c?.querySelectorAll(".mini-bar") ?? [])];
        const head = c?.querySelector(".mini-playhead");
        return {
            text: (c?.innerText ?? "").replace(/\s+/g, " ").trim(),
            titleOp: t ? parseFloat(getComputedStyle(t).opacity) : null,
            slideOp: slide ? parseFloat(getComputedStyle(slide).opacity) : null,
            bars: bars.map((b) => +b.getBoundingClientRect().height.toFixed(2)),
            barOps: bars.map((b) => +parseFloat(getComputedStyle(b).opacity).toFixed(3)),
            head: head ? +head.getBoundingClientRect().left.toFixed(2) : null,
        };
    };
    window.__p14 = { read, samples: [], on: false };
    window.__p14.start = () => {
        window.__p14.samples = []; window.__p14.on = true;
        const tick = () => { if (!window.__p14.on) return; window.__p14.samples.push(read()); requestAnimationFrame(tick); };
        requestAnimationFrame(tick);
    };
    window.__p14.stop = () => { window.__p14.on = false; return window.__p14.samples; };
};

function legsOf(series) {
    const out = [];
    let i = 0;
    while (i < series.length - 1) {
        while (i < series.length - 1 && Math.abs(series[i + 1] - series[i]) < 1e-4) i++;
        if (i >= series.length - 1) break;
        const dir = Math.sign(series[i + 1] - series[i]);
        let j = i + 1;
        while (j < series.length - 1) {
            const d = series[j + 1] - series[j];
            if (Math.abs(d) < 1e-4) {
                let k = j + 1;
                while (k < series.length - 1 && Math.abs(series[k + 1] - series[k]) < 1e-4) k++;
                if (k < series.length - 1 && Math.sign(series[k + 1] - series[k]) === dir) { j = k; continue; }
                break;
            }
            if (Math.sign(d) !== dir) break;
            j++;
        }
        const travel = Math.abs(series[j] - series[i]);
        let maxStep = 0;
        for (let k = i; k < j; k++) maxStep = Math.max(maxStep, Math.abs(series[k + 1] - series[k]));
        out.push({ frames: j - i, travel: +travel.toFixed(3), step: travel ? +(maxStep / travel).toFixed(3) : 0 });
        i = j;
    }
    return out;
}

async function answers(page, route, cellId) {
    await page.evaluate(CONTEXT_REC);
    const before = await page.evaluate(() => window.__p14.read());
    const dock = page.locator("#demo-main [data-story-stage] .scene-dock");
    const kind = DOCK_ROUTES[route];
    if (!kind) return null;
    const ms = kind === "play" ? 2600 : 1400;
    let acted = null;
    await page.evaluate(() => window.__p14.start());
    try {
        if (kind === "tab") {
            const tab = dock.getByRole("button", { name: "People", exact: true });
            if (await tab.count()) { await tab.first().click({ timeout: 4000 }); acted = "People"; }
            else {
                await dock.getByRole("combobox", { name: "Pages" }).or(dock.locator('[aria-label="Pages"]')).first().click({ timeout: 4000 });
                await sleep(500);
                await page.getByRole("menuitemradio", { name: "People" }).first().click({ timeout: 4000 });
                acted = "People (menu)";
            }
        } else if (kind === "section") {
            const seat = dock.locator('[aria-label="Schools"]').first();
            try { await seat.click({ timeout: 2500 }); }
            catch {
                const box = await dock.locator(".glass-dock").first().boundingBox();
                if (box) await page.mouse.move(box.x + box.width / 2, box.y + 20);
                await sleep(900);
                if (!(await seat.isVisible())) await dock.locator('[aria-label="Open sections"]').first().click({ timeout: 2500 }).catch(() => {});
                await sleep(700);
                await seat.click({ timeout: 4000 });
            }
            acted = "Schools";
        } else if (kind === "next") {
            await dock.locator('[aria-label="Next page"]').first().click({ timeout: 4000 });
            acted = "Next";
        } else if (kind === "play") {
            await dock.locator('[aria-label="Play"]').first().click({ timeout: 4000 });
            acted = "Play, 2 s";
        } else if (kind === "shuffle") {
            await dock.getByRole("button", { name: "Shuffle" }).first().click({ timeout: 4000 });
            acted = "Shuffle";
        }
    } catch (e) {
        acted = `missed: ${String(e.message).split("\n")[0].slice(0, 120)}`;
    }
    await sleep(ms);
    const samples = await page.evaluate(() => window.__p14.stop());
    const after = await page.evaluate(() => window.__p14.read());
    if (kind === "play") {
        // stop the run so the page settles
        await dock.locator('[aria-label="Pause"]').first().click({ timeout: 2000 }).catch(() => {});
    }
    const changed = before.text !== after.text || JSON.stringify(before.bars) !== JSON.stringify(after.bars) || JSON.stringify(before.barOps) !== JSON.stringify(after.barOps) || before.head !== after.head;
    // grade every series that moved: the title's and the slide's opacity, each bar's
    // height and opacity, the playhead
    const series = {};
    const pushS = (k, v) => { if (v == null) return; (series[k] ??= []).push(v); };
    for (const s of samples) {
        pushS("titleOp", s.titleOp); pushS("slideOp", s.slideOp); pushS("head", s.head);
        s.bars.forEach((h, i) => pushS(`bar${i}`, h));
        s.barOps.forEach((o, i) => pushS(`barOp${i}`, o));
    }
    const graded = [];
    for (const [k, v] of Object.entries(series)) {
        const min = /Op/.test(k) ? 0.05 : 2;
        for (const l of legsOf(v)) if (l.travel >= min) graded.push({ series: k, ...l });
    }
    const tweened = graded.length > 0 && graded.every((l) => l.frames >= 2 && l.step <= 0.4);
    return { acted, changed, tweened, legs: graded.length, worst: graded.sort((a, b) => b.step - a.step).slice(0, 3), frames: samples.length, before: before.text.slice(0, 40), after: after.text.slice(0, 40) };
}

function p14Rows(add, route, cell, m, p) {
    add("T1", "lede not cut", m.ledeFits, m.ledeScroll ? m.ledeScroll.join("/") : "no lede");
    if (!p) return;
    if (p.arrival) {
        const A = p.arrival.at, B = p.arrival.after;
        const menu = route === "/containers/dropdown-menu";
        add("A1", menu ? "arrival: one menu inside the stage, focus outside it" : "arrival: one open dialog",
            menu ? A.menus === 1 && A.menuInStage === true && !A.focusInSurface : A.dialogs === 1,
            menu ? `menus ${A.menus} inStage ${A.menuInStage} menu ${JSON.stringify(A.menuRect)} stage ${JSON.stringify(A.stageRect)} focus ${A.active}` : `dialogs ${A.dialogs} focusIn ${A.focusInSurface}`);
        add("A2", "after Escape: none open, focus on the trigger", B.dialogs === 0 && B.menus === 0 && B.focusOnTrigger, `dialogs ${B.dialogs} menus ${B.menus} focus ${B.active}`);
    }
    const r = p.read ?? {};
    if (r.d1) add("D1", "the context holds a Card with text or a figure", r.d1.length >= 1 && r.d1.every((c) => c.card && (c.texts > 0 || c.imgs > 0)), JSON.stringify(r.d1));
    if (r.d4) add("D4", "context title ≥ 4.5:1 (pixels)", r.d4.length ? r.d4.every((t) => t.cr >= 4.5) : null, r.d4.length ? r.d4.map((t) => `${t.text} ${t.cr}`).join("; ") : "no title");
    if (p.d2) add("D2", "the dock answers: the context changes, tweened", p.d2.changed && p.d2.tweened, `${p.d2.acted}; changed ${p.d2.changed}; legs ${p.d2.legs}; worst ${JSON.stringify(p.d2.worst)}; ${p.d2.before} → ${p.d2.after}`);
    if (p.d3) add("D3", "context rect fixed across dock states", p.d3.equal, `${p.d3.folds.join("/")} ${p.d3.states.map((s) => `${s.step}:${s.card}`).join(" ")}`);
    if (r.metric) {
        const M = r.metric;
        add("5a", "Layouts: two children, one top, one line", cell === "m390" ? null : M.children === 2 && M.topsSpread <= 1 && M.rowH <= M.tallest + 1, `tops ${M.tops.join("/")} rowH ${M.rowH} tallest ${M.tallest} ledger ${M.ledgerW}px`);
        add("5b", "stage holds no dash", !M.stageDash, M.stageDash ? "dash" : "none");
    }
    if (r.paper) add("5c", "two variant rows, no dock in the article", r.paper.rows === 2 && r.paper.docksInArticle === 0, `${r.paper.rows} [${r.paper.labels.join("|")}] docks ${r.paper.docksInArticle} words ${m.pageWords}`);
    if (r.radii) add("5d", "each tile ≥ 3:1 against the plate", r.radii.length === 7 && r.radii.every((t) => t.cr >= 3), r.radii.map((t) => t.cr).join(" "));
    if (r.table) add("5f", "caption and total row inside the stage", r.table.caption === true && r.table.total === true, `caption ${r.table.caption} total ${r.table.total} (${r.table.totalText})`);
    if (r.buttons) {
        const B = r.buttons;
        add("5h", "States 3, Icon only 3 labelled, 3 rows", B.rows === 3 && B.states === 3 && B.icons === 3 && B.iconLabels.every(Boolean), `rows ${B.rows} states ${B.states} icons ${B.icons} [${B.iconEmphases?.join("|")}] labels ${B.iconLabels?.every(Boolean)}`);
    }
    if (r.fourier && p.gpu) add("3", "GPU lane: no notice; pause shown on the page", r.fourier.statuses.length === 0 && (route !== "/substrates/fourier-field" || r.fourier.pause === 1), `notices ${r.fourier.statuses.length} pause ${r.fourier.pause}`);
    if (r.fourier && !p.gpu && route !== "/") {
        const SENT = "This browser cannot draw the Fourier field.";
        const where = route === "/substrates" ? "card" : "stage";
        const mine = r.fourier.statuses.filter((x) => x.where === where);
        add("3", `no GPU: one notice in the ${where}, ≥ 4.5:1, no pause`, mine.length === 1 && mine[0].text === SENT && (mine[0].cr === null || mine[0].cr >= 4.5) && r.fourier.pause === 0, `${mine.map((x) => `"${x.text}" ${x.cr ?? "below the first screen, ink not read"}`).join("; ") || "none"} pause ${r.fourier.pause}`);
    }
    if (r.containersOpen != null) add("2.4", "cards mount no open surface", r.containersOpen === 0, r.containersOpen);
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
    const dockRow = () => add(11, "every dock a full pill", m.docks.every((d) => d.pill), m.docks.map((d) => `${d.where}:${d.testid ?? "dock"}:${d.state}:${d.w}x${d.h}:r${Math.min(...d.radius)}`).join(" "));
    const C = m.canvasOwners;
    const canvasLine = m.landing
        ? (C.card > 0 ? C.shell === 0 && C.stage + C.other === 0 : C.shell + C.stage + C.other === 1)
        : C.shell + C.stage + C.other + C.card === 1;
    add("C1", m.landing ? "one live field; shell static where cards draw" : "exactly one live canvas", canvasLine, `shell ${C.shell} stage ${C.stage} card ${C.card} other ${C.other}`);
    if (!m.marked) {
        dockRow();
        p14Rows(add, route, cell, m, extra?.p14);
        return R;
    }
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
    dockRow();
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
    p14Rows(add, route, cell, m, extra?.p14);
    return R;
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

export async function run() {
    const browser = ENGINE === "webkit"
        ? await webkit.launch({ headless: true })
        : await chromium.launch({
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
                    if (NOGPU) await ctx.addInitScript(NOGPU_INIT);
                    const page = await ctx.newPage();
                    page.on("console", (msg) => {
                        if (msg.type() === "error" || msg.type() === "warning") errors.push(`${msg.type()}: ${msg.text().slice(0, 160)}`);
                    });
                    page.on("pageerror", (e) => errors.push(`pageerror: ${String(e.message).slice(0, 160)}`));
                    await page.goto(BASE + route, { waitUntil: "load", timeout: 45000 });
                    await page.waitForSelector("#demo-main", { timeout: 15000 });
                    await sleep(2500);
                    const p14 = {};
                    if (ARRIVAL_ROUTES.includes(route)) p14.arrival = await arrive(page);
                    if (PLANTS.length) await page.evaluate(PLANT, PLANTS);
                    const shot = (await page.screenshot({ type: "png" })).toString("base64");
                    const m = await page.evaluate(MEASURE, { shotB64: shot, vw: C.viewport.width, vh: C.viewport.height });
                    const tracks = route === "/display/buttons" ? await page.evaluate(TRACKS) : null;
                    const face = ENGINE === "webkit" ? null : await titleFace(ctx, page);
                    p14.read = await page.evaluate(P14READ, { shotB64: shot, route });
                    p14.gpu = await page.evaluate(() => "gpu" in navigator && !!navigator.gpu);
                    // open the code disclosure, to load it with its console clean
                    const codeBtn = page.locator("[data-story-code] button").first();
                    if (await codeBtn.count()) {
                        await codeBtn.click();
                        await sleep(600);
                    }
                    if (route in DOCK_ROUTES) {
                        p14.d3 = await independence(page);
                        p14.d2 = await answers(page, route, cellId);
                    }
                    const rows = rowsFor(route, cellId, m, errors, { tracks, face, p14 });
                    for (const r of rows) {
                        all.push(r);
                        OUT?.write(JSON.stringify(r) + "\n");
                    }
                    OUT?.write(JSON.stringify({ route, cell: cellId, measure: { ...m, contrast: m.contrast.slice(0, 8) }, p14 }) + "\n");
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
