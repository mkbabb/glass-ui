<script setup lang="ts">
import {
    computed,
    getCurrentInstance,
    onMounted,
    ref,
    useTemplateRef,
    type HTMLAttributes,
} from "vue";
import { useCanvas2D } from "../../../composables/glass/canvas2d";
import { mulberry32, hashString } from "../../../utils/prng";
import {
    seedField,
    stepField,
    refitField,
    BASE_WIDTH,
    type ConstellationField,
    type ConstellationRipple,
    type ConstellationPointer,
    type ConstellationPalette,
} from "./constellationField";
import {
    readInteractionConfig,
    warpTo as warpToField,
} from "./constellationInteraction";
import {
    readPalette,
    drawEdges,
    drawNodes,
    drawPointerWeb,
    drawRipples,
    DEFAULT_PALETTE,
} from "./constellationDraw";
import { useConstellationPointer } from "./composables/useConstellationPointer";
import { createConstellationField } from "./composables/createConstellationField";
import { cn } from "../../../utils/cn";

/**
 * Constellation — a slow, geometric proximity-graph lattice on a Canvas2D
 * surface. Nodes drift + bounce; near nodes link with distance-falloff
 * hairlines; the web leans toward the cursor and taps ripple. It composes the
 * `useCanvas2D` substrate, so it inherits the offscreen / tab-hidden /
 * reduced-motion freeze for free (no hand-rolled RAF-park).
 *
 * The lattice ships NEUTRAL. A branded skin (a focal ring, a callout label) is
 * the consumer's `drawOverlay(ctx, field, now)` pass — it runs AFTER the four
 * neutral passes and receives the live field so it can pin itself to a real
 * node. Zero deck-domain content lives in the component.
 *
 * Palette reads the FULL `--constellation-*` legibility set off the canvas (the
 * node/node-dim/line colors + the edge-alpha multipliers + the field-yields-to-
 * type `--constellation-alpha` knob; neutral fallbacks), so a consumer override
 * or a dark-mode flip re-tints AND re-weights the lattice (AX.W17).
 *
 * The focal node + click-to-warp (AX.W17) is a first-class engine concept: with
 * `warpOnClick`, a click warps the focal node to the nearest drifting node via a
 * critically-damped spring stepped INSIDE the substrate's single rAF (no
 * `useSpring`, no second rAF). The consumer paints the focal mark at
 * `field.warp.{x,y}` in its `drawOverlay`.
 */
