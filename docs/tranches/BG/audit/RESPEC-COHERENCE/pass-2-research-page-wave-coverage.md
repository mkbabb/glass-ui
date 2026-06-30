# PASS 1 — PAGE↔WAVE COVERAGE (BG cross-wave coherence + friction-history audit)

**Lens:** PAGE↔WAVE COVERAGE · **Pass:** 1 (baseline, merged re-run) · **Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `4c761b64`
**Read-mostly** — wrote only this file. **Siblings-intact:** `verify-siblings-intact.mjs --quiet` exit 0 at start.
**Supersedes** the earlier same-lens draft: keeps its load-bearing C1/C2 carve-chain + tier-classification + D-G2
findings, ADDS the phantom-owner cluster (§3.1/§3.2), the `PaletteLayer` dead file (§3.5), the section-landing gap
(§3.4), and the `AppShell.vue` double-edit (§4-C4).

---

## 0. METHOD

Enumerated `demo/stories/**/*.vue` (156 files), parsed `manifest.ts` for the `s(cat,id)` route registry (**120**
routes, via `import.meta.glob("./*/*.vue")`), parsed `router.ts` (it adds **+11** `/<cat>` section-landing routes),
cross-referenced against BD `PAGES.json` (118), `PASS-E.md`, the 12 per-category `page-audit/*.md` GESTALTs, and the
BG wave set (`EXECUTION-PROGRESS.md` 147 rows · `bg-build-map.md` specs · `AMENDED-WAVE-PLAN.md` G2 ·
`bg-gestalt-roster.md`). USED the existing BD corpus per the seed discipline (don't re-derive settled findings).

---

## 1. THE PAGE CORPUS IS 120 ROUTED PAGES, NOT 156 — the "+38 newer" seed framing is a MISCOUNT

The 156 `.vue` decompose: **120 routed story pages** + **36 non-route** files (12 root chassis · 1 `_chassis/DemoFrame`
· 13 aurora studio sub-components · 9 dock sub-components · 1 `substrates/VizStudio`). `156 − 118 = 38`, but **36 of
those are chassis/sub-components, not pages.** The genuine routed-page delta is **+2**, both dock.

**Independently re-computed PASS-E→NOW route delta (set diff, not just count):**

| | count | detail |
|---|---|---|
| BD routes (PAGES.json) | 118 | |
| Current story routes | 120 | all 120 have a backing SFC — **0 broken-route manifest rows** |
| **NEW since BD** | **+2** | `dock/dock-gallery`, `dock/liquid-playground` |
| GONE / renamed | **0** | every BD slug still resolves on disk — no rename masks an orphan |

Only the dock category changed (7→9). All 10 other categories are route-identical to BD. **The BD PASS-E corpus + the
58 per-page-deep audits are REUSABLE — verify the +2, don't re-derive 120.**

---

## 2. THE COVERAGE MODEL — ownership is COMPONENT/SYSTEM-shaped, not page-shaped (3 tiers)

The 126 distinct BG.W-* waves are organized around components/tokens/systems, NOT demo pages. `bg-build-map.md` names
only a handful of routes in any wave's `Files:`. Page correctness is owned 3 ways:

### Tier A — the UNIVERSAL net: `BG.W-PAGE-COMPONENT-AUDIT` (WS12.6) captures ALL 120 pages

The keystone coverage fact: WS12.6 = the **480-capture dual-engine both-modes** verdict =
**the LIVE 120 `s()` routes × 2 engines × 2 modes** (CONFIRMED verbatim: `BG-WS12-coherence-congruence/
SPEC-pass2-converged.md:431` "the binding run is the LIVE 120 `s()` routes × 2…"; `SPEC-pass3.md:25` "120-route ×
2-engine × 2-mode"; 480/4 = 120). The page set is **manifest-DERIVED** (not a hand-list), so a new page auto-enrolls
and **no page can structurally escape the net** — the gate-vacuity-SAFE form. **But it is `[P]`/local + STRUCTURALLY
post-integration** (rides WS1–WS11 ALL landing + W-REFLECT3), NEVER a CI default.

⇒ By "every page is captured", there are **ZERO strict orphans** — all 120 are in the WS12 480-capture.

### Tier B — the BINDING gestalt verdict: the 10-surface ba-gestalt roster (~14 pinned pages, ci/release)

`bg-gestalt-roster.md` pins **10 named surfaces** to the ci/release-blocking `proof:ba-gestalt` pixel-band + G7
freshness. Their `routes` cells resolve to **~14 routed pages**: `/dock/overview;layers;rail`,
`/substrates/blob;aurora;fourier-field;glass-material`, `/feedback/toast;notification`, `/display/buttons`,
`/motion/curve-gallery;springs`, `/navigation/tabs`, `/foundations/intro` (+ non-routed `shell`/`cross-repo` + the
`page-band` roving "any content route" probe captured ONCE at intro). Route-tokens are DERIVED (`routeSeeds()`
HARD-REDs a typo'd slug), but **the 10-surface SELECTION is hand-curated** — a new page is NOT auto-rostered.

### Tier C — dedicated component/system waves (transitive page paint)

WS2 (dock) · WS3 (glass) · WS5 (viz) · WS6 (siri) · WS8 (glass-deep) · WS9 (paper) name specific files; the
component's demo page paints correctly transitively. Per-category map: **every category has ≥1 dedicated wave** (see
§2.1). 4 categories (containers/data/forms/compositions) have NO direct roster surface — their pages ride the
480-capstone + per-component `tests-visual` specs (which are per-COMPONENT, not per-page) only.

### 2.1 — Per-category owning waves (all covered; thinness is at the per-page-GATE level)

| Cat (routes) | dedicated waves | roster | verdict |
|---|---|---|---|
| foundations (13) | WS4 CATEGORY-CARD-WARM · WS9 paper · WS3 glass · WS10 | page-band (intro) | covered |
| substrates (11) | WS5 viz (8 VIZ-* waves) · WS3+WS8 glass | aurora·configurators-goo·dark-register·motion-fourier | covered (densest) |
| forms (12) | WS4 DESHADCN-SWEEP (9 controls) · WS10 · WS3 control-surface | — | covered via deshadcn |
| display (11) | WS4 SCROLL-SHRINK · WS3 BUTTON-GLASS · WS4 CHIP-ALIAS-KILL | glass-feedback (buttons) | covered |
| containers (14) | WS4 SHEET-INSET·PRESS-MOUNT · WS10 DESHADCN-MATERIAL · WS12 card-pressable | — | covered, NO roster |
| navigation (4) | WS4 TABS-KEYBOARD-LEAF·GOO-BARBELL | tabs-segmented (tabs) | covered |
| dock (9) | WS2 (11 waves) · DOCK-STORY-MODULARIZE | dock (overview/layers/rail) | mostly — §3 |
| data (14) | WS4 TIMELINE-ENCAPSULATE·metric · WS10 | — | covered, NO roster |
| feedback (8) | WS3 feedback-tone · WS8 gate-pattern (G6 consumer #2) | glass-feedback (toast/notif) | covered |
| motion (12) | WS4 12-LAWS·LIQUID-ENTRANCE·FLIP-ONE · WS11 TYPEWRITER-FADEUP · WS9 HANDMARK | motion-fourier (curve/springs) | covered (BD-fixed scroll-choreo) |
| compositions (12) | WS4 SHEET-INSET · WS9 math-paper · WS8 gate-pattern · WS11 dispatcher | — (gate-pattern) | covered, mostly indirect |

### 2.2 — The three enforcement tiers across all 120 (slug-token classification)

| tier | binding paint enforcement | count | meaning |
|---|---|---|---|
| 1 — roster-pinned | ci/release ba-gestalt + WS12 local | **~14** | strongest; stale/faked PASS auto-reverts at the cut |
| 2 — dedicated wave | WS12 local sweep + component device-free gate | **~52** | a named wave fixes the component; page paint at WS12 |
| 3 — cross-cutting only | WS12 local sweep only | **~54** | slug in NO wave; relies on universal nets alone |

The **~54 cross-cutting-only** pages lean on `PAGE-COMPONENT-AUDIT` + `12-LAWS-UNIVERSAL` + `COHERENCE-CENSUS/GATE` +
`DESIGN-LANGUAGE-UNIFY` + `ANIMATION-CONGRUENCE` + `STORYBOOK-SUFFUSE` + WS10. Members incl. `compositions/math-paper`
(a PASS-E gold-standard), `foundations/{overlays-scrims,surface-tints,chart-chassis-palette,css-utilities}`,
`feedback/{alert,confirm-dialog,toaster,completion-seal}`, `data/{avatar,data-table,infinite-scroll,virtual-section,
metric-cell,metric-stack,scrolling-text}`, the stable shadcn wrappers, and **3 dock pages** (`dock-gallery`,
`liquid-playground`, `morph-showcase`). (Slug-token matching under-counts roster pages — treat ~54 as an upper bound.)

---

## 3. ORPHANS

**Strict CAPTURE orphans (no wave touches OR captures): NONE.** Every routed page is in the WS12 manifest-derived
480-capture. The orphans below are DIRECTIVE-level and DEAD-FILE level.

### 3.1 — `dock/dock-gallery` (NEW route · A10 / WS2-15 ★★) — phantom-owner directive orphan

The directive WS2-15 / A10 — *"ONE dock with the tabs facility (not two docks in one); demos smooth, inertia,
grow/shrink, split; no hardcoded real names"* (★★, **PARTIAL**) — is assigned in `P-historical-coverage.md:187` to
owner wave **`BG.W-DOCK-GALLERY`**, which **does NOT exist** in `bg-build-map.md` / `EXECUTION-PROGRESS.md` (147 rows)
/ `FINAL.md`. The page IS captured (WS12) + its component (GlassDock/useDockFission) IS converged (WS2), but the
SPECIFIC directive (tab-facility unification, "no hardcoded real names" cleanup) has no executable wave. PARITY:
medium — captured + component-converged, but the named ★★ user ask is homeless.

### 3.2 — The dock BEHAVIORAL-DEFECT directive cluster — 5 phantom owners, substance absent from the build map

`P-historical-coverage.md` assigns these user-reported dock defects to owner-waves that are ALL phantom, and a build-map
grep for the substance returns EMPTY (`draggable`/`recolor`/`overlay-scope`/`hue-bleed`/`too long`/`out-of-sync`/`icon
align` → all absent):

| Dir | request | status | phantom owner | in build map? |
|---|---|---|---|---|
| A4 | dock blur too extreme + too long (interp window) | PARTIAL | `BG.W-DOCK-SHRINK` ✗ | absent |
| A5 | shrunken-state icon alignment | PARTIAL | `BG.W-DOCK-SHRINK` ✗ | absent |
| A6 | icon bounce out-of-sync; inertia from CENTER | PARTIAL | `BG.W-DOCK-SHRINK` ✗ | absent |
| A7 | dropdown recolors ENTIRE dock | DEFERRED | `BG.W-DOCK-OVERLAY-SCOPE` ✗ | absent |
| A8 | popover trigger mis-aligned + differs from dropdown → unify | DEFERRED | `BG.W-DOCK-OVERLAY-SCOPE` ✗ | absent |
| A9 | dock contrast hue-bleed on interaction | DEFERRED | `BG.W-DOCK-DEEP-TRANSMIT` ✗ | absent |
| A11 | vertical pill ugly + bigger pill padding | PARTIAL | `BG.W-DOCK-SHRINK` ✗ | absent |
| A12 | dock items not draggable (`useDockItemDrag` exists, wiring owed) | DEFERRED | `BG.W-DOCK-DRAG` ✗ | absent |

5 phantom owner-waves (`DOCK-GALLERY/SHRINK/OVERLAY-SCOPE/DEEP-TRANSMIT/DRAG`). DEFERRED rows are arguably conscious;
the **PARTIAL** rows (A4/A5/A6/A11) have a homeless remainder. The roster `dock` surface verifies only a holistic
warm-translucent pixel band, NOT a draggable item or a scoped dropdown recolor. PASS-2 must DECIDE per row:
folded-into-a-renamed-WS2-wave / consciously-deferred-with-rationale / genuine-orphan.

### 3.3 — Functional thin-tier: ~106 pages have NO ci/release paint gate (late-only)

Only ~14 roster pages carry a ci/release-blocking paint verdict. The other ~106 (incl. all ~54 cross-cutting-only)
have their ONLY binding paint in the `local`-tagged WS12 sweep — a single late serial run riding WS1–WS11 + W-REFLECT3,
never a CI default. This is the "headless-green / visually-broken" exposure for ~88% of pages: a quota/time cut to
WS12 (the LAST, longest, local-only wave) evaporates their per-page net while the device-free CI battery stays green.

### 3.4 — Section-landing routes (11 `/cat`) sit OUTSIDE the 480-capture sweep

The 480 = 120 STORY routes × 2 × 2. The 11 SECTION-LANDING routes (`/foundations`…, generated by `router.ts` over
`SectionLanding.vue`) are NOT in the 480; they ride the chassis waves (`BG.W-CATEGORY-CARD-WARM` "every category page's
SectionLanding", WS11 STORY-PAGE-API CategoryPage). Chassis-covered, not orphaned — but the "480 = every page" claim
covers stories, not the 11 landings; record so PASS-2 doesn't assume the landings are pixel-captured.

### 3.5 — `PaletteLayer.vue` — dead demo SFC, UNSCHEDULED

`demo/stories/aurora/config/PaletteLayer.vue` has **zero importers** (its 4 siblings `NucleiLayer`/`FlowLayer`/
`CompositionLayer`/`TextureLayer` are all imported into `AuroraConfigDock.vue`; `PaletteLayer` is NOT). Unlike
`DemoFrame.vue` + `StorySectionHeader.vue` (also zero-importer, but explicitly deleted by `BG.W-DEMO-CHASSIS-
CONSOLIDATE`), `PaletteLayer.vue` is in NO cleanup wave. Low-severity dead-code orphan — fold into the
DEMO-CHASSIS-CONSOLIDATE delete set; the colocation / overfitting-audit gate should catch it.

---

## 4. DOUBLE-OWNED PAGES / DESTRUCTIVE-CONFLICT CANDIDATES

~37 files are touched by ≥2 waves; most are DAG-ordered sequential refinement (carve→build→suffuse), not destructive.
The genuine risks:

### C1 — `ladder.css` (527L, LIVE R1 close-red): carve-then-regrow, no post-WS9 re-carve owner

`ladder.css` is edited by **4 waves across 3 workstreams**: `BG.W-CLOSEFIX-9SITE` (G4, carves 527→470, grain-tail →
`glass/grain-overlay.css`), `BG.W-VT-ROUTE-ENHANCE`, `BG.W-GLASS-TINT-UNIFY`, and **`BG.W-PAPER-GRAIN-REAL` (WS9)**.
The carve-regrow guard is named but **WS3-scoped** (`BG.W-DEMO-STYLE-REHOME tracks the line budget`). **The LAST editor
is WS9** (`PAPER-GRAIN-REAL`, AFTER WS3), so a WS9 re-grow of `ladder.css` past 500 has **no downstream re-carve
owner** — the budget-tracker already closed in WS3. R1 could silently re-open between WS9 and the cut. (Same shape:
`shell.css` 510L / R2.)

### C2 — WS9 `BG.W-PAPER-GRAIN-REAL` `Files:` names PRE-CARVE locations (`ladder.css`/`dock/shell.css`)

CONFIRMED on disk: G4 carves the grain-tail OUT of `ladder.css` → `glass/grain-overlay.css` (and `shell.css` →
`dock/shell-regions.css`); but WS9 `PAPER-GRAIN-REAL`'s `Files:` (build-map :698) still lists *"re-point
`cards.css`/`ladder.css`/`dock/shell.css`"* for the grain-tooth re-engineer. If the grain WS9 re-points is the grain
G4 moved, the WS9 list is stale-referencing pre-carve locations — the wave edits the wrong file OR re-introduces grain
into the just-carved monolith (re-growing C1). NUANCE: G4 moves the GLASS grain (`.glass-*::after`) while WS9
re-engineers the PAPER grain (`--paper-grain-tooth` feTurbulence→feDiffuseLighting) — these may be distinct grain
systems. PASS-2 must verify which file the WS9 grain re-point actually lands in post-carve.

### C3 — within-WS2 dual-touch (sequential, low-risk, verify ordering)

`useDockOrientationMorph.ts` ← `DOCK-MORPH-UNIFY` + `DOCK-INPLACE-MORPH`; `SidebarDock.vue`/`BottomDock.vue` ←
`DOCK-PERSISTENT-CUT` + `SHELL-DOCK-DRY`. Same-WS, presumed DAG-sequenced; flag for ordering-confirm only.
(`useDockOrientationMorph.ts` is also a G2 named accept-residual no-route component — its paint reaches no roster
surface; covered by WS12 + the routes that render it.)

### C4 — `AppShell.vue` cross-WORKSTREAM double-edit (WS1 ↔ WS2) — the one un-sequenced same-file risk

WS1 `ROUTE-TRANSITION` deletes bloom/skeleton/VT refs from `AppShell.vue`; WS2's >500-line morph-stage carve edits the
SAME file (`toggleShellMorph`'s `startViewTransition` moves WITH the stage). WS1 SPEC-pass3 flags it ("Coordinate the
AppShell line deletions with WS2"), but this is a cross-workstream same-file edit (line-deletes vs a >500 carve) — the
clearest double-owned coordination risk. Lock the ordering.

---

## 5. FRICTION-HISTORY COHERENCE (page-coverage lens)

- **Hand-authored maps that drift → CONFIRMED, fresh instance.** `P-historical-coverage.md` (the "ensure ALL prompts
  addressed" matrix) names **≥5 phantom owner-waves** in its "BG owner" column (§3.2). This is the seed's exact
  friction class caught red-handed in a SIBLING audit doc. The AMENDED-WAVE-PLAN's OWN G2 already learned this (DERIVE
  wave→surface from `surface-closure.mjs`, no hand-list) — but the discipline was applied to the gate, NOT to the
  coverage matrix. **Consequence: P-historical-coverage CANNOT be trusted as a coverage source** — its owner column
  points at non-existent waves. (May be pre-fold aspirational names consolidated into real waves — PASS-2 reconciles.)
- **Gate-vacuity (PASS, one residue).** The WS12 480-capture page set is manifest-DERIVED (`s()`) — vacuity-safe. The
  roster route-tokens are derived (routeSeeds HARD-RED). RESIDUE: the 10-surface roster SELECTION is hand-curated; the
  G2 PARITY-C honest re-price already owns this ("82 of 105 waves map to NONE … binding value is PARITY-C + freshness").
- **Headless-green / visually-broken → LIVE for ~106 pages** (§3.3) — the binding per-page paint is the `local`-only
  WS12 sweep; the re-coupled axis is re-coupled at ci/release only for the ~14 roster pages.
- **No-god-module re-grow → LIVE.** `ladder.css`=527 / `shell.css`=510 confirmed (R1/R2). G4 carves them; the
  carve-regrow guard does not extend past WS3 to the WS9 editor (C1).
- **Doc conflation (minor).** AMENDED-WAVE-PLAN deferral **D-G2 says "the WS12 late capture sweep (all 10 roster
  surfaces)"** — but `BG.W-PAGE-COMPONENT-AUDIT` is the **480-capture all-120-page** instrument. D-G2 conflates the
  ba-gestalt 10-roster sweep with the coherence-congruence 120-page sweep (two distinct instruments / page sets); a
  reader trusting D-G2 under-scopes the WS12 capture.

---

## 6. WHAT PASS-2 SHOULD VERIFY (handoff)

1. **Reconcile the 5 phantom dock owner-waves** (§3.1/§3.2) — per PARTIAL row: name the real WS2 wave it folded into /
   record the deferral rationale / declare genuine orphan. `dock-gallery` (★★, NEW route) is the priority.
2. **C2 grain file-target** — resolve whether `PAPER-GRAIN-REAL` re-points `ladder.css` or the G4-carved
   `grain-overlay.css`; fix the WS9 `Files:` if stale; confirm glass-grain vs paper-grain are distinct.
3. **C1 re-carve owner** — assign a post-WS9 line-budget re-carve owner for `ladder.css`/`shell.css` (the WS3
   `DEMO-STYLE-REHOME` tracker closes too early).
4. **C4 `AppShell.vue` ordering** — lock the WS1↔WS2 same-file edit sequence.
5. **Per-page ci-gate thinness** (§3.3) — decide whether the late 480-sweep is an acceptable per-page net or the 4
   no-roster categories (containers/data/forms/compositions) need a lighter mid-tranche per-page sentinel.
6. **`PaletteLayer.vue`** (§3.5) — fold into the DEMO-CHASSIS-CONSOLIDATE delete set.
7. **D-G2 doc fix + section-landing capture scope** (§3.4) — reconcile "10 roster surfaces" vs 480-all-page; decide
   whether the 11 `/cat` landings + the 2 new dock routes are explicitly in the capture set.

---

## 7. VERDICT

**The page corpus is STABLE since BD (+2 routes, 0 renames) — the BD PASS-E corpus is REUSABLE, not re-derivable.**
Coverage is **structurally complete but unevenly enforced**: the WS12 `BG.W-PAGE-COMPONENT-AUDIT` 480-capture is a
manifest-derived all-120 net (the gate-vacuity-safe form), so **no page is a strict orphan** — but only ~14 pages
carry a ci/release-blocking paint verdict; ~106 ride a single `local`-only late WS12 sweep (the headless-green
exposure for ~88% of pages). The genuine actionable findings: (a) **directive orphans** — `dock-gallery` (★★) + the
dock behavioral-defect cluster sit on **5 phantom owner-waves** in `P-historical-coverage.md`, substance absent from
the build map (the hand-authored-map-drifts friction class, fresh instance); (b) the **C1/C2 ladder/shell carve→WS9
grain-re-point chain** with no downstream re-carve owner + a possibly-stale WS9 file list; (c) the **C4 AppShell
WS1↔WS2** cross-workstream double-edit; (d) the **D-G2 doc conflation** + the 11 section-landings outside the 480.
None is a feasibility restart; all are reconcile/decide items for PASS-2.
