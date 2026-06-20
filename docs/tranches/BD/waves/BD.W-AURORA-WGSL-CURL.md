# BD.W-AURORA-WGSL-CURL

## (1) Band + goal

**Band 3 — Procedural viz parity + GL-fence tails.**

Add the `warpMode == 3` (Bridson curl-noise) domain-warp branch to `aurora.wgsl.ts` — splice the already-minted `CURL_FBM_WGSL` chunk so a `warpMode:'curl'` aurora renders the divergence-free flow warp on WebGPU instead of silently degrading to fbm. A mechanical splice closing the cross-backend warp-mode parity gap.

## (2) Starting state — the exact on-disk reality

`src/components/custom/aurora/constants/shaders/aurora.wgsl.ts` `domainWarp()` (VERIFIED by reading lines 158-199):
- handles `warpMode == 1` (cellular, :174-178) and `warpMode == 2` (hybrid, :179-184) only;
- `var warp = r;` (the fbm double-warp, :173) is the DEFAULT — there is NO `else if (warpMode == 3)` branch, so a `warpMode == 3` config falls through to `warp = r` (fbm). VERIFIED.

The `.frag` fallback HAS the curl branch: `aurora.frag.ts:290-296` (VERIFIED):
```glsl
} else if (uWarpMode == 3) {
    // BB.B1 — curl (Bridson flow warp) …
    vec2 fp = p * uWarpScale + vec2(t * uWarpDrift * K_WARP);
    warp = curlFBM(fp);
}
```

The WGSL chunk already ships: `src/composables/glass/webgl/shaders/flow.wgsl.ts` exports `CURL_FBM_WGSL` (VERIFIED, lines 35-47) — `fn curlFBM(p: vec2f) -> vec2f` with the central-difference partials + the `(g.y, -g.x)` cross-pairing. Its DEPENDENCY contract (lines 15-19, 26-34): the host shader MUST define `potentialFBM(vec2f) -> f32` ABOVE this splice (the host owns the noise basis; the chunk owns only the basis-agnostic curl operator; no forward-declaration in WGSL — splice-order law). paper-grid is its FIRST WGSL consumer (the chunk is already LIVE).

The decision: `docs/consumer-evidence/curl-fbm.md:55-63` (VERIFIED) — "`aurora.wgsl.ts` stays byte-untouched this cut and degrades a `warpMode: 'curl'` config to `fbm` … the aurora WGSL curl is the booked procedural tail." And `BC.W-VIZ-AURORA.md` Folds `bb-aurora-curl-warp-wgsl` "DECIDED — HOLD then BUILD-on-demand … T4's WGSL dispatch widen is the natural home." FOLD-LEDGER routes it `→BD.W-AURORA-WGSL-CURL`.

The `.frag` curl is gated behind `proof:aurora-curl-warp` (exists in package.json, VERIFIED) — W1 shared-chunk-basis-agnostic, W2 splice + opt-in `uWarpMode == 3` gate, W3 the `warpModeFor`-never-auto-curl default-unchanged fence (CLAUDE.md §BB.B1).

## (3) The build

A mechanical splice (the chunk + the host basis already exist):

1. **Splice `CURL_FBM_WGSL` into `aurora.wgsl.ts`.** The aurora WGSL already defines its own 2.02-lacunarity `fbm` (the noise basis used by `domainWarp`'s `q`/`r`, :168-171). Mint a one-line `fn potentialFBM(p: vec2f) -> f32 { return fbm(p); }` wrapper ABOVE the `${CURL_FBM_WGSL}` interpolation point (the splice-order law — `curlFBM` calls `potentialFBM`, which must be declared earlier), exactly as the `.frag` wraps its own fbm.
2. **Add the `warpMode == 3` branch.** After the `else if (warpMode == 2)` block (:179-184), add:
   ```wgsl
   } else if (warpMode == 3) {
     // BB.B1 — curl (Bridson flow warp), the WGSL twin of aurora.frag.ts:290-296.
     let fp = p * warpScale + vec2<f32>(t * warpDrift * K_WARP);
     warp = curlFBM(fp);
   }
   ```
   matching the `.frag` arm EXACTLY (same `warpScale`/`warpDrift`/`K_WARP` terms — the WGSL accessors are `u.scalars1.x`/`u.scalars1.y` per :160-161, byte-faithful to the GLSL uniforms).
3. **No new uniform** — `warpMode` is already read (`u.ints0.z`, :163); the curl branch needs no new packer lane (the typed-struct parity is trivially held). `packAuroraWGPUUniforms` is unchanged.

Fences honored: **GL-shader fence** — `aurora.frag.ts` byte-untouched (this is the WGSL arm only); the WGSL curl is the byte-faithful twin of the existing `.frag` branch. The default-byte-identical fence HOLDS (`warpModeFor` never auto-selects `'curl'` — CLAUDE.md §BB.B1 W3; a `warpMode:'fbm'` config renders byte-identical, `warpMode == 3` is reached ONLY by explicit opt-in). The shared chunk is consumed (not re-authored — `flow.wgsl.ts` is the single home). Warm-cream identity held (the curl carries no color — it is a domain warp).

## (4) The gate — born-RED → GREEN

**Extend `proof:aurora-curl-warp` in-place (no new key):**
- **W2-WGSL** — `aurora.wgsl.ts` now defines a `potentialFBM` host basis AND a `warpMode == 3` branch that calls `curlFBM`, AND interpolates `${CURL_FBM_WGSL}` (the chunk consumed, not re-inlined); born-RED on HEAD (the branch is absent, verified :174-184).
- **W3-WGSL parity** — the WGSL `warpMode == 3` branch matches the `.frag` arm (`aurora.frag.ts:290-296`) term-for-term (the `warpScale`/`warpDrift`/`K_WARP` accessors map; a divergent warp term reds the parity ΔE).
- **W3 default-unchanged fence** (preserved) — `warpModeFor` never auto-curls; `warpMode:'fbm'` byte-identical on both backends.
- **Self-test bite** — a synthetic `aurora.wgsl.ts` with a `warpMode == 3` branch that re-inlines the curl operator instead of splicing `CURL_FBM_WGSL` reds W2-WGSL (the no-re-fork discipline); a synthetic auto-curl `warpModeFor` reds W3.

Born-RED on HEAD: W2-WGSL fails (no branch). GREEN at the splice.

## (5) Paint verification

A `warpMode:'curl'` aurora on a REAL WebGPU host reads the divergence-free curl flow warp (the folded/stretched fluid-advection look, NOT the fbm source-y bulge), captured against the `.frag` curl read via **BD.W-VIZ-PARITY-METAL's** machinery — the curl config now matches across backends (no silent fbm degrade). The DEFAULT config (`warpMode:'fbm'`) is byte-identical on both backends — parity green by construction. Both modes × desktop. `proof:ba-gestalt` aurora verdict on the fresh curl capture.

## (6) Fences + risks

- **GL-shader fence** — `aurora.frag.ts` byte-untouched (WGSL arm only).
- **The splice-order law** — `potentialFBM` MUST be declared ABOVE `${CURL_FBM_WGSL}` (WGSL has no forward declaration); a wrong order is a compile error caught by the parity-capture-arms check.
- **Default-byte-identical** — `warpMode == 3` is OPT-IN; `warpModeFor` never auto-selects curl; the default-smooth parity surface stays green (the existing `proof:aurora-*` gates + W-AURORA-WGPU parity unchanged for the default).
- **No new dependency, no new uniform** — `warpMode` is already packed; the chunk already ships.
- **Profile:budget** — curl is one extra branch reached only on opt-in; negligible cost, no budget impact (the `.frag` already carries it).
