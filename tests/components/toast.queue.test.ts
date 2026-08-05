import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import postcss, { type Rule } from "postcss";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";
import { Toaster, toast, useToast } from "@glass/components/toast";
import { useToastQueue } from "@glass/components/toast/use-toast";

const read = (rel: string): string => readFileSync(join(process.cwd(), rel), "utf8");
const DISSOLVE_CSS = read("src/styles/glass/dissolve.css");
const TOASTER_SFC = read("src/components/toast/Toaster.vue");

const ROOT_SELECTOR = '.glass-vaporize[data-state="closed"]';

/**
 * The keyframe names the dismissed root ACTUALLY runs, read off the recipe: the exit
 * shorthand plus the reduced-motion carve's `animation-name`, both on the root's own
 * selector. This is the set the removal guard has to admit; anything else is a guard
 * over a keyframe nothing runs.
 */
function shippedRootKeyframes(): Set<string> {
    const names = new Set<string>();
    postcss.parse(DISSOLVE_CSS).walkRules((rule: Rule) => {
        if (rule.selector.replace(/\s+/g, " ").trim() !== ROOT_SELECTOR) return;
        rule.walkDecls(/^animation(-name)?$/, (decl) => {
            for (const match of decl.value.matchAll(/glass-vaporize-[\w-]+/g)) {
                names.add(match[0]);
            }
        });
    });
    return names;
}

/** The removal guard's own set, read out of the renderer. */
function removalGuardKeyframes(): Set<string> {
    const literal = TOASTER_SFC.match(/new Set\(\[([\s\S]*?)\]\)/);
    if (!literal) throw new Error("Toaster.vue declares no removal-guard Set");
    return new Set([...literal[1].matchAll(/"([^"]+)"/g)].map((match) => match[1]));
}

// The name the real browser emits on the ToastRoot when the exit ends. It is READ from
// the shipped recipe, never written here: a stamped name the component does not run is
// how this suite stayed green over a dead removal path.
const EXIT_KEYFRAME = [...shippedRootKeyframes()][0];

const mounted: Array<ReturnType<typeof mount>> = [];

// Fire the exit-complete signal — a bubbling `animationend` on the ToastRoot carrying
// the exit keyframe's name (jsdom has no AnimationEvent constructor, so we stamp the
// field).
function dispatchExitComplete(el: HTMLElement) {
    const event = new Event("animationend", { bubbles: true });
    Object.defineProperty(event, "animationName", { value: EXIT_KEYFRAME });
    el.dispatchEvent(event);
}

// The store is a module singleton; drain it between tests the same way the app does
// (dismiss → fire each survivor's exit-complete) so no test inherits a held slot.
afterEach(async () => {
    useToast().dismiss();
    await nextTick();
    document.body
        .querySelectorAll<HTMLElement>('[data-slot="toast"]')
        .forEach(dispatchExitComplete);
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

        // Exit-complete: the exit keyframe ends → the slot must release NOW.
        // At HEAD the store defers removal ~16.7min (TOAST_REMOVE_DELAY), so this
        // signal is unwired and the slot stays held — the born-RED failure.
        dispatchExitComplete(closed!);
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
            dispatchExitComplete(node);
        }
        await nextTick();
        expect(queue.value).toHaveLength(0);
    });

    it("guards on the names the root ACTUALLY runs — the set may not drift off the recipe", () => {
        // The class this arm exists for: the renderer's guard named `.glass-reveal`'s
        // exit keyframes while the root ran `.glass-vaporize`'s, so `removeToast` was
        // unreachable and dismissed toasts squatted their `TOAST_LIMIT` slots until they
        // evicted live ones — with the two cases above green over a fabricated event.
        // Neither set is written here: both are read from the shipped files, so a rename
        // on either side reds until they agree.
        const shipped = shippedRootKeyframes();
        const guard = removalGuardKeyframes();
        expect(shipped.size).toBeGreaterThan(0);
        for (const name of shipped) {
            expect(guard.has(name), `the guard drops \`${name}\`, which the root runs`).toBe(
                true,
            );
        }
        for (const name of guard) {
            expect(shipped.has(name), `the guard admits \`${name}\`, which nothing runs`).toBe(
                true,
            );
        }
    });
});
