# BK Φ0 execution results — 2026-07-29

Run: `bk-phi0-20260729-01`

Historical registered script:
`docs/tranches/BJ/addenda/2026-07-24-refinement/wf/bk-phi0-execution.wf.js`

Post-cutover cure script:
`docs/tranches/BJ/addenda/2026-07-24-refinement/wf/bk-phi0-cures.wf.js`

Journal: `docs/tranches/BK/execution/2026-07-29-phi0/journal.jsonl`

**State: ROUND-4 PASS/GO SEALED; #1/#75/#2 SEALED PASS; #3 remains
IN-FLIGHT at source `74c59ade`; #4 remains IN-FLIGHT at landed candidate
`5946f5ef` with `evidence_state=pending-two-fresh-Sol-challenges-and-adjudication`;
#5 remains IN-FLIGHT at cured candidate
`8be4f662`, pending exactly two entirely fresh `gpt-5.6-sol` xhigh
judgment-only challenges and one fresh Sol xhigh adjudication; no seal.** #2 remains sealed with
`code_state=landed` at `82bdc93e` and
`evidence_state=adjudicated`; Challenge I PASS, Challenge J PASS, and fresh
adjudication PASS-and-seal. The
committed registration is preserved byte-for-byte: two
Truth plus two Challenge results, 4/4. The early #75 Truth seat is a separately
late-accounted 1/1 amendment, yielding five actual pre-cutover seats without
rewriting the original run. Cure rounds 1 and 2 failed honestly. Round-3 Sol
judgment/implementation candidates landed and exact `gpt-5.6-luna` xhigh
mechanical re-attestation passed, but fresh Challenge G/H and the lead
adjudication completed FAIL/NO-GO. Round 4 stays in the same run: exact Luna
graph, surface, and document-integration owners, two fresh Sol judgment-only
challenges, and one fresh Sol adjudication. Terra was neither substituted nor
relabelled. The round-4 evidence is sealed below; #2's source fence was lifted
only for the already-registered subtraction, and its completed source/browser
receipt is sealed below after the two fresh challenges and fresh adjudication.
The initial prefix challenge failures and the exact Luna cure candidate are
banked at the end of this file; they are historical receipts, and the cure is
not pre-approved PASS.

## Truth seats

- `truth:surface-salvage` — COMPLETED, 0 errors; landed as `858c1087`.
  The exact owner-ratified slice is eight files: three detector conversions,
  three hardened bodies, and the two package manifests for direct
  `@vue/compiler-sfc`/`postcss` development dependencies. The slice contains
  zero `governedInvariant`, governed setup, verifier, or governance-roster
  references. The cure chain `0557703f` → `950a703f` → `f3a83c9b` closes the
  challenged detector/body truth gaps: both SFC script blocks and namespace
  imports retain native offsets, reduced motion settles and disposes timers
  before advancement, the TagsInput canary asserts its real value-render
  contract, side-effect ESM imports reach all three forbidden-path scanners,
  and CSS syntax casing is handled without folding custom-property
  identifiers. The six-file battery remains 40/40. `f3a83c9b` is a landed Sol
  candidate mechanically re-attested by exact Luna; round 3 later failed at
  Challenge G/H;
  #1 also remains open until #2 closes the public-surface RED by subtraction.
- `truth:graph-v3` — LANDED CANDIDATE WITH REQUIRED ROUND-3 CURES, 0 seat
  errors. The initial receipt
  `cb9827f07c9eb72e0cc078c922e3465f25c46ba3363373d2067ab3ae5c9be5b1`
  drove the first cures. The twice-cured current-main instrument landed at
  `9c43b5d7` with 1,497 nodes, 3,574 internal edges, 1,953 external edges, 101
  active owners, 72 public entries, 1,285 public symbols, and receipt
  `993a572241a07e2bc16c075224d53288963bf7780c50aa7e1e0c1f6b43aa7387`.
  Full stored JSON and rendered-summary checks passed twice; focused tests
  passed 13/13 twice, including under typecheck load; v1/v2 bytes stayed
  unchanged. Challenge E/F then proved that ignored build/cache/screenshots
  changed node lifecycle/type truth, inline Vue locations were block-relative,
  and one variable-proven local dynamic import was falsely nonlocal. The
  round-3 Sol candidate `ee5cbcfb` cures those three defects at current-main
  receipt `c9274358…`. Exact Luna reproduced that integrated receipt; it is not
  converged; round 3 remains failed until the source-fenced round-4 evidence.
- `truth:stop-hook` — COMPLETED CANDIDATE WITH CLONE-LOCAL CAVEAT, 0 seat errors. One
  project-local `Stop` command hook in `.claude/settings.local.json`; first stop
  blocks with the durable journal/missing-seat resume instruction, a boolean
  `stop_hook_active: true` exits cleanly, non-empty malformed input fails open,
  global settings remain hook-free, and active crons remain zero. Early
  challenges falsified empty/whitespace input and later XML/OpenStep parsing;
  both were cured.
  The machine-local hook does not travel with a clone and only protects
  graceful stops while Claude Code is alive; the script and journal are the
  cross-process recovery layer.
  The current strict-JSON `jq` implementation passes 14/14 classes: empty,
  whitespace, malformed, wrong-type, XML, OpenStep, and parser-missing inputs
  fail open; missing/false activity blocks; boolean true re-entry exits with
  no output. Exact Luna reproduced 14/14; round-3 Challenge G/H later failed.

## Gestalt challenges

