# dock-hub · lens-c — THE PORTAL PILL (audacious cartoon-technicolor punch)

> GREENFIELD BRAINSTORM. Lens: 1940s-technicolor FLOW & PUNCH — bold layered-offset
> cartoon shadow, exaggerated squash/stretch, anticipation → follow-through →
> overlapping action → arcs, real weight & inertia. The boldest, most ALIVE dock-hub
> expansion that is still idiomatic + cross-engine.
>
> Reconciles W-DOCK-HUB-API + W-NO-HARDCODED-REFS + BD.W-NO-HARDCODED-REF +
> BD.W-DOCK-LINK-API against the SHIPPED dock-core morph + dock-fission. A UNION,
> never a fork.

---

## 0. LIVE-INTERROGATE — what is actually on disk (source-verified, both modes)

Navigated `/dock/liquid-playground` + `/dock/dock-gallery` on `:5173`, screenshotted,
`getComputedStyle`'d the live dock root, grepped `src/` + `demo/`.

### Finding 1 — there is NO generalized dock-hub expansion API. The expansions are HARDCODED, overfit, per-surface.

The dock expands via a **FIXED set of bespoke surfaces**, each a hand-built SFC, NOT a
slotted/render-prop contract:

- `/dock/liquid-playground` headline (verbatim, live): *"a glass dock pill that EXPANDS
  into a **Maps Places** sheet, SPLITS into two Dynamic-Island activity islands … grows
  into the full **Apple Music** player."* The mode control is a FIXED enum:
  `Search → sheet · Split → islands · Now Playing`. The expand surface in the DOM is
  `.liquid-sheet` populated with REAL-BRAND map data — `getComputedStyle`/text readback
  returned `"Costco Wholesale · 1305 Hanes Mall Blvd"`, `"A Better Man's Barber ·
  Reynolda Road"`, `"Winston-Salem · North Carolina"`. These are baked into the demo, not
  consumer data.
- `/dock/dock-gallery` (verbatim, live): *"the Apple Music mini-player → player + a
  separate queue panel, a Dynamic Island call pill → full call UI, and a notification
  pill → expanded card."* The gallery tiles are SFCs named for the apps they imitate:
  `demo/stories/dock/examples/AppleMusic.vue`, `DynamicIslandCall.vue`, `Spotlight.vue`,
  `VolumeHUD.vue`, `TabBar.vue`, `AppSwitcher.vue`, `Notification.vue`. **Eight overfit
  facilities, one component each.** There is no `<DockExpand>`/`useDockExpand` that takes
  ARBITRARY content; each shape is a from-scratch composition.

The dock-as-hub is, today, **a museum of cloned Apple apps**, not a generalized hub.

### Finding 2 — the morph ENGINE is fit; the SURFACE-TYPE is overfit into the engine's type system.

The engine layer is genuinely good and must be KEPT:
- `useDockFission.ts` — n-ary detach, ONE `SpringProgress`/`DOCK_SPRING`, `--dock-split-t`,
  `useLiquidFlex` tanh recoil capped ≤1.08, `usePointerVelocityField` seam-tension, PRM
  sync-seat, bidirectional, interruptible velocity re-base. Real metaball necks.
- `useDockLink` (W-DOCK-LINK-API, specced) — `toSurface` / `receive` / `split` /
  `silhouette` verbs over the shipped `useLiquidReveal` / `useDockCtaReceive` / fission /
  silhouette engines. **This is already the right generalization seam.** It is the dock's
  verb facade; it just is not yet the *expansion content contract*, and it is contaminated.

But the surface-TYPE literal is welded into the engine's TYPES (the overfit-into-the-type-
system disease, exactly the user's "no hardcoded facilities like maps"):
- `useDockFission.ts:56` — `export type DockSplitContext = "search" | "media" | "nav"` — a
  closed union baking `"media"` (a SURFACE TYPE) as a first-class engine concept.
- `useDockFission.ts:110-152` — `DOCK_SPLIT_SIGNATURES: Record<DockSplitContext, …>` keyed
  `search`/`media`/`nav` with comments *"media = LATERAL PEEL — the now-playing center
  piece stays"*.
- `useDockShellProps.ts:198` — `splitContext?: "search" | "media" | "nav"`.
- `useDockContextSilhouette.ts` — `silhouette('media')`, *"the now-playing pill DOCKS DOWN
  and MERGES INTO the tab-bar"*.
