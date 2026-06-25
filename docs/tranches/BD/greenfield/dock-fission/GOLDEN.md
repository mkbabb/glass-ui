# DOCK FISSION — the GOLDEN reference

> The single canonical synthesis of lens-a (pure iOS-27 fidelity), lens-b (cross-engine /
> perf-first), lens-c (cartoon-technicolor punch). The ONE dock-fission engine —
> `useDockFission.ts` + the static `#dock-fission-goo` filter (`DockGooFilter.vue`) +
> `fission-bridge.css` + `DOCK_SPLIT_SIGNATURES` — where an icon/element **GOOS OFF** the
> core dock, necks, **PINCHES, SNAPS**, and forms a **SEPARATE sub-dock** beside/above/below
> (the iOS-27 Apple-Music bud-off), generalized to V or H source × arbitrary element ×
> arbitrary split target. DEFTLY INTEGRABLE (a UNION with the shipped ecosystem; reuse the
> orchestrator, the Safari-safe filter, the bridge cohort, the `--neck-filament` idiom, the
> goo-morph GOLDEN barbell finding; KISS/DRY; no parallel fork; NO LEGACY). PERFECT in
> Chrome AND Safari, de-risked live (§8).

---

## 0. THE DIAGNOSIS — all three lenses agree (live-verified, source-grounded)

Every lens reproduced the gesture on `localhost:5173` (`/dock/dock-gallery` +
`/dock/morph-showcase`) and read the painted pixels + computed styles + the actual source.
The mechanism SHIPS; the **gestalt is the lie, the same way the goo-morph GOLDEN named** — a
SHAPE + WIRING problem, not a new-engine problem.

### What is FIT (survives — do NOT re-invent)
- **The Safari floor is structurally airtight.** `DockGooFilter.vue` / `#dock-fission-goo` =
  non-zero 1×1 host, `color-interpolation-filters="sRGB"`, region `-50%/200%`, **regular**
  `filter:url()` (NOT `backdrop-filter:url` — WebKit bug 245510), static graph (no var-driven
  `stdDeviation` — bug 283156 absent). Every §L7 fact closed by construction. **KEEP the graph
  byte-for-byte; only the literal DEFAULTS retune.** (Lens-a/b/c unanimous.)
- **The orchestrator is fit.** ONE `SpringProgress` on `DOCK_SPRING` writing `--dock-split-t` +
  per-piece `--split-dx/dy`/`--i`/`--neck-t` + the island `--island-t`/`--island-dx/dy`; the
  `inheritedVelocity` interruptible re-base; bidirectional split↔merge on the one loop; the
  `useLiquidFlex` tanh recoil (cap ≤1.08); the `usePointerVelocityField` seam-tension fed from
  INSIDE the one loop; the PRM `seatSync()`. **The DRIVE is fit; only the silhouette it
  PROJECTS + the wiring are broken.** (Source-verified `useDockFission.ts`.)
- **`DOCK_SPLIT_SIGNATURES` is descriptor-driven DATA, not three code paths** (search=radial /
  media=lateral / nav=inward-merge; `staggerRank` a function; `PLACEMENT_VECTOR`
  beside/above/below). **KEEP as DATA.**
- **The `:splittable` facility + the assembly markup SHIP further than IOS27-REFERENCE claims:**
  `GlassDock` carries `:splittable`/`:splitContext`/`:splitPlacement`, `[data-dock-splittable]`
  auto-register, the drag-to-split gesture (`useDockItemDrag`), `useDockContextSilhouette`, and
  `.dock-fission-island`/`.dock-fission-neck` exist in `fission-bridge.css`. **The wiring exists;
  the GEOMETRY it drives is broken + one trigger is missing.**
- **`--dock-island-reach` already defaults to 9rem** (inherits from
  `.glass-dock-frame[data-splittable]` via `stack-rail.css:76`, overridable per
  `--dock-island-reach-override`). The island CAN land — lens-a's "reach is unset" was a stale
  read; the real defect is the NECK SHAPE, not the reach. (Source-verified.)

### THE THREE UNMET BARS — the convergent root cause (one sentence each)

1. **The neck has NO structural waist (the SHAPE defect, the headline).** Both the spanning
   `.dock-fission-neck` (`fission-bridge.css:462`) AND the per-seam
   `.dock-fission-piece::before` (`:462` in its block) carve the throat with
   **`clip-path: inset(var(--neck-inset) 0 …)`** — a CONSTANT-cross-section pinch that thins
   UNIFORMLY along its whole length. A constant-cross-section capsule, blurred + thresholded,
   can only yield a fatter rounded capsule — **there is no geometry that produces a concavity.**
   A waist is a *concavity*; concavity needs two convex masses **OR a clip-path that carves an
   hourglass**. The shipped `inset()` neck supplies neither. *(This is the exact goo-morph
   GOLDEN finding restated at dock scale — `goo-morph/GOLDEN.md §0`.)*

2. **The V↔H morph goo is a DEAD WIRE (`filter:none`).** `morph-bridge.css:60` reads
   `filter: var(--dock-bridge-goo-filter, none)` and `--dock-bridge-goo-filter` is **set
   NOWHERE** in `src/`/`demo/` (grep: 0 hits) → the V↔H "Liquid teardrop" always resolves to
   `none` — a plate crossfade with the metaball detached. *(Source-verified.)*

