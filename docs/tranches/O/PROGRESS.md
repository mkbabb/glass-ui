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
