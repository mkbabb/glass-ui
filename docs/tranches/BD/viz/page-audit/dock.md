# Page-audit — DOCK (9 pages) — 2026-06-22

Branch `prototype/liquid-dock`. Pages: overview · layers · rail · morph-showcase · sections · cta-receive · dock-search · liquid-playground (manifest id `dock`) · dock-gallery. Live-checked on `:5199` (the nav-loop bug forces 5199 + redirects ~400ms after a direct URL load — see §0). Cross-ref: Pass-D `PASSD-FOLD.md`/`PASSD-CONVERGENCE.md` dock-hallmark finding.

## §0 — Method note (the demo-shell nav-loop is REAL, reproduced)
The W-DEMO-NAV-FIX defect reproduced hard: a direct `goto(:5173/dock/overview)` redirected to `:5199/feedback/{alert,progress}` ~400ms after load (a persisted-route store wins over the direct URL AND pins port 5199). Three vite instances were also live at once (5173/5176/5177/5199 drift). Captures here are SYNCHRONOUS reads taken in the ~400ms window before the redirect. The user hits this too (direct-linking a story re-navigates away). NOT a dock bug — it's the systemic shell bug, confirmed.

## §1 — Chassis usage + the SYSTEMIC defects

**DRY CONFIRMED.** All 9 dock pages use the shared `StoryPage`/`StorySection` chassis. ZERO hand-rolled `<header>` in any dock page (`grep -n "<header"` → 0 hits). So:
- **Double-header (the forms/containers SYSTEMIC) does NOT apply to dock.** Dock pages carry NO secondary in-card IconChip `<header>` cluster — they rely solely on the chassis chrome header. The "title rendered ~3×" disease is a forms/containers thing; dock is clean here.
- **W-HEADER-SCALE — APPLIES (chassis-inherited).** Measured live: `dock/overview` h1 = **86.1px** (`text-display-4`, depth D3); `feedback/*` redirect h1 = **109.7px** (`text-display-5`, D2). Set in `manifest.ts:469` `assignDepths()` heroScale map (D2→`5`, D3→`4`). The 86-110px header eats the top band on every dock page. ONE chassis fix.
- **W-PAGE-CHASSIS (`--story-header-rule`) — APPLIES.** Measured `header .story-hero-cluster` `border-bottom-width: 0px` — no header→body separator on any dock page. ONE chassis fix.
- **W-STICKY-TITLE-CONDENSE — APPLIES (chassis-inherited).** `.story-hero-shrink` present, no backing bar (StoryPage.vue:106). Chassis-level.
- **W-PAPER-MORPHISM — N/A for dock.** Dock is a glass/aurora band, not a paper band (`manifest.ts` `dock: "grid"`); paper-grain is correctly absent here.

## §2 — The glass-staged-over-live-field ask (the user's CORE glass ask): MOSTLY GOOD for dock

Dock is the BEST category for the user's "all glass demos over a live field" ask — `DockStage` (`demo/stories/dock/DockStage.vue`) stages docks over ONE shared offscreen-paused `<Aurora>`. Live-confirmed per page:
- **overview** ✓ — `dock-stage-field` canvas 1086×3911 @0.42, **12 docks** staged over it, glass reads (backdrop-filter blur(9px), bg α 0.328).
- **morph-showcase** ✓ — DockStage field 1086×759 @0.42.
- **layers** ✓ — DockStage (every section is a `.dock-stage-tile`).
- **sections** ✓ — DockStage.
- **cta-receive** ✓ — DockStage (4 refs).
- **dock-search** ✓ — DockStage field 1086×872, 3 docks, **1 GL context** (clean).
- **dock-gallery** ✓ — DockStage hoisted for the route (the example tiles flow over it).

### §2 BUGS
- **[BUG-D1 · liquid-playground · GL-BUDGET] THREE live Aurora GL contexts on ONE route.** `liquid-playground.vue` mounts a `<Aurora>` in the main stage (`:494`), a SECOND in the horizontal rail stage (`:794`), and a THIRD in the vertical rail stage (`:841`). Live: `canvasCount: 3` — one real 1086×543, plus **two un-sized 300×150** rail-stage canvases (the rail auroras never resized — likely offscreen/unpainted, so they spend a GL context for no visible field). The SFC comment claims "ONE GL context for this route" THREE separate times (`:493`, `:792`-ish), but there are three. This is the headline hallmark page (manifest `dock`) — it violates the one-GL-per-route budget the addendum + CLAUDE.md repeatedly bind, and risks WebGL context-loss combined with the demo-shell dock auroras. FIX: hoist a single shared field (the DockStage pattern) behind all three stages, OR drop the two rail auroras to the shared one.
- **[BUG-D2 · rail · GLASS-NOT-STAGED] 3 of 4 sections have NO live field.** `rail.vue` mounts `<Aurora>` ONLY in the "Vertical dock" section (`grep -c "<Aurora" → 1`). The "Rounded shape" (`:127`), "Collapsible vertical dock" (`:161`), and "Stack rail" (`:211`) sections render their glass docks against the FLAT cream `glass-resting` card — the exact glass-over-flat-substrate-is-invisible-glass defect (BG-2) the user's core ask targets. The macOS hover-expand STACK (the rail.vue protagonist) reads flat. FIX: wrap rail.vue in `<DockStage>` like overview/layers (one shared field for the whole page).

