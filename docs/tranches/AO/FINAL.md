# Tranche AO — FINAL

**Self-measurement truth + CSS-architecture pass + legacy purge + the speedtest-AQ consumer-gap fold.** Closed 2026-05-29 at `v3.0.0` (staged). Status: **complete** (glass-ui-internal scope fully met; 2 cross-repo residuals are consumer-domain, documented below).

## § Thesis recap

AN closed the consumer-gap shape. AO closes the **self-measurement shape** — glass-ui's budget gate measures what consumers actually draw, its build matches its real toolchain, its last legacy alias deletes, its CSS cascade consolidates against a re-based honest ceiling, and its surface-contract proof matches the real barrel. Mid-flight, speedtest tranche AQ surfaced five consumer-driven R0-glass items (the audit's "clean ledger" was true as of `4869b74` but predated AQ); AO folded all five — four elegance/perf transpositions of existing primitives + one ≥2-consumer-gated promotion — into the same 3.0.0 cut.

The headline finding: the library carried **four stale self-descriptions** (the budget gate measured the SFC-only fragment, blind to the ~75 KiB cascade arm; the §Build prose narrated a vanished api-extractor toolchain; the 8 GB heap prefix served it; the root-surface contract proof predated the composable restructure + custom cherry-picks) and **one live legacy alias** (`useSpringOrchestrator`). AO made each true.

## § Gate matrix

| Wave | Title | Hard gates | Status |
|---|---|---|---|
| AO.W0 | 6-lane audit + path-forward synthesis | 5/5 | DONE |
| AO.W1 | Design slice (4 docs) — END OF DEV BOUNDARY | 5/5 | DONE |
| AO.W2 | Self-measurement truth + legacy purge | 7/7 | DONE |
| AO.W3 | Consumer-gap (speedtest AQ R0G-1..4) | 5/5 (+π at W5) | DONE |
| AO.W4 | CSS re-base + consolidation + R0G-5 token | 5/5 (+π at W5) | DONE |
| AO.W5 | Close ceremony + first changeset release | 6/6 | DONE |

**glass-ui-internal gate matrix (all green):** `typecheck` · `build` (default heap, peak 708 MB) · `test` (521 passed, 45 files) · `verify-export-types` · `profile:budget --enforce` (`dist/styles/index.css` 74995/82500 gzip, 90.9%; per-subpath drift PASS) · `proof:package` · `proof:theme` · `proof:resolution` · `proof:runtime` · `proof:consumers:build` · `proof:consumers:static` root-surface arm · `proof:phantom-classes` (glass-ui src/+demo CLEAN).

**Cross-repo residuals (NOT glass-ui/AO; absent from CI):**
- `proof:consumers:static` flags speedtest's own consumer debt (`useTimer`/`useTouchGate` root-imports, `style.css` paths) + dozens of stale `.claude/worktrees/agent-*` copies inside speedtest. CI runs on a fresh checkout with no sibling repos, so only the now-green root-surface arm executes. speedtest resolves its debt on adopting 3.0.0 (its AQ tranche tracks exactly these — the `useIdleReady` collapse, the `/styles` cleanup).
- `proof:phantom-classes` is pending on a documented `fourier-analysis` handoff (escape-hatched `PROOF_PHANTOM_ALLOW_PENDING=1`; never wired into CI); glass-ui's own src/+demo is clean.

## § The resolved findings

