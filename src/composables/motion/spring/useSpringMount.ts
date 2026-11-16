// Spring-driven mount + optional drag-dismiss state machine.
//
// Runtime kernel behind <DialogContent>'s centered entrance and <SheetContent>'s
// slide (the DETENT arm is its own engine — `sheet/detents/use.ts` — because a rung is
// a size and this kernel drives a dismiss position). The component owns its
// open Ref
// (via reka-ui's DialogContext); this composable owns the *position* (0 =
// fully mounted, 1 = fully dismissed) and the pointer-drag pipe that re-seats
// the spring target mid-drag.
//
// Reuses `useSpring` end-to-end: entrance is `target = 0` after seeding
// `initial = 1`; drag tracks the pointer delta into target; release decides
// bounce-back (target = 0) vs. dismiss (target = 1 + on-settle close). The
// load-bearing property is SpringProgress mid-flight re-target continuity
// Releasing the pointer at any velocity hands off cleanly to the
// spring without a visual jump.
//
// REDUCED MOTION: the entrance and the exit are a tween of the position on `--exit-curve`
// over the row's exit clock held to at most `--duration-fast` (200 ms), which the host
// reads as an opacity fade with no travel. A drag still tracks the pointer, and its
// release snaps (`useSpring`'s `respectReducedMotion`).
//
// THE EXIT is not the spring. A close that is not a drag release rides the floating
// surfaces' exit: the position tweens from where it is to 1 over the row's exit clock
// (`--spring-<row>-exit-duration`, 0.6 × its entrance) on `--exit-curve`, both read from
// the stylesheet at the close, so the Dialog and Sheet leave on the same curve as every
// popup and sooner than they arrived. A reopen during the exit hands the position back
// to the spring, which turns from where the surface is. Where the stylesheet resolves no
// exit clock (no library CSS loaded), the spring rides the exit as it rides the entrance.

import {
    computed,
    nextTick,
    onMounted,
    onScopeDispose,
    readonly,
    ref,
    watch,
    type Ref,
} from "vue";
import { useSpring, type SpringRef } from "./useSpring";

import { springPreset, type SpringPresetName } from "./springPresets";

/** The registers a mount ENTER may ride — DERIVED from the one table, never re-typed.
 *  A centred plate presents, a fired sheet deploys, a full-screen surface blooms;
 *  travel and touch are not mount enters. */
export type SpringPreset = Extract<SpringPresetName, "present" | "panel" | "bloom">;

// The (response, ζ) pairs are single-sourced in `springPresets.ts`
// (the SAME table `scripts/regen-spring-tokens.mjs` solves the CSS `--spring-*`
// `linear()` strings from). This local table is the mount-relevant projection of
// the shared rows — drift-proof by construction (no hand-kept second copy).
const MOUNT_PRESETS: readonly SpringPreset[] = ["present", "panel", "bloom"];
const SPRING_PRESETS: Record<SpringPreset, { response: number; dampingFraction: number }> =
    Object.fromEntries(
        MOUNT_PRESETS.map((name) => {
            const { response, dampingFraction } = springPreset(name);
            return [name, { response, dampingFraction }];
        }),
    ) as Record<SpringPreset, { response: number; dampingFraction: number }>;

export interface UseSpringMountOptions {
    /**
     * Reactive open-state mirror from the host's DialogContext. Accepts
     * both `Ref<boolean>` and `Readonly<Ref<boolean>>` — reka-ui's
     * DialogContext exposes the readonly variant; our internal use of
     * `.value` is read-only here, so the Readonly satisfies the contract.
     */
    open: Readonly<Ref<boolean>>;
    /** Preset name (default `smooth`). */
    preset?: SpringPreset;
    /** Honor `prefers-reduced-motion`. Default true. */
    respectReducedMotion?: boolean;
    /**
     * Dismiss-position threshold as a fraction of full travel. When pointer
     * release crosses this, the target snaps to 1 and on-settle fires
     * `onDismiss`. Default 0.3 (iOS sheet convention).
     */
    dismissThreshold?: number;
    /** Called once the dismiss-spring has settled. Wire to `onOpenChange(false)`. */
    onDismiss?: () => void;
}

