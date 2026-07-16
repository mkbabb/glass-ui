import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, nextTick, ref } from "vue";
import { Checkbox } from "@glass/components/checkbox";

afterEach(() => {
    document.body.innerHTML = "";
});

describe("Checkbox", () => {
    it.each([
        [false, "unchecked", false, false],
        [true, "checked", true, false],
        ["indeterminate", "indeterminate", false, true],
    ] as const)(
        "renders %s as a distinct %s state",
        (modelValue, state, hasCheck, hasDash) => {
            const wrapper = mount(Checkbox, { props: { modelValue } });
            const root = wrapper.get('[role="checkbox"]');

            expect(root.attributes("data-state")).toBe(state);
            expect(root.attributes("aria-checked")).toBe(
                modelValue === "indeterminate" ? "mixed" : String(modelValue),
            );
            expect(root.find(".lucide-check").exists()).toBe(hasCheck);
            expect(root.find(".lucide-minus").exists()).toBe(hasDash);
        },
    );

    it("owns interaction while Reka owns the tri-state model", async () => {
        const wrapper = mount(
            defineComponent({
                components: { Checkbox },
                setup: () => ({ checked: ref<boolean | "indeterminate">("indeterminate") }),
                template: '<Checkbox v-model="checked" aria-label="Select all" />',
            }),
        );
        const root = wrapper.get('[role="checkbox"]');

        await wrapper.get(".checkbox__seat").trigger("click");
        expect(root.attributes("aria-checked")).toBe("true");
        await root.trigger("click");
        expect(root.attributes("aria-checked")).toBe("false");
    });

    it("participates in forms with name, value, required, and disabled semantics", async () => {
        const checked = ref(false);
        const disabled = ref(false);
        const wrapper = mount(
            defineComponent({
                components: { Checkbox },
                setup: () => ({ checked, disabled }),
                template: `
                    <form>
                        <Checkbox
                            v-model="checked"
                            :disabled="disabled"
                            name="terms"
                            value="accepted"
                            required
                        />
                    </form>
                `,
            }),
            { attachTo: document.body },
        );
        await nextTick();

        const root = wrapper.get('[role="checkbox"]');
        const input = wrapper.get('input[type="checkbox"]');
        expect(root.attributes("aria-required")).toBe("true");
        expect(input.attributes()).toMatchObject({
            name: "terms",
            value: "accepted",
            required: "",
        });

        await root.trigger("click");
        expect(new FormData(wrapper.get("form").element).get("terms")).toBe("accepted");

        disabled.value = true;
        await nextTick();
        expect(root.attributes("disabled")).toBe("");
        expect(input.attributes("disabled")).toBe("");
        expect(new FormData(wrapper.get("form").element).has("terms")).toBe(false);
    });
});