3. **The filter DEFAULTS are razor-tight** (`blur 7` / `slope 20` / `offset −9`) vs the
   goo-morph GOLDEN-proven gooey sweet spot (`~10` / `~15` / `~−7`) — the fuse sharpens
   instantly instead of welling a soft gel shoulder.

There is NO assembly defect on the gallery (the engine + the drag gesture are live), but the
**iOS-27 SCROLL trigger** (the v3 headline: scroll → 5-tab bar buds the transport sub-dock →
scroll-up re-merge) is unassembled — the single composition the reference's defining move needs.

---

## 1. THE GOLDEN CORE IDEA — the ASYMMETRIC BARBELL BUD-OFF (one plate buds a sub-dock through a clip-path hourglass neck)

A fission is, definitionally, **ONE liquid body that BUDS a SECOND body off itself and
stretches a throat between them until it pinches and SNAPS** — the iOS Apple-Music read, the
cell-mitosis read, the time-reverse of a metaball merge. The whole facility unifies under ONE
topology lifted straight from the proven goo-morph GOLDEN spike — **but at the dock's
ASYMMETRIC scale: a LARGE surviving dock-PLATE buds a SMALL island, not two equal beads:**

```
  ▇▇▇▇▇▇        ▇▇▇▇●        ▇▇▇▇──●        ▇▇▇╲__╱●        ▇▇▇▇   ●        ▇▇▇▇   ▣
  dock         island bud    neck WELLS      PINCH/waist     SNAP+recoil    sub-dock
   t=0          t≈.10          t≈.4            t≈.55           t≈.75           t=1
 (one body,    (buds off the   (filament      (tense throat   (neck breaks,  (settles w/
  goo OFF)      plate edge)     spans reach)    holds — dwell)  plate recoils) √φ overshoot)
```

The fission bridge hosts, per split, exactly this triad inside the ONE static
`#dock-fission-goo` filter — the union of lens-b's barbell, lens-a's structural neck, lens-c's
cartoon launch:

1. **`coreBody`** — the surviving dock PLATE (the large anchored mass; the goo is OFF on the
   crisp rest dock). It stays; it RECOILS a hair on the snap (Newton's third law as cartoon).
2. **`islandBody`** (`.dock-fission-island`) — a warm-cream droplet, diameter `D =
   dockThickness/φ` (the golden-minor — a BLOB, not a plate), that **buds OFF the chosen item's
   edge** (scale 0→1 over the first ~10%, anticipation) and **travels the full placement reach**
   (`= dockThickness·φ`, the golden-major) along `(--island-dx, --island-dy)` into real space
   beside/above/below, growing into a real `.glass-floating` six-layer sub-dock carrying the
   migrated `#split`-slot controls. **THE bud that goos off.** (For n>2 — the `search` radial
   burst — N island buds, each a droplet, each a body-anchored hourglass neck to the ONE plate.)
3. **`neck`** (`.dock-fission-neck` + the per-seam `::before`) — a SEPARATE filament between
   plate-edge and island-bud whose **cross-axis girth WELLS on `sin(π·p)^1.5`** (≈0 at the ends,
   peak mid) and whose **`clip-path` is a STATIC HOURGLASS POLYGON** (the `--neck-filament`
   idiom, re-cut as a concave polygon): the sides pull IN at the midpoint so the silhouette has
   a **STRUCTURAL concave waist BEFORE the blur even fuses it.**

The island travels APART (the reach × `--island-t`); the static `#dock-fission-goo`
blur→threshold welds `coreBody + neck + islandBody` into ONE warm hourglass **with a real
waist** where the neck is thinnest; the girth wells through the `neckHold` dwell then recedes;
past the dwell the threshold pinches the waist off — **the SNAP**, punctuated by the
`useLiquidFlex` recoil overshoot. The sub-dock then settles with a √φ-proportioned bounce.

### THE GOLDEN RECONCILIATION — why this is the fittest of the three

- **Lens-a's structural clip-path hourglass neck is the headline + the WebKit insurance.** The
  waist is a *structural concavity* (a clip-path polygon), present on BOTH engines BEFORE the
  filter fuses it — it does not depend on a filter nuance reading identically across engines.
  The filter merely *softens and warms* a concavity that already reads decisive. This closes the
  "works in Chrome, broken in Safari" class at the GEOMETRY layer, **de-risked live in the spike
  (§8, waist/body 0.31 at the peak, a true concave hourglass in painted pixels).** This is the
  single load-bearing fix — it retires the shipped `inset()` constant-pinch.
- **Lens-b's body-anchored spanning topology + the descriptor generalization is the body of the
  design.** The neck/island already SPAN the reach off `--island-t`/`--island-dx/dy` (the
  orchestrator writes them) — we re-cut the SHAPE from `inset()` to the hourglass and let the
  ONE descriptor map (`DOCK_SPLIT_SIGNATURES`) drive all three modes (media=lateral peel /
  search=radial burst / nav=inward-merge) with NO new code path. Lens-b's scroll-fission
  assembly closes the one missing trigger.
- **Lens-c's cartoon-punch is the FEEL overlay** (anticipation bud, stretch-toward-neck, arc
  lob, √φ-overshoot land, moving cast, trailing specular sweep), wired to a `--dock-goo-weight`
  (= the Band-0 `--motion-weight` idiom) so the fission reads as a bold liquid metaball.
  **Reconciled tension: lens-c's PORTAL (escaping `contain: paint`) is REJECTED as a parallel
  structural fork.** The shipped bridge already lives on `.glass-dock-frame[data-splittable]`
  with **`overflow: visible` (no clip)** and the island/neck fly OUTSIDE the dock box
  (`fission-bridge.css:128-133`) — the clip-box defeat lens-c diagnosed was a stale read of an
  earlier `contain:paint` build; the frame has no clip today. So the bud already CAN travel into
  real space with NO portal. Adding a fixed-position portal overlay would be a second mount, a
  FLIP-origin sync seam, and a parallel render path — a bolt-on the KISS/DRY law forbids when
  the extant frame already escapes the clip. **The cartoon launch rides the EXISTING bridge.**
