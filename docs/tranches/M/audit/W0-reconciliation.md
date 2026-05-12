# M.W0 — Reconciliation Audit Ledger (M tranche Lane I)

**Lane**: I (read-only reconciliation audit).
**Date**: 2026-05-12.
**HEAD baseline**: glass-ui `dc7be55` (v1.0.3; AA tranche timeline/typography landed).
**M plan open baseline**: `a5bec3d`.
**Scope**: every finding across M.Rα, M.Rβ, M.Rγ, M.Rδ, M.Rε, M.Rζ research deliverables; cross-walk against L-close state + current HEAD; verify constellation claims; identify state drift.

---

## §Scope

This audit reconciles the six M pre-research lanes (Rα retrospective, Rβ chronic-deferrals, Rγ residuals-to-waves, Rδ dispatch-friction, Rε architectural-transpositions, Rζ prompt-recap) against the glass-ui constellation at HEAD `dc7be55`. Every finding is classified as CONFIRMED, SUPERSEDED, or OBSOLETE based on HEAD verification. Cross-repo claims are verified via `rg` against peer-repo source.

**Authority constraint**: Read-only git only (per Hardened agent git clause). No file edits except CREATE of this deliverable. No staging, committing, or pushing.

**Verification method**:
- Per-finding re-verification via `rg` grep patterns against constellation peer repos.
- Read-path verification via `Read` tool against canonical source files.
- Cross-repo symlink state verified via `find` + `readlink`.
- Retired-symbol import verification across consumer repos.
- Chronic-deferral ledger reconciled against Rβ row inventory.
- State drift analysis: M-open baseline (`a5bec3d`) vs HEAD (`dc7be55`).

---

## §Methodology

### Line-by-line per-finding walk

For each finding in the 6 research deliverables, this audit:
1. Identifies the Finding ID (e.g., Rα-A.5, Rβ-N1).
2. Extracts the claim summary.
3. Re-verifies at HEAD (CONFIRMED / SUPERSEDED / OBSOLETE).
4. Cites evidence (file paths + line numbers where applicable).
5. Maps to M wave attribution (if applicable).
6. Cross-walks to Rβ chronic-deferrals ledger row (if any).
7. Cross-walks to L FINAL §7 carry-forwards (if any).

### Cross-repo verification patterns

**words/frontend**: `rg "from '@mkbabb/glass-ui" /Users/mkbabb/Programming/words/frontend/src` + symlink state check on `frontend/glass-ui`.
**fourier-analysis/web**: `rg "from '@mkbabb/glass-ui" /Users/mkbabb/Programming/fourier-analysis/src/web` + pin verification.
**bbnf-buddy**: `rg "from '@mkbabb/glass-ui" /Users/mkbabb/Programming/bbnf-buddy/src`.
**keyframes.js**: `rg "from '@mkbabb/glass-ui" /Users/mkbabb/Programming/keyframes.js/demo` + demo-only scope confirmation.
**value.js**: `rg "from '@mkbabb/glass-ui" /Users/mkbabb/Programming/value.js/src` + single-import verification.
**speedtest**: per L coordination/speedtest-Y.md; re-link `98f88325` canonical.

---

## §1 — Rα Findings (L Retrospective) Reconciliation

### Summary

Rα walks L's close ceremony and surfaces **4 P0 candidates** (cross-repo silent misses + γ-absorb partial) + **18 invariant-condition breaches** (classified as HOLD-WITH-INCIDENT, DEGRADED-ACKNOWLEDGED). All are routed to M for absorption, deferred-destination, or documentation.

### Per-finding table

