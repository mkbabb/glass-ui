<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { GlyphFace } from "@/components/custom/glyph-face";
import { Play, RotateCcw, ArrowRight, Check, Settings } from "lucide-vue-next";
</script>

<template>
    <StoryPage>
        <!-- Four phase tints, active vs inactive backplate. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">tint × active</p>
            <div class="grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div class="flex flex-col items-center gap-2">
                    <GlyphFace class="size-12 text-foreground">
                        <Play :stroke-width="2.5" class="size-6" />
                    </GlyphFace>
                    <span class="text-mono-caption text-muted-foreground">no tint · idle</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <GlyphFace
                        active
                        tint="var(--chart-ping)"
                        class="size-12 text-foreground"
                    >
                        <Play :stroke-width="2.5" class="size-6" />
                    </GlyphFace>
                    <span class="text-mono-caption text-muted-foreground">ping · active</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <GlyphFace
                        active
                        tint="var(--chart-download)"
                        class="size-12 text-foreground"
                    >
                        <Play :stroke-width="2.5" class="size-6" />
                    </GlyphFace>
                    <span class="text-mono-caption text-muted-foreground">download · active</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <GlyphFace
                        active
                        tint="var(--color-gold)"
                        class="size-12 text-foreground"
                    >
                        <Check :stroke-width="2.5" class="size-6" />
                    </GlyphFace>
                    <span class="text-mono-caption text-muted-foreground">complete · gold</span>
                </div>
            </div>
        </section>

        <!-- Glyph family — same wrapper, different lucide silhouettes. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">glyph family · primary action</p>
            <div class="flex flex-wrap items-center gap-6">
                <GlyphFace
                    active
                    tint="var(--chart-upload)"
                    class="size-12 text-foreground"
                >
                    <Play :stroke-width="2.5" class="size-6" />
                </GlyphFace>
                <GlyphFace
                    active
                    tint="var(--chart-upload)"
                    class="size-12 text-foreground"
                >
                    <RotateCcw :stroke-width="2.5" class="size-6" />
                </GlyphFace>
                <GlyphFace
                    active
                    tint="var(--chart-upload)"
                    class="size-12 text-foreground"
                >
                    <ArrowRight :stroke-width="2.5" class="size-6" />
                </GlyphFace>
                <GlyphFace
                    active
                    tint="var(--chart-upload)"
                    class="size-12 text-foreground"
                >
                    <Check :stroke-width="2.5" class="size-6" />
                </GlyphFace>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                The lucide silhouette stays currentColor — Vignelli-clean. The disco
                punch lives in the surrounding backplate + 165° catch-light cap.
            </p>
        </section>

        <!-- Cog at idle — neutral backplate, the ambient case. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">cog · ambient idle</p>
            <div class="flex flex-wrap items-center gap-6">
                <GlyphFace
                    active
                    tint="color-mix(in srgb, var(--muted-foreground) 18%, transparent)"
                    class="size-12 text-muted-foreground"
                >
                    <Settings :stroke-width="2" class="size-6" />
                </GlyphFace>
                <GlyphFace class="size-12 text-muted-foreground">
                    <Settings :stroke-width="2" class="size-6" />
                </GlyphFace>
            </div>
        </section>

        <!-- Three cap modes — the P.W3 sub-A knob set. -->
        <section class="flex flex-col gap-3">
            <p class="section-label">cap mode · radius vs silhouette</p>
            <div class="flex flex-wrap items-end gap-8">
                <div class="flex flex-col items-center gap-2">
                    <GlyphFace
                        active
                        tint="var(--chart-download)"
                        class="size-12 text-foreground"
                    >
                        <Play :stroke-width="2.5" class="size-6" />
                    </GlyphFace>
                    <span class="text-mono-caption text-muted-foreground">default · 50% circle</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <GlyphFace
                        active
                        tint="var(--chart-download)"
                        class="size-12 text-foreground"
                        :style="{ '--gf-cap-radius': '0.5rem' }"
                    >
                        <Play :stroke-width="2.5" class="size-6" />
                    </GlyphFace>
                    <span class="text-mono-caption text-muted-foreground">rounded-rect · 0.5rem</span>
                </div>
                <div class="flex flex-col items-center gap-2">
                    <GlyphFace
                        active
                        tint="var(--chart-download)"
                        class="size-12 text-foreground"
                        silhouette="M8 5.14v13.72a1 1 0 0 0 1.55.83l10.23-6.86a1 1 0 0 0 0-1.66L9.55 4.31A1 1 0 0 0 8 5.14z"
                    >
                        <Play :stroke-width="2.5" class="size-6" />
                    </GlyphFace>
                    <span class="text-mono-caption text-muted-foreground">silhouette · play path</span>
                </div>
            </div>
            <p class="text-mono-caption text-muted-foreground">
                Default cap is a 50% circle — fixes the visible-square-border
                bug for circular wrappers. Override via <code>--gf-cap-radius</code>
                for rounded-rect caps; pass <code>silhouette</code> for
                path-clipped catch-light over a glyph silhouette.
            </p>
        </section>
    </StoryPage>
</template>
