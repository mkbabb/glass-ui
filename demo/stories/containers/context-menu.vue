<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { ref } from "vue";
// BI.W-MENU-TRIGGER — ContextMenu folded onto the Menu family as `trigger="context"`
// (clean break, no alias). The right-click menu is now the DropdownMenu family with the
// context trigger axis — ONE menu engine, one set of items.
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuRadioGroup,
    DropdownMenuRadioItem,
    DropdownMenuSeparator,
    DropdownMenuShortcut,
    DropdownMenuTrigger,
} from "@glass/components/ui/dropdown-menu";
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
                <DropdownMenu trigger="context">
                    <DropdownMenuTrigger
                        class="ghost-slot grid h-72 place-items-center transition-colors"
                    >
                        <div class="grid gap-2 text-center">
                            <p class="text-subheading">Right-click here</p>
                            <p class="font-mono text-xs">
                                tone = {{ tone }} · grid = {{ showGrid }}
                            </p>
                        </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-64">
                        <DropdownMenuLabel>Canvas</DropdownMenuLabel>
                        <DropdownMenuItem>
                            Rename
                            <DropdownMenuShortcut>F2</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                            Duplicate
                            <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuLabel>Tone</DropdownMenuLabel>
                        <DropdownMenuRadioGroup v-model="tone">
                            <DropdownMenuRadioItem value="warm">
                                Warm
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="cool">
                                Cool
                            </DropdownMenuRadioItem>
                            <DropdownMenuRadioItem value="neutral">
                                Neutral
                            </DropdownMenuRadioItem>
                        </DropdownMenuRadioGroup>
                        <DropdownMenuSeparator />
                        <DropdownMenuCheckboxItem v-model="showGrid">
                            Show grid
                        </DropdownMenuCheckboxItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem class="text-destructive">
                            Delete
                            <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </StorySection>
        
    </StoryPage>
</template>
