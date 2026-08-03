# Claude workflow reconciliation — Candidate 2

**Observation pin:** 2026-07-22T01:06:33-04:00  
**Mode:** read-only reconciliation of the Claude implementation lane; no workflow, process, product
source, test, evidence, commit, or Claude-owned receipt mutation was performed.

## Verdict

`wf_689ca3dc-541` is **still running and productive, but not Candidate-2 acceptance-clean**. It has
banked two sound shipped-defect source repairs, one rejected W8 redress, and one useful but incomplete
composited-signal subset. Its W6 codemod is present only in the moving worktree at this pin. No phase-2
wave is presently entitled to a tranche-DONE label:

- MATERIAL W7 is source/cascade/package GREEN and acceptance RED;
- MATERIAL W8 is source/build GREEN and integration/acceptance RED;
- `f0d32d69` exists in history but is rejected for acceptance;
- `626540ad` receives narrow literal-white source credit, not unified `R-COMPOSITED-SIGNAL` or
  BLUR-LADDER acceptance;
- W6 is in flight and uncommitted; W1, W2 BLUR-LADDER, and W4 have no landing in the phase-2 commit
  range;
- the all-Opus launch posture and Opus closer/challenge claims are prospectively contradicted by the
  already-active Sol x-high/Luna x-high law. Historical model labels remain factual receipts and must
  not be rewritten, but they cannot supply the missing law-compliant acceptance.

The safest response is not to disturb the live run. Treat all remaining outputs from this already
launched all-Opus workflow as implementation/source candidates until the Candidate-2 asks are
closed on exact bytes by the required declared models.

## Exact session and repository pin

- Branch `master`; HEAD `626540adbe10fd84f47b8365977925a7fbd2e17a`; tree
  `c96ac03d4afb06455cc35096933410b14df2966f`.
- Phase-2 launch base `562db5c7429373220a4f1ec4e67470d65fcdbd91`; tree
  `33a31a1fad0342c3bd31a8535d4ab7c095034095`.
- Claude session `e79fce3f-d24e-4654-8b27-d029653fedbe`; authoritative log
  `/Users/mkbabb/.claude/projects/-Users-mkbabb-Programming-glass-ui/e79fce3f-d24e-4654-8b27-d029653fedbe.jsonl`.
  At the inspected EOF it had 11,635 records, 48,184,240 bytes, and SHA-256
  `bc586da7bb5590627a8f01ec50bf99526bb3a3491bd5ea6d620e26835de912e2`.
- Relevant launch records only: line 11628 records task `wzaa8v1bt`, run `wf_689ca3dc-541`, the
  phase-2 material summary, and the all-Opus/Fable-outage posture at
  `2026-07-22T03:21:08.579Z`; lines 11630–11632 record the launch and first seat
  `ae969e6c8b84c75b0` with declared model `opus`; line 11634 records the seven-lane claims and
  receipt promise; line 11635 is the EOF turn-duration record with `pendingWorkflowCount: 1`.
  There is no later completion or receipt record in this session log.
- Pre-addendum moving-tree snapshot at the observation pin: 76 tracked dirty paths and 11 untracked
  paths. SHA-256 of `git status --porcelain=v1` output:
  `623a5a7e8a6cdaa21765235571927eec407406b906ab5e7e61ce8f9851a9cb19`; SHA-256 of
  `git diff --binary` output:
  `37c3fdb27eeddc40e029c89a3d6b7e8dc42daa725c16ae992884b4c5a9fccc99`; SHA-256 of the
  sorted `git ls-files --others --exclude-standard` path set:
  `e728f833afb0202b18379b0f5cdf05fec043240016c553513c159707f37c75c6`.
  This is an audit snapshot of a shared moving tree, not a clean-state claim or a substitute for the
  Claude receipt.

## Control-surface pin

- Claude receipt `coordination/CLAUDE-SOL-IMPL-RECEIPTS.md`: SHA-256
  `86a988072fda1bac6612e95b4da801ee5a1caa7c28ffdaa20068fc6e6f4de352`. It still contains only
  the pre-split row ending at `562db5c7`; none of the six phase-2 commits or a post-landing dirty
  digest is recorded.