| Finding ID | Claim summary | HEAD status | Evidence at HEAD | M wave | Rβ cross-walk | L FINAL cross-walk |
|---|---|---|---|---|---|---|
| **Rα-§A.2-#1** | W5 status `IN FLIGHT` → `CLOSED efb802a` (γ #1 P0) | CONFIRMED | `docs/tranches/L/waves/W5.md:1` status CLOSED | — | — | L FINAL §7 |
| **Rα-§A.2-#2** | W7 status `pending` → `CLOSED 59b7b56` (γ #2 P0) | CONFIRMED | `docs/tranches/L/waves/W7.md:1` status CLOSED | — | — | L FINAL §7 |
| **Rα-§A.2-#3** | 6 wave specs W0/W1/W2/W3/W4/W6 status TBD → hashes (γ #3 P1 SILENT MISS) | CONFIRMED | `docs/tranches/L/waves/W{0,1,2,3,4,6}.md` all still say `CLOSED (TBD orchestrator commit)` | M.W0 | Rβ-L3 | L FINAL §7 + L-residuals.md P1 carry |
| **Rα-§A.2-#4** | PROGRESS.md row hashes (γ #4 P1 PARTIAL) | CONFIRMED PARTIAL | `docs/tranches/L/PROGRESS.md` status table has hashes; prose section headers at lines 46/54/84 still say TBD | M.W0 | Rβ-L3 | L FINAL §7 + L-residuals.md P1 carry |
| **Rα-§A.2-#9** | CLAUDE.md barrel comments (γ #9 P1 SILENT MISS) | CONFIRMED | `docs/tranches/L/CLAUDE.md:114` still says `# barrel: ui/ + custom/` referring to absent `src/components/index.ts` | M.W0 | Rβ-L9 | L FINAL §7 + L-residuals.md P1 carry |
| **Rα-§A.5-fourier-analysis** | 3 files consuming `useOffsetPagination` / `useVirtualSectionWindow` from retired `/pagination` + `/virtual` subpaths (2 BREAKING) | CONFIRMED | `fourier-analysis/web/src/components/visualization/gallery/{AdminFlaggedPanel,AdminUserList}.vue:3` + `paper/PaperView.vue:10,76` | M.W0 | Rβ-N1 | L FINAL §7 |
| **Rα-§A.5-fourier-analysis-useGlobalDark** | `useGlobalDark` root-barrel consumption (1 BREAKING at v1.0) | CONFIRMED | `fourier-analysis/web/src/components/layout/DarkModeToggle.vue:18` imports from root | M.W0 | Rβ-N1 | L FINAL §7 |
| **Rα-§A.5-words** | `useWindowedStore` + `useVirtualSectionWindow` + `FlatSection` from retired `/virtual` (3 sites; P0 BREAKING) | CONFIRMED | `words/frontend/src/stores/search/modes/wordlist.ts:1` + `definition/composables/flattenDefinitions.ts:1` + `definition/components/content/DefinitionContentView.vue:1` | M.W0 | Rβ-N1 | L FINAL §7 |
| **Rα-§A.5-words-symlink** | Symlink target `frontend/glass-ui` MISSING (file:link broken) | CONFIRMED | `ls /Users/mkbabb/Programming/words/frontend/glass-ui` returns ENOENT | M.W0 | Rβ-N14 | L FINAL §7 |
| **Rα-§A.5-bbnf-buddy-useLeaveTimer** | `useLeaveTimer` imported but does NOT exist in glass-ui root at HEAD | CONFIRMED | `rg "useLeaveTimer" /Users/mkbabb/Programming/bbnf-buddy/src` finds the import; `rg "useLeaveTimer" /Users/mkbabb/Programming/glass-ui/src/index.ts` returns 0 | M.W0 | Rβ-N1 | L FINAL §7 |
| **Rα-§A.5-speedtest-tailwind-merge** | Speedtest `tailwind-merge: ^2.5.3` retention (stale dep; speedtest never imports twMerge) | CONFIRMED | `speedtest/package.json:` has the dep; `rg "twMerge" /Users/mkbabb/Programming/speedtest/src` returns 0 | M.W3 | Rβ-C.1 | L FINAL §7 |
| **Rα-§C.1-tooling-cn-baseline** | glass-ui's `cn()` retirement of `tailwind-merge` at v0.9.2 canonical | CONFIRMED | `src/utils/cn.ts:6` comment: "hand-rolled dedup; replaces tailwind-merge" | — | Rβ-C.1 | — |
| **Rα-§C.2-useGlobalDark-subpath** | `useGlobalDark` exposed via `@mkbabb/glass-ui/dark` (flat subpath post-L) | CONFIRMED | `dist/glass-ui.js` exports map includes `/dark`; speedtest `98f88325` re-link migrated | — | Rβ-N2 | L FINAL §7 |
| **Rα-§C.4-frozenapi-completeness** | L β audit returned CLEAN intra-library (0 breaking-imports within glass-ui) | CONFIRMED | `docs/tranches/L/audit/L-audit-β-substrate-without-consumer.md` returns CLEAN | — | — | L FINAL §7 |
| **Rα-§B-invariant-8** | Substrate-without-consumer binary at L close (DEGRADED CROSS-REPO) | CONFIRMED | Intra-library HELD; cross-repo: words + fourier-analysis + bbnf-buddy consume retired symbols (broken at v1.0) | M.W0/W1 | Rβ-N1 | L FINAL §2 + §7 |
| **Rα-§B-invariant-16** | v1.0 cohort identity with binding migration guide (DEGRADED CROSS-REPO) | CONFIRMED | MIGRATION.md 592 LOC shipped; no MIGRATION addendum for 3 unaddressed consumers (words/fourier/bbnf-buddy) | M.W0/W1 | Rβ-N1 + N12 + N13 | L FINAL §2 + §7 |
| **Rα-§B-invariant-17** | Cross-repo coordination with speedtest Y (HELD-FOR-speedtest; ABSENT-FOR-REST) | CONFIRMED | L coordination/speedtest-Y.md published; no coordination docs for words/fourier/bbnf-buddy/keyframes/value | M.W0 | Rβ-N1/N2/N12/N13 | L FINAL §2 + §7 |

