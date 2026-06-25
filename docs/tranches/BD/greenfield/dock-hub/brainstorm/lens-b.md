# Dock-as-Hub — Greenfield (Lens B: cross-engine / perf-first)

**Lens** Chrome+Safari parity · compositor-only · KISS. **Method** read W-DOCK-HUB-API + the
dock-hub-generality critique + IOS27-REFERENCE + GREENFIELD-HARDENING + the shipped engines
(`useLiquidReveal`, `useBloomUp`, `useDockCtaReceive`, `useDockFission`, `useDockContextSilhouette`)
+ GlassDock shell/slots; live-inspected `/dock/liquid-playground` + `/dock/dock-gallery` both
mode-readable. Every cited symbol grep-verified at HEAD. Design is GREENFIELD; the status quo is
the foil, not the anchor.

---

## 0 · What the live surface + grep actually prove (the ground truth)

**The overfit is REAL and VISIBLE, at two layers.**

1. **The demos hardcode app facilities (the surface layer).** Live census of the rendered DOM:
   - `/dock/liquid-playground` body text + UI: `Maps`, `Places`, `Apple Music`, `Album`, `Now Playing`,
     `Player`, `Search` — the expand modes are a frozen enum `Search→sheet | Split→islands | Now Playing`,
     each wired to a named app surface (`liquid-playground.vue:70-73,101,401-409,541-625`).
   - `/dock/dock-gallery`: 7 tiles, every one a named iOS app facility — `Apple Music`,
     `Notification`, `Spotlight`, `Volume` HUD, `App Switcher`, `Tab Bar`, `Dynamic Island` (the
     `examples/` folder: `AppleMusic.vue`, `Notification.vue`, `Spotlight.vue`, `VolumeHUD.vue`,
     `AppSwitcher.vue` (`{ icon: Map, label: "Maps", hue: 150 }`), `TabBar.vue`, `DynamicIslandCall.vue`).

2. **The overfit is also one level DOWN, in the engines (the critique's load-bearing finding,
   grep-confirmed).** The expand "verbs" delegate to engines keyed by APP-DOMAIN names, not motion
   shapes:
   - `useDockFission.ts:56` — `export type DockSplitContext = "search" | "media" | "nav"` + the frozen
     `DOCK_SPLIT_SIGNATURES` map (`:110`). The MOTION data is generic (`vector: radial|lateral|inward-merge`,
     `neckHold`, `staggerRank`, `squishPeak`) but the KEYS are app-feature names.
   - `useDockContextSilhouette.ts:68` — `DockSilhouetteKind = "bar" | "bar+pill" | "split" | "search"`
     (`"bar+pill"` = now-playing-media-specific; `"search"` is a typed-but-never-built DEAD arm).
   - `GlassDock`'s shell prop: `useDockShellProps.ts:198` — `splitContext?: "search" | "media" | "nav"`.
     The app-domain enum is on the PUBLIC shell.

3. **There is NO generalized expand API shipped.** `useDockLink` / `useDockExpand` / `toSurface` /
   `spawnSubDock` / `<DockExpand>` — **zero hits in `src/`** (only in PLAN/critique markdown). The
   critique audited a plan that was never built. What ships is FOUR distinct, surface-agnostic-OR-overfit
   primitives never unified behind one contract:
   - `useLiquidReveal(surface, {trigger})` — genuinely surface-TYPE-blind source-rect bloom (any
     `Ref<HTMLElement>` + trigger; no surface inspection). **The agnostic spine already exists.**
   - `useBloomUp(source, dest, {fieldHue, field})` — source≠dest FLIP + the 4th ambient-hue field channel.
   - `useDockCtaReceive` — the inverse (external→dock).
   - `useDockFission` — the goo n-ary split (overfit enum, generic motion underneath).

**Conclusion: glass-ui is ~1 composition away from the generalized hub.** The agnostic bloom is shipped;
the gap is (a) NO single contract unifies the verbs, (b) the verbs that exist are gated by app-domain
enums, (c) the demos brand everything. The fix is a UNION + a rename, not a new engine.

