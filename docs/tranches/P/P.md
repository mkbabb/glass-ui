# P — Closure of all carry-forwards (zero-deferral binding)

**Tranche letter**: P.
**Successor to**: O `8e741ba` (v1.4.1) + post-O AB+1 cohort HEAD `b201b03` (package.json v1.7.0; UNTAGGED at planning time).
**Cohort identity**: closure of every internal carry-forward + every cross-repo CR-* item + every PERMANENT-DEFER + every NEW finding from the v1.4.1 → HEAD AB+1 shadow-execution cohort. **ZERO DEFERRAL at P close**.
**Mode**: planning-only at this open per user directive ("This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-14.

## §1 — Thesis

P operates under one binding constraint that did not bind at any prior tranche: **every item carried forward exits P at close, OR formally retires with rationale**. The user's open directive replaced the "deferral with named-destination" close-path that had been canonical at K → L → M → N → O.

P closes:
- 7 internal O carry-forwards (P-1 through P-7).
- 6 cross-repo O carry-forwards (CR-1 through CR-5; CR-6 already RETIRED at speedtest AC.W9 close; CR-7 already RESOLVED at v1.5.0).
- 3 PERMANENT-DEFER items inherited from L + M (PD-1 vue-passive-listeners + PD-2 cache-ttl + PD-3 value.js WIP-branch sync).
- AB+1 shadow-execution retrospective (third K-invariant-3 recurrence: V → AB → AB+1).
- v1.7.0 untagged-at-HEAD release ceremony (the AB+1 cohort bumped `package.json` to 1.7.0 but never tagged).
- NEW debts surfaced by the 12-deliverable P-open audit:
  - Pα/Pγ doc-counter γ-drift (CLAUDE.md + src/api/index.ts + src/index.ts; analog of O.W7 γ-M1..M4).
  - Pα/Pγ /api Props gap (6 AB+1 primitives ship without Props promotion; analog of O.W4 Lane A).
  - Pδ invariant-25 completion (CONFIGURATOR_DENSITY_KEY + SORTABLE_CONTEXT + GlyphFaceSilhouetteKey — 3 sites pre-W2; helper-pair shapes per intent).
  - Pε 7 pipeline actions (v1.7.0 tag + heap-bump root cause + CI proof:* subset + tailwind-merge cruft + CLAUDE.md count stale).
  - P11/a Fira Code double-load at words/frontend (NEW DEBT introduced by glass-ui's v1.5.0 OFL self-host shipping alongside consumer-side Google CDN load).
  - P11/b CR-2 ESCALATION: fourier-analysis's legacy dock-key injects now silently no-op at v1.7.0 — functional regression on scrub gestures.
  - P11/a G2: ProgressiveSidebar slotted-chassis split — HEADLINE-class substrate (469 LOC absorbable at words/frontend).
  - P11/a G3+I2: PaperBackdrop /api promotion + texture-system migration.
  - P11/e useClipboard surface-mismatch: Path B (additive bare `copyToClipboard` co-export) for the 19 value.js sites.

Per user directive ("idiomatic, gestalt approaches"), each P wave is sized to land its absorbed items completely. No item is split across waves unless dependency chains require it (notably: P11/b's CR-2 needs the glass-ui-side dock barrel re-export to land at P.W1 before the consumer-side migration at P.W5).

## §2 — Binding invariants (inherited + extended)

1-27. All 27 invariants from O inherited (V invariants 1-20; N invariants 21-23; O invariants 24-27).
28. **NEW @ P — Zero deferral at tranche close.** Every item in the inheritance ledger lands, retires-with-rationale, or formal-archives with permanent-out-of-scope justification. "Deferral with named-destination" — the canonical close-path at K → L → M → N → O — is RETIRED at P. The PERMANENT-DEFER classification (codified at L; carried at M / N / O) RETIRES at P. Future tranches may codify deferrals only when explicit user authorization grants the exception. Codify at precept submodule at P close.
29. **NEW @ P — AB+1 retrospective discipline.** Per K invariant 3 third recurrence (V → AB → AB+1), the post-hoc plan-folder pattern is now SPEC-mandated: any work cohort exceeding 1 release-tag boundary MUST be tranche-attributed at the SECOND tag at latest. P.W0 Lane A codifies this in `tranche/SPEC.md`.

## §3 — Wave schedule (7 waves; finalized post-synthesis)

| Wave | Opens after | Lanes | Hard gate (TL;DR) | Tag |
|---|---|---|---|---|
| **W0 HEADLINE** | open | 3 (A AB+1 retrospective + B v1.7.0 ceremonial tag + C doc-counter γ-fix) | AB+1 plan folder at `docs/tranches/AB+1/` authored; v1.7.0 git tag exists + release.sh ran canonical gate matrix; CLAUDE.md + src/api/index.ts + src/index.ts + O.γ-M5 CHANGELOG drift fixed | v1.7.0 (catches up) |
| **W1** | W0 close | 3 (A /api Props promotion + B dock barrel re-export prereq + C cosmetic comment rephrase) | 7 AB+1 primitive Props promoted to /api (surface 55 → 63); `src/components/custom/dock/index.ts` re-exports `useDockContext` + `useOptionalDockContext` + `DOCK_CONTEXT_KEY` + types (P11/b CR-2 prerequisite); 2 cosmetic legacy-language comments rephrased | v1.7.1 (additive types + barrel re-exports; internal) |
| **W2** | W1 close | 4 (A invariant-25 paired helpers for CONFIGURATOR_DENSITY_KEY + B SORTABLE_CONTEXT + C GlyphFaceSilhouetteKey + D UseDockStateReturn annotation) | Invariant 25 closes at every typed-key site per intent; useDockState return interface named | v1.7.2 (additive helper shape; internal) |
| **W3 HEADLINE** | W2 close | 3 (A GlassScrubber substrate + B ProgressiveSidebar slotted-chassis split + C PaperBackdrop /api + texture-system promotion) | 3 substrate promotions clear ≥ 2-consumer bar; fourier-analysis 3-site shadow recipe migrates via Slider variant; words/frontend 469 LOC absorbable via chassis split; PaperBackdrop promotes to /api + texture migration ships | v1.8.0 minor |
| **W4** | W3 close | 5 (A heap-bump root-cause OR bake + B CI proof:* subset + C tailwind-merge cruft retire + D style precept sweep + E demo stories for W6 promotions; F formal µ-split retirements [useSortable / utilities.css btn-audacious]) | Pε 7 actions absorbed; corpus-wide style precept sweep (banned-word + em-dash); 4 demo stories ship; 2 µ-splits formally retire | v1.8.1 (internal + demo additions) |
| **W5** | W4 close | 6 (A CR-1+CR-4 value.js cohort + B CR-2 fourier-analysis cohort + C CR-3 keyframes.js cohort + D CR-5 bbnf-buddy 1-line + E P11/a words/frontend cohort + F formal-retire usePopupMutex + idle-bob + 84% overfitting) | Cross-repo MULTI-WRITER batch — every CR-* item lands OR formally archives; PD-3 value.js WIP-branch LAND coordination (user-authorized rebase + merge) OR formal-archive | v1.8.2 (useClipboard Path B additive co-export warrants patch) |
| **W6 close** | W5 close | 13 audit (7 strengthened α/β/γ/δ/ε/π/ι + 6 consumer re-audit P11/a-f) + formal-archive (PD-1 + PD-2) + invariant-28-29 codification + FINAL.md | 13 audit lanes CLEAN/MINOR; PD-1 + PD-2 archived at `docs/tranches/P/archive/`; precept submodule advances with invariants 28-29 + 2026-05-14 LL entry; FINAL.md with ZERO P-residuals; final aggregate tag | aggregate v1.8.x final |

**Critical path**: W0 → W1 → W2 → W3 → W4 → W5 → W6. 6 sequential edges. **Peak parallelism**: W4 (5 lanes within 6-implementation ceiling) + W6 (13 audit lanes within V7 dual-ceiling).

**Versioning cadence**: v1.7.0 (ceremonial catch-up) → v1.7.1 → v1.7.2 → v1.8.0 (minor, substrate promotions) → v1.8.1 → v1.8.2 → final aggregate.

## §4 — Inheritance ledger absorption (every item, no deferrals)

### From O internal carry-forwards (7 items → all in P)

| O ID | Item | P destination | Verdict |
|---|---|---|---|
| P-1 | Playwright/Chrome MCP runtime visual probe | P.W6 close ceremony π lane (one final attempt; if still unreachable, formal-archive at `docs/tranches/P/archive/visual-runtime-tooling.md` with permanent rationale + cross-link to consumer-side visual probes that DO run) | ADDRESS-OR-ARCHIVE |
| P-2 | CSS budget rebaseline (95.7% raw) | P.W0 Lane C (alongside doc-counter fix); also re-verify at every W close | ADDRESS |
| P-3 | 3 typed-key paired-helper completions | P.W2 Lanes A + B + C | ADDRESS |
| P-4 | Demo stories for 4 W6 promotions | P.W4 Lane E | ADDRESS |
| P-5 | GlassScrubber substrate (3 fourier-analysis sites) | P.W3 Lane A | ADDRESS |
| P-6 | Style precept sweep (banned-word + em-dash) | P.W4 Lane D | ADDRESS |
| P-7 | γ-M5 CHANGELOG v1.3.0 "8 constants" typo | P.W0 Lane C | ADDRESS |

### From O cross-repo carry-forwards (7 items)

| O ID | Item | P destination | Verdict |
|---|---|---|---|
| CR-1 | value.js avatar typo + ActionButton injects | P.W5 Lane A | ADDRESS (user-authorized cross-repo write) |
| CR-2 | fourier-analysis 2 dock-key injects + 3 useClipboard + EquationView one-liner | P.W5 Lane B (with P.W1 Lane B prerequisite) | ADDRESS |
| CR-3 | keyframes.js HeaderRibbon + scale-on-hover + Fira Code CDN drop | P.W5 Lane C | ADDRESS |
| CR-4 | value.js HeaderRibbon retirement + 20 useClipboard sites | P.W5 Lane A (cohorts with CR-1) | ADDRESS |
| CR-5 | bbnf-buddy ToolsLayer.vue :deep() retirement | P.W5 Lane D | ADDRESS |
| CR-6 | speedtest AC.W6 cohort full adoption | RETIRED — speedtest AC tranche closed same-day at AC.W9; full consumer adoption verified at P11/f | RETIRE-AT-OPEN |
| CR-7 | Fira Code woff2 binary fetch | RETIRED — already shipped at v1.5.0 (commit `2474440`) | RETIRE-AT-OPEN |

### From O PERMANENT-DEFER items (3 items → all dispositioned)

| O ID | Item | P destination | Verdict |
|---|---|---|---|
| PD-1 | L-vue-passive-listeners | P.W6 formal-archive at `docs/tranches/P/archive/vue-passive-listeners.md` with permanent-out-of-scope rationale | ARCHIVE (Vue 3.5's event-listener default is documented; the "passive listeners" optimization is platform-API-level, not glass-ui-substrate-level; permanent-out-of-scope) |
| PD-2 | L-cache-ttl | P.W6 formal-archive at `docs/tranches/P/archive/cache-ttl.md` with permanent-out-of-scope rationale | ARCHIVE (no caching substrate ships in glass-ui by design; consumers own caching policy; permanent-out-of-scope) |
| PD-3 | M.W1 value.js WIP branch sync | P.W5 Lane A — user-authorized LAND coordination (rebase + merge to master) OR formal-archive at P.W6 if user declines authorization | ADDRESS-OR-ARCHIVE |

### From AB+1 shadow-execution cohort (NEW DEBT)

| P ID | Item | P destination | Verdict |
|---|---|---|---|
| P-AB1 | AB+1 retrospective plan folder | P.W0 Lane A | ADDRESS |
| P-AB1-tag | v1.7.0 untagged at HEAD | P.W0 Lane B (orchestrator-solo; run release.sh canonical gate matrix) | ADDRESS |
| P-AB1-ac6+8e | AC.W6a/b/c/d + AC.W8e cohort | RETIRED — speedtest AC.W9 closed same-day; full adoption verified | RETIRE-AT-OPEN |

### From P round-1 backend audit (NEW debts)

| Source | Item | P destination |
|---|---|---|
| Pα B1 | CLAUDE.md doc-counter γ-drift (31 → 35; 38 → 42; v1.4.0 → v1.7.0) + src/index.ts (30 → 34) | P.W0 Lane C |
| Pα B2 | /api Props gap: 6 AB+1 type promotions absent | P.W1 Lane A (cohorts with Pγ) |
| Pα A7-x + A9-x | 2 cosmetic "legacy" comment rephrases | P.W1 Lane C |
| Pβ µ-split-1 | useSortable.ts → dragGhost.ts | P.W4 Lane F (formal retire) |
| Pβ µ-split-2 | utilities.css btn-audacious → btn-audacious.css | P.W4 Lane F (formal retire) |
| Pγ.1 | 7 AB+1 type promotions + StackedIconGroupProps carryover (surface 55 → 63) | P.W1 Lane A |
| Pγ.3 | UseDockStateReturn annotation | P.W2 Lane D |
| Pγ.4 | 2 missed module-scope registries (DataTable.vue:61-62) | P.W4 Lane D (doc-tier; absorb into style sweep) |
| Pε-1 | v1.7.0 tag missing | P.W0 Lane B |
| Pε-2 | Heap-bump workaround | P.W4 Lane A (root-cause investigation OR bake into package.json) |
| Pε-3 | CI proof:* subset | P.W4 Lane B |
| Pε-4 | tailwind-merge cruft in proof-package.mjs | P.W4 Lane C |
| Pε-5 | CLAUDE.md subpath count stale | P.W0 Lane C |

### From P round-2 consumer audit (NEW debts)

| Source | Item | P destination |
|---|---|---|
| P11/a NEW-DEBT | Fira Code double-load at words/frontend | P.W5 Lane E |
| P11/a G2 | ProgressiveSidebar slotted-chassis split | P.W3 Lane B |
| P11/a G3+I2 | PaperBackdrop /api promotion + texture-system migration | P.W3 Lane C |
| P11/a I4 | press-scale ladder (9 sites at 4 values; O-N-7 carryover) | P.W4 Lane D (token-tier; absorb into style sweep) |
| P11/b CR-2-escalation | fourier-analysis silent dock regression at v1.7.0 | P.W5 Lane B (after P.W1 Lane B prereq) |
| P11/c CR-5-inline | useLeaveTimer formal RETIRE-as-inline at bbnf-buddy | P.W5 Lane D |
| P11/d idle-bob | RETIRE-as-inline (1 site at CubeTarget.vue) | P.W5 Lane F (formal retire ledger) |
| P11/e Path B | useClipboard bare `copyToClipboard` co-export (additive) | P.W5 Lane A (glass-ui-side prereq for value.js bulk import flip) |
| P11/e usePopupMutex | formal RETIRE (single-consumer; value.js-internal) | P.W5 Lane F |

## §5 — Cross-repo coordination

Per `docs/tranches/P/coordination/CONSTELLATION.md` + the P expanded MULTI-WRITER scope:

- **glass-ui**: primary; P is its tranche.
- **speedtest**: AC tranche CLOSED at AC.W9 same-day as P open. READER-ONLY at P; CR-6 RETIRED.
- **value.js (WIP branch)**: P.W5 Lane A — user-authorized LAND coordination (PD-3 absorb).
- **fourier-analysis**: P.W5 Lane B — 2 dock-key migrations + 3 useClipboard + 1 HoverCard rename.
- **keyframes.js**: P.W5 Lane C — HeaderRibbon adoption + scale-on-hover migration + Fira Code self-host adoption.
- **bbnf-buddy**: P.W5 Lane D — ToolsLayer.vue 1-line :deep() retire + useLeaveTimer inline.
- **words/frontend**: P.W5 Lane E — Fira Code CDN drop + scale-on-hover + MetricRow adoption + optional press-scale ladder adoption.
- **bbnf-lang + mkb-utils + parse-that**: READER-ONLY (out-of-P-scope at planning time).
- **precepts submodule**: P.W6 Lane B advances with invariants 28-29 + LL entry on (a) zero-deferral binding (b) AB+1 retrospective discipline.

## §6 — Critical path

W0 (HEADLINE) → W1 (Pα + Pγ promotions + P11/b prereq) → W2 (invariant-25 completion) → W3 (HEADLINE substrate promotions) → W4 (pipeline + style + demo + retirements) → W5 (cross-repo MULTI-WRITER batch) → W6 (close + archive + audit).

6 sequential edges; peak parallelism at W4 (5 lanes) + W6 (13 audit lanes).

The W3 substrate promotions are the LOAD-BEARING architectural transposition: ProgressiveSidebar slotted-chassis is the words/frontend 469 LOC absorbable; GlassScrubber unifies 3 fourier-analysis shadow recipes (562 LOC, 82% overlap); PaperBackdrop promotion clears the words/frontend 500 LOC carry. The W5 cross-repo batch consumes the W3 substrate.

## §7 — Risk register

1. **CR-1+CR-4 + PD-3 require explicit user authorization** to push to value.js's WIP branch. P.W5 Lane A includes an in-wave escalation step; if authorization declined, fold to formal-archive at P.W6 (PD-3 absorbs as ARCHIVE-WITH-RATIONALE).
2. **W3 substrate-promotion ≥ 2-consumer verification** — each of GlassScrubber / ProgressiveSidebar / PaperBackdrop must clear the bar at LANDING (per N invariant 23 wire-before-retire). W3 lane proof docs cite ≥ 2 consumers per primitive (or DEFER lane to formal-archive).
3. **AB+1 retrospective scope creep** — 12 commits to walk; dispatch as a single agent with HARD CAP 30 min (analog of O.W0 Lane A which authored 9 retrospective files in one dispatch).
4. **v1.7.0 ceremonial tag at P.W0 Lane B** — release.sh canonical gate matrix MUST run; any gate failure halts W0 close. Per Pε audit: release.sh + ci.yml are intact post-O.W5; gate should green.
5. **Heap-bump root-cause investigation at P.W4 Lane A** — vite-plugin-dts memory profile may reveal a fixable cause (e.g., overly broad type-walk; preserve-symlinks issue). If root-cause not identifiable in HARD CAP, bake `NODE_OPTIONS=--max-old-space-size=8192` into `package.json.build` as the canonical baseline (no longer a workaround per P4/P6 if it's the documented default).
6. **P.W6 close ceremony 13-lane audit** may surface new debts (per O.W7 γ caught the HeaderRibbon packaging BLOCKER). P.W6 reserves inline-absorb capacity for any BLOCKER returned.
7. **π lane tooling availability at P.W6** — 3rd consecutive deferral if MCP still unreachable. P.W6 Lane π authorized to formal-archive the lane as permanent-out-of-scope if tooling fix isn't identifiable.

## §8 — Provisional release plan

```
W0 close: v1.7.0 (ceremonial; tag the AB+1 cohort's HEAD via canonical gate matrix)
W1 close: v1.7.1 patch (additive /api + barrel re-exports + cosmetic)
W2 close: v1.7.2 patch (additive helper-pair completion + named return)
W3 close: v1.8.0 minor (3 substrate promotions — substantial additive surface)
W4 close: v1.8.1 patch (internal pipeline + style + demo + µ-split retirements)
W5 close: v1.8.2 patch (useClipboard Path B additive co-export; cross-repo writes don't otherwise affect glass-ui dist)
W6 close: final aggregate tag (v1.8.x final or v1.9.0 if W6 absorbs surface additions)
```

## §9 — Authority

Plan substrate at P open:

- This file (`P.md`) — plan + thesis + invariants + wave schedule.
- `findings.md` — verbatim user P-open directive + extracted scope + FULL inheritance ledger.
- `dispatch/AGENT.md` — extends O dispatch template with P-specific clauses (ZERO DEFERRAL binding; AB+1 retrospective dispatch shape; cross-repo MULTI-WRITER expanded scope).
- `PROGRESS.md` — initial + per-round dispatch log + synthesis closure entry.
- `waves/W{0-6}.md` — 7 wave specs (this commit + commit-by-commit at each successor close).
- `coordination/CONSTELLATION.md` — P-open multi-peer manifest with AB+1 cross-repo origin documented.
- `research/P{α-ζ}*.md` — 6 backend research deliverables.
- `audit/P11-Lane-{a-f}-*.md` — 6 consumer audit deliverables.

Per P-open user directive ("This is NOT an implementation phase. Tranche development only."), implementation dispatch awaits explicit subsequent user directive analogous to K → L → M → N → O pattern.

## §10 — Revision history

- 2026-05-14 initial open commit (this): 12-deliverable audit (6 backend + 6 consumer) returned; 7-wave plan synthesizes the FULL inheritance ledger with ZERO DEFERRAL. Pre-dispatch state.

## §11 — Synthesis summary

The P round-1 backend audit (Pα through Pζ) + round-2 consumer audit (P11/a-f) returned 12 deliverables establishing:

- Substrate health: post-O substrate is CLEAN-with-doc-fixes (Pα CLEAN; Pβ CLEAN god-modules; Pγ 7 promotion candidates; Pδ HELD + 3 invariant-25 sites pending; Pε HELD with 7 pipeline actions; Pζ HEADLINE 18-prompt recap).
- Consumer health: 4 CLEAN (P11/c bbnf-buddy + P11/d keyframes.js + P11/f speedtest + P11/a words at v1.7.0 build) + 2 MINOR (P11/a NEW-DEBT Fira Code double-load + P11/b CR-2 escalation) + 1 BLOCKER-DEFERRED (P11/e value.js tree-shake-masked).
- Cross-repo CR-6 + CR-7 already RETIRED at planning time (AC.W9 + v1.5.0 closed those carries).
- AB+1 cohort: 12 commits / 4 tags / v1.7.0 untagged + naming `docs/tranches/AB+1/`.

Three "headline" axes for P:

1. **W0 — Ceremony + retrospective** — close the v1.7.0 release gap + AB+1 retrospective + doc-counter γ-drift.
2. **W3 — Substrate promotions** — GlassScrubber + ProgressiveSidebar + PaperBackdrop clear the cross-walk ≥ 2-consumer bar.
3. **W5 — Cross-repo MULTI-WRITER batch** — every CR-* item lands; PD-3 user-authorized OR formal-archive.

W6 close is the ZERO-DEFERRAL gate: 13-lane audit + permanent-archive of PD-1 + PD-2 + final aggregate tag + invariants 28-29 codified at precept.
