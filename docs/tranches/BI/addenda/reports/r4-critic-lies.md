# R4 Critic — LIES + FIX-LANDED verification (non-author, round 4)

Posture: fresh non-author adversarial critic. Lens = fabrication-hunt + fix-landed
verification. Fences honored: `/Users/mkbabb/Programming/glass-ui` READ-ONLY (read-only
git/grep only; zero mutations); the inbox note read in place; my only write is this file.
Every verdict below is grounded in a grep/read/`git` command against the live working tree
(HEAD `e5b3a209`, the 850-file 7.0.0-in-flight transaction) this session.

**Bottom line: CLEAN.** Zero substantive findings survive my own refutation. Every substantive
round-3 finding (across all three r3 critics) is genuinely folded in v3 — not merely mentioned —
and I verified the folds landed against disk. The load-bearing factual pins all trace to
evidence. The known past fabrications did NOT resurface. The strike-list holds. What remains is
one cosmetic pin error with no operative consequence (border-progress "non-empty"), plus two
drift-notes. None rises to substantive.

---

## 1 · FABRICATION HUNT — load-bearing pins spot-checked against the tree

All verified TRUE (file:line or git object):

| pin (plan/registry) | tree truth | verdict |
|---|---|---|
| Slider.vue 641 | 641 | ✓ |
| PagerDots.vue 580 | `pager-dots/PagerDots.vue` 580 | ✓ |
| EasingPicker.vue 541 | `easing/EasingPicker.vue` 540 | ✓ (−1, active-edit drift) |
| aurora atoms.ts 592 (2nd-largest) | 592 | ✓ |
| useMetaballRenderer.ts 547 | 547 | ✓ |
| aurora runtime.ts 520 (F-4 host) | 519 | ✓ (−1 drift) |
| blob shader strings 537/527 | metaball.frag.ts 537 · metaball.wgsl.ts 527 | ✓ |
| dock/styles/shell.css 505 | 505 | ✓ |
| runtime.ts:444-470 wedge-catch masking-suspect | BB.W-AURORA-SWRASTER inert-handle/BLANK-frame path present ~444-470 | ✓ |
| eyeglass spring 0.36/ζ0.64 ~7.3% overshoot | springPresets.ts:120 verbatim; `--spring-eyeglass` peaks ~1.073 | ✓ |
| eyeglass UNCONSUMED, loupe wired to snappy | `var(--spring-eyeglass)` consumers = 0; SegmentedTabs.vue:258 reads `--spring-snappy` | ✓ |
| `--eyeglass-live-t` unbuilt (ships static) | grep empty | ✓ |
| DOCK_SPRING 0.30/ζ0.82 | springPresets.ts:99 | ✓ |
| DRAWER_SNAP {0.32,0.80} | drawer/constants.ts:30 | ✓ |
| DOCK_MORPH_MAX_STRETCH 1.14 | dock/constants.ts:25 | ✓ |
| `--motion-tempo: 1` | scheme-motion.css:262 | ✓ |
| card-pad √φ ladder 24px→×1.272→/1.618→/2.618 | card/styles.css:4-8 | ✓ |
| motion/ = 42 files / 7 buckets | 42 `.ts` files | ✓ |
| scripts orphans audit-stash-list + worktree-gc | both present | ✓ |
| reflect-capture-verify.mjs LIVE (KEEP) | imported by paint-arm.mjs + gesture-frame-recorder.mjs | ✓ |
| no-masking-manifest.mjs unreferenced | referenced only by FORMATION json + itself; no CI/pkg ref | ✓ |
| metric consolidation (P117) landed | metric/ populated; metric-badge/cell/stack file-less husks | ✓ |
| CompletionSeal 0-1-real-consumer | only CSS-token + own-story references; no component consumer | ✓ |
| 4 BG surface SHAs (3857b33/cd9ce46/b3d65eec/20b09bc7) | all resolve as real commits; tokens in ledger-verify.md | ✓ |
| eyeglass 1.7% system ceiling | motion-dock-audit.md MD-4 (measured) | ✓ |

**Known-past-fabrications — did NOT resurface:**
- muster/words glass pins — Q060 explicitly writes "muster/words carry NO glass dep — R1
  fabrication, corrected" (plan:209). ✓
- "eyeglass absent" — plan treats the loupe as delivered (`.glass-lens` pill default, do-not-
  relitigate:33); Q020 is scoped to the *spring being unconsumed* (real, H-3), not absence. ✓
- useDragMorph JS-comment meta channel — Q041 names the *correct* channel: source JSDoc → 105
  emitted `.d.ts` + 4 shader-string literals + drawer JSDoc + 259 demo comments; it does NOT
  claim the stripped JS comment ships. ✓

Demo meta count "259 across 97 files": tree now reads **262 across 97 files** — a +3 drift from
new comments landing in the live transaction. This is NOT a finding: Q041's acceptance is a
"one-time RED→GREEN grep differential quoted in the wave commit," explicitly re-pinned at
execution, precisely so a moving count is not load-bearing. Files (97) exact.

