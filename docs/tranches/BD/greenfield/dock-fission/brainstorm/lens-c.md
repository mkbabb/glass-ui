# DOCK FISSION — lens-c: AUDACIOUS CARTOON-TECHNICOLOR PUNCH

> The dock-fission engine (`useDockFission` + `DockGooFilter` + `fission-bridge.css` +
> `DOCK_SPLIT_SIGNATURES`) redesigned from FIRST PRINCIPLES through the 1940s-technicolor
> FLOW-&-PUNCH lens — bold cartoon shadowing, exaggerated squash/stretch, anticipation +
> follow-through + overlapping action + arcs, real weight & inertia — the BOLDEST, most
> ALIVE variant that stays idiomatic + cross-engine. The split must read as a DECISIVE
> liquid goo-fission into a real sub-dock, both engines.

---

## 0. LIVE-VERIFIED DIAGNOSIS (chrome-devtools, both routes, reproduced)

Live-inspected `/dock/dock-gallery` (the Compose tiles) + `/dock/morph-showcase` (V↔H) on
`localhost:5173`, plus a frozen mid-split (`--dock-split-t: 0.5`) on the splittable frame.
The status quo, measured (not claimed):

- **The goo `<filter>` graph is structurally AIRTIGHT — KEEP byte-for-byte.** `#dock-fission-goo`:
  `color-interpolation-filters="sRGB"`, region `x=-50% width=200%`, regular `filter:url()`
  (NOT `backdrop-filter:url` — the bug-245510 fence held), `feGaussianBlur stdDeviation="7"`,
  `feColorMatrix … 20 -9`, `feComposite atop`. Every §L7 Safari fact present. The user's
  "broken on Safari" is structurally closed at the FILTER layer. **DO NOT re-author.**
- **The spring/orchestrator is FIT.** ONE `SpringProgress`/`DOCK_SPRING`, the
  `inheritedVelocity` interruptible re-base, bidirectional 0↔1, `useLiquidFlex` tanh recoil
  capped ≤1.08, `usePointerVelocityField` seam-tension fed from inside the one loop, PRM
  sync-seat. **KEEP the drive.** Only the SILHOUETTE it projects + the ASSEMBLY are unmet.
- **Engine ~100% / assembly ~0% (CONFIRMED live).** On `/dock/morph-showcase` the live DOM
  has `hasIsland:false, hasNeck:false` — the island/neck never materialize outside the
  gallery Compose tap. `useDockFission` is consumed ONLY in demo stories
  (`liquid-playground`, `DynamicIslandCall`, the gallery tile), NEVER scroll-driven, NEVER on
  a live nav-dock. **The split is a button-only party trick.**
- **THE DEFAULT V↔H IS A CROSSFADE, NOT A GOO MORPH (the candid admission, live on-page).**
  The morph-showcase prose itself reads: *"the shipped morph is a View-Transitions crossfade
  … the topology reflow (column → row) is hidden inside the crossfade — the platform cannot
  continuously interpolate a mismatched-topology silhouette."* Only the OPT-IN "Liquid
  teardrop" flag runs the real metaball bridge. So the headline move (V→H continuous goo) is
  a **teleport behind a dissolve** by default — a FAKE the user named.
- **THE PIECE-MIGRATION IS A CROSSFADE-IN-DISGUISE (the root gestalt fail for THIS lens).**
  `fission-bridge.css:407-424` — because the source pieces are dock descendants clipped by
  `contain: paint`, they CANNOT fly out of the box. The shipped workaround: each piece
  **retracts inward + shrinks + fades** (`opacity: 1 − 0.85·progress`) while a `#split`-slot
  CLONE of the same controls grows in the sibling island. **That is a crossfade between two
  copies, not a goo-fly-off.** Nothing visibly GOOS OFF; an icon dissolves here and re-fades
  there. The neck is confined to each piece's own `inset:0` box (W-FISSION-FILAMENT already
  names this) so it wobbles in place rather than SPANNING the widening gap.

### The convergent root-cause (this lens's verdict)
Two SHAPE problems and one ASSEMBLY problem, exactly mirroring the goo-morph golden's finding:

