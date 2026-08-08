import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import {
    NumberField,
    NumberFieldInput,
    NumberFieldStep,
} from "@glass/components/number-field";

// [2026-08-08 · BK #82 W-FIELD] `NumberFieldContent` retired with the wrapper node
// it rendered (sole child at 5 of 5 mounts — the root IS the grid), and the two
// byte-twin steppers folded into ONE `NumberFieldStep direction=`.
const components = {
    NumberField,
    NumberFieldInput,
    NumberFieldStep,
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
                        <NumberFieldInput aria-describedby="amount-help" />
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
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput />
                    <NumberFieldStep direction="increment" />
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
                    <NumberFieldStep direction="decrement" />
                    <NumberFieldInput
                        aria-label="Quantity"
                        aria-describedby="quantity-error"
                    />
                    <NumberFieldStep direction="increment" />
                </NumberField>
                <p id="quantity-error">Enter a quantity.</p>
            `,
        });

        const root = wrapper.get('[data-slot="number-field"]');
        const input = wrapper.get('[role="spinbutton"]');
        // ARIA validity/requirement live on the SPINBUTTON only. They used to be
        // stamped on this root as well — a `div` with no role, so the state was
        // announced on nothing and duplicated on the widget that did carry it.
        expect(root.attributes("aria-invalid")).toBeUndefined();
        expect(root.attributes("aria-required")).toBeUndefined();
        expect(input.attributes("aria-invalid")).toBe("true");
        expect(input.attributes("aria-required")).toBe("true");
        expect(input.attributes("aria-describedby")).toBe("quantity-error");
        expect(input.classes()).toContain("field-control");
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

    it("recognizes every native aria-invalid value, on the spinbutton", () => {
        const wrapper = mount({
            components,
            template: `
                <NumberField aria-invalid="grammar">
                    <NumberFieldInput />
                </NumberField>
            `,
        });

        expect(
            wrapper.get('[data-slot="number-field"]').attributes("aria-invalid"),
        ).toBeUndefined();
        expect(wrapper.get('[role="spinbutton"]').attributes("aria-invalid")).toBe(
            "grammar",
        );
    });
});
