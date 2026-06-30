# PT-6 — Decoupled-paint-vs-gestalt-first adjudication + per-wave green-signal narrowing (CORRECTED-APPROACH SPEC)

**Pass:** 1 · **Mode:** spec (corrected-approach; verified by re-reading source + re-deriving against the live frontier, not by running code) · **Date:** 2026-06-30 · **Branch:** tranche/BG · **HEAD:** `4c761b64`
**Targets:** C8b [HIGH] (decoupled-paint precept-compliance + the PAINT-PENDING-stalls-successor defect) + C5 [MED] (the `--run ci`/`--run local` mid-tranche deadlock + the CLAUDE.md `[local]`-only contradiction)
**Feasible:** YES — all three legs are minimal, source-verified, and match an EXISTING gate-locked precedent. The decoupling holds with a per-band cadence binding; the stall is a 2-line predicate fix; the deadlock is a tag-class regression with the corrected tag already named in the project's own allowlist.

---

## 0 · Ground-truth re-verified directly against source this pass

| Fact | Evidence | Verdict |
|---|---|---|
| `proof:ba-gestalt` tags = `["local","ci","release"]`, born-RED-by-design | `gates.mjs:1619`; `npm run proof:ba-gestalt` → **exit 1** | poisons `--run local` AND `--run ci` AND `--run release` AND `--run full` |
| `proof:ship-attestation` tags = `["ci","release"]`, born-RED (no ceremony has run) | `gates.mjs:458`; `npm run proof:ship-attestation` → **exit 1** | poisons `--run ci` + `--run release` + `--run full` |
| `proof:close-sweep` (planned G3) specced `["local"]`, "the THIRD born-RED-by-design" | `bg-build-map.md:471,476,490` | will poison `--run local` + `--run full` once it lands |
| `runMode(mode)` hard-exits 1 at the FIRST red gate | `gates.mjs:2329-2336` | one born-RED gate halts the WHOLE aggregate |
| `gatesFor("full")` = `local ∪ ci ∪ release` (a `release`-only gate is STILL in `full`) | `gates.mjs:2305-2314`; `node -e` probe → `ba-gestalt in full: true` after the re-tag thought-experiment | **release-only preserves the close-gating** |
| ci.yml runs each `gatesFor("ci")` gate as `npm run <gate>` (carries ba-gestalt + ship-attestation TODAY) | `.github/workflows/ci.yml:142-143,458-459` | per-push CI is structurally RED at the first born-RED gate |
| release.yml runs `node scripts/gates.mjs --run full` | `.github/workflows/release.yml:54-55` | the tag-push close still fires a release-only ship-attestation/ba-gestalt |
| The established release-only precedent is ALREADY gate-locked | `proof-tag-parity.mjs:97,102,108,115,176` (ba-gestalt · ay-final · az-reflect · ba-final · peer-conformance) | the corrected tag is the project's OWN documented pattern |
| `ready()` releases a successor ONLY on precond `status === 'DONE'` | `bg-bh-execute.wf.js:98-102` | a PAINT-PENDING precond NEVER releases its successor → STALL |
| The DAG loader intent: PAINT-PENDING = "done-building, MUST NOT re-enter the build frontier" | `bg-bh-execute.wf.js:136` | the loader treats PAINT-PENDING as build-complete; `ready()` does not |
| Live cursor: 3.1 `BG.W-CARTOON-INK-GAMUT` + 3.6 `BG.W-GLASS-BLUR-PEER` are PAINT-PENDING | `EXECUTION-PROGRESS.md:102,107` | any successor with a precond on either stalls NOW |
| `paintWaves = []` decouples the in-cycle judge | `bg-bh-execute.wf.js:204` | diverges from engine-design.md §3 (which describes an IN-CYCLE per-band judge, `engine-design.md:144-158`) |
| `proof:glass-idiom-factor` in the `ci` registry but ABSENT from emitted ci.yml | `gates.mjs:1503` vs `grep -c` ci.yml → **0**; `npm run proof:gen-ci-fresh` → **RED** | the C5 ci.yml drift is live (the re-emit closes it) |
| CLAUDE.md says ba-gestalt "tagged `["local"]` so it does NOT block ci/release mid-tranche" | `CLAUDE.md:20` | doubly wrong — live tag is all-three, AND `[local]` would still poison `--run local` |

