# The Maps-card EXPAND morph — compact glass card → full frosted sheet (W-MAPS-CARD-EXPAND)

**Lane** BD viz / fleet2 / maps-card-expand · **Status** AUTHORED 2026-06-22 · **Branch** `prototype/liquid-dock` ·
**Frame-grounded** against `/tmp/bd-media/frames/vid-ios27/` (the Maps card-expand, f036→f040) + `media-analysis.md §C` (the static Maps card + the IN-MOTION morph) ·
**Substrate-grounded** against `src/composables/motion/{useLiquidMorph,useLiquidReveal,useBloomUp,useDragMorph,springPresets,useLiquidFlex}.ts`, `src/components/ui/{sheet,drawer}/`, `src/components/custom/{icon-chip,expandable-container}/`, `src/styles/{scroll-choreography,tokens/glass}.css` at HEAD ·
**Scope** PLANNING/RESEARCH ONLY — zero `src/` edits. WRITE-only.

> Read alongside `video-liquid-transitions.md §3` (the frame-by-frame timing read — this doc is the BUILD spec under it), `glass-ios27-every-element.md §3` (the D1–D5 token-deltas the card surfaces consume), `media-analysis.md §C`. This doc OWNS: the card→sheet expand morph mechanism + the four glass anatomy pieces (gradient icon-chips · floating control discs · glass list-rows · search-pill-with-avatar) + the Safari fence + the gate.

---

## 0. TL;DR — the morph, the engine, the gap

The vid-ios27 frames show a compact frosted Maps card (search-pill + circular gradient icon-chips + floating control discs + a Recents list peeking) EXPAND UP into a full frosted SHEET (Places + Recents + Guides/Favorites wash in) — a confident liquid sheet-grow, not a snap, not a flat zoom.

**The engine SHIPS.** `useLiquidMorph` mode `"expand"` is the NAMED case ("a dock that EXPANDS to form a CARD" — module header) — it composes `useLiquidReveal(card, { trigger: pill })` over ONE `--liquid-morph-t` `dock`-spring, compositor-only + PRM-safe. The gap is NOT net-new machinery; it is THREE wirings: (a) the sheet-detent grow over a RESERVED full-footprint (zero-CLS, the `--dock-morph-t` precedent), (b) the backdrop-MAP dim coupling on the same scalar (a NEW `--maps-backdrop-dim` `@property`), (c) the content fade-and-rise stagger on the `.scroll-cascade` register gated on the expand. The four anatomy pieces all COMPOSE shipped primitives — no demo-local fork, no second component.

The whole morph is **Safari-clean**: compositor `transform`/`opacity`/`filter` over a one-time-reserved box + registered `@property` scalars — NEVER `backdrop-filter: url()`, NEVER an animated `height`/layout property (the `proof:no-layout-animation` floor).

---

## 1. The frame read (vid-ios27, f036 → f040)

| Frame | State |
|---|---|
| **f036** (compact) | the satellite map ~40% visible above; the glass card seated low: a search-pill (`Apple Maps` + mic + avatar chip), a `Places` row of circular GRADIENT icon-chips (Work brown / Home blue / Market yellow / Add blue), a `Recents` header starting to show one row. |
| **f037→f038** (in-flight) | the sheet grows UP off the grip handle; the map DIMS + recedes behind; the content (Recents rows, the gold-star Favorites card) FADES-AND-RISES in reading order as more sheet footprint un-occludes. |
| **f040** (full) | the map ~10% visible; the full sheet — Places, Recents, Your Guides, Favorites — laid out at FULL size. |

**The two binding observations:**
1. **The content does NOT scale-crush.** The Recents rows + Favorites card lay out at FULL size from the start — the SHEET geometry grows (a detent expand), the content REVEALS as the reserved footprint un-occludes. This is the reserved-footprint grow, not a `scale(child)`.
2. **A SMALL settle overshoot.** The sheet grows slightly past its detent and settles back (a control detent, not a one-shot celebration) → the `dock` spring (ζ 0.7, overshoot ~+4.6%), NOT `bouncy` (+12.6%, too playful for a sheet detent).