## 2 · FIX-LANDED — every substantive round-3 finding, verified resolved (not just mentioned)

**r3-critic-lies (critic 1):**
- H1 (C-2 undispositioned) → **FOLDED.** Q002 line 45-47 adds the C-2 verify sweep enumerating all
  9 consolidations (P074/P081/P082/P083/P091/P100/P104/P113/P117) + ~20 flatten-partials "confirmed
  cleared — a checklist read, not a script"; registry strike-list:9 records "C-2 gains a plan
  VERIFY row." Tree confirms P117 already landed. ✓
- H2 (F-6 P019-absent) / H3 (stale F-3/C-4/D-3/A-5 rows) → **FOLDED** via the registry
  ROUND-3-HYGIENE strike-list (REGISTRY:3-11): each ID struck "left in place for lineage, do not
  cite." Plan carries none of them as live claims. ✓
- H4 (Q022 double-owns π discharge) → **FOLDED.** Q003 header "absorbs Q022"; no standalone Q022
  wave. ✓
- H5 (I-6 owner+deadline) → **FOLDED.** Q063 now "OWNER: codex, DEADLINE: before any Downloads
  cleanup and before their transaction commits." ✓

**r3-critic-completeness (critic 2):**
- C2-01 (completion/border-progress open_q orphaned from Q051) → **FOLDED.** Q051 item 14. All 6
  §6 open_questions now enumerated (inline-edit·Baseline·aurora-lazy·completion·metrics-sextet·
  hover-popover). ✓
- C2-02 (Q051 omits routed-in items) → **FOLDED.** H-2 fission = item 1, I-5 = item 15, Q080 =
  item 17 (struck/retracted, recorded). ✓
- C2-03 (Q042 drops 3 .ts monoliths) → **FOLDED.** Q042 now names atoms.ts 592, useMetaballRenderer.ts
  547, runtime.ts 520 as roster members. ✓ (line counts verified).
- C2-04 (T10/T14 no owning wave) → **FOLDED.** New wave **Q024 REGISTER-CALIBRATION** owns T10
  (scale ~0.93-0.95 vs 0.88 over-rotate) + T14 (capsule bloom t90 300-375ms; exit 100-117ms). ✓
- C2-05..C2-11 (recap·RM-3·D-4·N-4·AX-line·F1/G1·H-5) → all **FOLDED** (recap a-n incl. Band 8/9 +
  media; Q020 RM-3 rider; Q032 D-4 DECLINED-OPTIONAL; Q070 N-4 "now proposed"; Q050 AX consolidated
  ratification; Q050 F1+G1 "ratified closed"; Q042 shell.css EXEMPT-with-rationale). ✓

**r3-critic-ruling (critic 3):**
- R3-1 (KISS folds) → **FOLDED.** Band 8 3→1, Q050+Q062→1, Q060+Q061→1, Q034→Q040-line, Q022→Q003.
  Wave count now 20 (I counted the bands: 2+1+4+4+4+2+2+1=20, matches header). ✓
- R3-1b (Q071 triage-machine-as-law) → **FOLDED.** Absorbed into Q070 "one document, no ceremony"
  as description, not a mandated protocol wave. ✓
- R3-2 (Q043 already-done → verify-only) → **FOLDED.** Q043 reframed verify-only; verified on disk:
  working-tree ci.yml/release.yml carry no verify.mjs, hook is ` D`. ✓
- R3-3 (demo:boots orphaned check) → **FOLDED** by choosing option (b): the ruling section now
  lists standing checks as typecheck·build·unit-tests ONLY, boot = "step 1 of the pre-tag lane, a
  look." demo:boots is not claimed as a standing check anywhere. ✓
- R3-4 (Q041 collides w/125 demo M) → **FOLDED.** Q041 SEQ:RIDE with the collision note (see 4·L3
  for a wording nit). Verified demo M = 125. ✓
- R3-5 (media not in inbox note) → **FOLDED.** Inbox note item 3 IS the media-provenance alarm. ✓
- R3-6/R3-7 (motion-split collision / no ride-vs-post partition) → **FOLDED.** Q032 SEQ:POST
  "re-pin at execution"; every wave now carries a SEQ tag (RIDE/POST/PRE-TAG/HEAL/GATE). ✓
- R3-8 (fence/repo writes) → **ADDRESSED.** Q002 "release.sh gains the mention (codex's edit — they
  own the tree)"; the inbox note already exists on disk under the formation's declared
  coordination-write allowance. ✓
- R3-9 (Q061 "invariant line") → **FOLDED** on the plan side (Q060 uses "checklist"/law language, no
  "invariant line"). ✓
- R3-10 (Q041 .d.ts = build output) → **FOLDED.** Q041 "Product edit at SOURCE (the .d.ts carriers
  regenerate from source JSDoc)." ✓
- R3-11 (Q021 double-books Q051 gate) → **FOLDED.** Q021 SEQ:GATE "the ruling row lives in Q051 …
  this wave only assembles what the ruling reads." ✓

