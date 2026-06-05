# AU.W8 - Dock-motion overhaul (one atomic pass)

**Name**: W8 - Dock-motion overhaul
**Opens after**: AU.W7 (the OKLCh shader-quality + CPU-equivalence wave)
**Agents**: ~6 units, but **serial** — W8 lands as ONE atomic motion+a11y+vocabulary commit, so the units are sequenced within a single writer, not parallelized (see §4b).
**Hard gate**: the FLIP-fallback collapse co-settles container-width-stop ↔ child-opacity≤0.01 within ±1 frame (`proof:dock-motion-single-source`); the rail is a reka `Tabs` contract with no `aria-pressed` (`proof:dock-a11y-contract`); VT ≡ FLIP ≡ `--dock-resize-spring` = `var(--spring-dock)` (`proof:dock-motion-parity` re-pinned); the `<Role>Dock` README convention is registered (`proof:dock-vocabulary`).
**Status**: planned

This wave is the publish-blocking dock-design CONTRACT for 3.3.0. It is ONE atomic
motion+a11y+vocabulary commit. Readability/encapsulation polish (CSS split, `interpolate-size`,
`@starting-style`, `defineModel`, `Readonly<>` guards) is W8b and MUST NOT block this. inv-16:
every edit below is in `~/Programming/glass-ui` only; `@mkbabb/keyframes.js` is READ-ONLY upstream
(no change required).

**Supersedes**: AU.md §3 W8 + §4.2 #11–12. **Source**: AU-AUGMENT.md §2 (the headline) + ten
review domains (motion / spring-seam / state-machine / a11y-rail / VT / PRM / felt-target). The
modern-web-guidance decision-changes folded below are cited from
`docs/tranches/AU/audit/AUGMENT/modern-web-guidance-crosswalk.md` §3.

## §0 - Precepts binding this wave

- **No legacy / gestalt / KISS.** The async-fork fix is a TRANSPOSITION (move two ref mutations one
  rAF later), not a patch layered on top. No compat alias, no second code path.
- **value.js-free dock driver.** The keyframes.js consumption is the LIGHT surface ONLY
  (`SpringProgress`, `springLinearStops`, `springTimingFunction`, `Timeline`, `ElementMorph`,
  `RAFPlayback`). NEVER `loadAnimationEngine()` / `AnimationGroup` runtime constructor / `Animation` /
  `CSSKeyframesAnimation` (those pull value.js via the HEAVY `./engine` dynamic import). The dock
  stays off the root barrel and value.js-free — re-verified by `proof:vueuse-free-root`.
- **Isomorphic styling.** Every motion knob is a CSS custom property emitted at BUILD time by
  `scripts/regen-spring-tokens.mjs`. No public API change to any dock component or composable.
- **One spring authority.** ONE `(response, ζ)` source → ONE `linear()` token → consumed by the VT
  path AND the FLIP fallback AND (AU.W8.3) the runtime rAF driver. No split-brain curve.
  `linear()` easing is **Baseline Newly available since 2023-12-11** (crosswalk §1, `physics-based-easing`),
  which ratifies the `--spring-dock` token form as a primary path.

## 2a. Goal criterion

This wave succeeds if, when work ends, the dock collapse/expand reads as ONE physical object on the
live iOS-Safari path: the user taps the dock toggle and the pill springs open with container width
and child opacity overshooting their target by ~15–30% then settling back elastically over ~300ms,
items never lagging or fading mid-morph. The MEASURABLE felt-target proxy: **the container-width-stop
frame and the child-opacity≤0.01 frame land within ±1 frame (±16ms)** under the FLIP fallback (the
live iOS-Safari path — iOS has no View Transitions), iOS-springy, with no shrink-before-fade.

The motion reads springy and live — not stiff (snappy ζ=0.65, +6.8%, plateaus at ~48%) and not
sluggish (smooth ζ=0.86, no overshoot). The `(0.5, 0.5)` dock curve sits at +18.5% overshoot,
squarely in the band.

## 3. Scope

1. Move the two layer ref-swaps in `useLayerTransition.ts:145-147` INTO the `requestAnimationFrame`
   callback (the `:167` width-set tick) so the class-driven opacity transition and the width-set
   start in the SAME animation frame — kills the async-fork that makes the box shrink before items
   fade.
2. Add an explicit `prefers-reduced-motion` JS fast-path at the top of the FLIP `watch` body (a
   single synchronous state swap, no measure/pin/animate dance).
3. Author a fifth spring preset `--spring-dock` (response 0.5, ζ 0.5, ~+18.5% overshoot) via
   `scripts/regen-spring-tokens.mjs`; route `--dock-resize-spring` → `var(--spring-dock)`; re-pin the
   VT-fallback literal and the parity gate from `--spring-snappy` to `--spring-dock`; correct the
   stale §2 EASING docstring ζ labels.
4. Add a keyframes.js LIGHT one-rAF driver (`SpringProgress`, NOT `AnimationGroup`) inside the FLIP
   fallback so width and opacity advance off ONE `tickDt(dt)` clock and converge within one frame.
5. Convert the hand-rolled `:aria-pressed` rail in `DockLayerGroup.vue` to a reka-ui `Tabs`
   contract (`role="tablist"`/`role="tab"`/`aria-selected`, roving `tabindex`, Arrow/Home/End, a
   travelling `TabsIndicator`), add the focus-visible ring, wire keep-open-on-focus, and set
   `aria-hidden` on the inactive pane.
6. Add the `proof:dock-motion-single-source` Playwright settle probe (born-RED), demote the
   syntactic `proof:dock-opacity-lockstep` note, and register the already-authored
   `proof:dock-vocabulary` README convention gate.

**mwg fold — post-VT focus routing (MANDATORY; crosswalk §3.2).** View Transitions are only
**Baseline Newly available since 2025-10-14** (active-VT since 2026-01-13); VT does NOT manage
focus. A layer-morph that hides the focused element abandons focus for keyboard/AT users. Both the
VT native path AND the FLIP fallback MUST, after the swap reveals the new layer, route focus to the
revealed pane (`tabindex="-1"` + `.focus()` on the new layer host when the swap removed the
previously-focused element). This is added in AU.W8.5 alongside the rail a11y (it is the a11y unit
that already owns the active-pane/inactive-pane attributes).

