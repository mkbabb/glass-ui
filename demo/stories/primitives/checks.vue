<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

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
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <DisplayHero size="display-3" variation="wonk" class="mt-2 mb-2">
                Three ways to say yes
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Checkbox for terms, radio for one-of-N, switch for instant effect — and the
                indeterminate / disabled states each contract honours.
            </p>
            <FlourishDivider tone="section-3" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading" :style="{ color: 'var(--section-color-3)' }">Checkbox</h2>
            <p class="text-small text-muted-foreground">
                Standard, indeterminate, and disabled.
            </p>
            <div class="flex flex-wrap items-start gap-8">
                <div class="flex items-center gap-2">
                    <Checkbox id="chk-tos" v-model:checked="tos" />
                    <Label for="chk-tos">Accept terms</Label>
                </div>
                <div class="flex items-center gap-2">
                    <Checkbox id="chk-marketing" v-model:checked="marketing" />
                    <Label for="chk-marketing">Marketing email</Label>
                </div>
                <div class="flex items-center gap-2">
                    <Checkbox id="chk-indet" v-model:checked="indeterminate" />
                    <Label for="chk-indet">Indeterminate</Label>
                </div>
                <div class="flex items-center gap-2 opacity-60">
                    <Checkbox id="chk-disabled" disabled />
                    <Label for="chk-disabled">Disabled</Label>
                </div>
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading" :style="{ color: 'var(--section-color-3)' }">RadioGroup</h2>
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
            <h2 class="text-subheading" :style="{ color: 'var(--section-color-3)' }">Switch</h2>
            <p class="text-small text-muted-foreground">
                Immediate-effect toggle. Prefer over checkbox when the change is instant.
            </p>
            <div class="flex flex-wrap items-center gap-8">
                <div class="flex items-center gap-3">
                    <Switch id="sw-notifications" v-model:checked="notifications" />
                    <Label for="sw-notifications">Notifications</Label>
                </div>
                <div class="flex items-center gap-3">
                    <Switch id="sw-airplane" v-model:checked="airplane" />
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
