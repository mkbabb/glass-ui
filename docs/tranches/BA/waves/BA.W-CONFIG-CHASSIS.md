# BA.W-CONFIG-CHASSIS — the configurator chassis made whole: the 0px-slider class dies, the gear folds onto the library anatomy

**Name**: W-CONFIG-CHASSIS - the configurator chassis made whole
**Opens after**: Batch 1 (W-DARK-MATERIAL — the dark register is the prerequisite, BA inv-5; the divider-lift arm reads the re-tuned dark plate). Runs ‖ W-GOO-REDRESS ‖ W-DOCK-GEOMETRY ‖ W-FADING-SCROLL (Batch 2, disjoint file bounds per the EXECUTION-DAG §3 table).
**Agents**: 3 parallel (the chassis-width unit · the aurora-section + color-swatch unit · the gear-recompose + dark-row + preset-alpha unit) — disjoint modify paths, see §Disjointness.
**Hard gate**: `proof:config-chassis` (born-RED) — six falsifiable SOURCE witnesses (slider-width contract, divider-token register, color-swatch register, chip-overflow contract, gear-on-chassis, dark-row-on-DarkModeToggle) + the alpha-clamp source assert + the BINDING π readback (a slider inside `<ConfiguratorRow>` paints non-zero width, the gear sections resolve the 20.4px rung, the dark row flips `html.dark`, the Speedtest swatch reads vivid) + the `configurators+goo` row of `proof:ba-gestalt` PASS (BA inv-4 — per-mechanism greens alone do not close a visual wave).
**Status**: SPEC

## Goal criterion

The library configurator is a USABLE instrument in BOTH modes: every slotted slider paints at the row's full inline width (the R8-7 "labels with no controls" class dies at the chassis, not per-consumer), the gear PresetEditor reads as a Configurator (one anatomy, one source of truth — the parallel `PresetEditorField` retired), the dark-mode row actually flips the live mode via the canonical `DarkModeToggle`, and a chip group, a color seed, and a dim Speedtest swatch each read as the designed register rather than a clipped/raw/muted slab. A user opening `/substrates/blob`, `/substrates/aurora`, and the gear sees three instruments cut from ONE refined anatomy.

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the fleet's root-caused mechanisms, not a blind re-diagnose (BA inv-3 — re-opened ≠ rebuilt-blind). Before touching a byte, the impl agent re-greps each anchor below at HEAD and confirms the mechanism still holds; if a cite has drifted (a line moved, a class renamed), the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the diagnosis. The configurator surface is shared by FOUR consumers (aurora · blob · gear · primitive story); a chassis edit reaches all four, so the RE-GROUND confirms the slot/width path is still the single seam before it is widened.

Grounding findings (the five fleet lanes):
- **CFG-1 / goo (a) / WVR-2** — the 0px slider: the `ConfiguratorRow` slot × `LabeledField`-family width-collapse. `configurator-occlusion.md` defect 1; `goo-studio.md` (a); `waves-vs-reality.md` headline 2.
- **CFG-2** — the DERIVE-FROM-COLOR chip row hard-clips. `configurator-occlusion.md` defect 2.
- **CFG-3** — the aurora Seed is a raw full-width browser color slab. `configurator-occlusion.md` defect 3.
- **CFG-4** — the section/inter-row dividers vanish on the dark plate (off-token `border-border/N` alpha). `configurator-occlusion.md` defect 4.
- **CFG-5** — the hierarchy vocabulary half-consumed; the gear is OFF the chassis entirely. `configurator-occlusion.md` defect 5.
- **BA-DARK-F1 / WVR-3** — the gear dark row is a NO-OP `<Switch>` over a `delta.dark` shadow desync. `darkmode-toggle.md` F1.
- **BA-DARK-F2** — the control is a plain `<Switch>`, not the canonical animated `DarkModeToggle`. `darkmode-toggle.md` F2.
- **PPD-1** — the Speedtest preset preview composites a 0.26-alpha thumbnail over the opaque near-black `bg-card`. `preset-preview-dim.md`.

Captures (the RED evidence, beside each lane report under `docs/tranches/BA/audit/fleet/`):
`configurator-occlusion-{aurora-aside,blob-aside,gear-sheet}-dark.png`,
`goo-studio-{sliders-collapsed-dark,remedy-validated}.png`,
`darkmode-{configurator-open,switch-mismatch}-dark.png`,
`preset-preview-dim-dark.png`; the R8 ground anchors `ground/R8-04-aurora-configurator-occlusion-{a,b}.png`, `ground/R8-05-speedtest-preview-dim.png`, `ground/R8-07-goo-configurator-broken.png`.

The seven mechanisms (each independently confirmed at HEAD this authoring):

1. **The slider slot offers no width contract.** `ConfiguratorRow.vue:120` wraps the slot in `<div class="flex items-center"><slot/></div>`. A flex item is `flex: 0 1 auto`, so its main-axis (width) is content-sized; `LabeledField.vue:2` roots a bare `<div class="labeled-field">` (`display:block`, no `w-full`), and the reka slider track has no intrinsic min-width — its inner `.glass-slider w-full` resolves `100%` against a content-sized parent → circular → **0**. Live: the 8 blob studio sliders are in the DOM (`display:flex`, `visibility:visible`) at `getBoundingClientRect().width === 0`; the SELECT rows survive because the trigger `<button>` carries intrinsic content width. The remedy was live-validated read-only (goo-studio.md): `flex:1 1 0%; min-width:0; width:100%` on the slotted `.labeled-field` restored 0→335px. Reproduces in BOTH light and dark and at 390px — mechanical layout, not a register defect. Library-wide: `/compositions/configurator` is the second broken consumer.

