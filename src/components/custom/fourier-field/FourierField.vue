<script setup lang="ts">
import { onMounted, ref, useTemplateRef, watch } from "vue";
import { useCanvas2D } from "../../../composables/glass/canvas2d";
import { useGlobalDark } from "../../../composables/dark";
import { mulberry32, hashString } from "../../../utils/prng";
import {
    cssToOklch,
    deriveHue,
    oklchToGammaRgb,
    type ColorResolver,
} from "../../../composables/color";
import {
    makeEllipticSpectrum,
    positionsAt,
    type BasisComponent,
} from "./math";

/**
 * FourierField — a Fourier epicycle field on a Canvas2D surface, a sibling
 * primitive to Aurora and GooBlob. A seeded elliptic spectrum reconstructs a
 * slow, never-ending closed curve via the inverse DFT; a fading comet trail
 * chases the curve's head, and (in the `hero` preset) the nested epicycle
 * circles and arms draw underneath in a harmonious second hue. It composes the
 * `useCanvas2D` substrate, so it inherits the offscreen / tab-hidden /
 * reduced-motion freeze for free — no hand-rolled RAF-park.
 *
 * Color resolves through the same INJECTED `colorResolver` seam as GooBlob: the
 * field paints the gamma-sRGB triple it returns. The prop is REQUIRED — pass
 * `defaultBlobColorResolver` from `@mkbabb/glass-ui/color` so a `var()` /
 * `light-dark()` token, an `oklch()` / `hsl()` / hex string all resolve. A
 * `var()` token is first resolved to a concrete `rgb()` against the host's
 * inherited color-scheme, then re-resolved on a color change AND on a dark-mode
 * toggle so the field retints with the theme.
 *
 * `variant` is the configuration BUNDLE, not a recolour of one curve: `hero`
 * draws a few big phasors with the epicycles ON and a warm trail feel; `final`
 * draws a denser elliptic spectrum with the epicycles OFF. One engine, two
 * presets. The hue itself always comes from the consumer's `color`.
 */
const {
    variant = "hero",
    color,
    colorResolver,
    seed = "",
    freeze = false,
    intensity = 1,
} = defineProps<{
    /** Configuration bundle. `hero` = epicycles on, fewer harmonics; `final` = epicycles off, denser. Default `hero`. */
    variant?: "hero" | "final";
    /** Base CSS color (any form the resolver understands; a `var()`/`light-dark()` token resolves against the host). */
    color: string;
    /** REQUIRED color seam — resolves a concrete color to a gamma-sRGB [r,g,b] triple in [0,1]. */
    colorResolver: ColorResolver;
    /** Extra seed mixed into the spectrum PRNG for a unique-but-reproducible curve. Default "". */
    seed?: string;
    /** When true, paint ONE static deterministic best-frame and never animate (the capture/export lever). Default false. */
    freeze?: boolean;
    /** Outer loudness envelope (the Aurora `opacityCeiling` shape). Scales the
     *  resolved `peakAlpha`/`headGlowAlpha` at the PAINT layer (a per-LAYER
     *  multiply, not a uniform CSS opacity). Default 1 (the bundle's resting
     *  loudness); clamped [0, 2] — the field's ~2 upper bound lets a hero push
     *  brighter than the recessed default without runaway. */
    intensity?: number;
}>();

// Clamp the loudness envelope. Aurora clamps `opacityCeiling` to [0,1]; the
// field's loudness is per-LAYER, so the ~2 ceiling lets a hero overdrive the
// recessed default without an unbounded runaway (W43 §2.3).
const intensityClamped = Math.max(0, Math.min(2, intensity));

interface VariantPreset {
    /** Higher-order harmonics layered over the dominant counter-rotating pair. */
    harmonics: number;
    /** Peak magnitude of those harmonics relative to the dominant phasor. */
    harmonicScale: number;
    /** Draw the nested epicycle circles + arms underneath the curve. */
    epicycles: boolean;
    /** Comet-trail capacity (frames of head history). ~1/3 of the period so the
     *  comet reads as a substantial arc, not a stub (the fourier-analysis bar). */
    trailLength: number;
    /** Hue offset (degrees) of the epicycle second hue away from the outline hue. */
    epicycleHueShift: number;
    /** Forward-clock period for one full curve traversal, in ms. */
    durationMs: number;
    /** A constant per-variant seed used under `freeze` so a capture is deterministic. */
    frozenSeed: string;
    /** The parameter `t` of the static best-frame painted under `freeze`. */
    frozenT: number;

