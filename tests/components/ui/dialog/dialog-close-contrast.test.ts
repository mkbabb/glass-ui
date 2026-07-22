// Dialog close-X open-state ink contrast (W3-B).
//
// The built-in close carried `data-[state=open]:text-muted-foreground` on a
// `bg-accent` plate — muted-on-accent computes 3.66 opaque (2.34 effective under the
// compounding `opacity-70`), under the 3.0 non-text floor, and the open state is
// persistent. The seat re-inks onto the designed AA pair for `bg-accent`:
// `text-accent-foreground`. Bite: restore the muted ink and this reddens.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it } from "vitest";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog/index";

function mountDialog() {
    const Host = defineComponent({
        setup() {
            return () =>
                h(Dialog, { open: true }, () => [
                    h(DialogTrigger, () => "open"),
                    h(DialogContent, { class: "test-dialog" }, () => [
                        h(DialogTitle, { class: "sr-only" }, () => "Test dialog"),
                        h(DialogDescription, { class: "sr-only" }, () => "Close-contrast fixture."),
                        h("p", "body"),
                    ]),
                ]);
        },
    });
    return mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
}

function findCloseButton(): HTMLElement | null {
    const portal = document.querySelector(".test-dialog") as HTMLElement | null;
    if (!portal) return null;
    const label = Array.from(portal.querySelectorAll(".sr-only")).find(
        (el) => el.textContent === "Close",
    );
    return (label?.closest("button") as HTMLElement | null) ?? null;
}

describe("DialogContent — close-X open-state ink (W3-B)", () => {
    it("does not paint the low-contrast muted ink on the open-state seat", async () => {
        const wrapper = mountDialog();
        await nextTick();
        await nextTick();
        const close = findCloseButton();
        expect(close, "close button rendered").not.toBeNull();
        expect(close!.className).not.toContain("text-muted-foreground");
        wrapper.unmount();
    });

    it("re-inks the open-state seat onto the accent-foreground AA pair", async () => {
        const wrapper = mountDialog();
        await nextTick();
        await nextTick();
        const close = findCloseButton();
        expect(close, "close button rendered").not.toBeNull();
        expect(close!.className).toContain("data-[state=open]:text-accent-foreground");
        wrapper.unmount();
    });
});
