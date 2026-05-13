# N — KISS pruning + targeted refinement (post-v1.0.5 hardening)

**Tranche letter**: N.
**Successor to**: M (closed `54a8acb`; v1.0.4 + v1.0.5 published; precept submodule `46d6cfb`).
**Cohort identity**: KISS pruning + targeted mobile/dock/typography refinement. First tranche to canonicalize the bidirectional style-audit + overfitting-audit fan-out as binding tranche-open research.
**Mode**: planning-only at this open (per user N-open directive "This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-12.
**Revised**: 2026-05-12 (user KISS revision: pivot from addition-focused to pruning-focused; original 5-wave plan superseded by lean 4-wave plan).

## §1 — Thesis (REVISED per user KISS directive)

N is the **KISS pruning + targeted refinement tranche**. The HEADLINE (W0) is the prune-batch: 5 V3 retire-with-rationale items + 3 demo-privatization moves. Total **−8 items removed from glass-ui public surface** with zero consumer-side breakage (zero usage = zero risk).

Per user revised directive: "We should be conservative with additions and removals, only folding in new genuinely useful primitives. Removing any dead or unusued ones, contrived ones."

The constellation audit (6 parallel N11 lanes + 1 unified overfitting audit; 7 read-only agents) returned a healthy verdict — **94% keep rate across 172 enumerated artefacts**. The library is NOT over-engineered relative to its consumer base. The prune is the canonical V3 (NO legacy code) + L invariant 8 (substrate-without-consumer binary) cleanup, not a major refactor.

Targeted refinements (N6 mobile / N7 dock blur audit / N9 typography sweep) ship as supporting work; the N8 new `<DockMobileToggle>` primitive is **DEFERRED pending user authorization** because it introduces a new public-surface component (against KISS posture).

## §2 — Binding invariants (REVISED)

Inherits M's 20 invariants. Extends:

1-20. All 20 V-invariants from M held at HEAD (verified at Rζ §2).
21. **NEW @ N — Bidirectional style-audit + overfitting-audit canonical at tranche open** — 7-axis style audit per `docs/audits/style-audit.md` + overfitting audit per `docs/audits/overfitting-audit.md` runs at every tranche open as binding research. N codifies this in `tranche/SPEC.md` Research section.
22. **NEW @ N — KISS pruning binary** — at every tranche close, any item flagged `delete-unused` OR `library-orphan` by the overfitting audit (per canon's verdict precedence) is RETIRED that tranche unless a documented forward-compat case justifies it. "Delete it" is the default; "keep" requires a named consumer-evidence file under `docs/consumer-evidence/`.
23. **NEW @ N — Demo-privatization protocol** — substrate that's 100% demo-only at tranche close moves from `src/components/custom/<x>/` to `demo/_internal/<x>/`. Subpath exports removed. Codified in `tranche/SPEC.md` Document Set.

## §3 — Wave schedule (REVISED to 4 waves — KISS)

| Wave | Opens after | Lanes | Hard gate (TL;DR) | Brittleness |
|---|---|---|---|---|
| **W0 HEADLINE** | open | 3 parallel (A V3 retire-batch + B demo-privatize batch + C precept-canonicalize invariants 21-23) | 5 A-items deleted; 3 B-items moved to `demo/_internal/`; precept submodule `46d6cfb → next` with invariants 21-23 + KISS pruning binary; subpath exports updated; v1.0.6 patch tag | no |
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
