// BB.B2 W-DOCKMORPH-CTA — useDockCtaReceive: the external-CTA-MORPHS-INTO-dock seam.
//
// An EXTERNAL CTA — a button/control OUTSIDE the dock — MORPHS INTO a dock control: it
// flies + reshapes from its own rect onto the target dock control's rect (a continuous
// compositor-flat morph), is absorbed (fades + congests into the glass), and the dock
// control takes over. Where `useLiquidReveal` blooms a surface FROM a trigger onto its OWN
// settled rect (the open), this morphs the CTA FROM its own rect TO a FOREIGN target: the
// reveal's inverse. CTA-rect → fly+reshape → land-on-dock-control → hand-off.
//
// BG.W-MOTION-SPINE — this is now a THIN wrapper over `useElementMorph` (the ONE compositor
// FLIP runner). It owns no scheduler or private spring; it declares the CTA and dock
// control as explicit endpoints with opacity + blur on the owner's clock. A consuming seam beside
// W-DOCK-MORPH-FAMILY — it does NOT touch `useDockMorph`/`dockMorphMeasure`/`DOCK_SPRING`
// (the dock's own collapse/expand morph is W-DOCK-MORPH-FAMILY's; this morphs an EXTERNAL
// element onto a dock control beside it). Keyframes-bearing (via the runner) → `/motion`
// ONLY, never the root barrel (the SCC-trap discipline).
//
// THE LANDING SEAT (BC.W-AX-DOCK-CTA-SEAT). `setPending`/`clearPending` toggle a
// `[data-cta-pending]` attribute on the dock control — the seat partial
// (`src/styles/dock/cta-seat.css`) paints a dim ghost + reserves the resting footprint
// (a STATIC `min-inline-size`/`min-block-size`) so the dock box NEVER jumps when the CTA
// lands, and reveals the real content with a plain `transition: opacity` FLIP. The seat
// writes are DATA-ATTRIBUTE writes (never a layout animation — the compositor-only floor
// extends to the seat); they stay wrapper-local (they are not motion — the runner drives
// the morph, the seat is a static reserve + a content fade).

import { readonly, ref, type ComponentPublicInstance, type Ref } from "vue";
import {
    asElement,
    prefersReducedMotion,
    useElementMorph,
    type ElementMorphPreset,
} from "./useElementMorph";

/** The receive spring register — `snappy` (the crisp absorb default) or `bouncy` (the
 *  emphatic land-with-overshoot). Matches `useLiquidReveal`'s register so the two seams
 *  read as ONE family. */
export type DockCtaReceivePreset = ElementMorphPreset;

export type DockCtaReceivePath = "fine" | "coarse" | "reduced-motion" | "no-target";
export type DockCtaReceivePhase =
    | "idle"
    | "receiving"
    | "settled"
    | "handed-off"
    | "completed"
    | "reset";

export interface DockCtaReceiveBand {
    readonly latencyFactor: readonly [number, number];
    readonly travelPx: readonly [number, number];
    readonly scaleRatio: readonly [number, number];
}

/** Product bounds relative to the selected spring's measured analytic horizon. */
export const DOCK_CTA_RECEIVE_BANDS = {
    fine: { latencyFactor: [0.9, 1.2], travelPx: [16, 520], scaleRatio: [0.2, 1.4] },
    coarse: { latencyFactor: [0.9, 1.2], travelPx: [16, 360], scaleRatio: [0.2, 1.4] },
    "reduced-motion": {
        latencyFactor: [0, 0.017],
        travelPx: [0, 0],
        scaleRatio: [1, 1],
    },
    "no-target": { latencyFactor: [0, 0.017], travelPx: [0, 0], scaleRatio: [1, 1] },
} as const satisfies Record<DockCtaReceivePath, DockCtaReceiveBand>;

export interface DockCtaReceiveObservables {
    readonly phase: DockCtaReceivePhase;
    readonly path: DockCtaReceivePath | null;
    readonly run: number;
    readonly interruptions: number;
    readonly resets: number;
    readonly startedAtMs: number | null;
    readonly settledAtMs: number | null;
    readonly handedOffAtMs: number | null;
    readonly completedAtMs: number | null;
    readonly latencyMs: number | null;
    readonly travelPx: number;
    readonly scaleRatio: number;
    readonly latencyBandMs: readonly [number, number] | null;
    readonly travelBandPx: readonly [number, number] | null;
    readonly scaleBand: readonly [number, number] | null;
    readonly withinBand: boolean | null;
    readonly supportsReverse: false;
}

