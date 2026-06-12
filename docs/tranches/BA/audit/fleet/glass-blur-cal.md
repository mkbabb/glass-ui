# BA fleet lane — glass-blur-cal (R8-19)

**Directive (R8-19):** "The glass blur for every glass element is just a hair too much. Dial that
back everywhere." → a global calibration pass on the `--glass-blur-*` ladder; a small UNIFORM
reduction; ONE knob-family edit, never per-site.

**Discipline:** audit-only, no source edit. Live-probed on :5199 (light + dark), DOM overrides
applied only as a non-destructive A/B then reset clean.

---

## 1. The mechanism (source ground-truth)

The blur ladder is fully token-first and routes through ONE family of SIX length primitives in
`src/styles/tokens/glass.css:33–50`:

```
--glass-blur-wash-radius:     1px    (glass.css:33)
--glass-blur-quiet-radius:    10px   (glass.css:34)
--glass-blur-resting-radius:  12px   (glass.css:35)
--glass-blur-floating-radius: 16px   (glass.css:36)
--glass-blur-overlay-radius:  15px   (glass.css:44)  [→ 24px on @media min-resolution:2dppx, light-dark.css:30–34]
--glass-blur-dock-radius:     11px   (glass.css:50)
```

These feed the composed tokens (`glass.css:57–85`), each shaped
`blur(calc(<radius> * var(--glass-level))) saturate(…)`:

```
--glass-blur-wash / -quiet / -resting / -floating / -overlay / -dock / -btn
```

`--glass-blur-btn` (`glass.css:85`) reads the **quiet radius** (10px) — the glass BUTTON variant.

`--glass-level` (registered `@property`, `inherits:true`, `tokens/property-regs.css:118–122`) is
the clarity multiplier that ALSO scales opacity (`level=0` → solid `--card` + `blur(0)`). It is
therefore the WRONG knob for this calibration — dialing `--glass-level` down would make every glass
surface more transparent too. The correct knob-family is the six **radius primitives**, which scale
the blur radius ALONE and leave the opacity seam untouched.

### Live painted-radius confirmation (1dppx display)

Probed resolved `:root` tokens + walked live surfaces across `/`, `/containers`, `/dock`:

| tier | radius token | painted `blur()` (live) | representative consumer |
|---|---|---|---|
| wash | 1px | `blur(1px)` | MetricCell tile, segmented-tab strip |
| quiet | 10px | `blur(10px)` | metric-badge, instrument-chassis, glass BUTTON (`--glass-blur-btn`) |
| resting | 12px | `blur(12px)` | `.glass-resting` cards (the canonical plate) |
| floating | 16px | `blur(16px)` | Dialog (`role=dialog .glass-floating`), Toast, HoverPopover, dock-icon hover-chip |
| overlay | 15px (→24px @2dppx) | `blur(15px)` | modal-over-modal `.glass-overlay` |
| dock | 11px | `blur(11px)` | `.glass-dock` shell (via `--dock-surface-blur`, shell.css:17) |

Confirmed live: Dialog = `blur(16px)`, dock = `blur(11px)`, card = `blur(12px)`. Overriding a radius
primitive at `:root` re-resolved the downstream composed token (`--glass-blur-floating` →
`blur(calc(13px * 1)) saturate(1.18)`) — the token-first propagation proven in-browser.

---

## 2. The defect (live read, both modes)

The current ladder over-diffuses the backdrop. Live A/B on `/dock/overview` (the demo dock floats
over a blue-sky photo): at the shipped 11px dock radius the sky structure behind the pills reads as
a flat smear; at a proposed 9px the cloud gradient shows slightly more structure THROUGH the pill
while the glass still reads unmistakably as glass. The delta is intentionally small — matching the
user's "a hair too much." Same character on `.glass-resting` cards (12px) and the Dialog/Toast
floating tier (16px, the heaviest non-modal rung — most visibly over-blurred).

Captures (beside this report):
- `glass-blur-cal-dock-light-CURRENT-11px.png` vs `glass-blur-cal-dock-light-PROPOSED-9px.png` (the A/B)
- `glass-blur-cal-dock-DARK-CURRENT-11px.png` (dark register)
- `glass-blur-cal-dialog-light-16px.png` (the floating-tier dialog)

The dark register is not a separate blur defect — the blur radii are mode-agnostic (no `.dark`
re-declaration of any `--glass-blur-*` token; the `.dark` arm flips only color/foreground). The
over-diffusion reads in BOTH modes equally; the dark-flatness the R8 cluster flags is a tint/
contrast issue (other lanes), not a blur-radius one.