2. **The DERIVE chip group hard-clips at the card edge.** `AuroraColorSection.vue:167` is `<ToggleGroup class="flex-1">` with 4 `<ToggleGroupItem class="h-8 flex-1 px-1.5 …">` whose min-content uppercase labels (ANALOGOUS/COMPLEMENT/TRIAD/MONO) sum past the ~360px aside; the items can't shrink below their min-content, so the group's scrollWidth (366) exceeds the aside content (~326), and the `overflow-x-clip` scroll wrapper at `AuroraConfigDock.vue:229` slices MONO off by ~40px. Mode-independent (mechanical).

3. **The Seed is a raw browser color slab.** `AuroraColorSection.vue:123` is `<input type="color" class="h-8 w-full …">` → a 335×32 solid slab carrying one swatch's information at the visual weight of a full slider. There is no library color-swatch register; three divergent treatments exist (aurora Seed `:123`, aurora DERIVE seed `:160-166`, blob Seed a bare text `input-pill`).

4. **The dividers are off-token alpha, invisible on dark.** `.configurator-layer` carries `border-b border-border/40`; `<ConfiguratorLayer dividers>` rows carry `border-t border-border/30`. Over the dark `glass-floating` plate these are near-equal-luminance and effectively invisible — the "sections run together" read. The W-HIERARCHY label rungs resolve (20.4px section / 16.4px row / mono caption, live-verified) but no divider register adapts to dark; the dividers are NOT tokenized.

5. **The gear is a parallel chassis, OFF the library anatomy.** `demo/configurator/PresetEditor.vue` hand-rolls `<section>` + `<h3 class="text-xs font-mono uppercase tracking-wider text-muted-foreground">` headers (12px mono eyebrow — BELOW body, reads as a caption not a section) and a `PresetEditorField` clone of `ConfiguratorRow` (`gap-1.5 py-2` + reset + name + desc — byte-for-byte the same surface, a second source of truth). It inherits NONE of the W-HIERARCHY vocabulary.

6. **The dark row is a desynced NO-OP `<Switch>`.** `PresetEditor.vue:93-96` binds `darkModel` to `cfg.effective("dark")` / `cfg.setField("dark", …)`; `:188` renders `<Switch v-model="darkModel"/>`. `preset-editor/store.ts:105-117` (`effective`) returns `delta.dark ?? DEFAULT_CONFIG.dark` (false), never reading `isDark.value` → the boot mismatch (switch OFF over a dark page). `store.ts:168-174` (`setField("dark")`) flips only on `v !== isDark.value`, which the boot-desync makes unreachable; `store.ts:152-161` short-circuits `v===false` to `clearField` before the toggle branch — both directions NO-OP. The canonical `DarkModeToggle.vue` reads `isDark` directly and owns no shadow delta (it can never desync); R4-3's intent was the "dark-mode toggle COMPONENT at the TOP" — the AZ close greened on placement and substituted a Switch.

7. **The Speedtest swatch bakes 0.26 alpha over the opaque card.** `presets.ts:450` is the only `alpha:` override (`0.26`; lib default 1.0). The aurora fragment multiplies output-alpha by `uAlpha` (`aurora.frag.ts:403`, `fragColor = vec4(col*uAlpha, uAlpha)`); the thumbnail bakes onto a transparent clear (`runtime.ts:230` `clearColor(0,0,0,0)`), so the webp carries a real 26% alpha; `PresetPickerRow.vue:99,119-125` composites it over `bg-card` (dark `rgb(28,25,23)`) → 0.26×aurora + 0.74×near-black, the lone dim outlier (live pixel-readback: every other preset mean-alpha 1.000, Speedtest 0.259). `alpha` is substrate-relative; a preview swatch has no live substrate, so a sub-1 alpha cannot read as intended. The freeze seam `freezeCfg` (`usePresetThumbnails.ts:17-28`) already zeroes the drift channels (`nucleiDrift`/`paletteDrift`/`warpDrift`/`breathDepth`) for a deterministic capture — alpha belongs in that SAME canonicalization.

RE-GROUND command set (run all; confirm each mechanism):

```
sed -n '118,126p' src/components/custom/configurator/ConfiguratorRow.vue   # the flex-items-center slot
sed -n '1,12p'    src/components/custom/labeled-field/LabeledField.vue     # the bare display:block root
sed -n '118,180p' demo/stories/aurora/sections/AuroraColorSection.vue      # Seed slab + DERIVE chip group
sed -n '93,96p;186,190p' demo/configurator/PresetEditor.vue                # darkModel + the Switch render
sed -n '105,117p;152,174p' demo/configurator/preset-editor/store.ts        # the delta.dark desync
sed -n '444,451p' demo/stories/aurora/presets.ts                           # the alpha: 0.26 override
sed -n '17,28p'   demo/stories/aurora/usePresetThumbnails.ts               # the freezeCfg drift-zero seam
grep -n 'configurator-divider' src/styles/tokens/offsets-sizing.css        # MUST be empty (the un-tokenized divider)
grep -rn 'border-border/' src/components/custom/configurator/              # the off-token divider alphas
```

## Defect table (file:line — RE-GREP at HEAD)

