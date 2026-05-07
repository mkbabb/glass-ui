<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Checkbox } from "../../../src/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "../../../src/components/ui/radio-group";
import { Switch } from "../../../src/components/ui/switch";
import { Label } from "../../../src/components/ui/label";

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
        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Checkbox</h2>
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