- `IMPLEMENTATION-ASKS-C2.md`: SHA-256
  `bcfebd82916e8cd93c515813c3897daf9b32e062dbda916ecb560dca81f9e912`.
- `IMPLEMENTATION-RECONCILIATION.md`: SHA-256
  `61e2edb9f616b04448da307655c7acc3a75762aade7f36d816094c6cb76f0379`.
- `REGISTRY.md`: SHA-256
  `a37033e7cb92e9629c482925d481c4c4b94286546aed42eb29ae2662b03dea67`.
- `GATES.md`: SHA-256
  `714ce20664a4e611de067f91739fa102a1b0a8c1ed28c3c85cbafb74d3188579`.

These Candidate-2 surfaces are the current acceptance contract. They do not transfer source/test/
evidence/commit ownership to the Sol formation lane, and they do not authorize editing the
Claude-owned receipt from this lane.

## Phase-2 commit reconciliation

| commit | exact role | Candidate-2 disposition |
| --- | --- | --- |
| `4442b45106f9c83796219aefdab2b5cb2352dbc8` | MATERIAL W7 source landing; tree `e3fc42f6c630369775909555d13a43aa95b6af21`; parent is the launch base | **Landed and retained.** The two central imports are source/cascade/package GREEN. The broader gate instrument, routed K4 receiver matrix, retained Chromium/Safari paint/removal evidence, receipt, and amended-byte critics remain RED. |
| `2ad97ca1b0621882486cabe7363c6ba364b03aa0` | W7 close-stamp correction; tree `496ba08fc6a2e79b8518ef2c494b4666a1902bb4` | **Landed metadata, superseded as a DONE close.** It correctly points to `4442b451`, but cannot waive the Candidate-2 acceptance remainder. |
| `44621bb4af3a142dbdebb6a7ba6bbefa4dcbcbf7` | MATERIAL W8 source/evidence landing; tree `2cd7a1a1132d6a95f72fad7edd05ec568cd8e04a` | **Landed and retained as SOURCE/BUILD-GREEN.** The safe blur floor and public root export stand. Lifecycle totality, collision safety, honest recapture, three latch arms, public-root adoption, receiver proof, replayable evidence, receipt, and post-redress critics remain RED. |
| `bb33810cb26debe77436c59df231814693b6fe65` | W8 close stamp; tree `617c96c58cbacb8ecbbcdc14eca54b973f12e209` | **Landed metadata, superseded as a DONE close.** Candidate-2 exact-byte critics retain the source while rejecting acceptance. |
| `f0d32d6915790ea97df383a4a486e3296f2b43d5` | W8 component-auto-arm redress; tree `fdd332f76bc19a8302f923f2911137f62b517450` | **Landed in history, contradicted and rejected for acceptance.** `SegmentedTabs.onMounted` hides application-root adoption, burdens lens-free `/tabs` consumers, and leaves the detector/gate defects. Remove the component arm only through a subsequent owned commit; do not rewrite history or discard the retained root export. |
| `626540adbe10fd84f47b8365977925a7fbd2e17a` | `R-COMPOSITED-SIGNAL` partial; tree `c96ac03d4afb06455cc35096933410b14df2966f` | **Landed as a useful source subset only.** The pure source-over leaf may remain, but first-half-opaque background selection, discarded alpha, absent gradient/lower-layer representation, tautological fixed-white test, unchanged GlassDock null-getter seam, and unproved Atlas witness keep the unified contract RED. Its explicit deferral of the second producer half is rejected. It is not MATERIAL W2 BLUR-LADDER. |

The exact phase-2 ancestry is linear:

`562db5c7` → `4442b451` → `2ad97ca1` → `44621bb4` → `bb33810c` → `f0d32d69` → `626540ad`.

## Running, pending, and superseded claims

### Still running: W6 TYPE-CODEMOD

The moving tree contains a complete-looking W6 mechanical cut but no W6 commit. At the observation
pin:

