# N — Strategic wiring + targeted refinement (post-v1.0.5 hardening)

**Tranche letter**: N.
**Successor to**: M (closed `54a8acb`; v1.0.4 + v1.0.5 published; precept submodule `46d6cfb`).
**Cohort identity**: strategic wiring of under-wired primitives + targeted mobile/dock/typography refinement. First tranche to canonicalize the bidirectional style-audit + overfitting-audit fan-out as binding tranche-open research.
**Mode**: planning-only at this open (per user N-open directive "This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-12.
**Revised**: 2026-05-12 (KISS revision: pivot from addition-focused to pruning-focused).
**Re-revised**: 2026-05-13 (wiring revision: user corrected the prune verdicts — primitives are under-wired, not contrived; pivot from pruning to WIRING).

## §1 — Thesis (RE-REVISED per user wiring correction)

N is the **strategic wiring + targeted refinement tranche**. The HEADLINE (W0) is a 5-wire strategic batch: wire 5 under-wired primitives into their canonical first-or-second consumer site each. NO retirements, NO demo-privatizations — the original prune verdicts were audit failures (1 hallucination + 2 false positives + 1 missed-consumer).

Per user revised directive (2026-05-13): "useTouchGate is used, or it should be, within items like in keyframes.js's input sliders, dropdowns, etc? These should be used in our sliders, dropdowns, etc. Metaballs, paper-backdrop, and typewriter should be used elsewhere, too."

Per the corrected `audit/N-wiring-targets.md`:
- **useTouchGate**: GlassDock already consumes it (audit missed this); 8 additional wire targets identified (Slider, Select, DropdownMenu, Combobox, NumberField, Popover, TagsInput, MultiSelect)
- **metaballs / paper-backdrop / typewriter**: 4 / 5 / 5 wire targets identified (hero compositions, Section landmark, consumer hero composites)
- **/freshness**: V.W3 wire-claim never landed; 6 consumer vite.config.ts targets identified

Total: 28 wire-target sites across 5 primitives. Per KISS + V2 (NO workarounds) + V4 (architectural transpositions): N picks 5 STRATEGIC wires (1 per primitive; the canonical first-or-second consumer site each); 23 broader targets DEFERRED to O / per-consumer tranches.

The constellation audit returned a healthy verdict — **94% keep rate across 172 enumerated artefacts**. The library is NOT over-engineered. The corrected ledger surfaces ZERO truly-contrived items.

Targeted refinements (N6 mobile / N7 dock blur audit / N9 typography sweep) ship as supporting work; the N8 new `<DockMobileToggle>` primitive remains **DEFERRED pending explicit user authorization**.

## §2 — Binding invariants (RE-REVISED)

Inherits M's 20 invariants. Extends:

1-20. All 20 V-invariants from M held at HEAD (verified at Rζ §2).
21. **NEW @ N — Bidirectional style-audit + overfitting-audit canonical at tranche open** — 7-axis style audit per `docs/audits/style-audit.md` + overfitting audit per `docs/audits/overfitting-audit.md` runs at every tranche open as binding research. N codifies this in `tranche/SPEC.md` Research section.
22. **NEW @ N — Audit-verdict spot-verification gate (audit-failure prevention)** — before authoring a wave-spec that retires `delete-unused` or `library-orphan` items per an overfitting audit, the orchestrator MUST spot-verify (a) the item EXISTS at the cited path and (b) the rg count is accurate by re-running the audit's grep invocation. Hallucinations + missed-consumer counts are integrity-sweep blockers. The N KISS revision exposed three audit failures (1 hallucination, 2 false positives, 1 missed consumer); this invariant hardens the process. Codify in `tranche/SPEC.md` Close + `LESSONS-LEARNED.md`.
23. **NEW @ N — Wire-before-retire posture** — under-wired primitives (existing, useful-shaped, zero or low consumer count) are WIRE candidates by default; retirement requires explicit "no proper wiring target exists" rationale. Substrate-without-consumer (L invariant 8) remains binary at close, BUT the close-resolution branches are now (a) WIRE into ≥ 2 consumers, (b) RETIRE-with-rationale (truly contrived; no wiring target identifiable), (c) DEFER-with-named-destination. Default branch is (a).

## §3 — Wave schedule (RE-REVISED to 4 waves — wiring-headline)

| Wave | Opens after | Lanes | Hard gate (TL;DR) | Brittleness |
|---|---|---|---|---|
| **W0 HEADLINE** | open | 3 parallel (A strategic wire-batch [5 wires] + B precept-canonicalize invariants 21-23 + C audit-failure LESSONS-LEARNED entry) | 5 strategic wires landed (useTouchGate→Slider; metaballs→hero composition; paper-backdrop→Section landmark with backdrop="paper" variant; typewriter→hero headline; freshness→speedtest/vite.config.ts); precept submodule `46d6cfb → next` with invariants 21-23 + audit-failure clause; LESSONS-LEARNED entry for audit hallucinations; v1.0.6 patch tag | low (additive only) |
| **W1** | W0 close | 3 lanes (A glass-panel frosted-default verify + B `@utility text-micro` promotion + C typography literal sweep) | GlassPanel `"resting"` rendering verified at 3 viewports; `text-micro` ships; ad-hoc `text-[Xrem]` swept across demo+src | yes (typography sweep brittleness) |
| **W2** | W1 close (parallel with W3) | 2 lanes (A storybook viewport-meta + responsive root + B Configurator mobile density CVA + mobile-proof story) | `demo/index.html` viewport-meta; ConfiguratorRow density CVA branch ships; 1 mobile-proof story (configurator-mobile); dock-blur perceptual audit (N7; likely no-op) | yes (minor; CVA introduction) |
| **W3** | W1 close (parallel with W2) | (NONE — folded into W2; KISS revision dropped this wave) | — | — |
| **W4** | W2 close | 1 orch + 7 audit lanes (α/β/γ/δ/ε/π/ι) + 6-agent N11 consumer-audit-fan-out (re-run post-N substrate) | 7 audit lanes + 6 consumer audits return clean; FINAL.md authored; cross-constellation reflog clean | no |

**Critical path**: W0 → W1 → W2 → W4. 3 sequential edges. Peak parallelism at W4 (1 orch + 13 read-only audit + consumer lanes = within dual ceiling per V7).

**Deferred to future tranche (per user KISS posture)**:
- **N8** `<DockMobileToggle>` new primitive — pending explicit user authorization that the primitive is "genuinely useful". May be re-introduced at O tranche if user signals.
- **N-5** dock-layer regression fix — folded into N.W2 Lane A storybook polish IF the regression intersects the configurator mobile work; otherwise DEFER to O.
- **J-14** drag-keep-open story demo — story-only work; DEFER to O cosmetic batch.

## §4 — Cross-repo coordination

Per `docs/tranches/N/coordination/CONSTELLATION.md`:

- glass-ui: primary; M close `54a8acb` at v1.0.5; v1.0.6 tag at W0 close (prune batch substrate delta).
- speedtest / words / fourier-analysis / bbnf-buddy / keyframes.js / value.js: M.W1-migrated; N.W4 6-agent consumer audit re-verifies post-N substrate; no N-scope writes.
- precepts submodule: `46d6cfb` at M close; N.W0 advances with invariants 21-23.

## §5 — Critical path

W0 → W1 → W2 → W4. 3 sequential edges; peak parallelism at W0 (3 lanes) + W4 (1 orch + 7 read-only audit + 6 consumer audits = 14 read-only agents within V7 dual ceiling for audit waves).

## §6 — Risk register

1. **W0 A-batch retirements**: zero risk (zero-usage items). PASS.
2. **W0 B-batch demo-privatization**: removes 3 subpath exports from `package.json`. Consumers that adopted these subpaths (none verified per overfitting audit) would break. Mitigation: rg-verify zero consumer adoption before delete; CHANGELOG entry documents the move.
3. **W1 typography sweep**: large absorb of ad-hoc `text-[Xrem]` literals. Mitigation: per-story verification at close; semantic literal replacements only.
4. **N7 dock blur perceptual audit**: likely no-op (compositor floor); if user perception is real, surface as W2 absorb.
5. **N8 deferral**: ALL user N-open mobile-arrow directive work deferred. Need user signal before re-introducing.
6. **W4 N11 consumer re-audit**: 6-agent fan-out (read-only) may surface post-N consumer-side drift introduced by N.W0/W1/W2; absorb inline or named-defer to O.

## §7 — Provisional v1.x release plan

- **W0 close** → **v1.0.6** patch (prune batch substrate delta; 8 items removed from public surface).
- **W1 close** → **v1.0.7** patch IF text-micro utility + typography sweep land coherently (additive-only changes).
- **W2 close** → **v1.0.8** patch (mobile density CVA + viewport-meta; additive only).
- **W4 close** → final N-flight tag aggregating all v1.0.x patches.

## §8 — Carry-forward to O tranche

(Populates at W4 close. Provisional candidates:)
- C-batch deferred items (disco-glyph, status-dot, glass-carousel) re-evaluation
- N8 `<DockMobileToggle>` new primitive (if user signals)
- E-batch reverse-overfitting watch (dock family if 2nd consumer doesn't emerge)
- L-vue-passive-listeners + L-cache-ttl (PERMANENT-DEFER chronic out-of-scope items)

## §9 — Authority

Plan substrate at N open (REVISED):
- This file (`N.md`) — REVISED to KISS pruning-focus
- `findings.md` — verbatim user N-open + KISS-revision directives
- `dispatch/AGENT.md` — extends M dispatch template with N invariants 21-23
- `PROGRESS.md` — initial + KISS-revision entry
- `waves/W{0,1,2,4}.md` — 4 wave specs (W3 dropped; folded into W2)
- `coordination/CONSTELLATION.md` — carries from M close
- `research/R{α-ζ}*.md` — 6 research deliverables (open-time research)
- `audit/N11-Lane-{a..f}-*.md` — 6 consumer audit deliverables (N-revision research; KISS audit fan-out)
- `audit/N-W4-overfitting-audit.md` — unified overfitting audit (KISS revision)
- `audit/N-prune-ledger.md` — synthesized A/B/C/D/E/F/G prune ledger

Per N-open user directive ("This is NOT an implementation phase. Tranche development only."), implementation dispatch awaits future explicit user authorization analogous to K/L/M pattern.

## §10 — Revision history

- 2026-05-12 initial open commit `cbe2d13`: 5-wave plan with mobile-aware substrate + dock subsystem refinement + style-discipline HEADLINE. Pre-KISS-revision.
- 2026-05-12 KISS revision (this file): per user directive ("KISS. Audit for any components, classes, items that have ONE consumer or use case. Prune any overfitting. Conservative with additions and removals."). Pivoted plan from addition-focused (4 substrate threads + new primitive) to pruning-focused (A+B prune batch HEADLINE; N6/N7/N9 supporting; N8 new-primitive DEFERRED). Dropped W3 (folded into W2). Net library surface change at N close: **−8 items**. Six consumer audits + unified overfitting audit executed at this revision; 7 deliverables landed in `audit/`.
