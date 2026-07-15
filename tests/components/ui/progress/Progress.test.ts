import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Progress } from "@glass/components/progress/index";

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

    // AI.W4-M.1 — lifecycle attribute drives the intake / crescendo / discharge
    // keyframes. Verify the four-state machine maps as documented (idle / loading
    // / progressing / complete). The lifecycle lives on the gradient variant.
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
            // The lifecycle machine and the indeterminate sweep are mutually
            // exclusive — the sweep owns the motion story and the four-state
            // machine retires.
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

    // AV.W13 — the sectioned variant derives its OWN value from the per-cell state
    // map; `modelValue` is NOT its truth. It renders colour cells, not the
    // translateX indicator.
    describe("AV.W13 sectioned variant", () => {
        const segments = [
            { key: "a", color: "var(--chart-ping)", state: "completed" as const },
            { key: "b", color: "var(--chart-download)", state: "active" as const },
        ];

        it("paints ONE single-fill flow over the frosted rail (no per-cell stack)", () => {
            // BA.W-PROGRESS-GRADIENT clean break (RC-1/RC-4): the per-cell capped
            // `.progress-sectioned-cell` stack is DELETED for ONE `.progress-sectioned-flow`
            // element spanning the cumulative filled extent (the single front pill cap; the
            // segment hues blend in ONE linear-gradient, no per-cell rectangles). The track
            // is the frosted `.progress-sectioned-rail` register. proof:progress-gradient owns
            // the gradient-model assertion; this companion re-points off the retired cell stack.
            const wrapper = mount(Progress, {
                props: {
                    variant: "sectioned",
                    segments,
                    currentSegmentKey: "b",
                    activeProgress: 0.5,
                },
            });
            expect(wrapper.find('[role="progressbar"]').exists()).toBe(true);
            expect(wrapper.findAll(".progress-sectioned-cell").length).toBe(0);
            expect(wrapper.findAll(".progress-sectioned-flow").length).toBe(1);
            expect(wrapper.find(".progress-sectioned-rail").exists()).toBe(true);
        });

        it("does NOT emit the gradient lifecycle attribute", () => {
            const wrapper = mount(Progress, {
                props: { variant: "sectioned", segments, currentSegmentKey: "b" },
            });
            expect(
                wrapper.find('[role="progressbar"]').attributes("data-lifecycle"),
            ).toBeUndefined();
        });
    });

    // AV.W13 — the prop-boundary contract refuses incompatible combinations out
    // loud (a dev throw) instead of a silent wrong paint. The historical break:
    // `modelValue` passed to the sectioned variant was silently overridden.
    describe("AV.W13 prop-boundary contract", () => {
        it("throws when modelValue is passed (as truth) to the sectioned variant", () => {
            expect(() =>
                mount(Progress, {
                    props: {
                        variant: "sectioned",
                        modelValue: 60,
                        segments: [{ key: "a", color: "var(--chart-ping)" }],
                        currentSegmentKey: "a",
                    },
                }),
            ).toThrow(/variant="sectioned" ignores `modelValue`/);
        });

        it("throws when segments are passed to a non-sectioned variant", () => {
            expect(() =>
                mount(Progress, {
                    props: {
                        variant: "gradient",
                        segments: [{ key: "a", color: "var(--chart-ping)" }],
                    },
                }),
            ).toThrow(/`segments` is only valid on variant="sectioned"/);
        });

        it("throws when indeterminate is combined with the sectioned variant", () => {
            expect(() =>
                mount(Progress, {
                    props: {
                        variant: "sectioned",
                        indeterminate: true,
                        segments: [{ key: "a", color: "var(--chart-ping)" }],
                        currentSegmentKey: "a",
                    },
                }),
            ).toThrow(/`indeterminate` is not compatible with variant="sectioned"/);
        });

        it("accepts the corrected sectioned wiring (no modelValue; activeProgress drives fill)", () => {
            expect(() =>
                mount(Progress, {
                    props: {
                        variant: "sectioned",
                        segments: [
                            { key: "a", color: "var(--chart-ping)", state: "completed" as const },
                            { key: "b", color: "var(--chart-download)", state: "active" as const },
                        ],
                        currentSegmentKey: "b",
                        activeProgress: 0.5,
                    },
                }),
            ).not.toThrow();
        });
    });
});