**mwg fold — opacity overshoot clamp (crosswalk §2.1 / §4 AU.W8 note).** The `--spring-dock` curve
overshoots ~+18.5%; `linear()` overshoot on `opacity` flickers (values <0 / >1). Wherever opacity is
driven off the spring progress `p` (AU.W8.4's optional inline-opacity escalation), clamp to `[0,1]`
(`clamp01(p)`); the default path keeps opacity class-driven (CSS transition) where the clamp is
implicit.

## 3a. Triumvirate Dispatch

Trigger a triumvirate (research + plan augment + redress) — the orchestrator may NOT redispatch the
failing unit alone — on any of:

- **File-bounds expansion that invalidates the wave**: a fix requiring an edit to
  `@mkbabb/keyframes.js` (inv-16 — keyframes.js is READ-ONLY); a fix requiring `AnimationGroup` /
  `loadAnimationEngine` / the HEAVY `./engine` edge (would pull value.js into the dock and redden
  `proof:vueuse-free-root`); folding `--dock-press-spring` into the resize family
  (`tokens.css:1275` — load-bearing transform-only orthogonality); collapsing the 3-state
  active/inactive/leaving visibility fork (`dock.css:428` deferred vs `:449` immediate).
- **Non-local-recoverable hard-gate failures**: `proof:dock-motion-single-source` stays RED after
  both the AU.W8.1 single-frame swap AND the AU.W8.4 driver land AND the inner-`nextTick` escape
  hatch is exhausted (the ±1-frame bar cannot be met by a local edit — the measure/pin model needs
  re-architecture); `proof:dock-motion-parity` cannot be re-pinned without breaking a non-dock
  `--spring-snappy` consumer (e.g. the reka `TabsIndicator` default).
- **Third-iteration diagnostic halt**: any settle-probe RED that survives three measure-strategy
  iterations (no inner tick → inner `await nextTick()` → inline-opacity-on-`p`) must HALT and
  escalate, not loop a fourth.

See `ORCHESTRATION.md` §Triumvirate Auto-Triggers for measurable thresholds.

## 4. File Bounds

| File | Access |
|---|---|
| `src/components/custom/dock/composables/useLayerTransition.ts` | modify |
| `scripts/regen-spring-tokens.mjs` | modify |
| `src/styles/tokens.css` | modify (regenerated §2 EASING block + `--dock-resize-spring` decl/docstring) |
| `src/styles/view-transition.css` | modify-carve (line 61 fallback literal only) |
| `scripts/proof-dock-motion-parity.mjs` | modify-carve (the `:193` SOURCE assertion + header prose) |
| `scripts/__tests__/proof-dock-motion-parity.test.ts` | modify-carve (fixtures `--spring-snappy`→`--spring-dock`, if present) |
| `src/components/custom/dock/DockLayerGroup.vue` | modify (rail `<nav>`→reka `Tabs`, keep-open, focus) |
| `src/styles/dock.css` | modify-carve (`.dock-layer-rail`/`.dock-layer-tab` indicator + focus-ring rules) |
| `src/components/custom/dock/DockLayer.vue` | modify-carve (the inactive-pane `aria-hidden` + post-swap focus) |
| `src/components/custom/dock/__tests__/DockLayerRail.a11y.test.ts` | create |
| `scripts/proof-dock-motion-single-source.mjs` | create |
| `scripts/gates.mjs` | modify-carve (add two manifest rows; demote one note) |
| `package.json` | modify-carve (add two `proof:*` script entries) |
| `src/components/custom/dock/README.md` | create (already authored on disk, untracked — orchestrator `git add`s) |
| `scripts/proof-dock-vocabulary.mjs` | create (already authored on disk, untracked — orchestrator `git add`s) |

**Do NOT touch**: the VT native path or the `transitionId` generation guard in
`useLayerTransition.ts` (`:123`, `:137` — load-bearing for A→B→A no-skip); `--dock-press-spring`
(`tokens.css:1275` — transform-only family, orthogonal); `morphGeneration` in `GlassDock.vue:154`
(the parity gate's GUARD check asserts it survives); the machine-generated `--spring-dock` stops by
hand (ONLY via `regen-spring-tokens.mjs`); the reka `TabsIndicator.vue` source default (the dock
OVERRIDES it via the `.dock-layer-tab` class, not by editing reka); `@mkbabb/keyframes.js`
(READ-ONLY upstream, inv-16).

## 4a. Disjointness

The six units are NOT disjoint: AU.W8.1, AU.W8.2, AU.W8.4 all write
`useLayerTransition.ts` (AU.W8.1 the swap, AU.W8.4 the driver) and `tokens.css`/`view-transition.css`
(AU.W8.2). AU.W8.5 and AU.W8.6 are file-disjoint from 1–4 but still land in the same commit.
Because the units overlap on `useLayerTransition.ts` they MUST NOT run in parallel; they are
sequenced within a single writer.

## 4b. Worktree Plan

No sibling worktrees. W8 is ONE atomic commit by a single writer — the units are dispatched
serially, not parallelized, so there is no second writer to isolate. The orchestrator runs the units
in the §AU.W8 sequence order on clean main (no per-agent `CARGO_TARGET_DIR` split needed; this is a
docs/Vue/CSS repo, not a Rust crate). Land AU.W8.2 (the token) before AU.W8.3-driver references it;
AU.W8.5 and AU.W8.6 are order-independent of 1–4.

**Sequencing within the single commit** (order each gate so it can be bitten as it greens):

1. **AU.W8.1** — single-frame FLIP sync. *Born-RED proxy:* re-injecting the sync class-swap reddens
   `proof:dock-motion-single-source`.
2. **AU.W8.2** — author `--spring-dock` + route `--dock-resize-spring` + re-pin the two gates/recipes
   that hard-name `--spring-snappy`. *Greens:* `proof:dock-motion-parity` (re-pinned).
3. **AU.W8.3** — the keyframes.js LIGHT one-rAF driver inside the FLIP fallback (iOS-grade path).
4. **AU.W8.4** — reka-ui `Tabs` rail + travelling indicator + axis-aware focus/keep-open a11y +
   post-VT focus routing.
5. **AU.W8.5** — the `proof:dock-motion-single-source` settle probe + manifest wiring +
   `proof:dock-opacity-lockstep` demotion note.
6. **AU.W8.6** — `<Role>Dock` README vocabulary + `proof:dock-vocabulary` manifest wiring.

(Note: §AU.W8.3 below is the driver and §AU.W8.4 the rail — the unit numbering follows the dispatch
order above; AU.W8.3 = driver, AU.W8.4 = rail, AU.W8.5 = probe, AU.W8.6 = vocabulary.)

## 5. Agent Units

### AU.W8.1 Single-frame FLIP sync (the async-fork kill)

- **Goal**: opacity (class-driven) and width (inline-set) start in the SAME animation frame on the
  FLIP fallback, so on collapse the box does not shrink while items are mid-paint and on expand items
  do not fade in mid-morph.
- **Mechanism**: The FLIP fallback (`useLayerTransition.ts:135-186`) forks the morph across two
  frames today — `:145-147` mutates `leavingLayer.value`/`currentLayer.value` SYNCHRONOUSLY (Vue
  paints the `.is-leaving`/`.is-active` class swap → the `.dock-layer` opacity transition
  `dock.css:424-429` fires ~T3-5ms), while `:149` (`nextTick`) → `:167` (`requestAnimationFrame`)
  sets the width ~T7-10ms, one frame later. The VT native path (`:121-133`) is immune (one
  synchronous mutation inside `startViewTransition`). Fix: DELETE the synchronous swap at `:145-147`
  and move both ref mutations INTO the rAF callback, restructuring the `nextTick` body so the swap is
  the FIRST mutation, the measure (with `transition:"none"` + unpinned dim) follows the painted new
  layer, and the final width-set lands in the same rAF tick as the swap. Concretely the deferred
  block becomes:
  ```ts
  nextTick(() => {
      if (id !== transitionId) return;
      if (!el) return;
      requestAnimationFrame(() => {
          if (id !== transitionId) return;
          // Swap DEFERRED into the rAF so class-opacity and width-set start in the SAME frame.
          leavingLayer.value = oldLayer;
          currentLayer.value = newLayer;
          // Measure new natural size (swap now applied this tick).
          el.style.transition = "none";
          clearDim(el);
          const toSize = getSize(el);
          setDim(el, `${fromSize}px`);
          void el.offsetWidth;
          el.style.transition = "";
          setDim(el, `${toSize}px`);
          if (Math.abs(toSize - fromSize) < 0.5) {
              clearDim(el); leavingLayer.value = null; return;
          }
          cleanupTimer = setTimeout(() => {
              if (id !== transitionId) return;
              clearDim(el); leavingLayer.value = null;
          }, cleanupDelayMs(el));
      });
  });
  ```
  The class swap reactively re-renders Vue's DOM; if the same-tick `getSize(el)` read proves stale
  (Vue flushes the reactive class update on the microtask queue), add an inner `await nextTick()`
  before the measure. **Validation contract**: the AU.W8.5 settle probe is the arbiter — prefer the
  no-extra-tick form first (KISS); only add the inner tick if the probe is RED.

  **PRM fast-path (closes the §2.5 gap).** Add an explicit JS gate at the top of the `watch` body,
  after the `NATIVE_VT` block, so reduced-motion is a single synchronous state swap (no rAF, no
  inline size):
  ```ts
  const prm = typeof window !== "undefined" &&
      window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
  if (prm) { currentLayer.value = newLayer; leavingLayer.value = null; return; }
  ```
  The VT path's PRM is already CSS-gated (`view-transition.css:27-33`).
- **Files**: `src/components/custom/dock/composables/useLayerTransition.ts` (lines 135–186).
- **Sub-gate**: `proof:dock-motion-single-source` (AU.W8.5) greens once this lands with AU.W8.3.
  Bite-check: reverting the swap to the synchronous `:145-147` position reddens it (width-stop and
  opacity≤0.01 diverge by >1 frame). Do NOT touch the VT native path or the `transitionId` guard.

### AU.W8.2 `--spring-dock` author + `--dock-resize-spring` route + gate re-pin

- **Goal**: ONE `(0.5, 0.5)` spring source exists as a `linear()` token, consumed identically by the
  VT path, the FLIP fallback, and the runtime driver — no split-brain curve, no hand-edited stops.
- **Mechanism**:
  - **2a — add the preset (build-time author).** Insert a fifth entry into `PRESETS`
    (`regen-spring-tokens.mjs:30`): `{ name:"dock", response:0.5, dampingFraction:0.5, comment:"dock
    expand/collapse morph — iOS-springy overshoot ~+18.5%" }`. Widen the marker regex at `:89-90` so
    the new line is found + rewritten: `/(    --spring-(?:smooth|snappy|bouncy|gentle|dock):
    linear\([^)]+\);\n?)+/m`. Run `node scripts/regen-spring-tokens.mjs` — it emits a 50-stop
    `linear()` for `--spring-dock` into `tokens.css` §2. The (0.5, 0.5) curve peaks analytically at
    `1 + e^(-0.5π/√(1-0.25)) ≈ 1.185` (+18.5%) at ~14% progress — between snappy (+6.8%) and bouncy
    (+20.5%), in the ~15–30% band. The 48-sample grid captures the peak (the same fidelity argument
    that raised SAMPLE_COUNT 24→48 for bouncy).
  - **2b — fix the stale §2 docstring drift (isomorphic).** `tokens.css:144-148` mislabels snappy as
    ζ=0.85 and bouncy as ζ=0.65; the actual PRESETS are snappy ζ=0.65 / bouncy ζ=0.45 (the emitted
    `--spring-snappy` peaks at 1.068 = +6.8%, confirming ζ=0.65). Correct the docstring to match the
    PRESETS and add the `dock: (0.50s, ζ=0.50) — ~+18.5% overshoot` line. Comment-only; the regen
    script does not touch the docstring.
  - **2c — route the alias.** Edit `tokens.css:1266`: `--dock-resize-spring: var(--spring-dock);`.
    Update the docstring (1259–1265) to cite AU.W8 and the snappy→dock retarget rationale (the
    mechanical-plateau diagnosis), preserving the note that both engines consume this one curve.
    `--dock-press-spring` (1275) is UNTOUCHED (orthogonal transform-only family).
  - **2d — re-pin the VT fallback default.** `view-transition.css:61`:
    `animation-timing-function: var(--dock-resize-spring, var(--spring-dock));` (primary token is
    already `--dock-resize-spring`; only the fallback literal moves snappy→dock).
  - **2e — re-pin the parity gate.** `proof-dock-motion-parity.mjs:193` currently asserts
    `--dock-resize-spring` IS `var(--spring-snappy)`. Retarget the SOURCE check to `--spring-dock`:
    ```js
    } else if (!/--spring-dock\b/.test(springDecl)) {
        violations.push(`--dock-resize-spring must be the dock morph spring (var(--spring-dock)), got: \`${springDecl}\``);
    }
    ```
    Keep the PARITY + NO-FORK + GUARD checks intact (they assert VT ≡ FLIP source via
    `--dock-resize-spring`); drop the now-vacuous `apple-spring` negative check ONLY if it conflicts.
    Update the parity unit-spec fixtures (`scripts/__tests__/proof-dock-motion-parity.test.ts` if
    present) and the gate header prose from `--spring-snappy` to `--spring-dock`.

  **mwg fold (crosswalk §1 / §4 AU.W8 note):** `linear()` is **Baseline Newly available since
  2023-12-11** — `--spring-dock` via `linear()` is a safe primary. Per the corpus `physics-based-easing`
  caveat, ALWAYS pair the token with an explicit `duration` (`linear()` does not derive it) and apply
  it to compositor properties; avoid opacity bounce flicker (the §3 opacity-clamp fold).
- **Files**: `scripts/regen-spring-tokens.mjs`, `src/styles/tokens.css`,
  `src/styles/view-transition.css`, `scripts/proof-dock-motion-parity.mjs`,
  `scripts/__tests__/proof-dock-motion-parity.test.ts` (if present).
- **Sub-gate**: `proof:dock-motion-parity` (re-pinned) — VT timing-fn ≡ FLIP `--dock-motion-resize`
  easing ≡ `--dock-resize-spring` = `var(--spring-dock)`. Bite-check: routing `--dock-resize-spring`
  back to `--spring-snappy` reddens it. Audit every other `--spring-snappy` consumer (notably the
  reka `TabsIndicator` default) so the retarget does not silently change a non-dock surface —
  `--dock-resize-spring` is the ONLY alias retargeted.

### AU.W8.3 keyframes.js LIGHT one-rAF driver (the iOS-grade path)

- **Goal**: width and opacity advance off ONE `SpringProgress` solver clock so they converge within
  one frame of each other at SETTLE — the iOS-grade lockstep the CSS-transition-per-property pair
  cannot guarantee against sub-frame jitter.
- **Mechanism**: AU.W8.1 makes opacity and width START in the same frame; the CSS transition then
  runs each property on its own engine clock and they can drift at settle. Drive BOTH off one
  `tickDt(dt)`. Import the LIGHT surface ONLY: `import { SpringProgress } from "@mkbabb/keyframes.js";`
  (`SpringProgress` carries NO static value.js edge — it owns its own `RAFPlayback` via
  `spring.play(onFrame)`; NO `AnimationGroup` HEAVY constructor needed). Inside the FLIP fallback,
  after measuring `fromSize`/`toSize`:
  ```ts
  const spring = new SpringProgress({ response: 0.5, dampingFraction: 0.5, respectReducedMotion: true });
  spring.target = 1;
  spring.play((p) => {
      const w = fromSize + (toSize - fromSize) * p;
      setDim(el, `${w}px`);
      // Default: opacity stays class-driven (CSS). Escalate to inline only if the probe shows drift:
      //   leavingHost.style.opacity = `${1 - clamp01(p)}`;  activeHost.style.opacity = `${clamp01(p)}`;
      if (spring.settled) { clearDim(el); leavingLayer.value = null; }
  });
  ```
  Tune knobs:
  - The `(0.5, 0.5)` params MIRROR the `--spring-dock` token's `(response, ζ)` — same solver,
    build-time token AND runtime driver, bit-identical motion. Co-locate a single
    `DOCK_SPRING = { response: 0.5, dampingFraction: 0.5 }` const in `useLayerTransition.ts` (referenced
    by the driver, cross-linked by comment to the PRESETS entry) so a retune cannot drift the two.
  - Start with width-on-spring + opacity-on-class (simplest); lift opacity onto the inline `p` lerp
    (clamped `[0,1]` per the §3 mwg opacity-flicker fold) ONLY if the AU.W8.5 probe shows the
    class-transition opacity drifting >1 frame from the JS-driven width.
  - `respectReducedMotion: true` + the AU.W8.1 PRM fast-path are belt-and-suspenders; the fast-path
    returns before the driver is constructed.
  - Each swap constructs a fresh `SpringProgress`; hold the instance on a closure var and stop/drop
    it before the next swap so a superseded swap's `onFrame` cannot race the live one (the
    `transitionId` guard already gates the ID).
  After this unit, grep the dock composables for the forbidden HEAVY edges
  (`loadAnimationEngine\|AnimationGroup\|CSSKeyframesAnimation\|value.js\|fromString` under
  `src/components/custom/dock/`) — expect ZERO hits. This resolves the seam-review open question:
  **use `SpringProgress`, not `AnimationGroup`** (AnimationGroup is HEAVY-side behind `./engine`).
  Do NOT drive the VT native path through the JS driver — VT owns its own compositor morph.
- **Files**: `src/components/custom/dock/composables/useLayerTransition.ts` (the FLIP fallback rAF
  block).
- **Sub-gate**: `proof:dock-motion-single-source` (AU.W8.5) — the driver is the mechanism that makes
  the ±1-frame bar pass robustly across browsers. `proof:vueuse-free-root` stays green (the
  SOURCE-graph + DIST-floor walk re-affirms no value.js leaks into the bundle).

### AU.W8.4 reka-ui `Tabs` rail + travelling indicator + a11y + post-VT focus

- **Goal**: the layer-switcher rail is a conformant APG Tabs contract — `role="tablist"`/`role="tab"`/
  `aria-selected`, roving `tabindex`, Arrow/Home/End, a focus-visible ring, keep-open on keyboard
  nav, an `aria-hidden` inactive pane, and MANDATORY post-swap focus routing — replacing the
  hand-rolled `:aria-pressed` TOGGLE.
- **Mechanism**:
  - **4a — convert the rail to reka-ui `Tabs`.** `DockLayerGroup.vue:101-119` is a hand-rolled
    `<button>` group using `:aria-pressed` (`:109`). reka's `TabsRoot`/`TabsList`/`TabsTrigger`/
    `TabsIndicator` are barrelled at `src/components/ui/tabs/index.ts`. Wrap the rail: the `<nav>`
    becomes `<Tabs v-model="activeLayer" orientation="horizontal">`; `<TabsList>` over
    `.dock-layer-rail` (emits `role="tablist"`); each `.dock-layer-tab` → `<TabsTrigger
    :value="layer.id">` (reka emits `role="tab"`, `aria-selected`, roving `tabindex`, Arrow/Home/End,
    replacing `:aria-pressed` + `@click`; the `.dock-layer-tab` class passes through). `activeLayer`
    is the `defineModel("active")` (`:38`) that drives `useLayerTransition` — the Tabs `v-model` binds
    the SAME ref, so selecting a tab fires the crossfade with no second source of truth.
  - **4b — axis decision (cited).** reka Tabs hardcodes Left/Right (horizontal) keyboard; the rail is
    visually axis-aware via CSS `flex-direction` (`dock.css:641-645`). **Decision: keep keyboard as
    Left/Right and let CSS rotate the rail visually** for vertical docks. Do NOT inject a custom axis
    keydown handler (matches a11y-review `dock-uiux-03`). Render `<Tabs orientation="horizontal">`
    always.
  - **4c — travelling indicator (mwg-grounded; crosswalk §2.1 / §4 AU.W8).** reka's `TabsIndicator`
    exposes `--reka-tabs-indicator-position` + `--reka-tabs-indicator-size` (browser-computed JS
    geometry). The mwg `anchor-positioning-tab-underline` recipe is the EXACT native equivalent, but
    **anchor positioning is NOT Baseline in any major browser** (crosswalk §1) — so the reka
    `TabsIndicator` JS path is PRIMARY (it works today), with native `anchor()` reserved as an
    `@supports`-gated enhancement (deferred to W8b §8). Style `.dock-layer-tab-indicator` to morph
    between tabs riding `--dock-motion-resize` (= `--spring-dock` after AU.W8.2):
    ```css
    .dock-layer-rail [data-reka-tabs-indicator] {
        position: absolute;
        height: var(--dock-layer-tab-size, var(--dock-control-size, 1.75rem));
        width: var(--reka-tabs-indicator-size);
        transform: translateX(var(--reka-tabs-indicator-position));
        border-radius: var(--dock-layer-tab-radius, var(--radius-sm));
        background: color-mix(in srgb, var(--primary) 15%, transparent);
        transition: width var(--dock-motion-resize), transform var(--dock-motion-resize);
    }
    ```
    Do NOT hardcode `--spring-snappy` (the reka default uses `ease-[var(--spring-snappy)]` — the dock
    rail OVERRIDES it with the dock token). **Retire** the per-button active background
    `.dock-layer-rail .dock-layer-tab.is-active` (`dock.css:680-683`) — the indicator carries the
    active affordance — but KEEP `color: var(--primary)` on the active tab for the glyph tint. For a
    vertical rail the horizontal-always decision (4b) keeps the indicator inline-axis; confirm in
    browser. **mwg caveat:** the visual indicator must NOT replace the ARIA state — `aria-selected`
    (reka-emitted) stays alongside it.
  - **4d — focus-visible ring.** The shared dock control ring (`dock.css:36-42`) does NOT cover
    `.dock-layer-tab`. Add `.dock-layer-rail [role="tab"]:focus-visible { box-shadow:
    var(--focus-ring-shadow); outline: none; }`.
  - **4e — keep-open on focus.** `DockLayerGroup.vue` already injects `useOptionalDockContext()`
    (`:39`). Bind `@focusin="dock?.keepOpen()"` / `@focusout="dock?.release()"` on the `<TabsList>` so
    keyboard nav does not trip idle-collapse. Acquire on first focusin, release on focusout leaving the
    rail; gate on `relatedTarget` staying inside the rail (or a boolean edge) if rapid tab-to-tab
    double-counts.
  - **4f — leaving-pane `aria-hidden` + post-VT focus routing (MANDATORY; crosswalk §3.2).**
    `DockLayer.vue` already sets `:inert` on the inactive pane (`:49`). Add `:aria-hidden="isActive ?
    undefined : true"` to `.dock-layer-item-host` so the leaving/inactive pane is out of the a11y tree
    during crossfade. **AND** add the post-swap focus routing required by the mwg VT decision-change:
    View Transitions are only **Baseline Newly 2025-10-14** and do NOT manage focus — when the swap
    removes the previously-focused element, route focus to the revealed active pane (`tabindex="-1"`
    on the new `.dock-layer-item-host` + `.focus()` after the swap). This applies to the VT native
    path AND the FLIP fallback.
