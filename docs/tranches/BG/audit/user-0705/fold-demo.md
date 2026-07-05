# USER-0705 DEMO/DESIGN fold — 7 items (screenshots 03.55.26 → 04.00.59)

**Discipline** (USER 07-05 directive): per item — grep the cursor (`execution/EXECUTION-PROGRESS.md`) +
`bg-build-map.md` for an owning wave; PLANNED → DOUBLE THE EXHORTATION (sharpened pass-bar naming the
defect the user still sees); NOT planned → NEW ROW (id · band · gate · precond · pass-bar). Every action
binds the house laws: warm-cream/no-gray · one-color-event proportion · compositor-only+PRM ·
KISS/DRY · general-CSS + Safari-26 target · presets-in-consumers · ≥2-consumer bar.
READ-ONLY fold — the orchestrator applies these rows; nothing outside `audit/user-0705/` was written.

## Disposition table

| # | user item | disposition | owning wave | new/strengthened id |
|---|---|---|---|---|
| 1 | color swatches → WatercolorDot, staggered, scroll-animated, larger (03.55.26) | NEW-ROW | — | **F7.5 BG.W-COLORS-WATERCOLOR-SWATCH** |
| 2 | dark mode unreadable, many items (03.56.12) | NEW-ROW | — (ties F8.8) | **F2.R1 BG.W-DARK-READABILITY-REPAIR** |
| 3 | pages FADE on scroll — header items should SHRINK | DOUBLE-EXISTING | F7.1 W-DEMO-IA-REDESIGN | SHRINK-NOT-FADE clause (re-opens 10.1's page-hero READ only) |
| 4 | corner artifacts on MANY glass elements, STILL (03.57.29) | DOUBLE-EXISTING | F2.4 W-CORNER-ALIAS-KILL | breadth re-open clause (F2.4 stays VERBATIM-DONE on its 3 routes) |
| 5 | aurora presets → LARGE ribbon on TOP of the configurator (03.58.52) | NEW-ROW | — (mechanism exists: `galleryPlacement="top"`) | **F7.6 BG.W-PRESET-RIBBON-TOP** (foldable into F7.7) |
| 6 | blob: affect preset MODES + on-click/on-hover interactability AWFUL (03.59.44) | DOUBLE-EXISTING | F9.R1 W-BLOB-SATELLITE-SHADE (carries the VALUEJS-S L5 co-rebuild) | affect-registers + pointer-truth clauses |
| 7 | configurator STANDARDIZATION — fourier offset; aurora = gold standard; header rung (04.00.59) | NEW-ROW | — | **F7.7 BG.W-CONFIGURATOR-STANDARDIZE** |

---

## Item 1 — F7.5 BG.W-COLORS-WATERCOLOR-SWATCH (NEW ROW)

**Ground.** `demo/stories/foundations/colors.vue:65-79`: the 13-stop section ramp renders flat
`h-24 rounded-lg` DIV chips on `.scroll-cascade--columns`. The user asks for the WATERCOLOR voice back —
`<WatercolorDot>` (shipped primitive, `src/components/custom/watercolor-dot/` — seeded organic blob,
`animate` compositor wobble, `ghost` variant), STAGGERED like before, ANIMATING ON SCROLL, LARGER.
No cursor wave owns the colors pane (BB.W-DEMO-DESIGN landed the current flat form; F7.1 is IA-level).

**Row draft.**
- **id/band/class**: F7.5 · BG.W-COLORS-WATERCOLOR-SWATCH · F7 · [P]
- **gate**: `proof:demo` · colors-watercolor arm (swatch grid composes `<WatercolorDot>` — a demo-local
  blob re-roll or a raw flat-chip regression reds; + a stagger-geometry assert: adjacent stops carry
  distinct block-offsets)
- **precond**: F9.R2 W-WATERCOLOR-RAF (the `animate` liveness must ride the rebuilt `useRAFLoop`, never
  the zombie rAF — do NOT ship `animate` swatches before F9.R2 lands); after F7.2 (chassis decided)
- **pass-bar**: `/foundations/colors` section-ramp stops render as `<WatercolorDot>` seeded blobs sized
  **≥112px** (strictly larger than the HEAD 96px flat chip), laid out with a HAND-LAID STAGGER (per-stop
  alternating block-offset — the irregular read the user names, not a flat aligned row), entering ON
  SCROLL via the EXISTING `.scroll-cascade--columns` register (KISS — no demo-local `@keyframes`) with a
  visible per-stop stagger: frame-series π ≥8 painted entrance frames across the row, compositor-only
  transform+opacity, PRM → static terminal. Dual-engine both modes + non-authoring Fable PASS.
- **fences**: the ramp IS the content (the reference-class one-color-event exemption, the progress
  phase-bus precedent) — zero new library tokens; the WatercolorDot is REUSED not re-forked (DRY);
  seeded determinism (a fixed per-stop `seed` so captures are stable); the mono-caption stop labels stay
  ink; demo-consumer edit only, zero `src/` paint.

## Item 2 — F2.R1 BG.W-DARK-READABILITY-REPAIR (NEW ROW; ties F8.8)

**Ground.** The user reads MANY items totally unreadable in dark (03.56.12) — a live legibility
regression the register stack (W-DARK-MATERIAL · on-glass-fg · the adaptive tint seam) should structurally
prevent, so something re-points or overrides a register on the demo surfaces. F8.8 W-APCA-CONTRAST
(PENDING, H) mints the APCA Lc witness but is metric-only — no wave FIXES the live dark surfaces.

**Row draft.**
- **id/band/class**: F2.R1 · BG.W-DARK-READABILITY-REPAIR · F2 · [P]
- **gate**: `proof:glass` · dark-legibility arm — a full-route dark CENSUS: every demo route walked in
  dark, every visible text node's COMPOSITED contrast measured on the real painted plate (the on-glass
  composite via the paint-arm oklab parser, not the token math) with BOTH witnesses — WCAG AA (4.5:1
  body) AND APCA Lc (≥60 body / ≥75 small — the F8.8 metric CONSUMED here, its first binding user)