---

## 1 · The core idea — `useDockHub`: ONE contract, four verbs, zero app-domain types

A single composable `useDockHub(dock)` returns the generalized hub spine. It owns the MORPH + the GLASS
chrome + the ANCHOR geometry + the a11y (focus-move, escape, `aria-expanded`). It owns NONE of the
content shape. The content is a consumer-supplied `Ref<HTMLElement>` (any component, any layout).

```ts
// src/components/custom/dock/composables/useDockHub.ts
export interface DockHubVerbs {
  /** Bloom a control INTO an arbitrary surface (card · sheet · panel · viz · configurator · another dock).
   *  Surface-TYPE-blind: takes two refs, nothing else. Composes useLiquidReveal/useBloomUp. */
  toSurface(control: Ref<HTMLElement|null>, surface: Ref<HTMLElement|null>, opts?: ToSurfaceOpts): HubHandle;
  /** Goo-SPLIT a control cluster off the plate via a motion SHAPE (not an app name).
   *  Composes useDockFission with a DockSplitSignature passed directly. */
  split(cluster: Ref<HTMLElement|null>, signature: DockSplitSignature, opts?: SplitOpts): HubHandle;
  /** Recompose the dock silhouette to an OPEN descriptor (slots[], not a closed KIND union). */
  silhouette(descriptor: DockSilhouetteDescriptor): HubHandle;
  /** Receive an external element INTO a dock control (the inverse). Composes useDockCtaReceive. */
  receive(external: Ref<HTMLElement|null>, target: Ref<HTMLElement|null>, opts?: ReceiveOpts): HubHandle;
}
// HubHandle = { open(): void; close(): void; readonly open: Ref<boolean>; readonly t: Ref<number> }
```

The four verbs are a thin FACADE over the shipped engines. `toSurface` IS `useLiquidReveal`/`useBloomUp`
(it already takes-any-ref). `split` IS `useDockFission` (but parameterized over the SIGNATURE SHAPE, not
the enum). `silhouette` IS `useDockContextSilhouette` (but over an OPEN descriptor). `receive` IS
`useDockCtaReceive`. **No fifth engine. No new rAF spring. No fork.** The hub is the missing seam that
makes them ONE vocabulary.

`<DockExpand>` is the declarative twin — a thin SFC that wires `useDockHub().toSurface` over a `#trigger`
slot + a `#surface` slot + manages `aria-expanded`/focus/escape, so the 90% case is markup:

```vue
<DockExpand :anchor="ctrlRef">
  <template #trigger="{ open, expanded }">…any control…</template>
  <template #surface>…ANY consumer content: <Card/> · <VizStudio/> · <Drawer/> · <GlassDock/>…</template>
</DockExpand>
```

**The boldest move (see §2). The whole thing is a 4-method facade + 1 SFC over engines that already ship —
the generality is bought by DELETING app-domain types, not by adding machinery.**

---

## 2 · THE BOLDEST MOVE — kill the app-domain enums; the "sub-dock" is just `toSurface` into a `<GlassDock>`

Two clean breaks (NO-LEGACY law — no aliases):

**(a) `DockSplitContext` / `DockSilhouetteKind` / `splitContext` prop → DELETED. Replaced by motion
SHAPES.** `useDockFission.split(signature: DockSplitSignature)` where `DOCK_SPLIT_SIGNATURES` survives ONLY
as a `presets-in-consumers` convenience object (`{ radialBurst, lateralPeel, inwardMerge }` — named by
MOTION, not app-feature). The shell loses `splitContext?: "search"|"media"|"nav"` entirely; a consumer
passes a `DockSplitSignature` (or one of the three motion-named presets). `silhouette()` takes a
`DockSilhouetteDescriptor` whose `kind` field is GONE — the descriptor IS its `slots[]` geometry; there
is no closed app-shape union to choose from.

