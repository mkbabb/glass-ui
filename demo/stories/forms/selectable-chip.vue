<script setup lang="ts">
// SelectableChip — the BC.W-ACCENT-TONE tonal-accent register's component face.
// A tag/filter chip row reading a DISTINCT `:tone` per chip: idle-legible at rest
// (the floored --accent-fill ≥3:1, NOT the HEAD whisper) + active-bold when
// selected (the --accent-band + --accent-edge rim + the contrast-safe --accent-ink
// label). Every chip is the SAME coherent tonal language; only the --tone differs.
import { ref } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { SelectableChip } from "@glass/subpaths/selectable-chip";



// A tag picker — each tag carries its own section-color --tone, so the row reads as
// one tonal family with per-tag identity. Idle chips stay legibly tinted; selected
// chips go bold with a contrast-correct ink.
const tags = ref<{ label: string; tone: string; on: boolean }[]>([
    { label: "React", tone: "var(--section-color-7)", on: true },
    { label: "Vue", tone: "var(--section-color-4)", on: false },
    { label: "Svelte", tone: "var(--section-color-6)", on: true },
    { label: "Solid", tone: "var(--section-color-2)", on: false },
    { label: "Angular", tone: "var(--section-color-0)", on: false },
    { label: "Qwik", tone: "var(--section-color-10)", on: true },
]);

// A single-tone filter row — exclusive selection, one tonal identity, sized larger.
const filter = ref<string | null>("recent");
const filters = [
    { value: "recent", label: "Recent" },
    { value: "popular", label: "Popular" },
    { value: "trending", label: "Trending" },
];
function pick(v: string) {
    filter.value = filter.value === v ? null : v;
}
</script>

<template>
    <StoryPage>
        
        <StorySection
            label="per-tone tag picker — idle legible, active bold"
            blurb="Each chip carries a distinct `:tone` (a `--section-color-*`). At REST the `--accent-fill` is faint but floored ≥3:1 (legibly tinted, not a whisper); SELECTED, the chip reads the bolder `--accent-band` + `--accent-edge` rim + the contrast-safe `--accent-ink` label."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap gap-2">
                    <SelectableChip
                        v-for="tag in tags"
                        :key="tag.label"
                        v-model="tag.on"
                        :tone="tag.tone"
                    >
                        {{ tag.label }}
                    </SelectableChip>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="single-tone filter row — exclusive selection, size=lg"
            blurb="One tonal identity across the row (`var(--primary)` default tone), exclusive selection composed via direct refs — the primitive is unopinionated about ToggleGroup."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap gap-2">
                    <SelectableChip
                        v-for="f in filters"
                        :key="f.value"
                        :model-value="filter === f.value"
                        size="lg"
                        @update:model-value="() => pick(f.value)"
                    >
                        {{ f.label }}
                    </SelectableChip>
                </div>
                <p class="text-mono-caption text-muted-foreground">
                    selected: <code class="fira-code">{{ filter ?? "(none)" }}</code>
                </p>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