1. **No geometry produces a real fly-off.** The clip-box forces a fade-retract + slot-clone
   crossfade. A decisive goo-fission needs a **body that actually travels OUT of the dock,
   trailing a neck that spans the gap, then SNAPS** — a portal'd overlay, not a clipped child.
2. **No structural waist.** The confined `inset:0` neck pinches inside the piece; it never
   becomes the concave throat between two pulling-apart masses. (Same root as goo-morph:
   a waist is a *concavity*; concavity needs two convex masses + the bridge, or a clip-path.)
3. **No live trigger.** The whole facility is locked behind a demo button.

**The bar for this lens:** not "does it fade nicely" — **does an icon LAUNCH off the dock with
cartoon WEIGHT (squat-anticipate → stretch-fly on an ARC → land with √φ overshoot) trailing a
gooey neck that necks, holds tense, and SNAPS with a recoil — forming a real sub-dock that
SETTLES beside/above/below, both engines.** Decisive liquid goo-fission, not a dissolve.

---

## 1. THE CORE IDEA — the BARBELL-FISSION PORTAL (one travelling body + a clip-path neck, projected through a portal that ESCAPES the clip)

Stop fading-and-cloning. A fission is, definitionally, **ONE liquid mass that buds a SECOND
mass off itself and stretches a throat between them until it snaps.** Adopt the goo-morph
GOLDEN's proven barbell-with-a-clip-path-neck topology — but for the 1→N detach, projected
into a **single portal overlay** that lives OUTSIDE the dock's `contain: paint` clip, so the
budding body can actually TRAVEL the full gap (the clip-box defeat is solved at the
portal layer, not papered over with a slot-clone crossfade).

```
   ▇▇▇▇▇       ▇▇▇●        ▇▇▇──●        ▇▇╲__╱●        ▇▇    ●        ▇▇   ●●●
   dock      bud-out     welling neck    PINCH/waist    SNAP+recoil    sub-dock
   t=0         t≈.18         t≈.4           t≈.6            t≈.75          t=1
  (squat-    (anticipate   (stretch-fly   (throat holds   (neck breaks,  (settles w/
   anticip.)   pre-dip)     on an ARC)      tense — dwell)  body recoils)  √φ overshoot)
```

The fission overlay hosts, per split, exactly this triad inside the ONE `#dock-fission-goo`
filter — the EXACT topology the goo-morph golden de-risked live (`barbell-neck.html`):

1. **`coreBody`** — the warm-cream source mass (the dock's own pill edge, or a portal'd
   droplet snapshot of it). It stays; it RECOILS on the snap (the body lifts off its cast).
2. **`budBody`** — a round warm-cream droplet (`border-radius: 50%`), diameter
   `D = restSize/φ` (the golden-minor — a BLOB, not a plate). It **buds OUT of `coreBody`**
   (scale 0→1 over the first ~18%), then **travels the full placement vector** to the sub-dock
   landing. THIS is the icon that "goos off." For n>2 (the search radial burst) there are N
   budBodies, each a droplet, each with its own neck — N filaments to ONE shared core.
3. **`neck`** — a SEPARATE element between core and bud whose **cross-axis girth WELLS on the
   split scalar** (a bell: ~0 at the ends, peak mid) and whose **`clip-path` is a static
   hourglass polygon** (the `--neck-filament` idiom, ALREADY in `fission-bridge.css`): the
   sides pull IN at the midpoint so the silhouette has a **structural concave waist BEFORE the
   blur even fuses it.** This is the belt-and-suspenders WebKit insurance the goo-morph golden
   proved: the waist is a geometric concavity present on BOTH engines; the `#dock-fission-goo`
   filter merely SOFTENS and WARMS a concavity that already reads decisive.

The body travels **apart** (the placement vector × reach × split-t); the static
`#dock-fission-goo` blur→threshold welds `coreBody + neck + budBody` into ONE warm silhouette
**with a real waist** where the neck is thinnest; the neck girth recedes as the bud nears its
landing; past the `neckHold` dwell the throat thins past the threshold and the goo can no
longer bridge them — **the SNAP**, punctuated by the `useLiquidFlex` recoil overshoot. Then
the sub-dock (the island plate) coalesces from the landed budBodies.

