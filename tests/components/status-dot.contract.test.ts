import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
    StatusDot,
    type StatusDotState,
} from "@glass/components/status-dot";

const states: StatusDotState[] = ["online", "warning", "error", "unknown"];

describe("StatusDot", () => {
    it.each(states)("renders %s with its own noncolor silhouette", (state) => {
        const wrapper = mount(StatusDot, { props: { state } });
        const mark = wrapper.get(".feedback-mark");

        expect(wrapper.attributes("data-state")).toBe(state);
        expect(mark.attributes("data-state")).toBe(state);
        expect(mark.attributes("data-motion")).toBeUndefined();
    });

    it("is explicitly decorative when adjacent text owns the status", () => {
        const wrapper = mount(StatusDot, { props: { state: "online" } });

        expect(wrapper.attributes("data-identity")).toBe("decorative");
        expect(wrapper.attributes("aria-hidden")).toBe("true");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("aria-live")).toBeUndefined();
    });

    it("uses an image identity when named without creating a live region", () => {
        const wrapper = mount(StatusDot, {
            props: { state: "error", label: "Service unavailable" },
        });

        expect(wrapper.attributes("data-identity")).toBe("labelled");
        expect(wrapper.attributes("role")).toBe("img");
        expect(wrapper.attributes("aria-label")).toBe("Service unavailable");
        expect(wrapper.attributes("aria-hidden")).toBeUndefined();
        expect(wrapper.attributes("aria-live")).toBeUndefined();
    });

    it("keeps the scale to two ordinal sizes", () => {
        expect(mount(StatusDot).attributes("data-size")).toBe("sm");
        expect(
            mount(StatusDot, { props: { size: "md" } }).attributes("data-size"),
        ).toBe("md");
    });
});
