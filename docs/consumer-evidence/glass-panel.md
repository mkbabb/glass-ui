# GlassPanel

## Artefact path

`src/components/custom/glass-panel/` (the published subpath `@mkbabb/glass-ui/glass-panel`).
Its component-local dependency `src/composables/glass/useGlassRenderer.ts` (the
`useGlassRenderer`/`createGlassFilter`/`destroyGlassFilter` detection-cascade cluster) is
imported directly by `GlassPanel.vue` via relative path, NOT re-exported through the
`composables/glass` root barrel (the E4-3 barrel-seat retire holds; the cluster earns its
weight only as GlassPanel's internal renderer).

## Verdict (re-graded BC.W-GLASS-PRUNE 2026-06-19)

`retire-HELD-folded` — **the prune to TWO registers (Glass CARDS + Glass MATERIALS) is
DECIDED; the destructive retire is HELD on a live external consumer (the Atlas), and the
fold is RECORDED + routed (the no-silent-prune floor).** `<GlassPanel>` is a TRUE DUPLICATE
of `<Card>`: its `variant` (the 5-rung selector) ≡ Card's `tier`, its `surface` ≡ Card's
`surface`, and its `tier` renderer-preference folds onto the ONE `.glass-lens`/`#glass-refract`
refraction source (the `createGlassFilter` `feDisplacementMap`-in-`backdrop-filter` is byte-
mechanically the same mechanism). The glass system consolidates to: a bare surface → a
`.glass-{rung}` MATERIAL; a content container → a `<Card>`. There is no third "panel" thing.

**Why HELD, not cut now:** the BC.W-GLASS-PRUNE Fences make the registry-consumer probe the
single non-negotiable pre-flight — *"no retire lands until the probe confirms zero un-folded
external consumers."* The probe (re-run BC.W-GLASS-PRUNE) finds a LIVE external consumer (see
below). Per the wave mechanism the GlassPanel external fold RIDES `BC.W-ATLAS-ASK` (Band 10,
post-cut, the foreign-tree fence): the Atlas consume-and-deletes `<GlassPanel>` → `<Card>` /
`.glass-{rung}` in its OWN tree on its `^4.x` bump, BEFORE the retire lands. The retire is
SEQUENCED behind that fold, not silent.

## Consumer proof (re-runnable; re-grounded BC.W-GLASS-PRUNE 2026-06-19)

**The keyframes.js consumer the AZ.W-PRUNE2 RESTORE rested on is GONE.** The committed
keyframes HEAD no longer imports `@mkbabb/glass-ui/glass-panel` (the booked
2026-09-01 re-audit trigger — "when the keyframes migration commits" — has FIRED):

```bash
grep -rn 'glass-panel\|GlassPanel' ~/Programming/keyframes.js --include='*.vue' --include='*.ts' \
  | grep -iv keyframes
#   (no output — the keyframes consumer migrated off GlassPanel)
```

**A NEW external consumer arrived — the Connectivity Atlas (`sci-report/atlas`), pinned
`@mkbabb/glass-ui@4.0.1`.** THREE live SFCs import `GlassPanel` from `@mkbabb/glass-ui/glass-panel`:

```bash
grep -rln '@mkbabb/glass-ui/glass-panel' ~/Programming/sci-report/atlas/src
#   src/platform/charts/HoverCard.vue       (<GlassPanel variant="floating">)
#   src/platform/chrome/AuroraVeilStage.vue (<GlassPanel variant="floating">)
#   src/views/GalleryView.vue               (<GlassPanel …>)
```

This is the EXACT recurrence of the AY blind-spot the BB.W-PRUNE-CONSOLIDATE / BA inv-11
registry-consumer-probe precept defends against: the internal `rg` is blind to the Atlas's
external consume surface; only the registry+constellation probe sees it. `proof:glass-prune`
P5 makes the probe machine-enforced — a found-and-UNFOLDED external consumer REDs.

