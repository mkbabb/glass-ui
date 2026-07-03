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
import { computed } from "vue";
import { cn } from "@glass/utils/cn";
import { IconChip } from "@glass/components/custom/icon-chip";
import type { IconChipIcon } from "@glass/components/custom/icon-chip";
import { vizPreviewStill } from "./vizPreviewStill";

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

// BG.W-VIZ-PREVIEW-LIVE — the per-STORY distinct preview still. On a /substrates
// viz route the card rasters its OWN recognizable Canvas2D still (keyed off the
// route `to`, module-memoized, ZERO GL contexts — the auroraFallbackGround pattern)
// and renders THAT, superseding the shared category field slot so the 11 cards read
// as 11 DISTINCT previews (per-card pixel-hash differs). A non-viz route resolves
// null → the card falls back to its `#preview` slot (the component-specimen path).
const vizStill = computed(() => vizPreviewStill(props.to));
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

        <!-- The inline LIVE mini-preview — the bounded inert STAGE hosting the
             target's marquee specimen over the warm §3 field (BD.W-BENTO-SPECIMEN).
             `inert` + `aria-hidden` keep it a 0-tab-stop thumbnail; the whole card
             is the ONE link. `container-type: size` lets the specimen scale-to-fit
             its stage at every card width (the ≥45%-occupancy fold). -->
        <div
            v-if="vizStill || $slots.preview"
            class="section-preview-card-preview"
            inert
            aria-hidden="true"
        >
            <!-- BG.W-VIZ-PREVIEW-LIVE — the per-story distinct viz still (a device-free
                 Canvas2D raster served as a `data:` URI, ZERO GL contexts) WINS over
                 the shared category field slot for a known /substrates viz route. -->
            <img
                v-if="vizStill"
                class="section-preview-card-viz-still"
                :src="vizStill"
                alt=""
                draggable="false"
            />
            <slot v-else name="preview" />
        </div>

        <p v-if="blurb" class="text-small text-muted-foreground">{{ blurb }}</p>
    </RouterLink>
</template>

<style scoped>
/* BD.W-BENTO-SPECIMEN — the bento card chassis. The CO-MINT of `--phi: 1.618`
   (the φ proportion token; NO owner on disk — story-page-standard cross-links as
   co-consumer, first-to-land mints). Consumers ALWAYS read `var(--phi, 1.618)`
   so a missing mint never resolves `auto`.

   THE LIQUID HOVER (§2): the prior `translate(-1px,-1px)` was too tight. Golden:
   a real squish lift on the SHIPPED `--spring-smooth`, the SHIPPED warm-INK
   `--shadow-cartoon` cast travels md→lg (NOT a gray box-shadow — the cartoon cast
   on the card per GOLDEN §2), the specimen parallax-LAGS the frame +2px
   (overlapping action). Compositor-only (translate/scale/box-shadow), Safari-native. */
.section-preview-card {
    --phi: 1.618;
    position: relative;
    box-shadow: var(--shadow-cartoon-md);
    translate: 0 0;
    scale: 1;
    transition:
        translate var(--spring-smooth-duration, 0.45s) var(--spring-smooth),
        scale var(--spring-smooth-duration, 0.45s) var(--spring-smooth),
        box-shadow var(--duration-normal) var(--ease-out);
}
.section-preview-card:hover {
    /* the liquid lift + squish (volume-preserving-ish) toward the upper-right key. */
    translate: -2px -3px;
    scale: 1.018;
    box-shadow: var(--shadow-cartoon-lg);
}
.section-preview-card:active {
    /* the press squish — the specimen squishes WITH the card as one body. */
    scale: 0.97;
    transition:
        translate var(--duration-fast) var(--spring-smooth),
        scale var(--duration-fast) var(--spring-smooth);
}
/* the specimen parallax-LAGS the frame on hover (contents lag the chrome). */
.section-preview-card:hover .section-preview-card-preview {
    translate: 0 2px;
}

@media (prefers-reduced-motion: reduce) {
    .section-preview-card,
    .section-preview-card:active {
        transition: none;
    }
    .section-preview-card:hover {
        translate: 0 0;
        scale: 1;
    }
    .section-preview-card:hover .section-preview-card-preview {
        translate: 0 0;
    }
}

.section-preview-card-subpath {
    align-self: flex-start;
    color: var(--muted-foreground);
    font-size: var(--type-caption);
    letter-spacing: -0.01em;
}

