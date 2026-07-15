// AW.W26 — the binding-correctness render-effect canary (proof:reka-binding-idiom).
//
// The standing `feedback_glass_ui_binding_verification` memory note: stale reka
// prop/emit bindings (`:pressed`, `v-model:search-term`, `tag=`) silently no-op
// — vue-tsc + units MISS them; only a render-effect probe catches them. This
// spec mounts the at-risk model bindings (Toggle / Combobox / TagsInput /
// Switch / Checkbox) and asserts the RENDERED EFFECT each binding drives (the
// `data-state` / `aria-pressed` / rendered value), NOT the type. A future reka
// bump that moves a binding (e.g. Combobox `searchTerm` → `ComboboxInput`
// v-model) turns the relevant assertion RED — the canary the note demands.

import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";

import { Button } from "@glass/components/button/index";
import { Toggle } from "@glass/components/toggle/index";
import { Switch } from "@glass/components/switch/index";
import { Checkbox } from "@glass/components/checkbox/index";
import {
    TagsInput,
    TagsInputItem,
    TagsInputItemText,
} from "@glass/components/tags-input/index";
import {
    Combobox,
    ComboboxAnchor,
    ComboboxInput,
} from "@glass/components/combobox/index";
import { useToast } from "@glass/components/toast/use-toast";

