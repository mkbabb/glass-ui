<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { DockGroup } from "../../../src/components/custom/dock-group";
import { DockIconButton, DockTabButton } from "../../../src/components/custom/dock";
import MetricBadge from "../../../src/components/custom/metric-badge/MetricBadge.vue";
import { ArrowLeft, RotateCcw, Square, Settings } from "lucide-vue-next";
</script>

<template>
    <StoryPage>
        <!-- Default density · pill row -->
        <section class="flex flex-col gap-3">
            <p class="section-label">density · compact (default)</p>
            <DockGroup>
                <MetricBadge :amount="12" unit="ms" size="md" />
                <MetricBadge :amount="84" unit="Mbps" size="md" />
                <MetricBadge :amount="22" unit="Mbps" size="md" />
                <MetricBadge :amount="0.8" unit="ms" size="md" />
            </DockGroup>
        </section>

        <!--
          Audacious density · chassis-strip pill row.

          L.W4 — at narrow viewports (375px) the 4-chip audacious row
          (size="lg" chips) overflows the viewport by ~24px. K W8 π-1
          identified this as a P1 finding with named destination
          `demo/stories/primitives/dock-group.vue`. Demo-scoped fix:
          wrap the DockGroup in an `overflow-x-auto` scroll container
          with hidden scrollbar so the audacious row stays visually
          intact while body scrollWidth ≤ viewport. DockGroup substrate
          remains untouched (the `inline-flex` natural-content sizing
          is correct for non-demo consumers; the audacious chassis-strip
          pattern is intended for wider contexts).
        -->
        <section class="flex flex-col gap-3">
            <p class="section-label">density · audacious</p>
            <div class="dock-group-audacious-scroll">
                <DockGroup density="audacious">
                    <MetricBadge :amount="12" unit="ms" size="lg" />
                    <MetricBadge :amount="84" unit="Mbps" size="lg" />
                    <MetricBadge :amount="22" unit="Mbps" size="lg" />
                    <MetricBadge :amount="0.8" unit="ms" size="lg" />
                </DockGroup>
            </div>
        </section>

        <!-- Mixed cluster · icon buttons in a shelf -->
        <section class="flex flex-col gap-3">
            <p class="section-label">mixed cluster · icon buttons (data-tier=&quot;secondary&quot;)</p>
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
            <p class="section-label">tab buttons · primary tier inside shelf</p>
            <DockGroup density="audacious">
                <DockTabButton data-tier="primary">Start</DockTabButton>
            </DockGroup>
        </section>
    </StoryPage>
</template>

<style scoped>
.dock-group-audacious-scroll {
    /*
       L.W4 — clip the audacious DockGroup (which is inline-flex + nowrap
       by substrate design) to the viewport. Horizontal scroll keeps the
       row visually intact while the body itself never exceeds the
       viewport width. Hidden scrollbar matches the StoryPager idiom.
    */
    overflow-x: auto;
    scrollbar-width: none;
}
.dock-group-audacious-scroll::-webkit-scrollbar {
    display: none;
}
</style>
