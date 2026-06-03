# AS.W — root PNG scratch inventory + on-disk routing plan

The repo root holds **102 loose scratch PNGs** (`/*.png`), **42.0 MB** total, mtimes spanning **2026-04-21 → 2026-06-02**. Every one is gitignored by the global `*.png` rule (`.gitignore:3`) — none is git-tracked, so a `git mv` plan is moot. This is a pure **on-disk reorganization**: route each capture into the owning surface/tranche's audit dir, and flag the obviously-superseded iteration ladders (multiple `vN` of one surface) as delete-candidates vs the one keep-as-baseline.

> **This is a PLAN. Nothing is moved.** Execution (the actual `mv`/`rm`) is a separate AS path-forward tranche item.

## House precedent (the routing follows existing art, not a new scheme)

327 PNGs already live under `docs/tranches/`, all gitignored by the same global `*.png`. The established convention is **per-owning-tranche audit dirs**:

| existing dir | count | shape |
|---|---|---|
| `Q/research/screenshots` | 103 | research captures |
| `H/audit/screens` | 99 | audit screens (flat) |
| `J/audit/screens` | 30 | audit screens (flat) |
| `K/audit/screens` | 22 | audit screens (flat) |
| `J/research/screens` | 14 | research captures |
| `F/audit/screenshots/W<n>/runtime` | 51 | per-wave runtime baselines |
| `E/audit/screenshots` | 8 | audit screens |
| `L/audit/screenshots-W8-π` | 3 | per-wave audit |

So the canonical destination is `docs/tranches/<T>/audit/screens/` (flat, H/J/K shape) for ad-hoc audit captures, and `docs/tranches/<T>/audit/screenshots/W<n>/runtime/` for per-wave runtime baselines. Where the surface predates the lettered scheme or has no clean tranche owner, the catch-all is an AS archive: `docs/tranches/AS/audit/visual/archive/2026-06-03/<surface>/`.

## Categorization summary (by prefix family → owning surface)

| family | n | owning surface / tranche | mtime span |
|---|---|---|---|
| `aurora-*` (non-v) | 8 | aurora composite / configurator | 04-21 → 05-06 |
| `aurora-v2/v3` + `v3*-dawn` etc | 18 | aurora iteration ladder (early WebGL) | 04-21 |
| `aurora-v4-*` | 9 | aurora v4 oil/impasto iteration ladder | 04-23 → 04-24 |
| `wave2-aurora-*` | 6 | aurora wave-2 (nuclei/anisotropic) | 04-25 |
| `slider-*` | 9 | Slider page / glass-track / variants | 05-06 |
| `btn-*` + `glass-ui-buttons` + `p2-final-buttons` | 8 | Button four-state / variants | 04-23 → 04-24 |
| `carousel-*` | 3 | Carousel responsive matrix | 05-12 |
| `search-*` + `category-rail-*` | 5 | Search / category-rail | 04-23 → 05-06 |
| `j-r4-*` | 7 | tranche J research-4 sweep | 05-06 |
| `E-W0-*` | 5 | tranche E W0 (speedtest hero) | 05-26 |
| `v2-*` | 6 | v2 slide/cover deck | 06-02 |
| `audit-*` | 6 | tranche-level audit sweep (flourishes) | 05-05 |
| `blob-*` + `metaballs-configurator` | 3 | blob/metaballs configurator | 05-06 |
| `header-*` | 2 | HeaderRibbon before/after | 04-23 |
| `typography-*` + `intro-fraunces` | 2 | typography ladder | 04-23 |
| `number-field` | 1 | NumberField | 05-06 |
| `nav-dock` | 1 | dock / nav | 05-06 |
| `q-tau-*` | 1 | tranche Q-tau home | 05-18 |
| `muster-*` | 2 | muster (consumer) audit | 05-26 |
| `slide-01` | 1 | slide deck | 06-01 |
| `current-state` + `index-1440x900` + `glass-ui-intro` + `an-settled-compositions` | 4 | misc page snapshots | 04-23 → 05-28 |

## Per-file routing table