    // ── The render BUNDLE (W-FF3 — the fourier-analysis renderer's procedural
    // sibling register: a PRESENT stroke weight, a real phosphor glow in BOTH
    // modes, a glowing comet head, rainbow epicycle scaffolding). Every paint
    // magnitude is a per-variant field scaled by the ONE outer `intensity` prop —
    // the variant IS the bundle.
    /** Comet-trail PEAK alpha (the head segment). The reference trail rides ~0.9
     *  near-opaque — present, not the prior 0.45 hairline whisper. */
    peakAlpha: number;
    /** Trail stroke weight in CSS px (the reference is a BOLD 3.5px stroke, not
     *  the prior 1.6 hairline). The single biggest faintness lever. */
    trailWidth: number;
    /** Head-glow alpha — the STRONGEST layer (head-forward: > peakAlpha). */
    headGlowAlpha: number;
    /** Head-glow `shadowBlur` bloom radius, in px. */
    headGlowBlur: number;
    /** The comet HEAD DOT radius in CSS px (the reference's glowing tip — a
     *  saturated core + white highlight + soft halo). 0 disables it. */
    headDotRadius: number;
    /** Epicycle scaffolding alphas ÷ peak (hero only; {0,0} disables the scaffold).
     *  The reference circles/arms are PRESENT (≈0.5/0.75), not the prior 0.18 ghost. */
    epicycleRatios: { circle: number; arm: number };
    /** Epicycle circle / arm stroke weights in CSS px (the reference uses a bold
     *  ≈2.5/2 chain, the joints carry filled dots). */
    epicycleWidths: { circle: number; arm: number };
    /** Paint the epicycle chain as a rainbow across the spectrum (the
     *  fourier-analysis signature) vs one analogous second hue. Hero only. */
    epicycleRainbow: boolean;
    /** Trail persistence exponent — SOFT (1..2), never the quadratic that kills the body. */
    trailFadeExp: number;
    /** Min trail alpha ÷ peak — the body survives, never decays to 0. The
     *  reference body reads near-uniform; the floor sits HIGH (≈0.35) so the
     *  comet body has real presence on cream too (the light-mode floor fork). */
    trailFloor: number;
}

const PRESETS: Record<"hero" | "final", VariantPreset> = {
    hero: {
        harmonics: 5,
        harmonicScale: 0.24,
        epicycles: true,
        trailLength: 260,
        epicycleHueShift: 42,
        durationMs: 16000,
        frozenSeed: "fourier-field/hero",
        frozenT: 0.34,
        peakAlpha: 0.92,
        trailWidth: 3,
        headGlowAlpha: 0.95,
        headGlowBlur: 18,
        headDotRadius: 5,
        epicycleRatios: { circle: 0.5, arm: 0.72 },
        epicycleWidths: { circle: 2.4, arm: 2 },
        epicycleRainbow: true,
        trailFadeExp: 1.35,
        trailFloor: 0.34,
    },
    final: {
        harmonics: 11,
        harmonicScale: 0.17,
        epicycles: false,
        trailLength: 360,
        epicycleHueShift: 36,
        durationMs: 21000,
        frozenSeed: "fourier-field/final",
        frozenT: 0.42,
        peakAlpha: 0.88,
        trailWidth: 3.2,
        headGlowAlpha: 0.92,
        headGlowBlur: 16,
        headDotRadius: 4.5,
        epicycleRatios: { circle: 0, arm: 0 },
        epicycleWidths: { circle: 0, arm: 0 },
        epicycleRainbow: false,
        trailFadeExp: 1.45,
        trailFloor: 0.36,
    },
};

const hostRef = useTemplateRef<HTMLElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// AW.W13 seam (mirrored from GooBlob) — resolve a `var(--token)` / `light-dark()`
// color to a CONCRETE `rgb(...)` BEFORE the `colorResolver` (value.js) sees it:
// value.js cannot parse a `var()` wrapper. The host element resolves the cascade
// — paint the color onto a throwaway `color:` read and pull back the
// browser-resolved value. A literal color (hex / oklch / hsl) passes straight
// through. Re-resolves on a color change AND on a dark-mode toggle (a token
// resolves differently under `.dark`).
const resolvedColor = ref(color);

