<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Label } from "../../../src/components/ui/label";
import { Input } from "../../../src/components/ui/input";
import { Checkbox } from "../../../src/components/ui/checkbox";
import { Switch } from "../../../src/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "../../../src/components/ui/radio-group";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { Tag } from "@lucide/vue";
// BA.W-SUFFUSE2 — the forms band's ONE coherent --section-color-3 teal identity.
const FORMS_STOP = 3;

const email = ref<string>("");
const agree = ref<boolean>(false);
const notify = ref<boolean>(true);
const plan = ref<string>("pro");
</script>

<template>
    <StoryPage>
        <!-- BA.W-SUFFUSE2 — the forms-band identity event family on --section-color-3. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="Tag" :section="FORMS_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label section-label--tinted text-admin-label">
                    Forms · Labeling
                </span>
                <p class="text-small text-muted-foreground">
                    Accessible name binding — the field labels stay ink; the
                    section identity is the ONE color event.
                </p>
            </div>
        </header>

        <!-- Labelled input via `for`. -->
        <section class="flex flex-col gap-3 max-w-sm">
            <p class="section-label">for-attribute coupling</p>
            <Label for="lbl-email">Email address</Label>
            <Input id="lbl-email" v-model="email" type="email" placeholder="you@domain.com" />
            <p class="text-mono-caption text-muted-foreground">
                Click the label to focus the input.
            </p>
        </section>

        <!-- Nested checkbox. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">nested control</p>
            <Label class="flex items-center gap-2 cursor-pointer">
                <Checkbox v-model="agree" />
                <span>I agree to the paper-and-glass manifesto.</span>
            </Label>
            <p class="text-mono-caption text-muted-foreground">agreed · {{ agree }}</p>
        </section>

        <!-- Switch + label pair, label-left layout. -->
        <section class="flex flex-col gap-3 max-w-sm">
            <p class="section-label">switch row</p>
            <div class="flex items-center justify-between rounded-card border border-border bg-card p-4">
                <div class="flex flex-col gap-1">
                    <Label for="lbl-notify">Ship notifications</Label>
                    <span class="text-small text-muted-foreground">
                        Email summaries, weekly digest.
                    </span>
                </div>
                <Switch id="lbl-notify" v-model="notify" />
            </div>
        </section>

        <!-- Radio group — each radio gets a label. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">radio group</p>
            <RadioGroup v-model="plan" class="flex flex-col gap-2">
                <Label class="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="free" />
                    <span>Free — library on the house.</span>
                </Label>
                <Label class="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="pro" />
                    <span>Pro — private palettes.</span>
                </Label>
                <Label class="flex items-center gap-2 cursor-pointer">
                    <RadioGroupItem value="studio" />
                    <span>Studio — onboarding + ghostwritten tokens.</span>
                </Label>
            </RadioGroup>
            <p class="text-mono-caption text-muted-foreground">plan · {{ plan }}</p>
        </section>

        <!-- Disabled input → label's peer-disabled: hooks apply. -->
        <section class="flex flex-col gap-3 max-w-sm">
            <p class="section-label">peer-disabled dims the label</p>
            <Label for="lbl-disabled">Disabled field</Label>
            <Input id="lbl-disabled" class="peer" disabled placeholder="Locked" />
        </section>
    </StoryPage>
</template>
