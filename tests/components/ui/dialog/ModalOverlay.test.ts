import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";
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
});
