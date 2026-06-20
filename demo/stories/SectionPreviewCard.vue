<script setup lang="ts">
// SectionPreviewCard — the bento card with the inline LIVE mini-preview
// (BC.W-PAGE-CHASSIS — the SECTION-HERO model's affordance).
//
// Each redirect card on a section landing (and on the front door) is NOT a
// text-only link: it composes its <IconChip> POP + title + blurb + the Fira-Code
// subpath chip (the bento) AND a `preview` slot hosting a bounded inert mini-render
// of the target story's marquee specimen — a tiny live <Button> row, a mini glass
// card silhouette, a frozen aurora still. The preview is the user's "a live
// mini-preview within the sub-card, not just a text link" made literal.
//
// THE ONE-GL BUDGET (CLAUDE.md §BA.W-STAGE): the preview is `pointer-events: none`
// + `inert` + `scale`-clamped (a thumbnail) — a live-GL target's preview is a FROZEN
// still or a single-paint, NEVER a second running GL context on the landing (the
// landing mounts ≤1 live context). A no-GL target gets a real bounded inert render.
// PRM → the preview is its static frame (the bounded inert render never animates).
//
// `BC.W-HERO-AUDACIOUS` Part C/E populates the per-category {icon, hue, preview
// content}; this wave delivers the card SHELL + the budget-safe preview seam.
//
// A demo-private chassis primitive — NOT a library export.
import { cn } from "../../src/utils/cn";
import { IconChip } from "../../src/components/custom/icon-chip";
import type { IconChipIcon } from "../../src/components/custom/icon-chip";

interface SectionPreviewCardProps {
    /** The target route — the card navigates here on click. */
    to: string;
    /** The card title (the story / category title). */
    title: string;
    /** The one-line blurb under the title. */
    blurb?: string | null;
    /** The explicit Fira-Code subpath chip — the route identity. */
    subpath?: string | null;
    /** The IconChip POP glyph (a lucide functional component). */
    icon?: IconChipIcon | null;
    /** The `--section-color-N` ramp index for the IconChip POP. */
    section?: number;
    /** A complete token colour for the IconChip POP (XOR `section`). */
    tone?: string;
    /** Lead card — a wider span in the bento grid. */
    lead?: boolean;
    /** Forwarded class string for the card root. */
    class?: string;
}

const props = defineProps<SectionPreviewCardProps>();
</script>

<template>
    <RouterLink
        :to="to"
        :class="
            cn(
                'section-preview-card glass-resting paper-grain-overlay group focus-ring',
                'relative flex flex-col gap-3 rounded-card border border-[var(--glass-border-quiet)] p-5',
                'shadow-[var(--shadow-card)]',
                lead && 'sm:col-span-2',
                props.class,
            )
        "
    >
        <!-- The bento head: the IconChip POP + the title/subpath rung. -->
        <div class="flex items-start gap-3">
            <IconChip
                v-if="icon"
                :icon="icon"
                :section="section"
                :tone="tone"
                reveal
                bloom
                :size="40"
                :glyph-size="20"
            />
            <div class="flex min-w-0 flex-col gap-1">
                <span class="text-subheading text-foreground">{{ title }}</span>
                <code
                    v-if="subpath"
                    class="fira-code section-preview-card-subpath"
                    >{{ subpath }}</code
                >
            </div>
        </div>

        <!-- The inline LIVE mini-preview — the bounded inert mini-render of the
             target's marquee specimen. `pointer-events: none` + `inert` keep it a
             thumbnail (the one-GL budget: a live-GL target's preview is a single-paint
             still). BC.W-HERO-AUDACIOUS Part C/E populates the per-category content;
             a card with no #preview slot falls back to the blurb text. -->
        <div
            v-if="$slots.preview"
            class="section-preview-card-preview"
            inert
            aria-hidden="true"
        >
            <slot name="preview" />
        </div>

        <p v-if="blurb" class="text-small text-muted-foreground">{{ blurb }}</p>
    </RouterLink>
</template>

<style scoped>
/* The hover-lift on --spring-smooth (the .glass-menu-row lift precedent), PRM →
   static. Compositor-only (transform), never a layout property. */
.section-preview-card {
    transition: transform var(--spring-smooth-duration, 0.36s) var(--spring-smooth),
        box-shadow var(--duration-normal) var(--ease-out);
}
.section-preview-card:hover {
    transform: translate(-1px, -1px);
    box-shadow: var(--shadow-card-hover, var(--shadow-cartoon-hover));
}
@media (prefers-reduced-motion: reduce) {
    .section-preview-card {
        transition: none;
    }
    .section-preview-card:hover {
        transform: none;
    }
}

.section-preview-card-subpath {
    align-self: flex-start;
    color: var(--muted-foreground);
    font-size: var(--type-caption);
    letter-spacing: -0.01em;
}

/* The inline preview thumbnail — a bounded, non-interactive mini-render. The
   `pointer-events: none` keeps it inert to the click (the whole card is the link);
   the clip + the height bound keep it a thumbnail (a live-GL target's preview is a
   frozen still, never a second running context — the one-GL budget). */
.section-preview-card-preview {
    pointer-events: none;
    position: relative;
    overflow: clip;
    border-radius: var(--radius-md);
    max-block-size: 7rem;
    background: color-mix(in srgb, var(--foreground) 3%, transparent);
    border: 1px solid color-mix(in srgb, var(--foreground) 6%, transparent);
}
</style>
