# REFABLE RU-10 — PERF-STORY verdict sidecar

**Unit:** RU-10 (story meta-framework perfection, BJ family D / A06).
**Verified model:** `claude-fable-5` (system-context line read verbatim: "The exact model ID is
claude-fable-5"). Prior run: `claude-opus-4-8` via config override.
**Target artifact:** `../perfection/FABLE-STORY-FRAMEWORK.md` — REWRITTEN IN PLACE as the unioned
canon 2026-07-17.
**HEAD at union:** `v7.0.0-49-g2a949abe` (demo/chassis unmoved since the draft's `v7.0.0-8` pin —
BJ commits are docs-only; every cite re-verified at this head).
**Protocol:** (1) ANEW from primary sources with the opus artifact unread — demo chassis in full
(`StoryPage`/`StoryHero`/`StoryHeader`/`StorySection`/`StoryBodyRenderer`/`story-body.ts`/
`FamilyTabs`/`VizStudio`/`DockStage`/`SectionLanding`/`CatalogLanding`/`SectionPreviewCard`/
`storyTile`/`CodeBlock`), `manifest.ts` (all 1132 lines), `router.ts`, `focal.ts`,
`routeTransition.ts`, `AppShell.vue`, `story-hero.css`, `view-transition.css`, `demo.css`,
FEEDBACK-LEDGER (all 67 rows), representative stories per type; (2) SCRUTINY of the opus artifact,
every claim guilty until re-proven; (3) UNION rewrite + this sidecar.

**The boundary moment:** recorded at the first read of the opus artifact, after the ANEW framework
was fully derived (taxonomy, per-type contract, transition grammar). The guilty-until-reproven
stance was then discharged claim-by-claim: greps and line-reads re-ran the artifact's checkable
values, and they verified at an unusually high rate — the counts 65/128 mono-caption files, 90/65/0
StorySection uses/headings/overrides, 4 tile files, 3 CodeBlock consumers, and the REGISTRY/copy
cites all landed EXACT. One scrutiny probe cut the other way: my own ANEW count of FamilyTabs
consumers (7 by `grep -l`) was WRONG — two are comment-only mentions; the opus "~5" was right.

---

## Verdict table

| ID | claim | verdict | evidence |
|----|-------|---------|----------|
| D-1 | taxonomy 7→6, catalog folds into `landing`, doc folds into `spec`, studio unified | **RATIFIED core / CHANGED at 3 points** | 6-type fold sound. CHANGED: (a) studio count "~9" is the post-adoption target — on disk `VizStudio` has 3 consumers (aurora/blob/fourier-field); born-RED must count 3; (b) family "~5" RIGHT but dual-role nuance added (toast/paper-glass are in-page switchers, `toast.vue:125`, `paper-glass.vue:263`; timeline/scroll comment-only); (c) "the draft's 7 omit the root home entirely" OVERSTATED — BAND-STORY W-4/W-5 scope names `CatalogLanding.vue` (BAND-STORY:32-33); un-TYPED is the true defect |
| D-2 | configurator = adopt not build; StorySection level axis | **RATIFIED** | `Configurator.vue:211` `--radius-panel`; `styles.css:109` concentric; `src/styles/tokens/sizing-config.css:35` exact; `StorySection.vue:32` |
| D-3 | F11 site is `styles.css:117` adjacent-sibling rule | **RATIFIED** | rule verified verbatim at `:117` |
| D-4 | tile ladder sound; strike BAND-STORY:374 "LIVE miniature" | **RATIFIED** | ladder `storyTile.ts:42-50`; the LIVE-miniature line present at BAND-STORY:374; `vizPreviewStill.ts:4-9` 0-GL memoized |
| D-5 | double-card structural in `SectionPreviewCard.vue:35-54` | **RATIFIED** | outer bordered card + inner bordered/inset well (`:76-92`) |
| D-6 | F41 = `typewriter.vue:103` npm-install string | **RATIFIED** | verified verbatim |
| D-7 | F09 container remediated → regression-guard | **RATIFIED** | radius grammar shipped at HEAD; residual = inner pill radius (family F) |
| D-8 | F31 already modular; defect is stage void | **RATIFIED** | `src/components/easing/` exists; consumed `curve-gallery.vue:194-200` |
| D-9 | code-context region; 3 consumers, no taxonomy home | **RATIFIED** | consumers = `containers/configurator`, `display/card`, `feedback/toaster` (exact) |
| D-10 | landings hardcode hero-scale="4"; bind to descriptor | **RATIFIED / cites corrected** | TRUE at `SectionLanding.vue:28` + `CatalogLanding.vue:18` (draft cited :29/:26); `sectionLanding()` sets `"hero"` at `manifest.ts:300`; `StoryPage.vue:30` live |
| D-11 | StoryBody kept as spec data renderer | **RATIFIED** | schema+renderer read in full; the bespoke-escape bound holds |
| F8 | `--story-article-w` undefined → uncapped spec article | **RATIFIED (co-found)** | independently derived in ANEW before scrutiny; 1 ref (`StoryPage.vue:51`) / 0 defs |
| F1-F10 | §8 findings 1-10 | **RATIFIED** (F1 framing CHANGED per D-1c) | every count/line re-verified; finding 10 is consumed by BAND-STORY G-COPY-2 **by line number** — that pin goes stale with this rewrite |
| — | copy-canon ban sites | **RATIFIED** | `handmark.vue:26,67,115-120`; `search.vue:492`; `manifest.ts:932`; `auth-shell.vue:38-42`; 65/128 idiom files |
| — | REGISTRY cross-cites | **RATIFIED** | F02-cleared at REGISTRY:~291; ~40k idle RunTasks at REGISTRY:~322-326 |

**REFUTED:** none outright — three CHANGED corrections (studio count, "omits root home entirely"
framing, two line cites), zero claims failed re-proof at their core.

## Fresh (fableNew) — what the opus artifact missed

| ID | item | where it landed |
|----|------|-----------------|
| N1 | **The transition grammar is absent** — the RU-10 edict names "expressive, animated page-to-page transitions"; F05/F06/F07 had NO owner in the artifact (its own read-list skips them). New §6b: four typed VT routes over the ONE existing owner (`routeTransition.ts:5-13`, `view-transition.css:47-57`); dock-band flash mechanism (SELF_STAGES_GL + per-route DockStage GL boot under the atomic keyed swap) with the band-persistent-field cure; paint claims LIVE-DEFER | §6b + AMEND-D-12 + G-TRANS-GRAMMAR |
| N2 | Entrance/scroll-animation register standard (F05, A06 "scrolling animations") — compositor-only, existing `.scroll-cascade*`/`v-reveal` canon, zero demo-local keyframes | §6c + AMEND-D-13 |
| N3 | Per-type perf contract (A17/F01) — the slow-load class stated as one row per type (0-GL landing, one-GL studio, one BAND field for dock, chunk pre-resolve) | §6c + AMEND-D-14 |
| N4 | Per-type responsive rule (F14) — each type declares its collapse ONCE in the chassis; W-6 audits against type rules | §6c + AMEND-D-15 |
| N5 | Frame-token contract (A06 "margins, padding") — the four-token inventory + `--story-article-w` resolution + `DockStage.vue:193` hard-coded gap drift | §2.0 + AMEND-D-16 + G-FRAME-TOKENS |
| N6 | **Two front doors** — `intro.vue:74-89` duplicates the `/` category bento (`CatalogLanding.vue:30-42`); one D0 must survive | §1 + AMEND-D-17 + finding 11 |
| N7 | Typed-VT channel minted with ONE type — the F07 verdict stated structurally | finding 12 |
| N8 | FamilyTabs dual role (page type vs in-page switcher) — prevents type over-count | finding 14 + D-1 nuance |

## Counts

- **opusWrong:** 3 (studio on-disk count; "omits root home entirely" overstatement; the
  D-10/DockStage-class line-cite drifts, counted once).
- **fableNew:** 8 (N1-N8 → amendments D-12..D-17 + findings 11-14).
- **ratified:** 20 (amendments D-2..D-11 = 10; §8 findings 1-10 = 10; D-1's core fold rides as
  CHANGED, not counted).

## ROUTING — affected BAND-STORY anchors

| # | routing |
|---|---------|
| R1 | `BJ.W-STORY-TAXONOMY` ← AMEND-D-1 (CHANGED counts: studio 3-on-disk not ~9; family 5 with the dual-role rule) + AMEND-D-17 (one front door — the second D0 catalog at `intro.vue:74-89` collapses) + G-PT-CONFORM gains the exactly-one-D0 clause |
| R2 | `BJ.W-STORY-COPY-CANON` / `G-COPY-2` ← RATIFIED, but its cite `FABLE-STORY-FRAMEWORK.md:385-391` is STALE after the union rewrite — re-pin to "§8 finding 10" (anchor by section, not line) |
| R3 | `BJ.W-CONFIGURATOR-STD` / `G-CFG-2..5` ← AMEND-D-2/D-3/D-7/D-8 RATIFIED verbatim; note the section-register token lives at `src/styles/tokens/sizing-config.css:35` (not in the component dir) |
| R4 | `BJ.W-WIDTH-HIERARCHY-TRUTH` ← AMEND-D-10 (cites corrected to `SectionLanding.vue:28` / `CatalogLanding.vue:18`) + finding 8 RATIFIED + AMEND-D-16 (frame-token contract: `--story-article-w` collapse, `DockStage.vue:193` gap token, one padding token) |
| R5 | `BJ.W-PREVIEW-CARD` ← AMEND-D-4 (strike the BAND-STORY:374 LIVE-miniature line) + AMEND-D-5 RATIFIED; above-fold `content-visibility` exemption now also a row of the AMEND-D-14 perf contract |
| R6 | `BJ.W-RESPONSIVE-AUDIT` ← AMEND-D-15 — audit AGAINST the per-type collapse rules of §6c, not page-by-page ad hoc |
| R7 | **NEW WAVE REQUIRED:** `BJ.W-STORY-TRANSITIONS` (name at band edit) ← AMEND-D-12/D-13 + G-TRANS-GRAMMAR — F05/F06/F07 have no BAND-STORY owner today; LIVE-DEFER verification (captured DELTA mandatory, no headless-only close) |
| R8 | Band header ← re-pin HEAD to `v7.0.0-49-g2a949abe`+ at execution; the draft's `v6.0.0-62` pin is two tags stale |

**LIVE-DEFER register:** the dock-band flash (F06) paint behavior + cure efficacy; the F05 page's
current visual state; the F46 double-card's live read at HEAD. All structural mechanisms are
source-proven above; no paint claim was guessed (demo server down at union time).

*End — RU-10, `claude-fable-5`.*
