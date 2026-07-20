import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import {
    StatusDot,
    STATUS_DOT_STATES,
} from "@glass/components/status-dot";

describe("StatusDot", () => {
    it.each(STATUS_DOT_STATES)(
        "renders %s with its own noncolor silhouette",
        (state) => {
            const wrapper = mount(StatusDot, { props: { state } });
            const mark = wrapper.get(".feedback-mark");

            expect(wrapper.attributes("data-state")).toBe(state);
            expect(mark.attributes("data-state")).toBe(state);
        },
    );

    it.each(STATUS_DOT_STATES)(
        "gates the breathing pulse to the live active state under the default motion",
        (state) => {
            const mark = mount(StatusDot, { props: { state } }).get(
                ".feedback-mark",
            );
            // liquid-weight default (motion:"full"): ONLY the live `active` state
            // carries the pulse ring (data-motion=""); every settled state stills
            // its mark (data-motion undefined).
            expect(mark.attributes("data-motion")).toBe(
                state === "active" ? "" : undefined,
            );
        },
    );

    it("motion=off stills the active mark", () => {
        const mark = mount(StatusDot, {
            props: { state: "active", motion: "off" },
        }).get(".feedback-mark");

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

    it("carries the three ordinal sizes onto the mark (lg = 0.875rem)", () => {
        // The data-size attribute is the contract; the SFC style keys the
        // --feedback-mark-size rem off it (sm 0.5rem · md 0.625rem · lg 0.875rem).
        expect(mount(StatusDot).attributes("data-size")).toBe("sm");
        expect(
            mount(StatusDot, { props: { size: "md" } }).attributes("data-size"),
        ).toBe("md");
        expect(
            mount(StatusDot, { props: { size: "lg" } }).attributes("data-size"),
        ).toBe("lg");
    });
});
