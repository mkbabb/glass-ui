# v1-tabs-glass — frame-by-frame analysis (the iOS-27 Apple Maps bottom-sheet / Liquid-Glass dock)

Source: `frames/f001.jpg`..`f019.jpg` — iPhone, iOS 26/27, dark mode, screen-recording. Apple Maps satellite/dark register.

> **Scope honesty.** This 19-frame clip is the **Apple Maps search bottom-sheet** (a detented Drawer over a live map) — NOT a tab-strip and NOT the Apple-Music goo-split sub-dock. The brief's "tabs / liquid indicator / album fade / sub-docks goo-split / six-layer composite / layers-by-context" describe the BROADER BD reference set (v2-dock-a, v3-dock-b, v4-dotflow + the Apple-Music clip); they are **not present in these frames**. I document what these frames ACTUALLY show (the sheet + the floating map-control clusters + the bottom search "dock") frame-by-frame, then name the gap + the closing wave, pointing at sibling audits for the out-of-scope behaviours.

## What the clip shows (the arc)
A single **bottom-sheet snap cycle** over a live Apple-Maps satellite view: **peek** (search pill only, f1-4, 9-11, 19) → **half** (Places + Recents partial, f5-8, 13-15) → **full** (sheet fills screen, map gone, content on a near-SOLID dark panel, f16-18) → back down. Plus two persistent floating control clusters (3D + binoculars bottom-left; globe/compass bottom-right) that **fade/translate out** as the sheet rises and **fade back** as it falls.

## Frame-by-frame
- **f001-f004 — peek, resting.** Map fills screen. A **rounded translucent glass search "dock"** ("Apple Maps" + mic + carrot chip) floats over the map — terrain reads THROUGH it (transmissive glass, not an opaque bar). Top-left a glass weather chip. The floating map-control clusters (3D/binoculars left; globe/compass right) are separate, individually-rounded translucent glass pills. f001→f004 the pill's bottom inset settles (lowest detent).
- **f005 — drag begins (peek→half).** Search pill DETACHES upward, a glass sheet body grows under it, a **grab-handle** appears at the top edge. "Places >" + the round category chips (Work/Home/Walmart/Add) **fade up** into view. Map behind begins to **dim** (scrim engages); lower controls being occluded.
- **f006-f007 — half detent settling.** Sheet ~50%. Category chips full-opacity, full-size, **vibrant saturated circular icons** (brown/teal/amber/blue). "Recents > Winston-Salem" fades in (f007). Map is **still visible + transmissive** behind the upper sheet band — glass at half is TRANSLUCENT. The left/right control clusters have **faded out** (f007).
- **f008 — half, fuller.** Second Recents row (Costco) fades in. Upper sheet glass still transmits the terrain. Half snap REST — translucent glass.
- **f009-f011 — release toward peek.** Sheet TRANSLATES down; "Places >" recedes (f009); the control clusters **fade BACK IN** (f009 3D/binoculars/globe/compass reappear) as the sheet clears them — coupled cross-fade keyed to sheet position. f010-f011 nearly collapsed, controls full-opacity.
- **f012 — peek rest (transient).** Faint sheet-body ghost under the pill — the spring is settling (a hair of give before it seats).
- **f013-f015 — drag UP again.** f013 half. f014 rising past half — map visible band SHRINKS, top terrain going **darker** (scrim deepening toward full). f015 nearly full — only a thin map strip behind the grabber; sheet body now a **much darker, near-opaque plate** (glass CONGEALING toward solid).
- **f016-f018 — FULL detent.** Sheet fills screen. Content (Places, Recents, "Your Guides" gold 3D star) on a **near-SOLID dark panel** — map GONE (faint ghost behind the grabber only). **Key transition: at full the glass is no longer transmissive — it has become an opaque content surface.** Vibrant chips + gold star carry the saturated-accent identity; list rows read as flat dark cards.
- **f019 — release from full.** Sheet drops; map floods back (full terrain re-reads); control clusters **fade back in**; sheet returns to translucent as it descends.

