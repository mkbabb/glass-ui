# AT.W0b — C3: the color-consolidation + circularity lens (one color core, acyclic graph)

**Lens C3 — THE COLOR QUESTION.** Can glass-ui employ value.js for ALL color
facilities, and avoid circularity? This is a load-bearing architectural lens. It
builds ON the AT.W1 design (`design/AT.W1-blob-primitives.md`), the W0 six-lens
audit (L5 §2 the `/color` extraction, L6 §2 the seam), and the just-completed SOTA
wave — specifically **A5** (`W0b-A5-color-seam-sota.md`, the seam's return-space +
the inv-K-3 proof) and **A6** (`W0b-A6-blob-aurora-adversarial.md` §A6-3, which
raised "feeds value.js's C3 circular-resolution concern" and "the `/color`
extraction needs an acyclic-import proof"). This lens **answers that concern
definitively, with the published dependency graph verified at HEAD**, and proposes
the consolidation wave + the acyclic gate + the stated invariant.

Disposition: analysis only. NO src/ written, NO sibling written. Every glass-ui
and value.js claim is `file:line`-cited against HEAD. SOTA claims are web-sourced
(cited inline) and flagged knowledge-vs-web.

---

## 0. Executive summary — the seven load-bearing findings

1. **THE GRAPH IS ALREADY ACYCLIC, VERIFIED.** value.js's PUBLISHED `src/`
   imports glass-ui **ZERO times** (`grep -rn "@mkbabb/glass-ui" value.js/src/` →
   no match, exit clean). glass-ui appears in value.js ONLY at `package.json:69`
   (a **devDependency**, NOT a runtime/peer dep), `vite.config.ts`, and `demo/**`
   (dev-only, `sideEffects: ["./demo/**"]`). The runtime graph is a clean chain:
   **`glass-ui → value.js → @mkbabb/parse-that`** — a DAG, no back-edge. The "C3
   circular-resolution concern" A6-3 forwarded is **REFUTED at HEAD**: there is no
   cycle, and the demo coupling is not a cycle because demo ≠ published.

2. **glass-ui's COLOR SURFACE splits cleanly into two tiers, and the split is the
   answer to "can value.js do ALL color".** The CSS **token tier** (`tokens.css`/
   `theme.css` — `hsl()` literals, `oklch()` literals, `color-mix()`, `light-dark()`)
   is CSS-NATIVE and STAYS native. The JS **runtime tier** (the aurora/blob/derive
   path — `cssToOklch`/`oklchToLinear`/`deriveAurora`/`gamutMapStop`) is ALREADY
   100% on value.js (`color.ts:11-21` — zero local color math, inv-K-2). The answer
   to the prompt is therefore **tier-scoped, not monolithic**: consolidate the
   RUNTIME JS tier on value.js (already done for aurora; the blob seam is the only
   net-new runtime color and it consolidates too); leave the BUILD-TIME CSS token
   tier CSS-native. This is SOTA-aligned (§4).

3. **THE RUNTIME TIER IS ALREADY CONSOLIDATED — there is no "scattered color math"
   left to unify.** The W0-L5 "scattered color-resolver" framing is one generation
   STALE: K.W2c already deleted the 8 byte-for-byte duplicate color functions from
   `color.ts` and re-sourced them from value.js (`color.ts:4-10` self-documents the
   deletion). The ONLY remaining hand-rolled color-resolver is the value.js DEMO's
   `cssColorToRgb` 1×1-canvas probe (`useMetaballRenderer.ts:44-70`) — which lives
   in value.js's demo, not in glass-ui, and which AT.W4 DELETES on the lift. So
   "consolidate all runtime color on one core" is **95% already true**; AT's job is
   to (a) not REGRESS it (the blob seam must not re-introduce a hand-rolled
   resolver) and (b) HOIST the shared core to a `/color` leaf so the second consumer
   (the blob default) shares aurora's home (§5).

4. **THE `/color` EXTRACTION IS THE CONSOLIDATION, AND IT IS ACYCLIC-SAFE BY
   CONSTRUCTION.** Hoisting `cssToOklch`/`oklchToLinear` out of
   `aurora/composables/color.ts` into a `src/composables/color/` leaf (subpath
   `/color`) makes aurora DEPEND ON `/color` (a within-glass-ui edge, fine) and
   makes the blob default depend on `/color` (the 2nd consumer). value.js is the
   leaf's dependency; value.js does not depend on `/color` (it does not depend on
   glass-ui at all, finding #1). So the extraction adds NO cycle. The A6-3
   "acyclic-import proof" is satisfiable as a `proof:color-acyclic` gate (§6).

5. **THE SINGLE-CORE INVARIANT, stated precisely:** *glass-ui's runtime JS color
   math has exactly ONE source — value.js's Ottosson OKLab core, reached through
   the `/color` leaf. No glass-ui module re-implements a color conversion, parse, or
   gamut-map. value.js's PUBLISHED lib never imports glass-ui; the glass-ui↔value.js
   demo coupling is dev-only (devDependency + `demo/**`), so the published runtime
   graph `glass-ui → value.js → parse-that` is a DAG.* This is enforceable by two
   gates: `proof:single-color-core` (no glass-ui module duplicates value.js's color
   math) + `proof:color-acyclic` (the published value.js never imports glass-ui;
   the `/color` leaf's transitive graph never re-enters glass-ui's non-color
   surface). (§6)

6. **THE CSS TOKEN TIER MUST NOT BE "CONSOLIDATED ONTO value.js" — that would be an
   anti-pattern.** `color-mix()`/`oklch()`/`light-dark()` are CSS-native, evergreen-
   Baseline, and the house token discipline DEPENDS on them staying native
   (`tokens.css:1255-1260` — registering a `<color>` `@property` would freeze
   `light-dark()` re-resolution, A5 §3.3). Pulling token derivation into a JS/value.js
   build step (a "compile tokens through value.js" idea) would (a) re-introduce a
   build-time JS dependency for what the browser does natively, (b) lose runtime
   `light-dark()` / consumer-override semantics, and (c) violate the token-first
   precept (every visual behaviour is a live CSS custom property). The two tiers
   have DIFFERENT correct engines; conflating them is the trap C3 must name and
   close (§4).

7. **THE ONE LIVE CORRECTNESS SEAM C3 INHERITS FROM A5: the blob resolver's
   RETURN-SPACE.** A5 §0.1 found `defaultBlobColorResolver = oklchToLinear(cssToOklch)`
   feeds LINEAR RGB into a GAMMA shader — a darkening bug. C3 confirms this is a
   CONSOLIDATION-tier decision (it's about which value.js path the single core
   exposes), and pins it: the `/color` leaf must export BOTH `oklchToLinear` (aurora's
   bake) AND a `oklchToGammaRgb` (the blob seam's gamma `[0,1]`) — both value.js-backed,
   both on the one core. The single-core invariant does NOT mean "one return space";
   it means "one MATH source" (§5.3).

---

## 1. WHAT color facilities does glass-ui have today? (the full inventory)

The prompt's question (1). A complete census of glass-ui's color surface, each row
tagged **CSS-native** vs **value.js-backed** vs **hand-rolled**.

### 1.1 The BUILD-TIME / CSS token tier (CSS-native — stays native)

| Facility | Where | Engine | Cite |
|---|---|---|---|
| Base color tokens (`--primary`, `--foreground`, neutrals, section jewels) | `tokens.css §5` | CSS `hsl()` literals | `tokens.css:325-342,369-374,439-440` |
| Chart label / viz tokens | `tokens.css` | CSS `oklch()` literals | `tokens.css:723-726` |
| Glass under-shadows | `tokens.css §7` | CSS `oklch(0 0 0 / α)` | `tokens.css:794-797` |
| Alpha-derivative surfaces (`--surface-tint-*`, `--border-soft`, `--muted-soft`) | `tokens.css §5` | CSS `color-mix(in srgb, var(--token) N%, transparent)` | `tokens.css:393,410-433` |
| Dark-mode token re-resolution | `tokens.css .dark` | CSS `light-dark()` | `tokens.css:70,1330-1331` |
| `@theme` Tailwind color aliases + dark variant | `theme.css` | CSS `@theme` / `@variant` | (theme.css) |
| Component-local color-mix (dock/glass/chassis/drawer/typography/utilities) | 7 CSS files | CSS `color-mix()` | `dock.css`(13), `glass.css`(10), `instrument-chassis.css`(6), `utilities.css`(23), `typography.css`(1), `drawer.css`(1) — 54 sites total |

**Engine count: ONE — CSS itself.** No JS touches the token tier. This is correct
and SOTA-aligned (§4); it MUST stay this way.

### 1.2 The RUNTIME / JS color tier (value.js-backed — already consolidated)

| Facility | Where | Engine | Cite |
|---|---|---|---|
| CSS-string → OKLCh (`cssToOklch`) | aurora `color.ts:119` | value.js `parseCSSColor` + `colorUnit2` + `srgbToOKLab` + `rawOklabToOklch` | `color.ts:124-128` |
| OKLCh-stop → linear sRGB (`oklchToLinear`) | aurora `color.ts:33` | value.js `rawOklchToOklab` + `oklabToLinearSRGB` | `color.ts:34-36` |
| OKLCh-stop → hex / gamma RGB (`oklchStopToHex`) | aurora `color.ts:91` | value.js `rawOklchToOklab` + `oklabToRgb255` | `color.ts:92-93` |
| hex → OKLCh (`hexToOklchStop`) | aurora `color.ts:98` | value.js `srgbToOKLab` + `rawOklabToOklch` | `color.ts:103-105` |
| 1-seed → N-stop palette (`deriveAurora`) | aurora `color.ts:182` | value.js `gamutMapOKLab` + the Ottosson core | `color.ts:227,280-292` |
| gamut-safe stop (`gamutMapStop`) | aurora `color.ts:280` | value.js `gamutMapOKLab` + `oklabToLinearSRGB` + `isInSRGBGamut` | `color.ts:281-291` |
| palette → linear buffer (`flattenPalette`) | aurora `color.ts:45` | composes `oklchToLinear` (→ value.js) | `color.ts:53` |
| palette → CSS gradient placeholder (`paletteToCssGradient`) | aurora `color.ts:80` | composes `oklchStopToHex` (→ value.js) | `color.ts:82,86` |

**Engine count: ONE — value.js's Ottosson OKLab core.** Every JS color function in
glass-ui re-sources its math from `@mkbabb/value.js` (`color.ts:11-21` imports
`srgbToOKLab, oklabToLinearSRGB, oklabToRgb255, rawOklabToOklch, rawOklchToOklab,
gamutMapOKLab, isInSRGBGamut, parseCSSColor, colorUnit2`). The header comment block
(`color.ts:4-10`) self-documents the K.W2c deletion of "the 8 byte-for-byte
duplicates that lived here." **There is no hand-rolled color math in glass-ui src/
today.** The runtime tier is ALREADY consolidated (finding #3).

### 1.3 The in-SHADER color path (GLSL — the ONE non-value.js color math, by necessity)

| Facility | Where | Engine | Cite |
|---|---|---|---|
| Aurora linear interpolation + ACES tonemap | `aurora.frag.ts` | GLSL (operates on value.js-baked LINEAR triples; NO in-shader OKLab) | A2 §1 — aurora is "bake-CPU, interpolate-linear, tonemap-linear" |
| Metaball HSV perturb (today, to be transposed) | `metaball.frag.glsl:93-159` (value.js demo) | GLSL `rgb2hsv`/`hsv2rgb` (gamma) | A2/A5 reads |
| Metaball OKLCh perturb (AT.W5 D1 target) | (lifted shader) | GLSL OKLab math mirroring value.js's Ottosson matrices | A2 §3 |

**The shader is the ONE place color math is NOT value.js's JS core — because it runs
on the GPU.** This is NOT a consolidation gap: GLSL cannot import a TS module. The
consolidation discipline for the shader tier is DIFFERENT — it is "the GLSL
constants MIRROR value.js's matrices, asserted by a CPU-equivalence test" (A2 §3,
the W5 gate). So the shader is a THIRD tier with its own correctness contract
(matrix-mirror + CPU-equivalence), not a fourth color engine. C3 records this so
the single-core invariant is stated correctly: **one JS color core (value.js), one
CSS color engine (native), one GPU mirror (asserted-equivalent GLSL).** Three tiers,
each with the RIGHT engine; the invariant binds the JS tier.

### 1.4 The DEMO hand-rolled resolver (value.js demo — the ONLY hand-rolled color, and it's leaving)

`useMetaballRenderer.ts:44-70` (value.js demo, NOT glass-ui) — `cssColorToRgb`, a
1×1-canvas `fillStyle`+`getImageData` probe: DOM-coupled, memoised, silent-gray
fallback (`[0.5,0.5,0.5]` at `:61`). This is the LAST hand-rolled color resolver in
the constellation. AT.W4 DELETES it (replaced by the injected `ColorResolver` +
`defaultBlobColorResolver`). So **post-AT, the constellation has ZERO hand-rolled
color math** — value.js owns it all (JS), CSS owns the tokens, GLSL mirrors value.js
on the GPU. That IS total consolidation, correctly tier-scoped.

---

## 2. CAN glass-ui consolidate ALL runtime color onto value.js's core? — YES, and it's ~95% done

The prompt's question (2). Distinguish the two tiers explicitly.

### 2.1 value.js's PUBLISHED color surface is more than sufficient

value.js exports (verified `value.js/src/index.ts:57-163`, `gamut.ts`, `dispatch.ts`):

- **The full Ottosson core** (`gamut.ts`): `srgbToOKLab`, `oklabToLinearSRGB`,
  `oklabToRgb255`, `rawOklabToOklch`, `rawOklchToOklab`, `gamutMapOKLab`,
  `gamutMapSRGB`, `isInSRGBGamut`, `findCusp`, `findGamutIntersection`,
  `computeMaxSaturation`, `deltaEOK` (`index.ts:148-163`).
- **The high-level dispatch** (`dispatch.ts`): `color2`, `colorUnit2`, `gamutMap`,
  `mixColors`, `interpolateHue`, `mixColorsN` (`index.ts:118-137`).
- **The full Color class family** (`index.ts:57-75`): `Color`, `RGBColor`,
  `OKLABColor`, `OKLCHColor`, `LinearSRGBColor`, `DisplayP3Color`, `XYZColor`, … —
  15 color-space classes.
- **The parser** (`parsing/color.ts`): `parseCSSColor`, `CSSColor`,
  `registerColorNames` — the full CSS Color 4/5 surface (`oklch`/`lab`/`color(display-p3)`/
  named/hex) (`index.ts:272-278`).
- **Contrast + filter helpers**: `computeSafeAccent`, `safeAccentColor`,
  `needsContrastAdjustment`, `getOklchLightness` (`index.ts:129-134`),
  `rgb2ColorFilter`, `cssFiltersToString` (`index.ts:198`).
- **Quantization**: `quantizePixels`, `dominantColor` (`index.ts:294`).

This is a FULL color-science library. Everything glass-ui's runtime tier needs (and
everything a future runtime color facility would need — contrast checks, mixing,
P3, dominant-color extraction) is already published. **glass-ui CAN consolidate all
runtime color on value.js's core with zero gaps.** It already has, for aurora.

### 2.2 SHOULD it? — YES for the runtime JS tier, NO for the CSS token tier

| Tier | Consolidate on value.js? | Why |
|---|---|---|
| **Runtime JS** (aurora, blob, derive, future contrast/mix) | **YES — single core** | One Ottosson source eliminates the duplicate-math class (the K.W2c deletion proved the cost of the alternative); DOM-free / SSR-safe; deterministic; the equivalence test is the canary. ALREADY done for aurora; the blob seam is the only net-new runtime color and it consolidates (§5). |
| **GPU GLSL** (shader perturbation) | **MIRROR, not import** | GLSL can't import TS. The discipline is "GLSL constants = value.js matrices, asserted by CPU-equivalence" (A2 §3). |
| **Build-time CSS tokens** (`hsl()`/`oklch()`/`color-mix()`/`light-dark()`) | **NO — stay CSS-native** | §4. CSS-native is SOTA, evergreen, runtime-overridable, and the house token discipline depends on it. |

The consolidation is **tier-scoped**. "ALL color on value.js" is the WRONG framing
for the token tier — there, the answer is "all color on the BROWSER's native color
engine, which is itself an OKLab/color-mix implementation." The right unification is
**one engine per tier, the right engine per tier** — not one engine for all tiers.

### 2.3 The aurora bake is the existence-proof the consolidation works

Aurora is the worked example: a 13-stop OKLCh palette baked CPU-side through
value.js (`color.ts:33,45`) to a linear-sRGB `Float32Array`, uploaded to the GLSL
that interpolates + ACES-tonemaps in linear (A2 §1). The `color-equivalence.test.ts`
(`aurora/__tests__/`) is the canary that the CPU path agrees with value.js to 1e-6.
This is the TEMPLATE the blob default + any future runtime color facility follows.
The consolidation is not aspirational — it ships in 3.2.0 and is gated.

---

## 3. CIRCULARITY — the published dependency graph, verified at HEAD

The prompt's question (3). The load-bearing verification.

### 3.1 Does value.js's PUBLISHED src import glass-ui? — NO (verified, zero matches)

```
$ grep -rn "@mkbabb/glass-ui\|glass-ui" value.js/src/      → (no match, exit 0)
$ grep -rln "@mkbabb/glass-ui" value.js/**.{ts,vue} | grep -v demo | grep -v node_modules
    → vite.config.ts          (dev — Vite alias/plugin config, not shipped)
    → demo/color-picker/App.vue, demo/@/composables/…, demo/@/components/ui/…  (demo — not shipped)
```

value.js's PUBLISHED surface is `files: ["dist"]` (`value.js/package.json:33-35`)
and `exports["."]` → `./dist/value.js` (`:25-31`). The `dist/` build is compiled
from `src/`, which imports glass-ui **nowhere**. The glass-ui references are
EXCLUSIVELY in:
- `package.json:69` — `"@mkbabb/glass-ui": "file:../glass-ui"` under **devDependencies**
  (NOT `dependencies`, NOT a peer). devDependencies are not installed by consumers
  and not bundled into `dist/`.
- `vite.config.ts` — dev tooling (not in `files`, not shipped).
- `demo/**` — the demo app, which value.js's own `sideEffects: ["./demo/**"]`
  (`:21-24`) marks as a side-effecting NON-published tree.

**Verdict: value.js's published lib does NOT depend on glass-ui. There is no cycle.**

### 3.2 The full published runtime graph is a DAG

```
glass-ui  ──peer──▶  value.js  ──dep──▶  @mkbabb/parse-that
   │                    │                      │
   │                    └─ (no glass-ui edge)   └─ (no glass-ui edge — registry pkg, no @mkbabb/* deps)
   └─ (value.js is R1: peerDependencies["@mkbabb/value.js"] = "^0.10.0")
```

- glass-ui → value.js: `glass-ui/package.json:546` (`peerDependencies`),
  duplicated at `:563` (`optionalPeerDependencies` — itself a packaging defect AT.W6
  fixes, but orthogonal to the cycle). value.js is reached ONLY by the aurora
  family (`color.ts`, the 2 aurora tests — `grep -rn "@mkbabb/value.js" src/` →
  exactly 3 sites, all aurora).
- value.js → parse-that: `value.js/package.json:62-64` (its only runtime dep).
- parse-that → glass-ui: NONE (parse-that is a standalone parser-combinator; it has
  no `@mkbabb/*` runtime deps — knowledge: it's the bottom of the stack).

**This is a strict topological order: parse-that ◀ value.js ◀ glass-ui.** No
back-edge anywhere. The graph satisfies the Acyclic Dependencies Principle
([Wikipedia — Acyclic dependencies principle](https://en.wikipedia.org/wiki/Acyclic_dependencies_principle)).

### 3.3 Is there a RISK of a cycle if glass-ui DEEPENS the value.js coupling?

A6-3 forwarded the concern. The honest assessment:

- **The ONLY way a cycle forms is if value.js's PUBLISHED src starts importing
  glass-ui.** That is a value.js-tranche decision (K.W3: value.js deletes its demo
  blob impls and imports `@mkbabb/glass-ui/goo-blob`). **Critically: K.W3 imports
  glass-ui into value.js's DEMO, not its src/.** The demo already imports glass-ui
  (`demo/@/components/ui/*` — 20+ sites, §3.1). So K.W3 changes nothing about the
  PUBLISHED graph — it deepens the DEMO coupling, which is dev-only and already
  exists. **The cycle risk is ZERO as long as the glass-ui import stays in value.js's
  demo/ and out of its src/.** That is the invariant (§7).
- glass-ui deepening its coupling (the `/color` leaf, the blob default) only adds
  glass-ui→value.js edges (the existing direction). More edges in the SAME direction
  cannot create a cycle. The DAG is closed under "add forward edges."
- The one SUBTLE risk: if the `/color` leaf, post-extraction, were to re-import a
  glass-ui module that itself imports value.js in a way that pulls a heavy non-color
  surface back through the leaf — but that's a within-glass-ui bundling concern (the
  A5 §4 source-graph leak), not a cross-package cycle. The `proof:color-acyclic`
  gate (§6) covers both: the cross-package back-edge (value.js→glass-ui) AND the
  within-glass-ui leaf containment.

### 3.4 How the `/color` leaf + the ColorResolver seam KEEP the graph acyclic

Three mechanisms, each a deliberate part of the AT.W1 + A5 design:

1. **value.js is a Rollup `external`** (`vite.library.ts:126`, A5 §4.1) — glass-ui
   NEVER bundles value.js INTO a chunk; it emits a literal `import "@mkbabb/value.js"`.
   So the edge is always a clean package boundary, never an inlined tangle.
2. **The `/color` leaf is the SINGLE glass-ui module that holds the value.js edge for
   the blob path** (A5 §5.3). `/goo-blob` and `/watercolor-dot` are value.js-FREE
   (proven by the two-tier inv-K-3 gate, A5 §4). The leaf CONTAINS the coupling; the
   primitives don't spread it.
3. **The ColorResolver is INJECTED, not imported** (DEC-AT-2). goo-blob takes a
   `(css) => [r,g,b]` function; it does not `import` value.js. The consumer chooses to
   pass `defaultBlobColorResolver` (from `/color`, value.js-backed) OR their own.
   This keeps value.js OFF goo-blob's default graph — the coupling is the consumer's
   explicit, opt-in choice. **The inject seam is itself an acyclicity-preserving
   device**: it turns a would-be static import edge into a runtime parameter, so the
   bundle graph stays clean.

---

## 4. The TOKEN-TIER question — why CSS-native stays, and is NOT a consolidation gap (SOTA)

The most important thing C3 must settle so a future audit doesn't "finish the
consolidation" by pulling tokens into value.js.

### 4.1 CSS `color-mix()` / `oklch()` / `light-dark()` ARE the SOTA for the token tier

Web research (June 2026, cited): "Modern CSS gives you a single function —
color-mix() — that replaces a pile of Sass helpers, opacity hacks, and #hex math
gymnastics. color-mix() eliminates the need for preprocessor or JavaScript functions
for basic color manipulation, making our design systems more robust and
framework-agnostic" ([DEV — Beyond Hex and RGB: LCH, Oklab, and color-mix()](https://dev.to/mechcloud_academy/beyond-hex-and-rgb-a-new-world-of-color-with-lch-oklab-and-color-mix-1ck7)).
"By 2026 it is in all evergreen browsers with three-plus years of stable history"
([DevToolNow — Color Formats in 2026](https://www.devtoolnow.com/guides/color-formats-hex-rgb-hsl-oklch)).
The recommended single-source-of-truth pattern is "OKLCH as the base with color-mix()
for derivations … combine it with currentColor to derive surface and border tints
from a single brand variable" — which is EXACTLY glass-ui's `--surface-tint-*` /
`--border-soft` house pattern (`tokens.css:393,410-425`, CLAUDE.md color convention).

glass-ui's token tier is ALREADY the SOTA shape. There is nothing to "consolidate
onto value.js" — the browser's native color engine IS an OKLab/color-mix
implementation, and using it is the framework-agnostic, dependency-free, runtime-
overridable correct choice.

### 4.2 Pulling tokens into a value.js build step would be a REGRESSION — three reasons

1. **Loses `light-dark()` runtime re-resolution.** `tokens.css:70,1330-1331` use
   `light-dark()` so a single token resolves per `color-scheme` at PAINT time. A JS
   build step would have to emit two static values and lose the live switch — the
   exact failure the `@property syntax:"<color>"` BAN guards against
   (`tokens.css:1255-1260`, A5 §3.3). value.js cannot replicate `light-dark()`'s
   paint-time semantics from a build step.
2. **Loses consumer override.** The token-first precept (Design Axis 1): every visual
   behaviour is a live CSS custom property a consumer overrides in `:root` without
   touching library source (CLAUDE.md, "Consumer wiring"). A baked-through-value.js
   token is a DEAD value — the consumer can't retune `--surface-tint-8` by overriding
   `--foreground` and getting the mix for free. CSS `color-mix()` gives that
   composition; a JS bake does not.
3. **Re-introduces a build-time JS color dependency for what the browser does
   natively** — the same payload/pipeline-fragility rejection AN.W2 applied to
   pre-generating Tailwind utilities into the dist (CLAUDE.md "Consumer wiring",
   Option A rejected). Native CSS color is free; a value.js token-compile step is a
   pipeline liability.

**The token tier and the runtime tier have DIFFERENT correct engines. The single-
core invariant binds the RUNTIME tier only. C3 records this so "consolidate all
color on value.js" is never mis-read as "compile tokens through value.js."**

### 4.3 The ONE legitimate token↔value.js touchpoint (and it's already correct)

`paletteToCssGradient` (`color.ts:80`) bridges the JS tier to the CSS tier: it takes
an aurora OKLCh palette (JS/value.js) and emits a CSS `linear-gradient()` string of
gamma-sRGB hex stops for the first-paint placeholder (`color.ts:82-88`). This is the
RIGHT direction — JS computes, CSS renders. It does NOT pull CSS tokens into JS; it
pushes a JS-computed VALUE out as a CSS string. The blob default's `oklchToGammaRgb`
(A5 §5.2) is the same shape: JS computes the gamma triple, the consumer feeds it to
a uniform. Both are JS→value handoffs, not token-tier consolidation. Correct.

---

## 5. The `/color` leaf as the consolidation home — scope, the gamma helper, the single-return-space clarification

### 5.1 The extraction (L5 §2 + AT.W1 §1 + A5 §5, reconciled)

Hoist the value.js-backed core from `aurora/composables/color.ts` to a dedicated
leaf — proposed home `src/composables/color/` (a vueuse-free, value.js-bearing
sub-tree, mirroring the `composables/glass/` shape), subpath `@mkbabb/glass-ui/color`.
A5 §5.2 correctly RE-SCOPED the W1 export set: the leaf ships the GENERIC color
primitives only; aurora-DOMAIN symbols stay on `/aurora` (re-exported). C3 endorses
A5 §5.3's surface and adds the consolidation rationale:

```ts
// @mkbabb/glass-ui/color  — the single generic runtime color leaf (value.js-backed)
export { cssToOklch };                          // CSS string → OklchStop (DOM-free, SSR-safe)
export { oklchToLinear };                       // OklchStop → LINEAR sRGB [0,1]  (aurora bake target)
export { oklchToGammaRgb };                     // OklchStop → GAMMA sRGB [0,1]    (blob seam — A5 §2)
export { defaultBlobColorResolver };            // opt-in (css)=>[r,g,b] GAMMA seam default
export type { OklchStop, ColorResolver };       // the shared types
// NOT here: deriveAurora, AuroraHarmony, oklchStopToHex, flattenPalette,
//           paletteToCssGradient  → STAY on /aurora (their domain home; re-exported)
```

This is the consolidation made concrete: ONE leaf, ONE value.js edge for the runtime
color tier, consumed by aurora (its bake) AND the blob default (its resolver). ≥2
distinct consumer contexts (aurora render + blob primitive) — the leaf clears the
overfitting bar.

### 5.2 `oklchToGammaRgb` — the gamma helper the consolidation needs

A5 §5.2 found the gamma `[0,1]` triple does NOT exist as a standalone export today —
only `oklchStopToHex` (`color.ts:91-96`) walks the gamma path and it stringifies to
hex. The consolidation extracts the triple BEFORE the hex round-trip:

```ts
// (the consolidated leaf — value.js-backed, mirrors oklchStopToHex's path)
export function oklchToGammaRgb(stop: OklchStop): [number, number, number] {
    const [L, a, b] = rawOklchToOklab(stop.L, stop.C, stop.h);   // value.js
    const [r, g, bch] = oklabToRgb255(L, a, b);                   // value.js (gamma)
    return [r / 255, g / 255, bch / 255];
}
// defaultBlobColorResolver = (css) => oklchToGammaRgb(cssToOklch(css))   — A5 §2 Option GAMMA
```

Both `oklchToLinear` and `oklchToGammaRgb` source from value.js's Ottosson core.
**This is the precise sense in which the single-core invariant is "one MATH source,
not one return space" (finding #7):** the leaf exposes BOTH linear and gamma exits,
each value.js-derived. The shader's working-space (linear for aurora, gamma for the
current metaball, A2/A5) dictates WHICH exit a consumer takes — but the math behind
both is the one value.js core.

### 5.3 The single-core invariant is NOT "one return space" — important clarification

A naïve reading of "one color core" could try to force every consumer onto ONE exit
(all-linear, say). That is WRONG: aurora's shader tonemaps in linear (needs linear),
the current metaball shader is gamma end-to-end (needs gamma, A5 §1). Forcing one
return space would re-introduce the A5 §0.1 darkening bug. The invariant binds the
SOURCE of the math (value.js, no duplicates), not the OUTPUT space. The leaf is
allowed multiple value.js-backed exits; what it is NOT allowed is a hand-rolled
conversion that bypasses value.js. `proof:single-color-core` (§6) asserts the
latter, not the former.

---

## 6. The gates — `proof:color-acyclic` + `proof:single-color-core`

The prompt asks for both. Each fails-closed on its violation vector.

### 6.1 `proof:color-acyclic` — the graph stays a DAG (the circularity gate)

Two assertions, both cheap, both runnable without a network:

**(a) The cross-package back-edge assertion (the cycle floor).** value.js's published
src never imports glass-ui. Since value.js is a sibling repo, the glass-ui-side gate
asserts the CONTRACT it depends on:
```
// proof-color-acyclic.mjs (sketch)
// 1. glass-ui → value.js is a PEER edge (forward); assert value.js is NOT in glass-ui's
//    `dependencies` (peer-only, no bundling) — already true (package.json:546).
// 2. The acyclic CONTRACT (sibling-aware): if value.js/src is resolvable (sibling
//    layout), assert `grep -rn "@mkbabb/glass-ui" value.js/src/` === 0 matches.
//    If value.js is registry-resolved (no sibling), SKIP with a logged note
//    (the published tarball's `files:["dist"]` + devDep-only glass-ui is the proof
//    by construction — per project_ci_monorepo_layout_cascade memory: registry-resolve
//    absent siblings, skip the sibling-layout assumption).
```
This mirrors the established cross-repo proof discipline (the memory note: "fixing a
repo's npm-ci/lockfile unmasks proof:* gates that assume the sibling layout;
skip/registry-resolve absent siblings"). The gate is sibling-aware: it ASSERTS the
no-back-edge when value.js/src is reachable, and falls back to the structural proof
(devDep-only + `files:["dist"]`) when it isn't.

**(b) The within-glass-ui leaf-containment assertion (the leak floor).** Reusing the
A5 §4.2 two-tier inv-K-3 source-graph walker (`proof-consumers-static.mjs`'s
comment-stripped `collectExports`/`resolveModulePath`, `:59-119`): assert the
`/color` leaf's transitive import graph reaches value.js but NEVER re-enters
glass-ui's non-color surface (no `import` from `aurora/`, `components/`, etc. — the
leaf is a BOTTOM module within glass-ui, depended-upon, depending-on-nothing-but-
value.js). This guarantees the leaf can't form a within-package tangle that a
bundler would have to break.

**Fail-closed on:** a future value.js src importing glass-ui (cycle); a `/color` leaf
that imports back up into a glass-ui component (within-package tangle). Green at HEAD
(verified §3).

### 6.2 `proof:single-color-core` — no glass-ui module duplicates value.js's color math

The consolidation gate. Two assertions:

**(a) No-duplicate-math grep.** Assert no glass-ui src module (outside the test
fixtures) defines a color CONVERSION that value.js already owns — i.e. grep src/ for
the duplicate-math signatures K.W2c deleted (`srgbToOKLab`, `oklab*ToLinear`,
`rgb2hsv`-in-JS, a 1×1-canvas `getImageData` color probe, a local OKLab matrix
literal). Any match outside `/color` (which only COMPOSES value.js) or the value.js
import itself is a duplicate-core violation.
```
// the canary K.W2c already relies on — extend it to a gate:
//   src/**/*.ts (excluding __tests__) defining `function srgbToOKLab` | `function rgb2hsv`
//   | `getImageData(` for color | a `[[0.41…],[…]]` OKLab matrix literal  → FAIL
```
**(b) The equivalence-test inclusion.** Assert the `color-equivalence.test.ts`
(`aurora/__tests__/`) AND the new blob `defaultBlobColorResolver`-equivalence test
(A5 §4.3, asserting the GAMMA seam matches value.js to 1e-6) BOTH exist and run —
they are the runtime canaries that the consolidated paths actually agree with
value.js. A consolidation without its canary is unproven.

**Fail-closed on:** a re-introduced hand-rolled conversion (the K.W2c regression
class); a missing equivalence canary. This gate is the executable form of the inv-K-2
"single canonical color core" discipline (`color.ts:4-10`), promoted from a comment +
a test into a grepped gate.

### 6.3 Why TWO gates, not one

`proof:color-acyclic` guards the GRAPH SHAPE (no cycle, leaf containment).
`proof:single-color-core` guards the MATH PROVENANCE (one value.js source, no
duplicates). They are orthogonal: you could have an acyclic graph with duplicated
math (a glass-ui module that re-implements OKLab without importing anything — acyclic
but not single-core), OR a single-core setup that became cyclic (value.js imports
glass-ui — single math source but a cycle). Both failure modes are real; each gate
closes one. Together they encode the full invariant (§7).

---

## 7. THE INVARIANT (stated for AT.FINAL + the value.js-K hand-off)

> **inv-AT-color (the single-color-core + acyclic-graph invariant).**
>
> glass-ui's runtime JS color math has exactly **ONE source — value.js's Ottosson
> OKLab core**, reached through the `@mkbabb/glass-ui/color` leaf. No glass-ui module
> re-implements a color conversion, parse, or gamut-map (inv-K-2, promoted to a
> grepped gate `proof:single-color-core`). The leaf may expose multiple value.js-backed
> EXITS (linear / gamma) — "one core" binds the math SOURCE, not the return space.
>
> The CSS **token tier** (`tokens.css`/`theme.css`) stays CSS-NATIVE
> (`hsl()`/`oklch()`/`color-mix()`/`light-dark()`) — it is NOT consolidated onto
> value.js; the browser's native color engine is the right engine for live,
> consumer-overridable, `light-dark()`-resolving tokens. The single-core invariant
> binds the runtime JS tier ONLY.
>
> The in-shader GLSL color math MIRRORS value.js's matrices (asserted by CPU-
> equivalence, A2/W5) — it is a GPU mirror, not a fourth engine.
>
> **The published dependency graph `glass-ui → value.js → parse-that` is a DAG.**
> value.js's PUBLISHED lib (`files:["dist"]`, compiled from `src/`) NEVER imports
> glass-ui. The glass-ui↔value.js coupling is **dev-only**: a `devDependency`
> (`value.js/package.json:69`) + `vite.config.ts` + `demo/**`
> (`sideEffects:["./demo/**"]`). The value.js-K.W3 work (delete demo blob impls,
> import `@mkbabb/glass-ui/goo-blob`) deepens the DEMO coupling, which is already
> dev-only and changes the published graph NOT AT ALL. **The cycle-prevention rule:
> the glass-ui import stays in value.js's `demo/`, out of its `src/`** — asserted by
> `proof:color-acyclic`.
>
> The `/color` leaf CONTAINS the value.js edge (the blob primitives `/goo-blob`,
> `/watercolor-dot` are value.js-FREE, inv-K-3); the `ColorResolver` is INJECTED, not
> imported, turning a static import edge into a runtime parameter — both are
> acyclicity-preserving devices by construction.

---

## 8. AUGMENTED-AT proposals — wave/slice + hard gate

Build ON AT.W1 + A5; these are the C3 consolidation deltas.

| # | Proposal | Wave | Hard gate |
|---|---|---|---|
| **C3-1** | **The `/color` leaf IS the consolidation wave — fold it into W2.** Hoist `cssToOklch`/`oklchToLinear`/`oklchToGammaRgb`/`defaultBlobColorResolver` to `src/composables/color/` (subpath `/color`); aurora re-exports (no break); aurora-domain symbols (`deriveAurora`/`AuroraHarmony`/`oklchStopToHex`/`flatten*`/`palette*`) STAY on `/aurora`. This is A5-3, restated as the consolidation home. | W2 (the `/color` extraction) | `/color` exports ZERO aurora-domain symbol; aurora + `/color` both green on `verify-export-types` + `proof:resolution`; `oklchToGammaRgb` ships as a standalone value.js-backed export. |
| **C3-2** | **`proof:color-acyclic` — the circularity gate.** Sibling-aware: when `value.js/src` is reachable, assert `grep "@mkbabb/glass-ui" value.js/src/` === 0; else fall back to the structural proof (devDep-only + `files:["dist"]`). PLUS the within-glass-ui leaf-containment walk (the `/color` leaf reaches value.js but never re-enters a glass-ui component). | W6 (gate-fleet) | fails-closed on a value.js-src glass-ui import AND on a `/color`→component back-import; green at HEAD; skips-with-note when value.js is registry-resolved (memory: cross-repo sibling discipline). |
| **C3-3** | **`proof:single-color-core` — the no-duplicate-math gate.** Grep src/ (ex-tests) for the K.W2c duplicate signatures (`srgbToOKLab`/`rgb2hsv`-in-JS/1×1-canvas color probe/local OKLab matrix literal) → any match outside `/color`'s value.js composition FAILS. PLUS assert both equivalence canaries (aurora + blob-default) exist and run. | W6 (gate-fleet) | fails-closed on a re-introduced hand-rolled conversion (the K.W2c regression class) and on a missing equivalence canary; promotes inv-K-2 from comment+test to a grepped gate. |
| **C3-4** | **Record inv-AT-color in AT.FINAL + the value.js-K hand-off.** State the two-tier consolidation (runtime-on-value.js, tokens-CSS-native), the DAG with the dev-only-coupling rule, and the cycle-prevention invariant ("glass-ui stays in value.js's demo/, out of its src/"). | W8 (close) / K.W3 hand-off | the FINAL §color cites `value.js/package.json:69` (devDep) + the zero-match grep + `tokens.css:1255-1260` (the CSS-native token discipline); K.W3's hand-off note carries the cycle-prevention rule so value.js does not import glass-ui into its src/. |
| **C3-5** | **Guard the token-tier-stays-native decision against a future "finish the consolidation" audit.** A `§token-tier` note in FINAL: the CSS token tier is NOT a consolidation gap — `color-mix()`/`oklch()`/`light-dark()` are the SOTA engine for live, overridable tokens (cite the §4 sources); compiling tokens through value.js would regress `light-dark()`, consumer-override, and payload (AN.W2 precedent). | W8 (close) | the note cites the §4 SOTA + `tokens.css:70,1255-1260,393,410-425` + the AN.W2 Option-A rejection; a future audit does not re-propose a JS token-compile step. |

---

## 9. The one-line headline

glass-ui's runtime JS color is **already consolidated on value.js's single Ottosson
core** (aurora; `color.ts:11-21`, zero local math) and the blob seam consolidates too
(the `/color` leaf + the injected, value.js-backed `defaultBlobColorResolver`) — while
the CSS token tier correctly stays CSS-native (`color-mix()`/`oklch()`/`light-dark()`,
the SOTA engine for live overridable tokens, which the house `light-dark()` discipline
DEPENDS on). The circularity concern is **REFUTED at HEAD**: value.js's published
`src/` imports glass-ui **zero times** (glass-ui is a devDep + demo-only coupling), so
the runtime graph `glass-ui → value.js → parse-that` is a verified DAG; the cycle-
prevention invariant is "the glass-ui import stays in value.js's `demo/`, out of its
`src/`," enforced by `proof:color-acyclic` (graph shape) + `proof:single-color-core`
(math provenance) — two orthogonal gates that together encode inv-AT-color.

---

### Appendix — primary citations

- **glass-ui (HEAD):** `src/components/custom/aurora/composables/color.ts:4-21,33-37,
  80-96,98-105,119-129,182,227,280-292`; `src/styles/tokens.css:32-33,70,325-342,
  369-374,393,410-433,439-440,723-726,794-797,1255-1260,1330-1331`;
  `src/styles/{dock,glass,instrument-chassis,utilities,typography,drawer}.css`
  (54 color-mix sites); `vite.library.ts:121-137,126`; `package.json:543-563`;
  `scripts/proof-consumers-static.mjs:59-119`; `scripts/` proof-fleet (12 scripts).
- **value.js (HEAD):** `package.json:21-35` (`files:["dist"]`, `sideEffects:["./demo/**"]`,
  `exports["."]`), `:62-64` (only runtime dep = parse-that), `:69` (glass-ui =
  **devDependency**); `src/index.ts:57-163,272-278` (the published color surface);
  `src/units/color/gamut.ts:51-340` (the Ottosson core: `srgbToOKLab`, `oklabToLinearSRGB`,
  `oklabToRgb255`, `rawOklab↔Oklch`, `gamutMapOKLab`, `isInSRGBGamut`);
  `src/units/color/dispatch.ts:159,189,277` (`color2`, `gamutMap`, `mixColors`);
  `src/parsing/color.ts` (`parseCSSColor`); empirical: `grep -rn "@mkbabb/glass-ui"
  value.js/src/` → **0 matches**.
- **AT prior art:** `design/AT.W1-blob-primitives.md §1,§3`; `audit/W0-L5 §2,§4`;
  `audit/W0-L6 §2`; `audit/W0b-A2-oklab-shader-sota.md §1,§3`; `audit/W0b-A5-color-seam-sota.md
  §0.1,§2,§3.3,§4,§5`; `audit/W0b-A6-blob-aurora-adversarial.md §A6-3`.
- **SOTA (web, June 2026):**
  [DEV — Beyond Hex and RGB: LCH, Oklab, and color-mix()](https://dev.to/mechcloud_academy/beyond-hex-and-rgb-a-new-world-of-color-with-lch-oklab-and-color-mix-1ck7);
  [DevToolNow — Color Formats in 2026](https://www.devtoolnow.com/guides/color-formats-hex-rgb-hsl-oklch);
  [MDN — color-mix()](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Values/color_value/color-mix);
  [Color.js — Let's get serious about color](https://colorjs.io/);
  [Design Tokens Color Module 2025.10](https://www.designtokens.org/tr/drafts/color/);
  [Wikipedia — Acyclic dependencies principle](https://en.wikipedia.org/wiki/Acyclic_dependencies_principle);
  [Railsware — Analyzing ES6 Circular Dependencies](https://railsware.com/blog/how-to-analyze-circular-dependencies-in-es6/).
- **Knowledge-vs-web provenance:** the dependency-graph verification (§3) is
  FIRST-HAND (grep + package.json reads at HEAD), not web. The two-tier consolidation
  judgment (§2,§4) is first-hand (source reads) corroborated by web SOTA on
  color-mix()/OKLCH being the 2026 token-tier standard. The acyclic-dependencies
  principle framing is web-sourced. parse-that having no `@mkbabb/*` runtime deps is
  KNOWLEDGE (the bottom-of-stack parser-combinator), not re-verified here.
