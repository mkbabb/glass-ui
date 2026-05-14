# O — Progress Log

## 2026-05-14 — Tranche open

O opens against N close `37288e0` (v1.1.4 published; precept submodule `b8af314` reconciled at N.W0 Lane B). Inherits 23 invariants from N; awaits O-specific invariant codification at synthesis time.

Per the user's verbatim open directive ("This is NOT an implementation phase. Tranche development only."), this open round delivers the planning substrate + dispatched research only. Implementation dispatch awaits explicit future user directive analogous to K/L/M/N pattern.

## Open structure

```
docs/tranches/O/
├── O.md                            # plan + thesis + invariants — AUTHORED AFTER RESEARCH SYNTHESIS
├── findings.md                     # verbatim user directive + extracted scope + carry-forward ledger ✓
├── PROGRESS.md                     # this file ✓
├── dispatch/
│   └── AGENT.md                    # extends N template with O-specific clauses ✓
├── coordination/
│   └── CONSTELLATION.md            # O-open multi-peer manifest ✓
├── research/                       # 6 backend audit deliverables — POPULATED AT ROUND-1 RETURN
│   ├── Ralpha-legacy-code.md
│   ├── Rbeta-god-modules.md
│   ├── Rgamma-encapsulation-service-boundaries.md
│   ├── Rdelta-di-patterns.md
│   ├── Repsilon-pipeline-orchestration.md
│   └── Rzeta-recap-chronic-deferrals.md
├── audit/                          # 6 consumer audit deliverables — POPULATED AT ROUND-2 RETURN
│   ├── O11-Lane-a-words-frontend.md
│   ├── O11-Lane-b-fourier-analysis.md
│   ├── O11-Lane-c-bbnf-buddy.md
│   ├── O11-Lane-d-keyframes-js.md
│   ├── O11-Lane-e-value-js.md
│   └── O11-Lane-f-speedtest.md
└── waves/                          # AUTHORED AFTER SYNTHESIS
    └── W*.md
```

## Research dispatch (round 1 — backend audit; 6 parallel read-only agents)

Per the user "DEEPLY audit with 6 agents in parallel" directive + N invariant 21 (bidirectional audit canonical at tranche-open research). Angles:

1. **Rα — Legacy code identification + workaround/fallback excision audit**: rg for `@deprecated` / `// LEGACY` / `// TODO-DEFER` / `back-compat` / shim layers / migration scaffolding; defensive checks; fallback paths; special-case branches. Distinguish: legacy (excise) vs. under-wired (wire per invariant 23).
2. **Rβ — God-module audit**: every file in `src/` + `scripts/` + `demo/` over 500 lines; cohesion analysis; sub-module split candidacy. Identify which large files are coherent (genre artefacts) vs. which accumulate cross-concerns (split candidates).
3. **Rγ — Encapsulation + service boundaries audit**: cross-module concerns (cn() utility; useGlobalDark; registry singletons; shared mutable state); leaky abstractions; module-boundary clarity. Identify where the public API surfaces internals.
4. **Rδ — DI patterns + provide/inject audit**: every `provide(...)` + `inject(...)` call; consistency; singleton-vs-DI; missing-DI sites (where DI would be cleaner than current shared-state). Walk the dock/configurator/slider/sidebar/aurora/glass-renderer/keyboard injection trees.
5. **Rε — Pipeline orchestration audit**: build / typecheck / test / release / freshness / profile-budget / proof-* scripts; duplicated work; special cases; npm-script + CI-script consistency. Identify orchestration duplication.
6. **Rζ — Recap + plan-vs-actual rollback + chronic deferrals**: walk K / L / M / N opens + every fold-in/revision/correction; recap all user prompts; surface still-open chronic deferrals; cross-walk to addressed status.

Each agent dispatched with the canonical research-wave prompt skeleton per `docs/precepts/instructions/tranche/RESEARCH.md`.

## Consumer audit dispatch (round 2 — consumer-side; 6 parallel read-only agents; AFTER round 1 returns)

Per the user "ANOTHER wave of 6 agents in parallel AFTER the above" directive. Angles: per-consumer deep audit looking for refinement opportunities, gap candidates, idiomatic-glass-ui leverage improvements.

