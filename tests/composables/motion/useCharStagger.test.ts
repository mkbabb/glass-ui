// BC.W-SPLIT-CHARS — the per-glyph split partner behaviour-π (headless,
// device-free: the split is a pure DOM mutation, no GPU). Asserts the load-bearing
// a11y fact (the wrapper keeps the word as ONE accessible name; the glyph spans are
// aria-hidden), the `--char-index`/`--char-total` customs the shipped `.char-stagger`
// recipe reads, idempotent re-splitting, the `grapheme` (Intl.Segmenter) emoji-safe
// path, and the `word` split unit.
import { afterEach, beforeEach, describe, expect, it } from "vitest";
import { nextTick, ref } from "vue";
import { useCharStagger } from "@glass/composables/motion/useCharStagger";
import { mountComposable } from "../../utils/mountComposable";

let host: HTMLElement;

beforeEach(() => {
    host = document.createElement("span");
    document.body.appendChild(host);
});
afterEach(() => {
    host.remove();
});

/** The minted `.char` spans (the animated glyph units, excluding the spacers). */
function chars(el: HTMLElement): HTMLElement[] {
    return [...el.querySelectorAll<HTMLElement>("span.char")];
}

describe("useCharStagger", () => {
    it("splits 'Fourier' into 7 .char spans with --char-index 0..6 + the wrapper customs + the accessible label", async () => {
        host.textContent = "Fourier";
        const target = ref(host);
        const { unmount, result } = mountComposable(() => useCharStagger(target));
        await nextTick();

        const glyphs = chars(host);
        expect(glyphs).toHaveLength(7);
        expect(glyphs.map((g) => g.textContent).join("")).toBe("Fourier");
        glyphs.forEach((g, i) => {
            expect(g.style.getPropertyValue("--char-index")).toBe(String(i));
            expect(g.getAttribute("aria-hidden")).toBe("true");
        });
        // The wrapper carries --char-total + the full word as its accessible name.
        expect(host.style.getPropertyValue("--char-total")).toBe("7");
        expect(host.getAttribute("aria-label")).toBe("Fourier");
        expect(result.count.value).toBe(7);

        unmount();
    });

    it("re-splits idempotently after a textContent change (no accreted spans)", async () => {
        host.textContent = "Fourier";
        const target = ref(host);
        const { unmount, result } = mountComposable(() => useCharStagger(target));
        await nextTick();
        expect(chars(host)).toHaveLength(7);

        // The consumer rewrites the host text + re-splits (the <SplitChars> watcher path).
        host.textContent = "Wave";
        result.split();
        await nextTick();

        const glyphs = chars(host);
        expect(glyphs).toHaveLength(4); // not 11 — the prior spans did not accrete
        expect(glyphs.map((g) => g.textContent).join("")).toBe("Wave");
        expect(host.style.getPropertyValue("--char-total")).toBe("4");
        expect(host.getAttribute("aria-label")).toBe("Wave");

        unmount();
    });

    it("by:'grapheme' keeps a ZWJ family emoji as ONE .char (Intl.Segmenter), label is the full string", async () => {
        host.textContent = "a👨‍👩‍👧b";
        const target = ref(host);
        const { unmount } = mountComposable(() =>
            useCharStagger(target, { by: "grapheme" }),
        );
        await nextTick();

        const glyphs = chars(host);
        // 3 units: "a", the family emoji (ONE grapheme — NOT 4), "b".
        expect(glyphs).toHaveLength(3);
        expect(glyphs[0].textContent).toBe("a");
        expect(glyphs[1].textContent).toBe("👨‍👩‍👧");
        expect(glyphs[2].textContent).toBe("b");
        expect(host.getAttribute("aria-label")).toBe("a👨‍👩‍👧b");

        unmount();
    });

    it("by:'word' mints 2 word units + a whitespace spacer (preserveWhitespace)", async () => {
        host.textContent = "Hello World";
        const target = ref(host);
        const { unmount } = mountComposable(() =>
            useCharStagger(target, { by: "word" }),
        );
        await nextTick();

        const glyphs = chars(host);
        expect(glyphs).toHaveLength(2); // each WORD is one .char unit
        expect(glyphs.map((g) => g.textContent)).toEqual(["Hello", "World"]);
        // A non-.char, aria-hidden spacer holds the inter-word gap.
        const spacers = [...host.children].filter((c) => !c.classList.contains("char"));
        expect(spacers).toHaveLength(1);
        expect(spacers[0].textContent).toBe(" ");
        expect(spacers[0].getAttribute("aria-hidden")).toBe("true");
        expect(host.getAttribute("aria-label")).toBe("Hello World");

        unmount();
    });

    it("the accessible NAME is the word, NOT the per-glyph spell-out (the load-bearing a11y fact)", async () => {
        host.textContent = "Fourier";
        const target = ref(host);
        const { unmount } = mountComposable(() => useCharStagger(target));
        await nextTick();

        // AT reads the wrapper's aria-label ("Fourier"), and every glyph span is
        // aria-hidden — so the accessible name is the word, never "F o u r i e r".
        expect(host.getAttribute("aria-label")).toBe("Fourier");
        expect(chars(host).every((g) => g.getAttribute("aria-hidden") === "true")).toBe(
            true,
        );

        unmount();
    });
});