- `GlassDock.vue:413` — `if (ctx === "media") dy *= 0.25` — a SURFACE-TYPE branch in the
  shell. `README.md:158,249` — *"Media / playback transport"*, *"TransportDock"*.

`BD.W-NO-HARDCODED-REF` already names most of this (NC5 = the `src/` zero-surface-type-
literal floor) and the right fix: `media → lateral` (a GEOMETRIC signature), `search →
radial`, `nav → inward-merge` — **name the GEOMETRY, never the app.** lens-c ADOPTS that
fix and extends it: the `DockSplitContext` union must become an OPEN geometric vocabulary,
not a closed surface-type enum.

### Finding 3 — the morph is liquid + weighty + cross-engine (this is the asset to BUILD ON).

The shipped fission goo (static SVG `filter:url()` in `DockGooFilter.vue`, sRGB interp,
compositor-only `--dock-split-t`) is the real metaball bridge, both engines. The expand
bloom (`useLiquidReveal` source-rect FLIP, `filter` on own pixels not `backdrop-filter`)
paints on Safari. lens-c's punch rides THESE, never a second engine.

---

## 1. THE CORE IDEA — the dock is a PORTAL, content is a PAYLOAD, the API is ONE slot

**Reframe the whole facility.** Stop asking "what shapes can the dock become?" (the
overfit gallery question) and ask "**how does the dock OPEN a hole and let ARBITRARY
content erupt through it?**" (the generalized portal question).

The dock-hub is a **PORTAL PILL**: a dock control is a *door*; expanding it tears a goo
hole in the dock's glass skin and the consumer's content **bloom-erupts** through that
hole, anchored to the door's rect. The library owns the DOOR, the HOLE, the BLOOM, the
GLASS CHROME, the ANCHOR GEOMETRY, the A11Y, and the CARTOON PUNCH of the eruption. The
library owns ZERO content. The content is `<slot>`. Maps, a player, a call, a viz, a
configurator, a colour-field — all are PAYLOADS the consumer drops into the same hole.

### The ONE generalized contract — `<DockPortal>` + `useDockExpand`

A single component, three slots, zero surface-type knowledge:

```vue
<GlassDock>
  <DockPortal>                       <!-- the door + the hole + the bloom orchestration -->
    <template #trigger="{ expand, expanded }">
      <!-- ANY dock control. The consumer's resting affordance (a pill, an icon, a row). -->
      <DockIconButton @click="expand" :aria-expanded="expanded" />
    </template>
    <template #default="{ collapse, rect }">
      <!-- ANY content. A card. A viz. A panel. A configurator. A sheet. The library
           never names it, never shapes it — it just blooms it from `rect`. -->
      <slot />                       <!-- the PAYLOAD — consumer-supplied, arbitrary -->
    </template>
  </DockPortal>
</GlassDock>
```

`useDockExpand(triggerRef, contentRef, opts)` is the composable underneath — and it is
**`useDockLink.toSurface` WEARING A COMPONENT**. No new engine. `toSurface` already blooms
an arbitrary surface from a control's rect via `useLiquidReveal`; `<DockPortal>` is the
declarative skin over that verb plus the cartoon-punch eruption layer. The W-DOCK-HUB-API
"render-prop/slot/component contract" is satisfied by ONE component composing ONE shipped
verb. KISS: the hub is `useDockLink` made declarative.

### The eruption geometry — three generalized MODES, named by TOPOLOGY not by app

The portal opens in one of three **topological** modes — the consumer picks the topology,
never a surface name. These map 1:1 onto the SHIPPED engines (the union, not a fork):

| mode (TOPOLOGY) | engine it composes | what the consumer drops in | the overfit thing it REPLACES |
|---|---|---|---|
| `bloom` | `useLiquidReveal` (source-rect FLIP) | a sheet / card / panel — content erupts from the door rect, page LIVE behind | the `Maps Places` sheet, the `Apple Music` player |
| `fission` | `useDockFission` (n-ary detach + goo neck) | N child islands that goo-split off the body | the `Dynamic Island` two-island split |
| `meld` | `useDockContextSilhouette` (`--dock-silhouette-fuse-t`) | a sibling control that docks-down + fuses | the `now-playing pill → tab-bar` meld |

