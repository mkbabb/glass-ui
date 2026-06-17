# BB.W-PRUNE-CONSOLIDATE — DELTA (the superseded-mechanism retirement confirmed + the half-primitive DECIDE census + proof:no-dual-path born-RED→GREEN)

**Wave**: BB.W-PRUNE-CONSOLIDATE (Batch L, LIQUID-GLASS band) · **Branch**: tranche/BB
**Capture date**: 2026-06-17 · **HEAD sha**: `12326f99` (BB Batch L round 3 — deep-glass · liquid-reveal · hierarchy2)
**Gate**: `proof:no-dual-path` (NEW; born-RED demonstrated → GREEN at close — D1-D4 + the self-test bite)
**Cardinal-lesson note**: the binding truth here is the gate logs + the per-mechanism grep below, NOT a commit-message claim. This is a PRUNE + register-decide wave (NO `proof:ba-gestalt` of its own — it changes ZERO paint where the successor already paints; the successor waves W-LIQUID-REVEAL/W-PRESS-UNIFY/W-LENSING carry the gestalt verdict for the new motion, per BB inv-4).

## §0 RE-GROUND — the drift at HEAD (recorded, NEVER re-diagnosed)

The wave was specced "born-RED at HEAD post-successors-pre-cut," assuming the three superseded mechanisms still EXIST at HEAD (a dormant `popover-animate` `@utility`, a competing dual press, a static dead-centre disc). The §0 re-ground at `12326f99` found the THREE successor waves had ALREADY landed their SYMMETRIC closures themselves — the cut is DONE. This wave is therefore a **CONFIRM + GATE + CENSUS** (the documented §0 branch: "a retired mechanism is verified DELETED, not assumed gone"), NOT a re-invention of the retirement.

