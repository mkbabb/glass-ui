import { describe, expect, it, vi } from "vitest";
import { ref } from "vue";
import {
    useDockExpandedSize,
    type DockMorphMeasureFailure,
} from "@glass/components/dock/composables/dockMorphMeasure";
import { mountComposable } from "../../../utils/mountComposable";

function rect(width: number, height = 48): DOMRect {
    return {
        x: 0,
        y: 0,
        top: 0,
        left: 0,
        right: width,
        bottom: height,
        width,
        height,
        toJSON: () => ({}),
    } as DOMRect;
}

function computedStyles(token: string, resolved: string) {
    return vi.spyOn(window, "getComputedStyle").mockImplementation(
        (el) =>
            ({
                inlineSize: el.tagName === "I" ? resolved : "",
                getPropertyValue: (name: string) =>
                    name === "--dock-morph-min" ? token : "",
            }) as CSSStyleDeclaration,
    );
}

describe("useDockExpandedSize semantic floor", () => {
    it("seeds the collapsed endpoint from the resolved live token", () => {
        computedStyles("max(2.75rem, 52px)", "52px");
        const root = document.createElement("div");
        const content = document.createElement("div");
        root.append(content);
        root.getBoundingClientRect = () => rect(240);
        content.getBoundingClientRect = () => rect(220);

        const { result, unmount } = mountComposable(() =>
            useDockExpandedSize({
                rootEl: ref(root),
                contentEl: ref(content),
                axis: ref("horizontal"),
                expanded: ref(true),
            }),
        );

        expect(result.failure.value).toBeNull();
        expect(root.style.getPropertyValue("--dock-collapsed-px")).toBe("52px");
        expect(root.style.getPropertyValue("--dock-expanded-px")).toBe("240px");
        unmount();
    });

    it("exposes one typed failure and writes no successful endpoints for an unreadable token", () => {
        computedStyles("calc(broken)", "auto");
        const root = document.createElement("div");
        const content = document.createElement("div");
        root.append(content);
        root.getBoundingClientRect = () => rect(240);
        content.getBoundingClientRect = () => rect(220);
        const warn = vi.spyOn(console, "warn");

        const { result, unmount } = mountComposable(() =>
            useDockExpandedSize({
                rootEl: ref(root),
                contentEl: ref(content),
                axis: ref("horizontal"),
                expanded: ref(true),
            }),
        );

        expect(result.failure.value).toEqual<DockMorphMeasureFailure>({
            code: "invalid-morph-min",
            token: "calc(broken)",
        });
        expect(root.style.getPropertyValue("--dock-collapsed-px")).toBe("");
        expect(root.style.getPropertyValue("--dock-expanded-px")).toBe("");
        expect(warn).not.toHaveBeenCalled();
        unmount();
    });
});
