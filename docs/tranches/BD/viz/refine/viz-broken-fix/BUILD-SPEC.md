# BUILD-SPEC — W-VIZ-BROKEN-FIX

**Wave.** `docs/tranches/BD/union/waves/W-VIZ-BROKEN-FIX.md`
**Defect source.** USER-FEEDBACK 2026-06-23 BATCH 2 group C (`/substrates/{blob,goo-dot,fourier-field}`).
**Research synthesis.** `research-root-cause.md` + `research-target.md` + `research-mechanism.md` (all three live-diagnosed on a real Metal-3 Chrome at dpr 2; convergent).

**North star.** `design.md` + the iOS-27 Liquid-Glass six-layer optical composite (backdrop blur+saturate · warm tint · edge rim · inner catch-light · drop shadow · grain) + glass+PAPER morphism + `BA.W-NO-GRAY` (the procedural field is warm MATERIAL at OKLab hue 62-75°, NEVER gray) + `W-DARK-MATERIAL` (luminous-dark transmissive) + `[[feedback-liquid-weight-universal]]` (inertia / weight / bounce / squish on ALL motion). NO legacy / no aliases / no workarounds; idiomatic (compose the shipped primitives, no second engine, no parallel rAF); compositor-only; PRM-carved; Safari-compatible (the WebGL2 net is the cross-browser floor, the WGSL primary where supported, both arms reach parity).

---

## 0 — The defect map (what is actually wrong, root-caused live)

| # | Surface | Verbatim user defect | ROOT CAUSE (confirmed in source) | Fix class |
|---|---------|----------------------|----------------------------------|-----------|
| D1 | fourier-field | "These options do not even work" | `useFourierField` captures `const { config } = options` ONCE at setup; `FourierField.vue` passes `config: cfg.value` (a `computed` SPREAD that flattens reactive getters into static primitives, read `.value` once). The per-frame setups read `config.harmonics`/`.intensity`/… from the frozen snapshot. | dead-config (reactive-wiring) |
| D2 | goo-dot | "totally broken" (config) | Same class — `useGooDotMatrix` captures `const { config } = options` + `const field = config.field` ONCE; the story passes `:config="liveConfig"` where `liveConfig = computed(() => ({ ...config }))` mints a FRESH object each compute, so the captured reference is forever stale. The variant/interactive toggles never reach the renderer. | dead-config (reactive-wiring) |
| D3 | blob + goo-dot | "broken TOTALLY" / "totally broken" (render, Safari) | WebGPU is NEVER selected on a slow-cold-acquire host: `requestDevice()` ≈ 3478ms > `WEBGPU_ACQUIRE_TIMEOUT_MS` (2500ms) → FIX-5 falls to WebGL2. Chrome renders OK on the fallback; the **WebGPU-primary path (Safari 26 native Metal) is the un-exercised surface** the "broken" reports name — masked here by the always-winning fallback. | substrate (timeout + device-warm + WGSL parity) |
| D4 | blob (watercolor ghost) | "the dashed outline does not follow the proper path" | `WatercolorDot.vue` ghost = a hardcoded `<ellipse rx=46 ry=46>` CIRCLE + random `feDisplacementMap` noise — NEVER reads `blob.borderRadius` (the seeded 8-value superellipse the solid dot fills). Two generators → the ghost is a noise-jittered circle, geometrically disconnected from the silhouette. `preserveAspectRatio="none"` makes it worse (anisotropic displacement). | geometry (one shape source) |
| D6 | fourier-field | "does not follow the cursor properly" | `onFrame` maps `headT = pointer.smoothedPosition.x % 1` — pointer-X SCRUBS the loop PHASE (the comet traces its fixed orbit at that phase), Y ignored, `positionLerp 0.22` adds lag. A 1-D time-scrub reads as "not following" a 2-D cursor. | interaction (2-D follow + weighted scrub) |

**D5 — the hero title sticky-scroll-on-every-page ("the hero text should NOT scroll like this on every page") FOLDS into `W-STICKY-TITLE-CONDENSE`.** It is NOT a viz fix — but the demo chassis `story-hero.css` lift is small + self-contained, and the user named it in the SAME breath as the blob defect, so this wave carries the GENTLE-CONDENSE recipe move (research-mechanism §4) as a recorded rider (`D5` below). The full W-STICKY-TITLE-CONDENSE behaviour (subpath chip persistence, the iOS large-title collapse choreography) remains that wave's; this rider only softens the half-zoom + reserves the height so it stops overlapping the body.

**The shared substrate canvas-resize hang (FIX-5 — the `createCanvasLifecycle` reveal-remeasure + the WebGPU acquire-timeout) HOLDS and is OUT OF SCOPE.** It is the reason blob/goo-dot render at all (on WebGL2) in Chrome; the live trace confirms it fires correctly (every canvas backing is correctly sized — blob 1536²/1126², goo-dot 2066×920, fourier 1246×1042; zero shader/WebGPU console errors). This wave does NOT duplicate it — it ADDRESSES the second-order consequence (D3: the timeout is too tight, so the WGSL path is never exercised, masking a possible WGSL bug on Safari).

---

