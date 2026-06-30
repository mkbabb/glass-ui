# P-SWEEP — ADVERSARIAL CRITIQUE, PASS 1

**Item:** The standing `closeDisease:true`-manifest per-band sweep — the completeness clause (`P-SWEEP`)
**Date:** 2026-06-30 · **HEAD:** `b716b5be` · **branch:** `tranche/BG`
**Critiqued artifact:** `pass-1-proto-P-SWEEP.md` · **Fence:** read-mostly; wrote ONLY this file under `RESPEC/`.
`verify-siblings-intact --quiet` exit 0 before + after. Every empirical counter-claim below was RUN at HEAD.

**convergencePct: 72.** The core mechanism is sound and the disease is real (the 4 reds reproduce on disk), but the
prototyper HAND-WAVED the single most load-bearing detail of its own headline mechanism — HOW the dual-signal runner
READS the JSON status — and that hand-wave collides with two on-disk facts that break the design as written. The
completeness clause (the actual P-SWEEP deliverable) is well-specified; the dual-signal runner is NOT.

---

## 1. WHAT VERIFIED (the prototyper's strong claims hold)

Re-ran at HEAD; these are CORRECT:

- The 4 reds reproduce. On-disk `.cache/gates/` confirms `AV-no-god-module=fail`, `no-dead-token=fail`,
  `AY-tag-parity=fail`, `AZ-gate-manifest-sound=fail`; `gen-ci-fresh` writes NO `.cache/gates/*.json`
  (`grep -c writeGateArtifact|.cache/gates → 0`, signals via `process.exit(1)`+`console.error` only). The
  dual-signal NECESSITY (JSON-leg misses gen-ci-fresh; exit-leg needed) is GROUNDED, not prose.
- `gatesFor` special-cases `"full"` cleanly at `gates.mjs:2305`; `"sweep"`/`"sweep-fast"` are a one-block addition.
  `runMode` is `execSync(…{stdio:"inherit"})` → throws on nonzero child → `process.exit(1)`: the exit-code leg is
  faithful by construction. CONFIRMED.
- The JSON `status` field is lowercase `"pass"`/`"fail"` inside the artifact data object (the `console.log(status.toUpperCase())`
  is DISPLAY-only). The prototyper's `artifactStatus !== "pass"` check uses the right casing. CONFIRMED (I had
  worried about a `"PASS"`/`"FAIL"` mismatch from the console output — it is not a real hazard).
- The `evaluate`/`syntheticInput`/`--selftest` subprocess-differential precedent is real in
  `proof-close-battery-parity.mjs` (lines 165-260). The armed-witness shape is reusable verbatim.
- The 7 FAST gates are all sub-second internally; gate-manifest-sound is the sole 112s cost-driver. The G3
  "ledger gates push toward full cost" worry IS empirically wrong. CONFIRMED.

---

## 2. THE LOAD-BEARING DEFECT — the dual-signal runner's JSON read is UNSPECIFIED and collides with two on-disk facts

The prototyper's `sweepVerdict(results)` takes `{id, exit, artifactStatus}[]` as ALREADY-RESOLVED input. It NEVER
specifies HOW the real `--run sweep` resolves `artifactStatus` from a gate that just ran. §2 says only: "reads
`SWEEP_ARTIFACTS[id]`'s JSON `status`." That single under-specified sentence is the whole load-bearing leg, and it
breaks on two facts I verified on disk:

### DEFECT-A — `.cache/gates/*.json` is GITIGNORED; zero committed → the T2 fresh-checkout run has NO JSON to read

```
git check-ignore .cache/gates/AV-no-god-module.json  → GITIGNORED
git ls-files .cache/                                  → 0 files
```

The prototyper's CONSUMER 3 (the band-boundary T2) runs `proof:full` in a FRESH `/tmp` worktree (siblings-absent,
CI-accurate). A fresh checkout carries ZERO `.cache/gates/*.json`. So on the EXACT run the prototyper designates the
binding close, a JSON-status leg that "reads `SWEEP_ARTIFACTS[id]`'s JSON" reads NOTHING — it must treat absence as
either (a) "skip the JSON leg, trust exit only" (silently degrading to the single-signal the §2 hazard says is
insufficient) or (b) "RED on missing JSON" (which would false-red EVERY fresh-checkout sweep). The prototyper specified
neither. The whole dual-signal value evaporates on the close run unless the runner reads the JSON the CURRENT child
wrote IN THIS INVOCATION (each child writes its `.cache/gates/X.json` as it runs), not a pre-existing committed file.
That is mechanizable — but it is NOT specified, and it is the headline mechanism.