/* BD.W-BENTO-SPECIMEN — M1 ABROGATE THE GRAY. The preview window stops being
   `color(srgb 0 0 0 / 0.03)` and becomes a bounded WARM §3 field + a DEFINED
   ASYMMETRIC `--glass-key` edge, framing the live specimen that transmits it.
   The `--card-field-h` is the per-card WARMED hue (CONSUMED from `warmFieldHue`,
   SectionLanding writes it); CSS re-clamps `[25,95]` belt-and-suspenders so an
   inline cool hue cannot paint teal/navy. φ-proportioned (NOT a fixed 7rem void)
   with a φ-ladder `max-block-size` double-bound so the span-2 lead can't run away
   vertically. `container-type: size` lets the specimen scale-to-fit (≥45% occ).
   PLAIN per-mode `.dark` arms (the `light-dark()` inset-shadow trap + the scoped
   `:global()` drop, MEMORY). */
.section-preview-card-preview {
    --field-h: clamp(25, var(--card-field-h, 62), 95);
    pointer-events: none;
    position: relative;
    overflow: clip;
    container-type: size;
    isolation: isolate;
    /* concentric rim — the window radius is the card radius minus the p-5 pad
       (CONSUME BD.W-CONCENTRIC-RADIUS: r_inner = r_outer − pad). */
    border-radius: calc(var(--radius-card) - 0.75rem);
    aspect-ratio: var(--phi, 1.618);
    max-block-size: calc(7rem * var(--phi, 1.618)); /* the φ-ladder double-bound */
    display: grid;
    place-items: center;
    transition: translate var(--spring-smooth-duration, 0.45s) var(--spring-smooth);
    /* the WARM §3 cel floor — amber key-mass (top-left, toward the key-light) +
       terracotta mid (bottom-right) over a warm low-chroma floor (C 0.045 clears
       the field-floor gate). NO gray, NO teal — warm by the field-h clamp. */
    background:
        radial-gradient(
            120% 100% at 18% 0%,
            oklch(0.90 0.075 calc(var(--field-h) + 8) / 0.55),
            oklch(0.90 0.075 calc(var(--field-h) + 8) / 0) 60%
        ),
        radial-gradient(
            120% 120% at 100% 100%,
            oklch(0.86 0.085 calc(var(--field-h) - 6) / 0.42),
            oklch(0.86 0.085 calc(var(--field-h) - 6) / 0) 65%
        ),
        oklch(0.93 0.045 var(--field-h));
    /* THE DEFINED EDGE — §3 ASYMMETRIC lit corner keyed off `--glass-key` (upper-
       right): a bright top-left-to-bottom-right over-glaze whose LIT corner (top,
       toward the key) exceeds the opposite by ΔL. NOT a symmetric flat rim. A
       STATIC inset shadow built off PLAIN per-mode legs (never a light-dark()
       fragment — the inset-shadow trap). */
    box-shadow:
        inset 0 1.5px 0 0 oklch(1 0 0 / 0.5),
        inset 0 0 0 1px oklch(1 0 0 / 0.22),
        inset 0 -8px 14px -8px oklch(0.4 0.06 var(--field-h) / 0.3);
}
/* BG.W-VIZ-PREVIEW-LIVE — the per-story viz still fills the stage edge-to-edge. The
   φ-ratio raster + the φ-ratio stage make `cover` an exact fit; `image-rendering:
   auto` bilinear-smooths the small raster so it reads as a continuous specimen. */
.section-preview-card-viz-still {
    display: block;
    inline-size: 100%;
    block-size: 100%;
    object-fit: cover;
    border-radius: inherit;
    image-rendering: auto;
    user-select: none;
}

.dark .section-preview-card-preview {
    /* warm-EMBER dark floor — lower L, KEEP chroma (C 0.05 ≥ the warm floor),
       L ∈ [0.25,0.6] so it GLOWS amber/terracotta, NEVER charcoal/gray. */
    background:
        radial-gradient(
            120% 100% at 18% 0%,
            oklch(0.46 0.075 calc(var(--field-h) + 8) / 0.55),
            oklch(0.46 0.075 calc(var(--field-h) + 8) / 0) 60%
        ),
        radial-gradient(
            120% 120% at 100% 100%,
            oklch(0.40 0.085 calc(var(--field-h) - 6) / 0.42),
            oklch(0.40 0.085 calc(var(--field-h) - 6) / 0) 65%
        ),
        oklch(0.30 0.05 var(--field-h));
    box-shadow:
        inset 0 1.5px 0 0 oklch(1 0 0 / 0.18),
        inset 0 0 0 1px oklch(1 0 0 / 0.10),
        inset 0 -8px 14px -8px oklch(0 0 0 / 0.32);
}

@media (prefers-reduced-transparency: reduce) {
    /* the field drops to the warm-SOLID floor (STILL warm, never gray) — the
       defined edge survives as the legibility anchor. */
    .section-preview-card-preview {
        background: oklch(0.93 0.05 var(--field-h));
    }
    .dark .section-preview-card-preview {
        background: oklch(0.32 0.05 var(--field-h));
    }
}
</style>
