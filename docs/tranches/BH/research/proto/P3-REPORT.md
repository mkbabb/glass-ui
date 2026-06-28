# P3 — UPSTREAM-SURFACE VERIFY + STYLES-COLOCATION FEASIBILITY

Read-only research. Installed versions: **keyframes.js 5.1.0**, **value.js 1.2.0**.
Prototype scripts + artifacts live beside this file under `proto/`.

---

## PART 1 — the 3 CONSUME interims + the value.js pin floor

### value.js de-straddle FLOOR (B1b) = `^1.2.0`
- `node_modules/@mkbabb/keyframes.js/package.json` → `dependencies."@mkbabb/value.js": "^1.2.0"` (keyframes 5.1.0 transitively wants **^1.2.0**).
- `node_modules/@mkbabb/value.js/package.json` → installed **1.2.0** (the resolved singleton).
- glass-ui pins (`package.json`): `dependencies:1058` and `peerDependencies:1096` BOTH carry the straddle `"^0.13.0 || ^1.0.0"`; keyframes pin is `dependencies:1056 ^5.0.0` / devDeps:1094 `^5.1.0`.
- **VERDICT:** replace both value.js straddle ranges with `^1.2.0` (the cleanest honest floor that matches the installed singleton AND keyframes' transitive want — `proof:peer-conformance` clause-1 broken-singleton identity holds). `^1.0.0` would also resolve to 1.2.0, but `^1.2.0` is the non-straddle floor matching the transitive. This directly discharges CLAUDE.md's own "the `^0.13.0` leg retired, no legacy straddle" claim, currently contradicted on disk.

### Interim #1 — `useDragMorph.ts` kf `DragOptions.snap` → **EXCISE-NOW**
- `node_modules/@mkbabb/keyframes.js/dist/keyframes.d.ts:1073` `interface DragOptions` — **`snap?: number[]` is PRESENT** (line ~1126), alongside **`bounds`** and **`rubberBand`** (the iOS overscroll). The wait ("republishes past 4.3.0 with snap+bounds+rubberBand") is MET at the pinned `^5.x`.
- glass-ui site: `src/composables/motion/useDragMorph.ts:294-318` — the `CONSUME(kf snap)` block + `commitSnapOnRelease()` (the ~12-line `decayRest`+`nearestTarget`+`spring.target` re-roll). Pass `snap: targets.map(t => t.center)` into the kf `DragOptions` and DELETE `commitSnapOnRelease` + the CONSUME comment. **KEEP** `nearestTarget`/`nearestValue` (lines 263-280) — they map a settled CENTER (number) back to the domain value `V` for the `onSnap(value)` callback; kf's snap is value-domain-number-only. Free bonus: adopt `bounds`+`rubberBand` for the iOS pull overscroll.
- **No upstream ask.** kf spine already `^5.x`; the foreign-tree fence is untouched (consume published surface only).

### Interim #2 — value.js `oklchSpectrum`/shorter-hue (border-progress) → **ALREADY DISCHARGED (no action)**
- The value.js spectrum CONSUME is already discharged IN CODE: `src/components/custom/border-progress/composables/spectrum-walk.ts:62,98` consumes the **published** `mixColors(..., "oklch", "shorter")` + `sampleColorRamp(from,to,n,{space:"oklch",hueMethod:"shorter"})`. Both verified present in value.js 1.2.0: `dist/units/color/dispatch.d.ts:68 mixColors`, `dist/units/color/mix.d.ts:54 sampleColorRamp`, `HueInterpolationMethod = "shorter"|...` (dispatch.d.ts:41). README:37 already states "the `CONSUME(value.js 0.13.0 oklchSpectrum)` interim is DISCHARGED."
- The remaining `interimStops` (`useBorderSpectrum.ts:67`) is **NOT an upstream-waiting interim** — it is the legitimate value.js-free SYNC-SHELL design (the `var()` fast path + the cold-path dynamic-`import()` boundary, BC.W-AX-BP-LAZY). It stays.
- **Optional micro-opt (not load-bearing):** `spectrumAt` (spectrum-walk.ts:46) hand-rolls a single-point mix via `mixColors`; value.js 1.2.0 ships `sampleColorRampAt(a,b,t)` (mix.d.ts:54-65, the array-free single-t sibling, BIT-EXACT to the n-stop ramp). Could re-point for clarity. Defer / discretionary.
- **No upstream ask.**

### Interim #3 — `useVizChoreography.ts` kf `Oscillator` (idle loop) → **STALE-COMMENT-FIX; optional adopt; NOT a B1c excise**
- `Oscillator` LANDED in kf 5.1.0: `dist/keyframes.d.ts:2189 class Oscillator` + `OscillatorConfig` + `OscillatorWaveform` + `Sequence`. The comment at `src/composables/glass/useVizChoreography.ts:~95` ("the kf `Oscillator` … is LOCAL-ONLY past v4.3.0, machine-verified ABSENT from the consumed dist") is now **FALSE on the pinned `^5.x`**.
- BUT this is **not load-bearing**: useVizChoreography deliberately owns only the four ENTER/TRANSITION/EXIT/RESTART beats; the idle loop is "the viz's existing de-synced sine / `uTime` (KEEP)". No code waits on Oscillator. Nothing to excise.
- **Disposition:** (a) fix the stale "ABSENT" comment to "available at 5.x, idle-loop adopt optional"; (b) OPTIONAL future wave may replace per-viz `uTime` idle loops with the kf `Oscillator` (a real-improvement, ≥2-consumer-gated, not a B1c interim). **No upstream ask.**

**Net B1c:** ONE excise-now (useDragMorph snap), ZERO migrate-via-ask. The B7 by-name relay carries no kf/value CONSUME asks — all three are met or already discharged on the pinned `^5.x`/`^1.2.0`.

---

## PART 2 — STYLES-COLOCATION byte-equivalence (B2.6)

### The current `/styles` mechanism is a VERBATIM COPY, not a bundler (decisive)
`vite.style-assets.ts:413` `closeBundle()` does `cpSync(src/styles → dist/styles, {recursive})`. The published `dist/styles/index.css` is the **copied src index.css verbatim** — it carries live `@import "./tokens.css"` … `@import "./border-progress.css"` lines, and every partial ships ALONGSIDE in `dist/styles/`. The consumer's own bundler follows those `@import`s. Three downstream passes ALL depend on this bare-name `@import "./X.css"` structure surviving:
- `emitCriticalDeferredSplit` (`vite.style-assets.ts:344`) writes `critical.css`/`deferred.css` that `@import "./<partial>"` BY NAME off `src/styles/critical-partition.mjs` (`CRITICAL_PARTIALS`/`DEFERRED_PARTIALS` = bare names like `"border-progress.css"`, `"motion/morph-field.css"`).
- the SFC-fold injects `@import "../glass-ui.css"` and `components.css` into the leading import block (`atSourceIndex` anchoring).

### VERDICT: lightningcss `bundle()` is the WRONG mechanism (harmful)
`lightningcss` is present (transitive) but a `bundle()` over index.css would FLATTEN it into one blob — (1) byte-DIFFERENT published file (an @import-chain → a flat file), and (2) it destroys the bare-name `@import "./X.css"` structure the critical/deferred split + SFC-fold + components.css inject rely on. Do **not** bundle.

### CORRECT MECHANISM: GATHER + @import-path-rewrite (PROVEN byte-equivalent)
1. SOURCE `index.css` `@import`s reach the colocated paths (`@import "../components/custom/border-progress/border-progress.css"`) — for glass-ui's OWN vite/tailwind build.
2. At publish, replace the wholesale `cpSync(src/styles)` with: cpSync the global partials AS TODAY **+** copy each colocated sheet → `dist/styles/<name>.css` flat (the GATHER) **+** rewrite the dist `index.css` `@import` paths back to `./<name>.css` (since the gather lands them flat).
3. The `critical-partition.mjs` manifest is **UNCHANGED** (bare names; gather lands sheets flat) — a key advantage over bundling.

**Prototype evidence (`proto/`):**
- `cascade-resolve.mjs` recursively inlines index.css's 96 `@import`s → baseline flattened cascade (1,293,674 B). A simulated move of `border-progress.css`/`completion-seal.css`/`select.css` into component dirs + source-`@import` rewrite → re-resolved cascade is **byte-IDENTICAL after stripping the prototype's own instrumentation markers** (the residual diff was only the `/*INLINE … */` / `/*DUP … */` marker comments embedding the changed spec string; a benign shared-regex artifact, zero CSS-content delta).
- the GATHER reverse-rewrite (`../components/.../X.css` → `./X.css`) over the colocated source index.css **== the original `src/styles/index.css` byte-for-byte** (Python equality assert printed `True`). So the published `dist/styles/index.css` is byte-identical to today's.

### BYTE-EQUIVALENCE TEST APPROACH (for the wave's hard gate)
`diff -r dist/styles_before/ dist/styles_after/` must be **EMPTY** — the dist tree (index.css + all flat partials + critical.css/deferred.css/components.css) is byte-identical (stronger than a flattened-cascade diff; it covers the partition split + folds too). Belt-and-suspenders: also resolve+flatten the two `dist/styles/index.css` cascades and `sha256` compare. Born-RED on a deliberately-broken gather (a missed sheet → a `@import` 404).

### SAFE-to-colocate (9 — component-exclusive, clear single home, ALL in the DEFERRED bucket, none in `CRITICAL_PARTIALS`)
| sheet | home | readers |
|---|---|---|
| `border-progress.css` | `custom/border-progress/` | 1 (BorderProgress) |
| `completion-seal.css` | `custom/completion-seal/` | 1 |
| `configurator.css` | `custom/configurator/` | configurator only |
| `instrument-chassis.css` | `custom/instrument-chassis/` | chassis only |
| `hover-popover.css` | `custom/hover-popover/` | 1 |
| `drawer.css` | `ui/drawer/` | drawer only |
| `segmented-tabs.css` | `custom/tabs/` | tabs only |
| `select.css` | `ui/select/` | select only |
| `icon-chip.css` | `custom/icon-chip/` | icon-chip (principal owner; metric-cell consumes the COMPONENT, the `.icon-chip*` class travels with it) |

### MUST-stay-GLOBAL
- the cascade ROOTS + subdirs (CRITICAL partition + foundational, cross-component): `tokens.css`+`tokens/`, `theme.css`+`theme/`, `typography.css`+`typography/`, `glass.css`+`glass/`.
- `glass-specular-track.css` — **5 readers** (dock, button, card, slider, switch) + in `CRITICAL_PARTIALS`.
- `glass-refract.css` — in `CRITICAL_PARTIALS` (glass-material axis; keep with the glass group even though only button reads `.glass-lens` today).
- cross-component recipes: `menu.css` (5 menu families), `feedback-tone.css` (Toast/Notification/Alert), `dock-controls.css` (5 dock control families — plan-pinned global), `cards.css` (.cartoon-surface/.paper-texture), `paper.css`, `floating-panel.css`.
- global recipe/grammar sheets: `transitions.css`, `animations.css`, `scroll-driven.css`, `scroll-choreography.css`, `scroll-chrome.css` (useScrollChrome composable, no single component), `view-transition.css`, `motion/morph-field.css` (useMorphField multi-consumer), `utilities.css`+`utilities/`, `fonts.css` (separate export).
- `jubilance.css` — celebration recipe consumed by `dock/GlassDock.vue` + `dock/composables/useDockFission.ts`; either FOLD into the dock colocation (B2.5) or keep global. Borderline; recommend keep global (a celebration burst is not dock-exclusive in spirit).
- DOCK band (B2.5, separate from the 9): `dock.css` + `dock/**` → `custom/dock/`; `dock-controls.css` STAYS global.

### HIDDEN BLAST RADIUS — flag for B2.6 (gate path-literal re-points, SEPARATE from the build change)
Each colocate-candidate sheet is `readFileSync`'d by **1–7 proof gates** via the `src/styles/<sheet>.css` path literal — **~30 gate path-literal updates** in total when the source moves:
`segmented-tabs.css`←7 · `instrument-chassis.css`←6 · `drawer.css`←5 · `configurator.css`←4 · `icon-chip.css`←3 · `completion-seal.css`←2 · `border-progress.css`/`hover-popover.css`/`select.css`←1.
Plus `proof:colocation` (proof-colocation.mjs:235 asserts index.css cites design-idioms) and `proof:css-critical` (reads critical-partition + index.css `@import` order) must tolerate the colocated `@import` form (or read the SOURCE index.css). This gate-literal churn is a B2.6 cost ON TOP of the build-mechanism change — it folds into the post-BG `gates.mjs` re-point pass, and is itself a reason the styles move is sequenced LAST.