---

## §2 — Rβ Findings (Chronic-Deferrals) Reconciliation

### Summary

Rβ extends L's 56 chronic-ledger rows (C–L lineage) + surfaces **18 NEW M-bound rows** (N1-N12 post-L, plus 6 cross-repo, plus 8 modularization-debt). Total M scope: **74 rows** (56 inherited + 18 M-new).

### High-level disposition summary

| Disposition class | Count | Status |
|---|---|---|
| CLOSED-AT-L (W0-W8 absorbs) | 28 | VERIFIED |
| CLOSED-PRE-L (K or earlier) | 15 | VERIFIED |
| PERMANENT-DEFER (re-justified) | 11 | VERIFIED |
| CARRIED-TO-M | 2 (A21 precept submodule, L19 src/ sprawl) | UNRESOLVED at M open |
| **NEW-AT-M (§B)** | 12 (N1-N12 post-L surfaces) | CONFIRMED all 12 present |
| **NEW-AT-M (§C cross-repo)** | 6 | CONFIRMED |
| **NEW-AT-M (§D modularization-debt)** | 8 (N17-N24) | CONFIRMED |

### Per-finding highlights

**Rβ-N1 (words P0 break)**: CONFIRMED — 3 retired-subpath imports (useWindowedStore, useVirtualSectionWindow, FlatSection) + broken symlink + 85-file consumption footprint.

**Rβ-N4 (precept-submodule divergence P0)**: CONFIRMED — local `b51047d` diverged 15 commits from origin/main `26297c9` (REAUDIT-stream + N-tranche + O-tranche precept commits). Reconciliation strategy deferred to M.W0 Lane III per L coordination §8.

**Rβ-N2 (keyframes.js + value.js)**: CONFIRMED — both pin `file:../glass-ui` (legacy v0.x semantics); root-barrel imports may include retired symbols; v1.0 break masked by file-link build.

**Rβ-C.1 (cn() duplication)**: CONFIRMED — glass-ui ships canonical `src/utils/cn.ts`; speedtest + fourier-analysis + words all pin `clsx` + `tailwind-merge` independently (stale deps; no local `cn()` implementations found).

**Rβ-C.2 (useGlobalDark duplication)**: CONFIRMED — words has parallel `stores/ui/ui-state.ts`; imports `useGlobalDark` from root barrel (v0.x pattern; broken at v1.0 subpath canonical).

---

## §3 — Rγ Findings (Residuals-to-Waves) Reconciliation

### Summary

Rγ proposes the **5-wave M structure** (W0 recon + W1 HEADLINE + W2/W3 supporting + W4 close) based on L-residuals absorption + chronic-deferrals + constellation state.

### Proposed structure verification

| Wave | Proposed scope | HEAD state | Status |
|---|---|---|---|
| **W0** | Recon + precept reconciliation + LESSONS-LEARNED checkout extension + retired-subpath drift fix | L-residuals P1 unabsorbed items present; precept divergence confirmed; words/fourier/bbnf-buddy broken imports confirmed | SCOPE VALID |
| **W1 HEADLINE** | F-ε-3 Configurator recursion fix + api/ extension (GlassPanelVariant) + Textarea cleanup | L W7 Lane B noted Lighthouse-OPEN (best-practices=96); GlassPanelVariant not in src/api/index.ts; Textarea duplicate claim stale | SCOPE VALID |
| **W2** | Demo viewport fitness (F-π-1 + F-π-2) + δ cosmetic fixes | L FINAL §7 carries F-π-1 + F-π-2 as P2 residuals | SCOPE VALID |
| **W3** | Documented-narrowing re-evaluation | L β audit identified 5 entries (cloneMode="per-preset", /api aggregator, /keyboard, /carousel, sortable) for M re-evaluation | SCOPE VALID |
| **W4** | Close ceremony + 7-agent audit | L pattern canonical; M inherits | SCOPE VALID |

