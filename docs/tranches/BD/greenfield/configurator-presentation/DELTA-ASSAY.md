# DELTA-ASSAY — the CONFIGURATOR + preset GALLERY (golden vs current vs the extant 116-wave set)

> The golden-vs-current delta + the UNION path. Live-inspected on `/substrates/aurora`
> (Chrome :5173, 1440×900, BOTH modes), source-verified on disk, reconciled against the
> THREE shipped configurator waves already in `docs/tranches/BD/union/waves/`
> (`BD.W-CONFIG-GALLERY-DOCK`, `BD.W-PRESET-RENDER`, `BD.W-VIZ-CONFIGURATOR`).
>
> **Net verdict: REFINE-dominant + ONE genuinely-broken RE-INVENT (the thumbnail bake's
> ROOT CAUSE is mis-diagnosed by BOTH the golden AND the extant `BD.W-PRESET-RENDER`) +
> ONE NET-NEW (the cartoon preset-deal, unbooked). The gestalt is already 75%-booked by the
> extant waves; this item's real work is correcting ONE root-cause + folding the golden's
> hardenings + authoring the deal. ~74% converged.**

---

## 0 · The load-bearing reconciliation — the extant waves ALREADY own the gestalt

The golden (and its §9 self-amendment) names `BD.W-CONFIG-GALLERY-DEAL` (new) + an amend of
`BC.W-VIZ-CONFIGURATOR-SUITE`. **Neither exact name is the on-disk reality.** The BD union
set already ships THREE configurator waves that cover most of the golden's gestalt:

| Golden section | Already owned by | Reality |
|---|---|---|
| §2.1 gallery up-top + full-bleed + aside widen | **`BD.W-CONFIG-GALLERY-DOCK`** arm 2 + arm 3 (`asideWidth` widen) | BOOKED |
| §2.2 gallery scroll-collapses to a core | **`BD.W-CONFIG-GALLERY-DOCK`** arm 3 (collapse to a `<GlassDock>` hub pill) | BOOKED — but a DIFFERENT mechanism (see §3) |
| §2.4 DRY chassis (one gallery, all studios) | **`BD.W-CONFIG-GALLERY-DOCK`** arm 1 (route 5 viz) + **`BD.W-VIZ-CONFIGURATOR`** (3 dot studios) | BOOKED (8 studios, ONE `<VizStudio>`) |
| §4 thumbnails RENDER | **`BD.W-PRESET-RENDER`** | BOOKED — but the ROOT CAUSE is WRONG (see §2) |
| §3 the cartoon preset-DEAL | — | **UNBOOKED** (genuinely new authoring) |
| §5 warm-glass tile re-skin + dark-rail re-floor | — | **UNBOOKED** (no wave warms the tile/aside) |

So this is NOT a fresh design — it is a **DELTA over three booked waves**: correct ONE
root-cause, fold the golden+challenge hardenings, author the ONE missing deal, and add the
warm-glass arm. The golden's "amend `BC.W-VIZ-CONFIGURATOR-SUITE`" framing is obsolete — the
chassis lift is `BD.W-CONFIG-GALLERY-DOCK`, which already exists and already does it.

---

## 1 · The live born-RED (re-measured on HEAD — what is actually red)

Measured live `/substrates/aurora`, 1440×900, BOTH modes:

| # | Defect | Live measurement | Verdict |
|---|---|---|---|
| 1 | Gallery CRAMPED + rail-trapped | preset row **335px wide** inside the 360px `.configurator-aside`, scrollW **2752** → 2 of 13 visible; row `y:886` BELOW stage `y:854`, inside the aside | **RED — true.** Owned by `BD.W-CONFIG-GALLERY-DOCK` C3/C5 |
| 2 | Thumbnails 100% DEAD | **13 skeletons, 0 `<img>`**; console: `[Aurora] thumbnail bake aborted: Error: [useWebGPUCanvas] device not acquired` (msgid=22) | **RED — true.** Owned by `BD.W-PRESET-RENDER` P1/P2 — **but the ROOT CAUSE is mis-traced (see §2)** |
| 3 | APPLY works, RENDER dead | `aria-pressed` flips; `type="button"` ALREADY present (challenge 1+2 confirmed); the dead skeleton gives no preview | **PARTIAL.** Apply is GREEN (KEEP); `@click.stop` guard is a near-non-defect (already a button) |
| 4 | "Gray, not glass" | light tile `rgb(253,245,236)` chroma~17, dark tile `rgb(53,42,34)` chroma~19 — **WARM, not gray**; BOTH `backdrop-filter:none` (OPAQUE, no §3 read-through) | **RED, but MIS-NAMED.** The defect is OPACITY / no transmission, NOT hue (all 3 challenges concur) |
| 5 | No DRY pattern (6 idioms) | aurora→`PresetPickerRow`, blob→own row, others→none/chip | **RED — true.** Owned by `BD.W-CONFIG-GALLERY-DOCK` arm 1 + `BD.W-VIZ-CONFIGURATOR` |
| 6 | No cartoon deal (static hover only) | the tile carries a `hover:-translate` nudge + `shadow-cartoon` only | **RED — true. UNBOOKED.** The golden §3 boldest move |

