import { mount } from "@vue/test-utils";
import { describe, expect, it } from "vitest";
import { nextTick } from "vue";
import {
    RadioGroup,
    RadioGroupItem,
} from "@glass/components/radio-group";

describe("RadioGroup", () => {
    it("keeps exactly one selected value and forwards orientation", async () => {
        const wrapper = mount({
            components: { RadioGroup, RadioGroupItem },
            data: () => ({ plan: "team" }),
            template: `
                <RadioGroup v-model="plan" orientation="horizontal">
                    <RadioGroupItem value="solo" />
                    <RadioGroupItem value="team" />
                    <RadioGroupItem value="org" />
                </RadioGroup>
            `,
        });
        const group = wrapper.get('[role="radiogroup"]');
        const radios = wrapper.findAll('[role="radio"]');

        expect(group.attributes("aria-orientation")).toBe("horizontal");
        expect(radios.map((radio) => radio.attributes("aria-checked"))).toEqual([
            "false",
            "true",
            "false",
        ]);

        await radios[0]!.trigger("click");
        await nextTick();
        expect(radios.map((radio) => radio.attributes("aria-checked"))).toEqual([
            "true",
            "false",
            "false",
        ]);
    });

    it("links validation copy without a second semantic wrapper", () => {
        const wrapper = mount(RadioGroup, {
            props: { invalid: true, required: true },
            attrs: {
                "aria-labelledby": "plan-label",
                "aria-describedby": "plan-error",
            },
            slots: { default: '<RadioGroupItem value="solo" />' },
            global: { components: { RadioGroupItem } },
        });
        const group = wrapper.get('[role="radiogroup"]');

        expect(group.attributes()).toMatchObject({
            "aria-describedby": "plan-error",
            "aria-invalid": "true",
            "aria-labelledby": "plan-label",
            "aria-required": "true",
            "data-invalid": "true",
        });
        expect(wrapper.findAll('[role="radiogroup"]')).toHaveLength(1);

        const nativeAria = mount(RadioGroup, {
            attrs: { "aria-invalid": "true" },
        });
        expect(nativeAria.attributes("aria-invalid")).toBe("true");
    });

    it("submits the selected value and excludes disabled choices", async () => {
        const wrapper = mount({
            components: { RadioGroup, RadioGroupItem },
            data: () => ({ delivery: "standard" }),
            template: `
                <form>
                    <RadioGroup v-model="delivery" name="delivery" required>
                        <RadioGroupItem value="standard" />
                        <RadioGroupItem value="express" />
                        <RadioGroupItem value="drone" disabled />
                    </RadioGroup>
                </form>
            `,
        });
        await nextTick();
        const form = wrapper.get("form").element as HTMLFormElement;
        const radios = wrapper.findAll('[role="radio"]');

        expect(new FormData(form).get("delivery")).toBe("standard");
        expect(radios[2]!.attributes("disabled")).toBeDefined();
        await radios[2]!.trigger("click");
        await nextTick();
        expect(new FormData(form).get("delivery")).toBe("standard");
    });
});
