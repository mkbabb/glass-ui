/**
 * freehand.ts — the VENDORED perfect-freehand geometry core (MIT, tldraw).
 * ─────────────────────────────────────────────────────────────────────────────
 * SPEC §1.1 / §11: glass-ui ships ZERO hard deps. `perfect-freehand` is an
 * OPTIONAL peer; its `getStroke` is the only one of the four engines that
 * produces TRUE variable width (the swelling/tapering crayon nib). We vendor only
 * its *geometry* core (a few hundred LOC, MIT) behind this L2 seam so:
 *
 *   - the default pen/crayon presets (`ribbon: 'stroke'`) NEVER import it — the
 *     bundle treeshakes it away (the shipped stroke-crayon, `ds-crayon-handmark`),
 *   - the `ribbon: 'hull'` opt-in (the future width-variance upgrade) has a
 *     dependency-free, deterministic body engine already in place,
 *   - the pointer-capture half of the library (dead weight to us) never ships.
 *
 * This is the `getStroke` + `getStrokeOutlinePoints` + `getStrokePoints` core
 * from perfect-freehand@1.2.3 (Steve Ruiz, MIT), transcribed to TypeScript with
 * the `getSvgPathFromStroke` median-quad serialiser the references use. The
 * algorithm is verbatim; only the module shape (named exports, vendored vec math)
 * is glass-ui-local.
 *
 * @license MIT — perfect-freehand © Stephen Ruiz Ltd. https://github.com/steveruizok/perfect-freehand
 */

/** A point: [x, y] or [x, y, pressure]. */
export type InputPoint = [number, number] | [number, number, number];

export interface StrokeOptions {
    size?: number;
    thinning?: number;
    smoothing?: number;
    streamline?: number;
    easing?: (t: number) => number;
    simulatePressure?: boolean;
    start?: { cap?: boolean; taper?: number | boolean; easing?: (t: number) => number };
    end?: { cap?: boolean; taper?: number | boolean; easing?: (t: number) => number };
    last?: boolean;
}

interface StrokePoint {
    point: number[];
    pressure: number;
    distance: number;
    vector: number[];
    runningLength: number;
}

// ── vec math (the subset getStroke needs) ───────────────────────────────────
const add = (a: number[], b: number[]): number[] => [a[0] + b[0], a[1] + b[1]];
const sub = (a: number[], b: number[]): number[] => [a[0] - b[0], a[1] - b[1]];
const mul = (a: number[], n: number): number[] => [a[0] * n, a[1] * n];
const neg = (a: number[]): number[] => [-a[0], -a[1]];
const per = (a: number[]): number[] => [a[1], -a[0]];
const dpr = (a: number[], b: number[]): number => a[0] * b[0] + a[1] * b[1];
const len2 = (a: number[]): number => a[0] * a[0] + a[1] * a[1];
const dist2 = (a: number[], b: number[]): number => len2(sub(a, b));
const dist = (a: number[], b: number[]): number => Math.hypot(a[1] - b[1], a[0] - b[0]);
const uni = (a: number[]): number[] => mul(a, 1 / (Math.hypot(a[0], a[1]) || 1));
const lrp = (a: number[], b: number[], t: number): number[] => add(a, mul(sub(b, a), t));
const med = (a: number[], b: number[]): number[] => mul(add(a, b), 0.5);
const rotAround = (a: number[], c: number[], r: number): number[] => {
    const s = Math.sin(r);
    const co = Math.cos(r);
    const px = a[0] - c[0];
    const py = a[1] - c[1];
    return [px * co - py * s + c[0], px * s + py * co + c[1]];
};

const { min, PI } = Math;
const FIXED_PI = PI + 0.0001;

/** Default easing (linear) for pressure → width gain. */
const lerpIdentity = (t: number): number => t;

/**
 * getStrokePoints — resample the raw input into smoothed StrokePoints with
 * running length + per-segment unit vectors (the streamline low-pass).
 */
