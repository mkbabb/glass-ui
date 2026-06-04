# AS.W7 W3 · Cluster H5 — Hardening + adversarial verification

**Cluster H5** — configurator redesign + merge + dark-toggle + blob tab (D5, D7, D4, D11) + the
D10b Derive-from-color surface in PaletteLayer.

**Files in scope (file-disjoint from other harden agents):**
- `demo/stories/primitives/configurator.vue`
- `demo/stories/primitives/dark-mode-toggle.vue`
- `demo/stories/manifest.ts`
- `demo/stories/blob.vue`
- `demo/stories/aurora/config/PaletteLayer.vue`

**Gate state:** `npm run typecheck` clean (vue-tsc, 3.1.1). Aurora suite `npx vitest run
src/components/custom/aurora/__tests__/` → 5 files / 17 tests pass (incl. the D10b
`derive-aurora.test.ts`). Did NOT run `npm run build`.

---

## Test-harness caveat (not a product defect)

The shared Chromium (Playwright MCP) was contended by a concurrent harden agent operating a
SECOND tab. The "current" MCP tab flipped between my route and theirs (`/data/sortable-list`,
`/foundations/typography`, `/compositions/hero`, `/navigation/bouncy-tabs`), so live
`browser_evaluate` DOM probes done a beat after `navigate` frequently landed on the wrong route.
Verified this is a two-tab race (`browser_tabs list` showed tab 0 on a sibling agent's route),
NOT an autoplay/auto-advance in the demo — `AppShell.vue` + `useStoryNavigation.ts` carry no
interval/autoplay; routing is 100% explicit (router.push on clicks + `[`/`]` shortcuts). I worked
around it with tight navigate→screenshot pairs and node-level unit checks. No product
auto-navigation bug exists.

---

## Verdicts (adversarial)

### D7 — `/primitives/configurator` is EXPRESSIVE + well-designed — HOLDS
- Specimen render confirmed at 1440 (`configurator-1440.png`): a live painterly gradient field
  (aurora medium → blue/indigo/violet triad) with the "Quiet/Default/Lush" preset row (Default
  active), the grouped `<ConfiguratorLayer label="Field" sub="--field-*">`, and Medium / Spread /
  Bloom / Grain controls. Not an empty void.
- The live specimen RESPONDS to controls: `stageStyle` (configurator.vue:86-103) drives the radial
  gradient geometry off `cfg.config` — spread fans the side nuclei (`offset = 14 + spread*30`),
  bloom feathers radius+blur+falloff, medium re-tints the triad via `MEDIUM_HUES`, grain layers
  the `paper-grain-overlay`. Every axis is load-bearing.
- Bounded height: `class="h-[min(70vh,560px)]"`; ConfiguratorLayer grouping is clean (single
  "Field" layer, no orphan rows). API-surface section documents `useConfiguratorState<T>`.
- Reduced-motion: the stage's filter transition carries `motion-reduce:transition-none` — clean.

### D5 — density is truly RESPONSIVE, `configurator-mobile` fully gone — HOLDS
- `grep -rn "configurator-mobile"` across `demo/`+`src/` → ONLY a code comment in
  configurator.vue:107. No dead route, no manifest entry, no orphan `.vue` file
  (`primitives/configurator-mobile.vue` does not exist).
- ONE story adapts at narrow vs wide. Two orthogonal axes both fire:
  1. **Structural** (Configurator's own `lg:` grid, Configurator.vue:135-136): single column
     (stage stacked over aside) below `lg`, side-by-side stage+aside band at `lg`+. Confirmed
     `configurator-375.png` (stacked) vs `configurator-1440.png` (side-by-side).
  2. **Density** (story `density` computed, configurator.vue:109-124): `matchMedia("(max-width:
     720px)")` → `mobile` (tight ConfiguratorRow gap/padding via `data-density`) vs `comfortable`.
     vueuse-free, listener cleaned in `onBeforeUnmount`.
- Minor non-defect: density breakpoint (720px) ≠ structural breakpoint (`lg`/1024px), so 720–1024px
  reads `comfortable` density while still stacked. Orthogonal axes — acceptable, not a bug.

### D11 — Blob story is real + tasteful + on the sidebar + renders — HOLDS
- On the sidebar: `Droplet` icon, `FLAT_STORIES` entry (manifest.ts:304-311), rail button
  confirmed in the accessibility snapshot (`button "Blob"`).
- Renders with ZERO console errors (light: `blob-1440.png`; dark: `blob-1440-after.png` — a sibling
  agent had toggled the shared `useGlobalDark` singleton, giving me a free dark-mode pass; both
  tasteful). Canvas metaball field paints real merging blobs (additive `lighter` compositing,
  token-driven palette triad). Pixel probe: 48% of sampled canvas pixels painted (314/654).
- Composes the canonical `<Configurator>` + `useConfiguratorState` + `useRAFLoop` + `useTokenColor`
  substrate. `<ExpandableContainer>` gives fullscreen. Read-out chip + hint text present.

### D4 — dark-toggle dock rung is honest (not oversized/useless) — HOLDS
- `dark-toggle.png`: the "dock rung" section hosts THREE real `<GlassDock always-expanded>`
  containers at `compact / comfortable / audacious` density, each with `<DarkModeToggle
  size="dock">`. The toggle visibly scales with the host density (compact smallest pill →
  audacious largest) — the teaching point (`size="dock"` inherits `--dock-control-size`) is now
  load-bearing, not a single oversized standalone control. Standalone sizes (sm/md/lg/control) are
  a separate, sensibly-sized section.

### D10b — Derive-from-color surface in PaletteLayer is well-designed — HOLDS (hardened)
- Wiring is correct end-to-end: `derive()` assigns `config.value.palette = deriveAurora(...)`,
  which flows through `useAurora`'s `watch(getCfg, … , { deep: true })` (useAurora.ts:201) →
  `inst.update(next)` → canvas re-upload next frame. "Clicking Derive updates the aurora canvas" is
  honest.
- `deriveAurora` is well-designed: composes the shipped value.js Ottosson core (inv J-10, no
  re-impl), gamut-maps EVERY stop, clamps L into a painterly band `[0.35, 0.95]`, monotonic-L
  ramp, 4 harmonies. Round-trip check (throwaway test, removed): across analogous/complementary/
  triad/monochrome × stopCount {2,3,5,7} every output is a valid 7-char in-gamut hex with monotonic
  L — harmonious + safe.
- UI is clean: seed `<input type="color">` + harmony `ToggleGroup` + stop stepper + audacious
  "Derive" CTA, over a bordered glass panel above the per-stop manual editor.

---

## Hardening applied (conservative, scoped to H5 files)

1. **`demo/stories/aurora/config/PaletteLayer.vue:39-46`** — empty-palette guard on the seed. Was
   `oklchStopToHex(props.config.palette[0]!)` (non-null assertion). A 0-stop config would feed
   `undefined` → invalid hex → silent `#000000` fallback in the color input. Now falls back to a
   sane default seed when the palette is empty.
2. **`demo/stories/aurora/config/PaletteLayer.vue:61-67,98-105`** — harmony deselect coercion.
   reka-ui's single `ToggleGroup` clears to `""` when the active item is re-clicked; `harmony`'s
   typed `ref<AuroraHarmony>` would then hold an off-union `""` and the chip would read "no harmony
   selected" while Derive silently still ran as analogous. Switched `v-model` → `:model-value` +
   `@update:model-value="onHarmony"`, which coerces `"" → "analogous"`. Belt-and-suspenders:
   `derive()` also passes `harmony.value || "analogous"`. Verified the coercion yields the
   analogous ramp identically (throwaway test).
3. **`demo/stories/blob.vue:213`** — reduced-motion blank-canvas fix. `useRAFLoop` auto-pauses
   under `prefers-reduced-motion: reduce` (`respectReducedMotion` default true), so the loop never
   delivers a first frame and the canvas would be BLANK for reduced-motion users (aurora paints a
   static frame; blob did not). Added a single `draw(0)` after `fitCanvas()` in `onMounted` —
   `deltaMs=0` zeroes the drift term so nuclei stay seeded, painting one static field. Token colors
   are resolved by then (useTokenColor's `onMounted(refresh)` registers before blob's onMounted in
   the same component, so it runs first).

All three are demo-private story files; no library surface touched. typecheck stays clean; aurora
suite stays green (17/17).

---

## Regressions / punch-list

- **None introduced** by the H5 Wave-2 fixes or this hardening pass.
- **Latent (out-of-cluster, library):** `oklchStopToHex` (`src/components/custom/aurora/
  composables/color.ts:91`) does `Math.round(v).toString(16).padStart(2,'0')` with no [0,255]
  clamp. An out-of-gamut OklchStop (negative or >255 channel) yields a malformed hex (e.g.
  `#-a3f00`). Not reachable from the Derive surface (every `deriveAurora` stop is gamut-mapped; and
  preset seeds are authored in-gamut), but a consumer handing a raw out-of-gamut stop to
  `oklchStopToHex` for the seed would hit it. Flagged for the D10b producer track owner (color.ts
  is file-disjoint from H5 — not patched here). Suggest clamping each channel to [0,255] in
  `oklchStopToHex`.

## Evidence (screenshots, repo root)
`configurator-1440.png`, `configurator-375.png`, `blob-1440.png` (light), `blob-1440-after.png`
(dark, post-fix), `aurora-1440.png`, `dark-toggle.png`.
