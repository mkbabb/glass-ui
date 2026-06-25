# DOCK FISSION — greenfield, lens-b (cross-engine / perf-first)

> The facility where an icon/element GOOS OFF the core dock, morphs, and forms a
> SEPARATE sub-dock beside/above/below it (the iOS Apple-Music goo-split), generalized
> to V or H source + arbitrary which-element + arbitrary split target. Designed through
> the cross-engine/perf lens: FLAWLESS on Chrome AND Safari, compositor-only, KISS.
> A UNION with the shipped `useDockFission` + `DockGooFilter` + `fission-bridge.css` +
> `DOCK_SPLIT_SIGNATURES`, the dock-core `--dock-live` bound morph, and the goo-morph
> BARBELL finding. NO re-fork. NO legacy.

---

## 0. LIVE INTERROGATION — what the painted pixels actually do (source-verified, both modes)

Reproduced on `localhost:5173`, chrome-devtools, the four interrogation questions answered
against held-state computed styles + screenshots (NOT a commit-message claim).

**(1) Is the fission a REAL goo-split or a fake crossfade/teleport?**
**Partially real — a genuine metaball at THIS scale, but for the wrong structural reason.**
Held the Dynamic Island · Call tile at `--dock-split-t = 0.5` (`/dock/dock-gallery`,
`DynamicIslandCall.vue`). The two warm-cream blobs (`.dock-fission-piece` ×2) separate and
the static `filter: url(#dock-fission-goo)` (sRGB, region −50%/200%) fuses them into ONE
liquid mass with a visible concave waist between them — NOT a crossfade. The goo IS the
metaball. **BUT** the read survives only because the two blobs still OVERLAP within the
blur radius at this tile scale; it is not a body-anchored spanning filament. The screenshot
confirms a true blob↔meatball, transmissive warm-cream over the green field, content sharp
on a separate un-filtered layer (the two-layer discipline is correct).

**(2) Is it GENERALIZED — V or H source, arbitrary element, beside/above/below — or hardcoded?**
**The DATA is generalized; the LIVE proof is hardcoded one-way.** `DOCK_SPLIT_SIGNATURES`
(search=radial / media=lateral / nav=inward) is real, descriptor-driven, `staggerRank` is a
function not a code-path (F3 floor honoured — source-verified). `PLACEMENT_VECTOR`
(beside/above/below) is real. BUT: the only LIVE consumer is the call tile's hardcoded
`{dx:-1}`/`{dx:+1}` two-half lateral peel. The `placement` axis (beside/above/below) and the
`--island-*` island-forming path are **never exercised** by any live surface.

**(3) The ASSEMBLY — is there a live/idiomatic trigger beyond a demo button?**
**No.** `useDockFission` is consumed in `DynamicIslandCall.vue` + `liquid-playground.vue`
only, both fired by a `@click` toggle. `GlassDock` wires `:splittable` + drag-to-split
(`DRAG_SPLIT_THRESHOLD_PX`) and the `.dock-fission-island`/`.dock-fission-neck` second-dock
markup, but live-probing `/dock/dock-gallery` + `/dock/morph-showcase` found **zero**
`.dock-fission-island`, **zero** `.dock-fission-neck`, **zero** `[data-splittable]` docks in
the DOM. The island/sub-dock formation — the literal A13 ask ("forms a SEPARATE sub-dock") —
**renders NOWHERE live and is visually untested.** `useScrollChrome` (collapseT/collapsed/
direction) and `useDockFission` (split) exist as separate primitives never composed. **Engine
~100%, assembly ~0% — confirmed by painted DOM, not inferred.**

