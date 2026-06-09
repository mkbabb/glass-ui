# AY.W-GLASS — TOTAL glass cohesion: re-author the opaque Drawer; Slider onto `--glass-level`; opt-in specular

**Band F — cohesion + structure. Type: impl. State: DEV-COMPLETE (source landed this session; the cardinal-lesson PNG capture is the one open arm). Repo: glass-ui.**

> **AS-BUILT (this session).** E1–E9 SOURCE landed and verified at HEAD: `drawer.css`
> re-authored onto `glass-overlay` (`drawer.css:51-58` — `color-mix(in oklab, var(--glass-bg-overlay), …)`
> + `var(--glass-blur-overlay)` + `var(--glass-material-rim), var(--glass-shadow-overlay)`); the Slider
> range routes `var(--glass-blur-quiet)` (`Slider.vue:205-206`) and the thumb composes
> `glass-specular-track`; Notification rides `glass-floating` (`Notification.vue:10`); the moving-specular
> transition is scoped to `.glass-specular-track::before` / `:hover` / `:active` (`glass.css:97,175,202`).
> `scripts/proof-glass-cohesion.mjs` is authored + registered (`package.json:663`, `gates.mjs:638`,
> `ci.yml`); `proof:glass-one-model` is REMOVED from `package.json` (deletion-proof holds). The π spec
> `tests-visual/glass-cohesion.spec.ts` is authored; the DELTA prose is at
> `audit/visual/W-GLASS-DELTA.md`. **The ONE OPEN ARM:** the W-GLASS-DELTA references 8 PNGs
> (`W-GLASS-idle-tracks-{before,after}-{light,dark}.png`, `W-GLASS-drawer-glass-{light,dark}.png`,
> `W-GLASS-notification-floating-{light,dark}.png`) that do NOT exist on disk — the cardinal-lesson
> requires a CAPTURED artefact, not a prose-only DELTA (see §"Open arm" below). The HARD GATE clause 3
> cannot mint `live-verified` until the PNG pair is on disk.

**Band F — cohesion + structure. Type: impl. State: NET-NEW (as authored). Repo: glass-ui.**

Plan basis: `audit/hardening/H-glass-cohesion.md` (the surface inventory + F1–F6),
`audit/hardening/H-a11y-perf.md` (H-2 the slider's own `-webkit-backdrop-filter` inconsistency
cross-ref), `audit/hardening/H-motion-cohesion.md` (the §6 register the specular transition must
keep). This wave OWNS the BLOCKER-class cohesion gaps; the `proof:animation-coherence` register
widening is W-MOTION's, the W55-default-engage + the specular-write rAF-coalesce is W-A11Y-PERF's
(this wave only changes WHICH selectors carry the moving-specular transition, not the write seam).

**WRITE-SCOPE OVERLAP (recorded, resolved).** This wave and W-MOTION BOTH register a new gate into
`scripts/gates.mjs` + `package.json` + (via `gates:emit-ci`) `.github/workflows/ci.yml`. W-GLASS
adds `proof:glass-cohesion` (`gates.mjs:638`) and REMOVES `proof:glass-one-model`; W-MOTION adds
`proof:animation-coherence` (`gates.mjs:481`) and toggles its CI tag. These are DISJOINT GATE ROWS in
the same three files — append-only `GATES` entries + distinct `package.json` script keys — so the
edits do NOT conflict at the line level; the only true shared artefact is the GENERATED `ci.yml`,
which is byte-locked by `proof:gen-ci-fresh` and regenerated (never hand-edited) AFTER both gate rows
land. Resolution: whichever wave lands second runs `npm run gates:emit-ci` + `proof:gen-ci-fresh` to
re-byte-lock the manifest carrying BOTH new steps; the byte-lock gate is the arbiter (a manifest that
omits either gate reds). As-built: both rows are present in `gates.mjs` and `ci.yml` carries 4 matches
across the two gate names — the overlap is RECONCILED.

---

## Goal criterion

Every surface the library calls "glass" reads as the SAME material under ONE discipline: it routes
its background through a `--glass-*` tier (one of the five rungs / `glass-card` / `glass-dock` /
`input-pill` / the named `.glass-opaque` escape), its blur scales by the `--glass-level` knob so
the whole set flattens to solid `--card` + `blur(0)` at `level:0`, its lift composes the
`--glass-shadow-*` ladder (not a parallel shadow token), and the moving-specular catch-light is
OPT-IN (wired-or-omitted like Card) so an idle/unwired surface attaches ZERO specular animation
tracks. After this wave the Drawer is the most-glass overlay (not an opaque plate), the Slider
track flattens with everything else, Notification rides the floating tier, and the keyframes.js
runtime counts 0 idle specular tracks instead of 19. The user's standing "ONE design/material
language" ask (PROMPT-CORPUS #5/#11/#14) holds across the FULL inventory, not just the overlay band.

## Completion criterion

