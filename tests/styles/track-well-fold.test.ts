import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Progress } from "@glass/components/progress";
import { Slider } from "@glass/components/slider";

/* BJ.W-TRACK-DRY — the shared track-well + value-marks registers are the ONE
   source both the Slider and the Progress COMPOSE. This pins the fold: if a
   component ever re-forks its own track surface or mark paint (the duplication
   this wave retired), the composition assertion below fails. Paint parity is
   proven by Slider.marks.test.ts / Progress.test.ts (positions unchanged) + the
   live-π before/after; this file guards the DRY structure. */
describe("track-well / value-marks shared registers", () => {
    it("has the Slider track compose the shared well + mark registers", () => {
        const wrapper = mount(Slider, {
            props: { modelValue: [40], max: 100, marks: [25, 50, 75], "aria-label": "L" },
        });

        expect(wrapper.get(".slider-track").classes()).toContain("track-well");
        expect(wrapper.find(".glass-value-marks").exists()).toBe(true);
        expect(wrapper.findAll(".glass-value-mark")).toHaveLength(3);
    });

    it("has the Progress rail compose the shared well + mark registers", () => {
        const wrapper = mount(Progress, {
            props: { modelValue: 40, marks: [25, 50, 75] },
        });

        expect(wrapper.get(".progress-rail").classes()).toContain("track-well");
        expect(wrapper.find(".glass-value-marks").exists()).toBe(true);
        expect(wrapper.findAll(".glass-value-mark")).toHaveLength(3);
    });

    it("forwards the Slider axis flags onto the shared marks container", () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [40],
                max: 100,
                marks: [25, 50],
                orientation: "vertical",
                inverted: true,
                "aria-label": "Axis",
            },
        });

        const marks = wrapper.get(".glass-value-marks");
        expect(marks.attributes("data-orientation")).toBe("vertical");
        expect(marks.attributes("data-inverted")).toBe("true");
    });
});
