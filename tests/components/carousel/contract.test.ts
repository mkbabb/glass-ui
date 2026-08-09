import { mount } from "@vue/test-utils";
import { defineComponent } from "vue";
import { describe, expect, it } from "vitest";
import * as CarouselSurface from "@glass/components/carousel";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPager,
} from "@glass/components/carousel";

const CarouselFixture = defineComponent({
    components: { Carousel, CarouselContent, CarouselItem, CarouselPager },
    template: `
        <Carousel aria-label="Featured work">
            <CarouselContent>
                <CarouselItem>First</CarouselItem>
                <CarouselItem>Second</CarouselItem>
            </CarouselContent>
            <CarouselPager />
        </Carousel>
    `,
});

describe("Carousel landmark contract", () => {
    it("does not manufacture an unnamed landmark, nor an unnamed tab stop", () => {
        const root = mount(Carousel).get('[data-slot="carousel"]');

        expect(root.attributes("role")).toBeUndefined();
        expect(root.attributes("aria-label")).toBeUndefined();
        expect(root.attributes("aria-roledescription")).toBeUndefined();
        // W2-D: the tab stop is conditional on the named-region arm. An unnamed
        // carousel is not a focusable generic — a keyboard user does not land on a
        // nameless container. RED before the fix: tabindex="0" was unconditional.
        expect(root.attributes("tabindex")).toBeUndefined();
    });

    it("treats an empty accessible name as unnamed", () => {
        const root = mount(Carousel, { props: { ariaLabel: "   " } }).get(
            '[data-slot="carousel"]',
        );

        expect(root.attributes("role")).toBeUndefined();
        expect(root.attributes("aria-label")).toBeUndefined();
        expect(root.attributes("tabindex")).toBeUndefined();
    });

    it("exposes a named carousel region — and NO tab stop, because the keys are not here", () => {
        const root = mount(Carousel, { props: { ariaLabel: "Featured work" } }).get(
            '[data-slot="carousel"]',
        );

        expect(root.attributes("role")).toBe("region");
        expect(root.attributes("aria-label")).toBe("Featured work");
        expect(root.attributes("aria-roledescription")).toBe("carousel");
        // [2026-08-08 · #40 W-PAGER completion · STRUCK IN PLACE] This asserted
        // ~~`tabindex` === "0"`~~ under an "over-application guard" clause: the named
        // region was to KEEP the tab stop the unnamed one is denied. That clause was
        // written when the root carried a keydown handler. IT NO LONGER DOES — the ONE
        // paging keyboard contract lives on the dot rail (`Carousel.vue`'s header;
        // `PagerDots.vue`, "THE RAIL OWNS THE ONLY PAGING KEYS IN THE LIBRARY"), and the
        // handler the root used to listen with was unreachable on all five mounts it
        // shipped in. A container that answers no key is not a tab stop; giving it one
        // spends a keyboard user's Tab on a dead stop. The tab stop is now denied
        // UNCONDITIONALLY, so all three cases in this describe agree, and the paging keys
        // are reached at the rail's own roving-tabindex button.
        expect(root.attributes("tabindex")).toBeUndefined();
    });
});

describe("Carousel command surface", () => {
    it("consolidates previous and next commands in CarouselPager", () => {
        expect(CarouselSurface).toHaveProperty("CarouselPager");
        expect(CarouselSurface).not.toHaveProperty("CarouselPrevious");
        expect(CarouselSurface).not.toHaveProperty("CarouselNext");

        const wrapper = mount(CarouselFixture);
        expect(wrapper.findAll('[data-slot="carousel-pager"]')).toHaveLength(1);
        expect(wrapper.findAll('[data-slot="carousel-pager-prev"]')).toHaveLength(1);
        expect(wrapper.findAll('[data-slot="carousel-pager-next"]')).toHaveLength(1);
    });
});
