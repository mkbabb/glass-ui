# Tranche AO — PROGRESS

Execution log for tranche AO (self-measurement truth + CSS-architecture pass + legacy purge). Updated at wave boundaries. Plan basis — `docs/tranches/AO/AO.md`; per-wave specs at `docs/tranches/AO/waves/W<N>.md`; synthesis at `docs/tranches/AO/audit/PATH-FORWARD.md`.

Status vocabulary — PLANNED / IN-PROGRESS / DONE / MET / MISS / NAMED-FORWARD (watched condition, named realisation) / USER-DOMAIN (cross-repo perimeter; user's push authority).

## Top-line status

**DEVELOPMENT.** W0 closed (the 6-lane audit ran + the synthesis landed). W1 (the design slice) awaits — it is the END OF THE DEVELOPMENT BOUNDARY. W2-W4 are authored as binding wave specs but RUN only on explicit user authorization; the dev/impl boundary sits at W1|W2.

AO opens against a **clean ledger** — 0 unaddressed requests, 0 survivors, no consumer-surfaced primitive gap (muster's H tranche is muster-only), and no ≥2-consumer pattern that clears the substrate-promotion gate. AO is internal-correctness work landed in the ideal window: the headline is the self-measurement truth + CSS-architecture pass, with the hygiene (alias delete + heap-prefix retire + doc resync + dist-wipe-footgun fix) riding the same close.

## Wave status table

| Wave | Title | Phase | Status | Evidence |
|---|---|---|---|---|
| AO.W0 | 6-lane audit + path-forward synthesis | DEV | DONE | `audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md` + `audit/PATH-FORWARD.md` + `AO.md` + `waves/W{0..5}.md` + this PROGRESS |
| AO.W1 | Design slice — gate-truth + CSS re-base + cascade-consolidation + legacy-purge + changeset-release + consumer-gap | DEV (boundary) | PLANNED | `design/W1.1-gate-truth.md` · `design/W1.2-css-rebase.md` · `design/W1.3-legacy-purge-and-build.md` · `design/W1.4-consumer-gap.md` |
| AO.W2 | Self-measurement truth + legacy purge | IMPL | PLANNED | `audit/W2-self-measurement-truth.md` (gate measures dist/styles · footgun closed · heap prefix 0 · alias grep 0) |
| AO.W3 | Consumer-gap (speedtest AQ R0G-1..4) | IMPL | PLANNED | `audit/W3-consumer-gap.md` (Aurora idle-fps · chassis mobile CLS < 0.05 · useIdleReady exported · Toaster position) |
| AO.W4 | CSS budget re-base + cascade consolidation + R0G-5 token | IMPL | PLANNED | `audit/W4-css-rebase-consolidation.md` (R0G-5 token · re-based ceiling · per-subpath enforce · proof:theme byte-clean · π re-probe) |
| AO.W5 | Close ceremony + first changeset-driven release | IMPL (LAST) | PLANNED | `audit/W5-close.md` + `FINAL.md` + `.changeset/` (default 3.0.0) |

**Wave count: 6 (AO.W0-AO.W5)** — 2 DEVELOPMENT (W0 audit + W1 design) + 4 IMPLEMENTATION. Dev/impl boundary at W1|W2.

DAG — W0 first; W1 after W0; W2 the truth-foundation (W4's re-base depends on the gate measuring reality); W3 the consumer-gap pass (independent of W2; settles `instrument-chassis.css`); W4 the CSS headline pass against the settled cascade (post-W2 gate + post-W3 chassis + R0G-5 token); W5 closes + exercises changesets.

**Amendment (2026-05-29, post-W0):** speedtest tranche AQ surfaced 5 consumer-driven R0-glass items AFTER the W0 audit (`CONSUMER-REQUEST-speedtest-AQ.md`). AO folds all five (see `AO.md` §Consumer-request amendment + §Resolved decision 6) — R0G-1/2/3/4 → new AO.W3 consumer-gap wave; R0G-5 token → AO.W4. The W0 "0 unaddressed / clean ledger" finding was true-as-of-`4869b74`; the fold amends it. Wave count 5→6.

## Cross-tranche posture

AO is **glass-ui-internal-first**. The one cross-repo-shaped exercise is the first changeset-driven release (staged locally; the publish leg user-domain). User-domain perimeter items (OMEGA) — surfaced, not absorbed into AO source waves:

- **Push the held commits to `origin`** — the provenance gap. npm 2.1.0 is live and consumed (speedtest resolves it), but its source tree is single-copy local until pushed; one `git push` reconciles source with the already-published artifact. Highest-priority user-domain action.
- **Seed the `NPM_TOKEN` repo secret** — activates the never-run `release.yml` (the publish-on-tag contract is real-but-unexercised; every 2.x publish was manual `npm publish`).
- **Reconcile the precepts submodule** — commit + push its 3 dirty files (the inv-30 amendment + 2 new precept docs) inside `mkbabb/precepts`, then bump glass-ui's gitlink and include it in the push. Does NOT block AO.
- **First changeset-release tag push** — once W4 stages the changeset + bump locally, the user pushes branch + tag; `release.yml` fires the first end-to-end changeset-driven publish.

All four need the user's GitHub push authority.

---

## AO.W0 — 6-lane audit + path-forward synthesis — 2026-05-29 — DEV-CLOSED

- **Opens:** 2026-05-29
- **Closes:** 2026-05-29
- **Agents:** 6 audit (read-only, one per lane) + 1 synthesis
- **Disposition:** DONE — the audit ran; the synthesis is the binding basis for the AO plan.

### Events

- The 6-lane audit landed (`audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md`) + `audit/PATH-FORWARD.md` + `AO.md` + the W0-W4 wave specs + this PROGRESS.
- **The clean-ledger finding (ALPHA).** 13 DELIVERED / 0 UNADDRESSED across the AM→AN arc; the precept canon HELD over the AN window (agent git-discipline, no backwards-compat slip, no greenfield-voice breach); muster's H tranche surfaces no glass-ui primitive gap (it composes shipped 2.1.0 primitives or is muster-bespoke). EPSILON confirmed no ≥2-consumer pattern clears the substrate-promotion gate (inline-edit has 2 divergent shapes; LabeledSlider readout is minor-additive). So AO is neither consumer-gap-driven nor primitive-driven.
- **The three-stale-self-descriptions thesis.** The audit's real finding is internal: the library carries three stale self-descriptions (the gate measures the wrong CSS artifact; the §Build prose narrates a vanished api-extractor toolchain; the 8 GB heap prefix serves it) and one live legacy alias (`useSpringOrchestrator`). AO makes glass-ui's self-knowledge true and the source pristine.
- **The gate-mis-measurement headline (DELTA D1).** `profile:budget` measures `dist/glass-ui.css` (the SFC-only fragment, 7805 gzip, reported 90.2% of an 8650 ceiling) while consumers draw `dist/styles/index.css` (the AN.W1 fold — cascade + folded SFC bundle, ~10.2 KiB gzip combined). A regression in the cascade arm (tokens / theme / utilities) never moves the gated number. The "90.2% near-breach" is a mis-measurement, not a crunch — the same gate-blindness class muster's H.W3 critical-path-gate closes. AO inv α: the gate measures the real consumer artifact.
- **The dist-wipe footgun (DELTA D2).** `vite.iter.config.ts` omits `publishStyleAssets()` and `emptyOutDir` defaults true, so every `iter-build` (hence every `profile:budget`) wipes `dist/` and never recreates `dist/styles`. This forced the "re-run the canonical build last" workaround at AN.W7 + muster G.W3 and is exactly why the gate could never see the real artifact. AO inv β: the two build configs do not wipe each other's dist.
- **The inv-47 alias (BETA).** `src/composables/motion/useSpringOrchestrator.ts` is a live `@deprecated` back-compat export alias (`useSpringOrchestrator = useNumericTransition`), kept as a one-minor courtesy from AL.W9-δ — now stale (the rename predates 2.0.0, the lib is at 2.1.0), zero external consumers (only 3 demo-private sites + 2 shim test cases). Its JSDoc defers retirement to v3.0; AO folds that deferral forward. DELETE — clean break, no replacement alias (inv 47 / L inv 4).
- **The dead heap prefix (GAMMA + DELTA D3).** `NODE_OPTIONS=--max-old-space-size=8192` lives at 4 sites (`package.json:481` build, `package.json:482` build:watch, `scripts/release.sh:81`, `.github/workflows/release.yml:31`). It was provisioned for the vite-plugin-dts + api-extractor per-entry walk (~6.7 GB RSS) that is GONE — dts now emits via `vue-tsc --project tsconfig.build.json`, the build is ~6.9 s, both arms peak < 740 MB RSS. The prefix is dead weight and the §Build paragraph is stale fiction. DROP + resync. **Resolved against BETA's "carry as latent-debt" framing:** BETA item 2 read the prefix as upstream-gated latent-debt to CARRY; GAMMA + DELTA + PATH-FORWARD finding 3 + AO.md decision 4 overrode it — the toolchain already moved off api-extractor, so the prefix is dead weight to DROP now, not a carry awaiting an upstream vite-plugin-dts incremental-rollup landing.

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | The 6 lane docs exist with measured evidence | MET | `audit/{ALPHA,BETA,GAMMA,DELTA,EPSILON,OMEGA}-*.md` |
| 2 | `audit/PATH-FORWARD.md` names the five resolved findings + wave shape + folded ledger + cross-repo posture | MET | `audit/PATH-FORWARD.md` |
| 3 | `AO.md` exists with the §Wave table + §Resolved decisions + §Folded ledger + §Critical files + inv α/β | MET | `AO.md` |
| 4 | The W0-W4 wave specs + PROGRESS derive from the synthesis; every candidate routes | MET | `waves/W{0..4}.md` + this PROGRESS |
| 5 | `git status -- src/` clean (no source); no agent-attributed git mutation | MET | read-only audit |

---

## AO.W1 — Design slice — END OF DEVELOPMENT BOUNDARY

- **Opens:** after W0 close
- **Status:** PLANNED
- **Agents:** 2-3 (W1.1 + W1.3 disjoint; W1.2 reads W1.1's measurement target)
- **Disposition:** PLANNED — the design docs bind W2-W4; **the dev/impl boundary sits at W1|W2; W2 opens only on explicit user authorization.**

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `design/W1.1-gate-truth.md` — combined-draw measurement + dist-share fix + per-subpath enforce | PLANNED | — |
| 2 | `design/W1.2-css-rebase.md` — re-based ceiling (derived) + per-rung consolidation plan | PLANNED | — |
| 3 | `design/W1.3-legacy-purge-and-build.md` — alias migration map + heap-prefix sites + §Build resync + version decision (default 3.0.0) | PLANNED | — |
| 4 | `git status -- src/` clean; dev/impl boundary marked | PLANNED | — |

---

## AO.W2 — Self-measurement truth + legacy purge

- **Opens:** after W1 close AND explicit user authorization
- **Status:** PLANNED
- **Agents:** 2 (∥ disjoint — gate/build truth ‖ motion-alias delete)
- **Disposition:** PLANNED

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `typecheck` + `build` exit 0 under DEFAULT heap | PLANNED | — |
| 2 | Gate measures `dist/styles` (combined ~10.2 KiB), not the SFC fragment | PLANNED | `audit/W2-self-measurement-truth.md` |
| 3 | Gate fails-on-synthetic-cascade-regression | PLANNED | `audit/W2-...` |
| 4 | Gate passes-on-HEAD | PLANNED | `audit/W2-...` |
| 5 | Dist-wipe footgun closed (profile:budget leaves dist/ intact) | PLANNED | `audit/W2-...` |
| 6 | `grep -rn 'max-old-space-size' package.json scripts/release.sh .github/` = 0 | PLANNED | — |
| 7 | `grep -r 'useSpringOrchestrator' src/` = 0; demo + tests migrated | PLANNED | — |

---

## AO.W3 — CSS budget re-base + cascade consolidation

- **Opens:** after W2 close
- **Status:** PLANNED
- **Agents:** 1-2 (gate re-base + enforce ‖ cascade consolidation)
- **Disposition:** PLANNED

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | `typecheck` + `build` exit 0 | PLANNED | — |
| 2 | `proof:theme` byte-clean (every rung ships) | PLANNED | `audit/W3-css-rebase-consolidation.md` |
| 3 | Honest gate PASSES with documented headroom (re-based ceiling) | PLANNED | `audit/W3-...` |
| 4 | Per-subpath caps enforced; synthetic per-subpath regression trips | PLANNED | `audit/W3-...` |
| 5 | Visual π re-probe — zero canon regression | PLANNED | `audit/W3-...` |
| 6 | W2 fails-on-synthetic-cascade-regression still holds against the re-base | PLANNED | `audit/W3-...` |

---

## AO.W4 — Close ceremony + first changeset-driven release

- **Opens:** after W2 + W3 close
- **Status:** PLANNED
- **Agents:** 1 (orchestrator-led close sweep)
- **Disposition:** PLANNED

### Gates

| # | Gate | Status | Evidence |
|---|---|---|---|
| 1 | π re-probe — visual canon + 4 motion primitives unregressed | PLANNED | `audit/W4-close.md` |
| 2 | ι sweep — stash-clean; no agent-attributed mutation; secrets-clean; alias grep 0 | PLANNED | `audit/W4-close.md` |
| 3 | Overfitting audit clean — every AO change is correctness/deletion, no new substrate | PLANNED | `audit/W4-close.md` |
| 4 | Full gate matrix green locally (typecheck + build + proof:all + proof:resolution + verify-export-types + profile:budget --enforce) | PLANNED | this PROGRESS |
| 5 | `AO/FINAL.md` — gate table + watched-conditions ledger + cross-repo perimeter | PLANNED | `FINAL.md` |
| 6 | First changeset authored + `changeset version` stages the bump (default 3.0.0) + CHANGELOG; dist/ rebuilt; tag/publish recorded user-domain | PLANNED | `.changeset/` + `CHANGELOG.md` |
