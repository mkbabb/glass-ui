# AW screenshot inventory + cleanup (2026-06-07)

Pursuant to the precepts visual-artefact convention: screenshots are gitignored scratch (`*.png` global ignore); canonical evidence is force-committed into `docs/tranches/<L>/audit/screenshots/` (the E-tranche set is the precedent). This manifest is the tracked record of the loose-screenshot sweep.

**Swept:** 229 loose PNGs (148 repo-root + 81 `as-verify/`) + 244 `.playwright-mcp/` session-temp files.
**Verdict:** 227 TEMP (stale scratch, deleted) · 2 KEEP (AS.W7 dock-sidebar defect evidence, referenced by `docs/tranches/AS/audit/W7/W1-A2-dock-sidebar.md`, filed + force-committed to `docs/tranches/AS/audit/screenshots/`).

6-agent categorization workflow (`screenshot-inventory`, run wf_25c210a8-442).

## By category

| category | count | disposition |
|---|---|---|
| glass-ui-aurora-blob | 40 | TEMP (stale dev scratch) |
| glass-ui-component | 81 | TEMP (stale dev scratch) |
| glass-ui-material | 26 | TEMP (stale dev scratch) |
| slides-cover | 8 | TEMP (cross-repo scratch — belongs in slides repo if anywhere) |
| slides-gate | 8 | TEMP (cross-repo scratch — belongs in slides repo if anywhere) |
| slides-home | 6 | TEMP (cross-repo scratch — belongs in slides repo if anywhere) |
| slides-slide | 53 | TEMP (cross-repo scratch — belongs in slides repo if anywhere) |
| slides-xray | 7 | TEMP (cross-repo scratch — belongs in slides repo if anywhere) |

## KEEP (filed + committed)

- `w7-a2-pager-overflow-1100.png` → `docs/tranches/AS/audit/screenshots/` — AS.W7 A2 dock-sidebar defect D2: tabs/pager clip off right at 1100w (AS, 1100)
- `w7-a2-rail-clip-680.png` → `docs/tranches/AS/audit/screenshots/` — AS.W7 A2 dock-sidebar defect D12: variant-rail clipped near viewport bottom at 680h (AS, 680)

## Full inventory (all 229, grouped)

### glass-ui-aurora-blob (40)

