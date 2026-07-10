<script setup lang="ts">
import { ref } from "vue";
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { AnimatedDigit } from "@glass/components/custom/animated-digit";
import { Button } from "@glass/components/ui/button";

// AnimatedDigit is a single-figure smoothed reel over useAnimatedNumber — it
// tweens its displayed value toward the bound `value` so a metric never snaps.
const downloadMbps = ref<number | null>(248.6);
const latencyMs = ref<number | null>(14);

function resample(): void {
    downloadMbps.value = Math.round((40 + Math.random() * 900) * 10) / 10;
    latencyMs.value = Math.round(4 + Math.random() * 60);
}
</script>

<template>
    <StoryPage>
        <StorySection
            label="value tween"
            blurb="A null/undefined value paints the placeholder; a numeric value tweens toward it on the useAnimatedNumber spring."
        >
            <!-- BA.W-SUFFUSE2 — the motion band's ONE coherent violet event
                 (--motion-accent, the demo-local --viz-legendre twin): a leading
                 accent bar above each tweening figure. The value+unit stay ink. -->
            <div class="flex flex-wrap items-end gap-10">
                <div class="flex flex-col items-start gap-1">
                    <span class="h-1 w-8 rounded-pill bg-[var(--motion-accent)]" />
                    <span class="text-admin-label text-muted-foreground">download · Mbps</span>
                    <AnimatedDigit
                        :value="downloadMbps"
                        :format="(v) => v.toFixed(1)"
                        class="text-display-hero tabular-nums text-foreground"
                    />
                </div>
                <div class="flex flex-col items-start gap-1">
                    <span class="h-1 w-8 rounded-pill bg-[var(--motion-accent)]" />
                    <span class="text-admin-label text-muted-foreground">latency · ms</span>
                    <AnimatedDigit
                        :value="latencyMs"
                        class="text-display-hero tabular-nums text-foreground"
                    />
                </div>
            </div>
            <Button variant="outline" class="w-fit" @click="resample">
                Resample
            </Button>
        </StorySection>

        <StorySection
            label="placeholder"
            blurb="An empty (null) value reads the placeholder glyph until a number lands."
        >
            <AnimatedDigit
                :value="null"
                placeholder="—"
                class="text-display tabular-nums text-muted-foreground"
            />
        </StorySection>
    </StoryPage>
</template>
