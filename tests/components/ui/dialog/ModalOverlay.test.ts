import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h, type PropType } from "vue";
import { DialogRoot } from "reka-ui";
import ModalOverlay from "@glass/components/dialog/ModalOverlay.vue";

const DialogHost = defineComponent({
    props: { scrim: String },
    setup(props) {
        return () =>
            h(DialogRoot, { open: true }, () =>
                h(ModalOverlay, { scrim: props.scrim as "glass" | "clear" | "dim" }),
            );
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
    it.each([
        [undefined, "bg-overlay-scrim"],
        ["clear", "bg-overlay-scrim-subtle"],
        ["dim", "bg-overlay-scrim-strong"],
    ] as const)("maps %s to its distinct scrim material", (scrim, expected) => {
        const wrapper = mount(DialogHost, {
            attachTo: document.body,
            props: { scrim },
        });
        expect(document.querySelector("[data-state]")?.classList.contains(expected)).toBe(
            true,
        );
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