| # | finding | file:line | the mechanism |
|---|---|---|---|
| 1 | CFG-1 / goo(a) / WVR-2 [S1] | `ConfiguratorRow.vue:120` (`<div class="flex items-center">`); `LabeledField.vue:2` (`<div class="labeled-field">` block) | flex item content-sized × block root with no `w-full` × percentage-against-zero → 0px slider |
| 2 | CFG-2 [S1] | `AuroraColorSection.vue:167` (`<ToggleGroup class="flex-1">`, 4 `flex-1` items); `AuroraConfigDock.vue:229` (`overflow-x-clip`) | 4 min-content uppercase chips overflow the 360px aside → MONO clipped ~40px |
| 3 | CFG-3 [S2] | `AuroraColorSection.vue:123` (Seed `<input type=color w-full>`), `:160-166` (DERIVE seed input); blob Seed `input-pill` | raw full-width browser color slab; three divergent color-input treatments, no library register |
| 4 | CFG-4 [S2] | `.configurator-layer` `border-b border-border/40`; `<ConfiguratorLayer dividers>` `border-t border-border/30`; (un-tokenized — `grep configurator-divider` → 0) | off-token alpha dividers, near-equal-luminance on the dark glass plate → "sections run together" |
| 5 | CFG-5 [S2] | `PresetEditor.vue` (hand-rolled `<section>` + `<h3 text-xs font-mono uppercase>`); `PresetEditorField.vue` (the `ConfiguratorRow` clone) | a parallel configurator chassis off the W-HIERARCHY vocabulary; 12px mono eyebrow ≠ the 20.4px section rung |
| 6 | BA-DARK-F1+F2 / WVR-3 [S2+S3] | `PresetEditor.vue:93-96,188` (`darkModel`→Switch); `store.ts:105-117,152-174` (`delta.dark` desync) | the dark row reads a shadow `delta.dark` not the live `isDark`; NO-OP both directions; wrong control |
| 7 | PPD-1 [S2] | `presets.ts:450` (`alpha: 0.26`); `usePresetThumbnails.ts:17-28` (`freezeCfg`); `PresetPickerRow.vue:99,119-125` | the 0.26-alpha thumbnail composites over the opaque dark `bg-card` → the lone dim Speedtest swatch |

## Scope