Destinations are repo-relative under `docs/tranches/`. **keep** = the canonical baseline to retain; **del** = superseded iteration / redundant duplicate. The `vN` ladders keep only the newest/best-named rung; intermediate rungs are del-candidates.

### aurora — base composite + configurator (→ `aurora` has no lettered tranche; route to AS archive)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| aurora-borealis-demo.png | 953K | 04-21 | AS/audit/visual/archive/2026-06-03/aurora/ | keep (named demo baseline) |
| aurora-default.png | 408K | 04-21 | AS/.../aurora/ | keep (default-config baseline) |
| aurora-derived.png | 390K | 04-21 | AS/.../aurora/ | keep (derived-config baseline) |
| aurora-config-top.png | 615K | 04-21 | AS/.../aurora/ | del (intermediate configurator shot, superseded by aurora-configurator) |
| aurora-config-streaks.png | 291K | 04-21 | AS/.../aurora/ | del (intermediate configurator shot) |
| aurora-configurator.png | 740K | 05-06 | AS/.../aurora/ | keep (newest configurator baseline) |
| aurora-page.png | 656K | 05-06 | AS/.../aurora/ | keep (full-page baseline) |

### aurora — v2/v3 iteration ladder (early WebGL; mostly superseded by v4)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| aurora-v2.png | 949K | 04-21 | AS/.../aurora/ | del (superseded by v3/v4) |
| aurora-v3.png | 957K | 04-21 | AS/.../aurora/ | del (superseded by v4) |
| v3-dawn.png | 975K | 04-21 | AS/.../aurora/ | del (dawn ladder — superseded by v3e-dawn) |
| v3-dawn-2.png | 989K | 04-21 | AS/.../aurora/ | del (dawn ladder rung) |
| v3-dawn-3.png | 977K | 04-21 | AS/.../aurora/ | del (dawn ladder rung) |
| v3-dawn-4.png | 950K | 04-21 | AS/.../aurora/ | del (dawn ladder rung) |
| v3-dawn-5.png | 976K | 04-21 | AS/.../aurora/ | del (dawn ladder rung) |
| v3b-dawn.png | 824K | 04-21 | AS/.../aurora/ | del (dawn ladder rung) |
| v3c-dawn.png | 831K | 04-21 | AS/.../aurora/ | del (dawn ladder rung) |
| v3d-dawn.png | 1.0M | 04-21 | AS/.../aurora/ | del (dawn ladder rung) |
| v3e-dawn.png | 893K | 04-21 | AS/.../aurora/ | keep (newest dawn rung — one baseline of the ladder) |
| v3-meadow.png | 753K | 04-21 | AS/.../aurora/ | keep (distinct preset — meadow) |
| v3-sky.png | 742K | 04-21 | AS/.../aurora/ | keep (distinct preset — sky) |

### aurora — v4 oil/impasto ladder (04-23 → 04-24)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| aurora-v4-first.png | 34K | 04-23 | AS/.../aurora/ | del (tiny first-attempt, superseded) |
| aurora-v4-initial.png | 531K | 04-23 | AS/.../aurora/ | del (initial, superseded by working/impasto) |
| aurora-v4-oil-working.png | 433K | 04-24 | AS/.../aurora/ | del (WIP, superseded by oil-impasto) |
| aurora-v4-oil-impasto.png | 460K | 04-24 | AS/.../aurora/ | keep (oil-impasto baseline) |
| aurora-v4-cursor-swirl.png | 434K | 04-24 | AS/.../aurora/ | keep (distinct interaction — cursor swirl) |
| aurora-v4-dock-fixed.png | 438K | 04-24 | AS/.../aurora/ | keep (dock-overlay fix baseline) |
| aurora-v4-dawn.png | 448K | 04-24 | AS/.../aurora/ | keep (v4 dawn preset) |
| aurora-v4-sky.png | 449K | 04-24 | AS/.../aurora/ | keep (v4 sky preset) |
| aurora-v4-vangogh.png | 482K | 04-24 | AS/.../aurora/ | keep (v4 vangogh preset) |
| aurora-v4-pastel-sunset.png | 793K | 04-24 | AS/.../aurora/ | keep (v4 pastel-sunset preset) |