- `challenge-a:phi0-truth` — COMPLETED, `claude-sonnet-5`, session
  `cc33e479-e6ae-4619-9b06-e6db452bebeb`. Verdict on each truth unit:
  **PASS WITH REQUIRED CURES**. It independently reproduced the 40-test
  salvage battery, 1,295/1,296 full-suite state, two-error typecheck state,
  graph receipt and coverage, and Stop-hook input matrix. Required cures:
  the boot-graph failure hint, two unused owner-manifest buckets, complete
  graph-result banking, and empty/whitespace Stop-hook fail-open.
- `challenge-b:phi0-truth` — COMPLETED, `claude-opus-5`, session
  `6254b481-d5f2-40c9-91f7-28f6b6523636`. Verdict on each truth unit:
  **PASS WITH REQUIRED CURES**. It mechanically falsified the symlinked
  graph-CLI guard and the weak type/runtime mutation bite, reproduced all
  principal counts/hashes, and identified the stale v2 operational loop,
  missing SCC detail, generated-source misclassification, 61st-gate risk,
  Stop-hook empty-input loop risk, and cursor/model-provenance debts. The
  CLI guard and operational-loop contradiction block graph landing.

Both challenges covered total-tranche fit, original-wave optimality,
specification adherence and friction, wave-unit scope, and every feature in
all three truth units. Their full reports remain in the canonical local
session transcripts identified above; this bank preserves every adopted
finding and exact cure.

## Post-cure challenge round 1

The original four-result registration is preserved byte-for-byte; the late
`phi0-stop-hook-early` amendment separately accounts #75 as 1/1. Journal scope
amendment `phi0-cures-round-1` then accounts for the three cure owners and the
two fresh, non-author `gpt-5.6-sol` xhigh challenges.

- `challenge-c:phi0-cures` — #1 PASS; graph-v3 FAIL; #75 PASS WITH
  BOUNDED CAVEAT; BK #2 NO-GO.
- `challenge-d:phi0-cures` — #1 PASS WITH REQUIRED CURES; graph-v3 FAIL;
  #75 PASS WITH REQUIRED CURES; BK #2 NO-GO.

Both independently falsified the graph process ledger: name-only matching
counts `RegExp.exec()` and a domain-local `spawn()` as child processes.
Challenge D additionally proved that `--check` trusts the stored receipt field
and accepts a tampered graph body/summary. Adopted graph cures also cover
binding-aware `require`/`createRequire`, TypeScript parse diagnostics,
template/inline-style dynamic-asset accounting, public-entry/source-owner
coherence, SCC membership/size ratchets, generated-node taxonomy, and
regeneration from current main. The #1 cure must scan both SFC script blocks
and namespace imports and test reduced-motion settlement before advancing
timers. The Stop hook must reject XML and OpenStep property-list syntax as
non-JSON. This round is durably failed; a second cure and two fresh challenges
are required.

## Post-cure challenge round 2

Scope amendment `phi0-cures-round-2` registered three second cures and two
fresh non-author Sol challenges before those challenges launched.

- `challenge-e:phi0-cures-round-2` — actual model `gpt-5.6-sol`, xhigh:
  surface PASS; graph-v3 FAIL as the active execution instrument; #75 PASS
  WITH CLONE-LOCAL CAVEAT; process state FAIL; BK #2 NO-GO.
- `challenge-f:phi0-cures-round-2` — actual model `gpt-5.6-sol`, xhigh:
  integrated Φ0 FAIL; BK #2 NO-GO.

Both reproduced the clean-tree graph core at 13/13 and receipt `993a572…`,
then independently falsified machine durability. Ignored `.cache`, `dist`,
`dist-demo`, the visual cache report, and two ignored screenshots changed the
exact payload to `11edae406…` despite no tracked graph edit. Challenge E
isolated the combined delta: nodes 1,497→1,499, edges unchanged, with ambient
existence changing directory/generated/source/style/placeholder taxonomy.
Both proved inline Vue script/template/style positions were block-relative
rather than file-native. Challenge F additionally proved that
`tests-visual/webgpu-everywhere.spec.ts` imports two local shader modules
through variable `path` while the fatal nonliteral-local ledger stayed zero.

The same total-tranche passes found three residual #1 truth gaps: a TagsInput
canary advertised but never asserted active state, side-effect-only ESM
imports bypassed all three boot scanners, and case variants of CSS property
names plus `VAR`/`BLUR` bypassed hygiene. They also falsified the retroactive
rewrite of the original workflow/registration and identified stale active
model-law cells. Every finding is adopted; the historical workflow is restored
byte-for-byte, #75 is late-accounted, the active law cells are supersession-
marked, and round 3 owns the code cures. This round is durably failed.

## Cure round 3 — failed; exact-model receipt and round-4 registration

`phi0-graph-cures-round-3` was registered before graph authoring;
`phi0-surface-cures-round-3` was added after Challenge F completed and before
surface authoring. Both use actual `gpt-5.6-sol` xhigh for
judgment/implementation and are recorded as candidates, not as Luna work.

- `cure:surface-salvage-round-3` — landed candidate `f3a83c9b`; four test
  files only; focused 15/15, boot 14/14, six-file battery 40/40, zero
  typecheck delta, clean diff.
