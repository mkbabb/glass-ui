import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
} from "@glass/components/number-field";

const components = {
    NumberField,
    NumberFieldContent,
    NumberFieldDecrement,
    NumberFieldIncrement,
    NumberFieldInput,
};

describe("NumberField contract", () => {
    it("keeps locale formatting/parsing and numeric form serialization on one Reka path", async () => {
        const wrapper = mount({
            components,
            data: () => ({ value: 1.5 }),
            template: `
                <form>
                    <NumberField
                        v-model="value"
                        name="amount"
                        required
                        locale="de-DE"
                        :step="0.1"
                        :format-options="{ minimumFractionDigits: 1, maximumFractionDigits: 1 }"
                    >
                        <NumberFieldContent>
                            <NumberFieldInput aria-describedby="amount-help" />
                        </NumberFieldContent>
                    </NumberField>
                    <p id="amount-help">Use tenths.</p>
                </form>
            `,
        });
        await nextTick();

        const input = wrapper.get<HTMLInputElement>('[role="spinbutton"]');
        expect(input.element.value).toBe("1,5");
        expect(input.attributes("inputmode")).toBe("decimal");
        expect(input.attributes("aria-required")).toBe("true");
        expect(input.attributes("aria-describedby")).toBe("amount-help");
        expect(wrapper.get('input[name="amount"]').attributes()).toHaveProperty(
            "required",
        );
        expect(new FormData(wrapper.get("form").element).get("amount")).toBe("1.5");

        await input.setValue("2,5");
        await input.trigger("blur");
        await nextTick();
        expect((wrapper.vm as unknown as { value: number }).value).toBe(2.5);
    });

    it("owns min/max/step across buttons and the spinbutton keyboard contract", async () => {
        const wrapper = mount({
            components,
            data: () => ({ value: 2 }),
            template: `
                <NumberField v-model="value" :min="0" :max="4" :step="2">
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
            `,
        });
        const input = wrapper.get('[role="spinbutton"]');
        await nextTick();

        await wrapper
            .get(".number-field__step--increment")
            .trigger("pointerdown", { button: 0 });
        window.dispatchEvent(new PointerEvent("pointerup"));
        await nextTick();
        expect((wrapper.vm as unknown as { value: number }).value).toBe(4);
        expect(
            wrapper.get(".number-field__step--increment").attributes(),
        ).toHaveProperty("disabled");

        await wrapper
            .get(".number-field__step--decrement")
            .trigger("pointerdown", { button: 0 });
        window.dispatchEvent(new PointerEvent("pointerup"));
        await nextTick();
        expect((wrapper.vm as unknown as { value: number }).value).toBe(2);
        await input.trigger("keydown", { key: "ArrowDown" });
        expect((wrapper.vm as unknown as { value: number }).value).toBe(0);
        await input.trigger("keydown", { key: "Home" });
        expect((wrapper.vm as unknown as { value: number }).value).toBe(0);
        await input.trigger("keydown", { key: "End" });
        expect((wrapper.vm as unknown as { value: number }).value).toBe(4);
    });

    it("propagates invalid/disabled semantics to the focusable control", () => {
        const wrapper = mount({
            components,
            template: `
                <NumberField
                    invalid
                    disabled
                    required
                    aria-describedby="quantity-error"
                    :format-options="{ maximumFractionDigits: 0 }"
                >
                    <NumberFieldContent>
                        <NumberFieldDecrement />
                        <NumberFieldInput
                            aria-label="Quantity"
                            aria-describedby="quantity-error"
                        />
                        <NumberFieldIncrement />
                    </NumberFieldContent>
                </NumberField>
                <p id="quantity-error">Enter a quantity.</p>
            `,
        });

        const root = wrapper.get('[data-slot="number-field"]');
        const input = wrapper.get('[role="spinbutton"]');
        expect(root.attributes("aria-invalid")).toBe("true");
        expect(input.attributes("aria-invalid")).toBe("true");
        expect(input.attributes("aria-required")).toBe("true");
        expect(input.attributes("aria-describedby")).toBe("quantity-error");
        expect(input.classes()).toContain("field-control");
        expect(input.classes()).not.toContain("input-pill");
        expect(input.attributes("data-state")).toBe("disabled");
        expect(input.attributes("aria-label")).toBe("Quantity");
        expect(input.attributes("inputmode")).toBe("numeric");
        expect(input.attributes()).toHaveProperty("disabled");
        expect(wrapper.get('[aria-label="Increase"]').attributes()).toHaveProperty(
            "disabled",
        );
        expect(wrapper.get('[aria-label="Decrease"]').attributes()).toHaveProperty(
            "disabled",
        );
    });

    it("recognizes every native aria-invalid value on the root and input", () => {
        const wrapper = mount({
            components,
            template: `
                <NumberField aria-invalid="grammar">
                    <NumberFieldContent><NumberFieldInput /></NumberFieldContent>
                </NumberField>
            `,
        });

        expect(wrapper.get('[data-slot="number-field"]').attributes("aria-invalid")).toBe(
            "grammar",
        );
        expect(wrapper.get('[role="spinbutton"]').attributes("aria-invalid")).toBe(
            "grammar",
        );
    });
});
