# AX inventory — W-primitives lane (Primitives / IA / Sliders / Deck band)

HEAD `b03246c` (on `c72d2ac` = the W19/W58/W59 DEVELOPED cut). Read-only inventory; no edits.
Scope: W18 (storybook IA), W19 (prune), W20 (primitive fix), W21 (recategorize), W23 (carousel),
W24 (deck-progress), W50 (dropdown type-scale). Cross-band: W22 (font), W36/W37 (a11y/canvas2d) are
NOT in this lane but referenced where they gate the IA tree.

## Status board

| Wave | Title | PROGRESS says | SOURCE truth | Verdict |
|---|---|---|---|---|
| W18 | storybook IA reinvention | planned | OLD 11-cat tree intact; `EXPECTED_TREE` unchanged | NOT-STARTED |
| W19 | primitive prune A | live-verified (DEVELOPED) | glyph-face/disco-glyph/glass-carousel GONE; header-ribbon PRESENT | PARTIAL (by design) |
| W20 | primitive fix — top-layer/card/glass-panel | planned | glass-panel + useGlassRenderer present; nested-hsl unfixed | NOT-STARTED |
| W21 | primitive recategorize-ledger | planned | configurator contradiction live; MIGRATION lie live; no metric-pill subpath | NOT-STARTED |
| W23 | carousel indicator re-author | complete | CarouselDots re-authored; gate registered+GREEN; glass-scrubber=ACCEPT | DONE (live-verify owed) |
| W24 | deck-progress export + rail | complete | DeckProgress dir+subpath+`.glass-progress-rail`; gate render-asserts | DONE |
| W50 | uniform dropdown type-scale | planned | zero `--dropdown-text` token; ≥14 raw `text-sm/xs` literals | NOT-STARTED (born-RED) |

## DONE

### W23 — carousel indicator re-author + glass-scrubber decision — DONE (live-verify owed)
- `src/components/ui/carousel/CarouselDots.vue` re-authored as a token-adaptive dark/light-safe
  position-dot rail (the file header records the fix: inactive dots off the `--surface-tint-*` ladder,
  not `bg-muted-medium`; the dead `scale-[var(--scale-hover)]` arbitrary class excised — it survives ONLY
  in the explanatory comment, no active emit). AW.W30 chrome restyle folded in same write surface
  (commit `27d1992`).
- Gate `proof:carousel-glass-atoms` REGISTERED (package.json + gates.mjs) + GREEN; `proof:slider-two-only`
  re-registered. `W23-carousel-indicator.json` records all four RED witnesses inverted.
- **glass-scrubber naming**: ADJUDICATED → **ACCEPT** (the orchestrator §5.3 ratified default). `standard`
  STAYS the CVA key (`slider/index.ts:43` `standard: ''`, default `standard`); glass-scrubber is the prose
  name only. ZERO call-site churn, no slider source edit. The rename path is CLOSED, not deferred.
- Consumers verified clean (`F3`): re-grep of src/ demo/ slides found no stale retired-variant Slider binding.
- OWED: `liveVerifyNeeded` block present in the JSON — the dark-page live carousel audit is the
  orchestrator's real-device run, not yet stamped in PROGRESS as such. Treat as DONE-pending-stamp.

### W24 — deck-progress LIBRARY-side — DONE
- `src/components/custom/deck-progress/{DeckProgress.vue,index.ts}` ships a thin `:value`-only
  `<Progress variant="default">` wrapper styled as `.glass-progress-rail`; `src/subpaths/deck-progress.ts`
  + the `/deck-progress` export entry present; `src/index.ts:130` re-exports it.
