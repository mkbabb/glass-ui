# Pass-E page-deep audit — `motion/scroll-vt`

- **Route**: `http://localhost:5173/motion/scroll-vt`
- **SFC**: `demo/stories/motion/scroll-vt.vue`
- **Import label**: `@mkbabb/glass-ui/motion-core` (manifest `demo/stories/manifest.ts:311`)
- **Manifest row**: `manifest.ts:1066-1071` — `s("motion","scroll-vt","Scroll & View Transitions", …)` with **NO `background:` opts** → inherits the category default `CATEGORY_DEFAULT_BG.motion = "constellation"` (`manifest.ts:191`).
- **Live state observed**: 4 sub-sections, 1 outer `glass-wash` card at 76% viewport width, constellation (Canvas2D, monochrome) field, dark+light both spot-checked.

---

## Verdict snapshot

| Axis | State |
|---|---|
| 1. Demo congruence | PARTIAL — shows 3 real primitives + a probe, but each at minimal API; no contextual/dock affordance |
| 2. Component ability | THIN — only `Button` + bare `glass-card` divs; no Dock/Tabs/procedural-anim composed |
| 3. Glass suffusion | WEAK — glass over a faint MONOCHROME constellation, not a colorful aurora; morphism barely reads |
| 4. Structure | FAILS the ask — sub-sections share ONE card (hairline-divided), NOT own cards; main card only 76% wide |
| 5. Path label | PASS — `@mkbabb/glass-ui/motion-core` renders as the Fira-Code chip |
| 6. Language | TIGHTEN — blurbs carry internal-jargon ("≤20-LOC fallback", "single writer, no double-run") |
| 7. Bugs | None functional; the page does not race; VT/scroll/reveal all live |

---

## (1) DEMO CONGRUENCE — does it show the component at its BEST + full API?

The page demonstrates 4 *facilities* (not components): the `.scroll-progress` bar, `[data-scroll-reveal]`, the `.gl-list-item` VT reorder, and a `supports*` capability badge. Each is shown at its **floor**, not its best:

- **Capability badge** (`scroll-vt.vue:55-79`) — two inert pill `<span>`s painted off `--surface-tint-*` with a `--motion-accent` dot. It is a static spec readout; no affordance, no animation. This is the weakest specimen on the page — a flat label row, the exact "spec-sheet not specimen" pattern `BB.W-DEMO-DESIGN` condemns.
- **Scroll progress** (`scroll-vt.vue:81-99`) — a 1px `--motion-accent` bar over a 256px inner scroll panel of 14 plain `<p>` paragraphs. Works, but the demo content is filler prose; the bar is thin and easy to miss. No `coverage`/thickness exercise, no pairing with the shipped `<BorderProgress>` (the "progress IS the border" register that is the SOTA expression of this same idea).
- **View-driven reveal** (`scroll-vt.vue:101-118`) — 8 `glass-card` tiles fade+lift on a `view()` timeline inside a 288px scroller. This is the **best** moment on the page (real glass tiles, real stagger), but the tiles are empty (`Reveal card N`) and tiny (h-24).
- **VT reorder** (`scroll-vt.vue:120-138`) — `<Button>Rotate order</Button>` + 5 `glass-card` rows that rotate-by-one through `startViewTransition`. Functional and the most "alive" interaction, but a single rotate-by-1 is a thin exercise of the VT substrate (no add/remove/filter, no FLIP between layouts).

**The full API is NOT exercised.** The prompt's "esp. contextual switching / animation / the new dock APIs" is absent: the page is a 4-facility menu with no dock contextual-switch, no tab-driven facility selector, no animation richness beyond the facility's own one-shot.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**Thin.** Live DOM inventory (`evaluate_script`): the demo body composes exactly **`Button` ×1** + **bare `glass-card` divs ×13**. No `GlassDock`, no `SegmentedTabs`, no procedural-anim (`canvas`) in the body. For a page whose whole subject is *scroll + view-transition motion*, this is a missed composition: the facilities themselves are the protagonist, but the page never stages them with the library's own animated chrome. The four sub-sections could trivially be a **`SegmentedTabs` / `DockLayerGroup` contextual switch** (the prompt's explicit ask — "leverage the dock APIs / contextual switching"), with each facility a layer that crossfades in. As built it is a flat vertical stack.

## (3) GLASS SUFFUSION — live colorful field, or flat?

