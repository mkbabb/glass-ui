# Constellation Manifest — `@mkbabb/*` ecosystem (AB tranche; retrospective)

**Artefact class**: `coordination/CONSTELLATION.md` (canonical multi-peer manifest per M.Rδ P2 invariant).
**Scope**: every repo participating in the AB cohort + the speedtest canonical-consumer relationship.
**Date authored**: 2026-05-14 (retrospective at O.W0 Lane A; AB ran without a live CONSTELLATION manifest).
**Date represented**: 2026-05-12 22:42 EDT (AB open) → 2026-05-13 17:45 EDT (AB.W4 post-close substrate coda).
**Authoring authority**: O.W0 Lane A orchestrator (glass-ui-side).

## §1 — Repo inventory at AB open

| Repo | Path | Vue? | glass-ui pin | AB tranche letter | AB role | Notes |
|---|---|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | n/a (library) | n/a (origin) | AB (this) | substrate writer | M close `54a8acb` (v1.0.5); precept submodule `46d6cfb` |
| **speedtest** | `/Users/mkbabb/Programming/speedtest` | yes | `file:../glass-ui` | **AB (concurrent)** | canonical consumer + cross-repo wire writer | Speedtest's own AB cohort runs concurrently with glass-ui AB; speedtest is THE canonical AB consumer per every per-substrate wire claim. Speedtest writes its own consumer-side AB code in lockstep |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | yes | `file:../glass-ui` | (not AB) | reader-only | M.W1 Lane A commit `b788205` on user WIP branch (no push) |
| **value.js** | `/Users/mkbabb/Programming/value.js` | yes (demo) | `file:../glass-ui` | (not AB) | reader-only | M.W1 Lane B commit on user WIP branch (no push) |
| **words** (frontend) | `/Users/mkbabb/Programming/words/frontend` | yes | `file:../../glass-ui` | (not AB) | reader-only | M.W1 Lane D commit `0f16925` on master + pushed |
| **fourier-analysis** (web) | `/Users/mkbabb/Programming/fourier-analysis/web` | yes | `file:../../glass-ui` | (not AB) | reader-only | M.W1 Lane C commit `301a95e` on master + pushed |
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy` | yes | `file:../glass-ui` | (not AB) | reader-only | M.W1 Lane E commit `e06d629` on master (no origin remote) |
| **precepts** (submodule) | `docs/precepts` | n/a | n/a | (not AB) | unchanged at AB | `46d6cfb` at M close; N.W0 advances to `b8af314` with invariants 21-24 |

## §2 — Cross-repo touchpoint map

```
                  ┌──────────────┐
                  │  glass-ui    │
                  │  AB cohort   │
                  │  v1.0.5 →    │
                  │  v1.1.0      │
                  └──────┬───────┘
                         │
                         │ peer-dep / file: link
                         ▼
                  ┌──────────────────────────────────────────┐
                  │  speedtest (canonical AB consumer;       │
                  │  speedtest AB cohort runs concurrently)  │
                  │                                          │
                  │  AB.W1.T2 .results-card chassis adoption │
                  │  AB.W1.T5 dock-label sweep across        │
                  │            DockTabButton text spans      │
                  │  AB.W2    GlassTimeline continuous       │
                  │            variant adoption              │
                  │  AB.W3.T1 Pulse aura × 5 surface cap     │
                  │  AB.W3.T2 Progress sectioned at         │
                  │            MeterColumn under-bar         │
                  │  AB.W4    --shadow-dock-override recipe  │
                  │            at <GlassDock>                │
                  └──────────────────────────────────────────┘

   (M.W1-migrated reader-only consumers at v1.0 surface — not participating in AB)
   ┌──────────────────────────────────────────────────┐
   │  words / fourier-analysis / bbnf-buddy           │
   │  keyframes.js (WIP) / value.js (WIP)             │
   └──────────────────────────────────────────────────┘
