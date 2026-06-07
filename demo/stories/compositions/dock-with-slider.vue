<script setup lang="ts">
/**
 * Dock-with-Slider composition — cross-substrate `keep-dock-open` contract.
 *
 * J.W5.C wired the `keep-dock-open` cross-substrate contract: a `<Slider>`
 * descendant of a `<GlassDock>` acquires a `dockKeepOpen` token while the
 * user drags, and the slider also subscribes to the dock's `dockHeld`
 * computed and reflects it via `data-held` on its root. This story is
 * the J FINAL named-residual closeout — no demo previously bound a
 * `<Slider>` inside a `<GlassDock>` to *visually* exercise the contract.
 *
 * Visual proof (drag any of the cells below):
 *   1. The slider thumb-halo intensifies (denser surface-tint rung) while
 *      held — see `.glass-slider[data-held]` in Slider.vue scoped CSS.
 *   2. The dock substrate background tier-shades up while *any* descendant
 *      holds a `dockKeepOpen` token — see `.glass-dock[data-held]` in
 *      `src/styles/dock.css`.
 *   3. Releasing pointer-up on either dock-internal or document-scope
 *      restores both states — slider's `onPointerDown` attaches a
 *      `pointerup`/`pointercancel` listener at window scope.
 *   4. Reduced-motion honours through scoped CSS — neither halo nor
 *      substrate animates (transitions are always-on but short-duration
 *      tokens; `prefers-reduced-motion` consumers cap durations at the
 *      token level upstream).
 */
import StoryPage from "../StoryPage.vue";
import StorySection from "../StorySection.vue";
import { ref } from "vue";
import {
    Volume2,
    Sun,
    SlidersHorizontal,
    Music,
} from "@lucide/vue";
import { GlassDock, DockIconButton } from "../../../src/components/custom/dock";
import { Slider } from "../../../src/components/ui/slider";

const volume = ref<number[]>([42]);
const brightness = ref<number[]>([72]);
const trim = ref<number[]>([55]);
</script>

<template>
    <StoryPage>
        <StorySection
            label="slider in dock — standard variant"
            blurb="Drag the slider. The thumb halo intensifies (denser surface-tint rung) and the dock substrate tier-shades up while held — both states come from the J.W5.C `dockKeepOpen` / `dockHeld` provide-inject contract. Release: both return to default."
        >
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock fit-content>
                    <DockIconButton aria-label="Volume">
                        <Volume2 class="h-4 w-4" />
                    </DockIconButton>
                    <div class="flex w-48 items-center px-2">
                        <Slider
                            v-model="volume"
                            :max="100"
                            :step="1"
                            aria-label="Volume"
                        />
                    </div>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection
            label="slider in dock — wider track"
            blurb="The same standard knob over a wider dock cell. The thumb halo + dock substrate response on hold are variant-agnostic — the `dockKeepOpen` / `dockHeld` contract lives on the API surface, not the recipe."
        >
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock fit-content>
                    <DockIconButton aria-label="Brightness">
                        <Sun class="h-4 w-4" />
                    </DockIconButton>
                    <div class="flex w-56 items-center px-2">
                        <Slider
                            v-model="brightness"
                            :max="100"
                            :step="1"
                            aria-label="Brightness"
                        />
                    </div>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection
            label="multi-slider dock — collapsible (hover to expand)"
            blurb="Two sliders inside a collapsible dock. Either drag holds the dock open via ref-counted `dockKeepOpen` tokens (`useDockState.keepOpenCount`); both halos intensify when *either* is dragged because both subscribe to the same `dockHeld` computed."
        >
            <div class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8">
                <GlassDock>
                    <DockIconButton aria-label="Mixer">
                        <SlidersHorizontal class="h-4 w-4" />
                    </DockIconButton>
                    <div class="flex w-40 items-center px-2">
                        <Slider
                            v-model="volume"
                            :max="100"
                            :step="1"
                            aria-label="Mix volume"
                        />
                    </div>
                    <div class="dock-separator" />
                    <DockIconButton aria-label="Trim">
                        <Music class="h-4 w-4" />
                    </DockIconButton>
                    <div class="flex w-40 items-center px-2">
                        <Slider
                            v-model="trim"
                            :max="100"
                            :step="1"
                            aria-label="Trim"
                        />
                    </div>
                    <template #collapsed>
                        <SlidersHorizontal class="h-4 w-4" />
                    </template>
                </GlassDock>
            </div>
        </StorySection>

        <StorySection
            label="idle-collapse-under-drag — the keepDockOpen hold (AW.W3)"
            blurb="A collapsible dock with a SHORT idle-collapse delay (600 ms). Hover to expand, then press-and-hold the slider thumb and move the pointer OFF the dock: the dock must STAY open through the held drag (the `dockKeepOpen` token suppresses the idle-collapse timer), and re-collapse only after you release. This is the AW.W3 proof story — `proof:dock-layering-polish` synthetically drives this exact gesture and asserts the dock does not collapse mid-hold."
        >
            <div
                class="flex justify-center rounded-[var(--radius-card)] border border-border/40 bg-card/40 p-8"
                data-testid="dock-slider-hold"
            >
                <GlassDock :collapse-delay="600">
                    <DockIconButton aria-label="Hold mixer">
                        <SlidersHorizontal class="h-4 w-4" />
                    </DockIconButton>
                    <div class="flex w-48 items-center px-2">
                        <Slider
                            v-model="volume"
                            :max="100"
                            :step="1"
                            aria-label="Hold mix volume"
                        />
                    </div>
                    <template #collapsed>
                        <SlidersHorizontal class="h-4 w-4" />
                    </template>
                </GlassDock>
            </div>
        </StorySection>
    </StoryPage>
</template>