| superseded mechanism | spec expectation | HEAD reality (the drift) |
|---|---|---|
| `popover-animate` `@utility` | dormant stub still ships; consumer refs survive (born-RED) | **W-LIQUID-REVEAL DELETED both `popover-animate` AND `slide-in-from-side` `@utility` bodies.** `animate.css` carries only the RETIRED comment block. The residual `popover-animate` strings in DialogContent/SelectContent are PROSE COMMENTS (the retirement record) — ZERO live `class=`/`@apply` consumers. D1 symmetric closure ALREADY holds. |
| the CSS `--spring-smooth` press cohort | a competing dual press to reconcile | **W-PRESS-UNIFY KEEPS the CSS `:active` press as the recorded no-JS FLOOR** (`.tap-squish`/`.btn-pill`/`.glass-btn`/`btn-interactive`/dock ride `scale var(--duration-fast) var(--spring-smooth)` — the §6 register). The JS press (useLiquidPress, writing the coupled `--*-press-t` drive) wins when armed. `--scale-press` is declared ONCE (scale-paper.css) — no redundant literal. D2 is floor-kept everywhere — nothing to cut. |
| the static centred-disc specular CLASS | a static dead-centre freeze + a per-consumer hand-wire dual source | **W-LIQUIDHOVER reconciled the two per-consumer `useSpecularTracking` hand-wires onto the ONE `createSpecularWriter` core** via `vSpecular` (the tier-root auto-arm reaching Card/Button + 4 dock controls = 7 SFCs). The disc CORE (`::before` catch-light) is KEPT, refined by W-LENSING's edge glint. ONE position-write source survives. D3 ALREADY closed. |
| `useSpecularPointer` (the angle-feed leaf) | the W-LENSING-minted ≥2 leaf | **0 SFC binary at HEAD** — vSpecular writes only the POSITION; the angle WRITE that arms the edge glint is BOOKED to W-REFLECT3 (W-LENSING's own named map-encoding successor). The census records the terminal `retired-with-named-re-trigger` verdict. |

**The drift ruling (the documented branch taken).** The band's own successor waves did the clean-break cuts; this wave's binding work is therefore (1) the `proof:no-dual-path` gate that ASSERTS the symmetric-closed state holds (born-RED demonstrated by the self-test bites + a live planted-stub RED), (2) the half-primitive DECIDE census, (3) this DELTA. ZERO source edit was needed (no mechanism survived the band — the cut is confirmed, not re-performed); the only net-new artefact is the gate, the census, and this DELTA. The §Triumvirate sequencing fence PASSED (all four successors landed — confirmed by the green successor gates below).

## Per-mechanism before/after grep (the binding truth)

### D1 — `popover-animate` DELETED, the no-dual-enter-path (symmetric closure)

```
$ grep '@utility popover-animate' src/styles/utilities/animate.css     # post-comment-strip
  → 0 @utility declarations (2 raw hits, BOTH inside the RETIRED /* */ comment block)
$ grep -rln 'class=.*popover-animate | @apply.*popover-animate' src/components/
  → 0 live consumers
$ grep '@utility slide-in-from-side' src/styles/utilities/animate.css   # post-comment-strip
  → 0 (folded onto .glass-reveal's data-side translate leg — SUBSUMED, not orthogonal)
```
**Verdict**: the atomic both-gone state (utility absent AND zero live consumer). `.glass-reveal` is the live enter. The `slide-in-from-side` disposition is FOLD (subsumed onto `.glass-reveal`'s `data-side` compositor translate leg), DELETED with `popover-animate`. ✓

### D2 — the CSS press is the recorded no-JS FLOOR, the no-dual-press-path

```
$ grep -rn -- '--scale-press\s*:' src/styles/
  → src/styles/tokens/scale-paper.css:26    --scale-press: 0.96;    (declared ONCE — the canonical single source)
```
The `.tap-squish`/`.btn-pill`/`.glass-btn`/`btn-interactive` `:active` scale presses ride `scale var(--duration-fast) var(--spring-smooth)` — the §6 easing-doctrine register, the W-PRESS-UNIFY-recorded no-JS FLOOR (`proof:press-unify` P4 names `.tap-squish:active` as the floor). **The floor is KEPT, not cut** (the §Triumvirate floor-vs-dual-path trap avoided — the floor is the deliberate progressive-enhancement degrade, NOT a competing dual press). The JS press (useLiquidPress) writes the coupled `--card-press-t`/`--glass-btn-press-t` drive and wins when armed. NO redundant duplicate `--scale-press` literal exists. **Verdict**: floor-kept everywhere; zero dual press. ✓

### D3 — the static centred-disc class superseded, the no-dual-specular-path

```
$ grep 'export function createSpecularWriter' src/composables/glass/useSpecularTracking.ts
  → 1 definition (the ONE position-write core)
$ grep -rln 'v-specular' src/components/
  → 7 SFCs (Card, Button, DockIconButton, DockTabButton, DockSelectTrigger, DockDropdownTrigger + the auto-arm directive)
$ grep -rln 'setProperty.*--mouse-x' src/components/
  → 0 hand-rolled per-consumer position-write copies
$ grep '\.glass-material::before' src/styles/glass/material.css
  → present (the disc CORE catch-light — KEPT, refined by W-LENSING's edge glint)
```
**Verdict**: exactly ONE position-write source (`createSpecularWriter`, wrapped by `vSpecular`/`useSpecularTracking`/`useSpecularPointer` — no copy). The disc CORE is KEPT (the over-cut avoided). The static dead-centre class is structurally closed (the auto-arm reaches every interactive glass surface — vSpecular bound on ≥2 SFCs). ✓

### D4 — the half-primitive census carries a terminal DECIDE per leaf

7 leaves, all terminal (see `W-PRUNE-CONSOLIDATE-census.md` for the full ledger + evidence):
- `useSpringPress` → **wired** (Button + Card, J-inv-10 cleared)
- `useLiquidPress` → **wired-with-booked-second** (Card live + DockIconButton booked; the W-NDA-DECIDE terminal-with-named-trigger)
- `useLiquidReveal` → **wired** (.glass-reveal recipe + the bloom refinement)
- `springTimingFunction` → **wired** (useLiquidReveal + curves.ts; + the distribution seam)
- `Draggable` → **wired** (SegmentedTabs + DockLayerGroup, via useDragMorph)
- `flipShared` → **wired** (the distribution seam, locked by proof:motion-suite)
- `useSpecularPointer` → **retired-with-named-re-trigger** (the angle-feed binding booked to W-REFLECT3, the named map-encoding successor)

**Verdict**: NONE shelf-ware, NONE re-booked, every band-touched leaf terminal. ✓

## proof:no-dual-path born-RED → GREEN logs

### Born-RED demonstration (a planted dual path reds — proven this run)

```
$ printf '\n@utility popover-animate { @apply animate-in fade-in-0; }\n' >> src/styles/utilities/animate.css
$ node scripts/proof-no-dual-path.mjs
  D1 popover-animate symmetric-closed : false (utility=true, consumers=0)
  VIOLATIONS:
    ✗ D1 — `@utility popover-animate` survives as a dormant stub (dead shelf-ware)
  status: FAIL
$ # revert (animate.css byte-restored — git diff --stat empty)
```
The 9 inline self-test bites ALSO all flag every run (the anti-evasion — a hollow detector that does not flag a planted dual path reds itself): D1a-dormant-utility-stub, D1b-broken-reference-consumer, D1c-alias-drain-evasion, D2-redundant-press-literal, D3-second-position-write-copy, D3b-disc-core-over-cut, D4-book-verdict, D4b-manufactured-bar, D4c-bare-superseded-entry.

### GREEN at close (the symmetric-closed state)

```
$ node scripts/proof-no-dual-path.mjs
  D1 popover-animate symmetric-closed : true (utility=false, consumers=0)
  D1 slide-in-from-side closed        : true
  D2 css-press floor-kept (no dual)   : true (--scale-press sources=1, dual=0)
  D3 specular single-source           : core=1 copies=0 disc-core-kept=true auto-arm-surfaces=6
  D4 half-primitive census terminal   : true (7 leaves)
  SUPERSEDED_SET rationale'd          : true (4 entries)
  self-test bites all flagged         : true (9 bites)
  status: PASS
```

## The cross-gate no-regression check (the retire serves the successor)

The retire of the superseded mechanism must NOT red the successor it serves. Post-confirm:

```
$ node scripts/proof-liquid-reveal.mjs   → exit 0 GREEN  (R1-R5 — .glass-reveal default + popover-animate retired)
$ node scripts/proof-press-unify.mjs     → exit 0 GREEN  (P1-P4 — the interruptible coupled press wired)
$ node scripts/proof-lensing.mjs         → exit 0 GREEN  (L1-L6 — the edge specular + single-source leaf)
```
No successor red (no §Triumvirate coupling-reveal). The sibling `proof:no-dead-token` RED at HEAD (3 dead TOKENS — `--dock-content-safe-inset`/`--glass-refract-bevel`/`--metal-shimmer-color`) is the W-DEAD-SWEEP DEAD-TOKEN sibling's DISJOINT surface, NOT this wave's (this wave touched ZERO token/style sites — the only net-new artefact is the gate). Recorded as a coordination note for the dead-token sibling, not a regression of this cut.

## The fences held

- **No source edit** — the band's successor waves did the clean-break cuts; this wave CONFIRMS them. The only net-new files are `scripts/proof-no-dual-path.mjs` + this census/DELTA. ZERO paint change (the successor already paints).
- **The CSS no-JS press FLOOR** — KEPT (`.tap-squish`/`.btn-pill`/dock `:active` on the §6 register). NOT mistaken for a dual path.
- **The disc CORE** — KEPT (`.glass-material::before` catch-light, refined by W-LENSING). NOT over-cut.
- **The GL shader fence + ppmycota** — untouched (the cut mechanisms are CSS recipes/transitions, not shaders or colors).
- **The foreign-tree fence** — the kf `flipShared`/`Draggable`/`springTimingFunction` re-exports are READ-ONLY references the band ACTIVATED; the census RECORDS the activation, never edits kf source.
- **The hardened-agent git clause** — read-only git; no stage/commit/tag.

## MIGRATION

`popover-animate` is an INTERNAL `@utility` (re-grepped at HEAD: NO public surface ever named it directly). The retire is a clean-break delete already landed by W-LIQUID-REVEAL (a visual enter upgrade, not a public-prop break). NO MIGRATION.md row owed by this wave (the `.glass-refract → .glass-lens` rename row is W-LENSING's; the popover-animate retire row is W-LIQUID-REVEAL's). Recorded here for completeness: this wave adds no public-surface delta.
