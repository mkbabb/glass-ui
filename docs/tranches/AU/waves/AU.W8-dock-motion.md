# AU.W8 — Dock-MOTION overhaul (ONE atomic pass)

**Type:** IMPL · **Wave:** AU.W8 · **Supersedes:** AU.md §3 W8 + §4.2 #11–12 ·
**Source:** AU-AUGMENT.md §2 (the headline) + ten review domains (motion / spring-seam /
state-machine / a11y-rail / VT / PRM / felt-target).

> This wave is the publish-blocking dock-design CONTRACT for 3.3.0. It is ONE atomic
> motion+a11y+vocabulary commit. Readability/encapsulation polish (CSS split,
> `interpolate-size`, `@starting-style`, `defineModel`, `Readonly<>` guards) is W8b and
> MUST NOT block this. inv-16: every edit below is in `~/Programming/glass-ui` only;
> `@mkbabb/keyframes.js` is READ-ONLY upstream (no change required — §0).

---

## §0 — Precepts binding this wave

- **No legacy / gestalt / KISS.** The async-fork fix is a TRANSPOSITION (move two ref
  mutations one rAF later), not a patch layered on top. No compat alias, no second code path.
- **value.js-free dock driver.** The keyframes.js consumption is the LIGHT surface ONLY
  (`SpringProgress`, `springLinearStops`, `springTimingFunction`, `Timeline`, `ElementMorph`,
  `RAFPlayback`). NEVER `loadAnimationEngine()` / `AnimationGroup` runtime constructor /
  `Animation` / `CSSKeyframesAnimation` (those pull value.js via the HEAVY `./engine` dynamic
  import). The dock stays off the root barrel and value.js-free — re-verified by
  `proof:vueuse-free-root`.
- **Isomorphic styling.** Every motion knob is a CSS custom property emitted at BUILD time by
  `scripts/regen-spring-tokens.mjs`. No public API change to any dock component or composable.
- **One spring authority.** ONE `(response, ζ)` source → ONE `linear()` token → consumed by
  the VT path AND the FLIP fallback AND (Step 3) the runtime rAF driver. No split-brain curve.

### The felt-target (the acceptance bar)

The user taps the dock toggle. The pill springs open: container width and child opacity both
overshoot their target by ~15–30%, then settle back elastically over ~300ms. Items do NOT lag
or fade mid-morph — shell and items move and fade as ONE physical object. On collapse, the
reverse: items and shell compress and fade in unison, no flicker. The motion reads springy and
live — not stiff (snappy ζ=0.65, +6.8%, plateaus at ~48%) and not sluggish (smooth ζ=0.86, no
overshoot). The MEASURABLE proxy: **container-width-stop frame and child-opacity≤0.01 frame land
within ±1 frame (±16ms)** under the FLIP fallback (the live iOS-Safari path — iOS has no VT).

---

## §1 — Sequencing

The six steps land in ONE commit. Order them so each gate can be bitten as it greens:

1. **Step 1** — single-frame FLIP sync (`useLayerTransition.ts`). *Born-RED proxy:* re-injecting
   the sync class-swap reddens `proof:dock-motion-single-source` (Step 5 gate).
2. **Step 2** — author `--spring-dock` + route `--dock-resize-spring` + update the two pinned
   gates/recipes that hard-name `--spring-snappy`. *Greens:* `proof:dock-motion-parity` (re-pinned).
3. **Step 3** — the keyframes.js LIGHT one-rAF driver inside the FLIP fallback (iOS-grade path).
4. **Step 4** — reka-ui `Tabs` rail + travelling indicator + axis-aware focus/keep-open a11y.
   *Greens:* `proof:dock-a11y-contract` (new vitest).
5. **Step 5** — the `proof:dock-motion-single-source` Playwright settle probe + manifest wiring +
   `proof:dock-opacity-lockstep` demotion note.
6. **Step 6** — `<Role>Dock` README vocabulary + `proof:dock-vocabulary` manifest wiring
   (README + script already authored, untracked).

Steps 2/3 are interdependent (the driver and the token share the spring source); land Step 2
first so the curve exists before the driver references it. Steps 4 and 6 are independent of 1–3.

---

## Step 1 — Single-frame FLIP sync (the async-fork kill)

### Files
- `src/components/custom/dock/composables/useLayerTransition.ts` (the FLIP fallback, lines 135–186).

### The diagnosis (grounded)
The FLIP fallback (`useLayerTransition.ts:135-186`) forks the morph across two animation frames:
- **`:146-147`** — `leavingLayer.value`/`currentLayer.value` are mutated **synchronously**. Vue
  paints the `.is-leaving`/`.is-active` (or `.layer-active`) class swap → the `.dock-layer` opacity
  transition (`dock.css:424-429`) fires ~T3-5ms.
