import { mount } from "@vue/test-utils";
import { renderToString } from "@vue/server-renderer";
import { afterEach, describe, expect, expectTypeOf, it, vi } from "vitest";
import { Fragment, createSSRApp, defineComponent, h, nextTick } from "vue";
import HeaderRibbon from "@glass/components/header-ribbon/HeaderRibbon.vue";
import type { HeaderRibbonMode } from "@glass/components/header-ribbon";

type HeaderRibbonComponentProps = InstanceType<typeof HeaderRibbon>["$props"];

const OpaqueAnchor = defineComponent(() => () => h("span", "Opaque"));
const persistentAnchorCases: ReadonlyArray<readonly [string, () => unknown]> = [
    ["empty", () => h(Fragment, null, [])],
    ["text", () => "Menu"],
    ["span", () => h("span", "Menu")],
    ["disabled control", () => h("button", { disabled: true }, "Menu")],
    ["opaque component", () => h(OpaqueAnchor)],
];

function mountRibbon(placement: "left" | "right" = "left") {
    return mount(HeaderRibbon, {
        props: {
            mode: "collapsible",
            placement,
            ariaLabel: "Editor actions",
            anchorLabel: "Toggle editor actions",
        },
        slots: {
            anchor: '<span data-anchor-glyph aria-hidden="true">Menu</span>',
            items: '<button data-item type="button">Search</button>',
        },
        attachTo: document.body,
    });
}

function pointer(element: Element, type: string, pointerType: string) {
    const event = new Event(type, { bubbles: true });
    Object.defineProperty(event, "pointerType", { value: pointerType });
    element.dispatchEvent(event);
}

