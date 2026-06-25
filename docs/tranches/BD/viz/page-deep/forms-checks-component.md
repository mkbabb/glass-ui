# forms/checks — COMPONENT deep audit (Pass-E)

**Page:** `demo/stories/forms/checks.vue` · **Components demoed:**
`src/components/ui/switch/Switch.vue` · `src/components/ui/checkbox/Checkbox.vue` ·
`src/components/ui/radio-group/RadioGroupItem.vue` (+ `RadioGroup.vue`).
Shared seams: `_shared/useControlSize.ts` (`switchSizeClass`), `@utility transition-control`
+ `tap-squish` + `touch-hit-area` (`utilities/btn.css` / `base.css` / `a11y-overrides.css`),
`glass-wash` + `glass-specular-track` (`glass/material.css`), tokens `--control-checked-bg` /
`--control-ring` / `--glass-bg-wash` / `--shadow-md` / `--glass-highlight` / `--spring-snappy`.

Read at HEAD on `master`. Scope: the COMPONENT (not the demo page).

---

## What the three atoms actually are

- **Switch** — reka `SwitchRoot`/`SwitchThumb`. Track composes `glass-wash glass-specular-track`
  (the ONLY checks-atom large enough — 24×44px — to read as glass per AY.W-PRIM-POLISH D7-A).
  Geometry is a derived `--switch-*` quad anchored on `--switch-track-h = --control-h-md × 0.6`
  (BC.W-CONTROL-CUSTOM — no magic literals; `default` resolves the HEAD `w-11 h-6 / h-5 w-5 /
  translate-x-5` byte-identically). Thumb is `bg-card` warm-cream (BC.W-CONTROL-SMOOTH retired
  the `bg-background` slab) + `--shadow-md` + `--glass-highlight`, throwing on a real
  `--spring-snappy` translate.
- **Checkbox** — reka `CheckboxRoot`. 16px, `rounded-control border-primary`, checked/indeterminate
  fill `--control-checked-bg`. Check/Minus lucide glyph; `tap-squish` press + `touch-hit-area`.
- **RadioGroupItem** — reka `RadioGroupItem`. 16px, `rounded-pill border-(--control-ring)`,
  checked fill `--control-checked-bg`, filled `Circle` indicator; `tap-squish` + `touch-hit-area`.

---

## (1) ANIMATION — the headline finding

**Four-state contract:** PRESENT on all three (rest / hover / active-press / disabled). Press is
`tap-squish` → `scale: var(--scale-press)` on `--spring-smooth`, PRM-zeroed. Switch thumb throw is
a genuine spring (`--spring-snappy` on `translate` — the sanctioned spring-on-transform exception,
motion-canon P1 SPATIAL). Surface legs (`transition-control`) cross-fade bg/border/shadow/color on
the bezier `--ease-standard` (P1 EFFECTS — correct, no wobble on color). Disabled = `opacity-disabled`.

**The GAP (HIGH-animation-affordance bar, NOT met):**

1. **NO entrance/exit on the Checkbox check-mark + the Radio dot.** The `CheckboxIndicator` /
   `RadioGroupIndicator` glyph hard-appears — no draw-on, no scale-in, no `@starting-style` pop.
   reka force-mounts the indicator and the only state animation is the FILL cross-fade
   (`transition-control` paints `bg`/`color`); the glyph itself snaps. iOS-26 checks POP the
   mark in (a spring scale-from-0 + a stroke draw). This is the single biggest dead-animation
   miss on the page — the mark is the affordance and it has zero entrance.
2. **NO hover register on any of the three.** `transition-control` has no `:hover` scale/lift and
   the atoms carry no `hover:` utility. The Switch track (glass-bearing) gets the moving specular
   `::before` on pointer-move, but the dock/button family's hover scale-lift (`--scale-hover-*`)
   is absent — the checks read static until pressed.
3. **No coupled press-brightness on the Switch track.** `<Card :pressable>` couples a
   `--card-press-t` brightness leg with the squish (motion-canon P3); the Switch press is
   thumb-translate only — the track does not deform/brighten under press. Sub-perceptual, but
   the iOS toggle catches light as the thumb throws.

## (2) PROCEDURAL VIZ — N/A (no aurora/blob/fourier on this page's components).

## (3) PERFORMANCE — clean.
Compositor-only throughout: press is `scale`, thumb is `translate`, surface legs are
paint props (bg/color/border/shadow). NO layout property animates (`proof:no-layout-animation`
holds). No rAF, no offscreen-pause concern (no canvas). `touch-hit-area` is a coarse-only
`::before` (fine-pointer byte-identical). No thrash.

