# I — FINAL

**Opened**: 2026-05-05 against H close `c5f196c`
**Closed**: 2026-05-06 at HEAD (W7 absorb)
**Thesis**: substrate convergence to steady-state + visual-audit promotion + chronic-deferral closure.

I is the convergence-and-resolution tranche. G expanded; H trimmed G's additions; I trimmed the *whole library* (not just G additions) to steady state, codified the 6-agent post-close audit pattern as binding precept, resolved seven architectural tensions, and closed every chronic-deferral row that had bounced through ≥ 2 prior tranches.

## Wave-by-wave close

| Wave | Title | Commit | Hard gate |
|---|---|---|---|
| W0 | Reconciliation audit + 6-agent close precept | `c3bf0a2` | 21 ζ rows + 60 β + 21 γ + 11 δ disposed; submodule pin bumped `cc57c91 → 67c1412` (3 files updated: SPEC.md `## Close` 4-agent → 6-agent + visual-runtime caveat; AGENT_DISPATCH_TEMPLATE.md bundle-budget non-negotiable; LESSONS-LEARNED.md +3 entries) |
| W1+W2 | Surface trim wave 2 + alias retire + diary scrub + runtime fixes | `35773c4` | 6 packages retired (MultiSelect, TagsInput, GlassPanel, MetaballCanvas+Metaballs, PaperBackdrop, StatusDot); 6 slot-class props; 9 round-trip alias families retired single-direction; --accent-pink retired; 20 token-orphans retired; 31 recovery-diary leaks scrubbed; lint.yml CI guard; 8 evidence docs (5 cross-tranche silent-add + 3 sub-bar CVA); shimmer matrix array-binding fix; 3 failing public-surface tests fixed; Tabs provide/inject re-verified |
| W3 | Architectural tension resolution | `987fc41` | DESIGN.md gains Substrate Hierarchy + Story Fidelity Policy + Accessibility Posture sections; CLAUDE.md gains Design Axes section; Card cream variant retired (`<CreamSurface>` canonical); cartoon recipe hoist (4× CVAs → 1 `@utility cartoon-surface`); NumberField provide/inject (Tabs precedent); dock keep-open single sink via new `_internal/dockKeepOpenSink.ts`; --easing-accent → --accent-color library-wide; sliderVariants CVA; 5 formal-deferral entries (R4, R5, plugin extraction, a11y deeper sweep, C-8 blob double-rAF) |
| W4 | R-NEW-1 41-story aesthetic uplift | `864e882` | 32 stories repaired with canonical wrapper (CreamSurface + DisplayHero + FlourishDivider + section accent). Pre-W4 41-list reduced by 3 W1 retires + 3 foundations specimen-quiet exemptions per W3.α policy |
| W5 | Doc reconciliation wave 2 | `73c40fa` | 24 γ doc-fix items absorbed (21 H-named + 3 since-H additions); D/W4 + D/W5 + E/W0 wave-spec Status: line retroactives; 3 R-NEW-3 D-tranche evidence-doc Source paths refreshed |
| W6 | Performance + bundle infrastructure | `63e29e4` | 9 zero-payload subpath candidates KEPT (cross-repo speedtest evidence); bundle-budget gate (lint.yml `bundle-budget` job, `continue-on-error: true` soft-fail); current PASS at 92.2% raw / 94.7% gz JS, 93.3% raw / 92.1% gz CSS; ay-close.sh retired |
| W7 | Close ceremony + 6-agent post-close audit | (this commit) | 6-agent audit (α/β/γ/δ/ε/π) returned: 3 absorbable findings; absorb landed in W7 (button.ai + card.subtle CVA branches retired; 3 sub-bar CVA evidence docs emitted; DESIGN.md catalogs synced; PROGRESS.md status table updated; README peer-dep table extended to 11; wave-spec parentheticals canonicalized) |

## Substrate convergence

- **Library-orphan retires (W1)**: 6 ui/custom packages + 6 slot-class props + 20 token-orphans + 9 alias families + --accent-pink + 2 W7-absorb CVA branches (button.ai, card.subtle) = **44 retires**
- **Subpath retires (W6)**: 0 (all 9 zero-payload candidates have cross-repo speedtest consumers; KEEP under invariant 3)
- **Story uplifts (W4)**: 32 of 41 NEEDS-REPAIR (3 retired in W1 alongside their packages; 3 foundations specimen-quiet permitted by W3.α policy)
- **Cross-tranche silent-addition ownership (W1.B)**: 5 packages (4 P-tranche `instrument-chassis`, `glyph-face`, `disco-glyph`, `dock-group` + 1 Q-tranche `hover-popover`) — all WIRE with evidence docs

## Process hardening

Three precept-submodule updates landed at W0 (`67c1412`):

1. `tranche/SPEC.md ## Close`: 4-agent → 6-agent post-close audit (α plan-vs-actual + β substrate-without-consumer + γ doc-drift + δ idiomatic-gestalt + ε performance + π visual-runtime). Visual-runtime lane is binding for visual-shipping tranches; documentation-only / backend-only tranches may skip with wave-spec justification.
2. `tranche/AGENT_DISPATCH_TEMPLATE.md` Non-negotiables: bundle-budget regressions trigger soft-fail in CI; non-trivial regressions require justification.
3. `LESSONS-LEARNED.md`: +3 entries (read-only audits miss tailwind-merge interactions; cross-tranche silent surface additions need owning tranche; recovery-diary scrub binary at close).

