# A-dock-section — dedicated VERTICAL dock SECTION (DK10) — pass-2 source re-confirm

**Lane** A-dock-section (DK10) · **Severity** major · **Verdict** augment-existing-wave (W06 content + W18 category) · **id** A-dock-section

> Pass-2 ledger row (USER-DEFECTS-2026-06-08-pass2 #DK10): "A dedicated VERTICAL dock
> SECTION for the dock, glass, etc. [relates D14]". Dedup anchors: W06 (dock section
> content), W18 (IA category), D14 (the pass-1 disposition).

This lane re-investigates DK10 at SOURCE for convergence-2 and confirms the pass-1
disposition (`convergence/D14.md` → augment W06+W18) STILL HOLDS — but surfaces a
**concrete spec-drift gap the pass-1 file did not catch**: the W06 wave SPEC was never
amended to carry the D14 content scope, so as-written W06 actively CONTRADICTS the augment.
That is the actionable delta this lane adds.

---

## 1. The defect at source — re-verified at HEAD (5cf2980 / 3.8.0+W52)

The dock is the library's headline primitive yet its storybook presence is **scattered
across THREE categories and FIVE routes**, with no parent "Dock" home and no coherent
morph→layers→variants→rail tour:

| Manifest row (`demo/stories/manifest.ts`) | SFC (lines) | Category |
|---|---|---|
| `navigation/dock` (`:162`) | `navigation/dock.vue` (370 ln, 8 `<h2>` sections) | navigation |
| `navigation/dock-layers` (`:163`) | `navigation/dock-layers.vue` (267 ln) | navigation |
| `navigation/rail` (`:164`) | `navigation/rail.vue` (93 ln) | navigation |
| `foundations/dock-active-tokens` (`:86`) | token-ladder DEBRIS (W06 deletes) | foundations |
| `compositions/dock-with-slider` (`:237`) | keepDockOpen proof (W06 folds) | compositions |

`scripts/proof-storybook-ia.mjs` confirms the scatter is FROZEN into the IA gate: `:53-54`
hardcodes `["navigation", ["tabs", "dock", "dock-layers", "rail", ...]]` and `:6` even
comments "the dock consolidates into Navigation" — i.e. the gate codifies the wrong target.
No `dock` category exists in `EXPECTED_TREE`.

### The showcase-completeness gap — re-verified, three concrete misses

GlassDock's prop surface (`GlassDock.vue:139-147`, defaults) is rich:
`variant: "dock"` (dock·rail·instrument-strip), `shape: "pill"` (pill·rounded·card),
`layout: "linear"` (linear·grid), `orientation: "horizontal"` (H·V),
`density: "comfortable"` (mobile·compact·comfortable·spacious — 4 rungs),
`overflow: "grow"` (grow·wrap·scroll). Grep of the dock stories against this surface:

1. **`density=` is demoed NOWHERE** — `grep -rn "density=" demo/stories/navigation/` → ZERO
   hits. The entire 4-rung density axis (`mobile`/`compact`/`spacious`) is invisible, which
   is exactly the surface the pass-2 G/DK mobile-sizing asks (W45 `--dock-scale`) need a
   live anchor for.
2. **`variant="instrument-strip"`** only appears inside `compositions/instrument-chassis.vue`,
   never as a dock-variant tour. **`overflow="scroll"`** is only dogfooded in the demo's own
   `BottomDock` shell. Horizontal-`shape="rounded"`/`card` (AW.W3b made `shape` paint on
   horizontal docks — `GlassDock.vue:57`) is exercised only on `rail` (vertical) and
   `dock-layers`, never on a horizontal dock.
3. **No dedicated morph/animation showcase** — the W01 single-scalar spring is implicit in
   the `navigation/dock.vue:74` "Collapsible (hover to expand)" recipe but never framed as
   a "watch it morph" controlled collapse↔expand, which is the FIRST thing DK10/D14 names.

The dock stories also use raw `<h2 class="text-sm font-semibold text-muted-foreground">`
section headers (`grep -c "<h2" navigation/dock.vue` → 8), NOT the shipped
`demo/stories/StorySection.vue` + `ShowcaseFrame.vue` + `StoryPage.vue` chassis the D14 fix
prescribes. So even the EXISTING content is off-chassis.

### "VERTICAL dock SECTION" — the pass-2 emphasis, reconciled