**Why this is the fittest reconciliation for THIS lens:**
- It is the SAME barbell-clip-path-neck the goo-morph golden already shipped + de-risked —
  **one metaball vocabulary across the whole library** (carousel/deck/pager-worm AND now the
  dock fission). DRY: the fission is not a second metaball idiom, it is the SAME triad
  generalized 1→N. No re-fork.
- The clip-path hourglass closes the cross-engine class **at the GEOMETRY layer** — the
  single boldest cross-engine move, already proven live.
- The cartoon-punch FEEL (anticipation squat, stretch-fly arc, √φ overshoot land, moving
  cast, trailing specular) rides ON TOP of the same `--dock-split-t` scalar — no new clock.

### THE SINGLE BOLDEST MOVE — the PORTAL'd budBody that LAUNCHES off the dock on a CARTOON ARC

The status-quo's fatal compromise is the clip-box: pieces can't leave, so they fade-and-clone
(a crossfade). **Break the clip.** The detaching budBody is rendered into a **fission portal
overlay** — a single fixed-position layer mounted as a sibling of the app root (the
`DockGooFilter` mount precedent — one mount, near root), NOT a dock descendant — so it is
FREE of `contain: paint` and can travel the entire placement vector into real screen space.
The portal carries the goo filter; the dock body's edge and the portal's bodies fuse across
the dock boundary because the portal is anchored to the live dock-box rect (a FLIP-measured
origin). On that free body we apply the **full 1940s cartoon launch**, all `f(--dock-split-t)`,
compositor-only:

- **ANTICIPATION (squat):** before launch (split-t 0→0.12) the budBody scales DOWN ~6% on
  the launch axis (`--ease-cartoon-punch` pre-dip — a `linear()` inward dip no spring
  expresses) and the dock pill DIMPLES at the bud's root (the source recoils *toward* where
  the bud will leave — Newton's third law as cartoon).
- **STRETCH-FLY on an ARC:** the body elongates on its travel axis as the gap opens
  (`useLiquidFlex` volume-preserving reciprocal — necking taffy, not a rigid disc), and its
  centre travels a **parabolic arc** (`±D·0.10·sin(π·p)` perpendicular to the placement
  vector) so the icon LOBS off the dock, never a flat slide. The neck stretches WITH it,
  thinning to the tense filament.
- **EXAGGERATION:** the mid-throat girth swells PAST the rest girth as it pinches (the bold
  cartoon meatball — a fat hold then a hard pinch), `--neck-waist` decisive; the squish cap
  is RAISED for this lens to `--dock-fission-max-stretch: 1.18` (still bounded, but bolder
  than the calm 1.08 — the loud-by-design register).
- **OVERSHOOT LAND (√φ):** the bud lands at the sub-dock with a **√φ-proportioned overshoot**
  (share = `motion-weight · 1/φ`), then settles — the §L6 golden-ratio proportion in the
  bounce itself, never an arbitrary spring tail.
- **FOLLOW-THROUGH:** the SHIPPED `--neck-specular-angle` conic catch-light sweep
  (`plus-lighter`, sRGB-safe — the `fission-bridge.css` cohort, NO fork) sweeps the throat
  TRAILING the geometry ~60ms; a settle-jiggle trails the landed body; the SHIPPED
  fission-ripple (`::before`) blooms outward announcing the bud-off and the SHIPPED
  merge-splash (`::after` earned-gold) fires on the reverse re-merge — both KEPT.
- **MOVING CARTOON CAST (the bold 1940s shadow):** a `::after` cartoon-shadow plane (the
  design.md §Shadows moving-cast idiom — a `transform` on a shadow-caster, NEVER an animated
  `box-shadow`) slides OPPOSITE the bud's motion and DEEPENS mid-flight (the body lifts off
  its shadow as it launches, the cel-light source fixed) — then snaps back as it lands. This
  is what gives the fission its technicolor WEIGHT: the icon casts a bold inked shadow that
  lags its arc. Reads `--shadow-cartoon` directly (the `.shadow-cartoon-*` cohort), `prefers-
  contrast: more` floors the cast opacity UP, PRM → static cast no travel.

So the icon does not dissolve-and-reappear — it **squats, LAUNCHES off the dock on a gooey
arc trailing a necking throat, the throat SNAPS with a recoil, and it LANDS in a sub-dock
that overshoots and settles.** Decisive. Alive. Both engines.

