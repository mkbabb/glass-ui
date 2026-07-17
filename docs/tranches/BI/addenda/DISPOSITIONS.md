# BI-ADDENDA — DISPOSITIONS

Formation: the BI-addenda audit session, 2026-07-16. Plan: `PLAN.md` (v3.3 execution hardening).
Convergence: two consecutive clean adversarial rounds (5 and 6). Registry: `REGISTRY.md`
families A-J. Evidence reports: `reports/`. Executor of any wave named here: the active
codex session.

This is the disposition ledger the return contract requires — one disposition for every chronic
row, every deferred item, and every prompt-recap ask. Nothing is re-booked: a row resolves to a
terminal disposition or to an explicit `DEFERRED-TO-Q0##` with a named owning wave. A user-gated
decision is itself a terminal disposition (`DEFERRED-TO-Q051`), not an open deferral.

## Disposition vocabulary (each row carries exactly one)

- **DONE-VERIFIED** — landed in shipped history; confirmed at a commit SHA or file:line.
- **IN-FLIGHT-VERIFIED** — present and correct in the codex transaction (not yet committed);
  the addenda verifies, never re-specifies.
- **RETIRE** — the item is dropped; the disposition is itself the act (a ledger line).
- **DECIDED** — a deliberate design choice ratified as correct (e.g. a documented clean-break).
- **SUPERSEDED** — the owner or subject was replaced by later work; recorded, not resurrected.
- **RETRACTED-BY-USER** — the user withdrew the ask; closed with a timestamp.
- **BANKED** — held pending an explicit fresh user order; re-trigger condition stated.
- **MOOT** — the subject no longer exists, so the question dissolves.
- **DEFERRED-TO-Q0##** — carried to a named addenda wave (the only permitted forward pointer).

## Active execution truth

| wave | disposition | evidence / remainder |
|------|-------------|----------------------|
| Q020 eyeglass spring retirement | IN-FLIGHT-VERIFIED (source + ordinary tests) | Seven live preset rows; generated curve/settle/duration bytes agree with the table; focused spring + SegmentedTabs tests 14/14; native 1440/390 light/dark/axis/direction/input/PRM matrix remains PENDING-Q003, so no final SHIPPED or paint credit. |

