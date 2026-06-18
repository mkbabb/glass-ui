# BC.W-PM-AZ — the AZ post-mortem (the divergence point — the grey-glass ORIGIN)
- **Band:** F (FORENSICS) · **Status:** SPEC (tranche-dev; NOT executed) · **Sequence:** Band F, sibling of BC.W-PM-BB / BC.W-PM-BA; feeds BC.W-PM-SYNTHESIS
- **Owns / closes:** ORCHESTRATION §1 Band F box `BC.W-PM-AZ — AZ post-mortem (adaptive-auto grey-glass origin, morph-showcase, rail3 — the divergence point)`. The binding artefact is `docs/tranches/BC/research/postmortem/az.md` (161 lines) + the AZ rows of `postmortem/SYNTHESIS.md` (lines 91-130).

## Goal (the gestalt)
A reader opens this wave and KNOWS the origin: **AZ.W-ADAPTIVE-AUTO (commit `5b72fd9b`, Batch 1) is the grey-glass ORIGIN** — it shipped the unconditional 20%-AA oklab-darken-toward-near-black-ink on EVERY glass surface, mode- and backdrop-agnostically, with ZERO `--glass-backdrop` read, and closed `live-verified` "π 36/0" on a gate (`proof:adaptive-glass-live`) that is structurally blind to the exact defect it introduced (a monotonic contrast-over-white floor — more grey = greener gate). The disease then rode UNTOUCHED through BA (scope-7 EXEMPTED the dock/overlay band + rebaselined the gate to bless it) and BB (`morph.css` never touched) to the BC user report. The headline: **AZ is the moment a fully-formed, gate-green tranche first shipped a catastrophic visual regression with the gate certifying it as the feature.**

## Starting state (measured, file:line)
From `postmortem/az.md`, the smoking gun at AZ-close `5b72fd9b:src/styles/glass/ladder.css:185-197`:
```css
:where(.glass-floating, .glass-overlay, .glass-card, .glass-resting, .glass-quiet, .glass-wash) {
    --glass-tint-source: var(--glass-tint-ink);              /* = --foreground = near-black warm ink */
    --glass-tint-strength: var(--glass-tint-strength-aa);    /* 20% (glass.css:261) */
    --muted-foreground: var(--foreground);
}
```
- The pixel math (BC live-probed): mixing warm-cream `--card` (oklab-L 0.984) 20% toward near-black ink IN OKLAB drops L 0.984→0.695, **strips chroma to ~0.006 (warm cream → GREY)**, and raises α 0.42→0.536. LIVE: every horizontal `.glass-dock` bg = `oklab(0.695 0.002 0.006 / 0.536)`; vertical SidebarDock = `srgb(0.625 0.613 0.599 / 0.536)`. = user defects D1 + D4.
- The gate (`proof:adaptive-glass-live`, `tests-visual/adaptive-glass-live.spec.ts:224-263`): composites over synthetic white `#fff`, asserts `contrastRatio ≥ 4.5` + `deltaL ≥ 0.08` — BOTH monotonic in the darken direction, ZERO chroma/warmth/upper-darken bound. `grep` confirms no "is this card grey?" check exists. The "π 36/0" is the inverted metric.
- Arm 2 decorative: `useGlassBackdropLuminance` writes `--glass-backdrop-luma` that NO CSS rule reads (the closed loop the iOS-27 darken needed was never built); `backgroundCanvas` null on all but one demo file.
- The lineage (`az.md §4`): AX.W55 → AZ `5b72fd9b` (origin) → AZ `301bdaac` W-DOCK-TAXONOMY (4th plate fork) → BA `99d44494` W-DARK-MATERIAL scope-7 (content tiers to 4%, dock/overlay EXEMPTED, gate rebaselined 26/26 TO the broken paint) → BB `b25d20fc` W-CARVE4 (pure carve, `git log tranche/AY..HEAD -- src/styles/dock/morph.css` = EMPTY). The chronic re-recalibrated a constant across THREE tranches (18% → 20% → 4%-floor-split → dark-12%-arm) without fixing the architecture.
- The morph-white (`az.md §6`): `morph.css:352-356` `.glass-dock.collapsed:hover { background: var(--glass-bg-wash) }` — a bare un-tinted near-transparent wash override (the substitution-vs-inheritance trap, "3rd recurrence of the AX.W55 class") flips grey↔near-invisible mid-morph.
- W-RAIL3 (`az.md §5`): CLAIMED-NOT-BUILT — the macOS-stack is 0% built; `proof:rail3` is all string-scans (`box-shadow: var(--border-hairline)` exists, `defineModel.*context`, `<DockRail` appears) — ZERO clause encodes hover-expand/windowing/scrollable-n.

## Target spec (grounded)
A thin pointer + verdict-naming wrapper. Records the AZ verdict matrix from `postmortem/az.md §5`:

**BUILT-NOT-PAINTED (RE-BUILD or RE-PAINT):**
- W-ADAPTIVE-AUTO (the origin) → REBUILD as closed-loop observer-driven continuous strength + RE-GATE bidirectional. → **BC Band 1** (BC.W-ADAPTIVE-RECONCILE; born-RED on HEAD's 0.695-L grey, GREEN only at α<0.7 ∧ oklab-L>0.85 ∧ chroma>0 over a calm-light backdrop).
- W-DOCK-TAXONOMY → KEEP the prop taxonomy (correct architecture — ONE GlassDock + ONE orientation axis); REBUILD the surface (collapse the 4 plate forks). → **BC Band 2**.
- W-REGISTER-IOS → the de-red mechanism is CORRECT + PRESERVED; re-reads correctly once the §1 grey plate is fixed. → **BC Band 2 re-paint, no re-build of the register**.
- W-MORPH-SHOWCASE → REBUILD the dock-plate path so collapse endpoints stay on the element-level tint (kill the bare `--glass-bg-wash` override). → **BC Band 2** (BC.W-LIQUID-MORPH).
- W-SUFFUSE → the type/color events paint; they ride ON the grey + the condemned double-card idiom. → **BC Band 4/5** (demo redesign, not an AZ re-build).

**CLAIMED-NOT-BUILT:** W-RAIL3 / W-RAIL-EXTEND → the macOS expanded-stack is 0% built; the gate verified a chip-strip. → **BC Band 2** (BC.W-DOCK-STACK-RAIL, ground-up to the macOS spec; DELETE DockRail/DockSection/rail-extend.css + proof:rail3/proof:dock-sections, clean break).

**BUILT+PAINTED (PRESERVE — do NOT re-litigate):** W-METRIC-UNIFY (`coalesceMetric` — the valid-0-renders-0 fix) · W-MOTION-SUITE (the full curve canon, the spring fork killed onto SPRING_PRESETS — the foundation BB's liquid-glass band built on) · W-DOCK-FLICKER (the scale-pop `:not([data-morphing])` gate + the useDockState hysteresis + the 561-frame self-test — the flicker fix works; the morph-white is a different cause) · W-DOCK-TAXONOMY API shape · W-CON-GEN/constellation (paints correctly + interactive; BC explicitly: DO NOT rip out + rebuild; G4 labels honestly booked SPEC'D-NOT-BUILT — exemplary restraint) · W-DOCK-NORMALIZE (the honest no-op — a model negative result).

## Mechanism / files
- **Created:** this file. **Reads:** `postmortem/az.md`, `SYNTHESIS.md:91-130`. NO forensic duplication.
- **ZERO src/ edit, ZERO new gate.** The matrix feeds `FOLD-LEDGER.json tranches.AZ[]` (BC.W-FOLD-LEDGER).

## Acceptance (gestalt + measured + gate)
1. **CAPTURED-PAINT criterion (N/A — forensic).** Documentary completeness: every AZ roster wave has a verdict + BC disposition here.
2. **Machine gate:** `proof:bc-fold-ledger` — REDs if any AZ verdict is dropped.
3. **π readback:** none. The grey-origin fix is paint-verified in Band 1 under BC.W-GESTALT-FIRST (born-RED on the AZ grey `oklab(0.695 …)`).

## Fences / invariants (must NOT regress)
- **Re-paint/keep, don't re-build the working set.** W-METRIC-UNIFY, W-MOTION-SUITE, W-DOCK-FLICKER (the flicker arm), W-CON-GEN/constellation, W-DOCK-NORMALIZE, the W-DOCK-TAXONOMY prop shape are PRESERVED. Constellation explicitly NOT ripped out (the 178×-dock-patching lesson does NOT transfer here).
- **The spec-authoring discipline is a model (§7.7).** AZ's W-ADAPTIVE-AUTO.md §0/§3a/§11 NAMED IN ADVANCE the exact traps that then bit (the substitution-vs-inheritance trap, the @container self-match no-op, the canary-deletion-to-green forbidden evasion). BC preserves the spec rigor and ADDS gate-binds-to-paint enforcement (the failure was impl + gate not honoring the spec's own warnings).
- **The de-red is correct (W-REGISTER-IOS).** BC must not re-introduce the brand-red on any interactive register; the `proof:register-ios` clause-e negative guard is preserved.

## Folds (deferrals discharged)
This wave DECIDES (records the verdict for) the AZ deferral cluster (`deferral/az.md`, 38 items):
- `az-adaptive-grey-origin` (CONTRADICTED-by-new-ask → REBUILD, BC.W-ADAPTIVE-RECONCILE) — THE origin.
- `az-rail3-divider-carousel` + `az-rail3-embla-overflow` + `az-shell-ia-n1-dual-carousel` (CONTRADICTED → REBUILD/SUBSUMED, BC.W-DOCK-STACK-RAIL).
- `az-morph-teardrop-booked` (BOOKED → REBUILD, BC.W-LIQUID-MORPH; the box-morph-white re-opened).
- `az-glass-luminance-promotion` (BOOKED → BUILD/CLOSE-the-loop, BC.W-ADAPTIVE-RECONCILE — the ≥2-binary bar met by the loop-closure).
- `az-dock-flicker-cotiming-escalation` + `az-shell-config-e5-normalize-defer` (SUBSUMED by the BC.W-DOCK-ENGINE rebuild).
- `az-aurora-t5-anisotropic` / `az-blob-ubackdrop-conditions-unmet` / `az-con-gen-g4-label` (HELD-with-rationale → the per-viz Band-4 waves BC.W-VIZ-AURORA + BC.W-GOOBLOB-MEATBALL + BC.W-VIZ-CONSTELLATION; recorded DECIDED-held).
- `az-final-battery-dispositioned-reds` (CONTRADICTED → REBUILD-the-close; the `--run local`-only close is the close-class lie BC.W-CUT abolishes with `--run full` siblings-absent).
- DECIDED disposition for the wave itself: the verdict matrix feeds BC.W-FOLD-LEDGER; the grey-origin REBUILD is owned by Band 1, the rail by Band 2.