The mode is a `:mode="'bloom' | 'fission' | 'meld'"` prop — a GEOMETRIC descriptor, the
same way `DockSplitContext` becomes the geometric `radial | lateral | inward-merge`
vocabulary (Finding 2 / BD.W-NO-HARDCODED-REF). **There is no `media` mode, no `maps`
mode, no `player` mode.** A consumer who wants a music player drops a music player into a
`bloom` portal — in THEIR app, as THEIR data (presets-in-consumers).

This is the whole API. Door + hole + payload + topology. Everything the gallery does today
becomes ONE demo per topology, with GENERIC payloads.

---

## 2. THE SINGLE BOLDEST MOVE — THE GOO-TEAR ERUPTION (the dock skin literally rips open)

> The dock does not "expand into" content. The portal **TEARS THE DOCK'S GLASS SKIN** and
> the content **ERUPTS** through the rip — a single continuous liquid-glass membrane that
> stretches, necks, and bursts, with full 1940s cartoon anticipation → follow-through.

This is the technicolor-punch reading of "expand from a pill into arbitrary content," and
it is the move that makes the generalized portal feel ALIVE rather than a generic modal.

### The four beats (anticipation · stretch · burst · settle) — real weight, one scalar

ONE driver scalar `--dock-portal-t` (0 closed → 1 open), one `SpringProgress` on
`DOCK_SPRING` — the SAME spring family as fission/morph (no new constant). The four beats
are phases of that ONE scalar, so re-grabbing mid-eruption velocity-re-bases (interruptible,
the fission `inheritedVelocity` contract reused):

1. **ANTICIPATION (t: 0 → 0.12) — the door INHALES.** Before anything erupts, the trigger
   control *squishes inward* (`useLiquidFlex`, scale ~0.92, vol-preserving) and the
   cartoon cast deepens (the door lifts off its shadow — §design.md "the cast deepens on
   press"). The dock plate's goo filter (`DockGooFilter`) RAMPS ON. This is the classic
   wind-up: the dock pulls back before it punches forward. ~80ms of pure anticipation.

2. **STRETCH / NECK (t: 0.12 → 0.62) — the skin TEARS into a goo neck.** The content
   surface, born at the trigger rect, pulls away from the dock body bridged by a
   **metaball neck** — the SAME `fission-bridge.css` neck + the SAME `--neck-t` /
   `--seam-tension` channels `useDockFission` already drives. The neck stretches and THINS
   under the `usePointerVelocityField` tension (a fast expand thins it faster — the skin
   resists the pull). The content is small-at-the-door, scaling up along an ARC (not a
   straight line — `transform` follows a quadratic-Bézier travel, the cartoon arc), with
   an overlapping-action lag: the content's *trailing edge* lags its *leading edge*
   (`--portal-lag` cross-axis skew) so the surface reads as a heavy elastic membrane, not a
   rigid box.

3. **BURST (t: 0.62) — the neck SNAPS, the merge-splash FIRES.** At the neck-break
   threshold the goo neck snaps (the existing `neckHold` → snap mechanic) and the content
   POPS to full with an exaggerated overshoot (~1.06 squash on the break-axis, immediately
   recoiling — squash & stretch). The shipped **merge-splash** (`fission-bridge.css`
   `[data-merging]` gold-coalesce, the BE.W-DOCK-JUBILANCE one-shot) re-fires here as a
   BURST-splash: a one-shot plus-lighter accent-flood blooms from the snap point and
   clears (EFFECTS trails SPATIAL — the splash fires AFTER the snap, never with it).

4. **SETTLE (t: 0.62 → 1.0) — follow-through + secondary jiggle.** The content settles
   with a low-overshoot ζ≈0.7 wobble (the `DOCK_SPRING` give), and the cartoon cast
   *slides opposite the motion* (§design.md "the cast travels with the gesture, scaled by
   `--motion-weight`") then snaps to rest. A secondary-action micro-bounce ripples through
   any child elements (a staggered `--i`-indexed settle — the overlapping-action tail).

Collapse runs the SAME scalar 1→0: content sucks back through the neck into the door, the
door exhales back to rest, the cast snaps home. Bidirectional on one spring, one clock.

### Why this is the bold move AND idiomatic (the union, not a fork)

The goo-tear eruption is **100% shipped primitives recomposed**: `useLiquidReveal` (the
bloom), `useDockFission`'s neck + `fission-bridge.css` (the tear), `useLiquidFlex` (the
inhale squish), `usePointerVelocityField` (the seam tension), the merge-splash (the burst
flash), the cartoon cast (the punch shadow), `DOCK_SPRING` (the one spring). It mints ONE
new scalar (`--dock-portal-t`) and ONE thin orchestrator (`useDockExpand`, which is
`toSurface` + the four-beat phase map). No second physics core. The boldness is in the
CHOREOGRAPHY of the shipped engines, not in new machinery — that is the lens delivering
PUNCH while staying DEFT.

The "tear" is what makes a GENERALIZED portal feel as alive as a hand-built per-app morph:
because the membrane is the dock's OWN glass skin (one continuous goo surface), ANY payload
erupting through it inherits the dock's liquid identity for free. A viz, a card, a
configurator — all tear out of the same skin with the same weight. The consumer never
choreographs; they drop content in a slot and the portal gives it the eruption.

---

## 3. VISUAL SPEC (perfected glass, paper, cartoon, colourful field)

- **The membrane is six-layer warm-cream glass, NEVER gray** (BA.W-NO-GRAY floor). The
  tearing neck and the erupting surface are the SAME transmissive composite as the dock —
  the eruption is the dock's skin flowing outward, so the warm-cream identity is continuous
  through the tear. The §3 colourful field lives BEHIND the erupted glass (the page / an
  `<Aurora>` reads through the transmissive scrim — T5 live-behind), with a defined edge
  (the W-CORNER-AA rim on the erupted surface).
- **Paper morphism visible** on the erupted content's resting plate (the paper-grain
  shows once settled — the surface is a paper-glass sheet, not flat).
