import { afterEach, describe, expect, it, vi } from "vitest";

import { moveBeforeSafe, supportsMoveBefore } from "@glass/utils/moveBefore";

// happy-dom does not implement `Element.moveBefore`; we stub it on the prototype
// to exercise the native path and `delete` it to exercise the `insertBefore`
// fallback (the AQ.W6 §Design 8 contract — atomic move when supported, plain
// re-parent otherwise).
const proto = Element.prototype as unknown as {
    moveBefore?: (node: Node, child: Node | null) => void;
};

afterEach(() => {
    vi.restoreAllMocks();
    delete proto.moveBefore;
});

describe("supportsMoveBefore", () => {
    it("is false when Element.moveBefore is absent", () => {
        delete proto.moveBefore;
        expect(supportsMoveBefore()).toBe(false);
    });

    it("is true when Element.moveBefore is present", () => {
        proto.moveBefore = function () {};
        expect(supportsMoveBefore()).toBe(true);
    });
});

describe("moveBeforeSafe — native path (API present)", () => {
    it("delegates to Element.moveBefore when available", () => {
        const native = vi.fn();
        proto.moveBefore = native;

        const parent = document.createElement("div");
        const node = document.createElement("span");
        const ref = document.createElement("span");

        moveBeforeSafe(parent, node, ref);

        expect(native).toHaveBeenCalledTimes(1);
        expect(native).toHaveBeenCalledWith(node, ref);
    });
});

describe("moveBeforeSafe — fallback path (API absent)", () => {
    it("inserts the node via insertBefore", () => {
        delete proto.moveBefore;

        const parent = document.createElement("div");
        const existing = document.createElement("span");
        const node = document.createElement("b");
        parent.appendChild(existing);

        moveBeforeSafe(parent, node, existing);

        // node landed immediately before `existing`.
        expect(parent.firstChild).toBe(node);
        expect(parent.lastChild).toBe(existing);
    });

    it("appends when ref is null", () => {
        delete proto.moveBefore;

        const parent = document.createElement("div");
        const existing = document.createElement("span");
        const node = document.createElement("b");
        parent.appendChild(existing);

        moveBeforeSafe(parent, node, null);

        expect(parent.lastChild).toBe(node);
    });
});
