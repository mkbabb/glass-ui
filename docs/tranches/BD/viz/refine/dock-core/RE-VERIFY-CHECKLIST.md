# Dock RE-VERIFY checklist (orchestrator self-verification, default-to-BROKEN)

JUDGE-3 PASSed the dock-core story surfaces, but the user reports the dock STILL broken —
the cardinal mechanism-passing trap. Before dispatching ANY further dock triumvirate, the
orchestrator self-verifies the LIVE gestalt by reproducing the EXACT user gesture and
defaults to broken. Findings feed the targeted directive (the goo-fix2 pattern).

## Two distinct dock domains (do NOT conflate — JUDGE-3 only tested domain B)
- **A. LIVE NAV DOCKS** — `demo/layout/BottomDock.vue` + `SidebarDock.vue`, always on screen,
  `always-expanded` (NO collapse). Broken facets-rail REMOVED in source (Bottom:370, Side:403).
  RE-VERIFY LIVE on a real content route (e.g. `/display/buttons`, `/navigation/carousel`):
  - [ ] A1 — NO broken rail artefact paints on EITHER dock (the user said "both"). 0 stray
        `.dock-hairline-slot`/`.dock-facet-chip`/half-rendered carousel beside/below the box.
  - [ ] categories clickable from frame 0 (always-expanded; no ~400ms dead-click dwell).
  - [ ] glass is warm-cream LUMINOUS not gray, BOTH modes (sample the plate OKLab live).
  - [ ] the bottom story-tab strip scrolls horizontally INSIDE its FadingScroll port; box
        stays ONE row (box-INVIOLATE), never inflates to 2-3 rows.
  - [ ] the V↔H morph control (ArrowLeftRight) opens the shell morph stage + actually morphs.
  - [ ] "Pick a story" reload FOUC gone (AppShell).

## B. STORY COLLAPSIBLE DOCKS — `/dock/overview`, `/dock/dock-gallery`, `/dock/rail`,
       `/dock/morph-showcase`. These exercise collapse/expand + fission.
  - [ ] A3 grow-from-CENTRE on the REAL auto-margin dock (cx held constant, walls symmetric)
        — JUDGE-2 found a +73px right lurch; JUDGE-3 claims fixed (cxExcursion 0). RE-CONFIRM.
  - [ ] A6 synced icon morph — icons do NOT bounce back OUT OF SYNC with the dock; inertia
        FROM CENTRE, not right→left. (Watch a real collapse→expand frame series.)
  - [ ] A5 shrunken-state icon alignment (collapsed glyph centred).
  - [ ] A2 longer hover/interaction window before collapse.
  - [ ] A4 blur dialled back (not extreme; --glass-blur-dock ~9px).
  - [ ] A7 a dropdown does NOT recolor the whole dock (plate bg invariant on real open).
  - [ ] A8 popover/dropdown unified + aligned (.dock-trigger byte-identical).
  - [ ] A11 vertical pill not ugly, bigger padding.
  - [ ] A12 dock ICON ITEMS draggable+reorderable (grab-pull-squish-fling), not just rail.

## C. THE BIG ONE — A13 fission ASSEMBLY (W-DOCK-SCROLL-FISSION), engine 100% / assembly 0%
  - [ ] the shipped `useDockFission`/`DockGooFilter`/`fission-bridge.css` is wired so an icon
        goo-SPLITS OFF into a beside/ABOVE/BELOW sub-dock — generalized V or H, ARBITRARY part.
  - [ ] Currently it fires only on the `/dock/dock-gallery` "Compose" button. The user wants
        the GENERALIZED facility (the iOS Apple-Music dock fission). Decide the live trigger
        surface (scroll-driven nav-dock vs a generalized hub story) + wire it.
  - [ ] Gestalt: the split reads as a decisive goo-morph (two masses + neck), warm glass,
        Safari-safe (filter:url not backdrop-filter:url), inertial.

## Dispatch plan
1. Orchestrator self-verifies A (live nav docks) + B (story docks) live → records the
   ACTUAL still-broken items here.
2. Targeted triumvirate(s) on ONLY the self-verified-broken items (goo-fix2 pattern: bake
   the live root cause into the directive; hardened judge reproduces the real gesture).
3. The fission assembly (C) as its own build once the trigger surface is decided.
