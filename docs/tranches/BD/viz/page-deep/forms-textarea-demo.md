# Pass-E — forms/textarea META-STORYBOOK DEMO audit

- **Route**: `/forms/textarea` · **SFC**: `demo/stories/forms/textarea.vue` (99 lines) · **Import label**: `@mkbabb/glass-ui/forms`
- **Component**: `Textarea` (`src/components/ui/textarea/Textarea.vue`) — imported in the SFC via deep relative `../../../src/components/ui/textarea` (textarea.vue:5).
- **Live**: http://localhost:5173/forms/textarea (verified — full-page screenshot + DOM probe).
- **Manifest row**: `s("forms", "textarea", "Textarea")` (manifest.ts:719) — no options → inherits `CATEGORY_DEFAULT_BG.forms = "grid"` (manifest.ts:184), `variant="page"`, `heroScale="4"`.
- **Verdict**: thin, flat, single-card spec-sheet — four near-identical textareas stacked in ONE resting card over a near-invisible grid wash. Fails the North-Star bar on nearly every axis, AND demos the FLAGSHIP `autosize` API in copy while leaving it OFF in code.

---

## Live DOM census (in-article, excludes global shell dock)

```
textareas: 4   inputs: 0   buttons: 0   docks: 0   tabs: 0   cards: 1
iconChips: 2   canvases: 0   procAnim: 0   sections: 5   labels: 4
textarea[data-autosize]: 0   field-sizing: fixed (ALL four)
card tier: story-hero-card--page (resting), bg oklab(.934 / .664α), backdrop blur(10px) saturate(1.05)
grid-bg: present, position:fixed (full-bleed), srgb .11/.098/.09 @ .11α — near-invisible cream-on-cream
article width 1152px == card width 1152px ; every textarea max-w-md == 448px (≈39% of card)
```

The page is **four textareas stacked vertically inside ONE resting Card**, separated by `--configurator-divider` hairlines (the auto `.story-sections--delimited` seam — StoryPage.vue:166-175). That is the entire composition. The screenshot reads as a flat gray document with a thin left rail of fields and ~60% dead horizontal space.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**FAIL — thin AND it buries the flagship feature.**

- **The `autosize` (auto-grow) API is the headline of the component — and it is NOWHERE on the page.** `Textarea.vue:27-46` ships `autosize?: boolean` → `field-sizing: content` between a 3-line floor and a `--textarea-autosize-max` (12lh) ceiling. The page's own header blurb (textarea.vue:41) advertises **"Multi-line text entry with auto-grow"** — yet all four fields render `data-autosize` ABSENT and `field-sizing: fixed` (DOM-probed). The single most distinctive, demo-worthy affordance of this component is **advertised in copy and unexercised in code** — a dead claim. A "Resizable" / "Resize off" pair is shown instead (native `resize: vertical` / `none`), which is plain-CSS table-stakes, not the glass-ui differentiator.
- **No `size` rung variety.** `Textarea.vue:13-15` carries the shared `ControlSize` axis (`controlSizeClass`, the `--control-h-*`/`--control-text` cohort). The page shows ONE size (the default) on all four — zero size demo.
- **No `aria-invalid` / `--invalid-ring` state.** The textarea reads `--control-surface-bg`/`--invalid-ring` like every form well (Textarea.vue:53-58 comment), but no error/invalid state is shown — the destructive ring register goes undemoed.
- **No animation affordance.** The only motion is the inherited `.input-pill` `transition: background-color/border-color .2s` (focus ring fade). No liquid-reveal, no focus-spring, no auto-grow GROWTH animation (which would be the natural showpiece — type and watch it grow). The North Star demands "HIGH animation affordance for EVERY component"; this page authors essentially none.
- **No contextual switching / dock APIs.** Zero in-page dock, zero tabs, zero segmented control. The user explicitly asks to "leverage the dock APIs (contextual switching/animating)" — wholly absent.
- **The four demos are near-duplicates.** "With label", "Resizable", "Resize off", "Disabled" — three of the four are the SAME widget toggling one CSS bit (`resize: y|none` / `disabled`). Low information density.

## (2) COMPONENT ABILITY — does it deftly compose a SERIES of glass-ui components?

