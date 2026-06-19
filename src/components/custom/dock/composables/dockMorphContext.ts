import { nextTick, onUnmounted, readonly, ref, watch } from "vue";
import type { Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { createOptionalContext } from "../../../../composables/context";
import { DOCK_MORPH_LABEL, DOCK_SPRING } from "../constants";
// BB.W-CARVE4 — the PURE geometry + reserved-footprint measure + SYNCHRONOUS PRM seat
// helpers carved into a sibling colocation module (the aurora/goo-blob/useFourierField
// pattern); the orchestrator below stays the morph DRIVER and IMPORTS them.
import {
    clearMorphVars,
    dimOf,
    forceNestedMaxContent,
    getSize,
    morphAxisProp,
    morphMinFloorPx,
    nestedTargetsWithin,
    seatTargetSync,
    type MorphMeasureTarget,
} from "./dockMorphMeasure";

/**
 * AX.W02 — ONE morph orchestrator per dock. The dock is a single morph stack
 * whose active "layer" is `(expandedState × activePane)`: the outer
 * collapse↔expand swap and the inner `<DockLayerGroup>` pane swaps are
 * transitions in the SAME group — ONE spring, ONE scalar (`--dock-morph-t`,
 * established by W01), ONE clock. No second engine.
 *
 * Re-derived from first principles on W01's settled single-scalar substrate:
 *  - `--dock-morph-t` is written to the `.glass-dock` root and INHERITS to every
 *    descendant (dock.css `@property … inherits:true`), so ONE spring writing
 *    that one scalar drives EVERY registered container's size calc at once.
 *  - Each morphing container carries its OWN `--dock-morph-from`/`--dock-morph-to`
 *    px span (the allowed one-time FLIP measurement) and interpolates it against
 *    the shared scalar — `from + (to − from) · t`. So a simultaneous
 *    collapse + pane-swap reads as one continuous spring: the box, the nested
 *    stack, and every child stagger ramp on the same `t`.
 *
 * The orchestrator OWNS one `SpringProgress`. The OUTER collapse↔expand pair
 * registers as a target; a NESTED `<DockLayerGroup>` registers a SECOND target
 * instead of minting its own `useLayerTransition` engine. A re-toggle mid-flight
 * re-bases the live solver onto the new span from its current velocity (the iOS
 * interruptible-physics contract W01 keeps), so even an interrupted morph stays
 * one continuous trajectory.
 *
 * This is the dock-flavored first instance of the general `MorphGroup` /
 * `GlassEffectContainer` facility (the iOS-26 Liquid-Glass corpus, facet 26 —
 * the `provideMorphGroup` two-part seam: a per-element driver + a provide/inject
 * orchestrator). AX.W42 generalizes it; W02 establishes the seam it builds on.
 *
 * LIGHT-surface only: `SpringProgress` owns its own rAF via `.play(onFrame)` and
 * carries no static value.js edge — never import `AnimationGroup` / `./engine`
 * (that pulls value.js into the dock bundle).
 *
 * The `DOCK_SPRING` tuning this orchestrator drives is the ONE authority shared with
 * `useLayerTransition` — it lives in `../constants` (the feature-dir constants home).
 */

export interface DockMorphGroupRegistration {
    /** The container element owning this group's grid-stacked panes. */
    containerEl: Ref<HTMLElement | null>;
    /** The group's currently-active pane id (its `v-model:active`). */
    activeLayer: Ref<string>;
    /** Layout axis of the group; matches the group's `orientation`. */
    axis: Ref<"horizontal" | "vertical">;
}

export interface DockMorphGroupHandle {
    /** The active pane id post-swap (the orchestrator mutates it). */
    currentLayer: Readonly<Ref<string>>;
    /** The pane id currently fading out, or null. */
    leavingLayer: Readonly<Ref<string | null>>;
    /** Detach this group from the orchestrator (on the group's unmount). */
    release(): void;
}

/**
 * The provided morph seam. A nested `<DockLayerGroup>` injects this and DEFERS
 * its pane-swap morph to the dock's single orchestrator via `registerGroup`.
 */
export interface DockMorphContext {
    registerGroup(group: DockMorphGroupRegistration): DockMorphGroupHandle;
}

// ── internal: one morph target the shared spring drives ────────────────────────
// Extends MorphMeasureTarget (containerEl/axis/txId — the shape the carved measure/
// seat helpers read), adding the orchestrator-internal layer + lifecycle fields.
interface MorphTarget extends MorphMeasureTarget {
    activeLayer: Ref<string>;
    currentLayer: Ref<string>;
    leavingLayer: Ref<string | null>;
    /**
     * PER-TARGET swap generation. Each target owns its own monotonic id so two
     * targets swapping in the SAME tick (a simultaneous collapse + pane-swap) do
     * NOT clobber each other's deferred rAF measurement — the SHARED spring is the
     * one clock, but each target's pin/measure pipeline is gated on its own id.
     * (txId comes from MorphMeasureTarget.)
     */
    stop: () => void;
}

const ctx = createOptionalContext<DockMorphContext>(DOCK_MORPH_LABEL);

export const { KEY: DOCK_MORPH_KEY } = ctx;

export function provideDockMorphContext(context: DockMorphContext): void {
    ctx.provide(context);
}

/**
 * Befitting-silent — returns `null` for a `<DockLayerGroup>` rendered outside a
 * `<GlassDock>` (the standalone self-orchestrate path).
 */
export const useOptionalDockMorphContext = ctx.use;

export interface UseDockMorphOrchestratorOptions {
    /** The `.glass-dock` root that carries the shared scalar + clip aperture. */
    rootEl: Ref<HTMLElement | null>;
    /** The outer collapse↔expand container (`.dock-layers`). */
    outerEl: Ref<HTMLElement | null>;
    /** The outer active "layer" id — `(expandedState)` projected to a string. */
    outerActiveLayer: Ref<string>;
    /** The outer pair morphs the inline axis (a horizontal dock). */
    outerAxis: Ref<"horizontal" | "vertical">;
}

export interface UseDockMorphOrchestratorReturn {
    /** Provide-able context: a nested `<DockLayerGroup>` registers through it. */
    context: DockMorphContext;
    /** The outer pair's post-swap active layer id (call-site parity). */
    outerCurrentLayer: Readonly<Ref<string>>;
    /** Defensive settle on a stray `@transitionend` (call-site parity). */
    onOuterTransitionEnd(e: TransitionEvent): void;
}

/**
 * The ONE morph engine for a dock instance. Owns a single `SpringProgress`;
 * drives the outer collapse↔expand box AND every nested `<DockLayerGroup>`'s
 * pane-swap off the one `--dock-morph-t` scalar. Replaces the per-pair
 * `useLayerTransition` instantiation (W01's single-scalar primitive) with a
 * single multi-target driver, so a nested dock runs ONE engine, not two.
 */
export function useDockMorphOrchestrator(
    options: UseDockMorphOrchestratorOptions,
): UseDockMorphOrchestratorReturn {
    const { rootEl, outerEl, outerActiveLayer, outerAxis } = options;

    // The single live morph driver, shared across every registered target. A
    // re-toggle mid-flight RE-BASES it onto the new span from its current
    // velocity rather than reconstructing from rest (the iOS interruptible-spring
    // contract). The normalized scalar runs 0→1; the per-frame `value` IS
    // `--dock-morph-t` on the root. ONE spring is the dock's single clock; targets
    // gate their pin/measure pipelines on PER-TARGET generations so a simultaneous
    // multi-target swap does not clobber a sibling's deferred measurement.
    let spring: SpringProgress | null = null;

    const targets = new Set<MorphTarget>();

    function root(): HTMLElement | null {
        return rootEl.value;
    }

    function disposeSpring() {
        if (spring) {
            spring.dispose();
            spring = null;
        }
    }

    /**
     * BB.W-DOCK-MORPH-FAMILY (c) — the PRM probe. Mirrors
     * `useDockOrientationMorph.prefersReducedMotion()` (the orientation driver's
     * precedent this collapse/expand path adopts). Under reduce there is NO morph
     * to play, so the geometry must seat SYNCHRONOUSLY at the target (no rAF
     * measure-defer, no morph window) — else the box paints the collapsed `from`
     * sliver while the spring's `respectReducedMotion` jump already reads the scalar
     * at the endpoint (the measured 10×74 blank-sliver P0 terminal failure).
     */
    function prefersReducedMotion(): boolean {
        return (
            typeof window !== "undefined" &&
            typeof window.matchMedia === "function" &&
            window.matchMedia("(prefers-reduced-motion: reduce)").matches
        );
    }

    // dimOf/morphAxisProp/getSize/clearMorphVars are the PURE geometry helpers
    // imported from dockMorphMeasure (BB.W-CARVE4 — carved sibling).

    /**
     * Whether ANY target is still mid-morph (a pinned span on its container). The
     * root keeps `[data-morphing]` + the scalar while any target is animating.
     */
    function anyMorphing(): boolean {
        for (const t of targets) {
            const el = t.containerEl.value;
            if (el && el.style.getPropertyValue("--dock-morph-to")) return true;
        }
        return false;
    }

    function settleTarget(t: MorphTarget) {
        const el = t.containerEl.value;
        if (el) clearMorphVars(el);
        // BC.W-DOCK-ROOT-MORPH — the outer target also pins the ROOT box span (so the
        // root's own measured `inline-size` rides the scalar, not just the inner's
        // compositor `scaleX`). Clear it on settle so the rest-state shrink-wrap owns
        // the box again.
        if (t === outerTarget) clearRootMorphSpan();
        t.leavingLayer.value = null;
    }

    /**
     * BC.W-DOCK-ROOT-MORPH — clear the ROOT's own morph span (the `inline-size` =
     * f(scalar) recipe in layers.css reads these; clearing them hands the box back to
     * the at-rest shrink-wrap once the morph settles).
     */
    function clearRootMorphSpan() {
        const r = root();
        if (!r) return;
        r.style.removeProperty("--dock-root-morph-from");
        r.style.removeProperty("--dock-root-morph-to");
    }

    /**
     * BC.W-DOCK-ROOT-MORPH — pin the ROOT box's own from→to span on the dock root.
     *
     * THE SNAP ROOT CAUSE: the inner `.dock-layers` reserves its SETTLED `to`
     * footprint (`inline-size: var(--dock-morph-to)`, layers.css — the E4-frozen
     * CDP-Layout-flat mechanism) and morphs VISUALLY via `transform: scaleX()`. A
     * `transform` is paint-only — a parent does NOT shrink-wrap to a scaled child —
     * so the root `.glass-dock` (display:inline-flex) shrink-wraps to the inner's
     * RESERVED full `to` width and SNAPS to full on frame 0, while the inner's scaled
     * box rides the spring smoothly. The gate (and the page) measure the ROOT box, so
     * the root must ALSO ramp.
     *
     * `rootFrom`/`rootTo` are the root box's OWN border-box widths on the morph axis,
     * measured DIRECTLY at the swap (`from`) and during the post-flush max-content
     * measure with the root pin lifted (`to`). The layers.css recipe reads
     * `inline-size: calc(from + (to−from)·--dock-morph-t)` (the SAME scalar the spring
     * glides, NO CSS transition — proof:no-layout-animation stays GREEN; a `calc()`
     * over the registered `--dock-morph-t` is not a transition).
     */
    function armRootMorphSpan(rootFrom: number, rootTo: number) {
        const r = root();
        if (!r) return;
        r.style.setProperty("--dock-root-morph-from", `${rootFrom}px`);
        r.style.setProperty("--dock-root-morph-to", `${rootTo}px`);
    }

    /** Clear the shared scalar + park the spring only once NO target is morphing. */
    function maybeSettleRoot() {
        if (anyMorphing()) return;
        const r = root();
        if (r) {
            r.style.removeProperty("--dock-morph-t");
            r.removeAttribute("data-morphing");
        }
        disposeSpring();
    }

    /**
     * Ensure the ONE shared spring is running 0→1, writing `--dock-morph-t` to the
     * root once per frame. Created once per morph episode; a fresh start seats it
     * at rest, a re-arm mid-flight RE-BASES it from its current velocity (the iOS
     * interruptible contract) so the trajectory stays continuous. The frame loop is
     * owned HERE (one `play()` per spring lifecycle), so N targets armed in the same
     * tick all ride this ONE loop — one clock. `respectReducedMotion` jumps the
     * scalar 0→1 in one frame, so the chrome snaps under PRM.
     */
    function ensureSpringRunning() {
        const r = root();
        if (!r) return;
        // BC.W-DOCK-GLIDE — the SNAP root cause + fix. The dock spring ALWAYS targets 1
        // (the morph DIRECTION lives in the `--dock-expand-t` derivation off the
        // `.collapsed`/`.expanded` class, NOT the spring sign — every episode runs the
        // scalar 0→1). So `set target = 1` on a re-armed spring is ALWAYS IDEMPOTENT
        // (keyframes.js: "Idempotent if the target is unchanged"), which means the prior
        // re-seat-the-live-spring path could NOT re-seat the closed-form clock and — when
        // the prior episode's `play()` rAF loop had already auto-stopped on settle — could
        // NOT restart the loop either. A swap that arrived while the prior morph was at
        // value≈1 (low velocity, near settle — exactly the gate's ENTER-at-900ms-mid-
        // collapse case) thus left `--dock-morph-t` frozen and the box SNAPPED to the
        // endpoint in one giant-dt frame.
        //
        // THE FIX: every morph episode gets a FRESH spring that starts from rest CARRYING
        // the prior spring's velocity (the iOS interruptible-physics continuity — a
        // mid-flight retarget joins the same trajectory) and `play()`s a GUARANTEED-running
        // loop. `reset(0, v)` + a fresh `target = 1` re-seats the closed-form origin/clock
        // cleanly (the idempotent-target trap cannot bite a fresh instance), so the scalar
        // genuinely GLIDES 0→1 over the ~285-320ms DOCK_SPRING clock — no snap, no freeze.
        const inheritedVelocity =
            spring !== null && !spring.settled ? spring.velocity : 0;
        disposeSpring();
        spring = new SpringProgress({
            response: DOCK_SPRING.response,
            dampingFraction: DOCK_SPRING.dampingFraction,
            initial: 0,
            respectReducedMotion: true,
        });
        const activeSpring = spring;
        activeSpring.reset(0, inheritedVelocity);
        activeSpring.target = 1;
        // BC.W-DOCK-GLIDE — seat the scalar at 0 SYNCHRONOUSLY now (before `play()`'s
        // first rAF callback). The prior episode's still-running `play()` loop may have
        // overwritten the onSwap pin's `--dock-morph-t = 0` back to its ~1 settle value
        // during the nextTick+rAF measure gap; `disposeSpring()` above stopped those
        // writes, but the LAST stale value lingers until this fresh spring's first
        // callback. Re-seating 0 here makes the single frame between this arm and the
        // first spring frame read 0 (the inner reserved `to` × scale 0 = collapsed
        // footprint), eliminating the 1-frame endpoint-flash before the glide.
        r.style.setProperty("--dock-morph-t", "0");
        activeSpring.play((tValue: number) => {
            const rr = root();
            if (rr) rr.style.setProperty("--dock-morph-t", `${tValue}`);
            if (activeSpring.settled) {
                // Settle every still-pinned target, then park the root.
                for (const tt of targets) {
                    const ttEl = tt.containerEl.value;
                    if (ttEl && ttEl.style.getPropertyValue("--dock-morph-to")) {
                        settleTarget(tt);
                    }
                }
                maybeSettleRoot();
            }
        });
    }

    /**
     * Arm the morph span on ONE target, then ensure the SHARED spring is running.
     * Each target's own `--dock-morph-from`/`--dock-morph-to` span interpolates
     * against the one `--dock-morph-t` scalar.
     */
    function armTarget(t: MorphTarget, id: number, fromSize: number, toSize: number) {
        if (id !== t.txId) return;
        const el = t.containerEl.value;
        const r = root();
        if (!el || !r) return;
        // No span — a same-size swap, nothing to morph. Land flush at rest.
        if (Math.abs(toSize - fromSize) < 0.5) {
            settleTarget(t);
            maybeSettleRoot();
            return;
        }
        el.style.setProperty("--dock-morph-from", `${fromSize}px`);
        el.style.setProperty("--dock-morph-to", `${toSize}px`);
        r.setAttribute("data-morphing", "");
        // The shared spring OWNS the `--dock-morph-t` scalar (written once per frame
        // from `ensureSpringRunning`); arming a target only pins its own span.
        ensureSpringRunning();
    }

    // measureTo + seatTargetSync (the reserved-footprint measure + the SYNCHRONOUS
    // PRM seat, composing the BA-VJS-1 nested ordering) are imported from
    // dockMorphMeasure (BB.W-CARVE4). The seat composes the orchestrator's settle
    // callbacks via the `seatCallbacks` bundle below.

    /** The settle callbacks the carved synchronous PRM seat composes. */
    const seatCallbacks = { settleTarget, maybeSettleRoot };

    /** The per-target swap handler — the W01 measured-once FLIP, shared spring. */
    function onSwap(t: MorphTarget, newLayer: string, oldLayer: string) {
        if (newLayer === oldLayer) return;
        const el = t.containerEl.value;
        const r = root();
        if (!el || !r) {
            t.currentLayer.value = newLayer;
            t.leavingLayer.value = null;
            return;
        }

        const id = ++t.txId;
        const axis = t.axis.value;

        // 1. Capture from-size BEFORE the ref-swap, so it reads the live painted
        //    geometry (a retarget reads mid-morph px; a fresh swap reads the rest
        //    aperture), never an intrinsic re-resolve.
        const fromSize = getSize(el, axis);
        // BC.W-DOCK-ROOT-MORPH — capture the ROOT box's own `from` on the morph axis
        // (the outer target only). The root box must ramp on the scalar too — the
        // inner `scaleX` is paint-only, so the root would otherwise shrink-wrap to the
        // inner's reserved full `to` and SNAP (the headline defect). Captured here at
        // the live painted geometry, mirrored to the root once `to` is measured.
        const rootFromSize = t === outerTarget ? getSize(r, axis) : 0;

        // 2. Swap the layer refs (drives the crossfade classes on the next flush).
        t.leavingLayer.value = oldLayer;
        t.currentLayer.value = newLayer;

        // 2b. The shared scalar resets to 0 for the new span. If SIBLING targets are
        //     mid-morph, re-base their `from` to their CURRENT painted px first, so
        //     resetting the scalar keeps them visually continuous (they interpolate
        //     fresh from where they are, toward their unchanged `to`). This is what
        //     makes a swap-while-morphing carry every active target's trajectory
        //     rather than snapping siblings back to their old `from`.
        for (const sib of targets) {
            if (sib === t) continue;
            const sibEl = sib.containerEl.value;
            if (sibEl && sibEl.style.getPropertyValue("--dock-morph-to")) {
                const cur = getSize(sibEl, sib.axis.value);
                sibEl.style.setProperty("--dock-morph-from", `${cur}px`);
            }
        }

        // 3. PIN this container at `from` NOW (from=to=from, scalar 0,
        //    `data-morphing` armed) so the box HOLDS and the child stagger holds at
        //    t=0. The active pane is in-flow (`width:max-content`), the inactive one
        //    is out of flow (`absolute; inset:0`) — so the container shrink-wraps to
        //    whichever pane is active. The to-size is the container shrink-wrapped to
        //    the TARGET pane, which only becomes in-flow AFTER Vue flushes the
        //    class flip. Reading `to` in this synchronous tick would see the OLD
        //    active pane (from≈to → frozen). Pinning defers the measurement safely.
        el.style.setProperty("--dock-morph-from", `${fromSize}px`);
        el.style.setProperty("--dock-morph-to", `${fromSize}px`);
        r.style.setProperty("--dock-morph-t", "0");
        r.setAttribute("data-morphing", "");
        // BC.W-DOCK-ROOT-MORPH — pin the ROOT span at `from` too (from=to=rootFrom),
        // so during the measure-defer frame the root holds its collapsed width on the
        // scalar recipe rather than snapping to the inner's reserved `to`. The true
        // `to` is measured one rAF later, after the post-flush inner measurement.
        if (t === outerTarget) armRootMorphSpan(rootFromSize, rootFromSize);

        // 3b. BB.W-DOCK-MORPH-FAMILY (c) — the SYNCHRONOUS PRM seat. Under
        //     `prefers-reduced-motion: reduce` there is NO morph window: seat the
        //     geometry + the scalar at the target in ONE step, NOT a zero-duration
        //     spring over an rAF-deferred span. The rAF measure-defer below pins the
        //     box at `from` while the spring's `respectReducedMotion` jump reads the
        //     scalar at the endpoint a frame later — so the box paints the collapsed
        //     `from` sliver (the measured 10×74 P0 terminal failure). The `nextTick`
        //     (a microtask post-flush, NOT an rAF morph window) runs AFTER Vue
        //     flushes the swapped pane in-flow (the flush-ordering the named
        //     successor names), so the synchronous measure reads the TRUE shrink-
        //     wrapped `to` (composing the BA-VJS-1 nested ordering via `measureTo`),
        //     then seats the box at `to` + scalar at the endpoint + clears the morph
        //     state — no spring, no rAF, no sliver. The orientation driver's `pin()`
        //     precedent, transplanted onto the collapse/expand path.
        if (prefersReducedMotion()) {
            void nextTick(() => seatTargetSync(t, id, root(), targets, seatCallbacks));
            return;
        }

        // 4. ONE rAF later (post-flush), lift the pin for a single synchronous
        //    measurement of the now-correct shrink-wrapped to-size, then re-pin +
        //    start the spring IN THE SAME FRAME — the box never paints unpinned. The
        //    measurement + arm are gated on THIS target's own `txId`, so a sibling
        //    target swapping in the same tick (a simultaneous collapse + pane-swap)
        //    does NOT clobber this target's deferred measurement.
        //
        // BA.W-DOCK-MORPH-INSITU (BA-VJS-1 [valuejs-fold A-1], §F2 RESOLVED) — the
        // nested-`DockLayerGroup` measure-ORDERING fix (NOT a spring/clock change —
        // `DOCK_SPRING` in ../constants is byte-untouched; the letter's fence).
        // The §F2 booking above under-scoped this as "first-mount intermittent" —
        // the value.js N2 four-cycle reproduction (U-DOCK.md §5 recipe 2) proves it
        // DETERMINISTIC + PERMANENT for ANY nested group: the outer `.dock-layers`'
        // active full pane's ONLY content is a nested `.dock-layer-stack` — itself a
        // registered morph target STILL reserving its own collapsed/morph footprint
        // in the SAME rAF (the BB.W-DOCK-MORPH-FAMILY reserved-footprint
        // `inline-size: var(--dock-morph-to)` + `transform: scale()`, layers.css).
        // Forcing `max-content` on the OUTER cannot grow the inner (the inner's
        // reserved `inline-size`/`block-size` caps the shrink-wrap), so the outer measures the
        // inner's COLLAPSED span → `to:0` every cycle (springs the wrong way,
        // dead-holds, then snaps). The FIX composes the inner registered target's
        // OWN target `max-content` contribution into the outer measure: force every
        // OTHER target whose container is a DOM descendant of this outer's container
        // to its own-axis `max-content` (clearing its pinned calc span) for the
        // single synchronous measurement, then RESTORE its exact prior inline state.
        // So the outer shrink-wraps around the inner's TRUE intrinsic content (the
        // settled-dock 261.1px the letter records), not the inner's pinned collapse.
        //
        // BC.W-DOCK-GLIDE — the measure is gated behind `nextTick` (Vue's post-flush
        // microtask) BEFORE the layout rAF. The to-pane's in-flow-ness is driven by
        // the `.dock-layer--full.is-active` class, itself bound to `visualExpanded`. A
        // re-expand that arrives mid-collapse (the gate's ENTER-at-900ms case) schedules
        // its measure rAF in the SAME task that flips the reactive state, so a bare rAF
        // can fire BEFORE Vue flushes the active-pane class — the to-pane is still
        // `position:absolute` (out of flow), `max-content` reads the empty summary, and
        // the measure returns `to:0` → armTarget same-size early-returns → the box SNAPS
        // to rest with no spring (the exact mid-collapse re-expand snap). `nextTick`
        // lands the measure AFTER the class flush (the same post-flush ordering the PRM
        // `seatTargetSync` path already relies on), so the to-pane is in-flow and the
        // max-content read is the true expanded span.
        void nextTick(() => requestAnimationFrame(() => {
            if (id !== t.txId) return;
            const elNow = t.containerEl.value;
            const rootNow = root();
            if (!elNow || !rootNow) return;
            clearMorphVars(elNow);
            // The container is laid out at the still-collapsed clip width, so a bare
            // measure reads the CLIPPED size, not the target pane's intrinsic size
            // (circular — the expanded aperture is what the spring solves for).
            // Force `max-content` on the morph axis for the single measurement, then
            // clear it before `armTarget` re-pins the calc span.
            const prop = morphAxisProp(axis);
            // BA-VJS-1 — force nested descendant targets to their OWN intrinsic span
            // for the duration of THIS measure so the outer shrink-wraps around the
            // inner's real content, not its pinned-collapsed clip. Each is restored
            // to its exact prior inline state right after the synchronous read.
            const nested = nestedTargetsWithin(t, elNow, targets);
            const restore = nested.map((n) => forceNestedMaxContent(n));
            // BC.W-DOCK-ROOT-MORPH — for the OUTER target, LIFT the root's own pinned
            // span for the duration of this synchronous measure so the root shrink-
            // wraps to its TRUE target width (the inner is at `max-content` below), then
            // read the root's `to` directly. A DIRECT root measurement sidesteps the
            // chrome-offset arithmetic AND the empty-summary `inner-to:0` trap (the
            // overview dock's `#collapsed` summary clips `.dock-layers` to 0, so an
            // inner-span-derived rootTo mis-signs). The root box is exactly what the
            // gate + the page reflow read — measure it, not a derivation of the inner.
            // BC.W-DOCK-GLIDE — the ROOT-PIN measure trap. The layers.css recipe
            // `[data-morphing] .glass-dock { inline-size: calc(rootFrom + (rootTo−rootFrom)·t) }`
            // CONSTRAINS the root to its pinned (collapsed) width while the span vars are
            // armed. The `.dock-layers` grid child carries `min-width: 0`, so a
            // root pinned small CLAMPS the child to 0 even with `inline-size: max-content`
            // requested → the measure reads `to:0` and the morph snaps. The recipe is
            // driven by the `--dock-root-morph-from/to` VARS (not an inline `inline-size`),
            // so the pin must be lifted by clearing those vars, not by removing an inline
            // size. Snapshot + restore them around the synchronous measure so the root is
            // free to shrink-wrap to its TRUE expanded width while we read.
            const liftRootPin = t === outerTarget;
            const priorRootFrom = liftRootPin
                ? rootNow.style.getPropertyValue("--dock-root-morph-from")
                : "";
            const priorRootTo = liftRootPin
                ? rootNow.style.getPropertyValue("--dock-root-morph-to")
                : "";
            if (liftRootPin) clearRootMorphSpan();
            elNow.style.setProperty(prop, "max-content");
            const measuredTo = getSize(elNow, axis);
            const rootMeasuredTo = liftRootPin ? getSize(rootNow, axis) : 0;
            elNow.style.removeProperty(prop);
            // BC.W-LIQUID-MORPH (M3) — the measure-failure guard (the defensive
            // complement to the BA-VJS-1 nested-max-content ordering above). If the
            // synchronous measurement returns 0 (a mis-measure: a mid-morph re-grab, a
            // nested collapsible still pinned, a race the ordering fix missed), the morph
            // would otherwise arm a `to:0` span → the reserved-footprint reserves the
            // collapsed-pill floor (the CSS `max(--dock-morph-to, --dock-morph-min)` net),
            // but the SCALAR ratio would still run toward a degenerate target. SEAT the
            // measurement at the resolved floor span here so the morph interpolates toward
            // a visible footprint, never toward 0 — a missed measurement degrades to
            // "visible at the floor," NEVER "white." On a healthy measurement (measuredTo
            // > 0) this is inert (the `||` keeps the real span). The floor reads the
            // element's resolved `--dock-morph-min` (density-scaled), falling back to the
            // WCAG ~44px touch floor.
            const floorPx = morphMinFloorPx(elNow);
            const toSize = measuredTo > 0 ? measuredTo : floorPx;
            const rootToSize =
                !liftRootPin || rootMeasuredTo > 0 ? rootMeasuredTo : morphMinFloorPx(rootNow);
            if (liftRootPin) {
                // Restore the prior (pin-at-from) span so the box keeps holding its
                // collapsed width until armRootMorphSpan re-pins the true to-span below.
                if (priorRootFrom)
                    rootNow.style.setProperty("--dock-root-morph-from", priorRootFrom);
                if (priorRootTo)
                    rootNow.style.setProperty("--dock-root-morph-to", priorRootTo);
            }
            for (const r of restore) r();
            armTarget(t, id, fromSize, toSize);
            // BC.W-DOCK-ROOT-MORPH — pin the ROOT box's measured from→to span so its
            // `inline-size` ramps on the SAME scalar the spring drives instead of
            // snapping to the inner's reserved `to`. A same-size swap (the inner
            // settled in armTarget) clears the span so the box shrink-wraps at rest.
            if (t === outerTarget) {
                if (Math.abs(rootToSize - rootFromSize) < 0.5) clearRootMorphSpan();
                else armRootMorphSpan(rootFromSize, rootToSize);
            }
        }));
    }

    // nestedTargetsWithin + forceNestedMaxContent (the BA-VJS-1 nested-descendant
    // max-content ordering) are imported from dockMorphMeasure (BB.W-CARVE4).

    /** Register a morph target; returns its watch-stop. */
    function addTarget(reg: DockMorphGroupRegistration): MorphTarget {
        const t: MorphTarget = {
            containerEl: reg.containerEl,
            activeLayer: reg.activeLayer,
            axis: reg.axis,
            currentLayer: ref(reg.activeLayer.value),
            leavingLayer: ref<string | null>(null),
            txId: 0,
            stop: () => {},
        };
        t.stop = watch(reg.activeLayer, (newLayer, oldLayer) => {
            onSwap(t, newLayer, oldLayer);
        });
        targets.add(t);
        return t;
    }

    function removeTarget(t: MorphTarget) {
        t.stop();
        targets.delete(t);
        maybeSettleRoot();
    }

    // The OUTER collapse↔expand pair is the first registered target.
    const outerTarget = addTarget({
        containerEl: outerEl,
        activeLayer: outerActiveLayer,
        axis: outerAxis,
    });

    // The provided seam a nested group registers through.
    const context: DockMorphContext = {
        registerGroup(reg) {
            const t = addTarget(reg);
            return {
                currentLayer: readonly(t.currentLayer),
                leavingLayer: readonly(t.leavingLayer),
                release: () => removeTarget(t),
            };
        },
    };

    function onOuterTransitionEnd(e: TransitionEvent) {
        const el = outerEl.value;
        if (!el || e.target !== el) return;
        const prop = morphAxisProp(outerAxis.value);
        if (e.propertyName !== prop && e.propertyName !== dimOf(outerAxis.value)) return;
        if (spring && spring.settled) {
            settleTarget(outerTarget);
            maybeSettleRoot();
        }
    }

    onUnmounted(() => {
        for (const t of targets) t.stop();
        targets.clear();
        disposeSpring();
    });

    return {
        context,
        outerCurrentLayer: readonly(outerTarget.currentLayer),
        onOuterTransitionEnd,
    };
}
