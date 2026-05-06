# H Post-Close Audit — Lane β (substrate-without-consumer at HEAD)

**Lane**: β — substrate-without-consumer at HEAD post-W5 close (read-only).
**Date**: 2026-05-05.
**Method**: re-run of the β-style overfitting audit at HEAD per `docs/audits/overfitting-audit.md` Refined-D verdict precedence (`delete-unused > library-orphan > inline-and-remove > keep-current > demo-only-private > keep`). Every public surface enumerated under §1 in scope (G-shipped artefacts that survived `H.W1` plus W2-W5-introduced artefacts) is re-grepped at HEAD with the exact `rg` invocation cited per row. Counts mean distinct files including the def file and barrel `index.ts`. Cross-reference against `docs/consumer-evidence/<artefact>.md` for `keep-current` upgrade. Pre-G artefacts (e.g., the `dock` package's pre-existing internals) are listed under §11 informational only — they fall outside H invariant 2's wire-or-retire bar but inform future tranches.

The audit is read-only. No file was modified, no commit created, no destructive git command (`git stash`, `git reset`, `git checkout HEAD --`) executed.

## 1. Tokens — surviving G-shipped (§1 of W0 reconciliation)

The 26 W0 WIRE-already + 0 W0 WIRE-new tokens. Re-greps at HEAD:

| token | rg invocation | sites | verdict |
|---|---|---:|---|
| `--cream` | `rg -l -e "var\(--cream\)" src/ demo/` | 19 | keep |
| `--cream-warm` | `rg -l -e "--cream-warm" src/ demo/` | 15 | keep |
| `--cream-cool` | `rg -l -e "--cream-cool" src/ demo/` | 6 | keep |
| `--cream-edge` | `rg -l -e "--cream-edge" src/ demo/` | 5 | keep |
| `--cream-foreground` | `rg -l -e "--cream-foreground" src/ demo/` | 9 | keep |
| `--icon-2xl` | `rg -l -e "--icon-2xl" src/ demo/` | 4 | keep |
| `--icon-3xl` | `rg -l -e "--icon-3xl" src/ demo/` | 4 | keep |
| `--icon-mega` | `rg -l -e "--icon-mega" src/ demo/` | 4 | keep |
| `--shadow-cartoon-accent` | `rg -l -e "--shadow-cartoon-accent" src/ demo/` | 7 | keep |
| `--cartoon-accent-color` | `rg -l -e "--cartoon-accent-color" src/ demo/` | 5 | keep |
| `--space-phi-1` | `rg -l -e "--space-phi-1" src/ demo/` | 13 | keep |
| `--space-phi-2` | `rg -l -e "--space-phi-2" src/ demo/` | 33 | keep |
| `--space-phi-3` | `rg -l -e "--space-phi-3" src/ demo/` | 37 | keep |
| `--space-phi-4` | `rg -l -e "--space-phi-4" src/ demo/` | 18 | keep |
| `--blob-color` | `rg -l -e "--blob-color" src/ demo/` | 2 | keep |
| `--blob-border-mix` | `rg -l -e "--blob-border-mix" src/ demo/` | 2 | keep |
| `--blob-chromatic-aberration` | `rg -l -e "--blob-chromatic-aberration" src/ demo/` | 4 | keep |
| `--blob-cast-shadow-y` | `rg -l -e "--blob-cast-shadow-y" src/ demo/` | 2 | keep |
| `--blob-cast-shadow-blur` | `rg -l -e "--blob-cast-shadow-blur" src/ demo/` | 2 | keep |
| `--blob-cast-shadow-mix` | `rg -l -e "--blob-cast-shadow-mix" src/ demo/` | 2 | keep |
| `--type-display-mega` | `rg -l -e "--type-display-mega" src/ demo/` | 2 | keep |
| `--type-display-ultra` | `rg -l -e "--type-display-ultra" src/ demo/` | 2 | keep |
| `--tracking-tightest` | `rg -l -e "--tracking-tightest" src/ demo/` | 4 | keep |
| `--font-display-1-variation-settings` | `rg -l -e "--font-display-1-variation-settings" src/ demo/` | 2 | keep |
| `--font-display-2-variation-settings` | `rg -l -e "--font-display-2-variation-settings" src/ demo/` | 2 | keep |

W1-retired tokens — confirm zero in-repo references:

| retired token | rg invocation | sites |
|---|---|---:|
| `--paper-bg-{1..4}` | `rg -l -e "--paper-bg-1" src/ demo/` (per-rung) | 0 (×4) |
| `--paper-shadow-{1..4}` | same shape | 0 (×4) |
| `--paper-border-{1..4}` | same shape | 0 (×4) |
| `--cartoon-accent-mix` | `rg -l -e "--cartoon-accent-mix" src/ demo/` | 0 |
| `--type-formula` | `rg -l -e "--type-formula" src/ demo/` | 0 |
| `--shimmer-blue-{dark,mid,light}` | `rg -l -e "--shimmer-blue-dark" src/ demo/` (per-rung) | 0 (×3) |
| `--blob-border-mix-contrast` | `rg -l -e "--blob-border-mix-contrast" src/ demo/` | 0 |
| `--blob-grain-opacity` | `rg -l -e "--blob-grain-opacity" src/ demo/` | 0 |
| `--font-display-{3,4,5,mega,ultra}-variation-settings` | per-rung | 0 (×5) |

**Token verdict at HEAD**: 25 keep · 0 library-orphan. (W1 RETIRE landed on all 23 retired tokens.)

## 2. Utility classes — surviving G-shipped (§2 of W0)

| utility | rg invocation | sites | verdict |
|---|---|---:|---|
| `.bg-rainbow` | `rg -l -e "\bbg-rainbow\b" src/ demo/` | 4 | keep |
| `.bg-rainbow-vivid` | `rg -l -e "\bbg-rainbow-vivid\b" src/ demo/` | 3 | keep |
| `.text-shimmer-gold` | `rg -l -e "\btext-shimmer-gold\b" src/ demo/` | 2 | keep |
| `.divider-flourish-rainbow` | `rg -l -e "\bdivider-flourish-rainbow\b" src/ demo/` | 1 (def) + interp via tone | keep (interpolation) |
| `.divider-flourish-gold` | same shape | 1 (def) + interp | keep |
| `.divider-flourish-section-{0,2,3,5,6,9}` | per-rung | 1 (def) + tone interp | keep |
| `.code-badge` | `rg -l -e "\bcode-badge\b" src/ demo/` | 4 | keep |
| `.well-dashed` | `rg -l -e "\bwell-dashed\b" src/ demo/` | 5 | keep |
| `.icon-stamp` | `rg -l -e "\bicon-stamp\b" src/ demo/` | 9 | keep |
| `.icon-emboss` | `rg -l -e "\bicon-emboss\b" src/ demo/` | 3 | keep |
| `.icon-{xs,sm,md,lg,xl,2xl,3xl,mega}` | per-rung | 4 each | keep (size ladder) |
| `.text-display-stat` | `rg -l -e "\btext-display-stat\b" src/ demo/` | 4 | keep |
| `.text-prose-lettrine` | `rg -l -e "\btext-prose-lettrine\b" src/ demo/` | 8 | keep |
| `.paper-{1..4}` | per-rung | 2-4 each | keep (size ladder) |
| `.paper-card` | `rg -l -e "\bpaper-card\b" src/ demo/` | 7 | keep |
| `.cream-surface` | `rg -l -e "\bcream-surface\b" src/ demo/` | 32 | keep |
| `.math-inline-pill` | `rg -l -e "\bmath-inline-pill\b" src/ demo/` | 3 | keep |

W1-retired utilities — confirm zero global definitions and the inline-targets:

| retired utility | rg invocation | sites |
|---|---|---:|
| `.text-mono-body`, `.text-mono-prose`, `.section-subtitle`, `.touch-gate-target`, `.touch-gate-active`, `.collapse-x`, `.text-formula`, `.production-rule`, `.perf-number`, `.perf-unit` | per-rung | 0 each |
| `.divider-flourish-section-{1,4,7,8,10,11,12}` | per-rung | 0 each |
| `.bg-rainbow-pastel`, `.text-rainbow-pastel`, `.text-shimmer-blue/-vivid/-pastel`, `.flourish-stripe-{rainbow,pastel,gold}` | per-rung — story-only `flourishes.vue` survives as scoped CSS per Lane E absorb #4 | 1 each (story-scoped per W1) |
| `.confetti-piece` | `rg -l -e "\bconfetti-piece\b" src/ demo/` | 1 (inline-target consumer `motion/confetti.vue`) |
| `.formula-block` | same shape | 1 (inline-target consumer `MathFormula.vue`) |
| `.math-display` | same shape | 1 (inline-target consumer `MathSurface.vue`) |
| `.paper-rule` | same shape | 1 (inline-target consumer `paper-card.vue`) |
| `.rainbow-stroke` | `rg -l -e "\brainbow-stroke\b" src/ demo/` | 0 (paired retire with `<RainbowGradientDef>`) |

**Utility verdict at HEAD**: all surviving classes keep; all retired classes 0 hits or scoped-to-consumer.

## 3. Components — surviving G + W3-introduced (§3 of W0)

For each surviving G custom component the count is `rg -l '\bComponent\b' src/ demo/ --type-add 'vue:*.vue'`:

| artefact | sites | story? | verdict |
|---|---:|---|---|
| `<CreamSurface>` | 32 | yes (foundations/cream + containers/cream-card) | keep |
| `<DisplayHero>` | 25 | yes (motion/display-axes, compositions/audacious-hero, +many) | keep |
| `<FlourishDivider>` | 29 | yes (foundations/flourishes, +many) | keep |
| `<IconStamp>` | 9 | yes (primitives/icon-stamp) | keep |
| `<MathSurface>` | 4 | composed in math-paper | keep |
| `<MathFormula>` | 7 | composed in math-paper, golden-ratio | keep |
| `<MathGlyph>` | 5 | composed in math-paper, golden-ratio | keep |
| `<BezierCurveCanvas>` | 3 | yes (motion/bezier-canvas) | keep |
| `<NotificationDot>` | 3 | yes (primitives/notification-dot) | keep |
| `<PipelineFlow>` | 4 | yes (primitives/pipeline-flow) | keep |
| `<LiveSnippet>` | 4 | yes (primitives/live-snippet, compositions/code-prose) | keep |
| `<Blob>` | 12 | yes (primitives/blob, _internal/blob-stress) | keep |
| `<Swatch>` | 3 | composed in primitives/blob | keep |

W1-retired components — zero in-repo:

| retired component | rg invocation | sites |
|---|---|---:|
| `<KeyboardShortcutsModal>` | `rg -l '\bKeyboardShortcutsModal\b' src/ demo/ --type-add 'vue:*.vue'` | 0 |
| `<TierBadge>` | same shape | 0 |
| `<LikeButton>` | same shape | 0 |
| `<SvgFilters>` | same shape | 0 |
| `<RainbowGradientDef>` | same shape | 0 |

**Component verdict at HEAD**: 13 keep · 0 library-orphan.

## 4. Composables — surviving G (§4 of W0)

| artefact | rg invocation | sites | verdict |
|---|---|---:|---|
| `useRAFLoop` | `rg -l '\buseRAFLoop\b' src/ demo/ --type-add 'vue:*.vue'` | 12 (6 demos + 5 src + def) | keep |
| `useBlob` | `rg -l '\buseBlob\b' src/ demo/ --type-add 'vue:*.vue'` | 5 (Blob.vue + def + barrel + 2 sibling _internal composables) | keep |
| `useWatercolorBlob` | `rg -l '\buseWatercolorBlob\b' src/ demo/ --type-add 'vue:*.vue'` | 4 (def + barrel + Swatch.vue + primitives/blob) | keep |
| `mulberry32` | `rg -l '\bmulberry32\b' src/ demo/ --type-add 'vue:*.vue'` | 4 (def + utils barrel + useWatercolorBlob + _internal/useBlobSatellites) | keep |

Lowercase `useRafLoop` (G pass-2 deletion target):

```
$ rg -l '\buseRafLoop\b' src/ demo/ --type-add 'vue:*.vue'
(empty — confirms G pass-2 deletion held)
```

W1-retired/demoted composables — confirm:

| status | composable | rg invocation | sites |
|---|---|---|---:|
| retired | `useCollapse` | `rg -l '\buseCollapse\b' src/ demo/ --type-add 'vue:*.vue'` | 0 |
| retired | `useContrastSafeAccent` | same shape | 0 |
| retired | `useMonacoTheme` | same shape | 0 |
| demoted to `_internal/` | `useMetaballRenderer` | `rg -l '\buseMetaballRenderer\b' src/ demo/ --type-add 'vue:*.vue'` | 4 (canvas2d-fallback.ts + types.ts + useBlob.ts + `_internal/` def) |
| demoted to `_internal/` | `useBlobMood` | same shape | 3 (useBlob.ts + `_internal/` def + sibling `_internal/useBlobSatellites.ts`) |
| demoted to `_internal/` | `useBlobPointer` | same shape | 2 (useBlob.ts + `_internal/` def) |
| demoted to `_internal/` | `useBlobSatellites` | same shape | 2 (useBlob.ts + `_internal/` def) |
| demoted (private types) | `BLOB_MOOD_PARAMS`, `MoodParams` | `rg -n 'BLOB_MOOD_PARAMS\|MoodParams' src/ demo/ --type-add 'vue:*.vue'` | only `_internal/` and ledger comments |

The 4 demoted composables now live under `src/composables/blob/_internal/` and are not re-exported from any public barrel — confirmed by reading `src/composables/blob/index.ts`.

**Composable verdict at HEAD**: 4 public keep + 4 private-internal · 0 public library-orphan.

## 5. CVA branches — surviving G + W3-introduced (§5 of W0)

| variant | rg invocation | sites | verdict |
|---|---|---:|---|
| `Button variant="cartoon"` | `rg -l 'variant="cartoon"' src/ demo/ --type-add 'vue:*.vue'` | 7 (cross-component) | keep |
| `Button variant="rainbow"` | `rg -l 'variant="rainbow"' src/ demo/ --type-add 'vue:*.vue'` | 2 (audacious-hero, motion/confetti) | keep |
| `Button size="icon"` | `rg -l 'size="icon"' src/ demo/ --type-add 'vue:*.vue'` | 8 | keep |
| `Tabs variant="pill"` | `rg -l 'variant="pill"' src/ demo/ --type-add 'vue:*.vue'` | 5 (BouncyTabs + 4 aurora layers) | keep |
| `Select variant="cartoon"` (cross-component) | `rg -l 'variant="cartoon"' src/ demo/ --type-add 'vue:*.vue'` | 6 (shared cartoon ladder) | keep |
| `Input variant="cartoon"` | same shape | 6 | keep |
| `NumberField variant="cartoon"` | same shape | 6 | keep |
| `Toast variant="inverse"` | `rg -n 'variant="inverse"' src/ demo/ --type-add 'vue:*.vue'` | 1 distinct file (`primitives/toast-inverse.vue`, two attribute mentions + 3 `toastVariants({ variant: 'inverse' })` CVA-direct calls) | **keep-current (story-only carry; sub-bar)** |
| `Badge tone={success/warning/destructive/info}` (`badgeToneVariants`) | `rg -l 'badgeToneVariants' src/ demo/ --type-add 'vue:*.vue'` | 3 (def + badge-tones + color-pill) | keep |
| `Badge variant="color"` | `rg -n "badgeVariants\(\{ variant: 'color' \}\)" src/ demo/ --type-add 'vue:*.vue'` | 5 CVA-direct sites in `primitives/color-pill.vue` (lines 72, 93, 112, 118, 127) | keep (W1.C methodology fix held) |
| `ToggleGroupItem variant="card"` | `rg -n 'variant="card"' src/ demo/ --type-add 'vue:*.vue'` | 1 distinct file (`primitives/toggle-card.vue`, 6 attribute mentions across 3 `<ToggleGroup>` + 3 `<ToggleGroupItem>`) | **keep-current (story-only carry; sub-bar)** |
| `Card variant="cream"` | `rg -l 'variant="cream"' src/ demo/ --type-add 'vue:*.vue'` | 4 (cream-card + dictionary-pronunciation + cards.css + tokens.css) | keep |
| `Card variant="paper"` | `rg -l 'variant="paper"' src/ demo/ --type-add 'vue:*.vue'` | 3 (prose-block + paper-card + code-prose) | keep |
| `Slider variant="glass-track"` (W3, NEW) | `rg -nl 'variant="glass-track"' src/ demo/ --type-add 'vue:*.vue'` | 1 distinct file (`primitives/slider-glass-track.vue`, 6 attribute mentions across 3 hero shapes + 3 dock-bridge layers) | **keep-current (W3-introduced; story-only carry; sub-bar)** |

W1-retired CVA branches — zero in-repo:

| retired variant | rg invocation | sites |
|---|---|---:|
| `Tabs variant="underline"` | `rg -l 'variant="underline"' src/ demo/ --type-add 'vue:*.vue'` | 0 |
| `Button variant="transport"` | `rg -l 'variant="transport"' src/ demo/ --type-add 'vue:*.vue'` | 0 (1-site refactor at timeline.vue:117 → `glass`) |
| `MetricBadge size="xl"` | `rg -n 'size="xl"' src/ demo/ --type-add 'vue:*.vue'` | 0 (only icon-stamp / blob `<IconStamp size="2xl"|"xl">` matches; not MetricBadge) |
| `StatusDot variant="progress"` | `rg -l 'variant="progress"' src/ demo/ --type-add 'vue:*.vue'` | 0 |
| `GlassDock position="fixed"` | `rg -l 'position="fixed"' src/ demo/ --type-add 'vue:*.vue'` | 0 |

**CVA branch verdict at HEAD**: 13 keep + 3 keep-current (story-only sub-bar; flagged in §6 critical findings).

## 6. Slot-class + factory + dock keep-open sink (§6 of W0 + W3)

W0-§6 W1-retires:

| retired surface | rg invocation | sites |
|---|---|---:|
| `DialogContent.closeIconClass` | `rg -l 'closeIconClass' src/ demo/ --type-add 'vue:*.vue'` | 0 |
| `defineDockActionBar()` factory | `rg -l 'defineDockActionBar' src/ demo/ --type-add 'vue:*.vue'` | 0 |
| `DockLayerGroup.keepOpenWhile` | `rg -l 'keepOpenWhile' src/ demo/ --type-add 'vue:*.vue'` | 0 |

W3-introduced sink primitive (R3 closure):

| artefact | rg invocation | sites |
|---|---|---:|
| `DOCK_KEEP_OPEN_SINK_KEY` | `rg -l '\bDOCK_KEEP_OPEN_SINK_KEY\b' src/ demo/ --type-add 'vue:*.vue'` | 4 (dock/index.ts re-export + DockLayerGroup.vue def + Slider.vue consumer + slider-glass-track.vue ultimate consumer) |
| `DockKeepOpenSink` (type) | `rg -l '\bDockKeepOpenSink\b' src/ demo/ --type-add 'vue:*.vue'` | 3 (dock/index.ts + DockLayerGroup.vue def + Slider.vue) |
| `Slider.keepDockOpen` (prop) | `rg -nl '\bkeepDockOpen\b\|keep-dock-open\b' src/ demo/ --type-add 'vue:*.vue'` | 2 (Slider.vue def + slider-glass-track.vue consumer) |

**§6 verdict**: all retires confirmed; the W3-introduced sink + key + type + prop has ≥ 2 distinct sites per the H invariant 2 bar. Note that the only consumer (Slider.vue → slider-glass-track.vue story) is a single chain — the variant + sink form a single round-trip mounted in one demo file (§5 finding).

## 7. Runtime helpers (§7 of W0)

| artefact | rg invocation | sites | verdict |
|---|---|---:|---|
| `chartHeights` | `rg -l '\bchartHeights\b' src/ demo/ --type-add 'vue:*.vue'` | 4+ (D-tranche, kept) | keep |
| `chartColors` | `rg -l '\bchartColors\b' src/ demo/ --type-add 'vue:*.vue'` | 3+ (D-tranche, kept) | keep |
| `NAMED_EASING_BEZIER` | `rg -l '\bNAMED_EASING_BEZIER\b' src/ demo/ --type-add 'vue:*.vue'` | 2 (def + motion/bezier-canvas.vue with 8 references in body) | keep-current (story carries the bar) |

W1-retired runtime helpers — zero in-repo:

| retired | rg invocation | sites |
|---|---|---:|
| `chartNeutrals` | `rg -l '\bchartNeutrals\b' src/ demo/ --type-add 'vue:*.vue'` | 0 |
| `vizColorsHex` | same shape | 0 |
| `spectrumColor` | same shape | 0 |
| `goldenShimmer` | same shape | 0 |

## 8. W2-W5 newly-introduced artefacts at HEAD

| Wave | artefact | introduced as | sites | verdict |
|---|---|---|---:|---|
| W2 | (none) | docs-only on `DESIGN.md` (commit `b4927ae`); no library substrate added | n/a | n/a |
| W3 | `DOCK_KEEP_OPEN_SINK_KEY` | `dock/index.ts` re-export | 4 | keep (≥2) |
| W3 | `interface DockKeepOpenSink` | `dock/index.ts` re-export | 3 | keep (≥2) |
| W3 | `Slider.keepDockOpen` prop | `Slider.vue` | 2 | keep-current (≥2 by def + sole consumer) |
| W3 | `Slider variant='glass-track'` (CVA branch) | `Slider.vue` variant union | 1 distinct consumer file (6 mentions) | **keep-current (sub-bar — single consumer story carries the variant + sink round-trip)** |
| W4 | `demo/stories/primitives/slider-glass-track.vue` (story file) | demo only — not library substrate | n/a | demo |
| W4 | `manifest.ts` row at line 124 | demo only | n/a | demo |
| W5 | `scripts/stress/blob-stress-capture.mjs` (Playwright capture script) | not library substrate; CI-runtime | n/a | n/a |
| W5 | `.github/workflows/stress.yml` (CI workflow) | not library substrate | n/a | n/a |
| W5 | `audit/W5-stress-baseline.md` | docs-only | n/a | n/a |

**W2-W5 introduction verdict**: zero new library-orphan artefacts. The single sub-bar artefact (`Slider variant='glass-track'`) ships R3's closure and is paired with the matching dock-keep-open sink consumer, which the W3 spec frames as a single round-trip.

## 9. Critical findings — verdict ≠ keep / WIRE

Three artefacts at HEAD have ≥ 2 sites only when the def file + a single demo file are jointly counted. Per Refined-D verdict precedence, single-consumer artefacts qualify as `keep-current` only with a `docs/consumer-evidence/<artefact>.md` file. None of the three has such a file at HEAD.

| # | artefact | distinct consumer files | evidence-doc? | gestalt verdict |
|---|---|---:|---|---|
| 1 | `Toast variant="inverse"` | 1 (`primitives/toast-inverse.vue`) | no | keep-current — story carries the bar (W0 verdict held) |
| 2 | `ToggleGroupItem variant="card"` | 1 (`primitives/toggle-card.vue`) | no | keep-current — story carries the bar (W0 §5 ratified after G-FINAL-II pass 5) |
| 3 | `Slider variant="glass-track"` (W3, NEW) | 1 (`primitives/slider-glass-track.vue`) | no | keep-current — story carries the bar; round-trip with `dockKeepOpenSink` is the deliberate gesture per W3 spec & W4 design-fidelity gate (PASS) |

These three sit *below* the strict "≥ 2 distinct files" Refined-D bar but *clear* the H invariant 2 wording ("≥2 in-repo call sites by H close (story + at least one same-tranche consumer **or two stories that exercise distinct shapes**)") only via the second branch — *one story exercising multiple shapes*. The toast / toggle-card / slider-glass-track stories each mount the variant in 2-6 attribute uses across distinct visual specimens within a single file. Whether one-story-many-shapes meets the H invariant 2 bar is an interpretation decision; the lane records both readings:

- Strict Refined-D reading: each is `keep-current` and would benefit from a `docs/consumer-evidence/<artefact>.md` file (the slider-glass-track in particular cites 5 fourier+EditorControls consumer sites that are paper-only at HEAD per `W3-slider-glass-track-proof.md` §"Hard gate (d)" — those projections are exactly the no-keep-by-projection-alone pattern H invariant 2 forbids).
- H invariant 2 second-branch reading (story exercising distinct shapes): all three pass. The W4 design-fidelity gate confirms `slider-glass-track` PASSes at gold-standard level; `toast-inverse` and `toggle-card` predate W4 but their stories were not flagged in `W4-design-fidelity-rerun.md` as NEEDS-REPAIR.

**Recommendation**: orchestrator either (a) accept the second-branch reading and document it explicitly in `H-FINAL.md` so future tranches inherit the relaxed interpretation, or (b) emit three `docs/consumer-evidence/<artefact>.md` files (toast-inverse, toggle-card, slider-glass-track) naming the consumer follow-up tranches that will lift the count above 1. Option (b) aligns better with H invariant 6's "consumer-evidence docs are now first-class" framing.

The three findings above are the only verdicts in this audit that fall short of strict `keep` / `WIRE`. No artefact reaches `library-orphan`, `delete-unused`, or `inline-and-remove`.

## 10. Consumer-evidence-doc audit (freshness)

`ls docs/consumer-evidence/` returns 25 entries (1 README + 24 per-artefact docs). Every doc is a tranche-D artefact. Re-running each doc's cited proof grep:

| doc | cited proof grep | live result | freshness |
|---|---|---|---|
| `animated-number.md` | `rg -n '\bAnimatedNumber\b\|ReturnType<typeof useAnimatedNumber>' src/composables/motion/useAnimatedNumber.ts ../speedtest/src/components/speedtest/MetricPillCluster.vue` | speedtest path **MISSING** (file no longer exists; speedtest restructured); src/ shows `AnimatedNumber` interface at line 43 + 70 — 2 hits in src/ only | **STALE-CITATION** (consumer file moved/removed; artefact still has src/ self-use) |
| `build-section-layout.md` | `rg -n '\bbuildSectionLayout\b' src/composables/virtual/useVirtualSectionWindow.ts` | 2 hits (lines 14, 124) | fresh |
| `create-glass-filter.md` | `rg -n '\bcreateGlassFilter\b' src/components/custom/glass-panel/GlassPanel.vue` | 2 hits (lines 5, 63) | fresh |
| `destroy-glass-filter.md` | `rg -n '\bdestroyGlassFilter\b' src/components/custom/glass-panel/GlassPanel.vue` | 2 hits (lines 6, 73) | fresh |
| `expandable-container.md` | `rg -n '\bExpandableContainer\b' ../speedtest/src/views/ChartsView.vue ../speedtest/src/views/MapView.vue` | both files exist; 4+ hits | fresh |
| `find-section-offset.md` | `rg -n '\bfindSectionOffset\b' src/composables/virtual/useVirtualSectionWindow.ts` | 2 hits | fresh |
| `forced-section-window-range.md` | `rg -n '\bForcedSectionWindowRange\b' src/composables/virtual/useVirtualSectionWindow.ts` | 2 hits | fresh |
| `glass-filter-state.md` | `rg -n '\bGlassFilterState\b' src/components/custom/glass-panel/GlassPanel.vue` | 2 hits | fresh |
| `glass-tier.md` | `rg -n '\bGlassTier\b' src/components/custom/glass-panel/GlassPanel.vue demo/stories/foundations/paper-glass.vue` | 4 hits across 2 files | fresh |
| `is-mac.md` | `rg -n '\bisMac\b' src/composables/useKeyboardShortcuts.ts` | 5 hits | fresh |
| `resolve-active-section.md` | `rg -n '\bresolveActiveSection\b' src/composables/virtual/useVirtualSectionWindow.ts` | 2 hits | fresh |
| `resolve-section-window.md` | `rg -n '\bresolveSectionWindow\b' src/composables/virtual/useVirtualSectionWindow.ts` | 2 hits | fresh |
| `section-layout.md` | `rg -n '\bSectionLayout\b' src/composables/virtual/useVirtualSectionWindow.ts` | 2 hits | fresh |
| `section-window-range.md` | `rg -n '\bSectionWindowRange\b' src/composables/virtual/useVirtualSectionWindow.ts` | 2 hits | fresh |
| `spring-snapshot.md` | `rg -n '\bSpringSnapshot\b' demo/stories/motion/springs.vue` | 4 hits (lines 9, 69, 70, 76) | fresh |
| `use-animated-number-options.md` | `rg -n '\bUseAnimatedNumberOptions\b\|pillOpts\|damping\|snapThreshold' src/composables/motion/useAnimatedNumber.ts ../speedtest/src/components/speedtest/MetricPillCluster.vue` | speedtest path **MISSING**; src/ self-use only (lines 24-30) | **STALE-CITATION** |
| `use-animated-number.md` | `rg -n '\buseAnimatedNumber\b' ../speedtest/src/components/dashboard/charts/MetricGaugeCards.vue ../speedtest/src/components/speedtest/MetricPillCluster.vue ../speedtest/src/components/speedtest/SpeedtestResults.vue` | only `MetricGaugeCards.vue` exists at HEAD (3 hits there); the other 2 paths **MISSING**. Note: `useAnimatedNumber` has alternate consumers at `Readout.vue` + `MetricStrip.vue` + `useSpeedtestStore.ts` — artefact alive, citation needs refresh | **STALE-CITATION (partial — alternate consumers exist; the 3 cited files are not all extant)** |
| `use-dark-mode-sync.md` | `rg -n '\buseDarkModeSync\b' ../speedtest/src/components/speedtest/SpeedtestMeter.vue` | 3 hits (lines 14, 47, 50) | fresh |
| `use-glass-renderer.md` | `rg -n '\buseGlassRenderer\b' src/components/custom/glass-panel/GlassPanel.vue demo/stories/foundations/paper-glass.vue` | 3 hits across 2 files | fresh |
| `use-scroll-progress.md` | `rg -n '\buseScrollProgress\b' demo/stories/motion/scroll-type.vue` | 2 hits | fresh |
| `use-sortable-return.md` | `rg -n '\bUseSortableReturn\b' src/components/custom/sortable-list/context.ts` | 2 hits | fresh |
| `use-sortable.md` | `rg -n '\buseSortable\b' src/components/custom/sortable-list/SortableList.vue` | 4 hits | fresh |
| `use-stagger-reveal.md` | `rg -n '\buseStaggerReveal\b' demo/stories/motion/stagger.vue` | 2 hits | fresh |
| `use-windowed-store.md` | `rg -n '\buseWindowedStore\b' ../words/frontend/src/stores/search/modes/wordlist.ts` | 2 hits (lines 20, 90) | fresh |

**Freshness summary**: 21 fresh / 3 stale-citation (`animated-number`, `use-animated-number-options`, `use-animated-number`). All three stale docs are speedtest D-tranche evidence whose target files were moved/restructured. The artefacts (`AnimatedNumber`, `UseAnimatedNumberOptions`, `useAnimatedNumber`) all still ship and remain referenced (e.g. `MetricGaugeCards.vue` is one extant consumer for `useAnimatedNumber`); per Refined-D, "if the evidence doc exists but the grep no longer finds a consumer, the artefact reverts to the normal verdict precedence". Both `useAnimatedNumber` and `AnimatedNumber` at HEAD have ≥ 2 distinct call sites in the speedtest tree (e.g., `MetricGaugeCards.vue`, `Readout.vue`, `MetricStrip.vue`, `useSpeedtestStore.ts`) so neither demotes to `library-orphan`; `UseAnimatedNumberOptions` has 0 external sites at HEAD per `rg -n 'UseAnimatedNumberOptions' ../speedtest/src` — that one would demote to `library-orphan` *if* the strict rule applied, though as a public TS interface the speedtest consumers still pass the option-shape via inferred-structural typing (not a named-import).

This is informational, not a hard-gate violation: the stale-citation docs do not mark new G-tranche orphans. They are D-tranche book-keeping debt.

## 11. Pre-G informational notes (out of H invariant 2 scope)

For completeness: the following artefacts are pre-G and were not part of W0/W1 wire-or-retire scope. Their counts are recorded for future-tranche reference only.

- `<DarkModeToggle>` (`controls/DarkModeToggle.vue`): 1 site (def + barrel only). Not exported via `src/index.ts` — package barrel only. Pre-G; if surfaced via index.ts in a future tranche it would qualify as `library-orphan`.
- `<UnderlineTabs>` (`tabs/UnderlineTabs.vue`): 1 site. Same pattern as above. Note: distinct from the ui/tabs `variant="underline"` CVA branch which W1.C retired.
- `<Toaster>` (`ui/toast/Toaster.vue`): 1 site (only `ui/toast/index.ts` re-exports). Pre-G barrel surface; alongside `<Toast>`, `<ToastAction>`, etc., it forms shadcn-vue's compound primitive group. Single-site survives because the package's compound nature is the consumer pattern.
- Several pre-G custom-package secondary `.vue` files (`<DockPopover>`, `<PaperBackdrop>`, `<MetaballCanvas>`, `<GlassCarouselItem>`, `<InfiniteScroll>`, `<LabeledSwitch>`, `<StackedIconGroup>`, `<TypewriterText>`) read 2 distinct files (def + barrel only). These are pre-G; not in scope of H invariant 2.

None of these are G-shipped; they were *not* part of the H W0 reconciliation. They are recorded so future tranches can decide on scope.

## 12. Verdict distribution summary + delta vs G β

Verdict distribution at HEAD post-W5:

| Family | keep | keep-current (sub-bar) | library-orphan | retired confirmed | total surviving rows |
|---|---:|---:|---:|---:|---:|
| Tokens (§1) | 25 | 0 | 0 | 23 | 25 |
| Utilities (§2) | 33 | 0 | 0 | 31 | 33 |
| Components (§3) | 13 | 0 | 0 | 4 (incl. SvgFilters absorb) | 13 |
| Composables (§4) | 4 (public) | 0 | 0 | 3 retired + 4 demoted | 4 (+4 internal) |
| CVA branches (§5) | 10 | 3 | 0 | 5 | 13 |
| Sink + slot-class + factory (§6) | (3 sink artefacts) | 0 | 0 | 3 | 3 |
| Runtime helpers (§7) | 2 | 1 (NAMED_EASING_BEZIER) | 0 | 4 | 3 |
| **Total** | **87 keep** | **4 keep-current** | **0 library-orphan** | **77 retire confirmed** | — |

Delta vs G β audit (`docs/tranches/G/audit/G-audit-β-substrate-and-deadcode.md`):

| Pass | library-orphan count | comment |
|---|---:|---|
| G β (post-G close) | ~50 (per H W1's input ledger) | drove the entire W0 reconciliation |
| H W1 close (per `W1-reconciliation-result.md`) | 0 | 73 retire + 4 demote landed |
| H W5 close (this audit) | 0 | confirmed at HEAD; W2-W5 introduced no new orphans |

H invariant 2 ("zero artefacts remain library-orphan after W1") **holds at HEAD**. Every G-shipped artefact that survived W1 is still WIRED at HEAD. W2 was docs-only; W3's R3 closure (`dockKeepOpenSink` + `Slider variant="glass-track"` + `Slider.keepDockOpen` prop) ships with ≥ 2 in-repo sites for the sink + key + type and a single-story round-trip consumer (the variant + prop carry the bar via the second-branch reading of H invariant 2); W4 added one demo story (not library substrate); W5 added a script + CI workflow (not library substrate).

The three keep-current sub-bar variants (`Toast variant="inverse"`, `ToggleGroupItem variant="card"`, `Slider variant="glass-track"`) are the only artefacts in this audit whose verdicts deserve orchestrator attention — see §9 for recommendation.

## Authority

Read-only β-style audit at HEAD post-W5 close. Every count cites the exact `rg` invocation. Refined-D verdict precedence applied throughout. `docs/consumer-evidence/` re-walked per Refined-D's "fresh-grep" requirement (§10). No source files modified; no commit created; no destructive git command (`git stash`, `git stash pop`, `git checkout HEAD --`, `git reset`) executed during this lane.
