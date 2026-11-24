// playSpring: the settle's delivery (BM pass 2, Q6, candidate C). A design sketch, not library source.
// The spring is worked out once per release from (from, to, velocity) with the closed form of the table's
// row, and handed to the browser as keyframes with `linear` between them, placed densest where the curve
// bends most. WebKit hands a keyframe animation of `translate`, `scale` or `opacity` with keyword easing to
// its compositor in every release; a `linear()` easing only from 27.3 (I22). A retarget reads the spring's
// own position and velocity at that moment and starts again from there, so the velocity carries (no kink).
// P7: the curve's source is the SPRING_PRESETS row; in the library this sampler is keyframes.js's.

export interface SpringRow { readonly response: number; readonly dampingFraction: number }

/** Position and velocity, `t` seconds after leaving `x0` at `v0` toward `to`. */
function springState(row: SpringRow, x0: number, v0: number, to: number, t: number): [number, number] {
    const w0 = (2 * Math.PI) / row.response, z = row.dampingFraction, d = x0 - to;
    if (z < 1) {
        const wd = w0 * Math.sqrt(1 - z * z), e = Math.exp(-z * w0 * t);
        const b = (v0 + z * w0 * d) / wd, c = Math.cos(wd * t), s = Math.sin(wd * t);
        return [to + e * (d * c + b * s), e * (-z * w0 * (d * c + b * s) + wd * (b * c - d * s))];
    }
    const e = Math.exp(-w0 * t), b = v0 + w0 * d;
    return [to + e * (d + b * t), e * (b - w0 * (d + b * t))];
}

/** The settle horizon: the last moment the body is a quarter pixel or more from rest. */
function horizon(row: SpringRow, x0: number, v0: number, to: number): number {
    let last = 0;
    for (let t = 0.004; t < 2; t += 0.004) if (Math.abs(springState(row, x0, v0, to, t)[0] - to) >= 0.25) last = t;
    return last + 0.004;
}

/** Keyframe offsets placed by the curve's bend (density ~ sqrt|x''|), so a dozen frames hold it within a fraction of a pixel. */
function offsets(row: SpringRow, x0: number, v0: number, to: number, T: number, n: number): number[] {
    const M = 96, acc = [0];
    for (let i = 1; i <= M; i++) {
        const [, va] = springState(row, x0, v0, to, ((i - 1) / M) * T), [, vb] = springState(row, x0, v0, to, (i / M) * T);
        acc.push(acc[i - 1]! + Math.sqrt(Math.abs(vb - va) * M / T) + 1e-3);
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

export interface SpringHandle {
    readonly animation: Animation;
    /** Send the body to a new rest from where it is now, keeping its velocity. */
    retarget(to: number): SpringHandle;
}

/**
 * Play `row` on `el`'s `property` from `from` to `to`, leaving at `velocity` (units per second).
 * `format` writes one value of the property, e.g. `(x) => `${x}px 0`` for `translate`.
 */
export function playSpring(
    el: HTMLElement, property: "translate" | "scale" | "opacity", format: (x: number) => string,
    row: SpringRow, from: number, to: number, velocity = 0,
    // linear steps err by the square of their length, so the count grows with the root of the travel:
    // a dozen for 80 px holds the curve within about a pixel at every row and velocity (sketch-check.json)
    count = Math.min(32, Math.max(8, Math.ceil(12 * Math.sqrt(Math.abs(to - from) / 80)))),
): SpringHandle {
    const T = horizon(row, from, velocity, to);
    const frames = offsets(row, from, velocity, to, T, count).map((u, i, all) => ({
        offset: u, [property]: format(i === all.length - 1 ? to : springState(row, from, velocity, to, u * T)[0]),
    }));
    const animation = el.animate(frames, { duration: T * 1000, easing: "linear", fill: "forwards" });
    const started = animation.startTime ?? document.timeline.currentTime;
    return {
        animation,
        retarget(next: number) {
            const now = Number(document.timeline.currentTime ?? 0), t = Math.min(T, (now - Number(started ?? now)) / 1000);
            const [x, v] = t >= T ? [to, 0] : springState(row, from, velocity, to, t);
            animation.cancel();
            return playSpring(el, property, format, row, x, next, v);
        },
    };
}
