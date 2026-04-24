<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { Separator } from "@/components/ui/separator";
</script>

<template>
    <StoryPage>
        <!-- Plain horizontal. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">horizontal</p>
            <div class="rounded-card border border-border bg-card p-6">
                <p class="text-small text-foreground">
                    Paragraph above the rule.
                </p>
                <Separator class="my-4" />
                <p class="text-small text-foreground">
                    Paragraph below.
                </p>
            </div>
        </section>

        <!-- Horizontal with label. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">horizontal · labelled</p>
            <div class="rounded-card border border-border bg-card p-6">
                <p class="text-small text-foreground">Draft</p>
                <Separator class="my-6" label="or" />
                <p class="text-small text-foreground">Published</p>
            </div>
        </section>

        <!-- Vertical separators in a flex row. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">vertical · flex row</p>
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
        </section>

        <!-- Section-label copy pattern. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">section-label copy pattern</p>
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
        </section>
    </StoryPage>
</template>