### DEFECT-B — the stale-JSON hazard is the SAME disease the sweep exists to catch (R6-PERSISTED, recursive)

If the runner reads a PERSISTED `.cache/gates/X.json` rather than the file the current child wrote, it inherits exactly
the staleness that makes `gate-manifest-sound` itself false-red (the `[R6-PERSISTED]` finding: it reads a STALE
`AX-dock-animation-live.json status:fail` from a prior server-down π run). The sweep's JSON-status leg would be
vulnerable to the IDENTICAL "π/prior-run overwrites the JSON" class it is meant to be immune to. The runner MUST
delete-or-ignore the pre-run artifact and read ONLY the post-child-run file (mtime-after-spawn, or unlink-before-spawn).
Unspecified. This is not a nitpick: the prototyper's OWN §3 names R6-PERSISTED as the reason gate-manifest-sound is
realDefect=FALSE — and then designs a JSON-status leg with the same exposure without noticing.

**Severity: HIGH.** Both defects are in the headline deliverable's load-bearing leg. Both are fixable in ~10 LOC
(unlink-before-spawn + read-after-spawn + absent-JSON ⇒ exit-leg-only-with-a-recorded-note), but the spec as written
does not contain the fix, so it is NOT ready to develop to 100%.

---

## 3. THE SWEEP_ARTIFACTS MAP IS A SECOND HAND-LIST — the exact brittleness P-SWEEP claims to cure

P-SWEEP's whole thesis is "a hand-list is brittle; DERIVE from the manifest flag." Yet the prototyper's dual-signal leg
introduces `SWEEP_ARTIFACTS = { "proof:no-god-module": "AV-no-god-module", … }` — a HAND-CODED map of gate-id →
cacheName. This is a second hand-list with the identical drift failure mode:

- The cacheName is the 2nd arg to `gateArtifactPath(envVar, cacheName)` INSIDE each gate script
  (verified: `gateArtifactPath("GLASS_UI_NO_GOD_MODULE_ARTIFACT", "AV-no-god-module")`). A gate that renames its
  cacheName (a carve, a rename) drifts the map silently — the JSON leg goes blind for that gate, and NOTHING catches
  it except the prototyper's own C5 clause (which itself reads `SWEEP_ARTIFACTS` — so C5 is checking the hand-list
  against the flag set, NOT against the gate's ACTUAL cacheName). C5 cannot detect a map entry that points at the
  WRONG (stale) cacheName; it only detects a MISSING entry.
- WORSE: `gateArtifactPath` honors an ENV OVERRIDE (`if (override) return resolve(ROOT, override)`). Under
  `GLASS_UI_NO_GOD_MODULE_ARTIFACT=/some/path`, the gate writes elsewhere and `SWEEP_ARTIFACTS["proof:no-god-module"]`
  points at a stale/absent default-path file. The release pipeline DOES set these env vars in places. The map is
  env-fragile.

The prototyper acknowledges this in a parenthetical ("DERIVED-or-declared: a row may carry `artifact: "<cacheName>"`")
but does NOT commit to it. The CORRECT design is to carry the cacheName ON the manifest row beside `closeDisease:true`
(or, better, have the runner read the path the child PRINTS — each gate logs `artefact: <path>` to stdout, which
`stdio:"inherit"` does not capture but a `stdio:"pipe"` capture would). Either way: the map MUST be manifest-sourced or
stdout-sourced, never a third hand-list. As written it reintroduces the cure's own disease.

**Severity: MEDIUM-HIGH.** Self-undermining of the central thesis. Fixable by moving cacheName onto the row, but
unspecified which way, and the env-override hazard is unaddressed entirely.

---

## 4. THE C2 ANTI-EVASION "device-free" DETECTOR WILL FALSE-RED A LEGIT MEMBER

The prototyper's C2 symmetric guard: "a flagged gate must be device-free (no Playwright spawn); a `flaggedPlaywright`
gate REDs." But I verified `proof:gate-manifest-sound` — a CORRECT, intended closeDisease member — contains 3 source
hits for `playwright|chromium|page.goto`:

```
8:   // … the playwright config still DEFAULTED to the foreign-app :5173 port;
142: /** The live-gate script set + the playwright config (the live-demo-default sweep …
152: set.push(resolve(ROOT, "tests-visual/playwright.config.ts"));
```

These are a COMMENT and a config-FILE-PATH it lints as text — NOT a browser spawn (verified: no `spawnSync`/`execSync`
of a browser binary; the `playwright.config.ts` is read as a STRING to lint its `:5199` default). So the prototyper's
own "all 8 device-free, grep → none" appendix line is FALSE for gate-manifest-sound, AND a naive C2 detector that greps
the SOURCE for `playwright`/`chromium` would FALSE-RED the legit flagged member. The C2 detector must distinguish a
browser SPAWN (an executed `spawnSync`/`page.goto` against a chromium binary) from a string MENTION — exactly the
`gate-manifest-sound` clause-4 precedent ("match only an EXECUTED call, a comment naming it is fine"). The prototyper
cited that precedent for OTHER clauses but did not apply it to its own C2 device-free detector.

**Severity: MEDIUM.** A born-RED gate that false-reds its own intended member at first wiring is a self-inflicted
debugging loop. The fix is the executed-call detector, which already exists verbatim in the cited gate.

---

## 5. THE ≥2-CONSUMER ACCOUNTING — Option A's "machine fact" is weaker than claimed; the bar is mis-framed

The prototyper's Option A (engine spawns `gates:sweep-fast` at the flip step → 2nd automated consumer) is reasonable,
but two challenges:

- **The bar is mis-framed.** P-SWEEP is a PROCESS gate, not a primitive. The J-inv-10 ≥2-binary-consumer bar is about
  visual-load-bearing PRIMITIVES (a component/composable that ships only if ≥2 surfaces consume it). A process
  discipline's "consumers" are its enforcement points, and the honest count is "how many places MECHANICALLY enforce
  it." The prototyper correctly drops the over-claim to "1 automated + 2 disciplines (Option B)" but then strains to
  manufacture a 2nd "automated" consumer (Option A) to hit a bar that does not strictly apply. The cleaner framing:
  this gate's LOAD-BEARING enforcement is the commit-hook bite (1 automated guard) + `proof:close-sweep` itself (the
  armed witness). The two disciplines are documentation, honestly labeled. Forcing Option A to claim "2 automated"
  risks the same over-claim P3 made, one rung down.
- **Option A's env-export is a real hazard vector.** The engine spawning with `GLASS_UI_ACTIVE_TRANCHE=BG` exported
  is fine, BUT the engine `bg-bh-execute.wf.js` lives OUTSIDE the glass-ui repo's gate-checkable surface — a
  source-grep clause (C4b) over the engine file is a clause that reads a file the gate cannot guarantee exists at the
  consumer's HEAD (the engine is in the tranche execution docs, not `src/`). If the engine is refactored, C4b reds on
  a file the gate has no authority over. This is the inverse of the foreign-tree fence problem: a glass-ui gate
  asserting the SHAPE of a tranche-orchestration script. Recommend Option B as the SPEC default; Option A as a
  recorded NICE-TO-HAVE the engine MAY add, NOT a gate clause.

**Severity: MEDIUM.** Not blocking, but the spec should default to Option B (honest, in-repo-checkable) and not gate on
the engine's internal shape.

---

## 6. SMALLER MISSES / HAND-WAVES

- **FAST-set wall-cost is mis-stated.** The prototyper's "~1.8s" is the sum of SCRIPT-INTERNAL times. Each gate runs
  via `npm run <cmd>` (the runMode path), which carries ~0.6-0.8s npm-spawn overhead PER gate (measured:
  `proof:gate-script-parity` internal 0.38s → wall 0.98s via npm). The 7-gate FAST set's real WALL cost a consumer
  pays is ~5-7s, not ~1.8s. Still negligible per-flip, but the headline number is wrong by ~3-4×. Record the wall cost.
