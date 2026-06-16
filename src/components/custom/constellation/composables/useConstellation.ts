// useConstellation — the `<Constellation>` orchestrator (BA.W-CARVE2).
//
// The render-loop + lifecycle wiring lifted out of `Constellation.vue`'s
// `<script setup>` so the SFC keeps only its template + the `defineProps`
// contract + a thin call into this composable. The field/draw/interaction
// substrate already lives in the sibling modules (`constellationField.ts`/
// `constellationDraw.ts`/`constellationInteraction.ts` + `createConstellationField`/
// `useConstellationPointer`); this composable is the conductor — it composes the
// `useCanvas2D` substrate (inheriting the offscreen / tab-hidden / reduced-motion
// freeze for free), lays out the field on the first sized frame, runs the four
// neutral draw passes + the consumer `drawOverlay` skin, and exposes the
// imperative warp / well / pin seam. No new mechanic, no second rAF.

import { computed, getCurrentInstance, onMounted, ref, type Ref } from "vue";
import { useCanvas2D } from "../../../../composables/glass/canvas2d";
import { mulberry32, hashString } from "../../../../utils/prng";
import {
    seedField,
    stepField,
    refitField,
    BASE_WIDTH,
    type ConstellationField,
    type ConstellationRipple,
    type ConstellationPointer,
    type ConstellationPalette,
    type ConstellationProps,
} from "../constellationField";
import {
    readInteractionConfig,
    warpTo as warpToField,
    warpSettled as warpSettledField,
} from "../constellationInteraction";
import {
    readPalette,
    drawEdges,
    drawNodes,
    drawPointerWeb,
    drawRipples,
    DEFAULT_PALETTE,
} from "../constellationDraw";
import { useConstellationPointer } from "./useConstellationPointer";
import { createConstellationField } from "./createConstellationField";

/** The imperative seam the SFC re-exposes via `defineExpose`. */
export interface ConstellationExpose {
    field: ConstellationField;
    isFrozen: Ref<boolean>;
    warpTo(a: { x: number; y: number } | number, b?: number): number;
    holdWellAt(x: number, y: number): boolean;
    releaseWell(): void;
    warpSettled(): boolean;
    pinNode(idx: number): void;
}

/**
 * Drive a `<Constellation>` instance. `props` is the REACTIVE (defaulted) prop
 * surface — the per-frame live-read props (`pointerReactive`/`opacityCeiling`/
 * `accentEdges`/`drawOverlay`) are read off `props.x` INSIDE the render loop so a
 * bound `:opacity-ceiling` updates without a remount (the Vue 3.5 reactive-prop
 * read; the SFC `defineProps` destructure transform does not reach a composable
 * argument, so the live reads stay on `props`). `hostRef`/`canvasRef` are the SFC
 * template refs. Returns the imperative expose object the SFC spreads into
 * `defineExpose`.
 */
