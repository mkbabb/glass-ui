# CHALLENGE-2-DESIGN — the three design bands + ASK-REDUCTION, challenged

**Seat:** Fable CHALLENGE-2 (design lens). **Mode:** TRANCHE-DEVELOPMENT — no source
touched; this doc only. **Posture:** assume each draft faulty, prove otherwise; evidence is
`file:line` verified on disk at HEAD `v6.0.0-63-g67d84908` (package `7.0.0`, untagged).
**Targets:** `waves/BAND-STORY.md`, `waves/BAND-MATERIAL.md`, `waves/BAND-REDUCTION.md`,
`ASK-REDUCTION.md`. **Authorities:** `formation/ios27/IOS27-CODEX.md`, `FEEDBACK-LEDGER.md`,
`formation/round-1/story-page-structure-census.md`,
`formation/round-2/adversarial-verification-of-round-1-consumer-truth-component.md`, the
breath-of-life / liquid-weight / aristotelian edicts (MEMORY).

## Verdict summary

| Target | Verdict | Load-bearing reason |
|---|---|---|
| BAND-STORY (band) | **SOUND w/ AMEND** | facts verified; three amendments below |
| BAND-STORY W1 TAXONOMY | **RULING-NEEDED** | liquid-grid fold ⟂ BAND-REDUCTION W3 delete (same artefact, opposite fate) |
| BAND-STORY W4 WIDTH | **AMEND** | "retire the heroScale field" alt is unsound — `StoryPage.vue:30→:89` consumes it |
| BAND-STORY W6 RESPONSIVE | **AMEND** | "128 story routes" is the `.vue` FILE count; navigable routes = 100 (census) |
| BAND-STORY OPEN-D9 (scene) | **AMEND** | `scene`'s only candidate members are `compositions`, which ASK-D1 prunes → empty type |
| BAND-MATERIAL (band) | **SOUND w/ AMEND** | substance reproduces; systematic theme-token mis-path |
| BAND-MATERIAL W1 RADIUS | **AMEND** | F12/F17 have no named owner if the live-π reproduces them |
| BAND-MATERIAL W2 BLUR | **AMEND** | born-RED probes cite absent `theme/glass.css` / wrong lines |
| BAND-MATERIAL W3/W4/W5 | **SOUND** | judgment-gate, track-DRY, proportion review all well-framed |
| BAND-MATERIAL OPEN-B | **RULING-NEEDED** | typography-codemod is genuinely unassigned |
| BAND-REDUCTION (band) | **SOUND** | consumer-truth discipline is exemplary; every cut verified |
| BAND-REDUCTION W3 liquid-grid | **RULING-NEEDED** | see cross-band conflict |
| ASK-REDUCTION (doc) | **SOUND w/ minor AMEND** | Q051-style, no smuggling; D1 needs one cross-ref |

---

## BAND-STORY

### What holds (verified, not taken on trust)

- `manifest.ts` has **0** `pageType` hits (`grep -c pageType demo/stories/manifest.ts` = 0) — G-TAX-1 born-RED is real.
- `StoryPage.vue:32` `const variant = computed<"hero" | "page">` — the single axis, confirmed.
- `--story-article-w`: exactly **1** ref (`StoryPage.vue:51`), **0** definitions — the undefined-token no-op is real.
- `hero-scale="4"` hardcoded at `CatalogLanding.vue:18` + `SectionLanding.vue:28` — confirmed.
- Copy-canon anchors all reproduce: `auth-shell.vue:39-41` ships `"SOC 2 Type II"` / `"End-to-end encrypted"` / `"Trusted by 12k teams"` (fabricated credentials, F43); `handmark.vue:26/67/117-120` ship the aria-hidden-SVG / stroke-dashoffset / se-guard / box-mode-hull meta-prose (F40). Mono-caption idiom: 65/128 demo FILES match (typography-audit reproduces). W2 is **SOUND**.
- The band correctly honours the codex: law 10 (no mono ALL-CAPS jargon) drives W2; law 4 (role radius) is referenced-not-duplicated to family F; the perf half is fenced to family E. Boundary discipline is clean.

