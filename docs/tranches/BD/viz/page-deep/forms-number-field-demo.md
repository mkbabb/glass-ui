# forms/number-field — Pass-E DEMO audit (single-context, demo lens)

**Page:** `/forms/number-field` · `demo/stories/forms/number-field.vue` (161 lines) · standardized chip `@mkbabb/glass-ui/number-field`
**Manifest row:** `s("forms", "number-field", "Number Field")` (manifest.ts:727) — no options → inherits `CATEGORY_DEFAULT_BG.forms = "grid"` (manifest.ts:184), `variant="page"`, `heroScale="4"`. Subpath chip `@mkbabb/glass-ui/number-field` (manifest.ts:236).
**Live spot-check (1440px viewport):** 0 canvases, 0 docks, 7 `[data-slot=number-field]`, 7 `.input-pill`; `.input-pill` ::before/::after content = `none` (3/6 composite); article width 1152px (≈700px dead horizontal void); both modes captured (`_cap-forms-number-field-{light,dark}.png`).

This page is a near-exact STRUCTURAL TWIN of `forms/inputs`. The forms-band diagnosis from `forms-inputs-SYNTHESIS.md` applies almost verbatim; this doc records the number-field-specific deltas + spot-checks. The two pages should converge on the SAME band waves (`BD.W-CONTROL-LIQUID` src + a forms-band stage wave) — they are not independent redesigns.

---

## 1 · DEMO CONGRUENCE — does the demo show the component at its BEST + exercise the FULL API?

**Partial. The API coverage is genuinely good; the STAGING is flat.**

API coverage is the page's one strength — it deftly walks the reka NumberField surface:
- plain integer counter w/ min/max (`:min="0" :max="99"`, lines 51) — GOOD
- decimal + percent `format-options` (`{ style: 'percent' }`, line 70) — GOOD, the locale-format affordance
- stepped integer (`:step="5"`, line 84) — GOOD
- disabled state (line 97) — GOOD
- the THREE a11y label-binding channels (`<Label for>`→id / `aria-labelledby` / `aria-label`, lines 114-157) — EXCELLENT, this is the genuine teaching value of NumberField (the CLAUDE.md "NumberField label-binding contract" made visible) and is the one thing this page does that inputs.vue does not.

But "at its BEST" fails on every motion/staging axis:
- **ZERO contextual switching.** No dock, no tabs, no state-machine. Seven steppers are simply laid in a static grid. The brief's "leverage the dock APIs (contextual switching/animating)" is wholly absent (0 docks live).
- **ZERO authored animation.** No `.scroll-cascade` per-field landing (the StoryPage chassis cascade is the only motion, and it is subtle). The component itself has no spring-press / specular gleam (see §7). The brief's "HIGH animation affordance for EVERY component" is unmet.
- **The increment/decrement spam is the hero moment and it is un-staged.** NumberField's identity IS the stepper +/- buttons + the value reel; a great demo would show a live-incrementing value with a digit-roll (`<AnimatedDigit>` is a shipped sibling — `src/components/custom/animated-digit/`), or hold-to-repeat acceleration. Currently the value just snaps.
- **No format-options breadth.** Only `percent` is shown. `currency`, `unit` (the `formatOptions` Intl surface) — the richest part of the reka API — go undemoed. A currency stepper ($) and a unit stepper (kg/px) would show the locale-format protagonist.

## 2 · COMPONENT ABILITY — does the page deftly compose a SERIES of glass-ui components?

**No — thin/flat.** The in-article component census is `{NumberField×7, Label, IconChip×1}` + the StoryPage chassis. That is effectively ONE interactive family (NumberField) repeated, plus a header chip. NO Card (the body rides the single chassis StoryHero card), NO Dock, NO Tabs, NO Button, NO procedural-anim, NO live canvas. This is exactly the forms-inputs "page spends almost none of the library's identity" finding. The brief's "each page deftly uses a SERIES of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" bar is failed: 1 family, not a series.

## 3 · GLASS SUFFUSION — glass over a LIVE colorful field?

**No — flat.** Background resolves to `grid` (manifest.ts:184), the near-invisible engineering-paper ruled wash. Live census = 0 canvases. The `.input-pill` glass (`backdrop-filter: blur(8px) saturate(1.05) brightness(1.02)`, surface-tint bg `srgb 0.984 0.972 0.955 / 0.5`) has NOTHING behind it to refract — over the flat grid it reads as a faintly-bordered cream slab, not liquid glass. The morphism does not read. **No aurora, no colorful field.** PAPER morphism: the grid wash is technically paper-register but it is so faint (forms-band grid default) that no paper texture reads either — it is effectively a blank page. The North-Star "glass demos over COLORFUL aurora backgrounds" is unmet.

## 4 · STRUCTURE — own glassy card per sub-section? main card BIG enough?

**No on both.**
- **NOT per-section cards.** All seven steppers + the header live inside the ONE StoryHero chassis card; the sub-sections are bare `<div class="flex flex-col gap-3">` blocks (lines 49, 62, 82, 95, 116, 131, 146) separated by the chassis `.story-sections--delimited` hairline + the grid gap. The user's "each sub-section in its OWN glassy card" is failed — there are zero per-section glass cards; the steppers float directly on the chassis plate.
- **Main area NOT bigger.** Article capped at 1152px (`--story-page-max-inline`) in a 1440px viewport → ~700px dead horizontal void flanking the content, and each stepper is itself narrow within its grid column. The user's "main card area BIGGER (more screen space)" is failed; the field has no protagonist scale (every stepper is identical weight, ~half-column wide).
- The two `<section>` grids (2-col lines 47, 3-col line 114) are reasonable density but read as a spec-sheet, not a designed surface.