- **`:150` (`nextTick`) → `:167-169` (`requestAnimationFrame`)** — the width is set ~T7-10ms,
  one frame later, so the width morph starts a frame behind opacity. On collapse the box shrinks
  while items are mid-paint; on expand items fade in mid-morph.

The VT native path (`:121-133`) is immune (one synchronous mutation inside `startViewTransition`).
The fix is FLIP-fallback-only — and the FLIP fallback IS the live iOS-Safari path.

### The change (the `:146 → :167` move)
Move the two ref mutations OUT of the synchronous body and INTO the `requestAnimationFrame`
callback, so class-apply (→ opacity) and width-set start in the SAME frame.

- **Delete** the synchronous swap at `:145-147`:
  ```ts
  // 3. Swap: mark old as leaving, new as active
  leavingLayer.value = oldLayer;
  currentLayer.value = newLayer;
  ```
- The measure step at `:150-164` needs the NEW layer painted to read the new natural size, but it
  measures with `transition: "none"` + unpinned dim, so the swap must happen BEFORE the measure.
  Restructure the `nextTick` body so the swap is the first mutation, the measure follows, and the
  width-set stays in the rAF — **all three (swap, measure, width-set) inside the deferred block,
  with the swap and the final width-set in the same rAF tick.** Concretely, the `nextTick` body
  becomes:
  ```ts
  nextTick(() => {
      if (id !== transitionId) return;
      if (!el) return;

      requestAnimationFrame(() => {
          if (id !== transitionId) return;

          // 3. Swap: mark old as leaving, new as active — DEFERRED into the rAF
          //    so the opacity transition (class-driven) and the width-set start
          //    in the SAME animation frame (AU.W8 §2.2 fix A; <16ms skew bar).
          leavingLayer.value = oldLayer;
          currentLayer.value = newLayer;

          // 4. Measure the new natural size (swap is now applied this tick).
          el.style.transition = "none";
          clearDim(el);
          const toSize = getSize(el);

          // Re-pin to old size, force reflow, restore transitions.
          setDim(el, `${fromSize}px`);
          void el.offsetWidth;
          el.style.transition = "";

          // 5. Animate to the new size — same frame as the class swap.
          setDim(el, `${toSize}px`);

          if (Math.abs(toSize - fromSize) < 0.5) {
              clearDim(el);
              leavingLayer.value = null;
              return;
          }
          cleanupTimer = setTimeout(() => {
              if (id !== transitionId) return;
              clearDim(el);
              leavingLayer.value = null;
          }, cleanupDelayMs(el));
      });
  });
  ```
  Note: the class swap reactively re-renders Vue's DOM; reading `getSize(el)` immediately after a
  ref write in the SAME tick requires the swap's DOM effect to have flushed. Because the swap is a
  reactive ref write, schedule the measure after a `nextTick` *within* the rAF if a same-tick read
  proves stale (Vue flushes the reactive class update on the microtask queue). **Validation
  contract:** the settle probe (Step 5) is the arbiter — if width and opacity do not co-settle
  within ±1 frame, add the inner `await nextTick()` before the measure. Prefer the no-extra-tick
  form first (KISS); only add the inner tick if the probe is RED.

### PRM fast-path (close the §2.5 gap)
The FLIP fallback has no `prefers-reduced-motion` awareness today; it relies on the global
`utilities.css` blanket stripping width from `transition-property`. Add an explicit JS gate at the
top of the `watch` body, after the `NATIVE_VT` block:
```ts
const prm =
    typeof window !== "undefined" &&
    window.matchMedia?.("(prefers-reduced-motion: reduce)").matches;
if (prm) {
    // Snap: swap state, no measure/pin/animate dance.
    currentLayer.value = newLayer;
    leavingLayer.value = null;
    return;
}
```
This makes the reduced-motion path a single synchronous state swap (no rAF, no inline size). The VT
path's PRM is already CSS-gated (`view-transition.css:27-33`); optionally add the same
`matchMedia` guard before `startViewTransition` for symmetry (low priority — CSS already zeroes the
VT animation).

### Gate
`proof:dock-motion-single-source` (Step 5) — bite-check: reverting the swap back to the synchronous
`:146-147` position reddens it (width-stop and opacity≤0.01 diverge by >1 frame).

### Risk
- Deferring the swap one rAF defers the paint-tree class update by ~16ms on the swap. Safe for Vue
  reactivity (ref writes inside rAF flush normally). The settle probe is the guard against
  perceptible lag on low-end devices.
- The same-tick measure-after-swap read may be stale if Vue hasn't flushed the class effect. Guard:
  the inner `await nextTick()` escape hatch above, gated on the probe.
- Do NOT touch the VT native path or the `transitionId` generation guard (`:123`, `:137`) — both
  load-bearing for A→B→A no-skip.

---

## Step 2 — Author `--spring-dock` + route `--dock-resize-spring`

