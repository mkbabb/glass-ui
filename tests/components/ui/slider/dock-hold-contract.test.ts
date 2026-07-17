/**
 * The born-RED dock-hold MOUNT gate.
 *
 * The keepDockOpen contract: a `<Slider>` dragged inside a `<GlassDock>` must
 * acquire a keep-open token from the slider's REAL host element so the dock does
 * not idle-collapse mid-gesture, and the dock's `held` edge must light
 * `data-held` on BOTH the dock root and the slider root.
 *
 * The failure mode this guards: `Slider.vue` binds `@pointerdown` on reka's `<SliderRoot>`,
 * a forwarding component whose `$attrs` listeners are DROPPED across the
 * Slot/forwardRef boundary (reka's own cached `onPointerdown` shadows the merged
 * handler through `SliderRoot → SliderHorizontal → SliderImpl`). So a real
 * `pointerdown` on the resolved `[data-slot="slider"]` node never reaches
 * `Slider.vue`'s `onPointerDown`, `keepOpen()` never fires, `data-held` never
 * flips. The fix (`useDockHold`) attaches a NATIVE listener on the resolved host
 * element, which the event always reaches — turning this gate GREEN.
 *
 * It is browser-FREE: the seam that breaks IS a component-mount fact, so it is
 * gateable in jsdom/happy-dom without a real browser (the π-lane owns the live
 * visual-truth half; this owns the deterministic CI bite).
 */
import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick, ref } from "vue";
import { afterEach, describe, expect, it } from "vitest";
import { GlassDock } from "@glass/components/dock";
import { Slider } from "@glass/components/slider";
import {
    provideDockContext,
    type DockContext,
} from "@glass/components/dock/composables/dockContext";

/** Dispatch a real `pointerdown` Event on a node (happy-dom PointerEvent shim). */
function firePointer(el: Element, type: string): void {
    el.dispatchEvent(new PointerEvent(type, { bubbles: true, cancelable: true, pointerId: 1 }));
}

/**
 * Dispatch a real `touchstart`-family Event with a single-point `touches` list
 * on a node (happy-dom has no `TouchEvent` ctor, so synthesize one).
 */
function fireTouch(el: Element, type: string): void {
    const r = el.getBoundingClientRect();
    const touch = { clientX: r.x + r.width / 2, clientY: r.y + r.height / 2, identifier: 0, target: el };
    const ev = new Event(type, { bubbles: true, cancelable: true }) as Event & {
        touches: unknown[];
        changedTouches: unknown[];
    };
    ev.touches = [touch];
    ev.changedTouches = [touch];
    el.dispatchEvent(ev);
}

/** Resolve the slider host whether the query root IS the host or contains it. */
function findSliderHost(root: Element): HTMLElement | null {
    if (root.matches?.('[data-slot="slider"]')) return root as HTMLElement;
    return root.querySelector('[data-slot="slider"]');
}

