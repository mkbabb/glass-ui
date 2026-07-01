# B8 — demo/ ARCHITECTURE census (manifest sanity · duplication · chassis bypass · category fit · dead helpers)

Lens B8 of the RESPEC-GESTALT 32-lens audit. Scope: `demo/stories/` (156 `.vue` files, 120 manifest-registered
pages, 11 categories). Verified on disk 2026-07-01, `tranche/BG` HEAD `976dc890`.

## Verdict

The manifest itself is **structurally sound** — zero orphans, zero dangling references, zero keyless routes
(120/120 rows resolve to a real file, 3 non-manifest files under category dirs are legitimate colocated
sub-components, not orphans). The **category taxonomy is not sprawled** — the 11 categories range 4–14 pages
(no 25+ outlier), so the premise "has it sprawled" is **not borne out at the top level**. But this audit's own
`A-demo-arch.md` (read first, corroborated below) already found the real disease: **designed-but-never-wired
chassis** (`VizStudio`, `StorySectionHeader`, `DemoFrame`) and **hand-rolled monoliths sitting beside the chassis
meant to replace them**. This pass CONFIRMS those findings on disk, WIDENS the `VizStudio` bypass list (2 more
non-adopters than A-demo-arch named), and adds three findings A-demo-arch did not surface: a **3-way duplicate
Timeline demo**, a **3-way fragmented Scroll demo**, and a **misplaced/underused chassis file** (`CodeBlock.vue`,
1 consumer) plus a **glob-namespace leak** (the `aurora/` sub-component dir sits inside the same
`import.meta.glob("./*/*.vue")` pattern as real category dirs). Net consolidation: **120 pages → ~114** through
2 clean content merges, plus the already-proposed `VizStudio` adoption wave now needs 2 more files in scope.

---

## FINDINGS

### F1 — Manifest sanity: CLEAN (positive finding, corrects a task-prompt premise)

Verified by direct parse of `demo/stories/manifest.ts`'s `s()` calls against disk:

- **120 manifest rows, 120 resolve.** Every `s("<cat>", "<id>", …)` call has a matching
  `demo/stories/<cat>/<id>.vue` on disk. Zero missing-file rows (`demo/stories/manifest.ts:129` `lazy()`'s
  fallback path is never exercised in the committed tree).
- **Zero orphan pages under category dirs.** Files inside the 11 real category directories not referenced by any
  manifest row: `substrates/VizStudio.vue`, `dock/DockStage.vue`, `dock/DockExampleTile.vue` — all three are
  colocated **chassis/sub-components** imported directly by sibling pages (`substrates/aurora.vue:9`,
  `dock/overview.vue:49`, `dock/dock-gallery.vue`), not dead pages.
- **156 `.vue` files total = 120 pages + 3 category-dir chassis (above) + 33 top-level/colocated chassis
  (`StoryPage.vue`, `ShowcaseFrame.vue`, `_chassis/`, `aurora/` dir, `dock/examples/` dir).** The 156 figure in
  the seed context is the raw file count, not the page count — 120 is the correct page-count denominator for any
  "N pages" claim in this and sibling reports.

**Category spread (verified count per category, script-derived from `manifest.ts:480-1273`):**

| category | pages | category | pages |
|---|---|---|---|
| containers | 14 | dock | 9 |
| data | 14 | feedback | 8 |
| foundations | 13 | navigation | **4** |
| forms | 12 | | |
| motion | 12 | | |
| compositions | 12 | | |
| substrates | 11 | | |
| display | 11 | | |

No category exceeds 14 (9% of the corpus); the ceiling-to-floor ratio is 3.5×, not the 6×+ that would indicate
real sprawl. **`navigation` at 4 is thin but not wrong** — its four rows (Tabs, Carousel, HeaderRibbon,
ToC-Tracking) are genuinely disjoint navigation primitives with no overlap (`demo/stories/manifest.ts:875-902`);
padding it with unrelated content would be worse than leaving it small. **Verdict: the 11-category taxonomy fits
the corpus. The consolidation opportunity is INSIDE categories (duplicate/fragmented pages), not at the category
boundary.**