- HEAD remains `626540ad`;
- the live tree has zero strict `text-sm`/`text-xs` utilities and zero numeric raw type arbitraries;
- the diff removes 128 `text-sm`, 97 `text-xs`, and nine raw arbitraries, and adds 128 `text-small`
  plus 106 `text-micro` uses;
- `tests/gates/type-hygiene.test.ts` is untracked;
- `docs/tranches/BJ/waves/BAND-MATERIAL.md` is tracked-dirty and already says W6 `§CLOSE — LANDED`
  under `claude-opus-4-8`.

That prose is premature at this pin: W6 is **in-flight/uncommitted**, not landed. The zero-residual
census is useful implementation evidence, but it is not a commit, dual-engine paint proof, exact-byte
challenge, or law-compliant close.

### Pending: W1, W2 BLUR-LADDER, W4 TRACK-DRY

No commit in `562db5c7..626540ad` lands these three canon lanes. Existing pre-launch dirt in radius and
other shared files cannot be attributed to them as acceptance. The `626540ad` subject's “MATERIAL W2”
wording names the composited-signal amendment merged into that owner; it must not be mistaken for a
BLUR-LADDER landing. These claims remain queued or unverified, not landed.

### Deferred: W3 and W5

Deferring GRADED-BACKDROP-JUDGE and ARISTOTLE-PROPORTION rather than guessing paint taste remains
sound. The destination is superseded: current judgment/design work belongs to a declared **Sol x-high**
seat, not a future Fable seat and not Opus. ASK-26/MATERIAL W3 still controls the conditional cohort.

### Parked row disambiguation

The launch statement that “W7 is parked as AP-33” refers to **REDUCTION W7**, not MATERIAL W7.
Candidate-2 `R-PARK-W7` keeps REDUCTION W7 parked on ASK-33. MATERIAL W7's source landing therefore
does not contradict the park.

### Model and receipt law

The workflow launched all-Opus after the session had already acknowledged the prospective Sol/Luna
supersession. Candidate-2 `R-MODEL-LAW` is active immediately: Sol x-high owns design, judgment,
audit, critique, and acceptance; Luna x-high owns bounded mechanical work. Therefore:

- record every Opus model identifier honestly as historical execution fact;
- do not relabel those seats or erase their sound source output;
- do not count an Opus self-close or Opus critic pair as the missing Candidate-2 acceptance;
- use declared Luna x-high for bounded redress and declared Sol x-high for design/judgment and two
  fresh post-edit critics;
- keep the Sol formation lane read-only with respect to Claude-owned source/tests/evidence/commits and
  the Claude receipt.

The receipt-channel creation claim is true; the per-commit relay is not yet performed. The promise was
phrased as an on-workflow-landing action, and the session still reports the workflow pending, but W7/
W8 close prose already outran the per-wave receipt obligations. Candidate 2 must continue to treat the
ledger as stale until Claude appends the exact commits, then-current digests, model facts, and contract
conflicts.

## Safest next natural-boundary steer

Do not pause, edit, resume, or restart `wf_689ca3dc-541`. Deliver this steer at its completion callback,
before the Claude lane pipelines another band:

> Preserve Claude ownership of product source, tests, evidence, commits, and the receipt. First append
> `4442b451`, `2ad97ca1`, `44621bb4`, `bb33810c`, `f0d32d69`, `626540ad`, every later workflow commit,
> and the then-current status/tracked-patch/untracked-path digests to the Claude receipt. Record W7 as
> source/cascade/package GREEN but acceptance RED; W8 as source/build GREEN with `f0d32d69` rejected;
> `626540ad` as a partial composited-signal subset; and W6/W1/W2/W4 outputs as source candidates until
> exact-byte closure. Preserve historical Opus labels without granting acceptance. Consume Candidate-2
> I-1 through I-7 with declared Luna x-high bounded redress and declared Sol x-high design/judgment plus
> two fresh post-edit critics. Do not revert the correct W7/W8 source repairs, rewrite history, touch
> Sol-owned formation surfaces, or pipeline the next band before this receipt-and-routing boundary.

This steer leaves the authoritative workflow running undisturbed, preserves both ownership lanes, and
applies the current model law at the first safe external boundary rather than manufacturing a mid-run
restart.
