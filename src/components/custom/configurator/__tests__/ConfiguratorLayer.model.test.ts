import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import ConfiguratorLayer from "../ConfiguratorLayer.vue";

// AU.W8b.5 — v-model:open round-trip coverage for the defineModel conversion.
// Also pins the uncontrolled `defaultOpen` seed (the prior `props.open ??
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

// AU.W9.A — A-1 inter-row divider opt-in (conditional Tailwind arm, no CSS rung).
describe("ConfiguratorLayer dividers opt-in", () => {
    it("renders the inter-row hairline class when dividers is set", () => {
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Section", dividers: true },
        });
        const body = wrapper.find(".configurator-layer-body");
        expect(body.classes()).toContain("[&>*+*]:border-t");
        expect(body.classes()).toContain("[&>*+*]:border-border/30");
    });

    it("renders no divider class by default", () => {
        const wrapper = mount(ConfiguratorLayer, {
            props: { label: "Section" },
        });
        const body = wrapper.find(".configurator-layer-body");
        expect(body.classes()).not.toContain("[&>*+*]:border-t");
        expect(body.classes()).not.toContain("[&>*+*]:border-border/30");
    });
});
