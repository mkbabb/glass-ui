<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
import { Checkbox } from "@glass/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@glass/components/radio-group";
import { Switch } from "@glass/components/switch";
import { Label } from "@glass/components/label";
import { IconChip } from "@glass/components/icon-chip";
import { SquareCheck } from "@lucide/vue";
// BC.W-SUFFUSE-reconcile — the forms band's ONE coherent --section-color-3 teal
// (the cool stop the per-category map assigns forms). The page identity COLOR
// EVENT (the tinted eyebrow + the inline accent rail + the focal IconChip, all on
// --section-color-3); PH3-safe (the rail is an INLINE borderLeft, not the
// `border-l-[3px]` + <IconChip> in-body double-header SHAPE PH3 forbids).
const FORMS_STOP = 3;

const tos = ref(true);
const marketing = ref(false);
const indeterminate = ref<boolean | "indeterminate">("indeterminate");

const plan = ref<string>("team");
const delivery = ref<string>("standard");

const notifications = ref(true);
const airplane = ref(false);
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="SquareCheck" :section="FORMS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Selection
                </span>
                <p class="text-small text-muted-foreground">
                    Checkboxes, radios, and switches — the field controls stay ink;
                    the section identity is the ONE color event.
                </p>
            </div>
        </header>

        <StorySection heading="Checkbox" gap="lg">
            <p class="text-small text-muted-foreground">
                Standard, indeterminate, and disabled.
            </p>
            <div class="flex flex-wrap items-start gap-8">
                <div class="flex items-center gap-2">
                    <Checkbox id="chk-tos" v-model="tos" />
                    <Label for="chk-tos">Accept terms</Label>
                </div>
                <div class="flex items-center gap-2">
                    <Checkbox id="chk-marketing" v-model="marketing" />
                    <Label for="chk-marketing">Marketing email</Label>
                </div>
                <div class="flex items-center gap-2">
                    <Checkbox id="chk-indet" v-model="indeterminate" />
                    <Label for="chk-indet">Indeterminate</Label>
                </div>
                <div class="flex items-center gap-2 opacity-60">
                    <Checkbox id="chk-disabled" disabled />
                    <Label for="chk-disabled">Disabled</Label>
                </div>
            </div>
        </StorySection>

        <StorySection heading="RadioGroup" gap="lg">
            <p class="text-small text-muted-foreground">
                One-of-N. Inline layout with labels for hit-targets.
            </p>
            <RadioGroup v-model="plan" class="flex flex-wrap gap-6">
                <div v-for="p in ['solo', 'team', 'org']" :key="p" class="flex items-center gap-2">
                    <RadioGroupItem :id="`plan-${p}`" :value="p" />
                    <Label :for="`plan-${p}`" class="capitalize">{{ p }}</Label>
                </div>
            </RadioGroup>

            <p class="text-small text-muted-foreground mt-4">
                Same pattern, with one option disabled.
            </p>
            <RadioGroup v-model="delivery" class="flex flex-wrap gap-6">
                <div class="flex items-center gap-2">
                    <RadioGroupItem id="delivery-standard" value="standard" />
                    <Label for="delivery-standard">Standard</Label>
                </div>
                <div class="flex items-center gap-2">
                    <RadioGroupItem id="delivery-express" value="express" />
                    <Label for="delivery-express">Express</Label>
                </div>
                <div class="flex items-center gap-2 opacity-60">
                    <RadioGroupItem id="delivery-drone" value="drone" disabled />
                    <Label for="delivery-drone">Drone (unavailable)</Label>
                </div>
            </RadioGroup>
        </StorySection>

        <StorySection heading="Switch" gap="lg">
            <p class="text-small text-muted-foreground">
                Immediate-effect toggle. Prefer over checkbox when the change is instant.
            </p>
            <div class="flex flex-wrap items-center gap-8">
                <div class="flex items-center gap-3">
                    <Switch id="sw-notifications" v-model="notifications" />
                    <Label for="sw-notifications">Notifications</Label>
                </div>
                <div class="flex items-center gap-3">
                    <Switch id="sw-airplane" v-model="airplane" />
                    <Label for="sw-airplane">Airplane mode</Label>
                </div>
                <div class="flex items-center gap-3 opacity-60">
                    <Switch id="sw-disabled" disabled />
                    <Label for="sw-disabled">Disabled</Label>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
