import { afterEach, describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import { useTokenColor } from "../dom/useTokenColor";
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

    it("uses an injected resolver instead of the document read (DI seam for SSR/test)", () => {
        // The document HAS a value for this token; the injected resolver must
        // win, proving the seam bypasses the `document.documentElement` read.
        document.documentElement.style.setProperty("--test-token-color-a", "#fromdoc");

        const resolver = vi.fn(() => "#injected");
        const { result, unmount } = mountComposable(() =>
            useTokenColor("--test-token-color-a", { resolver }),
        );

        expect(result.value.value).toBe("#injected");
        expect(resolver).toHaveBeenCalledWith(
            "--test-token-color-a",
            document.documentElement,
        );

        unmount();
    });

    it("falls back when an injected resolver returns empty", () => {
        const resolver = vi.fn(() => "   ");
        const { result, unmount } = mountComposable(() =>
            useTokenColor("--test-token-color-a", { resolver, fallback: "#fb" }),
        );

        expect(result.value.value).toBe("#fb");

        unmount();
    });
});
