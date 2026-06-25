# BD.W-VIZ-KEYBOARD — `useVizKeyboard` over `/keyboard`: the focus-guarded per-viz DATA-keymap leaf (the ONE genuine new framework wave; per-viz keymaps DIFFER by the viz's DATA axes — concentric has NO focal axis, so its keymap is all global scalars)

**Band 12 (V frameworks) · depends: NONE (the `/keyboard` registry already SHIPS — `useKeyboardShortcuts`/`registerShortcut`).** The ONE genuine NEW framework wave the V-roster names (`UNIFIED-ROSTER.md:153` — "`useVizKeyboard` over `/keyboard`; per-viz DATA keymap (NOT an aurora keymap projected). Composed DIRECTLY by each viz (no `useVizInteraction` wrapper)"). It mints `useVizKeyboard` — a thin FOCUS-GUARDED wrapper over the shipped `/keyboard` registry that each viz composes DIRECTLY with its OWN DATA keymap. The substance is AUTHORING the per-viz keymaps (the wrapper is thin); the keymaps DIFFER because the vizzes' interactive DATA differs — concentric has NO focal element (all global scalars), so its keymap maps global scalars, while constellation has a first-class `focalIndex` and fourier has a `head_t`/stroke transport (`PASSD-FOLD §Batch-3 W-VIZ-KEYBOARD — necessity REAL`).