- **Files**: `src/components/custom/dock/DockLayerGroup.vue` (rail, lines 96–120),
  `src/styles/dock.css` (`.dock-layer-rail`/`.dock-layer-tab`, lines 632–683),
  `src/components/custom/dock/DockLayer.vue` (inactive-pane `aria-hidden` + post-swap focus, lines
  45–52), `src/components/custom/dock/__tests__/DockLayerRail.a11y.test.ts` (new).
- **Sub-gate**: `proof:dock-a11y-contract` (new vitest, behavioral) mounts a `<DockLayerGroup>` with
  ≥2 layers and asserts: (1) `role="tablist"` on the rail; (2) `role="tab"` on each trigger, NO
  `aria-pressed` anywhere; (3) `aria-selected="true"` on exactly the active tab; (4) roving
  `tabindex` (active 0, inactive −1); (5) Arrow{Left,Right}/Home/End move the active/focused tab;
  (6) focus-visible yields the focus-ring; (7) focusing a tab calls the injected `keepOpen` (mock the
  context), blur calls `release`; (8) the inactive `.dock-layer-item-host` carries `aria-hidden="true"`.
  Use `@testing-library/vue` render + `getByRole("tab")` (the rendered-attribute assertion the
  glass-ui-binding-verification memory mandates — stale reka `:pressed`/`v-model`/`value=` bindings
  silently no-op). Wire a thin `proof:dock-a11y-contract` manifest entry running the targeted vitest
  (`vitest run src/components/custom/dock/__tests__/DockLayerRail.a11y.test.ts`). Bite-check: reverting
  to `aria-pressed` or dropping the keep-open wiring reddens it. Preserve the
  `v-if="showRail && layers.length > 1"` single-layer guard (a one-layer group paints no empty Tabs
  root).

