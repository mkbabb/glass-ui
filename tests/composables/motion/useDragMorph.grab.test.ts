// U/B7d M3 repair 1 · O-4. A press on the grabbable indicator moves nothing, and a
// press and release in place leaves no gesture residue.
//
// Measured on /sci at 1440 with the owner's mouse path: re-clicking the active tab threw
// the indicator 635 px to the right in one frame, past the strip's end. The gesture's
// origin was read from the spring before the Draggable seated it at the pointer, so the
// first follow delta was the pointer's whole client coordinate. A release exactly on the
// snap centre then never emitted a settle, so in Chromium the offset stayed.
import { effectScope, nextTick, ref } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";
import { useDragMorph } from "@glass/composables/motion/morph/useDragMorph";

const REST_LEFT = 541;
const WIDTH = 190;
const CENTERS = { a: 636, b: 826, c: 1016 };

function fixture(
    centers = () => [
        { value: "a", center: CENTERS.a },
        { value: "b", center: CENTERS.b },
        { value: "c", center: CENTERS.c },
    ],
    moved = { by: 0 },
) {
    const el = document.createElement("div");
    document.body.appendChild(el);
    el.getBoundingClientRect = () => {
        const left = REST_LEFT + moved.by;
        return { left, top: 0, width: WIDTH, height: 34, right: left + WIDTH, bottom: 34, x: left, y: 0, toJSON: () => ({}) } as DOMRect;
    };
    const onSnap = vi.fn();
    const scope = effectScope();
    const drag = scope.run(() =>
        useDragMorph<string>({ handle: ref(el), axis: "x", snapTargets: centers, onSnap }),
    )!;
    return { el, onSnap, drag, stop: () => scope.stop() };
}

const event = (type: string, clientX: number) =>
    new PointerEvent(type, { bubbles: true, clientX, clientY: 17, pointerId: 1 });

const settle = async (ms = 700) => {
    await new Promise((r) => setTimeout(r, ms));
    await nextTick();
};

const translateX = (el: HTMLElement) => {
    const m = /translate\((-?[\d.]+)px/.exec(el.style.transform);
    return m ? Number(m[1]) : null;
};

afterEach(() => {
    document.body.innerHTML = "";
});

describe("useDragMorph: the grab", () => {
    it("does not move the surface on a press, wherever on it the press lands", () => {
        for (const x of [CENTERS.a, CENTERS.a + 40, CENTERS.a - 60]) {
            const { el, stop } = fixture();
            el.dispatchEvent(event("pointerdown", x));
            expect(translateX(el) ?? 0).toBe(0);
            el.dispatchEvent(event("pointerup", x));
            stop();
        }
    });

    it("leaves no offset after a press and release exactly on the active centre", async () => {
        const { el, onSnap, drag, stop } = fixture();
        el.dispatchEvent(event("pointerdown", CENTERS.a));
        el.dispatchEvent(event("pointerup", CENTERS.a));
        await settle(50);
        expect(el.style.transform).toBe("");
        expect(drag.dragging.value).toBe(false);
        expect(onSnap.mock.calls).toEqual([["a"]]);
        stop();
    });

    it("returns to the active centre after a press and release off centre", async () => {
        const { el, onSnap, stop } = fixture();
        el.dispatchEvent(event("pointerdown", CENTERS.a + 40));
        el.dispatchEvent(event("pointerup", CENTERS.a + 40));
        await settle();
        expect(el.style.transform).toBe("");
        expect(onSnap.mock.calls).toEqual([["a"]]);
        stop();
    });

    it("follows the pointer's displacement and lands the surface on the next centre", async () => {
        const { el, onSnap, stop } = fixture();
        el.dispatchEvent(event("pointerdown", CENTERS.a + 40));
        el.dispatchEvent(event("pointermove", CENTERS.a + 40 + 150));
        await settle(400);
        // The surface centre follows at the grab's own offset: it has moved by the
        // pointer's 150 px, not to the pointer's client coordinate.
        expect(translateX(el)).toBeCloseTo(150, 0);
        el.dispatchEvent(event("pointerup", CENTERS.a + 40 + 150));
        await settle();
        expect(onSnap.mock.calls).toEqual([["b"]]);
        stop();
    });

    it("reads the snap centres at the press, not when the handle was armed", async () => {
        const moved = { by: 0 };
        const { el, onSnap, stop } = fixture(
            () => [
                { value: "a", center: CENTERS.a + moved.by },
                { value: "b", center: CENTERS.b + moved.by },
            ],
            moved,
        );
        // The strip moved 400 px after arming (a resize, a re-flow). A click on the active
        // tab must not travel to where the tab used to be and select its neighbour.
        moved.by = -400;
        el.dispatchEvent(event("pointerdown", CENTERS.a + moved.by));
        el.dispatchEvent(event("pointerup", CENTERS.a + moved.by));
        await settle();
        expect(onSnap.mock.calls).toEqual([["a"]]);
        expect(el.style.transform).toBe("");
        stop();
    });
});
