import { mount } from "@vue/test-utils";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

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

    // Q.W3 Lane H — `surface` is an orthogonal decoration prop (the retired
    // <CartoonCard> folds into `surface="cartoon"`).
    it("defaults to the glass surface — no cartoon-surface class", () => {
        const wrapper = mount({
            components: { Card },
            template: `<Card class="default-surface">content</Card>`,
        });

        const root = wrapper.get(".default-surface");
        expect(root.classes()).not.toContain("cartoon-surface");
        expect(root.attributes("data-surface")).toBe("glass");
    });

    it("applies the cartoon-surface decoration when surface=cartoon", () => {
        const wrapper = mount({
            components: { Card },
            template: `<Card surface="cartoon" class="cartoon">content</Card>`,
        });

        const root = wrapper.get(".cartoon");
        expect(root.classes()).toContain("cartoon-surface");
        expect(root.attributes("data-surface")).toBe("cartoon");
    });

    it("composes the cartoon surface onto any tier — orthogonal to tier", () => {
        const wrapper = mount({
            components: { Card },
            template: `<Card tier="floating" surface="cartoon" class="c2">x</Card>`,
        });

        const classes = wrapper.get(".c2").classes();
        // The tier rung still resolves; the decoration layers on top.
        expect(classes).toContain("glass-floating");
        expect(classes).toContain("cartoon-surface");
    });

    it("suppresses the --shadow-card drop when surface=cartoon (the cartoon stamp shadow takes over)", () => {
        const wrapper = mount({
            components: { Card },
            template: `<Card surface="cartoon" class="c3">content</Card>`,
        });

        // `cartoon-surface` carries its own offset-stamp box-shadow; the glass
        // drop shadow is suppressed so the two do not stack.
        expect(wrapper.get(".c3").classes()).not.toContain(
            "shadow-[var(--shadow-card)]",
        );
    });
});

// invariant 31 (component props fail-explicit) — dev-WARN posture (Q.W2 Lane A).
describe("Card — stale-prop dev-warning", () => {
    let warnSpy: ReturnType<typeof vi.spyOn>;

    beforeEach(() => {
        warnSpy = vi.spyOn(console, "warn").mockImplementation(() => {});
    });

    afterEach(() => {
        warnSpy.mockRestore();
    });

    it("warns when the stale `variant` prop falls through to $attrs", () => {
        mount({
            components: { Card },
            template: `<Card variant="pane">content</Card>`,
        });

        expect(warnSpy).toHaveBeenCalledTimes(1);
        const message = String(warnSpy.mock.calls[0][0]);
        // The warning names the prop, the component, and the canonical recipe.
        expect(message).toContain("variant");
        expect(message).toContain("<Card>");
        expect(message).toContain('tier="wash"');
        expect(message).toContain(":grain=\"false\"");
    });

    it("warns when the stale bare `flush` attr falls through to $attrs", () => {
        mount({
            components: { Card },
            template: `<Card flush>content</Card>`,
        });

        expect(warnSpy).toHaveBeenCalledTimes(1);
        expect(String(warnSpy.mock.calls[0][0])).toContain("flush");
    });

    it("is silent for declared props (tier / surface / shadow / grain / class)", () => {
        mount({
            components: { Card },
            template: `<Card tier="wash" surface="cartoon" :shadow="false" :grain="false" class="ok">content</Card>`,
        });

        expect(warnSpy).not.toHaveBeenCalled();
    });
});
