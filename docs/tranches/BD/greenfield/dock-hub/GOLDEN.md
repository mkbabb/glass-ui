# GOLDEN — the DOCK-AS-HUB facility (the canonical greenfield reference)

> **Synthesis of lens-a (pure iOS-27 fidelity) + lens-b (cross-engine/perf) + lens-c
> (cartoon-technicolor punch).** ONE coherent design: the strongest move from each lens,
> the cross-engine + audacity + correctness tensions reconciled. Survival of the fittest —
> keep `useLiquidReveal` (the agnostic spine, already ships), collapse the four-bloom
> fracture, re-invent only the demo (the overfit) + the missing seam.
>
> **Binding law** (design.md + GREENFIELD-HARDENING §1; IOS27-REFERENCE the guiding light):
> perfected warm-cream six-layer glass (NEVER gray, both modes, BA.W-NO-GRAY floor) · a
> COLOURFUL FIELD behind glass + a defined edge · PAPER morphism visible · AUDACIOUS √φ type
> · CARTOON 1940s-technicolor shadow + FLOW & PUNCH (anticipation · exaggeration ·
> follow-through · overlapping action · arcs · squash & stretch with real weight) ·
> LIQUID-WEIGHT UNIVERSAL (inertia/bounce/squish on ALL motion, morph MORE on move, never
> tight/springy) · ARISTOTELIAN golden-ratio proportion · METABALLING PERFECT in Chrome AND
> Safari (static SVG goo, sRGB interp, NO `backdrop-filter:url`, compositor-only, @supports/PRM
> floors, real blob↔meatball merge — NO naive ellipsoids) · DEFT UNION, KISS/DRY, NO LEGACY.

---

## 0 · The verdict the three lenses CONVERGED on (source-verified at HEAD)

All three lenses live-interrogated `/dock/liquid-playground` + grepped `src/`; the diagnosis
is unanimous and grep-confirmed:

1. **The agnostic spine ALREADY SHIPS.** `useLiquidReveal(surface, {trigger, preset, blur})`
   (`src/composables/motion/useLiquidReveal.ts:65`) is genuinely **surface-TYPE-blind** — it
   takes any `Ref<HTMLElement>` + a trigger rect + a preset and blooms scale+fade+blur-settle
   from the source rect via the kf `ElementMorph(settledRect, triggerRect)` inversion. It never
   inspects what the surface IS. glass-ui is **~1 composition away** from the generalized hub.

2. **FOUR bloom engines, ONE substrate — a DRY fracture.** `useLiquidReveal` /
   `useLiquidMorph` / `useBloomUp` / `useDockCtaReceive` ALL compose the **same** kf
   `ElementMorph` + `springTimingFunction` pair (verified verbatim in the `motion/index.ts`
   export comments + grep of all four leaves). Four public verbs over one FLIP/spring runner.

3. **The overfit is REAL and lives at TWO layers — never in `src/` proper:**
   - **The demo IS the hardcoding.** `liquid-playground.vue` ships three MODE buttons —
     `Search→sheet` / `Split→islands` / `Now Playing` — i.e. three *named app facilities*;
     `dock-gallery` is a museum of cloned Apple apps (`examples/{AppleMusic,AppSwitcher,
     Spotlight,VolumeHUD,TabBar,DynamicIslandCall,Notification}.vue`); `AppSwitcher.vue`
     hardcodes `{ label: "Maps" }`; the sheet carries real-brand data ("Costco Wholesale",
     "Winston-Salem", a barber).
   - **The engine ENUMS carry app-domain names one level down.** `useDockFission.ts:56`
     `DockSplitContext = "search" | "media" | "nav"` + `DOCK_SPLIT_SIGNATURES` keyed by those
     names; `useDockContextSilhouette.ts:68` `DockSilhouetteKind = "bar"|"bar+pill"|"split"|
     "search"` (the `"search"` arm is DEAD — typed, never built); `useDockShellProps.ts:198`
     `splitContext?: "search"|"media"|"nav"` (app-domain on the PUBLIC shell);
     `GlassDock.vue:408,413` `if (ctx === "nav")` / `if (ctx === "media") dy *= 0.25` (a
     surface-TYPE branch IN THE SHELL). The *motion data* under those keys is generic
     (`vector: radial|lateral|inward-merge`, `neckHold`, `squishPeak`) — only the KEYS are overfit.