**(4) Is the goo the META-BALL (real concave neck) + cross-engine?**
**The filter is airtight; the neck GEOMETRY is the gap.** `DockGooFilter.vue` = non-zero 1×1
host, `color-interpolation-filters="sRGB"`, region −50%/200%, regular `filter: url()` (NOT
`backdrop-filter:url`), `feGaussianBlur`+`feColorMatrix`+`feComposite` static (no var-driven
`stdDeviation`) — every §L7 Safari fact closed by construction. **But** held at mid-split the
neck `::before` computes `position: absolute; inset: 0px; transform: none; clip-path:
inset(21% 0px round 999px)` — the neck is a pinch CONFINED to the piece's own box that
translates AWAY WITH the piece (`translate: -16px`). It does NOT span a widening gap to a
fixed body anchor. This is exactly the goo-morph GOLDEN finding ("a single constant-cross-
section rectangle, blurred + thresholded, can only yield a fatter rounded rectangle… there
is no geometry in the system that can produce a waist") — the dock confined-neck can only
read a waist while the pieces still overlap. The moment the gap exceeds the blur skirt, the
goo can no longer bridge and the pieces read as discs sliding apart, NOT one mass necking.

**The verdict in one line:** the ENGINE is fit (one spring, the descriptor map, the Safari
filter, the bidirectional interruptible drive, PRM sync-seat — all source-verified, all
KEEP). The two real defects are (a) the neck is piece-confined not body-anchored-spanning
(a GEOMETRY defect, the goo-morph barbell finding restated at dock scale), and (b) there is
NO live assembly — no scroll trigger, no rendered island, no generalized hub.

---

## 1. THE GREENFIELD CORE IDEA — the GOO BUD: one body sheds a clone, the gap IS the metaball

A fission is not "translate N pieces apart." A fission is **one liquid body BUDDING a second
body** — the iOS Apple-Music read, the cell-mitosis read, the barbell read. The greenfield
unifies the whole facility under ONE topology borrowed straight from the proven goo-morph
GOLDEN spike, applied at dock scale:

```
  ▩            ▩●          ▩──●         ▩─╲__╱─●        ▩      ●        ▩      ▣
 dock        bud emerges  neck wells   PINCH/waist    snap          sub-dock settled
 t=0            t≈.15        t≈.35        t≈.55        t≈.75           t=1
 (one body)  (clone buds)  (filament)  (tense throat) (break)      (TWO real docks)
```

The dock body and the budding sub-dock are **two convex masses inside ONE static
`#dock-fission-goo` filter**, joined by **a body-anchored spanning neck whose clip-path is a
structural hourglass** (the goo-morph `--neck-waist` idiom, the same one the GOLDEN spike
proved gives `waist/body ≈ 0.27` at mid). The metaball waist is a *structural concavity*
present on BOTH engines BEFORE the filter even fuses it — the filter then merely softens and
warms a waist that already reads decisive. This is the single boldest cross-engine move,
already de-risked in `goo-morph/golden/barbell-neck.html`.

**Why this is THE fit topology and not a new fork:**
- It is the EXACT mechanism the goo-morph GOLDEN already shipped (barbell + clip-path
  hourglass neck through a static sRGB `filter:url()`), proven live. The dock fission adopts
  the SAME `--neck-waist` clip-path recipe — DRY, no second metaball mechanism. The two goo
  filters (`#glass-goo`, `#dock-fission-goo`) are byte-identical graphs at different scales;
  the GOLDEN already flagged merging them into one `<GooFilter id>` mount (KISS).
- It generalizes the THREE current modes for free. **media** = the body buds ONE sub-dock
  laterally (the call/Apple-Music case). **search** = the body buds N sub-buds radially (each
  a body-anchored spanning neck to the ONE shared body — the n>2 case the GOLDEN's
  `hasLocalMinimum` per-neck satisfies). **nav** = the buds run BACKWARD (the sub-dock
  re-absorbs into the body — merge, the same spring, target flipped). One topology, three
  signatures, the `DOCK_SPLIT_SIGNATURES` map UNCHANGED.
- It IS the island. The "second body" the barbell buds is `.dock-fission-island` — a real
  `.glass-floating` six-layer plate carrying the migrated controls (`#split` slot). The
  budding body and the island are the SAME element. So "forms a SEPARATE sub-dock
  beside/above/below" is not an extra path — it is what a barbell bud IS once it lands.

**The one engine, the one spring, the one filter — restated:** keep `useDockFission`'s
`SpringProgress`/`DOCK_SPRING` drive, the descriptor map, the `useLiquidFlex` recoil, the
`usePointerVelocityField` seam-tension, the PRM sync-seat — all fit. **RE-INVENT only the
neck geometry** (confined `inset:0` → body-anchored spanning hourglass) and **BUILD the
assembly** (the scroll/drag/hub trigger + the rendered island). Survival of the fittest.

---

## 2. THE MECHANISM — geometry · filter · feel · assembly

### 2.1 The body-anchored spanning neck (the GEOMETRY re-invent — the headline fix)

The neck stops being a confined `inset:0` pinch and becomes a gel filament anchored at the
DOCK BODY origin, spanning to the budding island/piece. This is `BD.W-FISSION-FILAMENT`'s
mechanism, sharpened with the goo-morph hourglass:

- **The orchestrator writes ONE span geometry** (`useDockFission.ts`, the `writePieces` loop
  — extend, do not fork). Beside the existing `--split-dx/dy`/`--neck-t` writes, write
  `--neck-span-x`/`--neck-span-y` = the SAME `dx × reach × piece-progress` term the piece
  translate already reads (`useDockFission.ts:417-418`). ONE geometry source — the neck span
  and the piece travel are the same vector; no desync (F2 of FISSION-FILAMENT).
- **The neck `::before` re-anchors** (`fission-bridge.css`, `.dock-fission-piece::before`).
  Re-point from `inset:0` (confined box) to a filament that ORIGINATES at the dock-body
  anchor and EXTENDS toward the piece along `(--neck-span-x, --neck-span-y)`, its LENGTH =
  the live gap magnitude via `transform: translate(...) rotate(atan2(...)) scaleX(span)` on a
  reserved unit-footprint (one layout solve; the live length is a `transform`, NEVER an
  animated `width` — `proof:no-layout-animation` holds). Its WAIST is the **goo-morph
  hourglass clip-path** — `clip-path: polygon(...)` parameterized by `--neck-waist` (the
  sides pull IN at the midpoint) so the silhouette has a structural concave waist BEFORE the
  filter fuses it. The `--neck-inset` pinch RIDES on top (thins as `--neck-t` rises +
  `--seam-tension` adds on a fast pull).
- **The gap-sized blur** reads `--dock-goo-spacing` (the merge-threshold,
  `BD.W-DOCK-GOO-SPACING`): `--dock-goo-blur = f(gap / --dock-goo-spacing)` written per frame
  by the orchestrator; the in-document SVG `<feGaussianBlur stdDeviation="var(--dock-goo-
  blur)">` reads it (WebKit reads SVG-attr `var()` — the mountable case, NOT a data-URI
  `feDisplacementMap scale` which cannot). Within the threshold the throat blends; past it
  the goo can no longer bridge → the SNAP, structurally.

So as `--dock-split-t` rises: the bud emerges, the neck stretches across the widening gap,
thins to a tense filament holding for `neckHold`, then SNAPS (opacity drop past `--neck-
break` + the `useLiquidFlex` recoil overshoot). The goo welds body+neck+island into ONE warm
mass while the throat is fat; thins it off at the threshold. **The metaball break, by
construction — engine-agnostic, because the waist is a clip-path concavity, not a filter
nuance that might read differently on WebKit.**

### 2.2 The filter — KEEP every byte (the Safari floor is already airtight)

`DockGooFilter.vue` is structurally perfect (§0 interrogation): non-zero host, sRGB, region
−50%/200%, regular `filter:url()`, static graph. **KEEP entirely.** The ONE additive change
is the `stdDeviation` becomes `var(--dock-goo-blur)` (the gap-sized blur, §2.1) — a
WebKit-safe SVG-attr var (the one case that IS var-drivable; the GOLDEN's `#glass-goo`
keeps literals because the carousel does not need gap-scaling, but the dock's merge-vs-break
read DOES). Retune defaults toward the goo-morph GOLDEN sweet spot (slope ~15, offset re-
solved) so the alpha bleed BECOMES the neck rather than instant-sharpening. **Consider the
GOLDEN's flagged KISS merge:** unify `#glass-goo` + `#dock-fission-goo` into one `<GooFilter
:id :blur :slope>` mount — byte-identical graph, one mount, the id the only difference.

### 2.3 The island — the budding body IS the sub-dock (one element, no extra path)

`.dock-fission-island` (already in `fission-bridge.css`, never rendered live) IS the barbell's
second body. It is a real `.glass-floating` six-layer warm-cream plate that scales up from a
point at the cluster landing (placement vector × `--dock-island-reach`), carrying the migrated
controls via a `#split` slot. The source pieces RETRACT into the neck (they are dock
descendants under `contain: paint`, cannot escape the box) while the island — a frame sibling
OUTSIDE the clip — GROWS and fills with the same controls. The content MIGRATES from body to
island through the goo throat. Beside/above/below is `--island-dx/dy` (the `PLACEMENT_VECTOR`,
already wired). **This is the literal A13 "forms a SEPARATE sub-dock beside/above/below."**
Each resting capsule (body + island) carries its OWN margin + transmissive glass — the
box-INVIOLATE fence (source-verified intact).

