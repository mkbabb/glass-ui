import { mount } from "@vue/test-utils";
import { afterEach, describe, expect, it } from "vitest";
import { defineComponent, nextTick, ref } from "vue";
import { Checkbox } from "@glass/components/checkbox";

afterEach(() => {
    document.body.innerHTML = "";
});

describe("Checkbox", () => {
    /* The glyph pair is CONTENT and the mark's presence is STATE-INDEPENDENT (#83
     * W-CONTROL-BIT, ADJ-6 + D4). Before the mark was force-mounted, "no glyph in the
     * DOM" was how an unchecked box was recognised — which is the same fact as "the
     * mark can never be animated in", the defect the cut closes. So the assertion
     * moves off glyph PRESENCE and onto the two things that are still true: the mark
     * node exists at every state (so the entrance has something to transition), and
     * the Minus/Check choice tracks indeterminate-vs-not. */
    it.each([
        [false, "unchecked", false],
        [true, "checked", false],
        ["indeterminate", "indeterminate", true],
    ] as const)("renders %s as a distinct %s state", (modelValue, state, hasDash) => {
        const wrapper = mount(Checkbox, { props: { modelValue } });
        const root = wrapper.get('[role="checkbox"]');

        expect(root.attributes("data-state")).toBe(state);
        expect(root.attributes("aria-checked")).toBe(
            modelValue === "indeterminate" ? "mixed" : String(modelValue),
        );
        expect(root.find(".control-bit__mark").exists()).toBe(true);
        expect(root.find(".lucide-minus").exists()).toBe(hasDash);
        expect(root.find(".lucide-check").exists()).toBe(!hasDash);
    });

    it("owns interaction while Reka owns the tri-state model", async () => {
        const wrapper = mount(
            defineComponent({
                components: { Checkbox },
                setup: () => ({ checked: ref<boolean | "indeterminate">("indeterminate") }),
                template: '<Checkbox v-model="checked" aria-label="Select all" />',
            }),
        );
        const root = wrapper.get('[role="checkbox"]');

        /* The seat IS the host now (#83 ADJ-3). `.checkbox__seat` was an
         * absolutely-positioned 44×44 span overhanging a 16px box, so this line used
         * to be the only way to click where a user actually clicks; the host's own
         * border box is that region today. */
        await root.trigger("click");
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