- `.glass-progress-rail` @utility lives in `glass.css:666`; the cascade-layer inversion fixed by
  token-read-at-source (`--progress-fill`/`--progress-track` — the audit's recommended option b).
  `ProgressDefault.vue:17-18` documents the specificity contract.
- DIVERGENCE the render-gate surfaced (in-gestalt, accepted): the upgraded render readback found the
  inversion ALSO clobbered geometry — the rail painted 16px not the hairline; fixed. Leading-edge glow =
  trailing INSET edge inside the clip. `/deck` engine RATIFIED slides-local (not lifted — substrate-without-
  consumer avoided).
- Gate `proof:deck-progress-rail` registered + UPGRADED string-scan → render assertion (DOM-cascade
  getComputedStyle: override-wins + inset-glow + hairline-height), PASS against the live demo.
  `W24-deck-progress.json` status `complete`.

## PARTIAL

### W19 — primitive prune A — PARTIAL BY DESIGN (header-ribbon held on W35)
DONE (commit `509aed8`): `glyph-face`, `disco-glyph`, AND `glass-carousel` (the P4 convergence-2 add)
excised cleanly — dirs gone, subpaths gone, no `custom/carousel` composite. The `GLYPH_FACE_SILHOUETTE_KEY`
DI coupling severed with glyph-face. Icon-button-token-ladder confirmed-removed (no edit).

NOT DONE — and correctly so per the plan's own DAG:
- **`header-ribbon` SURVIVES at HEAD.** Dir `src/components/custom/header-ribbon/` present; subpath
  `src/subpaths/header-ribbon.ts` present; `package.json` `./header-ribbon` export + typesVersions present;
  `src/api/index.ts:200-207` still re-exports `HeaderRibbonPosition`/`HeaderRibbonProps`;
  `proof-storybook-ia.mjs:55` still carries the `header-ribbon` slug; demo story + manifest row present.
  This is the W19 wave doc's `result[11]`/`result[21]` CORRECTION: header-ribbon has a LIVE cross-repo
  consumer (keyframes.js `EditorShell.vue:99`), so its prune is a HARD PREDECESSOR of **W35** (migrate-
  before-prune; EditorShell off HeaderRibbon, born-RED cross-repo gate, lands WITH the prune so HEAD never
  breaks the consumer). The "DEVELOPED" stamp covers the no-coupling excisions; header-ribbon is a
  deliberate hold, not a miss.
- **`useTokenColor` KEPT (P1 divergence — CORRECT).** The convergence-2 P1 ask was "use-token-color demo
  icon → DarkModeToggle." The W19 commit message records the gestalt call: useTokenColor is KEPT because
  `constellation.vue:16,22,60` is a real second consumer (`useTokenColor("--primary"…)`,
  `("--constellation-accent"…)`). The ≥2-consumer bar is met; pruning would be wrong. P1 is RESOLVED-as-
  keep, not deferred. (The demo story `use-token-color.vue` rightly survives as the demo-private witness.)

## NOT-STARTED

### W18 — storybook IA ground-up reinvention — NOT-STARTED
`scripts/proof-storybook-ia.mjs` `EXPECTED_TREE` is the OLD **11-category** tree (`Substrates 2nd:
aurora · goo-blob · glass-panel`), with `header-ribbon` + `deck-progress` still listed as slugs. The W18
plan demands a NEW ground-up tree (Foundations · Substrates · Primitives→Forms+Display+atoms ·
Containers/Overlays · Navigation · **Dock** · Data · Feedback · Motion · Compositions · Composables-ref),
dissolving the `tools` debris bin + the 24-story `primitives` overload, splitting `glass-panel` OUT
(W20 retires it anyway), seating **fourier-field** in Substrates, and re-baselining `EXPECTED_TREE` LAST.
None of that is in the fixture. `proof:storybook-complete` IS registered (package.json:585) but against
the old tree, not the reinvented one. NOT-STARTED. Blocks: W18 dependsOn W06/W19/W20/W22/W23 — W20 still
open (glass-panel split needs the retire), W06 dock-showcase open, so W18 is correctly gated.

### W20 — primitive fix (native-top-layer · card toggles · GlassPanel retire) — NOT-STARTED
- `glass-panel` dir PRESENT (`src/components/custom/glass-panel/GlassPanel.vue`); the JS renderer
  `src/composables/glass/useGlassRenderer.ts` PRESENT. The plan retires GlassPanel onto the CSS-native
  `.glass-material` grammar and KILLS the `createGlassFilter`/`useGlassRenderer` SVG-displacement path
  (it stomps inline styles with hardcoded non-dark-adaptive white). Untouched.
- Native `<dialog>` backdrop nested-`hsl(var(--background)/α)` (the CLAUDE.md anti-pattern, 3 occurrences)
  fix-or-fold into reka `<Dialog :native>` — not done.
- Card story toggles (shadow near-invisible 8%-α; grain 2.5% delta; Aurora-coupled staging) — not done.
- Severity **blocker**; dependsOn W07/W09 (both complete) so it is UNBLOCKED to schedule. W20's GlassPanel
  retire is ALSO a W35 cross-repo predecessor (keyframes `EasingCurveCanvas.vue` mounts
  `<GlassPanel variant="wash">`). NOT-STARTED.

### W21 — primitive recategorize-ledger + barrel coherence + metric reconcile — NOT-STARTED
Every named W21 defect is still live at HEAD:
- **Configurator root-barrel contradiction LIVE.** `src/index.ts:122` `export * from
  "./components/custom/configurator"` (root-barrel exported) while the SAME file's cherry-pick rationale
  (lines 54/65 "The excluded packages fail one or more of those criteria") frames configurator as excluded
  — a live contradiction. W21 must either demote to subpath-only (idiomatic, matching dock/aurora) or
  excise the false exclusion line. Untouched.
- **MIGRATION.md RETIRED lie LIVE.** `MIGRATION.md:800` "`/metric-cell` + `/metric-stack` subpaths RETIRED
  (AV.W10)" — a binding-doc lie (L inv-16): both ARE shipped + speedtest-consumed (subpaths
  `src/subpaths/metric-cell.ts`/`metric-stack.ts` present). The `proof:no-retired-survivor` gate is NOT
  registered (grep of package.json = 0). W21 must rewrite the §RETIRED entry to the truth + author the gate
  (registration → W33). Untouched.
