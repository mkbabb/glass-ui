// BB.W-ON-GLASS-FG — on-glass-fg.spec.ts, the π contrast-readback for the surface-
// aware FOREGROUND register over a REAL busy backdrop (the BINDING close criterion for
// the N13 "dark-theme whisper collapse").
//
// THE DEFECT (N13): --muted-foreground is calibrated against the CANVAS (--neutral-5,
// "AA vs page"), but the glass-first MAXIMAL default (AX.W54) makes a caption rendering
// on a TRANSLUCENT content-tier glass plate the common case — the plate composites the
// backdrop UP, the effective background luminance rises, and the muted ink's contrast
// COLLAPSES on its own surface (the speedtest ask measured 1.15-3.29:1 in dark theme).
//
// THE SOURCE GATE (proof-on-glass-fg.mjs) proves the RECIPE STRUCTURE; THIS SPEC PROVES
// THE RENDER — it mounts a `.glass-card` (the calm-light content tier) carrying a muted
// caption + a body-ink line + an `.input-pill` well + a Progress meter over the CALM
// CONTENT SUBSTRATE (the resolved `--neutral-0` page surface — the case the calm-tier
// re-point GOVERNS: a content card on the page, where the translucent plate composites
// the page UP and the page-calibrated muted COLLAPSES on its own surface, NOT a declared-
// bright GL field that engages the BA bright bucket — the third-state distinction). It
// reads back the RESOLVED colors off the LIVE painted DOM, composites them over the
// substrate, recomputes the WCAG 2.1 contrast ratio in-test, and asserts:
//   (a) the muted caption clears ≥4.5:1 against the COMPOSITED plate (NOT the page) in
//       BOTH modes — the 1.15-3.29:1 collapse measured GONE;
//   (b) the muted register stays QUIETER than the body --foreground ink (the quiet-
//       subordinate hierarchy preserved — the on-glass rung is BETWEEN page-muted and
//       full-ink, NOT a blanket lift);
//   (c) the input well text clears AA over the well-on-glass composite;
//   (d) the Progress fill-vs-track silhouette reads over a glass plate (a contrast ΔL
//       between the track and the fill).
// PLUS the bright-bucket case (a darkened plate over a bright backdrop) proving the BA
// full-ink lift STILL fires there (the third state did NOT regress the second).
//
// THE BINDING ASSERTION IS THE getComputedStyle WCAG RECOMPUTE (axe-independent). At
// ≥2 viewports (375×667, 1280×800), in light AND dark. Fail-CLOSED: a caption below AA,
// or a collapsed hierarchy, or a regressed bright bucket reds the recompute, exit
// non-zero (never SKIP-with-EXIT=0).
//
// FRESHNESS HEADER (the AZ-form DELTA capture): the paired W-ON-GLASS-FG-DELTA.md
// carries capture date / HEAD sha / route — the binding-paint evidence the cardinal
// lesson demands rides W-REFLECT3.

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

// The WCAG body floor (4.5) + a hair of headroom against rounding.
const AA_BODY = 4.5;

const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// ── WCAG plumbing (mirrors adaptive-glass.spec.ts; axe-independent) ───────────────

/** Gamma-encode a linear-sRGB channel [0..1] → sRGB [0..255]. */
function gammaEncode(c: number): number {
    const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, x)) * 255);
}

/** oklab(L a b / α) → [r,g,b,α] (sRGB 0..255) — Björn Ottosson's matrices (Chrome
    serializes the color-mix(in oklab, …) glass mix as oklab(…)). */
function oklabToRgba(
    L: number,
    a: number,
    b: number,
    alpha: number,
): [number, number, number, number] {
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

/** Parse a computed color → [r,g,b,a] (rgb()/rgba()/color(srgb …)/oklab()). */
function parseColor(str: string): [number, number, number, number] | null {
    if (!str) return null;
    const oklab = str.match(
        /oklab\(\s*(-?[\d.]+%?)\s+(-?[\d.]+%?)\s+(-?[\d.]+%?)(?:\s*\/\s*([\d.]+%?))?\s*\)/i,
    );
    if (oklab) {
        const num = (v: string, scale = 1) =>
            v.endsWith("%") ? (Number(v.slice(0, -1)) / 100) * scale : Number(v);
        const L = num(oklab[1]!);
        const a = num(oklab[2]!);
        const b = num(oklab[3]!);
        const alpha = oklab[4] === undefined ? 1 : num(oklab[4], 1);
        return oklabToRgba(L, a, b, alpha);
    }
    const srgb = str.match(
        /color\(\s*srgb\s+([\d.]+)\s+([\d.]+)\s+([\d.]+)(?:\s*\/\s*([\d.]+))?\s*\)/i,
    );
    if (srgb) {
        return [
            Math.round(Number(srgb[1]) * 255),
            Math.round(Number(srgb[2]) * 255),
            Math.round(Number(srgb[3]) * 255),
            srgb[4] === undefined ? 1 : Number(srgb[4]),
        ];
    }
    const rgb = str.match(
        /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)(?:[,\s/]+([\d.]+))?/i,
    );
    if (rgb) {
        return [
            Number(rgb[1]),
            Number(rgb[2]),
            Number(rgb[3]),
            rgb[4] === undefined ? 1 : Number(rgb[4]),
        ];
    }
    return null;
}

