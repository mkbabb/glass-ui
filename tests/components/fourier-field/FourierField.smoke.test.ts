// The fourier-field close battery.
//
// Six groups, each one a claim the component makes about itself in public:
//   ONE LAW    — there is exactly one renderer and no ceiling constant anywhere.
//   THE MINT   — the axis maxima of record, amplitude order, and the paint floor.
//   THE RINGS  — a ring is drawn only when it can be seen as a ring.
//   THE CLOCK  — the head never runs backward and one gesture is one impulse.
//   THE A11Y   — interactive, the host is a real slider; ambient, it is nothing.
//   /fourier-math — the published subpath still reconstructs what it transformed.
//
// The point of the battery is that every number it asserts is one the shipped code
// produces, not one restated beside it.

import { describe, expect, it } from "vitest";
import { mount } from "@vue/test-utils";
import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import * as fourierMath from "@mkbabb/glass-ui/fourier-math";
import { dftFromPoints, makeEllipticSpectrum, positionsAt } from "@mkbabb/glass-ui/fourier-math";
import {
    DEFAULT_FOURIER_CONFIG,
    FourierField,
    FOURIER_FIGURES,
    makeHarmonicFigure,
    mintSpectrum,
    ringsAt,
    type MintedSpectrum,
} from "@glass/components/fourier-field";
import {
    FOURIER_REFERENCE_DIAGONAL_PX,
    FOURIER_PAINT_FLOOR_PX,
} from "@glass/components/fourier-field/renderer/mint";
import { createFourierClock, FOURIER_SETTLE_ZETA_FLOOR, FOURIER_TRAVEL_SPRING } from "@glass/components/fourier-field/clock";
import { FOURIER_QUANTUM_FINE } from "@glass/components/fourier-field/constants";
import { FOURIER_SHAPES } from "../../../demo/stories/substrates/fourier-field/fourier-paths";

const SRC = join(process.cwd(), "src");
const DEMO = join(process.cwd(), "demo");

function walk(dir: string, out: string[] = []): string[] {
    for (const entry of readdirSync(dir)) {
        const path = join(dir, entry);
        if (statSync(path).isDirectory()) walk(path, out);
        else if (/\.(ts|vue|mjs)$/.test(entry)) out.push(path);
    }
    return out;
}

const shape = (key: string): MintedSpectrum =>
    mintSpectrum(FOURIER_SHAPES.find((s) => s.key === key)!.spectrum);
const figure = (key: keyof typeof FOURIER_FIGURES): MintedSpectrum =>
    mintSpectrum(makeHarmonicFigure(FOURIER_FIGURES[key]));

describe("fourier-field — ONE LAW: one renderer, no ceiling", () => {
    const sources = [...walk(SRC), ...walk(DEMO)];

    it("carries no WebGL arm, no parity claim, and no ceiling constant", () => {
        const banned = [
            "fourierFieldGLSetup",
            "fourier-field.glsl",
            "GL_MAX_CURVE_SAMPLES",
            "GL_MAX_PHASORS",
            "MAX_PHASORS",
            "epicycleArms",
            "WARM_IDENTITY_PALETTE",
        ];
        const hits: string[] = [];
        for (const path of sources) {
            const text = readFileSync(path, "utf8");
            for (const needle of banned) {
                if (text.includes(needle)) hits.push(`${path}: ${needle}`);
            }
        }
        expect(hits).toEqual([]);
    });

    it("declares the WebGL2 seam closed rather than shipping a second renderer", () => {
        const wgpu = readFileSync(
            join(SRC, "components/fourier-field/renderer/wgpu.ts"),
            "utf8",
        );
        // The seam exists because the substrate picker requires it; it acquires nothing
        // and paints nothing, and says why.
        expect(wgpu).toContain("createFourierUnsupportedSetup");
        expect(wgpu).toContain("throw new Error(FOURIER_UNSUPPORTED_MESSAGE)");
        expect(wgpu).toContain("WebGPU is required");
        expect(wgpu).not.toContain("#version 300 es");
    });

    it("keeps the fourier pointer-lean arm deleted — touch means time, not space", () => {
        const mappings = readFileSync(
            join(SRC, "composables/motion/pointer/pointerFieldMappings.ts"),
            "utf8",
        );
        expect(mappings).not.toContain("fourierLeanMapping");
        expect(readFileSync(join(SRC, "index.ts"), "utf8")).not.toContain("fourierLean");
    });
});