---

## 2. The morph mechanism — `useLiquidMorph` mode `"expand"` over a reserved footprint

### 2.1 The primitive choice (the SHEET-vs-shared-element fork — resolved)

Two shipped engines apply; the resolved choice is **`useLiquidMorph` mode `"expand"`** (which internally composes `useLiquidReveal`):

- **`useLiquidMorph.expand({ card, trigger })`** — the LEANER 3-channel match (scale/opacity/filter-blur), ONE `--liquid-morph-t` `dock`-spring. The Maps card has NO content-hue to drink (a neutral frosted sheet), so `useBloomUp`'s 4th field-hue channel would be a documented no-op (gray source → null hue → no tint). The 3-channel `useLiquidMorph`/`useLiquidReveal` is the faithful, lean choice. (`useBloomUp` stays the RIGHT engine for the album-bloom case in `video-liquid-transitions.md §2` — there the field DOES drink the album hue.)
- The wiring: `card` = the full sheet ref, `trigger` = the compact-card's grip/search-pill rect. The bloom transform-origin anchors at the trigger so the sheet grows FROM the card's seated position.

### 2.2 The reserved-footprint grow (the zero-CLS floor)

The full sheet lays out ONCE at its full height; `useLiquidReveal`'s `ElementMorph(settledRect, triggerRect)` drives a `transform: translate()+scale()` delta over that already-reserved box (the inversion spring 1→0). The content reads complete behind the grow aperture from frame 0 — the `--dock-morph-t` reserved-footprint precedent (hallmark §8.6). **NEVER an animated `height`** — the A'-3 reflow lesson, `proof:no-layout-animation` library-wide.

- **The detent ladder seam (KEEP the shipped engine):** the Maps card is a bottom SHEET with TWO detents (compact / full), so the natural home is the existing `<Drawer>` + `useDrawerSnap` (the house `SpringProgress` snap engine on `--glass-drawer-t`, `resolveDefaultSnapPoints` direction-aware). `useLiquidMorph.expand` is the TAP-to-expand path (bloom from the pill); `useDrawerSnap` is the DRAG-to-expand detent path. Both drive ONE scalar family — the recommendation (§8 Q1) is to UNIFY them onto `--glass-drawer-t` so tap + drag share one snap-fraction; the morph clock under tap is the `dock` spring, the drag uses the drawer's own `DRAWER_SNAP` clock (its per-spring register — `video-liquid-transitions.md §3.4` names this). Do NOT mint a parallel sheet engine.

### 2.3 The backdrop-MAP dim coupling (the NEW seam)

Neither `useLiquidMorph` nor `useLiquidReveal` touches a SEPARATE backdrop element — this is the one genuinely new coupling. As the sheet grows, the map behind dims + recedes:

- **`--maps-backdrop-dim`** — a registered `@property <number>` (initial `0`, `inherits: false`; the `--glass-ambient-strength`/`--border-progress-fill` registered-scalar precedent, so it INTERPOLATES not snaps). The backdrop reads `filter: brightness(calc(1 - 0.4 * var(--maps-backdrop-dim)))` (→ brightness 0.6 at full) + `transform: scale(calc(1 - 0.04 * var(--maps-backdrop-dim)))` (a small `scale(0.96)` push-back — the iOS sheet-over-map depth cue).
- The COUPLING: a `watch(morph.t, (v) => backdropEl.style.setProperty('--maps-backdrop-dim', String(v)))` writes the SAME `--liquid-morph-t` value onto the backdrop's scalar (the `useBloomUp` field-hue `watch(t)` precedent). ONE scalar, two readers (the sheet transform + the backdrop dim) — never a second spring.
- **Fence:** the dim is compositor-only (`filter: brightness` + `transform: scale` are GPU channels), Safari-native; a registered `@property` makes the dim interpolate on the inversion-spring sample. The dim is bounded (≤0.4 brightness drop) so the map stays READABLE behind a translucent sheet (the iOS sheet does not black-out the map).

