import { mount } from "@vue/test-utils";
import { renderToString } from "@vue/server-renderer";
import { afterEach, describe, expect, expectTypeOf, it } from "vitest";
import { createSSRApp, defineComponent, h, nextTick } from "vue";
import HeaderRibbon from "@glass/components/header-ribbon/HeaderRibbon.vue";
import type { HeaderRibbonPlacement } from "@glass/components/header-ribbon";

type HeaderRibbonComponentProps = InstanceType<typeof HeaderRibbon>["$props"];

describe("HeaderRibbon", () => {
    afterEach(() => {
        document.body.replaceChildren();
    });

    it("publishes one flat persistent toolbar contract", () => {
        expectTypeOf<HeaderRibbonPlacement>().toEqualTypeOf<"left" | "right">();
        expectTypeOf<HeaderRibbonComponentProps>().toHaveProperty("placement");
        expectTypeOf<HeaderRibbonComponentProps>().toHaveProperty("ariaLabel");
        // The discriminated collapsible contract is cut; no mode/anchorLabel surface remains.
        expectTypeOf<HeaderRibbonComponentProps>().not.toHaveProperty("mode");
        expectTypeOf<HeaderRibbonComponentProps>().not.toHaveProperty("anchorLabel");
    });

    it("keeps the toolbar named when its runtime label is blank", () => {
        const wrapper = mount(HeaderRibbon, { props: { ariaLabel: "   " } });

        expect(wrapper.attributes("role")).toBe("toolbar");
        expect(wrapper.attributes("aria-label")).toBe("Header actions");
    });

    it("pins the toolbar host while forwarding ordinary root attributes", () => {
        const wrapper = mount(HeaderRibbon, {
            attrs: {
                as: "nav",
                asChild: true,
                role: "navigation",
                "data-consumer": "kept",
            },
        });

        expect(wrapper.element.tagName).toBe("DIV");
        expect(wrapper.attributes("role")).toBe("toolbar");
        expect(wrapper.attributes("as")).toBeUndefined();
        expect(wrapper.attributes("aschild")).toBeUndefined();
        expect(wrapper.attributes("data-consumer")).toBe("kept");
    });

    it.each(["left", "right"] as const)(
        "renders an operable %s persistent ribbon on first render",
        async (placement) => {
            let activations = 0;
            const wrapper = mount(HeaderRibbon, {
                props: { placement, ariaLabel: "Editor actions" },
                slots: {
                    items: () =>
                        h(
                            "button",
                            {
                                "data-item": "",
                                type: "button",
                                onClick: () => activations++,
                            },
                            "Theme",
                        ),
                },
            });

            const actions = wrapper.get('[data-slot="header-ribbon-actions"]');
            const item = wrapper.get<HTMLButtonElement>("[data-item]");
            expect(wrapper.attributes("data-placement")).toBe(placement);
            expect(actions.attributes("inert")).toBeUndefined();
            expect(wrapper.find('[data-slot="header-ribbon-anchor"]').exists()).toBe(
                false,
            );

            item.element.click();
            await nextTick();
            expect(activations).toBe(1);

            const escape = new KeyboardEvent("keydown", {
                key: "Escape",
                bubbles: true,
                cancelable: true,
            });
            item.element.dispatchEvent(escape);
            expect(escape.defaultPrevented).toBe(false);
        },
    );

    it("renders the persistent contract during SSR", async () => {
        const Host = defineComponent(() => () =>
            h(
                HeaderRibbon,
                { placement: "right", ariaLabel: "Editor actions" },
                { items: () => h("button", { type: "button" }, "Search") },
            ),
        );
        const html = await renderToString(createSSRApp(Host));
        const host = document.createElement("div");

        host.innerHTML = html;
        const ribbon = host.querySelector<HTMLElement>('[data-slot="header-ribbon"]')!;
        const actions = host.querySelector<HTMLElement>(
            '[data-slot="header-ribbon-actions"]',
        )!;

        expect(ribbon.getAttribute("role")).toBe("toolbar");
        expect(ribbon.getAttribute("data-placement")).toBe("right");
        expect(host.querySelector('[data-slot="header-ribbon-anchor"]')).toBeNull();
        expect(actions.hasAttribute("inert")).toBe(false);
        expect(actions.textContent).toContain("Search");
    });
});
