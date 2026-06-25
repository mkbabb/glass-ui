# DOCK FISSION — brainstorm lens-a (PURE iOS-27 fidelity)

> The Apple-Music-logo-goo-splits-off-the-core-dock move (the user's **A13 "THE BIG
> ONE"**), redesigned from first principles for maximum iOS-27 Liquid-Glass fidelity. The
> lens: match-or-BETTER the reference demos. A real, decisive liquid goo-fission — an
> element **GOOS OFF** the dock (a metaball neck stretches, thins to a waist, **PINCHES,
> SNAPS**) and settles into a **SEPARATE sub-dock** beside / above / below — generalized
> to V or H source and arbitrary which-element / which-target. Read this as the iOS-27
> faithful arm; lens-b (cross-engine/perf) and lens-c (cartoon-punch) are siblings, GOLDEN
> reconciles.

---

## 0. THE LIVE DIAGNOSIS — what actually paints today (chrome-devtools, both routes)

I reproduced the split gesture + judged the goo-fission live on `localhost:5173`, both
required routes, painted-pixel (getComputedStyle + per-frame readback, never arithmetic).
The engine is real and large; **the assembly is the lie, and the goo is OFF on the wire.**

### `/dock/dock-gallery` — the Call tile (`DynamicIslandCall`, `DOCK_SPLIT_SIGNATURES.media`)
- The Call tile composes the REAL `useDockFission` (`signature = DOCK_SPLIT_SIGNATURES.media`,
  two pieces registered with `{dx:-1}`/`{dx:+1}`). **VERIFIED real engine, not a mock.**
- But the demo renders ONLY two `.dock-fission-piece` blobs that **PEEL LATERALLY** (the
  `--dock-split-t` translate ±`--dock-fission-reach`) and shrink/fade in place
  (`opacity: calc(1 - --dock-split-t·0.85)`). **It renders NO `.dock-fission-island` and NO
  `.dock-fission-neck`.** So even at its best, the Call tile is a **pill-splits-into-two-
  halves peel**, NOT "an icon goos OFF to form a separate sub-dock." It reads decent (two
  warm blobs through the goo filter), but it is the **fission topology's degenerate case**
  (N=2, symmetric, no island) — it is NOT the A13 read.
- Where the island/neck DO render (a transient I caught at `--dock-split-t = 0.5` on a
  fissioned host): **`.dock-fission-island` was `scale: 0, opacity: 0, w:0, h:0` AT THE
  MIDPOINT**, and `.dock-fission-neck` was `scale: 0.04 1, opacity: 0` — a zero-length nub.
  **The second sub-dock never materializes; the neck never paints.** The island/neck CSS
  exists (`fission-bridge.css` §F-1) but the geometry zeroes out — the assembly is present
  in name, dead in pixels. This is the "phantom asset / faked gate" class the brief names.

### `/dock/morph-showcase` — the V↔H morph (`--dock-morph-t`, the "Liquid teardrop" preview)
- The page's OWN copy admits it: *"the shipped morph is a View-Transitions **crossfade** …
  the platform cannot continuously interpolate a mismatched-topology silhouette … its
  per-frame goo blur does not clear the strict frame budget under the 4× throttle."*
- I forced `--dock-morph-t = 0.5` + `data-morphing` on the live bridge and read it back:
  **two plates overlap — vertical `52×296` AND horizontal `332×52`, BOTH opacity 1 — an
  L-shaped union, no fused waist.** And the goo: `.dock-morph-bridge-goo` reported
  **`filter: none`**. The `<defs id="dock-morph-goo">` IS mounted, but
  `morph-bridge.css:60` reads `filter: var(--dock-bridge-goo-filter, none)` and
  **`--dock-bridge-goo-filter` is NEVER SET anywhere in `src/` or `demo/`** (grep: 0 hits).
  So the morph metaball **always resolves to `none`** — the goo is dead-wired. The V↔H
  "metaball teardrop" is a plate crossfade with the filter detached. **Born-RED, decisive.**

### The verdict against the four interrogation questions
1. **Real goo-split or fake?** Today: **FAKE / degenerate.** The Call tile is a 2-half peel
   (no island); the island/neck zero out at the midpoint; the V↔H goo filter is `none`. No
   surface in the live app shows a neck STRETCH→THIN→PINCH→SNAP into a real second dock.
2. **Generalized?** The *engine* is (n-ary, `radial`/`lateral`/`inward-merge` ×
   `beside`/`above`/`below`, `vector` getters, the `:splittable` `GlassDock` facility +
   `data-dock-splittable` auto-register + a drag-IS-split gesture all SHIP). The *paint* is
   not — the generalized vectors resolve to dead geometry.
3. **Assembly?** Further than IOS27-REFERENCE claims (it says "assembly 0%"): `GlassDock`
   ALREADY has `:splittable` + `:splitContext` + `:splitPlacement` + the
   `DRAG_SPLIT_THRESHOLD_PX = 36` drag-to-split + `useDockContextSilhouette` + the
   `useScrollChrome` primitive. **The wiring exists; the GEOMETRY it drives is broken.** The
   gap is NOT "build the assembly" — it is "make the island + neck actually PAINT a metaball,
   and wire the goo filter that is currently `none`."
4. **The goo is a real metaball?** The *filter graph* is correct + Safari-safe
   (`DockGooFilter.vue`: sRGB, region `-50%/200%`, regular `filter:url` not
   `backdrop-filter:url`, static literals). But **the SHAPE fed to it is broken** — same root
   cause the goo-morph GOLDEN already diagnosed for the carousel: *a constant-cross-section
   slab, blurred + thresholded, yields a fatter rounded-rect, NOT a waist; a waist is a
   concavity, and concavity needs two convex masses OR a clip-path that carves it.* The
   dock island/neck supply neither today (the neck is a single stretching capsule; the island
   is a separate plate that never grows) — so the filter has no concavity to weld.

**THE CONVERGENT ROOT CAUSE (one sentence):** every piece SHIPS — the orchestrator, the
signatures, the `:splittable` facility, the drag gesture, the Safari-safe filter, the
`useScrollChrome`/`useDockContextSilhouette` primitives — but the **fission's visible
geometry is a dead slab-and-zeroed-island, and its goo filter is detached (`none`)**, so the
A13 gestalt (goo OFF → neck → snap → second dock) never paints. **This is a SHAPE + WIRING
problem, not a new-engine problem** — exactly the goo-morph GOLDEN finding, at dock scale.

---

## 1. THE LENS-A CORE IDEA — the BUD-OFF: a barbell-neck fission where the dock spawns a real droplet-dock

Stop animating an empty bridge + a zeroed island. **A goo-fission is, definitionally, ONE
body that BUDS into TWO bodies joined by a thinning neck that pinches.** It is the
*time-reverse of a metaball merge* — and the goo-morph GOLDEN already proved the merge
mechanism live (`barbell-neck.html`: waist/body **0.27 at the midpoint**, a real concave
hourglass through the static `#glass-goo`, transmissive over a purple/teal field, Safari-safe).
**Lens-a's move is to bring that PROVEN barbell-neck topology to the dock fission** — and to
make the second body a REAL sub-dock, not a zeroed plate:

```
  ┌─────────────┐       ┌─────────────┐        ┌──────────┐ ●        ┌──────────┐  ◖──◗
  │ ● ● ● ● ●   │   →   │ ● ● ● ● ◖────│◗   →   │ ● ● ● ●  ◖═══◗     │ ● ● ● ●  │   ◖ ● ◗
  └─────────────┘       └─────────────┘        └──────────┘          └──────────┘
   core dock (rest)      the bud WELLS          neck STRETCHES+THINS    PINCH → SNAP →
   goo OFF, one pill     a droplet swells       to a tense waist        a real sub-dock
                         off the chosen item    (the metaball throat)   settles beside/above/below
   t=0                   t≈.25                  t≈.55 (waist holds)     t=1
```

1. **`coreBody`** — the surviving dock pill. It stays a crisp six-layer glass plate (goo OFF)
   EXCEPT for a warm-cream **bud lobe** that swells out of the chosen item's edge as
   `--dock-split-t` rises (a `border-radius:50%` droplet, diameter `D = dockThickness/φ` — the
   golden-minor, a BLOB not a plate). The lobe lives inside the goo'd bridge.
2. **`islandBody`** — a SECOND warm-cream droplet that travels along the placement vector to
   the landing and **GROWS into the real `.dock-fission-island`** (a six-layer glass sub-dock,
   `max-content`-sized around the migrated controls). It is NOT a zeroed plate — it scales
   `0→1` and its opacity rises as the neck pinches, so the content visibly ARRIVES.
3. **`neck`** — the metaball throat BETWEEN the two bodies: a separate filament whose
   **cross-axis girth WELLS then PINCHES** on a bell curve (`sin(π·neckT)^k`, ~0 at the ends,
   peak mid) AND whose **`clip-path` is the static hourglass polygon** (the
   `fission-bridge.css` `--neck-filament` idiom — the sides pull IN at the midpoint so the
   silhouette has a **structural concave waist BEFORE the blur even fuses it**). The static
   `#dock-fission-goo` blur→threshold welds `coreBody`+`neck`+`islandBody` into ONE warm
   liquid silhouette with a real waist; past the waist-hold the threshold pinches it off — the
   **SNAP** (a `useLiquidFlex` tanh recoil overshoot on both bodies as the neck breaks).

This is the freefrontend / IQ-`smin` 2D metaball canon — the exact topology the
`fission-bridge.css` neck idiom already ships, the exact read the goo-morph spike proved, and
the exact iOS-27 Apple-Music bud-off the user keeps naming. **It stays ONE `useDockFission`:**
we re-author the geometry the orchestrator PROJECTS (the island + neck become real
barbell+throat masses, not a zeroed plate + a stretching capsule), and we WIRE the goo filter
that is currently `none` — the drive, the spring, the signatures, the `:splittable` facility,
the drag gesture, the PRM seat all stay verbatim.

**Why this is the most iOS-27-faithful of the lenses:** the reference's bud-off is NOT a
crossfade and NOT a peel — it is a **single liquid body that necks and pinches into two.**
Only the barbell-with-a-clip-path-neck produces a *concave waist that holds then pinches*; a
crossfade (V↔H today) or a lateral peel (Call tile today) cannot. Lens-a supplies the precise
reference silhouette; lens-b hardens it cross-engine; lens-c adds the cartoon weight.

---

## 2. THE MECHANISM — projection · filter · feel · placement (deft reuse, no fork)

### 2.1 Geometry — `useDockFission` projection re-authored (the barbell + throat)
`useDockFission` keeps its `--dock-split-t` `SpringProgress`/`DOCK_SPRING` drive, the
`registerPiece`/`split`/`merge`/`toggle` API, the `usePointerVelocityField` seam-tension, the
PRM `seatSync()`, the `DOCK_SPLIT_SIGNATURES` map — **all verbatim.** Re-author only what it
WRITES so the island + neck become real masses (the orchestrator already writes `--island-t`,
`--island-dx/dy`, per-piece `--neck-t` — we make the CSS that reads them paint a barbell):

```
p          = neckT for this seam (the staggered split scalar the orchestrator already stages)
bud(p)     = clamp(0, p/0.10, 1)                 // the lobe swells off the item over first 10%
sep(p)     = bud(p) · reach · placementVector    // the island body travels OUT along (dx,dy)
girth(p)   = GIRTH_FLOOR + sin(π·p)^1.5 · SWELL   // the throat WELLS then PINCHES (≈0 at ends)
waist(p)   = NECK_FILAMENT · clamp(0, p + seamTension·give, 1)   // the clip-path inset GROWS
recoil     = useLiquidFlex.drive(p) tanh, cap = --dock-fission-max-stretch (≤1.08)  // the SNAP
```

- **`coreBody` bud lobe** — a `::before` on the chosen split item: a `border-radius:50%`
  warm-cream droplet that scales `0→1` on `bud(p)`, anchored at the item edge. Lives in the
  goo'd bridge so it fuses with the neck.
- **`islandBody`** (`.dock-fission-island`) — **the fix to the live zero-out:** it scales
  `0→1` on `clamp(0, (island-t − 0.08)/0.25, 1)` (already in the CSS) BUT the live bug is the
  bridge has **no reach** (`--dock-island-reach` UNSET → the translate is 0 → it lands ON the
  dock center at scale 0). Lens-a SETS `--dock-island-reach` from the orchestrator (a real
  px reach = `dockThickness · φ` along the placement vector) so the island lands a real
  distance away AND grows. The island carries the migrated controls (the `#split` slot) — a
  genuine second dock.
- **`neck`** (`.dock-fission-neck` + the per-piece `::before`) — the throat: `scaleX(sep/D)`
  + `scaleY(girth(p))` + the **static hourglass `clip-path`** (`inset(waist 0 waist 0 round
  999px)`), so the concave waist is STRUCTURAL (present on both engines before the filter
  fuses it). The neck DWELLS open at the waist (the spring's mid-hold), then the threshold
  pinches it — the SNAP.

All `transform`/`opacity`/`clip-path`/`--*` per frame (compositor; design.md §L4 P5,
`proof:no-layout-animation` stays flat). Footprints reserved once. The terminal seat snaps the
island dead-on its landing (kills the overshoot creep into rest — the goo-morph GOLDEN §2.1
lesson).

### 2.2 The filter — WIRE the dead `none` + a VISIBLE fuse window
**The headline wiring fix:** mount `<DockGooFilter>` once at the demo/shell root (it already
is, on dock-gallery — `#dock-fission-goo` verified live) AND set the token that gates it:
- `fission-bridge.css` already declares `--dock-fission-goo-filter: url(#dock-fission-goo)`
  on `.dock-fission-bridge` and applies it under `[data-fissioning]` — **this path is correct;
  the fission bridge IS wired** (my live read showed `bridgeFilter: url("#dock-fission-goo")`).
- The DEAD path is the **V↔H morph** (`morph-bridge.css:60` reads `--dock-bridge-goo-filter`,
  set NOWHERE → `none`). Lens-a sets `--dock-bridge-goo-filter: url(#dock-morph-goo)` on the
  morph bridge under `[data-morphing]` (the symmetric fix — one token assignment) so the V↔H
  teardrop actually goos. **Both goos live; neither is re-authored.**
- Retune the `DockGooFilter` literal DEFAULTS for a gooier fuse window (the goo-morph GOLDEN
  §2.2 numbers, re-solved): `blur 7→~10`, `thresholdSlope 20→~15`, `thresholdOffset −9→~−7`
  — a wider alpha skirt + softer surface tension so the neck WELLS gooey, not razor-instant.
  Static literals (Safari-safe); props already exist on `DockGooFilter`.

### 2.3 The FEEL — weighty · gooey · inertial (lens-c's cartoon arm, named here for completeness)
The fission is a **driver** event (design.md §L2/§L4): it carries `--motion-weight → 1` so the
bud-off reads BOLD. The principles, all `f(--dock-split-t)`/`f(--stretch)` (deterministic
frame, compositor-only):

| principle | mechanism (reuse extant) |
|---|---|
| **Anticipation** | the bud lobe BUDS out of the item (scale 0→1 over first ~10%) + a `--ease-cartoon-punch` pre-dip on the core before the island launches (a `linear()` dip no spring expresses) |
| **Stretch toward neck** | each body elongates on-axis as the gap opens — `useLiquidFlex` volume-preserving reciprocal, cap `--dock-fission-max-stretch` ≤1.08 (the anti-taffy fence already in the engine) |
| **Exaggeration** | the throat girth swells past 1 as it pinches (the bold meatball); `--neck-waist` decisive |
| **Overshoot land** | the island lands with a **√φ-proportioned** overshoot (`share = motion-weight · 1/φ`), then settles — the `useLiquidFlex` tanh recoil the engine already drives on `neckT` |
| **Follow-through** | the SHIPPED `--neck-specular-angle` conic catch-light (the engine writes it: `sweepAngle = neckT·360 + tension·60`) sweeps the throat TRAILING the geometry — `plus-lighter`, sRGB-safe, the `fission-bridge.css ::after` cohort, NO fork |
| **Arc (overlapping action)** | the island center travels a subtle perpendicular parabola (`±reach·0.06·sin(π·p)`) so the bud-off LOBS, not a flat slide; PRM flattens to 0 |
| **Moving cast** | the cartoon-shadow `::after` plane (design.md §Shadows moving-cast — compositor transform, NEVER animated box-shadow) slides opposite the island travel |

**morph-MORE-on-move (the iOS-27 weight-responds-to-gesture signature):** the engine ALREADY
feeds `usePointerVelocityField` from inside the spring loop → `--seam-tension` thins the neck
on a fast pull (the RESIST) and the spring re-bases from velocity on release (stretch→snap).
The `:draggable-items` drag-IS-split gesture (`DRAG_SPLIT_THRESHOLD_PX = 36`, live in
`GlassDock.vue`) IS the idiomatic trigger — a fast drag wells a fatter, longer neck + throws
the island farther; a slow keyboard `toggleSplit()` a tense thin thread. **No new spring, no
new gesture** — the `--motion-weight` fence holds.

### 2.4 Visual / material — the warm six-layer read survives the threshold (§3 colorful field)
- Both bodies + the neck share the warm-cream domed-droplet `radial-gradient` (already on the
  neck fill) → ONE continuous liquid-glass droplet with an inner catch-light. **NEVER gray**
  (BA.W-NO-GRAY): the `.dark` warm-chroma floor + `saturate/brightness` companion, both modes.
- **§3 colorful field behind glass + a defined edge:** the layer keeps a TRANSMISSIVE warm
  opacity so the vibrant aurora reads THROUGH the welling neck + the island (verified in the
  goo-morph spike: purple/teal reads through). The threshold IS the crisp metaball edge; a 1px
  inner warm rim (`--glass-edge`) seals the §3 defined edge.
- **The second dock is a REAL glass dock** — the `.dock-fission-island` reads the SAME
  `.glass-floating` token cohort the dock body reads (six-layer composite via tokens, no second
  material recipe), carries its OWN margin (box-INVIOLATE), and is `pointer-events:auto` (a
  live dock, not a decoration).
- **Golden proportion (Aristotelian, all things):** body diameter `D = dockThickness/φ`; island
  reach `dockThickness·φ`; neck rest-thickness `D/φ`; overshoot share `motion-weight·1/φ`;
  island radius `var(--radius-dock)` concentric with the core.

### 2.5 Cross-engine (Chrome + Safari) — the §L7 arm, NAMED (lens-b owns the depth; here the contract)
- **Channel:** regular `filter: url(#dock-fission-goo)` / `url(#dock-morph-goo)` on the goo'd
  bridge (NOT `backdrop-filter:url` — WebKit bug 245510; design.md §L7). Inputs = round
  bodies + a clip-path neck; all `transform`/`opacity`/`clip-path` per frame; filter literals
  STATIC (no var-driven `stdDeviation` — WebKit bug 283156 absent — `DockGooFilter` is already
  literal).
- **sRGB mandatory** (`color-interpolation-filters="sRGB"` — already on `DockGooFilter` +
  `#dock-morph-goo`; WebKit forces sRGB regardless, declaring it makes Chrome MATCH so the
  waist thresholds IDENTICALLY on both — design.md §L7).
- **The clip-path hourglass is the WebKit insurance (the boldest cross-engine move):** the
  waist is a STRUCTURAL concavity guaranteed on both engines BEFORE the filter fuses it — the
  filter merely softens + warms a concavity that already reads decisive. Closes the "works in
  Chrome, broken in Safari" class at the GEOMETRY layer, de-risked live in the goo-morph spike.
- **`@supports not (filter: url(#x))`** → a plain cross-fade of the core + the island (no weld,
  the crisp two-dock legible floor). **PRM** → the orchestrator's `seatSync()` snaps both bodies
  to the endpoint, the bridge `display:none`, zero neck frames, arc 0, `--ease-cartoon-punch →
  --ease-standard` (all already in `fission-bridge.css` §PRM + the engine `prefersReducedMotion()`).
- **Acceptance = a PAIRED-engine π** (Chromium AND a real Safari-26-on-Metal capture) at the
  neck peak proving the waist — never a single-engine green (design.md §L7).

---

## 3. THE FILES — exact mechanism, deft integration (a UNION, no fork)

| file | change | kind |
|---|---|---|
| `src/components/custom/dock/composables/useDockFission.ts` | **WRITE `--dock-island-reach`** (the live UNSET that zeros the island): `reach = dockThickness · φ` px along the placement vector, written on the frame root once/frame. Add a `budT`/`girth` write so the core lobe + throat read a barbell (the orchestrator already writes `--island-t`/`--neck-t`/`--neck-specular-angle` — extend, don't replace). Drive/spring/signatures/seam-tension/PRM seat **verbatim**. | **refine (weak) — the island reach is the load-bearing fix** |
| `src/styles/dock/fission-bridge.css` | **island + neck → a real barbell:** the `.dock-fission-island` grows + lands at a real reach (no longer zeroes at mid); the `.dock-fission-neck` + per-piece `::before` gain the `sin(π·p)^1.5` girth WELL + the hourglass `clip-path` waist (the `--neck-filament` idiom is already here — make the island/core the two masses it bridges). Add the core bud-lobe `::before`. Keep the specular-sweep + ripple + merge-splash + PRM carve **verbatim**. | **refine (weak)** |
| `src/styles/dock/morph-bridge.css` | **WIRE THE DEAD GOO:** set `--dock-bridge-goo-filter: url(#dock-morph-goo)` under `[data-morphing]` (currently UNSET → the V↔H teardrop is `filter:none`, a plate crossfade). The symmetric one-token fix. | **fix (broken) — the dead-wire** |
| `src/components/custom/dock/DockGooFilter.vue` | RETUNE default literals (`blur ~10`, `thresholdSlope ~15`, `thresholdOffset ~−7`) for a gooier fuse window — new prop DEFAULTS; graph BYTE-UNCHANGED (Safari facts verbatim). | **keep (fit) — values only** |
| `src/components/custom/dock/GlassDock.vue` | UNCHANGED structurally — the `:splittable` + `:splitContext` + `:splitPlacement` + `data-dock-splittable` auto-register + the `DRAG_SPLIT_THRESHOLD_PX` drag-IS-split + `useDockContextSilhouette` already SHIP. Verify the `#split` slot renders the island controls (the migration target). | **keep (fit)** |
| `demo/stories/dock/dock-gallery.vue` + `examples/DynamicIslandCall.vue` | the Call tile UPGRADES from the 2-half peel to the barbell bud-off (render the island + neck, set a real reach) so the gallery shows the A13 read, not the degenerate N=2 peel. The `media` signature stays. | refine |
| `demo/stories/dock/morph-showcase.vue` | the "Liquid teardrop" preview now actually goos (the wired filter) — the morph reads a fused waist at the midpoint, not an L-union crossfade. | refine |
| `useDockContextSilhouette.ts` / `useScrollChrome.ts` | UNCHANGED — the scroll-fission assembly (`W-DOCK-SCROLL-FISSION`) composes them on the live shell; this lens makes the GEOMETRY they drive paint. | **reuse** |

**NO LEGACY:** the zeroed-island + the dead `--dock-bridge-goo-filter` `none` + the
single-capsule no-waist neck are FIXED in place, not aliased. Clean break. The goo-morph
`#glass-goo` + `DockGooFilter` `#dock-fission-goo` stay two mounts at two scales (consider a
later `<GooFilter id>` merge — KISS, out of scope here).

---

## 4. THE ACCEPTANCE BAR (the gestalt is the bar) + the BORN-RED gate

- **G1 (headline, A13):** a real split gesture (the `:draggable-items` drag past 36px on
  `/dock/dock-gallery`, AND the `toggleSplit()` keyboard path) shows the chosen item **GOO OFF**
  — a warm-cream lobe buds, a metaball neck STRETCHES + THINS to a concave waist (**waist/body
  ≤ 0.45 at the midpoint, π-measured via canvas-readback of the warm alpha band**), the neck
  DWELLS open ~250–400ms, then PINCHES + SNAPS, and a **REAL second sub-dock settles
  beside/above/below** (the `.dock-fission-island` at scale 1, opacity 1, carrying the
  migrated controls). **Born-RED on the live state** (island `scale:0/opacity:0` at mid; the
  Call-tile peel has no island; the V↔H goo is `none`).
- **G2 (generalized):** the SAME engine produces the split from a V source AND an H source,
  from an arbitrary registered item, to `beside`/`above`/`below` (the placement vector), and
  the `media`/`search`/`nav` signatures each read distinct — proven on both the dock-gallery
  Call tile (media) and a V↔H morph-showcase dock.
- **G3 (Safari):** the waist reads IDENTICALLY on real Safari-26-on-Metal (sRGB-pinned, static
  filter, no `backdrop-filter:url`, the clip-path structural waist) — **paired-engine π**.
- **G4 (no-gray):** warm-cream both modes — C ≥ 0.010, H ∈ [45,85] on the bodies + neck.
- **G5 (perf/PRM):** ~3–4 transforms/frame, static filter, the V↔H goo gated to the
  morph window (NOT a steady-state re-blur — design.md §L7 fence); PRM → `seatSync()` topology
  swap, bridge `display:none`, zero neck frames. `proof:no-layout-animation` green.
- **G6 (de-dup / wiring honesty):** ONE `useDockFission`, the `:splittable` facility, ZERO
  second engine; the `--dock-bridge-goo-filter none` dead-wire FIXED; the island reach SET.

**The π (born-RED, the real split gesture reproduced + the goo gestalt judged, painted-pixel):**
a paired-engine rAF frame-series on a REAL drag-to-split `/dock/dock-gallery` AND a REAL
`/dock/morph-showcase` "Liquid teardrop" morph, BOTH modes, canvas-reading the warm-cream alpha
band along the travel axis at the neck peak:

```js
// at the neck peak (p≈0.55, the waist-hold):
//   bodyWidth  = max cross-axis extent of either body's alpha mass
//   waistWidth = min cross-axis extent of the fused alpha between the two body centres
assert waistRatio = waistWidth / bodyWidth <= 0.45        // a REAL concave waist (headline)
assert hasLocalMinimum(crossAxisProfile)                  // the profile DIPS between two peaks
assert islandScale(p=1) >= 0.98 && islandOpacity(p=1) >= 0.95   // a REAL second dock arrives
assert gooFilter(bridge) !== 'none' at the peak           // the goo is WIRED (born-RED today)
assert neckGirth(t).rises_then_falls()                    // wells → pinches, not a fade
assert warmCream: C >= 0.010 && H in [45,85], both modes  // never gray
assert webkit.waistRatio ≈ chromium.waistRatio (±0.05)    // paired-engine, §L7
```

**Born-RED proof (live-measured today):** the island is `scale:0/opacity:0` at p=0.5 →
`islandScale` FAILS; the Call-tile peel cross-axis profile is monotone (no local minimum) →
`hasLocalMinimum` FAILS; the V↔H bridge `filter` is `none` → `gooFilter !== 'none'` FAILS. The
barbell+clip-path-neck supplies the local minimum (the goo-morph spike measured waist/body
0.27), the island reach makes the second dock arrive, and the one-token wire turns the goo on.

---

## 5. A11Y / PRM CARVE (explicit)
- **PRM (`reduce`):** the orchestrator's `prefersReducedMotion()` → `seatSync()` snaps both
  bodies + the island to the endpoint synchronously (no rAF, no `--dock-split-t` transition);
  the bridge `--dock-bridge-opacity:0` + the necks/ripple/splash/sweep `display:none`
  (`fission-bridge.css` §PRM, already shipped); arc → 0; `--motion-weight → 0`. The dock STILL
  fissions (the topology confirms) — only the goo punch is off. Vestibular-safe.
- **`prefers-contrast: more`:** the cartoon-cast opacity floors UP (the inked edge is a
  legibility asset, design.md §Shadows); the crisp dock + island are the legible surfaces.
- **`prefers-reduced-transparency`:** the island/dock α → 1 (the §Glass opaque arm); the goo
  layer is decorative + `aria-hidden`.
- **AT / focus:** the goo bridge is `aria-hidden="true"` + `pointer-events:none`; the core
  dock + the island own roles/labels/keyboard (the `:splittable` facility's `toggleSplit()`
  is the keyboard trigger — Enter/Space on the split-eligible control); the island is a real
  focusable dock once landed. **WCAG-2.2.2:** one-shot per gesture, no auto-loop — no pause owed.

---

## 6. THE DELTA-ASSAY HOOK → the single wave amendment (no dup vs the union waves)
This lens converges to ONE amendment (GOLDEN will reconcile the three lenses + de-dup vs the
existing waves). The shape: **`BD.W-DOCK-FISSION-BARBELL`** (band: dock/refine; depends:
`useDockFission` + `DockGooFilter` + `fission-bridge.css` shipped) — RE-AUTHORS the fission
PROJECTION to a real barbell+clip-path-throat (island grows at a real `--dock-island-reach`,
the neck wells+pinches a concave waist), FIXES the dead `--dock-bridge-goo-filter: none`
V↔H wire, RETUNES the `DockGooFilter` literals, and lifts the goo-morph GOLDEN barbell-neck
finding (reuse, no fork). It **reconciles with `W-DOCK-SCROLL-FISSION`** (that wave composes
`useScrollChrome → useDockFission` on the shell; THIS wave makes the geometry that composition
drives actually PAINT a metaball into a real sub-dock) and does **NOT dup `W-GOO-MORPH-REFINE`/
the goo-morph barbell** (that is the carousel/deck/pager `useGooMorph` at viewport scale; this
is `useDockFission` at dock scale — two engines, two scales, the shared `--neck-filament` +
`--neck-specular-angle` idioms REUSED). It SUBSUMES the island/neck zero-out + the dead-wire as
the *geometry+wiring* arm of the same fission rebuild. Still ONE `useDockFission`, still the
`:splittable` facility — a refinement-in-place, not a re-fork. `BD.W-FISSION-FILAMENT` /
`BD.W-GOO-SPLIT-PERF` (the Safari-Metal budget) are the perf/filament siblings GOLDEN folds.
