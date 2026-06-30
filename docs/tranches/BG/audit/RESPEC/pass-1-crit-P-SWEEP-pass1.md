# P-SWEEP — ADVERSARIAL CRITIQUE, PASS 1

**Item:** The standing `closeDisease:true`-manifest per-band sweep (the completeness clause) · **Class:** spec
**Date:** 2026-06-30 · **HEAD (real, live):** `6369ad6e` (prototyper measured at `b716b5be`; the only intervening commit
`6369ad6e` is **docs-only** — RESPEC/*.md — so the mechanism is unchanged and the born-RED anchor re-verified live below).
**Fence:** read-mostly; wrote ONLY this file under `RESPEC/`. `verify-siblings-intact --quiet` exit 0 before.
**convergencePct: 62.**

The skeleton is sound and the mechanism reuse is real (verified). But the TWO headline claims that make the prototyper's
"high confidence" — (a) completeness is a *manifest-derived* fact "never a hand-list", and (b) the ≥2-consumer bar is met
by a *preferred Option A* engine-spawned automated consumer — each rest on a premise that is half-true or contradicted by
the code. Six concrete open items below.

---

## WHAT VERIFIED CLEAN (give credit — these de-risk real chunks)

| Claim | Verified live @ `6369ad6e` |
|---|---|
| `gatesFor("full")` special-case at `gates.mjs:~2304` | ✓ confirmed (`local ∪ ci ∪ release`, deduped, manifest order) |
| `runMode` execSync-throw → `process.exit(1)` | ✓ confirmed (`{stdio:"inherit"}`, catch → exit 1) **but FAIL-FAST — see CRIT-3** |
| `gen-ci-fresh` writes NO JSON | ✓ `grep -c "writeGateArtifact\|.cache/gates" → 0` (dual-signal need is REAL) |
| SWEEP_ARTIFACTS cacheNames | ✓ ALL 7 verify on disk EXACTLY, incl. the guessed `AX-gate-script-parity` (`gateArtifactPath(…, "AX-gate-script-parity")`) and `no-dead-token` (no letter prefix) |
| `gate-manifest-sound` has NO GATES-row field whitelist | ✓ no `allowedKeys`/`Object.keys(g)` check — the `closeDisease`/`closeDiseaseTier`/`artifact` fields are **schema-safe** (`note:` is the 367-use optional-field precedent) |
| born-RED anchor reproduces at the MOVED HEAD | ✓ no-god-module exit 1 · gen-ci-fresh exit 1 · no-dead-token exit 1 |
| commit-msg active-tranche idiom is verbatim-real | ✓ `.githooks/commit-msg` uses `TRANCHE="${GLASS_UI_ACTIVE_TRANCHE:-}"` + `[ -n "$TRANCHE" ]`-gated node call |
| JSON `status` casing | actual on-disk values are **consistently lowercase** `"pass"`/`"fail"` (the appendix's `status:"PASS"`/`"FAIL"` for storybook/gate-manifest are **transcription errors** — minor, but they puncture "every empirical claim RUN at HEAD") |

---

## CRIT-1 (LOAD-BEARING) — the completeness headline is HALF-TRUE: C2's `auditedClassGates` is itself a hand-list with the SAME forget-failure-mode it claims to cure

The headline is "SWEEP_SET is DERIVED from the flag, never a hand-list — so a future close-disease gate is enrolled by its
OWN registration." `SWEEP_SET = GATES.filter(g=>g.closeDisease)` is genuinely derived — agreed. **But the bite that is
supposed to CATCH a forgotten flag (C2, the "inverse-bite") compares `flaggedGates` against `input.auditedClassGates`, and
`auditedClassGates` is a HAND-MAINTAINED registry inside `proof-close-sweep.mjs`.**

- The class definition ("a device-free meta-gate that reads shared registration/cascade-bookkeeping a wave-diff can
  clobber") is **NOT machine-decidable from a gate's source** — there is no structural predicate that separates
  `no-god-module` (in-class) from, say, `proof:glass-cal` (reads CSS, device-free, ∈ full, but NOT in-class). So the real
  (non-selftest) `auditedClassGates` MUST be hand-curated.
- A future agent who mints a new close-disease gate and forgets `closeDisease:true` will, with **equal probability**,
  forget to add it to `auditedClassGates` — they're the same omission. When both are forgotten, **C2 passes vacuously**:
  the new gate isn't in `auditedClassGates`, so no flag is demanded, and `SWEEP_SET` silently lacks it. The disease
  re-mints exactly as before.
- The §4 code shows `input.auditedClassGates` CONSUMED but the prototype **never specifies how the REAL gate populates
  it** — only the `--selftest` fixture injects it. This is the single biggest unspecified hole, and it is precisely the
  brittleness P-SWEEP exists to cure, RELOCATED from `SWEEP_SET` to `auditedClassGates`.

**Resolve:** either (a) derive `auditedClassGates` from a STRUCTURAL heuristic with a recorded boundary (device-free AND ∈
`--run full` AND `grep`-reads one of {`gates.mjs`, `ci.yml`, `package.json` tag set, CSS line budget, `--token` graph}) and
accept the false-include/exclude tail as a self-test fixture, OR (b) drop the "never a hand-list" claim and state honestly
that the completeness floor is a HAND-AUDITED registry the gate makes VISIBLE (not self-completing) — the value is the
visible inverse-bite + the self-test, not elimination of the hand-list. The current spec implies (a) but ships (b).

---

## CRIT-2 (LOAD-BEARING) — Option A (the "PREFERRED" 2nd automated consumer) is INFEASIBLE against the engine's stated architecture

The prototyper RECOMMENDS Option A: "the engine (`bg-bh-execute.wf.js`) SPAWNS `npm run gates:sweep-fast` at the flip step
(~6 LOC in the engine's flip step)" → "TWO genuine automated consumers." **The engine cannot do this.** Its own header:

> "RUNTIME NOTE: the workflow script has NO filesystem/git access — every file/git op runs THROUGH an agent … **The engine
> is pure control-flow**: readiness, batch composition, dispatch, the user-gated CUT halt."

And `grep -cE "spawnSync|execSync|child_process|function flip|onFlip" bg-bh-execute.wf.js → 0`. There is **no "flip step"
function** to add 6 LOC to — the flip is performed by the INTEGRATOR **agent** writing the cursor. So Option A's
env-export/`spawnSync` cannot live in the engine. The closest real mechanism is an INTEGRATOR-PROMPT instruction to run
`gates:sweep-fast` before committing — which is **agent-follows-prompt DISCIPLINE**, the exact category the prototyper
assigned to consumers #2/#3. **Option A collapses INTO Option B.** The prototyper recommended it without reading the engine.

Compounding: `GLASS_UI_ACTIVE_TRANCHE` is currently **UNSET** in the env, and nothing in-fence sets it (the engine can't).
So even consumer #1 — the ONE OS-process-automated guard — is INERT until something exports the env. (The existing ledger
bite shares this exact dependency, so it's an ACCEPTED posture, not a new defect — but it means "1 automated consumer" is
really "1 automated consumer IFF the env is exported by the human/orchestrator shell.")

**What the prototyper MISSED (the cleaner real argument):** the commit-msg git-hook is **automatically EXERCISED by the
engine's commit-per-wave cadence** — every hot-file wave-commit the INTEGRATOR makes (under an exported tranche env) fires
the hook with zero engine edit. That is a genuine automation-by-construction argument for consumer #1 that does NOT depend
on the infeasible engine-spawn. **Resolve:** drop Option A; accept Option B's honest accounting (ONE OS-automated guard via
the git-hook, exercised by the commit cadence + gated on the env-export; the per-wave/per-band sweeps recorded as
DISCIPLINES). The ≥2-bar for a PROCESS gate is met by the real guard + the recorded protocol + the armed self-test — say so
without the "two automated" overstatement.

---

## CRIT-3 (LOAD-BEARING) — `runMode` FAIL-FAST contradicts the dual-signal sweep; the born-RED demo "naming R1–R4" is NOT producible by §1.2's mechanism

§1.2: "`--run sweep` … runs the set via `runMode`'s execSync-throw … faithful for the exit-code leg by construction."
§2: "The real `--run sweep` SPAWNS each gate (capturing its exit), reads `SWEEP_ARTIFACTS[id]`'s JSON status, then exits on
`sweepVerdict(results)`. It WRAPS `runMode`." **These are mutually exclusive.** `runMode` `process.exit(1)`s on the FIRST
failing gate (confirmed: the `catch` inside the for-loop). Therefore:

- `runMode("sweep")` at HEAD names ONLY `no-god-module` (manifest-first), then exits — **NOT R1–R4.** §5 step-1's "RED
  naming R1–R4" is false under the §1.2 mechanism.
- You cannot "WRAP runMode with the JSON-status assertion" — `runMode` has already `process.exit`'d before control returns
  to read any JSON or call `sweepVerdict`.

The dual-signal verdict REQUIRES a NEW spawn-all-capture loop that does NOT delegate to `runMode`. The spec must pick ONE
and rewrite §1.2/§5: `--run sweep` is a dedicated dispatch branch (spawn-all, capture every exit, read each JSON, then one
`sweepVerdict` exit) — `runMode`'s fail-fast loop is the WRONG primitive for a "name all the reds" sweep. As written, the
load-bearing born-RED demonstration cannot be produced by the described runner.

---

## CRIT-4 — the "~1.8s" cost is SUMMED node-direct, not the runMode/commit-hook-experienced cost

The "~1.8s total" is the sum of `node scripts/proof-X.mjs` direct times (0.2+0.2+0.1+0.1+0.4+0.4+0.4). The proposed
mechanism runs each gate via `execSync("npm run ${cmd}")` — **7 nested `npm run` spinups (~0.2–0.5s EACH ≈ +1.4–2.8s)** —
and the commit-hook adds ANOTHER `npm run gates:sweep-fast` spinup on top. Realistic per-hot-commit cost is **~3.5–5s, not
1.8s**. The existing ledger bite invokes `node scripts/proof-live-verified-ledger.mjs` DIRECTLY for exactly this reason.
**Resolve:** the FAST bite (and the sweep runner) should invoke the proof scripts directly (node-direct), not through
`npm run` — matching the ledger-bite idiom — or the "negligible per-commit cost" claim is overstated 2–3×.

---

## CRIT-5 — the FULL `SWEEP_SET` / `gates:sweep` is a near-ORPHAN (substrate-without-a-runner)

After §3 retires the T0/T1 split (`T0==T1==SWEEP_SET_FAST`) and routes `gate-manifest-sound` to T2-via-`proof:full`,
**nothing actually runs the full `gates:sweep`** (SWEEP_SET incl. gate-manifest-sound): T2's CONSUMER 3 runs `proof:full`,
NOT `gates:sweep`. So the full set + the `gates:sweep` npm key + the `gate-manifest-sound` SWEEP_ARTIFACTS entry exist ONLY
to satisfy C1/C2's structural assertions — a substrate-without-a-consumer (the ≥2-consumer / visual-load-bearing
discipline applied to a process artifact: a runner with no caller). **Resolve:** either give `gates:sweep` a real distinct
consumer, or collapse to `SWEEP_SET_FAST` alone and assert `gate-manifest-sound`'s coverage via its EXISTING `--run full`
membership (it's already in the battery — C2 over the FAST set + a note that gate-manifest-sound rides proof:full is
simpler and non-orphaning).

---

## CRIT-6 — cross-prototype ORDERING coupling under-flagged; close-sweep must enroll in the born-RED-by-design register

`proof:close-sweep` is `["local"]` → it IS in `--run full` (local ∈ the union). It cannot go GREEN until P-CLOSE clears
R1–R4 (its sweep-clean arm) AND P-SWEEP wires the flags/runner/hook/canon. Consequences the prototype under-states:

- Landing **P-SWEEP before P-CLOSE adds a NEW born-RED member to the `--run full` battery** (close-sweep red on its
  sweep-clean arm). The P-CLOSE-before-or-atomic-with-P-SWEEP edge must be HARD, not implied.
- `proof:close-sweep` is a THIRD born-RED-by-design gate (beside `ba-gestalt`, `ship-attestation`). It must be **explicitly
  enrolled in the born-RED-by-design register** so a fix-agent does not try to "fix" it mid-tranche (the §0.C precedent).
  The prototype never names this enrollment.
- Open: does `proof:close-sweep` RUN the sweep as its born-RED arm, or is it purely structural (introspecting the
  manifest)? §4's `evaluate()` is purely structural (injected `input`) — which would be GREEN the moment the flags/runner/
  canon/hook land, making the "born-RED anchored to the 4 reds" claim FALSE. §5 says it's born-RED "because `--run
  sweep`-clean fails" — implying it RUNS the sweep. Pick one: if it runs the FAST sweep as its anchor (~real cost per
  CRIT-4), state that; if it's structural, the born-RED comes from C2–C5 unwired, NOT from R1–R4, and §5 must be corrected.

---

## ANGLES THAT DO NOT BITE (recorded so the next pass doesn't re-flag)

- **warm-everywhere/no-gray, Safari/WebKit, PRM, no-layout-animation, ba-gestalt** — genuinely N/A: zero pixels. The
  prototyper correctly omits a `proof:ba-gestalt` row. No critique here.
- **clean-break/no-legacy** — retiring P3's T0/T1 split is a clean break WITHIN the spec evolution; fine. The new
  `closeDisease`/`closeDiseaseTier`/`artifact` manifest fields are additive-optional (schema-safe, CRIT verified).
- **gate-manifest-sound realDefect=FALSE** — the R6-PERSISTED stale-π-JSON + CLEAN-TREE dirty-tree reasoning is sound;
  routing it CLOSE-ONLY is correct. (The residual concern is CRIT-5: that decision orphans the full set.)

---

## VERDICT

**feasible: YES** (agree with the prototyper) — the mechanism reuse is real and verified, the artifact map is correct, the
born-RED anchor holds at the moved HEAD. But **NOT ready to develop at high confidence**: the two headline claims need
genuine rework, not polish — (1) the completeness floor's `auditedClassGates` is an unspecified hand-list with the cured
disease's failure-mode, and (2) the recommended consumer path (Option A) is infeasible against the engine. Plus the
runMode/spawn-all contradiction makes the born-RED demo non-producible as written. These are fixable spec inconsistencies,
but there are six and two are load-bearing. **convergencePct: 62.**
