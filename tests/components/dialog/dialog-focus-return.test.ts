// Dialog center-spring focus-return (W1-C).
//
// A centred dialog keeps its content mounted-but-inert through the
// exit spring (`closingInert` + the spring mount-hold). At the LOGICAL close focus is
// stranded inside the animating-out content; the focus-handoff watch must pull it back
// to the trigger. The anchor's presence is load-bearing: without it the watch cannot
// resolve the live content root to test containment.
//
// We assert the watch INVOKES the trigger's focus at logical close (a `{flush:"sync"}`
// same-tick call). happy-dom's `inert` does not stop reka's FocusScope from re-capturing
// focus into the still-mounted content, so the FINAL activeElement is unreliable here —
// the real inert-bounce→settle choreography is browser-captured (the band's π
// LIVE-DEFER). The invoke IS the load-bearing contract.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { describe, expect, it, vi } from "vitest";

import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog";
import { registerShortcut } from "@glass/composables/keyboard";

function mountDialog(open: ReturnType<typeof ref<boolean>>) {
    const Host = defineComponent({
        setup() {
            return () =>
                h(
                    Dialog,
                    { open: open.value, "onUpdate:open": (v: boolean) => (open.value = v) },
                    () => [
                        h(DialogTrigger, { class: "test-trigger" }, () => "open"),
                        h(
                            DialogContent,
                            { class: "test-dialog" },
                            () => [
                                h(DialogTitle, { class: "sr-only" }, () => "Test dialog"),
                                h(DialogDescription, { class: "sr-only" }, () => "Focus-return fixture."),
                                h(DialogClose, { class: "test-inside" }, () => "inside"),
                            ],
                        ),
                    ],
                );
        },
    });
    // Opt out of the teleport stub so the portaled DialogContent lands in
    // document.body (the dialog-spring idiom), where `.focus()` drives activeElement.
    return mount(Host, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
    });
}

describe("DialogContent — focus-return (W1-C)", () => {
    it("invokes the trigger's focus when the dialog logically closes", async () => {
        const open = ref(true);
        const wrapper = mountDialog(open);
        await nextTick();
        await nextTick();

        const dialogEl = document.querySelector(".test-dialog") as HTMLElement | null;
        const trigger = document.querySelector(".test-trigger") as HTMLElement | null;
        const inside = document.querySelector(".test-inside") as HTMLElement | null;
        expect(trigger, "trigger rendered").not.toBeNull();
        expect(inside, "an element inside the content rendered").not.toBeNull();
        // The spring path is live and the focus-anchor is rendered on it: both
        // load-bearing preconditions for the watch's containment test. AMENDED by
        // W-DIALOG — the spring is UNCONDITIONAL now (the `springPreset` opt-in that
        // used to arm it is deleted), so the precondition is that the plate carries a
        // spring style at all rather than that it advertises a chosen register.
        expect(dialogEl!.style.opacity).not.toBe("");
        expect(dialogEl!.querySelectorAll("span[hidden]").length).toBeGreaterThan(0);

        // Strand focus inside the (about-to-close) content — the exit-spring window.
        inside!.focus();
        const focusSpy = vi.spyOn(trigger!, "focus");

        // Logical close — the sync focus-handoff watch fires same-tick.
        open.value = false;
        await nextTick();

        expect(focusSpy).toHaveBeenCalled();

        // The held-closed springed portal cannot be torn down under the frozen rAF
        // stub; the crash is env-only (asserted contract above). Swallow + neutralize
        // the enableAutoUnmount retry (file-isolated — nothing leaks onward).
        try {
            wrapper.unmount();
        } catch {
            /* happy-dom teleport-fragment teardown quirk, not a product defect */
        }
        wrapper.unmount = () => {};
    });

    // The MODAL KEYBOARD BARRIER, witnessed through a real mount (O-26 R-8 (e)).
    // `useModalShortcutBarrier` is wired in DialogContent's setup; the only way to
    // see it act is to register an app binding BEFORE the plate opens and watch it
    // go quiet, come back at the close, and come back again when the plate is torn
    // down while still open.
    it("suspends the app's accelerators while the modal plate is open", async () => {
        const spy = vi.fn();
        const unregister = registerShortcut("k", spy);
        const press = () =>
            window.dispatchEvent(new KeyboardEvent("keydown", { key: "k", cancelable: true }));

        try {
            const open = ref(true);
            const wrapper = mountDialog(open);
            await nextTick();
            await nextTick();

            // Registered before the barrier: seq <= topBarrier, so it is quiet.
            press();
            expect(spy).not.toHaveBeenCalled();

            // Logical close releases the barrier even though the content is still
            // mounted under the exit spring.
            open.value = false;
            await nextTick();
            await nextTick();
            press();
            expect(spy).toHaveBeenCalledTimes(1);

            try {
                wrapper.unmount();
            } catch {
                /* happy-dom teleport-fragment teardown quirk, not a product defect */
            }
            wrapper.unmount = () => {};

            // Torn down WHILE OPEN — the scope-dispose arm has to release too, or the
            // app's keyboard never comes back.
            const stillOpen = ref(true);
            const second = mountDialog(stillOpen);
            await nextTick();
            await nextTick();
            try {
                second.unmount();
            } catch {
                /* same teardown quirk */
            }
            second.unmount = () => {};
            await nextTick();

            press();
            expect(spy).toHaveBeenCalledTimes(2);
        } finally {
            unregister();
        }
    });
});