---

## 2. THE MECHANISM — projection · filter · assembly · feel

### 2.1 Geometry — the barbell-fission projection (EXTENDS `useDockFission`, no second engine)

`useDockFission` keeps its `--dock-split-t` drive, the ONE `SpringProgress`/`DOCK_SPRING`,
the `inheritedVelocity` re-base, `split`/`merge`/`toggle`/`onPointerMove` API, the
`useLiquidFlex` squish, the `usePointerVelocityField` seam-tension, PRM sync-seat — VERBATIM.
The per-piece write loop (`writePieces`) is EXTENDED to write the barbell triad's transforms
(`p` = the staggered per-piece `neckT`, gap-invariant, as today):

```
sep(p)      = p                                   // 0 budded-at-core → 1 landed-at-sub-dock
bell(p,k)   = sin(π·p)^k                          // 0 at ends, peak mid (the well)
budCentre   = placementVec · reach · p            // the bud travels the FULL gap (portal-free)
budArc      = crossVec · D · 0.10 · bell(p,1)     // the parabolic lob (PRM → 0)
neckGirth(p)= GIRTH_FLOOR + bell(p,1.5)·GIRTH_SWELL  // wells, peaks mid, ~0 at the ends
neckLen(p)  = |budCentre|                         // the throat spans the live gap (W-FISSION-FILAMENT)
```

- **budBody** — `transform: translate(budCentre + budArc) scale(D/W)` + the `useLiquidFlex`
  reciprocal squash on the travel axis. `--neck-t` ALREADY phase-shifts per stagger rank
  (KEEP — the N necks break in sequence). `bud-out` is `scale(clamp(0, p/0.18, 1))` (buds out
  of the core over the first 18%).