Document does NOT scroll (`docSH==winH==806`); only `.demo-main-scroller` scrolls (challenge
2 R-B). This is load-bearing for §3 below.

---

## 2 · THE BROKEN PIECE (RE-INVENT) — the thumbnail root-cause is WRONG in BOTH the golden AND `BD.W-PRESET-RENDER`

This is the single most important finding of the assay. **Three independent diagnoses all
miss the actual failure, in different directions:**

1. **Golden §1/§4.2** claims the failure is an init-ORDER bug: `mode:"capture"` → `eager` →
   a SYNCHRONOUS constructor arm → WebGPU throws `device not acquired` BEFORE
   `await armAsync()` (L90) is reached. **FALSE.** Source-verified (challenge 3 R-top,
   re-confirmed by me on disk):
   - `runtime.ts:462` — `if (options.mode !== "capture" && shouldInitEagerly(options)) { armRuntime(); }` — **the sync constructor arm is EXPLICITLY GATED OFF for capture mode.**
   - `usePresetThumbnails.ts:90` **already** `await aurora.armAsync()` — the exact "RIGHT" fix the golden §4.2 prescribes is ALREADY SHIPPED.
   - So the golden's init-order fix is a **no-op** (fixes a bug that is already fixed).

2. **`BD.W-PRESET-RENDER`** claims the failure is a WebGPU swap-chain READBACK race:
   `toDataURL` after `device.queue.submit()` presents → empty buffer; prescribes a
   WebGL2-pin / owned-target / yield-collapse. **ALSO not the live failure.** The console
   log `[Aurora] thumbnail bake aborted` fires from the `catch` at `usePresetThumbnails.ts:77-80`
   — the one wrapping the `createAurora(…,{mode:"capture"})` CALL — i.e. the throw lands at
   `createAurora`, **before `armAsync()` and before any `renderAt`/`toDataURL`**. The
   readback loop (L91-97) is **never reached**. PRESET-RENDER's readback fix would land on a
   loop that never runs.

3. **THE ACTUAL FAILURE (live-confirmed):** the WebGPU **device cannot be acquired at all**
   in this host (the validation-probe / SwiftShader / lying-adapter class `runtime.ts:138-148`
   itself describes). `armAsync` → `buildContext` → `useWebGPUCanvas.ts` `if (!device) throw
   "device not acquired"`. With the sync-arm gated off, this throw genuinely surfaces inside
   the `armAsync()` chain (or the createAurora call's own probe), and the `catch` aborts the
   ENTIRE bake. **No init reorder and no readback fix make a device appear.**

**THE FIX THAT SURVIVES (the shipped primitive neither doc cites):** the gallery thumbnail
must NOT depend on a GL device at all. Use the **shipped `auroraFallbackGround(config)`**
(`src/components/custom/aurora/composables/auroraFallbackGround.ts`) — a device-free field
built from the SAME palette+nuclei math, already consumed by `Aurora.vue` for the `"css"`
substrate. It is per-preset-distinct, ≥2-hue, deterministic, needs ZERO WebGL/WebGPU. This
makes the thumbnail the **default** path (not "progressive enhancement"), and a real GL bake
(WebGL2-pin per PRESET-RENDER) becomes a TRUE-optional Tier-1 that must prove a real
device-acquire delta on a hardware host or be CUT (KISS — a tier nobody can light up is dead
code). **The clean break (no-backwards-compat law): DELETE the eager `mode:"capture"`
offscreen bake as the default; `auroraFallbackGround` is the floor.**

**Cross-engine caveat (challenges 1/2/3 R-A unanimous, FOLDED):** `auroraFallbackGround`'s
browser path is a 2D-canvas `rasterizeField` → `toDataURL("image/png")` (L291/L361); the SSR
branch (layered radial-gradient) only fires when `document === "undefined"` (L333). So the
golden's "byte-identical Chrome ⇄ Safari" is FALSE for the shipping path (the spike proved
the node/SSR branch only). **Correction:** claim "**device-free + visually-equivalent +
never-blank**" (true + sufficient — a thumbnail does not need pixel-equality), and either
(a) the gate reads a perceptual ΔE / chroma-floor on the well in BOTH engines, or (b) force
the SSR layered-gradient branch in-browser for the gallery (genuinely compositor-only +
byte-identical for the gradient string, zero `toDataURL`). The never-blank floor is the win;
the adjective was too strong.

---