- **Cartoon shadow + punch**: the trigger door and the erupted surface BOTH carry the
  `.shadow-cartoon-{md,lg}` layered-offset cast; the cast TRAVELS during the eruption
  (the moving-cast register, `transform` on a `::after` caster, never animated
  `box-shadow`), deepening at anticipation, sliding through the arc, snapping at settle.
  This is the technicolor-punch signature. PRM → static cast, no travel.
- **√φ audacious type** on any erupted titling (the sqrt-φ display ladder, -1.5% tracking).
- **The BURST accent-flood** is a CONSUMER accent (`--glass-accent`, presets-in-consumers)
  — the splash colour is whatever the payload declares, defaulting to the neutral warm lift
  (no hardcoded crimson).

## 4. CROSS-ENGINE (Chrome + Safari) + a11y/PRM

- **Goo neck**: the shipped `DockGooFilter` static SVG `filter:url()`, `color-interpolation-
  filters="sRGB"`, applied to the OWN pixels of the dock/neck layer — NEVER `backdrop-
  filter:url()`. Paints identically Chrome + WebKit (the fission floor already proves this).
- **Bloom + cast + squish**: `transform` / `opacity` / `filter` on own pixels only
  (compositor-only; `proof:no-layout-animation` owns the corpus). `filter` blur-settle not
  `backdrop-filter` — Safari-safe.
- **`@supports`/PRM floors**: no `filter:url()` support → the neck degrades to a clean
  scale-bloom (no goo, still erupts); PRM → the whole eruption SEATS in one frame (content
  appears settled, cast static, zero neck/squish frames — the fission/reveal PRM sync-seat
  precedent). NO naive ellipsoids — the neck is the real `fission-bridge` metaball merge.
- **A11y**: `aria-expanded` on the trigger; focus moves into the erupted content on open,
  returns to the trigger on collapse; `Escape` collapses; the portal content is a focus
  trap while open. The library owns this; the consumer owns only the payload's internal a11y.

---

## 5. THE NO-HARDCODED-REFS EXCISION (the census + the generalization)

The grep census (Finding 1 + 2) — every hit, the disposition:

- **`src/` engine type-literals (NC5 floor)** — `DockSplitContext = "search"|"media"|"nav"`
  → `"radial"|"lateral"|"inward-merge"` (geometric, OPEN to extension); `silhouette('media')`
  → a geometric/count id; `GlassDock.vue:413 ctx === "media"` → the geometric branch;
  `splitContext` prop → the geometric vocabulary. README *"Media/TransportDock"* → generic
  *"a bloom portal hosting a transport payload (demo)"*. **ADOPTS BD.W-NO-HARDCODED-REF
  verbatim** — lens-c adds only: the union must be OPEN (a `string` geometric descriptor or
  an extensible map), so a consumer can add a topology without editing the library.
