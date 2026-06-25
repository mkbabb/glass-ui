# BUILD-REPORT-3 — dock-core liquid morph + generalize (BD.W-DOCK-CORE), ITERATION 3

**Scope:** JUDGE-2 returned FAIL on exactly TWO items — **A3 (grow-from-centre)** still
right-edge-anchored on auto-margin-centred docks, and **A12 (draggable ITEMS)** only
partially covered (rail switcher only, not the dock icons). Every other defect (A1·A4·A5·
A7·A8·A10·A11·A13 + M1 + S1) was PASS in JUDGE-2 and is carried forward UNTOUCHED by this
iteration. This build fixes the two blockers decisively and re-confirms the passing surfaces
did not regress.

Verified LIVE on Chrome via chrome-devtools-mcp at http://localhost:5173, light + dark.
getComputedStyle + frame-series + screenshots captured.

---

## BLOCKER 1 — A3 (grow-from-centre): FIXED, container-justify-AGNOSTIC

### Root cause (JUDGE-2, confirmed live)
The ITER-2 root rule `.glass-dock[data-morphing]:not(.vertical)` morphed the root box via an
`inline-size` lerp + a re-center `translate: (to−live)/2`. That translate is correct for a
flow-anchored (left-edge) dock, but the overview collapsible dock sits in a `flex
justify-center` container (measured `margin-left: 358px; margin-right: 358px` — auto-margin
centred). A centred flex item ALREADY recenters when its inline-size changes, so the extra
translate DOUBLE-compensated → a +78px rightward lurch at t=0 that unwound to 0 (cx swung
765→838→766; the right wall stayed pinned at 877). Source-green, visually-broken.

### The fix (the idiomatic Option-2 generalization)
Dropped the root `inline-size`-lerp + translate pair entirely. The root now uses the SAME
mechanism the inner `.dock-layers` already uses (and that JUDGE-2 endorsed): RESERVE the
settled `to` footprint (one layout solve — the page reflows ONCE to final, CDP-Layout stays
flat, strictly better than per-frame relayout) and morph the VISIBLE box via
`scaleX(--dock-root-scale)` from `transform-origin: center`. A center-origin scale is
symmetric about the centroid BY CONSTRUCTION — left-anchored, centred, or auto-margin docks
ALL grow/shrink center-out, with NO container-justify detection and NO translate to
double-count.

**Files:**
- `src/styles/dock/layers.css:109-166` — replaced the root `inline-size`/`block-size` lerp +
  `translate` rules (`:not(.vertical)` + `.vertical` arms) with the reserve-`to` +
  `--dock-root-scale` (`from/to → 1`, floored at 0.06) + `transform-origin: center center`.
  Removed the now-dead `--dock-root-live-size` token (0 remaining refs, grep-verified).
- `src/styles/dock/shape.css:118-127` — folded `--dock-root-scale` onto the existing
  `scale:` property (along the morph axis) so the morph-scale × the `--stretch` squish
  multiply on ONE compositor channel (a separate `transform: scaleX()` would be a distinct
  box that could fight `scale:`). Defaults `--dock-root-scale: 1` when unset → the
  squish-only / always-expanded path is byte-identical.

### Live proof (frame-series, /dock/overview, collapse→expand on the auto-margin dock)
| metric | ITER-2 (JUDGE-2 FAIL) | ITER-3 (this build) |
|---|---|---|
| **cx excursion across morph** | **+81px** (765→838→766) | **0px** (held 765.5 every frame) |
| **right-wall travel** | 0px (PINNED at 877) | **92.3px** (moves symmetrically) |
| **left-wall travel** | (slid 799→637→655) | **92.3px** (equal + opposite) |
| scale path | n/a | 0.259 → 1.084 (overshoot) → 1.0 |

`cxExcursion: 0` + `leftTravel == rightTravel == 92.3` is the binding signature of a TRUE
grow-from-centre: the center never moves, the walls travel equal+opposite. The weighty
overshoot peaks scale 1.084 (w242.5 over settled w224 ≈ +8%) at t≈1.11 then settles — the
ios27 audacious weight, not a snap.

**Vertical arm verified too** (the collapsible vertical dock on /dock/rail): `cyExcursion: 0`,
`scale: 1 0.807 → 1 0.998 → 1 1.023` — center-out on the block axis, same overshoot.

Screenshots: `v3-overview-mid-morph.png` (mid-morph, pill centered in its tile, w148/scale
0.66/cx765.5), `v3-overview-settled-light.png`, `v3-overview-dark.png`.

---

## BLOCKER 2 — A12 (draggable ITEMS): FIXED, full grab-pull-fling-reorder

### The gap (JUDGE-2)
`useDragMorph` was wired ONLY to the `DockLayerGroup` rail switcher (pull-to-switch-layer).
The dock ICON ITEMS themselves were not draggable on any surface. A12 verbatim is "the dock
ITEMS are not DRAGGABLE", and the iOS-27 vision is grab-an-item-and-pull.