---

## 1 · The adjudication — is `paintWaves=[]` precept-compliant?

### The precept at issue
LESSONS-LEARNED Entry-1 / the gestalt-first precept / `real-paint-protocol.md §3` ("No single terminal flipper"): the BB **single-terminal-reflect disease** was that ALL paint verdicts were deferred to ONE W-REFLECT wave at the tranche END, so nothing painted mid-build and the tranche shipped broken because the terminal sweep was the only paint check and it never blocked the tag. The cure: **each painting wave's row flips at ITS OWN close by a non-authoring judge, against ITS OWN fresh capture — per-band, never a terminal funnel.**

### The finding
The DESIGN (`engine-design.md:144-158`) is precept-compliant: it describes an **in-cycle** per-band judge (`const paintWaves = builds.filter(b => status(b.w) === 'PAINT-PENDING')`) running in the SAME sweep, the "fix-agent-per-band reality." The IMPLEMENTATION (`bg-bh-execute.wf.js:204`) set `paintWaves = []`, decoupling the judge into the separate `bg-paint.wf.js` sweep — **diverging from its own design.**

Decoupling is NOT inherently the disease. `bg-paint.wf.js` is GENERIC — it reads the live `[paint-pending]` set from the cursor ("WS1's 5 now; WS3+ later", `bg-paint.wf.js:5,40`) and carries a `PipelineValidate` hard-stop that validates the C-SAFARI ★★★ capture pipeline ONCE before the fan-out (`bg-paint.wf.js:42-48`) — a genuine engineering benefit the in-cycle judge LACKS (re-coupling would re-validate the real-Chrome.app+Safari.app pipeline inside every 3-wave batch). So the decoupling has a real rationale.

