# CRIT2-A — Fable critic pass 2, seat A (consecutive-clean check), BJ redress dossiers F01–F30

**Mode:** TRANCHE DEVELOPMENT. This file is the only artifact — no `src/`/`demo/` touch, no commit.
**Charge:** fresh critic, did NOT write the dossiers / CRIT1-A / FIXLOG-PASS1. Two jobs: (1) VERIFY
each CRIT1-A fix actually landed correctly in the dossier text and holds on disk; (2) hunt NEW faults
pass 1 missed — re-read screenshots first-hand, re-verify anchors at the CURRENT HEAD, re-check every
REDRESS owner citation against the current band files, and align every dossier row against the new
`formation/superfluity/SUPERFLUITY.md` verdicts (F25/F23/F30/F16 in particular).

**Verification base.** Current repo HEAD = `b29beaa9` (`v7.0.0-25`), on `master`. This is **5 commits
PAST** CRIT1-A's verification HEAD (`091d09ab` / `v7.0.0-20`) — so every anchor was re-read again on
current disk, not trusted from pass 1. Result: despite the further drift, the ten CRIT1-A fixes all
still resolve correctly at `b29beaa9` — the band files' cited wave headers and the src/demo anchors did
NOT move under these 5 commits.

**Read first-hand this seat.** Screenshots: `F05-anim-shift-no-aurora.png`, `F27-dock-vertical-scroll.png`,
`F28-blur-inconsistency.png` (all three match their dossier ISOLATIONs with no invented detail — see
below). Disk anchors spot-verified at HEAD: **26** file:line sites across the three dossiers (list at the
end). Band-file REDRESS owners: every cited wave header + the load-bearing sub-line anchors in
BAND-STORY / BAND-MATERIAL / BAND-REDUCTION / BAND-FEEDBACK-MOTION / BAND-PERF. Superfluity: all four
scope-named rows (F25/F23/F30/F16) plus F08/F18/F26 cross-checked against the dossier verdicts.

Severities: BLOCKER (verdict wrong / owner absent / silent drop), MAJOR (substantive inaccuracy needing
rework), MINOR (a not-disk-true claim, substance intact), NOTE (observation, does not break clean).

---

## DOSSIER-F01-F10

### CRIT1-A fix verification

| # | CRIT1-A finding | sev | FIXLOG action | landed in dossier text? | holds on disk @b29beaa9? | status |
|---|-----------------|-----|---------------|-------------------------|--------------------------|--------|
| 1 | F01 content-visibility anchor `:37-45`→`:63-65` | MINOR | APPLIED | yes (F01 TARGET now `:63-65`) | yes — `SectionPreviewCard.vue:63` `content-visibility:auto`, `:65` `contain-intrinsic-size:auto 19rem` | **LANDED** |
| 2 | F04 `entries` `:29-39`→`:31-40` + scope "matches" to sliced render | MINOR | APPLIED | yes (F04 TARGET `:31-40`, sliced-render scoped, "full eight-entry array does not") | yes — `const entries` `:31`, 8-entry array `:31-40` | **LANDED** |
| 3 | F05 postures `:73/:78/:84/:88`→`:142/:147/:153/:157`; D-F05 `:73-120`→`:142-189` | MINOR | APPLIED | yes (ISOLATION + D-F05 both re-anchored) | yes — heading `:142`, spring `:147`, v-for `:153`, labels `:157`; `<Aurora>` still `:69` | **LANDED** |
| 4 | F10 `sizing-config.css:35` path `configurator/`→`src/styles/tokens/` | MINOR | APPLIED | yes (F10 TARGET `src/styles/tokens/sizing-config.css:35`) | yes — `--configurator-section-size` at that path, `:35` | **LANDED** |
| 5 | F05 disagreement UNDERSOLD — add `GF-DOCK-PASS3.md:27` (C5) | NOTE | APPLIED | yes (D-F05 carries the C5 "split correctly" corroboration) | n/a (corroboration cite) | **LANDED** |

All five CRIT1-A items landed correctly and survive the 5-commit drift. The F01 struck-line
reconciliation anchor also re-checked clean: `BAND-STORY.md:374` still reads "render a LIVE miniature …
a real, cheap render" (the exact line the dossier says AMEND-D-4 supersedes), and `BAND-STORY.md:407`
carries the reconciliation ("CHEAP live miniatures: a single static frame / paused … NOT a live loop").

### New findings

