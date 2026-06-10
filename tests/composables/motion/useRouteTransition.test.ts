import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import {
    supportsRouteTransitions,
    useRouteTransition,
} from "../../../src/composables/motion/useRouteTransition";

// useRouteTransition is dependency-free (no vue), so it is exercised by calling it
// directly — no component mount needed. The two environment seams it reads are
// `document.startViewTransition` (the native VT API) and
// `window.matchMedia("(prefers-reduced-motion: reduce)")` (the PRM fence); both
// are STUBBED per test so the helper's three paths (native / unsupported / PRM)
// are each driven deterministically.

type VtCallbackOrOptions =
    | (() => void | Promise<void>)
    | { update: () => void | Promise<void>; types?: string[] };

interface StubVt {
    finished: Promise<void>;
    ready: Promise<void>;
}

/** Install a stub `document.startViewTransition` that RUNS the update callback
 *  synchronously (mirroring the native contract: the DOM mutation happens inside
 *  the transition) and records the args it was called with. */
function installStartViewTransition(): {
    calls: { hasOptions: boolean; types?: string[] }[];
    uninstall: () => void;
} {
    const calls: { hasOptions: boolean; types?: string[] }[] = [];
    const fn = (cb: VtCallbackOrOptions): StubVt => {
        if (typeof cb === "function") {
            calls.push({ hasOptions: false });
            void cb();
        } else {
            calls.push({ hasOptions: true, types: cb.types });
            void cb.update();
        }
        return { finished: Promise.resolve(), ready: Promise.resolve() };
    };
    (document as unknown as { startViewTransition?: unknown }).startViewTransition =
        fn;
    return {
        calls,
        uninstall: () => {
            delete (document as unknown as { startViewTransition?: unknown })
                .startViewTransition;
        },
    };
}

/** Stub `window.matchMedia` so the PRM query returns `reduce`. */
function setReducedMotion(reduce: boolean): void {
    window.matchMedia = ((query: string) => ({
        matches: reduce && query.includes("reduce"),
        media: query,
        addEventListener() {},
        removeEventListener() {},
        addListener() {},
        removeListener() {},
        onchange: null,
        dispatchEvent() {
            return false;
        },
    })) as unknown as typeof window.matchMedia;
}

describe("useRouteTransition", () => {
    afterEach(() => {
        delete (document as unknown as { startViewTransition?: unknown })
            .startViewTransition;
        vi.unstubAllGlobals();
    });

    describe("feature detection", () => {
        it("supportsRouteTransitions reflects document.startViewTransition presence", () => {
            expect(supportsRouteTransitions()).toBe(false);
            const { uninstall } = installStartViewTransition();
            expect(supportsRouteTransitions()).toBe(true);
            uninstall();
            expect(supportsRouteTransitions()).toBe(false);
        });

        it("the returned `supported` mirrors the detector", () => {
            const { uninstall } = installStartViewTransition();
            expect(useRouteTransition().supported).toBe(true);
            uninstall();
            expect(useRouteTransition().supported).toBe(false);
        });
    });

    describe("unsupported engine — instant fallback (information parity)", () => {
        beforeEach(() => setReducedMotion(false));

        it("runs the navigation directly and reports transitioned: false", async () => {
            const { navigate } = useRouteTransition();
            const nav = vi.fn();
            const { finished, transitioned } = navigate(nav);
            expect(transitioned).toBe(false);
            await finished;
            // The navigation ALWAYS runs — the route changes even with no VT.
            expect(nav).toHaveBeenCalledTimes(1);
        });

        it("awaits an ASYNC navigation in the fallback path", async () => {
            const { navigate } = useRouteTransition();
            let resolved = false;
            const nav = () =>
                new Promise<void>((r) =>
                    setTimeout(() => {
                        resolved = true;
                        r();
                    }, 0),
                );
            await navigate(nav).finished;
            expect(resolved).toBe(true);
        });

        it("`finished` never rejects even when the navigation throws", async () => {
            const { navigate } = useRouteTransition();
            const nav = () => {
                throw new Error("nav boom");
            };
            // Must settle, not reject — the helper swallows so a focus-routing
            // `await navigate(...).finished` never crashes the caller.
            await expect(navigate(nav).finished).resolves.toBeUndefined();
        });
    });

    describe("reduced-motion — PRM fence", () => {
        it("takes the instant path under PRM even when the VT API exists", async () => {
            const { calls, uninstall } = installStartViewTransition();
            setReducedMotion(true);
            const { navigate } = useRouteTransition();
            const nav = vi.fn();
            const { transitioned, finished } = navigate(nav);
            await finished;
            // No snapshot captured (PRM), but the navigation still ran.
            expect(transitioned).toBe(false);
            expect(calls).toHaveLength(0);
            expect(nav).toHaveBeenCalledTimes(1);
            uninstall();
        });
    });

    describe("native path — the morph", () => {
        beforeEach(() => setReducedMotion(false));

        it("wraps the navigation in startViewTransition and reports transitioned: true", async () => {
            const { calls, uninstall } = installStartViewTransition();
            const { navigate } = useRouteTransition();
            const nav = vi.fn();
            const { transitioned, finished } = navigate(nav);
            await finished;
            expect(transitioned).toBe(true);
            expect(nav).toHaveBeenCalledTimes(1);
            // The plain (callback) overload — no `types` passed.
            expect(calls).toEqual([{ hasOptions: false }]);
            uninstall();
        });

        it("passes directional `types` through the object overload", async () => {
            const { calls, uninstall } = installStartViewTransition();
            const { navigate } = useRouteTransition();
            await navigate(() => {}, { types: ["forward"] }).finished;
            expect(calls).toEqual([{ hasOptions: true, types: ["forward"] }]);
            uninstall();
        });

        it("uses the plain overload when `types` is empty", async () => {
            const { calls, uninstall } = installStartViewTransition();
            const { navigate } = useRouteTransition();
            await navigate(() => {}, { types: [] }).finished;
            expect(calls).toEqual([{ hasOptions: false }]);
            uninstall();
        });

        it("runs the async navigation INSIDE the transition update", async () => {
            const { uninstall } = installStartViewTransition();
            const { navigate } = useRouteTransition();
            let ran = false;
            await navigate(() => {
                ran = true;
            }).finished;
            expect(ran).toBe(true);
            uninstall();
        });
    });
});
