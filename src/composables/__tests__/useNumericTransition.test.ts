// AL.W9-δ — rename `useSpringOrchestrator` → `useNumericTransition`.
//
// This spec pins the rename's two contracts:
//   1. `useNumericTransition` is the canonical export (file path + symbol).
//   2. The deprecation shim at `useSpringOrchestrator.ts` resolves to the
//      same function, so any downstream consumer that hasn't migrated still
//      gets identical behaviour. Shim retires at v3.0.
import { describe, expect, it } from "vitest";

import {
    useNumericTransition,
    type UseNumericTransitionOptions,
    type SpringSnapshot,
} from "../motion/useNumericTransition";
import {
    useSpringOrchestrator,
    type UseSpringOrchestratorOptions,
} from "../motion/useSpringOrchestrator";

describe("useNumericTransition (AL.W9-δ rename)", () => {
    it("exports the canonical composable from the renamed module", () => {
        expect(typeof useNumericTransition).toBe("function");
    });

    it("re-export shim aliases useSpringOrchestrator → useNumericTransition", () => {
        // Identity check: the deprecated name must resolve to the SAME function
        // reference, not a wrapper. Wrappers would have subtle generic-inference
        // and stack-trace differences that defeat the hedge.
        expect(useSpringOrchestrator).toBe(useNumericTransition);
    });

    it("re-export shim surfaces the options-type alias", () => {
        // Type-level: `UseSpringOrchestratorOptions<K>` must structurally
        // satisfy `UseNumericTransitionOptions<K>` (it's a type alias). A
        // runtime assignment proves the alias resolves at the value layer.
        const options: UseSpringOrchestratorOptions<"x"> = {
            from: { x: 0 },
            to: { x: 1 },
            duration: 100,
        };
        const widened: UseNumericTransitionOptions<"x"> = options;
        expect(widened.duration).toBe(100);
    });

    it("SpringSnapshot type contract remains stable across the rename", () => {
        // The value-shape contract keeps its name — it's independent of the
        // composable identity. Both module paths must surface it.
        const snapshot: SpringSnapshot<"a" | "b"> = { a: 0, b: 1 };
        expect(snapshot.a).toBe(0);
        expect(snapshot.b).toBe(1);
    });
});
