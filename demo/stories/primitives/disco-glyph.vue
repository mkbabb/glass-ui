<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { DiscoGlyph } from "../../../src/components/custom/disco-glyph";

const PLAY = "M8 5.14v13.72a1 1 0 0 0 1.55.83l10.23-6.86a1 1 0 0 0 0-1.66L9.55 4.31A1 1 0 0 0 8 5.14z";
const ROTATE_CCW = "M3 12a9 9 0 1 0 3.51-7.13H3v6h6V8.07A7 7 0 1 1 5 12h-2z";
const ARROW_RIGHT = "M3 10.5h11.4l-3.95-3.95 1.55-1.55L18.5 12l-6.5 7-1.55-1.55 3.95-3.95H3z";
const CHECK = "M9.55 17.5 4.05 12l1.9-1.9 3.6 3.6 8.5-8.5L20 7.1z";

const FAMILY: Array<{ id: string; label: string; d: string }> = [
    { id: "play", label: "Play", d: PLAY },
    { id: "rotate-ccw", label: "RotateCcw", d: ROTATE_CCW },
    { id: "arrow-right", label: "ArrowRight", d: ARROW_RIGHT },
    { id: "check", label: "Check", d: CHECK },
];

const STATES: Array<{
    id: string;
    label: string;
    active: boolean;
    phaseColor?: string;
}> = [
    { id: "idle", label: "idle", active: false },
    { id: "phase", label: "phase-tinted", active: true, phaseColor: "var(--chart-download)" },
    { id: "complete", label: "complete · gold", active: true, phaseColor: "var(--color-gold)" },
];
</script>

<template>
    <StoryPage>
        <!-- Four silhouettes × three states — the audit-D §"7 — follow-up" matrix. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">silhouette × state</p>
            <div class="grid grid-cols-4 gap-6">
                <template v-for="state in STATES" :key="state.id">
                    <div
                        v-for="glyph in FAMILY"
                        :key="`${state.id}-${glyph.id}`"
                        class="flex flex-col items-center gap-2"
                    >
                        <div class="size-12 text-foreground">
                            <DiscoGlyph
                                :silhouette="glyph.d"
                                :active="state.active"
                                :phase-color="state.phaseColor"
                            />
                        </div>
                        <span class="text-mono-caption text-muted-foreground">
                            {{ glyph.label }} · {{ state.label }}
                        </span>
                    </div>
                </template>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                The base silhouette layer paints <code>currentColor</code>; the
                facet gradient (8 stops, ~6 facets) and the 165° catch-light
                cap overlay it. Phase-tinted states drive
                <code>phaseColor</code> through the gradient stops.
            </p>
        </section>

        <!-- facetAxis × silhouette aspect. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">facetAxis · gradient direction adapts to silhouette</p>
            <div class="grid grid-cols-3 gap-6">
                <div class="flex flex-col items-center gap-2">
                    <div class="size-12 text-foreground">
                        <DiscoGlyph :silhouette="PLAY" :active="true" phase-color="var(--chart-download)" facet-axis="diagonal" />
                    </div>
                    <span class="text-mono-caption text-muted-foreground">play · diagonal (default)</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="size-12 text-foreground">
                        <DiscoGlyph :silhouette="CHECK" :active="true" phase-color="var(--chart-download)" facet-axis="vertical" />
                    </div>
                    <span class="text-mono-caption text-muted-foreground">check · vertical</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="size-12 text-foreground">
                        <DiscoGlyph :silhouette="ARROW_RIGHT" :active="true" phase-color="var(--chart-download)" facet-axis="vertical" />
                    </div>
                    <span class="text-mono-caption text-muted-foreground">arrow-right · vertical</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="size-12 text-foreground">
                        <DiscoGlyph :silhouette="ROTATE_CCW" :active="true" phase-color="var(--chart-download)" facet-axis="diagonal" />
                    </div>
                    <span class="text-mono-caption text-muted-foreground">rotate-ccw · diagonal</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="size-12 text-foreground">
                        <DiscoGlyph :silhouette="CHECK" :active="true" phase-color="var(--chart-download)" facet-axis="horizontal" />
                    </div>
                    <span class="text-mono-caption text-muted-foreground">check · horizontal</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <div class="size-12 text-foreground">
                        <DiscoGlyph :silhouette="ARROW_RIGHT" :active="true" phase-color="var(--chart-download)" facet-axis="diagonal" />
                    </div>
                    <span class="text-mono-caption text-muted-foreground">arrow-right · diagonal (worst)</span>
                </div>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                The 8-stop gradient cuts perpendicular to <code>facetAxis</code>.
                Each consumer picks the axis that cuts <i>across</i> its
                dominant stroke direction — CheckDisco's V-shape and
                ArrowRightDisco's horizontal shaft both pick vertical;
                PlayDisco's triangle and RotateCcwDisco's arc stay on the
                diagonal default. The "arrow-right · diagonal (worst)" cell
                shows the read this prop closes.
            </p>
        </section>

        <!-- Multi-glyph SSR-id hygiene check. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">id hygiene · multiple instances</p>
            <div class="flex flex-wrap items-center gap-4">
                <div v-for="glyph in FAMILY" :key="`uniq-${glyph.id}`" class="size-10 text-foreground">
                    <DiscoGlyph :silhouette="glyph.d" active phase-color="var(--chart-upload)" />
                </div>
                <div v-for="glyph in FAMILY" :key="`uniq2-${glyph.id}`" class="size-10 text-foreground">
                    <DiscoGlyph :silhouette="glyph.d" active phase-color="var(--chart-ping)" />
                </div>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Each instance scopes <code>useId()</code>-suffixed gradient
                ids so the eight glyphs above retain distinct facet + cap
                gradients (no cross-instance collision).
            </p>
        </section>
    </StoryPage>
</template>
