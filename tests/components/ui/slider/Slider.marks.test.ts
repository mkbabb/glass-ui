import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Slider } from "@glass/components/slider";

const markPositions = (wrapper: ReturnType<typeof mount>) =>
    wrapper
        .findAll(".value-mark")
        .map((mark) => mark.attributes("style")?.match(/[\d.]+%/)?.[0]);

describe("Slider value marks", () => {
    it("sorts, deduplicates, and omits invalid and endpoint marks", () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [40],
                min: -20,
                max: 80,
                marks: [30, -20, 0, 30, 80, 120, Number.NaN],
                "aria-label": "Level",
            },
        });

        expect(markPositions(wrapper)).toEqual(["20%", "50%"]);
        const layer = wrapper.get(".value-marks");
        expect(layer.attributes("aria-hidden")).toBe("true");
        expect(wrapper.attributes("marks")).toBeUndefined();
    });

    it("keeps Reka thumb count, step updates, and commits unchanged", async () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [20],
                min: 0,
                max: 100,
                step: 10,
                marks: [15, 50, 85],
                "aria-label": "Volume",
            },
        });

        expect(wrapper.findAll('[role="slider"]')).toHaveLength(1);
        await wrapper.get('[role="slider"]').trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([[30]]);
        expect(wrapper.emitted("valueCommit")?.at(-1)).toEqual([[30]]);
    });

    it("keeps fractional off-step marks stationary while the thumb crosses them", async () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [-0.25],
                min: -1,
                max: 1,
                step: 0.25,
                marks: [-0.5, -0.125, 0.333],
                "aria-label": "Fractional level",
            },
        });
        const positions = markPositions(wrapper);

        await wrapper.setProps({ modelValue: [0] });

        expect(markPositions(wrapper)).toEqual(positions);
        expect(wrapper.get('[role="slider"]').attributes("aria-valuenow")).toBe("0");
        expect(positions.slice(0, 2)).toEqual(["25%", "43.75%"]);
        expect(Number.parseFloat(positions[2]!)).toBeCloseTo(66.65);
    });

    it("leaves a range slider as two native thumbs over one shared mark rail", () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [25, 75],
                max: 100,
                marks: [10, 25, 50, 75, 90],
                "aria-label": "Price range",
            },
        });

        expect(wrapper.findAll('[role="slider"]')).toHaveLength(2);
        expect(markPositions(wrapper)).toEqual(["10%", "25%", "50%", "75%", "90%"]);
        expect(wrapper.get(".slider-track").element.children[0]?.classList).toContain(
            "value-marks",
        );
        expect(wrapper.get(".slider-track").element.children[1]?.classList).toContain(
            "slider-range",
        );
    });

    it.each([
        ["horizontal RTL", { dir: "rtl" as const }, undefined],
        ["horizontal inverted", { inverted: true }, "true"],
        [
            "horizontal RTL and inverted",
            { dir: "rtl" as const, inverted: true },
            "true",
        ],
        ["vertical", { orientation: "vertical" as const }, undefined],
        [
            "vertical inverted",
            { orientation: "vertical" as const, inverted: true },
            "true",
        ],
    ])("keeps %s marks on Reka's existing axis", (_, axis, inverted) => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [40],
                max: 100,
                marks: [0, 25, 50, 75, 100],
                "aria-label": "Axis",
                ...axis,
            },
        });

        expect(wrapper.attributes("data-orientation")).toBe(
            "orientation" in axis ? axis.orientation : "horizontal",
        );
        expect(wrapper.attributes("data-inverted")).toBe(inverted);
        expect(markPositions(wrapper)).toEqual(["25%", "50%", "75%"]);
    });
});
