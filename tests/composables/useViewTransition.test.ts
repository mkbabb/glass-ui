import { afterEach, describe, expect, it, vi } from "vitest";
import {
    startViewTransition,
    supportsViewTransitions,
} from "../../src/composables/motion/core";

// happy-dom does not implement `document.startViewTransition`; we stub it on
// the global `document` to exercise the native path and `delete` it to exercise
// the instant fallback (the W5 hard-gate #4).

// Mutable view of `document` so the stub/delete dance type-checks (the lib DOM
// types do not carry `startViewTransition` on every target).
const docMut = document as unknown as {
    startViewTransition?: (cb: () => void) => { finished: Promise<unknown> };
};

afterEach(() => {
    vi.restoreAllMocks();
    delete docMut.startViewTransition;
});

describe("supportsViewTransitions", () => {
    it("is false when document.startViewTransition is absent", () => {
        delete docMut.startViewTransition;
        expect(supportsViewTransitions()).toBe(false);
    });

    it("is true when document.startViewTransition is present", () => {
        docMut.startViewTransition = () => ({
            finished: Promise.resolve(),
        });
        expect(supportsViewTransitions()).toBe(true);
    });
});

describe("startViewTransition — fallback path (API absent)", () => {
    it("calls mutate synchronously and reports transitioned:false", () => {
        delete docMut.startViewTransition;

        const mutate = vi.fn();
        const result = startViewTransition(mutate);

        // Synchronous in the fallback path.
        expect(mutate).toHaveBeenCalledTimes(1);
        expect(result.transitioned).toBe(false);
    });

    it("returns an already-resolved finished promise", async () => {
        delete docMut.startViewTransition;

        const { finished } = startViewTransition(() => {});
        await expect(finished).resolves.toBeUndefined();
    });
});

describe("startViewTransition — native path (API present)", () => {
    it("calls mutate synchronously and reports transitioned:true", () => {
        const mutate = vi.fn();
        const native = vi.fn((cb: () => void) => {
            cb(); // the real API invokes the callback synchronously to snapshot
            return { finished: Promise.resolve() };
        });
        docMut.startViewTransition = native;

        const result = startViewTransition(mutate);

        expect(native).toHaveBeenCalledTimes(1);
        expect(mutate).toHaveBeenCalledTimes(1);
        expect(result.transitioned).toBe(true);
    });

    it("resolves finished when the native transition settles", async () => {
        docMut.startViewTransition = (
            cb: () => void,
        ) => {
            cb();
            return { finished: Promise.resolve() };
        };

        const { finished } = startViewTransition(() => {});
        await expect(finished).resolves.toBeUndefined();
    });

    it("never rejects even when the native finished promise rejects", async () => {
        docMut.startViewTransition = (
            cb: () => void,
        ) => {
            cb();
            return { finished: Promise.reject(new Error("skipped")) };
        };

        const { finished } = startViewTransition(() => {});
        // The helper swallows rejection so a skipped/aborted transition still
        // lets a consumer `await finished` to route focus.
        await expect(finished).resolves.toBeUndefined();
    });
});
