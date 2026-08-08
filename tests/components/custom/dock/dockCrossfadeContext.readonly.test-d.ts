// Type-only negative fixture (zero-runtime) proving the dock
// crossfade context exposes its face-id refs as `Readonly<Ref<…>>`, so a `<DockLayer>`
// child (or the switcher) READS but never WRITES the crossfade-owned state (the ONE
// registry lives on the caller's `active` model).
//
// This fixture uses `expectTypeOf` ONLY — no `@ts-expect-error` directive — because
// `proof:strict-templates` forbids suppression directives anywhere in `src/`. The
// negative-write proof is a type-shape assertion: the context refs are `Readonly<Ref<…>>`
// and a WRITABLE `Ref<…>` is NOT assignable to them.
//
// Bite-check: relax `activeId`/`leavingId` back to a writable `Ref` in
// `dockCrossfadeContext.ts` → the `not.toEqualTypeOf` assertions below flip and
// `vue-tsc --noEmit` reddens.

import { describe, expectTypeOf, it } from "vitest";
import type { Ref } from "vue";
import type {
    DockCrossfadeContext,
    DockFaceDescriptor,
} from "@glass/components/dock/composables/dockCrossfadeContext";

type ActiveRef = DockCrossfadeContext["activeId"];
type LeavingRef = DockCrossfadeContext["leavingId"];
type FacesRef = DockCrossfadeContext["faces"];

describe("DockCrossfadeContext readonly guards (type-only)", () => {
    it("exposes the face-id + faces refs as Readonly<Ref<…>>", () => {
        expectTypeOf<ActiveRef>().toEqualTypeOf<Readonly<Ref<string>>>();
        expectTypeOf<LeavingRef>().toEqualTypeOf<Readonly<Ref<string | null>>>();
        expectTypeOf<FacesRef>().toEqualTypeOf<Readonly<Ref<DockFaceDescriptor[]>>>();
    });

    it("a child READ of the .value is allowed (the live <DockLayer> path)", () => {
        const ctx = {} as DockCrossfadeContext;
        expectTypeOf(ctx.activeId.value).toEqualTypeOf<string>();
        expectTypeOf(ctx.leavingId.value).toEqualTypeOf<string | null>();
    });

    it("a WRITABLE Ref is NOT assignable to the readonly context refs", () => {
        expectTypeOf<Ref<string>>().not.toEqualTypeOf<ActiveRef>();
        expectTypeOf<Ref<string | null>>().not.toEqualTypeOf<LeavingRef>();
    });
});