**MINOR — F03 — the born-RED site enumeration mis-states G-COPY-2 (over-includes "manifest").**
Claim (F03 REDRESS + the appendable D-F03): *"BAND-STORY W2's born-RED site enumeration (`G-COPY-2`,
`BAND-STORY.md:195`) names handmark/search/manifest but NOT `layers.vue`"* and D-F03 says add layers.vue
*"alongside handmark/search/manifest"*. Disk truth: the current `G-COPY-2` (`BAND-STORY.md:195`) greps
`demo/stories/motion/handmark.vue demo/stories/data/search.vue` → matches at `handmark:26/67/119-120,
search:492` — **handmark + search only; `manifest.ts` is in no G-COPY gate** (G-COPY-1 = mono-caption
decorations, G-COPY-3 = auth-shell credentials, G-COPY-4 = handmark se-guard). CRIT1-A itself wrote
"G-COPY-2 … greps handmark+search only" (line 92) but never flagged the dossier's over-inclusion. The
load-bearing residue is intact (layers.vue is genuinely absent from every G-COPY gate, and no
"Mechanics narration PATTERN" ban clause exists — I re-confirmed both), so the PARTIAL verdict and the
D-F03 delta stand. Required fix: drop "manifest" from the enumeration in the F03 REDRESS and in D-F03
(or relocate it as the FSF copy-canon census, where `manifest.ts:932` legitimately sits), so the
appendable delta describes G-COPY-2's actual site list.

### Superfluity alignment
- **F08** (SUPERFLUITY COLLAPSE-FAMILY, C-G): SUPPORTS + SHARPENS the dossier F08 — both name the
  WGSL 4-way `mediumKuwahara` alias (3/5/6/7) and bind the 17→10 preset cut to real-body authorship
  (`G-MODE-DISTINCT`). The dossier's F08 REDRESS already carries the de-alias + per-mode bodies + DUSK
  concern. **Aligned, no conflict.**
- No other superfluity row falls in F01–F10's scope.

### Verdict: **AMEND(1)** — one MINOR (F03 G-COPY-2 "manifest" over-inclusion). All CRIT1-A fixes landed.

---

## DOSSIER-F11-F20

### CRIT1-A fix verification

| # | CRIT1-A finding | sev | FIXLOG action | landed in dossier text? | holds on disk @b29beaa9? | status |
|---|-----------------|-----|---------------|-------------------------|--------------------------|--------|
| 6 | F13–F20 systematic ledger off-by-one (decrement by 1) | MINOR | APPLIED | yes (F13 `:25` … F20 `:32`) | yes — FEEDBACK-LEDGER: F13=25, F14=26, F15=27, F16=28, F17=29, F18=30, F19=31, F20=32 (F21=33) all exact | **LANDED** |
| 7 | F11 `BAND-STORY.md:552` mis-cite dropped; re-anchor to G-CFG-3 `:267` | MINOR | APPLIED | yes (F11 REDRESS now cites `:242,267`; no `:552`) | yes — G-CFG-3 at `:267` reads "inter-ROW gap = 0 within a group; the gap is BETWEEN groups" verbatim | **LANDED** |
| 8 | F19 alert BASE `:7`→`:8`, TONE `:9-18`→`:11-18` | NOTE | APPLIED | yes (ISOLATION + TARGET re-anchored) | yes — `index.ts:8` `rounded-lg` BASE; tones `:11-18` all `[backdrop-filter:var(--glass-blur-wash)]` | **LANDED** |

All three CRIT1-A items landed correctly. The ledger decrement is the load-bearing one — I re-mapped
the ledger from disk line-by-line; the collision CRIT1-A warned of (F20's old `:33` pointing at the F21
row) is resolved.

### New findings
None. Every REDRESS owner re-verified at HEAD: G-CFG-3 `BAND-STORY.md:267`; RESPONSIVE-AUDIT `:420`,
G-RSP-1 `:466`, G-RSP-3 `:468`; RADIUS-ROLE RULING-8 (`BAND-MATERIAL.md:124-142`) + lead amendment
(`:667-669`, verified verbatim: "W1's RULING-8 conditional on F12/F17 converts to REGRESSION-GUARDS");
F15 reset RED `BAND-MATERIAL.md:134` (verbatim); REDUCE-TIMELINE `BAND-REDUCTION.md:432` + A2 `:524`;
REDUCE-CROSSREPO-GATED `:360`; ALERT-IDIOM `BAND-FEEDBACK-MOTION.md:72`; TOAST-DIALOG-PARITY `:30`. The
two PARTIALs (F13 drag-affordance residue, F20 stale born-RED baseline) remain disk-true and correctly
scoped.

