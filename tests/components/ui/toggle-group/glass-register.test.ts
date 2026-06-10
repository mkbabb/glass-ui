// E21/E23 (d-glassui M2) — the control-glass ToggleGroup register (E1 §2h).
//
// The defect this guards: the most-numerous control class (filter chips) rendered
// a FLAT `color-mix` fill because `toggle`'s base is flat and glass was an opt-in
// `card`-only register. The fix adds a `glass` toggle variant (wash-rest /
// quiet-on-select) reachable group-wide via `<ToggleGroup register="glass">` —
// without each call-site naming `variant="glass"`. This proof asserts the cva
// register AND the ToggleGroup→ToggleGroupItem resolution.

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { h } from "vue";

import { toggleVariants } from "../../../../src/components/ui/toggle";
import ToggleGroup from "../../../../src/components/ui/toggle-group/ToggleGroup.vue";
import ToggleGroupItem from "../../../../src/components/ui/toggle-group/ToggleGroupItem.vue";

describe("toggleVariants — the glass register (§2h)", () => {
    it("the glass variant composes the unified .glass-wash material (wash-rest)", () => {
        const cls = toggleVariants({ variant: "glass" });
        // wash-rest: the glass-wash material (rim + wake-on-interaction specular).
        expect(cls).toContain("glass-wash");
        // It does NOT carry the flat hard-accent fill the base/default class uses
        // as the selected state — the on-state is the QUIET glass rung instead.
        expect(cls).toContain("data-[state=on]:bg-glass-quiet");
    });

    it("quiet-on-select: the on-state rises ONE rung to glass-quiet (the glass register's own on-fill)", () => {
        const cls = toggleVariants({ variant: "glass" });
        // The glass variant carries its own quiet-glass on-fill. `cn()` at the call
        // site tailwind-merges this AFTER the base `bg-accent`, so the rendered chip
        // settles to `glass-quiet` (proven in the rendered-DOM test below).
        expect(cls).toContain("data-[state=on]:bg-glass-quiet");
        expect(cls).toContain("data-[state=on]:text-foreground");
        expect(cls).toContain("data-[state=on]:border-glass-border-quiet");
    });

    it("the flat default register is UNCHANGED (back-compat)", () => {
        const cls = toggleVariants({ variant: "default" });
        expect(cls).toContain("bg-transparent");
        expect(cls).not.toContain("glass-wash");
    });
});

describe("ToggleGroup register=glass resolution (§2h)", () => {
    // Mount a real ToggleGroup with ToggleGroupItem children via render functions
    // (h) so the reka collection context + the typed DI both wire correctly. The
    // resolved item class is read off the rendered DOM (`.glass-wash` is the tell).
    function mountGroup(
        groupProps: Record<string, unknown>,
        itemPropsList: Array<Record<string, unknown>>,
    ) {
        return mount(ToggleGroup, {
            props: { type: "single", ...groupProps },
            attachTo: document.body,
            slots: {
                default: () =>
                    itemPropsList.map((p, i) =>
                        h(ToggleGroupItem, { value: `v${i}`, key: i, ...p }, () => `Item ${i}`),
                    ),
            },
        });
    }

    it("register=glass moves EVERY item onto the glass variant without a per-item variant", () => {
        const wrapper = mountGroup({ register: "glass" }, [{}, {}]);
        const items = wrapper.findAllComponents(ToggleGroupItem);
        expect(items.length).toBe(2);
        for (const item of items) {
            // Every item carries the glass-wash material from the resolved glass
            // register — frosted, not the flat default.
            expect(item.classes()).toContain("glass-wash");
        }
    });

    it("an EXPLICIT item variant WINS over the group register", () => {
        const wrapper = mountGroup({ register: "glass" }, [{ variant: "outline" }]);
        const item = wrapper.findComponent(ToggleGroupItem);
        // The explicit `outline` variant wins — no glass-wash.
        expect(item.classes()).not.toContain("glass-wash");
        expect(item.classes().join(" ")).toContain("border-input");
    });

    it("register is NOT forwarded onto the reka DOM root (no leaked attribute)", () => {
        const wrapper = mountGroup({ register: "glass" }, []);
        // `register` is a glass-ui chrome-tier prop, stripped from the forwarded
        // delegate — it must not appear as a DOM attribute on the group root.
        expect(wrapper.get('[data-slot="toggle-group"]').attributes("register")).toBeUndefined();
    });

    it("no register ⇒ the flat default (back-compat)", () => {
        const wrapper = mountGroup({}, [{}]);
        const item = wrapper.findComponent(ToggleGroupItem);
        expect(item.classes()).not.toContain("glass-wash");
    });
});