The single hard gate `proof:live-verified-ledger` row for this wave is `live-verified` backed by:
(a) the NET-NEW `proof:glass-cohesion` source+inventory gate GREEN and CI-tagged (it SUPERSEDES the
8-file `proof:glass-one-model` canary — the `proof:glass-one-model` package.json key is REMOVED, not
left dead); (b) the π render readback `tests-visual/glass-cohesion.spec.ts` GREEN — Drawer + Slider
+ Notification each paint a real `backdrop-filter` glass blur over a busy backdrop AND each flatten
to opaque `--card` + `blur(0)` when `--glass-level: 0` is set on `:root`; (c) the captured idle-track
DELTA `audit/visual/W-GLASS-DELTA.md` showing the keyframes.js consumer's idle specular-track count
went 19 → 0 (the cardinal-lesson DELTA, paired before/after). Lint + `vue-tsc --noEmit` green.

---

## The defects (file:line-grounded, from H-glass-cohesion)

### D1 — BLOCKER: `.glass-drawer` is OPAQUE — the one "glass" surface that paints no glass

`src/styles/drawer.css:45-50`:
```css
border: 1px solid var(--border);
border-bottom: 0;
border-start-start-radius: var(--radius-panel);
border-start-end-radius: var(--radius-panel);
background-color: var(--background);   /* SOLID — not a --glass-bg-* tier */
box-shadow: var(--shadow-2xl);          /* not a --glass-shadow-* ladder rung */
```
The class is named `glass-drawer` and the file header (`drawer.css:5-6`) claims "glass-ui owns the
LOOK: the glass sheet surface", but it composes NO `backdrop-filter`, NO `--glass-bg-*` tier, NO
`--glass-level` thread, NO oklab tint, NO `--glass-material-rim`, NO specular. It is a solid
`--background` plate with a plain border. Under the AX.W54 MAXIMAL canon ("Glass is the DEFAULT
surface register for EVERY band … the overlay band IS the glass band", `glass.css:13-18`) the Drawer
is an overlay-band sheet and should be the MOST glass of all — every overlay sibling (Dialog/Sheet/
Popover/Toast) was flipped to `glass-floating` in W54; the Drawer alone was missed. It also misses
the W55 bright-backdrop bucket (a `mode="live-behind"` drawer over a bright page is the CANONICAL
over-light case) AND the forced-colors WHC skin (`glass.css:944-962` lists the rungs + `glass-floating`/
`glass-overlay` but NOT `.glass-drawer`, so the Drawer gets no WHC structure restoration). Consumer
binding: `src/components/ui/drawer/DrawerContent.vue:35` composes `cn('glass-drawer', props.class)`.

### D2 — Slider track is OFF the `--glass-level` knob (literal `blur(2px)`)

`src/components/ui/slider/Slider.vue:199-200`:
```css
backdrop-filter: var(--slider-range-blur, blur(2px));
-webkit-backdrop-filter: var(--slider-range-blur, blur(2px));
```
The `blur(2px)` fallback is a LITERAL that does NOT route through any `--glass-blur-*` rung, so it
does NOT scale with `--glass-level`. When a consumer sets `--glass-level: 0` (the opaque escape, or
`prefers-reduced-transparency: reduce` which sets it on `:root`, `glass.css:881-887`, or
`forced-colors: active`, `glass.css:930-935`) EVERY other glass surface flattens to solid — but the
Slider range keeps its `blur(2px)`. That is the exact gestalt-collapse W54 was built to prevent
("every glass surface — current and future — flattens with no per-rung enumeration",
`glass.css:876-880`), defeated by one literal. The Slider range is also 0-referenced in the unified
`.glass-material::before` group (`grep -c glass-slider glass.css` → 0), so it shares neither the
edge-gleam nor the rest-off cohort. (H-a11y-perf H-2 separately notes the slider hand-authors the
`-webkit-` pair, contradicting the unprefixed-only policy — leave the pair, but route the value
through a rung so it flattens.)

### D3 — Slider thumb hand-rolls a static specular "grip" off the shared edge-gleam

`src/components/ui/slider/Slider.vue:228-234`:
```css
background:
    linear-gradient(
        to bottom,
        color-mix(in oklab, var(--background) 55%, transparent),
        color-mix(in oklab, var(--background) 12%, transparent)
    ),
    var(--slider-thumb-bg, var(--primary));
```
A bespoke static `linear-gradient` "lip" reading as the grip — a SECOND, parallel specular idiom the
rest of the band does not speak (the band uses the unified `::before` pointer-anchored edge-gleam,
`glass.css:83-155`). The thumb is the slider's interactive cap; its catch-light should compose the
shared opt-in edge-gleam, not a hand-rolled gradient.

### D4 — Notification tier + shadow are off-ladder

`src/components/ui/notification/Notification.vue:10`:
```html
class="glass-wash flex items-center gap-3 rounded-panel px-4 py-3 shadow-elevated"
```
`glass-wash` is the LIGHTEST rung (~0.30α, `blur(1px)` sub-perceptual) authored for small detail
tiles, not a chrome surface a user reads as a floating notification. Every other floating-chrome
sibling (Toast, Popover, Dialog, Sheet) rides `glass-floating`. And `shadow-elevated`
(`tokens.css:572`, a parallel token) is NOT a `--glass-shadow-*` ladder rung, so the Notification's
lift does not compose the `--glass-material-rim` + `--glass-under-shadow-*` stack the rest of the
band carries.

### D5 — The moving-specular `::before` transition is ALWAYS-WIRED (the keyframes-I.W6 19-track non-cohesion)

`src/styles/glass.css:151-154` declares the typed-`@property` transition UNCONDITIONALLY on EVERY
material `::before` (the comma group at `glass.css:83-94`):
```css
transition:
    --specular-x var(--duration-fast, 150ms) var(--ease-standard, ease-out),
    --specular-y var(--duration-fast, 150ms) var(--ease-standard, ease-out),
    opacity var(--duration-normal, 240ms) var(--ease-standard, ease-out);
```
The keyframes.js runtime (I.W6, `docs/tranches/AX/coordination/from-keyframes-IW6-dock-button-specular.md:6-8`)
counts 19 ACTIVE interpolation tracks on the dock controls + glass `<Button>` variants while the
Cards are clean (0). Root cause: Card was made opt-in — the `glass-specular-track` class is emitted
ONLY when `specular !== 'off'` on a glass surface (`Card.vue:92-93,157`), so an un-armed Card
attaches no `::before` and no transition. The dock controls (`DockIconButton.vue:40` composes
`"dock-icon-button glass-specular-track"` UNCONDITIONALLY) + the glass Button variants
(`button/index.ts:35,74,76` ride `glass-wash`, which is in the `::before` group) attach the moving
transition on EVERY instance regardless of whether the pointer ever moves, so 19 idle tracks live.

**This was MISDIAGNOSED.** The fold doc disposes it to "W54 (glass-first ROOT)", reasoning the W54
publish clears it. But W54 is the OPACITY+BLUR knob (`--glass-level`); the specular is the ORTHOGONAL
W52 axis (CLAUDE.md AX.W54: "level = opacity+blur; tint = legibility; disjoint"). Setting
`--glass-level` does NOTHING to the specular `::before` transition — W54 CANNOT clear the 19 tracks.
The fold was to the wrong (already-shipped) wave and the edge is ORPHANED in AY (`grep -in specular
AY.md` → 0). The fix is to make the moving-specular TRANSITION opt-in (the Card wire-or-omit pattern),
NOT to lean on `--glass-level`.

### D6 — The dock SHELL carries no shared edge-gleam (undocumented divergence)

`glass.css:47-50` documents the dock SHELL (`.glass-dock`) as OUT of `.glass-material` "BY DESIGN —
it hand-rolls a parallel surface". Defensible for the bg/blur (the `--glass-bg-dock` element-level
oklab tint is load-bearing for the W55 bright bucket). But the CONSEQUENCE — the dock shell has no
edge-gleam / moving-specular at all (its only `::before` is the `variant-instrument-strip` engraved
bezel, `dock/shell.css:359`, a different effect) — is an UNDOCUMENTED divergence: a Dialog and a Dock
side-by-side read as two different materials (the Dialog catches a moving gleam, the dock plate is
inert). This is the smallest break; the disposition is to RECORD it as a deliberate exemption with a
gate row (the dock's catch-light lives on its CONTROLS, `.dock-icon-button` et al., which ARE in the
`::before` group), NOT to add a shell gleam (that would re-introduce glass-on-glass over the controls).

