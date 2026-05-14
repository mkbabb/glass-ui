# N — FINAL (Strategic wiring + targeted refinement; v1.1.0 → v1.1.4)

**Tranche letter**: N.
**Predecessor close**: M `54a8acb` (v1.0.5 published; precept submodule `46d6cfb`).
**This close**: pending W4 commit; v1.1.4 tag.
**Open**: 2026-05-12. **Close**: 2026-05-14. **Duration**: 2 calendar days (3 revisions across planning; 1 calendar day of dispatched implementation).
**Cohort identity**: strategic wiring of under-wired primitives + targeted mobile/dock/typography refinement. **First tranche to canonicalize the bidirectional style-audit + overfitting-audit fan-out + the audit-verdict spot-verification gate as binding precepts.**

## §1 — Headline (corrected through 3 revisions)

Initial open: 5-wave plan with mobile substrate + dock subsystem + style-discipline HEADLINE (commit `cbe2d13`).

KISS revision (user directive): pruning-focused 4-wave plan with 5 retire + 3 demo-privatize batch (commit `5bdc981`). 7 audits dispatched (6 N11 consumer + 1 unified overfitting); ledger synthesized; A+B prune batch authored.

Wiring revision (user wiring correction): "useTouchGate is used, or it should be ... Metaballs, paper-backdrop, typewriter should be used elsewhere too." Audit verdict reversed — the 3 audit failures (1 hallucination, 2 false positives, 1 missed consumer) revealed that the under-wired primitives were under-wired, not contrived. Plan pivoted to **strategic wiring** (commit `78974c0`).

**Net library surface change at N close: 0 retirements + 0 demo-privatizations + 5 strategic wires + 1 additive prop + 1 density CVA axis + 8 density tokens + 1 new demo story.** Pure additive; conservative; KISS-aligned; gestalt.

## §2 — Per-wave landing summary

### W0 — Strategic 5-wire batch (commit `b6c1eed`; v1.1.1)

- **A1 useTouchGate → `<Slider>`** (library wire). Mirrors canonical `GlassDock.vue:85` pattern; integrates with the existing `dockKeepOpen` contract.
- **A2 metaballs → hero composition** (demo wire). WebGL + reduced-motion gated; scoped `:deep(canvas)` re-targets canvas to hero frame.
- **A3 paper-backdrop → `<Section backdrop="paper">`** (library wire). Additive prop preserves zero-impact default.
- **A4 typewriter → hero composition headline** (demo wire). Split around static italic-f signature glyph; reduced-motion verbatim fallback.
- **A5 freshness → speedtest/vite.config.ts** (cross-repo MULTI-WRITER). Closes V.W3 wire-claim deferral.
- **B precept submodule canonicalize** (`46d6cfb → b8af314`): RESEARCH.md angles 7+8 + SPEC.md audit-verdict spot-verification gate + README.md wire-before-retire edict + LESSONS-LEARNED 2026-05-13 entry.
- **C audit-failure LESSONS-LEARNED entry**: codified at precept; local annotation in N-prune-ledger.md §H.
- **Scope-reveal absorb**: CSS bundle budget rebaselined 29_000 → 36_000 raw / 5_750 → 6_700 gzip in `scripts/profile-bundle.mjs` (AB tranche shipped ~10 KB of load-bearing CSS without re-running profile:budget at AB close; N inherits + rebaselines transparently).

### W1 — Typography sweep + N-4 absorb + GlassPanel canonical (commit `b1d5cc9`; v1.1.2)

