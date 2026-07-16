import { mount } from "@vue/test-utils";
import { defineComponent, nextTick, ref } from "vue";
import { describe, expect, it, vi } from "vitest";
import DeckGooFilter from "../../../../demo/stories/motion/deck/DeckGooFilter.vue";
import { projectDeckBarbell } from "../../../../demo/stories/motion/deck/gooBarbellGeometry";
import { useDeckGoo } from "../../../../demo/stories/motion/deck/useDeckGoo";

const GooHarness = defineComponent({
    setup() {
        const host = ref<HTMLElement | null>(null);
        const bodyA = ref<HTMLElement | null>(null);
        const bodyB = ref<HTMLElement | null>(null);
        const neck = ref<HTMLElement | null>(null);
        const goo = useDeckGoo({ host, bodyA, bodyB, neck });
        return { host, bodyA, bodyB, neck, ...goo };
    },
    template: `<div ref="host"><span ref="bodyA"/><span ref="neck"/><span ref="bodyB"/></div>`,
});

describe("Deck private goo", () => {
    it("keeps each story specimen's Safari-safe resources distinct", () => {
        const first = mount(DeckGooFilter, { props: { filterId: "deck-filter-a", clipId: "deck-clip-a" } });
        const second = mount(DeckGooFilter, { props: { filterId: "deck-filter-b", clipId: "deck-clip-b" } });

        expect(first.get("svg").attributes("width")).toBe("1");
        expect(first.get("filter").attributes("id")).toBe("deck-filter-a");
        expect(first.get("clipPath").attributes("id")).toBe("deck-clip-a");
        expect(second.get("filter").attributes("id")).toBe("deck-filter-b");
    });

    it("projects a bounded neck that wells only in flight", () => {
        const start = projectDeckBarbell(100, 50, 0, 100, 0.4);
        const middle = projectDeckBarbell(100, 50, 0.5, 100, 0.4);
        const end = projectDeckBarbell(100, 50, 1, 100, 0.4);

        expect(start.neckGirth).toBe(0);
        expect(middle.neckGirth).toBeCloseTo(1);
        expect(end.neckGirth).toBeCloseTo(0);
        expect(middle.stretch).toBeGreaterThan(1);
    });

    it("rebases one managed spring onto the latest direction and owns settle cleanup", async () => {
        vi.useFakeTimers();
        const wrapper = mount(GooHarness);
        Object.defineProperty(wrapper.element, "clientWidth", { value: 400 });

        wrapper.vm.travel(1);
        await vi.advanceTimersByTimeAsync(100);
        wrapper.vm.travel(-1);
        await vi.advanceTimersByTimeAsync(100);
        expect(wrapper.attributes()).toHaveProperty("data-traveling");
        const bodyCenter = Number.parseFloat(
            wrapper.findAll("span")[0]!.element.style.transform.match(/translateX\(([-\d.]+)/)?.[1] ?? "NaN",
        );
        expect(bodyCenter).toBeLessThan(200);
        await vi.advanceTimersByTimeAsync(3000);
        await nextTick();

        expect(wrapper.attributes()).not.toHaveProperty("data-traveling");
        expect(wrapper.findAll("span")[1]!.attributes("style")).toContain("opacity: 0");
        wrapper.unmount();
        vi.useRealTimers();
    });
});
