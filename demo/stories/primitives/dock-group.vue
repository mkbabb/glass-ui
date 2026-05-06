<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { DockGroup } from "@/components/custom/dock-group";
import { DockIconButton, DockTabButton } from "@/components/custom/dock";
import MetricBadge from "@/components/custom/metric-badge/MetricBadge.vue";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
import { ArrowLeft, RotateCcw, Square, Settings } from "lucide-vue-next";
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <DisplayHero size="display-3" variation="wonk" class="mt-2 mb-2">
                Instrument-cluster shelf
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                A pill-row substrate for dock-tier consumers. Two densities, mixed tiers — metric
                badges, icon buttons, and tab buttons cohabit on a single chassis strip.
            </p>
            <FlourishDivider tone="section-5" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Default density · pill row -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-5)' }">density · compact (default)</p>
            <DockGroup>
                <MetricBadge :amount="12" unit="ms" size="md" />
                <MetricBadge :amount="84" unit="Mbps" size="md" />
                <MetricBadge :amount="22" unit="Mbps" size="md" />
                <MetricBadge :amount="0.8" unit="ms" size="md" />
            </DockGroup>
        </section>

        <!-- Audacious density · chassis-strip pill row -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-5)' }">density · audacious</p>
            <DockGroup density="audacious">
                <MetricBadge :amount="12" unit="ms" size="lg" />
                <MetricBadge :amount="84" unit="Mbps" size="lg" />
                <MetricBadge :amount="22" unit="Mbps" size="lg" />
                <MetricBadge :amount="0.8" unit="ms" size="lg" />
            </DockGroup>
        </section>

        <!-- Mixed cluster · icon buttons in a shelf -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-5)' }">mixed cluster · icon buttons (data-tier=&quot;secondary&quot;)</p>
            <DockGroup>
                <DockIconButton aria-label="Back" data-tier="secondary">
                    <ArrowLeft class="size-4" :stroke-width="2.5" aria-hidden="true" />
                </DockIconButton>
                <DockIconButton aria-label="Retake" data-tier="secondary">
                    <RotateCcw class="size-4" :stroke-width="2.5" aria-hidden="true" />
                </DockIconButton>
                <DockIconButton aria-label="Stop" data-tier="secondary">
                    <Square class="size-4" :stroke-width="2.5" aria-hidden="true" />
                </DockIconButton>
                <DockIconButton aria-label="Settings" data-tier="secondary">
                    <Settings class="size-4" :stroke-width="2.5" aria-hidden="true" />
                </DockIconButton>
            </DockGroup>
        </section>

        <!-- Dock-tab tier inside the shelf -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-5)' }">tab buttons · primary tier inside shelf</p>
            <DockGroup density="audacious">
                <DockTabButton data-tier="primary">Start</DockTabButton>
            </DockGroup>
        </section>
    </StoryPage>
</template>
