import { SpringProgress } from "@mkbabb/keyframes.js";

/**
 * BG.W-DOCK-ENGINE-UNIFY — the ONE `SpringProgress` owner for the dock band.
 *
 * The dock's collapse↔expand morph (`dockMorphContext`), the V↔H orientation
 * morph (`useDockOrientationMorph`), the item-drag fling (`useDockItemDrag`),
 * and the fission detach (`useDockFission`) each hand-rolled their OWN
 * `new SpringProgress` on the SAME `DOCK_SPRING` clock — five copies of the
 * identical iOS interruptible-physics dance (create-carrying-prior-velocity →
 * play the glide writing the scalar → self-dispose on settle → PRM-jump). This
 * factory owns that dance ONCE. A consumer supplies the `(response, ζ)` pair +
 * its per-frame writer; the spring construction, the velocity-continuous
 * re-base, and the teardown live here — the sole `new SpringProgress` site.
 *
 * `SpringProgress` owns its own rAF via `.play(onFrame)` and carries no static
 * value.js edge, so this leaf never imports `AnimationGroup`/`./engine`. The
 * dock morph is ALWAYS PRM-aware: the one spring is armed with
 * `respectReducedMotion: true`, which JUMPS the scalar 0→target in one frame
 * under `prefers-reduced-motion: reduce` (no in-between motion frames — no
 * blur/sliver). `DOCK_SPRING` stays byte-fenced in `../constants`; the caller
 * passes its `.response`/`.dampingFraction` through.
 */

export interface DockSpringConfig {
    /**
     * iOS `response` — pass `DOCK_SPRING.response` (the byte-fenced dock clock,
     * `springPreset("dock")`). Never a fresh literal — the spring register is
     * single-sourced.
     */
    response: number;
    /** iOS `dampingFraction` — pass `DOCK_SPRING.dampingFraction`. */
    dampingFraction: number;
}

export interface DockSpringPlayOptions {
    /**
     * The per-frame writer. `value` is the spring position; `velocity` is its
     * live analytic velocity (the F-ARM-1 weight channel — a squish reads
     * `|velocity|`). Called once per frame while the glide runs.
     */
    onFrame: (value: number, velocity: number) => void;
    /** Fired ONCE on settle, immediately BEFORE the self-dispose. */
    onSettle?: () => void;
}

/**
 * A single-spring handle. Every dock surface that morphs on the DOCK register
 * drives one of these — the factory that mints it is the band's sole
 * `new SpringProgress` site.
 */
export interface DockSpring {
    /**
     * Play a fresh episode `from`→`to`. A still-live prior episode is RE-BASED:
     * the new spring starts at `from` CARRYING the prior spring's velocity (the
     * iOS interruptible-physics continuity), targets `to`, and glides on the
     * DOCK clock writing `onFrame(value, velocity)` per frame. Self-disposes on
     * settle (after `onSettle`), so an at-rest dock parks ZERO springs.
     */
    playTo(from: number, to: number, options: DockSpringPlayOptions): void;
    /**
     * Re-target the LIVE spring to `to` from its CURRENT `(value, velocity)`
     * without recreating the loop (a mid-flight toggle — the interruptible
     * re-seat `SpringProgress.set target` performs continuously). A no-op when
     * no spring is live; call `playTo` to (re)start a parked handle.
     */
    retarget(to: number): void;
    /** True while a spring is running and not yet settled. */
    readonly live: boolean;
    /** The live analytic velocity (0 when no spring is live). */
    readonly velocity: number;
    /** Tear down any running spring (idempotent). */
    dispose(): void;
}

export function useDockSpring(config: DockSpringConfig): DockSpring {
    // The single live morph driver for this handle. `null` when parked.
    let spring: SpringProgress | null = null;

    const isLive = (): boolean => spring !== null && !spring.settled;

    function dispose(): void {
        if (spring) {
            spring.dispose();
            spring = null;
        }
    }

    function playTo(from: number, to: number, options: DockSpringPlayOptions): void {
        // The interruptible re-base — a re-toggle mid-flight seeds the fresh
        // spring with the prior spring's live velocity so the trajectory stays
        // C¹ (the iOS interruptible-physics continuity).
        const inheritedVelocity = isLive() ? spring!.velocity : 0;
        dispose();
        const active = new SpringProgress({
            response: config.response,
            dampingFraction: config.dampingFraction,
            initial: from,
            respectReducedMotion: true,
        });
        spring = active;
        active.reset(from, inheritedVelocity);
        active.target = to;
        active.play((value: number, velocity: number) => {
            options.onFrame(value, velocity);
            if (active.settled) {
                options.onSettle?.();
                // Self-dispose the settled spring (guard a re-play inside
                // `onSettle` — only tear down if we are still the live handle).
                if (spring === active) dispose();
            }
        });
    }

    function retarget(to: number): void {
        // `set target` re-seats the closed form from the current `(value,
        // velocity)`, so the mid-flight retarget is continuous by construction.
        if (isLive()) spring!.target = to;
    }

    return {
        playTo,
        retarget,
        get live(): boolean {
            return isLive();
        },
        get velocity(): number {
            return isLive() ? spring!.velocity : 0;
        },
        dispose,
    };
}
