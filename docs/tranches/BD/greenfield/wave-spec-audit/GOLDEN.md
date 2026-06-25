# wave-spec-audit — GOLDEN (the canonical META-PASS spec)

> The single golden reference for the Band-E META-PASS over the WHOLE tranche: the **116 union
> wave specs** (`docs/tranches/BD/union/waves/`) + the **42 disjoint `BD/waves/`** + the **37
> greenfield `WAVE-AMENDMENT.md`** deltas. Synthesized from lens-a (consolidation), lens-b
> (cross-engine/perf graph-linter), lens-c (technicolor storyboard). **Not a per-component
> greenfield** — what is *designed anew* here is the **audit mechanism + the consolidated
> machine-checkable ledger + the cross-cutting design-adherence consistency gate**. Every count
> below is grep/source-verified against disk (2026-06-24). Binding law: `design.md` +
> `GREENFIELD-HARDENING-PLAN §1` + `docs/tranches/BD/viz/video-audit/IOS27-REFERENCE.md`.

---

## 0. THE GOLDEN THESIS — the corpus is a BUILD-GRAPH; the audit must be a MECHANISM, not prose

All three lenses converge on one fact and three reconciling moves. The GOLDEN takes the strongest
move from each lens and welds them into ONE coherent deliverable:

- **From lens-b (the spine):** the audit is a **committed, re-runnable LINTER** (`audit.mjs`) that
  treats the 116+42+37 corpus as a directed build-graph + a 7-axis precept matrix. Convergence
  becomes a *computed number* (`0 lints ∧ green-where-owed`), re-derivable by anyone, immune to
  the fake-gate fraud the corpus itself legislates against — the **structural twin of the
  paint-arm chroma π**. Default-RED. `2-consecutive-clean` is the proof, not a judge's word.
- **From lens-a (the materialization):** the build-DAG today lives IMPLICITLY across 37 prose
  amendments; an agent could build TIER-2 buttons before TIER-0 motion tokens land. The GOLDEN
  **MATERIALIZES the ~30 NEW waves as real files** under `union/waves/`, each with a
  `tier:`/`depends:`/`disposition:` frontmatter block, + a generated `BUILD-DAG.md` index the
  linter topo-sorts and FAILS on a dangling/cyclic/dup-mint edge. The audit stops being a document
  you trust and becomes a graph the build verifies.
- **From lens-c (the storyboard + the wave-homes):** the ledger is a **shooting script** — one row
  per wave, exactly one disposition `{STAND · AMEND · NEW · PRUNE · SUPERSEDE}`, in topological
  tier order, with the **four cross-cutting registers printed as a checkbox column**
  (GLASS-capsule · PAPER-field · CARTOON-punch · √φ-concentric · gate=painted-px) so a divergent
  row is visible at a glance. Plus the two **prose-only systemic findings get wave-homes** (the
  7 build-traps; the fake-gate fraud rule).

**The reconciled boldest single act:** ship `audit.mjs` (built + born-RED below), then materialize
the ledger it lints — the consolidation is *machine-checkable*, the design-consistency gate is a
matrix cell, and the convergence % is a computed fraction, not a vibe.

---

## 1. SOURCE-VERIFIED CORPUS (disk reality, 2026-06-24)

| set | path | count | role |
|---|---|---|---|
| union waves | `docs/tranches/BD/union/waves/` | **116** | the audit target |
| BD waves | `docs/tranches/BD/waves/` | **42** | **DISJOINT** (`comm -12` = **0**) — BE/execution band |
| amendments | `greenfield/*/WAVE-AMENDMENT.md` | **37** (+37 `DELTA-ASSAY.md`) | the deltas |

**Foundation is provably UNBUILT** (the tier-0 truth, live-grepped this session — all **0** src
hits): `glass-capsule`, `paper-field`, `motion-weight`, `ease-cartoon-punch`. Correct for
tranche-DEV; it makes the build-DAG the headline, and it is the `audit.mjs` born-RED gate.

---

## 2. THE DESIGN — the audit mechanism (visual + interaction is the LEDGER itself)

The "visual design" of a meta-pass is the **legibility of the ledger**. The golden ledger
(`BD-CONSOLIDATED-LEDGER.md`, the materialization deliverable) is a single storyboard table:

```
| TIER | WAVE (canonical slug) | DISPOSITION | by-amendment | capsule | field | punch | √φ | gate=px |
```