- **neck** — `translate(midpoint) rotate(span-angle) scaleX(neckLen/D) scaleY(neckGirth(p))`;
  its `clip-path` is the **static hourglass polygon** (the concave structural waist),
  parameterized by `--neck-waist` (the `--neck-filament: 42%` token, RE-USED). The neck is
  **BODY-ANCHORED + SPANNING** (W-FISSION-FILAMENT's exact fix — UNION here, not a dup):
  it originates at the dock-body anchor and extends along the span vector to the bud, its
  length = the live gap magnitude. NO confined `inset:0`.
- The `#dock-fission-goo` blur (the SAME static filter) fuses core+neck+bud into one warm
  hourglass. The blur is **gap-sized** — reads `--dock-goo-spacing` (W-DOCK-GOO-SPACING,
  SIBLING-CONSUMES) so the throat blends within the threshold and BREAKS beyond it (the
  SwiftUI `GlassEffectContainer(spacing:)` analogue — the merge-vs-break read is the visible
  knob, not a flat fixed blur).

All `transform`/`opacity`/`clip-path` per frame (compositor; `proof:no-layout-animation`).
The rest footprints (`D` circle, `restNeck` bar) are reserved ONCE. The terminal seat is the
resting authority (the sub-dock plate's own static layout once `t≥1`), killing the overshoot
creep.

### 2.2 The portal — escaping `contain: paint` (the assembly the clip-box defeated)

The detaching budBody + its neck render into a **fission portal overlay** — `position: fixed`,
mounted ONCE near the app root (the `DockGooFilter` mount precedent), z-above page content,
`pointer-events: none` until landed. The orchestrator writes the portal's **FLIP-measured
origin** = the live dock-box rect (the `dockCenter()` already computed in `GlassDock.vue`),
so the portal's bodies are positioned in screen space relative to the real dock. The portal
carries `filter: var(--dock-fission-goo-filter)` while `[data-fissioning]` (the goo-OR-glass
swap, KEPT). Because it is NOT a dock descendant it is FREE of the dock's `contain: paint` —
the budBody travels the entire placement vector into real screen space (beside/above/below).
The dock pill's own edge and the portal's coreBody fuse across the boundary because both read
the same warm-cream floating-glass register and the goo blur bleeds across the seam.

**This is the deft fix for the crossfade-clone defect.** The source piece in the dock fades
its REAL glyph (it has departed into the portal), the portal's budBody carries the LIVE glyph
on its arc, the sub-dock plate receives it. ONE glyph travelling — never two copies
crossfading. The `#split` slot still hosts the sub-dock's settled controls (KEEP — it is the
TERMINUS, the rest authority), but the TRAVEL is the portal body, so there is no
dissolve-here-reappear-there read.

### 2.3 The filter — the goo-morph GOLDEN retune (a VISIBLE fuse window)

Keep the `#dock-fission-goo` graph + every Safari fact VERBATIM. Retune only the literal
DEFAULTS so the alpha bleed BECOMES the neck rather than instant-sharpening (the props
already exist on `DockGooFilter.vue`):

| token | current | lens-c GOLDEN | why |
|---|---|---|---|
| `blur` (stdDeviation) | 7 | **~10** (gap-sized base) | a wider alpha skirt → the bodies feel each other → the neck wells gooier; scales with `--dock-goo-spacing` |
| `thresholdSlope` | 20 | **~15** | surface tension: ~15 is the SVG-metaball sweet spot — a soft gooey shoulder, not a razor mercury edge |
| `thresholdOffset` | −9 | **~−7** (re-solved for slope 15) | crisp edge at REST, a gooey shoulder in the fused throat |

STATIC literals → Safari-safe; `DockGooFilter` props let a calmer consumer dial it down.
KISS: blur + colorMatrix + atop, three primitives, no extra pass (the warm domed-droplet
`radial-gradient` fill supplies the catch-light through the threshold).

### 2.4 GENERALIZATION — V or H source, arbitrary which-element, beside/above/below (the A13)

The facility is FULLY generalized — the descriptor-driven `DOCK_SPLIT_SIGNATURES` is the
right shape; KEEP it as DATA, never three code paths:

- **V or H source:** the placement vector + the cross (arc) vector are derived from the live
  dock orientation (the `vertical`/`horizontal` class already on `.glass-dock`). A horizontal
  dock buds DOWN/UP (above/below) or sideways (beside); a vertical dock buds sideways or
  along its axis — the same `PLACEMENT_VECTOR` map, the arc perpendicular to the placement.
- **Arbitrary which-element:** any child marked `data-dock-splittable` registers as a piece
  (the auto-register loop already exists, `GlassDock.vue:382`). The signature's `staggerRank`
  orders the break sequence; `search`=radial-burst (N buds bloom outward), `media`=lateral-peel
  (the now-playing centre ANCHORS, flanking transport peels — the iOS Apple-Music move),
  `nav`=inward-merge (the reverse — N collapse to one).
- **beside/above/below target:** the `DockSplitPlacement` ref (already wired) is the ONE
  coherent travel vector for the whole cluster; the sub-dock plate materializes at the
  cluster's landing. ARBITRARY split topology, descriptor-driven.

### 2.5 ASSEMBLY — the live triggers (the W-DOCK-SCROLL-FISSION union + a generalized hub)

The engine's gap is ASSEMBLY; this lens prescribes THREE idiomatic live triggers, all
composing the SAME shipped `useDockFission` — no fork:

1. **Scroll-driven nav fission (the headline, W-DOCK-SCROLL-FISSION UNION).** Compose
   `useScrollChrome` → `useDockFission` on the real shell `GlassDock`: opt-in
   `:fissionOnScroll`, past a scroll threshold the core nav bar goo-splits along the `media`
   signature into the persistent centre transport capsule + flanking nav-bud sub-docks;
   scroll-up re-merges (bidirectional, interruptible — a mid-split reverse re-seats
   velocity-continuous). This is the v3 reference's defining move (the Apple-Music logo
   goo-splits off to form the abstract bottom dock).
2. **Drag-an-item-off gesture.** A pointer-drag on a `data-dock-splittable` child past a
   threshold drives `split()` with the seam-tension RESIST already wired
   (`usePointerVelocityField`) — a fast pull stretches the neck PAST the spring (it RESISTS),
   then SNAPS on release as the spring re-bases from velocity. The cartoon weight makes the
   drag feel like pulling taffy off a gummy mass.
3. **Generalized hub API (`useDockFission` IS the hub).** Any consumer calls `split()`/
   `merge()`/`toggle()` to spawn a sub-dock from any element — the dock-as-hub. The gallery
   Compose button STAYS as the breadth demo; it is no longer the ONLY trigger.