- `cure:graph-v3-round-3` — landed candidate `ee5cbcfb`; current-main receipt
  `c9274358ca10d584c892484788f3f04bab346c552ddda1423f424c4bbe0f783f`;
  1,497 nodes, 3,576 internal edges, 1,953 external edges, all fatal/owner/
  cycle/virtual-payload ledgers zero. Checks passed twice and after a fresh
  ignored `dist-demo` build; focused architecture passed 16/16 sequentially
  and 16/16 under concurrent typecheck; surface remained 40/40.

The prospective owner law requires `mechanical-reattestation:phi0-round-3`
with exact `gpt-5.6-luna` xhigh over every post-boundary Sol cure receipt,
including earlier superseded bytes, both current candidates, graph
snapshot/manifest/censuses/tests, the six-file surface matrix, typecheck
delta, v1/v2 hashes, and #75’s 14-class hook evidence. The collaboration
dispatcher exposes Sol and Terra only, but the packaged desktop CLI exposed
the exact required Luna model. The read-only seat ran as actual
`gpt-5.6-luna` xhigh in session
`019faece-3c9d-75e0-97aa-1bb349353341` and **PASSED as mechanical evidence,
not as convergence**:

- graph `--check` passed twice and again after a fresh ignored demo build;
  focused architecture passed 16/16 sequentially and 16/16 under concurrent
  typecheck;
- stored, canonical, and two rebuilt receipts reproduced
  `c9274358ca10d584c892484788f3f04bab346c552ddda1423f424c4bbe0f783f`;
  manifest SHA is `e19b663f…`, summary SHA is `3d1ffb5f…`, and v1/v2 bytes
  remain `bac5e3c1…` / `c68ddc34…`;
- the fresh demo build passed and the six-file surface battery passed 40/40;
  typecheck reproduced only the two active-tree baseline TS2339 diagnostics,
  for zero delta;
- journal parsing passed 37/37 before this receipt was appended, the original
  workflow remained `edd43280…`, and the Stop hook passed 14/14 with one local
  hook and zero global hooks;
- tracked, staged, and unstaged tracked deltas were all zero; the 248-file
  nonignored-untracked boundary remained byte-list-identical at
  `aafdab71…`; no graph fixture residue remained.

Luna’s sandbox could not list the host crontab. The lead’s immediate host-level
follow-up reproduced the existing single commented `dns-speedtest` line and
zero active resume crons; no cron was added. Historical and superseded model
provenance remains literal. Challenge G/H and lead adjudication then failed
round 3. Round 4 is now mechanically integrated as a candidate in the same
run: exact Luna owns the bounded graph, surface, and document-integration
work; two fresh Sol judgment-only challenges and a fresh Sol adjudication are
the only remaining seats.

## Honest opening baseline

Before salvage and before refreshing the ignored demo build, `npm test
-- --reporter=dot` reported 199 files and 1,296 tests: 197 files passed, two
failed. The failures were the expected
`surface.root.exact` mismatch (`armGlassRefract` and
`supportsBackdropRefract`) and a stale `dist-demo` freshness assertion. The
targeted public-surface file reported 80 passing tests plus that one assertion.
After `npm run demo:dist:build`, the build-state-dependent failure cleared and
the full suite reported only the public-surface assertion: 198/199 files and
1,295/1,296 tests passed.
`npm run typecheck` reported only the two pre-existing
`tests/styles/track-well-fold.test.ts` TS2339 errors at lines 20 and 30.

The fresh pre-existing stray census is 248 Git-visible untracked files:
205 under `docs/tranches/BJ/addenda/2026-07-21-convergent-hardening/` and 43
under `docs/tranches/BJ/coordination/`. Entry-level status collapses those to
44 `??` rows. `card-raw.json` is absent. These bytes are preserved untouched
for #4. The intended unified inbound receipt and cure script were created
after that baseline and are excluded from the 248; they become durable only in
the pending documentation commit. Tracked run-control edits are likewise not
counted as pre-existing strays.

## Routed finding

`tests/gates/boot-graph.test.ts` says `npm test` builds `dist-demo` first, but
the package test script is `vitest run`. CI and release correctly execute
`demo:dist:build` before `npm test`; a clean isolated/local invocation needs
the explicit build. The cure is the false failure hint, not a `pretest` hook.

## Model-provenance deviation window

The historical registered workflow declared two Opus Truth seats. The actual
surface and graph authors were `gpt-5.6-sol`; #75 entered separately as a late
Sol Truth seat. Challenge A/B preserve their actual
`claude-sonnet-5`/`claude-opus-5` identities and session ids. Nothing is
relabelled. Those original five actual seats predate the prospective cutover;
their results and every cure remain literal provenance.

Post-boundary Challenge C/D/E/F are conforming Sol judgment seats. Post-
boundary cures `0557703f`, `950a703f`, the graph receipts culminating in
`9c43b5d7`, `f3a83c9b`, and the active round-3 graph candidate used Sol for
combined judgment/implementation and mechanical verification. Their actual
model is recorded without euphemism. Earlier versions are mapped as
superseded-by the current candidates rather than silently dropped. Exact Luna
mechanically re-attested the complete sequence in session
`019faece-3c9d-75e0-97aa-1bb349353341`; every current candidate now has status
`round-3-failed-round-4-registered`.

## Lead adjudication

COMPLETED **FAIL; ROUND-4 CHARTERED**. The original registration is 4/4 with
zero seat errors; late #75 is 1/1. Challenge rounds 1 and 2 are banked failures
with zero silent drops. Round-3 surface candidate `f3a83c9b` and graph
candidate `ee5cbcfb` were landed and exact-Luna mechanically re-attested, but
Challenge G/H completed FAIL/NO-GO and the fresh Sol lead adjudication completed
`completed-fail-and-round-4-chartered`. At that adjudication point #1 and #75
remained IN-FLIGHT and #2 remained UNSTARTED with its source-mutation fence
closed. Round 4 was then mechanically integrated in this run; the current #2
candidate receipt and its pending judgment seats are banked below.