const {
    count = 64,
    link = 132,
    speed = 0.16,
    seed,
    pointerReactive = true,
    warpOnClick = false,
    wander = false,
    gravityWell = false,
    opacityCeiling = 1,
    // `freeze` is resolved via the RAW vnode prop (see `rawFreeze` below) — NOT
    // destructured — because Vue casts an absent Boolean prop to `false`, which
    // would erase the omitted-vs-explicit-false distinction the auto-derive needs.
    class: className,
    drawOverlay,
} = defineProps<{
    /** Node count. Default 64. */
    count?: number;
    /** Link distance in px (the falloff reach). Default 132. */
    link?: number;
    /** Drift speed. Default 0.16. */
    speed?: number;
    /**
     * AY.W-COHERE E3 — the per-instance outer-envelope RECESSION knob (the
     * aurora `opacityCeiling` / fourier `intensity` sibling — the SAME prop NAME
     * the other live substrates carry, so the four-substrate recession contract is
     * ONE vocabulary). The painted edge/node/web/ripple alpha scales by this value
     * OVER the mode-tuned `--constellation-alpha` base, so a constellation hero can
     * RECEDE behind content (StoryHero sets 0.4–0.6) exactly as its aurora + fourier
     * siblings do. Default `1` is byte-identical to HEAD (the draw-alpha trace is
     * unchanged — the default-OFF canary). NOT a second token: `--constellation-alpha`
     * stays the mode recession base, this is the per-instance loudness envelope.
     */
    opacityCeiling?: number;
    /**
     * Seed for a REPRODUCIBLE field. A `number` or `string` (hashed) seeds the
     * shared `mulberry32`; omit for a fresh `Math.random` field each mount.
     */
    seed?: number | string;
    /** Steer-toward-cursor + tap ripples. Default true; auto-off under reduced-motion. */
    pointerReactive?: boolean;
    /**
     * Click-to-warp (AX.W17). A click warps the focal node to the nearest
     * drifting node and SPRINGS it there (a critically-damped path, chasing a
     * LIVE drifting target). INDEPENDENT of `pointerReactive` — warp works on a
     * static (non-ripple) lattice, and ripples work without warp. Default false;
     * auto-off under reduced-motion (the click does NOT warp — the focal mark
     * stays put; the stated PRM policy). The low-level `warpTo(...)` imperative
     * method (via `defineExpose`) is the seam this prop sugars.
     */
    warpOnClick?: boolean;
    /**
     * Auto-DRIFT (AY.W-CON1). A periodic auto-pick re-points the focal node to a
     * RANDOM node on a jittered cadence — the wander source on the SAME warp
     * spring (the 2nd half of the AX.W17 "drift + warp are ONE mechanic" thesis;
     * no second rAF, no second mechanic). `true` uses the default cadence
     * (8–16s, the slides rhythm); `{ minIdle?, jitter? }` tunes it (ms). Default
     * OFF — `wander` absent leaves `field.wander` undefined, byte-identical to
     * HEAD. PRM-gated by the WARP precedent: the cadence lives inside the
     * `!reducedMotion` step block, so under reduced-motion it never advances and
     * the focal mark stays at its seed (NOT fire-but-freeze).
     */
    wander?: boolean | { minIdle?: number; jitter?: number };
    /**
     * Pointer-held GRAVITY-WELL (AY.W-CON2). Hold the pointer over the lattice and
     * the nodes within reach are PULLED toward it (an inverse-square force on the
     * SAME engine, no second rAF); release and the field cools back to `speed`.
     * INDEPENDENT of `warpOnClick` and `pointerReactive` (a consumer can
     * hold-to-pull on a non-ripple, non-warp lattice). `true` uses the tokenised
     * `--constellation-well-*` defaults; an object overrides the gains. Default
     * OFF — `gravityWell` absent leaves `field.well` undefined (byte-identical to
     * HEAD; `stepField` skips the force pass). PRM-gated by the WARP precedent: the
     * held-timer block lives inside `!reducedMotion`, so under reduced-motion the
     * well never arms; AND the well STATE resets to neutral on the PRM-true edge
     * (no half-ramped force frozen on).
     */
    gravityWell?:
        | boolean
        | {
              holdMs?: number;
              gain?: number;
              reach?: number;
              ramp?: number;
              maxSpeed?: number;
              soften?: number;
          };
    /**
     * Deterministic-capture freeze (AY.W-CON3). When `true`, the lattice lays
     * out ONE reproducible STATIC frame and does NOT advance — seeded layout
     * (set `seed` for a stable field ACROSS runs; an unseeded freeze still
     * freezes but lays out a one-shot `Math.random` frame), no `stepField`, no
     * ripple / warp / wander / well advance, and a FROZEN `now` handed to
     * `drawOverlay` so a phase-driven skin (`(now % T) / T`) resolves to a fixed
     * value (the pulse-ring radius is identical frame-over-frame). Omit to
     * AUTO-DERIVE from `location.search` matching `export | print | freeze` (the
     * deploy-pipeline contract — a consumer's pptx / print / screenshot capture
     * gets a stable frame with zero per-consumer wiring). An explicit
     * `:freeze="false"` forces live even under a capture URL. Unifies with the
     * reduced-motion one-static-frame path — `freeze || reducedMotion` is the
     * single static-frame predicate; the capture takes no input (the pointer /
     * warp / well listeners are NOT registered under freeze).
     */
    freeze?: boolean;
    class?: HTMLAttributes["class"];
    /**
     * The skin seam. Runs after the neutral passes with the live field, so a
     * consumer paints its own focal mark pinned to a real node — read
     * `field.warp.{x,y}` for the spring-eased focal position when `warpOnClick`
     * is on. The branded content (a domain accent, a callout label) lives HERE,
     * in the consumer. Under `freeze` it receives a FROZEN `now`, so a phase-
     * driven mark resolves to a fixed value.
     */
    drawOverlay?: (
        ctx: CanvasRenderingContext2D,
        field: ConstellationField,
        now: number,
    ) => void;
}>();

