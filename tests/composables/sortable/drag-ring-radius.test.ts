import { describe, expect, it } from "vitest";

import { isNonZeroRadius } from "@glass/composables/sortable/useSortable";

/**
 * AS.W7 D9 harden — the drag-ghost gold ring traces the dragged content's
 * VISIBLE corner. `useSortable.createGhost` reads the source's own computed
 * `border-radius`; when it is all-zero it walks descendants depth-first for
 * the first non-zero radius (the PaletteLayer case — unrounded SortableItem
 * root, rounded inner card) and stamps it onto the ghost root inline so the
 * `0 0 0 2px` box-shadow ring is round, not square.
 *
 * `isNonZeroRadius` is the predicate that gates that walk. These lock the
 * adversarial edges surfaced in W7 challenge: zero (square ring correct),
 * asymmetric, elliptical, percent, and non-length tokens.
 */
describe("isNonZeroRadius — drag-ring corner predicate", () => {
    it("treats empty / unset as zero (no radius computed)", () => {
        expect(isNonZeroRadius("")).toBe(false);
    });

    it("treats a single 0px corner as zero (ring stays square)", () => {
        expect(isNonZeroRadius("0px")).toBe(false);
    });

    it("treats an all-zero four-corner shorthand as zero", () => {
        expect(isNonZeroRadius("0px 0px 0px 0px")).toBe(false);
    });

    it("treats an all-zero elliptical shorthand as zero", () => {
        expect(isNonZeroRadius("0px / 0px")).toBe(false);
        expect(isNonZeroRadius("0px 0px 0px 0px / 0px 0px 0px 0px")).toBe(
            false,
        );
    });

    it("detects a uniform non-zero radius", () => {
        expect(isNonZeroRadius("6px")).toBe(true);
        expect(isNonZeroRadius("0.5px")).toBe(true);
    });

    it("detects an asymmetric radius with any non-zero corner", () => {
        // top corners rounded, bottom square (a card-with-flat-bottom)
        expect(isNonZeroRadius("12px 12px 0px 0px")).toBe(true);
        // only one non-leading corner rounded
        expect(isNonZeroRadius("0px 0px 8px 0px")).toBe(true);
    });

    it("detects an elliptical radius (slash-separated h/v)", () => {
        expect(isNonZeroRadius("10px / 20px")).toBe(true);
        expect(
            isNonZeroRadius("10px 20px 30px 40px / 5px 10px 15px 20px"),
        ).toBe(true);
    });

    it("treats a percentage radius as non-zero", () => {
        expect(isNonZeroRadius("50%")).toBe(true);
    });

    it("treats a non-length token (auto/calc) as non-zero so a rounded corner is never missed", () => {
        // NaN parse counts as non-zero by design (the conservative side).
        expect(isNonZeroRadius("auto")).toBe(true);
        expect(isNonZeroRadius("calc(10px)")).toBe(true);
    });
});