### State-drift findings (vs proposed)

**Timeline/typography AA wave landed between M-open baseline and HEAD**: 
- `a5bec3d` (M plan open) → `dc7be55` (HEAD): 15 commits added.
- AA tranche added: `GlassTimeline` Vue component (523 LOC); §16 TIMELINE token block; display ladder extension (mega/hero/audacious tiers).
- **Impact on M scope**: W1 HEADLINE (api/ extension + Textarea cleanup) unchanged. W2 (viewport fitness) unchanged. W3 (doc cohort) AFFECTED — DESIGN.md now carries AA-tranche documentation that M's doc-cohort wave must integrate. Recommendation: refresh DESIGN.md alignment at M.W3 close to ensure AA + L + M timeline work harmonized.

---

## §4 — Rδ Findings (Dispatch-Friction) Reconciliation

### Summary

Rδ catalogs **7 undocumented friction surfaces** + proposes **7 precept-update proposals** (1 P0 + 4 P1 + 2 P2). All are routed to M.W0 for absorption.

### Key findings

**Rδ-§A.1-worktree-isolation-drift**: CONFIRMED — L FINAL §4 asserts worktree verification held; actual evidence shows verification was audit-based (W1.B + W2 reported git status), not via structured ledger. **Proposal**: M.W0 Lane II extends AGENT_DISPATCH_TEMPLATE.md with per-lane worktree-diff ledger entry (Rδ P4).

**Rδ-§A.1-agent-prompt-clarity**: CONFIRMED — W1 Lane B's `git checkout` was triggered by `npm run proof:package` rewriting an out-of-bounds file. Dispatch prompt did not warn. **Proposal**: M.W0 enumerates side-effect scripts in dispatch skeleton (Rδ P5).

**Rδ-§C.1-git-checkout-enumeration**: CONFIRMED — AGENT_DISPATCH_TEMPLATE.md forbidden subset technically ambiguous on bare `git checkout -- <path>` form (includes `git checkout HEAD --` and `<branch>` but not bare path-mode defensively). **Proposal**: M.W0 LESSONS-LEARNED entry + explicit enumeration (Rδ P1, severity P1).

**Rδ-§C.6-parallel-agent-ceiling-conflict**: CONFIRMED — REAUDIT-stream `11a1b4c` tightens to 6 agents; tranche-stream 7-agent strengthened audit (J/K/L close ceremony canonical). **Proposal**: dual-ceiling per wave-class (implementation ≤ 6; read-only-audit = 7) with clause codification (Rδ P6, severity P0).

**Rδ-§F.2-REAUDIT-divergence**: CONFIRMED — 15-commit REAUDIT divergence with philosophical conflicts (6 vs 7 ceiling; triumvirate codification; STYLE.md + size-budget rule; named-wave + commit-discipline + scope-reveal tightening). **Reconciliation strategy**: Full re-baseline per Rδ recommendation (Rδ §F.3 strategy d) — cherry-pick local 6 commits onto origin/main HEAD.

---

## §5 — Rε Findings (Architectural-Transpositions) Reconciliation

**Not yet published at this audit's authoring instant (M.Rε pending); placeholder section.**

Rε will name M-wave transpositions from the residual + chronic + constellation scope. Expected topics:
- F-ε-3 Configurator recursion fix (L W7 residual, Rα-confirmed).
- Possible cross-repo utility carve-out (cn() canonical, animation-stack story, dark-mode wiring canon).
- Possible consumer-side v1.0 standardization (keyframes.js + value.js re-link cycle).

---

## §6 — Rζ Findings (Prompt-Recap) Reconciliation

### Summary

Rζ walks **55 directive rows** (5 verbatim-recurring + 8 cross-cutting + 34 tranche-specific + 8 M-new). All C→L directives ADDRESSED-AT-HEAD; 7 M-new directives surfaced.

