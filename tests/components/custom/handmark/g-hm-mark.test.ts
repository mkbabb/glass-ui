// G-HM-MARK — one continuous painted stroke, total, calm, in one unit, at the right
// scale, drawn on a profile that ends where it says. Eight arms, each with the
// mutation that bites it.
//
// These are ORDINARY vitest arms, not registered gate seats: the roster stays at
// seats:60 and neither name appears in it. Every arm reads the mark's EMITTED
// geometry (the `d` strings the component actually renders) through a synthetic
// measurement frame — the geometry LAW is what a headless arm can judge. The painted
// halves (4b centroid extrema; every colour window) are π cells and are named at
// their rows, never simulated here.

import { readFileSync } from "node:fs";
import { resolve } from "node:path";
import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import HandMark from "@glass/components/handmark/HandMark.vue";
import { handLine, minJerk, nib } from "@glass/components/handmark/stroke";
import { type Line, installMeasure, restoreMeasure } from "./measure-frame";

/** The three on-ladder rungs the story paints (the only route the ratio gate can run). */
const RUNGS = [18.608, 30.1, 48.7] as const;
const SHAPE_MEMBERS = ["underline", "strike", "circle", "highlight"] as const;

/** The φ multiples of the ONE root the story must name for three rungs to exist. */
const RUNG_MULTIPLES = ["1.618", "2.618"] as const;
const REPO_ROOT = process.cwd();
const STORY = resolve(REPO_ROOT, "demo/stories/motion/handmark.vue");

afterEach(restoreMeasure);

interface Emitted {
    /** every `d` on a painted ink path, in DOM order */
    ink: string[];
    /** every `d` on a draw-mask guide path (the centreline), in DOM order */
    guide: string[];
    html: string;
}

async function render(
    shape: (typeof SHAPE_MEMBERS)[number],
    fs: number,
    lines: Line[],
    seed = 7,
    weight = 1,
): Promise<Emitted> {
    installMeasure(lines);
    const w = mount(HandMark, {
        props: { shape, seed, weight } as Record<string, unknown>,
        slots: { default: "who pays in" },
        attrs: { style: `font-size: ${fs}px` },
        attachTo: document.body,
    });
    await nextTick();
    const pick = (token: string) =>
        w
            .findAll("path")
            .filter((p) => (p.attributes("class") ?? "").includes(token))
            .map((p) => p.attributes("d") ?? "");
    const out = { ink: pick("hm-ink"), guide: pick("hm-guide"), html: w.html() };
    w.unmount();
    return out;
}

/** Every coordinate pair in a `d`, in emission order. */
function points(d: string): Array<[number, number]> {
    const nums = (d.match(/-?\d+(?:\.\d+)?(?:e-?\d+)?/g) ?? []).map(Number);
    const out: Array<[number, number]> = [];
    for (let i = 0; i + 1 < nums.length; i += 2) out.push([nums[i], nums[i + 1]]);
    return out;
}

/** Minor axes sampled along the ribbon body, front-to-back. */
function minorAxisProfile(d: string): number[] {
    const p = points(d);
    const n = Math.floor(p.length / 2);
    const out: number[] = [];
    for (let i = 0; i < n; i++) {
        const a = p[i];
        const b = p[p.length - 1 - i];
        out.push(Math.hypot(a[0] - b[0], a[1] - b[1]));
    }
    return out;
}

/**
 * The painted nib, read off the emitted ribbon: the outline is left-side, tip,
 * right-side reversed, so index i pairs with (n-1-i) across the body. The MEDIAN of
 * those minor axes is the nib the eye reads.
 */
function medianMinorAxis(d: string): number {
    const widths = minorAxisProfile(d).slice().sort((x, y) => x - y);
    return widths.length ? widths[Math.floor(widths.length / 2)] : 0;
}

/**
 * The COMMIT's deviation from its own chord. The chord is taken over the commit
 * samples ALONE (u ≤ 0.94) so the lift-off hook — a declared organ with its own reach
 * gate — can neither be read as sag nor tilt the reference line.
 */
