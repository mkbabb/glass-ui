/**
 * Sortable motion — the gesture's clocks, and the ONE rAF spring path in the family.
 *
 * THE SPLIT, STATED ONCE, BECAUSE IT IS THE WHOLE DESIGN:
 *   · PARTING and PROMOTION are CSS transitions on the GENERATED spring curves
 *     (`--spring-dock` / `--spring-press` + their duration readers). They are
 *     compositor-only writes with a known endpoint, so the curve IS the spring and
 *     the `a11y-overrides.css` reduced-motion blanket already governs them.
 *   · FOLLOW is 1:1 finger attachment — linear, zero easing, no spring. MOTION-CANON
 *     §4:334: "Springs belong to entrances, exits, and releases — never between a
 *     finger and the thing it is holding."
 *   · THE RELEASE FLIGHT is the one leg a CSS transition cannot express, because its
 *     initial condition is the gesture's own VELOCITY. That is the single rAF spring
 *     path here, and it carries the LOCAL reduced-motion gate — the CSS blanket stops
 *     CSS clocks, it does not stop a JS integrator.
 *
 * Every response/damping pair is read from `springPresets` BY NAME. No literal, no
 * second register: three values have circulated for "dock" across canon, disk and
 * memory, and the name is the only one of the three that cannot go stale.
 */

import { SpringProgress } from "@mkbabb/keyframes.js";

import { motionTempo } from "../../composables/motion/core/motionTempo";
import {
    springPreset,
    type SpringPresetRow,
} from "../../composables/motion/spring/springPresets";

/**
 * THE ACTIVATION HOLD, DERIVED — never minted.
 *
 * A stationary press becomes a lift when it outlasts the slowest motion the library
 * can make: `world`, the recession row, is that ceiling by construction (it is the
 * longest response in the table, and the table is the whole register). A press that
 * outlives it is no longer plausibly a tap. The figure therefore MOVES when the
 * register moves, which is the property a minted 400ms could never have — CWT-2 §3
 * ruled exactly this ("no canon rung for hold durations; law it or derive").
 */
export const ACTIVATION_HOLD_MS = springPreset("world").response * 1000;

/**
 * THE ACTIVATION SLOP, in px. The series rung above coarse-tap jitter (5–10px): below
 * it the gesture is a click and the transaction never opens.
 */
export const ACTIVATION_SLOP_PX = 8;

/**
 * The lift SWELL is not here, and that is deliberate: it is `--sortable-lift` in
 * `styles.css`, derived as the press rung mirrored about unity (`2 − --scale-press`).
 * A swell typed into JS would be a second figure for a rung that already has a token,
 * and it would not move when the rung moves.
 */

/** The tilt ceiling, in degrees. The pre-existing constant; nothing raises it. */
const MAX_TILT_DEG = 1.5;

/** The velocity at which the tilt reaches ~76% of its ceiling (tanh's unit argument). */
const TILT_REFERENCE_VELOCITY = 900;

/** Reduced motion, read LIVE — a JS integrator has no cascade to be stopped by. */
export function prefersReducedMotion(): boolean {
    return (
        typeof window !== "undefined" &&
        typeof window.matchMedia === "function" &&
        window.matchMedia("(prefers-reduced-motion: reduce)").matches
    );
}

/** A pointer sample: position and the clock it was taken on. */
interface Sample {
    x: number;
    y: number;
    t: number;
}

/**
 * A small ring buffer over the last few pointer samples. Release velocity is the
 * chord across the window rather than the last frame's delta, so one stalled frame
 * cannot fling the ghost.
 */
export class VelocitySampler {
    private readonly ring: Sample[] = [];
    private readonly size = 5;

    push(x: number, y: number, t: number = performance.now()): void {
        this.ring.push({ x, y, t });
        if (this.ring.length > this.size) this.ring.shift();
    }

    reset(): void {
        this.ring.length = 0;
    }

    /** px/s across the sample window; `{x:0,y:0}` when the window is degenerate. */
    velocity(): { x: number; y: number } {
        const first = this.ring[0];
        const last = this.ring[this.ring.length - 1];
        if (!first || !last) return { x: 0, y: 0 };
        const dt = (last.t - first.t) / 1000;
        if (dt <= 0) return { x: 0, y: 0 };
        return { x: (last.x - first.x) / dt, y: (last.y - first.y) / dt };
    }
}

/**
 * Velocity-derived tilt on the shared tanh register, capped at the existing ceiling.
 * A static rotation is width-dependent and says nothing; this one says how hard the
 * row is being thrown.
 */
export function tiltFor(velocityX: number): number {
    return MAX_TILT_DEG * Math.tanh(velocityX / TILT_REFERENCE_VELOCITY);
}

/** A running release flight: `stop()` ends it, `promise` settles when it lands. */
export interface Flight {
    stop: () => void;
}

/**
 * Fly a value 0 → 1 on a named spring row, seeded with the gesture's own release
 * velocity. THE ONE rAF SPRING PATH — and therefore the one carrying the local
 * reduced-motion gate: under `reduce` the flight collapses to a single frame at the
 * endpoint, which is the honest cut (not a shortened animation).
 *
 * `velocityAlongPath` is px/s projected onto the flight vector; it is converted to
 * the spring's own units (1 = the whole distance) by the distance itself.
 */
export function flyProgress(
    rowName: Parameters<typeof springPreset>[0],
    distance: number,
    velocityAlongPath: number,
    onFrame: (t: number) => void,
    onLand: () => void,
): Flight {
    if (prefersReducedMotion() || distance <= 0) {
        onFrame(1);
        onLand();
        return { stop: () => {} };
    }

    const row: SpringPresetRow = springPreset(rowName);
    const spring = new SpringProgress({
        response: row.response * motionTempo(),
        dampingFraction: row.dampingFraction,
        initial: 0,
        initialVelocity: velocityAlongPath / distance,
        settleThreshold: row.settleBand,
        velocitySettleThreshold: row.settleBand,
        respectReducedMotion: true,
    });

    let landed = false;
    const land = (): void => {
        if (landed) return;
        landed = true;
        onFrame(1);
        onLand();
        spring.dispose();
    };

    const unsubscribe = spring.subscribe((value) => {
        if (landed) return;
        onFrame(value);
        if (spring.settled) {
            unsubscribe();
            land();
        }
    });

    spring.play(() => {});
    spring.target = 1;

    return {
        stop: () => {
            if (landed) return;
            unsubscribe();
            landed = true;
            spring.dispose();
        },
    };
}
