import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it, vi } from "vitest";
import { h, nextTick } from "vue";
import { ToastAction, Toaster, toast, useToast } from "@glass/components/toast";

const mounted: Array<ReturnType<typeof mount>> = [];

afterEach(() => {
    while (mounted.length) mounted.pop()?.unmount();
    useToast().dismiss();
});

describe("Toaster imperative contract", () => {
    it("renders one public action, patches through its id-bound handle, and closes once", async () => {
        const wrapper = mount(Toaster, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        mounted.push(wrapper);
        const perform = vi.fn();
        const action = h(
            ToastAction,
            { altText: "Undo archive", onClick: perform },
            () => "Undo",
        );

        const handle = toast({
            title: "Message archived",
            description: "Moved to archive.",
            duration: Number.POSITIVE_INFINITY,
            action,
        });
        await nextTick();

        const renderedToast =
            document.body.querySelector<HTMLElement>('[data-slot="toast"]')!;
        expect(renderedToast.dataset.state).toBe("open");
        expect(useToast()).not.toHaveProperty("toasts");
        expect(renderedToast.hasAttribute("id")).toBe(false);
        expect(renderedToast.hasAttribute("title")).toBe(false);
        expect(renderedToast.hasAttribute("description")).toBe(false);
        expect(renderedToast.hasAttribute("action")).toBe(false);
        expect(
            Array.from(document.body.querySelectorAll("button")).filter(
                (button) => button.textContent === "Undo",
            ),
        ).toHaveLength(1);

        handle.update({ title: "Message archived successfully" });
        await nextTick();
        expect(document.body.textContent).toContain("Message archived successfully");
        expect(document.body.textContent).toContain("Moved to archive.");
        expect(
            Array.from(document.body.querySelectorAll("button")).filter(
                (button) => button.textContent === "Undo",
            ),
        ).toHaveLength(1);

        Array.from(document.body.querySelectorAll("button"))
            .find((button) => button.textContent === "Undo")!
            .click();
        await nextTick();
        expect(perform).toHaveBeenCalledTimes(1);
        expect(renderedToast.dataset.state).toBe("closed");
    });
});