- **Lens-c's `maxStretch: 1.18` is REJECTED in favour of the shipped ≤1.08 anti-taffy fence.**
  The "loud register" is carried by the GIRTH swell + the arc + the moving cast, not by taffy
  body elongation past the volume-preserving cap — the universal liquid-weight law is inertia +
  bounce, never stretch-to-tear. The cap stays 1.08.

It stays ONE `useDockFission`: the orchestrator's drive/spring/signatures/seam-tension/PRM seat
are verbatim; we re-author the SHAPE the bridge CSS carves (the `inset()` capsule → the
hourglass polygon), WIRE the dead morph goo, RETUNE the filter literals, and COMPOSE the one
missing scroll trigger. The pager-dot worm + the goo-morph carousel barbell are the migration
PROOF that this topology reads — the dock fission is the same metaball vocabulary at the 1→N
asymmetric scale. **One vocabulary library-wide. No second engine. No portal fork. No legacy.**

---

## 2. THE MECHANISM — geometry · filter · feel · assembly

### 2.1 Geometry — the hourglass neck (the SHAPE re-invent, the headline fix)

`useDockFission` keeps its `--dock-split-t` drive, the ONE `SpringProgress`/`DOCK_SPRING`, the
`writePieces` loop, the `--island-t`/`--island-dx/dy`/`--split-dx/dy`/`--neck-t`/
`--neck-specular-angle`/`--stretch`/`--seam-tension` writes, the PRM `seatSync()` — VERBATIM. The
ONE additive orchestrator write is the **girth bell** `--neck-girth` per frame (so the throat
WELLS then PINCHES rather than thinning monotonically):

```
p            = neckT for this seam (the staggered split scalar the orchestrator already stages)
girth(p)     = GIRTH_FLOOR + sin(π·p)^1.5 · SWELL    // ≈0.16 at ends, ~0.92 at mid (the WELL)
budOut(p)    = clamp(0, p/0.10, 1)                   // the island buds off over the first 10%
recoil(p)    = useLiquidFlex.drive(p) tanh, cap ≤1.08 (verbatim)   // the SNAP
```

The bridge CSS re-cut (the SHAPE, all compositor — `transform`/`scale`/`clip-path`/`opacity`):

- **`.dock-fission-neck`** — KEEP its reach/rotate/scaleX span (`fission-bridge.css:172-214`,
  already correct — it spans `reach × island-t` along the placement vector). **REPLACE its
  uniform `scaleY` thinning + add a clip-path:** `scaleY(var(--neck-girth))` (the bell, written
  by the orchestrator) AND `clip-path: polygon(…)` — the STATIC HOURGLASS (wide where it meets
  the plate + the bud, pinched at the centre, throat ≈ `--neck-waist` = 0.34 of the box). The
  concave waist is now STRUCTURAL on both engines before the filter fuses it.
- **`.dock-fission-piece::before`** — REPLACE `clip-path: inset(var(--neck-inset) 0 … round
  999px)` (`fission-bridge.css:462`) with the SAME hourglass `clip-path: polygon(…)`
  parameterized by `--neck-filament`/`--seam-tension` (the pointer-pull RESIST still thins the
  throat further). The per-seam neck now has a real concavity — the constant-pinch is DELETED.
- **`.dock-fission-island`** — KEEP its reach/scale/opacity (`:221-256`, already a real
  `.glass-floating` plate that buds + travels + grows). Add the `budOut` early-scale + the
  `±reach·0.06·sin(π·p)` arc lob + the √φ overshoot share (`--dock-goo-weight · 1/φ`).

The rest footprints (the `D` circle, the `restNeck` bar) are reserved ONCE (one layout solve;
`proof:no-layout-animation` flat). The terminal `seatSync(to)` is the resting authority — it
snaps the island dead-on its landing, killing the overshoot creep into rest (the goo-morph
GOLDEN §2.1 lesson).

### 2.2 The filter — KEEP every byte, RETUNE the literals + WIRE the dead morph goo