### 2.6 The FEEL — weighty · gooey · inertial (the cartoon-punch, gated per `--dock-fission-weight`)

The fission is a **driver** event (§L2): it carries `--dock-fission-weight` (= the Band-0
`--motion-weight` idiom) toward 1 — the loud register. Each principle is compositor-only,
`f(--dock-split-t)` / `f(--stretch)` (deterministic-frame, no second clock):

| principle | mechanism |
|---|---|
| **Anticipation** | the budBody squats (~6% inward on the launch axis, `--ease-cartoon-punch` pre-dip) + the dock pill DIMPLES at the bud root before launch |
| **Squash & stretch** | the body elongates on-axis as it flies (`useLiquidFlex` reciprocal, cap = `--dock-fission-max-stretch` 1.18 — bolder than 1.08) — necking taffy |
| **Exaggeration** | the mid-throat girth swells PAST 1 as it pinches (the bold meatball); `--neck-waist` decisive |
| **Arc (overlapping action)** | the bud centre travels a parabolic lob (`±D·0.10·sin(πp)` perpendicular to placement); PRM → 0 |
| **Overshoot land** | the bud lands with a √φ overshoot (share = `motion-weight·1/φ`), then settles — golden-ratio bounce |
| **Follow-through** | the SHIPPED `--neck-specular-angle` conic sweep trails ~60ms; a settle-jiggle trails the landed body; the ripple announces, the merge-splash seals |
| **Moving cartoon cast** | a `::after` shadow-caster slides OPPOSITE the bud's arc + deepens mid-flight (the body lifts off its inked shadow), snaps back on land — `--shadow-cartoon`, NEVER animated `box-shadow` |

**The dwell follows the NECK, not a timer.** The `neckHold` band (DATA in the signature)
HOLDS the tense thin throat ~250–400ms so the pinch READS (weighty liquid, never a flicker) —
the opacity gate follows the neck girth (visible EXACTLY while the goo deforms, gone within
~80ms of the snap). **Velocity-couple "morph MORE on move"**: a fast drag (the seam-tension
field) wells a FATTER, longer neck + throws the bud FARther; a slow keyboard step a tense
thin thread — a bounded `--dock-fission-throw` off the `maxStretch` lever, no new spring.

### 2.7 Material (the warm six-layer read survives the threshold — NEVER gray)

Core, bud, neck, and sub-dock plate share the warm-cream domed-droplet `radial-gradient`
(already on the necks) → ONE continuous liquid-glass droplet with an inner catch-light.
**NEVER gray** (BA.W-NO-GRAY): the warm floor holds, both modes (the `.dark` arm lifts the
warm-chroma, the `light-dark()` per-mode arms — no inset-shadow-in-`light-dark()` trap). §3
COLORFUL FIELD: the portal layer opacity (~0.55) keeps the bud a TRANSMISSIVE warm lens — the
aurora/content field reads THROUGH the welling throat; the threshold IS the crisp metaball
edge (the §3 defined edge). The sub-dock plate is the SAME six-layer composite the dock body
reads (the `.glass-floating` cohort — no second material recipe).

---

## 3. CROSS-ENGINE (Chrome + Safari) — the §L7 arm, named

- **Goo = the regular `filter: url(#dock-fission-goo)`** on the portal/bridge host — NEVER
  `backdrop-filter: url()` (WebKit bug 245510). The graph stays byte-identical (the live
  facts: `sRGB`, region `-50%/200%`, threshold). **The fuse PAINTS on Safari 26.**
- **The clip-path hourglass neck is the GEOMETRY-layer insurance** — the concave waist is a
  static polygon present on BOTH engines BEFORE the filter fuses it; the filter only softens
  a concavity that already reads decisive. This is what makes the metaball cross-engine-HONEST
  (the goo-morph golden de-risked it live).
- **`color-interpolation-filters: sRGB` mandatory** — WebKit forces sRGB regardless; declaring
  it forces Chrome to match WebKit's threshold so the waist reads IDENTICALLY (design.md §L7).
