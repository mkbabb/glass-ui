# AB+2 — post-P-close substrate-settle cohort (v1.8.4; untagged)

**Tranche letter**: AB+2.
**Predecessor close**: P `9f774b4` (v1.8.4; 2026-05-16).
**This close**: no release tag accrued — package.json remains v1.8.4 throughout; commit `beec35e` touches package.json (toggle subpath wiring, NOT a version bump).
**Span**: 2026-05-16 17:57 → 2026-05-18 02:03 (-0400); ~32 hours wall clock; 3 calendar days.
**Open commit**: n/a (shadow-execution — no plan-folder authoring at execution time).
**Close commit**: retroactive at Q.W0 Lane A (2026-05-18).

**Authored retroactively at Q.W0 Lane A (2026-05-18)** per K invariant 3 (no tranche-letter shadow execution) + invariant 29 (AB+1 retrospective discipline). The work shipped through 7 commits on master between P close `9f774b4` (2026-05-16) and HEAD `d244dd5` (2026-05-18 02:03); this plan folder closes the precept loop without rewriting history.

## §1 — Thesis

AB+2 is the **post-hoc tranche-letter attribution** for the post-P substrate-settle cohort. Seven library-side commits landed across 3 calendar days, touching dock CSS, timeline geometry, toggle/dock hit-test behaviour, MetricStack/MetricRow token architecture, DataTable responsive layout, and the freshness-apparatus retirement. No release tag was placed — the cohort pre-dates a Q-wave close ceremony; package.json stays at v1.8.4 (set at P close) throughout.

The cohort was **shadow-executed** — no `docs/tranches/AB+2/` plan folder existed at execution time. This retrospective closes the K-invariant-3 loop for the **fourth recurrence** (V → AB → AB+1 → AB+2) at Q.W0 Lane A (2026-05-18). Critically, this is the first recurrence AFTER invariant 29 was codified (P.W6 `3310a8c`, 2026-05-16) — proving the codification is necessary-but-not-sufficient; prose enforcement alone did not hold within 2 days of the invariant being written.

The work itself is high-quality and internally consistent. The retrospective documents what landed — it does NOT propose changes. Per P invariant 5, every substrate addition named below IS the canonical baseline.

### Sub-wave thesis

Three coherent sub-waves emerge from the 7 commits by theme and timestamp:

- **T1 (W1) — freshness-gate retirement**: the `949474a` cross-repo landing of speedtest AD.W4 Decision 5. Externally attributed; the glass-ui-side drop of a runtime stale-dist gate superseded by the `"development"` conditional-exports branch already in place.
- **T2 (W2) — dock + timeline substrate**: dock.css edge-fade mask retirement (`099d51e`) + ContinuousTimeline stitched-gradient + glassy-dot rewrite (`3cb70db`) + inactive dock-layer hit-test fix (`beec35e` dock portion). Touches dock.css twice and timeline geometry — the prime candidate for the Q-open consumer breakage reports.
- **T3 (W3) — metric/table primitive register**: toggle card-variant CVA compound rule (`beec35e` toggle portion) + MetricStack/MetricRow `register` prop + `--metric-row-value-clamp-cqi` token (`9ba68ca`) + follow-on label-clamp tightening (`d244dd5`) + DataTable responsive card-per-row layout (`1c6c3e5`).

## §2 — Inherited invariants from P (29 at P close)

P closed at `9f774b4` (v1.8.4) with 29 invariants codified. All 29 bind through AB+2 unchanged:

1–23 from C → N (KISS, no quick fixes, no workarounds, no legacy code, no silent deferrals, consumed substrate, evidence > claims, J token-first, J component-over-CSS-class, J visual-load-bearing-ness, K invariant 3 no-tranche-letter-shadow-execution, K W0 hardened agent git clause, L vueuse-FREE root barrel, L subpath publication binary, L migration guide binding, L substrate-without-consumer binary, M.Rδ canonical multi-peer manifest, N invariant 22 audit-verdict spot-verification gate, N invariant 23 wire-before-retire posture, N stash-anti-pattern recurrence-window).

