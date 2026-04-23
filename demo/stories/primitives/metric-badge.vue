<script setup lang="ts">
import { MetricBadge } from "@/components/custom/metric-badge";
</script>

<template>
    <article class="flex flex-col gap-14">
        <header class="flex flex-col gap-3">
            <p class="text-admin-label text-muted-foreground">primitives · metric-badge</p>
            <h1 class="text-title text-foreground">Metric Badge</h1>
            <p class="text-prose max-w-2xl text-muted-foreground">
                Compact number + unit pair for dashboards and inline stats. Mono-micro
                amount with a subdued unit tail; falls back to an em dash when empty.
                Tabular numerals keep columns honest.
            </p>
        </header>

        <!-- Basic amounts + units. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">amount · unit</p>
            <div class="flex flex-wrap items-center gap-6">
                <MetricBadge :amount="128" unit="ms" />
                <MetricBadge :amount="'42.0'" unit="fps" />
                <MetricBadge :amount="1_204" unit="req/s" />
                <MetricBadge :amount="'99.95'" unit="%" />
            </div>
        </section>

        <!-- Coloured amount via the `color` prop. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">viz-colored amounts</p>
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
            <p class="section-label">empty states</p>
            <div class="flex flex-wrap items-center gap-6">
                <MetricBadge :amount="null" unit="ms" />
                <MetricBadge :amount="undefined" unit="%" placeholder="n/a" />
                <MetricBadge :amount="''" unit="qps" placeholder="…" />
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Empty amounts render the placeholder glyph — default em dash.
            </p>
        </section>

        <!-- Inline prose composition. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">inline in prose</p>
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
            <p class="section-label">stat grid</p>
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
    </article>
</template>
