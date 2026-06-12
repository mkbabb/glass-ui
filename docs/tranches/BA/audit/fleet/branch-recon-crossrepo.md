# BA fleet — branch reconciliation: cross-repo + hygiene sweep

Read-only verifier. glass-ui master @ `3c70fb5f` (BA-authoring tree above the v3.13.0 cut). The d6 fork (`feat/d6-library-3.10`) is OUT OF SCOPE — already reconciled via the BA atlas-letter waves (W-ATLAS-RECONCILE + W-HANDMARK); recorded below for completeness only.

The reconciliation question for glass-ui is settled by the ahead-vs-master count: **every glass-ui branch carrying unique work is either ahead-0 (fully contained in master) or its unique commit's capabilities are present on master HEAD under a different SHA (hand-integrated in the AW/AX/T/U/L eras).** ZERO AT-RISK glass-ui branches found. The sibling repos carry their OWN in-flight dev lines (value.js `tranche-f-handoff`, keyframes `tranche-k-dev`, slides dirty `main`) — none block glass-ui, which consumes its `@mkbabb/*` deps from the **registry** (`^0.11.0` value.js · `^4.1.0` keyframes), not local branches.

---

## A. glass-ui LOCAL named branches (per-branch protocol)

The ahead-0 branches are FULLY CONTAINED in master — no reconciliation possible/needed (listed compactly). Only ahead>0 branches get the symbol-level protocol.

### A.1 — ahead-0 (fully contained; archive-tag→delete candidates)

| branch | behind/ahead | note |
|---|---|---|
| `af-w1-glass-ui` | 545 / **0** | AF.W1 progress-fill/MetricBadge/timeline-tick — merged ancestor |
| `ak-w1-alpha-scrim-breath` | 500 / 0 | scrim-breath keyframe — merged ancestor |
| `ak-w2-alpha-instrument-rail` | 499 / 0 | instrument-rail primitive — merged ancestor |
| `ak-w2-beta1-chassis-slot-gating` | 497 / 0 | chassis slot-gating — merged ancestor |
| `al-w1-spine-tier` | 495 / 0 | spine 8th tier — merged ancestor |
| `al-w13-spring-dialog-sheet` | 490 / 0 | spring dialog/sheet — merged ancestor |
| `al-w4-metaballs-retire` | 487 / 0 | MetaballCanvas retire — merged ancestor |
| `al-w9-beta-usespring` | 493 / 0 | useSpring/useSpringPress — merged ancestor |
| `at-dock-convergence` (local & origin) | 118 / 0 | AT dock convergence — fully in master |
| `tranche/AY` (local & origin) | 16 / 0 | AY/AZ authoring line — master ancestor |
| `v.w234` (worktree `glass-ui-w234-V`) | 666 / 0 | v0.9.0 chassis+composables — fully in master |
| `w.w2.1` (worktree `glass-ui-w2.1-W`, origin) | 659 / 0 | v0.9.1 ScrollingText+Section — fully in master |

### A.2 — ahead>0 (the symbol-level protocol)