/** Alpha-composite `over` (with its alpha) onto opaque `base` — the source-over rule. */
function composite(
    over: [number, number, number, number],
    base: [number, number, number],
): [number, number, number] {
    const a = over[3];
    return [
        Math.round(over[0] * a + base[0] * (1 - a)),
        Math.round(over[1] * a + base[1] * (1 - a)),
        Math.round(over[2] * a + base[2] * (1 - a)),
    ];
}

/** sRGB channel [0..255] → linear-light (WCAG 2.1). */
function linearize(c: number): number {
    const x = c / 255;
    return x <= 0.03928 ? x / 12.92 : ((x + 0.055) / 1.055) ** 2.4;
}

/** WCAG relative luminance. */
function relLuminance([r, g, b]: [number, number, number]): number {
    return 0.2126 * linearize(r) + 0.7152 * linearize(g) + 0.0722 * linearize(b);
}

/** WCAG 2.1 contrast ratio between two rgb triples. */
function contrastRatio(
    a: [number, number, number],
    b: [number, number, number],
): number {
    const lA = relLuminance(a);
    const lB = relLuminance(b);
    const hi = Math.max(lA, lB);
    const lo = Math.min(lA, lB);
    return (hi + 0.05) / (lo + 0.05);
}

/** Toggle `.dark` on <html> + let the token cascade re-resolve. */
async function setDark(page: Page, dark: boolean): Promise<void> {
    await page.evaluate((on) => {
        document.documentElement.classList.toggle("dark", on);
    }, dark);
    await page.waitForTimeout(150);
}

/** Resolve the live page surface (--neutral-0) → an opaque [r,g,b] the calm content
    plate composites over (the calm-tier substrate the re-point governs). */
async function readPageSurface(
    page: Page,
): Promise<[number, number, number] | null> {
    const raw = await page.evaluate(() => {
        const probe = document.createElement("div");
        probe.style.cssText = "background:var(--neutral-0);position:fixed;left:-9999px;";
        document.body.appendChild(probe);
        const c = getComputedStyle(probe).backgroundColor;
        probe.remove();
        return c;
    });
    const c = parseColor(raw);
    return c ? [c[0], c[1], c[2]] : null;
}

interface OnGlassReadout {
    /** the on-glass muted caption color. */
    muted: string;
    /** the body --foreground ink color (the subordinate-hierarchy reference). */
    body: string;
    /** the input well's resolved fill. */
    wellBg: string;
    /** the input well's text color. */
    wellInk: string;
    /** the Progress track resolved fill. */
    trackBg: string;
    /** the Progress fill (indicator) resolved color. */
    fillBg: string;
    /** the card plate's resolved (translucent) bg. */
    plateBg: string;
}

/**
 * Inject a synthetic fixture: a `.glass-card` (the calm-light content tier — NO ancestor
 * `--glass-backdrop: light` bucket, so the calm floor + the on-glass re-point fire, NOT
 * the bright-bucket full-ink lift) over a BUSY backdrop, carrying a muted caption, a body
 * line, an `.input-pill` well, and a Progress meter (a track div + a fill div). Read back
 * each surface's resolved colors off the LIVE painted DOM. The fixture is removed after.
 */
