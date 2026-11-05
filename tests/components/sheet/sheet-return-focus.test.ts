// U/B7b L (O-11, O-19): a closing sheet returns focus without scrolling the page.
//
// reka's modal content answers its close-auto-focus with a bare `triggerElement.focus()`. In WebKit a
// clicked button takes no focus, so reka records the nearest focusable ancestor (a figure plate) as the
// trigger, and the bare focus scrolls the page to it: the served B7b census measured the phone
// "Source & method" sheet moving the page up 16 to 1,384 px on close in 36 of 156 disclosures. Glass
// owns the return: every focus the close hands back carries `preventScroll`.
//
// RED before: reka's own return calls `focus()` with no options.
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { describe, expect, it, vi } from "vitest";

import { Dialog, DialogDescription, DialogTitle, DialogTrigger } from "@glass/components/dialog";
import { SheetContent } from "@glass/components/sheet";

describe("SheetContent returns focus without a scroll", () => {
    it("every focus handed back on close carries preventScroll", async () => {
        const shown = ref(true);
        const Host = defineComponent(() => () =>
            h(Dialog, { open: true }, () => [
                h(DialogTrigger, { class: "t-trigger" }, () => "open"),
                shown.value
                    ? h(SheetContent, { side: "bottom", class: "t-sheet" }, () => [
                          h(DialogTitle, { class: "sr-only" }, () => "Sheet"),
                          h(DialogDescription, { class: "sr-only" }, () => "Return-focus fixture."),
                          h("button", { class: "t-inside" }, "inside"),
                      ])
                    : null,
            ]),
        );
        const wrapper = mount(Host, { attachTo: document.body, global: { stubs: { teleport: false } } });
        await nextTick();
        await nextTick();
        const trigger = document.querySelector<HTMLElement>(".t-trigger")!;
        (document.querySelector(".t-inside") as HTMLElement | null)?.focus();
        const calls: unknown[][] = [];
        const orig = HTMLElement.prototype.focus;
        const spy = vi.spyOn(trigger, "focus").mockImplementation(function (this: HTMLElement, ...args: unknown[]) {
            calls.push(args);
            return orig.apply(this, args as [FocusOptions?]);
        });
        shown.value = false;
        for (let i = 0; i < 4; i++) await nextTick();
        await new Promise((r) => setTimeout(r, 20));
        spy.mockRestore();
        expect(calls.length, "the close hands focus back to the trigger").toBeGreaterThan(0);
        for (const args of calls) expect(args[0], "focus options").toMatchObject({ preventScroll: true });
        try {
            wrapper.unmount();
        } catch {
            /* happy-dom teleport teardown quirk */
        }
    });
});
