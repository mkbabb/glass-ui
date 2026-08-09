<script setup lang="ts">
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { computed, ref } from "vue";
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
} from "@glass/components/menu";


const tone = ref<"warm" | "cool" | "neutral">("warm");
const showGrid = ref(true);

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

        <StorySection heading="Right-click surface" gap="lg">
            <p class="text-small text-muted-foreground">
                Right-click, long-press, or focus the paper and press Shift+F10.
            </p>
            <DropdownMenu trigger="context">
                <DropdownMenuTrigger as-child>
                    <button
                        type="button"
                        class="grid h-72 w-full place-items-center rounded-card border border-border/60 transition-colors"
                        :style="canvasStyle"
                    >
                        <span class="grid gap-2 text-center">
                            <span class="text-subheading">
                                Right-click or press Shift+F10
                            </span>
                            <span class="text-small text-muted-foreground capitalize">
                                {{ tone }} paper{{
                                    showGrid ? " · blueprint grid" : ""
                                }}
                            </span>
                        </span>
                    </button>
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
                        <DropdownMenuRadioItem value="warm">Warm</DropdownMenuRadioItem>
                        <DropdownMenuRadioItem value="cool">Cool</DropdownMenuRadioItem>
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
