import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassDock from "@glass/components/dock/GlassDock.vue";

/**
 * A capped axis is ALWAYS a scroll axis, and after
 * [2026-08-12 · BK #47 W1 SURFACE] there is no prop left to say otherwise. The
 * `scrollClass` computed (useDockShellProps) emits `dock-scroll-x` on EVERY
 * horizontal dock (the CSS `overflow-x: auto` scrolls only when the inline row
 * exceeds `--dock-max-inline-size`; under the cap the port is inert) and returns
 * `null` on a vertical dock (whose block-axis scroll folds into the unconditional
 * cap-derived `.glass-dock.vertical…:not([data-morphing])` rule in shell.css — no
 * `dock-scroll-y` class).
 *
 * ~~`overflow="grow" | "wrap"` — the ONE knob governing every overflow behavior~~ —
 * the `overflow` prop is STRUCK with its `.dock-overflow-wrap` intrinsic-reflow
 * recipe. `orientation` is now the sole input to the axis class, so the whole
 * mapping is two rows and a falsifier: emit a scroll class on the vertical arm, or
 * withhold it on the horizontal arm, and this REDs.
 */
describe("GlassDock intrinsic cap-scroll", () => {
    it("a horizontal dock wears `dock-scroll-x` INTRINSICALLY (no opt-in prop)", () => {
        const root = mount(GlassDock).get(".glass-dock");
        expect(root.classes()).toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });

    it("a vertical dock wears NO scroll class — shell.css owns its block axis", () => {
        const root = mount(GlassDock, {
            props: { orientation: "vertical" },
        }).get(".glass-dock");
        expect(root.classes()).not.toContain("dock-scroll-x");
        expect(root.classes()).not.toContain("dock-scroll-y");
    });

    it("no dock emits the retired wrap hook on either axis", () => {
        for (const orientation of ["horizontal", "vertical"] as const) {
            const root = mount(GlassDock, { props: { orientation } }).get(".glass-dock");
            expect(root.classes()).not.toContain("dock-overflow-wrap");
        }
    });

    it("projects shape on the dock surface", () => {
        const root = mount(GlassDock, {
            props: { orientation: "vertical", shape: "rounded" },
        }).get(".glass-dock");
        expect(root.classes()).toEqual(
            expect.arrayContaining(["vertical", "shape-rounded"]),
        );
    });
});
