import { mount } from "@vue/test-utils";
import { defineComponent, h, onMounted, ref } from "vue";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useDockFisheye } from "@glass/components/dock/composables/useDockFisheye";
import { useDockOverflowFit } from "@glass/components/dock/composables/useDockOverflowFit";

function rect(left: number, top: number, width: number, height: number): DOMRect {
    return {
        x: left,
        y: top,
        left,
        top,
        width,
        height,
        right: left + width,
        bottom: top + height,
        toJSON: () => ({}),
    } as DOMRect;
}

function dimensions(
    el: HTMLElement,
    values: Partial<
        Record<"clientWidth" | "clientHeight" | "scrollWidth" | "scrollHeight", number>
    >,
) {
    for (const [key, value] of Object.entries(values)) {
        Object.defineProperty(el, key, { configurable: true, value });
    }
}

const DockHarness = defineComponent({
    props: { vertical: Boolean, fisheye: Boolean },
    setup(props, { expose }) {
        const dock = ref<HTMLElement | null>(null);
        const { measure } = useDockOverflowFit(dock);
        const fisheye = useDockFisheye(dock, { enabled: () => props.fisheye });
        onMounted(fisheye.remeasure);
        expose({ measure, remeasure: fisheye.remeasure });
        return () =>
            h(
                "div",
                {
                    ref: dock,
                    class: ["glass-dock", props.vertical && "vertical"],
                },
                [h("div", { class: "dock-layer--full" }, [h("button", "Item")])],
            );
    },
});

describe("dock overflow and fisheye axes", () => {
    const originalMatchMedia = window.matchMedia;

    beforeEach(() => {
        vi.useFakeTimers();
        Object.defineProperty(window, "matchMedia", {
            configurable: true,
            value: vi.fn((query: string) => ({
                matches: query.includes("hover: hover"),
                media: query,
                onchange: null,
                addEventListener: vi.fn(),
                removeEventListener: vi.fn(),
                addListener: vi.fn(),
                removeListener: vi.fn(),
                dispatchEvent: vi.fn(),
            })),
        });
    });

    afterEach(() => {
        vi.useRealTimers();
        Object.defineProperty(window, "matchMedia", {
            configurable: true,
            value: originalMatchMedia,
        });
    });

    it("measures the horizontal full-layer scroll port", () => {
        const wrapper = mount(DockHarness);
        const root = wrapper.get(".glass-dock").element as HTMLElement;
        const port = wrapper.get(".dock-layer--full").element as HTMLElement;
        dimensions(root, { clientHeight: 100, scrollHeight: 100 });
        dimensions(port, { clientWidth: 100, scrollWidth: 180 });

        (wrapper.vm as unknown as { measure: () => void }).measure();
        expect(root.hasAttribute("data-dock-overflow")).toBe(true);
    });

    it("measures vertical overflow on the dock scroll host", () => {
        const wrapper = mount(DockHarness, { props: { vertical: true } });
        const root = wrapper.get(".glass-dock").element as HTMLElement;
        const port = wrapper.get(".dock-layer--full").element as HTMLElement;
        dimensions(root, { clientHeight: 100, scrollHeight: 180 });
        dimensions(port, { clientWidth: 100, scrollWidth: 100 });

        (wrapper.vm as unknown as { measure: () => void }).measure();
        expect(root.hasAttribute("data-dock-overflow")).toBe(true);
    });

    it.each([
        {
            name: "horizontal",
            vertical: false,
            portRect: rect(100, 50, 300, 80),
            itemRect: rect(140, 60, 40, 40),
            pointer: { clientX: 220, clientY: 0 },
            center: "60",
            pointerPosition: "120",
        },
        {
            name: "vertical",
            vertical: true,
            portRect: rect(50, 100, 80, 300),
            itemRect: rect(60, 150, 40, 40),
            pointer: { clientX: 0, clientY: 240 },
            center: "70",
            pointerPosition: "140",
        },
    ])(
        "writes $name layout-axis coordinates",
        ({ vertical, portRect, itemRect, pointer, center, pointerPosition }) => {
            const wrapper = mount(DockHarness, { props: { vertical, fisheye: true } });
            const root = wrapper.get(".glass-dock").element as HTMLElement;
            const port = wrapper.get(".dock-layer--full").element as HTMLElement;
            const item = wrapper.get("button").element as HTMLElement;
            vi.spyOn(port, "getBoundingClientRect").mockReturnValue(portRect);
            vi.spyOn(item, "getBoundingClientRect").mockReturnValue(itemRect);

            (wrapper.vm as unknown as { remeasure: () => void }).remeasure();
            root.dispatchEvent(
                new PointerEvent("pointermove", { bubbles: true, ...pointer }),
            );
            vi.runOnlyPendingTimers();

            expect(item.style.getPropertyValue("--x")).toBe(center);
            expect(root.style.getPropertyValue("--dock-px")).toBe(pointerPosition);
        },
    );
});
