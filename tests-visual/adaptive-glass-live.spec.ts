// AZ.W-ADAPTIVE-AUTO G1 — adaptive-glass-live.spec.ts, the IN-SITU π contrast readback
// (the BINDING 4.5:1 + ΔL silhouette truth; closes the C5-4 gate blind spot).
//
// THE DEFECT (R3-7 / F2 live repro): "Glass dock over VERY LIGHT materials is unreadable
// — darken DYNAMICALLY like iOS 27 so we can actually see these elements." The dock + the
// plain content-glass tiers set `--glass-backdrop: light` on their OWN root (intending a
// self-darken), but CSS style queries NEVER self-match, so the only re-point was the
// ancestor-querying `@container` block — which never fires in-situ. LIVE-PROVEN at HEAD:
// the dock plate L=0.88 over page L=0.89 (ΔL ≈ 0.01 — the plate vanishes).
//
// THE C5-4 BLIND SPOT (closed here): the prior π arm INJECTED `--glass-backdrop: light`
// on a synthetic ANCESTOR, so the ancestor-querying `@container` block falsely self-
// matched in test while the in-situ render stayed broken. THIS spec reads each glass
// surface's OWN resolved background — the self-engage must fire via the surface's OWN
// `:where()` rule (Arm 1), NO injected ancestor bucket — then composites it over a
// SYNTHETIC-WHITE worst-case plate (the LEGITIMATE control retained from the W55 spec —
// reading over white does NOT touch --glass-backdrop). This distinction is load-bearing:
// the enrolled routes carry HETEROGENEOUS page backdrops (some paint a DARK aurora), on
// which "in-situ over whatever-the-page-painted" passes trivially while the dock-over-
// light defect stays alive. Reading over the synthetic-white worst-case plate (with NO
// ancestor bucket) means a route's incidental dark backdrop cannot mask a broken-over-
// light render.
//
// THE BINDING ASSERTIONS (per enrolled surface):
//   (1) the BODY register (--muted-foreground tier, lifted to --foreground by the self-
//       engage) clears WCAG 4.5:1 over the surface composited over white;
//   (2) the SURFACE SILHOUETTE ΔL (plate-over-white vs white) clears a visibility floor
//       (the G2 surface-silhouette truth — R3-7 is primarily a silhouette failure, the
//       plate vanishes; the ΔL≈0.01 collapse is the RED baseline);
//   (3) the surface stays TRANSLUCENT (AA cleared by going opaque is a goal-miss).
//
// At ≥2 viewports, light mode (the G2 home). Fail-CLOSED: an illegible/invisible in-situ
// surface reds the recompute, exit non-zero.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";

const AA_BODY = 4.5;
// The large-text / large-glyph floor (the dock glyph register is large; R3-7 is
// primarily a dock-plate SILHOUETTE failure, not a body-text failure on the glyph).
const AA_LARGE = 3.0;
// The surface-silhouette visibility floor: the plate-over-white luminance must differ
// from white by at least this (the plate is distinguishable from a bright page behind).
// The pre-edit RED baseline is ΔL ≈ 0.01 (the dock plate vanishes); the Arm-1 self-engage
// at the 20% floor lands ΔL ≈ 0.40 over white. 0.08 is a conservative visibility floor.
const DELTA_L_FLOOR = 0.08;

const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// The enrolled routes (the 9 hand-named floor from the spec; the manifest-derived sweep
// is the binding superset — every route whose page composes a glass tier auto-enrolls,
// but the runner pins these as the asserted floor). Each route + the in-situ glass
// surface selectors it paints.
const ROUTES = [
    "/dock/overview",
    "/dock/layers",
    "/dock/rail",
    "/compositions/settings",
    "/foundations/colors",
    "/data/metric-cell",
    "/display/card",
    "/foundations/paper-glass",
    "/substrates/glass-material",
] as const;

