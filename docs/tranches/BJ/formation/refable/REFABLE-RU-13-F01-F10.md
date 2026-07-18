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
  was the WGSL `applyMedium` re-proof (the claim most likely fabricated — `presets.ts:73-77` reads
  contrary — re-proven EXACT at `aurora-mediums.wgsl.ts:387-403`), after which remaining cites were
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
| F01 | `SectionPreviewCard.vue:35-54/:63-65` (cv:auto + 19rem), landings' fixed `grid-cols-3` (`:33`/`:32`), 4 `.tile.vue` total, `CatalogLanding.vue:7→:40` identityTile ladder-bypass, `AppShell.vue:11,26-28` eager imports, `:147-156` fixed-inset shell Aurora, R3b idle-rAF (`REGISTRY.md:322-326`); routing STORY W5 + PERF W1/W2/W3 |
| F02 | mechanism identical to F01 on `/foundations`; R3a CLEARED-as-paint-defect engaged with the authorship-cure nuance (`REGISTRY.md:291-294`; crosswalk `:24`) |
| F03 | `layers.vue:279` "Controlled — no rail" / `:329` "Mechanics" / `:330-337` the ol (screenshot verbatim); `manifest.ts:932`; routing STORY W2 + MATERIAL W5 |
| F05 | postures grid `rail.vue:142-189`; exactly ONE `<Aurora>` on the page at `:69` behind a different section; the DISAGREE-vs-CLEARED-by-R3b stance (vindicated as J2) |
| F06 | `router.ts:121-130` blocking beforeResolve; `AppShell.vue:201-203` bare keyed swap; `:59`/`:192` missing-affordance comments; R3a min-ch ≤9/255 + 186ms cold (`REGISTRY.md:295-297`); crosswalk CLEARED `:28` |
| F07 | PERF W4 the outright F07 owner (PLAN §1 verbatim); the keyed-swap anti-pattern |
| F08 | **the WGSL alias**: `applyMedium` routes mediums 3/5/6/7 → `mediumKuwahara` (`aurora-mediums.wgsl.ts:387-403`); 17 presets incl. `SPEEDTEST` (`presets.ts:685-703`); GF-AURORA W1-W5 + the C-G discharge binding. The `presets.ts:73-77` "each authors its own body" comment describes the WebGL2 fallback arm — no contradiction |
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
  verified: Card.vue:33,38").** The Card gold+grain default IS live (re-proven) and the
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
| RT1 | `greenfields/GF-DOCK-PASS3.md` §5 (`:204-206`) + §Gates (`:225-226`, the F04/F47 baseline) | FLIP-1: correct "stadium pill"→`shape="rounded"`; pin the W5 baseline π to `rail.vue:108-140`; add the `shape`-axis ruling to W5's shape-grammar scope |
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
- **RT1/RT2 confirmed STILL-LIVE at HEAD** (`GF-DOCK-PASS3.md:204-217` unchanged;
  `BAND-REDUCTION.md:36`/`:240` still label the Card probe "the F04 shape"). The lead's re-judge
  remains owed.
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
  the Card probe "the F04 shape".
