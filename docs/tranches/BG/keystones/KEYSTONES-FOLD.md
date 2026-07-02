# KEYSTONES-FOLD — the series close (orchestrator rulings; BINDING)

**Date:** 2026-07-01 · **Series:** KS-A (`29f280c8`) · KS-B (`f6fa1767`) · KS-C (this commit).
Nine hallmark specs authored by FABLE instances over SOTA research + corpus grounding, each adversarially
critiqued (84–90%) and revision-applied. This document closes the series: the binding map + the rulings on
every accumulated cross-lane question and fold-candidate.

## KF-1 — the binding

Each `KS-*.md` is the **BINDING detailed spec** for its named waves. Precedence on any conflict:
**cursor row (scope/preconds/gate) → RULINGS-PASS2.md incl. §CORRECTIONS → the KS spec → the research
reports (evidence only).** A build agent executes the cursor row USING its KS spec; a KS detail that
exceeds the row's scope is advisory until an orchestrator ruling widens the row.

| Family | Spec | Waves bound |
|---|---|---|
| F2 Glass | `KS-GLASS.md` | 0.7 · 3.1 · 3.3 · 3.5 · 3.10 · 13.2 · F2.1 · F2.2 · F2.3 |
| F4 Paper | `KS-PAPER.md` | 14.1 · 17.5 (+ the LX.2 ceiling) |
| F9 Substrates/Viz | `KS-PROCEDURAL.md` | 6.1 · 6.3 · 6.4 · 6.5 · 6.6 · 6.8 · 6.9 · W-AUR-METAL-FINISH · W-AUR-IMAGE-SOURCE |
| F5 Motion | `KS-MOTION-DISNEY.md` | F5.1 · F5.2 · F5.3 · W-SPRING-TIDY · 10.5 (motion side) · F8.6 · 17.4 |
| F4/craft | `KS-HANDMARK.md` | 14.3 |
| F3 Dock | `KS-DOCK.md` | 4.1 · 4.3 · 4.4 · 4.5 · 4.6 · 4.7 · 4.9 · 4.10 (elaboration-only) · 8.x · 4.11 |
| F6 API | `KS-API-COLOCATION.md` | F6.1 · F6.2 · F6.3 · F6.5 · W-COLOCATE · W-DEAD-SWEEP · W-DESHADCN · BH.B2-export-reshape · BH.B2-leaf-verify |
| F8 World | `KS-CONSTELLATION.md` | BH.B6+B7-asks · BH.B2-export-reshape (consumer side) · BH.B4e-cut-authoring · 19.1 (consumer half) |
| F7 Demo | `KS-AWWWARDS-DEMO.md` | F7.1 · F7.2 · F7.3 · 16.1 · 16.2 · 16.3 · 17.6 · F8.6 (shared language) |

## KF-2 — the density→size cross-lane conflict: F6.2 UNIFY WINS

