import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import * as SliderSurface from "@glass/components/slider";
import { Slider } from "@glass/components/slider";

describe("Slider", () => {
    it("publishes one runtime owner without a styling function", () => {
        expect(Object.keys(SliderSurface)).toEqual(["Slider"]);
    });

    it("reflects typed paint axes without utility-generated root classes", () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [40],
                variant: "spectrum",
                size: "lg",
                class: "consumer-class",
                "aria-label": "Hue",
            },
        });

        expect(wrapper.classes()).toEqual(["glass-slider", "consumer-class"]);
        expect(wrapper.attributes()).toMatchObject({
            "data-variant": "spectrum",
            "data-size": "lg",
            "data-control-target": "",
        });
    });

    it("links label, invalid state, and description to every semantic thumb", () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [20, 80],
                invalid: true,
                "aria-labelledby": "range-label",
                "aria-describedby": "range-error",
                "aria-errormessage": "range-error",
            },
        });

        expect(wrapper.attributes("data-invalid")).toBe("true");
        expect(
            wrapper.findAll('[role="slider"]').map((thumb) => ({
                invalid: thumb.attributes("aria-invalid"),
                labelledBy: thumb.attributes("aria-labelledby"),
                describedBy: thumb.attributes("aria-describedby"),
                errorMessage: thumb.attributes("aria-errormessage"),
            })),
        ).toEqual([
            {
                invalid: "true",
                labelledBy: "range-label",
                describedBy: "range-error",
                errorMessage: "range-error",
            },
            {
                invalid: "true",
                labelledBy: "range-label",
                describedBy: "range-error",
                errorMessage: "range-error",
            },
        ]);
    });

    it("preserves vertical, disabled, and reduced-motion state", () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [50],
                orientation: "vertical",
                disabled: true,
                motion: "reduced",
                "aria-label": "Vertical level",
            },
        });
        const thumb = wrapper.get('[role="slider"]');

        expect(wrapper.attributes()).toMatchObject({
            "data-orientation": "vertical",
            "data-motion": "reduced",
        });
        expect(thumb.attributes()).toMatchObject({
            "aria-orientation": "vertical",
            "data-disabled": "",
        });
        expect(thumb.attributes("tabindex")).toBeUndefined();
    });

    it("keeps Reka keyboard step and range ordering", async () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [20, 80],
                step: 10,
                minStepsBetweenThumbs: 1,
                "aria-label": "Window",
            },
        });
        const [minimum] = wrapper.findAll('[role="slider"]');

        await minimum!.trigger("keydown", { key: "ArrowRight" });
        expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([[30, 80]]);
        expect(wrapper.emitted("valueCommit")?.at(-1)).toEqual([[30, 80]]);
    });

    it("renders and updates uncontrolled thumbs from defaultValue", async () => {
        const wrapper = mount(Slider, {
            props: {
                defaultValue: [20, 80],
                step: 10,
                "aria-label": "Window",
            },
        });
        await wrapper.vm.$nextTick();
        const [minimum, maximum] = wrapper.findAll('[role="slider"]');

        expect([minimum?.attributes("aria-valuenow"), maximum?.attributes("aria-valuenow")]).toEqual([
            "20",
            "80",
        ]);

        await minimum!.trigger("keydown", { key: "ArrowRight" });

        expect(wrapper.findAll('[role="slider"]').map((thumb) => thumb.attributes("aria-valuenow"))).toEqual([
            "30",
            "80",
        ]);
        expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([[30, 80]]);
        expect(wrapper.emitted("valueCommit")?.at(-1)).toEqual([[30, 80]]);
    });

    // [2026-08-07 · BK #46 GF-TIMELINE] RE-HOMED from the retired
    // `custom/timeline/aria-valuenow.test.ts`. The scrubber that case guarded is
    // gone — a timeline is `role="progressbar"` and the commanding surface is
    // this Slider — but the invariant it existed for is not: axe's
    // `aria-required-attr` fires the moment a `role="slider"` thumb renders
    // without a numeric `aria-valuenow`, and a value of 0 is exactly where a
    // truthiness-guarded binding drops out of the DOM. So the assert follows the
    // role to its new owner, on the value that catches the mistake.
    it("renders aria-valuenow at the zero end of the domain, where a falsy binding drops", async () => {
        const wrapper = mount(Slider, {
            props: {
                modelValue: [0],
                min: 0,
                max: 1,
                step: 0.01,
                "aria-label": "Playhead",
            },
        });
        await wrapper.vm.$nextTick();

        const thumbs = wrapper.findAll('[role="slider"]');
        expect(thumbs).toHaveLength(1);
        expect(thumbs[0]?.attributes("aria-valuenow")).toBe("0");
        expect(thumbs[0]?.attributes("aria-valuemin")).toBe("0");
        expect(thumbs[0]?.attributes("aria-valuemax")).toBe("1");
    });
});
