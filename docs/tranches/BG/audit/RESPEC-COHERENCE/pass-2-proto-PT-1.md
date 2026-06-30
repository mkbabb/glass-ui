# PT-1 · [spec] DAG re-anchor + paint-decouple deadlock fix

**Prototype agent (spec) · PASS 1 · coherence cluster §2.D1 + §2.D2 + §2.D3 (HIGH, LIVE-BLOCKING) · convergence gap G-1 keystone**
HEAD `6c1f5386` · siblings-intact exit 0 · scope READ-MOSTLY (this file only; the edits below are SPEC, applied by PASS-2 develop)
feasible: **YES** — all three are bounded doc + pure-control-flow edits with deterministic verifying checks; no design unknown, no carve re-design (the carve is already mechanical; only its line-targets are re-measured against the live tree).

> NOTE: this file supersedes a stale prior `pass-1-proto-PT-1.md` (authored at the old baseline `4c761b64`) that carried PT-2's "W-REFLECT3 re-home" content (§2.G1). Per `pass-1-spec.md §4`, PT-1 = the DAG-reanchor/deadlock spec (§2.D1/D2/D3); §2.G1 is PT-2.

---

## 0. The defect in one paragraph

G4 `BG.W-CLOSEFIX-9SITE` is declared LANDS-FIRST but the machinery can't make it so: its build-order `seq` is `12.0` (the highest band), its only `precond` is STAGE-0, NO ladder/shell-touching wave names it as a precond, and the `bg-bh-execute.wf.js` DAG is LLM-re-derived from prose each boot with ZERO static edges — so `composeBatch`'s seq-sort always picks the `2.x`/`3.x` waves before G4, and it lands LAST. It is **already violated on disk** (ladder.css=527, shell.css=510, zero G4 commits, while WS1 fully landed + 3.1/3.6/3.7 of WS3 landed). Separately, the `--dock-surface-blur` deliverable the G4 spec calls its own was already shipped by WS3 3.6 (shell.css:29), staling G4's "9-site / byte-identical-to-4.2.0-HEAD" spec. And the build frontier is **deadlocked right now**: the DAG-loader prose says a PAINT-PENDING [P] wave is "DONE-building, MUST NOT re-enter the frontier", but `ready`/`allDone`/`cutReady` all test literal `=== 'DONE'`, so any wave whose precond is a PAINT-PENDING [P] wave never becomes ready, the build loop composes an empty batch and human-gate-breaks, and `cutReady` can never fire (the out-of-band `bg-paint.wf.js` owns the [P]→DONE flip but the build engine never triggers it).

## 1. Ground-truth re-verified directly @ 6c1f5386 (not trusted from prose)

