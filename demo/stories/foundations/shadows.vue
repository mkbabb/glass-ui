<script setup lang="ts">
// BB.W-DEMO-DESIGN — the shadows token tour gains ONE chassis lever: the calm wash
// read-through (StorySection over the StoryHero `wash` card drop) + the PRM-safe
// scroll-cascade rung stagger (W-SCROLL-MOTION `.scroll-cascade`, no GL). The
// shadows-on-stage perception-correction (the dark mid-tone backing so cast shadows
// read in DARK) is PRESERVED — the wash sits UNDER it, not replacing it.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";
import { cn } from "@glass/utils/cn";

const shadows: { cls: string; label: string }[] = [
    { cls: "shadow-xs", label: "xs" },
    { cls: "shadow-sm", label: "sm" },
    { cls: "shadow-md", label: "md" },
    { cls: "shadow-lg", label: "lg" },
    { cls: "shadow-xl", label: "xl" },
    { cls: "shadow-2xl", label: "2xl" },
    { cls: "shadow-cartoon", label: "cartoon" },
    { cls: "shadow-cartoon-hover", label: "cartoon-hover" },
    { cls: "shadow-modal", label: "modal" },
    { cls: "shadow-soft", label: "soft" },
    { cls: "shadow-elevated", label: "elevated" },
];
</script>

<template>
    <StoryPage>
        <!-- Grid of static shadow demos. BA.W-STAGE scope 7 — the elevation grid
             sits on a contrasting "stage" so the cast shadows read in DARK: a
             dark drop-shadow over the W-DARK-MATERIAL near-black page is invisible,
             so the `.shadow-stage` paints a mid-tone backing in dark (transparent in
             light, where the cream page already reads the shadows). The cells pop in
             on the scroll-cascade; the stage perception-correction is PRESERVED. -->
        <StorySection heading="Elevation">
            <div
                class="shadow-stage scroll-cascade grid grid-cols-2 gap-8 rounded-card px-4 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
            >
                <div
                    v-for="s in shadows"
                    :key="s.label"
                    class="flex flex-col items-center gap-3"
                >
                    <div
                        :class="
                            cn(
                                'h-[90px] w-[140px] rounded-card border border-border/60 bg-card',
                                s.cls
                            )
                        "
                    />
                    <span class="text-mono-caption text-muted-foreground">{{
                        s.label
                    }}</span>
                </div>
            </div>
        </StorySection>

        <!-- Interactive cartoon-mechanic: hover to lift. -->
        <StorySection heading="Cartoon lift · hover the card">
            <div class="flex flex-wrap items-center gap-8 px-2 py-8">
                <button
                    type="button"
                    :class="
                        cn(
                            'glass-card focus-ring flex h-32 w-56 flex-col items-start justify-between rounded-card border border-border p-5 text-left',
                            'shadow-cartoon transition-transform duration-fast ease-out',
                            'hover:-translate-x-px hover:-translate-y-px hover:shadow-cartoon-hover'
                        )
                    "
                >
                    <span class="text-admin-label text-muted-foreground">hover me</span>
                    <span class="text-subheading text-foreground">Lifts 1px</span>
                </button>
                <p class="text-small max-w-md text-muted-foreground">
                    The cartoon mechanic — a hard offset shadow plus a 1px translate on
                    hover — gives cards a paper-on-paper personality without any real
                    depth. It's the library's signature surface affordance.
                </p>
            </div>
        </StorySection>
    </StoryPage>
</template>

<style scoped>
/* BA.W-STAGE scope 7 — the dark "stage" tile so cast shadows read in DARK. In
   light the cream page already shows the shadows (transparent stage); in dark a
   neutral mid-tone backing lifts off the near-black page so a dark drop-shadow has
   a surface to cast onto. Token-driven so it tracks the warm-neutral identity. */
.shadow-stage {
    background-color: transparent;
}
/* Plain-ancestor `.dark .x` form — the global-wrapped ancestor form inside a
   scoped block is SILENTLY DROPPED (the recurring trap). */
.dark .shadow-stage {
    background-color: color-mix(in srgb, var(--foreground) 10%, var(--card));
    /* F2.R2 W-DARK-READABILITY-REPAIR (paint re-open, Class-B) — this dark stage is a
       lifted mid-tone plate ([71,61,53] L≈0.28), so the swatch-caption --muted-foreground
       (--neutral-5, calibrated vs the near-black PAGE) collapsed to WCAG 4.12 on it. Re-point
       the muted register on THIS stage to the shared on-glass -strong rung (no new token, no
       fork — the F2.R1 demo-local re-point precedent), which clears the floor here (6.89). */
    --muted-foreground: var(--on-glass-muted-strong);
    --muted-foreground-strong: var(--on-glass-muted-strong);
}
</style>
