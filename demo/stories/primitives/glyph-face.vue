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
    </StoryPage>
</template>