| claim | on-disk verification |
|---|---|
| ladder.css/shell.css >500, carve never ran | `wc -l` = **527** / **510**; `src/styles/glass/grain-overlay.css` + `src/styles/dock/shell-regions.css` (G4's carve leaves) **absent** |
| G4 has zero commits | `git log --oneline \| grep -iF CLOSEFIX-9SITE` → empty; EXECUTION-PROGRESS 12.0 status **PENDING** |
| WS3 3.6 pre-shipped G4's dock-blur deliverable | shell.css:29 `--dock-surface-blur: var(--glass-blur-resting);` consumed at :159; row 3.6 status **PAINT-PENDING (cd9ce46)** |
| `--glass-blur-dock` chain is a 0-paint-reader orphan | the only `var(--glass-blur-dock…)` reads are the chain's OWN declarations (glass.css:103/166, dark-arm.css:286, bridges.css:334) — no consumer surface reads it; shell.css:26 names it in a comment only |
| the retirement is already dist-neutral | `grep -c glass-blur-dock dist/glass-ui.css` = **0** — the build pipeline already drops the unused custom props; retiring the source declarations keeps dist at 0→0 (PROVIDED "HEAD" = G4-run-time, not 4.2.0) |
| seq is the file-disjoint pick order | `composeBatch` (wf.js:105-118) sorts `readyNow` by `seq` asc, picks lowest-first; G4 seq 12.0 loses every race to 2.x/3.x |
| no static DAG edges; loader is an LLM | wf.js encodes zero edges; the loader agent (wf.js:134-138) derives `seq`+`preconds` from the maps each boot |
| the EXECUTION-ORDER NOTE is FALSE | EXECUTION-PROGRESS.md:220 "The DAG (in bg-bh-execute.wf.js) encodes it as a predecessor of WS1" — there is no such encoding |
| the `=== 'DONE'` deadlock is live | `allDone` (wf.js:87), `ready` precond check (wf.js:100), `cutReady` (wf.js:243) all test `=== 'DONE'`; loader prose (wf.js:136) says PAINT-PENDING is done-building; 3.1+3.6 are PAINT-PENDING now |

**Re-framing the dependency the "lands first" prose got backwards.** 3.6 is not G4's *victim* (§2.D2 framed it as a pre-emption); 3.6 is G4's *prerequisite*. Before 3.6 the dock read `--glass-blur-dock`; 3.6 re-pointed it to `--dock-surface-blur: var(--glass-blur-resting)`, which is exactly what ORPHANS the chain G4 retires. So G4's RETIREMENT arm must land **after** 3.6 (already DONE), and its CARVE arm must land **before** the remaining ladder/shell consumers (3.5/WS6/WS9, all PENDING). Both are satisfiable NOW, at HEAD — but only once the seq + precond edges encode it.

---

## 2. The corrected approach

Three coordinated parts. Part A (§2.D3) un-deadlocks the frontier and is the prerequisite for everything (without it, G4 — being a precond of [P] waves' downstreams — still can't release a deadlocked frontier). Part B (§2.D1) re-anchors G4's position. Part C (§2.D2) re-derives G4's spec against the live frontier.

### PART A — §2.D3: PAINT-PENDING is DONE-for-build-ordering; CUT is two-gated

**Decision (does NOT pre-empt PT-2's decoupled-vs-recoupled adjudication):** keep paint decoupled. Make the BUILD engine treat a committed [paint-pending] wave as *done for build-ordering* (it satisfies downstream preconds and the interleave gate), and split the terminal signal into **build-complete** (this engine's job) vs **cut-ready** (build-complete ∧ paint-complete, where `bg-paint.wf.js` owns the paint half and communicates it back through the cursor).

**File: `docs/tranches/BG/execution/bg-bh-execute.wf.js`** — five edits, all pure control-flow.

**A1 — add the `doneBuilding` helper** (after `byId`, wf.js:86):
```js
// a committed [paint-pending] [P] wave is DONE-for-build-ordering (paint is decoupled to bg-paint.wf.js,
// which flips PAINT-PENDING→DONE in the cursor out of band). It satisfies downstream preconds + interleave.
const doneBuilding = (w) => !!w && (w.status === 'DONE' || w.status === 'PAINT-PENDING')
```

**A2 — `allDone` uses `doneBuilding`** (wf.js:87) — the BH interleave gate releases on build-completion of the BG WSn, not on its paint:
```js
// OLD: const allDone = (waves, ws) => waves.filter(w => w.tranche === 'BG' && w.ws === ws).every(w => w.status === 'DONE')
const allDone = (waves, ws) => waves.filter(w => w.tranche === 'BG' && w.ws === ws).every(doneBuilding)
```

**A3 — `ready` precond check uses `doneBuilding`** (wf.js:100) — a wave whose precond is a [P] PAINT-PENDING wave becomes ready (`map[p]` may be undefined for a phantom precond; `doneBuilding(undefined)===false` preserves the existing guard):
```js
// OLD: if (!w.preconds.every(p => map[p] && map[p].status === 'DONE')) return false
if (!w.preconds.every(p => doneBuilding(map[p]))) return false
```
(wf.js:99 `if (w.status !== 'PENDING') return false` is UNCHANGED — a PAINT-PENDING wave still does not itself re-enter the frontier, matching the loader prose.)

**A4 — `pendingLeft` excludes PAINT-PENDING** (wf.js:153) — so the loop reaches a clean terminal break when every wave is DONE∨PAINT-PENDING (build-complete) instead of spinning to the empty-batch human-gate at wf.js:159:
```js
// OLD: const pendingLeft = waves.some(w => ['PENDING', 'PAINT-PENDING', 'FAIL'].includes(w.status))
const pendingLeft = waves.some(w => ['PENDING', 'FAIL'].includes(w.status))
```
and the terminal log (wf.js:154) becomes `'Build frontier complete (all waves DONE or PAINT-PENDING) — run bg-paint.wf.js for the [P] verdicts, then the cut.'`

**A5 — split `cutReady` into build-complete ∧ paint-complete** (wf.js:241-247). The CUT must still demand painted truth (the §1 verification∧release coupling at the cut is non-negotiable), but the build engine reaches its terminal at build-complete; the paint half is read back from the cursor (flipped by `bg-paint.wf.js`):
```js
const done = waves.filter(w => w.status === 'DONE').length
const blocked = waves.filter(w => w.status === 'BLOCKED').map(w => w.id)
const buildComplete = waves.filter(w => w.tranche === 'BG').every(doneBuilding)
  && waves.filter(w => w.interleaveClass === 'WS12-LAST').every(doneBuilding)
const paintPending = waves.filter(w => w.status === 'PAINT-PENDING').map(w => w.id)
const paintComplete = waves.filter(w => w.paintClass === 'P').every(w => w.status === 'DONE')
const cutReady = buildComplete && paintComplete   // the painted-truth bar — unchanged intent, honest signal

log(cutReady
  ? 'ALL waves DONE (built + painted). Run the joint 5.0.0 close-battery (--run full siblings-absent, in-repo /tmp worktree) per publish-and-cut.md, then HALT — the tag-push is USER-GATED. Do NOT git push --tags.'
  : buildComplete
    ? `Build frontier complete. ${paintPending.length} [P] waves PAINT-PENDING — run \`bg-paint.wf.js\` (dual-engine/C-SAFARI) to flip them DONE in the cursor, THEN resume bg-bh-execute for the cut. PAINT-PENDING: ${paintPending.join(', ')}`
    : `Frontier halted: ${done}/${waves.length} DONE${blocked.length ? ' · BLOCKED: ' + blocked.join(', ') : ''}. Resume via resumeFromRunId after clearing the blockers.`)
