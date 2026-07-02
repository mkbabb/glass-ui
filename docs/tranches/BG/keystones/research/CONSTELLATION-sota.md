# KS-CONSTELLATION — the sibling survey (SOTA = the constellation itself)

**Lane:** KS-C · CONSTELLATION researcher. **Date:** 2026-07-01 · glass-ui HEAD `f6fa1767`.
**Fence attestation:** every sibling under `~/Programming/{value.js,keyframes.js,speedtest,sci-report}` was
read/grepped STRICTLY READ-ONLY — zero writes, zero mv/rm, zero installs/builds. Every sibling change below is
expressed as a BY-NAME ASK, never an edit. This file is the only artifact written.

Waves this feeds: **BH.B6+B7-asks** (the ≥4 covered-floor ask roster) · **BH.B2-export-reshape** (consumer
side of the `/api` drop + `goo-blob→blob` + peer floors) · **BH.B4e-cut-authoring** (MIGRATION/CHANGELOG
5.0.0) · **19.1 BG.W-CUT** (consumer-facing half) · the demo-showcase alignment asks.

---

## 0. The constellation at a glance (disk-verified pins)

| repo | pkg name | version | glass-ui pin | placement | kf pin | value.js pin |
|------|----------|---------|--------------|-----------|--------|--------------|
| **value.js** | `@mkbabb/value.js` | `1.2.0` | `file:../glass-ui` | devDep (demo) | `file:../keyframes.js` | — |
| **keyframes.js** | `@mkbabb/keyframes.js` | `5.1.0` | `~4.0.0` | optionalDep (demo) | — | `^1.2.0` |
| **speedtest** | `speedtest` | `1.0.0` | `^4.0.1` | **dependency** | `^4.3.0` (STALE) | `^0.13.0` (STALE) |
| **sci-report/atlas** | `@atlas/core` | `1.0.0` | `>=4.2.0` | **peerDependency** | `^5` | `^1.2.0` |

Sources: `~/Programming/value.js/package.json`, `.../keyframes.js/package.json`,
`.../speedtest/package.json`, `.../sci-report/atlas/package.json`.

