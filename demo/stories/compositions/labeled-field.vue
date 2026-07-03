<script setup lang="ts">
// LabeledField family — a parent SFC + 4 sibling primitives forwarding to the
// underlying Input / Select / Slider / Switch with a baked-in tooltip-bearing
// label. The LabeledField parent owns the IconTooltip + label layer.
import { computed, ref } from "vue";
import { Eye, EyeOff, X } from "@lucide/vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import {
    LabeledField,
    LabeledInput,
    LabeledSelect,
    LabeledSlider,
    LabeledSwitch,
} from "@glass/components/custom/labeled-field";
import { Input } from "@glass/components/ui/input";
import { Button } from "@glass/components/ui/button";

const text = ref("hello");
const choice = ref("Alpha");
const choiceOpen = ref(false);
const slider = ref(40);
const enabled = ref(true);

const choices = ["Alpha", "Beta", "Gamma"];

// BC.W-CONTROL-SMOOTH move C (kf-G3) — the ≥2-consumer bar for the LabeledField
// `#action` slot: the canonical horizontal-action cases. Consumer #1 a clear-input
// (an `X` that empties the field); consumer #2 a reveal-password (an eye that toggles
// the input type). Each action button binds `:aria-label` (an icon-only button has no
// text content — the name-on-the-focusable contract) + inherits `.focus-ring` +
// `.tap-squish` + the quick `transition-control` clock + the pill radius by construction.
const search = ref("aurora preset");
const password = ref("hunter2");
const revealed = ref(false);
const revealLabel = computed(() => (revealed.value ? "Hide password" : "Show password"));
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
            label="horizontal action-slot"
            blurb="A labeled control carrying a TRAILING action affordance beside the field via the #action slot. The slot is additive (no #action slot leaves the plain stacked field unchanged); the action button binds :aria-label (an icon-only button needs a name), inherits .focus-ring + .tap-squish + the quick transition-control clock + the pill radius. Two canonical cases: a clear-input + a reveal-password."
        >
            <ShowcaseFrame pad="lg">
                <div class="grid grid-cols-1 gap-6 md:grid-cols-2">
                    <!-- consumer #1 — clear-input -->
                    <LabeledField
                        label="Search"
                        tooltip="Type to filter; clear with the trailing button."
                    >
                        <template #default="{ controlId }">
                            <Input :id="controlId" v-model="search" placeholder="Search presets" />
                        </template>
                        <template #action>
                            <Button
                                variant="ghost"
                                iconOnly
                                aria-label="Clear search"
                                :disabled="!search"
                                @click="search = ''"
                            >
                                <X />
                            </Button>
                        </template>
                    </LabeledField>

                    <!-- consumer #2 — reveal-password -->
                    <LabeledField
                        label="Password"
                        tooltip="Toggle visibility with the trailing button."
                    >
                        <template #default="{ controlId }">
                            <Input
                                :id="controlId"
                                v-model="password"
                                :type="revealed ? 'text' : 'password'"
                            />
                        </template>
                        <template #action>
                            <Button
                                variant="ghost"
                                iconOnly
                                :aria-label="revealLabel"
                                @click="revealed = !revealed"
                            >
                                <EyeOff v-if="revealed" />
                                <Eye v-else />
                            </Button>
                        </template>
                    </LabeledField>
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