### D7 — No AY wave enforces total cohesion; `proof:glass-one-model` is an 8-file canary, not an inventory

`scripts/proof-glass-level.mjs:95-160` (the `--one-model` arm) is a SAMPLED whitelist of exactly 8
named surfaces (SegmentedTabs, ui TabsIndicator, Alert, TagsInput, input-pill, `--glass-bg-dock`,
Button default, Card opaque-tier). It does NOT enumerate the glass-surface inventory; it does NOT
cover Drawer (D1), Slider (D2/D3), Notification (D4), or the always-wired specular discipline (D5).
It is a regression canary for 8 past fixes, not a cohesion enforcer. Without an inventory-complete
gate, D1–D6 silently re-drift.

---

## Edit-sites (exact)

### E1 — `src/styles/drawer.css` — re-author the sheet onto `glass-overlay` [LANDED `:51-58`]

The Drawer is a MODAL-band sheet (`z-index: var(--z-modal)`, `drawer.css:39`). Route it onto
`glass-overlay` — the heaviest rung, whose `--glass-shadow-overlay` ladder rung already composes
`--shadow-2xl` (`tokens.css:1000`), so the current lift is PRESERVED through the ladder, not lost.
The class STAYS `.glass-drawer` (the consumer binding + the layout/`data-vaul-*` rules below depend
on it); the re-author changes only the surface legs. Replace the opaque surface block:

