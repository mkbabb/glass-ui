import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Alert } from "@glass/components/alert";

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
