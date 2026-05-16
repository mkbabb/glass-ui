# P · Pζ—Recap + chronic-deferral fold + AB+1 retrospective scope

**Date**: 2026-05-14
**Lane**: ζ—recap + inheritance-ledger validation + AB+1 retrospective scope (round-1 backend audit; the headline lane per user directive "Recap ALL prior prompts" + "No more deferrals").
**Baseline commit**: `b201b03` (HEAD; v1.7.0 in `package.json`; NOT yet tagged).
**Predecessor close**: O `8e741ba` (v1.4.1).
**Method**: read-only walk of `docs/tranches/P/findings.md` + `docs/tranches/O/FINAL.md` §5 + O Rζ + L FINAL + M FINAL + N FINAL + CHANGELOG.md entries v1.4.1 → v1.7.0 + `git log --oneline 8e741ba..HEAD` + `git tag` + `docs/precepts/instructions/LESSONS-LEARNED.md` 2026-05-06 + 2026-05-12 entries.
**HARD CAP**: 30 min observed.

---

## § 1—User-prompt recap (full ledger; K open → P open)

Walks every documented user directive from the K tranche open through the P tranche open. Verbatim quotes are shortened where indicated; full text is in the source `findings.md` cited per row. The ledger expands `docs/tranches/P/findings.md §4` from 12 rows → 18 rows by surfacing 6 prompts the planning-time draft compressed.

| # | Tranche | Verbatim user directive (shortened) | Source | Tranche addressed (or NOT) | Evidence (commit hash + close commit) | Disposition at P open |
|---|---|---|---|---|---|---|
| 1 | K open | "Indefatigability core" + DEEP 6-agent audit + worktree ref-error recon + chronic-deferrals fold | `docs/tranches/K/findings.md` ll. 7-38 | K | K close (per K FINAL); v0.9.3 + v0.9.4 | ADDRESSED-AT-CLOSE |
| 2 | K revision (2026-05-08) | Lighthouse audit fold + speedtest W inbound | `docs/tranches/K/findings.md` ll. 40-48 | K | K.WP + K.W3 demo-bounds + speedtest W2.T10 ownership | ADDRESSED-AT-CLOSE |
| 3 | L open | "Indefatigability core re-issued ... Modularization audit + `api/` dir ... DEEP 6-agent audit ... Chronic-deferrals fold" | `docs/tranches/L/findings.md` ll. 7-29 | L | L close 2026-05-12; v1.0.0; W1 HEADLINE = vueuse SCC closure + /api substrate | ADDRESSED-AT-CLOSE |
| 4 | M open | "Indefatigability core re-issued ... constellation scope (consumer repos too—keyframes, fourier, value.js, speedtest, words—list them ALL) ... Planning-only mode" | `docs/tranches/M/findings.md` ll. 7-18 | M | M close `54a8acb`; v1.0.4 + v1.0.5; M.W1 HEADLINE 5-consumer migration | ADDRESSED-AT-CLOSE |
| 5 | N open | "DEEPLY audit ... 6 agents in parallel ... Devise a path forward ... mobile-aware substrate + dock subsystem + bidirectional style discipline" | `docs/tranches/N/findings.md` ll. 5-31 | N | N.W4 13-audit fan-out; CLEAN at v1.1.4 | ADDRESSED-AT-CLOSE |
| 6 | N KISS revision | "KISS. Conservative on additions and removals. Audit overfitting." | `docs/tranches/N/findings.md` ll. 59-69 | N | Plan pivoted at `5bdc981`; spot-verification gate caught 6 false-positives; A+B prune batch authored | ADDRESSED-AT-CLOSE (verdict reversed under next prompt) |
| 7 | N wiring revision | "useTouchGate is used, or it should be ... Metaballs, paper-backdrop, typewriter should be used elsewhere too" | implicit at `78974c0` | N | 5 strategic wires landed at N.W0 (`b6c1eed`); precept hardened with audit-verdict spot-verification gate | ADDRESSED-AT-CLOSE |
| 8 | O open | "Analyze backend codebase ... NO god modules ... 6 agents in parallel ... NO workarounds, NO fallbacks, NO special cases ... idiomatic, gestalt approaches" | `docs/tranches/O/findings.md` (O1-O18) | O | O closed `8e741ba`; v1.4.1; 8 waves; 13-lane audit | ADDRESSED-AT-CLOSE |
| 9 | O continuation prompts (×4) | "Begin and continue the current tranche ... indefatigable" | implicit, per O FINAL §6 (W0 → W7 single-day execution) | O | indefatigable execution across W2 + W5 + post-fallback recovery | ADDRESSED-AT-CLOSE |
| 10 | (Post-O implicit; AC.W6a) | "self-host font policy subsection—speedtest AC.W6a Path-1 reduced scope" | commit `4660a0d` body | AB+1 (dispatched FROM speedtest) | `4660a0d` 2026-05-14 18:52 | ADDRESSED via AB+1 cohort (NO plan folder—NEW DEBT) |
| 11 | (Post-O implicit; AC.W6b) | speedtest AC.W6b font self-host substitution | commits `2474440` + `8246e07` bodies | AB+1 | v1.5.0 tag (`8246e07` 2026-05-14 19:29) | ADDRESSED—TAGGED |
| 12 | (Post-O implicit; AC.W6c) | "--phase-color-label cascade for WCAG label register" | commit `099910d` body | AB+1 | `099910d` 2026-05-14 19:45 → v1.5.1 tag | ADDRESSED—TAGGED |
| 13 | (Post-O implicit; AC.W6d) | "::before inset -15px for 44×44 WCAG ... MetricRow + MetricStack + AnimatedDigit ship ... custom-prop cascade pattern ... render-as TransitionGroup support" | commits `8bf51c4` → `e238862` | AB+1 | v1.6.0 tag (`e238862` 2026-05-14 20:27) | ADDRESSED—TAGGED |
| 14 | (Post-O implicit; AC.W8e) | "MetricCell + ResponsiveTabs + ToggleGroupItem card variant" | commits `8dad58d` + `b201b03` | AB+1 | `b201b03` 2026-05-14 22:08; package.json v1.7.0; **NO GIT TAG** | IN-FLIGHT (NEW DEBT—tag missing) |
| 15 | AB+1 open (implicit) | NO USER PROMPT—work shipped as 12-commit speedtest-driven cohort with NO `docs/tranches/AB+1/` plan folder | n/a | NOT-ADDRESSED at tranche-letter level | 12-commit window `4660a0d..b201b03` | **NEW DEBT—P-AB1 retrospective** (third K invariant 3 recurrence: V → AB → AB+1) |
| 16 | P open (this) | "DEEPLY audit with 6 agents in parallel ... Devise a path forward ... NO quick solutions, NO workarounds ... idiomatic, gestalt approaches ... NO legacy code ... No more deferrals. No carry-forward. ... Create this tranche" | `docs/tranches/P/findings.md` ll. 5-19 | P (this tranche) | P planning round at HEAD; round-1 (this lane Pζ included) + round-2 audits then synthesis | IN-FLIGHT |
| 17 | P open (binding clause) | "ZERO DEFERRAL. Every item carried forward from O FINAL.md §5 + every chronic deferral inherited from L (PD-1 + PD-2) + every cross-repo carry from O11/a-f re-audits + every 'permanent-defer' classification—ALL fold into P's wave schedule" | `findings.md` §1 | P | P plan absorbs every ledger row | IN-FLIGHT |
| 18 | P open (process clause) | "This is NOT an implementation phase. Tranche development only." | `findings.md` l. 17 | P | P stays planning-only; impl dispatched on explicit subsequent authorization (N/O precedent) | IN-FLIGHT |

