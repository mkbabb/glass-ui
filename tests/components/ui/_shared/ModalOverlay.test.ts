import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { defineComponent, h } from "vue";

import ModalOverlay from "../../../../src/components/ui/_shared/ModalOverlay.vue";

/**
 * AJ-W4-δ — ModalOverlay `scrimAnimation` prop test suite.
 *
 * The publisher exposes a `scrimAnimation?: string` prop that forwards a
 * CSS `animation` shorthand to the portaled `DialogOverlay` via the typed
 * `--scrim-animation` cascade variable. The canonical
 * `[data-scrim-animation] { animation: var(--scrim-animation, none) }`
 * rule in `animations.css` consumes the variable; this suite verifies the
 * publisher writes the cascade onto the overlay element correctly.
 *
 * reka-ui's `DialogOverlay` requires a `DialogRoot` ancestor. We wrap the
 * mount in a minimal stub so the primitive resolves; the assertions read
 * the inline style + data-attribute on the root DOM element.
 */
import { DialogRoot } from "reka-ui";

const DialogHost = defineComponent({
    name: "DialogHost",
    components: { DialogRoot, ModalOverlay },
    props: { scrimAnimation: { type: String, required: false, default: undefined } },
    setup(props) {
        return () =>
            h(DialogRoot, { open: true }, () =>
                h(ModalOverlay, { scrimAnimation: props.scrimAnimation }),
            );
    },
});

describe("ModalOverlay scrimAnimation prop (AJ-W4-δ)", () => {
    it("omits the `--scrim-animation` cascade variable + data-attr when no prop is passed", () => {
        const wrapper = mount(DialogHost, { attachTo: document.body });

        const overlay = document.querySelector('[role="presentation"], [data-state]');
        expect(overlay).not.toBeNull();
        const style = overlay?.getAttribute("style") ?? "";
        const dataAttr = overlay?.getAttribute("data-scrim-animation");

        expect(style).not.toContain("--scrim-animation");
        expect(dataAttr).toBeNull();

        wrapper.unmount();
    });

    it("writes `--scrim-animation` as inline style + tags the element with data-scrim-animation when the prop is set", () => {
        const wrapper = mount(DialogHost, {
            attachTo: document.body,
            props: { scrimAnimation: "scrim-breath 6s ease-in-out infinite" },
        });

        const overlay = document.querySelector("[data-scrim-animation]");
        expect(overlay).not.toBeNull();

        const style = overlay?.getAttribute("style") ?? "";
        // happy-dom may normalise the custom property casing but preserves
        // the `--scrim-animation` key.
        expect(style).toContain("--scrim-animation");
        expect(style).toContain("scrim-breath 6s ease-in-out infinite");

        wrapper.unmount();
    });
});