### AU.W8.5 `proof:dock-motion-single-source` settle probe + manifest wiring

- **Goal**: a PERCEPTUAL gate that measures the felt-target frame-co-settle directly (the syntactic
  `proof:dock-opacity-lockstep` token-match cannot see frame-origin skew, which is the whole bug).
- **Mechanism**:
  - **5a — the probe.** A Playwright script mounting a demo dock (the
    `demo/stories/compositions/dock-with-slider.vue` story or a minimal harness), collapsing it, and
    rAF-sampling `getComputedStyle` every frame: record the frame where container width stops
    changing (morph settle) and the frame where a child layer's `opacity` first reads ≤ 0.01 (fade
    settle, on collapse). **Assert `|width-stop-frame − opacity-stop-frame| ≤ 1`** (±1 frame, ~16ms).
    Run on collapse AND expand (opacity≥0.99 on expand). Force the FLIP fallback (the live iOS path):
    delete `document.startViewTransition` before the swap so the FLIP path is exercised — that is the
    path AU.W8.1/.3 target.
  - **5b — born-RED + manifest.** Born-RED at W8: before AU.W8.1+.3 land it fails (the async fork
    diverges the frames); after, it greens. Add the `package.json` script entry and a `gates.mjs`
    row: `{ id: "proof:dock-motion-single-source", cmd: "proof:dock-motion-single-source", tags:
    ["local"], note: "AU.W8 — PERCEPTUAL dock-motion lockstep: FLIP-fallback collapse/expand,
    width-stop frame ↔ child-opacity≤0.01 frame within ±1 frame (the frame-origin sibling of the
    syntactic proof:dock-opacity-lockstep)" }`. Tag `local` (not `ci`) if the CI runner lacks a headed
    browser — document the CI-deferral in `AU.FINAL` like `proof:webgl-golden`; tag `ci` only if a
    Playwright gate already runs in CI.
  - **5c — demote the syntactic gate's note.** Edit `gates.mjs:44` note to mark
    `proof:dock-opacity-lockstep` as the SYNTACTIC token-match, superseded perceptually by
    `proof:dock-motion-single-source`. KEEP the syntactic gate (a cheap fast guard); do not delete.
