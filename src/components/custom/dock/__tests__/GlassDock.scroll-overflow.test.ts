import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassDock from "../GlassDock.vue";

/**
 * AS.W7 D2 + D12 — `<GlassDock overflow="scroll">` scroll-on-overflow opt-in.
 *
 * The default `overflow="grow"` keeps the historical grow-to-fit-then-visibly-
 * overflow contract on both axes. `overflow="scroll"` makes the dock the scroll
 * port on its layout axis: horizontal docks scroll the active layer inline
 * (`.dock-scroll-x`), vertical rails scroll the root block-axis
 * (`.dock-scroll-y`), keeping the axis cap. The axis is derived from
 * `orientation` (the rail/instrument-strip variants force vertical). The CSS
 * that supplies the scroll regions ships in `src/styles/dock.css`; these
 * structural assertions verify the SFC emits the correct axis class hook.
 */
describe("GlassDock overflow=\"scroll\" (AS.W7 D2/D12)", () => {
    it("defaults to grow — no scroll class on a horizontal dock", () => {
        const wrapper = mount(GlassDock);
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).not.toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });

    it("horizontal dock with overflow=\"scroll\" emits `dock-scroll-x` (inline axis)", () => {
        const wrapper = mount(GlassDock, {
            props: { orientation: "horizontal", overflow: "scroll" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });

    it("vertical dock with overflow=\"scroll\" emits `dock-scroll-y` (block axis)", () => {
        const wrapper = mount(GlassDock, {
            props: { orientation: "vertical", overflow: "scroll" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("dock-scroll-y");
        expect(root.classes()).not.toContain("dock-scroll-x");
    });

    it("rail variant derives the vertical axis — `dock-scroll-y` regardless of the orientation prop", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "rail", overflow: "scroll" },
        });
        const root = wrapper.get(".glass-dock");
        // The rail variant forces vertical orientation, so the scroll axis
        // resolves to the block axis even with the default horizontal prop.
        expect(root.classes()).toContain("vertical");
        expect(root.classes()).toContain("dock-scroll-y");
        expect(root.classes()).not.toContain("dock-scroll-x");
    });

    it("explicit overflow=\"grow\" never acquires a scroll class", () => {
        const wrapper = mount(GlassDock, {
            props: { variant: "rail", overflow: "grow" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).not.toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });
});
