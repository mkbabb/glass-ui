# Pass-E META-STORYBOOK deep audit — `forms/selectable-chip`

- **Page**: `demo/stories/forms/selectable-chip.vue` (82 lines)
- **Component**: `SelectableChip` — `@mkbabb/glass-ui/selectable-chip` (BC.W-ACCENT-TONE)
- **Live**: http://localhost:5173/forms/selectable-chip (verified, light mode, 1440px)
- **Manifest row**: `manifest.ts:738-743`, background = `grid` (forms category default, `manifest.ts:184`), NO `hero` → content page.

---

## Verdict against the design north star

The page is a **flat two-row spec-sheet**: two `<SelectableChip>` rows in two near-empty `<ShowcaseFrame>` boxes over a static grid wash. It demonstrates the component's idle/active state correctly but exercises a thin slice of the user's bar — no live aurora, no glass suffusion, no companion glass-ui components, no contextual/dock animation, no dark-mode contrast story, and the most-important second row (the default `var(--primary)` tone) renders as **gray pills** that read as the exact "no-gray" anti-pattern the register exists to kill.

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

**Partial.** The component's headline behavior (idle-legible ≥3:1 fill + active-bold band/edge/ink) IS shown in row 1, and that row is genuinely nice — six distinct `--section-color-*` tones, each idle-tinted and bold-when-on. But the API is under-exercised and the demo undersells the register:

- **The `size` axis is half-shown.** Only `md` (row 1, default) and `lg` (row 2) appear. `sm` (`selectableChipVariants.ts:50`) is never rendered — no size-ladder comparison row. (`selectable-chip.vue:48-56` is all `md`; `:64-74` is all `lg`.)
- **No `disabled` state** — the CVA carries a full `disabled:opacity-disabled disabled:pointer-events-none` arm (`selectableChipVariants.ts:40`) that is never demonstrated.
- **The contrast-safe-INK headline is invisible in the demo.** The whole point of the `useAccentTone` value.js half (`SelectableChip.vue:42-45`, README §"contrast-safe INK") is that the label auto-darkens/lightens to clear AA over the band. With a `var(--…)` tone (which BOTH rows use), the JS resolver passes through and the CSS fallback ink carries it — so the demo NEVER exercises a CONCRETE `oklch(…)`/`#hex` tone, which is the only path that triggers the value.js `safeAccentColor` solve. The page's most architecturally-interesting feature is dark to the viewer. A row of concrete-color chips (a brand-palette picker) would light it up.
- **The default `var(--primary)` tone is a TRAP, not a showcase.** Row 2 (`selectable-chip.vue:62`, "var(--primary) default tone") renders selected "Recent" as `oklab(0.842 0.0017 0.0063)` — chroma ≈ 0.006, i.e. **gray** (live-verified). The default-tone chip is the LEAST flattering possible default to lead the second section with; it reads as a dead gray toggle, undercutting the "tonal accent" thesis on the very same page that argues for it. Either pick a real tone for the filter row, or make row 2 a *contrast* demo (gray default → tonal upgrade) with explicit framing.
- **No contextual switching / animation surfaced.** The chips DO carry the §6 lift/settle motion (`selectableChipVariants.ts:38-39`), but the demo presents them statically — no "watch the ink stay correct as the tone animates," no toggle-group-driven exclusive-selection morph, no live tone-shift. For the north star's "HIGH animation affordance for EVERY component," this is flat.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components?

**No — this is the weakest axis.** The page composes exactly ONE library component (`SelectableChip`) wrapped in two demo-chassis `<ShowcaseFrame>`s. There are no `<Card>`s, `<SegmentedTabs>`, `<Button>`s, dock, or procedural-anim siblings. The north-star ask ("each page deftly uses a series of glass-ui components: docks/procedural-anims/cards/tabs/buttons") is essentially unmet.

Concrete missed compositions natural to a chip register:
- A `<SegmentedTabs>` or `<ToggleGroup>` to drive the exclusive filter row (the demo even apologizes for hand-rolling it via refs at `selectable-chip.vue:62`, "unopinionated about ToggleGroup" — show the composition instead of describing its absence).
- A live `<Card>` whose `--glass-accent` rim is driven by the selected chip's tone (the README §"DISTINCT seams" explicitly notes `--accent-tone` + `--glass-accent` COMPOSE on a chip-tinted glass surface — a perfect demo that is never built).
- A dock-driven facet rail (`<DockStack mode="facets">`, BE.W-DOCK-RAIL-REALIZE) — chips ARE filter facets; the new per-facet `--glass-accent` carousel is the literal dock-API match the prompt asks to leverage.

