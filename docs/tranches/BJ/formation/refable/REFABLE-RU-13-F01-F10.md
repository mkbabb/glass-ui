# REFABLE RU-13 — F01-F10: the redress dossier redo (feedback rows 1-10)

- **Unit**: RU-13-F01-F10 — every feedback-ledger row F01-F10 inventoried, isolated, targeted, and
  planned for redress; screenshot→component correlation + post-mortem + amelioration vs the bands at
  HEAD.
- **modelId**: `claude-fable-5` (prior run: `claude-opus-4-8` via the settings-level override; the
  prior artifact self-described "(Fable seat)" in its header — corrected in the union).
- **Step-2 boundary**: ANEW ran first against primary sources only — the six on-disk screenshots
  re-read (F01/F03/F04/F05/F09/F10), the named pages/components at HEAD in full
  (`rail.vue`, `overview.vue`, `layers.vue`, `SectionPreviewCard.vue`, `storyTile.ts`, the landings,
  `AuroraColorSection.vue`, `AuroraConfigDock.vue`, `configurator/styles.css`, `Configurator.vue`,
  `useDockShellProps.ts`, `Card.vue`, `routeTransition.ts`, `router.ts`, `AppShell.vue`,
  `aurora-mediums.wgsl.ts`, the two preset rosters), PLAN.md + BAND-STORY/PERF/REDUCTION +
  GF-DOCK/GF-AURORA PASS3. The opus dossier was opened only after the per-row correlations were
  fixed. Under assumed-wrong scrutiny its file:line cites kept re-proving TRUE; the boundary moment
  was the WGSL `applyMedium` re-proof (the claim most likely fabricated —
  `src/components/aurora/constants/presets.ts:73-78` reads contrary — re-proven EXACT at
  `aurora-mediums.wgsl.ts:387-403`), after which remaining cites were
  spot-verified rather than presumed false. The one standing substantive error found: F04's
  section/silhouette anchor.
- **Tree parity**: `55f5170d..HEAD(4757315a)` carries **zero `src/`/`demo/` commits** — both passes
  judged the SAME paint tree. The docs-only drift (the JUDGE.md application pass) is material: it
  discharges the opus dossier's three deltas.
- **Union**: `redress/DOSSIER-F01-F10.md` REWRITTEN IN PLACE (verified-model line + provenance note
  stamped; F04 corrected; F03/F05/F09 verdicts updated PARTIAL → EXACT-AT-HEAD; LIVE-DEFER marks
  added; the superseded delta texts dropped in favor of the applied band text).
- **Live-paint fence honored**: no browser owned. LIVE-DEFER marks: F02 blank-degree at first paint,
  F05 shift repro + staged-field after-π, F06 flash re-repro (R3a artefact stands as evidence),
  F07 expressive after-state, F08 perceptual preset near-identity (the WGSL aliasing needs no paint —
  it is a literal shared body), F09 resting-radius live-read (OPEN-D5), F10 ≥3-rung after-read.

## Verdict table

### Ratified (opus claim re-proven on disk)