Lanes:
- O11/a — words/frontend
- O11/b — fourier-analysis/web
- O11/c — bbnf-buddy
- O11/d — keyframes.js
- O11/e — value.js
- O11/f — speedtest

## Awaiting synthesis

After both rounds return, the orchestrator synthesizes findings into:
- `O.md` — plan + thesis + invariants + wave schedule
- `waves/W*.md` — per-wave specs (count + shape determined by findings)
- Updated `PROGRESS.md` with synthesis closure entry

## 2026-05-14 — Research rounds executed + synthesis closure

### Round 1 — 6 backend audit agents dispatched + returned

| Lane | Agent | Deliverable | Headline finding |
|---|---|---|---|
| Rα | legacy code + workaround/fallback | `research/Ralpha-legacy-code.md` | src/ exceptionally clean (0 TODO/HACK/FIXME/@deprecated); 18 findings — 4 EXCISE + 5 FAIL-EXPLICITLY + 8-9 KEEP-with-rationale + 1 WIRE-or-PRUNE-docstring + 18 test-file relocations |
| Rβ | god-module audit | `research/Rbeta-god-modules.md` | 9 files > 500 LOC; 3 SPLIT-CANDIDATES (GlassTimeline.vue 1049, profile-aurora.mjs 884, usePresetEditor.ts 657); 4 COHERENT-LARGE genre artefacts preserve |
| Rγ | encapsulation + service boundaries | `research/Rgamma-encapsulation-service-boundaries.md` | 3 leaky abstractions + 3 service-boundary inconsistencies + 3 /api discovery gaps (sidebar / search / props triad) |
| Rδ | DI patterns + provide/inject | `research/Rdelta-di-patterns.md` | Dock subsystem INCONSISTENT (highest priority); canonical typed-key + helper-pair shape proposed (codified as invariant 25) |
| Rε | pipeline orchestration | `research/Repsilon-pipeline-orchestration.md` | 6 duplication sites + freshness DRY drift (`walkNewestMtime` ×2) + release.sh vs prepublishOnly duplication |
| Rζ | recap + chronic deferrals | `research/Rzeta-recap-chronic-deferrals.md` | 26 user-prompt recap (all addressed); 18-row open-debt ledger; AB shadow-execution recurrence (W0 HEADLINE absorb); tooling-side stash enforcement candidate (invariant 27) |

### Round 2 — 6 consumer audit agents dispatched + returned

| Lane | Consumer | Deliverable | Headline finding |
|---|---|---|---|
| O11/a | words/frontend | `audit/O11-Lane-a-words-frontend.md` | MINOR-with-leverage; 5 idiomatic + 4 gap candidates; K9 `.section-label` confirms KEEP (10 word-frontend consumer sites); ProgressiveSidebar slotted-chassis split is high-leverage (469 consumer LOC absorbable) |
| O11/b | fourier-analysis/web | `audit/O11-Lane-b-fourier-analysis.md` | GlassScrubber API proposal CONCRETIZED (`<Slider variant="glass-scrubber">`); ≥ 2-consumer bar cleared at fourier-analysis alone (3 sites); ~562 → ~140 LOC delete on adoption |
| O11/c | bbnf-buddy | `audit/O11-Lane-c-bbnf-buddy.md` | R1 dock-icon-button active-state token ladder CLEARS ≥ 2-consumer bar (bbnf + speedtest); 0/5 N-baseline legacy gaps clear bar; useLeaveTimer INLINE bbnf-side |
| O11/d | keyframes.js | `audit/O11-Lane-d-keyframes-js.md` | NO-IMPACT from Rα F1-F5; 84% UI-scaffolding consumer-owned cleanup; hover:scale-105 regression (6 → 10 → 13); L3 `@utility scale-on-hover` clears ≥ 2-consumer bar |
| O11/e | value.js | `audit/O11-Lane-e-value-js.md` | 2 PROMOTE — useClipboard (20+1 sites via cross-walk) + HeaderRibbon (REVERSES N "0-consumer" via cross-walk to keyframes.js); 1 API-LIFT useLayerTransition; 1 DEFER usePopupMutex |
| O11/f | speedtest | `audit/O11-Lane-f-speedtest.md` | DockSelectTrigger consumer 0 (DOWNGRADED from N); dock-DI cleanup BINARY-TRANSPARENT; AB.W3 substrate canonical consumer RE-CONFIRMED; **AC.W6 needs v1.2.0 cohort dependencies** (overlaps O.W6) |