- **precond**: F8.8 (mints the APCA witness); reads the W-DARK-MATERIAL + on-glass-fg registers as the
  fix seams
- **pass-bar**: (a) a born-RED roster enumerating every below-floor node, anchored to the user's
  03.56.12 surface (the roster is the anti-evasion floor — a green sweep with no roster is the
  close-class lie); (b) every row fixed at the REGISTER level — the `--on-glass-muted` dark arm, the
  dark tint-seam lift, the bright-bucket `--foreground` lockstep — the substitution-over-redeclaration
  discipline, NEVER per-site ink pastes; (c) the re-run census reads 0 rows below floor, dual-engine
  dark, and the LIGHT arm is regression-free (both modes captured); (d) warm-not-gray held — every fix
  lifts L on the warm hue, never desaturates onto a gray ink (`proof:no-gray` stays GREEN).

## Item 3 — DOUBLE F7.1 W-DEMO-IA-REDESIGN: the SHRINK-NOT-FADE clause

**Ground.** 10.1 W-SCROLL-SHRINK-UNIFY is DONE — the `title-collapse` scale-0.82 shrink register EXISTS
(`story-hero.css:570-589`). But the page's dominant painted read on scroll is still a FADE: the
hero-condense cluster feather runs opacity 1→0 over `--hero-condense-fade-range:120px`
(`story-hero.css:524-545`) and the `.scroll-cascade` body build is opacity-led — the user reads
"pages fade on scroll". 10.1 stays VERBATIM-DONE; the READ is re-opened at the owning PENDING
page-anatomy wave.