### Files
- `scripts/regen-spring-tokens.mjs` (PRESETS table, lines 30–55) — add the fifth preset.
- `src/styles/tokens.css` (§2 EASING block ~158–161 regenerated; the `--dock-resize-spring`
  docstring + decl at 1259–1266).
- `src/styles/view-transition.css` (`::view-transition-group(.gl-dock-layer)` fallback, line 61).
- `scripts/proof-dock-motion-parity.mjs` (the SOURCE assertion at `:193`, `:195`).

### The change

**2a — add the preset (build-time author).** Insert a fifth entry into `PRESETS`
(`regen-spring-tokens.mjs:30`):
```js
{
    name: "dock",
    response: 0.5,
    dampingFraction: 0.5,
    comment: "dock expand/collapse morph — iOS-springy overshoot ~+18.5%",
},
```
Then widen the marker regex so the new line is found + rewritten in place. At
`regen-spring-tokens.mjs:89-90`:
```js
const SPRING_LINES_RE =
    /(    --spring-(?:smooth|snappy|bouncy|gentle|dock): linear\([^)]+\);\n?)+/m;
```
Run `node scripts/regen-spring-tokens.mjs`. It emits a 50-stop `linear()` for `--spring-dock` into
`tokens.css` §2. The (0.5, 0.5) curve peaks analytically at `1 + e^(-0.5π/√(1-0.25)) ≈ 1.185`
(+18.5%) at ~14% progress — between snappy (+6.8%) and bouncy (+20.5%), squarely in the ~15–30%
band. The 48-sample (~2% grid) faithfully captures this peak (the same fidelity argument that
raised SAMPLE_COUNT 24→48 for bouncy applies).

**2b — fix the stale §2 docstring drift (housekeeping, isomorphic).** `tokens.css:144-148`
currently mislabels snappy as ζ=0.85 and bouncy as ζ=0.65; the script's actual PRESETS are snappy
ζ=0.65 / bouncy ζ=0.45 (and the emitted `--spring-snappy` peaks at 1.068 = +6.8%, confirming
ζ=0.65). Correct the docstring to match the PRESETS and add the `dock: (0.50s, ζ=0.50) — ~+18.5%
overshoot` line. This is a comment-only edit; the regen script does not touch the docstring.

**2c — route the alias.** Edit `tokens.css:1266`:
```css
--dock-resize-spring: var(--spring-dock);
```
Update the docstring (1259–1265) to cite AU.W8 and the snappy→dock retarget rationale (the
mechanical-plateau diagnosis), preserving the existing note that both engines consume this one
curve. No other token changes — `--dock-press-spring` (1275) is UNTOUCHED (orthogonal
transform-only family; folding it into the resize family is a §6 risk).

**2d — re-pin the VT fallback default.** `view-transition.css:61` currently falls back to
`var(--spring-snappy)`:
```css
animation-timing-function: var(--dock-resize-spring, var(--spring-dock));
```
(The primary token is already `--dock-resize-spring`; only the fallback literal moves snappy→dock so
the fallback matches the new source.)

