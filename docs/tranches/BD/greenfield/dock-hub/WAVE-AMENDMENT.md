# WAVE-AMENDMENT — the DOCK-AS-HUB facility (reconciled against the 116-wave union set)

> The CONCRETE tranche amendment. Each clause cites the existing wave by filename, references
> `docs/tranches/BD/greenfield/dock-hub/GOLDEN.md` as the reference implementation, and carries a
> real born-RED gate. No duplicative work — the runner (`useElementBloom`/`BD.W-FLIP-SPINE`) + the
> verb facade (`useDockLink`/`BD.W-DOCK-LINK-API`) + the name-census (`BD.W-NO-HARDCODED-REF`) are
> ALREADY booked; the dock-hub is the missing `<DockExpand>` SFC + the `envelop` goo-tear + the enum
> excision, deftly composed onto the booked spine.
>
> **The binding name reconciliation (DELTA-ASSAY §0):** the GOLDEN's `useElementMorph` IS the union's
> `useElementBloom`; its `useDockHub` IS `useDockLink`. The amendment RENAMES the GOLDEN's prose onto
> the booked names — minting a 2nd runner/facade under the GOLDEN names would FORK them (no-legacy).

---

## A · EXCISE — `W-DOCK-HUB-API.md` (SUBSUME, delete the file)

**`docs/tranches/BD/union/waves/W-DOCK-HUB-API.md`** — EXCISE.

It is the union's prior dock-hub stub. It predates BOTH `BD.W-FLIP-SPINE` (the runner) and
`BD.W-DOCK-LINK-API` (the facade) and double-specs them: it asks for "a generalized expand-target
contract... composes the dock-morph orchestrator + `useLiquidReveal` + `useDockCtaReceive`... does
NOT fork a second morph engine" — which is now `useDockLink` over `useElementBloom`, already booked.
It is referenced in NO DAG/roster (grep: only in sibling wave prose `W-DOCK-SCROLL-FISSION` /
`W-NO-HARDCODED-REFS`). Keeping it is a dual-spec (the no-dual-path law). Its three asks resolve onto
booked waves: the facade → `BD.W-DOCK-LINK-API`; the sub-dock recursion → `BD.W-DOCK-SUBDOCK`; the
de-overfit census → `BD.W-NO-HARDCODED-REF`. The ONE genuinely-new artefact it gestured at (the
declarative `<DockExpand>` skin + the `envelop` topology) lands in §B + §C below.

**Re-point** the two sibling references (`W-DOCK-SCROLL-FISSION`, `W-NO-HARDCODED-REFS`) from
`W-DOCK-HUB-API`'s `proof:dock-hub-api` to `BD.W-DOCK-LINK-API`'s `proof:dock-link` + this
amendment's `proof:dock-envelop` (no orphan gate reference).

---

## B · AUGMENT — `BD.W-DOCK-LINK-API.md` (ADD `<DockExpand>`, the declarative skin)

**`docs/tranches/BD/union/waves/BD.W-DOCK-LINK-API.md`** — AUGMENT (the facade EXISTS; ADD the SFC).

The wave specs `useDockLink(dockRef,{fission,silhouette})` with the four verbs — the GOLDEN's
`useDockHub` verbatim, under the union name, with a HARDENED handle-boundary fence (C8: no
`defineExpose` reach) the GOLDEN omits. KEEP all of it. ADD ONE artefact:

**`src/components/custom/dock/DockExpand.vue`** — the declarative skin (the 90%-markup case, GOLDEN §1.2):

```vue
<GlassDock>
  <DockExpand :topology="'envelop'" v-slot="{ trigger, open, close, phase }">
    <DockIconButton v-bind="trigger" @click="open" />
    <template #surface><Card>…ANY consumer content…</Card></template>
  </DockExpand>
</GlassDock>
```

- It owns the trigger↔surface ref wiring + drives the verb the `topology` prop selects: `bloom`→
  `link.toSurface` (sibling), `envelop`→`link.toSurface` with the dock's OWN `.glass-dock` rect as the
  toRect (the §C portal), `fission`→`link.split`, `receive`→`link.receive`. ZERO per-CONTENT branch
  (card vs sheet vs viz) — `topology` is a consumer-DECLARED prop, NOT live-DOM-ancestry inference
  (DELTA-ASSAY §3 / ch1 R5).
