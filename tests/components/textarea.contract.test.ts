import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import * as TextareaSurface from "@glass/components/textarea";
import { Textarea } from "@glass/components/textarea";

describe("Textarea contract", () => {
    it("publishes one native multiline control on the shared field surface", () => {
        expect(Object.keys(TextareaSurface)).toEqual(["Textarea"]);

        const wrapper = mount(Textarea, {
            props: { class: "consumer-class" },
        });
        expect(wrapper.element.tagName).toBe("TEXTAREA");
        // [2026-08-08 · BK #82 W-FIELD] see input.contract's twin note — the
        // `glass-defined` class-equality was certifying an inert register. The
        // consumer contract is what stands here.
        expect(wrapper.classes()).toContain("consumer-class");
        expect(wrapper.attributes()).toMatchObject({
            "data-kind": "textarea",
            "data-resize": "vertical",
            "data-size": "md",
            "data-slot": "textarea",
            "data-state": "default",
        });
    });

    it("forwards multiline form, wrapping, and constraint attributes", () => {
        const wrapper = mount(Textarea, {
            attrs: {
                form: "profile-form",
                maxlength: "280",
                minlength: "20",
                rows: "6",
                wrap: "hard",
            },
            props: {
                modelValue: "A multiline note.",
                name: "note",
                required: true,
            },
        });

        expect(wrapper.attributes()).toMatchObject({
            form: "profile-form",
            maxlength: "280",
            minlength: "20",
            name: "note",
            required: "",
            rows: "6",
            wrap: "hard",
        });
        expect((wrapper.element as HTMLTextAreaElement).value).toBe("A multiline note.");
    });

    it("preserves multiline v-model editing", async () => {
        // `defaultValue` retired with `useVModel` — `defineModel` is the one model.
        const wrapper = mount(Textarea, {
            props: { modelValue: "First line" },
        });

        await wrapper.setValue("First line\nSecond line");
        expect(wrapper.emitted("update:modelValue")?.at(-1)).toEqual([
            "First line\nSecond line",
        ]);
    });

    it("participates in native form submission", () => {
        const form = document.createElement("form");
        form.id = "textarea-contract-form";
        document.body.append(form);
        const note = mount(Textarea, {
            attachTo: document.body,
            props: {
                form: form.id,
                modelValue: "First line\nSecond line",
                name: "note",
            },
        });
        const data = new FormData(form);
        expect(data.get("note")).toBe("First line\nSecond line");
        note.unmount();
        form.remove();
    });

    // `"content"` left the union at BK #82: growth is the register's default
    // (`field-sizing: content` floored by `rows`), so the enum is the drag handle
    // and nothing else. Four members, each a real CSS `resize` value.
    it.each(["vertical", "horizontal", "both", "none"] as const)(
        "expresses the %s resize mode without utility classes",
        (resize) => {
            const wrapper = mount(Textarea, { props: { resize } });
            expect(wrapper.attributes("data-resize")).toBe(resize);
            expect(wrapper.classes()).toEqual([
                "field-control",
                "glass-control-edge",
            ]);
        },
    );

    it("keeps rows as the growth floor, unmediated", () => {
        // `rows` is no longer decorative: it is the floor the content-sized box
        // starts from, so it must reach the element as the native attribute.
        const wrapper = mount(Textarea, { attrs: { rows: "3" } });
        expect(wrapper.attributes("rows")).toBe("3");
    });

    it("reflects caller-owned invalid and description linkage", () => {
        const wrapper = mount(Textarea, {
            attrs: {
                "aria-describedby": "note-error",
                "aria-errormessage": "note-error",
            },
            props: { invalid: true },
        });

        expect(wrapper.attributes()).toMatchObject({
            "aria-describedby": "note-error",
            "aria-errormessage": "note-error",
            "aria-invalid": "true",
            "data-state": "invalid",
        });
    });

    it("keeps readonly and disabled native while reflecting semantic state", () => {
        const readonly = mount(Textarea, {
            props: { readonly: true, resize: "none", size: "sm" },
        });
        expect(readonly.attributes()).toMatchObject({
            "data-resize": "none",
            "data-size": "sm",
            "data-state": "readonly",
            readonly: "",
        });

        const disabled = mount(Textarea, {
            props: { disabled: true, size: "lg" },
        });
        expect(disabled.attributes()).toMatchObject({
            "data-size": "lg",
            "data-state": "disabled",
            disabled: "",
        });
    });
});
