import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

import GlassDock from "@glass/components/custom/dock/GlassDock.vue";
import { useDockContext } from "@glass/components/custom/dock/composables/dockContext";

/**
 * AR inv-η — the per-instance id `<GlassDock>` mints (and from which it
 * derives its `.dock-layers` `view-transition-name`) must be PAIRWISE-DISTINCT
 * across every live instance on a page.
 *
 * The regression this guards: the prior module-scoped `++dockInstanceId`
 * counter restarts at 0 for every copy of GlassDock.vue in the module graph
 * (a lazy/eager dist split, or two bundles sharing the page), so two
 * independent docks could BOTH mint `glass-dock-1` — a duplicate id that,
 * applied as a `view-transition-name`, the browser rejects (only one box
 * captures, the other logs an error; fourier's console-error e2e catches it).
 * The fix mints `dockId` from Vue's app-scoped `useId()`, collision-free
 * across module-graph copies (`DockLayerGroup` uses the same idiom).
 *
 * We assert on `dockId` itself — surfaced via the dock context — rather than
 * the rendered inline `view-transition-name`: the name is the pure
 * deterministic `dockId.replace(/[^a-zA-Z0-9_-]/g, "-")`, so distinct ids
 * imply distinct names, and reading the id sidesteps happy-dom not reflecting
 * the (newer) `view-transition-name` CSS property when Vue applies it via the
 * camelCase IDL.
 */
const DockIdProbe = defineComponent({
    name: "DockIdProbe",
    setup() {
        const ctx = useDockContext();
        return () => h("span", { class: "dock-id-probe", "data-dock-id": ctx.id });
    },
});

describe("GlassDock dockId (AR inv-η pairwise-distinct guard)", () => {
    it("mints strictly-distinct ids for two docks on one page", () => {
        // Two <GlassDock> in ONE wrapper — they share one app context, so
        // useId() must hand each a distinct id (the counter bug gave both
        // `glass-dock-1`). Each hosts a probe reading the dock context id.
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
});