Terms used once and defined here: **REBOOKED-ORPHAN** — a chronic row whose routed close-owner
(#92 DOCK-DEVICE, #93 close-battery, #95 cross-repo cut) was superseded by the P-graph and never
ran, leaving the row promoted but undelivered. **Vacuous-gate** — a born-RED gate whose subject
still stands but whose enforcing script was deleted by P000, so nothing checks it.

**Post-commit reconciliation (2026-07-16).** This ledger was first drafted before the codex
transaction committed. The transaction has since landed — code across `490cc46e` + `2d804ce6`, docs checkpoint at
`d27def98`, docs boundary at `6d4e75bf` (branch `codex/bi-p-q-execution`). Rows that verified an
"in the codex transaction (not yet committed)" state are therefore committed-at-HEAD unless a
row says otherwise; the P044/P059 truth-ups below are updated to that committed truth. The two
remainders that are genuinely NOT closed by the commit are native/paint certifications — Q020's
1440/390 matrix and P059's specimen paint — which still ride Q002/Q003.

---

## 1. The Q050 terminal-disposition ledger (every plan-Q050 bullet as a row)

| id | disposition | rationale | evidence |
|----|-------------|-----------|----------|
| A1 budget meta-gate (`proof:budget-gate-present`) | RETIRE | The subject was deleted by the user-ordered gate abrogation; the meta-gate was never built and now guards nothing. `profile-bundle.mjs` stays as a manual tool. | ledger-verify §B A1; P000 `1c2cda3a` |
| A2 no-orphaned-claim meta-gate (`proof:no-orphaned-wave-claim`) | RETIRE | The receipts era is over by user order; this ledger (a document act) carries the disk-verified claim table the meta-gate would have enforced. | ledger-verify §B A2 |
| D1 · W-BLURRED-IMAGE-BG | RETIRE | BD-union demo-tail; owner (`BI.W-BD-UNION-TRUE-UP`) minted pre-formation, never executed. | ledger-verify §B D1 / §C row 34 |
| D1 · W-LIVING-ARTWORK | RETIRE | Same owner, never executed. | ledger-verify §C row 37 |
| D1 · W-MEDIA-DOCK+NOWPLAYING | RETIRE | Same owner, never executed. | ledger-verify §C row 36 |
| D1 · W-STICKY-TITLE-CONDENSE | DECIDED (FOLD — behavior live in the library) | Liveness-checked at the commit boundary: the condense-on-scroll title subject is shipped as the `CardHeader` `shrink` feature — a `condensed` ref driven by `useScrollTrigger` detents (condense at scrollTop 24, expand at 12), the `card-header--shrink`+`data-condensed` binding, and `card-scroll.css` shrinking the title / hiding the description. Folds into that existing owner; no bespoke demo-tail build. **V7 truth-up (the earlier demo-coverage caveat is RETIRED):** CardHeader condense is consumed AND observed at paint — the V7 sweep drove a live card story (idx6, `card-header--shrink`): on scroll the header condensed **124.63→68.84px (−55.79)** and `data-condensed` flipped `true`. So the subject is not just library-live but demoed and paint-observed, not a demo-coverage nit (`reports/visual-sweeps/V7-tabs-table.md` row 27). The `9f0a5285` "probe" cite is a **misattribution** — that SHA is a chassis-colocation reorg (BG F7 / BH.B3 δ3/δ4) with no sticky-title logic. | `src/components/card/CardHeader.vue:8,13,29,35-45,56`; `src/components/card/card-scroll.css:34-46`; barrel export `card/index.ts:9` |
| D2 · N-19 FBO multipass | RETIRE | The promised CHRONIC-DISPOSITIONS ledger row was never written; the RETIRE row is now written into `ledgers/CHRONIC-DISPOSITIONS.md §4d` (BD `deferred-chronic-fold.md:64`). | ledger-verify §B D2; CHRONIC §4d |
| D2 · N-21 shader transpiler | RETIRE | Same — written into CHRONIC §4d (BD `deferred-chronic-fold.md:66`); the twins-not-transpiler identity (P044) is decided. | ledger-verify §B D2; CHRONIC §4d |
| D2 · N-22 novel-viz | RETIRE | Same — written into CHRONIC §4d (BD `deferred-chronic-fold.md:67`). | ledger-verify §B D2; CHRONIC §4d |
| E1 Safari blur + 4 BG surfaces | DEFERRED-TO-Q002 | The visual-cert owner (#92) is dead; the four surfaces are enumerated by SHA into the Q002 pre-tag paint roster (CARTOON-INK 3857b33 · GLASS-BLUR-PEER cd9ce46 · FIELD-AURORA b3d65eec · BACKDROP-BLUR-ENGAGE 20b09bc7) plus the real-Safari `var()`-in-`backdrop-filter` blur row. | ledger-verify §B E1; plan Q002 |
| C1 fourier phantom-classes | SUPERSEDED (permanently-foreign-terminal) | `W-RED-COLLATERAL` ran (`71884a47`) but never named fourier; the host gate is gone; foreign-tree, low severity, no live carrier. | ledger-verify §B C1 |
| deep-glass dual-book flip | DONE-VERIFIED | Flip evidenced at `785edf12`/`ccd56953`; the #93 terminal-flip is moot. | ledger-verify §C row 31 |
| D27 dual-book flip | DONE-VERIFIED | On-disk-truth assert resolves (§5 flip class). | ledger-verify §D §5 |
| AX 21-book cluster (disease #8) | DECIDED (consolidated ratification) | FOLD arms commit-verified done (`ax:metric-badge-icon`→METRICS-DEMO `c90f51f4`; `ax:labeled-field-for-id`→SLIDER-THUMB-NAME `85c7f130`; `ax:dock-select-clamp-label`→DOCK-CONTROLS `15a38a63`). RETIRE arms stand as ledger acts. The re-stamp-ceiling enforcement died with the gate ruling (recorded, accepted). The 8 Baseline standing-books → Q051 row 10. | ledger-verify §D §1a; §C row 2 |
| F1 retirement-guard no-meta direction | DONE-VERIFIED | Ruled record-terminal-DEAD in `a20060ad`; greenfield-no-meta makes it moot. Loop formally closed here. | ledger-verify §B F1 |
| G1 SRC-restructure collapse | DONE-VERIFIED | The headline chronic: `src/api`, `src/types`, `src/utils`, `src/subpaths` all GONE at HEAD (`58ddaf21`/`b02176e3`/`9c3c49e6`; ms6 `bb5c1e5c`). Loop formally closed here. | ledger-verify §B G1 |
| C-5 · SplitChars removal | DECIDED (clean-break) | Deliberate, documented removal (MIGRATION.md:30 — the `SplitChars`/`useCharStagger` row); split-chars → product-owned grapheme treatment. Not a defect. Live-deleted in the committed transaction. Row live-verified on disk; the `:29` pin drifted to `:30` under the transaction. | REGISTRY C-5; MIGRATION.md:30 |
| C-5 · Toggle removal | DECIDED (clean-break) | Deliberate, documented removal (MIGRATION.md:32 — the standalone `Toggle`/`toggleVariants` row); toggle → ToggleGroupItem/native `aria-pressed`. Not a defect. Live-deleted in the committed transaction. Row live-verified on disk; the `:31` pin drifted to `:32`. | REGISTRY C-5; MIGRATION.md:32 |
| C-6 · P033 monolithic dock state machine | SUPERSEDED | Replaced by per-composable owners; ratified here for legibility. | REGISTRY C-6; H-1 |
| C-6 · GCF-01 dock native acceptance | DEFERRED-TO-Q003 | Rides the paint-batch-at-heal verdict. | plan Q003 |
| C-6 · dock evolution-vs-greenfield | DEFERRED-TO-Q051 (row 1) | The fission ratify-or-rebuild ruling owns this. | plan Q051 row 1 |
| Judgment-e eyeglass sizing default | SUPERSEDED | P092 deleted the proud/settled two-rest-state sizing path; Q020 retires its dead spring. No user decision may revive that removed axis. | plan Q020; MIGRATION.md:650-662 (the BI.W-TABS-FACTOR / P092 block) |

### PROVENANCE-RATIFY cluster (retro-stub dispositions, per the user's protocol abrogation)

Each on-disk `DECLINED`/`SUPERSEDED`/`ABROGATED` stub is ratified as a DECIDED row; each
protected property is re-homed, not lost. Stubs cite `f20a2aa9` for the original spec bytes.

| stub | on-disk status | disposition | protected property re-home |
|------|----------------|-------------|----------------------------|
| P002 continuous-FINAL generator | DECLINED — NOT LANDED | DECIDED | FINAL-at-tag precondition → the Q002 pre-tag lane |
| P003 (execution substrate) | ABSENT | DECIDED | folded into P000 abrogation; no live property |
| P004 constellation scanner | SUPERSEDED — DIRECT OWNER HANDOFFS | DECIDED | asks-and-consumes practice → Q060 outbounds |
| P005 (MS1 census) | ABSENT | DECIDED | settled-structure classification → build fail-closed + review |
| P013 MS9 differential guard | SUPERSEDED — ORDINARY CHECKS OWN THE CONTRACT | DECIDED | the build's own fail-closed classification + review language |
| P014 40-invariant verifier tail | ABROGATED — REPLACEMENT VERIFIER REMOVED | DECIDED | the Q040 verification declaration (invariants.json = DESCRIPTIVE CANON) |
| P033 (dock state machine) | SUPERSEDED | DECIDED | per-composable owners (see C-6) |
| P037 | (on-disk stub) | DECIDED | no live property beyond the P-graph record |
| P052 procedural-config schema | DECLINED | DECIDED | live-control roundtrip → Q003 paint verdicts |
| P053 cross-engine parity matrix | DECLINED | DECIDED | perceptual parity → Q003 paint verdicts |
| P061 π scenario runner | DECLINED / SUPERSEDED | DECIDED | source-bound evidence → the Q002 pre-tag lane |
| P044 procedural-color shaders | on-disk "DONE — PRODUCT COMPLETE"; deliverable now COMMITTED | TRUTH-UP → DONE-VERIFIED | `src/composables/glass/procedural/color.glsl.ts` + `color.wgsl.ts` tracked at HEAD (landed `490cc46e`, ancestor of HEAD). The stub's DONE claim is now accurate; the earlier "untracked/in-flight" truth-up is itself superseded by the committed transaction — recorded, not laundered. |
| P059 specimen surface | on-disk "DONE — native accepted"; rework now COMMITTED | TRUTH-UP → DONE-VERIFIED (structure); π/native → Q003 | `SpecimenFrame.vue` + `PermutationGrid.vue` deleted at HEAD, `ShowcaseFrame.vue` retained as the sole plate (deleted in `490cc46e`; already absent from `2d804ce6`). The structural consolidation is real; the stub's "native accepted" paint claim stays unbacked — the π/native pass rides Q003. |
| deleted harness (P000/P001) | reversed in-flight | SUPERSEDED | recorded as a git-history pointer (`1c2cda3a`/`b5eee380`), not resurrected |

---

## 2. Chronic-ledger rows not already in Q050 (each gets a disposition)

Sourced from `ledger-verify.md` §C/§D and `prompt-recap-verify.md` §1-§3.

### Enforcement-vacuous rows (subject stands; the born-RED gate was deleted by P000)

Disposition class: **SUPERSEDED (enforcement)** — the protected property lives on in review
language + the pre-tag lane, per the gate ruling; no script is reborn.

| id | subject | disposition |
|----|---------|-------------|
| reg#21 git-stash precept | `audit:stash` gate deleted | SUPERSEDED (enforcement); subject DONE-VERIFIED at commit |
| reg#22 story-language leaks | `proof:story-language` deleted | SUPERSEDED (enforcement) → the demo comment scrub is Q041 |
| reg#24 ci.yml gate-drift | `gates:verify-ci` deleted | SUPERSEDED (enforcement) → Q043 verify-only |
| reg#28 consumer-mis-prune guard | `AP.W4` guard deleted | SUPERSEDED (enforcement); subject DONE-VERIFIED |
| dis:detector-blind-spot | `proof:meta` deleted | SUPERSEDED (enforcement); carve DONE at `2f05d771` |
| dis:ratchet-regrowth | no-god-module ratchet deleted | SUPERSEDED (enforcement); the regrowth itself → Q042 |
| E-1 no-masking edict | `no-masking-manifest.mjs` unwired, now staged-deleted | SUPERSEDED (enforcement); the law → review + the Q003 F-4 paint check |

### REBOOKED-ORPHAN paint/device rows (owner #92/#93 dead) → re-homed

| id | subject | disposition |
|----|---------|-------------|
| reg#7 dock paint/Safari cert | spine DONE, cert orphaned | DEFERRED-TO-Q002 (roster) + Q003 |
| reg#13 AY PENDING-RESHOOT (W-DOCK1/2/CON1) | pixels never shot | DEFERRED-TO-Q002 (roster) |
| reg#14 π visual-runtime lane | both owners dead | DEFERRED-TO-Q002/Q003 |
| reg#16 Safari/Metal real-device | #92 dead | DEFERRED-TO-Q002 (roster: D8/D24/D25/GOO-SPLIT-PERF/VIZ-PARITY-METAL) |
| §4a device rows (5) | all → #92 | DEFERRED-TO-Q002 (roster) |
| reg#42 PE-GESTALT ledger (30 PENDING cells) | oracle deleted; #93 dead | SUPERSEDED → subsumed by Q003's per-surface verdict ledger (A-3 residue) |
| dis:dock-chronic / dis:safari-metal-verify | Safari gestalt verdict | DEFERRED-TO-Q002/Q003 |

### Status-lie rows (claimed-done vs code truth)

| id | subject | disposition |
|----|---------|-------------|
| C-2 · 9 consolidation waves in-flight only | 6.0.0 still ships the duplicates | IN-FLIGHT-VERIFIED → Q002 pre-tag verify sweep (P074/P081/P082/P083/P091/P100/P104/P113/P117 + ~20 flatten-partials) |
| C-3 · P044/P059 stub lies | see PROVENANCE cluster | TRUTH-UP → DONE-VERIFIED (deliverables now committed: P044 `490cc46e`; P059 rework in `490cc46e`); P059's native-paint claim → Q003 |
| H-4 · length-ratchet regrowth | ratchet gone; cohesion review rejects a size law | DEFERRED-TO-Q042's three semantic owner carves; Slider/Pager/Easing/shaders/dock CSS EXEMPT |
| Decision-0 · single-cut hold VIOLATED | 5.0.0 + 6.0.0 + 7.0.0-in-flight | MOOT — versioning ruled fine by the user (see §6 Q080); the hold no longer applies |

### DONE-VERIFIED chronic headlines (no wave; recorded for completeness)

CLAUDE.md-delete (`8b0f9acc`) · panel-host-archived · interruptible-reorder-archived ·
native-drawer (`6b0ba06f`) · /deck subpath (`7fb2d1b7`) · CompletionSeal family (structure;
the *consumer* question → Q051 row 14) · dot-flow/concentric deletion (`f7be02dc`) ·
NPM_TOKEN CI-publish · Fraunces @font-face · /freshness subpath · reduced-motion sweep ·
deriveAurora/VAL-1 · dock-scroll-fission retired (`dock/index.ts:121`) · cartoon-shadow
round-trip · AW halt set · AZ named-successors · DDR-AS-RC-2 punch-list · the B0-B8
mechanism/prune/structure sample (prompt-recap §4, ~20 rows spot-verified).

### open_questions (6, user-ruling owed) → all DEFERRED-TO-Q051

inline-edit primitive (row 9) · 8 Baseline-book batch (row 10) · aurora-medium-lazy split
(row 11) · metrics-sextet scope (row 12) · hover-popover Kronecker fold (row 13) ·
completion/border-progress consumer (row 14). The border-progress half is MOOT (retired,
UF-J4 `HEAD:src/components/border-progress` = 0 files); the CompletionSeal real-2nd-consumer
question stands.

---

## 3. TAIL promotion rows A1-G1 (all 8)

| id | item | disposition | owner |
|----|------|-------------|-------|
| A1 | budget meta-gate | RETIRE | Q050 (subject deleted) |
| A2 | no-orphaned-claim meta-gate | RETIRE | Q050 (this ledger replaces it) |
| C1 | fourier phantom-classes | SUPERSEDED | Q050 (foreign-terminal) |
| D1 | BD demo-tail (4 waves) | RETIRE ×3 + DECIDED ×1 | Q050 |
| D2 | N-19/N-21/N-22 | RETIRE ×3 | Q050 |
| E1 | Safari blur + 4 BG surfaces | DEFERRED-TO-Q002 | Q002 roster |
| F1 | retirement-guard no-meta | DONE-VERIFIED | Q050 (ratified closed) |
| G1 | SRC-restructure collapse | DONE-VERIFIED | Q050 (ratified closed) |

Scorecard reconciled: the 5 REBOOKED-ORPHAN promotions (A1/A2/D1/D2/E1) are terminalized
(RETIRE, or re-homed into Q002); the 2 DONE-VERIFIED (F1/G1) are ratified closed; C1 is
SUPERSEDED. Zero promotion-row orphans remain open.

---

## 4. Prompt-recap rows (session asks a-n)

| ask | digest | owner / disposition |
|-----|--------|---------------------|
| a | audit all tranches incl. in-flight BI | REGISTRY + `reports/` (10 lenses) |
| b | chronic DECIDED rows | Q050 (this ledger) + Q051 |
| c | prompt-recap completeness | this file §4 + plan recap section |
| d | Fable design audit | FAM-F/G/H; `reports/design-audit.md`, `proportion-audit.md`, `motion-dock-audit.md` |
| e | grand colocation edict | Band 4 (Q030-Q033); verdict ~90% executed |
| f | isolation / durability / non-spammy crons | `STATE.md` fences + one guardian (session conduct) |
| g | Aristotelian proportionality + affordance economy | Band 2 (Q010) + Q003 rosters; `proportion-audit.md` |
| h | motion/videos + dock perfection | Band 3 (Q020-Q024) + `motion-dock-audit.md` (working/challenged/changed/broken/publishable) |
| i | kf/value mark | Q060 co-land marks (E-1 sequencing invariant, ACK-only) |
| j | process meta-lens + triumvirate + precepts | Q070; `process-lessons.md` |
| k | media find-and-analyze | FAM-I + Q063 (preservation) + Q023/Q024 (graded-edge mint / engage decline / calibration) |
| l | relay-to-codex | the inbox note `docs/tranches/BI/coordination/addenda-inbound-2026-07-16-hold-and-marks.md` |
| m | gate ruling (given twice) | the ⚖ section + Bands 1/5 reshape; every wave mints nothing |
| n | version/history directive | RETRACTED (Q080) / BANKED (Q081) — see §6 |

Unresolved rows flagged by `prompt-recap-verify.md` and their homes: the entire close/acceptance
battery (paint-in-close → Q002/Q003; gestalt-ledger → Q003; budget-rebaseline → RETIRE per A1;
masking-sweep → Q003 F-4; ledger-liveness → this ledger + Q003 H-8/H-9/H-12) · demo no-meta edict
→ Q041 · god-module regrowth → Q042 · Safari parity → Q002 roster · eyeglass-tabs directive →
DECIDED (delivered as pill default `.glass-lens`, MIGRATION.md:650-662; not orphaned — R1/R2
correction) · Decision-0 single-cut → MOOT (versioning fine).

---

## 5. E-band live sequencing hazards (batched to the inbox note)

| id | hazard | disposition |
|----|--------|-------------|
| E-1 | peer staging (value ^4.0.0 / kf ^6.0.0 vs unpublished producers) | DEFERRED-TO-Q060; sequencing invariant only — producers publish before glass tags its staged peers (P127's own law); codex owns the co-land |
| E-2 | HEAD ci.yml/release.yml reference verify.mjs the transaction deletes | DEFERRED-TO-Q043 (verify-only; the working tree already cleans them + deletes the hook) |
| E-3 | dist/fonts exports glob unbuilt | DEFERRED-TO-Q002 (the pre-publish fonts-glob look) |
| E-4 | retro-stub overwrite destroys spec-vs-built diffability | DECIDED — stubs cite `f20a2aa9`; recorded, accepted |

---

## 6. Q080 / Q081 (the version/history directive)

| id | item | disposition | timestamp / re-trigger |
|----|------|-------------|------------------------|
| Q080 | version re-baseline ("deep into v5") | RETRACTED-BY-USER | 2026-07-16 ~04:20 — user ruled versioning is fine; the coordination HOLD was lifted within the minute |
| Q081 | commit-history rewrite | BANKED | re-trigger: an explicit fresh user order only. If it fires, the sequencing law applies — the 850-file transaction lands first, the tree quiesces, then the rewrite; never mid-flight |