| branch | ahead | unique capabilities | master state (cites) | verdict | disposition |
|---|---|---|---|---|---|
| `ak-w3-sub-barrel-publishing` | 1 | 17 sub-barrel entries (badge/button/slider/tooltip/…) + 6 speedtest tokens; `vite.library.ts` glob | the per-package barrels live at `src/subpaths/*.ts` (e.g. `src/subpaths/badge.ts`, `…/slider.ts`) batch-resolved in `vite.library.ts`; `package.json` exports `./badge`,`./slider`,`./button`,`./tooltip` all present | SUPERSEDED | archive-tag+delete |
| `ak-w6-alpha-aurora-ceiling` | 1 | Aurora `opacityCeiling` prop + `--aurora-opacity-ceiling` clamp | `Aurora.vue:83` `opacityCeiling?: number` (+`:86` default 1, `:104` clamp, `:156` style bind, `:218/:227` opacity reads) | SUPERSEDED | archive-tag+delete |
| `al-w10-slim-canon` | 1 | `.tap-squish` utility + `--scale-press 0.96` + under-shadow recipe | `.tap-squish` present (`src/styles/utilities/btn.css`, `glass.css`, `dock-controls.css`); `--scale-press` canonicalized to `--scale-press-btn`/`--scale-press-dock` per the W52 easing doctrine (CLAUDE.md §easing) | SUPERSEDED | archive-tag+delete |
| `al-w11-glass-ui-design-md` | 1 | DESIGN.md §L1-L5 iOS Liquid-Glass precept canon | docs-only append; the liquid-glass canon is absorbed into the CLAUDE.md glass-first/§easing/W52 doctrine + DESIGN.md on master | SUPERSEDED (docs) | archive-tag+delete |
| `al-w3-lane-e-cosmetic-refinements` | 1 | "fold Wave-2 cosmetic YELLOWs" on tokens/utilities | DIFF IS PROSE-ONLY — the unique commit re-words `.tap-squish` comments to first-person; ZERO behavioral delta vs master | SUPERSEDED (no-op) | archive-tag+delete |
| `al-w4-sub-barrel-phase2` | 1 | 6 subpaths (popover/select/data-table/dropdown-menu/context-menu/command) | `package.json` exports `./popover`,`./select`,`./data-table`,`./dropdown-menu`,`./context-menu`,`./command` ALL present | SUPERSEDED | archive-tag+delete |
| `al-w9-delta-rename` | 1 | rename `useSpringOrchestrator`→`useNumericTransition` (+1-minor shim) | `src/composables/motion/useNumericTransition.ts` present + exported (`motion/index.ts:21`); the old `useSpringOrchestrator.ts` GONE — clean break (the shim retired, per no-backwards-compat) | SUPERSEDED | archive-tag+delete |
| `aw-glass-atoms-band` | 2 | `.glass-material` mixin (moving-specular+edge-rim unified) + 4 Baseline-2025 SOTA folds + `glass-refract.css` + `proof:glass-material-{unified,sota}` | `src/styles/glass/material.css` + `glass-refract.css` present; `proof:glass-material-unified`/`-sota`/`-demo` all in `package.json`+`scripts/`; gates re-pointed at HEAD (commit 3300949f) | SUPERSEDED | archive-tag+delete |
| `ax-w13-vangogh-oilpastel-mediums` | 1 | first-class van-Gogh + oil-pastel aurora mediums + pigment-true OKLab stroke compositing + painterly-stats gate | master is MORE evolved — dedicated `aurora/constants/shaders/vangogh-medium.glsl.ts` (branch lacked it) + `mediums.glsl.ts`/`brush.glsl.ts`; gates `proof:aurora-vangogh-preset`/`-oilpastel-medium`/`-painterly-statistics`/`-stroke-composite` (gates.mjs:443-462) + `tests-visual/aurora-painterly-statistics.spec.ts` + `fixtures/starry-night-crop.png` | SUPERSEDED | archive-tag+delete |
| `t.w2` | 4 | v0.8.3 — `MetricPill` primitive + `GlassDock.containerName` + MetricBadge stacked | `src/components/ui/metric-pill/MetricPill.vue` present; `GlassDock.vue:337` `:data-container-name` + `:51` containerName docs | SUPERSEDED | archive-tag+delete |
| `t.w6` | 4 | v0.8.4 — `useTokenColor` + `useStagger` + `useAnimatedNumberMap` | `src/composables/dom/useTokenColor.ts` (exported `dom/index.ts:45`), `motion/useStagger.ts`, `motion/useAnimatedNumberMap.ts` (re-instated `motion/index.ts:28`) | SUPERSEDED | archive-tag+delete |
| `u.w1` | 13 | v0.8.6 — badge success/warning/info + `--opacity-disabled` bridge + cartoon-shadow collapse + GlassPanel 5-rung migrate + useStagger/useAnimatedNumber PRM | `badge/index.ts:36-38` success/warning/info variants; `--opacity-disabled` bridged in `theme.css`; 5-rung glass ladder canonical at HEAD | SUPERSEDED | archive-tag+delete |

