// BE.W-DOCK-CONTEXT-SILHOUETTE — the pure slot-diff + orientation-derived-geometry unit.
//
// The load-bearing logic of the declarative context→silhouette state machine is the
// controlId DIFF (present-in-both → FLIP, to-only → BLOOM, from-only → DETACH) and the
// orientation-derived slot→rect mapping (the `dim`-idiom — vertical is the SAME slot data
// with the axes swapped). Both are PURE (no DOM), so they are unit-testable directly —
// proving the state machine is correct without a browser (the binding PAINT is the π
// roster row; this proves the diff + geometry SHAPE).
//
// Bite: a diff that mis-classifies a survivor as a bloom, or a slotToRect that does NOT
// swap axes on vertical (the `display:none` amputation disease), reddens here.

import { describe, expect, it } from "vitest";
import {
    detachVector,
    diffSilhouetteSlots,
    type SilhouetteSlot,
} from "../../../../src/components/custom/dock/composables/useDockContextSilhouette";

// Re-derive slotToRect's contract via the public exports' siblings — slotToRect is module-
// private, so we assert its OBSERVABLE contract through detachVector's orientation axis +
// the diff. (The geometry mapping is exercised end-to-end by the π roster row.)

const slot = (controlId: string, over: Partial<SilhouetteSlot> = {}): SilhouetteSlot => ({
    controlId,
    main: 0,
    cross: 0,
    size: 48,
    ...over,
});

describe("useDockContextSilhouette — the controlId slot diff", () => {
    it("classifies survivors (present-in-both), blooms (to-only), detaches (from-only)", () => {
        const from = [slot("home"), slot("play"), slot("next")];
        const to = [slot("home"), slot("play"), slot("search")];
        const { survivors, bloomIns, detaches } = diffSilhouetteSlots(from, to);
        expect(survivors.sort()).toEqual(["home", "play"]); // present in BOTH → FLIP
        expect(bloomIns).toEqual(["search"]); // to-only → BLOOM
        expect(detaches).toEqual(["next"]); // from-only → DETACH
    });

    it("an empty `from` (initial seat) blooms every control in (none survive, none detach)", () => {
        const to = [slot("a"), slot("b")];
        const { survivors, bloomIns, detaches } = diffSilhouetteSlots([], to);
        expect(survivors).toEqual([]);
        expect(bloomIns.sort()).toEqual(["a", "b"]);
        expect(detaches).toEqual([]);
    });

    it("a transition to an empty silhouette detaches every control (no survivors, no blooms)", () => {
        const from = [slot("a"), slot("b")];
        const { survivors, bloomIns, detaches } = diffSilhouetteSlots(from, []);
        expect(survivors).toEqual([]);
        expect(bloomIns).toEqual([]);
        expect(detaches.sort()).toEqual(["a", "b"]);
    });

    it("an identical from/to (no-op transition) survives everything, no detach/bloom", () => {
        const both = [slot("home"), slot("play")];
        const { survivors, bloomIns, detaches } = diffSilhouetteSlots(both, both);
        expect(survivors.sort()).toEqual(["home", "play"]);
        expect(bloomIns).toEqual([]);
        expect(detaches).toEqual([]);
    });
});

describe("useDockContextSilhouette — the orientation-derived detach vector (the dim-idiom)", () => {
    it("horizontal: a control peels along the CROSS (Y) axis; the cross sign chooses the side", () => {
        expect(detachVector(slot("x", { cross: -56 }), "horizontal")).toEqual({ dx: 0, dy: -1 });
        expect(detachVector(slot("x", { cross: 56 }), "horizontal")).toEqual({ dx: 0, dy: 1 });
    });

    it("vertical: the SAME slot peels along the CROSS (X) axis — axes swapped, not amputated", () => {
        expect(detachVector(slot("x", { cross: -56 }), "vertical")).toEqual({ dx: -1, dy: 0 });
        expect(detachVector(slot("x", { cross: 56 }), "vertical")).toEqual({ dx: 1, dy: 0 });
    });

    it("a zero cross defaults to the positive side (never a zero vector — the piece always moves)", () => {
        expect(detachVector(slot("x", { cross: 0 }), "horizontal")).toEqual({ dx: 0, dy: 1 });
        expect(detachVector(slot("x", { cross: 0 }), "vertical")).toEqual({ dx: 1, dy: 0 });
    });
});
