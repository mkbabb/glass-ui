# Pass-E META-STORYBOOK audit — `forms/select`

- **Page**: `demo/stories/forms/select.vue` · import `@mkbabb/glass-ui/select` · live `http://localhost:5173/forms/select`
- **Manifest row**: `s("forms", "select", "Select")` (manifest.ts:728); subpath `@mkbabb/glass-ui/select` (manifest.ts:237); category default background `forms → "grid"` (manifest.ts:184)
- **Live verify**: page rendered + font dropdown opened on real Chrome (5173). Selects functional; menu glass + grouping + separators + selected-dot all paint. No console/runtime bug.

## Verdict by axis

### (1) DEMO CONGRUENCE — WEAK
The page shows Select working but NOT at its best, and exercises only a fraction of the API.
- **Shown**: grouped items + `SelectLabel` + `SelectSeparator` (font select, lines 56-74); per-item `--select-dot-color` viz tint (basis select, lines 89-106); a single `disabled` item (density, line 122).
- **Missing API surface** — the `SelectTrigger` `size` font-rung axis (CLAUDE.md §Menu-glass BA-VJS-4: `size="display"` → `--type-heading`, `size="audacious"` → `--type-display-1`, writing the shared `--dropdown-text` token) is NOT demonstrated anywhere on the page. This is the standout Select capability (the picker-family font-rung that scales trigger+items off ONE write) and the demo is silent on it.
- Missing: the `surface="veil"`/`surface="opaque"` decoration axis (W-SURFACE-AXIS — SelectContent threads it); the `aria-invalid` destructive-ring state (W-INVALID-RING — SelectTrigger reads `--invalid-ring`); `align: 'start'` flush-left drop + the dot-gutter coupling (BC.W-DROPDOWN-FIX); the bounded `[data-slot=select-content]` max-height collision-scroll (W-EMISSION); the `:responsive` collapse pattern; long-list scroll (the menu shows the up/down scroll chevrons but the list barely overflows).
- **Contextual switching / animation / dock APIs**: NONE composed by the page. The only dock on screen (Text/Selection/Toggles facets) is the demo SHELL's SidebarDock, not page-authored — the page demonstrates zero dock contextual-switching even though the brief flags it where relevant. The select-open liquid-reveal bloom is present (inherited from `.glass-reveal`) but nothing on the page draws attention to it.

### (2) COMPONENT ABILITY — THIN/FLAT
The page composes essentially ONE component (Select) ×3, plus `Label` and one `IconChip` in the header. No tabs, no cards-per-section, no buttons, no procedural-anim, no dock. It is a vertical stack of three near-identical `<section class="flex flex-col gap-3 max-w-sm">` blocks (lines 50, 82, 112). This is a spec-sheet, not the "deftly composes a SERIES of glass-ui components" bar.

### (3) GLASS SUFFUSION — FAILS the live-field bar
- Background is the category-default `grid` static paper wash (manifest.ts:184) — NOT a live colorful aurora. Over the near-flat gray/cream `wash`-tier card the glass triggers + the opened menu glass read as light gray pills; the six-layer optical composite (backdrop blur+saturate, rim, catch-light) has nothing colorful behind it to refract, so the morphism does not read. The whole point of a Select-over-glass demo — the menu plate sampling a vivid field — is absent.
- PAPER morphism: the `grid` wash is technically the paper register but it's washed to near-invisible at this card tier; it neither reads as deliberate paper nor as glass-over-color. Pick one and make it intentional.

### (4) STRUCTURE — FAILS both sub-bars
- **Per-section cards**: NO. The three selects share ONE flat card; sections are separated only by the chassis `--configurator-divider` hairlines (StoryPage `story-sections--delimited`, StoryPage.vue:171). The user mandate "each sub-section in its OWN glassy card" is unmet — these are gap-stacked sections inside one plate, not discrete glassy cards.
- **Bigger main card**: The card spans full `--story-page-max-inline` width but the CONTENT occupies only `max-w-sm` (~24rem) in the left ~40%; the entire right ~60% of the card is dead empty space (confirmed live — full-page screenshot shows a vast blank right half). The card is big but the layout wastes it. Either fill it (2-col: controls left, live preview/aurora right) or the "more screen space" mandate is hollow.

### (5) PATH-LABEL — CORRECT
`@mkbabb/glass-ui/select` renders in the hero subpath chip (live-confirmed, uid 5_10) and matches manifest.ts:237. Standardized; no action.

### (6) LANGUAGE — minor tightening
- Header blurb (lines 43-45): "Single-choice dropdown pickers — the section identity is the ONE color event; the controls stay ink." The "the section identity is the ONE color event; the controls stay ink" clause is internal design-rationale leaking into user copy — superfluous. Trim to the component description, e.g. "Single-choice dropdown pickers." This same internal-rationale-as-copy pattern recurs; the demo blurb should describe the COMPONENT, not the suffusion rule.
- The comment cluster (lines 17-19, 49, 81, 111) is fine (dev-facing).

### (7) BUGS — none functional
- No dead demo, no broken animation, no console error. Selects open/close, group, tint dots, disable correctly.
- Minor: `density` v-model inits to `""` (line 24) so the trigger shows the placeholder "Pick a density" — fine, but the page never shows a SELECTED density, so the disabled-item demo is the only thing that section teaches (under-built).

## Concrete remediation sketch
1. Split the three pickers into THREE discrete `<Card>`/glassy sub-cards (or a bento), satisfying the per-section-card mandate.
2. Set the page background to a live colorful `aurora` (override the `grid` category default in the manifest row, or per-page) so the glass triggers + the opened menu plate refract a vivid field — the suffusion bar.
3. Add a 2-col layout (controls left, a live preview pane right — e.g. the chosen font rendering a `text-display` sample, the chosen basis driving a small FourierField/procedural viz) to fill the dead right half + compose a procedural-anim + demonstrate contextual switching driven by the select value.
4. Add a 4th sub-card demonstrating the `SelectTrigger size="display|audacious"` font-rung + the `surface="veil"` + the `aria-invalid` ring — the unexercised headline API.
5. Optionally seat the pickers in a `<DockSection>`/dock contextual surface to exercise the dock APIs the brief calls for.
6. Trim the header blurb to drop the internal design-rationale clause.
