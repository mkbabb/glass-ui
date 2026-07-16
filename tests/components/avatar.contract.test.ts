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
        const wrapper = mount(Avatar, {
            props: { label: "Ada Lovelace", size: "md", shape: "square" },
            slots: {
                default: () => [
                    h(AvatarImage, {
                        src: "",
                        onLoadingStatusChange: status,
                    }),
                    h(AvatarFallback, null, { default: () => "AL" }),
                ],
            },
        });
        await flushPromises();

        const identity = wrapper.get(".glass-avatar__identity");
        const image = wrapper.get("img");
        const fallback = wrapper.get(".glass-avatar__fallback");

        expect(wrapper.attributes()).toMatchObject({
            "data-identity": "labelled",
            "data-shape": "square",
            "data-size": "md",
        });
        expect(identity.attributes()).toMatchObject({
            role: "img",
            "aria-label": "Ada Lovelace",
        });
        expect(image.attributes()).toMatchObject({
            alt: "",
            "aria-hidden": "true",
            "data-image-state": "error",
        });
        expect(fallback.attributes("aria-hidden")).toBe("true");
        expect(fallback.text()).toBe("AL");
        expect(status).toHaveBeenLastCalledWith("error");
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
