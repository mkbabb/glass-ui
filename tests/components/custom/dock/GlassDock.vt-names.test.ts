import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

import GlassDock from "@glass/components/dock/GlassDock.vue";
import { useDockContext } from "@glass/components/dock/composables/dockContext";

const DockIdProbe = defineComponent({
    name: "DockIdProbe",
    setup() {
        const ctx = useDockContext();
        return () => h("span", { class: "dock-id-probe", "data-dock-id": ctx.id });
    },
});

describe("GlassDock transition identity", () => {
    it("mints strictly-distinct ids for two docks on one page", () => {
        const wrapper = mount({
            render: () =>
                h("div", [
                    h(GlassDock, null, { default: () => h(DockIdProbe) }),
                    h(GlassDock, null, { default: () => h(DockIdProbe) }),
                ]),
        });

        const ids = wrapper
            .findAll(".dock-id-probe")
            .map((el) => el.attributes("data-dock-id"));

        expect(
            wrapper
                .findAll(".glass-dock")
                .every(
                    (dock) => dock.attributes("data-material") === "functional",
                ),
        ).toBe(true);

        expect(ids).toHaveLength(2);
        // Both well-formed (useId() returned a non-empty value — the real
        // degenerate is `glass-dock-` from an empty-string id, NOT
        // `glass-dock-undefined`; useId() returns "" outside a value, never
        // `undefined`). The `.+` requires a non-empty suffix.
        expect(ids[0]).toMatch(/^glass-dock-.+/);
        expect(ids[1]).toMatch(/^glass-dock-.+/);
        expect(ids[0]).not.toBe("glass-dock-");
        expect(ids[1]).not.toBe("glass-dock-");
        // The AR inv-η invariant: STRICTLY DISTINCT.
        expect(ids[0]).not.toBe(ids[1]);
    });

    it("does not extract docks from an ordinary route snapshot", () => {
        const wrapper = mount({
            render: () => h(GlassDock),
        });

        expect(wrapper.get(".glass-dock").attributes("style") ?? "").not.toContain(
            "view-transition-name",
        );
    });
});