**(b) The "sub-dock split" is NOT a bespoke verb — it is `toSurface(control, anotherDockRef)` where the
surface happens to be a `<GlassDock>`.** This is the single sharpest unification: the critique's whole
"W-DOCK-SUBDOCK is a `persistent` flag on the `media` signature, not a generic split" complaint dissolves
because a sub-dock is the recursive base case. A dock control blooms (via the goo-split for the detach
gesture, then `toSurface` for the surface materialize) into a SEPARATE `<GlassDock>` — which is itself a
hub. **The dock is self-similar: a hub expands into a hub.** No `subdock.css`, no `persistent` flag, no
`onPersist` keyed to `media`. The goo-bridge (`useDockFission` + `DockGooFilter`) provides the *detach
gesture*; `toSurface` provides the *surface*; the surface is a `<GlassDock>`. ONE recursion, zero new law.

This is bold because it reframes the entire fission/sub-dock/now-playing/maps zoo as **instances of one
recursive contract**: `control → toSurface(anything)`, where `anything ∈ {Card, Sheet, Viz, Dock, …}`,
and the goo-split is an OPTIONAL detach *flavor* of the open transition, not a separate facility.

---

## 3 · Visual + motion spec (the morph is liquid, weighty, cross-engine)

**The expand gesture** (control → surface), driven by `useBloomUp`/`useLiquidReveal` (already calibrated):
- **SPATIAL** — the surface FLIPs from the control's source rect to its settled rect, transform-origin
  anchored at the control point (shared-element feel). The spring is `bouncy` for the emphatic large-surface
  open, `snappy` for a small popover (consumer picks). The settle has the iOS-27 weight: ζ≈0.7, a hair of
  give, **no overshoot-past-gone on close** (the IOS27-REFERENCE P2 bar).
- **SQUISH on the way** (the liquid-weight-universal law) — the surface squish-grows ≈0.88 volume-preserving
  via `useLiquidFlex` (the shipped `tanh` law, capped ≤1.08 anti-taffy). Morph MORE on faster pull (the
  pointer-velocity coupling already in `useDockFission`'s `usePointerVelocityField`). NEVER tight/springy.
- **The 4th channel (optional, consumer-supplied hue)** — `useBloomUp`'s field-warm: the surrounding
  `[data-glass-field]` warms toward a consumer hue at ≤8% (the AMBIENT-TINT ceiling). **Generalized:** the
  consumer passes `fieldHue` (any `oklch()`); the library never references "album". A viz-configurator can
  warm the field to its accent; a card can stay neutral.
- **The goo-split flavor** (when `split` is the open transition) — `useDockFission`'s metaball necks stretch,
  thin to a waist, then SNAP (not a fade-disconnect), bridged by `DockGooFilter` (the Safari-safe static
  `filter:url(#…)` graph). Staggered necks break in sequence per the signature's `staggerRank`.

**Bidirectional + interruptible** — every `HubHandle.close()` runs the SAME spring in reverse from live
velocity (the `dockMorphContext` `inheritedVelocity` contract `useDockFission` already clones). A mid-open
re-grab joins the same trajectory.

**The bounded shell morph** — when the surface is hosted INSIDE the dock's own footprint (the pill→panel
case), it rides the dock's existing `--dock-morph-t` scalar (`GlassDock.vue:629` — the pill→field reveal
already rides `--dock-morph-t`). When the surface is a detached island/card (the bloom-OUT case), it's a
sibling surface beside the box-INVIOLATE `.glass-dock-frame` (the fence held — verified `cls:
glass-dock-frame` on the live dock). The hub picks IN-vs-OUT off whether the surface ref is a dock descendant
or a portal'd sibling — ONE branch, geometry-only, no surface-TYPE branch.

---

## 4 · Cross-engine (Chrome + Safari) + perf

