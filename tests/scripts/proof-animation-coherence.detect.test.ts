import { describe, expect, it } from "vitest";

import {
    detectAnimationEnterRegister,
    detectDurationBand,
    detectEasingTableBound,
    detectPressForks,
    detectPressSpringRegister,
    detectRegisterAssignment,
    loadMotionCurveTokens,
    stripCssComments,
} from "../../scripts/proof-animation-coherence.mjs";
import { readFileSync } from "node:fs";
import { resolve } from "node:path";

/**
 * AY.W-MOTION — the pure-detector units for the §6 REGISTER-ASSIGNMENT arm of
 * proof:animation-coherence.
 *
 * The gate's SOURCE arm is the born-RED→GREEN canary the orchestrator verifies
 * device-free. These units lock the new register-assignment detector so its
 * failure paths cannot regress to false-GREEN: a synthetic OFF-REGISTER fixture
 * (a surface prop transitioning on a `--spring-*`, AND a HOVER/PRESS transform on
 * `--spring-bouncy`) MUST trip both findings; a GREEN fixture (the doctrine-true
 * shape — surface→bezier, press→smooth, ENTER→spring) passes clean. The
 * role-classifier (enter vs press vs exit) + the comment-strip have their own
 * edge units, and the press-spring composite-token check (D1) is proven.
 */

// ── The synthetic OFF-REGISTER fixture (the born-RED witness) ────────────────
// A fake glass surface that violates §6 on BOTH legs the spec names:
//   (1) a SURFACE prop (`color`) transitions on `--spring-bouncy` (a spring on a
//       colour cross-fade reads as a wobble — must be --ease-standard);
//   (2) a HOVER/PRESS TRANSFORM (`transform` in a `:active` rule) presses on
//       `--spring-bouncy` (a press must be --spring-smooth/--spring-snappy).
const OFF_REGISTER_CSS = `
.fake-glass-surface {
    color: var(--foreground);
    transition: color 200ms var(--spring-bouncy);
}
.fake-glass-surface:active {
    transition: transform var(--duration-fast) var(--spring-bouncy);
}
`;

// ── The GREEN (doctrine-true) fixture ────────────────────────────────────────
// Surface→bezier, press→smooth, ENTER→spring (the §6 enter row), MORPH→dock.
const ON_REGISTER_CSS = `
.true-glass-surface {
    transition:
        background var(--duration-fast) var(--ease-standard),
        color var(--duration-fast) var(--ease-standard);
}
.true-glass-surface:active {
    transition: transform var(--duration-fast) var(--spring-smooth);
}
.true-dialog-enter-active {
    transition: transform var(--duration-slow) var(--spring-bouncy);
}
.true-dock-shell {
    transition: width var(--duration-normal) var(--spring-dock);
}
`;

describe("detectRegisterAssignment — the §6 register-assignment bite", () => {
    it("REDs on the synthetic off-register fixture (surface-on-spring + press-on-bouncy)", () => {
        const v = detectRegisterAssignment("fixture.css", OFF_REGISTER_CSS);
        expect(v).toHaveLength(2);
        // (1) the surface-on-spring witness
        expect(v.some((w) => /surface prop 'color'/.test(w) && /wobble/.test(w))).toBe(
            true,
        );
        // (2) the transform-press-on-bouncy witness
        expect(
            v.some((w) => /transform prop 'transform' presses on '--spring-bouncy'/.test(w)),
        ).toBe(true);
    });

    it("GREENs on the doctrine-true fixture (surface→bezier, press→smooth, enter→spring, morph→dock)", () => {
        expect(detectRegisterAssignment("fixture.css", ON_REGISTER_CSS)).toEqual([]);
    });

    it("does NOT flag an ENTER transform on --spring-bouncy (the §6 enter register)", () => {
        const css = `.x-enter-active { transition: transform var(--duration-slow) var(--spring-bouncy); }`;
        expect(detectRegisterAssignment("e.css", css)).toEqual([]);
    });

    it("DOES flag an EXIT transform on a spring (an exit must never overshoot past gone)", () => {
        const css = `.x-leave-active { transition: transform var(--duration-normal) var(--spring-bouncy); }`;
        const v = detectRegisterAssignment("x.css", css);
        expect(v).toHaveLength(1);
        expect(v[0]).toMatch(/EXITS on '--spring-bouncy'/);
    });

    it("does NOT flag a MORPH (width) leg on --spring-dock (the dock enter-class size register)", () => {
        const css = `.dock { transition: width var(--duration-normal) var(--spring-dock); }`;
        expect(detectRegisterAssignment("d.css", css)).toEqual([]);
    });

    it("ignores a commented-out off-register fork (false-witness discipline)", () => {
        const css = `/* transition: color 200ms var(--spring-bouncy); */ .x { color: red; }`;
        expect(detectRegisterAssignment("c.css", css)).toEqual([]);
    });
});