### F2 — VizStudio chassis bypass: WIDER than the existing `A-demo-arch.md` F6 finding (severity: major)

`A-demo-arch.md` F6 (`docs/tranches/BG/audit/A-demo-arch.md:97-109`) already found that `VizStudio.vue` — whose
own header comment calls it "the ONE shape EVERY viz studio composes, never a per-viz re-fork"
(`demo/stories/substrates/VizStudio.vue:1-35`) — is adopted by **only `substrates/aurora.vue`**, and named
`blob.vue`/`constellation.vue`/`fourier-field.vue` as the non-adopters. Re-verified on disk + **widened**: of the
12 `substrates/` pages, the ones that actually instantiate `<Configurator>`+`<StoryPage>` by hand (the exact shape
VizStudio wraps) are:

| page | uses VizStudio? | hand-rolls `<StoryPage><Configurator #stage #controls>`? | lines |
|---|---|---|---|
| `aurora.vue` | ✅ (the sole adopter) | — | 176 |
| `blob.vue` | ❌ | ✅ (`blob.vue:424,460,507,566`) | 870 |
| `fourier-field.vue` | ❌ | ✅ (`fourier-field.vue:275,301,308,360`) | 490 |
| `concentric.vue` | ❌ **(new — not named by A-demo-arch)** | ✅ (`concentric.vue:71,77,78,90`) | 205 |
| `paper-grid.vue` | ❌ **(new — not named by A-demo-arch)** | ✅ (`paper-grid.vue:121,131,132,146`) | 337 |
| `constellation.vue` | ❌ | no (`<StoryPage>` only, no Configurator) | 759 |
| `dot-matrix.vue`, `dot-flow-field.vue`, `goo-dot.vue`, `glass-material.vue`, `glass-panel.vue` | ❌ | no (simpler pages, no per-viz control column) | 100/100/115/384/87 |

**5 of 6 pages that need the configurator-right shape hand-roll it** (aurora is the lone adopter). This is not a
cosmetic gap: `VizStudio.vue`'s own header names the exact disease it fixes — "some studios put controls below
the stage, some bolted a grid behind a card (the condemned 'double-card-with-grid'), some bury TWO headers IN the
card" — and 4 pages (`blob`, `fourier-field`, `concentric`, `paper-grid`) currently re-derive that same
`<StoryPage><Configurator asideSide="right"?>` scaffold independently, with no shared source of truth for the
"controls-right, one rounded card, hero-subpath-on-top" contract. `concentric.vue:77` does not even pass
`asideSide="right"` explicitly — it is relying on `Configurator`'s own default, which is fine only as long as
every hand-rolled instance agrees, which is precisely the coordination VizStudio exists to remove.

**Amendment to `A-demo-arch.md`'s proposed `BG.W-VIZ-STUDIO-ADOPT`:** the file-list scope must read
`{blob, constellation, fourier-field, concentric, paper-grid}` — 5 pages, not 3. `constellation.vue` (759 lines,
no `Configurator`) may turn out not to need VizStudio's `#controls` slot at all if its interaction model is truly
control-less; that determination belongs to the wave, but its 759-line size alone should be re-examined against
the aurora exemplar's sub-directory-colocation pattern (`aurora/config/`, `aurora/sections/`) regardless of
whether it ends up wrapped in `<VizStudio>`.

### F3 — `StorySectionHeader.vue` is DEAD (confirms `A-demo-arch.md` F3, adds the supersession evidence)