### 2.4 The FEEL — liquid-weight universal, cartoon-punch, gated per `--dock-goo-weight`

The bud is a DRIVER event (design.md §L2/§L4). It carries weight/inertia/bounce on the bud,
the neck welling, and the island land — NEVER on a content snap underneath (T13 fence: the
bounce lives in the bud+neck+land, never a slide-past-target). All `f(--dock-split-t)` /
`f(--stretch)` — deterministic-frame, compositor-only:

| principle | mechanism |
|---|---|
| **Anticipation** | the island BUDS out of the body (scale 0→1 over the first ~12% of split-t); a `--ease-cartoon-punch` pre-dip (~4% inward) on the body before the bud launches (a `linear()` dip no spring expresses) |
| **Stretch toward neck** | each piece elongates on-axis as the gap opens (`useLiquidFlex` volume-preserving reciprocal, cap `--dock-fission-max-stretch` ≤1.08 — the anti-taffy fence) |
| **Exaggeration** | the mid-neck girth swells past 1 as it pinches; `--neck-waist` throat decisive (the bold cartoon meatball) |
| **Overshoot land** | the island lands with a **√φ-proportioned** overshoot (share = `--motion-weight · 1/φ`), then settles (DOCK_SPRING ζ≈0.7 — a hair of give, no taffy) |
| **Follow-through** | the shipped `--neck-specular-angle` conic catch-light (`plus-lighter`, sRGB-safe — the `fission-bridge.css` cohort, NO fork) sweeps the throat TRAILING the geometry ~60ms |
| **Morph-more-on-move** | a fast drag/scroll-flick wells a FATTER, longer neck via `usePointerVelocityField` seam-tension (already wired) — the iOS "weight responds to gesture" signature, bounded, no new spring |

