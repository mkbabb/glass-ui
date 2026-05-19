# Constellation Manifest — `@mkbabb/*` ecosystem (Q tranche open baseline)

**Artefact class**: `coordination/CONSTELLATION.md` (canonical multi-peer manifest per M.Rδ P2 invariant).
**Date**: 2026-05-18 (Q open).
**Carries forward from**: P close `9f774b4` (v1.8.4) + post-P shadow cohort HEAD `d244dd5`.
**Authoring authority**: Q orchestrator (glass-ui-side).

## §1 — Repo inventory (Q-open baseline)

| Repo | Path | glass-ui pin | Last glass-ui-relevant state | Status @ Q open |
|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | n/a (origin) | P close `9f774b4` (v1.8.4) + 7-commit post-P cohort HEAD `d244dd5` | active; Q (this) |
| **value.js** | `/Users/mkbabb/Programming/value.js` | `file:../glass-ui` | P.W5 Lane A commit `755b3cd` on `w.w2.1-value-js-prebuild` WIP branch (NOT pushed per PD-3 archive) | **REPORTED BROKEN** — dock / animations / dropdowns / glass-cards |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | `file:../glass-ui` | P.W5 Lane C commit `2183f32` (pushed origin/master) | **REPORTED BROKEN** — same surfaces |
| **fourier-analysis** | `/Users/mkbabb/Programming/fourier-analysis` | `file:../../glass-ui` | P.W5 Lane B commit `4df1a06` (pushed origin/master) | Q round-2 re-audit |
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy` | `file:../glass-ui` | P.W5 Lane D commit `dafb99f` (local; no remote) | Q round-2 re-audit |
| **words/frontend** | `/Users/mkbabb/Programming/words/frontend` | `file:../../glass-ui` | P.W5 Lane E commit `5c1b2b8` (pushed origin/master) | Q round-2 re-audit |
| **speedtest** | `/Users/mkbabb/Programming/speedtest` | `file:../glass-ui` | AC tranche closed; AD tranche opened post-AC | Q round-2 re-audit; AD-tranche coordinate |
| **precepts** (submodule) | `docs/precepts` | n/a | P close `3310a8c` (invariants 28-29 + LL 51-53) | Q may advance (π re-activation candidate) |

## §2 — Q-open headline: consumer breakage

The user reports value.js + keyframes.js have "totally broken" dock / animation / dropdown / glass-card surfaces. Both pin glass-ui via `file:../glass-ui` — they consume the glass-ui dist (or `src/` via the `development` conditional export). The breakage is attributed by Q.Rα + Q.Rζ to one of:

1. P.W5 cross-repo write error (value.js `755b3cd` / keyframes.js `2183f32`).
2. post-P shadow-cohort substrate regression (`099d51e` dock + `beec35e` toggle/dock + `3cb70db` timeline — consumers pick these up through the `file:` link).
3. glass-ui v1.8.x surface change the consumer never migrated to.

## §3 — Post-P shadow cohort (4th K-invariant-3 recurrence)

7 commits `9f774b4..d244dd5`, untagged (1 carries a speedtest-AD reference):

```
949474a refactor(freshness): retire freshness apparatus (AD.W4.T2)
099d51e fix(dock): retire purposeless edge-fade mask
3cb70db feat(timeline): stitched continuous gradient
beec35e fix(toggle,dock): card variant sizes to content + inactive dock layers hit-test
9ba68ca feat(metric-stack): compact result register
1c6c3e5 feat(data-table): responsive card-per-row projection
d244dd5 fix(metric-stack): tame the result register
```

The retrospective folder + tranche attribution is a Q wave deliverable. The cohort is the prime suspect for the consumer breakage.

## §4 — Writer-vs-reader boundary (Q expanded scope)

| Repo | Q role | Q orchestrator may write? |
|---|---|---|
| glass-ui | primary; Q is its tranche | yes |
| value.js | REPORTED BROKEN; P.W5 write on WIP branch | WRITER permitted at Q remediation wave (the breakage forces the WIP-vs-master question P deferred) |
| keyframes.js | REPORTED BROKEN | WRITER permitted at Q remediation wave |
| fourier-analysis / bbnf-buddy / words/frontend | P.W5 consumers | READER at round-2; WRITER permitted if Q remediation surfaces a cross-repo fix |
| speedtest | AD tranche in-flight | READER-ONLY; AD coordinate |
| precepts (submodule) | Q may advance | orchestrator-solo |

## §5 — Cross-repo wave-timeline expectation (provisional; finalized post-synthesis)

| Q wave | Cross-repo action |
|---|---|
| open (research) | 6-agent round-1 audit (read-only) + Playwright visual probe |
| round-2 | 6-agent consumer audit (read-only) |
| implementation waves | TBD per Q.md synthesis; the consumer-breakage remediation is the headline — substrate fix at glass-ui + consumer re-writes |
| close | strengthened audit + consumer re-audit + visual-runtime re-probe + FINAL.md |

## §6 — Q.W1 close — fleet un-break state (2026-05-18)

The cross-repo dev-resolution desync is closed. `proof:resolution` PASSES across the constellation.

| Repo | W1 commit | State |
|---|---|---|
| glass-ui | (W1 close) | phantom devDep retired; publisher `default` key; resolver config |
| keyframes.js | `6af80ad` | fleet keystone — `exports` 4-key shape; build GREEN |
| fourier-analysis | `926ca6a` | resolver sweep; builds + paints |
| bbnf-buddy | `a0db827` | resolver sweep; builds |
| words/frontend | `e05e5bf` | resolver sweep; builds |
| speedtest | `b33f58b0` | resolver sweep + manualChunks cleanup; builds |
| value.js | (patch — uncommitted) | picker 0×0 fixed + `default` key APPLIED; handed over as `W1-Lane-I-valuejs.patch` — value.js team owns the commit (58-file in-flight tree) |

All 6 consumer repos build + typecheck GREEN. Consumer commits are local (not pushed — cross-repo push held pending explicit authorization).
