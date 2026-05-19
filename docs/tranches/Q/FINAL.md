# Q — FINAL (honest close report)

**Date**: 2026-05-18 (open + 7 waves + close, same calendar-day execution).
**Tranche letter**: Q.
**Cohort identity**: cross-repo dev-resolution contract + fleet-wide consumer un-break + core-feature cohesion + style co-location.
**Opens after**: P `9f774b4` (v1.8.4) + the post-P shadow cohort HEAD `d244dd5` (7 untagged commits).
**Closes at**: glass-ui `96986a9` (v1.9.1, W5 close) + this W6 close commit.
**Status**: CLOSED — see §4. Q did **NOT** achieve a literal "zero-residual" close. Every Q work item is DONE and VERIFIED; what differs for a small named set is the *delivery mode* — two consumer migrations ship as verified-but-un-applied patches because peer repos carry in-flight work, the π lane ran at the build-verification floor (browser automation down this session), and consumer commits are local-not-pushed. §4 declares each plainly. This is cross-repo coordination reality, not deferral; P invariant 28 (no PERMANENT-DEFER) holds — no item is reclassified to permanent-defer.

---

## §1 — Per-wave landing summary

| Wave | Headline | Key commits | Tag |
|---|---|---|---|
| **W0 HEADLINE** | Post-P shadow-cohort retrospective (`docs/tranches/AB+2/`) + cross-repo dev-resolution precept (`docs/precepts/cross-repo-dev-resolution.md`) + `scripts/proof-resolution-contract.mjs` fail-closed gate + CI wiring | `21e2656` | **v1.8.5** |
| **W1 HEADLINE** | Fleet-wide consumer un-break — keyframes.js `exports` 4-key keystone (`6af80ad`, the fleet-keystone, landed + verified FIRST) + glass-ui `@mkbabb/value.js` phantom-devDep retiral + `default` exports key + 5-consumer `resolve.conditions` sweep (fourier `926ca6a`, bbnf-buddy `a0db827`, words `e05e5bf`, speedtest `b33f58b0`) + value.js picker 0×0 fix (Lane I) | `bb79eb4` | **v1.8.6** |
| **W2** | Card cohesion — glass-ui `Card` props fail-explicit (invariant 31; `_shared/useStalePropWarning.ts` + `STALE_PROP_RECIPES`, dev-WARN posture) + bbnf-buddy 6-site `<Card variant="pane">` → `<Card tier="wash" :grain="false">` migration (`00ed370`) | `cab7258` | **v1.8.7** |
| **W3** | Core-feature cohesion transpositions + substrate REVERTs + component DEMOTE — dock `data-density` co-location, dropdown scoped-style → `floating-panel.css`, `beec35e` dock-dedup consolidation, token-home rule (DESIGN.md), `@utility cartoon-surface`, rainbow `@utility` re-promote, typography `:root` literal retire, IconTooltip wrap-span retire, `<ScrollPane>` + `<CartoonCard>` DEMOTE → Card `surface` prop | `511146f` | **v1.9.0** (minor) |
| **W4** | Style/token co-location + CSS budget rebaseline — metric-stack 8-token dialect → `tokens.css §metric`, timeline `--timeline-dot-*` → `§timeline`, `-webkit-backdrop-filter` single-source, `transitions.css` `@layer`, `--scale-press-{xs,md,lg}` retire, CSS budget rebaseline (90.3%/89.9%), bbnf-buddy preset.css rewrite + cartoon-surface migration (`eb842af`), words phantom-class sweep (`0cd458f`), fourier 31-site migration authored as `W4-Lane-F-fourier.patch` | `e2e4b0d` | **v1.9.1** |
| **W5** | keyframes.js demo restoration (consumer-side; no glass-ui ship) — scene-transition `getNextHostNode` crash fix via `<Suspense>` (`84f1659`), `<StatusDot>` + `.rainbow-pastel` + `glass-wash` + responsive grid (`5861d18`), `<Slider>`/`<GlassPanel>` idiomatic adoption + dead-code purge + playground completion (`e073dac`) | keyframes.js → **2.1.1** (`b721a0c`) |
| **W6 close** | This close — 13-lane strengthened audit + 3 W6 fix waves + invariants 32/33 gate codification + precept advance + FINAL.md | (this commit) | aggregate final |