## (3) GLASS SUFFUSION — live colorful field?

**Absent.** Background is `grid-bg` (static engineering-paper wash, live-verified, `canvasCount: 0` — no GL). The chips are glass-tier tonal plates but they float over a flat near-white grid with nothing colorful behind them, so the six-layer optical composite (backdrop blur+saturate over a colored field) cannot read — there is nothing to refract. The user's bar "glass demos over COLORFUL aurora backgrounds" is unmet.

`ShowcaseFrame tier` is left at the default `resting` (opaque `bg-card` plate, `ShowcaseFrame.vue:93-94`) — so even the warm-cream plate occludes the page wash. For a glass-suffusion read this should be `tier="field"` over an aurora background (the `glass-material.vue` / BG-2 precedent).

**Paper morphism**: the grid wash is the paper register, but it is the page backdrop, not an authored paper-morphism specimen. No deliberate GLASS+PAPER pairing.

## (4) STRUCTURE — own glassy card per sub-section? main area big enough?

**Mixed.** Each sub-section IS in its own `<ShowcaseFrame>` (two frames), so the "own card" bar is nominally met — BUT the frames are opaque `bg-card` plates, not glassy, and they are tiny: live-measured the two inner frames are **83px and 110px tall** inside a **529px-tall outer hero card** at 1152px wide. The chip rows are small islands in oceans of empty padding; the "main card area BIGGER / more screen space" intent is inverted — the content is sparse, not generous. The outer card is big; the *content* is thin, so it reads as wasted space rather than a commanding showcase.

The `StoryPage` already delimits sections with a hairline (`story-sections--delimited`) — visible on the live page between the two rows — so the two-card separation is real, just under-filled.

## (5) PATH-LABEL standardization

**Already correct.** Live-verified the Fira-Code subpath chip reads `@mkbabb/glass-ui/selectable-chip` (`manifest.ts:242`). No action.

## (6) LANGUAGE — superfluous prose to tighten?

The blurbs are **over-stuffed with backtick-heavy internal jargon** that reads like gate-spec prose, not demo copy:
- `selectable-chip.vue:44` — "the `--accent-fill` is faint but floored ≥3:1 (legibly tinted, not a whisper); SELECTED, the chip reads the bolder `--accent-band` + `--accent-edge` rim + the contrast-safe `--accent-ink` label." → a viewer does not need the four token names; tighten to the user-facing behavior ("idle chips stay legibly tinted; selected chips go bold with a contrast-correct label").
- `selectable-chip.vue:62` — "exclusive selection composed via direct refs — the primitive is unopinionated about ToggleGroup" → leaks an implementation apology into demo copy. Cut or replace with the actual ToggleGroup composition.
- The manifest blurb (`manifest.ts:742`) is fine.
- The duplicated SFC top-comment + script-comment (`selectable-chip.vue:1-6` and `:15-17`) restate each other; one is enough.

## (7) BUGS

- **No functional bug** — both rows toggle, state binds, motion fires. Not dead.
- **Design defect (the gray-pill trap, §1 above)**: row 2's default-`--primary` selected chip resolves to a near-zero-chroma gray (`oklab L0.84 chroma~0.006`, live-verified) — it visually contradicts the page's own no-gray/tonal thesis. Treat as a must-fix.
- **Glass-suffusion miss (§3)**: opaque frame + static grid → the glass material never reads. Architectural, not cosmetic.

---

## Recommended redesign (gestalt, not patch)

1. Background → **aurora** (or a contained `<DockStage>`-style live field) for this route; frames → `tier="field"` so the tonal chips float over color and the glass reads.
2. Each sub-section in its OWN **glassy** card (not opaque `bg-card`): a full-bleed brand-palette tonal-picker card, a concrete-`oklch` contrast-ink card (light up the value.js half), a `sm/md/lg` size-ladder card, a `disabled`-state card.
3. Compose the **SERIES**: drive the exclusive row with `<SegmentedTabs>`/`<ToggleGroup>`; bind the selected tone into a sibling `<Card>`'s `--glass-accent` rim (the README's own COMPOSE example); add a `<DockStack mode="facets">` facet-rail variant so the dock-API ask is met.
4. Fill the big card: replace the 83/110px floating rows with content-rich tonal grids so the generous card reads as a showcase, not empty space.
5. Tighten blurbs to behavior, drop token-name jargon and the ToggleGroup apology.
