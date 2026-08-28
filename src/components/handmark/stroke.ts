/**
 * The hand voice — one pen, five laws, no framework.
 *
 * Every function here is pure and framework-free: a caller with a rect and a font
 * size gets the same geometry the component draws, in 1:1 CSS pixels. `strokeRibbon`
 * takes ANY polyline, so a consumer that owns its own path (a chart leader, a route)
 * inks it with this pen rather than re-deriving one.
 */

import { hashString, mulberry32 } from "../../composables/glass/procedural/prng";

/** The four gestures, enumerated at runtime so a member change breaks compile-visibly. */
export const SHAPES = ["underline", "strike", "circle", "highlight"] as const;
export type HandShape = (typeof SHAPES)[number];

export interface Point {
    x: number;
    y: number;
}

/** A measured text rect, in CSS px, already expressed in the frame that draws it. */
export interface Frame {
    x: number;
    y: number;
    width: number;
    height: number;
}

// Face metrics as spec constants, in em (Plus Jakarta Sans 400, the calibration face).
// Only the seats a gate or the component reads by name carry `export`; the rest are
// module-private, because an `export` nothing imports is not a surface, it is a claim.
const X_HEIGHT = 0.5444;
export const CAP_HEIGHT = 0.7515;
const DESCENDER = 0.2086;

/** The em box the half-leading derivation reads: 1em above the baseline, the glyph descent below. */
const EM_ASCENT = 1;

/** L4 — x-height plus a 0.04em bleed at each end. */
export const BAND_HEIGHT = X_HEIGHT + 0.08;
/** L4 — the band's bottom edge, below the baseline. */
const BAND_DROP = 0.06;
/** The underline seat, below the baseline. */
const UNDERLINE_DROP = 0.1;
/** The strike seat: the geometric mean of the x-height's midpoint and its top. */
const STRIKE_SEAT = Math.SQRT1_2 * X_HEIGHT;

/** L2-RING — the exact superellipse factor through the padded box corner: 2/k³ = 1. */
const RING_K = Math.cbrt(2);
const CREEP_MAX = 0.055;
const WOBBLE_MAX = 0.022 + 0.014;
/**
 * The hand's outer envelope for the ring, in em: the declared vertical run 2b carried
 * out by the largest radial creep and the largest wobble crest it admits.
 */
export const RING_ENVELOPE = RING_K * (CAP_HEIGHT + 0.16) * (1 + CREEP_MAX) * (1 + WOBBLE_MAX);

const round = (n: number): number => Math.round(n * 1000) / 1000;
const rad = (deg: number): number => (deg * Math.PI) / 180;

function rng(seed: number) {
    const next = mulberry32(seed >>> 0);
    return {
        next,
        span: (lo: number, hi: number) => lo + next() * (hi - lo),
        sign: (bias = 0.5) => (next() < bias ? 1 : -1),
    };
}

/** L1 — the clampless allometric nib. `weight` is a dimensionless multiple. */
export function nib(weight: number, fs: number): number {
    return weight * 0.2 * Math.pow(fs, 0.75);
}

/** L3 — floorless, ceilingless pace over the path length of ONE line rect. */
export function markDuration(length: number): number {
    return 140 + 0.55 * length;
}

/**
 * The minimum-jerk draw profile as a CSS `linear()` easing.
 *
 * Every stop is emitted the same way — the PROFILE'S OWN VALUE at its own input — so
 * `easing(0) = 0` and `easing(1) = 1` hold by construction: `10t³ − 15t⁴ + 6t⁵` is
 * exactly 0 and exactly 1 at those ends. There is no endpoint special case, because an
 * endpoint special case is a second expression for a quantity the loop already has,
 * and the two can disagree. (They did: the branch it replaces emitted the loop INDEX,
 * so `easing(1)` was `samples` and a draw animating `stroke-dashoffset` to 0 with
 * `fill: both` came to rest at −23 dash periods — a mark inside its own gap.)
 */
export function minJerk(samples = 24): string {
    const stops: string[] = [];
    for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        const v = t * t * t * (10 + t * (-15 + 6 * t));
        stops.push(`${round(v)} ${round(t * 100)}%`);
    }
    return `linear(${stops.join(", ")})`;
}

