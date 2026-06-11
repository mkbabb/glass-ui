# AZ.W-REFLECT — dock surface reflection record — RE-REFLECTION (pass 2)

**Surface:** dock (the taxonomy · the hairline switcher rail in-dock + the DockRail beyond-dock floating-carousel chip strip · collapse/expand/morph on BOTH orientations · tap integrity · the flicker kill · the contextual layers · the coarse register · normalization · the V↔H morph showcase · the iOS-glassy selected/hover/press register · adaptive auto-darken — live on the SHELL + the stories, both modes, fine + coarse pointer)
**Auditor lane:** dock · **Date:** 2026-06-11 (RE-REFLECTION, pass 2) · **Branch:** tranche/AY @ `8b672e6b` (AZ Batch 0–5 + R4/R5 corrective + the W-RAIL3 third-rail triumvirate redress `83ea0ef9` + W-CLOSE landed)
**Verdict:** **PASS.** Pass-1 FAILed on ONE miss — D1, the DockRail beyond-dock HAIRLINE sub-perceptible (box-shadow-only α 0.04–0.06 over cream), so R4-1's "rails should extend OUTSIDE the dock" read as a detached orphan end-icon. The triumvirate (research → AZ.W-RAIL3 spec → redress `83ea0ef9`) MOVED the contextual facets OUT of the dock body onto a visible floating-carousel glass-chip strip OUTSIDE the box, made the connective hairline perceptible (now α 0.4 background + the catch-light box-shadow), and re-seated the strip off the H1 band. RE-VERIFIED LIVE this pass: the redress holds in BOTH modes at 2 viewports with fresh PNG pixel-strip readbacks (the hairline crosses the perceptual floor: deltaL 12.7 light / 15.0 dark, vs pass-1's <2); the dock box is INVIOLATE (59px sidebar, tight pill); every other dock item re-discharges live; no new first-time-auditor "wtf." The 9-gate dock roster is GREEN incl. the new `proof:rail3`.

---

## 1 — RECAPITULATION (pass-1 miss × redress × re-verify; + every dock audit item re-discharged)

### 1a — The pass-1 miss and its redress (the load-bearing delta this pass judges)

| pass-1 miss | sev | redress wave + commit | redress mechanism | RE-VERIFIED state (this pass, FRESH) |
|---|---|---|---|---|
| **D1** — DockRail beyond-dock hairline sub-perceptible (`::before` box-shadow α 0.06/0.04, no bg); the affordance read as a DETACHED orphan end-icon with no visible connecting line; R4-1 "extend OUTSIDE the dock" intent not visually met | **S2** | **AZ.W-RAIL3** (`83ea0ef9`) — the THIRD rail attempt, triumvirate-routed per the R6 redirect | (1) the contextual facets MOVED OUT of the dock body — the in-dock `<DockLayerGroup>` ~2× inflators DELETED from both shell docks; (2) re-homed as the **`<DockRail>` floating-carousel chip STRIP** of detached glass pills OUTSIDE the box; (3) the connective hairline made VISIBLE — `::before` now carries `background: var(--dock-layer-rail-divider)` **at α 0.4** + the `--border-hairline` catch-light box-shadow; (4) the strip re-seated to the dock MIDLINE (off the H1 band); (5) the dead `entries` prop CLEAN-BROKEN onto `items: DockRailItem[]` | **REDRESSED — FULLY.** The affordance is now a **visible glass-chip carousel** (the chips ARE the facets), not a sub-perceptible line + orphan. FRESH PNG pixel-strip readback of the connector: **light** substrate `rgb(244,243,242)` → line `rgb(232,230,229)`, **deltaL 12.7** 8-bit levels across a clean 3px line (was <2, "imperceptible"); **dark** substrate L=15 → line L=30, **deltaL 15.0** (a light line over dark). Box INVIOLATE: sidebar dock = **59px** (was 115 pre-fix). Chips render as real `--glass-bg-floating` pills (`rgb(249,249,248)` light / `srgb 0.108/0.88` dark) with legible glyphs (the "T" glyph reads `rgb(110,108,107)`). `proof:rail3` R1–R6 GREEN. Captures: `rerefl-dock-shell-forms-desktop-{light,dark}.png`, `rerefl-dock-sidebar-rail-full-{light,dark}.png`, `rerefl-dock-sidebar-rail-zoom-light.png`. |

