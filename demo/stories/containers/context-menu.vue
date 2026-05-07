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

const tone = ref<"warm" | "cool" | "neutral">("warm");
const showGrid = ref(true);
</script>

<template>
    <StoryPage>
        <div class="grid gap-12">
            <div class="grid gap-4">
                <h2 class="font-display text-xl">Right-click surface</h2>
                <p class="text-sm text-muted-foreground">
                    Right-click the paper below.
                </p>
                <ContextMenu>
                    <ContextMenuTrigger
                        class="grid h-72 place-items-center rounded-2xl border border-dashed border-border bg-card/50 text-muted-foreground transition-colors hover:bg-card/70"
                    >
                        <div class="grid gap-2 text-center">
                            <p class="font-display text-xl">Right-click here</p>
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
