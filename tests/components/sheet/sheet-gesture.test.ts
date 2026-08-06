// G-SHEET-GESTURE — an arm of the MOTION seat G-SPRING-HONEST. No seat is minted: the
// invariant is "a spring's claims match what it does with the energy it is given", and
// this is the surface where the claim and the mechanism disagreed in shipped source.
//
// TWO CLAUSES, both from the spec, both with a mutation that bites:
//
//   (a) a release whose projected rest falls below the first rung's half-way point
//       reaches `0` — the dismiss. Born-RED on the shipped engine: its drag clamp was
//       `Math.max(ladder[0], …)`, so the position could never fall below the first
//       rung, and the branch that asked `target <= 0` was unreachable for BOTH shipped
//       ladders. A −7826 px/s downward fling left the sheet open at 0.25 and the comment
//       one line above the branch asserted the opposite. Mutation: re-floor the clamp at
//       `ladder[0]` → red.
//
//   (b) two releases from ONE rung whose velocities differ by ≥2× land on DIFFERENT
//       rungs when a boundary lies between their projected rests. Born-RED on the
//       shipped engine: `|v| >= DRAWER_FLING_VELOCITY` advanced exactly one index, so
//       1493 px/s and 625 px/s both landed on 0.7 — 2.4× of measured energy discarded.
//       Mutation: any fixed threshold → red.
//
// THE IMPORT IS THE BARREL, and that is deliberate. A dynamic import of a file that does
// not exist yet still fails vite's static analysis at TRANSFORM time, which is one load
// error and "no tests" — ABSENT under the ⊕²⁵ vocabulary, not RED. The barrel always
// resolves, so a tree without the engine yields a namespace without the symbols, and each
// clause reds on its own missing export.

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { describe, expect, it } from "vitest";
import * as SheetSurface from "@glass/components/sheet";
import { springPreset } from "@glass/composables/motion/spring/springPresets";

type ProjectionRow = {
    readonly response: number;
    readonly dampingFraction: number;
    readonly settleBand: number;
};
type ProjectionApi = {
    resolveRelease: (
        x: number,
        v: number,
        ladder: readonly number[],
        row: ProjectionRow,
    ) => number;
    projectRest: (x: number, v: number, row: ProjectionRow) => number;
    settleHorizon: (row: ProjectionRow) => number;
    throwDistance: (v: number, row: ProjectionRow) => number;
    springOmega: (response: number) => number;
};

/** The projection surface, asserted present INSIDE the clause that needs it. */
function projection(): ProjectionApi {
    const api = SheetSurface as unknown as Partial<ProjectionApi>;
    for (const name of [
        "resolveRelease",
        "projectRest",
        "settleHorizon",
        "throwDistance",
        "springOmega",
    ] as const) {
        expect(typeof api[name], `the sheet surface must export ${name}`).toBe(
            "function",
        );
    }
    return api as ProjectionApi;
}

/** The rung ladder the demo ships, and the one the born-RED figures were measured on. */
const LADDER = [0.25, 0.4, 0.7, 1] as const;
/** The rung leg's register, read from the canon rather than restated. */
const RUNG_ROW = () => springPreset("dock");

function source(rel: string): string {
    const path = join(process.cwd(), rel);
    expect(existsSync(path), `${rel} must exist`).toBe(true);
    return readFileSync(path, "utf8");
}

describe("gate:G-SHEET-GESTURE — the release integrates the energy it was given", () => {
    it("(a) a throw toward the closed edge reaches 0 and dismisses", () => {
        const { resolveRelease } = projection();
        // Released at the first rung, thrown toward closed hard enough that the
        // projected rest is nearer 0 than to the rung.
        expect(resolveRelease(LADDER[0], -4, LADDER, RUNG_ROW())).toBe(0);
    });

    it("(a) a settled release at a rung stays on that rung", () => {
        const { resolveRelease } = projection();
        for (const rung of LADDER) {
            expect(resolveRelease(rung, 0, LADDER, RUNG_ROW())).toBe(rung);
        }
    });

    it("(b) a 2× velocity separation lands on DIFFERENT rungs across a boundary", () => {
        const { resolveRelease, projectRest } = projection();
        const row = RUNG_ROW();
        const from = LADDER[0];
        const slow = 1;
        const fast = slow * 3;
        // The clause is only meaningful when a boundary lies between the two rests.
        expect(projectRest(from, fast, row)).toBeGreaterThan(
            projectRest(from, slow, row),
        );
        const slowLanded = resolveRelease(from, slow, LADDER, row);
        const fastLanded = resolveRelease(from, fast, LADDER, row);
        expect(fastLanded).not.toBe(slowLanded);
        expect(fastLanded).toBeGreaterThan(slowLanded);
    });

    it("(b) the projection is monotone in velocity — more energy never lands shorter", () => {
        const { projectRest } = projection();
        const row = RUNG_ROW();
        let previous = -Infinity;
        for (let v = 0; v <= 6; v += 0.25) {
            const rest = projectRest(0.25, v, row);
            expect(rest).toBeGreaterThan(previous);
            previous = rest;
        }
    });

    it("rides the REGISTER's own settle horizon — no coefficient of its own", () => {
        const { settleHorizon, throwDistance, springOmega } = projection();
        expect(springOmega(0.5)).toBeCloseTo((2 * Math.PI) / 0.5, 12);

        // The analytic ENVELOPE horizon against the EMITTED token — the generator's own
        // numeric solve of the same row, reached by a different route. They are checked
        // for AGREEMENT, not asserted identical: the emitted solve also requires the
        // velocity inside the band, so the two separate where a row is critically damped.
        // The engine rides `dock` and `bloom`, and it is those two that must agree.
        const css = source("src/styles/tokens/scheme-spring.css");
        for (const name of ["dock", "bloom"] as const) {
            const emitted = new RegExp(`--spring-${name}-settle:\\s*([\\d.]+)s`).exec(
                css,
            );
            expect(emitted, `--spring-${name}-settle must be emitted`).not.toBeNull();
            const published = Number.parseFloat(emitted![1]!);
            const analytic = settleHorizon(springPreset(name));
            expect(Math.abs(analytic - published) / published).toBeLessThan(0.1);
        }

        // A slower register carries a given throw further, and the throw is linear in
        // velocity — the row's own ratio, no curve of its own.
        const dock = RUNG_ROW();
        expect(throwDistance(1, springPreset("bloom"))).toBeGreaterThan(
            throwDistance(1, dock),
        );
        expect(throwDistance(2, dock)).toBeCloseTo(2 * throwDistance(1, dock), 12);
    });

    it("mints no velocity threshold and floors the drag clamp at ZERO", () => {
        const src = source("src/components/sheet/detents/use.ts");
        // No fling constant, and no register of its own — the engine names canon rows.
        expect(src).not.toMatch(/FLING|_VELOCITY\b/);
        expect(src).not.toMatch(/response:\s*0\.\d/);
        expect(src).toContain("springPreset(LEG_PRESET[next])");
        // The clamp's floor is 0, so the dismiss rung is reachable by drag alone.
        expect(src).toMatch(/Math\.max\(\s*0\s*,/);
        expect(src).not.toMatch(/Math\.max\(\s*(min|ladder\[0\])/);
    });

    it("resolves the release against the ladder EXTENDED with the dismissed rung", () => {
        const src = source("src/components/sheet/detents/projection.ts");
        expect(src).toMatch(/nearestRung\(\s*rest\s*,\s*\[\s*0\s*,\s*\.\.\.ladder\s*\]/);
    });
});