/** The alphabetic baseline inside a line rect, from the em box and its half-leading. */
function baselineOf(rect: Frame, fs: number): number {
    const content = (EM_ASCENT + DESCENDER) * fs;
    const halfLeading = Math.max(0, (rect.height - content) / 2);
    return rect.y + halfLeading + EM_ASCENT * fs;
}

export interface LineOpts {
    fs: number;
    seed: number;
    kind: "underline" | "strike";
}

/**
 * L2 — the centreline. `d(u) = S·[4u(1−u) + B·4u(1−u)(1−2u)]` with |B| ≤ 0.4: both
 * modes vanish at the endpoints and `d′` is a quadratic, so the commit carries at most
 * two extrema in closed form for every seed. The lift-off hook is monotone in t over
 * the last 6% and belongs to the release, never to the calm reading. Tilt is a shear,
 * not a rotation, so the per-end reach stays exactly what the run-out declares.
 */
export function handLine(rect: Frame, o: LineOpts): Point[] {
    const g = rng(o.seed * 0x2545 + 17);
    const L = rect.width;
    const base = baselineOf(rect, o.fs);
    const seat =
        o.kind === "strike" ? base - STRIKE_SEAT * o.fs : base + UNDERLINE_DROP * o.fs;

    const lead = g.span(0.005, 0.02);
    const exit = Math.max(g.span(0.012, 0.035), lead + 0.004);
    const sag = g.sign(0.7) * L * g.span(0.006, 0.014);
    const bow = g.span(-0.4, 0.4);
    const shear = Math.tan(rad(g.span(-1.2, 1.2)));
    const hook = g.sign() * 0.55 * nib(1, o.fs);

    const span = L * (1 + lead + exit);
    const x0 = rect.x - lead * L;
    const n = Math.max(28, Math.round(span / 5));

    const out: Point[] = [];
    for (let i = 0; i <= n; i++) {
        const u = i / n;
        const x = x0 + u * span;
        const q = 4 * u * (1 - u);
        let y = seat + sag * (q + bow * q * (1 - 2 * u)) + shear * (x - x0 - span / 2);
        if (u > 0.94) {
            const t = (u - 0.94) / 0.06;
            y += hook * t * t;
        }
        out.push({ x, y });
    }
    return out;
}

/** The ring's semi-axes: the exact curve through the padded box corner on BOTH axes. */
export function ringAxes(rect: Frame, fs: number): { a: number; b: number } {
    return {
        a: RING_K * (rect.width / 2 + 0.06 * fs),
        b: RING_K * ((CAP_HEIGHT * fs) / 2 + 0.08 * fs),
    };
}

/** The horizontal overshoot a ring reserves with `padding-inline` on its wrapper. */
export function ringReserve(rect: Frame, fs: number): number {
    return ringAxes(rect, fs).a - rect.width / 2;
}

/** L2-RING — an n=3 superellipse, overswept so the tail closes outside the head. */
export function handRing(rect: Frame, o: { fs: number; seed: number }): Point[] {
    const g = rng(o.seed * 0x9e37 + 101);
    const { a, b } = ringAxes(rect, o.fs);
    const cx = rect.x + rect.width / 2;
    const cy = baselineOf(rect, o.fs) - (CAP_HEIGHT * o.fs) / 2;

    const start = rad(g.span(118, 142));
    const sweep = rad(g.span(384, 402));
    const creep = g.span(0.025, CREEP_MAX);
    const p1 = g.span(0, Math.PI * 2);
    const p2 = g.span(0, Math.PI * 2);

    const n = 96;
    const out: Point[] = [];
    for (let i = 0; i <= n; i++) {
        const t = i / n;
        const th = start + t * sweep;
        const k =
            (1 + creep * t) *
            (1 + 0.022 * Math.sin(th + p1) + 0.014 * Math.sin(2 * th + p2));
        const c = Math.cos(th);
        const s = Math.sin(th);
        out.push({
            x: cx + k * a * Math.sign(c) * Math.pow(Math.abs(c), 2 / 3),
            y: cy + k * b * Math.sign(s) * Math.pow(Math.abs(s), 2 / 3),
        });
    }
    return out;
}

