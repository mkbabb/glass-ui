# BH Lane δ — demo/ RESTRUCTURE (read-only research)

Repo: `/Users/mkbabb/Programming/glass-ui` · branch `tranche/BG` · 2026-06-28
Scope: propose a colocated, per-component / per-story / per-category target tree for `demo/`. Read-only.

---

## 0. TL;DR (the load-bearing decisions)

1. **`demo/stories/<category>/<id>.vue` is a HARD GLOB CONTRACT**, not a convention. `stories/manifest.ts:118` does `import.meta.glob("./*/*.vue")` and `lazy(cat,id)` keys `./${category}/${id}.vue`. A per-story-DIR restructure (`<category>/<id>/<id>.vue`) **silently breaks every story** (the `MissingStory` fallback renders `null`). The glob MUST move to `./*/*/index.vue` (or `./*/**/*.vue`) and `lazy()` re-keyed, IN THE SAME WAVE as the first story move. This is the #1 gotcha.
2. **`_chassis/DemoFrame.vue` is DEAD** (0 real importers — only comment mentions). `_chassis/demo-frame.css` is HALF-dead: its `.story-cels` container + scroll-cascade stagger rules ARE live (StoryPage.vue:168). Extirpation = delete `DemoFrame.vue` + the dead `.demo-frame*`/`.story-cel` per-variant CSS; MIGRATE the live `.story-cels` rules into a colocated `StoryPage` style, then delete the `_chassis/` dir + its `demo.css` `@import`.
3. **NO top-level `demo/composables/`** (user-locked). Both members re-home by consumer: `useStoryNavigation.ts` → the demo chassis-kit dir (it powers StoryPage + AppShell); `useContextualDockLayers.ts` (1 importer) → the dock layout dir.
4. **HARD BG COLLISION.** BG **WS4 ("Components · Demo · Encapsulation", 26 waves)** ALREADY does "demo chassis consolidate · >500 splits · colocation-gate structural · live REAL category previews" (`docs/tranches/BG/PLAN.md:137`). BG WS2 cuts dock files, WS5 touches viz substrates. **BH Lane δ file-moves MUST sequence AFTER BG WS4 closes** — they cannot run concurrently. Lane δ becomes a *re-shape onto the post-WS4 tree*, not a parallel fork.
5. **121 scripts reference `demo/` paths; 44 reference `CLAUDE.md`.** Every story-path move is a gate-path edit. Restructure waves must batch-update `scripts/proof-*.mjs` path literals (evidence: `rg` the moved path returns 0 stale refs).

---

## 1. Current demo/ inventory (38,563 LOC)

### 1.1 Top-level (`demo/`)
```
App.vue            5L    thin <AppShell/> wrapper
main.ts           12L    createApp + router.isReady().then(mount)
router.ts         94L    buildRoutes() from manifest (category landing + per-story)
demo.css         169L    @import cascade (tailwind, tw-animate, src/styles, story-hero, _chassis/demo-frame, liquid-morph)
composables/             useStoryNavigation(111) useContextualDockLayers(66)
configurator/            PresetEditor.vue(395) + preset-editor/{store,persistence,types,defaults,css-writers,stylesheet-swap}.ts + usePresetEditor/useConfiguratorOpen/index.ts
eggs/                    FRedrawOverlay(161) fGlyphPoints(99) CommandPalette(77) KonamiAurora(67) useLongPress(52) useKonami(52) NotFound(47)
layout/                  AppShell.vue(860) SidebarDock.vue(498) BottomDock.vue(482) dock-nav.css(416)
presets/                 neutral.css(96) manifest.ts(29)
stories/                 see §1.2
```

