# H-glass-cohesion — RED-TEAM: TOTAL glass cohesion

**Verdict: GAPS-FOUND** (one BLOCKER-class non-glass surface; one missing enforcing wave; the
keyframes-I.W6 fold lost in the AX→AY hand-off).

Lane charge: enumerate EVERY glass surface and prove they share ONE discipline — rest-specular
OFF, the bounded edge-gleam, the blur ladder, the oklab tint axis, the `--glass-level` knob, and
hover-reads-on-hover. Identify which AY wave ENFORCES it. Assay the keyframes-I.W6 19-bloom-track
non-cohesion.

---

## The surface inventory (the cohesion matrix)

I read `src/styles/glass.css` (the unified `.glass-material` mixin), `src/styles/tokens.css`
(the `--glass-*` token ladder + `--glass-level` + specular cohort), and every component's
surface composition. The matrix:

| surface | tier composed | in `.glass-material` ::before/rim group? | honors `--glass-level`? | oklab tint axis? | rest-specular | VERDICT |
|---|---|---|---|---|---|---|
| Button (default/glass/glass-wash) | `glass-wash`+`btn-glass` | YES (via `glass-wash` rung) | YES | YES | 0 (cohort) | COHESIVE |
| Card | `glass-card` | YES | YES (blur via quiet) | YES | 0.04 opt-in (tame) | COHESIVE |
| Input/Textarea/NumberFieldInput | `input-pill` | NO ::before specular (input has none — correct) | YES (W54 `--glass-blur-quiet`) | n/a (reads `--glass-bg-quiet`) | n/a | COHESIVE |
| Dialog | `glass-floating rounded-dialog` | YES | YES | YES | 0 | COHESIVE |
| Sheet | `glass-floating` (sheetVariants) | YES | YES | YES | 0 | COHESIVE |
| Popover | `glass-floating` | YES | YES | YES | 0 | COHESIVE |
| Select (content) | `glass-floating` | YES | YES | YES | 0 | COHESIVE |
| Select (trigger) | `glass-wash[role=combobox]` | YES | YES | YES | 0 | COHESIVE |
| Combobox (list) | `glass-floating` | YES | YES | YES | 0 | COHESIVE |
| HoverCard | `glass-floating` | YES | YES | YES | 0 | COHESIVE |
| Command | `glass-floating` | YES | YES | YES | 0 | COHESIVE |
| DropdownMenu (content+sub) | `glass-floating` | YES | YES | YES | 0 | COHESIVE |
| Tooltip | `glass-floating` | YES | YES | YES | 0 | COHESIVE |
| Toast | `glass-floating` | YES | YES | YES | 0 | COHESIVE |
| Notification | `glass-wash` + `shadow-elevated` | YES (wash rung) | YES | YES | 0 | MINOR (tier+shadow mismatch — see F4) |
| dock SHELL (`.glass-dock`) | hand-rolled `--glass-bg-dock` | **NO — by design, parallel surface** | YES (blur+bg via `--glass-level`) | YES (oklab @ element) | **no ::before specular at all** | DIVERGENT-BY-DESIGN (see F2) |
| dock CONTROLS (icon/tab/select/dropdown triggers) | `.dock-icon-button` etc. | YES (explicitly comma-listed) | partial | YES (W55 bucket) | 0 (cohort) but **always-wired** | NON-COHESIVE (see F1) |
| Slider (`.glass-slider`) | hand-rolled track+thumb | **NO (0 refs in glass.css group)** | **NO** (`blur(2px)` literal, not a `--glass-blur-*` rung) | partial (range uses oklab) | bespoke gradient "grip" | **NON-COHESIVE (see F3)** |
| Drawer (`.glass-drawer`) | **`background-color: var(--background)` — OPAQUE** | **NO** | **NO** | **NO** | **none — not glass** | **BLOCKER (see F5)** |

The overlay band (Dialog→Tooltip→Toast→Command→DropdownMenu→HoverCard→Combobox→Select) is
genuinely cohesive: every one rides `glass-floating`, which is comma-listed in the unified
`.glass-material::before` (specular) + rim + grain + `--glass-level` groups (`glass.css:54-65,
83-94, 421-458`). That band is SOLID and should be recorded as such so AY does not churn it.

The breaks are at the EDGES of the band: the Drawer (not glass at all), the Slider (hand-rolled,
off the knob), the dock-control specular wiring (the keyframes-I.W6 19-track tell), and the
absence of any AY wave that PROVES the whole set.

---

## F1 — The keyframes-I.W6 19-bloom-track non-cohesion is REAL, MISDIAGNOSED in the fold doc, and ORPHANED in AY

`docs/tranches/AX/coordination/from-keyframes-IW6-dock-button-specular.md:11-17` reports 19 dock/
`<Button>` specular tracks bloom while the Cards are clean, and dispositions it as "folds into
**W54 (glass-first ROOT)** … when AX publishes the W54 cut, keyframes bumps and the 19 tracks
clear." Two problems:

1. **The disposition is wrong about the mechanism.** The doc claims rest=0 (it cited
   `tokens.css:1973`; the live token is `tokens.css:2271 --glass-specular-intensity-rest: 0`)
   already makes the surfaces clean, so the bloom is a Card-style default-off miss. But the
   keyframes "19 tracks" count is the keyframes.js ANIMATION RUNTIME counting active interpolation
   tracks — the `--specular-x` / `--specular-y` `@property` transitions declared
   unconditionally on every `.glass-material::before` (`glass.css:151-154`). The dock controls
   (`DockIconButton.vue:40` composes `glass-specular-track`; `:style="specularStyle"` at line 69)
   and the glass Button variants wire `useSpecularTracking` so the moving-specular `::before`
   transition is ALWAYS attached, even though the rest INTENSITY is 0 (the layer is invisible but
   the transition tracks exist). Setting `--glass-level` (W54) does NOTHING to the specular axis —
   W54 is the opacity+blur knob; the specular is the orthogonal W52 axis (CLAUDE.md AX.W54 note:
   "level = opacity+blur; tint = legibility; disjoint"). So the W54 publish CANNOT clear the 19
   tracks — the fold is to the wrong wave.

2. **The fold is orphaned.** W54 is an AX wave that already SHIPPED. The AY plan (`AY.md`) carries
   no fold-through of the keyframes-I.W6 edge — `grep -in "specular" AY.md` returns ZERO hits.
   The only "cohesion" rows are W-DOCK2 (animation lockstep) and W-SB3 (story language). Nothing
   in AY enforces the specular default-off / always-wired-track discipline across Button + the
   dock controls. This is a CHRONIC-MISS: flagged at keyframes I.W6, dispositioned to a closed AX
   wave, never re-folded into AY, and the keyframes tranche is told to consume "the publish edge"
   that does not exist.

**Root cause.** The specular `::before` transition is wired on EVERY material surface
(`glass.css:151-154`) regardless of whether the surface is interactive or ever wired. Card was
made opt-in (the `useSpecularTracking` call is the wire-or-omit gate per the composable header) so
the stage cards show 0 tracks; the dock controls + glass Button variants call the seam
unconditionally, so 19 tracks attach. The cohesion fix is to make the moving-specular TRANSITION
itself opt-in (or scope it to `:hover`/`:active`/`:is(...)` selectors so the idle track does not
attach), matching the Card discipline — NOT to lean on `--glass-level`.

## F2 — The dock SHELL carries NO specular while every overlay-band sibling does — a cohesion seam, not just a "by design" exemption

`glass.css:48-50` documents the dock shell as OUT of `.glass-material` "BY DESIGN — it hand-rolls
a parallel surface". That is defensible for the bg/blur (the `--glass-bg-dock` element-level oklab
tint is load-bearing for the W55 bright bucket). But the consequence is that the dock SHELL has no
edge-gleam / moving-specular at all — its only `::before` is the `variant-instrument-strip`
engraved bezel (`dock/shell.css:359`), a different effect. So a Dialog and a Dock sitting side by
side read as two DIFFERENT materials: the Dialog catches a moving pointer gleam, the dock plate is
inert. The user's standing ask is "ONE animation/design/interaction language" (PROMPT-CORPUS #5,
#11, #14). A dock that does not share the band's catch-light is a cohesion gap the AY plan must
either (a) bring onto a shared edge-gleam token, or (b) record as a DELIBERATE exemption with a
gate, not leave as an undocumented divergence. Right now it is the latter.

## F3 — The Slider is OFF the `--glass-level` knob and hand-rolls its specular

