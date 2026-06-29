<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import {
    ContextMenu,
    ContextMenuCheckboxItem,
    ContextMenuContent,
    ContextMenuItem,
    ContextMenuLabel,
    ContextMenuRadioGroup,
    ContextMenuRadioItem,
    ContextMenuSeparator,
    ContextMenuShortcut,
    ContextMenuTrigger,
} from "@glass/components/ui/context-menu";
import { IconChip } from "@glass/components/custom/icon-chip";
import { MousePointerClick } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

const tone = ref<"warm" | "cool" | "neutral">("warm");
const showGrid = ref(true);
</script>

<template>
    <StoryPage>
        <header
            class="flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderLeft:
                    '3px solid color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="MousePointerClick" :section="CONTAINERS_STOP" bloom reveal />
            <div class="flex flex-col gap-1">
                <span class="section-label--tinted text-admin-label">
                    Containers · Context menu
                </span>
                <p class="text-small text-muted-foreground">
                    Right-click contextual actions — the container identity is the
                    ONE color event.
                </p>
            </div>
        </header>

            <StorySection heading="Right-click surface" gap="lg">
                <p class="text-sm text-muted-foreground">
                    Right-click the paper below.
                </p>
                <ContextMenu>
                    <ContextMenuTrigger
                        class="ghost-slot grid h-72 place-items-center transition-colors"
                    >
                        <div class="grid gap-2 text-center">
                            <p class="text-subheading">Right-click here</p>
                            <p class="font-mono text-xs">
                                tone = {{ tone }} · grid = {{ showGrid }}
                            </p>
                        </div>
                    </ContextMenuTrigger>
                    <ContextMenuContent class="w-64">
                        <ContextMenuLabel>Canvas</ContextMenuLabel>
                        <ContextMenuItem>
                            Rename
                            <ContextMenuShortcut>F2</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuItem>
                            Duplicate
                            <ContextMenuShortcut>⌘D</ContextMenuShortcut>
                        </ContextMenuItem>
                        <ContextMenuSeparator />
                        <ContextMenuLabel>Tone</ContextMenuLabel>
                        <ContextMenuRadioGroup v-model="tone">
                            <ContextMenuRadioItem value="warm">
                                Warm
                            </ContextMenuRadioItem>
                            <ContextMenuRadioItem value="cool">
                                Cool
                            </ContextMenuRadioItem>
                            <ContextMenuRadioItem value="neutral">
                                Neutral
                            </ContextMenuRadioItem>
                        </ContextMenuRadioGroup>
                        <ContextMenuSeparator />
                        <ContextMenuCheckboxItem v-model="showGrid">
                            Show grid
                        </ContextMenuCheckboxItem>
                        <ContextMenuSeparator />
                        <ContextMenuItem class="text-destructive">
                            Delete
                            <ContextMenuShortcut>⌘⌫</ContextMenuShortcut>
                        </ContextMenuItem>
                    </ContextMenuContent>
                </ContextMenu>
            </StorySection>
        
    </StoryPage>
</template>