## Row #4 current mechanical receipt — candidate, not sealed

The current `gpt-5.6-luna` xhigh seat records candidate reconciliation for #4 `TRACK-STRAYS + PARKED-RECONCILE` and #16 `W-ORPHAN-ROWS`. Pre-disposition is 248 Git-visible untracked paths, 234 Markdown / 14 non-Markdown / 0 outside `docs/`, with newline path SHA-256 `aafdab71d16de49fbed96128a21aa50eb24bab80899d7ae3b44015e10630cc15` and NUL path SHA-256 `356763a42192bf36e84271e7291c4082a82555866b346d76aa22d5ee50019977`; after explicit staging the Git-visible untracked count is 0. The exact merged artifact and row #16 pointer are `docs/tranches/BK/execution/2026-07-29-phi0/NEEDS-LUNA-STEER-FINDINGS.md`.

`G-CITE-COMMITTED` is current/forward citation closure, never retroactive history repair. #4 remains a candidate requiring two fresh Sol challenges plus fresh adjudication; #16 remains UNSTARTED; #63 remains repo-weight later; #78 canon land remains separate. Historical J-14 wording and historical model labels are not relabelled.

## Challenge G/H — completed round-3 failure

Both seats were fresh non-author `gpt-5.6-sol` xhigh judgment seats. They
inspected the integrated round-3 cut and exact Luna receipt; their actual
mechanical/process observations remain literal and are not relabelled.

- **Challenge G — FAIL / NO-GO.** Verdicts: surface `PASS-WITH-CURES`, graph
  `FAIL`, Stop `PASS-WITH-BOUNDED-CAVEAT`, model provenance `PASS`, process
  `FAIL`, inbound `PASS`, integrated Φ0 `FAIL`, and #2 `NO-GO`. It found that
  the graph generator was not analyzed for outgoing dependencies; mutable
  finite import provenance survives reassignment; the eager shell list is not
  a closure; only the first blur is scanned; replay prompts wrongly assign
  mechanical reproduction to Sol; and the Luna command ledger was not durably
  referenced.
- **Challenge H — FAIL / NO-GO.** It found that `CAPS_TRACKING` misses uppercase
  `EM`, inline Vue script/template edges omit block identity, and an import with
  empty named bindings disappears despite runtime side effects. It independently
  passes TagsInput, side-effect detectors, graph ignored-output invariance,
  Stop, the exact Luna receipt, and inbound.

## Minimal round-4 cure charter

The fresh Sol lead adjudication adopted the smallest existing-run cure and
registered it as `phi0-cures-round-4`, source-fenced before any start rows:

- **Graph, exact Luna owner:** edit only the builder, focused graph test,
  regenerated V3 JSON/summary, and METHOD. Use an explicit canonical generator
  with `OWNER-MANIFEST` inputs in `scripts-generators`, not a generic
  reached-boundary queue. Apply conservative mutation taint to assignment,
  update, delete, destructuring, loop, and property writes. Emit full flat SFC
  identity `blockKind`/`blockType`/`blockIndex`/`lang`/`setup` plus existing
  style metadata. Empty named runtime imports are side effects; `import type`
  empty bindings remain type-only.
- **Surface, exact Luna owner:** edit only boot-graph, token-hygiene, and
  type-hygiene. Derive an eager static runtime closure from AppShell using
  current graph truth; do not follow type-only or lazy dynamic branches. Scan
  every blur occurrence. Make `0.1em` ASCII-insensitive while custom-property
  case remains exact.
- **Document, exact Luna owner:** bank integration after both application
  owners, preserving all prior journal lines and this same run.
- **Process:** Sol challenges are judgment-only and must not run tests, builds,
  generators, censuses, manifests, or hook matrices. No frontend-design seat,
  new run, wave, row, gate, registry, cron, or control plane is introduced.

## Exact Luna round-3 evidence addendum

The exact desktop owner evidence is retained without transcript or unrelated
environment/auth content:

- CLI: `/Applications/ChatGPT.app/Contents/Resources/codex`
- Invocation prefix: `-a never exec -m gpt-5.6-luna -c model_reasoning_effort="xhigh" -s workspace-write -C /Users/mkbabb/Programming/glass-ui --json`
- Exact final prompt: `4083` bytes; SHA-256
  `51f4e71c354d896775c0e5d9341c3b4eda54949f5f4a241b0be02df53646eeb7`
- Session log:
  `/Users/mkbabb/.codex/sessions/2026/07/29/rollout-2026-07-29T12-56-19-019faece-3c9d-75e0-97aa-1bb349353341.jsonl`
  — 255 JSONL records, 1188812 bytes, SHA-256
  `8747c2ac25707a38180d4e8f9b1abcd4fa281c472cf05031796d297dcfc31130`
- Ordered tool ledger: 48 `exec` calls, with exact inputs and outputs retained
  in that session log.
- Model proof: `turn_context` records `gpt-5.6-luna` at `xhigh`.

## Round 4 — candidate mechanically integrated

This is mechanical integration evidence only; it does not adjudicate fitness,
close #1 or #75, or authorize BK #2. The two application starts were launched
before durable start rows, so both are recorded with `journaledAfterCompletion:
true`; `session_meta` and the rollout logs are authoritative.

