import type { InjectionKey, Ref } from "vue";

/**
 * Silhouette injection slot used by `<GlyphFace>` to receive a silhouette
 * path from a descendant such as `<DiscoGlyph>`. The descendant writes
 * the path on mount (and on subsequent silhouette changes); the wrapping
 * `<GlyphFace>` reads it as a fallback when no `silhouette` prop resolves
 * — closes the disco-glyph cap-clip path without consumer-side prop plumb.
 */
export const GlyphFaceSilhouetteKey: InjectionKey<Ref<string | undefined>> =
    Symbol("GlyphFaceSilhouette");