The whole spine is **compositor-only by construction** — it inherits the shipped engines' floors:
- `useLiquidReveal`/`useBloomUp` write ONLY `transform`/`opacity`/`filter` on the surface (never
  width/height/top/left — the `proof:no-layout-animation` fence). The 4th channel writes a registered
  `@property --glass-ambient-strength` on a DIFFERENT element (the field), a paint-prop interp, not a layout
  animation. **Safari-safe: `ElementMorph` is a compositor transform; the field re-tint is a `color-mix`/
  `@property` interp (Baseline); the decongest is a regular `filter: blur()` on the surface's OWN pixels,
  NEVER `backdrop-filter:url()`.**
- The goo-split rides `DockGooFilter` — the static SVG `filter:url(#…)` (feGaussianBlur+feColorMatrix),
  `color-interpolation-filters: sRGB` (the neck reads right on Safari, not the linearRGB-wrong waist), the
  REGULAR `filter` property (not `backdrop-filter:url` — the WebKit trap). Static filter graph, never
  per-frame re-authored. Real metaball merge (no naive ellipsoids).
- **Offscreen-pause / one-runner** — the hub holds at most ONE in-flight bloom rAF at a time; closing cancels
  the open's rAF (the `cancelRaf` already in every engine). A hub whose surface is unmounted runs nothing.
  No steady-state loop (no per-frame `backdrop-filter` re-blur — the §7 Safari cost is gated to the
  open-window only).
- `@supports`/PRM floors inherited: under `prefers-reduced-motion: reduce` every verb SNAPS to settled in
  one synchronous step (zero transform/blur frames; the hue lands instantly — a color change is not
  vestibular). This is the shipped `respectReducedMotion` path in all four engines.

**Both modes** — the glass chrome is the warm-cream six-layer composite (BA.W-NO-GRAY floor); the surface
plate is `.glass-deep`/`--glass-bg-dock`-tier, never gray, light + dark. The colorful field behind glass +
a defined edge (§3 binding) is the consumer's content + the dock's own rim.

---

## 5 · Composing the OTHER glass-ui primitives (deft, KISS)

The hub's whole point is that the surface is ANY primitive. The ≥3-distinct-surface generality bar (the
critique's H3) is met by demoing `toSurface` over genuinely different KINDS with ZERO per-kind branch:
1. **`<Card>`** bloomed (a floating glass card of arbitrary content).
2. **`<Drawer>`/sheet** bloomed (live-behind, the detented-glass register).
3. **a viz `<Aurora>`/`<VizStudio>` configurator** bloomed (the dock as a control surface for a viz —
   the literal "central hub for control").
