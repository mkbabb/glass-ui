// The clock a mounted surface leaves on, read from the stylesheet at the close: its row's
// exit duration (`--spring-<row>-exit-duration`, 0.6 × its entrance) on `--exit-curve`.
// Under reduced motion it is held to at most `--duration-fast` (200 ms), and it carries
// the entrance's fade as well as the exit. The spring mount kernel and the sheet's detent
// engine both run on it.

import type { SpringPresetName } from "./springPresets";

export interface ExitClock {
    /** The run's length in ms. */
    ms: number;
    /** The exit curve as a function of progress. */
    ease: (k: number) => number;
}

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

const msOf = (duration: string): number =>
    duration.endsWith("ms") ? parseFloat(duration) : parseFloat(duration) * 1000;

/** The row's exit clock, `stretch` times its duration, and the exit curve, read from the
 *  stylesheet. Under reduced motion the clock is held to at most `--duration-fast`. Null
 *  where no stylesheet resolves them. */
export function readExitClock(
    row: SpringPresetName,
    reduced: boolean,
    stretch = 1,
): ExitClock | null {
    if (typeof document === "undefined" || !document.body) return null;
    const probe = document.createElement("div");
    probe.style.cssText = `position:absolute;visibility:hidden;transition-duration:var(--spring-${row}-exit-duration);transition-timing-function:var(--exit-curve);animation-duration:var(--duration-fast)`;
    document.body.appendChild(probe);
    const cs = getComputedStyle(probe);
    const exitMs = msOf(cs.transitionDuration.trim()) * stretch;
    const ms = reduced ? Math.min(exitMs, msOf(cs.animationDuration.trim())) : exitMs;
    const ease = bezierOf(cs.transitionTimingFunction);
    probe.remove();
    return ms > 0 && ease ? { ms, ease } : null;
}

/** Runs the clock, calling `frame` with its eased progress on every animation frame and
 *  `done` after the last. It advances by at most one 60 Hz frame per frame, so a long
 *  frame (a pick that navigates, a list that re-renders) slows the run rather than
 *  skipping a stretch of it; on steady frames it keeps the clock. Returns its stop. */
export function runExitClock(
    clock: ExitClock,
    frame: (eased: number) => void,
    done: () => void,
): () => void {
    let id = 0;
    let last: number | null = null;
    let elapsed = 0;
    const step = (now: number) => {
        if (last !== null) elapsed += Math.min(now - last, 1000 / 60);
        last = now;
        const k = Math.min(1, elapsed / clock.ms);
        frame(clock.ease(k));
        if (k < 1) {
            id = requestAnimationFrame(step);
            return;
        }
        id = 0;
        done();
    };
    id = requestAnimationFrame(step);
    return () => {
        if (id) cancelAnimationFrame(id);
        id = 0;
    };
}
