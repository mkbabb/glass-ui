import { readFileSync } from "node:fs";
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

// THE ORIGIN-RECT SEAM. The root accepts the rect the expandable-container fold will
// grow the plate from, so that fold wires an entrance rather than re-cutting this
// signature. Nothing reads it yet and the spec says so ("one prop-shaped hole, no
// machinery") — what is gated is the hole's SHAPE, which stays true after the fold
// lands: the root declares it, and it never reaches the DOM as a stringified rect.
describe("Dialog root — the origin-rect seam", () => {
    it("declares the rect on the ROOT, typed", () => {
        const source = readFileSync("src/components/dialog/Dialog.vue", "utf8");
        expect(source).toMatch(/origin\?:\s*DOMRectReadOnly\s*\|\s*null/);
    });

    it("never forwards it into the DOM", async () => {
        const origin = new DOMRect(120, 240, 320, 180);
        const Host = defineComponent(() => () =>
            h(Dialog, { open: true, origin }, () =>
                h(DialogContent, { id: "origin-dialog" }, () => [
                    h(DialogTitle, null, () => "Title"),
                    h(DialogDescription, null, () => "Description"),
                ]),
            ),
        );
        const wrapper = mount(Host, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();

        expect(document.getElementById("origin-dialog")).not.toBeNull();
        expect(document.querySelector("[origin]")).toBeNull();
        expect(document.body.innerHTML).not.toContain("DOMRect");
        wrapper.unmount();
    });
});
