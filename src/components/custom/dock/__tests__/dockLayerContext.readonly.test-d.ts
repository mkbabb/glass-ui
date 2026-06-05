// AU.W8b.6 — type-only negative fixture (zero-runtime) proving the dock
// layer-context exposes its layer-id refs as `Readonly<Ref<…>>`, so a
// `<DockLayer>` child can READ but never WRITE the group-orchestrated state.
//
// This fixture uses `expectTypeOf` ONLY — no `@ts-expect-error` directive —
// because `proof:strict-templates` forbids suppression directives anywhere in
// `src/` (the idiomatic-root rule). The negative-write proof is expressed as a
// type-shape assertion: the context refs are `Readonly<Ref<…>>` and a WRITABLE
// `Ref<…>` is NOT assignable to them (so a `<DockLayer>` child cannot smuggle a
// writable ref in, and `.value =` is a compile error at the call site).
//
// Bite-check: relax `currentLayerId`/`leavingLayerId` back to a writable `Ref`
// in `dockLayerContext.ts` → the `not.toEqualTypeOf` / `not.toExtend`
// assertions below flip and `vue-tsc --noEmit` reddens.

import { describe, expectTypeOf, it } from "vitest";
import type { Ref } from "vue";
import type { DockLayerGroupContext } from "../composables/dockLayerContext";

type CurrentRef = DockLayerGroupContext["currentLayerId"];
type LeavingRef = DockLayerGroupContext["leavingLayerId"];

describe("DockLayerGroupContext readonly guards (type-only)", () => {
    it("exposes the layer-id refs as Readonly<Ref<…>>", () => {
        expectTypeOf<CurrentRef>().toEqualTypeOf<Readonly<Ref<string>>>();
        expectTypeOf<LeavingRef>().toEqualTypeOf<Readonly<Ref<string | null>>>();
    });

    it("a child READ of the .value is allowed (the live <DockLayer> path)", () => {
        const ctx = {} as DockLayerGroupContext;
        expectTypeOf(ctx.currentLayerId.value).toEqualTypeOf<string>();
        expectTypeOf(ctx.leavingLayerId.value).toEqualTypeOf<string | null>();
    });

    it("a WRITABLE Ref is NOT assignable to the readonly context refs", () => {
        // The negative half: a child cannot provide/assign a writable ref where
        // the context demands a readonly one — proving the group's writable
        // state is never leaked as writable.
        expectTypeOf<Ref<string>>().not.toEqualTypeOf<CurrentRef>();
        expectTypeOf<Ref<string | null>>().not.toEqualTypeOf<LeavingRef>();
    });
});
