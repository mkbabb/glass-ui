# AS.W0 — Lens 3: PROMPT COMPLETENESS (the full-arc request ledger)

Recap of EVERY user request across the modern-web constellation arc, each verified against on-disk
reality (git logs + workflows + live deploy probes across all constellation repos), 2026-06-02.

**Verdict in one line:** glass-ui's own arm is the ONLY one that crossed the dev→impl boundary
(AR.W2 shipped 3.1.1, ci.yml green). The rest of the constellation is **authored-but-not-executed** —
the n+1 tranches per repo (value.js J, fourier J, keyframes A, words A, muster K) are docs commits
("author X" + "WAVE C frontend-design refinement"), the deploys are 2-of-5 live, and the headline
claims "fully working CI / fully deployed constellation / perfected libraries" are aspirational, not met.

## Request ledger

| # | Request | Status | Evidence (file:line / probe) | Gap |
|---|---|---|---|---|
| 1 | Orchestrate the tranche set to completion IN TOTALITY incl. NPM publish + commit + push (master workflow) | **PARTIAL** | glass-ui AR.W2 DONE — `36fb348`/`779fed7`/`ed2add9` (3.1.1 cut); `ci.yml` GREEN (run 26849704298, node 24). But the publish was LOCAL (release.yml on tag `v3.1.1` = `failure`, gh run 21:33Z); NPM_TOKEN user-domain. The other 6 repos' tranches are authored-only (rows 3/6) | Only 1 of 7 tranches executed; release CI still red on the tag; npm publish remains local-only |
| 2 | value.js, fourier, repo constellation, babb.dev links + "Deploy babb.dev, hold friday.institute" | **PARTIAL** | Live probe: fourier.babb.dev 200, keyframes.babb.dev 200, babb.dev 302→github.com/mkbabb; grammar/value/muster.babb.dev = **404**; slides.friday.institute = 000 (conn fail today, slides FINAL claims 200). friday.institute correctly HELD (speedtest SUM-1 freeze, no deploy commit) | 3 of the named babb.dev surfaces are NOT live (grammar/value/muster); babb.dev root is a bare GitHub redirect, not a constellation landing |
| 3a | DEEP audit, 6 agents, 6-wave modern-web pass | **DONE** | `AQ/audit/W0-modern-web-baseline.md` (49 findings, 6-agent workflow); A1-A6 slices under `docs/constellation/next/audit/`; the canonical 6-wave spine in `A6-cross-cutting.md §3` | — |
| 3b | review last 10 tranches per repo + n+1 tranche per repo + execution ordering + max parallelism | **DONE (as authoring)** | `NEXT-ROUND-EXECUTION-PLAN.md` §1 (7-tranche roster), §3 (the DAG + GATE I/II), §6 (critical path); each repo has its n+1 plan authored (`value.js/J`, `fourier/J`, `keyframes/A`, `words/A`, `muster/K`) | The plans EXIST; the execution does not (row 6) |
| 3c | 4 frontend-design agents per repo (WAVE-C) | **PARTIAL** | WAVE-C slices authored as docs across every repo: `<repo>/docs/tranches/<L>/design/WC-design-{typo-color,layout,motion,atmosphere-a11y}.md` (4 lenses, grounded file:line). glass-ui `8e31148 WAVE C bbnf-playground` | **Specs authored, NOT applied.** No repo has a WAVE-C src commit; `--font-display` decouple / `useStaggerReveal` page-reveal / 5-rung-ladder-over-cartoon-shim are all unconsumed |
| 3d | fourier + value.js CRUD APIs + remix/diffing/provenance (git-like atom-diff), KISS | **PARTIAL (asymmetric)** | value.js: `api/src/lib/crud/atomdiff.ts` + `routes/palettes/diff.ts` + `services/palette/diff.ts` EXIST on disk **but are UNTRACKED** (`git status: ?? atomdiff.ts`; never committed on any branch; master HEAD = `5558f8d docs author J`). fourier: `api/lib/crud` committed (`52bdcf5 B.W3`) but J.W2-W8 IMPL rows = **planned** (`fourier J/PROGRESS.md`) | value.js J FINAL claims "EXECUTED + GREEN" while the entire impl is an **uncommitted, unpushed working tree** — claim-vs-artefact gap; fourier J impl is unstarted |
| 4 | keyframes.js properly specified + precepts submodule synced across all | **PARTIAL** | keyframes A authored (`12f8282 author A`); BUT `build:lib` split (the M-CI prereq, NEXT-ROUND §2) = **MISSING** from `keyframes package.json` scripts. Precepts: every repo pins submodule at `63240e6`, but the precepts repo HEAD is `458c2d1` (2 commits AHEAD: "Harden orchestration", "Prune meta language"). glass-ui working tree shows dirty `m docs/precepts` | The precepts pin is STALE vs canonical; the "synced across all" claim is false at HEAD. keyframes CI-split unstarted |
| 5 | tranches per repo / execution ordering / separate sessions / how to prompt sessions | **DONE (as planning)** | `NEXT-ROUND-EXECUTION-PLAN.md` §3 (DAG), §6 (per-repo net + critical path); `A6 §5` (wave outline + ordering rationale). The dispatch discipline lives in precepts `instructions/tranche/` | Planning answered; no per-session dispatch was executed beyond glass-ui's own arm |
| 6 | (this session) "execute your arm" (AR.W2) + "fully working CI, fully deployed babb.dev constellation, perfected libraries" | **PARTIAL** | AR.W2 DONE (3.1.1, ci.yml green). "Fully working CI": glass-ui ci green BUT release.yml red on tag; fourier CI = **failure** (run 26831642909, deploy-pages skipped as a result); muster/words have NO workflows wired to a deploy. "Fully deployed": 2/5 babb.dev live. "Perfected libraries": AR.W3-W6 (3.2.0 leverage + AS-GU + native drawer) all PLANNED | The three headline goals are each 1-of-N met; "fully"/"perfected" overstate HEAD by a wide margin |
| 7 | Standing constraints: secrets never committed; never --no-verify; agents read-only git; Maps key server-side; publishes green-gated | **DONE (as discipline) / one TENSION** | No secret in any tracked tree (deploy uses HMAC + CF; NPM_TOKEN is a repo secret). Agent git clause holds (this audit is read-only). BUT "publishes green-gated" is in TENSION: 3.0.0/3.1.0/3.1.1 all published LOCALLY because release.yml is red — the green-gate is bypassed by the human publish path | The green-gated-publish invariant is not enforceable until M-CI lands a tag that publishes on a clean runner; Maps-key-server-side is a speedtest/muster concern, not re-verified here (out of glass-ui scope) |

