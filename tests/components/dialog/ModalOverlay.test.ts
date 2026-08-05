import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h, nextTick, type PropType } from "vue";
import { DialogRoot } from "reka-ui";
import ModalOverlay from "@glass/components/dialog/ModalOverlay.vue";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@glass/components/dialog";

const DialogHost = defineComponent({
    props: { veil: { type: Boolean, default: false } },
    setup(props) {
        return () =>
            h(DialogRoot, { open: true }, () => h(ModalOverlay, { veil: props.veil }));
    },
});

const SlideHost = defineComponent({
    props: {
        slideT: { type: Number as unknown as PropType<number | null>, default: null },
    },
    setup(props) {
        return () =>
            h(DialogRoot, { open: true }, () =>
                h(ModalOverlay, { slideT: props.slideT, forceMount: true }),
            );
    },
});

describe("ModalOverlay", () => {
    // AMENDED by W-DIALOG: the `scrim` intensity AXIS is deleted. It had zero passers in
    // src and demo alike — this test file was its sole exerciser, which is the definition
    // of a knob that exists for its own gate. ONE scrim material remains.
    it("paints ONE scrim material, dim only", () => {
        const wrapper = mount(DialogHost, { attachTo: document.body });
        const overlay = document.querySelector("[data-state]") as HTMLElement;
        expect(overlay.classList.contains("bg-overlay-scrim")).toBe(true);
        // The `backdrop-filter` wash is gone: a blur pulls bright neighbours into every
        // sampled pixel, so it measurably BRIGHTENED the page it was meant to recede.
        expect(overlay.className).not.toMatch(/backdrop-filter/);
        wrapper.unmount();
    });

    // The shared `.glass-focus-veil` is the re-derived primitive the scrim composes, and
    // the retired `backdrop="graded"` knob (which gated the old brightening recipe) is
    // gone. What survives is a GEOMETRY selector, not an opt-in: the veil's core is fixed
    // at the viewport centre, so it is true for a centred plate and false for an
    // edge-anchored one.
    it("composes the shared focus veil when the caller asks for it", () => {
        const wrapper = mount(DialogHost, { attachTo: document.body, props: { veil: true } });
        const veil = document.querySelector(".glass-focus-veil") as HTMLElement;
        expect(veil).not.toBeNull();
        expect(veil.getAttribute("aria-hidden")).toBe("true");
        wrapper.unmount();
    });

    it("paints NO veil by default — the dim is the whole scrim", () => {
        const wrapper = mount(DialogHost, { attachTo: document.body });
        expect(document.querySelector(".glass-focus-veil")).toBeNull();
        const overlay = document.querySelector("[data-state]") as HTMLElement;
        expect(overlay.classList.contains("bg-overlay-scrim")).toBe(true);
        wrapper.unmount();
    });

    // The scrim opacity is driven from the surface's
    // live slide scalar (position → 1−p), so the two never desync through an interrupt.
    it("drives opacity from slideT and drops the sheet-animate fade keyframe when set", () => {
        const wrapper = mount(SlideHost, {
            attachTo: document.body,
            props: { slideT: 0.25 },
        });
        const overlay = document.querySelector("[data-state]") as HTMLElement;
        expect(overlay).not.toBeNull();
        // scrimOpacity(0.25) === 0.75.
        expect(overlay.style.opacity).toBe("0.75");
        expect(overlay.classList.contains("sheet-animate")).toBe(false);
        wrapper.unmount();
    });

    // The COMPOSITION half of the geometry claim. Its negative twin — a side sheet
    // paints no veil — is `tests/components/sheet/sheet-graded-edge.test.ts`.
    it("is asked for the veil by the CENTRED plate", async () => {
        const Host = defineComponent(() => () =>
            h(Dialog, { open: true }, () =>
                h(DialogContent, null, () => [
                    h(DialogTitle, null, () => "Centred"),
                    h(DialogDescription, null, () => "Body"),
                ]),
            ),
        );
        const wrapper = mount(Host, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();
        await nextTick();
        expect(document.querySelector(".glass-focus-veil")).not.toBeNull();
        wrapper.unmount();
    });

    it("keeps the sheet-animate fade keyframe and no opacity override when slideT is null (center path intact)", () => {
        const wrapper = mount(SlideHost, {
            attachTo: document.body,
            props: { slideT: null },
        });
        const overlay = document.querySelector("[data-state]") as HTMLElement;
        expect(overlay).not.toBeNull();
        expect(overlay.classList.contains("sheet-animate")).toBe(true);
        expect(overlay.style.opacity).toBe("");
        wrapper.unmount();
    });
});
