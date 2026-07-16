import { flushPromises, mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";

import CodeBlock from "../../demo/chassis/code/CodeBlock.vue";
import CardExample from "../../demo/examples/CardExample.vue";
import cardExampleSource from "../../demo/examples/CardExample.vue?raw";
import ConfiguratorExample from "../../demo/examples/ConfiguratorExample.vue";
import configuratorExampleSource from "../../demo/examples/ConfiguratorExample.vue?raw";
import ToasterExample from "../../demo/examples/ToasterExample.vue";
import toasterExampleSource from "../../demo/examples/ToasterExample.vue?raw";

const originalClipboard = Object.getOwnPropertyDescriptor(navigator, "clipboard");

function setClipboard(writeText: (text: string) => Promise<void>): void {
    Object.defineProperty(navigator, "clipboard", {
        configurable: true,
        value: { writeText },
    });
}

afterEach(() => {
    if (originalClipboard)
        Object.defineProperty(navigator, "clipboard", originalClipboard);
    else delete (navigator as unknown as { clipboard?: Clipboard }).clipboard;
    vi.restoreAllMocks();
});

describe("CodeBlock source fidelity", () => {
    it.each([
        [CardExample, cardExampleSource, "@glass/components/card"],
        [
            ConfiguratorExample,
            configuratorExampleSource,
            "@glass/components/configurator",
        ],
        [ToasterExample, toasterExampleSource, "@glass/components/toast"],
    ])(
        "imports one Vue module as both runtime and raw source",
        (component, source, publicImport) => {
            expect(component).toBeTruthy();
            expect(source).toContain(publicImport);
            expect(source).toContain("<template>");
        },
    );
});

describe("CodeBlock copy outcome", () => {
    it("shows and announces success from the actual copy button", async () => {
        const writeText = vi.fn().mockResolvedValue(undefined);
        setClipboard(writeText);
        const wrapper = mount(CodeBlock, {
            props: { code: "  const answer = 42;  ", lang: "ts" },
        });

        await wrapper.get('[data-testid="code-block-copy"]').trigger("click");
        await flushPromises();

        expect(writeText).toHaveBeenCalledWith("const answer = 42;");
        const status = wrapper.get('[role="status"]');
        expect(status.attributes("aria-live")).toBe("polite");
        expect(status.text()).toBe("Code copied.");
        expect(
            wrapper.get('[data-testid="code-block-copy"]').attributes("aria-label"),
        ).toBe("Code copied");
    });

    it("shows, announces, and reports Clipboard denial", async () => {
        const denied = new Error("Permission denied");
        setClipboard(vi.fn().mockRejectedValue(denied));
        const report = vi.spyOn(console, "error").mockImplementation(() => undefined);
        const wrapper = mount(CodeBlock, { props: { code: "const denied = true;" } });

        await wrapper.get('[data-testid="code-block-copy"]').trigger("click");
        await flushPromises();

        const status = wrapper.get('[role="status"]');
        expect(status.text()).toBe("Copy failed. Select the code and copy manually.");
        expect(
            wrapper.get('[data-testid="code-block-copy"]').attributes("aria-label"),
        ).toBe("Retry copy code");
        expect(report).toHaveBeenCalledWith("[CodeBlock] Failed to copy code.", denied);
    });

    it("offers manual copy when Clipboard is unavailable", async () => {
        Object.defineProperty(navigator, "clipboard", {
            configurable: true,
            value: undefined,
        });
        const report = vi.spyOn(console, "error").mockImplementation(() => undefined);
        const wrapper = mount(CodeBlock, { props: { code: "const manual = true;" } });

        await wrapper.get('[data-testid="code-block-copy"]').trigger("click");
        await flushPromises();

        expect(wrapper.get('[role="status"]').text()).toBe(
            "Copy failed. Select the code and copy manually.",
        );
        expect(
            wrapper.get('[data-testid="code-block-copy"]').attributes("aria-label"),
        ).toBe("Retry copy code");
        expect(report).toHaveBeenCalledWith(
            "[CodeBlock] Failed to copy code.",
            expect.objectContaining({ message: "Clipboard API is unavailable" }),
        );
    });
});
