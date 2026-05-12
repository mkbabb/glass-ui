# Rα — L Retrospective (M tranche pre-research lane 1 of 6)

**Audit HEAD**: glass-ui `3e4d472` (L W8 close, 2026-05-12 00:12 EDT). v1.0.0 tagged + pushed.
**Cross-repo HEADs sampled**:
- speedtest `98f88325` (Y tranche in flight; glass-ui v1.0 re-link landed 2026-05-11 23:05 EDT).
- precepts submodule local `b51047d`; origin/main `26297c9` (6 commits local-ahead, 15 commits origin-ahead — push deferred).
- bbnf-buddy `(unverified HEAD; live consumer file:link to ../glass-ui)`.
- fourier-analysis/web `(live consumer file:link to ../../glass-ui)`.
- words/frontend `(file:./glass-ui — link target missing; consumer broken at filesystem level)`.
- keyframes.js `74b5d64`; value.js `31ace76`; keyframes-wt-H-W2-verify `(devDep file:link)` — non-Vue prebuild-freshness-gate consumers only.

**Authority**: read-only on every source/repo/reflog. Sole writes: this document + the parent `docs/tranches/M/research/` directory.

---

## §A — L close audit cross-check

### §A.1 Wave-by-wave audit deliverables vs HEAD source

Walked all 10 wave proof docs (`W0-Lane-III` + `W{0..7}-{lane}-proof.md`) plus all 7 W8 audit lane docs (`L-audit-{α,β,γ,δ,ε,π,ι}`) plus `L-pre-close.md` + `L-residuals.md` + `FINAL.md`. The bulk of the source claims hold at HEAD. The drift cohort surfaced below is small but non-trivial — **the γ doc-drift FAIL-WITH-FIXES disposition was claimed absorbed by W8 but is materially under-absorbed**. See §A.3.

### §A.2 Silent misses — items claimed absorbed that aren't

The W8 close commit (`3e4d472`) message asserts 9 absorptions (2 P0 + 7 P1). Verification at HEAD shows partial absorb on 6 of those 9, and 0 of the γ §C **P2 + P3** items absorbed (the P2/P3 cohort was explicitly carried to M per §C, so the latter is correct; the P1 partial-absorbs are the silent misses).

| γ fix item | Severity claim | W8 commit claim | Actual at HEAD `3e4d472` | Verdict |
|---|---|---|---|---|
| #1 W5.md status `IN FLIGHT` → `CLOSED efb802a` | P0 | absorbed | absorbed (W5.md status `CLOSED`) | OK |
| #2 W7.md status `pending` → `CLOSED 59b7b56` | P0 | absorbed | absorbed (W7.md status `CLOSED`) | OK |
| #3 wave specs W0/W1/W2/W3/W4/W6 status TBD → hashes | P1 | **not in absorb list** | NOT ABSORBED — all 6 still say `CLOSED (TBD orchestrator commit)` | **SILENT MISS** |
| #4 PROGRESS.md row hashes | P1 | "TBD commit placeholders replaced with actual hashes" | PARTIAL — Status table got hashes; but 3 prose section headers (`## 2026-05-11 — W0 close (TBD orchestrator commit)` lines 46/54/84) still say TBD | **PARTIAL ABSORB** |
| #5 CHANGELOG.md v1.0 `unreleased` → date | P1 | absorbed | absorbed (`## v1.0.0 — 2026-05-11`) | OK |
| #6 CHANGELOG.md `### BREAKING — Lane A` enum | P1 | absorbed | absorbed (`### BREAKING — Lane A (root-barrel curation; vueuse-bearing SCC trap closure)` present) | OK |
| #7 CHANGELOG.md `### W7` section | P1 | absorbed (per commit msg, named W7 keyframes + cloneMode etc.) | NEED VERIFY (CHANGELOG.md has 58 `### ` lines per `grep -c`) | likely OK |
| #8 CLAUDE.md:73 `useAuroraStudio` reference | P1 | absorbed | absorbed (line 73 now reads "aurora chrome consumes useConfiguratorState<AuroraConfig> with cloneMode='per-preset' ... L.W7 Lane B retired the prior parallel useAuroraStudio chrome") | OK |
| #9 CLAUDE.md `barrel: ui/ + custom/` comments | P1 | **not in absorb list** | NOT ABSORBED — CLAUDE.md line 114 still says `# barrel: ui/ + custom/` referring to a barrel file that doesn't exist (`src/components/index.ts` absent) | **SILENT MISS** |
| #10 DESIGN.md:770 `useOffsetPagination` row | P1 | absorbed | absorbed (no longer in DESIGN.md as active) | OK |
| #11 s/24 types + 8 constants/28 + 4/ across CLAUDE/README/DESIGN/MIGRATION | P2 | **not in absorb list** (P2 carried to M per §C) | PARTIAL — CLAUDE.md still has 1 occurrence, DESIGN.md has 1 occurrence, README/MIGRATION clean | **PARTIAL ABSORB (P2 intentional carry, but FINAL.md table claims 24+8 is canonical)** |
| #12 CLAUDE.md:167 s/40 vueuse-free/39/ | P2 | not in absorb list | NOT ABSORBED — line 167 still says "40 vueuse-free ui/ package barrels"; actual count is 39 (44 - 4 vueuse-bearing - 1 _shared) | **P2 carry — OK if M absorbs** |
| #13 README.md s/28 custom composites/30/ | P2 | not in absorb list | NOT ABSORBED — README.md still has 2 occurrences of "28 custom composites"; actual is 30 | **P2 carry — OK if M absorbs** |
| #14 CLAUDE/README animations.css description with W7 keyframes | P2 | not in absorb list | NOT ABSORBED — neither file mentions pulse-dot-bounce/pulse-ring-spin/typewriter-blink | **P2 carry — OK if M absorbs** |