- `aurora-1440.png` — Aurora background at 1440 viewport · unknown · 1440 · **TEMP**
- `aurora-canvas.png` — Aurora WebGL canvas render · unknown · **TEMP**
- `aurora-configurator-dark.png` *(as-verify)* — Aurora configurator chrome, dark mode · AS · dark · **TEMP**
- `aurora-configurator-light.png` *(as-verify)* — Aurora configurator chrome, light mode · AS · light · **TEMP**
- `aurora-configurator.png` *(as-verify)* — Aurora configurator chrome, default · AS · **TEMP**
- `aurora-dark.png` *(as-verify)* — Aurora WebGL background, dark mode · AS · dark · **TEMP**
- `aurora-fixed-2.png` — Aurora fix iteration (5kb, likely blank/error) · unknown · **TEMP**
- `aurora-fixed.png` — Aurora post-fix capture · unknown · **TEMP**
- `aurora-light.png` *(as-verify)* — Aurora WebGL background, light mode · AS · light · **TEMP**
- `aurora-live.png` — Aurora live render · unknown · **TEMP**
- `aurora-page.png` — Aurora demo page · unknown · **TEMP**
- `aurora-verify.png` — Aurora verification capture · unknown · **TEMP**
- `aurora.png` — Aurora background · unknown · **TEMP**
- `aurora.png` *(as-verify)* — Aurora WebGL background, default · AS · **TEMP**
- `aw-aur-day-9.png` — Aurora day-9 preset · AW · **TEMP**
- `aw-aur-default.png` — Aurora default preset · AW · **TEMP**
- `aw-aur-pastel-rainbow.png` — Aurora pastel-rainbow preset · AW · **TEMP**
- `aw-aurora-meadow.png` — Aurora meadow preset · AW · **TEMP**
- `aw-aurora-oil.png` — Aurora oil preset · AW · **TEMP**
- `aw-aurora-pastel-rainbow.png` — Aurora pastel-rainbow preset · AW · **TEMP**
- `aw-aurora-speedtest.png` — Aurora in speedtest consumer context · AW · **TEMP**
- `aw-aurora.png` — Aurora background · AW · **TEMP**
- `aw-aurora2.png` — Aurora background iteration 2 · AW · **TEMP**
- `aw-goo-blob.png` — GooBlob metaball render · AW · **TEMP**
- `blob-1440-after.png` — GooBlob 1440 after-fix · unknown · 1440 · **TEMP**
- `blob-1440.png` — GooBlob at 1440 viewport · unknown · 1440 · **TEMP**
- `blob-ref.png` — GooBlob reference render · unknown · **TEMP**
- `w7-after/aurora-1440x900-dark-t0.png` *(as-verify)* — Aurora background frame t0, 1440x900 dark · AS · dark 1440x900 t0 · **TEMP**
- `w7-after/aurora-1440x900-dark-t3.png` *(as-verify)* — Aurora background frame t3, 1440x900 dark · AS · dark 1440x900 t3 · **TEMP**
- `w7-after/aurora-1440x900-light-t0.png` *(as-verify)* — Aurora background frame t0, 1440x900 light · AS · light 1440x900 t0 · **TEMP**
- `w7-after/aurora-1440x900-light-t3.png` *(as-verify)* — Aurora background frame t3, 1440x900 light · AS · light 1440x900 t3 · **TEMP**
- `w7-after/aurora-derive-palette-1440x900-light.png` *(as-verify)* — Aurora derive-palette panel, 1440x900 light · AS · light 1440x900 · **TEMP**
- `w7-after/aurora-derive-panel-1440x900-light.png` *(as-verify)* — Aurora derive panel, 1440x900 light · AS · light 1440x900 · **TEMP**
- `w7-after/aurora-derive-tab-1440x900-light.png` *(as-verify)* — Aurora derive tab, 1440x900 light · AS · light 1440x900 · **TEMP**
- `w7-after/aurora-derive-tab-1440x900-light.png` *(as-verify)* — Aurora derive-from-image tab in configurator chrome · AS · light 1440x900 · **TEMP**
- `w7-after/blob-1440x900-dark.png` *(as-verify)* — GooBlob background, 1440x900 dark · AS · dark 1440x900 · **TEMP**
- `w7-after/blob-1440x900-dark.png` *(as-verify)* — GooBlob metaball background dark · AS · dark 1440x900 · **TEMP**
- `w7-after/blob-1440x900-light.png` *(as-verify)* — GooBlob background, 1440x900 light · AS · light 1440x900 · **TEMP**
- `w7-after/blob-1440x900-light.png` *(as-verify)* — GooBlob metaball background light · AS · light 1440x900 · **TEMP**
- `w7/aurora-1440x900-light.png` *(as-verify)* — Aurora background, 1440x900 light · AS · light 1440x900 · **TEMP**

### glass-ui-component (81)

