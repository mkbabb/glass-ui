---
"@mkbabb/glass-ui": major
---

BA — the dark-register-rebuilt tranche close (4.0.0). The H4 major on two independent grounds
(the atlas register-D discipline — either alone forces a major):

1. THE A-LIST RESTORATION-AFTER-REMOVAL for a live 3.12.0 fork consumer. The Connectivity Atlas
   held `^3.12.0` on the d6 fork lineage (`feat/d6-library-3.10`); `onFlipSettled`, `/handmark`
   (HandMark/InkMark/BRUSHES), `PAPER_WASH_GROUND`, `useRouteTransition`, and the icon-morph
   `data-allow-motion` carve were absent on the 3.13.0 mainline (the break the atlas hit when
   `npm update`/`^x` silently traversed the bifurcation from 3.12.0 onto 3.13.0). 4.0.0 folds them
   back BY NEW SHAPE (the no-alias / no-backwards-compat house rule — a clean break IS a major).
   The full d6 lineage map + the A-list old→new migration table + the B-list fold-or-subsume table
   ship in `docs/tranches/BA/audit/W-ATLAS-RECONCILE-cut-notes.md`. The d6 lineage retires (the
   orchestrator fork-close protocol); 3.11.0–3.12.0 are deprecated pointing at 4.0.0.

2. BA's OWN clean breaks (any one a major under the no-alias rule), each in MIGRATION.md by name:
   - the disco retirement (W-GLASS-CAL) — the `btn-audacious`/`-gold` recipes + `sparkle-sweep`/
     `btn-gold-bg-sweep` keyframes + disco-grain knobs GONE (gold survives CALM; the static
     `.gold-shimmer` + `--glass-specular` registers STAY). Breaks `<Button variant="primary-audacious">`.
   - the tabs taxonomy cut (W-TABS) — `ui/Tabs` LEFT the public root barrel; SegmentedTabs
     `segmented`→`pill`; multi-select→ToggleGroup; the overflow responsive-collapse retired; the
     oval-blob default-ON indicator plate dead. [value.js: PaneSegmentedControl re-points]
   - the carousel-dots re-home (W-PAGER) — `CarouselDots` RETIRES onto `<PagerDots>` + `.glass-pager-ring`.
   - the tone-on-glass recompose (W-FEEDBACK-TONE) — Toast/Notification/Alert render tinted-glass,
     not opaque slabs; the 3 tone maps collapse onto ONE `.feedback-tone` recipe.
   - the static scroll-fade retirement (W-FADING-SCROLL) — `.scroll-fade-*` utilities GONE;
     migrate to `<FadingScroll>` (`@mkbabb/glass-ui/fading-scroll`).
   - PresetEditorField removed onto the Configurator chassis (W-CONFIG-CHASSIS).
   - the shared `{glass·veil·opaque}` surface axis (W-SURFACE-AXIS) — the Dialog `variant`→`surface`
     move + the GlassPanel↔Card reconciliation. [value.js: the /dialog + Skeleton consumers re-point]
   - the menu-row glass default flip (W-MENU-GLASS) — the flat `bg-accent` base dropped for
     `.glass-menu-row` (accent the escape). [value.js: the dropdown/context-menu register]
   - the `/underline`→`/handmark` DEC-8 fold (W-HANDMARK) — `GlassUnderline`/`/underline` RETIRE;
     the d6 hand-voice family re-lands on `/handmark`.
   - the dark-material token rebuild (W-DARK-MATERIAL) — dark glass TRANSMITS the live field; the
     `--glass-tint-*` re-resolutions + the `--primary` legendre-violet (token re-points).
   - the warm-chroma "no gray" floor (W-NO-GRAY) — the neutral ladder re-saturated above C 0.020.
   - the `--glass-blur-*` dial-back (W-GLASS-CAL B1, ~15-20%) + the per-spring `--spring-*-duration`
     vocabulary minted.
   - the `@source` re-point + the Select collision-bound/inner-scroll + the Slider size real-track
     geometry as shipped CSS (W-EMISSION). [value.js: the Slider/Select rendered-behaviour change]
   - `MetricBadge` `amount`→`value` (already shipped at AZ; re-flagged for the 4.0.0 consumer set).

The full migration is `MIGRATION.md` (the "BA → 4.0.0" section). The cross-repo adopt books:
`docs/tranches/BA/audit/slides-adopt-deploy-book.md`, `docs/tranches/BA/audit/valuejs-adopt-book.md`,
and the atlas close set in `W-ATLAS-RECONCILE-cut-notes.md` + FINAL §5/§12.