## 5 · PATH-LABEL standardization

**PASS (chip) — one minor inconsistency.** The header subpath chip resolves `@mkbabb/glass-ui/number-field` (manifest.ts:236) — correct + standardized, matches the brief. The SFC's own import (line 4-10) is the relative `../../../src/components/ui/number-field` — normal for a demo SFC, not a label. NO in-prose path-label dialect to fix (unlike inputs.vue's `@/components/custom/search` defect). The `<code class="fira-code">` mono fragments in the captions (`<Label for>`, `aria-labelledby`, `aria-label`, lines 126/141/155) are PROP names not import paths — correct as-is.

## 6 · LANGUAGE — superfluous prose to tighten?

A few:
- **The blurb editorializes (lines 41-43):** "Numeric steppers with min/max — the section identity is the ONE color event." The clause after the em-dash is internal design-system meta (the suffuse one-color-event rule) leaking into user-facing copy. Tighten to the component value: "Numeric steppers with min/max, locale formatting, and accessible labels." (Same class as inputs.vue's dead-copy finding.)
- **The SFC header comment (lines 14-16)** is an internal changelog note ("BC.W-SUFFUSE-reconcile — the forms band's ONE coherent --section-color-3 teal…"). Harmless (it is a comment) but matches the inputs.vue "delete the internal-changelog SFC header" hygiene note.
- **The label-binding block comment (lines 108-113)** is GOOD — it is genuine teaching prose explaining the a11y contract; keep it (or move into a visible caption, since it is the page's real teaching value).
- Captions (lines 58/78/91/104) are already terse + value-stating ("Integer · 0..99", "Percent · 0..100%", "Step 5 · 0..100", "Locked") — GOOD, this is the model inputs.vue should follow. No tightening needed.

## 7 · BUGS / defects

No DEAD demo, no broken animation, no console error observed. But the COMPONENT-stratum defect from the band is live here too:
- **`.input-pill` is a 3/6-layer composite (component-stratum, src defect — shared with forms/inputs).** Live: `::before` content `none` + `::after` content `none` → NO inner catch-light core, NO grain, NO edge-rim layer; only backdrop-blur + surface-tint + a flat 1.5px border. Transition is `background-color, border-color, box-shadow, color, opacity` — COLOR-only, no transform/spring/specular. So the stepper well is a flat-bordered slab, not a liquid-glass surface — it cannot read as iOS-grade glass over any aurora. This is `BD.W-CONTROL-LIQUID`'s scope (the NumberField is one of the four named control SFCs that reach the shared `.input-pill` seam — NumberFieldInput.vue:48 composes `input-pill`), NOT a number-field-specific fix.
- **Minor:** the disabled stepper (line 97) shows the +/- buttons still rendered at full chrome with only an opacity drop; reads slightly ambiguous vs a truly locked control, but this is acceptable shadcn-default behaviour, not a bug.

---

## VERDICT (5 lines)

1. **forms/number-field is a structural TWIN of forms/inputs** — same flat-grid wash, same single-chassis-card stack, same 3/6 `.input-pill` composite, no aurora, no dock, no protagonist. It must converge on the SAME forms-band waves, NOT a bespoke redesign: the src arm is `BD.W-CONTROL-LIQUID` (NumberFieldInput.vue:48 already composes `input-pill` — it inherits the rim+core+grain+spring-press+vSpecular arm for free), and the demo arm is a forms-band stage wave (aurora-behind + `surface="veil"` per-section cards + protagonist scale + dock contextual-switch + bigger area).
2. **The page's one genuine strength is API coverage** — the three a11y label-binding channels (`<Label for>`/`aria-labelledby`/`aria-label`, lines 114-157) are the real teaching value and exceed inputs.vue; KEEP this, surface the block-comment contract (lines 108-113) into a visible caption.
3. **The number-field-SPECIFIC demo opportunity (fold into the forms stage wave):** stage the stepper's identity — a live-incrementing protagonist value with `<AnimatedDigit>` digit-roll / hold-to-repeat acceleration, + broaden `formatOptions` past `percent` to a `currency` ($) and `unit` (kg/px) stepper (the richest unshown reka API). This is the contextual-switch protagonist a `DockStack mode="facets"` could swap across {count · percent · currency · unit · disabled}.
4. **Standardize/tighten (low-risk):** path-label chip PASSES (`@mkbabb/glass-ui/number-field` is correct — no fix); tighten the blurb's meta clause (lines 41-43) to a value-statement; the value-captions (lines 58/78/91/104) are already the terse model — no change.
5. **Convergence: NOT close — rides the forms-band loops (2-3).** No independent waves are warranted; number-field folds into `BD.W-CONTROL-LIQUID` (src, gets the composite arm for free via the shared seam) + the forms-band demo stage wave (aurora/veil/protagonist/dock), with a number-field-specific FS clause for the animated-digit protagonist + the currency/unit formatOptions breadth.
