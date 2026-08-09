<script setup lang="ts">
import { Layers } from "@lucide/vue";
import { DockControl } from "@glass/components/dock";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@glass/components/menu";
import type { ShellFacetItem } from "./useShellNavDock";

defineOptions({ inheritAttrs: false });

withDefaults(
    defineProps<{
        items: readonly ShellFacetItem[];
        selected?: string;
        label?: string;
        side?: "top" | "right" | "bottom" | "left";
    }>(),
    { label: "Section facets", side: "bottom" },
);

defineEmits<{ select: [id: string] }>();
</script>

<template>
    <DropdownMenu>
        <DropdownMenuTrigger as-child action="pointerdown">
            <DockControl v-bind="$attrs" type="button" :aria-label="label" :title="label">
                <Layers class="h-4 w-4" aria-hidden="true" />
            </DockControl>
        </DropdownMenuTrigger>
        <DropdownMenuContent :side="side" :side-offset="8">
            <DropdownMenuItem
                v-for="item in items"
                :key="item.id"
                :aria-current="selected === item.id ? 'page' : undefined"
                @select="$emit('select', item.id)"
            >
                <component v-if="item.icon" :is="item.icon" class="h-4 w-4" aria-hidden="true" />
                <span>{{ item.label }}</span>
            </DropdownMenuItem>
        </DropdownMenuContent>
    </DropdownMenu>
</template>
