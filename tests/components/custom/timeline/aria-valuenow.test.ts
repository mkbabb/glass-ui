import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import GlassTimeline from "@glass/components/timeline/GlassTimeline.vue";

/**
 * Specs for the scrubber's `aria-valuenow` attribute. Without an explicit
 * `modelValue`, a rendered <GlassTimeline /> must still expose a numeric
 * `aria-valuenow` (Vue omits `:aria-valuenow="undefined"` from output, which
 * would break the `aria-required-attr` axe rule).
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

    it("announces the human label and supports Home and End", async () => {
        const wrapper = mount(GlassTimeline, {
            props: { modelValue: 0.5, label: "50% · Build" },
        });
        const track = wrapper.find(".glass-track");

        expect(track.attributes("aria-valuetext")).toBe("50% · Build");

        await track.trigger("keydown", { key: "Home" });
        await track.trigger("keydown", { key: "End" });

        expect(wrapper.emitted("update:modelValue")).toEqual([[0], [1]]);
    });
});