### 1.2 `demo/stories/` — flat root files (4,918 LOC of chassis at root)
| File | L | importers | disposition |
|---|---|---|---|
| `manifest.ts` | 1236 | router + docks + nav | **split** (god-module §4) |
| `story-hero.css` | 717 | demo.css @import | **split + colocate** with StoryHero/StoryPage |
| `StoryHero.vue` | 432 | 2 | chassis-kit |
| `dock-layer-contexts.ts` | 392 | 1 (`useContextualDockLayers`) | move with dock layout |
| `SectionLanding.vue` | 303 | router (dynamic) | chassis-kit (landing) |
| `SectionPreviewCard.vue` | 245 | 3 (SectionLanding) | chassis-kit (landing) |
| `StoryPage.vue` | 234 | **120** | chassis-kit (THE page) |
| `category-hero.ts` | 226 | 6 | chassis-kit (manifest data) |
| `aurora-hero.ts` | 223 | 6 | chassis-kit (manifest data) |
| `ShowcaseFrame.vue` | 151 | 27 | chassis-kit |
| `CodeBlock.vue` | 149 | 1 (card.vue) | chassis-kit (near-dead) |
| `StoryHeader.vue` | 106 | 2 | chassis-kit |
| `StorySectionHeader.vue` | 105 | **0** | **DEAD — safe-delete** |
| `warm-field.ts` | 92 | 3 | chassis-kit (manifest data) |
| `StorySection.vue` | 88 | **92** | chassis-kit (THE section) |
| `StoryPlayButton.vue` | 82 | 2 | chassis-kit |
| `Code.vue` | 76 | 1 (card.vue) | **fold into CodeBlock** (both only card.vue) |
| `TokenLadder.vue` | 61 | 2 | chassis-kit |

### 1.3 Category dirs (each = flat `<id>.vue` files)
`aurora/`(feature-support, NOT a category) · `compositions/`(12) · `containers/`(14) · `data/`(14) · `display/`(11) · `dock/`(11+`examples/`7) · `feedback/`(8) · `forms/`(12) · `foundations/`(13) · `motion/`(13, +2 `.ts` data) · `navigation/`(4) · `substrates/`(14, +2 `.ts` data). Plus `_chassis/`(2, dead).

**Structural smell:** `stories/aurora/` (17 files: `config/`, `sections/`, `AuroraConfigDock`, `AuroraStage`, `presets.ts`, …) is the support tree for the aurora STORY — but the story file lives at `stories/substrates/aurora.vue`. The feature-dir is orphaned from its story (importers: `substrates/aurora.vue`, `display/buttons.vue`, `dock/DockStage.vue`). This is exactly the colocation defect the user names.

**Name collisions today:** THREE `presets.ts` (`aurora/`588, `substrates/`299, `presets/manifest.ts`). TWO code primitives (`Code`+`CodeBlock`, both only `card.vue`).

---

## 2. `_chassis` EXTIRPATION (user: "deprecated dirs must be FULLY EXTIRPATED")

Evidence (`grep -rn DemoFrame`, `grep import`):
- `_chassis/DemoFrame.vue` (93L `.demo-frame story-cel` Card host): **NEVER imported** — the only `DemoFrame` mentions are two prose comments in `StoryPage.vue:102,149`. **DEAD → delete.**
- `_chassis/demo-frame.css` (341L) `@import`-ed once (`demo.css:115`). Defines `.demo-frame{,-card,-caption}` (DEAD, only `DemoFrame.vue` applies them) + the `.story-cels`/`.story-cel` scroll-cascade stagger group. **`.story-cels` IS live** — `StoryPage.vue:168 class="story-cels flex flex-col"`. The per-child `.story-cel` rules are dead (only `DemoFrame.vue` emits `story-cel`).

**Extirpation recipe (one wave):**
1. Delete `_chassis/DemoFrame.vue`.
2. Move the LIVE `.story-cels` + `.scroll-cascade` nth-child stagger rules into a colocated `chassis/page/story-page.css` (next to `StoryPage.vue`); delete the dead `.demo-frame*` / `.story-cel` per-variant rules (verify: no `class="...demo-frame"` / singular `story-cel` survives).
3. Delete `_chassis/` dir + the `demo.css:115 @import "./stories/_chassis/demo-frame.css"` line.
4. Evidence: `rg -n "_chassis|demo-frame|\bstory-cel\b" demo/` → 0 hits; build + a story-page route paints unchanged.

