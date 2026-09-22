// O-32 §3.2—the Sheet pair of the dialog-attrs witness. A sheet is a dialog by root,
// so its role=dialog node takes aria-modal from the same `modal` flag: "true" while
// modal, absent on :modal="false".

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { afterEach, describe, expect, it } from "vitest";

import { SheetContent } from "@glass/components/sheet";
import { Dialog, DialogDescription, DialogTitle } from "@glass/components/dialog";

async function mountSheet(modal: boolean | undefined) {
    const Host = defineComponent(() => () =>
        h(Dialog, { open: true, ...(modal === undefined ? {} : { modal }) }, () =>
            h(SheetContent, { id: "modal-sheet", side: "right" }, () => [
                h(DialogTitle, { class: "sr-only" }, () => "Sheet"),
                h(DialogDescription, { class: "sr-only" }, () => "Sheet attrs fixture."),
            ]),
        ),
    );
    const wrapper = mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
    await nextTick();
    await nextTick();
    mounted.push(wrapper);
}

const mounted: { unmount(): void }[] = [];
afterEach(() => {
    for (const wrapper of mounted.splice(0)) wrapper.unmount();
});

describe("SheetContent — aria-modal follows the root's modal flag", () => {
    it("stamps aria-modal=\"true\" on a modal sheet (the default)", async () => {
        await mountSheet(undefined);
        const content = document.getElementById("modal-sheet")!;
        expect(content.getAttribute("role")).toBe("dialog");
        expect(content.getAttribute("aria-modal")).toBe("true");
    });

    it("omits aria-modal on :modal=\"false\"", async () => {
        await mountSheet(false);
        const content = document.getElementById("modal-sheet")!;
        expect(content.hasAttribute("aria-modal")).toBe(false);
    });
});
