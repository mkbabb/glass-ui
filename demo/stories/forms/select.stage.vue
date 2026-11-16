<script setup lang="ts">
// Select's stage: one labelled select. `list` picks a short list of four or a long
// list that scrolls inside its panel.
import { computed, ref } from "vue";
import { Label } from "@glass/components/label";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@glass/components/select";

const props = withDefaults(defineProps<{ list?: "short" | "long" }>(), { list: "short" });

const SHORT = ["Small", "Medium", "Large", "Extra large"];
const LONG = [
    "Argentina", "Australia", "Austria", "Belgium", "Brazil", "Canada", "Chile",
    "Denmark", "Egypt", "Finland", "France", "Germany", "Ghana", "Greece", "India",
    "Ireland", "Italy", "Japan", "Kenya", "Mexico", "Netherlands", "New Zealand",
    "Norway", "Peru", "Portugal", "Spain", "Sweden", "Switzerland", "Thailand",
    "United Kingdom", "United States", "Vietnam",
];

const field = computed(() =>
    props.list === "long"
        ? { label: "Country", items: LONG }
        : { label: "Size", items: SHORT },
);
const value = ref<Record<"short" | "long", string>>({ short: "Medium", long: "Portugal" });
</script>

<template>
    <div class="select-stage">
        <Label for="select-stage-trigger">{{ field.label }}</Label>
        <Select v-model="value[props.list]">
            <SelectTrigger id="select-stage-trigger">
                <SelectValue />
            </SelectTrigger>
            <SelectContent>
                <SelectItem v-for="item in field.items" :key="item" :value="item">
                    {{ item }}
                </SelectItem>
            </SelectContent>
        </Select>
    </div>
</template>

<style scoped>
.select-stage {
    display: grid;
    gap: var(--sp-2);
    inline-size: min(100cqi, 18rem);
}
</style>
