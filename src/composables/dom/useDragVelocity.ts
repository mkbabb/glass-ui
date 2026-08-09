// UseDragVelocity: the ONE honest velocity bridge.
//
// The slider weight-train (anticipation → saturating smear → follow-through) needs
// a LIVE drag velocity the fill `transform` + the inert `.cartoon-cast` `translate`
// can read as a CSS var. The renderer-side `usePointerVelocityField` is the WRONG
// shape: it is a no-own-rAF PUSH-API physics model that returns JS refs
// (`PointerVec2`) and emits NO CSS var, built for the WebGPU/Canvas viz family that
// already owns a frame loop. A slider has no renderer and no frame loop. So this is
// the ONE new bridge the amendment sanctions (challenge #1 R2 / #2 R1) — never a
// second velocity engine.
//
// THE NO-IDLE-COST CONTRACT (A10, challenge #2 R1). The rAF is DRAG-WINDOW-GATED:
// `pointerdown` opens it, `pointerup`/`pointercancel` tears it DOWN. An idle atom
// runs ZERO rAF. A unit fails if any rAF survives the release. This is the KISS
// proof — liquid weight is an event-scoped compositor read, not a steady-state loop.
//
// THE BOUNDED SMEAR (challenge #3 R3). The raw px/frame velocity is normalized then
// SATURATED through `tanh(k·v)` and clamped at `clamp` (~0.7) before it is written to
// `--atom-drag-v` (0..1). Mass WINS past a threshold: a faster pull does not ratchet
// the smear unboundedly (the tight-springy rubber-band failure inverted). The CSS
// recipe reads `--atom-drag-v` for the fill stretch + the cast lag.
//
// PRM-SAFE. Under `prefers-reduced-motion: reduce` the gate early-returns: it sets
// `--atom-drag-v: 0` once on grab and never opens the rAF — the value still tracks
// (reka owns it), it just does not smear.
//
// COMPOSITOR-ONLY. This composable writes exactly ONE CSS var; it never reads layout,
// never touches `box-shadow`, never animates a paint property. The MOVEMENT the var
// drives is `transform`/`scale`/`translate` in the consuming CSS — the §L7 paint-fence.

import { onMounted, onScopeDispose, readonly, ref, type Ref } from "vue";

export interface UseDragVelocityParams {
    /**
     * The host element resolver — a getter (NOT a ref Slider populates in a sibling
     * `onMounted`) so it sidesteps the onMounted-ordering trap the slider's
     * `useDockHold` already documents. The `--atom-drag-v` var is written on THIS
     * element; descendants inherit it (the fill + the cast read it).
     */
    host: () => HTMLElement | null;
    /**
     * A SECOND element that receives the same two writes. A teleported organ (the
     * slider's loupe) is out of the host's inheritance chain, so it cannot read the
     * vars off an ancestor — and minting a second velocity pole for it would break the
     * one-owner law. One writer, two hosts.
     */
    mirror?: () => HTMLElement | null;
    /**
     * The pointer axis the velocity is measured on. Default `"x"` (the horizontal
     * slider). A getter re-reads on an orientation flip.
     */
    axis?: "x" | "y" | (() => "x" | "y");
    /**
     * The saturating-smear gain (the `tanh` steepness over px/frame). Higher = the
     * smear reaches its ceiling at a slower drag. Default `0.06`.
     */
    gain?: number;
    /**
     * The smear CEILING (the clamp the saturated value floors under). Default `0.7`
     * (challenge #3 R3 — mass wins, the pull never rubber-bands past this).
     */
    clamp?: number;
    /** Honor `prefers-reduced-motion: reduce` (no rAF, value pinned 0). Default true. */
    respectReducedMotion?: boolean;
}

export interface UseDragVelocityReturn {
    /** True while a drag gesture is live (between `pointerdown` and `pointerup`). */
    dragging: Readonly<Ref<boolean>>;
    /** Detach all listeners + tear down any live rAF. Idempotent. */
    detach: () => void;
}

function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/**
 * The drag-window-gated velocity bridge — writes `--atom-drag-v` (0..1, bounded by a
 * saturating `tanh`) on the host while a pointer drag is live, and tears the rAF DOWN
 * on release (the no-idle-cost contract). The slider weight-train is its first
 * consumer; any pull-to-smear atom reads the same var.
 *
 * @example
 * ```ts
 * const { dragging, detach } = useDragVelocity({ host: getRootEl })
 * // CSS: .slider-range { transform: scaleX(calc(1 + 0.08 * var(--atom-drag-v))) }
 * ```
 */