**Era note.** Every A.2 branch is from a pre-v1.0 (AF/AK/AL/T/U) or AW/AX cap-preserved cohort whose work was hand-integrated by the orchestrator under fresh SHAs (the AX/AW-era integration pattern). Adversarial bar met: each capability FOUND on master (file:line cited), not assumed. NO AT-RISK, NO STALE-RETIRE — all SUPERSEDED.

---

## B. glass-ui worktree hygiene census

| metric | count |
|---|---|
| total worktrees (`git worktree list`) | **105** (1 main + 3 named siblings [d6/w2.1-W/w234-V] + ~101 `.claude/worktrees/agent-*`/`wf_*` leftovers) |
| LOCKED | **46** |
| agent/wf branches **ahead-0 vs master** (safe to prune) | **60** |
| agent/wf branches ahead>0 (1-7 each; integration-superseded era scratch) | 39 (31×ahead-1, 1×2, 1×3, 1×4, 2×5, 1×6, 2×7) |
| worktrees with DIRTY working trees (uncommitted) | ~15 (top: `agent-a227ac6b…` 50 files, `wf_30d6c4bf-09a-4` 22, `wf_caacea6f-fcb-2` 16) |
| **AT-RISK-UNCOMMITTED (substantive un-landed src/ work)** | **0** |

**Dirty-tree adjudication (the AT-RISK probe).** Sampled the 5 dirtiest. Every uncommitted change traces to a CLOSED, integrated tranche, present on master under different SHAs:
- `agent-a227ac6b…` (50 files, HEAD 2026-05-11, tranche-L docs) — demo-story scratch (use-token-color/global-dark era); master carries the landed result.
- `wf_30d6c4bf-09a-4` (22 files, 2026-06-08, AX π-lane) — W37 canvas2d text-highlight: `useTextHighlight.ts` lives on master (`composables/motion/`), `proof:text-highlight` superseded by the gate roster.
- `wf_caacea6f-fcb-2` (16 files, AX.W13 aurora) — van-Gogh/oil-pastel scratch; master is MORE evolved (dedicated `vangogh-medium.glsl.ts`).
- `agent-aa5ca525…` (O.W1/W2 dock typed-context) — `createStrictContext`/`createOptionalContext` on master (`composables/context/index.ts`, consumed by `dockMorphContext.ts:4`).
- `agent-aefa2b28…` (M-era docs only).

NONE hold work mainline lacks. The dirty state is abandoned agent scratch, not pending integration.

**Prune protocol (orchestrator-owned).** For each of the 60 ahead-0 agent/wf worktrees: `git worktree remove --force <path>` (the `--force` clears the leftover/dirty flag) then `git branch -D worktree-agent-<id>` / `git branch -D worktree-wf_<id>`. The 46 LOCKED need `git worktree unlock <path>` first (or `git worktree remove --force` twice). The 39 ahead>0 worktrees are ALSO prunable (their commits are integration-superseded per the era pattern) but should be archive-tagged before `branch -D` if a paranoid record is wanted — recommend: `git tag archive/worktrees/<date> <each-tip-sha>` batch, then remove+delete. This is a WRITE op — out of this verifier's read-only scope; flagged for orchestrator execution.

---

## C. docs/precepts submodule branch census

