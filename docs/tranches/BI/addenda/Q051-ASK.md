# Q051 — the one ask

This is the single user-gated ask of the whole BI-addenda. Everything else in the tranche is a
decided disposition or an executor wave; these are the calls reserved for you. One checklist, one
sitting. Sixteen live rows (row 17 is closed). Each row: the decision, where the evidence is, the
recommendation already on record (with where it was adjudicated), and what your answer unblocks.

Ordered by consequence — the four tag-gating rows first (they must resolve before the candidate
tag; the three veto-window rows already shipped their default into the tree, so silence ratifies
them but the window closes at the tag). Then the rulings and dispositions, then the paint-taste
calls that need a capture before you can decide.

Source rosters this consolidates: `JUDGMENT-ROSTER.md` (the 17 rows), `DISPOSITIONS.md`
(the dispositions and the evolution-vs-greenfield fold), and the Q021 packet
(`Q021-FISSION-EVIDENCE.md`) for row 1.

---

## Tag-gating (resolve before the candidate tag)

### 1. Row 1 — Dock fission: ratify the retirement, or commission a rebuild? (the headline)

The iOS-27 fission/goo dock (V↔H orientation morph + Siri island) was retired for a Safari
`filter:url()` risk (UF-C3); the shipped dock is expand/collapse + crossfade, not the reference
fission dock. **Ratify the retirement as terminal, or rebuild fission cleanly?** This row also
subsumes the dock evolution-vs-greenfield question (DISPOSITIONS.md:71 folds it here).