- **Sorted in TIER order, never alphabetical** (lens-c Finding F: a Band-sort builds Band-B
  consumers before Band-0 tokens — the wrong order). Tier is the only legal build sequence.
- **Five dispositions, exactly one per row:** `STAND` (~82 quiet union waves, each verified ≥1
  consumer at build per the overfitting-audit) · `AMEND` (~28 AUGMENT/RE-POINT in place) ·
  `NEW` (~30 materialized from amendment bodies) · `PRUNE`/`SUPERSEDE` (the 6 below).
- **Four register checkboxes + the gate column** make the consistency gate a glance, not a re-read.

### 2a. The 9-tier build-DAG (the only legal implementation order)

```
TIER -1  HYGIENE      prefix-normalize (W- ↔ BD.W-) · NON-NODE register · scope-seam declare
TIER 0   FOUNDATIONS  BD.W-MOTION-WEIGHT (--motion-weight 0.618) · BD.W-CARTOON-PUNCH (--ease-cartoon-punch linear())
                      W-GLASS-ABROGATE-GRAY + warm-FLOOR decl ON .glass-capsule (real non-zero, both modes)
                      BD.W-CARTOON-CEL-INK (warm ink) · BD.W-CARTOON-CASTER (inert-child cast)
                      BD.W-GLASS-KEY-EDGE (the §3 asymmetric lit edge)
TIER 1   FIELD        BD.W-PAGE-FIELD (CO-MINTS @utility paper-field, inset:0 TRANSMITTED, per-route hue)
                      ⤷ BD.W-GLASS-FIELD = its glass-floor ACCEPTANCE ARM (NOT a 2nd mint)
                      BD.W-FIELD-SCRIPT (warmFieldHue) · BD.W-FIELD-AURORA-RECONCILE
TIER 2   EXTRACT      BD.W-TAB-IOS-CAPSULE (EXTRACT .glass-capsule/-hover from the inline indicator)
TIER 3   MORPH WELD   BD.W-MORPH-FIELD-WELD (ONE useMorphField + ONE <GooFilter>) · BD.W-MORPH-PUNCH-TOKENS
                      BD.W-GOO-BARBELL-NECK (the real barbell/smin neck) · BD.W-GOO-BRIDGE-SHELL
TIER 4   CONSUMERS    buttons · cards · select · toggle-chip · glass-atoms · timeline · overlays · dock-* · carousel
TIER 5   VIZ §3       aurora · goo-* · dot-* · fourier · concentric · paper-grid · substrate · handmark (each CONSUME paper-field)
TIER 6   CHASSIS      page-chrome · shell-layout · story-page · category-landing · configurator
TIER 7   HUE-FENCE    BD.W-SECTION-HUE-WARM-FENCE (the lone globally-divergent fix — ELEVATE, see §4)
TIER 8   W-CUT        USER-gated; never auto
```

Each tier reads only lower tiers (lens-c §8 adversarial: no cycle). Every consumer wave I read
carries a `DEPEND` ledger with the born-RED "FAILS LOUD if absent" fence — no literal-by-stealth,
no claims-extant.

---

## 3. THE EXACT MECHANISM — tokens/recipes/composables/files (the canonical resolutions)

These are the GOLDEN's binding reconciliations. They are the *un-negotiable single sources* that
every consumer composes; the linter REDs on any second mint.