// The zero-alloc color hoist (W43 §3). The outline triple + the analogous
// epicycle second hue resolve ONLY on the two triggers the color/dark watch
// already fires (`color` change + `isDark` flip), cached as concrete `rgb(...)`
// strings the per-frame `render()` reads. No `colorResolver`/`cssToOklch`/
// `oklchToGammaRgb` round-trip 60×/s for a value that changes on a toggle.
const outlineRgb = ref("rgb(0, 0, 0)");
const epicycleRgb = ref("rgb(0, 0, 0)");
// The rainbow epicycle palette (hero only) — one concrete `rgb(...)` per phasor,
// a hue ramp swept across the spectrum FROM the consumer's base hue (the
// fourier-analysis chained-rainbow register, kept harmonious with the injected
// color). Resolved on the SAME two triggers (color change + dark flip), read
// per-phasor in the scaffolding pass. Empty when the variant has no rainbow.
const epicyclePalette = ref<string[]>([]);

function resolveColorString(css: string): string {
    if (!css.includes("var(") && !css.includes("light-dark(")) return css;
    const el = hostRef.value;
    if (typeof window === "undefined" || !el) return css;
    const prev = el.style.color;
    el.style.color = css;
    const resolved = getComputedStyle(el).color;
    el.style.color = prev;
    return resolved || css;
}

// The active preset — resolved once at setup (the bundle the render reads).
const activePreset = PRESETS[variant];

// The drawn epicycle chain length — set once the spectrum builds (onMounted).
// The rainbow palette is sized to it so each phasor lands its own hue.
let chainLen = 0;

function refreshResolvedColor(): void {
    resolvedColor.value = resolveColorString(color);
    // Recompute the cached paint strings on the SAME two triggers (color change
    // + dark flip) — the zero-alloc hoist out of the rAF body (W43 §2.5).
    const [or, og, ob] = colorResolver(resolvedColor.value).map((v) =>
        Math.round(v * 255),
    );
    outlineRgb.value = `rgb(${or}, ${og}, ${ob})`;
    const base = cssToOklch(resolvedColor.value);
    const [er, eg, eb] = oklchToGammaRgb({
        L: base.L,
        C: base.C,
        h: deriveHue(base.h, "analogous", activePreset.epicycleHueShift, 1),
    }).map((v) => Math.round(v * 255));
    epicycleRgb.value = `rgb(${er}, ${eg}, ${eb})`;

    // The rainbow epicycle palette (hero only) — a hue RAMP swept ±150° across
    // the spectrum FROM the consumer's base hue (the fourier-analysis chained
    // rainbow: the big slow phasors near the base hue, the small fast ones
    // walking away), each phasor a saturated mid-L oklch so the chain reads
    // colorful and PRESENT. Resolved here, read per-phasor in the scaffolding
    // pass; empty when the variant carries no rainbow.
    if (activePreset.epicycleRainbow && chainLen > 0) {
        const palette: string[] = [];
        const span = 150; // ±span° around the base hue across the chain
        for (let i = 0; i < chainLen; i++) {
            const tt = chainLen > 1 ? i / (chainLen - 1) : 0;
            const h = base.h - span + tt * 2 * span;
            const [pr, pg, pb] = oklchToGammaRgb({
                L: 0.62,
                C: 0.17,
                h,
            }).map((v) => Math.round(v * 255));
            palette.push(`rgb(${pr}, ${pg}, ${pb})`);
        }
        epicyclePalette.value = palette;
    } else {
        epicyclePalette.value = [];
    }
}

// The shared single-source PRNG (AV.W14). Under `freeze` the live seed is a
// constant per-variant string so a screenshot / PPTX bake / visual-regression
// frame is byte-deterministic; otherwise it is random per load so the spectrum
// differs each mount.
function buildSpectrum(preset: VariantPreset): BasisComponent[] {
    const liveSeed = freeze ? preset.frozenSeed : `${Math.random()}`;
    const rng = mulberry32(hashString(liveSeed + seed));
    return makeEllipticSpectrum(rng, {
        harmonics: preset.harmonics,
        harmonicScale: preset.harmonicScale,
    });
}

