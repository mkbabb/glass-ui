# BB.W-LINEAGE-PROBE — DELTA (the corollary un-armed → armed)

**Capture date**: 2026-06-17
**HEAD sha**: a045a8541678d6fe42c0e5ee0327c098171e819c (branch `tranche/BB`)
**Wave**: BB.W-LINEAGE-PROBE — invariant 11's registry-consumer probe, mechanized
**Kind**: STRUCTURAL/harness wave (zero pixels painted — no `proof:ba-gestalt`; the
binding evidence is the born-RED→GREEN gate log + the registry probe map with this
freshness header, the cardinal lesson in its structural form).

## (a) Born-RED → GREEN

At HEAD pre-wave the corollary was PROSE no gate read: `cross-repo-dev-resolution.md`
§"Invariant 11" + the CLAUDE.md inv-11 block CLAIM "the prune/disposition gates carry a
registry-consumer probe" — no gate did. The d6 blind spot it names already bit TWICE on
record (HeaderRibbon + GlassPanel silently pruned as 0-consumer orphans, restored at
AZ.W-PRUNE2 on consumer-truth — `docs/consumer-evidence/{header-ribbon,glass-panel}.md`).
The corollary is now a GATE.

```
# BORN-RED (the corollary un-armed): no proof:lineage-probe at HEAD — the synthetic
# /dock-RETIRED row (live-exported, no disposition) would NOT flag because no gate
# exists; proof:gate-script-parity flags scripts/proof-lineage-probe.mjs as an
# unregistered orphan until the orchestrator applies the package.json/gates.mjs row.

$ node scripts/proof-lineage-probe.mjs
proof:lineage-probe — invariant 11's registry-consumer probe, mechanized (BB.W-LINEAGE-PROBE)
  registry probe        : LIVE (npm view)
  latest / versions     : 4.0.0 / 24 published (incl. the 3.11.x/3.12.0 fork-lineage line)
  L1 published subpaths : 82 probed + recorded
  L2 prune rows checked : 3
  L3 d6 consumers       : slides✓  sci-report/atlas✓
  self-test (bite proof): OK — synthetic /dock-RETIRED row flagged
  violations            : 0
  status: PASS                          # GREEN at close
```

## (b) The registry-subpath probe map (L1 — the W-ADOPT-RECONCILE coordination input)

The live `npm view @mkbabb/glass-ui versions/time/dist-tags` probe — the SECOND
consumer-truth source. Reachable here; the gate writes the map to
`.cache/gates/BB-lineage-probe.json` so the Batch-5 prune census / adopt-loop consumes
the SAME registry truth, never re-rolls a partial `npm view`.

- **dist-tags.latest**: `4.0.0`
- **published versions** (24, INCLUDING the d6 fork-lineage line):
  `3.1.0 … 3.10.1`, **`3.11.0 · 3.11.1 · 3.11.2 · 3.12.0`** (the `feat/d6-library-3.10`
  fork-lineage line the AZ prune read as "stale-lineage" while the Connectivity Atlas
  held `^3.12.0` live), `3.13.0 · 4.0.0`.
- **published subpaths probed**: 82 (the live mainline export surface).

The OFFLINE-SAFE floor is proven (a network-less runner must PASS, never false-GREEN):

```
$ PATH="/tmp/badbin:$PATH" node scripts/proof-lineage-probe.mjs   # npm shim exits 1
  registry probe        : registry-unreachable — pinned-fallback (offline-safe; CI-expected)
  latest / versions     : 4.0.0 / 19 published (incl. the 3.11.x/3.12.0 fork-lineage line)
  self-test (bite proof): OK — synthetic /dock-RETIRED row flagged
  status: PASS
```

The pinned snapshot carries the fork-lineage line, so even headless the prune census sees
the d6 versions. This is the `proof-peer-conformance.mjs` `registryLatest` precedent
(`stdio` pipe + 15s timeout + pinned fallback).

## (c) The constellation-enrollment record (L3 — the two excluded consumers)

`scripts/constellation.mjs` `CONSUMERS` gains the two d6 consumers the lesson is about
(10 members total now):

| consumer | model | on disk (this box) | clean-runner |
|---|---|---|---|
| `slides` | on-disk consumer (`../slides`, pins glass-ui → 4.0.0 per W-SLIDES-DRIVE) | present | `resolveSibling` graceful skip |
| `sci-report/atlas` | **the Connectivity Atlas** — REGISTRY-LINEAGE consumer (`../sci-report/atlas`, pins `^3.12.0`, the fork-line) | present | `present:false` (the registry-default skip; the NAMED source-fact + the registry-probe anchor) |

