# Lens A — the DOCK-AS-HUB facility, greenfield (PURE iOS-27 fidelity)

**Lens** the most faithful, audacious iOS-27 Liquid-Glass interpretation · **Branch** `prototype/liquid-dock` · **Method** live-interrogated `/dock/liquid-playground` (both modes, chrome-devtools) + read `GlassDock.vue`, the four shipped bloom engines (`useLiquidReveal` / `useLiquidMorph` / `useBloomUp` / `useDockCtaReceive`), `useDockFission` + `DOCK_SPLIT_SIGNATURES`, `useDockContextSilhouette`, the W-DOCK-HUB-API wave, the `dock-hub-generality` critique, the IOS27-REFERENCE, design.md §Dock. SOURCE-VERIFIED every cited symbol (grep). Zero `src/` edits — design only.

---

## 0 · The live verdict (what is actually on disk, source-verified)

**The half that GENERALIZES (keep, refine):**
- `useLiquidReveal(surface, {trigger, preset, blur})` (`src/composables/motion/useLiquidReveal.ts:120`) is genuinely **surface-type-blind** — it takes ANY `Ref<HTMLElement>` + a trigger rect + a spring preset and blooms scale+fade+blur-settle from the source rect. It never inspects what the surface IS. This is the agnostic spine.
- `GlassDock`'s shell + slots (`#default`/`#collapsed`/`#persistent`/`#rail`/`#split`/`#search`) hardcode no surface TYPE — they are content-blind regions.
- The dock material is **warm** in both modes (live-measured: light `srgb(0.944 0.903 0.865 / .52)`, dark `srgb(0.350 0.295 0.249 / .56)` — the BA.W-NO-GRAY floor holds; never gray), `backdrop blur(9px) saturate(1.4)`, `radius 9999px`.

