<script setup lang="ts">
// SectionPreviewCard — the bento card whose HERO is a real, live, per-story tile
// (BI.W-LIVE-TILES). Each redirect card on a section landing (and on the front
// door) is NOT a text-only link: the fenced stage hosts the story's RESOLVED tile
// — a Button variant cluster, a real Card, a mini GlassDock, a frozen viz still, or
// (the terminal floor) the story's identity as a glass typographic specimen — with
// the category IconChip demoted to a small corner identity mark, and the title +
// subpath + blurb reading BELOW the tile (the iOS-27 home-screen truth: the widget
// SHOWS its component, the label sits under it).
//
// THE 0-GL / 0-TAB-STOP FENCE (the 8-item fence, every tile): the stage is `inert`
// + `aria-hidden` + `pointer-events: none` + `container-type` fit (cq-units, over
// transform-scale text blur) + `contain: paint` + `user-select: none`, hosting a
// 0-GL still-or-DOM tile that renders at REST. The whole card is the ONE RouterLink
// (the one accessible name is the title), so Tab never enters a tile. A live-GL
// target's tile is the FROZEN `vizPreviewStill` data-URI raster (an honest single
// paint, never a running context) — the landing mounts ZERO WebGL/WebGPU contexts.
//
// THE CV PARK: the card carries `content-visibility: auto` + `contain: content` +
// an intrinsic-size reserve, so a full ~131-tile landing pays only the visible-tile
// cost (an off-screen tile is skipped, its space held by the reserve).
//
// A demo-private chassis primitive — NOT a library export.
import { computed, defineAsyncComponent } from "vue";
import { cn } from "@glass/components/_shared/class-names";
import { IconChip } from "@glass/components/custom/icon-chip";
import type { IconChipIcon } from "@glass/components/custom/icon-chip";
import type { TileResolution } from "./storyTile";

interface SectionPreviewCardProps {
    /** The target route — the card navigates here on click. */
    to: string;
    /** The card title (the story / category title). */
    title: string;
    /** The one-line blurb under the title. */
    blurb?: string | null;
    /** The explicit Fira-Code subpath chip — the route identity. */
    subpath?: string | null;
    /** The IconChip POP glyph (a lucide functional component) — the corner mark. */
    icon?: IconChipIcon | null;
    /** The `--section-color-N` ramp index for the IconChip POP. */
    section?: number;
    /** A complete token colour for the IconChip POP (XOR `section`). */
    tone?: string;
    /** Lead card — a wider span in the bento grid. */
    lead?: boolean;
    /**
     * The RESOLVED landing tile (BI.W-LIVE-TILES). The parent resolves it via the
     * `resolveStoryTile` ladder and passes it here; the card dispatches on `kind`.
     * Absent → the `#preview` slot is the escape (a pre-rendered vignette).
     */
    tile?: TileResolution | null;
    /** Forwarded class string for the card root. */
    class?: string;
}

const props = defineProps<SectionPreviewCardProps>();

// The AUTHORED rung — a co-located `.tile.vue` loaded lazily (code-split; the
// landing never eager-imports a story's components).
const authoredTile = computed(() =>
    props.tile?.kind === "authored"
        ? defineAsyncComponent(props.tile.loader)
        : null,
);
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
        <!-- The fenced live-tile STAGE hosting the resolved per-story tile as HERO
             over the warm §3 field. `inert` + `aria-hidden` keep it a 0-tab-stop,
             AT-invisible thumbnail; the whole card is the ONE link. The 8-item fence
             (inert · aria-hidden · pointer-events:none · container-type fit · contain
             · 0-GL still · no-select · rest-state) is carried here + in the CSS. -->
        <div class="section-preview-card-preview" inert aria-hidden="true">
            <!-- still — a GL-viz frozen data-URI raster (ZERO GL contexts). -->
            <img
                v-if="tile?.kind === 'still'"
                class="section-preview-card-tile section-preview-card-viz-still"
                :src="tile.src"
                alt=""
                draggable="false"
            />
            <!-- authored — a co-located `.tile.vue` bespoke live vignette. -->
            <component
                :is="authoredTile"
                v-else-if="authoredTile"
                class="section-preview-card-tile"
            />
            <!-- identity — the terminal per-story floor: the story's own identity as a
                 glass typographic specimen (title + subpath chip). -->
            <div
                v-else-if="tile?.kind === 'identity'"
                class="section-preview-card-tile section-preview-card-identity"
            >
                <span class="section-preview-card-identity-title">{{
                    tile.title
                }}</span>
                <code class="fira-code section-preview-card-identity-path">{{
                    tile.subpath
                }}</code>
            </div>
            <!-- the escape — a pre-rendered vignette passed by the parent. -->
            <slot v-else name="preview" />

            <!-- the DEMOTED IconChip — a small corner identity mark (not the lead). -->
            <span v-if="icon" class="section-preview-card-mark">
                <IconChip
                    :icon="icon"
                    :section="section"
                    :tone="tone"
                    :size="26"
                    :glyph-size="14"
                />
            </span>
        </div>

        <!-- The label rung — the title + the Fira-Code subpath, BELOW the tile. -->
        <div class="flex min-w-0 flex-col gap-1">
            <span class="text-subheading text-foreground">{{ title }}</span>
            <code v-if="subpath" class="fira-code section-preview-card-subpath">{{
                subpath
            }}</code>
        </div>

        <p v-if="blurb" class="text-small text-muted-foreground">{{ blurb }}</p>
    </RouterLink>
</template>