- **Files**: `scripts/proof-dock-motion-single-source.mjs` (new), `package.json` (script entry),
  `scripts/gates.mjs` (manifest row + the `:44` demotion note).
- **Sub-gate**: this IS a gate. Bite-check: re-injecting the async fork (move the swap back to the
  synchronous `:145-147`) diverges the width-stop and opacity-stop frames by >1 frame → RED. Sample
  ≥3 collapse/expand cycles and assert the worst-case stays ≤1 frame (jitter slack is the designed
  ±1-frame tolerance). Local + release-machine is the binding tier — do NOT make a flaky CI gate
  block the publish.

### AU.W8.6 `<Role>Dock` README vocabulary + `proof:dock-vocabulary`

- **Goal**: the `<Role>Dock` naming convention (the vocabulary source of truth) is registered as a
  green gate; no `<Role>Dock` component ships (substrate-with-consumer — the role-typed base waits
  for a 2nd consumer, keyframes D.W5).
- **Mechanism**: `src/components/custom/dock/README.md` and `scripts/proof-dock-vocabulary.mjs` are
  ALREADY on disk (untracked — `git status` shows `??`), and the README already satisfies the gate
  (four roles `ChromeDock`/`TransportDock`/`CanvasDock`/`ToolDock`, the base primitives `GlassDock`/
  `DockIconButton`, the canonical composables `useDockState`/`useLayerTransition`/`useDockContext`,
  and the two re-groundings — `useTouchGate` stays general; `DockTabButton` is kept). The remaining
  step is REGISTRATION:
  - **6a — `package.json`:** add `"proof:dock-vocabulary": "node scripts/proof-dock-vocabulary.mjs"`.
  - **6b — `gates.mjs`:** add `{ id: "proof:dock-vocabulary", cmd: "proof:dock-vocabulary", tags:
    ["local", "ci"], note: "AU.W8 — the <Role>Dock README convention (ASK-7, re-grounded): four role
    names + base primitives + canonical useDock* composables + the useTouchGate/DockTabButton
    re-groundings" }`.
  The gate asserts four `ROLES`, three `COMPOSABLES`, two `BASE` in the README + the two re-grounding
  sentences — GREEN against the README at HEAD. The re-grounding is intentional: the fourier CHARTER's
  `useTouchGate→useDockTouchGate` rename and `DockTabButton` retire were STALE against HEAD; the gate
  asserts the README RECORDS those re-groundings rather than executing the stale renames.
