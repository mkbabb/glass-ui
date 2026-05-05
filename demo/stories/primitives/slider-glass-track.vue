<!--
  primitives/slider-glass-track — bold-maximalist showcase for the W3 (H)
  `<Slider variant="glass-track">` variant + `:keep-dock-open` round-trip.

  Sections, top-to-bottom:
    1. Hero specimen     — CreamSurface tone="warm" chassis + IconStamp
                           accent + FlourishDivider gold rule.
    2. Three shapes      — glass-track default · accent-tinted range ·
                           narrow configuration scrub. One variant, three
                           deliberate gestures.
    3. Dock round-trip   — three sliders mounted inside a <DockLayerGroup>,
                           each carrying `:keep-dock-open`. On pointerdown
                           <Slider> injects DOCK_KEEP_OPEN_SINK_KEY and
                           acquires a token; on pointerup / pointercancel
                           it releases. Drag the thumb — the dock stays
                           open through the whole gesture, then collapses
                           on release.
-->
<script setup lang="ts">
import { ref } from "vue";
import { Sliders, Waves, GaugeCircle } from "lucide-vue-next";

import StoryPage from "../StoryPage.vue";
import { Slider } from "@/components/ui/slider";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { IconStamp } from "@/components/custom/icon-stamp";
import {
    GlassDock,
    DockLayerGroup,
    DockLayer,
} from "@/components/custom/dock";

// ── §2: three shapes ──────────────────────────────────────────────────────
const amplitude = ref<number[]>([42]);
const phase = ref<number[]>([66]);
const fineTune = ref<number[]>([18]);

// ── §3: dock round-trip ───────────────────────────────────────────────────
type LayerId = "amp" | "phase" | "tune";
const dockLayer = ref<LayerId>("amp");
const dockAmp = ref<number[]>([55]);
const dockPhase = ref<number[]>([72]);
const dockTune = ref<number[]>([34]);
</script>