### aurora — wave2 (nuclei / anisotropic; 04-25)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| wave2-aurora-inline.png | 584K | 04-25 | AS/.../aurora/ | del (superseded by inline-2) |
| wave2-aurora-inline-2.png | 566K | 04-25 | AS/.../aurora/ | keep (newest inline baseline) |
| wave2-aurora-fullscreen.png | 794K | 04-25 | AS/.../aurora/ | keep (fullscreen baseline) |
| wave2-aurora-anisotropic.png | 567K | 04-25 | AS/.../aurora/ | keep (anisotropic-mode baseline) |
| wave2-aurora-nuclei-tab.png | 574K | 04-25 | AS/.../aurora/ | keep (nuclei-tab configurator) |
| wave2-aurora-after-esc.png | 544K | 04-25 | AS/.../aurora/ | keep (escape-dismiss state) |

### blob / metaballs configurator

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| blob-page.png | 312K | 05-06 | AS/.../blob/ | keep (full-page baseline) |
| blob-cfg.png | 327K | 05-06 | AS/.../blob/ | keep (configurator baseline) |
| metaballs-configurator.png | 450K | 05-06 | AS/.../blob/ | keep (metaballs cfg baseline) |
| audit-blob.png | 308K | 05-05 | AS/.../blob/ | keep (audit sweep — blob) |

### Slider (→ Slider has no lettered tranche; AS archive)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| slider-page.png | 327K | 05-06 | AS/.../slider/ | del (superseded by slider-page-fullpage) |
| slider-page-fullpage.png | 337K | 05-06 | AS/.../slider/ | keep (full-page baseline) |
| slider-page-viewport.png | 269K | 05-06 | AS/.../slider/ | keep (viewport-crop baseline) |
| slider-page-450h.png | 451K | 05-06 | AS/.../slider/ | del (height-probe variant) |
| slider-page-600h.png | 192K | 05-06 | AS/.../slider/ | del (height-probe variant) |
| slider-matrix.png | 108K | 05-06 | AS/.../slider/ | del (superseded by slider-variants-matrix) |
| slider-variants-matrix.png | 124K | 05-06 | AS/.../slider/ | keep (variant-matrix baseline) |
| slider-glass-track.png | 632K | 05-06 | AS/.../slider/ | keep (glass-track baseline) |
| audit-slider-glass-track.png | 345K | 05-05 | AS/.../slider/ | del (audit dup of slider-glass-track) |

### Button (→ AS archive)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| btn-four-state.png | 10K | 04-23 | AS/.../button/ | keep (four-state contract baseline) |
| btn-default-hover.png | 14K | 04-23 | AS/.../button/ | del (single-state probe, folded into four-state) |
| btn-ghost-hover.png | 15K | 04-23 | AS/.../button/ | del (single-state probe) |
| btn-destructive-hover.png | 15K | 04-23 | AS/.../button/ | del (single-state probe) |
| btn-destructive-focus-visible.png | 16K | 04-23 | AS/.../button/ | del (single-state probe) |
| btn-unified-variants.png | 172K | 04-23 | AS/.../button/ | del (superseded by p2-final-buttons) |
| glass-ui-buttons.png | 129K | 04-23 | AS/.../button/ | del (superseded by p2-final-buttons) |
| p2-final-buttons.png | 128K | 04-24 | AS/.../button/ | keep (final button-grid baseline) |

### Carousel

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| carousel-375x667.png | 134K | 05-12 | AS/.../carousel/ | keep (mobile breakpoint baseline) |
| carousel-1024x768.png | 336K | 05-12 | AS/.../carousel/ | keep (tablet breakpoint baseline) |
| carousel-1440x900.png | 370K | 05-12 | AS/.../carousel/ | keep (desktop breakpoint baseline) |