- Graph application: session `019faefd-ecae-72d2-9263-4531332acdd5`,
  `gpt-5.6-luna`, `xhigh`, source `32999753c730859cbcaa3c42227ff7195e63bdb7`;
  578 records, 1,682,151 bytes, log SHA-256
  `a5ae5374444660748f171c5c5505b9df8d4f10421a55085bd8da9e791e76f62a`,
  prompt 4,038 bytes SHA-256
  `6df64a20313baa3bf9858ea5ed9121ce387987e0dd8a7092de14b19e9d52f0b3`,
  and 107 `exec` calls with 107 outputs. Its bounded changed paths were the
  graph builder, V3 JSON, V3 summary, focused graph test, and METHOD-AND-COVERAGE.
  The transient final message repeated the old round-3 session
  `019faece-3c9d-75e0-97aa-1bb349353341`; no durable round-4 receipt existed in
  that message, so only the actual session above is banked.
- Surface application: session `019faefd-ecbd-7b72-b634-fbacba95a464`,
  `gpt-5.6-luna`, `xhigh`, same source commit; 297 records, 945,582 bytes,
  log SHA-256 `412209dd75c606790df2d9cd5a0f3451fc741a967417b6d139be81280bd9eb18`,
  prompt 2,572 bytes SHA-256
  `b3704eced394a5e8a5d8eaa4702b0941bbec799895fa6629c42f0d8370b777db`,
  and 58 `exec` calls with 58 outputs. Its bounded changed paths were the
  three surface battery tests.
- Document integration: session `019faf1a-9423-7c52-9b58-252c11fa59fd`,
  `gpt-5.6-luna`, `xhigh`, same source commit; only the four existing control
  surfaces named below are changed. Journal lines advanced 46 → 52.

Mechanical receipts: `npm run demo:dist:build` passed (3,514 modules);
the six-file surface battery passed exactly 6 files and 40 tests; two
post-build `graph-v3 --check` runs passed with receipt
`a3c252fd3b5e47fa307563db3d4aec132de629514234a1b3cb9bb7a5ee7887af` and exact
summary 1,497 nodes / 3,579 internal / 1,963 external / 101 owners / 72
public entries / 1,285 public symbols, with all fatal ledgers, unused owners,
and cycle defects at zero. The focused graph test passed 20/20 sequentially
and 20/20 while typecheck was active. Typecheck exited 2 with only the two
recorded TS2339 diagnostics at `tests/styles/track-well-fold.test.ts` lines 20
and 30; delta zero. The strict-JSON Stop-hook matrix passed 14/14 with one
project-local hook and zero global hooks. Direct crontab inspection was blocked
by the sandbox (`operation not permitted`); retain that bounded host follow-up
caveat without guessing.

Boundary and preservation checks passed: HEAD remained
`32999753c730859cbcaa3c42227ff7195e63bdb7`, no staged or pre-existing tracked
delta was present before integration, the nonignored-untracked count remained
248 with sorted-list SHA-256
`aafdab71d16de49fbed96128a21aa50eb24bab80899d7ae3b44015e10630cc15`, and V1,
V2, and OWNER-MANIFEST remained respectively
`bac5e3c17f2ebcb46b2e17e9ef2fa2231fbb715e4672a8cc87fd44404e62a72a`,
`c68ddc34d489b3db69082c452880e9fee2dd9ce4e1a66aab96a856751a87defd`, and
`e19b663fb671e046727469832be1d160095eb5cb7d3ba54aa2818277043100ba`.

The only changed document paths are `journal.jsonl`, this RESULTS file,
`WORKFLOWS.md`, and `EXECUTION-PROGRESS.md`; the journal parses fully, its
46-line historical prefix is byte-identical, and `git diff --check` passes.
The preceding candidate snapshot is retained as provenance; it is superseded
by the sealed round-4 receipt below.

## Round 4 — PASS/GO SEALED

The six appended journal rows bank the completed fresh non-author judgment
tasks `phi0_round4_challenge_g`, `phi0_round4_challenge_h`, and
`phi0_round4_adjudication`, all actual `gpt-5.6-sol` xhigh, judgment-only,
tool-free, with `commands: 0`, `changed: []`, and `mutations: 0`. Their starts
truthfully carry `journaledAfterCompletion: true`; no session ID or timestamp
was invented.

- Challenge G: exact verdict **PASS**, with no blocker, major, or minor
  findings. The transient round-3 graph-owner session repetition is corrected
  by authoritative metadata; delayed journaling is conforming under the
  pre-registered round-4 amendment and immutable identity/chronology logs.
- Challenge H: exact verdict **PASS/GO**, with no blocking implementation or
  provenance finding. Its only disclosures are the nonblocking transient-ID
  and delayed-journaling history.
- Fresh lead adjudication: exact verdict **PASS/GO**. Both challenges
  converge; round 3 remains a historical failure, while round 4 is no longer
  source-fenced and needs no cure or replay. Total-tranche, wave, graph,
  surface, Stop, provenance, evidence, model-law, and inbound checks pass.

