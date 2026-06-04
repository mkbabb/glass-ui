# AT.W1c design slice — the `/color` leaf, inv-AT-color, and the hardened gate set

The color-consolidation answer (the user's question: "can glass-ui employ value.js for
ALL color, avoiding circularity?") + the `/color` leaf contract + the full hardened
gate set. Synthesizes `audit/W0b-C3` (color/circularity), `C1` (blob/aurora gates), `C2`
(correctness gates), and `A5` (the seam).

## §1 — The three color tiers, three correct engines

glass-ui's color surface is NOT one thing — it is three tiers, each with a different
correct engine. "Consolidate all color onto value.js" is tier-scoped: YES for runtime
JS, NO for CSS tokens.

| Tier | Where | Engine | AT action |
|---|---|---|---|
| **CSS tokens** | `tokens.css`/`theme.css` — `hsl()`/`oklch()`/`color-mix()`/`light-dark()` (54 color-mix sites) | CSS-native (browser-resolved) | **STAYS native** — GUARD against a future "finish the consolidation" |
| **Runtime JS** | aurora/blob/`deriveAurora` (`color.ts`) | value.js (inv-K-2) | finish — `/color` leaf is the one home |
| **GLSL** | aurora.frag / metaball.frag | mirrors value.js's Ottosson math on the GPU | the W5 fn pair |

**Why the CSS tier stays native (the guard rationale):** compiling tokens through
value.js would regress `light-dark()` runtime re-resolution, break the token-first
consumer-override precept (a consumer overrides `--primary` and everything re-derives
via CSS `color-mix` — impossible if baked in JS), and bloat the payload (the AN.W2
precedent rejected pre-generating utilities for the same reason). `color-mix()` +
`oklch()` ARE the 2026 SOTA token engine. The `§token-tier` FINAL note records this so a
later audit does not "helpfully" move it into JS.

**Why the runtime tier is already done:** `color.ts:11-21` imports nine Ottosson
primitives from `@mkbabb/value.js` (`srgbToOKLab`, `oklab↔oklch`, `oklab→linear/rgb255`,
`gamutMapOKLab`, `isInSRGBGamut`, `parseCSSColor`, `colorUnit2`); K.W2c deleted the eight
byte-for-byte local duplicates. The ONLY remaining hand-rolled runtime resolver in the
constellation is value.js's DEMO `cssColorToRgb` 1×1-canvas probe (`useMetaballRenderer.ts:44`)
— which AT.W4 deletes (replaced by the injected `ColorResolver`). Post-AT: zero
hand-rolled runtime color math anywhere.

## §2 — The `/color` leaf (AT.W2; C3-1)

Hoist the value.js-backed core out of aurora-local into one shared leaf:

```ts
// @mkbabb/glass-ui/color  — src/composables/color/
export { cssToOklch, oklchToLinear, oklchToGammaRgb, oklchStopToHex };
export { defaultBlobColorResolver };   // (css) => gamma [r,g,b], via cssToOklch→oklchToGammaRgb
export type { OklchStop };
// aurora-DOMAIN symbols (deriveAurora, AuroraHarmony, the preset bake) stay on /aurora,
// which re-exports the core from /color (no break).
```

**"One core" binds the MATH SOURCE, not the return space.** The leaf ships BOTH:
- `oklchToLinear` — aurora's bake target (the shader ACES-tonemaps in linear; the LUT
  stays linear).
- `oklchToGammaRgb` — the blob seam's exit (DEC-AT-7: the W4 faithful lift paints in
  gamma; the default resolver returns gamma so the blob does not paint too-dark).

Forcing a single return space re-introduces the A5/A2 darkening defect — the leaf
exposes both, both value.js-backed.

## §3 — inv-AT-color + the acyclic proof

**inv-AT-color:** *one runtime-JS color source (value.js, via the `/color` leaf); the
CSS token tier stays native; the GLSL tier mirrors value.js; the published graph is a
DAG because value.js's PUBLISHED lib never imports glass-ui — the coupling is dev-only.*

**Circularity REFUTED at HEAD (first-hand verified, `audit/W0b-C3`):** value.js's
published `src/` imports `@mkbabb/glass-ui` ZERO times; glass-ui appears in value.js
ONLY as a `devDependency` + `vite.config.ts` + `demo/**`. The runtime graph
`consumers → glass-ui → value.js → parse-that` is a strict DAG. The A6-3 "circular
resolution" concern does not exist; the `/color` leaf + the injected `ColorResolver`
keep it that way (the blob never reaches back into a component; the demo coupling never
enters either published graph).

## §4 — The hardened gate set (full fail-closed specs)

Two-tier idiom: a SOURCE-graph gate (the comment-stripped transitive import walker)
BENEATH a DIST-floor gate (a built-artifact grep). Recorded in FINAL as the house
pattern.

### Color gates (W6)