const hostRef = useTemplateRef<HTMLElement>("hostRef");
const canvasRef = useTemplateRef<HTMLCanvasElement>("canvasRef");

// The shared single-source PRNG (AV.W14). A seeded field is reproducible across
// mounts; an undefined seed is a fresh field. NO private mulberry32 re-roll.
const rng = computed<() => number>(() => {
    if (seed === undefined) return Math.random;
    const s = typeof seed === "string" ? hashString(seed) : seed;
    return mulberry32(s);
});

// The deterministic-capture predicate (AY.W-CON3). An explicit `freeze` prop
// wins; omitted, it AUTO-DERIVES from the capture URL (?export / ?print /
// ?freeze) — the deploy-pipeline contract a consumer's pptx / print / screenshot
// capture rides with zero per-instance wiring. SSR-safe (no `location` off-
// window). The URL is read LIVE (not captured at setup) so an SPA route resolving
// the query AFTER the child's synchronous setup still freezes — the capture URL
// is a one-shot pipeline flag, never live-toggled, so reading it on demand is
// correct (no reactive tracking needed). `isFrozen` folds into the EXISTING
// `!handle.reducedMotion` guards so `freeze || reducedMotion` is the SINGLE
// static-frame predicate (no parallel branch). The frozen frame paints edges +
// nodes + the overlay ONCE, with a stable `now` handed to the skin so a
// phase-driven mark is identical frame-over-frame.
const urlFreeze = (): boolean =>
    typeof window !== "undefined" &&
    /[?&](export|print|freeze)\b/.test(window.location.search);
// NOTE: Vue casts an ABSENT `Boolean`-typed prop to `false` (not `undefined`),
// so the destructured `freeze` alone cannot distinguish "omitted" from an
// explicit `false`. Read the RAW vnode prop at setup (`undefined` when truly
// omitted, `true`/`false`/`""` when passed) so the three states stay distinct:
// explicit `true` (or a bare `freeze` attr → `""`) → frozen; omitted →
// AUTO-DERIVE from the URL; explicit `false` → force live even under a capture
// URL (the documented escape).
const rawFreeze = getCurrentInstance()?.vnode.props?.freeze as
    | boolean
    | ""
    | undefined;
const isFrozen = computed<boolean>(() => {
    if (rawFreeze !== undefined) return rawFreeze === true || rawFreeze === "";
    return urlFreeze();
});
// The stable `now` handed to `drawOverlay` under freeze — a fixed sentinel so a
// `(now % T) / T` phase resolves to the SAME value every frame (the pulse-ring
// radius does not vary). 0 maps a `(now % T) / T` phase to 0 (ring at its inner
// radius) — the determinism truth, the slides skin's `reduceMotion ? 0.5` clamp
// generalised (the consumer picks its frozen phase by the constant it reads).
const FROZEN_NOW = 0;

