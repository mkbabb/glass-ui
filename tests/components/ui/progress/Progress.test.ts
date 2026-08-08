import { mount, type VueWrapper } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Progress } from "@glass/components/progress";

const root = (wrapper: VueWrapper) => wrapper.get('[role="progressbar"]');

describe("Progress", () => {
    it.each(["default", "liquid"] as const)(
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
                    .findAll(".glass-value-mark")
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
        expect(wrapper.get(".glass-value-mark").attributes("style")).toContain(
            "--value-mark-position: 50%",
        );
    });

    it("moves continuously across a stationary checkpoint", async () => {
        const wrapper = mount(Progress, {
            props: { modelValue: 0.49, max: 1, marks: [0.5] },
        });
        const markStyle = wrapper.get(".glass-value-mark").attributes("style");

        await wrapper.setProps({ modelValue: 0.51 });

        expect(root(wrapper).attributes("style")).toContain(
            "--progress-value-percent: 51%",
        );
        expect(wrapper.get(".glass-value-mark").attributes("style")).toBe(markStyle);
    });

    it("renders only sorted, unique, interior marks as decorative paint", () => {
        const wrapper = mount(Progress, {
            props: { modelValue: 40, marks: [100, 75, 25, 25, 0, -1, Number.NaN] },
        });

        expect(wrapper.get(".glass-value-marks").attributes("aria-hidden")).toBe(
            "true",
        );
        expect(
            wrapper
                .findAll(".glass-value-mark")
                .map((mark) => mark.attributes("style")),
        ).toEqual(["--value-mark-position: 25%;", "--value-mark-position: 75%;"]);
    });

    it("adds no decorative layer when marks are omitted", () => {
        const wrapper = mount(Progress, { props: { modelValue: 40 } });
        expect(wrapper.find(".glass-value-marks").exists()).toBe(false);
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
        expect(wrapper.get(".glass-value-mark").attributes("style")).toContain(
            "--value-mark-position: 25%",
        );
    });

    /* ONE door: reka's own `null`. The `indeterminate` boolean it replaces
       translated itself into null before reka ever saw it. */
    it.each(["default", "liquid"] as const)(
        "keeps %s indeterminate progress numeric-free",
        (variant) => {
            const wrapper = mount(Progress, {
                props: { variant, modelValue: null },
            });

            expect(root(wrapper).attributes("data-indeterminate")).toBe("true");
            expect(root(wrapper).attributes("data-state")).toBe("indeterminate");
            expect(root(wrapper).attributes("aria-valuenow")).toBeUndefined();
        },
    );

    /* A decorative checkpoint is not a crash. The library's only prop-shape
       `throw` used to fire here; marks are now emptied SILENTLY. */
    it("empties marks under indeterminate without throwing", () => {
        const wrapper = mount(Progress, {
            props: { modelValue: null, marks: [25, 50] },
        });
        expect(wrapper.find(".glass-value-marks").exists()).toBe(false);
    });

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
            "aria-valuenow": "40",
            "data-orientation": "vertical",
        });
        // `aria-orientation` is not permitted on role=progressbar
        expect(root(wrapper).attributes("aria-orientation")).toBeUndefined();
        expect(wrapper.findAll(".progress-value-fill")).toHaveLength(1);
        expect(wrapper.findAll(".glass-value-mark")).toHaveLength(3);
    });
});