**2e — re-pin the parity gate.** `proof-dock-motion-parity.mjs:193-201` asserts
`--dock-resize-spring` IS `var(--spring-snappy)`. Retarget the SOURCE check to `--spring-dock`:
```js
} else if (!/--spring-dock\b/.test(springDecl)) {
    violations.push(
        `--dock-resize-spring must be the dock morph spring (var(--spring-dock)), got: \`${springDecl}\``,
    );
}
```
Drop the now-vacuous `apple-spring` negative check ONLY if it conflicts; keep the PARITY + NO-FORK +
GUARD checks intact (they assert VT ≡ FLIP source, which still holds via `--dock-resize-spring`).
Update the parity gate's unit spec (`scripts/__tests__/proof-dock-motion-parity.test.ts` if present)
fixtures from `--spring-snappy` to `--spring-dock`. Update the gate's header comment (the
"settling snappy spring" prose) to name `--spring-dock`.

### Gate
`proof:dock-motion-parity` (re-pinned) — VT timing-fn ≡ FLIP `--dock-motion-resize` easing ≡
`--dock-resize-spring` = `var(--spring-dock)`. Bite-check: routing `--dock-resize-spring` back to
`--spring-snappy` reddens it.

### Risk
- The §2 EASING block is machine-generated; hand-editing the emitted `--spring-dock` stops would
  drift from the solver. ONLY edit via the script.
- The travelling indicator (Step 4) and any other `--spring-snappy` consumers must be audited so the
  retarget does not silently change a non-dock surface. `--dock-resize-spring` is the ONLY alias
  retargeted; `--spring-snappy` keeps its own consumers (e.g. reka `TabsIndicator` default).

---

## Step 3 — keyframes.js LIGHT one-rAF driver (the iOS-grade path)

### Files
- `src/components/custom/dock/composables/useLayerTransition.ts` (the FLIP fallback rAF block).

### Why a JS driver (over CSS-transition-only)
Step 1 makes opacity and width START in the same frame; the CSS transition (`--dock-motion-resize`)
then runs each property on its own engine clock — they can still drift at SETTLE by browser
sub-frame jitter. Driving BOTH off ONE `SpringProgress` solver guarantees they advance off one
`tickDt(dt)` clock and converge within one frame of each other — the iOS-grade lockstep.

### The shape (LIGHT surface, value.js-free)
Import the LIGHT surface only:
```ts
import { SpringProgress } from "@mkbabb/keyframes.js";
```
`SpringProgress` carries NO static value.js edge (verified: `keyframes.js/src/animation/index.ts`
LIGHT barrel; `proof:vueuse-free-root` sibling discipline). It owns its own `RAFPlayback` via
`spring.play(onFrame)` — no `AnimationGroup` (HEAVY) needed.

Inside the FLIP fallback (replacing the CSS-transition-driven width-set of Step 1 for the
animated case), after measuring `fromSize`/`toSize`:
```ts
const spring = new SpringProgress({
    response: 0.5,
    dampingFraction: 0.5,
    respectReducedMotion: true, // snaps to target in one emission under PRM
});
spring.target = 1; // progress 0 → 1
spring.play((p) => {
    // ONE clock: width and opacity both read `p`.
    const w = fromSize + (toSize - fromSize) * p;
    setDim(el, `${w}px`);
    // opacity is class-driven (CSS) but its TARGET is reached as p→1; for the
    // strict one-rAF contract drive opacity inline off `p` too if the probe
    // shows class-transition drift:
    //   leavingHost.style.opacity = `${1 - clamp01(p)}`;
    //   activeHost.style.opacity  = `${clamp01(p)}`;
    if (spring.settled) {
        clearDim(el);
        leavingLayer.value = null;
    }
});
```
Tune knobs:
- The `(0.5, 0.5)` params MIRROR the `--spring-dock` token's `(response, ζ)` — same solver, build-time
  token AND runtime driver, bit-identical motion. Do NOT hardcode a divergent pair; if the token
  retunes, retune here in lockstep (or read the params from a single shared module constant so they
  cannot drift — preferred KISS: a `DOCK_SPRING = { response: 0.5, dampingFraction: 0.5 }` const
  co-located in `useLayerTransition.ts` and referenced by both the driver and a comment cross-link to
  the PRESETS entry).
- Keep the class swap (Step 1) driving opacity via CSS for the default case; only lift opacity onto
  the inline `p` lerp if the Step 5 probe shows the class-transition opacity drifting >1 frame from
  the JS-driven width. Start with width-on-spring + opacity-on-class (simplest); escalate only if RED.
- `respectReducedMotion: true` plus the Step 1 PRM fast-path are belt-and-suspenders; the fast-path
  returns before the driver is constructed, so the driver's PRM handling is a safety net.

### value.js-free re-verification
After this step, grep the dock composables for the forbidden HEAVY edges:
```
grep -rn "loadAnimationEngine\|AnimationGroup\|CSSKeyframesAnimation\|value.js\|fromString" \
  src/components/custom/dock/
