import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";

import { Card, CardContent, CardHeader, CardTitle } from "../index";

describe("Card", () => {
    it("renders card layout content with the new tier API", () => {
        const wrapper = mount({
            components: { Card, CardContent, CardHeader, CardTitle },
            template: `
                <Card tier="resting" class="test-card">
                    <CardHeader>
                        <CardTitle>Account</CardTitle>
                    </CardHeader>
                    <CardContent>Billing summary</CardContent>
                </Card>
            `,
        });

        const root = wrapper.get(".test-card");
        const classes = root.classes();
        expect(classes).toContain("scrollbar-hidden");
        expect(classes).toContain("glass-resting");
        expect(root.attributes("data-slot")).toBe("card");
        expect(root.attributes("data-tier")).toBe("resting");
        expect(wrapper.text()).toContain("Account");
        expect(wrapper.text()).toContain("Billing summary");
    });

    it("defaults to the resting tier when no tier prop is supplied", () => {
        const wrapper = mount({
            components: { Card },
            template: `<Card class="default-card">content</Card>`,
        });

        const classes = wrapper.get(".default-card").classes();
        expect(classes).toContain("glass-resting");
    });

    it("renders polymorphically via the as prop", () => {
        const wrapper = mount({
            components: { Card },
            template: `<Card as="article" tier="floating" class="poly-card">content</Card>`,
        });

        expect(wrapper.element.tagName).toBe("ARTICLE");
        expect(wrapper.classes()).toContain("glass-floating");
    });

    it("hides the grain overlay when grain=false", () => {
        const wrapper = mount({
            components: { Card },
            template: `<Card :grain="false" class="grainless">content</Card>`,
        });

        const classes = wrapper.get(".grainless").classes();
        expect(classes).toContain("[&::after]:hidden");
        expect(wrapper.get(".grainless").attributes("data-grain")).toBe(
            "false",
        );
    });

    it("drops the surface shadow when shadow=false", () => {
        const wrapper = mount({
            components: { Card },
            template: `<Card :shadow="false" class="shadowless">content</Card>`,
        });

        const classes = wrapper.get(".shadowless").classes();
        expect(classes).not.toContain("shadow-[var(--shadow-card)]");
    });
});
