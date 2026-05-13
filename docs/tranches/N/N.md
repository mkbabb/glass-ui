# N — Mobile-aware substrate + bidirectional style discipline

**Tranche letter**: N.
**Successor to**: M (closed `54a8acb`; v1.0.4 + v1.0.5 published; precept submodule `46d6cfb`).
**Cohort identity**: mobile-aware substrate + dock subsystem refinement + bidirectional style discipline. First tranche to formalize the 7-axis bidirectional style-audit canon as binding tranche-open research (per N10).
**Mode**: planning-only at this open (per user N-open directive "This is NOT an implementation phase. Tranche development only.").
**Open**: 2026-05-12.

## §1 — Thesis

N is the **mobile-aware substrate + dock subsystem + style-discipline tranche**. Four substrate threads bound by the user's N-open directives:

1. **Storybook mobile perfection** (N6) — refining glass-ui's own demo presentation on mobile; configurators (Aurora, Metaballs, and any future) deeply audited for spacing/padding/density expressiveness.
2. **Dock subsystem refinement** (N7 + N8) — blur reduction audit (already at compositor floor; verify perceptual baseline) + new first-class facilities for dock collapse (icon mode + mobile-arrow primitive with springy/squish/blob/glass aesthetic).
3. **Glass panels frosted-default + typography** (N9) — verify `"resting"` default tier renders as canonical translucent + frosted; promote `text-micro` from token-only to `@utility`; sweep ad-hoc `text-[Xrem]` literals.
4. **Bidirectional style discipline** (N10 + N11) — codify the 7-axis style-audit canon as a binding tranche-open research artefact + 6-agent consumer post-migration audit (already executed at N open via Rγ + Rδ).

No new packages invented (KISS lesson from M). Per V2 (NO workarounds) + V3 (NO legacy code) + V4 (architectural transpositions): the gestalt move at N is *refining glass-ui's expressiveness on mobile + dock + typography*, not abstracting library tooling.

Substrate threads also absorb 9 M-residuals (per Rβ): retire-with-rationale for J-6 + J-11 + `/freshness` + `useGlassAlpha` (V3 substrate-without-consumer binary); absorb dock-layer regression (N-5) + drag-keep-open story (J-14) at N.W2; absorb demo import-path harmonisation (N-6) + Aurora bloom (L-P3-3) at N.W3; absorb AA timeline typecheck errors (N-4) + DiscoGlyph production audit (N-2) at N.W4.

## §2 — Binding invariants

Inherits M's 20 invariants (per Rζ §2 verification). Extends:

1-20. All 20 V-invariants from M held at HEAD (per Rζ §2 table).
21. **NEW @ N — Bidirectional style-audit canonical** — the 7-axis bidirectional style audit per `docs/audits/style-audit.md` runs at every tranche open as a binding research artefact. Self-audit + consumer-audit fan-out per the canon's "When to run" section. Codify in `tranche/SPEC.md` Research section at N close.
22. **NEW @ N — Mobile-density axis on Configurator + ConfiguratorRow** — the `<Configurator>` substrate must support viewport-aware density (mobile / compact / comfortable / spacious) as a canonical CVA branch. ConfiguratorRow's spacing tokens must surface mobile carve-outs.
23. **NEW @ N — Dock collapse primitive completeness** — `<GlassDock>` collapse facilities must include both (a) canonical icon-mode collapse via `collapsed` slot AND (b) `<DockMobileToggle>` primitive for the springy/squish/blob/glass mobile-arrow aesthetic.
24. **NEW @ N — Typography utility-promotion gate** — every `--type-*` token that is used semantically across consumers must surface as a `@utility text-*` class. `text-micro` is the canonical first instance; the gate verifies at every tranche close that no `--type-*` token lacks a paired `@utility`.

## §3 — Wave schedule (5 waves)

