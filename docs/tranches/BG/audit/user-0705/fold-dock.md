# USER 07-05 DOCK feedback — the fold (READ-ONLY recommendation; orchestrator applies)

**Source:** USER 07-05 (screenshot 03.53.51 + reference IMG_1880 + the verbatim rail spec).
**Discipline:** per item — grep the cursor (`execution/EXECUTION-PROGRESS.md`) + `execution/bg-build-map.md`
for an existing owner; PLANNED → DOUBLE THE EXHORTATION (sharpened pass-bar naming the defect the user
still sees); NOT planned → NEW ROW. Every clause bound to the house laws: warm-cream/no-gray ·
one-color-event · compositor-only+PRM · KISS/DRY · general-CSS Safari-26+ dual-engine · presets-in-consumers ·
≥2-consumer bar. First-principles items refer back to the ORIGINAL SPEC (the user's verbatim rail contract +
IMG_1880), never to the shipped shape.

---

## Item 1 — the dock scroll-progress bar is FAR TOO THICK → **DOUBLE 16.1 (BG.W-DOCK-SCROLL-PROGRESS)**

**Grep result.** Owned: cursor row **16.1 BG.W-DOCK-SCROLL-PROGRESS** (F7, status DONE — dual-engine PASS
2026-07-03, `BG.W-DOCK-SCROLL-PROGRESS-DELTA.md`). The wave shipped the right MECHANISM (the standalone bar
retired; `<BorderProgress>` masked-conic on the SidebarDock frame; collapsed = the pill ring) at the wrong
REGISTER: `demo/layout/dock-nav.css:242` pins `--border-progress-width: 11px` ("the thick+rounded read, the
10-14px envelope") — the ~11px dark bar the user re-opened on screenshot 03.53.51. The 10-14px envelope is
the CARD/standalone register (`proof:border-progress` W4 locks the library constants); the DOCK border wants
a whisper. The row flips DONE → RE-OPENED (paint verdict superseded by the user's own read — the gestalt bar
outranks the judge).

**DOUBLED CLAUSE (append to row 16.1's gate column; the builder cannot ship the band again):**

> **USER 07-05 RE-OPEN (screenshot 03.53.51 — the shipped ring reads as a ~11px DARK BAR; the DONE paint
> verdict is superseded).** The dock's scroll-progress border is a **HAIRLINE (~1-2px) rail-line on the
> LEFT of the dock, serving as a BORDER item** — never the card's 10-14px envelope. (a) Mint
> `--dock-progress-hairline: 1.5px` beside the `.demo-dock-scroll-ring` block and re-point
> `--border-progress-width: var(--dock-progress-hairline)` (the props-defer-to-cascade seam the wave
> already rides — presets-in-consumers: the library `[10,14]` envelope + `proof:border-progress` W4
> constants are BYTE-UNTOUCHED; the dock consumer's cascade override IS the sanctioned whisper register,
> record the sanction in the dock-nav.css comment so the W4 anti-hairline note is not misread as banning
> this consumer). (b) The read the user names: on the expanded vertical SidebarDock the progress is the
> dock's LEADING (inline-start) edge line. If the hairline full-ring does not READ as the left rail-line,
> widen the `BorderProgressCoverage` union with an `inline-start-edge` member through the SAME
> coverage-scoped mask region (the `bottom-edge` precedent — a mask scope, NEVER a parallel conic recipe;
> KISS/DRY). Collapsed keeps the pill ring, hairline-thin — same masked-conic radius-following mechanism,
> same PRM-static, same morph-dissolve; ONLY the thickness register changes. (c) WARM-INK, not a dark
> band: at hairline width the fill must resolve in the warm-cream family (the brand-spectrum walk stays,
> but the °hue read is warm — no-gray; a hairline that reads as a black scratch REDs). (d) π (born-RED on
> the shipped 11px): the painted progress band's cross-axis extent ≤2 CSS px (≤4 device px @2x), measured
> from the capture, both engines both modes; the fill hue in the warm family; the collapsed ring ≤2px.
> Dual-engine non-authoring judge; the user's screenshot is the FAIL ground.

---

## Item 2 — THE DOCK RAIL is totally wrong; re-invent from the ground up → **NEW ROW F3.R4 BG.W-DOCK-RAIL-REINVENT**

**Grep result.** NOT owned by any BG row. The rail engine is BE-era (`BC.W-DOCK-STACK-RAIL` →
`BE.W-DOCK-RAIL-REALIZE`, shipped pre-BG); the BG rows that touch it only PAINT or PROTECT the existing
shape — 4.5 W-DOCK-FISSION-WIRE (DONE: facet fade-floor + accents), 4.11 W-DOCK-STORY-MODULARIZE (DONE:
`liquid-playground.vue` protection assert), 4.9 W-SHELL-DOCK-DRY (DONE: the shared facet rail on
`useShellNavDock`). No BG wave owns the rail's TOPOLOGY, and the user's verdict is the topology is wrong.

**The root defect (verified at HEAD, `src/styles/dock/stack-rail.css:100-125` + `DockStack.vue`).** The
current `<DockStack>` seats the ENTIRE stack — core anchor AND fan — **fully OUTSIDE the dock box at
rest** (`.dock-hairline-slot` at `inset-inline-start: 100%` / `inset-block-end: 100%`, a floating glass
core hovering in the gutter). The user's spec is the INVERSE: collapsed = ENTIRELY CONTAINED in the dock;
expanded = the fan crosses the dock edge PARTIALLY outward, asymmetric. The C-DOCK chronic
(DIRECTIVE-LEDGER §0) already said it: "a hairline rail INSIDE the box." IMG_1880 shows the three
fan-states: a hairline (the dock edge / rail axis) with a stack-capsule CROSSING it, fanning progressively
outward + asymmetric. This is a re-invention, not a tune.

**NEW ROW draft (insert in the F3 dock band, after F3.R3):**

| id | wave | band | class | status | gate | π surface | precond | notes |
|----|------|------|-------|--------|------|-----------|---------|-------|
| F3.R4 | BG.W-DOCK-RAIL-REINVENT (USER 07-05 + IMG_1880 — the rail re-invented from the ground up; supersedes the BE.W-DOCK-RAIL-REALIZE topology read) | F3 | P | PENDING | `proof:dock` rail-reinvent arm — see pass-bar below; born-RED on HEAD's always-outside topology | collapsed-containment + fan-crossing frame-series / the two shell docks + `/dock/liquid-playground` + `/dock/rail`, both engines both modes | 4.1 + 4.5 + 4.9 (all DONE) | ONE engine (KISS/DRY): a re-shape of `<DockStack>` — `DockRail.vue`/`DockFacetRail.vue` stay DEFINITION-ABSENT; `railProjection.ts` φ-math KEPT; the 4.11 protection assert re-points at the new shape |

**PASS-BAR (the gate arm's clauses — the ORIGINAL SPEC, verbatim intent, made machine-checkable):**

1. **COLLAPSED = ENTIRELY CONTAINED (the containment inversion — the root fix).** At rest the stack is
   INSIDE the dock box: the topmost member reads as a NORMAL dock icon seated in the dock's own control
   run (the `--dock-control-size` cell + safe-inset plate, the full WCAG hit-box), distinguished ONLY by a
   **hairline RAIL adjacent to it** — ~1-1.5px warm-ink (`--dock-rail-hairline`, a
   `color-mix(in srgb, var(--foreground) N%, transparent)` line, the `.dock-separator`/`--border-hairline`
   family — no new color event, no-gray). ZERO gutter presence at rest (strictly stronger than the
   W-CHIP-GRAZE seat contract — `chipOverMain:false` becomes true by topology). π: every stack pixel
   inside the dock plate bbox at rest; the hairline visible beside the top icon. Born-RED: HEAD's core
   floats outside.
2. **HOVER/CLICK = macOS-STACK fan-out into a CAROUSEL, crossing the edge.** The fan extends PARTIALLY
   OUTSIDE the dock — the hairline rail is the AXIS the stack-capsule crosses (IMG_1880's progressive
   fan-states). The overhang is ASYMMETRIC-GOLDEN: horizontal dock = the fan sticks out **~φ² (2.618, the
   user's "~2-3x" band) MORE above the dock than below**; vertical dock mirrors on the inline axis
   (φ²-more on the outward/leading side). Expressed as `calc()` on the φ constant over ONE minor-overhang
   token (`--dock-rail-overhang: calc(var(--dock-rail-overhang-minor) * 2.618)`) — the constant IN the
   calc, never a flat resolved rebake (the W-CARD-PAD φ-ladder fence). π: fanned-state bbox overhang
   ratio outward:inward = 2.6 ± 0.5 (inside the 2-3 band), measured from the frame-series.
3. **BOX-INVIOLATE (kept, absolute).** The fan NEVER changes the dock's width or height —
   `deltaW = deltaH = 0` collapsed→fanned, via the KEPT `.glass-dock-frame` non-clipping escape (no
   `contain`/`overflow`/`backdrop-filter` on the frame). π: box-equality across the whole fan series.
4. **DISPLAY OPTIONS.** `visibleCount` (KEPT) + a NEW `wrap?: boolean` axis — the >visibleCount set
   either scrolls through the ONE `<FadingScroll>` port (KEPT) or WRAPS into a second rank (the user's
   "number of elements to show, wrapping"). Both painted in the π.
5. **BOTH orientations, ONE engine.** Vertical AND horizontal docks; `mode="stack" | "facets"` both
   inherit the new containment/fan topology (the facet accents stay the bounded `--glass-accent`
   whisper); NO second component, NO second spring — the fan rides `--spring-dock`/`useDockSpring`
   (the ONE clock), staggered per member, **compositor-only** (scale/translate/opacity/filter — no
   animated width/height/inset; `proof:no-layout-animation` holds), PRM = instant seat at the endpoint
   (no travel frames). Interaction: hover fans (the KEPT `HOVER_INTENT_MS` hysteresis) AND click/focus
   fans (the user's "hover/click"); Escape/blur/leave folds.
6. **Safari-July-2026 dual-engine.** Everything is general CSS (absolute positioning + translate/scale
   transitions + mask-free hairline) — no Chromium-only primitive; the C-SAFARI dual-engine paint gate
   binds (Chrome Metal + Safari/WebKit, both modes).
7. **≥2 consumers at birth (kept-met).** SidebarDock + BottomDock (via `useShellNavDock`) +
   `liquid-playground.vue` (8 `<GlassDock>` + facets, H+V) + the `/dock/rail` story; the 4.11
   `proof:demo` protection assert re-points at the new shape in lockstep (never left stale-green against
   the old topology).

**π (born-RED on HEAD):** dual-engine both-modes frame-series — (i) collapsed containment + hairline;
(ii) fan crossing the edge with the φ² asymmetry + box-equality; (iii) visibleCount/wrap painted;
(iv) PRM instant seat; (v) the Fable non-authoring judge reads the three IMG_1880 fan-states back from the
capture. The 16.1 hairline scroll-progress (item 1) and this rail hairline are SIBLING whispers on the same
dock — the judge confirms they read as ONE border grammar, not two competing lines (one-color-event
proportion: neither carries a hue event; both are warm-ink structure).

---

## Item 3 — dock animations much better but still not buttery-smooth → **DOUBLE the F3/F5/17.x motion rows + the deferred SOTA-iOS27 pass**

**Grep result.** Owned, split across: **F3.R1 W-DOCK-GLYPH-RIGID (DONE+paint)** · **F3.R2
W-DOCK-PANE-OVERLAP (DONE+paint)** · **F3.R3 W-SHELL-MORPH-PAINT-REPAIR (PENDING, paint FAIL — the
settled-horizontal endpoint broken)** · **F5.2 W-LIQUID-WEIGHT-DEFAULT (PENDING, paint FAIL — PRM cascade
order + dock-hover-press unwired)** · **F5.4 W-BACKDROP-BLUR-ENGAGE (PENDING)** · **17.4
W-ANIMATION-CONGRUENCE (PENDING)** · **17.6 W-PAGE-COMPONENT-AUDIT (PENDING)**. The user's read ("much
better but still not buttery-smooth") is the honest state: R1/R2 fixed correctness (rigid glyphs, no box
dip) but SMOOTHNESS — the frame-cadence quality — has no explicit bar on any row. The DOUBLE adds it; no
re-open of R1/R2 (their pass-bars were correctness, and they hold).

**DOUBLED CLAUSE (append to F3.R3, F5.2, F5.4, and 17.4's gate columns; 17.6 inherits via its
frame-series clause):**

> **USER 07-05 BUTTERY ARM (the verdict: "much better but still not buttery-smooth" — correctness landed,
> CADENCE did not).** Every dock gesture window (collapse/expand · pane swap · in-place V↔H morph ·
> hover-press · rail fan) binds a frame-CADENCE bar on top of the existing correctness π: over the CDP
> screencast/trace series, (a) NO inter-frame gap >2 frame periods (>33ms @60Hz) in-gesture, (b) 0
> long-frames (>50ms main-thread task) in-gesture, (c) the first responding frame ≤2 frames after the
> input event (the iOS answer-immediately signature), and (d) the non-authoring Fable judge records an
> explicit per-gesture BUTTERY verdict — fps + gap histogram + a felt-smoothness call — a scalar probe may
> NOT stand in (the D10 fence re-affirmed). Any gap is LOCALIZED to its producer before the row closes
> (the usual suspects on this surface: per-frame `backdrop-filter` re-rasterization under transform, the
> goo `feGaussianBlur` window, blur radius on morphing plates, layout reads inside the spring tick) —
> "smooth on the trace, jerky in the hand" is the exact class this arm exists to kill. Compositor-only +
> PRM floors unchanged; DOCK_SPRING `{0.68, 0.64}` byte-frozen (cadence is fixed by removing frame cost,
> NEVER by re-tuning the spring — the R6′ fence).

**The deferred SOTA-iOS27 pass carries the bar with DOUBLED exhortation (note for
`docs/tranches/BG/audit/sota-design/SOTA-IOS27-CORPUS-INDEX.md` — append under THE BINDING CONSTRAINT):**

> **USER 07-05 (standing):** the future SOTA-iOS27 liquid-glass animation audit inherits the
> BUTTERY-SMOOTH bar at doubled strength — its per-gesture verdicts judge OUR frame series against the
> reference frame ladders (`ios27-motion-truth/ref/`) at the FRAME-GAP level (the cadence histograms, not
> just the choreography), both engines both modes, and the pass may not close on mechanism-present — only
> on reads-buttery. The 07-05 verdict ("much better but still not buttery-smooth") is the pass's opening
> ground truth: the residual is cadence + endpoint quality (F3.R3's broken settled-horizontal), not
> missing mechanisms.

---

## Cross-item coherence notes (for the orchestrator's apply)

- Items 1 + 2 both mint a dock-edge HAIRLINE (`--dock-progress-hairline` · `--dock-rail-hairline`). They
  are DISTINCT registers (progress ink sweeps; the rail line is static structure) but ONE grammar — both
  ~1-1.5px, both warm-ink, both border-items ON the dock. The builder should declare them side by side and
  the judge reads them as one voice (no two competing line weights on one dock edge).
- Item 2's collapsed-containment makes the rail's rest state STRICTLY interior, which retires the
  `--dock-rail-extend-length` rest-reach from the collision equation — the `--dock-content-safe-inset`
  content gutter keys off the FAN reach only (transient, pointer-scoped). Flag to W-CHIP-GRAZE /
  W-DOCK-RAIL-SEAT-FINAL owners: their seat contract gets easier, not harder.
- Fences honored: no src/demo edits here (recommendation only); the build engine owns tranche/BG; the
  orchestrator applies these clauses to the cursor.