The dwell follows the NECK, not a fixed timer: the neck-opacity gate fades in as `--neck-t`
crosses ~0 and out as it crosses `--neck-break` so the bridge is visible EXACTLY while the
goo deforms (no dead-slab dwell). Aristotelian proportion: island diameter `= dockHeight/φ`;
neck rest-thickness `= island/φ`; overshoot share `= motion-weight·1/φ`; concentric radii.

### 2.5 THE ASSEMBLY — the missing 0%: three idiomatic triggers on ONE generalized hub

This is the build, not a wire-up afterthought. ONE generalized hub API on `GlassDock`, three
trigger adapters that all drive the same `useDockFission.split()/merge()`:

- **`useDockFissionHub`** (NEW, thin — the generalized seam): composes the SHIPPED primitives.
  `GlassDock :splittable :splitContext :splitPlacement` (all already props) gains
  `:fissionTrigger="'scroll' | 'drag' | 'manual'"`. The hub owns the `useDockFission` instance,
  the piece auto-registration (`[data-dock-splittable]`, already wired), and routes whichever
  trigger to `split()/merge()`. ONE engine; the hub is the adapter layer the A13 "generalized
  hub API" asks for.
- **Trigger A — SCROLL (the v3 headline, `W-DOCK-SCROLL-FISSION`):** compose `useScrollChrome`
  → the hub. `useScrollChrome` already returns `collapseT`/`collapsed`/`direction`; past the
  threshold (or on a down-flick via `velocityGate`) the hub fires `split()` with the `media`
  signature (the 5-tab bar buds the transport sub-dock; scroll-up `merge()`s). Bidirectional +
  interruptible falls out of the one-spring re-base (source-verified). The literal Apple-Music
  read.
