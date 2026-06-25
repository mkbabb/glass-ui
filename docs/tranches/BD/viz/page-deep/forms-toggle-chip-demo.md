# Pass-E META-STORYBOOK deep audit — forms/toggle-chip

- **Page**: `demo/stories/forms/toggle-chip.vue`
- **Component**: `ToggleChip` (`src/components/custom/toggle-chip/`)
- **Import path (canonical)**: `@mkbabb/glass-ui/toggle-chip`
- **Live**: http://localhost:5173/forms/toggle-chip (verified on real Chrome, light mode)
- **Manifest row**: `manifest.ts:732` (`s("forms","toggle-chip",…)`); subpath chip `manifest.ts:241`
- **Background**: NONE declared → inherits `forms → "grid"` (`manifest.ts:184`), a static blueprint wash. NO live aurora.

## Verdict snapshot
Thin, flat, and — most damning — the page demos a TONAL-ACCENT component with **NO tone threaded**, so its headline capability (BC.W-ACCENT-TONE) is dead on screen. Two ShowcaseFrames of chips in ONE shared card over a flat gray wash. Far below the BD north star.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?  ❌ FAILS HARD

**CRITICAL BUG — the active state is a GRAY SLAB; the tonal-accent feature is invisible.**
`ToggleChip`'s `chip`/`cell` variants were re-pointed onto the `.accent-tone` register (`index.ts:38,69` — `"accent-tone"` + `data-[state=on]:bg-(--accent-band)`). That register is driven by a per-instance `--tone`. The demo sets **`--tone` nowhere** (the only `:style` on the page is the header border, `toggle-chip.vue:41-45`).

Live readback (active "bone" chip AND active "Triangle" cell):
```
--tone        : (unset)
background    : oklab(0.842839 0.0017708 0.00627632)   ← a≈0.0018 b≈0.0063 → ACHROMATIC GRAY
--accent-band : color-mix(in oklab, …cream…, …warm-ink… 18%)   ← neutral, no hue
```
With `--tone` unset the band falls back to a warm-ink-over-cream mix that resolves to a **near-neutral gray** in light mode — the exact "No gray." defect (MEMORY R10-5 / BA.W-NO-GRAY) the whole system fights. So the page shows the tonal chip at its WORST: the selected token reads as a dead gray pill (chip) / dead gray plate (cell). Screenshot confirms: active "bone" and active "Triangle" are flat gray boxes.

**API under-exercised.** The page shows only `variant=chip` (multi) and `variant=cell` (exclusive). It never demonstrates:
- the `:tone` identity axis (the component's reason to exist post-ACCENT-TONE) — cf. the sibling `selectable-chip.vue:18-24` which threads `tone: "var(--section-color-N)"` per chip and reads as a coherent tonal language.
- hover-lift / press-squish motion (the chip rides `--scale-hover-btn` / `--spring-smooth` per `index.ts:25-26`) — never called out, no motion affordance in the demo framing.
- disabled state, keyboard semantics live, or a dark-mode pairing.

**Note**: `ToggleChip.vue:24-27` only exposes `variant` + `class` props (no `tone` prop), so a tone must be threaded as a `--tone` CSS var on the element/ancestor. The demo does neither — arguably the component should surface `tone` as a first-class prop (mirroring `SelectableChip`), and the demo MUST set it either way.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components?  ❌ THIN/FLAT
Composes only: `StoryPage`, `StorySection`, `ShowcaseFrame`, `IconChip` (header), `ToggleChip`. No docks, no tabs, no buttons, no procedural-anim, no cards-as-cards. Two near-identical chip rows. There is NO use of the dock APIs (contextual switching/morph) the BD brief asks every page to leverage — e.g. a dock that contextually switches the chip/cell register, or a dock-hosted live preview that the chip selection drives.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?  ❌ FLAT
Background inherits `grid` (static blueprint wash, `manifest.ts:184`) — no `<Aurora>`, no live field. Both ShowcaseFrames are `tier="resting"` default (opaque `bg-card`, `ShowcaseFrame.vue:94`), NOT `tier="field"`, so even if a field existed the frames would occlude it. The glass morphism (the six-layer optical composite) does NOT read anywhere on this page — there is nothing translucent over anything colorful. PAPER morphism: a faint grain is present on the outer card but unremarkable; no deliberate paper register.

## (4) STRUCTURE — each sub-section in its OWN glassy card? main area BIG enough?  ❌
Both sub-sections live inside ONE `StoryPage` card, separated by the chassis hairline delimiter (`.story-sections--delimited`, `StoryPage.vue:166-175`). The user's explicit bar — "each sub-section in its OWN glassy card" — is NOT met; they share a card divided by rules. The ShowcaseFrames ARE rounded cards, but they're inner specimen frames on an opaque cream plate, not glassy sub-section cards over a field. Main card area: bounded by `--story-page-max-inline`; on a wide viewport there's generous empty margin, the content does not claim "more screen space" — the chip rows are short and the card feels under-filled (large dead band to the right of the cell grid, see screenshot).

## (5) PATH-LABEL standardization  ✅ CORRECT
The Fira-Code subpath chip renders `@mkbabb/glass-ui/toggle-chip` (manifest.ts:241), matching the brief's canonical label. Standard, no action.

## (6) LANGUAGE — superfluous prose to tighten?  ⚠️ MINOR
- `toggle-chip.vue:53-54` blurb "the section identity is the ONE color event." — internal jargon leaking to the demo surface; tighten or drop.
- Section labels are verbose-jargony: `"variant=cell — exclusive selection (no ToggleGroup)"` (`toggle-chip.vue:78`) and the blurbs "the primitive is deliberately unopinionated about ToggleGroup" (`:79`) read as source-comment prose, not demo copy. Tighten to plain user-facing language.

## (7) BUGS
- **B1 (critical)**: active chip/cell = achromatic gray (`--tone` unset → gray band). The component's signature tonal accent is dead. Thread `:tone`/`--tone` per the `selectable-chip.vue` model.
- **B2**: no contextual-switching / dock / motion affordance demoed (brief non-compliance, not a runtime crash).
- No console errors observed; toggles function (selection updates "selected: triangle"); the scale-hover transition is wired but visually trivial here.

---

## Recommended redesign (gestalt, BD-grade)
1. Set a LIVE aurora background (`background: "aurora"` on the manifest row) and host the chip rows in `ShowcaseFrame tier="field"` so the glass reads over a colorful field.
2. Split into TWO own glassy sub-section cards (chip / cell), each a real glass tier — not one delimited card.
3. Thread a distinct `:tone` per chip (section-color ramp, the `selectable-chip` model) so the tonal accent is ALIVE — kill the gray.
4. Leverage a dock: a contextual dock that morphs the live preview as a chip selection drives a procedural-anim or card state — exercise the dock contextual-switch API the brief mandates.
5. Surface a first-class `tone` prop on `ToggleChip` (mirror `SelectableChip`) so the API is demoable without raw CSS vars.
6. Tighten section labels/blurbs to user-facing copy; drop "ONE color event"/"unopinionated about ToggleGroup" jargon.
