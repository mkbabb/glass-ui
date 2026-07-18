# REFABLE RU-12 — PERF-DAG: first-principles DAG reduction perfection (redo)

- **Unit**: RU-12 PERF-DAG — the component/library-graph reduction set: overfit, duplicative,
  verbose members; the ruthless purge to the core of glass, animation, procedural animation
  ("one consumer is not enough").
- **Original edict**: A05 + F04 — full DAG, then reduce to the truly hardened/refined/worthy.
- **modelId**: `claude-fable-5` (prior run: `claude-opus-4-8` via the settings-level subagent
  override).
- **Step-2 boundary**: the ANEW pass ran first against primary sources only — src/ in full,
  demo/ consumers, the deterministic `component-graph.json` (fresh at c12beecb; zero src/ commits
  since), the FEEDBACK-LEDGER duplication rows (F18/F23/F25/F26/F32/F33/F42 + F08/F16/F44/A05),
  per-family LOC + fan-in tables, a full motion/reveal/scroll/number/morph/spring leaf import
  census, and live-code greps across the sibling constellation. The opus artifact
  (`perfection/FABLE-DAG-REDUCTION.md`) was opened only after the ANEW amendment set was fixed;
  every claim then re-proven on disk. Tree parity: 55f5170d..HEAD carries zero `src/` commits —
  the opus doc and this redo judged the SAME tree; no drift excuse in either direction.
- **External census fence**: consumers = live `.vue`/`.ts` imports only, across atlas, slides,
  speedtest, bbnf-buddy, keyframes.js (src+demo), sci-report (dashboards/auth), value.js
  (src+demo), fourier-analysis (web/src), oscilloscope. Research docs, comments, and strings are
  NOT consumers — sci-report's embedded atlas tranche-J research JSON name-drops
  `/carousel`//`pager-dots`/`goo-dot-matrix` and pollutes naive greps (the RF-2 C2/B2
  comment-mistaken-for-consumer class, re-observed).
- **Union**: `perfection/FABLE-DAG-REDUCTION.md` REWRITTEN IN PLACE. A1-A8 kept (A2 marked
  CHANGED); A9-A16 NEW. The lead re-touches the BAND-REDUCTION adoption block from the ROUTING
  rows below.

## Verdict table

### Ratified (opus claim re-proven on disk)