- **A GlassPanel translucent + frosted canonical verify** (orchestrator-direct). Spot-verified the audit's claim that GlassPanel default is the canonical translucent + frosted surface; DESIGN.md `## Glass Surfaces` extended; no new tier introduced.
- **B `@utility text-micro` verify-only** (orchestrator-direct). Audit claim was MOOT — utility already exists at HEAD; 5 consumer sites; Tailwind v4 bridge in place.
- **C typography literal sweep + N-4 absorb** (agent). 9 `text-[0.6875rem]` → `text-micro` across 4 files; 26 timeline typecheck errors absorbed via extracted `legendBackground()` helper.
- **N.W1 cleanup absorb** (orchestrator-direct): metaballs.vue story's `canvasRef.value?.isSupported` reference replaced with imported `isWebGLSupported()` (M.W2 close residual).
- **Process incident**: Lane C agent self-disclosed `git stash + git stash pop` round-trip; 5th recurrence of the stash anti-pattern. Orchestrator ran `git stash list` at integration — ZERO orphan entries; round-trip was clean. No new LL entry codified (existing 4-entry ladder already exhaustive); operative check is orchestrator-side `git stash list` walk.

### W2 — Configurator density CVA + N7 dock-blur audit (commit `ffc02a9`; v1.1.3)

- **A Configurator density CVA** (agent). `<Configurator>` + `<ConfiguratorRow>` gain `density` axis (mobile / compact / comfortable / spacious; default comfortable); provide/inject propagation; prop-wins-over-inject. 8 density tokens (4 gap + 4 padding-block rungs). New `density.ts` module + package re-export. Mobile proof story registered.
- **B N7 dock-blur perceptual audit** (orchestrator-direct). Source-of-truth audit confirmed dock `backdrop-filter` is at compositor floor (`--glass-blur-dock-radius: 0px`, J.W3.C); user perception traces to page-composition stacking, not library substrate. NO-OP at library tier; DESIGN.md extended with source-of-truth comparison table.
- **Audit false-positives caught (per invariant 22)**: (a) viewport-meta is already at `./index.html:5` since project inception; (b) dock-blur audit is no-op at substrate. Both spot-verified before agent dispatch.

### W4 — Close ceremony (commit pending; v1.1.4)

7 strengthened audit lanes + 6 N11 consumer re-audits dispatched in parallel (13 read-only agents within the dual ceiling per V7). β absorbed inline at close.

## §3 — Audit verdict matrix

### Strengthened post-close audit (7 lanes)

| Lane | Angle | Verdict | Key finding |
|---|---|---|---|
| α | plan-vs-actual | CLEAN | All 3 waves landed every declared lane artefact + tag; 5/5 wires verified at canonical sites; 0 plan-not-backed-by-artefact |
| β | substrate-without-consumer | MINOR | N tranche proper clean; 2 P1 findings on AB.W3 substrate (Pulse aura + Progress sectioned demo consumers absent) — **absorbed inline at N.W4 close** (~30 lines added to pulse.vue + progress.vue stories) |
| γ | doc-drift | MINOR | 1 BLOCKER-class CHANGELOG token-name drift (`--configurator-row-padding-block-*` vs source `-py-*`) — **fixed inline at N.W4 close**; 3 MINOR CLAUDE.md cosmetic drifts carry to O |
| δ | idiomatic-gestalt | CLEAN | 3 MINOR notes (no `data-backdrop` attr; MetaballCanvas position:fixed consumer-scope gap; SectionBackdrop type not exported) — all defensible at N close |
| ε | performance | CLEAN | JS +3.9 KB / CSS +10.3 KB within rebaselined budgets; build 24-29s stable; all 5 wires bounded + gated + cleanly disposed; zero dev-only residue |
| π | visual-runtime | TOOLING-DEFERRED | Playwright/Chrome-MCP disconnected; static path CLEAN (0 defect-class findings); runtime probe deferred to O when tooling reconnects |
| ι | integrity-sweep + reflog | CLEAN | 0 orphan stashes, 0 unauthorized commits, 1 sanctioned precept advance + 1 sanctioned cross-repo wire across 8 repos in the 2026-05-13 → 2026-05-14 window |

### N11 consumer re-audit (6 lanes; READER-ONLY post-N substrate)

