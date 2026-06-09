# CH-dock — adversarial red-team of the AX dock band (W01-W06, W45, W61/dock-unify-root, DK1-DK10)

**Lane** CH-dock (hardening challenge) · **HEAD** `89edffc` (3.8.0 + conv-1/2 + W45 DEVELOPED +
pass-3 ledger) · **Mode** read-only PLANNING (no code) · **Date** 2026-06-09 · **Verdict** WEAK

The dock band is the AX flagship and the most-developed lane — W01-W04 sound, W45's structural
capability genuinely shipped (three-region template, `<DockSeparator>`, `--dock-scale`, DK1/DK7
clock fixes, DK2/DK4/DK8 folds). The mechanisms are real and largely well-architected. But the
band is NOT at perfection, and several of its "GREEN"/"live-verified" marks are headless-green
over a product-dead or product-wrong magnitude — the exact cardinal-lesson trap the tranche was
built to close. The self-audit `R-path-dock.md` already caught GAP-1..GAP-8 honestly; this
red-team goes harder and finds the gaps `R-path-dock.md` UNDER-STATES or MISSED.

---

## CHALLENGES THAT FOUND A WEAKNESS (falsifiable, source-grounded)

### C1 — The library glyph-ownership capability (W45 RED-witness-4 GREEN) paints NOTHING in the actual product. PRODUCT-DEAD.
W45 added `.dock-icon-button > svg { width/height: var(--dock-icon-glyph) }`
(`dock-controls.css:149-152`) with `--dock-icon-glyph: calc(1.25rem * var(--dock-scale))`
(`tokens.css:1117`) — the headline mobile ergonomic ("the glyph scales WITH the box at 1.5×").
The wave contract: "a consumer-passed explicit lucide size class still WINS (utility > component
layer)." **Falsifiable miss:** every `DockIconButton` glyph in the demo carries an explicit
Tailwind size — 47 occurrences of `h-4 w-4` / `h-5 w-5` across `demo/stories/navigation/*`
(`dock.vue:89` `<Home class="h-4 w-4" />`, and 46 more). Each one WINS over `--dock-icon-glyph`,
so the library glyph ownership — and the mobile 1.5× glyph scale that is THE point of `--dock-scale`
— is a no-op on every real dock in the product. The π live arm's claim "at 375×667 the glyph
renders ~1.5×" can only pass on a synthetic dock with NO size class; the demo (the live-audit
surface) shows a 1.25rem glyph in a scaled box on mobile, i.e. the exact "glyph swimming" state the
wave claimed to fix. R-path-dock did not flag this. **HARDENING:** the demo's `DockIconButton`
glyphs must DROP the `h-4 w-4`/`h-5 w-5` sizes so the library default takes over (a one-line per-site
edit, ~47 sites) — otherwise the glyph-ownership + 1.5× mobile scale is forever invisible. This is
the demand-side adoption the wave skipped.