| # | Claim | Evidence re-proven |
|---|-------|--------------------|
| R1 | `_shared/index.ts` re-exports only `controlSizeClass`; the barrel is near-dead; all hub leaves imported by leaf path (A1 premise) | `_shared/index.ts:1-2`; leaf-path import counts re-measured |
| R2 | `dock ⇄ dropdown-menu` real 2-cycle (A4) | `dock/DockTrigger.vue:11` ↔ `dropdown-menu/DropdownMenuContent.vue:11` |
| R3 | `dockContext` 4-family fan-in with exact lines (A3) | `Slider.vue:12`, `SelectContent.vue:32`, `Popover.vue:8`, `PopoverContent.vue:13`, `DropdownMenuContent.vue:11` |
| R4 | Slider already imports the context substrate — the reroute adopts an existing authority (A3 de-risk) | `Slider.vue:12-13` |
| R5 | `glass-atom.css` AND `glass-chip.css` both un-`@imported` (A6) | no `@import` in `glass.css`/`index.css`; comment mentions only |
| R6 | Card live defaults `grain:true` / `metal:"gold"` (A5 premise) | `Card.vue:33,:39` |
| R7 | `/metric` = 4-symbol surface incl `MetricRow` (A7) | `metric/index.ts` |
| R8 | Configurator + DataTable on the ROOT barrel (A8 facts) | `src/index.ts:141` / `src/index.ts:91` |
| R9 | header-ribbon KEEP — keyframes.js consumer | `keyframes.js demo/components/instrument/shell/EditorShell.vue:116` |
| R10 | completion-seal provenance sci-report×2 + atlas×2, NOT speedtest; shipped on the root cascade | sci-report `GalleryView.vue:19`/`CategoryHomeView.vue:4`; atlas `recipes/completion.ts:5`/`skin/category.ts:2`; `index.css:237` |
| R11 | `fourier-field/presets.ts` zero importers → DELETE | `index.ts` exports math/constants/composable only |
| R12 | liquid-grid DELETE (ruling) + `glass/wave` dies with it | zero live external re-verified; wave imported by liquid-grid only (3 sites); ADJUDICATION-1 R1 stands |
| R13 | Progress `getValue*` passthroughs exist; `as`/`asChild` absent | `progress/types.ts:12,16` |
| R14 | WatercolorDot single external = value.js (B5) | value.js demo ×3 files (`MixResultDisplay`, `MixSourceSelector`, `GenerateControls`) |
| R15 | compositions = 6 pages; confirm-preset test blast radius | `demo/stories/compositions/` ls; `tests/components/dialog.confirm-preset.test.ts` |
| R16 | Surface is an axis authority barely rendered in-lib | `SurfaceProps` → card+surface; `<Surface>` rendered by header-ribbon only in src (demo ×9) |
| R17 | deck = headless core (`useDeck`/`DeckCore` type/`DeckPager`-over-PagerDots), atlas+slides live | `deck/index.ts:6-18`; subpath census |
| R18 | the L4 composite edge list (labeled-field, card→surface, carousel→button, number-field→button, data-table→skeleton+table, search→badge/button/dialog/popover, tabs→select+tooltip, tags-input→chip, deck→pager-dots, timeline→popover, configurator→fading-scroll+label, easing→button/configurator/select/slider) | graph composition edges + import greps |

### Opus-wrong / corrected (fresh evidence authoritative)

| # | Claim | Verdict | Correction |
|---|-------|---------|------------|
| W1 | useStagger DELETE ("external claim unbacked; in-repo usage a unit test only") | **FLIPPED to KEEP** | The row's own condition resolves against it: `speedtest/src/features/speedtest/ui/ResultStack.vue:171` live-imports `useStagger` from `@mkbabb/glass-ui/motion-core`; + `tests/composables/motion/useStagger.test.ts`. The dead stagger is `useStaggerReveal` (zero consumers anywhere) — fold direction inverted (A11) |
| W2 | Typewriter "single-consumer leaf (demo story only); zero cross-src edges" | **CORRECTED** | atlas live-consumes `/typewriter`. KEEP+thin stands; the thin gains a consumer guard |
| W3 | Configurator "consumers are VizStudio + configurator.vue only" → demo-privatize | **OVERTURNED** | 10 demo files + TWO live externals: value.js (`/configurator`) + fourier-analysis (web/src). W3's own escape hatch fires: "if a named external consumer surfaces, it becomes a family-B relay, not a demo-privatize" |
| W4 | DataTable "one consumer" | **CORRECTED** | atlas + speedtest live (`/data-table`) |
| W5 | B2 FourierField / B3 Constellation "0 external consumers" | **CORRECTED** | fourier-field → slides; constellation → atlas + slides. Knob-retire stands; the relocate leg dies |
| W6 | B4 easing "demo-device" (demo-only) | **CORRECTED** | keyframes.js (`/easing`) + value.js (`EasingPicker`/`EasingPickerValue` ×4 files) — meets the ≥2-binary bar |
| W7 | A2 timeline "FIVE-variant family ~1500 LOC" | **CHANGED (ID kept)** | SIX SFCs — `ContinuousMarkers.vue` (436 LOC, the largest variant file) omitted; ≈1936 SFC LOC / 2254 family. `index.ts` exports only `GlassTimeline` |
| W8 | Fanouts cn=133 / axes=27 / selection=20 | **CORRECTED** | Re-measured (files importing the leaf path): cn 117 src (151 with demo), axes 28, selection 15, primitive 50 (confirmed). A1 substance unchanged |
| W9 | §2 Configurator row cites `[Δ→§4-A9]` | **DANGLING REF** | No A9 existed in the draft; the root-barrel break landed as A8. Fixed in union; A9 now names the combobox fold |
| W10 | §1.1 L3 roster lists a `status` family | **GHOST** | No such component (status-dot is separate and also listed). Purged |
| W11 | C1 deck-vs-carousel "NOT duplicates…collapse only any visual overlap" (symmetric framing) | **MATERIALLY INCOMPLETE** | carousel = ZERO live consumers in all 11 repos + 1 demo story + the sole reason `embla-carousel`+`embla-carousel-vue` sit in package.json; deck = atlas+slides live. The relay evidence is asymmetric (A16); still the user's call |

