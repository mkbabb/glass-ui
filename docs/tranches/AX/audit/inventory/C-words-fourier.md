# C-words-fourier — Constellation consumer inventory: words + fourier-analysis

**Lane**: C-words-fourier (AX step-back inventory). **Date** 2026-06-08. **glass-ui HEAD**
c72d2ac (3.8.0 + convergence-1 W44-W52 + convergence-2 W53-W59, UNPUBLISHED past the
published 3.8.0 registry line). **Mode**: read-only audit; tranche-dev planning only.

Scope: audit `/Users/mkbabb/Programming/words` (master) + `/Users/mkbabb/Programming/fourier-analysis`
(master) as glass-ui consumers — what they consume, their 3.8.0 readiness, routed asks,
and the cross-repo idiom (W34). These two are 2 of the 4 repos `proof:consumers:static`
scans (`fourier-analysis/web`, `words/frontend`, `bbnf-lang/playground`, `speedtest`).

---

## Baselines (sibling-capture ritual)

| Consumer | Repo HEAD | Branch | glass-ui pin (declared) | Installed (node_modules) | Tree (porcelain) |
|---|---|---|---|---|---|
| **words** | `d11640d` | master | `^3.0.0` | **3.0.0** (workspace root `words/node_modules`; `frontend/node_modules/@mkbabb` is EMPTY — workspace-hoisted) | DIRTY — backend AI/dedup/text trees in flight (handoff-patch disposition); the `frontend/` glass-ui source is clean of retired subpaths |
| **fourier** | `0167268` | master | `^3.1.0` | **3.1.0** (`web/node_modules`) | CLEAN in `web/` (1 dirty file overall, outside `web/`) — clean-NOW disposition |

Both pin **keyframes.js `^2.2.0`** (in-range for current glass-ui peer `^2.2.0 || ^3.0.0`).
Both run a STALE glass-ui — words 3.0.0 (8 minor lines behind 3.8.0), fourier 3.1.0
(7 behind). Neither dev-resolves what is at glass-ui HEAD. This is the publish-currency
hinge (W34 §16 / §4 note 12): a CLASS of "consumer still broken" findings are FIXED at
HEAD but absent from the consumer's resolved `dist/`. The corrective is the pin bump AFTER
the AX cut publishes (gated on W41), NOT a re-fix.

---

## words — import surface census (the §16.3 PRIMARY evidence site)

87 files import `@mkbabb/glass-ui` (142 import-site corpus per slice 16). Subpath census
(by occurrence) — confirms a BROAD base-component consumer, ZERO new-idiom adoption:

```
29 /button   24 (root)  13 /hover-card  11 /toast    9 /tooltip   8 /card
 7 /badge     5 /popover  5 /forms       5 /confirm-dialog  4 /sidebar
 4 /dropdown-menu  4 /dialog  2 /tabs  2 /stacked-icons  2 /dock  2 /dark
 2 /carousel  1 /typewriter  1 /styles  1 /select  1 /label  1 /controls
```

### words findings

- **F1 — running the pre-3.4.0 BROKEN dock on a stale `^3.0.0` pin.** The slice-16 census
  cites `node_modules/@mkbabb/glass-ui/dist/dock.js:219` `container-type:inline-size` (the
  3.4.0 dock-collapse defect, fixed via container-type removal + peer widen per the
  `project_glassui_340_published` memory). The pin bump to AX is the un-break. Two dock
  sites: `WordListView.vue` (×2, `always-expanded`) + `ThemeSelector.vue` (admin
  edit-mode dock).
- **F2 — STALE dock binding (`manual`).** `ThemeSelector.vue:6`:
  `<GlassDock ref="dockRef" manual :start-collapsed="!editModeEnabled">`. `manual` is NOT
  a current `GlassDock` prop (verified against `src/components/custom/dock/GlassDock.vue`
  — the prop surface is `collapseDelay`/`startCollapsed`/`fitContent`/`position`/
  `alwaysExpanded`/`variant`/`corner`). It silently no-ops (the
  glass-ui-binding-verification memory class: stale reka-ui/glass-ui props pass tsc + units
  but never bind — only e2e catches). `always-expanded` + `start-collapsed` ARE valid.
  **This is a binding-verification sweep item for the words leg.**
- **F3 — 5 `hsl(var(--token))` never-paint sites (CONFIRMED LIVE).**
  `SearchResultItem.vue:160,171` (`bg-[hsl(var(--chart-5))]`),
  `transitions.css:125,128,130` (`hsl(var(--destructive))`/`hsl(var(--primary))`). These
  double-wrap an already-complete `hsl()` token — the CLAUDE.md anti-pattern that NEVER
  paints. → direct `var()` / `color-mix`.