### Superfluity alignment
- **F16** (SUPERFLUITY COLLAPSE-FAMILY, C-C): SUPPORTS + SHARPENS. The dossier F16 routes the redesign
  to the STUB→design-loop and says "a wave cannot pre-draw the golden"; the confrontation SUPPLIES the
  shape the stub deferred (5→1 onto continuous; delete ScrubberTimeline + SegmentedTimeline; single
  consumer = speedtest, thin slice). The confrontation is explicit that it "does not re-open anything;
  it converges on the deferred blank," and it SUPPORTS every dossier fact (ground-up-not-prop-diet,
  single-external-consumer, A2 ~1500-LOC / five-variant scope). **Sharpened, not contradicted — NOTE.**
- **F18** (SUPERFLUITY KEEP-DISTINCT): aligned — both keep on merit (chassis muster×5 + speedtest×4;
  the four /metric readouts distinct-DOM-role, logic already extracted). Dossier F18 = EXACT(decision),
  ASK §A1. **Aligned.**

### Verdict: **CLEAN** — all CRIT1-A fixes landed; no BLOCKER/MAJOR/MINOR; F16/F18 superfluity aligned.

---

## DOSSIER-F21-F30

### CRIT1-A fix verification

| # | CRIT1-A finding | sev | FIXLOG action | landed in dossier text? | holds on disk @b29beaa9? | status |
|---|-----------------|-----|---------------|-------------------------|--------------------------|--------|
| 9 | F27 `useDockOverflowFit.ts:38-40` partial-quote scoped to the `vertical` ternary branch | MINOR | APPLIED | yes (F27 TARGET quotes the full `vertical ? … : …` ternary; names `overflow.css overflow-y:visible` + recentre `block:'nearest'` as the horizontal-host leak) | yes — `:38-40` is `const overflow = vertical ? scrollHost.scrollHeight-clientHeight>1 : scrollHost.scrollWidth-clientWidth>1` | **LANDED** |
| 10 | F24 `@keyframes skeleton-scan` `:51-57`→`:59-63` | NOTE | APPLIED | yes (F24 TARGET `:59-63`) | yes — keyframes block starts `:59`; `--duration-shimmer, 2.4s` literal at `:54` | **LANDED** |

Both CRIT1-A items landed correctly. F27's ternary and F24's keyframes re-verified at HEAD.

### New findings

**MINOR — F23 — the proposed `@utility glass-track` walks into a verified build-time class collision;
the census mislabels ContinuousRail as the scrubber.** Claim (F23 TARGET + verdict): the fold target is
*"a new `src/components/_shared/track.css` `@utility glass-track` + `--track-*` token family"* and the
row is *"EXACT — the census is disk-true … the scope correctly stops at the shared track."* Disk truth:
`src/components/timeline/ScrubberTimeline.vue:209` carries a **LIVE `class="glass-track timeline-rail"`**
with a full styled block (`.glass-track` rules at `:281,:293,:319,:365,:369,:406`). A global
`@utility glass-track` would leak the well recipe onto the live scrubber — a build-time naming defect,
not a taste call. Additionally the census the dossier calls "disk-true" (`BAND-MATERIAL.md:389-401`)
labels the ContinuousRail row **"Scrubber"** (`:393`, `ContinuousRail.vue:31,:84`) while the actual
`ScrubberTimeline.vue` — the SFC that owns the colliding class — is omitted. `SUPERFLUITY.md` C-B rules
this precisely: *"its global `@utility glass-track` collides with ScrubberTimeline's live `.glass-track`
class … The 'LANDED' status on `BJ.W-TRACK-DRY` is therefore premature"* and mandates the rename to
`glass-track-well`. (The band's own `OPEN-4a` at `BAND-MATERIAL.md:446` already reserves the API shape
as a charter-mandated OPEN, which softens this to a MINOR rather than a MAJOR — the wave has not
committed the colliding name as final.) The DRY direction, the census fill-already-shared fact
(`glass-liquid-fill`), and the owner all hold; the EXACT verdict over-claims completeness. Required
fix: in F23 TARGET/verdict, rename the proposed utility to `glass-track-well` (per SUPERFLUITY C-B),
note that the census mislabels ContinuousRail as the scrubber and omits `ScrubberTimeline.vue`, and
qualify "EXACT" with the C-C W4/W5 sequencing caveat (W4's register naming must run after/independent
of W5's scrubber deletion).

### Superfluity alignment
- **F23** (SUPERFLUITY COLLAPSE-FAMILY, C-B/C-C): **CONFLICT — dossier row now contradicted/sharpened**
  (captured as the MINOR above): glass-track collision + ContinuousRail-vs-ScrubberTimeline mislabel +
  W4/W5 sequencing. Verified disk-true this seat.
- **F25** (SUPERFLUITY MERGE-INTO, C-A): SHARPENS. The dossier F25 leaves keep-or-fold of the standalone
  demo OPEN as an ASK; the confrontation adds a firm FOLD/DELETE recommendation grounded in
  `dialog.vue:384-444` already carrying the identical Confirm-preset section (evidence the dossier F25
  doesn't cite). But C-A is itself listed as an open contradiction "for the lead judge" (keep the
  keep/fold choice vs ship delete-as-default), so the dossier's ASK framing is one of the two options
  the judge weighs — **not a dossier fault. NOTE.**
- **F30** (SUPERFLUITY MERGE-INTO, C-E): **ALIGNED.** The dossier F30 already states "the token stays;
  the page goes," lists `--motion-tempo` as "survives regardless," and recommends fold-into-springs —
  exactly C-E's position (facility never in play, only the page). The confrontation's critique of "the
  prior fence over-generalized by leaving the facility ambiguously in scope" does NOT hit the dossier
  F30, which is already unambiguous. No conflict.
- **F26** (SUPERFLUITY KEEP-DISTINCT): aligned — both carry speedtest=0, sci-report×2 + atlas×2, KEEP;
  re-verified against `BAND-REDUCTION.md:389-393`.

### Verdict: **AMEND(1)** — one MINOR (F23 `glass-track` collision + census mislabel per SUPERFLUITY
C-B/C-C). Both CRIT1-A fixes landed.

