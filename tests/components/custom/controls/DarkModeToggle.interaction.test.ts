import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import DarkModeToggle from "@glass/components/controls/DarkModeToggle.vue";
import { useGlobalDark } from "@glass/composables/dark/useGlobalDark";

const dark = useGlobalDark();

describe("DarkModeToggle eclipse keyboard interaction", () => {
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
});
