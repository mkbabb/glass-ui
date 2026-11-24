// Readings: the hover token's resolved colour on the base tree against the cured
// tree, in Chromium, light and dark, across :root glass levels. Reports dE OK
// of the colours (unpremultiplied OKLab), the alpha difference, and dE OK of
// each composited over the page background and over the card.
// One browser per run, a new context per cell, all closed in finally.
//
// usage: node readings.mjs <base-dist> <cured-dist> <out.json> [token...]
import { chromium } from "playwright";
import { createServer } from "node:http";
import { readFileSync, writeFileSync, existsSync, statSync } from "node:fs";
import { join, extname, normalize } from "node:path";

const [BASE, CURED, OUT, ...TOKENS_ARG] = process.argv.slice(2);
const TOKENS = TOKENS_ARG.length ? TOKENS_ARG : ["--control-surface-bg-hover"];
const LEVELS = [1, 0.75, 0.5, 0.35, 0.3, 0.1, 0];
const MODES = ["light", "dark"];

function serve(dir) {
    const TYPES = { ".html": "text/html", ".js": "text/javascript", ".css": "text/css" };
    const s = createServer((req, res) => {
        const p = normalize(decodeURIComponent(new URL(req.url, "http://x").pathname)).replace(/^\/+/, "");
        let f = join(dir, p || "index.html");
        if (!f.startsWith(dir) || !existsSync(f) || statSync(f).isDirectory()) f = join(dir, "index.html");
        res.writeHead(200, { "content-type": TYPES[extname(f)] ?? "application/octet-stream" });
        res.end(readFileSync(f));
    });
    return new Promise((r) => s.listen(0, "127.0.0.1", () => r(s)));
}

// ── colour maths ────────────────────────────────────────────────────────────
const toLin = (c) => (c <= 0.04045 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4);
const toGam = (c) => (c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055);
function srgbToOklab([r, g, b]) {
    const [R, G, B] = [r, g, b].map(toLin);
    const l = Math.cbrt(0.4122214708 * R + 0.5363325363 * G + 0.0514459929 * B);
    const m = Math.cbrt(0.2119034982 * R + 0.6806995451 * G + 0.1073969566 * B);
    const s = Math.cbrt(0.0883024619 * R + 0.2817188376 * G + 0.6299787005 * B);
    return [0.2104542553 * l + 0.793617785 * m - 0.0040720468 * s, 1.9779984951 * l - 2.428592205 * m + 0.4505937099 * s, 0.0259040371 * l + 0.7827717662 * m - 0.808675766 * s];
}
function oklabToSrgb([L, a, b]) {
    const l = (L + 0.3963377774 * a + 0.2158037573 * b) ** 3;
    const m = (L - 0.1055613458 * a - 0.0638541728 * b) ** 3;
    const s = (L - 0.0894841775 * a - 1.291485548 * b) ** 3;
    return [4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s, -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s, -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s].map(toGam);
}
function parse(str) {
    const s = str.trim();
    let m;
    const alpha = (x) => (x === undefined ? 1 : x.endsWith("%") ? parseFloat(x) / 100 : parseFloat(x));
    if ((m = /^oklab\(\s*([-\d.e]+%?)\s+([-\d.e]+)\s+([-\d.e]+)(?:\s*\/\s*([-\d.e]+%?))?\s*\)$/.exec(s))) {
        const L = m[1].endsWith("%") ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
        return { lab: [L, +m[2], +m[3]], a: alpha(m[4]) };
    }
    if ((m = /^oklch\(\s*([-\d.e]+%?)\s+([-\d.e]+)\s+([-\d.e]+|none)(?:\s*\/\s*([-\d.e]+%?))?\s*\)$/.exec(s))) {
        const L = m[1].endsWith("%") ? parseFloat(m[1]) / 100 : parseFloat(m[1]);
        const h = m[3] === "none" ? 0 : (parseFloat(m[3]) * Math.PI) / 180;
        return { lab: [L, +m[2] * Math.cos(h), +m[2] * Math.sin(h)], a: alpha(m[4]) };
    }
    if ((m = /^color\(srgb\s+([-\d.e]+)\s+([-\d.e]+)\s+([-\d.e]+)(?:\s*\/\s*([-\d.e]+%?))?\s*\)$/.exec(s))) return { lab: srgbToOklab([+m[1], +m[2], +m[3]]), a: alpha(m[4]) };
    if ((m = /^rgba?\(\s*([-\d.e]+),\s*([-\d.e]+),\s*([-\d.e]+)(?:,\s*([-\d.e]+))?\s*\)$/.exec(s))) return { lab: srgbToOklab([m[1] / 255, m[2] / 255, m[3] / 255]), a: alpha(m[4]) };
    throw new Error("unparsed colour: " + s);
}
const dE = (p, q) => Math.hypot(p[0] - q[0], p[1] - q[1], p[2] - q[2]);
function over(c, bg) {
    // browsers composite in gamma-encoded sRGB
    const fg = oklabToSrgb(c.lab);
    const b = oklabToSrgb(bg.lab);
    return srgbToOklab(fg.map((x, i) => c.a * x + (1 - c.a) * b[i]));
}