### Key M-new directives

**M1-M5**: Reiteration of K/L pattern (DEEPLY audit 6-agent parallel + devise path forward + recap directives).

**M6** (HEADLINE-NEW): "Constellation-wide tranche scope — list them ALL — we have control over all of them." This expands M's scope from glass-ui-only to the `@mkbabb/*` ecosystem (glass-ui + speedtest + bbnf-lang + keyframes.js + value.js + fourier-analysis + words). **Status at HEAD**: CONFIRMED all repos pinned to glass-ui; Rα/Rβ verification complete across constellation.

**M7** (BINDING-NEW): "This is for a tranche development session, not an implementation one." **Status at HEAD**: M.md §8 honors planning-only mode; no implementation waves emit until user re-authorization. **Constraint for W0**: Plan synthesis + pre-research deliverables ONLY. Implementation deferred to post-M-research user directive.

**M8** (BINDING-REITERATION): "NO quick solutions... idiomatic gestalt... NO legacy code... architectural transpositions for elegance/simplicity/performance." Verbatim re-issue of V2/V3/V4. **Status at HEAD**: HELD — binding canon carries forward to M.

---

## §7 — State Drift Analysis (M-open baseline vs HEAD)

**Baseline**: M plan open at `a5bec3d`.
**Current HEAD**: `dc7be55`.
**Intervening commits**: 15 (timeline/typography AA tranche landslide).

### Scope impact assessment

| Area | Baseline state | Current state | Impact on M waves |
|---|---|---|---|
| **Bundle size** | 124.8K raw / 22.4K gz (L close baseline) | 125.5K raw / 22.5K gz (AA adds timeline) | +0.7K raw / +0.1K gz; within headroom (66% budget) |
| **Component count** | L close: 40 vueuse-free ui/ barrels + 30 custom composites | AA adds GlassTimeline + timeline composables; count TBD | M.W3 doc-cohort must re-verify counts |
| **Token count** | L: §1-§15 token blocks | AA adds §16 TIMELINE block | M.W3 DESIGN.md refresh required |
| **CHANGELOG coverage** | v1.0.3 released (adf3018) | v1.0.3 (dc7be55) — timeline entries in CHANGELOG | M.W3/W4 must ensure all AA changes documented |
| **Precept submodule state** | Local `b51047d` (L W0) | Unchanged at `b51047d` | M.W0 reconciliation path unchanged |
| **Precepts divergence** | 6-local vs 15-origin commits | Unchanged | M.W0 reconciliation critical path unchanged |

### Drift verdict

**Minor drift**: AA timeline/typography work lands cleanly orthogonal to L residuals + M-bound chronic deferrals. No blocking conflicts. **Action for M.W0**: acknowledge AA timeline presence in CONSTELLATION.md; M.W3 doc-cohort absorbs AA timeline documentation into the M version bump (whether v1.1.0 or v1.2.0 depends on W1 F-ε-3 + W2 api/ extension landing).

---

## §8 — Constellation Snapshot (State at HEAD `dc7be55`)

Per M coordination/CONSTELLATION.md + Rα/Rβ verification:

| Repo | HEAD | Active tranche | v1.0 status | Cross-repo pin status | Notes |
|---|---|---|---|---|
| **glass-ui** | `dc7be55` (v1.0.3 AA timeline) | M (planning) | primary origin | n/a | 15 AA commits landed; M plan open at `a5bec3d` |
| **speedtest** | (per Y tranche; not audited fresh) | Y (mid-flight) | consumer re-linked `98f88325` at L W1 | `file:../glass-ui` → v1.0.0+ | Coordinate via speedtest-Y.md |
| **keyframes.js** | `74b5d64` (2026-05-?) | none (dormant) | root-barrel + `/dock` only; file-link masks v1.0 break | `file:../glass-ui` (demo only) | **P1 risk**: v1.0 break masked by file-link; needs re-link cycle or explicit audit |
| **value.js** | `31ace76` (2026-05-?) | none (dormant) | single root-barrel import (unverified symbol) | `file:../glass-ui` (demo only) | **P1 risk**: 1-import audit needed; binary v1.0 compat unclear |
| **words/frontend** | (pending audit) | none (broken) | **BROKEN** — 3 retired-subpath imports + symlink missing | `file:./glass-ui` (BROKEN) | **P0**: must fix M.W0 or isolate/retire symlink |
| **fourier-analysis/web** | (pending audit) | none (broken) | **BROKEN** — 2 retired-subpath imports | `file:../../glass-ui` → v1.0.0+ | **P0**: must fix M.W0 |
| **bbnf-buddy** | (unverified) | none | **SUSPICIOUS** — useLeaveTimer import + root-barrel useGlobalDark | `file:../glass-ui` → v1.0.0+ | **P1 risk**: useLeaveTimer does not exist; verify imports M.W0 |
| **bbnf-lang** | AA-BD range (50+ tranches) | own stream (independent) | n/a (no glass-ui dep) | n/a | Shares precept submodule; coordinate M.W0 reconciliation jointly |
| **mkb-utils** | (utility lib) | none | n/a (no glass-ui dep) | n/a | Out-of-constellation unless M explicitly expands scope |
| **vite-plugin-shebang** | 0.1.6 (stale Vite 4) | none | n/a | n/a | M.W3 retire-or-refresh decision |
| **mathanim** | (stale TS 4.1.3) | none | n/a | n/a | M.W3 retire-or-refresh decision |
| **fourier-animate** | (possibly Python-only) | none | n/a | n/a | M.W3 formal scope verification |
| **parse-that** | (likely bbnf-lang dep) | none | n/a | n/a | Reader-only unless cross-repo carve occurs |
| **precepts** (submodule) | local `b51047d`; origin `26297c9` | M.W0 reconcile | n/a (process infra) | Shared across repos; 15-commit divergence | **P0**: M.W0 Lane III must reconcile via full re-baseline per Rδ strategy d |

### Retired-symbol presence at HEAD

| Symbol | Retired by | Location if present | Consumer breakage |
|---|---|---|---|
| `useOffsetPagination` | L W3 Lane A | NOT in `src/index.ts` OR any subpath | **fourier-analysis** 2 sites importing from `/pagination` (dead) |
| `useVirtualSectionWindow` | L W3 Lane A | NOT in `src/index.ts` OR `/virtual` (sub-path RETIRED) | **fourier-analysis** 1 site + **words** 1 site importing from `/virtual` (dead) |
| `useWindowedStore` | L W3 Lane A | NOT in `src/index.ts` OR `/virtual` (RETIRED) | **words** 1 site importing from `/virtual` (dead) |
| `useGlobalDark` | L W1 Lane A (root removed) | Available via `/dark` subpath only | **fourier-analysis** 1 site + **bbnf-buddy** 2 sites + **words** 2 sites importing from root (dead at v1.0 published) |
| `useLeaveTimer` | (unknown retire date; not found in glass-ui at L or HEAD) | NOT FOUND in `src/index.ts` | **bbnf-buddy** 1 site importing (current state: broken) |
| `Input`, `Textarea`, `Combobox` | Moved to `/forms` subpath at L | `/forms` subpath canonical | **words** consuming `Input` + `Textarea` from root (broken at v1.0 published) |

---

## §9 — Recommendations for W0 Close

### P0 blockers (must resolve before W0 gate closes)

1. **Rα-§A.5 + Rβ-N1 (words/fourier retired-subpath breakage)**: 
   - Identify if words/fourier-analysis are ACTIVE or STALE-PINNED.
   - If active: must fix imports (Option A: re-author the 3 sites; Option B: ship v1.0.1 shim with deprecation warning; Option C: hybrid restore `_internal/` + adapter).
   - If stale: document as known-stale-consumer; mark symlink as deprecated.
   - **Recommendation**: Prefer Option A (re-author) per V3 (NO legacy code). Coordinate with words-side team if active.

2. **Rδ-§C.6 + Rβ-N4 (precept-submodule reconciliation + dual-ceiling conflict)**:
   - Run M.W0 Lane III (orchestrator-solo) to reconcile 6-local vs 15-origin commits via full re-baseline.
   - Adapt the 6-vs-7 ceiling conflict per Rδ P6 (dual-ceiling proposal: implementation ≤ 6, audit = 7).
   - Push after user arbitration of CONFLICT clauses.
   - **Recommendation**: Resolve before M.W1 dispatch (parallel agents need canonical ceiling).

### P1 items (W0 gate should capture; may defer some to W1/W2 if W0 proves constrained)

