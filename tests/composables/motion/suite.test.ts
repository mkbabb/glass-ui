// AY.W-MOTION2 — the keyframes.js STATIC suite re-export through /motion.
//
// VERIFIES the distribution-seam contract:
//   · the 24 STATIC runtime exports + loadAnimationEngine are reachable from the
//     /motion barrel (verbatim, no wrapper/rename);
//   · the DYNAMIC engine surface is NOT statically present on /motion (the
//     loadAnimationEngine boundary is preserved) but IS reachable through the loader.

import { describe, expect, it } from "vitest";
import * as motion from "../../../src/composables/motion";

const STATIC_RUNTIME = [
    "NumericAnimation", "SpringProgress", "SmoothProgress",
    "Sequence", "Timeline", "ManualTimeline", "RAFPlayback", "ScrollTimeline",
    "createNativeTimeline", "flip", "flipShared", "ElementMorph",
    "drag", "Draggable", "decay", "decayRest", "stagger",
    "springTimingFunction", "springLinearStops", "toEasing", "resolveEasing",
    "AnimationOptionError", "UnknownEasingError", "loadAnimationEngine",
];

const DYNAMIC_ENGINE = [
    "Animation", "CSSKeyframesAnimation", "AnimationGroup", "getAnimationId",
    "getTimingFunction", "resolveKeyframes", "animate", "MotionPath",
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