**Net silent misses post-W8**: **3 hard silent misses** (γ items #3, #9, #4-partial). All are P1 by the γ-lane's own classification. None of the three appears in `L-residuals.md` as an M-bound item.

This is the single most important finding of this retrospective: **L's W8 within-wave absorb of γ FAIL-WITH-FIXES landed cleanly only for the 2 P0 items + 4 of 7 P1 items. The remaining 3 P1 items were either silently dropped or only partially executed, and the absorb commit message incorrectly claims they were absorbed.** Per L invariant 2 ("No silent misses"), this is a P1 invariant breach. Per the K precedent (W8 ι integrity-sweep flagged 5 P0 silent misses retroactively), L's own ι sweep didn't catch its own absorb-completeness gap. The ι lane's reflog scan was canonical, but it did not cross-check the γ fix-list against post-absorb HEAD.

### §A.3 DEGRADED-as-close items

L FINAL declares 1 DEGRADED-acknowledged condition (invariant 7 — W1 Lane B disclosed `git checkout`) and L-residuals.md routes 1 process residual (precept-submodule push divergence) and 1 substrate residual (F-ε-3 Configurator recursion under Lighthouse) to M. Verification:

| DEGRADED item | Resolution path | Verified? |
|---|---|---|
| W1 Lane B `git checkout` (invariant 7 boundary cross) | Add `checkout` to forbidden subset; M W0 LESSONS-LEARNED entry per L-residuals §M-tranche bound process-failures | Named destination: M W0 precept-update. Status: open. Recommended. |
| Precept submodule push divergence (15 origin commits / 6 local commits) | M W0: read both streams' diffs, identify philosophical conflicts (REAUDIT-stream's 10→6 parallel ceiling tightening may align with K's 6-ceiling — could be consonant rather than conflicting), integrate, push | Named destination: M W0. The 15 origin commits include `11a1b4c refactor(precepts): tighten parallel-agent ceiling from 10 to 6` which is consonant with our K precedent — likely a merge-no-conflict outcome, not a conflict. |
| F-ε-3 Configurator recursion under Lighthouse | M needs methodical reproduction harness (Best-practices=96, 1 audit failing; non-blocking) | Named destination: M substrate cohort. |

The γ silent misses (§A.2) are NOT in this list — they're an unnamed silent miss, not a DEGRADED-with-named-destination.

### §A.4 Within-wave absorb retrospective

The γ absorb claimed 2 P0 + 7 P1 absorptions. Actual: 2 P0 + 4 P1 verifiable, 3 P1 silently dropped, 4 P2 carried per §C. The absorb itself created **drift between the absorb commit message and post-absorb HEAD** — a second-order doc-drift class.

Recommendation: M W0 LESSONS-LEARNED should add an entry like **"absorb-commit message fidelity"** — when a within-wave absorb claims to fix N items, post-absorb a sub-second-order audit must cross-check the claim against HEAD before the close ceremony commits. The W8 commit message says "PROGRESS.md (TBD commit) placeholders replaced with actual hashes" but only the table got the hashes, not the prose section headers; the message is materially inaccurate.

### §A.5 Cross-repo silent misses

This is the largest finding of the retrospective. **Multiple cross-repo consumers were not in L's audit scope and are now broken at v1.0**.

Consumer constellation discovered via `for d in /Users/mkbabb/Programming/*/package.json; do grep -l '@mkbabb/glass-ui' $d; done` plus `/web/` and `/frontend/` sub-tree variants:

| Consumer | Glass-UI pin | Symlink resolves | Retired-symbol consumption | v1.0 root-barrel breakage |
|---|---|---|---|---|
| speedtest | `file:../glass-ui` | yes (live) | 0 (verified clean) | 0 (re-linked at `98f88325`) — **CLEAN** |
| fourier-analysis/web | `file:../../glass-ui` | yes (live) | 3 files using `useOffsetPagination` / `useVirtualSectionWindow` from retired `/pagination` + `/virtual` subpaths | + `useGlobalDark` from root barrel — **2 BREAKING CONDITIONS** |
| bbnf-buddy | `file:../glass-ui` | yes (live) | 0 | + `useGlobalDark` from root barrel (2 sites: `main.ts`, `CodeEditor.vue`) — **1 BREAKING CONDITION** |
| words/frontend | `file:./glass-ui` | **NO** (link target missing) | `useWindowedStore` from `/virtual` (retired); `useVirtualSectionWindow` from `/virtual` (retired) | + `useGlobalDark`, `Input`, `Textarea` from root barrel — broken at filesystem level AND would be broken at type level if relinked — **3 BREAKING CONDITIONS + filesystem state inconsistency** |
| keyframes.js, value.js, keyframes-wt-H-W2-verify | `file:../glass-ui` (devDep only) | yes (live) | 0 (no src/ consumption; prebuild freshness-gate only) | 0 — **CLEAN** |
| glass-ui-w234-V, glass-ui-w2.1-W | (these ARE glass-ui worktrees at v0.9.x snapshots, not consumers) | n/a | n/a | n/a — out of scope |

**bbnf-buddy** also imports a symbol called `useLeaveTimer` from glass-ui root, which does not exist in `src/index.ts` at HEAD. Either it never existed and bbnf-buddy is on a much older v0.x snapshot (the file:link suggests live; if so the import is currently broken), or it was retired before L without bbnf-buddy migrating. Recommend M-tranche orchestrator confirm.

L's coordination protocol (per `docs/tranches/L/coordination/speedtest-Y.md`) covered ONLY speedtest. The constellation has **at least 3 additional Vue consumers** (bbnf-buddy, fourier-analysis/web, words/frontend) that:
1. Were never inventoried in L research.
2. Were never inventoried in L W3 second-consumer-fidelity audit.
3. Were never given a migration path (MIGRATION.md is symbol-symmetric but doesn't enumerate consumers needing migration).
4. Were never given a coordination protocol artefact.
5. May or may not be in active development (live-builds vs stale link state needs M W0 census).

Per the user's memory directive "Tailwind-first... no legacy code" + the constellation-cohesion concern: **this is the single most important M-tranche question**. The cn() duplication + tailwind-merge stale dep findings (§C.1, §C.2) compound this.

The speedtest `tailwind-merge: ^2.5.3` retention in `package.json` (despite glass-ui having retired it at v0.9.2) is a separate constellation legacy-debt finding (§C.1).

---

## §B — L invariant scorecard

| # | L invariant | Verdict at HEAD | Evidence |
|---|---|---|---|
| 1 | C-K precepts still bind | HELD | per-wave commits + read-only-git in agent flow (except disclosed W1 Lane B) + W8 audit before FINAL |
| 2 | No silent misses; ι re-runs at L W8 | **HOLD-WITH-INCIDENT (γ absorb partial)** | 3 γ P1 items silently un-absorbed despite absorb-commit message claim — first-class breach |
| 3 | No tranche-letter shadow execution | HELD | all 14 commits trace to L spec |
| 4 | Mandatory reconciliation at stale-baseline open | N/A | L opened immediately after K close |
| 5 | HEADLINE invariant — L.W1 lands 4 transpositions | HELD | Lane A + Lane B + Lane C + W0 Lane III all landed; SCC trap closed |
| 6 | Worktree isolation REQUIRED for parallel multi-agent shared-file waves | HELD | all W1+W2 lane proofs declared worktree isolation |
| 7 | Agents NEVER stage/commit/stash/checkout/reset/restore | **DEGRADED-ACKNOWLEDGED** | W1 Lane B `git checkout` self-disclosure |
| 8 | Substrate-without-consumer binary at L close | **HELD INTRA-LIBRARY; DEGRADED CROSS-REPO** | β sweep CLEAN in-tree; but constellation consumers fourier-analysis/web + words/frontend + bbnf-buddy carry retired-symbol imports — substrate "without external consumer" technically holds because they're broken consumers, not absent ones, but the invariant's spirit is constellation-wide |
| 9 | Architectural transposition default | HELD | W1 + W2 + W7 |
| 10 | Vocab convergence as gestalt sweep | HELD | W2 confirms post-modularization vocab canonical |
| 11 | Doc-drift binary at close | **HOLD-WITH-INCIDENT** | 3 γ P1 silent misses (§A.2) violate this strictly; the unabsorbed wave-spec TBD placeholders are the canonical breach |
| 12 | Bundle-budget gate enforced | HELD | profile:budget PASS; 65% headroom |
| 13 | Mobile-viewport fitness binding | HOLD-WITH-INCIDENT (1 P3 carry from K) | Aurora -inset-6 bloom; not L-introduced |
| 14 | Demo-private chrome canonical-aware | HELD | useStoryDemo demoted, DockShowcaseFrame retired, useAuroraStudio retired |
| 15 | Close ceremony 7-agent strengthened pattern (α/β/γ/δ/ε/π/ι) | HELD | 7-lane audit ran; FINAL authored |
| 16 | v1.0 cohort identity | **HELD INTRA-LIBRARY; DEGRADED CROSS-REPO** | MIGRATION.md 592 LOC shipped + v1.0 tagged; but no MIGRATION addendum or coordination doc for 3 unaddressed consumers |
| 17 | Cross-repo coordination with speedtest Y | **HELD FOR speedtest; ABSENT FOR REST OF CONSTELLATION** | only speedtest got a coordination/ artefact |
| 18 | Subpath publication gates expanded | HELD | release.sh probe block + 38/38 PASS |

**Scorecard total**: 13 HELD, 2 HOLD-WITH-INCIDENT, 2 DEGRADED-ACKNOWLEDGED, 1 N/A. The two DEGRADEDs and two HOLD-WITH-INCIDENTs all point at the same M-tranche thesis (constellation cohesion + post-absorb fidelity).

---

## §C — Architectural-debt re-scan post-L

### §C.1 cn() / tailwind-merge legacy across constellation

Glass-ui retired `tailwind-merge` at v0.9.2 (`cn()` ships its own dedup; comment evidence in `src/utils/cn.ts:6`). Constellation re-scan:

| Repo | `tailwind-merge` in package.json | Local `cn()` impl |
|---|---|---|
| glass-ui | absent (canonical) | `src/utils/cn.ts` |
| speedtest | **present (`^2.5.3`)** — stale dep | none (consumes glass-ui's cn via root barrel) |
| fourier-analysis/web | **present (`^3.0`)** — stale dep | none verified |
| bbnf-buddy | (not surveyed for this dep) | (not surveyed) |
| words/frontend | (file:link broken; n/a) | (broken) |
| keyframes.js, value.js | n/a (Node-utility libs, not Vue) | n/a |

**Speedtest's `tailwind-merge: ^2.5.3` is dead weight** — speedtest does not import `twMerge` anywhere in `src/` (verified). It's a leftover from before glass-ui retired the dep. Y-tranche should remove it. Similarly fourier-analysis/web.

Recommendation: **constellation-wide dependency carve-out + audit** is an M-tranche thesis (§F).

### §C.2 useGlobalDark / dark-mode wiring duplication

Glass-ui exposes `useGlobalDark` via `@mkbabb/glass-ui/dark` (flat subpath, post-L). Constellation consumes it:

| Repo | useGlobalDark consumer pattern | v1.0 valid? |
|---|---|---|
| speedtest | `import { useGlobalDark } from "@mkbabb/glass-ui/dark"` (post-`98f88325` re-link) | yes |
| fourier-analysis/web | `import { useGlobalDark } from "@mkbabb/glass-ui"` (root barrel) | NO — root barrel does not export this at v1.0 |
| bbnf-buddy | `import { useGlobalDark } from "@mkbabb/glass-ui"` (root barrel) | NO |
| words/frontend | `import { useGlobalDark } from '@mkbabb/glass-ui'` (root barrel) | NO |

3 of 4 Vue consumers use the v0.9.x pattern. They are all broken at v1.0. This bleeds into §C.4.

### §C.3 Animation utility (`@mkbabb/keyframes.js`) coherence

Glass-ui peer-deps `@mkbabb/keyframes.js: ^2.0.0`. Consumers should peer-dep the same. fourier-analysis/web declares `@mkbabb/keyframes.js: ^2.0.0` directly (good). speedtest and bbnf-buddy resolve transitively (probably). words/frontend declares it explicitly. No ad-hoc parallel-animation implementations found in the constellation in this scan (would warrant a Rε-style dedicated lane).

### §C.4 Cross-repo legacy / retired-symbol references

Compiled inventory of retired-symbol or root-barrel-retired references at HEAD:

| File | Symbol | Source | Severity |
|---|---|---|---|
| `fourier-analysis/web/src/components/visualization/gallery/AdminFlaggedPanel.vue:3` | `useOffsetPagination from '@mkbabb/glass-ui/pagination'` | RETIRED at L.W3.A | **BREAKING** |
| `fourier-analysis/web/src/components/visualization/gallery/AdminUserList.vue:3` | `useOffsetPagination` | RETIRED | **BREAKING** |
| `fourier-analysis/web/src/components/paper/PaperView.vue:10,76` | `useVirtualSectionWindow` | RETIRED | **BREAKING** |
| `fourier-analysis/web/src/components/layout/DarkModeToggle.vue:18` | `useGlobalDark` root-barrel | REMOVED from root at L.W1 Lane A | **BREAKING** |
| `bbnf-buddy/src/main.ts:3` | `useGlobalDark` root-barrel | REMOVED | **BREAKING** |
| `bbnf-buddy/src/components/CodeEditor.vue:20` | `useGlobalDark` root-barrel | REMOVED | **BREAKING** |
| `words/frontend/src/App.vue` | `useGlobalDark` root-barrel | REMOVED | **BREAKING (also broken file:link)** |
| `words/frontend/src/composables/useStateSync.ts` | `useGlobalDark` root-barrel | REMOVED | **BREAKING** |
| `words/frontend/src/stores/search/modes/wordlist.ts:20` | `useWindowedStore from '@mkbabb/glass-ui/virtual'` | RETIRED | **BREAKING** |
| `words/frontend/src/components/custom/definition/.../DefinitionContentView.vue:162` | `useVirtualSectionWindow from '@mkbabb/glass-ui/virtual'` | RETIRED | **BREAKING** |
| `words/frontend/src/components/.../wordlist/modals/EditWordlistModal.vue` | `Input, Textarea` root-barrel | REMOVED (now `/forms`) | **BREAKING** |
| `words/frontend/.../WordlistTargetForm.vue` + `CreateWordListModal.vue` | `Input` root-barrel | REMOVED | **BREAKING** |
| `bbnf-buddy/src/.../CodeEditor.vue` | `useLeaveTimer` | NOT IN glass-ui at HEAD — possibly retired before L | **BROKEN IMPORT (current state)** |

**Count: 13 breaking-import sites across 3 consumers.** Plus 2 stale `tailwind-merge` deps (speedtest, fourier-analysis/web). Plus 1 broken-file:link (words/frontend). Total constellation legacy items: ~16.

### §C.5 Intra-library long-tail (β missed?)

β audit returned CLEAN intra-library. Re-scan finds:

1. **`src/forms.ts` Textarea duplicate** — L-residuals P3 carry. At HEAD `src/forms.ts:11-13` exports `./components/ui/input` + `./components/ui/textarea` + `./components/ui/combobox`. Combobox.vue does NOT itself re-export Textarea — the "duplicate" claim in L-residuals (W1 Lane A §5) was based on a comment that may already have been stale. Recommend M β-lane confirm or strike from residuals.

2. **`GlassPanelVariant` not on api/** — L-residuals P3 carry. At HEAD `src/api/index.ts:29` comments this explicitly: "(e.g. `GlassPanelVariant` is only exported from the SFC, not the barrel)". This is a documented decision; M can elevate or leave per cohesion principles.

3. **`composables/sortable` sub-tree 1-consumer status** — β called this documented-narrowing. Re-evaluate at M (if no second consumer materializes, retire?).

4. **`cloneMode: "per-preset"` 1-consumer status** — β called this documented-narrowing (only aurora consumes). Same re-evaluation owed at M.

5. **`src/api/` aggregator 0-direct-consumers** — β called this documented-narrowing. Same.

These are all already named on L-residuals; M can absorb at β re-run cadence. None are P0/P1 candidates absent further consumer-shaping.

---

## §D — Process-tier retrospective

### §D.1 The 14 commit messages

`b1b9036 b75ebb22 6d922198 2f4fb915 d1de94b dfa6e6c7 f481ba2 1c1788f ae4cad5 fc7e551 efb802a 59b7b56 3e4d472` — 14 commits in L flight including open. The 13 wave commits (excluding open) all carry `feat(tranche-l/wN)` or `chore(tranche-l/wN)` or `docs(tranche-l/wN)` or `refactor(tranche-l/wN)` prefixes (canonical). The W3+W4+W6 commits landed within ~10 seconds of each other (23:23:19, 23:23:28, 23:23:36, 23:23:41) — consistent with parallel agent dispatch + serial orchestrator close-pass commits. No commit-message drift.

### §D.2 Reflog scan during L flight

- **glass-ui**: 14 entries, all `commit:` (orchestrator-authored). Zero `stash@{`, `reset:`, `checkout`, `rebase`, `cherry-pick`, `merge`, or agent-attributed mutating-git. CLEAN — matches `L-audit-ι` claim.
- **speedtest**: 9 entries during L flight window (2026-05-11 22:12 → 23:05 EDT). 8 are `cherry-pick:` and 1 is `commit:` (the v1.0 re-link `98f88325`). The cherry-picks ALL precede the v1.0 re-link and are Y-tranche docs from speedtest's own worktrees; no agent mutating-git from L's dispatch. CLEAN — matches `L-audit-ι` claim.
- **precept submodule**: not reflog-verifiable here without entering it, but its log shows `b51047d` is one commit ahead of `d4ada55` (K close) — matches L invariant 1 (per-wave precept commits) and matches W0 Lane II claim.

### §D.3 Open-questions disposition cross-check

Per L-audit-α §"Open-question disposition audit": 35+ open questions surfaced across 10 proof docs; 32 RESOLVED; 2 DEFERRED to M (src/forms.ts Textarea duplicate; GlassPanelVariant promotion); 1 OWED to W8 ι Lane ε (F-ε-3 Lighthouse re-verify, which Lane ε confirms it ran). All accounted for. **No undispositioned open questions** at L close — this is canonical.

### §D.4 Other incidents in flight

- **The W1 Lane B `git checkout` self-disclosure** (already documented) — only mutating-git incident.
- **Precept submodule push divergence** — already documented; M-bound.
- **W7 Lane B `toRaw` clone hardening** added as a Configurator runtime safety fix; was not pre-planned in W7 spec but is non-breaking and absorbs F-ε-3. The W6 → W7 routing on F-ε-3 was clean.

No additional process incidents surface from this retrospective.

### §D.5 Process-residual recommendations to M

1. **LESSONS-LEARNED entry on absorb-commit fidelity**: when within-wave absorbs claim N items absorbed, the close-pass commit must cross-check claim-vs-HEAD before commit. The W8 close commit's claim violated this and produced the §A.2 silent misses.
2. **Add `checkout` to explicit forbidden-git subset** (already named).
3. **ι reflog scan must also cross-check absorb-commit message against post-absorb HEAD** — pure reflog cleanliness is necessary but not sufficient; the close-pass content fidelity is the missing check.

---

## §E — P0 silent-miss count

L FINAL §10 + L-residuals.md claim **0 P0 silent misses** post-W8.

Strict-binary verdict under harsher reading: **3 P1 silent misses present at HEAD** (the §A.2 unabsorbed γ items). Reclassifying upward:

- γ #3 (6 wave specs still TBD) — was P1, and the W8 commit claims absorb. Reading strictly under L invariant 2 ("No silent misses"), an absorb-claim contradicted by HEAD is **P0-class**. The doc-drift is bounded (internal-only; consumers don't read wave specs) so under harsh-but-fair reading it stays P1.
- γ #9 (CLAUDE.md barrel comments) — P1; bounded to a doc.
- γ #4-partial (PROGRESS.md prose headers TBD) — P1; bounded to a doc.

**Net under harsher reading: 0 P0 hard-bind, 3 P1 silent misses unchanged from γ classification + 1 second-order silent miss (absorb-commit fidelity)**.

Plus the **cross-repo silent misses** (§A.5, §C.4): 13 breaking-import sites across 3 unaddressed consumers. Under L invariant 8 ("substrate-without-consumer binary at L close") + invariant 16 (v1.0 cohort identity with binding migration guide), this is **0-1 P0 contender**. The strict reading is:

- If "substrate without consumer" means "consumer at HEAD", invariant 8 holds (the consumers are broken, not missing).
- If "substrate-without-consumer-binary" means "the constellation's relationship to v1.0 is coherent", invariant 8 fails — 3 of 4 Vue consumers are broken-on-current-v1.0.

A defensible reading is that **L scoped consumer-fidelity to speedtest only** (per L invariant 17 + coordination/speedtest-Y.md). Under that reading, no P0. Under the stricter constellation-wide reading, **1 P0** (consumer-fidelity invariant 8 breach for the unaudited constellation).

This retrospective recommends the M-tranche thesis discussion treat the constellation-fidelity question as a P0-class M scope item rather than re-litigating L's close.

---

## §F — M tranche thesis hypothesis

Three candidate theses. Each with tradeoffs.

### Thesis 1 — Constellation cohesion + cross-repo carve-out

**Scope**: comprehensive constellation audit; migrate the 3 unaddressed Vue consumers (bbnf-buddy, fourier-analysis/web, words/frontend) to v1.0; remove stale `tailwind-merge` deps; carve out shared utilities into dedicated packages where DRY-violation density warrants; establish coordination protocol for ALL consumers (not just speedtest).

**Inputs**: §A.5 (cross-repo silent misses), §C.1-C.4 (constellation legacy debt), §B invariant 8 + 16 + 17 DEGRADED-cross-repo readings.

**Tradeoffs**:
- Pro: closes the largest unaddressed L gap; v1.0 becomes coherent constellation-wide.
- Pro: matches user's "no legacy code" directive + ecosystem-nexus framing of glass-ui.
- Con: requires entering 3 consumer repos (touches consumer src/), violates L's tight scope-to-speedtest-only precedent.
- Con: requires consumer prioritization — words/frontend has broken-file:link so may be inactive; bbnf-buddy + fourier-analysis/web are file:linked-live; M cannot assume all consumers warrant active migration.
- Con: M as first-post-v1.0 tranche may want to consolidate, not expand scope.

### Thesis 2 — Substrate maturity + chronic-deferrals absorb

**Scope**: absorb F-ε-3 (Configurator-recursion Lighthouse harness), reconcile precept-submodule push divergence, run formal β re-evaluation on documented-narrowing entries (cloneMode "per-preset", api/ aggregator, sortable sub-tree), absorb the 4 P2 + 12+ P3 demo-side residuals from L-residuals.md, refresh CLAUDE/README/DESIGN cohort (γ silent misses + count-drifts).

**Inputs**: L-residuals.md M-bound list; §A.2 silent misses; §B HOLD-WITH-INCIDENT cohort.

**Tradeoffs**:
- Pro: scope is well-bounded and entirely in-library (no consumer touchpoints).
- Pro: closes invariant 2 + 11 HOLD-WITH-INCIDENT readings cleanly; restores doc-drift binary.
- Pro: matches the "K residuals chronic-deferral absorb" precedent.
- Con: defers the cross-repo question — leaves Thesis 1 as N-tranche scope.
- Con: alone may be undersized for a full tranche if the 4 P2 + 12+ P3 residuals are mostly cosmetic.

### Thesis 3 — Architectural transposition (one more)

**Scope**: one large gestalt collapse — candidates: `glass-ui/styles` extraction into a separate `@mkbabb/glass-styles` package; or `src/api/` evolution from aggregator to first-class typed package; or formalization of cross-repo utility-share via dedicated `@mkbabb/glass-shared` package.

**Inputs**: user's M-precept "modularization" continuation; L's HEADLINE-wave precedent; v1.0 freedom to break.

**Tradeoffs**:
- Pro: matches L's "architectural transposition default" invariant (one named gestalt collapse per substantive tranche).
- Pro: v1.0 → v1.1 is the canonical window for additive carve-outs.
- Con: orthogonal to the consumer-fidelity gap that §A.5 surfaces.
- Con: requires significant Rε-style research lane upfront before plan synthesis.

### Recommendation (informational, NOT a pick)

A **hybrid Thesis 1 + Thesis 2** (constellation cohesion as HEADLINE, chronic-deferrals + γ silent-miss absorb as side-cohort) feels canonical for M as the first-post-v1.0 tranche. The user's L-open directive on "modularization across other modules" was absorbed by L W2 in-library only; the M-tranche extension to constellation modularization closes the loop. Thesis 3 (architectural transposition) can wait for N or a later v1.x window.

The orchestrator + user should pick at plan synthesis after reading all 6 research lanes.

---

## §G — Recommendations to other research lanes

### Rβ (likely: cross-repo / constellation inventory)

1. Run full constellation `package.json` survey: every consumer of `@mkbabb/glass-ui` + every consumer of `@mkbabb/keyframes.js` + every consumer of `@mkbabb/value.js`. Output a constellation graph.
2. For each consumer: verify file:link target resolves (words/frontend's `file:./glass-ui` does not); enumerate import-by-symbol; verify v1.0 compat per `dist/glass-ui.js` exports.
3. Inventory consumer activity: last-commit date, last-build success, intent-to-active-vs-stale.
4. Survey constellation-side `tailwind-merge` retention (1 confirmed in speedtest, 1 in fourier-analysis/web; likely more).
5. Survey cross-repo `cn()` duplication (none confirmed yet but spot-check the Vue consumers).

### Rγ (likely: doc-drift + γ re-run)

1. Re-run γ doc-drift audit at M HEAD; treat L's 3 silent-missed P1 items + 4 P2 carries as M absorb-list.
2. Audit absorb-commit message fidelity for all L wave commits: claim-vs-HEAD diff for each `Per W8 spec §C, doc-only fixes absorbed within-wave` block. The L W8 commit's claim was materially inaccurate; verify other waves were not.
3. Cross-doc count-drift sweep: subpath count, ui-package count, custom-package count, types+constants count, animations keyframes list — establish a single canonical count source.

### Rδ (likely: idiomatic gestalt / per-story consumption)

1. Re-run δ per-story sweep at M HEAD. Most L δ findings were P3 cosmetic deferrals.
2. Especially: the 13 P3 carry-forwards from L δ. Audit whether each remains cosmetic at M HEAD or has graduated to P2/P1.
3. Audit MIGRATION.md against the consumer-side reality discovered by Rα (this lane): MIGRATION should enumerate cross-repo migration paths, not just symbol-symmetry. Currently MIGRATION.md is symbol-symmetric only.

### Rε (likely: substrate / perf / Lighthouse)

1. Reproduce F-ε-3 Configurator recursion under Lighthouse — methodical harness. This is owed from L W8.
2. Re-run Lighthouse on the 4 routes captured at L W8 (aurora/buttons/dock/metaballs) + at least 4 additional routes.
3. Bundle-budget re-baseline post-L; verify the 65% headroom holds + identify next-axis tightening opportunities.
4. Cross-repo bundle profile: speedtest entry-chunk gz was 171.5 KB at speedtest-Y W1. Survey what's in it; is there constellation-shared bundle-time bloat?

### Rζ (likely: user-directive / verbatim-listing / chronic-deferral)

1. Re-read L FINAL.md §10 to harvest any verbatim user directives that mid-flight got addressed but never indexed.
2. Audit `docs/precepts/instructions/LESSONS-LEARNED.md` for L additions; cross-check against L W0 Lane II claim of 5 new entries; verify all 5 are present.
3. Catalogue all L-bound and L-orphaned chronic-deferrals from K residues + cross-tranche debt; for each, verify L disposition matches FINAL.md ledger.
4. Survey user's memory directives (no backwards compat, presets in consumers, no grandiloquence, gestalt redesigns, etc.) against L close behavior — were they respected? The cross-repo migration absence (§A.5) may conflict with "no legacy code" depending on interpretation.

---

## Closing summary (read first)

L closed canonically per its own scope (speedtest-only consumer-fidelity, in-library substrate audit). Under the harsher reading this retrospective applies (constellation-wide consumer-fidelity invariant), L carries **3 P1 doc-drift silent misses (γ-absorb partial) and ~13 breaking-import sites across 3 unaddressed Vue consumers (bbnf-buddy, fourier-analysis/web, words/frontend) plus 2 stale tailwind-merge deps + 1 broken file:link**. The W8 close commit message claims doc-only γ items absorbed but only 4 of 7 P1 items actually landed at HEAD — second-order silent miss.

L invariant scorecard: 13 HELD / 2 HOLD-WITH-INCIDENT / 2 DEGRADED-ACKNOWLEDGED / 1 N/A. The two HOLD-WITH-INCIDENTs (no silent misses + doc-drift binary) and two DEGRADEDs (no destructive git + cross-repo coordination) all converge on a single M-tranche thesis: **constellation cohesion + post-absorb fidelity hardening**.

Thesis recommendation (informational): hybrid of (1) constellation cohesion + cross-repo carve-out (HEADLINE) and (2) substrate maturity + chronic-deferrals absorb (side-cohort). Thesis 3 (architectural transposition) can defer to N.