---

## 3. TARGET demo/ TREE (the standardized shape)

Idiom: **each chassis primitive in a dir · each story-item in a dir · each category in a dir · components+composables+constants+styles colocated.** No top-level `composables/`. No `_chassis/`.

```
demo/
├── App.vue                      (keep)
├── main.ts                      (keep)
├── router.ts                    (keep — re-points to chassis/manifest)
├── demo.css                     (keep — @import cascade, minus _chassis + minus root story-hero)
│
├── shell/                       ← was layout/  (the app frame; "shell" reads truer than "layout")
│   ├── AppShell/                AppShell.vue (split §4) + app-shell.css + colocated sub-parts
│   ├── SidebarDock/             SidebarDock.vue + sidebar-dock.css (carve from dock-nav.css)
│   ├── BottomDock/              BottomDock.vue + bottom-dock.css (carve from dock-nav.css)
│   ├── useContextualDockLayers.ts   ← from demo/composables/  (1 importer, dock-shell-local)
│   ├── dock-layer-contexts.ts       ← from stories/ root (392L; only useContextualDockLayers reads it)
│   └── dock-nav.css                  (the shared-across-both-docks remainder, if any)
│
├── chassis/                     ← the story-kit (was stories/ root flat files); the "kit" the user asks for
│   ├── manifest/                manifest split (§4): index.ts + rows/<category>.ts + descriptors.ts + lazy.ts
│   ├── page/                    StoryPage.vue + story-page.css (absorbs live .story-cels rules)
│   ├── hero/                    StoryHero.vue + StoryHeader.vue + story-hero.css(split §4) + aurora-hero.ts + category-hero.ts + warm-field.ts
│   ├── section/                 StorySection.vue   (StorySectionHeader.vue DELETED — 0 importers)
│   ├── landing/                 SectionLanding.vue + SectionPreviewCard.vue
│   ├── showcase/                ShowcaseFrame.vue + TokenLadder.vue
│   ├── code/                    CodeBlock.vue   (Code.vue FOLDED in — both only card.vue)
│   ├── play/                    StoryPlayButton.vue
│   └── useStoryNavigation.ts    ← from demo/composables/  (chassis-local: StoryPage + AppShell)
│
├── configurator/               (already well-shaped — keep; PresetEditor.vue split §4)
│   ├── PresetEditor/            PresetEditor.vue(split) + preset-editor/* (store/persistence/types/defaults/css-writers/stylesheet-swap)
│   ├── usePresetEditor.ts  useConfiguratorOpen.ts  index.ts
│   └── presets/                ← from demo/presets/ (neutral.css + manifest.ts; consumed ONLY by configurator)
│
├── eggs/                       (cohesive easter-egg cluster — keep as a feature-group)
│   ├── command-palette/        CommandPalette.vue + useKonami? (no — Konami is separate)
│   ├── konami/                 KonamiAurora.vue + useKonami.ts + useLongPress.ts
│   ├── f-redraw/               FRedrawOverlay.vue + fGlyphPoints.ts
│   └── NotFound.vue
│
└── stories/                    ← per-category dir of per-story dirs
    ├── <category>/             (aurora FOLDS into substrates — see note)
    │   └── <story-id>/
    │       ├── index.vue       (the story SFC — the glob target)
    │       ├── <Story>.css     (was <style scoped> if heavy / shared)
    │       ├── composables/    (story-local use*.ts)
    │       ├── constants.ts    (story-local data/presets)
    │       └── parts/          (extracted sub-components for god-modules)
    │   ...
    ├── substrates/
    │   ├── aurora/             ← stories/aurora/ FOLDS HERE (config/, sections/, AuroraConfigDock, presets.ts → constants.ts)
    │   │   ├── index.vue       (was substrates/aurora.vue)
    │   │   ├── config/  sections/  parts/  constants.ts(was presets.ts)  usePresetThumbnails.ts
    │   ├── blob/               index.vue(split §4) + parts/ + constants.ts
    │   ├── constellation/      index.vue(split §4) + parts/
    │   └── ... (12 more, each its own dir)
    └── dock/
        ├── liquid-playground/  index.vue(split §4) + parts/{BloomDemo,IslandFissionDemo,PlayerScrubDemo}.vue
        ├── overview/           index.vue(split §4) + parts/
        ├── DockStage/          DockStage.vue (7 importers — shared dock-story chassis; lift to dock/_kit or chassis/)
        ├── examples/           AppleMusic/ Spotlight/ … (each its own dir, already cohesive)
        └── ...
```

