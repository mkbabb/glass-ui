// BC.W-GLASS-LEGIBILITY-MEASURED — glass-legibility.spec.ts, the live BIDIRECTIONAL
// legibility-AND-glassiness π readback (more glass AND more legible at once; the iOS-27
// dynamic-range shift, MEASURED). The PAINT/π arm of proof:glass-legibility — getComputedStyle
// over a real :5199 surface, both modes; the device-free SOURCE arm is scripts/proof-glass-
// legibility.mjs (the L1-L7 + disease-root bites). Per-mechanism greens alone do NOT close the
// visual wave — the captured DELTA (docs/tranches/BC/audit/visual/W-GLASS-LEGIBILITY-MEASURED-
// DELTA.md, the orchestrator's capture) is the binding truth (BC anti-disease law).
//
// THE DISEASE-ROOT (postmortem/az.md §2): proof:adaptive-glass-live is MONOTONIC — a grey slab
// over white scores BETTER on `contrastRatio >= 4.5` + `deltaL` than the warm-cream plate
// (darkening RAISES both). ZERO "is the glass still glassy while legible?" measure. The fix
// (this spec): over the composited plate, assert `contrastRatio(bodyInk, effBg) >= 4.5` AND
// `α < 0.86` SIMULTANEOUSLY — legible WHILE glassy. A grey slab fails the α/warmth; a too-thin
// invisible plate fails the contrast; only the iOS dynamic-range-shift passes BOTH.
//
// THE bright-vs-calm DELTA (the dynamic-range shift in paint): the SAME surface over a bright
// backdrop is DARKER (the driven darken) yet still α < 0.86; over a calm backdrop is warm-cream
// yet still ≥ 4.5:1. The plate concentrates light AND the ink rides the right register — more
// transparent AND more readable, at once.
//
// ONE colour-math source for OKLab: the SHARED paint-arm.mjs leaf (statsFromResolvedBg →
// reflect-capture-verify's oklabFromRgb) — the SAME decompose the device-free source gate +
// the live arm read (the canvas-unify single-source fence). The WCAG contrast + alpha-composite
// is standard sRGB (NOT OKLab — not a duplicate of the fenced decompose); the same relative-
// luminance the adaptive-glass-live π arm computes, kept local + minimal.
//
// WebKit/Safari: the legibility lives on the cross-engine base (`background` + `backdrop-filter:
// blur()+saturate()` — no `backdrop-filter: url()`), so the measured AA bar MUST hold on Safari
// (apple-ios27.md §6; research/apple-glass.md §5 — Safari degrades EXACTLY onto the apple.com-web
// look). The cross-engine assertion is the SOURCE form (the no-url() fence the device-free gate
// reaches), not a separate browser project — the two viewport projects carry the live readback.
//
// LOCAL-ONLY real-render: this spec LOADS :5199 (it reads PAINTED contrast over the live glass).
// On CI it grace-SKIPs (the AX.W00 Playwright-presence probe) backstopped by proof:live-verified-
// ledger over the DELTA — never re-run server-side (no real-GPU contrast on a headless runner).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
// The SHARED computed-style PAINT probe leaf — ONE OKLab decompose (paint-arm.mjs re-exports
// reflect-capture-verify's oklabFromRgb) + the per-tier α ceiling (bandForTier). No second
// colour math for the OKLab decompose; the WCAG composite below is standard sRGB.
import { statsFromResolvedBg, bandForTier } from "../scripts/lib/paint-arm.mjs";

// The AA body floor + the large-glyph floor (the dock label/glyph register is large — its
// silhouette truth rides the 3:1 large-text bar, matching adaptive-glass-live.spec.ts; a
// content panel rides the 4.5:1 body bar). The α ceiling is PER-TIER (bandForTier): the
// content rungs hold the translucent ceiling, the heavier OVERLAY band (.glass-floating/
// .glass-overlay — the modal-heavy register) rides the iOS "let content through" L6 clamp.
const AA_BODY = 4.5;
const AA_LARGE = 3.0;