Adjudicated transitions: **#1 W-SURFACE-PIN IN-FLIGHT → SEALED**; **#75
W-STOP-HOOK IN-FLIGHT → SEALED**; **#2 W-REFRACT-DELETE source fence LIFTED
for already-registered subtraction, state UNSTARTED at that adjudication**.
At that intermediate point, the subsequent registered source/browser receipt
advanced #2 to an IN-FLIGHT landed candidate, pending exactly two fresh Sol
judgment-only challenges and one fresh Sol adjudication; the later Challenge
I/J and fresh adjudication below supersede that intermediate state. Blocking
remainder: none.
Routed remainder: value.js riders and the final consumer-boundary communique
remain in their existing rows.

## BK #2 — W-REFRACT-DELETE sealed mechanical source/browser receipt

The document-integration seat is actual `gpt-5.6-luna` at `xhigh`, session
`019faf4c-3867-77c2-9b36-997899951668`, banking the completed receipt at source
commit `82bdc93e`. #2 is **SEALED PASS**, `code_state=landed`, with
`evidence_state=adjudicated`; Challenge I PASS, Challenge J PASS, and fresh
adjudication PASS-and-seal. The eight intended paths are
`demo/main.ts`, the V3 summary and JSON, `src/components/tabs/SegmentedTabs.vue`,
`src/composables/glass/index.ts`, the deleted
`src/composables/glass/supportsBackdropRefract.ts`,
`src/styles/glass-refract.css`, and
`tests/components/custom/tabs/segmented-tabs.test.ts`. The receipt is 52
insertions/357 deletions overall and 5/199 for source+test; the detector is
deleted; the active forbidden-symbol census is zero. The provider/data URI is
preserved at length 2300 with SHA-256
`5a8181a31d1d7591527a2d4a2e0ebd3ba62a32a5c40e40f9917fc4ba2b67f8a3`.

The graph receipt is
`f2133ed209b266c02f302496eda11d46e95df5f33106b519dd9141b87560aaff`, with
summary 1496/3577/1963/101/72/1283, fatal ledgers zero, and focused graph
20/20. Focused Tabs/public-surface is 94/94; the full suite is 200 files and
1316 tests. Library, package, and demo builds pass; package is 205 targets,
482 declarations, 114 CSS, and 67 strict imports, and demo is 3513 modules.
Typecheck delta is zero, with only the historical TS2339 diagnostics at
`tests/styles/track-well-fold.test.ts` lines 20 and 30. The protected
untracked boundary is 248 with SHA-256
`aafdab71d16de49fbed96128a21aa50eb24bab80899d7ae3b44015e10630cc15`.

Browser evidence is from the internal in-app Browser at 1280x720 and 390x844:
one Tabs H1, no horizontal document overflow, no console warnings/errors, 7
`.segmented-indicator.glass-capsule` and 0 `.segmented-indicator.glass-lens`,
and root `data-glass-refract` absent. Clicking List then ArrowRight moved
selection and focus to Kanban while retaining the one indicator in that group;
phone Project view has combobox count 1. Historical MIGRATION and visual-test
prose remain provenance and are not active source blockers.

## BK #2 — fresh challenges and adjudication seal

Actual Luna seal-banking session: `019faf55-14e9-7552-8c63-2d7f7b31e167`; it is distinct from the prior candidate document-integration session `019faf4c-3867-77c2-9b36-997899951668`, which remains historical provenance.

- **Challenge I — PASS.** Exact tranche scope, KISS deletion optimality, every
  source/CSS/test/graph/browser/evidence feature, and the model law pass. #2
  may seal; no cure.
- **Challenge J — PASS.** Independent falsification found no
  runtime/public-surface/accessibility/motion/provider/consumer/evidence/
  provenance defects. Deletion is optimal; no cure.
- **Fresh adjudication — PASS-AND-SEAL.** Seal #2 at source `82bdc93e` / bank
  `bc26be1a`; no blockers, majors, minors, or cure. Row #2 transitions from
  IN-FLIGHT landed-candidate pending adjudication to SEALED PASS.
  `G-REFRACT-TOTAL` remains phrased to retire at Φ0 close because later
  registered Φ0 rows still remain. This completes #2 only, not total BK.
  Φ0/BK continue to the next registered rows; no new apparatus or release.

## BK Φ0 — 74c59ade source/browser candidate

This is mechanical banking only. The source owner was invoked as exact
`gpt-5.6-luna` xhigh through the packaged Codex CLI in session
`019faf60-4e81-7441-ab10-a301c17011f0`; the authoritative invocation command
was `/Applications/ChatGPT.app/Contents/Resources/codex -a never exec -m
gpt-5.6-luna -c model_reasoning_effort="xhigh" -s workspace-write -C
/Users/mkbabb/Programming/glass-ui --json`. The document session is literal
`session_meta=019faf93-716f-7af0-adfe-3c1e13229f5d`, also exact
`gpt-5.6-luna` xhigh. Lead browser adjudication used the core Sol xhigh seat.

The landed source slice at `74c59ade` is `demo/main.ts`, `package.json`,
`vite.style-assets.ts`, `vite.style-fold.ts`,
`tests/styles/backdrop-prefix-normalization.test.ts`, and regenerated graph V3
JSON plus summary: 425 insertions and 429 deletions including generated graph,
with no unrelated source. `motion=1` omits html `data-capture` and
`capture.css`, preserves light/dark, route, badge, warmup, readiness, and the
real clock, and is excluded from the story query; absence remains unchanged
still capture with unchanged `capture.css`. `demo:serve` is 5400. Structural
PostCSS normalization repairs either surviving backdrop-filter leg into adjacent
canonical same-value webkit/unprefixed pairs, covers `dist/glass-ui.css`,
preserves nested values and supports conditions, and does not extra-minify
top-level CSS.

