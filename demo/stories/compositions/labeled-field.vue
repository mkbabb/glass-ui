<script setup lang="ts">
// LabeledField family — parent SFC + 4 sibling primitives forwarding to
// underlying Input / Select / Slider / Switch with a baked-in tooltip-bearing
// label. Post-V.W3 LabeledField parent owns the IconTooltip + label layer.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    LabeledField,
    LabeledInput,
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
} from "../../../src/components/custom/labeled-field";

const text = ref("hello");
const choice = ref("Alpha");
const choiceOpen = ref(false);
const slider = ref(40);
const enabled = ref(true);

const choices = ["Alpha", "Beta", "Gamma"];
</script>

<template>
    <StoryPage>
        <StorySection
            label="four siblings"
            blurb="LabeledInput, LabeledSelect, LabeledSlider, LabeledSwitch — each forwards to an underlying primitive with shared label + IconTooltip + .labeled-field-label typography. The parent <LabeledField> owns the layer."
        >
            <ShowcaseFrame pad="lg">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <LabeledInput
                        v-model="text"
                        label="Name"
                        tooltip="The display name surfaces across the dock."
                    />
                    <LabeledSelect
                        v-model="choice"
                        v-model:is-open="choiceOpen"
                        label="Variant"
                        tooltip="Which preset baseline to start from."
                        :items="choices"
                    />
                    <LabeledSlider
                        v-model="slider"
                        label="Spread"
                        tooltip="Field spread, 0-100."
                        :min="0"
                        :max="100"
                        :step="1"
                    />
                    <LabeledSwitch
                        v-model:checked="enabled"
                        label="Grain overlay"
                        tooltip="Layer the paper-grain SVG above the underlying surface."
                    />
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="parent SFC — direct slot composition"
            blurb="LabeledField directly accepts any form control via <slot /> for cases where the four wrappers don't fit (e.g. multi-select, custom popover)."
        >
            <ShowcaseFrame pad="md">
                <LabeledField label="Custom" tooltip="Passes through any slotted control.">
                    <input
                        type="email"
                        class="rounded-md border border-border bg-background px-3 py-1.5 text-sm"
                        placeholder="user@example.com"
                    />
                </LabeledField>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="labelClass override"
            blurb="Each wrapper accepts labelClass / inputClass overrides for the rare case where the canonical typography needs to bend."
        >
            <ShowcaseFrame pad="md">
                <LabeledInput
                    v-model="text"
                    label="Custom Label"
                    tooltip="With a custom label class."
                    label-class="text-warning font-bold"
                />
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
