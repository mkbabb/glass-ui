# Pass-E — forms/inputs META-STORYBOOK DEMO audit

- **Route**: `/forms/inputs` · **SFC**: `demo/stories/forms/inputs.vue` (123 lines) · **Import label**: `@mkbabb/glass-ui/forms`
- **Live**: http://localhost:5173/forms/inputs (verified — full-page screenshot + DOM probe)
- **Manifest row**: `s("forms", "inputs", "Inputs")` (manifest.ts:718) — no options → inherits `CATEGORY_DEFAULT_BG.forms = "grid"` (manifest.ts:184), `variant="page"`, `heroScale="4"`.
- **Verdict**: thin, flat, single-card spec-sheet. Misses the binding North-Star bar on nearly every axis.

---

## Live DOM census (in-article, excludes global shell dock)

```
inputs: 6   buttons: 0   docks: 0   tabs: 0   cards: 1
searchBars: 1   iconChips: 2   canvases: 0   procAnim: 0   sections: 7
card tier: story-hero-card--page (resting), bg oklab(.934 / .664), backdrop blur(10px)
grid-bg: present, position:fixed (full-bleed), lines at srgb .11/.11 ≈ 11% α — near-invisible
```

The page is **six near-identical text fields stacked vertically inside ONE resting Card**, separated by `--configurator-divider` hairlines (the auto `.story-sections--delimited` seam). That is the entire composition.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**FAIL — thin.** The page exercises a fraction of the Input/forms surface and zero of the dynamic affordances the North Star demands.

- **No interactive-state showcase.** `Input` carries a rich `.input-pill` four-state contract (focus ring via `--invalid-ring`/`--focus-ring-shadow`, the BB.W-INVALID-RING `aria-invalid`/`user-invalid` register, the `--control-surface-bg` rest tier reading the glass ladder). The page shows ONE static `aria-invalid` field (inputs.vue:71-77) and — critically — **re-spells the destructive ring INLINE** rather than demoing the token register:
  - inputs.vue:76 → `class="border-destructive focus:border-destructive focus:shadow-[0_0_0_2px_color-mix(in_srgb,var(--destructive)_30%,transparent)]"`. This is the EXACT inline respell `--invalid-ring` was minted to kill (CLAUDE.md §BB.W-INVALID-RING). The error demo should bind `aria-invalid` and let the shipped `.input-pill` ring paint — instead it hand-rolls a 2px shadow, demoing the anti-pattern. (It survives `proof:input-invalid-aria` only because that gate scopes the respell bite to `src/`, not demo SFCs.)
- **No `type` variety beyond email.** No password (with reveal), no number, no search-with-clear, no textarea sibling, no sizes. The "password inputs" promised by the section blurb (inputs.vue:38) **does not exist on the page** — dead copy.
- **No animation affordance.** The only motion is the inherited `transition: background-color/border-color .2s` on the pill (DOM-probed). No focus-ring spring, no liquid-reveal, no error shake, no value-commit feedback. The North Star demands "HIGH animation affordance for EVERY component" — this page has effectively none authored.
- **No contextual switching / dock APIs.** Zero in-page dock, zero tabs, zero segmented control to switch between input variants. The user explicitly asks to "leverage the dock APIs (contextual switching/animating)" — wholly absent.

## (2) COMPONENT ABILITY — does it deftly compose a SERIES of glass-ui components?

**FAIL.** In-article glass-ui surface = `{Input ×4, Label ×4, SearchBar ×1, IconChip ×2}`. No Button, no Dock, no Tabs, no Card-per-section, no procedural anim. It is a flat list, not a composition. A strong forms demo would, e.g., seat the variants behind a `<SegmentedTabs>` or a `<DockLayerGroup>` (contextual switching), wrap a live preview in a `<Card>`, and use a `<Button>` to commit/validate — exercising 5-6 families in one deft scene.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAIL on the colorful-aurora bar.** Background is the static `grid` wash (`grid-bg`, position:fixed), lines at ~11% α — near-invisible cream-on-cream (see screenshot: the page reads as flat gray). The card IS translucent (α .664, blur 10px) so the morphism *mechanism* is live, but there is **nothing colorful behind it** for the glass to refract. The user's binding ask — "glass demos over COLORFUL aurora backgrounds so the morphism reads" — is not met. PAPER morphism is nominally present (the grid is the paper register) but so faint it reads as no-background. The forms-band manifest default `grid` (manifest.ts:184) is the root cause; this page needs an aurora/liquid-grid hero treatment or at minimum a far stronger colored field for the glass to read.