export function useConstellation(
    props: ConstellationProps,
    hostRef: Ref<HTMLElement | null>,
    canvasRef: Ref<HTMLCanvasElement | null>,
): ConstellationExpose {
    // Mount-once reads — the field seed (count/speed), the link reach, the
    // interaction-mode flags the pointer wiring snapshots, and the seed. The
    // defaults are filled by the SFC `withDefaults`, so these are present.
    const count = props.count ?? 64;
    const link = props.link ?? 132;
    const speed = props.speed ?? 0.16;
    const seed = props.seed;
    const warpOnClick = props.warpOnClick ?? false;
    const wander = props.wander ?? false;
    const gravityWell = props.gravityWell ?? false;
    const pinned = props.pinned ?? false;
    const pinnedDrift = props.pinnedDrift ?? false;
    const warpAutoRelease = props.warpAutoRelease ?? false;

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
    // (./createConstellationField). `wanderOverride`/`wellOverride` are the prop
    // overrides the render re-layers over the on-mount token read.
    const { field, wanderOverride, wellOverride } = createConstellationField(
        wander,
        gravityWell,
        pinned,
        pinnedDrift,
        warpAutoRelease,
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
        | ((e: { clientX: number; clientY: number }) => ConstellationPointer | null)
        | null
    >(null);

    onMounted(() => {
        const canvas = canvasRef.value;
        if (!canvas) return;

        // The substrate handle the render loop reads back for its LIVE reduced-motion
        // state. It is forward-declared (`let`, not the inline `const`) so the render
        // closure below can reference it WITHOUT a temporal-dead-zone hazard: the
        // substrate arms SYNCHRONOUSLY inside `useCanvas2D(...)` (autoStart), and its
        // resize/initial-paint path can drive the very first `render` BEFORE the
        // `useCanvas2D(...)` expression returns — i.e. before a `const handle = …`
        // binding would have finished initializing. Reading a TDZ `const` from that
        // first paint throws "Cannot access … before initialization" (a real
        // production crash surfaced under warm V8 code-cache linearization). With a
        // forward `let` (initialized `null`), an early first-paint reads `null` and
        // the helper below falls back to a DIRECT PRM probe — the substrate's own
        // source of truth — so the static-frame decision is correct either way; once
        // the assignment lands, the handle's live, change-monitored value governs.
        let handle: ReturnType<typeof useCanvas2D> | null = null;

        // The single reduced-motion read for the render loop. Prefers the substrate's
        // live, matchMedia-monitored flag; before the handle has been assigned (the
        // synchronous-arm first-paint window above) it falls back to a direct
        // `matchMedia` probe so the very first frame still honours PRM. SSR-safe.
        const reducedMotionNow = (): boolean => {
            if (handle) return handle.reducedMotion;
            return (
                typeof window !== "undefined" &&
                !!window.matchMedia?.("(prefers-reduced-motion: reduce)").matches
            );
        };

        handle = useCanvas2D({
            canvas: canvasRef,
            setup: () => {
                // Resolve the palette + lay out the field on the first frame, once
                // the canvas has been sized by the substrate's resize.
                return {
                    render(c, now) {
                        const w =
                            canvas.clientWidth || canvas.offsetWidth || BASE_WIDTH;
                        const h = canvas.clientHeight || canvas.offsetHeight || 720;
                        const k = w / BASE_WIDTH;
                        field.canvas = canvas;
                        const kFloorRaw = parseFloat(
                            getComputedStyle(canvas).getPropertyValue(
                                "--constellation-k-floor",
                            ),
                        ); // R5-8 size-floor knob
                        field.kFloor = Number.isFinite(kFloorRaw)
                            ? kFloorRaw
                            : undefined;
                        field.dpr = Math.min(
                            (typeof window !== "undefined" &&
                                window.devicePixelRatio) ||
                                1,
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
                        const isStatic = isFrozen.value || reducedMotionNow();

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
                        // The per-frame live-read props (Vue 3.5 reactive props) —
                        // read off `props.x` so a bound `:pointer-reactive` /
                        // `:opacity-ceiling` / `:accent-edges` / `:draw-overlay`
                        // updates without a remount. `pointerReactive` defaults true.
                        const pointerReactive = props.pointerReactive ?? true;
                        const opacityCeiling = props.opacityCeiling ?? 1;
                        const accentEdges = props.accentEdges ?? false;
                        const drawOverlay = props.drawOverlay;
                        if (!isStatic) {
                            const livePointer = pointerReactive ? pointer : null;
                            stepField(field, k, speed, livePointer, dt, now, rng.value);
                        }

                        c.clearRect(0, 0, w, h);
                        // The ACCENT-edge skin index (AZ.W-CON-GEN G2). When `accentEdges`
                        // is on, the PINNED node (else the FOCAL node) gets its incident
                        // edges tinted accent; OFF (default) passes -1 → the single-color
                        // neutral pass (byte-identical to HEAD).
                        const accentIndex = accentEdges
                            ? field.pinnedIndex >= 0
                                ? field.pinnedIndex
                                : field.focalIndex
                            : -1;
                        // E3 — the per-instance recession envelope. Read LIVE off the
                        // reactive prop each frame (Vue 3.5 reactive props) so a bound
                        // `:opacity-ceiling` updates without a remount; at the default
                        // `1` the scale is a no-op (byte-identical to HEAD).
                        drawEdges(c, field, link, palette, opacityCeiling, accentIndex);
                        drawNodes(c, field, palette, opacityCeiling);
                        if (pointerReactive && !isStatic) {
                            drawPointerWeb(
                                c,
                                field,
                                link,
                                palette,
                                pointer,
                                opacityCeiling,
                            );
                            drawRipples(
                                c,
                                field,
                                now,
                                ripples,
                                palette,
                                opacityCeiling,
                            );
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
        // component-internal composable (./useConstellationPointer).
        useConstellationPointer({
            host: hostRef.value,
            canvas,
            field,
            pointer,
            ripples,
            handle,
            toLocalRef,
            pointerReactive: props.pointerReactive ?? true,
            warpOnClick,
            gravityWell: !!gravityWell,
            isFrozen: isFrozen.value,
        });
    });

    return {
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
        /**
         * The warp settled signal (AZ.W-CON-GEN G6) — `true` when the warp spring has
         * ARRIVED on its target (no active warp, OR the focal's gap to its live target is
         * within the settle band). A consumer polls this to know if a click-warp / wander
         * re-target is still in flight (the `isSettled` read). A read-only seam over the
         * engine `warpSettled`.
         */
        warpSettled(): boolean {
            return warpSettledField(field);
        },
        /**
         * Imperatively PIN a node (AZ.W-CON-GEN G1) — re-points `field.pinnedIndex` to
         * `idx` so that node is HELD by every step pass (it stops drifting and holds its
         * current position). `idx < 0` clears the pin (every node drifts again). The
         * pinned node's incident edges tint accent under `accentEdges`; it wanders its
         * anchor under `pinnedDrift` (the cadence re-anchors on its next armed leg).
         */
        pinNode(idx: number): void {
            field.pinnedIndex = idx;
            // Re-anchor the drift on the next leg off the new pin's current position.
            if (field.pinnedDrift) field.pinnedDrift.nextAt = -1;
        },
    };
}