`A-demo-arch.md` F3 already flagged zero importers. Independently re-verified with a repo-wide grep — **confirmed:
`StorySectionHeader.vue` (105 lines, `demo/stories/StorySectionHeader.vue`) has ZERO consumers anywhere in
`demo/`.** New evidence this pass adds: the file's own header claims to be "the 42nd-paste preventer" for an
IconChip-led `border-l-[3px]` accent-rail section header
(`demo/stories/StorySectionHeader.vue:2-13`), but a grep for real (non-comment) `border-l-[3px]` usage across all
34 files that mention the string shows **only 4 real template hits** — `compositions/math-paper.vue` (3, its own
hand-rolled `.paper-ink-mark` register, a *documented distinct* pattern per CLAUDE.md's HandMark section, not the
IconChip shape) and the 3 timeline pages (1 each, see F5). The other 30 files mention the string **only inside a
comment** explaining that they deliberately use an **inline `:style="{borderLeft: …}"`** page-hero accent instead
(e.g. `containers/dialog.vue:23-24`, `forms/inputs.vue:11-12`: *"PH3-safe (inline borderLeft, not the
`border-l-[3px]` + `<IconChip>` double-header shape)"*). So `StorySectionHeader.vue` was minted for a shape a
PRIOR wave (`BC.W-PAGE-HIERARCHY PH3`) had already eliminated site-wide in favor of a different mechanism — the
primitive shipped **after** its target pattern was gone. This is over-contrivance in its purest form: a
"never re-paste" primitive with a paste-count of zero to prevent.

### F4 — `CodeBlock.vue` sits below the library's own ≥2-consumer bar (severity: minor)

`CodeBlock.vue` (the multi-line-code rung of "the ONE demo code register", `demo/stories/CodeBlock.vue:1-3`) is
imported by exactly **one** page (`demo/stories/display/card.vue`). Its sibling `Code.vue` (inline-code rung) is
healthily adopted (10+ importers). Not urgent — demo-private, low LOC — but it is the same "component minted,
adoption never followed" pattern as F2/F3 at smaller scale, and the design language's own ≥2-consumer bar
(CLAUDE.md Design Axis 3) would flag it in `src/`; the demo layer has no equivalent gate (`proof:colocation`/
`proof:claude-structure-sync` only walk `src/`), so this class of defect accretes silently on the demo side.

### F5 — Timeline: THREE pages, ONE component, near-total redundancy (severity: major — new finding, not in
`A-demo-arch.md`)

`data/timeline.vue` (141L), `data/timeline-segmented.vue` (236L), `data/timeline-continuous.vue` (294L) — all
three import **only** `GlassTimeline` (verified: identical single-component import set,
`demo/stories/data/timeline{,-segmented,-continuous}.vue`). The manifest's own blurb for
`timeline-continuous` reads, verbatim: *"One rounded-pill rail with N absolutely-positioned region children —
**the same segment shape as the segmented [variant]**…"* (`demo/stories/manifest.ts`, `data/timeline-continuous`
row) — the demo author's own words concede the near-duplication. These are three navigable top-level pages (3
sidebar/dock nav entries, 3 route entries, 3 separate hero headers) demonstrating the SAME primitive's THREE
visual registers (discrete markers / segmented progress / continuous rail), where a single page with an internal
mode switch (`<SegmentedTabs>` or a `<StorySection>`-per-register layout, the exact pattern `curve-gallery.vue`
already uses for its own N-register single-page catalogue) would read as one coherent "Timeline" demonstration
instead of three thin, easily-confused nav items. 671 combined lines; a merged page composing the 3 existing
render bodies as sections would plausibly land under ~450 lines (removing the 3× duplicated `StoryPage`/
`StorySection` chassis wrapper + hero/subpath boilerplate each currently repeats).

**Consolidation:** `data/timeline.vue` + `data/timeline-segmented.vue` + `data/timeline-continuous.vue` → ONE
`data/timeline.vue` with three `<StorySection>` registers (discrete / segmented / continuous), title "Timeline".
`data: 14 → 12`.

### F6 — Scroll: THREE pages fragmenting one coherent topic (severity: moderate — new finding, not in
`A-demo-arch.md`)

