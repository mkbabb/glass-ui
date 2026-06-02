import { afterEach, describe, expect, it, vi } from "vitest";
import {
    useYieldToMain,
    yieldToMain,
} from "../motion/core";

describe("yieldToMain", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("uses native scheduler.yield when available", async () => {
        const nativeYield = vi.fn(() => Promise.resolve());
        vi.stubGlobal("scheduler", { yield: nativeYield });

        await yieldToMain();

        expect(nativeYield).toHaveBeenCalledTimes(1);
    });

    it("falls back to a MessageChannel macrotask when scheduler.yield is absent", async () => {
        vi.stubGlobal("scheduler", undefined);
        // happy-dom provides MessageChannel; the fallback resolves on the next
        // macrotask tick.
        expect(typeof MessageChannel).toBe("function");

        let resolved = false;
        const p = yieldToMain().then(() => {
            resolved = true;
        });
        // Not yet resolved synchronously.
        expect(resolved).toBe(false);
        await p;
        expect(resolved).toBe(true);
    });

    it("falls back to setTimeout(0) when MessageChannel is also absent", async () => {
        vi.stubGlobal("scheduler", undefined);
        vi.stubGlobal("MessageChannel", undefined);

        await expect(yieldToMain()).resolves.toBeUndefined();
    });
});

describe("useYieldToMain", () => {
    afterEach(() => {
        vi.unstubAllGlobals();
        vi.restoreAllMocks();
    });

    it("reports hasNativeYield from the platform", () => {
        vi.stubGlobal("scheduler", { yield: () => Promise.resolve() });
        expect(useYieldToMain().hasNativeYield).toBe(true);

        vi.stubGlobal("scheduler", undefined);
        expect(useYieldToMain().hasNativeYield).toBe(false);
    });

    it("exposes the bound yield function", async () => {
        const nativeYield = vi.fn(() => Promise.resolve());
        vi.stubGlobal("scheduler", { yield: nativeYield });

        const { yield: yieldFn } = useYieldToMain();
        await yieldFn();

        expect(nativeYield).toHaveBeenCalledTimes(1);
    });
});