**Three facts that shape 5.0.0:**
1. **atlas resolves 5.0.0 AUTOMATICALLY** — its peer range `>=4.2.0` is version-independent by design
   (`atlas/tests/gates/l0-glass-ui-peer-not-dep.gate.ts`: "the gate asserts PLACEMENT, not a version
   number"). So every clean break (`--ring` rename, `GlassPanel variant→tier`, `/api` drop) HITS atlas the
   moment it re-installs — no pin protects it. atlas is the fork-lineage registry consumer of invariant-11.
2. **speedtest is pinned OLD** (`^4.0.1`) and its peers are badly stale (`kf ^4.3.0`, `value ^0.13.0` vs the
   `5.1.0`/`1.2.0` on disk). It is the AW.W7 R-CONSUME debtor — it has NOT bumped `^4.1.0` yet.
3. **value.js/keyframes.js consume glass-ui ONLY in their demos** (dev/optional-linked), so 5.0.0 breaks their
   demo chrome, never their published library. The DEPENDENCY direction is the reverse (glass-ui rides
   value.js `9` import sites + keyframes.js `25`).

---

## 1. value.js `1.2.0` — the color engine (glass-ui is its demo material)

**What it is.** A color/value normalization + easing engine. Its DEMO is the `color-picker/` hero app
(`~/Programming/value.js/demo/color-picker/App.vue`), a full-viewport picker where the background ANSWERS the
picker — the picked OKLCh palette drives a live glass-ui `<Aurora>` + `<GooBlob>` atmosphere.

**Published surface glass-ui consumes** (all present in 1.2.0; `value.js/src`):
- `wcagContrastRatio` (`src/units/color/contrast.ts:70`) — glass-ui's **field-aurora-aa** hard-import floor.
  *Note:* NOT yet imported in glass-ui src at HEAD; the `12.5 W-GATE-FIELD-AURORA` wave wires it (the gate is
  the binding witness). value.js 1.2.0 already ships it — the CONSUME is unblocked.
- `interpolateHue` (`src/units/color/dispatch.ts:558`) + the `HueInterpolationMethod` type — border-progress
  shorter-hue spectrum walk.
- `CSSCubicBezier`/`steppedEase`/`bezierPresets`/`jumpTerms` (`src/easing.ts:164/293/334/266`) — EasingPicker.
- via `/color`: `OKLCHColor`, `safeAccentColor`, `rawOklchToOklab`, `srgbToOKLab`, `rawOklabToOklch`,
  `mixColors`, `sampleColorRamp` (glass-ui `9` import sites).

**The `oklchSpectrum` phantom (CONSUME-contract honesty).** glass-ui's border-progress README claims the
`// CONSUME(value.js 0.13.0 oklchSpectrum)` interim "is DISCHARGED"
(`src/components/custom/border-progress/README.md:37`). **On disk value.js 1.2.0 exports NO `oklchSpectrum`
helper** (grep of `value.js/src` = 0). glass-ui composes the walk from the PRIMITIVE pieces
(`interpolateHue("shorter")` + `cssToOklch`/`oklchStopToHex`), not a named spectrum helper. The discharge is
real (the walk works) but the "0.13.0 oklchSpectrum" attribution is fiction — **no dedicated helper was ever
minted in value.js**. `BH.B4e-cut-authoring` should record the CONSUME as "composed from `interpolateHue` +
`/color` primitives," not "the value.js `oklchSpectrum` helper."

**The `^1.1.1` NOT `^1.2.0` floor (export-reshape pin).** The BH.B2-export-reshape row + `12.5` gate literal
pin glass-ui's DIRECT value.js floor at `^1.1.1` and forbid `^1.2.0`, even though 1.2.0 is what's on disk and
what keyframes 5.1.0 deps (`value ^1.2.0`). This is a deliberate floor-not-ceiling: the `^1.1.1` caret admits
1.2.0 at resolve-time (the broken-singleton identity is enforced against keyframes' dep), but glass-ui does
not hard-REQUIRE 1.2.0's grammar (the Q-tranche SoA/out-param family). **Watch:** the seed says "NEVER
`^1.2.0`" as the direct pin; do not let export-reshape drift the direct floor up to `^1.2.0`.

**What value.js's demo SHOWCASES that glass-ui should feed better.** The picker→aurora→blob pipeline
(`App.vue:104-116,217-290`) is the strongest live proof of glass-ui's `deriveBlobPalette`/`deriveAurora`/
`oklchStopToHex` + `resolveRenderMode("auto")` + `<Aurora>` placeholder idiom. Two feed-back notes:
- The demo drives `BLOB_CONFIG_KEY`/`BLOB_CONFIG_DEFAULTS` from `@mkbabb/glass-ui/goo-blob` (`App.vue:115`).
  The `goo-blob→blob` rename (R14) BREAKS this import path — see §5.
- The demo is the reference consumer for the aurora/blob AS palette theatre. `F9`'s viz perfection (metal
  medium, image-source, the resize-adopt) lands with this demo as a natural showcase surface — worth naming
  it in the F9 fableArm evidence.

---

## 2. keyframes.js `5.1.0` — the motion engine (glass-ui's spring/morph spine)

**What it is.** The spring/keyframe runtime. Demo is a multi-scene SPA (`demo/app/`, keyframes.babb.dev) whose
chrome consumes glass-ui: `ChromeDock.vue` (dock scene-switcher), header ribbon, `registerShortcut` from
`/keyboard`, dark-mode toggle, buttons/dialogs/tooltips (`demo/CLAUDE.md:36,86,101`).

**The 5.1 surface glass-ui rides** (all present; `keyframes.js/src/animation`):
- `springTimingFunction` (`physics/spring/timing-function.ts:65`), `SpringProgress`
  (`physics/spring/progress.ts:52`), `ElementMorph` + `MorphRect`/`ElementMorphOptions`
  (`physics/morph.ts:11,48`), `flip`/`flipShared` (`orchestration/flip.ts:146`), `drag`/`Draggable`/`drag2D`
  (`orchestration/drag/draggable.ts:127`), `Oscillator`/`waveformValue` (`physics/oscillator.ts:94,67`).
- **`Draggable.snap` is LANDED** (`draggable.ts:87` `snap?: number[]`, `:140/164`) — this is what BH.B1
  W3-dragmorph-snap-excise already consumed (ledger 1.4, `ba23c086`: "native kf 5.1.0 `DragOptions.snap`
  wired; re-roll excised"). The by-name ask that requested it is SATISFIED — record it discharged in the
  ask roster.
- **`ElementMorph` `spawn` channel is ABSENT** (grep `morph.ts` = 0). Confirms the KS-B ratification: the
  `spawn` channel ships only with a real consumer (not even reserved on disk) — do NOT ask keyframes to add
  it speculatively.

**Peer floor (export-reshape).** BH.B2-export-reshape is the SOLE peer-bump site: kf `^5.0.0→^5.1.0`. Disk kf
is `5.1.0`, so `^5.1.0` resolves clean. keyframes deps value `^1.2.0` — the transitive that the broken-singleton
identity (`proof:peer-conformance` clause 1) checks glass-ui's direct value pin against.

**What kf's demo SHOWCASES / feed-back.** `demo/DESIGN.md:26` carries an open upstream hint: **"Consider
upstreaming `tab-trigger-*` variants to glass-ui."** This is a genuine SHOWCASE→feed signal — the kf demo has
tab-trigger variants glass-ui's SegmentedTabs family could absorb. NOT a BG wave (the wave set is frozen); record
as a **fold-candidate note** for a successor tranche or an F6 tabs clause IF the orchestrator wants it — do not
self-insert. `demo/DESIGN.md:24` also states the kf demo is "already well-aligned with glass-ui patterns" — it is
the low-friction sibling.

---

## 3. speedtest `^4.0.1` — the heaviest consumer + the AW.W7 R-CONSUME debtor

**Import census** (`speedtest/src`, `58` import sites, 50 distinct subpaths). Top: `/button` ×17, `/card` ×13,
`/dom` ×11, `/forms` ×10, `/motion-core` ×7, `/tabs` ×6, `/motion` ×5, `/separator` ×5, `/label` ×5,
`/instrument-chassis` ×4, `/dialog` ×4, `/dark` ×4 … + one each of `/api`, `/drawer`, `/animated-digit`,
`/metric-cell`, `/metric-stack`, `/fading-scroll`, `/progress`, `/timeline`, `/slider`, `/controls`, `/aurora`.

**What 5.0.0 BREAKS for speedtest** (each = a MIGRATION row +, where it's a live break, a by-name ask):

1. **`/api` DROP.** `PhaseTimeline.vue:52` `import type { TimelineSegment } from "@mkbabb/glass-ui/api"`. The
   `/api` discovery subpath is dropped by BH.B2-export-reshape (203-row map arm). speedtest must re-source
   `TimelineSegment` from its owning subpath (`/timeline`) or the new `/axes` types-only subpath. **This is
   the ONE hard `/api` break in the whole constellation** (atlas has zero `/api` imports). MIGRATION row
   owed; ask = "speedtest: re-point `TimelineSegment` off `/api` onto `/timeline`."
2. **`--ring` → `--focus-ring-color` clean break** (W-DESHADCN). speedtest reads `var(--ring)` at
   `SurveyStep.vue:177,180` (`--color-accent-opaque: var(--phase-color, var(--ring))`) + documents
   `--focus-ring-color: var(--ring)` at `tokens.css:821`. The rename breaks these reads. Covered by the
   `crossrepo-asks:bh` `>=4` floor's `--ring` ask (shared with atlas).
3. **`density="audacious"` / `density="spacious"`** (`Dock.vue:258`, `SurveyResultDock.vue:42`). These are
   REAL glass-ui dock density rungs today (`src/styles/dock/density.css:8-9,270`: the four rungs
   compact·comfortable·spacious·**audacious**). **F6.2 W-SIZE-UNIFY** does a clean-break `density/size → Size`
   with the middle rung `default→md` and ONE compactness word — a 3-rung `sm/md/lg` `Size` does NOT map the
   dock's 4-rung density (audacious is a 5th-magnitude rung). **WATCH for the grammar lane:** either dock
   density is EXEMPT (its own scale-thread grammar, `--dock-scale`) or `density="audacious"` breaks at two
   speedtest sites + must migrate. Flag this to F6.1/F6.2 — the seed's grammar wave does not yet name the
   dock-density disposition, and speedtest+atlas both ride dock density.
4. **`--phase-complete-color` consumer-token ask (already routed).** `tokens.css:370` records the
   `--phase-complete-color` ask as "routed." BB.W-PHASE-PALETTE shipped the token DEFAULT (gold) + the
   consumer-override seam. speedtest SETS `--phase-complete-color` in its own repo — a preset-in-consumer, NOT
   a glass-ui edit. Keep local.
5. **W-DESKTOP-RESERVE local override (consume-and-delete).** `App.vue:601,677-679` carries a local
   `.instrument-dial { min-height: var(--chassis-max-block-size) }` interim. glass-ui shipped
   `--instrument-dial-min-block-size-desktop` (default `var(--chassis-max-block-size)`), so the consume DELETES
   the local byte-equivalently — a speedtest-side edit on the bump, foreign-tree fence holds.

**The AW.W7 R-CONSUME obligations (OWED, speedtest-side).** speedtest is pinned `^4.0.1`, one minor behind the
`^4.1.0` that carries the BorderProgress/aurora-swraster/desktop-reserve/phase-palette landings. Its
`tokens.css:775` marks **`ASK-GU-BORDERPROGRESS, HELD`** and it still runs the floating `PhaseTimeline` +
`GlassTimeline` (`tokens.css:752`) with LOCAL `--border-progress-thickness` tokens (`:793-794`). On the bump it
owes: bump `^4.1.0` (then `^5.0.0`), bind `<BorderProgress coverage :value>` onto `.results-card` retiring
PhaseTimeline, adopt `<CompletionSeal play>` on speedtest-complete/personal-best (BC.W-SPEEDTEST-ADOPT), delete
any `?aurora=css` interim, re-pin stale peers (`value ^0.13.0→^1.x`, `kf ^4.3.0→^5.x`). **All THEIR edits** —
glass-ui owes only the shipped primitives (landed) + the MIGRATION rows + the by-name ask.

**What speedtest SHOWCASES / feed-back.** speedtest is the instrument-chassis + phase-bus + dock reference
consumer (the `density="audacious"` 4rem-control results-hat dock, `Dock.vue:508`). Its held BorderProgress
ask (the "progress IS the border, a spectrum of our colors" C2 relay) is the raison of glass-ui's
`<BorderProgress>`. The F3 dock band + F9 phase-bus perfection should name the speedtest results-hat as a
downstream showcase in their fableArm evidence.

---

## 4. sci-report/atlas `>=4.2.0` — the Connectivity Atlas (the current, sophisticated consumer)

**What it is.** `@atlas/core` — the Connectivity Atlas, a data-viz platform (`sci-report/atlas/src`). It peers
glass-ui `>=4.2.0`, kf `^5`, value.js `^1.2.0`, pencil-boil `^0.4.1` — the MOST current sibling, already on the
5.x-aligned peer floors. glass-ui is a hoisted PEER (the `l0-glass-ui-peer-not-dep.gate.ts` dual-copy fence).

**Import census** (`atlas/src`): `/button` ×9, `/toggle-group` ×8, `/glass-panel` ×5, `/dock` ×5, `/slider` ×4,
`/switch` ×3, `/status-dot` ×3, `/select` ×3, `/handmark` ×3, `/drawer` ×3, `/controls` ×3, `/metric-badge` ×2,
`/labeled-field` ×2, `/dropdown-menu` ×2, `/aurora` ×2, `/card` ×2, `/badge` ×2, + `/constellation`,
`/hover-popover`, `/fading-scroll`, `/expandable-container`, `/paper-backdrop`, `/popover`, `/collapsible`.
**Zero `/api` imports** — the `/api` drop does NOT break atlas.

**What 5.0.0 BREAKS for atlas** (auto-resolved via `>=4.2.0`, so these fire on re-install):

1. **`GlassPanel variant="floating"` → the F6.1 `variant→tier` rename.** atlas uses `<GlassPanel
   variant="floating">` at **≥5 live sites** — `HoverCard.vue:283`, `GalleryMasthead.vue:58,165`,
   `AuroraVeilStage.vue:3`, `TaxonomyApparatus.vue:58` (+ `chrome-overlays.css:46` comment). **F6.1
   W-AXIS-GRAMMAR** renames GlassPanel `variant`→`tier` (clean break). This is atlas's single largest 5.0.0
   break — every `<GlassPanel variant="floating">` must become `tier="floating"`. MIGRATION row + by-name ask
   owed. **This break is NOT in the current 4-ask floor** (which names atlas only for `--ring`) — the ask
   roster should widen atlas's row to cover BOTH `--ring` AND `GlassPanel variant→tier`.
2. **`--ring` → `--focus-ring-color`.** atlas is the HEAVIEST `--ring` consumer: `--afd-focus-ring:
   var(--ring, …)` (`tokens.css:1050`), `outline: 2px solid var(--ring)` at `base.css:64`, `EasterEgg.vue:156`,
   `SelectionRegion.vue:156`, `VizOptions.vue:406`; `stroke: var(--ring)` at `base.css:71`,
   `GeoChoropleth.vue:477`; `var(--accent, var(--ring))` `ReadoutDrill.vue:164`; `var(--cp-accent, var(--ring,
   currentColor))` `ScrollTimeline.vue:270`. Every read of the SHIPPED `--ring` breaks under the rename. This
   IS the `crossrepo-asks:bh` `atlas --ring` ask — confirmed live, many sites.
3. **`Card surface="glass" tier="quiet"`** (`GalleryView.vue:277,286,640`, `SelectionSetPane.vue:192`
   `surface="glass"`). The 4-member `Surface` axis is PRESERVED by F6.1 (`Surface` stays 4-member) — these do
   NOT break. Good.

**What atlas SHOWCASES that glass-ui feeds well (the model consumer).** atlas is the reference `--glass-accent`
consumer — the BB.W-GLASS-ACCENT per-instance chromatic-rim seam is exactly what it composes:
`useAuroraVeil.ts:109-110` maps `accentColor→--glass-accent`, `accentStrength→--glass-accent-strength` (+ the
`--veil-accent`/`--veil-strength` fallback floor); `Glyph.vue:96,205` threads the `--glass-accent` data-hue glow
+ `--glyph-accent` `<feDropShadow>`; `RankedBar.vue:21` the glass-hover rim-tint. **This proves the glass-accent
axis SHIPS a first-class data-hue seam** — F2's glass perfection should cite atlas as the downstream witness in
its fableArm evidence, and the `--glass-accent` axis is in the SYNTHESIS §4 protected set (do not re-plumb).
atlas also consumes `/handmark` ×3, `/constellation`, and its own paper/warm gates — a strong F4 (paper) +
handmark downstream witness.

---

## 5. The consume-contract + ask roster (BH.B6+B7-asks — the ≥4 covered-floor)

The seed's `>=4` covered-floor is **muster + speedtest `/api` + atlas `--ring` + bbnf-buddy
`--glass-blur-dock`**. Disk truth REFINES it — the ask roster owed at the cut:

| # | sibling | ask (5.0.0 break) | disk evidence | disposition |
|---|---------|-------------------|---------------|-------------|
| 1 | **speedtest** | re-point `TimelineSegment` off dropped `/api` onto `/timeline` | `PhaseTimeline.vue:52` | THEIR edit; MIGRATION row |
| 2 | **speedtest + atlas** | `--ring` → `--focus-ring-color` (W-DESHADCN) | speedtest `SurveyStep.vue:177,180`; atlas `base.css:64,71` + 6 chart sites | THEIR edit; MIGRATION + ask |
| 3 | **atlas** | `GlassPanel variant→tier` (F6.1) — **≥5 sites, not in the current floor** | atlas `HoverCard.vue:283`, `GalleryMasthead.vue:58,165`, `AuroraVeilStage.vue:3`, `TaxonomyApparatus.vue:58` | THEIR edit; **WIDEN atlas's ask row** |
| 4 | **bbnf-buddy** | `--glass-blur-dock` retire (0.7 W-DOCK-BLUR-RETIRE-CARVE) | seed row 0.7 re-bases the bbnf ask on MIGRATION | THEIR edit; MIGRATION row |
| 5 | **speedtest** | AW.W7 R-CONSUME: bump `^4.1.0→^5.0.0` + BorderProgress/CompletionSeal adopt + stale-peer re-pin | `tokens.css:775` `ASK-GU-BORDERPROGRESS HELD`; `dependencies` `value ^0.13.0`/`kf ^4.3.0` | THEIR edit; the debtor row |
| — | **keyframes.js** | `Draggable.snap` (requested) | `draggable.ts:87` LANDED | **DISCHARGED** (ledger 1.4) — record satisfied |
| — | **speedtest + atlas** | `goo-blob→blob` rename (R14) | value.js demo `App.vue:115` imports `/goo-blob`; speedtest/atlas src = 0 goo-blob imports | value.js DEMO only breaks; MIGRATION row |
| — | **WATCH** | dock `density="audacious"/"spacious"` vs F6.2 size-unify | speedtest `Dock.vue:258`, `SurveyResultDock.vue:42`; atlas `/dock` ×5 | **UNRESOLVED** — flag dock-density disposition to F6.1/F6.2 |

**Foreign-tree fence (LITERAL).** Every row above is a BY-NAME ASK expressed in glass-ui's MIGRATION/CHANGELOG +
`crossrepo-asks:bh` — glass-ui edits ZERO sibling tree. The `goo-blob→blob` rename touches only value.js's DEMO
(`App.vue:115`), never its library; speedtest/atlas have zero `goo-blob` src imports so the rename is a
free MIGRATION line for them.

---

## 6. Findings for the lane's other waves

**BH.B2-export-reshape (consumer side).** The `/api` drop's only live consumer-break across the constellation is
speedtest's ONE `TimelineSegment` type-import (`PhaseTimeline.vue:52`). atlas + value.js + kf have zero `/api`
imports. So the 203-row `/api` map arm's real-world blast radius is small — but the ONE break is a public type,
so the migration row must name the replacement subpath precisely (`/timeline` or the generated `/axes`).

**BH.B4e-cut-authoring (MIGRATION/CHANGELOG).** The 5.0.0 MIGRATION table needs rows for: `--ring→--focus-ring-color`
(speedtest+atlas), `GlassPanel variant→tier` (atlas, ≥5 sites — currently unnamed in the ask floor),
`--glass-blur-dock` retire (bbnf-buddy), `goo-blob→blob` (value.js demo), `/api` drop→`/timeline`/`/axes`
(speedtest). The CONSUME-contract note must correct the `oklchSpectrum` fiction (§1) — no such value.js helper
exists; border-progress composes `interpolateHue` + `/color` primitives.

**19.1 BG.W-CUT (consumer-facing half).** The cut's `crossrepo-asks:bh` `>=4` floor is UNDER-SPEC as written —
it names atlas for `--ring` only, missing the `GlassPanel variant→tier` break (atlas's LARGEST). Recommend the
ask roster count the atlas asks as TWO covered rows (or one widened row), keeping the floor honest. The dock-density
`audacious`/`spacious` WATCH (row 8 above) is the one genuinely-open disposition — it should be resolved (dock
density EXEMPT from size-unify, most likely, given its distinct `--dock-scale` grammar) BEFORE the cut, else two
speedtest sites + atlas's 5 `/dock` imports silently break.

**Demo-showcase alignment asks.** value.js's color-picker (picker→aurora→blob palette theatre) and atlas's
`--glass-accent` data-hue viz are the two strongest downstream showcases of glass-ui's F2/F9 identity — name them
in the F2/F9 fableArm evidence. kf's demo carries an open "upstream `tab-trigger-*` variants" hint
(`keyframes.js/demo/DESIGN.md:26`) — a fold-candidate note for a successor tabs clause, NOT a self-inserted BG row
(the wave set is frozen).

---

*Read-only survey complete. Zero sibling mutations. All changes expressed as by-name asks. — KS-C CONSTELLATION.*