### Search / category-rail

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| search-fuzzy.png | 120K | 05-06 | AS/.../search/ | keep (fuzzy-match baseline) |
| search-clearcache.png | 129K | 05-06 | AS/.../search/ | keep (clear-cache state baseline) |
| category-rail-full.png | 125K | 04-23 | AS/.../search/ | keep (rail full baseline) |
| category-rail-hover-tooltip.png | 128K | 04-23 | AS/.../search/ | keep (rail hover-tooltip state) |
| category-rail-closeup.png | 7K | 04-23 | AS/.../search/ | del (tiny crop, folded into full) |

### tranche J — research-4 sweep (→ existing `J/research/screens/`)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| j-r4-search-page.png | 122K | 05-06 | J/research/screens/ | del (superseded by search-overview) |
| j-r4-search-overview.png | 327K | 05-06 | J/research/screens/ | keep (search overview baseline) |
| j-r4-search-fullpage.png | 215K | 05-06 | J/research/screens/ | keep (search full-page baseline) |
| j-r4-navigation-carousel.png | 141K | 05-06 | J/research/screens/ | keep (nav-carousel baseline) |
| j-r4-containers-glass-carousel.png | 147K | 05-06 | J/research/screens/ | keep (glass-carousel container) |
| j-r4-table.png | 47K | 05-06 | J/research/screens/ | keep (table baseline) |
| j-r4-clearcache-section.png | 1.3M | 05-06 | J/research/screens/ | keep (clearcache section baseline) |

### tranche E — W0 speedtest hero (→ existing `E/audit/screenshots/`)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| E-W0-01-hero-and-page.png | 323K | 05-26 | E/audit/screenshots/ | keep |
| E-W0-02-resultsstack-togglegroup.png | 2.7K | 05-26 | E/audit/screenshots/ | keep |
| E-W0-03-topcard-score-firacode.png | 16K | 05-26 | E/audit/screenshots/ | keep |
| E-W0-04-topbar-pill-run.png | 236K | 05-26 | E/audit/screenshots/ | keep |
| E-W0-05-eliminated-cta-after-run.png | 183K | 05-26 | E/audit/screenshots/ | keep |

### muster (consumer) audit (→ AS archive; muster is a consumer, no glass-ui tranche)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| muster-current-1440-fullpage.png | 2.4M | 05-26 | AS/.../muster/ | keep (consumer-adoption baseline) |
| muster-broken-state.png | 317K | 05-26 | AS/.../muster/ | keep (broken-state evidence) |

### v2 slide/cover deck (06-02; the live slide-deck work)

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| v2-01-cover.png | 411K | 06-02 | AS/.../slides-v2/ | del (superseded by cover2) |
| v2-01-cover2.png | 418K | 06-02 | AS/.../slides-v2/ | keep (newest cover) |
| v2-04-billing.png | 248K | 06-02 | AS/.../slides-v2/ | keep |
| v2-08-loop.png | 316K | 06-02 | AS/.../slides-v2/ | keep |
| v2-09-monitor.png | 336K | 06-02 | AS/.../slides-v2/ | keep |
| v2-10-close.png | 458K | 06-02 | AS/.../slides-v2/ | keep |
| slide-01.png | 189K | 06-01 | AS/.../slides-v2/ | keep (slide-01 baseline) |

### audit sweep (flourishes; 05-05) — tranche-level audit

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| audit-intro.png | 457K | 05-05 | AS/.../audit-sweep/ | keep (intro baseline) |
| audit-flourishes-full.png | 446K | 05-05 | AS/.../audit-sweep/ | keep (flourishes full baseline) |
| audit-audacious-hero.png | 325K | 05-05 | AS/.../audit-sweep/ | keep (audacious-hero baseline) |
| audit-paper-card.png | 150K | 05-05 | AS/.../audit-sweep/ | keep (paper-card baseline) |
| audit-blob.png | — | — | (routed to blob/ above) | — |
| audit-slider-glass-track.png | — | — | (routed to slider/ above, del) | — |

### misc page snapshots / single-surface

