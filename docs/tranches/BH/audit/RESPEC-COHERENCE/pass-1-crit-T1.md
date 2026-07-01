# PASS 1 · Adversarial Critique — T1 (kf-peer floor-vs-API gate clause + BH-B2.1-swap bump amendment)

**Role:** ADVERSARIAL CRITIQUE, PASS 1. **HEAD:** f7dd6146. **Siblings:** intact (exit 0, before/after).

**Bottom line:** The resolver's TECHNICAL feasibility is REAL, non-vacuous, and independently reproduced. The C1 live defect is on disk exactly as claimed. BUT the resolver's OWNERSHIP recommendation partly re-opens the two-owner crack BG's MR-4 explicitly closed, and — most damning for a coherence pass — **the resolver's own claimed artifact does not exist on disk**, plus **the designated owner-wave (BG.W-GATE-FIELD-AURORA) does not itself carry the clause in its EXECUTION-PROGRESS row**, so the "both sides agree" bar is NOT met even after the resolver's proposed BH-side amendment. Convergence is real on the mechanics but incomplete on the coherence coupling the issue is *about*.

---

## What VERIFIED clean (the resolver is right)

1. **C1 live defect on disk, re-confirmed independently.** `package.json:1080` peer `@mkbabb/keyframes.js: "^5.0.0"`; `:1116` devDep `^5.1.0`; `useDragMorph.ts:325` passes `snap: targetsOf().map((t) => t.center)` to `new Draggable({…})`. The kf `DragOptions.snap?: number[]` API is present in the installed 5.1.0 dist (`keyframes.d.ts:1129`). A `5.0.x` consumer gets NO `snap` → the drag never snaps to a detent (CLASS-L binding no-op one rung up). ✓

2. **The existing gate is GREEN over the broken floor — reproduced.** `node scripts/proof-peer-conformance.mjs` → `@mkbabb/keyframes.js ^5.0.0 admits latest 5.1.0? YES`, status PASS, exit 0. The gate checks `satisfies(latest, range)`, never `floor ≥ API-version`. No device-free gate at HEAD catches the consumer break; devDep `^5.1.0` masks it in the cut env. ✓

3. **Born-RED → GREEN mechanics reproduced (scratchpad, no gate edit).** With `usesSnap=true` and floor `5.0.0 < 5.1.0` → `BELOW-FLOOR violation: true`. After a `^5.1.0` bump → `violation: false`. ✓

