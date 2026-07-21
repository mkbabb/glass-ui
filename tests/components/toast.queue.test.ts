import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";
import { Toaster, toast, useToast } from "@glass/components/toast";
import { useToastQueue } from "@glass/components/toast/use-toast";

const mounted: Array<ReturnType<typeof mount>> = [];

// Fire the exit-complete signal the real browser emits when `.glass-reveal-out`
// finishes — a bubbling `animationend` on the ToastRoot carrying the reveal-out
// keyframe name (jsdom has no AnimationEvent constructor, so we stamp the field).
function dispatchRevealOut(el: HTMLElement) {
    const event = new Event("animationend", { bubbles: true });
    Object.defineProperty(event, "animationName", { value: "glass-reveal-out" });
    el.dispatchEvent(event);
}

// The store is a module singleton; drain it between tests the same way the app does
// (dismiss → fire each survivor's exit-complete) so no test inherits a held slot.
afterEach(async () => {
    useToast().dismiss();
    await nextTick();
    document.body
        .querySelectorAll<HTMLElement>('[data-slot="toast"]')
        .forEach(dispatchRevealOut);
    await nextTick();
    while (mounted.length) mounted.pop()?.unmount();
});

describe("Toast queue releases a dismissed slot at exit-complete (RU-21 N9)", () => {
    it("frees the TOAST_LIMIT slot the frame the exit animation ends, not on a timer", async () => {
        const wrapper = mount(Toaster, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        mounted.push(wrapper);
        const queue = useToastQueue();

        const first = toast({ title: "first", duration: Number.POSITIVE_INFINITY });
        toast({ title: "second", duration: Number.POSITIVE_INFINITY });
        await nextTick();
        expect(queue.value).toHaveLength(2);

        // Dismiss the first — it flips to open:false and begins its exit. The slot is
        // still HELD while the surface recedes (the entry lingers, open:false).
        first.dismiss();
        await nextTick();
        expect(queue.value).toHaveLength(2);
        const closed = Array.from(
            document.body.querySelectorAll<HTMLElement>('[data-slot="toast"]'),
        ).find((node) => node.dataset.state === "closed");
        expect(closed).toBeTruthy();

        // Exit-complete: the reveal-out keyframe ends → the slot must release NOW.
        // At HEAD the store defers removal ~16.7min (TOAST_REMOVE_DELAY), so this
        // signal is unwired and the slot stays held — the born-RED failure.
        dispatchRevealOut(closed!);
        await nextTick();
        expect(queue.value).toHaveLength(1);
        expect(queue.value.map((t) => t.title)).toEqual(["second"]);
    });

    it("releases every slot when the whole viewport is dismissed at once", async () => {
        const wrapper = mount(Toaster, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        mounted.push(wrapper);
        const queue = useToastQueue();

        toast({ title: "a", duration: Number.POSITIVE_INFINITY });
        toast({ title: "b", duration: Number.POSITIVE_INFINITY });
        await nextTick();
        expect(queue.value).toHaveLength(2);

        useToast().dismiss();
        await nextTick();
        for (const node of document.body.querySelectorAll<HTMLElement>(
            '[data-slot="toast"]',
        )) {
            dispatchRevealOut(node);
        }
        await nextTick();
        expect(queue.value).toHaveLength(0);
    });
});