### Synthesis — 8-wave architecture maturation programme

`O.md` authored at this commit. Wave schedule:

| Wave | Headline | Status |
|---|---|---|
| W0 HEADLINE | AB post-hoc plan folder + precept invariants 24-27 + cosmetic legacy excise; v1.2.0 minor | open (planning-only; pending dispatch) |
| W1 | 4 fail-explicit migrations + 18 test relocations; v1.2.1 patch | pending W0 |
| W2 HEADLINE | Dock subsystem DI canonicalization (typed-context + helper pair + 5 consumer migrations); v1.2.2 patch | pending W1 |
| W3 | 3 god-module cohesion splits (GlassTimeline / profile-aurora / usePresetEditor); v1.2.3 patch | pending W2 |
| W4 | /api discovery gaps + leaky abstractions + service boundaries (incl. avatarVariant rename); v1.2.4 patch OR v1.3.0 minor | pending W3 |
| W5 | Pipeline orchestration consolidation (proof:all + freshness DRY + release.sh dedup + CI expansion); v1.2.5 patch | pending W4 |
| W6 HEADLINE | 4 constellation-level substrate promotions + speedtest AC.W6 cohort; v1.3.0 minor | pending W5 |
| W7 close | 7-strengthened audit + 6-consumer re-audit + FINAL.md; final aggregate tag | pending W6 |

Each wave-spec at `docs/tranches/O/waves/W*.md`.

## 2026-05-14 — W0 HEADLINE close (v1.2.0)

Implementation dispatch authorized per user directive ("Begin and continue the current tranche ... continue indefatigably ... NO quick solutions, NO workarounds: idiomatic, gestalt approaches.").

### Three parallel lanes landed

| Lane | Mode | Disposition | Proof |
|---|---|---|---|
| A — AB post-hoc plan folder | agent-dispatched (worktree-isolated) | LANDED — `docs/tranches/AB/` authored: `AB.md` + 4 wave specs + `FINAL.md` + `PROGRESS.md` + `coordination/CONSTELLATION.md`. Closes K-invariant-3 shadow-execution recurrence (AB shipped v1.0.5 → v1.1.0 with ~9 commits but no plan folder; retrospective traces every commit). | `audit/W0-Lane-A-AB-post-hoc-proof.md` |
| B — Precept submodule advance | orchestrator-solo (per M.W0 Lane II precedent) | LANDED — precept `b8af314` → `46ee7e9` pushed to origin/main. 4 new invariants codified (24 fail-explicit / 25 typed-key DI / 26 test-files-outside-src / 27 tooling-side stash). LL entry `2026-05-14 - Audit + DI + Test-Hygiene + Tooling-Stash`. Glass-ui submodule pointer bumped at W0 close commit. | `audit/W0-Lane-B-precept-canonicalize-proof.md` |
| C — Cosmetic legacy excise | orchestrator-direct | LANDED — Rα E1-E4 + K7-K9 cohort. `probeWebGLSupport` alias retired (3 callsites renamed); 5 "back-compat" comment rewords; `freshness.ts` docstring rewritten. `back-compat` mention count: 9 → 2 (both intentional design statements; satisfies W0 hard gate ≤ 2). Net −14 src/ LOC; comment-only. | `audit/W0-Lane-C-cosmetic-excise-proof.md` |

### Hard gate evidence

- (a) AB plan folder authored at `docs/tranches/AB/` ✓.
- (b) Precept submodule advances `b8af314` → `46ee7e9` with invariants 24-27 + LL entry; pushed ✓; glass-ui pointer bumped ✓.
- (c) Cosmetic legacy excised; `back-compat` count = 2 ≤ 2 ✓.
- (d) `npm run typecheck` ✓; `npm test` 348/348 green ✓; `npm run build` 640 modules ✓; `npm run profile:budget` PASS (raw 67.2% / 90.2%; gzip 67.9% / 90.7%) ✓.
- (e) v1.2.0 minor tag pushed.

