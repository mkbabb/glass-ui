<script setup lang="ts">
// Surface Tints — the 9-rung tint scale (--surface-tint-{4..25}) + tier
// aliases (--surface-tint-quiet/floating/modal).
//
// BA.W-STAGE scope 7 (FD-FS-1/FD-FS-3) — the token tour reads against a CONTRAST
// reference field. A translucent `--surface-tint-N` (a color-mix(…transparent)
// foreground-over-transparent overlay) painted over a same-tone `bg-card` plate is
// IMPERCEPTIBLE (the prior `border-2 bg-card` swatch demonstrated zero of the visual
// the token names). The swatch now paints the tint as a translucent FILL over a
// checkerboard reference field (`.tint-checker`) so each rung's alpha + warm→cool
// gradation reads against the contrasting field — and a dense grid layout kills the
// one-rung-per-full-width-row dead-space.
import StoryPage from "../../chassis/page/StoryPage.vue";
import StorySection from "../../chassis/section/StorySection.vue";

interface TintRow {
    cls: string;
    label: string;
    hint?: string;
}

const tints: TintRow[] = [
    { cls: "bg-[var(--surface-tint-4)]", label: "--surface-tint-4", hint: "lightest" },
    { cls: "bg-[var(--surface-tint-6)]", label: "--surface-tint-6" },
    { cls: "bg-[var(--surface-tint-8)]", label: "--surface-tint-8" },
    { cls: "bg-[var(--surface-tint-10)]", label: "--surface-tint-10" },
    { cls: "bg-[var(--surface-tint-12)]", label: "--surface-tint-12" },
    { cls: "bg-[var(--surface-tint-15)]", label: "--surface-tint-15" },
    { cls: "bg-[var(--surface-tint-18)]", label: "--surface-tint-18" },
    { cls: "bg-[var(--surface-tint-22)]", label: "--surface-tint-22" },
    { cls: "bg-[var(--surface-tint-25)]", label: "--surface-tint-25", hint: "strongest" },
];

const aliases: TintRow[] = [
    { cls: "bg-[var(--surface-tint-quiet)]", label: "--surface-tint-quiet", hint: "→ tint-6" },
    { cls: "bg-[var(--surface-tint-floating)]", label: "--surface-tint-floating", hint: "→ tint-12" },
    { cls: "bg-[var(--surface-tint-modal)]", label: "--surface-tint-modal", hint: "→ tint-18" },
];
</script>

<template>
    <StoryPage>
        <StorySection
            label="9-rung tint scale"
            blurb="Surface tints are translucent overlays (color-mix over transparent). Each rung reads its alpha + warm-cream → cooler gradation against the checkerboard reference field below — NOT over a same-tone plate where the gradation vanishes. Use the canonical `border-[var(--surface-tint-N)]` recipe for chassis hairlines."
        >
            <div class="tint-grid scroll-cascade">
                <div v-for="row in tints" :key="row.label" class="tint-cell">
                    <div class="tint-checker">
                        <div class="tint-swatch" :class="row.cls" />
                    </div>
                    <code class="fira-code text-mono-caption text-foreground break-all">
                        {{ row.label }}
                    </code>
                    <span v-if="row.hint" class="text-mono-caption text-muted-foreground">
                        {{ row.hint }}
                    </span>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="tier aliases"
            blurb="Semantic tier aliases name the numeric tint rungs. Use these in component-level styles where the rung is implicit (e.g., `<Card tier='quiet'>` paints with --surface-tint-quiet)."
        >
            <div class="tint-grid scroll-cascade">
                <div v-for="row in aliases" :key="row.label" class="tint-cell">
                    <div class="tint-checker">
                        <div class="tint-swatch" :class="row.cls" />
                    </div>
                    <code class="fira-code text-mono-caption text-foreground break-all">
                        {{ row.label }}
                    </code>
                    <span v-if="row.hint" class="text-mono-caption text-muted-foreground">
                        {{ row.hint }}
                    </span>
                </div>
            </div>
        </StorySection>

        <StorySection
            label="dark-mode parity"
            blurb="Each tint rung resolves to a different value in dark mode (cooler, denser). Toggle the theme with the Dark Mode Toggle in the demo header — the swatches above shift with it against the same checker."
        />
    </StoryPage>
</template>

<style scoped>
/* The dense token-tour grid — a multi-column auto-fill that kills the prior
   one-rung-per-full-width-row dead-space (FD-FS-3). */
.tint-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(8rem, 1fr));
    gap: 1rem;
}

.tint-cell {
    display: flex;
    flex-direction: column;
    gap: 0.375rem;
    min-width: 0;
}

/* The translucency-reference field — a checkerboard so a color-mix(…transparent)
   overlay reads its alpha against a contrasting backing (BA.W-STAGE scope 7). The
   checker tone steps with --foreground so it reads in BOTH modes. */
.tint-checker {
    --checker: color-mix(in srgb, var(--foreground) 14%, transparent);
    aspect-ratio: 16 / 9;
    border-radius: var(--radius-md);
    overflow: hidden;
    background-color: var(--card);
    background-image:
        linear-gradient(45deg, var(--checker) 25%, transparent 25%),
        linear-gradient(-45deg, var(--checker) 25%, transparent 25%),
        linear-gradient(45deg, transparent 75%, var(--checker) 75%),
        linear-gradient(-45deg, transparent 75%, var(--checker) 75%);
    background-size: 14px 14px;
    background-position: 0 0, 0 7px, 7px -7px, -7px 0;
    border: 1px solid var(--border);
}

/* The tint painted as a translucent FILL over the checker — the gradation reads. */
.tint-swatch {
    width: 100%;
    height: 100%;
}
</style>
