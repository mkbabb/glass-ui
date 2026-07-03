# ios27-motion-truth — LIVE frame series (glass-ui @ tranche/BG HEAD, demo-dist build)

Captured 2026-07-03 · real on-screen Chrome.app 149 (Metal GPU) via CDP `Page.startScreencast`
(jpeg q85, ~60–110fps effective) against `npm run demo:dist:serve` → `http://localhost:5200`,
light mode, live motion (NO `?capture=` settled-frame mode — that stylesheet kills animations).
Each `<facility>/frames.json` carries per-frame timestamps, gesture markers, and stall gaps.
`_strips/` holds annotated contact-sheet montages (judging aids only).

READING THE GAPS: screencast frames emit only on repaint — a gap after a settle is idle,
not jank. Only gaps DURING an active gesture window are stalls.

## Per-facility observations

1. **dock-collapse-expand** (`/dock/overview`, hover-expand/leave-collapse; collapse fires
   ~3600ms after leave — pre-staged so the burst starts just before it). Collapse ~500ms,
   smooth, icons fade out early leaving a wide near-empty pill mid-morph. DEFECTS: the
   collapsed REST pill paints a **horizontally-compressed glyph sliver** inside a rounded
   square (not a clean circle + clean glyph); mid-EXPAND all four glyphs render
   **scaleX-squished** (the compositor scale morph distorts content — iOS keeps glyphs rigid
   while the plate morphs). No frame drops.

2. **dock-layer-switch** (`/dock/layers`, switcher-rail clicks). Crossfade is SEQUENTIAL, not
   overlapped: outgoing pane fades → **blank glass plate dead-zone ~100–150ms** → incoming
   fades in (brief label-ghost overlap at the incoming edge). FLIP resize happens under it.
   119/95ms paint stalls coincide with the auto-scroll before the first click.

3. **shell-vh-morph** (`window.__shellDockMorph.toggle()` on `/foundations/colors`). NOT a
   continuous morph in paint: leg 1 = ~1.3s of NO visible change after toggle (incl. a 295ms
   paint stall right after), then a **single-frame hard layout swap** (bottom dock → left
   vertical rail, content re-margins in the same frame, 53ms stall at the flip). Leg 2
   (reverse) swaps hard within ~300ms. Zero travelling-plate/crossfade frames on either leg.

4. **tabs-indicator-glide** (`/navigation/tabs`, pill strip clicks). GOOD: the indicator
   glides ~200–250ms with a visible volume-preserving travel stretch and release-at-arrival;
   no pops, no dropped frames during travel. Closest match to the iOS register of the set.

5. **dialog-glass-reveal** (`/containers/dialog`, open + Escape). DEFECT: the dialog
   materializes **fully-formed within one ~44ms frame step** (t202 absent → t246 complete) —
   no scale-up bloom, no blur decongest, no overshoot readable. Scrim dims over ~400ms after
   the panel is already there. Exit mirrors it: panel vanishes in one step, scrim fades
   ~300ms behind (surface/scrim desync).

6. **route-page-build** (`/foundations/colors` → `/display/buttons` router push). Hard cut
   at ~150ms after push (69+53ms stalls = route chunk load); the new page arrives fully
   placed in ONE frame; the only visible entrance is the h1 opacity fade (~500ms) + the hero
   field fade-in (~1s). No staged chrome→hero→body cascade, no translateY rise, no exit
   transition on the outgoing page.

7. **drawer-snap-drag** (`/compositions/drawer-live-behind`). BROKEN in paint: "open at
   Half" seats the sheet FULL-viewport (`--glass-drawer-t` stays `1`, transform identity);
   the grip drag produces ZERO sheet translation (mid-drag t=1, identity); on release the
   MODEL snaps correctly (active 0.5 → 0.12) but the sheet never moves. The snap math works;
   the `--glass-drawer-t` → translate paint binding is dead. No visible open animation either.

8. **dock-hover-press** (`/dock/overview` media dock, Next control). Hover plate fades in
   ~200–250ms smoothly; press shows the darken register (~t1241–1393); release returns to
   hover plate. No spring squish/bounce on press (the CSS `:active` floor only — the
   interruptible spring-press is not bound on the dock control). Three isolated ~52ms gaps.