- `av-w11-spectrum.png` — AV W11 spectrum variant · AV · spectrum · **TEMP**
- `av-w11-standard.png` — AV W11 standard variant · AV · standard · **TEMP**
- `aw-buttons.png` — Button family showcase · AW · **TEMP**
- `aw-card-sota.png` — Card SOTA variant · AW · **TEMP**
- `aw-card-story.png` — Card story render · AW · **TEMP**
- `aw-card.png` — Card component · AW · **TEMP**
- `aw-configurator.png` — Configurator controls column · AW · **TEMP**
- `aw-inputs.png` — Input family showcase · AW · **TEMP**
- `badge.png` — Badge component · unknown · **TEMP**
- `btn-light.png` — button family in light mode · unknown · light · **TEMP**
- `btn-vp.png` — button viewport render · unknown · viewport · **TEMP**
- `buttons-dark.png` *(as-verify)* — Button variants matrix, dark mode · AS · dark · **TEMP**
- `buttons-light.png` — buttons light variant · unknown · light · **TEMP**
- `buttons-light.png` *(as-verify)* — Button family, light theme · AS · light · **TEMP**
- `buttons-light2.png` — buttons light iteration 2 · unknown · light · **TEMP**
- `buttons-real.png` — buttons real render · unknown · **TEMP**
- `buttons-warm.png` — buttons warm tone iteration · unknown · **TEMP**
- `buttons.png` — button family · unknown · **TEMP**
- `card-vp.png` — card viewport render · unknown · viewport · **TEMP**
- `card-vp2.png` — card viewport iteration 2 · unknown · viewport · **TEMP**
- `card.png` — card component · unknown · **TEMP**
- `carousel-dark.png` *(as-verify)* — Carousel, dark theme · AS · dark · **TEMP**
- `carousel-light.png` *(as-verify)* — Carousel, light theme · AS · light · **TEMP**
- `configurator-1440-full.png` — configurator full at 1440 · unknown · 1440 · **TEMP**
- `configurator-1440.png` — configurator at 1440 · unknown · 1440 · **TEMP**
- `configurator-375-b.png` — configurator at 375 iteration b · unknown · 375 · **TEMP**
- `configurator-375.png` — configurator at 375 · unknown · 375 · **TEMP**
- `configurator-dark.png` *(as-verify)* — Configurator controls, dark theme · AS · dark · **TEMP**
- `configurator-light.png` *(as-verify)* — Configurator controls, light theme · AS · light · **TEMP**
- `dialog-open.png` — dialog open state · unknown · **TEMP**
- `dock-dark.png` *(as-verify)* — GlassDock, dark theme · AS · dark · **TEMP**
- `dock-initial.png` — dock initial state · unknown · **TEMP**
- `dock-light.png` *(as-verify)* — GlassDock, light theme · AS · light · **TEMP**
- `gu-demo-intro.png` — glass-ui demo intro/landing screen · unknown · **TEMP**
- `inputs.png` — glass-ui input controls atom shot · unknown · **TEMP**
- `progress-dark.png` *(as-verify)* — Progress bar, dark theme · AS · dark · **TEMP**
- `progress-light.png` *(as-verify)* — Progress bar, light theme · AS · light · **TEMP**
- `search-dark.png` *(as-verify)* — Fuzzy search, dark theme · AS · dark · **TEMP**
- `search-light.png` *(as-verify)* — Fuzzy search, light theme · AS · light · **TEMP**
- `select-open.png` — Select component with dropdown open · unknown · **TEMP**
- `select.png` — Select component closed · unknown · **TEMP**
- `slider.png` — Slider component · unknown · **TEMP**
- `slider2.png` — Slider component variant 2 · unknown · **TEMP**
- `sliders-glass-scrubber-dark.png` *(as-verify)* — Glass scrubber slider, dark theme · AS · dark · **TEMP**
- `sliders-glass-scrubber-light.png` *(as-verify)* — Glass scrubber slider, light theme · AS · light · **TEMP**
- `tabs.png` — Tabs component · unknown · **TEMP**
- `V02-dock-expanded-desktop.png` — GlassDock expanded, desktop viewport · V · desktop · **TEMP**
- `V03-settings-popover-open.png` — settings popover open state · V · **TEMP**
- `w7-a2-pager-overflow-1100.png` — AS.W7 A2 dock-sidebar defect D2: tabs/pager clip off right at 1100w · AS · 1100 · **KEEP**
- `w7-a2-rail-clip-680.png` — AS.W7 A2 dock-sidebar defect D12: variant-rail clipped near viewport bottom at 680h · AS · 680 · **KEEP**
- `w7-after/compositions-hero-1440x900-dark.png` *(as-verify)* — hero composition story dark · AS · dark 1440x900 · **TEMP**
- `w7-after/compositions-hero-1440x900-light-fullpage.png` *(as-verify)* — hero composition fullpage light · AS · light 1440x900 fullpage · **TEMP**
- `w7-after/compositions-hero-1440x900-light.png` *(as-verify)* — hero composition story light · AS · light 1440x900 · **TEMP**
- `w7-after/data-sortable-list-1440x900-dark.png` *(as-verify)* — SortableList data story dark · AS · dark 1440x900 · **TEMP**
- `w7-after/data-sortable-list-1440x900-light-dragging.png` *(as-verify)* — SortableList mid-drag state light · AS · light 1440x900 dragging · **TEMP**
- `w7-after/data-sortable-list-1440x900-light-full.png` *(as-verify)* — SortableList full light · AS · light 1440x900 full · **TEMP**
- `w7-after/data-sortable-list-1440x900-light.png` *(as-verify)* — SortableList data story light · AS · light 1440x900 · **TEMP**
- `w7-after/navigation-dock-1024x768-dark.png` *(as-verify)* — GlassDock navigation dark · AS · dark 1024x768 · **TEMP**
- `w7-after/navigation-dock-1024x768-light-full.png` *(as-verify)* — GlassDock navigation full light · AS · light 1024x768 full · **TEMP**
- `w7-after/navigation-dock-1024x768-light.png` *(as-verify)* — GlassDock navigation light · AS · light 1024x768 · **TEMP**
- `w7-after/primitives-configurator-1440x900-dark.png` *(as-verify)* — Configurator primitive dark · AS · dark 1440x900 · **TEMP**
- `w7-after/primitives-configurator-1440x900-light.png` *(as-verify)* — Configurator primitive light · AS · light 1440x900 · **TEMP**
- `w7-after/primitives-configurator-375x812-dark-stage.png` *(as-verify)* — Configurator mobile stage dark · AS · dark 375x812 stage · **TEMP**
- `w7-after/primitives-configurator-375x812-dark.png` *(as-verify)* — Configurator mobile dark · AS · dark 375x812 · **TEMP**
- `w7-after/primitives-configurator-375x812-light-stage.png` *(as-verify)* — Configurator mobile stage light · AS · light 375x812 stage · **TEMP**
- `w7-after/primitives-configurator-375x812-light.png` *(as-verify)* — Configurator mobile light · AS · light 375x812 · **TEMP**
- `w7-after/sidebar-categoryrail-1440x420-light.png` *(as-verify)* — Sidebar category rail short viewport light · AS · light 1440x420 · **TEMP**
- `w7-after/sidebar-categoryrail-1440x600-dark.png` *(as-verify)* — Sidebar category rail dark · AS · dark 1440x600 · **TEMP**
- `w7-after/sidebar-categoryrail-1440x600-light.png` *(as-verify)* — Sidebar category rail light · AS · light 1440x600 · **TEMP**
- `w7-after/sweep-compositions-dashboard-1440x900-light.png` *(as-verify)* — dashboard composition sweep light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-compositions-instrument-chassis-1440x900-light.png` *(as-verify)* — InstrumentChassis composition sweep light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-containers-dialog-1440x900-light.png` *(as-verify)* — Dialog container sweep light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-data-data-table-1440x900-light.png` *(as-verify)* — DataTable data sweep light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-feedback-progress-1440x900-light.png` *(as-verify)* — Progress feedback sweep light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-feedback-toast-1440x900-light.png` *(as-verify)* — Toast feedback sweep light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-motion-stagger-reveal-1440x900-light.png` *(as-verify)* — stagger-reveal motion sweep light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-navigation-command-palette-1440x900-light.png` *(as-verify)* — command palette navigation sweep light · AS · light 1440x900 · **TEMP**
- `w7/compositions-hero-1440x900-light-fullpage.png` *(as-verify)* — Hero composition fullpage, 1440x900 light · AS · light 1440x900 fullpage · **TEMP**
- `w7/compositions-hero-1440x900-light.png` *(as-verify)* — Hero composition, 1440x900 light · AS · light 1440x900 · **TEMP**
- `w7/primitives-configurator-1440x900-light.png` *(as-verify)* — Configurator primitive, 1440x900 light · AS · light 1440x900 · **TEMP**
- `w7/primitives-configurator-mobile-1440x900-light.png` *(as-verify)* — Configurator mobile, 1440x900 light · AS · light 1440x900 mobile · **TEMP**

### glass-ui-material (26)

- `aw-disco-glyph.png` — DiscoGlyph primitive · AW · **TEMP**
- `aw-glyph-face.png` — GlyphFace primitive · AW · **TEMP**
- `aw-paper-backdrop.png` — PaperBackdrop material · AW · **TEMP**
- `aw-paper-clean2.png` — Paper material clean iteration · AW · **TEMP**
- `aw-watercolor-dots.png` — WatercolorDot blobs · AW · **TEMP**
- `dock-token-ladder-dark.png` *(as-verify)* — Dock token ladder, dark theme · AS · dark · **TEMP**
- `dock-token-ladder-light.png` *(as-verify)* — Dock token ladder, light theme · AS · light · **TEMP**
- `foundations-colors-dark.png` *(as-verify)* — Foundations color tokens, dark theme · AS · dark · **TEMP**
- `foundations-colors-light.png` *(as-verify)* — Foundations color tokens, light theme · AS · light · **TEMP**
- `foundations-paper-glass-dark.png` *(as-verify)* — Paper+glass foundations, dark theme · AS · dark · **TEMP**
- `foundations-paper-glass-light.png` *(as-verify)* — Paper+glass foundations, light theme · AS · light · **TEMP**
- `foundations-radii-dark.png` *(as-verify)* — Foundations radii tokens, dark theme · AS · dark · **TEMP**
- `foundations-radii-light.png` *(as-verify)* — Foundations radii tokens, light theme · AS · light · **TEMP**
- `glass-ladder.png` — glass 5-rung ladder material · unknown · **TEMP**
- `glass-paper-foundations.png` — glass+paper foundations tour · unknown · **TEMP**
- `glass-ui-intro.png` — glass-ui demo intro screen · unknown · **TEMP**
- `glasspanel.png` — GlassPanel substrate render · unknown · **TEMP**
- `w7-after/foundations-paper-glass-1440x900-dark.png` *(as-verify)* — paper+glass foundations dark · AS · dark 1440x900 · **TEMP**
- `w7-after/foundations-paper-glass-1440x900-light.png` *(as-verify)* — paper+glass foundations light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-foundations-colors-1440x900-light.png` *(as-verify)* — color tokens foundations sweep light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-foundations-shadows-1440x900-light.png` *(as-verify)* — shadow tokens foundations sweep light · AS · light 1440x900 · **TEMP**
- `w7-after/sweep-foundations-typography-1440x900-light.png` *(as-verify)* — typography ladder foundations sweep light · AS · light 1440x900 · **TEMP**
- `w7/foundations-colors-1440x900-light.png` *(as-verify)* — Foundations colors, 1440x900 light · AS · light 1440x900 · **TEMP**
- `w7/foundations-intro-1440x900-light.png` *(as-verify)* — Foundations intro page, 1440x900 light · AS · light 1440x900 · **TEMP**
- `w7/foundations-paper-glass-1440x900-light-viewport.png` *(as-verify)* — Paper+glass foundations viewport, 1440x900 light · AS · light 1440x900 viewport · **TEMP**
- `w7/foundations-paper-glass-1440x900-light.png` *(as-verify)* — Paper+glass foundations, 1440x900 light · AS · light 1440x900 · **TEMP**

### slides-cover (8)

- `aw-constellation-title.png` — constellation deck title slide · AW · **TEMP**
- `cover-dark-final.png` — slides cover dark final · F · dark · **TEMP**
- `cover-dark-live.png` — slides cover dark live · F · dark · **TEMP**
- `cover-dark-s1.png` — slides cover dark slide 1 · F · dark · **TEMP**
- `cover-dark.png` — slides cover dark · F · dark · **TEMP**
- `cover-dark2.png` — slides cover dark iteration 2 · F · dark · **TEMP**
- `cover-light.png` — slides cover light · F · light · **TEMP**
- `cover-light2.png` — slides cover light iteration 2 · F · light · **TEMP**

### slides-gate (8)

- `gate-dark-final.png` — slides access gate dark final · F · dark · **TEMP**
- `gate-dark.png` — slides access gate dark · F · dark · **TEMP**
- `gate-error-light.png` — slides access gate error light · F · light · **TEMP**
- `gate-light-final.png` — slides access gate light final · F · light · **TEMP**
- `gate-light-fixed.png` — slides access gate light fixed · F · light · **TEMP**
- `gate.png` — slides access gate · F · **TEMP**
- `h-gate-light-final.png` — slides access-gate modal, light, final · F · light · **TEMP**
- `h-gate-light.png` — slides access-gate modal, light · F · light · **TEMP**

### slides-home (6)

- `h-home-desktop.png` — slides home landing, desktop · F · desktop · **TEMP**
- `h-home-desktop2.png` — slides home landing, desktop alt · F · desktop · **TEMP**
- `h-home-light.png` — slides home landing, light · F · light · **TEMP**
- `hero-current.png` — slides hero/landing current state · F · **TEMP**
- `home-mobile-light.png` — slides home landing, mobile light · F · mobile-light · **TEMP**
- `slides-current-state.png` — Slides current-state landing render · F · **TEMP**

### slides-slide (53)

- `aw-constellation-deck.png` — constellation slides deck render · AW · **TEMP**
- `constellation-light.png` — slides constellation deck light · F · light · **TEMP**
- `desktop-slide1.png` — slides desktop slide 1 · F · desktop · **TEMP**
- `m-s08.png` — slides mobile slide 08 render · F · mobile · **TEMP**
- `m-s1.png` — slides mobile slide 1 render · F · mobile · **TEMP**
- `m-s3-vp.png` — slides mobile slide 3 viewport render · F · mobile-viewport · **TEMP**
- `s01-390-real.png` — slides slide 01 at 390px · F · 390px · **TEMP**
- `s01-tall.png` — slides slide 01 tall viewport · F · tall · **TEMP**
- `s01.png` — slides slide 01 render · F · **TEMP**
- `s04-desktop.png` — slides slide 04 desktop · F · desktop · **TEMP**
- `s04-hero-delta.png` — slides slide 04 hero delta crop · F · **TEMP**
- `s04-m.png` — slides slide 04 mobile · F · mobile · **TEMP**
- `s04-mob-full.png` — slides slide 04 mobile full page · F · mobile · **TEMP**
- `s04-mob-hero.png` — slides slide 04 mobile hero crop · F · mobile · **TEMP**
- `s04-mob.png` — slides slide 04 mobile · F · mobile · **TEMP**
- `s04-mobile.png` — slides slide 04 mobile · F · mobile · **TEMP**
- `s04-tablet.png` — slides slide 04 tablet · F · tablet · **TEMP**
- `s04-tall.png` — slides slide 04 tall viewport · F · tall · **TEMP**
- `s08-clean.png` — slides slide 08 clean render · F · **TEMP**
- `s08-desk2.png` — slides slide 08 desktop alt · F · desktop · **TEMP**
- `s08-desktop.png` — slides slide 08 desktop · F · desktop · **TEMP**
- `s08-mob-bottom.png` — slides slide 08 mobile bottom crop · F · mobile · **TEMP**
- `s08-mobile-full.png` — slides slide 08 mobile full page · F · mobile · **TEMP**
- `s08-mobile-pw.png` — slides slide 08 mobile playwright shot · F · mobile · **TEMP**
- `s09-desktop.png` — slides slide 09 desktop · F · desktop · **TEMP**
- `s09-mob-final.png` — slides slide 09 mobile final · F · mobile · **TEMP**
- `s09-mob-top.png` — slides slide 09 mobile top crop · F · mobile · **TEMP**
- `s09-mobile-pw.png` — slides slide 09 mobile playwright shot · F · mobile · **TEMP**
- `s1-dark-canonical.png` — slides slide 1 dark canonical · F · dark · **TEMP**
- `s1-dark.png` — slides slide 1 dark · F · dark · **TEMP**
- `s1-light-unlocked.png` — slides slide 1 light, gate unlocked · F · light · **TEMP**
- `s1-light.png` — slides slide 1 light · F · light · **TEMP**
- `s10-390-real.png` — slides slide 10 at 390px · F · 390px · **TEMP**
- `s10-tall.png` — Slides deck slide 10, tall viewport render · F · tall · **TEMP**
- `s2-dark.png` — Slides deck slide 2, dark mode · F · dark · **TEMP**
- `s2-light.png` — Slides deck slide 2, light mode · F · light · **TEMP**
- `s3-dark.png` — Slides deck slide 3, dark mode · F · dark · **TEMP**
- `s3-light.png` — Slides deck slide 3, light mode · F · light · **TEMP**
- `s4-dark.png` — Slides deck slide 4, dark mode · F · dark · **TEMP**
- `s4-light.png` — Slides deck slide 4, light mode · F · light · **TEMP**
- `s5-dark.png` — Slides deck slide 5, dark mode · F · dark · **TEMP**
- `s5-light.png` — Slides deck slide 5, light mode · F · light · **TEMP**
- `s6-dark.png` — Slides deck slide 6, dark mode · F · dark · **TEMP**
- `s6-light.png` — Slides deck slide 6, light mode · F · light · **TEMP**
- `sconcl-390-real.png` — Slides conclusion slide at 390px mobile · F · 390 · **TEMP**
- `sconcl-390-top.png` — Slides conclusion slide 390px top crop · F · 390 · **TEMP**
- `sconcl-tall.png` — Slides conclusion slide tall viewport · F · tall · **TEMP**
- `slide04-actualtop.png` — Slides slide 04 top crop · F · **TEMP**
- `slide04-top.png` — Slides slide 04 top crop · F · **TEMP**
- `slide08-bottom.png` — Slides slide 08 bottom crop · F · **TEMP**
- `slide08-full.png` — Slides slide 08 full · F · **TEMP**
- `slide09-top.png` — Slides slide 09 top crop · F · **TEMP**
- `til-s1-light.png` — TIL deck slide 1, light mode · F · light · **TEMP**

### slides-xray (7)

- `cohesion-xray-home-dark.png` — slides XRAY cohesion home dark · F · dark · **TEMP**
- `cohesion-xray-home.png` — slides XRAY cohesion home · F · **TEMP**
- `cohesion-xray-methodology-dark.png` — slides XRAY methodology dark · F · dark · **TEMP**
- `sxray-390-real.png` — Slides XRAY component at 390px mobile · F · 390 · **TEMP**
- `sxray-tall.png` — Slides XRAY component tall viewport · F · tall · **TEMP**
- `xray-home.png` — Slides XRAY home render · F · **TEMP**
- `xray-mobile-390.png` — Slides XRAY mobile at 390px · F · 390 · **TEMP**

