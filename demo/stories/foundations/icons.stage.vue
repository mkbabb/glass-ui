<script setup lang="ts">
// Icons' stage: the set at its largest size, each glyph inked in one of the thirteen
// section colours.
import type { Component } from "vue";
import {
    BookOpen,
    Command,
    Compass,
    Layers,
    Library,
    Package,
    Palette,
    Search,
    Shapes,
    Star,
    Wand2,
    Waves,
    Zap,
} from "@lucide/vue";

const ICONS: readonly { icon: Component; name: string }[] = [
    { icon: Compass, name: "Compass" },
    { icon: Shapes, name: "Shapes" },
    { icon: Waves, name: "Waves" },
    { icon: Star, name: "Star" },
    { icon: Zap, name: "Zap" },
    { icon: Wand2, name: "Wand" },
    { icon: Palette, name: "Palette" },
    { icon: Command, name: "Command" },
    { icon: Search, name: "Search" },
    { icon: Layers, name: "Layers" },
    { icon: Library, name: "Library" },
    { icon: Package, name: "Package" },
    { icon: BookOpen, name: "Book" },
];
</script>

<template>
    <div class="icons-stage">
        <component
            :is="item.icon"
            v-for="(item, i) in ICONS"
            :key="item.name"
            :size="32"
            :stroke-width="1.75"
            :style="{ color: `var(--section-color-${i})` }"
            role="img"
            :aria-label="item.name"
        />
    </div>
</template>

<style scoped>
.icons-stage {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: var(--sp-5);
    max-inline-size: min(60rem, calc(100cqi - 3rem));
}

@container (inline-size < 26rem) {
    .icons-stage {
        gap: var(--sp-4);
    }
}
</style>