// Glass-ui's canonical dark-mode reactivity (the dark-toggle seam). Watching the
// reactive flag retints the field on a theme flip without a `documentElement`
// MutationObserver or a probe-span.
const { isDark } = useGlobalDark();

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const preset = PRESETS[variant];
    const spectrum = buildSpectrum(preset);

    // (R1, the D8 fix) A sorted-for-DRAW copy — largest phasors first, so the
    // epicycle scaffolding chain reads cleanest (the big slow circles dominate,
    // the small fast ones add detail). This is a PURE draw-pass refinement: the
    // inverse-DFT SUM that `positionsAt` reads is ORDER-INDEPENDENT (each term is
    // added), so reordering does not change the reconstructed curve point — but
    // the epicycle CHAIN's tip-to-tail geometry IS order-dependent, so the
    // scaffolding pass reads `drawSpectrum` while the curve-HEAD read stays on
    // the emission-order `spectrum` (the chain whose tip is the curve point).
    const drawSpectrum = [...spectrum].sort((a, b) => b.amplitude - a.amplitude);

    // Size the rainbow palette to the drawn chain (one hue per phasor joint), then
    // re-resolve the cached colors so the palette is populated before first paint.
    chainLen = drawSpectrum.length;
    refreshResolvedColor();

    // Stable view-fit bbox: sample the curve once to size it to the canvas with a
    // margin, so the curve never clips and the scale is fixed across the run.
    const SAMPLES = 720;
    let minX = Infinity;
    let minY = Infinity;
    let maxX = -Infinity;
    let maxY = -Infinity;
    for (let i = 0; i < SAMPLES; i++) {
        const pts = positionsAt(spectrum, i / SAMPLES);
        const [x, y] = pts[pts.length - 1];
        if (x < minX) minX = x;
        if (y < minY) minY = y;
        if (x > maxX) maxX = x;
        if (y > maxY) maxY = y;
    }
    const spanX = Math.max(1e-3, maxX - minX);
    const spanY = Math.max(1e-3, maxY - minY);
    const cxModel = (minX + maxX) / 2;
    const cyModel = (minY + maxY) / 2;

    // The comet trail — a fixed-capacity ring buffer of recent head positions in
    // CSS px. Each frame pushes the new head and drops the oldest past capacity;
    // the segments fade with age so the oldest reaches zero alpha.
    const trail: [number, number][] = [];

    const handle = useCanvas2D({
        canvas: canvasRef,
        setup: () => ({
            render(c, now) {
                const w = canvas.clientWidth || canvas.offsetWidth || 0;
                const h = canvas.clientHeight || canvas.offsetHeight || 0;
                if (!w || !h) return;

                // Fit the model bbox into the canvas with a margin, preserving
                // aspect (one scale for both axes).
                const margin = 0.82;
                const scale = Math.min((w / spanX) * margin, (h / spanY) * margin);
                const cx = w / 2;
                const cy = h / 2;
                const toScreen = (mx: number, my: number): [number, number] => [
                    cx + (mx - cxModel) * scale,
                    cy + (my - cyModel) * scale,
                ];

                // FORWARD-ONLY infinite clock — `t` derives from the frame time
                // and only ever increases; the fractional part feeds evaluation.
                // No ping-pong, no eased back-and-forth.
                const t =
                    freeze || handle.reducedMotion
                        ? preset.frozenT
                        : (now / preset.durationMs) % 1;

                // The cached paint colors (the zero-alloc hoist — resolved in the
                // color/dark watch, NOT per frame). The W-FF3 render recipe reads
                // the bundle scaled by the clamped intensity. `dark` selects the
                // blend op AND the light-mode floor fork.
                const outline = outlineRgb.value;
                const epicycle = epicycleRgb.value;
                const palette = epicyclePalette.value;
                const dark = isDark.value;
                const peak = preset.peakAlpha * intensityClamped;
                const headGlow = preset.headGlowAlpha * intensityClamped;

                c.clearRect(0, 0, w, h);

                // ── Pass 0 — the epicycle scaffolding (hero only): the rainbow
                // chained circles + arms + filled joint dots BELOW the curve, the
                // fourier-analysis renderer's signature. Drawn off the
                // amplitude-sorted chain (R1) so the big slow circles dominate.
                // Source-over (the scaffolding is structure, not bloom); a PRESENT
                // ≈0.5/0.72-of-peak weight (not the prior 0.18 ghost). Each phasor
                // takes its own hue from the swept palette so the chain reads
                // colorful — harmonious with the consumer's base hue.
                if (preset.epicycleRatios.arm > 0) {
                    const chain = positionsAt(drawSpectrum, t);
                    c.lineCap = "round";
                    c.lineJoin = "round";
                    const circleA = Math.min(1, peak * preset.epicycleRatios.circle);
                    const armA = Math.min(1, peak * preset.epicycleRatios.arm);
                    for (let i = 1; i < chain.length; i++) {
                        const [px, py] = toScreen(chain[i - 1][0], chain[i - 1][1]);
                        const [qx, qy] = toScreen(chain[i][0], chain[i][1]);
                        const radius = Math.hypot(qx - px, qy - py);
                        const hue =
                            palette.length > 0
                                ? palette[Math.min(i - 1, palette.length - 1)]
                                : epicycle;
                        // The orbit circle around the prior tip.
                        c.strokeStyle = hue;
                        c.lineWidth = preset.epicycleWidths.circle;
                        c.globalAlpha = circleA;
                        c.beginPath();
                        c.arc(px, py, radius, 0, Math.PI * 2);
                        c.stroke();
                        // The arm to the next tip.
                        c.lineWidth = preset.epicycleWidths.arm;
                        c.globalAlpha = armA;
                        c.beginPath();
                        c.moveTo(px, py);
                        c.lineTo(qx, qy);
                        c.stroke();
                        // The filled joint dot at the orbit centre (the reference's
                        // centre marker — gives the chain its beaded read).
                        c.fillStyle = hue;
                        c.globalAlpha = Math.min(1, armA * 0.9);
                        c.beginPath();
                        c.arc(px, py, Math.max(2, preset.epicycleWidths.arm * 0.9), 0, Math.PI * 2);
                        c.fill();
                    }
                    c.globalAlpha = 1;
                }

                // The comet body — REBUILT each frame by sampling the curve BACK
                // along the period from the head over a fixed ARC `trailSpan`
                // (≈0.43 hero / 0.6 final of the period — the user's "comet body
                // toward ~1/3 period" floor, lifted to a substantial graceful
                // sweep). Sampling-per-frame (the reference's precomputed-trail
                // model) gives a CONSTANT arc length independent of framerate —
                // not a frame ring-buffer that fills at 60fps and reads a
                // different length on a slow device or a fresh mount. `trailN`
                // segments span the arc densely so the bold stroke stays smooth.
                const trailSpan = preset.trailLength / 600;
                const trailN = preset.trailLength;
                trail.length = 0;
                for (let i = trailN; i >= 0; i--) {
                    const tt = (t - (i / trailN) * trailSpan + 1) % 1;
                    const ch = positionsAt(spectrum, tt);
                    trail.push(toScreen(ch[ch.length - 1][0], ch[ch.length - 1][1]));
                }

                // ── Pass 1 — the comet TRAIL body, the BOLD saturated stroke (the
                // fourier-analysis register: a present ≈3px stroke at ≈0.9 peak,
                // not the prior 1.6px hairline whisper). `source-over` in BOTH
                // modes keeps the hue SATURATED — the prior additive `lighter`
                // body washed every crossing toward white at the bold peak. The
                // persistence is a SOFT `age^trailFadeExp` clamped UP by a HIGH
                // `trailFloor` (≈0.35) so the body has REAL presence in BOTH modes
                // (the light-mode floor fork the W-FF2 RG3 left sub-perceptible).
                c.globalCompositeOperation = "source-over";
                c.strokeStyle = outline;
                c.lineCap = "round";
                c.lineJoin = "round";
                c.lineWidth = preset.trailWidth;
                for (let i = 1; i < trail.length; i++) {
                    const age = i / (trail.length - 1); // 0 = oldest, 1 = head
                    let a = peak * Math.pow(age, preset.trailFadeExp);
                    a = Math.max(a, peak * preset.trailFloor);
                    c.globalAlpha = Math.min(1, a);
                    c.beginPath();
                    c.moveTo(trail[i - 1][0], trail[i - 1][1]);
                    c.lineTo(trail[i][0], trail[i][1]);
                    c.stroke();
                }

                // ── Pass 1b — the dark-mode phosphor SHEEN. Over the dark ink
                // ground a SUBTLE additive `lighter` overlay on the youngest third
                // of the trail brightens the comet's leading edge (the oscilloscope
                // glow — crossings bloom) WITHOUT washing the saturated body to
                // white (the bounded ≈0.18 alpha keeps it a sheen, not a wash). On
                // cream the additive op blows the hue out, so it is dark-ONLY —
                // the blend fork, now load-bearing as a glow overlay rather than
                // the body op.
                c.globalCompositeOperation = isDark.value ? "lighter" : "source-over";
                if (dark && trail.length >= 4) {
                    c.strokeStyle = outline;
                    c.lineWidth = preset.trailWidth;
                    const from = Math.max(1, Math.floor(trail.length * 0.66));
                    for (let i = from; i < trail.length; i++) {
                        const age = (i - from) / Math.max(1, trail.length - 1 - from);
                        c.globalAlpha = Math.min(1, 0.18 * age * intensityClamped);
                        c.beginPath();
                        c.moveTo(trail[i - 1][0], trail[i - 1][1]);
                        c.lineTo(trail[i][0], trail[i][1]);
                        c.stroke();
                    }
                }

                // ── Pass 2 — the HEAD GLOW (head-forward: headGlow > peak). A bold
                // core under a shadow-blur bloom on the youngest segments — the
                // comet's leading edge catches the eye. source-over so the head
                // stays the saturated hue, not an additive white.
                if (trail.length >= 2) {
                    c.save();
                    c.globalCompositeOperation = "source-over";
                    c.shadowColor = outline;
                    c.shadowBlur = preset.headGlowBlur;
                    c.globalAlpha = Math.min(1, headGlow);
                    c.strokeStyle = outline;
                    c.lineWidth = preset.trailWidth + 0.6;
                    const tail = trail.slice(-6);
                    c.beginPath();
                    c.moveTo(tail[0][0], tail[0][1]);
                    for (let i = 1; i < tail.length; i++) c.lineTo(tail[i][0], tail[i][1]);
                    c.stroke();
                    c.restore();
                }

                // ── Pass 3 — the comet HEAD DOT (the fourier-analysis glowing tip:
                // a soft halo ring, a saturated core, a white highlight). The mark
                // the eye locks onto — the curve has a definite leading point, not
                // a fade-to-nothing. Source-over so the core stays crisp (a `lighter`
                // core washes the white highlight out).
                if (preset.headDotRadius > 0 && trail.length >= 1) {
                    const [hx, hy] = trail[trail.length - 1];
                    c.globalCompositeOperation = "source-over";
                    // soft halo
                    c.globalAlpha = Math.min(1, headGlow * 0.4);
                    c.fillStyle = outline;
                    c.beginPath();
                    c.arc(hx, hy, preset.headDotRadius * 2.6, 0, Math.PI * 2);
                    c.fill();
                    // saturated core
                    c.globalAlpha = Math.min(1, headGlow);
                    c.beginPath();
                    c.arc(hx, hy, preset.headDotRadius, 0, Math.PI * 2);
                    c.fill();
                    // white highlight (the specular catch)
                    c.globalAlpha = Math.min(1, headGlow * 0.95);
                    c.fillStyle = "rgb(255, 255, 255)";
                    c.beginPath();
                    c.arc(hx, hy, Math.max(1.2, preset.headDotRadius * 0.38), 0, Math.PI * 2);
                    c.fill();
                }

                // RESET the context state the passes mutated.
                c.shadowBlur = 0;
                c.globalCompositeOperation = "source-over";
                c.globalAlpha = 1;
            },
        }),
    });

    // Re-resolve the color once the host is in the tree, on a color change, and
    // on a dark-mode toggle. `wake()` re-arms a parked surface so the retint
    // paints even when the loop has parked.
    watch(hostRef, refreshResolvedColor, { immediate: true });
    watch(
        () => color,
        () => {
            refreshResolvedColor();
            handle.wake();
        },
    );
    watch(isDark, () => {
        refreshResolvedColor();
        handle.wake();
    });
});
</script>

<template>
    <div ref="hostRef" class="fourier-field">
        <canvas ref="canvasRef" class="fourier-field-canvas" aria-hidden="true" />
    </div>
</template>

<style scoped>
/* The field is decorative background chrome. `content-visibility:auto` lets the
   substrate's offscreen-park kick in (the contentvisibilityautostatechange
   listener fires on this host); `contain` keeps it a layout/paint root. The
   deck theme.css pins `.fourier-field`'s z-index, so the root class is exactly
   `fourier-field`. */
.fourier-field {
    position: absolute;
    inset: 0;
    z-index: 0;
    pointer-events: none;
    contain: layout style;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

.fourier-field-canvas {
    display: block;
    width: 100%;
    height: 100%;
}
</style>