---

## 3. Proposed calibrated ladder (~15–20% uniform reduction, in-band)

A single edit to the six radius primitives in `tokens/glass.css`. The reduction is proportional
(preserves the tier separation), keeps the AV.W7-F2 8–15px budget band, and leaves wash at 1px
(already sub-perceptual — nothing to dial back there):

```
--glass-blur-wash-radius:     1px    (unchanged — sub-perceptual)
--glass-blur-quiet-radius:    10px → 8px
--glass-blur-resting-radius:  12px → 10px
--glass-blur-floating-radius: 16px → 13px
--glass-blur-overlay-radius:  15px → 13px   (+ the @2dppx restore 24px → ~20px, light-dark.css:32)
--glass-blur-dock-radius:     11px → 9px
```

`--glass-blur-btn` needs NO separate edit — it reads `--glass-blur-quiet-radius`, so it tracks the
quiet reduction (10 → 8px) automatically. This is the entire surface of the change: 6 token values
(+1 high-res restore value). The exact target numbers are a tuning call for the wave — these are the
A/B-validated direction (a uniform ~−2/−3px / ~15–20% pull), not a final spec.

The `--glass-level` knob is explicitly NOT touched (it scales opacity too; wrong axis). The
per-rung `saturate()`/`brightness()` companions are NOT touched (R8-19 is blur only).

---

## 4. The token-first win — consumers needing ZERO change

Because every glass surface composes a `--glass-blur-*` token (NOT a hardcoded `blur(Npx)`), the
six-value edit reaches the ENTIRE surface with no per-site change. Confirmed consumers (all inherit
automatically):

- **Ladder tiers** — `.glass-wash/-quiet/-resting/-floating/-overlay` (`glass/ladder.css:39,59,70,96,110`)
- **Dock** — `.glass-dock` via `--dock-surface-blur` (`dock/shell.css:17`); dock-rail-extend chip (`dock/rail-extend.css:244`)
- **Components** — Dialog (`DialogContent.vue` → `glass-floating`), Toast (`Toast.vue:55` → `glass-floating`),
  HoverPopover (`hover-popover.css:22`), Drawer (`drawer.css:52`), floating-panel (`floating-panel.css:10`),
  instrument-chassis (`instrument-chassis.css:47`), metric-badge (`utilities/components.css:32`),
  segmented-tabs surfaces (`segmented-tabs.css:34,51`), glass-refract (`glass-refract.css:57`),
  veil (`cards.css:85`), timeline dot (`scale-paper.css:153`), glass BUTTON variants (`button/index.ts:72`)
- **Theme bridge** — the `--blur-glass-*` Tailwind aliases (`theme/bridges.css:302–307`) re-resolve
  through the same radii.

**Out of scope (separate knobs — do NOT fold in):**
- `--top-layer-backdrop-blur` (8px, `animations.css:366`) — the MODAL SCRIM dim behind a `dialog`,
  a dim-scrim not a glass-surface backdrop. A consumer/wave could pull it too, but it is a distinct
  knob, not part of the `--glass-blur-*` family.
- `segmented-tabs.css:161` `filter: blur(0.5px)` — a DISABLED-tab defocus, not a glass plate.
- Slider thumb halo `blur(2px)` (`Slider.vue:203`) — already rides `--glass-level`.
- `animations.css:7–12` `filter: blur(4px)→blur(0)` — a transient entrance keyframe.

**Gate impact: none.** No proof gate asserts a literal blur RADIUS value (checked `proof-*.mjs`,
`gates.mjs`). The gates assert STRUCTURE — the `calc(<radius> * var(--glass-level))` recipe shape,
the `-webkit-backdrop-filter` mirror (`proof-webkit-backdrop.mjs`), the `none`-on-reduced-
transparency bracket. So the calibration re-baselines no gate expectation; it is a clean token-value
edit. (A wave may optionally add a regression assert that the radii sit within the AV.W7-F2 band.)

---

## 5. Wave-spec seed

ONE small wave: edit six radius primitives (+1 high-res restore) in `tokens/glass.css` (and the
`@2dppx` value in `light-dark.css:32`); leave wash at 1px; leave `--glass-level` and the
`saturate()`/`brightness()` companions untouched; re-capture the A/B π on the dock-over-photo +
the floating dialog in both modes to confirm "glass still reads as glass" at the reduced radii.
Zero consumer edits. The numeric targets in §3 are the validated direction; final values are a
tuning pass within the wave.
