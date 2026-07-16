import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { Pulse, type PulseState } from "@glass/components/pulse";

const states: PulseState[] = ["active", "idle", "success", "warning"];

describe("Pulse", () => {
    it.each(states)("renders the %s state through the shared mark", (state) => {
        const wrapper = mount(Pulse, { props: { state } });
        const mark = wrapper.get(".feedback-mark");

        expect(wrapper.attributes("data-state")).toBe(state);
        expect(mark.attributes("data-state")).toBe(state);
        expect(mark.attributes("data-motion")).toBe(
            state === "active" ? "" : undefined,
        );
    });

    it("is explicitly decorative by default", () => {
        const wrapper = mount(Pulse);

        expect(wrapper.attributes("data-identity")).toBe("decorative");
        expect(wrapper.attributes("aria-hidden")).toBe("true");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("aria-live")).toBeUndefined();
        expect(wrapper.text()).toBe("");
    });

    it("uses an image identity when named without creating a live region", () => {
        const wrapper = mount(Pulse, {
            props: { state: "warning", label: "Synchronization needs attention" },
        });

        expect(wrapper.attributes("data-identity")).toBe("labelled");
        expect(wrapper.attributes("role")).toBe("img");
        expect(wrapper.attributes("aria-label")).toBe(
            "Synchronization needs attention",
        );
        expect(wrapper.attributes("aria-live")).toBeUndefined();
        expect(wrapper.html()).not.toContain("Loading");
    });

    it("forwards ordinary host attributes and merges the public class", () => {
        const wrapper = mount(Pulse, {
            attrs: { id: "sync-mark", "data-probe": "pulse" },
            props: { class: "consumer-mark" },
        });

        expect(wrapper.attributes("id")).toBe("sync-mark");
        expect(wrapper.attributes("data-probe")).toBe("pulse");
        expect(wrapper.classes()).toContain("consumer-mark");
    });
});
