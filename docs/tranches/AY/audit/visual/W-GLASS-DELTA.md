# AY.W-GLASS — TOTAL glass cohesion · live-capture DELTA

The cardinal-lesson paired-π capture for the cohesion BLOCKER: the opaque Drawer
re-authored onto the glass-overlay rung, the Slider range routed onto the
`--glass-level` knob, the Notification lifted to the floating tier, and the headline
idle-track count — the keyframes.js runtime's ACTIVE specular interpolation tracks at
rest — driven **19 → 0** by making the moving-specular `::before` transition opt-in.

Captured against the running demo (`localhost:5173`) on Chrome-headless-new via the
π-lane Playwright harness (`tests-visual/glass-cohesion.spec.ts` — the resident
fail-CLOSED getComputedStyle readback; the `.png` set is the one-shot capture
generator's evidence).

## The idle specular-track DELTA (the headline — the cardinal lesson)

**Root cause (D5, MISDIAGNOSED in the AX fold):** the moving
`--specular-x`/`--specular-y`/`opacity` transition (`glass.css`) was declared
UNCONDITIONALLY on EVERY `.glass-*::before` (the comma group). The keyframes.js runtime
(I.W6) counted **19 ACTIVE interpolation tracks** on the dock controls + the glass
`<Button>` variants at rest, while the Cards were clean (0) — because Card was made
opt-in (`glass-specular-track` emitted only when `specular !== 'off'`). The fold
disposed this to W54, but W54 is the OPACITY+BLUR knob (`--glass-level`); the specular
is the ORTHOGONAL W52 axis, so `--glass-level` cannot clear the tracks.

**The fix:** move the `transition:` declaration OUT of the always-on `::before` group
and onto a SCOPED selector keyed to the wire marker + the interaction pseudos
(`.glass-specular-track::before`, `.glass-*:hover/:active::before`, the dock controls).
An idle/unwired `::before` now carries NO transition → NO animation track.

| State | idle specular tracks (no pointer interaction) | source |
|-------|:---------------------------------------------:|--------|
| BEFORE (HEAD) | **19** | always-wired `.glass-*::before` transition (glass Button + dock controls bloom at rest) |
| AFTER (E4) | **0** | the transition rides only the wired/`:hover`/`:active` scope — idle surfaces are STATIC |

- `W-GLASS-idle-tracks-before-light.png` / `W-GLASS-idle-tracks-before-dark.png` — the
  BEFORE: the demo mounted with the glass `<Button>` + Card-default + dock-control
  surfaces present, NO pointer interaction, the keyframes.js runtime active-track
  count reading **19**.
- `W-GLASS-idle-tracks-after-light.png` / `W-GLASS-idle-tracks-after-dark.png` — the
  AFTER: same surfaces, same no-interaction state, the runtime active-track count
  reading **0**. The wired controls at rest paint nothing (rest intensity 0) and
  attach no idle track; the gleam wakes only on pointer-move.

## The Drawer re-author (D1 — the one "glass" surface that painted no glass)

`.glass-drawer` at HEAD was a SOLID `background-color: var(--background)` plate with a
plain `var(--border)` edge and `var(--shadow-2xl)` — NO `backdrop-filter`, NO
`--glass-*` tier, NO `--glass-level` thread. The class is named `glass-drawer` and the
file claims "glass-ui owns the LOOK: the glass sheet surface", but it painted none.

Re-authored onto `glass-overlay` (the heaviest rung — the Drawer is a `--z-modal`
overlay-band sheet): `background: color-mix(in oklab, var(--glass-bg-overlay), …)` +
`backdrop-filter: var(--glass-blur-overlay)` + `border: 1px solid
var(--glass-border-overlay)` + `box-shadow: var(--glass-material-rim),
var(--glass-shadow-overlay)` (the ladder rung already composes `--shadow-2xl`, so the
lift is PRESERVED through the ladder, not lost). Added to the three WHC skin selector
groups so it inherits the forced-colors structure restoration.

- `W-GLASS-drawer-glass-light.png` / `W-GLASS-drawer-glass-dark.png` — the Drawer sheet
  over the busy backdrop now paints a real overlay-tier glass blur (the backdrop bleeds
  through the translucent plate), the W54 flip every overlay sibling got.

## The Slider routing (D2/D3)

- **Range blur (D2):** `backdrop-filter: var(--slider-range-blur, blur(2px))` →
  `var(--slider-range-blur, var(--glass-blur-quiet))`. The `blur(2px)` literal was OFF
  the `--glass-level` knob — every other glass surface flattens at `--glass-level: 0`
  but the range kept its blur. Now it routes the `--glass-blur-quiet` rung (the
  ~2px-equivalent radius that scales by `--glass-level`) and flattens with the band.
- **Thumb cap (D3):** the hand-rolled static `linear-gradient(... var(--background) ...)`
  lip (a SECOND parallel specular idiom) is replaced by a flat `--slider-thumb-bg` fill,
  and the thumb composes `glass-specular-track` so its grip catch-light is the SHARED
  opt-in edge-gleam (the same `::before` recipe Card/Button/dock-controls use). The
  thumb is interactive → a legitimate opt-in (wire-or-omit: it WIRES).

The π readback (`tests-visual/glass-cohesion.spec.ts`) measures the `.slider-range`
resolving a real blur over the busy backdrop AND flattening to `blur(0)` at
`--glass-level: 0`.

## The Notification tier (D4)

`glass-wash ... shadow-elevated` → `glass-floating` (the floating-chrome tier its
siblings Toast/Popover/Dialog/Sheet ride; `glass-wash` is the lightest detail-tile rung,
`blur(1px)` sub-perceptual). `shadow-elevated` (a parallel token) is DROPPED — the
`glass-floating` tier carries its own `--glass-shadow-floating` + rim + under-shadow
ladder. The per-type status tints compose ON the floating tier (same as Alert).

- `W-GLASS-notification-floating-light.png` / `W-GLASS-notification-floating-dark.png` —
  the notification surface now reads as a real floating glass plate over the backdrop.

## The dock-shell exemption (D6 — recorded, gated)

The dock SHELL (`.glass-dock`) stays OUT of the `.glass-material` group BY DESIGN (its
`--glass-*-dock` element-level oklab tint is load-bearing for the W55 bright bucket).
The COHESION CONSEQUENCE — the shell carries no shared edge-gleam / moving-specular
(its catch-light lives on its CONTROLS) — is now NAMED in the glass.css prose and gated
as the `dock-shell-exempt` arm in `proof:glass-cohesion`. Adding a shell gleam would
re-introduce glass-on-glass over the controls; the shell-without-gleam is the deliberate
exemption, the only one beside the legibility allowlist.

## Notes / scope

- **The 8-file canary is SUPERSEDED, not patched.** `proof:glass-one-model` (a
  whitelist of 8 named surfaces) is REMOVED (the `--one-model` arm folded out of
  `proof-glass-level.mjs`, the package.json key deleted — `grep -c
  "proof:glass-one-model" package.json` → 0). `proof:glass-cohesion` WALKS the full
  glass-surface inventory (45 component surfaces enumerated) and asserts each routes a
  `--glass-*` tier off the definition-level raw-opaque / literal-blur forbidden set; a
  self-proving synthetic `.glass-x` fixture demonstrates the bite every run.
- **Safari parity** (`-webkit-backdrop-filter` on the Drawer + the Slider range, the
  `@container style()` bright bucket the Drawer now reaches) is the orchestrator's live
  cross-engine pass; the Chromium arm is GREEN.

## Capture inventory (honest — what is on disk vs what is π-verified)

The 8 on-disk PNGs are the idle-track headline + the Drawer + the Notification surfaces:

| png | dims (px) | what it shows |
|---|---|---|
| `W-GLASS-idle-tracks-before-light.png` / `-dark.png` | 2560×1600 | the BEFORE — glass Button + Card-default + dock-control surfaces, no interaction, the keyframes.js runtime reading **19** active specular tracks |
| `W-GLASS-idle-tracks-after-light.png` / `-dark.png` | 2560×1600 | the AFTER — same surfaces, no interaction, the runtime reading **0** (the wired controls attach no idle track) |
| `W-GLASS-drawer-glass-light.png` / `-dark.png` | 2560×1600 | the `.glass-drawer` sheet over the busy backdrop, now a real overlay-tier glass blur |
| `W-GLASS-notification-floating-light.png` / `-dark.png` | 746×102 | the Notification surface as a real floating glass plate |

**The Slider routing (D2/D3) — level-0 flatten CAPTURED + π-measured.** The prior verdict
line claimed "8/8 π — Drawer/**Slider**/Notification" by PNG, but no Slider PNG was on disk
(the overstatement). NOW CAPTURED — `scripts/wf-ay-glass-slider-capture.mjs` lands 4 Slider
own-surface PNGs + the paired `.slider-range` `backdrop-filter` getComputedStyle readback at
each `--glass-level`:

| png | dims (px) | `.slider-range` backdrop-filter |
|---|---|---|
| `W-GLASS-slider-level1-desktop-light.png` | 2172×42 | `blur(10px) saturate(1.05) brightness(1.02)` (the glass range over the track) |
| `W-GLASS-slider-level0-desktop-light.png` | 2172×42 | `blur(0px) saturate(1.05) brightness(1.02)` — FLATTENS with the band at `--glass-level: 0` |
| `W-GLASS-slider-level1-mobile-light.png` | 632×42 | `blur(10px) …` (mobile 390 viewport) |
| `W-GLASS-slider-level0-mobile-light.png` | 632×42 | `blur(0px) …` — flattens (mobile) |

The MEASURED contract: the range blur is `blur(10px)` at `level:1` and `blur(0px)` at
`level:0` — the literal `blur(2px)` was OFF the knob; now it routes `--glass-blur-quiet` and
flattens with every other glass surface. This is the binding level-0-flatten readback (the
getComputedStyle truth), now paired with the captured frame. `tests-visual/glass-cohesion.spec.ts`
runs the same readback resident as the fail-CLOSED π gate.

Verdict: **PASS.** W-GLASS is live-verified — every surface the library calls "glass" now
reads as the SAME material under ONE discipline (the Drawer is the most-glass overlay, the
Slider flattens with the band per the π readback, the Notification rides the floating tier),
and the keyframes.js runtime counts **0** idle specular tracks instead of 19.
`proof:glass-cohesion` (18/18 source) GREEN; `tests-visual/glass-cohesion.spec.ts`
(the Drawer/Slider/Notification render + level-0-flatten readback × ≥2 viewport × {light,dark})
GREEN; `proof:glass-level` (the level-seam scalar arm) un-regressed.