describe("fourier-field — THE MINT: the axis maxima of record", () => {
    // The floor is stated once, in the module, and read here rather than repeated.
    it("states its own reference stage", () => {
        expect(FOURIER_REFERENCE_DIAGONAL_PX).toBe(856);
        expect(FOURIER_PAINT_FLOOR_PX).toBe(0.5);
    });

    it("emits the term counts of record at the reference stage", () => {
        expect(shape("f-mark").terms.length).toBe(61);
        expect(shape("heart").terms.length).toBe(8);
        expect(shape("star").terms.length).toBe(18);
        expect(figure("trefoil").terms.length).toBe(2);
        expect(figure("quatrefoil").terms.length).toBe(2);
        expect(figure("pentafoil").terms.length).toBe(2);
        expect(figure("hexafoil").terms.length).toBe(2);
        expect(figure("spiro").terms.length).toBe(3);
    });

    it("orders by amplitude and hoists the DC term out of the axis", () => {
        for (const key of ["f-mark", "heart", "star"]) {
            const m = shape(key);
            for (let i = 1; i < m.terms.length; i++) {
                expect(m.terms[i].amplitude).toBeLessThanOrEqual(m.terms[i - 1].amplitude);
            }
            expect(m.terms.some((c) => c.index === 0)).toBe(false);
            expect(m.dc.length).toBe(2);
        }
    });

    it("keeps every emitted term above the paint floor at the reference stage", () => {
        for (const key of ["f-mark", "heart", "star"]) {
            const m = shape(key);
            const pxPerModel = FOURIER_REFERENCE_DIAGONAL_PX / m.diagonal;
            // The mint bounds the FULL reconstruction, so the survivors' own bbox is at
            // least as tight; every one of them still clears the floor on it.
            for (const c of m.terms) {
                expect(2 * c.amplitude * pxPerModel).toBeGreaterThanOrEqual(
                    FOURIER_PAINT_FLOOR_PX * 0.999,
                );
            }
        }
    });

    it("always emits at least one term, so N=1 always has a ring to draw", () => {
        for (const key of ["f-mark", "heart", "star"]) {
            expect(shape(key).terms.length).toBeGreaterThanOrEqual(1);
        }
        for (const key of Object.keys(FOURIER_FIGURES) as (keyof typeof FOURIER_FIGURES)[]) {
            expect(figure(key).terms.length).toBeGreaterThanOrEqual(1);
        }
        expect(mintSpectrum([]).terms.length).toBe(1);
    });

    it("is reference-identical under an N edit — the mint has no N to read", () => {
        const a = shape("star");
        const b = shape("star");
        expect(a.terms.length).toBe(b.terms.length);
        expect(a.diagonal).toBeCloseTo(b.diagonal, 12);
        // The one call the fit makes takes the mint and the machine flag. There is no
        // parameter through which N could reach it.
        expect(mintSpectrum.length).toBe(1);
    });

    it("reaches the full picture in far fewer terms than frequency order would", () => {
        const raw = FOURIER_SHAPES.find((s) => s.key === "star")!.spectrum;
        const full: [number, number][] = [];
        for (let i = 0; i < 256; i++) full.push(evaluate(raw, i / 256, raw.length));
        const span = bboxSpan(full);
        const amp = [...raw].sort((a, b) => b.amplitude - a.amplitude);
        expect(termsWithin(amp, full, span, 0.01)).toBeLessThan(
            termsWithin(raw, full, span, 0.01) / 3,
        );
    });
});

