<script setup lang="ts">
// BI.W-TEMPO — the `--motion-tempo` axis live demo (M11 / N6). ONE registered
// inheriting TIME scalar co-scales BOTH the CSS spring clocks (the
// `--spring-<name>-duration` reader = `settle * --motion-tempo`) AND the JS spring
// responses (`motionTempo()` → `response *= tempo`), so a CSS overlay (dropdown /
// popover / dialog) and a JS dock morph tighten/loosen IN PROPORTION as the slider
// moves — the P7 one-clock coherence proof (G2). The `--spring-*-duration` reader is
// declared at `:root`, so the slider writes `--motion-tempo` on `document.
// documentElement` (the honest "consumer sets `:root { --motion-tempo }`" mechanism —
// a descendant override would not re-resolve the `:root`-computed reader, the
// substitution trap); the JS engines read the SAME `:root` tempo at construction.
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
            blurb="ONE registered inheriting scalar co-scales EVERY spring clock — the CSS reader (--spring-*-duration = settle × --motion-tempo) AND the JS response (motionTempo() → response × tempo). Slide it and the dropdown, popover, dialog, and the JS dock morph all tighten or lengthen in proportion (the CSS↔JS one-clock coherence). 1.0 is the shipped identity; ⟂ --motion-weight ⟂ --ui-scale."
        >
            <div class="tempo-panel glass-card flex flex-col gap-4 rounded-card p-6">
                <div class="flex items-baseline justify-between gap-4">
                    <span class="text-mono-caption">--motion-tempo</span>
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
                <div class="flex flex-wrap gap-2 text-mono-caption text-muted-foreground">
                    <Button variant="ghost" size="sm" @click="tempo = [0.7]">0.70 · quicker</Button>
                    <Button variant="ghost" size="sm" @click="tempo = [1]">1.00 · identity</Button>
                    <Button variant="ghost" size="sm" @click="tempo = [1.3]">1.30 · longer</Button>
                </div>
            </div>
        </StorySection>

        <StorySection
            heading="CSS overlays — the reader-clock scales"
            blurb="The reka-portaled overlays compose .glass-reveal, whose enter/exit legs ride the --spring-*-duration readers. A tempo write re-resolves those :root-declared readers, so every open/close stretches with the slider — zero per-overlay edit (one reader, every overlay)."
        >
            <div class="flex flex-wrap items-center gap-3">
                <DropdownMenu>
                    <DropdownMenuTrigger as-child>
                        <Button variant="outline">Dropdown</Button>
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
                        <Button variant="outline">Popover</Button>
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
                        <Button variant="primary-audacious">Dialog</Button>
                    </DialogTrigger>
                    <DialogContent class="max-w-md">
                        <DialogTitle>Materialize on the tempo clock</DialogTitle>
                        <DialogDescription>
                            The dialog panel blooms on the enter-overlay register — the
                            same --spring-snappy-duration reader the tempo slider scales.
                            Open it at 0.70 and at 1.30 to feel the co-scale.
                        </DialogDescription>
                    </DialogContent>
                </Dialog>
            </div>
        </StorySection>

        <StorySection
            heading="JS dock morph — the response scales in lockstep"
            blurb="Hover the dock to run its collapse↔expand morph. useDockSpring reads --motion-tempo at construction and scales the DOCK_SPRING response by it — so the JS morph and the CSS overlays above stretch by the SAME factor (duration ∝ response). Move the slider, then hover: the morph tracks the tempo."
        >
            <div class="dock-demo-stage flex min-h-40 items-center justify-center rounded-card p-8">
                <GlassDock>
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
