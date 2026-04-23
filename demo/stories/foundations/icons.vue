<script setup lang="ts">
import {
    Bell,
    BookOpen,
    Command,
    Compass,
    LayoutTemplate,
    Layers,
    Library,
    Moon,
    Package,
    Palette,
    Search,
    Settings,
    Shapes,
    SquareStack,
    Star,
    Sun,
    Table,
    Type,
    Wand2,
    Waves,
    Zap,
} from "lucide-vue-next";
import type { Component } from "vue";
import { cn } from "@/utils/cn";

interface IconRow {
    name: string;
    component: Component;
}

const icons: IconRow[] = [
    { name: "Compass", component: Compass },
    { name: "Shapes", component: Shapes },
    { name: "SquareStack", component: SquareStack },
    { name: "Table", component: Table },
    { name: "Bell", component: Bell },
    { name: "Waves", component: Waves },
    { name: "LayoutTemplate", component: LayoutTemplate },
    { name: "Settings", component: Settings },
    { name: "Sun", component: Sun },
    { name: "Moon", component: Moon },
    { name: "Command", component: Command },
    { name: "Search", component: Search },
    { name: "Star", component: Star },
    { name: "Zap", component: Zap },
    { name: "Wand2", component: Wand2 },
    { name: "Palette", component: Palette },
    { name: "Type", component: Type },
    { name: "Layers", component: Layers },
    { name: "Library", component: Library },
    { name: "Package", component: Package },
    { name: "BookOpen", component: BookOpen },
];

const sizes: { label: string; px: number }[] = [
    { label: "sm · 16", px: 16 },
    { label: "md · 20", px: 20 },
    { label: "lg · 24", px: 24 },
];

const strokes: number[] = [1, 1.5, 2];
</script>

<template>
    <section class="flex flex-col gap-12">
        <!-- Icon grid -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Lucide · {{ icons.length }} icons
            </p>
            <div
                class="grid grid-cols-3 gap-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8"
            >
                <div
                    v-for="icon in icons"
                    :key="icon.name"
                    :class="
                        cn(
                            'flex flex-col items-center gap-2 rounded-panel border border-border bg-card px-3 py-4',
                            'shadow-cartoon-sm transition-transform duration-fast ease-out',
                            'hover:-translate-x-px hover:-translate-y-px'
                        )
                    "
                >
                    <component
                        :is="icon.component"
                        :size="22"
                        :stroke-width="1.75"
                        class="text-foreground"
                    />
                    <span class="text-mono-caption text-center text-muted-foreground">{{
                        icon.name
                    }}</span>
                </div>
            </div>
        </div>

        <!-- Sizing demo -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Sizing</p>
            <div class="flex items-end gap-8">
                <div
                    v-for="s in sizes"
                    :key="s.label"
                    class="flex flex-col items-center gap-2"
                >
                    <Compass
                        :size="s.px"
                        :stroke-width="1.75"
                        class="text-foreground"
                    />
                    <span class="text-mono-caption text-muted-foreground">{{
                        s.label
                    }}</span>
                </div>
            </div>
        </div>

        <!-- Stroke-width demo -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Stroke width</p>
            <div class="flex items-end gap-8">
                <div
                    v-for="w in strokes"
                    :key="w"
                    class="flex flex-col items-center gap-2"
                >
                    <Compass :size="28" :stroke-width="w" class="text-foreground" />
                    <span class="text-mono-caption text-muted-foreground"
                        >{{ w.toFixed(1) }}px</span
                    >
                </div>
            </div>
        </div>
    </section>
</template>