---

## Anchors spot-verified on disk at HEAD `b29beaa9` (26)

`SectionPreviewCard.vue:63,65`; `rail.vue:31-40,:44,:69,:142,:147,:153,:157`; `layers.vue:279,303,319,329,335`;
`src/styles/tokens/sizing-config.css:35`; `configurator/Configurator.vue:211`; `configurator/styles.css:25,109,117-118`;
`alert/index.ts:8,11-18`; `useDockOverflowFit.ts:38-40`; `Skeleton.vue:54,59`; `tags-input/styles.css:8,61`;
`infinite-scroll.vue:74`; `search.vue:499,506`; `_shared/field-control.css:34,47,52`; `springs.vue` (grep Configurator=0);
`StoryPlayButton.vue:34`; `Card.vue:33,39`; `progress.vue:27-34`; `Progress.vue:158`; `scroll-progress-rim/styles.css:20,34,46`;
`ScrubberTimeline.vue:209,281`. FEEDBACK-LEDGER F01–F30 = disk lines 13–42 (verbatim). Band owners:
BAND-STORY `:140,195,267,355,374,420,466,468`; BAND-MATERIAL `:50,124-142,134,173,254,376,389-401,417-419,456,504-506,667-669`;
BAND-REDUCTION `:204,237,360,412,432,524,389-393`; BAND-FEEDBACK-MOTION `:30,42,53-54,58,72`; BAND-PERF `:57,166,252,360,505`.

## Summary

| dossier | verdict | BLOCKER | MAJOR | MINOR | NOTE | CRIT1-A fixes |
|---------|---------|---------|-------|-------|------|---------------|
| F01-F10 | AMEND(1) | 0 | 0 | 1 | 0 | 5/5 LANDED |
| F11-F20 | CLEAN | 0 | 0 | 0 | 2 | 3/3 LANDED |
| F21-F30 | AMEND(1) | 0 | 0 | 1 | 3 | 2/2 LANDED |

All ten CRIT1-A fixes landed correctly and survive the 5-commit HEAD drift. Two NEW MINORs pass 1
missed: F03's G-COPY-2 "manifest" over-inclusion, and F23's `@utility glass-track` build collision +
ContinuousRail-scrubber census mislabel (the latter surfaced by the SUPERFLUITY confrontation, C-B/C-C,
and confirmed disk-true this seat). Zero BLOCKER, zero MAJOR, zero silent drops. The one superfluity
conflict is F23; F16/F25 are sharpened-not-contradicted, F30/F26/F18/F08 aligned. Consecutive-clean is
NOT met — F01-F10 and F21-F30 need one MINOR each applied; F11-F20 is clean.

*End — CRIT2-A, Fable critic pass 2 seat A, rows F01–F30. One file, no `src/`/`demo/` edits, no commit.*