Evidence is focused transform 1/1; graph V3 20/20 with receipt
`5224dd083da5d684da330a9015d016a85c4dd67cc8baa9cbb8fa2e5a3786bcb0`,
1,492 nodes / 3,569 internal edges / 1,967 external edges / 101 owners / 72
public entries / 1,283 public symbols, fatal ledgers zero; full suite 201 files
and 1,317/1,317 tests after raising only the existing graph hook timeout;
fresh library and demo builds pass; package validation is 205 targets, 482
declarations, 114 CSS files, and 67 strict consumer imports; emitted AST census
is 127 CSS files with 90/90 paired declarations, zero one-legged, zero
wrong-order, top-level 20 declarations, and zero one-legged. Typecheck delta is
zero with only historical `track-well-fold` TS2339 lines 20 and 30.
`capture.css` SHA-256 is unchanged at
`c502cf067adf12508f540873a00b5e917fe13aa781dd0cf6e66a89689955b420`.

At 1280x720, still has `data-capture`, 21 kill-selector hits, readiness, one
Tabs H1, zero overflow, and no warning/error. Motion dark has no `data-capture`,
zero capture selectors, readiness, one Tabs H1, zero overflow, no forwarded
motion query, nonzero 0.44s translate/width/height/scale transitions, and the
click moves focus and selection to List, with no warning/error. The protected
untracked boundary remains 248 with SHA-256
`aafdab71d16de49fbed96128a21aa50eb24bab80899d7ae3b44015e10630cc15`; V1/V2/
OWNER remain unchanged.

Row states remain honest: #3 `W-CAPTURE-MOTION` is IN-FLIGHT
`code_state=landed-candidate` at `74c59ade` with
`evidence_state=owed-first-motion-pi`, and cannot seal until the first real
motion pi at the row 22 grasp trace. The fresh Q bounded old-direction reversal
trace routes under this existing row to the `W-MOMENTUM-CENSUS` turn; the
existing SegmentedTabs width/height transition remains a P5 red under current
tabs/motion ownership. #4 is IN-FLIGHT `port-correction-landed` at `74c59ade`
while protected corpus reconciliation, artifact path, citation semantics, and
census remain. #5 is IN-FLIGHT `landed-candidate` pending exactly two fresh Sol
challenges and fresh Sol adjudication; no seal.

In the existing inbound/routed note, Q withdrew G-5 as cancellation only: no
Glass option, placeholder, API, alias, shim, sizing workaround, or replacement
adornment. Q owns consumer-only CompletionSeal deletion. No new run, wave, gate,
registry, control plane, or row is created. Journal parsing advances 68 → 70
valid JSONL lines, and the first 68 lines remain byte-identical.

## BK Φ0 — initial prefix challenge failures and 8be4f662 cure candidate

The two initial fresh challenges of the `74c59ade` prefix candidate are banked
in chronological order below. Both were fresh, non-author `gpt-5.6-sol` xhigh
judgment-only seats with no mutations. Neither exposed a session identifier;
none is invented. These are historical receipts, not current open findings
after the cure.

- **`/root/prefix_capture_challenge_a` — FAIL.** It had 0 blockers and 2
  majors. Major 1 found that `cssFilesUnder` was file/directory polymorphic,
  so commit `74c59ade` lost truthful graph operations and nodes: 1,496 → 1,492
  nodes, generator-write 7 → 3, unmodeled 272 → 279, with `dist/src`
  directory nodes missing. The required cure was a directory-only walker, an
  explicit single-file helper, and regeneration. Major 2 found that Q's G-5
  cancellation was narrated while active authority still reserved an
  adornment; the required cure was amendment of the existing G batch
  disposition, canonical terminal roster §C, and the dependent BJ cursor, with
  no new row.
- **`/root/prefix_capture_challenge_b` — FAIL.** It had 1 blocker, 1 major,
  and 1 minor. The blocker was that `demo:dist` omitted `publishStyleAssets`,
  leaving 7 webkit-only families in the static build: Timeline ×4, Slider
  reset, Dock reset, and segmented underline. It required a narrow demo
  `generateBundle` CSS hook and a census of both `dist` and `dist-demo`. The
  major required value+important pairing and recursive normalization through
  every CSS container, including nested at-rules, without cascade changes. The
  minor required the exact full-suite first-failure/rerun record: the first
  default run was 200/201 files and 1318/1319 tests with only the stale
  `dist-demo/index.html` freshness gate failing, not a timeout; after a fresh
  demo build, two default reruns passed 201/201 files and 1319/1319 tests.
No test-timeout or source-timeout edit was made.

The exact Luna xhigh cure source/mechanics session was packaged Codex CLI
session `019fafa7-44f4-7b02-8a42-cc2b3309e5ec`, actual invoked model
`gpt-5.6-luna`. Final cure commit `8be4f662` (`fix(BK/Φ0): close prefix
pipeline challenge gaps`) is based on candidate-bank HEAD `77540ffd` and
source candidate `74c59ade`. Exactly nine paths landed:
`demo/vite.demo-dist.config.ts`,
`docs/tranches/BJ/EXECUTION-PROGRESS.md`,
`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md`,
`docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V3-SUMMARY.md`,
`docs/tranches/BJ/audits/2026-07-28-library-dag/IMPORT-DAG-V3.json`,
`docs/tranches/BJ/coordination/ATLAS-Q-G-BATCH-DISPOSITION.md`,
`tests/styles/backdrop-prefix-normalization.test.ts`, `vite.style-assets.ts`,
and `vite.style-fold.ts` (509 insertions / 150 deletions including the
generated graph).

