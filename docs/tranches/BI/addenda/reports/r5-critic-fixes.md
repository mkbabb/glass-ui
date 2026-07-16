# R5 Critic — fix-landed + fabrication recheck (NON-AUTHOR, round 5)

Posture: fresh non-author critic, round 5 of a two-consecutive-clean convergence. Charge:
verify the round-4 fixes actually landed in v3.1, confirm the round-3 folds did not regress,
spot-check every new factual pin against the live tree, and cross-check plan ↔ registry ↔ the
placed inbox note. Say CLEAN only if no substantive (major/moderate) finding survives my own
refutation. Fences honored — `/Users/mkbabb/Programming/glass-ui` READ-ONLY (read-only git/grep
only; zero mutations, zero builds); my only write is this file. Every verdict is grounded in a
command against the working tree (HEAD `e5b3a209`, the ~980-row 7.0.0-in-flight transaction).

**Bottom line: CLEAN.** All seven round-4 findings (F1/F2/L1/L2/L3/N1/N2) are genuinely folded
into v3.1 — not merely mentioned — and each fold verifies against disk. The round-3 folds all
persist through the round-4 edits. The new pins introduced by v3.1 all trace to real repo
content. No fabrication resurfaced. What remains is four MINOR/NOTE hygiene residues (a stale
count in the *placed* inbox note, a slightly imprecise MIGRATION line cite, a stale version label
in the plan header, and a drift-prone carrier-count framing) — none load-bearing, none capable of
misleading the executor into a wrong action.

---

## 1 · ROUND-4 FIX-LANDED — every finding verified resolved on disk

| r4 finding | required fold | v3.1 location | disk verification | verdict |
|---|---|---|---|---|
| **F1** (C-5 SplitChars/Toggle no home in Q050) | a DECIDED bullet in the Q050 ledger | plan:177-178 "**C-5 SplitChars + Toggle removals ratified DECIDED clean-breaks** (MIGRATION.md:31; both live-deleted in the transaction) — deliberate design acts, not defects" | `git status` shows `src/components/split-chars/{SplitChars.vue,index.ts,README.md}` + `src/components/toggle/{Toggle.vue,index.ts}` all ` D`; MIGRATION.md:29 (SplitChars) + :31 (Toggle) rows exist | **FOLDED** ✓ |
| **F2** (E-3 dist/fonts orphaned) | a home for the fonts-glob look | plan:55-56 (Q002 roster) "the E-3 pre-publish look: the dist/fonts export glob actually resolves on the built candidate" | matches registry E-3 routing (`REGISTRY.md:123` "OWNER: Q002 pre-tag lane (the fonts-glob look)") | **FOLDED** ✓ |
| **L1** (border-progress "non-empty" false + contradicts Q051) | reword to file-less/retired | plan:126-128 "the wholly retired, file-less border-progress/ tree"; registry:115 "the wholly retired border-progress/ tree" | `find src/components/border-progress -type f` → empty (file-less); reconciles with Q051 item 14 "MOOT by retirement" | **FOLDED** ✓ |
| **L2** (husk count 15 → 13) | true count | plan:127 + registry:115 both say **13** | `find src/components -type d` file-less dirs → exactly **13** paths (incl. `border-progress` + `border-progress/composables`) | **FOLDED** ✓ |
| **L3** (Q041 "125 of 97" impossible arithmetic) | coherent reword | plan:140-141 "the 97 carrier files sit among the 125 M demo files in their transaction" | `git status --porcelain -- demo/ \| grep -c '^ M'` = **125** ✓; arithmetic now coherent | **FOLDED** ✓ (residue → M4) |
| **N1** (fence self-contradiction / mailbox exception) | state the mailbox exception in the plan | plan:10-12 "Fence: 'read-only' means the PRODUCT tree. `docs/tranches/BI/coordination/` is the established mailbox … the one sanctioned write channel … Nothing else, ever." | explicit exception present in header | **FOLDED** ✓ |
| **N2** (A-3 close-battery residue undispositioned) | Q003 carries PE-GESTALT subsumption + H-8/H-9/H-12 liveness | plan:66-68 "the A-3 residue: the PE-GESTALT 30-cell ledger is SUBSUMED by this wave's per-surface verdict ledger, and the H-8/H-9/H-12 liveness rows are checked live in the same batch" | present verbatim in Q003 | **FOLDED** ✓ |

