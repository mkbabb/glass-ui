# PASS 1 — PAGE↔WAVE COVERAGE (BG cross-wave coherence + friction-history audit)

**Lens:** PAGE↔WAVE COVERAGE · **Pass:** 1 (baseline) · **Date:** 2026-06-30 · **Branch:** `tranche/BG` · **HEAD:** `4c761b64`
**Agent:** page-wave-coverage research · **Read-mostly** — wrote only this file.
**Siblings-intact:** verified (exit 0) at start.

---

## 0. METHOD

Enumerated `demo/stories/**/*.vue` (156 files), parsed `demo/stories/manifest.ts` for the `s()` route registry
(120 routed pages), cross-referenced against the BD `PASS-E.md` 118-page deep-audit corpus + the 12 per-category
GESTALT files (`docs/tranches/BD/viz/page-audit/`) + the 58 per-page deep audits (`docs/tranches/BD/viz/page-deep/`),
and against the BG wave roster (96 table rows in `EXECUTION-PROGRESS.md` + the `bg-build-map.md` specs +
`AMENDED-WAVE-PLAN.md` G2). USED the existing corpus per the seed discipline — did not re-derive pages from scratch.

---

## 1. THE PAGE CORPUS IS 120 ROUTED PAGES, NOT 156 (the seed's "38 newer" is a miscount)

The 156 `.vue` files decompose cleanly:

| bucket | count | examples |
|---|---|---|
| **Routed story pages** (`s()` in manifest) | **120** | every `<cat>/<slug>` route |
| Root chassis (NOT pages) | 12 | StoryPage·StoryHero·StoryHeader·StorySection·ShowcaseFrame·TokenLadder·Code·CodeBlock·SectionLanding·SectionPreviewCard·StoryPlayButton·StorySectionHeader |
| `_chassis/` | 1 | DemoFrame |
| aurora sub-components | 11 | AuroraConfigDock·AuroraStage·NucleiOverlay·OklchStopRow·PresetPickerRow·config/×5·sections/×3 |
| dock sub-components | 9 | DockStage·DockExampleTile·examples/×7 |
| substrates sub-component | 1 | VizStudio |
| **non-page total** | **36** | |

**The seed's framing "38 pages newer than PASS-E … the page corpus grown to 156" is a structural MISCOUNT.**
`156 .vue − 118 PASS-E = 38`, but **36 of those are chassis/sub-components (not pages)** and only **+2 are
genuinely-new routed pages**. The actual routed-page delta is **+2**, both in dock.

### The exact PASS-E→NOW delta (per-category, route-set, not just count)

| category | NOW | PASS-E | Δ |
|---|---|---|---|
| dock | **9** | 7 | **+2** |
| all 10 others | identical | identical | 0 |
| **TOTAL** | **120** | 118 | **+2** |

The two new routed pages: **`dock/dock-gallery`** + **`dock/liquid-playground`**. Both are referenced in the
WS2 dock-convergence converge specs (`BG-WS2-dock-convergence/SPEC-pass1-converged.md`) — covered by the dock
workstream, not orphaned.

**No renames detected:** all 58 per-page-deep-audited slugs from BD still exist as current routed pages (zero
"audited slug now absent"). The +2 are pure additions, not a rename masking an orphan.

---

## 2. THE COVERAGE MODEL — page ownership is COMPONENT/SYSTEM-shaped, not page-shaped

The 96 BG wave rows are organized around **components, tokens, and systems**, NOT around demo pages. The
`bg-build-map.md` names only **7 explicit routes** in any wave's `Files:`/notes (`/compositions/siri`,
`/dock/typoo`[self-test], `/dock/overview`, `/foundations/colors`, `/motion/scroll-vt`, `/display/card`,
`/containers/card-pressable`[illustrative]) — and 3 of those aren't even current routed pages. **The build-map
does not enumerate per-page coverage.** Page-level correctness is owned three ways:

### Tier A — the UNIVERSAL net: `BG.W-PAGE-COMPONENT-AUDIT` (WS12) captures ALL 120 pages

