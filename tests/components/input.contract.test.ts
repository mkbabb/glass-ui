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
        // [2026-08-08 · BK #82 W-FIELD] The class-equality assertion that used to
        // stand here certified `glass-defined` — a register whose every channel the
        // field's own shorthands reset, so the class was on the element and inert
        // on all ~57 fields. Asserting a class list is not asserting a material;
        // the register's composition is now the W-FIELD battery's own clause
        // (`tests/components/field/forms-seam.test.ts`, G-F1), which reads the
        // sheet. What survives here is the CONSUMER contract: a caller's class is
        // merged, never dropped.
        expect(wrapper.classes()).toContain("consumer-class");
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

    it("preserves controlled and uncontrolled editing on ONE model", async () => {
        const controlled = mount(Input, { props: { modelValue: "before" } });
        await controlled.setValue("after");
        expect(controlled.emitted("update:modelValue")?.at(-1)).toEqual(["after"]);

        // `defaultValue` is gone with `useVModel`: `defineModel` holds local state
        // when no `v-model` is bound, so an uncontrolled field is the SAME
        // mechanism at rest and needs no second prop to seed it.
        const uncontrolled = mount(Input);
        expect((uncontrolled.element as HTMLInputElement).value).toBe("");
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
