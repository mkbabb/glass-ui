<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { MetricBadge } from "@/components/custom/metric-badge";
import { CreamSurface } from "@/components/custom/cream-surface";
import { DisplayHero } from "@/components/custom/display-hero";
import { FlourishDivider } from "@/components/custom/flourish-divider";
</script>

<template>
    <StoryPage>
        <CreamSurface tone="warm" class="relative overflow-hidden">
            <DisplayHero size="display-3" variation="wonk" class="mt-2 mb-2">
                Numbers, with a unit
            </DisplayHero>
            <p class="text-prose max-w-prose text-foreground/80">
                Amount + unit + optional viz tint. Four sizes, an em-dash placeholder for nulls,
                and inline-prose composition for instrument-cluster narration.
            </p>
            <FlourishDivider tone="section-8" class="mt-[var(--space-phi-3)]" />
        </CreamSurface>

        <!-- Basic amounts + units. -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-8)' }">amount · unit</p>
            <div class="flex flex-wrap items-center gap-6">
                <MetricBadge :amount="128" unit="ms" />
                <MetricBadge :amount="'42.0'" unit="fps" />
                <MetricBadge :amount="1_204" unit="req/s" />
                <MetricBadge :amount="'99.95'" unit="%" />
            </div>
        </section>

        <!-- Coloured amount via the `color` prop. -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-8)' }">viz-colored amounts</p>
            <div class="flex flex-wrap items-center gap-6">
                <MetricBadge
                    :amount="12"
                    unit="harmonics"
                    color="var(--viz-fourier)"
                />
                <MetricBadge
                    :amount="8"
                    unit="nodes"
                    color="var(--viz-chebyshev)"
                />
                <MetricBadge
                    :amount="5"
                    unit="degree"
                    color="var(--viz-legendre)"
                />
            </div>
        </section>

        <!-- Empty + custom placeholder. -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-8)' }">empty states</p>
            <div class="flex flex-wrap items-center gap-6">
                <MetricBadge :amount="null" unit="ms" />
                <MetricBadge :amount="undefined" unit="%" placeholder="n/a" />
                <MetricBadge :amount="''" unit="qps" placeholder="…" />
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Empty amounts render the placeholder glyph — default em dash.
            </p>
        </section>

        <!-- Size ladder: 11px / 12px / 14px / 18px. -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-8)' }">size ladder · sm 11 · md 12 · lg 14 · xl 18</p>
            <div
                class="grid grid-cols-4 gap-6 rounded-card border border-border bg-card p-6"
            >
                <div class="flex flex-col items-start gap-2">
                    <span class="text-admin-label text-muted-foreground">sm</span>
                    <MetricBadge size="sm" :amount="null" unit="ms" />
                    <MetricBadge size="sm" :amount="128" unit="ms" />
                    <MetricBadge size="sm" :amount="'…'" unit="ms" placeholder="…" />
                </div>
                <div class="flex flex-col items-start gap-2">
                    <span class="text-admin-label text-muted-foreground">md</span>
                    <MetricBadge size="md" :amount="null" unit="ms" />
                    <MetricBadge size="md" :amount="128" unit="ms" />
                    <MetricBadge size="md" :amount="'…'" unit="ms" placeholder="…" />
                </div>
                <div class="flex flex-col items-start gap-2">
                    <span class="text-admin-label text-muted-foreground">lg</span>
                    <MetricBadge size="lg" :amount="null" unit="ms" />
                    <MetricBadge size="lg" :amount="128" unit="ms" />
                    <MetricBadge size="lg" :amount="'…'" unit="ms" placeholder="…" />
                </div>
                <div class="flex flex-col items-start gap-2">
                    <span class="text-admin-label text-muted-foreground">xl</span>
                    <MetricBadge size="xl" :amount="null" unit="ms" />
                    <MetricBadge size="xl" :amount="128" unit="ms" />
                    <MetricBadge size="xl" :amount="'…'" unit="ms" placeholder="…" />
                </div>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Each row: placeholder · value · loading. The xl rung consumes
                text-mono-prose (18px Fira Code) for amount, text-prose
                (18px serif) for unit — the audacious-poster register for hero
                pill placements.
            </p>
        </section>

        <!-- Inline prose composition. -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-8)' }">inline in prose</p>
            <p class="text-prose max-w-2xl text-foreground">
                The layout shipped in
                <MetricBadge :amount="320" unit="kb" color="var(--viz-fourier)" />,
                rendered at
                <MetricBadge :amount="60" unit="fps" color="var(--viz-chebyshev)" />,
                and responded in
                <MetricBadge :amount="'12.4'" unit="ms" color="var(--viz-legendre)" />.
            </p>
        </section>

        <!-- Stat grid: dashboard-style row. -->
        <section class="flex flex-col gap-3">
            <p class="section-label" :style="{ color: 'var(--section-color-8)' }">stat grid</p>
            <div
                class="grid grid-cols-2 gap-6 rounded-card border border-border bg-card p-6 sm:grid-cols-4"
            >
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">p50</span>
                    <MetricBadge :amount="18" unit="ms" />
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">p95</span>
                    <MetricBadge :amount="42" unit="ms" color="var(--viz-fourier)" />
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">errors</span>
                    <MetricBadge :amount="0" unit="/min" />
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">rps</span>
                    <MetricBadge :amount="1_820" unit="req/s" color="var(--viz-chebyshev)" />
                </div>
            </div>
        </section>
    </StoryPage>
</template>
