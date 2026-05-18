# Qε — Full-prompt recap + chronic-defer audit + post-P shadow-cohort retrospective scoping

**Agent**: Q.Rε (round-1 HEADLINE recap lane).
**Mode**: READ-ONLY planning-phase audit. No source mutations. No mutating git.
**HEAD at audit**: `d244dd5` (2026-05-18 02:03 -0400; package.json v1.8.4 — last tag v1.8.4).
**Date**: 2026-05-18.

## §1 — Scope

Four audit angles per the Q.Rε dispatch:

1. **Full-prompt recap (K → Q)** — extend the P/findings.md §4 K → P ledger with the post-P-close period + the Q-open directive; verify each prompt addressed at HEAD `d244dd5`.
2. **Post-P shadow-cohort retrospective scoping** — the 7-commit `9f774b4..HEAD` cohort shipped without a `docs/tranches/<LETTER>/` plan folder; the 4th K-invariant-3 recurrence, and the FIRST recurrence AFTER invariant 29 was codified (P.W6 `3310a8c`).
3. **Chronic-defer audit** — re-examine P's archived items (PD-1/PD-2/PD-3 + the 3×-archived π visual-runtime lane) against HEAD + the consumer-breakage report.
4. **P close-honesty verification** — spot-check 5 of P's 38 dispositioned items.

## §2 — Full-prompt recap table (K → Q)

The canonical recap. Every user prompt across the K → L → M → N → O → AB+1 → P → post-P → Q span, with addressed-status verified at HEAD `d244dd5`.

| Tranche | Verbatim directive (or summary) | Addressed? | Evidence at HEAD |
|---|---|---|---|
| K open | "Begin tranche K … continue indefatigably; idiomatic gestalt" | YES | K closed 2026-05-08; v0.9.3 + v0.9.4 |
| L open | "v1.0 standardization sweep" | YES | L closed; v1.0 published; vueuse-FREE root barrel + 3-layer subpath surface |
| M open | "Begin and continue current tranche … idiomatic, gestalt approaches" | YES | M closed `54a8acb`; v1.0.4 + v1.0.5 |
| N open | "DEEPLY audit … 6 agents in parallel … Devise a path forward…" | YES | N planning + N.W4 13-agent audit; CLEAN at v1.1.4 |
| N KISS revision | "KISS. Conservative on additions and removals. Audit overfitting." | YES | Plan pivoted; spot-verification gate caught 6 false-positives (LL 2026-05-13) |
| N wiring correction | "useTouchGate is used… Metaballs, paper-backdrop, typewriter should be used elsewhere too" | YES | 5 strategic wires landed at N.W0 |
| O open | "Analyze backend codebase … NO god modules … 6 agents in parallel …" | YES | O closed `8e741ba`; v1.4.1; 8 waves; 13-lane audit |
| O continuation prompts (×4) | "Begin and continue the current tranche…" | YES | Indefatigable execution across W2 + W5 + post-fallback recovery |
| AB+1 (implicit) | NO PROMPT — v1.5.0 → v1.7.0 cohort shipped under shadow-execution | YES (retroactively) | P.W0 Lane A authored `docs/tranches/AB+1/` retrospective (9 files); v1.7.0 tag placed |
| P open | "DEEPLY audit … NO legacy code … No more deferrals. No carry-forward. … Create this tranche" | YES | P closed `9f774b4` (v1.8.4); 7 waves; 38 inheritance items dispositioned; zero P-residuals; invariants 28+29 codified |
| **post-P (implicit)** | **NO PROMPT — 7 commits `9f774b4..HEAD` shipped under shadow-execution** | **NO** | **4th K-invariant-3 recurrence; the Q-postP retrospective addresses it (§3 below)** |
| **Q open** | "DEEPLY audit with 6 agents … recapitulate our prompts/plans/precepts … NO legacy code … Delineate any chronically deferred items … Recap ALL of our prompts … NOT an implementation phase … Some items in our consumers are totally broken (value.js, keyframes.js) — dock items, animations, dropdowns, glass-cards. Audit our core features, styles, co-location, cohesion, consistency." | **THIS TRANCHE** | Q planning round in flight; round-1 6-agent audit (this is Qε); round-2 consumer audit follows |

**Recap verdict**: Every prompt K → P is ADDRESSED at HEAD. ONE prompt-equivalent is UNADDRESSED — the post-P shadow cohort (no user prompt; shadow-execution), which the Q-postP retrospective wave closes. The Q-open directive is THIS tranche's mandate.