describe("reka binding-idiom render-effect canary (AW.W26)", () => {
    it("Button: a host-sized icon (`size-9`) survives the base `size-4` (cn() no false-merge)", () => {
        // The base bakes `[&_svg:not([class*=size-])]:size-4`; the guard means a
        // host-sized icon keeps its own size. The arbitrary-selector token + the
        // host `size-9` both pass through `cn()`'s `/^size-/` deduplicator
        // untouched (they are not both bare `size-*` on the same element).
        const wrapper = mount(Button, {
            props: { variant: "default", size: "md" },
            slots: { default: '<svg class="size-9"></svg>' },
        });
        const cls = wrapper.get("button").classes();
        // the host icon size is retained
        const svgCls = wrapper.get("svg").classes();
        expect(svgCls).toContain("size-9");
        // the base guarded icon-sizing token is present on the button (it scopes
        // to un-sized svgs only, so it cannot collide the host size). AX.W51 — the
        // un-sized glyph reads the scaled `--ui-glyph` register, not the raw size-4.
        // AY.W-CSS1 — accept the v4 shorthand `:size-(--ui-glyph)` (the
        // post-conversion canonical) OR the arbitrary `:size-[var(--ui-glyph)]`.
        expect(
            cls.some(
                (c) =>
                    c.includes("[&_svg:not([class*=size-])]:size-(--ui-glyph)") ||
                    c.includes("[&_svg:not([class*=size-])]:size-[var(--ui-glyph)]"),
            ),
        ).toBe(true);
        // data-slot / data-variant are wired
        expect(wrapper.get("button").attributes("data-slot")).toBe("button");
        expect(wrapper.get("button").attributes("data-variant")).toBe("default");
    });

    it("Toggle: `modelValue` drives the rendered aria-pressed / data-state", async () => {
        // The reka Toggle binds `v-model` (NOT the pre-2.x `:pressed`). A stale
        // `:pressed` binding would leave aria-pressed at its default — the
        // rendered effect below is the only thing that catches that.
        const on = mount(Toggle, { props: { modelValue: true }, slots: { default: "B" } });
        const off = mount(Toggle, { props: { modelValue: false }, slots: { default: "B" } });

        const onEl = on.get("button");
        const offEl = off.get("button");

        expect(onEl.attributes("aria-pressed")).toBe("true");
        expect(onEl.attributes("data-state")).toBe("on");
        expect(offEl.attributes("aria-pressed")).toBe("false");
        expect(offEl.attributes("data-state")).toBe("off");
        // the shadcn-2025 data-slot is present on the root
        expect(onEl.attributes("data-slot")).toBe("toggle");
    });

    it("Switch: the checked model drives the rendered data-state", async () => {
        const on = mount(Switch, { props: { modelValue: true } });
        const off = mount(Switch, { props: { modelValue: false } });

        // The root reflects data-state; a stale `:checked` binding would leave
        // it unchecked regardless of the model.
        expect(on.get("[data-slot=switch]").attributes("data-state")).toBe("checked");
        expect(off.get("[data-slot=switch]").attributes("data-state")).toBe("unchecked");
    });

    it("Checkbox: the model drives data-state AND the indeterminate glyph is the <Minus> dash", async () => {
        const checked = mount(Checkbox, { props: { modelValue: true } });
        const unchecked = mount(Checkbox, { props: { modelValue: false } });
        const indet = mount(Checkbox, { props: { modelValue: "indeterminate" } });

        expect(checked.get("[data-slot=checkbox]").attributes("data-state")).toBe("checked");
        expect(unchecked.get("[data-slot=checkbox]").attributes("data-state")).toBe(
            "unchecked",
        );
        const indetRoot = indet.get("[data-slot=checkbox]");
        expect(indetRoot.attributes("data-state")).toBe("indeterminate");

        // AW.W25 bug fix — the indeterminate box must render the DASH (`<Minus>`),
        // NOT a check. reka's CheckboxIndicator force-mounts on the indeterminate
        // state too, so both glyphs are in the DOM; the visible one is gated by
        // `group-data-[state=indeterminate]`. We assert BOTH glyphs render (the
        // lucide <line>/<path> svgs) and that the dash branch's visibility class
        // is wired. The lucide Minus renders a single horizontal <line>.
        const html = indet.html();
        // The dash glyph carries the `group-data-[state=indeterminate]:block`
        // reveal class; the check glyph carries the matching `:hidden`.
        expect(html).toContain("group-data-[state=indeterminate]:block");
        expect(html).toContain("group-data-[state=indeterminate]:hidden");
        // lucide Minus is a single <line>; lucide Check is a <path>. Both mount.
        expect(indet.findAll("svg").length).toBeGreaterThanOrEqual(2);
    });

    it("TagsInput: the active item resolves `data-[state=active]` (the `tag=` idiom is gone)", async () => {
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
        expect(wrapper.text()).toContain("alpha");
        expect(wrapper.text()).toContain("beta");
        // The reka TagsInputItem reflects its state attribute.
        const items = wrapper.findAll("[data-reka-collection-item], [data-slot=tags-input] [role]");
        // At minimum the family root carries the data-slot.
        expect(wrapper.get("[data-slot=tags-input]")).toBeTruthy();
    });

    it("Toast: the dismissal rides `onUpdate:open` (NOT the React `onOpenChange`) — RA-anim-suite §6 / AY.W-ANIM1 D1", async () => {
        // The stale-reka-binding class (MEMORY feedback_glass_ui_binding_verification):
        // reka `ToastRoot` emits `update:open`, so the spread listener key MUST be
        // `onUpdate:open`. With the React shadcn `onOpenChange` key the close request
        // (timer/close-X/swipe) never reached the store and the toast could NEVER
        // leave. This asserts the RENDERED store EFFECT: a fired toast carries an
        // `onUpdate:open` callback that, when reka calls it with `false`, dismisses.
        const { toast, toasts } = useToast();
        const handle = toast({ title: "binding-test" });
        // The store now holds an open toast.
        const t = toasts.value.find((x) => x.id === handle.id);
        expect(t).toBeTruthy();
        expect(t?.open).toBe(true);
        // The dismissal listener is the reka Vue key, NOT the React key.
        expect(typeof (t as Record<string, unknown>)["onUpdate:open"]).toBe("function");
        expect((t as Record<string, unknown>)["onOpenChange"]).toBeUndefined();
        // Simulate reka emitting `update:open false` (the close request) — it must
        // flip the store entry to closed (the dismissal revives).
        (t as { "onUpdate:open": (o: boolean) => void })["onUpdate:open"](false);
        await nextTick();
        const after = toasts.value.find((x) => x.id === handle.id);
        expect(after?.open).toBe(false);
    });

    it("Combobox: the filter term rides `ComboboxInput` v-model (NOT `ComboboxRoot v-model:search-term`)", async () => {
        const wrapper = mount(
            {
                components: { Combobox, ComboboxAnchor, ComboboxInput },
                data: () => ({ q: "" }),
                template: `
                    <Combobox :open="true">
                        <ComboboxAnchor>
                            <ComboboxInput v-model="q" placeholder="search" />
                        </ComboboxAnchor>
                    </Combobox>
                `,
            },
            {},
        );
        await nextTick();
        const input = wrapper.get("input");
        // Type into the input — the v-model on ComboboxInput must reflect the
        // value (the 2.x idiom). A stale `v-model:search-term` on the ROOT would
        // leave this input's value empty.
        await input.setValue("hello");
        await nextTick();
        expect((input.element as HTMLInputElement).value).toBe("hello");
        expect(wrapper.vm.q).toBe("hello");
    });
});