```
Expect ZERO hits. `proof:vueuse-free-root` must stay green (the dock is not root-barrel-reachable, but
the SOURCE-graph + DIST-floor walk re-affirms no value.js leaks into the bundle).

### Gate
`proof:dock-motion-single-source` (Step 5) — the perceptual lockstep probe. The driver is the
mechanism that makes the ±1-frame bar pass robustly across browsers.

### Risk
- AnimationGroup is HEAVY-side in the current keyframes.js barrel (its runtime constructor lives
  behind `./engine` which pulls value.js). The spec uses `SpringProgress` directly — it owns its
  own `RAFPlayback`, so the multi-child compositing of `AnimationGroup` is NOT needed (width+opacity
  are two scalar reads off one progress value). This resolves the seam-review open question (the
  AnimationGroup HEAVY/LIGHT ambiguity): **use `SpringProgress`, not `AnimationGroup`.**
- Each swap constructs a fresh `SpringProgress` (its own `RAFPlayback`); the browser coalesces at the
  rAF level, so per-swap instances are fine. The `transitionId` generation guard (Step 1) prevents a
  superseded swap's `onFrame` from racing the live one (stop the prior spring on a new swap: hold the
  spring instance on a closure var and call `spring.stop?.()` / drop the ref before constructing the
  next).
- Do NOT drive the VT native path through the JS driver — VT owns its own compositor morph.

---

## Step 4 — reka-ui `Tabs` rail + travelling indicator + a11y

### Files
- `src/components/custom/dock/DockLayerGroup.vue` (the rail `<nav>` + `<button>` group, lines 96–120).
- `src/styles/dock.css` (`.dock-layer-rail` / `.dock-layer-tab`, lines 632–683).
- `src/components/custom/dock/DockLayer.vue` (the leaving-pane `aria-hidden`, lines 45–52).
- A new vitest: `src/components/custom/dock/__tests__/DockLayerRail.a11y.test.ts`.

### The defect (grounded)
`DockLayerGroup.vue:101-119` is a hand-rolled `<button>` group using `:aria-pressed`
(`:109`) — a TOGGLE semantic. The APG Tabs pattern requires `role="tablist"` / `role="tab"` /
`aria-selected`, roving `tabindex`, and Arrow/Home/End keys. The rail has NO keyboard handlers, no
focus-visible ring (the shared dock control ring at `dock.css:36-42` does NOT cover
`.dock-layer-tab`), and no keep-open token on focus (the dock can idle-collapse during keyboard nav).

### The change

**4a — convert the rail to reka-ui `Tabs`.** reka-ui's `TabsRoot`/`TabsList`/`TabsTrigger`/
`TabsIndicator` are barrelled at `src/components/ui/tabs/index.ts`. Wrap the rail:
- `<Tabs v-model="activeLayer" orientation="horizontal">` as the rail root (the `<nav>` becomes the
  Tabs root; keyboard stays Left/Right per the design decision below).
- `<TabsList>` over the `.dock-layer-rail` container — emits `role="tablist"` automatically.
- Each `.dock-layer-tab` → `<TabsTrigger :value="layer.id">` — reka-ui emits `role="tab"`,
  `aria-selected`, roving `tabindex` (active=0, others=−1), and Arrow/Home/End navigation, replacing
  the hand-rolled `:aria-pressed` + `@click`. Keep the dock-token styling by passing the
  `.dock-layer-tab` class through (TabsTrigger forwards `class`).
- `<TabsIndicator>` for the travelling indicator (4c).

Because `activeLayer` is the `defineModel("active")` (`DockLayerGroup.vue:38`) AND it drives
`useLayerTransition`, the Tabs `v-model` binds to the SAME ref — selecting a tab sets `activeLayer`,
which fires the crossfade. No second source of truth.

**4b — axis decision (cited).** reka-ui Tabs hardcodes Left/Right (horizontal) keyboard. The dock
rail is visually axis-aware via CSS `flex-direction` (`dock.css:641-645`). **Decision: keep keyboard
as Left/Right (the horizontal tab convention) and let CSS rotate the rail visually** for vertical
docks. Do NOT inject a custom axis keydown handler (over-engineered; matches the a11y-review
recommendation `dock-uiux-03`). Render `<Tabs orientation="horizontal">` always.

**4c — travelling indicator (retire the per-button background).** reka's `TabsIndicator` exposes
`--reka-tabs-indicator-position` + `--reka-tabs-indicator-size` (browser-computed from trigger
geometry). Add a `.dock-layer-tab-indicator` element styled to morph between tabs:
```css
.dock-layer-rail [data-reka-tabs-indicator] {
    position: absolute;
    /* horizontal rail: travel along the inline axis */
    height: var(--dock-layer-tab-size, var(--dock-control-size, 1.75rem));
    width: var(--reka-tabs-indicator-size);
    transform: translateX(var(--reka-tabs-indicator-position));
    border-radius: var(--dock-layer-tab-radius, var(--radius-sm));
    background: color-mix(in srgb, var(--primary) 15%, transparent);
    transition:
        width var(--dock-motion-resize),
        transform var(--dock-motion-resize);
}
```
- The indicator rides `--dock-motion-resize` (= `--spring-dock` after Step 2), unifying its morph
  with the layer morph. Do NOT hardcode `--spring-snappy` (the reka default `TabsIndicator.vue` uses
  `ease-[var(--spring-snappy)]` — the dock rail OVERRIDES it with the dock token).
- **Retire** the per-button active background `.dock-layer-rail .dock-layer-tab.is-active`
  (`dock.css:680-683`) — the indicator now carries the active affordance. Keep `color: var(--primary)`
  on the active tab for the glyph tint (the indicator is the box; the tab keeps its text color).
- For a vertical rail the indicator travels along the block axis — reka's position var maps to the
  rail's main axis; verify the `translateX`→`translateY` for vertical via a `.dock-layer-group.vertical`
  override if reka emits a single-axis var (reka emits position for the active orientation; the
  horizontal-always decision in 4b means the indicator stays inline-axis — confirm in browser).

**4d — focus-visible ring.** Extend the shared dock control focus ring to cover the rail tab. Add
`.dock-layer-rail [role="tab"]:focus-visible` (or `.dock-layer-tab:focus-visible`) to the shared
group at `dock.css:36-42`, OR add a dedicated rule:
```css
.dock-layer-rail [role="tab"]:focus-visible {
    box-shadow: var(--focus-ring-shadow);
    outline: none;
}
```

**4e — keep-open on focus.** Wire the rail to the dock keep-open contract so keyboard nav does not
trip idle-collapse. `DockLayerGroup.vue` already injects `useOptionalDockContext()` (`:39`). Bind
`@focusin="dock?.keepOpen()"` / `@focusout="dock?.release()"` on the `<TabsList>` (or the rail
`<nav>`). Use a single token for the whole rail (acquire on first focusin, release on focusout
leaving the rail) so rapid tab-to-tab does not over-count — simplest correct form: acquire on
focusin, release on focusout, and rely on reka's roving focus keeping focus within the rail (a
within-rail Arrow move is focusout→focusin on the same rail; if that double-counts, gate on
`relatedTarget` staying inside the rail, or hold a boolean and keepOpen/release on the boolean edge).

**4f — leaving-pane `aria-hidden`.** `DockLayer.vue` already sets `:inert` on the inactive pane
(`:49`). Add `:aria-hidden="isActive ? undefined : true"` to the `.dock-layer-item-host` so the
leaving/inactive pane is out of the a11y tree during crossfade (the `is-leaving` pane stays painted
+ hit-test-dead per `dock.css:456-460`, but must also be screen-reader-hidden).

### Gate
`proof:dock-a11y-contract` (new vitest, behavioral) — mounts a `<DockLayerGroup>` with ≥2 layers and
asserts:
1. `role="tablist"` on the rail container.
2. `role="tab"` on each rail trigger; NO `aria-pressed` anywhere in the rail.
3. `aria-selected="true"` on exactly the active tab, `"false"` on the rest.
4. roving `tabindex`: active tab `tabindex="0"`, inactive `tabindex="-1"`.
5. Arrow{Left,Right}/Home/End move the active/focused tab (fire `keydown`, assert the moved
   `aria-selected`/focus).
6. focus-visible: focusing a tab yields the focus-ring (assert the class/`:focus-visible` match or the
   `box-shadow` computed — behavioral proxy: a `data-` attr or the role+focus path).
7. keep-open: focusing a rail tab calls the injected `keepOpen` (mock the dock context, assert the
   call); blur calls `release`.
8. the inactive `.dock-layer-item-host` carries `aria-hidden="true"`.

Bite-check: deleting the `aria-selected` binding (or reverting to `aria-pressed`) reddens it; removing
the keep-open focus wiring reddens it. Register the script under `package.json` only if it runs as a
standalone gate; if it is a vitest file it greens under `npm run test` — wire a thin
`proof:dock-a11y-contract` manifest entry that runs the targeted vitest
(`vitest run src/components/custom/dock/__tests__/DockLayerRail.a11y.test.ts`).

### Risk
- The glass-ui-binding-verification memory: stale reka prop/emit bindings (`:pressed`, `v-model`,
  `value=`) silently no-op and vue-tsc + units can miss them. The a11y test must assert the RENDERED
  `role`/`aria-selected`/`tabindex` (the e2e-grade attributes), not just that the component mounts —
  this is exactly the class of bug the memory flags. Prefer a `@testing-library/vue` render +
  `getByRole("tab")` query.
- reka `TabsTrigger` ships default styling; the dock must reskin via the `.dock-layer-tab` class
  passthrough (`dock-a11y-07`). Verify the dock-token sizes (`--dock-layer-tab-size`,
  `--dock-control-size`) still cascade through the reka trigger (the density `[data-density]` cascade
  from `GlassDock` reaches `.dock-layer-tab`).
- Single-layer docks render NO rail (`v-if="showRail && layers.length > 1"`); preserve that guard so a
  one-layer group does not paint an empty Tabs root.

---

## Step 5 — `proof:dock-motion-single-source` (the perceptual settle probe)

### Files
- `scripts/proof-dock-motion-single-source.mjs` (NEW, Playwright settle probe).
- `package.json` `scripts` (add `"proof:dock-motion-single-source"`).
- `scripts/gates.mjs` (add the manifest entry; tag `local` initially, escalate to `ci` once the
  Playwright harness is wired in CI — born-RED, see below).
- `scripts/gates.mjs:44` (the `proof:dock-opacity-lockstep` note — demote to "syntactic").

### The change
**5a — the probe.** A Playwright script that mounts a demo dock (the
`demo/stories/compositions/dock-with-slider.vue` story or a minimal harness), collapses it, and
rAF-samples `getComputedStyle` every frame:
- Record the frame where the container width stops changing (the morph settle frame).
- Record the frame where a child layer's `opacity` first reads ≤ 0.01 (the fade settle frame, on
  collapse).
- **Assert `|width-stop-frame − opacity-stop-frame| ≤ 1`** (±1 frame, ~16ms — accounts for rAF
  jitter). Run on collapse AND expand (opacity≥0.99 on expand).
- Force the FLIP fallback (the live iOS path): launch with VT disabled, or run the probe in a context
  where `document.startViewTransition` is undefined (the probe should delete it before the swap so the
  FLIP path is exercised — that is the path the §2 fix targets).

This is the PERCEPTUAL sibling of the SYNTACTIC `proof:dock-opacity-lockstep` (a string-match that
both CSS rules name `--dock-motion-resize` — it cannot see frame-origin skew, which is the whole bug).

**5b — born-RED + manifest.** The gate is born-RED at W8: before Step 1+3 land it fails (the
async-fork diverges the frames). After the fix it greens. Add the script entry to `package.json` and
a `gates.mjs` row:
```js
{ id: "proof:dock-motion-single-source", cmd: "proof:dock-motion-single-source",
  tags: ["local"], note: "AU.W8 — PERCEPTUAL dock-motion lockstep: FLIP-fallback collapse/expand, width-stop frame ↔ child-opacity≤0.01 frame within ±1 frame (the frame-origin sibling of the syntactic proof:dock-opacity-lockstep)" },
