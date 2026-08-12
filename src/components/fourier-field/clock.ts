// THE CLOCK, as a pure state machine.
//
// It lives apart from the renderer for one reason: the claims made about it — that the
// head never runs backward, that one gesture produces one impulse, that a flick advances
// at most half a figure — are claims about arithmetic, and arithmetic can be checked
// without a GPU. Nothing here reads the DOM, the clock time, or a frame.

import { springPreset } from "../../composables/motion/spring/springPresets";
import { FOURIER_FLICK_TURNS, FOURIER_PERIOD_S, FOURIER_SCRUB_GAIN } from "./constants";

/**
 * The substrate-travel spring, bound by JOB rather than by a remembered pair. This module
 * owns exactly one invariant about it — the damping fraction it CONSUMES — because that is
 * what decides whether a flick can rewind the drawing.
 */
export const FOURIER_TRAVEL_SPRING = springPreset("world");

/** The consumed damping fraction. At or above this, a flick has no backward frames. */
export const FOURIER_SETTLE_ZETA_FLOOR = 0.82;

const OMEGA = (2 * Math.PI) / FOURIER_TRAVEL_SPRING.response;
const ZETA = FOURIER_TRAVEL_SPRING.dampingFraction;

/** The burst level that arms one impulse, and the level at which the gesture re-arms. */
const FLICK_ARM = 0.22;
const FLICK_DISARM = 0.06;

/** The seeded velocity that holds a flick's total advance to {@link FOURIER_FLICK_TURNS}. */
const MAX_IMPULSE = FOURIER_FLICK_TURNS * OMEGA * OMEGA;

export interface FourierClockInput {
    /** Seconds elapsed since the last step. */
    dt: number;
    /** The config's speed multiplier. */
    speed: number;
    /** The pointer's horizontal velocity, or 0 when the pointer is not driving. */
    scrubVelocity: number;
    /** The pointer field's transient flick burst (0..1), or 0. */
    burst: number;
    /** Whether the pointer is engaged at all this step. */
    engaged: boolean;
    /** Hold the parameter and clear the momentum. */
    frozen: boolean;
}

export interface FourierClock {
    /** The loop parameter `head_t ∈ [0,1)`. */
    readonly headT: number;
    /** The current rate offset (turns/s) the flick spring is carrying. */
    readonly momentum: number;
    /** Advance one step; returns the rate the step actually used (never negative). */
    step: (input: FourierClockInput) => number;
    /** Seat the parameter directly. Takes no spring — a hand's position is not physics. */
    set: (t: number) => void;
    /** Inject one impulse in turns per second, capped by the advance budget. */
    flick: (turnsPerSec: number) => void;
}

export function createFourierClock(): FourierClock {
    let headT = 0;
    let momentum = 0;
    let momentumVel = 0;
    let armed = true;

    function seed(turnsPerSec: number): void {
        if (!Number.isFinite(turnsPerSec) || turnsPerSec === 0) return;
        momentumVel =
            Math.min(Math.abs(turnsPerSec), MAX_IMPULSE) * Math.sign(turnsPerSec);
    }

    function settle(dt: number): void {
        if (momentum === 0 && momentumVel === 0) return;
        const accel = -OMEGA * OMEGA * momentum - 2 * ZETA * OMEGA * momentumVel;
        momentumVel += accel * dt;
        momentum += momentumVel * dt;
        if (Math.abs(momentum) < 1e-4 && Math.abs(momentumVel) < 1e-4) {
            momentum = 0;
            momentumVel = 0;
        }
    }

    return {
        get headT() {
            return headT;
        },
        get momentum() {
            return momentum;
        },
        step(input) {
            if (input.frozen) {
                momentum = 0;
                momentumVel = 0;
                return 0;
            }
            const dt = Math.min(Math.max(input.dt, 0), 0.05);
            let rate = input.speed / FOURIER_PERIOD_S;
            if (input.engaged) {
                rate += input.scrubVelocity * FOURIER_SCRUB_GAIN;
                // ONE impulse per gesture, latched on the burst's rising edge. Without the
                // latch a single flick re-seeds on every frame the burst stays high, and
                // the clock leaves on a rocket.
                if (armed && input.burst >= FLICK_ARM) {
                    armed = false;
                    seed(input.burst * 4 * Math.sign(input.scrubVelocity || 1));
                } else if (!armed && input.burst <= FLICK_DISARM) {
                    armed = true;
                }
            } else {
                armed = true;
            }
            // THE RATE FLOOR. The clock may stop; it may never un-draw.
            rate = Math.max(0, rate + momentum);
            headT = (headT + rate * dt) % 1;
            if (headT < 0) headT += 1;
            settle(dt);
            return rate;
        },
        set(t) {
            headT = ((t % 1) + 1) % 1;
        },
        flick(turnsPerSec) {
            seed(turnsPerSec);
        },
    };
}
