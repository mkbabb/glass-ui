import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassDock from "@glass/components/custom/dock/GlassDock.vue";

/**
 * AS.W7 D2 + D12 — `<GlassDock overflow="scroll">` scroll-on-overflow opt-in.
 *
 * The default `overflow="grow"` keeps the historical grow-to-fit-then-visibly-
 * overflow contract on both axes. `overflow="scroll"` makes the dock the scroll
 * port on its layout axis: horizontal docks scroll the active layer inline
 * (`.dock-scroll-x`), vertical docks scroll the root block-axis
 * (`.dock-scroll-y`), keeping the axis cap. The axis is derived from
 * `orientation` — the ONE layout axis (AZ.W-DOCK-TAXONOMY retired the
 * `variant="rail"`/`"instrument-strip"` second-way to express vertical). The CSS
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

    it("vertical dock derives the block axis — `dock-scroll-y`, never `dock-scroll-x`", () => {
        const wrapper = mount(GlassDock, {
            props: { orientation: "vertical", overflow: "scroll" },
        });
        const root = wrapper.get(".glass-dock");
        // The vertical orientation resolves the scroll axis to the block axis.
        expect(root.classes()).toContain("vertical");
        expect(root.classes()).toContain("dock-scroll-y");
        expect(root.classes()).not.toContain("dock-scroll-x");
    });

    it("explicit overflow=\"grow\" never acquires a scroll class", () => {
        const wrapper = mount(GlassDock, {
            props: { orientation: "vertical", overflow: "grow" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).not.toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });

    // AT.W7-dock-a — the overflow clean break: the `wrap` enum member (replacing
    // the deleted `wrap` boolean) emits the renamed `dock-overflow-wrap` hook,
    // parallel to the `dock-scroll-{x,y}` hooks the `scroll` member emits. The
    // prior `dock-wrap` class is retired (no alias).
    it("overflow=\"wrap\" emits the `dock-overflow-wrap` hook, never a scroll class", () => {
        const wrapper = mount(GlassDock, {
            props: { overflow: "wrap" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("dock-overflow-wrap");
        expect(root.classes()).not.toContain("dock-wrap");
        expect(root.classes()).not.toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });

    it("the default + non-wrap overflow modes never acquire the wrap hook", () => {
        for (const overflow of ["grow", "scroll"] as const) {
            const wrapper = mount(GlassDock, { props: { overflow } });
            expect(wrapper.get(".glass-dock").classes()).not.toContain(
                "dock-overflow-wrap",
            );
        }
    });
});