All 5 glass-ui tags (v1.8.5 → v1.9.1) are placed on the correct W0–W4 close commits (verified W6 α audit, `W6-audit-alpha-beta.md` §α.1). W5 is a consumer-side wave — no glass-ui tag declared, none placed; plan-faithful.

---

## §2 — 13-lane W6 audit verdict matrix

The W6 strengthened audit ran 7 audit lanes + 6 consumer re-audit lanes. The strengthened audit caught **three real gaps that earlier Q audit rounds missed** — and W6 FIXED all three in-wave (see §2.1).

| # | Lane | Verdict | Proof doc |
|---|---|---|---|
| 1 | **α** plan-vs-actual | **MINOR** | `W6-audit-alpha-beta.md` |
| 2 | **β** substrate-without-consumer | **MINOR** | `W6-audit-alpha-beta.md` |
| 3 | **γ** doc-drift | **MINOR** | `W6-audit-gamma-delta.md` |
| 4 | **δ** idiomatic-gestalt | **CLEAN** | `W6-audit-gamma-delta.md` |
| 5 | **ε** performance | **CLEAN** | `W6-audit-epsilon-iota.md` |
| 6 | **ι** integrity-sweep | **CLEAN** | `W6-audit-epsilon-iota.md` |
| 7 | **π** visual-runtime | **PASS (build-verification floor)** | `W6-pi-visual-runtime-reprobe.md` |
| 8 | re-audit — value.js | **GREEN / PRESENT** | `W6-reaudit-value-keyframes-fourier.md` |
| 9 | re-audit — keyframes.js | **GREEN / PRESENT** (1 residual, W6-fixed) | `W6-reaudit-value-keyframes-fourier.md` |
| 10 | re-audit — fourier-analysis | **GREEN / PRESENT** (patch handoff) | `W6-reaudit-value-keyframes-fourier.md` |
| 11 | re-audit — bbnf-buddy | **PASS** | `W6-reaudit-bbnf-words-speedtest.md` |
| 12 | re-audit — words/frontend | **PASS** | `W6-reaudit-bbnf-words-speedtest.md` |
| 13 | re-audit — speedtest | **FAIL → FIXED in W6** | `W6-reaudit-bbnf-words-speedtest.md` + `W6-fix-speedtest-scrollpane.md` |
| + | phantom-class gate (invariants 32/33 codification) | **PASS — gate reports true fleet state** | `W6-Lane-phantom-class-gate.md` |

### Per-lane detail