// ── WCAG plumbing (mirrors adaptive-glass.spec.ts; axe-independent) ──────────────────
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
    const r = 4.0767416621 * l - 3.3077115913 * m + 0.2309699292 * s;
    const g = -1.2684380046 * l + 2.6097574011 * m - 0.3413193965 * s;
    const bl = -0.0041960863 * l - 0.7034186147 * m + 1.707614701 * s;
    return [gammaEncode(r), gammaEncode(g), gammaEncode(bl), alpha];
}
function parseColor(str: string): [number, number, number, number] | null {
    if (!str) return null;
    const oklab = str.match(/oklab\(\s*(-?[\d.]+%?)\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)(?:\s*\/\s*([\d.]+%?))?\s*\)/i);
    if (oklab) {
        const num = (v: string, scale = 1) => (v.endsWith("%") ? (Number(v.slice(0, -1)) / 100) * scale : Number(v));
        return oklabToRgba(num(oklab[1]!), num(oklab[2]!), num(oklab[3]!), oklab[4] === undefined ? 1 : num(oklab[4]!, 1));
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
    const lA = relLuminance(a);
    const lB = relLuminance(b);
    const hi = Math.max(lA, lB);
    const lo = Math.min(lA, lB);
    return (hi + 0.05) / (lo + 0.05);
}
function effectiveOverWhite(surfaceBg: string): [number, number, number] | null {
    const bg = parseColor(surfaceBg);
    if (!bg) return null;
    return composite(bg, [255, 255, 255]);
}

interface InSituReadout {
    selector: string;
    surfaceBg: string;
    bodyInk: string;
    isDock: boolean;
    translucent: boolean;
}

/**
 * Read the FIRST in-situ glass surface on the page (the dock root, a glass-card, a rung)
 * with NO injected ancestor bucket — the self-engage must fire via the surface's OWN
 * `:where()` rule. Returns the surface's resolved background, its body-register ink (the
 * --muted-foreground tier, which the self-engage lifts to --foreground), and the
 * translucency tell.
 */
async function readInSituGlass(page: Page): Promise<InSituReadout[]> {
    return page.evaluate(() => {
        // The glass-surface inventory (the body-bearing tiers the readback walks).
        const SELECTORS = [
            ".glass-dock",
            ".glass-card",
            ".glass-resting",
            ".glass-quiet",
            ".glass-wash",
            ".glass-floating",
            ".glass-overlay",
        ];
        const out: InSituReadout[] = [];
        const seen = new Set<Element>();
        // The text-walker discount (Arm 3 / C5-6): a glass surface is enrolled ONLY when
        // it bears REAL body text + is panel-sized — NOT a decorative control affordance
        // (a Switch/Checkbox/Toggle TRACK composes `.glass-wash` but paints a saturated
        // fill in its checked state, the glass-allowlist loud-pill register, and carries
        // NO body text). A control track / 1:1 swatch is not a "body register" surface.
        function isBodyBearing(el: HTMLElement, isDock: boolean): boolean {
            // The dock IS the primary G2 surface (the silhouette + glyph truth) — it
            // always enrolls regardless of body text (R3-7 is primarily a dock-plate-
            // vanishes silhouette failure).
            if (isDock) return true;
            // Skip control affordances (the loud-pill register, the W54 allowlist) — a
            // Switch/Checkbox/Toggle track composes `.glass-wash` but paints a saturated
            // fill in its checked state + carries NO body text (C5-6 decorative discount).
            if (el.closest("[role=switch], [data-state], [role=checkbox], button, label"))
                return false;
            const rect = el.getBoundingClientRect();
            // Panel-sized (a switch track is 24×44px; a content panel is larger).
            if (rect.width < 80 || rect.height < 48) return false;
            // Bears a non-trivial text run (its textContent, trimmed, ≥ 8 chars).
            const text = (el.textContent ?? "").trim();
            return text.length >= 8;
        }
        for (const sel of SELECTORS) {
            const isDock = sel === ".glass-dock";
            const nodes = Array.from(document.querySelectorAll(sel)).slice(0, 4);
            for (const node of nodes) {
                if (!(node instanceof HTMLElement) || seen.has(node)) continue;
                if (!isBodyBearing(node, isDock)) continue;
                seen.add(node);
                const cs = getComputedStyle(node);
                const surfaceBg = cs.backgroundColor;
                // The body-register ink. Content tiers read the --muted-foreground tier
                // (the common body text on glass; the self-engage lifts it to
                // --foreground over light). The dock reads its own --dock-fg-on-aurora
                // (the glyph/label register, also lifted to the warm ink).
                const inkToken = isDock
                    ? "var(--dock-fg-on-aurora, var(--foreground))"
                    : "var(--muted-foreground)";
                const probe = document.createElement("span");
                probe.style.color = inkToken;
                node.appendChild(probe);
                const bodyInk = getComputedStyle(probe).color;
                probe.remove();
                const alphaMatch =
                    surfaceBg.match(/\/\s*([\d.]+)\s*\)/) ?? surfaceBg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
                const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
                out.push({ selector: sel, surfaceBg, bodyInk, isDock, translucent: alpha < 0.995 });
            }
        }
        return out;
    });
}