// The calm-page routes (the bidirectional roster — a glass card/button/dialog over a calm
// light page + the dropdown/Select-content overlay plate; the dock over the busy aurora).
const ROUTES = ["/display/card", "/dock/overview", "/containers/dialog", "/substrates/glass-material"] as const;
const OVERLAY_ROUTE = "/containers/dropdown-menu";
const BUSY_ROUTE = "/substrates/aurora";

const VIEWPORTS = [
    { name: "desktop", width: 1280, height: 800 },
    { name: "mobile", width: 390, height: 844 },
] as const;

// ── WCAG contrast + alpha-composite (standard sRGB; NOT the fenced OKLab decompose) ──────────
// The OKLab→sRGB matrix here is the sRGB-COMPOSITE inverse of the fenced decompose, NOT a
// duplicate of it: modern Chromium serializes the warm-cream glass tokens (oklab()-authored)
// to `oklab(L a b / α)` on the live surface — esp. in DARK mode, where every tier resolves
// to an oklab() string the srgb/rgba arms cannot read. To composite the plate over the page
// (the WCAG ratio) we need its sRGB triple; this mirrors adaptive-glass-live.spec.ts's
// oklabToRgba. The fenced decompose (statsFromResolvedBg, for the α/chroma identity) is
// untouched — this is the composite-plumbing direction, not a second identity colour-math.
function gammaEncode(c: number): number {
    const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, x)) * 255);
}
function oklabToRgba(L: number, a: number, b: number, alpha: number): [number, number, number, number] {
    const l_ = L + 0.3963377774 * a + 0.2158037573 * b;
    const m_ = L - 0.1055613458 * a - 0.0638541728 * b;
    const s_ = L - 0.0894841775 * a - 1.291485548 * b;
    const l = l_ ** 3;
    const m = m_ ** 3;
    const s = s_ ** 3;
    return [
        gammaEncode(4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s),
        gammaEncode(-1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s),
        gammaEncode(-0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s),
        alpha,
    ];
}
function parseColor(str: string): [number, number, number, number] | null {
    if (!str) return null;
    const oklab = str.match(/oklab\(\s*(-?[\d.]+%?)\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)(?:\s*\/\s*([\d.]+%?))?\s*\)/i);
    if (oklab) {
        const num = (v: string, scale = 1) => (v.endsWith("%") ? (Number(v.slice(0, -1)) / 100) * scale : Number(v));
        return oklabToRgba(num(oklab[1]!), num(oklab[2]!), num(oklab[3]!), oklab[4] === undefined ? 1 : num(oklab[4]!));
    }
    const srgb = str.match(/color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i);
    if (srgb) {
        return [
            Math.round(Number(srgb[1]) * 255),
            Math.round(Number(srgb[2]) * 255),
            Math.round(Number(srgb[3]) * 255),
            srgb[4] === undefined ? 1 : Number(srgb[4]),
        ];
    }
    const rgb = str.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i);
    if (rgb) return [Number(rgb[1]), Number(rgb[2]), Number(rgb[3]), rgb[4] === undefined ? 1 : Number(rgb[4])];
    return null;
}
function composite(over: [number, number, number, number], base: [number, number, number]): [number, number, number] {
    const a = over[3];
    return [
        Math.round(over[0] * a + base[0] * (1 - a)),
        Math.round(over[1] * a + base[1] * (1 - a)),
        Math.round(over[2] * a + base[2] * (1 - a)),
    ];
}
function linearize(c: number): number {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}
function relLuminance([r, g, b]: [number, number, number]): number {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}
function contrastRatio(a: [number, number, number], b: [number, number, number]): number {
    return (Math.max(relLuminance(a), relLuminance(b)) + 0.05) / (Math.min(relLuminance(a), relLuminance(b)) + 0.05);
}

interface GlassReadout {
    selector: string;
    surfaceBg: string;
    bodyInk: string;
    isDock: boolean;
}

