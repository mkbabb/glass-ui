# AM.W1 — Aurora ergonomics + adaptive render-mode (runtime probe)

Scope: `config`-default (gap 11) + the `renderMode` adaptive substrate (NEW; muster E.W2 binds `:render-mode="'auto'"`). Aurora is NEVER retired — the warm wash composites under every branch; only the substrate (animated WebGL vs static CSS) adapts. The shipped `initStrategy:"deferred"` lazy boot (CSS placeholder at FCP, WebGL armed on idle past first paint, reduced-motion `uTime` freeze) is preserved unchanged.

## Files changed

| File | Change |
|---|---|
| `src/components/custom/aurora/renderMode.ts` | **created** — `AuroraRenderMode` type alias + `resolveRenderMode()` device-tier resolver (SSR/missing-API safe). |
| `src/components/custom/aurora/Aurora.vue` | `config` made OPTIONAL with a `withDefaults` factory → `DEFAULT_AURORA_CONFIG`; added `renderMode` prop (default `"auto"`); resolve substrate once at setup; thread resolved mode into `useAurora`. |
| `src/components/custom/aurora/composables/useAurora.ts` | added 4th `adaptiveOptions` param + `UseAuroraAdaptiveOptions` interface; `cssOnly` guard short-circuits `onMounted` before `createAurora`. |
| `src/components/custom/aurora/index.ts` | export `resolveRenderMode` + `type AuroraRenderMode`. |

## 1 — config-default mechanism (gap 11)

`Aurora.vue:49` — `config?: AuroraConfig` (was required). `withDefaults` (`Aurora.vue:85-91`) supplies a FACTORY default:

```ts
{ opacityCeiling: 1, config: () => DEFAULT_AURORA_CONFIG, renderMode: "auto" }
```

`DEFAULT_AURORA_CONFIG` is imported from the SOURCE module `./presets` (`Aurora.vue:6` — `import { DEFAULT_AURORA_CONFIG, type AuroraConfig } from "./presets"`), NOT the built `dist` or the `/api` barrel, so the component does not depend on its own publication graph. `presets.ts:148` is the canonical definition (a complete blue/cream painterly field: 3-stop OKLCh palette, 2 nuclei, fbm warp, smooth medium).

Factory (not a shared object) so every mount gets its own config instance — a consumer that deep-mutates `props.config` (slider drag) never clobbers the module-level canonical default for other mounts.

After defaults resolve, `props.config` is non-optional, so the existing `props.config.palette` (placeholder gradient, `Aurora.vue:129`) and `defineExpose({ config: props.config })` read straight through with no optional-chaining churn — `<Aurora />` with NO config prop renders the canonical painterly look.

## 2 — renderMode prop + three branches

`renderMode?: AuroraRenderMode` (`Aurora.vue:67`), default `"auto"`. `AuroraRenderMode = "webgl" | "css" | "auto"` (`renderMode.ts`).

- **`"webgl"`** — arms the WebGL path as today. `resolveRenderMode("webgl")` returns `"webgl"` → `useAurora` gets `{renderMode:"webgl"}` → `cssOnly=false` → the full deferred `onMounted` path runs (intersection gate + `scheduleAfterFirstPaint` → `armRuntime` → `inst.arm()`). Still deferred to idle via the unchanged `initStrategy:"deferred"` default.
- **`"css"`** — never arms WebGL. `resolveRenderMode("css")` returns `"css"` → `cssOnly=true` → `onMounted` returns immediately after the canvas-null check, BEFORE `createAurora`. The `paletteToCssGradient` placeholder (`Aurora.vue` template) stays the permanent surface; the warm wash composites, it just does not animate. `isArmed` stays `false`, so the canvas cross-fade never fires (`opacity:0` canvas sits inert over the painted placeholder).
- **`"auto"`** (default) — device-tier resolution (§3), collapsing to `"webgl"` or `"css"` exactly as the two explicit branches above.

Resolution happens ONCE at setup (`Aurora.vue:98` — `const resolvedRenderMode = resolveRenderMode(props.renderMode)`), not reactively. The device tier is a mount-time decision; a consumer remounts to re-evaluate, matching the deferred-arm contract.

## 3 — device-tier resolution + SSR guards

`resolveRenderMode(mode)` (`renderMode.ts`): `"webgl"`/`"css"` pass through unchanged; `"auto"` resolves to `"css"` when ANY low-power signal is present, else `"webgl"`:

1. `navigator.hardwareConcurrency <= 4` (guarded `typeof … === "number"`).
2. `window.matchMedia("(prefers-reduced-motion: reduce)").matches` (guarded `typeof window.matchMedia === "function"`).
3. `navigator.connection?.saveData === true` — `NetworkInformation` is non-standard, so it is feature-probed via an optional-chained cast `(navigator as Navigator & { connection?: { saveData?: boolean } }).connection?.saveData`.

**SSR / missing-API guard:** `if (typeof navigator === "undefined" || typeof window === "undefined") return "webgl"` — the capable assumption. If individual sub-probes are unavailable they evaluate falsy (e.g. `hardwareConcurrency` undefined → the `typeof number` guard fails → that signal is `false`), so a partial environment biases toward `"webgl"`. Either way the warm wash composites; the only question the resolver answers is whether it animates.

Branch verification (reasoned against the resolver):

| Forced condition | Resolver result | WebGL armed? |
|---|---|---|
| `hardwareConcurrency = 2` | `"css"` | no |
| `prefers-reduced-motion: reduce` | `"css"` | no |
| `connection.saveData = true` | `"css"` | no |
| 8 cores, no-RM, no-saveData | `"webgl"` | yes (deferred to idle) |
| SSR / no `navigator` | `"webgl"` | n/a (arm is browser-only idle work) |

## 4 — arm-gate point (where `"css"` short-circuits)

The gate is in `useAurora.ts` `onMounted`:

```ts
if (cssOnly) return;   // before createAurora — no webgl2 context ever
```

`cssOnly = adaptiveOptions.renderMode === "css"`. The return sits AFTER the `canvasRef.value` null-check and BEFORE `createAurora(...)`. Confirmed against `runtime.ts`: `canvas.getContext("webgl2", …)` is at `runtime.ts:217`, INSIDE `arm()` (`runtime.ts:214`), and `arm()` is only ever invoked from `shouldInitEagerly` (`runtime.ts:463`, eager/capture only) or the deferred `scheduleAfterFirstPaint→armRuntime` path. On the `"css"` branch we never call `createAurora`, so neither `arm()`, `getContext`, the intersection observer, nor the idle schedule is reachable. The webgl2 context is definitively never created.

`"webgl"`/`"auto→webgl"` leave the deferred boot path byte-for-byte unchanged (the intersection gate, `requestIdleCallback`/Safari double-rAF fallback, the first-intersection re-check, the reduced-motion `uTime` freeze at `runtime.ts:412-414`, and the 600ms canvas cross-fade all intact).

## 5 — warm wash composites under every branch (Aurora never blank)

The `paletteToCssGradient` placeholder (`Aurora.vue` template, `aria-hidden`, `opacity: var(--aurora-opacity-ceiling, 1)`) paints in ALL branches — it is the substrate under the canvas and is never unmounted. `"css"` keeps it as the permanent surface; `"webgl"`/`"auto→webgl"` cross-fade the canvas in over it once armed (the placeholder remains as the WebGL2-unavailable / pre-arm fallback). Reduced-motion still freezes `uTime` (untouched). No branch produces a blank background.

## 6 — typecheck result

`npm run typecheck` (`vue-tsc --noEmit`) — **exit 0**, no diagnostics. `npm run build` deliberately NOT run here (orchestrator runs the 8GB build once at integration per the wave dispatch).

## 7 — Archived optional hardening

The audit's OPTIONAL refinements are ARCHIVED to a future Aurora wave — the core config-default + renderMode work is the binding scope and left no obvious headroom that warranted bundling them:

- **`prefers-reduced-transparency: reduce` media branch** (`aurora-lazy-init §5`) — a one-line scoped-style clamp of `--aurora-opacity-ceiling` toward 1.0. No consumer binary forces it; deferred to a future Aurora wave.
- **Chunked `arm()`** (`aurora-lazy-init §3.2 gap 1`) — yield between context-create / compile / link / first-upload so each idle slice stays < 50ms. Touches `arm()` internals (out of this wave's bounds, which forbid editing `runtime.ts` arm internals beyond the schedule gate). Deferred to a future Aurora wave.

Neither is needed for the muster E.W2 binding (`:render-mode="'auto'"`), which depends only on the prop existing in `dist/`.
