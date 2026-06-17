<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { ref } from "vue";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import { SearchBar } from "../../../src/components/custom/search";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { TextCursorInput } from "@lucide/vue";
// BA.W-SUFFUSE2 — the forms band's ONE coherent --section-color-3 teal identity.
const FORMS_STOP = 3;

const plain = ref("");
const withLabel = ref("");
const errored = ref("not-an-email");
const searchTerm = ref("");
const pillBare = ref("");
</script>

<template>
    <StoryPage>
        <!-- BA.W-SUFFUSE2 — the forms-band identity event family (the tinted
             eyebrow + the accent rail + the focal IconChip, all on --section-color-3). -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="TextCursorInput" :section="FORMS_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Text entry
                </span>
                <p class="text-small text-muted-foreground">
                    Inputs and search — the field controls stay ink; the section
                    identity is the ONE color event.
                </p>
            </div>
        </header>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Default</h2>
            <p class="text-small text-muted-foreground">
                Bare <code class="fira-code">Input</code>, no label.
            </p>
            <div class="max-w-sm">
                <Input v-model="plain" placeholder="Type something…" />
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">With label</h2>
            <p class="text-small text-muted-foreground">
                <code class="fira-code">Label</code> + <code class="fira-code">Input</code>,
                explicit <code class="fira-code">for</code> binding.
            </p>
            <div class="flex flex-col gap-2 max-w-sm">
                <Label for="story-email">Email</Label>
                <Input id="story-email" v-model="withLabel" type="email" placeholder="name@domain.tld" />
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">With error</h2>
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
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">Disabled</h2>
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
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">SearchBar</h2>
            <p class="text-small text-muted-foreground">
                <code class="fira-code">SearchBar</code> from
                <code class="fira-code">@/components/custom/search</code>, icon baked in.
            </p>
            <div class="max-w-sm">
                <SearchBar v-model="searchTerm" placeholder="Search the catalogue…" />
            </div>
        </section>

        <section class="flex flex-col gap-4">
            <h2 class="text-subheading">.input-pill utility</h2>
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
        </section>
    </StoryPage>
</template>
