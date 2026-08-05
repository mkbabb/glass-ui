// Dialog spring entrance.
//
// AMENDED by W-DIALOG: the `springPreset` PROP is gone and the preset clauses die with
// it. MOTION-CANON gives the MODAL one curve, so there is nothing to choose — and the
// knob carried a real bug while it existed: the preset was captured NON-REACTIVELY at
// setup, so a live `prefers-reduced-motion` flip lost the bloom AND the spring. Deleting
// the knob deletes the bug's substrate, which is cheaper than a `watchEffect`.
//
// What stays is the ENTRANCE contract, which is the part that was never in question: the
// squish rides `scale:` on its own longhand channel, the opacity rides with it, and the
// centring rides `translate:` — authored in `dialog/styles.css` so it holds at
// `motion="off"`, where no spring style is written at all.

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it, vi } from "vitest";

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog";
import * as springMountModule from "@glass/composables/motion/spring/useSpringMount";

function mountDialog(props: Record<string, unknown> = {}) {
    const Host = defineComponent({
        setup() {
            return () =>
                h(Dialog, { open: true }, () => [
                    h(DialogTrigger, () => "open"),
                    h(DialogContent, { ...props, class: "test-dialog" }, () => [
                        h(DialogTitle, { class: "sr-only" }, () => "Test dialog"),
                        h(
                            DialogDescription,
                            { class: "sr-only" },
                            () => "Dialog motion fixture.",
                        ),
                        h("p", "body"),
                    ]),
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

const findDialog = (): HTMLElement | null =>
    document.querySelector(".test-dialog") as HTMLElement | null;

describe("DialogContent — spring entrance", () => {
    it("rides ONE curve, named once, with no consumer choice", async () => {
        const spy = vi.spyOn(springMountModule, "useSpringMount");
        try {
            const wrapper = mountDialog();
            expect(spy).toHaveBeenCalledWith(
                expect.objectContaining({ preset: "present" }),
            );
            await nextTick();
            wrapper.unmount();
        } finally {
            spy.mockRestore();
        }
    });

    it("writes the squish and the fade on their own longhand channels", async () => {
        const wrapper = mountDialog();
        await nextTick();
        await nextTick();
        const portal = findDialog();
        expect(portal).not.toBeNull();
        // `scale:` and `opacity` are the spring's; `transform: none` clears any utility
        // matrix so the longhands are the sole source. The centring `translate:` is the
        // stylesheet's — never composed into one matrix with the squish, which would
        // re-derive the −50% offset off the scaled box and drift the plate off centre.
        expect(portal!.style.transform).toBe("none");
        expect(portal!.style.opacity).not.toBe("");
        expect(portal!.style.translate).toBeFalsy();
        wrapper.unmount();
    });

    it("leaves the animation channel free for the rebuff", async () => {
        const wrapper = mountDialog();
        await nextTick();
        await nextTick();
        const portal = findDialog();
        // An `animation: none` leg here would silence the `locked` refusal. The plate
        // composes no `animate-in`/`animate-out` utility and no `.glass-reveal`, so
        // there is no keyframe to defeat and no reason to write one.
        expect(portal!.style.animation).toBeFalsy();
        expect(portal!.className).not.toContain("glass-reveal");
        wrapper.unmount();
    });

    it("writes no spring style at all when motion is off", async () => {
        const wrapper = mountDialog({ motion: "off" });
        await nextTick();
        await nextTick();
        const portal = findDialog();
        expect(portal).not.toBeNull();
        expect(portal!.style.opacity).toBeFalsy();
        expect(portal!.style.transform).toBeFalsy();
        wrapper.unmount();
    });
});