// Field + per-instance interaction state (the focal/warp engine state + the
// optional wander cadence / gravity-well, seeded cold) — built by the factory
// (./composables/createConstellationField). `wanderOverride`/`wellOverride` are
// the prop overrides the render re-layers over the on-mount token read.
const { field, wanderOverride, wellOverride } = createConstellationField(
    wander,
    gravityWell,
);
const pointer: ConstellationPointer = { x: -1, y: -1 };
const ripples: ConstellationRipple[] = [];
let palette: ConstellationPalette = { ...DEFAULT_PALETTE };
// The previous frame's `now` (ms) for the warp-spring `dt` (AX.W17). -1 until
// the first frame stamps it.
let prevNow = -1;
// One-shot guard: the numeric interaction tokens (warp spring + well gains) are
// read ONCE on the first sized frame (AY.W-CON2), never per-frame.
let interactionRead = false;
// The hoisted client→canvas-local-px mapper, assigned on mount. The exposed
// `warpTo(clientX, clientY)` reads it (the deck-scale invariant); null pre-mount.
const toLocalRef = ref<
    ((e: { clientX: number; clientY: number }) => ConstellationPointer | null) | null
>(null);

onMounted(() => {
    const canvas = canvasRef.value;
    if (!canvas) return;

    const handle = useCanvas2D({
        canvas: canvasRef,
        setup: (ctx) => {
            // Resolve the palette + lay out the field on the first frame, once
            // the canvas has been sized by the substrate's resize.
            return {
                render(c, now) {
                    const w = canvas.clientWidth || canvas.offsetWidth || BASE_WIDTH;
                    const h = canvas.clientHeight || canvas.offsetHeight || 720;
                    const k = w / BASE_WIDTH;
                    field.canvas = canvas;
                    field.dpr = Math.min(
                        (typeof window !== "undefined" && window.devicePixelRatio) || 1,
                        2,
                    );
                    if (field.w !== w || field.h !== h) {
                        // Capture the PRIOR extent BEFORE overwrite so the re-fit
                        // can rescale proportionally (AY.W-CON1).
                        const prevW = field.w;
                        const prevH = field.h;
                        field.w = w;
                        field.h = h;
                        field.k = k;
                        if (!field.nodes.length) {
                            field.nodes = seedField(rng.value, count, w, h, speed);
                            // Seed the warp spring at field-center so the FIRST
                            // warp springs from a real start point, not (0,0)
                            // (AX.W17 — a continuous spring-eased path).
                            field.warp.x = w / 2;
                            field.warp.y = h / 2;
                        } else {
                            // RE-FIT the existing lattice to the new dims on the
                            // SAME frame (AY.W-CON1) — so the first post-resize
                            // draw already fills the new canvas (no drift-out lag).
                            // Runs BEFORE the stepField line below, so the re-fit
                            // lattice is what this frame paints.
                            refitField(field, prevW, prevH);
                        }
                        palette = readPalette(canvas);
                        // Read the NUMERIC interaction tokens ONCE, on the first
                        // sized frame (AY.W-CON2) — the warp spring + the well gains
                        // — into the field config. A PROP override (wellOverride)
                        // STILL wins over the token (re-layered after the token read).
                        // Read once (the hot loop never calls getComputedStyle).
                        if (!interactionRead) {
                            interactionRead = true;
                            const cfgs = readInteractionConfig(canvas);
                            field.warpCfg = cfgs.warp;
                            if (field.well) {
                                field.well.cfg = { ...cfgs.well, ...wellOverride };
                            }
                            // The auto-drift cadence: the token fills the
                            // un-overridden members; an explicit prop still wins
                            // (the same prop-over-token layering as the well).
                            if (field.wander) {
                                field.wander.minIdle =
                                    wanderOverride.minIdle ?? cfgs.wander.minIdle;
                                field.wander.jitter =
                                    wanderOverride.jitter ?? cfgs.wander.jitter;
                            }
                        }
                    }
                    field.k = k;

                    // dt (s) since the previous frame — drives the warp spring.
                    // Clamped inside warpStep for tab-throttle resilience.
                    const dt = prevNow < 0 ? 0 : (now - prevNow) / 1000;
                    prevNow = now;

                    // The SINGLE static-frame predicate (AY.W-CON3). A
                    // deterministic capture (`freeze` / a ?export|print|freeze
                    // URL) OR reduced-motion paints ONE static frame: no drift,
                    // no warp / wander / well advance, no ripple, and a FROZEN
                    // `now` to the overlay. The freeze folds INTO the existing
                    // `!handle.reducedMotion` guards (one predicate, not a
                    // parallel branch) so the whole render-loop has ONE
                    // live-vs-static fork.
                    const isStatic = isFrozen.value || handle.reducedMotion;

                    // PRM-true-edge state reset (AY.W-CON2). The substrate LIVE-
                    // MONITORS reduced-motion and re-arms on un-reduce; a user
                    // toggling PRM true MID-HOLD would otherwise freeze a half-ramped
                    // well ON. When the frame is static, reset the well to neutral
                    // so the parked static frame carries NO pull (the ramped-force
                    // reset the wander — cadence-only — does not need).
                    if (isStatic && field.well) {
                        field.well.strength = 0;
                        field.well.target = 0;
                        field.well.x = -1;
                        field.well.y = -1;
                    }

                    // Step the field unless the substrate is static (reduced-
                    // motion OR a deterministic capture paints one static frame,
                    // no drift, no warp advance, and — the WARP precedent — no
                    // auto-DRIFT cadence advance: `wander.nextAt` stays put and the
                    // focal mark holds at its seed). `now` + `rng.value` drive the
                    // wander cadence (AY.W-CON1).
                    if (!isStatic) {
                        const livePointer = pointerReactive ? pointer : null;
                        stepField(field, k, speed, livePointer, dt, now, rng.value);
                    }

                    c.clearRect(0, 0, w, h);
                    // E3 — the per-instance recession envelope. Read LIVE off the
                    // reactive prop each frame (Vue 3.5 reactive props destructure)
                    // so a bound `:opacity-ceiling` updates without a remount; at the
                    // default `1` the scale is a no-op (byte-identical to HEAD).
                    drawEdges(c, field, link, palette, opacityCeiling);
                    drawNodes(c, field, palette, opacityCeiling);
                    if (pointerReactive && !isStatic) {
                        drawPointerWeb(c, field, link, palette, pointer, opacityCeiling);
                        drawRipples(c, field, now, ripples, palette, opacityCeiling);
                    }
                    // The consumer skin runs LAST with the live field. Under a
                    // static frame it gets a FROZEN `now` (AY.W-CON3) so a phase-
                    // driven mark resolves to a fixed value — identical
                    // frame-over-frame (the determinism truth, not just a frozen
                    // field). Live otherwise.
                    drawOverlay?.(c, field, isStatic ? FROZEN_NOW : now);
                },
            };
        },
    });

    // The pointer wiring — the deck-scale client→canvas-local mapper (sets
    // `toLocalRef`, the hoisted ONE mapper the exposed `warpTo(clientX,clientY)`
    // reads) + the three INDEPENDENT listener blocks (ripple steer / click-warp /
    // held gravity-well), each PRM-gated + capture-gated. Lifted to a
    // component-internal composable (./composables/useConstellationPointer).
    useConstellationPointer({
        host: hostRef.value,
        canvas,
        field,
        pointer,
        ripples,
        handle,
        toLocalRef,
        pointerReactive,
        warpOnClick,
        gravityWell: !!gravityWell,
        isFrozen: isFrozen.value,
    });
});

