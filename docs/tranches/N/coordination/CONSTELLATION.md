# Constellation Manifest — `@mkbabb/*` ecosystem (N tranche open baseline)

**Artefact class**: `coordination/CONSTELLATION.md` (canonical multi-peer manifest per M.Rδ P2 invariant).
**Scope**: every repo under user control that participates in the `@mkbabb/*` namespace OR consumes/produces glass-ui artefacts OR shares the precept submodule.
**Date**: 2026-05-12 (N open) — carries forward from M close `54a8acb`.
**Authoring authority**: N orchestrator (glass-ui-side).

## §1 — Repo inventory (with N-open baseline)

| Repo | Path | Vue? | glass-ui pin | Tranche stream | Last close | Active tranche | Status @ N open |
|---|---|---|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | n/a (library) | n/a (origin) | C → L → M → N | M `54a8acb` (v1.0.5) | N (this) | active |
| **speedtest** | `/Users/mkbabb/Programming/speedtest` | yes | `file:../glass-ui` | A → Y → Z → AA → pre-AB | AA closed | none in N scope | M.W1 Lane F handoff DONE; v1.0.5 consumption clean expected (verify at N.W4 audit) |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | yes | `file:../glass-ui` | A → H → pre-W | H | none in N scope | M.W1 Lane A commit `b788205` on user WIP branch (no push) |
| **value.js** | `/Users/mkbabb/Programming/value.js` | yes (demo) | `file:../glass-ui` | unknown → pre-W | unknown | none in N scope | M.W1 Lane B commit on user WIP branch (no push) |
| **words** (frontend) | `/Users/mkbabb/Programming/words/frontend` | yes | `file:../../glass-ui` | unknown | unknown | none in N scope | M.W1 Lane D commit `0f16925` on master + pushed |
| **fourier-analysis** (web) | `/Users/mkbabb/Programming/fourier-analysis/web` | yes | `file:../../glass-ui` | unknown | unknown | none in N scope | M.W1 Lane C commit `301a95e` on master + pushed |
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy` | yes | `file:../glass-ui` | unknown | unknown | none in N scope | M.W1 Lane E commit `e06d629` on master (no origin remote) |
| **bbnf-lang** | `/Users/mkbabb/Programming/bbnf-lang` | no | n/a | AA → BD (50+) | BD | possibly active | tranche-format origin; shared precept submodule; READER-ONLY at N |
| **mkb-utils** | `/Users/mkbabb/Programming/mkb-utils` | no | n/a | unknown | unknown | none | utility lib; out of N scope unless N.W4 surfaces relevance |
| **vite-plugin-shebang** | `/Users/mkbabb/Programming/vite-plugin-shebang` | n/a (plugin) | n/a | (retired @ M.W3 FORMAL-RETIRE soft) | M.W3 | none | retired |
| **mathanim** | `/Users/mkbabb/Programming/mathanim` | n/a | n/a | (retired @ M.W3 FORMAL-RETIRE) | M.W3 | none | retired |
| **fourier-animate** | `/Users/mkbabb/Programming/fourier-animate` | n/a (Python) | n/a | (moved out-of-constellation @ M.W3) | M.W3 | none | out-of-scope |
| **parse-that** | `/Users/mkbabb/Programming/parse-that` | no | n/a | unknown | unknown | none | READER-ONLY at N |
| **precepts** (submodule) | `docs/precepts` | n/a | n/a | shared across tranche-format repos | M.W4 `46d6cfb` | N.W0 advance | RECONCILED; N.W0 advances with invariants 21-24 |

## §2 — Cross-repo touchpoint map

```
                  ┌──────────────┐
                  │  precepts/   │ (shared; M close 46d6cfb;
                  │  N.W0 adv.   │  N.W0 → invariants 21-24)
                  └──────┬───────┘
                         │
       ┌─────────────────┼─────────────────┬─────────────────┐
       │                 │                 │                 │
  ┌────┴────┐      ┌─────┴─────┐    ┌──────┴──────┐    ┌─────┴─────┐
  │glass-ui │      │ speedtest │    │  bbnf-lang  │    │ (per-     │
  │  v1.0.5 │      │  AA closed│    │  AA → BD    │    │  consumer │
  │  N now  │      │  (post-Y) │    │             │    │  M.W1     │
  └────┬────┘      └───────────┘    └─────────────┘    │  migrated)│
       │                                                └───────────┘
       │ peer-dep / file: link
       ▼
  ┌──────────────────────────────────────────────────┐
  │ Consumer repos at M.W1-migrated v1.0 surface:    │
  │  words / fourier-analysis / bbnf-buddy           │
  │  keyframes.js (WIP) / value.js (WIP)             │
  └──────────────────────────────────────────────────┘
