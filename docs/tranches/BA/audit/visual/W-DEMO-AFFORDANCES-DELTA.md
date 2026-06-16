# BA.W-DEMO-AFFORDANCES — DELTA (the demo's controls made worthy)

**Wave**: BA.W-DEMO-AFFORDANCES (Batch 6) — one play register, one trigger
convention, the glass-routed container vocabulary, the curve picker re-conceived
as the dock-like glass chip rack.
**Captured**: 2026-06-15T18:51Z (own-surface π readback at `:5199`,
chromium-headless-new, BOTH modes, ≥2 viewports).
**Surface-hash** (sha256 of the concatenated surface files below): `8f93a6ccf8eddb2004274f937f30dcfff03db3bf74ccec91037ce7ad7e46fd6f`

**Surface-paths** (the files this wave touched, hashed in this order):

```
demo/stories/StoryPlayButton.vue
demo/stories/motion/curve-gallery.vue
demo/stories/motion/springs.vue
demo/stories/motion/curve-gallery/BezierEditor.vue
demo/stories/feedback/toaster.vue
demo/stories/feedback/skeleton.vue
demo/stories/feedback/notification.vue
demo/stories/composables/use-global-dark.vue
demo/stories/composables/use-dark-mode-sync.vue
src/styles/glass/surfaces.css
scripts/proof-demo-affordances.mjs
```

## The defects (R8 re-opens, baselined)

The AZ.W-MOTION2 close marked the curve-gallery `complete`/`live-verified` on the
SOURCE diff while BOTH the play control and the picker eroded live (the WVR
`W-MOTION2 → ERODED R8-16/R8-17` re-open, the AZ P-1 source-green/visually-broken
close-class this wave fixes):

- **R8-17 — the play blob.** `curve-gallery.vue:186` stacked `.btn-pill` +
  `.glass-btn` on ONE element. `.glass-btn` is the fixed-square icon primitive
  (`width/height: var(--size-icon-btn)` ≈40px + `contain: paint`); the fixed
  square won and `contain: paint` clipped the wrapped `▶ Play family` text into a
  ~40px blob. Ground: `ground/R8-17-play-button.png`.
- **R8-13a — the full-width flat trigger.** `toaster.vue:30` — a lone
  `<Button variant="default">` as the SOLE direct child of a `flex flex-col`
  column stretched to the full container width (the implicit `align-items:
  stretch`, no `w-full`). Ground: `ground/R8-13-button-large-uninteresting.png`,
  `ground/R8-13-not-glassy-b.png`.
- **R8-16 — the awful picker.** The 12-family picker was `<SegmentedTabs
  variant="underline">`; the active family read the DIMMEST label (the
  contrast-color re-point lifted the inactive `--muted-foreground` tabs to white
  L100 while the active `--foreground` stayed L90 below them — the inverted
  hierarchy), and a dead `backdrop-filter` on a transparent strip washed the grid
  into a frameless rectangle. Ground: `ground/R8-16-awful-scrolling-item.png`.
- **FD-FS X-2 — the off-glass plates.** `bg-card/60` opaque-ish slabs at
  skeleton/notification/springs read dead on the dark register.

## The fix (own-surface, BOTH modes)