## The two load-bearing silent-drops

1. **value.js J is claimed DONE but is an uncommitted working tree.** `value.js/docs/tranches/J/FINAL.md`
   asserts "the cohort CORE is **EXECUTED + GREEN**" and PROGRESS marks J.W2 GREEN — yet
   `git log --all -- api/src/lib/crud/atomdiff.ts` is EMPTY (never committed) and `git status` shows it
   `??` untracked. The 40-file working tree (11 untracked) is the sole home of the WAVE-D canonical
   substrate. fourier-J is gated on value.js-J's settled shape (`NEXT-ROUND §4: value.js J leads`), so the
   whole remix cohort is parked behind an unpushed tree. **This is the single highest-risk reconcile.**

2. **WAVE-C was authored at 4 lenses/repo but applied at ZERO sites.** Every repo carries the 4 design
   slices as docs; not one has a src commit consuming them. The plan's own framing
   (`NEXT-ROUND §5: most refinements REDUCE app code by reaching a glass-ui primitive already shipped`)
   means the value is unrealized until an impl wave consumes them — they are inert specs at HEAD.

## What is genuinely DONE (no gap)

- glass-ui AR.W2 — the dock `useId()` VT-name fix + `proof:vt-names` gate + pairwise-distinct unit +
  M-CI node-20→24 + registry-resolved lockfile; ci.yml green (run 26849704298). The binding-correctness
  floor shipped as 3.1.1. This is the arc's one fully-executed impl wave.
- The audit + planning corpus (A1-A6, the 7-tranche roster, the GATE I/II DAG, the 24 WAVE-C slices,
  the 6-wave spine) — comprehensive and coherent.
- fourier.babb.dev + keyframes.babb.dev live (200); friday.institute correctly held.

## Disposition for AS (inv-16 name-forward)

glass-ui's AS owns ONLY its repo-local debt (the AR.W3-W6 3.2.0 leverage fold is the glass-ui successor).
Everything cross-repo is NAMED-FORWARD to the owning repo's arm under inv-16 — AS records the ask, it
does not absorb the execution (agent git clause + writer-vs-reader boundary). The fold table is the
foldItems payload of this audit's structured return.