defineExpose({
    /** The live field (the low-level imperative seam — for a custom overlay). */
    field,
    /**
     * The resolved deterministic-capture predicate (AY.W-CON3) — `true` when the
     * lattice is laying out a frozen static frame (`freeze` prop OR a
     * `?export|print|freeze` URL OR reduced-motion via the substrate). A read-only
     * test/debug seam (the π freeze-live spec reads it to confirm the auto-derive
     * fired without inferring from drift).
     */
    isFrozen,
    /**
     * Imperative warp (AX.W17). Two call shapes:
     *   `warpTo(localPoint)`              — `{x, y}` already in canvas-local px
     *                                        (the lower primitive).
     *   `warpTo(clientX, clientY)`        — client coords, mapped via the
     *                                        deck-scale `toLocal` (the sugar
     *                                        `warpOnClick` calls internally).
     * The focal node re-points to the nearest drifting node + springs there.
     * Returns the chosen node index, or -1 on a degenerate no-op. No-op under
     * reduced-motion (the spring does not advance while the substrate is frozen).
     */
    warpTo(a: { x: number; y: number } | number, b?: number): number {
        if (typeof a === "number" && typeof b === "number") {
            const local = toLocalRef.value?.({ clientX: a, clientY: b });
            if (!local) return -1;
            return warpToField(field, local.x, local.y);
        }
        const pt = a as { x: number; y: number };
        return warpToField(field, pt.x, pt.y);
    },
    /**
     * Imperatively ARM the gravity-well at a canvas-LOCAL point (AY.W-CON2) — the
     * π-lane test seam that drives the well WITHOUT racing a real held-pointer
     * gesture + the held-timer. Sets the well position + `target = 1` directly (the
     * timer is bypassed; the ramp still eases `strength` over the next frames). No-op
     * when `gravityWell` is off (no `field.well`). Returns true when the well armed.
     */
    holdWellAt(x: number, y: number): boolean {
        if (!field.well) return false;
        field.well.x = x;
        field.well.y = y;
        field.well.target = 1;
        return true;
    },
    /** Imperatively RELEASE the well (AY.W-CON2) — `target → 0`, the field cools. */
    releaseWell(): void {
        if (!field.well) return;
        field.well.target = 0;
    },
});
</script>