<template>
    <StoryPage>
        <!-- ── §1. HERO SPECIMEN ──────────────────────────────────────── -->
        <CreamSurface
            tone="warm"
            class="relative overflow-hidden"
            :class="'p-[var(--space-phi-5,4rem)] md:p-[var(--space-phi-6,6rem)]'"
        >
            <!-- pastel radial wash, mirrors the blob.vue hero shape -->
            <div
                class="pointer-events-none absolute inset-0 -z-10 opacity-50"
                :style="{
                    backgroundImage: `
                        radial-gradient(ellipse 70% 55% at 22% 18%, var(--rainbow-pastel-blue) 0%, transparent 60%),
                        radial-gradient(ellipse 65% 55% at 80% 82%, var(--rainbow-pastel-yellow) 0%, transparent 60%),
                        radial-gradient(ellipse 90% 70% at 50% 110%, var(--rainbow-pastel-violet) 0%, transparent 60%)
                    `,
                }"
            />

            <div
                class="relative flex flex-col items-center gap-[var(--space-phi-3)] text-center"
            >
                <p class="section-label">primitives · &lt;Slider variant="glass-track"&gt; · v1.0</p>

                <IconStamp
                    size="2xl"
                    frame="stamp"
                    accent="section-3"
                    aria-hidden="true"
                >
                    <Sliders />
                </IconStamp>

                <DisplayHero
                    size="display-mega"
                    variation="wonk"
                    class="leading-[0.92]"
                >
                    A&nbsp;quiet&nbsp;rail.
                </DisplayHero>

                <p class="text-prose-lettrine max-w-2xl text-foreground/85">
                    The glass-track slider is the canon scrub — a subtle
                    glass-bg-subtle rail that lifts to medium on hover, with
                    a cartoon-shadow-accent thumb on grip. It composes the
                    dock-keep-open round-trip: when mounted inside a
                    <code class="fira-code">&lt;DockLayerGroup&gt;</code> with
                    <code class="fira-code">:keep-dock-open</code>, the dock
                    holds open through the entire drag and releases on
                    pointer-up. Three shapes, one identity.
                </p>

                <FlourishDivider
                    tone="gold"
                    class="my-[var(--space-phi-2)] w-full max-w-md"
                />

                <p class="text-mono-caption text-muted-foreground">
                    IconStamp · CreamSurface tone="warm" · FlourishDivider tone="gold"
                </p>
            </div>
        </CreamSurface>

        <!-- ── §2. THREE SHAPES ───────────────────────────────────────── -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <header class="flex flex-col gap-[var(--space-phi-1)]">
                <p class="section-label">vocabulary · three shapes</p>
                <DisplayHero size="display-3" variation="wonk">
                    One variant, three deliberate gestures.
                </DisplayHero>
                <p class="text-prose max-w-prose text-foreground/80">
                    Each shape commits to a rest-state intent. Default is the
                    canon scrub. Accent-tinted range is the
                    <em>active control</em>: primary input on a chassis,
                    section-color through the fill. Narrow track is the
                    <em>configuration scrub</em>: secondary, quieter, paired
                    with a tabular-num readout.
                </p>
            </header>

            <div
                class="grid gap-[var(--space-phi-4)] rounded-2xl border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon"
            >
                <!-- Shape 1: default glass-track -->
                <div class="flex flex-col gap-3">
                    <div class="flex items-center justify-between">
                        <p class="section-label">shape · default</p>
                        <span class="text-mono-caption text-muted-foreground tabular-nums">
                            amplitude · {{ amplitude[0] }}%
                        </span>
                    </div>
                    <Slider
                        v-model="amplitude"
                        variant="glass-track"
                        :max="100"
                        :step="1"
                        aria-label="Amplitude"
                    />
                    <p class="text-mono-caption text-muted-foreground">
                        glass-bg-subtle rail · 4px → 6px on hover · cartoon-accent on press
                    </p>
                </div>

                <!-- Shape 2: accent-tinted range -->
                <div class="flex flex-col gap-3">
                    <div class="flex items-center justify-between">
                        <p class="section-label">shape · accent-tinted range</p>
                        <span class="text-mono-caption text-muted-foreground tabular-nums">
                            phase · {{ phase[0] }}°
                        </span>
                    </div>
                    <Slider
                        v-model="phase"
                        variant="glass-track"
                        :max="360"
                        :step="1"
                        aria-label="Phase"
                        style="--slider-range-bg: color-mix(in srgb, var(--section-color-5) 70%, transparent);"
                    />
                    <p class="text-mono-caption text-muted-foreground">
                        --slider-range-bg · section-5 · accent flows through the fill
                    </p>
                </div>

                <!-- Shape 3: narrow configuration scrub -->
                <div class="flex flex-col gap-3">
                    <div class="flex items-center justify-between">
                        <p class="section-label">shape · narrow configuration scrub</p>
                        <span class="text-mono-caption text-muted-foreground tabular-nums">
                            fine-tune · {{ fineTune[0]!.toFixed(2) }}
                        </span>
                    </div>
                    <Slider
                        v-model="fineTune"
                        variant="glass-track"
                        :max="100"
                        :step="0.01"
                        aria-label="Fine tune"
                        style="
                            --slider-track-height: 2px;
                            --slider-thumb-size: 0.7rem;
                            --slider-range-bg: var(--gold);
                        "
                    />
                    <p class="text-mono-caption text-muted-foreground">
                        2px rail · 0.7rem disc · gold range · the configuration scrub
                    </p>
                </div>
            </div>
        </section>

        <!-- ── §3. DOCK KEEP-OPEN ROUND-TRIP ──────────────────────────── -->
        <section class="flex flex-col gap-[var(--space-phi-3)]">
            <header class="flex flex-col gap-[var(--space-phi-1)]">
                <p class="section-label">composition · dock-keep-open round-trip</p>
                <DisplayHero size="display-3" variation="wonk">
                    Drag a slider. The dock holds.
                </DisplayHero>
                <p class="text-prose max-w-prose text-foreground/80">
                    Three glass-track sliders mounted inside a
                    <code class="fira-code">&lt;DockLayerGroup&gt;</code>,
                    each with
                    <code class="fira-code">:keep-dock-open</code>. On
                    <code class="fira-code">pointerdown</code>, the slider
                    injects
                    <code class="fira-code">DOCK_KEEP_OPEN_SINK_KEY</code> and
                    calls <code class="fira-code">acquire()</code>; on
                    <code class="fira-code">pointerup</code> /
                    <code class="fira-code">pointercancel</code> it releases.
                    The dock's keep-open counter stays incremented through
                    the whole drag — pointer leaving the slider does not
                    collapse the dock, only pointer-up does. Switch layers
                    via the rail; drag the thumb in any layer to verify.
                </p>
            </header>

            <div
                class="rounded-2xl border border-border bg-card p-[var(--space-phi-5)] shadow-cartoon"
            >
                <div class="flex items-center justify-center">
                    <GlassDock always-expanded fit-content>
                        <DockLayerGroup
                            v-model:active="dockLayer"
                            data-testid="slider-dock-rt"
                        >
                            <DockLayer id="amp" label="Amp" :icon="GaugeCircle">
                                <div
                                    class="flex items-center gap-3 px-2"
                                    style="min-width: 14rem;"
                                >
                                    <span
                                        class="text-mono-caption text-muted-foreground tabular-nums"
                                        style="min-width: 4rem;"
                                    >
                                        amp · {{ dockAmp[0] }}
                                    </span>
                                    <Slider
                                        v-model="dockAmp"
                                        variant="glass-track"
                                        keep-dock-open
                                        :max="100"
                                        :step="1"
                                        aria-label="amp"
                                        class="min-w-[8rem]"
                                        style="--slider-range-bg: color-mix(in srgb, var(--section-color-3) 70%, transparent);"
                                    />
                                </div>
                            </DockLayer>

                            <DockLayer id="phase" label="Phase" :icon="Waves">
                                <div
                                    class="flex items-center gap-3 px-2"
                                    style="min-width: 14rem;"
                                >
                                    <span
                                        class="text-mono-caption text-muted-foreground tabular-nums"
                                        style="min-width: 4rem;"
                                    >
                                        phase · {{ dockPhase[0] }}
                                    </span>
                                    <Slider
                                        v-model="dockPhase"
                                        variant="glass-track"
                                        keep-dock-open
                                        :max="360"
                                        :step="1"
                                        aria-label="phase"
                                        class="min-w-[8rem]"
                                        style="--slider-range-bg: color-mix(in srgb, var(--section-color-5) 70%, transparent);"
                                    />
                                </div>
                            </DockLayer>

                            <DockLayer id="tune" label="Tune" :icon="Sliders">
                                <div
                                    class="flex items-center gap-3 px-2"
                                    style="min-width: 14rem;"
                                >
                                    <span
                                        class="text-mono-caption text-muted-foreground tabular-nums"
                                        style="min-width: 4rem;"
                                    >
                                        tune · {{ dockTune[0] }}
                                    </span>
                                    <Slider
                                        v-model="dockTune"
                                        variant="glass-track"
                                        keep-dock-open
                                        :max="100"
                                        :step="1"
                                        aria-label="tune"
                                        class="min-w-[8rem]"
                                        style="--slider-range-bg: color-mix(in srgb, var(--section-color-7) 70%, transparent);"
                                    />
                                </div>
                            </DockLayer>
                        </DockLayerGroup>
                    </GlassDock>
                </div>
            </div>

            <p class="text-mono-caption text-muted-foreground">
                Sink contract — <code class="fira-code">acquire(): symbol</code> +
                <code class="fira-code">release(token): void</code> — owned by
                <code class="fira-code">&lt;DockLayerGroup&gt;</code>; consumed
                automatically by every <code class="fira-code">&lt;Slider :keep-dock-open&gt;</code>
                inside the group. No leaf wiring required.
            </p>
        </section>
    </StoryPage>
</template>
