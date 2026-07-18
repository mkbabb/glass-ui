# REFABLE RU-13 — F11-F20 verdict sidecar (true-Fable run, 2026-07-18)

verified-model: claude-fable-5 (the seat's own system-context line, read verbatim)
unit: RU-13-F11-F20 · artifact: `../redress/DOSSIER-F11-F20.md` (rewritten in place) · HEAD: ced045d1
provenance: the prior run of this unit — the on-disk "union" AND its sidecar, both carrying
fable-5 self-stamps — executed on claude-opus-4-8 via the settings-level subagent override (the
census incident, `DEMARCATION.md` correction; the self-stamp is exactly the incident's signature:
a seat that believed it was Fable while the override routed it). This run is the true-Fable redo:
ANEW from the original edict against primary sources only, the prior artifact unread until the
boundary; then claim-by-claim scrutiny, every claim guilty until re-proven; then the union
rewritten in place.

**Boundary moment.** ANEW closed with all ten rows correlated and verified at HEAD — including
the independent derivations of the F17 born-RED mechanism (`search.vue:503` `variant="floating"` →
`searchVariants.ts:10` `rounded-none`, zero re-chroming rules), the F11 gap provenance
(`ff69acd9`), the F12 v6-vs-v7 radius endpoints, and the F18 sibling census re-greps — BEFORE
`DOSSIER-F11-F20.md`, the prior sidecar, or the CRIT files were opened. JUDGE.md and the bands
were read during ANEW as reconciliation targets (they are plan, not the artifact under scrutiny).

## Per-row verdicts (vs the prior on-disk artifact)

| Row | verdict | basis |
|-----|---------|-------|
| F11 | **RATIFIED** | screenshot first-hand; 7 `<ConfiguratorLayer>` sections at `AuroraConfigDock.vue:267-296` verbatim; gap = `styles.css:25` token at `:117-119`; `ff69acd9` (2026-07-13, in v7.0.0) message matches; owner G-CFG-3 + A10 mark + crosswalk:33 all re-proven |
| F12 | **RATIFIED + SHARPENED** | radius role-correct on disk at HEAD and in the v7.0.0 cut (re-run `git show`); `:61` = delete button, chip via `<Chip>` (`TagsInputItem.vue:23`); guard posture per the lead amendment holds. FABLE-NEW: v6.0.0 wore `rounded-input` (10px) — BOTH serve-range endpoints paint rounded, so square paint requires a var-resolution/paint-only failure, not mere staleness. Paint: LIVE-DEFER |
| F13 | **RATIFIED** | anchors `:69,:109,:76,:117,:143` + `SortableList.vue:144` (999px) verified; the Δ-F13-1 judge-omission independently confirmed — zero F13 rows in J1-J11 and zero in APPLYLOG (see FLIP F-2) |
| F14 | **RATIFIED** | `SectionLanding.vue:33`/`CatalogLanding.vue:32` fixed grids verified; W6 first-class owner; execution LIVE-DEFER by construction |
| F15 | **RATIFIED + truth-up** | `rounded-md` at `infinite-scroll.vue:74` RED at HEAD; `segmented.css:169` (0.3125rem) `:306` (0.25rem) verified; dogfood-`<Button>` sharpening kept. FABLE-NEW: word-boundary `text-sm`/`text-xs` count at HEAD is **234** (the band's 251 drifted post-demeta; naive greps inflate on `text-small`) |
| F16 | **OPUS-WRONG ×3 — prior layer OVERTURNED** | the prior pass's "four of five variants are in-repo dead code / unconsumed by any src/demo file / sole reference one test" claims are FALSE: `GlassTimeline.vue:2-4` is a mode facade importing + delegating to Scrubber/Segmented/Continuous; `ContinuousTimeline.vue:3-4` composes Rail+Markers; the test imports GlassTimeline (`continuous-structural-split.test.ts:4`), ContinuousMarkers appears only in a comment (`:226`). KEPT (re-proven): index exports only GlassTimeline+types; README §Exports lists five never-shipped exports (real doc-truth violation, unnamed in BAND-DOC-TRUTH); single-external consumer (speedtest `PhaseTimeline.vue:49`; `MeterColumn.vue` comments only); owner + A2 all-five scope. Post-mortem recut: facade-mode overfit, not dead-variant accretion |
| F17 | **RATIFIED — FLIP CONFIRMED** | the born-RED mechanism was re-derived at ANEW before the boundary, independent of the prior text; the OVERTURN of RULING 8's premise stands (FLIP F-1) |
| F18 | **RATIFIED** | census re-verified by fresh read-only sibling greps: speedtest instrument-chassis multi-site, muster ×5 files, fourier-analysis metric-badge ×7 files; ASK-REDUCTION §A1 present with the SHARED-KEEP recommendation; W4 ASK-gated relay posture holds |
| F19 | **RATIFIED** | `rounded-lg` → `--radius-lg` → `--radius` = 10px (radius.css:16,:31); `--glass-blur-wash-radius: 1px` (tokens/glass.css:86); `6f77ab12` tone-fold real; owner W4 + crosswalk reconciliation :213-216 verified. Paint severity: LIVE-DEFER |
| F20 | **RATIFIED** | `ef3ea646` (BI B7) in v7.0.0 by `merge-base`; toast rides transient `glass-reveal` (`Toast.vue` + `transitions.css:87-112`); dialog registers at `DialogContent.vue:235,:458`; J4 applied verbatim at `BAND-FEEDBACK-MOTION.md:41-47`. The parity judgment: LIVE-DEFER (OPEN-FM-1) |

Counts: **OPUS-WRONG 3** (all F16: dead-code / unconsumed / sole-test-reference) · **FABLE-NEW 3**
(the facade-dispatch composition graph; the F12 v6-endpoint provenance narrowing; the 251→234
type-site truth-up) · **RATIFIED 9** rows (F11-F15, F17-F20; F16's owner/coverage layer also
re-proven). Coverage retotal unchanged: EXACT 9 / PARTIAL 1 (F13) / MISSING 0.

## FLIPS — findings contradicting a JUDGE ruling or a band-charter premise (the lead re-judges)

**FLIP F-1 — F17 vs RULING 8 + its derivatives (CONFIRMED on independent re-derivation).**
RULING 8 (`ADJUDICATION-1.md` item 8), the ASSEMBLY lead amendment (`BAND-MATERIAL.md:698-700`
"disk shows both sites already role-correct"), the W1 §D charter text (`BAND-MATERIAL.md:117-119`
"the search component has no own `border-radius` (rides `field-control` pill)"), `PLAN.md:187`,
and crosswalk item 5 (`:227-229`) are FALSE for F17 on every clause: search rides `.input-bar`
(own `--radius-2xl`, `utilities/components.css:12-16`), not `field-control`; and the `floating`
variant (`searchVariants.ts:10`) strips it with `rounded-none` — a utilities-layer class that
beats the components-layer radius unconditionally, with zero `.fuzzy-search--floating` chrome
rules in `src/`. The square second input at `/data/search` is the DISK state at HEAD, statically
derivable. Posture reverts REGRESSION-GUARD → **BORN-RED FIX** inside `BJ.W-RADIUS-ROLE`
(RULING 8's own "owns the remediation if the live-π reproduces" conditional licenses this; the
live-π will reproduce — final paint confirmation LIVE-DEFER). F12 is unaffected — it re-proves
role-correct; only the F17 half of the paired premise falls.

**FLIP F-2 — F13 vs JUDGE.md's closure claim (CONFIRMED).** "Zero floating notes remain"
(JUDGE.md) is falsified: the Δ-F13-1 drag-affordance residue (grab/lift/drop expressiveness under
the breath-of-life edict, CRIT-confirmed disk-true) appears in no J1-J11 ruling and no APPLYLOG
row. The "better design" half of F13 stays PARTIAL until the lead rules an owner (natural homes:
the A01 engagement-audit scope, `BJ.W-IDLE-BREATH`'s interaction half, or an explicit
W-RESPONSIVE-AUDIT fix-mandate clause).

**NOT a flip — prior-layer overturn + one routing item.** The F16 facade truth contradicts no
JUDGE ruling and no band charter (BAND-REDUCTION W5's stub, amendment A2's all-five scope, and
C-C's sequencing all hold under it); it overturns only the prior artifact's own isolation layer.
Riding with it: the timeline `README.md` §Exports drift (five documented exports absent from
`index.ts`) is unnamed in `BAND-DOC-TRUTH` — the lead routes it there or to the W5 stub.

## LIVE-DEFER register (this seat owns no browser)

- F12 `/data/tags-input` paint vs the 16px disk state (the guard's live-π; assert the computed
  `border-radius` var chain, per the paint-only-failure hypothesis).
- F17 `/data/search` final paint confirmation of the statically-derived square (the born-RED
  fix's before capture).
- F14 execution — inherently live (100 routes × 2 viewports, Playwright, browser seat serialized).
- F16 the "buggy" interaction verdicts at `/data/timeline` (the design-loop's captured RED
  baseline owns them).
- F19 how 10px + 1px-wash READ on the page (the token facts are disk-true regardless).
- F20 whether the current transient bloom satisfies "exactly like our refined dialog" (the W1
  REGISTER-PARITY live-π, J4).

## RU-14 addendum (2026-07-18, fix seat claude-fable-5)

FLIP F-1 (RULING 8/F17), FLIP F-2 (F13 ownerless), and the timeline-README routing item all
remain OPEN at HEAD (117b7f12)—the RU-05/RU-07/RU-09 unions consumed none of them. The dossier
now carries the consolidated seven-item **JUDGE-2 docket** (`../redress/DOSSIER-F11-F20.md`
§JUDGE-2 docket): this range's three items plus F01-F10's two FLIPs (GF-DOCK rail.vue baseline-π
+ shape axis; the BAND-REDUCTION "F04 shape" label) and F21-F30's two (FM-W3 gate (b); GF-DOCK
§4.1 + the false `overflow.css:65-66` comment). Asked of the lead: one J12+ pass ruling all
seven, then an APPLYLOG-mirrored application; F13 needs an owner mint or an explicit ASK row.