- **a11y COMPOSES the extant overlay substrate — NO re-fork** (ch3 R5, source-verified):
  `src/components/ui/focus-scope/FocusScope.vue` (the shipped focus-trap) + `src/components/ui/drawer/
  Drawer.vue`'s reka `DialogRoot` scrim/dismiss/`modal` (native focus-trap + `aria-hidden` page-occlude
  + the `live-behind` mode). `<DockExpand>` sets `aria-expanded`/`-controls`/`-haspopup` on the trigger,
  moves focus into the surface on open + restores on close (via `FocusScope`), Escape closes — it
  AUTHORS only the ref-wiring + the aria + the trigger↔surface SIBLING topology (ch2 R8: trigger is a
  SIBLING of the surface, never its parent, so focus-restore has a stable target). NO second focus-trap
  in the dock band.
- Published from the `/dock` barrel beside `useDockLink`.

**Gate (AUGMENT `proof:dock-link` with two clauses; born-RED on HEAD — no `<DockExpand>` exists):**
- **C9 — `<DockExpand>` exists ONCE + delegates to `useDockLink`** (call-expression scan): the SFC
  imports + calls `useDockLink` and routes `topology`→verb; a per-CONTENT-kind `if(surface instanceof…)`
  / a `kind:"card"|"sheet"` discriminant REDs (the H1 surface-TYPE-blind floor). Born-RED: no file.
- **C10 — a11y COMPOSES, never re-forks**: `<DockExpand>` imports `FocusScope` + uses the reka
  `Drawer`/`DialogRoot` scrim; a second hand-rolled focus-trap (a `tabindex`-cycling loop / a bespoke
  `keydown` trap) in the dock band REDs (the overfit/DRY-audit bite). Born-RED: the trap does not exist
  yet → assert it lands via `FocusScope`, not a fork.

**π (AUGMENT `tests-visual/dock-link.spec.ts`):** add a `<DockExpand topology="bloom">` open — the
surface blooms FROM the trigger rect (the `useLiquidReveal`/`useElementBloom` 1→0 inversion), focus
moves into the surface + restores on Escape, both modes + the webkit project. Born-RED on HEAD.

---

## C · NEW — `BD.W-DOCK-ENVELOP-PORTAL.md` (the `envelop` goo-tear, RE-INVENTED per the challenges)

**`docs/tranches/BD/union/waves/BD.W-DOCK-ENVELOP-PORTAL.md`** — NEW (the ONE genuinely-new mechanism).

**Band 2 (dock) · depends: `BD.W-FLIP-SPINE` (the `useElementBloom` runner — NOT a 2nd runner) ·
`BD.W-DOCK-LINK-API` (the `<DockExpand>` skin + `link.toSurface`) · `W-DOCK-CORE` (the bounded
`--dock-morph-t` scale-FLIP the envelop CONSUMES, box-INVIOLATE — reads `dimOf`, never edits
`dockMorphContext`) · `BD.W-DOCK-FISSION-NECK-WAIST` (the SIBLING goo neck shape) · `BD.W-MOTION-WEIGHT`/
`BD.W-CARTOON-CASTER` (the booked `--motion-weight`/kinetic cast — NOT re-shipped).**

> Reference implementation: `docs/tranches/BD/greenfield/dock-hub/GOLDEN.md` §2.2 (the four-beat
> eruption) — AS HARDENED by `challenge/{1,2,3}.md` (the spike DISPROVED the as-drawn move; this wave
> builds the RE-INVENTED version). The DELTA-ASSAY §3 table is the binding hardening list.

### The defect / the ask
The dock's `envelop` topology should TEAR its own glass skin and let arbitrary `<DockExpand>` content
ERUPT through a goo membrane as one continuous warm-cream body, then suck it back — full 1940s cartoon
anticipation→stretch→burst→settle. The GOLDEN's de-risk spike (`golden/eruption-spike.html`) PROVES THE
OPPOSITE, live-confirmed (this assay re-measured every defect):
- **R1 (live):** `.goo{filter:url(#golden-goo)}` ANCESTORS the backdrop-filter dock body
  (`gooContainsDock===true`) → isolates the buffer → the field does NOT read through → flat mud-gray (a
  BA.W-NO-GRAY violation in the HEADLINE topology).