async function readOnGlass(
    page: Page,
    backdrop: readonly [number, number, number],
): Promise<OnGlassReadout> {
    return page.evaluate((bg) => {
        const FIXTURE_ID = "__ogfg_fixture__";
        document.getElementById(FIXTURE_ID)?.remove();

        const host = document.createElement("div");
        host.id = FIXTURE_ID;
        host.style.cssText = `position:fixed;left:0;top:0;width:380px;height:300px;background:rgb(${bg[0]} ${bg[1]} ${bg[2]});z-index:99999;padding:20px;`;
        // NO --glass-backdrop bucket on the ancestor — the calm-light content-tier floor +
        // the on-glass re-point are what fire here (NOT the bright-bucket full-ink lift).

        const card = document.createElement("div");
        card.className = "glass-card";
        card.style.cssText =
            "width:100%;height:100%;border-radius:16px;padding:18px;display:flex;flex-direction:column;gap:10px;";

        const body = document.createElement("p");
        body.textContent = "Body ink line — the foreground register.";
        body.style.cssText = "color:var(--foreground);font-size:14px;margin:0;";

        const muted = document.createElement("p");
        muted.textContent = "Muted caption — the quiet-subordinate register.";
        muted.style.cssText = "color:var(--muted-foreground);font-size:13px;margin:0;";

        const well = document.createElement("input");
        well.className = "input-pill [--control-surface-bg:var(--input-on-glass)]";
        well.value = "Field text in the well";
        // Mirror the SFC re-point so the synthetic well reads the same register.
        well.style.setProperty("--control-surface-bg", "var(--input-on-glass)");
        well.style.color = "var(--foreground)";

        const track = document.createElement("div");
        track.style.cssText =
            "position:relative;height:16px;border-radius:9999px;overflow:hidden;background:var(--progress-track,var(--progress-track-on-glass));";
        const fill = document.createElement("div");
        fill.style.cssText =
            "position:absolute;inset:0;width:60%;border-radius:9999px;background:var(--progress-fill,var(--primary));";
        track.appendChild(fill);

        card.append(body, muted, well, track);
        host.appendChild(card);
        document.body.appendChild(host);

        void card.offsetHeight; // force the @container/color-mix resolve

        const cs = (el: Element) => getComputedStyle(el);
        const out = {
            muted: cs(muted).color,
            body: cs(body).color,
            wellBg: cs(well).backgroundColor,
            wellInk: cs(well).color,
            trackBg: cs(track).backgroundColor,
            fillBg: cs(fill).backgroundColor,
            plateBg: cs(card).backgroundColor,
        };
        document.getElementById(FIXTURE_ID)?.remove();
        return out;
    }, backdrop);
}

/** Composite the card plate over the busy backdrop → the effective bg behind the text. */
function effectivePlate(
    plateBg: string,
    backdrop: readonly [number, number, number],
): [number, number, number] | null {
    const bg = parseColor(plateBg);
    if (!bg) return null;
    return composite(bg, [backdrop[0], backdrop[1], backdrop[2]]);
}

