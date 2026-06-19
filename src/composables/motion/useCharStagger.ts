// useCharStagger — the per-glyph split partner the shipped `.char-stagger` CSS
// recipe has been waiting for.
//
// glass-ui ships `.char-stagger > .char { animation-delay: calc(var(--char-index)
// * 30ms) }` (typography/utilities.css) on the per-spring `--spring-smooth`
// clock, but NO way to MINT the `.char` spans + their `--char-index` without
// every hero hand-rolling a `text.split('').map(...)` — which routinely drops
// the accessible label, so AT spells the word out ("F. o. u. r. i. e. r.").
// This composable is the partner: it reads the target's `textContent`, splits it
// per `by`, replaces the content with `.char` spans carrying `--char-index`
// (+ whitespace spacers), writes `--char-total` on the target, and — the load-
// bearing fact — sets `aria-label` to the ORIGINAL full text + `aria-hidden` on
// every glyph span. The word stays ONE accessible name; the glyphs are invisible
// to AT.
//
// Engine-free leaf: it imports `vue` only (no `@mkbabb/keyframes.js`, no
// `@vueuse/core`) — it mints the spans + customs, the shipped `.char-stagger`
// CSS owns the MOTION (the per-spring clock, the PRM carve). The split is
// structural (always present); only the CSS `fade-in` is PRM-gated, so the text
// never vanishes under `reduce`. It ships on the `/motion-core` surface + the
// root barrel (the `vReveal`/`usePointerVelocityField` precedent).

import { getCurrentScope, onScopeDispose, ref, toValue, watch } from "vue";
import type { MaybeRefOrGetter, Ref } from "vue";

/** The per-step delay floor matches the shipped `.char-stagger` recipe — the
 *  glyph spans are mounted via `requestAnimationFrame`-free DOM writes; the CSS
 *  owns the timing. No magic timing lives here. */

export interface UseCharStaggerOptions {
    /**
     * Split unit. `"char"` (default) splits per UTF-16 code-unit-safe scalar;
     * `"word"` splits on whitespace and keeps each word as ONE `.char` unit;
     * `"grapheme"` uses `Intl.Segmenter` so emoji / combining-mark / ZWJ
     * sequences (a 👨‍👩‍👧 family) are ONE glyph, never split into pieces.
     */
    by?: "char" | "word" | "grapheme";
    /**
     * Preserve whitespace as non-animating spacer spans so the word spacing
     * survives the `inline-block` split. Default `true`.
     */
    preserveWhitespace?: boolean;
    /**
     * Write `--char-total` (the glyph count) on the wrapper, for a length-
     * proportional / center-out / reverse stagger. Default `true`.
     */
    writeTotal?: boolean;
}

export interface UseCharStaggerReturn {
    /** Re-run the split (after a `textContent` change). Idempotent — it restores
     *  the original text from the cached label and re-mints, so spans never
     *  accrete across re-splits. */
    split: () => void;
    /** The resolved glyph (`.char` unit) count. */
    count: Ref<number>;
}

/** Split a string into its `by` units. Whitespace runs are returned as their own
 *  units (so the caller can render them as spacers); the unit's `space` flag
 *  marks a pure-whitespace run. */
interface Unit {
    text: string;
    space: boolean;
}

function isWhitespace(s: string): boolean {
    return s.length > 0 && s.trim().length === 0;
}

function splitGraphemes(text: string): string[] {
    // `Intl.Segmenter` is the emoji/ZWJ-safe path (Chromium 87+, Safari 14.1+,
    // Firefox 125+). When absent, fall back to the spread split — code-point
    // safe (never tears a surrogate pair) though not ZWJ-aware.
    const Segmenter = (Intl as { Segmenter?: typeof Intl.Segmenter }).Segmenter;
    if (typeof Segmenter === "function") {
        const seg = new Segmenter(undefined, { granularity: "grapheme" });
        return [...seg.segment(text)].map((s) => s.segment);
    }
    return [...text];
}

function splitInto(text: string, by: "char" | "word" | "grapheme"): Unit[] {
    if (by === "word") {
        // Keep each whitespace run + each word as its own unit (a `split` that
        // captures the delimiter), so the word IS the `.char` unit.
        return text
            .split(/(\s+)/)
            .filter((piece) => piece.length > 0)
            .map((piece) => ({ text: piece, space: isWhitespace(piece) }));
    }
    const pieces = by === "grapheme" ? splitGraphemes(text) : [...text];
    return pieces.map((piece) => ({ text: piece, space: isWhitespace(piece) }));
}

/**
 * Split a target element's text into per-glyph `.char` spans + the
 * `--char-index`/`--char-total` customs the shipped `.char-stagger` CSS reads —
 * accessible by construction (the wrapper keeps the full text as its
 * `aria-label`, every glyph span is `aria-hidden`).
 *
 * @example
 * const el = ref<HTMLElement | null>(null);
 * const { count } = useCharStagger(el, { by: "grapheme" });
 * // <span ref="el" class="char-stagger" aria-label="Fourier" style="--char-total:7">
 * //   <span class="char" style="--char-index:0" aria-hidden>F</span> …
 */
export function useCharStagger(
    target: MaybeRefOrGetter<HTMLElement | null>,
    opts: UseCharStaggerOptions = {},
): UseCharStaggerReturn {
    const count = ref(0);

    function split(): void {
        const el = toValue(target);
        if (!el) return;

        // Read the options at split time so a re-split picks up a changed option
        // (e.g. a `<SplitChars :by>` prop flip) — the `<…>` defaults applied here.
        const by = opts.by ?? "char";
        const preserveWhitespace = opts.preserveWhitespace ?? true;
        const writeTotal = opts.writeTotal ?? true;

        // The full text is the live `textContent` — an already-split element's
        // glyph spans (+ spacers) concatenate BACK to the original word, so a
        // re-split re-mints from the word, idempotently (no accreted spans), AND
        // picks up a consumer's text change. It IS the accessible label source.
        const full = (el.textContent ?? "").trim();

        const units = splitInto(full, by);
        const frag = el.ownerDocument.createDocumentFragment();
        let index = 0;
        for (const unit of units) {
            if (unit.space) {
                if (!preserveWhitespace) continue;
                // A non-animating spacer: it holds the inter-word gap (the
                // inline-block split collapses native whitespace) but is NOT a
                // `.char` so the recipe never staggers it + AT never reaches it.
                const spacer = el.ownerDocument.createElement("span");
                spacer.setAttribute("aria-hidden", "true");
                spacer.textContent = unit.text;
                frag.appendChild(spacer);
                continue;
            }
            const span = el.ownerDocument.createElement("span");
            span.className = "char";
            span.style.setProperty("--char-index", String(index));
            span.setAttribute("aria-hidden", "true");
            span.textContent = unit.text;
            frag.appendChild(span);
            index += 1;
        }

        el.replaceChildren(frag);
        count.value = index;
        if (writeTotal) el.style.setProperty("--char-total", String(index));
        // The load-bearing a11y fact: the word stays ONE accessible name. The
        // glyph spans are `aria-hidden`, so AT hears "Fourier", not the spell-out.
        el.setAttribute("aria-label", full);
    }

    // Split once the target resolves; re-split if the bound element swaps.
    const stop = watch(
        () => toValue(target),
        (el) => {
            if (el) split();
        },
        { immediate: true, flush: "post" },
    );

    if (getCurrentScope()) onScopeDispose(stop);

    return { split, count };
}