- **R2 (live):** dock `width` walks `220→400→580px`, `height` `64→260→456px` per frame — the exact
  `proof:no-layout-animation` violation §4 forbids.
- **R3 (live):** settled ratio `1.272` (non-φ near-square slab; content ~22% of footprint).
- **R4/R5/R6:** flat scale (not volume-preserving), overlap (not a thinned waist), token-warm ≠
  rendered-warm.

### The mechanism (RE-INVENTED — every leg from a SHIPPED primitive, neck-as-SIBLING)
ONE NET-NEW scalar `--dock-portal-t` (0 closed → 1 open) on `springPreset("dock")` (NEVER the literal
`{response:0.32,ζ:0.7}` — ch1 note), driving a four-beat phase map. ZERO new physics core.

1. **The boundary GROWS via the SHIPPED scale-FLIP, NOT width/height (R2 fix).** `envelop` CONSUMES
   `W-DOCK-CORE`'s `--dock-morph-t` scale-morph over a measure-ONCE clipped body (the
   `dock-core/morph-spike.html` technique the shipped dock uses) — `transform`/`scale` only, never an
   animated `width`/`height`/`top`/`left`. The surface lays out ONCE at its settled rect; the dock
   `transform`-scales into it. `proof:no-layout-animation` stays TRUE for envelop.
2. **The goo neck is a SEPARATE SIBLING layer (R1 fix — the SHIPPED `fission-bridge.css` pattern).** The
   metaball neck is a dedicated bridge element painting ONLY the neck membrane fill under `filter:url()`
   with `isolation:isolate` + `color-interpolation-filters:sRGB`, filter gated OFF at rest — NEVER an
   ancestor of the dock/surface backdrop-filter bodies. The bodies stay transmissive warm-cream; the
   neck reads as connective gel. (`DockGooFilter.vue` + `BD.W-DOCK-FISSION-NECK-WAIST` own the shape.)
3. **The waist THINS + a real GAP opens (R5 fix).** The surface pulls AWAY from the dock; the goo
   bridges the gap; the waist thins under `usePointerVelocityField` tension. NOT two coincident bodies.
4. **The squish is volume-preserving for the WHOLE arc (R4 fix).** sx/sy drive from `useLiquidFlex`'s
   tanh law (X·Y≈1 throughout, capped ≤1.08), NOT a uniform shrink with a 70ms garnish.
5. **φ proportion (R3 fix).** the settled rect, the neck waist, the cast offset derive from φ off the
   trigger rect (GOLDEN §3 Aristotelian prose, which the spike ignored).
6. **The four beats** (GOLDEN §2.2): anticipation (door inhales, `useLiquidFlex` squish + cast deepen) →
   stretch/neck (the SIBLING goo tears, overlapping-action lag) → burst (neck snaps + the shipped
   `fission-bridge.css` merge-splash one-shot, EFFECTS trail SPATIAL) → settle (ζ≈0.7 give, secondary
   `--i`-indexed jiggle, kinetic cast snaps home).
7. **Warm-cream rendered, not just token (R6 fix):** an opaque per-mode warm UNDER-layer beneath the
   transmissive scrim so the live field tints the membrane but never grays it.
8. **PRM:** `useElementBloom`'s PRM snap → instant topology swap, zero neck/squish/cast frames, fade-only.

### The gate — `proof:dock-envelop` (born-RED on HEAD → GREEN)
`scripts/proof-dock-envelop.mjs`, `tags:["local","ci"]`. Comment-strips first; exports a pure detector.
- **E1 — `envelop` rides `useElementBloom`, NOT a 2nd runner** (DEFERS to `BD.W-FLIP-SPINE` S1's numeric
  rAF-driver count — NOT a re-authored "countBloomRunners"; ch1 R3/ch2 R6 honesty). A `requestAnimationFrame`
  / `new SpringProgress` / `ElementMorph` constructed in the envelop path REDs. Born-RED: the path is new.
- **E2 — NO layout animation in the envelop body** (the R2 fence): the `.glass-dock` envelop rule writes
  NO animated `width`/`height`/`inline-size`/`top`/`left`; a `width:calc(…var(--dock-portal-t))` REDs.
  Born-RED-bite: a planted `width` calc on the body REDs.