describe("fourier-field — THE RINGS: drawn only when they read as rings", () => {
    it("draws no ring narrower than the stroke drawing it", () => {
        const m = shape("f-mark");
        for (const stroke of [4, 8, 12]) {
            const drawn = ringsAt(m, 856, stroke);
            const pxPerModel = 856 / m.diagonal;
            const eligible = m.terms.filter(
                (c) => 2 * c.amplitude * pxPerModel >= stroke,
            ).length;
            expect(drawn).toBe(eligible);
        }
    });

    it("sheds rings as the stage shrinks, with zero media queries to do it", () => {
        const m = shape("f-mark");
        const counts = [856, 700, 560, 420, 336].map((d) => ringsAt(m, d, 8));
        for (let i = 1; i < counts.length; i++) {
            expect(counts[i]).toBeLessThanOrEqual(counts[i - 1]);
        }
        expect(counts[0]).toBeGreaterThan(counts[counts.length - 1]);
    });

    it("never elides a term from the SUM — only its outline", () => {
        const m = shape("f-mark");
        // A phone-sized stage draws far fewer rings than the spectrum carries, and the
        // spectrum is untouched by the question.
        expect(ringsAt(m, 336, 12)).toBeLessThan(m.terms.length);
        expect(m.terms.length).toBe(61);
    });
});

describe("fourier-field — THE CLOCK", () => {
    it("binds the travel spring by job and consumes a damping fraction that cannot rewind", () => {
        expect(FOURIER_TRAVEL_SPRING.name).toBe("world");
        expect(FOURIER_TRAVEL_SPRING.dampingFraction).toBeGreaterThanOrEqual(
            FOURIER_SETTLE_ZETA_FLOOR,
        );
    });

    it("declares no inline spring pair of its own", () => {
        for (const file of ["clock.ts", "useFourierField.ts"]) {
            const text = readFileSync(join(SRC, "components/fourier-field", file), "utf8");
            expect(text).not.toContain("SETTLE_OMEGA =");
            expect(text).not.toContain("SETTLE_ZETA =");
        }
    });

    it("never runs the head backward, over an adversarial trace", () => {
        for (const r0 of [0.2, 0.5, 0.8, 1.4, 2.5, 4.0]) {
            const clock = createFourierClock();
            clock.flick(r0);
            let previous = clock.headT;
            let wrapped = 0;
            for (let i = 0; i < 600; i++) {
                const rate = clock.step({
                    dt: 1 / 60,
                    speed: 1,
                    // A hostile scrub: hard against the travel, every frame.
                    scrubVelocity: -2,
                    burst: 0,
                    engaged: true,
                    frozen: false,
                });
                expect(rate).toBeGreaterThanOrEqual(0);
                const delta = clock.headT - previous;
                if (delta < 0) wrapped++;
                previous = clock.headT;
            }
            // The only negative deltas allowed are the period wrapping past 1.
            expect(wrapped).toBeLessThanOrEqual(3);
        }
    });

    it("holds one flick's total advance to half a figure", () => {
        const clock = createFourierClock();
        const before = clock.headT;
        clock.flick(1e6); // absurdly hard — the cap is the point
        let turns = 0;
        for (let i = 0; i < 2000; i++) {
            turns += clock.step({
                dt: 1 / 120,
                speed: 0,
                scrubVelocity: 0,
                burst: 0,
                engaged: false,
                frozen: false,
            }) / 120;
        }
        expect(turns).toBeLessThanOrEqual(0.5 + 1e-3);
        expect(turns).toBeGreaterThan(0);
        expect(before).toBe(0);
    });

    it("takes ONE impulse per gesture, not one per frame", () => {
        // `headT` WRAPS at 1, so comparing it compares POSITIONS on the loop, not
        // advance. A latch-removed clock re-seeds every high-burst frame and runs
        // 1.0451 turns — which reads back as 0.0451 and looks SLOWER than the three
        // re-armed gestures' 0.5582, so the wrapped compare passes the very mutant
        // this arm names. Accumulate the UNWRAPPED advance instead: the rate each
        // step actually used, integrated over its own dt.
        const held = createFourierClock();
        let heldTotal = 0;
        for (let i = 0; i < 90; i++) {
            heldTotal +=
                held.step({
                    dt: 1 / 60,
                    speed: 0,
                    scrubVelocity: 1,
                    burst: 0.9,
                    engaged: true,
                    frozen: false,
                }) / 60;
        }

        // The same burst, but the gesture releases and re-arms three times.
        const repeated = createFourierClock();
        let repeatedTotal = 0;
        for (let g = 0; g < 3; g++) {
            for (let i = 0; i < 30; i++) {
                repeatedTotal +=
                    repeated.step({
                        dt: 1 / 60,
                        speed: 0,
                        scrubVelocity: 1,
                        burst: i < 15 ? 0.9 : 0,
                        engaged: true,
                        frozen: false,
                    }) / 60;
            }
        }
        // Shipped: 0.2604 > 0.2368. Latch removed: 0.5582 < 1.0451, and it fails.
        expect(repeatedTotal).toBeGreaterThan(heldTotal);
    });

    it("holds the parameter and clears momentum when frozen", () => {
        const clock = createFourierClock();
        clock.flick(3);
        clock.step({ dt: 1 / 60, speed: 1, scrubVelocity: 0, burst: 0, engaged: false, frozen: false });
        const held = clock.headT;
        for (let i = 0; i < 60; i++) {
            clock.step({ dt: 1 / 60, speed: 1, scrubVelocity: 0, burst: 0, engaged: false, frozen: true });
        }
        expect(clock.headT).toBe(held);
        expect(clock.momentum).toBe(0);
    });

    it("scrubs directly, with no spring between the hand and the parameter", () => {
        const clock = createFourierClock();
        clock.set(0.42);
        expect(clock.headT).toBeCloseTo(0.42, 12);
        clock.set(-0.25);
        expect(clock.headT).toBeCloseTo(0.75, 12);
    });
});