> **Status:** SPEC (tranche-dev — this file is the PLAN; the `src/` edit is the gated build). Grounded against HEAD `src/composables/keyboard/useKeyboardShortcuts.ts` (the SHIPPED registry — `useKeyboardShortcuts`/`registerShortcut`/`formatCombo`/`ShortcutCombo`/`RegisteredShortcut`; the dispatch is a `createGlobalState` `window` keydown/keyup listener at `:218-222` — GLOBAL, so a viz keymap needs a FOCUS-GUARD or every viz's keys fire everywhere), `src/composables/keyboard/index.ts` (the `/keyboard` barrel — vueuse-BEARING, so `useVizKeyboard` ships there, NEVER the root barrel), the ZERO-viz-keyboard-handler census (`grep -rlnE 'onKeydown|keydown|ArrowUp|KeyboardEvent'` over the 7 viz dirs → 0 hits — no viz is keyboard-reachable at HEAD), `concentric/constants.ts:40-66` (`ConcentricConfig` — centers/ringComponents/axisRatio/speed/lineWidth/lineSoftness/renderMode/contourLevels/beatDetune/interactive — ALL GLOBAL SCALARS, NO focal-element axis), `constellation/constellationTypes.ts:255-262` (the first-class `focalIndex` axis — constellation HAS a focal element a keymap navigates), `PASSD-FOLD §Batch-3 W-VIZ-KEYBOARD — necessity REAL (0 viz keyboard handlers across 7 viz dirs; concentric has no focal axis — all global scalars; the substance is authoring per-viz keymaps, not the wrapper)`.

## The defect / the ask — the ONE genuine new framework wave (necessity REAL, the per-viz keymaps DIFFER)

`PASSD-FOLD §Batch-3` confirmed, against HEAD: **"W-VIZ-KEYBOARD — necessity REAL (0 viz keyboard handlers across 7 viz dirs), but the per-viz DATA keymaps are UN-BUILT (concentric has no focal axis — all global scalars `concentric.vue:130-166`); the substance is authoring per-viz keymaps, not the wrapper."** The exact code-traced reality:

1. **ZERO viz is keyboard-reachable at HEAD (the necessity).** A grep for keyboard handlers across the 7 viz dirs (concentric · fourier-field · constellation · dot-matrix · dot-flow-field · goo-blob · goo-dot-matrix) finds NONE. Every viz is pointer-only — a keyboard user cannot drive ANY of them (an a11y gap across the whole procedural suite). The interactions exist (the pointer scrub, the warp click, the parallax) but have no keyboard path.

2. **The `/keyboard` registry ships, but it is GLOBAL-window (the wrapper's load-bearing concern).** `useKeyboardShortcuts`/`registerShortcut` (`useKeyboardShortcuts.ts:218-222`) dispatch off a `createGlobalState` `window` keydown listener — a registered shortcut fires NO MATTER where focus is. A viz keymap registered raw would steal keys globally (every viz's `Space` would conflict, a digit-key would fire while a form is focused). So `useVizKeyboard` MUST add a FOCUS-GUARD: the keymap is ACTIVE only when the viz host is focused/hovered (the `enabled`-when-active gate the wrapper owns) — the substance the bare registry lacks.

3. **The per-viz keymaps DIFFER by the viz's DATA axes (the un-built substance — the §concentric finding).** A keymap is not generic — it maps the viz's OWN interactive axes:
   - **concentric has NO focal element — all GLOBAL SCALARS** (`ConcentricConfig` — speed/lineWidth/contourLevels/familyCount/beatDetune/axisRatio, `constants.ts:40-66`). Its keymap maps global scalars (`↑`/`↓` adjust the active scalar, `Tab` cycles WHICH scalar is active — there is no focal NODE to navigate, only global knobs). An aurora/constellation keymap projected onto concentric would name a focal axis concentric does not have (the §concentric "concentric has no focal axis — all global scalars; not an aurora keymap projected" discipline).
   - **constellation HAS a first-class `focalIndex`** (`constellationTypes.ts:255-262`) — its keymap navigates the focal node (`Tab` walks the focal designation — W-CONSTELLATION-STUDIO's keymap).
   - **fourier HAS a `head_t`/stroke transport** — its keymap is a transport (scrub/play/clear — W-FOURIER-INTERACT's keymap).
   - **aurora HAS a `uCursor`/medium axis** — its keymap is cursor-swirl + medium-cycle (W-AUR-INTERACT's keymap).
   The keymap is the viz's DATA; the wrapper is the shared focus-guard + registry composition.

The ask: mint `useVizKeyboard` (the focus-guarded wrapper over `/keyboard`); author the per-viz DATA keymaps (each viz composes it DIRECTLY with its OWN keymap — concentric's all-global-scalar keymap is the proof the keymaps DIFFER, never a projected aurora keymap); NO `useVizInteraction` wrapper (the CUT primitive).

## The mechanism

ONE thin focus-guarded wrapper (`useVizKeyboard`) over the shipped `/keyboard` registry + the per-viz DATA keymaps (each viz's own). The wrapper owns the focus-guard + the registry composition; the keymaps are the per-viz DATA (concentric's global-scalar map is authored here as the leaf's reference + proof-of-difference; the focal/transport keymaps land in their viz waves, composing this leaf).

### 1. `useVizKeyboard(hostRef, keymap, ctx, options?)` — the focus-guarded wrapper (the new leaf, `/keyboard`)

A new composable `src/composables/keyboard/useVizKeyboard.ts` (the `/keyboard` subpath — vueuse-BEARING via `registerShortcut`'s window listener, so OFF the root barrel; the keyboard-registry SCC-trap discipline). It COMPOSES the shipped registry (NO second keyboard engine — `registerShortcut`/`useKeyboardShortcuts` is the ONE dispatch; the wrapper adds the focus-guard + the keymap-iteration):

- **`hostRef: Ref<HTMLElement | null>`** — the viz host the keymap is scoped to.
- **`keymap: VizKeymap`** — an ARRAY of `{ combo, handler, label, group }` rows (the viz's DATA — the per-viz keymap; `combo` is the `/keyboard` `ShortcutCombo` form, `handler(ctx, e)` reads the viz's `ctx`).
- **`ctx`** — the viz's interactive handles (the config refs / the renderer handle / the focal field — whatever the keymap's handlers read; typed per viz).
- **The FOCUS-GUARD (the load-bearing concern — §2).** Each keymap row is registered via `registerShortcut` BUT gated: the handler runs ONLY when the viz host is FOCUSED (or hover-active — the `hostRef` is `:focus-within`/`:hover` or the document.activeElement is inside it). The wrapper tracks the host's focus/hover state (a `useEventListener` `focusin`/`focusout`/`pointerenter`/`pointerleave` on the host — NO new rAF, NO new registry) and the registered handlers short-circuit when the host is not active. So a viz `Space` NEVER fires while a form is focused or another viz is hovered — the global-registry's global-dispatch is scoped to the active viz (the §2 focus-steal fix). The host is made focusable (`tabindex="0"` if absent) so a keyboard user can `Tab` TO the viz then drive it.
- **PRM:** the keymap STILL functions under `prefers-reduced-motion: reduce` (keyboard control is a deliberate gesture, not ambient motion — a keyboard user must still drive the viz); the viz's OWN PRM gating (the renderer's `respectReducedMotion`) owns the motion drop. The wrapper does NOT gate the keymap on PRM (a PRM-gated keymap would lock out keyboard users — wrong).
- The wrapper exposes `{ shortcuts, dispose }` (the registered rows for a help-modal + the cleanup); it cleans up on `onScopeDispose` (un-registers the shortcuts + removes the focus listeners).

### 2. The concentric DATA keymap — all GLOBAL SCALARS (the proof-of-difference, authored as the leaf's reference)

concentric has NO focal element, so `CONCENTRIC_KEYMAP` (the wave's DATA — authored HERE because concentric is the §concentric reference case that proves the keymaps differ) maps GLOBAL scalars, NOT a focal axis:

- `Tab`/`Shift+Tab` → cycle WHICH global scalar is "active" (speed → lineWidth → contourLevels → familyCount → beatDetune → back; the active scalar is the keyboard's current target); `↑`/`↓` (or `+`/`-`) → increment/decrement the ACTIVE scalar; `Space` → toggle play/pause (the renderer clock); `R` → reset to the preset defaults. There is NO `Tab`-walks-FOCAL (concentric has no focal node) — `Tab` cycles WHICH global knob, the structural difference from constellation's `Tab`-walks-focal. This keymap is the §concentric proof: a generic/aurora keymap projected onto concentric would name a focal axis that does not exist; the concentric keymap maps ONLY the global scalars `ConcentricConfig` declares.

The concentric demo (`concentric.vue`) composes `useVizKeyboard(hostRef, CONCENTRIC_KEYMAP, { config, handle })` DIRECTLY (the leaf's first consumer + the proof-of-difference reference).

### 3. The per-viz keymaps land in their viz waves (the DIRECTLY-composed discipline)

The OTHER per-viz keymaps are authored in their viz waves, each composing THIS leaf DIRECTLY (NO `useVizInteraction` wrapper — the CUT primitive): `CONSTELLATION_KEYMAP` (focal-node navigation — W-CONSTELLATION-STUDIO), `FOURIER_KEYMAP` (transport scrub/play/clear — W-FOURIER-INTERACT), `AURORA_KEYMAP` (cursor-swirl + medium-cycle — W-AUR-INTERACT). Each keymap is the viz's DATA; the difference (focal vs transport vs global-scalar vs cursor) is the §concentric "per-viz DATA keymap, not an aurora keymap projected" discipline made structural. The ≥2-consumer bar for `useVizKeyboard` is met by construction (concentric + constellation + fourier + aurora = ≥4 binary consumers).

## The gate — `proof:viz-keyboard` (born-RED → GREEN; RUNTIME-CALL-SITE + focus-guard + per-viz-DATA-difference, never a doc-keyword presence)

`scripts/proof-viz-keyboard.mjs`, `tags: ["local","ci"]` (the source-structure + call-site arm; the binding PAINT is the π + the gestalt row). The detector comment-strips first and exports a pure detector for the self-test bites.

**THE LOAD-BEARING DESIGN PRINCIPLE: the gate asserts `useVizKeyboard` COMPOSES the shipped `/keyboard` registry (a real `registerShortcut`/`useKeyboardShortcuts` call — no second keyboard engine), the FOCUS-GUARD is wired (a real focus/hover-active gate — the global-registry-steal fix), and the per-viz keymaps DIFFER by DATA (concentric's keymap has NO focal-axis reference — the proof the keymaps are not projected) — NOT a doc-keyword match, NEVER a name-presence of `useVizKeyboard`.**

- **K1 — `useVizKeyboard` exists ONCE on `/keyboard` + COMPOSES the shipped registry (no second engine).** `src/composables/keyboard/useVizKeyboard.ts` exports `useVizKeyboard(hostRef, keymap, ctx, opts?)`, is published on the `/keyboard` barrel (`index.ts`), and calls `registerShortcut(`/`useKeyboardShortcuts(` (the SHIPPED registry — a hand-rolled `window.addEventListener("keydown"` / a second dispatch loop INSIDE `useVizKeyboard.ts` REDs, the no-second-engine fence). It is OFF the root barrel (vueuse-bearing — a root-barrel re-export REDs the SCC-trap fence). `facts.k1Composes` records the `registerShortcut` call + the barrel publication.
- **K2 — the FOCUS-GUARD is WIRED (the global-registry-steal fix).** `useVizKeyboard.ts` carries a host-focus/hover-active gate: a `useEventListener`/`addEventListener` on `focusin`/`focusout`/`pointerenter`/`pointerleave` (or a `:focus-within`/activeElement check) that short-circuits the keymap handlers when the host is NOT active (the §2 fix — a viz `Space` must not fire while a form is focused). A `useVizKeyboard` that registers shortcuts GLOBALLY with no focus-guard REDs (the focus-steal bite). The host is made focusable (`tabindex` set if absent — a keyboard user can reach it). `facts.k2FocusGuard` records the focus-gate.
- **K3 — the per-viz keymaps DIFFER by DATA (concentric has NO focal axis — the §concentric proof).** The detector asserts (a) `CONCENTRIC_KEYMAP` maps GLOBAL SCALARS (its handlers read `config.speed`/`config.lineWidth`/`config.contourLevels`/… — the `ConcentricConfig` global axes) and carries NO focal-node reference (no `focalIndex`/`setWarpTarget`/`warpTo` — concentric has no focal element; a concentric keymap referencing a focal axis REDs, the projected-keymap bite), AND (b) the constellation keymap (W-CONSTELLATION-STUDIO) DOES reference `focalIndex` (the focal axis it has) — so the two keymaps are PROVABLY different by DATA, not one projected onto the other. `facts.k3KeymapDiff` records the concentric-global-scalars + the constellation-focal-axis difference.
- **K4 — each viz composes `useVizKeyboard` DIRECTLY (no `useVizInteraction` wrapper, ≥2 consumers).** The detector asserts ≥2 viz demos/SFCs carry a `useVizKeyboard(` call-expression (concentric + ≥1 more — the ≥2-binary-consumer bar, J-inv-10) AND NONE carries a `useVizInteraction(` wrapper (the CUT primitive — `VIZ-FINAL-ROSTER §CUT`; a `useVizInteraction` REDs). `facts.k4Consumers` records the ≥2 call-sites + the absence of the wrapper.
- **K5 — the keymap is NOT PRM-gated (the a11y floor — keyboard control survives reduce).** `useVizKeyboard` does NOT gate the keymap registration on `prefers-reduced-motion` (a PRM-gated keymap locks out keyboard users — wrong; the viz's OWN PRM gating owns the motion drop, not the keymap). A `useVizKeyboard` that disables the keymap under PRM REDs (the keyboard-a11y bite). `facts.k5NotPrmGated` records the absence of a PRM gate on the keymap.

**Self-test bites (each planted defect MUST red — runtime-call-site discipline, NO presence-regex bites):**
- (a) a `useVizKeyboard` with a hand-rolled `window.addEventListener("keydown"` (a second dispatch) → K1 RED (the no-second-engine bite).
- (b) a `useVizKeyboard` re-exported on the root barrel → K1 RED (the SCC-trap bite).
- (c) a `useVizKeyboard` registering shortcuts globally with no focus-guard → K2 RED (the focus-steal bite).
- (d) a `CONCENTRIC_KEYMAP` referencing a focal axis (`focalIndex`/`warpTo`) → K3 RED (the projected-keymap bite — concentric has no focal element).
- (e) a `useVizInteraction(` wrapper → K4 RED (the CUT-primitive bite).
- (f) only 1 viz composing `useVizKeyboard` → K4 RED (the ≥2-consumer bite).
- (g) a `useVizKeyboard` disabling the keymap under PRM → K5 RED (the keyboard-a11y bite).

**What reds on the pre-wave tree (born-RED by construction):** K1 (`useVizKeyboard.ts` does not exist), K2 (no focus-guard exists), K3 (no `CONCENTRIC_KEYMAP` exists — 0 viz keyboard handlers), K4 (0 `useVizKeyboard` call-sites). GREEN only after the wrapper + the focus-guard + the concentric DATA keymap + the ≥2 viz consumers land.

## The binding π — `tests-visual/viz-keyboard.spec.ts`

The painted-truth readback, BOTH modes (light + dark), over the concentric (+ ≥1 other) viz routes, served at `:5199`, NEVER `reducedMotion` except the explicit PRM-keyboard arm. (NOT a webkit-critical wave — the keyboard dispatch is engine-agnostic; the viz still paints on its substrate.)

- **THE KEYBOARD DRIVES THE VIZ (the necessity made visual).** `Tab` to the concentric host (it is focusable), then `Tab` cycles the active scalar + `↑`/`↓` adjusts it (the rings change speed/width live — keyboard-driven); `Space` toggles play/pause. The viz responds to the keyboard with NO pointer.
- **THE FOCUS-GUARD (the steal fix made visual).** With focus in a SIBLING form / on another viz, the concentric keymap keys do NOT fire (the global-registry steal is scoped); focus returns to the concentric host and the keys drive it again.
- **THE PER-VIZ DIFFERENCE (the §concentric proof made visual).** concentric's `Tab` cycles a GLOBAL SCALAR (no focal node moves — concentric has no focal element); constellation's `Tab` walks the FOCAL designation (a focal mark steps around the field — the SAME `Tab` key, a DIFFERENT DATA axis, proving the keymaps differ).
- **PRM keyboard survives:** under `prefers-reduced-motion: reduce`, the keyboard STILL drives the viz (the keymap is not PRM-gated — the viz's motion drops, but the keyboard control survives; a keyboard user is not locked out).

## The gestalt row

**Union-roster surface: `viz-keyboard` (the keyboard-reachable procedural suite).** The verdict requirement: a FRESH whole-page both-mode `:5199` capture, NEVER `reducedMotion`, surface-hash freshness floor. The gestalt judgement: the vizzes are keyboard-DRIVABLE — `Tab` reaches a viz and the arrows/Space drive its OWN axes (global scalars for concentric, the focal node for constellation), the focus-guard scoping each viz's keys to when it is active. Born-FAIL on HEAD (0 viz keyboard handlers — every viz is pointer-only). GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels. Wired into the union roster by W-GESTALT-WIRE. (The keyboard is also an a11y win — the binding readback is the per-viz π + the focus-guard, not only a gestalt judgement.)

## Fences

- **The wrapper is THIN — the SUBSTANCE is the per-viz DATA keymaps (the §concentric discipline).** `useVizKeyboard` is a focus-guarded composition over the shipped registry; the value is the per-viz keymaps (concentric's global-scalar, constellation's focal, fourier's transport — each the viz's DATA). The keymaps DIFFER (K3) — never one projected onto another.
- **concentric has NO focal axis — its keymap is all global scalars (the §concentric proof).** A focal-axis reference in `CONCENTRIC_KEYMAP` REDs (K3) — concentric has no focal element; its `Tab` cycles WHICH global knob, the structural difference from constellation's `Tab`-walks-focal.
- **The FOCUS-GUARD is mandatory (the global-registry-steal fix).** The shipped registry is GLOBAL-window; `useVizKeyboard` scopes the keymap to the active viz (K2) — a viz `Space` never steals from a focused form.
- **NO second keyboard engine (the no-fork fence).** `useVizKeyboard` COMPOSES `registerShortcut`/`useKeyboardShortcuts` (K1) — a hand-rolled `window.addEventListener("keydown"` REDs.
- **OFF the root barrel (the SCC-trap fence).** `useVizKeyboard` is vueuse-bearing (via the registry's window listener) → `/keyboard` ONLY, never the root barrel (K1).
- **Composed DIRECTLY by each viz — NO `useVizInteraction` wrapper (the CUT primitive).** Each viz composes `useVizKeyboard` with its OWN keymap (K4); `useVizInteraction` is the CUT 3-line bag.
- **NOT PRM-gated (the keyboard-a11y floor).** The keymap survives `prefers-reduced-motion: reduce` (K5) — a keyboard user is never locked out; the viz's motion drops, the control does not.

## Disposition links

- **`UNIFIED-ROSTER.md:153` (W-VIZ-KEYBOARD [V-NEW] — "the ONE genuine new framework wave; `useVizKeyboard` over `/keyboard`; per-viz DATA keymap (NOT an aurora keymap projected). Composed DIRECTLY by each viz (no `useVizInteraction` wrapper)")** → BUILT (the spec; the build user-gated). CLOSED at the spec level.
- **`PASSD-FOLD §Batch-3 W-VIZ-KEYBOARD — necessity REAL` (0 viz keyboard handlers across 7 viz dirs; the per-viz DATA keymaps are UN-BUILT; concentric has no focal axis — all global scalars; the substance is authoring per-viz keymaps, not the wrapper)** → the necessity (§1, 0 handlers), the focus-guard (§1.2/K2), the concentric global-scalar keymap (§2/K3 — the proof-of-difference). CLOSED.
- **`PASSD-FOLD §Per-viz amendments — W-AUR-INTERACT / W-FOURIER-INTERACT / W-CONSTELLATION-STUDIO` (each composes W-VIZ-KEYBOARD + the shipped pointer field DIRECTLY, never the cut `useVizInteraction`)** → the per-viz keymaps land in their viz waves composing THIS leaf (§3, K4 the ≥2-consumer bar). CLOSED for the leaf; the per-viz keymaps ride their waves.
- **`viz/VIZ-FINAL-ROSTER.md §Band 12` (`useVizKeyboard` over `/keyboard`; per-viz DATA keymap; composed DIRECTLY; no `useVizInteraction`)** → BUILT. CLOSED.
- **DEPENDS: NONE** (the `/keyboard` registry already ships; this is a wrapper over it).
- **CONSUMED BY: `W-FOURIER-INTERACT` (transport keymap) · `W-CONSTELLATION-STUDIO` (focal keymap) · `W-AUR-INTERACT` (cursor/medium keymap)** — each composes this leaf DIRECTLY with its own DATA keymap. Forward.