/**
 * L4 — the band: one chisel per line rect, raked at both ends, sagging like a swipe,
 * overrunning its word by 1–2% a side. Opaque, and it carries no ink colour: the page's
 * own foreground reads on it in both themes.
 */
export function handBand(rect: Frame, o: { fs: number; seed: number }): Point[] {
    const g = rng(o.seed * 0x85eb + 7);
    const base = baselineOf(rect, o.fs);
    const h = BAND_HEIGHT * o.fs;
    const bottom = base + BAND_DROP * o.fs;
    const top = bottom - h;

    const over = g.span(0.01, 0.02) * rect.width;
    const xL = rect.x - over;
    const xR = rect.x + rect.width + over;
    const rakeL = h * Math.tan(rad(g.span(-2, 2)));
    const rakeR = h * Math.tan(rad(g.span(-2, 2)));
    const sagB = g.span(-0.025, 0.025) * h;
    const sagT = g.span(-0.025, 0.025) * h;

    const n = 24;
    const out: Point[] = [];
    for (let i = 0; i <= n; i++) {
        const t = i / n;
        out.push({ x: xL + t * (xR - xL), y: bottom + sagB * Math.sin(Math.PI * t) });
    }
    for (let i = n; i >= 0; i--) {
        const t = i / n;
        const x = xL + rakeL + t * (xR + rakeR - (xL + rakeL));
        out.push({ x, y: top + sagT * Math.sin(Math.PI * t) });
    }
    return out;
}

/** The ribbon's width profile: a short entry taper, a full body, a longer release. */
function profile(u: number): number {
    const ease = (t: number) => t * t * (3 - 2 * t);
    if (u < 0.05) return 0.3 + 0.7 * ease(u / 0.05);
    if (u > 0.92) return 0.25 + 0.75 * ease((1 - u) / 0.08);
    return 1;
}

function tangent(p: Point[], i: number): Point {
    const a = p[Math.max(0, i - 1)];
    const b = p[Math.min(p.length - 1, i + 1)];
    const dx = b.x - a.x;
    const dy = b.y - a.y;
    const m = Math.hypot(dx, dy) || 1;
    return { x: dx / m, y: dy / m };
}

/** `M x y L x y …` over an open polyline. */
export function serialize(points: Point[]): string {
    if (points.length === 0) return "";
    return points
        .map((p, i) => `${i === 0 ? "M" : "L"}${round(p.x)} ${round(p.y)}`)
        .join(" ");
}

/**
 * The pen, over an arbitrary polyline: the ribbon is the outline of a stroke of
 * maximum width `w`, emitted left side forward then right side back, so the minor axis
 * at any sample is the nib the eye reads there.
 */
export function strokeRibbon(points: Point[], w: number): string {
    if (points.length < 2) return "";
    const cum = [0];
    for (let i = 1; i < points.length; i++) {
        cum.push(cum[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].y - points[i - 1].y));
    }
    const total = cum[cum.length - 1] || 1;
    const left: Point[] = [];
    const right: Point[] = [];
    for (let i = 0; i < points.length; i++) {
        const half = (w * profile(cum[i] / total)) / 2;
        const t = tangent(points, i);
        const nx = -t.y * half;
        const ny = t.x * half;
        left.push({ x: points[i].x + nx, y: points[i].y + ny });
        right.push({ x: points[i].x - nx, y: points[i].y - ny });
    }
    return `${serialize(left.concat(right.reverse()))} Z`;
}

/** A closed polygon — the band's own emission, which is a fill and not a stroke. */
export function fillPolygon(points: Point[]): string {
    return points.length ? `${serialize(points)} Z` : "";
}

/** The default seed: the marked text, salted by the mark's position among its siblings. */
export function markSeed(text: string, instanceIndex: number): number {
    return (hashString(text) ^ (instanceIndex * 0x9e3779b1)) >>> 0;
}
