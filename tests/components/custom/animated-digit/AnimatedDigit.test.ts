import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { AnimatedDigit } from "@glass/components/animated-digit/index";

describe("AnimatedDigit", () => {
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
});