export interface UseDockCtaReceiveOptions {
    /**
     * The dock control the CTA flies onto — a templateRef to the control ELEMENT or to a
     * component (e.g. `<DockControl>`), whose root element is resolved via `.$el`. When
     * null at receive time, the morph is a no-op snap (nowhere to fly) and `onReceived`
     * fires immediately.
     */
    dockControl: Ref<HTMLElement | ComponentPublicInstance | null>;
    /** The spring register (default `snappy`). */
    preset?: DockCtaReceivePreset;
    /** The ending congest blur radius in px (the CTA dissolves into the glass). Default 4. */
    blur?: number;
    /** Honor `prefers-reduced-motion: reduce` (snap to gone, then hand off). Default true. */
    respectReducedMotion?: boolean;
    /**
     * Fired ONCE when the CTA has landed on the dock control (the hand-off seam) — the
     * consumer hides the CTA + activates the dock control here. Fires on the animation
     * settle AND on the PRM/no-target snap (the gesture always completes).
     */
    onReceived?: () => void;
}

export interface UseDockCtaReceiveReturn {
    /** Morph the CTA into the dock control (drives the FORWARD play). A no-op if the CTA
     *  element is not yet mounted (no `onReceived`). */
    receive: () => void;
    /** Clear the morph transform (restore the CTA to its own rect, opacity 1) — the
     *  abort/reset seam. Does NOT fire `onReceived`. */
    reset: () => void;
    /** ARM the landing seat — write `data-cta-pending` on the dock control (the seat
     *  reserves its resting footprint + shows a dim ghost). Idempotent. */
    setPending: () => void;
    /** CLEAR the seat — remove `data-cta-pending`, so the seat reveals its real content
     *  with the `transition: opacity` FLIP. Idempotent. */
    clearPending: () => void;
    /** The reactive seat state — the consumer binds `:class`/`v-if` off it. */
    pending: Readonly<Ref<boolean>>;
    /** Whether the shared morph owner is currently playing. */
    playing: Readonly<Ref<boolean>>;
    /** Live normalized arrival progress from the shared morph owner. */
    progress: Readonly<Ref<number>>;
    /** Start/settle/handoff/completion and policy-band readback for the current run. */
    observables: Readonly<Ref<DockCtaReceiveObservables>>;
}

/**
 * The external-CTA-into-dock-control morph. A small adapter over `useElementMorph`
 * declares the CTA→control endpoints and couples opacity + blur to its settle hand-off.
 * The seat writes (`setPending`/`clearPending`) stay wrapper-local (data-attr, not motion).
 *
 * @example
 * ```ts
 * const { receive, setPending, pending } = useDockCtaReceive(ctaRef, {
 *   dockControl: dockTargetRef, onReceived: () => (ctaConsumed.value = true),
 * })
 * setPending()          // arm the seat (dim ghost + footprint reserve)
 * function onCta() { receive() }  // morph the CTA in; the default hand-off clearPending()s
 * ```
 */