- **`demo/` overfit SFCs** — `examples/{AppleMusic,DynamicIslandCall,Spotlight,VolumeHUD,
  TabBar,AppSwitcher,Notification}.vue` → REPLACED by THREE generic topology demos:
  `dock-portal-bloom.vue` (a generic card/panel/viz erupts), `dock-portal-fission.vue`
  (generic N islands split), `dock-portal-meld.vue` (a generic sibling melds). Each drops
  GENERIC content (a "Now Playing" demo MAY exist as ONE consumer of `bloom` with generic
  track strings + NO real brand — the Costco/Barber/Walmart literals PURGED, NC4).
- **`liquid-playground.vue`** — the `Maps Places` / `Apple Music` / `album` mode enum +
  the Costco/Barber map data → the three-topology generic playground (the dock erupts a
  generic glass-card / generic viz-stage / generic configurator, demonstrating that the
  SAME portal hosts ARBITRARY payloads — the ≥3-distinct-payload bar, NOT ≥3 cloned apps).

The gate `proof:dock-hub-api`: (a) `<DockPortal>`/`useDockExpand` exists ONCE, composes
`useDockLink.toSurface` (no second bloom engine — an inline `runBloom`/`new SpringProgress`
REDs); (b) the content is `<slot>`-supplied — a scan asserts the portal has NO hardcoded
surface-type literal / named-app import; (c) the ≥3-distinct-PAYLOAD bar (card + viz +
panel through the SAME portal); (d) the eruption π (the four-beat goo-tear, both modes,
both engines — the neck waist at the split midpoint, the burst-splash trailing the snap,
the cast travel); (e) `proof:no-hardcoded-refs` GREEN (the NC1-NC6 census). Reuses
BD.W-DOCK-LINK-API's `proof:dock-link` C1/C8 (the no-re-fork + no-defineExpose-reach bites).

---

## 6. RECONCILIATION vs the 116 union waves (no dup)

- **vs W-DOCK-CORE (dock-core morph)** — lens-c does NOT touch the collapse/expand+V↔H morph
  (`dockMorphContext`/`--dock-morph-t`). The portal eruption is a BESIDE-the-morph seam (the
  box-INVIOLATE `useDockSearch` precedent), mints its OWN `--dock-portal-t`. No overlap.
- **vs BE.W-DOCK-FISSION (`useDockFission`)** — lens-c CONSUMES fission as the `fission`
  topology + reuses its neck/seam channels for the `bloom` tear. It does NOT re-implement
  fission. It REQUIRES the `media→lateral` geometric rename (BD.W-NO-HARDCODED-REF) — lens-c
  is downstream of that rename, never a second rename owner.
- **vs BD.W-DOCK-LINK-API (`useDockLink`)** — `useDockExpand`/`<DockPortal>` is the
  DECLARATIVE component skin over `toSurface`; LINK-API is the verb facade. They compose;
  lens-c does not fork the facade. The portal IS the missing "expansion content contract"
  the LINK-API verbs lacked.
- **vs W-NO-HARDCODED-REFS / BD.W-NO-HARDCODED-REF** — lens-c is the GENERALIZED-EXPANSION
  half; those are the CENSUS half. They are one wave-amendment: the portal generalizes the
  expansion AND the census excises the refs, gated by `proof:dock-hub-api` +
  `proof:no-hardcoded-refs` together.
- **vs BD.W-CARD-SHEET-EXPAND / W-MAPS-CARD** — the renamed card-sheet becomes ONE generic
  `bloom`-topology PAYLOAD demo, hosted by the portal, never a portal-internal type.

**The wave-amendment**: `W-DOCK-HUB-API` gains the `<DockPortal>` + `useDockExpand` portal
contract (the goo-tear eruption choreography over `toSurface` + fission neck + the cartoon
cast), three GEOMETRIC topologies (`bloom`/`fission`/`meld`), the OPEN geometric `DockSplit`
vocabulary, and the demo re-homing (three generic-payload topology demos replacing the
eight cloned-app SFCs) — gated jointly with the no-hardcoded-refs census. DEFT: one new
component + one new scalar + one thin orchestrator over the shipped engines; the boldness is
the eruption choreography, not new machinery.