```

## §3 — Writer-vs-reader boundary per-repo (AB tranche)

| Repo | AB role | AB orchestrator may write? |
|---|---|---|
| glass-ui | primary; AB is its tranche | YES (every wave) |
| speedtest | canonical AB consumer; runs its own AB cohort concurrently | WRITER (consumer-side AB adoption); the user authored the consumer changes in lockstep with each glass-ui AB wave |
| keyframes.js | reader-only; not participating in AB | READER-ONLY |
| value.js | reader-only; not participating in AB | READER-ONLY |
| words (frontend) | reader-only; not participating in AB | READER-ONLY |
| fourier-analysis (web) | reader-only; not participating in AB | READER-ONLY |
| bbnf-buddy | reader-only; not participating in AB | READER-ONLY |
| precepts (submodule) | unchanged at AB | unchanged |

## §4 — Per-wave cross-repo coordination

| AB wave | glass-ui substrate | Speedtest consumer-side action | Verification at HEAD |
|---|---|---|---|
| AB.W1 | `--chassis-max-block-size` token + `.dock-label` @utility | AB.W1.T2 — `.results-card` chassis consumes the new token; AB.W1.T5 — `text-heading` → `dock-label` sweep across DockTabButton text spans | Per N11/f speedtest audit + O11/f speedtest audit — consumed at HEAD |
| AB.W2 | `<HoverPopover>` `v-model:open` + `<GlassTimeline>` Option C structural split + 4 fixes | Speedtest PhaseTimeline + ConvergenceTimeline consume continuous variant; controlled-cadence hover events route through `update:open` | Per O11/f speedtest audit — consumed at HEAD |
| AB.W3 | `<Pulse variant="aura">` + 6 tokens + animation keyframe; `<Progress variant="sectioned">` + 2 tokens + 3 props + `ProgressSegment` shape | Speedtest 5-cap aura surfaces (ResultStack + PhaseTimeline + SpeedtestResults×2 + 1 dots-variant idle) + Progress at MeterColumn under-bar | **RE-CONFIRMED CANONICAL at HEAD** by `docs/tranches/O/audit/O11-Lane-f-speedtest.md` §5: 4 aura surfaces + 1 dots idle + Progress gradient at MeterColumn under-bar |
| AB.W4 | CHANGELOG dock-shadow consumer canon + v1.1.0 close + post-close substrate coda | Speedtest sets `--shadow-dock-override: var(--shadow-uniform)` on `<GlassDock>` to close B5 (settings-gear right-edge halo); after the post-close coda the override is no longer strictly necessary but remains valid for directional-cast cases | CHANGELOG entry + coda commit body; B5 closure verified via Playwright deep-probe |

## §5 — Push policy

| Class | Authorization | Push policy |
|---|---|---|
| glass-ui AB work | user 2026-05-13 "Full bump to 1.1" directive | landed direct-to-master by user; no orchestrator push (per K invariant 3 violation — no orchestrator) |
| precept submodule advance | (not exercised at AB) | not exercised |
| speedtest consumer-side AB work | user (lockstep with glass-ui AB) | user pushes per-wave |
| reader-only consumer audits | (not exercised at AB) | not exercised |

## §6 — Conflict resolution path (retrospective)

AB ran without a manifest. No conflict resolution path was invoked at execution time. Reconstructed at O.W0 Lane A:

- Conflicts between glass-ui substrate and speedtest consumer would surface as failing builds at either repo. None recorded in the AB commit chain.
- Cross-tranche debt (e.g., bundle-budget exceeded) carried to N.W0 inheritance + rebaseline rather than being resolved at AB.

## §7 — AB consumer-audit fan-out (NOT EXECUTED at AB; absorbed post-AB)

AB shipped without a close ceremony or consumer-audit fan-out. The 6 manifest reader-only consumers (words / fourier-analysis / bbnf-buddy / keyframes.js / value.js / speedtest) were not audited at AB close.

N.W4 ran the 6-agent N11 consumer-audit fan-out retroactively (READ-ONLY post-N substrate). Speedtest re-audit (N11/f) re-confirmed AB.W3 substrate consumption canonical. O.W0 Lane Iβ (per O11/f §5) re-re-confirmed at the latest HEAD.

## §8 — Reflog scan (NOT EXECUTED at AB; absorbed post-AB)

AB shipped without an integrity sweep / reflog scan. N.W4 ι lane extended the cross-constellation reflog scan to walk reflogs across all 14 manifest repos including the precept submodule; verdict CLEAN for AB-era commits.

## §9 — Authority

Retrospective document authored at O.W0 Lane A 2026-05-14. The AB cohort terminated at `2b3727f` 2026-05-13 17:45 EDT; this manifest reflects the AB-era constellation state.

The canonical AB consumer is **speedtest**. Every AB substrate item ships with a wire-claimed speedtest adoption documented in the originating commit body or CHANGELOG entry. The wire-claim verification chain is N.W4 N11/f → O.W0 Lane Iβ (O11/f §5) — both reaffirm AB.W3 substrate consumption canonical at HEAD.
