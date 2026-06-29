<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import { Input } from "@glass/components/ui/input";
import { Label } from "@glass/components/ui/label";
import { SearchBar } from "@glass/components/custom/search";
import { IconChip } from "@glass/components/custom/icon-chip";
import { TextCursorInput } from "@lucide/vue";
// BC.W-SUFFUSE-reconcile — the forms band's ONE coherent --section-color-3 teal
// identity (the cool stop). PH3-safe (inline borderLeft, not the
// border-l-[3px] + <IconChip> double-header shape).
const FORMS_STOP = 3;

const plain = ref("");
const withLabel = ref("");
const errored = ref("not-an-email");
const searchTerm = ref("");
const pillBare = ref("");
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
            <IconChip :icon="TextCursorInput" :section="FORMS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Text input
                </span>
                <p class="text-small text-muted-foreground">
                    Text fields, search, and password inputs — the field controls
                    stay ink; the section identity is the ONE color event.
                </p>
            </div>
        </header>

        <StorySection heading="Default" gap="lg">
            <p class="text-small text-muted-foreground">
                Bare <code class="fira-code">Input</code>, no label.
            </p>
            <div class="max-w-sm">
                <Input v-model="plain" placeholder="Type something…" />
            </div>
        </StorySection>

        <StorySection heading="With label" gap="lg">
            <p class="text-small text-muted-foreground">
                <code class="fira-code">Label</code> + <code class="fira-code">Input</code>,
                explicit <code class="fira-code">for</code> binding.
            </p>
            <div class="flex flex-col gap-2 max-w-sm">
                <Label for="story-email">Email</Label>
                <Input id="story-email" v-model="withLabel" type="email" placeholder="name@domain.tld" />
            </div>
        </StorySection>

        <StorySection heading="With error" gap="lg">
            <p class="text-small text-muted-foreground">
                Error messaging lives below the field and borrows the
                <code class="fira-code">destructive</code> token.
            </p>
            <div class="flex flex-col gap-2 max-w-sm">
                <Label for="story-email-err" class="text-destructive">Email</Label>
                <Input
                    id="story-email-err"
                    v-model="errored"
                    aria-invalid="true"
                    aria-describedby="story-email-err-msg"
                    class="border-destructive focus:border-destructive focus:shadow-[0_0_0_2px_color-mix(in_srgb,var(--destructive)_30%,transparent)]"
                />
                <p id="story-email-err-msg" class="text-small text-destructive">
                    That doesn&rsquo;t look like an email address.
                </p>
            </div>
        </StorySection>

        <StorySection heading="Disabled" gap="lg">
            <p class="text-small text-muted-foreground">
                <code class="fira-code">disabled</code> attribute dims opacity and blocks pointer events.
            </p>
            <div class="flex flex-col gap-2 max-w-sm">
                <Label for="story-disabled" class="opacity-60">API key</Label>
                <Input
                    id="story-disabled"
                    model-value="locked-down-xxxxxxxxxxxx"
                    disabled
                />
            </div>
        </StorySection>

        <StorySection heading="SearchBar" gap="lg">
            <p class="text-small text-muted-foreground">
                <code class="fira-code">SearchBar</code> from
                <code class="fira-code">@/components/custom/search</code>, icon baked in.
            </p>
            <div class="max-w-sm">
                <SearchBar v-model="searchTerm" placeholder="Search the catalogue…" />
            </div>
        </StorySection>

        <StorySection heading=".input-pill utility" gap="lg">
            <p class="text-small text-muted-foreground">
                Raw <code class="fira-code">.input-pill</code> from
                <code class="fira-code">glass.css</code>, no component wrapper.
            </p>
            <div class="max-w-sm">
                <input
                    v-model="pillBare"
                    class="input-pill text-sm"
                    placeholder="Bare pill input…"
                    aria-label="bare pill input"
                >
            </div>
        </StorySection>
    </StoryPage>
</template>