```
Tag `local` (not `ci`) if the CI runner lacks a headed browser; document the CI-deferral in
`AU.FINAL` like `proof:webgl-golden`. If Playwright is already in CI (check `scripts/gates.mjs` tags
for an existing Playwright gate), tag `ci`.

**5c — demote the syntactic gate's note.** Edit `gates.mjs:44` note to mark
`proof:dock-opacity-lockstep` as the SYNTACTIC token-match, superseded perceptually by
`proof:dock-motion-single-source`. Keep the syntactic gate (it is a cheap fast guard); do not delete.

### Gate (this IS a gate)
Bite-check: re-injecting the async fork (move the swap back to the synchronous `:146-147`) makes the
width-stop and opacity-stop frames diverge by >1 frame → RED. The ±1-frame tolerance IS the
measurable felt-target.

### Risk
- Playwright settle sampling is jitter-prone; the ±1-frame tolerance is the designed slack. Sample
  ≥3 collapse/expand cycles and assert the worst-case stays ≤1 frame.
- If CI has no headed browser, the gate runs `local` + release-machine only; cite the deferral in
  FINAL. Do NOT make a flaky CI gate block the publish — local + release is the binding tier.

---

## Step 6 — `<Role>Dock` README vocabulary + `proof:dock-vocabulary`

### Files
- `src/components/custom/dock/README.md` (ALREADY authored, untracked — `git status` shows `??`).
- `scripts/proof-dock-vocabulary.mjs` (ALREADY authored, untracked — `??`).
- `package.json` `scripts` (add `"proof:dock-vocabulary"`).
- `scripts/gates.mjs` (add the manifest entry).

### The change
The README and the gate script are already on disk (untracked) and the README already satisfies the
gate's assertions: the four roles (`ChromeDock`, `TransportDock`, `CanvasDock`, `ToolDock`), the base
primitives (`GlassDock`, `DockIconButton`), the canonical composables (`useDockState`,
`useLayerTransition`, `useDockContext`), and the two re-groundings (`useTouchGate` stays general;
`DockTabButton` is kept). The ONLY remaining step is REGISTRATION:

**6a — `package.json`:**
```json
"proof:dock-vocabulary": "node scripts/proof-dock-vocabulary.mjs",
```

**6b — `gates.mjs`:**
```js
{ id: "proof:dock-vocabulary", cmd: "proof:dock-vocabulary", tags: ["local", "ci"],
  note: "AU.W8 — the <Role>Dock README convention (ASK-7, re-grounded): four role names + base primitives + canonical useDock* composables + the useTouchGate/DockTabButton re-groundings" },
