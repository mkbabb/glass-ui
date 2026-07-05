import { onUnmounted, readonly, ref, watch } from "vue";
import type { Ref } from "vue";
import { createOptionalContext } from "../../../../composables/context";
import { DOCK_MORPH_LABEL, DOCK_SPRING } from "../constants";
// BD.W-DOCK-CORE — the width-seizure cure. The per-swap FLIP measure pipeline
// (measureAndArmMorph/seatTargetSync/rebaseSiblingSpans/forceNestedMaxContent/
// measureTo/armRootMorphSpan/clearRootMorphSpan/morphMinFloorPx) is DELETED. The
// orchestrator now ONLY arms `[data-morphing]`, runs ONE dock spring writing
// the `--dock-morph-t` 0→1 scalar, and swaps the per-target crossfade classes; the
// VISIBLE size rides the ratio-free `--dock-live` convex blend of two measure-ONCE
// endpoints (`useDockExpandedSize` + layers.css), so the unbounded `from/to` ratio
// that detonated the width (`scaleX(~56)` ≈ 2451px) is GONE by construction.
// BG.W-DOCK-ENGINE-UNIFY — the raw `new SpringProgress` create/re-base/dispose dance
// is factored into the ONE `useDockSpring` factory (the band's sole `new SpringProgress`
// site); this orchestrator drives a `DockSpring` handle, arming the attrs + writing the
// scalar, NEVER instantiating a spring itself.
import { useDockSpring } from "./useDockSpring";

/**
 * AX.W02 — ONE morph orchestrator per dock. The dock is a single morph stack
 * whose active "layer" is `(expandedState × activePane)`: the outer
 * collapse↔expand swap and the inner `<DockLayerGroup>` pane swaps are
 * transitions in the SAME group — ONE spring, ONE scalar (`--dock-morph-t`),
 * ONE clock. No second engine.
 *
 * BD.W-DOCK-CORE (the size re-invent) — the orchestrator no longer MEASURES a
 * per-swap `from/to` span. The visible size is a ratio-free convex blend of two
 * endpoints measured ONCE per content change (`useDockExpandedSize` writes
 * `--dock-expanded-px`/`--dock-collapsed-px`; layers.css blends them on
 * `--dock-morph-t`). So this driver shrinks to its essence: on a layer swap it
 * arms `[data-morphing]`, swaps the crossfade classes (the a11y-006 3-state
 * hit-test contract, LOAD-BEARING — KEPT verbatim), and runs ONE `SpringProgress`
 * gliding `--dock-morph-t` 0→1; on settle it clears the morph state. A re-toggle
 * mid-flight re-bases the live solver onto a fresh spring CARRYING the prior
 * velocity (the iOS interruptible-physics continuity).
 *
 * LIGHT-surface only: the `useDockSpring` factory's `SpringProgress` owns its own
 * rAF via `.play(onFrame)` and carries no static value.js edge — the factory never
 * imports `AnimationGroup` / `./engine`.
 *
 * `DOCK_SPRING` is byte-fenced — it lives in `../constants`.
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
interface MorphTarget {
    containerEl: Ref<HTMLElement | null>;
    axis: Ref<"horizontal" | "vertical">;
    activeLayer: Ref<string>;
    currentLayer: Ref<string>;
    leavingLayer: Ref<string | null>;
    /**
     * BG.W-DOCK-PANE-OVERLAP (F3.R2, box axis) — `true` for the OUTER collapse↔expand
     * pair (which OWNS the plate box: `--dock-morph-t: 0` is that axis's COLLAPSED
     * endpoint), `false` for a nested `<DockLayerGroup>` pane-swap target. A pane swap
     * on an already-expanded dock is a same-expand-state crossfade — it must NOT seat
     * the shared box scalar at the collapsed endpoint (the paint-judge FAIL: the plate
     * dipped to the 53.68px pill mid-swap). The flag drives the box-HOLD `data-pane-swap`.
     */
    isOuter: boolean;
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
    /**
     * BG.NF.1 W-FALLBACK-EXCISE — a NOTIFY seam (NOT a busy-flag shadow): the
     * orchestrator calls `onMorphActiveChange(true)` when the outer morph spring ARMS
     * (alongside `setAttribute("data-morphing")`) and `(false)` when it SETTLES
     * (alongside `removeAttribute`), so a consumer (GlassDock) can drive its OWN
     * `isTransitioning` off the morph's OWN spring settle — the CSS-transition-era
     * wrong-clock settle timer + dead `@transitionend` resolver are excised. The
     * orchestrator holds NO parallel boolean (the single busy signal stays the
     * `[data-morphing]` attr + the factory's `.live` — proof:dock-engine-unify U3).
     */
    onMorphActiveChange?: (active: boolean) => void;
}

