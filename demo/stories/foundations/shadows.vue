<script setup lang="ts">
import StoryPage from "../StoryPage.vue";
import { cn } from "../../../src/utils/cn";

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
             light, where the cream page already reads the shadows). -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">Elevation</p>
            <div
                class="shadow-stage grid grid-cols-2 gap-8 rounded-card px-4 py-8 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6"
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
        </div>

        <!-- Interactive cartoon-mechanic: hover to lift. -->
        <div>
            <p class="text-admin-label mb-4 text-muted-foreground">
                Cartoon lift · hover the card
            </p>
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
                <p class="text-prose max-w-md text-muted-foreground">
                    The cartoon mechanic — a hard offset shadow plus a 1px translate on
                    hover — gives cards a paper-on-paper personality without any real
                    depth. It's the library's signature surface affordance.
                </p>
            </div>
        </div>
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
   scoped block is SILENTLY DROPPED (the recurring trap, proof:no-scoped-global). */
.dark .shadow-stage {
    background-color: color-mix(in srgb, var(--foreground) 10%, var(--card));
}
</style>