- **`proof:color-acyclic`** — sibling-aware: `grep "@mkbabb/glass-ui" value.js/src/ === 0`
  when value.js is checked out (else the structural devDep + `files:["dist"]` proof);
  PLUS a within-glass-ui leaf-containment walk asserting `/color` never back-imports a
  component. Fails on a value.js-src glass-ui import OR a `/color`→component cycle.
- **`proof:single-color-core`** — grep for the K.W2c duplicate signatures (`srgbToOKLab`,
  in-JS `rgb2hsv`, a 1×1-canvas probe, a local OKLab matrix) ANYWHERE outside `/color`'s
  value.js composition → any match fails; asserts both equivalence canaries
  (`color-equivalence.test.ts` + the new blob port) exist. Orthogonal to acyclic: this
  catches acyclic-but-duplicated; acyclic catches single-but-cyclic.

### Substrate + shader gates (W2/W5)

- **`proof:webgl-substrate-single`** (W2) — one WebGL bootstrap under `glass/webgl/`
  (allowlist the webgpu path); the **scheduling-parity table** (off-screen parks ·
  tab-hidden parks · reduced-motion=1 frame · resume-while-suspended unreachable ·
  aurora steady-state parks · context-restored re-arms · DPR≤2). W2 is green only when
  BOTH pixel-parity AND scheduling-parity pass — the byte-parity gate alone is blind to
  a scheduling downgrade (C6 must-fix #4).
- **`proof:webgl-golden`** (W2,W5; PROMOTE not construct) — `scripts/profile-aurora.mjs`
  ALREADY spawns headless-Chrome WebGL2 over CDP, holds a real context, calls
  `gl.readPixels`, with `--disable-gpu` SwiftShader determinism wired. AT PROMOTES this
  `profile:` to a golden proof: aurora before/after the W2 fold within ±1 LSB; the W5
  on-GPU zero-perturb output == `linearToSrgb(uBaseColor)`. `{local,ci}` not release;
  a `readPixelStats`-tolerance fail-soft fallback. **CPU-equivalence is binding AND
  insufficient; this is the affordable GPU floor under it.**
- **`proof:blob-value-free`** (W3,W4) — two-tier: the source-graph walker (reaches
  `/watercolor-dot`, which has no dist value.js to grep) BENEATH the existing
  `proof:no-value-default` dist grep. The no-resolver throw-message must contain
  `defaultBlobColorResolver`.
- **CPU-equivalence (8-assertion)** (W5) — over a textually-parallel
  `metaball-color.glsl-port.ts` (asymmetric witness `#3a7bd5` so transpose/source errors
  diverge): round-trip 1e-6 · exact-matrix · OETF agreement · full-chain space check ·
  out-of-gamut no-hue-drift sweep · perceptual-uniformity witness (OKLCh ΔL < HSV ΔL for
  the same rotation — proves D1 was worth it) · radians-unit · premultiply-ordering.

### Correctness gates (W6)

- **`proof:peer-optional`** — RED at HEAD. A peer P is `optional:true` IFF its literal is
  absent from `dist/glass-ui.js` (every heavy peer is a Rollup `external` → a derived
  fact). The fix: replace the non-standard `optionalPeerDependencies` field (NPM reads
  it as nothing) with `peerDependenciesMeta[x].optional`; correct CLAUDE.md:362.
- **`proof:vueuse-free-root`** — RED at HEAD. Retarget `proof-consumers-static.mjs`'s
  comment-stripped transitive walker FROM `src/index.ts`, extended to scan `.vue
  <script>` imports. RED: `index.ts:104`→`DataTable.vue:3 useElementSize`. The born-green
  fix (swap to an in-house `useResizeObserver`, keep the DataTable root) MUST land before
  the gate goes green — the one hard W6 ordering edge.

### Dock + doc gates (W6/W7)

- **`proof:strict-templates`** (W6) — `checkUnknownProps:true`; `<GlassDock bogus-prop>`
  RED. The library-wide silent-no-op closer (W1b §1).
- **`proof:dock-motion-parity`** (W6) — VT timing-fn ≡ `--dock-motion-resize` easing.
- **`proof:doc-consistency`** (W7) — every CLAUDE.md `custom/<dir>` + cited dep resolves.
- **`proof:font-axes`** (W7) — every `font-variation-settings` axis `typography.css`
  declares is carried by a shipped face. KEPT (AT ships the Fraunces slice; words +
  value.js = the ≥2). The synthesis's "drop if no consumer" is conditional and does NOT
  apply — AT has the consumer.

## §5 — The intra-W6 ordering (the one hard edge)

DataTable `useElementSize`→`useResizeObserver` MUST precede `proof:vueuse-free-root`
green + the `@vueuse` flip-to-optional in `proof:peer-optional`. Everything else
(keyframes `[2.2.0,3.0.0]` matrix, peer-optional, the color gates, the dock slices) is
file-disjoint and order-free.
