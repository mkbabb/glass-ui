# Constellation Manifest — `@mkbabb/*` ecosystem (M tranche open baseline)

**Artefact class**: `coordination/CONSTELLATION.md` (NEW at M; per L.Rδ §G.6 + M.Rδ P2 precept proposal).
**Scope**: every repo under user control that participates in the `@mkbabb/*` namespace OR consumes/produces glass-ui artefacts OR shares precept submodule.
**Date**: 2026-05-12 (M open).
**Authoring authority**: M orchestrator (glass-ui-side).

This is the canonical cross-repo manifest. It supersedes the per-peer `coordination/<peer-letter>.md` pattern (L W0 introduced for single-peer; M extends for multi-peer). Per-peer files become §-references into this manifest going forward.

## §1 — Repo inventory (with tranche state + glass-ui pin)

| Repo | Path | Vue? | glass-ui pin | keyframes.js pin | Tranche stream | Last tranche close | Active tranche | Status |
|---|---|---|---|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | n/a (library) | n/a (origin) | `^2.0.0` peer | C → L (current) | L `3e4d472` (v1.0.0) | M (this) | active |
| **speedtest** | `/Users/mkbabb/Programming/speedtest` | yes | `file:../glass-ui` | n/a | A → Y (current) | X `5dcc2505` | Y (in flight) | active; coordinate |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | yes (own + demo) | `file:../glass-ui` | self (`@mkbabb/keyframes.js@2.0.0`) | A → H (last per `keyframes-wt-H-W2-verify`) | H (verify FINAL.md) | none active | dormant |
| **value.js** | `/Users/mkbabb/Programming/value.js` | yes (demo) | `file:../glass-ui` | `file:../keyframes.js` | unknown | unknown | none active | dormant — pin v0.5.1 |
| **words** (frontend) | `/Users/mkbabb/Programming/words/frontend` | yes | `file:./glass-ui` (BROKEN symlink) | `^2.0.0` | unknown | unknown | none active | **BROKEN at v1.0** — 3 retired-subpath imports |
| **fourier-analysis** (web) | `/Users/mkbabb/Programming/fourier-analysis/web` | yes | `file:../../glass-ui` | `^2.0.0` | unknown | unknown | none active | **BROKEN at v1.0** — 2 retired-subpath imports |
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy` | yes | `file:../glass-ui` | `file:../keyframes.js` | unknown | unknown | none active | active consumer; verify v1.0 compat |
| **bbnf-lang** | `/Users/mkbabb/Programming/bbnf-lang` | no (no glass-ui dep) | n/a | n/a | AA → BD (50+; deepest tranche-format adopter per M.Rε) | BD (verify) | possibly active | tranche-format origin; shares precept submodule |
| **mkb-utils** | `/Users/mkbabb/Programming/mkb-utils` | no | n/a | n/a | unknown | unknown | none | utility lib; verify scope |
| **vite-plugin-shebang** | `/Users/mkbabb/Programming/vite-plugin-shebang` | n/a (plugin) | n/a | n/a | unknown | unknown | none | stale (Vite 4); retire-or-refresh in M.W5 |
| **mathanim** | `/Users/mkbabb/Programming/mathanim` | unknown | n/a | n/a | unknown | unknown | none | stale (TS 4.1); verify scope; retire-or-refresh in M.W5 |
| **fourier-animate** | `/Users/mkbabb/Programming/fourier-animate` | unknown (no package.json?) | n/a | n/a | unknown | unknown | none | verify — possibly Python-only; formal out-of-constellation if so |
| **parse-that** | `/Users/mkbabb/Programming/parse-that` | no | n/a | n/a | unknown | unknown | none | likely bbnf-lang dep; verify scope |
| **precepts** (submodule) | `/Users/mkbabb/Programming/glass-ui/docs/precepts` | n/a | n/a | n/a | submodule shared across repos | tranche-stream local `b51047d`; origin/main `26297c9` (15-commit REAUDIT divergence) | M.W0 reconcile | **DIVERGED** |

## §2 — Cross-repo touchpoint map

```
                  ┌──────────────┐
                  │  precepts/   │ (submodule shared across all tranche-format repos)
                  │ DIVERGED 15c │
                  └──────┬───────┘
                         │
       ┌─────────────────┼─────────────────┬─────────────────┐
       │                 │                 │                 │
  ┌────┴────┐      ┌─────┴─────┐    ┌──────┴──────┐    ┌─────┴─────┐
  │glass-ui │      │ speedtest │    │  bbnf-lang  │    │ (other    │
  │  v1.0.0 │      │  Y tranche│    │  AA → BD    │    │  tranche- │
  │  M now  │      │  in flight│    │             │    │  format   │
  └────┬────┘      └─────┬─────┘    └─────────────┘    │  repos)   │
       │                 │                              └───────────┘
       │ peer-dep        │ file: link
       ├─────────────────┤
       │                 │
       ▼                 ▼
  ┌─────────┐      ┌─────────┐
  │keyframes│      │ Consumer│
  │  .js    │      │  repos: │
  │  v2.0   │      │ words   │
  └─────────┘      │ bbnf-bud│
                   │ fourier │
                   │ value.js│
                   └─────────┘
