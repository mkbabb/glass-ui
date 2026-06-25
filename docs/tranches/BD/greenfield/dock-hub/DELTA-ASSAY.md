# DELTA-ASSAY — the DOCK-AS-HUB facility (GOLDEN vs CURRENT, the UNION path)

> The golden-vs-current delta + the deft UNION integration. Source-verified at HEAD +
> live-inspected (Chrome :5173 — `/dock/liquid-playground`, `/dock/dock-gallery`, the
> `golden/eruption-spike.html`). The three challenges (`challenge/1.md`/`2.md`/`3.md`) are
> FOLDED — the spine SURVIVES clean, the boldest move took the hardenings below.
>
> **Survival of the fittest:** the spine is already on disk (one runner + a verb facade);
> the GOLDEN's `useElementMorph`/`useDockHub` are DUPLICATE NAMES for the union's already-named
> `useElementBloom` (`BD.W-FLIP-SPINE`) + `useDockLink` (`BD.W-DOCK-LINK-API`). The dock-hub is
> NOT a new engine — it is the missing `<DockExpand>` SFC + the `envelop` topology + the
> de-overfit excision, deftly composed onto the extant spine. KISS, DRY, NO LEGACY, NO dual-path.

---

## 0 · The headline reconciliation (the trap the GOLDEN walked into)

The GOLDEN was written as if the hub spine were greenfield ("zero hits in `src/`"). It is HALF
greenfield: the **runner + facade are ALREADY BOOKED under union names**, and writing the GOLDEN's
proposed names verbatim would FORK them (a no-legacy violation, the exact disease the dock band
already cured for dock-core/dock-fission). The union path is therefore a **rename-onto-the-booked-
spine + the missing SFC + a de-risked envelop**, not the GOLDEN's "mint `useElementMorph` /
`useDockHub`" build manifest.

| GOLDEN name (§1/§2/§10) | The union's ALREADY-BOOKED name | Owner wave | Verdict |
|---|---|---|---|
| `useElementMorph` (the ONE runner) | **`useElementBloom`** | `BD.W-FLIP-SPINE` (folds 4→1) | RENAME the GOLDEN to `useElementBloom` — do NOT mint a 2nd runner |
| `useDockHub` (4-verb facade) | **`useDockLink`** | `BD.W-DOCK-LINK-API` (toSurface/split/silhouette/receive) | RENAME to `useDockLink` — the facade EXISTS in spec |
| `--dock-portal-t` (envelop driver) | NET-NEW (no conflict) — but coexists with `--dock-morph-t` | NEW (this amendment) | KEEP as a NET-NEW scalar; enroll in the LINK-API registry |
| `DOCK_SPLIT_SIGNATURES` re-type | **already DATA** (dock-fission ledger: "`DOCK_SPLIT_SIGNATURES` as DATA") | `BD.W-NO-HARDCODED-REF` renames `media`→`lateral` | the GOLDEN's "re-type" is ALREADY the union plan |

**The deft union in one line:** the dock-hub is `<DockExpand>` (the one genuinely-missing artefact)
wrapping the BOOKED `useDockLink` verbs, plus the `envelop` topology (`--dock-portal-t` + a goo-tear
that reuses `fission-bridge.css` necks AS A SIBLING), plus the de-overfit excision the
`BD.W-NO-HARDCODED-REF` census already targets — all referencing GOLDEN.md as the reference impl.

---

## 1 · What the CURRENT does well — KEEP (the fit spine, live + source verified)

1. **The agnostic spine SHIPS.** `useLiquidReveal(surface, {trigger, preset, blur})`
   (`src/composables/motion/useLiquidReveal.ts`) is genuinely surface-TYPE-blind — two refs + a
   preset, never inspects what the surface IS. The GOLDEN's diagnosis is grep-true. KEEP as the
   `bloom` topology core.
2. **The runner consolidation is ALREADY PLANNED.** `BD.W-FLIP-SPINE` mints `useElementBloom` and
   folds the 4 rAF bloom leaves (`useLiquidReveal`/`useDockCtaReceive`/`useCelebrationBurst`/
   `useBloomUp`) onto ONE driver. The GOLDEN's §2.1 "collapse 4 engines to 1" IS this wave. KEEP —
   the dock-hub RIDES it, never re-mints it.
