// The Springs page's one curve: a spring (response, damping) or a cubic bezier with a
// duration. Both reduce to a function of normalized time and a play length.
import { SpringProgress, springTimingFunction } from "@mkbabb/keyframes.js";
import { SPRING_PRESETS } from "@glass/composables/motion";
import type { ConfiguratorPreset } from "@glass/components/configurator";

export type CurveKind = "spring" | "ease";

export interface CurveConfig {
    kind: CurveKind;
    response: number;
    damping: number;
    x1: number;
    y1: number;
    x2: number;
    y2: number;
    /** The easing curve's play length, in milliseconds. */
    duration: number;
}

export interface Curve {
    fn: (t: number) => number;
    ms: number;
    /** The highest value the curve reaches, so travel can leave room for overshoot. */
    peak: number;
    /** The lowest value, for curves that dip below the start. */
    floor: number;
}

const SETTLE_BAND = 0.02;
const SETTLE_DT = 0.001;
const SETTLE_MAX = 5;

/** Seconds until the spring stays within 2 % of its target. */
function settleSeconds(response: number, dampingFraction: number): number {
    const spring = new SpringProgress({ response, dampingFraction });
    spring.target = 1;
    let last = 0;
    for (let t = SETTLE_DT; t < SETTLE_MAX; t += SETTLE_DT) {
        if (Math.abs(1 - spring.tickToTime(t)) >= SETTLE_BAND) last = t;
    }
    spring.dispose();
    return Math.max(last, 0.05);
}

/** A CSS cubic-bezier as a function of x, solved by Newton steps with a bisection fallback. */
function bezier(x1: number, y1: number, x2: number, y2: number): (t: number) => number {
    const ax = 3 * x1 - 3 * x2 + 1;
    const bx = 3 * x2 - 6 * x1;
    const cx = 3 * x1;
    const ay = 3 * y1 - 3 * y2 + 1;
    const by = 3 * y2 - 6 * y1;
    const cy = 3 * y1;
    const sx = (s: number) => ((ax * s + bx) * s + cx) * s;
    const sy = (s: number) => ((ay * s + by) * s + cy) * s;
    const dx = (s: number) => (3 * ax * s + 2 * bx) * s + cx;
    return (x) => {
        if (x <= 0) return 0;
        if (x >= 1) return 1;
        let s = x;
        for (let i = 0; i < 8; i++) {
            const err = sx(s) - x;
            if (Math.abs(err) < 1e-6) return sy(s);
            const d = dx(s);
            if (Math.abs(d) < 1e-6) break;
            s -= err / d;
        }
        let lo = 0;
        let hi = 1;
        s = x;
        for (let i = 0; i < 30; i++) {
            if (sx(s) < x) lo = s;
            else hi = s;
            s = (lo + hi) / 2;
        }
        return sy(s);
    };
}

export function buildCurve(c: CurveConfig): Curve {
    let fn: (t: number) => number;
    let ms: number;
    if (c.kind === "spring") {
        const seconds = settleSeconds(c.response, c.damping);
        fn = springTimingFunction({
            response: c.response,
            dampingFraction: c.damping,
            sampleCount: 96,
            maxDuration: seconds,
        }).fn;
        ms = seconds * 1000;
    } else {
        fn = bezier(c.x1, c.y1, c.x2, c.y2);
        ms = c.duration;
    }
    let peak = 1;
    let floor = 0;
    for (let i = 0; i <= 120; i++) {
        const v = fn(i / 120);
        peak = Math.max(peak, v);
        floor = Math.min(floor, v);
    }
    return { fn, ms, peak, floor };
}

/** The curve as an SVG path in the plot's space (y grows downward, 1 at the top). */
export function curvePath(fn: (t: number) => number, samples = 120): string {
    let d = "";
    for (let i = 0; i <= samples; i++) {
        const t = i / samples;
        d += `${i === 0 ? "M" : "L"}${t.toFixed(4)} ${(1 - fn(t)).toFixed(4)}`;
    }
    return d;
}

const BASE: CurveConfig = {
    kind: "spring",
    response: 0.4,
    damping: 0.71,
    x1: 0.4,
    y1: 0,
    x2: 0.2,
    y2: 1,
    duration: 450,
};

const capital = (s: string): string => s.charAt(0).toUpperCase() + s.slice(1);

/** The library's easing tokens, read from the page so the presets match the shipped values. */
const EASINGS: readonly { key: string; label: string; token: string; fallback: number[] }[] = [
    { key: "ease-standard", label: "Standard", token: "--ease-standard", fallback: [0.4, 0, 0.2, 1] },
    { key: "ease-out", label: "Ease out", token: "--ease-out", fallback: [0, 0, 0.2, 1] },
    { key: "ease-in", label: "Ease in", token: "--ease-in", fallback: [0.4, 0, 1, 1] },
    { key: "ease-out-expo", label: "Expo out", token: "--ease-out-expo", fallback: [0.16, 1, 0.3, 1] },
];

function readBezier(token: string, fallback: number[]): number[] {
    if (typeof document === "undefined") return fallback;
    const raw = getComputedStyle(document.documentElement).getPropertyValue(token);
    const m = /cubic-bezier\(([^)]+)\)/.exec(raw);
    const nums = m ? m[1]!.split(",").map((s) => Number(s.trim())) : [];
    return nums.length === 4 && nums.every(Number.isFinite) ? nums : fallback;
}

/** The shared spring characters, then the easing tokens, as editor presets. */
export function curvePresets(): ConfiguratorPreset<CurveConfig>[] {
    const springs = SPRING_PRESETS.map((row) => ({
        key: row.name,
        label: capital(row.name),
        config: { ...BASE, kind: "spring" as const, response: row.response, damping: row.dampingFraction },
    }));
    const eases = EASINGS.map((e) => {
        const [x1, y1, x2, y2] = readBezier(e.token, e.fallback) as [number, number, number, number];
        return { key: e.key, label: e.label, config: { ...BASE, kind: "ease" as const, x1, y1, x2, y2 } };
    });
    return [...springs, ...eases];
}
