import { mount } from "@vue/test-utils";
import { nextTick } from "vue";
import { afterEach, describe, expect, it, vi } from "vitest";

import {
    Card,
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
        });
        expect(wrapper.classes()).toEqual(
            expect.arrayContaining(["card", "glass-resting"]),
        );
    });

    it("forwards the Surface axes it did not sever, and severs `material`", () => {
        const wrapper = mount(Card, {
            props: { tier: "wash", surface: "veil", shadow: true },
        });

        expect(wrapper.attributes("data-tier")).toBe("wash");
        expect(wrapper.attributes("data-surface")).toBe("veil");
        // a veil carries no cast — Surface's own arming rule, unchanged
        expect(wrapper.attributes("data-shadow")).toBeUndefined();
        // `material` is not a Card prop: the elevated role is Surface's default
        expect(Object.keys(Card.props ?? {})).not.toContain("material");
    });

    it("welds no scroll suppression and no per-instance style write", () => {
        // `scrollbar-hidden` hid 207px of content with nothing to say more
        // remained; the feather on `.card-scroll-host` is the affordance now.
        const wrapper = mount(Card);
        expect(wrapper.classes()).not.toContain("scrollbar-hidden");
        expect(wrapper.attributes("style")).toBeUndefined();
    });

    it("exposes the declared small size", () => {
        const wrapper = mount(Card, { props: { size: "sm" } });
        expect(wrapper.attributes("data-size")).toBe("sm");
    });

    it("renders polymorphically without inferring command behavior", () => {
        const wrapper = mount(Card, { props: { as: "article" } });

        expect(wrapper.element.tagName).toBe("ARTICLE");
        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("tabindex")).toBeUndefined();
        expect(wrapper.classes()).not.toContain("glass-press");
    });

    it("is an OPTION exactly when `selected` is present — presence, not truth", () => {
        const unselected = mount(Card, { props: { selected: false } });
        expect(unselected.attributes("role")).toBe("option");
        expect(unselected.attributes("tabindex")).toBe("0");
        expect(unselected.attributes("aria-selected")).toBe("false");
        expect(unselected.attributes("data-selected")).toBeUndefined();

        const selected = mount(Card, { props: { selected: true } });
        expect(selected.attributes("role")).toBe("option");
        expect(selected.attributes("aria-selected")).toBe("true");
        expect(selected.attributes("data-selected")).toBe("true");

        const inert = mount(Card);
        expect(inert.attributes("role")).toBeUndefined();
        expect(inert.attributes("aria-selected")).toBeUndefined();
    });
});

describe("Card anatomy", () => {
    it("provides a stable slot on every anatomy root", () => {
        const wrapper = mount({
            components: {
                Card,
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

        // the glide is armed by a crossing, never by mount
        expect(header.attributes("data-shrink-glide")).toBeUndefined();
        expect(header.attributes("data-condensed")).toBe("false");

        await scrollTo(30);
        expect(header.attributes("data-condensed")).toBe("false");

        await scrollTo(8);
        Object.defineProperty(host, "scrollHeight", {
            configurable: true,
            value: 400,
        });
        await scrollTo(30);
        expect(header.attributes("data-condensed")).toBe("true");
        expect(header.attributes("data-shrink-glide")).toBe("true");

        // the hysteresis band: 20 down, 12 up — a return above the release
        // threshold does not re-expand
        await scrollTo(18);
        expect(header.attributes("data-condensed")).toBe("true");

        await scrollTo(8);
        expect(header.attributes("data-condensed")).toBe("false");
    });

    // The glide answers a FLIP, not a crossing. A reader who scrolls past the
    // condense threshold on a header with nothing to condense into changed
    // nothing, and an animation on a state that never moved is a tic.
    it("arms no glide when a condense crossing finds no room to condense", async () => {
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
        // overflow 50 < header/2 + CONDENSE_PX (60): the crossing is real, the
        // room is not.
        Object.defineProperties(host, {
            clientHeight: { configurable: true, value: 100 },
            scrollHeight: { configurable: true, value: 150 },
        });
        // Let the post-flush scroll-root binding settle FIRST. Without it the
        // crossing lands before the initial sync, and the sync's own glide reset
        // would answer this assertion instead of the crossing — the case would
        // pass against an unconditionally-arming `onCross`.
        await nextTick();

        host.scrollTop = 30;
        host.dispatchEvent(new Event("scroll"));
        await nextTick();

        expect(header.attributes("data-condensed")).toBe("false");
        expect(header.attributes("data-shrink-glide")).toBeUndefined();
    });

    // The threshold is 20 — a value on the space series, not a mutable literal.
    // A suite that only ever scrolls to 30 stays green while 20 is mutated to 12,
    // so the band is pinned from BOTH sides: 19 must not cross it, 21 must.
    it("condenses past 20 and not at 19 — the threshold is pinned, not approximated", async () => {
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
        // room armed from the first frame: overflow 300 clears the room test at
        // any threshold a mutant could pick
        Object.defineProperties(host, {
            clientHeight: { configurable: true, value: 100 },
            scrollHeight: { configurable: true, value: 400 },
        });

        async function scrollTo(position: number) {
            host.scrollTop = position;
            host.dispatchEvent(new Event("scroll"));
            await nextTick();
        }

        // the post-flush scroll-root binding settles before the first crossing
        await nextTick();

        await scrollTo(19);
        expect(header.attributes("data-condensed")).toBe("false");

        await scrollTo(21);
        expect(header.attributes("data-condensed")).toBe("true");
    });

    it("announces the header region, and only when it can actually change", () => {
        const shrinking = mount(CardHeader, { props: { shrink: true } });
        expect(shrinking.attributes("aria-live")).toBe("polite");

        const still = mount(CardHeader);
        expect(still.attributes("aria-live")).toBeUndefined();
        expect(still.attributes("data-condensed")).toBeUndefined();
    });
});