**Fix-landed matrix: 0 claimed-folded-but-unfolded.** Every round-4 finding resolves in the
artifact against disk, not merely in a promise.

## 2 · ROUND-3 FIX PERSISTENCE — no regression during the round-4 edits

- **Q051 still 17 rows** incl. completion/border-progress (item 14) and the Q080 retraction
  (item 17 `~~Version re-baseline (Q080)~~ — RETRACTED-BY-USER`). ✓ (plan:190-208)
- **Q024 still owns T10/T14** (plan:99-103: T10 liquid-entrance scale ~0.93-0.95 vs 0.88; T14
  notification-capsule bloom t90 300-375ms / exit 100-117ms). ✓
- **Q042 still owns the 3 .ts monoliths** (atoms.ts 592 · useMetaballRenderer.ts 547 · runtime.ts
  520) **with shell.css EXEMPT-with-rationale** (plan:148-154). ✓
- **Q043 still verify-only** (plan:156-159 "a verify-only read at their commit boundary … zero
  edits of ours"). ✓
- **Recap still spans a-n** (plan:250-261, all fourteen mappings present). ✓
- KISS folds intact: 20 waves / 8 bands (2+1+4+4+4+2+2+1 = 20 verified); Q022→Q003, Q034→Q040,
  Q062→Q050, Q061→Q060, Q071+Q072→Q070 all appear only as fold provenance, no live deps. ✓

## 3 · FABRICATION SPOT-CHECK — new pins introduced by v3.1

- **13-husk recount**: `find src/components -type d` → exactly **13** file-less dir paths
  (`section·icon-chip·border-progress·border-progress/composables·controls·metric-stack·
  metric-cell·metric-badge·icon-tooltip·spa-view·goo-filter·focus-scope·constellation/shaders`).
  border-progress is file-less (retired). **PIN HOLDS** ✓
- **MIGRATION.md:31 SplitChars/Toggle clean-break**: line **31** = the standalone `Toggle` →
  `ToggleGroupItem`/native `aria-pressed` clean-break row (correct); the **SplitChars** clean-break
  is at line **29**, not 31 (see M2). Both rows genuinely exist. **NOT a fabrication** — the
  decision is real; the single-line cite is imprecise for a two-row disposition.
- **97-carriers-among-125-M framing**: 125 M demo files **confirmed** (exact). The 97 carrier-file
  count has drifted (my independent `B[A-Z]\.W-|tranche` sweep now finds ~101 files / 272
  occurrences vs the pinned 97/259), and ~39 of the meta-carrier demo files are *unmodified/clean*
  (not in the M set) — so the strict "sit among the 125 M" subset framing is only ~62% true (see
  M4). Non-load-bearing: Q041's acceptance is "the one-time RED→GREEN grep differential quoted in
  the wave commit. NO standing grep," explicitly re-pinned at execution.

No known-past fabrication resurfaced (muster/words non-consumers held in Q060; eyeglass treated as
delivered; useDragMorph stripped-comment channel not claimed).

## 4 · CROSS-DOC CONSISTENCY (plan ↔ registry ↔ placed inbox note)

- Plan Q002 E-3 routing == registry E-3 "OWNER: Q002 pre-tag lane." Consistent. ✓
- Plan/registry husk rider (13, border-progress retired) == tree. Consistent. ✓
- The inbox note's CI item (2) is accurate, not stale: HEAD's committed `ci.yml` invokes
  `scripts/verify.mjs`; the working-tree copy is `M` with it removed — the "must ride the same
  commit" residual (E-2) is real and matches Q043. ✓
- **Contradiction found (M1):** the placed inbox note item 6 still says "**15** empty dir husks"
  while the round-4 L1/L2 fix corrected plan+registry to **13**. The correction did not propagate
  to the *placed* note.
- Accepted per the task brief and NOT counted: the note's closing "our only writes" line is slated
  for the final-placement amendment.

---

## FINDINGS (all MINOR / NOTE — none substantive)

### M1 [minor · cross-doc] Placed inbox note carries the pre-R4 "15 husks"; plan/registry say 13
`docs/tranches/BI/coordination/addenda-inbound-2026-07-16-hold-and-marks.md:41` reads "15 empty
dir husks"; the round-4 L1/L2 fix corrected the count to **13** in plan:127 + registry:115, and
the tree confirms 13. Genuine cross-doc contradiction the task flags as a finding class. **Not
substantive:** the count is explicitly drift-prone and non-load-bearing (git won't ship husks; the
codex action "rmdir or ignore" is unaffected by the exact number), and the note is a courtesy
mark. The plan says the note is "amended … at final placement" (plan:263) but the described
amendment (plan:269) only "appends the addenda-folder pointer + wave roster" — it does not mention
reconciling the husk count. Recommend the final-placement amendment also drop "15" → "13" (or the
number entirely). No wrong executor action results.

### M2 [minor · pin-precision] MIGRATION.md:31 cite lands on the Toggle row only; SplitChars is at :29; registry cites stale :23,25
Q050 (plan:178) and the C-5 registry row (REGISTRY:102) cite "MIGRATION.md:**31**" for the
"SplitChars + Toggle" clean-break. Line 31 is the `Toggle` row; the `SplitChars` clean-break is at
line **29**. Separately, the registry R2-correction block (REGISTRY:20-21) cites
"MIGRATION.md:**23,25**" for the same pair — a stale line-pin from an earlier tree state (neither
matches now). Both clean-breaks genuinely exist in MIGRATION.md, so this is imprecision, not
fabrication; and line numbers drift under the live transaction, making exact single-line pins
inherently fragile here. Recommend "MIGRATION.md:29,31" (or "MIGRATION.md §component-removals").
No wrong action — a reader at :31 sees Toggle and scans two lines up to SplitChars.

### M3 [note · provenance] Plan header still self-labels "v3, post round-3 critics"
plan:1 reads "# BI-ADDENDA — the plan (**v3, post round-3 critics**; the placement artifact)"
though the document is the round-4-folded artifact the task calls **v3.1**. The header line 6 also
still says "(v3, post round-3 critics; the placement artifact)". Pure metadata hygiene; the
provenance label lags the content by one convergence round. Recommend bumping to "v3.1, post
round-4 critics." No operative impact.

### M4 [note · pin-precision] Q041 "the 97 carrier files sit among the 125 M demo files" — subset framing imprecise + counts drifted
The L3 reword fixed the impossible "125 of 97" arithmetic, but the replacement subset claim is
only partially true: my independent sweep finds ~101 meta-carrier demo files / 272 occurrences
(vs the pinned 97/259), and **39** of them are *unmodified/clean* — not in the 125 M set and not
otherwise in the transaction. So a substantial fraction of carriers do **not** "sit among the 125
M." The SEQ:RIDE collision rationale still holds for the ~62 carriers that ARE M (riding avoids a
re-touch), and Q041's acceptance is an execution-time one-time differential ("NO standing grep"),
so the exact counts are explicitly non-load-bearing. Recommend softening to "most of the ~97
carrier files are among the codex's in-flight demo edits — a second pass would re-touch open
files." Noted, not counted.

