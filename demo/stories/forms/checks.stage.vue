<script setup lang="ts">
// The three binary controls side by side: checkboxes for several, radios for one,
// switches for a change that takes effect at once.
import { ref } from "vue";
import { Checkbox } from "@glass/components/checkbox";
import { Label } from "@glass/components/label";
import { RadioGroup, RadioGroupItem } from "@glass/components/radio-group";
import { Switch } from "@glass/components/switch";

const toppings = ref<Record<string, boolean | "indeterminate">>({
    Basil: true,
    Olives: false,
    Peppers: true,
});
const size = ref("medium");
const SIZES = [
    { value: "small", label: "Small" },
    { value: "medium", label: "Medium" },
    { value: "large", label: "Large" },
];
const delivery = ref(true);
const receipt = ref(false);
</script>

<template>
    <div class="checks-stage">
        <div class="checks-stage-group" role="group" aria-label="Toppings">
            <div v-for="(_, name) in toppings" :key="name" class="checks-stage-bit">
                <Checkbox :id="`checks-${name}`" v-model="toppings[name]" />
                <Label :for="`checks-${name}`">{{ name }}</Label>
            </div>
        </div>

        <RadioGroup v-model="size" class="checks-stage-group" aria-label="Size">
            <div v-for="s in SIZES" :key="s.value" class="checks-stage-bit">
                <RadioGroupItem :id="`checks-size-${s.value}`" :value="s.value" />
                <Label :for="`checks-size-${s.value}`">{{ s.label }}</Label>
            </div>
        </RadioGroup>

        <div class="checks-stage-group checks-stage-switches">
            <div class="checks-stage-bit">
                <Switch id="checks-delivery" v-model="delivery" />
                <Label for="checks-delivery">Delivery</Label>
            </div>
            <div class="checks-stage-bit">
                <Switch id="checks-receipt" v-model="receipt" />
                <Label for="checks-receipt">Receipt</Label>
            </div>
        </div>
    </div>
</template>

<style scoped>
.checks-stage {
    display: grid;
    grid-template-columns: repeat(3, auto);
    gap: var(--sp-5) var(--sp-8, 3rem);
    align-items: start;
}

.checks-stage-group {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.checks-stage-bit {
    display: flex;
    align-items: center;
}

/* The switch's face is its whole seat, so it pairs with its label by a gap. */
.checks-stage-switches .checks-stage-bit {
    gap: var(--sp-3);
}

@container (inline-size < 30rem) {
    .checks-stage {
        grid-template-columns: repeat(2, auto);
    }
    .checks-stage-switches {
        grid-column: 1 / -1;
    }
}
</style>