- **`tag-parity` JSON writes `status` — verified, no defect.** (My initial grep missed it because the `status:` is on
  a `const status =` line, not inside the object literal on one line. Confirmed it DOES write `status` to the artifact.
  Not a defect — recorded so the next pass doesn't re-flag.)
- **The born-RED anchor and `["local"]` tag are sound.** The `["local"]`-tag rationale (a ci tag re-seeds R3) is
  correct and verified — gen-ci-fresh reds because a ci-tagged gate (`glass-idiom-factor`) is not re-emitted, so a
  ci-tagged close-sweep would itself need ci.yml re-emission, a circular re-seed. Good catch by the prototyper.
- **No `proof:ba-gestalt` row — correct.** Zero pixels. Confirmed against the BB invariant.
- **The "8 gates" class boundary is judgment, not derived.** `gate-script-parity` + `storybook-complete` are ADDED vs
  P3's 6 by the prototyper's class definition. The definition ("device-free meta-gate reading shared
  registration/cascade bookkeeping") is reasonable but the C2 `auditedClassGates` list is STILL a human-named registry
  injected into `evaluate` — so the completeness clause asserts "every HUMAN-NAMED class gate carries the flag," which
  is only as complete as the human naming. This is honestly the best achievable (a machine cannot infer "this gate
  reads shared bookkeeping" from source), but the spec should state plainly that C2 closes the FORGOT-THE-FLAG hole,
  NOT the FORGOT-TO-NAME-IT-A-CLASS-GATE hole — the latter remains a human-judgment residual. The prototyper implies
  C2 is fully structural; it is half-structural.

---

## 7. WHAT WOULD CLOSE TO 100%

1. **Specify the runner's JSON read** (DEFECT-A + DEFECT-B): unlink-or-mtime-guard the artifact BEFORE the child spawn,
   read ONLY the post-spawn file, and define the absent-JSON policy (exit-leg-only + a recorded `jsonMissing` note,
   NEVER a silent single-signal degrade). This is the headline mechanism and is currently a single hand-waved sentence.
2. **Make the cacheName manifest-sourced or stdout-sourced** (§3): carry `artifact: "<cacheName>"` on the manifest row
   beside `closeDisease:true` (so the map is DERIVED, matching the thesis), and handle the `gateArtifactPath` env-override
   (read the SAME env var the gate reads, or capture the printed `artefact:` path from `stdio:"pipe"`).
3. **Fix the C2 device-free detector** (§4): use the executed-call detector (the gate-manifest-sound clause-4 precedent)
   so a string MENTION of playwright/chromium does not false-red gate-manifest-sound.
4. **Default to Option B** (§5): 1 automated guard + 2 honest disciplines; drop the C4b engine-source clause (the gate
   has no authority over the tranche engine file). Option A recorded as optional.
5. **Correct the FAST wall-cost to ~5-7s** (§6) and state the C2 residual honestly (half-structural: closes
   forgot-the-flag, not forgot-to-name-it).

None of these are architectural — the design is sound. They are the load-bearing DETAILS the prototyper deferred. The
item is feasible:YES and the convergence is real, but it is NOT at 100% because the headline dual-signal mechanism's
read path is unspecified and collides with the gitignore + stale-JSON facts on disk.

---

## Appendix — counter-evidence RUN at HEAD `b716b5be` (2026-06-30)

```
git check-ignore .cache/gates/AV-no-god-module.json   → GITIGNORED (committed .cache files: 0)
.cache/gates live status values:
  AV-no-god-module=fail · no-dead-token=fail · AY-tag-parity=fail · AZ-gate-manifest-sound=fail
  AX-gate-script-parity=pass · AW-storybook-complete=pass · BB-close-battery-parity=pass
gen-ci-fresh writeGateArtifact|.cache grep                → 0 (no JSON; exit-leg only) — prototyper CORRECT
JSON status field casing                                  → lowercase "pass"/"fail" (console .toUpperCase is display) — prototyper CORRECT
gateArtifactPath signature                                → (envVar, cacheName); honors process.env[envVar] override (DEFECT-B/§3 hazard)
gate-manifest-sound playwright|chromium|page.goto grep    → 3 hits (comment + config PATH, NOT a spawn) → C2 false-red hazard (§4)
gate-manifest-sound browser spawnSync/execSync(browser)   → none (device-free in the spawn sense)
FAST gate wall cost via npm run (measured)                → gate-script-parity 0.98s · storybook 1.01s · close-battery 1.08s (≈3× the internal time; §6)
close-battery-parity evaluate/syntheticInput/--selftest   → present (lines 165-260) — armed-witness precedent real
verify-siblings-intact --quiet                            → exit 0 (before + after)
```
