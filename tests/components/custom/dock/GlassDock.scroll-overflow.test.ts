import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassDock from "@glass/components/dock/GlassDock.vue";

/**
 * A capped axis is ALWAYS a scroll axis (the
 * `overflow="scroll"` opt-in RETIRED, clean break). The `scrollClass` computed
 * (useDockShellProps) now emits `dock-scroll-x` on EVERY horizontal dock (the CSS
 * `overflow-x: auto` scrolls only when the inline row exceeds
 * `--dock-max-inline-size`; under the cap the port is inert) and returns `null`
 * on a vertical dock (whose block-axis scroll folds into the unconditional
 * cap-derived `.glass-dock.vertical…:not([data-morphing])` rule in shell.css — no
 * `dock-scroll-y` class). These structural assertions verify the SFC emits the
 * correct axis class hook; the CSS that supplies the scroll regions ships in
 * `src/styles/dock/{overflow,shell}.css`.
 */
describe("GlassDock intrinsic cap-scroll", () => {
    it("projects size and shape on the dock surface", () => {
        const baseline = mount(GlassDock);
        const vertical = mount(GlassDock, {
            props: { orientation: "vertical", shape: "rounded" },
        });

        expect(baseline.get(".glass-dock").attributes("data-size")).toBe("md");
        expect(vertical.get(".glass-dock").classes()).toEqual(
            expect.arrayContaining(["vertical", "shape-rounded"]),
        );
    });

    it("a horizontal dock wears `dock-scroll-x` INTRINSICALLY (no opt-in prop)", () => {
        const wrapper = mount(GlassDock);
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });

    // The `overflow="scroll"` union member is RETIRED (only `"grow" | "wrap"`
    // survive). The horizontal scroll port is intrinsic — it is not toggled by a
    // prop. `overflow="grow"` therefore does not SUPPRESS the horizontal port.
    it("overflow=\"grow\" keeps the intrinsic `dock-scroll-x` on a horizontal dock", () => {
        const wrapper = mount(GlassDock, {
            props: { orientation: "horizontal", overflow: "grow" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });

    // The `wrap` enum member emits the `dock-overflow-wrap` hook.
    // A wrap dock's over-cap strategy is intrinsic flex REFLOW, not a scroll, so
    // it wears NEITHER scroll class (the one exception to the horizontal intrinsic
    // `.dock-scroll-x`). HORIZONTAL-ONLY: a vertical dock never emits the wrap hook.
    it("overflow=\"wrap\" emits the `dock-overflow-wrap` hook and NO scroll class (reflow, not scroll)", () => {
        const wrapper = mount(GlassDock, {
            props: { overflow: "wrap" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("dock-overflow-wrap");
        expect(root.classes()).not.toContain("dock-wrap");
        expect(root.classes()).not.toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });

    it("a vertical wrap dock emits neither the wrap hook nor a scroll class", () => {
        const wrapper = mount(GlassDock, {
            props: { orientation: "vertical", overflow: "wrap" },
        });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).not.toContain("dock-overflow-wrap");
        expect(root.classes()).not.toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });
});