```

**Why this is the right shape, not a re-couple.** `bg-paint.wf.js` (verified) reads the live PAINT-PENDING set from the cursor and on PASS flips the row PAINT-PENDING→DONE + commits — the two workflows already communicate through `EXECUTION-PROGRESS.md`. So the cut is naturally two-phase: (1) `bg-bh-execute` runs to build-complete; (2) `bg-paint` flips every [P]→DONE in the cursor; (3) a final `bg-bh-execute` resume hydrates the now-all-DONE cursor → `cutReady` true → the user-gated close-battery. No interleaved heavy capture in the build loop (build cycles stay fast), no premature cut. PT-2 separately adjudicates whether the decouple should become a re-couple; this part makes the *current* decoupled model correct either way.

### PART B — §2.D1: re-anchor G4 (seq + precond edges, both source docs + the loader prompt)

The DAG is derived from three sources each boot (the maps + the cursor) by an LLM. Fix all three so any derivation produces the right edges, then harden the loader prompt so it can't drift.

**B1 — `docs/tranches/BG/execution/EXECUTION-PROGRESS.md`:**
- **Re-number G4's `seq` cell** `12.0` → **`0.7`** on the `BG.W-CLOSEFIX-9SITE` row (currently EXECUTION-PROGRESS.md:226). `0.7` sits between STAGE-0 (`0.x`) and WS1 (`2.x`) so `composeBatch`'s seq-sort picks it first among the ready set. Physically relocate the row into the PHASE-0 region (after the `0.6` row) so the loader's "build-order ordinal" derivation reads it as early; leave a one-line back-pointer in the PHASE-12 close-machine table (`> 0.7 BG.W-CLOSEFIX-9SITE — re-homed to PHASE-0 (lands after 3.6 orphans the blur chain, before the remaining ladder/shell consumers); see PHASE-0`).
- **Correct the FALSE EXECUTION-ORDER NOTE** (EXECUTION-PROGRESS.md:218-222). Replace "The DAG (in bg-bh-execute.wf.js) encodes it as a predecessor of WS1; it is homed here in its WS7 phase for organizational clarity." with the real edges:
  > `BG.W-CLOSEFIX-9SITE` (seq 0.7) preconds = STAGE-0 **and `BG.W-GLASS-BLUR-PEER` (3.6)** — 3.6's `--dock-surface-blur` re-point ORPHANS the `--glass-blur-dock` chain G4 retires, so G4 lands AFTER 3.6 (DONE) and BEFORE the remaining ladder/shell consumers. G4 is an explicit precond of `BG.W-GLASS-TINT-UNIFY` (3.5, ladder.css), `BG.W-GLASS-SUFFUSE-UNIVERSAL` (WS6, dock/shell.css), and `BG.W-PAPER-GRAIN-REAL` (WS9, ladder.css + dock/shell.css) — the carve precedes every re-grow of the carved leaves. (3.6 landed pre-carve and is accepted as absorbed; §2.D2.)
- **Add the precond on the three consumer rows' notes** (so the loader reads it from each row, not only from the note block): append `· precond BG.W-CLOSEFIX-9SITE (carved leaves)` to the gate/note cell of the 3.5, WS6 SUFFUSE-UNIVERSAL, and WS9 PAPER-GRAIN-REAL rows.

**B2 — `docs/tranches/BG/execution/bg-build-map.md`:**
- G4's `*Precond:*` (bg-build-map.md:470) `STAGE-0 ground-freeze.` → **`STAGE-0 ground-freeze AND BG.W-GLASS-BLUR-PEER (3.6 — its --dock-surface-blur re-point orphans the --glass-blur-dock chain this wave retires).`**
- Add to the 3.5 `BG.W-GLASS-TINT-UNIFY` precond (bg-build-map.md:184), the WS6 `BG.W-GLASS-SUFFUSE-UNIVERSAL` (bg-build-map.md:612-617), and the WS9 `BG.W-PAPER-GRAIN-REAL` precond (bg-build-map.md:701): `AND BG.W-CLOSEFIX-9SITE (builds on the carved ladder.css/shell.css leaves)`.
- Reconcile the "LANDS FIRST, before WS1" headers (bg-build-map.md:13, 137-138, 442, 902, 920, 979) to **"LANDS EARLY — after 3.6 orphans the blur chain, before 3.5/WS6/WS9 re-grow the carved leaves"** (the carve still precedes its consumers; only the over-broad "before WS1" claim is corrected — WS1 is file-disjoint from ladder/shell and already landed).

**B3 — `docs/tranches/BG/execution/bg-bh-execute.wf.js` loader prompt** (wf.js:136, the precond-encoding clause). The prompt already lists explicit BH intra-WS12 edges; add the BG carve edges so the loader can't drop them:
> "…for BH encode the named intra-WS12 edges … **AND for BG encode the carve edge: `BG.W-CLOSEFIX-9SITE` is seq 0.7, preconds [STAGE-0, BG.W-GLASS-BLUR-PEER], and is itself a precond of `BG.W-GLASS-TINT-UNIFY`, `BG.W-GLASS-SUFFUSE-UNIVERSAL`, and `BG.W-PAPER-GRAIN-REAL` (the carve precedes every ladder.css/shell.css re-grow)** …"

**Why both seq AND precond edges (belt-and-suspenders).** `composeBatch` is file-disjoint, so G4 (ladder/shell) and a file-disjoint WS wave can land in the SAME sweep; the precond edges are what guarantee 3.5/WS6/WS9 WAIT for G4 even if the seq sort ever reorders or a new consumer lands. The seq alone only controls *pick-priority within a batch slot*, not *exclusion*. Together they are robust to LLM-derivation drift.

### PART C — §2.D2: re-derive G4's spec against the live frontier

G4's mechanism, line-targets, and byte-identity invariant were computed against 4.2.0 HEAD and are stale. Re-anchor them to G4-run-time HEAD.

**C1 — drop the "introduce `--dock-surface-blur`" framing; R2 is pure retirement.** bg-build-map.md:450 currently reads "the dock still paints blur via `--dock-surface-blur: var(--glass-blur-resting)` (8px peer, verified 0 orphan readers)". 3.6 already shipped that line (shell.css:29). Re-word to: "the dock ALREADY paints blur via `--dock-surface-blur: var(--glass-blur-resting)` (shipped by 3.6 at shell.css:29) — this wave RETIRES only the now-orphaned `--glass-blur-dock` chain (the 3.6 re-point completed the orphaning; this wave deletes the dead declarations)." G4 must NOT re-declare `--dock-surface-blur` (a double-declaration / conflict against 3.6's landed edit).

**C2 — pin "HEAD" to G4-run-time, and split the byte-identity invariant by arm.** bg-build-map.md:447,466 "dist `glass-ui.css` BYTE-IDENTICAL to the HEAD baseline … the dead token was already tree-shaken" is ambiguous and arm-conflated. Replace with two explicit invariants measured at G4-run-time (the integrated `tranche/BG` tip, carrying 3.6's compiled CSS — NOT 4.2.0):
  - **CARVE arm** (grain-tail → `glass/grain-overlay.css`, persistent-region tail → `dock/shell-regions.css`, each `@import`-ed in the exact cascade slot): dist `glass-ui.css` **byte-identical** — rules relocated, not changed.
  - **RETIREMENT arm** (delete the `--glass-blur-dock` composite/saturate/radius declarations + the `--blur-dock` bridge from glass.css/dark-arm.css/bridges.css): dist `glass-ui.css` **byte-identical** because the unused custom props are ALREADY absent from dist at HEAD (VERIFIED: `grep -c glass-blur-dock dist/glass-ui.css` = 0). The binding paint invariant is **computed-style identity** (0 paint readers → every surface's resolved `backdrop-filter`/blur unchanged), which the carve cannot regress.
  - The measured check (not the "tree-shaken" assumption): `npm run build` at G4-run-time HEAD → snapshot `dist/glass-ui.css` → apply G4 → `npm run build` → `diff` is EMPTY.

**C3 — re-measure the carve line-targets against the live files.** bg-build-map.md states `ladder.css` 527→470 and `shell.css` 510→459. Re-confirm at G4-run-time:
  - `ladder.css` = 527 now and is untouched by any landed wave (its consumers 3.5/WS9 are PENDING) → the 527→≤500 carve target holds; G4 must verify `wc -l` and carve the grain-tail to land ≤500 (the 470 figure is a target, not a contract — the CONTRACT is ≤500 + the cascade-slot byte-identity).
  - `shell.css` = 510 now but WAS edited by 3.6 (the `:17-29` blur-token region). The persistent-region tail G4 carves is at the END of the file, disjoint from 3.6's edit, so the carve is unaffected — but G4 MUST re-`wc -l` at run-time and carve enough of the tail to land ≤500 (the 459 figure is a target). State the contract as: **post-carve `wc -l src/styles/glass/ladder.css src/styles/dock/shell.css` BOTH ≤500** (R1/R2 cleared), not the exact 470/459 literals.

**C4 — the §2.M1 downstream note (forward-link, owned elsewhere but recorded here).** WS9 PAPER-GRAIN-REAL's *Files* (bg-build-map.md:699-700) names the PRE-carve `ladder.css`/`dock/shell.css` — after G4 the grain-tail rules live in `glass/grain-overlay.css` and the persistent-region tail in `dock/shell-regions.css`. WS9's re-point must follow the carve into the leaves (the proof:webgl-substrate-single "asserts follow the composition into the carved leaf" precedent). This is convergence-gap G-7 / §2.M1's owner; recorded here as the carve→consumer handoff G4 creates. (Not PT-1's edit; PT-1 only flags the link so PASS-2 wires the WS9 *Files* re-point.)

---

## 3. The verifying checks (does the fix hold)

### V-A (§2.D3) — a born-RED readiness self-test on the pure helpers
Extract `doneBuilding`/`ready`/`allDone`/`pendingLeft`/`cutReady` (or import them) into `docs/tranches/BG/execution/bg-execute-readiness.selftest.mjs` and assert:
1. `doneBuilding({status:'PAINT-PENDING'}) === true` and `doneBuilding({status:'PENDING'}) === false` and `doneBuilding(undefined) === false`.
2. **Deadlock repro → release:** a downstream wave `D` with `preconds:['P1']` where `P1.status='PAINT-PENDING'` → `ready(D)` is **false on the OLD `=== 'DONE'` code (born-RED)**, **true after A3 (GREEN)**.
3. `pendingLeft` over a wave-set that is all `{DONE,PAINT-PENDING}` is **false** (terminal break) after A4; **true on the OLD set** (spins to the empty-batch break).
4. `cutReady` is **false** while any `paintClass:'P'` wave is `PAINT-PENDING`, and **true only when every [P] is DONE** — i.e. the cut still demands painted truth. `buildComplete` is **true** at the all-`{DONE,PAINT-PENDING}` state (the build engine reaches its terminal).
The self-test is born-RED on the current wf.js helpers and GREEN after Part A — the project's born-RED-gate discipline applied to the control-flow fix.

### V-B (§2.D1) — a DAG-shape assertion (dry-run, no build)
After Parts B1-B3, run the loader once (or a `--dry-run` that prints the DAG) and assert on the emitted DAG JSON:
1. `byId['BG.W-CLOSEFIX-9SITE'].seq === 0.7` and `.preconds` ⊇ `['STAGE-0…','BG.W-GLASS-BLUR-PEER']`.
2. `BG.W-GLASS-TINT-UNIFY`, `BG.W-GLASS-SUFFUSE-UNIVERSAL`, `BG.W-PAPER-GRAIN-REAL` each carry `BG.W-CLOSEFIX-9SITE` in `.preconds`.
3. **Frontier simulation** at the current cursor state (STAGE-0 done, 3.6 done, 3.5/WS6/WS9 PENDING): `ready(G4)` is **true** (preconds met) and `composeBatch(readyNow)[0].id === 'BG.W-CLOSEFIX-9SITE'` (lowest seq among ready) — G4 is picked NEXT, not last.
4. `ready(BG.W-GLASS-TINT-UNIFY)` is **false** until G4 is `doneBuilding` — the carve-before-consumer edge holds.

### V-C (§2.D2 + the carve itself) — the post-G4-run invariants
When G4 actually runs (PASS-2 execution, not this spec), the integrator's per-wave gate asserts:
1. `wc -l src/styles/glass/ladder.css src/styles/dock/shell.css` BOTH **≤500** (R1/R2 cleared); the two new leaves `glass/grain-overlay.css` + `dock/shell-regions.css` exist and are `@import`-ed in the recorded cascade slot (`read-css-monoliths.mjs` glass.order + `read-dock-css.mjs` DOCK_PARTIAL_ORDER updated).
2. **dist diff EMPTY:** `npm run build` → snapshot `dist/glass-ui.css` at G4-run-time HEAD → apply G4 → `npm run build` → `diff` empty (the C2 measured invariant, both arms).
3. `grep -rn 'var(--glass-blur-dock' src/styles/` returns **nothing** (the chain fully retired); the dock's computed `backdrop-filter` is unchanged (paint-identity — 0 readers).
4. `--run full` siblings-absent in a fresh `/tmp` worktree PASS; all 15 affected device-free gates GREEN in the one diff (the existing G4 gate contract, now measured against the live tree).
5. No double-declaration of `--dock-surface-blur` (C1 — G4 must NOT re-add 3.6's shell.css:29 line).

---

## 4. Feasibility verdict + scope fences

**feasible: YES — the fix holds.** Each of the three is a bounded, deterministic edit:
- §2.D3 is five pure-control-flow line changes with a born-RED self-test that proves the deadlock-repro releases — no design unknown, no agent behavior change (the same agents, a corrected readiness predicate).
- §2.D1 is a seq renumber + four precond edges across two docs + the loader prompt, verified by a dry-run DAG-shape assertion — the edges are derivable and the frontier simulation proves G4 is picked next.
- §2.D2 is a spec re-word (drop the stale "introduce `--dock-surface-blur`", pin "HEAD" to run-time, split the byte-identity invariant by arm, state the carve contract as ≤500 not the exact literals) — and the underlying carve is mechanical, already de-risked by the W-CARVE byte-identity precedent; the only "re-derivation" is a `wc -l` measurement, not a design choice. The dist-neutrality is EMPIRICALLY confirmed (dist already carries 0 `glass-blur-dock`).

**The one reframe PASS-2 must absorb:** G4 does NOT "land first before WS1/WS3" — that prose had the 3.6 dependency backwards. G4 lands **after** 3.6 (which orphaned the chain, DONE) and **before** 3.5/WS6/WS9 (the remaining ladder/shell consumers, PENDING). At HEAD all of G4's preconds are met, so once Part A un-deadlocks the frontier and Part B re-anchors the seq, G4 is the very next wave the engine picks.

**Out of PT-1 scope, flagged for the named owners:**
- §2.M1 (WS9 *Files* re-point to the carved leaves + a post-WS9 re-carve owner) — convergence gap G-7 / recorded in C4.
- §2.U1 (the bbnf-buddy `--glass-blur-dock` external override silent-no-op) — G4 retires the chain on a glass-ui-INTERNAL "0 readers" basis; an external consumer reads it as a live override. Owe the B7-style migration row + the exact-name deep-grep (`--glass-blur-dock-radius`/`--blur-dock`/`--glass-saturate-dock`). This is convergence gap G-7, NOT a PT-1 edit, but G4's retirement is the wave that creates the consumer break — recorded so PASS-2 does not retire silently.
- The PT-2 decoupled-vs-recoupled paint adjudication — Part A makes the decoupled model correct; PT-2 decides whether to keep it. The two do not conflict (Part A's two-gated cut works under either decision).

**FENCE honored:** wrote only this file under `docs/tranches/BG/audit/RESPEC-COHERENCE/`; zero src/demo/scripts/CLAUDE.md edits; siblings-intact exit 0.