export function getStrokePoints(
    points: InputPoint[],
    options: StrokeOptions = {},
): StrokePoint[] {
    const { streamline = 0.5, size = 16, last: isComplete = false } = options;
    if (points.length === 0) return [];

    const t = 0.15 + (1 - streamline) * 0.85;
    const pts: number[][] = points.map((p) => [p[0], p[1], p[2] ?? 0.5]);

    if (pts.length === 2) {
        const last = pts[1];
        pts[1] = lrp(pts[0], last, 0.5);
        pts.push(last);
    }
    if (pts.length === 1) {
        pts.push([...add(pts[0], [1, 1]), ...pts[0].slice(2)]);
    }

    const strokePoints: StrokePoint[] = [
        {
            point: [pts[0][0], pts[0][1]],
            pressure: pts[0][2] >= 0 ? pts[0][2] : 0.25,
            vector: [1, 1],
            distance: 0,
            runningLength: 0,
        },
    ];

    let hasReachedMinimumLength = false;
    let runningLength = 0;
    let prev = strokePoints[0];
    const max = pts.length - 1;

    for (let i = 1; i < pts.length; i++) {
        const point =
            isComplete && i === max
                ? [pts[i][0], pts[i][1]]
                : lrp(prev.point, [pts[i][0], pts[i][1]], t);

        if (dist2(prev.point, point) < 0.0001) continue;

        const d = dist(point, prev.point);
        runningLength += d;

        if (i < max && !hasReachedMinimumLength) {
            if (runningLength < size) continue;
            hasReachedMinimumLength = true;
        }

        prev = {
            point,
            pressure: pts[i][2] >= 0 ? pts[i][2] : 0.5,
            vector: uni(sub(prev.point, point)),
            distance: d,
            runningLength,
        };
        strokePoints.push(prev);
    }

    if (strokePoints.length > 0) {
        strokePoints[0].vector = strokePoints[1]?.vector ?? [0, 0];
    }
    return strokePoints;
}

/**
 * getStrokeOutlinePoints — walk the StrokePoints, emit left/right offset points
 * (the variable-width hull), with tapered caps.
 */
export function getStrokeOutlinePoints(
    points: StrokePoint[],
    options: StrokeOptions = {},
): number[][] {
    const {
        size = 16,
        smoothing = 0.5,
        thinning = 0.5,
        simulatePressure = true,
        easing = lerpIdentity,
        start = {},
        end = {},
        last: isComplete = false,
    } = options;

    const { cap: capStart = true, easing: taperStartEase = (t: number) => t * (2 - t) } = start;
    const { cap: capEnd = true, easing: taperEndEase = (t: number) => --t * t * t + 1 } = end;

    if (points.length === 0 || size <= 0) return [];

    const totalLength = points[points.length - 1].runningLength;

    const taperStart =
        start.taper === false
            ? 0
            : start.taper === true
              ? Math.max(size, totalLength)
              : (start.taper as number) ?? 0;
    const taperEnd =
        end.taper === false
            ? 0
            : end.taper === true
              ? Math.max(size, totalLength)
              : (end.taper as number) ?? 0;

    const minDistance = Math.pow(size * smoothing, 2);
    const leftPts: number[][] = [];
    const rightPts: number[][] = [];
    const radii: number[] = [];

    let prevPressure = points.slice(0, 10).reduce((acc, curr) => {
        let pressure = curr.pressure;
        if (simulatePressure) {
            const sp = min(1, curr.distance / size);
            const rp = min(1, 1 - sp);
            pressure = min(1, acc + (rp - acc) * (sp * 0.275));
        }
        return (acc + pressure) / 2;
    }, points[0].pressure);

    let radius = strokeRadius(size, thinning, points[points.length - 1].pressure, easing);
    let firstRadius: number | undefined;
    let prevVector = points[0].vector;
    let pl = points[0].point;
    let pr = pl;
    let tl = pl;
    let tr = pr;
    let isPrevPointSharpCorner = false;

    for (let i = 0; i < points.length; i++) {
        let { pressure } = points[i];
        const { point, vector, distance: distanceVal, runningLength } = points[i];

        if (i < points.length - 1 && totalLength - runningLength < 3) continue;

        if (thinning) {
            if (simulatePressure) {
                const sp = min(1, distanceVal / size);
                const rp = min(1, 1 - sp);
                pressure = min(1, prevPressure + (rp - prevPressure) * (sp * 0.275));
            }
            radius = strokeRadius(size, thinning, pressure, easing);
        } else {
            radius = size / 2;
        }
        if (firstRadius === undefined) firstRadius = radius;

        const ts =
            runningLength < taperStart ? taperStartEase(runningLength / taperStart) : 1;
        const te =
            totalLength - runningLength < taperEnd
                ? taperEndEase((totalLength - runningLength) / taperEnd)
                : 1;
        radius = Math.max(0.01, radius * Math.min(ts, te));

        const nextVector = (i < points.length - 1 ? points[i + 1] : points[i]).vector;
        const nextDpr = i < points.length - 1 ? dpr(vector, nextVector) : 1;
        const prevDpr = dpr(vector, prevVector);

        const isPointSharpCorner = prevDpr < 0 && !isPrevPointSharpCorner;
        const isNextPointSharpCorner = nextDpr !== null && nextDpr < 0.2;

        if (isPointSharpCorner || isNextPointSharpCorner) {
            const offset = mul(per(prevVector), radius);
            for (let step = 1 / 13, t = 0; t <= 1; t += step) {
                tl = rotAround(sub(point, offset), point, FIXED_PI * t);
                leftPts.push(tl);
                tr = rotAround(add(point, offset), point, FIXED_PI * -t);
                rightPts.push(tr);
            }
            pl = tl;
            pr = tr;
            if (isNextPointSharpCorner) isPrevPointSharpCorner = true;
            continue;
        }
        isPrevPointSharpCorner = false;

        if (i === points.length - 1) {
            const offset = mul(per(vector), radius);
            leftPts.push(sub(point, offset));
            rightPts.push(add(point, offset));
            continue;
        }

        const offset = mul(per(lrp(nextVector, vector, nextDpr)), radius);
        tl = sub(point, offset);
        if (i <= 1 || dist2(pl, tl) > minDistance) {
            leftPts.push(tl);
            pl = tl;
        }
        tr = add(point, offset);
        if (i <= 1 || dist2(pr, tr) > minDistance) {
            rightPts.push(tr);
            pr = tr;
        }
        prevPressure = pressure;
        prevVector = vector;
        radii.push(radius);
    }

    const firstPoint = points[0].point.slice(0, 2);
    const lastPoint =
        points.length > 1
            ? points[points.length - 1].point.slice(0, 2)
            : add(points[0].point, [1, 1]);
    const startCap: number[][] = [];
    const endCap: number[][] = [];

    if (points.length === 1) {
        if (!(taperStart || taperEnd) || isComplete) {
            const start2 = add(firstPoint, mul(uni(per(sub(firstPoint, lastPoint))), -(firstRadius ?? radius)));
            const dotPts: number[][] = [];
            for (let step = 1 / 13, t = step; t <= 1; t += step) {
                dotPts.push(rotAround(start2, firstPoint, FIXED_PI * 2 * t));
            }
            return dotPts;
        }
    } else {
        if (taperStart || (taperEnd && points.length === 1)) {
            // skip the cap when tapering
        } else if (capStart) {
            for (let step = 1 / 13, t = step; t <= 1; t += step) {
                const pt = rotAround(rightPts[0], firstPoint, FIXED_PI * t);
                startCap.push(pt);
            }
        } else {
            const cornersVector = sub(leftPts[0], rightPts[0]);
            const offsetA = mul(cornersVector, 0.5);
            const offsetB = mul(cornersVector, 0.51);
            startCap.push(
                sub(firstPoint, offsetA),
                sub(firstPoint, offsetB),
                add(firstPoint, offsetB),
                add(firstPoint, offsetA),
            );
        }

        const direction = per(neg(points[points.length - 1].vector));
        if (taperEnd || (taperStart && points.length === 1)) {
            endCap.push(lastPoint);
        } else if (capEnd) {
            const start2 = add(lastPoint, mul(direction, radius));
            for (let step = 1 / 29, t = step; t < 1; t += step) {
                endCap.push(rotAround(start2, lastPoint, FIXED_PI * 3 * t));
            }
        } else {
            endCap.push(
                add(lastPoint, mul(direction, radius)),
                add(lastPoint, mul(direction, radius * 0.99)),
                sub(lastPoint, mul(direction, radius * 0.99)),
                sub(lastPoint, mul(direction, radius)),
            );
        }
    }

    return leftPts.concat(endCap, rightPts.reverse(), startCap);
}