test.describe("on-glass-fg (π lane — the surface-aware foreground register over a busy backdrop, fail-CLOSED)", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`on-glass muted/well/track clears AA over the composited plate @ ${vp.name} (${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                // Any demo route loads the global `/styles` cascade so the `.glass-*`
                // classes + tokens resolve; the dock route is a stable surface.
                await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
                await setDark(page, dark);

                // The calm-tier substrate is the live page surface (--neutral-0) — the
                // case the on-glass re-point governs (NOT a declared-bright GL field).
                const substrate = await readPageSurface(page);
                expect(
                    substrate,
                    `could not resolve the page surface --neutral-0 (${mode})`,
                ).not.toBeNull();

                const r = await readOnGlass(page, substrate!);

                const muted = parseColor(r.muted);
                const body = parseColor(r.body);
                const plate = effectivePlate(r.plateBg, substrate!);
                expect(muted, `could not parse the muted color "${r.muted}" (${mode})`).not.toBeNull();
                expect(body, `could not parse the body color "${r.body}" (${mode})`).not.toBeNull();
                expect(
                    plate,
                    `could not resolve the card plate "${r.plateBg}" over the backdrop (${mode})`,
                ).not.toBeNull();

                // ── (a) THE MUTED CAPTION CLEARS AA against the COMPOSITED plate (NOT
                // the page). The 1.15-3.29:1 dark-theme collapse measured GONE. ─────────
                const mutedRatio = contrastRatio(
                    [muted![0], muted![1], muted![2]],
                    plate!,
                );
                expect(
                    mutedRatio,
                    `the on-glass muted caption is ${mutedRatio.toFixed(2)}:1 over the composited plate (muted ${r.muted}, plate eff ${JSON.stringify(plate)}) — under the ${AA_BODY}:1 floor (the whisper collapse persists, ${mode})`,
                ).toBeGreaterThanOrEqual(AA_BODY);

                // ── (b) THE QUIET-SUBORDINATE HIERARCHY is preserved — the muted register
                // stays QUIETER than the body --foreground ink (its contrast over the plate
                // is LOWER than the body ink's). The on-glass rung is BETWEEN page-muted and
                // full-ink — NOT a blanket lift (which the bright bucket already does). ──
                const bodyRatio = contrastRatio([body![0], body![1], body![2]], plate!);
                expect(
                    mutedRatio,
                    `the on-glass muted (${mutedRatio.toFixed(2)}:1) is NOT subordinate to the body ink (${bodyRatio.toFixed(2)}:1) over the plate — the quiet-subordinate hierarchy collapsed (the value went too far toward full ink, ${mode})`,
                ).toBeLessThan(bodyRatio);

                // ── (c) THE INPUT WELL TEXT clears AA over the well-on-glass composite ──
                const wellInk = parseColor(r.wellInk);
                const wellBg = parseColor(r.wellBg);
                expect(wellInk, `could not parse the well ink "${r.wellInk}"`).not.toBeNull();
                expect(wellBg, `could not parse the well bg "${r.wellBg}"`).not.toBeNull();
                // composite the (possibly translucent) well fill over the effective plate.
                const wellEff = composite(wellBg!, plate!);
                const wellRatio = contrastRatio(
                    [wellInk![0], wellInk![1], wellInk![2]],
                    wellEff,
                );
                expect(
                    wellRatio,
                    `the input well text is ${wellRatio.toFixed(2)}:1 over the well-on-glass composite (ink ${r.wellInk}, well ${r.wellBg} over plate ${JSON.stringify(plate)}) — under the ${AA_BODY}:1 floor (${mode})`,
                ).toBeGreaterThanOrEqual(AA_BODY);

                // ── (d) THE PROGRESS FILL-VS-TRACK SILHOUETTE reads over the glass plate —
                // a contrast between the track and the fill (the recessed channel reads
                // distinct from the indicator). ────────────────────────────────────────
                const trackBg = parseColor(r.trackBg);
                const fillBg = parseColor(r.fillBg);
                expect(trackBg, `could not parse the track "${r.trackBg}"`).not.toBeNull();
                expect(fillBg, `could not parse the fill "${r.fillBg}"`).not.toBeNull();
                const trackEff = composite(trackBg!, plate!);
                const fillEff = composite(fillBg!, plate!);
                const silhouette = contrastRatio(trackEff, fillEff);
                expect(
                    silhouette,
                    `the Progress fill-vs-track silhouette is ${silhouette.toFixed(2)}:1 over the glass plate (track ${r.trackBg}, fill ${r.fillBg}) — too faint to read (the meter washes out, ${mode})`,
                ).toBeGreaterThanOrEqual(1.4);
            });
        }
    }

    // ── The bright-bucket UN-REGRESSION case — the third state did NOT regress the
    // second. Over a DECLARED bright backdrop the BA full-ink lift STILL fires on the
    // content tier (the @container --glass-backdrop:light bucket lifts --muted-foreground
    // → --foreground, winning by class specificity over the zero-specificity calm
    // :where() re-point). The muted register resolves the FULL ink there, NOT the on-
    // glass rung. Light-mode only (the bright-over-white case is a light-mode concern). ─
    test("the BA bright-bucket full-ink lift STILL wins on a declared-bright content tier", async ({
        page,
    }) => {
        await page.setViewportSize({ width: 1280, height: 800 });
        await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
        await setDark(page, false);

        const read = await page.evaluate(() => {
            const ID = "__ogfg_bright__";
            document.getElementById(ID)?.remove();
            const host = document.createElement("div");
            host.id = ID;
            host.style.cssText =
                "position:fixed;left:0;top:0;width:320px;height:160px;background:#ffffff;z-index:99999;padding:20px;";
            // THE DECLARED BRIGHT BUCKET on the ancestor — the @container style() engages.
            host.style.setProperty("--glass-backdrop", "light");
            const card = document.createElement("div");
            card.className = "glass-card";
            card.style.cssText =
                "width:100%;height:100%;border-radius:12px;padding:14px;";
            const muted = document.createElement("p");
            muted.textContent = "Muted on a darkened bright-bucket plate.";
            muted.style.cssText = "color:var(--muted-foreground);margin:0;";
            const body = document.createElement("p");
            body.textContent = "Body.";
            body.style.cssText = "color:var(--foreground);margin:0;";
            card.append(muted, body);
            host.appendChild(card);
            document.body.appendChild(host);
            void card.offsetHeight;
            const out = {
                muted: getComputedStyle(muted).color,
                body: getComputedStyle(body).color,
            };
            document.getElementById(ID)?.remove();
            return out;
        });

        const muted = parseColor(read.muted);
        const body = parseColor(read.body);
        expect(muted, `could not parse bright-bucket muted "${read.muted}"`).not.toBeNull();
        expect(body, `could not parse bright-bucket body "${read.body}"`).not.toBeNull();
        // Under the bright bucket the muted register is LIFTED to the FULL ink — it
        // resolves the SAME color as --foreground (within a small per-channel tolerance,
        // accounting for the contrast-color() refinement on supporting engines). The on-
        // glass rung (a clearly-lighter muted) would NOT match the body ink.
        const dist = Math.abs(muted![0] - body![0]) +
            Math.abs(muted![1] - body![1]) +
            Math.abs(muted![2] - body![2]);
        expect(
            dist,
            `the bright-bucket muted (${read.muted}) did NOT lift to the full body ink (${read.body}) — the third state REGRESSED the bright-bucket full-ink lift (channel distance ${dist}, want ≤ 24)`,
        ).toBeLessThanOrEqual(24);
    });
});
