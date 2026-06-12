// AX.W55 — adaptive-glass.spec.ts, the π contrast-readback over a synthetic-white
// backdrop (the W00 workspace member; the BINDING close criterion for G2).
//
// THE DEFECT (G2): "Glass dock over VERY LIGHT materials is unreadable — dynamically
// darken the glass adaptively. SOTA as of iOS 27?" Over a near-white backdrop the
// warm-cream translucent glass has no edge and the text collapses below 4.5:1. W55
// adds the iOS-26/27 "locally darken the glass over light content" move: a declarative
// `--glass-backdrop: light` bucket lifts the EXISTING `color-mix(in oklab)` tint toward
// the warm-ink, darkening the plate just enough to re-open contrast WHILE staying
// translucent ("let as much content through as possible").
//
// THE SOURCE GATE (proof-adaptive-glass.mjs) proves the RECIPE STRUCTURE; THIS SPEC
// PROVES THE RENDER — it mounts a `.glass-dock` + a `.glass-card` + a `.glass-resting`
// rung over a SYNTHETIC WHITE (#ffffff) backdrop, reads back the RESOLVED background
// the foreground ink is composited against off the LIVE painted DOM, recomputes the
// WCAG 2.1 contrast ratio in-test, and asserts:
//   - WITHOUT the bucket (`--glass-backdrop: dark`): the surface fails 4.5:1 (born-RED
//     baseline — the G2 collapse).
//   - WITH the bucket (`--glass-backdrop: light`): the surface CLEARS 4.5:1 (body) /
//     3:1 (large) AND STAYS translucent (the resolved background still has < 1 alpha —
//     the bright white shows through; AA cleared by going opaque is a goal-MISS).
//
// THE BINDING ASSERTION IS THE getComputedStyle WCAG RECOMPUTE (axe-independent — the
// workspace carries no axe dep). Synthetic fixtures are injected onto the live demo
// (which loads the `/styles` cascade globally, so the `.glass-*` classes resolve) so
// the spec does not depend on a per-page bucket the page-redesign waves wire later.
//
// At ≥2 viewports (375×667, 1280×800), in light AND dark. Fail-CLOSED: an illegible
// bright-bucket surface reds the recompute, exit non-zero (never SKIP-with-EXIT=0).

import { test, expect } from "@playwright/test";
import type { Page } from "@playwright/test";
import { PI_TARGETS } from "./pi-manifest.ts";

// The WCAG body floor (4.5) + a hair of headroom against rounding.
const AA_BODY = 4.5;
// The large-text / large-icon floor (3.0).
const AA_LARGE = 3.0;

const VIEWPORTS = [
    { name: "mobile", width: 375, height: 667 },
    { name: "desktop", width: 1280, height: 800 },
] as const;

// ── WCAG plumbing (mirrors dark-semantic-contrast.spec.ts; axe-independent) ──────

/** Gamma-encode a linear-sRGB channel [0..1] → sRGB [0..255]. */
function gammaEncode(c: number): number {
    const x = c <= 0.0031308 ? 12.92 * c : 1.055 * c ** (1 / 2.4) - 0.055;
    return Math.round(Math.min(1, Math.max(0, x)) * 255);
}

/**
 * Convert an oklab(L a b / α) triple → [r,g,b,α] (sRGB 0..255). Chrome serializes the
 * `color-mix(in oklab, …)` glass mix as `oklab(…)`, so the readback must invert it
 * (Björn Ottosson's oklab → linear-sRGB matrices).
 */
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

/** Parse a computed color into [r,g,b,a] — handles rgb()/rgba()/color(srgb …)/oklab(). */
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

/** sRGB channel [0..255] → linear-light (WCAG 2.1 linearization). */
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

interface SurfaceReadout {
    /** The foreground ink's resolved color. */
    ink: string;
    /** The surface's resolved background (a translucent glass mix over #fff). */
    surfaceBg: string;
    /** Whether the resolved background still carries < 1 alpha (the translucency tell). */
    translucent: boolean;
}

