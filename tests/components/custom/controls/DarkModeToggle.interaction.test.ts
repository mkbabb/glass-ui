import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DarkModeToggle from "@glass/components/controls/DarkModeToggle.vue";
import { useGlobalDark } from "@glass/composables/dark/useGlobalDark";

const dark = useGlobalDark();

describe("DarkModeToggle interaction", () => {
    beforeEach(async () => {
        vi.useFakeTimers();
        dark.isDark.value = false;
        dark.setDisableTransitions(false);
        await nextTick();
    });

    afterEach(() => {
        dark.isDark.value = false;
        vi.clearAllTimers();
        vi.useRealTimers();
    });

    it("is one named native toggle command", async () => {
        const wrapper = mount(DarkModeToggle, { attachTo: document.body });
        const button = wrapper.get("button");

        expect(button.attributes("type")).toBe("button");
        expect(button.attributes("aria-label")).toBe("Switch to dark mode");
        expect(button.attributes("aria-pressed")).toBe("false");

        button.element.focus();
        expect(document.activeElement).toBe(button.element);

        await button.trigger("click");
        expect(button.attributes("aria-label")).toBe("Switch to light mode");
        expect(button.attributes("aria-pressed")).toBe("true");

        await button.trigger("click");
        expect(dark.isDark.value).toBe(false);
        wrapper.unmount();
    });

    it("toggles once for a short Space activation", async () => {
        const wrapper = mount(DarkModeToggle, { props: { eclipse: true } });
        const button = wrapper.get("button");

        await button.trigger("keydown", { key: " " });
        await button.trigger("keyup", { key: " " });
        await button.trigger("click");

        expect(dark.isDark.value).toBe(true);
        wrapper.unmount();
    });

    it("toggles once for a held Space and swallows its trailing click", async () => {
        const wrapper = mount(DarkModeToggle, { props: { eclipse: true } });
        const button = wrapper.get("button");

        await button.trigger("keydown", { key: " " });
        vi.advanceTimersByTime(460);
        await nextTick();
        expect(dark.isDark.value).toBe(true);

        await button.trigger("keyup", { key: " " });
        await button.trigger("click");
        expect(dark.isDark.value).toBe(true);

        wrapper.unmount();
    });

    it("uses the same eclipse path for touch pointers", async () => {
        const wrapper = mount(DarkModeToggle, { props: { eclipse: true } });
        const button = wrapper.get("button");

        await button.trigger("pointerdown", { pointerType: "touch" });
        vi.advanceTimersByTime(460);
        await nextTick();

        expect(dark.isDark.value).toBe(true);
        expect(button.attributes("data-eclipsing")).toBe("true");

        await button.trigger("pointerup", { pointerType: "touch" });
        await button.trigger("click");
        expect(dark.isDark.value).toBe(true);
        wrapper.unmount();
    });
});