- **Trigger B — DRAG (already wired, KEEP):** `GlassDock`'s `DRAG_SPLIT_THRESHOLD_PX` pull-an-
  item-off gesture already commits the fission on a drag past threshold. The hub just routes it.
  The drag IS the split — morph-more-on-move via the existing seam-tension feed.
- **Trigger C — MANUAL / route-context (`useDockContextSilhouette`, already exists):** a route
  change or an explicit `toggleSplit()` recomposes the silhouette per context (the drill-in
  buds a back-capsule). The hub routes it.

All three are the SAME `split()/merge()` on the SAME spring — the hub is ~30 lines of routing,
not a new engine. **This closes the assembly 0% with a composition, not a build.**

---

## 3. CROSS-ENGINE (Chrome + Safari) — the §L7 arm, NAMED

- **Channel:** regular `filter: url(#dock-fission-goo)` on the bridge layer (NOT
  `backdrop-filter:url` — WebKit bug 245510). Children move on `transform`/`opacity`; the
  filter element is static.
- **sRGB mandatory** (`color-interpolation-filters="sRGB"` — WebKit forces sRGB regardless,
  bug 136418; declaring it makes Chrome MATCH so the waist thresholds IDENTICALLY). Already set.
- **The clip-path hourglass neck is the WebKit insurance** (the boldest move): the waist is a
  structural concavity guaranteed on both engines BEFORE the filter fuses it — de-risked live
  in the goo-morph GOLDEN spike (`waist/body ≈ 0.27` at mid). Closes "works in Chrome, broken
  in Safari" at the GEOMETRY layer, not just the filter layer.
- **The ONE var-driven SVG attr is safe:** `<feGaussianBlur stdDeviation="var(--dock-goo-blur)">`
  — WebKit reads SVG-attr `var()` (the mountable in-document case; NOT a data-URI filter,
  NOT `backdrop-filter:url`). The gap-sized blur is therefore cross-engine.
- **`@supports not (filter: url(#x))`** → a plain cross-fade of body→island (no weld), the
  crisp glass the legible floor. **PRM** → the orchestrator sync-seats every piece + the
  island at its `to` in ONE frame (`prefersReducedMotion()` branch, source-verified); bridge
  `--dock-bridge-opacity:0`; zero neck frames; arc 0; the gesture still CONFIRMS (topology
  swaps), only the motion is off.
- **Compositor-only:** every animated axis is `transform`/`clip-path`/`opacity`/`filter`/`--*`
  (the gap-sized blur is a `filter` `stdDeviation`, paint not layout). NO animated `width`/
  `inline-size`/`inset`. Region tightenable to the body↔island span (cheaper WebKit raster);
  `isolation: isolate`. Offscreen-pause via the suite `useIntersectionPause` floor.
- **Acceptance = paired-engine π** (Chromium AND real-Safari-26-on-Metal) at the neck peak
  proving the waist + the three-capsule rest + the re-merge, BOTH modes. Never a single-green.

---

## 4. A11Y / PRM CARVE (explicit)

- **PRM (`reduce`):** the orchestrator's `prefersReducedMotion()` branch seats every piece +
  island at the target in one frame; bridge removed; no neck/ripple/splash/sweep frames;
  `--dock-goo-weight → 0` (zeroes squish/overshoot/anticipation/arc). The dock STILL fissions
  (the topology swaps — the gesture confirms); only the goo motion is off.
- **`prefers-contrast: more`:** the cartoon-cast opacity floors UP (the inked edge is a
  legibility asset, §L4); the crisp glass island is the legible surface.
- **`prefers-reduced-transparency`:** the island falls to the solid `.glass-opaque` endpoint
  (the W54 escape via the ONE `--glass-level` path); the goo layer is decorative + aria-hidden.