1. **THE WIDTH CONTRACT (S1; root cause 1).** `ConfiguratorRow.vue:120`'s control slot establishes a definite-width block context — the slotted control fills the row's free inline axis regardless of intrinsic content width — AND the `LabeledField` family root (`LabeledField.vue:2`) claims full width so a slotted slider with an `sr-only`/`hide-label` label still occupies its inline space (the AZ.W-BLOB-REDRESS `hide-label` regression: the label was the only width contributor). The fix is the chassis guarantee the live experiment validated (`flex:1 1 0%; min-width:0; width:100%` on the slotted child, expressed as the chassis contract — the impl agent picks the idiomatic CSS shape that fills the row), so the 0px-slider class dies once, library-wide, not per-consumer. The SELECT/swatch rows (already width-bearing) are unaffected. Resolve the redundant double-label at the same seam: the row owns the label, the slotted control is label-less by contract (`ConfiguratorRow label` + `LabeledSlider hide-label` is the current double-label).
2. **The in-row option-group OVERFLOW contract (CFG-2).** A chip/segmented group inside the aside WRAPS to a second line when its items exceed the row width (the natural fit for the 4-harmony DERIVE row) OR routes to the fading-scroll seam — NEVER hard-clips. Apply it to the DERIVE `<ToggleGroup>` (`AuroraColorSection.vue:167`) so MONO stops being sliced; the `AuroraConfigDock.vue:229` `overflow-x-clip` becomes redundant once the group cannot overflow (the impl agent may leave it or drop it — the binding outcome is no clip, not the clip-rule's removal). Where the contract routes to fading-scroll it consumes the `<FadingScroll>` primitive W-FADING-SCROLL mints (coordination note: the `.scroll-fade-*` static utilities retire in W-FADING-SCROLL's bound, LAST; this wave adopts the primitive inside its OWN files only — see §File Bounds).
3. **A first-class color-swatch / seed row register (CFG-3).** A library swatch control (a bordered, radius'd, proportioned swatch + a hex affordance) replaces the raw full-width `<input type=color>` slab and the three divergent color treatments (aurora Seed, aurora DERIVE seed, blob Seed). It is a `custom/` package consumed by every configurator that needs a color input — born ≥2 consumers by construction (aurora Seed + aurora DERIVE seed, both in this wave's bound; the blob Seed re-point is in W-GOO-REDRESS's bound and is named as the third consumer, not folded here). The swatch is a proportioned chip, NOT a heavy undifferentiated block.
4. **The `--configurator-divider-*` token register with a dark-lifting arm (CFG-4).** Promote the section + inter-row dividers off inline `border-border/40` onto a `--configurator-divider-*` token (minted in `tokens/offsets-sizing.css`, consumed in `configurator.css` + the SFC) that lifts its weight over the dark plate the SAME self-adaptive way the adaptive-glass tint axis does — ONE knob, both rules read it, dividers survive dark. The dark arm reads the W-DARK-MATERIAL re-tuned plate (the Batch-1 prerequisite). Pair with an optional faint section-header tonal step so a section reads as a section without relying on the hairline alone (within the W-HIERARCHY register, not a new heading rung).
5. **The gear PresetEditor RECOMPOSED on the Configurator chassis (CFG-5; clean break).** `PresetEditor.vue` composes `<Configurator>`/`<ConfiguratorLayer>`/`<ConfiguratorRow>` so its sections read on the 20.4px `.configurator-section-label` rung (off the 12px mono `<h3>` eyebrow); `PresetEditorField.vue` RETIRES onto `ConfiguratorRow` (deleted — clean break, no alias, BA inv-7). The W-HIERARCHY vocabulary becomes the single source of truth for every configurator's section/row/divider rhythm.
6. **The dark-mode row composes `DarkModeToggle` bound to the live `useGlobalDark` (BA-DARK-F1+F2).** The parallel config-store `dark` field DIES: the `delta.dark` modeling at `store.ts:105-117` (the `effective("dark")` branch) + `:152-174` (the `setField("dark")` toggle/short-circuit branch) is removed (clean break); the Appearance row renders the canonical animated `<DarkModeToggle>` (the sun/moon SVG, self-syncing over `isDark`/`toggleDark`) at the TOP of the section. The row's `can-reset` re-points to the `useGlobalDark` reset (mode→system/default), not `clearField('dark')`. The `watch(isDark)` mirror at `store.ts:278-288` retires with the field (no delta to mirror into).
7. **The Speedtest preset preview alpha CLAMPED to 1 at the bake seam (PPD-1).** `freezeCfg` (`usePresetThumbnails.ts:17-28`) sets `alpha: 1` alongside the drift-zeroing it already does — the swatch shows the preset's COLOR, not its deployment-time translucency. The `presets.ts:450` `alpha: 0.26` STAYS (it is the legitimate live-substrate runtime baseline for the speedtest consumer); the clamp is at the CAPTURE canonicalization only, the idiom-match the freeze already speaks.

## Triumvirate Dispatch

- **File-bounds expansion that invalidates the wave**: if the width contract (scope 1) cannot be made a CHASSIS guarantee at `ConfiguratorRow.vue` + `LabeledField.vue` without editing the shared reka `slider`/`Primitive` track internals (a cross-component surface other consumers depend on) — that is a scope-reveal; triumvirate (research the flex-min-width seam + plan-augment the bound + redress), do NOT widen into reka primitives unilaterally.
- **The gear recompose breaks a non-configurator store consumer**: if removing the `delta.dark` field + `PresetEditorField` (scope 5/6) reveals the preset-editor store's `dark`/field machinery is consumed by a surface OTHER than the gear PresetEditor (a second store consumer), that is a scope-reveal — triumvirate, do not delete blind.
- **Hard-gate failures not local-edit-recoverable**: if the π slider-width readback still measures 0px after the chassis width contract lands (a deeper percentage-resolution path than the slot), or the divider π contrast cannot clear a visible step on the dark plate after the token re-point, that is a register-design miss — triumvirate, do not loop on CSS values.
- **Diagnostic loop halt**: if the dark row still fails to flip `html.dark` after the `DarkModeToggle` adoption and three iterations have not isolated the binding (a residual `delta.dark` read path, a `useGlobalDark` singleton-instance mismatch), halt and triumvirate (the global-vs-local source-of-truth seam is the suspect).

## File Bounds

| File | Access |
|---|---|
| `src/components/custom/configurator/ConfiguratorRow.vue` | modify (the width-contract slot) |
| `src/components/custom/labeled-field/LabeledField.vue` | modify (full-width root + label-less-control hardening) |
| `src/components/custom/configurator/Configurator.vue` | modify-carve (divider-token consumption; overflow-contract reconcile) |
| `src/components/custom/configurator/ConfiguratorLayer.vue` | modify (divider-token consumption off `border-border/N`) |
| `src/styles/configurator.css` | modify (the `--configurator-divider-*` rules + the section tonal step) |
| `src/styles/tokens/offsets-sizing.css` | modify (mint `--configurator-divider-*` + the dark-lifting arm) |
| `src/components/custom/color-swatch/` | create (the swatch/seed row register package — component + `index.ts`) |
| `src/subpaths/color-swatch.ts` | create (the one-line subpath mirror barrel) |
| `src/api/index.ts` | modify (export the swatch's public type, if any) |
| `demo/stories/aurora/sections/AuroraColorSection.vue` | modify (DERIVE overflow contract; Seed + DERIVE-seed → the swatch register) |
| `demo/stories/aurora/AuroraConfigDock.vue` | modify-carve (the redundant `overflow-x-clip` reconcile) |
| `demo/configurator/PresetEditor.vue` | modify-carve (recompose on the chassis; dark row → `DarkModeToggle`) |
| `demo/configurator/PresetEditorField.vue` | delete (retires onto `ConfiguratorRow` — clean break) |
| `demo/configurator/preset-editor/store.ts` | modify-carve (delete the `delta.dark` field + the `watch(isDark)` mirror) |
| `demo/configurator/preset-editor/defaults.ts` | modify (drop the `dark` baseline default — the field is gone) |
| `demo/stories/aurora/usePresetThumbnails.ts` | modify (the `alpha: 1` clamp in `freezeCfg`) |
| `scripts/proof-config-chassis.mjs` | create (the born-RED gate) |
| `package.json` | modify (register `proof:config-chassis` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row `{ id, cmd }` in the registry) |
| `tests-visual/config-chassis.spec.ts` | create (the π readback DELTA spec) |
| `CLAUDE.md` | modify (record the chassis width contract + swatch register + divider token + gear-on-chassis in the Configurator-contract section) |

Do NOT touch:
- **The shared reka `slider`/`Primitive` track internals** (`src/components/ui/slider/`) — the width contract lives at the configurator chassis + LabeledField roots, NOT in the primitive (firing the triumvirate above if it cannot).
- **`src/components/custom/goo-blob/*`** — W-GOO-REDRESS (Batch 2 ‖) owns the renderer half (wake seam + satellite envelope) AND the blob Seed → swatch re-point; the goo "jittery" defect is split by mechanism (the W-REFLECT2 `configurators+goo` verdict checks both halves landed). This wave does not touch goo files; it MINTS the swatch register the blob Seed will later consume.
- **`demo/stories/substrates/blob.vue`** — W-GOO-REDRESS's bound (`STUDIO_GEO_BASE` + the blob studio). The blob studio's sliders are fixed by the LIBRARY chassis edit (scope 1) without touching this file.
- **The `.scroll-fade-*` static utilities + `src/components/custom/fading-scroll/`** — W-FADING-SCROLL (Batch 2 ‖) mints `<FadingScroll>` and retires the static utilities LAST (the orchestrator-owned final retire at batch close per the EXECUTION-DAG §3 coordination seam). This wave CONSUMES `<FadingScroll>` inside its own files (the DERIVE overflow route) but does not write the primitive or the utility retirement. `Configurator.vue`'s own `.scroll-fade-y` is adopted onto the primitive within THIS wave's `Configurator.vue` bound (the DAG names Configurator files as belonging to this wave).
- **The dock files** (`src/styles/dock/*`, `demo/layout/{BottomDock,SidebarDock}.vue`) — W-DOCK-GEOMETRY (Batch 2 ‖) + W-SHELL-HOLD (Batch 0). This wave touches no dock surface.
- **W-DARK-MATERIAL's token files** (the page/card/`--primary`/`--surface-tint-*`/glass-ladder edits) — Batch 1, already landed; this wave READS the re-tuned dark plate for the divider arm, never redefines it.
- **GL shader internals** (`aurora.frag.ts`, `metaball.frag.ts`) — fence-locked (BA scope-fence; the alpha clamp is at the demo capture seam, not the shader).
- **ppmycota purple** (the motion-violet demo-local register) — not on a configurator surface.
- **The slides `docs/tranches/M/` docs** — foreign (BA inv-10).

### Disjointness

Three agent units, disjoint modify paths (no two share a `modify`/`modify-carve` path):
- **W-CONFIG-CHASSIS.1 (the chassis width contract)** writes `ConfiguratorRow.vue`, `LabeledField.vue`, `Configurator.vue`, `ConfiguratorLayer.vue`, `configurator.css`, `tokens/offsets-sizing.css` (the width + divider seams — one library substrate, one author).
- **W-CONFIG-CHASSIS.2 (the aurora section + color-swatch register)** writes `src/components/custom/color-swatch/*` (create), `src/subpaths/color-swatch.ts` (create), `src/api/index.ts`, `AuroraColorSection.vue`, `AuroraConfigDock.vue`.
- **W-CONFIG-CHASSIS.3 (the gear recompose + dark row + preset alpha)** writes `PresetEditor.vue`, `PresetEditorField.vue` (delete), `preset-editor/store.ts`, `preset-editor/defaults.ts`, `usePresetThumbnails.ts`.

The gate/test/doc files (`scripts/proof-config-chassis.mjs`, `package.json`, `scripts/gates.mjs`, `tests-visual/config-chassis.spec.ts`, `CLAUDE.md`) are orchestrator-integrated at close (a single integration author), not split across the three units — no contention. Unit .2's `AuroraColorSection.vue` consumes the swatch IT creates; unit .3's gear recompose consumes the chassis unit .1 lands but writes only the gear/store/thumbnail files. Cross-unit dependency (.2/.3 consume .1's chassis contract) is a READ, not a shared write — the units sequence at integration if needed, but their write sets are disjoint.

### Worktree Plan

| Agent unit | Sibling worktree absolute path | (no Rust; Node repo — `npm ci` per worktree) |
|---|---|---|
| W-CONFIG-CHASSIS.1 | `/Users/mkbabb/Programming/glass-ui/.claude/worktrees/ba-config-chassis-1` | n/a |
| W-CONFIG-CHASSIS.2 | `/Users/mkbabb/Programming/glass-ui/.claude/worktrees/ba-config-chassis-2` | n/a |
| W-CONFIG-CHASSIS.3 | `/Users/mkbabb/Programming/glass-ui/.claude/worktrees/ba-config-chassis-3` | n/a |

The orchestrator runs `git worktree list` and `git worktree add` before dispatch; the units share clean Batch-1-landed `tranche/BA` HEAD.

## Agent Units

### W-CONFIG-CHASSIS.1 the chassis width contract + the dark-adaptive divider token

- Goal: every slotted control fills the `<ConfiguratorRow>` inline axis (the 0px-slider class dies library-wide) and section/inter-row dividers read on BOTH plates via one token.
- Mechanism: (a) `ConfiguratorRow.vue:120` slot becomes a definite-width context + `LabeledField.vue:2` root claims full width (the live-validated `flex:1 1 0%; min-width:0; width:100%` shape, expressed as the chassis contract), with the label-less-control hardening so an `sr-only` label still claims inline space; resolve the double-label at the seam. (b) Mint `--configurator-divider-*` (`tokens/offsets-sizing.css`) with a dark-lifting arm reading the Batch-1 plate; re-point `ConfiguratorLayer.vue` + `configurator.css` off `border-border/40`/`/30` onto the token; add the optional faint section tonal step. (c) Reconcile `Configurator.vue`'s `.scroll-fade-y` onto the `<FadingScroll>` primitive (the configurator-file adoption, this wave's bound).
- Files: `ConfiguratorRow.vue`, `LabeledField.vue`, `Configurator.vue`, `ConfiguratorLayer.vue`, `configurator.css`, `tokens/offsets-sizing.css`.
- Sub-gate: gate witnesses W1 (a `<ConfiguratorRow>`-slotted slider resolves non-zero painted width — the source contract + the π ≥1px floor) + W2 (`--configurator-divider-*` is declared with a dark arm, consumed in both rules, no inline `border-border/N` divider survives on the configurator surface).

### W-CONFIG-CHASSIS.2 the color-swatch register + the aurora overflow contract

- Goal: a library swatch register replaces the three raw `<input type=color>` slabs, and the DERIVE chip group never hard-clips.
- Mechanism: (a) create `src/components/custom/color-swatch/*` (a bordered/radius'd/proportioned swatch + hex affordance, `custom/`-pattern package barrel + `src/subpaths/color-swatch.ts` mirror) — born ≥2 consumers (aurora Seed + aurora DERIVE seed in this unit; the blob Seed named as the third, re-pointed in W-GOO-REDRESS). (b) Re-point `AuroraColorSection.vue:123` (Seed) + `:160-166` (DERIVE seed) onto the swatch register. (c) The DERIVE `<ToggleGroup>` (`:167`) wraps-or-fading-scrolls (consuming `<FadingScroll>`), killing the MONO clip; reconcile the redundant `overflow-x-clip` at `AuroraConfigDock.vue:229`.
- Files: `src/components/custom/color-swatch/*` (create), `src/subpaths/color-swatch.ts` (create), `src/api/index.ts`, `AuroraColorSection.vue`, `AuroraConfigDock.vue`.
- Sub-gate: gate witnesses W3 (the swatch package exists with ≥2 consumer call-sites; no raw `<input type=color w-full>` slab survives on the aurora section — the source assert) + W4 (the π readback: the DERIVE group's rightmost chip is NOT clipped — its right edge ≤ the aside content right edge; the swatch reads as a proportioned chip, not a full-width slab).

### W-CONFIG-CHASSIS.3 the gear on the chassis + the live dark row + the preset-alpha clamp

- Goal: the gear PresetEditor reads as a Configurator (one anatomy), its dark row flips the live mode via `DarkModeToggle`, and the Speedtest swatch reads vivid.
- Mechanism: (a) recompose `PresetEditor.vue` on `<Configurator>`/`<ConfiguratorLayer>`/`<ConfiguratorRow>` (sections on the 20.4px rung); delete `PresetEditorField.vue`. (b) Replace the dark row's `<Switch v-model="darkModel">` with `<DarkModeToggle>` bound to the live `useGlobalDark`; delete the `delta.dark` field (`store.ts:105-117,152-174`) + the `watch(isDark)` mirror (`:278-288`) + the `defaults.ts` `dark` baseline; re-point `can-reset` to the `useGlobalDark` reset. (c) `freezeCfg` (`usePresetThumbnails.ts:17-28`) sets `alpha: 1` in the capture canonicalization (`presets.ts:450`'s 0.26 runtime baseline stays).
- Files: `PresetEditor.vue`, `PresetEditorField.vue` (delete), `preset-editor/store.ts`, `preset-editor/defaults.ts`, `usePresetThumbnails.ts`.
- Sub-gate: gate witnesses W5 (the gear composes `<Configurator>`/`<ConfiguratorLayer>`/`<ConfiguratorRow>`, `PresetEditorField.vue` is gone, `delta.dark` is absent from the store — the source asserts) + W6 (the π readback: the gear's dark row click FLIPS `html.dark` both directions, the control is the animated `DarkModeToggle` not a `<Switch>`, the gear section labels resolve the 20.4px rung) + the alpha-clamp source assert (`freezeCfg` sets `alpha: 1`) + the π Speedtest-swatch-vivid readback (mean alpha ≥ 0.95 in the preview, no longer 0.26).

## Hard Gate

`proof:config-chassis` (born-RED at HEAD, driven GREEN by the wave) — six falsifiable SOURCE witnesses (the comment-strip + pure-detector house pattern, mirroring `proof-dock-rail-hairline.mjs` / `proof-dock-unify.mjs`), each red at HEAD pre-wave, PLUS the alpha-clamp assert; the π readback is the binding visual truth, and the `proof:ba-gestalt` `configurators+goo` row PASS is the holistic close bar (BA inv-4):

1. **W1 — the slider width contract.** `ConfiguratorRow.vue`'s control slot establishes a definite-width block context AND `LabeledField.vue`'s root claims full inline width, so a slotted control is NOT content-sized. RED at HEAD: the slot is `<div class="flex items-center">` (content-sizing) + the bare `display:block` `.labeled-field` root. **Bite-tightening (anti-evasion)**: the source half asserts the POSITIVE contract (the slot is a definite-width context — `flex-1`/`w-full`/`min-w-0` shape on the slot OR the LabeledField root claims width), NOT a brittle string-match on one class; the π half (W7) is the binding floor — a `<ConfiguratorRow>`-slotted `<LabeledSlider>` measures `getBoundingClientRect().width ≥ 1px` (a non-zero painted track), closing the "source-green / 0px-render" gap that is exactly the WVR-2 failure class (the AZ gates were headless and missed the 0-width render).
2. **W2 — the divider token register, dark-adaptive.** `--configurator-divider-*` is declared in `tokens/offsets-sizing.css` WITH a dark arm (a `.dark`-resolved lift, not a single `:root` value), consumed by the section AND inter-row divider rules in `configurator.css`/the SFCs, and NO inline `border-border/N` divider survives on the configurator surface (the source grep returns 0 inline divider alphas). RED at HEAD: `grep configurator-divider` → 0; the dividers are inline `border-border/40`/`/30`. **Bite-tightening**: the assert requires the token to have a DISTINCT dark value (a dark-arm declaration), not merely existence (a `:root`-only token that does not lift on dark leaves CFG-4 alive).
3. **W3 — the color-swatch register replaces the raw slabs.** `src/components/custom/color-swatch/*` exists as a `custom/`-pattern package (component + `index.ts` + subpath mirror) with ≥2 consumer call-sites at HEAD-of-wave, and NO raw `<input type="color"` carrying a full-width (`w-full`) slab survives on `AuroraColorSection.vue` (the source asserts the slabs are gone, the swatch is the consumer). RED at HEAD: the package does not exist; `AuroraColorSection.vue:123` is the `w-full` slab.
4. **W4 — the chip-overflow contract (no hard-clip).** The DERIVE `<ToggleGroup>` either wraps (its container allows multi-line) or routes to `<FadingScroll>` — it does NOT sit inside a hard `overflow-x-clip` that slices its content. RED at HEAD: `AuroraColorSection.vue:167` is `flex-1` 4-item under `AuroraConfigDock.vue:229`'s `overflow-x-clip`. The π half (W7) is the binding floor — the rightmost chip's right edge ≤ the aside content right edge (no slice).
5. **W5 — the gear on the chassis, the parallel surface retired.** `PresetEditor.vue` composes `<Configurator>`/`<ConfiguratorLayer>`/`<ConfiguratorRow>` (not hand-rolled `<section>`+`<h3 text-xs font-mono>`); `PresetEditorField.vue` does NOT exist (deleted); the `delta.dark` field + the `setField("dark")` toggle branch + the `watch(isDark)` mirror are absent from `preset-editor/store.ts` (the source greps for `delta.dark`/`"dark"`-field machinery return 0). RED at HEAD: the gear hand-rolls its chassis; `PresetEditorField.vue` exists; `store.ts:105-117,152-174,278-288` carry the `delta.dark` path.
6. **W6 — the dark row composes the live `DarkModeToggle`.** The Appearance dark row renders `<DarkModeToggle>` (the canonical sun/moon, self-syncing over `useGlobalDark`), NOT `<Switch v-model="darkModel">`. RED at HEAD: `PresetEditor.vue:188` is the `<Switch>`. The π half (W7) is the binding floor — clicking the row's control FLIPS `html.dark` (both directions), the boot state matches (no switch-OFF-over-dark-page mismatch).
7. **The alpha-clamp source assert.** `freezeCfg` (`usePresetThumbnails.ts`) sets `alpha: 1` (the capture canonicalization), so the baked thumbnail is full-opacity. RED at HEAD: `freezeCfg` zeroes the drift channels but does NOT clamp alpha (`presets.ts:450`'s 0.26 reaches the bake).
8. **The π binding readback** (the cardinal-lesson DELTA, captured own-surface; `tests-visual/config-chassis.spec.ts` at `:5199`, BOTH modes): paired π proving (a) a `<ConfiguratorRow>`-slotted slider on `/substrates/blob` measures `width ≥ 1px` (W1's binding floor — the 0px class dead at desktop AND 390px); (b) the DERIVE group's rightmost chip on `/substrates/aurora` is not clipped (right edge ≤ aside content right edge, W4); (c) the gear dark-row click flips `html.dark` both directions and the control is the `DarkModeToggle` (W6); (d) the gear section labels resolve the `--configurator-section-size` 20.4px rung (W5's render); (e) the Speedtest preview thumbnail mean-alpha ≥ 0.95 (PPD-1 vivid, no longer 0.259); (f) the configurator dividers paint a visible luminance step on the DARK plate (W2). Captured to `docs/tranches/BA/audit/visual/W-CONFIG-CHASSIS-DELTA.md` with before/after frames against the `ground/R8-04`/`R8-05`/`R8-07` + the fleet `configurator-occlusion-*`/`goo-studio-*`/`darkmode-*`/`preset-preview-dim-*` baselines.
9. **The gestalt bar (BA inv-4).** The `configurators+goo` row of `proof:ba-gestalt` (the W-GESTALT-GATE roster ledger) records an operative `PASS` for this wave's configurator half — a whole-page capture of `/substrates/blob` + `/substrates/aurora` + the gear, BOTH modes, over the real backdrop, judged "does this read as a usable instrument as a page?" Per-mechanism W1-W7 greens alone do NOT close the wave (the AZ P-1 close-class); the `configurators+goo` row's FULL pass also requires W-GOO-REDRESS's renderer half landed — the W-REFLECT2 verdict checks both, this wave's close requires the configurator-half capture PASS recorded.

W1-W7 + the alpha assert are the device-free CI half (`proof:config-chassis`); the π readback is the binding visual truth (a source-green/visually-broken gap is the exact WVR-2/3 failure class). Both, plus the gestalt-row verdict, must hold for a clean close.

## Format And Lint Cadence

`npm run typecheck` after the Vue/TS edits (the chassis width contract, the swatch component, the gear recompose, the store-field deletion); `npm run build` to confirm the CSS partials compile + the new `/color-swatch` subpath chunk emits + `verify-export-types` passes the swatch dts; `node scripts/proof-config-chassis.mjs` born-RED before the source edits (proof it fails at HEAD), GREEN at close; `npm run proof:gate-script-parity` after the package.json/scripts/gates.mjs registration; `npx playwright test tests-visual/config-chassis.spec.ts` for the π readback; `git diff --check` before close.

## Verification Artefacts

- `docs/tranches/BA/audit/visual/W-CONFIG-CHASSIS-DELTA.md` — before/after `/substrates/blob` (slider widths) + `/substrates/aurora` (DERIVE chips, Seed swatch) + the gear (sections + dark row) + the Speedtest swatch frames, BOTH modes, with the paired π readback.
- The `proof:config-chassis` JSON artefact (born-RED log + GREEN-at-close log).
- The `tests-visual/config-chassis.spec.ts` π output (slider widths, chip-clip extents, `html.dark` flip log, swatch mean-alpha, divider luminance step).
- The `proof:ba-gestalt` ledger row for `configurators+goo` updated to the configurator-half PASS verdict with the capture paths.
- The gate-script-parity output post-registration.

## Commit Plan

- impl commit (unit .1): `fix(configurator): row width contract + dark-adaptive divider token — the 0px slider class dies at the chassis (BA.W-CONFIG-CHASSIS.1)` — names the slot/LabeledField/divider mechanisms in the body.
- impl commit (unit .2): `feat(color-swatch): library swatch register + aurora DERIVE overflow contract (BA.W-CONFIG-CHASSIS.2)` — names the ≥2 consumers + the MONO-clip kill.
- impl commit (unit .3): `refactor(configurator): gear PresetEditor on the chassis + live DarkModeToggle row + preset-alpha clamp (BA.W-CONFIG-CHASSIS.3)` — names the PresetEditorField retirement + the delta.dark deletion + the freezeCfg clamp (deletion body required).
- gate commit: `test(configurator): proof:config-chassis born-RED→GREEN + π spec + parity registration`.
- doc/status commit: the CLAUDE.md Configurator-contract record + the DELTA doc + the gestalt-ledger row + PROGRESS row.

## Dependencies

- **Depends on**: W-DARK-MATERIAL (Batch 1) — the divider dark-lifting arm (scope 4) reads the re-tuned dark plate; staging the divider register over the pre-Batch-1 flat plate would mis-calibrate the lift (BA inv-5). W-GESTALT-GATE (Batch 0) — the `proof:ba-gestalt` `configurators+goo` roster row this wave's close records against. W-FADING-SCROLL (Batch 2 ‖) — the `<FadingScroll>` primitive the overflow contract (scope 2) + the `Configurator.vue` `.scroll-fade-y` adoption (scope 1c) consume; coordinated by the EXECUTION-DAG §3 seam (this wave adopts the primitive in its own files; the static `.scroll-fade-*` utility retirement is W-FADING-SCROLL's orchestrator-owned final commit). If `<FadingScroll>` is not yet landed when this wave's overflow contract is implemented, scope 2 takes the WRAP arm (the natural fit for the 4-harmony DERIVE row) and defers the fading-scroll route to the consumer-migration commit.
- **Blocks**: W-GOO-REDRESS (Batch 2 ‖) consumes this wave's `<ColorSwatch>` register for the blob Seed re-point (the third consumer) — the swatch is born ≥2-consumer here regardless; the W-REFLECT2 `configurators+goo` gestalt verdict requires BOTH this wave's configurator half AND W-GOO-REDRESS's renderer half. W-SURFACE-AXIS (Batch 4) may later expose the surface axis on the swatch chip; out of scope here.

## Archaeology

Prior attempts: W-BLOB-STUDIO + W-BLOB-REDRESS (AZ) both marked `live-verified`; W-BLOB-REDRESS claimed M1 grid-collapse root-fixed in `Configurator.vue` but scoped the fix to the 390px coarse viewport — the 0px slider collapse is LIVE at the 1440px default (WVR-2). W-SHELL-CONFIG + R4-SHELL (AZ) shipped the gear "dark-at-TOP" but greened R4-3 on PLACEMENT while substituting a `<Switch>` for the named `DarkModeToggle` component, and the `delta.dark` shadow makes it a NO-OP (WVR-3). W-HIERARCHY (AZ) minted the section-label vocabulary in the configurator PRIMITIVE but the gear hand-authors its chrome off it entirely (CFG-5). The new guardrail: this wave's gate asserts the RENDERED contract (a slotted slider's non-zero painted width at the DEFAULT desktop AND 390px, the gear's `html.dark` flip, the gear sections on the 20.4px rung) via the π readback — not the scoped/source-diff capture the prior closes proved — and the `proof:ba-gestalt` gestalt-row verdict is the holistic close bar, so the source-green/visually-broken gap (the exact P-1 close-class that re-opened R8-3/4/7) cannot recur by construction.
