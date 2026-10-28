import { onBeforeUnmount, shallowRef, watch, type ShallowRef } from "vue";

/**
 * THE SHEET WIDTH (U/B7 D-6). Below 30rem an overlay has no width to sit beside
 * what the reader was choosing for, so it covers the page as a sheet. A sheet hides
 * the page, so it wears the surface axis's opaque rung (the solid `--card` plate, no
 * backdrop). The width is a fact of the viewport, read here once for every overlay
 * that has a sheet form; no content component carries a material prop for it.
 *
 * The query is held only while the overlay is open, so a closed overlay keeps no
 * listener; it is read synchronously on open, before the content renders.
 */
export const SHEET_QUERY = "(width < 30rem)";

export function useSheetWidth(open: () => boolean): Readonly<ShallowRef<boolean>> {
    const sheet = shallowRef(false);
    let query: MediaQueryList | null = null;
    const sync = () => {
        sheet.value = query?.matches ?? false;
    };
    const release = () => {
        query?.removeEventListener("change", sync);
        query = null;
    };
    watch(
        open,
        (isOpen) => {
            release();
            if (isOpen && typeof window !== "undefined" && typeof window.matchMedia === "function") {
                query = window.matchMedia(SHEET_QUERY);
                query.addEventListener("change", sync);
            }
            sync();
        },
        { immediate: true, flush: "sync" },
    );
    onBeforeUnmount(release);
    return sheet;
}