| Wave | Opens after | Lanes | Hard gate (TL;DR) | Brittleness |
|---|---|---|---|---|
| W0 | open | 4 parallel (I retire-batch + II Rζ-precept-codify + III dock-blur-perceptual-audit + IV CONSTELLATION ratify + optional v1.0.6 patch) | V3 retire-batch absorbs (J-6 + J-11 + /freshness + useGlassAlpha); precept submodule advanced with N invariants 21-24; dock blur perceptual baseline documented; CONSTELLATION ratified | no |
| **W1 HEADLINE** | W0 close | 3 lanes (A glass-panel-frosted-verify + B text-micro @utility promotion + C ad-hoc typography sweep) | GlassPanel default tier rendering matches canonical "translucent + frosted"; `@utility text-micro` published; ad-hoc `text-[Xrem]` literals across demo+src swept | yes (typography sweep) |
| W2 | W1 close (parallel with W3) | 3 lanes (A DockMobileToggle component + B dock-icon-mode primitive completeness + C dock-layer regression N-5 fix + J-14 demo) | `<DockMobileToggle>` lands on `/dock` subpath with springy/squish animation; icon-mode primitive verified; dock-layer regression closed | yes (dock substrate) |
| W3 | W1 close (parallel with W2) | 3 lanes (A Configurator mobile density + B storybook viewport meta + responsive root + C configurator-mobile + dock-mobile-toggle stories) | Configurator density CVA branch ships; demo/index.html viewport-meta + responsive root; 2 new mobile-proof stories | yes (storybook substrate) |
| W4 | W2 + W3 close | 1 orch + 7 audit lanes (α/β/γ/δ/ε/π/ι) | 7 lanes return clean; N11 consumer-audit lane explicitly N-bound (6-agent constellation sweep per directive); FINAL.md authored; cross-constellation reflog clean | no |

## §4 — Cross-repo coordination

Per `docs/tranches/N/coordination/CONSTELLATION.md` (carries forward from M close):

- glass-ui: primary; M close `54a8acb` at v1.0.5; v1.0.6 candidate at W0 (if substrate delta warrants); next minor version (v1.1.0) at W4 if N9 frosted-tier ships.
- speedtest: AA closed; handoff DONE at M.W1 Lane F; no N-scope writes expected.
- words / fourier-analysis / bbnf-buddy: M.W1 migrated to v1.0; N.W4 consumer audit will re-verify; no N-scope writes unless audit surfaces blockers.
- keyframes.js / value.js: WIP-branch commits pending user push; cross-tranche debt; N may NOT push these.
- precepts submodule: `46d6cfb` at M close; N.W0 advances with invariants 21-24 codified.

## §5 — Critical path

W0 → W1 → (W2 ∥ W3) → W4. 4 sequential edges; peak parallelism at W2+W3 (6 implementation lanes within ceiling) + W4 (1 orch + 7 read-only audit lanes per dual-ceiling V7).

## §6 — Risk register

1. **N7 dock blur**: likely no-op since dock blur is at compositor floor (0px). Perceptual audit may surface that user's "too blurred" perception is the TOP-dock stacking context with `<body>` aurora backdrop, NOT the dock filter. Mitigation: W0 Lane III investigates + documents.
2. **N8 DockMobileToggle**: new primitive could regress existing `collapsed`-slot consumers. Mitigation: W2 Lane B verifies icon-mode primitive completeness in parallel; W2 Lane C explicitly absorbs N-5 dock-layer regression.
3. **N9 typography sweep**: large scope (381 typography drift instances aggregated across consumers per Rδ). Mitigation: W1 Lane C scopes the sweep to demo + library src/ only; consumer-side adoption is via N.W4 consumer audit recommendations.
4. **N10/N11 ordering**: user directive "alongside, thereupon" sequences N11 AFTER N10. Mitigation: N10 already executed at N open (Rγ + Rδ deliverables); N11 is the W4 6-agent consumer audit.
5. **No reserve wave (KISS lesson from M)**: residuals absorbed inline OR named-deferred to O tranche.

## §7 — Provisional v1.x release plan

- **W0 close** → v1.0.6 patch IF substrate delta warrants (retire-batch is mostly subpath retirements; modest patch).
- **W1 close** → v1.1.0 minor IF N9 frosted-tier ships as new tier (architectural option-dependent; W1 Lane A decides).
- **W2+W3 close** → v1.2.0 minor (new `<DockMobileToggle>` primitive + Configurator mobile density CVA branch).
- **W4 close** → final M-flight tag if substrate delta accumulated.

## §8 — Carry-forward to O tranche

(Populates at W4 close.)

## §9 — Authority

Plan substrate at N open:
- This file (`N.md`)
- `findings.md` (verbatim user N-open directive)
- `dispatch/AGENT.md` (extends M dispatch template)
- `PROGRESS.md` (initial state)
- `waves/W{0..4}.md` (5 wave specs)
- `coordination/CONSTELLATION.md` (carries from M close)
- `research/R{alpha,beta,gamma,delta,epsilon,zeta}*.md` (6 research deliverables; ~3500 LOC combined)

Per N-open user directive, implementation dispatch awaits future explicit user authorization (analogous to K/L/M pattern). The plan substrate at this open is binding for the future dispatch.

## §10 — Revision history

- 2026-05-12 open commit (this commit): initial 5-wave plan with mobile-aware substrate + dock subsystem refinement + style-discipline HEADLINE.
