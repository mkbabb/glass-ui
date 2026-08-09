import { onBeforeUnmount, onMounted, readonly, ref, type Ref } from "vue";

/* useDeckCapture — the deck's capture/settle contract, which is engine surface and
   not app policy. A deck that can be presented must also be PRINTED, EXPORTED to
   frames, and FROZEN for a screenshot, and each of those is a different bargain:

     · `print`  — the whole sequence stacks as N pages, each re-grounded.
     · `export` — one member per frame at a FORCED frame size, so the emitted image
       is resolution-independent of the machine that made it.
     · `freeze` — everything settles, but the frame is NOT forced: the live viewport
       is the subject, held still.
     · `live`   — the ordinary register.

   ONE READER. The mode is read from the URL exactly once, here, and published; the
   predecessor's every-consumer-parses-the-query shape is how two parts of one page
   end up in two modes.

   THE SETTLE IS THE DETERMINISM CONTRACT. A capture taken mid-animation is a
   different image every run, so `settle()` awaits every registered settler — a
   count-up finishing, a font landing, a viz reaching its first stable frame — then
   two frames of quiet, then stamps `data-deck-settled` on the document element. A
   capture tool waits on that attribute and nothing else. */

export type DeckCaptureMode = "live" | "print" | "export" | "freeze";

const MODES: readonly DeckCaptureMode[] = ["live", "print", "export", "freeze"];

/** The document-element attribute a capture tool waits on. */
export const DECK_SETTLED_ATTR = "data-deck-settled";

/**
 * Read the capture mode from a query string — the ONE reader. Defaults to `live`
 * for an absent or unknown value, so a stray query never silently freezes a deck.
 */
export function deckCaptureMode(search?: string): DeckCaptureMode {
    const raw =
        search ??
        (typeof window !== "undefined" ? window.location.search : "");
    const value = new URLSearchParams(raw).get("capture");
    return (MODES as readonly string[]).includes(value ?? "")
        ? (value as DeckCaptureMode)
        : "live";
}

export interface UseDeckCaptureOptions {
    /** Override the URL-read mode (a story, a test, an SSR host). */
    mode?: DeckCaptureMode;
    /** Settlers to await before the deck declares itself still. */
    settlers?: ReadonlyArray<() => void | Promise<void>>;
}

export interface UseDeckCapture {
    /** The resolved mode. */
    mode: DeckCaptureMode;
    /** True once `settle()` has completed. */
    settled: Readonly<Ref<boolean>>;
    /** Register one more settler (a member's count-up, a viz's first stable frame). */
    onSettle(fn: () => void | Promise<void>): void;
    /** Await every settler + two quiet frames, then stamp the document. */
    settle(): Promise<void>;
}

function frame(): Promise<void> {
    return new Promise((resolve) => {
        if (typeof requestAnimationFrame !== "function") {
            resolve();
            return;
        }
        requestAnimationFrame(() => resolve());
    });
}

export function useDeckCapture(
    options: UseDeckCaptureOptions = {},
): UseDeckCapture {
    const mode = options.mode ?? deckCaptureMode();
    const settled = ref(false);
    const settlers: Array<() => void | Promise<void>> = [
        ...(options.settlers ?? []),
    ];

    function onSettle(fn: () => void | Promise<void>): void {
        settlers.push(fn);
    }

    async function settle(): Promise<void> {
        await Promise.all(settlers.map((fn) => fn()));
        await frame();
        await frame();
        settled.value = true;
        if (typeof document !== "undefined")
            document.documentElement.setAttribute(DECK_SETTLED_ATTR, mode);
    }

    onMounted(() => {
        if (typeof document === "undefined") return;
        document.documentElement.dataset.deckCapture = mode;
        if (mode !== "live") void settle();
    });
    onBeforeUnmount(() => {
        if (typeof document === "undefined") return;
        delete document.documentElement.dataset.deckCapture;
        document.documentElement.removeAttribute(DECK_SETTLED_ATTR);
    });

    return { mode, settled: readonly(settled), onSettle, settle };
}
