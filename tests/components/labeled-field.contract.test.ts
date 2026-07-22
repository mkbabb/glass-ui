import { mount } from "@vue/test-utils";
import { h, nextTick } from "vue";
import { describe, expect, it } from "vitest";
import {
    LabeledField,
    LabeledInput,
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
    type LabeledFieldSlotProps,
} from "@glass/components/labeled-field";

describe("LabeledField contract", () => {
    it("owns stable label, description, and control associations", async () => {
        const wrapper = mount(LabeledField, {
            props: {
                label: "Workspace name",
                description: "Visible to collaborators.",
            },
            slots: {
                default: ({ controlId, labelledBy, describedBy }: LabeledFieldSlotProps) =>
                    h("input", {
                        id: controlId,
                        "aria-labelledby": labelledBy,
                        "aria-describedby": describedBy,
                    }),
            },
        });

        const label = wrapper.get("label");
        const input = wrapper.get("input");
        const ids = {
            control: input.attributes("id"),
            description: input.attributes("aria-describedby"),
            label: label.attributes("id"),
        };

        expect(label.attributes("for")).toBe(ids.control);
        expect(input.attributes("aria-labelledby")).toBe(ids.label);
        expect(wrapper.get(`#${ids.description}`).text()).toBe("Visible to collaborators.");

        await wrapper.setProps({ layout: "horizontal" });
        expect(wrapper.get("input").attributes("id")).toBe(ids.control);
        expect(wrapper.get("label").attributes("id")).toBe(ids.label);
        expect(
            wrapper.get('[data-slot="labeled-field"]').attributes("data-layout"),
        ).toBe("horizontal");
    });

    it("links active errors through both descriptive ARIA channels", () => {
        const wrapper = mount(LabeledInput, {
            props: {
                description: "Used for release notices.",
                invalid: true,
                label: "Email",
                modelValue: "not-an-address",
                type: "email",
            },
            slots: { error: "Enter a valid email address." },
        });

        const input = wrapper.get("input");
        const error = wrapper.get(".labeled-field-error");
        const describedBy = (input.attributes("aria-describedby") ?? "").split(" ");

        expect(describedBy).toContain(error.attributes("id"));
        expect(describedBy).toContain(wrapper.get(".labeled-field-description").attributes("id"));
        expect(input.attributes("aria-errormessage")).toBe(error.attributes("id"));
        expect(input.attributes("aria-invalid")).toBe("true");
        expect(error.attributes("aria-live")).toBe("polite");
    });

    it("converges native and annotated requirement state", async () => {
        const byRequirement = mount(LabeledInput, {
            props: {
                label: "Release name",
                modelValue: "",
                requirement: "required",
            },
        });
        const byNativeProp = mount(LabeledInput, {
            props: {
                label: "Workspace name",
                modelValue: "",
                required: true,
            },
        });
        const optional = mount(LabeledInput, {
            props: {
                label: "Display name",
                modelValue: "",
                requirement: "optional",
            },
        });
        const form = document.createElement("form");
        document.body.append(form);
        const slider = mount(LabeledSlider, {
            attachTo: form,
            props: {
                label: "Intensity",
                modelValue: 40,
                name: "intensity",
                required: true,
            },
        });
        await nextTick();

        for (const wrapper of [byRequirement, byNativeProp]) {
            expect(wrapper.get("label").attributes("data-requirement")).toBe("required");
            expect(wrapper.get("input").attributes("required")).toBe("");
        }
        expect(optional.get("label").attributes("data-requirement")).toBe("optional");
        expect(optional.get("input").attributes("required")).toBeUndefined();
        expect(slider.get("label").attributes("data-requirement")).toBe("required");
        expect(slider.get('input[name^="intensity"]').attributes("required")).toBe("");
        slider.unmount();
        form.remove();
    });

    it("passes explicit state to the field and underlying control", () => {
        const wrapper = mount(LabeledInput, {
            attrs: { class: "field-grid-cell", "data-atom": "organization" },
            props: {
                disabled: true,
                invalid: true,
                label: "Organization",
                modelValue: "Managed",
            },
            slots: { error: "This value cannot be changed." },
        });

        expect(wrapper.get('[data-slot="labeled-field"]').attributes()).toMatchObject({
            class: "labeled-field field-grid-cell",
            "data-atom": "organization",
            "data-disabled": "true",
            "data-invalid": "true",
        });
        expect(wrapper.get("label").attributes("data-disabled")).toBe("true");
        expect(wrapper.get("input").attributes()).toMatchObject({
            disabled: "",
            "aria-invalid": "true",
        });
        expect(wrapper.get("input").classes()).not.toContain("field-grid-cell");
    });

    // W4-B KEEP ruling (refactor-safety, NOT born-RED — passes at HEAD): the
    // DAG-reduction gated `invalid`/`errorLive` on this band; the ruling is KEEP
    // (both are load-bearing a11y contract, not prop duplication). This guards that
    // `errorLive` remains a live-politeness discriminant through any dedup: it
    // renders the error region's `aria-live` and `off` opts the region out entirely.
    it("honors the errorLive politeness discriminant (W4-B KEEP)", () => {
        const withLive = (errorLive: "polite" | "assertive" | "off") =>
            mount(LabeledField, {
                props: { label: "Email", invalid: true, errorLive },
                slots: {
                    default: () => h("input"),
                    error: () => "Enter a valid email address.",
                },
            });
        expect(withLive("polite").get(".labeled-field-error").attributes("aria-live")).toBe("polite");
        expect(withLive("assertive").get(".labeled-field-error").attributes("aria-live")).toBe("assertive");
        expect(withLive("off").get(".labeled-field-error").attributes("aria-live")).toBeUndefined();
    });

    it("keeps every earned adapter on the same accessible anatomy", () => {
        const cases = [
            mount(LabeledInput, {
                props: { description: "Input help.", label: "Input", modelValue: "" },
            }),
            mount(LabeledSelect, {
                props: {
                    description: "Select help.",
                    items: ["Alpha"],
                    label: "Select",
                    modelValue: "Alpha",
                },
            }),
            mount(LabeledSlider, {
                props: {
                    description: "Slider help.",
                    label: "Slider",
                    max: 100,
                    min: 0,
                    modelValue: 40,
                },
            }),
            mount(LabeledSwitch, {
                props: {
                    description: "Switch help.",
                    label: "Switch",
                    modelValue: true,
                },
            }),
        ];
        const selectors = ["input", '[role="combobox"]', '[role="slider"]', '[role="switch"]'];

        cases.forEach((wrapper, index) => {
            const label = wrapper.get("label");
            const control = wrapper.get(selectors[index]!);
            const descriptionId = control.attributes("aria-describedby");

            expect(wrapper.get(`#${descriptionId}`).text()).toContain("help.");
            if (index === 0) expect(label.attributes("for")).toBe(control.attributes("id"));
            else expect(control.attributes("aria-labelledby")).toBe(label.attributes("id"));
            wrapper.unmount();
        });
    });
});