---

## Verifications that HELD (genuine attempts to break, could not)

- 20 waves / 8 bands reconciles exactly (2+1+4+4+4+2+2+1). No wave depends on an abrogated wave.
- split-chars + toggle deletions confirmed (5 files ` D`) — F1's "both live-deleted" is true.
- border-progress is genuinely file-less (retired) — L1's reword is correct and reconciles with
  Q051 item 14; the old "non-empty" claim is gone.
- 13 file-less husk dirs on disk — L2's count is exact.
- 125 M demo files — exact.
- Registry FAM-E E-3 routing (→ Q002) matches the plan; F2 has a real home + owner.
- Q003 now carries the A-3 residue (PE-GESTALT subsumption + H-8/H-9/H-12 liveness) — N2 folded.
- The mailbox fence exception is stated in the plan header — N1 folded; the accepted "our only
  writes" amendment is correctly out of scope.
- No round-3 fold regressed under the round-4 edits.

## Verdict
**CLEAN.** Substantive (major/moderate) findings surviving refutation: **0**. Minor/notes: **4**
(M1 stale husk count in the placed inbox note; M2 imprecise MIGRATION line cite; M3 stale version
label; M4 drift-prone carrier subset framing). Every round-4 fix landed against disk, every
round-3 fold persists, and every new pin traces to real repo content. The residues are hygiene
that would not mislead the executor. This is my second-consecutive-clean-eligible verdict.
