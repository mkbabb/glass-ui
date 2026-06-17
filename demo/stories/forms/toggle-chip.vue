<script setup lang="ts">
// ToggleChip — chip vs cell variants over a reka-ui Toggle root.
// Deliberately unopinionated about exclusive vs multi selection; consumers
// wire `model-value` / `@update:model-value` (or `v-model`) directly.
import { ref, computed } from "vue";
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import ShowcaseFrame from "../ShowcaseFrame.vue";
import { ToggleChip } from "../../../src/subpaths/toggle-chip";
import { Triangle, Square, Circle, Hexagon, ToggleRight } from "@lucide/vue";
import { IconChip } from "../../../src/components/custom/icon-chip";
// BA.W-SUFFUSE2 — the forms band's ONE coherent --section-color-3 teal identity.
const FORMS_STOP = 3;

const tags = ref<Record<string, boolean>>({
    bone: true,
    contour: false,
    segment: false,
});

const pose = ref<string | null>("triangle");

function pickPose(v: string) {
    pose.value = pose.value === v ? null : v;
}

const cells = [
    { value: "triangle", icon: Triangle, label: "Triangle" },
    { value: "square", icon: Square, label: "Square" },
    { value: "circle", icon: Circle, label: "Circle" },
    { value: "hexagon", icon: Hexagon, label: "Hexagon" },
];
</script>

<template>
    <StoryPage>
        <!-- BA.W-SUFFUSE2 — the forms-band identity event family on --section-color-3. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${FORMS_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="ToggleRight" :section="FORMS_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Forms · Chip toggles
                </span>
                <p class="text-small text-muted-foreground">
                    Segmented chip and cell toggles — the glyphs stay ink; the
                    section identity is the ONE color event.
                </p>
            </div>
        </header>

        <StorySection
            label="variant=chip — multi-select"
            blurb="Inline horizontal selectors. Each chip carries `aria-pressed` from the reka-ui Toggle root; consumers manage their own selection model."
        >
            <ShowcaseFrame pad="lg">
                <div class="flex flex-wrap gap-2">
                    <ToggleChip
                        v-for="key in Object.keys(tags)"
                        :key="key"
                        v-model="tags[key]"
                        variant="chip"
                    >
                        {{ key }}
                    </ToggleChip>
                </div>
            </ShowcaseFrame>
        </StorySection>

        <StorySection
            label="variant=cell — exclusive selection (no ToggleGroup)"
            blurb="Square cards stacking icon + label. Exclusive selection composes via direct refs — the primitive is deliberately unopinionated about ToggleGroup."
        >
            <ShowcaseFrame pad="lg">
                <div class="grid grid-cols-2 gap-3 sm:grid-cols-4">
                    <ToggleChip
                        v-for="cell in cells"
                        :key="cell.value"
                        :model-value="pose === cell.value"
                        variant="cell"
                        @update:model-value="() => pickPose(cell.value)"
                    >
                        <component :is="cell.icon" class="size-icon-md" />
                        <span>{{ cell.label }}</span>
                    </ToggleChip>
                </div>
                <p class="text-mono-caption text-muted-foreground">
                    selected: <code class="fira-code">{{ pose ?? "(none)" }}</code>
                </p>
            </ShowcaseFrame>
        </StorySection>
    </StoryPage>
</template>