24. **Fail-explicit migrations** — no silent null-fallbacks at consumer boundaries (O.W1).
25. **Typed-key DI with paired strict/optional helpers** — `InjectionKey<T>` + `provideX(ctx)` + `useX()` + `useOptionalX()` (O.W2).
26. **Test files outside src/** — `__tests__/` co-located, never `*.spec.ts` in src/ proper (O.W1 Lane E).
27. **Tooling-side stash enforcement** — `scripts/audit-stash-list.mjs` or equivalent fail-closed shell command, runs canonical at every ι sweep (O.W7 ι).
28. **Zero deferral** — no items exit a tranche close as "deferred" or "permanent-defer"; every inheritance item is dispositioned to a named destination within the tranche (P.W0 invariant).
29. **AB+1 retrospective discipline** — when a substrate cohort lands ≥ 5 commits OR ≥ 1 release tag under a tranche-letter identifier with no plan folder authored at execution time, the next-tranche open MUST author the retrospective in its W0 HEADLINE before any other lane dispatches (P.W6 `3310a8c`).

AB+2 introduced ZERO new invariants. The Q tranche is the appropriate venue to codify the tooling-gate escalation that invariant 29's recurrence demands.

## §3 — Wave schedule (3 retrospective sub-waves)

| Wave | Title | Source commits | Tag | Status |
|---|---|---|---|---|
| W1 | Freshness-gate apparatus retirement (AD.W4.T2 cross-repo landing) | `949474a` | (none; shrinkage) | COMPLETED RETROACTIVELY |
| W2 | Dock + timeline substrate settle | `099d51e`, `3cb70db`, `beec35e` (dock portion) | (none) | COMPLETED RETROACTIVELY |
| W3 | Metric/table primitive register | `beec35e` (toggle portion), `9ba68ca`, `1c6c3e5`, `d244dd5` | (none) | COMPLETED RETROACTIVELY |

No W0 (no formal dispatch precept update — that absence IS the precept violation Q.W0 Lane A codifies). No close ceremony at execution time (no strengthened audit; close lives in Q.W0 Lane A FINAL.md).

`beec35e` straddles W2 and W3 as a dual-scope `fix(toggle,dock)` commit — a sign the cohort was not wave-disciplined. A wave-attributed cohort would have split toggle and dock into separate commits.

## §4 — Inheritance ledger (what AB+2 absorbed from P)

P closed with zero cross-tranche carries (P invariant 28: zero deferral). AB+2 therefore inherits NO carry-forward items from P — this cohort is entirely independent feature + fix work, not a carry-absorption batch.

| P item | AB+2 status |
|---|---|
| (no P carries — P closed clean) | n/a |

The sole cross-repo attribution within AB+2 is `949474a` (speedtest AD.W4.T2 Decision 5), which is an OUTBOUND glass-ui-side retire of a surface the speedtest AD tranche designated obsolete. Documented at `docs/tranches/AB+2/coordination/CONSTELLATION.md`.

## §5 — Cross-repo origin (speedtest AD tranche — W1 only)

W1's single commit (`949474a`) is the glass-ui-side landing of speedtest AD.W4 Decision 5. The CLAUDE.md already documented `./freshness` as "retired at AD.W4 (Decision 5)" at HEAD, confirming the commit is cross-repo-coordinated (not pure glass-ui shadow work). W2 + W3 are entirely glass-ui-internal substrate work with no named speedtest attribution in their commit subjects.

| Commit | AD attribution | Glass-ui-side action | Tag |
|---|---|---|---|
| `949474a` | AD.W4.T2 Decision 5 | Retire `src/freshness.ts` + 3 scripts + subpath export | (none; shrinkage) |
| `099d51e` | NONE | dock.css edge-fade mask retire | (none) |
| `3cb70db` | NONE | ContinuousTimeline stitched gradient rewrite | (none) |
| `beec35e` | NONE | toggle CVA compound rule + dock-layer hit-test | v1.8.5 patch (package.json bump) |
| `9ba68ca` | NONE | MetricStack `register` prop + clamp token | (none) |
| `1c6c3e5` | NONE | DataTable responsive card-per-row layout | (none) |
| `d244dd5` | NONE | MetricStack label-clamp tokens + ceiling tighten | (none) |

## §6 — Versioning cadence

```
P close:        v1.8.4   (2026-05-16; commit 9f774b4)
                  |
W1 close:       v1.8.4   unchanged (shrinkage-only; no release bump)   949474a
W2 close:       v1.8.4   unchanged (dock+timeline fix; no release bump) 099d51e + 3cb70db + beec35e
  (beec35e touches package.json for /toggle subpath export only — version stays v1.8.4)
W3 close:       v1.8.4   unchanged (metric/table; no release bump)      9ba68ca + 1c6c3e5 + d244dd5
                  |
Q open:         v1.8.4   (d244dd5 = HEAD at Q open)
```

No release tag was placed within the cohort. `beec35e`'s package.json hunk is a `/toggle` subpath export addition, not a version field change — verified by `git show --stat beec35e`. The cohort exits AB+2 at v1.8.4 exactly as it entered.

## §7 — Process gap (the fourth K-invariant-3 recurrence)

NO plan folder existed at execution time. Seven commits landed direct-to-master without orchestrator-side wave gating, without a `docs/tranches/AB+2/` folder, and without a close ceremony. This violates K invariant 3 verbatim and invariant 29.

| # | Tranche | Detection | Closure |
|---|---|---|---|
| 1 | V (68 commits / 5 releases; ~3 weeks) | K.W reconciliation 2026-05-08 | K.WV retrospective at `docs/tranches/V/V.md` |
| 2 | AB (post-N close; pre-O open) | O.W0 Lane A | O.W0 retrospective at `docs/tranches/AB/` |
| 3 | AB+1 (12 commits / 3 tags + 1 untagged; single day) | P.W0 Lane A (Pζ recap) | P.W0 retrospective at `docs/tranches/AB+1/` |
| 4 | **AB+2** (7 commits / 0 tags; ~32 hours) | **Q.W0 Lane A (Qε recap)** | **Q.W0 retrospective at `docs/tranches/AB+2/` (this folder)** |

### The headline fact

Recurrence 4 is qualitatively different from recurrences 1–3: it happened **1–2 days AFTER invariant 29 was codified** at P.W6 (`3310a8c`, 2026-05-16). Commits 2–7 (`099d51e` through `d244dd5`) landed 2026-05-17 → 2026-05-18. The invariant text was written; the anti-pattern reproduced within 48 hours.

This is the diagnostic signal the Q tranche must address. The failure mode is not ignorance of the invariant — it is that prose-only enforcement has no execution-time friction. A commit-message or pre-push git hook that fails closed when a commit lands on master without an open `docs/tranches/<LETTER>/` folder would have interrupted recurrences 3 and 4. The stash anti-pattern's arc (7 prose recurrences → P.W2 fail-closed script) is the canonical precedent; the shadow-execution anti-pattern is now at recurrence 4 with prose-only enforcement. Q W0 Lane B authors the diagnosis and tooling-gate proposal; a new invariant codifies at Q close.

## §8 — Net substrate delta P → AB+2

- **1 surface retired** — `src/freshness.ts` + `scripts/freshness-gate.mjs` + `scripts/freshness-walk.mjs` + the `./freshness` subpath export from package.json. Net: −342 LOC, −1 subpath. Shrinkage.
- **1 dock.css region retired** — horizontal + vertical edge-fade `mask-image` rules. Net: −15 net LOC in dock.css.
- **1 timeline rewrite** — ContinuousTimeline: per-region gradient → single rail-spanning stitched gradient; rounding anchored to first/last region; dot upgraded to glass primitive with CSS-custom-property knobs (`--timeline-dot-fill`, `--timeline-dot-blur`, `--timeline-dot-ring`, `--timeline-dot-tint-*`). +276 net LOC across 3 files.
- **1 CVA compound rule** — `<ToggleGroupItem variant="card">` compound rule re-asserts `h-auto` over the `size` axis default.
- **1 dock-layer hit-test fix** — `.dock-layer-item-host` + `.dock-layer` inactive state gains `visibility: hidden` with delayed transition; layout box preserved for FLIP width measurement.
- **1 new prop** — `MetricStack.register: "audacious" | "result"` (default `"audacious"`; additive; back-compatible).
- **1 new CSS token** — `--metric-row-value-clamp-cqi` (routes the previously hard-coded `34cqi` clamp arm; consumers opt the result register down without reaching into source).
- **1 new token family** — `--metric-row-label-clamp-{min,cqi,max}` (4 tokens; label-clamp parameterisation matching the value-clamp family; defaults preserve audacious-poster behaviour bit-for-bit).
- **1 new DataTable prop** — `responsive?: boolean` + `cardBreakpoint?: number` (container-driven via `useElementSize`; collapses to stacked card-per-row at narrow widths; first column = card header; remaining columns = label/value pairs).
- **+18 test specs** — MetricStack/MetricRow test additions (`9ba68ca` +18 specs).
- **ZERO new subpath exports** — all substrate additions land on existing subpaths.
- **ZERO consumer breaks** — every change is additive or is a transparent behavioural fix.

## §9 — Authority

- This file (`docs/tranches/AB+2/AB+2.md`).
- Per-wave specs: `docs/tranches/AB+2/waves/W{1,2,3}.md`.
- Close report: `docs/tranches/AB+2/FINAL.md`.
- Execution log: `docs/tranches/AB+2/PROGRESS.md`.
- Cross-repo coordination: `docs/tranches/AB+2/coordination/CONSTELLATION.md`.
- Proof of retrospective authoring: `docs/tranches/Q/audit/W0-Lane-A-ab2-retrospective.md`.
- Source research: `docs/tranches/Q/research/Qepsilon-recap-chronic-retrospective.md`.
- Predecessor close: `docs/tranches/P/FINAL.md` (v1.8.4 close ledger).
- Successor open: `docs/tranches/Q/Q.md` (Qε recap surfaces the cohort).
