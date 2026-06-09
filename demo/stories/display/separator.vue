<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { Separator } from "../../../src/components/ui/separator";
</script>

<template>
    <StoryPage>
        <!-- Plain horizontal. -->
        <StorySection label="horizontal">
            <div class="rounded-card border border-border bg-card p-6">
                <p class="text-small text-foreground">
                    Paragraph above the rule.
                </p>
                <Separator class="my-4" />
                <p class="text-small text-foreground">
                    Paragraph below.
                </p>
            </div>
        </StorySection>

        <!-- Horizontal with label. -->
        <StorySection label="horizontal · labelled">
            <div class="rounded-card border border-border bg-card p-6">
                <p class="text-small text-foreground">Draft</p>
                <Separator class="my-6" label="or" />
                <p class="text-small text-foreground">Published</p>
            </div>
        </StorySection>

        <!-- Vertical separators in a flex row. -->
        <StorySection label="vertical · flex row">
            <div
                class="flex h-12 items-center rounded-card border border-border bg-card px-4"
            >
                <span class="text-small text-foreground">Docs</span>
                <Separator orientation="vertical" class="mx-4" />
                <span class="text-small text-foreground">API</span>
                <Separator orientation="vertical" class="mx-4" />
                <span class="text-small text-foreground">Playground</span>
                <Separator orientation="vertical" class="mx-4" />
                <span class="text-small text-foreground">Changelog</span>
            </div>
        </StorySection>

        <!-- Section-label copy pattern. -->
        <StorySection label="section-label copy pattern">
            <div
                class="flex flex-col gap-6 rounded-card border border-border bg-card p-6"
            >
                <div class="flex flex-col gap-3">
                    <p class="section-label">foundations</p>
                    <p class="text-small text-muted-foreground">
                        colors · type · radii · shadows
                    </p>
                </div>
                <Separator />
                <div class="flex flex-col gap-3">
                    <p class="section-label">primitives</p>
                    <p class="text-small text-muted-foreground">
                        button · input · slider · select
                    </p>
                </div>
                <Separator />
                <div class="flex flex-col gap-3">
                    <p class="section-label">containers</p>
                    <p class="text-small text-muted-foreground">
                        card · dialog · sheet · drawer
                    </p>
                </div>
            </div>
        </StorySection>
    </StoryPage>
</template>