- **Files**: `src/components/custom/dock/README.md` (already on disk), `scripts/proof-dock-vocabulary.mjs`
  (already on disk), `package.json` (script entry), `scripts/gates.mjs` (manifest row).
- **Sub-gate**: `proof:dock-vocabulary` — bite-check (already coded): deleting a role name from the
  README reddens it. The README + script are untracked; the orchestrator owns the index and `git
  add`s them (the IMPL agent does NOT stage).

## 6. Hard Gate

The wave closes when every condition holds, each backed by the named command/check:

1. **`proof:dock-motion-single-source` is GREEN** — the Playwright settle probe finds
   `|width-stop-frame − opacity-stop-frame| ≤ 1` on the FLIP fallback (VT deleted) over ≥3
   collapse AND expand cycles. This is the MEASURABLE felt-target. Bite-check: re-inject the
   synchronous swap (`:145-147`) → frames diverge >1 → RED. (Closes AU.W8.1 + AU.W8.3.)
2. **`proof:dock-motion-parity` is GREEN (re-pinned)** — `node scripts/proof-dock-motion-parity.mjs`
   asserts VT timing-fn ≡ FLIP `--dock-motion-resize` easing ≡ `--dock-resize-spring` =
   `var(--spring-dock)`, with the PARITY/NO-FORK/GUARD (`morphGeneration`) checks intact. Bite-check:
   route `--dock-resize-spring` back to `--spring-snappy` → RED. (Closes AU.W8.2.)