**Internal consumers — 0 counted.** The MATERIALS-gallery story
(`demo/stories/substrates/glass-panel.vue`) was re-authored by BC.W-GLASS-PRUNE to compose
the bare `.glass-{rung}` CLASSES over a live `<Aurora>` (the MATERIALS register) — it imports
zero `<GlassPanel>` (own-route showcase, never a counted consumer regardless).

## The named fold (the no-silent-prune floor — BA inv-11)

| consumer | current call site | fold target | the migration | rides |
|---|---|---|---|---|
| `sci-report/atlas` `HoverCard.vue` | `<GlassPanel variant="floating">` | `<Card tier="floating">` (a content container) OR `<div class="glass-floating">` (a bare material) | the floating-tier hover lens is a transient content panel → `<Card tier="floating" surface="glass">` | `BC.W-ATLAS-ASK` `^4.x` bump |
| `sci-report/atlas` `AuroraVeilStage.vue` | `<GlassPanel variant="floating">` | `<Card tier="floating">` (it stages a slot body — a content chassis) | the veil stage wraps slot content → `<Card tier="floating">` | `BC.W-ATLAS-ASK` `^4.x` bump |
| `sci-report/atlas` `GalleryView.vue` | `<GlassPanel …>` (resting-tier glass seat) | `<div class="glass-resting">` (a bare seat) OR `<Card tier="resting">` if it chassis-wraps content | the gallery's resting glass seat → the bare `.glass-resting` MATERIAL | `BC.W-ATLAS-ASK` `^4.x` bump |

The fold is RECORDED here AND in `docs/tranches/BC/coordination/ATLAS-BC.md` (the by-name
migration relay BC.W-ATLAS-ASK consumes). The Atlas executes the consume-and-delete in its
OWN tree on its `^4.x` bump (the foreign-tree fence inv-26 — glass-ui edits zero Atlas files).

## The retire trigger (the close condition)

The destructive retire of `src/components/custom/glass-panel/` + the `/glass-panel` export +
the `useGlassRenderer` runtime filter-builder (`createGlassFilter`/`destroyGlassFilter`) +
`proof:glass-panel-tiers` LANDS when the registry-consumer probe confirms ZERO live external
consumers — i.e. AFTER `BC.W-ATLAS-ASK` lands the Atlas fold (the Atlas re-pins `^4.x` and its
three SFCs consume-and-delete `<GlassPanel>`). At that point `proof:glass-prune` flips from the
HELD-FOLDED green to the RETIRED green (component dir absent, export gone, zero internal imports,
zero external consumers). NO five-more-tranche ride — the fold is named and the trigger is real.

## MIGRATION row (no alias — MEMORY no-backwards-compat)

- `<GlassPanel variant="X" surface="Y">` → `<Card tier="X" surface="Y">` (a content container)
  OR `<div class="glass-X">` (a bare material).
- `<GlassPanel tier="svg-filter">` (the refraction preference) → `<Card class="glass-lens">` /
  `<div class="glass-X glass-lens">` (the ONE `.glass-lens` refraction axis).

## Cross-references

- `sci-report/atlas/src/platform/charts/HoverCard.vue` / `…/chrome/AuroraVeilStage.vue` /
  `…/views/GalleryView.vue` (the external consumers at the probe HEAD — pinned `4.0.1`).
- `docs/tranches/BC/coordination/ATLAS-BC.md` (the by-name fold relay BC.W-ATLAS-ASK consumes).
- `src/components/custom/glass-panel/GlassPanel.vue` (the five-rung ladder over the renderer cascade — retire HELD).
- `src/composables/glass/useGlassRenderer.ts` (the component-local renderer — retires WITH GlassPanel).
- `demo/stories/substrates/glass-panel.vue` (the re-authored MATERIALS gallery — bare rungs, zero GlassPanel).
- `scripts/proof-glass-prune.mjs` (`proof:glass-prune` — the two-register consolidation + probe-gated retire gate).
- `scripts/proof-glass-panel-tiers.mjs` (`proof:glass-panel-tiers` — retires WITH GlassPanel).