4. **another `<GlassDock>`** bloomed (the recursive sub-dock — §2).
All four open via the SAME `hub.toSurface(ctrl, ref)`, asserted by a call-expression scan, not a keyword
grep. Tabs/segmented-controls compose INSIDE the surface (the consumer's content), not as a hub verb.

---

## 6 · The de-overfit excision (the no-hardcoded-refs arm)

A clean break (NO-LEGACY): every named app facility in `src/` (already ZERO — the enums are the only
`src/` overfit, fixed by §2) + the DEMOS re-expressed as **generalized glass precepts**:
- `examples/AppleMusic.vue` → `MediaSurface.vue` (a generic "media control surface": art slot + marquee +
  transport — no "Apple Music", no "album", `fieldHue` is a generic prop).
- `examples/AppSwitcher.vue` (`label: "Maps"`) → `GridSurface.vue` (a generic app-grid: neutral labels
  `Panel A…F`, oklch hues, no `Map`/`Mail`/`Music` brand icons-as-facilities).
- `liquid-playground.vue` `Search→Maps Places` → `Expand→panel`; `Now Playing→Apple Music` →
  `Media→surface`. The prose drops `Maps`/`Places`/`Apple Music`/`album`.
- `Notification`/`Spotlight`/`VolumeHUD`/`TabBar`/`DynamicIslandCall` → `Toast`/`CommandSurface`/
  `LevelHUD`/`NavStrip`/`CallIsland` (generic glass precepts; the SHAPE is the demo, the app-name is gone).

The gate `proof:no-hardcoded-refs` greps `src/` AND `demo/` for app-facility names (`maps`, `apple music`,
`spotify`, `album`, `places`, brand strings) → asserts ZERO in `src/` and ZERO BRANDED facilities in the
canonical dock demos (a generic-shape demo is fine; a brand-named one REDs).

---

## 7 · The gate (real, reproduces the gesture, judges the gestalt)

`proof:dock-hub` (`["local","ci"]`, source-structure detector, comment-strips first):
- **H1** `toSurface` is surface-TYPE-blind — no `if (surface instanceof…)`, no `kind:"card"|"sheet"…`
  discriminant, no per-surface branch. Signature is `(control, surface, opts?)` over `Ref<HTMLElement|null>`.
- **H2** NO app-domain enum gates a public verb. `split` takes a `DockSplitSignature` SHAPE; `silhouette`
  takes an OPEN descriptor; the shell has NO `splitContext:"search"|"media"|"nav"`. `DOCK_SPLIT_SIGNATURES`
  survives ONLY as motion-named presets-in-consumers. (Born-RED on HEAD — the enums exist today.)
- **H3** ≥3 DISTINCT surface KINDS bloomed by the ONE `toSurface`, call-sites not keywords (card · sheet ·
  viz-configurator · sub-dock — pick ≥3).
- **H4** the named "instances" genuinely route through `useDockHub` OR are honestly exempted with rationale
  in `dock-hub-census.md` (no silent "it's an instance" the wave spec contradicts).
- **H5** ONE bloom runner family (`useLiquidReveal`/`useBloomUp` share the `ElementMorph`+spring substrate);
  a THIRD bloom rAF anywhere REDs.

`proof:no-hardcoded-refs` (§6). **The binding π** (reproduces the REAL gesture): script clicks a dock
control, captures the FRAME-SERIES of the bloom (source rect → settled rect, the squish mid-flight, the
goo waist for the split flavor), asserts the surface materializes + bidirectional close + the field-warm
(if a hue passed), BOTH modes, born-RED on a flat/instant open. Plus the `proof:ba-gestalt` dock verdict
on a fresh capture (the gestalt is the bar: arbitrary content via a clean API, no app facility).

---

## 8 · Reconcile vs the 116 union waves + W-DOCK-HUB-API (no dup)

- **W-DOCK-HUB-API is AMENDED, not duplicated.** Its `<DockExpand>`/`useDockExpand` becomes
  `useDockHub` + `<DockExpand>` (the 4-verb facade + the SFC); its sub-dock split becomes the recursive
  `toSurface(→<GlassDock>)` (the §2 unification); its de-overfit census becomes §6's clean-break excision.
- **No dup vs dock-core** — dock-core owns the bounded `--dock-morph-t` collapse/expand+V↔H morph (the
  shell's OWN size). The hub does NOT touch `dockMorphContext`/`DOCK_SPRING` (box-INVIOLATE fence); it morphs
  surfaces BESIDE the dock or rides `--dock-morph-t` for the in-footprint case (reuse, not re-author).
- **No dup vs dock-fission** — fission stays the goo n-ary detach ENGINE; the hub CONSUMES it as the `split`
  verb's mechanism (renamed off the app enum). The fission wave's `DOCK_SPLIT_SIGNATURES` is the data the
  hub passes through, demoted to presets.
- **Augments, never forks** — `useDockCtaReceive` (the `receive` verb), `useLiquidReveal`/`useBloomUp` (the
  `toSurface` verb), `useDockContextSilhouette` (the `silhouette` verb) all become hub verbs; ZERO new engine.

**Sequencing** — DEPENDS on the dock-morph repair + the goo-split engine (both shipped) + the box-INVIOLATE
rail. The cta-receive/DockStack/now-playing demos become INSTANCES of the generalized hub. The enum-kill is
the load-bearing first step (it forces the rename that buys the generality).