## D1 + D2 — dead config: the renderer must read the LIVE config, not a frozen snapshot

### The reference (the SHIPPED correct pattern — copy it, no new mechanism)
`GooBlob.vue` does this RIGHT (`src/components/custom/goo-blob/GooBlob.vue:88-99`):
```ts
const liveConfig = (): BlobConfig => config ?? injectedConfig ?? cfg!;
// renderConfig — a thin Proxy whose get forwards through to the LIVE (reactive) cfg,
// so the renderer closes over ONE config object and reads live values per-frame.
const renderConfig: BlobConfig = new Proxy(cfg!, {
    get(target, key, receiver) {
        if (key === "variant" && variant != null) return variant;
        return Reflect.get(target, key, receiver);
    },
});
// ... config: renderConfig    (the renderer reads renderConfig.<key> per-frame, live)
```
The renderer's per-frame closure reads `renderConfig.<key>` and the Proxy `get` forwards to the live reactive `cfg`, so a config mutation reaches the loop with NO re-feed wiring. This is the no-fork, no-second-state, compositor-only idiom. **Transplant it to fourier + goo-dot.**

### D1 — `FourierField.vue` + `useFourierField.ts`

**File `src/components/custom/fourier-field/FourierField.vue`** (line 142-147 today):
```ts
// BEFORE
const renderer = useFourierField(canvasRef, {
    config: cfg.value,            // ← .value spread snapshot, read ONCE
    getSpectrum,
    getPalette,
    freeze: () => props.freeze,
});
```
```ts
// AFTER — pass a LIVE config getter (the GooBlob renderConfig Proxy shape, the
// fourier analogue). cfg is a computed<FourierFieldConfig> over props.config + the
// intensity/interactive overrides; the renderer must re-read cfg.value per-frame.
const renderConfig = new Proxy({} as FourierFieldConfig, {
    get: (_t, key) => Reflect.get(cfg.value, key),
    has: (_t, key) => Reflect.has(cfg.value, key),
    ownKeys: () => Reflect.ownKeys(cfg.value),
    getOwnPropertyDescriptor: (_t, key) =>
        Reflect.getOwnPropertyDescriptor(cfg.value, key),
});
const renderer = useFourierField(canvasRef, {
    config: renderConfig,         // ← the live forward-through Proxy
    getSpectrum,
    getPalette,
    freeze: () => props.freeze,
});
// And wake a parked loop on a config edit (the blob paletteStops-watcher precedent):
watch(() => props.config, () => renderer.wake(), { deep: true });
```
> NB the `has`/`ownKeys`/`getOwnPropertyDescriptor` traps are required because the fourier setups spread/enumerate `config` in places (the GooBlob Proxy only needs `get` because the blob renderer only does keyed reads; the fourier setups also iterate). A bare `get`-only Proxy over `{}` would enumerate empty. Forwarding ALL reflection to `cfg.value` keeps `{ ...config }` / `Object.keys(config)` correct too.

