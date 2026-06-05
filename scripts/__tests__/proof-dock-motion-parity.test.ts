// proof:dock-motion-parity — the gate that makes the AT.W6-dock-c VT/FLIP
// timing-parity invariant structural. The detector is exercised here through its
// FS-free entry `detectSource(sources)` over in-memory fixtures (the bite-tests,
// re-committed permanently), so a regression that re-forks the dock morph timing
// — or drops the runtime concurrency guard — now fails `npm test`, not just the
// standalone gate.
//
// Invariant (recap): the native View-Transition path
// (`::view-transition-group(.gl-dock-layer)` animation-timing-function) and the
// JS FLIP fallback (`--dock-motion-resize` easing) must consume ONE source curve
// (`--dock-resize-spring` = the iOS-springy `--spring-dock` linear(), AU.W8), so
// an identity dock layer-swap morph is timing-identical per engine. The divergent
// `--vt-ease` apple-spring overshoot must NOT drive the dock group. And the
// driver must carry the `morphGeneration` concurrency guard.

import { describe, expect, it } from "vitest";

import { detectSource } from "../proof-dock-motion-parity.mjs";

// The good substrate: VT + FLIP both on --dock-resize-spring; the token minted to
// the dock spring (AU.W8); the driver carrying the generation guard.
const GOOD = {
    vtCss: `
::view-transition-group(.gl-dock-layer) {
    animation-duration: var(--vt-duration, var(--duration-normal));
    animation-timing-function: var(--dock-resize-spring, var(--spring-dock));
}`,
    dockCss: `
:where(.glass-dock) {
    --dock-motion-resize: var(--duration-normal) var(--dock-resize-spring);
}`,
    tokensCss: `:root { --dock-resize-spring: var(--spring-dock); }`,
    dockVue: `
let morphGeneration = 0;
function markTransitioning() { const generation = ++morphGeneration; }
function onDockTransitionDone() { if (generation !== morphGeneration) return; morphGeneration++; }`,
};

describe("proof:dock-motion-parity — VT/FLIP timing-parity detector (AT.W6-dock-c)", () => {
    it("passes the good substrate (one source curve, both engines, guard present)", () => {
        const { facts, violations } = detectSource(GOOD);
        expect(violations).toHaveLength(0);
        expect(facts.parity).toBe(true);
        expect(facts.hasGenerationGuard).toBe(true);
    });

    it("FAILS when the VT path reverts to the divergent --vt-ease fork (the AQ.W6 bug)", () => {
        const { violations } = detectSource({
            ...GOOD,
            vtCss: GOOD.vtCss.replace(
                "var(--dock-resize-spring, var(--spring-dock))",
                "var(--vt-ease, var(--ease-apple-spring))",
            ),
        });
        expect(violations.length).toBeGreaterThan(0);
        expect(violations.join("\n")).toMatch(/--vt-ease|--dock-resize-spring/);
    });

    it("FAILS when --dock-motion-resize (FLIP) stops consuming the shared source", () => {
        const { violations } = detectSource({
            ...GOOD,
            dockCss: GOOD.dockCss.replace("var(--dock-resize-spring)", "var(--spring-snappy)"),
        });
        expect(violations.length).toBeGreaterThan(0);
    });

    it("FAILS when the source token is minted to the apple-spring overshoot", () => {
        const { violations } = detectSource({
            ...GOOD,
            tokensCss: `:root { --dock-resize-spring: var(--ease-apple-spring); }`,
        });
        expect(violations.length).toBeGreaterThan(0);
    });

    it("FAILS when the runtime driver drops the morph-generation concurrency guard", () => {
        const { facts, violations } = detectSource({
            ...GOOD,
            dockVue: GOOD.dockVue.replace(/morphGeneration/g, "xxx"),
        });
        expect(facts.hasGenerationGuard).toBe(false);
        expect(violations.join("\n")).toMatch(/morphGeneration/);
    });

    it("FAILS when the dock VT group rule is missing entirely", () => {
        const { violations } = detectSource({ ...GOOD, vtCss: "/* no dock group */" });
        expect(violations.length).toBeGreaterThan(0);
    });
});