```css
/* DELETE:
   border: 1px solid var(--border);
   background-color: var(--background);
   box-shadow: var(--shadow-2xl);
*/
/* the overlay-band glass surface — the W54 flip Dialog/Sheet got. The tint
   composite reads the W55 bucket; the level knob flattens it with the band;
   the ladder shadow carries the rim + under-shadow + the --shadow-2xl lift. */
background: color-mix(in oklab, var(--glass-bg-overlay), var(--glass-tint-source) var(--glass-tint-strength));
backdrop-filter: var(--glass-blur-overlay);
-webkit-backdrop-filter: var(--glass-blur-overlay);
border: 1px solid var(--glass-border-overlay);
border-bottom: 0;
box-shadow: var(--glass-material-rim), var(--glass-shadow-overlay);
```
Keep the `border-bottom: 0` + the `border-start-*-radius` panel rounding + every layout/snap rule
(`drawer.css:35-44,52-138`) verbatim. NOTE the `[data-vaul-drawer-direction="top"]` variant
(`drawer.css:71-79`) sets `border-top: 0; border-bottom: 1px solid var(--border)` — re-point that one
border to `var(--glass-border-overlay)` for consistency.

Add `.glass-drawer` to the THREE selector groups it must join so it inherits the band discipline
without a per-component arm:
- **The WHC skin** — append `.glass-drawer` to `glass.css:944-952` (the `border: 1px solid CanvasText`
  group) AND to `glass.css:959-962` (the `background: Canvas` floating/overlay group); the
  `::before`/`::after` cede group (`glass.css:968-981`) gets `.glass-drawer::before` too.
- **The `--glass-level` flatten** is AUTOMATIC — `--glass-bg-overlay` already inverts through the
  level seam (`proof:glass-level` arm 1) and `--glass-blur-overlay` scales by the level
  (`tokens.css`), so the Drawer flattens to solid `--card` + `blur(0)` at `level:0` with NO extra
  edit. (This is the whole point of routing it through the rung.)

The Drawer does NOT get the moving-specular `::before` (it is a large sheet, not an interactive
control — same disposition as a bare `.glass-floating` panel; the rim is its edge-light). It is NOT
added to the `.glass-material::before` group.

### E2 — `src/components/ui/slider/Slider.vue:199-200` — route the range blur through a rung

Re-point the `--slider-range-blur` fallback off the literal onto a `--glass-blur-*` rung so it scales
with `--glass-level` and flattens with the band:
```css
/* was: var(--slider-range-blur, blur(2px)) — a literal off the level knob */
backdrop-filter: var(--slider-range-blur, var(--glass-blur-quiet));
-webkit-backdrop-filter: var(--slider-range-blur, var(--glass-blur-quiet));
```
`--glass-blur-quiet` is the rung whose radius matches the prior ~2px AND scales by `--glass-level`
(`proof:glass-level` arm "blur-seam-threaded"). A consumer's explicit `--slider-range-blur` override
still wins; the DEFAULT now flattens. (The spectrum variant already nulls the blur at
`Slider.vue:287-288` — leave it.)

### E3 — `src/components/ui/slider/Slider.vue:218-253` — thumb cap onto the shared opt-in edge-gleam

Replace the hand-rolled static `linear-gradient` lip (`Slider.vue:228-234`) with: a flat
`--slider-thumb-bg` background, and compose `glass-specular-track` on the thumb element so its grip
catch-light is the shared opt-in edge-gleam (the SAME `::before` recipe Card/Button/dock-controls use).
The thumb is interactive, so it is a legitimate opt-in site (wire-or-omit: it WIRES). Add the class to
the `SliderThumb` in the template (`Slider.vue:159-164`):
```html
<SliderThumb ... class="slider-thumb glass-specular-track" />
```
and replace the gradient background in `.slider-thumb` (`Slider.vue:228-234`) with the flat fill:
```css
background: var(--slider-thumb-bg, var(--primary));
```
The thumb's hover/focus/held halos (`Slider.vue:250-272`) STAY (they are the four-state contract, not
specular). Because `glass-specular-track` is now opt-in by EMISSION (E4 makes the transition follow
the class), the thumb's idle track does not bloom at rest — it wakes only on pointer-move over the
wired thumb. (The `--slider-thumb-spring` register stays `--spring-dock` — W-MOTION owns any §6
re-point, not this wave.)

### E4 — `src/styles/glass.css` — make the moving-specular TRANSITION opt-in [LANDED: transition now `:175-190` scoped to `.glass-specular-track::before` / `:hover` / `:active` + dock controls; the always-on `::before` group is `:97-99`]

The cohesion fix: the moving `--specular-x/--specular-y/opacity` transition (the keyframes "tracks")
must attach ONLY when the surface is WIRED, matching the Card discipline. The wire signal already
exists — the `glass-specular-track` class is the opt-in marker (Card emits it conditionally,
`Card.vue:157`; the dock controls + the Slider thumb compose it; the bare glass rungs/Button do NOT
need the moving transition because they are not pointer-tracked unless a host wires them).

