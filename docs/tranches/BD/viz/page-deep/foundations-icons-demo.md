# Pass-E META-STORYBOOK DEMO audit — foundations/icons

- **Page**: `foundations/icons`
- **Import (canonical)**: `@mkbabb/glass-ui/icon-chip`
- **SFC**: `demo/stories/foundations/icons.vue`
- **Live**: http://localhost:5173/foundations/icons (spot-checked, screenshot `docs/tranches/BD/viz/page-deep/icons-live.png`)
- **Manifest row**: `manifest.ts:507` — `s("foundations", "icons", "Icons", "Lucide, 2px stroke, semantic sizes.")`; subpath `manifest.ts:213` = `@mkbabb/glass-ui/icon-chip`; background resolves to category default `foundations → paper` (`manifest.ts:182`).

---

## (1) DEMO CONGRUENCE — shows the component at its BEST + exercises FULL API?

**PARTIAL.** The page leads with the Pops row (the brand color-event), which is the IconChip's best feature — and it does animate (the `:reveal` spring-clock bloom-in). But the API coverage is incomplete and the demo is mostly a STATIC token tour.

Exercised (`icons.vue:124-130`): `icon`, `section`, `saturated`, `bloom`, `reveal`.

**NOT exercised — the full IconChip API per `types.ts`:**
- `tone` (`types.ts:40`) — the complete-token arm (e.g. `var(--chart-download)`). The XOR-with-`section` story is never shown. (icons.vue uses only `section`.)
- `bare` (`types.ts:55`) — the NO-PLATE register (the MetricCell leading-glyph reconcile). Never demoed.
- `duotone` (`types.ts:61`) — the filled-tonal iOS/Material move. Never demoed, despite being one of the THREE named opt-in axes the SFC header comment (`icons.vue:4-5`) claims the page demonstrates.
- `glyphSize` / `size` / `strokeWidth` (`types.ts:46-49`) — the proportion floor (chip ≤ glyph × ratio) is a load-bearing structural guarantee; the page never shows a chip at a non-default size to prove it.

