<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import ShowcaseFrame from "../../chassis/showcase/ShowcaseFrame.vue";
import { Input } from "@glass/components/input";
import { Label } from "@glass/components/label";

const email = ref("");
const project = ref("");
const note = ref("");
</script>

<template>
    <StoryPage>
        <StorySection label="associated control">
            <ShowcaseFrame class="flex max-w-md flex-col gap-3">
                <Label for="label-email">Email address</Label>
                <Input
                    id="label-email"
                    v-model="email"
                    type="email"
                    autocomplete="email"
                    placeholder="you@example.com"
                />
                <p class="text-small text-muted-foreground">
                    Activating the label moves focus to its input.
                </p>
            </ShowcaseFrame>
        </StorySection>

        <StorySection label="requirement annotations">
            <div class="grid gap-4 sm:grid-cols-2">
                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="label-project" requirement="required">
                        Project name
                    </Label>
                    <Input
                        id="label-project"
                        v-model="project"
                        required
                        placeholder="Aurora study"
                    />
                </ShowcaseFrame>

                <ShowcaseFrame class="flex flex-col gap-3">
                    <Label for="label-note" requirement="optional"> Review note </Label>
                    <Input id="label-note" v-model="note" placeholder="Add context" />
                </ShowcaseFrame>
            </div>
        </StorySection>

        <StorySection label="disabled state">
            <ShowcaseFrame class="flex max-w-md flex-col gap-3">
                <Label for="label-disabled" disabled>Archived field</Label>
                <Input id="label-disabled" disabled default-value="No longer editable" />
            </ShowcaseFrame>
        </StorySection>

        <StorySection label="wrapped · narrow">
            <ShowcaseFrame class="flex max-w-56 flex-col gap-3">
                <Label for="label-narrow" requirement="optional">
                    A deliberately long label that wraps without losing its control
                    association
                </Label>
                <Input id="label-narrow" placeholder="Narrow field" />
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
