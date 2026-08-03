# ROW #16 — W-ORPHAN-ROWS · the sequenced close over the Φ3 accounting batch

**modelId: `claude-opus-5[1m]`** (asserted by prefix `claude-opus-5`, per row #11's law L-2).
**Seat:** BK roster row **#16**, `TERMINAL-ROSTER.md:166`. **Φ3.** Doc-side only — zero `src/`
bytes, zero git write ops, no browser, no build.
**HEAD at this seat: `aee47957`** (`git rev-parse --short=8 HEAD`, run this seat).

**Sources of record, cited never copied:**
`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:166` (the spec) ·
`ECOUTE.md:229-237` §3 `W-ORPHAN-ROWS` (after row #14's false-gap strike) ·
`PROOF-SWEEP.md:355-470` lane C §4 (the 50 union tails) ·
`docs/tranches/BK/EXECUTION-PROGRESS.md` ⊕¹¹–⊕¹⁹ (the ruling ledger) ·
`docs/tranches/BK/execution/2026-08-03-codex-audit/APOTHEOSIS.md` (pass-1 verdicts) ·
`docs/tranches/BK/EXECUTION-DAG-2026-08-03.md` (derived; TR wins on divergence).

Codex-era posture, stated once: this row **cites zero codex seals** (census restated 0/87, all
VOID on QUALITY grounds — ⊕¹²/⊕¹⁴), reads the audit corpus through ⊕¹⁴'s withdrawal of the
"forgery" characterization, is owned by Claude Code (⊕¹⁸), quotes **no** code-side gate-register
figure (⊕¹³ᵃ standing), and has **zero** dependency on the graph-v3 arc that FALLS ENTIRE — every
homing below is a roster-id relation, not an import-graph one.

---

## §1 · THE QUINTET RECONCILIATION — #11 · #12 · #13 · #14 · #15 · #77

Method: each lane's *load-bearing* claims were re-derived from disk at HEAD `aee47957` this seat.
A claim I reproduced reads **CONFIRMED** with its detector; a claim that reproduced differently
reads **CORRECTED** with the falsifier; a claim I could not test doc-side reads **UNPROVEN** and is
not repeated as fact anywhere in this file.

| lane | claim | verdict | detector run this seat |
|---|---|---|---|
| #11 | `PROCESS-CURE.md` (160 L) + `BURNDOWN.md` exist on disk | **CONFIRMED** | `wc -l` → 160 · `BURNDOWN.md` read in full |
| #11 | 25 runners hold 0 `proof:*` implementations (L-5 ground) | **CONFIRMED** | `grep -c '"proof:' package.json` → **0** |
| #11 | graph-v3 rider struck; arc FALLS | **CONFIRMED** | `tests/architecture` absent · `scripts/build-import-dag-v3.mjs` absent · revert `d2f202bc` (2026-08-03) reads on `git log` |
| #11 | burndown denominator **87** execution-live rows | **CORRECTED → 88** | roster ids are **91** since ⊕¹⁰ (`EXECUTION-PROGRESS.md:71`); minus #36/#37 RETIRED-in-place and #70 BANKED (`EXECUTION-DAG:81`) = **88**. Entry 1 counted #91 in its numerator (field 2, 10 members) while excluding it from the denominator. Restated in burndown **entry 2**, not rewritten (append-only, rule 1) |
| #12 | BG `FINAL.md` carries **119** `BG.W-*` ids; +1 booked = 120 units | **CONFIRMED** | `grep -oE 'BG\.W-[A-Za-z0-9-]+' docs/tranches/BG/FINAL.md \| sort -u \| wc -l` → **119** |
| #12 | the roster's "60 unmapped names" is not reproducible | **CONFIRMED as un-methodised** | no detector in the corpus yields 60; the 119-walk supersets it. The figure is retired, not re-quoted |
| #12 | gate mesh gone: 0 `proof:*`, `scripts/` = 10, no `proof-*.mjs` | **CONFIRMED** | `ls scripts` → 10 entries, none `proof-*` |
| #12 | `W-PAPER-SUFFUSE` landed INVERTED | **CONFIRMED** | `--paper-clean-texture` **7** hits in `src demo`; `--paper-aged-texture` **0** |
| #12 | `W-VIZ-PREVIEW-LIVE` falsified — the landing path is stills | **CONFIRMED** | `demo/chassis/landing/vizPreviewStill.ts` present |
| #12 | `createFragmentGLPass` RETIRE-UNTRIGGERED (0 consumers) | **UNPROVEN AT THIS SEAT** — not re-derived here; #12's own probe stands as its record, and nothing in this file rests on it | — |
| #13 | the UF corpus is 78 rows | **CONFIRMED** | `grep -cE '^\| *UF-\|^\| *[A-K][0-9]+ ' docs/tranches/BI/audit/USER-FINDINGS-2026-07-11.md` → **78** |
| #13 | correction 1 — GlassPanel died at `2bfcf2b9`, not `ac71691f` | **CONFIRMED** | `2bfcf2b9` = "BI B28 (BI.W-GLASS-DEDUP): GlassPanel FAM-10 RETIRED" · `ac71691f` = "BI.W-CHIP-FOLD" — both read via `git log -1` |
| #13 | correction 2 — UF-H1 is a regression: shipped `184bf765`, deleted `490cc46e` | **CONFIRMED** | `184bf765` = "EYEGLASS IS THE TABS DEFAULT" · `490cc46e` = "land the Glass 7 component… cut" |
| #13 | the 36 LANDED / 40 OWNED / 2 RETIRED split | **UNPROVEN AT THIS SEAT** (78-row re-walk is a second full lane, not a close act) — the ledger stands as pass-1 output owing the Challenge-Law pass, exactly as its own §note says | — |
| #14 | the three "phantom" waves have bodies on disk | **CONFIRMED** | `BAND-A11Y.md` 359 L · `BAND-DOC-TRUTH.md` 283 L · `BAND-PERF.md` 660 L |
| #14 | F11/F29 LANDED `34681df9`; F41 LANDED `75c19ead` | **CONFIRMED** | `34681df9` = "land BJ.W-CONFIGURATOR-STD" (2026-07-21) · `75c19ead` = "land BJ.W-STORY-COPY-CANON" (2026-07-21) |
| #14 | the strikes landed in place at ECOUTE/REGISTRY/WAVES | **CONFIRMED** | `ECOUTE.md:112-137` and `WAVES.md:905-915` read this seat and carry the ⊕ row-#14 blocks |
| #14 | "the wave's live scope is F25 · F33-goo-morph · A16" | **CORRECTED — see §3.1** | ECOUTE `:127`/`:128` still list **A12** and **A14** as surviving §1a gaps; both are homed at TR **#50** by name (`TERMINAL-ROSTER.md:286`: *"GF-BLOB claims the A14 umbrella's A12 half by name"*). The three-item scope is right; §1a's list needed the same strike |
| #15 | `PROVENANCE-REGISTER.md` banked, 228 L | **CONFIRMED** | `wc -l` |
| #15 | RED at 1 — the F19 png is on disk and untracked | **CONFIRMED, and narrowed to exactly one file** | `docs/tranches/BJ/feedback` holds **31** entries, `git ls-files` returns **30**; the single untracked member is `F19-metric-badge-overround-grid.png`. Ruled at §6 |
| #15 | the AY/BD/BJ ask dates and the 54 d / 41 d / 17 d ladder | **UNPROVEN AT THIS SEAT** — the register's own `git log` cites stand; no figure from it is restated here | — |
| #77 | `data-engaged` → 0 hits; ENGAGED rung has zero consumers | **CONFIRMED** | `grep -r "data-engaged" src demo \| wc -l` → **0** |
| #77 | `engageEnvelope` → 4 hits, all definition + barrel | **CONFIRMED** | `engageEnvelopes.ts:94,106` (definition + internal call) · `motion/index.ts:77,81` (barrel) — no component consumer |
| #77 | `useLeadTrail` reaches exactly one real consumer; dock = 0 | **CONFIRMED** | the only `import` is `pager-dots/composables/usePagerWorm.ts:19` (used `:167`); every other hit is a comment, a README line, a barrel re-export (`src/index.ts:509,513`, `motion/core/index.ts:50`) or a CSS comment (`scheme-spring.css:193`). `src/components/dock` → 0 |
| #77 | suffusion closure NOT closed — #27 + #79–#88 all unstarted | **CONFIRMED** | `EXECUTION-DAG-2026-08-03.md` lines 38, 90–99: eleven of eleven read `unstarted` |
| #77 | "`src/components` holds **63** dirs" | **CORRECTED → 64 dirs / 63 components** | `ls -d src/components/*/ \| wc -l` → **64**; the 64th is `_shared`, a private helper dir, not a component. The census's ratios *over 63* stand unchanged — only the sentence was wrong |
| #77 | capture half OWED (no browser) | **CONFIRMED as a wall, not a failure** | this batch is doc-side by charter; #77 is mechanism-COMPLETE / capture-OWED and cannot seal GREEN here |

**Batch verdict:** six lanes, six deliverables on disk, **zero silent drops**, three corrections
(#11 denominator · #14 §1a residue · #77 dir count) and four claims honestly marked UNPROVEN rather
than laundered into fact. No lane's output is contradicted at its core.

---

## §2 · CONTRADICTIONS RESOLVED ON THE RULING LEDGER

**C-1 · Two HEAD pins in one batch — RESOLVED, both honest.**
#12/#13/#15 pin `aee47957`; #77 pins `5e728369`. `5e728369` is `aee47957`'s parent
(`git log --oneline -6`), and `git log --oneline 5e728369..aee47957 -- src demo` → **0**. The
intervening commit is the ⊕¹⁹ owner-defect-report doc write. Every `src/` reading #77 took
transfers byte-identically to HEAD. Not a divergence; a read-point.

**C-2 · "0/87" vs "91 rows" — RESOLVED as two populations, and one arithmetic defect found.**
The `0/87` of ⊕¹² counts **codex-delta seals**. The roster counts **91 ids** since ⊕¹⁰. Row #11's
burndown borrowed the seal denominator for a *row-state* field and landed at 87 where the row
population is **88** (91 − #36 − #37 − #70). Recorded in burndown **entry 2**; entry 1 is not
touched (rule 1, append-only).

**C-3 · Cursor Φ0/Φ1 tables still read `SEALED` for #1/#2/#4/#5/#8/#75 against ⊕¹²'s void.**
Raised by #11 (blocker a) and left uncounted there. Confirmed still true this seat. **Not this
row's cell to flip** — it is the pass-2 re-adjudication's (APOTHEOSIS cure order item 10). Carried
forward as a standing discrepancy, stated in both burndown entries, counted in neither.

**C-4 · `TERMINAL-ROSTER.md` §B.4 still carries the withdrawn characterization.**
Its BK-`PLAN.md`-§3 cell reads *"the 'communiqué' is a PROVEN FORGERY"*. ⊕¹⁴ **WITHDREW** that
characterization (owner word: *"That's not a forgery"*) and re-grounded the same outcome as
**owner-authorized delegation, now REVOKED**. Row #11 cured the `PLAN.md` side (law L-1); the TR
cell is stale in the same movement. `TERMINAL-ROSTER.md` is dirty from a concurrent lane and is
**not edited here**. The exact replacement clause, for whoever holds the TR pen:

> ~~the "communiqué" is a PROVEN FORGERY~~ **[⊕¹⁴ 2026-08-03: the forgery characterization is
> WITHDRAWN by owner word — the Sol/Luna cutover was owner-authorized delegation, since REVOKED
> (⊕¹⁸, Claude Code owns). The prospective routing correction stands unchanged; only the
> authority finding is withdrawn.]**

Routed to **#61 W-DOC-TRUTH** (the doc-truth strike list is that row's instrument) with the lead
free to take it earlier.

**C-5 · #12 and #14 both declined to write their own cursor lines; #13 and #15 wrote theirs.**
The batch therefore closed half-recorded. As sequenced closer this row writes the four missing
lines (#12, #14, #16, #77) onto `EXECUTION-PROGRESS.md`, touching no other row's cell. Both
declining lanes supplied their replacement text; neither is overridden.

---

## §3 · G-ROW-HOMED — THE DECISION PER ROW

`ECOUTE.md:229` states this wave's product exactly: *"a **decision per row**, landed as source or
as a one-line retire-with-reason."* Three live ids after row #14's strike, plus the namespace
clause. Each below is a decision with its ground.

### 3.1 The scope itself — A12 and A14 are NOT orphans

`ECOUTE.md:127-128` still lists **A12 (blob greenfield)** and **A14 (procedural umbrella)** among
the surviving §1a gaps. Both are homed by name at TR row **#50 GF-BLOB**
(`TERMINAL-ROSTER.md:286`: *"PROCEDURAL-LEDGER the umbrella; GF-BLOB claims the A14 umbrella's A12
half by name"*; `:200` carries A12's provenance clause landed by #15). The §1a cells are
struck-in-place this row with that falsifier. **Consequence: G-ROW-HOMED's row-citation clause is
held RED by F25 alone** — which is what row #14 concluded from the §3 side; §1a simply had not
caught up.

### 3.2 F25 — confirm-dialog fold · **DECISION: HOMED AT #18, scope-list amended by citation**

- The ruling exists and is ratified: `docs/tranches/BJ/ASK.md:399` — *"ASK-3 | confirm-dialog story
  | DELETE (fold) | demo page count + relay"*; the question is at `:42-43`; the refinement
  restatement at `addenda/…/ASK.md:133` ("FOLD the story into `/containers/dialog`").
- The subject is live: `demo/stories/feedback/confirm-dialog.vue`, 12,294 B on disk at HEAD.
- The gap is **seat, not decision**: `WAVES.md:323-330`'s W-DELETE scope list does not name the
  file. **Decision: F25 is owned by roster row #18 `W-DELETE`**, whose live scope is the TR row
  (`TERMINAL-ROSTER.md:168`), not the WAVES paragraph. The act at #18's cut is one line: delete
  `demo/stories/feedback/confirm-dialog.vue` and its manifest entry, per ASK-3's ratified default,
  with the standard G-RELAY whole-repo walk.
- **Doc-truth rider, routed to #61:** `WAVES.md:323-330` is now superseded *three times over* — it
  orders deletion of `deck` (LIVES, `TERMINAL-ROSTER.md:190`, DECK-RELOCATION PART I §3 the spec of
  record), of `carousel` (KEEP by owner word, `:168`), and of `metric` (leaves the DELETE list at
  ✦³/SL-2, consolidating at #87). A row homed against that paragraph would be homed against a dead
  list; #18's TR row is the citation of record.

### 3.3 F33 — deck-vs-carousel + dot goo-morph · **DECISION: BOTH HALVES HOMED; the gate cell is CORRECTED**

Ledger text (`FEEDBACK-LEDGER.md:66`): *"What is deck vs carousel — likely collapse. The dot
animations need dramatic refinement."*

- **Collapse half → #40 W-PAGER + #18.** Owner word ruled it: deck LIVES and widens to the deck
  apotheosis; carousel is KEEP and **shares the deck's substrate** — one windowed-sequence engine
  under both (`TERMINAL-ROSTER.md:190` ✦³ round-2 items 11/12; spec of record
  `DECK-RELOCATION.md` PART I §3). "Likely collapse" is answered as *consolidate the substrate, keep
  both surfaces*. Homed, decided, no new seat.
- **Dot-animation half → #40 W-PAGER.** The goo-morph mechanism is the subject of #40's five
  born-RED close-battery cells and the `01310c9c` OVERTURN (`TERMINAL-ROSTER.md:190`).
- **`G-GOO-MORPH`'s RED-at-HEAD ground is FALSIFIED as written** and is corrected in place. The
  cell reads *"no metaball or morph path exists in it."* At HEAD:
  `src/components/pager-dots/constants.ts:14-16` defines `PAGER_NECK_GIRTH = 0.7`, *"the metaball
  NECK girth (the dumbbell-shoulder bridge height between the two pip-bodies)"*;
  `PagerDots.vue:13-14,26-29,39` implements the three-layer worm with a *"welling concave neck"*;
  `composables/usePagerWorm.ts:19,167` drives it through `useLeadTrail`;
  `01310c9c` is literally *"close BJ.W-PAGER-DOT-MORPH — pin the goo-morph signature."* The
  mechanism EXISTS. What remains open is its **quality and its ruled form** (worm on
  translate+scale; the pin overturned; ⊕¹⁹'s owner defect report is live on adjacent surfaces) —
  and that is #40's cell, not an orphan-row cell. The gate is re-grounded and **transferred to
  #40**; it does not hold #16 RED.

### 3.4 A16 — "nothing dropped from BI" · **DECISION: CLOSED-BY-DISPOSITION; the residue is doc-rot, routed to #61**

- The literal finding reproduces: `grep -c 'DECISION: ____' docs/tranches/BI/addenda/JUDGMENT-ROSTER.md`
  → **16**, in one file (`RECONCILIATION.md:72` recorded the same DISK-FACT).
- But the **decisions exist**: `TERMINAL-ROSTER.md:298` §B.3 — *"THE 16 BI DECISIONS — ALL
  dispositioned, zero owner-owed"*: 14 lead-ruled **ratified wholesale** (`RATIFICATION.md` §5) ·
  **r7 RULED** (§1.2, default HEAVY, settled at #50's first capture) · **r15 DECLINED** (§1.3) ·
  r11/r13 re-bookings affirmed · r12 owner-visible, non-blocking. `TERMINAL-ROSTER.md:124`
  independently records *"B.3 all 16 dispositioned."*
- **Therefore `G-BI-CARRY` is RED on a stale artifact, not on an open question.** Its assertion —
  *"zero `DECISION: ____` blanks remain in any BI roster **cited as carried forward**"* — is
  satisfied in substance and unsatisfied in bytes: nobody back-annotated `JUDGMENT-ROSTER.md` with
  the §B.3 dispositions. **Decision: A16 is CLOSED-BY-DISPOSITION at TR §B.3.** The remaining act
  is a single doc-truth back-annotation (16 `DECISION: ____` → the §B.3 disposition + its
  `RATIFICATION.md` citation, one per row), routed to **#61 W-DOC-TRUTH**, whose B.4 strike list
  already carries the "three BI addenda instruments gain SUPERSEDED banners" row (`TERMINAL-ROSTER.md`
  §B.4, ⊕⁴ U-42) — this is the fourth instrument and rides the same line.
- Not done here on purpose: filling 16 owner-facing blanks from a *summary of* their dispositions
  would be a mint, and eight of those rows read *"the eye must judge" / "veto window open"*
  (`JUDGMENT-ROSTER.md` rows 1–8). The back-annotation must copy each ruling from
  `RATIFICATION.md`, at #61, with the ruling's own citation beside it.

### 3.5 The id-collision clause · **DECISION: the clause is DISCHARGED-BY-CONVENTION; RED lifts**

The clause fails on *"a row-id namespace collision with an audit-lens id."* Measured this seat:
the ledger's own ids are **zero-padded two-digit** — `F01 F02 … F50 · A01 … A17`
(`grep -oE '^\| *[FA][0-9]+' docs/tranches/BJ/FEEDBACK-LEDGER.md`, 67 ids, every one padded). The
audit lenses use unpadded `F1`–`F12`. `F01 ≠ F1` as strings, so the collision is a *reading*
hazard, not an id collision — and it is already the convention every folded artifact follows.
**Decision: the clause is discharged by naming the convention** — *owner ledger ids are always
zero-padded (`F01`), lens ids never are (`F1`); a bare unpadded id in a BK artifact is a lens id
by construction.* Landed as the gate's own text. No renaming, no migration, no new seat.

### 3.6 G-ROW-HOMED at the close of this row

| clause | before | after this row |
|---|---|---|
| every ledger id resolves to exactly one wave | RED (F25 alone, post-#14) | **F25 homed at #18** → clause clears on the decision; the *act* is #18's cut |
| id-namespace collision | RED on its own ground | **DISCHARGED** by the padding convention (§3.5) |
| `G-GOO-MORPH` | RED, on a falsified ground | **ground corrected, gate transferred to #40** |
| `G-BI-CARRY` | RED, 16 blanks | **CLOSED-BY-DISPOSITION** (TR §B.3); back-annotation routed to #61 |

**Honest statement:** this row does not paint the gate GREEN. Three of the four clauses resolve to
a *decision plus a named executing row*, which is exactly what `ECOUTE.md:229` defines the wave's
product to be; the fourth (F25) clears only when #18 cuts. No seal is minted here — CLOSED is the
lead's act after the Challenge Law pass (⊕¹¹).

---

## §4 · THE UNION TAILS — the 50 orphans, seated

The ledger is `PROOF-SWEEP.md:355-470` lane C §4 and is **cited, never copied** (one-source law).
`TERMINAL-ROSTER.md:166` already rules four of them structurally (U-01, U-04, U-07, U-51); this row
discharges those four and states the closing position on the rest.

### 4.1 U-01 · the `+BD-CARRY` arm — **SEEDED AND COUNT-VERIFIED**

The roster orders the arm *"seeded mechanically from `docs/tranches/BI/FORMATION/open-row-routing.json`
filtered `^docs/tranches/BD/` (**1,338 rows**, count ⊘ this seat)."* Re-derived here:

```
python3: json.load('docs/tranches/BI/FORMATION/open-row-routing.json')
  rowCount              = 8509      (file's own field, == len(rows))
  rows with sourcePath ^docs/tranches/BD/  = 1338      ← the roster's figure, reproduced exactly
  BD producerDisposition = FOLD × 1338 (single-valued)
  BD sourceClass         = DEFER_OQ_D_CENSUS × 1338 (single-valued)
  BD custodian           = custodian:glass-ui-perfect-bi × 1338
  BD distinct source files = 301
  top files: union/DEFERRED-CENSUS.md 190 · CANDIDATE-WAVES.md 29 · viz/VIZ-BAND-PLAN.md 28 ·
             union/waves/BD.W-VIZ-TAILS.md 23 · union/waves/W-FOLD-LEDGER.md 23
  BD canonicalFamily (top): behavior.dock 268 · procedural.renderer-parity 239 ·
             design.material-hierarchy 232 · integrity.lineage 188 · motion.single-clock 127 ·
             integrity.dag 88 · architecture.clean-break 67 · demo.scenario-contract 66
```

**The arm, stated in checkable form:** `G-ROW-HOMED +BD-CARRY` asserts that every one of the 1,338
BD rows is reachable from BK through a **named lineage document**, not merely transitively. The
seed is the eight `canonicalFamily` buckets above — each maps to a live BK row family
(`behavior.dock` → #47/#48 · `procedural.renderer-parity` → #49/#50/#54 ·
`design.material-hierarchy` → #22/#68/#86 · `integrity.lineage` → #16/#61 ·
`motion.single-clock` → #26 · `integrity.dag` → #21 · `architecture.clean-break` → #18/#19 ·
`demo.scenario-contract` → #40/#55). The arm is **RED until PORT gains its §0 pre-history section**
naming the three lineage docs of record the roster itself names: `BC/DEFERRAL-LEDGER.md` ·
`BD/FOLD-LEDGER.md` · `BD/union/DEFERRED-CENSUS.md`. That PORT edit is not this row's file and is
routed with its text below (§7, R-3).

Correction of record: the routing JSON's whole population is **8,509** rows across 41 tranche
letters (BG 1,517 · BD 1,338 · BC 1,103 · AX 662 · AZ 488 · AY 459 · BB 311 …), all `FOLD` but
three `BANK`. The "one-eyed lineage" finding at `PROOF-SWEEP.md:470` is thereby *understated*, not
overstated: BD is the largest single arm the roster names but it is not the largest cohort in the
file. Stated, not acted on — widening the arm beyond the roster's own order would be a mint.

### 4.2 U-04 · the AX `DISPOSITION-REGISTER.json` — **RETIRE-AS-A-MACHINE, executed by ruling**

The roster's ruling (`TERMINAL-ROSTER.md:166`) is *"RETIRED as a machine —
`docs/tranches/BI/ledgers/CHRONIC-DISPOSITIONS.md` is the record of truth; the JSON is
historical."* Re-derived at HEAD:

| roster/lane-C cell | reproduced this seat | verdict |
|---|---|---|
| `31/31` rows `reStampedAt:"BG"` | `Counter({'BG': 31})` over 31 items | **CONFIRMED** |
| "23 HELD books" | dispositions are `book` **27** · `retired` 2 · `archived` 2; `HELD` as a literal disposition value: **0** | **CORRECTED** |
| the watcher-less holds | of the 27 `book` rows, **21** carry a `{kind,n,grep}` trigger AND `resolved:false` | **the honest figure is 21** |

The 21 unresolved booked triggers, enumerated once so the retire is finite: `button-icon-sm` ·
`dock-select-clamp-label` · `tooltip-mono-variant` · `select-size` · `spring-crisp-token` ·
`metric-badge-icon` · `labeled-field-for-id` · `speedtest-a11y-bundle` · `raf-loop-demand-park` ·
`cross-document-vt` · `css-scope-state` · `interestfor-previews` · `css-text-box-trim` ·
`css-interpolate-size` · `glass-dialog-native-pilot` · `glass-native-select-pilot` ·
`inline-edit-primitive` · `labeled-slider-readout` · `directional-view-transition` ·
`cartoon-quiet-preset` · `keyframes-prune-migration-dag`.

The register's own `doc` field states its enforcement contract: *"proof:disposition-live parses
this file and FAILS the close if a book/archived row's trigger now re-evaluates MET."* That runner
does not exist — `grep -c '"proof:' package.json` → **0**. **The machine is convicted by its own
header: a file whose only enforcement is a deleted runner is a historical document.** The retire
stands as ruled; the 21 ids are recorded here so "23 books" never re-enters a BK artifact as an
uncited figure, and so a future owner can revive any single trigger by name.

The anti-re-audit fence (S8 / row #11's law L-4) holds: none of the 21 is re-dispositioned here.

### 4.3 U-07 · `NATIVE-PENDING-ROSTER.md` — **BATCH-STRUCK, as ruled**

Read in full this seat (3,574 B). Its own header already contains the strike's ground twice over:
the deadline is *"before BJ FINAL"* — a document that does not exist and now cannot (BJ closed by
supersession into BK) — and the file itself records a **census-vs-enumeration gap it never
resolved**: *"the stocktake's §2 bucket arithmetic is 37 … its concrete enumeration names 35 IDs."*
The 35 enumerated P-ids stand as historical record. The three named cohorts (Q051 rows 3/5/7 —
PAGER-WORM goo · BUTTON-TONE/BLUR-MUTE · SHRINK-HERO cartoon-weight) do **not** vanish with the
strike: rows 3/5/7 are dispositioned at TR §B.3 (§3.4 above), and their *paint* debt is
`#10 π-SUITE`'s enumeration duty, which lane C already books at U-35/U-36/U-37. **Batch-struck with
rationale; zero members orphaned.**

### 4.4 U-51 · the BJ `OPEN-*` id census — **SEEDED, and the "50 ids" figure CORRECTED**

Detector, stated so it re-derives:
`grep -rhoE '\bOPEN-[A-Za-z0-9_-]+' docs/tranches/BJ --include='*.md' | sort -u`

- **60 distinct tokens** at HEAD. Five are malformed or compound and are not ids:
  `OPEN-QUESTION` (a prose word), `OPEN-FM` (a truncated prefix), `OPEN-FM-2-data-driven`,
  `OPEN-FM-3-gated`, `OPEN-2a-2d` (a range written as a token).
- **The honest id count is 55**, not the lane's 50. Stated as a correction, with the detector, so
  the next reader gets the same number.
- Highest-traffic ids, by total citations: `OPEN-FM-3` (74) · `OPEN-1a` (51) · `OPEN-FM-1` (44) ·
  `OPEN-D9` (34) · `OPEN-P5` (31) · `OPEN-P10` (27) · `OPEN-FM-3a` (26) · `OPEN-3a` (26) ·
  `OPEN-FM-2` (25).
- **The drop lane C predicted is real and is now specific:** exactly **two** OPEN ids reach the
  roster (`OPEN-P10`, `OPEN-P5` — `grep -oE '\bOPEN-[A-Za-z0-9_-]+' TERMINAL-ROSTER.md`), and
  exactly **one** reaches all of `docs/tranches/BK/` (`OPEN-P10`). **53 of 55 OPEN ids are cited by
  zero BK artifact.**
- **Decision:** the seed is this census — the detector plus the two-of-55 reach figure — landed so
  `G-ROW-HOMED` can see a *specific* OPEN drop rather than a generic one. Per-id re-adjudication is
  **explicitly NOT minted**: every OPEN id lives in the BJ refinement corpus that
  `RECONCILIATION` (166 rows / 114 refuted) and `ARCHAEOLOGY` (43/43) already re-audited at HEAD,
  so a live defect either sits in TR §A already or was refuted on the record — re-walking 55 ids is
  the anti-re-audit class (S8) the roster forbids in the same breath at U-04.

### 4.5 The other 46 tails · **CLOSING POSITION: seated where lane C seats them, with two lanes discharged this batch**

Lane C's own verdict (`PROOF-SWEEP.md:470`) is that *"forty-six of the fifty rows need exactly one
line on an existing seat; only U-01/U-02/U-03/U-04 need structure."* This row's position:

- **U-01 · U-04 · U-07 · U-51 — discharged above** (structure supplied or the machine retired).
- **U-05 (the BG absorb-list gap) — DISCHARGED BY ROW #12**, and over-delivered: lane C asked for
  four named lines against a 60-name walk; #12 walked **120 units** and answered all four
  (`BG-CLOSE-RECONCILE.md`). This row does not re-seat them.
- **U-02 (the 134-file BI FORMATION P-corpus) and U-03 (owner-sitting round 2, items 8-12) — NOT
  this row's.** U-02 is a PORT §1.5/§3 structural act; U-03's items 8-12 are **already applied**
  as ✦³ SL-1…SL-5 at `TERMINAL-ROSTER.md:168`/`:190`/§B.4 (read this seat), which is precisely the
  A-2-style overlay lane C asked for. U-03 is therefore **CLOSED-BY-APPLICATION**; U-02 stays open
  at PORT.
- **The remaining 43 — unchanged, at their named seats.** Re-listing them here would duplicate
  derived data against the one-source law and against row #11's law L-9. Lane C is the register;
  `PROOF-SWEEP.md:363-457` is the citation.
- **`PROOF-SWEEP.md` §5 item 3** assigns "full reproduction [of PORT §1.3's 109-wave
  EXECUTED-or-SUPERSEDED class ruling], wave-by-wave" to *"#16's job at close."* **Position:
  OWED, NOT FAKED.** A 109-wave re-walk is a full lane (compare #12's 120-unit walk, which took an
  entire seat), it is not reachable inside this closer's sitting, and it is the one item in this
  row's remit that this row does not discharge. It is stated here as **OPEN**, owned by #16,
  executable as a follow-on seat on the exact model of `BG-CLOSE-RECONCILE.md`. No partial figure
  is quoted.

---

## §5 · THE NEEDS-LUNA / STEER MERGE (S5, with #4)

The roster (`TERMINAL-ROSTER.md:484`) fixes the artifact and the pointer:
`docs/tranches/BK/execution/2026-07-29-phi0/NEEDS-LUNA-STEER-FINDINGS.md`. Read in full this seat
(1,735 B). Its ten dispositions route to #2 · #86/#88/#35 · #22 · #31 · #62 · #9 · #8 · #65 — all
live rows — and its own last cell reads *"receipt | EVIDENCE-ONLY | #16."*

**Decision: ACCEPTED AS EVIDENCE-ONLY, and the merge is CLOSED.** Grounds:

1. The file is explicit that it *"is not a spec, authority, gate, acceptance, or model credit"* and
   *"may prove disposition only."* Nothing in BK cites it for authority; this row does not either.
2. Its ten routes are all to rows that exist on the current roster — no route dangles.
3. Its **boundary section is void with its seal.** It states *"After explicit staging, Git-visible
   untracked count is 0"* — the metric ⊕¹³ᵇ voids by name (*"The '0 Git-visible untracked' seal
   metric that those two lines produced is void with its seal"*), because it was produced by two
   masking `.gitignore` lines since struck. The two SHA-256 path digests remain readable as a
   historical boundary of the 07-29 pre-disposition set; they are **not** a current census and are
   not re-quoted as one.
4. `#16 remains UNSTARTED` in that file's closing line is superseded by this row.

**Residual to #4:** the file's `248 untracked / 234 md / 14 non-md` pre-disposition is a 07-29
reading and must not be reused as a HEAD figure; #4's own stray census is the live instrument.

---

## §6 · THE PNG/JPG FORCE-TRACK CARVE-OUT — the #4/#16 call, RULED

The question, raised by ⊕¹³ᵇ and re-raised as #15's finding F-1: the standing global `*.png`/`*.jpg`
ignore (a pre-existing policy, not the codex masking) means committed BK/BJ artifacts can cite image
anchors that **no clone carries**.

**Measured, so the ruling is finite:**

| set | on disk | tracked | untracked |
|---|---|---|---|
| `docs/tranches/BJ/feedback/` | 31 | 30 | **1** — `F19-metric-badge-overround-grid.png` |

(`ls | wc -l` vs `git ls-files | wc -l`, then a per-file `git ls-files --error-unmatch` sweep.
`git ls-files --error-unmatch` on the F19 path: *"did not match any file(s) known to git"*.)

**RULING (the #4/#16 joint call, this row's half):**

1. **A narrow force-track carve-out is GRANTED, and its scope is exactly one class:** an image that
   is **cited by path from a committed BK or BJ artifact as the evidentiary anchor of a live ask**.
   A citation to a file no clone carries is the exact `G-CITE-COMMITTED` failure the gate exists to
   catch; the alternative — deleting the citation — destroys the owner's own evidence.
2. **The carve-out is NOT a policy reversal.** The global ignore stands. The 625 png + 50 jpg
   captures under `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/` (⊕¹³ᵇ's residue) are
   **bulk capture output, not cited anchors**, and stay untracked. They are recoverable evidence for
   whoever holds the working tree and are honestly recorded as travelling with no clone.
3. **The carve-out's current membership is ONE file:** `docs/tranches/BJ/feedback/F19-metric-badge-overround-grid.png`
   (cited by CFR-01 per #15's register §5; the other 30 members of that directory are already
   tracked, which is itself the precedent — the directory's convention is *tracked*, and F19 is the
   lone deviation).
4. **The act is #4's, at #4's cut** — `git add -f` on that one path, in a commit that names the
   carve-out and its ground. This row holds a NEVER-git wall and executes nothing. The rule that
   goes with it: **the carve-out is enumerated, never a glob** — each future member is added by name
   with its citing artifact beside it, so the exemption can never quietly become a policy.
5. **If #4 declines**, the honest alternative is to strike the CFR-01 citation rather than leave a
   committed artifact pointing at a file that does not travel. Declining silently is not available.

---

## §7 · RESIDUES, ROUTED — nothing dropped

| # | residue | owner | ground |
|---|---|---|---|
| R-1 | Cursor Φ0/Φ1 `SEALED` cells for #1/#2/#4/#5/#8/#75 contradict ⊕¹²'s void | **pass-2 re-adjudication** (APOTHEOSIS cure order item 10) | §2 C-3; raised by #11, confirmed here, counted by neither burndown entry |
| R-2 | `TERMINAL-ROSTER.md` §B.4 still says "PROVEN FORGERY" against ⊕¹⁴'s withdrawal | **#61** (replacement clause quoted at §2 C-4) | TR is dirty from a concurrent lane; not edited here |
| R-3 | PORT needs its §0 pre-history section naming `BC/DEFERRAL-LEDGER.md` · `BD/FOLD-LEDGER.md` · `BD/union/DEFERRED-CENSUS.md` | **PORT** (per `TERMINAL-ROSTER.md:166` and lane C U-01) | the `+BD-CARRY` arm is RED until it lands; the seed is §4.1 |
| R-4 | `JUDGMENT-ROSTER.md`'s 16 `DECISION: ____` need back-annotation from `RATIFICATION.md`/TR §B.3 | **#61** | §3.4; the four-instrument SUPERSEDED-banner row already exists in B.4 (⊕⁴ U-42) |
| R-5 | `WAVES.md:323-330` W-DELETE list orders deletion of `deck`, `carousel`, `metric` — all three overturned | **#61**, with #18 as the live scope citation | §3.2 |
| R-6 | `G-GOO-MORPH` re-grounded and transferred | **#40** | §3.3; the gate's RED-at-HEAD prose is falsified at `constants.ts:14-16` |
| R-7 | PORT §1.3's 109-wave EXECUTED-or-SUPERSEDED wave-by-wave reproduction | **#16 (this row), OPEN** | §4.5 — owed, not faked; the one item of this row's remit left undischarged |
| R-8 | `useLeadTrail` strike-or-wire (one real consumer) | **#26 / #47** | #77's finding, re-derived and CONFIRMED here (§1); the act is `src/`-side |
| R-9 | #77's capture half | **#10 π-SUITE**, itself behind #9's ⊕¹³ᵃ detector recovery | doc-side wall; #77 is mechanism-COMPLETE / capture-OWED |
| R-10 | F19 png force-track act | **#4** | §6, ruled and scoped to one named file |
| R-11 | #13's five residuals (#56, #16, #74, #71, #58) incl. UF-J5's four-clause definition of done | seated at their named rows; the **#16** member is UF-J5's *seating*, which §3/§4 discharge by the same rule used throughout — decision + named executing row, never a mint | `UF-DISPOSITION-LEDGER.md` §4 |
| R-12 | 53 of 55 BJ `OPEN-*` ids cited by zero BK artifact | recorded, **not** re-adjudicated (S8 fence) | §4.4 |

**What this row deliberately did NOT do**, each with its reason:

- **No git operation of any kind** (hard wall). Every file below is uncommitted.
- **`TERMINAL-ROSTER.md` untouched** — dirty from a concurrent lane; every TR-side correction is
  quoted verbatim for the pen-holder instead (§2 C-4). Same discipline #12 and #14 used.
- **No seal minted.** 0/87 stands; CLOSED is the lead's act after the Challenge Law pass (⊕¹¹).
- **No percentage stated outside `BURNDOWN.md`** (row #11's law L-6).
- **No code-side gate-register figure quoted** (⊕¹³ᵃ standing). §4.2's `grep -c '"proof:'` is a
  `package.json` runner count, not a governed-invariant register figure.
- **No re-audit of a subject already refuted** at `ARCHAEOLOGY.md` §2.3 or `FROST-TABS-REAUDIT.md`
  §4 (law L-4).

---

## §8 · FILES WRITTEN BY THIS ROW

1. `docs/tranches/BK/execution/2026-08-03-row16-orphan-rows/ORPHAN-ROWS-CLOSE.md` — this file, the
   row's record of record.
2. `docs/tranches/BJ/addenda/2026-07-24-refinement/ECOUTE.md` — §1a A12/A14 struck-in-place (§3.1);
   §3 `W-ORPHAN-ROWS` preamble + all three gate cells carrying their decisions (§3.2–§3.5).
3. `docs/tranches/BK/BURNDOWN.md` — **entry 2**, appended (entry 1 invited it by name: *"recorded in
   the next entry when their batch closes"*). Rule 1 honored: entry 1 is not edited.
4. `docs/tranches/BK/EXECUTION-PROGRESS.md` — the four missing Φ3 cursor lines (#12, #14, #16, #77).
   No other row's cell touched.

Rows stay **91** · gate seats **+0** · budget **60** · no Φ, code, or evidence-state motion on any
row outside this batch.