- **AT / keyboard:** the goo bridge is `aria-hidden + pointer-events:none`; the dock owns
  roles/labels/keyboard; the split is a state change with `aria-expanded` (source-verified in
  the call example). The sub-dock, once landed, is a real focusable dock (its controls own
  roles). **WCAG-2.2.2:** the scroll fission is gesture-driven one-shot, no auto-loop — no
  pause owed; the `media` scroll fission re-merges on scroll-up (reversible).

---

## 5. THE FILES — deft union, no fork (survival of the fittest)

| file | change | kind |
|---|---|---|
| `src/components/custom/dock/composables/useDockFission.ts` | EXTEND `writePieces`: add the `--neck-span-x/y` body-to-piece span write (the SAME `dx×reach×piece-progress` term) + the `--dock-goo-blur = f(gap/--dock-goo-spacing)` write. NO second spring, NO second clock (the one-spring fence holds). | **refine (weak)** |
| `src/styles/dock/fission-bridge.css` | RE-INVENT `.dock-fission-piece::before`: confined `inset:0` pinch → body-anchored spanning filament (`transform: translate/rotate/scaleX` on a reserved footprint) with the goo-morph `--neck-waist` hourglass `clip-path`. KEEP the `--neck-inset` pinch + `--neck-break` snap + the specular-sweep + ripple + merge-splash. | **re-invent (broken geometry)** |
| `src/components/custom/dock/DockGooFilter.vue` | `stdDeviation` literal → `var(--dock-goo-blur)` (the one WebKit-safe SVG-attr var); retune defaults toward the GOLDEN sweet spot (slope ~15). Graph else BYTE-UNCHANGED (Safari facts verbatim). | **keep (fit) — values + one attr** |
| `src/components/custom/dock/composables/useDockFissionHub.ts` | NEW thin hub: composes `useDockFission` + the trigger adapter (`scroll`/`drag`/`manual`), owns piece registration, routes to `split()/merge()`. ~30 lines. | **new (the assembly seam)** |
| `src/components/custom/dock/GlassDock.vue` | wire `:fissionTrigger` → the hub; the `scroll` adapter composes the SHIPPED `useScrollChrome` (collapseT/direction → split/merge). The `.dock-fission-island`/`#split` slot render (already present) finally exercised. | **refine (the wire)** |
| `src/styles/tokens/` (dock scheme) | add `--dock-goo-spacing` (the merge-threshold, `BD.W-DOCK-GOO-SPACING`), `--neck-waist` (the hourglass throat), `--dock-goo-weight` (the cartoon-punch lever, derived from `--motion-weight`). | tokens |
| `demo/stories/dock/` | a `dock-scroll-fission` story: the live shell `GlassDock :splittable :fissionTrigger="scroll" :splitContext="media"` over a scrollable content field — the 5-tab → transport-triad → re-merge (the v3 read), the FIRST live island render + the π/gestalt surface. | demo |
| `src/components/.../GlassGooFilter.vue` + `DockGooFilter.vue` | OPTIONAL KISS (GOLDEN-flagged): merge into one `<GooFilter :id>` mount — byte-identical graph, one mount. | optional reuse |

**NO LEGACY:** the confined `inset:0` neck geometry is DELETED, not aliased — replaced in the
same amendment. The `DOCK_SPLIT_SIGNATURES` map, the one-spring drive, the Safari filter, the
PLACEMENT_VECTOR, the box-INVIOLATE fence all SURVIVE unchanged (fit). Clean break only where
broken.

---

## 6. THE ACCEPTANCE BAR (the gestalt is the bar — born-RED on HEAD, source-verified)

- **G1 (headline — the spanning waist):** a held/captured mid-split shows ONE warm-cream body
  BUDDING a second body joined by a body-anchored spanning neck that THINS to a concave waist
  (`waist/body ≤ 0.45` at mid, `hasLocalMinimum` true along the body→island axis), DWELLS
  ~250–400ms, then PINCHES + SNAPS. Born-RED on HEAD (the neck is `inset:0` confined, no span
  transform — live-verified `transform: none` at mid).
