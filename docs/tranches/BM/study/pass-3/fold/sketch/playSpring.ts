// playSpring: the settle's delivery (BM pass 2, Q6, candidate C), amended in pass 3 by the fold of pass 2's
// critiques (A1, A2, A12, B-1, B-2). A design sketch, not library source. In the library the sampler is
// keyframes.js's (P7); this file states what it must do.
//
// The spring is worked out once per release from (from, to, velocity) with the closed form of the table's
// row, and handed to the browser as keyframes with `linear` between them, placed densest where the curve
// bends. WebKit hands a keyframe animation of `translate`, `scale` or `opacity` with keyword easing to its
// compositor in every release; a `linear()` easing only from 27.3 (I22).
//
// What the fold changed:
// - A2, B-1: the clock is the row's own. The samples end when the body is within the row's settle band
//   (LAW 0b: 2 % or 0.5 % of the motion's size) and the last sample is the target, as the token does, so a
//   settle from rest lasts exactly the row's token clock. The band is relative, so `scale` and `opacity`
//   play their whole curve instead of a 4 ms cut or a truncated fade.
// - B-2: a retarget reads the running animation's own `currentTime`, so it starts from where the body is
//   drawn, whatever frame the first animation started on, and the new animation starts at the same moment.
// - A12, B-2: a finished settle commits its end value and drops its fill; `stop()` (a press that starts a
//   follow) commits the value on screen first, so nothing jumps and a later transition is never hidden.
// - A1: under Reduce Motion the player drops the movement and keeps a fade (P6): a `translate` or `scale`
//   change dips the node's opacity and lands its geometry while hidden; an `opacity` change is a short fade.

export interface SpringRow {
    readonly response: number;
    readonly dampingFraction: number;
    /** LAW 0b: the row's settle band, a share of the motion's size (springPresets.ts). */
    readonly settleBand: number;
}

/** Position and velocity, `t` seconds after leaving `x0` at `v0` toward `to`. */
export function springState(row: SpringRow, x0: number, v0: number, to: number, t: number): [number, number] {
    const w0 = (2 * Math.PI) / row.response, z = row.dampingFraction, d = x0 - to;
    if (z < 1) {
        const wd = w0 * Math.sqrt(1 - z * z), e = Math.exp(-z * w0 * t);
        const b = (v0 + z * w0 * d) / wd, c = Math.cos(wd * t), s = Math.sin(wd * t);
        return [to + e * (d * c + b * s), e * (-z * w0 * (d * c + b * s) + wd * (b * c - d * s))];
    }
    const e = Math.exp(-w0 * t), b = v0 + w0 * d;
    return [to + e * (d + b * t), e * (b - w0 * (d + b * t))];
}

/** The motion's size: its travel, or the excursion its speed alone would carry it, whichever is larger. */
const size = (row: SpringRow, x0: number, v0: number, to: number) =>
    Math.max(Math.abs(to - x0), (Math.abs(v0) * row.response) / (2 * Math.PI), 1e-6);

/** The row's own clock for this motion: the last moment the body is a band's width or more from rest. */
export function horizon(row: SpringRow, x0: number, v0: number, to: number): number {
    const band = row.settleBand * size(row, x0, v0, to);
    let last = 0;
    for (let t = 0.001; t < 3; t += 0.001) if (Math.abs(springState(row, x0, v0, to, t)[0] - to) >= band) last = t;
    return Math.max(0.001, Math.round(last * 1000) / 1000);
}

/** Keyframe offsets placed by the curve's bend (density ~ sqrt|x''|). */
export function offsets(row: SpringRow, x0: number, v0: number, to: number, T: number, n: number): number[] {
    const M = 96, acc = [0];
    for (let i = 1; i <= M; i++) {
        const [, va] = springState(row, x0, v0, to, ((i - 1) / M) * T), [, vb] = springState(row, x0, v0, to, (i / M) * T);
        acc.push(acc[i - 1]! + Math.sqrt((Math.abs(vb - va) * M) / T) + 1e-3);
    }
    const out = [0];
    for (let j = 1, i = 0; j < n - 1; j++) {
        const goal = (acc[M]! * j) / (n - 1);
        while (acc[i]! < goal) i++;
        out.push(i / M);
    }
    out.push(1);
    return out;
}

export type SpringProperty = "translate" | "scale" | "opacity";

export interface SpringHandle {
    readonly animation: Animation;
    /** Send the body to a new rest from where it is drawn now, keeping its velocity. */
    retarget(to: number): SpringHandle;
    /** Hold the body where it is drawn now (a press that starts a follow): commit, then cancel. */
    stop(): void;
}

const reduced = () => typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion: reduce)").matches;

/**
 * Play `row` on `el`'s `property` from `from` to `to`, leaving at `velocity` (units per second).
 * `format` writes one value of the property, e.g. `(x) => `${x}px 0`` for `translate`.
 */
export function playSpring(
    el: HTMLElement, property: SpringProperty, format: (x: number) => string,
    row: SpringRow, from: number, to: number, velocity = 0,
): SpringHandle {
    if (reduced()) return playReduced(el, property, format, row, to);
    const T = horizon(row, from, velocity, to);
    // A length errs by the square of its step, so its count grows with the root of the travel in pixels;
    // a unitless value (a scale, an opacity) takes twelve, which holds it inside its band (sketch-check.json).
    const count = property === "translate"
        ? Math.min(32, Math.max(8, Math.ceil(12 * Math.sqrt(Math.abs(to - from) / 80))))
        : 12;
    const frames = offsets(row, from, velocity, to, T, count).map((u, i, all) => ({
        offset: u, [property]: format(i === all.length - 1 ? to : springState(row, from, velocity, to, u * T)[0]),
    }));
    const animation = el.animate(frames, { duration: T * 1000, easing: "linear", fill: "forwards" });
    animation.startTime = document.timeline.currentTime; // start in this frame, so a retarget's clock is the frame's
    const commit = () => { try { animation.commitStyles(); } catch { /* detached: nothing on screen to keep */ } animation.cancel(); };
    animation.finished.then(commit, () => {});
    // The body's state where it is drawn now: the animation's own local time, never a guessed start.
    const state = (): [number, number] => {
        const t = Math.min(T, Number(animation.currentTime ?? 0) / 1000);
        return t >= T ? [to, 0] : springState(row, from, velocity, to, t);
    };
    return {
        animation,
        retarget(next: number) {
            const [x, v] = state();
            animation.cancel();
            return playSpring(el, property, format, row, x, next, v);
        },
        stop: commit,
    };
}

/** P6: the movement is dropped and the fade kept, on the same node, within the 200 ms reduced-motion clock. */
function playReduced(
    el: HTMLElement, property: SpringProperty, format: (x: number) => string, row: SpringRow, to: number,
): SpringHandle {
    const animation = property === "opacity"
        ? el.animate([{ opacity: format(to) }], { duration: 150, easing: "ease-out", fill: "forwards" })
        : el.animate(
            [{ opacity: 1 }, { opacity: 0, offset: 0.45 }, { opacity: 0, [property]: format(to), offset: 0.55 }, { opacity: 1, [property]: format(to) }],
            { duration: 200, easing: "ease-in-out", fill: "forwards" },
        );
    const commit = () => { try { animation.commitStyles(); } catch { /* detached */ } animation.cancel(); };
    animation.finished.then(commit, () => {});
    return {
        animation,
        retarget(next: number) { commit(); return playReduced(el, property, format, row, next); },
        stop: commit,
    };
}
