<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import { Input } from "../../../src/components/ui/input";
import { Label } from "../../../src/components/ui/label";
import { SearchBar } from "../../../src/components/custom/search";


const plain = ref("");
const withLabel = ref("");
const errored = ref("not-an-email");
const searchTerm = ref("");
const pillBare = ref("");
</script>

<template>
    <StoryPage>
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
