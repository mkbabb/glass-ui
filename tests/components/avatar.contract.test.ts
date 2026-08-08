import { flushPromises, mount } from "@vue/test-utils";
import { h } from "vue";
import { describe, expect, expectTypeOf, it, vi } from "vitest";

import * as AvatarSurface from "@glass/components/avatar";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    type AvatarProps,
} from "@glass/components/avatar";
import { StatusDot } from "@glass/components/status-dot";

type ImageProps = InstanceType<typeof AvatarImage>["$props"];
type ImageHasAlt = "alt" extends keyof ImageProps ? true : false;

describe("Avatar", () => {
    it("publishes one identity family without a styling authority", () => {
        expect(Object.keys(AvatarSurface).sort()).toEqual([
            "Avatar",
            "AvatarFallback",
            "AvatarImage",
        ]);
        expectTypeOf<ImageHasAlt>().toEqualTypeOf<false>();

        const identities: AvatarProps[] = [
            { label: "Ada Lovelace" },
            { labelledBy: "ada-name" },
            { decorative: true },
        ];
        expect(identities).toHaveLength(3);

        // @ts-expect-error an identity cannot be both named and decorative
        const contradictory: AvatarProps = { label: "Ada Lovelace", decorative: true };
        expect(contradictory).toBeDefined();
    });

    it("announces one stable identity while hiding image and initials duplicates", async () => {
        const originalDescriptor = Object.getOwnPropertyDescriptor(window, "Image");
        const probes: ControlledImage[] = [];
        class ControlledImage extends EventTarget {
            complete = false;
            naturalWidth = 0;
            src = "";
            referrerPolicy = "";
            crossOrigin: string | null = null;

            constructor() {
                super();
                probes.push(this);
            }
        }
        Object.defineProperty(window, "Image", {
            configurable: true,
            writable: true,
            value: ControlledImage,
        });
        const wrapper = mount(Avatar, {
            props: { label: "Ada Lovelace", size: "md", shape: "square" },
            slots: {
                default: () => [
                    h(AvatarImage, { src: "/controlled-ada.png" }),
                    h(AvatarFallback, null, { default: () => "AL" }),
                ],
            },
        });
        try {
            await flushPromises();
            expect(probes).toHaveLength(1);

            const identityBefore = wrapper.get(".avatar__identity").element;
            const imageBefore = wrapper.get("img");
            const fallbackBefore = wrapper.get(".avatar__fallback");
            expect(wrapper.attributes()).toMatchObject({
                "data-identity": "labelled",
                "data-shape": "square",
                "data-size": "md",
            });
            expect(identityBefore.getAttribute("role")).toBe("img");
            expect(identityBefore.getAttribute("aria-label")).toBe("Ada Lovelace");
            expect(imageBefore.attributes()).toMatchObject({
                alt: "",
                "aria-hidden": "true",
            });
            // BORN-RED at HEAD (D20). `data-image-state` published a four-state
            // machine that NO stylesheet keyed and NO consumer read, six repos
            // deep; the `loadingStatusChange` emit had zero listeners in the same
            // census. HEAD reading: `data-image-state="loading"` on this element,
            // and the emit firing into nothing.
            expect(imageBefore.attributes("data-image-state")).toBeUndefined();
            expect(fallbackBefore.attributes("aria-hidden")).toBe("true");
            // The initials must actually RENDER — hidden-from-AT is only half the
            // contract; a fallback that paints nothing would green on aria-hidden alone.
            expect(fallbackBefore.text()).toBe("AL");
            expect(wrapper.findAll('[role="img"]:not([aria-hidden="true"])')).toHaveLength(1);
            expect(wrapper.emitted()).not.toHaveProperty("loadingStatusChange");

            probes[0]!.dispatchEvent(new Event("error"));
            await flushPromises();

            const identityAfter = wrapper.get(".avatar__identity").element;
            expect(wrapper.get("img").attributes("data-image-state")).toBeUndefined();
            expect(wrapper.get("img").attributes("aria-hidden")).toBe("true");
            const fallbackAfter = wrapper.get(".avatar__fallback");
            expect(fallbackAfter.attributes("aria-hidden")).toBe("true");
            // The initials SURVIVE the image error — the fallback is what the user reads.
            expect(fallbackAfter.text()).toBe("AL");
            expect(wrapper.findAll('[role="img"]:not([aria-hidden="true"])')).toHaveLength(1);
            expect(identityAfter).toBe(identityBefore);
            expect(identityAfter.getAttribute("aria-label")).toBe("Ada Lovelace");
        } finally {
            wrapper.unmount();
            if (originalDescriptor) Object.defineProperty(window, "Image", originalDescriptor);
            else Reflect.deleteProperty(window, "Image");
        }
    });

    it("keeps decorative identity out of the reading order", () => {
        const wrapper = mount(Avatar, {
            props: { decorative: true },
            slots: {
                default: () => h(AvatarFallback, null, { default: () => "ℱ" }),
            },
        });
        const identity = wrapper.get(".avatar__identity");

        expect(wrapper.attributes("data-identity")).toBe("decorative");
        expect(identity.attributes("aria-hidden")).toBe("true");
        expect(identity.attributes("role")).toBeUndefined();
        expect(identity.attributes("aria-label")).toBeUndefined();
    });

    it("keeps competing identity attrs off the outer geometry host", () => {
        const wrapper = mount(Avatar, {
            props: { label: "Ada Lovelace" },
            attrs: { role: "presentation", "aria-label": "Duplicate" },
            slots: {
                default: () => h(AvatarFallback, null, { default: () => "AL" }),
            },
        });

        expect(wrapper.attributes("role")).toBeUndefined();
        expect(wrapper.attributes("aria-label")).toBeUndefined();
        expect(wrapper.get('[role="img"]').attributes("aria-label")).toBe(
            "Ada Lovelace",
        );
    });

    it("positions the existing semantic status owner beside the image identity", () => {
        const wrapper = mount(Avatar, {
            props: { labelledBy: "member-name" },
            slots: {
                default: () => h(AvatarFallback, null, { default: () => "GH" }),
                status: () =>
                    h(StatusDot, {
                        state: "online",
                        label: "Grace Hopper is online",
                    }),
            },
        });
        const identity = wrapper.get(".avatar__identity");
        const status = wrapper.get('[data-slot="avatar-status"]');

        expect(identity.attributes("aria-labelledby")).toBe("member-name");
        expect(status.element.parentElement).toBe(wrapper.element);
        expect(status.get('[role="img"]').attributes("aria-label")).toBe(
            "Grace Hopper is online",
        );
    });

    // BORN-RED at HEAD (D21, the reka silent-no-op class). `delayMs`/`delay-ms`
    // were destructured OUT of the forwarded attrs, so a caller wrote
    // `<AvatarFallback :delay-ms="600">`, got no type error, no warning, and no
    // delay — the initials still flashed before a fast image resolved. It is
    // reka's own prop and it does a real thing. HEAD reading: the attribute
    // absent from the rendered fallback.
    it("forwards the fallback delay instead of silently swallowing it", async () => {
        vi.useFakeTimers();
        try {
            const wrapper = mount(Avatar, {
                props: { decorative: true },
                slots: {
                    default: () =>
                        h(AvatarFallback, { "delay-ms": 600 }, { default: () => "AL" }),
                },
            });

            // The delay is REAL: the initials are held back so a fast image never
            // flashes them. HEAD swallowed the prop, so this read "AL" at t=0.
            expect(wrapper.text()).not.toContain("AL");

            vi.advanceTimersByTime(600);
            await flushPromises();
            expect(wrapper.text()).toContain("AL");
        } finally {
            vi.useRealTimers();
        }
    });
});