## (4) STRUCTURE — each sub-section in its OWN glassy card? main area BIG enough?

**FAIL on both.**
- **One card, not per-section.** All 6 StorySections live inside the single `story-hero-card--page` (`resting` Card from StoryHero.vue:367), separated by hairline dividers. The user's explicit ask — "each sub-section in its OWN glassy card" — is not met; the divider-stack is the opposite idiom.
- **Main card area too small / content too narrow.** Every field is `max-w-sm` (inputs.vue:48,58,69,88,103,113) → ~24rem inputs on a `--story-page-max-inline` (~6xl) article. Result: a wide card with a thin left-aligned column of small inputs and acres of dead space to the right (visible in screenshot). The user asks the "main card area BIGGER (more screen space)" — the content does not fill it; it reads as cramped-in-a-corner, not generous.

## (5) PATH-LABEL standardization

**PASS (mostly).** The page chip renders `@mkbabb/glass-ui/forms` (manifest.ts:232, screenshot-confirmed) — standardized + correct. **One in-body inconsistency**: inputs.vue:101 labels SearchBar's import as `@/components/custom/search` (the dev alias), and inputs.vue:5-8 import everything via deep relative `../../../src/components/...`. The SearchBar actually publishes at `@mkbabb/glass-ui/search`; the in-prose label should be the published subpath, not the dev alias, to match the standardized chip.

## (6) LANGUAGE — superfluous prose to tighten?

- inputs.vue:38-40 blurb: "Text fields, search, and **password inputs** — the field controls stay ink; the section identity is the ONE color event." → mentions password inputs that don't exist (dead claim) AND leaks internal design-system jargon ("the field controls stay ink; the section identity is the ONE color event") into user-facing demo copy. Tighten to what the page shows.
- inputs.vue:66-67: "Error messaging lives below the field and **borrows the `destructive` token**." — "borrows the token" is implementation talk; tighten.
- inputs.vue:85-86: "`disabled` attribute dims opacity and blocks pointer events" — restates the obvious; trim.
- inputs.vue:99-101: "from `@/components/custom/search`, icon baked in" — dev-path + filler; replace with the published subpath.
- General: the section blurbs are documentary captions, not demo affordance. Lean and consistent, but several are superfluous given the visible widget.

## (7) BUGS / dead demo

- **B1 (anti-pattern demo)**: the error field inline-respells the destructive ring (inputs.vue:76) instead of demoing `aria-invalid` + the shipped `--invalid-ring`. Functionally paints, but teaches the forbidden idiom.
- **B2 (dead copy)**: "password inputs" promised in the blurb (inputs.vue:38) — no password field on the page.
- **B3 (stale label)**: SearchBar import labeled `@/components/custom/search` (inputs.vue:101) — dev alias, not the published `@mkbabb/glass-ui/search` subpath.
- No broken animation found (there is essentially no animation to break). No console errors observed.

---

## Recommended transposition (architectural, not patch)

1. **Per-section glassy cards** over a **live colorful aurora** (or liquid-grid) hero — switch the manifest row off the flat `grid` default; let each variant group float in its own `<Card tier="wash">` so the morphism reads.
2. **Contextual switching via a dock/tabs**: seat the input variants (default · labeled · error · disabled · search · pill) behind a `<DockLayerGroup>` or `<SegmentedTabs>` with the animated indicator — exercising the dock/contextual-switch API the page band promises.
3. **Full API**: add password-with-reveal, number, sizes, the live focus-ring spring, and the REAL `aria-invalid` → `--invalid-ring` register (delete the inline respell).
4. **Fill the big card**: a two-column "control + live value/preview" layout so the generous card area is used, not a thin left rail.
5. **Standardize the in-body import label** to `@mkbabb/glass-ui/search` and tighten the blurbs to what the widgets actually show.