**Weak.** The background resolves to `constellation` (`StoryHero.vue:274`, the motion category default) — a Canvas2D monochrome dot-and-line field at `opacityCeiling` 0.4 (light) / 0.62 (dark). Live capture: the field is barely perceptible (faint grey dots upper-right); the page reads as a flat grey/charcoal monochrome card. The glass morphism (the six-layer optical composite — blur, tint, rim, catch-light) **does not read** because there is no colorful, high-contrast field behind it for the glass to refract.

The prompt is explicit: *"glass demos over COLORFUL aurora backgrounds."* The fix is one manifest edit — declare `background: { kind: "aurora", palette: "purple-tomato" }` (the motion-violet identity; `aurora-hero.ts:47` ships it) so the inner reveal/list `glass-card` tiles float over a live violet aurora and the morphism POPs. (`aurora-hero.ts:33-50` enumerates the vivid palettes; the page currently taps none.)

PAPER morphism: not present and not strongly apt here — though a `paper-grain` reveal tile or a math-paper scroll-progress panel would diversify the texture register. Optional.

## (4) STRUCTURE — own cards? main area big enough?

**Fails both halves of the user ask.**

- **Each sub-section in its OWN glassy card — NO.** Live DOM: all 4 `<section>`s are bare `flex flex-col gap-3` (`StorySection.vue:71`), stacked inside ONE outer `story-hero-card` (`glass-wash`) and separated by the chassis `.story-sections--delimited` hairline rule (`StoryPage.vue:166-177`). The sub-sections are divided, not carded. To meet the ask each `<StorySection>` body must sit in its own `<Card tier="…">` (a glass plate per facility) — the "each sub-section in its own glassy card" bar verbatim.
- **Main card area BIGGER — NO.** The outer card measures **76% of a 1440px viewport** (`outerCardWidthPct: 76`), bounded by `--story-page-max-inline` and the `mx-auto` article. The two inner scroll panels are only 256px / 288px tall. The user wants "the main card area BIGGER (more screen space)" — the per-facility cards should claim more width/height (a 2-col bento, or full-width cards with taller scroll ports).

## (5) PATH-LABEL standardization

**PASS.** The Fira-Code chip renders `@mkbabb/glass-ui/motion-core` (manifest `manifest.ts:311`, surfaced via `StoryHeader`). Matches the prompt's declared label exactly. No action.

## (6) LANGUAGE — superfluous prose to tighten

The blurbs leak internal build-jargon a demo viewer should never see:

- `scroll-vt.vue:57` — *"the JS composables are the ≤20-LOC fallback (single writer, no double-run)"* — `≤20-LOC` and `single writer, no double-run` are gate-internal facts, not user-facing copy.
- `scroll-vt.vue:103` — *"the stagger is implicit (no setTimeout cascade)"* — implementation detail; tighten to "the stagger is implicit."
- `scroll-vt.vue:83` — *"so it costs the main thread nothing"* repeats inside the paragraph filler at `:94-95` too (duplicate "costs the main thread nothing").
- The SFC top comment block (`scroll-vt.vue:1-10`) and inline `// reveal scroller content` are fine (code comments), but the *rendered* blurbs should drop the parenthetical engineering asides.

## (7) BUGS

No functional bugs. VT rotate animates, scroll-progress bar tracks, reveal tiles stagger, capability probe reports `supported`/`supported` on Chrome. The page does not race the scroll-reset. The only "defect" is design-level (flat/thin/monochrome), not broken.

---

## Recommended remediation (architectural, no workarounds)

1. **Colorful field**: manifest `background: { kind: "aurora", palette: "purple-tomato" }` so glass morphism reads over a live violet aurora.
2. **Own cards**: wrap each `<StorySection>` body in its own `<Card>` (glass plate per facility); set `StoryPage :delimited="false"` (the hairline rule is redundant once each facility is carded).
3. **Bigger + deft composition**: stage the four facilities as a **`DockLayerGroup` / `SegmentedTabs` contextual switch** (the dock-API ask) so a facility crossfades in, each in a large glass card — replacing the flat vertical stack. Fill the reveal tiles with real content and pair the scroll-progress with `<BorderProgress>` (progress-as-border).
4. **Tighten blurbs**: strip the `≤20-LOC` / `single-writer` / `setTimeout` engineering asides; dedupe "costs the main thread nothing."