### Recurring directive lineage

The Q-open directive is near-verbatim the P-open directive (the "DEEPLY audit / NO quick solutions / NO legacy code / delineate chronically deferred / recap ALL prompts / NOT an implementation phase" block is identical word-for-word). Q adds ONE new headline that P did not carry: **CONSUMER-FUNCTIONAL-REGRESSION** — value.js + keyframes.js report "totally broken" dock/animation/dropdown/glass-card surfaces. This is a NEW directive class; the recap chain shows the user has issued the audit-tranche directive twice in succession (P then Q), which itself is a signal the close-honesty bar must rise.

## §3 — Post-P shadow-cohort retrospective scope

### §3.1 — Commit ledger (7 commits; every hash + author-date)

| # | Commit | Author-date (UTC-4) | Subject | Files | LOC Δ | Tranche tag |
|---|---|---|---|---|---|---|
| 1 | `949474a` | 2026-05-16 17:57:21 | refactor(freshness): retire assertDistFresh + freshness-walk + freshness-gate apparatus | 10 | +3 / −345 | **AD.W4.T2** (speedtest-AD-driven; tagged in subject) |
| 2 | `099d51e` | 2026-05-17 23:46:19 | fix(dock): retire purposeless edge-fade mask that shadowed the last dock item | 1 (`dock.css`) | +21 / −36 | NONE |
| 3 | `3cb70db` | 2026-05-17 23:51:49 | feat(timeline): stitched continuous gradient + rounded ends + glassy dots | 3 | +317 / −41 | NONE |
| 4 | `beec35e` | 2026-05-18 01:35:43 | fix(toggle,dock): card variant sizes to content + inactive dock layers leave hit-test tree | 3 (`toggle/index.ts`, `dock.css`, `package.json`) | +47 / −4 | NONE |
| 5 | `9ba68ca` | 2026-05-18 01:36:32 | feat(metric-stack): compact result register + tokenised value-clamp cqi arm | 3 | +77 / −2 | NONE |
| 6 | `1c6c3e5` | 2026-05-18 01:52:52 | feat(data-table): responsive card-per-row projection at narrow widths | 2 | +157 / −6 | NONE |
| 7 | `d244dd5` | 2026-05-18 02:03:34 | fix(metric-stack): tame the result register — label-clamp tokens + tighter value ceiling | 2 | +22 / −6 | NONE |

**Span**: 2026-05-16 17:57 → 2026-05-18 02:03 (≈ 32 hours; 3 calendar days). **Net**: 24 files, +644 / −440 LOC. **No release tag was placed** within the cohort — package.json sits at v1.8.4 (set at P close `9f774b4`); commit 4 (`beec35e`) touches `package.json` but only the toggle export-graph, not the version field (verified: the `package.json` hunk in `beec35e` is the `/toggle` subpath/export wiring, not a version bump). So the cohort accrued NO tag — it is pre-tag shadow work, distinct from AB+1 (which accrued 3 tags + 1 untagged bump).

### §3.2 — Sub-wave clustering

The 7 commits cluster into 3 coherent sub-waves by theme + timestamp:

| Sub-wave | Commits | Theme | Tranche attribution |
|---|---|---|---|
| **T1 — pipeline retire** | `949474a` | Freshness-gate apparatus retirement (assertDistFresh + freshness-walk + freshness-gate + `src/freshness.ts` + `/freshness` subpath). CLAUDE.md already documents `./freshness` retired "at AD.W4 (Decision 5)" — so this commit IS speedtest-AD-tranche-driven and self-tags `AD.W4.T2`. | **AD.W4.T2** — has an external tranche home (speedtest AD). NOT a glass-ui shadow commit per se; it is a cross-repo-coordinated retire. Document it in the retrospective as "externally-attributed; the glass-ui-side landing of speedtest AD.W4." |
| **T2 — dock + timeline substrate** | `099d51e`, `3cb70db`, `beec35e` (dock portion) | dock.css edge-fade mask retire (`099d51e`); ContinuousTimeline stitched-gradient rewrite (`3cb70db`); inactive dock layers `inert` + dock.css edits (`beec35e`). | **NONE** — pure glass-ui shadow work. **PRIME SUSPECT** for the consumer-reported dock + animation breakage (touches dock.css twice + timeline geometry). |
| **T3 — metric/table primitives** | `beec35e` (toggle portion), `9ba68ca`, `1c6c3e5`, `d244dd5` | toggle card-variant sizing (`beec35e`); MetricStack/MetricRow compact result register + clamp tokens (`9ba68ca` + `d244dd5`); DataTable responsive card-per-row projection (`1c6c3e5`). | **NONE** — pure glass-ui shadow work. Possible suspect for the glass-card breakage (toggle card variant + metric-stack are glass-card-adjacent). |

