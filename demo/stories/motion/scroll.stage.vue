<script setup lang="ts">
// Scroll Progress' stage: one column that scrolls inside the stage. `bar` draws a
// progress bar across its top, `rim` the progress rim along its edge with a dot per
// chapter, `reveal` lifts each block in as it enters.
import { ref } from "vue";
import { Skeleton } from "@glass/components/skeleton";
import { ScrollProgressRim } from "@glass/components/scroll-progress-rim";

withDefaults(defineProps<{ mode?: "bar" | "rim" | "reveal" }>(), { mode: "rim" });

const CHAPTERS = 8;
const LINES = [100, 92, 97, 64];

// The rim takes a value; the column's own scroll position is it.
const progress = ref(0);
function onScroll(e: Event): void {
    const el = e.currentTarget as HTMLElement;
    const extent = el.scrollHeight - el.clientHeight;
    progress.value = extent > 0 ? el.scrollTop / extent : 0;
}
</script>

<template>
    <div class="scroll-stage">
        <div class="scroll-stage-frame glass-resting">
            <div class="scroll-stage-port" tabindex="0" role="region" aria-label="Scrolling column" @scroll.passive="onScroll">
                <div v-if="mode === 'bar'" class="scroll-stage-bar scroll-progress" aria-hidden="true" />
                <div class="scroll-stage-body" :data-scroll-reveal="mode === 'reveal' ? '' : undefined">
                    <section v-for="c in CHAPTERS" :key="c" class="scroll-stage-chapter">
                        <Skeleton class="scroll-stage-heading" />
                        <Skeleton class="scroll-stage-figure" />
                        <Skeleton
                            v-for="(w, i) in LINES"
                            :key="i"
                            class="scroll-stage-line"
                            :style="{ inlineSize: `${w}%` }"
                        />
                    </section>
                </div>
            </div>
            <ScrollProgressRim
                v-if="mode === 'rim'"
                :value="progress"
                orientation="vertical"
                :segments="Array.from({ length: CHAPTERS }, (_, i) => i)"
            />
        </div>
    </div>
</template>

<style scoped>
.scroll-stage {
    display: grid;
    place-items: center;
    inline-size: 100%;
    padding: 1.5rem;
}

.scroll-stage-frame {
    position: relative;
    inline-size: min(40rem, 100%);
    block-size: calc(var(--story-stage-tall) - 3rem);
    border-radius: var(--radius-card);
    overflow: clip;
}

.scroll-stage-port {
    block-size: 100%;
    overflow-y: auto;
    overscroll-behavior: contain;
    border-radius: inherit;
}

.scroll-stage-bar {
    position: sticky;
    inset-block-start: 0;
    z-index: 1;
    block-size: 0.25rem;
    background: var(--motion-accent, var(--primary));
}

.scroll-stage-body {
    display: flex;
    flex-direction: column;
    gap: 2.5rem;
    padding: 1.5rem 2rem 4rem;
}

.scroll-stage-chapter {
    display: flex;
    flex-direction: column;
    gap: 0.75rem;
}

.scroll-stage-heading {
    inline-size: 45%;
    block-size: 1.5rem;
}

.scroll-stage-figure {
    block-size: 8rem;
}

.scroll-stage-line {
    block-size: 0.875rem;
}
</style>
