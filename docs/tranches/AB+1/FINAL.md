# AB+1 — FINAL (speedtest AC absorption cohort; v1.4.1 → v1.7.0)

**Tranche letter**: AB+1.
**Predecessor close**: O `8e741ba` (v1.4.1).
**This close**: v1.7.0 (package.json bump at `b201b03`; ceremonial git tag placed at P.W0 Lane B).
**Span**: 2026-05-14 (18:52 → 22:08; single calendar day; ~3.5 hours wall clock).
**Open commit**: n/a (shadow execution).
**Close commit**: retroactive at P.W0 Lane A (2026-05-16).

## §1 — Thesis recap

AB+1 absorbed five speedtest-AC sub-waves (W6a → W6b → W6c → W6d → W8e) across one calendar day. Twelve library-side commits landed substrate, three minor releases tagged (v1.5.0 / v1.5.1 / v1.6.0), and one minor bump (v1.7.0) shipped untagged. The cohort was driven entirely from speedtest's AC tranche — every commit subject cites an `AC.W*` wave identifier; the library-side execution served as substrate provider for the consumer-side AC migration.

The cohort was **shadow-executed** — no `docs/tranches/AB+1/` plan folder existed at execution time. This retrospective closes the K-invariant-3 loop for the third recurrence (V → AB → AB+1) at P.W0 Lane A (2026-05-16).

## §2 — Per-wave landing summary

| Wave | Commits | Tag | Headline |
|---|---|---|---|
| W1 | `4660a0d` | (pre-tag) | DESIGN.md self-host font policy anchor (AC.W6a Path-1 docs-only) |
| W2 | `2474440` + `8246e07` | **v1.5.0** | OFL font self-host (Fira Code + Plus Jakarta Sans woff2 + Capsize calibration); CR-7 from O closes here |
| W3 | `099910d` | **v1.5.1** | `--phase-color-label` chassis cascade (WCAG label register OKLCH L≈0.40 routed through `data-phase` selector) |
| W4 | `8bf51c4` + `bb1f15b` + `12e7f55` + `d813c63` + `e238862` + `7ddb260` | **v1.6.0** | Primitive trio (MetricStack / MetricRow / AnimatedDigit) + timeline 44×44 WCAG hit area + custom-prop cascade docs + `as` prop ergonomics |
| W5 | `8dad58d` + `b201b03` | **v1.7.0 UNTAGGED at HEAD** | Secondary primitive trio (MetricCell / ResponsiveTabs / ToggleGroupItem card variant); tag placement deferred to P.W0 Lane B |

Total: 12 commits / 4 tags planned / 3 tags placed at execution / 1 tag deferred to P.W0 Lane B.

## §3 — Tag chain (the 4-tag cohort)

```
v1.4.1 (O close)
   |
   |--- 2474440 + 8246e07
   v
v1.5.0 — OFL font self-host subsystem (AC.W6b)
   |
   |--- 099910d
   v
v1.5.1 — phase-color-label cascade (AC.W6c)
   |
   |--- 8bf51c4 + bb1f15b + 12e7f55 + d813c63 + e238862 + 7ddb260
   v
v1.6.0 — primitive expansions cohort (AC.W6d)
   |
   |--- 8dad58d + b201b03
   v
v1.7.0 — AB+1 substrate cohort (AC.W8e) — UNTAGGED at HEAD; P.W0 Lane B places
```

Tag verification at retrospective authoring time: `git tag --list 'v1.[5-7].*' | sort -V` returns `v1.5.0 / v1.5.1 / v1.6.0` (3 of 4). v1.7.0 absent until P.W0 Lane B.

## §4 — Cross-repo origin (speedtest AC tranche)

The AB+1 cohort exists because speedtest's AC tranche (in-flight at P open) drove a substrate-need sequence:

| Speedtest AC sub-wave | Library substrate delivered | Library tag |
|---|---|---|
| AC.W6a | Self-host font policy doc (subsection only) | (pre-tag) |
| AC.W6b | OFL self-host: Fira Code + Plus Jakarta Sans woff2 + `src/fonts/` | v1.5.0 |
| AC.W6c | `--phase-color-label` cascade (chassis CSS-var) | v1.5.1 |
| AC.W6d | Timeline 44×44 hit-area fix + MetricRow + MetricStack + AnimatedDigit + `as` prop + custom-prop cascade docs | v1.6.0 |
| AC.W8e | MetricCell + ResponsiveTabs + ToggleGroupItem card variant | v1.7.0 (untagged) |

