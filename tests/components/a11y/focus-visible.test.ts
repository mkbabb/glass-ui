// BK row #31 (W-A11Y) — the A11Y family's `G-FOCUS-VISIBLE` seat, plus W2-E.
//
// THE ASSERTION (ECOUTE §3, verbatim): "Every focusable trigger renders a visible
// focus indicator." RED at HEAD, and for a stronger reason than absence:
// `dropdown-menu/styles.css` carried exactly one `.dropdown-menu__trigger` rule and
// it was `outline: none` — the UA ring SUPPRESSED with nothing painted in its place,
// on a component that renders a bare `<button>`. 2.4.7 by commission, not omission,
// so a keyboard user tabbing into a menu saw nothing the browser would otherwise
// have given them. The library's other focus indicators are OPT-IN utilities (`.focus-ring`,
// `.interactive-item`), which is the right shape for a class a consumer composes and
// the wrong shape for an element the library itself renders: nothing was composing
// one, and an indicator nobody opts into is an indicator that is absent.
//
// W2-E rides here because it is the same law read from the other end: an indicator
// that paints when it is NOT owed. `Slider.vue` ringed its track on `:focus-within`,
// which matches pointer focus too, so grabbing the track with a mouse painted the
// keyboard ring — while the spectrum sibling three rules down already used
// `:focus-visible`. One component, two disagreeing definitions of "focused".
//
// Source asserts: a focus RING is a cascade fact (which selector, which register,
// what the forced-colors arm restores), and happy-dom applies no stylesheet, so a
// mounted assert here would prove nothing that the bytes do not already say.

import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const read = (path: string): string => readFileSync(path, "utf8");

/* The menu family's rules moved WHOLE into the layered overlay register at
   BK #89 W-OVERLAY — `components/dropdown-menu/styles.css` was injected by an
   SFC `<style src>` and so entered the cascade UNLAYERED, outranking the rung
   it sat on. The selectors are unchanged; only the origin moved, which is why
   this gate re-points rather than relaxing. */
const MENU_CSS = "src/styles/glass/overlay-plate.css";
const SLIDER = "src/components/slider/styles.css";
const FORCED_COLORS = "src/styles/utilities/a11y-overrides.css";

describe("G-FOCUS-VISIBLE — every library-rendered trigger shows keyboard focus", () => {
    it("DropdownMenuTrigger carries an inherent focus indicator", () => {
        const css = read(MENU_CSS);
        const rule = css.match(
            /\.dropdown-menu__trigger:focus-visible\s*\{([\s\S]*?)\}/,
        );
        expect(rule, `${MENU_CSS} declares .dropdown-menu__trigger:focus-visible`)
            .not.toBeNull();
        // The ONE house focus register, not a second ring minted beside it.
        expect(rule![1]).toMatch(/box-shadow:\s*var\(--focus-ring-shadow\)/);
        // …paired with `outline: none`, since the ring rides `box-shadow` here.
        // (`.focus-ring` itself no longer does — BK #80 inverted the shared utility
        // onto `outline`; retiring THIS component's box-shadow ring is its lane's.)
        expect(rule![1]).toMatch(/outline:\s*none/);
    });

    it("it is :focus-visible, never bare :focus — a pointer-opened menu paints no ring", () => {
        const css = read(MENU_CSS);
        expect(css).not.toMatch(/\.dropdown-menu__trigger:focus\b(?!-visible)/);
    });

    it("the bare-trigger UA-ring suppression does not come back", () => {
        // The HEAD defect, held as an invariant: an unqualified
        // `.dropdown-menu__trigger { outline: none }` suppresses the browser's own
        // ring on EVERY register while this file paints one on only one of them —
        // which is how a component ends up with less focus than a bare <button>.
        // `outline: none` is allowed only where a ring is painted in its place.
        const live = read(MENU_CSS).replace(/\/\*[\s\S]*?\*\//g, "");
        expect(live).not.toMatch(/\.dropdown-menu__trigger\s*\{[^}]*outline:\s*none/);
    });

    it("the component really renders the class the rule selects", () => {
        // A rule that selects a class no template emits is an indicator that is still
        // absent — the failure mode a CSS-only assert would sail past.
        expect(read("src/components/dropdown-menu/DropdownMenuTrigger.vue")).toMatch(
            /dropdown-menu__trigger/,
        );
    });

    it("the glass ring has its forced-colors restore, like every other inherent ring", () => {
        // Forced-colors STRIPS box-shadow. A ring that lives only in a box-shadow and
        // is not in this block is a ring that vanishes for exactly the users who most
        // need it — and this trigger is the first inherent (non-opt-in) ring in the
        // library, so it could not inherit the restore from a utility.
        const block = read(FORCED_COLORS).match(
            /@media \(forced-colors: active\)\s*\{([\s\S]*?)\n    \}/,
        );
        expect(block).not.toBeNull();
        expect(block![1]).toMatch(/\.dropdown-menu__trigger:focus-visible/);
        expect(block![1]).toMatch(/outline:\s*2px solid Highlight/);
    });
});

describe("W2-E — the Slider's two focus registers agree on what focus means", () => {
    it("the standard track ring is visible-focus only (no :focus-within in live bytes)", () => {
        // Comments are BLANKED, not line-filtered: this file's own cure note names
        // `:focus-within` four times to explain why it went, and a detector that
        // cannot tell a selector from the prose about a selector is a detector that
        // reds on its own documentation (and would pass on a rule hidden in a comment
        // the other way round).
        const live = read(SLIDER).replace(/\/\*[\s\S]*?\*\//g, "");
        expect(live).not.toMatch(/:focus-within/);
    });

    it("both track registers — valid and invalid — use the same predicate", () => {
        const source = read(SLIDER);
        expect(source).toMatch(
            /\.glass-slider:not\(\[data-variant="spectrum"\]\):has\(:focus-visible\) \.slider-track/,
        );
        expect(source).toMatch(
            /\.glass-slider\[data-invalid\]:has\(:focus-visible\) \.slider-track/,
        );
    });

    it("the ring is still the ONE house register (no second focus vocabulary)", () => {
        const source = read(SLIDER);
        const rules = [
            ...source.matchAll(/:has\(:focus-visible\) \.slider-track\s*\{([\s\S]*?)\}/g),
        ];
        expect(rules.length).toBe(2);
        for (const [, body] of rules) {
            expect(body).toMatch(/var\(--focus-ring-shadow\)/);
        }
    });
});