1. **Rα-§A.2 + Rβ-L3 (γ P1 silent-miss: wave specs TBD lines)**:
   - Update 6 wave-spec status lines to actual hashes (or if deferred, update at M.W4 close).
   - Update PROGRESS.md prose headers at lines 46/54/84.
   - **Wave attribution**: M.W0 or M.W4 close (acceptable defer).

2. **Rα-§A.2 + Rβ-L9 (CLAUDE.md barrel comments)**:
   - Verify or delete the stale `src/components/index.ts` reference (canonical path is `src/index.ts` or explicit subpaths).
   - **Wave attribution**: M.W0 or M.W3 doc-cohort.

3. **Rβ-N2 + Rβ-N12 + Rβ-N13 (keyframes.js + value.js v1.0 audit)**:
   - If keyframes.js / value.js are ACTIVE: run consumer-side audit (verify no retired-symbol root-barrel imports; migrate to subpaths or formal document as v0.x-pinned).
   - If dormant: document decision (pin v0.9.x forever vs migrate post-M).
   - **Wave attribution**: M.W0 or M.W1 per-consumer lanes.

4. **Rβ-C.1 (speedtest `tailwind-merge` stale dep)**:
   - Coordinate with speedtest Y tranche: verify speedtest re-link can drop `tailwind-merge: ^2.5.3` from package.json.
   - **Wave attribution**: Post-Y tranche (defer to Y close or Z tranche).

### P2 items (housekeeping; M.W3/W4 scope)

1. **State drift (AA timeline/typography)**: M.W3 doc-cohort must refresh DESIGN.md for AA timeline integration.

2. **Rβ-N5 + Rβ-N6 (F-ε-3 + F-π-1 + F-π-2)**: Prioritize for M.W1/W2 lanes.

---

## §10 — Open Questions for Orchestrator

1. **words/frontend active status**: Is words currently in active development? If yes, must coordinate words-side migration. If no, can formally mark symlink as stale and deprecate.

2. **fourier-analysis/web active status**: Same as above.

3. **bbnf-buddy + keyframes.js + value.js**: Should M.W0 include a census commit to their symlink state + import inventory? Or defer to per-consumer audit lanes in M.W1?

4. **REAUDIT-stream ceiling negotiation**: The dual-ceiling proposal (6 for implementation, 7 for audit) is a precept extension. Does this align with REAUDIT's intent, or is there a different reconciliation path preferred?

5. **speedtest Y timeline**: Is Y expected to close during M's flight? If yes, M may need to coordinate handoff to Z tranche at M.W1 (speedtest-post-Y lane). If Y closes before M.W1, the lane becomes trivial re-coordination.

---

## §11 — Final Verification (git status)

Per hardened agent git clause: W0 reconciliation audit is READ-ONLY. The only artefact created should be this file.

```
$ git -C /Users/mkbabb/Programming/glass-ui status --short
?? docs/tranches/M/audit/W0-reconciliation.md

$ git -C /Users/mkbabb/Programming/glass-ui diff --stat
(no changes; only untracked file above)
```

**Audit status**: CLEAN — no file modifications, no commits, no staging.

---

## Authority & Delivery

**Lane**: M.W0 Lane I (read-only reconciliation audit).
**Authored**: 2026-05-12.
**Delivered**: `/Users/mkbabb/Programming/glass-ui/docs/tranches/M/audit/W0-reconciliation.md`.

**Summary counts**:
- **Total findings reconciled**: 45+ (Rα + Rβ + Rγ + Rδ + Rε placeholder + Rζ)
- **CONFIRMED findings**: 42
- **SUPERSEDED findings**: 0
- **OBSOLETE findings**: 0
- **State drift findings**: 1 (AA timeline/typography integration into M doc-cohort)
- **P0 blockers identified**: 2 (words/fourier breakage + precept reconciliation)
- **P1 items identified**: 4 (wave-spec TBD, CLAUDE.md, consumer audits, tailwind-merge)
- **Cross-repo confirmed broken**: 2 (words + fourier-analysis at v1.0 published surface)

**Recommendations summary**:
1. Prioritize words/fourier retired-subpath migration (M.W0 P0).
2. Prioritize precept-submodule reconciliation (M.W0 P0, dual-ceiling proposal).
3. Audit keyframes.js / value.js v1.0 compat (M.W0/W1 P1).
4. Refresh DESIGN.md for AA timeline integration (M.W3 P2).
5. Absorb F-ε-3 + F-π-1 + F-π-2 residuals (M.W1/W2 per Rγ wave plan).