- **α (MINOR)** — every W0–W5 wave landed; every declared lane has a proof doc (W4 G/H/I and W5 B/C/E + D/F plan-faithfully consolidated); all 5 glass-ui tags placed correctly; all 49 Q.md §4 inheritance items ADDRESSED / RETIRED-with-rationale / CLOSED. No PERMANENT-DEFER classification anywhere. Two surfaced bookkeeping items: Q-misc-2's §4 placement drifted from W5 to an implied W6 lane (closed here — see §3); the fourier phantom-sweep grep-zero gate pends patch application (tracked, §4).
- **β (MINOR)** — no substrate-without-consumer violation. The rainbow `@utility` recipes have a confirmed live external consumer (keyframes.js W5 demo, ≥5 SFC sites — the consumer-rediscovery the W3 Lane E re-promote described); the Card `surface` prop + `@utility cartoon-surface` are CLEAN (exported public API, ≥2 consumers). The single MINOR: `_shared/useStalePropWarning.ts` dropped to one in-tree consumer (Card) after W3 Lane H retired ScrollPane + CartoonCard — sound (it backs codified invariant 31; `STALE_PROP_RECIPES` is an extensible registry) but no Q proof doc explicitly recorded the post-W3 single-consumer state as an invariant-8 consideration. Recorded here (§4, MINOR).
- **γ (MINOR — 2 doc-drift numerals)** — two stale numerals in CLAUDE.md, both numeral-only, both in prose the W3 Lane H edit did not sweep: `CLAUDE.md:172` (`40` → `37` vueuse-free `ui/` barrel re-exports) and `CLAUDE.md:14` (`44-entry matrix` → `42-entry`). DESIGN.md and CHANGELOG.md are CLEAN. MINOR-absorb-inline at the W6 close commit, exactly as P.W6 absorbed its γ `/api`-count finding.
- **δ (CLEAN)** — every Q remediation audited is a fossil-deletion or an idiomatic transposition: W1 = phantom-devDep deletion + the missing `default` contract key; W3 reverts = re-promotion of wrongly-retired recipes + retiral of wrongly-added machinery; the DEMOTE = component deletion folded into an orthogonal Card prop (explicitly NOT a `tier` rung — API corruption was the rejected alternative). No legacy alias, no `variant=` compat path, no deferred TODO in `src/`. Invariants 28/30/31 language is consistent across plan, precept, and close docs.
- **ε (CLEAN)** — `profile:budget` GREEN both axes. P→Q bundle delta modest and fully load-bearing: JS +2.75% raw / +4.57% gzip; CSS +5.86% raw / +5.15% gzip (the W4 token co-location + post-P metric-stack/timeline draw). The W4 Lane D CSS budget rebaseline is honest — ≈10–11% headroom, axis-scoped, single bump, documented N.W0→P.W0→P.W3→Q.W4 cadence; the cited draw (43340/7780) matches the live measured draw exactly.
- **ι (CLEAN)** — `audit:stash` clean; `proof:resolution` PASS; the W0 precept file present. A 7-repo reflog/stash scan (glass-ui + 6 consumers + precepts) surfaced ZERO agent-attributed mutating git: every stash entry pre-dates Q or belongs to a consumer team's in-flight tree; every `reset` reflog entry is a no-op `reset: moving to HEAD`; every Q-wave commit is orchestrator-owned. The known bbnf-buddy W2 Lane C stash/pop event is verified fully restored (stash list empty, no reflog residue, HEAD intact). The hardened agent git clause (invariant — agents NEVER mutate git) held across the entire tranche.
- **π (build-verification floor)** — the claude-in-chrome browser extension was **not connected** across three attempts. Per the lane's binding fallback clause, the probe fell back to the documented floor: dev-server boot (HTTP 200), Vite transform probe (scene/route modules → 200 not 500), build + typecheck green, and source-confirmation of every fix artefact. All 9 W6 round-2/3/4 checklist items resolve (6 BUILD-ONLY PASS, 2 PASS, 1 BUILD-ONLY PARTIAL — fourier, the un-applied patch). **Honest caveat: nothing was confirmed by pixel inspection; no screenshots exist.** π's promotion to "binding canonical" is contingent on a future probe with working browser automation — see §4.
- **6 consumer re-audits** — value.js GREEN (W1 Lane I patch fully live in working tree); keyframes.js GREEN (W1 keystone + full W5 restoration on master) with one residual W6-fixed; fourier-analysis GREEN (`web` builds; W1 resolver sweep committed, W4 patch well-formed + held for handoff); bbnf-buddy PASS (all 3 commits present + observable; one sanctioned pre-existing WASM typecheck residual unrelated to Q); words/frontend PASS; speedtest **FAIL → FIXED in W6** (see §2.1).
- **phantom-class gate** — `scripts/proof-phantom-classes.mjs` + `.retired-classes.txt` codified (invariants 32/33). The gate reports the TRUE fleet state, NOT a forced pass: glass-ui `src/`+`demo/` and 4 of 6 consumers CLEAN; words/frontend carried 8 real phantoms (W6-fixed — `W6-fix-words-phantom.md`); fourier-analysis carries 31 PENDING sites under the documented `KNOWN_PENDING` handoff heading.

### §2.1 — What the strengthened audit caught — and W6 fixed in-wave