- **Evidence:** the full Q021 packet — `Q021-FISSION-EVIDENCE.md`. In short: UF-C3 was a flagged
  suspect and a known-broken demo, never a captured Safari repro; the honest goo is only a
  ≤2-frame (17-33ms) waist, so a clean CSS/canvas rebuild without stacked `filter:url()` is
  feasible; our own BF render over-necked it, so a rebuild must tighten, never lengthen
  (DOCK-LADDER §3/§8, media-analysis M-3 = REGISTRY I-3 / media-analysis §I-4). The shipped dock's
  functional states paint-verified on Chromium at HEAD-identical bytes (V5 dock sweep — see Q021 §B);
  what remains owed is the motion-π discharge (overshoot/settle/interruption traces + real Safari,
  chronic #92) and any rebuild's paint.
- **Recommendation on record:** decide on the evidence, not a default. The audit's lean is
  **(A) ratify** the simplified dock as terminal unless you want the spectacle — the fission was
  demo-only, zero-binary-consumer, and Safari-risky (`reports/motion-dock-audit.md:132-133`,
  §5). If **(B) rebuild**, the DOCK-LADDER supplies the exact honest-goo bounds.
- **Unblocks:** the dock's terminal identity; the Q060 dock-contract coordination outbound
  (#22b/c is written "post-Q021 ruling" — `addenda/PLAN.md:481`); and Band 3's dock close.

### 2. Row 2 (judgment-a) — keep the landed dock spring 0.30 / ζ0.82?

Already shipped: `springPreset("dock")` = response 0.30, ζ0.82 (`springPresets.ts:95-97`), retuned
from 0.68/ζ0.64 into the measured iOS band.

- **Evidence:** `reports/motion-dock-audit.md` §1/§2 (H-1); the veto capture is PENDING-HEAL at
  Q003 (DOCK-LADDER overshoot/settle trace).
- **Recommendation:** **Keep** (LANDED-TO-RECOMMENDATION, in the measured band). Honest cost: the
  weighty ζ0.64 tail is gone; the settle is tighter than the heaviest reference arm. Veto window
  open.
- **Unblocks:** closes the dock-spring veto window before the tag; a veto means a retune lands
  first.

### 3. Row 4 (judgment-c) — keep tempo = 1.0 as the identity?

Already shipped: `--motion-tempo` default 1.0 (shape-preserving settle→duration axis).

- **Evidence:** `reports/motion-dock-audit.md` §2 (H-1); the 0.88-arm capture is PENDING-HEAL at
  Q003.
- **Recommendation:** **Keep** (LANDED). Honest cost: the 0.88 arm (a slightly slower, weightier
  feel) was rejected and is captured for the veto. Veto window open.
- **Unblocks:** closes the tempo veto window before the tag.

### 4. Row 8 (judgment-g) — keep the landed drawer detents {0.32, 0.80}?

Already shipped: `DRAWER_SNAP = {response 0.32, ζ0.80}` (`drawer/constants.ts:11`), from
{0.5, 0.74}.

- **Evidence:** `reports/motion-dock-audit.md` §2 (H-1); veto capture PENDING-HEAL at Q003.
- **Recommendation:** **Keep** (LANDED, measured-band detent). Honest cost: a snappier prior feel
  was traded for the measured band. Veto window open.
- **Unblocks:** closes the drawer-detent veto window before the tag.

---

## Rulings and dispositions (decidable now on the evidence)

### 5. Row 15 — revive the dot-flow halftone backdrop?

Revive the dot-flow halftone backdrop (T17: a radial density-gradient vignette, dense at the edges
and clear in a central content void)? Its viz was user-DELETED (TAIL reg#15, "failed 30+
attempts"), so a revival needs your explicit ruling, never a silent rebuild.

- **Evidence:** `reports/media-analysis.md` §8 and M-4 (`:77-83`), REGISTRY I-5 (`:189`). The
  surpass-target source is preserved: two byte-divergent recordings `Screen Recording 2026-06-22
  at 14.38.42.mov` (SHA `c97d0341…`) and its `copy.mov` (SHA `12ae0825…`), committed at `6d4e75bf`
  under `docs/tranches/BD/viz/source-media/` (README.md:33-34). Caveat worth knowing: the iOS-27
  corpus flags this surface as a **desktop** composer backdrop, not iOS chrome, and was earlier
  mislabeled a "pager-dots goo-morph" — cite it for the graded-texture mask only
  (`/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/bi-addenda/reports/ios27-corpus/CODEX.md:340`, open-question 9).
- **Recommendation:** desirable "suffuse-from" target per the media analysis, but the viz was
  explicitly killed — **needs a ruling** (revive / stay-retired). No silent build either way.
- **Unblocks:** whether a new viz build is chartered; also settles the archive-claim scope for the
  two preserved .mov files (source-media/README.md:13 defers that scope here).

### 6. Row 14 — is CompletionSeal a one-consumer primitive to inline?

Does `CompletionSeal` have a real second consumer, or is it a one-consumer primitive to inline?

- **Evidence:** `reports/ledger-verify.md` §6 (the live CompletionSeal 0-or-1-consumer half);
  `reports/prompt-recap-verify.md:109` UF-J4 (the MOOT border-progress half). The border-progress
  half is already MOOT (`HEAD:src/components/border-progress` = 0 files, retired).
- **Recommendation:** the border-progress question is closed by retirement; the CompletionSeal
  **0-or-1-real-consumer** question stands — **inline it if it stays at one**.
- **Unblocks:** the completion/border-progress family's terminal shape (keep-as-primitive vs
  inline).

### 7. Row 9 — build the inline-edit primitive now, or hold?

- **Evidence:** `reports/ledger-verify.md` §C row 3 (orphaned-at-cut).
- **Recommendation:** **RETIRE-until-convergence** — 6.0.0 shipped without it and nothing depends
  on it; revive on an explicit need.
- **Unblocks:** clears an orphaned open-question off the standing list.

### 8. Row 10 — retire the 8 AX Baseline standing-books as a batch?

- **Evidence:** `reports/ledger-verify.md` §D §1a and §C row 2 (see also DISPOSITIONS.md:64, the
  AX 21-book cluster).
- **Recommendation:** **Batch RETIRE** — they are standing open-questions with no live carrier;
  the re-stamp-ceiling that tracked them died with the gate ruling.
- **Unblocks:** closes the last open arm of the AX 21-book cluster.

### 9. Row 16 — confirm the metric-badge inversion (pill deleted, badge kept SHARED)?

**This confirms a decision that inverts your own named example.** You named *metric-badge* as the
speedtest overfit to delete; the consumer census found metric-badge is the **MOST-shared** component
(3 apps: speedtest×2, muster×2, sci-report×2), while *metric-pill* is the only clean 0-consumer
in-repo delete. So the ruling deleted metric-**pill** and SHARED-KEEP metric-**badge** (+ cell,
stack, chassis) — the reverse of the named instruction.

- **Evidence:** `docs/tranches/BI/STRUCTURE-ADDENDA.md` §3 (SPEEDTEST-OVERFIT DISPOSITION — DP-A option (A), RULED; the file sits at the tranche root, not `addenda/`),
  which carries **USER-FLAG #1**, the named-example inversion (STRUCTURE-ADDENDA.md:13-16, :345-347,
  :415); landed as `BI.W-S-METRIC-PILL-DELETE` (`coordination/asks-and-consumes.md` row 15 — "the
  sole clean in-repo overfit-delete, DP-A option A … cell/stack/badge SHARED-KEEP"). (The
  metric-family four-dir→one consolidation under REGISTRY G-4 / RM-2 is a *different* question —
  Row 12's dir-merge subject, not this inversion.)
- **Recommendation:** **Stands-confirmation only** — the pill is already deleted, the badge is a
  shared keep; confirm the inversion is as intended. If you overrule DP-A, the addenda drops AD4 and
  the costed break (speedtest becomes a UI lib) rides a later ruling.
- **Unblocks:** ratifies the metric family's terminal shape. Tag-coupled: this locks in an
  already-shipped deletion — silence ratifies, and the window closes with the tag.

### 10. Row 6 — ratify the eyeglass pill sizing-axis supersession?

Ratify the P092/Q020 clean break that removed the former eyeglass proud/settled two-rest-state
sizing axis (the shipped pill keeps one measured `.glass-lens` fill)?

- **Evidence:** P092/Q020 source + focused tests; DISPOSITIONS.md:72 (SUPERSEDED); the one-fill
  native matrix is PENDING-HEAL at Q003.
- **Recommendation:** **Ratify as MOOT/SUPERSEDED.** Reopening a default would revive removed
  behavior and contradict Q020's reduced one-fill contract. (This was formerly "judgment-e"; it is
  now a ratify, not a sizing choice.)
- **Unblocks:** confirms Q020's eyeglass retirement is terminal. Tag-coupled: this ratifies an
  already-shipped deletion — silence ratifies, and the window closes with the tag.

---

## Scope / cohesion calls (no forced default — a look, not urgent)

### 11. Row 11 — split the aurora-medium bundle for lazy loading?

- **Evidence:** `reports/ledger-verify.md` §D §6.3 (open-Q, orphaned-at-cut).
- **Recommendation:** **No default** — a bundle-shape trade-off (load cost vs first-paint), worth
  a look but not urgent.
- **Unblocks:** the aurora-medium bundle shape (only if you want it split).

### 12. Row 12 — the intended scope of the metrics sextet?

- **Evidence:** `reports/ledger-verify.md` §6.5; REGISTRY G-4. Note G-4 already aligns the
  in-flight P117 consolidation (four sibling metric dirs → one); this row is the remaining **scope**
  question, not the dir merge.
- **Recommendation:** **No default** — a scope call the code does not force.
- **Unblocks:** the metric family's intended breadth.

### 13. Row 13 — fold hover and popover into one Kronecker primitive?

- **Evidence:** `reports/ledger-verify.md` §6.6.
- **Recommendation:** **No default** — a cohesion call the code does not force.
- **Unblocks:** whether hover/popover become one primitive.

---

## Paint-taste calls (need a Q003 capture before you decide)

These three cannot be answered from source alone — they are aesthetic A/Bs that need the paint
batch (Q003) to render the pair first. Listed so nothing user-gated leaves the roster silently;
they will return with captures attached.

### 14. Row 3 — judgment-b: is the pager dot→dot goo-worm morph the aesthetic you want?

- **Evidence:** capture pair PENDING-HEAL (Q003 judgment-b).
- **Recommendation:** no recommendation without paint; the worm is the liquid-weight signature the
  media order calls for, but the aesthetic is a taste call.
- **Unblocks:** the pager dot-worm aesthetic lock — one of the Q003 paint-batch judgment calls that
  must settle before the Q003 paint lane can close.

### 15. Row 5 — judgment-d: which blur-mute cohort for pressable buttons?

- **Evidence:** cohort pairs PENDING-HEAL (Q003 judgment-d).
- **Recommendation:** no recommendation without paint; the cohorts differ only in a register the
  eye must judge.
- **Unblocks:** the pressable-button blur-mute cohort lock (Q003 judgment-d).

### 16. Row 7 — judgment-f: which cartoon-weight for the hero?

- **Evidence:** A/B capture PENDING-HEAL (Q003 judgment-f).
- **Recommendation:** no recommendation without paint; an A/B the eye must settle.
- **Unblocks:** the hero cartoon-weight lock (Q003 judgment-f).

---

## Closed (recorded, no decision needed)

### Row 17 — version re-baseline (Q080) — CLOSED

RETRACTED-BY-USER 2026-07-16 ~04:20; you ruled versioning is fine and the coordination HOLD was
lifted within the minute (DISPOSITIONS.md §6). Recorded here so nothing user-gated leaves the
roster silently.