`Slider.vue:199` sets `backdrop-filter: var(--slider-range-blur, blur(2px))` — a LITERAL `blur(2px)`
fallback that does NOT route through any `--glass-blur-*` rung, so it does NOT scale with
`--glass-level`. When a consumer sets `--glass-level: 0` (the opaque escape, or
`prefers-reduced-transparency: reduce` which sets it on `:root`, `glass.css:881-887`), EVERY other
glass surface flattens to solid — but the Slider track keeps its `blur(2px)`. That is the exact
gestalt-collapse W54 was built to prevent ("every glass surface — current and future — flattens
with no per-rung enumeration", `glass.css:876-880`), defeated by one literal. The Slider also
hand-rolls its specular as a static `linear-gradient` "grip" on the thumb (`Slider.vue:228-235`)
and is 0-referenced in the unified `.glass-material::before` group (`grep -c glass-slider
glass.css` → 0), so it neither shares the moving-specular discipline NOR the rest-off cohort. The
AY slider-consolidation waves (W-SLD1/W-SLD2) collapse the zoo to `glass-scrubber`+`spectrum` but
say NOTHING about routing the consolidated sliders onto `--glass-level` + the shared edge-gleam —
the consolidation must ALSO converge the slider onto the one model.

## F4 — Notification tier + shadow are off-ladder

`Notification.vue:10` composes `glass-wash` + `shadow-elevated`. `glass-wash` is the LIGHTEST rung
(~0.30α, `blur(1px)` sub-perceptual) — authored for small detail tiles, not a chrome surface a
user reads as a floating notification. Every other floating-chrome sibling (Toast, Popover,
Dialog, Sheet) rides `glass-floating`. And `shadow-elevated` is NOT a `--glass-shadow-*` ladder
rung — it is a parallel shadow token, so the Notification's lift does not compose the
`--glass-material-rim` + `--glass-under-shadow-*` stack the rest of the band carries. Notification
should ride `glass-floating` (or at minimum `glass-resting`) with the ladder shadow, not the
wash-tile rung + an off-ladder shadow. Minor, but it is exactly the kind of per-component
divergence the cohesion bar exists to catch.

## F5 — BLOCKER: `.glass-drawer` is OPAQUE — the one "glass" surface that paints no glass

`src/styles/drawer.css:35-51`:
```
.glass-drawer {
    ...
    border: 1px solid var(--border);
    background-color: var(--background);   /* SOLID — not a --glass-bg-* tier */
    box-shadow: var(--shadow-2xl);          /* not a --glass-shadow-* rung */
}
```
The class is NAMED `glass-drawer` and the file header (`drawer.css:5`) says "glass-ui owns the
LOOK: the glass sheet surface" — but it composes NO `backdrop-filter`, NO `--glass-bg-*` tier, NO
`--glass-level`, NO oklab tint, NO rim, NO specular. It is a solid `--background` plate with a
plain border. Under the MAXIMAL glass-first canon (AX.W54 — "Glass is the DEFAULT surface register
for EVERY band … overlay band is the glass band", `glass.css:13-18`) the Drawer is an
overlay-band sheet and should be the MOST glass of all. It is the single largest cohesion break in
the library: every overlay sibling is `glass-floating`, the Drawer alone is opaque. It also misses
the W55 bright-backdrop bucket (a live-behind drawer over a bright page is the canonical
over-light case the W55 darken was built for) and the forced-colors WHC skin
(`glass.css:944-962` lists the ladder rungs + `glass-floating`/`glass-overlay` but NOT
`.glass-drawer`, so the Drawer gets no WHC structure restoration either). This is not a tune — the
Drawer surface must be re-authored onto `glass-floating` (or `glass-overlay`) with the ladder
shadow, the same way Dialog/Sheet were flipped in W54.

## F6 — No AY wave ENFORCES total cohesion; `proof:glass-one-model` is an 8-file canary, not an inventory

The charge asks "which AY wave enforces it." Answer: NONE. `AY.md` has no glass-cohesion wave.
The closest existing gate, `proof:glass-one-model` (`scripts/proof-glass-level.mjs:95-160`), is a
SAMPLED whitelist — it checks exactly 8 named surfaces (SegmentedTabs, ui TabsIndicator, Alert,
TagsInput, input-pill, `--glass-bg-dock`, Button default, Card opaque-tier). It does NOT enumerate
the glass-surface inventory; it does NOT cover Drawer (F5), Slider (F3), Notification (F4), the
dock-shell specular (F2), or the always-wired-specular-track discipline (F1). It is a regression
canary for 8 past fixes, not a cohesion enforcer. The GOLDEN done-definition needs an
inventory-complete gate: enumerate every component that paints a glass surface, assert each routes
through a `--glass-*` tier (not a raw `bg-background`/`bg-card`/literal-blur), honors
`--glass-level`, and that the moving-specular transition is opt-in (not idle-attached). Without
the gate, F1–F5 will silently re-drift.

---

## Convergence criteria (the acceptance bar for "glass cohesion PERFECTED")

1. Every component painting a glass surface routes through a `--glass-*` tier (one of the five
   rungs, `glass-card`, `glass-dock`, `input-pill`, or the named `.glass-opaque` escape) — ZERO
   raw `bg-background`/`bg-card`/`background: var(--background)`/literal-`blur()` glass surfaces
   off the legibility allowlist. `.glass-drawer` paints `glass-floating`/`glass-overlay`.
2. Every glass surface flattens to solid `--card`+`blur(0)` when `--glass-level: 0` — verified by
   setting the knob and π-readback over a busy backdrop (the Slider track flattens too).
3. The moving-specular `::before` transition is OPT-IN (wire-or-omit) like Card — an idle/unwired
   surface attaches ZERO specular animation tracks. The keyframes-I.W6 19-track count → 0
   (captured against a keyframes.js consumer, the cardinal-lesson DELTA).
4. The dock shell either shares the band edge-gleam token or carries a documented exemption with
   a gate row (no undocumented divergence).
5. An inventory-complete `proof:glass-cohesion` gate enumerates the full surface set and machine-
   locks 1–4; it supersedes the 8-file `proof:glass-one-model` canary (or extends it to the full
   inventory). Lint + `vue-tsc --noEmit` + the gate green before close.