Keep the `#dock-fission-goo` graph + every Safari fact VERBATIM. Two surgical changes:

| token (`DockGooFilter.vue` prop default) | current | GOLDEN | why |
|---|---|---|---|
| `blur` (stdDeviation) | 7 | **~10** | a wider alpha skirt → the plate + bud feel each other from further → the neck wells gooier; proportionate to the larger plate mass |
| `thresholdSlope` | 20 | **~15** | surface tension: ~15 is the SVG-metaball sweet spot — a soft gooey shoulder, not a razor mercury edge |
| `thresholdOffset` | −9 | **~−7** (re-solved for slope 15) | crisp edge at REST, a gooey shoulder in the fused throat |

These are the EXACT goo-morph GOLDEN-proven numbers, re-confirmed at dock scale in the spike
(§8). STATIC literals → Safari-safe; the props already exist, so a calmer consumer dials down.

**WIRE THE DEAD MORPH GOO (the one-token fix):** set `--dock-bridge-goo-filter:
url(#dock-morph-goo)` on `.dock-morph-bridge-goo` under `[data-morphing]` (`morph-bridge.css`),
so the V↔H "Liquid teardrop" actually fuses a waist at the midpoint instead of crossfading two
plates. The `#dock-morph-goo` `<defs>` is already mounted; only the token assignment is missing.
**Both goos live; neither graph is re-authored.**

**KISS (flagged, out of scope here):** `#glass-goo` (`GlassGooFilter`) + `#dock-fission-goo`
(`DockGooFilter`) + `#dock-morph-goo` are byte-identical graphs at three scales — a later
`<GooFilter :id :blur :slope :offset>` merge collapses them to one mount (the goo-morph GOLDEN
already flagged this). Noted, not done here.

### 2.3 The FEEL — liquid-weight universal, cartoon-punch, gated per `--dock-goo-weight`

The fission is a **driver** event (design.md §L2/§L4): it carries `--dock-goo-weight` (= the
Band-0 `--motion-weight` idiom) toward 1 — the bold register. EVERY principle is
`f(--dock-split-t)` / `f(--stretch)` (deterministic-frame, compositor-only, NO second clock):

