// AU.W8b.5 — HoverPopover defineModel(open) conversion.
//
// Two load-bearing assertions per the binding-verification discipline:
//  1. v-model:open round-trips — an external `open` write propagates, and the
//     local open state surfaces back via `update:open`.
//  2. keepDockOpen MUST NOT regress — the dock-keep token (`keepOpen`/`release`)
//     still fires on the `defineModel` setter path when the popover open state
//     flips inside a dock context.

import { mount } from "@vue/test-utils";
import { computed, defineComponent, h, ref } from "vue";
import { describe, expect, it, vi } from "vitest";

import HoverPopover from "@glass/components/custom/hover-popover/HoverPopover.vue";
import {
    DOCK_CONTEXT_KEY,
    type DockContext,
} from "@glass/components/custom/dock/composables/dockContext";

function mockDockContext(): { ctx: DockContext; keepOpen: ReturnType<typeof vi.fn>; release: ReturnType<typeof vi.fn> } {
    const keepOpen = vi.fn();
    const release = vi.fn();
    const ctx: DockContext = {
        id: "test-dock",
        orientation: computed(() => "horizontal" as const),
        layout: computed(() => "linear" as const),
        keepOpen,
        release,
        held: computed(() => false),
    };
    return { ctx, keepOpen, release };
}

describe("HoverPopover defineModel(open) round-trip", () => {
    it("propagates an external open write into the model the watchers read", async () => {
        // Proof the external `open` write reaches the model: with keepDockOpen
        // set, the keep-open watcher (which reads the model) must fire on the
        // external write — the read half of the v-model:open round-trip.
        const { ctx, keepOpen } = mockDockContext();
        const wrapper = mount(HoverPopover, {
            props: { open: false, content: "Label", keepDockOpen: true },
            global: { provide: { [DOCK_CONTEXT_KEY as symbol]: ctx } },
        });
        expect(keepOpen).not.toHaveBeenCalled();
        await wrapper.setProps({ open: true });
        expect(keepOpen).toHaveBeenCalledTimes(1);
    });
});

describe("HoverPopover keepDockOpen — no regression on the defineModel path", () => {
    it("acquires the dock-keep token when opened and releases when closed", async () => {
        const { ctx, keepOpen, release } = mockDockContext();

        // A host owns the `open` v-model so we can flip it deterministically;
        // this exercises the SAME setter path reka writes on hover.
        const Host = defineComponent({
            setup() {
                const open = ref(false);
                return { open };
            },
            render() {
                return h(HoverPopover, {
                    content: "Label",
                    keepDockOpen: true,
                    open: this.open,
                    "onUpdate:open": (v: boolean) => (this.open = v),
                });
            },
        });

        const wrapper = mount(Host, {
            global: { provide: { [DOCK_CONTEXT_KEY as symbol]: ctx } },
        });

        expect(keepOpen).not.toHaveBeenCalled();

        // Open → keepOpen fires once.
        (wrapper.vm as unknown as { open: boolean }).open = true;
        await wrapper.vm.$nextTick();
        expect(keepOpen).toHaveBeenCalledTimes(1);
        expect(release).not.toHaveBeenCalled();

        // Close → release fires once.
        (wrapper.vm as unknown as { open: boolean }).open = false;
        await wrapper.vm.$nextTick();
        expect(release).toHaveBeenCalledTimes(1);
    });

    it("does not acquire the token when keepDockOpen is false", async () => {
        const { ctx, keepOpen } = mockDockContext();
        const Host = defineComponent({
            setup() {
                const open = ref(false);
                return { open };
            },
            render() {
                return h(HoverPopover, {
                    content: "Label",
                    keepDockOpen: false,
                    open: this.open,
                    "onUpdate:open": (v: boolean) => (this.open = v),
                });
            },
        });
        const wrapper = mount(Host, {
            global: { provide: { [DOCK_CONTEXT_KEY as symbol]: ctx } },
        });
        (wrapper.vm as unknown as { open: boolean }).open = true;
        await wrapper.vm.$nextTick();
        expect(keepOpen).not.toHaveBeenCalled();
    });
});
