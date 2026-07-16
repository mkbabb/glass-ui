import { afterEach, describe, expect, it, vi } from "vitest";
import {
    startViewTransition,
    supportsViewTransitions,
} from "@glass/composables/motion/core";

// happy-dom does not implement `document.startViewTransition`; we stub it on
// the global `document` to exercise the native path and `delete` it to exercise
// the instant fallback (the W5 hard-gate #4).

// Mutable view of `document` so the stub/delete dance type-checks (the lib DOM
// types do not carry `startViewTransition` on every target).
const docMut = document as unknown as { startViewTransition?: unknown };

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
        docMut.startViewTransition = (cb: () => void) => {
            cb();
            return { finished: Promise.resolve() };
        };

        const { finished } = startViewTransition(() => {});
        await expect(finished).resolves.toBeUndefined();
    });

    it("never rejects even when the native finished promise rejects", async () => {
        docMut.startViewTransition = (cb: () => void) => {
            cb();
            return { finished: Promise.reject(new Error("skipped")) };
        };

        const { finished } = startViewTransition(() => {});
        // The helper swallows rejection so a skipped/aborted transition still
        // lets a consumer `await finished` to route focus.
        await expect(finished).resolves.toBeUndefined();
    });

    it("keeps callback-only engines on the callback form when types are requested", () => {
        const supports = vi.spyOn(CSS, "supports").mockReturnValue(false);
        const native = vi.fn((arg: unknown) => {
            expect(typeof arg).toBe("function");
            (arg as () => void)();
            return { finished: Promise.resolve() };
        });
        docMut.startViewTransition = native;

        const mutate = vi.fn();
        const result = startViewTransition(mutate, { types: ["forward"] });

        expect(supports).toHaveBeenCalledWith(
            "selector(:active-view-transition-type(glass))",
        );
        expect(mutate).toHaveBeenCalledTimes(1);
        expect(result.transitioned).toBe(true);
    });

    it("uses the typed overload only when its selector capability is present", () => {
        vi.spyOn(CSS, "supports").mockReturnValue(true);
        docMut.startViewTransition = (arg: unknown) => {
            expect(arg).toMatchObject({ types: ["forward"] });
            (arg as { update: () => void }).update();
            return { finished: Promise.resolve() };
        };

        const mutate = vi.fn();
        const result = startViewTransition(mutate, { types: ["forward"] });

        expect(mutate).toHaveBeenCalledTimes(1);
        expect(result.transitioned).toBe(true);
    });

    it("falls back visibly when the native call throws before running its update", async () => {
        docMut.startViewTransition = () => {
            throw new TypeError("unsupported overload");
        };

        const mutate = vi.fn();
        const result = startViewTransition(mutate, { types: ["forward"] });
        await result.finished;

        expect(mutate).toHaveBeenCalledTimes(1);
        expect(result.transitioned).toBe(false);
    });
});

// ── BA.W-ATLAS-RECONCILE A-4b — async update + reduced-motion instant-path ────

/** Override `window.matchMedia` so `prefers-reduced-motion: reduce` reads as the
 *  given value (happy-dom defaults non-matching). Returns a restore fn. */
function stubReducedMotion(reduce: boolean): () => void {
    const original = window.matchMedia;
    window.matchMedia = ((query: string) => ({
        matches: reduce && query.includes("prefers-reduced-motion"),
        media: query,
        addEventListener: () => {},
        removeEventListener: () => {},
        addListener: () => {},
        removeListener: () => {},
        dispatchEvent: () => false,
        onchange: null,
    })) as unknown as typeof window.matchMedia;
    return () => {
        window.matchMedia = original;
    };
}

describe("startViewTransition — async update (A-4b)", () => {
    it("awaits a promise-returning mutate before finished resolves (fallback path)", async () => {
        delete docMut.startViewTransition;

        let done = false;
        const { finished } = startViewTransition(async () => {
            await Promise.resolve();
            done = true;
        });
        await finished;
        // The async update completed before `finished` settled.
        expect(done).toBe(true);
    });

    it("awaits the async update inside the native transition's update fn", async () => {
        let updateAwaited = false;
        // Native API that awaits the (async) update before resolving `finished`.
        docMut.startViewTransition = ((
            arg: (() => void | Promise<void>) | { update: () => void | Promise<void> },
        ) => {
            const update = typeof arg === "function" ? arg : arg.update;
            const ran = Promise.resolve(update());
            return { finished: ran };
        }) as unknown as typeof docMut.startViewTransition;

        const { finished, transitioned } = startViewTransition(async () => {
            await Promise.resolve();
            updateAwaited = true;
        });
        await finished;
        expect(transitioned).toBe(true);
        expect(updateAwaited).toBe(true);
    });
});

describe("startViewTransition — JS-level reduced-motion instant-path (A-4b)", () => {
    it("takes the only instant path under PRM without capturing a snapshot", async () => {
        const restore = stubReducedMotion(true);
        try {
            const native = vi.fn((cb: () => void) => {
                cb();
                return { finished: Promise.resolve() };
            });
            docMut.startViewTransition = native;

            const mutate = vi.fn();
            const result = startViewTransition(mutate);
            await result.finished;

            // The instant path ran mutate directly and NEVER called the native API.
            expect(mutate).toHaveBeenCalledTimes(1);
            expect(native).not.toHaveBeenCalled();
            expect(result.transitioned).toBe(false);
        } finally {
            restore();
        }
    });

});