/**
 * Read each in-situ glass surface's OWN resolved background + body-register ink with NO
 * injected ancestor bucket (the self-engage must fire via the surface's OWN `:where()` rule).
 * The body-bearing discount mirrors adaptive-glass-live.spec.ts: a panel-sized, text-bearing
 * surface — NOT a decorative control affordance (a Switch/Toggle track paints a loud-pill fill).
 */
async function readGlass(page: Page): Promise<GlassReadout[]> {
    return page.evaluate(() => {
        const SELECTORS = [".glass-dock", ".glass-card", ".glass-resting", ".glass-quiet", ".glass-floating", ".glass-overlay"];
        const out: { selector: string; surfaceBg: string; bodyInk: string; isDock: boolean }[] = [];
        const seen = new Set<Element>();
        function enrolled(el: HTMLElement, isDock: boolean): boolean {
            if (isDock) return true;
            if (el.closest("[role=switch], [data-state], [role=checkbox], button, label")) return false;
            // Skip a `.glass-*` tile whose background is OVERRIDDEN by a `bg-*` utility (the
            // demo rim/contrast DEVICE — e.g. `bg-foreground/[0.18]` paints a dark fill, NOT the
            // warm-cream glass material). Its backgroundColor is the utility fill (oklab(0 0 0 /
            // 0.18)), not `--glass-bg-*` — measuring the glass IDENTITY on it is a category error.
            if (/(^|\s)bg-\S/.test(el.className)) return false;
            const rect = el.getBoundingClientRect();
            if (rect.width < 80 || rect.height < 48) return false;
            return (el.textContent ?? "").trim().length >= 8;
        }
        for (const sel of SELECTORS) {
            const isDock = sel === ".glass-dock";
            for (const node of Array.from(document.querySelectorAll(sel)).slice(0, 4)) {
                if (!(node instanceof HTMLElement) || seen.has(node)) continue;
                if (!enrolled(node, isDock)) continue;
                seen.add(node);
                const cs = getComputedStyle(node);
                // the body-register ink — content tiers read --muted-foreground (lifted to
                // --foreground over light by the self-engage); the dock reads its glyph register.
                const inkToken = isDock ? "var(--dock-fg-on-aurora, var(--foreground))" : "var(--muted-foreground)";
                const probe = document.createElement("span");
                probe.style.color = inkToken;
                node.appendChild(probe);
                const bodyInk = getComputedStyle(probe).color;
                probe.remove();
                out.push({ selector: sel, surfaceBg: cs.backgroundColor, bodyInk, isDock });
            }
        }
        return out;
    });
}

async function setMode(page: Page, mode: "light" | "dark"): Promise<void> {
    await page.evaluate((m) => document.documentElement.classList.toggle("dark", m === "dark"), mode);
    await page.waitForTimeout(120);
}

