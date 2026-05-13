# Constellation Manifest — `@mkbabb/*` ecosystem (M tranche open baseline)

**Artefact class**: `coordination/CONSTELLATION.md` (NEW at M; per L.Rδ §G.6 + M.Rδ P2 precept proposal).
**Scope**: every repo under user control that participates in the `@mkbabb/*` namespace OR consumes/produces glass-ui artefacts OR shares precept submodule.
**Date**: 2026-05-12 (M open) — refreshed at M.W3 Lane B (post-W1 + W2 + W3 close).
**Authoring authority**: M orchestrator (glass-ui-side); refreshes at each M wave close.

This is the canonical cross-repo manifest. It supersedes the per-peer `coordination/<peer-letter>.md` pattern (L W0 introduced for single-peer; M extends for multi-peer). Per-peer files become §-references into this manifest going forward.

## §1 — Repo inventory (with tranche state + glass-ui pin)

| Repo | Path | Vue? | glass-ui pin | keyframes.js pin | Tranche stream | Last tranche close | Active tranche | Status |
|---|---|---|---|---|---|---|---|---|
| **glass-ui** | `/Users/mkbabb/Programming/glass-ui` | n/a (library) | n/a (origin) | `^2.0.0` peer | C → L → M | L `3e4d472` (v1.0.0); AA layered v1.0.1→v1.0.3 (timeline+typography); M.W0 patches `src/carousel.ts` substrate defect → v1.0.4 | M (this); W0 + W1 CLOSED; W2 + W3 closing | active; v1.0.4 (W0); v1.0.5-pending (W2 api/extensions + F-ε-3 fix + cosmetic absorb) |
| **speedtest** | `/Users/mkbabb/Programming/speedtest` | yes | `file:../glass-ui` | n/a | A → Y → Z → AA → pre-AB | AA closed (per AA/FINAL.md at speedtest); Y closed long ago | none active in M scope | M.W0/W1 verified glass-ui v1.0.4 consumption clean; M.W1 Lane F HANDOFF DONE (`docs/tranches/M/audit/W1-Lane-F-speedtest-post-Y-proof.md`) |
| **keyframes.js** | `/Users/mkbabb/Programming/keyframes.js` | yes (own + demo) | `file:../glass-ui` | self (`@mkbabb/keyframes.js@2.0.0`) | A → H → pre-W (`w.w2.1-keyframes-prebuild`) | H (verify FINAL.md) | M.W1 Lane A | M.W1 commit `b788205` on user WIP branch (local-only) |
| **value.js** | `/Users/mkbabb/Programming/value.js` | yes (demo) | `file:../glass-ui` | `file:../keyframes.js` | unknown → pre-W (`w.w2.1-value-js-prebuild`) | unknown | M.W1 Lane B | M.W1 commit on user WIP branch (local-only) |
| **words** (frontend) | `/Users/mkbabb/Programming/words/frontend` | yes | `file:../../glass-ui` (FIXED at M.W0) | `^2.0.0` | unknown | unknown | M.W1 Lane D CLOSED | M.W1 commit `0f16925` on master + pushed; glass-subtle→glass-wash + virtual local fork + full v1.0 absorb |
| **fourier-analysis** (web) | `/Users/mkbabb/Programming/fourier-analysis/web` | yes | `file:../../glass-ui` | `^2.0.0` | unknown | unknown | M.W1 Lane C CLOSED | M.W1 commit `301a95e` on master + pushed; useOffsetPagination local fork + DockPopover→HoverPopover + /dark |
| **bbnf-buddy** | `/Users/mkbabb/Programming/bbnf-buddy` | yes | `file:../glass-ui` | `file:../keyframes.js` | unknown | unknown | M.W1 Lane E CLOSED | M.W1 commit `e06d629` on master (no origin remote — local-only); 22 sites migrated to v1.0 per-package subpaths + ScrollArea→ScrollPane + useLeaveTimer local impl |
| **bbnf-lang** | `/Users/mkbabb/Programming/bbnf-lang` | no (no glass-ui dep) | n/a | n/a | AA → BD (50+; deepest tranche-format adopter per M.Rε) | BD (verify) | possibly active | tranche-format origin; shares precept submodule |
| **mkb-utils** | `/Users/mkbabb/Programming/mkb-utils` | no | n/a | n/a | unknown | unknown | none | utility lib; verify scope |
| **vite-plugin-shebang** | `/Users/mkbabb/Programming/vite-plugin-shebang` | n/a (plugin) | n/a | n/a | unknown | unknown | none | retired @ M.W3 — FORMAL-RETIRE (soft); 1 dormant consumer (mailtyphoon ^0.1.6); npm tombstone |
| **mathanim** | `/Users/mkbabb/Programming/mathanim` | n/a (demo site) | n/a | n/a | unknown | unknown | none | retired @ M.W3 — FORMAL-RETIRE; dormant 5y; 0 consumers; demo-only (not npm-published) |
| **fourier-animate** | `/Users/mkbabb/Programming/fourier-animate` | n/a (Python) | n/a | n/a | unknown | unknown | none | out-of-constellation-scope @ M.W3 — Python-only (Poetry); structurally outside @mkbabb/* Node namespace |
| **parse-that** | `/Users/mkbabb/Programming/parse-that` | no | n/a | n/a | unknown | unknown | none | likely bbnf-lang dep; verify scope |
| **precepts** (submodule) | `/Users/mkbabb/Programming/glass-ui/docs/precepts` | n/a | n/a | n/a | submodule shared across repos | reconciled at M.W0 — `08a2e9c` on origin/main | M.W0 reconcile **CLOSED** | RECONCILED |

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
| vite-plugin-shebang | retired @ M.W3 (FORMAL-RETIRE soft); no further writes | no |
| mathanim | retired @ M.W3 (FORMAL-RETIRE); no further writes | no |
| fourier-animate | out-of-constellation @ M.W3 (Python-only) | not applicable (out of scope) |
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

### W0 close state (2026-05-12)

- **N1 (P0) — CLOSED**: words consumer v1.0 retired-subpath drift fixed (3 `/virtual` imports transposed to local `@/composables/virtual/`; package.json pin re-pointed to `file:../../glass-ui`). M.W1 Lane D absorbs the residual `glass-subtle` button-variant baseline drift.
- **N4 (P0) — CLOSED**: precept submodule REAUDIT-stream reconciled — `08a2e9c` on origin/main (cumulative tranche-stream G→L diff applied with 3-way merge resolution + M.Rδ P1/P3/P6 extensions integrated). Backup branch `m-w0-pre-rebaseline @ b51047d` retained locally.
- **N-fourier (P0) — CLOSED**: fourier-analysis/web v1.0 retired-subpath drift fixed (2 `useOffsetPagination` imports + 1 `useGlobalDark` migrated; local 60-LOC reference impl forked from v0.9.3 source).
- **N-bbnf-buddy verify — CLOSED**: bbnf-buddy verified ZERO retired-subpath imports at HEAD (Rα §A.5 plan claim was incorrect; nothing to migrate on the retired-subpath axis); 2 `useGlobalDark` root-barrel imports migrated to `/dark`.
- **N-carousel-defect (P0) — CLOSED at v1.0.4**: glass-ui `src/carousel.ts` only exposed `useCarousel + CarouselApi`; MIGRATION.md §1.2 contract promised the full `Carousel*` component family on `/carousel`. Fixed in orchestrator-direct edit; v1.0.4 patch.

### W3 close state — Lane A stale-repo dispositions (2026-05-12)

- **vite-plugin-shebang — FORMAL-RETIRE (soft)**: last activity 2023-11-13; Vite-4 era. Consumer-graph reveals **1 dormant consumer** (mailtyphoon `^0.1.6`, last active 2024-01) — corrects M.Rε §A "zero active consumers" claim. Disposition: keep published 0.1.6 as a tombstone; no Vite-5 bump; no source-tree changes. CONSTELLATION §1+§4 updated.
- **mathanim — FORMAL-RETIRE**: last activity 2021-02-16 (5y dormant); TS 4.1 / ESLint 7 / Prettier 2; depends on two stale `github:` direct refs (mkbabb/animation.js, mkbabb/yajr). Identity is a demo site (`main: confetti.js`), not a library. **0 downstream consumers**; not npm-published. Disposition: documentation-only retirement. CONSTELLATION §1+§4 updated.
- **fourier-animate — MOVE-OUT-OF-CONSTELLATION**: Python project (Poetry; matplotlib/numpy/scipy/opencv); no package.json; structurally outside `@mkbabb/*` Node namespace. Last activity 2022-07-28 (orthogonal to disposition). Disposition: scope clarification — out-of-constellation. CONSTELLATION §1+§4 updated.
- **Escalations open** (see W3 Lane A proof § Open questions): (1) physical repo relocation (rename to `.archive/` or move out of `Programming/`) — not executed without user authorization; (2) optional `npm deprecate vite-plugin-shebang@<=0.1.6` — not executed (would noise mailtyphoon installs).

Full audit: [`audit/W3-Lane-A-stale-repo-decisions-proof.md`](../audit/W3-Lane-A-stale-repo-decisions-proof.md).

### Carry-forward to W1

- **N12-N13 (P1)**: keyframes.js + value.js consumer-side v1.0 audit (unverified — file-link masking). M.W1 Lanes A + B absorb.
- **N17-N24 (P1)**: cross-cutting modularization-debt cohort. M.W1 per-consumer lanes DISPOSITION each duplication (mostly KEEP-AS-IS or DOCUMENT-AS-DIFFERENT per KISS; no new package invented).
- **N-words-broader (P1)**: words/frontend ~3 sites of `glass-subtle` button-variant referenced but absent from v1.0 `buttonVariants` CVA — pre-existing baseline drift. M.W1 Lane D absorbs.
- **N-bbnf-buddy-broader (P1)**: bbnf-buddy ~14 surfaces of broader v1.0 root-barrel drift (GlassDock, DockIconButton, BouncyTabs, ScrollArea→ScrollPane rename, ToggleChip, SortableList family, DarkModeToggle, plus `useLeaveTimer` phantom dep). M.W1 Lane E absorbs.
- **N-fourier-dockpopover (P1)**: fourier-analysis/web `DockPopover` references in `CanvasControlsDock.vue` + `EditorControlsDock.vue` (renamed to `HoverPopover` at J). M.W1 Lane C absorbs.

## §10 — Authority

This manifest is a living document. Each M wave close updates §1 + §2 + §5 + §9 with closing state. M.W8 ι uses this manifest as the canonical cross-repo ledger.
