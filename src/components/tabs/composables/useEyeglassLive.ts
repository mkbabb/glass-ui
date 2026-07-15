// BI.W-TABS-FACTOR — useEyeglassLive: the iOS-27 tab-pill LOUPE two-rest-state release.
//
// The eyeglass pill is a TWO-REST-STATE machine (TABS-GLASS-LADDER §1), not a static
// loupe: a SETTLED long rest (an inset ink-darkened plate, 0.84× the slot) and a LIVE
// touched/travelling/just-arrived state (a proud magnifying loupe, 1.12× — spilling
// past the track). This composable owns the `--eyeglass-live-t` scalar (0 = settled,
// 1 = live) that drives the plate's block-proud `scaleY` magnify, on the energize →
// dwell → decay lifecycle: pointer-down/select ENERGIZES to LIVE (before + through the
// travel), a dwell holds it, then it DECAYS back to SETTLED.
//
// THE ONE INTEGRATOR (the R9 dual-path fence, BI.W-TABS-FACTOR E10): this composable
// owns NO rAF and NO spring of its own — it CONSUMES `useLeadTrail` (the ONE two-edge
// lead/trail integrator minted by BI.W-PAGER-WORM; the pager worm is consumer #1, this
// is consumer #2). The lead spring rides the `eyeglass` SPRING_PRESETS row (response
// 0.36, ζ 0.64 — read via `springPreset`, NEVER a hand-inlined pair, the M1 single
// source); the trail lags τ≈0.27s. We write `--eyeglass-live-t` from the `hi` edge
// (`max(lead, trail)`) so the §2/§8.3 EDGE-ASYMMETRY emerges from the two edges: on the
// RISE the fast lead governs `hi` (energize ≤~150ms), on the FALL the slow trail
// governs `hi` (the ~270ms deflate) — a fast-energize / slow-decay pulse the leading
// edge alone (a plain spring) could not produce. The dwell is a one-shot `setTimeout`
// (a discrete hold timer, NOT a second integrator — the `useSelectionIndicator`
// releaseTimer precedent).
//
// PRM (motion-canon P6): `useLeadTrail` seats instantly under `prefers-reduced-motion:
// reduce` (zero in-between frames); the CSS additionally pins `--eyeglass-y: 1` under
// PRM (segmented-tabs-drag.css) so the loupe rests as a flat slot-fill capsule (the
// calm degrade floor) — the state confirms, the deform is off.

import { onMounted, onScopeDispose, watch, type ComputedRef, type Ref } from "vue";
import { useLeadTrail } from "../../../composables/motion/useLeadTrail";
import { springPreset } from "../../../composables/motion/springPresets";

// The eyeglass travel spring — the ONE SPRING_PRESETS row (no hand-inlined pair; M1).
const EYEGLASS_SPRING = springPreset("eyeglass");
// The LIVE dwell (§1: 250–400ms bright/proud hold post-arrival). The dwell holds the
// loupe proud, then the decay releases it back to settled.
const DWELL_MS = 320;
// The trailing follower time constant (§2/§8.3: the ~270ms deflate lag). This is the
// useLeadTrail default too; passed explicitly so the eyeglass release reads its intent.
const TRAIL_TAU_S = 0.27;
const LIVE = 1; // proud
const SETTLED = 0; // inset

export interface UseEyeglassLiveParams {
    /** The active indicator element (the `--eyeglass-live-t` write target; the nested
     *  `.segmented-indicator__plate` reads the inherited scalar). */
    indicatorRef: Ref<HTMLElement | null>;
    /** True when the eyeglass loupe register is engaged (pill material, non-underline).
     *  When false the composable seats settled and never energizes. */
    enabled: ComputedRef<boolean>;
}

export interface UseEyeglassLive {
    /** Energize to LIVE (proud), hold the dwell, then decay to SETTLED. Fired on
     *  pointer-down (the §1 pre-motion bloom) AND on select (the keyboard path). */
    energize(): void;
    /** Force the scalar to SETTLED instantly (mount / disable). */
    settle(): void;
}

export function useEyeglassLive(params: UseEyeglassLiveParams): UseEyeglassLive {
    const { indicatorRef, enabled } = params;

    let dwellTimer: ReturnType<typeof setTimeout> | null = null;

    // The ONE integrator (consumer #2 of useLeadTrail). onFrame writes the `hi` edge
    // → the edge-asymmetric fast-up / slow-down pulse (see header). NO own rAF/spring.
    const live = useLeadTrail({
        response: EYEGLASS_SPRING.response,
        damping: EYEGLASS_SPRING.dampingFraction,
        trailTau: TRAIL_TAU_S,
        onFrame({ hi }) {
            const el = indicatorRef.value;
            if (el) el.style.setProperty("--eyeglass-live-t", String(hi));
        },
    });

    function clearDwell(): void {
        if (dwellTimer) {
            clearTimeout(dwellTimer);
            dwellTimer = null;
        }
    }

    function energize(): void {
        if (!enabled.value) return;
        clearDwell();
        // Bloom to LIVE (the lead springs, the trail follows) …
        live.drive(LIVE);
        // … hold the dwell, then decay to SETTLED (the lead recovers fast, the trail
        // pours out over ~270ms — the emergent edge-asymmetric deflate).
        dwellTimer = setTimeout(() => {
            live.drive(SETTLED);
            dwellTimer = null;
        }, DWELL_MS);
    }

    function settle(): void {
        clearDwell();
        live.seat(SETTLED);
    }

    // Seat SETTLED once mounted (indicatorRef resolved) so the initial paint reads the
    // calm inset plate; re-seat if the loupe register toggles off.
    onMounted(() => settle());
    watch(enabled, (on) => {
        if (!on) settle();
    });

    onScopeDispose(() => {
        clearDwell();
        live.dispose();
    });

    return { energize, settle };
}
