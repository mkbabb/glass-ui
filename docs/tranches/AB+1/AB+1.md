# AB+1 — speedtest AC.W6 + AC.W8e absorption cohort (v1.5.0 → v1.7.0)

**Tranche letter**: AB+1.
**Predecessor close**: O `8e741ba` (v1.4.1).
**This close**: v1.7.0 (package.json bumped at `b201b03`; ceremonial git tag deferred to P.W0 Lane B).
**Span**: 2026-05-14 (single calendar day; 18:52 → 22:08 UTC-4).
**Open commit**: n/a (shadow-execution — no plan-folder authoring at execution time).
**Close commit**: n/a (close ceremony executes retroactively at P.W0 Lane A).

**Authored retroactively at P.W0 Lane A (2026-05-16)** per K invariant 3 (no tranche-letter shadow execution). The work shipped through commit messages and release notes between `4660a0d` (2026-05-14 18:52) and `b201b03` (2026-05-14 22:08); this plan folder closes the precept loop without rewriting history.

## §1 — Thesis

AB+1 is the **post-hoc tranche-letter attribution** for the v1.5.0 → v1.7.0 speedtest-AC-W6-driven cohort. Twelve library-side commits absorbed five speedtest-AC sub-waves (W6a docs → W6b font subsystem → W6c chassis cascade → W6d primitive trio + a11y → W8e secondary primitive trio) across a single calendar day, shipping three minor releases (v1.5.0, v1.5.1, v1.6.0) and one untagged minor bump (v1.7.0).

The cohort was driven entirely from the speedtest side — every commit subject cites an `AC.W*` wave identifier; every release note cross-references a speedtest tranche artefact. Glass-ui consumed and absorbed the substrate without authoring its own wave specs at execution time, replicating the V (2026-05-06 → 2026-05-08) and AB (post-O.W0 retrospective) shadow-execution pattern. This is the **third recurrence** of the K-invariant-3 anti-pattern (V → AB → AB+1).

The work itself is high-quality and consumer-binary-transparent (font subsystem ships with calibrated fallbacks; chassis cascade is additive; primitive trio ships with subpath publication + tests). The retrospective documents what landed — it does NOT propose changes. Per P invariant 5, every substrate addition named below IS the canonical baseline.

## §2 — Inherited invariants from O (27 at O close)

O closed at `8e741ba` (v1.4.1) with 27 invariants codified (precept submodule `46ee7e9`). All 27 bind through AB+1 unchanged:

1-23 from C → N (KISS, no quick fixes, no workarounds, no legacy code, no silent deferrals, consumed substrate, evidence > claims, J token-first, J component-over-CSS-class, J visual-load-bearing-ness, K invariant 3 no-tranche-letter-shadow-execution, K W0 hardened agent git clause, L vueuse-FREE root barrel, L subpath publication binary, L migration guide binding, L substrate-without-consumer binary, M.Rδ canonical multi-peer manifest, N invariant 22 audit-verdict spot-verification gate, N invariant 23 wire-before-retire posture, N stash-anti-pattern recurrence-window).