The W6 strengthened audit + consumer re-audit caught three real gaps earlier Q rounds missed. W6 did not defer them — it fixed all three in-wave:

1. **speedtest `<ScrollPane>` BLOCKER** — the W6 consumer re-audit found speedtest's 5 dashboard SFCs still imported `<ScrollPane>` from `@mkbabb/glass-ui`; W3 Lane H retired that component, so speedtest's production build was RED (`"ScrollPane" is not exported by glass-ui`). Earlier Q speedtest audits (Qν/Qυ) scoped only `<Card variant=>` and missed the standalone component. **W6 fix** (`W6-fix-speedtest-scrollpane.md`): all 6 SFCs migrated to the canonical `<Card tier="wash" :grain="false">` recipe (`ResultsFilters.vue` — the one genuine keyboard-scroll region — gains `tabindex="0"`, closing a latent a11y gap ScrollPane shipped). speedtest build + typecheck restored GREEN; `grep ScrollPane` zero.
2. **words/frontend phantom-class debt** — the new phantom-class gate caught 8 real dangling sites (1 `glass-default` + 7 `glass-elevated`) — the v0.8.0 ladder-rename names W4 Lane F's cluster-C2 scope (`glass-{subtle,medium}` only) never covered. **W6 fix** (`W6-fix-words-phantom.md`): 11 occurrences across 10 files migrated (`glass-default → glass-quiet` ×1, `glass-elevated → glass-floating` ×10); `grep` for the full retired-tier set returns zero; typecheck GREEN.
3. **keyframes.js gh-pages outDir clobber** — the W6 re-audit found keyframes.js's `vite.config.ts` gave the demo (`gh-pages`) and library (`production`) builds the same `outDir: ./dist/` with `emptyOutDir: true` — a `gh-pages` build silently wiped `dist/keyframes.{js,d.ts}`, the exact demo-clobbers-library-dist class Q-break-3 fixed in value.js. **W6 fix** (`W6-fix-keyframes-outdir-fourier-patch.md`): the `gh-pages` build routed to `dist/gh-pages/`; CI deploy job + `npm pack` containment verified. The same fix doc also corrected `W4-Lane-F-fourier.patch` from 29 → 31 sites (2 `glass-elevated` sites the W4 cluster-C2 scope missed); the corrected patch is `git apply --check --recount` clean against fourier's working tree.

---

## §3 — Inheritance-item disposition (every Q ID)

All 49 Q.md §4 inheritance items are ADDRESSED, RETIRED-with-rationale, or CLOSED. The full per-item cross-walk with commit-hash evidence is `W6-audit-alpha-beta.md §α.2`. Summary by cohort:

| Cohort | IDs | Disposition |
|---|---|---|
| **Q-break** (1–5) | consumer breakage / dev-resolution desync | Q-break-1 ADDRESSED (keyframes.js `6af80ad`); Q-break-2/3 RETIRED (value.js Tranche A.W0 shipped them — Qφ); Q-break-4 ADDRESSED (phantom devDep retired, `bb79eb4`); Q-break-5 ADDRESSED (W1 resolver sweep, all 5 consumers) |
| **Q-card** (1–2) | stale Card API | Q-card-1 ADDRESSED (bbnf-buddy 6 sites `cab7258`; value.js 11 sites RETIRED — Tranche A.W1 already canonical); Q-card-2 ADDRESSED (invariant 31 dev-WARN, `cab7258`) |
| **Q-postP** (1–2) | post-P shadow cohort | Q-postP-1 ADDRESSED (`docs/tranches/AB+2/` retrospective); Q-postP-2 ADDRESSED (4th K-invariant-3 recurrence diagnosed → tooling-gate escalation) |
| **Q-coh** (1–5) | core-feature cohesion | all 5 ADDRESSED at W3 (`511146f`) — dock `data-density` co-location, `@utility cartoon-surface`, dropdown scoped-style → floating-panel.css, token-home rule, `beec35e` dock-dedup consolidation |
| **Q-sty** (1–6) | style + token | all 6 ADDRESSED at W4 (`e2e4b0d`) — `§metric` + `§timeline` token promotion, `-webkit-backdrop-filter` single-source, `transitions.css @layer`, `--scale-press-{xs,md,lg}` RETIRE, CSS budget rebaseline |
| **Q-leg** (1) | cosmetic comment sweep | Q-leg-1 ADDRESSED (W4 Lane E) |
| **Q-misc** (1–2) | misc | Q-misc-1 ADDRESSED (speedtest dead `manualChunks` branch removed, `b33f58b0`); **Q-misc-2** (consumer build/CI-gate audit) — α MINOR-1 found its §4 placement drifted from W5 to an implied W6 lane; **CLOSED here** — the 6 W6 consumer re-audit lanes discharge the substance (every consumer's build verified; speedtest's red build was caught + fixed, precisely the "no consumer caught its own red build" concern Q-misc-2 named) |
| **Q-chron** (1–4) | chronic-defer re-examination | Q-chron-1 CLOSED (WIP branch is a master ancestor — Qφ); Q-chron-2 ADDRESSED (π lane ran — see §4 caveat on binding promotion); Q-chron-3 + Q-chron-4 ADDRESSED (LL entries + invariant 33 codified; the gate scripts ship same-tranche) |
| **Q-cos** (1–23) | cosmetic-regression cohort | all 23 ADDRESSED across W3/W4/W5 — see `W6-audit-alpha-beta.md §α.2` for the per-ID commit cross-walk. Q-cos-6 (value.js picker) + Q-cos-7/Q-cos-23 (fourier phantom + cartoon) delivered as patches — see §4 |

No PERMANENT-DEFER classification appears anywhere in Q. Invariant 28 holds.

---

## §4 — Honest residuals declaration

Q did **NOT** achieve a literal "zero-residual" close. Every Q work item is DONE and VERIFIED; for the items below the *delivery mode* differs from a committed-and-pushed glass-ui change. These are named plainly — they are cross-repo coordination reality, not deferral.

1. **fourier-analysis — 31-site phantom/cartoon migration delivered as an un-applied patch.** `W4-Lane-F-fourier.patch` (31 sites / 23 files: 11 phantom-glass + 20 `cartoon-card`) is authored, verified, and `git apply --check --recount` CLEAN against fourier's working tree. It is **un-applied** because fourier's working tree carries ~100 files of the fourier team's in-flight work (`codex/contour-rebaseline`). The migration is DONE; the fourier team applies the patch after committing their WIP. Handoff, not deferral. The `proof:phantom-classes` gate reports fourier's 31 sites under its documented `KNOWN_PENDING` heading and stays RED until the patch lands — honest, not weakened.

2. **value.js — W1 picker-0×0 fix + `default` exports key delivered as a patch.** `W1-Lane-I-valuejs.patch` (the `.pane-main` flex-stretch idiom + `<nav>`/`<main>` landmarks + the `default` exports key) is **applied and verified in value.js's working tree** — the W6 re-audit confirms the working-tree diff matches the patch byte-for-byte and value.js builds GREEN. It is **un-committed** because value.js master carries 58 files of the value.js team's in-flight Tranche-B work (the `App.vue` a11y pass is entangled with the picker fix). Per risk-7 (the value.js team requested Q not write value.js), committing it would entangle their work. The fix IS live and verified; only the commit is the team's to make.

3. **π visual-runtime — ran at the build-verification floor.** The claude-in-chrome browser extension was disconnected this session. The π lane fell back to its documented floor: dev-server boot + Vite transform probe + build/typecheck green + source-confirmation of every fix. All 9 checklist items resolve. **No pixel confirmation; no screenshots exist** (`research/screenshots/` was created empty). π's promotion from "archived" to "binding canonical" is **contingent on a future probe with working browser automation** — the build-level floor confirms the fixes are present and the fleet boots + builds; it does not confirm the pixels. W6 hard-gate clause (c) ("π re-probe PASSES with screenshot evidence") is met at the build floor, not verbatim.