### Fable-new (absent from the opus draft — new amendments A9-A16)

| ID | Finding | Evidence |
|----|---------|----------|
| A9 | combobox → command fold: two wrapper families over the SAME reka Combobox substrate; command imports only `combobox/types` (type-only, 6 files); combobox zero consumers in src/demo-story-1/all 11 repos | `command/*.vue` import greps; graph role_synonymy 1.0; subpath census |
| A10 | the number band 4→1: `useNumericTransition` (0 anywhere) + `useAnimatedNumberMap` (barrel-only) + `useCountup` (1 demo story) fold onto `useAnimatedNumber` (animated-digit + speedtest live) | full leaf import census |
| A11 | reveal dead pair: `useBloomUp`+`bloomUpField` (mutual+barrel only) DELETE; `useStaggerReveal` (0 anywhere, incl. the public /motion-core symbol) folds into `useStagger` with IO gating optional | leaf census; external symbol greps |
| A12 | scroll/spring demo-locals: `useScrollPin` (1 demo story) + `springProjection` (2 demo stories) demo-localize; `useScrollScene` (sole consumer = useScrollPin) CONDITIONAL-KEEP as the one scroll-physics spine (liquid-weight edict) iff a BJ wave binds it to a real surface | leaf census |
| A13 | `useTextHighlight`: zero consumers in lib+demo+all 11 repos while on the ROOT barrel — cut-or-bind question (dock-search marks the natural bind site); default DELETE | leaf + external census |
| A14 | search family split: `SearchBar` KEEPS (value.js ×3 live: BrowsePane:195, PalettesPane:149, AdminPane), fuzzy engine KEEPS (dock `useDockSearch` imports `search/composables`), `FuzzySearch.vue` (demo-story-only) deletes; `dock/index.ts:84` "SearchBar retires" is stale → BAND-DOC-TRUTH | import greps |
| A15 | pulse + status-dot merge (OPEN): both thin `_shared/FeedbackMark.vue` shells (49/63 LOC; synonymy 1.0/api 0.675) → one mark register with `motion`; consumers speedtest / atlas+slides+keyframes.js via addenda | both SFCs read in full; graph edges |
| A16 | C1 relay evidence: carousel DELETE resolution — zero live consumers anywhere + embla peer pair leaves package.json; deck+PagerDots the one paging register; sci-report tranche-J research names /carousel as a PROSPECTIVE consumer (named in the relay, not a live import) | constellation-wide census; package.json:545-546,556-559,587-588 |

Also recorded in the union (§5.12-14, no A-ID): the research-doc consumer-pollution fence, the
stale-subpath (pre-7.0.0 pin) signal per repo, and the graph role_synonymy false-positive classes
(infinite-scroll↔typewriter; the L5 substrate clique).

## ROUTING (every affected BAND-REDUCTION / PLAN anchor)

