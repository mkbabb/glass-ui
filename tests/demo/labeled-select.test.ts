import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { nextTick } from "vue";

import LabeledSelect from "../../demo/chassis/field/LabeledSelect.vue";

// BK #57 W-LABELED-FIELD. `LabeledSelect` is demo-private after the DAG 4.11 SPLIT
// (an `items` array is a preset, and it was the only reason `./labeled-field`
// dragged the overlay chain), so its cases live with the demo that now owns it.
//
// The FFN-10 cases were born RED against the relocated-but-unfixed bytes: `items`
// was `readonly string[]`, so every caller holding labels for its options threw
// them away at the boundary (`:items="OPTIONS.map((o) => o.value)"`) and kept a
// second lookup table alive to name them again. Passing the pairs the callers
// actually have rendered `[object Object]` and selected nothing.
//
// `teleport: false` + the explicit unmount ledger because `tests/setup.ts` stubs
// teleport globally and the option list is portalled: the dropdown-menu/command/
// popover idiom, verbatim.

const COLOR_OPTIONS = [
    { label: "Fourier (warm)", value: "var(--viz-fourier)" },
    { label: "Chebyshev (cool)", value: "var(--viz-chebyshev)" },
] as const;

const mounted: Array<ReturnType<typeof mount>> = [];

afterEach(() => {
    while (mounted.length) mounted.pop()?.unmount();
});

async function mountOpen(props: Record<string, unknown>) {
    const wrapper = mount(LabeledSelect, {
        attachTo: document.body,
        global: { stubs: { teleport: false } },
        props,
    });
    mounted.push(wrapper);
    await nextTick();
    await nextTick();
    return wrapper;
}

const optionTexts = () =>
    [...document.querySelectorAll('[role="option"]')].map((option) =>
        option.textContent?.trim(),
    );

describe("LabeledSelect — the demo's labelled-select preset", () => {
    it("renders option LABELS while the VALUE stays the contract (FFN-10)", async () => {
        const wrapper = await mountOpen({
            items: COLOR_OPTIONS,
            label: "Curve hue",
            // A VALUE, not a label — the caller keeps holding values.
            modelValue: "var(--viz-chebyshev)",
            open: true,
        });

        expect(optionTexts()).toEqual(["Fourier (warm)", "Chebyshev (cool)"]);
        // The value keyed the selection; the label is what a reader is shown. Both
        // halves in one case — a rendered label that selected nothing would be the
        // same defect wearing better clothes.
        expect(
            document
                .querySelector('[role="option"][aria-selected="true"]')
                ?.textContent?.trim(),
        ).toBe("Chebyshev (cool)");
        expect(wrapper.get('[role="combobox"]').text()).toBe("Chebyshev (cool)");
    });

    it("treats a bare string as an option whose label is its own value", async () => {
        const wrapper = await mountOpen({
            items: ["Quiet", "Balanced", "Vivid"],
            label: "Intensity",
            modelValue: "Balanced",
            open: true,
        });

        expect(optionTexts()).toEqual(["Quiet", "Balanced", "Vivid"]);
        expect(wrapper.get('[role="combobox"]').text()).toBe("Balanced");
    });

    // Re-homed from `tests/components/labeled-field.contract.test.ts` with the
    // component: the preset must keep the library anatomy it composes, or the demo
    // teaches an accessible shape the library does not actually produce.
    it("keeps the library field anatomy it composes", () => {
        const wrapper = mount(LabeledSelect, {
            props: {
                description: "Select help.",
                items: ["Alpha"],
                label: "Select",
                modelValue: "Alpha",
            },
        });
        mounted.push(wrapper);

        const label = wrapper.get("label");
        const control = wrapper.get('[role="combobox"]');

        expect(control.attributes("aria-labelledby")).toBe(label.attributes("id"));
        expect(
            wrapper.get(`#${control.attributes("aria-describedby")}`).text(),
        ).toContain("help.");
    });
});
