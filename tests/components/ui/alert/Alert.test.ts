import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Alert, alertVariants } from "@glass/components/alert";

describe("Alert announcement policy", () => {
    it("is silent by default", () => {
        const alert = mount(Alert);

        expect(alert.attributes("role")).toBeUndefined();
        expect(alert.attributes("aria-live")).toBeUndefined();
    });

    it.each([
        ["polite", "status", "polite"],
        ["assertive", "alert", "assertive"],
    ] as const)("maps %s announcements to %s", (announce, role, ariaLive) => {
        const alert = mount(Alert, { props: { announce } });

        expect(alert.attributes("role")).toBe(role);
        expect(alert.attributes("aria-live")).toBe(ariaLive);
    });

    it("preserves caller semantics when announcement is off", () => {
        const alert = mount(Alert, {
            props: { announce: "off" },
            attrs: { role: "region", "aria-label": "Build status" },
        });

        expect(alert.attributes()).toMatchObject({
            role: "region",
            "aria-label": "Build status",
        });
    });

    it("lets the explicit announcement policy own live-region semantics", () => {
        const alert = mount(Alert, {
            props: { announce: "assertive" },
            attrs: { role: "region", "aria-live": "off", id: "build-alert" },
        });

        expect(alert.attributes()).toMatchObject({
            role: "alert",
            "aria-live": "assertive",
            id: "build-alert",
        });
    });
});

/* THE GLYPH CHANNEL. Alert's tone reaches paint in exactly one place — the glyph —
 * because the recompose that removed the tinted plate left the ink neutral on purpose.
 * BASE used to end `[&>svg]:text-current` and every toned arm adds
 * `[&>svg]:text-(--tone)`; `joinClassValues` is a bucketed deduper, not twMerge, so both
 * survived the join, and Tailwind emits `.[&>svg]:text-(--tone)>svg` BEFORE
 * `.[&>svg]:text-current>svg` at equal specificity — currentcolor won, and a toned Alert
 * painted the plate's own ink. The collision was harmless while the wash carried the
 * tone; removing the wash promoted the dead channel to the only channel.
 *
 * The row is on the STRING, not on a mount, because the defect is a class the scanner
 * reads out of source text: it never depended on rendering, and it survived every
 * mount-shaped test the component had. */
describe("Alert tone channel", () => {
    it("BASE declares no text-current arbitrary variant — nothing overrides the tone glyph", () => {
        expect(alertVariants()).not.toContain("text-current");
    });

    it.each(["destructive", "success", "warning", "info"] as const)(
        "the %s arm ships exactly one glyph colour, and it is the tone",
        (tone) => {
            const classes = alertVariants({ tone }).split(/\s+/);
            const glyphColour = classes.filter((cls) => /^\[&>svg\]:text-/.test(cls));
            expect(glyphColour).toEqual(["[&>svg]:text-(--tone)"]);
        },
    );
});