describe("fourier-field — THE SURFACE", () => {
    it("mounts the studio surface", () => {
        const wrapper = mount(FourierField, {
            props: {
                config: DEFAULT_FOURIER_CONFIG,
                getPalette: () => [...DEFAULT_FOURIER_CONFIG.palette],
            },
        });
        expect(wrapper.find("canvas.fourier-field-canvas").exists()).toBe(true);
        wrapper.unmount();
    });

    it("mounts the ambient colour seam", () => {
        const wrapper = mount(FourierField, {
            props: { color: "oklch(0.6 0.18 25)", seed: "smoke", freeze: true },
        });
        expect(wrapper.find("canvas.fourier-field-canvas").exists()).toBe(true);
        wrapper.unmount();
    });

    it("refuses an unknown source at config time rather than painting a default", () => {
        expect(() =>
            mount(FourierField, {
                props: {
                    config: {
                        ...DEFAULT_FOURIER_CONFIG,
                        source: "not-a-figure" as never,
                    },
                },
            }),
        ).toThrow(/unknown source/);
    });

    it("is a real slider when interactive", async () => {
        const wrapper = mount(FourierField, { props: { interactive: true } });
        const host = wrapper.find(".fourier-field");
        expect(host.attributes("role")).toBe("slider");
        expect(host.attributes("tabindex")).toBe("0");
        expect(host.attributes("aria-valuemin")).toBe("0");
        expect(host.attributes("aria-valuemax")).toBe("1");
        expect(host.attributes("aria-valuenow")).toBeDefined();
        // The spoken value carries the same summed count the frame used.
        expect(host.attributes("aria-valuetext")).toMatch(/^N \d+\/\d+ · \d+% through the period$/);

        await host.trigger("keydown", { key: "ArrowRight" });
        expect(Number(wrapper.find(".fourier-field").attributes("aria-valuenow"))).toBeCloseTo(
            FOURIER_QUANTUM_FINE,
            3,
        );
        await wrapper.find(".fourier-field").trigger("keydown", { key: "Home" });
        expect(Number(wrapper.find(".fourier-field").attributes("aria-valuenow"))).toBe(0);
        await wrapper.find(".fourier-field").trigger("keydown", { key: "End" });
        expect(Number(wrapper.find(".fourier-field").attributes("aria-valuenow"))).toBeCloseTo(
            0.999,
            3,
        );
        wrapper.unmount();
    });

    it("is nothing at all when ambient — no role, no tab stop", () => {
        const wrapper = mount(FourierField, { props: { interactive: false } });
        const host = wrapper.find(".fourier-field");
        expect(host.attributes("role")).toBeUndefined();
        expect(host.attributes("tabindex")).toBeUndefined();
        expect(wrapper.find("canvas").attributes("aria-hidden")).toBe("true");
        wrapper.unmount();
    });

    it("exposes the transport the story binds", () => {
        const wrapper = mount(FourierField);
        const vm = wrapper.vm as unknown as Record<string, unknown>;
        for (const key of ["setHeadT", "flick", "pause", "resume", "wake", "headT"]) {
            expect(key in vm).toBe(true);
        }
        wrapper.unmount();
    });

    it("speaks ONE transport vocabulary — the stage pill is gone", () => {
        const story = readFileSync(
            join(DEMO, "stories/substrates/fourier-field.vue"),
            "utf8",
        );
        expect(story).not.toContain("stage-pill");
        expect(story).not.toMatch(/N \{\{[^}]*\}\} \/ \{\{[^}]*\}\}\s*<\/span>\s*<span[^>]*>\s*\{\{ liveStatus/);
        expect(story).not.toContain("liveStatus");
        // The readout is the field's own parameter, not a second copy of the clock.
        expect(story).toContain("headT");
    });
});