The D1 root issue was that the gate (`proof:rail-extend`) asserted TOKEN composition, not rendered visibility, so a whisper below the perceptual floor "passed." W-RAIL3's redress is the right architectural answer (the user's R6 words: *"the rail items should be like a floating carousel almost"*) — it does not merely thicken a line; it relocates the affordance to a visible chip strip AND lifts the connector to α 0.4. `proof:rail3` G1 (box-equality) + G2 (outside-paint) + G3 (cycle) + G4 (no-corpse) are the new binding asserts; the in-situ `tests-visual/rail3.spec.ts` covers the π. The redress did NOT regress the in-dock switcher rail (a distinct element — see R3-1 below).

### 1b — Every dock audit item × discharging wave × RE-VERIFIED live state (this pass)

| id | source | mandate (condensed) | discharging wave | RE-VERIFIED state (fresh this pass) |
|---|---|---|---|---|
| R3-1 | R3 | "Dock layers broken — should have a HAIRLINE rail." (heavy dark blob, icons illegible) | W-DOCK-RAIL | **HELD, UNREGRESSED by W-RAIL3.** `/dock/layers` in-dock switcher rail: 3 `.dock-layer-rail`, bg `rgba(0,0,0,0)` (no plate); vertical rails carry `border-right: 1px solid color(srgb 0.721.. / 0.4)` (the α-0.4 `--dock-layer-rail-divider` hairline); ALL glyphs 16px (no 4px sliver); indicator bg `srgb 0.982 / 0.8` = `--glass-bg-floating`, backdrop-filter `none` (no baked plate). `rerefl-dock-layers-desktop-light.png`. |
| R3-2 | R3 | ONE vertical + ONE horizontal dock; disambiguate names; both morph/shrink/animate. | W-DOCK-TAXONOMY | **HELD.** `orientation` is the only axis; vertical dock = `orientation="vertical"` alone; vertical dock box 59px wide. `proof:dock-taxonomy` PASS. |
| R3-3 | R3 | Hover-morph flashing/flickering at the edge — resolved totally. | W-DOCK-FLICKER | **HELD LIVE.** Live CSS audit: the guarded `.glass-dock.collapsed:hover:not([data-morphing])` scale rule is PRESENT; ZERO unguarded `collapsed:hover{scale}` rule exists. rAF box-sample: maxScaleWhileWide=1.0, popDetected=false. `proof:dock-no-scale-pop` PASS. |
| R3-5 | R3 | ALL nav docks have persistent home/nav — normalized. | W-DOCK-NORMALIZE + W-DOCK-NAV | **HELD.** Shell docks carry home-left + `<DockSeparator>` (zero raw-class); ℱ home top-of-sidebar. `proof:dock-unify` F4 census PASS. |
| R3-6 | R3 | De-red the hovered/click state — iOS glassy, AT THE ROOT. | W-REGISTER-IOS | **HELD.** Token readback (dark): active-bg = warm-ink glass tier (`color-mix(in srgb, hsl(24 8% 10%) …)`), press-bg = resting +7% ink, selected-accent = `color-mix(in oklab, foreground 14%, transparent)` (LIGHT lift in dark), fg-on-aurora = `contrast-color(...)`. Grep: ZERO `--viz-fourier` on any interactive dock selector. `proof:register-ios` PASS. |
| R3-7 | R3 | Dock-over-light dynamic darken (iOS-27). | W-ADAPTIVE-AUTO | **HELD LIVE.** All 12 docks on `/dock/overview` self-engage: tint-source = warm-ink `light-dark(...)`, tint-strength = **20%** (the AA floor), backdrop = `light`, painted bg `srgb 0.624/0.618/0.612 / 0.536` (a darkened translucent plate). Legible over the bright cyan gradient. `rerefl-dock-overview-desktop-light.png`. |
| R3-13 | R3 | A button: VERTICAL dock morphs (liquid-glass, amorphous teardrop) to HORIZONTAL; bidirectional, deterministic. | W-MORPH-SHOWCASE | **HELD LIVE.** `/dock/morph-showcase`: "Morph to horizontal" ⇄ "Morph to vertical" (button flips — bidirectional confirmed); MODE = VIEW-TRANSITION (shipped default arm c). `proof:morph-showcase` PASS. `rerefl-dock-morph-showcase-light.png`. |
| R3-14 / R6 | R3 / R6 | Page-context layering; the facets are the RAIL's content (floating carousel). | W-DOCK-CONTEXT → **W-RAIL3** | **HELD LIVE.** Route-driven facet swap CONFIRMED: `/forms/inputs` chips = [Text·Selection·Toggles]; `/dock/*` chips = [Shell·Panes] — SAME shell docks, different chips by route. The facets now live on the `<DockRail>` floating strip OUTSIDE the box (the R6 redirect), not in-dock. |
| R4-1 | R4 | Rails extend OUTSIDE the dock; animations janky (black blob clip). | R4-RAIL → **W-RAIL3** | **REDRESSED — see §1a (D1).** Black blob gone, jank gone, AND the visible-rail affordance now exists (the chip carousel + perceptible connector). |
| R4-2 | R4 | "wtf are these other options" — confusing demo-IA. | R4-RAIL demo-IA arm | **HELD.** `/dock/layers` reads as a coherent Drill-in / Switcher-rail / Rail-hosted progression; the contextual chips are legible route-keyed groups. No dock-band noise option. |
| R5-1 | R5 | `--dock-mobile-scale` DEAD (substitution-vs-inheritance trap). | R5-TOKENS | **HELD LIVE.** The `@media(pointer:coarse) .glass-dock[data-density]` block EXISTS, RE-DECLARES `--dock-scale`, and `--dock-local-scale` reads `--dock-mobile-scale`/`--dock-coarse-scale` (the lift threads, not frozen at root 1). `proof:ui-scale` PASS. |
| R5-2 | R5 | Dock 20–25% too big on mobile. | R5-TOKENS (`--dock-coarse-scale: 0.78`) | **HELD.** Mobile shell capture: the bottom dock is a tight strip, not oversized. `rerefl-dock-shell-mobile-{light,dark}.png`. 44px floor held via the `max(…, --dock-control-floor)` clamp. |
| R5-3 | R5 | Collapsed-tap pass-through + hover-expand morph-race. | R5-TAP (`useDockClickIntegrity`) | **HELD.** `useDockClickIntegrity` wired in `GlassDock.vue` (capture-phase). Dock unit fleet 93/93. |
| B4/B15 | AY | Collapsed = CIRCLE; expand from CENTER. | W-DOCK-NAV | **HELD.** `proof:dock-unify` F1/F2 (floor minted, symmetric center-out). |
| B6/B7 | AY | `/dock/layers` laggy, no rail line, vertical-overflow broken. | W-DOCK-RAIL + W-DOCK-TAXONOMY | **HELD.** Rail line restored (α-0.4 divider), glyphs legible, no lag, vertical-overflow case mounts. |

