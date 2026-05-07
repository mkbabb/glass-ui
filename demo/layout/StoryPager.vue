<script setup lang="ts">
import { computed } from "vue";
import { GlassDock, DockTabButton } from "../../src/components/custom/dock";
import { useStoryNavigation } from "../composables/useStoryNavigation";

const { current } = useStoryNavigation();

const categoryLoc = computed(() =>
    current.value?.kind === "category" ? current.value : null,
);

interface PagerEntry {
    id: string;
    title: string;
    to: string;
}

const entries = computed<PagerEntry[]>(() =>
    categoryLoc.value
        ? categoryLoc.value.category.stories.map((s) => ({
              id: s.id,
              title: s.title,
              to: `/${categoryLoc.value!.category.id}/${s.id}`,
          }))
        : [],
);
</script>

<template>
    <!--
      Pager hides entirely when the active route is a flat standalone story
      (Aurora et al.) — there are no siblings to page through.
    -->
    <nav
        v-if="categoryLoc && entries.length > 0"
        class="flex w-full justify-center pt-2 pb-1"
        aria-label="Stories in category"
    >
        <GlassDock orientation="horizontal" always-expanded fit-content class="story-pager-dock">
            <div class="story-pager-row">
                <DockTabButton
                    v-for="entry in entries"
                    :key="entry.id"
                    as-child
                >
                    <RouterLink :to="entry.to">{{ entry.title }}</RouterLink>
                </DockTabButton>
            </div>
        </GlassDock>
    </nav>
</template>

<style scoped>
.story-pager-dock {
    max-width: min(80vw, 56rem);
}

.story-pager-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
    overflow-x: auto;
    /* scrollbar-hidden — class form would compose; use raw rules in scoped block */
    scrollbar-width: none;
}

.story-pager-row::-webkit-scrollbar {
    display: none;
}
</style>