Speedtest's AC tranche owns its own close ceremony — glass-ui owns only the substrate side. AC consumer-side adoption status is reviewed read-only at P.W5 (CR-6 per Pζ §2.2).

## §5 — Audit verdict matrix

AB+1 did not run a strengthened audit at execution time (no W6 / W7 close ceremony — shadow-execution). The retrospective audit at P.W0 Lane A verifies the substrate side using the read-only `git show --stat` cross-walk plus the cited test counts in commit bodies.

| Lane | Verdict | Notes |
|---|---|---|
| α plan-vs-actual | RETROACTIVE-CLEAN | All 12 commit subjects map to a wave in §2; all 4 tags map to a release-ceremony commit; v1.7.0 carries to P.W0 Lane B as named-destination |
| β substrate-without-consumer | RETROACTIVE-CLEAN | All 5 new primitives (MetricStack / MetricRow / AnimatedDigit / MetricCell / ResponsiveTabs) cite ≥ 2-consumer constellation evidence via speedtest AC + planned downstream adoption; ToggleGroupItem card variant promoted from speedtest FlowSelector recipe |
| γ doc-drift | MINOR — CARRIED to P.W0 Lane C | The 4 new subpaths and 5 new custom packages were not propagated to CLAUDE.md counters at execution time; P.W0 Lane C absorbs (already in P plan) |
| δ idiomatic-gestalt | RETROACTIVE-CLEAN | Substrate ships clean breaks (no `_legacy` / no shim); primitives use co-located `__tests__/`; subpaths follow flat-publication shape; tokens consume the chassis cascade pattern documented at `12e7f55` |
| ε performance | RETROACTIVE-NEUTRAL with FONT-DELTA | Bundle delta ~98 KB woff2 at v1.5.0; CSS budget at 95.7% raw post-O likely grew with v1.6 + v1.7 — P.W0 Lane C rebaselines per P-2 ledger entry |
| π visual-runtime | NOT-RUN | MCP Chrome bridge tooling unreachable across the AB+1 window (carry from N + O) — π escalation belongs to P close |
| ι integrity-sweep | RETROACTIVE-CLEAN | Zero orphan stash across the AB+1 window; zero unauthorized commits; v1.7.0 untagged is the single integrity-flag, named-destination P.W0 Lane B |

## §6 — Hard-gate evidence (retroactive)

Per K + L + O hard-gate canonical shape:

- **(a) Per-wave hard gates verified retroactively at each `waves/W*.md`** ✓ — see W1–W5 specs §"Hard gate (verified retroactively)".
- **(b) Tag chain v1.5.0 + v1.5.1 + v1.6.0 placed at execution** ✓ — `git tag --list` confirms.
- **(c) v1.7.0 ceremonial tag named-destination = P.W0 Lane B** ✓ — `docs/tranches/P/waves/W0.md` Lane B spec authorizes.
- **(d) Cross-repo origin documented at `docs/tranches/AB+1/coordination/CONSTELLATION.md`** ✓.
- **(e) FINAL.md authored per close-honesty checklist (post-hoc verification)** ✓ — this file.
- **(f) K-invariant-3 third-recurrence closure rationale documented at AB+1.md §7** ✓.

## §7 — Carry-forward to P

AB+1 close is retroactive at P.W0 Lane A. The retrospective surfaces ZERO P-residuals from AB+1 itself — every absorbed item already landed at execution. The single carry (v1.7.0 ceremonial tag) folds into P.W0 Lane B at P open, which the P plan absorbs by design.

| # | Item | Source | P destination |
|---|---|---|---|
| (sole carry) | v1.7.0 ceremonial git tag | AB+1.W5 (`b201b03`) | **P.W0 Lane B** — canonical gate matrix runs (typecheck + build + verify-export-types + profile:budget + tests) then orchestrator places + pushes tag |

ZERO ITEMS exit AB+1 close as "deferred". ZERO PERMANENT-DEFERs. The named-destination shape (P.W0 Lane B) was authored simultaneously with this retrospective.

## §8 — Net substrate delta O → AB+1