## (4) SAFARI — compatible.
`--spring-snappy` is a `linear()` easing (Safari 17.4+; the project's baseline). `color-mix(in srgb)`
+ `backdrop-filter` (via `glass-wash`) are Safari-supported. The moving-specular `::before` reads
`--mouse-x/y` custom props (no Safari issue). `data-[state]` attr selectors + `translate`/`scale`
longhands are universal. No `:has()`-on-the-atom, no container-query on the atom. **No Safari gap.**

## (5) IDIOMATIC / no-legacy — strong, two micro-notes.
- The `bg-background` shadcn-slab thumb is already RETIRED (BC.W-CONTROL-SMOOTH → `bg-card`); the
  `switch` row in `W-DESHADCN-census.md` is the reskin-target, DONE. `ring-0` is the deliberate
  inherited-ring zero, not a shadcn halo — correct keep.
- The Switch geometry quad is exemplary (derived, token-first, no literals). The `--switch-*`
  bracket-utility chain inlines four `calc()`s in the `cn()` class string — it WORKS and is
  byte-faithful, but it is a long arbitrary-utility wall on the SFC; a `.switch-track` recipe in
  `glass/surfaces.css` (the `.input-pill` precedent) would be the more idiomatic home. MINOR —
  not a defect, a transposition opportunity.
- Checkbox/Radio sit OFF the glass register by ALLOWLIST design (16px is below where glass reads
  over a flat substrate — AY.W-PRIM-POLISH ARM B). Correct, not a gap. The check-FILL is
  `--control-checked-bg` = `primary 88% + glass-bg-floating` — a glass-tinted fill, the right call.

## (6) SIX-LAYER GLASS COMPOSITE.
- **Switch track: PRESENT.** `glass-wash` (backdrop blur+saturate + surface tint via `--glass-bg-wash`)
  + `glass-specular-track` joins the `.glass-material` group → moving-specular `::before` (inner
  catch-light, layer 4) + rim `::after` (`--glass-edge-light`, layer 3) + the track's drop shadow.
  Grain rides the shared `::after`. All six layers reachable on the track.
- **Thumb:** `--shadow-md` (drop) + `--glass-highlight` (inner catch-light, the `inset 0 0.5px`
  top gleam) + `bg-card` warm tint. Partial-composite by design (a thumb is a solid control disc,
  not a glass plate) — correct.
- **Checkbox/Radio: ABSENT by design** (allowlist; 16px atoms). Not a finding.

---

## Mapping to the BD tranche

| # | Finding | Disposition | Wave |
|---|---|---|---|
| (1).1 | Checkbox check-mark + Radio dot have NO entrance (hard-snap glyph) — the affordance is dead-on-arrival | **AUGMENT** | **NEW** `BD.W-CHECKS-INDICATOR-POP` — a spring scale-in + stroke-draw on the indicator (compositor-only, PRM-static, `@starting-style`/keyframe; shares the `--spring-snappy` clock the Switch thumb uses). Sibling of the missing-animation class; born-RED gate over `data-[state=checked]` indicator entrance. |
| (1).2 | No hover register on the three atoms | **AUGMENT** | same NEW wave (a sub-perceptual `--scale-hover` + specular pre-arm on the Switch track) OR FOLD into `BD.W-BLOB-MOTION-TUNE`'s sibling motion bar — but cleanest as the checks-indicator wave's second arm. |
| (1).3 | Switch press has no coupled track brightness (P3) | **AUGMENT** | same NEW wave — a `--switch-press-t` brightness leg coupled with the thumb throw (the `.glass-press` `--card-press-t` precedent). Lowest priority of the three. |
| (5) | `--switch-*` quad is a 4-calc arbitrary-utility wall on the SFC | **MODIFY** (transpose) | **FOLD** into `BD.W-DESHADCN-CANON` / a control-recipe note, OR a thin `BD.W-SWITCH-RECIPE` — lift the quad into a `.switch-track` recipe in `glass/surfaces.css` (the `.input-pill` home). Byte-identical, idiom-only. Low priority. |
| page | Each sub-section in its own glassy card + bigger main area + aurora bg (USER ask) | already scoped | `BD.W-FORMS-CARD-FOLD` (the demo-page fold onto `<Card>`/`<ShowcaseFrame>`) — the page-layout half. This audit confirms the COMPONENTS are fold-ready (no per-atom blocker). |
| — | `bg-background` slab thumb, no-shadcn | **PRUNE** (already done) | BC.W-CONTROL-SMOOTH (shipped) — no BD action. |

**Net:** ONE new wave warranted — **`BD.W-CHECKS-INDICATOR-POP`** (the indicator-entrance + hover +
press-brightness motion arm; the genuine HIGH-animation-affordance gap). Everything else is
FOLD-into-existing or already-shipped. No PROCEDURAL/PERF/SAFARI defect.
