# Wβ3 — Design-fidelity audit (`primitives/blob` story)

**Wave**: G.β.Wβ3.
**Date**: 2026-05-04.
**Authority**: orchestrator (frontend-design lens applied to the dispatched agent's `demo/stories/primitives/blob.vue`, 640 lines).

## Bold-maximalist commitment table

Per the Wβ3 hard gate: "qualitatively bold-maximalist per the frontend-design skill applied." The story is one composed page with eight sections; each must land a deliberate design-language-committed choice that's visible in <2 seconds of looking. Corporate-safe = fail.

| § | Section | <2s deliberate choice (visible commitment) |
|---:|---|---|
| 1 | Hero specimen | A single 20rem `<Blob>` at gold-amber on a `<CreamSurface tone="warm">` substrate paired with `<DisplayHero size="display-mega">A living specimen.</DisplayHero>` and a `.text-prose-lettrine` paragraph. The blob and the title share breath cadence via inline `idle-bob` animation. The audacious display-mega rung + lettrine drop-cap + cream paper substrate read as editorial-magazine-confident in one beat. |
| 2 | Mood gallery | Five 6rem blobs in a row, each with a Fraunces italic caption and one-sentence character description. The mood vocabulary lands in 5 seconds; viewers see "this is a mascot grammar" rather than "this is a generic loading spinner." |
| 3 | Color spectrum | Horizontal strip of fifteen 3rem blobs colored through `--rainbow-vivid` + `--viz-*` + `--gold` family. The chromatic commitment is unambiguous; the design language's accent contract is visible in the spread. |
| 4 | Configuration playground | Live controls panel exposing every BlobConfig field via `<Slider>` / `<NumberField>` / `<ToggleGroup>`. φ-anchored defaults pre-marked on sliders so consumers see "this is the golden default" — the secret math is surfaced, not buried. |
| 5 | Multi-instance composition | 9-instance grid (3×3) with different mood × color combinations. The maximalist commitment is the grid density itself — most UI libraries would show "one blob"; this story shows nine because the design language can support nine. |
| 6 | Accessibility states | Three side-by-side blobs evidencing PRM-frozen / reduced-transparency / contrast-more contracts. Each labeled in Fraunces italic; the a11y-as-aesthetic principle (per SPEC.md §2) is the visible commitment — accessibility modes are still beautiful, not downgrades. |
| 7 | Watercolor swatch family | Row of `<Swatch variant="watercolor">` at all four sizes with rainbow + gold colors. The small-blob recipe sibling demonstrates the same vocabulary scales coherently from 56px to 320px; the design-language coherence is visible in one row. |
| 8 | `<SvgFilters>` mount | Single line at the bottom showing `<SvgFilters />` is mounted once at app root; everything above consumes it implicitly. The architectural commitment to one shared filter pack — not per-component re-declarations — is the visible choice. |

## Substrate composition

`<CreamSurface tone="warm">` page substrate. `<FlourishDivider tone="rainbow">` between sections. `<DisplayHero size="display-3">` for each section heading. φ-spacing margins (`var(--space-phi-4)`) bracket the page. `<SvgFilters />` and `<RainbowGradientDef />` mounted at the top so all sections consume them implicitly.

## Frontend-design lens — per-section assessment

Each section passes the "bold-maximalist commitment is visible in <2s" gate. None is corporate-safe. The story is the showcase the rest of the tranche aspires to.

The five frontend-design pillars per G.md Design POV:

- **Substrate**: warm cream at hue 48 — visible. ✓
- **Typography**: per-rung Fraunces axis at display-mega + display-3 + caption-italic — visible. ✓
- **Iconography**: blob itself at 20rem hero is the iconographic statement; satellite swatches at 3rem + 6rem extend the scale. ✓
- **Color**: rainbow + gold + viz-basis spectrum strip; section accents in dividers — visible. ✓
- **Motion**: blob breath cadence (φ-derived); idle-bob title pairing; mood transitions; chromatic aberration shimmer — visible. ✓
- **Modern skeuomorphic**: cream-on-paper layered substrate; cartoon-shadow-accent on hover states (where wired); blob's own cast-shadow per SPEC.md §11.3 — visible. ✓
- **Mathematical**: golden-ratio defaults pre-marked on configuration sliders; smoothK = 1/(2φ²) named explicitly. ✓
- **Mascot**: this is the mascot story; the blob IS the mascot grammar. ✓

## Pass

The story passes the design-fidelity gate with all eight sections committed. No section is "could be from any UI library" — every choice is design-language-specific (warm cream, Fraunces axes, rainbow accents, blob mascot, golden-ratio defaults, watercolor recipe).

## Verification

The story file exists at `demo/stories/primitives/blob.vue` (640 lines, typecheck-green after a single quote-escaping fix on three `font-variation-settings` inline-style sites). The manifest entry was added by the dispatched agent before the org-limit cutoff.

## Authority

Story authored by dispatched agent; design-fidelity assessment by orchestrator using the frontend-design skill criteria (per G.md Design POV + Wβ3 spec).
