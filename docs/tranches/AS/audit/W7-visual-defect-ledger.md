# AS.W7 — visual + design defect ledger (user-reported 2026-06-04)

Folded from the user's live review of the running demo (`:5173`) + 8 screenshots.
Each defect carries the evidence, a demo-vs-library classification, and the
suspected root surface. The three-wave cycle (audit → frontend-design refine →
harden) grounds each at `file:line` and implements. Two defects are GENERAL (recur
across pages) — those are the highest leverage.

## General defects (recur across pages — fix once)

- **D1 — errored/broken page background (GENERAL).** Foundations pages
  (`/foundations/paper-glass`, `/foundations` five-rung ladder) and
  `/compositions/hero` render content over a splotchy, muddy gradient — a broken
  aurora-glow / paper-grain / radial-gradient bleed (uneven tan/blue blobs behind
  the cards, not a clean surface). Looks like a stray background layer leaking.
  Demo chrome OR a paper/aurora backdrop primitive. **The single highest-leverage
  fix.**
- **D2 — overflowing dock (GENERAL).** The horizontal nav/category dock overflows
  the viewport — tabs run off the right edge (`Chart & Chassis Pal…` clipped), no
  horizontal scroll or containment. Recurs on the configurator tab row too (D8).
  GlassDock / DockLayerGroup overflow + the demo nav.

## Library-surface defects

- **D4 — dark-mode-toggle dock too large; the dock tab is useless.** The
  `DarkModeToggle` (and/or its dock host) is oversized; the dock tab as it stands
  is non-functional. `controls/DarkModeToggle.vue` + the dock sizing.
- **D6 — aurora preset cards wrong.** The preset picker card (e.g. "Sky") has a
  **black bar at the top** (the preview image does not fill to the rounded top edge)
  and a **left-edge shadow visible in the default state when scrolling**. The card
  clip/inset + the image fit + the scroll-shadow. `aurora/PresetPickerRow` /
  the preset card.
- **D7 — configurator not expressive / not well-designed.** Huge empty void below a
  sparse control set; the tab row overflows; reads unfinished. The `Configurator` +
  `AuroraConfigDock` layout + density.
- **D8 — pill list not scrollable + needs redesign.** The configurator's segmented
  tab/pill row (`Medium · Palette · Flow · Texture · Comp · Nuclei`) overflows; the
  active item (`Nuclei`) is clipped; not scrollable. The tab/segment rail
  (DockLayerGroup rail or a segmented control) needs proper overflow-scroll +
  redesign.
- **D9 — golden drag ring ignores border-radius.** When dragging sortable items, the
  drag-highlight golden ring is square — it does not preserve the item's border
  radius. `SortableList` / `useSortable` drag-overlay ring.
- **D10 — aurora needs a first-principles overhaul.** (a) It does not animate slowly
  over time (the speedtest consumer shows no slow temporal drift); (b)
  `deriveAurora` is NOT implemented in the configurator and is broken. The aurora
  runtime time-evolution + the missing single-color→palette producer wired into the
  configurator. (This supersedes the P2 "BOOK deriveAurora" disposition — the user
  wants it implemented + working, and the animation reworked.)

## Demo-surface defects

- **D3 — `/compositions/hero` does not scroll properly.** The hero route's scroll
  container is broken. Demo composition + the page scroll wrapper.
- **D5 — configurator story undesigned + must merge mobile.** `/primitives/configurator`
  is sparse/undesigned and should be MERGED with `/primitives/configurator-mobile`
  into one story (responsive, not two routes).
- **D11 — no blob configurator/demo tab.** A blob configurator + demo should exist
  on the sidebar (it does not). Add a blob story/route (couples to D10's aurora +
  the value.js blob systems / P3 Metaballs+BlobDot).
- **D12 — sidebar too long + doesn't scroll.** The demo sidebar overflows the
  viewport without its own scroll container; should be height-bounded + scrollable.
- **D13 — main hero card is broken.** `/compositions/hero` — the hero card frame is
  broken/missing; the content floats on the D1 muddy background with no card.

## Disposition

All fold into **AS.W7 (visual + design correctness)**, executed via the three-wave
cycle: WAVE-1 audits + screenshots every page (grounds each defect at `file:line` +
a fix spec); WAVE-2 applies the frontend-design methodology per page (the design
tweaks + component refinements — implementation); WAVE-3 hardens + challenges. D1
(background) + D2 (dock overflow) are general — fix at the source. D10 (aurora
overhaul + deriveAurora) is a first-principles sub-project that supersedes the
earlier P2 BOOK. The gate-RED blockers (R1 value.js-external, R3 `--spacing`) + the
R2 contract decision (`W0b-path-forward.md`) remain the publish gate — AS.W7 is the
design correctness that rides alongside, not instead.
