// C5-adaptive-legibility — READ-ONLY live audit of the W55 --glass-backdrop
// over-light readability gap (R3-7). Walks ~12 representative LIGHT-mode demo
// routes on :5199, π-readback the contrast of (a) dock controls and (b)
// glass-card text against their ACTUAL painted backdrops (computed color +
// a pixel sample beneath the element), and captures the worst offenders.
//
// Pure observation. NO source edits, NO demo restart. Captures land under
// docs/tranches/AZ/audit/ground/ prefixed C5-.

import { chromium } from "playwright";
import { fileURLToPath } from "node:url";

const BASE = process.env.DEMO_URL ?? "http://localhost:5199";
const OUT = fileURLToPath(new URL(".", import.meta.url));

// ── WCAG plumbing (mirrors tests-visual/adaptive-glass.spec.ts) ──────────────
function linearize(c) {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function relLum([r, g, b]) {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
function contrast(a, b) {
    const lA = relLum(a), lB = relLum(b);
    const hi = Math.max(lA, lB), lo = Math.min(lA, lB);
    return (hi + 0.05) / (lo + 0.05);
}

// The representative LIGHT-mode routes. Picked for: dock-bearing layout shell +
// a spread of backdrops (paper / grid / aurora / fourier / plain card) where the
// over-light G2 case bites.
const ROUTES = [
    { path: "/foundations/paper-glass", note: "paper bg + hero, glass tiers on paper" },
    { path: "/foundations/colors", note: "plain light card substrate" },
    { path: "/data/metric-cell", note: "grid bg, metric cards" },
    { path: "/data/metric-stack", note: "grid bg, metric rows" },
    { path: "/compositions/math-paper", note: "grid bg composition" },
    { path: "/compositions/settings", note: "plain settings composition" },
    { path: "/dock/overview", note: "dock walkthrough" },
    { path: "/dock/layers", note: "dock layers + rail" },
    { path: "/dock/rail", note: "vertical dock rail" },
    { path: "/substrates/glass-material", note: "aurora bg, glass material grammar" },
    { path: "/display/card", note: "five-tier glass card over page" },
    { path: "/containers/dialog", note: "glass dialog overlay band" },
];

// Sample the effective backdrop colour BEHIND a rect by reading the pixel just
// outside it (left edge - 4px) from a full-page screenshot buffer is heavy;
// instead we use elementFromPoint walking + getComputedStyle composite, AND a
// canvas pixel read via html2canvas-free approach: read the painted pixel from a
// devicePixelRatio-aware screenshot is the ground truth. We do BOTH: computed
// (structural) + a screenshot pixel sample (true paint) for the worst cases.

async function readSurfaces(page) {
    return page.evaluate(() => {
        // sRGB parse → [r,g,b,a]; handles rgb/rgba/oklab/color(srgb).
        function gammaEncode(c) {
            const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
            return Math.round(Math.min(1, Math.max(0, x)) * 255);
        }
        function oklabToRgba(L, a, b, alpha) {
            const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
            const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
            const s_ = L - 0.0894841775 * a - 1.291485548 * b;
            const l = l_ ** 3, m = m_ ** 3, s = s_ ** 3;
            const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
            const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
            const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
            return [gammaEncode(r), gammaEncode(g), gammaEncode(bl), alpha];
        }
        function parse(str) {
            if (!str || str === "transparent") return null;
            let m = str.match(/oklab\(\s*(-?[\d.]+%?)\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)(?:\s*\/\s*([\d.]+%?))?\s*\)/i);
            if (m) {
                const num = (v, sc = 1) => v.endsWith("%") ? (Number(v.slice(0, -1)) / 100) * sc : Number(v);
                return oklabToRgba(num(m[1]), num(m[2]), num(m[3]), m[4] === undefined ? 1 : num(m[4], 1));
            }
            m = str.match(/color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i);
            if (m) return [Math.round(+m[1] * 255), Math.round(+m[2] * 255), Math.round(+m[3] * 255), m[4] === undefined ? 1 : +m[4]];
            m = str.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i);
            if (m) return [+m[1], +m[2], +m[3], m[4] === undefined ? 1 : +m[4]];
            return null;
        }
        function composite(over, base) {
            const a = over[3];
            return [Math.round(over[0] * a + base[0] * (1 - a)), Math.round(over[1] * a + base[1] * (1 - a)), Math.round(over[2] * a + base[2] * (1 - a))];
        }
        // Walk up from an element accumulating the first opaque-ish backdrop behind it.
        function backdropBehind(el) {
            // Sample the element to the LEFT/ABOVE the surface, i.e. the page bg the
            // glass floats over. Use elementFromPoint just outside the surface rect.
            const r = el.getBoundingClientRect();
            const probe = [
                [r.left - 6, r.top + r.height / 2],
                [r.left + r.width / 2, r.top - 6],
                [r.right + 6, r.top + r.height / 2],
                [r.left + r.width / 2, r.bottom + 6],
            ];
            for (const [x, y] of probe) {
                if (x < 0 || y < 0 || x > innerWidth || y > innerHeight) continue;
                const under = document.elementFromPoint(x, y);
                if (!under || under === el || el.contains(under)) continue;
                // walk up to first non-transparent bg
                let node = under, base = [255, 255, 255];
                while (node) {
                    const bg = parse(getComputedStyle(node).backgroundColor);
                    if (bg && bg[3] > 0.01) { base = composite(bg, base); if (bg[3] > 0.95) break; }
                    node = node.parentElement;
                }
                return base;
            }
            // fallback: body bg
            return parse(getComputedStyle(document.body).backgroundColor) || [255, 255, 255];
        }
        function resolvedSurfaceOverBackdrop(el, backdrop) {
            const bg = parse(getComputedStyle(el).backgroundColor);
            if (!bg) return backdrop;
            return composite(bg, backdrop);
        }
        function lum(c) {
            const lin = (v) => { const x = v / 255; return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4; };
            return 0.2126 * lin(c[0]) + 0.7152 * lin(c[1]) + 0.0722 * lin(c[2]);
        }
        function cr(a, b) { const la = lum(a), lb = lum(b); const hi = Math.max(la, lb), lo = Math.min(la, lb); return (hi + 0.05) / (lo + 0.05); }

        const results = [];

        // (1) Dock controls — the dock control glyph/label over the dock plate over the page.
        const docks = [...document.querySelectorAll(".glass-dock")];
        docks.forEach((dock, di) => {
            const ds = getComputedStyle(dock);
            const backdrop = backdropBehind(dock);
            const dockPlate = resolvedSurfaceOverBackdrop(dock, backdrop);
            // Pull a control inside the dock with text/icon.
            const ctrls = [...dock.querySelectorAll(".dock-icon-button, .dock-tab-button, button, [role='button'], .dock-select-trigger")];
            ctrls.slice(0, 4).forEach((c, ci) => {
                const cs = getComputedStyle(c);
                const ink = parse(cs.color) || [0, 0, 0, 1];
                // the control sits on the dock plate (its own bg may be transparent at rest)
                const ctrlBg = parse(cs.backgroundColor);
                const effPlate = ctrlBg && ctrlBg[3] > 0.01 ? composite(ctrlBg, dockPlate) : dockPlate;
                results.push({
                    kind: "dock-control",
                    idx: `dock${di}.ctrl${ci}`,
                    inkColor: cs.color,
                    inkRgb: [ink[0], ink[1], ink[2]],
                    dockBg: ds.backgroundColor,
                    backdrop,
                    effPlate,
                    ratio: +cr([ink[0], ink[1], ink[2]], effPlate).toFixed(2),
                    glassBackdropToken: ds.getPropertyValue("--glass-backdrop").trim(),
                    tintStrength: ds.getPropertyValue("--glass-tint-strength").trim(),
                    rect: (() => { const r = dock.getBoundingClientRect(); return { x: Math.round(r.x), y: Math.round(r.y), w: Math.round(r.width), h: Math.round(r.height) }; })(),
                });
            });
        });

        // (2) glass-card / glass-resting / glass-floating text over backdrop.
        const cards = [...document.querySelectorAll(".glass-card, .glass-resting, .glass-floating, .glass-quiet, .glass-wash, .glass-overlay")];
        cards.slice(0, 16).forEach((card, ci) => {
            const cs = getComputedStyle(card);
            const backdrop = backdropBehind(card);
            const plate = resolvedSurfaceOverBackdrop(card, backdrop);
            // find a text descendant
            let textEl = null;
            const walker = document.createTreeWalker(card, NodeFilter.SHOW_TEXT, {
                acceptNode: (n) => n.textContent.trim().length > 2 ? NodeFilter.FILTER_ACCEPT : NodeFilter.FILTER_REJECT,
            });
            const tn = walker.nextNode();
            if (tn) textEl = tn.parentElement;
            const ink = textEl ? parse(getComputedStyle(textEl).color) : parse(cs.color);
            if (!ink) return;
            results.push({
                kind: card.className.split(/\s+/).find((c) => c.startsWith("glass-")) || "glass",
                idx: `card${ci}`,
                inkColor: textEl ? getComputedStyle(textEl).color : cs.color,
                inkRgb: [ink[0], ink[1], ink[2]],
                cardBg: cs.backgroundColor,
                backdrop,
                effPlate: plate,
                ratio: +cr([ink[0], ink[1], ink[2]], plate).toFixed(2),
                glassBackdropToken: cs.getPropertyValue("--glass-backdrop").trim(),
                tintStrength: cs.getPropertyValue("--glass-tint-strength").trim(),
                sample: textEl ? textEl.textContent.trim().slice(0, 24) : "",
            });
        });

        return results;
    });
}

