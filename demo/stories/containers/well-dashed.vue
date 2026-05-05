<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { IconStamp } from "@/components/custom/icon-stamp";
import { CloudUpload, Plus, FilePlus2, Sparkles } from "lucide-vue-next";

const dragOver = ref(false);
const quickAddText = ref("");

function onDragOver(e: DragEvent) {
    e.preventDefault();
    dragOver.value = true;
}
function onDragLeave() {
    dragOver.value = false;
}
function onDrop(e: DragEvent) {
    e.preventDefault();
    dragOver.value = false;
}
</script>

<template>
    <StoryPage>
        <!-- Variation 1 — file drop-zone with stamped icon + label -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Drop-zone · empty state</p>
            <div
                class="well-dashed items-center text-center"
                :class="dragOver && 'is-active'"
                role="region"
                aria-label="File drop zone"
                @dragover="onDragOver"
                @dragleave="onDragLeave"
                @drop="onDrop"
            >
                <IconStamp size="2xl" frame="stamp" accent="section-3" class="mx-auto">
                    <CloudUpload aria-hidden="true" />
                </IconStamp>
                <h3 class="text-display-3 mt-[var(--space-phi-2)]">
                    Drop something here
                </h3>
                <p class="text-prose mt-[var(--space-phi-1)] max-w-prose text-foreground/70">
                    PNG, JPG, WebP, or PDF up to 12 MB. Or
                    <button
                        type="button"
                        class="underline decoration-dotted underline-offset-4 hover:decoration-solid"
                    >
                        browse from your machine
                    </button>.
                </p>
                <div class="mt-[var(--space-phi-2)] flex items-center justify-center gap-3">
                    <Button variant="cartoon" size="sm" class="gap-2">
                        <FilePlus2 class="size-4" aria-hidden="true" />
                        Choose files
                    </Button>
                    <span class="text-mono-caption text-muted-foreground">
                        or drag &amp; drop
                    </span>
                </div>
            </div>
        </section>

        <!-- Variation 2 — quick-add input + primary action (gap-29 ≥2 bar) -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Quick-add · second site</p>
            <div class="well-dashed">
                <div class="flex items-center gap-[var(--space-phi-2)]">
                    <IconStamp size="lg" frame="stamp" accent="section-5">
                        <Plus aria-hidden="true" />
                    </IconStamp>
                    <div class="flex-1">
                        <h3 class="text-heading">Add a new entry</h3>
                        <p class="text-mono-caption text-muted-foreground">
                            Type a term, press Enter, or click the button to commit.
                        </p>
                    </div>
                </div>
                <form
                    class="flex flex-col gap-[var(--space-phi-2)] sm:flex-row sm:items-center"
                    @submit.prevent="quickAddText = ''"
                >
                    <Input
                        v-model="quickAddText"
                        placeholder="ephemeris, antipode, halcyon…"
                        class="flex-1"
                    />
                    <Button type="submit" class="gap-2 whitespace-nowrap">
                        <Sparkles class="size-4" aria-hidden="true" />
                        Add to library
                    </Button>
                </form>
            </div>
        </section>

        <!-- Side-by-side comparison: empty + populated state -->
        <section class="flex flex-col gap-[var(--space-phi-2)]">
            <p class="section-label">Inline · pair of wells</p>
            <div class="grid gap-[var(--space-phi-3)] md:grid-cols-2">
                <div class="well-dashed">
                    <p class="text-mono-caption text-muted-foreground">empty</p>
                    <p class="text-prose text-foreground/70">
                        Wells render as
                        <code class="fira-code">2px dashed</code> borders with a 50%-mixed warm-cream
                        wash, padded at <code class="fira-code">--space-phi-3</code>.
                    </p>
                </div>
                <div class="well-dashed">
                    <p class="text-mono-caption text-muted-foreground">populated</p>
                    <ul class="flex flex-col gap-[var(--space-phi-1)]">
                        <li class="flex items-center gap-2 text-prose">
                            <span class="size-2 rounded-full" style="background: var(--rainbow-yellow)" />
                            ephemeris
                        </li>
                        <li class="flex items-center gap-2 text-prose">
                            <span class="size-2 rounded-full" style="background: var(--rainbow-blue)" />
                            antipode
                        </li>
                        <li class="flex items-center gap-2 text-prose">
                            <span class="size-2 rounded-full" style="background: var(--rainbow-violet)" />
                            halcyon
                        </li>
                    </ul>
                </div>
            </div>
        </section>
    </StoryPage>
</template>

<style scoped>
.well-dashed.is-active {
    border-color: color-mix(in srgb, var(--section-color-3) 60%, transparent);
    background: color-mix(in srgb, var(--cream-warm) 70%, transparent);
}
</style>
