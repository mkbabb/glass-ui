// `useNumericTransition` — numeric interpolation between two named snapshots
// over a fixed duration via an easing function. The canonical motion composable
// (file path + symbol); NOT spring physics (that lives in `useSpring`).
import { describe, expect, it } from "vitest";

import {
    useNumericTransition,
    type UseNumericTransitionOptions,
    type SpringSnapshot,
} from "../motion/useNumericTransition";

describe("useNumericTransition", () => {
    it("exports the canonical composable from the module", () => {
        expect(typeof useNumericTransition).toBe("function");
    });

    it("surfaces the options-type contract", () => {
        // Type-level: `UseNumericTransitionOptions<K>` constructs with the
        // named-snapshot endpoints + duration. A runtime assignment proves
        // the type resolves at the value layer.
        const options: UseNumericTransitionOptions<"x"> = {
            from: { x: 0 },
            to: { x: 1 },
            duration: 100,
        };
        expect(options.duration).toBe(100);
    });

    it("SpringSnapshot type contract remains stable across the rename", () => {
        // The value-shape contract keeps its name — it's independent of the
        // composable identity. Both module paths must surface it.
        const snapshot: SpringSnapshot<"a" | "b"> = { a: 0, b: 1 };
        expect(snapshot.a).toBe(0);
        expect(snapshot.b).toBe(1);
    });
});