function commitDeviation(p: Array<[number, number]>): number[] {
    const n = Math.max(2, Math.ceil(p.length * 0.94));
    const seg = p.slice(0, n);
    const [x0, y0] = seg[0];
    const [x1, y1] = seg[seg.length - 1];
    const dx = x1 - x0 || 1;
    return seg.map(([x, y]) => y - (y0 + ((x - x0) / dx) * (y1 - y0)));
}

/** Sign changes among the deltas that clear the serialization floor. */
function extrema(dev: number[], floor: number): number {
    let last = 0;
    let count = 0;
    for (let i = 1; i < dev.length; i++) {
        const d = dev[i] - dev[i - 1];
        if (Math.abs(d) < floor) continue;
        const s = Math.sign(d);
        if (last !== 0 && s !== last) count++;
        last = s;
    }
    return count;
}

const LINE = (w: number, fs: number): Line[] => [{ x: 40, y: 60, w, h: fs * 1.35 }];

describe("G-HM-MARK 1 · TOTALITY — every runtime SHAPES member mounts with painted extent", () => {
    it.each(SHAPE_MEMBERS)("%s mounts, paints, and carries its semantic element", async (shape) => {
        const e = await render(shape, 30.1, LINE(220, 30.1));
        expect(e.ink.length, `${shape}: no painted ink path`).toBeGreaterThanOrEqual(1);
        const p = points(e.ink[0]);
        const xs = p.map((q) => q[0]);
        const ys = p.map((q) => q[1]);
        const extent = (Math.max(...xs) - Math.min(...xs)) * (Math.max(...ys) - Math.min(...ys));
        expect(extent, `${shape}: painted extent is zero`).toBeGreaterThan(0);
        if (shape === "strike") expect(e.html).toContain("<del");
        if (shape === "highlight") expect(e.html).toContain("<mark");
    });
});

describe("G-HM-MARK 2 · EXTENT — painted median minor axis ≥ 60% of the declared nib", () => {
    it.each(RUNGS)("rung %s holds the body it declares", async (fs) => {
        const e = await render("underline", fs, LINE(260, fs));
        expect(medianMinorAxis(e.ink[0]) / nib(1, fs)).toBeGreaterThanOrEqual(0.6);
    });
});

describe("G-HM-MARK 3 · CONTINUITY — one path per line rect, taper only at the tips", () => {
    it("a two-rect wrap emits exactly two ink paths and never bridges them", async () => {
        const fs = 30.1;
        const e = await render("underline", fs, [
            { x: 40, y: 60, w: 240, h: fs * 1.35 },
            { x: 0, y: 60 + fs * 1.35, w: 150, h: fs * 1.35 },
        ]);
        expect(e.ink).toHaveLength(2);
        for (const d of e.ink) expect(points(d).length).toBeGreaterThan(8);
    });

    it("a WRAPPED slot emits one path per LINE rect, never one per wrapper box", async () => {
        // `strike` renders `<del>` and `highlight` renders `<mark>`, so a range taken
        // over the host's child nodes reports the wrapper box on top of the text box
        // and the component chisels every line twice, chaining the duplicate's delay
        // behind the original's duration. The frame stub states that shape honestly
        // (`measure-frame.ts`), so this arm is the wrapper's own reading.
        const fs = 30.1;
        const one: Line[] = [{ x: 40, y: 60, w: 240, h: fs * 1.35 }];
        const two: Line[] = [...one, { x: 0, y: 60 + fs * 1.35, w: 150, h: fs * 1.35 }];
        const strike = await render("strike", fs, one);
        expect(strike.ink, `<del> over 1 line rect emitted ${strike.ink.length} marks`).toHaveLength(1);
        const wrapped = await render("highlight", fs, two);
        expect(wrapped.ink, `<mark> over 2 line rects emitted ${wrapped.ink.length} marks`).toHaveLength(2);
    });

    it("entry taper ≤5%, exit taper ≤8%, and the body holds ≥85% of the nib between", async () => {
        const fs = 48.7;
        const e = await render("underline", fs, LINE(420, fs));
        const prof = minorAxisProfile(e.ink[0]);
        const n = prof.length;
        const body = prof.slice(Math.ceil(n * 0.05), Math.floor(n * 0.92));
        const full = Math.max(...prof);
        expect(Math.min(...body) / full).toBeGreaterThanOrEqual(0.85);
        expect(prof[0] / full).toBeLessThan(0.5);
        expect(prof[n - 1] / full).toBeLessThan(0.5);
    });
});

