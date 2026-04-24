<script setup lang="ts">
import { computed } from "vue";
import { BouncyTabs, type TabOption } from "@/components/custom/tabs";
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
        class="flex min-w-0 px-4 pt-2 pb-1"
        aria-label="Stories in category"
    >
        <BouncyTabs
            :options="options"
            :model-value="activeStoryId"
            variant="pill"
            class="max-w-full scrollbar-hidden overflow-x-auto"
            @update:model-value="handleUpdate"
        />
    </nav>
</template>