- **F4 — Fraunces font override (W22 adjudication target, CONFIRMED).** `theme.css:5-7`
  points `--font-serif`/`--font-sans`/`--font-display` ALL at `"Fraunces", Georgia, …`.
  glass-ui's W22-reconciled DEFAULT register is Plus Jakarta (text/display) + Fira Code
  (mono). Words deliberately overrides to Fraunces — this is a presets-in-consumers DECISION
  the words leg must re-adjudicate (W34 routes "repoint body/sans/display off Fraunces" to
  the W22 adjudication; but per presets-in-consumers, a deliberate brand font is the
  consumer's right — the leg should DECIDE, not auto-strip).
- **F5 — missing `@source` directive (CONFIRMED).** `src/assets/index.css:3` imports
  `@mkbabb/glass-ui/styles` but NO `@source "…/node_modules/@mkbabb/glass-ui/dist"`. Per
  CLAUDE.md this means glass-ui component templates' layout/CVA utilities are silently
  absent from the content scan. → add the binding `@source` (routed to W25a dist-deadlink
  + the consumer leg).
- **F6 — dock workarounds (`--color-card-*` pre-computed color-mix + `.dock-fade`).**
  `theme.css:38` "Pre-computed color-mix() values for GlassDock (avoids real-time color
  space conversion)" + a `.dark` mirror at `:155`; `transitions.css:95` `.dock-fade`. These
  are pin-staleness workarounds the AX dock makes redundant — delete after the bump.
