import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import FadingScroll from "@glass/components/fading-scroll/FadingScroll.vue";
import { normalizeHorizontalScrollLeft } from "@glass/components/fading-scroll/composables/useFadingScroll";

describe("FadingScroll", () => {
    it("creates a region only when the caller names the scroll port", () => {
        const unnamed = mount(FadingScroll);
        expect(unnamed.attributes("role")).toBeUndefined();
        expect(unnamed.attributes("aria-label")).toBeUndefined();
        expect(unnamed.attributes("tabindex")).toBe("0");

        const named = mount(FadingScroll, {
            props: { ariaLabel: "Filter choices" },
        });
        expect(named.attributes()).toMatchObject({
            role: "region",
            "aria-label": "Filter choices",
        });
    });

    it("normalizes every horizontal RTL scrollLeft model from inline-start", () => {
        expect(normalizeHorizontalScrollLeft(40, 100, "ltr", "negative")).toBe(40);
        expect(normalizeHorizontalScrollLeft(-40, 100, "rtl", "negative")).toBe(40);
        expect(
            normalizeHorizontalScrollLeft(40, 100, "rtl", "positive-ascending"),
        ).toBe(40);
        expect(
            normalizeHorizontalScrollLeft(60, 100, "rtl", "positive-descending"),
        ).toBe(40);
    });
});