## §3 — Pass-D dock-hallmark cross-ref: the dead/unwired state, in the DEMOS

Pass-D: `GlassDock` composes 2 of 5 engines; `useDockLink` absent; `useDockContextSilhouette` dead; W-DOCK-SEQUENCE is a scripted timer. CONFIRMED at source + measured in the demos:

- **`GlassDock.vue` composes 2 engines** (`useDockState` + `dockMorphContext` — `grep` confirms NO `useDockFission`/`useDockContextSilhouette`/`useDockLink`/`useDockSequence` import). The dock demos therefore exercise only collapse/expand + layer-FLIP.
- **`useDockContextSilhouette` is DEAD — 0 runtime call-sites** (`grep -rn "useDockContextSilhouette(" demo/ src/` excl. its own def/test → ZERO). It is published + a release-gate (`proof:dock-context`) guards it, but **no dock demo mounts it** — so the "the pill DOCKS DOWN + MELDS into the bar" silhouette-switch the engine promises is NOT demonstrated anywhere on the dock band. A reviewer can't SEE it switch silhouettes because nothing calls it. (Not a broken demo — an UNBUILT one. The hallmark organism's silhouette node has no demo surface.)
- **`useDockLink` is not a file** — the cross-dock continuity (a CTA that links one dock to another) has no demo because the driver doesn't exist; `cta-receive` demos `useDockCtaReceive` (a DIFFERENT, real, shipped leaf) which works.
- **morph-showcase: the SHIPPED default morph is a VT CROSSFADE, not a continuous liquid morph.** Live: default `mode = view-transition` — pressing "Morph" runs `startViewTransition` (a compositor snapshot crossfade between the vertical + horizontal dock states). To a user this reads as a SNAP/dissolve, NOT the liquid teardrop. The continuous liquid morph (the `useDockOrientationMorph` spring + the goo-teardrop bridge) is the PERF-GATED "Liquid teardrop (preview)" toggle ONLY (it misses the 4× CPU-throttle budget — the documented arm-c fall). VERIFIED the preview path WORKS: driving `__dockMorphShowcase.setMorphT(t)` 0→1 the two real docks crossfade (vOp 1→0, hOp 0→1) and the bridge plates clip-path-neck to a fused circle at t=0.5 (`inset(122px 0)` / `inset(0 140px)`, radial-gradient fill present). So the hallmark continuous morph is REAL but hidden behind an off-by-default toggle; the default a user sees is the crossfade. This is the prompt's "morph that snaps" — by design, but it undersells the hallmark.
- **liquid-playground morph engines (`useBloomUp`/`useDockFission`) — REAL + wired** (imports the shipped leaves; bloom/fission/scrubber all present, the facet rail chips carry distinct `--glass-accent` hues @48%, the `railContext` one-registry model). This page is the dock's best-foot-forward; its only defect is BUG-D1 (3 GL contexts).

## §4 — Other per-page notes
- **dock-search** — composes `useDockSearch` + shipped `useFuzzySearch` (no re-fork) over DockStage; the dock-IS-the-search-bar morph rides the real `--dock-morph-t` glide. Clean.
- **sections** — `<DockSection>` declarative tripartite over DockStage; `display: contents` no-inflation contract holds. Clean.
- **cta-receive** — composes shipped `useDockCtaReceive` + the `[data-cta-pending]` seat (BC.W-AX-DOCK-CTA-SEAT) over DockStage. Clean.
- **layers/overview** — the richest dock demos, correctly staged. overview's 12 docks exercise every facility (collapse, transport, select/dropdown, popover, slider-hold, click-integrity, overflow-wrap, big-dock grid, bg-pause-toggle).

## §5 — VERDICT (5 lines)
1. **Chassis: DRY-clean** — all 9 dock pages use `StoryPage`; ZERO hand-rolled headers → the double-header SYSTEMIC does NOT apply to dock (forms/containers only). W-HEADER-SCALE (86-110px h1), W-PAGE-CHASSIS (`--story-header-rule` 0px), W-STICKY-TITLE-CONDENSE all apply chassis-inherited; W-PAPER-MORPHISM correctly N/A.
2. **Glass-over-live-field: MOSTLY GOOD** — 7/9 pages stage docks over a live DockStage aurora (the user's core glass ask is best-served here); the glass morphism reads.
3. **[BUG-D1] liquid-playground (the HEADLINE page) runs THREE live Aurora GL contexts** (1 real + 2 un-sized 300×150 rail auroras) — violates one-GL-per-route despite the SFC claiming "ONE" thrice. Fix: shared field for all 3 stages.
4. **[BUG-D2] rail.vue stages only 1 of 4 sections over a live field** — the macOS hover-stack + 2 vertical docks read flat (BG-2). Fix: wrap in `<DockStage>`.
5. **Pass-D hallmark CONFIRMED in the demos:** `GlassDock` composes 2/5 engines; `useDockContextSilhouette` is dead (0 call-sites) — its silhouette-switch is demonstrated NOWHERE; `useDockLink` absent. The shipped morph-showcase default is a VT crossfade (reads as a snap), with the real continuous liquid teardrop hidden behind an off-by-default perf-gated toggle. liquid-playground's bloom/fission ARE real + wired (its only defect is BUG-D1).
