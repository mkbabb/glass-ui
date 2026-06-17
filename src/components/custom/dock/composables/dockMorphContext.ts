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
        t.leavingLayer.value = null;
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
        const live = spring !== null && !spring.settled;
        const inheritedVelocity = live ? spring!.velocity : 0;
        if (!spring || spring.settled) {
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
        } else {
            // A live spring mid-flight: re-seat from its current velocity onto the
            // 0→1 span so a newly-armed target joins the SAME trajectory.
            spring.reset(0, inheritedVelocity);
            spring.target = 1;
        }
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
        requestAnimationFrame(() => {
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
            elNow.style.setProperty(prop, "max-content");
            const toSize = getSize(elNow, axis);
            elNow.style.removeProperty(prop);
            for (const r of restore) r();
            armTarget(t, id, fromSize, toSize);
        });
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