describe("detectPressSpringRegister — the D1 composite-token bite", () => {
    it("REDs on a non-allowlisted press-spring token naming --spring-bouncy", () => {
        const css = `:root { --widget-press-spring: var(--duration-fast) var(--spring-bouncy); }`;
        const v = detectPressSpringRegister("tokens.css", css);
        expect(v).toHaveLength(1);
        expect(v[0]).toMatch(/press-spring token '--widget-press-spring' resolves '--spring-bouncy'/);
    });

    it("GREENs on a press-spring token naming --spring-smooth", () => {
        const css = `:root { --widget-press-spring: var(--duration-fast) var(--spring-smooth); }`;
        expect(detectPressSpringRegister("tokens.css", css)).toEqual([]);
    });

    it("EXEMPTS --dock-press-spring (the W-DOCK2 verify-not-edit bridge)", () => {
        const css = `:root { --dock-press-spring: var(--duration-fast) var(--spring-bouncy); }`;
        expect(detectPressSpringRegister("tokens.css", css)).toEqual([]);
    });
});

describe("detectPressForks — keyframe/transition waypoints are NOT presses", () => {
    it("does NOT flag a scale literal inside an @keyframes block (an enter waypoint)", () => {
        const css = `@keyframes pop-in { from { transform: scale(0.95); } to { transform: scale(1); } }`;
        expect(detectPressForks("anim.css", css)).toEqual([]);
    });

    it("does NOT flag a scale literal in a Vue-transition enter/leave state", () => {
        const css = `.x-enter-from { transform: scale(0.9); } .x-leave-to { transform: scale(0.95); }`;
        expect(detectPressForks("t.css", css)).toEqual([]);
    });

    it("DOES flag a literal press scale in an :active recipe", () => {
        const css = `.btn:active { scale: 0.9; }`;
        const v = detectPressForks("b.css", css);
        expect(v).toHaveLength(1);
        expect(v[0]).toMatch(/literal press scale '0.9'/);
    });
});

describe("stripCssComments — offset-preserving false-witness strip", () => {
    it("blanks a block comment to spaces, preserving newline offsets", () => {
        const out = stripCssComments("a/* x\ny */b");
        // The comment spans both lines; everything but `a`, the newline, and `b`
        // blanks to spaces (offsets preserved): `/* x`→4sp, `y */`→4sp.
        expect(out).toBe("a    \n    b");
    });
});

// ── AY.W-ANIM1 — the three GATE-EXTENDED arms (born-RED-able fixtures) ─────────

describe("detectEasingTableBound — the §P4 curve-table-bound bite", () => {
    const ROOT = resolve(import.meta.dirname, "../..");
    const read = (f: string) => readFileSync(resolve(ROOT, f), "utf8");
    const curveTokens = loadMotionCurveTokens(read);

    it("loads the real MOTION_CURVES keyset (the charted curve vocabulary)", () => {
        // The five springs + the bezier cores + the aliases — at least the five
        // springs and the standard core MUST be present (drift-proof against the
        // source reader regressing to empty).
        expect(curveTokens.has("--spring-snappy")).toBe(true);
        expect(curveTokens.has("--spring-smooth")).toBe(true);
        expect(curveTokens.has("--motion-ease-standard")).toBe(true);
        expect(curveTokens.size).toBeGreaterThanOrEqual(10);
    });

    it("REDs on a leg naming a curve token with NO MOTION_CURVES row (table drift)", () => {
        const css = `.x { transition: transform var(--duration-fast) var(--spring-fictional); }`;
        const v = detectEasingTableBound("f.css", css, curveTokens);
        expect(v).toHaveLength(1);
        expect(v[0]).toMatch(/'--spring-fictional' which has NO MOTION_CURVES row/);
    });

    it("GREENs on a leg naming a charted token", () => {
        const css = `.x { transition: transform var(--duration-fast) var(--spring-snappy); }`;
        expect(detectEasingTableBound("g.css", css, curveTokens)).toEqual([]);
    });

    it("does NOT grade a non-curve var (a --duration-*/--scale-* is not a curve token)", () => {
        const css = `.x { transition: transform var(--duration-fast) var(--spring-smooth); }`;
        expect(detectEasingTableBound("g.css", css, curveTokens)).toEqual([]);
    });
});

