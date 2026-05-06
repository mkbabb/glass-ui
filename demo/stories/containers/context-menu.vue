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
} from "@/components/ui/context-menu";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";

const tone = ref<"warm" | "cool" | "neutral">("warm");
const showGrid = ref(true);
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <p
                class="section-label"
                :style="{ color: 'var(--section-color-5)' }"
            >
                § 5 · Right-click
            </p>
            <DisplayHero
                size="display-3"
                variation="wonk"
                class="mt-[var(--space-phi-1)] mb-[var(--space-phi-2)]"
                :style="{ color: 'var(--section-color-5)' }"
            >
                Surface menus
            </DisplayHero>
            <p class="text-prose max-w-2xl text-foreground/80">
                Context menus anchor to a hit region — right-click on desktop, long-press
                on touch — and float a glass-tier panel with separators, radios, checks,
                shortcuts. The trigger is invisible chrome; the menu IS the surface.
            </p>
            <FlourishDivider
                tone="section-5"
                class="my-[var(--space-phi-3)]"
            />

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
        </CreamSurface>
    </StoryPage>
</template>