### C2 — `--dock-tile-pad` is NOT `--dock-scale`-threaded → DK4 grid-alignment RE-BREAKS on mobile. The fix re-introduces its own anti-pattern.
W45's DK4 fold (`W45 doc §DK4`) explicitly warned: "a flat 72px tile around a 1.5×-scaled glyph
would be a NEW misalignment," and routed `--dock-tile-min` into the density cascade as
`calc(--dock-control-size + --dock-tile-pad)`. **Falsifiable miss:** `--dock-tile-pad` is a FLAT
literal at all four density rungs — `calc(var(--dock-control-size) + var(--dock-tile-pad, 1rem))`
(`dock.css:261`), `, 2rem)` (`:307`), `, 2.75rem)` (`:349/:390`) — NONE multiplied by
`var(--dock-scale)`. So on mobile the control-size scales 1.5× but the tile padding stays fixed:
the tile/control RATIO shifts, the icon is no longer concentrically centered in its scaled tile —
the exact "new misalignment" the wave promised to avoid. The DK4 self-check passes on desktop
(`--dock-scale: 1`) and silently regresses at the coarse-pointer 1.5×. **HARDENING:** thread
`--dock-tile-pad` through `* var(--dock-scale)` (or fold it into `--dock-tile-min` as a scaled
product) so the tile and control scale in lockstep — then re-verify DK4 centering at 375×667 (the
W45 π arm claimed this but the math can't hold).

### C3 — Q3 hover is structurally sub-perceptual: rest, hover, AND active are all translucent INK/CARD tints — none is a glass register. The DK2 "fix" did not address what the user reported.
The user's Q3 (pass-3 `:28`): "The HOVER effect for the dock + buttons is NOT noticeable — only on
CLICK is it visible." R-path-dock filed this as "AT-RISK (magnitude TUNE)." That under-states it —
it is a REGISTER problem, not a magnitude knob. At source: hover bg =
`--dock-control-hover-bg: color-mix(in srgb, var(--card) 55%, transparent)` (`tokens.css:1124`);
active bg = `--dock-control-active-bg: var(--surface-tint-12)` =
`color-mix(in srgb, var(--foreground) 12%, transparent)` (`tokens.css:452,1125`). Both are
near-invisible translucent fills (card-at-55%-alpha and 12% ink) — over a LIGHT background (Q3's
exact condition) the 55%-card hover wash is barely distinguishable from rest, and the 12%-ink active
is only marginally darker. There is NO glass register on the hover state (no specular gleam waking,
no backdrop-darken) — only a scale pop (`--scale-hover-dock: 1.1`). The user reads "nothing on hover,
something on click" because the hover delta is a sub-threshold alpha shift while the click delta adds
a press-squish. W54 INTENDS to fix this (its RED-witness-3 + the `--scale-hover-btn` retune + "the
glass surface's hover = its specular gleam waking"), but **W54 is NOT landed** (see C6), so Q3 is
still wrong on the live product. R-path-dock's "tune the magnitude" framing risks bumping
`--scale-hover-dock` (already 1.1, the SOTA magnify-follow note in R-path-dock §4 even WARNS against
overshoot) instead of giving the hover a perceptible SURFACE change. **HARDENING:** the Q3 dock fix
must add a perceptible surface delta to hover (a readable glass-tint darken or specular catch-light
waking), not just a larger scale — and it must coordinate with W54's button-hover retune as ONE
register, since the user named "dock + buttons" together.

### C4 — Glass-cohesion BROKEN: 19 dock/Button specular tracks bloom at REST where Card is clean. N divergent glass surfaces, not ONE model.
The prompt's seed finding, confirmed at source. `--glass-specular-intensity-rest: 0` globally and
W52 made `<Card>` opt-in (`Card.vue:74` `specular: "off"`), but the dock controls + the glass
`<Button>` variants attach the `glass-specular-track` pseudo BY DEFAULT
(`from-keyframes-IW6-dock-button-specular.md:14-17`) — they were never made opt-in like Card. So at
glass-ui 3.8.0 the keyframes I.W6 assay measured **19 dock/button specular tracks blooming where the
cards are clean (0)**. This is the textbook MAXIMAL-glass-first cohesion FAILURE: two glass surfaces
(Card vs dock/Button) speak two different rest-specular disciplines. It folds into W54 — which is NOT
landed. Until then, the dock and the glass buttons carry a resting white-bloom the Card spent W09+W52
to kill. **HARDENING:** the W54 cut must extend Card's default-off rest-specular discipline to the
dock controls + glass Button so EVERY glass surface shares ONE rest-specular model (default-off /
bounded edge-gleam) — and the keyframes 19-track count must drop to 0 on the publish edge (the named
verification).

### C5 — The dock's SELECTED/ACTIVE state is NOT glass — contradicting the user's explicit "the keyframes dock is the model for selected elements."
Pass-3 `:13` (TOP precedence): "GLASS FIRST for buttons + items EVERYWHERE, and in the dock (the
keyframes dock is the model for selected elements)." At source the dock active fill is
`--dock-active-bg → --dock-control-active-bg → var(--surface-tint-12)` (`tokens.css:1125,1152`) — a
12%-foreground-over-transparent INK tint. It has no `backdrop-filter`, no `--glass-bg-*`, no
specular: it is an ink wash, not a glass register. DK2 improved it (re-pointed off the OPAQUE
`--muted` onto a translucent tint), but "translucent ink tint" ≠ "glass." W54 itself records this as
DEFERRED: "(where a control still defaults to a solid active fill) flip it … the dock-control
re-point executes in the dock band if a control is still solid" (`W54 doc §dock`). So the glass-first
dock-selected state the user named as the MODEL is unbuilt, and W54 punts it back to the dock band,
and no dock wave owns the re-point. **HARDENING:** a dock-band fold (W45b or W61) must give the
dock-control active/selected state a real glass register (a glass-bg tier + the bounded edge-gleam),
matching the keyframes-dock model — token-first, owned explicitly, not left in the W54↔dock-band
ping-pong.

### C6 — W54 (the ROOT the whole page-redesign + dock-glass-cohesion depends on) is NOT landed — and three dock-blocking defects (C3/C4/C5) are gated on it.
Falsifiable at source: `grep glass-level src/styles/tokens.css` → 0; `grep glass-opaque
src/styles/glass.css` → 0; `button/index.ts:81` still `defaultVariants.variant: 'default'` (opaque
`bg-primary`). PROGRESS marks W54 `planned`. Yet C3 (dock hover), C4 (specular cohesion), C5
(dock-selected glass) all route their fix through W54. The dock band cannot reach "glass-first
perfection" until W54 lands AND the dock-band re-points execute on top of it. The MASTER-PLAN
correctly sequences W54 as Batch-1 ROOT, but the dock-finish (Batch-3) and W54 (Batch-1) BOTH touch
the dock-control surfaces — the C3/C4/C5 re-points are a HARD successor of W54, not parallel.
**HARDENING:** explicitly bind the dock-glass re-points (C3/C4/C5) as a W54-successor dock fold in the
DAG; do not let W45-TUNE close "dock glass-first" before W54 + the re-points land.

### C7 — Vertical-dock H/V parity is HALF-done: CSS reads the cascade, but the TEMPLATE never got the three-region structure W45 committed to. The bare `<slot/>` survived.
W45 scope item 2 + FileBounds: "Give the vertical branch (`:509-511`) the same three-region structure
(not a bare `<slot/>`)." **Falsifiable miss:** `GlassDock.vue:530-532` is STILL
`<template v-else><slot /></template>` — a bare slot. The vertical dock gets the `#persistent` top
sibling (`:497-499`) and the CSS gap parity (`dock.css:561` reads `--dock-layer-gap`), but the body
is still a single bare slot with no `[persistent][divider][morph-region]` structure — no built-in
rhythm, no morph-region for a vertical dock. So a vertical multi-section dock still has NO structural
divider/region rhythm; the parity the wave claimed ("same three-region structure both orientations")
is CSS-only, not structural. The π arm's "H/V parity PAINTS" check measures GAP, which is real, but
the structural-region parity is unbuilt. **HARDENING:** either build the vertical three-region body
(the committed scope) OR amend the W45 contract to "CSS parity only" and record the bare-slot vertical
body as a deliberate KISS choice — currently it's a silent scope-miss against the wave's own text.

### C8 — dock-unify-root (W61) and the persistent-everywhere intent: ~1/N adopted. The capability shipped, the demand-side did not.
The user's explicit pass-3 directive (`:18`, `:51`): "ALL docks leverage the SAME root component:
home button on the LEFT, navs, dividing lines." **Falsifiable miss:** only ONE demo dock adopted
`#persistent` (`navigation/dock.vue:88`). `dock-layers.vue:200` and `dock-with-slider.vue:112,139`
still use `#collapsed` slots and have NOT adopted the persistent/home-left/nav pattern. There is NO
W61 wave doc (`ls docs/tranches/AX/waves/AX.W6*.md` → no matches) — dock-unify-root is named in
pass-3 + MASTER-PLAN but UNAUTHORED. So "all docks same root, home-left, navs, dividers" is a
capability sitting unused; the demand-side validation (the user's whole point) is unmet. R-path-dock
GAP-8 flags the missing wave doc but does not quantify the 1/N adoption. **HARDENING:** author the
W61 dock-unify-root wave (a canonical nav PATTERN: `#persistent` home-left + nav controls +
`<DockSeparator>` group dividers) AND migrate every demo dock onto it — the keyframes dock is the
named model. Without the migration, the persistent region is overfit substrate (the ≥2-consumer bar
is met by 1 demo + the speedtest inherit, but the INTENT — every dock — is unmet).

### C9 — DK3 (page-flow + missing icon) is UN-RESOLVED and un-ratified. The default `position="inline"` reflows page flow per morph frame.
DK3 (pass-2): "Collapsible dock should NOT modify page flow (perhaps); the icon is missing."
At source `position` defaults to `"inline"` (`GlassDock.vue:143`) → `.dock-inline { margin: 0 auto }`
(`dock.css:788-789`) — an in-flow centered block that REFLOWS the page as the dock morphs width. The
user's "should NOT modify page flow" implies the iOS float-above-content default (a non-reflowing
overlay), but W45 recorded the default as in-flow/co-morph and left DK3 as an unresolved RATIFY
(R-path-dock GAP-5). The "icon is missing" half of DK3 overlaps DK1/DK6 (collapsed glyph) — the DK1
clock fix addresses the timing, but no wave confirms the icon is PRESENT in the collapsed state on
the live product (no DELTA). **HARDENING:** ratify DK3 (in-flow default vs non-reflowing overlay
default) WITH the user before W45-TUNE closes; if overlay is chosen it's a default-register flip
(clean break, no alias) that the dock-unify-root wave should carry.

### C10 — CARDINAL LESSON: W45 is marked `live-verified (DEVELOPED)` in PROGRESS with ZERO captured DELTA. Its own JSON says DEV-COMPLETE / live-arm-OWED.
The flagship cardinal-lesson violation. PROGRESS:63 reads `W45 | live-verified (DEVELOPED)`;
MASTER-PLAN:11-12 says "just landed live-verified." But `W45-dock-region-model.json:5` status =
`"DEV-COMPLETE (headless self-gated; live π-lane visual-truth + timing TUNE owned by the
orchestrator)"` with a full `liveArmOwed` block, and `proof:dock-big-dock / dock-clip-reveal /
dock-layering-polish` = `SKIP (befitting-silent device-absence)`. There is NO `W45-DELTA.md` (W01/W02
HAVE `-DELTA.md`; W45 does not), and `audit/visual/` contains ONLY `CAPTURE-PROTOCOL.md` — which
itself LISTS W45 in "Retroactive backfill owed" (`:26`). So the live-verified mark is unsubstantiated
by the tranche's OWN discipline, and pass-3 Q1+Q3 are the live contradictions proving the visual
truth was never GREEN. **HARDENING:** re-mark W45 `live-pending` until the paired-π BEFORE/AFTER DELTA
+ screenshots at ≥2 viewports × light/dark land in `audit/visual/W45-DELTA.md` per CAPTURE-PROTOCOL,
WITH Q1/Q3/C1/C2 re-checked on the captured render.

---

## CHRONIC DEFERRALS / MISSES (slip-history)

- **CHRONIC-1 — headless-green over live-broken (the dock IS the case study).** Ten DK defects +
  three Q defects shipped under W01-W04 `complete` and W45 `live-verified (DEVELOPED)` because the
  status collapsed to headless-green/MCP-spot-check (R-path-dock §5 closing). Recurrence: W04
  (`min(max-content)` invalid-CSS shipped GREEN, found only live — PROGRESS:100-114); W45 (Q1/Q3
  found only after the live audit). Slip count: this is the SAME class as the AW halt (MEMORY:
  "headless-green/visually-broken gap") and W09/W05 cardinal re-opens (PROGRESS:168-189). The dock
  band has now slipped on it across W04 → W45 → Q1/Q3 — at least 3 dock-band tranches/waves.

- **CHRONIC-2 — no `audit/visual/` captures.** MASTER-PLAN:52 lists "No audit/visual/ captures" as a
  headline gap; CAPTURE-PROTOCOL.md exists but `audit/visual/` holds ZERO screenshots. W45/W52/W53/
  W56/W57/W59 ALL marked live-verified, ALL owe a DELTA (CAPTURE-PROTOCOL:26). The discipline was
  WRITTEN but never executed — the capture debt is the round-2 aggregation inflation the inventory
  itself flagged. Slip: every "live-verified" convergence wave.

- **CHRONIC-3 — capability-without-adoption (overfit-risk inversion).** W45 shipped `#persistent` +
  `--dock-icon-glyph` + `--dock-scale` glyph ownership; the demo adopts `#persistent` on 1 dock (C8)
  and overrides `--dock-icon-glyph` on all 47 glyph sites (C1). The capability passes the gate; the
  product never uses it. This is the mirror of the overfitting-audit precept (every artefact ≥2
  sites) — here the artefact has the SITES on paper but the demand-side adoption is skipped, so the
  capability is live-dead. Recurs with the dock-unify-root intent (C8).

- **CHRONIC-4 — PROGRESS ↔ JSON status inflation.** R-path-dock GAP-1 already caught
  PROGRESS:63 (`live-verified`) vs the JSON (`DEV-COMPLETE … TUNE owed`). The inflation is a standing
  pattern (W09/W05 were `complete` over JSON `live-pending` — PROGRESS:180-185). The W45 line was
  never reconciled down. Slip: recurring at every convergence roll-up.

- **CHRONIC-5 — W06 deferred across the whole tranche.** W06 (carve + honest-rail DK9 + DK6/DK10
  showcase) has been `planned` since W00; `dock.css` has DRIFTED 1227 → 1639 → (now larger post-W45)
  with no carve; `demo/stories/foundations/dock-active-tokens.vue` debris still ships; the DK9 rail
  type-narrow + the DK6/DK10 vertical-vs-rail SHOWCASE are unauthored. W06's spec also CONTRADICTS
  W18 (RATIFY-#1 flat siblings vs first-class category — R-path-dock GAP-4) and is un-amended. The
  dock band's VISIBILITY (the live-audit surface) is gated on W06, which keeps slipping.

---

## HARDENING ACTIONS (to PERFECT the dock — PLANNING, no code)

1. **W45-TUNE wave (the binding close).** Capture the paired-π BEFORE/AFTER DELTA at ≥2 viewports
   (desktop + 375×667) × light/dark to `audit/visual/W45-DELTA.md` + screenshots per CAPTURE-PROTOCOL.
   In it, re-verify and FIX: Q1 (collapsed pill size), Q3/C3 (hover needs a perceptible SURFACE
   delta, not just scale), C1 (drop demo glyph size classes so `--dock-icon-glyph` paints), C2
   (thread `--dock-tile-pad` through `--dock-scale`). Re-mark W45 `live-pending` until this lands.

2. **Bind the dock-glass re-points as a W54-successor fold (C3/C4/C5).** After W54 lands the glass-level
   ROOT: extend Card's default-off rest-specular discipline to dock controls + glass Button (clear the
   19 keyframes tracks → 0), give the dock active/selected state a real glass register (the keyframes-
   dock model), and tune the dock hover to a perceptible glass-surface delta as ONE register with the
   button hover. This is a HARD successor of W54, serial on the dock-control surfaces.

3. **Author the W61 dock-unify-root wave + MIGRATE every demo dock.** A canonical nav PATTERN
   (`#persistent` home-left + nav controls + `<DockSeparator>` group dividers; keyframes dock as the
   named model). Migrate `dock-layers.vue` + `dock-with-slider.vue` (and every demo dock) onto it —
   the persistent region's demand-side validation. Fold the Q1 collapsed-pill sizing finalize here.

4. **Fix C7 (vertical three-region body) or amend the W45 contract.** Build the vertical
   `[persistent][divider][morph-region]` body in `GlassDock.vue:530-532` (the committed scope), OR
   record the bare-slot vertical body as a deliberate KISS choice and amend the W45 text — currently a
   silent scope-miss.

5. **Ratify DK3 (page-flow default) with the user.** In-flow co-morph (status quo) vs non-reflowing
   overlay default (the iOS float-above-content idiom "should NOT modify page flow" implies). If
   overlay, it's a default-register flip carried by W61. Resolve BEFORE W45-TUNE closes.

6. **Amend W06 (GAP-4) then drive it.** Fold the D14 content scope in, flip RATIFY-#1 toward W18's
   first-class category, carve the SETTLED post-tune `dock.css` into `src/styles/dock/` partials,
   delete the `dock-active-tokens.vue` debris, type-narrow `variant="rail"` (DK9), and author the
   DK6/DK10 morph+layer+vertical-vs-rail SHOWCASE — the dock band's live-audit visibility surface.

7. **Prototype the magnify-follow curve for the Q3 hover (SOTA NOTE).** Per R-path-dock §4: a
   hover-magnify should ride a near-critical register (0% overshoot, `--spring-smooth`), NOT
   `--spring-dock` — pin it so the scale doesn't read as jelly while the new surface delta carries the
   "reacts to movement" cue.

---

## dockPerfection (gap-to-PERFECTION)

The dock has a SOTA motion engine (one spring, FLIP, velocity-continuity, one-clock crossfade) and a
genuinely-built structural capability (three-region, separator, scale, DK-folds) — but it is NOT
perfect. It falls short on SEVEN concrete axes: (1) the mobile 1.5× glyph scale paints nothing because
every demo glyph overrides `--dock-icon-glyph` (C1); (2) `--dock-tile-pad` is unscaled so DK4 grid
centering re-breaks at 1.5× (C2); (3) hover is sub-perceptual ink/card tints with no glass register —
Q3 is a register problem, not a magnitude (C3); (4) the dock carries 19 resting specular blooms where
Card is clean — glass cohesion BROKEN (C4); (5) the selected/active state is a 12%-ink wash, not the
glass register the user named the keyframes-dock as the model for (C5); (6) the W54 ROOT those three
fixes depend on is unbuilt (C6); (7) dock-unify-root is unauthored and adopted on ~1/N demo docks, and
DK3 page-flow + the vertical three-region body + the W06 showcase are all unresolved/unbuilt (C7/C8/
C9, CHRONIC-5). And the whole band's `live-verified` mark has NO captured DELTA — its own JSON says
the visual truth is OWED (C10). To PERFECT: land W54, execute the W54-successor dock-glass re-points
(specular cohesion + glass-selected + perceptible hover), thread `--dock-tile-pad`/drop the demo glyph
sizes, author + adopt W61 dock-unify-root, build the vertical three-region body, drive W06's showcase,
ratify DK3 — and capture the binding paired-π DELTA at ≥2 viewports × light/dark for every one.
