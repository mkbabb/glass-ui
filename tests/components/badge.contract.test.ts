import { mount } from "@vue/test-utils";
import { describe, expect, expectTypeOf, it } from "vitest";

import Badge from "@glass/components/badge/Badge.vue";
import { badgeVariants } from "@glass/components/badge";

type BadgeProps = InstanceType<typeof Badge>["$props"];
type BadgeHasCast = "cast" extends keyof BadgeProps ? true : false;

describe("Badge static metadata contract", () => {
    it("keeps metadata axes and removes the cast API", () => {
        expectTypeOf<BadgeProps["variant"]>().toEqualTypeOf<
            "default" | "secondary" | "outline" | null | undefined
        >();
        expectTypeOf<BadgeProps["tone"]>().toEqualTypeOf<
            | "neutral"
            | "destructive"
            | "success"
            | "warning"
            | "info"
            | null
            | undefined
        >();
        expectTypeOf<BadgeProps["size"]>().toEqualTypeOf<
            "sm" | "md" | "lg" | null | undefined
        >();
        expectTypeOf<BadgeProps["surface"]>().toEqualTypeOf<
            "glass" | "loud" | null | undefined
        >();
        expectTypeOf<BadgeHasCast>().toEqualTypeOf<false>();
    });

    it("renders static phrasing content with no synthetic action anatomy", () => {
        const wrapper = mount(Badge, {
            props: {
                variant: "secondary",
                tone: "success",
                size: "lg",
                surface: "glass",
            },
            slots: { default: "Synced" },
        });
        const badge = wrapper.get('[data-slot="badge"]');

        expect(badge.element.tagName).toBe("DIV");
        expect(badge.attributes("role")).toBeUndefined();
        expect(badge.attributes("tabindex")).toBeUndefined();
        expect(badge.attributes("data-cast")).toBeUndefined();
        expect(badge.find(".cartoon-cast").exists()).toBe(false);
        expect(badge.attributes("data-tone")).toBe("success");
        expect(badge.attributes("data-size")).toBe("lg");
        expect(badge.attributes("data-surface")).toBe("glass");
    });

    it("authors no hover, press, or focus affordance classes", () => {
        const classes = [
            badgeVariants(),
            badgeVariants({ variant: "secondary" }),
            badgeVariants({ variant: "outline" }),
            badgeVariants({ tone: "destructive" }),
            badgeVariants({ tone: "success" }),
            badgeVariants({ tone: "warning" }),
            badgeVariants({ tone: "info" }),
            badgeVariants({ surface: "glass" }),
        ].join(" ");

        expect(classes).not.toMatch(/(?:^|\s)(?:hover:|active:|focus(?:-visible)?:)/);
        expect(classes).not.toContain("focus-ring");
        expect(classes).not.toContain("transition-control");
    });
});
