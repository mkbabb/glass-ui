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

    // AI.W4-M.1 — lifecycle attribute drives the intake / crescendo /
    // discharge keyframes. Verify the four-state machine maps as
    // documented (idle / loading / progressing / complete).
    describe("AI.W4 lifecycle attribute", () => {
        it("reports idle when modelValue is 0", () => {
            const wrapper = mount(Progress, {
                props: { modelValue: 0, variant: "gradient" },
            });
            expect(wrapper.find('[role="progressbar"]').attributes("data-lifecycle")).toBe("idle");
        });

        it("reports loading for the rising-edge band (0 < v < 5)", () => {
            const wrapper = mount(Progress, {
                props: { modelValue: 2, variant: "gradient" },
            });
            expect(wrapper.find('[role="progressbar"]').attributes("data-lifecycle")).toBe(
                "loading",
            );
        });

        it("reports progressing in the body register (5 ≤ v < 100)", () => {
            const wrapper = mount(Progress, {
                props: { modelValue: 60, variant: "gradient" },
            });
            expect(wrapper.find('[role="progressbar"]').attributes("data-lifecycle")).toBe(
                "progressing",
            );
        });

        it("reports complete at modelValue 100", () => {
            const wrapper = mount(Progress, {
                props: { modelValue: 100, variant: "gradient" },
            });
            expect(wrapper.find('[role="progressbar"]').attributes("data-lifecycle")).toBe(
                "complete",
            );
        });

        it("collapses to idle when sectioned variant is selected", () => {
            const wrapper = mount(Progress, {
                props: {
                    modelValue: 60,
                    variant: "sectioned",
                    segments: [
                        { key: "a", color: "var(--chart-ping)" },
                        { key: "b", color: "var(--chart-download)" },
                    ],
                    currentSegmentKey: "a",
                },
            });
            expect(wrapper.find('[role="progressbar"]').attributes("data-lifecycle")).toBe("idle");
        });
    });

    describe("AI.W4 indeterminate prop", () => {
        it("emits data-indeterminate when indeterminate is true", () => {
            const wrapper = mount(Progress, {
                props: { indeterminate: true, variant: "gradient" },
            });
            expect(wrapper.find('[role="progressbar"]').attributes("data-indeterminate")).toBe(
                "true",
            );
        });

        it("omits data-indeterminate by default", () => {
            const wrapper = mount(Progress, {
                props: { modelValue: 50, variant: "gradient" },
            });
            expect(
                wrapper.find('[role="progressbar"]').attributes("data-indeterminate"),
            ).toBeUndefined();
        });

        it("collapses lifecycle to idle when indeterminate", () => {
            // The lifecycle machine and the indeterminate sweep are
            // mutually exclusive — the sweep owns the motion story
            // and the four-state machine retires.
            const wrapper = mount(Progress, {
                props: { indeterminate: true, modelValue: 60, variant: "gradient" },
            });
            expect(wrapper.find('[role="progressbar"]').attributes("data-lifecycle")).toBe("idle");
        });
    });

    describe("AI.W4 crescendo style binding", () => {
        it("does not emit --progress-crescendo below 85%", () => {
            const wrapper = mount(Progress, {
                props: { modelValue: 80, variant: "gradient" },
            });
            const indicator = wrapper.find('[style*="translateX"]');
            // The style string is normalized by jsdom; we assert the
            // value rather than the order. 0% is the explicit reset
            // (versus undefined which would leak the @property
            // initial value through inheritance — irrelevant here
            // since the property is `inherits: false`, but the
            // explicit reset documents the intent).
            expect(indicator.attributes("style")).toContain("--progress-crescendo: 0%");
        });

        it("emits a positive --progress-crescendo past 85%", () => {
            const wrapper = mount(Progress, {
                props: { modelValue: 92, variant: "gradient" },
            });
            const indicator = wrapper.find('[style*="translateX"]');
            // 92 → (92-85)/15 * 100 ≈ 46.67%
            const style = indicator.attributes("style") ?? "";
            const match = style.match(/--progress-crescendo:\s*([\d.]+)%/);
            expect(match).not.toBeNull();
            const crescendo = Number(match?.[1]);
            expect(crescendo).toBeGreaterThan(40);
            expect(crescendo).toBeLessThan(55);
        });

        it("caps crescendo at 100% at modelValue 100", () => {
            const wrapper = mount(Progress, {
                props: { modelValue: 100, variant: "gradient" },
            });
            const indicator = wrapper.find('[style*="translateX"]');
            expect(indicator.attributes("style")).toContain("--progress-crescendo: 100%");
        });
    });
});
