<script setup lang="ts">
// the `--motion-tempo` axis live demo (M11, N6). ONE registered
// inheriting TIME scalar co-scales BOTH the CSS spring clocks (the
// `--spring-<name>-duration` reader = `settle * --motion-tempo`), the canonical
// sheet panel/scrim enter+exit reader, AND the JS spring responses
// (`motionTempo()` → `response *= tempo`), so CSS overlays and a JS dock morph
// tighten/loosen IN PROPORTION as the slider moves. Spring-duration readers resolve
// at `:root`; sheet-animate reads the inherited value on its portaled element. The
// slider therefore writes the shared owner on `document.documentElement`, and JS
// engines read that SAME root value at construction.
import { onUnmounted, ref, watchEffect } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { Button } from "@glass/components/button";
import { Slider } from "@glass/components/slider";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@glass/components/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@glass/components/popover";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogTitle,
    DialogTrigger,
} from "@glass/components/dialog";
import { GlassDock, DockControl } from "@glass/components/dock";
import { Layers, Package, Library, Sparkles } from "@lucide/vue";

// The tempo scalar (reka Slider binds a number[]). 0.7 (quicker) → 1.3 (longer);
// 1.0 is the shipped identity. RATIFIED (c): the DEFAULT is 1.0 — this slider is the
// "options for longer" knob, NOT a global re-tune.
const tempo = ref<number[]>([1]);

// Write the tempo to `:root` so the `:root`-declared `--spring-<name>-duration`
// reader re-resolves globally + the JS engines read it at their next construction.
// Restore the identity on unmount (never leave the app scaled).
watchEffect(() => {
    if (typeof document === "undefined") return;
    document.documentElement.style.setProperty("--motion-tempo", String(tempo.value[0]));
});
onUnmounted(() => {
    document.documentElement.style.removeProperty("--motion-tempo");
});

const dialogOpen = ref(false);
</script>

<template>
    <StoryPage>
        <StorySection
            heading="--motion-tempo · the one motion time knob"
            blurb="Move one tempo control and watch the dropdown, popover, dialog, and dock tighten or relax together while each keeps its own motion character."
        >
            <div class="tempo-panel glass-card flex flex-col gap-4 rounded-card p-6">
                <div class="flex items-baseline justify-between gap-4">
                    <span class="text-mono-small">--motion-tempo</span>
                    <span class="text-subheading text-foreground tabular-nums">{{
                        tempo[0].toFixed(2)
                    }}</span>
                </div>
                <Slider
                    v-model="tempo"
                    :min="0.7"
                    :max="1.3"
                    :step="0.05"
                    aria-label="Motion tempo"
                />
                <div class="flex flex-wrap gap-2 text-mono-small text-muted-foreground">
                    <Button emphasis="quiet" size="sm" @click="tempo = [0.7]">0.70 · quicker</Button>
                    <Button emphasis="quiet" size="sm" @click="tempo = [1]">1.00 · identity</Button>
                    <Button emphasis="quiet" size="sm" @click="tempo = [1.3]">1.30 · longer</Button>
                </div>
            </div>
        </StorySection>

        <StorySection
            heading="CSS overlays — the reader-clock scales"
            blurb="Dropdown and popover blooms read their spring-duration registers. The dialog panel reads the same spring owner, while its portaled scrim keeps distinct panel/fast base durations through the canonical sheet-animate reader. Every open, close, and interrupted reverse multiplies the same --motion-tempo value; no overlay-specific clock is copied."
        >
            <div class="flex flex-wrap items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button>Dropdown</Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent class="w-56">
                        <DropdownMenuLabel>enter-menu register</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>Compose</DropdownMenuItem>
                        <DropdownMenuItem>Refine</DropdownMenuItem>
                        <DropdownMenuItem>Ship</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                <Popover>
                    <PopoverTrigger as-child>
                        <Button>Popover</Button>
                    </PopoverTrigger>
                    <PopoverContent class="w-72">
                        <p class="text-subheading text-foreground">enter-overlay register</p>
                        <p class="text-small text-muted-foreground">
                            The bloom + fade + blur-settle ride the snappy reader clock —
                            it lengthens with the tempo above.
                        </p>
                    </PopoverContent>
                </Popover>

                <Dialog v-model:open="dialogOpen">
                    <DialogTrigger as-child>
                        <Button emphasis="primary">Dialog</Button>
                    </DialogTrigger>
                    <DialogContent class="max-w-md">
                        <DialogTitle>Materialize on the tempo clock</DialogTitle>
                        <DialogDescription>
                            The panel blooms on --spring-snappy-duration while the
                            portaled scrim fades on its distinct panel/fast bases. Both
                            multiply --motion-tempo on open and close. Compare 0.70 and
                            1.30 to feel the shared ratio, not identical raw durations.
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </StorySection>

        <StorySection
            heading="The dock morph scales in lockstep"
            blurb="Hover the dock to run its collapse↔expand morph. It reads the same --motion-tempo as the overlays above and stretches its timing by the same factor — dock and overlays move to one clock. Move the slider, then hover: the morph tracks the tempo."
        >
            <div class="dock-demo-stage flex min-h-40 items-center justify-center rounded-card p-8">
                <GlassDock :key="tempo[0]">
                    <DockControl aria-label="Assets"><Package /></DockControl>
                    <DockControl aria-label="Layers"><Layers /></DockControl>
                    <DockControl aria-label="Libraries"><Library /></DockControl>
                    <template #collapsed>
                        <DockControl aria-label="Expand"><Sparkles /></DockControl>
                    </template>
                </GlassDock>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* A calm blueprint wash so the glass overlays + dock POP over a live-reading field
   (the one-color-event / calm-substrate demo idiom — no GL context). */
.dock-demo-stage {
    background:
        linear-gradient(var(--surface-tint-4), var(--surface-tint-4)),
        repeating-linear-gradient(
            0deg,
            transparent 0 23px,
            color-mix(in srgb, var(--foreground) 6%, transparent) 23px 24px
        ),
        repeating-linear-gradient(
            90deg,
            transparent 0 23px,
            color-mix(in srgb, var(--foreground) 6%, transparent) 23px 24px
        );
}
</style>