- **1 new font subsystem** — `src/fonts/` populated with Fira Code + Plus Jakarta Sans OFL faces (latin + latin-ext woff2; Capsize-calibrated fallback metrics; ~98 KB total).
- **1 new chassis CSS-var cascade** — `--phase-color-label` parallel to `--phase-color`; routes `--chart-{phase}-label` (WCAG OKLCH L≈0.40) through `data-phase` selector.
- **3 new tokens** at `tokens.css` — `--timeline-dot-size-touch` + `--timeline-touch-target` + the pointer-coarse override path.
- **5 new custom primitives** — `<MetricStack>` + `<MetricRow>` + `<AnimatedDigit>` (at v1.6.0); `<MetricCell>` + `<ResponsiveTabs>` (at v1.7.0).
- **4 new flat subpaths** — `/metric-stack` + `/animated-digit` + `/metric-cell` + `/responsive-tabs`.
- **1 new CVA variant** — `<ToggleGroupItem variant="card">` extending the existing toggle CVA `variant` union.
- **1 a11y substrate** — timeline `::before inset -15px` for 44×44 WCAG 2.5.5 target-size compliance at `ContinuousTimeline` + `SegmentedTimeline`.
- **+13 test specs** — `MetricStack`/`MetricRow` 8 + `AnimatedDigit` 5; total 348 → 361 at v1.6.0.
- **DESIGN.md additions** — Self-host font policy subsection + canonical matrix; custom-prop cascade pattern; 3 primitive catalog entries; timeline a11y contract; timeline token table extension.
- **CHANGELOG additions** — v1.5.0 + v1.5.1 + v1.6.0 + v1.7.0 entries + AC.W6/W8e cross-reference header.
- **ZERO retirements** at the public surface; ZERO consumer breaks; the cohort is additive end-to-end.

## §9 — Authority

- This file (`docs/tranches/AB+1/FINAL.md`).
- Plan: `docs/tranches/AB+1/AB+1.md`.
- Per-wave specs: `docs/tranches/AB+1/waves/W{1..5}.md`.
- Execution log: `docs/tranches/AB+1/PROGRESS.md`.
- Cross-repo coordination: `docs/tranches/AB+1/coordination/CONSTELLATION.md`.
- Proof of retrospective authoring: `docs/tranches/P/audit/W0-Lane-A-AB+1-retrospective.md`.
- Source CHANGELOG entries: v1.5.0 + v1.5.1 + v1.6.0 + v1.7.0.
- Predecessor: `docs/tranches/O/FINAL.md`.
- Successor open: `docs/tranches/P/findings.md`.
- Pζ research: `docs/tranches/P/research/Pzeta-recap-chronic-defer-fold.md`.
- Constellation reference: `docs/tranches/P/coordination/CONSTELLATION.md §6` (AB+1 cohort cross-repo origin table).

## §10 — Close honesty checklist (retroactive verification)

Per `tranche/SPEC.md §"Close-Honesty Checklist"`:

- [x] Every claim in FINAL.md grounded in a commit hash or a cited artefact at HEAD.
- [x] Every hard gate marked retroactive-MET has an evidence path that resolves (commit body / `git show --stat` / `git tag --list`).
- [x] Every status word (PLACED / UNTAGGED / DEFERRED / CARRIED) matches the latest git state at retrospective time (2026-05-16).
- [x] The single carry (v1.7.0 ceremonial tag) names its destination (P.W0 Lane B), not a generic "future tranche" placeholder.
- [x] Brittleness window: ZERO opened during AB+1 (each release shipped green; v1.6.0 ships 361 tests passing per `bb1f15b` body).
- [x] K invariant 3 third-recurrence rationale documented at AB+1.md §7.
- [x] Audit-verdict spot-verification gate (N invariant 22) honoured retroactively — every wave-spec hard-gate row cites a specific evidence path.

## §11 — Final disposition

**AB+1 tranche CLEAN at v1.7.0 (package.json) / UNTAGGED at HEAD.**

5 waves landed across one calendar day under shadow-execution. The substrate is additively complete; the retrospective closes the K-invariant-3 third-recurrence loop at P.W0 Lane A; the ceremonial v1.7.0 tag places at P.W0 Lane B. ZERO substrate carry from AB+1 to P; the sole carry is the tag placement itself.

The retrospective documents what landed. It does NOT propose changes.
