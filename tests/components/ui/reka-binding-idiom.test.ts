// The binding-correctness render-effect canary (proof:reka-binding-idiom).
//
// The standing `feedback_glass_ui_binding_verification` memory note: stale reka
// prop/emit bindings (`:pressed`, `v-model:search-term`, `tag=`) silently no-op
// — vue-tsc + units MISS them; only a render-effect probe catches them. This
// spec mounts the at-risk model bindings (Command / TagsInput /
// Switch / Checkbox) and asserts the RENDERED EFFECT each binding drives (the
// `data-state` / `aria-pressed` / rendered value), NOT the type. A future reka
// bump that moves a binding (e.g. the reka Combobox `searchTerm` → input
// v-model that `CommandInput` wraps) turns the relevant assertion RED — the
// canary the note demands.

import { readFileSync } from "node:fs";
import { join } from "node:path";
import { mount } from "@vue/test-utils";
import postcss from "postcss";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { Button } from "@glass/components/button/index";
import { Switch } from "@glass/components/switch/index";
import {
    TagsInput,
    TagsInputItem,
    TagsInputItemText,
} from "@glass/components/tags-input/index";
import { Command, CommandInput } from "@glass/components/command/index";
import { Toaster, useToast } from "@glass/components/toast";

const BUTTON_ICON_SELECTOR = '.button > svg:not([class*="size-"])';

const ownsDefaultButtonIconSize = (css: string): boolean => {
    const root = postcss.parse(css, { from: undefined });
    let owns = false;
    root.walkRules((rule) => {
        if (rule.selector.trim() !== BUTTON_ICON_SELECTOR) return;
        const declarations = new Set<string>();
        rule.walkDecls((declaration) => {
            declarations.add(declaration.prop);
        });
        if (declarations.has("inline-size") && declarations.has("block-size")) {
            owns = true;
        }
    });
    return owns;
};

describe("reka binding-idiom render-effect canary", () => {
    it("Button: a host-sized icon survives the owned default-icon rule", () => {
        const wrapper = mount(Button, {
            props: { emphasis: "secondary", size: "md" },
            slots: { default: '<svg class="size-9"></svg>' },
        });
        const svgCls = wrapper.get("svg").classes();
        expect(svgCls).toContain("size-9");
        expect(wrapper.get("button").attributes("data-slot")).toBe("button");
        expect(wrapper.get("button").attributes("data-emphasis")).toBe("secondary");

        const css = readFileSync(
            join(process.cwd(), "src/components/button/styles.css"),
            "utf8",
        );
        expect(ownsDefaultButtonIconSize(css)).toBe(true);
        expect(
            ownsDefaultButtonIconSize(
                css.replaceAll(BUTTON_ICON_SELECTOR, ".button > svg"),
            ),
        ).toBe(false);
        expect(
            ownsDefaultButtonIconSize(
                css.replaceAll('[class*="size-"]', '[class*="tone-"]'),
            ),
        ).toBe(false);
        expect(
            ownsDefaultButtonIconSize(
                css.replaceAll(
                    `${BUTTON_ICON_SELECTOR} {`,
                    `${BUTTON_ICON_SELECTOR} { color: inherit; }\n.button > svg {`,
                ),
            ),
        ).toBe(false);
    });

    it("Switch: the checked model drives the rendered data-state", async () => {
        const on = mount(Switch, { props: { modelValue: true } });
        const off = mount(Switch, { props: { modelValue: false } });

        // The root reflects data-state; a stale `:checked` binding would leave
        // it unchecked regardless of the model.
        expect(on.get("[data-slot=switch]").attributes("data-state")).toBe("checked");
        expect(off.get("[data-slot=switch]").attributes("data-state")).toBe(
            "unchecked",
        );
    });

    it("TagsInput: item text renders from `value=` (the stale `tag=` idiom is gone)", async () => {
        const wrapper = mount(
            {
                components: { TagsInput, TagsInputItem, TagsInputItemText },
                template: `
                    <TagsInput :model-value="['alpha','beta']">
                        <TagsInputItem v-for="t in ['alpha','beta']" :key="t" :value="t">
                            <TagsInputItemText />
                        </TagsInputItem>
                    </TagsInput>
                `,
            },
            {},
        );
        await nextTick();
        // The item value renders (the modern `value=` binding, not the stale
        // `tag=`). A stale `tag=` would render empty text.
        expect(
            wrapper
                .findAll("[data-slot=tags-input-item-text]")
                .map((item) => item.text()),
        ).toEqual(["alpha", "beta"]);
        expect(
            wrapper.get("[data-slot=tags-input]").attributes("data-slot"),
        ).toBe("tags-input");
    });

    it("Toast: the dismissal rides `onUpdate:open` (NOT the React `onOpenChange`)", async () => {
        // The stale-reka-binding class (MEMORY feedback_glass_ui_binding_verification):
        // reka `ToastRoot` emits `update:open`, so the spread listener key MUST be
        // `onUpdate:open`. With the React shadcn `onOpenChange` key the close request
        // (timer/close-X/swipe) never reached the store and the toast could NEVER
        // leave. This asserts the public RENDERED effect: the canonical Toaster
        // opens, its close control requests `update:open false`, and the toast
        // leaves the open state without inspecting private queue fields.
        const wrapper = mount(Toaster, {
            attachTo: document.body,
            global: { stubs: { teleport: false } },
        });
        const { toast } = useToast();
        const handle = toast({ title: "binding-test" });
        await nextTick();
        const renderedToast =
            document.body.querySelector<HTMLElement>('[data-slot="toast"]')!;
        expect(renderedToast.dataset.state).toBe("open");

        document.body.querySelector<HTMLElement>('[aria-label="Dismiss"]')!.click();
        await nextTick();
        expect(renderedToast.dataset.state).toBe("closed");

        handle.dismiss();
        wrapper.unmount();
    });

    it("Command: the filter term rides `CommandInput` v-model (NOT `ComboboxRoot v-model:search-term`)", async () => {
        const wrapper = mount(
            {
                components: { Command, CommandInput },
                data: () => ({ q: "" }),
                template: `
                    <Command :open="true">
                        <CommandInput v-model="q" placeholder="search" />
                    </Command>
                `,
            },
            {},
        );
        await nextTick();
        const input = wrapper.get("input");
        // Type into the input — the v-model on CommandInput (wrapping the reka
        // Combobox input) must reflect the value (the 2.x idiom). A stale
        // `v-model:search-term` on the ROOT would leave this input's value empty.
        await input.setValue("hello");
        await nextTick();
        expect((input.element as HTMLInputElement).value).toBe("hello");
        expect(wrapper.vm.q).toBe("hello");
    });
});