describe("G-HM-MARK 4a · CALM, analytic — ≤2 extrema, peak ≤1.5% span", () => {
    it.each([1, 2, 3, 5, 8, 13])("seed %i draws a calm commit", async (seed) => {
        const fs = 30.1;
        const span = 260;
        const e = await render("underline", fs, LINE(span, fs), seed);
        const emitted = points(e.guide[0] ?? "");
        expect(emitted.length, `seed ${seed}: no emitted centreline`).toBeGreaterThan(10);

        // The arm is bound to what SHIPS: the analytic centreline and the emitted mask
        // guide must be the same sample set, so the closed-form reading below cannot
        // drift from the geometry the component draws.
        const analytic = handLine(
            { x: 40, y: 60, width: span, height: fs * 1.35 },
            { fs, seed, kind: "underline" },
        );
        expect(analytic.length).toBe(emitted.length);

        const dev = commitDeviation(emitted);
        expect(extrema(dev, 0.01), `seed ${seed} extrema`).toBeLessThanOrEqual(2);
        const peak = Math.max(...dev.map(Math.abs));
        expect(peak / span, `seed ${seed} peak`).toBeLessThanOrEqual(0.015);
    });
});

describe("G-HM-MARK 5 · ONE PX MEANING — the nib is the law, not the host width", () => {
    it("a 4× wider host paints the same nib at the same rung (±10%)", async () => {
        const fs = 30.1;
        const narrow = medianMinorAxis((await render("underline", fs, LINE(160, fs))).ink[0]);
        const wide = medianMinorAxis((await render("underline", fs, LINE(640, fs))).ink[0]);
        const law = nib(1, fs);
        expect(Math.abs(narrow - law) / law).toBeLessThan(0.1);
        expect(Math.abs(wide - law) / law).toBeLessThan(0.1);
    });

    it("weight is a dimensionless multiple of the law", async () => {
        const fs = 30.1;
        const one = medianMinorAxis((await render("underline", fs, LINE(300, fs), 7, 1)).ink[0]);
        const two = medianMinorAxis((await render("underline", fs, LINE(300, fs), 7, 2)).ink[0]);
        expect(two / one).toBeGreaterThan(1.8);
        expect(two / one).toBeLessThan(2.2);
    });
});

describe("G-HM-MARK 6 · RATIO — the exponent's one observable", () => {
    it("the route carries three rungs — born-RED on fewer", () => {
        const story = readFileSync(STORY, "utf8");
        const named = RUNG_MULTIPLES.filter((m) => story.includes(m));
        expect(
            named.length,
            `the story names ${named.length} φ multiple(s) of --type-body; the ratio gate needs both (${RUNG_MULTIPLES.join(", ")}) so three rungs are on the route`,
        ).toBe(RUNG_MULTIPLES.length);
    });

    it("w(48.70)/w(18.608) = 2.06 ±10% — the band excludes exponent 1 and ½", async () => {
        const lo = medianMinorAxis((await render("underline", 18.608, LINE(200, 18.608))).ink[0]);
        const hi = medianMinorAxis((await render("underline", 48.7, LINE(200, 48.7))).ink[0]);
        const ratio = hi / lo;
        expect(ratio, `painted ratio ${ratio.toFixed(3)}`).toBeGreaterThanOrEqual(1.85);
        expect(ratio, `painted ratio ${ratio.toFixed(3)}`).toBeLessThanOrEqual(2.26);
    });
});

/**
 * The EMITTED `linear()`, read the way a compositor reads it: a table of
 * (output, input%) stops interpolated between, where a stop with no explicit input
 * takes 0% first and 100% last. Evaluating the STRING is the only reading that catches
 * a generator emitting the wrong QUANTITY at an endpoint — every closed-form check of
 * the profile passes while the emission ships the loop index.
 */