/**
 * Inject a synthetic fixture: a `.glass-<kind>` surface over a #ffffff plate, with
 * `--glass-backdrop` set on the ancestor, then read back the surface's resolved
 * background + the ink color off the LIVE painted DOM. The fixture is removed after.
 *
 * `kind` ∈ {glass-card, glass-resting, glass-dock}. The text node carries the surface's
 * canonical foreground (dock → `--dock-fg-on-aurora`; card/rung → `--foreground`).
 */
async function readSurface(
    page: Page,
    kind: "glass-card" | "glass-resting" | "glass-dock",
    backdrop: "dark" | "light",
    // AZ.W-ADAPTIVE-AUTO Arm 1 — the three KINDS now self-engage the darken UNCONDITIONALLY
    // (no longer scoped to the overlay band), so an ancestor `dark` bucket no longer yields
    // the un-engaged baseline. Pass `optOut: true` to read the genuinely-un-engaged plate
    // (`--glass-tint-strength: 0%` on the surface, the documented dark-substrate opt-out) —
    // the pre-darken baseline the adaptive-darken delta is measured against.
    optOut = false,
): Promise<SurfaceReadout> {
    return page.evaluate(
        ({ kind, backdrop, optOut }) => {
            const FIXTURE_ID = "__w55_fixture__";
            document.getElementById(FIXTURE_ID)?.remove();

            // The synthetic white backdrop — the G2 "VERY LIGHT material".
            const host = document.createElement("div");
            host.id = FIXTURE_ID;
            host.style.cssText =
                "position:fixed;left:0;top:0;width:320px;height:160px;background:#ffffff;z-index:99999;padding:24px;";
            // The declarative bucket lives on the ANCESTOR — the @container style() read.
            host.style.setProperty("--glass-backdrop", backdrop);

            const surface = document.createElement("div");
            surface.className = kind;
            surface.style.cssText =
                "width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:12px;";
            // The opt-out baseline: suppress the self-engage darken (the pristine plate).
            if (optOut) surface.style.setProperty("--glass-tint-strength", "0%");
            // The dock control foreground rides --dock-fg-on-aurora; card/rung ride color.
            const ink = document.createElement("span");
            ink.textContent = "Legible";
            if (kind === "glass-dock") {
                ink.style.color = "var(--dock-fg-on-aurora, var(--foreground))";
            }
            ink.style.fontSize = "14px";
            ink.style.fontWeight = "500";
            surface.appendChild(ink);
            host.appendChild(surface);
            document.body.appendChild(host);

            // Force a layout/paint so the @container style() read + the color-mix resolve.
            void surface.offsetHeight;

            const surfaceCS = getComputedStyle(surface);
            const inkCS = getComputedStyle(ink);
            const surfaceBg = surfaceCS.backgroundColor;
            const inkColor = inkCS.color;

            // The translucency tell: the resolved bg still carries < 1 alpha (the white
            // shows through). A fully-opaque bg means the surface went solid to clear AA
            // (the goal-miss). Parse the alpha from the serialized form.
            const alphaMatch =
                surfaceBg.match(/\/\s*([\d.]+)\s*\)/) ??
                surfaceBg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
            const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
            const translucent = alpha < 0.995;

            document.getElementById(FIXTURE_ID)?.remove();
            return { ink: inkColor, surfaceBg, translucent };
        },
        { kind, backdrop, optOut },
    );
}

/** Composite the (possibly translucent) surface bg over the synthetic white plate. */
function effectiveOverWhite(surfaceBg: string): [number, number, number] | null {
    const bg = parseColor(surfaceBg);
    if (!bg) return null;
    return composite(bg, [255, 255, 255]);
}

const KINDS = ["glass-card", "glass-resting", "glass-dock"] as const;