export interface SpringMountRef {
    /** Position 0 (mounted) → 1 (dismissed). Bind to `transform: translateY` or scale. */
    position: SpringRef["value"];
    /**
     * Mount-hold: true while the surface must stay rendered — logically open, OR
     * exiting (the spring still riding toward the dismissed endpoint). Bind to
     * `forceMount` so the spring, not a keyframe, owns unmount timing. Clears once
     * the dismiss-spring settles while `open` is false.
     */
    present: Readonly<Ref<boolean>>;
    /** True while pointer is actively dragging. */
    isDragging: Readonly<Ref<boolean>>;
    /**
     * Pointer handlers for the Sheet drag-dismiss gesture. Spread onto the
     * sheet content (`v-bind="dragHandlers"`). Pass a getter for the sheet
     * height so the threshold is computed against real pixels.
     */
    dragHandlers: {
        onPointerdown: (e: PointerEvent) => void;
        onPointermove: (e: PointerEvent) => void;
        onPointerup: (e: PointerEvent) => void;
        onPointercancel: (e: PointerEvent) => void;
    };
}

/**
 * Spring-driven mount with optional pointer drag-dismiss.
 *
 * The spring target lives between 0 (fully mounted) and 1 (fully dismissed).
 * The host watches `open` to seat the entrance (1 → 0). Pointer drags
 * re-seat the target mid-flight; on release the threshold decides bounce
 * vs. dismiss. The mid-flight re-target preserves spring continuity per
 * SpringProgress.
 */
/** The dismissed edge: a position this close to 1 is off the screen (the kernel's own
 *  position settle threshold, under a pixel for any surface shorter than 1,000 px). */
const EXIT_EDGE = 1e-3;

/** A CSS `cubic-bezier()` as a function of progress, or linear for `linear`. */
function bezierOf(timing: string): ((k: number) => number) | null {
    if (timing.trim() === "linear") return (k) => k;
    const m = /cubic-bezier\(([^)]+)\)/.exec(timing);
    if (!m) return null;
    const [x1, y1, x2, y2] = m[1].split(",").map(Number);
    const at = (a: number, b: number, t: number) => 3 * (1 - t) ** 2 * t * a + 3 * (1 - t) * t * t * b + t ** 3;
    return (k) => {
        let lo = 0;
        let hi = 1;
        for (let i = 0; i < 30; i++) {
            const mid = (lo + hi) / 2;
            if (at(x1, x2, mid) < k) lo = mid;
            else hi = mid;
        }
        return at(y1, y2, (lo + hi) / 2);
    };
}

/** How much longer than its row's exit clock a mounted surface takes to leave. The
 *  `present` row's exit is the generator's 0.12 s floor, which a centred modal plate
 *  crosses in too few frames to read; it leaves in 1.5 times that, about 180 ms, still
 *  well inside its entrance. The other rows leave on their own clock. */
const MOUNT_EXIT_STRETCH: Partial<Record<SpringPreset, number>> = { present: 1.5 };

const msOf = (duration: string): number =>
    duration.endsWith("ms") ? parseFloat(duration) : parseFloat(duration) * 1000;

/** The row's exit clock (ms) and the exit curve, read from the stylesheet. Under reduced
 *  motion the clock is held to at most `--duration-fast`. */