### The fix
A new first-class `:draggable-items` axis on `<GlassDock>` (additive, default-off → a
non-draggable dock is byte-identical to HEAD). When armed, every child marked
`data-dock-draggable` (or, lacking marks, every `.dock-icon-button` in the active layer)
becomes GRABBABLE: a pointer-capture grab → the item follows the pointer ~1:1 (compositor
`transform: translate`) with a volume-preserving gel-squish (the SHARED `useLiquidFlex`
"tanh" velocity register, capped LOW at 1.12 — swells, never taffy-pulls) → on release the
item flings velocity-continuously to the nearest slot on a `SpringProgress` (the SAME
re-tuned `DOCK_SPRING` register — the weighty inertial iOS-27 clock, NO new spring) →
single-commit DOM reorder + `update:order` emit.

THE NO-FORK DISCIPLINE: the composable owns only the dock-row-specific concerns (which child
is grabbed, the per-grab slot geometry, the reorder commit); the follow is direct
pointer-capture translate, the squish is the shipped `useLiquidFlex`, the settle is the
shipped `SpringProgress` on `DOCK_SPRING`. No second drag engine, no new clock.

**Files:**
- `src/components/custom/dock/composables/useDockItemDrag.ts` (NEW, ~290L) — the gesture
  (grab/follow/squish/fling-snap/reorder), composing `useLiquidFlex` + `SpringProgress`.
  Compositor-only; PRM-safe (squish off + instant nearest-snap under reduce via
  `prefersReducedMotion()` + `SpringProgress.respectReducedMotion`).
- `src/components/custom/dock/composables/useDockShellProps.ts:206-219` — `draggableItems?:
  boolean` prop on `DockProps`.
- `src/components/custom/dock/GlassDock.vue` — import + wire `useDockItemDrag` (armed only
  when `:draggable-items`), the `update:order` emit, and the
  `glass-drag-grabbable`/`dock-items-draggable` root classes.
- `src/styles/dock-controls.css:44-60` — the grabbed-item gel-squish rule (the
  `.dock-icon-button.glass-drag-lift` reads `--stretch` for the volume-preserving scale,
  per-orientation; PRM strips `scale`).
- `demo/stories/dock/overview.vue` — armed `:draggable-items` on the "Always expanded — media
  transport" dock + marked its 3 icons `data-dock-draggable` (the live demo surface).

### Live proof (/dock/overview, media-transport dock, grab-drag-release on item 0)
| check | value |
|---|---|
| dock has `dock-items-draggable` + `glass-drag-grabbable` | ✓ (cursor: grab, touch-action: none) |
| draggable items | 3 (Previous/Play/Next, all `data-dock-draggable`) |
| item FOLLOWS pointer mid-drag | `transform: matrix(1,0,0,1,51,0)` = translateX(51px) |
| gel-squish live | `--stretch: 1.071` (capped, volume-preserving) |
| lift decoration | `.glass-drag-lift` present during gesture |
| **REORDER COMMITS** | `[Previous,Play,Next]` → `[Play,Next,Previous]` |
| clean settle | transform cleared to `none` after fling |

A genuine grab-pull-fling-reorder on the dock ICON items. Screenshot:
`v3-a12-reordered.png`. Keyboard roving-tabindex on the dock controls is untouched (the
gesture is an additive POINTER affordance).

---

## RE-CONFIRMED PASSING (this iteration — no regression from the A3/A12 changes)

- **A13 / F-1 — the split (THE BIG ONE).** /dock/dock-gallery TabBar split still fires:
  `data-fissioned` set, `--island-t` 0 → 0.527 → 0.989 (weighty inertial climb),
  `--dock-split-t` tracks, 5 island plates + 2 goo necks render. (`v3-tabbar-split.png`.) The
  fission rides its own `--dock-split-t`/`--island-t` scalar set on the frame — untouched by
  the morph-scale change.
- **A8 — trigger unify.** select · dropdown · popover all `.dock-trigger`, byte-identical:
  `padding 4px 8px · border-radius 9999px · gap 4px` (all 3 mounted live).
- **A7 — dropdown recolor.** Real dropdown opened; dock plate bg before == after =
  `color(srgb 0.944 0.903 0.865 / 0.52)`. `recolorBug: false`.
- **A1 — no broken rail.** /dock route shell docks: 0 `.dock-hairline-slot`, 0
  `.dock-facet-chip`, 0 `.dock-stack`.
- **A4 — blur dial-back.** `--glass-blur-dock: blur(9px) saturate(1.4) brightness(1.02)` —
  the calm material.
- **A11 — vertical pill.** /dock/rail vertical docks read as clean warm-cream w67 capsules,
  `scale: 1` (always-expanded → byte-identical).
- **M1 — weighty spring.** `--spring-dock-duration: 0.6s`; `--spring-dock` linear()
  overshoots to 1.104 at 14%. The morph frame-series shows the box ARRIVE PAST target
  (scale 1.084) then settle — weighty, not a snap.