export function useDragVelocity(
    params: UseDragVelocityParams,
): UseDragVelocityReturn {
    const axisOf = (): "x" | "y" =>
        typeof params.axis === "function"
            ? params.axis()
            : (params.axis ?? "x");
    const gain = params.gain ?? 0.06;
    const ceil = params.clamp ?? 0.7;
    const respectPRM = params.respectReducedMotion !== false;

    const dragging = ref(false);

    let rafId = 0;
    let lastPos = 0;
    let lastT = 0;
    // The smoothed normalized velocity the var carries — EMA'd so a single jittery
    // frame doesn't spike the smear (the velocity-window robustness the morph engine
    // gets for free; here a cheap one-pole filter, no sample buffer).
    let smoothed = 0;
    let pointerActive = false;
    // The latest pointermove delta on the active axis (px since the last frame read).
    let frameDelta = 0;

    // THE TWO TERMS, one measurement.
    //   `--atom-drag-v` is the SMEAR term: EMA'd hard and clamped at the ceiling, so a
    //   faster pull cannot rubber-band the fill.
    //   `--flex-vel` is the library's ONE REGISTERED velocity term (property-regs §18,
    //   `writeVelocityWeight`'s var). It is the same tanh, taken at the ratified
    //   V0 = 900 px/s pole through a τ = 100 ms one-pole, and it is NOT clamped — a
    //   consumer that reads it wants the whole [0,1) range (the loupe's magnification
    //   backs off across all of it). Two terms, never two engines.
    const FLEX_V0 = 900;
    const FLEX_TAU_MS = 100;
    let flexSmoothed = 0;

    function write(el: HTMLElement | null, smear: number, flex: number): void {
        if (!el) return;
        el.style.setProperty("--atom-drag-v", `${smear}`);
        el.style.setProperty("--flex-vel", flex.toFixed(4));
    }

    function setVar(v: number, flex = 0): void {
        write(params.host(), v, flex);
        write(params.mirror?.() ?? null, v, flex);
    }

    // The saturating map: raw px/frame → tanh(gain·|v|), clamped at the ceiling.
    function saturate(rawVel: number): number {
        const t = Math.tanh(gain * Math.abs(rawVel));
        return t > ceil ? ceil : t;
    }

    function frame(now: number): void {
        if (!pointerActive) {
            rafId = 0;
            return;
        }
        const dt = lastT ? now - lastT : 16.7;
        lastT = now;
        // Per-frame velocity in px (normalized to a ~60fps frame so the gain is
        // frame-rate-independent). The instantaneous delta was captured on pointermove;
        // here we decay the smear toward the live sample so a STOP (no move) bleeds the
        // var back to 0 even while the pointer is still held (a held-still finger is not
        // smearing). One-pole EMA: 0.35 toward the live sample, 0.65 retained.
        const perFrame = (frameDelta / dt) * 16.7;
        const live = saturate(perFrame);
        smoothed = smoothed * 0.65 + live * 0.35;
        // The registered term rides px/SECOND against V0, on its own τ = 100 ms pole —
        // a longer memory than the smear's, because magnification that flickers with
        // frame jitter is worse than one that lags a beat.
        const flexLive = Math.tanh(Math.abs((perFrame / 16.7) * 1000) / FLEX_V0);
        const alpha = 1 - Math.exp(-dt / FLEX_TAU_MS);
        flexSmoothed += (flexLive - flexSmoothed) * alpha;
        frameDelta *= 0.6; // the captured delta decays if no fresh move arrives
        setVar(Number(smoothed.toFixed(4)), flexSmoothed);
        rafId = requestAnimationFrame(frame);
    }

    function onPointerMove(e: PointerEvent): void {
        if (!pointerActive) return;
        const pos = axisOf() === "y" ? e.clientY : e.clientX;
        frameDelta += pos - lastPos;
        lastPos = pos;
    }

    function onPointerDown(e: PointerEvent): void {
        pointerActive = true;
        dragging.value = true;
        lastPos = axisOf() === "y" ? e.clientY : e.clientX;
        lastT = 0;
        frameDelta = 0;
        smoothed = 0;
        flexSmoothed = 0;
        // PRM: pin the vars at 0 and NEVER open the rAF (no smear; the value still
        // tracks via reka). The no-idle-cost contract is trivially honored.
        if (respectPRM && prefersReducedMotion()) {
            setVar(0);
            return;
        }
        if (typeof window !== "undefined") {
            window.addEventListener("pointermove", onPointerMove, { passive: true });
        }
        if (!rafId) rafId = requestAnimationFrame(frame);
    }

    function teardown(): void {
        pointerActive = false;
        dragging.value = false;
        if (rafId) {
            cancelAnimationFrame(rafId);
            rafId = 0;
        }
        if (typeof window !== "undefined") {
            window.removeEventListener("pointermove", onPointerMove);
        }
        // Reset the smear to 0 (the follow-through is owned by the CSS release
        // transition off `:active` ending — the var must not strand non-zero).
        smoothed = 0;
        frameDelta = 0;
        flexSmoothed = 0;
        setVar(0);
    }

    function onPointerUp(): void {
        if (!pointerActive) return;
        teardown();
    }

    // The host is a reka forwardRef element (`SliderRoot.$el`) — null at SETUP, live
    // by `onMounted` (template refs are populated before `onMounted` fires; the same
    // `useDockHold` resolver discipline). A native `pointerdown` on the resolved host
    // is immune to reka's forwarding-drop. The bound host is retained for teardown.
    let boundHost: HTMLElement | null = null;
    onMounted(() => {
        boundHost = params.host();
        if (boundHost) {
            boundHost.addEventListener("pointerdown", onPointerDown);
        }
    });
    if (typeof window !== "undefined") {
        // The window-level up/cancel keeps the gate honest when the release lands
        // outside the host (pointer capture delivers it, but a defensive window
        // listener guarantees teardown — the no-survive-rAF unit relies on it).
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);
    }

    function detach(): void {
        teardown();
        boundHost?.removeEventListener("pointerdown", onPointerDown);
        boundHost = null;
        if (typeof window !== "undefined") {
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
        }
    }

    onScopeDispose(detach);

    return {
        dragging: readonly(dragging),
        detach,
    };
}