| Row | Core claims re-proven |
|-----|------------------------|
| F01 | `SectionPreviewCard.vue:35-54/:63-65` (cv:auto + 19rem), landings' fixed `grid-cols-3` (`:33`/`:32`), 4 `.tile.vue` total, `CatalogLanding.vue:7→:40` identityTile ladder-bypass, `AppShell.vue:11,26-28` eager imports, `:147-156` fixed-inset shell Aurora, R3b idle-rAF (`REGISTRY.md:327-329`; re-pinned RU-14 R6 after the B1/B2 re-stamps); routing STORY W5 + PERF W1/W2/W3 |
| F02 | mechanism identical to F01 on `/foundations`; R3a CLEARED-as-paint-defect engaged with the authorship-cure nuance (`REGISTRY.md:293-296`; re-pinned RU-14 R6; crosswalk `:24`) |
| F03 | `layers.vue:279` "Controlled — no rail" / `:329` "Mechanics" / `:330-337` the ol (screenshot verbatim); `manifest.ts:932`; routing STORY W2 + MATERIAL W5 |
| F05 | postures grid `rail.vue:142-189`; exactly ONE `<Aurora>` on the page at `:69` behind a different section; the DISAGREE-vs-CLEARED-by-R3b stance (vindicated as J2) |
| F06 | `router.ts:121-130` blocking beforeResolve; `AppShell.vue:201-203` bare keyed swap; `:59`/`:192` missing-affordance comments; R3a min-ch ≤9/255 + 186ms cold (`REGISTRY.md:297-299`; re-pinned RU-14 R6); crosswalk CLEARED `:28` |
| F07 | PERF W4 the outright F07 owner (PLAN §1 verbatim); the keyed-swap anti-pattern |
| F08 | **the WGSL alias**: `applyMedium` routes mediums 3/5/6/7 → `mediumKuwahara` (`aurora-mediums.wgsl.ts:387-403`); 17 presets incl. `SPEEDTEST` (`presets.ts:685-703`); GF-AURORA W1-W5 + the C-G discharge binding. The `src/components/aurora/constants/presets.ts:73-78` "each authors its own body" comment describes the WebGL2 fallback arm — no contradiction |
| F09 | `Configurator.vue:211` `--radius-ctx: var(--radius-panel)` (+`rounded-panel = --radius-xl` `:146`); the concentric relay `styles.css:109-113`; the inner-pill vs outer-card read; J5's regression-guard class membership |
| F10 | `StorySection.vue:31-32` single-rung h2; `sizing-config.css:35` `--configurator-section-size = --type-subheading` 20.4px ~4px above field labels; the two-site diagnosis; routing STORY W3 + MATERIAL W6 |

### Opus-wrong / corrected (fresh evidence authoritative)

