import { onUnmounted, readonly, ref, watch } from "vue";
import type { Ref } from "vue";
import { SpringProgress } from "@mkbabb/keyframes.js";
import { createOptionalContext } from "../../../../composables/context";

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
 */
const DOCK_SPRING = { response: 0.32, dampingFraction: 0.7 } as const;

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
interface MorphTarget {
    containerEl: Ref<HTMLElement | null>;
    activeLayer: Ref<string>;
    axis: Ref<"horizontal" | "vertical">;
    currentLayer: Ref<string>;
    leavingLayer: Ref<string | null>;
    /**
     * PER-TARGET swap generation. Each target owns its own monotonic id so two
     * targets swapping in the SAME tick (a simultaneous collapse + pane-swap) do
     * NOT clobber each other's deferred rAF measurement — the SHARED spring is the
     * one clock, but each target's pin/measure pipeline is gated on its own id.
     */
    txId: number;
    stop: () => void;
}

const ctx = createOptionalContext<DockMorphContext>("glass-ui:dock-morph-context");

export const DOCK_MORPH_KEY = ctx.KEY;

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

    function dimOf(axis: "horizontal" | "vertical"): "width" | "height" {
        return axis === "vertical" ? "height" : "width";
    }
    function morphAxisProp(axis: "horizontal" | "vertical"): "inline-size" | "block-size" {
        return dimOf(axis) === "width" ? "inline-size" : "block-size";
    }
    function getSize(el: HTMLElement, axis: "horizontal" | "vertical"): number {
        return el.getBoundingClientRect()[dimOf(axis)];
    }

    function clearMorphVars(el: HTMLElement) {
        el.style.removeProperty("--dock-morph-from");
        el.style.removeProperty("--dock-morph-to");
    }

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

        // 4. ONE rAF later (post-flush), lift the pin for a single synchronous
        //    measurement of the now-correct shrink-wrapped to-size, then re-pin +
        //    start the spring IN THE SAME FRAME — the box never paints unpinned. The
        //    measurement + arm are gated on THIS target's own `txId`, so a sibling
        //    target swapping in the same tick (a simultaneous collapse + pane-swap)
        //    does NOT clobber this target's deferred measurement.
        //
        // BOOKED: AY.W-GOD1 — §F2 first-mount FLIP mis-seat (W-DOCK1-DELTA §F2).
        // REPRODUCTION: a `#persistent`-slot collapsible dock (overview.vue:89), on a
        // FRESH, never-interacted session, can first-hover-measure collapsed→collapsed
        // (10px → 18px, scalar 0) while non-`#persistent` collapsible docks morph
        // cleanly (35→487px). The `#persistent` slot is shared between the `--summary`
        // and `--full` panes, so on the FIRST swap the `max-content` measure below can
        // read the still-collapsed clip width before the persistent slot's layout has
        // re-settled into the target pane — a measurement-timing edge specific to
        // first-mount (intermittent / interaction-order-dependent). The FIX (seat
        // `--dock-morph-from/to` before first paint, or double-rAF the FIRST measure on
        // a `#persistent` dock) is a GlassDock.vue/orchestrator first-mount-seat change
        // that rides the W-GOD1 FLIP-engine fold + GlassDock carve (which touch this
        // same measure code). BOOKED there with this reproduction rather than patched
        // in this disjoint W-DOCK2 edit. Witnessed by the dock-animation-live π arm on
        // the deterministic `data-testid="dock-capture"` slider dock (not a #persistent
        // dock), so the lockstep gate is unaffected by the first-mount edge.
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
            elNow.style.setProperty(prop, "max-content");
            const toSize = getSize(elNow, axis);
            elNow.style.removeProperty(prop);
            armTarget(t, id, fromSize, toSize);
        });
    }

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