| primitive | ONE canonical source (mint wave) | file | the rule |
|---|---|---|---|
| **motion currency** | `BD.W-MOTION-WEIGHT` + `BD.W-CARTOON-PUNCH` (motion-spring, Band 0) | `property-regs.css §18`, `scheme-motion.css §2` | `--motion-weight` typed `@property inherits:true initial:0.618`; `--ease-cartoon-punch` a raw `linear()` with a real negative anticipation leg. **`BD.W-MORPH-PUNCH-TOKENS` is the buildable AUTHOR of these** (motion-spring named them but the union set had 0 files — blend-morph's wave is the one that lands them). Collapse to ONE authority; no 2nd mint. PRM → `--motion-weight:0`. |
| **the field** | `BD.W-PAGE-FIELD` co-mints `@utility paper-field` | `src/styles/paper.css` | ONE `@utility paper-field`, **TWO acceptance floors**: `BD.W-GLASS-FIELD` = glass-floor (~0.012 composite-behind-glass), `BD.W-PAGE-FIELD` = field-floor (mean OKLab **C ≥ 0.045** warm, H∈[25,95]) + base-wash + per-route. `inset:0` **TRANSMITTED** (bent into real L-variance inside the box), NOT `inset:-20%` decorative halo. **MERGE pinned: not two paper-fields.** |
| **glass capsule** | `W-GLASS-ABROGATE-GRAY` + the warm-FLOOR decl | `.glass-capsule` recipe | a **REAL non-zero** warm-floor declaration (clears chroma 0.02 BOTH modes @ `--glass-tint-strength:0%`), minted ONCE, CONSUMED everywhere. Replaces the asserted-in-prose floor with code + a painted-pixel gate (lens-c §4.1). `BD.W-TAB-IOS-CAPSULE` EXTRACTs it from the inline `.segmented-indicator`. |
| **the morph weld** | `BD.W-MORPH-FIELD-WELD` | `useMorphField.ts`, `GooFilter.vue`, `morph-field.css` | ONE `useMorphField` atom + ONE `<GooFilter>` shell-root mount exposing every id (`glass-goo`/`dock-fission-goo`/`pager-goo`/`dock-morph-goo`); `GlassGooFilter.vue`+`DockGooFilter.vue` DELETE (re-export ids, no alias). The ~7 forks (`useGooMorph`/`useLiquidMorph`/`useLiquidFlex`/`useDockOrientationMorph`/`useDockMorphWindow`/`dockMorphMeasure`/`useDockFission`) re-point as thin recipes keeping their public names + drive scalars. Dock signatures COMPOSE the shipped `--dock-morph-t` drive, NOT a phantom `useElementMorph` (buildable for ~95% of morphs, zero unbuilt-sibling block). |
| **cartoon cast** | `BD.W-CARTOON-CEL-INK` + `BD.W-CARTOON-CASTER` | `.cartoon-cast` | warm-ink 0-blur cast on an **INERT child** (NOT `::before`/`::after` on the carrier — the light-dark inset-shadow trap + the dark white-flip defect). The ONE caster all consumers ride (`.btn-punch`, `<Card surface="cartoon">`, atoms, story) — no per-item re-fork, no animated `box-shadow` (paint-bound). |
| **radii** | `BD.W-CONCENTRIC-RADIUS` | `--radius-concentric` | √φ ladder; `r_inner = r_outer − pad`; design.md §L6. |

### 3a. The cross-engine plan (MEATBALLING perfect in Chrome AND Safari)

The morph weld is the boldest mechanism and rides the binding WebKit law:
- **Static SVG goo filter** (one `<filter>`, sRGB `color-interpolation-filters`), **NO
  `backdrop-filter:url`**, compositor-only transform channels, `@supports`/PRM floors.
- **The waist gate (M2):** `max_t S.ratio ≤ 0.45` AND `hasLocalMinimum` across the ENTIRE
  `[data-morphing]` window, read from RENDERED pixels of two PLAIN circles — a **real
  blob↔meatball metaball merge**, never a naive ellipsoid, never a hand-drawn polygon.
- **The tier ladder (M4):** `max_t |S−G| ≤ 0.10` (Tier-S SVG-goo vs Tier-G one-GL offscreen) —
  parity across every connected frame, both tiers from the SAME field.
- **The OWED Safari capture (M6):** a real Safari-26-on-Metal frame-series for Tier-S + the V↔H
  sweep is a **RED gate that BLOCKS GREEN** (not a prose carve), or the V↔H weld defaults to
  Tier-C teardrop on WebKit. Both engines, paired-π honest.
- **Houdini path:** the GoogleChromeLabs css-paint-polyfill backs Safari via `-webkit-canvas()`;
  user OK'd a polyfill IFF the real Safari frame-budget is MEASURED, else WebGL2+GLSL `smin` SDF
  raster → CSS `mask-image`/§L7 sibling layer (the substrate already runs WebGL2 on Safari).

### 3b. A11y / PRM carve (binding on every motion/glass row)

`--motion-weight → 0` and `--ease-standard` under `prefers-reduced-motion`; reduced-transparency →
opaque fallback. The `.cartoon-cast` **survives PRM as a static (no-travel) legibility anchor** and
survives reduced-transparency as opaque ink — the audit asserts no item PRM-zeroes the INK itself
(the over-carve defect). Pass-2 of the linter adds a PRM column; a missing carve is a RED cell.

---

## 4. THE CONSISTENCY GATE — verdict: PASS with ONE live divergence + 3 reconciling amendments

design.md §L1–L7 are APPLIED (Philosophy 5th pillar · §L2/§L4 cartoon · §L6 proportion · §L7
cross-engine; the T1–T17 bar references `IOS27-REFERENCE.md`, 265 lines on disk). The 7-axis
matrix is GREEN-where-owed (the `audit.mjs` PASS-2 renders it; axes are applicability-sparse).

**THE ONE GLOBALLY-DIVERGENT GESTALT VIOLATION — TEAL/NAVY in the hero registry.**
`demo/stories/category-hero.ts`: **5 categories carry COOL `sectionHue`** — substrates 3°(teal),
forms 2°(indigo), containers 9°(slate), navigation 11°(ocean), scenes 4°/171°(green-cyan). The
*field* warm-clamps via `warmFieldHue`, but the category **HEROES still paint teal/navy** — a
`BC.W-TEAL-NAVY-PURGE` violation. **Captured** by `BD.W-SECTION-HUE-WARM-FENCE` (shell-layout):
re-indexes all 5 cool slots to warm across the 3 CSS arms + the JS mirror + a structural
`warmHeroHue()` clamp + a born-RED `proof:teal-navy-purge` (RED on today's 222.8/239.6/208.0/171.1).
**GOLDEN action: ELEVATE to TIER-7 with the consistency-gate seal** (lens-a/c) — it is the sole
globally-divergent row and currently lives buried in prose. Scope-widen to the hero ACCENTS, not
only the field (lens-c §4.2).

**The 3 reconciling amendments the gate demands** (the only register-level gaps):
1. **glass warm-FLOOR = CODE not prose** — the real non-zero decl on `.glass-capsule`, minted once
   (fold into glass-material/tabs), consumed everywhere; painted-pixel gate.
2. **`BD.W-SECTION-HUE-WARM-FENCE`** — warm-fence the hero accents (above).
3. **gate-truth canon** — the ONE binding painted-pixel harness + the fake-gate fraud rule.

---

## 5. THE FOUR FLAGS + TWO SYSTEMIC WAVE-HOMES (the consolidation resolutions)

- **FLAG-1 prefix-straddle** (`BD.W-GLASS-ABROGATE-GRAY` cited vs `W-GLASS-ABROGATE-GRAY` on disk;
  the W- ↔ BD.W- mixed corpus): TIER-(-1) one rename pass to ONE prefix convention, recorded as
  clean-break (no alias). The linter PASS-1 detects all 16 straddles.
- **FLAG-2 phantom-slot residue** (`BD.W-AUR-SATIN` + `BD.W-AUR-PRISM` on disk after their framing
  was EXCISED): **PRUNE the two files** (satin=8/prism=9 are "not user asks"; clean break, no
  restub) — resolved at materialization, the open reconciliation the orchestrator deferred to this
  pass.
- **FLAG-3 forward-dep** (`BD.W-CARTOON-PUNCH` AUGMENTed by cartoon-shadow but authored by
  motion-spring): the DAG orders motion-spring (TIER 0) strictly before cartoon-shadow — explicit
  in the materialized ledger so no agent picks cartoon-shadow first.
- **FLAG-4 token-authority collapse** (`BD.W-MORPH-PUNCH-TOKENS` vs `BD.W-MOTION-WEIGHT`+
  `BD.W-CARTOON-PUNCH` both claiming `--motion-weight`/`--ease-cartoon-punch`): **the single most
  important DUP risk.** RESOLUTION: ONE token authority. `BD.W-MORPH-PUNCH-TOKENS` is the buildable
  AUTHOR (motion-spring named them but the union set has 0 files); `BD.W-MOTION-WEIGHT`/
  `BD.W-CARTOON-PUNCH` are its canonical slugs. No 2nd mint — the linter PASS-1 `dup-mint` lint
  RREDs until the ledger pins this once.
- **SYSTEMIC home #1 — the 7 build-traps** (`@property inherits:false` on pseudo → initial;
  self-ref `--x:max(var(--x))` no-op; cel cast on inert child; `color-mix … transparent` WebKit
  black-premultiply; `scale()` shorthand clobbers centering; 2nd `animation:` clobbers; Vue `ref`
  on component → instance): author **`BD.W-BUILD-TRAP-CANON`** so they are a gated artefact, not a
  buried §283 callout.
- **SYSTEMIC home #2 — the fake-gate fraud rule** (parse-oklab-as-sRGB over hardcoded purple → gray
  passes): **AUGMENT the extant `BD.W-GATE-TRUTH-AUDIT`** (prefer AUGMENT to keep DRY) with the
  binding π — an out-of-page `screenshot→getImageData`, never in-page getImageData (taints), never
  stop-strings — + `audit.mjs` as the structural twin.

