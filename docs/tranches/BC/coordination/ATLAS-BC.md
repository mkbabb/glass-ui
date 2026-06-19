# ATLAS-BC — the sci-report Atlas coordination relay (the GlassPanel fold + the Band-10 adopt seam)

> The by-name cross-repo relay for the Connectivity Atlas (`sci-report/atlas`, package
> `usf-web`). glass-ui authors ZERO Atlas-tree edits — the foreign-tree fence (inv-26) is
> binding; every Atlas edit lands in the Atlas repo on ITS `^4.x` bump. This doc records the
> by-name folds the Atlas consume-and-deletes; the full eight-needs adopt ledger is
> `BC.W-ATLAS-ASK` (Band 10). The GlassPanel fold below is contributed by `BC.W-GLASS-PRUNE`
> (Band 1) — the registry-consumer probe found the Atlas as the live external consumer of
> `@mkbabb/glass-ui/glass-panel`, so the prune's retire is SEQUENCED behind this fold.

## Freshness header (the Atlas HEAD + the publish reality)
- **glass-ui** — published `4.0.1` (the Atlas's current pin); branch `tranche/BC`; HEAD
  `ca44e7cf` (the BC Band-1 spine base). The BC cut version is USER-DOMAIN at `BC.W-CUT`.
- **sci-report/atlas** — package `usf-web`; pins `@mkbabb/glass-ui: 4.0.1`
  (`~/Programming/sci-report/atlas/package.json:37`). It imports `@mkbabb/glass-ui/glass-panel`
  in three live SFCs (below). The Atlas has NOT yet adopted the BC cut — `BC.W-ATLAS-ASK` drives it.
- *Re-verify the Atlas HEAD + pin at each consume (`feedback_constellation_baseline_drift`).*

## The binding coordination contract (publish-then-consume + foreign-tree fence)
- **Publish-then-consume.** A BC ship is consumable only after a published `4.x` bump + an Atlas
  `package.json` re-pin; the Atlas typechecks against the PUBLISHED package. The folds below land
  in the Atlas repo on its `^4.x` bump (the `BC.W-ATLAS-ASK` adopt), NEVER in glass-ui.
- **glass-ui writes only its own repo.** This doc + the wave specs are the by-name relay — the
  only channel. `proof:atlas-adopt` A4 (BC.W-ATLAS-ASK) reds any `../sci-report`/`../atlas`
  write-path in a glass-ui wave's File Bounds.

---

## The GlassPanel fold (BC.W-GLASS-PRUNE → the Atlas consume-and-delete)

The glass system consolidates to TWO registers (Glass CARDS + Glass MATERIALS); `<GlassPanel>`
is a TRUE DUPLICATE of `<Card>` and RETIRES (clean break, no alias). The registry-consumer
probe (`proof:glass-prune` P5) found the Atlas as the live external consumer — so the retire is
HELD until this fold lands. Each row: the Atlas call site · the fold target · the delete-trigger.

| # | Atlas need (file:line) | the consume (glass-ui seam) | the delete (what evaporates on the bump) | publish-then-consume |
|---|---|---|---|---|
| GP-1 | `src/platform/charts/HoverCard.vue:44,420` `<GlassPanel variant="floating">` (the transient hover lens) | `<Card tier="floating" surface="glass">` — a content container (the hover card IS a content chassis), reading the floating rung of the consolidated ladder | DELETE the `import { GlassPanel } from "@mkbabb/glass-ui/glass-panel"` + the `<GlassPanel>` mount; the `$el` ref reads the `<Card>` root | the BC `4.x` cut publishes the consolidated `<Card>` (EXISTS); Atlas re-pins `^4.x` |
| GP-2 | `src/platform/chrome/AuroraVeilStage.vue:30,72` `<GlassPanel variant="floating">` (the veil stage wrapping its slot body) | `<Card tier="floating">` — the slot-body chassis (a content container over the aurora veil) | DELETE the GlassPanel import + mount; the slot body re-homes under `<Card>` | the BC `4.x` cut; Atlas re-pins `^4.x` |
| GP-3 | `src/views/GalleryView.vue:13,175` `<GlassPanel …>` (the resting-tier glass seat) | `<div class="glass-resting">` — the bare MATERIAL (a static glass seat, no chassis) OR `<Card tier="resting">` if it wraps content | DELETE the GlassPanel import + mount; the seat composes the `.glass-resting` class directly | the BC `4.x` cut publishes the `.glass-resting` ladder class (EXISTS, `/styles`); Atlas re-pins `^4.x` |

**The renderer note:** the Atlas's GlassPanel mounts use `variant`/`surface` only — none force
the `tier="svg-filter"` renderer preference, so no consumer needs the `createGlassFilter`
runtime filter (it retires WITH GlassPanel; the static `.glass-lens` axis is the ONE refraction
source if a consumer later wants the squircle bend).

### The dest-soundness map (every consume names a real glass-ui surface)
| consume | the dest (must exist in package.json exports / a built class, post-BC-cut) |
|---|---|
| `<Card tier="floating">` | the `<Card>` component on the root barrel + `/card`-style ladder (EXISTS) |
| `<Card tier="resting">` | same — the consolidated CARDS register |
| `<div class="glass-resting">` | the `.glass-resting` ladder class (`/styles`, EXISTS — the MATERIALS register) |
| `.glass-lens` (if a consumer wants refraction) | the `.glass-lens` axis class (`/styles` glass-refract.css, EXISTS) |

### The retire sequencing (the no-silent-prune floor)
The `<GlassPanel>` destructive retire (`src/components/custom/glass-panel/` + the `/glass-panel`
export + the `useGlassRenderer` runtime filter-builder + `proof:glass-panel-tiers`) LANDS only
after this fold lands — i.e. the Atlas's three SFCs consume-and-delete `<GlassPanel>` on the
`^4.x` bump and the registry-consumer probe re-confirms ZERO live external consumers. Until then
`proof:glass-prune` holds the HELD-FOLDED green (the fold recorded, the retire sequenced — never
a silent prune). This is the structural defense the AY-retire-then-AZ-restore loop lacked.

### The binding-verification sweep (the chronic)
The fold is verified by a REAL install + typecheck on the Atlas sibling on its `^4.x` bump
(`memory glass_ui_binding_verification`: a stale `:variant`/`v-model` binding renders fine but is
INERT — vue-tsc + units miss it, only the e2e/typecheck catches). Swept on the bump in
`BC.W-ATLAS-ASK`.

### The foreign-tree fence (inv-26, the headline invariant)
glass-ui edits ZERO Atlas tree. This doc is the by-name relay — the only channel. Every Atlas
edit (the three `<GlassPanel>`→`<Card>`/`.glass-{rung}` swaps + the `^4.x` re-pin) lands in the
Atlas repo on ITS bump, sequenced by `BC.W-ATLAS-ASK`.