24. **Fail-explicit migrations** — no silent null-fallbacks at consumer boundaries (O.W1).
25. **Typed-key DI with paired strict/optional helpers** — `InjectionKey<T>` + `provideX(ctx)` + `useX()` + `useOptionalX()` (O.W2).
26. **Test files outside src/** — `__tests__/` co-located, never `*.spec.ts` in src/ proper (O.W1 Lane E).
27. **Tooling-side stash enforcement** — `scripts/audit-stash-list.mjs` or equivalent fail-closed shell command, runs canonical at every ι sweep (O.W7 ι).

AB+1 introduced ZERO new invariants. The cohort additively extended the substrate (font subsystem, chassis cascade, 5 new primitives, 4 new subpaths) without touching the invariant set.

## §3 — Wave schedule (5 retrospective sub-waves)

| Wave | Title | AC mapping | Commits | Tag | Status |
|---|---|---|---|---|---|
| W1 | Typography self-host policy docs | AC.W6a | `4660a0d` | (pre-tag) | COMPLETED RETROACTIVELY |
| W2 | OFL font subsystem + v1.5.0 release | AC.W6b | `2474440` + `8246e07` | v1.5.0 | COMPLETED RETROACTIVELY |
| W3 | `--phase-color-label` chassis cascade + v1.5.1 release | AC.W6c | `099910d` | v1.5.1 (implied) | COMPLETED RETROACTIVELY |
| W4 | Primitive trio + timeline a11y + v1.6.0 release | AC.W6d | `8bf51c4` + `bb1f15b` + `12e7f55` + `d813c63` + `e238862` + `7ddb260` | v1.6.0 | COMPLETED RETROACTIVELY |
| W5 | Secondary primitive trio + v1.7.0 untagged bump | AC.W8e | `8dad58d` + `b201b03` | v1.7.0 (UNTAGGED at HEAD) | COMPLETED RETROACTIVELY; tag deferred to P.W0 Lane B |

Per AB precedent (post-O.W0 retrospective) and V precedent (K.WV retrospective), the wave structure here is reconstructed from speedtest-side AC wave numbering. No W0 (no formal dispatch precept update — that absence IS the precept violation P.W0 Lane A codifies). No W7 close ceremony (the close lives in P.W0 Lane A FINAL.md).

## §4 — Inheritance ledger (what AB+1 absorbed from O)

AB+1 absorbs three specific cross-tranche carries from O FINAL.md §5:

| O ID | Item | AB+1 disposition |
|---|---|---|
| CR-7 | Fira Code woff2 binary fetch (`src/fonts/` placeholder shipped at O.W6 Lane D) | **LANDED at AB+1.W2** — `2474440` ships both `fira-code-latin.woff2` (36 KB) + `fira-code-latin-ext.woff2` (13 KB) alongside `plus-jakarta-sans-latin*.woff2` (49 KB combined). CR-7 retires at AB+1.W2. |
| (implicit O.W6 Lane D) | AC.W6 cohort full library-side substrate landing | **LANDED at AB+1.W2 + W3 + W4** — v1.5.0 (font), v1.5.1 (chassis cascade), v1.6.0 (primitive trio). |
| (implicit O.W6 Lane D extension) | AC.W8e secondary primitive cohort | **LANDED at AB+1.W5** — v1.7.0 (`<MetricCell>` + `<ResponsiveTabs>` + `<ToggleGroupItem variant="card">`). |

AB+1 introduced ZERO new cross-tranche carries to P. Every absorbed item landed; the only residual was the v1.7.0 ceremonial git tag, which P.W0 Lane B places.

## §5 — Cross-repo origin (speedtest AC tranche)

Every glass-ui-side commit in AB+1 traces to a speedtest-AC sub-wave. The mapping (verbatim from `docs/tranches/P/coordination/CONSTELLATION.md §6`):

| AC sub-wave | Glass-ui-side absorb | Glass-ui commit | Glass-ui tag |
|---|---|---|---|
| AC.W6a | Self-host font policy doc subsection | `4660a0d` | (pre-tag) |
| AC.W6b | Fira Code + Plus Jakarta Sans OFL self-host | `2474440` + `8246e07` | v1.5.0 |
| AC.W6c | `--phase-color-label` cascade (WCAG label register) | `099910d` | v1.5.1 |
| AC.W6d (F2.I-04) | Timeline `::before inset -15px` (44×44 WCAG hit area) | `8bf51c4` | (rolled into v1.6.0) |
| AC.W6d (primitives) | MetricRow + MetricStack + AnimatedDigit | `bb1f15b` | v1.6.0 |
| AC.W6d (design) | Custom-prop cascade pattern + primitive catalog | `12e7f55` | (rolled into v1.6.0) |
| AC.W6d (ergonomics) | MetricStack `as` prop TransitionGroup support | `d813c63` | (rolled into v1.6.0) |
| AC.W8e | MetricCell + ResponsiveTabs + ToggleGroupItem card variant | `8dad58d` | v1.7.0 (UNTAGGED at HEAD; P.W0 Lane B tags) |

The two release-ceremony commits (`8246e07` v1.5.0 + `e238862` v1.6.0) and the doc cross-reference (`7ddb260`) are library-internal artefacts paired to the AC sub-wave landings; the v1.7.0 bump (`b201b03`) sits in the same role for AC.W8e but never received its git tag.

Coordination per `docs/tranches/AB+1/coordination/CONSTELLATION.md`. Speedtest's AC tranche owns its own close ceremony — glass-ui owns only the substrate side.

## §6 — Versioning cadence

```
O close:        v1.4.1   (2026-05-14 close commit 8e741ba)
                  |
W1 close:       (pre-tag — docs-only)        4660a0d  (AC.W6a)
W2 close:       v1.5.0   minor — OFL font self-host subsystem  (AC.W6b)
W3 close:       v1.5.1   patch — chassis label-register cascade  (AC.W6c)
W4 close:       v1.6.0   minor — primitive trio + WCAG hit area  (AC.W6d)
W5 close:       v1.7.0   minor — secondary primitive trio + card variant  (AC.W8e) — UNTAGGED at HEAD
                  |
P.W0 Lane B:    v1.7.0 ceremonial tag placed retroactively (canonical gate matrix runs)
```

Total: 4 tags planned (v1.5.0 + v1.5.1 + v1.6.0 + v1.7.0); 3 placed at execution (v1.5.0 + v1.5.1 + v1.6.0); 1 deferred to P.W0 Lane B (v1.7.0).

The v1.5.1 tag is the third tag chronologically and lives between commits `099910d` (the cascade feature) and `8bf51c4` (the W4 opener). Per `git tag --list v1.*` it exists in the local + remote tag set; the AB+1 retrospective does NOT re-tag.

## §7 — Process gap (the third K-invariant-3 recurrence)

NO plan folder existed at execution time. Twelve commits landed direct-to-master citing speedtest-AC wave numbers across a single calendar day; no `docs/tranches/AB+1/` substrate existed at any point during the 2026-05-14 18:52 → 22:08 window. This violates K invariant 3 verbatim ("a tranche letter cited in commit messages must trace to a plan folder" — LL 2026-05-06; codified at `docs/precepts/instructions/LESSONS-LEARNED.md` l. 466).

This is the third recurrence:

| # | Tranche | Detection | Closure |
|---|---|---|---|
| 1 | V (2026-05-06 → 2026-05-08; 68 commits / 5 releases) | K.W reconciliation 2026-05-08 | K.WV retrospective at `docs/tranches/V/V.md` |
| 2 | AB (post-N close; pre-O open) | O.W0 Lane A | O.W0 retrospective at `docs/tranches/AB/` |
| 3 | AB+1 (2026-05-14 single-day cohort; 12 commits / 3 tags + 1 untagged bump) | Pζ recap-chronic-defer-fold | P.W0 Lane A retrospective (this folder) |

### Rationale — why P.W0 absorbs the retrospective

Per Pζ §3.3, the retrospective folder is named `docs/tranches/AB+1/` (not a new letter) because:

1. **Commit-message attribution is authoritative** — `b201b03` subject verbatim: `chore(release): v1.7.0 — AB+1 substrate cohort (speedtest AC.W8e)`. Future agents reading `git log` would not find a plan folder at the cited name if renamed.
2. **Pattern precedent** — V retrospective lives at `docs/tranches/V/`; AB retrospective lives at `docs/tranches/AB/`. AB+1 extends the literal-commit-attribution convention.
3. **K invariant 3 binding** — the plan-folder name MUST match the tranche letter cited.

### Codification — invariant 29 at P close

P.W0 Lane A surfaces a new precept candidate for the P close ceremony: **invariant 29 — AB+1 retrospective discipline / third-strike codification**. The proposed shape (final phrasing decided at P close):

> When a substrate cohort lands ≥ 5 commits OR ≥ 1 release tag under a tranche-letter identifier with no plan folder authored at execution time, the next-tranche open MUST author the retrospective in its W0 HEADLINE before any other lane dispatches. The plan-folder name matches the committed tranche-letter identifier verbatim. Three recurrences (V → AB → AB+1) establish the binding pattern.

The invariant codifies at P close pending Pζ + P round-1 audit synthesis. AB+1 retrospective itself is the evidence path.

## §8 — Authority

- This file (`docs/tranches/AB+1/AB+1.md`).
- Per-wave specs: `docs/tranches/AB+1/waves/W{1..5}.md`.
- Close report: `docs/tranches/AB+1/FINAL.md`.
- Execution log: `docs/tranches/AB+1/PROGRESS.md`.
- Cross-repo coordination: `docs/tranches/AB+1/coordination/CONSTELLATION.md`.
- Proof of retrospective authoring: `docs/tranches/P/audit/W0-Lane-A-AB+1-retrospective.md`.
- Source CHANGELOG entries: v1.5.0 + v1.5.1 + v1.6.0 + v1.7.0.
- Predecessor close: `docs/tranches/O/FINAL.md` (v1.4.1 close ledger).
- Successor open: `docs/tranches/P/findings.md` (Pζ recap surfaces the cohort).
- Pζ research: `docs/tranches/P/research/Pzeta-recap-chronic-defer-fold.md` (the HEADLINE that surfaced the 12-commit cohort).