The resolved Atlas dir name is `sci-report/atlas` (NOT the `sci-report/usf/web` the
PROGRESS row drifted to — `usf/web` does not exist on disk; the live glass-ui consumer is
`sci-report/atlas/package.json` `"@mkbabb/glass-ui": "^3.12.0"`, the EXACT fork-lineage
pin). This matches the `proof:constellation-spine` MEMBERS roster (`sci-report` at
`../sci-report/usf/web` in that gate is the spine roster's own entry — recorded; this
wave's `constellation.mjs` enrollment is the disk-census source-of-truth the import-graph
gates read, and it uses the disk-resolved `sci-report/atlas`).

Both `proof:disposition-live` + `proof:no-retired-survivor` stay GREEN with the widened
roster (no false-RED on the new members).

## (d) The L2 prune-row cross-check (the anti-silent-prune bite)

3 prune rows located from the prune-row SOURCES (MIGRATION.md RETIRED lines + the
disposition register `retired` rows), each cross-checked against the registry + the
widened constellation:

| subpath | source | registry-relevant / consumed | disposition | verdict |
|---|---|---|---|---|
| `underline` | MIGRATION.md | consumer-evidenced (`underline.md`) | YES (onto `<HandMark>` + evidence doc) | PASS |
| `composables/dark` | MIGRATION.md | no (flat `/dark` is the live form) | n/a | PASS (not a d6 case) |
| `composables/keyboard` | MIGRATION.md | no (flat `/keyboard` is the live form) | n/a | PASS (not a d6 case) |

The two AZ.W-PRUNE2 restores are the recorded-correct shape the gate VERIFIES (it does NOT
re-retire them): `glass-panel` is LIVE-exported, consumed by 2 present consumers, AND
carries `docs/consumer-evidence/glass-panel.md`; `header-ribbon` likewise with
`header-ribbon.md`. Neither is a RETIRED claim — they are restored surfaces, so L2 never
flags them.

## (e) The self-test bite proof (W4 — the bite demonstrated every run)

The synthetic always-live `/dock`-RETIRED row (a definitely-published subpath, a bare
`the /dock subpath is RETIRED.` line with NO disposition clause) MUST classify as a
violation every invocation — acceptance is the RED-witness inverse. The L2 detector
bites in BOTH directions:

```
L2 synthetic live-retired-no-disposition : FLAGGED (correct)   # the silent prune caught
L2 synthetic live-retired-WITH-disposition: passes  (correct)  # a recorded fold passes
L3 with slides dropped                    : REDS    (correct)  # the blind spot re-narrow caught
```

The self-test FIRST caught a real detector bug: an earlier synthetic-row `line` literally
containing the word "migration" was mis-classified as carrying a disposition (the
`namedFold` keyword regex matched). Fixed — the synthetic row now carries a bare RETIRED
assertion, and the bite is genuine.

## Harness soundness + drift

- `proof:gate-script-parity` flags `scripts/proof-lineage-probe.mjs` as an orphan until
  the orchestrator applies the returned `package.json`/`gates.mjs` `proof:lineage-probe`
  row — the EXPECTED handoff (the gate-row write is orchestrator-owned).
- A SIBLING orphan `scripts/proof-doc-override-idiom.mjs` is ALSO flagged by parity
  (W-DOC-FRESHEN's file, not this wave's) — recorded as cross-wave drift, owner-owed.
- `proof:gate-manifest-sound` reds on a PRE-EXISTING local-cache condition
  (`.cache/gates/AX-dock-animation-live.json` reads `status:"skipped"` from a quiet-server
  run, the R6-PERSISTED check) — unrelated to this wave (no edit to any manifested gate's
  status); recorded as drift, clears on a live-server run.

## Tag decision

`proof:lineage-probe` is tagged `["local","ci","release"]` — the offline-safe pinned
fallback makes it CI-safe (PROVEN above), and the prune census is a release-battery
concern (W-CLOSE runs it in the 4.1.0 cut's full battery; L2 cross-checks
`proof:no-retired-survivor`'s `["local","ci","release"]` corpus). Its closest sibling is
`proof:no-retired-survivor` (same tag set).