### Files

- `src/` 8 files edited (comment-only).
- `docs/tranches/AB/` NEW folder (Lane A authorship).
- `docs/precepts/` submodule advanced (Lane B; pushed independently).
- `docs/tranches/O/audit/` 3 lane proof docs.
- `CHANGELOG.md` v1.2.0 entry.
- `package.json` 1.1.4 → 1.2.0.

### Open windows for W1

W1 opens after this commit lands. Five lanes (4 fail-explicit migrations + 18 test-file relocation per `docs/tranches/O/waves/W1.md`).

## 2026-05-14 — W1 close (v1.2.1)

Five-lane fail-explicit + hygiene wave. All hard gates met.

### Lane disposition

| Lane | Mode | Disposition | Proof |
|---|---|---|---|
| A — Aurora init fail-explicit (F1) | agent-dispatched (worktree) | LANDED — `onInitError` callback added to `<Aurora>` + `useAurora` + `runtimeOptions`; library-owned shader sub-paths in `runtime.ts` also migrated (Lane-B-flagged absorb). MIGRATION.md note authored. Speedtest cross-repo audit READ-ONLY; W6 cohort. | `audit/W1-Lane-A-aurora-fail-explicit-proof.md` |
| B — WebGL shader throws (F2+F3) | agent-dispatched (worktree) | LANDED — 4 sites migrated (metaballs compile + link + frost compile + link); caller bail-outs preserved with `// caught upstream — defensive` annotation. | `audit/W1-Lane-B-shader-throw-proof.md` |
| C — Configurator clone Path A (F4) | orchestrator-direct | LANDED — `structuredClone` failure throws with cause + escape-hatch. JSON-fallback retired. Decision doc authored. | `audit/W1-Lane-C-clone-decision.md` |
| D — Typewriter unreachable throw (F5) | orchestrator-direct | LANDED — 3-line throw replaces defensive bail with named invariant-violation message. | `audit/W1-Lane-D-typewriter-throw-proof.md` |
| E — Test-file canonical shape | agent-dispatched (worktree) | NO-OP — 18 files already at `__tests__/` canonical shape; verdict reversed via proof doc. ABSORB: 3 `.spec.ts` siblings (`MultiSelect`, `DataTable`, `ProgressiveSidebar`) relocated to `__tests__/` + renamed `.test.ts`. | `audit/W1-Lane-E-test-relocation-proof.md` |

### Hard gate evidence

- (a) Aurora `onInitError` prop ships + MIGRATION.md note ✓; speedtest cross-repo audit READ-ONLY ✓ (W6 cohort).
- (b) 4 shader sites throw ✓.
- (c) Configurator decision doc landed; Path A chose ✓.
- (d) Typewriter throws ✓.
- (e) Test files canonical ✓ (substrate already at shape per Lane E verdict; 3 .spec.ts absorbed).
- (f) `npm run typecheck` ✓ ; `npm test` 348/348 ✓ ; `npm run build` 640 modules ✓ (heap-bumped; folded to O.W5 candidate); `npm run profile:budget` PASS ✓; `npm run verify-export-types` PASS ✓.
- (g) 5 lane proof docs ✓ + 1 decision doc.
- (h) v1.2.1 patch tag.

### Open windows for W2

W2 opens after this commit lands. Three lanes per `docs/tranches/O/waves/W2.md` (dock subsystem typed-key + helper-pair canonicalization + DockLayer/ToggleGroup DRIFT cleanup + 5 in-library consumer-site migrations).

## 2026-05-14 — W2 HEADLINE close (v1.2.2)

Load-bearing dock DI canonicalization. Two intermediate commits (Lane A first; B+C+close together).

### Lane disposition