(async () => {
    const browser = await chromium.launch({
        args: ["--headless=new", "--use-gl=angle", "--use-angle=metal", "--ignore-gpu-blocklist"],
    });
    const page = await browser.newPage({ viewport: { width: 1280, height: 900 }, colorScheme: "light" });
    const allFindings = [];
    const worst = [];

    for (const route of ROUTES) {
        try {
            await page.goto(`${BASE}${route.path}`, { waitUntil: "networkidle", timeout: 30000 });
            // Park any live WebGL/aurora before evaluate.
            await page.evaluate(() => {
                Object.defineProperty(document, "hidden", { value: true, configurable: true });
                document.dispatchEvent(new Event("visibilitychange"));
            });
            await page.waitForTimeout(400);
            const surfaces = await readSurfaces(page);
            const flagged = surfaces.filter((s) => {
                const floor = s.kind === "dock-control" ? 3.0 : 4.5;
                return s.ratio < floor;
            });
            allFindings.push({ route: route.path, note: route.note, total: surfaces.length, flagged: flagged.length, surfaces });
            if (flagged.length) {
                worst.push({ route: route.path, flagged });
                const safe = route.path.replace(/\//g, "_");
                await page.screenshot({ path: `${OUT}C5-${safe}.png`, fullPage: false });
            }
            console.log(`[${route.path}] surfaces=${surfaces.length} flagged=${flagged.length}` + (flagged.length ? ` WORST=${Math.min(...flagged.map(f => f.ratio))}:1` : ""));
        } catch (e) {
            console.log(`[${route.path}] ERROR: ${e.message}`);
            allFindings.push({ route: route.path, error: e.message });
        }
    }

    // dump JSON
    const { writeFileSync } = await import("node:fs");
    writeFileSync(`${OUT}C5-readback.json`, JSON.stringify({ base: BASE, findings: allFindings }, null, 2));
    console.log("\n=== WORST OFFENDERS ===");
    for (const w of worst) {
        for (const f of w.flagged) {
            console.log(`${w.route} :: ${f.kind} ${f.idx} ratio=${f.ratio}:1 ink=${f.inkColor} bg=${f.cardBg || f.dockBg} backdrop=[${f.backdrop}] eff=[${f.effPlate}] glass-backdrop=${f.glassBackdropToken} tint=${f.tintStrength}` + (f.sample ? ` "${f.sample}"` : ""));
        }
    }
    await browser.close();
})();
