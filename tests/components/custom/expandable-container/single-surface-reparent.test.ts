// E14 root — the SINGLE-SURFACE re-parent determinism proof (E1 §2e).
//
// The defect this guards: the prior ExpandableContainer rendered the default slot
// in TWO places (an inline `renderSlot` AND a teleported `renderSlot`), so an
// imperative-canvas consumer (ECharts) — whose single instance binds to ONE host
// `ref` — went BLANK on expand (the teleported copy was a fresh, never-initialised
// canvas) NON-DETERMINISTICALLY (which copy won rode a ResizeObserver-timing race).
//
// The fix: the slot renders ONCE, inside a `<Teleport :disabled>` whose toggle
// RE-PARENTS the one surface into `body`. The SAME child component instance (the
// SAME canvas) follows the move. This proof asserts the contract:
//   1. Mount with a probe child that records its mount/unmount + a parent-change
//      callback → exactly ONE child instance EVER, across expand AND collapse.
//   2. A `settle` callback fires on EACH re-parent (so a consumer can `chart.resize()`
//      its one instance into the new host box deterministically), with the new
//      `fullscreen` state.
//
// The real `<Teleport>` runs here (the global suite stubs teleport; this file
// opts out) so the DOM-node MOVE — the actual re-parent — is exercised.

import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { defineComponent, h, onMounted, onUnmounted } from "vue";

import ExpandableContainer from "../../../../src/components/custom/expandable-container/ExpandableContainer.vue";

// A probe child that counts how many times it is MOUNTED (a fresh instance =
// a fresh mount) and how many times it is UNMOUNTED. A re-render of the same
// instance fires NEITHER — only a destroy/recreate (the double-render defect)
// would bump these. The single-surface re-parent must keep the instance alive.
let mountCount = 0;
let unmountCount = 0;

const ProbeChild = defineComponent({
    name: "ProbeChild",
    setup() {
        onMounted(() => {
            mountCount += 1;
        });
        onUnmounted(() => {
            unmountCount += 1;
        });
        // An imperative-canvas stand-in: a single <canvas> the consumer would
        // bind one ECharts instance to. The element identity is what must persist.
        return () => h("canvas", { "data-probe-canvas": "1" });
    },
});

describe("ExpandableContainer — single-surface re-parent determinism (E14 / §2e)", () => {
    beforeEach(() => {
        mountCount = 0;
        unmountCount = 0;
    });

    afterEach(() => {
        document.body.innerHTML = "";
    });

    function mountExpandable() {
        const settleEvents: boolean[] = [];
        const wrapper = mount(ExpandableContainer, {
            attachTo: document.body,
            global: {
                // Opt OUT of the suite-wide teleport stub so the REAL re-parent runs.
                stubs: { teleport: false },
            },
            slots: {
                default: () => h(ProbeChild),
            },
            props: {
                "onSettle": (fs: boolean) => settleEvents.push(fs),
            },
        });
        return { wrapper, settleEvents };
    }

    it("the default slot mounts EXACTLY ONCE and is never re-created across expand/collapse", async () => {
        const { wrapper } = mountExpandable();

        // Initial inline render: one mount, zero unmounts.
        expect(mountCount).toBe(1);
        expect(unmountCount).toBe(0);

        // Expand → the surface re-parents into <body>. A re-PARENT moves DOM nodes;
        // it must NOT destroy + recreate the child (no second mount, no unmount).
        await wrapper.setProps({ open: true });
        await wrapper.vm.$nextTick();
        expect(mountCount).toBe(1);
        expect(unmountCount).toBe(0);

        // Collapse → re-parents back in-flow. Same instance, still no churn.
        await wrapper.setProps({ open: false });
        await wrapper.vm.$nextTick();
        expect(mountCount).toBe(1);
        expect(unmountCount).toBe(0);

        // A full expand→collapse→expand cycle never multiplies the instance.
        await wrapper.setProps({ open: true });
        await wrapper.vm.$nextTick();
        await wrapper.setProps({ open: false });
        await wrapper.vm.$nextTick();
        expect(mountCount).toBe(1);
        expect(unmountCount).toBe(0);
    });

    it("there is EXACTLY ONE probe canvas in the document in BOTH states (never two copies)", async () => {
        const { wrapper } = mountExpandable();

        const count = () => document.querySelectorAll("[data-probe-canvas]").length;

        // Inline: one canvas.
        expect(count()).toBe(1);

        // Fullscreen: STILL one canvas (the re-parented one) — not the inline + a
        // teleported second copy (the prior double-render defect).
        await wrapper.setProps({ open: true });
        await wrapper.vm.$nextTick();
        expect(count()).toBe(1);

        // Back inline: still one.
        await wrapper.setProps({ open: false });
        await wrapper.vm.$nextTick();
        expect(count()).toBe(1);
    });

    it("a settle callback fires on EACH re-parent, carrying the new fullscreen state", async () => {
        const { wrapper, settleEvents } = mountExpandable();

        // No settle on the initial mount (that is not a re-parent).
        await wrapper.vm.$nextTick();
        expect(settleEvents).toEqual([]);

        // Expand → settle(true).
        await wrapper.setProps({ open: true });
        await wrapper.vm.$nextTick();
        // The settle is one nextTick after the flush; flush microtasks + the rAF
        // shim's macrotask boundary the test env uses.
        await wrapper.vm.$nextTick();
        expect(settleEvents).toEqual([true]);

        // Collapse → settle(false).
        await wrapper.setProps({ open: false });
        await wrapper.vm.$nextTick();
        await wrapper.vm.$nextTick();
        expect(settleEvents).toEqual([true, false]);
    });

    it("exposes the live anchor + surface host refs (the imperative re-home seam)", () => {
        const { wrapper } = mountExpandable();
        const exposed = wrapper.vm as unknown as {
            anchorEl: HTMLElement | null;
            surfaceEl: HTMLElement | null;
        };
        expect(exposed.anchorEl).toBeInstanceOf(HTMLElement);
        expect(exposed.surfaceEl).toBeInstanceOf(HTMLElement);
    });
});