export function useDockCtaReceive(
    cta: Ref<HTMLElement | ComponentPublicInstance | null>,
    options: UseDockCtaReceiveOptions,
): UseDockCtaReceiveReturn {
    const respectPRM = options.respectReducedMotion !== false;
    const pending = ref(false);
    const observables = ref<DockCtaReceiveObservables>({
        phase: "idle",
        path: null,
        run: 0,
        interruptions: 0,
        resets: 0,
        startedAtMs: null,
        settledAtMs: null,
        handedOffAtMs: null,
        completedAtMs: null,
        latencyMs: null,
        travelPx: 0,
        scaleRatio: 1,
        latencyBandMs: null,
        travelBandPx: null,
        scaleBand: null,
        withinBand: null,
        supportsReverse: false,
    });

    const now = (): number =>
        typeof performance !== "undefined" ? performance.now() : Date.now();
    const inRange = (n: number, [min, max]: readonly [number, number]): boolean =>
        n >= min && n <= max;

    function setPending(): void {
        const target = asElement(options.dockControl.value);
        if (!target) return; // no seat to arm — a no-op until the control mounts
        target.setAttribute("data-cta-pending", "");
        pending.value = true;
    }
    function clearPending(): void {
        pending.value = false;
        const target = asElement(options.dockControl.value);
        if (target) target.removeAttribute("data-cta-pending");
    }
    function handOff(): void {
        observables.value = {
            ...observables.value,
            phase: "handed-off",
            handedOffAtMs: now(),
        };
        // The seat REVEALS as the CTA lands — clearing `data-cta-pending` fires the
        // partial's `transition: opacity` FLIP on an already-sized box (no jump).
        clearPending();
        options.onReceived?.();
        const completedAtMs = now();
        const startedAtMs = observables.value.startedAtMs ?? completedAtMs;
        const latencyMs = completedAtMs - startedAtMs;
        const path = observables.value.path ?? "fine";
        const policy = DOCK_CTA_RECEIVE_BANDS[path];
        const horizon = engine.measurement.value?.durationMs ?? 1920;
        const latencyBandMs = [
            horizon * policy.latencyFactor[0],
            horizon * policy.latencyFactor[1],
        ] as const;
        observables.value = {
            ...observables.value,
            phase: "completed",
            completedAtMs,
            latencyMs,
            latencyBandMs,
            travelBandPx: policy.travelPx,
            scaleBand: policy.scaleRatio,
            withinBand:
                inRange(latencyMs, latencyBandMs) &&
                inRange(observables.value.travelPx, policy.travelPx) &&
                inRange(observables.value.scaleRatio, policy.scaleRatio),
        };
    }

    function settled(): void {
        const measurement = engine.measurement.value;
        const path = observables.value.path;
        const paintsMotion = path === "fine" || path === "coarse";
        observables.value = {
            ...observables.value,
            phase: "settled",
            settledAtMs: now(),
            travelPx: paintsMotion ? (measurement?.travelPx ?? 0) : 0,
            scaleRatio:
                paintsMotion && measurement
                    ? Math.sqrt(Math.abs(measurement.scaleX * measurement.scaleY))
                    : 1,
        };
        handOff();
    }

    const engine = useElementMorph(cta, {
        source: "self",
        destination: options.dockControl,
        preset: options.preset ?? "snappy",
        respectReducedMotion: options.respectReducedMotion,
        channels: { opacity: true, blur: options.blur ?? 4 },
        onSettled: settled,
    });

    function receive(): void {
        const el = asElement(cta.value);
        if (!el) return;
        const interrupted = engine.playing.value;
        const hasTarget = Boolean(asElement(options.dockControl.value));
        const path: DockCtaReceivePath = !hasTarget
            ? "no-target"
            : respectPRM && prefersReducedMotion()
              ? "reduced-motion"
              : typeof window !== "undefined" &&
                  window.matchMedia?.("(pointer: coarse)").matches
                ? "coarse"
                : "fine";
        observables.value = {
            ...observables.value,
            phase: "receiving",
            path,
            run: observables.value.run + 1,
            interruptions: observables.value.interruptions + Number(interrupted),
            startedAtMs: now(),
            settledAtMs: null,
            handedOffAtMs: null,
            completedAtMs: null,
            latencyMs: null,
            travelPx: 0,
            scaleRatio: 1,
            latencyBandMs: null,
            travelBandPx: DOCK_CTA_RECEIVE_BANDS[path].travelPx,
            scaleBand: DOCK_CTA_RECEIVE_BANDS[path].scaleRatio,
            withinBand: null,
        };
        // No dock control to fly to — snap the CTA gone + hand off (the gesture completes).
        if (!hasTarget) {
            el.style.opacity = "0";
            settled();
            return;
        }
        // PRM: SEAT deterministically — snap the CTA to opacity 0 in ONE step (the dock
        // control is already in place, so snap-to-gone is the correct seat), zero transform/
        // blur frames, then hand off. Opacity is not a vestibular trigger; translate/scale/
        // blur are. The animated path (below) is the runner's; this cta-specific terminal
        // seat is symmetric with the no-target path above, so the wrapper owns it.
        engine.play();
    }

    function reset(): void {
        const interrupted = engine.playing.value;
        engine.cancel();
        engine.clear(asElement(cta.value));
        observables.value = {
            ...observables.value,
            phase: "reset",
            interruptions: observables.value.interruptions + Number(interrupted),
            resets: observables.value.resets + 1,
            completedAtMs: null,
            latencyMs: null,
            withinBand: null,
        };
    }

    return {
        receive,
        reset,
        setPending,
        clearPending,
        pending: readonly(pending),
        playing: engine.playing,
        progress: engine.progress,
        observables: readonly(observables),
    };
}