1. **inv α — the gate measures the real consumer artifact.** `combinedStylesDraw` resolves the full `dist/styles/index.css` @import graph (17 cascade rungs + the folded SFC); the gate reads ~75 KiB gzip, not the 7.8 KiB SFC fragment. Proven: a synthetic regression in `tokens.css` trips the gate (80786 → 144142 gzip, FAIL). The "90.2% near-breach" was a phantom against the wrong file; the real draw was untracked.
2. **inv β — the two build configs do not wipe each other's dist.** `publishStyleAssets` shared via `vite.style-assets.ts`; a `profile:budget` run leaves `dist/styles` + `dist/fonts` intact. The "re-run build last" workaround retired.
3. **The build matches its toolchain.** The dead 8 GB heap prefix dropped at all 6 sites (the plan found 4; ci.yml carried 2 more); build green under default heap (peak 708 MB ≈ 10× under the dropped allowance); §Build resynced to the real `vue-tsc` dts emit.
4. **The last legacy alias deletes.** `useSpringOrchestrator` removed; 9 touches migrated to `useNumericTransition`; grep 0. Clean break, no replacement.
5. **The CSS consolidates against a true ceiling.** ~6.5 KiB gzip reclaimed (dock dedup + `:where()` hoists + prose trim); ceiling re-based to 82500 gzip (the measured draw + ~10%); per-subpath drift enforcement added; `drawer.css` double-`hsl()` bug fixed.
6. **The root-surface contract is true** (W5-discovered, 4th stale self-description). `proof-consumers-static`'s `rootContractFiles` predated the L.W2 restructure + the 7 custom cherry-picks, flagging ~40 legitimate root exports as unexpected — a false-witness that would fail CI on first push. Resynced to the real barrel; the `prepare` dts guard hardened.
7. **Consumer-gap (speedtest AQ).** R0G-1 Aurora demand-driven/visibility-paused loop (+ a latent post-arm resume-seam bug fixed); R0G-2 InstrumentChassis breakpoint child reserve; R0G-3 `useIdleReady` (5-site promotion); R0G-4 `Toaster` `position`; R0G-5 `--surface-public-data-panel` token.

## § Commits (22)

W0 fold: `dfdd7dd` `dea1072` `bd01786` · W1: `f4ba2e9` · W2: `f79df28` `b10c66f` `9e5c036` `9f90bb4` `84aa3d0` · W3: `f934fed` `f76f7bf` `029d052` `8e299a6` `ab93d38` `c92b2a5` · W4: `1470d38` `d30f251` `bd7842f` `d76caf0` · W5: `c2c5b3c` `46ac5a6` + the close commits.

## § Watched-conditions ledger

| Condition | Realisation trigger |
|---|---|
| AN ARCHIVED — interruptible MetricStack reorder recipe | ≥ 2 mid-drag-reorder consumers |
| AN ARCHIVED — dock panel-host variant | ≥ 2 tall-vertical-pane consumers |
| Inline-edit primitive (bbnf-buddy `EditableNumber` + words `EditableField`) | the 2 divergent shapes converge |
| `LabeledSlider` numeric-readout | a 3rd consumer wants it |

No condition cleared during AO. `useIdleReady` cleared its gate (5 sites) and shipped.

## § Cross-repo user-domain perimeter

All need the user's GitHub push authority (surfaced, not absorbed):

1. **Push glass-ui's held commits to `origin`** — the provenance gap (npm 2.1.0 is live and consumed, but its source is single-copy local; the AO commits compound this). One `git push` reconciles source with the published artifact and lets CI run for the first time (which validates the now-true gates).
2. **Seed the `NPM_TOKEN` repo secret** — activates the never-run `release.yml`.
3. **Cut the 3.0.0 release** — the `.changeset` is consumed and `package.json`/`CHANGELOG.md` staged locally; the user pushes branch + the `v3.0.0` tag, `release.yml` runs the gate matrix + `changeset publish` (the first end-to-end changeset-driven publish). `npm publish` is outward-facing → confirm-first. After publish, speedtest pins `^3.0.0` and adopts per its AQ acceptance gates.
4. **Reconcile the precepts submodule** — commit + push its dirty files + bump glass-ui's gitlink.

## § Net delta

A library that now measures, builds, and describes itself truthfully: the budget gate guards the real cascade, the build runs lean under its actual toolchain, the surface proof matches the real barrel, the last legacy alias is gone, the cascade reclaimed ~6.5 KiB of honest headroom, and five consumer-driven items (one new gate-cleared composable, two perf/correctness fixes to existing primitives, an additive prop, a theme token) ride the first changeset-driven 3.0.0 cut. Zero brittleness windows declared and held; no rename (inv 43); the only irreversible op (publish) is user-domain.

## § Authority

AO ran under the standing tranche directive ("complete the plan IN TOTALITY... NO quick solutions, NO workarounds: idiomatic, gestalt approaches"), which authorized crossing the W1|W2 dev/impl boundary. Orchestrator-led with deep parallelization (4 W1 design agents, 2 W2 agents, 4 W3 agents, 2 W4 carves); the orchestrator owned the git index throughout (agents edit-only / read-only-git). The speedtest-AQ consumer fold was disposed under AO's delegated ownership per the request spec.
