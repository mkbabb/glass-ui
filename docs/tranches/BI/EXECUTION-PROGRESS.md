# Perfected BI execution progress

This file is a guardian-readable projection, not execution authority. The
authoritative state is the selected branch's first-parent Git history plus its
committed wave receipts. The disposable cache and journals live under:

```text
git rev-parse --path-format=absolute --git-path tranche/BI
```

Do not infer a wave outcome from this prose, a commit subject, a worktree file,
or an elapsed task. `DONE` and evidence-backed `DEAD` exist only when the exact
receipt and commit tuple recover successfully.

## Current lineage

- Source base: `26c5ae686fd0f1181083aebda1215b00524555f1`
- Formation anchor: `f20a2aa96a6e165c331411ca771562f03807de27`
- Formation digest: `df19ceeba6bb52454eccdc2a7045749f0fa9070aa8348383f0312fb6ff452277`
- `BI.W-P000`: `DONE` at `1c2cda3a6eb600923fe79245cbc7157090c9cc18`
- `BI.W-P001`: `DONE` on the selected first-parent lineage. Its exact staged
  tuple, committed receipt, postcommit verification, two cacheless local
  reconstructions, and fresh-clone reconstruction all passed. Resolve the
  containing commit and receipt digest from Git; this projection deliberately
  does not self-embed them.
- `BI.W-P002`, `BI.W-P003`, and `BI.W-P004`: first resource-safe batch, ready
  for distinct RUNNING leases after this amended P001 tuple is reverified.
- `BI.W-P005` through `BI.W-P133`: `PLANNED` unless recovered Git authority says
  otherwise.

P000's routed packed-runtime RED remains owned by `BI.W-P127`; it is not counted
as PASS. Release, tag, publish, consumer adoption, and deployment remain
ineligible.

The current P000–P133 graph is executable and the cursor/envelope are not
count-locked. `BI.W-P014` owns generalized verifier CLI grammar: before full
projection claims it must accept P999/P1000/P10000 while rejecting P0000,
extended leading-zero forms, and malformed wave identities.

## Cursor commands

```sh
# Validate Git authority and any surviving private cache/journals.
node scripts/tranche/cursor.mjs validate --at HEAD

# Start an exactly-once wave transaction at the current HEAD.
node scripts/tranche/cursor.mjs start --wave BI.W-P002 --at HEAD

# Reconstruct without writing; surviving RUNNING journals remain RUNNING.
node scripts/tranche/cursor.mjs recover --at HEAD --read-only

# After the one wave commit exists at current HEAD, bind then terminalize it.
node scripts/tranche/cursor.mjs integrate --wave BI.W-P002 --commit HEAD
node scripts/tranche/cursor.mjs terminalize --wave BI.W-P002 --commit HEAD --status DONE
```

`start`, writable `recover`, `integrate`, and `terminalize` are current-HEAD-only
mutations. Historical refs are read-only. A surviving RUNNING journal makes a
second `start` RED; a terminal receipt makes every replay RED. `dependsOn`
controls builder launch, while `integrationRequires` separately controls the
serialized terminal commit. Only `DONE` unlocks ordinary dependents.
`BI.W-P002 DEAD` withdraws the complete formation.

## Per-wave close regime

Every wave closes through three distinct responsibilities:

1. a bounded research/implementation lane returns only its leased product diff
   and evidence;
2. an independent hardening lane attacks the wave's named invariant and
   required mutation bite without editing or integrating it; and
3. the orchestrator reconciles both results, updates the tranche projection,
   renders the receipt/projections, stages the exact envelope, and commits.

The orchestrator doubles back at both junctures: first against the exact staged
index before commit, then against the immutable containing commit after commit.
A passing builder report, elapsed run, or uncommitted test result is never a
wave completion.

The sole verifier executes semantics rather than merely validating receipt
shape. For every P002+ candidate it derives the exact ordinary test subjects
from the anchored wave, materializes raw selected Git objects without checkout
filters, archive attributes, or ambient worktree bytes, and requires the
complete enrolled file set with non-skipped passing assertions. A private,
OID-authenticated copy-on-write cache is disposable acceleration only. It
rebinds workspace dependencies into the selected tree, fingerprints the
external package boundary, and rejects any repository, dependency, sandbox,
ref, index, or Git-private mutation before interpreting child output.
Negative controls execute inside their own dependency boundary: a fixture may
create and remove a probe to prove timestamp-sensitive mutation detection, but
it may not contaminate the enclosing selected-view mirror or its external
package boundary. Tranche Vitest execution uses the runner config loader so the
harness does not create and unlink bundled configuration files inside the
guarded dependency tree; no cache path is exempted from fingerprinting.

P001 remains explicitly pre-projection-module and retains its named external
RUNNING-replay mutation plus exact restoration. P002 activates the pure
`verifyReleaseProjection` adapter and continuous attestation/FINAL projection;
P002 DEAD has one fixed formation-withdrawal projection, while every later DEAD
still passes through the active projection adapter. P014 owns the later
post-structure and browser/native discovery handoff. A tuple-only PASS, an
attribute-transformed view, or a residue-bearing child run is never success
credit.

P001 also carries the minimal operational prerequisite for P003's pre-dispatch
receipt obligation. Beneath the Git-private cursor root, every bounded Luna or
Terra lane receives one canonical, raw-byte-digested receipt before dispatch;
the receipt binds CURRENT-012, the formation and source base, exact integration
commit/tree, closed fanout role, read/write/evidence bounds, and an honest
`UNATTESTED` agent/model identity because this platform exposes no verifiable
provider identity report. Published receipts are append-only, active writes
are disjoint and lease-bounded, and at most three non-root lanes may be active.
An exact first attachment returns `AUTHORIZE_NEW_DISPATCH`; an ACTIVE retry
returns `RECONCILE_PLATFORM` and can never silently redispatch; a settled retry
returns `NO_DISPATCH`. These receipts and journals are operational state, not
tracked product or release evidence. Historical selection ignores them and
reconstructs from Git alone, while current-HEAD verification remains fail-closed
on malformed private state or an ACTIVE lane crossing a commit boundary.

## Integration sequence

The orchestrator alone starts transactions, mutates the index, renders receipts
and projections, stages, commits, integrates, terminalizes, and pushes. Builder
lanes receive bounded subject leases and never stage or commit.

P001 is terminal; P002, P003, and P004 are the first three-wide build batch.
P002 integrates first to activate continuous release attestation and FINAL
projection. P003 and later cannot integrate until that P002 activation tuple is
exactly green. Subsequent work follows the generated Kahn-ready strata and
exact path/resource leases; no prose ready list supersedes the DAG.

Every P001+ transaction uses one receipt and four core trailers. P002+ also
refreshes the attestation and FINAL artifacts and adds their two raw-byte digest
trailers. The digest order remains payload → receipt → attestation → FINAL →
commit, with containing commit/tree identity resolved externally from Git.