- **F7 — ZERO new-idiom adoption (the §16.3 headline).** Grepping
  `GlassTimeline`/`MetricBadge`/`useViewTransition`/`<Section>` in `src/` returns ONLY
  LOCAL files (words' own `composables/virtual/`, `custom/sidebar/`, `custom/navigation/`)
  — NOT library adoption. None of the AX-shipped idioms (GlassTimeline, MetricBadge,
  Section, useViewTransition, `.text-display-*`, `--section-color-*`, `.deferred-section`,
  useYieldToMain) are adopted across the 142 import sites. words was DROPPED (not folded)
  by the prior charter (slice 16 F7) — W34 closes the §16.4 violation by RECORDING its full
  leg.
- **CLEAN — no retired-subpath sites.** No live `glass-ui/pagination`/`virtual`/
  `glass-carousel`/`dock-group`/`composables/dark`/`composables/keyboard` in words `src/`.
  `proof:consumers:static` does NOT flag words (it only RED-flags speedtest's
  `/responsive-tabs`).

---

## fourier — import surface census

35+ files import glass-ui. Subpath census — a DOCK + Configurator + Slider HEAVY consumer
(the prime downstream-validation target for the AX dock W01-W06 + graphics W07-W08 ships):

```
35 /button   7 /slider   7 /metric-badge   7 (root)   5 /select   5 /dialog
 4 /configurator  3 /tabs  3 /dock  2 /tooltip  2 /toast  2 /styles/animations
 2 /sidebar  2 /hover-popover  2 /hover-card  2 /dropdown-menu  2 /collapsible  2 /badge
 1 /switch  1 /styles  1 /pagination(*comment only)  1 /infinite-scroll  1 /dark  1 /animated-digit
```

### fourier findings

- **F1 — `^3.1.0 → AX` pin bump holds 4 already-shipped fixes hostage.** Confirmed at HEAD:
  the dock VT-name `useId()` fix (`GlassDock.vue:205` `glass-dock-${useId()}` — app-unique,
  resolves the co-mounted-dock collision), the `ConfiguratorLayer` `inert` a11y fix
  (`ConfiguratorLayer.vue:138` `:inert="!open || undefined"`), `asideSide`
  (`Configurator.vue`), and `useTextHighlight` (`src/composables/motion/useTextHighlight.ts`).
  All AT HEAD, none in fourier's resolved 3.1.0. Pin bump un-blocks all four.
- **F2 — the co-mounted-dock VT collision is REAL (and fixed at HEAD).** Fourier mounts
  THREE+ docks together in `VisualizationView.vue` (`EditorControlsDock` + `CanvasControlsDock`
  + `AnimationControls`) plus `FullscreenViewer`. The slice-12 finding ("two co-mounted
  docks VT-name collision → dropped morph snapshot + ~13 red e2e") is the regression the
  HEAD `useId()` per-instance mint closes. Fourier is the BINDING live-validation surface
  for W01's dock-morph + the W00 π-lane VT-name gate after the bump.
- **F3 — 14 `.cartoon-card` dead-class divs (CONFIRMED, 25 occurrences across 14 files).**
  `style.css:98-108` carries a DELIBERATE `.cartoon-card` shim (`@utility cartoon-card {
  @apply cartoon-surface; }`) — fourier knows glass-ui removed `.cartoon-card` at C.W5 and
  re-binds it locally against the surviving `cartoon-surface` decoration utility. The W34
  route is `<Card surface="cartoon">` migration, but NOTE: the shim is a documented,
  cascade-correct re-bind (it composes `cartoon-surface`, NOT a dead orphan off the cascade
  per the CLAUDE.md cartoon-shadow contract) — so this is an IDIOM-MAXIMIZATION leg (adopt
  `<Card surface="cartoon">`), not a paint-breakage. Lower urgency than words' F1/F2.
- **F4 — `SliderControl.vue` + local `GlassTimeline.vue` are ALREADY IDIOMATIC (the W34
  slice-12 census is STALE here).** The W34 census claims "`SliderControl.vue` re-deriving
  `LabeledSlider`" — but fourier MIGRATED both (its own tranche P.W5 Lane B) from the
  175/221-LOC shadow recipes to `<Slider variant="glass-scrubber">`, preserving only a thin
  label + numeric-input chassis wrapper. They CONSUME the library slider + the glass-scrubber
  variant + the typed `DockContext` keep-open seam correctly. The residual gap is a
  feature-comparison (the chassis wrapper vs adopting the library's `LabeledSlider`) — routed
  to W21's LabeledField scope as an OPTIONAL feature-gap, NOT a shadow-fork deletion.
  **Correction to the ledger: this leg is far closer to idiomatic than slice-12 records.**
- **F5 — 0 `hsl(var(` sites (CLEAN).** Fourier has zero never-paint double-wraps. Better
  token hygiene than words.
- **F6 — missing `@source` directive.** `style.css:3` imports `@mkbabb/glass-ui/styles`,
  no `@source` directive found. Same content-scan gap as words F5.
- **CLEAN — no LIVE retired-subpath sites.** The one `glass-ui/pagination` hit is a COMMENT
  in `useOffsetPagination.ts:11` documenting that the subpath was retired at v1.0 — i.e.
  fourier already migrated OFF it. `proof:consumers:static` does NOT flag fourier.

---

## DONE / PARTIAL / NOT-STARTED disposition

| Item | Status |
|---|---|
| W34 wave doc (`AX.W34-…md`) authored | **DONE** (357-line spec at HEAD) |
| `coordination/CONSTELLATION.md` exists | **PARTIAL** — exists (W17→W30 slides seam, 39 lines) but the §16 RECEIVER BANDS for words/fourier (HEAD/branch/porcelain + commit-vs-handoff disposition) are NOT yet appended. The doc has only the constellation/slides seam + 2 `from-*` handoff annexes. words/fourier each get a §3 one-line mention only |
| `audit/W34-…json` (the born-RED ledger) | **NOT-STARTED** — `docs/tranches/AX/audit/W34*.json` does NOT exist. The §16.3 per-consumer idiom census + carry-tag tables + the carry-closure meta-assertion are unwritten |
| words leg recorded with `{receiver-wave, close-gate}` | **NOT-STARTED** |
| fourier leg recorded with `{receiver-wave, close-gate}` | **NOT-STARTED** |
| Per-consumer VISUAL-TRUTH close-gate spec | **NOT-STARTED** |
| Consumer-side adoption PRs | **NOT-STARTED** (correctly — gated on the AX publish; sibling-executed) |

W34 itself is **AT-RISK / mostly NOT-STARTED**: the wave doc is authored but the born-RED
ledger json (its primary deliverable) and the §16 receiver bands in CONSTELLATION.md are
absent. The wave's three RED witnesses still hold at HEAD (no §16 bands; no ledger json; the
consumer idioms live-present + unrouted).

---

## DEFERRED items that FOLD INTO this tranche

1. **The words leg in full** — words was DROPPED (not folded) by the prior charter; the
   §16.4 zero-loss mandate forces it back IN. Its glass-ui-OWNED debt routes: dock un-break
   → pin bump (W41 publish hinge); `hsl(var())` → direct `var()` (consumer-side); `@source`
   deadlink → W25a + consumer leg; Fraunces → W22 adjudication (DECIDE, presets-in-consumers);
   142-site idiom-adoption corpus → consumer leg. The `manual` stale prop → the W03/W00
   binding-verification e2e sweep.
2. **The fourier leg** — pin bump (unblocks 4 shipped fixes); `.cartoon-card` → `<Card
   surface="cartoon">`; the LabeledSlider feature-gap → W21; `@source`. fourier is the PRIME
   live-validation target for the AX dock band (W01-W06) + Configurator + graphics ships.
3. **The publish-currency hinge** — both consumers measure STALE builds (3.0.0 / 3.1.0). The
   restoration gate for the whole class is the AX publish + the pin bump, recorded as the
   W41 hinge — NOT a re-fix of HEAD-already-fixed code.

---

## GAPS — unaddressed prompts / plan divergences

1. **The W34 ledger json does not exist.** The wave's central artefact
   (`audit/W34-cross-constellation-idiom-consumer-adoption-ledger.json`) is unwritten — the
   per-consumer census + carry-tags + carry-closure meta-assertion are unrouted. W34 is
   born-RED and STILL RED at HEAD.
2. **CONSTELLATION.md lacks the §16 receiver bands.** It carries only the W17→W30 slides
   seam + 2 `from-*` annexes; the words/fourier HEAD/branch/porcelain columns +
   commit-vs-handoff disposition are not appended (witness 1 still holds).
3. **The slice-12 fourier SliderControl/GlassTimeline census claim is STALE.** Both are
   already migrated to `<Slider variant="glass-scrubber">` (idiomatic), not shadow forks.
   The ledger must record the CORRECTED disposition (feature-gap to W21, not fork-deletion)
   — a mis-record would book a deletion leg against already-idiomatic code.
4. **words' workspace install is hoisted to root (`words/node_modules`, 3.0.0); `frontend/
   node_modules/@mkbabb` is EMPTY.** Any consumer-side e2e binding-verification must resolve
   the hoisted root install. Recorded so the words leg's π-lane audit points at the right
   tree.
5. **Disposition mismatch**: words is DIRTY (backend in flight → handoff-patch); fourier
   `web/` is CLEAN (clean-NOW). The §16 bands must record this so the leg dispatch picks the
   right ritual (the 2026-05-18 Q dirty-tree lesson).
6. **Fraunces is a presets-in-consumers DECISION, not auto-drift.** W34's wording "repoint
   off Fraunces" risks violating presets-in-consumers if applied mechanically. The leg must
   ADJUDICATE (deliberate brand font is the consumer's right); record the W22-default vs
   consumer-override boundary explicitly.

---

## Gestalt PATH FORWARD (planning — no code)

The C-words-fourier lane's product is the **§16.3 receiver records for two consumers**,
folded into the W34 ledger + CONSTELLATION.md §16 bands — NOT consumer source edits (those
are sibling-executed, gated on the AX publish via W41).

1. **Author the W34 born-RED ledger json** with the two consumer legs. For each: the
   idiom-adoption list, the glass-ui-OWNED-debt → NAMED-wave routing (words: W41 pin-bump +
   W25a `@source` + W22 Fraunces + W03 binding-sweep; fourier: W41 pin-bump + W21 LabeledField
   feature-gap + `<Card surface="cartoon">` migration target), the pin-bump → W41 publish-hinge
   gating, and the consumer-side VISUAL-TRUTH close-gate (a paired BEFORE/AFTER + DELTA live
   Playwright + frontend-design audit on the consumer surface post-publish).
2. **Extend CONSTELLATION.md with the §16 receiver bands** — the words + fourier
   HEAD/branch/porcelain + commit-vs-handoff disposition rows (words = handoff-patch / dirty;
   fourier = clean-NOW), DISJOINT from the W17→W30 slides section + the W28 band-K opener.
3. **CORRECT the stale slice-12 fourier record** — `SliderControl`/`GlassTimeline` are
   idiomatic glass-scrubber consumers; route only the LabeledField feature-gap to W21.
4. **Honor presets-in-consumers for Fraunces** — record it as a consumer DECISION (adjudicate),
   not an auto-strip. The W22 boundary is "the library DEFAULT == what library surfaces
   render"; a consumer's brand override is legitimate.
5. **Record the carry-closure meta-assertion** (every leg carries `{receiver-wave, close-gate}`;
   zero un-receivered §16 items — the W33 `proof:ax-final` input). Each leg's terminal is the
   CONSUMER's own live audit post-publish, NOT a recorded route (the chronic-closure
   meta-invariant — no bare "handed off" terminal).
6. **The forcing function is the AX publish.** Every words/fourier leg greens ONLY after the
   AX cut publishes + the consumer bumps its pin (W41 hinge). Do NOT re-fix HEAD-already-fixed
   code (the dock un-break, the dock VT useId, ConfiguratorLayer inert, asideSide,
   useTextHighlight) — they are a publish-currency gap, not a code gap.

The cross-repo idiom is healthy in DIRECTION: both consumers consume the library broadly via
flat subpaths (the correct payload discipline), neither carries a live retired-subpath site,
and fourier already migrated its slider/timeline shadows onto the library variants. The gap
is CURRENCY (stale pins) + RECORDING (the unwritten W34 ledger) — not a structural
mis-consumption.
