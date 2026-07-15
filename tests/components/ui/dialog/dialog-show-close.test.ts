// AU.W9.C — Dialog showClose prop.
//
// Validates the surface contract: the default mount renders the built-in
// top-right close (X) button (byte-identical to the pre-W9 unconditional
// DialogClose); `showClose={false}` suppresses it so a consumer composing its
// own header / dismiss control (e.g. a hand-composed access modal) does not
// double-up the X.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it } from "vitest";

import { Dialog, DialogContent, DialogTrigger } from "@glass/components/dialog/index";

function mountDialog(showClose?: boolean) {
    const Host = defineComponent({
        components: { Dialog, DialogContent, DialogTrigger },
        setup() {
            return () =>
                h(Dialog, { open: true }, () => [
                    h(DialogTrigger, () => "open"),
                    h(
                        DialogContent,
                        {
                            ...(showClose !== undefined ? { showClose } : {}),
                            class: "test-dialog",
                        },
                        () => h("p", "body"),
                    ),
                ]);
        },
    });
    // tests/setup.ts stubs `<teleport>` by default; opt out per-mount so the
    // portaled DialogContent ends up in `document.body` where reka-ui puts it.
    return mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
}

function findDialog(): HTMLElement | null {
    return document.querySelector(".test-dialog") as HTMLElement | null;
}

// The built-in close carries a screen-reader label; query on it so the assert
// is independent of the X glyph's markup.
function hasCloseButton(root: HTMLElement): boolean {
    return Array.from(root.querySelectorAll(".sr-only")).some(
        (el) => el.textContent === "Close",
    );
}

describe("DialogContent — AU.W9.C showClose prop", () => {
    it("renders the built-in close button by default (showClose unset)", async () => {
        const wrapper = mountDialog();
        await nextTick();
        await nextTick();
        const portal = findDialog();
        expect(portal).not.toBeNull();
        expect(hasCloseButton(portal!)).toBe(true);
        wrapper.unmount();
    });

    it("renders the built-in close button when showClose=true", async () => {
        const wrapper = mountDialog(true);
        await nextTick();
        await nextTick();
        const portal = findDialog();
        expect(portal).not.toBeNull();
        expect(hasCloseButton(portal!)).toBe(true);
        wrapper.unmount();
    });

    it("renders NO close button when showClose=false", async () => {
        const wrapper = mountDialog(false);
        await nextTick();
        await nextTick();
        const portal = findDialog();
        expect(portal).not.toBeNull();
        expect(hasCloseButton(portal!)).toBe(false);
        wrapper.unmount();
    });
});
