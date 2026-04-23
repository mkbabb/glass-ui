<script setup lang="ts">
import { computed } from "vue";
import { BouncyTabs, type TabOption } from "@/components/custom/tabs";
import { cn } from "@/utils/cn";
import { CATEGORIES } from "../stories/manifest";
import { useStoryNavigation } from "../composables/useStoryNavigation";

const { current, goTo } = useStoryNavigation();

const activeCategory = computed(
    () => current.value?.category ?? CATEGORIES[0]!,
);

const options = computed<TabOption[]>(() =>
    activeCategory.value.stories.map((s) => ({ label: s.title, value: s.id })),
);

const activeStoryId = computed(
    () =>
        current.value?.story.id ?? activeCategory.value.stories[0]?.id ?? "",
);

function handleUpdate(storyId: string): void {
    if (!storyId || storyId === current.value?.story.id) return;
    goTo(activeCategory.value.id, storyId);
}
</script>

<template>
    <nav
        v-if="options.length > 0"
        class="px-4 py-3"
        aria-label="Stories in category"
    >
        <!--
            Continuous tab-bar: a single glass pill that horizontally scrolls
            when stories overflow. The sliding indicator lives inside
            BouncyTabs and reacts to modelValue changes (route-driven).
        -->
        <div
            :class="
                cn(
                    'glass-subtle scrollbar-hidden flex overflow-x-auto rounded-[var(--radius-pill)] p-0.5',
                )
            "
        >
            <BouncyTabs
                :options="options"
                :model-value="activeStoryId"
                variant="pill"
                class="!flex !bg-transparent"
                @update:model-value="handleUpdate"
            />
        </div>
    </nav>
</template>
