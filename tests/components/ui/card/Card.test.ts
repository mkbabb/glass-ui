import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
    Card,
    CardAction,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@glass/components/card";

afterEach(() => vi.unstubAllGlobals());

describe("Card", () => {
    it("defaults to the elevated medium Surface contract", () => {
        const wrapper = mount(Card, { slots: { default: "Account" } });

        expect(wrapper.attributes()).toMatchObject({
            "data-slot": "card",
            "data-material": "elevated",
            "data-tier": "resting",
            "data-surface": "glass",
            "data-size": "md",
            "data-shadow": "true",
            "data-grain": "true",
        });
        expect(wrapper.classes()).toEqual(
            expect.arrayContaining(["card", "glass-resting", "rounded-card"]),
        );
    });

    it("forwards Surface axes without repainting them", () => {
        const wrapper = mount(Card, {
            props: {
                material: "content",
                tier: "wash",
                surface: "veil",
                shadow: true,
                grain: false,
                specular: "full",
            },
        });

        expect(wrapper.attributes("data-tier")).toBe("wash");
        expect(wrapper.attributes("data-surface")).toBe("veil");
        expect(wrapper.attributes("data-shadow")).toBeUndefined();
        expect(wrapper.attributes("data-grain")).toBe("false");
        expect(wrapper.attributes("data-specular")).toBeUndefined();
    });

    it("keeps cartoon and grid as Card-only decorations", () => {
        const wrapper = mount(Card, { props: { cartoon: true, grid: true } });

        expect(wrapper.attributes("data-surface")).toBe("glass");
        expect(wrapper.attributes("data-cartoon")).toBe("true");
        expect(wrapper.attributes("data-grid")).toBe("true");
        expect(wrapper.classes()).toEqual(
            expect.arrayContaining(["cartoon-surface", "paper-grid"]),
        );
        expect(wrapper.attributes("data-shadow")).toBeUndefined();
    });

    it("exposes the declared small size", () => {
        const wrapper = mount(Card, { props: { size: "sm" } });
        expect(wrapper.attributes("data-size")).toBe("sm");
    });

    it("renders polymorphically without inferring command behavior", () => {
        const wrapper = mount(Card, { props: { as: "article" } });

        expect(wrapper.element.tagName).toBe("ARTICLE");
        expect(wrapper.attributes("data-pressable")).toBeUndefined();
        expect(wrapper.classes()).not.toContain("glass-press");
    });

    it("composes selection state at the existing accent and metal seams", () => {
        const wrapper = mount(Card, {
            props: {
                variant: "selection",
                selected: true,
                dataHue: "oklch(0.7 0.1 70)",
            },
        });

        expect(wrapper.attributes("data-selected")).toBe("true");
        expect(wrapper.classes()).toContain("metal-gold-border");
        expect(wrapper.attributes("style")).toContain(
            "--glass-accent: oklch(0.7 0.1 70)",
        );
    });
});

describe("Card anatomy", () => {
    it("provides a stable slot on every anatomy root", () => {
        const wrapper = mount({
            components: {
                Card,
                CardAction,
                CardContent,
                CardDescription,
                CardFooter,
                CardHeader,
                CardTitle,
            },
            template: `
                <Card>
                    <CardHeader>
                        <CardTitle>Title</CardTitle>
                        <CardDescription>Description</CardDescription>
                        <CardAction>Action</CardAction>
                    </CardHeader>
                    <CardContent>Content</CardContent>
                    <CardFooter>Footer</CardFooter>
                </Card>
            `,
        });

        for (const slot of [
            "card",
            "card-header",
            "card-title",
            "card-description",
            "card-action",
            "card-content",
            "card-footer",
        ]) {
            expect(wrapper.find(`[data-slot="${slot}"]`).exists()).toBe(true);
        }
    });

    it("condenses only a meaningfully scrollable header and keeps a stable return band", async () => {
        vi.stubGlobal("requestAnimationFrame", undefined);
        const wrapper = mount({
            components: { CardHeader, CardTitle, CardDescription },
            template: `
                <div class="card-scroll-host">
                    <CardHeader shrink>
                        <CardTitle>Recent activity</CardTitle>
                        <CardDescription>Scroll-owned context</CardDescription>
                    </CardHeader>
                </div>
            `,
        });
        const host = wrapper.get(".card-scroll-host").element as HTMLElement;
        const header = wrapper.get('[data-slot="card-header"]');
        vi.spyOn(header.element, "getBoundingClientRect").mockReturnValue({
            height: 80,
        } as DOMRect);
        Object.defineProperties(host, {
            clientHeight: { configurable: true, value: 100 },
            scrollHeight: { configurable: true, value: 150 },
        });

        async function scrollTo(position: number) {
            host.scrollTop = position;
            host.dispatchEvent(new Event("scroll"));
            await nextTick();
        }

        await scrollTo(30);
        expect(header.attributes("data-condensed")).toBeUndefined();

        await scrollTo(8);
        Object.defineProperty(host, "scrollHeight", {
            configurable: true,
            value: 400,
        });
        await scrollTo(30);
        expect(header.attributes("data-condensed")).toBe("true");

        await scrollTo(18);
        expect(header.attributes("data-condensed")).toBe("true");

        await scrollTo(8);
        expect(header.attributes("data-condensed")).toBeUndefined();
    });
});