<style scoped>
/* BD.W-BENTO-SPECIMEN — the bento card chassis. The CO-MINT of `--phi: 1.618`
   (the φ proportion token; consumers ALWAYS read `var(--phi, 1.618)` so a missing
   mint never resolves `auto`).

   THE LIQUID HOVER (§2): a real squish lift on the SHIPPED `--spring-smooth`, the
   warm-INK `--shadow-cartoon` cast travels md→lg, the specimen parallax-LAGS the
   frame +2px (overlapping action). Compositor-only (translate/scale/box-shadow).

   THE CV PARK (BI.W-LIVE-TILES): `content-visibility: auto` + `contain: content` +
   an intrinsic-size reserve, so a full ~131-tile landing pays only the visible-tile
   cost. The card's own hover box-shadow is a decoration of THIS element (not a
   contained descendant), so `contain: content` never clips the cartoon cast. */
.section-preview-card {
    --phi: 1.618;
    position: relative;
    content-visibility: auto;
    contain: content;
    /* the reserve the CV park holds while a tile is skipped (auto remembers the
       last-rendered size once painted; the seed is a lead-card-ish height). */
    contain-intrinsic-size: auto 340px;
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
    /* the press squish — the tile squishes WITH the card as one body. */
    scale: 0.97;
    transition:
        translate var(--duration-fast) var(--spring-smooth),
        scale var(--duration-fast) var(--spring-smooth);
}
/* the tile parallax-LAGS the frame on hover (contents lag the chrome). */
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

/* ── THE FENCED TILE STAGE ──────────────────────────────────────────────────
   The window is a bounded WARM §3 field + a DEFINED ASYMMETRIC `--glass-key` edge,
   framing the live tile that transmits it. `--card-field-h` is the per-card WARMED
   hue (CONSUMED from `warmFieldHue`, SectionLanding writes it); CSS re-clamps
   `[25,95]` belt-and-suspenders. φ-proportioned with a φ-ladder `max-block-size`
   double-bound. `container-type: size` lets the tile scale-to-fit (cq-units, over
   transform-scale text blur). The fence: `pointer-events: none` · `contain: paint`
   · `user-select: none` (+ the `inert` / `aria-hidden` attrs in template). PLAIN
   per-mode `.dark` arms (the `light-dark()` inset-shadow trap + the scoped
   `:global()` drop, MEMORY). */
.section-preview-card-preview {
    --field-h: clamp(25, var(--card-field-h, 62), 95);
    pointer-events: none;
    user-select: none;
    position: relative;
    overflow: clip;
    container-type: size;
    contain: paint;
    isolation: isolate;
    /* concentric rim — the window radius is the card radius minus the p-5 pad
       (CONSUME BD.W-CONCENTRIC-RADIUS: r_inner = r_outer − pad). */
    border-radius: calc(var(--radius-card) - 0.75rem);
    aspect-ratio: var(--phi, 1.618);
    max-block-size: calc(7rem * var(--phi, 1.618)); /* the φ-ladder double-bound */
    display: grid;
    place-items: center;
    transition: translate var(--spring-smooth-duration, 0.45s) var(--spring-smooth);
    /* the WARM §3 cel floor — amber key-mass (top-left) + terracotta mid
       (bottom-right) over a warm low-chroma floor. NO gray, NO teal. */
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
       right). A STATIC inset shadow built off PLAIN per-mode legs (never a
       light-dark() fragment — the inset-shadow trap). */
    box-shadow:
        inset 0 1.5px 0 0 oklch(1 0 0 / 0.5),
        inset 0 0 0 1px oklch(1 0 0 / 0.22),
        inset 0 -8px 14px -8px oklch(0.4 0.06 var(--field-h) / 0.3);
}

/* every resolved tile fills the stage edge-to-edge — a real component preview,
   never a floating 5%-occupancy glyph. */
.section-preview-card-tile {
    inline-size: 100%;
    block-size: 100%;
    border-radius: inherit;
}

/* still — the φ-ratio raster over the φ-ratio stage makes `cover` an exact fit;
   `image-rendering: auto` bilinear-smooths the small raster into a continuous
   specimen. */
.section-preview-card-viz-still {
    display: block;
    object-fit: cover;
    image-rendering: auto;
}

/* authored — the live DOM tile is centered + fit inside the stage. The tile's own
   components render at their native size, scaled down by the container; a landing
   tile is static (no reveal/rAF at rest). */
.section-preview-card-tile :deep(*) {
    animation: none !important;
}

/* identity — the terminal per-story floor: the story's own title as a glass
   typographic specimen + its subpath chip. Per-STORY distinct (the title differs),
   0-GL, never the repeated compass glyph. */
.section-preview-card-identity {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-end;
    gap: 0.4rem;
    padding: clamp(0.75rem, 10cqmin, 1.4rem);
}
.section-preview-card-identity-title {
    font-size: clamp(1rem, 13cqmin, 1.6rem);
    font-weight: 600;
    line-height: 1.05;
    letter-spacing: -0.02em;
    color: var(--foreground);
    text-wrap: balance;
}
.section-preview-card-identity-path {
    font-size: clamp(0.6rem, 5cqmin, 0.78rem);
    color: var(--muted-foreground);
    letter-spacing: -0.01em;
}

/* the DEMOTED IconChip — a small corner identity mark (top-right, over the tile).
   No longer the lead; a quiet WHERE-am-I badge. */
.section-preview-card-mark {
    position: absolute;
    inset-block-start: 0.5rem;
    inset-inline-end: 0.5rem;
    z-index: 2;
    display: block;
    pointer-events: none;
}

.dark .section-preview-card-preview {
    /* warm-EMBER dark floor — lower L, KEEP chroma (C 0.05 ≥ the warm floor). */
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
    /* the field drops to the warm-SOLID floor (STILL warm, never gray). */
    .section-preview-card-preview {
        background: oklch(0.93 0.05 var(--field-h));
    }
    .dark .section-preview-card-preview {
        background: oklch(0.32 0.05 var(--field-h));
    }
}
</style>
