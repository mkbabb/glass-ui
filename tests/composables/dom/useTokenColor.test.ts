import { defineComponent, h, nextTick } from "vue";
import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";

import { useTokenColor } from "../../../src/composables/dom/useTokenColor";

// AW.W15 — the `useTokenColor` injection seam.
//
// `useTokenColor` read `document.documentElement` directly with no injection
// point, breaking DI closure for SSR / test. The optional `resolver` arg (last
// param, defaulting to the live computed-style read) closes that loop: an
// injected resolver overrides the DOM read.
function withSetup<T>(setup: () => T): T {
    let result!: T;
    const Comp = defineComponent({
        setup() {
            result = setup();
            return () => h("div");
        },
    });
    mount(Comp, { attachTo: document.body });
    return result;
}

describe("useTokenColor — injected resolver seam (AW.W15)", () => {
    it("overrides the document read with an injected resolver", async () => {
        const resolver = vi.fn((prop: string) => {
            return prop === "--accent" ? "rgb(10, 20, 30)" : "";
        });

        const { value, refresh } = withSetup(() =>
            useTokenColor("--accent", { resolver, fallback: "#000" }),
        );

        await nextTick();
        refresh();
        expect(resolver).toHaveBeenCalledWith("--accent", expect.anything());
        expect(value.value).toBe("rgb(10, 20, 30)");
    });

    it("falls back when the injected resolver returns empty", async () => {
        const { value, refresh } = withSetup(() =>
            useTokenColor("--missing", {
                resolver: () => "",
                fallback: "#fallback",
            }),
        );
        await nextTick();
        refresh();
        expect(value.value).toBe("#fallback");
    });

    it("uses the default computed-style read when no resolver is injected", async () => {
        // Paint a custom property on <html> so the default resolver reads it.
        document.documentElement.style.setProperty("--probe-token", "rgb(1, 2, 3)");

        const { value, refresh } = withSetup(() =>
            useTokenColor("--probe-token", { fallback: "#000" }),
        );
        await nextTick();
        refresh();
        // happy-dom resolves an inline custom property set on the element.
        expect(value.value).toBe("rgb(1, 2, 3)");

        document.documentElement.style.removeProperty("--probe-token");
    });
});