| file | size | mtime | destination | verdict |
|---|---|---|---|---|
| header-before.png | 552K | 04-23 | AS/.../header-ribbon/ | keep (before baseline) |
| header-after.png | 500K | 04-23 | AS/.../header-ribbon/ | keep (after baseline) |
| typography-cm.png | 552K | 04-23 | AS/.../typography/ | keep (color-mode typography baseline) |
| intro-fraunces.png | 130K | 04-23 | AS/.../typography/ | keep (fraunces intro baseline) |
| number-field.png | 215K | 05-06 | AS/.../number-field/ | keep (NumberField baseline) |
| nav-dock.png | 274K | 05-06 | AS/.../dock/ | keep (nav-dock baseline) |
| q-tau-01-home-1440.png | 139K | 05-18 | Q/research/screenshots/ | keep (tranche-Q home baseline) |
| glass-ui-intro.png | 550K | 04-23 | AS/.../misc/ | del (early intro, superseded by p2-final-intro) |
| p2-final-intro.png | 537K | 04-24 | AS/.../misc/ | keep (final intro baseline) |
| current-state.png | 182K | 04-23 | AS/.../misc/ | del (undated generic "current state" probe) |
| index-1440x900.png | 370K | 05-12 | AS/.../misc/ | keep (index page baseline; note byte-identical to carousel-1440x900 — see below) |
| an-settled-compositions.png | 329K | 05-28 | AN/audit/screens/ | keep (tranche-AN settled compositions) |

## Duplicate flags — sha1-CONFIRMED (run, not speculative)

`shasum *.png` collapsed to **two byte-identical pairs**:

- **`index-1440x900.png` ≡ `carousel-1440x900.png`** (same sha1, 370010 B) — the SAME capture under two names. **Resolution: keep `carousel-1440x900.png`, del `index-1440x900.png`** (the `index-1440x900` keep verdict in the misc table is overridden to **del** by this confirmation).
- **`j-r4-search-fullpage.png` ≡ `number-field.png`** (same sha1, 215990 B) — also the SAME capture, mis-saved under a NumberField name. **Resolution: keep `j-r4-search-fullpage.png` (J research sweep), del `number-field.png`** (the `number-field.png` keep verdict is overridden to **del**; there is no genuine NumberField baseline in this scratch set — flag for a fresh capture if one is needed).

The `j-r4-search-overview` / `slider-page` / `blob-cfg` near-equal sizes are distinct hashes (coincidental), no action.

## Headline counts

- **102 files, 42.0 MB.**
- **keep-as-baseline: 65** | **delete-candidate: 37** (two keeps flipped to del by the sha1 dup confirmation: `index-1440x900` + `number-field`).
- Largest del-class is the **aurora v2/v3/v3-dawn ladder (10 del)** and the **aurora-v4 early rungs (3 del)** — pure iteration noise from the 04-21/04-24 WebGL bring-up.
- **Two sha1-confirmed true duplicates** collapsed: `index-1440x900` ≡ `carousel-1440x900`, and `number-field` ≡ `j-r4-search-fullpage` (the latter means there is NO real NumberField baseline in the set).

## Routing destinations created (mkdir plan — execution, not done here)

```
docs/tranches/AS/audit/visual/archive/2026-06-03/
  ├── aurora/          (37 files)
  ├── slider/          (9)
  ├── button/          (8)
  ├── carousel/        (3)
  ├── search/          (5)
  ├── blob/            (4)
  ├── slides-v2/       (7)
  ├── audit-sweep/     (4)
  ├── header-ribbon/   (2)
  ├── typography/      (2)
  ├── number-field/    (1)
  ├── dock/            (1)
  ├── muster/          (2)
  └── misc/            (4)
# existing tranche dirs reused (no AS archive):
docs/tranches/E/audit/screenshots/        (+5)
docs/tranches/J/research/screens/         (+7)
docs/tranches/Q/research/screenshots/     (+1)
docs/tranches/AN/audit/screens/           (+1)  [mkdir — AN has audit/ but not screens/]
```

All destinations stay under the global `*.png` gitignore — the reorg moves scratch off the root without ever staging it. Root `/*.png` returns to **0 files** post-execution.