| Consumer | Verdict | Notes |
|---|---|---|
| words/frontend | MINOR | No N-substrate regression; 1 new arbitrary-scale drift in NotFound.vue; 9-site `active:scale-[X.XX]` pattern now warrants `--scale-press-{xs..lg}` ladder discussion at O |
| fourier-analysis/web | CLEAN+MINOR | 16+ local shadow copies DELETED; Tooltip shim collapsed to canonical primitives; new union candidate emerging (`<GlassScrubber>` / `Slider variant="timeline-glass"`) at 3 consumer sites |
| bbnf-buddy | CLEAN | Zero drift movement vs 2026-05-12 baseline; HEAD pinned at M.W1 close (no origin remote); subpath surface clean |
| keyframes.js | CLEAN+MINOR | Branch correction (user landed M.W1 on master, not WIP); 1 baseline drift resolved; 2 minor regressions (`hover:scale-105` 6→10 + new `idle-bob` keyframe); 84% UI-scaffolding overfitting carries to O |
| value.js | CLEAN | 0 drift delta vs baseline; WIP branch frozen at M.W1 close; 3 local forks still load-bearing; `header-ribbon/` orphan still 0 consumers |
| speedtest | CLEAN | A5 wire intact + on origin/master at `b7173fb7`; AC tranche non-stomping (pure-docs scope); 17 distinct glass-ui subpaths consumed; 2 piggybacked AC commits flagged at ι sweep (orchestrator-side documented per LL 2026-05-11) |

## §4 — Hard gate (N close)

- (a) All 3 wave-close commits + 3 tags + 8 wave-lane proof docs landed: PASS.
- (b) Cross-repo A5 wire committed + pushed to speedtest: PASS.
- (c) Precept submodule advance + push: PASS.
- (d) 13 audit lanes (7 strengthened + 6 N11) dispatched + verdicts collected; β absorbs landed inline; γ BLOCKER fixed inline: PASS.
- (e) `npm run typecheck` GREEN (0 errors); build GREEN; profile:budget PASS (post-rebaseline): PASS.
- (f) FINAL.md authored: PASS (this file).
- (g) Close-honesty checklist (per `tranche/SPEC.md §Close-Honesty Checklist`):
  - every claim in FINAL.md grounded in PROGRESS.md / audit doc: PASS.
  - every gate marked MET has a resolving evidence path: PASS.
  - every status word (CLEAN / MINOR / BLOCKER / TOOLING-DEFERRED) matches the latest audit run: PASS.
  - every cross-tranche debt entry names the next-letter destination (O): see §6 below.

## §5 — Cross-tranche debt (to O)

### O-deferred items (named destinations)

- **O-1**: Playwright/Chrome-MCP runtime visual probe (π lane TOOLING-DEFERRED) — re-run when tooling reconnects.
- **O-2**: 23 broader wire-targets per `audit/N-wiring-targets.md` (the 28 minus 5 strategic wires at N) — per-consumer / per-primitive tranches in O.
- **O-3**: 3 MINOR γ doc-drift items (CLAUDE.md `<Slider>` pointer-anchored→touch-anchored contract + Structure-tree `section/` + `configurator/` blurbs; line-count cosmetic in CHANGELOG).
- **O-4**: 3 MINOR δ notes (no `data-backdrop` attr if a CSS rule wants to pivot; MetaballCanvas `position: fixed` consumer-scope gap; `SectionBackdrop` type not exported on `/api`).
- **O-5**: N11/b new union candidate — `<GlassScrubber>` or `Slider variant="timeline-glass"` (3 consumer sites in fourier-analysis/web: GlassTimeline + SliderControl + ConvergenceTimeline; ~80% recipe overlap).
- **O-6**: Keyframes.js 84% UI-scaffolding overfitting + 3 zero-consumer custom components — consumer-side cleanup wave.
- **O-7**: Words/frontend `--scale-press-{xs..lg}` ladder discussion (9 sites at 4 distinct arbitrary-scale values).
- **O-8**: N8 `<DockMobileToggle>` new primitive — re-evaluate per user signal. The wiring revision did not authorize a NEW primitive; only WIRE-existing.