KS-API ratifies `Size = xs|sm|md|lg|xl` with dock `audacious→xl`, `spacious→lg`; KS-CONSTELLATION
recommended EXEMPTing the dock (its consumers ride the 4-rung density). **OVERRULED in favor of the
unify** — two permanent compactness grammars contradict the whole grammar thesis. The consumer cost is
one-line renames riding the EXISTING 4 by-name asks (speedtest `Dock.vue:258` + `SurveyResultDock.vue:42`,
atlas `/dock` ×5 → each ask's rename map gains its `density→size` rows). Resolved BEFORE 19.1, as the
blocker demanded; the covered floor stays 4.

## KF-3 — KS-API ratifications

`/axes` ships **types + the four frozen const tuples** (~0.1KB, tuple-derived types; no TYPES_ONLY regen
special-case). F6.3 is **H-with-one-visual-clause** (judged by F5.2's Fable storybook sweep — no separate
card set unless the sweep demands one). Card `pressable` reclassifies to **derived-from-explicit-
interactivity** (`as="button"/"a"`, `href`, `role="button"` — never listener-sniffing). The Configurator
style query renames to the component-scoped **`style(--configurator-size:)`** (never a bare inherited
`--size`).

## KF-4 — KS-CONSTELLATION ratifications

Atlas ask **WIDENED in place** (GlassPanel `variant→tier` ×5 sites + the `--ring` reads; floor stays 4) ·
the value.js-demo `goo-blob→blob` ask issues at **B2.1-swap LAND** (file-link timing exception, recorded
in the relay) · `asks-and-consumes.md` row-4 witness RE-BASE (off the killed sibling-probe gate, onto the
MIGRATION row + the `:bh >=4` floor) rides B6+B7 · the `oklchSpectrum` attribution fiction
(`border-progress/README.md:37`) fixes at B2.2's stale-prose clause · speedtest is OFFERED `/axes` as the
runtime-free `/api` alternative (their choice; the ask is authored either/or, and a BorderProgress-adopt
discharge is accepted) · the B4e migration-map arm binds the **RE-DERIVED post-WS12 count** (count-
agnostic literal, ≥203) · SHOWCASE-class demo-alignment asks (value.js: EasingPicker/ColorSwatch; kf:
SegmentedTabs re-home + useLiquidReveal overlays + DockStack) issue **WITH the cut asks (T-3), explicitly
non-blocking**, off the covered floor.

## KF-5 — the cut invokes BOTH arms by their real names

`--run ship` and `--run full` are DISTINCT, both real (verified `gates.mjs:2342-2355`): **ship** = the
Mac/Metal live-paint ceremony (Arm A — writes `SHIP-ATTESTATION.json`, Mac-only); **full** = the deduped
union incl. `proof:ship-attestation` (Arm B — verifies the attestation; what release.yml runs). Row 19.1
names both; the KS-CONSTELLATION checklist cites them by these names.

## KF-6 — fold-candidate dispositions (the accumulated ~20, ruled)

**CLAUSES (overhead floor — no new rows):** drawer/sheet fling-squish → F5.1 (per §CORRECTIONS) ·
`W-DEMO-DOGFOODS-SURFACE` → a clause on BH.B2-export-reshape (post-reshape, a representative demo slice
re-points onto published `@mkbabb/glass-ui/*` subpaths — the reshape's consumer-coherence proven by USE) ·
the `glassShader.wgsl` constant-parity assert is owned ONCE by 13.2's F3 fence with KS-PROCEDURAL
cross-referencing (never double-owned).

**SUCCESSOR-TRANCHE SEEDS (recorded in AMENDED-GESTALT-PLAN §4's seed list; NOT BG rows):**
pointer-proximity glass glow (Apple §1.3) · `W-VIZ-ADAPTIVE-QUALITY` (frame-time EMA quality scalar) ·
goo-blob `uBackdrop` mercury-lens · aurora thin-film iridescence · the travel-ARC register (Disney law 7
on ElementMorph flight paths) · native CSS `spring()` adopt-at-Baseline · the rename-map jscodeshift
codemod (≥2-consumer applies to tooling) · the CardTier/surface matrix reconcile · kf `tab-trigger-*`
upstream hint · the KS-DOCK facility-prune ledger candidates.

**IN-WAVE (already carried by spec content):** the ambient-axis KEEP (live readers, re-verified) · the
KS-GLASS F2.2 JS-carve fence · the KS-PAPER scope re-fencing · everything in KF-4.

## KF-7 — the record

All nine hallmark specs: SOTA-grounded (every reference named), greenfield-looped (real alternatives +
self-challenge in each §3), disk-true (three disk-false claims caught by critics across the series — two
in KS-A specs, one in MY OWN R6 ruling — all corrected against re-verified disk), precepts-conformant,
and Fable-authored per the 2026-07-01 directive. The wave set stayed FROZEN throughout (zero self-inserted
rows). The keystone series is CLOSED; the next act is BUILD: the Stage-0 engine patch, then frontier 0.7.
