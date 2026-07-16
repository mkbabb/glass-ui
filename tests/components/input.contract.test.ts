import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import * as InputSurface from "@glass/components/input";
import { Input } from "@glass/components/input";

describe("Input contract", () => {
    it("publishes one native single-line control", () => {
        expect(Object.keys(InputSurface)).toEqual(["Input"]);

        const wrapper = mount(Input, {
            attrs: { "data-consumer": "field" },
            props: { class: "consumer-class" },
        });

        expect(wrapper.element.tagName).toBe("INPUT");
        expect(wrapper.classes()).toEqual([
            "field-control",
            "glass-defined",
            "consumer-class",
        ]);
        expect(wrapper.attributes()).toMatchObject({
            "data-consumer": "field",
            "data-kind": "input",
            "data-size": "md",
            "data-slot": "input",
            "data-state": "default",
            type: "text",
        });
    });

    it("forwards native form, autocomplete, and input hints to the input", () => {
        const wrapper = mount(Input, {
            attrs: {
                enterkeyhint: "done",
                form: "profile-form",
                maxlength: "64",
            },
            props: {
                autocomplete: "email",
                inputmode: "email",
                modelValue: "ada@example.com",
                name: "email",
                pattern: ".+@.+",
                required: true,
                type: "email",
            },
        });

        expect(wrapper.attributes()).toMatchObject({
            autocomplete: "email",
            enterkeyhint: "done",
            form: "profile-form",
            inputmode: "email",
            maxlength: "64",
            name: "email",
            pattern: ".+@.+",
            required: "",
            type: "email",
        });
        expect((wrapper.element as HTMLInputElement).value).toBe("ada@example.com");
    });

    it("preserves controlled and default-value editing", async () => {
        const controlled = mount(Input, { props: { modelValue: "before" } });
        await controlled.setValue("after");
        expect(controlled.emitted("update:modelValue")?.at(-1)).toEqual(["after"]);

        const uncontrolled = mount(Input, { props: { defaultValue: "draft" } });
        expect((uncontrolled.element as HTMLInputElement).value).toBe("draft");
        await uncontrolled.setValue("revised");
        expect(uncontrolled.emitted("update:modelValue")?.at(-1)).toEqual(["revised"]);
    });

    it("participates in native form submission", () => {
        const form = document.createElement("form");
        form.id = "input-contract-form";
        document.body.append(form);
        const wrapper = mount(Input, {
            attachTo: document.body,
            props: {
                form: form.id,
                modelValue: "ada@example.com",
                name: "email",
            },
        });

        expect(new FormData(form).get("email")).toBe("ada@example.com");
        wrapper.unmount();
        form.remove();
    });

    it("reflects caller-owned invalid linkage without inventing an error wrapper", () => {
        const wrapper = mount(Input, {
            attrs: {
                "aria-describedby": "email-help email-error",
                "aria-errormessage": "email-error",
            },
            props: { invalid: true },
        });

        expect(wrapper.attributes()).toMatchObject({
            "aria-describedby": "email-help email-error",
            "aria-errormessage": "email-error",
            "aria-invalid": "true",
            "data-state": "invalid",
        });
        expect(wrapper.findAll("[role='alert']")).toHaveLength(0);

        const ariaOwned = mount(Input, {
            attrs: { "aria-invalid": "true" },
        });
        expect(ariaOwned.attributes("data-state")).toBe("invalid");
    });

    it("derives semantic state from native readonly and disabled truth", () => {
        const readonly = mount(Input, { props: { readonly: true, size: "sm" } });
        expect(readonly.attributes()).toMatchObject({
            "data-size": "sm",
            "data-state": "readonly",
            readonly: "",
        });

        const disabled = mount(Input, {
            attrs: { "aria-invalid": "true" },
            props: { disabled: true, size: "lg" },
        });
        expect(disabled.attributes()).toMatchObject({
            "aria-invalid": "true",
            "data-size": "lg",
            "data-state": "disabled",
            disabled: "",
        });
    });

    it.each(["true", "grammar", "spelling"] as const)(
        "treats aria-invalid=%s as invalid",
        (ariaInvalid) => {
            const wrapper = mount(Input, {
                attrs: { "aria-invalid": ariaInvalid },
            });
            expect(wrapper.attributes("data-state")).toBe("invalid");
        },
    );
});
