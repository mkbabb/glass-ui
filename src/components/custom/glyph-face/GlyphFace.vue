<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from "vue";
import { computed } from "vue";
import { cn } from "../../../utils";

/**
 * <GlyphFace> — phase-tinted lucide wrapper with catch-light cap.
 *
 * Three layers compose around any slotted glyph:
 *   1. backplate — phase-tinted radial gradient (or transparent at idle).
 *      Reads as the icon "sitting in" something.
 *   2. slot — the lucide silhouette, unchanged. Stays `currentColor` so the
 *      glyph stays Vignelli-clean; the disco punch is in the backplate.
 *   3. cap — 165° linear-gradient pseudo with `mix-blend-mode: overlay`.
 *      Reads as a single specular hot-spot in the upper-left; the catch-
 *      light a polished-metal glyph would carry under club lighting.
 *
 * `tint` accepts any CSS color or var (e.g. `var(--phase-color)`); the
 * backplate's `--gf-tint` custom property reads it. Defaults to transparent,
 * so `<GlyphFace>` without `active` reads as a plain glyph wrapper — useful
 * as the default for lucide call-sites that may later opt-in to the punch.
 *
 * `silhouette` accepts an SVG path d-attribute (the cap then consumes
 * `clip-path: path('<d>')`) or a raw CSS clip-path expression. When set,
 * the cap drops `border-radius` and clips to the supplied shape — closes
 * the residual square-leak path for caps over non-circular silhouettes
 * (P.W3 audit-D §"Key upstream ask").
 */
const props = withDefaults(
    defineProps<{
        /** Whether the backplate is visible. Defaults `false`. */
        active?: boolean;
        /** CSS color/var for the backplate tint. Defaults transparent. */
        tint?: string;
        /**
         * SVG path d-attribute or raw CSS clip-path expression that
         * masks the cap to a glyph silhouette. When set, the cap is
         * clipped instead of carrying border-radius.
         */
        silhouette?: string;
        class?: HTMLAttributes["class"];
    }>(),
    { active: false },
);

const classes = computed(() => cn("glyph-face", props.class));

const styleVars = computed<CSSProperties>(() => {
    const base: Record<string, string> = {
        "--gf-tint": props.tint ?? "transparent",
    };
    const sil = props.silhouette;
    if (sil) {
        // Heuristic: an SVG path d-attribute starts with M or m (move-to);
        // a raw CSS clip-path expression typically begins with a function
        // name (`circle(...)`, `polygon(...)`, `inset(...)`, `path(...)`).
        const trimmed = sil.trim();
        const looksLikePathD = /^[Mm][\s.,\d-]/.test(trimmed);
        base["--gf-silhouette"] = looksLikePathD
            ? `path('${trimmed}')`
            : trimmed;
    }
    return base as CSSProperties;
});
</script>

<template>
    <span
        :class="classes"
        :data-active="active ? 'true' : 'false'"
        :style="styleVars"
    >
        <span class="glyph-face-backplate" aria-hidden="true" />
        <slot />
        <span class="glyph-face-cap" aria-hidden="true" />
    </span>
</template>