**The 6 PRUNE/SUPERSEDE/EXCISE (verified clean, no dangling consumer):**
`W-AURORA-METALLIC`→`BD.W-AUR-METAL-FINISH`; `W-BLURRED-IMAGE-BG`→`BD.W-AUR-IMAGE-SOURCE`;
`BD.W-AUR-METAL` framing EXCISED; `W-GOO-CAROUSEL-DECK`+`W-GOO-MORPH-REFINE`+`W-PAGER-GOO-MORPH`
SUPERSEDE→`BD.W-GOO-BARBELL-NECK`(+`BD.W-GOO-BRIDGE-SHELL` shell de-dup, ONE record, no
double-prune); + FLAG-2's AUR-SATIN/PRISM.

---

## 6. THE BORN-RED GATE — `audit.mjs` (BUILT + RUN this session)

`docs/tranches/BD/greenfield/wave-spec-audit/golden/audit.mjs` — pure node, no new dep. Three
passes + the foundation gate, deterministic, `--json` for machine artefacts, exit 1 on any lint.

- **PASS 1 — slug graph:** de-wraps line-broken slugs, builds the directed graph, runs 5 lints
  (phantom · dup-mint · prefix-straddle · scope-bleed · NON-NODE). **Born-RED today: 92 structural
  lints** (65 phantom — the un-materialized NEW set + a residue the MINT-regex misses, to drive to
  clean at materialization; 4 dup-mint incl. `BD.W-MOTION-WEIGHT` = FLAG-4; 16 prefix-straddle =
  FLAG-1; 7 scope-bleed incl. `BD.W-TOC-MENU-GLASS` = lens-c Finding A).