### Per-story-page standardized shape (the unit)
```
stories/<category>/<id>/
├── index.vue            REQUIRED — the manifest glob target
├── <id>.css             optional — heavy/shared styles (else keep <style scoped> inline)
├── constants.ts         optional — story-local data, presets, label maps
├── composables/         optional — story-local use*.ts (NOT demo/composables)
└── parts/               optional — extracted sub-components when index.vue > ~300L
```

**Manifest glob change (mandatory, same wave):**
`import.meta.glob("./*/*.vue")` → `import.meta.glob("./*/*/index.vue")`; `lazy()` key `./${cat}/${id}.vue` → `./${cat}/${id}/index.vue`. Verify: every manifest row resolves (no `MissingStory` render) — a runtime route-walk is the evidence, grep alone is insufficient.

---

## 4. GOD-MODULE split strategies (>500L)

| File | L | composition | split |
|---|---|---|---|
| `stories/manifest.ts` | 1236 | types + glob/lazy + per-category row arrays + CATEGORIES + sectionLanding + assignDepths + landing maps | `chassis/manifest/` → `types.ts` · `lazy.ts`(glob) · `rows/<category>.ts` (11 row files) · `categories.ts` · `landing.ts`(sectionLanding+depths) · `index.ts`(assemble). The row arrays are the bulk; one file per category mirrors the story dirs. |
| `dock/liquid-playground.vue` | 930 | script ~310L (bloom + island-fission + player-scrub + facets/rail, ~4 distinct demos) + template ~500L | `liquid-playground/` → `index.vue`(stage+composition) + `parts/BloomDemo.vue` + `parts/IslandFissionDemo.vue` + `parts/PlayerScrubDemo.vue` + `parts/FacetRail.vue` + `constants.ts`(track/places/recents/facets). **NOTE: in BG WS2/WS6 dock write-set — sequence after.** |
| `substrates/blob.vue` | 870 | studio config (presets/geo/atoms) + ≥3 template stages | `blob/` → `index.vue` + `parts/<stage>.vue` + `constants.ts`(STUDIO_GEO_BASE, presets, palette) + `composables/useBlobStudio.ts`. **BG WS5 viz write-set.** |
| `layout/AppShell.vue` | 860 | nav + help + palette/konami/f-redraw eggs wiring + morph-stage + bloom + dock-host | `shell/AppShell/` → `AppShell.vue`(frame) + `parts/MorphStage.vue` + `parts/HelpOverlay.vue` + `composables/useShellEggs.ts`(palette/konami/f-redraw refs) + `composables/useDockMorphStage.ts`. **BG WS1 routing + D13 morph write-set — sequence after.** |
| `substrates/constellation.vue` | 759 | hero lattice + 4 skins + gravity-well + double-tap impulse + π hooks; ~300L template | `constellation/` → `index.vue` + `parts/<skin>.vue` + `composables/useConstellationSkins.ts`. **BG WS5 (DE-migrate off WebGPU) write-set — sequence after.** |
| `stories/story-hero.css` | 717 | hero cluster + gravity entrance + dark wash recalibration + scroll-build | `chassis/hero/story-hero.css` split into `hero-cluster.css` + `hero-entrance.css` + `hero-wash.css` (imported by chassis/hero or demo.css). |
| `dock/overview.vue` | 680 | bg-toggle aurora + dock-view/command label maps + multi-dock matrix | `overview/` → `index.vue` + `parts/<matrix-group>.vue` + `constants.ts`(labels). **BG WS2 dock write-set.** |
| `aurora/presets.ts` | 588 | aurora preset definitions | folds to `stories/substrates/aurora/constants.ts`; if still >500 split by preset-family. |
| `display/card.vue` | 562 | ~450L template (tier matrix + scroll-pane + cartoon + veil + code snippets) | `card/` → `index.vue` + `parts/{TierMatrix,ScrollPane,CartoonDemo,VeilDemo}.vue`. Sole `Code`/`CodeBlock` consumer — folds those during split. |