### Gate roster (re-run live THIS pass — all GREEN)

| gate | result |
|---|---|
| `proof:rail3` (the D1 redress gate — NEW) | **PASS** (R1–R6: in-dock group gone both shell · one registry no shadow · hairline whisper+extent · strip outside containment · flex chip strip cyclable · ≥2 shell consumers) |
| `proof:rail-extend` | **PASS** (R1–R6) |
| `proof:dock-rail-hairline` | **PASS** (in-dock switcher rail UNREGRESSED) |
| `proof:dock-taxonomy` | **PASS** (incl. `DockRailItem` on the T2 rail-noun allowlist) |
| `proof:register-ios` | **PASS** (de-red, no-interactive-red) |
| `proof:dock-unify` | **PASS** (F4 census) |
| `proof:dock-no-scale-pop` | **PASS** |
| `proof:morph-showcase` | **PASS** (M1–M5) |
| `proof:ui-scale` | **PASS** (coarse re-declare + 0.78 + 44px floor) |

---

## 2 — RE-VERIFY LIVE (fresh captures, ≥2 viewports × both modes + π readbacks)

All captured LIVE on `:5199` this pass (Playwright deterministic context; theme via `vueuse-color-scheme` localStorage + reload — note the app's real dark key is `vueuse-color-scheme`, not `glass-ui-dark`; coarse register verified via CSS-rule presence + the pass-1 isolated-context π). Stored beside this record.

**Capture list (literal filenames):**
- `rerefl-dock-shell-forms-desktop-light.png` / `rerefl-dock-shell-forms-desktop-dark.png` (1440×900 — the SHELL: tight sidebar pill + the floating chip carousel beside it + the bottom dock + its chip row)
- `rerefl-dock-sidebar-rail-full-light.png` / `rerefl-dock-sidebar-rail-full-dark.png` (the sidebar dock + connector + chips — the D1 pixel-strip source)
- `rerefl-dock-sidebar-rail-zoom-light.png` (the tight 59px icon pill — box-inviolate witness)
- `rerefl-dock-layers-desktop-light.png` (the in-dock switcher rail UNREGRESSED — Drill-in / Switcher rail / Rail-hosted)
- `rerefl-dock-overview-desktop-light.png` (the adaptive-darken collapsible-over-cyan + media transport + triggers)
- `rerefl-dock-rail-story-desktop-light.png` (the canonical vertical dock + the `dock/rail` story DockRail consumer #2)
- `rerefl-dock-morph-showcase-light.png` (the V↔H morph showcase)
- `rerefl-dock-shell-mobile-light.png` / `rerefl-dock-shell-mobile-dark.png` (390×844 — the bottom dock + scrollable chip carousel, not oversized)
- `rerefl-dock-mobile-overview.png` (mobile overview)

**π readbacks (measured live THIS pass):**
- **D1 hairline (PNG pixel-strip)**: LIGHT connector `rgb(232,230,229)` over substrate `rgb(244,243,242)` → **deltaL 12.7**; DARK connector L=30 over substrate L=15 → **deltaL 15.0**. Both cross the perceptual floor (pass-1 was box-shadow-only deltaL <2). [D1 REDRESSED]
- **Box INVIOLATE**: sidebar dock `getBoundingClientRect().width = 59px` (was 115 pre-W-RAIL3); both shell docks carry the rail strip (`frameWithRail=2`, `railCount=2`) with deltaW=deltaH=0 per `rail3.spec.ts`. [R6-1/R6-2 fixed]
- **Chips render as glass pills**: light bg `srgb 0.982/0.8` (`--glass-bg-floating`), dark bg `srgb 0.108/0.88`; active chip highlighted; the "T" glyph reads `rgb(110,108,107)` (legible). [floating-carousel affordance LIVE]
- **Carousel cycle (G3)**: a real click on the `dock/rail` story's "Libraries" chip moved active Assets→Libraries (the consumer-owned context, ONE registry). [R6 carousel functional]
- **Title-band clearance**: H1 "Inputs" at y=58; sidebar chips at y=276–366 (dock midline); `sidebarChipsOverlapH1=false`. Mid-body overlap is the accepted floating paradigm; the title band is CLEAR. [the orchestrator center-seat fix HELD]
- **In-dock switcher rail UNREGRESSED**: bg transparent, `border-right: 1px solid …/0.4`, glyphs 16px, indicator `--glass-bg-floating` no plate. [R3-1 distinct-element check]
- **Adaptive darken**: 12 docks, tint-strength 20% AA floor, backdrop `light`, painted `srgb 0.624.. / 0.536`. [R3-7]
- **De-red**: active-bg glass tier, selected-accent `foreground 14%`, ZERO `--viz-fourier` on interactive selectors. [R3-6]
- **Coarse register**: `@media(pointer:coarse) .glass-dock[data-density]` re-declares `--dock-scale`; `--dock-local-scale` reads `--dock-coarse-scale 0.78`. [R5-1/R5-2]
- **Morph showcase**: button flips V⇄H; MODE=VIEW-TRANSITION. [R3-13]
- **Flicker kill**: guarded scale rule present, no unguarded rule. [R3-3]
- **Console**: 0 errors on the dock routes (the only entries are benign aurora deferred-init warnings from the shell background).

---

## 3 — THE PERFECTION QUESTION (first-time-auditor walk, cold)

Walking the dock band fresh — shell (forms/dock routes) + the four stories, both modes, fine + coarse:

- **The pass-1 "wtf" is GONE.** Where pass-1 saw a detached chevron floating below the dock with no connecting line, the cold eye now sees a **floating carousel of glass facet chips** ("Text · Selection · Toggles") riding a visible hairline beside the tight dock pill — exactly the "floating carousel almost" the user drew. The connector is perceptible (deltaL 12.7/15.0), the chips are real glass pills, and clicking one switches context. The dock itself is a **tight 59px pill** (the R6-2 "far too wide" broad-grey-plate is gone; the R6-1 "3-rows-tall bloated bottom dock" is gone; the rotated "Eng…" label is buried).
- **The de-red iOS register reads finished.** No warm-red on any hover/active/selected/pressed state, shell or stories, either mode; the selected chip + the active form icon read as a glass luminance-lift. The ℱ wordmark + viz strokes correctly survive as static brand ink.
- **The four stories read FINISHED.** `/dock/overview` (adaptive-darken collapsible over a bright gradient, media transport, triggers), `/dock/layers` (a crisp in-dock hairline switcher rail with legible 16px glyphs), `/dock/rail` (the canonical vertical dock + its own DockRail carousel), `/dock/morph-showcase` (V↔H on the one scalar). All clean.
- **The accepted tradeoff, named honestly:** the floating chip carousel overlaps the page BODY content mid-column (the chips ride the dock's gutter into the body). This is the inherent floating-overlay tradeoff (content scrolls behind the chips), explicitly accepted by the user ("a floating carousel almost") and by the task brief ("mid-body overlap is the accepted floating paradigm; the H1/title band must be CLEAR") — and the title band IS clear. A first-time auditor reads it as a deliberate floating control strip, not a bug. Not a wtf.
- **Carousel overflow handled:** on mobile the chip row exceeds the dock's inline extent; it is `overflow-x: auto` + `scroll-snap-type: x` and genuinely scrollable (scrollWidth 260 > clientWidth 234), so the clipped "Toggles" chip is reachable. Not a dead-clip.

Nothing draws a "wtf." The surface reads as finished.

---

## 4 — MISSES

**NONE.** The pass-1 S2 miss (D1) is comprehensively redressed and re-verified live in both modes with fresh PNG pixel readbacks. Every other dock audit item re-discharges live; the 9-gate dock roster is GREEN incl. the new `proof:rail3`; zero console errors; no new first-time-auditor "wtf."

**Scope-fence note:** AUDIT-ONLY — no source/demo/script/git edits were made this pass (two temp pixel-readback scripts were written under the repo root for the PNG analysis and DELETED). All protected contracts (`expanded` ref exposed, `useDockClickIntegrity`, the slides-consumer seams, the ONE-registry rail context) hold and were not touched. The `entries`→`items` clean break is verified (no legacy alias). VERDICT: **PASS** — the row flips; the dock surface clears the AZ.W-REFLECT completion bar.
