import { mount } from "@vue/test-utils";
import { describe, expect, it, vi } from "vitest";
import WatercolorDot from "@glass/components/watercolor-dot/WatercolorDot.vue";

const FACE = {
    color: "oklch(0.72 0.14 28)",
    seed: "face-contract",
} as const;

describe("WatercolorDot face contract", () => {
    it("renders one fixed inert face and rejects action semantics", async () => {
        const onClick = vi.fn();
        const wrapper = mount(WatercolorDot, {
            props: FACE,
            attrs: {
                class: "consumer-face",
                style: "width: 48px; height: 48px; pointer-events: auto",
                role: "button",
                tabindex: "0",
                "aria-label": "Choose coral",
                "aria-pressed": "true",
                onClick,
            },
            slots: { default: "Interactive label" },
        });
        const face = wrapper.get('[data-testid="watercolor-swatch"]');

        expect(face.element.tagName).toBe("SPAN");
        expect(face.attributes("aria-hidden")).toBe("true");
        expect(face.attributes("role")).toBeUndefined();
        expect(face.attributes("tabindex")).toBeUndefined();
        expect(face.attributes("aria-label")).toBeUndefined();
        expect(face.attributes("aria-pressed")).toBeUndefined();
        expect(face.attributes("type")).toBeUndefined();
        expect(face.classes()).toContain("consumer-face");
        expect((face.element as HTMLElement).style.width).toBe("48px");
        expect((face.element as HTMLElement).style.pointerEvents).toBe("none");
        expect(wrapper.text()).not.toContain("Interactive label");

        const radius = (face.element as HTMLElement).style.borderRadius;
        await face.trigger("mouseenter");
        await face.trigger("mouseleave");
        expect((face.element as HTMLElement).style.borderRadius).toBe(radius);

        await face.trigger("click");
        expect(onClick).not.toHaveBeenCalled();
    });

    it("keeps selected and unselected seats out of seeded face geometry", () => {
        const rest = mount(WatercolorDot, { props: FACE });
        const selected = mount(WatercolorDot, {
            props: FACE,
            attrs: { "data-state": "selected", "aria-selected": "true" },
        });
        const restFace = rest.get('[data-testid="watercolor-swatch"]');
        const selectedFace = selected.get('[data-testid="watercolor-swatch"]');

        expect(selectedFace.attributes("data-state")).toBeUndefined();
        expect(selectedFace.attributes("aria-selected")).toBeUndefined();
        expect((selectedFace.element as HTMLElement).style.borderRadius).toBe(
            (restFace.element as HTMLElement).style.borderRadius,
        );
        expect(selected.get("feTurbulence").attributes("seed")).toBe(
            rest.get("feTurbulence").attributes("seed"),
        );
    });

    it("renders the ghost outline as inert phrasing content", () => {
        const wrapper = mount(WatercolorDot, {
            props: { ...FACE, variant: "ghost" },
        });
        const stroke = wrapper.get(".watercolor-ghost-stroke");

        expect(stroke.element.tagName).toBe("SPAN");
        expect(stroke.attributes("aria-hidden")).toBe("true");
    });
});
