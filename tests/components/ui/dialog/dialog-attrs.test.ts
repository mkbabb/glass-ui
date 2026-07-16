import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it, vi } from "vitest";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@glass/components/dialog";

describe("DialogContent attributes", () => {
    it("forwards consumer attributes and DOM listeners to the content element", async () => {
        const onPointerdown = vi.fn();
        const Host = defineComponent(() => () =>
            h(Dialog, { open: true }, () =>
                h(
                    DialogContent,
                    {
                        id: "attribute-dialog",
                        "data-owner": "consumer",
                        onPointerdown,
                    },
                    () => [
                        h(DialogTitle, null, () => "Title"),
                        h(DialogDescription, null, () => "Description"),
                    ],
                ),
            ),
        );
        const wrapper = mount(Host, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        const content = document.getElementById("attribute-dialog")!;
        expect(content.getAttribute("data-owner")).toBe("consumer");
        content.dispatchEvent(new Event("pointerdown", { bubbles: true }));
        expect(onPointerdown).toHaveBeenCalledOnce();
        wrapper.unmount();
    });
});