- **PASS 2 — precept matrix:** 37 items × 7 axes, GREEN-where-owed; renders the consistency gate as
  a glance. (167/259 cells green — sparse by design; the column is the consistency verdict.)
- **PASS 3 — cross-engine floor:** forbidden-literal scan (`backdrop-filter:url` ungated, `-58deg`
  leak, animated `box-shadow`) + the §L7-arm-present assertion on every engine amendment.
  **Today: 0 — the cross-engine discipline is consistent across the whole corpus** (lens-b's
  headline good-news, confirmed).
- **FOUNDATION gate:** greps src/ for the 4 tier-0 tokens; **born-RED (0 hits each)** — the spec
  converges against future primitives, the correct tranche-DEV truth.

**The acceptance bar / convergence proof:** the consolidation is converged when `audit.mjs` runs
**2-consecutive-clean** (`0 phantom ∧ 0 dup-mint ∧ 0 prefix-straddle ∧ 0 scope-bleed ∧ 0
forbidden-literal ∧ green-where-owed`) AFTER the materialize pass lands the ~30 NEW waves + the 4
FLAG fixes + the 2 systemic wave-homes. The convergence % is then a computed fraction, immune to
the fake-gate fraud — exactly the discipline the corpus legislates against, applied to itself.

---

## 7. THE MATERIALIZATION DELIVERABLE (the user-gated next act, fully determined here)

Emit the ~30 NEW waves as real files under `union/waves/`, each with frontmatter
`tier:`/`depends:`/`disposition:`, in the §2a DAG order, + a generated `BUILD-DAG.md` index that
topo-sorts them and FAILS if any `depends:` points at an unauthored wave or mints a duplicate
token. This converts the consolidation from a prose claim into a machine-checkable DAG: the
implementation cron `topo-sort`s `BUILD-DAG.md` and refuses to start a wave whose deps are unbuilt
— the same discipline that caught the fake-gates, applied to build order itself. FLAG-1 (rename),
FLAG-2 (phantom prune), and FLAG-4 (token collapse) RESOLVE AT MATERIALIZATION because a topo-sort
with a duplicate token-mint or a dangling `BD.W-` filename throws — and `audit.mjs` goes green.

**Net tranche shape:** 116 union − 6 pruned + ~30 materialized NEW − FLAG-4 collapse(−1) −
FLAG-2(−2) ≈ **~137 buildable wave specs** in the 9 tiers. Implementation is the separately
USER-gated hinge (W-CUT, never auto). **Spec-coherence convergence ≈ 90%**; the remaining 10% is
exactly the materialize pass + the 2-consecutive-clean this GOLDEN designs.