| # | mechanism | after |
|---|---|---|
| 1 | the ONE play register | `demo/stories/StoryPlayButton.vue` — a content-width `<Button>` + leading Lucide `<Play>` (Play↔Pause `playing` register, `@play` emit, `label?`). The `.btn-pill+.glass-btn` stack RETIRED outright onto it. Adopted at every play/replay site: curve-gallery "Play family", springs "Play"/"▶ Play", BezierEditor "▶ Trace the curve", + the per-card target gains a discoverable leading `<Play>`. |
| 2 | the ONE trigger convention | each lone column-flex trigger (`toaster.vue`, `use-global-dark.vue`, `use-dark-mode-sync.vue`) wrapped in a content-width `flex items-center gap-3` row — content-width, never the column-stretch slab. |
| 3 | the glass-routed container | the 5 `bg-card/60` plates re-pointed: skeleton ×3 + notification ×1 onto `<ShowcaseFrame>` (the glass-routed `resting` tier), springs range cells onto the `.glass-quiet` tier. |
| 4 | the curve-picker chip rack | the `<SegmentedTabs underline>` + the `:deep()` retune REPLACED by a DEMO-LOCAL glass chip rack: each family a glass chip, SELECTED = `var(--dock-control-active-bg)`/`var(--glass-bg-floating)` plate lift (the dock "selected reads as glass" iOS register), hover = `var(--glass-bg-resting)`, label = warm-ink `--foreground`. The active signal is a PLATE — structurally immune to the contrast-color inversion. Composes `<FadingScroll axis="x">` as the overflow arm (the dead transparent-strip `backdrop-filter` GONE); a `<Select>` is the narrow floor. All 12 families (11 CURVE_FAMILIES + Custom) preserved as the IA. |
| 5 | the bottom-padding rhythm | CONSUMES W-STAGE's ShowcaseFrame `caption`/`#caption` captioned-frame affordance (landed; the chassis is W-STAGE's bound — not edited here). The fourier-field figcaption fix is W-FOURIER-STUDIO's surface (cross-wave note below). |

The negative-predicate ANCHOR lives in `src/styles/glass/surfaces.css` (a comment
above the `.glass-btn` recipe documenting the IG-A4 caller hazard; no recipe
change to `.glass-btn`/`.btn-pill`).

## The paired π readback (the binding truth — `tests-visual/demo-affordances.spec.ts`)

12 passed / 2 skipped (the mobile chip-rack arms intentionally skip — the rack is
the desktop+ register, the narrow floor is the `<Select>` arm). All fail-CLOSED.

- **(a) curve-picker — the inversion DEAD, BOTH modes (desktop).** The SELECTED
  chip's resolved background is a real glass plate (translucent, α > 0.1), NOT
  `none`/transparent: light `color(srgb 0.984 0.973 0.956 / 0.8)`, dark
  `oklab(0.283 … / 0.880)`. The selected-plate luminance > the unselected chips'
  (`rgba(0,0,0,0)` → 0) in BOTH modes — the active signal is a PLATE not an
  fg/muted-fg delta, so the R8-16 dimmest-selected inversion is structurally
  impossible. The rack renders the full 12-family IA + Custom.
- **(a-narrow) the `<Select>` floor renders below the breakpoint** (the chip rack
  is `hidden` at narrow widths).
- **(b) the play control is content-width, BOTH modes × BOTH viewports.** The
  "Play family" control's painted width EXCEEDS the fixed `--size-icon-btn` square
  — content-width, never the ~40px clipped blob.
- **(c) the lone trigger is content-width.** The "Fire a toast" trigger width <
  its parent column width − 8px (not the full stretch).
- **(d) the re-pointed container composites as glass, BOTH modes.** The skeleton
  `<ShowcaseFrame>` resolves a translucent (α < 1) glass tier, not the opaque
  `bg-card/60`.

Captured frames (after): `W-DEMO-AFFORDANCES-curve-desktop-{light,dark}.png`,
`W-DEMO-AFFORDANCES-toaster-desktop-light.png`,
`W-DEMO-AFFORDANCES-skeleton-desktop-{light,dark}.png`,
`W-DEMO-AFFORDANCES-notification-desktop-{light,dark}.png`. Before baselines:
`../ground/R8-{13-button-large-uninteresting,13-not-glassy-b,16-awful-scrolling-item,17-play-button}.png`.

Live console-error sweep across all 5 affected routes + a chip-click + play-click
interaction: **0 errors**.

## proof:demo-affordances (the device-free SOURCE arm) — GREEN

```
W1 no .glass-btn+.btn-pill stack : YES  (class:0 text:0; anchor:YES)
W2 one play register, no ▶       : YES  (▶:0 miss:0; register:YES)
W3 no full-width lone trigger    : YES  (hits:0)
W4 no bg-card/60 in enrolled set : YES  (hits:0)
status: PASS
```