describe("HeaderRibbon", () => {
    afterEach(() => {
        document.body.replaceChildren();
        vi.restoreAllMocks();
    });

    it("publishes an explicit behavior contract", () => {
        expectTypeOf<HeaderRibbonMode>().toEqualTypeOf<
            "persistent" | "collapsible"
        >();

        const supported: HeaderRibbonComponentProps[] = [
            {},
            { mode: "persistent" },
            { mode: "collapsible", anchorLabel: "Toggle editor actions" },
        ];
        // @ts-expect-error collapsible mode requires a name for its owned button
        const missingAnchorLabel: HeaderRibbonComponentProps = {
            mode: "collapsible",
        };
        // @ts-expect-error persistent mode does not render an anchor button
        const persistentAnchorLabel: HeaderRibbonComponentProps = {
            mode: "persistent",
            anchorLabel: "Unused label",
        };

        expect(supported).toHaveLength(3);
        expect(missingAnchorLabel).toBeDefined();
        expect(persistentAnchorLabel).toBeDefined();
    });

    it("keeps the toolbar named when its runtime label is blank", () => {
        const wrapper = mount(HeaderRibbon, { props: { ariaLabel: "   " } });

        expect(wrapper.attributes("aria-label")).toBe("Header actions");
        expect(wrapper.attributes("data-expanded")).toBe("true");
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
        "renders a collapsed %s ribbon with one owned, named native anchor",
        (placement) => {
            const wrapper = mountRibbon(placement);
            const anchor = wrapper.get<HTMLButtonElement>(
                '[data-slot="header-ribbon-anchor"]',
            );
            const actions = wrapper.get('[data-slot="header-ribbon-actions"]');

            expect(wrapper.attributes()).toMatchObject({
                role: "toolbar",
                "aria-label": "Editor actions",
                "data-placement": placement,
            });
            expect(wrapper.attributes("data-expanded")).toBeUndefined();
            expect(anchor.element.tagName).toBe("BUTTON");
            expect(anchor.attributes()).toMatchObject({
                type: "button",
                "aria-label": "Toggle editor actions",
                "aria-expanded": "false",
                "aria-pressed": "false",
            });
            expect(anchor.attributes("aria-controls")).toBe(actions.attributes("id"));
            expect(anchor.get("[data-anchor-glyph]").attributes("aria-hidden")).toBe(
                "true",
            );
            expect(anchor.find("button").exists()).toBe(false);
            expect(actions.attributes("inert")).toBeDefined();
            expect(actions.attributes("aria-hidden")).toBe("true");

            wrapper.unmount();
        },
    );

    it("owns a focusable anchor even when collapsible decoration is omitted", () => {
        const wrapper = mount(HeaderRibbon, {
            props: {
                mode: "collapsible",
                anchorLabel: "Toggle editor actions",
            },
            slots: { items: '<button type="button">Search</button>' },
            attachTo: document.body,
        });
        const anchor = wrapper.get<HTMLButtonElement>(
            '[data-slot="header-ribbon-anchor"]',
        );

        anchor.element.focus();
        expect(document.activeElement).toBe(anchor.element);
        expect(anchor.attributes("aria-label")).toBe("Toggle editor actions");

        wrapper.unmount();
    });

    it.each([
        ["omitted", undefined],
        ["blank", "   "],
    ] as const)(
        "falls back to persistent behavior for a runtime-%s anchor label",
        (name, anchorLabel) => {
            const warning = vi.spyOn(console, "warn").mockImplementation(() => {});
            const runtimeProps =
                anchorLabel === undefined
                    ? { mode: "collapsible" }
                    : { mode: "collapsible", anchorLabel };
            const wrapper = mount(HeaderRibbon, {
                props: runtimeProps as never,
                slots: { items: '<button type="button">Search</button>' },
            });

            expect(name).toBeTruthy();
            expect(warning).toHaveBeenCalledWith(
                expect.stringContaining("requires a non-empty `anchorLabel`"),
            );
            expect(wrapper.attributes("data-expanded")).toBe("true");
            expect(wrapper.find('[data-slot="header-ribbon-anchor"]').exists()).toBe(
                false,
            );
            expect(
                wrapper.get('[data-slot="header-ribbon-actions"]').attributes(),
            ).toMatchObject({ "aria-hidden": "false" });
            expect(
                wrapper.get('[data-slot="header-ribbon-actions"]').attributes("inert"),
            ).toBeUndefined();
        },
    );

    it("drops pinned state across an explicit mode round-trip", async () => {
        const wrapper = mountRibbon();
        const anchor = () =>
            wrapper.get<HTMLButtonElement>('[data-slot="header-ribbon-anchor"]');

        anchor().element.click();
        await nextTick();
        expect(wrapper.attributes("data-pinned")).toBe("true");

        await wrapper.setProps({ mode: "persistent", anchorLabel: undefined });
        expect(wrapper.attributes("data-expanded")).toBe("true");
        expect(wrapper.attributes("data-pinned")).toBeUndefined();
        expect(wrapper.find('[data-slot="header-ribbon-anchor"]').exists()).toBe(false);

        await wrapper.setProps({
            mode: "collapsible",
            anchorLabel: "Toggle editor actions",
        });
        expect(wrapper.attributes("data-expanded")).toBeUndefined();
        expect(wrapper.attributes("data-pinned")).toBeUndefined();
        expect(anchor().attributes("aria-expanded")).toBe("false");
    });

    it("keeps pin and focus across a same-mode anchor relabel", async () => {
        const wrapper = mountRibbon();
        const anchor = () =>
            wrapper.get<HTMLButtonElement>('[data-slot="header-ribbon-anchor"]');

        anchor().element.click();
        anchor().element.focus();
        await nextTick();
        expect(wrapper.attributes("data-pinned")).toBe("true");
        expect(wrapper.attributes("data-expanded")).toBe("true");

        await wrapper.setProps({ anchorLabel: "Toggle formatting actions" });

        expect(anchor().attributes("aria-label")).toBe("Toggle formatting actions");
        expect(wrapper.attributes("data-pinned")).toBe("true");
        expect(wrapper.attributes("data-expanded")).toBe("true");
        expect(anchor().attributes("aria-expanded")).toBe("true");
        expect(document.activeElement).toBe(anchor().element);
    });

    it("drops focus presence when its owned anchor leaves the mode contract", async () => {
        const wrapper = mountRibbon();
        const anchor = () =>
            wrapper.get<HTMLButtonElement>('[data-slot="header-ribbon-anchor"]');
        const actions = () => wrapper.get('[data-slot="header-ribbon-actions"]');
        const ownedAnchor = anchor().element;

        ownedAnchor.focus();
        await nextTick();
        expect(wrapper.attributes("data-expanded")).toBe("true");

        await wrapper.setProps({ mode: "persistent", anchorLabel: undefined });
        expect(wrapper.attributes("data-expanded")).toBe("true");
        expect(document.activeElement).not.toBe(ownedAnchor);

        await wrapper.setProps({
            mode: "collapsible",
            anchorLabel: "Toggle editor actions",
        });
        expect(wrapper.attributes("data-expanded")).toBeUndefined();
        expect(anchor().attributes("aria-expanded")).toBe("false");
        expect(actions().attributes("inert")).toBeDefined();
    });

    it("keeps focused actions revealed when persistent mode becomes collapsible", async () => {
        const outside = document.createElement("button");
        document.body.appendChild(outside);
        const wrapper = mount(HeaderRibbon, {
            slots: { items: '<button data-item type="button">Search</button>' },
            attachTo: document.body,
        });
        const item = wrapper.get<HTMLButtonElement>("[data-item]");

        item.element.focus();
        await nextTick();
        await wrapper.setProps({
            mode: "collapsible",
            anchorLabel: "Toggle editor actions",
        });
        const anchor = wrapper.get<HTMLButtonElement>(
            '[data-slot="header-ribbon-anchor"]',
        );
        const actions = wrapper.get('[data-slot="header-ribbon-actions"]');

        expect(document.activeElement).toBe(item.element);
        expect(wrapper.attributes("data-expanded")).toBe("true");
        expect(anchor.attributes("aria-expanded")).toBe("true");
        expect(actions.attributes("inert")).toBeUndefined();

        outside.focus();
        await nextTick();
        expect(wrapper.attributes("data-expanded")).toBeUndefined();
        expect(anchor.attributes("aria-expanded")).toBe("false");
        expect(actions.attributes("inert")).toBeDefined();
    });

    it("renders total persistent and collapsible contracts during SSR", async () => {
        const PersistentHost = defineComponent(() => () =>
            h(
                HeaderRibbon,
                { placement: "right" },
                {
                    anchor: () => h(Fragment, null, []),
                    items: () => h("button", { type: "button" }, "Search"),
                },
            ),
        );
        const CollapsibleHost = defineComponent(() => () =>
            h(
                HeaderRibbon,
                {
                    mode: "collapsible",
                    anchorLabel: "Toggle editor actions",
                },
                {
                    anchor: () => h("span", { "aria-hidden": "true" }, "Menu"),
                    items: () => h("button", { type: "button" }, "Search"),
                },
            ),
        );
        const persistentHtml = await renderToString(createSSRApp(PersistentHost));
        const collapsibleHtml = await renderToString(createSSRApp(CollapsibleHost));
        const host = document.createElement("div");

        host.innerHTML = persistentHtml;
        const persistent = host.querySelector<HTMLElement>(
            '[data-slot="header-ribbon"]',
        )!;
        const persistentActions = host.querySelector<HTMLElement>(
            '[data-slot="header-ribbon-actions"]',
        )!;
        expect(persistent.dataset.expanded).toBe("true");
        expect(host.querySelector('[data-slot="header-ribbon-anchor"]')).toBeNull();
        expect(persistentActions.hasAttribute("inert")).toBe(false);
        expect(persistentActions.getAttribute("aria-hidden")).toBe("false");

        host.innerHTML = collapsibleHtml;
        const collapsible = host.querySelector<HTMLElement>(
            '[data-slot="header-ribbon"]',
        )!;
        const anchor = host.querySelector<HTMLButtonElement>(
            '[data-slot="header-ribbon-anchor"]',
        )!;
        const actions = host.querySelector<HTMLElement>(
            '[data-slot="header-ribbon-actions"]',
        )!;
        expect(collapsible.hasAttribute("data-expanded")).toBe(false);
        expect(anchor.getAttribute("aria-label")).toBe("Toggle editor actions");
        expect(anchor.getAttribute("aria-expanded")).toBe("false");
        expect(anchor.getAttribute("aria-controls")).toBe(actions.id);
        expect(actions.hasAttribute("inert")).toBe(true);
        expect(actions.getAttribute("aria-hidden")).toBe("true");

        document.body.appendChild(host);
        const hydration = createSSRApp(CollapsibleHost);
        hydration.mount(host);
        const hydratedAnchor = host.querySelector<HTMLButtonElement>(
            '[data-slot="header-ribbon-anchor"]',
        )!;
        hydratedAnchor.focus();
        await nextTick();
        expect(
            host
                .querySelector<HTMLElement>('[data-slot="header-ribbon"]')
                ?.getAttribute("data-expanded"),
        ).toBe("true");
        expect(hydratedAnchor.getAttribute("aria-controls")).toBe(
            host.querySelector<HTMLElement>('[data-slot="header-ribbon-actions"]')?.id,
        );
        hydration.unmount();
    });

    it.each(["left", "right"] as const)(
        "keeps an anchorless %s ribbon visible and natively operable on first render",
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
                attachTo: document.body,
            });

            const actions = wrapper.get('[data-slot="header-ribbon-actions"]');
            const item = wrapper.get<HTMLButtonElement>("[data-item]");
            expect(wrapper.attributes("data-expanded")).toBe("true");
            expect(wrapper.find('[data-slot="header-ribbon-anchor"]').exists()).toBe(
                false,
            );
            expect(actions.attributes("inert")).toBeUndefined();
            expect(actions.attributes("aria-hidden")).toBe("false");

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
            expect(wrapper.attributes("data-expanded")).toBe("true");

            wrapper.unmount();
        },
    );

    it.each(persistentAnchorCases)(
        "does not infer behavior from %s anchor-slot content",
        (name, anchor) => {
            const wrapper = mount(HeaderRibbon, {
                slots: {
                    anchor,
                    items: () => h("button", { type: "button" }, "Theme"),
                },
            });

            expect(name).toBeTruthy();
            expect(wrapper.attributes("data-expanded")).toBe("true");
            expect(wrapper.find('[data-slot="header-ribbon-anchor"]').exists()).toBe(
                false,
            );
            expect(
                wrapper.get('[data-slot="header-ribbon-actions"]').attributes("inert"),
            ).toBeUndefined();
        },
    );

    it("reveals a collapsible ribbon for native focus presence", async () => {
        const outside = document.createElement("button");
        document.body.appendChild(outside);
        const wrapper = mountRibbon("left");
        const anchor = wrapper.get<HTMLButtonElement>(
            '[data-slot="header-ribbon-anchor"]',
        );
        const item = wrapper.get<HTMLButtonElement>("[data-item]");
        const actions = wrapper.get('[data-slot="header-ribbon-actions"]');

        anchor.element.focus();
        await nextTick();
        expect(wrapper.attributes("data-expanded")).toBe("true");
        expect(anchor.attributes("aria-expanded")).toBe("true");
        expect(actions.attributes("inert")).toBeUndefined();

        item.element.focus();
        await nextTick();
        expect(wrapper.attributes("data-expanded")).toBe("true");

        outside.focus();
        await nextTick();
        expect(wrapper.attributes("data-expanded")).toBeUndefined();
        expect(anchor.attributes("aria-expanded")).toBe("false");
        expect(actions.attributes("inert")).toBeDefined();

        wrapper.unmount();
        outside.remove();
    });

    it("reveals on pointer hover while touch clicks pin", async () => {
        const wrapper = mountRibbon("right");
        const anchor = wrapper.get<HTMLButtonElement>(
            '[data-slot="header-ribbon-anchor"]',
        );

        pointer(wrapper.element, "pointerenter", "mouse");
        await nextTick();
        expect(wrapper.attributes("data-expanded")).toBe("true");
        expect(anchor.attributes("aria-expanded")).toBe("true");

        pointer(wrapper.element, "pointerleave", "mouse");
        await nextTick();
        expect(wrapper.attributes("data-expanded")).toBeUndefined();
        expect(anchor.attributes("aria-expanded")).toBe("false");

        pointer(wrapper.element, "pointerenter", "touch");
        await nextTick();
        expect(wrapper.attributes("data-expanded")).toBeUndefined();

        anchor.element.click();
        await nextTick();
        expect(wrapper.attributes("data-pinned")).toBe("true");
        expect(wrapper.attributes("data-expanded")).toBe("true");
        expect(anchor.attributes("aria-expanded")).toBe("true");
        expect(anchor.attributes("aria-pressed")).toBe("true");

        anchor.element.click();
        await nextTick();
        expect(wrapper.attributes("data-pinned")).toBeUndefined();
        expect(anchor.attributes("aria-expanded")).toBe("false");
        expect(anchor.attributes("aria-pressed")).toBe("false");

        wrapper.unmount();
    });

    it("unpins on Escape and returns focus to the owned anchor", async () => {
        const outside = document.createElement("button");
        document.body.appendChild(outside);
        const wrapper = mountRibbon("left");
        const anchor = wrapper.get<HTMLButtonElement>(
            '[data-slot="header-ribbon-anchor"]',
        );
        const item = wrapper.get<HTMLButtonElement>("[data-item]");
        const actions = wrapper.get('[data-slot="header-ribbon-actions"]');

        anchor.element.click();
        item.element.focus();
        const escape = new KeyboardEvent("keydown", {
            key: "Escape",
            bubbles: true,
            cancelable: true,
        });
        item.element.dispatchEvent(escape);
        await nextTick();

        expect(escape.defaultPrevented).toBe(true);
        expect(wrapper.attributes("data-pinned")).toBeUndefined();
        expect(wrapper.attributes("data-expanded")).toBe("true");
        expect(anchor.attributes("aria-expanded")).toBe("true");
        expect(actions.attributes("inert")).toBeUndefined();
        expect(document.activeElement).toBe(anchor.element);

        outside.focus();
        await nextTick();
        expect(wrapper.attributes("data-expanded")).toBeUndefined();
        expect(anchor.attributes("aria-expanded")).toBe("false");
        expect(actions.attributes("inert")).toBeDefined();

        wrapper.unmount();
        outside.remove();
    });
});
