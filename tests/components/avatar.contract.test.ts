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
        const status = vi.fn();
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
                    h(AvatarImage, {
                        src: "/controlled-ada.png",
                        onLoadingStatusChange: status,
                    }),
                    h(AvatarFallback, null, { default: () => "AL" }),
                ],
            },
        });
        try {
            await flushPromises();
            expect(probes).toHaveLength(1);

            const identityBefore = wrapper.get(".glass-avatar__identity").element;
            const imageBefore = wrapper.get("img");
            const fallbackBefore = wrapper.get(".glass-avatar__fallback");
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
                "data-image-state": "loading",
            });
            expect(fallbackBefore.attributes("aria-hidden")).toBe("true");
            expect(wrapper.findAll('[role="img"]:not([aria-hidden="true"])')).toHaveLength(1);
            expect(status.mock.calls.map(([value]) => value)).toContain("loading");

            probes[0]!.dispatchEvent(new Event("error"));
            await flushPromises();

            const identityAfter = wrapper.get(".glass-avatar__identity").element;
            expect(wrapper.get("img").attributes("data-image-state")).toBe("error");
            expect(wrapper.get("img").attributes("aria-hidden")).toBe("true");
            expect(wrapper.get(".glass-avatar__fallback").attributes("aria-hidden")).toBe("true");
            expect(wrapper.findAll('[role="img"]:not([aria-hidden="true"])')).toHaveLength(1);
            expect(identityAfter).toBe(identityBefore);
            expect(identityAfter.getAttribute("aria-label")).toBe("Ada Lovelace");
            expect(status.mock.calls.map(([value]) => value).slice(-2)).toEqual([
                "loading",
                "error",
            ]);
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
        const identity = wrapper.get(".glass-avatar__identity");

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
        const identity = wrapper.get(".glass-avatar__identity");
        const status = wrapper.get('[data-slot="avatar-status"]');

        expect(identity.attributes("aria-labelledby")).toBe("member-name");
        expect(status.element.parentElement).toBe(wrapper.element);
        expect(status.get('[role="img"]').attributes("aria-label")).toBe(
            "Grace Hopper is online",
        );
    });
});
