# GlassPanel

## Artefact path (RETIRED — BI.W-GLASS-DEDUP)

`src/components/custom/glass-panel/` + `src/subpaths/glass-panel.ts` + the `./glass-panel`
package.json export + `GlassPanelProps` (api) + `src/composables/glass/useGlassRenderer.ts`
(the `useGlassRenderer`/`createGlassFilter`/`destroyGlassFilter` cluster) + the
`proof:glass-panel-tiers` gate are ALL **DELETED clean-break** (no alias). The published
subpath `@mkbabb/glass-ui/glass-panel` is retired.

## Verdict (RETIRED — BI.W-GLASS-DEDUP, FAM-10; was retire-HELD-folded at BC.W-GLASS-PRUNE)

`RETIRED` — **the prune to TWO registers (Glass CARDS + Glass MATERIALS) LANDED.** The BC
HELD was on a live external consumer (the Atlas); the BI-execution re-probe
(`proof:glass-prune` P5, the registry+constellation sweep) finds **ZERO live external
consumers** — the Atlas has already consumed-and-deleted `<GlassPanel>` in its own tree (the
fold recorded below FIRED). The keyframes consumer the AZ.W-PRUNE2 RESTORE rested on migrated
off long ago. So the destructive retire lands cleanly:

`<GlassPanel>` owned NO distinct mechanism — its `variant` (the 5-rung selector) ≡ Card's
`tier`, its `surface` ≡ Card's `surface`, and its ONE distinct thing —
`useGlassRenderer`/`createGlassFilter` (a JS-canvas `feDisplacementMap`-in-`backdrop-filter`)
— was a SECOND refraction path competing with the house `.glass-lens`/`#glass-refract` axis, a
textbook `proof:no-dual-path` violation with GlassPanel as its ONLY consumer. The glass system
consolidates to: a bare surface → a `.glass-{rung}` MATERIAL or `<Surface tier surface>`; a
content container → a `<Card>`. There is no third "panel" thing. `.glass-lens` is the ONE
refraction door (`proof:no-dual-path` D6).

**Cross-repo peer-bump asks:** the atlas×3 + sci-report×2 site folds (recorded below) ride
`BI.W-FACTOR-ASKS`' migration ledger (the `^5.x` peer bump; the foreign-tree fence — glass-ui
edits ZERO sibling files). Any residual registry consumer of `@mkbabb/glass-ui/glass-panel`
resolves the named fold here (the no-silent-prune floor, BA inv-11).

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

## The retire trigger (LANDED at BI.W-GLASS-DEDUP)

The destructive retire LANDED: `src/components/custom/glass-panel/` + the `/glass-panel`
export + the `useGlassRenderer` runtime filter-builder (`createGlassFilter`/`destroyGlassFilter`)
+ `proof:glass-panel-tiers` are DELETED. The trigger CONDITION was met — the registry-consumer
probe (`proof:glass-prune` P5) confirms ZERO live external consumers (the Atlas fold FIRED).
`proof:glass-prune` flips from the HELD-FOLDED green to the RETIRED green (component dir absent,
subpath barrel absent, export dropped by regen, zero internal imports, zero external consumers,
the MATERIALS-gallery story P6 already bare-rung). `proof:no-dual-path` D6 asserts the second
refraction path (`createGlassFilter`) is DEFINITION-ABSENT and the `.glass-lens` door is KEPT.

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