function readExit(
    preset: SpringPreset,
    reduced: boolean,
): { ms: number; ease: (k: number) => number } | null {
    if (typeof document === "undefined" || !document.body) return null;
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;visibility:hidden;transition-duration:var(--spring-${preset}-exit-duration);transition-timing-function:var(--exit-curve);animation-duration:var(--duration-fast)`;
    document.body.appendChild(probe);
    const cs = getComputedStyle(probe);
    const exitMs = msOf(cs.transitionDuration.trim()) * (MOUNT_EXIT_STRETCH[preset] ?? 1);
    const ms = reduced ? Math.min(exitMs, msOf(cs.animationDuration.trim())) : exitMs;
    const ease = bezierOf(cs.transitionTimingFunction);
    probe.remove();
    return ms > 0 && ease ? { ms, ease } : null;
}

export function useSpringMount(options: UseSpringMountOptions): SpringMountRef {
    const presetName = options.preset ?? "panel";
    const preset = SPRING_PRESETS[presetName];
    // Always seat the spring AT the off-screen position (1) and let the
    // mount watch drive the target → 0 transition on the first frame. This
    // makes the entrance read consistently — without this, an already-open
    // host would start in-frame with no entrance.
    const target = ref(1);
    // Mount-hold. Seeded from the host's live open-state so an already-open host
    // renders from the first frame. Set true on any open-flip (before the drag
    // guard); the settle branch below owns the false transition on dismiss.
    const present = ref(options.open.value);
    const isDragging = ref(false);
    let pointerStartY = 0;
    let sheetHeight = 0;
    let activePointerId: number | null = null;

    // `pendingDismiss` arms when a drag release crosses the threshold; the
    // settle watch consumes it (one-shot) to fire `onDismiss` exactly once.
    // Without this flag, a normal `open=false` exit would also trigger the
    // close callback — but the host's open Ref has already flipped, so we'd
    // re-fire a no-op. The flag is the cleanest single-source signal.
    let pendingDismiss = false;

    const spring = useSpring(target, {
        response: preset.response,
        dampingFraction: preset.dampingFraction,
        initial: 1, // start off-screen / scaled-small
        settleThreshold: EXIT_EDGE,
        velocitySettleThreshold: 1e-3,
        respectReducedMotion: options.respectReducedMotion !== false,
    });

    // The exit tween's position while it runs; null when the spring owns the position.
    const exitPosition = ref<number | null>(null);
    let exitFrame = 0;
    const stopExit = () => {
        if (exitFrame) cancelAnimationFrame(exitFrame);
        exitFrame = 0;
    };
    const reducedMotion = () =>
        options.respectReducedMotion !== false &&
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    /** Tweens the position from where it is to `to` on the exit clock. The exit always
     *  takes it; the entrance only under reduced motion, where it is the fade. */
    function tween(to: 0 | 1): boolean {
        const reduced = reducedMotion();
        if (to === 0 && !reduced) return false;
        const exit = readExit(presetName, reduced);
        if (!exit || typeof requestAnimationFrame !== "function") return false;
        stopExit();
        const from = exitPosition.value ?? spring.value.value;
        // The clock advances by at most one 60 Hz frame per frame, so a long frame (a pick
        // that navigates, a list that re-renders) slows the exit rather than skipping a
        // stretch of it; on steady frames it runs on the exit clock.
        let last: number | null = null;
        let elapsed = 0;
        exitPosition.value = from;
        // The spring heads for the same end underneath, so a reversal retargets it.
        target.value = to;
        const step = (now: number) => {
            if (last !== null) elapsed += Math.min(now - last, 1000 / 60);
            last = now;
            const k = Math.min(1, elapsed / exit.ms);
            exitPosition.value = from + (to - from) * exit.ease(k);
            if (k < 1) {
                exitFrame = requestAnimationFrame(step);
                return;
            }
            exitFrame = 0;
            spring.reset(to, 0);
            exitPosition.value = null;
        };
        exitFrame = requestAnimationFrame(step);
        return true;
    }

    // Arm the entrance on mount: if `open` is already true, drive target to
    // 0 across the next tick (the spring integrates from 1 → 0).
    onMounted(() => {
        if (options.open.value) {
            void nextTick(() => {
                if (!tween(0)) target.value = 0;
            });
        }
    });

    // Mount/dismiss: when `open` flips true, target collapses to 0 (entry);
    // when it flips false outside the drag path, target rides to 1 (exit).
    const stopOpenWatch = watch(
        () => options.open.value,
        (next, prev) => {
            if (next === prev) return;
            if (next) present.value = true; // mount before anything else can early-return
            if (isDragging.value) return; // drag owns the target while active
            if (next) {
                if (tween(0)) return;
                if (exitPosition.value !== null) {
                    stopExit();
                    spring.reset(exitPosition.value, 0);
                    exitPosition.value = null;
                }
                target.value = 0;
                return;
            }
            if (pendingDismiss || !tween(1)) target.value = 1;
        },
        { immediate: false },
    );

    // On-settle dismiss hook: consumes the one-shot `pendingDismiss` flag.
    const stopSettleWatch = watch(
        () => spring.isSettled.value,
        (settled) => {
            if (settled && pendingDismiss && target.value >= 1) {
                pendingDismiss = false;
                options.onDismiss?.();
            }
        },
    );

    // Mount-hold release — the dismissed EDGE owns unmount. Drops `present` once the
    // exit has ridden to within `EXIT_EDGE` of the dismissed endpoint while the host is
    // logically closed (`!open`), so reka Presence unmounts. Not the settle: `panel` is
    // underdamped (ζ 0.71), and its tail rings past the edge until the velocity falls under
    // 1e-3 units/s, 1.5–1.9 s after the surface left the screen. Held that long, a closed
    // sheet kept its scrim mounted and the body scroll-locked, and the page ate the reader's
    // next scroll or tap (U/B7b M1, repair round 1). At the edge the surface is under a pixel
    // from fully off and its scrim alpha is ~0, so nothing visible is cut short.
    //   • gated on the spring POSITION (`spring.value.value`), not the local `target`
    //     ref: `target` flips synchronously on close while the position is still 0, so
    //     the guard only holds once the exit has actually arrived.
    //   • watched as a CONDITION, not an edge: under PRM the snap lands the position at 1
    //     in place, and the composed guard still transitions.
    //   • independent of the `pendingDismiss` drag branch (that one still waits the settle).
    // `!open` keeps a re-open-mid-exit mounted.
    const stopPresentWatch = watch(
        () => exitPosition.value === null && spring.value.value >= 1 - EXIT_EDGE && !options.open.value,
        (dismissed) => {
            if (dismissed) present.value = false;
        },
    );

    function onPointerdown(e: PointerEvent): void {
        // Only primary-button presses on the host capture (no right-click drags).
        if (e.button !== 0) return;
        const host = e.currentTarget as HTMLElement;
        sheetHeight = host.getBoundingClientRect().height || 1;
        pointerStartY = e.clientY;
        activePointerId = e.pointerId;
        isDragging.value = true;
        host.setPointerCapture(e.pointerId);
    }

    function onPointermove(e: PointerEvent): void {
        if (!isDragging.value || e.pointerId !== activePointerId) return;
        const deltaY = e.clientY - pointerStartY;
        if (deltaY <= 0) {
            target.value = 0; // can't drag upward past mounted position
            return;
        }
        target.value = Math.min(1, deltaY / sheetHeight);
    }

    function releaseDrag(e: PointerEvent): void {
        if (!isDragging.value || e.pointerId !== activePointerId) return;
        const host = e.currentTarget as HTMLElement;
        if (host.hasPointerCapture(e.pointerId)) host.releasePointerCapture(e.pointerId);
        isDragging.value = false;
        activePointerId = null;
        const threshold = options.dismissThreshold ?? 0.3;
        if (target.value >= threshold) {
            pendingDismiss = true;
            target.value = 1;
        } else {
            target.value = 0;
        }
    }

    onScopeDispose(() => {
        stopExit();
        stopOpenWatch();
        stopSettleWatch();
        stopPresentWatch();
    });

    return {
        position: computed(() => exitPosition.value ?? spring.value.value),
        present: readonly(present),
        isDragging: computed(() => isDragging.value),
        dragHandlers: {
            onPointerdown,
            onPointermove,
            onPointerup: releaseDrag,
            onPointercancel: releaseDrag,
        },
    };
}
