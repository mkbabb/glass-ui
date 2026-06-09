import { describe, expect, it } from "vitest";

import {
    detectPressForks,
    detectPressSpringRegister,
    detectRegisterAssignment,
    stripCssComments,
} from "../../scripts/proof-animation-coherence.mjs";

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