Born-RED at HEAD (W1 the curve-gallery stack + text-bearing icon button; W2 3× ▶ +
3 register-miss; W3 3 lone column-flex triggers; W4 5 bg-card/60 plates) → GREEN at
close.

## proof:ba-gestalt verdict rows (carried to W-REFLECT2 — the GESTALT BAR, BA inv-4)

The per-mechanism W1-W4 greens + the π readback do NOT close this visual wave; the
affected surfaces are judged as a gestalt. This wave's operative-PASS verdict for
the W-REFLECT2 `motion-fourier` + `glass-feedback` roster surfaces:

| surface | route | light | dark | verdict |
|---|---|---|---|---|
| curve-gallery (picker + play) | `/motion/curve-gallery` | PASS | PASS | the chip rack reads as a tactile glass rack; the selected family is unambiguous (plate-lit, not dimmest); the play control is a legible content-width Button; per-card cards read activatable |
| toaster (trigger) | `/feedback/toaster` | PASS | — | the lone trigger sits content-width with a leading Play glyph, no viewport-wide slab |
| skeleton (containers) | `/feedback/skeleton` | PASS | PASS | the card/list frames composite as glass over the staged backdrop, not dead opaque slabs |
| notification (container) | `/feedback/notification` | PASS | PASS | the tones table is a glass-routed frame; the house feedback-tone swatches read |
| springs (play + range cells) | `/motion/springs` | PASS | PASS | the play controls are the one register; the range cells read as quiet glass |

The `proof:ba-gestalt` ROSTER is W-REFLECT2's bound (never edited here); these rows
are this wave's operative-PASS verdict for W-REFLECT2 to consume.

## Cross-wave coordination notes

- **W-FOURIER-STUDIO consumes `<StoryPlayButton>`** (the agent-unit-1 deliverable;
  declared in the DAG §6 — unit 1 lands FIRST). The register is landed + available;
  its spec stubbed the import until this integration.
- **`demo/stories/substrates/fourier-studio.vue` is a W-FOURIER-STUDIO bound
  (untracked at HEAD) carrying a typecheck error** (`disabled` prop passed to
  `<LabeledSlider>` at `:351`, which does not accept it) — NOT this wave's file,
  NOT caused by this wave's changes. Recorded for W-FOURIER-STUDIO. This wave's
  library typecheck (`src/`) + build are GREEN; the demo typecheck error is
  isolated to the sibling-wave file.
- **`demo/stories/motion/curve-gallery.vue` was ALSO touched by W-FOURIER-STUDIO**
  (it added a `StepsEditor` import + `STEPS_FAMILY` const for its REC-6 live
  steps sub-editor) — a concurrent additive edit on a file the spec assigned to
  this wave's unit 2 only. The edits are non-conflicting (its additive
  imports/const + my picker/play rebuild coexist); recorded as a file-contention
  event for the orchestrator's index.
- **The padding-rhythm fix (scope 7)** consumes W-STAGE's `caption`/`#caption`
  ShowcaseFrame affordance (landed); the `fourier-field.vue` figcaption fix is
  W-FOURIER-STUDIO's surface (not owned here).

## §0 drift recorded (re-grep at HEAD)

- `curve-families.ts` MOVED: `demo/stories/motion/curve-families.ts` (NOT under
  `curve-gallery/`; the `curve-gallery/` dir holds only `BezierEditor.vue` +, at
  HEAD via W-FOURIER-STUDIO, `StepsEditor.vue`).
- `CURVE_FAMILIES` holds **11** families (Standard/Sine/Quad/Cubic/Expo/Circ/Back/
  Bounce/Steps/Linear()/Springs); the §0 "grep -c family: = 12" counted the
  keyframes-canon GROUP list. The full picker IA = 11 + Custom = **12 chips**.
- `notification.vue` plate at `:79` (NOT `:74` as §0 cited).
- `springs.vue:170` is a plain `Play` text `<Button>` (NOT `▶`); `:249` is the
  `▶ Play` glyph. Both migrated to `<StoryPlayButton>`.
- `FadingScroll` + the ShowcaseFrame `caption` affordance ARE landed (no interim
  SegmentedTabs `overflow="scroll"` fallback needed).
