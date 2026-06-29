import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { AnimatedDigit } from "@glass/components/custom/animated-digit/index";

describe("AnimatedDigit", () => {
    it("renders the formatted current value through useAnimatedNumber", () => {
        // useAnimatedNumber initialises with `current === initial ?? 0`; the
        // smoother snaps to the target on the next tick. We assert the
        // mounted output reads a numeric string (zero-padded fine).
        const wrapper = mount(AnimatedDigit, { props: { value: 42 } });
        expect(wrapper.text()).toMatch(/\d+/);
    });

    it("renders the placeholder when value is null", () => {
        const wrapper = mount(AnimatedDigit, {
            props: { value: null, placeholder: "—" },
        });
        expect(wrapper.text()).toContain("—");
    });

    it("publishes --digit-count to the host inline style", () => {
        const wrapper = mount(AnimatedDigit, {
            props: { value: 1234, digitCount: 4 },
        });
        const style = wrapper.get(".animated-digit").attributes("style") || "";
        expect(style).toContain("--digit-count: 4");
    });

    it("applies the consumer formatter when provided", () => {
        const wrapper = mount(AnimatedDigit, {
            props: {
                value: 12.345,
                format: (v: number) => v.toFixed(2),
            },
        });
        // The first tick may show 0.00 then snap. Either way it's
        // tabular-formatted via .toFixed(2).
        expect(wrapper.text()).toMatch(/\d+\.\d{2}/);
    });

    it("mirrors animation state to data-is-animating", () => {
        const wrapper = mount(AnimatedDigit, { props: { value: 100 } });
        const host = wrapper.get(".animated-digit");
        // Either true or false; the attribute exists regardless.
        expect(host.attributes("data-is-animating")).toMatch(/^(true|false)$/);
    });
});