CI workflow `.github/workflows/lint.yml` lands per the 6-agent precept binding:
- `recovery-diary-scrub` (hard-fail; canonical grep)
- `typecheck` (hard-fail; combined typecheck + test)
- `bundle-budget` (soft-fail per invariant 8; `continue-on-error: true`)

## Architectural tensions resolved

| Tension | Resolution |
|---|---|
| Substrate-tier hierarchy (paper / cream / glass each had 2-3 paths) | Cream COLLAPSED (Card cream variant retired; `<CreamSurface>` canonical). Paper + Glass DOCUMENTED as named hierarchies in DESIGN.md (Card variant + utility ladder serve distinct roles). |
| Story-fidelity bifurcation | DOCUMENTED in DESIGN.md ## Story Fidelity Policy: bold-maximalist canonical for compositions / containers / motion / primitives; foundations specimen-quiet permitted for utility-spec showcase. |
| F instrument-cluster axis vs G design-language axis | DOCUMENTED in CLAUDE.md ## Design Axes: 3 named axes (Glass tier, Design language, Instrument-cluster) with package belongings. |
| Cartoon recipe duplicated 4× across CVAs | COLLAPSED to one `@utility cartoon-surface` consumed by Button + Select + Input + NumberField; cream/cream-warm divergence reconciled to `--cream-warm`. |
| NumberField descendant-attr-selector outlier | REFACTORED to provide/inject pattern per Tabs precedent. |
| `--easing-accent` overload (color masquerading as easing) | RENAMED to `--accent-color` library-wide. |
| Slider scoped-CSS variants vs CVA convention | sliderVariants CVA dispatches to `glass-slider--{variant}` modifier classes; scoped CSS retained for CSS-custom-property fallback contracts (consumer override semantics preserved). |
| Dock keep-open dual-authority (DockPopover function-keys vs Slider sink) | DockPopover migrated to sink-based API; raw `'dockKeepOpen'`/`'dockRelease'` injection keys deleted; new `_internal/dockKeepOpenSink.ts` is single authority. |

## Chronic-deferral closure

21/21 chronic-deferral rows from W0 reconciliation §1 disposed:

- **5 WIRE**: R-NEW-1 (W4); R-NEW-3 (W5); bundle-budget soft-fail (W6); recovery-diary scrub + CI guard (W1); a11y posture statement (W3)
- **7 RETIRE**: --cartoon-shadow* aliases (W1); --accent-pink (W1); cartoon recipe 4× (W3); NumberField descendant-selector (W3); Card cream variant (W3); dock keep-open dual-authority (W3); ay-close.sh (W6)
- **3 formal DEFER (permanent)**: R4 Filmstrip (consumer-territory); R5 Blob Web Worker (encoded but unreachable on M4 Max); plugin extraction (consumer-territory)
- **6 RESOLVED already** at W0 reconciliation: Tabs provide/inject (Σ-1 false-positive correction); 101 C.W0 candidates; R6; R1/R7 DESIGN.md; R2 stress baseline; R3 Slider glass-track + dock sink

## Cross-tranche debt + named-destination residuals

The I residue list is intentionally short because chronic deferrals folded inward:

- `docs/instructions/README.md:17` proof commands stale — deferred to next precept-submodule update (W5 rec 16 named).
- API Extractor dts caching path — escalated to future tranche (W6 §4 documented; 14_089 ms baseline acceptable for now).
- Subpath cohort: 9 zero-payload subpaths kept on cross-repo speedtest evidence — future hard-fail target if speedtest migrates to main-barrel imports.

No silent deferrals. No new chronic items.

## Brittleness windows

**None opened during I.** All waves closed green; no suspended gates; no restoration waves.

## Verification at close

- `npm run typecheck` — green
- `npm run build` — green (16.02s; dts 15.3s)
- `npm run test` — 266/266
- `npm run profile:budget` — PASS (92.2% raw / 94.7% gz JS; 93.3% raw / 92.1% gz CSS)
- canonical recovery-diary grep — 0 hits
- `--cartoon-shadow` alias grep — 0 hits
- `--accent-pink` grep — 0 hits
- `--easing-accent` grep — 0 hits
- raw `'dockKeepOpen'` / `'dockRelease'` grep — 0 hits
- Playwright probe (5 surfaces: foundations/flourishes, primitives/buttons, primitives/slider-glass-track, containers/dialog, compositions/dashboard) — 0 console errors / 0 warnings; shimmer matrix repair runtime-confirmed; W4 wrapper renders without regression; sliderVariants CVA + dock keep-open sink work end-to-end

## Audit deliverables

W7 6-agent post-close audit:
- `audit/I-audit-α-plan-vs-actual.md` — verdict FOUND-3 (absorbed); 21/21 chronic disposed; 12/12 invariants honored
- `audit/I-audit-β-substrate.md` — 0 runtime library-orphans; 9 sub-bar flagged → on re-grep, 2 retired (button.ai, card.subtle), 3 evidence-docs emitted, 4 cleared ≥ 2 bar
- `audit/I-audit-γ-doc-drift.md` — FOUND-8 → 5 critical absorbed, 3 lower-severity addressed
- `audit/I-audit-δ-idiomatic-gestalt.md` — CLEAN
- `audit/I-audit-ε-performance.md` — CLEAN
- `audit/I-audit-π-visual-runtime.md` — CLEAN

## Authority

I closes clean. Substrate is at steady state. Process precepts canonicalized. The 6-agent post-close audit pattern is now binding for all subsequent tranches via `docs/precepts/` submodule pin `67c1412`.
