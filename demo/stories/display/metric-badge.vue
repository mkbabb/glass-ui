<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { MetricBadge } from "@glass/components/custom/metric-badge";
</script>

<template>
    <StoryPage>
        <!-- Basic amounts + units. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">amount · unit</p>
            <div class="flex flex-wrap items-center gap-6">
                <MetricBadge :value="128" unit="ms" />
                <MetricBadge :value="'42.0'" unit="fps" />
                <MetricBadge :value="1_204" unit="req/s" />
                <MetricBadge :value="'99.95'" unit="%" />
            </div>
        </section>

        <!-- Coloured amount via the `color` prop. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">viz-colored amounts</p>
            <div class="flex flex-wrap items-center gap-6">
                <MetricBadge
                    :value="12"
                    unit="harmonics"
                    color="var(--viz-fourier)"
                />
                <MetricBadge
                    :value="8"
                    unit="nodes"
                    color="var(--viz-chebyshev)"
                />
                <MetricBadge
                    :value="5"
                    unit="degree"
                    color="var(--viz-legendre)"
                />
            </div>
        </section>

        <!-- Empty + custom placeholder. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">empty states</p>
            <div class="flex flex-wrap items-center gap-6">
                <MetricBadge :value="null" unit="ms" />
                <MetricBadge :value="undefined" unit="%" placeholder="n/a" />
                <MetricBadge :value="''" unit="qps" placeholder="…" />
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Empty amounts render the placeholder glyph — default em dash.
            </p>
        </section>

        <!-- Size ladder: 11px / 12px / 14px / 18px. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">size ladder · sm 11 · md 12 · lg 14 · xl 18</p>
            <div
                class="grid grid-cols-4 gap-6 rounded-card border border-border bg-card p-6"
            >
                <div class="flex flex-col items-start gap-2">
                    <span class="text-admin-label text-muted-foreground">sm</span>
                    <MetricBadge size="sm" :value="null" unit="ms" />
                    <MetricBadge size="sm" :value="128" unit="ms" />
                    <MetricBadge size="sm" :value="'…'" unit="ms" placeholder="…" />
                </div>
                <div class="flex flex-col items-start gap-2">
                    <span class="text-admin-label text-muted-foreground">md</span>
                    <MetricBadge size="md" :value="null" unit="ms" />
                    <MetricBadge size="md" :value="128" unit="ms" />
                    <MetricBadge size="md" :value="'…'" unit="ms" placeholder="…" />
                </div>
                <div class="flex flex-col items-start gap-2">
                    <span class="text-admin-label text-muted-foreground">lg</span>
                    <MetricBadge size="lg" :value="null" unit="ms" />
                    <MetricBadge size="lg" :value="128" unit="ms" />
                    <MetricBadge size="lg" :value="'…'" unit="ms" placeholder="…" />
                </div>
                <div class="flex flex-col items-start gap-2">
                    <span class="text-admin-label text-muted-foreground">xl</span>
                    <MetricBadge size="xl" :value="null" unit="ms" />
                    <MetricBadge size="xl" :value="128" unit="ms" />
                    <MetricBadge size="xl" :value="'…'" unit="ms" placeholder="…" />
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
            <p class="section-label">inline in prose</p>
            <p class="text-prose max-w-2xl text-foreground">
                The layout shipped in
                <MetricBadge :value="320" unit="kb" color="var(--viz-fourier)" />,
                rendered at
                <MetricBadge :value="60" unit="fps" color="var(--viz-chebyshev)" />,
                and responded in
                <MetricBadge :value="'12.4'" unit="ms" color="var(--viz-legendre)" />.
            </p>
        </section>

        <!-- Inline-label variant — full label preceding the amount. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">label · inline</p>
            <div class="flex flex-wrap items-center gap-3">
                <MetricBadge
                    label="Latency"
                    labelPosition="inline"
                    :value="36"
                    unit="ms"
                    size="lg"
                    color="var(--viz-fourier)"
                />
                <MetricBadge
                    label="Jitter"
                    labelPosition="inline"
                    :value="1"
                    unit="ms"
                    size="lg"
                    color="var(--viz-chebyshev)"
                />
                <MetricBadge
                    label="Download"
                    labelPosition="inline"
                    :value="730"
                    unit="Mbps"
                    size="lg"
                    color="var(--viz-legendre)"
                />
                <MetricBadge
                    label="Upload"
                    labelPosition="inline"
                    :value="130"
                    unit="Mbps"
                    size="lg"
                />
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Inline label (uppercase, tracked 0.18em, muted at 80%) sits one tier
                below the amount. Reads as a single-row labelled telemetry pill.
            </p>
        </section>

        <!-- Abbreviation mode — the consumer-side viewport collapse. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">abbreviation · narrow viewport</p>
            <div class="flex flex-wrap items-center gap-2">
                <MetricBadge
                    abbreviation="LAT"
                    labelPosition="inline"
                    :value="36"
                    unit="ms"
                    size="sm"
                    color="var(--viz-fourier)"
                />
                <MetricBadge
                    abbreviation="JIT"
                    labelPosition="inline"
                    :value="1"
                    unit="ms"
                    size="sm"
                    color="var(--viz-chebyshev)"
                />
                <MetricBadge
                    abbreviation="DL"
                    labelPosition="inline"
                    :value="730"
                    unit="Mbps"
                    size="sm"
                    color="var(--viz-legendre)"
                />
                <MetricBadge
                    abbreviation="UL"
                    labelPosition="inline"
                    :value="130"
                    unit="Mbps"
                    size="sm"
                />
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Consumer flips between `label` and `abbreviation` props by viewport;
                the library never branches on width. `abbreviation` wins when both
                are passed.
            </p>
        </section>

        <!-- Dual-slot — both label AND abbreviation passed simultaneously.
             The library renders both as sibling spans (`__label--full` +
             `__label--abbr`); the consumer's container-query CSS toggles
             which is visible. Default visibility (without a consumer
             container query) is the full label; the abbreviation sits
             hidden until a `@container … (max-width: …)` rule flips it. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">dual-slot · label + abbreviation siblings (R2-spec)</p>
            <div class="flex flex-wrap items-center gap-3">
                <MetricBadge
                    label="LATENCY"
                    abbreviation="LAT"
                    labelPosition="inline"
                    :value="36"
                    unit="ms"
                    size="lg"
                    color="var(--viz-fourier)"
                />
                <MetricBadge
                    label="JITTER"
                    abbreviation="JIT"
                    labelPosition="inline"
                    :value="1"
                    unit="ms"
                    size="lg"
                    color="var(--viz-chebyshev)"
                />
                <MetricBadge
                    label="DOWNLOAD"
                    abbreviation="DL"
                    labelPosition="inline"
                    :value="730"
                    unit="Mbps"
                    size="lg"
                    color="var(--viz-legendre)"
                />
                <MetricBadge
                    label="UPLOAD"
                    abbreviation="UL"
                    labelPosition="inline"
                    :value="130"
                    unit="Mbps"
                    size="lg"
                />
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Both <code>label</code> and <code>abbreviation</code> render as
                siblings: <code>.metric-badge__label--full</code> +
                <code>.metric-badge__label--abbr</code>. The library default
                hides <code>--abbr</code>; consumers wrap the cluster in a
                <code>container-type: inline-size</code> subject and add
                <code>@container (max-width: 600px) {'{'}
                .metric-badge__label--full {'{'} display: none {'}'}
                .metric-badge__label--abbr {'{'} display: inline {'}'} {'}'}
                </code> to flip visibility off the cluster's own width — no
                viewport coupling, no JS branch.
            </p>
        </section>

        <!-- Stacked-label variant — column orientation for narrow grids. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">label · stacked</p>
            <div class="flex flex-wrap items-start gap-4">
                <MetricBadge
                    label="p50"
                    labelPosition="stacked"
                    :value="18"
                    unit="ms"
                    size="lg"
                />
                <MetricBadge
                    label="p95"
                    labelPosition="stacked"
                    :value="42"
                    unit="ms"
                    size="lg"
                    color="var(--viz-fourier)"
                />
                <MetricBadge
                    label="p99"
                    labelPosition="stacked"
                    :value="71"
                    unit="ms"
                    size="lg"
                    color="var(--viz-chebyshev)"
                />
            </div>
        </section>

        <!-- Stat grid: dashboard-style row. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">stat grid</p>
            <div
                class="grid grid-cols-2 gap-6 rounded-card border border-border bg-card p-6 sm:grid-cols-4"
            >
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">p50</span>
                    <MetricBadge :value="18" unit="ms" />
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">p95</span>
                    <MetricBadge :value="42" unit="ms" color="var(--viz-fourier)" />
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">errors</span>
                    <MetricBadge :value="0" unit="/min" />
                </div>
                <div class="flex flex-col gap-1">
                    <span class="text-admin-label text-muted-foreground">rps</span>
                    <MetricBadge :value="1_820" unit="req/s" color="var(--viz-chebyshev)" />
                </div>
            </div>
        </section>
    </StoryPage>
</template>