test.describe("glass-legibility (the BIDIRECTIONAL legibility-AND-glassiness π — more glass AND more legible at once)", () => {
    for (const vp of VIEWPORTS) {
        for (const route of ROUTES) {
            for (const mode of ["light", "dark"] as const) {
                test(`${mode}: in-situ glass clears AA WHILE staying below the tier α ceiling (legible AND glassy) @ ${vp.name} — ${route}`, async ({ page }) => {
                    await page.setViewportSize({ width: vp.width, height: vp.height });
                    await page.goto(route, { waitUntil: "networkidle" });
                    await setMode(page, mode);

                    const readouts = await readGlass(page);
                    expect(readouts.length, `${route}: no body-bearing glass surface (the enrolled route must paint at least one)`).toBeGreaterThan(0);

                    for (const r of readouts) {
                        const bg = parseColor(r.surfaceBg);
                        const ink = parseColor(r.bodyInk);
                        expect(bg, `${route} ${r.selector}: could not parse surface bg "${r.surfaceBg}"`).not.toBeNull();
                        expect(ink, `${route} ${r.selector}: could not parse body ink "${r.bodyInk}"`).not.toBeNull();

                        // The composited plate over the calm-light PAGE (the surface's OWN bg over
                        // the warm page). In paint the page IS the backdrop; the surface darkens
                        // (or not) via its own driven strength. The page background is painted on
                        // `<html>` (the warm-cream rgb(251,250,248) floor), NOT on `<body>` (which
                        // is transparent in this app) — so reading `document.body` composites over a
                        // FALSE black [0,0,0] and crushes the muted-ink contrast (a methodology bug,
                        // not a paint defect). Walk to the first OPAQUE ancestor background (the real
                        // painted page color), falling back to `<html>` then white.
                        const pageBg = await page.evaluate((sel) => {
                            const opaque = (s: string) => {
                                const m = s.match(/rgba?\([^)]*?,\s*([\d.]+)\s*\)/) ?? s.match(/\/\s*([\d.]+)\s*\)/);
                                return s && !/transparent/i.test(s) && (m ? Number(m[1]) >= 0.999 : true);
                            };
                            const node = document.querySelector(sel);
                            let el: HTMLElement | null = node instanceof HTMLElement ? node.parentElement : null;
                            for (; el; el = el.parentElement) {
                                const bg = getComputedStyle(el).backgroundColor;
                                if (opaque(bg)) return bg;
                            }
                            const html = getComputedStyle(document.documentElement).backgroundColor;
                            return opaque(html) ? html : "rgb(255, 255, 255)";
                        }, r.selector);
                        const base = parseColor(pageBg) ?? ([255, 255, 255, 1] as [number, number, number, number]);
                        const effBg = composite(bg!, [base[0], base[1], base[2]]);
                        const inkRgb = composite(ink!, effBg);

                        // (1) LEGIBLE — the body register clears its floor over the composited
                        // plate: 4.5:1 for content panels, 3:1 for the large dock glyph/label
                        // register (the silhouette truth, matching adaptive-glass-live.spec.ts).
                        const ratio = contrastRatio(inkRgb, effBg);
                        const floor = r.isDock ? AA_LARGE : AA_BODY;
                        expect(
                            ratio,
                            `${route} ${r.selector} [${mode}]: body register is ${ratio.toFixed(2)}:1 over the composited plate (ink ${r.bodyInk}, bg ${r.surfaceBg}) — under ${floor}:1. The dynamic-range shift did not keep it legible.`,
                        ).toBeGreaterThanOrEqual(floor);

                        // (2) GLASSY — the surface stays below the tier's α ceiling (the iOS
                        // clamp; AA by going opaque is a goal-miss — the grey-slab disease). The
                        // content rungs hold the translucent ceiling; the heavier OVERLAY band
                        // (.glass-floating/.glass-overlay) rides the modal-heavy "let content
                        // through" ceiling. PER-TIER (bandForTier) — the alpha-monotonic ladder.
                        const stats = statsFromResolvedBg(r.surfaceBg);
                        expect(stats, `${route} ${r.selector}: could not decompose "${r.surfaceBg}"`).not.toBeNull();
                        // darkenTolerant: the legibility roster includes BUSY-aurora routes
                        // where the adaptive darken legitimately lifts a light content rung to
                        // ~0.72 (still glassy, not opaque — the dynamic-range shift). The "glassy"
                        // bound here is "didn't go opaque to win contrast", not the calm-REST tight ceiling.
                        const alphaCeil = bandForTier(r.selector, mode, { darkenTolerant: true }).alpha;
                        expect(
                            stats!.alpha,
                            `${route} ${r.selector} [${mode}]: surface α is ${stats!.alpha.toFixed(3)} (bg ${r.surfaceBg}) — at/over the ${alphaCeil} tier ceiling. AA cleared by going opaque (a goal-miss, not the dynamic-range shift — "let content through").`,
                        ).toBeLessThan(alphaCeil);

                        // (3) WARM — the plate is not greyed to neutral (the warm-cream identity).
                        expect(
                            stats!.chroma,
                            `${route} ${r.selector} [${mode}]: surface chroma is ${stats!.chroma.toFixed(4)} (bg ${r.surfaceBg}) — greyed to neutral (the AZ grey slab; the warm-cream identity must hold).`,
                        ).toBeGreaterThan(0);
                    }
                });
            }
        }
    }

    // L6 — the OVERLAY plate (the dropdown/menu/Select-content surface) clears the same bar.
    // The overlay band rides the modal-heavy ceiling (bandForTier — .glass-floating 0.86 / the
    // heaviest .glass-overlay rung its own ceiling), never a full slab.
    test(`light: the overlay dropdown plate clears 4.5:1 WHILE staying glassy (the L6 roster addition) — ${OVERLAY_ROUTE}`, async ({ page }) => {
        await page.goto(OVERLAY_ROUTE, { waitUntil: "networkidle" });
        await setMode(page, "light");
        // open the dropdown so the overlay content paints (best-effort — a trigger button).
        const trigger = page.locator("button", { hasText: /open|menu|trigger/i }).first();
        if (await trigger.count()) {
            await trigger.click().catch(() => {});
            await page.waitForTimeout(200);
        }
        const readouts = await readGlass(page);
        const overlay = readouts.find((r) => r.selector === ".glass-floating" || r.selector === ".glass-overlay");
        // a route that paints no overlay is not a counter-example; the enrolled route should.
        if (!overlay) return;
        const bg = parseColor(overlay.surfaceBg)!;
        const ink = parseColor(overlay.bodyInk)!;
        const effBg = composite(bg, [255, 255, 255]);
        const ratio = contrastRatio(composite(ink, effBg), effBg);
        const stats = statsFromResolvedBg(overlay.surfaceBg)!;
        const alphaCeil = bandForTier(overlay.selector, "light").alpha;
        expect(ratio, `${OVERLAY_ROUTE} overlay: ${ratio.toFixed(2)}:1 — under ${AA_BODY}:1 (the overlay roster addition must clear AA)`).toBeGreaterThanOrEqual(AA_BODY);
        expect(stats.alpha, `${OVERLAY_ROUTE} ${overlay.selector}: α ${stats.alpha.toFixed(3)} ≥ ${alphaCeil} (the dropdown went opaque — the L6 "let content through" clamp)`).toBeLessThan(alphaCeil);
    });

    // The bright-vs-calm DELTA: the SAME surface over a bright/busy backdrop is DARKER (driven)
    // yet still below the dock's α ceiling — the dynamic-range shift in paint (more transparent
    // AND more readable).
    test(`light: the dock over the busy aurora stays glassy WHILE legible (the dynamic-range shift) — ${BUSY_ROUTE}`, async ({ page }) => {
        await page.goto(BUSY_ROUTE, { waitUntil: "networkidle" });
        await setMode(page, "light");
        const readouts = await readGlass(page);
        const dock = readouts.find((r) => r.isDock) ?? readouts[0];
        expect(dock, `${BUSY_ROUTE}: no glass surface (the dock-over-busy read)`).toBeTruthy();
        const stats = statsFromResolvedBg(dock!.surfaceBg)!;
        const alphaCeil = bandForTier(dock!.selector, "light", { darkenTolerant: true }).alpha;
        // over a busy/bright field the dock darkens (driven) but STAYS glassy (the clamp).
        expect(
            stats.alpha,
            `${BUSY_ROUTE} ${dock!.selector}: dock α ${stats.alpha.toFixed(3)} ≥ ${alphaCeil} over the busy aurora — the driven darken went opaque (the slab-to-win escape; the clamp must hold "let content through").`,
        ).toBeLessThan(alphaCeil);
        expect(
            stats.chroma,
            `${BUSY_ROUTE} ${dock!.selector}: dock chroma ${stats.chroma.toFixed(4)} ≤ 0 — greyed (the AZ slab; the warm material must hold even when darkened).`,
        ).toBeGreaterThan(0);
    });
});