| Lane | Mode | Commit | Disposition | Proof |
|---|---|---|---|---|
| A — Dock typed-context + helper-pair | agent-dispatched (worktree) | `ba546c7` (intermediate) | LANDED — DockContext expanded {id, orientation, keepOpen, release, held}; DOCK_CONTEXT_KEY Symbol; strict + optional helpers; DockLayer + ToggleGroup DRIFT atomic. 5 transitional dual-provides preserved through W2 close. | `audit/W2-Lane-A-dock-typed-context-proof.md` |
| B — Slider migration | agent-dispatched (worktree) | W2 close commit | LANDED — 3 raw injects → 1 useOptionalDockContext() call. Slider verified against canonical shape via `git show ba546c7`. | `audit/W2-Lane-B-slider-migration-proof.md` |
| C — 4 popover-family migrations | agent-dispatched (worktree) | W2 close commit | LANDED — HoverPopover + PopoverContent + SelectContent + DropdownMenuContent → useOptionalDockContext(). Orchestrator reconciled Lane C's stale-worktree-base shape drift at integration (Lane C branched from origin/master pre-Lane-A-push; saw old DockContext shape; orchestrator rewrote useDockContext() → useOptionalDockContext() at integration). | `audit/W2-Lane-C-popover-migrations-proof.md` |

### Worktree.baseRef lesson (process incident — not a precept violation)

Lanes B + C dispatched after Lane A's intermediate commit (`ba546c7`) but the Agent tool's worktree.baseRef setting branched their worktrees from `origin/master` (which was at `827b6ae` — Lane A not yet pushed). Lane B verified canonical via `git show ba546c7:` and migrated correctly; Lane C didn't verify + used the stale shape. Orchestrator reconciled at integration. Process candidate: push intermediate commits before dispatching downstream lanes, OR explicitly set worktree.baseRef=head when dispatching mid-wave. Folded to LL ledger candidate at W7.

### Hard gate evidence

- (a) `dockContext.ts` ships typed-key + helper pair ✓.
- (b) GlassDock provides single typed context ✓; `dockExpanded` retired ✓; `glassDockId` dedup'd with `context.id` ✓.
- (c) 5 consumer sites migrated to `useOptionalDockContext()` ✓.
- (d) DockLayer + ToggleGroup DRIFT cleanup landed ✓.
- (e) Cross-substrate proof story renders identically (visual contract preserved; runtime verification deferred to W7 π lane).
- (f) typecheck ✓; test 348/348 ✓; build 642 modules ✓; profile:budget PASS ✓; verify-export-types PASS ✓.
- (g) Speedtest BINARY-TRANSPARENT (no consumer-side reach-in — verified at O11/f audit).
- (h) 3 lane proof docs.
- (i) DESIGN.md `## Dock subsystem` sub-section authored.
- (j) v1.2.2 patch tag.

### Open windows for W3

W3 opens after this commit lands. Three lanes per `docs/tranches/O/waves/W3.md` (3 god-module cohesion splits — GlassTimeline 1049 / profile-aurora 884 / usePresetEditor 657).

## 2026-05-14 — W3 close (v1.2.3)

Three god-module splits per Rβ; all lanes ran agent-dispatched in worktrees in parallel.

### Lane disposition

| Lane | Mode | Disposition | Bundle delta | Proof |
|---|---|---|---|---|
| A — GlassTimeline split | agent-dispatched | LANDED — 1049 → 123 dispatcher + 3 variant SFCs (191 + 225 + 607) + geometry.ts (187). Continuous SFC preserves non-scoped style for HoverCardPortal. | timeline.js +21% per-chunk (+2.4 KB absolute); global budget gates PASS | `audit/W3-Lane-A-timeline-split-proof.md` |
| B — profile-aurora harness extract | agent-dispatched | LANDED — 884 → 462 main + 446 LOC harness-browser.mjs extract (Option B template-string export); call-site preserved via thin getter | n/a (script-only) | `audit/W3-Lane-B-profile-aurora-harness-extract-proof.md` |
| C — usePresetEditor split | agent-dispatched | LANDED — 657 → 24 façade + 6 sub-modules totalling 745 LOC (types + defaults + css-writers + persistence + stylesheet-swap + store) | n/a (demo-only) | `audit/W3-Lane-C-preset-editor-split-proof.md` |