```

## §3 — Writer-vs-reader boundary per-repo

| Repo | N role | N orchestrator may write? |
|---|---|---|
| glass-ui | primary; N is its tranche | yes |
| speedtest | no active tranche in N scope | READER-ONLY (audit only at N.W4 N11) |
| keyframes.js | M.W1-migrated; user WIP-branch unfinished | READER-ONLY (audit only; no push) |
| value.js | M.W1-migrated; user WIP-branch unfinished | READER-ONLY (audit only; no push) |
| words (frontend) | M.W1-migrated to v1.0 | READER-ONLY (audit only at N.W4 N11; no W1-style sweep again) |
| fourier-analysis (web) | M.W1-migrated to v1.0 | READER-ONLY (audit only at N.W4 N11) |
| bbnf-buddy | M.W1-migrated to v1.0; no origin remote | READER-ONLY (audit only at N.W4 N11) |
| bbnf-lang | own tranche stream; READER-ONLY at N | READER-ONLY |
| mkb-utils | out of scope | READER-ONLY |
| vite-plugin-shebang | RETIRED at M.W3 | no |
| mathanim | RETIRED at M.W3 | no |
| fourier-animate | OUT-OF-CONSTELLATION at M.W3 | n/a |
| parse-that | READER-ONLY | READER-ONLY |
| precepts (submodule) | N.W0 advances with invariants 21-24 | orchestrator-solo (no agents) |

## §4 — Cross-repo wave-timeline expectations

| N wave | Cross-repo action |
|---|---|
| W0 | precept submodule advance (invariants 21-24); no consumer writes |
| W1 HEADLINE | glass-ui only (frosted-verify + text-micro promotion + typography sweep); no cross-repo |
| W2 | glass-ui only (DockMobileToggle + icon-mode + dock-layer regression); no cross-repo |
| W3 | glass-ui only (Configurator mobile density + stories); no cross-repo |
| W4 | N11 6-agent consumer audit across all 6 migrated consumers (READ-ONLY); orchestrator may surface follow-up recommendations but does not push consumer source |

## §5 — Push policy

| Class | Authorization | Push policy |
|---|---|---|
| glass-ui N work | N plan | orchestrator pushes per wave close |
| precept submodule advance | N.W0 | orchestrator pushes after N.W0 close |
| consumer audit findings (N.W4 N11) | N plan | NOT pushed by N orchestrator; surfaced as O-tranche carry-forward or per-consumer next-tranche work |
| keyframes.js / value.js WIP-branch (M-inherited debt) | (none at N) | NOT pushed by N |

## §6 — Carry-forward inheritance from M

Per M FINAL §7 + M-residuals.md, N inherits 8 named residuals (N-1 through N-8). Per Rβ disposition:

- ABSORB-IN-N: N-1 (`/freshness` retire at W0), N-2 (DiscoGlyph audit at W4), N-3 (`useGlassAlpha` retire at W0), N-4 (AA timeline typecheck at W4 fast-follow), N-5 (dock-layer regression at W2)
- DEFER cosmetic: N-6 (demo import-path harmonisation at W3 or O), N-8 (`_shared` naming clarity)
- DEFER cross-debt: N-7 (keyframes.js + value.js CHANGELOG; user-WIP-owned)

Plus Rβ proposals:
- RETIRE-WITH-RATIONALE: J-6 (`--{success,warning,info}-foreground` 0 consumers), J-11 (stress harness)
- PERMANENT-DEFER: L-vue-passive-listeners + L-cache-ttl (out-of-scope)

## §7 — Conflict resolution path

Per M-canon: surface conflicts in this manifest §6 + respective tranche findings; orchestrator and peer reconcile; decision lands canonically.

## §8 — Reflog scan extension (N.W4 ι lane)

N.W4 ι extends M's cross-constellation reflog scan to walk reflogs across all 14 manifest repos including the precept submodule.

## §9 — Authority

Living document. Each N wave close updates §1 + §6 with closing state.
