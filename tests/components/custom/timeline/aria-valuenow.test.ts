import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassTimeline from "../../../../src/components/custom/timeline/GlassTimeline.vue";

/**
 * Regression specs for AA.A4 §S-16 — the W5 axe scan found the scrubber's
 * `aria-valuenow` attribute missing from the rendered DOM when the
 * consumer renders <GlassTimeline /> without an explicit `modelValue`
 * (Vue omits `:aria-valuenow="undefined"` from output, breaking the
 * `aria-required-attr` axe rule).
 *
 * The fix coerces the binding via `Number(modelValue ?? 0)`, which
 * guarantees a numeric `aria-valuenow="0"` renders even when the
 * consumer passes `undefined`/`null` or a string.
 */
describe("GlassTimeline scrubber aria-valuenow", () => {
    it("renders aria-valuenow=\"0\" when modelValue is undefined", () => {
        // Render WITHOUT passing modelValue. Vue's withDefaults supplies 0,
        // but the regression test exercises the defensive coercion path —
        // a consumer can pass `:model-value="undefined"` explicitly, which
        // bypasses the withDefaults default.
        const wrapper = mount(GlassTimeline, {
            props: { modelValue: undefined as unknown as number },
        });
        const track = wrapper.find(".glass-track");
        expect(track.attributes("aria-valuenow")).toBeDefined();
        expect(track.attributes("aria-valuenow")).toBe("0");
    });

    it("renders aria-valuenow=\"0\" when modelValue is null", () => {
        const wrapper = mount(GlassTimeline, {
            props: { modelValue: null as unknown as number },
        });
        const track = wrapper.find(".glass-track");
        expect(track.attributes("aria-valuenow")).toBeDefined();
        expect(track.attributes("aria-valuenow")).toBe("0");
    });

    it("renders aria-valuenow reflecting numeric modelValue when present", () => {
        const wrapper = mount(GlassTimeline, { props: { modelValue: 0.5 } });
        const track = wrapper.find(".glass-track");
        expect(track.attributes("aria-valuenow")).toBe("0.5");
    });
});