Near-miss watch (>450L, split if BG hasn't): `SidebarDock`(498) `fourier-field`(490) `search`(488) `BottomDock`(482) `curve-gallery`(480) `deck`(460).

---

## 5. Top-level `demo/composables/` dissolution (user: NO top-level composables dir)

| composable | L | importers | new home |
|---|---|---|---|
| `useStoryNavigation.ts` | 111 | StoryPage + AppShell | `demo/chassis/useStoryNavigation.ts` (chassis-kit-local — it IS the story-kit's nav engine) |
| `useContextualDockLayers.ts` | 66 | 1 (only reads `dock-layer-contexts.ts`) | `demo/shell/useContextualDockLayers.ts` (with `dock-layer-contexts.ts` beside it) |

Then delete `demo/composables/`.

---

## 6. layout / configurator / presets / eggs placement

- **`layout/` → `shell/`** — rename to read as the app frame; each of AppShell/SidebarDock/BottomDock becomes a colocated dir (SFC + carved CSS from `dock-nav.css`). `dock-nav.css`(416L) carves into `app-shell.css` + `sidebar-dock.css` + `bottom-dock.css` (split by selector ownership); a genuinely-shared remainder stays `shell/dock-nav.css`.
- **`configurator/`** — already the colocation model (PresetEditor + `preset-editor/` service split + `usePresetEditor`/`useConfiguratorOpen`/`index.ts`). KEEP. PresetEditor.vue(395) is under the 500 bound — no split needed unless BG WS4 already touched it. **Absorb `demo/presets/`** (neutral.css + manifest.ts) as `configurator/presets/` — its ONLY consumers are `preset-editor/*` + `PresetEditor.vue`.
- **`presets/`** — NOT a shell concern; it is the configurator's preset data. Fold into `configurator/presets/` (above).
- **`eggs/`** — a cohesive easter-egg feature cluster; KEEP as a group but colocate the loose composables: `konami/`(KonamiAurora + useKonami + useLongPress), `f-redraw/`(FRedrawOverlay + fGlyphPoints), `command-palette/`(CommandPalette), `NotFound.vue` standalone. All consumed by AppShell (+ router for NotFound). No top-level move needed.

---

## 7. Gate + CLAUDE.md collision surface

- **121 `scripts/proof-*.mjs` / `wf-*.js` reference `demo/` paths** (story files, `_chassis`, manifest). Every story-path move (`<cat>/<id>.vue` → `<cat>/<id>/index.vue`) is a path-literal edit in the owning gate. Named hits incl. `proof-storybook-complete`, `proof-page-hierarchy`, `proof-hierarchy`, `proof-demo-affordances`, `proof-story-language`, `proof-code-blocks`, `proof-morph-showcase`, `proof-dock-*`. **Each restructure wave updates its in-scope gates' path literals; evidence = the gate stays GREEN + `rg <oldpath> scripts/` = 0.**
- **44 scripts reference `CLAUDE.md`** (Lane-α/CLAUDE-deletion scope, not δ — but `proof-story-language`/`proof-page-hierarchy` parse BOTH demo + CLAUDE.md, so δ + the CLAUDE.md-delete lane share those gates; coordinate).

---

## 8. BG collision protocol (USER framing decision 3 — binding)

`docs/tranches/BG/PLAN.md` convergence order: WS1(routing)→WS3(glass)→WS2(dock)→WS5(viz)→WS6(siri)→**WS4(components/demo)**→WS7(close).

| BG WS | demo write-set overlap with Lane δ |
|---|---|
| **WS4** (26 waves) | **DIRECT — "demo chassis consolidate · >500 splits · colocation-gate structural · live REAL category previews"** = the same job. Lane δ is a RE-SHAPE of the post-WS4 tree, not a parallel effort. |
| WS2 (dock) | `dock/` stories, `liquid-playground`, `overview`, DockStage, SidebarDock/BottomDock (33→24 files). |
| WS5 (viz) | `substrates/{blob,constellation,fourier-field,…}` — DE-migrate, intrinsic-size fixes. |
| WS1 (routing) | `AppShell.vue` (the routing + morph-stage god-module). |

**Protocol:** Lane δ's file-MOVING bands sequence **AFTER BG WS4 closes** (WS4 is 2nd-to-last). Concretely:
- **Concurrent-safe NOW (no live demo edits):** drafting the target tree + the manifest-glob migration spec + the gate-path-rename map + the `_chassis` dead-code proof. These are docs/plans only.
- **Blocked on WS4/WS2/WS5/WS1:** every actual `git mv` of a story/dock/substrate/AppShell file. Re-base the move set onto BG's post-WS4 file list (WS4 already deletes/splits some god-modules — do NOT re-split what WS4 split; consume its output).
- If BH must start before BG WS4: restrict Lane δ to the **BG-untouched islands** — `chassis/` flat-root files (StoryHero/StorySection/ShowcaseFrame/etc.), `eggs/`, `configurator/`+`presets/` fold, `demo/composables/` dissolution — none of which WS1/2/3/5/6 write. Sequence the `stories/` per-story-DIR move + manifest-glob change LAST, after WS4.

---

## 9. Wave proposal (Lane δ internal, BG-aware)

1. **δ1 — dead-code extirpation** (BG-safe): delete `_chassis/DemoFrame.vue` + dead `demo-frame.css` rules (migrate `.story-cels`), delete `StorySectionHeader.vue`(0 importers), fold `Code.vue`→`CodeBlock.vue`. Evidence: build green + `rg` clean.
2. **δ2 — composables dissolution** (BG-safe): `useStoryNavigation`→`chassis/`, `useContextualDockLayers`+`dock-layer-contexts.ts`→`shell/`; delete `demo/composables/`.
3. **δ3 — chassis-kit colocation** (BG-safe islands): flat `stories/` root chassis → `chassis/{page,hero,section,landing,showcase,code,play,manifest}/`; `story-hero.css` split; absorb manifest data files (aurora-hero/category-hero/warm-field).
4. **δ4 — configurator/presets/eggs colocation** (BG-safe): `layout/`→`shell/` (dirize + carve `dock-nav.css`); fold `presets/`→`configurator/presets/`; eggs sub-dir colocation.
5. **δ5 — manifest split + glob migration** (after WS4): `manifest.ts`→`chassis/manifest/{rows/*,types,lazy,categories,landing,index}`; glob `./*/*/index.vue`. Runtime route-walk evidence.
6. **δ6 — per-story-dir move + god-module split** (AFTER WS4/WS2/WS5/WS1, consuming their splits): each story → `<cat>/<id>/index.vue` + `parts/`/`composables/`/`constants.ts`; fold `stories/aurora/`→`stories/substrates/aurora/`. Batch-update the ~121 gate path literals. Evidence: full storybook route-walk + every in-scope gate GREEN.