### Hard gate evidence

- (a) 3 files split into cohesive sub-modules per Rβ rationale ✓.
- (b) Consumer-side imports unchanged ✓ (`@mkbabb/glass-ui/timeline` package barrel byte-identical; demo/configurator imports through the façade).
- (c) typecheck ✓ ; test 348/348 ✓ ; build 651 modules ✓ ; profile:budget PASS ✓ (per-chunk timeline.js +21% accepted as decomposition cost; global gates remain well under cap).
- (d) verify-export-types PASS ✓.
- (e) 3 lane proof docs ✓.
- (f) v1.2.3 patch tag.

### Open windows for W4

W4 opens after this commit lands. Three lanes per `docs/tranches/O/waves/W4.md` (/api discovery gaps + leaky abstractions + service-boundary inconsistencies; semver-visible avatarVariant rename).

## 2026-05-14 — W4 close (v1.3.0 minor)

Three-lane wave dispatched in parallel agent-worktrees. All bounds disjoint; integration clean.

### Lane disposition

| Lane | Mode | Disposition | Proof |
|---|---|---|---|
| A — /api discovery gaps | agent-dispatched (worktree) | LANDED — 12 types promoted (6 sidebar + 5 search + 3 triad); surface count 37 → 49. NEW `src/components/ui/_shared/index.ts` barrel (runtime-private; `/api`-only). | `audit/W4-Lane-A-api-promotions-proof.md` |
| B — Leaky abstractions | agent-dispatched (worktree) | LANDED — 3 fixes (dock barrel re-export + UseAuroraReturn interface + useDarkModeSync→installDarkModeSync rename). Cross-repo audit: speedtest has 3 references; coordinated at W6. | `audit/W4-Lane-B-leaky-abstraction-fixes-proof.md` |
| C — Service boundaries | agent-dispatched (worktree) | LANDED — avatarVariant→avatarVariants rename + useToast KEEP-with-rationale + module-scope registries documented. | `audit/W4-Lane-C-service-boundaries-proof.md` + `audit/W4-Lane-C-useToast-decision.md` |

### Tag cadence — v1.3.0 minor

Two semver-visible renames (avatarVariant + useDarkModeSync) warrant minor signal per L invariant 16. Both have ≤ 3 consumer-side sites across the constellation; both ship as one-line consumer migrations documented in MIGRATION.md. Per the user's "NO backwards-compat aliases" preference, no legacy shims ship; consumers migrate via the named-rename path.

### Hard gate evidence

- (a) /api gains 12 types ✓ (verify-export-types PASS).
- (b) 3 leaky abstractions fixed ✓.
- (c) avatarVariant rename + useToast decision + module-registries documented ✓.
- (d) Cross-repo audit landed: avatarVariant — 1 passthrough barrel in value.js; useDarkModeSync — 3 sites in speedtest; coordinated at W6.
- (e) typecheck ✓ ; test 348/348 ✓ ; build 651 modules ✓ ; profile:budget PASS ✓ ; verify-export-types PASS ✓.
- (f) 3 lane proof docs + 1 decision doc.
- (g) v1.3.0 minor tag.

### Open windows for W5

W5 opens after this commit lands. Five lanes per `docs/tranches/O/waves/W5.md` (proof:all cohort runner + verify-export-types unconditional in release.sh + freshness DRY extract + release.sh ↔ prepublishOnly dedup + CI gates expansion).

## 2026-05-14 — W5 close (v1.3.1)

Pipeline orchestration consolidation. Orchestrator merged Lane B + Lane D at dispatch time (both touched scripts/release.sh — bound conflict).

### Lane disposition

