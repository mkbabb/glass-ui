# CHALLENGE-REOPEN-2 — the cross-repo absorption (iter-23) convergence

> The AX hand-off packet mandated: *"Create CHALLENGE-REOPEN-2.md; run to 2-consecutive-clean."*
> Scope: the three cross-repo packets absorbed at iter-23 (speedtest-AX Band-15 · keyframes.js-M ·
> fourier-analysis-M Band-16) + the §6 out-of-scope fold + the rate-limited feature-band re-index.
> 85→96 waves. Convergence bar: TWO consecutive challenge passes with zero BLOCKER/MAJOR.

## Pass 1 (embedded in `bc-absorb-crossrepo` Phase 3, 3 opus dims) — 2 MAJOR → FIXED

| dim | verdict | BLK+MAJ |
|---|---|---|
| cross-repo-coverage | PASS | 1 MAJOR |
| cross-artifact | PASS_WITH_MAJOR | 1 MAJOR |
| abstraction+featureband | PASS | 0 |

- **MAJOR-1 (cross-repo-coverage)** — `inbound/KF-INBOUND.md` named `BC.W-SPINE-LATEST` (a *BB* wave) as the peer-BLOCKER owner; the BLOCKER itself was correctly covered in the authored `coordination/KF-BC.md` (owner = the standing `proof:peer-conformance`/`proof:constellation-spine` gate, re-verified at `BC.W-CUT`'s pre-tag battery). **FIX:** corrected the three stale pointers in KF-INBOUND.md (lines 12/23/28) to the real gate owner. Verified: the only surviving `BC.W-SPINE-LATEST` mention is the corrected negation.
- **MAJOR-2 (cross-artifact)** — `BC.W-DEMO-COPY-PRUNE` (Band 5, on disk + in WAVE-INDEX) lacked an ORCHESTRATION §1 checkbox (95 boxes, not 96). **FIX:** added `- [x] BC.W-DEMO-COPY-PRUNE` beside its `PAGE-PRUNE` sibling. Verified: 96 boxes = 96 wave files.
- **Dangling-scare cleared** — a naive scan flagged 21 `BC.W-*` ids "in index, not on disk"; all 21 confirmed to be the WAVE-INDEX **name-drift map** aliases (LHS working-names → RHS canonical waves that resolve on disk) + their prose references. The roster is sound (96 rows, all on disk); the Index agent's `dangling: []` was correct.

Committed `e63057db`.

## Pass 2 + Pass 3 (diverse adversarial lenses) — pending `bc-challenge-reopen2`

Pass 2 lenses: cross-repo-coverage-RECHECK · cross-artifact-RECHECK · holistic-interaction (new waves vs existing bands).
Pass 3 lenses: adversarial-completeness (what's MISSING) · gate-coherence · precept-conformance.

### Pass 2 (`bc-challenge-reopen2` Phase Pass2) — 3 MAJOR

| dim | verdict | MAJ | MIN |
|---|---|---|---|
| coverage-recheck | PASS_WITH_MINOR | 0 | 2 |
| artifact-recheck | MAJOR | 1 | 0 |
| holistic-interaction | PASS_WITH_MAJOR | 2 | 0 |

- **M-2A (artifact)** — EXECUTION-DAG §2/§4 list only **95** of 96 waves; `BC.W-DEMO-COPY-PRUNE` is a §0 prose mention only, never a tier/dep node, while the DAG self-attests a "96-wave linearization." (The ORCHESTRATION box-fix held; the DAG is the un-patched twin.)
- **M-2B (holistic)** — `BC.W-AX-DOCK-CTA-SEAT:43` + `BC.W-AX-COMPLETION-SEAL:50` carry the BB-disease *"rides the W-REFLECT3-class close"* terminal-reflect paint-deferral that `BC.W-GESTALT-FIRST` G8 makes structurally forbidden — the 2 new waves leaked the disease phrasing the other 94 don't use.
- **M-2C (holistic)** — `BC.W-AX-DOCK-CTA-SEAT` routes its paint verdict to `BC.W-VISUAL-RECONCILE`, but VISUAL-RECONCILE's six re-walk units don't enroll the CTA-seat/dockmorph — the wave must own its OWN gestalt verdict (per the GESTALT-FIRST per-wave law).
- MINORs: KF-INBOUND `BC.W-CONTROL-TOKENS`→`BB.`, `BC.W-EASING-PRIMITIVE` is the BB component not a BC wave (route picker-loop→`BC.W-TUNABLE-ANIM`); FOURIER-BC `BC.W-AUDIT`×3 → "iteration-0 audit commit".

### Pass 3 (`bc-challenge-reopen2` Phase Pass3) — 2 MAJOR

| dim | verdict | MAJ | MIN |
|---|---|---|---|
| adversarial-completeness | PASS_WITH_GAPS | 1 | 0 |
| gate-coherence | PASS | 0 | 2 |
| precept-conformance | PASS_WITH_MAJOR | 1 | 2 |

- **M-3A (completeness)** — FOURIER-BC §4 lists `W-PAPER-GRID-TEXTURE` as a token/class consume-contract "confirmed shipping at 4.1.0," but FOURIER-INBOUND never asks for it and the register is being reshaped by GRID-SIMPLE/VIZ-PAPERGRID — internally contradictory; restate as the VISUAL (page-background craft) dependency it is.
- **M-3B (precept)** — `BC.W-ACCENT-TONE` `--viz-amber` #13 fold cites `dark-arm.css:110` as the rebaseline target, but at HEAD that line is `--section-color-5`; light `--viz-amber` is an alias of `--section-color-5` — re-ground the fold against the live single-source amber.
- MINORs: ACCENT-TONE A3 "6×" prose-vs-live count; AX-METAL-GLOW ≥2-consumer bar not gate-locked (asymmetric with the seal); ACCENT-TONE `<SelectableChip>` `/selectable-chip` barrel claim; AX-COMPLETION-SEAL `@property --seal-ink` needs a concrete gold `initial-value`.

**Verdict: NOT 2-consecutive-clean (bm2=3, bm3=2). All gaps are doc-accuracy/grounding (zero design defects). HARDEN `bc-harden-reopen2` → re-challenge.**

## HARDEN-1 (`bc-harden-reopen2`, 3 opus, disjoint file-sets) — 5 MAJOR + 6 MINOR fixed

All 5 MAJOR + MINORs fixed + grounded against live source (commit `1a991285`): DAG DEMO-COPY-PRUNE node (96 in topo); the W-REFLECT3-deferral disease-leak purged from AX-DOCK-CTA-SEAT/COMPLETION-SEAL + the G8a detector widened article-tolerant + a self-test; CTA-SEAT owns its own ba-gestalt verdict; FOURIER-BC paper-grid restated VISUAL-not-API; ACCENT-TONE `--viz-amber` re-grounded to the `--section-color-5` single-source (3 arms); METAL-GLOW gate-locks its 2-consumer bar; KF-INBOUND BB-prefix/EasingPicker/TUNABLE-ANIM corrections; `@property --seal-ink` concrete gold initial-value.

## Re-challenge (post-HARDEN-1, `bc-challenge-reopen2` re-fire) — 1 MAJOR → FIXED; Pass-3 fully clean

| pass | dim | verdict | MAJ | MIN |
|---|---|---|---|---|
| P2 | coverage-recheck | PASS_WITH_MAJOR | 1 | 1 |
| P2 | artifact-recheck | CONVERGED | 0 | 1 |
| P2 | holistic-interaction | PASS | 0 | 2 |
| P3 | adversarial-completeness | PASS | 0 | 2 |
| P3 | gate-coherence | PASS | 0 | 1 |
| P3 | precept-conformance | PASS | 0 | 1 |

- **M-R1 (coverage)** — the two §6-out-of-scope folds (`avoidHues`→VIZ-AURORA, `data-protagonist`→CONTROL-CUSTOM) cited `SPEEDTEST-BC.md` as their consume-and-delete home, but that ledger had no rows for them — a broken coordination-link (a speedtest reader following the citation hits a void). **FIX:** added rows §6b/§6c + 2 dest-soundness entries to SPEEDTEST-BC.md. (All 5 prior MAJORs verified HELD; Pass-3 fully clean.)
- MINORs fixed: GESTALT-FIRST convergence-proof corpus `70-wave`→`96-wave` (the gate scans the full glob); FINAL.md superseded-milestone banner (the tranche reopened 4× to 96); ACCENT-TONE `--surface` grounding note (optional consumer-retarget hook, defaults `--card`). Residual cosmetic MINORs (SPLIT-CHARS publish-choice, metal-glow evidence wording, register-vs-component bar phrasing) do not count toward the BLOCKER+MAJOR convergence bar; left as polish.

**Verdict: bm2=1 (fixed), bm3=0. Gap surface 5 MAJOR → 1 MAJOR (Pass-3 clean) — converging. Commit + re-fire the confirmation 2-pass for 2-consecutive-clean.**