## 3 · THE COLLAPSE MECHANISM — the extant wave is MORE correct than the golden (KEEP it)

The golden §2.2 drives the gallery collapse off **`useScrollChrome`** (scroll-down past
`collapseRangePx`). **Challenge 2 R-B proved live this CANNOT fire** — the studio does not
scroll (`docSH==winH`); only the outer `.demo-main-scroller` scrolls the whole studio away.
`useScrollChrome` ramps `collapseT` off a scroll delta that does not exist on a
`position:absolute` pinned island over a non-scrolling stage.

**The extant `BD.W-CONFIG-GALLERY-DOCK` arm 3 already avoids this trap** — it drives the
collapse off the SHIPPED `<GlassDock>` + `useDockState` (hover-out / a collapse affordance /
the `useDockLink` hub), NOT a scroll. **This is the fitter survivor — KEEP the GALLERY-DOCK
mechanism, DROP the golden's `useScrollChrome` collapse.** The collapse is an explicit
toggle / hover / focus-mode affordance, exactly as challenge 2 R-B prescribes. The golden's
`useScrollChrome` citation is the over-claim; the extant wave's `useDockState` is the truth.

(The re-erupt is the dock's own `useDockState` expand morph — compositor-only, box-inviolate,
`proof:dock-morph-family`. `useLiquidReveal` is correct ONLY for the re-erupt-from-core bloom
if a source-rect FLIP is wanted on top of the dock morph — optional polish, not the spine.)

---

## 4 · THE DEAL (NET-NEW) — corrected to the RIGHT engines (challenge 1 R1 FOLDED)

The golden §3 four-beat cartoon deal (anticipate → arc → goo-merge → settle on
`--gallery-deal-t`) is genuinely UNBOOKED and is the item's only net-new authoring. Two
corrections fold in:

- **R1 (challenge 1, FATAL to §3's "100% composed / zero new physics"):** the golden credits
  the tile→stage flight to `useLiquidReveal`. Its module header EXPLICITLY says it reveals a
  surface onto its OWN settled rect FROM a trigger — the WRONG direction for a tile flying to
  a DIFFERENT element. The forward a→b FLIP needs **`flipShared`** (it SHIPS — surfaced via
  `src/composables/motion/suite.ts` + consumed in `useLiquidReveal.ts`), which the golden
  never cites. **Re-cite:** `flipShared` = the tile→stage flight; `useLiquidReveal` = the
  re-erupt-from-core ONLY. And the ARC (non-straight path) is a genuinely-NEW arced-translate
  keyer on `--gallery-deal-t` — name it as the ONE new piece, spike it, drop "zero new
  physics core."
- **R-C (challenge 2, the merge climax is physically overstated):** "the tile's metaball neck
  snaps into the stage CANVAS" is not achievable — `DockGooFilter`'s SVG `filter:url()`
  operates on the alpha of sibling DOM in the SAME filter region; it CANNOT weld a CSS tile
  to the opaque pixels of an independent WebGL/WebGPU canvas. **Scope the goo neck to DOM↔DOM
  seams** (gallery collapse/erupt, tile↔core) where the filter region contains both alphas;
  the tile→stage climax ships a FLIP + GL config cross-fade + a merge-SPLASH **overlay** (a
  DOM element over the stage that DOES share the filter region — the `BD.W-JUBILANCE-WIRE`
  coalesce). Stop describing it as a tile→canvas metaball neck.

Component engines all ship + are booked: `W-LIQUID-ENTRANCE-GENERAL` (the rail/tile
entrance), `W-DOCK-SCROLL-FISSION` + `fission-bridge.css` (the DOM-seam necks),
`BD.W-JUBILANCE-WIRE` (the merge-splash), `useLiquidFlex` (the squish), `DOCK_SPRING`
(`src/components/custom/dock/constants.ts`, NOT `useLiquidMorph.ts` — golden §0 path slip).

---

## 5 · THE WARM-GLASS RE-SKIN (REFINE, unbooked) — the §3-field defect

The tile is warm-but-OPAQUE (`backdrop-filter:none`, opaque `bg-card`), so the §3 colourful
field does NOT read through, BOTH modes. No extant wave warms/transmits the tile or re-floors
the aside. The fix: re-skin the tile from the opaque `bg-card` plate to the warm-cream
six-layer transmissive composite (`.glass-floating` tier), the thumbnail well as the §3 field
(`auroraFallbackGround`), the collapsed core capsule as `.glass-deep` over the vibrant field;
re-floor the dark aside off `rgb(53,42,34)` toward the warm composite. **R5 must assert
TRANSMISSION (composited background-alpha < 1 + §3 read-through), NOT `!isGrey`** (all 3
challenges: the tile already clears any grey-chroma floor; an `!isGrey` gate would GREEN the
opaque plate). This consumes the BA.W-NO-GRAY warm-floor + the `.glass-floating`/`.glass-deep`
material — no new material minted.

---

## 6 · THE SURVIVAL-OF-THE-FITTEST LEDGER

**KEEP (fit):**
- `useConfiguratorState` apply path (GREEN live — must STAY green) · `<FadingScroll axis=x>` ·
  the `<ConfiguratorLayer>`/`<ConfiguratorRow>`/`<ColorSwatch>` controls anatomy ·
  `<GlassDock>` · `useDockState`/`useDockLink` · `useLiquidFlex` · `flipShared` ·
  `DockGooFilter`/`fission-bridge.css` · `DOCK_SPRING` · `auroraFallbackGround` (shipped) · the
  `VizStudio` chassis · the inspector-right idiom on desktop · `type="button"` (already there).
- **The extant `BD.W-CONFIG-GALLERY-DOCK` collapse mechanism (`useDockState`, NOT
  `useScrollChrome`) — fitter than the golden's scroll-collapse.**

**REFINE (weak):**
- the OPAQUE tile/aside → warm-cream transmissive + §3 read-through (UNBOOKED — add an arm).
- the cramped 335px gallery → up-top full-bleed dock (BOOKED — `GALLERY-DOCK`, fold the
  golden's φ proportion + warm-glass).
- the 6 divergent idioms → ONE `<VizStudio>` gallery (BOOKED — `GALLERY-DOCK` + `VIZ-CONFIGURATOR`).
- the static hover → the cartoon deal (NET-NEW — author it on `flipShared`+arc-keyer).

**RE-INVENT (broken):**
- the thumbnail bake's ROOT CAUSE — NOT init-order (golden), NOT readback-race
  (`BD.W-PRESET-RENDER`), but **device-acquire REJECTION** → the device-free `auroraFallbackGround`
  Tier-0 is THE fix (a clean break: DELETE the eager `mode:"capture"` default; a real GL bake
  becomes a true-optional Tier-1 or is CUT). **This re-roots `BD.W-PRESET-RENDER`.**

---

## 7 · THE UNION PATH (deft, KISS/DRY, no legacy, no dual-path)

1. **AUGMENT `BD.W-PRESET-RENDER`** — RE-ROOT the diagnosis: the live failure is
   device-acquire REJECTION (`device not acquired` at the `createAurora` call), NOT a readback
   race; the default thumbnail is the device-free `auroraFallbackGround` Tier-0 (DELETE the
   eager `mode:"capture"` bake); a WebGL2-pin GL bake is a TRUE-optional Tier-1 (prove a real
   device delta on a hardware host or CUT). Re-base the gate: P1 reads a device-free chroma/ΔE
   floor in BOTH engines (perceptual, not byte); P3/P4 (the readback-shape fence) demote to the
   Tier-1-only arm. The "byte-identical" claim → "device-free + visually-equivalent +
   never-blank."
2. **AUGMENT `BD.W-CONFIG-GALLERY-DOCK`** — fold the golden hardenings: (a) the warm-glass
   tile re-skin + dark-aside re-floor + the §3-read-through R5 (TRANSMISSION-asserting, NOT
   `!isGrey`); (b) the φ-proportion arm (φ-tall tile, core-width = active ÷ φ); (c) confirm the
   collapse is `useDockState` (NOT `useScrollChrome` — already correct, just fence it); (d)
   the a11y pattern fence: ONE pattern — toggle-button `aria-pressed` + `role="group"`
   `aria-label="Presets"` (NOT `role="tab"`+`aria-pressed`, an ARIA contradiction; `GlassDock`
   has no tablist — challenge 1 R2); (e) the gate selectors made null-safe (clean RED, not a
   throw) with HEAD-baseline selectors (challenge 1 R4); (f) the consumer-count C1 already
   asserts ≥5 — keep the BEHAVIOUR arm (a second studio's tiles render device-free + collapse),
   not a bare call-site count (challenge 3 R6).
3. **NEW `BD.W-CONFIG-GALLERY-DEAL`** — the ONLY genuinely new authoring: the `--gallery-deal-t`
   four-beat cartoon deal on **`flipShared`** (tile→stage flight) + the NEW arced-translate
   keyer (named + spiked) + `fission-bridge.css` DOM-seam necks + `useLiquidFlex` squish +
   `BD.W-JUBILANCE-WIRE` merge-splash overlay (NOT a tile→canvas metaball neck). Born-RED on the
   flat ring-flip; a motion frame-series π (anticipate-squish → arc-travel → splash-trails →
   settle), PRM instant-snap.

NO dual path: the gallery default thumbnail is Tier-0 device-free for EVERY studio (the
`<VizStudio>` chassis-once lever); the deal rides the gallery component, generalized. The
extant wave set is reused — only ONE new wave + two augments.
