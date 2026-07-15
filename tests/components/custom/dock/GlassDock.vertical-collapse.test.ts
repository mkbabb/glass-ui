import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { h, nextTick } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import DockControl from "@glass/components/dock/DockControl.vue";

/**
 * AZ.W-DOCK-TAXONOMY (HG2) — a COLLAPSIBLE vertical dock morphs/shrinks.
 *
 * The mandate: a vertical dock carries the SAME collapse/morph machinery a
 * horizontal dock does (the machinery the old `variant="rail"` force-pin denied).
 * Before this wave a vertical dock was always-expanded-by-construction
 * (`startCollapsed` resolved `false`, `alwaysExpanded` resolved `true`); after it,
 * a vertical dock with no `always-expanded` is collapsible — it starts collapsed,
 * its outer collapse pair morphs the BLOCK axis (`outerLayerAxis` = the resolved
 * orientation → `vertical` → `block-size`), and expand()/collapse() drive the
 * `visualExpanded` aperture the morph rides.
 */
describe("GlassDock vertical collapse (AZ.W-DOCK-TAXONOMY HG2)", () => {
    beforeEach(() => vi.useFakeTimers());
    afterEach(() => vi.useRealTimers());

    function mountVertical(props: Record<string, unknown> = {}) {
        return mount(GlassDock, {
            props: { orientation: "vertical", startCollapsed: true, ...props },
            slots: {
                default: () => [
                    h(DockControl, { "aria-label": "A" }, () => "A"),
                    h(DockControl, { "aria-label": "B" }, () => "B"),
                ],
                collapsed: () => h(DockControl, { "aria-label": "Open" }, () => "O"),
            },
            attachTo: document.body,
        });
    }

    it("a vertical dock is COLLAPSIBLE by default — it starts collapsed (the old rail force-pin is gone)", () => {
        const wrapper = mountVertical();
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("vertical");
        // The force-pin is GONE: a vertical dock is NOT always-expanded by construction.
        expect(root.classes()).not.toContain("always-expanded");
        // It starts collapsed (startCollapsed default honored on the vertical axis).
        expect(root.classes()).toContain("collapsed");
        expect(root.classes()).not.toContain("expanded");
        wrapper.unmount();
    });

    it("expand() morphs the vertical dock open; collapse() shrinks it back", async () => {
        const wrapper = mountVertical();
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("collapsed");

        (wrapper.vm as unknown as { expand: () => void }).expand();
        await nextTick();
        expect(root.classes()).toContain("expanded");
        expect(root.classes()).not.toContain("collapsed");

        (wrapper.vm as unknown as { collapse: () => void }).collapse();
        await nextTick();
        expect(root.classes()).toContain("collapsed");
        expect(root.classes()).not.toContain("expanded");
        wrapper.unmount();
    });

    it("an always-expanded vertical dock opts OUT of collapse (the static nav-rail look)", () => {
        const wrapper = mountVertical({ alwaysExpanded: true });
        const root = wrapper.get(".glass-dock");
        expect(root.classes()).toContain("vertical");
        expect(root.classes()).toContain("always-expanded");
        expect(root.classes()).toContain("expanded");
        wrapper.unmount();
    });
});