### 2.4 The content fade-and-rise (the `.scroll-cascade` reuse)

The Recents/Guides/Favorites build in on the shipped `.scroll-cascade` register (`scroll-choreography.css` — the orchestrated section cascade, per-child `view()` timeline, staggered reading-order entrance, compositor-only transform+opacity, PRM → terminal fade). NOT a flat opacity fade.

- The sheet content rows carry `.scroll-cascade > *` (each child its own `view()` timeline) so they fade-and-rise as the sheet footprint un-occludes them — exactly the f037→f040 "content washes in reading order" read.
- **Gating:** the cascade is gated on the expand SETTLE — the content stagger fires AS the sheet reveals its rows (the `view()` timeline naturally fires as a row scrolls into the un-occluding viewport; no JS sequencing needed — the cascade's `view()` substrate IS the gate).
- **PRM:** `.scroll-cascade`'s `@supports (animation-timeline: view())` + PRM outer gate degrades to a terminal fade (vestibular floor) on a gap engine OR under reduce — the sheet seats at full, the content reads, no stagger.

### 2.5 The grip-drag-to-expand (the shared scalar)

The sheet grip composes `useDragMorph` (the shipped pull-gesture primitive — kf `Draggable` follow + fling-to-nearest single-commit) with two snap targets (compact / full). Tap-to-expand (`useLiquidMorph.expand`) AND drag-to-expand (`useDragMorph` → `useDrawerSnap`) share the ONE `--glass-drawer-t`/`--liquid-morph-t` scalar (§8 Q1: unify onto the drawer's `--glass-drawer-t`). The drag follows the finger ~1:1, the fling snaps to the nearest detent — the `video-liquid-transitions.md §3.4` grip-drag read.

---

## 3. The four glass anatomy pieces (all COMPOSE shipped primitives)

### 3.1 The gradient icon-chips (concentric radii) → `<IconChip>` + a `:gradient` register

The `Places` row chips (Work brown / Home blue / Market yellow / Add blue) are circular GRADIENT chips with concentric radii — a glyph centered on a radial-gradient disc. **Compose `<IconChip>`** (the shipped section-color POP primitive — `color-mix(... 25%, transparent)` backplate + full-chroma glyph + the `--icon-chip-glyph-ratio` floor + `:duotone`/`:bloom`/`:reveal` axes):
- The chips read `:tone` (a complete per-chip hue — the Maps category color, a consumer preset, NEVER a library token) over the circular backplate. The CONCENTRIC-radii gradient is a `:duotone`-style low-α tonal radial fill (the existing `.icon-chip--duotone` arm) reaching the rim — the iOS-27 "the icon shine = the glass rim reaching the chip" (D3, `glass-ios27-every-element.md §1`).
- **The gap (small):** IconChip's backplate is a flat `color-mix` tint, not a radial-gradient. A `:gradient` axis (an OPT-IN concentric radial-gradient backplate, default-off, byte-identical at the default) is the booked refinement — OR the chips simply ride `:duotone` + `:bloom` (the existing axes already deliver the tonal-disc + glass-bloom read). RECOMMEND: ride the existing `:duotone`+`:bloom` axes first; book `:gradient` only if the π shows the concentric read needs the true radial-gradient.
- The chip ENTRANCE on expand is `:reveal` (composing `vReveal`, PRM-gated, the `icon-chip-reveal` spring-clock entrance) — the chips pop in as the Places row un-occludes.

### 3.2 The floating frosted control discs (3D / compass / binoculars / nav) → `<GlassControl shape="circle">`

The map's floating control discs are frosted glass circles over the live map. These are the NEW `<GlassControl shape="circle">` package (`glass-ios27-every-element.md §1` — "the Maps control circles, a NEW package landing GLASS-BEARING by construction"):
- A circular `glass-floating` disc reading the iOS-27 directional rim (D3 — `--glass-rim-top` bright catch + the bright lower-edge `--glass-rim-bottom-light`), the lighter control inner-shadow (D1 — `--glass-under-shadow-control`), the flatter superellipse-n (D2 — but `shape="circle"` is `border-radius: 50%`, so the squircle-n is N/A for the discs; it applies to the rounded-rect chips/pills).
- They float OVER the map (`position: absolute`), so they ride the W55 adaptive tint + the `useGlassBackdropLuminance` sampler (the dock-over-live-backdrop precedent) — the discs darken-over-bright-map / lift-over-dark so the glyph stays AA.
- They are OUTSIDE the sheet (over the map, not in the sheet) so they do NOT ride the sheet's grow transform — they stay pinned over the map and the map dims behind them (the discs stay lit while the map recedes — the depth cue).

### 3.3 The glass list-rows (Recents) → `.glass-menu-row` register

The Recents/Guides list-rows are glass-quiet hover-lift plates — the shipped `.glass-menu-row` register (the iOS-grade glassy menu-row, the element-level glass-quiet oklab tint, the `--menu-row-lift` PRM-gated hover-lift, the 44px touch floor). NO per-row CSS fork:
- The rows read `.glass-menu-row` so they hover-lift + darken-over-light per W55 + lift-over-dark per W-DARK-MATERIAL.
- The list-row ENTRANCE on expand is the `.scroll-cascade` content fade-and-rise (§2.4) — the rows are the `.scroll-cascade > *` children.
- The bleed-through (D5, `glass-ios27-every-element.md §3`): the SHEET PLATE behind the rows reads the `--glass-opacity-sheet` (0.74) translucent register (the W-SHEET-TRANSLUCENT frosted-card register — the map bleeds through the frosted sheet, the Proofread-popover D5 read), NOT an opaque `bg-card` plate. The W-CLEAR-VARIANT legibility scrim is the AA floor over the live map backdrop.

### 3.4 The search-pill-with-avatar → `.input-pill` / `.control-surface` + an avatar chip

The `Apple Maps` search-pill (mag glyph + mic + avatar) is the shipped `.input-pill`/`.control-surface` glass well (the `--control-surface-*` rest register, the no-gray control-family seam) with the iOS-27 deltas (flatter-top D2, lighter inner shadow D1):
- The leading mag glyph + trailing mic are `<IconChip :bare>` (the leading-glyph register, no plate).
- The trailing avatar is a shipped `<Avatar>` (opaque-allowlisted — a photo carrier, state 2) seated as the pill's trailing chip.
- The pill is the `trigger` rect for `useLiquidMorph.expand` — the sheet blooms FROM the search-pill's seated position (transform-origin at the pill).

---

## 4. The timing/spring/easing (from `video-liquid-transitions.md §3.2`, measured)

| Channel | Value | Source |
|---|---|---|
| **Clock** | ~400–450ms (a confident sheet detent grow — slower than a tab, faster than the emphatic player bloom) | the `dock` spring analytic horizon |
| **Spring** | `dock` (response 0.32, ζ 0.7, overshoot ~+4.6% — the iOS-control settled register) | `springPresets.ts` `dock` row; a detent is a control, not a celebration |
| **Sheet grow** | compositor `scale`/`translate` over the reserved full-footprint (the inversion spring 1→0) | `useLiquidReveal` `ElementMorph` |
| **Content fade-rise** | `.scroll-cascade` reading-order stagger (per-child `view()` timeline) | `scroll-choreography.css` |
| **Backdrop dim** | `--maps-backdrop-dim` 0→1 on the SAME scalar → `brightness(0.6)` + `scale(0.96)` | the NEW coupling, §2.3 |
| **No field-hue** | the Maps card is neutral — `useBloomUp`'s 4th channel is a no-op; `useLiquidMorph` (3-channel) is the lean match | media §C |

The spring choice is the orchestrator's one open dial: `dock` (faithful, the detent settle read) vs `bouncy` (the more emphatic Maps read). RECOMMEND `dock` — the frame read carries a SMALL settle overshoot (a detent control), not the +12.6% playful bounce. (§8 Q2.)

---

## 5. The Safari-compat fence (CLEAN — no fall needed)

Every channel is compositor/CSS — the WebKit fence is structurally clean (`video-liquid-transitions.md §3.5`):

1. **NO `backdrop-filter: url()` — ever** (WebKit bug 245510). The sheet's frosted plate is a REGULAR `backdrop-filter: blur()` (no `url()`, WebKit-native); the decongest is a `filter: blur()` on the sheet's OWN pixels (`useLiquidReveal` already does this — "filter not backdrop-filter so the resting glass-tier plate blur is never clobbered").
2. **`@property` scalars are the interpolation seam — Baseline on WebKit 26.** `--liquid-morph-t` / `--glass-drawer-t` / `--maps-backdrop-dim` are ALL registered `@property` so they INTERPOLATE (a bare `var()` snaps).
3. **Compositor channels ONLY — transform/opacity/filter/clip-path.** Never `width`/`height`/`top`/`left`/`padding` — the sheet grows by transform over a one-time-reserved footprint → zero CLS, identical on WebKit (`proof:no-layout-animation`).
4. **The `.scroll-cascade` content build** is under the `@supports (animation-timeline: view())` + PRM outer gate — on a WebKit engine without the view-timeline the build degrades to a terminal fade (never broken).
5. **The grip-drag** uses `useDragMorph` → kf `Draggable` (compositor `transform`, pointer-capture — WebKit-native).
6. **PRM-safe by construction** — under reduce the sheet seats SYNCHRONOUSLY at full (zero grow frames, `useLiquidReveal.respectReducedMotion`), the content reads (terminal fade), the backdrop dims instant (a brightness change is not vestibular; scale/translate are). The vestibular floor is absolute, both engines.

---

## 6. The gate — `proof:maps-card-expand` (device-free) + the π readback

| Clause | Asserts |
|---|---|
| **M1 — composes-not-forks** | the expand uses `useLiquidMorph.expand`/`useLiquidReveal` (the shipped engine), the four anatomy pieces compose `<IconChip>`/`<GlassControl>`/`.glass-menu-row`/`.input-pill` — NO demo-local re-fork (the anti-fork self-test bite). |
| **M2 — reserved-footprint grow** | the sheet grows by `transform` over a reserved box — NO animated `height`/layout property (the `proof:no-layout-animation` cross-check; a planted `height` keyframe REDs). |
| **M3 — the backdrop-dim coupling** | `--maps-backdrop-dim` is a registered `@property` read by the backdrop on the SAME `--liquid-morph-t`/scalar (ONE scalar, two readers; no second spring). |
| **M4 — the content cascade** | the list-rows ride `.scroll-cascade` (the shipped register), not a flat fade; gated under the PRM/`@supports` outer gate. |
| **M5 — the sheet bleed-through** | the sheet plate reads `--glass-opacity-sheet`/`clear` (translucent, D5) + the W-CLEAR-VARIANT scrim — NOT an opaque `bg-card`/`bg-popover` plate (the de-shadcn cross-check). |
| **M6 — Safari fence** | NO `backdrop-filter: url()` in the morph path; `@property` scalars; compositor-only — the self-test bite plants a `backdrop-filter: url()` + a `height` keyframe and asserts both RED. |
| **M7 — the drag detent** | the grip-drag composes `useDragMorph` → `useDrawerSnap` on the unified scalar; tap + drag share ONE detent ladder (no parallel sheet engine). |

The binding π (`tests-visual/maps-card-expand.spec.ts`, LOCAL-only, rides W-REFLECT3): the live `:5199` card→sheet expand frame-series (the sheet grows over the reserved footprint, the content washes in reading order, the map dims behind, the small `dock` settle overshoot), both modes (light + dark glass), the webkit Playwright project for the Safari fence, the PRM single-paint (seats at full, content reads, no grow frames), overlaid against the vid-ios27 f036→f040 reference frames (the frame-match verdict — match within a hairline, RICHER where it differs). + the `proof:ba-gestalt` container-band verdict.

---

## 7. Consumers — the ≥2-consumer bar (by construction)

- **#1 — `demo/stories/dock/maps-card-expand.vue`** (or `containers/maps-card.vue`): the canonical Maps card over a live satellite-image backdrop (or a synthetic aurora field — one GL/image context per route), the full card→sheet expand, composing the shipped leaves (no demo-local re-fork — the W-DEMO-DESIGN consume-not-fork discipline).
- **#2 — the W-SHEET-TRANSLUCENT / `<Sheet>` family** consumes the SAME sheet-detent + bleed-through register (the Maps card IS a `<Sheet>`/`<Drawer>` composition); the `<Drawer mode="live-behind">` snap-detent + `useLiquidMorph.expand` bloom is the shipped-component path, so the morph is born ≥2-consumer (the demo + the Sheet/Drawer family it composes).
- The cross-repo seam (the foreign-tree fence): a consumer fleet (speedtest / slides) mounts the card-expand on its own surface on the `^4.x` bump (its edit, never here). Recorded in `docs/consumer-evidence/maps-card-expand.md`.

---

## 8. Open questions / decisions for the orchestrator

1. **Q1 — unify tap + drag onto ONE scalar?** RECOMMEND: tap (`useLiquidMorph.expand`) + drag (`useDragMorph`→`useDrawerSnap`) share `--glass-drawer-t` (the shipped drawer detent scalar), so a tap-expand and a drag-to-full snap to the SAME detent ladder. The tap clock is the `dock` spring; the drag uses the drawer's own `DRAWER_SNAP` register. Do NOT mint a parallel `--liquid-morph-t` sheet engine beside the drawer's. (The `<Drawer>` family already owns the detent ladder — the Maps card is its iOS-27 styling consumer, not a new engine.)
2. **Q2 — `dock` vs `bouncy` spring?** RECOMMEND `dock` (response 0.32, ζ 0.7, +4.6%) — the frame read is a confident detent settle, not a +12.6% playful celebration. The `expand` default in `useLiquidMorph` is `dock`; the `revealPreset` for the bloom is `bouncy` — RECOMMEND overriding it to a non-bouncy reveal for the Maps detent (a sheet detent is a control). Booked to the π calibration.
3. **Q3 — the gradient icon-chips: `:gradient` axis or ride `:duotone`+`:bloom`?** RECOMMEND: ride the existing `:duotone`+`:bloom` IconChip axes first (they deliver the tonal-disc + glass-bloom read); book a `:gradient` concentric-radial axis ONLY if the π shows the concentric read genuinely needs a true radial-gradient backplate. Avoid a speculative new axis (the overfitting bar).
4. **Q4 — `<GlassControl shape="circle">` mint scope.** The floating control discs are the NEW `<GlassControl>` package (`glass-ios27-every-element.md §1`); the Maps card is consumer #1, the dock-control register / the W-GLASS-CONTROL switch/checkbox track is consumer #2. Confirm the disc lands in W-GLASS-CONTROL (not minted locally to the Maps card — the ≥2-consumer bar).
5. **Q5 — the backdrop is a live image/satellite map or a synthetic aurora field?** The demo can use a synthetic aurora (one GL context per route, the DockStage precedent) OR a static satellite image (zero GL, the cheaper choice). RECOMMEND the static image (the morph is the protagonist, not the backdrop; a live GL field competes for the one-context budget and the morph doesn't need a live backdrop to read).
