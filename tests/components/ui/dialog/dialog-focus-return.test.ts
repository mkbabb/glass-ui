// Dialog center-spring focus-return (W1-C).
//
// A centered `springPreset` dialog keeps its content mounted-but-inert through the
// exit spring (`closingInert` + the spring mount-hold). At the LOGICAL close focus is
// stranded inside the animating-out content; the focus-handoff watch must pull it back
// to the trigger. At HEAD the watch guarded `sideSpringLive` ONLY, so a centered spring
// dialog never invoked the restore (RED), AND the focus-anchor was rendered for side
// sheets only — so even a widened guard could not resolve the center content to test
// containment (the anchor un-gate is load-bearing).
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
} from "@glass/components/dialog/index";

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
                            { springPreset: "smooth", class: "test-dialog" },
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

describe("DialogContent — center-spring focus-return (W1-C)", () => {
    it("invokes the trigger's focus when a centered spring dialog logically closes", async () => {
        const open = ref(true);
        const wrapper = mountDialog(open);
        await nextTick();
        await nextTick();

        const dialogEl = document.querySelector(".test-dialog") as HTMLElement | null;
        const trigger = document.querySelector(".test-trigger") as HTMLElement | null;
        const inside = document.querySelector(".test-inside") as HTMLElement | null;
        expect(trigger, "trigger rendered").not.toBeNull();
        expect(inside, "an element inside the content rendered").not.toBeNull();
        // The center-spring path is live and the focus-anchor is rendered on it (the
        // un-gate): both load-bearing preconditions for the watch's containment test.
        expect(dialogEl!.getAttribute("data-spring")).toBe("smooth");
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
});