describe("detectDurationBand — the §P5 duration-band bite", () => {
    it("REDs on an orphan literal duration on a transition leg", () => {
        const css = `.x { transition: color 220ms var(--ease-standard); }`;
        const v = detectDurationBand("f.css", css);
        expect(v).toHaveLength(1);
        expect(v[0]).toMatch(/orphan literal duration '220ms'/);
    });

    it("GREENs on a composed --duration-* token", () => {
        const css = `.x { transition: color var(--duration-fast) var(--ease-standard); }`;
        expect(detectDurationBand("g.css", css)).toEqual([]);
    });

    it("does NOT flag a var(--token, FALLBACK) fallback literal (the token IS composed)", () => {
        const css = `.x { transition: color var(--duration-fast, 150ms) var(--ease-standard, ease-out); }`;
        expect(detectDurationBand("g.css", css)).toEqual([]);
    });

    it("does NOT flag a `0s` transition-off / PRM-collapse value", () => {
        const css = `.x { transition: color 0s var(--ease-standard); }`;
        expect(detectDurationBand("g.css", css)).toEqual([]);
    });

    it("does NOT flag an @keyframes-driven animation: PERIOD (out of fence — the continuous cadence)", () => {
        const css = `.x { animation: shimmer 6s linear infinite; }`;
        expect(detectDurationBand("g.css", css)).toEqual([]);
    });
});

describe("detectAnimationEnterRegister — the §P4 blind-spot closure", () => {
    it("REDs on a one-shot mount enter that hand-rolls a raw bezier", () => {
        const css = `.x { animation: my-enter 0.3s cubic-bezier(0.4, 0, 0.2, 1) forwards; }`;
        const v = detectAnimationEnterRegister("f.css", css);
        expect(v).toHaveLength(1);
        expect(v[0]).toMatch(/names a RAW timing 'cubic-bezier\(/);
    });

    it("REDs on a one-shot mount enter that hand-rolls `ease`", () => {
        const css = `.x { animation: my-enter 0.3s ease forwards; }`;
        const v = detectAnimationEnterRegister("f.css", css);
        expect(v).toHaveLength(1);
        expect(v[0]).toMatch(/names a RAW timing 'ease'/);
    });

    it("GREENs on an enter riding the §6 spring register (var(--spring-*))", () => {
        const css = `.x { animation: my-enter var(--duration-slow) var(--spring-bouncy) forwards; }`;
        expect(detectAnimationEnterRegister("g.css", css)).toEqual([]);
    });

    it("does NOT flag a tw-animate delegated enter (reka data-state choreography)", () => {
        const css = `.x { animation: enter 0.3s ease; }`;
        expect(detectAnimationEnterRegister("g.css", css)).toEqual([]);
    });

    it("does NOT flag a CONTINUOUS infinite loop (spinner/shimmer is not an enter)", () => {
        const css = `.x { animation: spin 1s linear infinite; }`;
        expect(detectAnimationEnterRegister("g.css", css)).toEqual([]);
    });

    it("does NOT flag a SCROLL-DRIVEN position-map (`linear` is required on a timeline)", () => {
        const css = `.x { animation: gl-reveal-in auto linear both; }`;
        expect(detectAnimationEnterRegister("g.css", css)).toEqual([]);
    });

    it("does NOT false-fire on a var token NAME's `ease` substring (--motion-ease-standard)", () => {
        // The `ease` inside `--motion-ease-standard` is a TOKEN name, not a raw
        // hand-roll — the var-blanking pass must not match it.
        const css = `.x { animation: pulse var(--motion-duration-x, 220ms) var(--motion-ease-standard, ease-out) 1; }`;
        expect(detectAnimationEnterRegister("g.css", css)).toEqual([]);
    });
});