export interface UseDockMorphOrchestratorReturn {
    /** Provide-able context: a nested `<DockLayerGroup>` registers through it. */
    context: DockMorphContext;
    /** The outer pair's post-swap active layer id (call-site parity). */
    outerCurrentLayer: Readonly<Ref<string>>;
}

/**
 * The ONE morph engine for a dock instance. Drives a single `useDockSpring` handle
 * that glides the one `--dock-morph-t` scalar 0→1 on a layer swap; the size is a
 * ratio-free blend of the measure-ONCE endpoints (layers.css). Crossfade classes
 * (the 3-state a11y hit-test contract) swap on the swap; the spring is the clock.
 */
export function useDockMorphOrchestrator(
    options: UseDockMorphOrchestratorOptions,
): UseDockMorphOrchestratorReturn {
    const { rootEl, outerEl, outerActiveLayer, outerAxis } = options;

    // The single live morph driver — the ONE `useDockSpring` handle. A re-toggle
    // mid-flight RE-BASES it onto a fresh spring carrying the prior velocity (iOS
    // interruptible-physics), owned by the factory. The normalized scalar runs
    // 0→1; the per-frame value IS `--dock-morph-t` on the root. ONE dock spring is
    // the dock's single clock; the raw `new SpringProgress` lives in the factory.
    const dockSpring = useDockSpring({
        response: DOCK_SPRING.response,
        dampingFraction: DOCK_SPRING.dampingFraction,
    });

    const targets = new Set<MorphTarget>();

    function root(): HTMLElement | null {
        return rootEl.value;
    }

    /** Whether ANY target is still mid-morph (the root keeps `[data-morphing]`). */
    function anyMorphing(): boolean {
        const r = root();
        return !!r && r.hasAttribute("data-morphing");
    }

    function settleTarget(t: MorphTarget) {
        t.leavingLayer.value = null;
    }

    /** Clear the shared scalar + park the spring once the morph settles. */
    function maybeSettleRoot() {
        const r = root();
        if (r) {
            // BG.W-DOCK-GLYPH-RIGID (spec vocab (b)) — DROP the morph attrs BEFORE the
            // scalar so at settle the residual `scale:` lives ONLY under `[data-morphing]`.
            // The box-size scale (shape.css `.glass-dock[data-morphing]…{scale}`) AND the
            // glyph-rigid inverse-scale on the content children (`.dock-persistent`/
            // `.dock-layers`, the per-frame inverse of `--dock-size-scale`) both gate on
            // `[data-morphing]`/`[data-punching]`; clearing the attrs FIRST stops both
            // rules matching, so removing the registered `--dock-morph-t` (which reverts to
            // its `@property initial-value: 0`) cannot flash a one-frame collapsed-look
            // scale on the already-settled true box. All four mutations coalesce into ONE
            // style recalc (one synchronous task, no paint between), so the settle seats
            // `scale: none` over the TRUE collapsed/expanded box with the glyph rigid.
            r.removeAttribute("data-morphing");
            r.removeAttribute("data-punching");
            // BG.W-DOCK-PANE-OVERLAP (F3.R2) — drop the box-HOLD marker in the SAME recalc
            // as the morph attrs + scalar, so no post-settle frame reads a stale hold.
            r.removeAttribute("data-pane-swap");
            r.style.removeProperty("--dock-morph-t");
        }
        // BG.NF.1 W-FALLBACK-EXCISE — notify the settle (alongside clearing the single
        // `[data-morphing]` busy signal) so a consumer's `isTransitioning` resolves from
        // the spring's OWN settle, not a wrong-clock timer. No parallel flag is held.
        options.onMorphActiveChange?.(false);
        dockSpring.dispose();
    }

    /**
     * Seat EVERY target + the shared root at their settled state — the ONE settle
     * path both `onSettle` (the spring's natural 2%-band ring-down) AND the
     * early-arrival drop (`onFrame` at `tValue ≥ 1`) call. Drops each target's
     * leaving pane, then the root morph attrs + scalar via `maybeSettleRoot`
     * (which owns the attrs-BEFORE-scalar order, spec vocab (b)).
     */
    function settleAll() {
        for (const tt of targets) settleTarget(tt);
        maybeSettleRoot();
    }

    /**
     * Ensure the ONE shared spring is running 0→1, writing `--dock-morph-t` once
     * per frame. `dockSpring.playTo(0, 1, …)` mints a FRESH spring that starts from
     * rest CARRYING the prior spring's velocity (iOS interruptible continuity) and
     * `play()`s a GUARANTEED-running loop — the idempotent-target trap (a re-arm at
     * value≈1 leaving the closed-form clock frozen) cannot bite a fresh instance, so
     * the scalar genuinely GLIDES 0→1 over the ~285–320ms DOCK_SPRING clock. The
     * factory's `respectReducedMotion` jumps the scalar 0→1 in one frame under PRM.
     */
    function ensureSpringRunning(paneSwap = false) {
        const r = root();
        if (!r) return;
        // BG.NF.1 W-FALLBACK-EXCISE — notify the arm alongside setting the single
        // `[data-morphing]` busy signal (the consumer drives its own isTransitioning).
        options.onMorphActiveChange?.(true);
        r.setAttribute("data-morphing", "");
        // BG.W-DOCK-PANE-OVERLAP (F3.R2, box axis) — a NESTED pane swap HOLDS the box.
        // The plate box + chrome are driven off `--dock-expand-t` (morph.css), which for a
        // collapse/expand tracks `--dock-morph-t` (seated at 0 → the collapsed endpoint).
        // A pane swap leaves the dock's expand STATE unchanged, so seating the shared
        // scalar at 0 spuriously collapsed the plate to the 53.68px pill mid-swap (the
        // paint-judge FAIL). `data-pane-swap` gates morph.css's `--dock-expand-t`
        // derivation `:not([data-pane-swap])` so the box + chrome HOLD at the class
        // endpoint (expanded) while `--dock-morph-t` still glides 0→1 for the overlapped
        // crossfade + the inner stagger (both read `--dock-morph-t` directly, untouched).
        // The cartoon box-punch is skipped too — a held box has no footprint to punch;
        // the OUTER collapse/expand keeps it (byte-identical to HEAD).
        if (paneSwap) {
            r.setAttribute("data-pane-swap", "");
        } else {
            r.removeAttribute("data-pane-swap");
            // BD.W-DOCK-PUNCH-CHANNEL — arm the dedicated cartoon-punch for ONE episode.
            // `[data-punching]` lifts `--dock-punch-stretch` to its overshoot target; the
            // CSS transition on `--ease-cartoon-punch` carries it there on the punch curve
            // (the ~4% pre-dip + ~22% overshoot), and clearing the hook below transitions it
            // back to 1 (the RETURN — never latched). Cleared partway through the glide so
            // the return completes by settle. PRM zeroes `--motion-weight` → amplitude 1.
            r.setAttribute("data-punching", "");
        }
        // Seat the scalar at 0 SYNCHRONOUSLY now (before the factory's `play()` first
        // rAF) so the single frame between this arm and the first spring frame reads 0
        // (the collapsed footprint), eliminating a 1-frame endpoint-flash before the
        // glide.
        r.style.setProperty("--dock-morph-t", "0");
        dockSpring.playTo(0, 1, {
            onFrame: (tValue: number) => {
                const rr = root();
                if (!rr) return;
                rr.style.setProperty("--dock-morph-t", `${tValue}`);
                // Clear the punch hook past the curve's overshoot peak so it
                // transitions BACK to the rest 1 before the morph settles (the
                // never-latch fence).
                if (tValue > 0.5 && rr.hasAttribute("data-punching")) {
                    rr.removeAttribute("data-punching");
                }
                // BG.W-DOCK-GLYPH-RIGID (F3.R1 secondary) — SETTLE AT VISIBLE ARRIVAL,
                // not at the spring's ~1s analytic ring-down. The DOCK spring
                // (response 0.68, ζ 0.64) overshoots past 1 then rings down over its
                // full 2%-band settle (~1s wall-clock); on an engine whose settle runs
                // long (WebKit under the glass-blur compositing load) `[data-morphing]`
                // lingered ~800–1000ms, holding the box in its reserved-expanded ×
                // collapsed-scale state — a narrow scaled-reserve plate, NOT the resting
                // circle — a ~1s sliver-at-rest (the F3.R1 paint FAIL). But the VISIBLE
                // morph is COMPLETE at arrival (`tValue ≥ 1`): the box size clamps
                // `clamp(0, --dock-expand-t, 1)` so it never grows past the endpoint, the
                // punch has returned (cleared above), and both crossfade panes are at
                // their endpoints (entering opacity 1, leaving 0, matching their base rest
                // rules). So drop the morph state at arrival on EVERY engine
                // (deterministic — keyed off the scalar, NOT the engine-variable
                // ring-down): the TRUE collapsed/expanded box (inline-size → auto, the
                // AY.W-DOCK-NAV B4 aspect-ratio circle) seats within one beat. `settleAll`
                // → `maybeSettleRoot` still drops the attrs BEFORE the scalar (spec
                // vocab (b), the G2 order) and disposes the spring (idempotent; the
                // still-live-mid-flight re-toggle before arrival re-bases as before). A
                // ζ ≥ 1 config (no overshoot) never crosses 1 and falls back to the
                // natural `onSettle` — no regression for a critically-damped register.
                if (tValue >= 1 && rr.hasAttribute("data-morphing")) {
                    settleAll();
                }
            },
            onSettle: () => {
                settleAll();
            },
        });
    }

    /** The per-target swap handler — swap the crossfade classes, run the spring. */
    function onSwap(t: MorphTarget, newLayer: string, oldLayer: string) {
        if (newLayer === oldLayer) return;
        const r = root();
        if (!r) {
            t.currentLayer.value = newLayer;
            t.leavingLayer.value = null;
            return;
        }
        // Swap the layer refs — drives the `.is-active`/`.is-leaving` crossfade +
        // hit-test classes on the next flush (the a11y-006 3-state contract). The
        // size rides the `--dock-live` blend off the scalar below; NO measurement.
        t.leavingLayer.value = oldLayer;
        t.currentLayer.value = newLayer;
        // BG.W-DOCK-PANE-OVERLAP (F3.R2) — a NESTED pane-swap target (NOT the outer
        // collapse↔expand pair) HOLDS the box: the swap is a same-expand-state crossfade,
        // never a box collapse. Only the outer pair owns the collapse/expand box axis.
        ensureSpringRunning(!t.isOuter);
    }

    /** Register a morph target; returns its watch-stop. `isOuter` marks the collapse↔expand pair. */
    function addTarget(
        reg: DockMorphGroupRegistration,
        isOuter = false,
    ): MorphTarget {
        const t: MorphTarget = {
            containerEl: reg.containerEl,
            axis: reg.axis,
            activeLayer: reg.activeLayer,
            currentLayer: ref(reg.activeLayer.value),
            leavingLayer: ref<string | null>(null),
            isOuter,
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
        if (!anyMorphing()) dockSpring.dispose();
    }

    // The OUTER collapse↔expand pair is the first registered target — the ONLY target
    // that owns the plate box (`isOuter: true`, so its swap drives the collapse/expand box
    // morph; a nested pane swap HOLDS the box — BG.W-DOCK-PANE-OVERLAP F3.R2).
    const outerTarget = addTarget(
        {
            containerEl: outerEl,
            activeLayer: outerActiveLayer,
            axis: outerAxis,
        },
        true,
    );

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

    onUnmounted(() => {
        for (const t of targets) t.stop();
        targets.clear();
        dockSpring.dispose();
    });

    return {
        context,
        outerCurrentLayer: readonly(outerTarget.currentLayer),
    };
}
