import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import DarkModeToggle from "@glass/components/dark-mode-toggle/DarkModeToggle.vue";
import { useGlobalDark } from "@glass/composables/dark/useGlobalDark";

const dark = useGlobalDark();

describe("DarkModeToggle", () => {
    beforeEach(async () => {
        dark.isDark.value = false;
        dark.setDisableTransitions(false);
        await nextTick();
    });

    afterEach(() => {
        dark.isDark.value = false;
    });

    it("is one named native pressed command", async () => {
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

    it("uses the shared cancellable press response without a second command path", async () => {
        const wrapper = mount(DarkModeToggle);
        const button = wrapper.get("button");

        await nextTick();
        expect(button.attributes("data-press-armed")).toBe("");

        await button.trigger("pointerdown", { button: 0, pointerType: "touch" });
        await button.trigger("pointercancel");
        await button.trigger("click");
        expect(dark.isDark.value).toBe(true);
        wrapper.unmount();
    });
});