The DEFECT is that decoupling is precept-compliant ONLY IF `bg-paint.wf.js` runs **per-band** (after each band's `[P]` waves accrue, before the cut). There is **no trigger binding it per-band** — nothing in `bg-bh-execute.wf.js` invokes it, and `ready()` lets the build race arbitrarily far ahead (once the stall in §2 is fixed) while paint accumulates unboundedly. By DEFAULT — a human launching `bg-paint.wf.js` once, at the end — the decoupling collapses INTO the BB single-terminal-reflect disease. The audit's "structurally ADJACENT to the cured disease" is exactly this: adjacent, releasable into the disease, not yet the disease.

### VERDICT — KEEP decoupled, BIND per-band (recommended)
The decoupling HOLDS as precept-compliant under THREE conditions:

- **(A) A per-band cadence trigger.** `bg-bh-execute.wf.js` MUST invoke (or HALT-and-instruct the orchestrator to invoke) `bg-paint.wf.js` at each **band boundary** — when a WS's `[P]` waves are all PAINT-PENDING and its `[H]` waves DONE, BEFORE the frontier advances past the downstream-dependent band. This preserves "per-band, no terminal funnel." The trigger is the structural anti-disease, not the decoupling per se.
- **(B) `bg-paint.wf.js` null-guards (PT-3).** The decoupled workflow is the longest/most-session-wall-exposed (real Chrome.app + Safari.app per wave); its 3 un-guarded `await agent(` derefs (`bg-paint.wf.js:39,42,50`) must each carry `.catch(()=>null)` + a guard on `pp.waves`/`pipe.*`, mirroring the already-hardened `bg-bh-execute.wf.js` (5 `.catch(()=>null)`). A crash-loop here stalls the visual close (class H via class A). [Owned by PT-3; named here as a hard precond of the KEEP verdict.]
- **(C) The tag-fence is preserved.** `BG.W-CUT` cannot fire while `proof:ba-gestalt` holds an open roster FAIL (the operative-PASS AND, `gates.mjs:1620`). With (A)+(B), every `[P]` wave's row is flipped per-band by the non-authoring judge; the cut's `proof:ba-gestalt` is then the AND of already-per-band-verified rows, NOT a deferred terminal verdict.

### The rejected alternative — RE-COUPLE in-cycle
Reverting `paintWaves=[]` to `builds.filter(b => status(b.w) === 'PAINT-PENDING')` restores `engine-design.md §3` literally and is unimpeachably precept-compliant, but it (1) runs the heavy real-Chrome.app+Safari.app capture inside every build batch (slow build cycles, the exact thing the decoupling fixed) and (2) loses the `PipelineValidate` once-before-fan-out C-SAFARI keystone. **Only choose this if the orchestrator declines to implement trigger (A)** — the per-band cadence is the cheaper anti-disease.

### The doc reconcile this verdict requires
`engine-design.md §3` (the in-cycle judge) and `bg-bh-execute.wf.js:204` (`paintWaves=[]`) **contradict each other on disk.** Whichever verdict lands, ONE must be amended to match the other. Under the KEEP verdict: amend `engine-design.md §3` to document the decoupled-but-per-band-triggered model (the paint judge moved to `bg-paint.wf.js`, invoked at each band boundary, with the `PipelineValidate` keystone) so the design no longer mis-describes the impl.

---

## 2 · The PAINT-PENDING-releases-successor mechanism (the stall fix)

### The defect
`bg-bh-execute.wf.js:98-102`:
```js
function ready(w, waves, map) {
  if (w.status !== 'PENDING') return false
  if (!w.preconds.every(p => map[p] && map[p].status === 'DONE')) return false   // ← the stall
  return interleaveReady(w, waves)
}
```
A successor whose precond is a still-PAINT-PENDING `[P]` wave is NEVER ready: `map[p].status === 'DONE'` is false for a PAINT-PENDING precond. The DAG loader (`:136`) explicitly treats PAINT-PENDING as **done-building** ("MUST NOT re-enter the build frontier") — its source is landed + committed `[paint-pending]` device-free GREEN. So the build-ordering precond IS satisfied (the source exists to build on); only the orthogonal paint verdict is pending. Live: 3.1/3.6 are PAINT-PENDING NOW (`EXECUTION-PROGRESS.md:102,107`); the moment a downstream wave declares either as a precond, it stalls until the out-of-band paint workflow flips it DONE — and §1 shows nothing triggers that workflow.

### The fix (exact edit)
A `[P]` wave committed `[paint-pending]` has its SOURCE landed; its successors can BUILD on that source. Build-ordering depends on the SOURCE, not the paint verdict. Amend the precond predicate to a `BUILT` set:

```js
// a [P] wave committed [paint-pending] has its src landed+committed device-free GREEN;
// its successors can BUILD on it. Build-ordering depends on the landed SOURCE, not the
// orthogonal paint verdict (the DAG loader's own "PAINT-PENDING = done-building", :136).
const BUILT = new Set(['DONE', 'PAINT-PENDING'])

function ready(w, waves, map) {
  if (w.status !== 'PENDING') return false
  if (!w.preconds.every(p => map[p] && BUILT.has(map[p].status))) return false
  return interleaveReady(w, waves)
}
```

`interleaveReady`'s `allDone(waves, ws)` helper (`:87`) carries the SAME class — it gates BH-WSn interleave on every BG-WSn wave being `=== 'DONE'`, so a band whose `[P]` waves are PAINT-PENDING would never release its BH interleave dependents either. Apply the same `BUILT`-set widen there:
```js
const allBuilt = (waves, ws) => waves
  .filter(w => w.tranche === 'BG' && w.ws === ws)
  .every(w => BUILT.has(w.status))   // was: w.status === 'DONE'
```
and have `interleaveReady` call `allBuilt`.

### The bounded rebase risk (documented, not a blocker)
If a PAINT-PENDING wave's paint LATER fails, the fix-loop re-enters it at `PENDING` (`bg-bh-execute.wf.js:223`) and re-implements at root — so a successor built on the pre-fix source may need a rebase. This risk is BOUNDED by §1's per-band cadence: paint is verified close to the band, so the window between "successor builds on landed source" and "paint verdict returns" is one band, not the whole tranche. The mitigation is a one-line addition to the FIX-agent prompt: when a paint-fix re-implements a `[P]` wave whose successors have already landed, the fix agent's patch must note any successor whose source the re-implementation moves, and the integrator re-confirms each affected successor's gate post-rebase. (This is the standard "build on landed source, paint async" model; the cut's `proof:ba-gestalt` G7 auto-revoke — `real-paint-protocol.md:120-123` — already re-shoots any surface whose painting bytes changed, so a stale successor capture cannot ride a green at the cut.)

---

## 3 · The narrowed green-signal set (the `--run ci`/`--run local` deadlock fix)

### The defect
`runMode` hard-exits at the first red gate (`gates.mjs:2329-2336`). `proof:ba-gestalt` (`[local,ci,release]`) and `proof:ship-attestation` (`[ci,release]`) are born-RED-by-design for the WHOLE tranche, so:
- `--run ci` (per-push CI, `ci.yml:142-143,458-459`) is structurally RED.
- `--run local` (`proof:all`, the dev inner loop) is structurally RED — ba-gestalt is `local`-tagged too.
- `--run full`/`--run release` (the close battery) are RED — correct at the cut, wrong mid-tranche.

The binding DONE-bar docs make it worse by NAMING the unmeetable aggregate as the bar:
- `real-paint-protocol.md §1.1` (`:20-22`): "Device-free proof GREEN ... under `--run ci`."
- `real-paint-protocol.md §4` (`:133-134`): "`proof:ba-gestalt` runs in `--run ci` so the mid-tranche battery carries gestalt signal continuously" — incoherent: a born-RED gate in a hard-exit `runMode` HALTS `--run ci`, it does not "carry signal continuously."
- `EXECUTION-PLAN.md §C.1` (`:95`): "Device-free proof GREEN under `--run ci` siblings-absent."
- `CLAUDE.md:20`: "tagged `["local"]` so it does NOT block ci/release" — wrong tag, and `[local]` would still block the dev loop.

The engine in PRACTICE survives because the integrator re-runs the WAVE'S OWN single gate (`bg-bh-execute.wf.js:187`: "RE-RUN its deviceFreeProof.gate"), NOT the `--run ci` aggregate — so the per-wave commit cadence does not literally deadlock. But the docs' binding bar is unmeetable, the CI status badge is permanently red (no per-push green signal, no regression detection from the aggregate), and `proof:gen-ci-fresh` is independently RED (the `glass-idiom-factor` drift, `:0` in ci.yml).

### The fix — re-tag the born-RED close-oracle trio to RELEASE-only (the established precedent)
This is NOT a new invention. `proof-tag-parity.mjs:97-176` ALREADY records the gate-locked pattern: born-RED-by-design close oracles are RELEASE-only (or untagged) "so the aggregates complete" because "FAIL/RED is the normal mid-dev state; ci would red every push" (ay-final · az-reflect · ba-final · peer-conformance, verbatim). The current ba-gestalt tag is a REGRESSION against that pattern — and tag-parity's own allowlist rationale for ba-gestalt (`:97`) already DESCRIBES it as "untagged so aggregates complete" while the LIVE tag does the opposite.

**The exact tag edits (`scripts/gates.mjs`, orchestrator-owned hot file):**

| Gate | Line | Current tags | Corrected tags | Why it still gates the close |
|---|---|---|---|---|
| `proof:ba-gestalt` | 1619 | `["local","ci","release"]` | `["release"]` | release ⊂ full; release.yml runs `--run full`; matches the gate's OWN note ":1620 release-only, NOT ci" + its tag-parity rationale + CLAUDE.md intent |
| `proof:ship-attestation` | 458 | `["ci","release"]` | `["release"]` | the tag-push bypass-closer: release.yml `--run full` (`:55`) still fires it on every tag-push; only the mid-tranche `ci` membership is dropped |
| `proof:close-sweep` (planned, G3) | `bg-build-map.md:471` | specced `["local"]` | `["release"]` | the close-disease manifest gate is a close oracle; `[local]` poisons `--run local` AND `--run full` mid-tranche (the build-map `:490` notes the `full` red but not the `local` one) |

After the re-tag: `--run ci` and `--run local` are GREEN-able mid-tranche (no born-RED close oracle in either set); `--run full`/`--run release` STILL carry all three (release ⊂ full — VERIFIED: `ba-gestalt in full: true`, `ship-attestation in full: true`), cleared only at the cut by the real paint + the live-Metal ceremony.

**The re-emit (one operation, closes two C5 sub-defects at once):** `npm run gates:emit-ci` after the re-tag (a) DROPS ba-gestalt + ship-attestation from ci.yml (post-re-tag), AND (b) ADDS the missing `proof:glass-idiom-factor` (closing the `gen-ci-fresh` drift), AND (c) greens `proof:gen-ci-fresh`. emit-ci's no-backing-script guard (`gates.mjs:2552`) is satisfied (both gates have backing scripts). **Owned by `BG.W-CLOSEFIX-9SITE` R3** (which the plan already tasks with re-emitting ci.yml).

**The tag-parity allowlist edits (`scripts/proof-tag-parity.mjs`):**
- `:97` — correct ba-gestalt's rationale from "untagged so aggregates complete" to "RELEASE-only (the ay-final/ba-final precedent) so the mid-dev aggregates (ci/local) complete while the close battery (full/release) enforces it; born-RED until the per-band non-authoring judges flip the roster, then the operative close OR."
- ADD a `proof:ship-attestation` entry (it currently carries `ci`, so dropping `ci` would red the static-gate-must-carry-ci classifier UNLESS allowlisted): "RELEASE-only (the ba-final precedent) — the tag-push bypass-closer; ci would red every mid-tranche push (no ceremony has run); release.yml `--run full` is its enforcement home."
- ADD a `proof:close-sweep` entry when it lands (same shape, the ba-final precedent).

### The doc reconciles (the binding bars stop naming the unmeetable aggregate)
- `real-paint-protocol.md §1.1` + `§4 (:133-134)` + `EXECUTION-PLAN.md §C.1 (:95)`: replace "device-free GREEN under `--run ci`" with "the wave's OWN `proof:*` gate GREEN on the integrated tree + the `--run ci` aggregate GREEN-able (the born-RED close oracles are RELEASE-only — they gate `--run full`/`release` at the cut, not the per-push battery)." Re-express the §4 "continuous gestalt signal" as: **the continuous gestalt signal is the per-band non-authoring judge cadence (`bg-paint.wf.js` per band, §1) + the `--run pi` visual-runner** — NOT a born-RED gate in a hard-exit `runMode`. `proof:ba-gestalt` is the release-only operative close OR (the AND of all roster rows at the cut), and is runnable by name (`npm run proof:ba-gestalt`) for mid-tranche visibility — exactly what tag-parity's "the bar stays visible + runnable by name" means.
- `CLAUDE.md:20`: "tagged `["local"]` so it does NOT block ci/release mid-tranche" → "tagged `["release"]` (the ay-final/az-reflect/ba-final precedent) so it gates the close battery (`--run full`/`release`) but does NOT block the per-push `--run ci` or the dev-loop `--run local` mid-tranche; born-RED until the per-band non-authoring judges flip the roster, then the operative close OR." (This is the standing-doc reconcile the seed's class-T/submodule note keeps OUT of `docs/precepts`; CLAUDE.md is parent-tracked, correct home.)
- `gates.mjs:1620` (the ba-gestalt note already SAYS "release-only, NOT ci" — the tag now FOLLOWS the note; no further note edit needed beyond verifying the note's "PROMOTED ... onto ['release']" matches the `["release"]` tag).

### A standing catching gate (recommended — the class never had one)
The tag regression (a born-RED close oracle silently broadened to `ci`/`local`) had NO catcher — the same shape as the audit's class-K "no single catching gate." Extend `proof:tag-parity` with a NEGATIVE clause: **any gate whose note declares it born-RED-by-design / "the tag-blocker" / "operative close set" / "release-only by design" MUST NOT carry `ci` or `local`** (the az-reflect/ba-final invariant made machine-checkable), with a self-test bite (a synthetic born-RED-noted gate tagged `ci` REDs). This permanently forbids re-broadening ba-gestalt back into the per-push battery. Cheapest home: a clause inside `proof:tag-parity` (it already walks the manifest tags); a standalone `proof:born-red-tagging` is the alternative.

---

## 4 · Exact waves to amend

| Wave | Amendment |
|---|---|
| `BG.W-PAINT-IS-THE-GATE` | re-tag `proof:ba-gestalt` → `["release"]` (gatesRegistration, hot file); reconcile its note + the `real-paint-protocol.md §4` "runs in `--run ci`" prose to the per-band-judge + `--run pi` continuous-signal model |
| `BG.W-SHIP-DISCIPLINE-LIVE-PRECONDITION` | re-tag `proof:ship-attestation` → `["release"]`; add its `proof-tag-parity.mjs` allowlist entry; reconcile its `:459` note ("Registered ['ci','release']" → "['release']; release.yml `--run full` runs it on every tag-push") |
| `BG.W-CLOSE-SWEEP` (G3) | spec `proof:close-sweep` `["release"]` (NOT `["local"]`); add its tag-parity allowlist entry; correct the build-map `:490` sequencing note (it reds `--run local` mid-tranche too, not only `--run full`) |
| `BG.W-CLOSEFIX-9SITE` (R3) | run `npm run gates:emit-ci` AFTER the three re-tags land — one re-emit drops the two born-RED gates from ci.yml + adds `proof:glass-idiom-factor` (closing the `gen-ci-fresh` drift) |
| `BG.W-GLASS-IDIOM-FACTOR` | no edit — its drift is closed by CLOSEFIX-9SITE's re-emit; named for traceability |
| `BG.W-GESTALT-CURSOR-PARITY` | confirm its cursor-parity assertions read the post-re-tag tags (it reconciles the roster cursor; verify it does not re-pin ba-gestalt to `ci`) |
| Engine (`bg-bh-execute.wf.js`) | the `ready()` + `interleaveReady`/`allDone` `BUILT`-set widen (§2); the per-band `bg-paint.wf.js` trigger (§1 condition A); reconcile `engine-design.md §3` to the decoupled-but-per-band model |
| Engine (`bg-paint.wf.js`) | the 3 `.catch(()=>null)` null-guards (§1 condition B; PT-3 owns the implementation) |
| Docs | `real-paint-protocol.md §1.1/§4` + `EXECUTION-PLAN.md §C.1` + `CLAUDE.md:20` reconciles (§3) |

**Ordering:** the three re-tags (gates.mjs) → the re-emit (CLOSEFIX-9SITE R3) → the doc reconciles. The `ready()` fix and the per-band trigger are independent of the re-tag and can land first (they unblock the live 3.1/3.6 stall immediately). PT-3 (the bg-paint null-guards) is a precond of the §1 KEEP verdict but does not block the §2/§3 fixes.

---

## 5 · The verifying check (feasible = does the fix hold)

The fix HOLDS when ALL of these pass:

1. **`node scripts/gates.mjs --list ci | grep -E 'ba-gestalt|ship-attestation'` → empty** (the born-RED close oracles left the per-push set).
2. **`node scripts/gates.mjs --list full | grep -E 'ba-gestalt|ship-attestation'` → both present** (the close battery still carries them; release ⊂ full). [Already VERIFIED in §0 — `ba-gestalt in full: true`, `ship-attestation in full: true`.]
3. **`npm run proof:tag-parity` GREEN** after the allowlist edits (ba-gestalt rationale corrected; ship-attestation + close-sweep entries added) + the new negative born-RED-tagging clause's self-test bite passes.
4. **`npm run gates:emit-ci && npm run proof:gen-ci-fresh` GREEN** (ci.yml drops the two born-RED gates, adds `glass-idiom-factor`, byte-matches — closing the live `gen-ci-fresh` RED confirmed in §0).
5. **`node scripts/gates.mjs --run ci` no longer hard-exits at a born-RED-by-design close oracle** — any remaining red is a GENUINE wave defect (a real signal to fix), not a structural close-oracle. [If `--run ci` still reds after the re-tag, enumerate the remaining red gates and decide each: fix-the-defect vs (if it is ANOTHER born-RED close oracle) release-only-tag. The structural-RED-forever set is exactly the named trio; `proof:visual-runner` (`local,ci`, born-RED W4) already exits 0 by reporting-in-facts (`gates.mjs:1614`), so it does not poison the aggregate.]
6. **The `ready()` release** — a 2-wave DAG `[P-pending] → successor` releases the successor into the frontier. Verify with a tiny node test over the engine-local PURE helpers (`ready`/`composeBatch`/`interleaveReady`/`allBuilt` are side-effect-free): assert `ready(successor, [pPendingWave, successor], byId)` is `true` when the precond's status is `'PAINT-PENDING'`. (The helpers are exportable/copyable without the agent harness.)
7. **No binding DONE-bar doc names the unmeetable aggregate** — `grep -rn 'GREEN under .--run ci' docs/tranches/BG/execution/` returns no live binding-bar line; `grep -n '\["local"\]' CLAUDE.md` at the ba-gestalt bullet shows the corrected `["release"]` text.
8. **The per-band anti-disease** — `engine-design.md §3` and `bg-bh-execute.wf.js` agree on the paint model (no in-cycle-vs-decoupled contradiction on disk), and a band-boundary `bg-paint.wf.js` invocation point exists (the trigger, §1-A), so paint is verified per-band, not deferred to one terminal sweep.

If 1-8 hold, the three legs are coherent: the build proceeds without the PAINT-PENDING stall (§2), the per-push/dev aggregates are green-able so the cadence has a real green signal (§3), the close battery still enforces the born-RED oracles at the cut (§3 / check 2), and the decoupled paint is bound per-band so it is NOT the single-terminal-reflect disease (§1).

---

## 6 · Verdict

**FEASIBLE — the fix holds.** All three legs are minimal and source-verified, and the central one (the green-signal narrowing) is not an invention but the RESTORATION of the project's OWN gate-locked precedent (ay-final/az-reflect/ba-final/peer-conformance → release-only), which `proof:tag-parity` already documents for ba-gestalt while the live tag contradicts it. The re-tag preserves close-gating by construction (release ⊂ full, release.yml runs `--run full`), so no close coverage is lost. The PAINT-PENDING stall is a 2-line predicate widen provably correct against the DAG loader's own stated "PAINT-PENDING = done-building" intent. The decoupling adjudicates to KEEP-with-per-band-cadence — the decoupling has a real benefit (the once-before-fan-out C-SAFARI `PipelineValidate` keystone) and is precept-compliant once bound to a per-band trigger; re-coupling is the fallback only if the orchestrator declines the trigger. The single residual judgement is the per-band trigger's exact placement (band-boundary auto-invoke vs orchestrator HALT-and-instruct) — both satisfy the precept; the auto-invoke is cleaner but couples the heavy capture into the control loop, so a HALT-and-instruct checkpoint at each band boundary is the conservative hold.