`motion/scroll-vt.vue` (150L, "the native scroll-driven facilities"), `motion/scroll-system.vue` (241L,
"useScrollTrigger — the ONE scroll reader"), `motion/scroll-choreography.vue` (190L, "the SOTA scroll-driven
choreography register") are three DISTINCT mechanisms per their own blurbs (native CSS `scroll()`/`view()`
timelines vs. the JS `useScrollTrigger` reader vs. the `.scroll-build`/`.scroll-cascade`/`.scroll-pin` recipe
family) — this is not the same-component redundancy F5 is. But three separately-titled, separately-routed,
separately-navigable pages under one 12-page category (`motion`, already the joint-densest non-container/data
category) for what a user experiences as "the scroll stuff" is an **information-architecture fragmentation**, not
a technical one: a visitor cannot tell from three near-identical titles ("Scroll & View Transitions" / "Scroll
System" / "Scroll Choreography") which page demonstrates which layer without opening all three. 581 combined
lines — small enough that a single `motion/scroll.vue` with three `<StorySection>` registers (native / reader /
choreography, in that dependency order — choreography is built on the other two per CLAUDE.md's own
BB.W-SCROLL-MOTION doc) is the coherent-product read the mandate asks for over three fragments.

**Consolidation:** `motion/scroll-vt.vue` + `motion/scroll-system.vue` + `motion/scroll-choreography.vue` → ONE
`motion/scroll.vue`. `motion: 12 → 10`.

### F7 — `compositions` category holds two atom-scale pages that read as primitive demos, not compositions
(severity: minor — taxonomy fit, new finding)

`compositions/labeled-field.vue` (161L) demonstrates the `LabeledField` family (`LabeledInput`/`LabeledSelect`/
`LabeledSlider`/`LabeledSwitch`) — a **forms control wrapper**, sitting in a category whose other 11 members are
full page-assemblies (`auth-shell`, `settings`, `gate-pattern`, `math-paper`, `form-validation`). `forms/label.vue`
already exists in the sibling `forms` category and covers the adjacent `Label` primitive
(`demo/stories/manifest.ts` forms block) — a visitor learning "how do I label a field" has to know to look in TWO
categories for the plain `<Label>` pattern (forms) vs. the `<LabeledField>` wrapper pattern (compositions).
`compositions/icon-tooltip.vue` (45L, the smallest page in the entire corpus) demonstrates a single small
component pairing (`IconTooltip`), with no composition of unrelated primitives — it reads as a `containers/`- or
`display/`-scale atom demo, not a "compositions" page. Neither is a content DUPLICATE (no page count reduction),
but both are **taxonomy misplacements** that dilute the `compositions` category's own identity (full-page
assemblies) and split a coherent form-labeling topic across two categories.

### F8 — `aurora/` sub-component directory sits inside the manifest's own glob namespace (severity: cosmetic,
hygiene)