// ── run ─────────────────────────────────────────────────────────────────────
const servers = [];
const rows = [];
let browser;
try {
    const baseSrv = await serve(BASE);
    const curedSrv = await serve(CURED);
    servers.push(baseSrv, curedSrv);
    browser = await chromium.launch({ headless: true });
    const read = async (srv, mode, level) => {
        const context = await browser.newContext();
        try {
            const page = await context.newPage();
            await page.goto(`http://127.0.0.1:${srv.address().port}/index.html?only=none&mode=${mode}`);
            await page.waitForFunction(() => window.__ready === true, null, { timeout: 8000 });
            return await page.evaluate(([level, tokens]) => {
                document.documentElement.style.setProperty("--glass-level", String(level));
                const probe = (v) => {
                    const el = document.createElement("div");
                    el.style.backgroundColor = v;
                    document.body.append(el);
                    const c = getComputedStyle(el).backgroundColor;
                    el.remove();
                    return c;
                };
                const out = { page: probe("var(--background)"), card: probe("var(--card)") };
                for (const t of tokens) out[t] = probe(`var(${t})`);
                return out;
            }, [level, TOKENS]);
        } finally {
            await context.close();
        }
    };
    for (const mode of MODES) {
        for (const level of LEVELS) {
            const b = await read(baseSrv, mode, level);
            const c = await read(curedSrv, mode, level);
            for (const t of TOKENS) {
                const old = parse(b[t]);
                const neu = parse(c[t]);
                const pageBg = parse(b.page);
                const cardBg = parse(b.card);
                const row = {
                    token: t,
                    mode,
                    level,
                    old: b[t],
                    new: c[t],
                    dE: dE(old.lab, neu.lab),
                    dAlpha: Math.abs(old.a - neu.a),
                    dEOverPage: dE(over(old, pageBg), over(neu, pageBg)),
                    dEOverCard: dE(over(old, cardBg), over(neu, cardBg)),
                };
                rows.push(row);
                console.log(`${t} ${mode.padEnd(5)} level ${String(level).padEnd(4)} dE ${row.dE.toExponential(2)}  dα ${row.dAlpha.toExponential(2)}  over page ${row.dEOverPage.toExponential(2)}  over card ${row.dEOverCard.toExponential(2)}   ${row.old}  →  ${row.new}`);
            }
        }
    }
    writeFileSync(OUT, JSON.stringify({ engine: "chromium", version: browser.version(), levels: LEVELS, rows, maxDE: Math.max(...rows.map((r) => r.dE)), maxDEOverPage: Math.max(...rows.map((r) => r.dEOverPage)), maxDEOverCard: Math.max(...rows.map((r) => r.dEOverCard)), maxDAlpha: Math.max(...rows.map((r) => r.dAlpha)) }, null, 1));
} finally {
    if (browser) await browser.close().catch(() => {});
    for (const s of servers) s.close();
}
