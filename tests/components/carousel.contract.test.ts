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
    it("does not manufacture an unnamed landmark", () => {
        const root = mount(Carousel).get('[data-slot="carousel"]');

        expect(root.attributes("role")).toBeUndefined();
        expect(root.attributes("aria-label")).toBeUndefined();
        expect(root.attributes("aria-roledescription")).toBeUndefined();
        expect(root.attributes("tabindex")).toBe("0");
    });

    it("treats an empty accessible name as unnamed", () => {
        const root = mount(Carousel, { props: { ariaLabel: "   " } }).get(
            '[data-slot="carousel"]',
        );

        expect(root.attributes("role")).toBeUndefined();
        expect(root.attributes("aria-label")).toBeUndefined();
    });

    it("exposes a named carousel region when the caller supplies a name", () => {
        const root = mount(Carousel, { props: { ariaLabel: "Featured work" } }).get(
            '[data-slot="carousel"]',
        );

        expect(root.attributes("role")).toBe("region");
        expect(root.attributes("aria-label")).toBe("Featured work");
        expect(root.attributes("aria-roledescription")).toBe("carousel");
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