## The decomposition
1. **Detented snap (peek·half·full).** Drag follows finger ~1:1; release **settles to a detent** with a **spring** — small smooth give (f012, not a hard stop). Feel: heavy/smooth surface, low overshoot — a settled sheet, not a bouncing one.
2. **Glass becomes OPAQUE at full (the headline glass transition).** Translucent at peek/half (map reads through, f1-8) → as the sheet climbs (f14→f16) it **darkens + congeals toward a near-SOLID panel**. Opacity/blur is **coupled to the snap fraction**: a peek sheet is glass-over-content; a full sheet IS the content surface.
3. **Coupled backdrop scrim.** Map **dims** as the sheet rises (f5→f15), **un-dims** as it falls (f19); scrim opacity tracks the fraction. (No clear page SCALE-down is legible in this dark/satellite clip — the dominant backdrop cue is the SCRIM, not a scale.)
4. **Floating control clusters fade/translate, position-coupled.** 3D/binoculars + globe/compass **cross-fade + nudge** out as the sheet rises (f5→f7), back as it falls (f9→f11, f19) — keyed to sheet position. Each is its own rounded translucent glass pill (the multi-pill "abstract dock" silhouette).
5. **Vibrant accents over glass.** Saturated category circles, gold 3D star, pink carrot — full-chroma accents over the glass; chrome stays warm-ink/neutral (one-color-event-per-region).
6. **Bottom search "dock" is transmissive glass at rest** — translucent rounded capsule the map reads through (f1), not an opaque bar.

## glass-ui CURRENT vs reference — gap + closing wave
Read live: `src/components/ui/drawer/*` (`Drawer.vue`, `DrawerContent.vue`, `composables/useDrawerSnap.ts`, `constants.ts`), `src/styles/drawer.css`, `src/styles/glass/reveal.css`, glass tier tokens.

### GAP 1 — glass does NOT go opaque at full (headline miss)
- **Reference:** translucent at peek/half → near-SOLID at full (f14→f16); opacity/blur coupled to the snap fraction.
- **CURRENT:** `--glass-drawer-t` drives ONLY `translateY` (`DrawerContent.vue:99-107`). `drawer.css` paints a FIXED `--glass-bg-overlay` + `--glass-blur-overlay` for ALL detents — the glass tier is **constant** across peek/half/full. No `--glass-drawer-t → --glass-level` (opacity) or `→ scrim` coupling. A full glass-ui sheet still shows the backdrop bleeding through the list — opposite of iOS.
- **WAVE (propose) `BD.W-DRAWER-DETENT-GLASS`** (Band 2 glass-material / Band-17 motion augment): couple `--glass-drawer-t` into `--glass-level` (+ a `--drawer-scrim` opacity) on the EXISTING `--glass-level` machinery (no new compositing seam) — peek/half stay the translucent `glass-overlay` tier, fraction→1 lerps `--glass-level` toward the opaque escape (solid `--card`+`blur(0)`, the W54 `.glass-opaque` endpoint via the ONE level path). Compositor-safe (`proof:no-layout-animation` floor). Gate: π that the composited sheet `background-color` α is translucent at peek/half AND near-opaque (α→~1) at full, BOTH modes; born-RED on the current fixed-tier sheet. The `--dock-morph-t` scalar→token-lerp precedent.

### GAP 2 — `shouldScaleBackground` is a DEAD documented prop
- **Reference:** page behind dims (scrim) as sheet rises; canonical iOS modal also scales the page ~0.95. glass-ui claims "the iOS scale-down look" (`Drawer.vue:15/44`, `index.ts:23`).
- **CURRENT:** `shouldScaleBackground` is declared (`Drawer.vue:45,55`) + documented — but **nothing reads it**. Zero `scale(`/`0.95`/scrim-coupling in `drawer.css` or the SFCs (grep: only the prop decl + doc-comments). A **no-op** — the W14 dead-knob class.
- **WAVE (propose, fold into GAP 1 or `BD.W-DRAWER-SCALE-SCRIM`):** wire `shouldScaleBackground` to a real `transform: scale(lerp(1, 0.95, --glass-drawer-t))` on the page-behind wrapper + a `--drawer-scrim` opacity tracking the fraction; compositor-only, PRM-carved. Gate: born-RED bite that the prop currently animates ZERO pixels.