<template>
    <div ref="hostRef" :class="cn('constellation', className)">
        <canvas ref="canvasRef" class="constellation-canvas" aria-hidden="true" />
    </div>
</template>

<style scoped>
/* The lattice is decorative chrome — `content-visibility:auto` lets the
   substrate's offscreen-park kick in (the contentvisibilityautostatechange
   listener fires on this host), `contain` keeps it a layout/paint root.
   The CONTAINMENT axes (contain / content-visibility) stay on the scoped class
   (the component owns them); only the LAYOUT/SIZING axes are surrendered. */
.constellation {
    contain: layout style;
    content-visibility: auto;
    contain-intrinsic-size: auto none;
}

/* The root layout is CONSUMER-OVERRIDABLE (AY.W-SB1 §1.5.2 — the zero-paint
   fix). A scoped `.constellation[data-v-…]` selector is specificity (0,2,0) — it
   would BEAT a consumer's single-class placement (e.g. the storybook
   `.story-hero-bg { position: absolute; inset: 0 }` at (0,1,0)), pinning the host
   `position: relative; block-size: 100%` in-flow against an auto-height parent →
   the host collapses to h=0 and the canvas never sizes past its 300×150 default
   (RA-flow-fields §4 — the DEAD constellation hero). Routing the root sizing
   through `:where()` (specificity ZERO) lets ANY consumer class win, so a placed
   parent (`position: absolute; inset: 0`) sizes the component — matching the
   FourierField sibling contract (its scoped root is `position: absolute; inset: 0`;
   both substrates now FILL a placed parent rather than dictate their own flow).
   When the consumer does NOT place it, the `position: relative` fallback keeps the
   host the canvas's offset parent (the `.constellation-canvas` is `position:
   absolute; inset: 0`), and the `100%` extents fill a sized parent. */
:where(.constellation) {
    position: relative;
    inline-size: 100%;
    block-size: 100%;
}

.constellation-canvas {
    position: absolute;
    inset: 0;
    inline-size: 100%;
    block-size: 100%;
    display: block;
}
</style>