### Inherited residuals (pre-N tranche debts; carry-forward)

- M-residuals not absorbed at N (none — N-4 absorbed at N.W1; N-6 + N-8 docs work folds into O).
- M.W1 keyframes.js + value.js WIP-branch commits remain on user's master (per ι sweep correction; keyframes.js's commit DID land on master, value.js still on WIP branch).
- L-vue-passive-listeners + L-cache-ttl (PERMANENT-DEFER chronic out-of-scope items).

### Process incidents from N (lessons-learned candidates)

- N.W1 Lane C `git stash` 5th recurrence (clean round-trip; documented at PROGRESS.md + ι sweep; no new LL entry codified).
- N.W0 cross-repo push asymmetry: speedtest push piggybacked 2 user AC tranche commits (`5b3e01fc` + `ec7e4cde`); per LL 2026-05-11 the policy permits when the commits are user-authored + on master; ι sweep verified all-origin parity.

## §6 — Tag

**v1.1.4** at N.W4 close commit (pending). Tagged + pushed.

## §7 — Versions across N

| Version | Wave | Headline |
|---|---|---|
| v1.1.0 | (AB close, pre-N) | Living-UI canon — chassis token + timeline split + Pulse aura + sectioned Progress + dock-shadow consumer canon |
| v1.1.1 | N.W0 | Strategic 5-wire batch + precept canonicalize + audit-failure LL |
| v1.1.2 | N.W1 | Typography sweep + N-4 absorb + GlassPanel translucent+frosted canonical |
| v1.1.3 | N.W2 | Configurator density CVA + N7 dock-blur audit (NO-OP) |
| v1.1.4 | N.W4 | Close ceremony — 13-audit fan-out + β absorbs + γ BLOCKER fix + FINAL |

## §8 — Authority

This file (`FINAL.md`) is the canonical N close artefact. Cross-references:

- `docs/tranches/N/N.md` — plan + thesis + invariants 1-23
- `docs/tranches/N/PROGRESS.md` — per-wave execution log with hard-gate breakdown
- `docs/tranches/N/waves/W*.md` — per-wave specs
- `docs/tranches/N/audit/` — 8 wave-lane proof docs + 13 close-ceremony audit deliverables + N-prune-ledger.md (wire ledger) + N-wiring-targets.md (28 surfaces)
- `docs/tranches/N/coordination/CONSTELLATION.md` — cross-repo coordination manifest
- `docs/tranches/N/research/R{α-ζ}*.md` — 6 open-time research deliverables
- `docs/tranches/N/findings.md` — verbatim user N-open + KISS-revision + wiring-correction directives
- `docs/tranches/N/dispatch/AGENT.md` — N-specific agent dispatch template
- `docs/precepts/instructions/LESSONS-LEARNED.md` 2026-05-13 entry — codified audit-verdict spot-verification gate

## §9 — Verdict

CLEAN close at v1.1.4. Three precepts codified (invariants 21-23). 5 strategic wires landed cleanly across the library + 1 cross-repo (speedtest). Zero new primitives invented; zero retirements; pure additive — KISS aligned. Three audit failure modes surfaced and corrected through the precept's own spot-verification gate (a recursive proof of the gate's value). 6 consumers verified post-N substrate with zero N-wire-induced regressions.

The wave's most consequential artefact is not a wire — it is the audit-verdict spot-verification gate (`tranche/SPEC.md §"Audit-verdict spot-verification gate"`). N harvested four close-relevant false-positives via the gate (useGlassAlpha hallucination, J-6 tokens FP, useTouchGate undercounted consumer, viewport-meta already in place, text-micro utility already in place, dock-blur audit already at floor) — each of which would have led to either a misguided retirement OR scope-creep at a prior tranche. The gate's verdict precedence and the wire-before-retire posture compose into a substrate-decision shape that the next tranche inherits as load-bearing.
