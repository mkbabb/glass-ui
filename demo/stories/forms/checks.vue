<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Checkbox } from "../../../src/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../../src/components/ui/radio-group";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { SquareCheck } from "@lucide/vue";
// BA.W-SUFFUSE2 — the forms band reads ONE coherent section-color identity: the
// teal-class stop (--section-color-3, the cool stop the per-category map assigns
// forms). The page root re-points --section-label-accent so the eyebrow + rail +
// the ONE focal IconChip all read the SAME stop (the math-paper.vue gold
// standard). The field controls + body copy stay ink (the d1 floor).
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
        <!-- BA.W-SUFFUSE2 — the forms-band identity event family (ONE
             --section-color-3 teal event: the tinted eyebrow + the accent rail +
             the focal IconChip, all on the SAME stop). The math-paper.vue gold
             standard: a border-l-[3px] rail keyed off the page's ONE accent.
             The --section-label-accent override sits on THIS header (the real DOM
             ancestor of the eyebrow + the rail element itself) — StoryPage's root
             is a renderless TooltipProvider, so a :style on <StoryPage> never
             lands on a DOM ancestor of the slotted eyebrow. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="SquareCheck" :section="FORMS_STOP" />
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

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Checkbox</h2>
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
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">RadioGroup</h2>
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
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Switch</h2>
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
        </section>
    </StoryPage>
</template>