3. **The verb facade is ALREADY SPEC'd.** `BD.W-DOCK-LINK-API` defines `useDockLink(dockRef,{fission,
   silhouette})` exposing `toSurface`/`split`/`silhouette`/`receive` — the GOLDEN's `useDockHub`
   verbatim, under the union name, with a hardened handle-boundary fence (no `defineExpose` reach)
   the GOLDEN omits. KEEP — the dock-hub's `<DockExpand>` is the declarative SKIN over these verbs.
4. **The fission engine is FIT.** dock-fission ledger: the engine spine (ONE `SpringProgress`/
   `DOCK_SPRING`, `useLiquidFlex` ≤1.08, `usePointerVelocityField` seam-tension, PRM seatSync,
   `DOCK_SPLIT_SIGNATURES` as DATA, the `:splittable` facility) is "100% FIT — KEEP byte-for-byte."
   The `fission` topology IS `useDockFission`. KEEP.
5. **The goo primitives are Safari-correct in `src/`.** `DockGooFilter.vue` / `fission-bridge.css`:
   `color-interpolation-filters="sRGB"`, regular `filter:url()` (never `backdrop-filter:url()`),
   `isolation:isolate` scoping, filter gated OFF at rest, `overflow:visible` (frame escapes the clip,
   NO portal). The neck is a SIBLING bridge element, never an ancestor of the glass. KEEP — and this
   is the SHIPPED pattern the spike VIOLATED (see §3 R1).
6. **The warm-cream glass HOLDS in `src/`, both modes.** dock-core ledger live-confirmed: plate
   `srgb .944/.903/.865` (R>G>B, NEVER gray) every dock, both modes; dock-fission: neck + island
   transmissive warm-cream. KEEP the material — the gray defect is the SPIKE's, not the shipped dock.
7. **`src/` proper is CLEAN of app-facility NAMES.** The overfit is the engine ENUMS + the DEMOS,
   never a hardcoded surface in a `src/` morph path. The de-overfit is a census + demo rebuild, not a
   spine surgery.

---

## 2 · What is WEAK — REFINE (the enums, the missing SFC, the demo)

1. **The app-domain ENUMS gate the public surface (born-RED, live + source confirmed).**
   - `useDockFission.ts:56` `DockSplitContext = "search"|"media"|"nav"` — app-domain keys on a public type.
   - `useDockShellProps.ts:198` `splitContext?: "search"|"media"|"nav"` — app-domain on the PUBLIC shell prop.
   - `GlassDock.vue:408,413` `if (ctx==="nav")` / `if (ctx==="media") dy *= 0.25` — a surface-TYPE branch IN THE SHELL.
   - `GlassDock.vue:329,334` `DOCK_SPLIT_SIGNATURES[props.splitContext ?? "nav"]` — the app-key lookup.
   - `useDockContextSilhouette.ts:68` `DockSilhouetteKind = "bar"|"bar+pill"|"split"|"search"` — the `"search"` arm is DEAD (typed, never built).
   REFINE: re-type over a `vector`-keyed `MorphSignature` SHAPE; the motion DATA under the keys is
   already generic (`vector: radial|lateral|inward-merge`). The `BD.W-NO-HARDCODED-REF` NC5 floor
   already targets exactly these literals; the dock-hub amendment EXTENDS NC5 to delete the dead
   `"search"` silhouette arm + the shell `splitContext` prop + the `ctx===` branches.
2. **There is NO `<DockExpand>` declarative SFC (born-RED, live: zero hits in `src/`).** `useDockLink`
   is a composable; the 90%-case consumer wants markup. The declarative skin (`<DockExpand topology
   v-slot>`) — trigger↔surface wiring, `aria-expanded`/`-controls`/`-haspopup`, focus-move + restore,
   Escape, focus-trap, the scrim — does NOT exist. This is the ONE genuinely-missing artefact. REFINE
   `BD.W-DOCK-LINK-API` to ADD it (composing the EXTANT `FocusScope` + `Drawer` scrim/dismiss —
   challenge-3 R5: do NOT re-fork focus-trap).
3. **The DEMO is the hardcoding (born-RED, live-confirmed).** `/dock/liquid-playground` renders
   `Search → sheet` / `Split → islands` / `Now Playing` mode buttons + prose "Maps Places sheet /
   Dynamic-Island / Apple Music player / One generalized useLiquidMorph engine". `/dock/dock-gallery`
   is a museum: `examples/{AppleMusic,DynamicIslandCall,Notification,VolumeHUD,Spotlight,TabBar,
   AppSwitcher}.vue`. REFINE: rebuild around ONE generic `<DockExpand topology>` × {Card, Drawer,
   Popover, viz-configurator} — the ≥3-distinct-surface H3 bar, call-expression scanned.
4. **`liquid-playground.vue` still names `useLiquidMorph` (the DELETED engine).** Live prose: "One
   generalized useLiquidMorph engine." `BD.W-SPIKE-DELETE` removes `useLiquidMorph.ts` wholesale.
   REFINE: the rebuilt demo composes `useDockLink.toSurface` (which folds onto `useElementBloom`),
   never the spiked engine — the same re-point `BD.W-CARD-SHEET-EXPAND` already mandates.

---

## 3 · What is BROKEN — RE-INVENT (the envelop goo-tear; the spike DISPROVES its own claim)

The spine is fit and the demo rebuild is a REFINE. The ONE genuinely BROKEN artefact is the GOLDEN's
headline boldest move — the `envelop` goo-tear — whose de-risk spike (`golden/eruption-spike.html`)
**proves the OPPOSITE of its claim**, live-confirmed by all three challenges AND re-measured here:

| Defect | The challenge | LIVE re-measurement on the spike (this assay) | RE-INVENT |
|---|---|---|---|
| **R1 — goo ancestor kills backdrop** | ch1 R1, ch2 R3, ch3 (top) | `.goo{filter:url(#golden-goo)}` ancestors the backdrop-filter dock body (`gooContainsDock===true`) → isolates the buffer → the field does NOT read through → flat mud-gray (a direct BA.W-NO-GRAY violation in the headline topology) | the goo neck is a SEPARATE SIBLING layer (the SHIPPED `fission-bridge.css` pattern), NEVER an ancestor of the glass bodies; the dock + surface stay transmissive |
| **R2 — layout animation** | ch1 R2, ch2 (top) | dock `width` walks `220→400→580px`, `height` `64→260→456px` per frame — the exact `proof:no-layout-animation` violation §4 forbids | drive `envelop` via the SHIPPED `--dock-morph-t` scale-FLIP over a measure-ONCE clipped body (the `dock-core/morph-spike.html` technique), `transform` only — OR scope the no-layout claim off envelop honestly |
| **R3 — non-φ near-square slab** | ch3 R3 | settled ratio `1.272` (neither φ nor 1/φ); content ~22% of footprint — an empty taupe slab, not a body that IS its payload | derive the settled rect + neck waist from φ off the trigger rect (the Aristotelian §3 prose the spike ignored); a φ ratio gate |
| **R4 — flat scale, not volume-preserving** | ch3 R2 | `sx===sy` for ~90% of travel (the ±0.06 burst is a 70ms garnish) → π `|sx·sy−1|<0.12` at t=0.4 REDs the spike's own mechanism | drive sx/sy from `useLiquidFlex`'s tanh volume-preserving law for the WHOLE arc (X·Y≈1, ≤1.08) |
| **R5 — overlap, not a thinned waist** | ch3 R4, ch2 R4 | bodies coincident (surface overlaps dock by ~113px mid-flight); no thinned waist + gap → the "naive ellipsoid / fade-disconnect" the binding law forbids | the surface pulls AWAY (a real gap opens) + the goo bridges it; `neckWaistRatio<0.5 AND gap>0` at the tear midpoint |
| **R6 — token-warm ≠ rendered-warm** | ch2 R5, ch3 (top) | the warm TOKEN over a multi-hue field + goo blur/threshold averages to taupe — the live-π gap the binding law exists to catch | the π samples the RENDERED membrane CHROMA (oklab, not the token) over the live field, both modes + an opaque per-mode warm UNDER-layer so the field tints but never grays |

**The honesty corrections (fold into the wave, not the build):**
- **The "4 engines" census is INFLATED** (ch1 R3, ch2 R6): `useLiquidMorph` has ZERO rAF (it composes
  `useLiquidReveal` + a `SpringProgress`) — it is the SPIKE that `BD.W-SPIKE-DELETE` removes, not a 4th
  FLIP runner. `BD.W-FLIP-SPINE` already states the live re-fork count is exactly **4** (reveal +
  cta-receive + celebration + bloom-up) and folds 4→1. The dock-hub H5 must DEFER to FLIP-SPINE's S1
  numeric rAF-driver count, NOT re-author a "countBloomRunners" arm that mis-counts `SpringProgress`.
- **`proof:no-hardcoded-refs` is a keyword grep that false-flags structural enums** (ch1 R4): the
  legitimate `DockSectionKind="nav"` (`DockSection.vue:65`, `constants.ts`) must be census-EXEMPTED.
  The dock-hub DEFERS the name-census to `BD.W-NO-HARDCODED-REF`'s NC1-NC6 (already comment-strips +
  scopes to artefact-names) and adds ONLY a CALL-EXPRESSION scan for the public verb signatures (H1/H3).
- **`DOCK_SPRING {response:0.32, ζ:0.7}` is an unverified hardcode** (ch1 note): cite `springPreset("dock")`,
  never the literal numbers (the dock-core ledger's W-GLASS-CAL spring fence).
- **The IN-vs-OUT branch is NOT auto-inferred** (ch1 R5): `topology` is a consumer-DECLARED prop on
  `<DockExpand>`; "surface-TYPE-blind" means no per-CONTENT branch (card vs sheet vs viz), NOT live
  DOM-ancestry inference. State this plainly.

---

## 4 · The UNION PATH (precisely how to evolve the current toward the golden, KISS, no dual-path)

**The dock-hub is ONE new SFC + ONE new topology + a de-overfit excision, all composing booked spine.**

1. **RIDE `BD.W-FLIP-SPINE`** — `useElementBloom` IS the GOLDEN's `useElementMorph`. The dock-hub mints
   NOTHING here; it rides the 4→1 fold. (The dock-hub's "ONE runner" requirement = FLIP-SPINE's S1.)
2. **AUGMENT `BD.W-DOCK-LINK-API`** — it already has the 4 verbs. ADD `<DockExpand>` (the declarative
   skin: `topology` prop + `v-slot="{trigger,open,close,phase}"` + `#surface` slot), composing the
   EXTANT `FocusScope` + `Drawer` scrim/dismiss for a11y (no re-fork). The `topology` prop selects the
   verb: `bloom`→`toSurface` (sibling), `envelop`→`toSurface` with the dock's own `.glass-dock` rect as
   the toRect, `fission`→`split`, `receive`→`receive`.
3. **NEW `BD.W-DOCK-ENVELOP-PORTAL`** — the ONE genuinely-new mechanism: the `envelop` topology +
   `--dock-portal-t` + the four-beat goo-TEAR, RE-INVENTED per §3 (neck-as-SIBLING, scale-FLIP not
   width/height, φ proportion, volume-preserving squish, real waist+gap, rendered-chroma π). It
   CONSUMES `useDockFission`'s neck + `fission-bridge.css` + `useLiquidFlex` + `usePointerVelocityField`
   + the merge-splash + `.shadow-cartoon-*` + `springPreset("dock")` — ZERO new physics core.
4. **EXTEND `BD.W-NO-HARDCODED-REF` NC5** — it already kills `silhouette('media')` + `DOCK_SPLIT_
   SIGNATURES.media`. ADD the dead `DockSilhouetteKind="search"` arm + the `splitContext` shell prop +
   the `GlassDock.vue:408/413` `ctx===` branches to the excision (re-type over `MorphSignature.vector`).
   The name-census stays NC1-NC6's (comment-stripped, structural-enum-exempt).
5. **AUGMENT the demo waves** — `liquid-playground.vue` + `dock-gallery.vue` rebuild around generic
   `<DockExpand topology>` × {Card, Drawer, Popover, viz}; replace the cloned-app SFCs with generic
   glass precepts (`GridSurface`/`MediaSurface`/`CommandSurface`/`LevelHUD`/`NavStrip`/`CallIsland`/
   `Toast`). This is the H3 ≥3-distinct-surface bar (call-expression scanned) + `BD.W-NO-HARDCODED-REF`
   NC4 (no brand strings). The `useLiquidMorph` prose dies with `BD.W-SPIKE-DELETE`.
6. **NO-OP / SUBSUME the rest** — `W-DOCK-HUB-API` (the union's own prior dock-hub stub) is SUBSUMED by
   this amendment (it predates LINK-API + FLIP-SPINE and double-specs the facade). `BD.W-DOCK-SUBDOCK`
   gets the recursion FREE (`toSurface(control, anotherGlassDockRef)` — a hub expands into a hub).
   `W-DOCK-SCROLL-FISSION` / `BD.W-CARD-SHEET-EXPAND` become INSTANCES of the hub (already consumers of
   `toSurface`). No engine fork, no dual path.

**Why this is the deft union, not a bolt-on:** every leg COMPOSES a booked primitive (the runner, the
facade, the fission neck, the goo filter, the squish, the cast, the spring). The dock-hub mints exactly
TWO new artefacts — `<DockExpand>.vue` (ref-wiring + aria, composing `FocusScope`) and the `envelop`
topology (`--dock-portal-t` + the four-beat phase map). Everything else is a rename onto booked names, a
demo rebuild, and an enum excision the no-hardcoded-ref census already owns. KISS, DRY, NO LEGACY.

---

## 5 · Convergence

- **Spine (one runner + verb facade + fission + glass + Safari goo):** FIT, booked, ~95% (rename-only).
- **`<DockExpand>` SFC:** missing, spec-ready (composes `FocusScope`/`Drawer`), ~70%.
- **De-overfit (enums + demo):** born-RED honest, the census wave owns it, ~75%.
- **`envelop` goo-tear:** BROKEN as drawn; RE-INVENT path is clear (6 hardenings, all from shipped
  primitives), ~55% — the build-time risk concentrates here.

**Item verdict: REFINE-dominant (the spine survives clean) + RE-INVENT the `envelop` goo-tear only.
Overall ~72%.** The remaining 28% is build-time: the re-cut compositor-only spike (scale-FLIP not
width/height), the neck-as-sibling layer split, the φ proportion, the volume-preserving squish, the
rendered-chroma π both modes + WebKit, and the `<DockExpand>` a11y composition.