`demo/stories/manifest.ts:127` resolves story components via `import.meta.glob<{ default: Component }>
("./*/*.vue")` — exactly two path segments. `demo/stories/aurora/` (the colocated sub-component home for
`substrates/aurora.vue`'s studio machinery — `AuroraConfigDock.vue`, `AuroraStage.vue`, `NucleiOverlay.vue`,
`OklchStopRow.vue`, `PresetPickerRow.vue`, 5 files at exactly 2 segments deep) is **swept into the same glob
namespace as the 11 real category directories**, even though "aurora" is not, and was never meant to be, a
category id. The manifest's own doc comment says a story is "a SFC at `demo/stories/<category>/<id>.vue`"
(`manifest.ts:4-6`) — `aurora/AuroraStage.vue` matches that shape by accident. This causes no runtime defect
(`lazy()` only ever looks up `modules["./${category}/${id}.vue"]` for one of the 11 known category ids, so the 5
aurora files are simply unindexed dead weight in the glob's module map), but it is exactly the kind of
"looks like a page, isn't" trap that makes `demo/stories/` harder to read at a glance and is inconsistent with the
`src/components/custom/` colocation convention it is imitating (which nests sub-component dirs one level DEEPER
than the glob-relevant shape, e.g. `custom/aurora/composables/`, never `custom/<flat-sibling-of-a-component>/`).
`dock/examples/` (3 segments) and `_chassis/` (a leading-underscore-fenced name) both avoid the trap correctly —
`aurora/` is the one colocation dir that does not.

### F9 — `forms/checks.vue` vs `forms/label.vue`: high import-overlap (0.86 Jaccard), CHECKED and CLEARED

Flagged by automated component-overlap scan (`Checkbox`/`RadioGroup`/`Switch`/`Label` shared 6-of-7 imports).
Manually verified: this is **legitimate, not duplicate** — `checks.vue` demonstrates the toggle-control family
itself (Checkbox/RadioGroup/Switch), `label.vue` demonstrates the `<Label>`/labeling PATTERN across those same
controls (association, required/error states, `for`/`id` wiring). Reusing the same control set to demo a
different axis (the control vs. its label contract) is correct DRY-of-primitives, not duplicate coverage. No
action.

### F10 — `dock/cta-receive.vue` vs `dock/morph-showcase.vue`: 100% import-overlap (3/3), CHECKED and CLEARED

Both import only `{GlassDock, DockIconButton, Button}`. Manually verified as **legitimate** — `cta-receive.vue`
demonstrates `useDockCtaReceive` (external-CTA-flies-into-dock), `morph-showcase.vue` demonstrates
`useDockOrientationMorph` (V↔H topology morph) — two named, shipped, distinct composables per CLAUDE.md
(BB.B2 W-DOCKMORPH-CTA vs. AZ.W-MORPH-SHOWCASE). Import-set overlap is a poor duplication proxy for small pages
where the component vocabulary (GlassDock + a button) is necessarily shared across every dock demo; the composable
wiring, not the template tag set, is what distinguishes these pages. No action — but this result is recorded
because it shows the automated overlap heuristic alone is **not sufficient** for a duplication census; every
positive this pass reports (F5) was hand-verified past the heuristic, not asserted from Jaccard alone.

### F11 — `containers/drawer.vue` vs `compositions/drawer-live-behind.vue`: 0.70 import-overlap, CHECKED and
CLEARED

`containers/drawer.vue` does not reference `mode="live-behind"` anywhere (`grep -c "live-behind" containers/drawer.vue` = 0)
— it demos the default modal Drawer only. `compositions/drawer-live-behind.vue` is the dedicated demo for the
`mode="live-behind"` prop (CLAUDE.md "Drawer modes"). Distinct facets of the same component family, correctly
split by DEPTH (a primitive page vs. a named-mode composition page), matching the category's own contract. No
action.

---

## CONSOLIDATION MATH

| move | pages before | pages after | delta |
|---|---|---|---|
| F5 — merge `data/timeline{,-segmented,-continuous}.vue` → `data/timeline.vue` | 3 | 1 | **−2** |
| F6 — merge `motion/scroll-{vt,system,choreography}.vue` → `motion/scroll.vue` | 3 | 1 | **−2** |
| F3 — delete `StorySectionHeader.vue` (0 consumers; not a manifest page, but a dead file) | — | — | 0 pages, **−105 LOC dead file** |
| F7 — re-home `compositions/labeled-field.vue` → `forms/`, `compositions/icon-tooltip.vue` → `containers/` or `display/` | 12 (compositions) | 10 (compositions) | **0 net** (recategorize, forms/containers +1 each) |
| **Total page-count effect** | **120** | **~116** | **−4 nav-level pages** |

Category counts after the two content-merges + the recategorization: `data 14→12`, `motion 12→10`,
`compositions 12→10`, `forms 12→13`, `containers 14→15`. Range stays 4–15 — still no sprawl. **The right page
count for this corpus is ~114–116**, not a large cut from 120: the corpus is NOT bloated with redundant pages in
aggregate (11/120 pages ≈ 9% touched by this census's findings); the disease B8 finds is concentrated
(Timeline ×3, Scroll ×3) plus the chassis-adoption gap (F2/F3/F4), which is a QUALITY defect (unwired
infrastructure, monolith pages) rather than a page-COUNT defect. A page-count-only remediation would miss the
real fix.

---

## FOLD CANDIDATES (for the AMENDED-GESTALT-PLAN)

1. **AMEND `BG.W-VIZ-STUDIO-ADOPT`** (already proposed in `A-demo-arch.md`) — widen its file-list scope from
   `{blob, constellation, fourier-field}` to `{blob, fourier-field, concentric, paper-grid}` (4 confirmed
   hand-rolled `<StoryPage><Configurator>` bypasses) `+ constellation` on a case-by-case "does it need the
   `#controls` slot at all" determination (759 lines, no `Configurator` — may be a different disease, a
   monolith-without-Configurator, not a VizStudio-bypass). Kind: **amend-wave** (scope widen, not a new wave).

2. **NEW WAVE — `BG.W-DEMO-DUP-MERGE`: merge Timeline×3 and Scroll×3 into single sectioned pages.**
   Gestalt approach: NOT a page-count-cutting exercise — the merged pages compose the SAME `<StorySection>`
   chassis every other multi-register page already uses (`motion/curve-gallery.vue` is the exemplar: one page,
   N registers, one nav entry). `data/timeline.vue` gets three `<StorySection>` blocks (Discrete / Segmented /
   Continuous), each hosting the EXISTING `GlassTimeline` usage bodies verbatim (a copy-then-delete-the-wrapper
   move, not a rewrite) — zero behavior change, one nav entry instead of three, one hero/subpath header instead
   of three. `motion/scroll.vue` gets three `<StorySection>` blocks in dependency order (native → reader →
   choreography), same mechanical move. Kind: **new-wave**, mechanical/low-risk, high nav-clarity payoff.

3. **NEW (small) WAVE, or fold into `BG.W-DEMO-CHASSIS-CONSOLIDATE`'s scope — `compositions` taxonomy
   correction.** Move `compositions/labeled-field.vue` → `forms/labeled-field.vue` (adjacent to
   `forms/label.vue`, closing the "which category teaches field-labeling" split); move
   `compositions/icon-tooltip.vue` → `containers/icon-tooltip.vue` or fold its 45-line content as a
   `<StorySection>` inside `containers/tooltip.vue` (an icon-triggered tooltip is a tooltip variant, not a
   standalone page — the SAME "one component, N registers, one page" pattern as finding 2, at smaller scale).
   Kind: **plan-doc-edit** if bundled into the existing chassis-consolidate wave's file list, or **prune-wave**
   if `icon-tooltip` folds fully into `tooltip.vue` (page count −1 more, `120→~115`).

4. **FOLD INTO `BG.W-DEMO-CHASSIS-CONSOLIDATE`** (already proposed) — its π bar should ALSO assert
   `grep -rn "aurora/AuroraStage\|aurora/NucleiOverlay" demo/stories/manifest.ts` stays 0 (the F8
   glob-namespace concern is a documentation/hygiene note for that wave's author, not a separate wave: renaming
   `demo/stories/aurora/` → `demo/stories/substrates/aurora/` (nesting it one level deeper, matching
   `dock/examples/`'s 3-segment shape) removes it from the `./*/*.vue` glob for free and is a single `git mv` +
   import-path update, in-scope for whichever wave already touches `substrates/aurora.vue`'s imports. Kind:
   **plan-doc-edit** (append to an existing wave's file list, not a new wave).

5. **DEFER-HONEST — `CodeBlock.vue`'s 1-consumer status (F4) and `toast.vue`/`toaster.vue`'s soft overlap.**
   Neither rises to the severity of a dedicated wave; both are candidates for a "while you're in the file"
   opportunistic fold if `BG.W-DEMO-CHASSIS-CONSOLIDATE` or a future demo pass touches `display/card.vue` or the
   `feedback/` category, but naming them as standalone waves would itself be the over-contrivance the mandate
   condemns (a wave-per-2-page-cleanup). Kind: **defer-honest**.

---

## Cross-refs

- Builds on `docs/tranches/BG/audit/A-demo-arch.md` F2/F3/F4/F6/F9 (dead chassis, VizStudio gap, manifest
  fragmentation) — this pass CONFIRMS those on independent re-derivation and WIDENS F6's file scope by 2 pages
  (concentric, paper-grid).
- Does NOT re-litigate `A-demo-arch.md` F1 (route-transition collision), F5 (StoryHero/StoryPage comment bloat),
  F7 (liquid-playground/overview dock monoliths), F8 (shell-dock ℱ + rail duplication) — those are out of B8's
  scope (manifest/duplication/chassis-bypass/category-fit/dead-helpers) and already have proposed waves.