**The `bloom` hover register is never SHOWN as interactive** — `bloom` is set on every pop chip (`icons.vue:128`) but the page gives no prompt/caption that the chip lifts on hover, so the animation affordance is invisible at rest (the audit's "HIGH animation affordance for EVERY component" bar). The reveal entrance fires once on mount and is then dead.

**Sections 3 & 4 (Sizing / Stroke width) demo RAW lucide `<component>`, not IconChip at all** (`icons.vue:177`, `icons.vue:197`). They are a Lucide-glyph tour, congruent with the page TITLE ("Icons") but NOT with the IMPORT (`icon-chip`). They never touch the component the path-label names.

## (2) COMPONENT ABILITY — deft SERIES of glass-ui components, or thin/flat?

**THIN/FLAT.** The page composes essentially ZERO glass-ui components beyond `IconChip` + raw lucide glyphs:
- `IconChip` ×13 (the pops row) — the one real component.
- `ShowcaseFrame` (demo chassis, not a shipped library component).
- `StoryPage` / `StorySection` (demo chassis).
- Everything else is a `<component :is>` lucide glyph in a `flex flex-col` (`icons.vue:153-165`, `171-186`, `191-202`).

NO docks, NO tabs, NO buttons, NO procedural-anims, NO cards (beyond the implicit StoryHero wrapper). The audit's north star — "each page deftly uses a SERIES of glass-ui components (docks/procedural-anims/cards/tabs/buttons)" — is unmet. Concretely: a Sizing/Stroke-width control would be a natural `<SegmentedTabs>` or `<Slider>` live-driving the chip `glyphSize`/`strokeWidth`; the section ramp is a natural dock-contextual-switch (a `<DockStack mode="facets">` whose facet accent IS the `--section-color-N`). None of this is present — the dock APIs (contextual switching / animation) are entirely unleveraged.

## (3) GLASS SUFFUSION — glass over a LIVE colorful field?

**FAIL (the headline defect).** Background is `paper` (foundations category default, `manifest.ts:182`) — a flat near-white wash (confirmed live). There is NO aurora, NO colorful field. The glass morphism cannot read:
- The Pops `ShowcaseFrame tier="field"` (`icons.vue:117`) correctly drops its opaque plate so glass would float over the substrate — but the substrate behind it is flat paper, so the field-tier does nothing visible (no backdrop to blur/saturate/tint).
- The monochrome grid uses `tier="quiet"` (`icons.vue:150`) — `bg-card/40` half-opaque plates over flat paper. The six-layer optical composite (backdrop blur+saturate · tint · rim · catch-light · shadow · grain) has nothing to refract.

PAPER morphism: nominally apt for a foundations/ink page, BUT the page declares NO `paper-grain-overlay` (`ShowcaseFrame grain` prop unused), so even the paper register is flat — not a grained paper specimen. The page is neither glass-over-field NOR a designed paper specimen; it is a flat token sheet.

## (4) STRUCTURE — each sub-section in its OWN glassy card? main card BIG enough?

**FAIL on both.**
- **Sub-sections are NOT in their own cards.** The whole body sits in ONE outer glass `<Card>` (StoryHero, `StoryHero.vue:16` Card wrapper). Inside it, the four StorySection blocks (Pops / Lucide reference / Sizing / Stroke width) are bare `flex flex-col` gap-stacks separated only by the `.story-sections--delimited` hairline (`StoryPage.vue:171`). The user's explicit bar — "each sub-section in its OWN glassy card" — is unmet: only the inner ShowcaseFrames have card chrome, and the Sizing/Stroke sections have NO frame at all (`icons.vue:170-203` are naked).
- **Main card area is NOT bigger.** The article is bounded to `--story-page-max-inline` (`StoryPage.vue:87`), the shared narrow rhythm width. Live, the card occupies the center column with large left/right paper margins (screenshot) — the user's "main card area BIGGER (more screen space)" is unmet; the dead paper gutters are exactly the wasted space the user flags.

## (5) PATH-LABEL standardization

**PASS.** The subpath chip renders `@mkbabb/glass-ui/icon-chip` (live, top-left under the eyebrow), sourced from `manifest.ts:213`. This is the canonical form. (Minor: the SFC's own import is the deep relative `../../../src/components/custom/icon-chip` at `icons.vue:38` rather than the published subpath — cosmetic for a demo, but inconsistent with the label it advertises.)

## (6) LANGUAGE — superfluous prose to tighten?

- `icons.vue:107-116` blurb is long and repeats the SFC comment. "a surface gets ONE color event — either a field behind glass or a chip cluster like this, never both at full volume; a chip never exceeds icon scale, and body ink is never tinted" — three clauses of proportion-doctrine that belong in the precept, not the demo blurb. Tighten to one line: "One color event per surface; the chip never out-scales its glyph."
- `manifest.ts:507` blurb "Lucide, 2px stroke, semantic sizes." describes the lucide tour, not the IconChip (the named import) — mismatched to the path-label. Should describe the chip color-event.
- The SFC header comment (`icons.vue:1-10`) is a wall of tranche-archaeology (`BB.W-DEMO-DESIGN`, `W-SUFFUSE3`, `D6 fence`) — fine as code provenance, but the user-facing blurb inherits its tone.

## (7) BUGS / dead demos

- **Dead animation at rest** — the `reveal` entrance plays once on mount then is inert; `bloom` is hover-only with no affordance hint. After first paint the page is fully static (no continuous animation affordance — the "HIGH animation for EVERY component" bar fails).
- **Sizing / Stroke-width sections demo raw lucide, not IconChip** (`icons.vue:177`, `197`) — they are off-component for a page whose import is `icon-chip`. Not a crash, but a congruence bug (the demo for `icon-chip` spends 2 of 4 sections not using it).
- No console errors observed live; the page mounts cleanly.

---

## Recommended gestalt redesign (architectural, not patches)

1. **Put it over a LIVE colorful aurora.** Change the manifest background off `paper` to a tuned `aurora` (or a per-section field) so the Pops + glass frames demonstrate the six-layer composite they exist to show. The `tier="field"` ShowcaseFrame already supports it — it just needs a field behind it.
2. **Each sub-section in its OWN glassy card**, wider. Wrap Pops / Reference / Sizing / Stroke each in a `<Card tier="glass-floating">` (or a deep-glass tier) over the aurora; widen the article past the narrow paper rhythm.
3. **Make it a SERIES of components + leverage the dock.** Drive `glyphSize`/`strokeWidth` from a live `<SegmentedTabs>` or `<Slider>`; make the section ramp a `<DockStack mode="facets">` whose facet accent IS `--section-color-N` (contextual-switching the chip cluster). Add `tone`, `bare`, `duotone` rows so the FULL API reads.
4. **Tighten the blurb** to one proportion line; fix the manifest blurb to describe the chip color-event, not the lucide stroke.
