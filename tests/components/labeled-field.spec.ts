import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { LabeledInput } from "@glass/components/labeled-field";
import { useUserInvalidAria } from "@glass/composables/dom/useUserInvalidAria";

describe("form validity ownership", () => {
    it("forwards native input attributes and owns one linked, quiet error", async () => {
        const wrapper = mount(LabeledInput, {
            attrs: {
                class: "field-grid-cell",
            },
            props: {
                autocomplete: "postal-code",
                enterkeyhint: "done",
                errorLive: "off",
                inputmode: "numeric",
                label: "ZIP",
                modelValue: "",
                pattern: "[0-9]{5}",
                placeholder: "27606",
                required: true,
            },
            slots: { error: "Enter a five-digit ZIP code." },
        });

        const input = wrapper.get("input");
        const error = wrapper.get(".labeled-field-error");
        expect(wrapper.classes()).toContain("field-grid-cell");
        expect(input.attributes()).toMatchObject({
            autocomplete: "postal-code",
            enterkeyhint: "done",
            inputmode: "numeric",
            pattern: "[0-9]{5}",
            placeholder: "27606",
            required: "",
        });
        expect(input.attributes("aria-errormessage")).toBe(error.attributes("id"));
        expect(error.attributes("aria-live")).toBeUndefined();

        await input.setValue("27606");
        expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual(["27606"]);
    });

    it("marks every required control on submit and clears corrected controls", () => {
        const form = document.createElement("form");
        form.innerHTML = `
            <input required aria-errormessage="email-error">
            <input required pattern="[0-9]{5}" aria-errormessage="zip-error">
            <input required aria-errormessage="name-error">
            <textarea></textarea>
        `;
        const controls = [...form.querySelectorAll<HTMLInputElement>("input")];
        const stop = useUserInvalidAria().bind(form);

        form.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
        expect(controls.map((control) => control.getAttribute("aria-invalid"))).toEqual([
            "true",
            "true",
            "true",
        ]);

        controls[2]!.value = "Studio";
        controls[2]!.dispatchEvent(new Event("input", { bubbles: true }));
        expect(controls[2]!.getAttribute("aria-invalid")).toBe("false");
        stop();
    });
});
