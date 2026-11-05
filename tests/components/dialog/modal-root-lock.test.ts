// B7c C3-1: a modal dialog holds the page through the root, never through `body`.
//
// The atlas homepage school finder (a modal CommandDialog) set `body` overflow to
// hidden in 4 of 4 cells per engine (B7B-DOCK O-11): reka's DialogOverlay takes
// `useBodyScrollLock`, which writes `overflow: hidden`, padding and pointer-events onto
// `body` and blanks `body` pointer-events on release. reka's DismissableLayer still sets
// `body` pointer-events to none while a modal is open; that block is modal semantics and
// stays, and with the body lock gone the consumer's own value comes back on close. Under a consumer root with `overflow-x: clip` that makes `body` the scroller,
// so sticky elements drop and the page can jump on release. The glass scrim now takes
// the one counted root lock, shared with ExpandableContainer.
import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, h, nextTick, ref, type Ref } from "vue";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@glass/components/dialog";
import { SheetContent } from "@glass/components/sheet";
import { ExpandableContainer } from "@glass/components/expandable-container";

async function settle(): Promise<void> {
    for (let i = 0; i < 4; i++) {
        await nextTick();
        await new Promise((resolve) => setTimeout(resolve, 0));
    }
}

function modalHost(kind: "dialog" | "sheet", open: Ref<boolean>) {
    return defineComponent(() => () =>
        h(
            Dialog,
            { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v) },
            () =>
                h(kind === "sheet" ? SheetContent : DialogContent, null, () => [
                    h(DialogTitle, () => "Find a school unit"),
                    h(DialogDescription, () => "Search"),
                ]),
        ),
    );
}

const mountOpts = { attachTo: document.body, global: { stubs: { teleport: false } } };

/** Close, then wait out the scrim's spring exit (the sheet's panel preset). */
async function closeAndSettle(open: Ref<boolean>): Promise<void> {
    open.value = false;
    await settle();
    await new Promise((resolve) => setTimeout(resolve, 2500));
    await settle();
}

afterEach(() => {
    document.body.innerHTML = "";
    document.body.removeAttribute("style");
    document.documentElement.removeAttribute("style");
});

describe("modal scroll lock", () => {
    it.each(["dialog", "sheet"] as const)(
        "a modal %s leaves body alone and holds the root while open",
        async (kind) => {
            document.documentElement.style.overflow = "clip";
            const open = ref(false);
            const wrapper = mount(modalHost(kind, open), mountOpts);

            open.value = true;
            await settle();
            expect(document.querySelector('[data-state="open"]')).not.toBeNull();
            expect(document.body.style.overflow).toBe("");
            expect(document.body.style.paddingRight).toBe("");
            expect(document.documentElement.style.overflow).toBe("hidden");

            await closeAndSettle(open);
            expect(document.body.style.overflow).toBe("");
            // The consumer's own inline root value comes back, not a blank.
            expect(document.documentElement.style.overflow).toBe("clip");
            wrapper.unmount();
        },
        10_000,
    );

    // The one body write a modal keeps is reka's DismissableLayer outside-pointer block
    // (modal semantics: the page behind is not clickable). It must be the layer's write
    // alone, so the consumer's own inline value comes back on close, not a blank.
    it.each(["dialog", "sheet"] as const)(
        "a modal %s blocks outside pointers on body and restores the consumer value",
        async (kind) => {
            document.body.style.pointerEvents = "auto";
            const open = ref(false);
            const wrapper = mount(modalHost(kind, open), mountOpts);

            open.value = true;
            await settle();
            expect(document.querySelector('[data-state="open"]')).not.toBeNull();
            expect(document.body.style.pointerEvents).toBe("none");
            expect(document.body.style.overflow).toBe("");

            await closeAndSettle(open);
            expect(document.body.style.pointerEvents).toBe("auto");
            expect(document.body.style.overflow).toBe("");
            wrapper.unmount();
        },
        10_000,
    );

    it("composes with ExpandableContainer closed out of order (U-F04)", async () => {
        const expand = mount(ExpandableContainer, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
            slots: { default: () => h("p", "panel") },
        });
        const open = ref(false);
        const dialog = mount(modalHost("dialog", open), mountOpts);

        await expand.get('[data-mode="expand"]').trigger("click");
        await nextTick();
        open.value = true;
        await settle();
        expect(document.documentElement.style.overflow).toBe("hidden");

        // The container closes first; the dialog still holds the page.
        document.querySelector<HTMLElement>('[data-mode="collapse"]')?.click();
        await settle();
        expect(document.documentElement.style.overflow).toBe("hidden");

        await closeAndSettle(open);
        expect(document.documentElement.style.overflow).toBe("");
        expect(document.body.style.overflow).toBe("");
        dialog.unmount();
        expand.unmount();
    }, 10_000);
});
