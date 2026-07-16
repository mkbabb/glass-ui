# Aurora architecture

## Product model

Aurora is one procedural field, not a family of renderer-specific components.
Configuration describes composition, palette, medium, motion, and interaction;
the selected engine translates that same state into its own bindings.

The field is built from:

1. a warped multi-nucleus palette composition;
2. an optional painterly medium;
3. pointer and scroll modulation;
4. linear-light tonemapping followed by the sRGB output transfer.

The default remains a warm, calm, full-bleed field. Named presets live in the
demo or consuming products.

## Ownership

`Aurora.vue` owns the component boundary and the explicit CSS-static mode.
`useAurora` owns Vue reactivity, deferred initialization, first-intersection
arming, and forwarding the renderer status. `createAurora` owns only
Aurora-specific configuration, pointer state, frame work, and imperative
controls.

`createGpuSubstrate` and `createCanvasLifecycle` own device/context acquisition,
backend selection, backing-store sizing, tab and intersection parking, reduced
motion, scheduling, recovery, and disposal. Aurora must not install parallel
observers or frame loops.

## Engines

The animated mode prefers WebGPU and supports WebGL2 for recognized acquisition
failures that happen before WebGPU owns the canvas. Both engines share:

- `AuroraConfig` and palette resolution;
- the pointer velocity field and interaction mappings;
- timing, pause, resize, DPR, and reduced-motion policy;
- renderer status and attributed failure reporting.

WebGL2 and WebGPU setup modules are thin engine translators, not separate
product models. A shader setup or pipeline-validation failure remains an error;
it is not silently converted into an unrelated renderer success.

The CSS mode is an explicit static product choice. It is not a hidden fallback
for arbitrary GPU errors.

## Public imperative surface

```ts
interface AuroraInstance {
    arm(): void;
    armAsync(): Promise<void>;
    update(config: AuroraConfig): void;
    setCursor(x: number, y: number, strength?: number): void;
    clearCursor(): void;
    setCursorRadius(radius: number): void;
    renderAt(timeSeconds: number): void;
    pause(): void;
    resume(): void;
    dispose(): void;
}
```

Reduced motion is deliberately absent from this API. The shared lifecycle owns
the live `prefers-reduced-motion` query. A second setter or media-query listener
would create conflicting authorities.

`armAsync()` is the readiness boundary for capture. `renderAt()` draws one frame
without mutating the scheduler. `pause()` and `resume()` use the lifecycle's
manual suspension reason.

## Color

CPU color conversion and gamut handling use the shared color composables. The
matching GPU semantic leaves are:

- `src/composables/glass/procedural/color.glsl.ts`
- `src/composables/glass/procedural/color.wgsl.ts`

They preserve the same transfer functions, Ottosson matrices, palette ramp, and
shared noise constants. Shader-language syntax remains explicit; generated
shader sources are not part of the architecture.

Palettes are authored in OKLCh, uploaded in linear sRGB, composed in linear
light, tonemapped, and encoded once at output. Medium implementations may alter
surface character but must not establish a second color pipeline.

## Interaction and motion

The shared pointer field is the sole pointer dynamics owner. Cursor position is
written from events; velocity, acceleration, engagement, and decay advance from
the renderer's existing frame callback. Scroll coupling uses the shared scroll
progress composable.

Reduced motion freezes temporal and pointer-driven evolution through the shared
lifecycle and field gates. Manual pause stops the same schedule. No interaction
axis may create a private animation loop.

## Invariants

- One semantic configuration across engines.
- One lifecycle and one frame schedule per live Aurora.
- One live reduced-motion authority.
- One neutral procedural color home.
- Actual engine identity and setup failure remain observable.
- CSS static mode is explicit, never an error mask.
- Presets stay in consumers.
- `renderAt()` is draw-only.
- Capture-only buffer preservation does not become the live default.
- Engine adapters remain small translations rather than a conditional monolith.