describe("dock keepDockOpen host-native hold contract", () => {
    afterEach(() => {
        document.body.innerHTML = "";
    });

    it("a real pointerdown on the resolved slider host acquires keepOpen() AND lights data-held", async () => {
        const calls = { keepOpen: 0, release: 0 };
        const held = ref(false);

        // A spy DockContext over the canonical typed key — the SAME shape
        // `<GlassDock>` provides. Mounting the Slider under it lets us assert the
        // EXACT `keepOpen()` invocation the contract demands while the `held`
        // edge drives `data-held` (the single-writer reflected on the root).
        const Host = defineComponent({
            components: { Slider },
            setup() {
                const ctx = {
                    id: "spy-dock",
                    orientation: ref("horizontal"),
                    keepOpen: () => {
                        calls.keepOpen++;
                        held.value = true;
                    },
                    release: () => {
                        calls.release++;
                        held.value = false;
                    },
                    held,
                } as unknown as DockContext;
                provideDockContext(ctx);
                return () => h("div", { class: "spy-host" }, [h(Slider, { modelValue: [42], max: 100, "aria-label": "Dock hold value" })]);
            },
        });

        const wrapper = mount(Host, { attachTo: document.body });
        await nextTick();

        const host = wrapper.element.querySelector('[data-slot="slider"]');
        expect(host, "the resolved slider host element exists").not.toBeNull();

        // The failure mode: the template `@pointerdown` never fires through reka's
        // forwarding component; `keepOpen` stays 0, `data-held` never appears.
        firePointer(host!, "pointerdown");
        await nextTick();

        expect(calls.keepOpen, "keepOpen() fired on a real host pointerdown").toBe(1);
        expect(host!.hasAttribute("data-held"), "the slider root reflects data-held").toBe(true);

        // Release on `window` (pointer-capture retargets the release to window).
        firePointer(window as unknown as Element, "pointerup");
        await nextTick();

        expect(calls.release, "release() fired on window pointerup").toBe(1);
        expect(host!.hasAttribute("data-held"), "data-held cleared after release").toBe(false);

        wrapper.unmount();
    });

    it("a real touchstart on the host drives the SAME single acquire path (no second, parallel acquire)", async () => {
        const calls = { keepOpen: 0, release: 0 };
        const held = ref(false);

        const Host = defineComponent({
            components: { Slider },
            setup() {
                const ctx = {
                    id: "spy-dock",
                    orientation: ref("horizontal"),
                    keepOpen: () => {
                        calls.keepOpen++;
                        held.value = true;
                    },
                    release: () => {
                        calls.release++;
                        held.value = false;
                    },
                    held,
                } as unknown as DockContext;
                provideDockContext(ctx);
                return () => h(Slider, { modelValue: [42], max: 100, "aria-label": "Dock hold value" });
            },
        });

        const wrapper = mount(Host, { attachTo: document.body });
        await nextTick();
        const host = findSliderHost(wrapper.element);
        expect(host).not.toBeNull();

        fireTouch(host!, "touchstart");
        await nextTick();

        // ONE acquire — the touch and pointer paths are the SAME owner.
        expect(calls.keepOpen, "touchstart acquired exactly once").toBe(1);

        wrapper.unmount();
    });

    it("end-to-end against the REAL <GlassDock> provide: pointerdown on the in-dock slider lights data-held on BOTH roots", async () => {
        const Tree = defineComponent({
            components: { GlassDock, Slider },
            setup() {
                const v = ref([42]);
                // Wrap in a host div so `querySelector(".glass-dock")` finds the
                // dock root as a DESCENDANT (a single-root component's element IS
                // the dock root, which querySelector-on-self would miss).
                return () =>
                    h("div", { class: "dock-tree-host" }, [
                        h(GlassDock, { collapseDelay: 600 }, {
                            default: () => [
                                h(Slider, {
                                    modelValue: v.value,
                                    "aria-label": "Dock hold value",
                                    "onUpdate:modelValue": (n: number[] | undefined) =>
                                        (v.value = n ?? v.value),
                                    max: 100,
                                }),
                            ],
                        }),
                    ]);
            },
        });

        const wrapper = mount(Tree, { attachTo: document.body });
        await nextTick();

        const dockRoot = wrapper.element.querySelector(".glass-dock") as HTMLElement | null;
        const sliderRoot = wrapper.element.querySelector('[data-slot="slider"]') as HTMLElement | null;
        expect(dockRoot, "dock root mounted").not.toBeNull();
        expect(sliderRoot, "slider host mounted").not.toBeNull();

        // Expand the collapsible dock first (so the slider is interactive).
        dockRoot!.dispatchEvent(new MouseEvent("mouseenter", { bubbles: true }));
        await nextTick();

        firePointer(sliderRoot!, "pointerdown");
        await nextTick();
        await nextTick();

        // The single writer reflects the held edge on the dock root, and the
        // slider subscribes to the same `held` computed for the thumb-halo.
        expect(dockRoot!.hasAttribute("data-held"), "the dock root paints data-held during the held drag").toBe(true);
        expect(sliderRoot!.hasAttribute("data-held"), "the slider root paints data-held during the held drag").toBe(true);

        firePointer(window as unknown as Element, "pointerup");
        await nextTick();
        await nextTick();

        expect(dockRoot!.hasAttribute("data-held"), "the dock root clears data-held after release").toBe(false);

        wrapper.unmount();
    });
});