**Verification—every K → O directive is ADDRESSED-AT-CLOSE.** Rows 10-14 (AB+1 cohort prompts) are implicit / shipped under shadow execution; the substrate is in src/ but the tranche-letter-level addressability is NEW DEBT (P-AB1). Row 15 explicitly names the shadow execution. Rows 16-18 are P's own open prompts, IN-FLIGHT.

**Verbatim core re-issue count K → P** = 6 tranches × 5 indefatigability-core directives = 30 re-issues at HEAD. All HELD; zero violations.

---

## § 2—Inheritance ledger validation + per-item P-wave assignment

Walks every row in `docs/tranches/P/findings.md §2`. Validates current state at HEAD (`b201b03`); proposes a concrete P-wave assignment. ZERO DEFERRAL—every row lands in a P-wave or is formally archived with explicit rationale (the latter set is verified EMPTY).

### § 2.1—O internal carry-forwards (P-1 … P-7)

| ID | Item | Source | State at HEAD | P-wave assignment | Rationale |
|---|---|---|---|---|---|
| **P-1** | Playwright/Chrome MCP runtime visual probe (2nd consecutive π TOOLING-DEFERRED) | O.W7 π audit | TOOLING-DEFERRED at O close; tooling reconnected at P dispatch per system context (mcp__claude-in-chrome__* deferred tools now available) | **P.W-close π lane HARD GATE** | Per P11 (ι invariant 27 / tooling enforcement) + binding constraint "no PERMANENT-DEFER survives". If tooling fails at P close, escalate to formal-archive with explicit "tooling-unreachable" rationale documented at FINAL §"permanent-archive". |
| **P-2** | CSS budget rebaseline (95.7% raw at HEAD-O) | O.W7 ε audit | OPEN; HEAD is post-AB+1 (v1.7.0; +font subsystem + 4 new subpaths + 1 chassis var)—bundle likely grew further | **P.W0 ε ledger rebaseline** | Author `bundle-budget.json` 42_000 raw / 7_400 gz at P.W0 + remeasure at HEAD-P. AB+1 cohort introduced WOFF2 assets—verify ε wave covers font-asset budgeting separately from JS/CSS. |
| **P-3** | 3 pre-W2 typed-key sites without paired helpers (`CONFIGURATOR_DENSITY_KEY`, `SORTABLE_CONTEXT`, `GlyphFaceSilhouetteKey`) | O.W7 δ audit | OPEN | **P.W1 invariant-25 completion sweep** | Per Pδ round-1 lane—verify the 3 sites + author 3 paired strict/optional helpers. Mechanical; one lane. Pδ round-1 audit verifies AB+1 cohort preserved invariant 25 (new DI added in MetricStack / MetricCell / ResponsiveTabs?). |
| **P-4** | Demo stories for 4 W6 promotions (useClipboard / HeaderRibbon / dock-icon-button token ladder / scale-on-hover) | O.W7 δ + π audits | OPEN at O close; AB+1 cohort added 5 new primitives (MetricRow / MetricStack / AnimatedDigit / MetricCell / ResponsiveTabs)—extended cohort | **P.W2 demo-coverage cohort** | Expanded scope: 4 O-W6 promotions + 5 AB+1 primitives + 1 timeline a11y fix = 10 demo stories. Single demo-tier wave. |
| **P-5** | `<Slider variant="glass-scrubber">` substrate (3 fourier-analysis sites) | O11/b carry-forward | OPEN | **P.W3 substrate-decision wave** (wire-or-formal-retire per N invariant 22 spot-verification gate) | If 3 sites still at HEAD with ≥80% recipe overlap (re-verify at P.W3 open), wire as Slider variant. Otherwise formal-retire with explicit "user-explored, no sufficient consumer count" rationale. NO DEFER. |
| **P-6** | "robust" banned-word at W6 Lane A proof doc + corpus-wide spaced-em-dash style drift | O.W7 δ audit | OPEN | **P.W4 style-precept enforcement sweep** | Single rg-based pass across `docs/tranches/` corpus; banned-word list at `docs/precepts/instructions/STYLE.md`; mechanical fix. |
| **P-7** | γ-M5 CHANGELOG v1.3.0 "8 constants" typo | O.W7 γ audit | OPEN (frozen historical entry) | **P.W4 doc cohort (1-line absorb)** | Folded into the doc-tier wave alongside P-6. |