- **G2 (the island — the literal A13):** the budding body LANDS as a real `.glass-floating`
  sub-dock beside/above/below, carrying the migrated controls, its OWN margin + transmissive
  glass. Born-RED on HEAD (`.dock-fission-island` renders NOWHERE live — DOM-verified zero).
- **G3 (the assembly):** a LIVE shell `GlassDock` fissions on SCROLL (no demo button) — the
  5-tab bar → transport-triad → scroll-up re-merge, bidirectional + interruptible. Born-RED on
  HEAD (no `useScrollChrome`→`useDockFission` composition; zero `[data-splittable]` live).
- **G4 (Safari):** the waist + island read IDENTICALLY on real-Safari-26-on-Metal (sRGB-pinned,
  static graph, the clip-path waist the engine-agnostic floor, the `var()` `stdDeviation` the
  one safe attr) — paired-engine π, never single-green.
- **G5 (no-gray + §3):** warm-cream both modes (C ≥ 0.010, H ∈ [45,85]); the vibrant field
  reads THROUGH the transmissive neck + island (§3 colorful-field + defined edge).
- **G6 (perf/PRM/de-dup):** ~2–3 transforms/frame, static filter, offscreen-paused; PRM → one-
  frame topology seat, zero neck frames; ONE `useDockFission`, ONE goo filter, ZERO second
  spring/clock; `proof:no-layout-animation` green.

---

## 7. DELTA-ASSAY → the wave amendment (reconciled, no dup)

The greenfield reconciles to the EXISTING union waves — it does not mint a parallel set:

| disposition | wave | action |
|---|---|---|
| **EXTEND** | `BD.W-FISSION-FILAMENT` | the body-anchored spanning neck IS this wave's mechanism; sharpen its neck `clip-path` with the goo-morph `--neck-waist` hourglass (DRY the GOLDEN throat in — the GOLDEN already flagged this optional touch). The geometry re-invent + the `--neck-span-*` write land here. |
| **EXTEND / EXERCISE** | `W-DOCK-SCROLL-FISSION` | the assembly — compose `useScrollChrome` → the NEW `useDockFissionHub` on the live shell `GlassDock`; the FIRST live island render. The single highest-value wave (engine 100%, assembly 0% → assembled). |
| **SIBLING-CONSUME** | `BD.W-DOCK-GOO-SPACING` | the gap-sized `--dock-goo-blur` READS `--dock-goo-spacing` (GATE-SPLIT: GOO-SPACING lands the token first). |
| **DRY (reuse)** | goo-morph `GOLDEN` `--neck-waist` hourglass + `--neck-specular-angle` cohort | lifted as the shared neck recipe, NOT forked (the GOLDEN explicitly flagged DRYing the throat into FISSION-FILAMENT). |
| **DEPEND** | `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` | `--dock-goo-weight` derives from `--motion-weight`; the pre-dip uses `--ease-cartoon-punch`. |
| **NEW (thin)** | `useDockFissionHub` | the generalized hub-API seam (the A13 "generalized hub" ask) — ~30 lines routing three triggers to ONE engine. Folds into W-DOCK-SCROLL-FISSION's assembly, not a separate wave. |
| **UNTOUCHED (fit)** | `useDockFission` one-spring drive, `DOCK_SPLIT_SIGNATURES`, `PLACEMENT_VECTOR`, `DockGooFilter` graph, the box-INVIOLATE fence, `W-GOO-SPLIT-PERF` (re-fires the Metal budget over the heavier spanning goo, downstream) | survive verbatim; the perf budget re-captures AFTER the spanning neck lands. |

No NEW wave beyond the thin `useDockFissionHub` — the greenfield reconciles to EXTENDING
FISSION-FILAMENT (geometry) + EXERCISING DOCK-SCROLL-FISSION (assembly), DRYing the goo-morph
GOLDEN throat, no parallel fork. The gate MUST reproduce the real split gesture (drive a live
scroll-fission, not arithmetic) + judge the goo gestalt on painted pixels (the spanning waist
+ the landed island + the re-merge), paired-engine.