- **metric-pill subpath asymmetry LIVE.** `src/subpaths/` has metric-badge/cell/stack but NO `metric-pill`
  (the `metric-pill/` component dir exists under ui/). W21 gives it a `/metric-pill` subpath OR folds it
  into the W29 prune. Untouched.
- Drawer live-behind disambiguate (excise the half-working Peek/Half/Full open-detent buttons hitting the
  vaul-vue re-snap limitation); use-token-color justify-and-annotate (NOT restructure — composes with the
  W19 keep above); the kf-G-3 `LabeledField orientation="horizontal"` + label-row action slot; kf-G-5
  `<DrawerContent spring>`; kf-G-6 `cartoon-quiet` preset; the A-1 configurator machined-groove divider +
  A-2 typography-ladder label rungs — ALL untouched. NOT-STARTED.
- dependsOn W18 (which is itself not started). Sequencing-correct that it is open.

### W50 — uniform dropdown/select/menu type-scale (D17) — NOT-STARTED (born-RED at HEAD)
Zero `--dropdown-text`/`--menu-text` token in src (grep = 0). The four RED witnesses in the wave doc all
hold at HEAD: ≥14 raw `text-sm`/`text-xs` literals across ≥11 picker-family files
(`_shared/menuItemVariants.ts:33`, Select/DropdownMenu/ContextMenu labels at `text-sm`, the combobox/
command group-headings + shortcuts at `text-xs`, the two inputs scale-mismatched `h-10` vs `h-11`), no
single override seam. W50 is a fully born-RED, not-started minor wave. NOTE the convergence-1 ledger marks
W50 as a SPECIALIZATION of **W51** `--ui-scale` (the umbrella) and directs W51 to land FIRST so W45/W50
read the global axis — sequencing intent that must be honored (else three independent scale systems).

## DEFERRED items that must FOLD INTO this tranche

1. **header-ribbon excision** — held pending W35 (keyframes EditorShell migrate-before-prune). Must land
   WITH the W35 born-RED cross-repo gate before any 3.9 publish. The dir/subpath/api/manifest/IA-slug
   removals are W19's tail, sequenced after W35.
2. **GlassPanel retire** (W20) is ALSO a W35 predecessor (keyframes EasingCurveCanvas → `<Card
   surface="glass">`/`.glass-material`). Same migrate-before-prune coupling as header-ribbon.
3. **`proof:no-retired-survivor` gate authoring** (W21) → registration in W33. The MIGRATION metric lie is
   a NOW fix per the digest ("must NOT ride the entire tranche to W29 — fix it NOW").
4. **fourier-field IA seat** (W43 ships the story; W18 authors the tree + re-baselines `EXPECTED_TREE` LAST
   including the fourier-field Substrates row). W18 cannot close before W43's story exists.
5. **W51 `--ui-scale` umbrella** must precede W50 (and W45) so dropdown-scale specializes the global axis.

## GAPS / plan divergences

- **PROGRESS over-claims W19** ("live-verified (DEVELOPED)") while header-ribbon — the F0 HEADLINE of W19 —
  is still fully present in source. The stamp is honest only for the glyph-face/disco-glyph/glass-carousel
  arms; the header-ribbon arm is a deliberate W35-gated hold. The table should read PARTIAL/header-ribbon-
  on-W35, not a blanket live-verified, to avoid a false-closed signal at tranche close.
