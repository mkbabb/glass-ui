import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import {
    TagsInput,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText,
} from "@glass/components/tags-input";

const components = {
    TagsInput,
    TagsInputInput,
    TagsInputItem,
    TagsInputItemDelete,
    TagsInputItemText,
};

function mountTags(extraRootProps = "") {
    return mount({
        components,
        data: () => ({ values: ["alpha"], invalids: [] as string[] }),
        template: `
            <form>
                <TagsInput v-model="values" name="topics" ${extraRootProps} @invalid="invalids.push($event)">
                    <TagsInputItem v-for="tag in values" :key="tag" :value="tag">
                        <TagsInputItemText />
                        <TagsInputItemDelete />
                    </TagsInputItem>
                    <TagsInputInput aria-label="Topics" />
                </TagsInput>
            </form>
        `,
    });
}

describe("TagsInput contract", () => {
    it("creates with delimiters, rejects duplicates, and serializes the model", async () => {
        const wrapper = mountTags();
        const input = wrapper.get<HTMLInputElement>("input.tags-input__input");

        input.element.value = "beta,";
        input.element.dispatchEvent(
            new InputEvent("input", { bubbles: true, data: "," }),
        );
        await nextTick();
        expect((wrapper.vm as unknown as { values: string[] }).values).toEqual([
            "alpha",
            "beta",
        ]);
        const data = new FormData(wrapper.get("form").element);
        expect(data.get("topics[0]")).toBe("alpha");
        expect(data.get("topics[1]")).toBe("beta");

        input.element.value = "alpha";
        await input.trigger("keydown", { key: "Enter" });
        await nextTick();
        expect((wrapper.vm as unknown as { values: string[] }).values).toEqual([
            "alpha",
            "beta",
        ]);
        expect((wrapper.vm as unknown as { invalids: string[] }).invalids).toEqual([
            "alpha",
        ]);
        expect(input.attributes("aria-invalid")).toBe("true");
        expect(input.attributes()).toHaveProperty("data-invalid");
        expect(wrapper.get('[data-slot="tags-input"]').attributes()).toHaveProperty(
            "data-invalid",
        );
    });

    it("splits an opted-in paste through the declared delimiter", async () => {
        const wrapper = mountTags(':add-on-paste="true" :delimiter="/[,;\\s]+/"');
        const input = wrapper.get<HTMLInputElement>("input.tags-input__input");
        const paste = new Event("paste", { bubbles: true, cancelable: true });
        Object.defineProperty(paste, "clipboardData", {
            value: { getData: () => "beta; gamma" },
        });
        input.element.dispatchEvent(paste);
        await nextTick();

        expect((wrapper.vm as unknown as { values: string[] }).values).toEqual([
            "alpha",
            "beta",
            "gamma",
        ]);
    });

    it("does not commit a delimiter while an IME composition is active", async () => {
        const wrapper = mountTags();
        const input = wrapper.get<HTMLInputElement>("input.tags-input__input");

        input.element.dispatchEvent(
            new CompositionEvent("compositionstart", { bubbles: true }),
        );
        input.element.value = "draft,";
        input.element.dispatchEvent(
            new InputEvent("input", { bubbles: true, data: ",", isComposing: true }),
        );
        await nextTick();

        expect((wrapper.vm as unknown as { values: string[] }).values).toEqual([
            "alpha",
        ]);
        expect(input.element.value).toBe("draft,");
    });

    it("protects a nonempty draft, then selects and removes with Backspace", async () => {
        const wrapper = mountTags();
        const input = wrapper.get<HTMLInputElement>("input.tags-input__input");

        await input.setValue("draft");
        input.element.setSelectionRange(5, 5);
        await input.trigger("keydown", { key: "Backspace" });
        expect((wrapper.vm as unknown as { values: string[] }).values).toEqual([
            "alpha",
        ]);

        await input.setValue("");
        input.element.setSelectionRange(0, 0);
        await input.trigger("keydown", { key: "Backspace" });
        expect(wrapper.get(".tags-input__item").attributes("data-state")).toBe(
            "active",
        );
        await input.trigger("keydown", { key: "Backspace" });
        await nextTick();
        expect((wrapper.vm as unknown as { values: string[] }).values).toEqual([]);
    });

    it("composes canonical Chip and supports the explicit delete control", async () => {
        const wrapper = mountTags();
        await nextTick();
        expect(wrapper.get(".tags-input__chip").classes()).toContain("glass-chip");
        const remove = wrapper.get<HTMLButtonElement>(".tags-input__delete");
        expect(remove.element.tagName).toBe("BUTTON");
        expect(remove.attributes("aria-label")).toBe("Remove alpha");

        await remove.trigger("click");
        expect((wrapper.vm as unknown as { values: string[] }).values).toEqual([]);
    });

    it("propagates persistent invalid and disabled state to the input", () => {
        const wrapper = mountTags("invalid disabled");
        const root = wrapper.get('[data-slot="tags-input"]');
        const input = wrapper.get("input.tags-input__input");

        expect(root.attributes("aria-invalid")).toBe("true");
        expect(root.classes()).toContain("field-control");
        expect(root.classes()).not.toContain("control-surface");
        expect(root.attributes("data-state")).toBe("disabled");
        expect(input.attributes("aria-invalid")).toBe("true");
        expect(input.attributes("aria-label")).toBe("Topics");
        expect(input.attributes()).toHaveProperty("disabled");
        expect(wrapper.get(".tags-input__delete").attributes("data-disabled")).toBe("");
    });
});