`beec35e` straddles T2 and T3 (it is a `fix(toggle,dock)` dual-scope commit) — a sign the cohort itself was not wave-disciplined; a tranche-attributed cohort would have split toggle and dock into separate commits.

### §3.3 — Naming recommendation

**Recommended folder: `docs/tranches/AB+2/`.**

Rationale:

1. **Precedent chain** — V → AB → AB+1 are the three prior shadow-cohort retrospective folders. The "+N" suffix convention is already established (`AB+1` extends `AB`). `AB+2` is the natural fourth element of the same series. The series identity is "post-hoc retrospective of shadow-executed cohort" — `AB+2` reads correctly as "the next shadow-cohort retrospective after AB+1."
2. **No commit-message attribution to honour** — unlike AB+1 (whose `b201b03` commit subject literally said `AB+1 substrate cohort`), this cohort's 6 untagged commits cite NO tranche identifier at all. K invariant 3's "folder name MUST match the cited identifier" clause therefore does NOT constrain the choice — there is no cited identifier. The orchestrator is free to pick the series-consistent name.
3. **Why NOT `P+1`** — `P+1` would imply a continuation of P's scope (P closed with zero residuals; this cohort is NOT P-scoped — it is independent feature work that happened to land post-P). The `+1` series belongs to `AB`, the canonical "shadow-cohort retrospective" anchor, not to the most-recent lettered tranche.
4. **Why NOT a fresh letter** — Q is the next live tranche letter and is already claimed. A fresh letter (e.g. `R`) would mis-signal that this is a planned forward tranche rather than a backward-looking retrospective. The retrospective is explicitly reverse-engineered post-hoc; the `AB+N` namespace is the canonical signal for that.
5. **Caveat — `949474a`** — commit 1 has its own external home (speedtest `AD.W4.T2`). The `AB+2` retrospective should document `949474a` as an externally-attributed cross-repo landing (a cross-reference, not a reverse-engineered sub-wave), and reverse-engineer sub-waves only for the 6 untagged commits (T2 + T3). The `AB+2/coordination/` doc cross-links speedtest AD.

**`AB+2` retrospective folder shape** (per SPEC.md §"Retrospective Discipline"):
- `AB+2.md` — thesis + inherited-invariants (29 at P close) + reverse-engineered wave schedule (T1 external / T2 / T3).
- `FINAL.md` — source-commit citations + the no-tag-accrued fact + retroactive close.
- `PROGRESS.md` — reverse-engineered per commit author-date (the 7 rows of §3.1).
- `coordination/CONSTELLATION.md` — speedtest-AD cross-link for `949474a`.
- `waves/W{1,2,3}.md` — per the T1/T2/T3 clustering (optional per SPEC; recommended here because T2 is the breakage prime-suspect and warrants a dedicated spec).

This folder authoring is a Q W0 HEADLINE lane (analog of P.W0 Lane A).

### §3.4 — Invariant-29-recurrence-after-codification (the headline fact)

Invariant 29 ("AB+1 retrospective discipline") was codified at P.W6 close in the precept submodule (`3310a8c`, 2026-05-16). The post-P shadow cohort's commits 2-7 landed 2026-05-17 → 2026-05-18 — i.e. **the 4th K-invariant-3 recurrence happened 1-2 days AFTER the invariant meant to prevent it was codified.**

This is a material finding for the Q tranche, not a footnote:

- **The codification is necessary-but-not-sufficient.** Invariant 29 added SPEC.md prose + a close-ceremony ι-sweep check (`git log --since=<close>` for orphan commits). But the prose binds the *absorbing tranche to author a retrospective*; it does NOT bind the *moment-of-execution* to open a folder. The exact same gap LL 2026-05-16 ("AB+1 Retrospective Discipline Codified") diagnosed for the AB+1 cohort ("discipline at the moment-of-execution is the missing piece") reproduced one tranche later.
- **Pattern parallel to the stash anti-pattern.** The `git stash` anti-pattern took 7 prose recurrences before P.W2 escalated to a tooling-side fail-closed script (`audit-stash-list.mjs`). The shadow-execution anti-pattern is now at recurrence 4 with prose-only enforcement (invariant 3 + invariant 29). The Q tranche must determine WHY prose failed again and whether the canonical next escalation — a tooling-side gate — is warranted.
- **Q must diagnose the WHY, not just author the folder.** Authoring `AB+2/` closes the loop retroactively (same as AB+1). But if Q stops there, recurrence 5 is near-certain. The Q-postP wave should pair the retrospective with a *root-cause* analysis: why did 6 untagged feature commits land direct-to-master between two tranche closes? Candidate causes — (a) operational momentum ("just one quick fix" between tranches), (b) no pre-commit/pre-push hook checking commit-message tranche attribution, (c) the close ceremony's `git log --since` orphan-sweep runs at the NEXT open, far too late to prevent the commits. A tooling-side escalation candidate: a `commit-msg` or `pre-push` git hook that fails closed when a commit is not attributed to an open `docs/tranches/<LETTER>/` folder (with a documented bypass for retrospective/explicitly-authorized work).

## §4 — Chronic-defer audit (P-archived items re-examined)

P retired the PERMANENT-DEFER classification and archived 3 PD items + 6 other items. Re-examination against HEAD + the Q-open consumer-breakage report:

| Archived item | P disposition | Q re-examination verdict |
|---|---|---|
| **PD-1 vue-passive-listeners** | ARCHIVED-PERMANENT (platform-API-level) | **HOLDS.** Vue-runtime-level; no glass-ui substrate gap. Not re-opened by the consumer breakage (the breakage is dock/animation/dropdown/glass-card visual, not listener-passivity). |
| **PD-2 cache-ttl** | ARCHIVED-PERMANENT (no glass-ui caching substrate) | **HOLDS.** No caching substrate exists by design. Not breakage-relevant. |
| **PD-3 value.js WIP-branch LAND** | ARCHIVED-PERMANENT (user-authorization-required LAND not requested) | **RE-OPENED.** The Q-open report names value.js as "totally broken." The P archive doc itself states P.W5 landed CR-1 + CR-4 on the value.js **WIP branch** (`755b3cd`, NOT pushed) while P.W5 Lane A.2-A.4 closed master-vs-glass-ui-v1.8.2 consistency. So value.js now has a **WIP-vs-master split** — P's writes landed on WIP, master got a separate consistency pass. The Q breakage audit MUST determine: is value.js broken on WIP (where P wrote) or master, and is the split itself the breakage. PD-3's "the WIP-vs-master delta is the user's reconciliation work" disposition is no longer tenable when the user reports the consumer broken — the delta is now a live concern, not deferred user-discretion work. **Q-wave: fold into the Qα breakage-forensics lane.** |
| **π visual-runtime-tooling** | ARCHIVED-PERMANENT (3rd consecutive MCP tooling unreachable) | **RE-ACTIVATED.** Playwright MCP (`mcp__plugin_playwright_playwright__*`) is available at Q open. The lane was archived purely for tooling-unavailability — that condition no longer holds. The "PERMANENT" label was always conditional on tooling; the condition changed. **Q-wave: the π/Qζ visual-runtime lane is BINDING and is the canonical breakage-forensics instrument** (load demo + consumer apps; screenshot dock/animations/dropdowns/glass-cards across ≥ 3 viewports). |
| `use-popup-mutex.md` | ARCHIVED-CONSUMER-PRIVATE | HOLDS — value.js-internal; never on glass-ui surface. (But verify in Qα that the breakage is not in usePopupMutex-adjacent dropdown code.) |
| `idle-bob.md` | ARCHIVED-CONSUMER-PRIVATE | HOLDS — keyframes.js-internal. (Verify in Qα that keyframes.js animation breakage is not idle-bob-adjacent.) |
| `keyframes-overfitting.md` | ARCHIVED-CONSUMER-ORCHESTRATOR-OWNED | HOLDS as a classification, but keyframes.js is named broken — Qα re-audits keyframes.js functional state regardless of the overfitting-archive. |
| `bbnf-buddy-53-findings.md` | ARCHIVED-CONSUMER-SIDE-CARRY | HOLDS — bbnf-buddy-internal; not named in the breakage report. |
| `words-frontend-substrate-pending.md` | MIXED (E.3 ADDRESSED + E.4/E.5 ARCHIVED) | HOLDS — words/frontend not named broken. E.4/E.5 are consumer-design-pending, not glass-ui gaps. |