describe("/fourier-math leaf (the published subpath consumer-#1)", () => {
    it("builds a spectrum and reconstructs the chain through the published subpath", () => {
        let s = 0x9e3779b9;
        const rng = () => {
            s = (s + 0x6d2b79f5) | 0;
            let t = Math.imul(s ^ (s >>> 15), 1 | s);
            t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
            return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
        };
        const spectrum = makeEllipticSpectrum(rng, 0.4);
        expect(spectrum.some((c) => c.index === 1)).toBe(true);
        expect(spectrum.some((c) => c.index === -1)).toBe(true);
        const chain = positionsAt(spectrum, 0.25);
        expect(chain[0]).toEqual([0, 0]);
        expect(chain.length).toBe(spectrum.length + 1);
    });

    it("does not ship the retired names", () => {
        expect("evalFourier" in fourierMath).toBe(false);
        expect("EllipticSpectrumOptions" in fourierMath).toBe(false);
        expect(typeof fourierMath.positionsAt).toBe("function");
        expect(typeof fourierMath.comp).toBe("function");
    });

    it("dftFromPoints is the inverse of positionsAt", () => {
        const N = 64;
        const pts: [number, number][] = [];
        for (let n = 0; n < N; n++) {
            const t = (2 * Math.PI * n) / N;
            pts.push([
                2 * Math.cos(t) + 0.3 * Math.cos(2 * t),
                0.7 * Math.sin(t) + 0.2 * Math.sin(2 * t),
            ]);
        }
        const spectrum = dftFromPoints(pts);
        for (const n of [0, 7, 16, 31, 48]) {
            const chain = positionsAt(spectrum, n / N);
            const [rx, ry] = chain[chain.length - 1]!;
            expect(rx).toBeCloseTo(pts[n][0], 6);
            expect(ry).toBeCloseTo(pts[n][1], 6);
        }
    });
});

// ── local helpers for the ordering claim ──
type Term = { index: number; coefficient: [number, number]; amplitude: number; phase: number };
function evaluate(terms: readonly Term[], t: number, n: number): [number, number] {
    let x = 0;
    let y = 0;
    for (let i = 0; i < n && i < terms.length; i++) {
        const c = terms[i];
        const a = 2 * Math.PI * c.index * t;
        x += c.coefficient[0] * Math.cos(a) - c.coefficient[1] * Math.sin(a);
        y += c.coefficient[0] * Math.sin(a) + c.coefficient[1] * Math.cos(a);
    }
    return [x, y];
}
function bboxSpan(pts: [number, number][]): number {
    let mnx = Infinity, mny = Infinity, mxx = -Infinity, mxy = -Infinity;
    for (const [x, y] of pts) {
        mnx = Math.min(mnx, x); mny = Math.min(mny, y);
        mxx = Math.max(mxx, x); mxy = Math.max(mxy, y);
    }
    return Math.max(mxx - mnx, mxy - mny);
}
function termsWithin(
    ordered: readonly Term[],
    full: [number, number][],
    span: number,
    pct: number,
): number {
    for (let n = 1; n <= ordered.length; n++) {
        let worst = 0;
        for (let i = 0; i < full.length; i++) {
            const [x, y] = evaluate(ordered, i / full.length, n);
            worst = Math.max(worst, Math.hypot(x - full[i][0], y - full[i][1]));
        }
        if (worst / span <= pct) return n;
    }
    return ordered.length;
}