**FAIL.** In-article glass-ui surface = `{Textarea ×4, Label ×4, IconChip ×2}`. No Button, no Dock, no Tabs, no Card-per-section, no procedural anim, not even a sibling Input for context. It is a flat list, not a composition. A strong textarea demo would, e.g.: seat the size/state variants behind a `<SegmentedTabs>` or `<DockLayerGroup>` (contextual switching); pair a live `<Textarea autosize>` with a character-count `<Progress>` or `MetricBadge`; add a `<Button>` "submit" that fires a `<CompletionSeal>` / validation state; and host the showcase in its own `<Card tier="wash">` over a colorful field. The current page exercises ~2 families.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAIL on the colorful-aurora bar.** Background is the static `grid` wash (`story-hero-bg grid-bg`, `position: fixed`, `repeating-linear-gradient` lines at **11% α** of a near-cream ink — DOM-probed). On the cream page substrate this reads as effectively NO background (see screenshot: flat gray). The card IS translucent (oklab α .664, blur(10px) saturate(1.05)) so the morphism *mechanism* is live, but there is **nothing colorful behind it** for the glass to refract — the six-layer optical composite has no source field. The user's binding ask — "glass demos over COLORFUL aurora backgrounds so the morphism reads" — is not met. The forms-band manifest default `grid` (manifest.ts:184) is the root cause; this page needs an aurora/colored-liquid hero treatment (or at minimum a far stronger colored field). PAPER morphism is nominally present (the grid IS the paper register) but so faint it reads as absent.

## (4) STRUCTURE — each sub-section in its OWN glassy card? main area BIG enough?

**FAIL on both.**
- **One card, not per-section.** All four StorySections live inside the single `story-hero-card--page` (resting Card from StoryHero), separated by hairline dividers (StoryPage.vue `.story-sections--delimited`). The user's explicit ask — "each sub-section in its OWN glassy card" — is the opposite of the divider-stack shown.
- **Main card area too small / content too narrow.** The card is 1152px wide but every field is `max-w-md` (textarea.vue:50,64,78,92) → 448px (~39% of the card). The screenshot shows a wide card with a thin left-aligned column and ~60% dead space to the right — cramped-in-a-corner, not the generous "BIGGER, more screen space" the user asks for. A two-column control+preview layout (or wider fields, or per-section cards in a grid) would fill it.

## (5) PATH-LABEL standardization

**PASS.** The page chip renders `@mkbabb/glass-ui/forms` (manifest.ts:233, screenshot-confirmed) — standardized + correct. No in-body import-path prose to drift (the SFC has no "imported from …" caption). The SFC's own imports are deep relative `../../../src/...` (textarea.vue:5-8) but those are demo-internal, not user-facing labels.

## (6) LANGUAGE — superfluous prose to tighten?

- **textarea.vue:41 (header blurb)**: "Multi-line text entry with **auto-grow** — the section identity is the ONE color event." → (a) "auto-grow" is a **false claim** (no autosize on the page — see B1); (b) "the section identity is the ONE color event" is internal design-system jargon leaking into user-facing copy. Tighten to what the page shows (or, better, MAKE auto-grow true).
- **textarea.vue:48-49**: "The baseline pairing — `Label` above, field below." — restates the obvious markup; trim.
- **textarea.vue:75-76**: "Forced `resize: none` — height stays where you put it." — fine but redundant with the heading "Resize off".
- **textarea.vue:89-90**: "`disabled` drops opacity and blocks interaction." — restates the obvious; trim.
- General: every section blurb is a documentary caption of a CSS bit, not a demo affordance. Lean overall, but several add nothing past the heading + visible widget.

## (7) BUGS / dead demo

- **B1 (dead claim / unused flagship API)**: header blurb advertises "auto-grow" (textarea.vue:41) but **zero** textareas set `:autosize` — all render `field-sizing: fixed` (DOM-probed `data-autosize` count = 0). The component's signature feature is named-but-unexercised. This is both a copy bug AND a demo-congruence miss.
- **B2 (near-duplicate demos)**: "Resizable" / "Resize off" differ only by one `resize:` value — low-value duplication, not a crash but a thin-demo smell.
- No console errors. No broken animation found (there is essentially no animation authored to break).

---

## Recommended transposition (architectural, not patch)

1. **Make auto-grow the HERO demo**: a `<Textarea autosize>` that visibly grows as you type (3-line floor → 12lh ceiling), captured as the page's lead — the one affordance no plain `<textarea>` has. Fix the blurb to be true.
2. **Per-section glassy cards over a LIVE colorful field**: switch the manifest row off the flat `grid` default (give it an aurora or a saturated colored grid), and float each variant group in its own `<Card tier="wash">` so the six-layer morphism reads.
3. **Contextual switching via a dock/tabs**: seat the variants (default · autosize · sizes · invalid · disabled) behind a `<SegmentedTabs>` or `<DockLayerGroup>` with the animated indicator — exercising the contextual-switch API the prompt asks for.
4. **Compose a SERIES**: pair the autosize field with a live char-count (`MetricBadge`/`Progress`), a `<Button>` submit firing a validation state / `<CompletionSeal>`, and the `size` rungs — 4-5 families in one deft scene.
5. **Fill the big card**: widen the fields or go two-column (control + live value/preview) so the generous card area is used, not a thin left rail.
6. **Exercise the full API**: `size` rungs, `aria-invalid` → `--invalid-ring`, and `defaultValue` — currently undemoed.