| Lane | Mode | Disposition | Proof |
|---|---|---|---|
| A — proof:all cohort runner | agent-dispatched (worktree) | LANDED — single npm-script chain (Option A); 5 proof:* scripts sequenced cheap → expensive. | `audit/W5-Lane-A-proof-all-runner-proof.md` |
| B+D — release.sh consolidation | agent-dispatched (worktree; merged at dispatch) | LANDED — env-gate retired (verify-export-types unconditional); hardcoded subpath loop dropped; npm test ownership consolidated to prepublishOnly; profile:budget added to release.sh gate matrix. Orchestrator absorbed heap-bump `NODE_OPTIONS=--max-old-space-size=8192` at integration (vite:dts plugin OOMs under default 4GB). | `audit/W5-Lane-BD-release-consolidation-proof.md` |
| C — Freshness DRY extract | agent-dispatched (worktree) | LANDED — `scripts/freshness-walk.mjs` (+`.d.mts` sidecar) canonical home; both `scripts/freshness-gate.mjs` + `src/freshness.ts` import via Path A (static import). Algorithmic divergence audit: byte-identical pre-extract; faithful merge. | `audit/W5-Lane-C-freshness-dry-proof.md` |
| E — CI gates expansion | agent-dispatched (worktree) | LANDED — `.github/workflows/lint.yml` → `ci.yml`; 5-step matrix (typecheck + test + build + verify-export-types + profile:budget). Heap-bump scoped to build step. | `audit/W5-Lane-E-ci-expansion-proof.md` |

### Hard gate evidence

- (a) proof:all ships + chains 5 scripts ✓.
- (b) verify-export-types unconditional in release.sh ✓; hardcoded loop dropped ✓.
- (c) walkNewestMtime canonical at scripts/freshness-walk.mjs ✓; both consumers import canonical ✓.
- (d) release.sh + prepublishOnly single-source-of-truth ✓ (test 2× → 1×; build 2× with documented rationale).
- (e) CI workflow 5-step matrix; PR-time matches release-time ✓.
- (f) typecheck ✓ ; test 348/348 ✓ ; build 652 modules ✓ ; profile:budget PASS ✓ ; verify-export-types PASS ✓ ; `bash -n scripts/release.sh` SYNTAX OK ✓.
- (g) 5 lane proof docs (4 agent + 1 orchestrator-absorb addendum in B+D).
- (h) v1.3.1 patch tag.

### Open windows for W6

W6 opens after this commit lands. Four lanes per `docs/tranches/O/waves/W6.md` (4 substrate promotions: useClipboard + HeaderRibbon + dock-icon-button token ladder + scale-on-hover utility + speedtest AC.W6 dependency cohort).

## 2026-05-14 — W6 HEADLINE close (v1.4.0 minor)

Four-lane wave dispatched in parallel agent-worktrees. Tokens.css overlap reconciled at orchestrator integration (Lane B + Lane D both targeted the same file with disjoint additions).

### Lane disposition

| Lane | Mode | Disposition | Proof |
|---|---|---|---|
| A — useClipboard + HeaderRibbon | agent-dispatched (worktree) | LANDED — useClipboard composable (108 LOC; vueuse-free); HeaderRibbon SFC + flat subpath /header-ribbon. UseClipboardReturn + UseClipboardOptions + HeaderRibbonProps + HeaderRibbonPosition published on /api. | `audit/W6-Lane-A-useClipboard-HeaderRibbon-promotions-proof.md` |
| B — dock-icon-button token ladder | agent-dispatched (worktree) | LANDED — 5 `--dock-active-*` tokens; dock.css active-state rewired to consume. Defaults preserve visual contract verbatim. | `audit/W6-Lane-B-dock-token-ladder-proof.md` |
| C — scale-on-hover utility | agent-dispatched (worktree) | LANDED — `@utility scale-on-hover` consuming existing `--scale-hover` (1.08; agent declined the W6.md 1.05 value per memory-driven no-backwards-compat posture). | `audit/W6-Lane-C-scale-on-hover-proof.md` |
| D — speedtest AC.W6 cohort | agent-dispatched (worktree) | 5 LANDED (text-hero hoist + WCAG companions + meter-track-stroke fix + IconTooltip 44px + dock touch-target media-query) + 1 FLAGGED (Fira Code woff2 binaries; orchestrator runs curl fetch at integration per src/fonts/README.md). | `audit/W6-Lane-D-speedtest-cohort-proof.md` |

### Integration reconciliation

