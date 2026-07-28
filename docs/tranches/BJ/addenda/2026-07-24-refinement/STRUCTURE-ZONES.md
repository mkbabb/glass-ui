# STRUCTURE-ZONES — the five zone settlements, banked

**Provenance:** run `wf_71b65b7b-323` (structure, CLOSED 07-25), adjudicator seats harvested verbatim
from the journal 2026-07-28 under the no-incomplete-work edict — this was the one declared
harvested-not-banked debt in the corpus (WORKFLOWS.md run ledger: "zone adjudications in journal —
fold into the structure settlement wave at R5"). The debt is now DISCHARGED: the roster's structure
settlement wave cites THIS file. Measured at `0371836d` — line numbers are that pin's; re-derive at
consumption (~29% path-rot law applies across pins). Bench seats remain in the journal for archaeology.

---


# ═══════════ ZONE SETTLEMENT (73691 chars) ═══════════

**modelId: `claude-opus-5[1m]`** (Opus 5, 1M context). Verified at `0371836d`; every count below is mine or a named seat's, re-derived where zones disagreed.

---

# THE DIRECTORY SETTLEMENT — terminal, whole repo

---

## 1 · THE TARGET TREE

```
glass-ui/
  src/
    index.ts  forms.ts  keyframes.ts        (root barrels — 8 deep motion reaches collapsed)
    tokens.ts                               ← styles/tokens.ts + styles/tokens/manifest.ts MERGED
    components/                             505 → ~426 files, 94 → ~76 dirs
      index.ts                              31 re-exports; 4 tombstone comments STRUCK
      _shared/                              flat, 0 sub-dirs
        class-names.ts  primitive.ts  axes.ts  selection.ts  control-size.ts
        floating.ts  interaction.ts  resolve-surface-class.ts  motion-axis.ts
        dock-context.ts        ← dock/composables/  [BREAKS THE ONE GRAPH CYCLE]
        hold.ts                ← dock/composables/useDockHold.ts
        prng.ts                ← composables/glass/procedural/prng.ts   (8 consumers)
        color.glsl.ts  color.wgsl.ts   ← composables/glass/procedural/  (4 substrates)
        disclosure-context.ts  disclosure.css  feedback.css
        field-control.ts  value-domain.ts  field-control.css  field-surfaces.css
        menu-row.css           (menu/ dies; menuRowClass.ts → select/row-class.ts)
        track/styles.css       ← styles/glass/{track-well,liquid-fill,value-marks}.css
      aurora/    Aurora.vue index.ts use.ts cursor.ts runtime.ts frame-loop.ts atoms.ts
                 atoms-fields.ts color.ts fallback-ground.ts image-source.ts presets.ts
                 render-mode.ts
                 gl/{setup,uniforms,texture}.ts   wgpu/{setup,uniforms,uniforms-image}.ts
                 shaders/{frag,vert,wgsl,image-frag,image-wgsl,mediums-wgsl,brush,
                          composition,flow,mediums,metal-medium,oil-modes,tonemap,
                          vangogh-medium}.ts                                       32
      blob/      Blob.vue index.ts config.ts types.ts constants.ts presets.ts palette.ts
                 mood.ts pointer.ts satellites.ts simulation.ts kinematics.ts easing.ts
                 gl/{program,upload,renderer}.ts  wgpu/{setup,uniforms}.ts shaders/*  26
      constellation/ Constellation.vue index.ts use.ts types.ts constants.ts
                 field.ts interaction.ts render.ts well.ts                          9
      fourier-field/ FourierField.vue index.ts use.ts math.ts constants.ts uniforms.ts
                 gl.ts wgpu.ts shaders/{glsl,compute-wgsl,render-wgsl,ribbon}.ts   12
      dock/      Dock.vue Control.vue Crossfade.vue Layer.vue LayerGroup.vue
                 Separator.vue Trigger.vue BackgroundToggle.vue
                 index.ts crossfade-context.ts rail-context.ts teleported.ts
                 composables/  (the ONE admissible composables/ dir — 16 members)
                   useDockState useDockMorph useDockSpring useDockSearch useDockShellProps
                   useDockTouchGate useDockClickIntegrity useDockOverflowFit useCtaReceive
                   useSelectionGroup✗ useBackdropLuminance morph-measure backdrop-sample
                   (index.ts DELETED — dual path)
                 styles/ index.css shell.css shell-core.css morph.css density.css layers.css
                   overflow.css crossfade.css shape.css cta-seat.css
                   controls/{icon-button,tab-button,triggers,touch-floor}.css        ~40
      ── parts.ts families (R3: ≥3 zero-logic parts) ──
      table/ 2 · dropdown-menu/ 7 · select/ 8 · dialog/ 8 · drawer/ 8 · card/ 6
      command/ 9 · toast/ 5 · number-field/ 6 · tags-input/ 6 · metric/ 6 · accordion/ 3
      ── below the ≥3 bar: renamed, not folded ──
      alert/ badge/(+styles.css) avatar/ collapsible/ tooltip/ carousel/ popover/
      toggle-group/ radio-group/ labeled-field/
      ── the rest ──
      tabs/ timeline/(+styles/) sortable-list/(+drag/) handmark/(+stroke/ +ink/) typewriter/
      search/ data-table/ easing/ chip/(+styles.css) slider/(+styles/) pager-dots/(+styles.css)
      configurator/(+styles.css) infinite-scroll/ completion-seal/ fading-scroll/
      expandable-container/ header-ribbon/ instrument-chassis/ dark-mode-toggle/
      scroll-progress-rim/ status-dot/ animated-digit/ watercolor-dot/ surface/ skeleton/
      separator/ label/ input/ textarea/ switch/ checkbox/ button/ progress/
      DELETED: paper-backdrop/ · deck/ (→composables) · 26 *.md
    composables/                            103 → 56 files, 22 → 7 sub-dirs
      canvas/   index lifecycle visibility canvas2d webgl webgpu gpu-device substrate
                status budget                                                       10
      color/    index oklch value                                                    3
      deck/     index constants use keyboard          ← from components/deck/        4
      dom/      index observe defer token-color touch-gate clipboard aria             7
      motion/   index morph drag geometry spring press mount number projection        9
        core/   index loop scroll chrome pointer field-mappings selection flex presets
                reveal element reduced-motion view-transition math                  14
      toc/      index tree state scroll                                              4
      context.ts  dark.ts  glass.ts  keyboard.ts  reactive.ts                        5
    styles/                                 76 → 21 files, 5 → 2 sub-dirs
      index.css       THE one ordered manifest (~30 @import, no rules)
      fonts.css  theme.css  typography.css  utilities.css  a11y.css
      motion.css  scroll.css  paper.css
      tokens/   color material shadow sizing motion type scale property        (8)
      glass/    material surfaces reveal metal                                 (4)
  demo/                                     196 → ~192 files, 39 → ~35 dirs
    main.ts  demo.css  scroll-pin.css  vite.dist.config.ts
    capture/    boot.ts styles.css engine-badge.ts
    routing/    router.ts focal.ts transition.ts RouteLink.vue useStoryNavigation.ts
    chassis/    19 flat, 0 sub-dirs
    composables/ virtual-section.ts useVirtualSection.ts scroll-choreography.ts
    shell/      App.vue BottomDock SidebarDock DockFacetMenu NotFound useShortcuts
                useNavDock useContextualDockLayers dock-nav.css
                configurator/ 10 flat
    stories/    manifest.ts story.ts + 11 category dirs (+12 satellite sub-dirs)
  tests/                                    217 → ~196 files, 53 → ~50 dirs
    _support/     setup shims.d.ts mount-composable invariant chip-listener.setup
    components/   46 stem .test.ts + 22 leaf dirs        (ui/ and custom/ DELETED)
    composables/  exact mirror of the settled src/composables
    demo/         exact mirror of the settled demo/
    invariants/   17 tree-walkers + cross-module sweeps
    scripts/ styles/
  tests-visual/                             223 → ~209 files, 11 → ~20 dirs
    _support/  page.ts color.ts pixel.ts scene.ts paths.ts
    components/{aurora,blob,constellation,dock}/ + 24 flat specs
    styles/{glass,scheme}/  motion/  demo/  gates/  engine/webkit/  _harness/
  scripts/                                  14 files, unchanged
```

---

## 2 · THE MOVE LEDGER (consolidated, deduplicated)

### 2a · `src/composables` → `src/components` (colocation, 13 moves)

| current | target | ground |
|---|---|---|
| `glass/useGlassBackdropLuminance.ts` (433) | `dock/composables/useBackdropLuminance.ts` | sole `src` consumer `dock/GlassDock.vue`; on no barrel; `glass` is bucket INTERNAL (`subpath-policy.mjs:103`) → zero public delta |
| `glass/backdropLuminanceSample.ts` (301) **+** `ambientHueHistogram.ts` (111) **+** `backdropSampleMath.ts` (54) | `dock/composables/backdrop-sample.ts` (merged) | each consumed only by the next link in the chain |
| `motion/morph/useDockCtaReceive.ts` (319) | `dock/composables/useCtaReceive.ts` | zero non-dock `src` consumers; seat partial already `dock/styles/cta-seat.css` |
| `dom/useDragVelocity.ts` (224) | `slider/drag-velocity.ts` | sole consumer `slider/Slider.vue`; the `_shared/useMotionAxis.ts:35` hit is a **comment** |
| `color/useAccentTone.ts` + `accent-tone-solve.ts` (179) | `chip/accent-tone.ts` + `chip/accent-tone-solve.ts` | `Chip.vue:11` already imports the shell directly; `glass.css:64` already moved the CSS arm |
| `color/index.ts:251-353` `deriveBlobPalette` | `blob/palette.ts` | consumers: blob ×4 + 1 demo + 1 test |
| `color/index.ts:84-104` `warmCatchLight`, `:202-236` `deriveHue` | fold into `aurora/color.ts` | consumers aurora-only; no new file |
| `glass/procedural/color.{glsl,wgsl}.ts` (454) | `_shared/color.{glsl,wgsl}.ts` | aurora ×2 + blob + fourier-field; a shader string is not a composable |
| `glass/procedural/prng.ts` (25) | `_shared/prng.ts` | 8 consumers across 5 components |
| `glass/webgl/shaders/flow.{glsl,wgsl}.ts` (99) | **FOLD** → `CURL_FBM_GLSL` into `aurora/shaders/flow.ts`; `CURL_FBM_WGSL` into `aurora/shaders/wgsl.ts` | one importer each, both aurora, one import statement apart from a same-named sibling |

### 2b · `src/components` → `src/composables`

| current | target | ground |
|---|---|---|
| `aurora/constants/budget.ts` (74) | `composables/canvas/budget.ts` | `resolveBudgetDpr` read by blob ×1 + fourier-field ×3 out of aurora's **private** `constants/` |
| `tabs/composables/useTabRovingFocus.ts` | **FOLD** into `motion/core/selection.ts` as `useRovingFocus` | ends the only `composables → components` edge (`useSelectionGroup.ts:13`) |
| `components/deck/**` (5 files, no SFC) | `composables/deck/{index,constants,use,keyboard}.ts` | `find src/components/deck -type f` → zero `.vue`. Not a component |

### 2c · `src/composables` → `demo`

| current | target | ground |
|---|---|---|
| `motion/scroll/{useScrollPin,useScrollScene}.ts` (355) | `demo/composables/scroll-choreography.ts` | keyframes-BEARING, on no barrel, zero `src` consumers, one demo consumer |
| `src/styles/scroll-choreography.css:204-271` (`.scroll-pin`, `.scroll-pin-stage`, the `--pin-t` `@property`) | `demo/scroll-pin.css` | follows its only writer — see **C11** |

### 2d · `src/composables` internal

| current | target |
|---|---|
| `dom/useDocumentVisibility.ts` | `motion/core/loop.ts` — only consumers `useRAFLoop`, `useIntersectionPause`; not on `/dom` |
| `motion/spring/springPresets.ts` + `motion/engage/engageEnvelopes.ts` + `motion/core/constants.ts` | `motion/core/presets.ts`, **published on `/motion-core`**, dual-exported from `/motion` (precedent `core/index.ts:9-13`) |
| `motion/spring/springProjection.ts` | `motion/projection.ts`, **published on `/motion`**; must stay `vue`-free (`scripts/regen-spring-tokens.mjs:27` type-strips it) |
| `glass/canvas2d/resolveCanvasColor.ts` | merged into `dom/token-color.ts` as `resolveCascadeColor` (probe-span form survives) |

### 2e · `src/components` internal

| current | target | ground |
|---|---|---|
| `dock/composables/dockContext.ts` | `_shared/dock-context.ts` | 5 files / 4 foreign components read it — **this is the `dock → dropdown-menu → dock` cycle**, the only cycle in 62 nodes |
| `dock/composables/useDockHold.ts` | `_shared/hold.ts` | `slider/Slider.vue:13,92` |
| `_shared/menu/menuRowClass.ts` | `select/row-class.ts` | 12 lines, one consumer `SelectItem.vue:31` |
| `_shared/menu/menu.css` §`.dropdown-menu-content`,`.dropdown-sub-content` | `dropdown-menu/styles.css` | **gated on a paired capture** — layered → unlayered boundary |
| `aurora/constants/shaders/*` (14) | `aurora/shaders/*` | the only depth-6 files in `src`; blob/fourier `shaders/` are depth 5 |
| `typewriter/utils/*` (5) | `typewriter/*` | the only `utils/` in the tree |
| `sortable-list/composables/*` (6, minus `useSortable`) | `sortable-list/drag/*` | 1 of 7 is a composable; it is a drag engine |
| `dock/styles/controls.css` imports + 3 rules | `dock/styles/index.css` tail | `src/styles/index.css:183,184` adjacent, same `@layer` → source-order-identical; also kills the `controls.css`↔`controls/` stem collision |
| 17 × `<family>/composables/` (all but dock) | family root | 39 of 78 members export no `use[A-Z]` and register no `InjectionKey` |
| 26 × `src/components/**/*.md` | `docs/components/` or delete | `package.json.files = ["dist"]`; 42% coverage; third doc channel |

### 2f · `src/styles` → components / demo

| current | target | ground |
|---|---|---|
| `glass/glass-chip.css` (125 code) | `chip/styles.css` | 18 selectors, all `.glass-chip*`; `@import` ordinal preserved (`glass.css:92`), precedent at `:64` |
| `glass/glass-atom.css` `.badge-atom--*` | `badge/styles.css` (new) | only `badge/index.ts` emits them; `.glass-atom` (dock+badge) **stays shared** |
| `glass/{track-well,liquid-fill,value-marks}.css` (71 code) | `_shared/track/styles.css` | consumers progress, slider, scroll-progress-rim |
| `glass/surfaces-pager.css` `.glass-pager-ring` | `pager-dots/styles.css` | consumers pager-dots + carousel; one **is** the pager |
| `glass/surfaces-pager.css` `.glass-chromatic` | `glass/material.css` | a decoration register |
| `glass/squircle.css` `.configurator` | `configurator/styles.css` |
| `glass/squircle.css` `.glass-floating.sheet-animate` | `dialog/styles.css` | see **C16** |
| `tokens/scheme-motion.css:261` `:where(.glass-drawer,…)` | `drawer/styles.css` | a component rule inside the token cascade |
| `utilities/base-misc.css` `.ghost-slot`, `.kbd` | `demo/demo.css` | zero `src` reach; 5 stories + 2 shell files |
| **114 component-named tokens** | their component dirs | `--dock-*` 36 · `--constellation-*` 27 · `--configurator-*` 17 · `--timeline-*` 14 · `--blob-*` 11 · `--table-*` 5 · `--search-*` 4. Cascade-safe: `index.css:174` imports tokens before `:181+`. `--surface-tint-*` (29) **excluded** — genuine shared axis |
| `src/styles/tokens.ts` + `tokens/manifest.ts` | `src/tokens.ts` (merged) | a published JS entry inside the CSS zone; also kills `tokens.ts`↔`tokens/` |

### 2g · `demo` internal (18 rows, compressed)

`router.ts`→`routing/`; `chassis/hero/focal.ts`→`routing/focal.ts`; `chassis/routeTransition.ts`→`routing/transition.ts`; `chassis/TransitionRouteLink.vue`→`routing/RouteLink.vue`; `chassis/useStoryNavigation.ts`→`routing/`; `chassis/{body,code,family,hero,landing,page,play,section,showcase}/*`→`chassis/*`; `composables/virtual/*`→`composables/*`; `chassis/play/StoryPlayButton.vue`→`stories/motion/springs/PlayButton.vue`; `examples/{Card,Configurator,Toaster}Example.vue`→ their story dirs; `feedback/loop-driver.ts`→`feedback/progress/`; `dock/_frame/`→`dock/_shared/`; `substrates/_frame/`→`substrates/_shared/`; `vite.demo-dist.config.ts`→`vite.dist.config.ts`.
**The 12 non-routes → satellite dirs** (restores `stories/*/*.vue` ≡ route bijection): `display/{separator,status-dot,dark-mode-toggle}.vue` + `data/avatar.vue` → `display/atoms/`; `forms/{label,select,textarea}.vue`→`forms/inputs/`; `motion/{typewriter,countup,animated-digit}.vue`→`motion/text/`; `feedback/toaster.vue`→`feedback/toast/Toaster.vue`; `foundations/paper-texture.vue`→`foundations/paper-glass/Texture.vue`.

---

## 3 · COLLISIONS — cross-zone, ruled

| # | file | zone A | zone B | **RULING** | ground |
|---|---|---|---|---|---|
| **C1** | `useScrollChrome` | components → `dock/composables/` | composables → `motion/core/chrome.ts` | **composables** | published on `/motion-core` (`core/index.ts:86`); `demo/stories/motion/scroll/ScrollReaderBody.vue:66` is a second consumer through the public door, self-described *"the binary consumer #2"*. A published export with a non-dock consumer is not dock-private. |
| **C2** | `useSelectionGroup` | components → `dock/composables/` (conditional) | composables → `motion/core/selection.ts` | **composables** | `demo/stories/dock/{overflow,controls}.vue` import it from `@glass/composables/motion/core`; on `src/index.ts:126` + `/motion-core`. The condition is already resolved by the graph. |
| **C3** | `useTabRovingFocus` | components → `_shared/roving-focus.ts` | composables → fold into `motion/core/selection.ts` as `useRovingFocus` | **composables** | `_shared/` does **not** cure the inversion — `useSelectionGroup` would still import `src/components/_shared`. Folding into the one module that already composes it (`useSelectionGroup.ts:191`) kills the file **and** the edge. `SegmentedTabs.vue` + `data-table` import from `/motion-core`. |
| **C4** | backdrop-luminance chain | components → 4 files | composables → 2 files | **composables' count, components' naming** | 111- and 54-line leaves with one consumer each are sand → 2 files. But `dock/composables/` holds 14 `use*.ts`; the composable keeps the prefix: **`useBackdropLuminance.ts` + `backdrop-sample.ts`**. |
| **C5** | `useDockCtaReceive` | `useCtaReceive.ts` | `cta-receive.ts` | **`useCtaReceive.ts`** | same ground as C4 — intra-dir consistency. |
| **C6** | `aurora/constants/budget.ts` | → `composables/glass/budget.ts` | → `composables/canvas/budget.ts` | **composables** | `glass/` collapses to a single **file** `glass.ts`; `glass/budget.ts` cannot exist. DPR budget is a canvas concern. |
| **C7** | `flow.{glsl,wgsl}.ts` | fold into `aurora/shaders/flow.ts` | rename → `aurora/constants/shaders/curl-fbm.*` | **components' fold at composables' directory** | `constants/` dissolves (2e); a shared shader chunk with one consumer file is not a module. → `CURL_FBM_GLSL` into `aurora/shaders/flow.ts`, `CURL_FBM_WGSL` into `aurora/shaders/wgsl.ts`. **−2 files.** |
| **C8** | `deck/` | components: *"leaves the zone"* | composables: absent from its 6-dir tree | **admit as 7th dir** | `composables/deck/{index,constants,use,keyboard}.ts`, mirroring `toc/`. `./deck` keeps its specifier; policy row moves `COMPONENT_CLASS → CURATED`. |
| **C9** | `procedural/{color.glsl,color.wgsl,prng}.ts` | components' `_shared/` is flat files | composables → `_shared/shaders/` | **flat** | the same settlement flattens `_shared/{disclosure,field,menu}/`; a 2-file `shaders/` would re-mint what it just struck. → `_shared/{color.glsl.ts, color.wgsl.ts, prng.ts}`. |
| **C10** | `demo/stories/foundations/paper-texture.vue` | components: DELETE (with paper-backdrop) | demo: MOVE → `paper-glass/Texture.vue` | **both** | it is a non-route tab (`paper-glass.vue:15` `defineAsyncComponent`), not a route — components' *"1 demo route"* is wrong. Tab survives and moves; `<PaperBackdrop />` at `:33` becomes `<div class="paper-underpaint" aria-hidden />`; the dead facet row `dock-layer-contexts.ts:113` is struck by the manifest derivation. |
| **C11** | `src/styles/scroll-choreography.css` | styles: fold whole into `styles/scroll.css` | composables: its JS writers exile to demo | **SPLIT on the JS-dependency seam** | decidable, not editorial. `.scroll-pin`/`.scroll-pin-stage`/`--pin-t` (`:204-271`) have **one writer**, `useScrollPin` → `demo/scroll-pin.css`. The `.scroll-cascade` / `[data-scroll-reveal]` registers are pure CSS scroll-timeline, applied by `demo/stories/foundations/{radii,colors}.vue` with **zero JS**, reachable on `./styles` → fold into `src/styles/scroll.css`. |
| **C12** | invariant-gate bucket | styles → `tests/gates/` | tests → `tests/invariants/` | **tests** | the tests zone owns its own bucket naming; `gates` is one of the 3 invented buckets being collapsed. |
| **C13** | contract-test shape | components → `tests/components/<X>/contract.test.ts` | tests → `tests/components/<X>.test.ts` stem file | **tests** | the barrel-import discriminator (`grep -ohE "@glass/components/[a-z-]+$"`) is mechanical; components' form mints a 1-file dir per module — 40 of them. |
| **C14** | composables' test targets | `tests/components/custom/dock/…` | tests: fossil path DELETED | **tests** | `src/components/custom/` does not exist. → `tests/components/dock/composables/…`. |
| **C15** | capture harness dir | tests → `demo/_capture/` | demo → `demo/capture/` | **demo** | the underscore idiom marks a private sibling inside a **globbed** dir (`stories/*/`); `demo/` root carries no glob. |
| **C16** | `dialog/placement.css` | styles lands content into `placement.css` | components §5 renames → `styles.css` (its own §1 tree contradicts its §5) | **`dialog/styles.css`** | the §5 rename governs; ordinal at `index.css:225` preserved. |
| **C17** | `blob/config.ts` | GOD: repoint subpath | components: `index.ts` becomes `export * from "./config"` | **components** | one subpath, one entry — GOD's remedy is impossible. Kills the verbatim 23-line duplication, `./blob-config` unchanged. |
| **C18** | anchor SFC renames vs test mirrors | tests wrote `GlassDock.test.ts` etc. | components renames the source | **isomorphism binds — mirrors follow** | `Dock.test.ts`, `Tabs.test.ts`, `Typewriter.test.ts`, `Timeline.test.ts`, `Search.test.ts`, `Easing.test.ts`, `dialog/Overlay.test.ts`. |
| **C19** | `identityColorResolver` | composables: rename, not delete | — | **rename** | published default with real behaviour; the *name* lies, the function is not vacuous. FLAGGED for a testing seat. |

---

## 4 · THE RENAME LEDGER — module-name stripping, consolidated

**The rule, one convention:** a non-anchor file strips every ancestor name-token (kebab/snake/camel/dot). **Anchors do not strip** — the root SFC is `PascalCase(dir)`; `<module>/index.{ts,css}` is the only module root. Export **identifiers are unchanged** throughout; barrels keep `export { default as GlassDock } from "./Dock.vue"`. Zero public-surface delta from renaming.

**Anchors (R1 beats the mechanical strip — SAND's strip yields `dock/Glass.vue`, a third convention):**
`dock/GlassDock.vue → Dock.vue` · `timeline/GlassTimeline.vue → Timeline.vue` · `tabs/SegmentedTabs.vue → Tabs.vue` · `typewriter/TypewriterText.vue → Typewriter.vue` · `search/SearchBar.vue → Search.vue` · `easing/EasingConfigurator.vue → Easing.vue` · `easing/EasingPicker.vue → Picker.vue` · `dialog/ModalOverlay.vue → Overlay.vue`. 55/63 roots already conform.

**`src/components` — 176 strips / 62 anchors / 241 already clean** over 479 files (`adj-strip.mjs`). Representative, exhaustive by class:

| class | renames |
|---|---|
| `_shared` | `disclosure/disclosure-context.ts→disclosure-context.ts` · `field/{fieldControl,valueDomain,field-control.css,field-surfaces.css}→{field-control.ts,value-domain.ts,field-control.css,field-surfaces.css}` · `feedback/feedback-tone.css→feedback.css` · `menu/menu.css→menu-row.css` · `resolveSurfaceClass.ts→resolve-surface-class.ts` · `useMotionAxis.ts→motion-axis.ts` |
| aurora dir-dissolve | `composables/{useAurora,useCursorInteraction,auroraFallbackGround,auroraImageSource,frameLoop,runtime,color,atoms,atoms-fields}→{use,cursor,fallback-ground,image-source,frame-loop,runtime,color,atoms,atoms-fields}.ts` · `{glSetup,uniformBridge,textureUpload}→gl/{setup,uniforms,texture}.ts` · `{wgpuSetup,uniformBridgeWGPU,uniformBridgeWGPUImage}→wgpu/{setup,uniforms,uniforms-image}.ts` · `constants/{presets,renderMode}→{presets,render-mode}.ts` · `constants/shaders/aurora{.frag,.vert,.wgsl}→shaders/{frag,vert,wgsl}.ts` · `aurora-{image.frag,image.wgsl,mediums.wgsl}→shaders/{image-frag,image-wgsl,mediums-wgsl}.ts` |
| blob | `composables/{blobSimulation,satelliteKinematics,useBlobMood,useBlobPointer,useBlobSatellites,easing}→{simulation,kinematics,mood,pointer,satellites,easing}.ts` · `{buildMetaballProgram,uploadBlobUniforms,useMetaballRenderer}→gl/{program,upload,renderer}.ts` · `{wgpuSetup,uniformBridgeWGPU}→wgpu/{setup,uniforms}.ts` |
| fourier-field | `composables/{fourierFieldGLSetup,fourierFieldWGPUSetup,useFourierField,uniformBridgeWGPU}→{gl,wgpu,use,uniforms}.ts` · `shaders/fourier-field.{glsl,compute.wgsl,render.wgsl,ribbon}→shaders/{glsl,compute-wgsl,render-wgsl,ribbon}.ts` |
| constellation | `constellation{Field,Interaction,Render,Types,Well}.ts→{field,interaction,render,types,well}.ts` · `composables/useConstellation.ts→use.ts` |
| contexts (12 files, 5 shapes → **one**) | `X/context.ts` at module root (already the plurality); `<qualifier>-context.ts` where a module owns >1. `command/dialogContext` `dialog/dialogStageContext` `popover/popoverContext` `toggle-group/toggleGroupContext` → `X/context.ts`; `dock/composables/dock{Crossfade,Rail}Context→dock/{crossfade,rail}-context.ts`; `dock/composables/dockContext→_shared/dock-context.ts`; `drawer/composables/drawerSnapContext`→merged into `drawer/snap.ts` |
| the rest | `chipVariants→variants` · `searchVariants→variants` · `coalesce-metric→coalesce` · `use-toast→use` · `useCarousel→use` · `useConfiguratorState→use-state` · `useMenuTrigger→menu` · `pagerWindow→window` · `dark-mode-toggle/dark-mode-toggle.css→styles.css` · `dialog/placement.css→styles.css` · `card/card-scroll.css→scroll.css` **[ordinal preserved — the fold was refused: `index.css:185` and `:193` are 5 rungs apart]** · `dock/styles/dock.css→shell-core.css` · `data-table/composables/useDataTable{Responsive,RowIdentity}→{responsive,row-identity}.ts` · `tabs/composables/useTab{DragMorph,Responsive}→{drag-morph,responsive}.ts` · `sortable-list/composables/{useSortable→use.ts; dragController,dropResolver,ghostRenderer,touchGate,transitionTiming,types→drag/{controller,drop,ghost,touch,timing,types}.ts}` · `search/composables/{useFuzzySearch,fuzzySearchIndex}→{fuzzy,fuzzy-index}.ts` · `typewriter/{composables/useTypewriter,utils/{graphemes,keyboard,pausePatterns,timing,typoStateMachine}}→{use,graphemes,keyboard,pauses,timing,typo-state}.ts` · `handmark/composables/useHandMark→use.ts`, `{freehand,geometry,brush}→stroke/`, `{ink,texture,noise}→ink/` · `{completion-seal,easing,fading-scroll,infinite-scroll}/composables/use*.ts→X/use.ts` · `pager-dots/composables/usePagerWorm→worm.ts` |

**`src/composables` — the strip is the merge.** Never strip to a bare `use.ts`; where the literal strip is degenerate the **directory** is the redundancy, and §1 collapses it. Symbols keep their `use` prefix (Vue convention, not repetition).
`context/createContext→context.ts` · `keyboard/useKeyboardShortcuts→keyboard.ts` · `dark/{useGlobalDark,installDarkModeSync,darkModeSyncScript}→dark.ts` (all three strip to `dark` — the collision **is** the finding) · `reactive/{useInterval,useTimer}→reactive.ts` · `glass/{useSpecularTracking,vSpecular,supportsBackdropRefract}→glass.ts` · `glass/canvas2d/useCanvas2D→canvas/canvas2d.ts` · `glass/webgl/{useWebGLCanvas→canvas/webgl.ts, createCanvasLifecycle→canvas/lifecycle.ts, backingSize→↳lifecycle.ts, visibility→canvas/visibility.ts}` · `glass/webgpu/{useWebGPUCanvas→canvas/webgpu.ts, webgpuDevice→canvas/gpu-device.ts, webgpuCanvasTypes→↳webgpu.ts, useGpuSubstrate→canvas/substrate.ts, rendererStatus→canvas/status.ts}` · `motion/core/{motionTempo,asElement,writeVelocityWeight}→element.ts` · `core/useReducedMotion→reduced-motion.ts` · `core/useViewTransition→view-transition.ts` · `core/{useRAFLoop,useIntersectionPause,useYieldToMain}→loop.ts` · `engage/engageEnvelopes→core/presets.ts` · `morph/useElementMorph→morph.ts (+geometry.ts)` · `morph/useDragMorph→drag.ts` · `morph/{useSelectionIndicator,useSelectionGroup}→core/selection.ts` · `morph/useLeadTrail→core/flex.ts` · `number/{useAnimatedNumber,useAnimatedNumberMap}→number.ts` · `pointer/{usePointerVelocityField,useRoutePointer}→core/pointer.ts` · `pointer/pointerFieldMappings→core/field-mappings.ts` · `reveal/{vReveal,useStagger}→core/reveal.ts` · `reveal/useLiquidReveal→morph.ts` · `scroll/{scrollReader,useScrollProgress,useScrollTrigger,supportsCssTimeline}→core/scroll.ts` · `scroll/useScrollChrome→core/chrome.ts` · `spring/{useSpring,useSpringPress}→spring.ts` · `spring/useSpringMount→mount.ts` · `spring/useLiquidPress→press.ts` · `spring/useLiquidFlex→core/flex.ts` · `sidebar/{useSidebarState,useSidebarFollow}→toc/state.ts`, `{useScrollTracker,useScrollTo,useClickDelegate,useLazyLoader}→toc/scroll.ts`, `useTreeIndex→toc/tree.ts`, `types.ts` **deleted**.

**Symbol renames (the dir name was in the export, not only the path):** `useSidebarState→useTocState` · `useSidebarFollow→useTocFollow` · `useTabRovingFocus→useRovingFocus` · `resolveTokenColor`/`resolveCanvasColor→resolveCascadeColor` · `createTokenColorCache→createColorCache` · `defaultBlobColorResolver→identityColorResolver`.

**`src/styles` — the idiom named: `<module>/index.css` is the only module root; `<module>.css` beside `<module>/` is the second convention and is struck.** Six stem collisions resolved **by subtraction** (the 5 sub-roots die; `tokens.ts` leaves the zone).
Repeats-parent: `glass/glass-{atom,capsule,chip}.css→{atom,capsule,chip}.css` · `tokens/scroll-tokens.css→scroll.css`. Repeats-sibling-module: `glass-refract.css→glass/refract.css` · `glass-specular-track.css→glass/specular-track.css`. Carve scars (**the rename IS the merge**): `dark-arm-glass`+`glass-fx`+`glass-deep`→`tokens/material.css` · `property-regs-specular`→`tokens/property.css` · `sizing-config`→`tokens/sizing.css` · `scheme-motion`+`scheme-spring`→`tokens/motion.css` · `ladder-undershadow`→`glass/material.css` · `control-surfaces`→`glass/surfaces.css` · `base-misc`→`utilities.css`. Mis-descriptions: `tokens/color-radius.css` (**0** `--radius-*`; all 28 in `theme/radius.css`) → `tokens/color.css` · `utilities/metal.css` (**zero** `@utility`) → `glass/metal.css`.

**`demo` — 34 detector hits, 23 dissolved by the moves; residue 11:** `shell/AppShell.vue→shell/App.vue` (free once `demo/App.vue` dies) · `shell/useShellNavDock→useNavDock` · `configurator/useConfiguratorOpen→useOpen` · `capture/capture.css→styles.css` · `dock/dock-search.vue→dock/search.vue` **[manifest row id → URL change; also `focal.ts:60 SELF_STAGES_GL`]** · `motion/text-motion.vue→motion/text.vue` **[manifest row id → URL change]** · `data/timeline/Timeline{Continuous,Segmented}Body.vue→{Continuous,Segmented}.vue` · `motion/scroll/Scroll{Choreography,Native,Reader}Body.vue→{Choreography,Native,Reader}.vue` · `substrates/aurora/{AuroraStage→Stage, AuroraConfigDock→ConfigDock, sections/Aurora{Color,Composition,Motion}Section→{Color,Composition,Motion}Panel, config/{Flow,Texture,Nuclei}Layer→{Flow,Texture,Nuclei}Panel}` · **`config/CompositionLayer.vue→WarpPanel.vue`** (mis-name corrected — mounted under `label="Warp & noise"`, `AuroraConfigDock.vue:282-283`; the real composition panel is `sections/AuroraCompositionSection.vue` at `:274`) · `chassis/code/hljs-house-theme.css→chassis/code-theme.css` · camel→kebab: `storyTile→story-tile` `vizPreviewStill→viz-preview-still` `virtualSectionLayout→virtual-section` `routeTransition→routing/transition`.
**NOT renamed:** `chassis/` → `story/` **OVERRULED** — edict 3 is path-based; `demo/chassis/` contains no `story` token, so the `Story*` prefix adds information. Cost 249 specifier edits for `chassis/Section.vue`, one keystroke from native `<section>`. **BLOCKED:** `data/data-table.vue` — `data/table.vue` already exists and is a different story.

**`tests` — three classes.** (A) **suffix strip, 44 files:** `.contract.` discriminates on 4 of 40 carriers, and those 4's siblings move into leaf dirs anyway → discriminates on **zero**. `*.contract.test.ts → *.test.ts`; `*.spec.ts → *.test.ts`. (B) `.public-contracts.` → `.test-d.ts` (7 files) — the extension already says it. (C) **8 renames the tests tree owns:** `custom/tabs/segmented-tabs→tabs/Tabs.test.ts` · `custom/blob/resolveColor→composables/color/resolve` · `custom/blob/blob-color-equivalence→composables/color/equivalence` · `custom/blob/metaball-color.glsl-port.ts→composables/color/equivalence/glsl-port.ts` · `styles/tokenGraphDetector.ts→invariants/token-graph/detector.ts` · `governance/governedInvariant.ts→_support/invariant.ts` · `utils/mountComposable.ts→_support/mount-composable.ts` · `custom/dropdown-menu/DropdownMenuTrigger.action→dropdown-menu/DropdownMenuTrigger`.
**Case is NOT a defect.** 38 PascalCase vs 171 lowercase — PascalCase mirrors a `.vue`, kebab mirrors a `.ts`. The discriminator is the src twin's extension; "pick one" is **OVERRULED**.
**`tests-visual` — 41 strips**, all safe (no src twin): `dock-morph-family→components/dock/morph-family`, `blob-render→components/blob/render`, `aurora-vibrancy→components/aurora/vibrancy`, `constellation-warp-live→components/constellation/warp-live`, `glass-cohesion→styles/glass/cohesion`, … Plus: **`w1-radius-redress.webkit.spec.ts` / `w2-blur-redress.webkit.spec.ts` — strip `.webkit.`**; `playwright.config.ts:127` scopes the webkit project to exactly 3 other files, so these two **run on chromium**. A filename asserting an engine it never sees does not ship.

---

## 5 · TEST DISPLACEMENT LEDGER

### 5a · Files leaving `src/` — **ZERO. Nothing is owed.**

```
$ find src demo -type f \( -name '*.test.*' -o -name '*.spec.*' -o -path '*__tests__*' -o -name '*.bench.*' \)   → empty
$ grep -rlE "from ['\"](vitest|@jest|jest|@testing-library)" src demo                                            → empty
```
All five seats ran this independently; all five agree. **Edict 4 has no violation in the displacement direction anywhere in the repo.**

**But six `__tests__/` citations survive in shipped library prose** (a convention abolished at AV.W14, still in `dist`-bound comments): `src/composables/glass/procedural/color.glsl.ts:39,41` · `src/components/blob/shaders/metaball.frag.ts:22,23,61` · `tests/.../metaball-color.glsl-port.ts:10`. Repoint all six to `tests/composables/color/equivalence.test.ts` + `…/equivalence/glsl-port.ts`.

### 5b · The isomorphism is broken in the **other** direction — five defects

| defect | count | mechanical fix |
|---|---:|---|
| **the fossil path** — `tests/components/{ui,custom}/` casts a taxonomy `9a8761f0` demolished (`git show 9a8761f0 --name-status --find-renames \| grep '^R' \| grep -c tests/` → **0**; it repointed 57 test files' imports and renamed none) | **84 files, 28 dirs** | `tests/components/{ui,custom}/<X>/*` → `tests/components/<X>/*`. `comm -12` on the two listings → **empty**; zero collisions |
| **invented buckets** — `gates/ governance/ utils/ styles/ a11y/` | 22 files | → `tests/invariants/` (17: the tree-walkers + cross-module sweeps) and `tests/_support/` (5). `tests/governance/` is the sharpest: **all three of its files are non-tests** |
| **path disagrees with the graph** | 11 | `custom/timeline/timeline-event-choices`→`tests/demo/stories/data/timeline` (zero `src/` imports) · `dialog.confirm-preset`→`tests/demo/stories/feedback/confirm-dialog` (3 demo stories, zero `src/`) · `composables/sortable/drag-ring-radius`→`components/sortable-list/composables/use` (`src/composables/sortable/` does not exist) · `custom/blob/resolveColor`→`composables/color/resolve` · `custom/blob/blob-color-equivalence`→`composables/color/equivalence` · `utils/cn`→`components/_shared/class-names` · `menuRowClass.spec`→`components/select/row-class` · `ui/slider/dock-hold-contract`→`components/_shared/dock-context` · `ui/_shared/useMotionAxis`→`components/_shared/motion-axis` · `configurator-recursion.spec`→merged into `components/configurator/Configurator` · `styles/{track-well-fold,typed-track-seam}`→`styles/glass/track-well` |
| **duplicate subject** | 4 pairs | `useTokenColor.test.ts` + `dom/useTokenColor.test.ts` **both import the same module** (the only duplicate basename in the tree) → merge · `router.test` + `router-field-ownership.test` (both `demo/router.ts`) → merge · `reflect-medium` + `reflect-medium2` → merge · `slider.contract` + `ui/slider/Slider.marks` (both barrel-only) → merge |
| **13 flat files at `tests/composables/`** whose sources are 2–3 levels deep, against 15 correctly-nested siblings; **4 barrel-addressed tests that cannot name their referent** | 17 | re-point each at its settled leaf |

### 5c · The governing rule — three clauses

1. `src/<p>/<f>.{ts,vue}` → `tests/<p>/<f>.test.ts`. Exact name, exact path.
2. A test whose subject is the module **barrel** mirrors `index.ts` as the **stem file** beside the mirror dir: `tests/components/accordion.test.ts` ≡ `src/components/accordion/index.ts`. Repo idiom, measured: **12 file+directory stem-sharing pairs** in `src/`+`demo/`. Discriminator: `grep -ohE "@glass/components/[a-z-]+$"` — run on the 7 disputed `ui/*/X.test.ts`, **all seven import the barrel alone**; nine single-file dirs evaporate without a judgement call.
3. A test that sweeps **N unrelated modules** to assert a repo-wide rule is an **INVARIANT**, not a mirror → flat in `tests/invariants/`. Measured: `tests/gates/*` carry 8 tree-walk sites; `tests/styles/*` carry zero but read **46 pinned `src/…` literals across 20 files**; `public-surface.spec.ts` imports 37 src modules.

Suffix: `.test.ts` + `.test-d.ts`, nothing else. Case follows the src twin.

**The tests zone has no independent granularity.** Every goldilocks complaint against `tests/composables/motion/` is a complaint against `src/composables/motion/` — the tests tree mirrors whatever src settles. `tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` is **already a perfect mirror**; collapsing it would *manufacture* the break it was hired to find.

### 5d · Non-test `.ts` under `tests/`

Serving many → `_support/`. Serving exactly one → the **stem directory** of that test.
`styles/tokenGraphDetector.ts` (353 L, 1 consumer) → `invariants/token-graph/detector.ts` · `custom/blob/metaball-color.glsl-port.ts` (367 L, 1 consumer, **named from shipped `src/` prose at 3 sites**) → `composables/color/equivalence/glsl-port.ts` · `governance/fixtures/captureEventMethod.ts` (8 L) → **inlined**. Inlining the first two yields 791- and 823-line files — larger than the god-file being split. **OVERRULED.**

### 5e · `tests-visual/` — the real god-directory

176 specs, **43,790 LOC, one flat directory**, 40% larger than `tests/`. The proof it is a bag: the helpers are re-declared per file — `setDark` ×56, `setScheme` ×24, `grab` ×20, `parseColor` ×12, `setMode` ×11, `gammaEncode` ×10, `relLuminance`/`contrastRatio` ×7, `oklabToRgba`/`linearize` ×6. **A colorimetry library copy-pasted 5–10 ways across a suite whose entire job is measuring colour.** 108 of 176 redeclare `ROOT`/`OUT`/`EVIDENCE_DIR`.
The **workspace root survives** (`playwright` + `pngjs` are not root deps; folding into `tests/` drags Playwright onto a `files:["dist"]` library). The **flat interior is not config-pinned** — `node_modules/playwright/lib/util.js:129` auto-prefixes `**/`, so nesting costs zero config change.
Grouping is **measured**, not asserted: matching spec stems against the 63 component names → dock 12, blob 9, aurora 8, constellation 5, then 1×18 others; **only 56 of 176 name a component**. Four component dirs; the other 24 stay flat files under clause 2 (20 single-file dirs is the sand this settlement strikes elsewhere). The 120 unmatched → `styles/{glass,scheme}/`, `motion/`, `demo/`, `gates/`, `engine/webkit/`.
**Output paths: 157 literals across ELEVEN dead tranche letters** (BC 30 · BA 24 · BB 21 · AZ 21 · AY 19 · BI 13 · BJ 12 · BG 10 · AX 4 · IOS 2 · BD 1) → **one `PI_OUT` env-defaulted constant in `_support/paths.ts`**. Two specs use a **bare-relative** path (`w38-w47-verify.spec.ts:92,97`, `_veil-capture.spec.ts:8`) and have manufactured an untracked `tests-visual/docs/tranches/AX/audit/screens/` tree — the repo's deepest non-`docs` path.

---

## 6 · DELETIONS — vacuity or superfluity only

**Consumer count is never a ground.** The 42 zero-consumer components are explicitly **NOT deleted**; `constellation` (25 props / 0 consumers / 2,442 lines) is D4's ruling, not D3's.

### 6a · `src/components`

| deleted | ground | evidence |
|---|---|---|
| `paper-backdrop/` — 3 files, 1 dir, 1 subpath, 1 barrel row, 1 contract test | **SUPERFLUITY** | `PaperBackdrop.vue` is 18 lines; its entire body is `<div class="paper-underpaint" data-slot aria-hidden />`. `paper-underpaint` is `@utility` at `src/styles/paper.css:99`, shipped on `./styles`. Its own demo blurb (`paper-texture.vue:27`) concedes it: *"mounts the library paper-underpaint recipe once"* |
| `PROCEDURAL-SUITE.md` + 25 README/DESIGN.md — 2,411 lines | **VACUITY as shipped artefact** | `package.json.files = ["dist"]`; nothing under `src/` reaches a consumer; 42% coverage (26/62), 11→551 lines; a third doc channel, neither published nor complete |
| `_shared/index.ts` | **SUPERFLUITY** | 2 lines re-exporting 2 symbols from 1 of 10 modules; **one** consumer (`src/forms.ts:24`). The other 143/42/28/20 importers deep-path correctly. The barrel lies |
| `dock/composables/index.ts` | **DUAL PATH** | `dock/index.ts` reaches it **both** ways — `:40,:87,:88` via `./composables`, and directly via `./composables/{useDockShellProps,dockCrossfadeContext,dockContext}` |
| `search/composables/index.ts`, `infinite-scroll/composables/index.ts` | **SUPERFLUITY** | 5 and 2 lines into a dir that already has `../index.ts` |
| `dock/styles/controls.css` **as a file** | **SUPERFLUITY** | 90 lines = 4 `@import` + 3 rules. Its header documents partials at `dock-controls/`; `ls src/components/dock/styles/dock-controls` → **No such file or directory** |
| the 4 tombstone comments in `components/index.ts` | **VACUITY** | `hover-card`, `multi-select`, `sheet`, `ui/Tabs` — retired components documented in a live barrel |
| `aurora/composables/configSource.ts` (19 L) · `blob/composables/resolveBlobSurface.ts` (11 L) | **SUPERFLUITY** | one export, one consumer, no seam |
| `blob/config.ts:15-37` (not the file) | **DUPLICATION** | verbatim duplicate of `blob/index.ts:2-26`; `index.ts` becomes `export * from "./config"` |
| 3 barrel import **cycles** | — | `alert/Alert.vue:4`, `badge/Badge.vue:3`, `drawer/Drawer.vue:4` (+`drawer/constants.ts`) each import their own `./index` |

### 6b · `src/composables`

| deleted | lines | ground |
|---|---:|---|
| **5 private `prefersReducedMotion()`** (`core/useViewTransition.ts:83`, `morph/useElementMorph.ts:91` **exported**, `morph/useDragMorph.ts:125`, `morph/useSelectionIndicator.ts:205`, `dom/useDragVelocity.ts:67`) | ~35 | **SUPERFLUITY, proven.** `core/useReducedMotion.ts:50` **already exports `readReducedMotion()`** — identical semantics, published on `/motion-core`, pinned by `public-surface.spec.ts:314`, already consumed at `_shared/useMotionAxis.ts:41` + `constellation/…/useConstellation.ts:14`. The `useElementMorph` copy is a **second public name** for a shipped export. The `useSelectionIndicator:205` copy is additionally **defective** — it omits the `typeof window.matchMedia === "function"` guard its four siblings carry |
| **6 `clamp01`** (+3 more in `src/components` → 9 total) | ~24 | **SUPERFLUITY.** Byte-identical clamps; one `motion/core/math.ts` serves all nine |
| `sidebar/types.ts` | 120 | **VACUITY as a module.** A manifest, not a module — and the dir contradicts itself: 4 members export options here while `useSidebarFollow.ts:12` and `useSidebarState.ts:19` declare theirs inline. Two conventions, one directory |
| `watercolor-dot/prng.ts:7` re-export | 1 | **A legacy shim, forbidden**, and it says so: *"Re-exported so the existing named surface … is byte-identical."* File becomes `watercolor-dot/radii.ts` |
| 6 barrels: `context/index` (7) `keyboard/index` (5) `reactive/index` (3) `dark/index` (21) `glass/index` (45) `glass/canvas2d/index` (16) | 97 | **VACUITY.** A barrel over a module that has become one file re-exports itself; every `from ".../<name>"` specifier resolves byte-identically against `<name>.ts` |
| the 5 `tokens.ts` chart exports (`chartHeights`, `chartMargin`, `chartColors`, `minWidthInputSm`, `motionStagger`) | 54 | **SUPERFLUITY.** 0 consumers **and** `grep echarts package.json` → nothing. Chart config for a chart library that is not a dependency, peer or otherwise |
| 12 emptied dirs | — | consequence |

### 6c · `src/styles` — ~500 code lines struck before any restructuring; comment ratio 62.5% → ~30%

| deleted | size | ground |
|---|---|---|
| `glass/liquid-enter.css` | 126 code / 238 | **VACUITY.** `grep -rn "liquid-enter\|\bis-cel\b" src demo tests scripts \| grep -v '^src/styles/'` → **0**. Header calls it *"The UNIVERSAL `.liquid-enter` mount recipe"* |
| `draw-in.css` | 39 / 85 | **VACUITY.** `.draw-rule`, `[data-draw-in]`, 2 keyframes → **0**. `index.css:245` names three consumers; none references it |
| `transitions.css` | 85 / 155 | **SUPERFLUITY.** `pane-swap`/`metric-swap`/`dock-in` → 0 (the header's *"pane-swap (below, live dock consumer)"* is false); `fade`/`tab-fade` applied **only** by `demo/stories/foundations/motion.vue:132`, the story cataloguing this file. The file states its own replacement: *"their overlay/menu entrances now ride the ONE `.glass-reveal` recipe"* |
| **11 `--animate-*` aliases** in `theme/literals.css` | 11 | **VACUITY.** `{tooltip-in,fade-in,scale-in,slide-up,dock-in,shimmer,shimmer-sweep,gold-shimmer,metal,shake,floating-panel-in}` — each **0** consumers |
| **7 of 14 keyframes** in `animations.css` | | **VACUITY.** `tooltip-in`, `fade-in`, `scale-in`, `slide-up`, `shimmer-sweep`, `shake` never named by any `animation:`; `dock-in`'s sole animator is `transitions.css:83`, deleted above |
| `.glass-opaque` + `.glass-over-text` | | **VACUITY, dead by its own documentation.** Declared once (`glass/ladder-undershadow.css`), zero applications; its only two `src` mentions are comments at `DialogContent.vue:241` and `GlassTimeline.vue:206` reading *"NOT a `.glass-opaque`"* |
| `.glass-well` + `--glass-well-tone` | | **VACUITY.** 0 applications (the `[data-surface]`/`[data-grain]` axis in the same file has 18 consumers and stays) |
| `.liquid-stage` | | **VACUITY.** 0; struck from `:where(.glass-drawer, .liquid-stage)` as it relocates |
| **30 more dead classes** (37 of 137 total; 8 are test-pinned only) | | **VACUITY.** `hover-lift-{md,lg}` `shadow-cartoon-lg` `divider-h{,-tapered}` `depth-text` `preserve-3d` `ios` `deferred-section--cached` `text-pane-title` `section-label--tinted` `text-engraved` `metal-silver-border` (its `gold`/`bronze` siblings are live — asymmetry within one family is oversight) `section-description` `hairline-accent` `scroll-{cascade,reveal}--inline` `scroll-chrome--native` |
| **133 lines of carve apologetics + 165 dangling `§` refs + 5 tombstones** | | **VACUITY.** The 500-line bound they defend **does not exist**: `grep -rl "no-god-module\|500-line" src/styles` → 26 files, 80 citations; `grep -rn` over `tests scripts vite*.ts package.json` → **one hit, a comment**. `§15` is referenced and does not exist. Stale refs to `tokens/offsets-sizing.css`, `glass/progress-rail.css`, `cards.css` — files that never existed or no longer do |
| **the 54 `dark-arm` colour twins + the DA1 lockstep gate** | | **DUAL PATH.** 114 decls, 54 twinned, **0 divergent**. A gate whose only job is to hold duplication up. **Law 6 — I do not prescribe which arm survives:** the two arms serve two *triggers* (OS `prefers-color-scheme` vs the `.dark` class), not two engines as the header claims, and **`light-dark()` is forbidden for shadow/inset** (`dark-arm.css:22-28` + the standing inset trap). Cure is a wave with a paired capture |

### 6d · `demo` — 342 LOC + 17 directories

`chassis/code/Code.vue` (75, **zero importers repo-wide**; its docblock claims a unification that never landed) · `shell/configurator/index.ts` (13, zero importers and **forbidden** to have any — `boot-graph.test.ts:348-352` + `gate.boot.source.no-config-barrel` at `:478`) · `shell/configurator/usePresetEditor.ts` (24, six `export … from "./preset-editor/store"` lines; its line 3 says it *"preserves the exact public surface"*) · `demo/App.vue` (7, body is `<AppShell/>`) · `chassis/index.ts` (7 lines re-exporting **one** symbol; 28 files import `ShowcaseFrame.vue` directly) · `composables/virtual/index.ts` (5) · `chassis/hero/category-hero.ts` (70 — a per-category record the `Category` row already is) · `chassis/hero/warm-field.ts` (17 — one export, a three-import one-liner; header: *"This adapter owns no color math"*) · `chassis/landing/CatalogLanding.vue` (91 — the second front door) · **`Story.body?: StoryBody` + its import** (**dead field** — `body:` occurrences inside `CATEGORIES`: **0**; `StoryOptions` has no `body` field so `s()` cannot populate it) · `dock/overview.vue` §"Menus inside a dock teleport out" (26 lines, two `<p>`, **zero specimens** on a specimen page, and it lists `<code>DockTrigger</code>` twice).

### 6e · `tests` / `tests-visual`

`tests-visual/{_capture_css,_cohere-capture,_cohere-debug,_cohere-shadow-debug,_fix-glassui-dark-capture,_prim-polish-capture,_wdelta0-capture}.spec.ts` — **VACUITY, zero assertions** (`for f in *.spec.ts; do [ $(grep -c 'expect(' $f) = 0 ] && echo $f; done` → exactly these 7); the `_` prefix is not an exclusion mechanism, `chromium-headless-new` declares no `testMatch` · `tests-visual/docs/` (untracked, manufactured) · `tests/components/custom/timeline/.bench/` (empty, untracked) · `governance/fixtures/captureEventMethod.ts` as a *file* (8 lines, inlined) · **20 exported symbols from `tests/gates/`** (`grep -rn "from ['\"].*\.test['\"]"` → **0 hits** — this is *why* the analyzers were never lifted out) · `vitest.config.ts:56` `"scripts/**/*.{test,spec}.{ts,tsx}"` (a glob guarding a convention nothing uses).
**NO test in `tests/` is deleted** — nothing there is vacuous. The **22 `.skip` specs** and **~20 wave-scratch specs** in `tests-visual` route to `_harness/` with `testIgnore` pending per-file triage; each is either a live defect-marker or a deletion, and that verdict is not on the file.

---

## 7 · THE ORDER — never unbuildable

| # | step | why this edge |
|---|---|---|
| **0** | **Config preconditions only, nothing moves.** Add `@demo/* → demo/*` to `vite.config.ts`, `vitest.config.ts`, `tsconfig.json:18`. Rule: **any specifier climbing ≥2 levels uses `@demo/`; same-dir and single-parent stay relative** (one convention, not two). | 242 `../../` climbs + 29 raw `../…demo/…` in tests must have a stable target *before* anything moves. `vite.config.ts:14-20` states the rationale verbatim and never built it |
| **1** | **Zero-edge deletions.** Dead CSS files/classes/keyframes, `--animate-*`, carve prose + 165 `§` refs + tombstones, the 26 `.md`, the 4 barrel tombstone comments, `.bench/`, the 7 zero-assertion specs, `tests-visual/docs/`, `vitest.config.ts:56`. **`prm-no-resurrection.test.ts:188` amends in the SAME commit** | no import edge → safe first, and shrinks every downstream step. The gate at `:188` structurally preserves `pane-swap`/`metric-swap`; left alone it converts the `transitions.css` deletion into a false RED |
| **2** | **The shader fold.** `composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` → `aurora/shaders/{flow,wgsl}.ts` | **must precede the rename sweep** — otherwise two `flow.glsl.ts` land one import statement apart (`aurora.frag.ts:30` vs `:32`) |
| **3** | **Pure dual-path barrel strikes** (each ≤1 consumer: repoint, then delete): `_shared/index.ts` · `dock/composables/index.ts` · `search|infinite-scroll/composables/index.ts` · `demo/{chassis,composables/virtual,shell/configurator}/index.ts` · `usePresetEditor.ts` | later steps must not rewrite a barrel that is about to die |
| **4** | **Colocation OUT of `src/composables`** (§2a + §2c): backdrop chain, cta-receive, drag-velocity, accent-tone, blob palette, aurora colour slices, prng, shader colour, scroll-pin/scene + `demo/scroll-pin.css` | these land **before** the composables re-shape, or the re-shape rewrites paths that are about to disappear |
| **5** | **Colocation INTO `src/composables`** (§2b, minus deck): `budget.ts` → `canvas/budget.ts`; `useTabRovingFocus` folds into `motion/core/selection.ts` | **kills the one `composables → components` edge before the re-shape**, so the re-shape never has to model it |
| **6** | **`components/deck/` → `composables/deck/`** + `subpath-policy` class move `COMPONENT_CLASS → CURATED` | the last cross-tier move; done before either tier renames so the `./deck` entry-map edit is a single hop |
| **7** | **Re-shape `src/composables`** — agglomerate, split, rename, dissolve 12 dirs. **Same commit:** `subpath-policy.mjs` ×4, `src/index.ts` (8 deep motion reaches + 2 additions + the stale `sortable/` mention at `:5`), `scripts/regen-spring-tokens.mjs:23,27` | `subpath-policy` is **fail-closed** (`:15-20`, `:200`): a top-level dir with an `index.ts` and no classification exits 1. Five subtrees stop being scanned, two appear — the config must move atomically |
| **8** | **Re-shape `src/styles`** — (a) kill the 5 sub-roots first, (b) agglomerate, (c) evict to components, (d) colocate the 114 tokens, (e) `tokens.ts`+`manifest.ts` → `src/tokens.ts` | (a) first because it is **source-order-identical** (the roots are pure `@import` indirection) and makes every later `@import` edit single-site. Load order is documented in **six** places today; `index.css` becomes the one manifest |
| **9** | **Re-shape `src/components`** — (a) the 12 `parts.ts` folds, (b) dissolve 17 `composables/` + `utils/` + `constants/`, (c) the `_shared` hoists (`dock-context.ts`, `hold.ts`) — **breaks the one graph cycle**, (d) the rename sweep incl. 8 anchors, (e) delete `paper-backdrop/` + subpath row + contract test + demo specimen swap | (a) first because barrels keep identical export identifiers → **zero consumer edits**. Renames last inside the zone so folds/dissolves don't chase moving names |
| **10** | **`demo`** — (a) **the 8-table → `Category` record fold + `CONTEXT_LAYER_MAP` derivation**, (b) `manifest/` fold + `story.ts` split *at `demo/stories/` depth*, (c) the 12 non-routes into satellites, (d) `chassis/` flatten + `routing/` birth, (e) `AppShell.vue` shortcut split + `App.vue` rename, (f) `capture/boot.ts`, (g) the 2 manifest row-id renames | (a) **first, and it is the one user-visible fix**: 7 wrong hues, 3 one-click 404s and a duplicated front door all come from one record living in eight places. (b) the glob keys are `./${cat}/${id}.vue` — `manifest.ts:138-146` records that `./*/*/index.vue` was tried and **reverted because it blanks every flat story**. (e) touches the boot-graph governance `caseIdentity` → same commit |
| **11** | **`tests`** — (a) fossil-path kill (84 files, mechanical), (b) bucket routing → `invariants/` + `_support/`, (c) graph-disagreement moves, (d) merges, (e) splits, (f) suffix/infix strip, (g) mirror every src/demo rename from steps 7–10. **Config literals move with their file:** `vitest.config.ts:35,41`, `scripts/verify-governed-invariants.mjs:19`, `tsconfig.test.json:17` | tests last because every target path is a function of the settled tree. `chip.contract.test.ts` is named **twice** in `vitest.config.ts` (the chip-listener project split) — a rename that misses the config **silently drops it from BOTH projects** |
| **12** | **`tests-visual`** — (a) `_support/{page,color,pixel,scene,paths}.ts` born + ≥190 duplicated helper declarations collapsed, (b) `PI_OUT` replaces 157 output literals, (c) the nesting, (d) `playwright.config.ts:127` + `package.json` scripts + `ci.yml:57,59` | an isolated workspace with zero `src`-path coupling; largest single edit, gates nothing |
| **13** | **Gate redress, owed, born-RED** — `orphan-css-partial` selector-level replacement; `boot-graph` analyzer split; `public-surface` manifest split | `orphan-css-partial.test.ts:296` hard-anchors `useScrollScene.ts` as its dead-module witness and **explicitly rejects re-pointing** in its own comment (*"any nonexistent path is vacuously 'unreachable' — that proves nothing"*). Moving the file removes the last present-but-unimported `src` module — the settlement working. **A gate anchored on a defect cannot survive the defect's cure.** Its `:266` sibling self-describes as *"STANDING GREEN"* — a **file**-level oracle over a **selector**-level problem, certifying GREEN over 250 lines of fully dead CSS. Replacement: *every class declared in `src/styles` is applied by ≥1 `src/` or `demo/` receiver* — **37 of 137 red it today** |

---

## 8 · WHAT BREAKS

### 8a · The 72 export subpaths → **71 keys, 1 renamed, 3 retargeted**

| key | fate | sites |
|---|---|---|
| `./paper-backdrop` | **STRUCK** | `package.json` `exports` **and** `typesVersions`; `subpath-policy.mjs` `COMPONENT_CLASS` row; `public-surface.spec.ts:28,:275`; `tests/components/paper-backdrop.contract.test.ts`; the vite entry map; `demo/.../Texture.vue` specimen swap |
| `./sidebar` → `./toc` | **RENAMED** | `exports` + `typesVersions` + `COMPOSABLE_CLASS` + `CURATED` map; `demo/stories/dock/dock-search.vue:22`; `demo/composables/virtual-section.ts:12` |
| `./deck` | **SAME SPECIFIER, retargeted** `src/components/deck` → `src/composables/deck`; policy row `COMPONENT_CLASS → CURATED` |
| `./tokens` | **retargeted** `src/styles/tokens.ts` → `src/tokens.ts`; one line at `subpath-policy.mjs:124` |
| `./styles/fonts` | **THE TRAP — survives, must not be tidied away.** `fonts.css` has **zero `@import`-ers by design**; it is reachable only as an export key. A "tidy the roots" pass deletes a published entry |
| `./styles/theme` | survives *as a file* — the `theme/` collapse targets exactly `src/styles/theme.css` |
| `./blob-config` | unchanged — `config.ts` stays the entry (C17) |
| `./styles`, `./styles.css` | unchanged |

**`subpath-policy.mjs` — one file, five edits.** It is fail-closed. `COMPOSABLE_CLASS` (`:95-103`) → `{canvas:"PUBLISH", color:"PUBLISH", dom:"PUBLISH", motion:"CURATED", toc:"CURATED", deck:"CURATED"}`; rows for `context`, `dark`, `glass`, `keyboard`, `reactive`, `sidebar` deleted. `CURATED` (`:126-131`) → `dark:"src/composables/dark.ts"`, `keyboard:"src/composables/keyboard.ts"`, `toc:"src/composables/toc/index.ts"`, `deck:"src/composables/deck/index.ts"`. `COMPOSABLE_SUBPATHS` (`:146-152`) → `reactive:"src/composables/reactive.ts"`, `canvas:"src/composables/canvas/index.ts"`; **the `// name "canvas" ≠ leaf "canvas2d"` apology at `:150` is DELETED, not relocated — that is the point of the move.** Bare-file-subpath precedent already exists at `:151`. `dirsWithIndex()` (`:186`) reads top-level dirs with an `index.ts` only, so `glass/webgl` was never classified and needs no row.

### 8b · Public symbol delta — no aliases, no shims, no dual paths

**Deleted (breaking, allowed):** `useDragVelocity` off `/dom` → `/slider` · `resolveTokenColor` off `/dom` + `resolveCanvasColor` off `/canvas` → **one** `resolveCascadeColor` on `/dom` + root (the surviving probe-span form; the inline-style form at `useResolveTokenColor.ts:50` early-returns on `!css.includes("var(")` and **silently fails on a bare `light-dark()`** — the exact class the other was written for) · `useAccentTone` + `accentToneSolve` off `/color` → `/chip` · `deriveBlobPalette` off `/color` → `./blob` · `useDockCtaReceive` off `/motion` (the `public-surface.spec.ts:451` DOCK row survives; the "`/motion` export STAYS — a re-export" note **is** the dual path being struck) · `createTokenColorCache`, `defaultBlobColorResolver` (renamed).
**Added:** `SPRING_PRESETS`/`springPreset`/`ENGAGE_ENVELOPES`/`engageEnvelope` gain `/motion-core` — engine-FREE data published **only** on the keyframes-bearing `/motion` today (`motion/index.ts:61`), so a consumer reading the spring table pays the whole engine walk · `springProjection`/`springSettleDurationSeconds` gain `/motion` (shipped-but-unexported today).
**Unchanged, against a seat's proposal:** `useScrollChrome`, `useSelectionGroup` (C1/C2) — both stay on `/motion-core`.
**Zero delta:** `useGlassBackdropLuminance` + its 3 leaves — `glass` is bucket `INTERNAL` (`subpath-policy.mjs:103`).
**Component export identifiers: UNCHANGED.** `GlassDock`, `GlassTimeline`, `SegmentedTabs`, `TypewriterText`, `SearchBar`, `PaperBackdrop`(deleted) — every file rename is internal; barrels keep `export { default as GlassDock } from "./Dock.vue"`. Renaming the *symbols* is a separate, larger break and is not this dimension's.

### 8c · The root barrel

`src/index.ts`: the **8 deep `./composables/motion/**` reaches** (`:176 :181 :193 :206 :219 :231 :253 :272`) collapse to `./composables/motion/core/*`; `./composables/canvas` added (carrying `useCanvas2D`/`useCanvasLifecycle`, formerly re-exported by `glass/index.ts`); `./composables/dom` carries `resolveCascadeColor`; the stale `sortable/` sub-tree mention at `:5` is struck (a phantom — `src/composables/sortable/` does not exist, and `tests/composables/sortable/` mirrors it). **The root-barrel symbol set is otherwise unchanged**, so its keyframes-free + vueuse-free discipline holds. `./composables/{reactive,glass}` (`:161,:163`) still resolve — a collapsed dir and a file are the same specifier. `src/components/index.ts` loses 4 comments, no export rows.

### 8d · CSS reachability — **FIVE mechanisms**, and the gate models two

| # | mechanism | reach | risk |
|---|---|---|---|
| 1 | `@import` closure from `src/styles/{index,glass}.css` + `demo/demo.css` | 20 component files | modelled (`orphan-css-partial.test.ts:105`) |
| 2 | SFC `<style src=` | **18–19 sites, all in `src`, ZERO in `demo`** | modelled (`:183`) |
| 3 | JS `import "./x.css"` — incl. **dynamic** `await import()` | `demo/main.ts:112` → `capture/capture.css`; `AppShell.vue:44` → `dock-nav.css`; `CodeBlock.vue:14` → hljs theme | partially modelled (`:185`) |
| 4 | **`new URL("./x.css", import.meta.url).href` + runtime `<link>` swap** | `demo/shell/configurator/presets/manifest.ts:25` → `neutral.css` | **build-silent, runtime-fatal** — orphaned the moment the user picks Neutral |
| 5 | **export subpath with no importer at all** | `src/styles/fonts.css` | **the trap for this refinement** |

Channels 1 and 2 are a **strict partition — zero overlap**. Every moved sheet keeps its `@import` ordinal: `glass-chip.css`→`chip/styles.css` rewrites in place at `glass.css:92` (precedent `:64`); `card-scroll.css`→`card/scroll.css` is **rename only** (the fold was refused — `index.css:185`/`:193` are five rungs apart with transitions/animations/viz-reveal/scroll-driven/scroll-choreography between); `dialog/placement.css`→`styles.css` at `:225`; `dark-mode-toggle` at `:181`; `dock/styles/controls.css` folds into `dock/styles/index.css`'s import tail and `src/styles/index.css` drops `:184` (`:183/:184` adjacent, same `@layer components` → source order identical); `tabs/styles/` gains an `index.css` root and `:212,:217` collapse to one at `:212`'s ordinal.
**The 20 component partials leave `index.css` for the `<style src=` channel the other 18 SFCs already use** — adding a component must not mean editing the shared cascade root.
**Gated on a paired capture, not shipped on a directory ruling:** the `.dropdown-menu-content`/`.dropdown-sub-content` move crosses a layered (`menu.css` `@layer` count 1) → unlayered (`dropdown-menu/styles.css` count 0) boundary. The two blocks are currently **property-disjoint** (font/padding/glass-rungs/box-shadow vs z-index/min-width/overflow/border/radius/color) so nothing mis-cascades today — a **hazard, not a live defect**.
**Also gated:** the 54 `dark-arm` twins (§6c) — the surviving arm is a wave decision with a hard constraint.

### 8e · Demo

**268 `chassis`/`stories` specifiers**, all mechanical. **The five load-bearing hazards, by blast radius:**
1. **The story glob** (`manifest.ts:147`, `lazy.ts:19`) — path-relative, keys `./${cat}/${id}.vue`. Every manifest fragment stays at `demo/stories/` depth. The `.tile.vue` glob at `:158` has the same constraint: **the four `.tile.vue` files cannot move into sub-directories** — the named exception to the satellite rule.
2. **The boot-diet gate** — `boot-graph.test.ts` hard-codes `demo/shell/AppShell.vue` at 15 line numbers and `demo/chassis/hero/aurora-hero.ts` at 3, and its `governedInvariant:478` carries a `caseIdentity` keyed on three eager-shell path strings. `AppShell.vue → App.vue` **touches the governance record**. Two things must not move: the `defineAsyncComponent(Aurora)` binding + `loadingComponent` + eager `auroraFallbackGround` call stay **inside** `App.vue` (`:214-328`); `useConfiguratorOpen` stays a **standalone leaf** (`:348-352` requires the leaf specifier precisely so the eager sidebar doesn't drag persistence + css-writers + stylesheet-swap + `@glass/composables/dark`).
3. **`useShellNavDock.ts:74-77`** — with `CONTEXT_LAYER_MAP.entries` derived from the manifest, **three facet chips stop 404-ing**. The one user-visible fix.
4. **Two URL changes** — `dock/dock-search → dock/search`, `motion/text-motion → motion/text`; both also appear in `dock-layer-contexts.ts` and `focal.ts:60` (`SELF_STAGES_GL`).
5. **34 distinct hard-coded demo path strings in `tests`/`tests-visual`/`scripts`** — the three `readFileSync` source-regex gates fail **loud** on a missing path but **silent-green on a surviving-but-renamed selector**.

**`src → demo`: zero import edges.** `grep -rn "demo/" src` → 10 hits, **all comments**. Three are stale and must be struck regardless: `src/styles/tokens/scroll-tokens.css:34` → `demo/stories/story-hero.css` (actual `demo/chassis/hero/story-hero.css`) · `src/components/fourier-field/constants.ts:6` → `demo/stories/substrates/presets.ts` (actual `…/substrates/aurora/presets.ts`) · **`src/components/drawer/styles.css:350`** claims *"`demo/App.vue` mounts `[data-stage-wrapper]`"* — `grep -rn 'data-stage-wrapper' demo` → **nothing**, so `Drawer.vue:168` / `Dialog.vue:28` `closest("[data-stage-wrapper]")` resolves `null` on all 87 routes. Localised, routed — not prescribed here.
**Three files cite `CLAUDE.md`** (hard-deleted 2026-07-13): `shell/SidebarDock.vue:92`, `configurator/useConfiguratorOpen.ts:7`, `substrates/blob.vue:276`. **Strike, do not re-point.**

### 8f · Build & scripts

`vite.style-fold.ts:104` `cpSync`s `src/styles/` → `dist/styles/` wholesale → intra-zone CSS moves are free. Two literals are not: `vite.utility-emit.ts:74` `resolve(root,"src/styles/theme.css")` (survives by design) and `:177` `resolve(root,"src/styles")` (directory, survives). **22 distinct `src/styles/` path literals across 20 files** — `scripts/lib/{subpath-policy,minify-css}.mjs`, `scripts/regen-spring-tokens.mjs`, `vite.{style-fold,utility-emit}.ts`, `tests/gates/{orphan-css-partial,token-hygiene}`, all 9 of `tests/styles/`, plus 5 component/composable tests. **That coupling is itself an argument for the fold: 74 shards mint 22 brittle literals; 21 files mint far fewer.** `scripts/regen-spring-tokens.mjs:23,27` repoint to `motion/core/presets.ts` + `motion/projection.ts`; both must stay `vue`-free (Node type-stripping) and the string-form `fileURLToPath` idiom at `:33` must survive verbatim.
**9 raw `../../src/…` relatives** survive the BH.B2.0 codemod (8 in `styles/token-graph.test.ts:22-29`, 1 in `blob-color-equivalence.test.ts:32`) — both files move; convert to `@glass/` at the same time.
**46 unique hard-coded `"src/…"` literals across 20 test files** read via `readFileSync(join(process.cwd(), rel))`. These break on a **`src/` move**, and they fail **loud** (ENOENT). A hand-maintained path manifest is not a gate — flagged.

### 8g · Published type surface

`exports` carries `types` per key (verified: `./deck`, `./sidebar`, `./tokens`, `./paper-backdrop`, `.` all have `{"types":…,"import":…}`), so node16/nodenext resolution is structurally sound; the emptiness is a `dist/*.d.ts` **emission** matter, out of D3's scope. **Do not make it worse:** under `node16` resolution `typesVersions` is **ignored**, so every key this settlement touches must be edited in **both** maps *and* the vite entry map *and* the `subpath-policy` row — four sites, atomically. Specifically: strike `./paper-backdrop` from `exports` + `typesVersions`; rename `./sidebar` → `./toc` in both; retarget `./deck` and `./tokens` in the entry map only (keys and `types` filenames unchanged). A key present in `typesVersions` but absent from `exports.types` yields `any` for every node16 consumer.

### 8h · The `parts.ts` Vue-level risk — named, not prescribed away

`defineOptions({name})` → the function's `displayName`; `inheritAttrs:false` → `Comp.inheritAttrs = false`; `defineSlots<{default?: () => unknown}>` → the slots type parameter; attrs through `fixedHostAttrs()` (`_shared/primitive.ts:26`), emits forwarded from `ctx.emit`. `findComponent('<string>')` appears in exactly **2** test files (`select.contract`, `popover.contract`) — **neither targets a folded part**. **29** test files assert `data-slot`, which the factory must keep emitting. Contract tests mount by import, not by filename, so they survive. **No folded part carries a `<style>` block** (verified). `grep` for `h(`/`defineComponent` in `src/components` → **zero** today; the precedent is `demo/` only. Sustained on the narrow ground that **a `.vue` with no template logic, no reactivity, no emit body and no `<style>` block is a more expensive spelling of `h()`** — not as a general authoring convention.

---

## 9 · FILE-COUNT LEDGER

| zone | files now | files target | Δ | dirs now | dirs target | Δ |
|---|---:|---:|---:|---:|---:|---:|
| `src/` root `.ts` | 3 | 4 | **+1** | — | — | — |
| `src/components` | 505 | ~426 | −79 | 94 | ~76 | −18 |
| `src/composables` | 103 | 56 | −47 | 23 | 8 | −15 |
| `src/styles` | 76 | 21 | −55 | 6 | 3 | −3 |
| **`src` total** | **694** | **~507** | **−187** | **127** | **~88** | **−39** |
| `demo` | 196 | ~192 | −4 | 40 | ~36 | −4 |
| `tests` | 217 | ~196 | −21 | 53 | ~50 | −3 |
| `tests-visual` | 223 | ~209 | −14 | 11 | **~20** | **+9** |
| `scripts` | 14 | 14 | 0 | 2 | 2 | 0 |
| **REPO** | **1,344** | **~1,118** | **−226** | **233** | **~196** | **−37** |

### Structural invariants moved to zero

| | now | target |
|---|---:|---:|
| `src/components/*/composables/` dirs | 18 | **1** (`dock`, 16 members) |
| `.md` files in `src/` | 28 | **0** |
| max path depth in `src` | 6 | **5** |
| barrel import cycles | 3 | **0** |
| component-graph cycles | **1** (`dock → dropdown-menu → dock`) | **0** |
| `src/composables → src/components` edges | 1 | **0** |
| `<dir>.css` beside `<dir>/` stem collisions | 6 | **0** |
| entry roots in `src/styles` / hand-ordered `@import` | 7 / 92 | **1 / ~30** |
| `src/styles` comment ratio | 62.5% | ~30% |
| private `prefersReducedMotion` / `clamp01` copies | 5 / 9 | **0 / 0** |
| test files in a fossil path | 84 | 0 |
| single-file dirs in `tests/` | 23 | 4 |
| `tests/` naming conventions | 4 (+24 one-off infixes) | **2** |
| `tests-visual/` flat specs | 176 | 0 |
| duplicated helper declarations in `tests-visual/` | ≥190 (`setDark` ×56) | 5 files in `_support/` |
| hardwired output literals in `tests-visual/` | 157 across 11 dead tranche letters | **1** (`PI_OUT`) |
| specs with zero assertions | 7 | 0 |
| untested `src/components` modules | 1 (`completion-seal`) | 0 (**OWED** — a new test, not a move) |

### The two places the settlement ADDS, justified

1. **`src/` root gains one file** (`tokens.ts`). It is a **published JS entry** (`./tokens`) that was living inside the CSS zone, and it also kills the `tokens.ts`↔`tokens/` stem clash. Merging `tokens/manifest.ts` into it means the net is `2 → 1`; only the *root* count rises.
2. **`tests-visual/` gains 9 directories** — the one zone where nesting increases. Justified explicitly: 176 specs / 43,790 LOC in **one flat directory** is the repo's true god-module, and the added nesting buys the 5-file `_support/` that deletes ≥190 duplicated helper declarations and 157 output-path literals. Files still fall (223 → ~209). Grouping is **measured** — only 56 of 176 specs name a component, so exactly **four** component dirs are minted (dock 12, blob 9, aurora 8, constellation 5) and the other 24 stay flat files. GOD's `components/<20 others>/` would have minted 20 single-file dirs — the sand this settlement strikes everywhere else.

Everywhere else the settlement is **subtractive**. `src` loses 27% of its files and 31% of its directories with no new nesting level anywhere; max depth drops 6 → 5. `demo`'s directory count barely moves, and that is the honest report: **17 misplaced directories die and 12 satellite directories are born**, and their existence makes one invariant true that is currently false 12 times — *every `stories/*/*.vue` at depth 2 is a route*.

---

### NOT VERIFIED, therefore not claimed
No seat ran `vue-tsc`, `npm test`, or a `subpath-policy` fidelity check against the target shape. `npm test` is RED at HEAD per EXEC-STATE, so a green/red delta would not be attributable. Every path, count and line reference above is from a command run against `0371836d` on disk.

### FLAGGED, not prescribed (Law 6)
`usePointerVelocityField.ts:122-198` (`tick(deltaMs)` is a pure 6-stage integrator fused with listeners + refs) · `createCanvasLifecycle.ts:171-199,324-399` (the context-loss circuit breaker is a policy object embedded in the scheduler; the DOM-observer half was already extracted to `visibility.ts` — same seam, unfinished) · `useDragVelocity` vs `usePointerVelocityField` (two velocity integrators; whether one subsumes the other needs a seat that can test it) · `dock/composables/useDockState.ts` (282 lines, one export, four machines in one closure — available, **not owed by D3**) · `constellationField.test.ts`'s exact describe→module assignment (turns on the shared fixture at `:5-33`) · `useWebGLCanvas.test.ts:397`'s twin (plausibly `createCanvasLifecycle.ts`) · `identityColorResolver`'s redundancy against the `ColorResolver` call sites · `chassis/body/` vs `StorySection` (3 of 99 vs 88 of 99 — which convention wins across 87 routes is a wave, not a shape call; two things settle now: the dead `Story.body` field, and `story-body.ts:7`'s false claim that the renderer expands into `StorySection → ShowcaseFrame → CodeBlock` — `StoryBodyRenderer.vue:26-27` imports two of the three).


# ═══════════ ZONE SETTLEMENT (43456 chars) ═══════════

Verified every claim against disk at `0371836d`. Ruling.

---

# D3 · `src/composables` — TERMINAL SETTLEMENT

**Zone at HEAD:** 102 `.ts`, 23 dirs, 16,067 lines (`find src/composables -name '*.ts' | wc -l`; `| xargs wc -l | tail -1`). No root barrel (`ls src/composables/*.ts` → none). 72 export keys, 9 owned by this zone (`./dark ./keyboard ./motion ./motion-core ./sidebar ./color ./dom ./reactive ./canvas`).

## 0 · RULINGS ON THE THREE BENCHES

| # | proposal | verdict | ground (verified myself) |
|---|---|---|---|
| SAND F1 / GOD C1 | `motion/`'s 8 dirs are orthogonal to the 2 shipped modules; peer weight is the real cut | **SUSTAINED** | My own transitive closure (`scratchpad/adj/weight.mjs`, comment-stripped): **14 BEAR / 88 FREE**. The cut bisects `morph/` 3-3, `spring/` 5-2, `scroll/` 2-5, `reveal/` 1-2. `motion/core/index.ts` has **12 of 19 `export *` reaching `../`**. Both benches' line-counts drift slightly; the finding is exact. |
| SAND F1 corollary | root barrel hand-picks deep motion paths | **SUSTAINED** | `grep -n 'composables/' src/index.ts` → 8 deep `./composables/motion/**` reaches (`:176 :181 :193 :206 :219 :231 :253 :272`), all at engine-FREE leaves. |
| — | **NEW, both benches missed it** | **FOUND** | `SPRING_PRESETS`/`springPreset` is **engine-FREE** (its keyframes mention at `springPresets.ts:6` is a comment) yet published **only** on the keyframes-bearing `/motion` (`motion/index.ts:61`), absent from `motion/core/index.ts`. A consumer reading the spring table pays the whole engine walk. Same for `ENGAGE_ENVELOPES`. |
| SAND F2 / GOD C2 / WH §7.1 | `glass/` is ≥2 unrelated modules; `webgl/` is not WebGL | **SUSTAINED** | `createCanvasLifecycle.ts:1` says "backend-**AGNOSTIC**"; 6 non-test consumers, **4 outside `webgl/`** (`webgpu/useWebGPUCanvas.ts`, `webgpu/useGpuSubstrate.ts`, `webgpu/webgpuCanvasTypes.ts`, `canvas2d/useCanvas2D.ts`). The repo already confesses: `scripts/lib/subpath-policy.mjs:150` `// name "canvas" ≠ leaf "canvas2d"`. |
| SAND F3 | two implementations of the cascade-colour probe | **SUSTAINED** | Read both. `dom/useResolveTokenColor.ts:53` mutates `el.style.color`; `glass/canvas2d/resolveCanvasColor.ts:74` uses a throwaway probe span. Same concern. `useResolveTokenColor.ts:16` asserts *"`getComputedStyle` appears EXACTLY ONCE in the codebase for this concern"* — **false**: `grep -rln getComputedStyle src/composables` → **11 files**. Worse, `resolveTokenColor:50` early-returns on `!css.includes("var(")`, so it silently fails on a bare `light-dark()` — the exact class `resolveCanvasColor` was written for. Keep the probe-span form. |
| SAND F4 | two `flow.glsl.ts`, shaders stranded in composables | **SUSTAINED** | `find src -name 'flow.*.ts'` → 3 files, two named `flow.glsl.ts`. `composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` have exactly one consumer each: `aurora/constants/shaders/aurora.{frag,wgsl}.ts`. |
| GOD C6 | 5 private `prefersReducedMotion`, 6 private `clamp01` | **SUSTAINED, and stronger than the bench put it** | `motion/core/useReducedMotion.ts:50` **already exports `readReducedMotion()`** — "Read the current OS preference without subscribing (SSR-safe)" — pinned by `tests/public-surface.spec.ts:314` and consumed by `_shared/useMotionAxis.ts:41` and `constellation/composables/useConstellation.ts:14`. The five copies are byte-equivalent re-implementations of a shipped export; one is *exported* (`useElementMorph.ts:91`), a second public name for the same function. `useSelectionIndicator.ts:205` is a **defective** copy — no `typeof window.matchMedia === "function"` guard. This is **superfluity**, the deletion ground. `clamp01`: 6 in composables + 3 in components (`grep -rl` → 9). |
| GOD C7-1 | the shared-`GPUDevice` memo is in the wrong one of two existing files | **SUSTAINED** | `useWebGPUCanvas.ts:102/114/125` hold `sharedDevicePromise`/`__resetSharedGpuDeviceForTest`/`acquireSharedDevice` while `webgpuDevice.ts` already exports `WebGPUInitError:18`, `isSoftwareWebGPUAdapter:64`, `WEBGPU_ACQUIRE_TIMEOUT_MS:107`, `withAcquireTimeout:121`. |
| GOD C7-2 | `useElementMorph` has a pure-geometry seam | **SUSTAINED** | 22 inner declarations; `clamp01:99 toRect:100 centerX:106 centerY:107` are already module-level, `settledRect:176 resolveEndpoint:184 measure:190 frameAt:198 signature:232` are closure-scoped but pure. House idiom exists twice: `handmark/geometry.ts`, `timeline/geometry.ts`. |
| WH §1 (dock luminance) | 899 lines in the shared layer owned by one component | **SUSTAINED** | Consumers: `useGlassBackdropLuminance` → `dock/GlassDock.vue` + 2 demo deep-imports, nothing else. `backdropLuminanceSample`/`backdropSampleMath`/`ambientHueHistogram` → each other only. **Absent from `glass/index.ts`** (read in full) and from `src/index.ts`. Not shared, not public, not glass-general. |
| WH §1 (`useDockCtaReceive`) | named for its owner, re-exported from dock | **SUSTAINED** | Consumers: `dock/index.ts`, `motion/index.ts:52`, 1 demo, 1 test. Zero non-dock `src` consumers. |
| WH §1 (`useDocumentVisibility`) | in `dom/` but off the `/dom` surface, only `motion/core` consumers | **SUSTAINED** | `grep -n '^export' src/composables/dom/index.ts` → 10 lines, none is it. Consumers: `motion/core/useIntersectionPause.ts`, `motion/core/useRAFLoop.ts`. |
| WH §2 (`useTabRovingFocus`) | the shared layer imports a component | **SUSTAINED** | `useSelectionGroup.ts:13 } from "../../../components/tabs/composables/useTabRovingFocus";` — the only `src/composables → src/components` edge in the zone (`grep -rn '@glass/components\|\.\./\.\./\.\./components' src/composables`). It also means the `/motion-core` entry statically walks into `src/components/tabs/`. |
| WH §3 (`useScrollPin`/`useScrollScene`) | 355 keyframes-bearing lines, shipped, unreachable | **SUSTAINED** | Both BEAR (`useScrollScene.ts:25` imports `SmoothProgress, SpringProgress`). On no barrel. `useScrollScene` ← `useScrollPin` only; `useScrollPin` ← `demo/stories/motion/scroll/ScrollChoreographyBody.vue` only. And `tests/gates/orphan-css-partial.test.ts:296` **hard-anchors `useScrollScene.ts`** as its dead-module fixture, explicitly rejecting a synthesised path. A gate that depends on dead code staying dead is itself the defect. |
| WH §2 (`aurora/constants/budget.ts`) | 0 aurora consumers outside itself | **PARTIAL — arithmetic false, conclusion stands** | It *is* consumed inside aurora (`composables/atoms.ts`, `atoms-fields.ts`, `runtime.ts`) — the bench's "0" is wrong. But blob ×1 and fourier-field ×3 also consume it, so it is genuinely tri-component and cannot live inside one of them. |
| WH §7.2 (`sidebar/` is a lie) | rename | **SUSTAINED** | Zero `src/components` consumers; `ls src/components \| grep -i sidebar` → empty; `demo/stories/dock/dock-search.vue` imports `useScrollTo` from `/sidebar` to get a scroll-to. `src/index.ts:5` even lists a `sortable/` sub-tree that does not exist. |
| GOD C4 (dissolve `dom/`) | → `src/dom.ts` + scatter into motion-core | **OVERRULED** | `dom/index.ts:29-35` records the load-bearing history: `useBreakpoint`/`useIdleReady`/`useViewportReady` were pruned once, broke an external consumer with `MISSING_EXPORT`, and were reinstated. Scattering them buys nothing and needs a *new* curated barrel. `/dom` is a published subpath with a live external surface; it stays a directory. |
| GOD C1 (`motion-core/` with 5 sub-modules) | 26 files in `loop/ scroll/ pointer/ selection/` + 9 flat | **OVERRULED** | Self-contradictory: the bench rules 14 files "into 6 dirs of 2 is sand… precisely today's disease" for `/motion`, then folders `/motion-core` into 5 dirs of 3–8. Rule 5 — added nesting must beat deletion. Fourteen flat named files beat five dirs. |
| SAND §2 (`motion/morph.ts` at 1,248 lines; `motion/spring.ts` at 832) | god-file merges | **OVERRULED in part** | At the zone's 39.5% comment rate these are ~740 and ~500 **code** lines — past GOD's own 400-line seam. Merge to concerns, not to directories. |
| SAND §2 (`color.ts` single file) | merge `index` + `value` | **OVERRULED** | `color/value.ts` is the value.js quarantine boundary, imported directly by 3 non-barrel sites (`aurora/composables/color.ts`, `accent-tone-solve.ts`, `glass/ambientHueHistogram.ts`). Merging it into the barrel destroys the quarantine — the one thing EXEC-STATE records as *working* ("`value.js` is NOT reachable — its quarantine works"). |
| SAND §2 (`dark.ts` single file) | merge all four | **SUSTAINED, with the loss named** | `darkModeSyncScript.ts` advertises itself as the vueuse-FREE FOUC primitive, but `/dark` is the only door and it is vueuse-bearing (measured: `dark/{index,installDarkModeSync,useGlobalDark}` all reach `@vueuse/core`); no deep-import consumer exists. The file boundary is decorative today. Collapse it — and if a vueuse-free FOUC entry is ever wanted it must be a **subpath**, not a file. |
| WH §9.1 (every new dir needs a `COMPOSABLE_CLASS` row) | | **OVERRULED** | `dirsWithIndex()` (`subpath-policy.mjs:186`) reads **top-level dirs that carry an `index.ts`** only. `glass/webgl` has no `index.ts` and was never classified. |
| WH §2 (`_shared` → `src/shared/`), §4 (styles), §5 (`demo/composables/virtual`) | | **ROUTED, out of zone** | Zone is `src/composables`. `src/components/_shared` and `src/styles` belong to the components/styles seats. My targets name `_shared/` as it stands at HEAD; if that seat renames it, retarget mechanically. |
| WH §8 (`springProjection` → `scripts/lib/`) | | **OVERRULED** | Two demo stories consume it (`demo/stories/motion/{springs,reveal}.vue`); `scripts/` is not on the demo alias path. It stays in `src`, and the honest fix is to *publish* it — see MOVES. |

**Both benches, on the record for Edict 4: zero test files in `src`.** Re-verified: `find src demo -type f \( -name '*.test.*' -o -name '*.spec.*' -o -path '*__tests__*' \)` → empty; `grep -rlE "from ['\"](vitest|@testing-library)" src demo` → empty.

---

## 1 · THE TARGET TREE

**52 files · 6 directories · max depth 2 · 6 barrels, every one a package entry.**

```
src/composables/
├── canvas/                    ← /canvas  (was glass/{canvas2d,webgl,webgpu} + rendererStatus)
│   ├── index.ts
│   ├── lifecycle.ts           createCanvasLifecycle + sizeBacking/BackingSize/DprPolicy
│   ├── visibility.ts          createCanvasVisibility + CanvasSuspendReason (owns the type; cycle dies)
│   ├── canvas2d.ts            useCanvas2D, useCanvasLifecycle
│   ├── webgl.ts               useWebGLCanvas + compileShader/linkProgram
│   ├── webgpu.ts              useWebGPUCanvas + its canvas types
│   ├── gpu-device.ts          WebGPUInitError, isSoftwareWebGPUAdapter, withAcquireTimeout,
│   │                          supportsWebGPU, the shared-device memo  (C7-1 seam)
│   ├── substrate.ts           useGpuSubstrate
│   ├── status.ts              RendererStatus + the 5 describe/failure leaves  (18 consumers)
│   └── budget.ts              ← aurora/constants/budget.ts (tri-component)
├── color/                     ← /color
│   ├── index.ts               barrel only, ~15 lines
│   ├── oklch.ts               OklchStop, ColorHarmony, oklchToLinear, oklchToGammaRgb, cssToOklch,
│   │                          oklchStopToHex, gamutMapStop, identityColorResolver
│   └── value.ts               the value.js quarantine guards — UNTOUCHED
├── context.ts                 createStrictContext, createOptionalContext + the 2 types
├── dark.ts                    ← /dark   useGlobalDark, installDarkModeSync, darkModeSyncScript,
│                                        DARK_MODE_STORAGE_KEY
├── dom/                       ← /dom
│   ├── index.ts
│   ├── observe.ts             useResizeObserver, useBreakpoint
│   ├── defer.ts               useIdleReady, useViewportReady
│   ├── token-color.ts         useTokenColor, resolveCascadeColor, createColorCache, ColorResolver
│   ├── touch-gate.ts          useTouchGate
│   ├── clipboard.ts           useClipboard
│   └── aria.ts                useUserInvalidAria
├── glass.ts                   ← /glass (root-barrel, INTERNAL)  createSpecularWriter,
│                                useSpecularTracking, vSpecular, armGlassRefract,
│                                supportsBackdropRefract
├── keyboard.ts                ← /keyboard
├── motion/                    ← /motion — keyframes-BEARING, every file, no exception
│   ├── index.ts
│   ├── morph.ts               useElementMorph + useLiquidReveal (its own header: "a thin wrapper")
│   ├── drag.ts                useDragMorph
│   ├── geometry.ts            toRect, centerX, centerY, settledRect, resolveEndpoint, measure,
│   │                          frameAt, signature — DOM-free, engine-free, unit-testable
│   ├── spring.ts              useSpring + useSpringPress (demoted to private)
│   ├── press.ts               useLiquidPress
│   ├── mount.ts               useSpringMount
│   ├── number.ts              useAnimatedNumber + useAnimatedNumberMap
│   ├── projection.ts          springProjection, springSettleDurationSeconds — NOW PUBLISHED
│   └── core/                  ← /motion-core — engine-FREE + vueuse-FREE, every file
│       ├── index.ts
│       ├── loop.ts            useRAFLoop, useIntersectionPause, useYieldToMain,
│       │                      useDocumentVisibility            ← from dom/
│       ├── scroll.ts          createScrollReader, supportsScrollTimeline/ViewTimeline,
│       │                      useScrollProgress, useScrollTrigger
│       ├── chrome.ts          useScrollChrome
│       ├── pointer.ts         usePointerVelocityField, useRoutePointer
│       ├── field-mappings.ts  pointerFieldMappings (pure type-only data, 6 consumers)
│       ├── selection.ts       useSelectionIndicator, useSelectionGroup,
│       │                      useRovingFocus                   ← from components/tabs/
│       ├── flex.ts            useLiquidFlex, useLeadTrail
│       ├── presets.ts         SPRING_PRESETS/springPreset, ENGAGE_ENVELOPES/engageEnvelope,
│       │                      DAMPING, SNAP_THRESHOLD, RAFLoopTiming
│       ├── reveal.ts          vReveal, useStagger
│       ├── element.ts         asElement, motionTempo, writeVelocityWeight
│       ├── reduced-motion.ts  useReducedMotion, readReducedMotion  (20 consumers — defended)
│       ├── view-transition.ts startViewTransition, supportsViewTransitions
│       └── math.ts            clamp01, lerp  (NEW — kills 9 private copies)
├── reactive.ts                ← /reactive   useInterval, useTimer + their *Controls
└── toc/                       ← /toc  (was /sidebar)
    ├── index.ts
    ├── tree.ts                useTreeIndex, buildTreeIndex, isActive, isInActiveChain,
    │                          TreeNode, TreeIndexEntry, SectionHierarchy
    ├── state.ts               useTocState, useTocFollow
    └── scroll.ts              useScrollTracker, useScrollTo, useClickDelegate, useLazyLoader
```

**Defence of the counts.** `canvas/` 10 — three backends, one lifecycle, one status leaf, one budget: fewer would fuse WebGPU device bootstrap into canvas binding (the very seam GOD found). `motion/` 9 + `core/` 14 — flat, no sub-dirs: the peer cut is the *only* boundary the build enforces, so it is the only directory. `dom/` 7 — five families plus a barrel; the two mis-sited members leave. `toc/` 4 — tree, state, scroll. Files ≤ ~350 code lines throughout; nothing under ~100 except the barrels and `math.ts`, which exists to kill nine duplicates.

**~2,712 lines leave the zone. `glass/procedural/` and `glass/webgl/shaders/` are emptied entirely.**

---

## 2 · MOVES

### Out of the zone — colocation

| current | → target | ground |
|---|---|---|
| `glass/useGlassBackdropLuminance.ts` (433) | `components/dock/composables/backdrop-luminance.ts` | sole `src` consumer `dock/GlassDock.vue`; on no barrel |
| `glass/backdropLuminanceSample.ts` (301) | `components/dock/composables/backdrop-sample.ts` | ← consumed by the above only |
| `glass/ambientHueHistogram.ts` (111) | ↳ merged into `backdrop-sample.ts` | ← consumed by `backdropLuminanceSample` only |
| `glass/backdropSampleMath.ts` (54) | ↳ merged into `backdrop-sample.ts` | ← same |
| `motion/morph/useDockCtaReceive.ts` (319) | `components/dock/composables/cta-receive.ts` | zero non-dock `src` consumers; re-exported from `dock/index.ts`; names its owner |
| `dom/useDragVelocity.ts` (224) | `components/slider/drag-velocity.ts` | sole `src` consumer `slider/Slider.vue`; header: *"the slider weight-train … the ONE new bridge"* |
| `color/useAccentTone.ts` + `accent-tone-solve.ts` (179) | `components/chip/accent-tone.ts` + `accent-tone-solve.ts` | `Chip.vue:11` imports the shell module **directly**, bypassing the barrel — `color/index.ts:351` says so. The dynamic-import quarantine survives the move byte-intact. |
| `color/index.ts:251-353` `deriveBlobPalette` + `DeriveBlobPaletteOptions` | `components/blob/palette.ts` | `grep -rl deriveBlobPalette` → blob ×4 + 1 demo + 1 test, nothing else |
| `color/index.ts:202-236` `deriveHue`, `:84-104` `warmCatchLight` | fold into `components/aurora/composables/color.ts` (exists) | `deriveHue` → `aurora/composables/color.ts` only; `warmCatchLight` → `aurora/{composables/uniformBridge,constants/presets}.ts` only. **No new file.** |
| `glass/procedural/color.{glsl,wgsl}.ts` (454) | `components/_shared/shaders/color.{glsl,wgsl}.ts` | shared by aurora ×2, blob, fourier-field — cross-component, but a shader string is not a composable |
| `glass/procedural/prng.ts` (25) | `components/_shared/prng.ts` | 8 consumers across handmark, constellation, blob, fourier-field, watercolor-dot — neither glass nor procedural |
| `glass/webgl/shaders/flow.{glsl,wgsl}.ts` (99) | `components/aurora/constants/shaders/curl-fbm.{glsl,wgsl}.ts` | one consumer each, both aurora; the rename kills the two-`flow.glsl.ts` basename collision |
| `motion/scroll/useScrollPin.ts` + `useScrollScene.ts` (355) | `demo/composables/scroll-choreography.ts` | keyframes-BEARING, on no barrel, zero `src` consumers, one demo-story consumer. Shipped-but-unreachable library weight. |

### Into the zone

| current | → target | ground |
|---|---|---|
| `components/tabs/composables/useTabRovingFocus.ts` | fold into `motion/core/selection.ts` as `useRovingFocus` | ends the only `composables → components` edge (`useSelectionGroup.ts:13`); both consumers (`useSelectionGroup`, `SegmentedTabs.vue`) already import that module. Vue-only, so `/motion-core` stays engine- and vueuse-free. |
| `components/aurora/constants/budget.ts` (74) | `composables/canvas/budget.ts` | blob ×1 + fourier-field ×3 consume it from outside aurora |

### Inside the zone

| current | → target |
|---|---|
| `dom/useDocumentVisibility.ts` | `motion/core/loop.ts` — its only two consumers are `useRAFLoop` and `useIntersectionPause`, and it is not on `/dom` |
| `motion/spring/springPresets.ts` + `motion/engage/engageEnvelopes.ts` + `motion/core/constants.ts` | `motion/core/presets.ts`, **published on `/motion-core`** and dual-exported from `/motion` (the precedent is in-repo: `core/index.ts:9-13` already dual-exports `constants` for exactly this reason). Ends an engine-free data table reachable only through the engine-bearing entry. |
| `motion/spring/springProjection.ts` | `motion/projection.ts`, **published on `/motion`**. Ends the unexported-yet-shipped state; must stay `vue`-free because `scripts/regen-spring-tokens.mjs:27` imports it under Node type-stripping. |
| `glass/canvas2d/resolveCanvasColor.ts` | merged into `dom/token-color.ts` as `resolveCascadeColor` (§3) |

---

## 3 · AGGLOMERATIONS

| resulting file | absorbs | at the function level |
|---|---|---|
| `context.ts` | `context/{index,createContext}.ts` | `createStrictContext`, `createOptionalContext`, `StrictContext<T>`, `OptionalContext<T>` |
| `reactive.ts` | `reactive/{index,useInterval,useTimer}.ts` | `useInterval`, `useTimer`, `UseIntervalControls`, `UseTimerControls` |
| `keyboard.ts` | `keyboard/{index,useKeyboardShortcuts}.ts` | `useKeyboardShortcuts` + registrar/formatter (9 exports) |
| `dark.ts` | `dark/{index,useGlobalDark,installDarkModeSync,darkModeSyncScript}.ts` | `useGlobalDark`, `installDarkModeSync`, `darkModeSyncScript`, `DARK_MODE_STORAGE_KEY` |
| `glass.ts` | `glass/{index,useSpecularTracking,vSpecular,supportsBackdropRefract}.ts` | `createSpecularWriter`, `useSpecularTracking`, `vSpecular`, `armGlassRefract`, `supportsBackdropRefract`. The `useCanvas2D`/`resolveCanvasColor` re-exports drop; the root barrel takes `./composables/canvas` and `./composables/dom` directly. |
| `color/oklch.ts` | the non-blob, non-aurora, non-chip half of `color/index.ts` | `oklchToLinear`, `oklchToGammaRgb`, `cssToOklch`, `oklchStopToHex`, `gamutMapStop`, `OklchStop`, `ColorHarmony`, `identityColorResolver` |
| `dom/token-color.ts` | `dom/{useTokenColor,useResolveTokenColor}.ts` + `glass/canvas2d/resolveCanvasColor.ts` | `useTokenColor` (reactive property read), **`resolveCascadeColor(css, el)`** — the surviving probe-span implementation, which also handles a bare `--token`, `light-dark()` and `color-mix()` the inline-style form silently drops — `createColorCache(max)`, `ColorResolver` |
| `dom/observe.ts` | `dom/{useResizeObserver,useBreakpoint}.ts` | the platform-subscription pair |
| `dom/defer.ts` | `dom/{useIdleReady,useViewportReady}.ts` | the two defer-until latches |
| `motion/morph.ts` | `motion/morph/useElementMorph.ts` + `motion/reveal/useLiquidReveal.ts` | the one FLIP runner + the wrapper its own header calls "a thin wrapper over `useElementMorph`" |
| `motion/spring.ts` | `motion/spring/{useSpring,useSpringPress}.ts` | `useSpring` + `useSpringPress` **demoted to module-private** — its sole consumer is `useLiquidPress.ts`, and it is on no barrel |
| `motion/number.ts` | `motion/number/{useAnimatedNumber,useAnimatedNumberMap}.ts` | the 19-code-line map fan-out returns to its base |
| `motion/core/presets.ts` | `spring/springPresets.ts` + `engage/engageEnvelopes.ts` + `core/constants.ts` | three register tables read together; `motion/index.ts:68-72` already argues for exactly this ("*splitting them across entries invites a call site to invent the constant it cannot find*"). Kills the 1-file `engage/` dir. |
| `motion/core/loop.ts` | `core/{useRAFLoop,useIntersectionPause,useYieldToMain}.ts` + `dom/useDocumentVisibility.ts` | everything that decides whether a frame runs |
| `motion/core/scroll.ts` | `scroll/{scrollReader,supportsCssTimeline,useScrollProgress,useScrollTrigger}.ts` | the one reader and its two direct riders |
| `motion/core/selection.ts` | `morph/{useSelectionIndicator,useSelectionGroup}.ts` + `tabs/composables/useTabRovingFocus.ts` | the headless selection machine: roving focus → group → travelling indicator |
| `motion/core/flex.ts` | `spring/useLiquidFlex.ts` + `morph/useLeadTrail.ts` | two pure scalar→geometry projections sharing the squish idiom |
| `motion/core/reveal.ts` | `reveal/{vReveal,useStagger}.ts` | the entrance pair |
| `motion/core/element.ts` | `core/{asElement,motionTempo,writeVelocityWeight}.ts` | resolve a ref to an element, then read/write the motion scalars on it |
| `motion/core/pointer.ts` | `pointer/{usePointerVelocityField,useRoutePointer}.ts` | the integrator and its route-scoped wrapper |
| `canvas/lifecycle.ts` | `webgl/{createCanvasLifecycle,backingSize}.ts` | the park/freeze/dispose state machine + its sole-consumer DPR helper |
| `canvas/webgpu.ts` | `webgpu/{useWebGPUCanvas,webgpuCanvasTypes}.ts` | the canvas binding and its types |
| `canvas/webgl.ts` | `webgl/{useWebGLCanvas,compile.ts}` | the GL canvas + `compileShader`/`linkProgram` |
| `toc/scroll.ts` | `sidebar/{useScrollTracker,useScrollTo,useClickDelegate,useLazyLoader}.ts` + their 4 option types | the ToC scroll kit; the option types return from `types.ts` to their functions |
| `toc/state.ts` | `sidebar/{useSidebarState,useSidebarFollow}.ts` | |
| `toc/tree.ts` | `sidebar/useTreeIndex.ts` + the 3 genuinely-shared types from `types.ts` | `TreeNode`, `TreeIndexEntry`, `SectionHierarchy` (the last is deep-imported by `demo/composables/virtual/virtualSectionLayout.ts:12`) |

---

## 4 · SPLITS

| source | seam | result |
|---|---|---|
| `motion/morph/useElementMorph.ts` (434) | `:99-107` + `:176 :184 :190 :198 :232` are pure rect math over three scalars; the rest is rAF + observer + `NumericAnimation` | `motion/morph.ts` (the runner) + **`motion/geometry.ts`** — DOM-free, engine-free, unit-testable. Conforms to `handmark/geometry.ts`, `timeline/geometry.ts`. |
| `glass/webgpu/useWebGPUCanvas.ts` (520) | `:80 supportsWebGPU`, `:102 sharedDevicePromise`, `:114 __resetSharedGpuDeviceForTest`, `:125 acquireSharedDevice` are device bootstrap, not canvas binding | ~90 lines join **`canvas/gpu-device.ts`**, which already holds `WebGPUInitError:18`, `isSoftwareWebGPUAdapter:64`, `withAcquireTimeout:121`. The wrapper drops to ~430. |
| `glass/webgl/createCanvasLifecycle.ts` (475) + `visibility.ts` (317) | `visibility.ts:12` imports `type CanvasSuspendReason` **back from** `createCanvasLifecycle.ts:43`'s importer — a type-only back-edge cycle | `CanvasSuspendReason` is **declared in `canvas/visibility.ts`**; `lifecycle.ts` imports it one-way. The cycle dies without merging two 300+-line modules. |
| `color/index.ts` (355, of which 353 is implementation) | `:84-104` aurora, `:154` a test-only default, `:202-236` aurora, `:251-353` blob, the rest tri-component oklch math | `color/index.ts` becomes a ~15-line barrel; `color/oklch.ts` is the module; three slices leave (§2) |
| `sidebar/types.ts` (120) | 6 of 10 interfaces have exactly one consumer file — `ScrollToOptions`, `ClickDelegateOptions`, `LazyLoaderOptions`, `ScrollTrackerOptions`, and 2 more | file **deleted**; the singles return to their functions, the 3 shared types land in `toc/tree.ts` |

**FLAGGED, not prescribed (Law 6 — I have not tested these):**
- `usePointerVelocityField.ts:122-198` — `tick(deltaMs)` is a pure 6-stage integrator fused with pointer listeners and Vue refs. A real seam; the extraction is untested.
- `createCanvasLifecycle.ts:171-199, 324-399` — the context-loss circuit breaker (`N_RESTORE_STORM`, `T_RESTORE_STORM_MS`, `RESTORE_DEBOUNCE_MS` + sliding window + debounce) is a policy object embedded in the scheduler. The DOM-observer half was already extracted to `visibility.ts`; this is the same seam, unfinished.
- `dom/useDragVelocity` vs `motion/core/pointer.ts::usePointerVelocityField` — two velocity integrators; `useDragVelocity.ts:*` argues in its own header that the other has "the wrong push-API shape". Whether one subsumes the other is a real question I have not tested. Move `useDragVelocity` to slider on colocation grounds; leave the unification to a seat that can test it.

---

## 5 · RENAMES UNDER MODULE-NAME STRIPPING

**Rule applied.** Strip the module **noun** (`spring`, `scroll`, `pointer`, `dark`, `glass`, `webgpu`, `canvas`, `sidebar`). Never strip to a bare `use.ts` — a `use`-only stem is sand, and where the literal strip is degenerate, the diagnosis is that the *directory* is the redundancy, which §1 collapses. The Vue `use` prefix on a **symbol** is convention, not repetition; symbols keep it. House precedent to conform to, not invent: `handmark/{brush,freehand,geometry,ink,noise,texture}.ts`, `timeline/geometry.ts`, `fourier-field/math.ts`, `blob/config.ts`, `sortable-list/context.ts`.

| current | → landing file |
|---|---|
| `context/createContext.ts` | `context.ts` — literal strip is `create`, degenerate; dir collapses |
| `keyboard/useKeyboardShortcuts.ts` | `keyboard.ts` |
| `dark/{useGlobalDark, installDarkModeSync, darkModeSyncScript}.ts` | `dark.ts` — all three strip to `dark`; the collision *is* the finding |
| `reactive/{useInterval, useTimer}.ts` | `reactive.ts` |
| `glass/useGlassBackdropLuminance.ts` | `dock/composables/backdrop-luminance.ts` |
| `glass/useSpecularTracking.ts`, `vSpecular.ts`, `supportsBackdropRefract.ts` | `glass.ts` |
| `glass/canvas2d/useCanvas2D.ts` | `canvas/canvas2d.ts` — strip is `use`, degenerate; dir collapses |
| `glass/canvas2d/resolveCanvasColor.ts` | `dom/token-color.ts` (merged) |
| `glass/webgl/useWebGLCanvas.ts` | `canvas/webgl.ts` |
| `glass/webgl/createCanvasLifecycle.ts` | `canvas/lifecycle.ts` |
| `glass/webgl/backingSize.ts` | ↳ `canvas/lifecycle.ts` |
| `glass/webgl/visibility.ts` | `canvas/visibility.ts` (already stripped) |
| `glass/webgpu/useWebGPUCanvas.ts` | `canvas/webgpu.ts` |
| `glass/webgpu/webgpuDevice.ts` | `canvas/gpu-device.ts` |
| `glass/webgpu/webgpuCanvasTypes.ts` | ↳ `canvas/webgpu.ts` |
| `glass/webgpu/useGpuSubstrate.ts` | `canvas/substrate.ts` |
| `glass/webgpu/rendererStatus.ts` | `canvas/status.ts` |
| `glass/webgl/shaders/flow.{glsl,wgsl}.ts` | `aurora/constants/shaders/curl-fbm.{glsl,wgsl}.ts` — resolves the basename collision |
| `motion/core/motionTempo.ts` | `motion/core/element.ts` (ancestor-level strip: `tempo`) |
| `motion/core/useReducedMotion.ts` | `motion/core/reduced-motion.ts` (ancestor-level strip) |
| `motion/core/useViewTransition.ts` | `motion/core/view-transition.ts` |
| `motion/core/{useRAFLoop, useIntersectionPause, useYieldToMain}.ts` | `motion/core/loop.ts` |
| `motion/core/{asElement, writeVelocityWeight}.ts` | `motion/core/element.ts` |
| `motion/engage/engageEnvelopes.ts` | `motion/core/presets.ts` — strip is `envelopes`; dir collapses |
| `motion/morph/{useElementMorph}.ts` | `motion/morph.ts` (+ `motion/geometry.ts`) |
| `motion/morph/useDragMorph.ts` | `motion/drag.ts` |
| `motion/morph/useDockCtaReceive.ts` | `dock/composables/cta-receive.ts` — the strip and the graph name the same owner |
| `motion/morph/{useSelectionIndicator, useSelectionGroup}.ts` | `motion/core/selection.ts` |
| `motion/morph/useLeadTrail.ts` | `motion/core/flex.ts` |
| `motion/number/{useAnimatedNumber, useAnimatedNumberMap}.ts` | `motion/number.ts` |
| `motion/pointer/{usePointerVelocityField, useRoutePointer}.ts` | `motion/core/pointer.ts` |
| `motion/pointer/pointerFieldMappings.ts` | `motion/core/field-mappings.ts` |
| `motion/reveal/{vReveal, useStagger}.ts` | `motion/core/reveal.ts` |
| `motion/reveal/useLiquidReveal.ts` | `motion/morph.ts` |
| `motion/scroll/{scrollReader, useScrollProgress, useScrollTrigger, supportsCssTimeline}.ts` | `motion/core/scroll.ts` |
| `motion/scroll/useScrollChrome.ts` | `motion/core/chrome.ts` |
| `motion/scroll/{useScrollPin, useScrollScene}.ts` | `demo/composables/scroll-choreography.ts` |
| `motion/spring/{useSpring, useSpringPress}.ts` | `motion/spring.ts` |
| `motion/spring/useSpringMount.ts` | `motion/mount.ts` |
| `motion/spring/useLiquidPress.ts` | `motion/press.ts` |
| `motion/spring/useLiquidFlex.ts` | `motion/core/flex.ts` |
| `motion/spring/springPresets.ts` | `motion/core/presets.ts` |
| `motion/spring/springProjection.ts` | `motion/projection.ts` |
| `sidebar/{useSidebarState, useSidebarFollow}.ts` | `toc/state.ts` |
| `sidebar/{useScrollTracker, useScrollTo, useClickDelegate, useLazyLoader}.ts` | `toc/scroll.ts` |
| `sidebar/useTreeIndex.ts` | `toc/tree.ts` |
| `sidebar/types.ts` | deleted (§4) |
| `color/{useAccentTone, accent-tone-solve}.ts` | `chip/{accent-tone, accent-tone-solve}.ts` |

**Symbol renames** (the directory name was in the *export*, not only the path): `useSidebarState → useTocState`, `useSidebarFollow → useTocFollow`, `useTabRovingFocus → useRovingFocus`, `resolveTokenColor/resolveCanvasColor → resolveCascadeColor`, `createTokenColorCache → createColorCache`, `defaultBlobColorResolver → identityColorResolver` (it is the DOM-free identity resolver, has nothing to do with blob, and has zero `src`/`demo` consumers).

**Not renamed, deliberately:** `useSpring`, `useSpecularTracking`, `useTokenColor` — the module name *is* the whole noun, and the strip leaves `use.ts`. Under §1 their directories dissolve, so the repetition is gone without a degenerate stem.

---

## 6 · DELETIONS

Granted on **vacuity or superfluity**. Consumer counts appear below as corroboration only, never as the ground.

| deleted | lines | ground |
|---|---:|---|
| `prefersReducedMotion()` in `motion/core/useViewTransition.ts:83`, `motion/morph/useElementMorph.ts:91` (**exported**), `motion/morph/useDragMorph.ts:125`, `motion/morph/useSelectionIndicator.ts:205`, `dom/useDragVelocity.ts:67` | ~35 | **SUPERFLUITY, proven.** `motion/core/useReducedMotion.ts:50` already exports `readReducedMotion()` — identical semantics, published on `/motion-core`, pinned by `tests/public-surface.spec.ts:314`, already consumed at `_shared/useMotionAxis.ts:41` and `constellation/composables/useConstellation.ts:14`. The `useElementMorph` copy is a *second public name* for a shipped export. The `useSelectionIndicator:205` copy is additionally **defective** — it omits the `typeof window.matchMedia === "function"` guard its four siblings carry. |
| `clamp01` in `scroll/useScrollTrigger.ts:111`, `scroll/useScrollChrome.ts:93`, `scroll/useScrollScene.ts:90`, `morph/useElementMorph.ts:99`, `pointer/useRoutePointer.ts:65`, `pointer/usePointerVelocityField.ts:207` | ~24 | **SUPERFLUITY.** Six byte-identical clamps (+3 more in `src/components`). One `motion/core/math.ts` serves all nine. |
| `sidebar/types.ts` | 120 | **VACUITY as a module.** It is a manifest, not a module, and the directory contradicts itself about it: 4 members export their options here while `useSidebarFollow.ts:12` and `useSidebarState.ts:19` declare theirs inline. Two conventions, one directory. The 6 single-consumer interfaces return to their functions; the 3 shared types land in `toc/tree.ts`. |
| `watercolor-dot/prng.ts:7` — `export { mulberry32, hashString } from "…/procedural/prng"` | 1 | **A legacy re-export shim**, forbidden by the no-legacy edict, and it says so itself: *"Re-exported so the existing named surface … is byte-identical."* Consumers import the shared leaf directly; the file becomes `watercolor-dot/radii.ts` (`randomRadii`, `radiiToCSS`). |
| the 6 barrels `context/index.ts` (7), `keyboard/index.ts` (5, one export line), `reactive/index.ts` (3), `dark/index.ts` (21 over 3 siblings), `glass/index.ts` (45), `glass/canvas2d/index.ts` (16) | 97 | **VACUITY.** A barrel over a module that has become one file re-exports itself. Every `from ".../<name>"` specifier resolves byte-identically against `<name>.ts`. |
| the 12 emptied directories `context/ dark/ glass/ glass/canvas2d/ glass/procedural/ glass/webgl/ glass/webgl/shaders/ glass/webgpu/ keyboard/ motion/{engage,morph,number,pointer,reveal,scroll,spring}/ reactive/ sidebar/` | — | consequence of the above |

**NOT deleted, though a bench pressed for it.** `identityColorResolver` (`color/index.ts:154`) has zero `src` and zero `demo` consumers and two test consumers — but it is a published default with real behaviour. WRONG-HOME is right that the *name* lies; it is not right that the function is vacuous. Renamed, not deleted. Whether the `ColorResolver` call sites make it redundant is untested — **FLAGGED**, not ruled (Law 6; this refinement has already paid for one untested prescription).

---

## 7 · TEST DISPLACEMENT

**Edict 4 has zero violations in this zone. No test file exists in `src/`, and none is owed a target.** Verified three ways:

```
$ find src demo -type f \( -name '*.test.*' -o -name '*.spec.*' -o -path '*__tests__*' -o -name '*.bench.*' \) | wc -l
0
$ grep -rlE "from ['\"](vitest|@testing-library)" src demo | wc -l
0
```

Isomorphism is broken on the **tests** side, in four ways, all verified:

1. **13 flat files** at `tests/composables/*.test.ts` whose sources are 2–3 levels deep (`useAnimatedNumber, useIntersectionPause, useInterval, useKeyboardShortcuts, useRAFLoop, useSpring, useSpringMount, useTimer, useTokenColor, useTouchGate, useViewTransition, useYieldToMain, vReveal`), against 15 correctly-nested siblings.
2. **A DUPLICATE.** `tests/composables/useTokenColor.test.ts:3` and `tests/composables/dom/useTokenColor.test.ts:5` **both** `import { useTokenColor } from "@glass/composables/dom/useTokenColor"`. Two files, one source, 141 lines.
3. **An ORPHAN in the wrong tree.** `tests/composables/sortable/drag-ring-radius.test.ts:3` imports `@glass/components/sortable-list/composables/useSortable`; `src/composables/sortable` does not exist. (`src/index.ts:5` still lists a `sortable/` sub-tree — the same phantom.) → `tests/components/sortable-list/composables/useSortable.test.ts`.
4. **Barrel-addressed tests cannot name their referent.** `motion/press.test.ts`, `useSpring.test.ts`, `useSpringMount.test.ts`, `useAnimatedNumber.test.ts` import `@glass/composables/motion`; `useRAFLoop/useIntersectionPause/useViewTransition/useYieldToMain.test.ts` import `@glass/composables/motion/core`. Re-point each at its leaf.

**Target tree — 28 files → 22, isomorphic to §1 exactly:**

```
tests/composables/context.test.ts
tests/composables/dark.test.ts                  ← dark/darkModeSyncScript
tests/composables/keyboard.test.ts              ← useKeyboardShortcuts
tests/composables/reactive.test.ts              ← useInterval + useTimer
tests/composables/glass.test.ts                 ← glass/supportsBackdropRefract
tests/composables/color/oklch.test.ts           ← color/warm-catch-light (aurora half leaves)
tests/composables/dom/token-color.test.ts       ← dom/useTokenColor + useTokenColor (MERGED)
                                                  + canvas2d/resolveCanvasColor
tests/composables/dom/clipboard.test.ts
tests/composables/dom/touch-gate.test.ts        ← useTouchGate
tests/composables/canvas/lifecycle.test.ts
tests/composables/canvas/visibility.test.ts     ← glass/webgl/visibility
tests/composables/canvas/canvas2d.test.ts
tests/composables/canvas/webgl.test.ts
tests/composables/canvas/webgpu.test.ts         ← + gpu-device
tests/composables/motion/morph.test.ts          ← useElementMorph
tests/composables/motion/geometry.test.ts       ← NEW, DOM-free (the §4 split earns it)
tests/composables/motion/spring.test.ts         ← useSpring + motion/press
tests/composables/motion/mount.test.ts          ← useSpringMount
tests/composables/motion/number.test.ts
tests/composables/motion/projection.test.ts     ← springProjection + springTokenMirror
tests/composables/motion/core/{presets,loop,scroll,chrome,pointer,reveal,reduced-motion,
                               view-transition,selection}.test.ts
tests/composables/toc/{scroll,tree}.test.ts
```

Leaving the zone with their sources: `tests/composables/color/use-accent-tone.test.ts` → `tests/components/chip/accent-tone.test.ts`; `tests/composables/glass/backdropLuminanceSample.test.ts` → `tests/components/custom/dock/composables/backdrop-sample.test.ts`; `tests/composables/motion/useDockCtaReceive.test.ts` → `tests/components/custom/dock/composables/cta-receive.test.ts`.

---

## 8 · WHAT BREAKS

**The 72 export keys: 71 unchanged, 1 renamed.** `./sidebar → ./toc` is the only key that moves. Every other break is internal path movement plus four deliberate public deletions, each reachable elsewhere: `useDragVelocity` leaves `/dom` (→ `/slider`), `resolveTokenColor` leaves `/dom` and `resolveCanvasColor` leaves `/canvas` (both → `resolveCascadeColor` on `/dom` + root), `useAccentTone` leaves `/color` (→ `/chip`), `useDockCtaReceive` leaves `/motion` (→ `/dock`). Two symbols are *added* to a surface: `SPRING_PRESETS`/`springPreset`/`ENGAGE_ENVELOPES` gain `/motion-core`, and `springProjection` gains `/motion`. No aliases, no shims, no dual paths.

**`scripts/lib/subpath-policy.mjs` — one file, four edits.** It is fail-closed (`:15-20`, `:200`): a top-level `src/composables/<dir>` carrying an `index.ts` with no classification exits 1. Five subtrees become files and stop being scanned; two appear.
- `COMPOSABLE_CLASS` (`:95-103`) → `{ canvas: "PUBLISH", color: "PUBLISH", dom: "PUBLISH", motion: "CURATED", toc: "CURATED" }`. Rows for `context`, `dark`, `glass`, `keyboard`, `reactive` are deleted; `sidebar` → `toc`.
- `CURATED` (`:126-131`) → `dark: "src/composables/dark.ts"`, `keyboard: "src/composables/keyboard.ts"`, `toc: "src/composables/toc/index.ts"`; `motion` and `"motion-core"` unchanged.
- `COMPOSABLE_SUBPATHS` (`:146-152`) → `reactive: "src/composables/reactive.ts"`, `canvas: "src/composables/canvas/index.ts"`. **The `// name "canvas" ≠ leaf "canvas2d"` apology at `:150` is deleted, not relocated** — that is the point of the move. The bare-file subpath precedent already exists at `:151` (`"fourier-math": "src/components/fourier-field/math.ts"`).

**`src/index.ts`.** `./composables/reactive` and `./composables/glass` (`:161,:163`) still resolve — a collapsed dir and a file are the same specifier. The **8 deep `./composables/motion/**` reaches (`:176 :181 :193 :206 :219 :231 :253 :272`) collapse to `./composables/motion/core/*`**. `./composables/canvas` is added to carry the `useCanvas2D`/`useCanvasLifecycle` symbols `glass/index.ts` used to re-export, and `./composables/dom` carries `resolveCascadeColor`. **The root-barrel symbol set is unchanged**, so its keyframes-free + vueuse-free discipline holds. Delete the stale `sortable/` sub-tree mention at `:5`.

**`scripts/regen-spring-tokens.mjs`.** `:23` → `../src/composables/motion/core/presets.ts`; `:27` → `../src/composables/motion/projection.ts`. Both must stay `vue`-free — Node imports them under type-stripping, and the string-form `fileURLToPath` idiom at `:33` must survive verbatim.

**`tests/gates/orphan-css-partial.test.ts:296` breaks by design, and its fixture cannot simply be re-pointed.** It hard-codes `src/composables/motion/scroll/useScrollScene.ts` as its dead-module witness and explicitly rejects the easy fix in its own comment: *"any nonexistent path is vacuously 'unreachable' — that proves nothing."* Moving the file to `demo/` — the correct disposition — removes the last present-but-unimported `src` module, which is the settlement working. The gate's bite must be re-expressed against a witness that is *constructed* unreachable rather than *found* unreachable. **This is a gate redesign owed to the gates seat, not a blocker on the move**, and it is a live instance of the convergence-gate lesson: a gate anchored on a defect cannot survive the defect's cure.

**Demo — four re-points, all deep imports.** `demo/stories/dock/_frame/DockStage.vue` and `demo/stories/substrates/glass-material.vue` reach an unexported `src` internal (`glass/useGlassBackdropLuminance`) because there is no door; they follow it to `@glass/components/dock/composables/backdrop-luminance`. `demo/composables/virtual/virtualSectionLayout.ts:12` → `@glass/composables/toc/tree`. `demo/stories/dock/dock-search.vue:22` `useScrollTo` → `/toc`. `demo/stories/motion/scroll/ScrollChoreographyBody.vue` takes ownership of the pin/scene arm it is the sole consumer of.

**CSS reachability: unaffected.** This zone contains no CSS by either mechanism — no `@import` target, no `<style src>` binding. The one linked sheet, `src/styles/scroll-choreography.css` (287 lines, the `--pin-t` register `useScrollPin`/`useScrollScene` write), follows them out of the library; that call belongs to the styles seat and is **routed**, not ruled here.

**Not verified, and therefore not claimed.** I did not run `vue-tsc`, `npm test`, or the `subpath-policy` fidelity check against the target shape — `npm test` is RED at HEAD per EXEC-STATE, so a green/red delta would not be attributable. Every path, count and line reference above is from a command run against `0371836d` on disk.


# ═══════════ ZONE SETTLEMENT (42362 chars) ═══════════

Verified every load-bearing claim against disk at `0371836d`. Rulings follow.

---

# D3 · `src/components` — THE SETTLEMENT

## 0 · ADJUDICATION OF THE THREE BENCHES

| # | proposal | bench | verdict | reason (verified myself) |
|---|---|---|---|---|
| 1 | 38 SFCs are zero-logic slot parts; collapse into `parts.ts` | SAND | **SUSTAINED, scope cut** | My detector (`scratchpad/adj-vac.mjs`, `adj-parts.mjs`): **38** vacuous ≤40-line SFCs, **54** strict fold candidates / **1,155 nb**. `table/TableBody.vue` is verbatim as quoted; `DropdownMenuGroup.vue` vs `Separator.vue` differ only in part name + one class string. **Cut:** fold only where ≥3 parts exist in a family. Kills SAND's carousel/metric/tooltip singletons (a `parts.ts` holding one export is sand under a new name). 12 families qualify, not 17. |
| 2 | `parts.ts` = functional components is not a second convention | SAND | **PARTIAL** | `grep` for `h(`/`defineComponent` in `src/components` → **zero**. SAND's precedent is `demo/` only. But `metric/types.ts:1` already imports `FunctionalComponent`, and `_shared/primitive.ts:26 fixedHostAttrs` is already the part-forward seam. Sustained on the narrow ground that **a `.vue` with no template logic, no reactivity, no emit body and no `<style>` block is a more expensive spelling of `h()`** — not as a general authoring convention. No folded part carries a `<style>` block (verified). |
| 3 | `src/components/substrates/{aurora,blob,constellation,fourier-field}/` | GOD | **OVERRULED** | The grep is deterministic and correct (4 hits, verified). The grouping is not. (a) `9a8761f0` ruled the flat family namespace; GOD's "shared implementation" warrant is already discharged — the shared code **is** `src/composables/glass/{webgl,webgpu,procedural}` (26 files, verified). Grouping consumers of a shared module is taxonomy, not colocation. (b) `PROCEDURAL-SUITE.md:2` says **five** retained procedural surfaces; a four-member `substrates/` contradicts its own subject document. (c) Adds a path segment and re-parents 4 of 72 subpaths for zero import-graph benefit — the four never import each other. Edict: justify added nesting against deletion. **Deleting the doc from `src` is the cheaper settlement, and it is owed anyway (R8).** |
| 4 | `<family>/composables/` is a bag — 36–39 of 78 are not composables | GOD + SAND | **SUSTAINED** | My classifier: **39 of 78** export no `use[A-Z]` and register no `InjectionKey`. aurora 14/16 not-a-composable, blob 8/12, sortable-list 6/7, fourier-field 3/4, search 3/4. **dock is 2/15** (a barrel + one predicate) — the only honest one. |
| 5 | aurora cut = `gpu/ field/ runtime/` | GOD | **OVERRULED for `runtime/`** | `runtime/` = {runtime, frameLoop, configSource, fallbackGround, imageSource, renderMode, budget} is the same catch-all bag under a new name — the defect GOD itself diagnoses. Membership is editorial, not decidable. |
| 6 | aurora cut = `gl/ wgpu/ shaders/` + flat root | SAND | **SUSTAINED** | Only cut whose membership is decided by a fact (which API the file calls), not a judgement. Also resolves the triplicate `uniformBridgeWGPU.ts` basename by path. |
| 7 | `aurora/constants/shaders/` → `aurora/shaders/` | all three | **SUSTAINED** | Depth 6 — `find src -type f \| awk -F/ 'NF>=6'` returns **only** these 14 files. `blob/shaders/` and `fourier-field/shaders/` are at depth 5. Two of three; conform. |
| 8 | `paper-backdrop` deleted on superfluity | SAND | **SUSTAINED** | The SFC is 18 lines and its entire body is `<div class="paper-underpaint" data-slot aria-hidden />`. `paper-underpaint` is `@utility` at `src/styles/paper.css:99`, shipped via `./styles`. Its own demo blurb (`demo/stories/foundations/paper-texture.vue:27`) says it "mounts the library paper-underpaint recipe once". Something else already does it. |
| 9 | `deck/` is not a component | WRONG-HOME | **SUSTAINED** | `find src/components/deck -type f` → `README.md constants.ts index.ts composables/useDeck.ts composables/useDeckKeyboard.ts`. **No SFC.** It is a composable family holding a `./deck` subpath in the component tier. |
| 10 | 8 outward colocation moves from `src/composables/**` | WRONG-HOME | **SUSTAINED (7) / CONDITIONAL (1)** | Each re-verified below. `useDragVelocity`'s "sole consumer slider" survives: the `_shared/useMotionAxis.ts:35` hit is a **comment**, not an import. |
| 11 | `dockContext` → `_shared`; `useDockHold` → `_shared` | WRONG-HOME | **SUSTAINED** | 5 files in 4 foreign components import `../dock/composables/dockContext` (dropdown-menu, popover ×2, select, slider). This **is** the `dock → dropdown-menu → dock` cycle — the only cycle in the 62-node graph (EXEC-STATE:47). The move breaks it. |
| 12 | `aurora/constants/budget.ts` is shared, sitting inside one component | WRONG-HOME | **SUSTAINED** | `resolveBudgetDpr` imported by `blob/composables/useMetaballRenderer.ts:8` and fourier-field ×3 (`useFourierField.ts:36`, `fourierFieldGLSetup.ts:20`, `fourierFieldWGPUSetup.ts:15`). 3 of 4 substrates reach into aurora's private `constants/`. |
| 13 | duplicate basename `flow.glsl.ts`, two imports apart | WRONG-HOME | **SUSTAINED** | `aurora.frag.ts:30` imports `CURL_FBM_GLSL` from `.../glass/webgl/shaders/flow.glsl`; `:32` imports `AURORA_FLOW_GLSL` from `./flow.glsl`. Sole consumers of the shared pair are `aurora.frag.ts` and `aurora.wgsl.ts`. **The fold must precede the rename sweep** — WRONG-HOME §7 is right about the ordering hazard. |
| 14 | `glass/glass-chip.css` → `chip/styles.css` | WRONG-HOME | **SUSTAINED** | All 5 distinct selectors are `.glass-chip*`; only consumers are `chip/Chip.vue` + `chip/chipVariants.ts`. Precedent two lines away: `src/styles/glass.css:64` already did this for `chip/accent-tone.css`. Keep the `@import` at the identical ordinal. |
| 15 | delete `_shared/menu/` entirely | WRONG-HOME | **OVERRULED in part** | `.glass-menu-row` has **three** component consumers (dropdown-menu ×4, command ×1, select via `menuRowClass`) + demo. That block is correctly shared. Only `menuRowClass.ts` (12 lines, 1 consumer) leaves, and the two `.dropdown-menu-content`/`.dropdown-sub-content` blocks (`menu.css:37-50`) leave. |
| 16 | the two BEM dialects are "a live cascade defect" | WRONG-HOME | **PARTIAL — hazard, not defect** | `DropdownMenuContent.vue:78` does carry both classes; `menu.css` has `@layer` = 1, `dropdown-menu/styles.css` = 0. But the two blocks are **property-disjoint** (menu.css sets font/padding/glass-rungs/box-shadow; styles.css sets z-index/min-width/overflow/border/radius/color). Nothing currently mis-cascades. Sustained as a two-dialect/two-mechanism defect; the layer decision is a paired-capture wave, not a directory ruling (Rule 6). |
| 17 | fold `card-scroll.css` into `card/styles.css` | SAND | **OVERRULED** | `src/styles/index.css:185` and `:193` are **not adjacent** — `transitions/animations/viz-reveal/scroll-driven/scroll-choreography` sit between. The fold moves the sheet up five rungs. Untested cure. Rename only. |
| 18 | fold `dock/styles/controls.css` into the dock root | SAND | **SUSTAINED** | `index.css:183` and `:184` **are** adjacent, same `@layer components` → appending controls' four imports to `dock/styles/index.css`'s tail is source-order-identical. But `controls.css` is not vacuous: it carries the `.glass-drag-lift` squish pair + the shared `:where()` specular group. Those 20 code lines land in the dock styles root, which already holds the other shared cross-control groups. |
| 19 | `alert`/`badge` barrels are import cycles | SAND | **SUSTAINED, and understated** | `grep` with both quote styles finds **three**: `alert/Alert.vue:4`, `badge/Badge.vue:3`, `drawer/Drawer.vue:4` (+ `drawer/constants.ts`). SAND's grep used only double quotes and missed badge and drawer. |
| 20 | `easing/composables/useEasingPicker.ts` "already exists, so the seam is unused" | GOD | **OVERRULED** | `EasingPicker.vue:83` calls `useEasingPicker(...)`. The composable is used. The SFC is still 437 code lines after it — the split is real, the reason given is false. |
| 21 | `blob/config.ts` is a forbidden dual path | GOD | **PARTIAL — remedy wrong** | Lines 15-37 do duplicate `index.ts:2-26` verbatim. But GOD's fix ("point the subpath at `presets.ts`+`types.ts`") is impossible — one subpath, one entry. Correct fix: `config.ts` stays the entry; `index.ts` does `export * from "./config"`. Duplication dies, value.js-free door survives. |
| 22 | `src/components/index.ts` carries 4 tombstones | GOD | **SUSTAINED** | Verified: `hover-card`, `multi-select`, `sheet`, `ui/Tabs`. Legacy prose in a barrel; 31 of 63 dirs re-exported. |
| 23 | 26 prose files in a tree whose `files` is `["dist"]` | SAND | **SUSTAINED** | `find src -name '*.md'` → 28 (26 under `components/`). None ships. |
| 24 | Edict 4 — tests inside `src/` | all three | **SUSTAINED — ZERO violations** | `find src demo -name '*.test.*' -o -name '*.spec.*' -o -path '*__tests__*'` → empty. Nothing owed by this zone. |
| 25 | root SFC = `PascalCase(dir)`; `GlassDock.vue` → `Dock.vue` | WRONG-HOME | **SUSTAINED over SAND** | SAND's mechanical strip yields `dock/Glass.vue`, `timeline/Glass.vue` — a *third* convention and ambiguous against the glass material register. 55/63 roots already conform to `PascalCase(dir)`. Anchors don't strip; they are the module name. |
| 26 | `demo/composables/virtual/` → `src/components/virtual-section/` | WRONG-HOME | **ROUTED OUT** | Adding a component + subpath + test tree is the expensive branch; striking the story is the cheap one. Not a `src/components` ruling. → demo D3 seat. |
| 27 | split `dock/composables/` into `state/ morph/ context/` | GOD | **OVERRULED** | 10 composables after the contexts leave. Two dirs of 3–4 files inside a 45-file family is sand. `dock/composables/` is the one admissible `composables/` dir. |
| 28 | delete `dock/composables/index.ts` (dual path) | SAND | **SUSTAINED** | `dock/index.ts` reaches it **both** ways: `:40,:87,:88` via `./composables`, and `:...` directly via `./composables/{useDockShellProps,dockCrossfadeContext,dockContext}`. Same file, two doors. |

---

## 1 · THE TARGET TREE

Rules the tree encodes — **R1** root SFC = `PascalCase(dir)`; **R2** every non-anchor file strips all ancestor name-tokens; **R3** ≥3 zero-logic parts ⇒ one `parts.ts`; **R4** a `composables/` dir needs ≥3 members that are *all* `use*` (only `dock` qualifies); **R5** substrate plumbing groups by API — `gl/ wgpu/ shaders/`; **R6** one context shape, module root; **R7** `styles.css`, or `styles/` with an `index.css` root when >1 partial; **R8** no `.md` in `src`.

```
src/components/
  index.ts                          31 re-exports, 4 tombstone comments STRUCK
  _shared/
    class-names.ts  primitive.ts  axes.ts  selection.ts  control-size.ts
    floating.ts  interaction.ts  resolve-surface-class.ts  motion-axis.ts
    dock-context.ts                 ← from dock/composables/  (BREAKS THE ONE CYCLE)
    hold.ts                         ← from dock/composables/useDockHold.ts
    roving-focus.ts                 ← from tabs/composables/  (kills the layer inversion)
    disclosure/{context.ts, disclosure.css}
    feedback.css                    ← was feedback/feedback-tone.css (1-file dir)
    field/{control.ts, value-domain.ts, control.css, surfaces.css}
    menu-row.css                    ← menu/menu.css minus the two dropdown blocks
                                    (index.ts DELETED — 2 lines, 1 consumer)

  ── the four substrates ────────────────────────────────────────── flat, not grouped
  aurora/    Aurora.vue index.ts use.ts cursor.ts runtime.ts frame-loop.ts
             atoms.ts atoms-fields.ts color.ts fallback-ground.ts image-source.ts
             presets.ts render-mode.ts
             gl/{setup.ts, uniforms.ts, texture.ts}
             wgpu/{setup.ts, uniforms.ts, uniforms-image.ts}
             shaders/{frag,vert,wgsl,image-frag,image-wgsl,mediums-wgsl,
                      brush,composition,flow,mediums,metal-medium,oil-modes,
                      tonemap,vangogh-medium}.ts          ← flow.ts absorbs CURL_FBM
             (constants/ DISSOLVED · budget.ts LEAVES · configSource.ts folded)   32 files
  blob/      Blob.vue index.ts config.ts types.ts constants.ts presets.ts
             mood.ts pointer.ts satellites.ts simulation.ts kinematics.ts easing.ts
             gl/{program.ts, upload.ts, renderer.ts}   wgpu/{setup.ts, uniforms.ts}
             shaders/*                                                            25
  constellation/ Constellation.vue index.ts use.ts types.ts constants.ts
             field.ts interaction.ts render.ts well.ts                             9
  fourier-field/ FourierField.vue index.ts use.ts math.ts constants.ts uniforms.ts
             gl.ts wgpu.ts  shaders/{glsl,compute-wgsl,render-wgsl,ribbon}.ts     12

  ── dock ───────────────────────────────────────────────────────────────────────
  dock/      Dock.vue Control.vue Crossfade.vue Layer.vue LayerGroup.vue
             Separator.vue Trigger.vue BackgroundToggle.vue
             index.ts  crossfade-context.ts  rail-context.ts  teleported.ts
             composables/{useDockState, useDockMorph, useDockSpring, useDockSearch,
                          useDockShellProps, useDockTouchGate, useDockClickIntegrity,
                          useDockOverflowFit, dockMorphMeasure→morph-measure,
                          useCtaReceive, useScrollChrome, useBackdropLuminance,
                          useSelectionGroup, backdrop-sample.ts, sample-math.ts,
                          hue-histogram.ts}.ts        ← index.ts DELETED (dual path)
             styles/  index.css  shell.css  morph.css  density.css  layers.css
                      overflow.css  crossfade.css  shape.css  cta-seat.css
                      controls/{icon-button,tab-button,triggers,touch-floor}.css
                      (controls.css FOLDED into index.css tail — ordinal-adjacent)  40

  ── families that collapse to parts.ts (R3) ────────────────────────────────────
  table/          parts.ts index.ts                                                2
  dropdown-menu/  DropdownMenu.vue Trigger.vue Content.vue parts.ts
                  menu.ts styles.css index.ts                                      7
  select/         Select.vue Trigger.vue Content.vue Item.vue Value.vue
                  parts.ts row-class.ts index.ts                                   8
  dialog/         Dialog.vue Content.vue Overlay.vue parts.ts
                  context.ts sheet-motion.ts placement.css index.ts                8
  drawer/         Drawer.vue Content.vue Overlay.vue parts.ts
                  snap.ts constants.ts styles.css index.ts                         8
  card/           Card.vue Header.vue parts.ts styles.css scroll.css index.ts      6
  command/        Command.vue Dialog.vue Input.vue Item.vue List.vue
                  parts.ts context.ts styles.css index.ts                          9
  toast/          Toast.vue Toaster.vue parts.ts use.ts index.ts                   5
  number-field/   NumberField.vue Input.vue parts.ts context.ts styles.css index.ts 6
  tags-input/     TagsInput.vue Input.vue parts.ts context.ts styles.css index.ts  6
  metric/         Metric.vue parts.ts coalesce.ts types.ts styles.css index.ts     6
  accordion/      Accordion.vue parts.ts index.ts                                  3

  ── families below the ≥3 bar: renamed, not folded ─────────────────────────────
  alert/       Alert.vue Title.vue Description.vue variants.ts index.ts    (+1, cycle)
  badge/       Badge.vue variants.ts index.ts                              (+1, cycle)
  avatar/      Avatar.vue Image.vue Fallback.vue styles.css index.ts
  collapsible/ Collapsible.vue Trigger.vue Content.vue index.ts
  tooltip/     Tooltip.vue Content.vue Trigger.vue Provider.vue index.ts
  carousel/    Carousel.vue Content.vue Item.vue Pager.vue use.ts index.ts   (−2 folded)
  popover/     Popover.vue Content.vue Trigger.vue context.ts index.ts       unchanged
  toggle-group/ ToggleGroup.vue Item.vue context.ts index.ts                 unchanged
  radio-group/ radio-group.*                                                 unchanged
  labeled-field/ LabeledField.vue Input/Select/Slider/Switch.vue types.ts index.ts

  ── the rest ───────────────────────────────────────────────────────────────────
  tabs/        Tabs.vue index.ts constants.ts drag-morph.ts responsive.ts
               styles/{index.css, segmented.css, drag.css}
  timeline/    Timeline.vue Continuous.vue Scrubber.vue Segmented.vue
               ContinuousRail.vue ContinuousMarkers.vue geometry.ts types.ts index.ts
  sortable-list/ SortableList.vue Item.vue Handle.vue context.ts use.ts index.ts
               drag/{controller,drop,ghost,touch,timing,types}.ts
  handmark/    HandMark.vue index.ts use.ts types.ts constants.ts
               stroke/{freehand,geometry,brush}.ts   ink/{ink,texture,noise}.ts
  typewriter/  Typewriter.vue index.ts use.ts types.ts
               graphemes.ts keyboard.ts pauses.ts timing.ts typo-state.ts  (utils/ DIES)
  search/      Search.vue index.ts variants.ts fuzzy.ts fuzzy-index.ts
  data-table/  DataTable.vue index.ts responsive.ts row-identity.ts types.ts styles.css
  easing/      Easing.vue Picker.vue index.ts use.ts constants.ts
  chip/        Chip.vue index.ts variants.ts types.ts styles.css accent-tone.css
               accent-tone.ts accent-tone-solve.ts
  slider/      Slider.vue index.ts types.ts drag-velocity.ts styles/{index,spectrum}.css
  pager-dots/  PagerDots.vue index.ts worm.ts constants.ts window.ts styles.css
  configurator/ Configurator.vue Layer.vue Row.vue use-state.ts styles.css index.ts
  infinite-scroll/ InfiniteScroll.vue index.ts use.ts
  completion-seal/ · fading-scroll/ · expandable-container/ · header-ribbon/ ·
  instrument-chassis/ · dark-mode-toggle/ · scroll-progress-rim/ · status-dot/ ·
  animated-digit/ · watercolor-dot/ · surface/ · skeleton/ · separator/ · label/ ·
  input/ · textarea/ · switch/ · checkbox/ · button/ · progress/
                                                        — right-sized, rename only

  DELETED: paper-backdrop/ (superfluity) · PROCEDURAL-SUITE.md · 26 README/DESIGN.md
  LEFT THE ZONE: deck/ → src/composables/deck/
```

| | now | target | Δ |
|---|---:|---:|---:|
| files | 505 | **~422** | −83 |
| directories | 94 | **~74** | −20 |
| SFCs | 174 | **~124** | −50 |
| `*/composables/` dirs | 18 | **1** (`dock`, 16) | −17 |
| `.md` in `src/components` | 26 | **0** | −26 |
| max path depth | 6 | **5** | −1 |
| barrel import cycles | 3 | **0** | −3 |
| component-graph cycles | 1 | **0** | −1 |

---

## 2 · MOVES

| current | target | ground |
|---|---|---|
| `src/composables/motion/morph/useDockCtaReceive.ts` | `dock/composables/useCtaReceive.ts` | Named for dock; writes `[data-cta-pending]` on a dock control; its seat partial is already `dock/styles/cta-seat.css`. Already dual-pathed (`public-surface.spec.ts:451` exports it under DOCK *and* keeps `/motion`) — the dual path dies with the move. |
| `src/composables/glass/useGlassBackdropLuminance.ts` + `backdropLuminanceSample.ts` + `backdropSampleMath.ts` + `ambientHueHistogram.ts` | `dock/composables/useBackdropLuminance.ts` + `backdrop-sample.ts` + `sample-math.ts` + `hue-histogram.ts` | Sole `src` consumer `dock/GlassDock.vue`. `glass` is bucket **INTERNAL** (`scripts/lib/subpath-policy.mjs:103`) → zero public delta. The 3 leaves have no consumer outside this chain. |
| `src/composables/motion/scroll/useScrollChrome.ts` | `dock/composables/useScrollChrome.ts` | Sole `src` importer `dock/composables/useDockSearch.ts:57`. |
| `src/composables/motion/morph/useSelectionGroup.ts` | `dock/composables/useSelectionGroup.ts` | **Its own header prose is refuted by the graph:** it claims dock + `SegmentedTabs` + `ToggleGroup` are "ONE engine"; the only `src` consumers are `dock/{DockControl,DockCrossfade,DockLayerGroup,GlassDock}.vue`. `SegmentedTabs.vue` composes `useSelectionIndicator` + `useTabRovingFocus` directly; `toggle-group/` imports neither. **CONDITIONAL:** if the tabs/toggle-group enrolment lands (a D4 design ruling), it stays shared. It does not stay shared on the strength of prose the graph contradicts. |
| `src/composables/dom/useDragVelocity.ts` | `slider/drag-velocity.ts` | Sole consumer `slider/Slider.vue`. The `_shared/useMotionAxis.ts:35` hit is a **comment**. Its own header says it exists because "the slider weight-train needs a LIVE drag velocity". |
| `src/composables/color/useAccentTone.ts`, `accent-tone-solve.ts` | `chip/accent-tone.ts`, `chip/accent-tone-solve.ts` | Half-moved already: `glass.css:64` moved the CSS arm into chip. `accent-tone-solve.ts` has zero importers outside `useAccentTone`. Finish it. |
| `src/composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` | fold into `aurora/shaders/flow.{ts,wgsl.ts}` | Only importers are `aurora.frag.ts:30` and `aurora.wgsl.ts:39`. **Must run BEFORE the rename sweep** — otherwise two `flow.glsl.ts` end up one import statement apart. |
| `_shared/menu/menuRowClass.ts` | `select/row-class.ts` | 12 lines, one consumer `select/SelectItem.vue:31`. |
| `_shared/menu/menu.css` §`.dropdown-menu-content`,`.dropdown-sub-content` | `dropdown-menu/styles.css` | Only consumers `DropdownMenuContent.vue:78`, `DropdownMenuSubContent.vue:54`. **Gated on a paired capture** — target sheet is unlayered (`@layer` count 0 vs 1). |
| `src/styles/glass/glass-chip.css` | `chip/styles.css` | 18 selectors, all `.glass-chip*`, sole consumers `chip/`. `@import` rung ordinal preserved (`glass.css:92`). |
| `aurora/constants/budget.ts` | `src/composables/glass/budget.ts` | Imported by blob ×1 and fourier-field ×3 out of aurora's *private* `constants/`. `webgpu/rendererStatus.ts` is already exactly this shared 4-substrate leaf. |
| `dock/composables/dockContext.ts` | `_shared/dock-context.ts` | 5 files / 4 foreign components read it. **This is the `dock → dropdown-menu → dock` cycle**, the only cycle in 62 nodes. An ambient-chrome context is module-level; dock is a writer, not the owner. |
| `dock/composables/useDockHold.ts` | `_shared/hold.ts` | `slider/Slider.vue:13,92`. |
| `tabs/composables/useTabRovingFocus.ts` | `_shared/roving-focus.ts` | `src/composables/motion/morph/useSelectionGroup.ts:13` reaches three levels up into one component's private `composables/` — the single JS layer inversion in the repo. |
| `src/components/deck/**` (5 files) | `src/composables/deck/{index,constants,use,keyboard}.ts` | No SFC. Not a component. |
| 26 × `src/components/**/*.md` | `docs/components/<name>.md` or delete | `package.json.files = ["dist"]`; none ships. Third doc channel beside `docs/` and the stories, and the only incomplete one (42% coverage, 11→551 lines). |
| `aurora/constants/shaders/*` (14) | `aurora/shaders/*` | Depth 6 → 5; the only depth-6 files in `src`. |
| `typewriter/utils/*` (5) | `typewriter/*` | The only `utils/` in the tree; `utils` names nothing. 9 files flat — the size of `card/`, needs no sub-module. |
| `sortable-list/composables/*` (6, minus `useSortable`) | `sortable-list/drag/*` | 1 of 7 is a composable. It is a drag engine; name the dir for what it is. |
| `dock/styles/controls.css` imports + rules | `dock/styles/index.css` tail | `src/styles/index.css:183,184` adjacent, same `@layer` → source-order-identical. Also kills the `controls.css` ↔ `controls/` sibling stem collision. |

---

## 3 · AGGLOMERATIONS

**`_shared/parts.ts`** (new, ~40 lines — the one place the boilerplate lives):
- `slotPart(name, {tag, slot, class})` → `FunctionalComponent<{class?: ClassValue}>`; renders `tag` (default `div`) with `data-slot`, `cn(class, props.class)`, default slot. `.inheritAttrs`/`.displayName` set on the function.
- `primitivePart(name, resolve, opts)` → host resolved per-render (the `useMenuPart`/reka case), attrs through `fixedHostAttrs()` (`_shared/primitive.ts:26`), emits forwarded from `ctx.emit`.

| resulting file | absorbs | contents at function level |
|---|---|---|
| `table/parts.ts` | 9 SFCs, 177 nb | `slotPart` × 9 — `Table` (overflow wrapper + `<table>` + 4 aria props), `Body Caption Cell Head Header Row`; `Empty` keeps a body (`Row > Cell colspan` + centring div) |
| `dropdown-menu/parts.ts` | 11 SFCs, ~430 nb | `primitivePart` × 11 — `Group Label Separator Shortcut Sub SubTrigger SubContent Item RadioGroup RadioItem CheckboxItem`. `Trigger.vue` (80L) + `Content.vue` (92L) stay SFCs |
| `select/parts.ts` | 6 SFCs, 172 nb | `Group Label Separator ScrollUpButton ScrollDownButton Value` |
| `dialog/parts.ts` | 6 SFCs, 83 nb | `Close Trigger Header Footer Title Description` |
| `drawer/parts.ts` | 4 SFCs, 85 nb | `Title Description Header Footer` |
| `card/parts.ts` | 5 SFCs, 64 nb | `Action Content Description Footer Title`. `Header.vue` stays (`useScrollTrigger` + `hasRoomToCondense`) |
| `command/parts.ts` | 4 SFCs, 78 nb | `Empty Group Separator Shortcut` |
| `toast/parts.ts` | 4 SFCs, ~80 nb | `Action Close Title Description` |
| `number-field/parts.ts` | 3 SFCs, 64 nb | `Content Increment Decrement` |
| `tags-input/parts.ts` | 3 SFCs, ~77 nb | `Item ItemText ItemDelete` |
| `metric/parts.ts` | 3 SFCs, ~60 nb | `Cell Row Stack` |
| `accordion/parts.ts` | 3 SFCs | `Item Content Trigger` (each one reka forward + one `cn`) |

Non-part folds: `drawer/snap.ts` ← `useDrawerSnap.ts` + `drawerSnapContext.ts` (one provider, one consumer) · `constellation/field.ts` ← `+ createConstellationField.ts` (a `createField` over `field.ts`'s own type) · `carousel/use.ts` ← `+ arrival.ts + interface.ts` (28+28 → 120 total) · `aurora/use.ts` ← `+ configSource.ts` (19 L, 1 export) · `blob/Blob.vue` ← `+ resolveBlobSurface.ts` (11 L, 1 export) · `search/fuzzy.ts` ← `+ types.ts` · `infinite-scroll/use.ts` ← `+ types.ts` · `command/types.ts` dissolves into the 5 SFCs that own each Props · `blob/index.ts` becomes `export * from "./config"` (kills the verbatim 23-line duplication).

Barrels struck: `_shared/index.ts` (2 lines, 1 consumer → point `src/forms.ts:24` at `./components/_shared/control-size`) · `search/composables/index.ts` · `infinite-scroll/composables/index.ts` · `dock/composables/index.ts` (dual path).

---

## 4 · SPLITS

Only where a **code**-line measure justifies it (`scratchpad/adj-code.mjs`; the 5 prose-inflated files at 54–69% comment are **not** split):

| file | code | seam |
|---|---|---|
| `constellation/composables/useConstellation.ts` | **460** | One export at `:86`; **~310 lines inside a single `onMounted` at `:153`** — the worst in the zone. Split field-init / renderer-attach / pointer-bind out of the closure into `use.ts` + `field.ts` + `interaction.ts` (which already exist). |
| `easing/EasingPicker.vue` | 437 | SVG pointer-drag + keyboard nudge → `use.ts` (which is already there and already called at `:83`); clipboard + status → `Easing.vue`. |
| `data-table/DataTable.vue` | 421 | `getNestedValue`/`getCellValue` data access → `access.ts`; roving keyboard → `_shared/roving-focus.ts` (the hoisted one). |
| `slider/Slider.vue` | 348 code **+ 347 style** | Two variants (standard + spectrum) in a 3-file dir with no sheet → `slider/styles/{index,spectrum}.css`. |
| `timeline` | **1,197 inline style lines across 6 SFCs** | → `timeline/styles/` under the stated 500-line partial bound. |
| `dock/composables/useDockState.ts` | 282, one export at `:86` | Four machines in one closure; the hold ledger touches the FSM only through `scheduleCollapse`. Split is available but **not owed by D3** — it is one file at goldilocks size. Recorded, not prescribed. |

---

## 5 · RENAMES UNDER MODULE-NAME STRIPPING

`scratchpad/adj-strip.mjs`, tokenizing kebab/snake/camel/dot against **every ancestor**: **176 strips, 62 anchors, 241 already clean** over 479 `.ts`/`.vue`/`.css`. Anchors do not rename. Files absorbed by §3 need no rename. Export **identifiers are unchanged** — the barrel keeps `export { default as DialogContent } from "./parts"`. Zero public-surface delta from renaming.

**Anchors corrected to `PascalCase(dir)` (R1 beats the mechanical strip):**
`dock/GlassDock.vue → Dock.vue` · `timeline/GlassTimeline.vue → Timeline.vue` · `tabs/SegmentedTabs.vue → Tabs.vue` · `typewriter/TypewriterText.vue → Typewriter.vue` · `search/SearchBar.vue → Search.vue` · `easing/EasingConfigurator.vue → Easing.vue`. `Glass*` is vestigial branding on a module already named for its material.

**SFCs that survive the folds:**
```
card/CardHeader→Header · carousel/{Content,Item,Pager} · command/{Dialog,Input,Item,List}
configurator/{Layer,Row} · dialog/{Content} + ModalOverlay→Overlay · drawer/{Content,Overlay}
dropdown-menu/{Content,Trigger} · easing/EasingPicker→Picker
dock/{BackgroundToggle,Control,Crossfade,Layer,LayerGroup,Separator,Trigger}
select/{Content,Item,Trigger} · tags-input/TagsInputInput→Input · tooltip/{Content,Trigger,Provider}
timeline/{Continuous,Scrubber,Segmented} · avatar/{Image,Fallback} · collapsible/{Trigger,Content}
alert/{Title,Description} · toggle-group/Item · radio-group/Item · popover/{Content,Trigger}
```
`ModalOverlay.vue` is one of the 16 un-prefixed minority; `Overlay.vue` puts it on the rule and matches `drawer/Overlay.vue`.

**TS/CSS:**
```
_shared/disclosure/disclosure-context.ts → disclosure/context.ts
_shared/field/{fieldControl.ts, field-control.css, field-surfaces.css} → field/{control.ts, control.css, surfaces.css}
_shared/feedback/feedback-tone.css       → _shared/feedback.css          [1-file dir dies]
_shared/menu/menu.css                    → _shared/menu-row.css          [dir dies]
_shared/resolveSurfaceClass.ts           → _shared/resolve-surface-class.ts
_shared/useMotionAxis.ts                 → _shared/motion-axis.ts
card/card-scroll.css                     → card/scroll.css               [ordinal PRESERVED]
chip/chipVariants.ts                     → chip/variants.ts
search/searchVariants.ts                 → search/variants.ts
metric/coalesce-metric.ts                → metric/coalesce.ts
toast/use-toast.ts                       → toast/use.ts
carousel/useCarousel.ts                  → carousel/use.ts
configurator/useConfiguratorState.ts     → configurator/use-state.ts
dropdown-menu/useMenuTrigger.ts          → dropdown-menu/menu.ts
pager-dots/pagerWindow.ts                → pager-dots/window.ts
dark-mode-toggle/dark-mode-toggle.css    → dark-mode-toggle/styles.css
dialog/placement.css                     → dialog/styles.css             [ordinal PRESERVED]
dock/styles/dock.css                     → dock/styles/shell-core.css    [stem ≠ ancestor]
constellation/constellation{Field,Interaction,Render,Types,Well}.ts → {field,interaction,render,types,well}.ts
```

**Contexts — 12 files, 5 shapes → one:** `X/context.ts` at the module root (already the plurality: number-field, sortable-list, tags-input), `<qualifier>-context.ts` when a module owns >1.
```
command/dialogContext.ts   dialog/dialogStageContext.ts   popover/popoverContext.ts
toggle-group/toggleGroupContext.ts                                    → X/context.ts
dock/composables/dock{Crossfade,Rail}Context.ts → dock/{crossfade,rail}-context.ts
dock/composables/dockContext.ts                 → _shared/dock-context.ts   [§2]
drawer/composables/drawerSnapContext.ts         → merged into drawer/snap.ts [§3]
```

**Created by the dir dissolutions:**
```
aurora/composables/{useAurora,useCursorInteraction,auroraFallbackGround,auroraImageSource,
                    frameLoop,runtime,color,atoms,atoms-fields}
   → aurora/{use,cursor,fallback-ground,image-source,frame-loop,runtime,color,atoms,atoms-fields}.ts
aurora/composables/{glSetup,uniformBridge,textureUpload}     → aurora/gl/{setup,uniforms,texture}.ts
aurora/composables/{wgpuSetup,uniformBridgeWGPU,uniformBridgeWGPUImage}
                                                            → aurora/wgpu/{setup,uniforms,uniforms-image}.ts
aurora/constants/{presets,renderMode}.ts                    → aurora/{presets,render-mode}.ts
aurora/constants/shaders/aurora{.frag,.vert,.wgsl}          → aurora/shaders/{frag,vert,wgsl}.ts
aurora/constants/shaders/aurora-{image.frag,image.wgsl,mediums.wgsl} → aurora/shaders/{image-frag,image-wgsl,mediums-wgsl}.ts
blob/composables/{blobSimulation,satelliteKinematics,useBlobMood,useBlobPointer,useBlobSatellites,easing}
   → blob/{simulation,kinematics,mood,pointer,satellites,easing}.ts
blob/composables/{buildMetaballProgram,uploadBlobUniforms,useMetaballRenderer} → blob/gl/{program,upload,renderer}.ts
blob/composables/{wgpuSetup,uniformBridgeWGPU}              → blob/wgpu/{setup,uniforms}.ts
fourier-field/composables/{fourierFieldGLSetup,fourierFieldWGPUSetup,useFourierField,uniformBridgeWGPU}
   → fourier-field/{gl,wgpu,use,uniforms}.ts
fourier-field/shaders/fourier-field.{glsl,compute.wgsl,render.wgsl,ribbon} → shaders/{glsl,compute-wgsl,render-wgsl,ribbon}.ts
constellation/composables/useConstellation.ts               → constellation/use.ts
data-table/composables/useDataTable{Responsive,RowIdentity} → data-table/{responsive,row-identity}.ts
tabs/composables/useTab{DragMorph,Responsive}               → tabs/{drag-morph,responsive}.ts
sortable-list/composables/{useSortable → use.ts; dragController,dropResolver,ghostRenderer,
                           touchGate,transitionTiming,types → drag/{controller,drop,ghost,touch,timing,types}.ts}
search/composables/{useFuzzySearch,fuzzySearchIndex}        → search/{fuzzy,fuzzy-index}.ts
typewriter/{composables/useTypewriter, utils/{graphemes,keyboard,pausePatterns,timing,typoStateMachine}}
   → typewriter/{use,graphemes,keyboard,pauses,timing,typo-state}.ts
handmark/composables/useHandMark.ts → handmark/use.ts; {freehand,geometry,brush} → stroke/; {ink,texture,noise} → ink/
{completion-seal,easing,fading-scroll,infinite-scroll}/composables/use*.ts → X/use.ts   [4 one-file dirs die]
pager-dots/composables/usePagerWorm.ts                      → pager-dots/worm.ts
deck/composables/{useDeck,useDeckKeyboard}                  → src/composables/deck/{use,keyboard}.ts
```

The three `uniformBridgeWGPU.ts` are **not** duplicates (`AURORA_WGPU_UNIFORM_BYTES=672` / `BLOB=592` / `FOURIER_COMPUTE=32`). Under `wgpu/uniforms.ts` the path disambiguates — that is edict 3's argument, not a fold.

---

## 6 · DELETIONS

| what | ground | evidence |
|---|---|---|
| `paper-backdrop/` — 3 files, 1 dir, 1 subpath, 1 barrel row, 1 contract test, 1 demo route | **SUPERFLUITY** | `PaperBackdrop.vue` is 18 lines; body is `<div class="paper-underpaint" data-slot aria-hidden />`. `paper-underpaint` is `@utility` at `src/styles/paper.css:99`, shipped on `./styles`. Writing the class on any div is identical. Its own demo blurb concedes it. |
| `src/components/PROCEDURAL-SUITE.md` + 25 README/DESIGN.md — 2,411 lines | **VACUITY as shipped artefact** | `package.json.files = ["dist"]`. Nothing under `src/` reaches a consumer. 42% coverage (26/62), 11→551 lines, a third doc channel that is neither published nor complete. |
| `_shared/index.ts` | **SUPERFLUITY** | 2 lines re-exporting 2 symbols from 1 of 10 modules; **one** consumer (`src/forms.ts:24`). The other 143/42/28/20 importers of `class-names`/`primitive`/`axes`/`selection` deep-path correctly. The barrel lies. |
| `dock/composables/index.ts` | **DUAL PATH** | `dock/index.ts` imports through it at `:40,:87,:88` *and* around it at `./composables/{useDockShellProps,dockCrossfadeContext,dockContext}`. Either it is the seam or it isn't; every consumer is inside `dock/`, so it isn't. |
| `search/composables/index.ts`, `infinite-scroll/composables/index.ts` | **SUPERFLUITY** | 5 and 2 lines, re-exporting into a dir that already has `../index.ts`. |
| `dock/styles/controls.css` (as a file) | **SUPERFLUITY** | 90 lines, 4 `@import`s + 3 rules. Its header documents partials at `dock-controls/` — `ls src/components/dock/styles/dock-controls` → *No such file or directory*. Ordinal-adjacent fold into the styles root is byte-order-identical. |
| the 4 tombstone comments in `src/components/index.ts` | **VACUITY** | `hover-card`, `multi-select`, `sheet`, `ui/Tabs` — retired components documented in a live barrel. No legacy code, no legacy prose. |
| `aurora/composables/configSource.ts` (19L, 1 export) · `blob/composables/resolveBlobSurface.ts` (11L, 1 export) | **SUPERFLUITY** | One export, one consumer, no seam. Fold. |
| `blob/config.ts` lines 15–37 (not the file) | **DUPLICATION** | Verbatim duplicate of `blob/index.ts:2-26`. `index.ts` becomes `export * from "./config"`; the value.js-free door survives. |
| `src/composables/glass/webgl/shaders/flow.{glsl,wgsl}.ts` | **SUPERFLUITY of location** | Two importers, both in aurora, one import statement apart from a same-named sibling. |

**Explicitly NOT deleted:** the 42 zero-consumer components. Consumer count is not a ground (Rule 2), and none of them was shown vacuous or superfluous in this dimension. `constellation` (25 props / 0 consumers / 2,442 lines) is D4's ruling, not D3's.

---

## 7 · TEST DISPLACEMENT

**Tests inside `src/`: ZERO. Nothing is owed by this zone.**
```
find src demo -type f \( -name '*.test.*' -o -name '*.spec.*' -o -path '*__tests__*' -o -name '*.bench.*' \)   → empty
grep -rlE "from ['\"](vitest|@jest|jest|@testing-library)" src demo                                            → empty
```
All three benches agree; I re-ran both. The isomorphism is broken in the **other** direction — recorded here because it is the same edict, and owed to the `tests/` seat:

| break | count | mechanical target |
|---|---:|---|
| `tests/components/{ui,custom}/` interposes a taxonomy `src/components/` deleted in `9a8761f0` | **84 files, 28 dirs** | `tests/components/{ui,custom}/<X>/*` → `tests/components/<X>/*`. `comm -12` on the two listings → **empty**; zero collisions. `9a8761f0`'s own Evidence paragraph claims *"No ui/custom imports or directories remain"* — false at HEAD. |
| flat dotted files at `tests/components/` | **50** | `accordion.contract.test.ts` → `accordion/contract.test.ts` (the dotted infix repeats the module — edict 3 applies to tests). |
| tests at the `tests/` root | **4** | `menuRowClass.spec.ts` → `components/select/row-class.test.ts` (follows §2); `configurator-recursion.spec.ts` → `components/configurator/recursion.test.ts`; `lifecycle-cleanup.spec.ts` + `public-surface.spec.ts` are cross-cutting → `tests/gates/`. |
| non-test files in `tests/` | 2 | `tests/styles/tokenGraphDetector.ts`, `tests/governance/fixtures/captureEventMethod.ts`. |

---

## 8 · WHAT BREAKS

**Export subpaths: 72 → 71.** `./paper-backdrop` **struck** (component deleted) — `package.json` `exports` + `typesVersions` rows, `subpath-policy.mjs` `COMPONENT_CLASS` row, `public-surface.spec.ts:28,:275`, `tests/components/paper-backdrop.contract.test.ts`, `demo/stories/foundations/paper-texture.vue`, the vite entry map. `./deck` **survives at the same specifier**, retargeted from `src/components/deck` to `src/composables/deck` — its policy row moves `COMPONENT_CLASS → COMPOSABLE_CLASS` and the entry map re-resolves. `./blob-config` unchanged (`config.ts` stays the entry). No other subpath moves.

**Public symbol deletions (breaking, and allowed):** `useDragVelocity` off `/dom` and `public-surface.spec.ts:221`; `useLeadTrail` **not touched** (D4's ruling, per WRONG-HOME); `useDockCtaReceive` off `/motion` (`public-surface.spec.ts:451` keeps its DOCK row; the noted "the /motion export STAYS — a re-export" is precisely the dual path being struck); `useSelectionGroup` off `src/index.ts` + `/motion-core` **if** the conditional resolves to colocate; `useAccentTone`/`accent-tone-solve` off `/color`; `useScrollChrome` off `/motion-core`. `useGlassBackdropLuminance` + 3 leaves: **zero** delta — `glass` is `INTERNAL` at `subpath-policy.mjs:103`.

**Root barrel.** `src/components/index.ts` loses 4 tombstone comments, no export rows. `src/index.ts:47,:78` comments reference `export * from "./components"` — prose only, no edge.

**Component-name identifiers: unchanged.** Every file rename is internal; barrels keep `export { default as GlassDock } from "./Dock.vue"`. `GlassDock`, `GlassTimeline`, `SegmentedTabs`, `TypewriterText`, `SearchBar` stay as exported names unless D4 rules otherwise. Renaming the *symbols* is a separate, larger break and is not this dimension's.

**CSS reachability — both mechanisms.** The `@import` closure from `src/styles/{index,glass}.css` reaches **20** component files; SFC `<style src>` reaches **13**; the two sets are a strict partition with **zero** overlap. **D3 does not re-route reach.** Every moved sheet keeps its ordinal:
- `glass-chip.css` → `chip/styles.css`: `glass.css:92` rewrites in place (precedent `glass.css:64`).
- `card-scroll.css` → `card/scroll.css`: **rename only**; `index.css:193` is five rungs below `:185` and the fold was refused.
- `dialog/placement.css` → `dialog/styles.css`, `dark-mode-toggle/dark-mode-toggle.css` → `styles.css`: rename in place at `:225`, `:181`.
- `dock/styles/controls.css` folds into `dock/styles/index.css`'s import tail; `src/styles/index.css` drops `:184`. `:183/:184` are adjacent in the same `@layer components` → source order identical.
- The `.dropdown-menu-content` block move crosses a layered → unlayered boundary and is **gated on a paired capture**; it does not ship on a directory ruling.
- `tabs/styles/` gains an `index.css` root; `src/styles/index.css:212,:217` collapse to one import at `:212`'s ordinal (adjacent, same layer).

**Demo.** `demo/stories/foundations/paper-texture.vue` deleted with its manifest row. Deep-path `@glass/...` imports into moved files re-point (`demo/stories/dock/cta-receive.vue`, `demo/stories/substrates/glass-material.vue`, `demo/stories/motion/scroll/ScrollReaderBody.vue`, `demo/shell/AppShell.vue:215` comment). `demo/composables/virtual/` is routed to the demo D3 seat, not adopted here.

**Vue-level risk of `parts.ts` (named, not prescribed away).** `defineOptions({name})` → the function's `displayName`; `inheritAttrs:false` → `Comp.inheritAttrs = false`; `defineSlots<{default?: () => unknown}>` → the slots type parameter. `findComponent('<string>')` appears in exactly **2** test files (`select.contract`, `popover.contract`) — neither targets a folded part. **29** test files assert `data-slot`, which the factory must keep emitting. Contract tests mount by import, not by filename, so they survive the move.


# ═══════════ ZONE SETTLEMENT (37176 chars) ═══════════

Verified. Now the settlement.

---

# D3 · TESTS ZONE — TERMINAL SETTLEMENT

Verified against disk at `0371836d`. All three benches are partly right and all three make the same category error, ruled in §0.

---

## §0 · THE GOVERNING RULING — the tests zone has no independent granularity

All three benches proposed a *tests-tree* granularity policy. That is the error.

**Edict 4 (isomorphism) subordinates edicts 2 and 3 wherever a `src/` twin exists.** A test file's path and name are a pure function of its subject's path and name. The tests tree may only be re-shaped where it invents structure `src/` does not have.

Proof that this is not academic:

```
$ ls src/composables/glass/webgpu   → rendererStatus.ts useGpuSubstrate.ts useWebGPUCanvas.ts webgpuCanvasTypes.ts webgpuDevice.ts
$ ls src/composables/glass/canvas2d → index.ts resolveCanvasColor.ts useCanvas2D.ts
```

`tests/composables/glass/webgpu/useWebGPUCanvas.test.ts` is **already a perfect mirror**. SAND's rename of it to `tests/composables/glass/webgpu.test.ts`, and its collapse of `glass/` 6→5, would *manufacture* the isomorphism break it was hired to find. **OVERRULED wholesale.** Same for `resolveCanvasColor`, `useCanvas2D`, `useWebGLCanvas`, `visibility`.

Likewise `src/components/dock/GlassDock.vue` exists. GOD's and WRONG-HOME's strip `GlassDock.motion-parity.test.ts` → `dock/motion-parity.test.ts` **OVERRULED** — the module-name is not repeated, the *file* name is mirrored. Correct target: `tests/components/dock/GlassDock.test.ts`.

**Every goldilocks complaint against `tests/composables/motion/` is a complaint against `src/composables/motion/`** (`engage/` is a one-file src directory holding `engageEnvelopes.ts`). It is **ROUTED TO THE `src` ZONE ADJUDICATOR**. The tests tree mirrors whatever src settles; it must not pre-empt.

**THE RULE, three clauses:**
1. `src/<p>/<f>.{ts,vue}` → `tests/<p>/<f>.test.ts`. Exact name, exact path.
2. A test whose subject is the module *barrel* mirrors `index.ts` as the **stem file** beside the mirror directory: `tests/components/accordion.test.ts` ≡ `src/components/accordion/index.ts`. This is the repo's own idiom, measured — **12 file+directory stem-sharing pairs** in `src/`+`demo/` (`src/styles/glass.css`+`glass/`, `tokens.css`+`tokens/`, `theme.css`+`theme/`, `typography.css`+`typography/`, `utilities.css`+`utilities/`, `tokens.ts`+`tokens/`, `dock/styles/controls.css`+`controls/`, `demo/stories/manifest.ts`+`manifest/`, `data/timeline.vue`+`timeline/`, `motion/scroll.vue`+`scroll/`, `substrates/aurora.vue`+`aurora/`, `substrates/fourier-field.vue`+`fourier-field/`).
3. A test that sweeps **N unrelated modules** to assert a repo-wide rule is an **INVARIANT**, not a mirror. Flat in `tests/invariants/`.

Suffix: `.test.ts` + `.test-d.ts`. Nothing else. Case follows the src twin.

The discriminator between clauses 1 and 2 is mechanical:
```
$ grep -ohE "@glass/components/[a-z-]+$" <file>   # barrel only → stem file
```
Run on the 7 disputed `ui/*/X.test.ts`: **all seven import the barrel alone** (`Alert.test.ts: @glass/components/alert` …). Nine single-file directories evaporate without a judgement call.

---

## §1 · THE TARGET TREE

```
tests/
  _support/                              5   setup.ts  shims.d.ts  mount-composable.ts
                                             invariant.ts  chip-listener.setup.ts
  components/
    <46 stem files>.test.ts                  accordion alert animated-digit avatar badge button
                                             card checkbox chip collapsible command dark-mode-toggle
                                             deck easing expandable-container fading-scroll
                                             fourier-field header-ribbon input instrument-chassis
                                             label labeled-field metric number-field paper-backdrop
                                             popover progress radio-group scroll-progress-rim select
                                             separator skeleton slider status-dot surface switch
                                             table tags-input textarea toggle-group tooltip
                                             watercolor-dot  (+ carousel infinite-scroll pager-dots
                                             toast, each also carrying a leaf dir below)
    completion-seal.test.ts                  OWED — the one src module with zero unit coverage
    _shared.test-d.ts
    _shared/                             4   valueDomain · useMotionAxis · class-names · menu/menuRowClass
    aurora.test-d.ts?  —                     (none today)
    aurora/                              7   Aurora · composables/{atoms,color,uniformBridge,runtime}
                                             constants/renderMode · constants/shaders/mediums.glsl
    blob/                                2   Blob · composables/blobSimulation
    carousel/                            1   arrival
    chip.test-d.ts  command.test-d.ts  dropdown-menu.test-d.ts  toast.test-d.ts
    configurator/                        2   Configurator · ConfiguratorLayer
    constellation/                       4   Constellation · constellationField
                                             constellationInteraction · constellationRender
    data-table/                          3   DataTable · composables/{useDataTableResponsive,
                                                                      useDataTableRowIdentity}
    dialog/                              3   Dialog · ModalOverlay · sheet-motion
    dock/                                8   GlassDock · DockControl · DockBackgroundToggle · DockLayer
                                             composables/{dockContext,dockCrossfadeContext,
                                                          dockMorphMeasure}  (+1 .test-d)
    drawer/                              3   Drawer.{detents,motion-lifecycle,reserve}
    dropdown-menu/                       1   DropdownMenuTrigger
    handmark/                            4   HandMark · geometry · brush · texture
    infinite-scroll/                     1   composables/useInfiniteScroll
    pager-dots/                          1   composables/usePagerWorm
    search/                              2   composables/{fuzzySearchIndex,useFuzzySearch}
    sortable-list/                       1   composables/useSortable
    tabs/                                1   SegmentedTabs
    timeline/                            3   GlassTimeline · geometry (+1)
    toast/                               1   use-toast
    typewriter/                          1   TypewriterText
  composables/                               EXACT mirror of src/composables — shape is src's to settle
    color/ dark/ dom/ keyboard/ reactive/ sidebar/
    glass/ glass/{canvas2d,webgl,webgpu}
    motion/ + subdirs as src/composables/motion settles
  demo/                                      EXACT mirror of demo/
    router.test.ts
    chassis/{landing,code,routeTransition}/  composables/virtual/  shell/  stories/
  invariants/                         17     the tree-walkers + cross-module sweeps (§2d)
    boot-graph.test.ts  boot-graph/{graph.ts, graph.test.ts}
    public-surface.test.ts  public-surface/manifest.ts
    public-surface.test-d.ts  public-contracts.test-d.ts
    token-graph.test.ts  token-graph/detector.ts
    …
  scripts/                             1     profile-bundle.test.ts   ≡ scripts/profile-bundle.mjs
  styles/                              2     typography.test.ts · glass/track-well.test.ts

tests-visual/                                workspace root SURVIVES (§3)
  components/{aurora,blob,constellation,dock}/       12+9+8+5
  components/<24 flat single-component specs>.spec.ts
  styles/{glass,scheme}/
  motion/
  demo/
  gates/
  engine/webkit/
  _support/            page.ts · color.ts · pixel.ts · scene.ts · paths.ts
  _harness/            testIgnore'd — the wave-scratch + capture specs that survive triage
```

**Honest arithmetic.** `tests/` goes **217 → ~196 files**, 53 → ~50 directories. SAND's headline (217 → 122, −72% dirs) is **OVERRULED**: it was bought by collapsing mirrors that edict 4 mandates. The tests zone's defect was never its file count. It is **84 files in a fossil path, 3 invented buckets, 4 naming conventions, 23 single-file directories, and one god-directory in `tests-visual/`.** Single-file directories fall **23 → 4**.

---

## §2 · MOVES

### 2a · The fossil — 84 files (SUSTAINED, WRONG-HOME, and it is the root cause)

```
$ git log --oneline -1 9a8761f0   → refactor(structure/ms4): flatten component families into one semantic home
$ git ls-tree -d --name-only 9a8761f0^ src/components/  → _shared custom metric sortable-list ui
$ ls -d src/components/ui src/components/custom          → No such file or directory
$ git show 9a8761f0 --name-status --find-renames | grep '^R' | grep -c tests/  → 0
$ git show 9a8761f0 --name-only | grep -c '^tests/'                            → 57
```

**The flatten repointed 57 test files' imports and renamed none.** `tests/components/{ui,custom}/` is a cast of a demolished building. Every other defect in the zone is downstream.

| current | target | ground |
|---|---|---|
| `tests/components/custom/<X>/**` (59) | `tests/components/<X>/**` | `src/components/custom/` does not exist |
| `tests/components/ui/<X>/**` (25) | `tests/components/<X>/**` | `src/components/ui/` does not exist |

`ui/` is the shadcn vestige (D8). Delete both levels.

### 2b · Two conventions colliding on one module — 5 straddles (SUSTAINED)

Resolved by §0's barrel/leaf discriminator, not by a preference:

| module | barrel test → stem file | leaf test → directory |
|---|---|---|
| dialog | — | `ui/dialog/*` → `dialog/` |
| slider | `slider.contract` + `ui/slider/Slider.marks` (**both barrel**) | — merge, **no directory** |
| command | `command.contract` + `ui/command/CommandDialog` (**both barrel**) | — merge, **no directory** |
| dropdown-menu | `dropdown-menu.contract` | `custom/dropdown-menu/DropdownMenuTrigger.action` |
| typewriter | `typewriter.contract` | `custom/typewriter/TypewriterText.contract` |

### 2c · Path disagrees with the dependency graph — 11 (SUSTAINED except one)

Every row verified by reading the file's own import list.

| current | target | its actual imports |
|---|---|---|
| `components/custom/timeline/timeline-event-choices.test.ts` | `tests/demo/stories/data/timeline.test.ts` | `../../../../demo/stories/data/timeline.vue` — **zero `src/`** |
| `components/dialog.confirm-preset.test.ts` | `tests/demo/stories/feedback/confirm-dialog.test.ts` | 3 demo stories, **zero `src/`** |
| `composables/sortable/drag-ring-radius.test.ts` | `components/sortable-list/composables/useSortable.test.ts` | `components/sortable-list/composables/useSortable`; **`src/composables/sortable/` does not exist** |
| `components/custom/blob/resolveColor.test.ts` | `composables/color/resolve.test.ts` | `@glass/composables/color/index` **only** |
| `components/custom/blob/blob-color-equivalence.test.ts` | `composables/color/equivalence.test.ts` | `src/composables/color` **only** |
| `utils/cn.test.ts` | `components/_shared/class-names.test.ts` | `components/_shared/class-names` |
| `menuRowClass.spec.ts` | `components/_shared/menu/menuRowClass.test.ts` | `components/_shared/menu/menuRowClass` |
| `components/ui/slider/dock-hold-contract.test.ts` | `components/dock/composables/dockContext.test.ts` | subject is `dock/composables/dockContext`; slider is the harness |
| `components/ui/_shared/useMotionAxis.test.ts` | `components/_shared/useMotionAxis.test.ts` | `components/_shared/useMotionAxis` |
| `configurator-recursion.spec.ts` | `components/configurator/Configurator.test.ts` (merge) | `components/configurator` + `components/tabs` |
| `styles/{track-well-fold,typed-track-seam}.test.ts` | `styles/glass/track-well.test.ts` | both import progress+slider; subject is `src/styles/glass/track-well.css` |

**OVERRULED — `composables/color/warm-catch-light.test.ts`.** WRONG-HOME moved it to `components/aurora/composables/uniformBridge.test.ts`. Disk says otherwise:

```
warm-catch-light.test.ts:11  import { warmCatchLight, oklchToLinear } from "@glass/composables/color";
warm-catch-light.test.ts:12  import { AURORA_CATCH_LIGHT_ANCHOR } from "@glass/components/aurora/…/uniformBridge";
warm-catch-light.test.ts:30  describe("warmCatchLight OKLCh derivation", …
```

The aurora import is a **fixture constant**, not the subject. **STAYS PUT.**

### 2d · Invented buckets — `gates/ governance/ scripts/ utils/ styles/ a11y/` (SUSTAINED, WRONG-HOME's three-population split)

Measured: `tests/gates/*` carry **8 tree-walk sites** (`grep -c 'readdirSync\|globSync'` → 2 each × 4). `tests/styles/*.test.ts` carry **zero** — they read **46 unique pinned `src/…` literals across 20 files**. `tests/public-surface.spec.ts` imports 37 src modules. These are not mirrors.

**Into `tests/invariants/` (17):**
`gates/{boot-graph,orphan-css-partial,token-hygiene,type-hygiene}` · `styles/{glass-subtlety,placeholder-contrast,prm-no-resurrection,radius-dialog-bind,radius-role-canon,token-graph}` + `tokenGraphDetector.ts` · `components/a11y/decorative-icon-sweep.test.ts` (sweeps number-field+carousel+dialog) · `components/ui/reka-binding-idiom.test.ts` (sweeps button+switch+tags-input+command+toast) · `public-surface.spec.ts` · `lifecycle-cleanup.spec.ts` (sweeps expandable-container+typewriter — **do not split it, the sweep is the point**) · the 3 pseudo-module `.test-d.ts`.

**Into `tests/_support/` (5):** `setup.ts` `shims.d.ts` `utils/mountComposable.ts` `governance/governedInvariant.ts` `governance/chipListener.setup.ts`.

`tests/governance/` is the sharpest case: **all three of its files are non-tests**. It is a support directory named as if it were a subject.

**Stays a mirror:** `styles/typography.test.ts` (reads `src/styles/typography/scale.css` alone) · `scripts/profile-bundle.test.ts` ≡ `scripts/profile-bundle.mjs`.

**Non-test `.ts` under `tests/` — the rule, not a scatter.** A helper serving many tests lives in `_support/`. A helper serving exactly one test lives in the **stem directory** of that test — the same idiom as clause 2:

| helper | lines | consumers | target |
|---|---:|---:|---|
| `styles/tokenGraphDetector.ts` | 353 | 1 | `invariants/token-graph/detector.ts` |
| `components/custom/blob/metaball-color.glsl-port.ts` | 367 | 1 | `composables/color/equivalence/glsl-port.ts` |
| `governance/fixtures/captureEventMethod.ts` | 8 | 1 | **inline into `chip.test.ts`** — 8 lines is not a file |

**OVERRULED — SAND's "inline `tokenGraphDetector` and `glsl-port` into their callers."** That yields 791- and 823-line files, both larger than the constellation god-file I am splitting. And `glsl-port` is **named from shipped `src/` prose at 3 sites** as the canonical transcription. Both stay as files, in stem directories.

---

## §3 · `tests-visual/` — the real god-directory (SUSTAINED, GOD)

```
$ find tests-visual -maxdepth 1 -type f | wc -l   → 186
$ find tests-visual -maxdepth 1 -name '*.spec.ts' | wc -l → 176
$ find tests-visual -maxdepth 1 -name '*.ts' | xargs wc -l | tail -1 → 43790
```

**176 specs, 43,790 LOC, one flat directory** — 40% larger than `tests/`, zero internal structure. Live: `package.json:14` lists the workspace, `ci.yml:57` runs it.

**The proof it is a bag, not a module — the helpers are re-declared per file:**
```
56 setDark   24 setScheme   20 grab   12 parseColor   11 setMode   10 gammaEncode
 8 shot       8 median       7 relLuminance  7 contrastRatio  6 oklabToRgba  6 linearize
```
A colorimetry library is copy-pasted 5–10 ways across a suite whose entire job is measuring color. **108 of 176 specs redeclare `ROOT`/`OUT`/`EVIDENCE_DIR`.** Only 51 import any local module.

### The workspace root SURVIVES challenge (SUSTAINED, WRONG-HOME)
```
$ node -e '…' → root has playwright: false   root has pngjs: false
```
`tests-visual/package.json` isolates `@playwright/test` + `pngjs` off the library's publish surface (`files: ["dist"]`), and npm workspaces are directory-scoped. Folding it into `tests/` would drag Playwright onto the library. **The root is earned; the flat interior is not.**

### The flat shape is NOT config-pinned (SUSTAINED — WRONG-HOME's self-correction, re-verified)
```
$ grep -n 'startsWith("\*\*/")' node_modules/playwright/lib/util.js
129:      if (!pattern.startsWith("**/"))
130:        filePatterns.push("**/" + pattern);
```
Playwright auto-prefixes `**/`. `testDir:"."` + `testMatch:"*.spec.ts"` matches nested paths. **Nesting costs zero config change.** GOD's implicit assumption that the flat shape was forced is dead.

### Grouping — measured, not asserted
My own census (match spec stem against the 63 `src/components/` names):
```
12 dock · 9 blob · 8 aurora · 5 constellation · 2 card · 2 search · 1 × 18 others
--- matched: 56   unmatched: 120
```
**Only 56 of 176 specs name a component.** GOD's per-group counts (aurora 15, blob 13, dock 14, `<20 others>` 30) are **inflated and OVERRULED**; the shape of its proposal survives. And GOD's `components/<20 others>/` — **20 single-file directories** — is exactly the sand SAND was hired to find. **PARTIAL:** four component directories (dock 12, blob 9, aurora 8, constellation 5), the other **24 stay flat files** under §0 clause 2.

The 120 unmatched go to `styles/{glass,scheme}/`, `motion/`, `demo/`, `gates/`, `engine/webkit/`.

### `.webkit.` is a lie (SUSTAINED, WRONG-HOME)
`playwright.config.ts:127` scopes the `webkit` project to exactly three files — `safari-webgl`, `aurora-swraster`, `refract-lens-never-sharper`. `w1-radius-redress.webkit.spec.ts` and `w2-blur-redress.webkit.spec.ts` therefore **run on chromium**. Either add them to `testMatch` or strip the infix; do not ship a filename that asserts an engine it never sees.

### The mis-rooted write target (SUSTAINED — both benches, same defect)
```
w38-w47-verify.spec.ts:92,97   path: "docs/tranches/AX/audit/screens/W38-aurora-after-{light,dark}.png"
_veil-capture.spec.ts:8        const OUT = "docs/tranches/AZ/audit/visual";
$ git status --porcelain --ignored tests-visual → !! tests-visual/docs/
```
Bare-relative, so it resolves against the workspace cwd and **manufactured `tests-visual/docs/tranches/AX/audit/screens/`** — the repo's deepest non-`docs` path. Every sibling uses `${ROOT}docs/…`.

Correctly-rooted specs are hardwired to **eleven dead tranche letters** (`30 BC · 24 BA · 21 BB · 21 AZ · 19 AY · 13 BI · 12 BJ · 10 BG · 4 AX · 2 IOS · 1 BD`). A live suite writing into a closed archive on every run. **The output root is one `PI_OUT` env-defaulted constant in `_support/paths.ts`, not 157 literals.**

---

## §4 · AGGLOMERATIONS

Every merge concatenates files that already import **the same src module**. No test content is lost.

| resulting file | absorbs | contains, at function level | ground |
|---|---|---|---|
| `components/aurora/composables/color.test.ts` | `derive-color` + `derive-aurora` + `color-equivalence` | `deriveAurora()` — neon-seed gamut matrix, N-stop palette, value.js-core equivalence | **all three** import `aurora/composables/color`; SAND found two of the three |
| `components/aurora/composables/uniformBridge.test.ts` | `painterly` + `uniform-packing` | `uniformBridge` / `…WGPU` / `…WGPUImage` + `glSetup` byte layout | both import `uniformBridge*` |
| `components/aurora/composables/runtime.test.ts` | `presentation` + `runtime-failure` + `interaction-prm` | `runtime.ts` lifecycle, failure fallback, PRM interaction arm | all three import `composables/runtime` |
| `components/aurora/Aurora.test.ts` | `Aurora.init-error` + `Aurora.opacity-ceiling` | mount plane: init-failure path, opacity ceiling clamp | both mount `Aurora.vue` |
| `components/dock/GlassDock.test.ts` | the 8 `GlassDock.*.test.ts` | touch gate, manual interaction, motion parity, press keepalive, vertical collapse, scroll overflow, VT names, backdrop mode | all 8 mirror `src/components/dock/GlassDock.vue` |
| `components/dock/DockLayer.test.ts` | `DockLayerRail.a11y` | mounts `DockLayer.vue`+`DockLayerGroup.vue`+`DockCrossfade.vue`+`GlassDock.vue`; **`src/components/dock/DockLayerRail.vue` does not exist** — the filename names a phantom | verified against the src file list |
| `components/dialog/Dialog.test.ts` | the 7 `dialog-*` + `graded-backdrop` | attrs, close contrast, focus return, graded edge, show-close, spring, stage ownership, graded backdrop — 881 lines | none has a leaf src twin; all are `Dialog.vue` facets |
| `components/handmark/geometry.test.ts` | `geometry` + `morphology` + `hull-guard` | all three import `handmark/geometry` |
| `components/handmark/HandMark.test.ts` | `HandMark` + `highlight` | both mount `HandMark.vue` |
| `components/search/composables/*` | `search-contracts` folds into the two it duplicates | `search-contracts` imports the same 3 modules as its two siblings combined |
| `components/slider.test.ts` | `slider.contract` + `ui/slider/Slider.marks` | **both import the barrel alone** |
| `components/command.test.ts` | `command.contract` + `ui/command/CommandDialog` | both barrel-only |
| `components/configurator/Configurator.test.ts` | `Configurator.material` + `configurator-recursion.spec` | both import `components/configurator` |
| `composables/dom/useTokenColor.test.ts` | `composables/useTokenColor` + `composables/dom/useTokenColor` | **the only duplicate basename in the tree** (`find tests -name '*.test.ts' \| xargs -n1 basename \| sort \| uniq -d` → one hit); both import `@glass/composables/dom/useTokenColor` |
| `styles/glass/track-well.test.ts` | `track-well-fold` + `typed-track-seam` | both import progress+slider; subject `src/styles/glass/track-well.css` |
| `invariants/public-contracts.test-d.ts` | `disclosure` + `floating` + `primitive-display` `.public-contracts.test-d.ts` | **none of the three names a src module** (`disclosure`=accordion+collapsible, `floating`=popover+tooltip, `primitive-display`=avatar+button+card+label+separator+surface) |
| `tests-visual/reflect-medium.spec.ts` | `reflect-medium2` | 31+25 lines, 1 expect each, `"medium select opens"` / `"medium select (2nd combobox) opens"` — one subject, two comboboxes |

**OVERRULED — GOD's other serial duplicates.** I diffed them; they are not duplicates:
- `suffuse` (20 expects, 3 tests: display register, mega tier, thin-page grid) vs `suffuse2` (13 expects, 1 test: h1>h2 font-size). Different assertions.
- `motion-axis` (7 expects) vs `motion2` (16 expects, 3 tests: calm substrate, canon family polylines, stroke-readback JSON). Different subjects.

GOD flagged these as "owed, not prescribed (Law 6)." **That restraint was correct and I ratify it as NOT-A-FINDING.**

**OVERRULED — SAND's collapse of the 9 `.test-d.ts` into 1.** Five are genuine single-module mirrors (`chip`, `command`, `toast`, `dropdown-menu`, `dock/dockCrossfadeContext`) and stay with their modules. Only the 3 phantom-module files merge; `_shared/public-contracts.test-d.ts` becomes `components/_shared.test-d.ts`.

---

## §5 · SPLITS

| file | lines | seam | targets |
|---|---:|---|---|
| `gates/boot-graph.test.ts` | 639 | **405 lines of TypeScript-AST analyzer before the first `describe` at :405**; a self-test of that analyzer at `:565` | `invariants/boot-graph/graph.ts` (`scriptSource`, `importBindings`, `walk`, `dynamicImportTargets`, `scanStaticShellImports:212`, `scanAsyncShellDeclarations:230`, `scanFrame0Ground:262`, `scanAuroraBarrelImports:336`, `scanConfiguratorBarrelImports:353`, `measureEagerGraph:383`) · `invariants/boot-graph/graph.test.ts` (the `:565` self-test) · `invariants/boot-graph.test.ts` (the `:405` source arm + `:519` build arm) |
| `public-surface.spec.ts` | 509 | **460 lines of export-manifest data, one `describe` at `:461` holding 2 `it()`** | `invariants/public-surface/manifest.ts` (`uiRuntimeExports:44`, `composableRuntimeExports:93`, `rootRuntimeExports:109`, `subpathRuntimeExports:238`, `retiredSubpathRuntimeMembers:338`, `exactSubpathRuntimeSurfaces:355`) · `invariants/public-surface.test.ts` |
| `constellationField.test.ts` | 833 | the src-module boundary, not the describe boundary | `constellation/constellationRender.test.ts` ← the `:810` kVis describe, which **carries its own local imports at :753-755** (`BASE_WIDTH`, `DEFAULT_K_FLOOR`, `kVisOf`) and shares no fixture · the remaining 5 describes split `constellationField` / `constellationInteraction`. **The exact describe→module assignment is OWED** — it turns on the shared fixture block at :5-33, which I did not trace. Law 6: I localise the seam, I do not prescribe the cut. |
| `composables/glass/webgpu/useWebGPUCanvas.test.ts` | 487 | three src twins exist | `useWebGPUCanvas.test.ts` (degrade contract `:109`) · `webgpuDevice.test.ts` (async device acquisition `:189`) · `useGpuSubstrate.test.ts` (the WebGPU→WebGL2 picker `:378`) |
| `composables/glass/webgl/useWebGLCanvas.test.ts` | 515 | two subjects: substrate contract `:131`, context-loss circuit-breaker `:397` | second arm's twin is plausibly `createCanvasLifecycle.ts` — **OWED**, not verified |
| `styles/token-graph.test.ts` | 438 | 150 lines of mount machinery (`mountCarrier:84`, `carrier:106`, `analyzeWith:109`, `mutateSource:123`, `proveOriginForwarding:129`) before the `describe:151` | the harness follows its analyzer into `invariants/token-graph/detector.ts` |

**Not split (OVERRULED, WRONG-HOME):** `lifecycle-cleanup.spec.ts` → two component files. It asserts one rule across expandable-container **and** typewriter; the sweep is the assertion. It is an invariant.

---

## §6 · RENAMES UNDER MODULE-NAME STRIPPING — exhaustive

Per §0, edict 3 applies to the tests tree **only where the tests tree owns the repeated name.** Where the name mirrors a src file, stripping it breaks edict 4.

**A. Suffix strip — universal, 44 files.** The `.contract.` infix carries nothing the tree does not.
```
$ find tests -name '*.contract.test.ts' | wc -l → 40      $ find tests -name '*.spec.ts' | wc -l → 4
```
It discriminates on only 4 of 40 carriers (`carousel`, `infinite-scroll`, `pager-dots`, `toast` each have a second, differently-named test) — and under §0 those four's second file moves into a leaf directory anyway, so the infix discriminates on **zero**. `accordion.contract.test.ts` → `accordion.test.ts`; `*.spec.ts` → `*.test.ts`.

**B. `.public-contracts.` → `.test-d.ts`.** The extension already says it. 7 files: `chip`, `command`, `toast`, `dropdown-menu`, `_shared` (+3 that merge, §4).

**C. Genuine module-name repetition the TESTS tree owns — 8 renames.** Every other one of the 78 candidate hits either mirrors a src file (protected) or vanishes with its directory.

| current | target | why |
|---|---|---|
| `components/custom/tabs/segmented-tabs.test.ts` | `components/tabs/SegmentedTabs.test.ts` | src twin is `SegmentedTabs.vue`; the kebab spelling is the tests tree's invention |
| `components/custom/typewriter/TypewriterText.contract.test.ts` | `components/typewriter/TypewriterText.test.ts` | infix only |
| `components/custom/dropdown-menu/DropdownMenuTrigger.action.test.ts` | `components/dropdown-menu/DropdownMenuTrigger.test.ts` | `.action.` is a tests-tree infix |
| `components/custom/blob/resolveColor.test.ts` | `composables/color/resolve.test.ts` | inside `color/`, `Color` is the module name |
| `components/custom/blob/blob-color-equivalence.test.ts` | `composables/color/equivalence.test.ts` | `blob-` is a fossil (imports zero blob), `color` is the directory |
| `components/custom/blob/metaball-color.glsl-port.ts` | `composables/color/equivalence/glsl-port.ts` | `color` is the directory |
| `styles/tokenGraphDetector.ts` | `invariants/token-graph/detector.ts` | `tokenGraph` is the directory |
| `governance/governedInvariant.ts` | `_support/invariant.ts` | `governed` is the (deleted) directory |
| `utils/mountComposable.ts` | `_support/mount-composable.ts` | case-conform |

**D. `tests-visual/` — 41 strips**, all safe because these specs have no src twin: `dock-morph-family` → `components/dock/morph-family`, `blob-render` → `components/blob/render`, `aurora-vibrancy` → `components/aurora/vibrancy`, `constellation-warp-live` → `components/constellation/warp-live`, `glass-cohesion` → `styles/glass/cohesion`, and so on for every spec whose stem prefix equals its new directory.

**E. Case.** `find tests -name '*.test*.ts' -o -name '*.spec.ts' | xargs -n1 basename | grep -c '^[A-Z]'` → **38 PascalCase vs 171 lowercase**, often side by side (`tests/components/ui/slider/`). Both are correct under §0 — PascalCase mirrors a `.vue`, kebab mirrors a `.ts`. **The apparent inconsistency is the mirror telling the truth.** GOD's "pick one: kebab-case" is **OVERRULED**; the discriminator is the src twin's extension.

---

## §7 · DELETIONS — on vacuity or superfluity

| target | ground | evidence |
|---|---|---|
| `tests-visual/{_capture_css,_cohere-capture,_cohere-debug,_cohere-shadow-debug,_fix-glassui-dark-capture,_prim-polish-capture,_wdelta0-capture}.spec.ts` | **VACUITY** — zero assertions. Screenshot scripts wearing `.spec.ts`, and `testMatch:"*.spec.ts"` runs all seven on every `npm -w tests-visual test`. The `_` prefix is not an exclusion mechanism; `chromium-headless-new` declares no `testMatch`. | `for f in *.spec.ts; do [ $(grep -c 'expect(' $f) = 0 ] && echo $f; done` → exactly these 7 |
| `tests-visual/docs/` | **VACUITY** — an untracked artefact tree manufactured by two bare-relative screenshot paths (§3) | `git status --porcelain --ignored tests-visual` → `!! tests-visual/docs/` |
| `tests/components/custom/timeline/.bench/` | **VACUITY** — empty, untracked, created **16:27 today by this refinement's own tooling** | `ls -la` → 0 entries; `git ls-files … \| wc -l` → 0 |
| `tests/governance/fixtures/captureEventMethod.ts` as a *file* | **SUPERFLUITY** — 8 lines, 1 consumer. Not deleted; inlined into `components/chip.test.ts`. | `grep -rl captureEventMethod tests scripts src demo` → 1 |
| 20 exported symbols from `tests/gates/{boot-graph:8, type-hygiene:5, orphan-css-partial:5, token-hygiene:2}` | **SUPERFLUITY** — nothing imports any of them. This is *why* the analyzers were never lifted out. | `grep -rn "from ['\"].*\.test['\"]" tests scripts src demo` → **0 hits** |
| `vitest.config.ts:56` `"scripts/**/*.{test,spec}.{ts,tsx}"` | **VACUITY** — a glob guarding a convention nothing uses | `find scripts -name '*.test.*' -o -name '*.spec.*'` → **0** |

**NOT DELETED, and the benches were right to hesitate.** The **22 specs carrying `test.skip`/`describe.skip`** (12.5% of `tests-visual`) and the **~20 wave-scratch specs** (`w1-*`, `w2-*`, `w38-*`, `ba-animate`, the 7 non-vacuous `_*`): each is either a live defect-marker or a deletion, and **that verdict is not on the file.** Route to `_harness/` with `testIgnore` pending per-file triage. **No test in `tests/` is deleted** — nothing there is vacuous.

---

## §8 · TEST DISPLACEMENT — `src/` is clean; the prose is not

```
$ find src demo -name '*.test.*' -o -name '*.spec.*' -o -path '*__tests__*'  → 0
$ grep -rlE "from ['\"](vitest|@jest|@testing-library)" src demo             → 0
```

**Zero violations of edict 4. Nothing owed.** All three benches agree; all three are right.

**But six `__tests__/` citations survive in shipped library prose** — a colocated-test convention abolished at AV.W14, still documented in `dist`-bound comments:
```
src/composables/glass/procedural/color.glsl.ts:39,41
src/components/blob/shaders/metaball.frag.ts:22,23,61
tests/components/custom/blob/metaball-color.glsl-port.ts:10
```
`find . -name '__tests__' -not -path './node_modules/*'` → hits only inside `.claude/worktrees/`. Repoint all six to the §4/§6 targets (`tests/composables/color/equivalence.test.ts`, `…/equivalence/glsl-port.ts`).

**Test harness inside the demo app — PARTIAL (WRONG-HOME).** `demo/capture/{capture.css,engine-badge.ts}` is capture infrastructure by its own header ("*the SOLE provenance source per the real-paint protocol §6*… *Demo-private, reached ONLY by the `?capture=` boot path*"), lazy-imported at `demo/main.ts:112,148`. It cannot leave `demo/` (it must paint into the bundle). → `demo/_capture/`, conforming to the repo's `_shared`/`_frame` underscore idiom (`src/components/_shared`, `demo/stories/{dock,substrates}/_frame`). **The stated ground is OVERRULED**: `grep -rn 'engine-badge\|engineBadge' tests-visual` → **0 hits**. No spec decodes it. The placement argument survives on the file's own prose; the claimed decoder does not exist.

---

## §9 · WHAT BREAKS

**Nothing in the published surface.**
```
$ node -e '…exports…' → 72 subpaths;  match(/tests/) → none
$ node -e '…files…'   → [ 'dist' ]
```
The 72 export subpaths, the root barrel, and the package tarball are **entirely insulated** — no export path, no `files` entry, and no `package.json` script references `tests/` or `tests-visual/`. This zone can be restructured without touching the publish surface.

**CSS reachability — both mechanisms modelled, and the gate is correct.**
`tests/gates/orphan-css-partial.test.ts` covers both channels:
- `:105` `@import` closure — `css.matchAll(/@import\s+(?:url\()?["']([^"']+)["']/g)`, transitive from the declared roots.
- `:183` SFC `<style src=` — `text.matchAll(/<style[^>]*\ssrc=["']([^"']+)["']/g)`, plus a JS-side `import "./x.css"` arm at `:185`.

`grep -rl '<style[^>]* src=' src --include='*.vue'` → **18 SFCs**. A move modelled on `@import` alone would orphan them; this gate catches it. **It moves to `tests/invariants/orphan-css-partial.test.ts` byte-unchanged.** Recorded limit (its own §SCOPE, `:11-18`): source-reach only, reads zero `dist/` bytes — it cannot see package-output omission. Documented in-file, not a D3 defect.

**Breaks that must be fixed in the same commit:**

| coupling | count | action |
|---|---:|---|
| `vitest.config.ts:35,41` — `tests/components/chip.contract.test.ts` named **twice** (the `chip-listener` project split; `chipListener.setup.ts` must load before import) | 2 literals | **Any rename of this one file that misses the config silently drops it from BOTH projects.** Update with the rename; `setupFiles` path also moves to `_support/`. |
| `scripts/verify-governed-invariants.mjs:19` — `"tests/governance/governedInvariant.ts"` | 1 | the one external reference; moves to `_support/invariant.ts` |
| `tsconfig.test.json:17` — `"include": ["tests/", "src/", "tests/shims.d.ts"]` | 1 | `shims.d.ts` moves to `_support/` |
| raw `../../src/…` relatives surviving the BH.B2.0 codemod (`vitest.config.ts:17` claims 227 rewrites) | **9** — 8 in `styles/token-graph.test.ts:22-29`, 1 in `blob-color-equivalence.test.ts:32` | both files move; convert to `@glass/` at the same time |
| raw `../…demo/…` specifiers, **no `@demo` alias exists** (`vitest.config.ts:30` declares `@glass` only) | **29 occurrences across 12 files**; 185 files already use `@glass/` | **Declare `@demo` BEFORE any move.** Every demo-touching test is depth-coupled; `timeline-event-choices.test.ts:13` is `"../../../../demo/stories/data/timeline.vue"`. One zone aliased and the other not is not a convention. |
| hardcoded `"src/…"` string literals read via `readFileSync(join(process.cwd(), rel))` | **46 unique across 20 files**, 40 of them in `tests/styles/` | These do **not** break on a tests move — they break on a **`src/` move**. They fail loud (ENOENT), not silent. Flagged for the src-zone adjudicator: a hand-maintained path manifest is not a gate. |
| `tests-visual/playwright.config.ts:127` webkit `testMatch` (3 literal filenames) | 3 | update on nesting |
| `tests-visual` `package.json` scripts naming 3 spec files, `ci.yml:57,59` | 5 | update on nesting |

**The demo:** unaffected. No demo source imports anything under `tests/`; the only coupling is the reverse direction (29 specifiers, fixed by `@demo`).

---

## §10 · SCORECARD

| | now | target |
|---|---:|---:|
| `tests/` files | 217 | ~196 |
| `tests/` directories | 53 | ~50 |
| single-file directories | **23** | **4** |
| directories mirroring nothing in `src/` | 39 | **1** (`invariants/`, declared non-mirror) |
| files in a fossil path | **84** | 0 |
| naming conventions | 4 (+24 one-off infixes) | **2** |
| duplicate-subject test pairs | 4 | 0 |
| untested `src/components/` modules | 1 (`completion-seal`) | 0 |
| non-test `.ts` under `tests/` with no placement rule | 8 | 0 (5 in `_support/`, 2 in stem dirs, 1 inlined) |
| dead exports from test files | 20 | 0 |
| `tests-visual/` flat specs | **176** | 0 |
| duplicated helper declarations in `tests-visual/` | ≥190 (`setDark` alone ×56) | 5 files in `_support/` |
| specs with zero assertions | 7 | 0 |
| hardwired output-path literals in `tests-visual/` | 157 across 11 dead tranche letters | **1** (`PI_OUT`) |

The file count barely moves, and that is the finding. **The tests zone was never too fragmented or too coarse — its granularity is `src/`'s to set, and it already tracks it. It was in the wrong place.** WRONG-HOME wins the bench; SAND wins the naming and the four duplicate pairs; GOD wins `tests-visual/` outright, which the other two barely saw.


# ═══════════ ZONE SETTLEMENT (35028 chars) ═══════════

Verified every claim against disk at `0371836d`. Settlement follows.

---

# D3 · ZONE `demo` — TERMINAL SETTLEMENT

Read-only; no repo file touched. Every count below re-derived by me, command cited.

## 0 · RULINGS ON THE THREE BENCHES

| # | proposal | bench | verdict | reason (verified) |
|---|---|---|---|---|
| R1 | demo is 14.4% comment, not 36.3% | GOD / WRONG-HOME | **GOD SUSTAINED, WRONG-HOME OVERRULED** | My classifier (`<!--`/`/*` tracked to their *own* terminator): 25 996 code / 4 382 comment / 2 055 blank / 196 files → **14.4%**. Byte-identical to GOD. WRONG-HOME's 19 355/11 015 is the naive-classifier bug GOD warned about. Its §11 "worst dirs" table (configurator 63.9%, dock 62.7%) is void — measured: configurator/preset-editor **21.2%**, stories/dock **12.9%**. **No prose-trim prescription for this zone.** |
| R2 | `CATEGORY_PALETTE_HUES` contradicts `CATEGORY_HERO` on 7/11 while claiming to mirror it | GOD §1(a) | **SUSTAINED** | Diffed on disk: foundations 5≠7, substrates 6≠3, forms 8≠2, containers 10≠9, navigation 0≠11, data 8≠1, motion 10≠12. `aurora-hero.ts:145-147` asserts *"`CATEGORY_HERO` … is the single source; this mirror is keyed by the same index"* — false. `category-hero.ts` has **6 distinct** values for 11 categories (`{0,4,5,6,8,10}`); `aurora-hero.ts` has 11. |
| R3 | 11 of 67 facet links 404; 3 reachable in one click | GOD §1(c) | **SUSTAINED, exact** | 67 `storyId` refs; 11 absent from the 87 manifest rows; 3 of those are `entries[0]` of a facet, and `useShellNavDock.ts:74-77` pushes `entries[0].storyId` on chip activation: `forms/"selection"→/forms/select`, `motion/"text-fx"→/motion/countup`, `compositions/"heroes"→/compositions/hero`. Routes come only from `CATEGORIES` (`router.ts:36-86`) → `:pathMatch(.*)*`. |
| R4 | Two front doors (`/` CatalogLanding vs `/foundations/intro`) | GOD §1(d) | **SUSTAINED** | Both render `SectionPreviewCard v-for CATEGORIES → /${id}`; both D0; two blurb tables (`LANDING_BLURBS` manifest:233 vs `SUMMARIES` intro.vue:17); `CatalogLanding.vue:7` hard-codes `kind:"identity"` while intro resolves `resolveStoryTile`. Delete CatalogLanding; `/` → `redirect: () => firstStoryPath()` — already the router's own idiom at `router.ts:61`, and `firstStoryPath()` returns `/foundations/intro`. |
| R5 | 12 glob-visible SFCs are not routes | GOD §3 / WRONG-HOME §1 | **SUSTAINED** | `./*/*.vue` yields **103** = 87 routes + 4 `.tile.vue` + **12** non-routes. Named list below. |
| R6 | Fix them with a flat `<story>.<role>.vue` suffix | SAND A7 | **OVERRULED — this preserves the defect** | `./motion/scroll.native.vue` still matches `./*/*.vue`. SAND's cure keeps every one of the 12 as a live glob key with no route. Only a `<story>/` sub-directory removes them **by depth**. The `.tile.vue` form is not a precedent: it is *forced* flat by its own glob `./*/*.tile.vue` (`manifest.ts:158`). |
| R7 | Rename `chassis/` → `story/` (and `stories/` → `pages/`) | GOD §5b / WRONG-HOME §3 | **OVERRULED** | Edict 3 is **path-based**: `demo/chassis/` does not contain the token `story`, so the `Story*` prefix supplies information the path never did — nothing is owed. My detector confirms it: 34 hits, **zero** of them a `chassis` repeat. The cure costs 249 specifier edits (`grep -rhoE 'from "[^"]*chassis[^"]*"' demo tests \| wc -l` → 249) plus a forced second rename to dodge a one-letter `story/`≈`stories/` clash, and yields `chassis/Section.vue` / `chassis/Page.vue` — a PascalCase template tag one keystroke from native `<section>`. Name stays. |
| R8 | `chassis/` is SAND: 9 subdirs, 3 of them singletons | SAND A1 (and GOD §8, self-corrected) | **SUSTAINED** | `page/` `play/` `section/` hold 1 file each; `body/` `family/` `showcase/` hold 2. Flatten to **0 subdirs**. House precedent for a flat run: `src/components/dropdown-menu/` 17, `src/styles/glass/` 22, `src/styles/tokens/` 20 (all 0 subdirs). |
| R9 | `_frame/` contents move to `chassis/` | SAND A2 | **OVERRULED on destination, SUSTAINED on naming** | Every consumer is category-private: `DockStage` 8/8 in `dock/`; `VizStudio` 3/3 and `RendererStatus` 4/4 in `substrates/`. Hoisting to `chassis/` **inverts** edict 1. Keep them in-category; rename `_frame/` → `_shared/` to match the repo's existing `src/components/_shared/`. |
| R10 | Merge `useConfiguratorOpen.ts` into the editor store | SAND A3 | **OVERRULED — boot-diet regression** | It has **two** consumers, one of them the eager shell: `SidebarDock.vue:33`. `tests/gates/boot-graph.test.ts:348-352` exists precisely to require the **leaf** specifier (`./configurator/useConfiguratorOpen`) rather than anything that drags the Sheet. Merging it into `store.ts` (which pulls persistence + css-writers + stylesheet-swap + `@glass/composables/dark`) puts the whole editor in the eager sidebar chunk. Stays a standalone leaf. |
| R11 | Split `AppShell.vue` into 4 (incl. `ShellField.vue`) | GOD §2.5 | **PARTIAL** | The shortcut extraction is SUSTAINED — `tests/demo/shortcut-kbd-a11y.test.ts:8-11` `readFileSync`s the SFC because *"AppShell … is not isolable"*. The **field** extraction is **OVERRULED**: `boot-graph.test.ts:214-328` asserts the `defineAsyncComponent(Aurora)` binding, its `loadingComponent`, and the eager `auroraFallbackGround` call **inside `AppShell.vue`**. Moving them fails `gate.boot.source.*` outright. |
| R12 | `manifest.ts` splits into a `manifest/` sub-directory | GOD §2.1 / WRONG-HOME §7 | **PARTIAL** | The glob is path-relative and its keys are `./${cat}/${id}.vue` (`lazy.ts:19`); `manifest/lazy.ts:1` records the constraint in its own first line. Any fragment that moves a level breaks 87 lazy keys. Ruling: split **within `demo/stories/`**, never into `manifest/`. Schema out to `stories/story.ts`; everything else stays in `manifest.ts`. The 733-line `CATEGORIES` table stays with `s()` — extracting it needs either an import cycle or a row-shape rewrite (Law 6: not prescribed), and GOD's own defence is accepted: *a manifest is a table, not a module*. |
| R13 | `manifest/lazy.ts` merges back into `manifest.ts` | SAND A6 | **SUSTAINED** | 25 lines, one runtime consumer, in a directory whose name collides with its 1117-line sibling, whose own header explains it cannot host the thing it serves. |
| R14 | `aurora/config/` + `aurora/sections/` are one module split arbitrarily | SAND A4 | **SUSTAINED, incl. the mis-name** | All 7 render as `<ConfiguratorLayer>` siblings in one stack, `AuroraConfigDock.vue:267-295`. `config/CompositionLayer.vue` is mounted under `label="Warp & noise"` (`:282-283`) and its body is `warpMode/warpAmount/warpScale/warpDrift/softmaxBeta/saturation/source` — the real composition panel is `sections/AuroraCompositionSection.vue` at `:274-275`. Flatten to 17 files, one `*Panel` suffix. |
| R15 | `demo/App.vue` delete | all three | **SUSTAINED** | 7 lines, body is `<AppShell/>`, one importer (`main.ts:4`). Frees `shell/App.vue`. Corollary: `src/components/drawer/styles.css:350` claims *"`demo/App.vue` mounts `[data-stage-wrapper]`"* — `grep -rn 'data-stage-wrapper' demo` → **nothing**, so `Drawer.vue:168` / `Dialog.vue:28` `closest("[data-stage-wrapper]")` resolves `null` on all 87 routes. **Localised, not prescribed** (Law 6) — routed. |
| R16 | `demo/capture/` flattens to root | SAND A8 | **OVERRULED — inverted** | The harness owns 32–148 of a 157-line product entry, reached only via `?capture=`, sole caller `tests-visual/coherence-congruence.spec.ts:114`. WRONG-HOME §11 is right: the **driver joins the leaves**. `capture/boot.ts` is born; `main.ts` → ~60. |
| R17 | `story-hero.css` is misnamed page-background CSS used by StoryPage | GOD §4.5 | **OVERRULED** | Every selector is StoryHero's: `.grid-bg` and `.story-bg-paper` are applied at `StoryHero.vue:128,133` and nowhere else (`grep -rn "grid-bg\|story-bg-paper" demo src`); `.constellation.story-hero-bg--bleed` is a compound on the same element. Single-owner, correctly named. |
| R18 | Move `story-hero.css` to a `<style src>` | WRONG-HOME §9 (self-flagged) | **OVERRULED, and the flag is right** | `main.ts:1` states the cascade order is load-bearing; `demo.css:120` places it after `src/styles/index.css`. Mechanism change would move it after every component sheet, and its `.dark` arms die under `scoped` (the standing `:global(.dark)` trap). **Path-only move, `@import` retained.** |
| R19 | A third CSS reachability mechanism exists | WRONG-HOME §9 | **SUSTAINED** | `presets/manifest.ts:25`: `cssHref: new URL("./neutral.css", import.meta.url).href`, swapped into a runtime `<link>`. No CSS-graph walker follows it; it fails at *runtime*, when the user picks Neutral. Any move gate must walk `new URL(…, import.meta.url)`. |
| R20 | `SECTION_COLOR_OKLCH` is transcribed library data | WRONG-HOME §6 | **SUSTAINED, remedy ROUTED** | 13 literals + comment labels byte-identical, `aurora-hero.ts:62-75` ↔ `src/styles/tokens/color-radius.css:250-262`. The proposed cure (`useTokenColor`) is a reactive DOM reader; these values are consumed at **module scope** to build plain config objects. Localised; not prescribed. |
| R21 | Add `@demo/* → demo/*` | WRONG-HOME §10 | **SUSTAINED, with a boundary** | Measured: 36 `../x`, **242** `../../`, 6 `../../../`; `@glass/` 392. `vite.config.ts:14-20` states the rationale for the twin verbatim and never built it. Three lines (`vite.config.ts`, `vitest.config.ts`, `tsconfig.json:18`). **Rule, so it is one convention not two: any specifier climbing ≥ 2 levels uses `@demo/`; same-dir and single-parent stay relative.** |
| R22 | Decompose `blob`/`constellation`/`glass-material` into config+sections dirs | GOD §2.2 | **PARTIAL** | `blob.vue` 849 vs `aurora.vue` 178 is real. But the aurora "precedent" is the very shape R14 condemns. Mandated minimum: **the preset table out** (`blob/presets.ts`, mirroring `aurora/presets.ts` — 92 lines at `blob.vue:178-270`). The panel cut follows the *flattened* aurora shape and is the wave's, untested here (Law 6). |
| R23 | `dock/overview.vue` is a bag; redistribute | GOD §2.3 | **SUSTAINED** | 12 `<StorySection>`, the zone's max. §"Menus inside a dock teleport out" (`:525-551`) is **26 lines, two `<p>`, zero specimens** — and repeats `<code>DockTrigger</code>` twice inside its own prose. Triggers → `controls.vue` (whose blurb already claims them); §"Overflow wrap" → `overflow.vue` (101 lines, one section, `overflow="scroll"`). Redistribution, no new files. |
| R24 | `compositions/chassis.vue` and `data/virtual-section` routes are superfluous | WRONG-HOME §4/§11 | **ROUTED to D5** | Route existence is story placement, not module structure. The D3 consequence resolves either way: `chassis/index.ts` dies and `chassis.vue` imports `ShowcaseFrame.vue` directly. |
| R25 | `chassis/body/` (StoryBody, 440 LOC, 3 consumers) | all three decline | **ROUTED, forced-choice** | `grep -rl ':body=' demo/stories` → badge.vue, alert.vue, select.vue (**3 of 99**); `grep -rl 'StorySection' demo/stories | wc -l` → 88. Edict 5, and the decision is which convention wins across 87 routes — a wave, not a shape call. Two things settle **now**: the dead `Story.body` field (below), and `story-body.ts:7`'s false claim — it says the renderer expands into *"StorySection → ShowcaseFrame → CodeBlock"*; `StoryBodyRenderer.vue:26-27` imports StorySection and ShowcaseFrame only. |
| R26 | `data/data-table.vue` → `data/table.vue` | detector | **BLOCKED, no rename** | `demo/stories/data/table.vue` already exists and is a different story. The prefix is the component's own name. |
| R27 | kebab vs camel drift | SAND | **SUSTAINED, count corrected** | Non-`use*` `.ts` leaves in demo: **5 camel / 26 kebab**. `src` precedent: 21 camel / 62 kebab. Kebab wins; `use*` stays camel. |

---

## 1 · THE TARGET TREE

```
demo/
  main.ts                      demo.css                 vite.dist.config.ts
  capture/
    boot.ts  styles.css  engine-badge.ts
  routing/
    router.ts  focal.ts  transition.ts  RouteLink.vue  useStoryNavigation.ts
  chassis/                                                    19 flat, 0 subdirs
    StoryPage.vue  StorySection.vue  StoryHero.vue  StoryHeader.vue
    StoryBodyRenderer.vue  story-body.ts  story-nested.ts  story-hero.css
    hero-field.ts  ShowcaseFrame.vue  TokenLadder.vue  FamilyTabs.vue
    CodeBlock.vue  useCodeHighlight.ts  code-theme.css
    SectionLanding.vue  SectionPreviewCard.vue  story-tile.ts  viz-preview-still.ts
  composables/                                                2 flat, 0 subdirs
    virtual-section.ts  useVirtualSection.ts
  shell/
    App.vue  BottomDock.vue  SidebarDock.vue  DockFacetMenu.vue  NotFound.vue
    useShortcuts.ts  useNavDock.ts  useContextualDockLayers.ts  dock-nav.css
    configurator/                                             10 flat, 0 subdirs
      PresetEditor.vue  useOpen.ts  store.ts  persistence.ts  defaults.ts
      types.ts  css-writers.ts  stylesheet-swap.ts  presets.ts  neutral.css
  stories/
    manifest.ts  story.ts
    foundations/    … paper-glass/Texture.vue
    substrates/     _shared/{VizStudio,RendererStatus}.vue
                    aurora/  (17 flat)   blob/presets.ts   fourier-field/paths.ts
    forms/          inputs.tile.vue · inputs/{Label,Select,Textarea}.vue
    display/        buttons.tile.vue card.tile.vue
                    atoms/{Separator,StatusDot,DarkModeToggle,Avatar}.vue · card/Example.vue
    containers/     configurator/Example.vue
    navigation/
    dock/           overview.tile.vue · _shared/Stage.vue
    data/           search/seeds.ts · timeline/{Continuous,Segmented}.vue
    feedback/       toast/{Toaster.vue,ToasterExample.vue} · progress/loop-driver.ts
    motion/         text/{Typewriter,CountUp,AnimatedDigit}.vue
                    scroll/{Choreography,Native,Reader}.vue · springs/PlayButton.vue
    compositions/
```

**196 → 190 files. 39 → 34 directories.** The dir count barely moves, and that is the honest report: **17 misplaced directories die and 12 satellite directories are born.** The 12 are not decoration — each holds a file that today corrupts the route namespace, and their existence makes one invariant true: *every `stories/*/*.vue` at depth 2 is a route*, currently false 12 times. The four `.tile.vue` files are the named exception, forced flat by `import.meta.glob("./*/*.tile.vue")` at `manifest.ts:158`.

---

## 2 · MOVES

| current | target | ground |
|---|---|---|
| `demo/router.ts` | `demo/routing/router.ts` | the route layer is 5 files across 3 directories |
| `demo/chassis/hero/focal.ts` | `demo/routing/focal.ts` | sole consumer `router.ts:8`; it classifies **routes** (`isFocalRoute`, `suppressesShellField`), not heroes |
| `demo/chassis/routeTransition.ts` | `demo/routing/transition.ts` | consumer `shell/useShellNavDock.ts:6`; strips `route` |
| `demo/chassis/TransitionRouteLink.vue` | `demo/routing/RouteLink.vue` | 2 consumers, one is `shell/NotFound.vue:10` |
| `demo/chassis/useStoryNavigation.ts` | `demo/routing/useStoryNavigation.ts` | 4 consumers, 3 of them `shell/*` |
| `demo/chassis/{body,code,family,hero,landing,page,play,section,showcase}/*` | `demo/chassis/*` | R8 |
| `demo/composables/virtual/*` | `demo/composables/*` | `find demo/composables -maxdepth 1 -type f` → **0**; a pure container level |
| `demo/chassis/play/StoryPlayButton.vue` | `demo/stories/motion/springs/PlayButton.vue` | sole consumer `motion/springs.vue`; chassis-level dir for one story |
| `demo/examples/{Card,Configurator,Toaster}Example.vue` | `display/card/Example.vue`, `containers/configurator/Example.vue`, `feedback/toast/ToasterExample.vue` | each has exactly one consumer, imported twice (normal + `?raw`); the `?raw` pairing forces separate files, not a foreign directory. `demo/examples/` dies |
| `demo/stories/feedback/loop-driver.ts` | `demo/stories/feedback/progress/loop-driver.ts` | sole consumer `feedback/progress.vue:6`; a lone `.ts` at category level |
| `demo/stories/dock/_frame/DockStage.vue` | `demo/stories/dock/_shared/Stage.vue` | R9 + strips `Dock` |
| `demo/stories/substrates/_frame/{VizStudio,RendererStatus}.vue` | `demo/stories/substrates/_shared/…` | R9 |
| **the 12 non-routes** ↓ | | R5/R6 — restores the route bijection |
| `display/{separator,status-dot,dark-mode-toggle}.vue` | `display/atoms/{Separator,StatusDot,DarkModeToggle}.vue` | consumers `display/atoms.vue:16,21,31` |
| `data/avatar.vue` | `display/atoms/Avatar.vue` | sole consumer `display/atoms.vue:26` — a **cross-category** climb today |
| `forms/{label,select,textarea}.vue` | `forms/inputs/{Label,Select,Textarea}.vue` | consumer `forms/inputs.vue` |
| `motion/{typewriter,countup,animated-digit}.vue` | `motion/text/{Typewriter,CountUp,AnimatedDigit}.vue` | consumer `motion/text-motion.vue:9` |
| `feedback/toaster.vue` | `feedback/toast/Toaster.vue` | consumer `feedback/toast.vue:5` |
| `foundations/paper-texture.vue` | `foundations/paper-glass/Texture.vue` | consumer `foundations/paper-glass.vue:5` |
| `demo/vite.demo-dist.config.ts` | `demo/vite.dist.config.ts` | "demo" inside `demo/`; the other 7 vite configs are at repo root |

---

## 3 · AGGLOMERATIONS

| resulting file | from | contents, at function level |
|---|---|---|
| `demo/chassis/hero-field.ts` (~285) | `hero/aurora-hero.ts` (339, minus the folded table) + `hero/category-hero.ts` (70) + `hero/warm-field.ts` (17) | `SECTION_COLOR_OKLCH` · `sectionHueDeg` · `clampWarm`/`warmProjectHue` · `sectionColorToHeroPalette` · `HERO_PALETTES` · `warmFieldHue` · `heroAuroraConfig` · `shellAuroraConfig(Dark)` · types `HeroStop`/`HeroPaletteKey`/`StoryBackground(Kind)`. The two per-category tables leave (§ below). `warm-field.ts` is 17 lines whose one export is a three-import one-liner and whose own header says *"This adapter owns no color math."* |
| `demo/stories/manifest.ts` (~390) | `manifest.ts` − `CATEGORIES` head + `manifest/lazy.ts` (25) | absorbs `makeLazy`/`StoryModules`/`StoryLazyResolver` beside the `import.meta.glob` they serve; keeps `tileLoader`, `s()`, `sectionLanding()`, `assignDepths()`, `ACT_ORDER`, `findCategory`/`findStory`/`firstStoryPath`, and the `CATEGORIES` table. `manifest/` dies. |
| `demo/stories/substrates/fourier-field/paths.ts` (249) | `fGlyphPoints.ts` (99) + `fourier-paths.ts` (150) | `fGlyphPoints()` · heart/star parametrics · `makeShape` · `FOURIER_SHAPES` · `getFourierShape` · type `FourierShape`. `fGlyphPoints.ts`'s only consumer is `fourier-paths.ts:18`, whose own line 11 already says *"colocated with this, its ONE consumer."* |
| `demo/shell/configurator/*` (10 flat) | `preset-editor/` 6 + `presets/` 2 + 2 | `preset-editor/` repeats its parent's referent; `presets/manifest.ts` (29 lines, 2 exports) folds to `presets.ts` beside `neutral.css`. `useOpen.ts` **stays separate** (R10). |
| `demo/capture/boot.ts` | `main.ts:32-148` | `bootCaptureMode` · `nextPaint` · `GL_WARMUP_MS` · the `__captureReady` latch. Reached only via `?capture=`; sole caller `tests-visual/coherence-congruence.spec.ts:114`. `main.ts` 157 → ~60. |

### The headline agglomeration — **eight 11-row tables → one `Category` record**

| # | table | site | fate |
|---|---|---|---|
| 1 | `CATEGORY_DEFAULT_BG` | `manifest.ts:218` | → `Category.field.bg` (byte-identical to #5's `bgKind`, 11/11) |
| 2 | `LANDING_BLURBS` | `manifest.ts:233` | → `Category.blurb` |
| 3 | `ACT_ORDER` | `manifest.ts:1077` | **stays** — the authored narrative order, not derivable |
| 4 | `CATEGORIES[].icon` | `manifest.ts:340+` | already on the row |
| 5 | `CATEGORY_HERO` | `chassis/hero/category-hero.ts:10` | → `Category.field.{bg,palette}`; **file deleted** |
| 6 | `CATEGORY_PALETTE_HUES` | `chassis/hero/aurora-hero.ts:151` | → `Category.field.hue` — **this is the 7/11 divergence (R2)** |
| 7 | `CONTEXT_LAYER_MAP[].entries` | `shell/dock-layer-contexts.ts:82` | **derive from the manifest rows** — 116 lines of re-typed story ids; deriving kills all 11 dead links by construction. `dock-layer-contexts.ts` 385 → ~150, keeping only `{id,label,icon,accent}` per facet |
| 8 | `SUMMARIES` | `foundations/intro.vue:17` | → `Category.blurb`; **CatalogLanding deleted** (R4) |

This is the one item to do first. It is not tidiness: it is 7 wrong hues, 3 one-click 404s, and a duplicated front door, all from one record living in eight places.

---

## 4 · SPLITS

| file | now | seam | result |
|---|---|---|---|
| `demo/stories/manifest.ts` | 1117 | schema (`:15-136`) | `stories/story.ts` (~130: `Story`, `Category`, `SectionLanding`, `HeroScale`, `StoryDepth`, `StoryOptions`) + `manifest.ts`. **Both stay at `demo/stories/` depth** so `./*/*.vue` and its `./${cat}/${id}.vue` keys are untouched. |
| `demo/shell/AppShell.vue` | 315 | shortcut registration + help dialog (`:90-91`, `:164-192`) | `shell/App.vue` (~250) + `shell/useShortcuts.ts` (~60). The Aurora field **stays** (R11). |
| `demo/stories/data/search.vue` | 586 | `const rowSeeds = [` at `:37`, 362 lines — **62% of the file** | `search.vue` (~220) + `search/seeds.ts` (~362) |
| `demo/stories/substrates/blob.vue` | 849 | `presets` array `:178-270` | `blob.vue` (~757) + `blob/presets.ts` (~92). Minimum mandated; the panel cut follows the flattened aurora shape and is the wave's. |
| `demo/main.ts` | 157 | the capture block | see §3 |
| `demo/stories/dock/overview.vue` | 707 / 12 sections | redistribute, don't split | → ≤ 250 / 5 sections; triggers → `controls.vue`, wrap → `overflow.vue`, prose section deleted |

Other ≥ 25-line inline fixtures, same treatment available, not mandated: `fourier-field.vue` presets 88, `data-table.vue` rows 66 + columns 30, `empty-states.vue` 62, `command.vue` 50.

---

## 5 · RENAMES UNDER MODULE-NAME STRIPPING

Detector: normalised stem vs every ancestor dir, 3-char floor, exact-match (index-like) excluded, all of `demo/**/*.{ts,vue,css}` → **34 hits**, matching GOD exactly. 23 are dissolved by §2/§3; the residue:

| current | → | class |
|---|---|---|
| `demo/shell/AppShell.vue` | `demo/shell/App.vue` | SUFFIX `shell` — free once `demo/App.vue` dies |
| `demo/shell/useShellNavDock.ts` | `demo/shell/useNavDock.ts` | CONTAINS `shell` |
| `demo/shell/configurator/useConfiguratorOpen.ts` | `…/configurator/useOpen.ts` | PREFIX `configurator` |
| `demo/capture/capture.css` | `demo/capture/styles.css` | EXACT — matches src's `<component>/styles.css` |
| `demo/stories/dock/dock-search.vue` | `demo/stories/dock/search.vue` | PREFIX `dock` — **also the manifest row id `dock/dock-search` → `dock/search` and the `SELF_STAGES_GL` literal at `chassis/hero/focal.ts:60`** |
| `demo/stories/motion/text-motion.vue` | `demo/stories/motion/text.vue` | SUFFIX `motion` — **also the manifest row id**; becomes the parent of `motion/text/` |
| `demo/stories/data/timeline/Timeline{Continuous,Segmented}Body.vue` | `timeline/{Continuous,Segmented}.vue` | PREFIX `Timeline` + a `Body` suffix no sibling convention uses |
| `demo/stories/motion/scroll/Scroll{Choreography,Native,Reader}Body.vue` | `scroll/{Choreography,Native,Reader}.vue` | ditto |
| `demo/stories/substrates/aurora/AuroraStage.vue` | `aurora/Stage.vue` | PREFIX `aurora` |
| `demo/stories/substrates/aurora/AuroraConfigDock.vue` | `aurora/ConfigDock.vue` | PREFIX `aurora` |
| `demo/stories/substrates/aurora/sections/Aurora{Color,Composition,Motion}Section.vue` | `aurora/{Color,Composition,Motion}Panel.vue` | L1 PREFIX + the `sections/` repeat |
| `demo/stories/substrates/aurora/config/CompositionLayer.vue` | `aurora/WarpPanel.vue` | **mis-name corrected** — mounted under `label="Warp & noise"`, `AuroraConfigDock.vue:282-283` |
| `demo/stories/substrates/aurora/config/{Flow,Texture,Nuclei}Layer.vue` | `aurora/{Flow,Texture,Nuclei}Panel.vue` | one suffix for one job |
| `demo/chassis/code/hljs-house-theme.css` | `demo/chassis/code-theme.css` | flattened; `code` now carried by the stem, not a dir |
| `demo/composables/virtual/virtualSectionLayout.ts` | `demo/composables/virtual-section.ts` | CONTAINS `virtual` + camel→kebab |
| `demo/composables/virtual/useVirtualSectionWindow.ts` | `demo/composables/useVirtualSection.ts` | CONTAINS `virtual` |
| `demo/chassis/landing/storyTile.ts` | `demo/chassis/story-tile.ts` | camel → kebab |
| `demo/chassis/landing/vizPreviewStill.ts` | `demo/chassis/viz-preview-still.ts` | camel → kebab |
| `demo/chassis/routeTransition.ts` | `demo/routing/transition.ts` | camel → kebab + strip |
| `demo/stories/substrates/fourier-field/fGlyphPoints.ts` | merged → `fourier-field/paths.ts` | camel, dissolved |

**BLOCKED (1):** `demo/stories/data/data-table.vue` — R26.
**NOT renamed:** the 10 `Story*`/`story-*` files in `chassis/` — R7. The prefix is not a path repeat.

---

## 6 · DELETIONS

| path | LOC | ground | evidence |
|---|---:|---|---|
| `demo/chassis/code/Code.vue` | 75 | **VACUITY** | `grep -rn "code/Code\|Code\.vue" demo src tests tests-visual scripts \| grep -v CodeBlock` → **no output**. Zero importers repo-wide. Its docblock claims *"three dialects unify on the chip (clean break, no alias)"*; the unification never landed and the unifier is unreferenced. |
| `demo/shell/configurator/index.ts` | 13 | **VACUITY** | Zero importers, and *forbidden* to have any: `boot-graph.test.ts:348-352` + the `gate.boot.source.no-config-barrel` invariant at `:478` exist to stop an eager shell module importing it. `AppShell.vue:51` routes around it deliberately. |
| `demo/shell/configurator/usePresetEditor.ts` | 24 | **SUPERFLUITY — dual path** | Body is six `export … from "./preset-editor/store"` lines; its own line 3 says it *"preserves the exact public surface"*. Consumers (`index.ts`, `PresetEditor.vue:27`) import the store. |
| `demo/App.vue` | 7 | **VACUITY** | R15 |
| `demo/chassis/index.ts` | 7 | **SUPERFLUITY** | 7 lines re-exporting **one** symbol; 28 files already import `ShowcaseFrame.vue` directly; one consumer (`compositions/chassis.vue:6`) is the only file on the second path. |
| `demo/composables/virtual/index.ts` | 5 | **SUPERFLUITY** | 5-line barrel over 2 leaves; 2 consumers can name the leaf. |
| `demo/chassis/hero/category-hero.ts` | 70 | **SUPERFLUITY** | Its whole content is a per-category record the `Category` row already is (§3). |
| `demo/chassis/hero/warm-field.ts` | 17 | **SUPERFLUITY** | One export; its body is `warmProjectHue(sectionHueDeg(categoryHue(id)))`; header: *"This adapter owns no color math."* |
| `demo/chassis/landing/CatalogLanding.vue` | 91 | **SUPERFLUITY** | R4. `/` → `redirect: () => firstStoryPath()`. |
| `Story.body?: StoryBody` + the `story-body` import at `manifest.ts:17` | ~12 | **VACUITY — dead field** | `body:` occurrences inside the `CATEGORIES` block: **0**. `StoryOptions` (`:167-215`) has no `body` field, so `s()` cannot populate it. Every real `:body=` binding comes from the story SFC, not the manifest (badge.vue, alert.vue, select.vue). |
| `dock/overview.vue` §"Menus inside a dock teleport out" | 26 | **SUPERFLUITY** | `:525-551`, two `<p>`, zero specimens on a specimen page; it even lists `<code>DockTrigger</code>` twice. |
| `demo/chassis/{body,code,family,hero,landing,page,play,section,showcase}/`, `demo/composables/virtual/`, `demo/examples/`, `demo/stories/manifest/`, `demo/stories/substrates/aurora/{config,sections}/`, `demo/shell/configurator/{preset-editor,presets}/` | — | directories only | R8/R12/R14 + §2/§3 |

**Total deleted: 342 LOC + 17 directories.** Consumer count was not a ground for any of them.

**Explicitly NOT deleted:** `chassis/body/` (R25 — routed, forced choice), `compositions/chassis.vue` and `data/virtual-section` routes (R24 — D5), `aurora/presets.ts` (740 lines, correctly placed: named themed presets live in the consumer, all 3 consumers inside `aurora/`).

---

## 7 · TEST DISPLACEMENT

**Tests inside `src/`: 0. Tests inside `demo/`: 0.**
`find demo src -type f \( -name '*.test.*' -o -name '*.spec.*' -o -path '*__tests__*' \)` → no output; `grep -rlE "from ['\"](vitest|@jest|@testing-library)" demo` → no output. Edict 4 is clean in the displacement direction.

It is broken in the other: `tests/demo/` is **13 flat files against a 34-directory source tree, 0 of 13 isomorphic.**

| current | subject | isomorphic target |
|---|---|---|
| `tests/demo/code-block.test.ts` | `chassis/code/CodeBlock.vue` + all 3 `examples/*` | `tests/demo/chassis/CodeBlock.test.ts` (the example imports re-point per §2) |
| `tests/demo/landing.test.ts` | `chassis/landing/CatalogLanding.vue` **+** `shell/NotFound.vue` | **split** → `tests/demo/stories/foundations/intro.test.ts` (CatalogLanding is deleted; the assertions transfer to the surviving front door) + `tests/demo/shell/NotFound.test.ts` |
| `tests/demo/route-transition.test.ts` | `chassis/routeTransition.ts` | `tests/demo/routing/transition.test.ts` |
| `tests/demo/virtual-section-layout.test.ts` | `composables/virtual/{virtualSectionLayout,useVirtualSectionWindow}` — **two sources, one file** | **split** → `tests/demo/composables/virtual-section.test.ts` + `tests/demo/composables/useVirtualSection.test.ts` |
| `tests/demo/story-lazy.test.ts` | `stories/manifest/lazy.ts` | `tests/demo/stories/manifest.test.ts` (merged, §3) |
| `tests/demo/springs-story.test.ts` | `stories/motion/springs.vue` | `tests/demo/stories/motion/springs.test.ts` |
| `tests/demo/feedback-motion-tune.test.ts` | `stories/feedback/loop-driver.ts` | `tests/demo/stories/feedback/progress/loop-driver.test.ts` |
| `tests/demo/aurora-stage-affordance.test.ts` | `aurora/{AuroraStage,AuroraConfigDock,sections/AuroraMotionSection,presets}` | `tests/demo/stories/substrates/aurora/Stage.test.ts` |
| `tests/demo/router.test.ts` + `tests/demo/router-field-ownership.test.ts` | both `demo/router.ts` — **two files, one source** | **merge** → `tests/demo/routing/router.test.ts`, keeping the repo's `<subject>.<facet>.test.ts` idiom (`tests/components/custom/dock/GlassDock.*.test.ts`) if two files are wanted |
| `tests/demo/dock-stage-field-layout.test.ts` | `readFileSync` regex over `dock/_frame/DockStage.vue` **and** `src/components/aurora/Aurora.vue` | **`tests/gates/`** |
| `tests/demo/shortcut-kbd-a11y.test.ts` | `readFileSync("demo/shell/AppShell.vue")` + regex | becomes a real mount after the R11 split → `tests/demo/shell/useShortcuts.test.ts` |
| `tests/demo/sidebar-nav-landmark.a11y.test.ts` | `readFileSync` over `AppShell.vue` + `SidebarDock.vue` | `tests/demo/shell/SidebarDock.a11y.test.ts` (mount; the AppShell arm folds into the above) |

The last three self-describe as *"a vitest-fs source assert"*, each citing the previous as precedent. A source-regex gate is isomorphic to nothing; `tests/gates/` is the repo's home for that class (`boot-graph.test.ts` is exactly it). Each hard-codes a repo-relative path, so each is a **silent-green risk the moment a file in §2 moves**: a missing file throws (loud), but a *renamed selector* still passing `expect(match).not.toBeNull()` against a surviving file does not.

---

## 8 · WHAT BREAKS

**Import paths — 268 specifiers, all mechanical.**
`chassis` 249 · `stories/` 19 (`grep -rhoE 'from "[^"]*chassis[^"]*"' demo tests | wc -l`). Relative climbs: 36 × `../`, 242 × `../../`, 6 × `../../../`. The `@demo/*` alias (R21) is the precondition — add it before the moves, not after.

**The 72 package.json export subpaths — ZERO break.** `node -e 'console.log(Object.keys(require("./package.json").exports).length)'` → 72; `grep -n demo package.json` → only `:504,505,506` (the three scripts). `demo/` is in no export, no `files` entry, and no `dist` path. **`vite.demo-dist.config.ts` → `vite.dist.config.ts` requires editing `package.json:504` and `:505`.**

**The root barrel — ZERO break.** `grep -rn "demo/" src` → 10 hits, **all comments**, no import at any depth by any specifier form. Three of the ten are already stale and must be struck or fixed regardless of this settlement:
- `src/styles/tokens/scroll-tokens.css:34` → `demo/stories/story-hero.css` (actual: `demo/chassis/hero/story-hero.css`)
- `src/components/fourier-field/constants.ts:6` → `demo/stories/substrates/presets.ts` (actual: `…/substrates/aurora/presets.ts`)
- `src/components/drawer/styles.css:350` → `demo/App.vue` mounts `[data-stage-wrapper]` — **false at HEAD** (R15)

**CSS reachability — THREE mechanisms, not two.** A move gate modelling only `@import` and JS-import orphans `neutral.css` silently, at runtime, when the user picks Neutral.

| # | mechanism | files | move risk |
|---|---|---|---|
| 1 | `@import` from `demo/demo.css` | `chassis/hero/story-hero.css` (`:120`), `src/styles/index.css` (`:130`) | path edit; **do not change mechanism** (R18) |
| 2 | JS `import "./x.css"` | `shell/dock-nav.css` (`AppShell.vue:44`), `chassis/code/hljs-house-theme.css` (`CodeBlock.vue:14`), `capture/capture.css` (`main.ts:112`, dynamic) | path edit |
| 3 | `new URL("./x.css", import.meta.url).href` + runtime `<link>` swap | `shell/configurator/presets/neutral.css` (`presets/manifest.ts:25`) | **build-silent, runtime-fatal** |
| — | `<style src="…">` | **none in `demo`** (`grep -rn "<style[^>]*src=" demo` → 0; all 19 sites are in `src`) | — |

**The demo — five load-bearing hazards, in order of blast radius.**
1. **The story glob.** `import.meta.glob("./*/*.vue")` at `manifest.ts:147` is path-relative and its keys are `./${cat}/${id}.vue` (`lazy.ts:19`). `manifest.ts:138-146` records that the `./*/*/index.vue` variant was tried and **reverted because it blanks every flat story**. Every manifest fragment must stay at `demo/stories/` depth (R12). The tile glob at `:158` has the same constraint — the four `.tile.vue` files cannot move into sub-directories.
2. **The boot-diet gate.** `tests/gates/boot-graph.test.ts` hard-codes `demo/shell/AppShell.vue` (`:50,70,214,221,231,240,251,256,263,274,275,278,286,327,328`) and `demo/chassis/hero/aurora-hero.ts` (`:51,337,341`), and its `governedInvariant` at `:478` carries a `caseIdentity` keyed on the three eager-shell path strings. `AppShell.vue → App.vue` touches the governance record. The Aurora field must not leave `App.vue` (R11); `useConfiguratorOpen` must remain a leaf (R10).
3. **`useShellNavDock.ts:74-77`.** With `CONTEXT_LAYER_MAP.entries` derived from the manifest, three facet chips stop 404-ing — this is the one user-visible fix in the settlement.
4. **Manifest row ids.** `dock/dock-search → dock/search` and `motion/text-motion → motion/text` change the **URL**. Both appear in `demo/shell/dock-layer-contexts.ts` and `chassis/hero/focal.ts:60` (`SELF_STAGES_GL`).
5. **24 hard-coded `"../../demo/…"` specifiers in `tests/`** plus 8 bare `"demo/…"` path strings in the source-regex gates (`grep -rhoE '"(demo|\.\./\.\./demo)/[^"]+"' tests tests-visual scripts | sort -u` → 34 distinct). The three `readFileSync` files fail loud on a missing path and **silent-green on a surviving-but-renamed selector**.

**Three files cite a document that no longer exists:** `shell/SidebarDock.vue:92`, `shell/configurator/useConfiguratorOpen.ts:7`, `stories/substrates/blob.vue:276` all reference `CLAUDE.md` (§Configurator, "GlassDock aria contract") — hard-deleted 2026-07-13. Strike, do not re-point.