4. **Consumer commits are LOCAL, not pushed.** Every consumer-repo Q commit (keyframes.js W1+W5, fourier W1, bbnf-buddy W1/W2/W4, words W1/W4, speedtest W1) is committed locally; cross-repo pushes were held by the orchestrator per the MULTI-WRITER policy. The pushes are an orchestrator action, not Q work.

5. **Substrate referrals Q.Rh-1 + Q.Rh-3 — forward referrals for post-Q evaluation.** Q.Rh-1 (ToggleChip active-state token cohort, filed W4 Lane H) and Q.Rh-3 (ProgressRing determinate radial, filed W5) are provisional substrate-gap candidates. Both are forward referrals for evaluation against the ≥2-consumer test (L invariant 8) — neither is Q-scope work; they are correctly NOT promoted in Q (no substrate ships below the 2-consumer threshold).

6. **MINOR — `_shared/useStalePropWarning.ts` is single-consumer post-W3.** After W3 Lane H retired `<ScrollPane>` + `<CartoonCard>`, `useStalePropWarning` has exactly one in-tree consumer: `Card.vue`. This is **sound** — it is the canonical enforcement substrate for codified invariant 31, and `STALE_PROP_RECIPES` is an extensible registry (fleet-wide future use by design) — but it is recorded here because no W3 proof doc flagged the post-W3 single-consumer state as an invariant-8 consideration. It is invariant-enforcement substrate, retained by design; not substrate-without-consumer in the deprecation sense.

The W6 strengthened audit's three caught gaps (speedtest BLOCKER, words phantom debt, keyframes outDir clobber) are NOT residuals — all three were FIXED in-wave (§2.1). They are listed here only to be clear: they were caught and closed, not carried.

---

## §5 — Version cadence

```
v1.8.4  (P close)
  └─ v1.8.5   Q.W0 — proof-resolution gate + precept + AB+2 retrospective
  └─ v1.8.6   Q.W1 — fleet-wide consumer un-break
  └─ v1.8.7   Q.W2 — Card props fail-explicit + bbnf-buddy migration
  └─ v1.9.0   Q.W3 — core-feature cohesion + substrate REVERTs + component DEMOTE (minor bump)
  └─ v1.9.1   Q.W4 — style/token co-location + CSS budget rebaseline
                Q.W5 — keyframes.js → 2.1.1 (consumer-side; no glass-ui ship)
  └─ (W6 close — aggregate; no new glass-ui semver bump)
```

Five glass-ui patch/minor releases (v1.8.5 → v1.9.1) + one keyframes.js consumer release (2.1.1). The v1.9.0 minor reflects the W3 component DEMOTE (`ui/` package count 43 → 41) — a semver-visible surface change. W6 ships the invariant-32/33 gate + precept advance + doc-drift fixes; no new public-surface change, hence no semver bump.

---

## §6 — Authority

- This file (`docs/tranches/Q/FINAL.md`).
- Plan substrate: `Q.md` (plan + §4 inheritance ledger, 49 IDs) + `findings.md` + `PROGRESS.md` + `dispatch/AGENT.md` + `coordination/CONSTELLATION.md`.
- Per-wave specs: `waves/W{0..6}.md`.
- Round-1 audit (6): `research/Q{alpha,beta,gamma,delta,epsilon,zeta}-*.md`.
- Round-2 audit (2): `audit/Q1{1,2}-*.md`.
- Audit-augmentation rounds 2–5 (17 deliverables): `research/Q{eta…psi}-*.md` + `research/Qsynthesis-cosmetic-augmentation.md`.
- W0 precept: `docs/precepts/cross-repo-dev-resolution.md`.
- W0 gate: `scripts/proof-resolution-contract.mjs`. W6 gate: `scripts/proof-phantom-classes.mjs` + `.retired-classes.txt`.
- Post-P retrospective: `docs/tranches/AB+2/`.
- W6 close artefacts: the 13 audit proof docs + 3 W6 fix docs + the phantom-class gate doc (§7).
- Predecessor: `docs/tranches/P/FINAL.md`.

