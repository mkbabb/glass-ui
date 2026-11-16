// ink.mjs <port> <tag> [--engine chromium|webkit] [--pages a,b] [--shots dir]: MEASURE-6, G-15 (RU-44). P3's
// instrument (bl/demo-dock .p3/probe.mjs, INK, copied unchanged): every word and glyph in the stage's
// docks against what is painted behind it (the modal colour of its box, 3 px out, in a screenshot),
// words 4.5:1, glyphs 3:1. On the ten compositions (?c=dock-comp), folded and open (each dock opened in
// turn by hover, by press when hover does not open it, and read alone), dark and light, over the
// stage's field and a flat ground, at 1440. One browser, a context per cell, closed in finally.
// Log: logs/m6-ink-<tag>.<engine>.json.
import { createRequire } from "node:module";
import { writeFileSync, mkdirSync } from "node:fs";
const require = createRequire("/Users/mkbabb/Programming/glass-ui/package.json");
const pw = require("playwright");
const a = process.argv.slice(2);
const val = (k, d) => (a.includes(k) ? a[a.indexOf(k) + 1] : d);
const [port, tag] = a;
const engine = val("--engine", "chromium");
const PAGES = (val("--pages", "") || "nav,chrome,rail,figure-tools,dials,canvas-tools,transport,pager,corner-controls,action-row").split(",");
const SHOTS = val("--shots", null);
// --css <file.css>: a stylesheet added to every page (unlayered, so it wins over the library's layers): a token
// state read without a build (RU-44's steps), labelled by --label.
const CSS = val("--css", null) ? (await import("node:fs")).readFileSync(val("--css"), "utf8") : "";
const LABEL = val("--label", "build");
const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
// in-page: ink of every text run and icon in the stage's docks against what is behind it
const INK = async ({ shotB64 }) => {
    const bin = Uint8Array.from(atob(shotB64), (c) => c.charCodeAt(0));
    const bmp = await createImageBitmap(new Blob([bin], { type: "image/png" }));
    const c2 = new OffscreenCanvas(bmp.width, bmp.height);
    const x2 = c2.getContext("2d", { willReadFrequently: true });
    x2.drawImage(bmp, 0, 0);
    const img = x2.getImageData(0, 0, bmp.width, bmp.height);
    const oc = new OffscreenCanvas(1, 1).getContext("2d", { willReadFrequently: true });
    const rgba = (css) => { oc.clearRect(0, 0, 1, 1); oc.fillStyle = "#000"; oc.fillStyle = css; oc.fillRect(0, 0, 1, 1); const d = oc.getImageData(0, 0, 1, 1).data; return [d[0], d[1], d[2], d[3] / 255]; };
    const lin = (c) => ((c /= 255) <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
    const L = (p) => 0.2126 * lin(p[0]) + 0.7152 * lin(p[1]) + 0.0722 * lin(p[2]);
    const CR = (a, b) => { const x = L(a), y = L(b); return (Math.max(x, y) + 0.05) / (Math.min(x, y) + 0.05); };
    const px = (x, y) => { const i = (y * img.width + x) * 4; return [img.data[i], img.data[i + 1], img.data[i + 2]]; };
    const bgOf = (r) => {
        const x0 = Math.max(0, Math.floor(r.left)), y0 = Math.max(0, Math.floor(r.top));
        const x1 = Math.min(img.width - 1, Math.ceil(r.right)), y1 = Math.min(img.height - 1, Math.ceil(r.bottom));
        if (x1 <= x0 || y1 <= y0) return null;
        const bins = new Map();
        for (let y = y0; y <= y1; y++) for (let x = x0; x <= x1; x++) {
            const p = px(x, y); const k = (p[0] >> 4) * 256 + (p[1] >> 4) * 16 + (p[2] >> 4);
            const b = bins.get(k) || [0, 0, 0, 0]; b[0] += p[0]; b[1] += p[1]; b[2] += p[2]; b[3]++; bins.set(k, b);
        }
        let best = null; for (const b of bins.values()) if (!best || b[3] > best[3]) best = b;
        return [best[0] / best[3], best[1] / best[3], best[2] / best[3]];
    };
    const stage = document.querySelector("[data-story-stage]");
    const res = [];
    for (const d of stage?.querySelectorAll(".glass-dock") ?? []) {
        const items = [];
        const tw = document.createTreeWalker(d, NodeFilter.SHOW_TEXT);
        for (let n = tw.nextNode(); n; n = tw.nextNode()) {
            if (!/[\p{L}\p{N}]/u.test(n.data)) continue;
            const el = n.parentElement; if (!el || !el.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
            if (el.closest(".sr-only")) continue;
            const rg = document.createRange(); rg.selectNodeContents(n); const q = rg.getBoundingClientRect();
            if (q.width < 2 || q.height < 2) continue;
            items.push({ kind: "text", el, rect: q, text: n.data.trim().slice(0, 16) });
        }
        for (const svg of d.querySelectorAll("svg")) {
            if (!svg.checkVisibility({ opacityProperty: true, visibilityProperty: true })) continue;
            const q = svg.getBoundingClientRect(); if (q.width < 4) continue;
            items.push({ kind: "icon", el: svg, rect: q, text: svg.getAttribute("class")?.match(/lucide-([a-z0-9-]+)/)?.[1] ?? "svg" });
        }
        for (const it of items) {
            let op = 1; for (let e = it.el; e && e !== document.body; e = e.parentElement) op *= parseFloat(getComputedStyle(e).opacity);
            const ink = rgba(getComputedStyle(it.el).color);
            const bg = bgOf({ left: it.rect.left - 3, top: it.rect.top - 2, right: it.rect.right + 3, bottom: it.rect.bottom + 2 });
            if (!bg) continue;
            const a = ink[3] * op; const c = [0, 1, 2].map((i) => ink[i] * a + bg[i] * (1 - a));
            const cr = +CR(c, bg).toFixed(2);
            res.push({ dock: d.getAttribute("aria-label"), kind: it.kind, text: it.text, cr, need: it.kind === "text" ? 4.5 : 3, pass: cr >= (it.kind === "text" ? 4.5 : 3) });
        }
    }
    return res;
};
const out = { engine, label: LABEL, css: CSS, cells: [] };
let browser;
try {
    browser = await pw[engine].launch({ headless: true, ...(engine === "chromium" ? { args: ["--use-angle=metal", "--enable-gpu-rasterization"] } : { executablePath: `${process.env.HOME}/Library/Caches/ms-playwright/webkit-2287/pw_run.sh` }) });
    for (const page of PAGES) for (const ground of ["field", "flat"]) for (const scheme of ["dark", "light"]) {
        const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1, colorScheme: scheme });
        if (CSS) await ctx.addInitScript((css) => { addEventListener("DOMContentLoaded", () => { const st = document.createElement("style"); st.setAttribute("data-g15-state", ""); st.textContent = css; document.head.appendChild(st); }); }, CSS);
        try {
            const p = await ctx.newPage();
            const errors = [];
            p.on("pageerror", (e) => errors.push(String(e.message).slice(0, 160)));
            await p.goto(`http://127.0.0.1:${port}/?c=dock-comp&page=${page}&ground=${ground}${scheme === "dark" ? "&scheme=dark" : ""}`);
            await p.waitForFunction(() => window.__animReady === true, null, { timeout: 15000 }).catch(() => {});
            await p.waitForSelector("[data-story-stage] .glass-dock", { timeout: 15000 });
            await sleep(2500);
            await p.mouse.move(2, 2);
            await sleep(400);
            const read = async (only) => {
                const shot = (await p.screenshot({ type: "png" })).toString("base64");
                const r = await p.evaluate(INK, { shotB64: shot });
                return only == null ? r : r.filter((x) => x.dock === only);
            };
            const folded = await read(null);
            out.cells.push({ page, ground, scheme, posture: "folded", n: folded.length, min: folded.length ? Math.min(...folded.map((x) => x.cr)) : null, fails: folded.filter((x) => !x.pass), all: folded });
            if (SHOTS) { mkdirSync(SHOTS, { recursive: true }); await p.screenshot({ path: `${SHOTS}/${tag}-${engine}-${page}-${ground}-${scheme}-folded.png` }); }
            const docks = await p.evaluate(() => [...document.querySelectorAll("[data-story-stage] .glass-dock")].map((d) => d.getAttribute("aria-label")));
            for (let k = 0; k < docks.length; k++) {
                const box = await p.evaluate((k) => { const d = document.querySelectorAll("[data-story-stage] .glass-dock")[k]; const r = d.getBoundingClientRect(); return { x: r.x + r.width / 2, y: r.y + r.height / 2, open: d.classList.contains("expanded") }; }, k);
                if (!box.open) {
                    await p.mouse.move(box.x - 6, box.y); await p.mouse.move(box.x, box.y, { steps: 3 }); await sleep(900);
                    const open = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k);
                    if (!open) { await p.mouse.click(box.x, box.y); await sleep(900); }
                }
                const isOpen = await p.evaluate((k) => document.querySelectorAll("[data-story-stage] .glass-dock")[k].classList.contains("expanded"), k);
                const r = await read(docks[k]);
                out.cells.push({ page, ground, scheme, posture: "open", dock: docks[k], opened: isOpen, n: r.length, min: r.length ? Math.min(...r.map((x) => x.cr)) : null, fails: r.filter((x) => !x.pass), all: r });
                if (SHOTS && k === 0) await p.screenshot({ path: `${SHOTS}/${tag}-${engine}-${page}-${ground}-${scheme}-open.png` });
                await p.keyboard.press("Escape").catch(() => {});
                await p.mouse.click(4, 890); await p.mouse.move(2, 2); await sleep(500);
            }
            if (errors.length) out.cells.push({ page, ground, scheme, errors });
        } finally {
            await ctx.close();
        }
    }
} finally {
    if (browser) await browser.close();
    const cs = out.cells.filter((c) => c.n != null);
    out.summary = { cells: cs.length, failing: cs.filter((c) => c.fails.length).length, minText: Math.min(...cs.flatMap((c) => c.all.filter((x) => x.kind === "text").map((x) => x.cr))), minIcon: Math.min(...cs.flatMap((c) => c.all.filter((x) => x.kind === "icon").map((x) => x.cr))) };
    writeFileSync(new URL(`../../logs/m6-ink-${tag}.${engine}.json`, import.meta.url), JSON.stringify(out));
    console.log(JSON.stringify(out.summary));
    for (const c of cs.filter((c) => c.fails.length)) console.log(`${c.page} ${c.ground} ${c.scheme} ${c.posture}${c.dock ? " " + c.dock : ""}${c.opened === false ? " (did not open)" : ""}: ${c.fails.map((f) => `${f.kind} ${f.text} ${f.cr}`).join(", ")}`);
}
