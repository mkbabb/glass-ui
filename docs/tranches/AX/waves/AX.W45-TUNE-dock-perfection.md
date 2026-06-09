# AX.W45-TUNE — Dock-perfection close: capture the owed DELTA, fix the four product-dead TUNE gaps (Q1 pill · C1 glyph · C2 tile-pad · C7 vertical body), re-point the hover register (Q3), and bind the dock-glass re-points as the HARD W54-successor (glass-selected · clear 19→0 specular)

**Band** A · DOCK · **Severity** blocker (the dock band is the AX flagship and its `live-verified` mark is unsubstantiated — CH-dock C10, the cardinal-lesson violation; pass-3 Q1/Q3 are the live contradictions) · **dependsOn** AX.W45 (the structural-capability region-model — `#persistent`, `--dock-scale`, `<DockSeparator>`, the density cascade — already dev-landed; this wave PERFECTS it, it does not re-author it) + AX.W54 (the glass-level ROOT — the dock-glass re-points are a HARD successor of W54's default-off rest-specular + glass-first register; §dock-glass-repoint below) + AX.W00 (the π-lane close machinery + the CAPTURE-PROTOCOL) · **Charter** `docs/tranches/AX/audit/hardening/CH-dock.md` (C1/C2/C3/C4/C5/C7/C10 + HARDENING ACTIONS 1/2) + `docs/tranches/AX/audit/hardening/DOCK-controls-nav.md` (Challenge 1-4, HARDENING ACTIONS 2/3/6) + `docs/tranches/AX/audit/hardening/DOCK-variants.md` (the glass-cohesion slice) + `docs/tranches/AX/GOLDEN.md` §C Batch-3 + §E (the INCOHERENT verdict) + `docs/tranches/AX/audit/hardening/GOLDEN-synthesis.md` §4b (the ordered dock-finish: items 1+3) + `docs/tranches/AX/coordination/from-keyframes-IW6-dock-button-specular.md` (the 19-track assay) · **Audit** `USER-DEFECTS-2026-06-08-pass3.md` Q1 (`:26` collapsed pill mis-sized) + Q3 (`:28` hover not noticeable) + pass-3 `:13` (the keyframes-dock is the model for selected elements)

---

## Why this wave exists (the W45 structural capability shipped, the perfection did not)

The structural-capability wave (`AX.W45-dock-region-model-mobile-scale.md`) genuinely shipped:
the three-region template (`#persistent`), `<DockSeparator>`, `--dock-scale`, the density cascade,
the DK1/DK2/DK4/DK5/DK7/DK8 folds. The mechanisms are real and well-architected. But the
hand-challenge (CH-dock, DOCK-controls-nav, DOCK-variants) found the band is NOT at perfection on
SEVEN concrete axes — and four of the W45 "GREEN" capabilities are PRODUCT-DEAD or PRODUCT-WRONG
at the live magnitude (the exact cardinal-lesson trap):

1. the mobile 1.5× glyph scale (`--dock-icon-glyph`, the WHOLE point of `--dock-scale`) paints
   NOTHING because every demo glyph overrides it with an explicit Tailwind size (C1);
2. `--dock-tile-pad` is a flat literal NOT threaded through `--dock-scale`, so DK4 grid centering
   silently re-breaks at the coarse-pointer 1.5× — the fix re-introduced its own anti-pattern (C2);
3. the dock hover is a sub-perceptual ink/card tint with NO glass register — Q3 is a REGISTER
   problem the DK2 "fix" mis-filed as a magnitude knob (C3/Q3);
4. the vertical three-region body W45 committed to is a bare `<slot/>` — the parity is CSS-only,
   not structural (C7);
5. the dock carries 19 resting specular blooms where Card is clean — glass cohesion BROKEN (C4);
6. the selected/active state is a 12%-ink wash, not the glass register the user named the
   keyframes-dock as THE model for (C5);
7. the whole band's `live-verified` mark has NO captured DELTA — its own JSON says the visual truth
   is OWED (C10), and there is no `audit/visual/W45-DELTA.md`.

This wave is the binding **dock-perfection CLOSE**. It captures the owed paired-π DELTA, FIXES the
four product-dead TUNE gaps (Q1/C1/C2/C7), re-points the hover register (Q3/C3), and binds the
dock-glass re-points (C4/C5 — clear the 19 specular tracks → 0, give the selected/active state a
real glass register) as the HARD W54-successor the GOLDEN-synthesis §4b sequences. It is the TUNE +
re-point layer ON the settled W45 structure — gestalt, not a patch fleet.

**Scope split with the adjacent dock waves (no dup):**
- **W45 (structural capability)** — dev-landed; this wave does NOT re-author the region-model, the
  `--dock-scale` cascade seam, or the `<DockSeparator>` primitive. It TUNES + RE-POINTS them.
- **W54 (glass ROOT)** — HARD PREDECESSOR. W54 lands `--glass-level` + the default-off rest-specular
  discipline + the library-wide glass-first register; this wave is the dock-band EXECUTION of the
  dock-control re-points W54 explicitly defers to the dock band (`W54:197-202,304-306`).
- **W61 (dock-unify-root)** — SUCCESSOR. W61 owns the nav-PATTERN contract (home-left `#persistent`
  + nav + dividers across EVERY demo dock), the demo-dock MIGRATION (dock-layers / dock-with-slider
  / SidebarDock / rail.vue), and the Q1 collapsed-pill PATTERN finalize on the one root. This wave
  MINTS the Q1 floor tokens + the geometry fix (so the pill is correctly sized on the showcase dock
  W61 then standardizes); it does NOT author the nav-pattern or migrate the demo docks. The Q1
  token mint lands HERE (the geometry), the nav-pattern standardize lands in W61 (the contract).
  The W61 `proof:dock-unify` four-vocabulary census is W61's; this wave's `proof:dock-perfection`
  asserts the TUNE + the glass register, not the nav-pattern.

---

## State (born-RED — the gate must fail at HEAD before the wave)

The wave is born-RED on SIX falsifiable witnesses at HEAD `89edffc`, each a source-true line probe
the new gate inverts. Re-prove each LIVE per the W00 ritual — do NOT proceed on the audit's word.

- **RED witness 1 (Q1 — the collapsed pill has NO floor tokens; it falls to full-control width
  with NO symmetric block floor).** The collapsed summary geometry reads two floor tokens that are
  **referenced-but-UNDEFINED at HEAD**: `dock.css:719` `min-width: var(--dock-collapsed-summary-min-size, var(--dock-layer-height, 2.5rem))` and `dock.css:526` `--dock-pad-collapsed: var(--dock-collapsed-padding, var(--dock-padding-block, 0.375rem))`. Neither
  `--dock-collapsed-summary-min-size` nor `--dock-collapsed-padding` is minted in `tokens.css` (grep
  → 0 definitions, only the two `var(…)` fallback consumers above). So the collapsed pill falls to
  its fallback — `--dock-layer-height` (the FULL control height, ~2.5rem) for `min-width` with NO
  `min-block-size` floor at all and the expanded `--dock-padding-block` — i.e. the collapsed state
  is sized like an un-collapsed control row, not a tight proportioned pill. The user's Q1
  (`pass-3:26`): "the SHRUNKEN (collapsed) item is not the proper SIZE in the demo." **Falsifiable
  RED:** *grep `tokens.css` for `--dock-collapsed-summary-min-size` + `--dock-collapsed-padding` — at
  HEAD neither is defined (the pill falls to full-control width + no block floor; RED). After the
  wave both tokens are MINTED (a tight summary min-size + a smaller collapsed padding) AND the
  collapsed summary carries a symmetric `min-block-size` so the pill is a proportioned squircle, not
  a full-row stub (GREEN).*

- **RED witness 2 (C1 — the mobile 1.5× glyph scale paints NOTHING; every demo glyph overrides
  `--dock-icon-glyph`).** W45 added `.dock-icon-button > svg { width/height: var(--dock-icon-glyph) }` (`dock-controls.css`) with `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))` (`tokens.css:1117`) — the headline mobile ergonomic. The wave contract: "a consumer-passed
  explicit lucide size class still WINS (utility > component layer)." That contract makes the
  capability a NO-OP on every real dock: every `DockIconButton` glyph in the demo carries an explicit
  Tailwind size — **72 `h-4 w-4` / `h-5 w-5` occurrences across `demo/stories/navigation/*` +
  `demo/stories/compositions/dock-with-slider.vue`** (`dock.vue`, `dock-layers.vue`, `rail.vue`,
  `header-ribbon.vue`, `dock-with-slider.vue`). Each one WINS over `--dock-icon-glyph`, so the
  library glyph ownership — and the mobile 1.5× glyph scale that is THE point of `--dock-scale` — is
  a no-op on every dock in the product. The π live arm's "at 375×667 the glyph renders ~1.5×" can
  only pass on a synthetic dock with NO size class; the demo (the live-audit surface) shows a 1.25rem
  glyph in a scaled box on mobile — the exact "glyph swimming" state the wave claimed to fix.
  **Falsifiable RED:** *grep the demo dock SFCs for `h-4 w-4` / `h-5 w-5` on a `DockIconButton`
  glyph — at HEAD there are 72 (each overriding `--dock-icon-glyph`; RED). After the wave the demo
  dock glyphs DROP the explicit size class so the library `--dock-icon-glyph` default takes over and
  the 1.5× mobile scale PAINTS (GREEN).*

- **RED witness 3 (C2 — `--dock-tile-pad` is NOT `--dock-scale`-threaded; DK4 grid-alignment
  re-breaks at 1.5×).** W45's DK4 fold explicitly warned "a flat 72px tile around a 1.5×-scaled glyph
  would be a NEW misalignment" and routed `--dock-tile-min` into the density cascade as
  `calc(--dock-control-size + --dock-tile-pad)`. But `--dock-tile-pad` is a FLAT literal at all three
  density rungs — `--dock-tile-min: calc(var(--dock-control-size) + var(--dock-tile-pad, 1rem))`
  (`dock.css:261` compact), `, 2rem)` (`:307` comfortable), `, 2.75rem)` (`:349`/`:390` spacious) —
  NONE multiplied by `var(--dock-scale)`. The `--dock-control-size` leg IS `* var(--dock-scale)`-threaded (`dock.css:251` etc.); the `--dock-tile-pad` leg is not. So on mobile the control
  scales 1.5× but the tile padding holds fixed: the tile/control RATIO shifts, the icon is no longer
  concentrically centered in its scaled tile — the exact "new misalignment" the wave promised to
  avoid. The DK4 self-check passes on desktop (`--dock-scale: 1`) and silently regresses at the
  coarse-pointer 1.5×. **Falsifiable RED:** *parse the three `--dock-tile-min` declarations in
  `dock.css` — at HEAD the `--dock-tile-pad` leg is a bare `var(--dock-tile-pad, Nrem)` NOT
  `* var(--dock-scale)` (RED). After the wave the tile-pad rides `--dock-scale` (`calc((var(--dock-control-size) + var(--dock-tile-pad, …)) ...)` with the pad scaled, or `--dock-tile-pad`
  itself defined as a scaled product) so tile + control + glyph scale in lockstep and the icon stays
  concentrically centered at 1.5× (GREEN).*

- **RED witness 4 (Q3/C3 — the dock hover has NO glass register; rest, hover, AND active are all
  same-hue translucent fills against the dock's own glass substrate → a sub-1%-ΔL no-op).** The
  user's Q3 (`pass-3:28`): "the HOVER effect for the dock + buttons is NOT noticeable — only on
  CLICK is it visible." At source the hover bg is `--dock-control-hover-bg: color-mix(in srgb, var(--card) 55%, transparent)` (`tokens.css:1124`) painted OVER the dock shell's own
  `--glass-bg-dock` (`dock.css:146`, itself a `--card`-over-transparent mix, `tokens.css:774`). A
  55%-card translucent fill over an ~65%-card glass substrate is the SAME hue at adjacent alphas — a
  sub-1%-ΔL bg "swap" that is invisible (DOCK-controls-nav Challenge 4, the falsifiable arithmetic).
  The hover affordance leans entirely on the scale (`--scale-hover-dock: 1.1`, `tokens.css:1224`) +
  the 0.1 specular — and the scale fires on only TWO of the four control members (icon + dropdown
  lift; select + tab do NOT — `dock-controls.css:267-270` select/tab set ONLY bg+color, no scale;
  `dock-controls.css:443-453` the dropdown gets a second scale rule, the select does not). So the
  user reads "nothing on hover, something on click" because the hover delta is a sub-threshold alpha
  shift while the click delta adds a press-squish. There is NO glass register on hover (no specular
  gleam waking, no backdrop-darken, no rim-ΔL). **Falsifiable RED:** *resolve the hover ΔL of
  `--dock-control-hover-bg` over `--glass-bg-dock` (both `--card`-over-transparent at adjacent
  alphas) — at HEAD it is <1% ΔL, and the hover scale fires on 2 of 4 members (RED). After the wave
  the hover reads a measurable glass-tier delta (a brighter rim / a glass-correct tint a step above
  the substrate / the specular gleam waking on HOVER) AND the hover scale fires on ALL FOUR members
  (icon/tab/select/dropdown — ONE comma-group), so hover is perceptible before click (GREEN).*

- **RED witness 5 (C7 — the vertical three-region body W45 committed to is a bare `<slot/>`).** W45
  scope item 2 + its FileBounds: "Give the vertical branch (`:509-511`) the same three-region
  structure (not a bare `<slot/>`)." **Falsifiable miss:** `GlassDock.vue:532` is STILL
  `<template v-else><slot /></template>` — a bare slot. The vertical dock gets the `#persistent` top
  sibling (`GlassDock.vue:497-498`) and the CSS gap parity (`dock.css:561` reads `--dock-layer-gap`),
  but the BODY is a single bare slot with no `[persistent][divider][morph-region]` structure — no
  built-in rhythm, no morph-region for a vertical dock. The parity the wave claimed ("same
  three-region structure both orientations") is CSS-only, not structural. **Falsifiable RED:** *parse
  the `GlassDock.vue` vertical (`v-else`) branch — at HEAD it is a bare `<slot/>` (RED). After the
  wave the vertical branch carries the three-region body — a `[persistent (already sibling)] +
  content stack` structure with built-in section rhythm via `<DockSeparator>` slots (GREEN). OR, if
  the orchestrator ratifies the bare-slot vertical body as a deliberate KISS choice (the vertical
  dock is a tool palette that does not collapse — DOCK-variants C2), the W45 contract text is amended
  to "CSS parity only" and the bare slot is RECORDED as a decision, not a silent scope-miss — the
  gate then asserts the recorded decision rather than the structure.*

- **RED witness 6 (C4/C5 — the dock carries 19 resting specular tracks where Card is clean, AND the
  selected/active state is a 12%-ink wash, not a glass register — glass cohesion BROKEN; the
  W54-successor re-point).** The keyframes I.W6 assay (`from-keyframes-IW6-dock-button-specular.md`)
  measured **19 dock/`<Button>` specular tracks blooming** at 3.8.0 where the Card default-off
  cleared the cards to 0. At source: `--glass-specular-intensity-rest: 0` globally and W52 made Card
  opt-in (`Card.vue:138-143`), but `DockIconButton.vue:40` attaches `glass-specular-track` BY DEFAULT
  and `button/index.ts:53` composes it on the glass variants — they were never made opt-in like Card.
  Compounding it, the specular is on 2 of 4 dock members: `glass.css:88,158` name `.dock-icon-button`
  in the `::before` catch-light selector list but NOT `.dock-tab-button` / `.dock-select-trigger` /
  `.dock-dropdown-trigger` (DOCK-controls-nav Challenge 2) — so the dock reads as one glass tile next
  to three flat plates. AND the selected/active fill is `--dock-active-bg → --dock-control-active-bg →
  var(--surface-tint-12)` (`tokens.css:1152,1125`) — a 12%-foreground-over-transparent INK tint with
  no `backdrop-filter`, no `--glass-bg-*`, no specular: an ink wash, not the glass register the user
  named the keyframes-dock as THE model for (`pass-3:13`). **Falsifiable RED:** *count the resting
  dock/Button specular tracks (the keyframes I.W6 assay metric) — at HEAD 19 bloom where Card is 0;
  and resolve `--dock-active-bg` — at HEAD it ladders to `--surface-tint-12` (a 12%-ink wash, NOT a
  glass tier; RED). After the wave (W54-successor): the dock controls + glass Button share Card's
  default-off rest-specular discipline so the resting track count drops to **0** on the publish edge
  (the named keyframes verification), the specular state-machine covers ALL FOUR members sized for
  the small tile, and the selected/active fill reads as a real glass register (a `--glass-bg-*` tier
  / a glass-correct active token above the hover, NOT a flat `--surface-tint-12` overlay) — the
  keyframes-dock model (GREEN).*

The wave is RED at HEAD on all six; the HardGate below drives each to GREEN. (RED witness 6 is the
HARD W54-successor — it cannot GREEN until W54 lands `--glass-level` + the default-off rest-specular;
the sequencing is enforced in Disjointness.)

---

## Goal

The settled W45 structure becomes a PERFECTED dock: the collapsed pill is a tight proportioned
squircle (Q1 floor tokens minted), the mobile 1.5× glyph scale PAINTS (the demo drops its 72
glyph-size overrides), the tile padding rides `--dock-scale` so the icon stays concentrically
centered at 1.5× (C2), the vertical body carries the three-region structure (or the bare slot is
ratified + recorded), the hover reads a perceptible glass register across ALL FOUR control members
(Q3), and — as the HARD W54-successor — the dock controls + glass Button share Card's default-off
rest-specular discipline (19 tracks → 0, sized for the small tile, on all four members) while the
selected/active state reads as the keyframes-dock glass register. Every one closes on a CAPTURED
paired-π BEFORE/AFTER + DELTA at ≥2 viewports × light/dark — the binding cardinal-lesson artefact.

---

## Scope (the TUNE + the W54-successor re-point — gestalt, ON the settled W45 structure)

The seven axes are ONE concern read at two altitudes: the dock-control surface is sub-perceptual
(rest=hover=active are same-hue tints, the glyph/pad/pill geometry is mis-scaled or mis-floored) and
the glass identity is incoherent (19 resting blooms, a 2-of-4 specular split, an ink-wash selected
state). ONE cohesive close, not seven patches.

### A. The four product-dead / product-wrong TUNE gaps (no W54 dependency — land FIRST)

1. **Q1 — mint the collapsed-pill floor tokens + the symmetric block floor (RED-1).** MINT
   `--dock-collapsed-summary-min-size` (a tight pill min-size, smaller than the full `--dock-layer-height` — the proportioned-pill target) and `--dock-collapsed-padding` (a smaller collapsed
   padding, below the expanded `--dock-padding-block`) in `tokens.css §10`. Add a `min-block-size`
   companion to `.glass-dock.collapsed .dock-layer--summary` (`dock.css:717`) so the pill floors on
   BOTH axes (today only `min-width`) — a proportioned squircle, not a full-row stub. The W61 wave
   then STANDARDIZES the pill on every demo dock via the nav-pattern; this wave fixes the GEOMETRY so
   the showcase dock's pill is correctly sized. RATIFY (Open Questions): the exact tight min-size +
   whether the collapsed pill adopts the `--corner-shape-bigdock` superellipse (coordinate with W56b).

2. **C1 — drop the 72 demo glyph-size overrides so `--dock-icon-glyph` paints (RED-2).** Across the
   demo dock SFCs (`dock.vue`, `dock-layers.vue`, `rail.vue`, `header-ribbon.vue`,
   `dock-with-slider.vue`), DELETE the explicit `h-4 w-4` / `h-5 w-5` Tailwind size classes from
   every glyph hosted in a `DockIconButton` (and the persistent/nav glyphs) so the library
   `--dock-icon-glyph` default (1.25rem × `--dock-scale`) takes over — the demand-side adoption W45
   skipped. This makes the mobile 1.5× glyph scale PAINT on every real dock (the whole point of
   `--dock-scale`). A consumer that genuinely wants a non-default glyph size still passes one (the
   contract is preserved — a DEFAULT, not a ceiling); the demo just stops overriding the default it
   exists to showcase. NOTE: glyphs OUTSIDE a `DockIconButton` (e.g. a `<Home>` inside a custom nav
   chrome that is not a dock control) keep their size — the drop is scoped to the dock-control hosts.

3. **C2 — thread `--dock-tile-pad` through `--dock-scale` (RED-3).** Re-express the three
   `--dock-tile-min` declarations (`dock.css:261/307/349`) so the `--dock-tile-pad` leg rides
   `var(--dock-scale)` in lockstep with the `--dock-control-size` leg — either scale the pad inline
   (`calc(var(--dock-control-size) + var(--dock-tile-pad, Nrem) * var(--dock-scale))`) or define
   `--dock-tile-pad` per density rung as an already-scaled product (the §10 token pattern). Then
   re-verify DK4 concentric centering at 375×667 — the tile + control + glyph scale together, the
   icon stays centered in its scaled tile (the math the W45 π arm claimed but couldn't hold).

4. **C7 — build the vertical three-region body OR ratify the bare slot (RED-5).** EITHER author the
   vertical `[persistent (already sibling)] + content stack` body in `GlassDock.vue:532` (the
   committed W45 scope — built-in section rhythm via `<DockSeparator>` slots, mirroring the
   horizontal three-region structure), OR — if the orchestrator ratifies that the vertical dock is a
   non-collapsing tool palette (DOCK-variants C2) where a morph-region is meaningless — RECORD the
   bare-slot vertical body as a deliberate KISS choice, amend the W45 contract text to "CSS parity
   only," and note the H-collapses / V-always-expanded asymmetry in CLAUDE.md so it is a decision,
   not a silent scope-miss. RATIFY before impl (Open Questions).

### B. The hover register re-point (Q3 — no W54 dependency for the bg leg; the specular leg pairs with C)

5. **Q3/C3 — re-point the hover off the same-hue `card 55%` onto a glass-tier lift, on ALL FOUR
   members (RED-4).** Re-point `--dock-control-hover-bg` off the same-hue `card 55%`-over-transparent
   (a sub-1%-ΔL no-op over the `--glass-bg-dock` substrate) onto a glass-tier lift that reads a
   MEASURABLE ΔL above the substrate — a brighter rim / a glass-correct tint a step above the
   substrate, NOT a same-hue card mix (DOCK-controls-nav HA#2). UNIFY the hover MOTION channel: add
   the `--scale-hover-dock` hover scale to `.dock-select-trigger` and `.dock-tab-button` (today
   `dock-controls.css:267-270` + `:443-449` set only bg+color) so all four control members lift on
   hover as ONE comma-group, mirroring the unified `--dock-control-hover-bg` pair (DOCK-controls-nav
   HA#1 — unify the MOTION channel, not just the color channel DK2 already unified). The hover then
   reads BEFORE click on every member. COORDINATE the magnitude with W54's button-hover retune
   (`--scale-hover-btn` → ≈1.045) so "dock + buttons" (the user named them together) read as ONE
   register on the same `--spring-smooth` clock — a near-critical 0% overshoot register so the
   magnify does not read as jelly (the R-path-dock §4 SOTA note). The bg leg lands here; the specular
   leg of the hover affordance (the gleam waking on hover) pairs with C below (the specular
   state-machine).

### C. The dock-glass re-points — the HARD W54-successor (RED-6; C4/C5 — gated on W54)

6. **Clear the 19 resting specular tracks → 0 + cover all four members sized for the small tile.**
   After W54 lands the default-off rest-specular discipline library-wide: extend Card's
   default-off rest-specular to the dock controls + the glass `<Button>` variants so the resting
   track count drops to **0** on the publish edge (the named keyframes I.W6 verification — when AX
   publishes the W54 cut + this re-point, keyframes bumps and the 19 tracks clear). Then bring the
   specular state-machine to ALL FOUR dock members (add `.dock-tab-button` / `.dock-select-trigger` /
   `.dock-dropdown-trigger` to the `glass.css` `::before` catch-light selector lists, or attach
   `glass-specular-track` in their `.vue` class bindings as `DockIconButton.vue:40` does), SIZED for
   the small tile (mint a dock-control-local `--glass-specular-size` override — a smaller % or a
   px-bounded radius — so a 40px tile's hover/active gleam reads as a restrained edge-catch, not the
   I.W6 bloom). This resolves I.W6 the RIGHT way (default-off at rest + family coherence + size),
   NOT the wrong way (turn it off everywhere). **Own the W54↔W61 specular hand-off explicitly**
   (DOCK-controls-nav HA#4): the specular family-coherence currently falls in the seam (W54 excludes
   the dock recipes, W61 says "do NOT touch the specular"). This wave OWNS it: W54 keeps the
   library-wide rest-default-off; THIS wave owns the dock-family hover/active specular coherence +
   sizing; W61's "do NOT touch the specular" exclusion is REMOVED (cross-referenced — W61 is amended
   to point here).

7. **Re-point the selected/active state onto a glass register (the keyframes-dock model).** Re-point
   `--dock-control-active-bg` (`tokens.css:1125`) off the flat `var(--surface-tint-12)` ink wash onto
   a glass-correct active register — a `--glass-bg-*` tier or a glass-correct active token a tier
   ABOVE the re-pointed hover fill — that reads the dock's blurred glass substrate THROUGH it (the
   keyframes-dock "selected element reads as glass" model the user named). The active fill becomes a
   glass tier, not a flat overlay; active ≠ hover (the active a step above the hover register). This
   is the dock-band execution W54 names (`W54:197-202` — "the dock-control re-point executes in the
   dock band"). **Coordination with W61:** W61's RED-witness-3 also names this re-point. To avoid the
   W54↔W61↔dock-band ping-pong, THIS wave (the W54-successor dock-glass close) OWNS the token
   re-point (the glass register); W61 OWNS the demo-dock MIGRATION onto the re-pointed register + the
   `proof:dock-unify` census that asserts ZERO raw active classes survive (rail.vue's
   `bg-foreground/10`, SidebarDock's `is-active`). The TOKEN re-point lands here; the COMPOSED-dock
   adoption lands in W61 (cross-referenced — W61 is amended to consume this wave's re-pointed token,
   not re-author it).

All seven folds are ONE dock-perfection close on the files W45 already owns + the W54-successor
specular/active re-point — gestalt, ON the settled structure. The single-scalar morph (W01/W02), the
region-model template (W45), and the `<DockSeparator>` primitive are UNTOUCHED as engines; this wave
tunes their magnitudes + re-points their glass register.

### SOTA note (the keyframes-dock as the named model)

The user named the keyframes dock as "the model for selected elements" (`pass-3:13`): a selected
tile that reads as a GLASS TIER above the bar — its hover wakes a restrained edge-gleam, its
selected state is a glass-translucent fill that shows the blurred substrate through it, not an opaque
plate. The glass-ui dock today inverts this: it BLOOMS specular at rest (where the keyframes dock is
calm) and stamps a flat ink wash when selected (where the keyframes dock reads glass). The
W54-successor re-point flips both — default-off at rest, glass-tier when selected — so the dock
matches the model the user pointed at.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/styles/tokens.css` | **MINT** §10: `--dock-collapsed-summary-min-size` (the tight pill min-size, RED-1) + `--dock-collapsed-padding` (the smaller collapsed padding, RED-1); **RE-POINT** `--dock-control-hover-bg` (`:1124`) off the same-hue `card 55%` onto a glass-tier lift reading a measurable ΔL above `--glass-bg-dock` (RED-4); **RE-POINT** `--dock-control-active-bg` (`:1125`) off `var(--surface-tint-12)` onto a glass-correct active register a tier above the hover (RED-6, W54-successor); **MINT** the dock-control-local `--glass-specular-size` override (small-tile sizing, RED-6); optionally define `--dock-tile-pad` per-rung as a scaled product (RED-3, if not inlined in dock.css). Do NOT touch the `--dock-scale`/`--dock-mobile-scale`/`--dock-icon-glyph` rows (W45 owns the multiplier seam) or the `--glass-level` rows (W54 owns). |
| `src/styles/dock.css` | **THREAD** `--dock-tile-pad` through `var(--dock-scale)` in the three `--dock-tile-min` declarations (`:261/307/349`, RED-3); **ADD** a `min-block-size` floor to `.glass-dock.collapsed .dock-layer--summary` (`:717`, RED-1). Do NOT re-author the `.glass-dock[data-density]` `* var(--dock-scale)` cascade (W45 owns) or the vertical `--dock-layer-gap` parity rule (W45 owns). |
| `src/styles/dock-controls.css` | **ADD** the `--scale-hover-dock` hover scale to `.dock-select-trigger:hover` (`:445`) + `.dock-tab-button:hover` (`:267`) so all four members lift on hover (RED-4, the MOTION-channel unification); **BIND** the specular state-machine onto the hover/active of all four members (the dock-control-local `--glass-specular-size` + the hover/active gleam, RED-6). Do NOT touch the `.dock-icon-button > svg` glyph rule (W45 owns) or the `--dock-control-hover/active-bg` token VALUES (re-pointed in tokens.css). |
| `src/styles/glass.css` | **ADD** `.dock-tab-button` / `.dock-select-trigger` / `.dock-dropdown-trigger` to the specular `::before` catch-light selector lists (`:88`, `:158`, the hover lists) so the specular covers all four dock members (RED-6, the family coherence). Confirm the dock controls inherit W54's default-off rest-specular (the resting tracks → 0). **glass.css co-writer serialization:** this wave owns ONLY the dock-control selector-list ADDITIONS (line-region-disjoint from W52's `.glass-material::before` recipe + W54's a11y-bracket region); the orchestrator serializes by line-region. |
| `src/components/custom/dock/GlassDock.vue` | **BUILD** the vertical three-region body in the `v-else` branch (`:532`) — the `[persistent (already sibling)] + content stack` structure with `<DockSeparator>` section rhythm (RED-5) — OR, if ratified KISS, leave the bare slot + record the decision (no edit, the W45 contract text + CLAUDE.md carry it). Do NOT touch the horizontal three-region template, the `#persistent` slot wiring, or the morph orchestrator (W45/W01/W02 own). |
| `demo/stories/navigation/dock.vue`, `dock-layers.vue`, `rail.vue`, `header-ribbon.vue` + `demo/stories/compositions/dock-with-slider.vue` | **DELETE** the explicit `h-4 w-4` / `h-5 w-5` glyph-size classes from the `DockIconButton`-hosted glyphs (the 72 sites, RED-2) so the library `--dock-icon-glyph` default paints. Glyphs OUTSIDE a dock control keep their size. (Demo consumer of THIS wave's capability adoption.) |
| `scripts/proof-dock-perfection.mjs` | **NEW** — the device-free arm: the Q1 floor tokens are DEFINED (not just referenced); the collapsed summary carries a `min-block-size`; the `--dock-tile-pad` leg is `* var(--dock-scale)`-threaded in all three `--dock-tile-min` rows; ZERO `DockIconButton`-hosted glyph carries an `h-4 w-4`/`h-5 w-5` override in the demo dock SFCs; the hover scale fires on all four control members; `--dock-control-hover-bg` is NOT a same-hue `card N%` mix (a glass-tier ΔL); `--dock-control-active-bg` is NOT `var(--surface-tint-12)` (a glass register); the four dock members are in the specular `::before` selector lists; the resting dock/Button specular track count is 0 (the keyframes I.W6 metric); the vertical branch carries the three-region body OR the W45 contract records the ratified bare-slot decision. |
| `package.json` | Register `proof:dock-perfection` (+ the W00 meta-gate parity match). |
| `docs/tranches/AX/audit/visual/W45-DELTA.md` + the paired `.png` screenshots | **NEW** — the owed cardinal-lesson DELTA (the W45 band's binding artefact, retroactively backfilled per CAPTURE-PROTOCOL): the Q1 pill, the C1 mobile glyph, the C2 centering, the Q3 hover, the C4/C5 glass register — BEFORE/AFTER at ≥2 viewports × light/dark. |
| `docs/tranches/AX/audit/W45-TUNE-dock-perfection.json` | **NEW** — the born-RED→GREEN audit artefact + the consumer census + the paired-π BEFORE/AFTER + DELTA reference + the W54-successor sequencing note. |

**OUT of bounds:** the `--dock-scale`/`--dock-mobile-scale`/`--dock-icon-glyph` multiplier seam + the `.dock-icon-button > svg` glyph rule + the density `* var(--dock-scale)` cascade + the `#persistent` slot wiring + the `<DockSeparator>` primitive (**W45 owns** — this wave TUNES + RE-POINTS, it does not re-author the capability); the `--dock-morph-t` spring driver / `useLayerTransition.ts` / `DOCK_SPRING` (**W01**); the `SpringProgress` orchestrator internals (**W02**); the `--glass-level` scalar + the library-wide default-off rest-specular discipline + the `--scale-hover-btn` button-hover retune (**W54 owns** — this wave is the dock-band EXECUTION downstream of W54's library-wide cut; it coordinates the magnitude, it does not author the level/specular-default machinery); the nav-PATTERN contract (home-left `#persistent` + nav + dividers across every dock) + the demo-dock MIGRATION (dock-layers / dock-with-slider / SidebarDock / rail.vue onto the one root) + the `proof:dock-unify` four-vocabulary census + the Q1 pill STANDARDIZE across docks (**W61 owns** — this wave mints the Q1 floor tokens + the geometry; W61 standardizes the pattern); the `dock.css`→`src/styles/dock/` partition carve (**W06**); the `overflow="wrap"` recipe (**W04**); the `--spring-*` cohort (**W05**); the demo NAV shell `SidebarDock`/`BottomDock` rebuild + the D9 underline restyle (**W40**); the W56b squircle membership (**W56** — this wave coordinates whether the collapsed pill adopts the superellipse, it does not author the `--corner-shape-*` rows).

---

## Disjointness (sibling waves it must NOT overlap)

W45-TUNE is a dock-band wave that mutates `tokens.css` + `dock.css` + `dock-controls.css` +
`glass.css` + `GlassDock.vue` + the demo dock SFCs — the files W45/W54/W61/W06 serialize on. The
band's "cannot run concurrently" contract applies; the dispatch order:

- **vs W45 (structural capability) — HARD PREDECESSOR (the structure this TUNES).** W45 must be
  dev-landed first (it is). This wave touches the SAME files but disjoint regions: W45 owns the
  `--dock-scale` cascade + the `#persistent`/`<DockSeparator>` capability; W45-TUNE owns the
  collapsed-floor tokens + the hover/active re-point + the tile-pad scale thread + the demo glyph
  drop. Coordinate the `tokens.css` §10 hunks (the multiplier rows vs the new floor/re-point rows are
  line-disjoint) + the `dock.css` hunks (the cascade region vs the `--dock-tile-min` / collapsed
  region). Sequential by dependsOn.
- **vs W54 (glass ROOT) — HARD PREDECESSOR for the C re-points (RED-6).** The dock-glass re-points
  (clear 19→0 specular, glass-selected register) are a HARD successor of W54's default-off
  rest-specular + glass-first register. RED-6 CANNOT GREEN until W54 lands `--glass-level` + the
  library-wide rest-specular default-off. The A+B folds (Q1/C1/C2/C7 + the hover bg re-point) have NO
  W54 dependency and land FIRST; the C folds (RED-6) land AFTER W54. **Sequence: W54 → W45-TUNE(C).**
  W54 writes NO dock-control recipe (`W54:304-306` defers it to the dock band — THIS wave is the dock
  band). File-disjoint on the `--glass-level` machinery; W45-TUNE consumes the W54 default, it does
  not author it.
- **vs W61 (dock-unify-root) — SUCCESSOR (consumes this wave's re-pointed tokens).** W61 owns the
  nav-PATTERN + the demo MIGRATION + the `proof:dock-unify` census + the Q1 pill STANDARDIZE. This
  wave mints the Q1 floor tokens + re-points the hover/active glass register; W61 then MIGRATES every
  demo dock onto the re-pointed register + standardizes the pill. **W61 is AMENDED** (cross-ref): its
  RED-witness-3 active-re-point becomes "CONSUME the W45-TUNE re-pointed `--dock-control-active-bg`"
  (not re-author), and its "do NOT touch the specular-track default-off" exclusion is REMOVED (the
  specular family-coherence is owned HERE, per DOCK-controls-nav HA#4). Sequence: W54 → W45-TUNE →
  W61. File-disjoint: W45-TUNE owns the token VALUES + the CSS recipe; W61 owns the demo SFC
  composition + CLAUDE.md nav-pattern doc.
- **vs W06 (dock.css → partials carve) — DOWNSTREAM.** W06 carves the SETTLED post-tune `dock.css`
  into `src/styles/dock/` partials. W45-TUNE must land BEFORE W06 so W06 carves the SETTLED collapsed
  geometry + the scaled tile-pad. W06 authors NO token re-point, NO specular binding, NO glyph drop.
- **vs W56 (squircle membership) — COORDINATE.** The collapsed-pill RATIFY (does the pill adopt the
  `--corner-shape-bigdock` superellipse?) coordinates with W56b's "and the like" membership. W45-TUNE
  mints the pill GEOMETRY (size/padding); W56 owns the `--corner-shape-*` rows. If the pill adopts the
  superellipse it is a W56 membership note, not a W45-TUNE edit.
- **vs W51 (`--ui-scale` master) — DOWNSTREAM RECONCILE.** W45 shipped `--dock-scale`; W51 re-homes it
  onto `--ui-scale`. W45-TUNE does NOT touch the `--dock-scale` token (it threads `--dock-tile-pad`
  through the EXISTING `--dock-scale`); the W51 reconcile is downstream + file-disjoint on the scale
  master.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — the TUNE + the W54-successor re-point).** Agent 1 (the TUNE arm, no W54
  dependency): mints the Q1 floor tokens + the `min-block-size` floor, threads `--dock-tile-pad`
  through `--dock-scale`, drops the 72 demo glyph-size overrides, builds the vertical three-region
  body (or records the ratified bare slot). Agent 2 (the re-point arm, gated on W54): re-points the
  hover bg onto a glass-tier lift + unifies the hover MOTION channel across all four members,
  re-points the active fill onto the glass register, binds the specular state-machine onto all four
  members sized for the small tile + confirms the resting tracks → 0. Both lint + typecheck at every
  interval; coordinate the `tokens.css`/`dock.css`/`dock-controls.css` hunks (line-disjoint regions).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the six RED witnesses against the patched
  tree: confirms the Q1 floor tokens are DEFINED + the pill floors on both axes; confirms ZERO
  `DockIconButton`-hosted glyph carries a size override in the demo (the 1.5× glyph paints live);
  confirms the `--dock-tile-pad` leg is `* var(--dock-scale)`-threaded + the icon stays centered at
  1.5×; confirms the hover reads a measurable ΔL above the substrate on ALL FOUR members; confirms
  `--dock-control-active-bg` is a glass register (NOT `--surface-tint-12`); confirms the four dock
  members are in the specular selector lists + the resting track count is 0; confirms the vertical
  body is three-region OR the bare-slot decision is recorded. ADVERSARIAL twist: (a) re-adds an
  `h-4 w-4` to one demo glyph → the gate REDs (the glyph-override class); (b) sets `--dock-control-active-bg: var(--surface-tint-12)` → the gate REDs (the ink-wash regression); (c) removes the
  select-trigger hover scale → the gate REDs (the split-brain hover). Drives the VISUAL-TRUTH live
  audit (the binding close) + CAPTURES the DELTA.
- **Gate-author (≤1 agent — born-RED→GREEN).** Authors `proof:dock-perfection` (the device-free
  source-structure arm + the π live arm); confirms each FAILS at `89edffc` (the undefined floor
  tokens, the 72 glyph overrides, the unscaled tile-pad, the same-hue hover, the `--surface-tint-12`
  active, the 2-of-4 specular split, the 19-track bloom, the bare vertical slot) and PASSES on the
  patched tree. Registers `proof:dock-perfection` in `package.json` + the W00 meta-gate parity.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4.)

**Autonomous-resilience clause + triumvirate auto-triggers (per WAVE_SPEC §3a; AX REQUIREMENTS
§22.4b — mandatory):** the wave-agnostic authorization grant is AX.md §6.1 (work AROUND a roadblock
with an idiomatic gestalt fix rather than stall; §6.2 bounds halt-vs-work-around) — by reference.
This wave's §3a auto-triggers:

- **Scope-reveal → halt + triumvirate (Class 2; NEVER absorb in-line):** any need to touch the
  `--dock-scale` multiplier seam / the `.dock-icon-button > svg` glyph rule / the `#persistent` slot
  / the `<DockSeparator>` primitive (W45), the `--glass-level` scalar / the library-wide
  rest-specular default-off / the `--scale-hover-btn` retune (W54), the nav-PATTERN contract / the
  demo-dock migration / `proof:dock-unify` (W61), the `--dock-morph-t` driver (W01), or the
  orchestrator internals (W02) — a scope-reveal → triumvirate, never absorbed in-line.
- **Non-local hard-gate failure → triumvirate (Class 2):** if the hover-bg re-point cannot read a
  measurable ΔL above the substrate without a parallel solid background (breaking glass-first), OR
  the active-glass register cannot be expressed without re-authoring the four-state machinery W45
  owns, OR the specular state-machine cannot cover all four members without the I.W6 bloom returning
  at the small tile size — escalate the gate/model design, do NOT make the gate pass over a residual
  same-hue/ink-wash/bloom state.
- **3rd diagnostic-loop iteration → triumvirate (Class 2):** if the hover still reads as
  imperceptible after three retunes (the Q3 chronic — re-prove on the live render, not from source),
  OR the 1.5× glyph + scaled tile-pad still mis-centers the icon after three retunes, dispatch
  research→plan→redress rather than tuning constants ad hoc.
- **§5.3 ratify reached un-ratified → HALT-and-ratify (Class 3):** the collapsed-pill tight min-size
  magnitude + the superellipse adoption (vs round, coordinate W56b), the vertical three-region body
  vs the ratified bare-slot KISS decision, and the glass-register active-fill choice (a `--glass-bg-*`
  tier vs a glass-correct active token a tier above hover) are ratify-before-impl — if reached
  un-ratified, take the recorded default (a tight pill ≈70% of `--dock-layer-height` + round;
  the vertical bare-slot recorded as KISS; the active fill a glass-correct token a tier above hover)
  + surface to the orchestrator, do NOT self-ratify.

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**`proof:dock-perfection` — born-RED→GREEN. TWO arms (device-free + fail-closed π live).**

### Arm 1 — device-free SOURCE/STRUCTURE (the no-device CI arm)

A source-structure parse (the precept-valid artefact form — the SFC / CSS string / token is the
artefact, NOT a grep-for-runtime-behaviour):

- **Q1 — the collapsed-pill floor tokens are DEFINED + the pill floors on both axes.** Assert
  `--dock-collapsed-summary-min-size` AND `--dock-collapsed-padding` are MINTED in `tokens.css` (not
  just referenced as `var(…)` fallbacks); assert `.glass-dock.collapsed .dock-layer--summary` carries
  a `min-block-size` (the symmetric floor). **Born-RED at HEAD** (both tokens undefined; only
  `min-width` floors).
- **C1 — ZERO demo glyph-size overrides on dock controls.** Assert NO `DockIconButton`-hosted glyph
  in the demo dock SFCs (`dock.vue`/`dock-layers.vue`/`rail.vue`/`header-ribbon.vue`/`dock-with-slider.vue`) carries an `h-4 w-4`/`h-5 w-5` size class. **Born-RED at HEAD** (72 occurrences).
- **C2 — `--dock-tile-pad` is `--dock-scale`-threaded.** Assert all three `--dock-tile-min`
  declarations multiply the `--dock-tile-pad` leg by `var(--dock-scale)` (or `--dock-tile-pad` is a
  per-rung scaled product). **Born-RED at HEAD** (a bare `var(--dock-tile-pad, Nrem)` at `:261/307/349`).
- **Q3/C3 — the hover is a glass-tier register on ALL FOUR members.** Assert `--dock-control-hover-bg`
  is NOT a same-hue `color-mix(in srgb, var(--card) N%, …)` (it reads a glass-tier ΔL above the
  substrate); assert the `--scale-hover-dock` hover scale fires on `.dock-icon-button` AND
  `.dock-tab-button` AND `.dock-select-trigger` AND `.dock-dropdown-trigger` (the unified MOTION
  channel). **Born-RED at HEAD** (hover bg = `card 55%`; the scale fires on 2 of 4).
- **C4/C5 — the glass register + the cleared specular (the W54-successor).** Assert
  `--dock-control-active-bg` is NOT `var(--surface-tint-12)` (it is a `--glass-bg-*` tier / a
  glass-correct active token); assert the four dock members are in the `glass.css` specular `::before`
  selector lists; assert the resting dock/Button specular track count is 0 (the keyframes I.W6
  metric, sized via the dock-local `--glass-specular-size`). **Born-RED at HEAD** (active =
  `--surface-tint-12`; specular on 1 of 4; 19 resting tracks).
- **C7 — the vertical body is three-region OR the bare-slot decision is recorded.** Assert the
  `GlassDock.vue` vertical branch carries the three-region body, OR the W45 contract text +
  CLAUDE.md record the ratified bare-slot KISS decision. **Born-RED at HEAD** (a bare `<slot/>` with
  no recorded decision — a silent scope-miss against the W45 text).

These are **source-structure** proofs. The RUNTIME behaviour (the painted pixels) is proven by the π
live arm, NOT a text gate.

### Arm 2 — fail-CLOSED π live/render (the device truth arm; the wave's binding close)

A live Playwright + frontend-design render in the π workspace, FAIL-CLOSED. Renders the dock at ≥2
viewports (desktop + 375×667 mobile) in light AND dark:

- **Q1 — the collapsed pill is a tight proportioned squircle.** The collapsed `<GlassDock>` summary
  renders as a tight pill (a measured min-size below the full `--dock-layer-height`, floored on both
  axes), NOT a full-control-width stub. FAIL-CLOSED if the collapsed pill is full-row-sized.
- **C1 — the mobile 1.5× glyph PAINTS.** At 375×667 the dock glyph renders ~1.5× its desktop size
  (a pixel-measured glyph delta above a 1.4× floor, below a 1.6× ceiling) — NOT a 1.25rem glyph
  swimming in a scaled box. FAIL-CLOSED if the glyph holds its desktop size on mobile.
- **C2 — the icon stays concentrically centered at 1.5×.** At 375×667 the glyph is centered in its
  scaled tile (the tile-pad scaled in lockstep). FAIL-CLOSED if the icon hugs an edge.
- **Q3/C3 — the hover reads BEFORE click on all four members.** Hover each of the four dock controls
  slowly; each renders a perceptible glass-tier delta on HOVER (a measured bg ΔL above the substrate
  + the hover scale + the specular gleam waking) — NOT "nothing until click." A getComputedStyle
  readback per member confirms the scale + bg ΔL + specular-intensity all move on hover. FAIL-CLOSED
  if any member's hover is a sub-1%-ΔL no-op (the Q3 state).
- **C4/C5 — the selected control reads as glass; the resting specular is clean.** The
  selected/active control reads as a glass tier above the bar (the blurred substrate shows through),
  NOT a flat ink stamp; the resting dock controls carry NO specular bloom (the 19→0 verification).
  FAIL-CLOSED if the active reads opaque or the rest blooms.
- **Affordance / hierarchy / spacing / NO visual occlusion** per the AX cardinal gate; no regression
  on the existing morph (the W01/W02 morph still settles on one spring).

**The wave does NOT close on the device-free arm alone** — the executed π live audit (captured as a
paired-π BEFORE/AFTER + DELTA at `docs/tranches/AX/audit/visual/W45-DELTA.md` + the `.png`
screenshots, per CAPTURE-PROTOCOL) is the binding close criterion. The BEFORE capture pins the HEAD
mis-sized-pill / swimming-glyph / same-hue-hover / ink-wash-selected / 19-track-bloom render the new
TUNE + re-point must visibly beat. This DELTA also RETROACTIVELY discharges the W45 band's owed
capture (CAPTURE-PROTOCOL "Retroactive backfill owed" — W45 listed). The cardinal AX lesson: green
source structure over an unvalidated render is the failure W00 was built to close — the π arm is
fail-closed so a green source arm alone cannot mark this complete.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open) + the BEFORE capture.** Re-confirm the six RED
   witnesses against HEAD `89edffc` on the live demo: the mis-sized collapsed pill (Q1), the swimming
   1.25rem glyph on mobile (C1, the 72 overrides win), the off-center icon at 1.5× (C2), the
   imperceptible hover on all four members (Q3/C3), the ink-wash selected + 19 resting blooms (C4/C5),
   the bare vertical slot (C7). Confirm W45 (the structure) + W54 (the glass ROOT, for the C re-points)
   ARE landed. CAPTURE the BEFORE π render at ≥2 viewports × light/dark as the born-RED baseline in
   `audit/visual/W45-DELTA.md`. Do NOT proceed on the audit's word — re-prove.
2. **Author the born-RED gate.** `proof:dock-perfection` (the device-free source-structure arm + the
   fail-closed π live arm); register in `package.json` + the W00 meta-gate; confirm it FAILS at HEAD.
3. **The TUNE arm (no W54 dependency).** Mint the Q1 floor tokens + the `min-block-size` floor;
   thread `--dock-tile-pad` through `--dock-scale`; drop the 72 demo glyph-size overrides; build the
   vertical three-region body (or record the ratified bare slot). Lint + typecheck.
4. **The hover-bg re-point (no W54 dependency for the bg leg).** Re-point `--dock-control-hover-bg`
   onto a glass-tier lift; unify the hover MOTION channel (the `--scale-hover-dock` on all four
   members). Lint + typecheck.
5. **The W54-successor re-point (gated on W54 landed).** Re-point `--dock-control-active-bg` onto the
   glass register; bind the specular state-machine onto all four members sized for the small tile;
   confirm the resting tracks → 0 (the keyframes I.W6 metric). Lint + typecheck.
6. **Gate GREEN + VISUAL-TRUTH.** Confirm the device-free arm passes; run the fail-closed π live
   audit (the tight pill; the 1.5× glyph painting; the centered icon; the perceptible hover on all
   four; the glass-selected register; the clean rest) at ≥2 viewports × light/dark; capture the
   paired-π BEFORE/AFTER + DELTA + screenshots in `audit/visual/W45-DELTA.md`; write
   `audit/W45-TUNE-dock-perfection.json` to GREEN. Re-mark W45 + W45-TUNE `live-verified` ONLY when
   the DELTA exists.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W45-TUNE-dock-perfection.json` — the born-RED→GREEN ledger: the six RED
  witnesses (undefined floor tokens, 72 glyph overrides, unscaled tile-pad, same-hue hover,
  ink-wash active + 19 resting tracks, bare vertical slot), the per-fold disposition (A: Q1/C1/C2/C7;
  B: Q3 hover; C: the W54-successor glass re-point), the W54-successor sequencing note (the C folds
  gate on W54 landed), the consumer census (the demo-dock glyph-drop + the keyframes I.W6 track-count
  edge), and the post-wave GREEN structure + π-readback measurements.
- `scripts/proof-dock-perfection.mjs` — the device-free source-structure arm + the fail-closed π
  live arm.
- `docs/tranches/AX/audit/visual/W45-DELTA.md` + the paired `.png` screenshots — the owed
  cardinal-lesson DELTA (retroactively discharging the W45 band's missing capture): the Q1 pill, the
  C1 mobile glyph, the C2 centering, the Q3 hover, the C4/C5 glass register — BEFORE/AFTER at ≥2
  viewports × light/dark, with the getComputedStyle readbacks (the exact scale + bg ΔL +
  specular-intensity numbers the wave changed).
- A cross-repo NOTE annex (NOT executed here): the speedtest dock + bbnf-buddy ToolsLayer inherit the
  re-pointed `--dock-control-hover-bg`/`--dock-control-active-bg` glass register + the cleared resting
  specular token-first; the keyframes I.W6 19-track clear lands on the W54+W45-TUNE publish edge (no
  keyframes action — a glass-ui fix the keyframes consume on bump).

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(dock): proof:dock-perfection born-RED — Q1 floor tokens, C1 glyph overrides, C2 tile-pad, Q3 hover, C4/C5 glass register, C7 vertical body (AX.W45-TUNE)`
2. `fix(dock): Q1 collapsed-pill floor tokens + symmetric min-block-size + C2 --dock-tile-pad × --dock-scale (AX.W45-TUNE)`
3. `fix(demo): drop the 72 DockIconButton glyph-size overrides so --dock-icon-glyph paints the 1.5× mobile scale (AX.W45-TUNE C1)`
4. `feat(dock): vertical three-region body (or record the ratified bare-slot KISS decision) (AX.W45-TUNE C7)`
5. `fix(dock): Q3 hover re-point off card-55% onto a glass-tier lift + unify the hover scale across all four control members (AX.W45-TUNE Q3/C3)`
6. `feat(dock): W54-successor glass re-point — selected/active glass register + clear the 19 resting specular tracks to 0 on all four members (AX.W45-TUNE C4/C5)`
7. `chore(AX.W45-TUNE): audit ledger GREEN + the owed W45-DELTA.md paired-π BEFORE/AFTER + screenshots + consumer-token NOTE`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER
stage/commit/stash per the hardened agent git clause. These are the messages the orchestrator
authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W45 (structural capability) — HARD.** The region-model + `--dock-scale` cascade +
  `<DockSeparator>` this wave TUNES + re-points. Must be dev-landed (it is).
- **AX.W54 (glass-level ROOT) — HARD for the C re-points (RED-6).** The default-off rest-specular +
  the glass-first register the dock-glass re-points succeed. The C folds CANNOT GREEN until W54
  lands; the A+B folds have no W54 dependency. Must run AFTER W54.
- **AX.W00 (π visual-runtime lane + CAPTURE-PROTOCOL) — the close machinery.** The device-free +
  fail-closed π arms ride the W00 lane; the captured `W45-DELTA.md` is the binding close. W45-TUNE
  cannot close on the source arm alone.
- **Downstream:** **AX.W61** consumes the re-pointed `--dock-control-active-bg`/`--dock-control-hover-bg` glass register (it MIGRATES every demo dock onto it + standardizes the Q1 pill — W61 is
  AMENDED to consume-not-re-author + its specular-exclusion removed); **AX.W06** carves the SETTLED
  post-tune `dock.css`; **AX.W56** coordinates the collapsed-pill superellipse membership; **AX.W51**
  re-homes `--dock-scale` onto `--ui-scale` (downstream); **AX.W34** receives the consumer-token NOTE.

---

## DEDUP (why no OTHER wave owns this — the hardening finding proved it)

The hand-challenge (CH-dock, DOCK-controls-nav, DOCK-variants) proved at SOURCE that the dock-band
TUNE + the W54-successor re-point fall in a SEAM no existing wave owns. The exclusions, restated:

- **vs W45 (structural capability) — DISTINCT (the structure, not the tune).** W45 authored the
  `#persistent` region, the `--dock-scale` cascade, the `<DockSeparator>` primitive — the CAPABILITY.
  It did NOT mint the Q1 floor tokens (referenced-but-undefined at HEAD), thread `--dock-tile-pad`
  through `--dock-scale`, drop the demo glyph overrides, re-point the hover/active glass register, or
  build the vertical body — those are the PERFECTION the capability needs, found product-dead by the
  hand-challenge. **W45 ≠ this wave.**
- **vs W54 (glass ROOT) — PREDECESSOR (the library-wide cut, not the dock execution).** W54 lands
  `--glass-level` + the library-wide default-off rest-specular + the glass-first register, and
  EXPLICITLY defers the dock-control re-point to the dock band (`W54:197-202,304-306`: "the
  dock-control re-point executes in the dock band"). THIS wave is that dock-band execution. W54
  writes NO dock-control recipe. **W54 ≠ this wave.**
- **vs W61 (dock-unify-root) — SUCCESSOR (the nav-pattern + migration, not the token re-point).** W61
  owns the home-left `#persistent` nav PATTERN across every dock + the demo MIGRATION + the
  `proof:dock-unify` four-vocabulary census + the Q1 pill STANDARDIZE. It CONSUMES this wave's
  re-pointed glass-register tokens (W61 is amended to consume-not-re-author). The token re-point + the
  specular family-coherence are UPSTREAM of W61's migration (DOCK-controls-nav HA#4 assigns the
  specular hand-off here, removing the W61 exclusion). **W61 ≠ this wave.**
- **vs W06 (dock.css → partials carve) — DOWNSTREAM.** W06 carves the SETTLED post-tune `dock.css`
  VERBATIM; it authors no token re-point, no glyph drop, no specular binding. The carve MOVES the
  settled rules unchanged. **W06 ≠ this wave.**
- **The specular family-coherence + the active glass-register were UN-OWNED (the seam).** I.W6 ("19
  tracks bloom") disposed into W54 ("specular-track default-off") → W54 FileBounds EXCLUDE the
  dock-control recipes → W61 ("do NOT touch the specular-track default-off"). The dock-family
  hover/active specular coherence + the small-tile sizing + the glass-register active fall in the
  seam between W54 and W61 — owned by NEITHER (CH-dock CHRONIC-2, DOCK-controls-nav CHRONIC-2). THIS
  wave OWNS the seam: W54 keeps the library-wide rest-default-off; THIS wave owns the dock-family
  specular coherence + sizing + the active glass-register; W61 consumes + migrates. The chronic
  un-owned hand-off is CLOSED here.

No planned wave owns the dock-band TUNE (Q1 pill geometry, the demo glyph drop, the scaled tile-pad,
the vertical body) + the W54-successor glass re-point (the selected/active glass register, the
cleared + family-coherent + tile-sized specular). This is the dock-perfection CLOSE the GOLDEN-synthesis §4b sequences (items 1+3) — NET-NEW, between the W45 structure and the W61 unify.