- **`plus-lighter`** for the specular sweep / ripple / splash — Safari 16.4+; a non-supporting
  engine degrades to a plain warm overlay (no blowout). NO second blend fork.
- **The gap-sized blur** is a `<feGaussianBlur stdDeviation="var(--dock-goo-blur)">` on the
  in-document SVG mount — WebKit reads SVG-attr `var()` (the mountable case; NOT a data-URI
  `feDisplacementMap scale` which cannot — the W-LENSING limit).
- **Acceptance = a PAIRED-engine π** (Chromium AND WebKit), never single-engine green
  (design.md §L7 / the live-verify-capture lesson).

---

## 4. A11Y / PRM CARVE (the §L5 bracket)

- **PRM (`prefers-reduced-motion: reduce`):** the orchestrator SYNC-SEATS every piece at its
  `to` in ONE frame (the shipped `prefersReducedMotion()` branch) — no bud-out, no arc, no
  neck frames, no ripple/splash/sweep (`--dock-bridge-opacity: 0`); the portal seats the
  sub-dock at its landing instantly. **The gesture CONFIRMS (the topology swaps) — only the
  motion is off.** Vestibular-safe. The moving cast → static.
- **`prefers-reduced-transparency`:** the portal/sub-dock surface α → 1, `backdrop-filter` →
  none, the goo throat → a solid warm capsule (the topology still reads; the gel is opaque).
- **`prefers-contrast: more`:** the cartoon cast opacity floors UP (the inked edge is a
  legibility asset, not a transmissive layer — it survives).
- **AT / focus:** the sub-dock controls are the SAME accessible nodes (the `#split` slot is
  the rest terminus — real focusable controls, the portal body is `aria-hidden` decorative
  travel). Focus order follows the settled sub-dock; the split is announced via a polite live
  region ("Player detached" / context label). The goo `<svg>` mount is `aria-hidden
  focusable="false"` (KEPT).

---

## 5. DEFT INTEGRATION — the UNION (no re-fork, KISS/DRY, NO LEGACY)

| extant primitive | role in lens-c | change |
|---|---|---|
| `useDockFission` (the orchestrator) | KEEP the spring/drive/API/PRM verbatim | EXTEND `writePieces` to the barbell triad + portal origin write |
| `DockGooFilter.vue` / `#dock-fission-goo` | KEEP the graph + every Safari fact | retune literal DEFAULTS (blur 7→10, slope 20→15, offset −9→−7) |
| `fission-bridge.css` | KEEP the necks/ripple/splash/specular cohort | RE-ANCHOR the neck to span the gap (W-FISSION-FILAMENT union) + the hourglass clip-path |
| `DOCK_SPLIT_SIGNATURES` | KEEP as DATA (search/media/nav) | no change — the descriptor shape is right |
| `useLiquidFlex` (tanh squish) | KEEP — the recoil + squash | raise the cap to `--dock-fission-max-stretch: 1.18` for this lens |
| `usePointerVelocityField` | KEEP — the seam-tension + drag resist | wire the drag-off gesture trigger |
| `useScrollChrome` | COMPOSE → `useDockFission` (the scroll trigger) | the W-DOCK-SCROLL-FISSION wiring (assembly, no build) |
| the goo-morph GOLDEN barbell+clip-path | ADOPT the SAME triad topology | ONE metaball vocabulary library-wide (DRY) |
| `--shadow-cartoon` / `.shadow-cartoon-*` | the moving cast | compose, NEVER animated box-shadow |

**No second engine. No parallel fission system. No legacy alias.** The portal overlay is the
ONE new structural piece (a single fixed sibling mount, the `DockGooFilter` precedent), and it
SOLVES the clip-box defeat that forced the crossfade-clone — a real fix, not a bolt-on.

---

## 6. THE DELTA vs the status quo (what survives / refines / re-invents)

- **SURVIVES (fit — do NOT touch):** the `#dock-fission-goo` graph + Safari facts; the ONE
  `SpringProgress`/`DOCK_SPRING` drive + interruptible re-base; the bidirectional
  split/merge; the `DOCK_SPLIT_SIGNATURES` descriptor shape; the ripple + merge-splash +
  specular-sweep delights; PRM sync-seat.