The cure restores a directory-only `cssFilesUnder` walk, an explicit
`dist/glass-ui.css` file helper, and the graph read/write closure; adds the
narrow demo `generateBundle` normalization hook; pairs value plus `!important`
and recurses through nested containers; adds mismatch/nested regressions; and
amends the G-5 terminal cancellation in the three existing authority docs.
No option slot, placeholder, API, alias, shim, fixed/min width, sizing
workaround, replacement adornment, row, wave, gate, registry, or parallel
control plane was introduced.

The current graph receipt is
`cf51835423ea0745c3504d6b8604e2d4c556b4598109e4be201bdba39830ebd0`:
1,497 nodes / 3,579 internal edges / 1,969 external edges / 101 owners / 72
public entries / 1,283 public symbols; fatal ledgers zero; generator-read 12,
generator-write 7, unmodeled 274. Graph focused tests and `generator --check`
passed. Relative to the rejected graph, this is +5 nodes, +10 internal edges,
+2 external edges, −5 unmodeled operations, +5 generator reads, and +4
generator writes; the parent generator closure is restored. Focused prefix
tests passed 3/3. `npm run build` and `npm run demo:dist:build` passed, with
3,513 demo modules. Package verification passed with
`npm_config_cache=/private/tmp/glass-ui-npm-cache npm run verify:package`:
205 targets, 482 declarations, 114 CSS files, and 67 strict imports. The
initial exact script was environmentally blocked by a pre-existing root-owned
npm cache; there was no package defect. Typecheck has zero new diagnostics;
only the pre-existing `scripts/lib/minify-css.mjs` TS7016 remains.

The emitted AST census is `dist`: 127 CSS files / 90 declarations / 45
canonical pairs, and `dist-demo`: 73 CSS files / 94 declarations / 47
canonical pairs; each has zero unpaired, noncanonical, value-mismatch, or
important-mismatch declarations. Core Sol xhigh in-app Browser verification at
1280x720 and 390x844 found one Tabs H1, zero horizontal document overflow, zero
console warning/error, no motion-mode `data-capture` or capture stylesheet,
desktop List click focus and `aria-pressed` transfer, exactly one visible phone
Project view combobox, and zero competing Project view tablist.

Row state remains bounded: #3 stays IN-FLIGHT at its existing `74c59ade`
source candidate; its first real motion π is still owed at the row 22 grasp
trace. The Q bounded reversal trace remains routed to `W-MOMENTUM-CENSUS`, and
the existing SegmentedTabs width/height transition remains the existing P5 red
under current tabs/motion ownership. #4 stays IN-FLIGHT at landed candidate
`5946f5ef` with `evidence_state=pending-two-fresh-Sol-challenges-and-adjudication`
and protected corpus/artifact/citation/census reconciliation unchanged. #5 is IN-FLIGHT at cured candidate `8be4f662`,
pending exactly two entirely fresh `gpt-5.6-sol` xhigh judgment-only challenges
and one fresh Sol xhigh adjudication; there is no seal or pre-approved PASS.
G-5 cancellation is active terminal authority owned by Q consumer-only
CompletionSeal deletion; Glass opens no replacement work. Historical
Fable/Opus/Sonnet artifacts remain literal provenance and are not relabelled.

## Row #4 shared cursor cure — candidate remains IN-FLIGHT

The immutable candidate is committed at `5946f5ef`. Two fresh non-author
judgment-only `gpt-5.6-sol` xhigh challenges examined that candidate and are
banked below without relabelling or mutation. Their starts and results are
recorded at journal lines 79–82 with `journaledAfterCompletion:true` because
the durable records follow the completed challenge turns; no session ID,
timestamp, or turn ID was exposed or invented.

- Challenge A, `/root/row3_motion_evidence_audit` — FAIL, 0 blockers / 1 major /
  0 minors. The sole major is the stale status-only cursor: it said the
  reconciliation was “staged” and exposed only
  `code_state=port-correction-landed`, despite the clean committed candidate
  at `5946f5ef`; this violated the independent state-field law. Everything
  else passed.
- Challenge B, `/root/bk_convergence_audit` — PASS, 0 blockers / 0 majors / 1
  minor. The sole minor is the same stale present-tense “staged” cursor wording;
  census, hash, ignore, evidence, journal, provenance, scope, and KISS checks
  all passed.

The current exact Luna xhigh document seat applies only this shared cursor cure
to the three allowed files. The cursor now records row #4 as `IN-FLIGHT` with
`code_state=landed-candidate` at `5946f5ef` and
`evidence_state=pending-two-fresh-Sol-challenges-and-adjudication`; it says the
candidate is banked/committed, not staged. The exact Luna session
`019faffb-647c-7500-9529-f0e203ff7e29` was exposed to the lead by the outer
invocation; no timestamp or turn ID was exposed or invented. The
candidate is cured/pending two entirely fresh Sol challenges plus fresh Sol
adjudication, sealed false.

Historical mechanical receipt facts remain unchanged and are not current state:
pre-disposition `248/14/0`, explicit staging reducing Git-visible untracked
paths to zero, journal base HEAD `d3c0a747`, and staged-path count `16`. Row
#16 remains `UNSTARTED`; #63 remains repo-weight later; #78 canon LAND remains
separate. No acceptance or seal is claimed.
