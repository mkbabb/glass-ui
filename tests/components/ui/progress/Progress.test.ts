import { mount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Progress } from "@glass/components/progress";

const root = (wrapper: VueWrapper) => wrapper.get('[role="progressbar"]');

describe("Progress", () => {
    it.each(["default", "gradient", "liquid"] as const)(
        "normalizes arbitrary max for the %s fill and marks",
        (variant) => {
            const wrapper = mount(Progress, {
                props: { variant, modelValue: 0.5, max: 1, marks: [0.25, 0.5, 0.75] },
            });

            expect(root(wrapper).attributes("style")).toContain(
                "--progress-value-percent: 50%",
            );
            expect(root(wrapper).attributes()).toMatchObject({
                "aria-valuenow": "0.5",
                "aria-valuemax": "1",
            });
            expect(
                wrapper
                    .findAll(".value-mark")
                    .map((mark) => mark.attributes("style")),
            ).toEqual([
                "--value-mark-position: 25%;",
                "--value-mark-position: 50%;",
                "--value-mark-position: 75%;",
            ]);
        },
    );

    it("aligns a non-percent domain without changing its ARIA value", () => {
        const wrapper = mount(Progress, {
            props: { modelValue: 125, max: 250, marks: [125] },
        });

        expect(root(wrapper).attributes("style")).toContain(
            "--progress-value-percent: 50%",
        );
        expect(root(wrapper).attributes("aria-valuenow")).toBe("125");
        expect(wrapper.get(".value-mark").attributes("style")).toContain(
            "--value-mark-position: 50%",
        );
    });

    it("moves continuously across a stationary checkpoint", async () => {
        const wrapper = mount(Progress, {
            props: { modelValue: 0.49, max: 1, marks: [0.5] },
        });
        const markStyle = wrapper.get(".value-mark").attributes("style");

        await wrapper.setProps({ modelValue: 0.51 });

        expect(root(wrapper).attributes("style")).toContain(
            "--progress-value-percent: 51%",
        );
        expect(wrapper.get(".value-mark").attributes("style")).toBe(markStyle);
    });

    it("renders only sorted, unique, interior marks as decorative paint", () => {
        const wrapper = mount(Progress, {
            props: { modelValue: 40, marks: [100, 75, 25, 25, 0, -1, Number.NaN] },
        });

        expect(wrapper.get(".value-marks").attributes("aria-hidden")).toBe(
            "true",
        );
        expect(
            wrapper
                .findAll(".value-mark")
                .map((mark) => mark.attributes("style")),
        ).toEqual(["--value-mark-position: 25%;", "--value-mark-position: 75%;"]);
    });

    it("adds no decorative layer when marks are omitted", () => {
        const wrapper = mount(Progress, { props: { modelValue: 40 } });
        expect(wrapper.find(".value-marks").exists()).toBe(false);
    });

    it("keeps inherited RTL on the same logical value geometry", () => {
        const wrapper = mount(Progress, {
            props: { modelValue: 25, marks: [25] },
            attrs: { dir: "rtl" },
        });

        expect(root(wrapper).attributes("dir")).toBe("rtl");
        expect(root(wrapper).attributes("style")).toContain(
            "--progress-value-percent: 25%",
        );
        expect(wrapper.get(".value-mark").attributes("style")).toContain(
            "--value-mark-position: 25%",
        );
    });

    it.each(["default", "liquid"] as const)(
        "keeps %s indeterminate progress numeric-free",
        (variant) => {
            const wrapper = mount(Progress, {
                props: { variant, modelValue: 75, indeterminate: true },
            });

            expect(root(wrapper).attributes("data-indeterminate")).toBe("true");
            expect(root(wrapper).attributes("data-state")).toBe("indeterminate");
            expect(root(wrapper).attributes("aria-valuenow")).toBeUndefined();
        },
    );

    it("derives completion without inventing it for an error", () => {
        const complete = mount(Progress, { props: { modelValue: 100 } });
        const error = mount(Progress, {
            props: { modelValue: 63, status: "error" },
        });

        expect(root(complete).attributes("data-state")).toBe("complete");
        expect(root(error).attributes()).toMatchObject({
            "aria-invalid": "true",
            "aria-valuenow": "63",
            "data-state": "loading",
            "data-status": "error",
        });
    });

    it("transposes the same value and marks into vertical geometry", () => {
        const wrapper = mount(Progress, {
            props: {
                modelValue: 40,
                orientation: "vertical",
                marks: [25, 50, 75],
            },
        });

        expect(root(wrapper).attributes()).toMatchObject({
            "aria-orientation": "vertical",
            "aria-valuenow": "40",
            "data-orientation": "vertical",
        });
        expect(wrapper.findAll(".progress-value-fill")).toHaveLength(1);
        expect(wrapper.findAll(".value-mark")).toHaveLength(3);
    });

    describe("gradient lifecycle", () => {
        it.each([
            [0, "idle"],
            [0.02, "loading"],
            [0.6, "progressing"],
            [1, "complete"],
        ] as const)("maps %s of max=1 to %s", (modelValue, lifecycle) => {
            const wrapper = mount(Progress, {
                props: { modelValue, max: 1, variant: "gradient" },
            });
            expect(root(wrapper).attributes("data-lifecycle")).toBe(lifecycle);
        });

        it("derives the crescendo from the same fraction", () => {
            const wrapper = mount(Progress, {
                props: { modelValue: 230, max: 250, variant: "gradient" },
            });
            const style = root(wrapper).attributes("style") ?? "";
            expect(style).toContain("--progress-value-percent: 92%");
            const crescendo = style.match(/--progress-crescendo:\s*([\d.]+)%/)?.[1];
            expect(Number(crescendo)).toBeCloseTo(46.67, 2);
        });

        it("keeps indeterminate progress numeric-free", () => {
            const wrapper = mount(Progress, {
                props: { indeterminate: true, variant: "gradient" },
            });
            expect(root(wrapper).attributes("data-indeterminate")).toBe("true");
            expect(root(wrapper).attributes("data-lifecycle")).toBe("idle");
            expect(root(wrapper).attributes("aria-valuenow")).toBeUndefined();
        });

        it.each([
            ["explicit indeterminate", { indeterminate: true }],
            ["null model", { modelValue: null }],
        ] as const)("refuses numeric marks for %s progress", (_, state) => {
            expect(() =>
                mount(Progress, {
                    props: {
                        marks: [25],
                        ...state,
                    },
                }),
            ).toThrow(/marks.*determinate progress/);
        });
    });
});