DK10's wording adds "VERTICAL" over D14's plain "dedicated section". This is NOT a new ask —
it is the pass-2 pairing with **DK9** ("differentiate the VERTICAL dock vs the RAIL for the
horizontal dock"). The vertical dock (`orientation="vertical"`) and the rail
(`variant="rail"`, vertical-always-expanded) are the two vertical surfaces the section must
present as DISTINCT (a vertical dock still morphs/collapses and stacks arbitrary controls; a
rail is the honest non-collapsing navigation strip). The `dock/variants` axis-tour's
`orientation` H·V row + the `dock/rail` honest-rail row TOGETHER satisfy the DK9/DK10
vertical-vs-rail differentiation. No net-new wave for the "vertical" qualifier — it is one
more axis the W06-authored `dock/variants` tour already owns (orientation H·V side-by-side).

---

## 2. The pass-1 disposition (D14) — re-verified, STILL HOLDS

`convergence/D14.md` (verdict: augment W06+W18) and `convergence/A-waves-dock.md` (§4) both
route DK10/D14 as TWO Scope deltas on files the waves already own:

- **W18 owns the IA CATEGORY half** — a first-class top-level `dock` category in `manifest.ts`
  (sibling to Foundations/Substrates), member rows `overview`/`layers`/`variants`/`rail`,
  reversing W06's RATIFY-#1 flat-siblings recommendation. W18's plan ALREADY carries this in
  full: Scope-5 (`:49`), FileBounds (`:79-87` — including the `dock/variants.vue` STUB
  placement), HardGate D14 clauses (`:136`/`:147`), Cadence, and the `[CONVERGENCE D14]`
  Archaeology block (`:205`). **W18 is correctly amended for DK10.**

- **W06 owns the dock STORY CONTENT half** — authoring the morph/animation showcase section
  + the `dock/variants` axis-tour SFC body (on the shipped StorySection chassis), resolving
  RATIFY-#1 toward category-member rows.

The IA category half is fully owned and gated by W18. The content half is the gap.

---

## 3. The pass-2 DELTA this lane adds — W06's SPEC was never amended for D14

This is the actionable finding D14.md/A-waves-dock.md ASSUME but do not enforce: **the W06
wave document (`AX.W06-dock-storybook-honest-rail-css-split.md`, mtime 02:34 — authored
BEFORE the ~15:42 convergence pass) contains ZERO mention of D14.** Grepped at source:

- `grep "D14\|morph showcase\|Watch it morph\|dock/variants\|axis-tour\|density.*4-rung\|content half"`
  over W06 → **NO hits** (only a `:57` carve-scope mention of "shape/variant incl.
  instrument-strip" as a CSS-region label, unrelated to story content).
- W06's **RATIFY-#1 (`:506-512`) still RECOMMENDS keeping `navigation/dock-layers` +
  `navigation/rail` as FLAT siblings** and explicitly says "the consolidation target is the
  SCATTER... not a single-page merge of every dock route." This directly CONTRADICTS the D14
  augment (first-class `dock` category with member rows).
- W06's FileBounds (`navigation/rail.vue` row `:166`) is "retire the bespoke icon-button
  list; show the canonical `variant="rail"` recipe" — it RELOCATES + makes-honest, it does
  NOT author a NEW morph showcase or a NEW `dock/variants` axis-tour.

Meanwhile W18's FileBounds (`:87`) and Disjointness (`:101`) BOTH assert W06 authors the
`dock/variants` content ("the showcase BODY is W06 scope"; "if W06 has not landed the
content, W18 frames the row but does NOT author the showcase content — HALT + coordinate").
**W18 hard-depends on a W06 deliverable W06's own spec does not list.** `PROGRESS.md:176-177`
records the INTENT ("W06 (D14 dock showcase content)") but PROGRESS is a ledger, not the
wave's executable Scope/FileBounds/HardGate — both W06 and W18 are `planned`, so this is
caught NOW before either runs (the convergence-2 window).

If W06 runs as-written, it produces a consolidated `navigation/dock` with flat siblings and
NO morph/variants content — then W18 opens, finds the `dock/variants` content absent, and
its §3a auto-trigger fires HALT+triumvirate. That is the avoidable collision this lane flags.

---

## 4. The gestalt fix — amend W06's spec to carry the D14 content scope

No new wave. The fix is to AMEND the W06 document (a doc edit, the convergence-2 act) so its
executable scope matches the augment W18 already encodes:

1. **W06 Scope + FileBounds gain the D14 content bullet** — author (a) a dedicated
   morph/animation showcase section (a "Watch it morph" controlled collapse↔expand driving
   `startCollapsed`/a held-open toggle so the W01 single-scalar spring is VISIBLE, not
   implicit in hover) on the `dock/overview` SFC, and (b) the `dock/variants.vue` axis-tour
   body — one `<StorySection>` per axis: `shape` (pill·rounded·card on a HORIZONTAL dock),
   `layout` (linear·grid), `density` (the 4-rung mobile·compact·comfortable·spacious, the
   surface W45's `--dock-scale` lands on), `orientation` (H·V side-by-side — the DK9/DK10
   vertical-vs-rail differentiation), `overflow` (grow·wrap·scroll). All on the shipped
   `StoryPage`/`StorySection`/`ShowcaseFrame` chassis — NO new tabbed-sub-nav primitive.
2. **W06 RATIFY-#1 RESOLVES toward category-member rows** — flip the recommendation from
   "keep flat `navigation/` siblings" to "the rows become members of W18's first-class
   `dock` category (`overview`/`layers`/`variants`/`rail`)". This removes the live
   contradiction between W06 and W18/D14.
3. **The single-writer contract is preserved** — W18 stays the SOLE `manifest.ts` dock-row
   writer (creates the category + places the `dock/variants` row); W06 writes only the SFC
   content bodies (incl. the new `dock/variants.vue` content into the W18-placed stub). The
   existing migration of the off-chassis `<h2>` headers → `<StorySection>` rides W06's
   content reauthor (the overview SFC it already touches).
4. **DK9 (vertical-vs-rail) folds into the same `dock/variants` orientation row + `dock/rail`
   honest-rail row** — no separate wave; the section presents the vertical dock and the rail
   as the two distinct vertical surfaces.

---

## 5. Why augment, not net-new (dedup proof)

- A standalone DK10 wave would race W06 for `navigation/dock.vue` + the dock-story content
  AND race W18 for `manifest.ts` dock rows + the three IA gates — the exact collision both
  waves' Disjointness sections forbid (W06 §Disjointness vs W18 `:101`; W18 §C.2). The
  machinery (StorySection chassis, manifest rows, `EXPECTED_TREE` re-baseline, π-lane nav
  audit) ALREADY lives in W06+W18.
- W18 is fully amended for D14/DK10 (category half) — no further W18 edit needed.
- The ONLY missing piece is the **W06 spec amendment** (content half) — a doc edit, not a
  new wave. PROGRESS.md already records the intent; this lane makes it executable.
- W40 (demo nav SHELL, never touches `manifest.ts`) is NOT a candidate. D13/W45
  (library-side persistent-controls + `--dock-scale`) is the SIBLING whose improvements the
  `dock/variants` axis-tour makes VISIBLE — complementary, not duplicative.

## 6. Overfitting / precept check

- The new `dock/variants` SFC + the morph section are private demo helpers (≥2 sections /
  exercised axes) — passes the overfitting bar.
- NO new chassis primitive — `StoryPage`+`<StorySection>`+`<ShowcaseFrame>` are shipped
  (confirmed present: `demo/stories/{StoryPage,StorySection,ShowcaseFrame}.vue`). The D6
  no-invented-chassis discipline holds.
- The axis-tour surfaces SHIPPED props (`density`/`instrument-strip`/`overflow=scroll`/
  horizontal-`shape`/`orientation`) — it documents real surface, not contrivance.
- Clean break: rows MOVE into the `dock` category (guarded by `proof:no-orphan-demo-route`),
  no flat-`navigation/`-dock tombstone, no `MissingStory` alias.

## 7. Verdict

**augment-existing-wave** → (a) **AMEND the W06 wave SPEC** to carry the D14/DK10 content
scope (morph/animation showcase + `dock/variants` axis-tour SFC body on the StorySection
chassis + RATIFY-#1 resolved toward category-member rows) — the missing piece that W18
already hard-depends on; (b) **W18 is already amended** (first-class `dock` category +
member rows + IA-gate re-baseline) — confirm-and-hold. DK9 (vertical-vs-rail) folds into the
`dock/variants` orientation row + `dock/rail` row. No net-new wave; the spec-drift gap is the
deliverable.