The keystone coverage fact: **WS12 `BG.W-PAGE-COMPONENT-AUDIT`** is the **480-capture** dual-engine both-modes
π = **"the LIVE 120 `s()` routes × 2 engines × 2 modes"** (`coherence-congruence.spec.ts`, confirmed verbatim in
`BG-WS12-coherence-congruence/SPEC-pass2-converged.md:431`). The page set is **manifest-DERIVED from `s()`**, NOT
a hand-list — so a new page is auto-enrolled and **no page can structurally escape the net**. This is the
gate-vacuity-SAFE form (the derived-from-source discipline the seed's friction-history demands).

⇒ **By the "every page is touched/captured" definition, there are ZERO structural orphans.** Every one of the
120 routed pages is in the WS12 480-capture.

### Tier B — the BINDING gestalt verdict: the 10-surface ba-gestalt roster (14 pinned pages)

`bg-gestalt-roster.md` pins **10 named acceptance surfaces** to the ci/release-blocking `proof:ba-gestalt`
pixel-band + freshness verdict. Their routes resolve to **14 distinct routed pages**:
`/dock/overview · /dock/layers · /dock/rail · /substrates/blob · /substrates/aurora · /feedback/toast ·
/feedback/notification · /display/buttons · /motion/curve-gallery · /motion/springs · /substrates/fourier-field ·
/substrates/glass-material · /navigation/tabs · /foundations/intro` (+ the non-routed `shell` and `cross-repo`
surfaces + a `page-band` roving "any content route" probe). The route-tokens WITHIN each surface are DERIVED
(`routeSeeds()` HARD-REDs a typo'd `/cat/story`), but **the 10-surface SELECTION is hand-curated** — a new page
is NOT auto-rostered.

### Tier C — dedicated component/system waves (transitive page coverage)

WS2 (dock) · WS3 (glass) · WS5 (viz) · WS6 (siri) · WS8 (glass-deep) · WS9 (paper) name specific
components/files; the component's demo page paints correctly transitively.

### The coverage tiers (all 120 pages classified)

| tier | binding paint enforcement | count | what it means |
|---|---|---|---|
| **1 — roster-pinned** | ci/release ba-gestalt **+** WS12 local sweep | **14** | strongest; a stale/faked PASS auto-reverts at the cut |
| **2 — dedicated wave** | WS12 local sweep only (+ component device-free gate) | **~52** | a named wave fixes the component; page verified at WS12 |
| **3 — cross-cutting only** | WS12 local sweep only | **54** | slug named in NO wave; relies on universal nets alone |

The **54 cross-cutting-only pages** (slug appears NOWHERE in `bg-build-map.md`) lean entirely on
`BG.W-PAGE-COMPONENT-AUDIT` + `BG.W-12-LAWS-UNIVERSAL` + `BG.W-COHERENCE-CENSUS/GATE` +
`BG.W-DESIGN-LANGUAGE-UNIFY` + `BG.W-ANIMATION-CONGRUENCE` + `BG.W-STORYBOOK-SUFFUSE` + WS10 de-shadcn. Notable
members: `compositions/math-paper` (a PASS-E gold-standard reference page), `foundations/{overlays-scrims,
surface-tints,chart-chassis-palette,css-utilities}`, `feedback/{alert,confirm-dialog,toaster,completion-seal}`,
`data/{avatar,data-table,infinite-scroll,virtual-section,metric-cell,metric-stack,scrolling-text}`, the stable
shadcn wrappers (`containers/{accordion,collapsible,context-menu,dropdown-menu,popover,tooltip,hover-card}`,
`display/{separator,status-dot,pulse,stacked-icons}`), and **3 dock pages** (`dock-gallery`, `liquid-playground`,
`morph-showcase`). (`curve-gallery`/`notification` show as slug-thin but ARE roster-pinned — slug-token matching
under-counts; treat the 54 as an upper bound on truly-thin pages.)

---

## 3. ORPHANS

**Strict orphans (no wave touches OR captures): NONE.** Every routed page is in the WS12 manifest-derived
480-capture net.

**Functional thin-tier (no ci/release paint gate): 106 pages.** Only the 14 roster-pinned pages carry a
ci/release-blocking paint verdict. The other 106 (including all 54 cross-cutting-only) have their ONLY binding
paint in the **`local`-tagged** WS12 sweep — a single ~20-40min serial run that rides ALL of WS1–WS11 landing +
W-REFLECT3, NEVER a CI default. This is the friction-history "headless-green / visually-broken" exposure for
those 106 pages: a quota/time cut to WS12 (the LAST, longest, local-only wave) evaporates their per-page net,
and the device-free CI battery would still go green.

**The 3 dock attention-gaps (within the functional thin-tier):** `dock-gallery` + `liquid-playground` (the +2
new pages) + `morph-showcase` are NOT roster-pinned (roster dock = overview/layers/rail only), and the only
dock-story wave touching them — `BG.W-DOCK-STORY-MODULARIZE` — is `[H]` and explicitly **"DEFERRABLE"
(line 258)**. Their paint is owned transitively by the WS2 dock-component waves (morph-unify, inplace-morph,
fission-wire, etc.) + the WS12 sweep. Coverage exists; dedicated paint attention does not.

---

## 4. DOUBLE-OWNED PAGES / DESTRUCTIVE-CONFLICT CANDIDATES

37 files are touched by ≥2 waves. Most are sequential refinement (carve → build → suffuse), DAG-ordered, not
destructive. The genuine conflicts:

### C1 — `ladder.css` (527L, the LIVE R1 close-red): carve-then-regrow, no post-WS9 re-carve owner

`ladder.css` is edited by **4 waves across 3 workstreams**: `BG.W-CLOSEFIX-9SITE` (G4, carves 527→470, grain-tail
→ `grain-overlay.css`), `BG.W-VT-ROUTE-ENHANCE`, `BG.W-GLASS-TINT-UNIFY`, and **`BG.W-PAPER-GRAIN-REAL` (WS9)**.
The carve-regrow guard is named — but it is **WS3-scoped** (`BG.W-DEMO-STYLE-REHOME tracks the line budget`,
line 139). **The LAST editor is WS9** (`BG.W-PAPER-GRAIN-REAL`, AFTER WS3), so a WS9 re-grow of `ladder.css` past
500 has **no re-carve owner downstream** — the budget-tracker already closed in WS3. The R1 close-red could
silently re-open between WS9 and the cut. (Same shape for `shell.css` 510L / R2.)

### C2 — `BG.W-PAPER-GRAIN-REAL` (WS9) `Files:` names `ladder.css`/`dock/shell.css` for grain re-point AFTER G4 carved grain OUT of them

G4 `BG.W-CLOSEFIX-9SITE` carves the **grain-tail OUT of `ladder.css` → `grain-overlay.css`** (and the shell
persistent-region tail OUT of `shell.css` → `dock/shell-regions.css`). But WS9 `BG.W-PAPER-GRAIN-REAL`'s
`Files:` (line 699) still lists **"re-point `cards.css`/`ladder.css`/`dock/shell.css`"** for the grain-tooth
re-engineer. If the grain rules the wave re-points have MOVED to `grain-overlay.css`/`shell-regions.css` post-G4,
the WS9 file list is **stale-referencing pre-carve locations** — the wave would either edit the wrong file or
re-introduce grain into the just-carved monolith (re-growing C1). PASS-2 must verify which file the WS9 grain
re-point actually lands in post-carve.

### C3 — within-WS2 dual-touch (sequential, low-risk, verify ordering)

`useDockOrientationMorph.ts` ← `BG.W-DOCK-MORPH-UNIFY` + `BG.W-DOCK-INPLACE-MORPH`; `SidebarDock.vue`/
`BottomDock.vue` ← `BG.W-DOCK-PERSISTENT-CUT` + `BG.W-SHELL-DOCK-DRY`. Both pairs are same-WS, presumed
DAG-sequenced. Not destructive if ordered; flag for ordering-confirm only. (`useDockOrientationMorph.ts` is also
a G2 named accept-residual no-route component — its paint reaches no roster surface; covered by WS12 + the routes
that render it.)

---

## 5. FRICTION-HISTORY COHERENCE (page-coverage lens)

- **Gate-vacuity / hand-authored maps (PASS, with one residue):** the WS12 480-capture page set is
  manifest-DERIVED (`s()` routes) — gate-vacuity-safe, the corrected form. The roster route-tokens are also
  derived (routeSeeds HARD-RED). **The residue:** the 10-surface roster SELECTION is hand-curated; the
  `AMENDED-WAVE-PLAN` G2 PARITY-C honest-re-price already owns this ("82 of 105 waves map to NONE … the gate's
  binding value is PARITY-C + freshness, not per-wave coverage"). No new vacuity, but the roster-selection
  brittleness is real and acknowledged.

- **Headless-green / visually-broken (LIVE for 106 pages):** the binding per-page paint for 106 of 120 pages is
  the `local`-only WS12 sweep — exactly the decoupled-axis the plan claims to re-couple, re-coupled only for the
  14 roster pages at ci/release. The 106 ride a single late local run that is the most quota-vulnerable wave in
  the DAG.

- **No-god-module re-grow (LIVE):** `ladder.css`=527 / `shell.css`=510 confirmed on disk (the R1/R2 close-reds).
  G4 carves them; the carve-regrow guard does not extend past WS3 to the WS9 editor (C1). The seed's
  "ratchet re-grows" class is structurally present in this carve→WS9-re-point chain.

- **Doc-coherence (minor):** `AMENDED-WAVE-PLAN` deferral **D-G2 says "the WS12 late capture sweep (all 10
  roster surfaces)"** — but `BG.W-PAGE-COMPONENT-AUDIT` is the **480-capture all-120-page** instrument. The
  deferral conflates the ba-gestalt 10-roster late sweep with the coherence-congruence 120-page sweep (two
  distinct instruments, two distinct page sets). A reader trusting D-G2 would under-scope the WS12 capture.

---

## 6. WHAT PASS-2 SHOULD VERIFY (handoff)

1. **C2 grain file-target** — resolve whether `BG.W-PAPER-GRAIN-REAL` re-points `ladder.css` or the
   G4-carved `grain-overlay.css`; fix the WS9 `Files:` if stale.
2. **C1 re-carve owner** — assign a post-WS9 line-budget re-carve owner for `ladder.css`/`shell.css` (the WS3
   `BG.W-DEMO-STYLE-REHOME` tracker closes too early).
3. **Roster-selection for the 3 dock attention-gaps** — decide whether `dock-gallery`/`liquid-playground`/
   `morph-showcase` warrant roster enrollment or accept the WS12-only net (the G2 orphan-decision precedent).
4. **D-G2 doc fix** — reconcile the deferral's "10 roster surfaces" with the 480-capture all-page reality.
5. **Spot-check the 54 cross-cutting-only pages** against `BG.W-12-LAWS-UNIVERSAL`/`STORYBOOK-SUFFUSE` actual
   enrollment to confirm the universal nets genuinely reach them (not just nominally).

---

## 7. VERDICT

**Coverage is STRUCTURALLY COMPLETE but UNEVENLY ENFORCED.** No page is a strict orphan — the WS12
`BG.W-PAGE-COMPONENT-AUDIT` 480-capture is a manifest-derived all-120 net, the gate-vacuity-safe form. But
enforcement is two-tier: **14 pages carry a ci/release-blocking paint verdict; 106 rely on a single `local`-only
late WS12 sweep** that is the most quota-vulnerable wave in the DAG (the headless-green/visually-broken exposure
for ~88% of pages). The genuine actionable defects are **C1/C2** (the `ladder.css`/`shell.css` carve→WS9-re-point
chain with no downstream re-carve owner + a possibly-stale WS9 grain file list) and the **D-G2 doc conflation**.
The "38 newer pages" seed framing is a miscount — the real page delta since BD is **+2** (`dock-gallery`,
`liquid-playground`), both WS2-covered, no renames.