/** Width gain from pressure, gated by thinning + easing. */
function strokeRadius(
    size: number,
    thinning: number,
    pressure: number,
    easing: (t: number) => number = lerpIdentity,
): number {
    if (!thinning) return size / 2;
    let clamped = pressure;
    if (clamped < 0) clamped = 0;
    if (clamped > 1) clamped = 1;
    return (
        size * easing(0.5 - thinning * (0.5 - clamped)) * 0.5 +
        (size / 2) * (1 - Math.abs(thinning))
    );
}

/** getStroke — the public entry: raw input → variable-width hull outline points. */
export function getStroke(points: InputPoint[], options: StrokeOptions = {}): number[][] {
    return getStrokeOutlinePoints(getStrokePoints(points, options), options);
}

/**
 * getSvgPathFromStroke — the canonical median-quad serialiser the references use:
 * each segment's control point is the midpoint of two consecutive outline points,
 * yielding a smooth closed fill `d`-string.
 */
export function getSvgPathFromStroke(stroke: number[][], closed = true): string {
    if (stroke.length < 4) return "";
    let a = stroke[0];
    let b = stroke[1];
    const c = stroke[2];
    let result =
        `M${a[0].toFixed(2)},${a[1].toFixed(2)} ` +
        `Q${b[0].toFixed(2)},${b[1].toFixed(2)} ` +
        `${med(b, c)[0].toFixed(2)},${med(b, c)[1].toFixed(2)} T`;
    for (let i = 2, max = stroke.length - 1; i < max; i++) {
        a = stroke[i];
        b = stroke[i + 1];
        result += `${med(a, b)[0].toFixed(2)},${med(a, b)[1].toFixed(2)} `;
    }
    if (closed) result += "Z";
    return result;
}
