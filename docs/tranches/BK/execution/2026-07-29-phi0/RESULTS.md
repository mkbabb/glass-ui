# BK Φ0 execution results — 2026-07-29

Run: `bk-phi0-20260729-01`

Historical registered script:
`docs/tranches/BJ/addenda/2026-07-24-refinement/wf/bk-phi0-execution.wf.js`

Post-cutover cure script:
`docs/tranches/BJ/addenda/2026-07-24-refinement/wf/bk-phi0-cures.wf.js`

Journal: `docs/tranches/BK/execution/2026-07-29-phi0/journal.jsonl`

**State: ROUND-4 PASS/GO SEALED; #1/#75 SEALED; #2 IN-FLIGHT WITH
`code_state=landed-candidate` AT `82bdc93e` AND
`evidence_state=mechanical-pass-plus-browser-pending-two-fresh-Sol-challenges-and-fresh-Sol-adjudication`; CANDIDATE/PENDING JUDGMENT, NOT SEALED.** The
committed registration is preserved byte-for-byte: two
Truth plus two Challenge results, 4/4. The early #75 Truth seat is a separately
late-accounted 1/1 amendment, yielding five actual pre-cutover seats without
rewriting the original run. Cure rounds 1 and 2 failed honestly. Round-3 Sol
judgment/implementation candidates landed and exact `gpt-5.6-luna` xhigh
mechanical re-attestation passed, but fresh Challenge G/H and the lead
adjudication completed FAIL/NO-GO. Round 4 stays in the same run: exact Luna
graph, surface, and document-integration owners, two fresh Sol judgment-only
challenges, and one fresh Sol adjudication. Terra was neither substituted nor
relabelled. The round-4 evidence is sealed below; #2's source fence remains
lifted only for the already-registered subtraction, and its completed
source/browser receipt is banked below as a landed candidate, not a seal.

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
The subsequent registered source/browser receipt advances #2 to an IN-FLIGHT
landed candidate, still pending exactly two fresh Sol judgment-only challenges
and one fresh Sol adjudication before sealing. Blocking remainder: none.
Routed remainder: value.js riders and the final consumer-boundary communique
remain in their existing rows.

## BK #2 — W-REFRACT-DELETE candidate mechanical source/browser receipt

The document-integration seat is actual `gpt-5.6-luna` at `xhigh`, session
`019faf4c-3867-77c2-9b36-997899951668`, banking the completed receipt at source
commit `82bdc93e`. #2 is **IN-FLIGHT**, `code_state=landed-candidate`, with
`evidence_state=mechanical-pass-plus-browser-pending-two-fresh-Sol-challenges-and-fresh-Sol-adjudication`;
this is candidate/pending judgment, not sealed. The eight intended paths are
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
prose remain provenance and are not active source blockers. Required next
seats are exactly two fresh `gpt-5.6-sol` xhigh judgment-only challenges and
one fresh Sol adjudication.