**The overfit that is REAL (the user's literal complaint, live-confirmed):**
1. **The demo IS the hardcoding.** `/dock/liquid-playground` live-reads "EXPANDS into a **Maps** Places sheet … the full **Apple Music** player" and ships three MODE buttons — `Search → sheet` / `Split → islands` / `Now Playing` — i.e. three *named app facilities*, each a bespoke code path. `places[]`/`recents[]` carry "Winston-Salem", "Costco Wholesale", a barber. `AppSwitcher.vue:25` hardcodes `{ label: "Maps" }`. These are exactly the `maps`/`album` overfit the user named (`grep` hits enumerated in §5).
2. **The engines carry app-domain ENUMS one level down.** `useDockFission` types `DockSplitContext = "search" | "media" | "nav"` (`useDockFission.ts:56`) and freezes `DOCK_SPLIT_SIGNATURES` under those app-names — the *motion* (`vector: radial|lateral|inward-merge`, `neckHold`, `squishPeak`) is generic, but the KEYS are overfit. `useDockContextSilhouette` types `DockSilhouetteKind = "bar"|"bar+pill"|"split"|"search"` (one arm `"search"` is a DEAD never-built member). A consumer wanting a radial burst that is not "search" must lie.
3. **FOUR bloom engines, ONE substrate — a DRY fracture.** `useLiquidReveal` (source-rect bloom), `useLiquidMorph` (reserved-footprint expand/collapse + split/union), `useBloomUp` (pill→sheet shared-element FLIP), `useDockCtaReceive` (external→dock inverse) ALL compose the **same** kf `ElementMorph` + `springTimingFunction` substrate (verified in `motion/index.ts:35-66`). Four public verbs over one FLIP runner is the fracture the hub must heal.
4. **There is no `useDockLink` / `useDockExpand` on disk.** The critique referenced a *planned* API. **The hub facility is UNBUILT.** This is greenfield in the truest sense — I design the spine, not patch a facade.

---

## 1 · The core idea — `useDockHub`: the dock is a HUB whose only vocabulary is GEOMETRY + a SLOT

The dock is **one positioned glass plate that hosts controls and, on a control's command, MORPHS its own boundary to envelop arbitrary consumer content** — then morphs back. The library owns four nouns and nothing else: **the source rect, the target rect, the glass chrome, the a11y contract.** It owns ZERO surface semantics. There is no "search mode", no "player mode", no "maps". There is a control, a slot, and a morph between two rectangles.

The hub exposes **ONE verb family** keyed on **TOPOLOGY**, never on app-domain:

```ts
type DockHubTopology =
  | "envelop"   // the dock's OWN boundary grows to contain the target (the boundary IS the surface — drawer/panel/full-sheet)
  | "bloom"     // a SEPARATE surface blooms FROM the control's rect, dock stays put (popover/card/sheet over a live-behind scrim)
  | "fission"   // the dock CARVES — surviving controls detach along a geometry signature into a sibling island (sub-dock)
  | "receive";  // the INVERSE — an external element flies INTO a dock control (CTA hand-off)

interface DockHubReturn {
  open(target: Ref<HTMLElement|null>, opts?: { from?: Ref<HTMLElement|null>; signature?: MorphSignature }): void;
  close(): void;
  toggle(target: Ref<HTMLElement|null>, opts?): void;
  topology: Ref<DockHubTopology>;
  phase: Ref<"rest"|"opening"|"open"|"closing">;
}
```

`open(target, { from })` takes **two element refs and a motion shape** — that is the entire contract. The `target` is whatever the consumer hands it: a `<Card>`, a `<Drawer>`, a `<Popover>`, a `<VizStudio>` configurator, *another `<GlassDock>`*. The verb has **zero per-kind branch** — it measures `from.rect → target.rect`, drives ONE spring, and applies the topology's geometry. The `MorphSignature` is a SHAPE (`{ vector, neckHold, squishPeak, blur, preset }`), and the named presets (`DOCK_SPLIT_SIGNATURES.media` etc.) survive ONLY as **presets-in-consumers convenience constants** — never as the verb's required type. This is the H2 fix from the critique, made the spine rather than a patch.

**The declarative skin** — `<DockExpand>`, a thin wrapper a consumer drops around a dock control:

```vue
<GlassDock>
  <DockExpand topology="bloom" v-slot="{ trigger, open, close, phase }">
    <DockIconButton v-bind="trigger" @click="open" />
    <template #surface>
      <Card>…ANY consumer content…</Card>   <!-- the library never sees inside -->
    </template>
  </DockExpand>
</GlassDock>
```

`<DockExpand>` owns the trigger↔surface ref wiring, `aria-expanded`/`aria-controls`, focus-move-in-and-restore, Escape-to-close, and the live-behind scrim — the consumer owns the content shape, full stop.

---

## 2 · The single boldest move — **THE ONE MORPH RUNNER: collapse all four bloom engines into `useElementMorph`, and make the dock boundary itself a morph target**

The four shipped bloom engines (`useLiquidReveal`/`useLiquidMorph`/`useBloomUp`/`useDockCtaReceive`) all wrap the same kf `ElementMorph`. **Collapse them into ONE primitive — `useElementMorph(opts) → { morphTo(fromRect, toRect, signature), settle, reverse }` — a single FLIP/spring runner with no surface semantics**, and let the FOUR public verbs become thin topology adapters over it (the survival-of-the-fittest cut: the *fittest* engine, `useLiquidReveal`'s source-rect inversion, is the kept core; the other three are re-expressed as parameter choices — `bloom` = reveal as-is, `envelop` = morph the dock's own `.glass-dock` border-box rect as the `toRect`, `fission` = N-piece morph with neck signature, `receive` = morph reversed `toRect→fromRect`). ONE rAF runner across the entire dock (the FLIP-SPINE one-runner fence the critique's H5 demands).

The **audacious** consequence: because there is now ONE runner that morphs *any rect to any rect*, the dock's OWN boundary becomes a legal morph target. `topology="envelop"` morphs `.glass-dock`'s border-box to the target's settled rect — **the dock plate literally GROWS into the panel** (the iOS-27 T1 dock bi-directional morph + T5 sheet bloom-up unified), riding the existing `--dock-morph-t` spring (box-INVIOLATE — it reads `dockMorphContext.dimOf` for the axis, does not edit it). The boundary-as-surface is the move no demo currently does generically: today `useBloomUp` keeps the pill pill-sized and blooms a *separate* sheet; the hub adds the case where **the dock IS the sheet** — one continuous glass body, no second plate, the most liquid read.

> **The boldest move in one line:** *kill the four-bloom-engine fracture down to ONE `useElementMorph` runner, and promote the dock's own border-box to a first-class morph target so the dock can ENVELOP arbitrary content as one continuous liquid glass body — not just bloom a separate card beside it.*

---

## 3 · The motion spec (iOS-27 liquid-weight, both engines)

- **Spring:** ONE register — the shipped `DOCK_SPRING {response 0.32, ζ 0.7}` for envelop/fission (weighty, a hair of give, low-overshoot exit per the IOS27 T1 bar); `bouncy` preset for `bloom` (the source-rect grace). No second clock.
- **Squish/grace (T10):** every open carries the `useLiquidFlex` volume-preserving squish — the surface scales **≈0.88 → 1** with X·Y≈1 (real deformation, not a flat 0.95 scale), fade-coupled, spring overshoot then settle. The dismiss is the SQUISH+FADE inverse with **no overshoot-past-gone** (the `conceal`/`--ease-out` close leg already in `useLiquidReveal`).
- **Morph-MORE-on-move:** while a drag-driven open is in flight (the dock already arms `dragOrigin` + `DRAG_SPLIT_THRESHOLD_PX`), the neck/boundary stretches with pull velocity (`usePointerVelocityField` seam-tension, capped LOW) — inertia, not a tight snap.
- **Fission goo (T2):** the `envelop`/`bloom` topologies are gel-free; `fission` mounts the Safari-safe static-SVG `DockGooFilter` (sRGB `feColorMatrix`, regular `filter:url()`, NO `backdrop-filter:url`) so the neck **stretches→thins→snaps** at the split midpoint — real metaball waist, never a fade-disconnect. Both engines verified (the `DockGooFilter` already ships Safari-first).
- **Live-behind scrim (T5/T6):** the `bloom` topology paints a **warm brown-tinted transmissive** scrim (the page reads through, never flat black); `envelop` couples the boundary fraction into `--glass-level` so a full-envelop sheet ramps translucent→near-opaque (the T6 detent-glass coupling rides the SAME machinery — the hub does not re-invent it, it consumes it).

---

## 4 · How it composes EXISTING primitives (DEFT, KISS, a UNION not a fork)

| Hub need | Existing primitive consumed | New code |
|---|---|---|
| the ONE morph runner | the kf `ElementMorph` + `springTimingFunction` (already the substrate of all 4) | `useElementMorph` — the unification, the only real BUILD |
| `bloom` topology | `useLiquidReveal` (kept AS the core) | thin adapter |
| `envelop` topology | `dockMorphContext` / `--dock-morph-t` (box-INVIOLATE) + `--glass-level` coupling | the boundary-as-target adapter |
| `fission` topology | `useDockFission` + `DockGooFilter` + `DOCK_SPLIT_SIGNATURES` (demoted to presets) | re-type `split(signature: MorphSignature)` |
| `receive` topology | `useDockCtaReceive` (reversed `useElementMorph`) | thin adapter |
| glass chrome | `.glass-dock` tiers, `useGlassBackdropLuminance` (wired ON) | none |
| a11y | `useDockClickIntegrity` (mid-morph tap guard, ships) | focus-move + aria on `<DockExpand>` |
| the sub-dock IS a dock | `<GlassDock>` recursively (the island slot is just another dock) | none |

The four old verbs are RETAINED as the public API surface (no breaking churn for the gestalt) but re-implemented over the one runner — `useLiquidMorph`'s duplicate FLIP loop is DELETED (the DRY close H5 names). No legacy aliases (the no-backwards-compat law).

---

## 5 · The de-overfit excision (the `proof:no-hardcoded-refs` arm — every hit)

**`src/` is CLEAN** of app-facility names (grep confirmed — only "brand"/"rail-core" as generic concept words in `DockSection`/`constants.ts`, which are glass precepts, not app names). The overfit is entirely in **demo + the engine enums**:

| Hit | File:line | Excision |
|---|---|---|
| `DockSplitContext = "search"\|"media"\|"nav"` | `useDockFission.ts:56` | re-type over a `vector`-keyed SHAPE; names → presets-in-consumers |
| `DockSilhouetteKind = "...\|search"` (dead arm) | `useDockContextSilhouette.ts:68` | open the union to a descriptor SHAPE; delete the dead `"search"` arm |
| "Maps Places sheet" / "Apple Music player" prose + `Search→sheet`/`Now Playing` mode buttons | `liquid-playground.vue:70-101,392-625` | rebuild demo around GENERIC content: expand-into-{Card, Drawer, Popover, VizStudio} via ONE `<DockExpand>` |
| `places[]`/`recents[]` "Winston-Salem"/"Costco" | `liquid-playground.vue:102-112` | generic placeholder data ("Item A", "Place 1") |
| `{ label: "Maps" }` | `AppSwitcher.vue:25` | generic app tiles ("App", "Panel") or retire AppSwitcher to a clearly-app-shell example folder |
| "Apple Music" tile/prose | `AppleMusic.vue`, `dock-gallery.vue:12,25,57` | rename → a generic "Media" composition that PROVES the media-dock SHAPE, no brand |

The rebuilt demo is the **≥3-distinct-surface gate (H3)**: ONE `<DockExpand topology>` opens (1) a `<Card>`, (2) a `<Drawer>`/sheet, (3) a `<Popover>`, (4) a viz `<VizStudio>` configurator — each via `hub.open(ctrl, ref)` with ZERO per-kind branch, asserted by a call-expression scan. THIS is what proves the spine is agnostic — not a keyword grep.

---

## 6 · Cross-engine + a11y/PRM carve

- **Chrome+Safari:** the morph is compositor-only (transform/opacity/`filter` on the surface's OWN `filter`, never per-frame `backdrop-filter:url`). The fission goo is the static-SVG sRGB filter (`DockGooFilter`, ships Safari-first). `@supports` floor + sRGB color-interp. Both engines gated.
- **PRM:** `useElementMorph` honors `prefers-reduced-motion` → instant topology swap, zero neck/squish frames, fade-only (the floor already in `useLiquidReveal`). Fission → instant island materialize.
- **a11y:** `<DockExpand>` sets `aria-expanded`/`aria-controls`/`aria-haspopup` on the trigger, moves focus into the surface on open + restores on close, Escape closes, `useDockClickIntegrity` guards the mid-morph tap. The island sub-dock is a real `<GlassDock>` (full keyboard/roving model inherited).

---

## 7 · The gate (real, reproduces the gesture, judges the gestalt)

`proof:dock-hub` (source-structure, `["local","ci"]`) — H1 `open` is surface-type-blind (no `instanceof`/`kind` branch); H2 no app-domain enum gates any public verb (`split` takes a `MorphSignature` shape; `DOCK_SPLIT_SIGNATURES.*` survive only as preset constants); **H3 ≥3 distinct surface KINDS via the ONE verb, call-sites scanned**; H4 the named instances genuinely compose the hub or are honestly exempted in a `dock-hub-census.md`; **H5 ONE morph rAF runner** (`useElementMorph`) — a 2nd bloom runner REDs. Plus `proof:no-hardcoded-refs` (grep §5 → zero in `src/`). Plus the **binding π**: the live `<DockExpand>` open-gesture frame-series proving (a) the squish (scale≠1 mid-flight, X·Y≈1), (b) the envelop boundary-grow / the bloom source-rect / the fission waist+three-rest+re-merge, (c) bidirectional + interruptible, (d) BOTH modes, born-RED on a flat/instant entrance. Plus the `proof:ba-gestalt` dock verdict on a fresh BD capture.

---

## 8 · Reconcile vs the 116 union waves (no dup vs dock-core / dock-fission)

- **vs W-DOCK-CORE (the bounded `--dock-morph-t` morph):** the hub's `envelop` topology CONSUMES that scalar (box-INVIOLATE — reads `dimOf`, does not edit `dockMorphContext`/`DOCK_SPRING`). No dup.
- **vs dock-fission delta:** the hub's `fission` topology IS `useDockFission` — the only change is re-typing the public signature over a `MorphSignature` shape + demoting the app-name signatures to presets. No engine fork.
- **vs W-DOCK-SCROLL-FISSION / W-MEDIA-DOCK:** those are *compositions* that become INSTANCES of the hub (a media-dock is `<DockExpand topology="fission">` with a media-shaped consumer content; the scroll-fission wires `useScrollChrome`→the hub's fission). The hub is the spine they ride.
- **AMENDMENT to W-DOCK-HUB-API:** (a) make `useElementMorph` (the four-engine unification) the explicit deliverable — the wave currently says "does not fork a second morph engine" but the disk already HAS four; the hub must COLLAPSE them, not merely avoid adding a fifth; (b) re-type `DockSplitContext`→`MorphSignature` shape + demote signatures to presets (the critique's H2, load-bearing); (c) delete the dead `DockSilhouetteKind="search"` arm; (d) the de-overfit census targets the DEMO + the two engine enums (src/ proper is already clean); (e) the ≥3-distinct-surface bar (H3) replaces the ≥2.

---

## 9 · Why this is the most faithful AND most audacious iOS-27 read

iOS-27's dock is not a set of features — it is **one liquid glass body that recomposes its silhouette to whatever the moment demands** (T1 morph, T2 fission, T3 contextual silhouette, T5 bloom-up). The faithful read is therefore a SPINE, not a feature list — and the audacious move is to make that spine literal: ONE morph runner, the dock's own boundary a morph target, four topologies of pure geometry, zero app names. The dock stops being "the thing with a maps mode and a music mode" and becomes **a glass hub that envelops anything** — which is exactly, verbatim, what the user asked for.