**Chronic-defer verdict**: 2 of 9 P-archived items RE-OPEN at Q — **PD-3 (value.js WIP-branch)** because the user reports value.js broken, and **π visual-runtime** because Playwright is now available. The other 7 archive dispositions hold. Both re-opened items fold into Q waves (PD-3 → Qα breakage forensics; π → Qζ visual-runtime probe), consistent with the inheritance ledger already in Q/findings.md §4 (Q-break + Q-π-tooling).

## §5 — P close-honesty spot-verification (5 of 38 items)

P FINAL.md declared "zero P-residuals." Spot-check of 5 dispositioned items against HEAD `d244dd5`:

| # | P item | P disposition | HEAD verification | Verdict |
|---|---|---|---|---|
| 1 | Pε-2 heap-bump bake | "baked into `package.json.scripts.build` (Path B)" | `package.json:358` — `"build": "NODE_OPTIONS=--max-old-space-size=8192 vite build"`; CLAUDE.md §Build documents the bake as canonical baseline. | **HONEST** |
| 2 | Pε-1 / P-AB1-tag v1.7.0 tag | "gate matrix ran clean; tag placed" | `git tag` shows v1.7.0 + v1.7.1 + v1.7.2 + v1.8.0 + v1.8.1 + v1.8.2 + v1.8.3 + v1.8.4 — full P cadence present. | **HONEST** |
| 3 | PD-1 + PD-2 formal-archive | "archived at `docs/tranches/P/archive/`" | `docs/tranches/P/archive/` contains all 9 docs (`vue-passive-listeners.md`, `cache-ttl.md`, `value-js-wip-branch.md`, + 6 more). | **HONEST** |
| 4 | Pε-4 tailwind-merge cruft retire | "tailwind-merge cruft retired" (W4 Lane C) | `proof-package.mjs` still contains the string `tailwind-merge` 2× — BUT both are *intentional comment text* (lines 113/116: "P.W4 Lane C (Pε-4): `tailwind-merge` retired at v0.9.2; verifies consumers DON'T need `tailwind-merge`"). The gate verifies its ABSENCE; the cruft (an actual dependency/import) is gone. | **HONEST** (the 2 string hits are the gate's own assertion, not residual cruft) |
| 5 | Invariants 28 + 29 codification | "precept submodule advanced; invariants 28-29 codified" | `tranche/SPEC.md` has a `## Retrospective Discipline` section with invariant-29 verbatim; LESSONS-LEARNED.md has the 3 P-close entries (2026-05-16 zero-deferral + 2026-05-16 AB+1 retrospective + 2026-05-16 stash 6th/7th). | **HONEST** |
| (bonus) | `949474a` freshness retire | (not a P item — post-P) | `src/freshness.ts` absent; `package.json` has no `freshness` string — `/freshness` subpath fully retired, consistent with CLAUDE.md's "retired at AD.W4 (Decision 5)" note. | confirms post-P cohort landed cleanly |

**P close-honesty verdict**: All 5 spot-checks PASS. P FINAL.md's "zero P-residuals" declaration is HONEST — no mis-declared item found in the sample. The `tailwind-merge` string-hit (#4) is a false-alarm-looking case that resolves to honest on inspection. P's close ceremony was accurate; the carry-INTO-Q is genuinely the post-P shadow cohort + the 2 re-opened archives, not P-residual concealment.

## §6 — Recommended Q-wave schedule proposal (inheritance ledger → wave assignment; zero deferral)

Q inherits P invariant 28 (zero deferral). Every item below lands in a Q wave; none exits Q-close as a residual. This is a RECOMMENDATION for the Q orchestrator's synthesis — final wave numbering decided post round-2.

| Q ledger item | Source | Recommended Q wave |
|---|---|---|
| **Q-postP retrospective** — author `docs/tranches/AB+2/` (per §3.3) for the 7-commit shadow cohort | 4th K-invariant-3 recurrence | **Q W0 HEADLINE Lane A** — retrospective folder (T1 external / T2 / T3 sub-waves) + source-commit ledger; analog of P.W0 Lane A. |
| **Q-postP root-cause** — diagnose WHY invariant 29 failed; propose tooling-side escalation (commit-msg / pre-push hook) | invariant-29-recurrence-after-codification (§3.4) | **Q W0 HEADLINE Lane B** — root-cause doc + tooling-escalation proposal; codify a new invariant at Q close (analog of the stash-script escalation at P.W2). |
| **Q-break** — consumer functional regression (dock/animations/dropdowns/glass-cards at value.js + keyframes.js) | Q-open user report | **Q W1 HEADLINE** — breakage forensics (Qα + Qζ output) → substrate remediation. The T2 sub-wave (dock.css ×2 + timeline) is prime suspect; remediation wave sized to fix the substrate AND re-write the affected consumers. |
| **PD-3 re-opened** — value.js WIP-vs-master split; P wrote to WIP, master got a separate pass | §4 chronic-defer re-examination | **Folds into Q W1** — the Qα breakage lane resolves the WIP-vs-master split as part of the value.js forensics. |
| **Q-π-tooling re-activated** — visual-runtime probe is BINDING (Playwright available) | §4 chronic-defer re-examination | **Q round-1 Qζ lane (already dispatched) + Q W1 input** — the visual evidence feeds the breakage-remediation wave; π is no longer a deferred lane. |
| **Q9 core-feature cohesion** — dock / glass-card / dropdown / animation co-location + cascade audit | Q-open directive | **Q W2** — substrate-cohesion remediation (the breakage is a symptom; this wave reaches the cohesion gap). Consumes Qβ + Qγ round-1 output. |
| **Q-css-headroom** — CSS gzip budget headroom thin (9.8% at P close) | P.W6 ε flag | **Q W2 or W3** — rebaseline OR reduction; if W2's cohesion work adds CSS, rebaseline is forced — fold into the same wave. |
| **Qδ legacy/workaround sweep (post-P)** findings | Q round-1 Qδ lane | **Q W3** — absorb any new legacy/workaround the post-P cohort introduced. |
| **Q close** — full audit (round-1 strengthened + round-2 consumer re-audit) + `AB+2` FINAL.md + Q FINAL.md + invariant codification + zero-Q-residuals declaration | inherited P invariant 28 | **Q W-close** — 13-lane audit ceremony; invariant for the shadow-execution tooling escalation codified; zero deferral verified. |

**Critical-path note**: Q W0 (retrospective + root-cause) → W1 (breakage remediation) → W2 (cohesion) → W3 (legacy sweep + budget) → W-close. The breakage wave (W1) is the HEADLINE and depends on round-1 Qα/Qζ + round-2 consumer audit returning first; the Q orchestrator should hold W1 spec authoring until both rounds land.

## §7 — Status

Qε round-1 lane: **COMPLETE.**

Findings summary:

1. **Full-prompt recap (K → Q)** — every prompt K → P ADDRESSED at HEAD; the post-P shadow cohort is the lone UNADDRESSED prompt-equivalent (no user prompt; shadow-execution); the Q-open directive is THIS tranche. The Q directive is near-verbatim the P directive plus a new CONSUMER-FUNCTIONAL-REGRESSION headline.
2. **Post-P shadow cohort** — 7 commits `9f774b4..HEAD`, 3 sub-waves (T1 external/speedtest-AD `949474a` + T2 dock/timeline + T3 metric/table); recommended retrospective folder **`docs/tranches/AB+2/`** (series-consistent with V → AB → AB+1; no commit-message identifier to honour). Cohort accrued NO release tag. The 4th K-invariant-3 recurrence — and it happened 1-2 days AFTER invariant 29 was codified, proving the codification is necessary-but-not-sufficient; Q must diagnose WHY and escalate to a tooling-side gate.
3. **Chronic-defer audit** — 7 of 9 P-archive dispositions HOLD; **2 RE-OPEN** — PD-3 (value.js WIP-vs-master split; user reports value.js broken) and π visual-runtime (Playwright now available). Both fold into Q waves.
4. **P close-honesty** — 5-item spot-check all PASS; "zero P-residuals" declaration is HONEST; no mis-declaration found.
5. **Q-wave schedule** — proposed 5-wave shape (W0 retrospective+root-cause / W1 breakage HEADLINE / W2 cohesion / W3 legacy+budget / W-close); zero deferral; every inheritance-ledger item assigned.

**Headline for the Q orchestrator**: the post-P shadow cohort is BOTH the 4th K-invariant-3 recurrence AND the prime suspect for the consumer breakage (T2 = dock.css ×2 + timeline geometry rewrite, landing untagged direct-to-master). The retrospective and the breakage forensics are the same investigation viewed from two angles. Q's headline obligation beyond authoring `AB+2/` is to determine why prose-only invariant-29 enforcement failed within days of codification — and escalate accordingly.

No source mutations performed. No mutating git performed. Read-only audit complete.