**Strengthened clause (append to F7.1's plan cell).**
> **SHRINK-NOT-FADE (USER 07-05 — the defect the shipped 10.1 registers did not cure in the read).**
> The redesigned StoryPage header SHRINKS on scroll — the iOS large-title collapse (the
> ScrollCardHeader choreography applied at the page header: `title-collapse` scale→0.82 + the
> `story-hero-shrink-lift` translate, the header ITEMS eyebrow·title·blurb condensing to the slim
> pinned rung) is the PRIMARY scroll read on EVERY StoryPage. Opacity may only COUPLE to the shrink,
> never lead it: the title holds **opacity ≥0.85 across the entire shrink travel window** (the
> standalone opacity-only cluster-fade leave is RETIRED — clean break, no alias; the subordinate-rung
> eyebrow/blurb may feather AFTER the title has pinned). π: scroll frame-series on ≥3 StoryPage routes,
> both engines both modes — ≥8 painted shrink frames with MONOTONIC title scale 1→0.82 and title
> opacity ≥0.85 throughout, born-RED at HEAD (the fade currently dominates). Compositor-only
> (`scale`/`translate` longhands, never font-size — the BB.W-CARD-COMPOSITE floor), native
> `animation-timeline: scroll()` (Safari-26-supported — no JS scroll lib, the no-Lenis fence), PRM →
> static full-size header (correct, never a half-shrunk freeze).

## Item 4 — DOUBLE F2.4 W-CORNER-ALIAS-KILL: the breadth re-open (every glass surface)

**Ground.** F2.4 is DONE — paint PASS on 3 routes (`/display/card` · `/substrates/glass-material` ·
`/display/buttons`), white-wedge px=0 in the sampled clips. The user STILL sees corner artifacts on
MANY glass elements (03.57.29): the pass was ROUTE-SAMPLED, the defect is CLASS-WIDE. Known residual
mechanism class: `contain: layout style paint` clips paint to the rectangular border-BOX while the
radius is a pill (D-aliasing-clip F2 — the wedge between curve and box corner), plus any
backplate/`::before`/cast child not inheriting the host radius. value.js L10 names the same cure:
"mask-based corner clip for composited glass surfaces (ONE primitive rule)".

**Strengthened clause (a repair rider on F2.4 — F2.4 stays VERBATIM-DONE on its 3 routes; the F3.R3
re-opens-the-PAINT-claim idiom).**
> **CORNER-ALIAS BREADTH (USER 07-05 — still visible on MANY glass elements).** The radius-inheritance
> discipline is promoted from per-site fixes to ONE primitive rule at the glass CLASS level (the
> value.js L10 ask): every `.glass-*` tier/material surface clips its own paint to its RADIUS — a
> single radius-following clip/mask discipline (radius-inherit on every backplate/`::before`/cast +
> `overflow:clip`-or-mask at the material root where a rectangular `contain`/paint box would otherwise
> wedge), declared once, never N patches. The `contain: layout style paint`-vs-pill-radius seam is
> resolved explicitly per surface (clip the paint INSIDE the radius or drop the offending containment
> — recorded, not left implicit). **Pass-bar**: a corner-crop PIXEL SCAN across ALL glass panes on the
> FULL route roster (every enrolled demo route, not a 3-route sample), both engines both modes —
> foreign-wedge px = 0 in every corner crop; + a computed-DOM census: every opaque
> backplate/pseudo/cast on a rounded host resolves `beforeBR == hostBR`; born-RED on the user's
> 03.57.29 surface; self-test bite — a planted square-corner backplate flags. Cross-engine mandatory
> (Safari's clip rasterization differs — the Safari-26 target is binding).

## Item 5 — F7.6 BG.W-PRESET-RIBBON-TOP (NEW ROW; foldable into F7.7)

**Ground.** The mechanism ALREADY EXISTS: `Configurator` ships `galleryPlacement: "aside" | "top"` with
the precompiled `[data-gallery=top]` full-width gallery-dock rung (`configurator.css:154-166`) and ONE
live consumer (`demo/stories/compositions/configurator.vue:188`). The aurora studio instead buries its
baked-thumbnail PresetPickerRow in the right aside via the `#presets` slot. The user wants the presets
as a LARGE ribbon on TOP (03.58.52). KISS: activate + enlarge the existing axis — no second placement
recipe.

**Row draft.**
- **id/band/class**: F7.6 · BG.W-PRESET-RIBBON-TOP · F7 · [P]
- **gate**: `proof:demo` · preset-ribbon arm (the aurora studio resolves `data-gallery="top"`; the
  aside carries NO preset row — the ribbon replaces it, clean break; an aside-buried duplicate reds)
- **precond**: F7.2 (the aurora double-header paint-fix — same route); coordinates with F7.7 (below) —
  the orchestrator MAY fold this row in as F7.7's ribbon clause; either way the mechanism is the ONE
  `galleryPlacement` axis
- **pass-bar**: `/substrates/aurora` renders the baked-thumbnail preset gallery as a LARGE full-width
  RIBBON pinned at the TOP of the configurator (above stage+aside): thumbnail tiles **≥72px tall** (the
  "LARGE" bar — visibly a ribbon, not a chip strip), real baked thumbnails preserved
  (`usePresetThumbnails`), horizontal overflow through `<FadingScroll>` (the one scroll-fade port),
  the active preset lifted on the selected-reads-as-glass tier (`--dock-control-active-bg` register
  family, never a saturated fill), keyboard cycle preserved. Dual-engine both modes + Fable PASS.
- **fences**: presets-in-consumers (the ribbon is chrome; preset CONTENT stays the demo's); the
  per-preset `cloneMode` semantic untouched; one-GL-per-route budget untouched (thumbnails stay baked
  stills).

## Item 6 — DOUBLE F9.R1 W-BLOB-SATELLITE-SHADE: affect registers + pointer truth

**Ground.** F9.R1 (PAINT-PENDING) is the sanctioned home of the VALUEJS-S L5 first-principles co-rebuild
(owner Q7 ruling; shared ground `coordination/VALUEJS-BLOB-GENESIS-2026-07-05.md` — the genesis brief's
§4 producer questions include the pointer boundary). The user's 03.59.44 verdict doubles it: the blob is
good but needs a GREAT DEAL of AFFECT refinement (preset MODES and EMOTIONS) and the on-click/on-hover
interactability is AWFUL.

**Strengthened clauses (append to F9.R1's plan cell — the co-rebuild's binding user bar).**
> **(a) AFFECT REGISTERS (USER 07-05).** The rebuilt engine exposes NAMED emotion/mood parameter AXES
> (arousal → orbit energy/deform amplitude — the L5 arousal-scales-orbit constraint made an axis;
> valence → palette warmth/lean; a calm↔excited motion-register dial riding the existing atoms-door
> shape, the L2 `lightnessScheme` precedent), and the blob STUDIO ships preset MODES as consumer
> presets — calm (the byte-identical default) · serene · excited · playful, each a named parameter
> delta (presets-in-consumers: emotion presets live in the demo/consumer; the ENGINE ships only the
> axes). Pass-bar: ≥4 emotion presets read DISTINCT in a blind non-authoring Fable A/B (each pair
> distinguishable by motion character, not just hue); the calm default is byte-identical; every axis
> bounded (saturated-but-non-neon, the warm identity ceiling).
> **(b) POINTER TRUTH (USER 07-05 — "on-click and on-hover is AWFUL").** The pointer response is
> rebuilt first-principles per the genesis brief: HOVER = same-frame wake (the W-GOO-REDRESS
> `pointer.active→wake()` precedent DOUBLED — no parked-loop lurch) + a liquid deform/attract toward
> the pointer on the blob's own spring register; CLICK = a bounded, satisfying squish/absorb pulse on
> the spring clock (volume-preserving, capped — swells, never taffy-pulls); the SDF-SHAPED HIT-TEST
> lands (the L5 pointer-shaping ask — the root square must NOT intercept sibling-card clicks; outside
> the SDF the event falls through). PRM → the gesture still COMMITS with a deterministic seat (no live
> deform frames). Pass-bar: a live-gesture frame-series π, both engines both modes — pointer-enter →
> first painted response ≤2 frames; click deform visibly painted then settling on the spring with no
> jitter; a hit-test probe outside the SDF resolves the sibling element; + a non-authoring Fable
> INTERACTION PASS ("the pointer response reads liquid and alive") — a scalar probe may NOT stand in
> (the D10 fence). Mobile-full-presence (Q7) holds: the interaction path clears the mobile perf
> envelope, GAP-4 perf not regressed.

## Item 7 — F7.7 BG.W-CONFIGURATOR-STANDARDIZE (NEW ROW)

**Ground.** Three studio configurators, three dialects: aurora composes VizStudio → `<Configurator
asideSide="right">` with the full slot anatomy (the gold standard); blob composes the Configurator
chrome directly; fourier floats a raw `<Configurator class="h-[min(72vh,600px)]">` INSIDE a
`<ShowcaseFrame>` under its own inline `<header>` (`fourier-field.vue:280-310`) — the OFFSET the user
screenshots (04.00.59). No cursor wave owns configurator standardization (F7.2 adopts VizStudio;
W-DESHADCN carries only the L14 ConfiguratorRow label API).

**Row draft.**
- **id/band/class**: F7.7 · BG.W-CONFIGURATOR-STANDARDIZE · F7 · [P]
- **gate**: `proof:demo` · configurator-standardize arm (all 3 studios import the ONE chassis; an
  inline raw-Configurator-in-ShowcaseFrame studio composition reds — the anti-fork bite) +
  `proof:encapsulation` (the new optional prop surface on the library Configurator)
- **precond**: F7.2 (chassis adopt decided + the aurora masthead fix); absorbs F7.6 as its ribbon
  clause if the orchestrator prefers ONE wave; coordinates with F6.2 (the `size` grammar) + W-DESHADCN
  L14 (ConfiguratorRow label API)
- **pass-bar — the brainstormed ROBUST anatomy (recorded in the wave spec as the binding grammar; the
  aurora studio is the reference implementation)**:
  1. **One chassis** — every viz studio composes VizStudio → `<Configurator>`; the stage+aside grid is
     the precompiled `[data-slot=configurator]` rung (never a raw Configurator floated in a
     ShowcaseFrame — the fourier OFFSET class dies structurally).
  2. **The HEADER RUNG (new, optional)** — a `heading`/`#header` rung on the Configurator: ONE identity
     line composing the `.configurator-section-label` vocabulary (the W-HIERARCHY three-register canon
     REUSED, not re-authored); the chassis owns the ONE header so the F7.2 double-header class is
     structurally impossible.
  3. **The preset-gallery axis** — `galleryPlacement="aside"|"top"` is the ONLY placement mechanism
     (item 5's LARGE top ribbon = the `top` rung enlarged; no third placement).
  4. **The size grammar** — the F6.2 `size` prop (`sm|md|lg`), zero `density` vocabulary.
  5. **The layer/row grammar** — sections are `<ConfiguratorLayer>` (dividers + the section rung), rows
     are `<ConfiguratorRow>` with the L14 no-double-label API; controls fill the definite-width slot
     (the W-CONFIG-CHASSIS width contract).
  Applied uniformly: aurora/blob/fourier all resolve the SAME DOM anatomy; the fourier studio re-homes
  onto VizStudio (its inline header + ShowcaseFrame wrapper retired — clean break). **π**: a
  cross-studio ALIGNMENT readback on the 3 studio routes, both engines both modes — the configurator
  root/aside/stage boxes agree within tolerance (the offset dead), the header/ribbon anatomy is the
  same shape; ≥2 consumers by construction (3 studios); Fable gestalt PASS on the standardized read.
- **fences**: component-over-class (the anatomy is props/slots on the ONE element); KISS — every rung
  EXTENDS the existing Configurator (`galleryPlacement` exists; the header rung is the only net-new
  prop); no parallel chassis, no per-studio fork; presets-in-consumers (studio content stays in the
  demo).

---

## Cross-item notes for the orchestrator

- Items 5 + 7 share the configurator seam — F7.6 is drafted standalone so the ribbon can land fast on
  the aurora route, but folding it into F7.7 as clause (3) is the cleaner single-wave shape.
- Item 2's sweep is the first binding CONSUMER of F8.8's APCA witness — sequencing F8.8 → F2.R1 makes
  the metric mint non-speculative (the ≥1-consumer bar on the witness itself).
- Item 3's clause retires a shipped register (the standalone cluster-fade leave) — a MIGRATION-free
  demo-CSS clean break, but the 10.1 DELTA should gain a superseded-note so the paint history stays
  honest (10.1 stays VERBATIM-DONE; only the page-hero READ is re-opened, the F3.R3 idiom).
- Item 4's breadth scan should enroll the capture roster the F8.2/17.6 machinery already walks (reuse
  the route seeds — no second roster).
- Item 6 lands INSIDE F9.R1's existing paint debt — its PAINT-PENDING close must not be flipped DONE on
  the satellite-shade π alone once these clauses attach; the interaction frame-series joins the same
  close.
