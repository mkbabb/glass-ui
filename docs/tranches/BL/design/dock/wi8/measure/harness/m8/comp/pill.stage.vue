<!-- MEASURE-8 H7 (RU-83): the pill, a composition that folds, for Q10's folded column. The nav composition the
     amendment names never folds (m7/comp/nav.stage.vue:38, :collapse="false"); RU-83's own text names "nav or the pill".
     dock-wi8.vue's w-pill (four page seats, a #collapsed glyph, collapse="closed") placed as nav is, at the stage's foot. -->
<script setup lang="ts">
import { BookOpen, Bookmark, Library, Search } from "@lucide/vue";
import { DockControl, GlassDock } from "@glass/components/dock";
import DockScene from "./DockScene.vue";
const PAGES = [
    { id: "read", label: "Reader", icon: BookOpen },
    { id: "search", label: "Search", icon: Search },
    { id: "library", label: "Library", icon: Library },
    { id: "marks", label: "Bookmarks", icon: Bookmark },
];
</script>

<template>
    <DockScene place="bottom">
        <GlassDock collapse="closed" aria-label="Pill">
            <DockControl v-for="p in PAGES" :key="p.id" :aria-label="p.label" :aria-current="p.id === 'read' ? 'page' : undefined">
                <component :is="p.icon" />
            </DockControl>
            <template #collapsed>
                <BookOpen class="h-4 w-4" aria-hidden="true" />
            </template>
        </GlassDock>
    </DockScene>
</template>
