// authored/test-home-imports.mjs — AUTHORED input to derive/edits.mjs (step S22; R-3, LAW §5
// "tests read their home", FD-2).
//
// Eight single-subject motion tests read their subject through a PARENT's door (`./motion`
// or `./motion-core`, both doors of `src/composables/motion`). Colocated in the subject's
// module (spring, core, route), a read of the parent's door would make the child unit and
// the parent co-cyclic at unit grain (the parent's door re-exports the child), and FD-2
// refuses the move. A test in M/__tests__/ reads M's subtree directly (LAW §5), so each
// import is re-pointed at the file that declares the names: the same symbols (resolution
// preserving, FD-5 re-point), and the test then moves in S23 with no unit cycle.

export const why = "R-3 / FD-2: eight motion tests read their subject from its own module, not the parent's door, so they can colocate without a unit cycle";

const re = (file, from, to) => ({ file, why: "re-point to the declaring file in the test's home (same symbols)", from, to });

export const edits = [
    re("tests/composables/motion/press.test.ts", `import { useLiquidPress } from "@glass/composables/motion";`, `import { useLiquidPress } from "@glass/composables/motion/spring/useLiquidPress";`),
    re("tests/composables/useIntersectionPause.test.ts", `import { useIntersectionPause } from "@glass/composables/motion/motion-core";`, `import { useIntersectionPause } from "@glass/composables/motion/core/useIntersectionPause";`),
    re("tests/composables/useRAFLoop.test.ts", `import { useRAFLoop, type RAFLoopControls } from "@glass/composables/motion/motion-core";`, `import { useRAFLoop, type RAFLoopControls } from "@glass/composables/motion/core/useRAFLoop";`),
    re("tests/composables/useRouteTransition.test.ts", `} from "@glass/composables/motion/motion-core";`, `} from "@glass/composables/motion/route/useRouteTransition";`),
    re("tests/composables/useSpring.test.ts", `import { useSpring } from "@glass/composables/motion";`, `import { useSpring } from "@glass/composables/motion/spring/useSpring";`),
    re("tests/composables/useSpringMount.test.ts", `import { useSpringMount, type SpringMountRef } from "@glass/composables/motion";`, `import { useSpringMount, type SpringMountRef } from "@glass/composables/motion/spring/useSpringMount";`),
    re("tests/composables/useViewTransition.test.ts", `} from "@glass/composables/motion/motion-core";`, `} from "@glass/composables/motion/core/useViewTransition";`),
    re("tests/composables/useYieldToMain.test.ts", `} from "@glass/composables/motion/motion-core";`, `} from "@glass/composables/motion/core/useYieldToMain";`),
];