function easingStops(css: string): Array<{ v: number; t: number }> {
    const body = /^linear\((.*)\)$/s.exec(css.trim());
    if (!body) throw new Error(`not a linear() easing: ${css}`);
    const raw = body[1]
        .split(",")
        .map((s) => s.trim())
        .filter((s) => s.length > 0);
    return raw.map((s, i) => {
        const [value, input] = s.split(/\s+/);
        const t =
            input !== undefined
                ? Number(input.replace("%", "")) / 100
                : i === 0
                  ? 0
                  : i === raw.length - 1
                    ? 1
                    : Number.NaN;
        return { v: Number(value), t };
    });
}

function easingAt(css: string, u: number): number {
    const s = easingStops(css);
    for (const q of s) {
        if (!Number.isFinite(q.v) || !Number.isFinite(q.t)) {
            throw new Error(`unreadable stop (${q.v} @ ${q.t}) in ${css}`);
        }
    }
    if (u <= s[0].t) return s[0].v;
    for (let i = 1; i < s.length; i++) {
        if (u <= s[i].t) {
            const span = s[i].t - s[i - 1].t || 1;
            return s[i - 1].v + ((u - s[i - 1].t) / span) * (s[i].v - s[i - 1].v);
        }
    }
    return s[s.length - 1].v;
}

describe("G-HM-MARK 7 · REACH, per-end signed — the release overruns the commit", () => {
    it.each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12])("seed %i reaches correctly", async (seed) => {
        const fs = 30.1;
        const span = 260;
        const x = 40;
        const e = await render("underline", fs, LINE(span, fs), seed);
        const xs = points(e.guide[0] ?? "").map((q) => q[0]);
        expect(xs.length, `seed ${seed}: no emitted centreline`).toBeGreaterThan(10);
        const lead = (x - Math.min(...xs)) / span;
        const exit = (Math.max(...xs) - (x + span)) / span;
        expect(lead, `seed ${seed} lead ${(lead * 100).toFixed(2)}%`).toBeGreaterThanOrEqual(0.005);
        expect(lead, `seed ${seed} lead ${(lead * 100).toFixed(2)}%`).toBeLessThanOrEqual(0.02);
        expect(exit, `seed ${seed} exit ${(exit * 100).toFixed(2)}%`).toBeGreaterThanOrEqual(0.012);
        expect(exit, `seed ${seed} exit ${(exit * 100).toFixed(2)}%`).toBeLessThanOrEqual(0.035);
        expect(exit).toBeGreaterThan(lead);
    });
});

describe("G-HM-MARK 8 · DRAW PROFILE — the easing the draw SHIPS, evaluated at its ends", () => {
    // The mask-dash draw animates `stroke-dashoffset` from `total` to `0` on this
    // easing with `fill: both`, so `easing(1)` is not a detail of the curve: it is the
    // RESTING offset, in multiples of the dash period. An easing that terminates at
    // anything but 1 parks the guide inside the dash gap and the mark's resting state
    // is an empty mask. The live half — that the resting dashoffset is 0px on a real
    // engine — is π-RERUN-R5 and is never simulated here.
    it.each([12, 24, 60])("the linear() emitted from %i samples runs 0 → 1", (samples) => {
        const css = minJerk(samples);
        expect(easingAt(css, 0), `easing(0) of ${css}`).toBeCloseTo(0, 9);
        expect(easingAt(css, 1), `easing(1) of ${css}`).toBeCloseTo(1, 9);
    });

    it("every emitted stop is an output in [0,1] on a monotone clock", () => {
        const stops = easingStops(minJerk());
        expect(stops).toHaveLength(25);
        let clock = -Infinity;
        for (const { v, t } of stops) {
            expect(v, `stop output ${v} is outside [0,1]`).toBeGreaterThanOrEqual(0);
            expect(v, `stop output ${v} is outside [0,1]`).toBeLessThanOrEqual(1);
            expect(t, `stop input ${t} runs backwards`).toBeGreaterThanOrEqual(clock);
            clock = t;
        }
    });

    it("the profile is minimum-jerk between its ends, not a straight line", () => {
        // 10t³ − 15t⁴ + 6t⁵ is exactly ½ at the midpoint and 53/512 at the quarter —
        // an arm that only read the endpoints would pass on `linear(0, 1)`.
        expect(easingAt(minJerk(), 0.5)).toBeCloseTo(0.5, 6);
        expect(easingAt(minJerk(), 0.25)).toBeCloseTo(53 / 512, 2);
    });
});
