<script setup lang="ts">
import { ref } from "vue";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Switch } from "@/components/ui/switch";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

const email = ref<string>("");
const agree = ref<boolean>(false);
const notify = ref<boolean>(true);
const plan = ref<string>("pro");
</script>

<template>
    <article class="flex flex-col gap-14">
        <header class="flex flex-col gap-3">
            <p class="text-admin-label text-muted-foreground">primitives · label</p>
            <h1 class="text-title text-foreground">Label</h1>
            <p class="text-prose max-w-2xl text-muted-foreground">
                Accessible <code class="font-mono-code">&lt;label&gt;</code> wrapper from
                reka-ui. Clicking the label transfers focus to the associated control via
                <code class="font-mono-code">for</code>; nesting the control inside the
                label achieves the same coupling. Both patterns shown below.
            </p>
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
    </article>
</template>
