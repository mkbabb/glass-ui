import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Progress } from "../index";

describe("Progress", () => {
    it("renders a progress indicator at the supplied value", () => {
        const wrapper = mount(Progress, {
            props: {
                modelValue: 40,
                variant: "gradient",
            },
        });

        const indicator = wrapper.find('[style*="translateX"]');

        expect(wrapper.find('[role="progressbar"]').exists()).toBe(true);
        expect(indicator.attributes("style")).toContain("translateX(-60%)");
    });
});