| # | Anchor | Re-touch required |
|---|--------|-------------------|
| RT1 | `waves/BAND-REDUCTION.md` §Lead adoption block (:524-533) | A2 one-liner: "ALL FIVE variants (~1500 LOC)" → "ALL SIX variants (~1936 SFC / 2254 family LOC, incl. ContinuousMarkers.vue)". A7 one-liner: census widened to keyframes.js + sci-report + speedtest. A8 one-liner: add the context correction (both members now have live externals; A8 = mechanics-if-fired). ADOPT/DECLINE the new A9-A16 |
| RT2 | `waves/BAND-REDUCTION.md` W1 `BJ.W-REDUCE-PROPDIET` (:80-206) | Typewriter thin gains an external-consumer guard (atlas live consumes `/typewriter` — the thin is null-DELTA only if the atlas call sites survive or ride an addendum) |
| RT3 | `waves/BAND-REDUCTION.md` W3 `BJ.W-REDUCE-DELETE` §Configurator (:303-309) | The wave's own `OPEN:` escape hatch FIRES — named external consumers value.js + fourier-analysis → family-B relay, NOT demo-privatize; the root-barrel line edit (A8) moot unless the user still rules privatize |
| RT4 | `waves/BAND-REDUCTION.md` W3 §easing (:311-317) | ASK-gate stays; relay carries the corrected census (keyframes.js + value.js live) |
| RT5 | `waves/BAND-REDUCTION.md` W3 §useStagger (:328-333) | RESOLVED per the row's own protocol: census run, claim BACKED (`speedtest ResultStack.vue:171`) → the export STAYS; write `docs/consumer-evidence/useStagger.md` with the grep |
| RT6 | `waves/BAND-REDUCTION.md` W3 §Exact scope (new members) | A9 combobox fold, A10 number-band deletes, A11 useBloomUp/bloomUpField + useStaggerReveal, A12 useScrollPin/springProjection demo-local, A14 FuzzySearch.vue — join the clean-delete roster (each cites its census row above) |
| RT7 | `waves/BAND-REDUCTION.md` W4 `BJ.W-REDUCE-CROSSREPO-GATED` §corrected consumer truth (:377-397) | metric relay = keyframes.js (`/metric`) + sci-report + speedtest live (+ atlas MetricStack import-vs-vendored verified at relay); completion-seal provenance re-confirmed (sci-report×2 + atlas×2) |
| RT8 | `waves/BAND-REDUCTION.md` W5 `BJ.W-REDUCE-TIMELINE` (:~420+) | Scope = all SIX variants (A2 CHANGED); name ContinuousMarkers.vue so it cannot silently survive |
| RT9 | `PLAN.md` Family C W3 row (:141-143) | "Configurator→demo" → family-B relay (RT3); "useStagger" → resolved-KEEP (RT5) |
| RT10 | `PLAN.md` Family C W5 row (:147-149) | "all five variants (A2, ~1500 LOC)" → six variants, ~2250 LOC family |
| RT11 | `PLAN.md` Family B W2 `BJ.W-COLO-2` (:125-128) | Precondition FAILS as written: the sibling census does NOT clear `glass-ui/sidebar` — fourier-analysis live-imports `useSidebarState` ×2 (RF-2 C5). The demote runs the consumer-updates ruling |
| RT12 | `ASK-REDUCTION.md` §A1, §A2, §B1, §B2, §B3, §B4, §C1 | Relays updated with the corrected censuses (W3-W6 above); §C1 carries the A16 asymmetry evidence |
| RT13 | `ASK-REDUCTION.md` (new question rows) | A13 useTextHighlight cut-or-bind; A15 pulse/status-dot merge — routed to the user per F04 |
| RT14 | `waves/BAND-DOC-TRUTH.md` | `dock/index.ts:84` stale "SearchBar + its 7 search composables retire" claim vs the live value.js consumer (A14) |

## Tallies

- Ratified: **18** · Opus-wrong/corrected: **11** · Fable-new amendments: **8** (A9-A16)
- A-ID disposition: A1 kept (counts corrected) · A2 CHANGED · A3-A8 kept (A8 context-corrected) ·
  A9-A16 NEW
