<script setup lang="ts">
import type { CSSProperties, HTMLAttributes } from "vue";
import { computed, provide, ref } from "vue";
import { cn } from "../../../utils";
import { GlyphFaceSilhouetteKey } from "./keys";

/**
 * <GlyphFace> — phase-tinted lucide wrapper with catch-light cap.
 *
 * Three layers compose around any slotted glyph:
 *   1. backplate — phase-tinted radial gradient (or transparent at idle).
 *      Reads as the icon "sitting in" something.
 *   2. slot — the slotted glyph silhouette, unchanged. Stays `currentColor`
 *      so the glyph reads Vignelli-clean; the disco punch is in the
 *      backplate + cap layers.
 *   3. cap — 165° linear-gradient pseudo with `mix-blend-mode: screen`
 *      (Q.W3 default; consumers may override to `overlay` for the
 *      metallic-punch substrate). Reads as a single specular hot-spot
 *      in the upper-left, painted only against the slotted silhouette.
 *
 * Q.W3.A.1 inversion: cap clips to silhouette by default. Three resolution
 * paths populate `--gf-silhouette`:
 *   - explicit `silhouette` prop on this component (path d-attr or raw
 *     `clip-path` expression);
 *   - provide/inject from a `<DiscoGlyph>` descendant — the disco
 *     primitive publishes its `silhouette` upward via the
 *     `GlyphFaceSilhouetteKey` symbol, so wrappers around the four
 *     speedtest disco icons inherit the silhouette without a
 *     consumer-side prop plumb;
 *   - lucide consumers pass the silhouette explicitly via the
 *     `lucide-silhouettes.ts` table at the speedtest project.
 *
 * When no silhouette resolves the cap renders nothing — the fail-safe
 * is "no cap" not "wrong cap" (closes the wrapper-rectangle leak A1 §1.2
 * traced to the lucide consumer sites).
 *
 * `tint` accepts any CSS color or var (e.g. `var(--phase-color)`); the
 * backplate's `--gf-tint` custom property reads it. Defaults transparent,
 * so `<GlyphFace>` without `active` reads as a plain glyph wrapper.
 */
const props = withDefaults(
    defineProps<{
        /** Whether the backplate is visible. Defaults `false`. */
        active?: boolean;
        /** CSS color/var for the backplate tint. Defaults transparent. */
        tint?: string;
        /**
         * SVG path d-attribute or raw CSS clip-path expression that
         * masks the cap to a glyph silhouette. When set, the cap clips
         * to the supplied shape. Takes precedence over silhouette
         * provided by a descendant DiscoGlyph.
         */
        silhouette?: string;
        class?: HTMLAttributes["class"];
    }>(),
    { active: false },
);

/**
 * The injection key lives in a sibling `keys.ts` so `<script setup>` stays
 * free of ES module `export` (which the SFC compiler rejects). Descendants
 * such as `<DiscoGlyph>` write into this ref; the wrapping GlyphFace reads
 * it as a fallback when no `silhouette` prop resolves. The ref shape keeps
 * the path reactive across SFC re-renders (e.g. PrimaryAction's
 * `glyphFor(state)` swap).
 */
const injectedSilhouette = ref<string | undefined>(undefined);
provide(GlyphFaceSilhouetteKey, injectedSilhouette);

const classes = computed(() => cn("glyph-face", props.class));

const styleVars = computed<CSSProperties>(() => {
    const base: Record<string, string> = {
        "--gf-tint": props.tint ?? "transparent",
    };
    const sil = props.silhouette ?? injectedSilhouette.value;
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