| # | Claim | Verdict | Correction |
|---|-------|---------|------------|
| W1 | F04 shows "a single vertical **stadium-pill** dock", targeted at the **"Vertical dock" section** (`rail.vue:31-40` entries + "the leading slice") | **WRONG — both anchor and silhouette** | The screenshot dock renders home + exactly `entries.slice(0,4)` (Compass/Shapes/Boxes/Navigation — the exact icon census) with FINITE rounded-rect corners on a bare black backdrop. The "Vertical dock" section renders home + ALL EIGHT entries AND sits over the contained Aurora wash (`rail.vue:69`) — it cannot be the pure-black 5-icon screenshot. The referent is **"Rounded shape", `rail.vue:108-140`**: `<GlassDock orientation="vertical" always-expanded shape="rounded">` (`:117-121`). Consequence: the abrogation surface includes the 3-value **`shape` axis** (`useDockShellProps.ts:53`, live setters `"rounded"`/`"card"` — NOT in REDUCTION W1's dead-knob cut); its disposition belongs to GF-DOCK W5's shape grammar, and W5's baseline π must shoot the right section. Tree parity rules out drift as an excuse |
| W2 | Header: "(Fable seat)"; HEAD pin presented without model provenance | **CORRECTED** | Ran `claude-opus-4-8` per the REFABLE census; union stamps the verified-model line + provenance. The `55f5170d` pin itself is real (commit exists on `codex/bi-p-q-execution`) and tree-parity with `master` HEAD holds |
| W3 | Staleness class (not wrong when written): F03 "G-COPY-2 greps handmark/search only — layers.vue unpinned"; F05 "the aurora sub-ask has no owner"; F09 "roominess has no owner"; the three PARTIAL verdicts + delta texts | **STALE AT HEAD — superseded by their own adoption** | All three deltas were adopted as JUDGE **J8/J2/J10** and APPLIED: G-COPY-2 now names `layers:279-335` + bans the Mechanics-narration PATTERN; BAND-STORY W1 owns the dock-backdrop consistency (crosswalk corrected CLEARED-by-R3b → LANDED); W3 carries the ROOMINESS/SCALE gate. Union verdicts updated PARTIAL → EXACT-AT-HEAD; the superseded delta texts dropped |

### Fable-new (absent from the opus artifact)

| ID | Finding | Evidence |
|----|---------|----------|
| N1 | The F04 re-anchor + the `shape` axis confrontation (the W1 correction's positive half): F04-direct surface = the `shape="rounded"` silhouette + the DockControl rings; the axis's keep/kill is a GF-DOCK W5 shape-grammar ruling, currently unowned BY NAME anywhere (W5 names radius grammar + rings; the `shape` prop is named in no cut list) | `useDockShellProps.ts:36-53`; `rail.vue:117-121`; GF-DOCK-PASS3 §5/W5; BAND-REDUCTION W1 GlassDock cut roster (position/autoLuminance/containerName/viewTransitionName only) |
| N2 | F05 page disambiguation by backdrop: both `rail.vue` and `overview.vue` carry "Starts compact/open" postures; `overview.vue:118` wraps in `<DockStage>` (aurora field) while rail's postures div is bare — the pure-black screenshot pins to rail.vue, independently corroborating J2's "R3b's field evidence was a DIFFERENT dock" | `overview.vue:53-56,:118`; `rail.vue:142-189` |
| N3 | The deltas-discharged reconciliation: the opus artifact's three deltas are now IN the band text (J8/J2/J10 applied in-place) — any future reader of the dossier's PARTIAL verdicts would re-litigate settled corrections; the union re-verdicts against HEAD | `BAND-STORY.md` W2 gate table + judgment-corrections section; `JUDGE.md:21-25,50-52,57-59`; `ASSEMBLY-CROSSWALK.md:243` |

## FLIPS (findings contradicting a JUDGE ruling or a band-charter premise — the lead re-judges)

**No J1-J11 ruling is contradicted** — J2/J8/J10 are independently corroborated at source by this
redo. Two band/greenfield charter premises flip:

- **FLIP-1 — GF-DOCK-PASS3 §5 + CRIT2 C6 (the lead-adjudicated F04 description).** §5 states, as
  lead-confirmed fact, that F04 shows nav-icon rings "inside a **stadium pill**", and CRIT2 C6
  REFUTED the pass-1 "fabricated from an unread screenshot" charge on that description. Fresh
  evidence: the F04 dock is the **`shape="rounded"`** register (finite rounded-rect — a clear flat
  top-edge run), section `rail.vue:108-140`, icon census home + `slice(0,4)` exact. The
  ring-construction half of C6's adjudication SURVIVES (rings confirmed); the silhouette + section
  half does not. Re-judge scope: (a) W5 `G-RADIUS-GRAMMAR`'s baseline π must target
  `rail.vue:108-140`, not the aurora-staged "Vertical dock" section; (b) the shape grammar must rule
  the 3-value `shape` axis itself (`useDockShellProps.ts:53`) as F04-direct surface — keep, collapse,
  or re-grammar — not only the rings.
- **FLIP-2 — BAND-REDUCTION framing §2 / `G-CARD-DEFAULT-PAINT` ("the F04 shape is LIVE today —
  verified: Card.vue:33,38").** **[RU-14 R6: CONSUMED — the relabel EXECUTED by the union
  `1340a918`; "F04 shape" greps 0 in `BAND-REDUCTION.md`; the probe is `G-CARD-DEFAULT-PAINT`
  (`:237`); docket row 4 / D2-4 CONSUMED-BY-UNION. Historical text below.]** The Card gold+grain default IS live (re-proven) and the
  neutralization wave STANDS — but it is not "the F04 shape": the F04 screenshot shows a dock, not a
  Card. The gate's label mis-claims the screenshot as its baseline referent. Re-judge scope: relabel
  the wave's F04 linkage to the ORDER ("opinionated defaults; KISS"), not the screenshot, so the
  born-RED paint probe is never presented as a before/after of the F04 image. (The opus dossier
  itself framed this correctly; the band charter does not.)

## Tallies

- Ratified: **9 rows** (F01, F02, F03, F05, F06, F07, F08, F09, F10 — F03/F05/F09 with the
  PARTIAL→EXACT-AT-HEAD staleness update)
- Opus-wrong: **1 row** (F04 — correlation corrected; redress routing survives)
- Fable-new: **3 findings** (N1-N3)
- FLIPs for the lead: **2** (GF-DOCK §5/C6 silhouette+section; BAND-REDUCTION "the F04 shape" label)

## ROUTING (re-touch anchors from this unit)

| # | Anchor | Re-touch |
|---|--------|----------|
| RT1 | `greenfields/GF-DOCK-PASS3.md` §5 (`:204-206`) + the F04/F47 baseline: RED-at-HEAD `:217`, W5 roster `:322`, `G-RADIUS-GRAMMAR` `:388` [re-anchored RU-14 R7 post-`117b7f12` — the old §Gates `:225-226` pin now lands in §6 W6 crossfade prose] | FLIP-1: correct "stadium pill"→`shape="rounded"`; pin the W5 baseline π to `rail.vue:108-140`; add the `shape`-axis ruling to W5's shape-grammar scope |
| RT2 | `waves/BAND-REDUCTION.md` §Band framing item 2 + W2 `G-CARD-DEFAULT-PAINT` (`:33-37`, `:240`) | FLIP-2: relabel "the F04 shape" → "the F04 order's opinionated-defaults surface"; the gate itself stands |
| RT3 | `redress/DOSSIER-F01-F10.md` | DONE this unit — union rewritten in place |

## RE-VERIFICATION — second independent Fable pass (2026-07-18)

A second RU-13-F01-F10 seat (`claude-fable-5`) ran the full protocol against the committed union
(`ced045d1` at its HEAD). ANEW ran first and complete — the six screenshots re-read, the ledger rows,
PLAN + BAND-STORY/PERF/REDUCTION + GF-DOCK/GF-AURORA + JUDGE + crosswalk, and the named sources at
HEAD (`rail.vue`, `overview.vue`, `layers.vue`, `SectionPreviewCard.vue`, `storyTile.ts`,
`CatalogLanding.vue`, `AuroraColorSection.vue`, `AuroraConfigDock.vue`, `Configurator.vue` + its
styles, `toggle-group/styles.css`, `routeTransition.ts`, `TransitionRouteLink.vue`, `router.ts`,
`AppShell.vue`, dock `controls/`+`shape.css`, `useDockShellProps.ts`, `Card.vue`, both preset
rosters, `aurora-mediums.wgsl.ts`, `StorySection.vue`, `sizing-config.css`, R3A-DIGEST) — the union
opened only after the per-row correlations were fixed. Findings:

- **Independent convergence on the F04 correction.** The `entries.slice(0,4)` icon census
  (Compass/Shapes/Boxes/Navigation + home) and the "Rounded shape" `rail.vue:108-140` anchor were
  reached in ANEW before the union was read — the unit's one OPUS-WRONG verdict is corroborated
  from scratch, not inherited.
- **Every load-bearing cite re-proven at the same tree** (no `src/`/`demo/` commits since
  `4757315a`): the WGSL `applyMedium` 3/5/6/7→`mediumKuwahara` alias (`aurora-mediums.wgsl.ts`,
  fn body verbatim); `PRESETS` = 17 keys incl. `SPEEDTEST` (`presets.ts:685-703` exact);
  `shape?: "pill" | "rounded" | "card"` (`useDockShellProps.ts:53`); the blocking `beforeResolve`
  chunk-await (`router.ts:121-130`); the bare keyed swap + no `::view-transition` CSS anywhere in
  `demo/`; `CatalogLanding.vue:7→:40` identityTile ladder-bypass; 4 `.tile.vue` repo-wide;
  `content-visibility:auto` + `contain-intrinsic-size:auto 19rem` (`SectionPreviewCard.vue:63-65`);
  `grain: true`/`metal: "gold"` live Card defaults; `--radius-ctx: var(--radius-panel)`
  (`Configurator.vue:211`) + the concentric relay; the 280px/360px aside band; the pill radius on
  the harmony chips (`toggle-group/styles.css:42` + `basis-[calc(50%-0.25rem)]`);
  `StorySection.vue:32` single-rung h2; `--configurator-section-size: var(--type-subheading)`
  (`sizing-config.css:35`); `label="Color" sub="seed · harmony · palette"`
  (`AuroraConfigDock.vue:267`); `manifest.ts:932`; the deliberate `dock: "grid"` category
  background with the one-GL-per-route rationale (`manifest.ts:207-231` — the F05 aurora-half's
  design context); **73** modulepreloads counted in the committed `dist-demo/index.html`.
- **Zero corrections to the union.** Two nits, immaterial: GF-DOCK-PASS3 §5 at HEAD carries the
  "stadium pill" phrase as the forward grammar line (`:211`), not a literal F04-screenshot
  description — FLIP-1's operative re-judge scope ((a) baseline-π anchor, (b) the `shape`-axis
  ruling) is unaffected and both remain unapplied; Card's `metal: "gold"` default sits at
  `Card.vue:39` where BAND-REDUCTION says `:38`.
- **RT1/RT2 confirmed STILL-LIVE at HEAD** (`GF-DOCK-PASS3.md:204-217` unchanged [RU-14 R7: a
  pre-`117b7f12` read — the §5 ring-delete content does still sit at `:204-206`/`:217`, but the
  §Gates half moved; RT1's pins re-anchored in the ROUTING table above];
  `BAND-REDUCTION.md:36`/`:240` still label the Card probe "the F04 shape"). The lead's re-judge
  remains owed. [RU-14 R5: RT2's half has since been CONSUMED — the committed union `1340a918`
  relabeled the probe (`grep "F04 shape"` = 0; G-CARD-DEFAULT-PAINT at `BAND-REDUCTION.md:237`);
  RT1 (GF-DOCK) stays live. See the R5 addendum.]
- **Dossier left byte-stable** — the union is RATIFIED as canon by two independent Fable passes.

## RU-14 addendum (2026-07-18, fix seat claude-fable-5)

- **F08 REDRESS refreshed in the dossier**—the row's redress figures had gone stale against the
  re-unioned GF-AURORA-PASS3 at HEAD (117b7f12): 17→10-firm is now **17→11** with death-clause
  elasticity (`:237/:315/:461`; SUPERFLUITY C-H corroborates ~11-not-10), W4 is the three-arm
  PORT/REAUTHOR-LEAN(default)/KILL fork, and the crayon ink-mode ASK is resolved-CUT with
  **Q-AURORA-QUARTET** the live ask. The mechanism layer (WGSL 3/5/6/7→`mediumKuwahara`, 17
  presets incl. SPEEDTEST, the C-G discharge binding) is untouched—it re-proved exact.
- **FLIP-1/FLIP-2 remain OPEN**—docketed for the consolidated JUDGE-2 pass (see
  `../redress/DOSSIER-F11-F20.md` §JUDGE-2 docket): GF-DOCK-PASS3 at HEAD still lacks the
  `rail.vue:108-140` baseline-π + `shape`-axis ruling; BAND-REDUCTION `:33-37`/`:240` still label
  the Card probe "the F04 shape". [RU-14 R5: FLIP-2 no longer — CONSUMED-BY-UNION at `1340a918`;
  FLIP-1 verified still live. See the R5 addendum.]

## RU-14 R3 addendum (2026-07-18, ring round 3 fix seat claude-fable-5)

- **The consolidated JUDGE-2 docket is TEN items, not seven** (rows 8-10 seated R3: D2-F23
  value-marks, the RU-09 F33 goo-clone migration, the ASSEMBLY-CROSSWALK F34-F40 handmark rows;
  full table in `../redress/DOSSIER-F11-F20.md`). This dossier's §JUDGE-2 count language updated
  to match — its two rows (D2-3/D2-4) are unchanged. Cures RU14-CRIT2-A MAJOR-1's silent-drop
  class: a lead executing "rule all seven" would have dropped the F23 re-open.

## RU-14 R4 addendum (2026-07-18, ring round 4 fix seat claude-fable-5)

- **The F08 presets-comment cite full-pathed (CRIT3-A R3A-3 cured).** The "first-class
  mediums… no shared dispatch" comment lives at
  `src/components/aurora/constants/presets.ts:73-78` (re-verified on disk this seat), NOT in
  the demo preset roster the surrounding rows pin (`demo/stories/substrates/aurora/presets.ts`,
  whose `:73-77` are OKLCH color stops). All three corpus sites (dossier F08 body + this
  file's boundary-moment line + the F08 ratified-table row) now carry the full path; the span
  corrected :73-77 → :73-78 (the comment's six lines).
- **The F08 summary-row C-labels pinned (CRIT3-A R3A-5 cured).** The dossier docket row now
  reads "under JUDGE C-G (`JUDGE.md:94`) / SUPERFLUITY C-H (`SUPERFLUITY.md:674-681`)" —
  disambiguating the colliding C-label vocabularies per the JUDGE-2 docket's label note
  (JUDGE-C-G = the F08 binding; SUPERFLUITY-C-G = the F23 dispute; C-H SUPERFLUITY-only).

## RU-14 R5 addendum (2026-07-18, ring round 5 fix seat claude-fable-5)

- **FLIP-2 (D2-4) CONSUMED-BY-UNION (CRIT4-A R4A-1 share).** The committed RU-03/04 nine-band
  union (`1340a918`) relabeled the Card default-paint probe: `grep "F04 shape"
  BAND-REDUCTION.md` = 0 at HEAD; the probe is G-CARD-DEFAULT-PAINT (`BAND-REDUCTION.md:237` —
  "a default `<Card>` at HEAD renders `metal:gold` + `grain:true` (`Card.vue:33,:39`)"). The
  dossier's §JUDGE-2 section now splits its two rows LIVE (D2-3) vs CONSUMED (D2-4); J12+
  ratifies-and-closes D2-4 per ledger C5, never re-applies. FLIP-1 (D2-3) re-verified still
  live this round (GF-DOCK-PASS3 `rail.vue` grep = 0, file unchanged at `117b7f12`).
- **Pin sweep (R4A-6 share):** the dossier's F03 FSF cite re-anchored to §8 finding 10
  (`FABLE-STORY-FRAMEWORK.md:550-554`; `:385-391` is now the §7 amendments header — G-COPY-2
  orders "anchor by section, never line"), and F01's G-PRV roster corrected to G-PRV-1..5 (the
  union adds the G-PRV-5 0-GL regression-guard, `BAND-STORY.md:462`).

## RU-14 R6 addendum (2026-07-19, ring round 6 fix seat claude-fable-5)

- **CRIT5-A R5A-2 (MAJOR) CURED — the stale 251 codemod figure corrected.** The F10 REDRESS
  asserted a "251-site codemod"; the band's standing figure is **234 = 218 demo + 16 src** (+ the
  9 arbitrary `text-[…]` sites as a separate named arm) per FLIP F-3's consumption —
  `BAND-GATES.md:376-379` (the filtered-grep method) + `BAND-MATERIAL.md:665-666` ("the 251
  figure is STALE"). The F10 clause now carries the executed 234 (+9) figure with both pins.
  This range previously contained zero mention of 234 — a reader of F01-F10 alone carried a
  codemod scope the band had declared stale for five ring rounds.
- **CRIT5-A R5A-4 (MINOR) CURED — the F04 mislabel tense closed.** The dossier's
  opinionated-defaults bullet and this file's §FLIPS FLIP-2 paragraph now read past-tense /
  bracketed: the union relabeled the probe (`grep "F04 shape"` = 0; `G-CARD-DEFAULT-PAINT` at
  `BAND-REDUCTION.md:237`; D2-4 CONSUMED). No site in either file asserts the mislabel as
  current.
- **CRIT5-A R5A-5 (MINOR) CURED — three REGISTRY spans re-pinned** after the B1/B2 re-stamps
  (`5f8ee2e3`): idle-rAF `:322-326` → `:327-329` (F01), F02-CLEARED `:291-294` → `:293-296`,
  F06 white-flash `:295-297` → `:297-299`. Dossier + this file's mirror rows both corrected;
  substance survives verbatim at the shifted anchors.
- **CRIT5-A R5A-6 share (MINOR) CURED** — the D2-4 close cite now reads "per the ledger-C5
  posture (C5 itself enumerates rows 5+9; D2-4's stamp is lead-owed)".
- **CRIT5-A R5A-7a (MINOR) CURED** — the F09 J5-class clause no longer imports the stale F17
  posture: F17 is flagged FLIPPED OUT to BORN-RED FIX by the union (`BAND-MATERIAL.md:135`),
  with `JUDGE.md:38` kept valid as a ruling quote.

## RU-14 R7 addendum (2026-07-19, ring round 7 fix seat claude-fable-5)

- **CRIT6-A R6A-4 (MINOR) CURED — RT1's pins re-anchored past the `117b7f12` rewrite.** The
  ROUTING RT1 row pinned the lead's re-touch at "§5 (`:204-206`) + §Gates (`:225-226`, the
  F04/F47 baseline)"; after the rewrite, `:225-226` is W6 crossfade STRUCK prose (the §5 half
  still lands on ring-delete content — coincidental geography). RT1 now pins the baseline where
  it lives at HEAD: RED-at-HEAD `:217`, W5 roster `:322`, `G-RADIUS-GRAMMAR` `:388`. The
  RE-VERIFICATION bullet's ":204-217 unchanged" endorsement is bracketed as a pre-rewrite read.
  FLIP-1's substance (D2-3) needs no movement; the R5 rail.vue grep-0 stands.
