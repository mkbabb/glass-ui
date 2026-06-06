import type { Ref } from "vue";
import { createOptionalContext } from "../../../composables/context";

/**
 * Silhouette injection slot used by `<GlyphFace>` to receive a silhouette
 * path from a descendant such as `<DiscoGlyph>`. The descendant writes
 * the path on mount (and on subsequent silhouette changes); the wrapping
 * `<GlyphFace>` reads it as a fallback when no `silhouette` prop resolves
 * — closes the disco-glyph cap-clip path without consumer-side prop plumb.
 *
 * P.W2 Lane C — canonical typed-key + helper-pair DI shape per invariant 25.
 *
 * Naming: `GLYPH_FACE_SILHOUETTE_KEY` (UPPER_SNAKE_CASE) matches every other
 * typed key at HEAD (`DOCK_CONTEXT_KEY`, `DOCK_LAYER_GROUP_KEY`,
 * `TOGGLE_GROUP_KEY`, `CONFIGURATOR_DENSITY_KEY`, `SORTABLE_CONTEXT`). The
 * pre-P.W2 PascalCase variant was a convention outlier;
 * renamed clean per P invariant 5 (no legacy aliases). Only callers live
 * inside glass-ui (GlyphFace.vue + DiscoGlyph.vue + this barrel).
 *
 * Paired helpers (optional-only by intent per Pδ §2.2):
 *  - `provideGlyphFaceSilhouette(slot)` — provider wrapper.
 *  - `useOptionalGlyphFaceSilhouette()` — befitting silent default for
 *    `<DiscoGlyph>`, which stands alone OR cooperates with a wrapping
 *    `<GlyphFace>` when present.
 *
 * NO strict counterpart is shipped — silent absence is the design intent;
 * `<DiscoGlyph>` rendering outside `<GlyphFace>` is a first-class use case,
 * not an error condition.
 */
// Optional-only (AV.W14): silent absence is the design intent — `<DiscoGlyph>`
// rendering outside `<GlyphFace>` is a first-class use case, not an error.
const ctx = createOptionalContext<Ref<string | undefined>>(
    "glass-ui:glyph-face-silhouette",
);

export const GLYPH_FACE_SILHOUETTE_KEY = ctx.KEY;

export function provideGlyphFaceSilhouette(slot: Ref<string | undefined>): void {
    ctx.provide(slot);
}

/**
 * Befitting silent default — returns `null` when no parent `<GlyphFace>`
 * is present. `<DiscoGlyph>` cooperates with a wrapping `<GlyphFace>` when
 * the slot is available; otherwise stands alone.
 */
export const useOptionalGlyphFaceSilhouette = ctx.use;
