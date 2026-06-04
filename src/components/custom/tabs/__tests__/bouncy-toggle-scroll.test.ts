import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { mount } from "@vue/test-utils";

import BouncyToggle from "../BouncyToggle.vue";

/**
 * AS.W7 D8 harden — selecting a pill in the `overflow="scroll"` variant brings
 * it into the solid band (the configurator's last pill, "Nuclei", was born
 * clipped under the right fade). `select()` calls `scrollButtonIntoView`, which
 * honors reduced-motion (`behavior: "auto"` vs `"smooth"`) and is a no-op for
 * the default `overflow="none"` variant.
 *
 * `Element.prototype.scrollIntoView` is stubbed to a `vi.fn()` in tests/setup;
 * we read its call args. `matchMedia` is stubbed per-test to flip the
 * reduced-motion branch.
 */

const OPTIONS = [
    { label: "Medium", value: "medium" },
    { label: "Palette", value: "palette" },
    { label: "Nuclei", value: "nuclei" },
];

function stubMatchMedia(reduce: boolean): void {
    Object.defineProperty(window, "matchMedia", {
        configurable: true,
        writable: true,
        value: (query: string) => ({
            matches: query.includes("reduce") ? reduce : false,
            media: query,
            addEventListener: vi.fn(),
            removeEventListener: vi.fn(),
            addListener: vi.fn(),
            removeListener: vi.fn(),
            dispatchEvent: vi.fn(),
            onchange: null,
        }),
    });
}

describe("BouncyToggle — D8 scroll-active-into-view", () => {
    beforeEach(() => {
        (HTMLElement.prototype.scrollIntoView as ReturnType<typeof vi.fn>)
            .mockClear?.();
        stubMatchMedia(false);
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("scrolls the just-selected pill into view in the scroll variant", async () => {
        const wrapper = mount(BouncyToggle, {
            props: { options: OPTIONS, modelValue: "medium", overflow: "scroll" },
        });
        const spy = HTMLElement.prototype.scrollIntoView as ReturnType<
            typeof vi.fn
        >;
        spy.mockClear();

        // Click the last pill (Nuclei) — the clipped-at-rest case.
        await wrapper.findAll("button.bouncy-btn")[2]!.trigger("click");

        expect(spy).toHaveBeenCalled();
        const opts = spy.mock.calls.at(-1)?.[0];
        expect(opts).toMatchObject({ inline: "nearest", block: "nearest" });
        wrapper.unmount();
    });

    it("uses behavior:smooth when reduced-motion is NOT set", async () => {
        stubMatchMedia(false);
        const wrapper = mount(BouncyToggle, {
            props: { options: OPTIONS, modelValue: "medium", overflow: "scroll" },
        });
        const spy = HTMLElement.prototype.scrollIntoView as ReturnType<
            typeof vi.fn
        >;
        spy.mockClear();
        await wrapper.findAll("button.bouncy-btn")[2]!.trigger("click");
        expect(spy.mock.calls.at(-1)?.[0]).toMatchObject({ behavior: "smooth" });
        wrapper.unmount();
    });

    it("uses behavior:auto when reduced-motion IS set (no smooth animation)", async () => {
        stubMatchMedia(true);
        const wrapper = mount(BouncyToggle, {
            props: { options: OPTIONS, modelValue: "medium", overflow: "scroll" },
        });
        const spy = HTMLElement.prototype.scrollIntoView as ReturnType<
            typeof vi.fn
        >;
        spy.mockClear();
        await wrapper.findAll("button.bouncy-btn")[2]!.trigger("click");
        expect(spy.mock.calls.at(-1)?.[0]).toMatchObject({ behavior: "auto" });
        wrapper.unmount();
    });

    it("is a no-op for the default overflow=none variant (no scroller)", async () => {
        const wrapper = mount(BouncyToggle, {
            props: { options: OPTIONS, modelValue: "medium" },
        });
        const spy = HTMLElement.prototype.scrollIntoView as ReturnType<
            typeof vi.fn
        >;
        spy.mockClear();
        await wrapper.findAll("button.bouncy-btn")[2]!.trigger("click");
        expect(spy).not.toHaveBeenCalled();
        wrapper.unmount();
    });
});

describe("BouncyToggle — D8 multi-select regression", () => {
    beforeEach(() => stubMatchMedia(false));
    afterEach(() => vi.restoreAllMocks());

    it("toggles values independently and never deselects the last one", async () => {
        const wrapper = mount(BouncyToggle, {
            props: {
                options: OPTIONS,
                modelValue: ["medium"],
                multiSelect: true,
            },
        });

        // Add palette.
        await wrapper.findAll("button.bouncy-btn")[1]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toEqual([
            "medium",
            "palette",
        ]);

        // Re-render with the new model, then remove medium.
        await wrapper.setProps({ modelValue: ["medium", "palette"] });
        await wrapper.findAll("button.bouncy-btn")[0]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toEqual([
            "palette",
        ]);

        // The last remaining value cannot be deselected.
        await wrapper.setProps({ modelValue: ["palette"] });
        await wrapper.findAll("button.bouncy-btn")[1]!.trigger("click");
        const last = wrapper.emitted("update:modelValue")?.at(-1)?.[0];
        expect(last).toEqual(["palette"]);
        wrapper.unmount();
    });

    it("multi-select select() path runs cleanly with the scroll overflow", async () => {
        const wrapper = mount(BouncyToggle, {
            props: {
                options: OPTIONS,
                modelValue: ["medium"],
                multiSelect: true,
                overflow: "scroll",
            },
        });
        // Should not throw; the scroll-into-view runs for the toggled pill.
        await wrapper.findAll("button.bouncy-btn")[2]!.trigger("click");
        expect(wrapper.emitted("update:modelValue")?.at(-1)?.[0]).toEqual([
            "medium",
            "nuclei",
        ]);
        wrapper.unmount();
    });
});