Move the `transition:` declaration (`glass.css:151-154`) OUT of the always-on `::before` group
(`glass.css:83-94`) and onto a SCOPED selector keyed to the wire marker + the interaction
pseudo-classes, so an idle/unwired `::before` carries NO transition (and thus no animation track):
```css
/* the moving-specular transition rides ONLY the wired/interactive surfaces —
   the Card wire-or-omit pattern, generalized. An unwired .glass-floating /
   .glass-wash / bare-rung ::before is STATIC (no track); a wired
   .glass-specular-track ::before (Card armed, dock control, Button glass,
   Slider thumb) + any :hover/:active surface interpolates. */
.glass-specular-track::before,
.glass-material:hover::before, .glass-material:active::before,
.glass-wash:hover::before,     .glass-wash:active::before,
.glass-quiet:hover::before,    .glass-quiet:active::before,
.glass-resting:hover::before,  .glass-resting:active::before,
.glass-floating:hover::before, .glass-floating:active::before,
.glass-overlay:hover::before,  .glass-overlay:active::before,
.glass-card:hover::before,     .glass-card:active::before,
.dock-icon-button::before, .dock-tab-button::before,
.dock-select-trigger::before, .dock-dropdown-trigger::before {
    transition:
        --specular-x var(--duration-fast, 150ms) var(--ease-standard, ease-out),
        --specular-y var(--duration-fast, 150ms) var(--ease-standard, ease-out),
        opacity var(--duration-normal, 240ms) var(--ease-standard, ease-out);
}
```
The §6 register is PRESERVED (still `--ease-standard` on the position-tracked + surface-opacity legs —
H-motion §6 "position-tracked → `--ease-standard`"; this wave does not change the easing, only the
SELECTOR scope). The static visual (the rest gleam at intensity 0, the radial-gradient geometry) is
unchanged for ALL surfaces; only the idle TRANSITION-TRACK attachment is removed from unwired
surfaces. The dock controls keep their always-on transition (they are wired controls; their rest
intensity is 0 per the cohort, so they paint nothing at rest, but the transition is legitimately
present on an interactive control — and the rest count being 19→0 is measured against the GLASS
BUTTON + Card-default surfaces that should NOT have tracked at all). NOTE: confirm against the live
keyframes count whether the dock controls also need scoping to `:hover/:active`; if the 19 includes
dock-control idle tracks, scope those to the interaction pseudos too (the gate's DELTA arm decides).

### E5 — `src/components/ui/notification/Notification.vue:10` — floating tier + ladder shadow

```html
<!-- was: glass-wash ... shadow-elevated -->
class="glass-floating flex items-center gap-3 rounded-panel px-4 py-3"
```
`glass-floating` carries its OWN ladder shadow (`--glass-shadow-floating` + rim + under-shadow,
`glass.css:296-303`), so the `shadow-elevated` utility is DROPPED (the ladder rung replaces it). The
per-type status classes (`notificationClasses`, `Notification.vue:57-62`) STAY — they tint the glass
plate by status, composing ON the floating tier (same as Alert's status tint over its glass surface).

### E6 — `src/styles/glass.css:47-50` — record the dock-shell edge-gleam exemption + gate it

The prose at `glass.css:47-50` already says the shell is "OUT of this group BY DESIGN". Strengthen it
to name the cohesion CONSEQUENCE explicitly (the shell has no moving-specular; the catch-light lives
on the CONTROLS) so it reads as a DELIBERATE exemption, and add the dock-shell exemption as a NAMED
allowlist entry in `proof:glass-cohesion` (E7) so the divergence is gated, not undocumented.

### E7 — `scripts/proof-glass-cohesion.mjs` (NEW) — the inventory-complete gate

Author the NET-NEW gate that SUPERSEDES `proof:glass-one-model`. Remove the `proof:glass-one-model`
package.json key (the `--one-model` arm of `proof-glass-level.mjs` is folded into the new gate; the
`proof:glass-level` arm-1 SCALAR gate STAYS — it is the level-seam gate, not the inventory gate). The
new gate is INVENTORY-COMPLETE, not an 8-file whitelist:

1. **Surface enumeration.** Walk `src/components/{ui,custom}/**/*.{vue,ts}` + the surface CSS files;
   for each surface that paints a glass plate (matches `class="…glass-…"`, composes a `--glass-bg-*`
   in CSS, or names `.glass-drawer`/`.glass-dock`/`input-pill`), assert it routes through a
   `--glass-*` tier (the `GLASS_MARKER` regex) AND carries NO raw `background-color: var(--background)`
   / `background: var(--background)` / `bg-background` / `bg-card` / literal `blur(<n>px)` glass surface
   OFF the legibility allowlist (`avatar`/`label`/`separator`/`skeleton`/`table`/`data-table`/`badge`
   loud-pill). The allowlist + the dock-shell exemption (E6) are the ONLY exempt entries.
2. **Drawer arm (born-RED until E1).** `.glass-drawer` in `drawer.css` carries `backdrop-filter:
   var(--glass-blur-overlay)` AND `background: color-mix(in oklab, var(--glass-bg-overlay)` AND is
   present in the WHC skin selector groups; carries NO `background-color: var(--background)`.
3. **Slider arm (born-RED until E2/E3).** `Slider.vue` carries NO literal `blur(2px)` as a
   `backdrop-filter` fallback (the range routes `var(--glass-blur-quiet)`); the thumb composes
   `glass-specular-track` and carries NO hand-rolled `linear-gradient(...var(--background)...)` lip.
4. **Notification arm (born-RED until E5).** `Notification.vue` composes `glass-floating` and carries
   NO `glass-wash` + `shadow-elevated`.
5. **Specular-opt-in arm (born-RED until E4).** The moving-specular `transition:` in `glass.css` is
   NOT inside the unconditional `.glass-*::before` group; it is on a `.glass-specular-track::before` /
   `:hover::before` / `:active::before`-scoped selector (the wire-or-omit marker drives the track).
6. **Self-proving:** a synthetic in-gate fixture string carrying `background-color: var(--background)`
   on a fake `.glass-x` surface MUST flag, RED-witness style (the `proof:live-verified-ledger`
   pattern), so the inventory bite is demonstrated every run.

CI-tag the gate (`scripts/constellation.mjs` registry + `proof:gen-ci-fresh` re-byte-lock); register
in `package.json` as `proof:glass-cohesion`. The SOURCE arm gates device-free; the RENDER is E8.

### E8 — `tests-visual/glass-cohesion.spec.ts` (NEW) — the π render readback + the level-0 flatten

Model on `tests-visual/adaptive-glass.spec.ts` (the WCAG-recompute pattern, axe-independent). At ≥2
viewports (375×667, 1280×800) × {light, dark}, mount each of `.glass-drawer`, the Slider track+thumb,
and the Notification surface over a BUSY backdrop (a high-frequency multi-stop gradient fixture
injected onto the live demo which loads `/styles` globally), then assert via `getComputedStyle` off
the LIVE painted DOM:
- **Glass-painted:** each surface's resolved `backdrop-filter` is a real non-`none` blur AND its
  resolved background has alpha < 1 (the busy backdrop shows through — it is translucent glass, not an
  opaque plate). Born-RED on the current Drawer (opaque `--background`, alpha 1) + the current Slider
  (the literal blur is real but does not respond to the next assertion).
- **Level-0 flatten:** set `--glass-level: 0` on `:root`, re-read; each surface's `backdrop-filter`
  resolves to `blur(0)`/`none` AND its background alpha → 1 (solid `--card`). Born-RED on the Slider
  range (the literal `blur(2px)` does NOT flatten) until E2.
Fail-CLOSED (an un-flattening or opaque-glass surface reds the recompute, exit non-zero, never
SKIP-with-EXIT=0).

### E9 — `audit/visual/W-GLASS-DELTA.md` (NEW) — the idle-track DELTA (the cardinal lesson)

Capture the keyframes.js consumer's idle specular-track count BEFORE (the 19-track HEAD state) and
AFTER (E4 landed) — the paired before/after the cardinal lesson demands. The measurement: mount the
demo (or the keyframes.js consumer harness) with the glass Button + Card-default + dock-control
surfaces present, with NO pointer interaction, and read the keyframes.js runtime's active-track count
(the same count the I.W6 doc cited: "19 dock/`<Button>` specular tracks still bloom"). Record both
counts + ≥1 on-disk PNG per state under `audit/visual/`, referenced by the DELTA doc, so
`proof:live-verified-ledger` can mint this wave's row `live-verified`. The AFTER count is 0 idle
tracks (the unwired/idle surfaces carry no transition; wired controls at rest paint nothing AND, if
the 19 included idle control tracks, those are scoped to interaction per E4's note).

---

## Open arm — the owed Drawer/idle-track PNG capture (the cardinal-lesson gap)

The SOURCE + the gate + the π spec landed; the prose DELTA (`audit/visual/W-GLASS-DELTA.md`) is
authored AND references the eight evidence PNGs by exact filename — but those PNGs are NOT on disk
(`ls docs/tranches/AY/audit/visual/W-GLASS-*.png` → no matches; only `W-GLASS-DELTA.md` is present).
A "live-verified" DELTA with no captured frame is the exact cardinal-lesson inflation the precept
forbids (a prose claim is not a captured artefact). This arm closes the gap:

1. **Capture the idle-track pair (the headline).** Mount the demo with the glass `<Button>` +
   Card-default + dock-control surfaces present, NO pointer interaction; read the keyframes.js runtime
   active-track count via the π harness; screenshot BEFORE (against the pre-E4 always-on transition —
   reconstruct by reverting the `glass.css:175-190` scope, or capture from the recorded HEAD-before
   state if the run was taken) and AFTER (HEAD, the scoped transition). Land
   `W-GLASS-idle-tracks-{before,after}-{light,dark}.png` on disk. The number contract is **19 → 0**.
2. **Capture the Drawer/Notification glass pair.** Over the busy-backdrop fixture, screenshot the
   `.glass-drawer` sheet (now an overlay-tier glass blur, the backdrop bleeding through) and the
   `glass-floating` Notification. Land `W-GLASS-drawer-glass-{light,dark}.png` +
   `W-GLASS-notification-floating-{light,dark}.png`.
3. **Reconcile the DELTA filename references** so every filename the DELTA names exists on disk (the
   `proof:live-verified-ledger` filename clause matches `^W` — confirm the prefix).

Until the PNGs land, the wave is DEV-COMPLETE-source / OPEN-capture: HARD GATE clauses 1+2+4 are GREEN
(source gate + π render + lint/tsc), but clause 3 (the captured idle-track DELTA) is the binding open
artefact. The orchestrator (or a follow-up capture pass) owns the capture run; the demo + the π
harness + the count-reader already exist (no new substrate). If the BEFORE state cannot be
reconstructed at capture time, record the BEFORE from the I.W6 coordination doc's measured 19-count
(`docs/tranches/AX/coordination/from-keyframes-IW6-dock-button-specular.md`) with an AFTER live capture
+ a note that the BEFORE is the cited prior measurement, not a fresh re-capture — the paired DELTA
still holds, with the provenance honest.

## File bounds (write scope)

```
src/styles/drawer.css                              # E1 [LANDED :51-58 glass-overlay + top-variant border re-point]
src/styles/glass.css                               # E1 (WHC group), E4 (specular transition scope :175-190), E6 (exemption prose)
src/components/ui/slider/Slider.vue                # E2 [LANDED :205-206], E3 (thumb glass-specular-track)
src/components/ui/notification/Notification.vue    # E5 [LANDED :10 glass-floating]
scripts/proof-glass-cohesion.mjs                   # E7 (NEW) [LANDED, 17KB]
scripts/proof-glass-level.mjs                      # E7 (fold the --one-model arm out; keep arm-1 level gate)
scripts/gates.mjs                                  # E7 (gate registry + CI tag — proof:glass-cohesion at :638) [OVERLAP with W-MOTION; disjoint GATES rows]
package.json                                       # E7 (proof:glass-cohesion at :663; proof:glass-one-model REMOVED) [OVERLAP with W-MOTION; disjoint keys]
.github/workflows/ci.yml                           # E7 (CI-tag — regenerated via gates:emit-ci + proof:gen-ci-fresh, NOT hand-edited) [GENERATED — shared with W-MOTION; byte-lock arbitrates]
tests-visual/glass-cohesion.spec.ts                # E8 (NEW) [LANDED, 10KB]
tests-visual/pi-manifest.ts                        # E8 (add the target if the spec references PI_TARGETS)
docs/tranches/AY/audit/visual/W-GLASS-DELTA.md     # E9 (NEW) [LANDED prose; the 8 PNGs are the OPEN capture arm — see §"Open arm"]
docs/tranches/AY/audit/visual/W-GLASS-*.png        # E9 — the captured evidence (NOT yet on disk; the open arm)
```
**Correction (as-built):** the original spec cited `scripts/constellation.mjs` for the gate registry;
the actual registry is `scripts/gates.mjs` (constellation.mjs holds the SIBLING census, not the GATES
list). The gate landed in `gates.mjs:638`. **The gates.mjs + package.json + ci.yml writes are the
WRITE-SCOPE OVERLAP with W-MOTION** — disjoint append-only rows / distinct script keys; the generated
`ci.yml` is the only truly-shared artefact and is byte-locked by `proof:gen-ci-fresh` (see the header
overlap-resolution note). As-built, both gates coexist in all three files; the overlap is RECONCILED.
No write to: `tokens.css` (the rungs/level/shadow ladder already exist — this wave CONSUMES them,
does not mint), `DockIconButton.vue`/`button/index.ts` (their specular WIRING is correct — E4 changes
only WHICH selectors carry the transition, in glass.css), `useSpecularTracking.ts` (the rAF-coalesce
is W-A11Y-PERF), the §6 easing tokens (W-MOTION). The CLAUDE.md `glass.css` structure note is
updated only if the specular-transition scope reshapes the §-comment (a doc reconciliation, not a
source edit beyond E6 prose).

## Sequencing + interactions

- Runs in **Batch 1** (the BLOCKER cohesion fixes), parallel with W-MOTION (mostly-disjoint files:
  W-MOTION edits `cards.css`/`tokens.css` press-spring/`Aurora.vue`/`MetricRow.vue`/`transitions.css`;
  this wave edits `drawer.css`/`glass.css`-specular/`Slider.vue`/`Notification.vue`). On `glass.css`:
  this wave EDITS the `::before` transition group ([LANDED `:175-190`, was authored `:151-154`]) + the
  WHC group; W-MOTION READS `glass.css` as a gate scan-target but does NOT edit it — a verify-not-edit
  relationship, no write overlap on the CSS.
- **The TRUE shared write-scope is `gates.mjs` + `package.json` + the generated `ci.yml`** — BOTH this
  wave (adds `proof:glass-cohesion`, removes `proof:glass-one-model`) AND W-MOTION (adds
  `proof:animation-coherence`, flips its CI tag) register a gate there. The overlap-resolution is
  RECORDED in the header note: disjoint append-only GATES rows + distinct script keys, the generated
  `ci.yml` byte-locked by `proof:gen-ci-fresh` and regenerated last by whichever wave lands second.
  As-built both gate rows coexist — RECONCILED, not a conflict.
- The Slider thumb spring register (`--spring-dock`, `Slider.vue:245`) is W-MOTION's call if it is
  off-doctrine; this wave does not re-point it.
- The W55-default-engage (H-1) and the dark-contrast oracle re-derive (H-6) are W-A11Y-PERF; this
  wave's Drawer re-author makes the Drawer REACHABLE by the W55 bucket (it now reads
  `--glass-tint-source`/`--glass-tint-strength`), which is the precondition W-A11Y-PERF consumes.

## Precept honoring

- **Root-not-consumer:** every fix is in `src/styles` / `src/components` — the library identity. No
  consumer (slides/speedtest) sets `--glass-backdrop` or patches the Drawer; the library guarantees
  cohesion. (H-glass-cohesion convergence criterion 1.)
- **No-workaround / gestalt:** the Drawer is RE-AUTHORED onto the rung (not patched with a local
  `backdrop-filter`); the Slider routes through the existing level seam (not a parallel level path);
  the specular transition is made opt-in via the EXISTING `glass-specular-track` marker (not a new
  flag). The 8-file canary is SUPERSEDED by an inventory gate, not patched to add 4 more files.
- **Clean break (no backwards-compat):** `proof:glass-one-model` is REMOVED, not aliased; the opaque
  `background-color: var(--background)` is deleted, not kept behind a flag.
- **Greenfield-no-meta:** the re-authored `drawer.css` surface block carries NO "was opaque" / "W54
  flip" provenance in the SHIPPED CSS comment (the wave/why lives here in the spec); the file's
  token-first header is preserved.
- **≥2-consumer bar:** no new substrate is minted — every token consumed (`--glass-bg-overlay`,
  `--glass-blur-quiet`, `--glass-shadow-overlay`, `glass-specular-track`) already has ≥2 consumers.

---

## HARD GATE (the binding completion condition)

`proof:live-verified-ledger` mints this wave's PROGRESS row `live-verified`, backed by ALL of:

1. **`proof:glass-cohesion` GREEN + CI-tagged** (NEW; SUPERSEDES `proof:glass-one-model` — that
   package.json key is REMOVED, deletion-proof: `grep -c "proof:glass-one-model" package.json` → 0):
   the inventory arm enumerates every glass surface and asserts each routes a `--glass-*` tier off the
   raw-`bg`/literal-`blur` forbidden set (allowlist + dock-shell exemption the only exceptions); the
   Drawer/Slider/Notification/specular-opt-in arms each born-RED at HEAD → GREEN after E1–E6; the
   self-proving synthetic fixture flags every run.
2. **`tests-visual/glass-cohesion.spec.ts` GREEN** (the π render readback, ≥2 viewports × {light,dark},
   fail-CLOSED): Drawer + Slider range + Notification each paint a real `backdrop-filter` blur with
   alpha < 1 over the busy backdrop (translucent glass, not opaque); each flattens to `blur(0)` +
   solid `--card` (alpha 1) when `--glass-level: 0` is set on `:root` (the Slider-range literal-blur
   defeat is gone).
3. **The idle-track DELTA captured** in `audit/visual/W-GLASS-DELTA.md` with the on-disk PNG pair
   PRESENT (NOT only referenced): the keyframes.js consumer's idle specular-track count went **19 → 0**
   (paired before/after — the cardinal-lesson DELTA, captured against a keyframes.js consumer, NOT a
   prose claim). **AS-BUILT this clause is the ONE OPEN ARM** — the DELTA prose is authored and names
   the eight PNGs, but `ls docs/tranches/AY/audit/visual/W-GLASS-*.png` returns no matches today, so a
   filename-existence check (`every PNG the DELTA references resolves on disk`) is the binding artefact.
   Clause-3 is NOT GREEN on the prose alone; the §"Open arm" capture run lands the PNGs.
4. Lint + `vue-tsc --noEmit` green; `proof:glass-level` (arm-1 level scalar) STAYS green across the
   Drawer/Slider routing.
