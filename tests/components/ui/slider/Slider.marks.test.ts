import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Slider } from "@glass/components/slider";

const markPositions = (wrapper: ReturnType<typeof mount>) =>
    wrapper
        .findAll(".slider-mark")
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
        const layer = wrapper.get(".slider-marks");
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
            "slider-marks",
        );
        expect(wrapper.get(".slider-track").element.children[1]?.classList).toContain(
            "slider-range",
        );
    });

    it.each([
        ["horizontal RTL", { dir: "rtl" as const }, undefined],
        ["horizontal inverted", { inverted: true }, "true"],
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
                marks: [25, 50, 75],
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

    it("transposes the spectrum recipe without adding another control", () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [50],
                orientation: "vertical",
                variant: "spectrum",
                marks: [25, 50, 75],
                "aria-label": "Vertical spectrum",
            },
        });

        expect(wrapper.attributes()).toMatchObject({
            "data-orientation": "vertical",
            "data-variant": "spectrum",
        });
        expect(wrapper.findAll('[role="slider"]')).toHaveLength(1);
        expect(wrapper.findAll(".slider-track")).toHaveLength(1);
        expect(wrapper.findAll(".slider-range")).toHaveLength(1);
    });

    it("renders dense marks without extra focus or pointer targets", () => {
        const marks = Array.from({ length: 40 }, (_, index) => index + 30);
        const wrapper = mount(Slider, {
            props: {
                modelValue: [50],
                max: 100,
                marks,
                "aria-label": "Dense",
            },
        });

        expect(wrapper.findAll(".slider-mark")).toHaveLength(40);
        expect(wrapper.findAll(".slider-mark[tabindex]")).toHaveLength(0);
        expect(wrapper.findAll(".slider-mark[role]")).toHaveLength(0);
        expect(wrapper.findAll('[role="slider"]')).toHaveLength(1);
    });
});
