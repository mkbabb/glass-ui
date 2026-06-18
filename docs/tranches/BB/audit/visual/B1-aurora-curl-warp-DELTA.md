# BB.B1-frag — aurora-curl-warp (the `.frag` arm) DELTA

## The ask (cross-repo relay §5 line 106)

> B1 aurora-curl-warp (`warpMode: 'curl'`, Bridson); `.frag` arm on the 4.1.0 cut,
> WGSL arm after the viz chain; shared `curlFBM`.

Add a `warpMode: "curl"` option to aurora's domain warp — a Bridson curl-noise flow
warp (the divergence-free curl of an fbm potential, the SOTA flow-field warp) — as an
OPT-IN warp mode BESIDE the existing fbm/cellular/hybrid. Factor the curl-noise fbm into
a SHARED glsl chunk (`flow.glsl.ts`, beside `procedural-color.glsl.ts` — the AV.W2
shared-chunk precedent) so it is reusable, the ≥3-consumer bar BOOKED. The `.frag` arm
ONLY this cut; the WGSL arm is the booked procedural tail.

## The cardinal constraint — OPT-IN, DEFAULT BYTE-IDENTICAL

The existing aurora default config (`warpMode: "fbm"`) renders BYTE-IDENTICAL: the curl
is a new BRANCH gated behind `uWarpMode == 3`, the default warp paths (fbm/cellular/
hybrid) carry NO curl call, and `warpModeFor` (the NOISE atom fan-out) NEVER auto-selects
curl. So every existing `proof:aurora-*` gate + the W-AURORA-WGPU parity surface stays
green by construction. Curl is reached ONLY by an explicit `warpMode: "curl"`.

Verified green at close:
- `proof:aurora-space-gamma` — PASS (the shader splice seam intact, OETF before out).
- `proof:aurora-preset-roster` — PASS (the config roster unchanged).
- `npm run typecheck` — clean.

## The mechanism

### The shared `curlFBM` chunk (`src/composables/glass/webgl/shaders/flow.glsl.ts`)

`CURL_FBM_GLSL` — a pure GLSL string exporting `curlFBM(vec2 p)`: the 2D curl of a
scalar fbm potential. In 2D a scalar potential ψ generates the divergence-free field
∇×ψ = (∂ψ/∂y, −∂ψ/∂x); the partials are central finite differences of a host-supplied
`potentialFBM`, the result rotated 90° (`return vec2(g.y, -g.x);`). The chunk owns ONLY
the basis-agnostic curl operator — the HOST owns the noise basis via the forward-declared
`potentialFBM` prototype (ES 3.00 allows it). Imports NO value.js + declares no uniforms.

This is the divergence-free SOTA flow warp (Bridson, "Curl-Noise for Procedural Fluid
Flow", SIGGRAPH 2007): a field warped along the curl folds + stretches like real fluid
advection, never the source-y bulge a raw fbm gradient produces.

### The `.frag` consume (`aurora.frag.ts`)

1. `import { CURL_FBM_GLSL } from ".../flow.glsl"` + the `${CURL_FBM_GLSL}` splice after
   aurora's own `fbm` is defined.
2. `float potentialFBM(vec2 p) { return fbm(p); }` — aurora wraps its OWN fbm as the
   scalar potential, so the curl rides the same 2.02-lacunarity loop the rest of the warp
   uses (the host owns the basis).
3. The OPT-IN branch in `domainWarp()`:
   ```glsl
   } else if (uWarpMode == 3) {
     vec2 fp = p * uWarpScale + vec2(t * uWarpDrift * K_WARP);
     warp = curlFBM(fp);
   }
   ```
   The potential scrolls on the same `uWarpDrift` clock; the field reads slowly alive.

### The TS seam (default-unchanged fence)

- `WarpMode` union widens: `"fbm" | "cellular" | "hybrid" | "curl"` (presets.ts).
- `WARP_ID` maps `curl: 3` (uniformBridge.ts — the int the `.frag` dispatches on).
- `warpModeFor` (atoms.ts) is BYTE-UNCHANGED — it never returns `"curl"`, so the NOISE
  atom fan-out cannot auto-select it. The default config is byte-unchanged.

## The WGSL arm (booked procedural tail)

`aurora.wgsl.ts` is BYTE-UNTOUCHED this cut. The WGSL warp dispatch falls through to the
fbm default (`warp = r`) for `warpMode == 3` (there is no `else if (warpMode == 3)` arm
yet), so a `warpMode: "curl"` config on a WebGPU device DEGRADES to fbm — never an error,
never garbage. Since curl is opt-in (default never sets it), the WebGPU default-smooth
parity surface stays byte-equivalent. The WGSL curl + a shared `flow.wgsl.ts` are booked
AFTER the viz chain (the relay's "WGSL arm after the viz chain").

## The shared-chunk ≥3-consumer booking

`docs/consumer-evidence/curl-fbm.md` records the bar in its BOOKED form:
- **#1 LIVE** — B1 aurora-curl-warp (this cut, the `.frag` arm).
- **#2 BOOKED** — B5 paper-grid-breathe (`<Card grid animated>`, after W-FLOWFIELD).
- **#3 BOOKED** — W-FLOWFIELD flow-field viz (the streamline integrator).

## The gate

`proof:aurora-curl-warp` (born-RED→GREEN): W1 the shared chunk exists + basis-agnostic ·
W2 aurora splices the chunk + the curl is OPT-IN (`uWarpMode == 3` only, every curlFBM
call gated) · W3 the union widens + WARP_ID maps curl:3 + warpModeFor never auto-curl ·
W4 the ≥3-consumer booking recorded · + a 6-bite self-test (an inlined basis / a curl
call in the default path / a forked inline curl / warpModeFor auto-selecting curl / the
union not widened / the evidence doc absent each RED their clause; the good corpus passes).
Born-RED demonstrated: all 4 witnesses RED on the pre-wave source (4 violations) → GREEN.

## The binding π / WebGPU parity capture

Rides W-REFLECT3 (the binding live-π + the WebGPU parity capture). The `.frag` curl warp
will capture a frame-series at `warpMode: "curl"` showing the divergence-free swirl + the
default-byte-identical frame at `warpMode: "fbm"`, both modes.