- **REFINES (weak):** the filter DEFAULTS (visible fuse window); the neck → body-anchored
  spanning hourglass (W-FISSION-FILAMENT union); the squish cap → bolder 1.18; ADD the
  cartoon launch (anticipation/arc/overshoot/moving-cast) on the same scalar.
- **RE-INVENTS (broken):** the piece-migration crossfade-clone → the **portal'd budBody that
  LAUNCHES off the dock** (the clip-box defeat solved at the portal layer); the button-only
  assembly → the THREE live triggers (scroll-fission / drag-off / hub API); the default V↔H
  CROSSFADE → the continuous barbell-bridge goo morph (the teleport-behind-a-dissolve retired).

---

## 7. THE GATE (must reproduce the real split gesture + judge the goo gestalt, painted-pixel)

`proof:dock-fission-portal` (born-RED → GREEN) — a span-geometry + runtime-write arm, NEVER a
presence-regex:
- **F1** — the budBody travels the FULL placement vector in a PORTAL free of `contain: paint`
  (not a fade-retract clipped child). A piece that only `opacity`-fades inward REDs.
- **F2** — the neck is BODY-ANCHORED + spans the gap via `transform` (translate/rotate/scaleX)
  + the hourglass `clip-path`, NOT `inset:0` confined. (W-FISSION-FILAMENT union.)
- **F3** — the gap-sized blur READS `--dock-goo-spacing` (not a fixed radius).
- **F4** — ONE `SpringProgress`/`DOCK_SPRING`, no second clock/`setTimeout`/`@keyframes`
  (the fission one-spring fence); goo is regular `filter:url()` (the Safari fence).
- **F5** — ≥2 real LIVE triggers (scroll-fission on the shell + the drag-off gesture), not
  demo-button-only.

**The binding π** (`tests-visual/dock-fission-portal.spec.ts`, LOCAL real-GPU, BOTH modes +
the **webkit** project, LIVE motion): drive the real split gesture (scroll-fission + drag-off,
NOT the seeded button-only); capture the frame-series as `--dock-split-t` rises 0→1. Assert a
CONTINUOUS gel throat SPANS the widening gap between the dock body and the LAUNCHING bud
(a chroma/luminance scan reads one band), the throat THINS to a tense filament across the
`neckHold` dwell, then BREAKS — the metaball span-then-snap with the recoil, NOT N discs
fading-and-cloning. The sub-dock plate SETTLES beside/above/below with the √φ overshoot. PRM
arm: ONE-frame topology swap, zero neck frames. **The gestalt verdict is the bar:** the split
reads as a DECISIVE liquid goo-fission into a real sub-dock, both engines — an icon visibly
GOOS OFF (necks, holds, SNAPS), never a crossfade/teleport.

---

## 8. THE WAVE-AMENDMENT FEED (for the DELTA-ASSAY)

- **W-DOCK-SCROLL-FISSION** (the assembly headline) — UNION: compose `useScrollChrome` →
  `useDockFission` on the live shell, the `media` signature, the portal'd bud-launch. No fork.
- **W-FISSION-FILAMENT** (the body-anchored spanning neck) — UNION, not a dup: lens-c's
  hourglass-clip-path neck IS the F2 span fix; reconcile so ONE wave lands the spanning neck.
- **W-DOCK-FISSION-PORTAL** (NEW, the clip-box fix) — the portal overlay that escapes
  `contain: paint` so the bud LAUNCHES (retires the crossfade-clone migration). This is the
  lens-c headline beyond the existing waves.
- **W-DOCK-MORPH-CONTINUOUS** (NEW/REFINE) — retire the default V↔H View-Transitions crossfade
  for the barbell-bridge continuous goo morph (the opt-in teardrop becomes the default; the
  "platform can't interpolate mismatched topology" limit is solved by the goo bridge HIDING
  the reflow at the waist, not a dissolve). RECONCILE vs the goo-morph golden (same triad).
- **Reconcile (no dup):** the metaball triad is SHARED with the goo-morph golden (carousel/
  deck/pager-worm) — ONE `#…-goo` vocabulary, the dock fission is the 1→N generalization, not
  a second idiom. The cartoon launch reads the SAME `--motion-weight`/`--shadow-cartoon`/
  `--ease-cartoon-punch` Band-0 cohort.