4. **The 4 load-bearing self-test bites behave as claimed.** kf-drag+`snap:`+below-floor MUST flag (does); kf-drag+`onSnap:`/`snapTargets:` only must NOT (doesn't); `snap:` without kf import must NOT (doesn't); at-floor `^5.1.0` must NOT (doesn't). The lookbehind guard `(?<![A-Za-z])snap\s*:` correctly excludes the commit-side identifiers the excised interim still leaves in comments. ✓

5. **Proto is feasibility-only, not merged.** `git diff --stat scripts/proof-peer-conformance.mjs` empty at HEAD (240-line unmodified gate). No src/gate change survives. ✓ (This is correct behaviour for a feasibility spike — recorded, not a defect.)

6. **Stale-base trap is REAL and the resolver's step-0 reset was necessary.** Worktree base `998136bb` is PRE-excise (`ba23c086` not an ancestor) — a build agent seeding there finds NO `snap:` and the clause greens VACUOUSLY. HEAD f7dd6146 is post-excise (`ba23c086` IS an ancestor). ✓

7. **No-regression on the value arms.** The proto's kf-arm is additive; the value.js singleton/destraddle/self-test arms are untouched and stay GREEN. ✓

---

## OPENS the resolver's proto glossed (the adversarial findings)

### O1 — [BLOCKING for a coherence pass] The resolver's claimed artifact does NOT exist on disk.
The resolver's `artifactPath` = `.../pass-1-proto-t1-kf-peer-floor-gate.md` and its final finding names it as the deliverable. **That file is absent.** The only proto artifacts present are `pass-1-proto-T2.md` (C2 consumer-ask) and `pass-1-proto-T3.md` (`proof:claude-deletable`) — neither is T1. A feasibility verdict whose evidence artifact was never persisted is unauditable by the next pass; the mechanics happen to reproduce (I re-ran them), but the resolver's process left no on-disk trace of the +137-line spike, the 7-bite run, or the apply-then-revert byte-identical proof it cites. **This must be re-produced (the artifact written) before the verdict is bankable.**

### O2 — [HIGH] The ownership recommendation partly re-opens the crack BG MR-4 closed.
The resolver recommends "homing the clause on `proof:peer-conformance` (its natural home) with BG.W-GATE-FIELD-AURORA as a doc pointer" and says "BH-B2.1-swap must echo BOTH the bump AND the gate." This conflates two settled BG decisions and softens one:
- **BG AMENDED-COHERENCE-PLAN.md:146 (MR-4)** is explicit: *"pick ONE owner (not the disjunction). FOLD: `BG.W-GATE-FIELD-AURORA` owns the floor-vs-API clause … closes the two-owner crack."* The FILE is `proof:peer-conformance` (agrees with the resolver), but the OWNER WAVE is BG.W-GATE-FIELD-AURORA (a BG WS7 wave), NOT a BH wave. `bg-build-map.md:1192`: *"gate-hardening lands on proof:peer-conformance VIA BG.W-GATE-FIELD-AURORA (the single owner)."*
- The resolver's "BH-B2.1-swap must echo BOTH the bump AND the gate" reads as though BH co-owns the gate clause. The correct split (both prior-pass research lenses agree): **BH-B2.1-swap owns the BUMP (a package.json edit); BG.W-GATE-FIELD-AURORA owns the CLAUSE (the gate edit).** BH's plan should NAME the clause as a cross-owned obligation (so a resumed BH exec knows the bump alone reds `proof:peer-conformance` forever until BG's clause lands its at-floor exemption) — but it must NOT re-home the clause onto a BH wave. The resolver's phrasing risks the exact re-fork MR-4 forbade.

### O3 — [HIGH] "Both sides agree" is STILL not met even after the resolver's BH-side amendment — the OWNER wave's row is also silent.
The issue is a ONE-SIDED FOLD (BG points at BH-B2.1-swap; BH's PLAN.md:68 + bh-interleave-map.md:40 don't reciprocate — both VERIFIED silent). The resolver's fix amends the BH side. But I find a THIRD silent side: **BG.W-GATE-FIELD-AURORA's own EXECUTION-PROGRESS row 12.5 does NOT list the kf floor-vs-API clause** among its deliverables. Row 12.5 carries `proof:field-aurora-aa` + the value.js `^1.2.0→^1.1.1` reconcile — but NOT the kf clause. So even the designated single owner doesn't carry it in its build row. A complete coherence fix must amend THREE sides: BH PLAN.md:68, bh-interleave-map.md:40 (the bump obligation on both), AND EXECUTION-PROGRESS row 12.5 / the build-map's 12.5 deliverable list (the clause obligation on the owner). The resolver names only the first two.

### O4 — [MED] Ordering hazard the amendment must state: bump-without-clause reds the release gate.
BH-B2.1-swap is `[WS12]`; BG.W-GATE-FIELD-AURORA is `[WS7]` — WS7 sequences BEFORE WS12, so the CLAUSE (born-RED at HEAD) lands FIRST, on the still-`^5.0.0` tree, and reds `proof:peer-conformance` (`ci`+`release`) from WS7 until BH-B2.1-swap's bump lands at WS12. That's the intended born-RED→GREEN arc, but it means **the tree carries a RED release-tagged gate across the whole WS7→WS12 window.** The amendment must state this is expected (the clause is born-RED by design, GREEN only at the paired bump) so a mid-window `--run release` isn't mistaken for a regression, AND so the joint 5.0.0 cut is gated on BOTH having landed. The resolver's "the clause reds-forever without the bump; the bump ships silently without the clause" captures the pair but does not surface the WS7→WS12 red-window ordering.

### O5 — [MED, adjacency] The BH plan's value peer target is itself stale/wrong — a friction-class-repeat signal.
BH PLAN.md:62 (W2-value-destraddle) still specs the value peer → `^1.2.0`. The LANDED state is `^1.0.0` (package.json:1080, verified) and BG G6 (row 12.5) explicitly says the correct floor is `^1.1.1` (`^1.2.0` EXCLUDES npm-latest 1.1.1 and would RED the gate). The gate's own `PINNED_LATEST.value = "1.2.0"` + `PINNED_KEYFRAMES_VALUE_DEP = "^1.2.0"` are likewise stale vs registry-latest 1.1.1 (npm view confirmed). This is NOT T1 (T1 is kf-floor only) but it is the SAME under-reconciled kf/value peer section — and it means BG.W-GATE-FIELD-AURORA already has a mandate to EDIT `proof-peer-conformance.mjs` (the `1.2.0→1.1.1` offline-mirror fix, pass-2-proto-PT-6.md:161). That STRENGTHENS MR-4's single-owner choice (BG.W-GATE-FIELD-AURORA already touches this exact file) and further weakens the resolver's "BH homes it, BG is a doc pointer" framing. Record: the kf clause + the value pin reconcile are the SAME wave's edit to the SAME file — do not split them across tranches.

### O6 — [LOW] Latent detector fragility to record (not a blocker).
HEAD `useDragMorph.ts` still carries `decayRest` / `spring.target` in COMMENTS (lines 21, 26, 298) describing the kf engine's internal behaviour. The resolver's `snap:`-keyed detector correctly ignores them (verified — it keys on `snap:` + kf import, not those identifiers). But a future detector "simplification" that scanned for `spring.target`/`decayRest` would false-fire on the comments. The clause spec should pin the `snap:`-property + kf-import discriminant as load-bearing (with the comment-mention non-fire as an explicit bite), so a later re-roll doesn't reintroduce a comment-blind scan.

---

## Friction-class-repeat verdict
The FIX (as the resolver frames it) partially REPEATS the friction it targets: the issue IS a one-sided fold (CLASS L/S), and the resolver's amendment closes ONE of the three silent sides (BH PLAN.md) while (a) leaving bh-interleave-map.md and EXECUTION-PROGRESS row 12.5 in scope-but-unnamed, and (b) softening the MR-4 single-owner into a "BH echoes the gate" phrasing that re-admits the two-owner ambiguity. A correct amendment must (1) put the BUMP on BH-B2.1-swap (PLAN.md:68 + bh-interleave-map.md:40), (2) confirm the CLAUSE stays on BG.W-GATE-FIELD-AURORA and ADD it to that wave's row 12.5 deliverable list, (3) state the WS7→WS12 born-RED red-window as expected, (4) reconcile BH PLAN.md:62's stale `^1.2.0` value target to the landed `^1.0.0` / BG-`^1.1.1` in the same pass (the kf and value peer edits are one file, one owner).

---

## Verdict
- **Technical feasibility:** CONFIRMED (independently reproduced; C1 real; born-RED→GREEN + 4 bites reproduced; no value-arm regression).
- **Coherence fix completeness:** INCOMPLETE. Three-sided disagreement (BH PLAN.md + bh-interleave-map.md + BG row 12.5); the resolver names two of three and only the bump-side. The ownership recommendation must be re-worded to preserve MR-4 (clause = BG.W-GATE-FIELD-AURORA; bump = BH-B2.1-swap), not "BH echoes the gate."
- **Process:** the claimed proto artifact is absent from disk — re-produce before banking the verdict.