async function setLight(page: Page): Promise<void> {
    await page.evaluate(() => document.documentElement.classList.remove("dark"));
    await page.waitForTimeout(120);
}

test.describe("adaptive-glass-live (G1 — the IN-SITU π readback, no injected ancestor bucket)", () => {
    for (const vp of VIEWPORTS) {
        for (const route of ROUTES) {
            test(`in-situ glass clears 4.5:1 body + ΔL silhouette over #fff @ ${vp.name} — ${route}`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                await page.goto(route, { waitUntil: "networkidle" });
                await setLight(page);

                const readouts = await readInSituGlass(page);
                // A route that paints no body-bearing glass surface is not a counter-
                // example — but the enrolled routes are chosen to paint at least one.
                expect(
                    readouts.length,
                    `${route}: no in-situ glass surface found (the enrolled route must paint at least one body-bearing glass tier)`,
                ).toBeGreaterThan(0);

                for (const r of readouts) {
                    const effBg = effectiveOverWhite(r.surfaceBg);
                    expect(effBg, `${route} ${r.selector}: could not resolve surface bg "${r.surfaceBg}" over white`).not.toBeNull();
                    const ink = parseColor(r.bodyInk);
                    expect(ink, `${route} ${r.selector}: could not parse body ink "${r.bodyInk}"`).not.toBeNull();

                    // (1) BODY register clears its floor over the in-situ-darkened plate
                    // / white — 4.5:1 for content tiers, 3:1 for the large dock glyph.
                    const ratio = contrastRatio([ink![0], ink![1], ink![2]], effBg!);
                    const floor = r.isDock ? AA_LARGE : AA_BODY;
                    expect(
                        ratio,
                        `${route} ${r.selector}: body register is ${ratio.toFixed(2)}:1 over white (ink ${r.bodyInk}, bg ${r.surfaceBg}) — under ${floor}:1. The in-situ self-engage did not lift the body register over light.`,
                    ).toBeGreaterThanOrEqual(floor);

                    // (2) SURFACE SILHOUETTE — the plate-over-white differs from white (the
                    // G2 surface-silhouette truth; the ΔL≈0.01 plate-vanishes baseline RED).
                    const dL = Math.abs(1.0 - relLuminance(effBg!));
                    expect(
                        dL,
                        `${route} ${r.selector}: surface silhouette ΔL is ${dL.toFixed(3)} over white (bg ${r.surfaceBg}) — under the ${DELTA_L_FLOOR} visibility floor (the plate vanishes — the G2 silhouette collapse). The self-engage darken did not fire in-situ.`,
                    ).toBeGreaterThanOrEqual(DELTA_L_FLOOR);

                    // (3) the surface stays TRANSLUCENT (AA by going opaque is a goal-miss).
                    expect(
                        r.translucent,
                        `${route} ${r.selector}: surface went OPAQUE (bg ${r.surfaceBg}) — AA cleared by losing the glass (a goal-miss, not the adaptive darken).`,
                    ).toBe(true);
                }
            });
        }
    }
});
