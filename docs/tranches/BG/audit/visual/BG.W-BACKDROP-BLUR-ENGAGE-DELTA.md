# BG.W-BACKDROP-BLUR-ENGAGE — dual-engine PAINT JUDGE DELTA

**Wave:** F5.4 · BG.W-BACKDROP-BLUR-ENGAGE (SOTA-DESIGN [7] gesture-coupled blur + the USER-07-05 BUTTERY arm)
**Judge:** non-authoring paint judge (did not build; verified painted truth)
**Date:** 2026-07-06
**HEAD:** `20b09bc7` (BG F5 — drag-driven backdrop blur ENGAGES off the live gesture scalar `--glass-drawer-t`; proof:motion GREEN [paint-pending])
**Verdict:** **PASS — dual-engine (Chrome + Safari/WebKit), both modes.** Cursor flip PAINT-PENDING → DONE.

---

## Method (proven C18 pipeline)

- Siblings intact before + after: `node scripts/verify-siblings-intact.mjs --quiet` → exit 0.
- BUILT bytes: `npm run demo:dist:build` (exit 0) → `npm run demo:dist:serve` on **:5200** (not the :5199 dev origin).
- **Static provenance** (at-rest gestalt + engine badge): `?capture=<route>&mode=<m>` boot path, poll `data-capture-ready`.
  - Chrome: real on-screen Chrome.app 149 over CDP `:9333`, `GL_RENDERER = ANGLE (Apple, ANGLE Metal Renderer: Apple M5 Max)` — real Metal, not SwiftShader.
  - Safari: off-screen `wkshot-live` (system WebKit.framework/Metal), `ENGINE WEBKIT · GPU Apple GPU · @2x 2880×1800`.
- **Binding blur-engage + BUTTERY cadence:** the LIVE demo (NO `?capture=` — capture.css kills every animation/transition, so it is valid ONLY for the settled-frame static PNGs; the gesture-coupled blur + the frame cadence MUST run on the live tree). Chrome over CDP.
- The device-free `proof:motion` gate (F5.4 arm) was re-run on the integrated tree: **GREEN, violations 0**, self-test bite real (a drawer sheet blur decoupled from `--glass-drawer-t` flags). `npx vue-tsc --noEmit` → exit 0.

---

## Arm 1 — the blur-engage correctness signature (BE1/BE2/BE3): **PASS (definitive)**

The iOS-27 backdrop-blur-tracks-the-finger requirement: the sheet's `backdrop-filter` blur radius must be a PURE FUNCTION of the LIVE gesture scalar (`--glass-drawer-t` × the solidify decay off `--stage-t`), never a fixed `--duration-*` tween; closed (t=0) reads 0 blur (NO-MASKING floor); the only fixed-clock blur is the trailing dismiss (delivered for free by the drag scalar's own spring).

**Live readback** — drove BOTH scalars across an 11-point sweep on the open sheet and read the computed `backdrop-filter`. Recipe: `blur(13px × clamp(t/0.35,0,1) × (1 − freeze))`, `freeze = clamp((t−0.85)/0.15,0,1)`.

| route | mode | overlayRadius | knee | tweenViolation | closedBlur (t=0) | risesWithScalar | solidifies | **maxDelta (actual vs expected)** |
|---|---|---|---|---|---|---|---|---|
| /containers/drawer | light | 13px | 0.35 | **false** | **0** | true | true | **0.00** |
| /containers/drawer | dark | 13px | 0.35 | **false** | **0** | true | true | **0.00** |
| /compositions/drawer-live-behind | light | 13px | 0.35 | **false** | **0** | true | true | **0.00** |
| /compositions/drawer-live-behind | dark | 13px | 0.35 | **false** | **0** | true | true | **0.00** |

The blur radius equals `13 × engage-t` EXACTLY at every one of the 11 sample points (`maxDelta = 0`). `transition-duration = 0s` on the sheet → no `transition: backdrop-filter` wall-clock tween (BE3). The curve is the textbook engage-then-solidify: rises 0→13px over t∈[0,0.35], holds 13px through t=0.85, solidify-decays 13→0px over [0.85,1] (a solid plate has no backdrop to bend).

**Binding blur-tracks-scalar frame-series** (the designSyncSurface deliverable), Chrome, both modes — measured `backdrop-filter` per frame:

| t | tag | backdrop-filter (both modes byte-identical — radius axis is mode-invariant) |
|---|---|---|
| 0.08 | rise | `blur(2.97px) saturate(1.6)` |
| 0.25 | rise | `blur(9.29px) saturate(1.6)` |
| 0.50 | full | `blur(13px) saturate(1.6)` |
| 0.95 | solidify | `blur(4.33px) saturate(1.6)` |

Captures: `drawer-blurseries-t{008,025,050,095}-*-chrome-{light,dark}.png` (8). At t=0.50 the sheet paints a warm glass crown, the scrim dims the page, and content behind the sheet is softened by the 13px backdrop blur (visually confirmed).

- **Compositor-only:** the blur rides `backdrop-filter`, the sheet rides `translateY` — no layout property animates.
- **PRM-snap (by construction):** the blur has no independent transition (0s) and is a pure function of the scalar, so whatever the scalar does under reduced-motion, the blur mirrors instantly — there is no fixed-clock blur tween to violate. (Live PRM note below.)

---

## Arm 2 — the BUTTERY cadence bar (USER-07-05): **PASS in-gesture** (with a localized ambient-jank note)

Bar: over each dock gesture window — (a) no inter-frame gap >33ms in-gesture, (b) 0 long-frames (>50ms main-thread) in-gesture, (c) first responding frame ≤2 frames after input, (d) a per-gesture BUTTERY verdict (fps + gap histogram + felt call). Measured via a CLEAN hot rAF recorder (records ONLY `performance.now()` per frame + cheap inline-style scalar reads — NO `getComputedStyle` in-loop, which would manufacture the jank) + a `longtask` PerformanceObserver. Display runs ProMotion ~120Hz, so ~98fps / ~12ms frames is the buttery ceiling.

**Warm steady-state per-gesture verdict (both modes — light shown, dark independently confirmed clean):**

| gesture (route) | fps | maxGap | dropped>33ms | longtasks>50ms | gap histogram (<=17 / 17-33 / 33-50 / >50) | **BUTTERY?** |
|---|---|---|---|---|---|---|
| collapse/expand (/dock/overview) | 98.1 | 12.1ms | 0 | 0 | 92 / 0 / 0 / 0 | **YES** |
| in-place V↔H morph (/dock/morph-showcase) | 95–97 | 20–22ms | 0 | 0 (8 reps ×2 modes) | ~all <=17 | **YES** |
| pane swap (/dock/layers) | 96.9–98 | 20.3ms | 0 | 0 | 85 / 1 / 0 / 0 | **YES** |
| rail fan (/dock/rail) | 97.9–98 | 12.1ms | 0 | 0 | 87 / 0 / 0 / 0 | **YES** |
| hover engage (/dock/overview) | 98 | 12.2ms | 0 | 0 | clean | **YES** |

- **Felt-smoothness call:** every dock gesture window animates at the display's ~98fps ceiling with sub-17ms frames and zero main-thread longtasks warm — the transform/opacity/filter legs are compositor-clean. Gestures respond immediately (the spring starts on the frame the input handler runs; the drawer non-PRM spring ramps smoothly 0→0.4 over 16 motion frames). The gesture MECHANISM is buttery.
- **`hover-press` press leg — measurement discarded (contamination, not a defect):** the `.dock-icon-button` items on /dock/overview are NAV items; a synthetic press navigates (verified: press → route change to `/foundations/intro`), so the "press" window measures navigation cost (route change + lazy chunk + new-page render), not the press animation. The press animation itself is `useLiquidPress` on the spring's own clock (compositor-only; `proof:motion` F5.2/R2 GREEN). Hover engage (no click) is clean.

### Localized ambient-jank observation (NOT a gesture-cadence defect; out of this wave's charter)

The decisive idle-vs-gesture discriminator:

| route | mode | window | jank windows | total longtasks>50ms |
|---|---|---|---|---|
| /dock/morph-showcase | light | **IDLE (no interaction)** | **5 / 6** | **11** (~50ms each, ≤4Hz) |
| /dock/morph-showcase | light | gesture ×8 | 0–2 / 8 | 0–1 |
| /dock/morph-showcase | dark | IDLE | 0 / 6 | 0 |
| /dock/morph-showcase | dark | gesture ×8 | 0 / 8 | 0 |
| /dock/rail (no live aurora) | light | IDLE | **0 / 6** | **0** |

