// The decorative-icon sweep (W2-A11Y-LINKAGE, W2-B sweep arm).
//
// RU-18 N3's site (the Combobox SearchIcon) died with the REDUCTION combobox→command
// fold, but the sweep-class arm survives: a purely decorative icon inside a control
// that already carries its own accessible name (an aria-label, an sr-only label, or a
// visible text label) must be `aria-hidden` so AT does not double-announce the glyph.
// The in-repo precedent is CommandInput's `<Search aria-hidden="true" />`.
//
// These are RENDERED-attr asserts (a silently-dropped binding is caught only by the
// rendered attribute, per the binding-verification discipline). RED before the sweep:
// each icon rendered with no `aria-hidden`.
//
// Not swept (verified redundant — already under an aria-hidden ancestor, so a second
// stamp would be noise): the Checkbox indicator icons (`CheckboxIndicator` is
// `aria-hidden`), and the Select trigger/scroll chevrons (reka `SelectIcon` /
// `SelectScrollButtonImpl` render `aria-hidden="true"`).

import { mount } from "@vue/test-utils";
import { defineComponent, h, nextTick } from "vue";
import { describe, expect, it } from "vitest";

import {
    NumberField,
    NumberFieldInput,
    NumberFieldStep,
} from "@glass/components/number-field";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselPager,
} from "@glass/components/carousel";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
} from "@glass/components/dialog";

describe("decorative-icon sweep — icons in named controls are aria-hidden", () => {
    it("NumberField step buttons: the Plus/Minus glyphs are hidden (reka names the button)", async () => {
        const wrapper = mount({
            components: {
                NumberField,
                NumberFieldInput,
                NumberFieldStep,
            },
            template: `
                <NumberField :model-value="2">
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput />
                    <NumberFieldStep direction="increment" />
                </NumberField>
            `,
        });
        await nextTick();

        // reka merges aria-label="Increase"/"Decrease" onto the buttons, so the glyph
        // adds no name — it must be hidden.
        const inc = wrapper.get('[aria-label="Increase"] svg');
        const dec = wrapper.get('[aria-label="Decrease"] svg');
        expect(inc.attributes("aria-hidden")).toBe("true");
        expect(dec.attributes("aria-hidden")).toBe("true");
    });

    it("CarouselPager nav buttons: the chevrons are hidden (the button carries the aria-label)", async () => {
        const wrapper = mount(
            defineComponent({
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
            }),
        );
        await nextTick();

        const prev = wrapper.get('[data-slot="carousel-pager-prev"] svg');
        const next = wrapper.get('[data-slot="carousel-pager-next"] svg');
        expect(prev.attributes("aria-hidden")).toBe("true");
        expect(next.attributes("aria-hidden")).toBe("true");
    });

    it("Dialog close: the X glyph is hidden (the sr-only 'Close' names the button)", async () => {
        const Host = defineComponent({
            components: { Dialog, DialogContent, DialogTitle, DialogDescription },
            setup() {
                return () =>
                    h(Dialog, { open: true }, () => [
                        h(
                            DialogContent,
                            { class: "sweep-dialog" },
                            () => [
                                h(DialogTitle, { class: "sr-only" }, () => "Sweep dialog"),
                                h(
                                    DialogDescription,
                                    { class: "sr-only" },
                                    () => "Decorative-icon sweep fixture.",
                                ),
                                h("p", "body"),
                            ],
                        ),
                    ]);
            },
        });
        const wrapper = mount(Host, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        await nextTick();

        const dialog = document.querySelector(".sweep-dialog") as HTMLElement;
        expect(dialog).toBeTruthy();
        // The built-in close button is named by its sr-only "Close"; the X svg inside
        // it must be aria-hidden.
        const closeLabel = Array.from(dialog.querySelectorAll(".sr-only")).find(
            (el) => el.textContent === "Close",
        );
        expect(closeLabel, "the built-in close button exists").toBeTruthy();
        const closeButton = closeLabel!.closest("button") as HTMLElement;
        const glyph = closeButton.querySelector("svg");
        expect(glyph, "the close button renders an X glyph").toBeTruthy();
        expect(glyph!.getAttribute("aria-hidden")).toBe("true");

        wrapper.unmount();
    });
});
