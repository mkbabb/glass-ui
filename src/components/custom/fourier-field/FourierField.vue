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
    /** Comet-trail capacity (frames of head history). */
    trailLength: number;
    /** Hue offset (degrees) of the epicycle second hue away from the outline hue. */
    epicycleHueShift: number;
    /** Forward-clock period for one full curve traversal, in ms. */
    durationMs: number;
    /** A constant per-variant seed used under `freeze` so a capture is deterministic. */
    frozenSeed: string;
    /** The parameter `t` of the static best-frame painted under `freeze`. */
    frozenT: number;

    // ── The intensity BUNDLE (the W43 SOTA paint model; replaces the single
    // flat peak-alpha constant). Every paint magnitude is a per-variant field
    // scaled by the ONE outer `intensity` prop — the variant IS the bundle.
    /** Comet-trail PEAK alpha (the head segment) — the resting brand mark. */
    peakAlpha: number;
    /** Head-glow alpha — the STRONGEST layer (head-forward: > peakAlpha). */
    headGlowAlpha: number;
    /** Head-glow `shadowBlur` bloom radius, in px. */
    headGlowBlur: number;
    /** Epicycle scaffolding alphas ÷ peak (hero only; {0,0} disables the scaffold). */
    epicycleRatios: { circle: number; arm: number };
    /** Trail persistence exponent — SOFT (1..2), never the quadratic that kills the body. */
    trailFadeExp: number;
    /** Min trail alpha ÷ peak — the body survives, never decays to 0. */
    trailFloor: number;
}

const PRESETS: Record<"hero" | "final", VariantPreset> = {
    hero: {
        harmonics: 4,
        harmonicScale: 0.22,
        epicycles: true,
        trailLength: 170,
        epicycleHueShift: 42,
        durationMs: 16000,
        frozenSeed: "fourier-field/hero",
        frozenT: 0.18,
        peakAlpha: 0.55,
        headGlowAlpha: 0.62,
        headGlowBlur: 16,
        epicycleRatios: { circle: 0.18, arm: 0.3 },
        trailFadeExp: 1.4,
        trailFloor: 0.1,
    },
    final: {
        harmonics: 9,
        harmonicScale: 0.16,
        epicycles: false,
        trailLength: 200,
        epicycleHueShift: 36,
        durationMs: 21000,
        frozenSeed: "fourier-field/final",
        frozenT: 0.33,
        peakAlpha: 0.45,
        headGlowAlpha: 0.5,
        headGlowBlur: 14,
        epicycleRatios: { circle: 0, arm: 0 },
        trailFadeExp: 1.5,
        trailFloor: 0.08,
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
                // color/dark watch, NOT per frame). The 3-pass phosphor-comet
                // recipe reads the bundle scaled by the clamped intensity.
                const outline = outlineRgb.value;
                const epicycle = epicycleRgb.value;
                const peak = preset.peakAlpha * intensityClamped;
                const headGlow = preset.headGlowAlpha * intensityClamped;

                c.clearRect(0, 0, w, h);

                // ── Pass 0 — the epicycle scaffolding (hero only), in the distinct
                // hue, faint and BELOW the outline. Drawn off the amplitude-sorted
                // chain (R1) so the big circles dominate; source-over (scaffolding
                // does not bloom).
                if (preset.epicycleRatios.arm > 0) {
                    const chain = positionsAt(drawSpectrum, t);
                    c.lineWidth = 1;
                    c.strokeStyle = epicycle;
                    for (let i = 1; i < chain.length; i++) {
                        const [px, py] = toScreen(chain[i - 1][0], chain[i - 1][1]);
                        const [qx, qy] = toScreen(chain[i][0], chain[i][1]);
                        const radius = Math.hypot(qx - px, qy - py);
                        // The orbit circle around the prior tip.
                        c.globalAlpha = peak * preset.epicycleRatios.circle;
                        c.beginPath();
                        c.arc(px, py, radius, 0, Math.PI * 2);
                        c.stroke();
                        // The arm to the next tip.
                        c.globalAlpha = peak * preset.epicycleRatios.arm;
                        c.beginPath();
                        c.moveTo(px, py);
                        c.lineTo(qx, qy);
                        c.stroke();
                    }
                    c.globalAlpha = 1;
                }

                // The curve head this frame — the last tip of the EMISSION-order
                // chain (the reconstructed curve point; order-independent sum, but
                // the tip-to-tail geometry rides the unsorted spectrum).
                const chain = positionsAt(spectrum, t);
                const [hxModel, hyModel] = chain[chain.length - 1];
                const head = toScreen(hxModel, hyModel);

                // Advance the comet ring buffer (skip when frozen / reduced — a
                // static frame paints a short fixed tail off a quick pre-roll).
                if (freeze || handle.reducedMotion) {
                    if (trail.length === 0) {
                        const back = 0.06;
                        const steps = Math.min(preset.trailLength, 48);
                        for (let i = steps; i >= 0; i--) {
                            const tt = (t - (i / steps) * back + 1) % 1;
                            const ch = positionsAt(spectrum, tt);
                            trail.push(toScreen(ch[ch.length - 1][0], ch[ch.length - 1][1]));
                        }
                    }
                } else {
                    trail.push(head);
                    while (trail.length > preset.trailLength) trail.shift();
                }

                // ── Pass 1 — the comet TRAIL body. Additive `lighter` on the dark
                // ink ground (the phosphor bloom — crossings brighten), plain
                // `source-over` on cream (additive over cream blows the hue to
                // white). The 2D-context `lighter` is the device-free-safe op (no
                // @supports gate, no fallback rung — W43 §2.1). The persistence is
                // a SOFT `age^trailFadeExp` with a `trailFloor` so the body
                // SURVIVES (the direct D2 fix — never the quadratic that killed it).
                c.globalCompositeOperation = isDark.value ? "lighter" : "source-over";
                c.strokeStyle = outline;
                c.lineCap = "round";
                c.lineJoin = "round";
                c.lineWidth = 1.6;
                for (let i = 1; i < trail.length; i++) {
                    const age = i / (trail.length - 1); // 0 = oldest, 1 = head
                    let a = peak * Math.pow(age, preset.trailFadeExp);
                    a = Math.max(a, peak * preset.trailFloor);
                    c.globalAlpha = a;
                    c.beginPath();
                    c.moveTo(trail[i - 1][0], trail[i - 1][1]);
                    c.lineTo(trail[i][0], trail[i][1]);
                    c.stroke();
                }

                // ── Pass 2 — the HEAD GLOW (the STRONGEST layer, head-forward:
                // headGlow > peak — the D4 fix). A sharp core under a shadow-blur
                // bloom on the youngest segments.
                if (trail.length >= 2) {
                    c.save();
                    c.shadowColor = outline;
                    c.shadowBlur = preset.headGlowBlur;
                    c.globalAlpha = headGlow;
                    c.lineWidth = 2;
                    const tail = trail.slice(-4);
                    c.beginPath();
                    c.moveTo(tail[0][0], tail[0][1]);
                    for (let i = 1; i < tail.length; i++) c.lineTo(tail[i][0], tail[i][1]);
                    c.stroke();
                    c.restore();
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