### GAP 3 — no live-fraction seam for sibling choreography
- **Reference:** floating control clusters fade/translate out as the sheet rises, back as it falls (f5-11, f19), keyed to sheet position.
- **CURRENT:** the Drawer round-trips the discrete detent (`v-model:active-snap-point`) but publishes no LIVE `--glass-drawer-t` fraction on a stable scope a SIBLING (floating controls, a dock) can subscribe to for continuous coupled cross-fade. Position-coupled choreography is hand-rolled per consumer.
- **WAVE (propose) `BD.W-DRAWER-FRACTION-SEAM`** — broadcast `--glass-drawer-t` (+ resolved detent) onto a known ancestor scope; a sibling opts in with `opacity: calc(1 - var(--glass-drawer-t))`-style coupling (compositor-only). ≥2-consumer bar: Maps-style demo + dock-shell. (Polish leg.)

### GAP 4 — drawer content rows lack the liquid squish/fade-up entrance
- **Reference:** category chips + Recents rows **fade UP** into place as the sheet rises (f5-8), coupled to the sheet motion.
- **CURRENT:** content is just inside the translating plate — no per-item squish/fade-up. The grammar EXISTS (`.glass-reveal`, `useLiquidReveal`, `useLiquidFlex`) but is applied to top-layer OVERLAYS, not drawer rows.
- **WAVE (already proposed): `W-LIQUID-ENTRANCE-GENERAL`** (sibling `liquid-video/ANALYSIS.md`) — enroll drawer content rows as a covered surface.

### ALIGNED (no gap)
- Detent ladder `[0.12, 0.5, 1]` (`constants.ts:BOTTOM_SHEET_LADDER`) = reference peek/half/full exactly.
- Spring `DRAWER_SNAP {response: 0.4, ζ: 0.82}` = the heavier low-overshoot "smooth" register the clip shows; interruptible re-seat (live (value,velocity) re-target) = iOS interruptible contract.
- Fling-vs-slow release (`DRAWER_FLING_VELOCITY`, `useDockState`-style) = the flick-advances-a-detent feel.
- `live-behind` mode (page stays interactive) = the Maps "interact with the map while the sheet is up" model.
- Transmissive glass at rest (the `glass-overlay` peek tier IS translucent-over-map). Gap is ONLY the full-detent opacity (GAP 1).
- Vibrant accents over glass = `<IconChip>` one-color-event register. Rounded grabber + token-driven look (`--drawer-handle-*`). PRM-safe (`respectReducedMotion`).

### Out-of-scope for THIS clip (owned by sibling audits)
- Tabs/liquid indicator/album fade — SegmentedTabs/`useTabIndicator` + v2/v3 dock clips.
- Dock bi-directional morph / form-by-context / sub-sections / shrunken / layers-by-context — `BD.W-DOCK-MORPH-FAMILY` (shipped) + `v2-dock-a`/`v3-dock-b`.
- Apple-Music logo goo-SPLITS off the core dock into the abstract bottom dock (sub-docks) — NOT this clip (Apple-Music ref); owned by `DockStack` (`mode="facets"`) + `DockGooFilter.vue` + the BD goo-morph triumvirate. The multi-pill floating-control silhouette HERE is the static analogue.
- Six-layer glass composite — covered by W-LENSING / W-LIQUIDHOVER / glass material; no NEW gap from this clip.

## Top gaps (priority order)
1. **GAP 1 — snap-fraction → glass-opacity coupling ABSENT** (`--glass-drawer-t` drives only translate; sheet stays equally translucent at full; reference goes near-SOLID). → `BD.W-DRAWER-DETENT-GLASS`.
2. **GAP 2 — `shouldScaleBackground` is a DEAD documented prop** (no page scale + no snap-coupled scrim; the "iOS modal look" claim unbacked). → `BD.W-DRAWER-SCALE-SCRIM` / fold into GAP 1.
3. **GAP 4 — drawer rows lack the liquid squish/fade-up entrance** → enroll in `W-LIQUID-ENTRANCE-GENERAL`.
4. **GAP 3 — no published live-fraction seam for sibling choreography** → `BD.W-DRAWER-FRACTION-SEAM` (polish).