4. **There is NO generalized hub on disk.** `useDockHub` / `useDockExpand` / `<DockExpand>` /
   `<DockPortal>` / `toSurface` — **zero hits in `src/`** (only in PLAN/critique markdown). This
   is greenfield in the truest sense: we design the spine, not patch a facade.

**The fix is a UNION + a rename + a demo rebuild, NOT a new engine.**

---

## 1 · THE GOLDEN CORE — the dock is a PORTAL HUB whose only vocabulary is GEOMETRY + a SLOT

The dock is **one positioned warm-glass body that hosts controls and, on a control's command,
TEARS A GOO HOLE in its own skin and lets ARBITRARY consumer content ERUPT through it — then
sucks it back.** The library owns five nouns: **the source rect, the target rect, the glass
chrome, the cartoon eruption, the a11y contract.** It owns ZERO surface semantics. No "search
mode", no "player mode", no "maps". There is a control, a slot, a *topology*, and a morph
between two rectangles.

### 1.1 The composable spine — `useDockHub` (lens-b's contract, lens-a's runner underneath)

```ts
// src/components/custom/dock/composables/useDockHub.ts
export interface DockHubVerbs {
  /** Bloom a control INTO an arbitrary surface (card · sheet · panel · viz · configurator ·
   *  another dock). Surface-TYPE-blind: two refs + a topology, nothing else.
   *  Composes useElementMorph (the unified runner). */
  toSurface(control: Ref<HTMLElement|null>, surface: Ref<HTMLElement|null>, opts?: ToSurfaceOpts): HubHandle;
  /** Goo-SPLIT a control cluster off the plate via a motion SIGNATURE (not an app name).
   *  Composes useDockFission with a MorphSignature passed directly. */
  split(cluster: Ref<HTMLElement|null>, signature: MorphSignature, opts?: SplitOpts): HubHandle;
  /** Recompose the dock silhouette to an OPEN descriptor (slots[] geometry, not a closed KIND). */
  silhouette(descriptor: DockSilhouetteDescriptor): HubHandle;
  /** Receive an external element INTO a dock control (the inverse). Composes useElementMorph reversed. */
  receive(external: Ref<HTMLElement|null>, target: Ref<HTMLElement|null>, opts?: ReceiveOpts): HubHandle;
}
// HubHandle = { open(): void; close(): void; readonly open: Ref<boolean>; readonly t: Ref<number>;
//               readonly phase: Ref<"rest"|"anticipate"|"erupt"|"settle"|"open"> }
```

`toSurface(control, surface, { topology })` takes **two element refs + a motion shape** — that
is the entire contract. The `surface` is whatever the consumer hands it: a `<Card>`, a `<Drawer>`,
a `<Popover>`, a viz `<Aurora>` configurator, **another `<GlassDock>`**. The verb has **zero
per-kind branch** — it measures `control.rect → surface.rect`, drives ONE spring, applies the
topology's geometry. The named presets (`DOCK_SPLIT_SIGNATURES.lateralPeel` etc.) survive ONLY
as **presets-in-consumers convenience constants** — never as the verb's required type.

### 1.2 The declarative skin — `<DockExpand>` (lens-a/c's slot contract)

A thin SFC a consumer drops around a dock control — the 90% case is markup:

```vue
<GlassDock>
  <DockExpand topology="envelop" v-slot="{ trigger, open, close, phase }">
    <DockIconButton v-bind="trigger" @click="open" />
    <template #surface>
      <Card>…ANY consumer content — the library never sees inside…</Card>
    </template>
  </DockExpand>
</GlassDock>
```

`<DockExpand>` owns the trigger↔surface ref wiring, `aria-expanded`/`aria-controls`/
`aria-haspopup`, focus-move-in-and-restore, Escape-to-close, the focus-trap, and the live-behind
scrim. The consumer owns the content shape, full stop.

### 1.3 The topology vocabulary — GEOMETRY, never an app name (the de-overfit spine)

Four topologies of pure geometry. The consumer picks the topology; there is no `media`/`maps`/
`player`:

| topology | what it does | engine it composes | the overfit it REPLACES |
|---|---|---|---|
| **`envelop`** | the dock's OWN border-box GROWS to contain the surface — one continuous glass body, the GOO-TEAR eruption (the boldest move, §2) | `useElementMorph` morphing `.glass-dock` rect → surface rect + `--dock-portal-t` + the fission neck channels | the pill→sheet that today blooms a *separate* plate |
| **`bloom`** | a SEPARATE surface blooms FROM the control's rect, dock stays put (popover/card over a live-behind scrim) | `useElementMorph` (= `useLiquidReveal` as-is, the kept core) | the `Maps Places` sheet, the `Apple Music` player |
| **`fission`** | the dock CARVES — surviving controls detach along a `MorphSignature` into a sibling island (which is itself a `<GlassDock>` — lens-b's recursion) | `useDockFission` + `DockGooFilter` (signatures demoted to presets) | the `Dynamic Island` two-island split |
| **`receive`** | the INVERSE — an external element flies INTO a dock control (CTA hand-off) | `useElementMorph` reversed | the cta-receive |

**lens-b's recursion (kept):** the "sub-dock split" is NOT a bespoke verb — it is
`toSurface(control, anotherGlassDockRef)` where the surface happens to be a `<GlassDock>`. The
dock is self-similar: **a hub expands into a hub.** No `subdock.css`, no `persistent` flag keyed
to `media`. The goo-split provides the *detach gesture*; `toSurface` provides the *surface*; the
surface is a `<GlassDock>`. ONE recursion, zero new law.

---

## 2 · THE SINGLE BOLDEST MOVE — collapse 4 engines to ONE runner, AND make the dock's own skin TEAR OPEN as a goo membrane

This fuses lens-a's structural cut, lens-b's perf fence, and lens-c's technicolor choreography
into ONE move with two halves:

### 2.1 The structural half (lens-a) — `useElementMorph`, the ONE runner

The four shipped bloom engines all wrap the same kf `ElementMorph` + `springTimingFunction`.
**Collapse them into ONE primitive:**

```ts
// src/composables/motion/useElementMorph.ts
export function useElementMorph(opts?: ElementMorphOptions): {
  morphTo(fromRect: DOMRect, toRect: DOMRect, signature?: MorphSignature): void;
  settle(): void;
  reverse(): void;       // bidirectional, velocity-continuous re-base
  readonly t: Ref<number>;
};
```

A single FLIP/spring runner with **no surface semantics** — ONE rAF across the entire dock (the
FLIP-SPINE one-runner fence). The four public verbs become thin **topology adapters** over it:
- `bloom` = `useLiquidReveal`'s source-rect inversion, kept AS the core (the fittest engine).
- `envelop` = morph the dock's OWN `.glass-dock` border-box as the `toRect` (the boundary-as-surface).
- `fission` = N-piece morph driven by `useDockFission` with a neck `MorphSignature`.
- `receive` = morph reversed `toRect→fromRect`.

`useLiquidMorph`'s duplicate FLIP loop is **DELETED** (the DRY close). `useLiquidReveal` /
`useBloomUp` / `useDockCtaReceive` are RE-IMPLEMENTED over the one runner but **keep their public
names** (no breaking churn for the gestalt — they are stable consumer API). No legacy aliases.

### 2.2 The audacious half (lens-c) — the GOO-TEAR ERUPTION on the `envelop` topology

Because there is now ONE runner that morphs *any rect to any rect*, the dock's OWN boundary
becomes a legal morph target. `topology="envelop"` does not "show a card beside the dock" — it
**TEARS THE DOCK'S GLASS SKIN** and the content **ERUPTS** through the rip as one continuous
liquid-glass membrane, with full 1940s cartoon anticipation → follow-through. This is the read no
demo does generically today.

**ONE driver scalar `--dock-portal-t`** (0 closed → 1 open), one `SpringProgress` on the SHIPPED
`DOCK_SPRING {response:0.32, ζ:0.7}` — the SAME spring family as fission/morph (no new constant).
Re-grabbing mid-eruption velocity-re-bases (the fission `inheritedVelocity` contract reused). The
four beats are phases of that ONE scalar:

1. **ANTICIPATION (t 0→0.12) — the door INHALES.** The trigger control squishes inward
   (`useLiquidFlex`, scale ~0.92, volume-preserving) and the cartoon cast DEEPENS (the door lifts
   off its `.shadow-cartoon-lg` offset shadow). The dock plate's `DockGooFilter` RAMPS ON.
   ~80ms of pure wind-up — the dock pulls back before it punches forward.
2. **STRETCH / NECK (t 0.12→0.62) — the skin TEARS into a goo neck.** The surface, born at the
   trigger rect, pulls away bridged by a **metaball neck** — the SAME `fission-bridge.css` neck +
   the SAME `--neck-t`/`--seam-tension` channels `useDockFission` already drives. The neck
   stretches and THINS under `usePointerVelocityField` tension (a fast pull thins it faster — the
   skin resists). The content scales up along an ARC (a quadratic-Bézier travel, not a straight
   line), with overlapping-action lag (the trailing edge lags the leading edge via a `--portal-lag`
   cross-axis skew) so the surface reads as a heavy elastic membrane.
3. **BURST (t 0.62) — the neck SNAPS, the merge-splash FIRES.** At the neck-break threshold the
   goo neck snaps (the existing `neckHold`→snap mechanic) and the content POPS to full with an
   exaggerated ~1.06 squash on the break-axis, immediately recoiling (squash & stretch). The
   shipped **merge-splash** (`fission-bridge.css` `[data-merging]` gold-coalesce, the
   BE.W-DOCK-JUBILANCE one-shot) re-fires as a BURST-splash from the snap point and clears
   (EFFECTS trails SPATIAL — the splash fires AFTER the snap, never with it).
4. **SETTLE (t 0.62→1.0) — follow-through + secondary jiggle.** The content settles with the
   `DOCK_SPRING` ζ≈0.7 give (a hair of overshoot, NO overshoot-past-gone on the close leg), the
   cartoon cast slides opposite the motion then snaps home, a secondary-action micro-bounce
   ripples through child elements (the `--i`-indexed stagger tail).

Collapse runs the SAME scalar 1→0: content sucks back through the neck into the door, the door
exhales, the cast snaps home. **Bidirectional on one spring, one clock, interruptible.**

> **The boldest move in one line:** *kill the four-bloom-engine fracture down to ONE
> `useElementMorph` runner, promote the dock's own border-box to a first-class morph target, and
> make the `envelop` eruption a continuous GOO-TEAR of the dock's own glass skin — so ANY payload
> inherits the dock's liquid identity for free, with full cartoon anticipation→burst→follow-through,
> 100% from shipped primitives recomposed.*

**Why bold AND deft (the union, not a fork):** the goo-tear is `useLiquidReveal` (bloom) +
`useDockFission`'s neck + `fission-bridge.css` (tear) + `useLiquidFlex` (inhale) +
`usePointerVelocityField` (tension) + the merge-splash (burst) + the `.shadow-cartoon-*` cast +
`DOCK_SPRING` (one spring). It mints ONE scalar (`--dock-portal-t`) and ONE orchestrator
(`useElementMorph` + the four-beat phase map). No second physics core. The boldness is in the
CHOREOGRAPHY of shipped engines, not new machinery.

---

## 3 · The motion + visual spec (iOS-27 liquid-weight, perfected glass, both modes)

- **Spring:** ONE register — the shipped `DOCK_SPRING {response 0.32, ζ 0.7}` for
  envelop/fission/receive (weighty, a hair of give, low-overshoot exit per IOS27 T1); `bouncy`
  for `bloom` (the source-rect grace). No second clock.
- **Squish/grace (T10):** every open carries the `useLiquidFlex` volume-preserving squish — the
  surface scales **≈0.88 → 1** with X·Y≈1 (real deformation, not a flat 0.95), fade-coupled,
  capped ≤1.08 anti-taffy. The dismiss is the SQUISH+FADE inverse with NO overshoot-past-gone.
- **Morph-MORE-on-move:** while a drag-driven open is in flight, the neck/boundary stretches with
  pull velocity (`usePointerVelocityField` seam-tension, capped LOW) — inertia, not a tight snap.
- **The IN-vs-OUT branch (lens-b, geometry-only):** the hub picks `envelop` (in-footprint, rides
  `--dock-portal-t` + `.glass-dock` boundary morph, box-INVIOLATE — reads `dockMorphContext.dimOf`,
  never edits it) vs `bloom` (detached sibling beside the box-INVIOLATE `.glass-dock-frame`) off
  whether the surface ref is a dock descendant or a portal'd sibling — ONE branch, geometry-only,
  NO surface-TYPE branch.
- **Glass material (BA.W-NO-GRAY floor, both modes):** the membrane is the warm-cream six-layer
  transmissive composite — light `srgb(0.944 0.903 0.865 / .52)`, dark `srgb(0.350 0.295 0.249 /
  .56)` (live-measured, never gray). The tearing neck + erupting surface are the SAME composite as
  the dock — the eruption is the dock's skin flowing outward, warm-cream identity continuous through
  the tear. Media-variant opts into `.glass-deep` (14–20px blur) over a vibrant backdrop.
- **§3 colourful field + edge:** the live page / an `<Aurora>` reads THROUGH the transmissive scrim
  (T5 live-behind, brown-tinted, never flat black); the erupted surface carries the W-CORNER-AA rim
  (the defined edge). `envelop` couples the boundary fraction into `--glass-level` so a full-envelop
  sheet ramps translucent→near-opaque (the T6 detent-glass coupling rides the SAME machinery).
- **Paper morphism:** the erupted content's resting plate shows the paper grain once settled.
- **Cartoon cast (technicolor punch):** trigger door + erupted surface BOTH carry
  `.shadow-cartoon-{md,lg}` layered-offset cast; the cast TRAVELS during the eruption (`transform`
  on a `::after` caster, NEVER animated `box-shadow`), deepening at anticipation, sliding through
  the arc, snapping at settle. PRM → static cast, no travel.
- **√φ audacious type:** any erupted titling uses the sqrt-φ display ladder, -1.5% tracking.
- **The BURST accent-flood** is a CONSUMER accent (`--glass-accent`, presets-in-consumers) —
  defaulting to the neutral warm lift (no hardcoded crimson).
- **Aristotelian proportion:** the portal's settled rect, the neck waist, the cast offset all
  derive from φ ratios off the trigger rect (the golden-ratio bloom).

---

## 4 · Cross-engine (Chrome + Safari) + a11y/PRM carve

**Compositor-only by construction** (lens-b's fence) — the whole spine inherits the shipped
engines' floors:
- `useElementMorph` writes ONLY `transform`/`opacity`/`filter` on the surface's OWN pixels — never
  width/height/top/left (the `proof:no-layout-animation` fence), never per-frame `backdrop-filter:
  url()` (the WebKit trap). The `filter: blur()` decongest is on the surface's own pixels.
- **The goo neck** rides `DockGooFilter` — the static SVG `filter:url(#…)` graph (feGaussianBlur +
  feColorMatrix threshold + feComposite, all WebKit-supported), `color-interpolation-filters:sRGB`
  (the neck reads right on Safari, not the linearRGB-wrong waist), the REGULAR `filter` property.
  Static graph, never per-frame re-authored. **Real metaball merge — NO naive ellipsoids.**
- **The 4th field channel** (optional consumer hue) writes a registered `@property
  --glass-ambient-strength` on the FIELD element — a paint-prop interp (Baseline), not a layout
  animation, Safari-safe.
- **One-runner / offscreen-park:** the hub holds at most ONE in-flight rAF; closing cancels the
  open's rAF (the `cancelRaf` in every engine). An unmounted-surface hub runs nothing. No
  steady-state `backdrop-filter` re-blur loop.
- **`@supports` floor:** no `filter:url()` support → the neck degrades to a clean scale-bloom (no
  goo, still erupts).
- **PRM:** `useElementMorph` honors `prefers-reduced-motion` → instant topology swap, zero
  neck/squish/cast-travel frames, fade-only (the floor in `useLiquidReveal`); the field hue lands
  instantly (a colour change is not vestibular). Fission → instant island materialize.
- **a11y:** `<DockExpand>` sets `aria-expanded`/`aria-controls`/`aria-haspopup` on the trigger,
  moves focus into the surface on open + restores on close, Escape closes, focus-trap while open,
  `useDockClickIntegrity` (ships) guards the mid-morph tap. The island sub-dock is a real
  `<GlassDock>` (full keyboard/roving model inherited).
- **Both modes:** the warm-cream composite, light + dark, never gray.

---

## 5 · How it composes EXISTING primitives (DEFT, KISS, a UNION not a fork)

| Hub need | Existing primitive CONSUMED | New code |
|---|---|---|
| the ONE morph runner | the kf `ElementMorph` + `springTimingFunction` (substrate of all 4) | `useElementMorph` — the unification, the only real BUILD |
| `bloom` topology | `useLiquidReveal` (kept AS the core) | thin adapter |
| `envelop` topology | `dockMorphContext`/`--dock-morph-t` (box-INVIOLATE) + `--glass-level` coupling + the goo-tear over `fission-bridge.css` necks | `--dock-portal-t` + the four-beat phase map |
| `fission` topology | `useDockFission` + `DockGooFilter` + `DOCK_SPLIT_SIGNATURES` (→ presets) | re-type `split(signature: MorphSignature)` |
| `receive` topology | `useDockCtaReceive` (reversed `useElementMorph`) | thin adapter |
| `silhouette` verb | `useDockContextSilhouette` over an OPEN descriptor | delete dead `"search"` arm |
| glass chrome | `.glass-dock` tiers, `useGlassBackdropLuminance`, `.glass-deep` | none |
| cartoon cast | `.shadow-cartoon-{md,lg}` + the `--motion-weight` traveling-cast | none |
| squish | `useLiquidFlex` (tanh, capped ≤1.08) | none |
| seam tension | `usePointerVelocityField` | none |
| burst splash | `fission-bridge.css` merge-splash (BE.W-DOCK-JUBILANCE) | none |
| a11y | `useDockClickIntegrity` (mid-morph tap guard) | focus-move + aria on `<DockExpand>` |
| the sub-dock IS a dock | `<GlassDock>` recursively (lens-b) | none |

**The four old verbs are RETAINED as the public API surface** (no breaking churn) but
re-implemented over the one runner; `useLiquidMorph`'s duplicate FLIP loop is DELETED. No legacy
aliases (the no-backwards-compat law).

---

## 6 · The de-overfit excision (the `proof:no-hardcoded-refs` arm — every hit)

**`src/` proper is CLEAN** of app-facility *names*; the overfit is the engine ENUMS + the DEMOS:

| Hit | File:line | Excision |
|---|---|---|
| `DockSplitContext = "search"\|"media"\|"nav"` | `useDockFission.ts:56` | re-type over a `vector`-keyed `MorphSignature` SHAPE; `DOCK_SPLIT_SIGNATURES` → motion-named presets (`radialBurst`/`lateralPeel`/`inwardMerge`) |
| `splitContext?: "search"\|"media"\|"nav"` | `useDockShellProps.ts:198` | DELETE; the shell takes a `MorphSignature` (or a motion-named preset) |
| `if (ctx === "nav")` / `if (ctx === "media") dy *= 0.25` | `GlassDock.vue:408,413` | branch on the SIGNATURE's `vector`/scalar, not the app name |
| `DockSilhouetteKind = "...\|search"` (dead arm) | `useDockContextSilhouette.ts:68` | open the union to a descriptor SHAPE; DELETE the dead `"search"` arm |
| three MODE buttons + `Maps`/`Apple Music` prose | `liquid-playground.vue` | rebuild around GENERIC content: ONE `<DockExpand topology>` opens {Card, Drawer, Popover, viz-configurator} |
| `places[]`/`recents[]` "Costco"/"Winston-Salem" | `liquid-playground.vue` | generic placeholder ("Item A", "Place 1") |
| `{ label: "Maps" }` | `AppSwitcher.vue:25` | `GridSurface.vue` — neutral labels (`Panel A…F`), oklch hues |
| `examples/AppleMusic.vue` | demo | `MediaSurface.vue` — generic art slot + marquee + transport, `fieldHue` a prop, no brand |
| `examples/{Spotlight,VolumeHUD,TabBar,DynamicIslandCall,Notification}.vue` | demo | `CommandSurface`/`LevelHUD`/`NavStrip`/`CallIsland`/`Toast` — generic glass precepts |

The rebuilt demo is the **≥3-distinct-surface gate (H3)**: ONE `<DockExpand topology>` opens (1) a
`<Card>`, (2) a `<Drawer>`/sheet, (3) a `<Popover>`, (4) a viz `<Aurora>`/`<VizStudio>` configurator
— each via `hub.toSurface(ctrl, ref)` with ZERO per-kind branch, asserted by a **call-expression
scan**, not a keyword grep. THIS proves the spine is agnostic.

---

## 7 · The acceptance bar + the born-RED gate (real, reproduces the gesture, judges the gestalt)

### 7.1 `proof:dock-hub` (source-structure, `["local","ci"]`, comment-strips first)

- **H1** `toSurface` is surface-TYPE-blind — no `if (surface instanceof…)`, no `kind:"card"|
  "sheet"…` discriminant, no per-surface branch. Signature is `(control, surface, opts?)` over
  `Ref<HTMLElement|null>`.
- **H2** NO app-domain enum gates a public verb. `split` takes a `MorphSignature` shape;
  `silhouette` takes an OPEN descriptor; the shell has NO `splitContext:"search"|"media"|"nav"`.
  `DOCK_SPLIT_SIGNATURES.*` survive ONLY as motion-named presets-in-consumers. **Born-RED on HEAD —
  the enums exist today** (`useDockFission.ts:56`, `useDockShellProps.ts:198`, `GlassDock.vue:413`).
- **H3** ≥3 DISTINCT surface KINDS bloomed by the ONE `toSurface`, call-sites scanned not keywords
  (card · sheet · popover · viz-configurator — pick ≥3). **Born-RED on HEAD — no `<DockExpand>` exists.**
- **H4** the named "instances" genuinely route through `useDockHub` OR are honestly exempted in
  `dock-hub-census.md` (no silent "it's an instance" the wave spec contradicts).
- **H5** ONE morph rAF runner (`useElementMorph`) — a 2nd/3rd bloom runner anywhere REDs. **Born-RED
  on HEAD — four bloom engines run today** (`useLiquidReveal`/`useLiquidMorph`/`useBloomUp`/
  `useDockCtaReceive` each instantiate their own loop).

### 7.2 `proof:no-hardcoded-refs` (§6)

Greps `src/` AND the canonical dock demos for app-facility names (`maps`, `apple music`, `spotify`,
`album`, `places`, `costco`, brand strings) → asserts ZERO in `src/` and ZERO BRANDED facilities in
the canonical demos (a generic-shape demo is fine; a brand-named one REDs). **Born-RED on HEAD.**

### 7.3 The binding π (reproduces the REAL gesture — the readback that proves it)

A script clicks a dock control and captures the FRAME-SERIES of the open, asserting:
- **(a) the squish** — `scale ≠ 1` mid-flight with `X·Y ≈ 1` (volume-preserving, not a flat scale);
- **(b) the topology geometry** — `envelop`: the `.glass-dock` border-box GROWS + the goo waist
  reads at the tear midpoint + the burst-splash trails the snap; `bloom`: the source-rect inversion;
  `fission`: the neck waist + the three-capsule rest + the re-merge;
- **(c) bidirectional + interruptible** — a mid-open re-grab joins the same trajectory; close runs
  the spring in reverse with NO overshoot-past-gone;
- **(d) the cartoon cast TRAVELS** — the `::after` caster offset is non-static mid-flight;
- **(e) BOTH modes** (light + dark, warm-cream never gray) + **BOTH engines** (chromium + webkit);
- **born-RED on a flat/instant/fade-only entrance.**

Plus the `proof:ba-gestalt` dock verdict on a fresh BD capture (the gestalt is the bar: arbitrary
content via a clean API, no app facility, perfected glass, cartoon punch).

### 7.4 The readback sketch (born-RED — the π's core assertion)

```js
// pi/dock-hub-eruption.mjs (sketch) — born-RED on HEAD (no <DockExpand>, four runners, app enums)
const frames = await captureMorphFrames(page, '[data-dock-expand] [data-trigger]'); // click→settle
// (a) squish present + volume-preserving
const mid = frames[Math.floor(frames.length * 0.4)];
assert(Math.abs(mid.scaleX - 1) > 0.05, 'RED: no squish — flat entrance');
assert(Math.abs(mid.scaleX * mid.scaleY - 1) < 0.12, 'RED: not volume-preserving');
// (b) envelop boundary GROWS (the dock's own rect is the morph target)
assert(frames.at(-1).dockRect.width > frames[0].dockRect.width * 1.3, 'RED: dock did not envelop');
// (b) goo waist reads at the tear midpoint (Safari + Chrome)
assert(neckWaistRatio(frames) < 0.5, 'RED: no metaball waist — fade-disconnect');
// (c) bidirectional, no overshoot-past-gone on close
const close = await captureMorphFrames(page, '...', { reverse: true });
assert(close.at(-1).opacity === 0 && !overshotPastGone(close), 'RED: close overshoots past gone');
// (d) cartoon cast travels
assert(castOffsetVariance(frames) > 0, 'RED: cast is static — no technicolor punch');
// (e) born-RED structural arms
assert(countBloomRunners(src) === 1, 'RED: H5 — more than one morph rAF runner');
assert(!hasAppDomainEnum(src, 'DockSplitContext'), 'RED: H2 — app-domain enum gates a verb');
```

---

## 8 · Reconcile vs the 116 union waves + W-DOCK-HUB-API (no dup, AMENDMENT)

- **W-DOCK-HUB-API is AMENDED, not duplicated.** (a) make `useElementMorph` (the four-engine
  unification) the explicit deliverable — the wave says "does not fork a second morph engine" but
  disk already HAS four; the hub must COLLAPSE them. (b) `<DockExpand>` + `useDockHub` (the 4-verb
  facade + the SFC). (c) re-type `DockSplitContext`→`MorphSignature` + demote signatures to presets;
  DELETE `splitContext` prop + the `ctx === "media"` branch; DELETE the dead `DockSilhouetteKind=
  "search"` arm. (d) the de-overfit census targets the DEMO + the engine enums (src/ proper is clean).
  (e) the ≥3-distinct-surface bar (H3) replaces the ≥2.
- **vs W-DOCK-CORE** — the hub's `envelop` CONSUMES the bounded `--dock-morph-t` scalar
  (box-INVIOLATE — reads `dimOf`, never edits `dockMorphContext`/`DOCK_SPRING`); mints its OWN
  `--dock-portal-t` for the eruption. No dup.
- **vs BE.W-DOCK-FISSION** — the hub's `fission` topology IS `useDockFission`; the only change is
  re-typing the signature over a `MorphSignature` + demoting the app-name signatures to presets. No
  engine fork. Downstream of the `media→lateral` geometric rename (BD.W-NO-HARDCODED-REF).
- **vs BD.W-DOCK-LINK-API** — `<DockExpand>`/`useDockHub` is the declarative skin over the verbs;
  they compose, no facade fork. The portal IS the missing "expansion content contract".
- **vs W-DOCK-SCROLL-FISSION / W-MEDIA-DOCK** — those become INSTANCES of the hub (a media-dock is
  `<DockExpand topology="envelop">` with media-shaped consumer content; scroll-fission wires
  `useScrollChrome`→the hub's `fission`). The hub is the spine they ride.

---

## 9 · Why this is the GOLDEN read (the strongest move from each lens, reconciled)

- **From lens-a (the structural spine):** ONE `useElementMorph` runner + the dock-boundary-as-
  morph-target (the `envelop` topology) — the DRY cut that heals the four-engine fracture and makes
  the dock literally GROW into the panel as one continuous body.
- **From lens-b (the generality + perf):** the surface-TYPE-blind `(control, surface)` contract, the
  recursive `toSurface(→<GlassDock>)` self-similarity (a hub expands into a hub), the OPEN descriptor
  for `silhouette`, the geometry-only IN-vs-OUT branch, and the compositor-only Safari fence.
- **From lens-c (the technicolor punch):** the four-beat GOO-TEAR eruption (anticipation→stretch→
  burst→settle) on ONE `--dock-portal-t` scalar, the cartoon traveling cast, the merge-splash burst
  — so the GENERALIZED portal feels as ALIVE as a hand-built per-app morph, because the membrane is
  the dock's OWN glass skin and every payload inherits its liquid identity for free.

**The tension resolved:** lens-a's audacious boundary-morph and lens-c's audacious goo-tear are THE
SAME move — the `envelop` topology IS the goo-tear of the dock's own boundary. lens-b's perf fence
constrains both to compositor-only + the one runner. The correctness bar (Safari goo, PRM, a11y,
box-INVIOLATE) is lens-b's floor applied to lens-a/c's audacity. The result: the dock stops being
"the thing with a maps mode and a music mode" and becomes **a glass hub that erupts ANYTHING** —
exactly, verbatim, what the user asked for.

---

## 10 · The build manifest (the deliverables, in dependency order)

1. `src/composables/motion/useElementMorph.ts` — the ONE runner (the unification; the only real new engine).
2. Re-implement `useLiquidReveal`/`useBloomUp`/`useDockCtaReceive` over it; DELETE `useLiquidMorph`'s loop.
3. `src/components/custom/dock/composables/useDockHub.ts` — the 4-verb facade.
4. `src/components/custom/dock/DockExpand.vue` — the declarative skin (slots + a11y + scrim).
5. `--dock-portal-t` + the four-beat phase map + the goo-tear CSS (reuse `fission-bridge.css` necks).
6. Re-type `DockSplitContext`→`MorphSignature`; demote `DOCK_SPLIT_SIGNATURES`→presets; DELETE
   `splitContext` prop + the `ctx==="media"` branch + the dead `DockSilhouetteKind="search"` arm.
7. Rebuild the demo: `liquid-playground.vue` around generic `<DockExpand topology>` × {Card, Drawer,
   Popover, viz}; replace the cloned-app SFCs with generic glass precepts.
8. `pi/dock-hub-eruption.mjs` (§7.4) + `proof:dock-hub` + `proof:no-hardcoded-refs` + the
   `dock-hub-census.md`.

A prototype of the boldest mechanism (the goo-tear `envelop` eruption) is de-risked under
`docs/tranches/BD/greenfield/dock-hub/golden/` — see the spike.
