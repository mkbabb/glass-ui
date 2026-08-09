import { onBeforeUnmount, onMounted, watch } from "vue";
import type { DeckCore } from "./useDeck";

/* useDeckHashSync — the deck's position in the URL, opt-in.
   A presentation that cannot be linked to a slide is not shareable, and every app
   that has wanted this has hand-rolled the same three parts: read the fragment at
   mount, WRITE it with `replaceState` (never `pushState` — a deck is one document,
   and forty slides must not become forty back-button steps), and listen for the
   user editing it.

   THE NO-LOOP PROPERTY is the part that is easy to get wrong: the write is skipped
   when the fragment already names the live member, so the `hashchange` the write
   would otherwise raise never arrives, and the listener cannot bounce the index
   back at the writer. */

export interface UseDeckHashSyncOptions {
    /** Member ids, index-aligned. Falls back to the 1-based number. */
    ids?: readonly string[];
    /** Read the fragment at mount and jump to it. Default true. */
    initial?: boolean;
}

function idOf(index: number, ids?: readonly string[]): string {
    return ids?.[index] ?? String(index + 1);
}

export function useDeckHashSync(
    deck: DeckCore,
    options: UseDeckHashSyncOptions = {},
): void {
    const { ids } = options;

    function indexOfHash(): number | null {
        if (typeof window === "undefined") return null;
        const raw = decodeURIComponent(window.location.hash.replace(/^#/, ""));
        if (!raw) return null;
        if (ids) {
            const i = ids.indexOf(raw);
            if (i >= 0) return i;
        }
        const n = Number(raw);
        return Number.isInteger(n) && n >= 1 && n <= deck.total.value ? n - 1 : null;
    }

    function write(index: number): void {
        if (typeof window === "undefined") return;
        const next = `#${encodeURIComponent(idOf(index, ids))}`;
        if (window.location.hash === next) return; // the no-loop property
        window.history.replaceState(null, "", next);
    }

    function onHashChange(): void {
        const i = indexOfHash();
        if (i != null) deck.go(i);
    }

    onMounted(() => {
        if (typeof window === "undefined") return;
        if (options.initial !== false) {
            const i = indexOfHash();
            if (i != null) deck.go(i);
        }
        write(deck.index.value);
        window.addEventListener("hashchange", onHashChange);
    });
    onBeforeUnmount(() => {
        if (typeof window === "undefined") return;
        window.removeEventListener("hashchange", onHashChange);
    });

    watch(() => deck.index.value, write);
}
