import { afterEach, describe, expect, it } from "vitest";
import { ref } from "vue";
import { useTokenColor } from "../useTokenColor";
import { mountComposable } from "../../../tests/utils/mountComposable";

describe("useTokenColor", () => {
    const testTokens = ["--test-token-color-a", "--test-token-color-b"];

    afterEach(() => {
        for (const token of testTokens) {
            document.documentElement.style.removeProperty(token);
        }
        document.documentElement.classList.remove("dark");
    });

    it("resolves a CSS custom property to its trimmed value", () => {
        document.documentElement.style.setProperty("--test-token-color-a", "  #112233  ");

        const { result, unmount } = mountComposable(() =>
            useTokenColor("--test-token-color-a"),
        );

        expect(result.value.value).toBe("#112233");

        unmount();
    });

    it("returns the fallback when the property is unset", () => {
        const { result, unmount } = mountComposable(() =>
            useTokenColor("--test-token-color-unset", { fallback: "#000" }),
        );

        expect(result.value.value).toBe("#000");

        unmount();
    });

    it("re-resolves when the token name argument changes", async () => {
        document.documentElement.style.setProperty("--test-token-color-a", "#aaa");
        document.documentElement.style.setProperty("--test-token-color-b", "#bbb");

        const tokenName = ref<string>("--test-token-color-a");

        const { result, unmount } = mountComposable(() =>
            useTokenColor(() => tokenName.value),
        );

        expect(result.value.value).toBe("#aaa");

        tokenName.value = "--test-token-color-b";
        // Watcher fires synchronously on the next microtask flush.
        await Promise.resolve();
        expect(result.value.value).toBe("#bbb");

        unmount();
    });

    it("refresh() re-reads the resolved value after a manual cascade mutation", () => {
        document.documentElement.style.setProperty("--test-token-color-a", "#aaa");

        const { result, unmount } = mountComposable(() =>
            useTokenColor("--test-token-color-a"),
        );

        expect(result.value.value).toBe("#aaa");

        document.documentElement.style.setProperty("--test-token-color-a", "#ccc");
        // Custom-property writes don't fire change events; consumers re-read via refresh().
        result.refresh();
        expect(result.value.value).toBe("#ccc");

        unmount();
    });
});