**Fix-landed matrix: 0 claimed-folded-but-unfolded.** Every round-3 fix I could check resolves in
the artifact, not merely in a promise.

## 3 · STRIKE-LIST INTEGRITY — no struck item survives as a live claim / wave input

- F-6 (P019 absent): plan do-not-relitigate:33 treats the 1/√φ pair as in-flight-done; tree
  confirms (scale.css:129). Not resurfaced. ✓
- F-3 / C-4 (eyeglass absent): treated as delivered; Q020 scoped to the unconsumed spring. ✓
- D-3 "43 files/6-way": Q032 uses 42 files / 7 buckets. ✓
- A-5 muster/words: corrected in Q060, called out as the R1 fabrication. ✓
- Q022 → Q003: no standalone Q022 anywhere in the plan. ✓

## 4 · INTERNAL CONSISTENCY (plan ↔ registry ↔ inbox note)

**The inbox-note CI item is ACCURATE, not stale (a concern I raised then refuted):** HEAD's
committed ci.yml *does* invoke `node scripts/verify.mjs` (line 22); the working-tree ci.yml is
`M` with it removed. So the note's "the workflow edit must ride the same commit or the first
post-transaction push breaks CI" is the correct E-2 residual, fully consistent with the plan's
Q043 "verify-only (their tree already clean)." Both true, no contradiction. (The plan's
inbox-note description also lists "triumvirate/process" — present at the note's line 47. No mismatch.)

The remaining items below are the only inconsistencies I found; all are cosmetic.

### L1 [minor] `border-progress "itself non-empty"` is refuted by the tree AND contradicts Q051
- Registry D-7 correction (REGISTRY:52) and Q033 (plan:119-120): the empty-husk rider says "target
  `border-progress/composables`, not `border-progress` (**border-progress itself non-empty**)."
- Tree truth: `border-progress/` contains **zero files** — `git ls-tree -r HEAD` returns nothing
  for it, `git status` shows no deletes, and `find … -type f` is empty. It is a file-less two-level
  husk (`border-progress/` + empty `border-progress/composables/`). The "non-empty" pin is false.
- This contradicts the plan's own **Q051 item 14** which (correctly) says "border-progress half
  MOOT **by retirement**." Q033/D-7 say alive; Q051 says retired; the tree says retired.
- Blast radius: cosmetic. Following Q033 leaves one extra empty dir (`border-progress/`); the rider
  itself says "rmdir or ignore (git won't ship them)," so no operative harm, and the Q051 judgment
  (CompletionSeal's real consumer) is unaffected. Fix: reword D-7/Q033 to "border-progress itself
  is also a file-less husk (retired) — rmdir both `border-progress/` and its `composables/`,"
  reconciling with Q051.

### L2 [note] husk count 15 vs 13
Q033 / D-7 say "15 empty dir husks"; the tree has **13** file-less dirs under src/components
(`section·icon-chip·border-progress(+composables)·controls·metric-stack·metric-cell·metric-badge·
icon-tooltip·spa-view·goo-filter·focus-scope·constellation/shaders`). Drift under the live
transaction; non-load-bearing (git-invisible), but the "15" overcounts by 2. Fold the true count
into the L1 reword or drop the number.

### L3 [note] Q041 "125 of the 97+ carrier files are M" — arithmetic muddle
Plan:132 reads "125 of the 97+ carrier files are M in their transaction." You cannot have 125 of
97. The 125 is the count of *all* `M` demo files (`git status --porcelain -- demo/ | grep -c '^ M'`
= 125, verified); the 97 is the meta-carrier subset. The collision point is real (the carriers are
among the 125), but the phrasing conflates the two counts. Reword: "the 97 carrier files are among
the 125 `M` demo files in their transaction."

---

## Verifications that HELD (genuine attempts to break, could not)

- All 4 BG-surface SHAs are real commits; eyeglass 1.7% ceiling is a measured value in
  motion-dock-audit.md; the wedge-catch is real code carrying its BLANK-frame class in comments.
- Wave count 20 / 8 bands reconciles with the header's fold accounting (25 − 6 folds + 1 add = 20).
- Q050 terminalizes all 5 REBOOKED-ORPHAN promotion rows (A1/A2/D1/D2/E1) with each re-homing its
  property; disease clusters 1-7 land in Q002's roster, cluster 8 (AX) in Q050.
- Consumer roster (Q060) matches the A-5 correction (atlas+sci-report adopted; value/kf producers
  in-tree; slides/speedtest/bbnf-buddy stale; muster/words non-consumers).
- No wave depends on an abrogated wave (Q001/Q022/Q034/Q061/Q062/Q071/Q072 all correctly folded,
  no dangling refs).

## Verdict
CLEAN. Substantive findings surviving refutation: **0**. Minor/notes: **3** (L1 minor cosmetic
pin contradiction; L2/L3 wording nits). The v3 rewrite faithfully folded the round-3 corpus and
its pins hold against the tree; the residue is cosmetic and would not mislead the executor.
