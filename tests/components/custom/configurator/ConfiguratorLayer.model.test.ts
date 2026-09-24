import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ConfiguratorLayer from "@glass/components/configurator/ConfiguratorLayer.vue";

// V-model:open round-trip coverage for defineModel(open).
// Also pins the uncontrolled `defaultOpen` seed (the `props.open ??
// props.defaultOpen` cadence the model setup preserves).

describe("ConfiguratorLayer defineModel(open) round-trip", () => {
    it("emits update:open when the trigger is clicked", async () => {
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Section", open: true },
        });
        expect(wrapper.find("button").attributes("aria-expanded")).toBe("true");
        await wrapper.find("button").trigger("click");
        expect(wrapper.emitted("update:open")?.at(-1)?.[0]).toBe(false);
    });

    it("reflects an external open write in aria-expanded", async () => {
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Section", open: true },
        });
        await wrapper.setProps({ open: false });
        expect(wrapper.find("button").attributes("aria-expanded")).toBe("false");
    });

    it("seeds from defaultOpen (true) when uncontrolled — no v-model:open", () => {
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Section" },
        });
        expect(wrapper.find("button").attributes("aria-expanded")).toBe("true");
    });

    it("seeds closed when defaultOpen=false and uncontrolled", () => {
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Section", defaultOpen: false },
        });
        expect(wrapper.find("button").attributes("aria-expanded")).toBe("false");
    });
});

// A-1 inter-row divider opt-in (conditional Tailwind arm, no CSS rung).
describe("ConfiguratorLayer dividers opt-in", () => {
    it("renders the inter-row hairline class when dividers is set", () => {
        // clean break: the divider COLOR moved off the inline
        // `border-border/30` alpha to the dark-adaptive `--configurator-divider` token,
        // keyed by the `data-dividers` attribute (the scoped COLOR rule). The `border-t`
        // WIDTH + the `pt-2` spacing arbitrary variants stay.
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Section", dividers: true },
        });
        const body = wrapper.find(".configurator-layer-body");
        expect(body.classes()).toContain("[&>*+*]:border-t");
        expect(body.attributes("data-dividers")).toBe("true");
    });

    it("renders no divider class by default", () => {
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Section" },
        });
        const body = wrapper.find(".configurator-layer-body");
        expect(body.classes()).not.toContain("[&>*+*]:border-t");
        expect(body.attributes("data-dividers")).toBeUndefined();
    });
});

// O-68: the `#actions` header slot — a sibling of the trigger, never inside it.
describe("ConfiguratorLayer #actions header slot", () => {
    const actions = '<button type="button" data-test="reset">Reset</button>';

    it("renders the actions in the header, outside the toggle button", () => {
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Contour", open: true },
            slots: { actions },
        });
        const header = wrapper.get('[data-slot="configurator-layer-header"]');
        const trigger = header.get('[data-slot="configurator-layer-trigger"]');
        const slot = header.get('[data-slot="configurator-layer-actions"]');
        expect(slot.find('[data-test="reset"]').exists()).toBe(true);
        expect(trigger.find('[data-test="reset"]').exists()).toBe(false);
        // Tab order: toggle, then the actions.
        const buttons = header.findAll("button").map((b) => b.attributes("data-slot") ?? b.attributes("data-test"));
        expect(buttons).toEqual(["configurator-layer-trigger", "reset"]);
    });

    it("an action click does not toggle the layer", async () => {
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Contour", open: true },
            slots: { actions },
        });
        await wrapper.get('[data-test="reset"]').trigger("click");
        expect(wrapper.emitted("update:open")).toBeUndefined();
        expect(wrapper.get('[data-slot="configurator-layer-trigger"]').attributes("aria-expanded")).toBe("true");
    });

    it("shows only while open by default, and always with actionsWhen=always", async () => {
        const closed = mount(ConfiguratorLayer, {
            props: { label: "Contour", open: false },
            slots: { actions },
        });
        expect(closed.find('[data-slot="configurator-layer-actions"]').exists()).toBe(false);
        await closed.setProps({ open: true });
        expect(closed.find('[data-slot="configurator-layer-actions"]').exists()).toBe(true);

        const always = mount(ConfiguratorLayer, {
            props: { label: "Contour", open: false, actionsWhen: "always" },
            slots: { actions },
        });
        expect(always.find('[data-slot="configurator-layer-actions"]').exists()).toBe(true);
    });

    it("renders no actions container without the slot", () => {
        const wrapper = mount(ConfiguratorLayer, { props: { label: "Contour" } });
        expect(wrapper.find('[data-slot="configurator-layer-actions"]').exists()).toBe(false);
    });
});