```

## §3 — Versioning canon (M-bound; proposed for W2 ratification)

- `@mkbabb/*` published packages follow SemVer.
- Breaking changes ship MAJOR (e.g., glass-ui v0.9 → v1.0 at L W1).
- A constellation `@mkbabb/dev-kit` (proposed M.W1 HEADLINE) is published at v0.1.0 initially, signaling pre-stable; consumers opt in via file: link or pinned version.
- Cross-package version drift policy: at any tranche close, NO consumer should pin a 2+ MAJOR-version-behind peer. Single MAJOR lag is tolerated for at most one tranche cycle.
- Each `@mkbabb/*` package ships its own CHANGELOG.md + MIGRATION.md (when breaking); the convention is canonical at M (per W2 deliverable).

## §4 — Writer-vs-reader boundary per-repo

| Repo | M tranche role | M orchestrator may write? |
|---|---|---|
| glass-ui | primary orchestrator; M is its tranche | yes |
| speedtest | Y tranche in flight under same user; Y orchestrator | reader-only on speedtest during M (except cross-repo coordination + post-Y handoff at M.W4) |
| keyframes.js | dormant; M may include tranche adoption | yes (cross-repo dispatch authorized by user M-open directive) |
| value.js | dormant; M may include tranche adoption | yes |
| words (frontend) | BROKEN against v1.0; M.W0 must fix | yes |
| fourier-analysis (web) | BROKEN against v1.0; M.W0 must fix | yes |
| bbnf-buddy | active consumer; verify v1.0 + tranche adoption | yes |
| bbnf-lang | own tranche stream (AA-BD); shared precept submodule | reader-only on source; coordinate on precept submodule reconciliation |
| mkb-utils | utility lib; consider adopt into constellation | yes (with user-authorized scope) |
| vite-plugin-shebang | stale; retire-or-refresh decision in M.W5 | yes |
| mathanim | stale; retire-or-refresh in M.W5 | yes |
| fourier-animate | verify scope first | reader-only until scope verified |
| parse-that | likely bbnf-lang dep; reader-only | reader-only |
| precepts (submodule) | M.W0 reconciliation lane | orchestrator-solo (no agents) |

## §5 — Cross-repo wave-timeline expectations (revised; KISS 5-wave plan)

| M wave | Cross-repo action |
|---|---|
| W0 | precept reconciliation; retired-subpath drift fix in words + fourier-analysis + bbnf-buddy; optional glass-ui v1.0.1 patch |
| W1 HEADLINE | per-consumer v1.0 standardization sweep — keyframes.js + value.js + fourier-analysis + words + bbnf-buddy + speedtest-post-Y |
| W2 | glass-ui substrate residuals (F-ε-3 + api/ extensions + L cosmetic; no cross-repo) |
| W3 | stale-repo retire-or-refresh (vite-plugin-shebang + mathanim + fourier-animate) + doc cohort across constellation |
| W4 | close ceremony + ι reflog scan across ALL constellation reflogs |

## §6 — Push-or-handoff disposition policy (per L W0 ORCHESTRATION clause + M.Rδ P3 extension)

| Cross-repo write class | Authorization | Authorship | Push policy |
|---|---|---|---|
| user-authorized constellation-wide M.W0 sweep (e.g., retired-subpath fix in words/fourier/bbnf-buddy) | user M-open directive | M orchestrator | M orchestrator pushes (one commit per repo) |
| precept submodule reconciliation | user-authorized at M.W0 | M orchestrator solo | push only after merge-conflict resolution; coordinate with bbnf-lang orchestrator if active |
| consumer-repo M.W1 lane edits (per-consumer migrations) | implicit M.W1 scope | M orchestrator | push per-consumer |
| speedtest-side mid-Y edits | Y orchestrator's call | Y orchestrator (same user) | Y orchestrator pushes; M.W1 Lane F coordinates handoff |
| bbnf-lang tranche-stream cross-tranche-debt items | bbnf-lang orchestrator's call | bbnf-lang orchestrator | not pushed by M orchestrator |

## §7 — Conflict resolution path

If M's plan conflicts with another in-flight tranche (Y, bbnf-lang's current):

1. Surface in this manifest §6 and in the respective tranche's findings.md.
2. M orchestrator and peer orchestrator reconcile.
3. Decision lands in M (canonical for M flight); peer absorbs as constraint.

If precept-submodule reconciliation fails (merge conflicts unresolved), defer the reconciliation push and document in M.W0 close OR escalate to M.W8 ι integrity-sweep.

## §8 — Reflog scan extension (M.W4 ι lane)

Per L W0 SPEC clause (ι reflog scan canonical), M.W4 ι extends to scan reflogs across:
- glass-ui (M flight window)
- speedtest (M flight window — coordinate with Y close timing)
- precepts submodule (M flight window)
- Every consumer repo M.W1 touched (per-repo reflog window)

Zero unauthorized agent mutations is the canonical clean criterion.

## §9 — Constellation residuals (M-bound; not exhaustive — see Rβ ledger)

- **N1 (P0)**: words consumer v1.0 break — broken `glass-ui` symlink + 3 retired-subpath imports. M.W0 Lane III absorbs.
- **N4 (P0)**: precept submodule push divergence — 6 local vs 15 origin/main commits. M.W0 Lane II absorbs.
- **N12-N13 (P1)**: keyframes.js + value.js consumer-side v1.0 audit (unverified — file-link masking). M.W1 Lanes A + B absorb.
- **N17-N24 (P1)**: cross-cutting modularization-debt cohort. M.W1 per-consumer lanes DISPOSITION each duplication (mostly KEEP-AS-IS or DOCUMENT-AS-DIFFERENT per KISS; no new package invented).
- **Plus**: fourier-analysis 2 retired imports (M.W0 Lane IV) + bbnf-buddy verify state (M.W0 Lane III).

## §10 — Authority

This manifest is a living document. Each M wave close updates §1 + §2 + §5 + §9 with closing state. M.W8 ι uses this manifest as the canonical cross-repo ledger.