- **W23/W24 marked `complete` carry an owed live-device stamp.** W23's JSON has a `liveVerifyNeeded` block;
  W24's render gate ran against the dev server but the multi-viewport light/dark screenshot π-lane run is
  orchestrator-owned and not recorded as executed. Per the cardinal lesson, "complete" is only valid on the
  executed live audit — confirm both stamps before FINAL.
- **W18 ↔ W20 ordering coupling unstated in PROGRESS.** W18 splits `glass-panel` out of Substrates; W20
  retires GlassPanel. If W18 re-baselines `EXPECTED_TREE` to still list `glass-panel` before W20 retires it,
  the IA gate locks in a primitive that's about to die. W18 must re-baseline AFTER W20 + W43 land their
  manifest deltas (the wave doc says "re-baseline LAST" — make that explicit in the dispatch).
- **P1 use-token-color resolution is a divergence from the convergence-2 P1 ask** ("migrate to
  DarkModeToggle"). The W19 keep is CORRECT (constellation is consumer #2), but the convergence-2 ledger
  still lists P1 as an open W19 augment — reconcile the ledger to "RESOLVED-as-keep" so it doesn't re-surface
  as a phantom todo.
- **W50 vs W51 sequencing not reflected in the PROGRESS table** (both `planned`, no dependency note). The
  D18/D17 specialization relationship must be carried into the dispatch order.

## Gestalt path forward (planning only)

1. **Sequence the prune publish behind W35.** W19-tail (header-ribbon) + W20 (GlassPanel retire) are a
   single migrate-before-prune cohort with keyframes.js: author the W35 born-RED cross-repo gates
   (EditorShell off HeaderRibbon; EasingCurveCanvas off GlassPanel onto `.glass-material`/`<Card
   surface="glass">`), land the keyframes migration, THEN excise both glass-ui primitives in one clean
   break — dir + subpath + api/index + package.json export + typesVersions + CSS + @import + demo story +
   manifest row + IA slug + gate fixtures, no alias. This also unblocks W18's `glass-panel` split.

2. **W20 first-principles, not patch.** Retire GlassPanel onto the CSS-native `.glass-material` grammar and
   DELETE `createGlassFilter`/`useGlassRenderer` (it stomps inline styles with hardcoded white — fail-loud
   excise, not a fix). Native-`<dialog>` backdrop: fold into reka `<Dialog :native>` (the manifest's stated
   route) rather than patching the nested-hsl — one path. Make the card toggles meaningful or remove the
   non-features; decouple the card story from the (now-fixed) Aurora backdrop so it's independently
   verifiable. Severity blocker, dependsOn W07/W09 (both complete) — schedulable now.

3. **W21 is a ledger-close + 3 real fixes, not a recat sweep.** Most §7 items are AV.W10-satisfied (verify-
   only). The REAL work: (a) resolve the configurator root-barrel/rationale contradiction (demote to
   subpath-only — the idiomatic dock/aurora-parity choice for a 956-line family); (b) rewrite the
   MIGRATION.md metric §RETIRED entry to the truth NOW + author `proof:no-retired-survivor` (register W33);
   (c) give metric-pill a `/metric-pill` subpath (kill the asymmetry) — or fold to W29. Then the
   labeled-field/drawer feature folds (kf-G-3/5/6, A-1/A-2) on the same write surface. dependsOn W18.

4. **W18 ground-up IA, fixture-LAST.** Author the new category tree on the AX-rebuilt surfaces (dock home,
   fourier-field Substrates seat, glass-panel split-out, debris-bin dissolve), validate live navigation of
   every section, THEN re-baseline `EXPECTED_TREE` + register the totality gate against the reinvented tree.
   Hard-order it after W19-tail + W20 + W43 land their manifest-row deltas so the fixture locks the final
   set, not a transitional one.

5. **W50 specializes W51.** Land W51 `--ui-scale` umbrella FIRST; then W50 mints the two-rung
   `--dropdown-text`/`--dropdown-text-secondary` pair the whole picker family reads (item base CVA +
   triggers + labels + headings + shortcuts + the two inputs on a shared input-height register), deriving
   off `--ui-scale` so there is ONE scale system. Token-first: a single `:root` override re-tints the family.
   Author `proof:ui-scale` + the family-parity π probe.

6. **Close discipline.** Re-stamp W19 PARTIAL in PROGRESS; execute the owed W23/W24 live-device audits and
   record them; reconcile the convergence-2 P1 ledger to RESOLVED-as-keep. A wave is complete only on the
   executed live audit — no headless-green collapse.