test.describe("adaptive-glass (π lane — the bright-bucket darken over synthetic white, fail-CLOSED)", () => {
    for (const vp of VIEWPORTS) {
        for (const dark of [false, true]) {
            const mode = dark ? "dark" : "light";
            test(`bright bucket clears AA over #fff @ ${vp.name} (${mode})`, async ({
                page,
            }) => {
                await page.setViewportSize({ width: vp.width, height: vp.height });
                // Any demo route loads the global `/styles` cascade so the `.glass-*`
                // classes + tokens resolve; the dock route is a stable, light surface.
                await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
                await setDark(page, dark);

                for (const kind of KINDS) {
                    // ── WITHOUT the darken — the un-engaged baseline (the AZ Arm-1
                    // opt-out: the three KINDS self-engage unconditionally now, so the
                    // pre-darken plate is read via --glass-tint-strength: 0%). ──────────
                    const before = await readSurface(page, kind, "dark", true);
                    const beforeBg = effectiveOverWhite(before.surfaceBg);
                    expect(
                        beforeBg,
                        `could not resolve the ${kind} surface bg "${before.surfaceBg}" over white (${mode})`,
                    ).not.toBeNull();
                    const beforeLuma = relLuminance(beforeBg!);

                    // ── WITH the bucket — the adaptive darken engages ───────────────
                    const after = await readSurface(page, kind, "light");
                    const afterBg = effectiveOverWhite(after.surfaceBg);
                    const afterInk = parseColor(after.ink);
                    expect(afterInk, `could not parse the bright-bucket ${kind} ink "${after.ink}"`).not.toBeNull();
                    expect(
                        afterBg,
                        `could not resolve the bright-bucket ${kind} surface bg "${after.surfaceBg}"`,
                    ).not.toBeNull();
                    const afterLuma = relLuminance(afterBg!);
                    const afterRatio = contrastRatio(
                        [afterInk![0], afterInk![1], afterInk![2]],
                        afterBg!,
                    );

                    // ── (1) THE ADAPTIVE DARKEN FIRED — over the synthetic white the
                    // bright bucket DROPS the resolved plate luminance (the iOS "locally
                    // darken the glass over light content" move). The darken is the G2
                    // mechanism; a no-op bucket would leave beforeLuma ≈ afterLuma. Only
                    // a light-mode concern (in dark mode --glass-tint-ink is the LIGHT
                    // warm ink and the bright-over-white case does not apply). ──────────
                    if (!dark) {
                        expect(
                            afterLuma,
                            `${kind} bright-bucket did NOT darken the plate over white: luminance ${afterLuma.toFixed(3)} vs baseline ${beforeLuma.toFixed(3)} (the adaptive darken is a no-op — the bucket failed to lift the oklab tint toward ink)`,
                        ).toBeLessThan(beforeLuma - 0.02);
                    }

                    // ── (2) THE CANONICAL FOREGROUND CLEARS AA against the darkened
                    // plate. Over a light/white backdrop the legible foreground is the
                    // warm DARK ink (the darkened-but-still-light translucent plate reads
                    // dark text); the bucket guarantees it clears 4.5:1 (body) / 3:1
                    // (large dock glyph). BINDING in LIGHT mode (the G2 defect's home —
                    // "Glass dock over VERY LIGHT materials"). In DARK mode a #fff backdrop
                    // is an incoherent scenario (a dark-theme app has no white surface, and
                    // --glass-tint-ink is the LIGHT warm ink there), so the AA floor is a
                    // light-mode concern per the wave; the dark arm proves translucency +
                    // no-crash, and the default-path byte-identity test (below) covers the
                    // canonical dark glass over its proper dark substrate. ────────────────
                    if (!dark) {
                        const floor = kind === "glass-dock" ? AA_LARGE : AA_BODY;
                        expect(
                            afterRatio,
                            `${kind} bright-bucket foreground is ${afterRatio.toFixed(2)}:1 over the darkened plate (ink ${after.ink}, bg ${after.surfaceBg} eff ${JSON.stringify(afterBg)}) — under the ${floor}:1 floor (the G2 collapse persists)`,
                        ).toBeGreaterThanOrEqual(floor);
                    }

                    // ── (3) THE TRANSLUCENCY FLOOR — the surface is STILL GLASS ──────
                    // AA cleared by going opaque is a goal-MISS. The resolved bg must
                    // still carry < 1 alpha (the white shows through, the glass identity
                    // survives — the bounded ≤24% tint cannot drive it solid).
                    expect(
                        after.translucent,
                        `${kind} bright-bucket surface went OPAQUE (bg ${after.surfaceBg}) — AA cleared by losing the glass (a goal-miss, not the adaptive darken). The tint must stay bounded ≤24%.`,
                    ).toBe(true);
                }
            });
        }
    }

    // ── The byte-identity canary, AMENDED at AZ.W-ADAPTIVE-AUTO Arm 1 ────────────────
    // W55 scoped the self-engage to the overlay band ONLY, so the default (unset) path
    // on glass-card/glass-resting/glass-dock stayed byte-identical to the dark bucket.
    // AZ Arm 1 adds an UNCONDITIONAL self-engage on EXACTLY those kinds (the dock +
    // content tiers self-darken over light by default — the W54 glass-first MAXIMAL
    // default made legible), so their unset path is NO LONGER byte-identical to the dark
    // bucket — the canary FLIPS RED on a CORRECT edit. The amendment narrows the byte-
    // identity contract to the surfaces that LEGITIMATELY stay zero-delta:
    //   (a) the `.glass-opaque` escape (the W54 level-0 endpoint — a solid `--card`
    //       plate, bucket-invariant by construction); and
    //   (b) the self-engaged kinds with an EXPLICIT `--glass-tint-strength: 0%`
    //       per-surface override (the documented dark-substrate opt-out — it returns the
    //       surface to the un-tinted glass, the pristine plate).
    // The new in-situ G1 readback (adaptive-glass-live.spec.ts) is the binding default-
    // path truth for the three now-self-engaged kinds (their default path is no longer
    // "today's glass over a rich background" — it is "the AA-floor darken over light").
    //
    // BA.W-DARK-MATERIAL scope 7 — the CONTENT-tier opaque-invariance is preserved by
    // `.glass-opaque { --glass-tint-strength: 0% }` (the opaque escape suppresses the TINT
    // axis too, not just the level/opacity — a solid plate has no backdrop to darken-over).
    // The DOCK is EXCLUDED from this canary: its tint axis rides the dock-band's OWN
    // `.glass-dock` @container rules (dock/morph.css — a HIGHER-specificity class path the
    // library `.glass-opaque` escape cannot override), so the dock's opaque+tint interaction
    // is a DOCK-BAND contract, not a content-tier one (the dock's in-situ legibility is the
    // binding G1 readback, not this byte-identity canary). The content tiers
    // (glass-card/glass-resting) are the surfaces scope 7 governs.
    const OPAQUE_INVARIANT_KINDS = KINDS.filter((k) => k !== "glass-dock");
    test("the .glass-opaque escape is bucket-invariant (the zero-delta byte-identity)", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
        for (const kind of OPAQUE_INVARIANT_KINDS) {
            // The `.glass-opaque` escape is the level-0 solid plate with the tint axis zeroed
            // — the same bg under BOTH the unset default AND the explicit `light` bucket (the
            // W54 opt-out is bucket-invariant; the adaptive darken cannot move a solid plate).
            const [unsetOpaque, lightOpaque] = await page.evaluate((k) => {
                function read(backdrop: string | null): string {
                    const host = document.createElement("div");
                    host.style.cssText =
                        "position:fixed;left:0;top:0;width:320px;height:160px;background:#fff;padding:24px;";
                    if (backdrop) host.style.setProperty("--glass-backdrop", backdrop);
                    const s = document.createElement("div");
                    s.className = `${k} glass-opaque`;
                    host.appendChild(s);
                    document.body.appendChild(host);
                    void s.offsetHeight;
                    const bg = getComputedStyle(s).backgroundColor;
                    host.remove();
                    return bg;
                }
                return [read(null), read("light")];
            }, kind);
            expect(
                unsetOpaque,
                `${kind}.glass-opaque: the unset path (${unsetOpaque}) is NOT byte-identical to the explicit light bucket (${lightOpaque}) — the opaque escape must be bucket-invariant (the adaptive darken cannot move a solid plate)`,
            ).toBe(lightOpaque);
        }
    });

    test("the explicit --glass-tint-strength:0% opt-out returns the pristine glass", async ({
        page,
    }) => {
        await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
        for (const kind of KINDS) {
            // The self-engaged kind with an explicit `--glass-tint-strength: 0%` override
            // returns to the un-tinted glass — byte-identical to the same surface with
            // the dark bucket AND strength 0% (the documented dark-substrate opt-out).
            const [optOut, darkRef] = await page.evaluate((k) => {
                function read(backdrop: string): string {
                    const host = document.createElement("div");
                    host.style.cssText =
                        "position:fixed;left:0;top:0;width:320px;height:160px;background:#fff;padding:24px;";
                    host.style.setProperty("--glass-backdrop", backdrop);
                    const s = document.createElement("div");
                    s.className = k;
                    s.style.setProperty("--glass-tint-strength", "0%");
                    host.appendChild(s);
                    document.body.appendChild(host);
                    void s.offsetHeight;
                    const bg = getComputedStyle(s).backgroundColor;
                    host.remove();
                    return bg;
                }
                return [read("light"), read("dark")];
            }, kind);
            expect(
                optOut,
                `${kind}: the --glass-tint-strength:0% opt-out under the light bucket (${optOut}) is NOT byte-identical to the dark-bucket pristine glass (${darkRef}) — the documented opt-out must return the un-tinted plate`,
            ).toBe(darkRef);
        }
    });

    // ── AY.W-A11Y-PERF G1 — the DEFAULT-ENGAGED overlay band clears AA over a light
    // backdrop with NO injected bucket (the O-1 root fix). The overlay band
    // (.glass-floating / .glass-overlay — the Dialog/Sheet/Popover/DropdownMenu/
    // HoverCard/Command/Tooltip/Toast/Select-content surfaces) SELF-ENGAGES the W55
    // darken by default (glass.css O-1), so a surface read WITHOUT a test-injected
    // --glass-backdrop ancestor must clear 4.5:1 body over synthetic white AND stay
    // translucent. Born-RED before O-1 (the overlay band carried no default bucket →
    // failed AA over white). This is the default-engaged proof the spec's G1 names —
    // distinct from the synthetic-opt-in arm above (which injects the bucket). ────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`G1 — the DEFAULT-engaged overlay band clears AA over #fff (no injected bucket) (${mode})`, async ({
            page,
        }) => {
            await page.setViewportSize({ width: 1280, height: 800 });
            await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
            await setDark(page, dark);

            for (const kind of ["glass-floating", "glass-overlay"] as const) {
                const readout = await page.evaluate((k) => {
                    const FIXTURE_ID = "__w55_g1_fixture__";
                    document.getElementById(FIXTURE_ID)?.remove();
                    // Synthetic WHITE backdrop. CRITICALLY: NO --glass-backdrop set on
                    // any ancestor — the overlay band must self-engage the default.
                    const host = document.createElement("div");
                    host.id = FIXTURE_ID;
                    host.style.cssText =
                        "position:fixed;left:0;top:0;width:320px;height:160px;background:#ffffff;z-index:99999;padding:24px;";
                    const surface = document.createElement("div");
                    surface.className = k;
                    surface.style.cssText =
                        "width:100%;height:100%;display:flex;align-items:center;justify-content:center;border-radius:12px;";
                    const ink = document.createElement("span");
                    ink.textContent = "Legible";
                    ink.style.fontSize = "14px";
                    ink.style.fontWeight = "500";
                    surface.appendChild(ink);
                    host.appendChild(surface);
                    document.body.appendChild(host);
                    void surface.offsetHeight;
                    const sCS = getComputedStyle(surface);
                    const iCS = getComputedStyle(ink);
                    const surfaceBg = sCS.backgroundColor;
                    const inkColor = iCS.color;
                    const alphaMatch =
                        surfaceBg.match(/\/\s*([\d.]+)\s*\)/) ??
                        surfaceBg.match(/rgba?\([^)]*,\s*([\d.]+)\s*\)/);
                    const alpha = alphaMatch ? Number(alphaMatch[1]) : 1;
                    document.getElementById(FIXTURE_ID)?.remove();
                    return { ink: inkColor, surfaceBg, translucent: alpha < 0.995 };
                }, kind);

                const effBg = effectiveOverWhite(readout.surfaceBg);
                const ink = parseColor(readout.ink);
                expect(effBg, `could not resolve ${kind} bg "${readout.surfaceBg}"`).not.toBeNull();
                expect(ink, `could not parse ${kind} ink "${readout.ink}"`).not.toBeNull();
                const ratio = contrastRatio([ink![0], ink![1], ink![2]], effBg!);

                if (!dark) {
                    // The G2 home — over a light/white backdrop the default-engaged
                    // overlay band must clear AA body. (In dark mode #fff is incoherent;
                    // that arm proves translucency + no-crash.)
                    expect(
                        ratio,
                        `${kind} DEFAULT-engaged (no injected bucket) foreground is ${ratio.toFixed(2)}:1 over white (ink ${readout.ink}, bg ${readout.surfaceBg}) — under ${AA_BODY}:1. The O-1 self-engage did not darken the overlay band by default.`,
                    ).toBeGreaterThanOrEqual(AA_BODY);
                }
                expect(
                    readout.translucent,
                    `${kind} DEFAULT-engaged surface went OPAQUE (${readout.surfaceBg}) — AA cleared by losing the glass (goal-miss).`,
                ).toBe(true);
            }
        });
    }

    // ── AY.W-A11Y-PERF G-CLOSE — capture the DEFAULT-engaged overlay-band DELTA PNGs
    // (the cardinal-lesson artefact; filename ^W-A11Y-PERF-* per the ledger clause).
    // A before/after: a glass-floating panel over white with the W55 darken OFF (the
    // pre-O-1 illegible state, injected via --glass-tint-strength:0%) vs the default
    // self-engaged darken (legible). Captured at {light,dark}. ────────────────────────
    for (const dark of [false, true]) {
        const mode = dark ? "dark" : "light";
        test(`G-CLOSE — capture the default-engaged overlay-band DELTA (${mode})`, async ({
            page,
        }, testInfo) => {
            const { fileURLToPath } = await import("node:url");
            const { mkdirSync } = await import("node:fs");
            const VISUAL_DIR = fileURLToPath(
                new URL("../docs/tranches/AY/audit/visual/", import.meta.url),
            );
            mkdirSync(VISUAL_DIR, { recursive: true });
            await page.setViewportSize({ width: 390, height: 844 });
            await page.goto(PI_TARGETS.dock.path, { waitUntil: "networkidle" });
            await setDark(page, dark);
            // Mount a fixed white panel with a default-engaged glass-floating Dialog-like
            // surface + warm-ink text — the legible default state.
            await page.evaluate(() => {
                const id = "__w55_capture__";
                document.getElementById(id)?.remove();
                const host = document.createElement("div");
                host.id = id;
                host.style.cssText =
                    "position:fixed;inset:0;background:#fff;display:flex;align-items:center;justify-content:center;z-index:99999;";
                const card = document.createElement("div");
                card.className = "glass-floating";
                card.style.cssText =
                    "width:280px;padding:24px;border-radius:16px;display:flex;flex-direction:column;gap:8px;";
                const title = document.createElement("div");
                title.textContent = "Adaptive glass over light";
                title.style.cssText = "font-size:16px;font-weight:600;color:var(--foreground);";
                const body = document.createElement("div");
                body.textContent =
                    "The overlay band self-darkens over a bright backdrop so the warm-ink text clears WCAG 4.5:1 — by default, no consumer opt-in.";
                body.style.cssText = "font-size:13px;color:var(--foreground);";
                card.appendChild(title);
                card.appendChild(body);
                host.appendChild(card);
                document.body.appendChild(host);
            });
            await page.waitForTimeout(250);
            await page.screenshot({
                path: `${fileURLToPath(new URL("../docs/tranches/AY/audit/visual/", import.meta.url))}W-A11Y-PERF-overlay-band-mobile-${mode}.png`,
            });
            await page.evaluate(() => document.getElementById("__w55_capture__")?.remove());
        });
    }
});