### AMEND-1 (W4) — "retire the heroScale field" is an unsound alternative

W4 row W-2 and gate G-WID-2 offer two branches: bind landings to `landing.heroScale`, **OR**
"retire the unused `heroScale` field." The second branch is wrong. `heroScale` is **not**
globally unused:

```
StoryPage.vue:30  const heroScale = computed(() => current.value?.story.heroScale ?? "4");
StoryPage.vue:89  :hero-scale="heroScale"          // passed to StoryHero for hero-variant pages
manifest.ts:179   // "live-GL marquee story sets heroScale: 'hero' so it keeps the largest sub-rung"
manifest.ts:273   heroScale: opts?.heroScale        // story() override passthrough
manifest.ts:332   assignDepths finalizes heroScale
```

The dead-data defect is **landing-scoped** only: `SectionLanding.vue`/`CatalogLanding.vue`
render `StoryHero` standalone (`SectionLanding.vue:4,23`) and hardcode `"4"`, ignoring
`landing.heroScale`. The census (`:31`) states this correctly ("landing.heroScale is dead
data"); W4 over-generalises it to "the unused heroScale field." Retiring the field would break
the live `StoryPage:30→:89` consumption path for hero-variant story pages. **Amend:** strike the
"retire the field" branch from W-2 and G-WID-2; the sound fix is the data-bind on the two
landings only. (The width-token define/collapse and the h1/h2 dedup are SOUND.)

### AMEND-2 (W6 + band prose) — "128 story routes" conflates files with routes

`find demo/stories -name '*.vue' | wc -l` = **128**, but that count includes non-navigable
sub-component SFCs (`substrates/aurora/OklchStopRow.vue`, `.../NucleiOverlay.vue`,
`_frame/RendererStatus.vue`, …). The census the charter names is explicit: "**100 navigable
pages — 1 catalog home + 11 section landings + 88 story routes**" (census:4). W6's scope —
"a per-page responsive audit across **all 128 story routes** at the two governing viewports"
(line 431) — would send an executor to audit ~28 files that are not routes. `65/128` as a
grep-file ratio (G-COPY-1) is internally fine, but the prose "of 128 story pages/routes" is a
category error with execution cost. **Amend:** scope W6 to the census's 100 navigable routes
(88 story + 11 landing + home); relabel the 128 as a FILE count wherever it stands in for pages.

### AMEND-3 (OPEN-D9) — the `scene` type may be born empty

OPEN-D9 anchors `scene` = "full-bleed composition demos (auth-shell etc)" — i.e. the
`demo/stories/compositions/` set (6 pages, confirmed on disk). But ASK-REDUCTION §D1 (and
BAND-REDUCTION W3) recommend pruning the **entire** compositions section. If `scene`'s only
candidate members are pruned, W1 mints a taxonomy type with zero members — the exact overgrowth
the wave's own KISS clause forbids ("do not invent an 8th type to house an awkward page"). W1
does not cross-reference the compositions-prune. **Amend:** make the `scene` type membership
explicitly contingent on ASK-D1; if compositions is pruned, the taxonomy is 6 types, not 7.

### RULING-NEEDED (W1) — the liquid-grid contradiction (cross-band, see below)

Taxonomy design itself is SOUND: the 7-type set mirrors census:15 verbatim, the DATA-registry
(not switch-tree) instruction is the right shape, and the `hero|page` boolean delete honours
no-backwards-compat. The one defect is the liquid-grid fold colliding with BAND-REDUCTION —
adjudicated in the cross-band section.

---

## BAND-MATERIAL

### What holds

- `--radius-input` misnomer: **verified**. `radius.css:35` `--radius-input: var(--radius)`; consumers are `skeleton/Skeleton.vue:35`, `avatar/styles.css:43`, `command/styles.css:41` — zero Input. The rename-not-alias fix is sound and net-negative.
- `--corner-k-soft` / `--corner-k-sharp`: **verified dead** — only the def (`radius.css:118-119`) + the self-citing comment (`:112`); zero `var()` consumers. Delete is clean.
- Raw radius repoints: **verified** — `SortableList.vue:144` `999px`, `segmented.css:169` `0.3125rem`, `:306` `0.25rem`. F15 `infinite-scroll.vue:74 rounded-md` (trusted, corroborated).
- Blur DPI arm: **verified** — `tokens/light-dark.css:34` `@media (min-resolution: 2dppx)` bumps `--glass-blur-overlay-radius: 17px` (line 36). Raw blur: `drawer/styles.css:379 blur(14px)` confirmed (with `:209` on the token, proving the literal is an off-ladder outlier).
- Graded-halo cohort: **verified** — `tokens/glass.css:171-173` `--glass-halo-blur:20px / -core:13rem / -bloom:7rem`; `ModalOverlay.vue:49 isGraded`; `dialog/placement.css:141` FORM 2 box-following bloom. The adopt-or-decline judgment-gate framing is exactly right per codex law 1 and the `chronic:experiment-frozen-into-major` ledger.
- Track-DRY census: `glass-liquid-fill` is genuinely the shared fill register — the fold-the-material / keep-the-driver split is the correct, parsimonious call. **W3/W4/W5 SOUND.**

### AMEND-4 (band-wide) — systematic theme-token mis-path in the born-RED probes

The band's material-authority citations point at a `theme/` directory that does not hold those
files:

```
ABSENT: src/styles/theme/glass.css        cited as glass.css:64-102 / :79-85 / :86-97 / :171-173 / :407
ABSENT: src/styles/theme/light-dark.css   cited as light-dark.css:38-42 / :40
ABSENT: src/styles/theme/glass-deep.css   cited as glass-deep.css:56
```

The real locations: the blur ladder is defined at **`src/styles/tokens/glass.css:138-153`** (not
`glass.css:86-97` — that range in `src/styles/glass.css` is a *comment*); the 2dppx overlay bump
is **`src/styles/tokens/light-dark.css:36`** (not `:40`); the deep rung lives in
**`src/styles/glass/deep.css:78`**; the halo cohort IS at `tokens/glass.css:171-173` (line
numbers right, dir wrong). Note the band located `theme/radius.css` correctly (it does live
there) but wrongly assumed the same dir for glass/light-dark. This is **material**, not
cosmetic: W2 §Acceptance asserts "Collision RED at HEAD (verified): `glass.css:87-88`
quiet==resting" and "`light-dark.css:40` overlay→17px" as born-RED probes — an executor greps
those exact anchors and finds a comment / the wrong file. **Amend:** re-path every
`theme/glass.css` → `tokens/glass.css`, `theme/light-dark.css` → `tokens/light-dark.css`,
`glass-deep.css` → `glass/deep.css`, and re-anchor the blur-ladder line range to `:138-153`
before execution. (The substance — the collision structure, the DPI arm, the one-7px
unification — reproduces; only the anchors are wrong.)

### AMEND-5 (W1) — F12 / F17 fall into an ownership gap

W1's §Acceptance OPEN-1a correctly runs a live-π on F09/F12/F17 before claiming a defect (the
right discipline — the configurator is already `--radius-panel` on disk, tags-input already
`--radius-field`+`--radius-control`). But the routing sentence names only F09/F10/F11 ("route
F09/F10/F11 to `BAND-STORY W-CONFIGURATOR-STD`"). **F12 (tags-input) and F17 (search) have no
named owner if the live-π reproduces them** — `W-CONFIGURATOR-STD` owns the configurator, not
tags-input or search compositions. **Amend:** name the owner for F12/F17-if-reproduced (a story
composition wave), or state explicitly that the live-π is expected to clear them and record the
screenshot drift; do not leave them dangling between material and story.

### RULING-NEEDED (OPEN-B) — the typography-codemod is genuinely unassigned

OPEN-B is correctly flagged, not dropped: the charter scopes BAND-MATERIAL to five waves and
says "coordinate typography with `BAND-GATES` W4, do not duplicate" — but `BAND-GATES` W4 assigns
the 251-site `text-sm/text-xs` codemod + the default-ramp reset to "the Family F typography wave,"
which is THIS band, which does not contain it. The ramp-reset gate stays RED until the codemod
lands and no drafted wave owns it. This is a real hole. **Ruling needed:** a 6th
`BJ.W-TYPE-CODEMOD` here, or in `BAND-STORY` (where 232 demo sites concentrate), or in
`BAND-GATES` W4 all-in. Flagging it is SOUND; it must be ruled, not left open.

---

## BAND-REDUCTION

The strongest of the three drafts. The consumer-truth discipline the charter demanded is
present and correct:

- **Header-ribbon KEEP respected.** `header-ribbon` appears in the band ONLY as the cautionary
  lesson (`:43-49`, `:179`, `:336`, `:515`) — it is in **no** delete roster. Correct: round-2
  proved keyframes.js `EditorShell.vue:116` imports it and MIGRATION.md:115 marks it kept.
- **Atlas `/deck` respected.** The band routes deck to ASK-C1, which keeps deck as the headless
  `useDeck` engine atlas consumes. Consistent with the round-2 truth (slides matches are comments).
- **Round-2 corrected counts used throughout** (instrument-chassis speedtest×4/muster×5;
  metric-badge fourier×7; completion-seal sci-report×2+atlas×2, NOT speedtest).
- **Honest DELTA-class framing**: null-DELTA (dead-config) vs real-DELTA (Card) vs
  intentional-surface (deletes) — no intentional cut dressed as a born-RED defect.

Cuts spot-verified: `Card.vue:33 grain:true`, `:38 metal:"gold"` (real-DELTA, correct);
`slider/types.ts:25 keepDockOpen?`; `fourier-field/presets.ts` exists with **0** importers
(dead-code reach, correct); `dialog.confirm-preset.test.ts:7` imports `GatePatternStory` from
`compositions/gate-pattern.vue` (blast radius correctly flagged with re-home obligation);
`progress/types.ts:12/16 getValueLabel/getValueText` present AND the honest self-correction that
`as/asChild` are NOT present (round-1 stale claim retracted — exactly the discipline the charter
rewards). **W1/W2/W4/W5 SOUND.**

The one defect is W3's liquid-grid delete — cross-band, below.

---

## CROSS-BAND CONFLICT — liquid-grid: fold or delete? (RULING-NEEDED)

Two bands assign the **same artefact** opposite fates, and neither reconciles the collision:

- **BAND-STORY W1** lists `demo/stories/substrates/liquid-grid.vue:113-123` as a fold target:
  "route through the `studio` variant — kill the fork," with gate **G-TAX-3** ("liquid-grid
  renders through the studio variant") and a π obligation to "capture its DELTA as the intended
  studio-normalization." This treats the liquid-grid story page as a **surviving, normalized** page.
- **BAND-REDUCTION W3** (`:282-291`): "drop `./liquid-grid` export + **delete
  `src/components/liquid-grid/`**; re-home the StoryHero suffuse register." Verified on disk:
  `src/components/liquid-grid/LiquidGrid.vue` exists, and the story page imports it
  (`liquid-grid.vue:18 import { LiquidGrid } from "@glass/components/liquid-grid"`). If the
  component is deleted, the story page cannot compile — it **must** be deleted too.

So BAND-STORY plans to keep+normalize a page whose underlying component BAND-REDUCTION deletes.
BAND-REDUCTION's OPEN only arbitrates the StoryHero *suffuse re-home* owner; it never notes that
family D independently plans a fold ON the liquid-grid story page. BAND-STORY never notes the
component is slated for deletion.

**Recommended resolution (design-sound):** DELETE wins. Round-2 confirms liquid-grid has zero
external and zero library consumers (grep=0 all repos); it is a zero-consumer studio-idiom fork.
Under F04/A05 (KISS, "one consumer is not enough," ruthless purge), deleting the fork dominates
keeping-and-normalizing it. **Therefore:** BAND-STORY W1 should DROP liquid-grid from its fold
roster and G-TAX-3 (the taxonomy proves out on studio via aurora/blob/fourier, dock, family —
still four wrapper types minus the fork); BAND-REDUCTION W3 should explicitly own the liquid-grid
**story-page** deletion (currently it names only the component + the StoryHero re-home). Ruling
required so the two bands do not both touch — or both orphan — the same file.

---

## ASK-REDUCTION

**SOUND, Q051 single-ask style, no smuggling.** Each row cleanly separates *Evidence (verified on
disk)* from *Recommendation on record* (labelled, with adjudication provenance — DP-A, Q051
R14/R16) from *The question* from *Unblocks*. Recommendations are never presented as facts; the
consumer counts are the round-2 adversarial truth.

The corrected-consumer honesty the charter asked for is present and load-bearing:
- **A2 (completion-seal)** leads with "the provenance is wrong — speedtest imports it ZERO times"
  and re-targets to sci-report×2 + atlas×2. This is the incomplete-provenance-retarget correction
  verified in round-2 finding 5. Honest.
- **C1 (deck)** surfaces "the atlas `useDeck` fact" and that "every `@mkbabb/glass-ui/deck` string
  in slides is inside a COMMENT" — respects the corrected consumer truth exactly; recommends
  keep-deck-as-headless-engine so collapse cannot silently break atlas.
- **A1 (the third-ask disease)** honestly frames both outcomes (ratify vs the costed ~4-app break)
  and records the recommendation as recommendation.

Coverage is complete against the FEEDBACK-LEDGER reduction rows: F18→A1, F26→A2, F25→C2, F30→C4,
F32/F42→C3, F33→C1, F43/F44/F45→D1, plus the census overfit calls (DataTable→B1, FourierField→B2,
Constellation→B3, easing→B4, WatercolorDot→B5). No reduction question is silently dropped.

**Minor AMEND (D1):** D1 asks "is compositions pruned whole" and gestures at "the family-D
story-meta-framework call," but does not name the concrete consequence — that its answer
determines whether BAND-STORY's `scene` type (OPEN-D9) has any members. Add the cross-ref so the
user sees the taxonomy stake of the prune. (Ties to BAND-STORY AMEND-3.)

---

## Roll-up of required actions

1. **BAND-STORY W4:** strike the "retire the heroScale field" branch — the field is live at `StoryPage.vue:30→:89`; bind the two landings to data instead.
2. **BAND-STORY W6 + prose:** scope to the census's 100 navigable routes; stop calling the 128 `.vue`-file count "story routes/pages."
3. **BAND-STORY OPEN-D9 / ASK D1:** make the `scene` type contingent on the compositions-prune; if pruned, 6 types not 7. Cross-ref both directions.
4. **BAND-MATERIAL W1/W2:** re-path all `theme/glass.css`→`tokens/glass.css`, `theme/light-dark.css`→`tokens/light-dark.css`, `glass-deep.css`→`glass/deep.css`; re-anchor the blur ladder to `tokens/glass.css:138-153` and the 2dppx arm to `tokens/light-dark.css:36`.
5. **BAND-MATERIAL W1:** name the owner for F12/F17 if the live-π reproduces them.
6. **BAND-MATERIAL OPEN-B:** rule the typography-codemod home (6th wave here / BAND-STORY / BAND-GATES W4).
7. **CROSS-BAND (STORY W1 ⟂ REDUCTION W3):** rule liquid-grid's single fate (recommend DELETE); align both bands.

Everything not listed is SOUND: the story taxonomy shape, the copy canon, the configurator
standard, the preview-card reformation, the radius reconcile, the graded-backdrop judgment gate,
the track-DRY fold, the aristotelian review, the whole reduction consumer-truth spine, and the
ASK's single-ask honesty.