| principle | mechanism (reuse extant) |
|---|---|
| **Anticipation** | the island BUDS off the plate edge (scale 0→1 over the first ~10%); a `--ease-cartoon-punch` pre-dip (~4% inward) on the plate before the bud launches (a `linear()` dip no spring expresses) |
| **Stretch toward neck** | each body elongates on-axis as the gap opens (`useLiquidFlex` volume-preserving reciprocal, cap `--dock-fission-max-stretch` **≤1.08** — the anti-taffy fence HOLDS; lens-c's 1.18 REJECTED) |
| **Exaggeration** | the mid-throat girth swells to ~0.92 then PINCHES (`--neck-girth` bell, the bold cartoon meatball); the loud register lives HERE, not in body taffy |
| **Arc (overlapping action)** | the island centre travels a `±reach·0.06·sin(π·p)` perpendicular parabola so the bud-off LOBS, not a flat slide; PRM → 0 |
| **Overshoot land** | the island lands with a **√φ-proportioned** overshoot (share = `--dock-goo-weight · 1/φ`), then settles — the `useLiquidFlex` tanh recoil the engine already drives on `neckT` |
| **Follow-through** | the SHIPPED `--neck-specular-angle` conic catch-light (the orchestrator writes `sweepAngle = neckT·360 + tension·60`) sweeps the throat TRAILING the geometry — `plus-lighter`, sRGB-safe, the `fission-bridge.css ::after` cohort, NO fork |
| **Moving cast** | a `::after` cartoon-shadow plane (design.md §Shadows moving-cast — compositor `transform` on a shadow-caster, NEVER an animated `box-shadow`) slides opposite the island travel + deepens mid-flight; reads `--shadow-cartoon`; `prefers-contrast:more` floors it UP; PRM → static |

**morph-MORE-on-move (the iOS-27 weight-responds-to-gesture signature):** the engine ALREADY
feeds `usePointerVelocityField` from inside the spring loop → `--seam-tension` thins the neck on
a fast pull (the RESIST) and the spring re-bases from velocity on release (stretch→snap). The
drag-to-split gesture (`useDockItemDrag`) IS the idiomatic trigger — a fast drag wells a fatter,
longer neck + throws the island farther; a slow keyboard `toggleSplit()` a tense thin thread.
**No new spring, no new gesture, no new clock** — the `--motion-weight` fence holds.

**The dwell follows the NECK, not a timer.** The neck-opacity gate fades in as `--neck-t`
crosses ~0 and out as it crosses `--neck-break` so the bridge is visible EXACTLY while the goo
deforms (no dead-slab dwell — the goo-morph GOLDEN §2.3 lesson, already shipped on the necks).

### 2.4 Material — the warm six-layer read survives the threshold (§3 colorful field, NEVER gray)

- Core plate, island, neck all share the warm-cream domed-droplet `radial-gradient` (already on
  the necks + island) → ONE continuous liquid-glass droplet with an inner catch-light. **NEVER
  gray** (BA.W-NO-GRAY): the warm-chroma floor holds, both modes (the `.dark` arm lifts the warm
  chroma; plain per-mode arms — no inset-shadow-in-`light-dark()` trap).
- **§3 colorful field behind glass + a defined edge:** the bridge layer keeps a TRANSMISSIVE
  warm opacity (~0.80, spike-verified) so the vibrant aurora/content field reads THROUGH the
  welling neck + the island (the spike shows purple/teal/green reading through). The threshold
  IS the crisp metaball edge; a 1px inner warm rim (`--glass-edge`) seals the §3 defined edge.
- **The second dock is a REAL glass dock** — `.dock-fission-island` reads the SAME
  `.glass-floating` token cohort the dock body reads (six-layer composite via tokens, NO second
  material recipe), carries its OWN margin (box-INVIOLATE), is `pointer-events:auto` (a live
  dock). PAPER morphism: the sub-dock reads the paper-grain surface idiom where the dock does.
- **Golden proportion (Aristotelian, all things):** island diameter `D = dockThickness/φ`;
  placement reach `= dockThickness·φ`; neck rest-thickness `D/φ`; overshoot share
  `motion-weight·1/φ`; arc amplitude `reach·1/φ²·…`; island radius `var(--radius-dock)`
  concentric with the core.
- **AUDACIOUS √φ typography:** the sub-dock labels ride the sqrt-φ display ladder; the
  detached-context heading reads the audacious tier where a context label paints.

### 2.5 ASSEMBLY — the one missing trigger (compose, do not build)

The gallery + drag triggers are LIVE; the ONE unassembled trigger is the v3 SCROLL headline.
Compose the SHIPPED primitives — NO new engine, NO portal:

- **`useScrollChrome` → `useDockFission` (the v3 headline, `W-DOCK-SCROLL-FISSION`).**
  `useScrollChrome` already returns `collapseT`/`collapsed`/`direction`; past the threshold (or
  on a down-flick) the shell `GlassDock :splittable :splitContext="media"` fires `split()` (the
  5-tab bar buds the transport sub-dock); scroll-up `merge()`s. Bidirectional + interruptible
  falls out of the one-spring re-base. The literal Apple-Music read. This is a ~30-line
  composition on the shell, not a build.
- **Drag (already live, KEEP):** `useDockItemDrag` commits the fission on a drag past threshold —
  the drag IS the split, morph-more-on-move via the existing seam-tension feed.
- **Manual / route-context (already live, KEEP):** `useDockContextSilhouette` recomposes the
  silhouette per route (drill-in buds a back-capsule); `toggleSplit()` is the keyboard path.

All triggers are the SAME `split()/merge()` on the SAME spring. If a thin `useDockFissionHub`
seam helps route the three triggers on `GlassDock`, it is ~30 lines of routing — folded into
the scroll-fission wave, never a parallel engine.

---

## 3. CROSS-ENGINE (Chrome + Safari) — the binding §L7 contract

- **Channel:** regular `filter: url(#dock-fission-goo)` / `url(#dock-morph-goo)` on the goo'd
  bridge (NOT `backdrop-filter:url` — WebKit bug 245510). Inputs = the plate edge + round island
  + a clip-path hourglass neck; all `transform`/`scale`/`clip-path`/`opacity`/`--*` per frame;
  the filter literals are STATIC (no var-driven `stdDeviation` — bug 283156 absent; the graph is
  already literal).
- **sRGB mandatory** (`color-interpolation-filters="sRGB"` — WebKit forces sRGB regardless, bug
  136418; declaring it makes Chrome MATCH so the waist thresholds IDENTICALLY on both). Already
  set on `#dock-fission-goo` + `#dock-morph-goo`.
- **The clip-path hourglass neck is the WebKit insurance (the boldest move):** the waist is a
  STRUCTURAL concavity guaranteed on both engines BEFORE the filter fuses it — de-risked live in
  the spike (§8, waist/body 0.31 at mid, a true concave hourglass in painted pixels). Closes the
  "works in Chrome, broken in Safari" class at the GEOMETRY layer, not just the filter layer.
- **`@supports not (filter: url(#x))`** → a plain cross-fade of the core + the island (no weld,
  the crisp two-dock legible floor). **PRM (`reduce`)** → the orchestrator's `seatSync()` snaps
  both bodies + the island to the endpoint in ONE frame; the bridge `--dock-bridge-opacity:0` +
  the necks/ripple/splash/sweep `display:none`; arc → 0; `--dock-goo-weight → 0`; cast static;
  `--ease-cartoon-punch → --ease-standard`. The dock STILL fissions (the topology confirms) —
  only the goo punch is off. Vestibular-safe.
- **Compositor-only + offscreen-park:** every animated axis is
  `transform`/`scale`/`clip-path`/`opacity`/`--*`; region tightenable to the plate↔island span
  (cheaper WebKit raster); `isolation: isolate`; the per-frame blur is gated to the
  `[data-fissioning]` window (NOT a steady-state re-blur — the §L7 Safari-budget fence).
- **Acceptance = a PAIRED-engine π** (Chromium AND a real Safari-26-on-Metal capture) at the neck
  peak proving the waist + the landed island + the re-merge, BOTH modes. **Never a single-engine
  green** (design.md §L7 / the live-verify-capture lesson).

---

## 4. A11Y / PRM CARVE (explicit)

- **PRM (`reduce`):** `seatSync()` snaps every piece + the island to the target in one frame;
  bridge removed; zero neck/ripple/splash/sweep frames; `--dock-goo-weight → 0` (one assignment
  zeroes squish/overshoot/anticipation/arc/cast); the moving cast → static. The dock STILL
  fissions; only the goo motion is off.
- **`prefers-contrast: more`:** the cartoon-cast opacity floors UP (the inked edge is a
  legibility asset, design.md §Shadows); the crisp dock + island are the legible surfaces.
- **`prefers-reduced-transparency`:** the island/dock α → 1 (the `.glass-opaque` endpoint via
  the ONE `--glass-level` path); the goo layer is decorative + `aria-hidden`.
- **AT / focus:** the goo bridge is `aria-hidden="true"` + `pointer-events:none`; the core dock +
  the island own roles/labels/keyboard; the split is a state change announced via a polite live
  region ("Player detached" / the context label); the island is a real focusable dock once
  landed (its `#split`-slot controls own roles). **WCAG-2.2.2:** one-shot per gesture, no
  auto-loop — no pause owed; the `media` scroll fission re-merges on scroll-up (reversible).

---

## 5. THE FILES — exact mechanism, deft integration (a UNION, no fork)

| file | change | kind |
|---|---|---|
| `src/styles/dock/fission-bridge.css` | **THE HEADLINE SHAPE FIX.** `.dock-fission-neck` (`:172`): KEEP the reach/rotate/scaleX span; REPLACE the uniform `scaleY` thin with `scaleY(var(--neck-girth))` + add the STATIC HOURGLASS `clip-path: polygon(…)` (throat `--neck-waist` 0.34). `.dock-fission-piece::before` (`:434`): REPLACE `clip-path: inset(var(--neck-inset) 0 …)` with the SAME hourglass `polygon(…)` (parameterized by `--neck-filament`/`--seam-tension`). `.dock-fission-island` (`:221`): add the `budOut` early-scale + the `±reach·0.06·sin(π·p)` arc + the √φ overshoot share. KEEP the specular-sweep + ripple + merge-splash + PRM carve VERBATIM. | **re-invent (broken geometry) — the load-bearing fix** |
| `src/components/custom/dock/composables/useDockFission.ts` | EXTEND `writePieces` + `seatSync`: write ONE `--neck-girth = GIRTH_FLOOR + sin(π·neckT)^1.5·SWELL` per frame (the bell the hourglass `scaleY` reads). Drive/spring/signatures/seam-tension/PRM seat / the existing `--island-*`/`--split-*`/`--neck-specular-angle` writes **verbatim**. NO second spring, NO second clock. | **refine (weak)** |
| `src/components/custom/dock/DockGooFilter.vue` | RETUNE default literals (`blur 7→~10`, `thresholdSlope 20→~15`, `thresholdOffset −9→~−7`) for a gooier fuse window — new prop DEFAULTS; graph BYTE-UNCHANGED (Safari facts verbatim). | **keep (fit) — values only** |
| `src/styles/dock/morph-bridge.css` | **WIRE THE DEAD GOO:** set `--dock-bridge-goo-filter: url(#dock-morph-goo)` under `[data-morphing]` (currently UNSET → the V↔H teardrop is `filter:none`). The symmetric one-token fix. | **fix (broken) — the dead-wire** |
| `src/styles/tokens/` (dock scheme) | add `--neck-girth` (`@property`, typed), `--neck-waist` (the hourglass throat, 0.34), `--dock-goo-weight` (the cartoon-punch lever, derived from `--motion-weight`). | tokens |
| `src/components/custom/dock/GlassDock.vue` | UNCHANGED structurally — `:splittable`/`:splitContext`/`:splitPlacement`/`data-dock-splittable` auto-register / the drag-to-split / `useDockContextSilhouette` / `#split` slot already SHIP. Compose `useScrollChrome` → `useDockFission` for the scroll trigger (`:fissionTrigger="scroll"`). | **refine (the wire)** |
| `demo/stories/dock/` | a `dock-scroll-fission` story: the live shell `GlassDock :splittable :fissionTrigger="scroll" :splitContext="media"` over a scrollable field — the 5-tab → transport-triad → re-merge (the v3 read), the first live scroll-island render + the π surface. `dock-gallery` + `morph-showcase` UPGRADE to the hourglass neck (the goo paints a waist, not a slab/L-crossfade). | demo |
| `useDockContextSilhouette.ts` / `useScrollChrome.ts` / `useDockItemDrag.ts` / `DOCK_SPLIT_SIGNATURES` / `PLACEMENT_VECTOR` / the box-INVIOLATE fence | UNCHANGED — REUSED (the scroll-fission composes them; this spec makes the GEOMETRY they drive paint a real metaball). | **reuse** |

**NO LEGACY:** the `inset()` constant-pinch neck + the dead `--dock-bridge-goo-filter: none` are
DELETED, not aliased — replaced in the same amendment. The orchestrator drive, the
`DOCK_SPLIT_SIGNATURES` map, the Safari filter graph, the `PLACEMENT_VECTOR`, the box-INVIOLATE
fence all SURVIVE verbatim (fit). Clean break only where broken. NO portal fork (lens-c's portal
REJECTED — the frame already escapes the clip). The goo-morph `#glass-goo` + `#dock-fission-goo`
+ `#dock-morph-goo` stay three mounts at three scales (the later `<GooFilter id>` merge flagged,
out of scope).

---

## 6. THE ACCEPTANCE BAR (the gestalt is the bar)

- **G1 (headline, A13):** a real split gesture (the drag past threshold on `/dock/dock-gallery`,
  the `toggleSplit()` keyboard path, AND the scroll fission on the new story) shows the chosen
  item **GOO OFF** — a warm-cream island buds off the plate edge, a metaball neck STRETCHES +
  WELLS to a CONCAVE waist (**waist/body ≤ 0.45 at the midpoint, π-measured via canvas-readback
  of the warm alpha band; `hasLocalMinimum` true along the travel axis**), the neck DWELLS open
  ~250–400ms, then PINCHES + SNAPS, and a **REAL second sub-dock settles beside/above/below**
  (`.dock-fission-island` at scale 1, opacity 1, carrying the migrated controls). Born-RED on the
  shipped `inset()` neck (monotone convex cross-axis profile, no local minimum).
- **G2 (generalized):** the SAME engine produces the split from a V source AND an H source, from
  an arbitrary registered item, to `beside`/`above`/`below`, and the `media`/`search`/`nav`
  signatures each read distinct — proven on the gallery (media) + a V↔H morph-showcase dock.
- **G3 (Safari):** the waist reads IDENTICALLY on real Safari-26-on-Metal (sRGB-pinned, static
  filter, no `backdrop-filter:url`, the clip-path structural waist) — **paired-engine π.**
- **G4 (no-gray + §3):** warm-cream both modes (C ≥ 0.010, H ∈ [45,85] on plate + neck + island);
  the vibrant field reads THROUGH the transmissive neck + island.
- **G5 (assembly):** a LIVE shell `GlassDock` fissions on SCROLL (no demo button) — the 5-tab bar
  → transport-triad → scroll-up re-merge, bidirectional + interruptible. Born-RED on HEAD (no
  `useScrollChrome`→`useDockFission` composition).
- **G6 (perf/PRM/de-dup):** ~3–4 transforms/frame, static filter, the goo gated to the
  fission/morph window (NOT a steady-state re-blur); PRM → `seatSync()` topology swap, zero neck
  frames; ONE `useDockFission`, the `:splittable` facility, ZERO second engine/portal/spring; the
  `--dock-bridge-goo-filter none` dead-wire FIXED; the `inset()` constant-pinch DELETED.
  `proof:no-layout-animation` green.

---

## 7. BORN-RED GATE SKETCH (the π / readback that proves it)

A paired-engine rAF frame-series on a REAL drag-to-split `/dock/dock-gallery`, a REAL scroll
fission on the new `dock-scroll-fission` story, AND a REAL `/dock/morph-showcase` "Liquid
teardrop" morph, BOTH modes + the **webkit** project, LIVE motion, canvas-reading the warm-cream
alpha band along the travel axis at the neck peak:

```js
// at the neck peak (p≈0.55, the waist-hold), read the goo layer's rendered silhouette via a
// canvas readback of the warm-cream alpha band along the travel axis:
//   bodyGirth  = the dock plate's cross-axis alpha extent (the large reference mass)
//   waistGirth = min cross-axis alpha extent of the fused band between plate-edge and island
assert waistRatio = waistGirth / bodyGirth <= 0.45        // a REAL concave waist (headline)
assert hasLocalMinimum(crossAxisProfile)                  // the profile DIPS between two masses
assert islandScale(p=1) >= 0.98 && islandOpacity(p=1) >= 0.95   // a REAL second dock arrives
assert neckGirth(t).rises_then_falls()                    // wells → pinches, not a monotone fade
assert gooFilter(fissionBridge) !== 'none' at the peak    // the fission goo is WIRED
assert gooFilter(morphBridge)   !== 'none' at the peak    // the V↔H dead-wire FIXED (born-RED)
assert warmCream: C >= 0.010 && H in [45,85], both modes  // never gray
assert webkit.waistRatio ≈ chromium.waistRatio (±0.05)    // paired-engine, §L7
assert oneSpring && no second clock/setTimeout/@keyframes // the fission one-spring fence
```

**Born-RED proof (source-grounded on HEAD):** the shipped `.dock-fission-neck` /
`.dock-fission-piece::before` carve with `clip-path: inset(…)` → a constant-cross-section
capsule → the cross-axis profile is MONOTONE convex (no local minimum) → `hasLocalMinimum` FAILS
and `waistRatio` ≈ the girth floor FAILS; `morph-bridge.css:60` reads `--dock-bridge-goo-filter`
UNSET → `gooFilter(morphBridge) === 'none'` FAILS; no scroll composition → the scroll-fission
arm FAILS. The hourglass `clip-path` supplies the local minimum (the spike measured
waist/body 0.31 at the peak), the morph-token wire turns the V↔H goo on, and the
`useScrollChrome`→`useDockFission` composition assembles the scroll trigger.

---

## 8. THE DE-RISK SPIKE (built + verified live)

`docs/tranches/BD/greenfield/dock-fission/golden/dock-fission-barbell.html` — a throwaway
standalone spike (no build, no glass-ui import) of the BOLDEST dock-specific mechanism: the
**ASYMMETRIC** barbell (a LARGE dock PLATE + a SMALL island bud, `D = dockThickness/φ`, joined by
a clip-path hourglass NECK spanning the full reach `= dockThickness·φ`) through a byte-identical
static `#dock-fission-goo` filter (blur 10 / slope 15 / offset −7), over a colorful
purple/teal/green field. This is distinct from the goo-morph spike's two EQUAL bodies — it proves
the dock's asymmetric plate-buds-a-sub-dock topology, not just a symmetric merge.

**Verified live in Chrome** (`golden/peak-waist.png`): at p=0.55 the render shows a large
warm-cream dock plate (left) BUDDING a smaller island droplet (right), fused by a genuine
**concave hourglass waist** — a real metaball neck, NOT a slab and NOT a lateral peel. The
colorful field reads transmissively THROUGH the warm glass (§3). The π readback (`window.__sweep()`):

| p | gap (px) | neckGirth | islandScale | waist/body | localMin | read |
|---|---|---|---|---|---|---|
| 0.00 | 8.0 | 0.160 | 0.000 | 0.054 | — | dock at rest (island budding) |
| 0.25 | 29.9 | 0.612 | 0.711 | 0.208 | ✓ | neck welling, bud emerging |
| 0.50 | 51.9 | 0.920 | 0.871 | 0.313 | ✓ | the WELL peaks |
| **0.55** | **56.3** | **0.906** | **0.904** | **0.308** | **✓** | **✓ REAL WAIST + BUD** (≤ 0.45) |
| 0.75 | 73.8 | 0.612 | 1.000 | 0.208 | ✓ | pinching, island landed |
| 1.00 | 95.7 | 0.160 | 1.000 | 0.054 | ✓ | snapped — sub-dock settled |

waist/body stays well under the 0.45 gate across the whole fission (peak 0.31 at mid),
`neckGirth` rises→falls (0.16→0.92→0.16 — wells then pinches, never a monotone fade), and
`islandScale` climbs 0→1 (a real second dock arrives). The boldest cross-engine mechanism (the
structural clip-path waist + the filter weld at the dock's asymmetric scale) is proven; the
painted screenshot is the authoritative pixel evidence of the concave waist.

---

## 9. DELTA-ASSAY → the single wave amendment (no dup vs the union waves)

ONE amendment **`BD.W-DOCK-FISSION-BARBELL`** (band: dock/refine; depends: `useDockFission` +
`DockGooFilter` + `fission-bridge.css` shipped; siblings `W-GOO-BARBELL-NECK` /
`W-DOCK-SCROLL-FISSION` / `W-FISSION-FILAMENT`):

- **RE-AUTHORS the fission NECK SHAPE** — the `inset()` constant-pinch (both
  `.dock-fission-neck` + `.dock-fission-piece::before`) → the STATIC HOURGLASS `clip-path:
  polygon(…)` + the `--neck-girth` bell (the load-bearing fix; lifts the goo-morph GOLDEN
  `--neck-filament` hourglass at dock scale — reuse, no fork). **SUPERSEDES + UNIONS
  `W-FISSION-FILAMENT`** (the spanning neck is already shipped; this wave is the SHAPE the
  spanning neck was missing — reconcile so ONE wave lands the hourglass).
- **FIXES the dead `--dock-bridge-goo-filter: none` V↔H wire** (the one-token morph-goo fix).
- **RETUNES the `DockGooFilter` literals** (blur 10 / slope 15 / offset −7).
- **ADDS the cartoon-punch overlay** (budOut + arc + √φ overshoot + moving cast, gated per
  `--dock-goo-weight`); the body squish cap STAYS ≤1.08 (lens-c's 1.18 rejected).
- **EXERCISES `W-DOCK-SCROLL-FISSION`** — composes `useScrollChrome` → `useDockFission` on the
  live shell (the first live scroll-island render; the single highest-value assembly).

It does **NOT dup `W-GOO-BARBELL-NECK`** (that is `useGooMorph` at viewport scale; this is
`useDockFission` at dock scale — two engines, two scales, the SHARED `--neck-filament` +
`--neck-specular-angle` + moving-cast idioms REUSED). It SUBSUMES the neck-shape + dead-wire as
the *geometry+wiring* arm of the same fission rebuild. Still ONE `useDockFission`, still the
`:splittable` facility, still ONE goo vocabulary library-wide — a refinement-in-place, not a
re-fork, NO portal, NO legacy. `W-GOO-SPLIT-PERF` (the Safari-Metal budget over the heavier
hourglass goo) re-fires downstream, untouched here.