### § 2.2—O cross-repo carry-forwards (CR-1 … CR-7)

| ID | Item | Consumer | State at HEAD | P-wave assignment | Rationale |
|---|---|---|---|---|---|
| **CR-1** | value.js v1.7.0 adoption fix (avatar typo + 2 dock-key injects) | value.js (WIP branch `w.w2.1-value-js-prebuild`) | OPEN; consumer on WIP branch frozen at `c0cc349` | **P.W5 cross-repo write batch—value.js cohort** (user-authorized) | Per CONSTELLATION.md READER-ONLY policy + O FINAL §5 row. Bundle with CR-4 (also value.js). Requires explicit user authorization to merge WIP. NO PERMANENT-DEFER (the prior PD-3 row is folded here). |
| **CR-2** | fourier-analysis 2 dock-key injects + 3 useClipboard inline parallels | fourier-analysis | OPEN | **P.W5 cross-repo write batch—fourier cohort** | Bundles with P-5 (`<GlassScrubber>` substrate decision) since same consumer. |
| **CR-3** | keyframes.js HeaderRibbon adoption + scale-on-hover 13-site migration | keyframes.js | OPEN; cohort-able on `EditorShell.vue` | **P.W5 cross-repo write batch—keyframes.js cohort** | Single consumer; mechanical migration. |
| **CR-4** | value.js HeaderRibbon retirement + 20 useClipboard sites | value.js | OPEN | **P.W5 cross-repo write batch—value.js cohort** | Bundles with CR-1. |
| **CR-5** | bbnf-buddy `ToolsLayer.vue:328` :deep() retirement | bbnf-buddy | OPEN; 1-line fix | **P.W5 cross-repo write batch—bbnf-buddy cohort** | Single-line; lowest cost; bundle with W5 cohort. |
| **CR-6** | speedtest AC.W6 cohort full consumer adoption | speedtest (AC tranche in-flight) | PARTIALLY-ADDRESSED via AB+1 cohort (library-side substrate landed v1.5/v1.6/v1.7); speedtest-side consumption: ? | **P.W5 cross-repo coordination lane—speedtest AC handoff status review** | Read-only lane: catalogue what AB+1 (P-AB1-AC.W6b/c/d/W8e) delivered on the library side and what speedtest's AC tranche still owes on the consumer side. Per CONSTELLATION.md, speedtest's AC tranche owns its own close ceremony—glass-ui only owns the substrate side. |
| **CR-7** | Fira Code woff2 binary fetch | glass-ui orchestrator | RESOLVED post-O at v1.5.0 (`2474440`)—confirmed at planning time per `findings.md §2` | **RETIRED FROM CARRY** | Document at P.W0 reconciliation table as "landed post-O at v1.5.0; carry retired". Verified above (commit `2474440` 2026-05-14 19:29). |

### § 2.3—O PERMANENT-DEFER items (PD-1 … PD-3)—BINDING-CONSTRAINT-DRIVEN RESOLUTION

The P open directive ("No more deferrals. No carry-forward.") retires the PERMANENT-DEFER path. Every PD-* row resolves into one of: (a) wire/investigate-and-act; (b) formal-archive with explicit out-of-scope rationale documented at P FINAL.