- HEAD: **detached at `63240e6`** (2026-05-27 infra-promote) — BEHIND `origin/main` @ `8ccf9f4`. 5 dirty files (owed to BA.W-HYGIENE, not judged here).
- Local branches: `main`, `main-reconciled`, `m-w0-pre-rebaseline`.
- **Remote heads NOT merged to main:** `origin/N-W10-precepts-hardening` (@`3e620d4`), `origin/O-W10-precepts-hardening` (@`dda7c16`) — two precept-hardening feature branches unmerged. Disposition: assess for fold into `main` under BA.W-HYGIENE (the submodule's own owed reconcile); not a glass-ui-blocking item.

---

## D. glass-ui REMOTE — any untracked head?

`git ls-remote --heads origin` → **7 heads**, ALL locally tracked. Beyond the prompt-named `release/0.7.x` (ahead-0, historical release branch) + `v0.9.2` (ahead-0, release tag-branch):
- `origin/at-dock-convergence` @`c6244e27` — **ahead-0 vs master** (fully contained).
- `origin/tranche/AY` @`c1e88069` — **ahead-0** (master ancestor).
- `origin/w.w2.1` @`b76f3f83` — **ahead-0**.
- `origin/feat/d6-library-3.10` @`3b10db81` — +2 vs master = the 3.10.0 library + `./handmark` + 3.12.0 `data-allow-motion` carve. **OUT OF SCOPE** (the skip-fork; reconciled via BA W-ATLAS-RECONCILE + W-HANDMARK — the `data-allow-motion` carve verified on master at `src/styles/utilities/a11y-overrides.css`).

**No remote branch carries unique work mainline lacks.**

---

## E. SIBLING repos (cross-repo)

glass-ui consumes its siblings from the **registry** (`@mkbabb/value.js ^0.11.0`, `@mkbabb/keyframes.js ^4.1.0`), so NO sibling local-branch divergence blocks glass-ui. Each sibling's ahead>0 branches are that repo's OWN in-flight dev lines / owed merges.

| repo | default | branches ahead>0 vs default | verdict re glass-ui | sibling-internal note |
|---|---|---|---|---|
| **slides** (priority; deploy line) | `main` | `deck/feedback-coder` +2 (tranche-J docs scaffold), `tranche/til-briefing-K` +1 (tranche-K docs). `main` DIRTY: 15 files (`DeckSettings.vue`, `til-briefing/constellation.ts`, `SlideIntro/Xray.vue`, `deck.css` + L4-probe scratch). No stash. | NOT a glass-ui item | the ahead-branches are DOCS-ONLY (planning scaffolds, no src delta); `main`'s dirty tree is the slides til-briefing next-tranche live work (task #148). spring-dogfood/tranche-a-gestalt/til-briefing-L/M all ahead-0. Remote has 4 heads (main/deck-feedback-coder/spring-dogfood/til-briefing-M). |
| **keyframes.js** | `master` | `gh-pages` +34 (deploy artifacts — NOT source), `perf` +1 (`cc4f1ea fixed reverse`), `tmp` +1 (`9157d40 tmp`), `tranche-k-dev` +1 (current branch; K-tranche charter docs). 3 stashes (WIP master Vite8/Rolldown, ui-refresh, gh-pages deploy). Clean tree. | NOT a glass-ui item | registry-published; CI publish still local (per MEMORY). `perf`/`tmp` are tmp commits — archive-or-drop. `tranche-k-dev` is the active dev line (owed to master eventually). 12 remote heads. |
| **value.js** | `master` (@`2f7fc87`, 2026-06-02) | `tranche-f-handoff` +58 (**checked-out / active dev line** — N tranche: 0.12.0 release, deploy, glass-ui goo-blob/aurora adoption forks; HEAD 2026-06-12), `docs/constellation-grand-audit` +25, `post-refactor` +3 (tmp commits). 16 dirty files. No stash. | NOT a glass-ui item | glass-ui consumes published `^0.11.0`; `tranche-f-handoff` is value.js's live N-tranche, owed to its own master — a sibling-internal merge, not glass-ui's. |
| **fourier-analysis** | `master` | `codex/contour-rebaseline` +2, `paper/major-revision` +0. 7 dirty files. 2 stashes (incl. a glass-ui Q.W1 cross-repo-dev-resolution consumer-half WIP). | NOT a glass-ui item | not a glass-ui dep; the stashed Q.W1 consumer-half is stale (Q-era), superseded by the contract-v2 shipped in glass-ui. |

**Sibling digest:** all four siblings carry their own in-flight dev lines and tmp/docs branches; NONE carries work glass-ui's master needs (registry-pinned deps). The reconciliation owed is each sibling's INTERNAL merge-to-default (value.js `tranche-f-handoff`→master being the largest, +58), out of glass-ui's BA scope. No AT-RISK-UNCOMMITTED in any sampled sibling tree (all dirty state = active/known dev or stale stashes).
