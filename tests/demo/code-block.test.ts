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

function deferred<T>() {
    let resolve!: (value: T | PromiseLike<T>) => void;
    const promise = new Promise<T>((resolvePromise) => {
        resolve = resolvePromise;
    });
    return { promise, resolve };
}

afterEach(() => {
    vi.useRealTimers();
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
        setClipboard(vi.fn().mockRejectedValue(new Error("Permission denied")));
        const wrapper = mount(CodeBlock, { props: { code: "const denied = true;" } });

        await wrapper.get('[data-testid="code-block-copy"]').trigger("click");
        await flushPromises();

        const status = wrapper.get('[role="status"]');
        expect(status.text()).toBe("Copy failed. Select the code and copy manually.");
        expect(
            wrapper.get('[data-testid="code-block-copy"]').attributes("aria-label"),
        ).toBe("Retry copy code");
    });

    it("offers manual copy when Clipboard is unavailable", async () => {
        Object.defineProperty(navigator, "clipboard", {
            configurable: true,
            value: undefined,
        });
        const wrapper = mount(CodeBlock, { props: { code: "const manual = true;" } });

        await wrapper.get('[data-testid="code-block-copy"]').trigger("click");
        await flushPromises();

        expect(wrapper.get('[role="status"]').text()).toBe(
            "Copy failed. Select the code and copy manually.",
        );
        expect(
            wrapper.get('[data-testid="code-block-copy"]').attributes("aria-label"),
        ).toBe("Retry copy code");
    });

    it("guards repeated activation without removing the focused button", async () => {
        const pending = deferred<void>();
        const writeText = vi.fn(() => pending.promise);
        setClipboard(writeText);
        const wrapper = mount(CodeBlock, {
            props: { code: "const once = true;" },
            attachTo: document.body,
        });
        const button = wrapper.get('[data-testid="code-block-copy"]');
        (button.element as HTMLElement).focus();

        await button.trigger("click");
        await button.trigger("click");

        expect(writeText).toHaveBeenCalledOnce();
        expect(button.attributes("aria-disabled")).toBe("true");
        expect(button.attributes("disabled")).toBeUndefined();
        expect(document.activeElement).toBe(button.element);
        expect(wrapper.get('[role="status"]').text()).toBe("Copying code…");

        pending.resolve();
        await flushPromises();
        expect(button.attributes("aria-label")).toBe("Code copied");
        wrapper.unmount();
    });

    it("invalidates a pending result when the rendered payload changes", async () => {
        const pending = deferred<void>();
        const writeText = vi.fn(() => pending.promise);
        setClipboard(writeText);
        const wrapper = mount(CodeBlock, { props: { code: "const oldValue = 1;" } });
        const button = wrapper.get('[data-testid="code-block-copy"]');

        await button.trigger("click");
        expect(writeText).toHaveBeenCalledWith("const oldValue = 1;");
        await wrapper.setProps({ code: "const newValue = 2;" });

        expect(button.attributes("aria-label")).toBe("Copy code");
        expect(button.attributes("aria-disabled")).toBeUndefined();
        expect(wrapper.get('[role="status"]').text()).toBe("");

        pending.resolve();
        await flushPromises();
        expect(button.attributes("aria-label")).toBe("Copy code");
        expect(wrapper.get('[role="status"]').text()).toBe("");
    });
});