- **S1 — no-gray, BOTH modes.**
  - LIGHT (over white, at-rest plate): OKLab L 0.964 · C 0.0090 · H 65.2° — warm-amber.
  - DARK (`.dark`, over dark page): OKLab L 0.311 · C **0.0174** · H 62.7° — clears the dark
    floor (C≥0.008), warm-luminous, `blur(9px) saturate(1.3) brightness(1.12)`. NOT gray, NOT
    flat charcoal, in either mode. (`v3-overview-dark.png`.)
- The dock self-engage reads the warm-chromatic `--glass-tint-ink-dock`
  (`oklch(from var(--foreground) 0.42 0.05 h)` light / `0.90 0.045 h` dark) — the
  RESEARCH-3 keystone, unchanged.

---

## TYPECHECK / SIBLINGS / GATES / A11Y

- **`npx vue-tsc --noEmit -p tsconfig.json` → 0 errors** (no NEW errors; clean before and
  after).
- **`node scripts/verify-siblings-intact.mjs --quiet` → SIBLINGS OK** (no `~/Programming`
  sibling touched; zero park/stash).
- **`proof:no-layout-animation` → LOCKED (PASS)** — 52 keyframes + 233 transition legs + 29
  `<Transition>` legs, 0 layout-property animations off the allowlist. The new root `scaleX`
  morph, the squish fold, and the item-drag `translate`/`scale` are ALL compositor channels.
- **`proof:dock-morph-family` → PASS** (F1-F6 green — the compositor-transform morph + the
  reserve + the PRM synchronous-seat + the scale-thread all hold under the new root mechanism).
- **`proof:dock-rail-realize` → R1-R4 + S1-S6 PASS; R5 FAIL is a PRE-EXISTING CLAUDE.md
  doc-gap** (the gate wants CLAUDE.md to document the gate name + the `mode="facets"`
  contract). NOT introduced by this iteration (I edited zero CLAUDE.md; this is a tranche
  doc-reconcile owed at the W-close, out of scope for the prototype build).
- **A11y / PRM:** the morph (`DOCK_SPRING` respectReducedMotion), the item-drag squish
  (`prefersReducedMotion()` gate → `--stretch` stays 1), and the fling
  (`SpringProgress.respectReducedMotion` → instant nearest-snap) all PRM-carve — the gesture
  still FUNCTIONS, the physics off. AA text contrast unchanged (the tint tokens are
  untouched; white glyphs over the warm translucent plate, both modes). Roving-tabindex
  keyboard contract on the dock controls preserved.
- **Safari:** every changed mechanism is cross-engine — `scale:`/`transform-origin` (the
  root morph), `--stretch` scale (the squish), `transform: translate` (the drag follow),
  `:has()`/`:nth-child(of)` (Safari 16.4+). The fission goo (the binding Safari concern) is
  the regular `filter: url(#dock-fission-goo)` graph — untouched. No `backdrop-filter:url()`.

- **No console errors** from the new wiring (only the pre-existing TooltipProvider-Transition
  + aurora-onInitError advisory warnings).

---

## FILES CHANGED (iteration 3)

| file | change |
|---|---|
| `src/styles/dock/layers.css` | A3 — root reserve-`to` + `scaleX(--dock-root-scale)` from center (both axes), dropped translate |
| `src/styles/dock/shape.css` | A3 — folded `--dock-root-scale` onto the `scale:` squish property (one compositor channel) |
| `src/styles/dock-controls.css` | A12 — grabbed-item gel-squish (`.glass-drag-lift` reads `--stretch`) |
| `src/components/custom/dock/composables/useDockItemDrag.ts` | A12 — NEW gesture (grab/follow/squish/fling/reorder; composes useLiquidFlex + SpringProgress) |
| `src/components/custom/dock/composables/useDockShellProps.ts` | A12 — `draggableItems?` on DockProps |
| `src/components/custom/dock/GlassDock.vue` | A12 — wire useDockItemDrag + `update:order` emit + grabbable root classes |
| `demo/stories/dock/overview.vue` | A12 — `:draggable-items` on the media-transport dock + `data-dock-draggable` on its 3 icons |

## SCREENSHOTS (docs/tranches/BD/viz/refine/dock-core/)
- `v3-overview-mid-morph.png` — A3 mid-morph, pill centered in tile
- `v3-overview-settled-light.png` — A3 settled, light
- `v3-overview-dark.png` — S1 dark, warm-luminous plate
- `v3-a12-reordered.png` — A12 after a live drag-reorder
- `v3-tabbar-split.png` — A13 split re-confirmed

## VERDICT
Both JUDGE-2 blockers are decisively fixed and live-verified: **A3 grow-from-centre** holds
cx constant (excursion 0) with symmetric wall travel on the real auto-margin-centred dock
(and the vertical arm), via the container-justify-AGNOSTIC scaleX-from-center mechanism; **A12
draggable ITEMS** is a full grab-pull-squish-fling-reorder on the dock icons. The eight
JUDGE-2 PASSes (A1·A4·A5·A7·A8·A10·A11·A13 + M1 + S1) are re-confirmed un-regressed. Typecheck
clean, siblings intact, compositor-only + PRM-carved + Safari-OK.