3. **`proof:dock-a11y-contract` is GREEN** — `vitest run
   src/components/custom/dock/__tests__/DockLayerRail.a11y.test.ts` asserts the 8 rendered-attribute
   conditions (tablist/tab/aria-selected/roving-tabindex/arrow-keys/focus-ring/keep-open/aria-hidden).
   Bite-check: revert to `aria-pressed` or drop keep-open → RED. (Closes AU.W8.4.)
4. **`proof:dock-vocabulary` is GREEN** — `node scripts/proof-dock-vocabulary.mjs` finds the four
   roles + base primitives + canonical composables + the two re-groundings in the README. Bite-check:
   delete a role name → RED. (Closes AU.W8.6.)
5. **`proof:vueuse-free-root` is GREEN** — the SOURCE-graph + DIST-floor walk re-affirms the dock
   stays LIGHT-surface (no `loadAnimationEngine`/`AnimationGroup`/value.js edge). The targeted grep
   over `src/components/custom/dock/` for the forbidden HEAVY edges returns ZERO hits. (Guards AU.W8.3.)
6. **`proof:dock-opacity-lockstep` is GREEN (KEPT, note demoted)** — still asserts both CSS rules name
   `--dock-motion-resize` (the cheap syntactic fast-guard, superseded perceptually by gate #1).
7. **`proof:strict-templates` (vue-tsc) is GREEN** — the reka `Tabs` bindings on `<TabsTrigger>` are
   well-typed. Bite-check: a bogus prop → RED typecheck.
8. **`npm run typecheck` + `npm run test` are GREEN** — the wave introduces no type regression and the
   new vitest passes alongside the existing suite.

## 7. Format And Lint Cadence

- After each unit lands: `npm run typecheck` (vue-tsc `--noEmit`) on the touched `.ts`/`.vue`.
- After the token regen (AU.W8.2): `node scripts/regen-spring-tokens.mjs` is the FORMATTER for the §2
  EASING block — the emitted stops are machine-authored, never hand-edited; re-running it is
  idempotent and is the format check.
- Before the commit: the full dock gate set — `proof:dock-motion-single-source`,
  `proof:dock-motion-parity`, `proof:dock-a11y-contract`, `proof:dock-vocabulary`,
  `proof:dock-opacity-lockstep`, `proof:vueuse-free-root`, `proof:strict-templates` — plus
  `npm run test` and `git diff --check` (whitespace/conflict-marker hygiene on the CSS + Markdown).
- The `package.json`/`gates.mjs` manifest edits are validated by the gate-runner itself resolving the
  two new `proof:*` ids (a missing script entry fails the runner — the wiring is self-checking).

## 8. Verification Artefacts

- `proof:dock-motion-single-source` probe log: the per-frame width/opacity samples + the asserted
  `|Δframe| ≤ 1` for ≥3 collapse and ≥3 expand cycles (saved to the gate-runner output; cite the
  worst-case Δ in `AU.FINAL`).
- `proof:dock-a11y-contract` vitest output: the 8 passing assertions (rendered roles/attrs).
- `proof:dock-motion-parity` output: the GREEN parity/no-fork/guard lines naming `--spring-dock`.
- The regenerated `tokens.css` §2 EASING block diff (the 50-stop `--spring-dock` `linear()` + the
  corrected ζ docstring) + the `--dock-resize-spring` route diff.
- The single atomic commit hash (§9) + the `git add` of the two untracked files (README + vocabulary
  script).
- The targeted-grep ZERO-hit log for the forbidden HEAVY keyframes.js edges under
  `src/components/custom/dock/`.

## 9. Commit Plan

ONE atomic commit (the publish-blocking 3.3.0 dock-design contract). No worktree/agent-owned commits
(serial single writer); no separated generation commit (the regen output is part of the one commit so
the token and its consumers land together).

- **Scope**: `feat(tranche-AU): W8 — dock-motion overhaul (single-frame FLIP sync + --spring-dock +
  LIGHT one-rAF driver + reka Tabs rail a11y + settle/vocabulary gates)`.
- **Body (required — broad + generated + gate change):** name the six folds (AU.W8.1 swap-into-rAF,
  AU.W8.2 `--spring-dock` author/route + parity re-pin, AU.W8.3 `SpringProgress` driver, AU.W8.4 reka
  Tabs rail + travelling indicator + post-VT focus, AU.W8.5 born-RED settle probe, AU.W8.6 vocabulary
  registration); note the regen-emitted §2 EASING block; note the mwg decision-folds (FLIP-is-live-iOS
  per VT Baseline 2025-10-14, post-VT focus routing, anchor-not-Baseline → reka indicator primary,
  `linear()` Baseline 2023-12-11); note the two untracked files `git add`ed (README + vocabulary
  script — the orchestrator stages, the IMPL agent does not).
- **Status commit**: the wave-close `AU.FINAL` / progress-log entry recording the gate evidence and
  the `proof:dock-motion-single-source` CI-deferral (if tagged `local`).

## 10. Dependencies

- **Depends on**: AU.W7 (closed — the OKLCh shader-quality wave); the published `@mkbabb/keyframes.js`
  LIGHT surface (`SpringProgress`, READ-ONLY, inv-16); the existing `--dock-resize-spring` alias and
  `--dock-motion-resize` consumer rules; the untracked `README.md` + `proof-dock-vocabulary.mjs` on
  disk; `docs/tranches/AU/audit/AUGMENT/modern-web-guidance-crosswalk.md` §3 (the folded decision-changes).
- **Blocks**: the 3.3.0 publish (this is the publish-blocking dock contract); AU.W8b (the modern-CSS +
  hygiene fold — `interpolate-size`/`calc-size(auto)`, `@starting-style` + `transition-behavior`,
  CSS nesting, the `dock.css` split, `defineModel` ×8, `Readonly<>` context guards, the
  `@supports (anchor-name)` dock-popover enhancement, `-webkit-*` cleanup — NONE of which block 3.3.0).

---

## Appendix A — DONE / DEFERRED boundary (W8 vs W8b)

**W8 (this wave, the publish-blocking contract):** AU.W8.1–.6 — single-frame FLIP sync, `--spring-dock`
author+route, LIGHT one-rAF driver, reka Tabs rail + travelling indicator + a11y + post-VT focus, the
settle probe, the vocabulary README+gate.

**P1 anchor positioning for dock popovers — DEFER to W8b.** AU-AUGMENT §2.4 lists native `anchor()`
for dock popovers as ADOPT (W8, P1), `@supports`-gated. **mwg fold (crosswalk §1 / §2.1):** anchor
positioning is **NOT Baseline in any major browser** — so the floating-ui path stays the primary
unconditional fallback and `anchor()` is the `@supports (anchor-name: --x)`-gated enhancement only.
The headline W8 gates (motion-single-source, a11y-contract, vocabulary) do NOT depend on it; land it
in W8b unless it is trivially `@supports`-gated with zero behavior change.

**W8b (the modern-CSS + hygiene fold, NON-blocking):** `interpolate-size: allow-keywords` +
`calc-size(auto)` on `.dock-layers` (both **limited** per crosswalk §1 — Chrome/Edge 129 only — so the
`@supports` gate is the correctness mechanism, not polish; the FLIP fixed-pixel fallback stays);
`@starting-style` + `transition-behavior: allow-discrete` on `.dock-layer` (both **Newly 2024-08-06**
— Baseline-safe behind `@supports`; folds the visibility fork into one discrete-animated property,
preserving the 3-state active/inactive/leaving contract; do NOT put `allow-discrete` in the
`transition` shorthand — use a separate declaration); CSS nesting (**Widely 2023**); the `dock.css` →
`dock.css`/`dock-controls.css` split; the 12-site non-idiomatic Tailwind lift; `defineModel` ×8;
context `Readonly<>` guards on `currentLayerId`/`leavingLayerId`; the `@supports (anchor-name)`
dock-popover enhancement; `::-webkit-scrollbar` KEPT under `@supports not(scrollbar-color)`
(crosswalk §3.3 — `scrollbar-color` only **Newly 2025-12-12**, do NOT strip); `-webkit-*` cleanup.
None block 3.3.0.

## Appendix B — Consolidated risks + the LOAD-BEARING do-not-touch list

1. **The visibility-semantic fork is LOAD-BEARING** (`dock.css:428` deferred vs `:449` immediate). Do
   NOT collapse it. Active paints at once; leaving stays hit-testable through the fade. Any
   `@starting-style` rewrite (W8b) PRESERVES the 3-state contract.
2. **`--dock-press-spring` must NEVER fold into the resize family** (`tokens.css:1275`). Press
   feedback is transform-only; it must not touch surface fades. AU.W8.2 leaves it untouched.
3. **The `transitionId`/`morphGeneration` generation guards are load-bearing** for A→B→A no-skip.
   AU.W8.1 keeps `transitionId`; `morphGeneration` (`GlassDock.vue:154`) is untouched; the parity
   gate's GUARD check asserts it survives.
4. **keyframes.js is READ-ONLY (inv-16).** The dock consumes the published LIGHT surface only. Use
   `SpringProgress` directly (NOT `AnimationGroup`, which is HEAVY-side).
5. **The AU.W8.1 same-tick measure-after-swap read** may need an inner `await nextTick()`. Gate on the
   probe; prefer the no-extra-tick form first.
6. **Token-driver param drift.** The AU.W8.3 driver `(0.5, 0.5)` MUST mirror the `--spring-dock`
   PRESETS entry — co-locate a single `DOCK_SPRING` const so a retune touches both.
7. **reka binding silent-no-op** (memory: glass-ui-binding-verification). The a11y test asserts
   RENDERED roles/attrs, not just mount success.
8. **Stale §2 docstring** (`tokens.css:144-148`) mislabels ζ values; AU.W8.2 corrects it (isomorphic).
9. **Opacity overshoot flicker** (mwg crosswalk §2.1). The `--spring-dock` curve overshoots +18.5%;
   if opacity is driven off `p`, clamp `[0,1]` — the default keeps opacity class-driven where the
   clamp is implicit.
10. **VT does not manage focus** (mwg crosswalk §3.2; VT Baseline 2025-10-14). The post-swap focus
    routing (AU.W8.4f) is MANDATORY on both the VT path and the FLIP fallback.
