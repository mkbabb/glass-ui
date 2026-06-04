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
        <GlassDock
            orientation="horizontal"
            always-expanded
            fit-content
            scroll-on-overflow
            class="story-pager-dock"
        >
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
    /*
       K.W5 — viewport-relative `min(80vw, 56rem)` overflowed by 4px at
       375×667 because `80vw` ignores the CategoryRail's left occupancy
       (J π audit: width=300, x=79, right=379). Bind the cap to the
       parent's available width via `100%` so the dock can never exceed
       its content area regardless of the rail width.
    */
    max-width: min(100%, 56rem);
}

.story-pager-row {
    display: flex;
    align-items: center;
    gap: 0.25rem;
}
</style>
