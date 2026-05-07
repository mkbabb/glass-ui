<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { MetricPill } from "../../../src/components/ui/metric-pill";
import { GlassDock } from "../../../src/components/custom/dock";
</script>

<template>
    <StoryPage>
        <!-- Default stacked pill at all four sizes. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">size ladder · stacked default</p>
            <div class="flex flex-wrap items-end gap-4">
                <MetricPill
                    label="DOWNLOAD"
                    :amount="730"
                    unit="Mbps"
                    size="sm"
                    color="var(--viz-fourier)"
                />
                <MetricPill
                    label="DOWNLOAD"
                    :amount="730"
                    unit="Mbps"
                    size="md"
                    color="var(--viz-fourier)"
                />
                <MetricPill
                    label="DOWNLOAD"
                    :amount="730"
                    unit="Mbps"
                    size="lg"
                    color="var(--viz-fourier)"
                />
                <MetricPill
                    label="DOWNLOAD"
                    :amount="730"
                    unit="Mbps"
                    size="xl"
                    color="var(--viz-fourier)"
                />
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Defaults bake `labelPosition="stacked"` + `density="spacious"` +
                `size="lg"`. The pill lands at the 2.625rem floor declared by
                `--metric-badge-min-height-stacked`; row 1 carries the label,
                row 2 baseline-aligns amount + unit.
            </p>
        </section>

        <!-- Density toggle. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">density · spacious vs comfortable</p>
            <div class="flex flex-wrap items-end gap-6">
                <div class="flex flex-col gap-2">
                    <span class="text-admin-label text-muted-foreground">spacious (default)</span>
                    <MetricPill
                        label="LATENCY"
                        :amount="36"
                        unit="ms"
                        density="spacious"
                        color="var(--viz-fourier)"
                    />
                </div>
                <div class="flex flex-col gap-2">
                    <span class="text-admin-label text-muted-foreground">comfortable</span>
                    <MetricPill
                        label="LATENCY"
                        :amount="36"
                        unit="ms"
                        density="comfortable"
                        color="var(--viz-fourier)"
                    />
                </div>
            </div>
        </section>

        <!-- Speedtest cluster inside a containerName-host dock. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">cluster · GlassDock containerName host</p>
            <GlassDock
                position="inline"
                density="spacious"
                :always-expanded="true"
                :start-collapsed="false"
                :fit-content="true"
                container-name="metric-pill-cluster-demo"
            >
                <div class="flex flex-wrap items-stretch justify-center gap-2">
                    <MetricPill
                        label="LATENCY"
                        abbreviation="LAT"
                        :amount="36"
                        unit="ms"
                        color="var(--viz-fourier)"
                    />
                    <MetricPill
                        label="JITTER"
                        abbreviation="JIT"
                        :amount="1"
                        unit="ms"
                        color="var(--viz-chebyshev)"
                    />
                    <MetricPill
                        label="DOWNLOAD"
                        abbreviation="DL"
                        :amount="730"
                        unit="Mbps"
                        color="var(--viz-legendre)"
                    />
                    <MetricPill
                        label="UPLOAD"
                        abbreviation="UL"
                        :amount="130"
                        unit="Mbps"
                    />
                </div>
            </GlassDock>
            <p class="text-mono-caption text-muted-foreground">
                The dock primitive carries `containerName="metric-pill-cluster-demo"`,
                so its outer shell emits `container-type: inline-size; container-name:
                metric-pill-cluster-demo; overflow: visible`. Consumers add
                `@container metric-pill-cluster-demo (max-width: 640px) {…}` rules
                to swap full labels for abbreviations off the dock's own width — no
                viewport coupling, no JS branch.
            </p>
        </section>

        <!-- Empty + placeholder. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">empty states</p>
            <div class="flex flex-wrap items-end gap-4">
                <MetricPill label="LATENCY" :amount="null" unit="ms" />
                <MetricPill label="DOWNLOAD" :amount="undefined" unit="Mbps" placeholder="…" />
            </div>
        </section>
    </StoryPage>
</template>