- **E3 — the goo neck is a SIBLING, never an ancestor of the glass** (the R1 fence — the load-bearing
  arm): the detector asserts the `filter:url(#…)` neck element does NOT `.contains()` a `backdrop-filter`
  glass body in the envelop DOM (a structural ancestry assertion, like the spike's `gooContainsDock`).
  Born-RED: the spike's `gooContainsDock===true` is the planted-defect control.
- **E4 — `springPreset("dock")` cited, not the literal numbers** (ch1 note): a `{response:0.32}` /
  `dampingFraction:0.7` literal in the envelop path REDs.
- **E5 — φ proportion**: the settled-rect ratio + the neck waist derive from a φ expression off the
  trigger rect; an arbitrary literal (`220+360t`) REDs.

### The binding π — `pi/dock-hub-eruption.mjs` (GOLDEN §7.4, RE-CUT compositor-only, born-RED)
Clicks a `<DockExpand topology="envelop">` trigger, captures the frame-series, asserts:
- **(a) volume-preserving squish** — `|sx·sy − 1| < 0.12` at t≈0.4 (R4 — the spike's own π would RED its
  own mechanism; this passes only after the `useLiquidFlex` re-author).
- **(b) the boundary GROWS via transform** — the `.glass-dock` rect grows ≥1.3× WITHOUT an animated
  layout property (R2); the goo waist reads at the tear midpoint with `neckWaistRatio<0.5 AND gap>0` (R5).
- **(c) RENDERED membrane chroma over the live field** — sample the open-envelope center pixel's oklab
  CHROMA (the live-π-oklab paint-arm parses `oklch()` — REUSE it), `chroma > C_floor` AND not-grey-by-L,
  BOTH modes (R1/R6 — the token-only claim the spike falsified; this is the missing de-risk).
- **(d) the cartoon cast TRAVELS** — the `::after`/`.cartoon-cast` caster offset is non-static mid-flight.
- **(e) bidirectional + interruptible** — a mid-open re-grab joins the same trajectory; close runs the
  spring reversed with NO overshoot-past-gone; BOTH engines (chromium + webkit).
- **born-RED on a flat/instant/fade-only entrance** + the `proof:ba-gestalt` dock verdict on a fresh BD
  capture (arbitrary content via a clean API, no app facility, perfected glass, cartoon punch).

### Fences
- **No 2nd runner / no 2nd spring** — rides `useElementBloom` + `springPreset("dock")` (E1/E4).
- **Neck-as-SIBLING, never ancestor-filter-over-glass** (E3 — the R1 hard precept).
- **Box-INVIOLATE** — reads `dockMorphContext.dimOf`, never edits the morph context (W-DOCK-CORE fence).
- **The anti-pattern this must NOT become:** the spike's width/height layout-animation (E2), the
  ancestor-goo backdrop kill (E3), the flat-scale non-squish (π-a), or a token-only warm claim (π-c).

---

## D · EXTEND — `BD.W-NO-HARDCODED-REF.md` (the enum excision; the demo rebuild)

**`docs/tranches/BD/union/waves/BD.W-NO-HARDCODED-REF.md`** — EXTEND NC5 + NC4 (the census already
comment-strips + scopes to artefact-names + structural-enum-exempts; this ADDS the dock-hub targets).

The wave's NC5 already kills `silhouette('media')` + `DOCK_SPLIT_SIGNATURES.media` in `src/`. EXTEND it
to the full DELTA-ASSAY §2.1 enum set (born-RED, source-confirmed at the cited lines):
- `useDockFission.ts:56` `DockSplitContext="search"|"media"|"nav"` → re-type over a `vector`-keyed
  `MorphSignature` SHAPE (the motion DATA is already generic).
- `useDockShellProps.ts:198` `splitContext?:"search"|"media"|"nav"` → DELETE the prop (the shell takes a
  `MorphSignature` / a motion-named preset).
- `GlassDock.vue:408,413` `if(ctx==="nav")` / `if(ctx==="media")dy*=0.25` + `:329,334` the app-key
  lookup → branch on the SIGNATURE's `vector`/scalar, never the app name.
- `useDockContextSilhouette.ts:68` `DockSilhouetteKind="…|search"` → DELETE the dead `"search"` arm
  (typed, never built — confirmed live).
- **EXEMPT (ch1 R4):** `DockSection.vue:65` `s.kind==="nav"` + `constants.ts` `DockSectionKind=
  "rail-core"|"section"|"nav"` are LEGITIMATE structural layout enums (the trailing nav-arrows group),
  NOT app-facility names — explicitly classified exempt in the census so NC1 does not false-flag them.

**NC5 born-RED extension:** the `splitContext` shell prop + the `ctx===` branches + the dead `"search"`
silhouette arm RED today; GREEN only after the re-type. The name-census stays NC1's comment-stripped
artefact-name grep; the dock-hub adds ONLY a CALL-EXPRESSION scan for the public verb signatures
(deferred to `proof:dock-link` H1/H3, NOT a bare keyword grep — ch1 R4 imprecision fix).

**The demo rebuild (EXTEND NC4 — the ≥3-distinct-surface H3 bar):**
- `demo/stories/dock/liquid-playground.vue` — rebuild around ONE `<DockExpand topology>` opening
  {`<Card>`, `<Drawer>`/sheet, `<Popover>`, a viz `<Aurora>`/`<VizStudio>` configurator}, each via
  `link.toSurface` with ZERO per-kind branch (call-expression scanned). PURGE the `Search→sheet`/
  `Split→islands`/`Now Playing` mode buttons + the "Maps Places / Apple Music / Dynamic-Island / One
  generalized useLiquidMorph engine" prose (the `useLiquidMorph` name dies with `BD.W-SPIKE-DELETE`) +
  the "Costco"/"Winston-Salem" data (generic placeholders).
- `demo/stories/dock/dock-gallery.vue` + `examples/*` — replace the cloned-app SFCs (`AppleMusic`/
  `DynamicIslandCall`/`Notification`/`VolumeHUD`/`Spotlight`/`TabBar`/`AppSwitcher`) with generic glass
  precepts (`MediaSurface`/`CallIsland`/`Toast`/`LevelHUD`/`CommandSurface`/`NavStrip`/`GridSurface` —
  neutral labels, oklch hues, a `fieldHue` prop, no brand). `{label:"Maps"}` → neutral panel labels.

These are born-RED on HEAD (live-confirmed: `/dock/liquid-playground` renders the three mode buttons +
brand prose; `/dock/dock-gallery` is the Apple-app museum) → GREEN at the rebuild. NC4 (no trademark) +
the H3 ≥3-distinct-surface call-expression scan are the binding bites.

---

## E · NO-OP / SUBSUME (the reconciliation — no engine fork, no dup)

- **`BD.W-DOCK-SUBDOCK.md`** — NO-OP. The recursion (a hub expands into a hub) is FREE:
  `link.toSurface(control, anotherGlassDockRef)` where the surface is a `<GlassDock>` (GOLDEN §1.3
  lens-b). The persistent-piece accessory re-seat the wave specs is unchanged; it inherits the
  `<DockExpand>` skin. No new law.
- **`W-DOCK-SCROLL-FISSION.md` / `BD.W-CARD-SHEET-EXPAND.md`** — NO-OP (already hub INSTANCES).
  scroll-fission wires `useScrollChrome`→`link.split`; card-sheet-expand is already a `link.toSurface`
  consumer. Re-point their `W-DOCK-HUB-API` mention to `BD.W-DOCK-LINK-API` (§A).
- **`BD.W-FLIP-SPINE.md`** — UNCHANGED. The dock-hub RIDES `useElementBloom`; it mints no runner. The
  GOLDEN's "collapse 4 engines" IS this wave's 4→1 fold (the honest count is 4 rAF leaves, not 4 FLIP
  engines + the `useLiquidMorph` non-rAF spike — ch1 R3/ch2 R6, already stated in FLIP-SPINE).
- **`BD.W-DOCK-FISSION-NECK-WAIST.md`** (from the dock-fission greenfield) — DEPEND. The envelop's
  SIBLING goo neck reuses its hourglass `path()` waist; no second neck.

**Net touch:** EXCISE 1 (`W-DOCK-HUB-API`) · AUGMENT 2 (`BD.W-DOCK-LINK-API` +`<DockExpand>`,
`BD.W-NO-HARDCODED-REF` enum+demo) · NEW 1 (`BD.W-DOCK-ENVELOP-PORTAL`) · NO-OP/re-point 4. Two
artefacts genuinely minted: `DockExpand.vue` + the `envelop` topology. Everything else composes booked
spine. No dual-path, no legacy.
