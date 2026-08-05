// BK row #31 (W-A11Y) — the A11Y family's `G-COARSE-TARGET` seat, W2-F's half.
//
// WHAT THE ROW IS ACTUALLY OWED, because the citation it arrived with was wrong.
// RU-33 booked the Slider as a WCAG 2.5.5 regression: a 44px `touch-hit-area` halo
// "lost" from the thumb. TR ⊕⁷ (o19 A-7/A-11) overruled it on the sibling
// counter-measurement — value.js measured the operable target at **339.4 × 24** CSS
// px, i.e. the TRACK, not the 12×24 spectrum thumb glyph — and ordered the exoneration
// recorded and "the restore sized honestly". So:
//   · 2.5.5's 44px is OVERRULED and no 44px halo is restored;
//   · the slider is EXONERATED on the rung that was measured;
//   · what remains is the floor SIZED TO THE MEASUREMENT (24), on the rungs the
//     measurement did not cover.
//
// The rungs, derived here from the authored bytes rather than assumed: the standard
// recipe's root height is its track height — sm 0.75rem = 12px, md 1.25rem = 20px,
// lg 1.75rem = 28px — so two of three sit under 24, while the measured rung (spectrum
// md, thumb 1rem × 1.5 = 24px) is exactly the one that already cleared.
//
// This file also holds the reason the mechanism is a root `min-block-size` and not the
// dock family's `::after` hit-slop: the slider root contains a thumb that must keep
// its own pointer capture for the drag, and a pseudo painted after its siblings would
// sit over it.
//
// The floor's own token is DECLARED with the other target floors in
// `src/styles/tokens/sizing.css` — 1.5rem, a distinct rung from the 44px
// `--touch-target`, because 2.5.5 is overruled here and 2.5.8's 24px is what the
// counter-measurement cleared. Held below against the `var()` fallback that reads it.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const SLIDER = "src/components/slider/Slider.vue";
const SIZING = "src/styles/tokens/sizing.css";
const source = readFileSync(SLIDER, "utf8");
/** Live bytes only — a rule quoted inside a cure note is not a shipped rule. */
const live = source.replace(/\/\*[\s\S]*?\*\//g, "");

/** The `--slider-track-height` each `[data-size]` rung declares, in px. */
function rungHeights(): Record<string, number> {
    const out: Record<string, number> = {};
    for (const [, size, value] of live.matchAll(
        /\.glass-slider\[data-size="(\w+)"\]\s*\{[^}]*?--slider-track-height:\s*([\d.]+)rem/g,
    )) {
        out[size] = Number(value) * 16;
    }
    return out;
}

// WCAG 2.5.8 Target Size (Minimum), AA — the floor the counter-measurement cleared,
// and therefore the only floor this row is entitled to size a restore to.
const TARGET_FLOOR_PX = 24;

describe("G-COARSE-TARGET — the Slider's operable target clears the measured floor", () => {
    it("the three authored rungs are the ones the finding is sized against", () => {
        // Stated as a measurement, not a memory: if a rung moves, the sentence above
        // about "two of three under 24" stops being true and this reds.
        expect(rungHeights()).toEqual({ sm: 12, md: 20, lg: 28 });
    });

    it("a coarse-pointer floor exists, and it is scoped to coarse pointers", () => {
        const media = live.match(
            /@media \(pointer: coarse\)\s*\{([\s\S]*?\n\})\s*\n/,
        );
        expect(media, "Slider.vue declares a (pointer: coarse) block").not.toBeNull();
        expect(media![1]).toMatch(/\.glass-slider\s*\{/);
        expect(media![1]).toMatch(/min-block-size:/);
    });

    it("the floor is SELF-LIMITING — max(), so lg is a no-op and nothing shrinks", () => {
        const rule = live.match(
            /@media \(pointer: coarse\)[\s\S]*?\.glass-slider\s*\{([\s\S]*?)\}/,
        );
        expect(rule).not.toBeNull();
        const declaration = rule![1];
        expect(declaration).toMatch(/--slider-target-floor:\s*max\(/);
        // one arm is the rung's own height, the other the floor token
        expect(declaration).toMatch(/var\(--slider-track-height/);
        expect(declaration).toMatch(/var\(--slider-touch-target,\s*1\.5rem\)/);
    });

    it("BOTH axes are floored — the narrow one swaps with the orientation", () => {
        // `[data-orientation="vertical"]` puts the 12/20/28px rung on the INLINE
        // axis (`width: var(--slider-track-height)`) and 12rem on the block axis, so
        // a block-only floor would leave the vertical slider exactly as thin as the
        // finding forbids. Asserted against the vertical rule that creates the swap,
        // so this reds if that geometry ever changes underneath the floor.
        expect(live).toMatch(
            /\.glass-slider\[data-orientation="vertical"\]\s*\{[^}]*width:\s*var\(--slider-track-height/,
        );
        const rule = live.match(
            /@media \(pointer: coarse\)[\s\S]*?\.glass-slider\s*\{([\s\S]*?)\}/,
        )![1];
        expect(rule).toMatch(/min-block-size:\s*var\(--slider-target-floor\)/);
        expect(rule).toMatch(/min-inline-size:\s*var\(--slider-target-floor\)/);
    });

    it("the floor token defaults to the measured 24px, not to the overruled 44px", () => {
        const fallback = live.match(/var\(--slider-touch-target,\s*([\d.]+)rem\)/);
        expect(fallback).not.toBeNull();
        expect(Number(fallback![1]) * 16).toBe(TARGET_FLOOR_PX);
        // The overruled citation must not creep back as a literal.
        expect(live).not.toMatch(/2\.75rem/);
    });

    it("the floor token is DECLARED, and the fallback literal says the same thing", () => {
        // A `var(--x, 1.5rem)` whose `--x` is declared nowhere is a literal wearing a
        // token's name: nothing can retune it and the fallback IS the value. The
        // declaration lives with the other target floors (`--touch-target`,
        // `--dock-touch-target`) rather than on `.glass-slider`, so a consumer can
        // still override it from any ancestor scope. The fallback stays only as long
        // as it agrees with the declaration — a divergent pair is the masking class.
        const declared = readFileSync(SIZING, "utf8").match(
            /--slider-touch-target:\s*([\d.]+)rem/,
        );
        expect(declared, `${SIZING} declares --slider-touch-target`).not.toBeNull();
        expect(Number(declared![1]) * 16).toBe(TARGET_FLOOR_PX);
        const fallback = live.match(/var\(--slider-touch-target,\s*([\d.]+)rem\)/)!;
        expect(Number(fallback[1])).toBe(Number(declared![1]));
    });

    it("every rung clears the floor once the coarse rule applies", () => {
        const fallback = Number(
            live.match(/var\(--slider-touch-target,\s*([\d.]+)rem\)/)![1],
        ) * 16;
        for (const [size, height] of Object.entries(rungHeights())) {
            expect(
                Math.max(height, fallback),
                `${size} rung resolves to ${Math.max(height, fallback)}px`,
            ).toBeGreaterThanOrEqual(TARGET_FLOOR_PX);
        }
    });

    it("no hit-slop pseudo is introduced over the thumb (the mechanism ruling)", () => {
        // The dock's `::after` slop is right for a <button> with nothing inside that
        // owns events; here it would paint over the thumb reka needs to capture. The
        // root paints nothing, so growing it moves no pixel — which is the whole
        // reason this mechanism is allowed to be the simple one.
        const media = live.match(
            /@media \(pointer: coarse\)\s*\{([\s\S]*?\n\})\s*\n/,
        );
        expect(media![1]).not.toMatch(/::after/);
        expect(media![1]).not.toMatch(/position:\s*absolute/);
    });

    it("the invisible standard thumb is still invisible — the target is the TRACK", () => {
        // The premise the whole exoneration rests on. If the thumb ever regains paint,
        // "the operable target is the track" stops being true and the finding must be
        // re-derived rather than inherited.
        const thumb = live.match(/\n\.slider-thumb\s*\{([\s\S]*?)\}/);
        expect(thumb).not.toBeNull();
        expect(thumb![1]).toMatch(/width:\s*0;/);
        expect(thumb![1]).toMatch(/opacity:\s*0;/);
    });
});