| ID | Item | Source | State at HEAD | P-wave assignment | Resolution path |
|---|---|---|---|---|---|
| **PD-1** | `L-vue-passive-listeners` | L tranche residual; Vue upstream behaviour | UNCHANGED—out-of-glass-ui-scope | **P.W6 formal-archive lane—`docs/tranches/P/archive/L-vue-passive-listeners.md`** | Author 1-page closure: cite Vue upstream issue (or absence thereof); cite glass-ui's compositor-floor stance; explicitly mark "do not re-flag in future tranche β audits". |
| **PD-2** | `L-cache-ttl` | L tranche residual; hosting layer | UNCHANGED—out-of-glass-ui-scope | **P.W6 formal-archive lane—`docs/tranches/P/archive/L-cache-ttl.md`** | Same shape as PD-1; cite hosting-layer scope; mark "do not re-flag". |
| **PD-3** | M.W1 value.js WIP branch sync | M.W1 cross-repo | UNCHANGED at WIP `c0cc349`; user has not authorized merge | **FOLDED INTO P.W5 (CR-1 + CR-4 cohort)** | The PERMANENT-DEFER classification was driven by user-WIP-ownership; under P binding constraint, treat as P.W5 cross-repo wave with explicit user authorization request at P plan synthesis. If user declines authorization, formal-archive at P FINAL with explicit "user-owned WIP" rationale (same archive shape as PD-1/2). |

**Verified empty set**: zero rows where "formally archive with explicit out-of-scope rationale" is the only path; PD-1 and PD-2 are the archived items, and they have a single-paragraph rationale each—that IS the formal closure, not deferral.

### § 2.4—AB+1 shadow-execution items (P-AB1 …)

| ID | Item | Source | State at HEAD | P-wave assignment | Rationale |
|---|---|---|---|---|---|
| **P-AB1** | AB+1 post-hoc plan-folder retrospective | K invariant 3 third recurrence (V → AB → AB+1) | OPEN—12-commit cohort with NO plan folder | **P.W0 HEADLINE—author `docs/tranches/AB+1/` retrospective** | See § 3 below for full retrospective scope + naming decision. K invariant 3 + LL 2026-05-06 + LL 2026-05-12 binding. |
| **P-AB1-tag** | v1.7.0 NOT YET TAGGED (HEAD has `package.json` v1.7.0 + release commit `b201b03` but `git tag` returns latest tag = v1.6.0) | post-O at HEAD `b201b03` | OPEN—verified via `git tag \| sort -V \| tail` returning `v1.6.0` as last entry | **P.W0 orchestrator-direct (or absorb at P close)** | Orchestrator decision: tag at P.W0 retrospective publish (preferred—pairs the tag with the retrospective close) OR tag at P close (acceptable if retrospective is integrated into P FINAL §"AB+1 retrospective"). Recommend P.W0 timing (see § 3 + § 4). |
| **P-AB1-AC.W6b/c/d/W8e** | 4 speedtest-AC waves' worth of consumer-side adoption | speedtest AC tranche | speedtest-side: unaudited at P open; round-2 P11/f lane will catalogue | **P.W5 cross-repo coordination lane (folded with CR-6)** | Library-side substrate is fully shipped (v1.5.0/v1.5.1/v1.6.0/v1.7.0). Consumer-side adoption status surfaces at P round-2 audit. |

**Cohort statistics**:

- 12 source commits between `8e741ba` (v1.4.1 close) and HEAD `b201b03` (`docs/tranches/P/findings.md §2` cited 8; the corrected count from `git log --oneline 8e741ba..HEAD` is **12**).
- 4 release tags landed (v1.5.0 / v1.5.1 / v1.6.0 / v1.7.0—though v1.5.1 was NOT in `findings.md §2` commit list because the AB+1 cohort's intermediate-release was inferred from CHANGELOG; verified independently via `git tag`).
- v1.7.0 is bumped in `package.json` but **NOT git-tagged at HEAD** (last tag = v1.6.0).
- 5 new primitives shipped (MetricRow / MetricStack / AnimatedDigit / MetricCell / ResponsiveTabs).
- 1 new font subsystem (OFL self-host: Fira Code + Plus Jakarta Sans).
- 1 new ToggleGroupItem variant ("card").
- 1 new chassis CSS-var (`--phase-color-label`).
- 1 timeline a11y fix (`::before inset -15px` 44×44 WCAG hit area).
- 4 new flat subpaths (per CLAUDE.md context: `/metric-stack`, `/animated-digit`, `/metric-cell`, `/responsive-tabs`).

### § 2.5—Synthesis

Every ledger item lands in a concrete P-wave. Formal-archive count: 2 (PD-1 + PD-2). User-authorization-pending count: 1 (CR-1/CR-4/PD-3 value.js cohort—folds to P.W5 with explicit authorization request OR formal-archive if declined). All other rows: WAVE-ASSIGNED.

**No item exits P open as deferral.** No PERMANENT-DEFER survives.

---

## § 3—AB+1 shadow-execution retrospective scope

Per K invariant 3 + LL 2026-05-06 "No Tranche-Letter Shadow Execution": **third recurrence** of the shadow-execution anti-pattern (V → AB → AB+1).

### § 3.1—Per-commit cross-walk (12-commit cohort range `v1.4.1..HEAD`)

Cited from `git log --format="%H %ai %s" 8e741ba..HEAD`:

| # | Hash | Timestamp | Subject | Wave (speedtest-side) | Library tag |
|---|---|---|---|---|---|
| 1 | `4660a0d` | 2026-05-14 18:52 | docs(typography): self-host font policy subsection—speedtest AC.W6a Path-1 reduced scope | AC.W6a | (in-flight; pre-tag) |
| 2 | `2474440` | 2026-05-14 19:29 | feat(typography): self-host Fira Code + Plus Jakarta Sans OFL—Path D substitution (AC.W6b) | AC.W6b | v1.5.0 |
| 3 | `8246e07` | 2026-05-14 19:29 | chore(release): v1.5.0—OFL font self-host subsystem (AC.W6b) | AC.W6b | **v1.5.0 TAGGED** |
| 4 | `099910d` | 2026-05-14 19:45 | feat(chassis/phase-color-label): --phase-color-label cascade for WCAG label register (AC.W6c) | AC.W6c | v1.5.1 |
| 5 | `8bf51c4` | 2026-05-14 20:03 | feat(timeline/hit-area): ::before inset -15px for 44x44 WCAG (AC.W6d F2.I-04) | AC.W6d | v1.6.0 (in flight) |
| 6 | `bb1f15b` | 2026-05-14 20:08 | feat(primitives): MetricRow + MetricStack + AnimatedDigit ship (AC.W6d) | AC.W6d | v1.6.0 (in flight) |
| 7 | `12e7f55` | 2026-05-14 20:09 | docs(design): custom-prop cascade pattern + new primitive catalog entries (AC.W6d) | AC.W6d | v1.6.0 (in flight) |
| 8 | `d813c63` | 2026-05-14 20:26 | feat(metric-stack/as-prop): render-as TransitionGroup support (AC.W6d consumer-side ergonomics) | AC.W6d | v1.6.0 (in flight) |
| 9 | `e238862` | 2026-05-14 20:27 | chore(release): v1.6.0—primitive expansions cohort (AC.W6d) | AC.W6d | **v1.6.0 TAGGED** |
| 10 | `7ddb260` | 2026-05-14 20:52 | docs(changelog): cross-reference AC.W6 cohort (v1.5.0 + v1.5.1 + v1.6.0; speedtest AC.W6b/c/d) | AC.W6 doc | (intermediate) |
| 11 | `8dad58d` | 2026-05-14 22:08 | feat(primitives): MetricCell + ResponsiveTabs + ToggleGroupItem card variant (AC.W8e) | AC.W8e | v1.7.0 (pre-tag) |
| 12 | `b201b03` | 2026-05-14 22:08 | chore(release): v1.7.0—AB+1 substrate cohort (AC.W8e) | AC.W8e | **v1.7.0—UNTAGGED at HEAD** |

**Note on `findings.md §2` count discrepancy**: the planning-time draft cited 8 commits—that count omitted (a) the v1.5.1 release pair around `099910d` (one of the 4 tags but absent from the draft's bullet list), (b) `12e7f55` and `d813c63` (the v1.6.0 in-flight pair). The verified count from `git log` is 12 source commits + 4 tags landed (v1.5.0, v1.5.1, v1.6.0) + v1.7.0 UNTAGGED.

Per CHANGELOG.md headers, all 4 versions ARE documented (v1.7.0 + v1.6.0 + v1.5.1 + v1.5.0), so the doc-side accounting holds—only the git-tag-side and the plan-folder-side are gapped.

### § 3.2—Per-wave reconstruction (waves dispatched FROM speedtest)

The AB+1 cohort's wave structure was authored on the SPEEDTEST side (the AC tranche)—glass-ui consumed and absorbed the substrate without authoring its own wave specs. Reconstructed per speedtest's wave numbering visible in commit subjects:

| Speedtest-wave | Library substrate delivered | Library tag | Library wave equivalent (proposed at retrospective) |
|---|---|---|---|
| AC.W6a | Self-host font policy docs (subsection only) | (intermediate) | AB+1.W0 docs prep |
| AC.W6b | OFL self-host: Fira Code + Plus Jakarta Sans woff2 + `src/fonts/` | v1.5.0 | AB+1.W1—font subsystem |
| AC.W6c | `--phase-color-label` cascade (chassis CSS-var) | v1.5.1 | AB+1.W2—WCAG label register |
| AC.W6d | Timeline 44×44 hit-area fix + MetricRow + MetricStack + AnimatedDigit + MetricStack `as` prop + custom-prop cascade docs | v1.6.0 | AB+1.W3—primitive expansions cohort |
| AC.W8e | MetricCell + ResponsiveTabs + ToggleGroupItem card variant | v1.7.0 (UNTAGGED) | AB+1.W4—primitive expansions follow-on |

5 implicit waves (W0 docs → W4 final). All glass-ui-side substrate accounting traces to speedtest-side wave numbering—no glass-ui-side wave authorship existed before this retrospective.

### § 3.3—Naming decision (RECOMMENDATION)

The retrospective folder MUST be `docs/tranches/AB+1/` (NOT a new letter).

**Rationale**:

1. **Commit-message attribution is authoritative**. All 12 commits cite "AB+1" or "AC.W*" (the speedtest-side wave) in their subjects. The library-side cohort identity has already been committed-to in the public git history under the name "AB+1 substrate cohort" (see `b201b03` subject verbatim: `"chore(release): v1.7.0—AB+1 substrate cohort (speedtest AC.W8e)"`). Renaming the retrospective folder to a new letter (e.g., "AC-mirror" or "O-AB1") would create a documentation-vs-commit-history mismatch that future agents reading `git log` would have to reconcile.

2. **Pattern precedent**: the V tranche post-hoc retrospective was authored at K.WV (folder `docs/tranches/V/`)—same shape: a pre-existing-by-commit-attribution cohort identity, written up post-hoc with the cited name. AB tranche post-hoc retrospective was authored at O.W0 (folder `docs/tranches/AB/`—verified per O FINAL §2 W0 row "AB post-hoc plan folder"). AB+1 follows the same pattern.

3. **K invariant 3 binding**: "a tranche letter cited in commit messages must trace to a plan folder" (LL 2026-05-06 verbatim; codified at `docs/precepts/instructions/LESSONS-LEARNED.md` l. 466). The plan-folder name MUST match the tranche letter cited.

**Folder shape** (K.WV pattern; AB analog at O.W0):

```
docs/tranches/AB+1/
├── AB+1.md            # plan + thesis + invariants + wave schedule (5 waves: W0-W4)
├── PROGRESS.md        # per-wave execution log (post-hoc reconstruction from commit timestamps)
├── FINAL.md           # close retrospective + ε CSS budget delta + π visual-runtime status + γ doc-drift
├── findings.md        # cohort attribution (no user prompt; speedtest AC tranche dispatch context)
├── waves/
│   ├── W0.md          # docs prep (AC.W6a Path-1)
│   ├── W1.md          # font subsystem (AC.W6b → v1.5.0)
│   ├── W2.md          # WCAG label register (AC.W6c → v1.5.1)
│   ├── W3.md          # primitive expansions cohort (AC.W6d → v1.6.0)
│   └── W4.md          # primitive expansions follow-on (AC.W8e → v1.7.0)
├── audit/
│   └── shadow-execution-attribution.md   # commit-by-commit cross-walk (this § 3.1 ledger)
└── coordination/
    └── speedtest-AC.md   # cross-tranche coordination protocol (mirror of speedtest's AC artefact)
```

### § 3.4—v1.7.0 tagging status

**STATE**: `package.json` v1.7.0 at HEAD `b201b03`; last `git tag` entry = v1.6.0; **no `v1.7.0` tag exists**.

**OWNERSHIP**: orchestrator-only (per Hardened Agent Git Clause / K W0—agents NEVER stage / commit / tag).

**TIMING RECOMMENDATION**: tag at **P.W0 retrospective publish**—i.e., when `docs/tranches/AB+1/` is published, the orchestrator runs `git tag v1.7.0 b201b03` + `git push --tags`. This pairs the tag with its retrospective close commit (analogous to how K.WV's V-tranche retrospective publish closed V's missing close ceremony—V did not need a NEW tag, but AB+1 does need v1.7.0 tagged).

**ALTERNATIVE TIMING**: tag at P close (acceptable but less clean—the retrospective lives in `docs/tranches/AB+1/` for some duration without the tag pairing).

**Strong recommendation**: P.W0 timing.

---

## § 4—Recommended P-wave schedule (6 waves)

Sized to absorb the full inheritance ledger (§ 2) + AB+1 retrospective (§ 3) under the binding zero-deferral constraint. NO carry-forward at P close.

```
P.W0—RECON + AB+1 RETROSPECTIVE PUBLISH (HEADLINE; orchestrator-direct + 1 agent)
  Lane A (orch): author docs/tranches/AB+1/{AB+1.md, waves/W{0..4}.md, PROGRESS.md, FINAL.md,
                  findings.md, audit/shadow-execution-attribution.md, coordination/speedtest-AC.md}
  Lane B (orch): tag v1.7.0 b201b03 + push --tags  [P-AB1-tag]
  Lane C (agent): ε CSS budget rebaseline ledger (P-2)—measure HEAD-P bundle + author
                  bundle-budget.json v2 with raw / gz / font-asset rows  [P-2]
  Lane D (orch): CR-7 carry retirement table at P.W0 reconciliation doc  [CR-7]
  Lane E (orch): π tooling-availability decision—connect MCP Chrome bridge per system context;
                  if unreachable, document at audit/W0-tooling-availability.md  [P-1 prep]
  Close artefacts: docs/tranches/AB+1/* + v1.7.0 git tag pushed + audit/P-W0-recon.md
  Tag: v1.7.1 (patch—retrospective publish + tooling probe + bundle rebaseline; doc-only at lib surface)

P.W1—INVARIANT-25 COMPLETION + LEAKY-ABSTRACTION SWEEP (1 agent + close audit)
  Lane A: 3 paired-helper authoring (P-3—CONFIGURATOR_DENSITY_KEY, SORTABLE_CONTEXT,
          GlyphFaceSilhouetteKey)
  Lane B: round-1 Pδ findings absorption (verify AB+1 cohort preserved invariant 25;
          any new DI shapes from MetricStack/MetricCell/ResponsiveTabs?)
  Close artefacts: 3 helper authoring proof + 1 audit/W1-Lane-B-AB1-DI-audit.md
  Tag: v1.7.2 (patch—internal-refactor, additive helpers)

P.W2—DEMO-COVERAGE COHORT (1-2 agents)
  Lane A: 4 O.W6 promotion demo stories (useClipboard / HeaderRibbon / dock-icon-button token
          ladder / scale-on-hover)  [P-4]
  Lane B: 5 AB+1 primitive demo stories (MetricRow / MetricStack / AnimatedDigit / MetricCell /
          ResponsiveTabs)
  Lane C: 1 timeline a11y fix verification story (hit-area)
  Close artefacts: 10 demo stories + audit/W2-demo-coverage.md
  Tag: v1.7.3 (patch—demo-only; no library surface change)

P.W3—SLIDER SUBSTRATE DECISION + AC.W8e WIRE FOLLOW-ON (1 agent + spot-verify)
  Lane A: P-5—re-verify 3 fourier-analysis sites at HEAD; spot-verification gate per N
          invariant 22; wire-as-Slider-variant OR formal-retire with explicit rationale
  Lane B: any AB+1 AC.W8e consumer-side ergonomic gaps surfaced at P round-2 audit (P11/f
          speedtest cohort)
  Close artefacts: substrate decision proof OR formal-retire archive
  Tag: v1.8.0 IF wired (minor—new Slider variant); v1.7.4 IF retired (patch—no surface change)

P.W4—STYLE + DOC ENFORCEMENT SWEEP (1 agent)
  Lane A: "robust" banned-word + corpus-wide spaced-em-dash style drift (P-6)
  Lane B: γ-M5 CHANGELOG typo (P-7)
  Lane C: any γ doc-drift caught at P round-1 / round-2 audits
  Close artefacts: style-precept-sweep proof + audit/W4-style-enforcement.md
  Tag: v1.8.1 or v1.7.5 (patch—docs only)

P.W5—CROSS-REPO MULTI-WRITER BATCH (orchestrator-direct cross-repo writes; user-authorized)
  Lane A: keyframes.js HeaderRibbon + scale-on-hover migration on EditorShell.vue (CR-3)
  Lane B: value.js v1.7.0 adoption + HeaderRibbon retirement + useClipboard 20 sites
          (CR-1 + CR-4; user authorization required for WIP merge or formal-archive PD-3)
  Lane C: fourier-analysis 2 dock-keys + 3 useClipboard parallels (CR-2)
  Lane D: bbnf-buddy ToolsLayer.vue:328 :deep retirement (CR-5)
  Lane E: speedtest AC handoff status read-only review (CR-6 + P-AB1-AC.W6b/c/d/W8e)
  Close artefacts: 5 cross-repo writes + audit/W5-multi-writer.md
  Tag: (no library tag—cross-repo writes only)

P.W6—CLOSE CEREMONY + PERMANENT-ARCHIVE FORMALIZATION (orchestrator + 7-13 audit lanes)
  Lane orch-A: docs/tranches/P/archive/{L-vue-passive-listeners.md, L-cache-ttl.md}  [PD-1 + PD-2]
  Lane orch-B: PD-3 disposition (if W5 Lane B closed PD-3 via cross-repo write, retire from carry;
               otherwise formal-archive at P FINAL §"chronic permanent defers—closed")
  7 strengthened audit lanes (α/β/γ/δ/ε/π/ι)—pattern per O.W7
  Round-2 6-lane consumer re-audit (P11/a-f)—pattern per N.W4 + O.W7
  π lane HARD GATE: runtime visual probe MUST run OR formal-archive π as "tooling-unreachable"
  Close artefacts: FINAL.md + archive/* + 13 audit proof docs
  Tag: v1.8.0 (minor—assumes W3 wired Slider) OR v1.7.6 (patch—close-only)
```

**Tag projection**: 4-7 patches + 0-1 minors = 4-7 new tags at P close. Net version trajectory: v1.7.0 (HEAD untagged) → v1.7.1 (P.W0—retrospective + v1.7.0 backfill tag) → ... → v1.8.0 (P close, if W3 wired).

**Critical path**: P.W0 → P.W1 → (P.W2 ∥ P.W3) → P.W4 → P.W5 → P.W6. 6 sequential edges. Multi-day cadence if user authorizes immediate implementation; otherwise planning-only mode per row 18 in §1.

**Sizing rationale**:

- P.W0 carries the heaviest single-wave load (4 lanes including the HEADLINE retrospective + v1.7.0 tag + ε rebaseline). Folding the retrospective into a single-wave-with-multiple-lanes preserves the K.WV / O.W0 pattern.
- P.W5 is the cross-repo wave; bundling all 5 cross-repo carries reduces context-switch cost.
- P.W6 is the largest single audit lane count (13 lanes) but follows the canonical O.W7 / N.W4 pattern.

---

## § 5—Risks

The 5 risks below compound if P does not absorb them at close.

### Risk 1—Cross-repo MULTI-WRITER coordination + WIP-branch sync (P.W5)

**Source**: PD-3 + CR-1 + CR-4—value.js sits on a WIP branch `w.w2.1-value-js-prebuild` frozen at `c0cc349`. M.W1 attempted to land value.js work on master and partially succeeded (keyframes.js landed on master, value.js did not—per N FINAL §5 + N ι sweep). 3 tranches (M → N → O) carried PD-3; P binding constraint forbids that.

**Concrete risk**: at P.W5 dispatch, if user does NOT authorize the value.js WIP merge, the cross-repo write cannot land. Formal-archive at P FINAL is the fallback, but the underlying "P-AB1 cohort consumer adoption" question (does value.js consume v1.7.0?) stays open.

**Mitigation**: at P.W0 plan synthesis, surface a SINGLE-DECISION block to the user: "P.W5 requires explicit authorization for the value.js cohort merge OR explicit archive". Resolve before W5 dispatch. Per O FINAL §5 + CONSTELLATION.md READER-ONLY policy, the orchestrator cannot mutate value.js without authorization.

### Risk 2—AB+1 retrospective scope creep (P.W0)

**Source**: P-AB1 is HEADLINE-class scope (entire post-hoc plan folder + per-wave specs + close retrospective). The K.WV V-tranche analog took an entire wave; the O.W0 AB-tranche analog also absorbed an entire wave Lane A.

**Concrete risk**: P.W0 includes 4 other lanes (B-E) alongside the HEADLINE. If the retrospective author dispatches as a single agent and overruns the 30-min HARD CAP, P.W0 falls behind.

**Mitigation**: dispatch P-AB1 author as a multi-agent fan-out (per K invariant 3 + V analog): one agent per wave-spec (W0-W4 = 5 agents, parallel). Orchestrator authors `AB+1.md` + `FINAL.md` + `findings.md`. 6-7 parallel artefacts; ~25-min flat wall-clock per the dual ceiling.

### Risk 3—π tooling-availability uncertainty (P.W0 + P.W6)

**Source**: P-1 is the 2nd consecutive π TOOLING-DEFERRED at O.W7. P-tranche system context lists `mcp__claude-in-chrome__*` tools as DEFERRED-but-available-via-ToolSearch—but actual connectivity is unverified at P open.

**Concrete risk**: at P.W6 close, if π tooling is STILL unreachable, the 3rd consecutive deferral violates the P binding constraint (no PERMANENT-DEFER). Formal-archive of π lane as "tooling-unreachable" is the documented fallback, but that fallback itself is the precedent the binding constraint is trying to retire.

**Mitigation**: at P.W0 Lane E, run a real ToolSearch + connectivity probe FIRST. If reachable, π becomes a deferred-but-routine close gate. If unreachable, P.W0 authors the formal-archive document immediately (rather than at W6) so the rest of P is not blocked.

### Risk 4—AB+1 commit-attribution mismatch with retrospective folder name

**Source**: § 3.3—commits cite "AB+1" as subject identifier. If the retrospective is renamed (e.g., to "AC-mirror"), future agents reading `git log` will not find a plan folder at the cited name.

**Concrete risk**: this risk is the inverse mitigation of choosing `docs/tranches/AB+1/`. The risk persists if the orchestrator overrides the recommendation in § 3.3.

**Mitigation**: hold the recommendation. The "+1" in the folder name is unusual (per filesystem-naming hygiene) but precedent supports literal commit-attribution (the AB folder at `docs/tranches/AB/` set the pattern; AB+1 extends it).

### Risk 5—P binding constraint "ZERO DEFERRAL" precedent-setting cost

**Source**: every prior tranche close (K → O) shipped under "deferral with named destination" as a valid close path per `tranche/SPEC.md §Close`. P retires that path.

**Concrete risk**: if P close ships items that the user reads as "deferred under another name" (e.g., formal-archive of PD-1/PD-2 as documents instead of investigations), the binding constraint may be re-interpreted at Q open as un-met. The retrospective consequence: P-residuals could spawn a Q-tranche even though P FINAL claims clean close.

**Mitigation**: P FINAL §"Closure semantics" must explicitly enumerate the binding-constraint resolution at row level: (a) every ledger row's disposition (WAVE-ASSIGNED / WAVE-LANDED / FORMAL-ARCHIVED with rationale); (b) the formal-archive set's rationale (PD-1 = Vue upstream out-of-scope; PD-2 = hosting-layer out-of-scope; PD-3 = user-authorized OR formally user-declined); (c) zero items in the "deferred-to-Q" set. Spot-verifiable at user audit time.

---

**Pζ READS** (verbatim citations to source):

- `/Users/mkbabb/Programming/glass-ui/docs/tranches/P/findings.md`—178 lines
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/O/FINAL.md`—170 lines (esp. §5 carry-forward ledger)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/O/research/Rzeta-recap-chronic-deferrals.md`—333 lines (the analog at O open)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/N/FINAL.md`—146 lines (esp. §5)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/L/FINAL.md`—99 lines (esp. §7—PD-1 + PD-2 origin)
- `/Users/mkbabb/Programming/glass-ui/docs/tranches/M/FINAL.md`—50 lines read (esp. §2-3)
- `/Users/mkbabb/Programming/glass-ui/CHANGELOG.md`—entries v1.4.1 → v1.7.0 (the AB+1 cohort)
- `/Users/mkbabb/Programming/glass-ui/docs/precepts/instructions/LESSONS-LEARNED.md`—2026-05-06 + 2026-05-12 + 2026-05-13 entries (esp. l. 466 "No tranche-letter shadow execution"; l. 522 stash anti-pattern)
- `git log --format="%H %ai %s" 8e741ba..HEAD`—12-commit AB+1 cohort window
- `git tag | sort -V | tail -20`—confirmed v1.6.0 = last tag; v1.7.0 UNTAGGED

**Author**: P Pζ lane (round-1 backend audit; read-only; HARD CAP 30 min observed; single artefact per closing rule).