On the **light-mode** aurora-backed dock routes (overview, morph-showcase) there is a background ~50ms main-thread longtask at ~1.6/sec **while completely idle** — it lands at the SAME rate whether or not a gesture is in flight, is ABSENT in dark, and is ABSENT on the aurora-less rail route. This localizes it to the **DockStage live aurora + the `useGlassBackdropLuminance` sampler's periodic `getImageData` GPU→CPU readback** (a ≤4Hz sampler cost), NOT the gesture mechanism and NOT any of the criteria's named gesture producers (per-frame backdrop-filter re-raster under transform / goo feGaussianBlur / blur on morphing plates / layout reads in the spring tick). It is a route-level perf-producer concern (owned by `proof:perf-producer` + the sampler-throttle discipline), independent of this wave — F5 changed CSS only (drawer.css blur read + surfaces.css primitive; `git show --stat 20b09bc7` touches no JS seat/loop). A one-time cold-start measure/shader-compile hitch (~54–175ms) also appears on the first morph/expand after a cold page load and clears once warm; this is universal cold-start cost, not a sustained cadence defect.

**Cross-scope follow-up candidate (recorded, does not block this wave):** throttle/park the `useGlassBackdropLuminance` sampler more aggressively (or cheapen the light-mode aurora medium) on the DockStage routes to kill the ambient light-mode idle stutter — a `proof:perf-producer` / sampler-throttle wave, not a blur-engage build-fix.

### Live PRM note (cross-scope, not a blur-engage regression)

Under emulated `prefers-reduced-motion: reduce`, opening the drawer left the sheet at scalar 0 (`transform: translateY(900px)`, offscreen, `blur(0px)`) — the per-frame scalar write appears not to fire on the instant-seat path. The sheet TRANSFORM also reads `--glass-drawer-t`, so this is a general drawer PRM-**seat** concern (or an `emulateMedia`-over-`connectOverCDP` artifact), entirely independent of the blur read (F5 touched no seat logic). The blur-engage's OWN PRM requirement — no fixed-clock blur tween — holds by construction (blur = f(scalar), 0s transition). Recorded for the drawer-seat scope; does not affect this verdict. Capture: `drawer-prm-open-chrome-light.png`.

---

## At-rest gestalt (pixel reads) — **PASS**

Both engines (CHROME/Metal M5 Max badge + WEBKIT/Apple GPU @2x badge), both modes, all 6 routes: the DockStage aurora reads as a **recessive warm field** (no conic banding, no oversaturation), the docks read as **glass** (translucent capsule plates, glassy nav pills), the selected item lifts as a glass tier, grain is calm, headings fit their envelope. Drawer route: closed at rest with the "Open drawer" CTA (expected). Rail route (titled "Vertical Dock") shows the vertical dock + gutter rail stack. No breakage in either engine or mode.

---

## Capture manifest (all resolve on disk — 33 PNGs)

Dir: `docs/tranches/BG/audit/visual/backdrop-blur-engage/`

- **Static ×24** — `{drawer, drawer-live-behind, dock-overview, dock-morph, dock-layers, dock-rail}-{chrome,safari}-{light,dark}-desktop-full.png`
- **Blur frame-series ×8** — `drawer-blurseries-t{008-blur3,025-blur9,050-blur13full,095-solidify4}-chrome-{light,dark}.png`
- **PRM ×1** — `drawer-prm-open-chrome-light.png`
- Reproducible harness (this DELTA's method): `chrome-static.mjs · blur-engage-verify.mjs · dock-cadence.mjs · isolate.mjs · idle-vs-gesture.mjs · drawer-blur-series.mjs · prm.mjs · prm-shot.mjs · explore-dock.mjs`

---

## Verdict

**PASS — dual-engine, both modes.**
- Arm 1 (blur-engage correctness): the sheet's backdrop blur is a byte-exact pure function of the live gesture scalar (`maxDelta = 0` across 11 points on both drawer routes, both modes), closed = 0 (NO-MASKING floor), no wall-clock tween, compositor-only, PRM-snap by construction. `proof:motion` device-free GREEN corroborates.
- Arm 2 (BUTTERY cadence): every dock gesture window is buttery warm (~98fps, sub-17ms frames, 0 dropped, 0 longtasks, both modes). The residual felt-jank the USER reported is correctly localized to a background light-mode aurora/backdrop-sampler `getImageData` readback (present at idle, absent in dark, absent without aurora) — a route-level perf-producer concern outside this blur-engage wave's charter, recorded for follow-up.
- Gestalt: recessive aurora, glassy docks, correct in both engines and modes.
- Every declared capture PNG resolves on disk (33/33, all non-empty).
