<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, ref } from "vue";
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
} from "@glass/components/dropdown-menu";
import { IconChip } from "@glass/components/icon-chip";
import { MousePointerClick } from "@lucide/vue";

// BC.W-SUFFUSE-reconcile — the containers band's ONE coherent --section-color-2
// blue identity. PH3-safe (inline borderLeft, not the border-l-[3px] +
// <IconChip> double-header shape).
const CONTAINERS_STOP = 2;

const tone = ref<"warm" | "cool" | "neutral">("warm");
const showGrid = ref(true);

// CBA-3 — the bound tone/grid render as a visible tinted canvas. Each tone maps to a
// --section-color wash; the grid is a token-tinted blueprint overlay toggled by the
// checkbox item.
const TONE_STOP: Record<"warm" | "cool" | "neutral", string> = {
    warm: "5",
    cool: "2",
    neutral: "11",
};

const canvasStyle = computed(() => {
    const wash = `color-mix(in srgb, var(--section-color-${TONE_STOP[tone.value]}) 12%, transparent)`;
    const gridLine = `color-mix(in srgb, var(--section-color-${TONE_STOP[tone.value]}) 22%, transparent)`;
    const grid = showGrid.value
        ? `, repeating-linear-gradient(0deg, ${gridLine} 0 1px, transparent 1px 22px), repeating-linear-gradient(90deg, ${gridLine} 0 1px, transparent 1px 22px)`
        : "";
    return { backgroundImage: `linear-gradient(${wash}, ${wash})${grid}` };
});
</script>

<template>
    <StoryPage>
        <header
            class="story-color-event flex items-center gap-4 pl-5"
            :style="{
                '--section-label-accent': `var(--section-color-${CONTAINERS_STOP})`,
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
                    <!-- CBA-3: the menu's bound tone/grid drive the CANVAS itself — the
                         paper tints warm/cool/neutral and the blueprint grid toggles on,
                         so the menu's effect is a visible affordance, not a mono readout. -->
                    <DropdownMenuTrigger
                        class="grid h-72 place-items-center rounded-card border border-border/60 transition-colors"
                        :style="canvasStyle"
                    >
                        <div class="grid gap-2 text-center">
                            <p class="text-subheading">Right-click here</p>
                            <p class="text-small text-muted-foreground capitalize">
                                {{ tone }} paper{{ showGrid ? " · blueprint grid" : "" }}
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
                        <DropdownMenuItem disabled>
                            Paste (clipboard empty)
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
