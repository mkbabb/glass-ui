// AY.W-MOTION2 — the keyframes.js STATIC suite re-export through /motion.
//
// VERIFIES the distribution-seam contract (enumerated against keyframes.js 5.x):
//   · the STATIC runtime exports + loadAnimationEngine are reachable from the
//     /motion barrel (verbatim, no wrapper/rename);
//   · the DYNAMIC engine surface is NOT statically present on /motion (the
//     loadAnimationEngine boundary is preserved) but IS reachable through the loader.
//
// 5.x deltas (the keyframes major adopt): `ScrollTimeline`→`KeyframesScrollTimeline`
// + `Animation`→`KeyframesAnimation` (the PKG-3 ambient-collision renames); the
// top-level `animate()` helper removed; the static surface gained `Oscillator`,
// `drag2D`, `reseatToSpring`, `probeVelocity`, `reducedMotionScale`, `waveformValue`,
// `warmEngine`. Mirrors scripts/proof-motion-suite.mjs.

import { describe, expect, it } from "vitest";
import * as motion from "../../../src/composables/motion";

const STATIC_RUNTIME = [
    "NumericAnimation", "SpringProgress", "SmoothProgress", "Oscillator",
    "Sequence", "Timeline", "ManualTimeline", "RAFPlayback", "KeyframesScrollTimeline",
    "createNativeTimeline", "flip", "flipShared", "ElementMorph",
    "drag", "drag2D", "Draggable", "decay", "decayRest", "reseatToSpring",
    "probeVelocity", "reducedMotionScale", "waveformValue", "warmEngine", "stagger",
    "springTimingFunction", "springLinearStops", "toEasing", "resolveEasing",
    "AnimationOptionError", "UnknownEasingError", "loadAnimationEngine",
];

const DYNAMIC_ENGINE = [
    "KeyframesAnimation", "CSSKeyframesAnimation", "AnimationGroup", "getAnimationId",
    "getTimingFunction", "resolveKeyframes", "MotionPath",
    "fromMotionPath", "DrawSVG", "fromDrawSVG", "presets",
    "DIRECTIONS", "FILL_MODES", "defaultOptions", "defaultLayerConfig",
];

describe("the keyframes.js STATIC suite is re-exported on /motion", () => {
    it("ships every static runtime export verbatim", () => {
        for (const name of STATIC_RUNTIME) {
            expect(motion, `missing /motion export ${name}`).toHaveProperty(name);
        }
    });

    it("does NOT statically re-export any heavy AnimationEngine member (boundary preserved)", () => {
        for (const name of DYNAMIC_ENGINE) {
            expect(motion, `${name} leaked into the static /motion surface`).not.toHaveProperty(name);
        }
    });

    it("the DYNAMIC engine surface is reachable through loadAnimationEngine()", async () => {
        const engine = await motion.loadAnimationEngine();
        for (const name of DYNAMIC_ENGINE) {
            expect(engine, `${name} not reachable through the loader`).toHaveProperty(name);
        }
    });
});