The 17 audit-augmentation deliverables (4 rounds, 21 read-only agents) surfaced 23 Q-cos-* items + 3 substrate REVERTs + 2 component DEMOTEs + 4 new invariants — the close lesson (W6 LL entry): large user-reported regression batches benefit from iterative Playwright-binding rounds; round-1's attribution was overturned twice by deeper probes (the timeline defect re-attributed to the IconTooltip wrap-span; the value.js BLOCKER re-attributed from Card-shadow to picker-0×0).

---

## §7 — Permanent-archive index

The Q audit/research deliverable corpus:

**Round-1 backend audit** — `research/Q{alpha,beta,gamma,delta,epsilon,zeta}-*.md` (6).
**Round-2 consumer audit** — `audit/Q11-consumer-resolver-sweep.md` + `audit/Q12-cross-repo-dev-resolution-architecture.md` (2).
**Audit-augmentation rounds 2–5** — `research/Q{eta,theta,iota,kappa,lambda,mu,nu,xi,omicron,pi,rho,sigma,tau,upsilon,phi,chi,psi}-*.md` (17) + `research/Qsynthesis-cosmetic-augmentation.md`.
**Wave proof docs** — `audit/W0-Lane-{A,B,C}-*.md` (3) · `audit/W1-Lane-{A,B,D,E,F,G,I,J}-*.md` (8) + `W1-Lane-I-valuejs.patch` · `audit/W2-Lane-{A,C}-*.md` (2) · `audit/W3-Lane-{A,B,C,D,E,F,G,H}-*.md` (8) · `audit/W4-Lane-{A-E,F-phantom-sweep,GHI-bbnf-buddy}-*.md` + `W4-Lane-F-fourier.patch` · `audit/W5-Lane-{A,BCE,DF}-*.md` (3).
**W6 strengthened audit** (7 lanes, 4 docs) — `W6-audit-alpha-beta.md` · `W6-audit-gamma-delta.md` · `W6-audit-epsilon-iota.md` · `W6-pi-visual-runtime-reprobe.md`.
**W6 consumer re-audit** (6 lanes, 2 docs) — `W6-reaudit-value-keyframes-fourier.md` · `W6-reaudit-bbnf-words-speedtest.md`.
**W6 fix waves** (3 docs) — `W6-fix-speedtest-scrollpane.md` · `W6-fix-words-phantom.md` · `W6-fix-keyframes-outdir-fourier-patch.md`.
**W6 gate codification** — `W6-Lane-phantom-class-gate.md`.
**Screenshots** — `research/screenshots/` (12 round-1 + round-2/3/4 captures; the `q-w6-*` set is empty — π browser automation unavailable, §4).

---

## §8 — Final disposition

**Q tranche CLOSED at glass-ui v1.9.1 (`96986a9`) + this W6 close commit.**

Seven waves landed in one calendar-day execution. The headline — a fleet-wide consumer build failure — is resolved: it was correctly attributed (NOT a glass-ui substrate regression; a cross-repo dev-resolution contract desync left by the AD.W4 conditional-exports flip), and the gestalt remediation was a deletion of fossils that fought an existing mechanism (the phantom devDep, the hard `dist/` aliases, the missing `default` contract key) — not new machinery. Four new invariants (30 cross-repo dev-resolution; 31 component props fail-explicit; 32 phantom-class gate; 33 dead-code-removal gate) each ship with their tooling gate the same tranche — the Q-chron-3 lesson made structural.

The 13-lane strengthened audit did its job: it caught three real gaps earlier rounds missed (the speedtest ScrollPane BLOCKER, the words phantom-class debt, the keyframes outDir clobber), and W6 fixed all three in-wave. The residuals declared in §4 are genuine, named, and honest — two verified consumer migrations awaiting peer-repo coordination, a π lane that ran at the build floor rather than the pixel ceiling, held cross-repo pushes, two forward substrate referrals, and one single-consumer enforcement composable. None is reclassified to permanent-defer; the work is done and verified — the delivery mode is what differs.
