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

    it("exposes a named carousel region — and its tab stop — when the caller supplies a name", () => {
        const root = mount(Carousel, { props: { ariaLabel: "Featured work" } }).get(
            '[data-slot="carousel"]',
        );

        expect(root.attributes("role")).toBe("region");
        expect(root.attributes("aria-label")).toBe("Featured work");
        expect(root.attributes("aria-roledescription")).toBe("carousel");
        // The named region keeps the keyboard tab stop (the over-application guard —
        // the conditional must not strip the tab stop from a legitimately named region).
        expect(root.attributes("tabindex")).toBe("0");
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