```

The gate asserts (verified by reading the script): four `ROLES`, three `COMPOSABLES`, two `BASE`
present in the README, plus the two re-grounding sentences. It is GREEN against the current README at
HEAD (the README was authored to satisfy it). The re-grounding is intentional: the fourier CHARTER's
`useTouchGate→useDockTouchGate` rename and `DockTabButton` retire were STALE against HEAD; the gate
asserts the README RECORDS those re-groundings rather than executing the stale renames.

### Gate
`proof:dock-vocabulary` — bite-check (already coded): deleting a role name from the README reddens it.

### Risk
- The README + script are untracked; the commit must `git add` them (orchestrator owns the index — the
  IMPL agent does NOT stage). Note this for the orchestrator in the wave's commit.
- No `<Role>Dock` COMPONENT ships (substrate-with-consumer: the role-typed base waits for a 2nd
  consumer, keyframes D.W5). The README is the vocabulary source of truth; the component is BOOK.

---

## §2 — Anchor positioning for dock popovers (W8, P1 — light fold)

AU-AUGMENT §2.4 lists native `anchor()` for dock popovers as ADOPT (W8, P1), `@supports`-gated. This
is the one non-motion W8 item. If the dock popover positioning currently relies on floating-ui CSS
overrides, add an `@supports (anchor-name: --x)` block that uses `anchor()` for the dock-hosted
popover and leaves the floating-ui path as the un-`@supports` fallback. **Scope guard:** this is P1 —
if it risks the atomic motion+a11y+vocab commit, DEFER it to W8b (the modern-CSS fold). The headline
gates (motion-single-source, a11y-contract, vocabulary) do NOT depend on it. Recommend: land it in
W8b unless the popover anchor is trivially `@supports`-gated with zero behavior change.

---

## §3 — Gate matrix (this wave)

| gate | kind | greens when | bite-check |
|---|---|---|---|
| `proof:dock-motion-single-source` | Playwright (NEW, born-RED) | Step 1+3 land (FLIP swap+width co-settle ±1 frame) | re-inject sync swap → RED |
| `proof:dock-a11y-contract` | vitest (NEW, born-RED) | Step 4 lands (Tabs rail + roving tabindex + keep-open) | revert to `aria-pressed` / drop keep-open → RED |
| `proof:dock-vocabulary` | static README grep (authored) | Step 6 registers the script | delete a role name → RED |
| `proof:dock-motion-parity` | static CSS grep (RE-PINNED) | Step 2 routes `--dock-resize-spring`→`--spring-dock` | route back to `--spring-snappy` → RED |
| `proof:dock-opacity-lockstep` | static token-match (KEPT, demoted note) | unchanged (still names `--dock-motion-resize`) | — (syntactic; superseded perceptually) |
| `proof:vueuse-free-root` | source+dist graph (KEPT) | Step 3 driver stays LIGHT-surface | a `loadAnimationEngine`/value.js edge → RED |
| `proof:strict-templates` | vue-tsc (KEPT) | the reka `Tabs` bindings are well-typed | a bogus prop on `<TabsTrigger>` → RED typecheck |

---

## §4 — Risks (consolidated) + the LOAD-BEARING do-not-touch list

1. **The visibility-semantic fork is LOAD-BEARING** (`dock.css:428` deferred vs `:449` immediate).
   Do NOT collapse it. Active paints at once; leaving stays hit-testable through the fade. Any
   `@starting-style` rewrite (W8b) PRESERVES the 3-state (active/inactive/leaving) contract.
2. **`--dock-press-spring` must NEVER fold into the resize family** (`tokens.css:1275`). Press
   feedback is transform-only (`scale`/`rotate`); it must not touch surface fades. Step 2 leaves it
   untouched.
3. **The `transitionId`/`morphGeneration` generation guards are load-bearing** for A→B→A no-skip.
   Step 1 keeps `transitionId` (`useLayerTransition.ts`); `morphGeneration` (`GlassDock.vue:154`) is
   untouched. The parity gate's GUARD check asserts `morphGeneration` survives.
4. **keyframes.js is READ-ONLY (inv-16).** The dock consumes the published LIGHT surface only. No
   keyframes.js edit. Use `SpringProgress` directly (NOT `AnimationGroup`, which is HEAVY-side).
5. **The Step 1 same-tick measure-after-swap read** may need an inner `await nextTick()`. Gate on the
   probe; prefer the no-extra-tick form first.
6. **Token-driver param drift.** The Step 3 driver `(0.5, 0.5)` MUST mirror the `--spring-dock`
   PRESETS entry. Co-locate a single `DOCK_SPRING` const or cross-link the two so a retune touches both.
7. **reka binding silent-no-op** (memory: glass-ui-binding-verification). The a11y test asserts
   RENDERED roles/attrs, not just mount success.
8. **Stale §2 docstring** (`tokens.css:144-148`) mislabels ζ values; Step 2b corrects it (isomorphic).

---

## §5 — DONE / DEFERRED boundary (W8 vs W8b)

**W8 (this wave, the publish-blocking contract):** Steps 1–6 — single-frame FLIP sync, `--spring-dock`
author+route, LIGHT one-rAF driver, reka Tabs rail + travelling indicator + a11y, the settle probe,
the vocabulary README+gate. (P1 anchor-positioning: land if trivial, else W8b.)

**W8b (the modern-CSS + hygiene fold, NON-blocking):** `interpolate-size: allow-keywords` +
`calc-size(auto)` on `.dock-layers` (eliminates the JS measure/pin dance — once native, Step 1's
measure block can retire); `@starting-style` + `transition-behavior: allow-discrete` on `.dock-layer`
(folds the visibility fork into one discrete-animated property, preserving the 3-state contract); CSS
nesting; `dock.css` → `dock.css`/`dock-controls.css` split; the 12-site non-idiomatic Tailwind lift;
`defineModel` ×8; context `Readonly<>` guards on `currentLayerId`/`leavingLayerId`
(`dockLayerContext.ts:23-24`, wrap at provide in `DockLayerGroup.vue:82-83`); `-webkit-*` cleanup.
None of these block 3.3.0.