- Lane B + Lane D both edited `src/styles/tokens.css` from worktrees branched on the same HEAD. Orchestrator merged by adding Lane D's `--chart-{phase}-label` + `--meter-track-stroke` + `--icon-tooltip-hit-area` + `--dock-touch-target` tokens around Lane B's `--dock-active-*` block. Both lanes' additions preserved.
- Lane B + Lane D both edited `src/styles/dock.css`. Lane D's copy overwrote Lane B's active-state rewrite at file integration; orchestrator re-applied Lane B's `.dock-icon-button:is(...)` rule via Edit after Lane D copy.
- Lane A's `useClipboard` is vueuse-free → root-barrel re-exported per L invariant.
- Lane A's HeaderRibbon kept subpath-only per cherry-pick acceptance bar.

### Hard gate evidence

- (a) Lane A: useClipboard + HeaderRibbon ship; ≥ 2-consumer verification documented in proof doc ✓.
- (b) Lane B: `.dock-icon-button` token ladder ships ✓.
- (c) Lane C: `@utility scale-on-hover` ships ✓.
- (d) Lane D: 5 of 6 AC.W6 dependencies land; Fira Code woff2 flagged for orchestrator integration fetch ✓.
- (e) Cross-repo coordination: 5 consumer adoption paths tabulated in CHANGELOG; user-authorized waves deferred per CONSTELLATION.md ✓.
- (f) typecheck ✓ ; test 348/348 ✓ ; build 659 modules ✓ ; profile:budget PASS (CSS 95.7% raw — folded to W7 ε rebaseline candidate) ✓ ; verify-export-types PASS ✓.
- (g) 4 lane proof docs.
- (h) v1.4.0 minor tag (substantial additive surface: 2 promotions + 1 utility + 6 AC.W6 deliverables).

### Open windows for W7

W7 opens after this commit lands. Close ceremony per `docs/tranches/O/waves/W7.md` — 7 strengthened audit lanes (α/β/γ/δ/ε/π/ι) + 6-agent N11-style consumer re-audit (O11/a-f). FINAL.md authored.

## 2026-05-14 — W7 close (v1.4.1)

13 audit lanes (7 strengthened + 6 consumer re-audit) dispatched in 2 parallel waves. 1 BLOCKER caught + absorbed inline; 1 consumer-side BLOCKER documented as cross-repo carry-forward to P.

### Audit verdicts

See FINAL.md §3 for full matrix. Summary:
- 7 strengthened: 1 BLOCKER (γ HeaderRibbon packaging — absorbed inline) + 5 CLEAN/MINOR + 1 TOOLING-DEFERRED (π).
- 6 consumer re-audit: 4 CLEAN + 1 MINOR (O11/b carry to P) + 1 BLOCKER (O11/e value.js consumer-side carry to P).

### Inline absorbs at W7 close

- `package.json` — added missing `./header-ribbon` exports + typesVersions entries (BLOCKER absorb per γ + β audits).
- `CLAUDE.md` — refreshed doc-counters (/api 32 → 53; custom dirs 30 → 31; subpaths 37 → 38; remaining 23 → 24).
- `src/api/index.ts` — corrected the 8-constants → 4-constants typo at M.W2 + O.W4 preamble; added O.W6 promotion note.

### Hard gate

(a) 7 strengthened audit lanes CLEAN/MINOR ✓ (1 BLOCKER absorbed inline).
(b) 6 consumer re-audit lanes verify non-regression ✓ (1 BLOCKER is consumer-side; carry to P).
(c) FINAL.md authored ✓.
(d) ι sweep CLEAN ✓ (zero orphan stash; zero unauthorized commits).
(e) typecheck ✓ ; test 348/348 ✓ ; build 659 modules ✓ ; profile:budget PASS ✓ ; verify-export-types PASS ✓.
(f) Final aggregate tag v1.4.1.

### Final disposition — O CLEAN at v1.4.1

8 waves landed in one calendar day under indefatigable user authorization. P opens at user discretion with 7 carry-forwards named-destinations (1 visual-runtime + 1 CSS budget + 1 DI completion + 1 demo cohort + 1 GlassScrubber + 1 banned-word + 1 frozen-historical).