**File `src/components/custom/fourier-field/composables/useFourierField.ts`** — NO structural change needed: `const { config, getSpectrum, getPalette } = options` (line 79) destructures the Proxy by REFERENCE, and every per-frame read (`config.interactive` at line 112, `config.speed` at line 123, and the setups' `config.harmonics`/`.intensity`/… reads) is a live forward-through once `config` IS the Proxy. The single edit is at the SFC pass-site above. **Verify**: `config.respectReducedMotion` is read in `usePointerVelocityField(...)` at SETUP (line 90-92) — that is a one-shot read of a stable value (PRM policy never changes per-frame), so reading it once off `cfg.value` is correct; if a defensive belt is wanted, read it as `config.respectReducedMotion` (the Proxy forwards). No change required.

**Acceptance (D1):** dragging Harmonics N 4→16 LIVE re-renders the dense 16-term reconstruction (NOT byte-identical to N=4); the Source `<select>` re-mints the spectrum (elliptic → another shape); `harmonicScale`, `intensity`, `epicycleArms`, `trailArc`, `showEpicycles`, `rainbowChain` each produce a VISIBLE curve change. A per-control PASS table is captured. ZERO dead options.

### D2 — `GooDotMatrix.vue` + `useGooDotMatrix.ts` + the story

**File `src/components/custom/goo-dot-matrix/GooDotMatrix.vue`** (line 51 today):
```ts
// BEFORE
const renderer = useGooDotMatrix(canvasRef, { config });
```
```ts
// AFTER — forward a LIVE config Proxy (the renderer captures it by reference; the
// per-frame frame() reads config.variant/.dotPixelSize/.field.* live). `config` is the
// destructured prop (DEFAULT_GOO_DOT_CONFIG default).
const renderConfig = new Proxy({} as GooDotConfig, {
    get: (_t, key) => Reflect.get(config, key),
    has: (_t, key) => Reflect.has(config, key),
    ownKeys: () => Reflect.ownKeys(config),
    getOwnPropertyDescriptor: (_t, key) =>
        Reflect.getOwnPropertyDescriptor(config, key),
});
const renderer = useGooDotMatrix(canvasRef, { config: renderConfig });
watch(() => config, () => renderer.wake(), { deep: true });
```
> `config` here is the destructured prop; `{ config = DEFAULT_GOO_DOT_CONFIG } = defineProps()` — when the story passes a reactive `:config`, the Proxy forwards to the live source.

**File `src/components/custom/goo-dot-matrix/composables/useGooDotMatrix.ts`** — the ONE structural change: `const field = config.field` (line 100) snapshots `.field` ONCE. Replace the captured `field` const with a live getter so the per-frame `resolveFrame`/`resize`/`packBlobWGPUUniforms`/`uploadBlobUniforms` reads track a config swap:
```ts
// BEFORE
const field = config.field;
// AFTER — read field live each frame (the config Proxy forwards to the live source).
const getField = (): BlobConfig => config.field;
```
Then replace the body's `field.` reads with `getField().` at the per-frame sites: `field.tempo` (line 146 → `getField().tempo`), `field.geometry.canvasSize` (lines 229/230/302/303), `field.surface.rimColor` (line 196), and the `packBlobWGPUUniforms(..., field, ...)` / `uploadBlobUniforms(gl, prog, vao, locs, canvas, field, ...)` calls (lines 247/333 → `getField()`), and the satellite `useBlobSatellites(field, "goo-dot")` (line 106) — that one is a SETUP-time bind, so keep the snapshot there (the satellite system re-reads the field's atoms via its own reactive seam, the blob precedent; if a variant swap must reseed satellites, wire it through the existing `wake()` + the satellite reseed the way GooBlob's `satelliteSystem.reseed` watcher does — see GooBlob.vue:166-169). The GL/WGPU per-frame `config.variant`/`config.dotPixelSize`/`config.fieldFloor` reads (lines 318-331) already read off `config` by reference each frame — once `config` is the Proxy they are live with NO further edit.

**File `demo/stories/substrates/goo-dot.vue`** (line 39 today):
```ts
// BEFORE — a fresh-spread object each compute (the stale-reference trap)
const liveConfig = computed<GooDotConfig>(() => ({ ...config }));
// ... :config="liveConfig"
```
```ts
// AFTER — pass the STABLE reactive config directly; the component's renderConfig Proxy
// is the live-read seam (no per-compute fresh object, no double-indirection).
// :config="config"
```
> The spread-per-compute is the OTHER half of the stale trap (a new identity each tick the captured reference never tracks). Passing the stable `reactive` object + the component-side Proxy is the single-source live path.

**Acceptance (D2):** the variant `<select>` (dot-field / dot-dither / dot-lattice / dot-sphere) toggles LIVE; the `interactive` switch reaches the renderer (the dot-cursor influence engages); the field/dot sliders produce visible changes.

---

## D3 — the WebGPU primary path: warm the device + verify WGSL parity (Safari)

The substrate FIX-5 acquire-timeout HOLDS (it prevents the hang). The second-order defect: on a slow-cold-acquire host the 2500ms ceiling races EACH viz canvas's device acquire and WINS (~3478ms real), so WebGPU is NEVER exercised — the viz silently downgrades to WebGL2 forever, and the WGSL render path (the Safari-primary surface the "broken TOTALLY" reports live on) goes unverified.

### D3a — warm a SINGLE shared device (pay the cold acquire ONCE, not per-canvas-re-raced)
**File `src/composables/glass/webgpu/useWebGPUCanvas.ts`** (+ the `webgpuDevice.ts` leaf). Today each `createWebGPUCanvas.armAsync()` calls `navigator.gpu.requestAdapter()` + `adapter.requestDevice()` and races EACH against `WEBGPU_ACQUIRE_TIMEOUT_MS`. With N viz on a page, the cold acquire is re-paid + re-raced N times, and the first slow one trips the timeout. **Mint a process-shared device cache** (a module-level memoised `Promise<{adapter, device}>`), so:
- the FIRST viz pays the cold acquire (raced against a RELAXED ceiling — see D3b),
- every subsequent viz `await`s the SAME resolved device (instant — no re-race),
- a `device.lost` invalidates the cache (the next acquire re-warms it — the self-heal path stays).

```ts
// webgpuDevice.ts — a NEW shared-device warm (the single cold-acquire, memoised).
let sharedDevice: Promise<GPUDevice> | null = null;
export function acquireSharedDevice(
    adapterOptions?: GPURequestAdapterOptions,
    deviceDescriptor?: GPUDeviceDescriptor,
): Promise<GPUDevice> {
    if (sharedDevice) return sharedDevice;
    sharedDevice = (async () => {
        const adapter = await withAcquireTimeout(
            navigator.gpu.requestAdapter(adapterOptions),
            "requestAdapter",
        );
        if (!adapter) throw new WebGPUInitError("no-adapter", "...");
        if (isSoftwareWebGPUAdapter(adapter))
            throw new WebGPUInitError("software-adapter", "...");
        const device = await withAcquireTimeout(
            adapter.requestDevice(deviceDescriptor),
            "requestDevice",
        );
        device.lost.then(() => { sharedDevice = null; }); // invalidate on loss → re-warm
        return device;
    })();
    // a rejected warm clears the cache so a later page can retry (don't pin a failure)
    sharedDevice.catch(() => { sharedDevice = null; });
    return sharedDevice;
}
```
`createWebGPUCanvas.armAsync()` calls `acquireSharedDevice(...)` instead of inline `requestAdapter`/`requestDevice`. The context-configure + `setup` stay per-canvas (each canvas owns its own swap chain + pipeline); only the DEVICE is shared. This is the standard WebGPU pattern (ONE device, many contexts) AND it means the cold acquire is paid once + every subsequent viz gets the warm device with no re-race.

### D3b — relax the acquire ceiling (the cold acquire is legitimately ~3.5s on metal-3)
**`WEBGPU_ACQUIRE_TIMEOUT_MS = 2500` → `6000`** (`useWebGPUCanvas.ts:72`). The live trace measured `requestDevice` resolving at ~3478ms — a HEALTHY cold acquire on this host, NOT a hang. 2500ms is too tight; it converts a slow-but-fine acquire into a false hang. 6000ms still falls a genuine wedge (a device that never settles) to the WebGL2 net well before the user perceives a permanent blank, while letting the real cold acquire through. With D3a the ceiling is hit at most ONCE per page (the shared warm), so the worst-case first-paint delay is a single ≤6s race, not N.
> The FIX-5 wedge-catch (the runtime re-check that returns an INERT handle under a software/hung adapter) STAYS — D3 only widens the ceiling + warms one device; it does NOT remove the net.

### D3c — verify WGSL parity on a real WebGPU device (the binding acceptance — the "broken" lives here)
The fix is INCOMPLETE until the WGSL primary render is paint-verified on a real WebGPU device (Safari 26, OR a Chrome whose acquire is now fast enough — with D3a+D3b the metal-3 Chrome itself will now SELECT WebGPU). The π gate (`gate sketch` in the wave) drives the page with `?gpu=webgpu` forcing (or runs on Safari) and asserts the WGSL arm paints the SAME smooth metaball / dot-cloud / epicycle the WebGL2 arm does — `proof:gpu-substrate-single`'s parity bar (mean OKLab ΔE ≤ 2.0 / p99 ≤ 5.0) is the existing fence; this wave RE-RUNS it on a live device, not the device-free structural proxy. If the WGSL arm diverges (the boxy blob / tiny goo-dot ONLY on WGSL), THAT is the Safari "broken" — and the fix is the WGSL shader-parity edit (the `metaball.wgsl.ts` smin/`fwidth` vs `metaball.frag.ts` parity), shader-content, owned here.

**Acceptance (D3):** with D3a+D3b, the metal-3 Chrome SELECTS `webgpu` (backend reads `"webgpu"`, not `"webgl2"`); the WGSL arm paints the smooth lit metaball / dense dot-cloud / clean epicycle (parity with WebGL2, both modes); `proof:gpu-substrate-single` GREEN on a live device; the cold acquire is paid ONCE per page (the shared warm). On a genuinely-hung host the WebGL2 net still catches (the FIX-5 wedge holds). Safari 26 renders the WGSL primary correctly.

> **FROZEN (do NOT touch):** the `createCanvasLifecycle` schedule / suspend Set / device-loss breaker (FIX-5's reveal-remeasure + the per-canvas device.lost self-heal stay); the GL/WGSL shader COLOR math (`procedural-color.{glsl,wgsl}.ts` — the ONE color source); the viz spring/tempo clocks (`DOCK_SPRING`, `field.tempo`, `periodS`). D3 touches ONLY the device-acquire warm/ceiling + (if D3c finds it) the WGSL geometry-parity (smin/`fwidth`), never the color core.

---

## D4 — the WatercolorDot ghost: trace the SEEDED silhouette, not an ellipse (one shape source)

The solid dot fills a seeded `border-radius` 8-value superellipse (`useWatercolorBlob.borderRadius`); the ghost strokes a hardcoded `<ellipse rx=46 ry=46>` + random noise. ONE shape source must feed BOTH. **Pick OPTION A (research-mechanism §2): a dashed-BORDER `<div>` that INHERITS the silhouette `border-radius`** — a CSS border hugs its own `border-radius` exactly, so the dashed outline traces the seeded blob by construction. This is the smaller single-source fix (no new geometry helper, no SVG-path generation), it is compositor-safe + PRM-neutral (static), and the wet `feDisplacementMap` wobbles the dashed border INTO the organic outline (the design intent).

**File `src/components/custom/watercolor-dot/WatercolorDot.vue`:**

DELETE the `<svg class="watercolor-ghost-overlay"><ellipse rx=46 ry=46 .../></svg>` block (template lines 204-224) AND its scoped CSS (`.watercolor-ghost-overlay` 289-296, `.watercolor-ghost-stroke` 298-303).

ADD the silhouette-tracing dashed border `<div>` (after the filter-host `<svg>`, replacing the deleted SVG):
```html
<div
    v-if="variant === 'ghost'"
    class="watercolor-ghost-stroke"
    aria-hidden="true"
    :style="{ borderRadius: activeBorderRadius, filter: filterUrl }"
/>
```
ADD the scoped CSS:
```css
/* The GHOST dashed outline — a div clipped to the SAME seeded `border-radius`
   silhouette the solid dot fills (the ONE shape source: it reads `activeBorderRadius`,
   the SAME `blob.borderRadius` the solid box takes). A dashed CSS border hugs its own
   border-radius, so the outline traces the seeded organic blob EXACTLY — never an
   ellipse, never a circle. The wet `feDisplacementMap` filter wobbles the dashed
   border into the hand-painted organic edge. Static → PRM-neutral. */
.watercolor-ghost-stroke {
    position: absolute;
    inset: 0;
    border: var(--watercolor-ghost-weight, 2px) dashed var(--watercolor-color);
    /* border-radius set inline off activeBorderRadius (the seeded silhouette) */
    pointer-events: none;
}
```
ADD the new tunable token to the `.watercolor-swatch` root (beside `--watercolor-dash`/`--watercolor-gap`):
```css
--watercolor-ghost-weight: 2px;   /* the dashed silhouette border weight */
```
KEEP the `--watercolor-dash`/`--watercolor-gap` axis declarations (they document the dash register; a CSS dashed border's pitch is UA-derived but the tokens stay as the documented knobs + the OPTION-B escape hatch if a π shows the UA dash reads wrong).

UPDATE the `variant?: "solid" | "ghost"` prop doc + the template `:style` comment to say "the ghost is a dashed BORDER reading the SAME seeded `border-radius` silhouette the solid fills" (the docstring currently claims the false `<ellipse>` contract — fix the prose to the truth).

> **OPTION B (escape — only if the π shows the UA dash pitch reads wrong):** mint `radiiToPath(radii, w, h)` beside `radiiToCSS` in `watercolor-dot/prng.ts` (a pure superellipse-corner-arc `<path d>` from the SAME `randomRadii` seed) + stroke it `stroke-dasharray: var(--watercolor-dash) var(--watercolor-gap)`. This keeps the exact arc-length dash + `non-scaling-stroke` at the cost of one geometry helper. NOT a re-fork (same seed source). Decision: OPTION A first; B only on a π failure.

**Acceptance (D4):** a ghost + a solid WatercolorDot of the SAME `color + seed` overlaid (or compared) trace the SAME outline (≤ ~1px deviation); the outline is the seeded organic blob silhouette (NOT a plain ellipse/circle, NOT a dashed rect); the dashed border wobbles into the wet organic edge.

---

## D6 — the fourier cursor: a 2-D weighted follow + a velocity scrub (liquid weight)

Today `headT = pointer.smoothedPosition.x % 1` (`useFourierField.ts:115`) — pointer-X teleports the loop phase (the comet snaps to an arbitrary point on its fixed orbit), Y ignored, `positionLerp 0.22` adds lag → reads as "not following". The fix makes the cursor a SPATIAL ATTRACTOR + a velocity-driven scrub (the `[[feedback-liquid-weight-universal]]` law) — NO new pointer engine, NO second rAF (the ONE shared `usePointerVelocityField` already delivers x, y, velocity, acceleration, burst).

### D6a — drop the absolute-X teleport; advance head_t at base rate + a VELOCITY term (continuity, no jump)
**File `src/components/custom/fourier-field/composables/useFourierField.ts`** — the `onFrame` pointer branch (lines 112-120):
```ts
// BEFORE — absolute-X scrub (teleport, lag, no Y, no continuity)
if (config.interactive && pointer.active.value) {
    headT = pointer.smoothedPosition.value.x % 1;
    if (headT < 0) headT += 1;
    momentum = pointer.burst.value * 4.0;
    return;
}
```
```ts
// AFTER — a VELOCITY scrub: the cursor MOTION nudges the clock (a flick fast-forwards,
// a still cursor lets it drift at config speed), velocity-continuous (no teleport). The
// 2-D follow rides the uPointer uniform (D6b). PRM keeps the position read, drops the
// velocity term (the tick(0) discipline — usePointerVelocityField zeros velocity).
if (config.interactive && pointer.active.value) {
    const baseRate = config.speed / periodS;
    const rate =
        baseRate +
        pointer.velocity.value.x * SCRUB_GAIN +   // the cursor-motion scrub (weighted)
        momentum;                                  // the decaying flick impulse
    headT = (headT + rate * dt) % 1;
    if (headT < 0) headT += 1;
    momentum = pointer.burst.value * 4.0;          // a flick injects clock momentum
    momentum *= Math.pow(0.92, dt * 60);           // decay to ambient (iOS fling settle)
    if (Math.abs(momentum) < 1e-4) momentum = 0;
    return;
}
```
This restores continuity (the head never teleports), keeps the flick-momentum, and reads as a weighted scrub-by-drag. (The free-advance branch below it is unchanged.)

### D6b — pack a 2-D pointer-ATTRACT uniform the field reads (the actual "follow")
**File `src/components/custom/fourier-field/constants.ts`** — add the coupling gain:
```ts
/** The cursor-velocity → head_t clock coupling (D6 — the weighted scrub gain). */
export const SCRUB_GAIN = 0.15;
```
**Files `fourierFieldGLSetup.ts` + `fourierFieldWGPUSetup.ts` + `uniformBridgeWGPU.ts`** — add an ADDITIVE `uPointer` (vec2 uv, the smoothed cursor in clip/uv space) + `uPointerStrength` (the follow-bend depth, default `0` — the default-OFF floor so the field is byte-untouched at strength 0). The fragment/compute BENDS the SDF field + leans the epicycle chain toward `uPointer` (the goo-blob `uPointer` lean idiom, applied to the fourier SDF — a small directional warp, NOT a hue/color edit). The setups read `pointer.smoothedPosition.value.{x,y}` (the full 2-D position the field already delivers) into the uniform each frame. The interactive register sets `uPointerStrength` > 0; the ambient register keeps it 0.
> The uniform is ADDITIVE — at `uPointerStrength: 0` the WGSL/GLSL fragment renders byte-identical to today, so `proof:gpu-substrate-single` parity + every `proof:viz-fourier` source arm stay GREEN by construction. The WGSL arm and the GLSL arm pack the SAME uniform (the `uniformBridgeWGPU.ts` typed-struct SoT extends additively — a new vec4 lane for `uPointer.xy` + `uPointerStrength`, std140/WGSL-aligned, the existing SoT discipline).

### D6c — PRM-safe by construction
Under `prefers-reduced-motion: reduce` the `usePointerVelocityField` `tick(0)` freeze zeros velocity (so the scrub term → 0) and the position is HELD (the comet rests where the cursor last was); `uPointerStrength` may still bend the field statically toward the held position (a static lean is not motion) — no live scrub momentum. The existing `isFrozen()` short-circuit (line 104-108) already snaps to `frozenT` under PRM; the D6 branch is reached only when NOT frozen, so PRM correctness is inherited. No extra carve needed.

**Acceptance (D6):** moving the cursor over the canvas makes the head/chain respond as a WEIGHTED scrub (velocity-driven, continuous, no teleport) AND the chain/field LEANS toward the 2-D cursor (`uPointerStrength` > 0); both X and Y register; a flick injects a momentum impulse that settles; PRM freezes the field (no live scrub). The response reads as "following the cursor" with liquid weight (no hard snap, no laggy disconnect).

---

## D5 — (rider, folds into W-STICKY-TITLE-CONDENSE) the hero condense, gentle + reserved

The user named "the hero text should NOT scroll like this on every page" alongside the blob defect. The full behaviour is `W-STICKY-TITLE-CONDENSE`'s; this wave carries ONLY the gentle-condense recipe softening (research-mechanism §4), tokenized so that wave tunes it further.

**File `demo/stories/story-hero.css`** — mint the condense tokens at `:root` (the single retune knobs) + re-point the keyframe:
```css
/* :root — the condense register knobs (W-STICKY-TITLE-CONDENSE tunes these) */
--hero-condense-scale: 0.82;       /* a gentle settle, NOT a half-zoom (was scale(0.5)) */
--hero-condense-range: 160px;      /* condenses sooner + holds (was 240px) */
--hero-condense-fade-range: 120px; /* the eyebrow/blurb fade window */
```
```css
/* @keyframes story-hero-shrink — gentle condense, NOT a half-zoom */
@keyframes story-hero-shrink {
    from { transform: scale(1) translateY(0); }
    to   { transform: scale(var(--hero-condense-scale, 0.82)) translateY(-0.25rem); }
}
.story-hero-shrink {
    animation: story-hero-shrink linear both;
    animation-timeline: scroll();
    animation-range: 0 var(--hero-condense-range, 160px);
    animation-fill-mode: forwards;
}
```
ADD a second `scroll()`-timeline keyframe FADING the subordinate rungs (the eyebrow + blurb evaporate; the title + subpath chip persist — the iOS large-title-collapse read):
```css
@supports (animation-timeline: scroll()) {
    @media (prefers-reduced-motion: no-preference) {
        @keyframes story-hero-subordinate-fade {
            from { opacity: 1; } to { opacity: 0; }
        }
        .story-header-eyebrow, .story-header-blurb {
            animation: story-hero-subordinate-fade linear both;
            animation-timeline: scroll();
            animation-range: 0 var(--hero-condense-fade-range, 120px);
            animation-fill-mode: forwards;
        }
    }
}
```
**The overlap fix (the layout-reserve).** The half-zoom shrank the PAINT but the sticky box kept its pre-scale layout height, so the body scrolled UNDER the title. With `scale(0.82)` (a far smaller paint reduction) + the subordinate fade (the eyebrow/blurb vanish, reclaiming visual room) the residual overlap is sub-perceptual. If a π still shows overlap, the W-STICKY-TITLE-CONDENSE wave owns the full reserve (a sticky box whose layout height tracks the condensed paint — the `<ScrollCard>`/`card-*-shrink` `scaleY` origin-top discipline). This rider does NOT attempt the full reserve; it softens the defect to acceptable + tokenizes the register.

> **PRM + @supports UNCHANGED** — the whole register stays gated; under reduce / a gap engine the static large hero holds (the vestibular floor). Compositor-only (scale + opacity, never font-size/width — `proof:no-layout-animation` holds).

**Acceptance (D5):** the hero condenses gently (scale ≈ 0.82, not 0.5) over the first 160px + holds; the eyebrow + blurb fade out, the title + subpath chip persist; the condensed bar does NOT visibly overlap the body. (Full behaviour deferred to W-STICKY-TITLE-CONDENSE.)

---

## Gate impact

### NEW π gate — `tests-visual/viz-broken-fix.spec.ts` (the BINDING paint, LOCAL-only, real GPU)
Born-RED on the current tree (the boxy/dead/ellipse/scrub defects), GREEN at fix. Five arms (see the wave's gate sketch for the full readback):
1. **fourier-config-live** — drive Harmonics N 4→16 + the Source select; assert the rendered curve sample-set CHANGES (a frame-hash delta, NOT byte-identical) per control. Born-RED (today N=4≡N=16).
2. **goo-dot-config-live** — toggle the variant select dot-field→dot-dither; assert the rendered field CHANGES. Born-RED.
3. **watercolor-ghost-traces-silhouette** — render a solid + a ghost of the SAME `color+seed`; read both `getBoundingClientRect` + the computed `border-radius`; assert the ghost's `border-radius` === the solid's seeded silhouette (NOT `50%`/ellipse). Born-RED (today the ghost is an `<ellipse>`, no `border-radius`).
4. **fourier-cursor-follows** — dispatch a pointer sweep; assert head_t advances by a velocity term (continuity, not a teleport to pointerX) AND `uPointerStrength` > 0 in the interactive register. Born-RED (today X-teleport).
5. **gpu-backend-selected** (D3, conditional) — on a WebGPU-capable host with the warmed device, assert `backend === "webgpu"` and the WGSL arm paints parity with WebGL2 (ΔE within `proof:gpu-substrate-single`'s bar). Born-RED on metal-3 Chrome today (always `webgl2`).

### EXTEND-IN-PLACE — `scripts/proof-no-gray.mjs` (the `viz-palette-warm` SOURCE arm, no new KEY, no new gate)
ADD a `viz-palette-warm` witness reading the four viz DEFAULT palettes (`WARM_IDENTITY_PALETTE` goo-dot, `BLOB_CONFIG_DEFAULTS.color.paletteStops` goo-blob, `DEFAULT_FOURIER_CONFIG.palette`, `DEFAULT_DOT_MATRIX_CONFIG` palette) → OKLab, asserting each clears `STRONG_FLOOR` (0.02) at the warm hue `H ∈ [WARM_HUE_LO, WARM_HUE_HI]` (45-85°). BORN-GREEN (the palettes ship warm) — a regression GUARD against a future gray/teal viz default. The existing plate/ladder/dark arms are UNTOUCHED.

### RE-RUN (no edit) — `proof:gpu-substrate-single` (D3c parity)
The WGSL↔WebGL2 parity bar (mean OKLab ΔE ≤ 2.0 / p99 ≤ 5.0) is re-run on a LIVE WebGPU device (now reachable via the warmed device + relaxed ceiling), the binding paint replacing the device-free structural proxy. If the WGSL arm diverges (the Safari "broken"), the smin/`fwidth` parity edit is the fix (shader-content, owned here), and the gate re-greens at parity.

### Cross-gate no-regression (must stay GREEN by construction)
- `proof:viz-fourier` / `proof:viz-hybrid` (the additive `uPointer` uniform at strength 0 is byte-untouched; the config-live fix is a wiring change, not a shader edit).
- `proof:no-layout-animation` (every fix is transform/opacity/filter/uniform — the ghost border + hero scale are not layout-animated; the `border-radius`/`filter` are static).
- `proof:offscreen-pause` (the device warm + ceiling do NOT touch the schedule; the FIX-5 reveal-remeasure + suspend Set are frozen).
- `proof:gpu-substrate-single` clause A (the shared-device warm reads `navigator.gpu` ONLY inside `webgpuDevice.ts`/`useWebGPUCanvas.ts` — the single-bootstrap rule holds; a consumer never touches `navigator.gpu`).
- `proof:single-color-core` (the `uPointer` uniform is a GEOMETRY bend, not a color edit; `procedural-color.{glsl,wgsl}.ts` byte-untouched).

---

## a11y / PRM / Safari rules (binding)

- **PRM.** D6 inherits the `usePointerVelocityField` `tick(0)` freeze (no live scrub/velocity under reduce; the position held, the field static-leans). D4 ghost is STATIC (PRM-neutral). D5 hero condense is `@media (prefers-reduced-motion: no-preference)`-gated (the static large hero holds under reduce). D1/D2 config-live is a wiring fix, no motion. The substrate live-PRM one-static-frame-then-park (FIX-5) is untouched.
- **a11y.** No semantic change. The viz canvases keep `aria-hidden="true"`. The WCAG-2.2.2 `v-model:paused` pause seam (`DockBackgroundToggle`) is untouched. The fourier `pointer-events` wrapper gate (`.fourier-field--interactive`) is untouched.
- **Safari.** D3 is the Safari headline — the WGSL primary is Safari's path; D3c paint-verifies it on Safari 26 + reaches WebGL2 parity. The WatercolorDot wet `feDisplacementMap` is `filter:` (the surface pixels), not `backdrop-filter:` (the §H Safari-safe rasterize-once-and-cache idiom is preserved; the ghost border + filter are static, no per-frame raster). The hero condense rides native `scroll()` (Baseline Safari 26+) with the static fallback. The WebGL2 fallback net is the cross-browser floor for the device-hang case.
- **Compositor-only.** Every fix is transform/opacity/filter/uniform (the `proof:no-layout-animation` floor); no layout property is animated.
- **Warm identity.** The viz palettes ship warm-cream (the `viz-palette-warm` gate guards it); the fourier curve strokes the violet `--motion-accent`; the blob is warm-gold/amber; the dots warm-cream. No gray, no teal-on-navy (those are presets-in-consumers / demo-local). The D6 `uPointer` is a geometry bend, never a hue injection.

---

## File-edit summary (the implementer's checklist)

| # | File | Edit |
|---|------|------|
| D1 | `src/components/custom/fourier-field/FourierField.vue` | `config: cfg.value` → a live forward-through `renderConfig` Proxy over `cfg.value` (get/has/ownKeys/getOwnPropertyDescriptor) + `watch(() => props.config, () => renderer.wake(), {deep})` |
| D2 | `src/components/custom/goo-dot-matrix/GooDotMatrix.vue` | `{ config }` → a live `renderConfig` Proxy over the prop + the deep-config wake watcher |
| D2 | `src/components/custom/goo-dot-matrix/composables/useGooDotMatrix.ts` | `const field = config.field` → `const getField = () => config.field`; re-point the per-frame `field.` reads (tempo/canvasSize/rimColor) + the `packBlobWGPUUniforms`/`uploadBlobUniforms` field args to `getField()` |
| D2 | `demo/stories/substrates/goo-dot.vue` | `const liveConfig = computed(() => ({ ...config }))` + `:config="liveConfig"` → `:config="config"` (the stable reactive object; the Proxy is the live seam) |
| D3a | `src/composables/glass/webgpu/webgpuDevice.ts` | ADD `acquireSharedDevice()` — a module-memoised `Promise<GPUDevice>`, `device.lost`-invalidated, rejection-cleared |
| D3a | `src/composables/glass/webgpu/useWebGPUCanvas.ts` | `armAsync` inline `requestAdapter`/`requestDevice` → `acquireSharedDevice(...)` (the per-canvas context/setup stay) |
| D3b | `src/composables/glass/webgpu/useWebGPUCanvas.ts` | `WEBGPU_ACQUIRE_TIMEOUT_MS = 2500` → `6000` |
| D3c | `metaball.wgsl.ts` / `goo-dot` WGSL / `fourier-field.*.wgsl.ts` | (CONDITIONAL on the live π) smin/`fwidth` geometry-parity with the `.frag.ts` arm — ONLY if D3c finds the WGSL arm diverges |
| D4 | `src/components/custom/watercolor-dot/WatercolorDot.vue` | DELETE the `<svg><ellipse>` ghost + its CSS; ADD a `.watercolor-ghost-stroke` `<div>` reading `borderRadius: activeBorderRadius` + a dashed `--watercolor-ghost-weight` border + the filter; fix the prop docstring |
| D6a | `src/components/custom/fourier-field/composables/useFourierField.ts` | the `onFrame` pointer branch: drop `headT = pointerX`; advance `headT += (baseRate + velocity.x * SCRUB_GAIN + momentum) * dt` |
| D6b | `src/components/custom/fourier-field/constants.ts` | ADD `export const SCRUB_GAIN = 0.15` |
| D6b | `fourierFieldGLSetup.ts` + `fourierFieldWGPUSetup.ts` + `uniformBridgeWGPU.ts` | ADD `uPointer` (vec2 uv) + `uPointerStrength` (default 0) — the 2-D follow bend, additive |
| D5 | `demo/stories/story-hero.css` | mint `--hero-condense-scale/-range/-fade-range`; `scale(0.5)` → `scale(var(--hero-condense-scale,0.82))`, range `240px` → `var(--hero-condense-range,160px)`; ADD the eyebrow/blurb `scroll()` fade |
| G | `scripts/proof-no-gray.mjs` | ADD the `viz-palette-warm` SOURCE arm (4 viz default palettes clear `STRONG_FLOOR` at warm hue — born-GREEN guard) |
| G | `tests-visual/viz-broken-fix.spec.ts` | NEW π gate — the 5 arms above, born-RED on the defect |

**FROZEN (do NOT touch):** `createCanvasLifecycle` schedule / suspend Set / device-loss breaker (FIX-5); the GL/WGSL color math (`procedural-color.{glsl,wgsl}.ts`); the viz spring/tempo clocks (`DOCK_SPRING`/`field.tempo`/`periodS`); the `--card` warm lift + `WARM_PLATE_FLOOR` (the sibling glass-abrogate-gray wave's); the `--glass-tint-*` adaptive seam + the W-DARK-MATERIAL dark arm. The C3 paper-grid + C6 concentric RESPECs (shader-content, prototype-owned) + the C4 dot-matrix gravity/2d-bg are OUT OF THIS WAVE's scope (separate waves).
