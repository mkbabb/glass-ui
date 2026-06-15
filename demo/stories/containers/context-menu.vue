<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
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
} from "../../../src/components/ui/context-menu";
import { IconChip } from "../../../src/components/custom/icon-chip";
import { MousePointerClick } from "@lucide/vue";
// BA.W-SUFFUSE2 — the containers band's ONE coherent --section-color-2 blue identity.
const CONTAINERS_STOP = 2;

const tone = ref<"warm" | "cool" | "neutral">("warm");
const showGrid = ref(true);
</script>

<template>
    <StoryPage>
        <!-- BA.W-SUFFUSE2 — the containers-band identity event family on --section-color-2. -->
        <header
            class="flex items-center gap-4 border-l-[3px] pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
                borderColor:
                    'color-mix(in srgb, var(--section-label-accent) 55%, transparent)',
            }"
        >
            <IconChip :icon="MousePointerClick" :section="CONTAINERS_STOP" />
            <div class="flex flex-col gap-1">
                <span class="section-label section-label--tinted text-admin-label">
                    Containers · Context menu
                </span>
                <p class="text-small text-muted-foreground">
                    Right-click contextual surface — the menu items stay ink; the
                    section identity is the ONE color event.
                </p>
            </div>
        </header>

        <div class="grid gap-12">
            <div class="grid gap-4">
                <h2 class="text-subheading">Right-click surface</h2>
                <p class="text-sm text-muted-foreground">
                    Right-click the paper below.
                </p>
                <ContextMenu>
                    <ContextMenuTrigger
                        class="grid h-72 place-items-center rounded-2xl border border-dashed border-border bg-card/50 text-muted-foreground transition-colors hover:bg-card/70"
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
            </div>
        </div>
    </StoryPage>
</template>
