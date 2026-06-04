# AT.W0b — A5: the color-resolver seam + CSS color SOTA (the inv-K-3 + /color leaf)

**Lens A5** — the augment/harden pass over the `ColorResolver` seam (design
`AT.W1-blob-primitives.md §3`) + the `/color` leaf extraction (§1), against
current CSS-color state-of-the-art. Built ON the W0 six-lens audit (L5 §2, L6 §2)
and the AT.W1 design; this lens does NOT re-derive — it **stress-tests the seam
shape, surfaces one latent correctness bug the prior lenses missed, and hardens
the inv-K-3 proof**. Feeds the C3 color-consolidation lens.

Disposition: analysis only. NO src/ written, NO sibling written. Every claim is
`file:line`-cited against glass-ui HEAD + the value.js reference impl, with SOTA
sourced from web research (cited inline; knowledge-vs-web flagged where relevant).

---

## 0. Executive summary — the five load-bearing findings

1. **THE LATENT BUG (new, prior lenses missed it): the W1 `defaultBlobColorResolver`
   feeds LINEAR RGB into a shader that expects GAMMA sRGB.** The design's
   `defaultBlobColorResolver = (css) => oklchToLinear(cssToOklch(css))`
   (`AT.W1 §3:99`, `§1:44`) returns **linear-sRGB** `[0,1]` (`color.ts:33-37` —
   `oklabToLinearSRGB`, the GPU-bake target). But the metaball shader's color path
   operates in **gamma sRGB**: the demo's canvas resolver reads the canvas's sRGB
   *byte* `d[0]/255` with NO linearization (`useMetaballRenderer.ts:66`), and the
   shader's `rgb2hsv`/`hsv2rgb` (`metaball.frag.glsl:93-106`) are the standard
   gamma-space HSV transforms, fed straight to `fragColor` with no
   linear→gamma encode (`:159`). So `defaultBlobColorResolver` as specified would
   feed a **darker, desaturated** base color than the demo — a visible regression
   on the exact primitive AT is lifting. This is not a nit: linear vs gamma for
   mid-tones is a ~2× luminance error. **The seam's RETURN-SPACE is unspecified in
   W1 and MUST be pinned (§2).** This finding alone justifies the A5 pass.

2. **CSS-native (relative-color / `color()` / Houdini `@property`) CANNOT feed the
   shader uniform — the JS resolver seam is the correct architecture, SOTA-confirmed.**
   The injected `(css) => [r,g,b]` is right; CSS-native is a dead end for this job
   for three independent reasons (§3). The seam shape (DI inject-or-throw) survives.

3. **The grep IS sufficient for the inv-K-3 dist proof — because `@mkbabb/value.js`
   is a Rollup `external`** (`vite.library.ts:126`), so it can NEVER be transitively
   bundled INTO `dist/goo-blob.js`; it can only appear as a literal `import
   "@mkbabb/value.js"` specifier. Verified empirically: across the whole built dist,
   the literal appears in **exactly one** chunk — `dist/aurora.js` — and nowhere
   else. So a `readFileSync(dist/goo-blob.js).includes("@mkbabb/value.js")` assertion
   is a SOUND inv-K-3 floor. BUT there is one transitive-SOURCE hazard the grep alone
   misses: a careless `export … from "../color"` re-export in the goo-blob barrel
   would pull `/color` (which imports value.js) into the chunk. The harden is a
   **source-import-graph assertion** (goo-blob's transitive source imports never
   reach `aurora/composables/color.ts` or `@mkbabb/value.js`), NOT just a dist grep
   (§4). Two-tier: dist-grep (the floor) + source-graph (the early, precise gate).

4. **The `/color` leaf is the right home, but its NAME and SCOPE in W1 are wrong.**
   `AT.W1 §1:42` exports `deriveAurora`, `AuroraHarmony`, `oklchStopToHex` from
   `/color` — those are **aurora-domain** symbols (palette-ramp seeding), not a
   generic color leaf. A `/color` subpath that ships `deriveAurora` is an
   aurora-coupled leaf wearing a generic name. Pin the leaf to the **2 functions
   the seam actually needs** (`cssToOklch`, `oklchToLinear`) + the resolver factory,
   and leave `deriveAurora`/harmony on `/aurora` (re-exported, not relocated) (§5).

5. **`@property syntax:"<color>"` is BANNED in glass-ui by an existing, deliberate
   discipline** (`tokens.css:1255-1260` — a registered `<color>` freezes
   `light-dark()` descendant re-resolution). So any "use Houdini typed color" idea
   for the seam is doubly dead: it doesn't extract to JS anyway (§3.3), AND it would
   violate the house token discipline. Record this so C3 does not relitigate it.

---

## 1. The seam, restated precisely (what W1 ships, what the shader needs)

### 1.1 The W1 contract

`AT.W1 §3` (and L6 §2.3) define:

```ts
export type ColorResolver = (css: string) => [number, number, number]; // "linear [0,1] RGB"  (AT.W1 §3:90)
// goo-blob REQUIRES one (prop or inject); no-resolver mount throws (dev-loud).
// defaultBlobColorResolver = (css) => oklchToLinear(cssToOklch(css))   (AT.W1 §3:99)  — opt-in, on /color.
```

The seam SHAPE — required-injected pure fn, fail-fast, opt-in default on a separate
subpath so value.js reach stays the consumer's choice — is **correct and survives
this lens**. It cleanly closes three things the demo got wrong: the DOM-coupling
(`useMetaballRenderer.ts:46` `typeof document === "undefined"` guard), the
silent-gray fallback (`:61` `[0.5,0.5,0.5]`), and the inv-K-3 baked-default
coupling. No quarrel with the architecture.

### 1.2 The mismatch the architecture hides

The quarrel is the **return space**, which W1 labels "linear [0,1] RGB" (`§3:90`)
and implements as `oklchToLinear` (`§3:99`). Trace what the shader actually consumes:

| Stage | Space | Cite |
|---|---|---|
| demo resolver output (the thing being replaced) | **gamma sRGB** byte `/255` | `useMetaballRenderer.ts:66` (`d[0]!/255` — raw canvas sRGB byte, no decode) |
| `uBaseColor` uniform | gamma sRGB (whatever the resolver hands it) | `useMetaballRenderer.ts:198` |
| shader `rgb2hsv(uBaseColor)` | gamma-space HSV | `metaball.frag.glsl:146,93-100` |
| shader output `fragColor = vec4(rgb*alpha, alpha)` | **gamma sRGB** (no linear→sRGB encode) | `metaball.frag.glsl:159` |

The shader is an **end-to-end gamma-sRGB pipeline**. It never linearizes the base
color and never gamma-encodes the output — it is a "paint this CSS color, perturbed"
shader, not a lit/blended linear-space renderer (contrast aurora, which DOES
tonemap in linear — `color.ts:28` "the shader ACES-tonemaps in linear, so the LUT
must stay linear"). Feeding it `oklchToLinear(...)` (linear `[0,1]`) hands the HSV
math a wrong-curve value: for a mid-gray `#808080`, gamma `0.502` vs linear `~0.216`
— the blob renders markedly darker and the HSV saturation/value perturbations land
on the wrong base. **This is a real, visible defect on the headline primitive.**

> Per the standing directive (web research corroborated): "pass linear color space
> to the shaders, let the pipeline work in linear, gamma-correct at the very end"
> ([LearnOpenGL — Gamma Correction](https://learnopengl.com/Advanced-Lighting/Gamma-Correction);
> [WebGL Color Management — Offscreen Canvas](https://offscreencanvas.com/issues/webgl-color-management/)).
> The CORRECT long-term fix is a fully linear pipeline. But that is a SHADER change
> (linearize base + gamma-encode output) coupled to the D1 transposition (W5), not a
> resolver-contract change. For W4 (lift on the UNCHANGED shader, per the W1/L6
> byte-isolation discipline), the resolver MUST match the shader's current gamma
> space or the lift is not faithful.

---

## 2. HARDEN — pin the seam's return-space (the §0.1 bug fix)

The seam type is `(css) => [r,g,b]` but `[r,g,b]` in WHAT space is the load-bearing
contract. Two coherent options; W1 silently picked the wrong one.

- **Option GAMMA (faithful-lift, recommended for W4):** `ColorResolver` returns
  **gamma sRGB `[0,1]`** — byte-identical-in-intent to the demo's `d/255`
  (`useMetaballRenderer.ts:66`). `defaultBlobColorResolver` becomes
  `(css) => oklchToRgb255(cssToOklch) / 255` (value.js's `oklabToRgb255` path,
  already used by `oklchStopToHex` at `color.ts:91-96`) — i.e. the **gamma**
  255-byte path, NOT `oklchToLinear`. This is DOM-free, SSR-safe, throws on invalid
  (all the wins W1 wanted) AND space-correct for the current shader. The W4 lift is
  then faithful; the blob looks like the demo.

- **Option LINEAR (forward-looking, deferred to W5):** the seam returns **linear**
  `[0,1]` AND the D1 shader (W5) is rewritten to a full linear pipeline (linearize
  is then a no-op since the resolver pre-linearized; gamma-encode the output at
  `:159`). This is the architecturally-purer end-state and aligns with aurora — but
  it bundles a shader change into the resolver contract, breaking the W4/W5
  byte-isolation the plan prizes.

**Recommendation — make it explicit, not implicit:** the `ColorResolver` type
carries its space in the NAME or a doc-pinned invariant. Ship the seam as
**gamma-sRGB-returning** for W4 (faithful lift), and let W5's D1 transposition
decide whether to flip the whole pipeline to linear as a deliberate, gated change
(the W5 vitest equivalence spec — `AT.W1 §6` — gains a "base-color round-trips in
the declared space" assertion). Either way the **return space is a named contract**,
not an unstated assumption. The W1 doc's "linear [0,1] RGB" label (`§3:90`) and the
`oklchToLinear` impl (`§3:99`) are an internal contradiction with the gamma shader
and must be reconciled at W1-finalize, BEFORE W4 codes against them.

> Why prior lenses missed it: L5/L6 correctly identified the canvas resolver as the
> anti-pattern to delete and `cssToOklch` as the SSR-safe replacement — but
> `cssToOklch` → `oklchToLinear` was reached for because it's the function that
> already exists in `color.ts` (the AURORA bake target), and the space-mismatch with
> the metaball's gamma shader was never traced. The seam needs `cssToOklch` →
> **gamma**-RGB (a function that does NOT yet exist as a public helper — see §5).

---

## 3. Is the injected JS resolver the right seam, or could CSS-native feed the uniform?

The prompt's core question. **Answer: the JS resolver is correct; CSS-native
relative-color/`color()`/Houdini cannot feed the uniform.** Three independent
SOTA-grounded reasons.

### 3.1 Relative color syntax is a CSS *authoring* tool — it does not extract to JS channels

CSS Color 5 relative syntax (`oklch(from var(--c) l c h)`) is ~89.6% global support
as of Feb 2026 and shipped in all evergreens
([MDN — Using relative colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors);
[Chrome — CSS relative color syntax](https://developer.chrome.com/blog/css-relative-color-syntax)).
But it computes WITHIN CSS — to get `[r,g,b]` for a `gl.uniform3f` you must read it
back, and the readback is broken for this purpose:

- `getComputedStyle` **does not reliably resolve relative-color (or `oklch()`) to
  concrete channels** — it "frequently returns the relative color as a string rather
  than the final calculated color … developers may need alternative approaches like
  using canvas elements to extract the precise final color"
  ([MDN — getComputedStyle / CSS value serialization](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/CSS_value_serialization);
  the medium write-up "How to Use CSS Relative Colors to Get the Final Hex Color in
  JavaScript" exists PRECISELY because the naive readback fails). So to feed the
  uniform from a CSS relative color you'd fall BACK to the canvas trick — the exact
  DOM-coupled anti-pattern inv-K-3 + K.W2c deleted (`color.ts:108-118`). Net: zero
  gain, re-introduces the deleted hack.

- `currentColor` serializes as the literal string `"currentcolor"` via
  `getComputedStyle` ([MDN](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle)),
  so even the "let the consumer pass `currentColor` and we resolve it" ergonomic is a
  trap for a JS-channel consumer.

The injected resolver is what lets a consumer plug in a REAL parser (value.js's
`parseCSSColor`, `color.ts:124`) that handles `oklch()`, `lab()`, `color(display-p3 …)`,
named colors, hex — DOM-free, deterministically, in the declared space. CSS-native
gives you none of that at the JS boundary.

### 3.2 `color()` / wide-gamut: the resolver is the ONLY place gamut policy can live

A consumer may pass `color(display-p3 1 0 0)` (a color outside sRGB). The shader's
`uBaseColor` is an sRGB-ish `vec3`; a P3-red must be gamut-mapped to sRGB before it
becomes 3 floats. That mapping is a POLICY (clip vs perceptual gamut-map) — value.js
owns a real one (`gamutMapOKLab`, `color.ts:282`), the canvas trick owns an
accidental one (browser clip). Only an injected resolver lets the consumer choose.
CSS `color()` in a `background` would gamut-map per the browser; but you cannot read
THAT mapped value back out (§3.1). So the resolver is not just convenient — it is the
only seam where wide-gamut policy is expressible for a numeric uniform.

### 3.3 Houdini `@property syntax:"<color>"` is interpolation-only AND banned in glass-ui

The "register the color as a typed custom prop so it interpolates" Houdini trick
([web.dev — @property](https://web.dev/articles/at-property)) is for **CSS gradient/
transition interpolation** — it still does not expose concrete channels to JS
(reading a registered `<color>` prop via `getComputedStyle` returns its serialized
string, same limitation as §3.1). Worse for glass-ui: a registered `<color>` custom
property **freezes `light-dark()` descendant re-resolution** — which is exactly why
`tokens.css:1255-1260` makes it a **BINDING DISCIPLINE** that glass-ui's tokens stay
UNREGISTERED ("glass-ui's only `@property` registrations (§18) are non-color
(percentage/length)"). So Houdini typed-color is dead twice over: useless for the
uniform AND forbidden by house rule. **Record for C3:** do not propose a typed-color
token path; it collides with the `light-dark()` architecture.

### 3.4 Verdict

The injected `ColorResolver: (css) => [r,g,b]` is the **architecturally correct**
seam — it is the ONLY mechanism that (a) resolves modern CSS color forms
(`oklch`/`lab`/`color()`/named) to numeric channels, (b) is DOM-free / SSR-safe,
(c) lets the consumer own gamut + space policy, and (d) keeps value.js reach
opt-in. CSS-native relative-color/`color()`/Houdini are genuine SOTA and genuinely
useful for CSS-authored color — but the JS↔uniform boundary is the one place they
do not reach. The seam is right; only its return-SPACE needs pinning (§2).

---

## 4. HARDEN the inv-K-3 proof — is the grep sufficient, or is a transitive check needed?

`AT.W1 §3:112` proposes `proof:no-value-default` as "a `proof:*` grep asserting
`dist/goo-blob.js` + `dist/watercolor-dot.js` import no `@mkbabb/value.js`." L6 §6
analogizes it to the `/motion-core` engine-free proof (AP.W3 R0G-7). Assess both
the sufficiency and the right tier.

### 4.1 The dist grep IS sound — because value.js is a Rollup `external`

`vite.library.ts:121-137` lists `@mkbabb/value.js` in `libraryExternal` (`:126`) +
`globals` (`:137`). Rollup therefore **never bundles value.js into any chunk** — it
emits a literal `import … from "@mkbabb/value.js"` and leaves resolution to the
consumer. Empirically verified at HEAD: `grep -l "@mkbabb/value.js" dist/*.js`
returns **exactly one file — `dist/aurora.js`** — and no other chunk. So:

> Because value.js is external, "does `dist/goo-blob.js` reach value.js" reduces
> EXACTLY to "does the literal string `@mkbabb/value.js` appear in
> `dist/goo-blob.js`". There is no transitive-bundling path that could hide a
> value.js reach behind an inlined symbol — the external guarantee makes the grep
> **complete**, not merely heuristic. (This is materially stronger than the
> `/motion-core` engine-free proof, which guards against an INLINED keyframes.js;
> here the externalization does half the proof's work for free.)

So the dist-grep floor (`readFileSync(dist/goo-blob.js).includes("@mkbabb/value.js")
=== false`) is a SOUND inv-K-3 assertion. Keep it as the **release-tier floor**
(it runs on the actual published artefact — the thing a consumer installs).

### 4.2 The grep is NOT the EARLY gate — add a source-import-graph assertion

The dist grep has one weakness: it fires LATE (post-build) and gives a poor error
("value.js found in dist" — but WHERE did it leak in from?). The leak vector is a
**source re-export**: if `goo-blob/index.ts` (or its flat barrel `src/goo-blob.ts`)
does `export … from "../color"` or `export … from "../aurora/composables/color"`,
the goo-blob chunk inherits value.js. This is an easy, plausible mistake precisely
because the W1 design SITS the `defaultBlobColorResolver` on `/color` and goo-blob
exports the `ColorResolver` TYPE — a refactor could fat-finger the value re-export.

**Harden:** add a **source-graph proof** (mirroring `proof-consumers-static.mjs`'s
`collectExports`/`resolveModulePath` walk, which already does comment-stripped
transitive import resolution — `proof-consumers-static.mjs:59-119`): from
`src/goo-blob.ts` + `src/watercolor-dot.ts`, walk the transitive `import`/`export …
from` graph and assert it NEVER reaches `@mkbabb/value.js` OR
`aurora/composables/color.ts`. This:
- fires at the SOURCE (precise blame: "`goo-blob/index.ts:N` re-exports `../color`"),
- runs WITHOUT a build (fast, pre-commit-able),
- is the precise analog of the existing root-surface `unionExports` walk this repo
  already trusts (`proof-consumers-static.mjs:121-179`).

**Two-tier inv-K-3 gate (the harden):**
1. `proof:blob-value-free` (source) — transitive source-import graph of
   `/goo-blob` + `/watercolor-dot` never reaches value.js or `color.ts`. EARLY, precise.
2. `proof:no-value-default` (dist) — `dist/goo-blob.js` + `dist/watercolor-dot.js`
   contain no `@mkbabb/value.js` literal. RELEASE floor, on the real artefact.

Tier 1 catches the source mistake at authoring time; tier 2 is the
publish-the-truth backstop on the externalized artefact. Together they fail-closed
on every inv-K-3 violation vector. (The W1 `§3:114` "no-resolver mount throws" unit
+ the "`defaultBlobColorResolver` matches value.js to 1e-6" unit stay — they prove
the RUNTIME contract; the two graph proofs prove the BUNDLE contract.)

### 4.3 One more inv-K-3 hardening: the `defaultBlobColorResolver` equivalence test must assert the DECLARED SPACE

`AT.W1 §3:115` proposes a unit asserting `defaultBlobColorResolver` "matches value.js
linear RGB to 1e-6 (mirrors `aurora/__tests__/color-equivalence`)." Per §2, if the
seam is pinned to **gamma** (recommended for W4), this test must assert **gamma**
RGB equivalence — `oklchStopToHex`-path bytes (`color.ts:91-96`) / 255, NOT
`oklchToLinear`. The existing aurora `color-equivalence.test.ts` is the template
(`__tests__/color-equivalence.test.ts:1-55`: a STOPS × HEXES sweep at `EPS=1e-6`) —
the blob test reuses its harness shape but asserts the SEAM's declared space, which
is the §2 contract made executable. **The space the test asserts IS the inv-K-3
contract's missing half** — without it, the seam ships space-ambiguous.

---

## 5. Is `/color` the right home for the leaf? — yes for the seam, NO for the W1 export set

### 5.1 The extraction is sound

L5 §2.2 + AT.W1 §1 hoist the value.js-backed color core out of `aurora/composables/
color.ts` into a `/color` leaf so "aurora + the opt-in blob resolver share ONE home"
(`AT.W1 §1:40-41`). This is the correct gestalt: `cssToOklch` + `oklchToLinear` are
NOT aurora-specific — they're generic CSS-color→numeric primitives, and the blob
default is their second consumer (≥2 met: aurora + blob-default). Aurora re-exports
from `/color` so no break (`AT.W1 §3:108`). Agreed.

### 5.2 But the W1 export set over-scopes `/color` with aurora-domain symbols

`AT.W1 §1:42-44` ships from `/color`:
```ts
export { cssToOklch, oklchToLinear, oklchStopToHex, deriveAurora };
export type { OklchStop, AuroraHarmony };
export { defaultBlobColorResolver };
```

`deriveAurora` (`color.ts:182`) and `AuroraHarmony` (`color.ts:140`) are
**aurora palette-ramp** primitives — they seed ONE color into an N-stop *aurora*
gradient with `analogous`/`complementary`/`triad`/`monochrome` harmony
(`color.ts:232-254`). That is an aurora-DOMAIN concept, not a generic color leaf.
Shipping `deriveAurora` from a subpath named `/color` is a leaf wearing a name two
sizes too big — and it invites a future audit to ask "why does the generic color
leaf know about aurora harmony ramps?" (the inverse of the overfitting trap: a
mis-homed export, not a missing consumer).

**Harden — pin `/color` to the seam's actual surface:**
```ts
// @mkbabb/glass-ui/color  — generic CSS-color → numeric leaf (the seam's home)
export { cssToOklch };                         // CSS string → OklchStop (DOM-free)
export { oklchToLinear, oklchToGammaRgb };     // OklchStop → linear | gamma [0,1]   (§2)
export { defaultBlobColorResolver };           // the opt-in (css)=>[r,g,b] seam default
export type { OklchStop, ColorResolver };      // the shared types
```
- `oklchToGammaRgb` is the §2 gamma helper the seam needs and that does NOT yet
  exist as a standalone export (today only `oklchStopToHex` walks the gamma path,
  `color.ts:91-96`, and it stringifies to hex — the seam needs the `[0,1]` triple
  BEFORE the hex round-trip). Extract the gamma triple as its own helper.
- `deriveAurora`, `AuroraHarmony`, `oklchStopToHex`, `paletteToCssGradient`,
  `flattenPalette` STAY on `/aurora` (their natural domain home; aurora consumes the
  leaf's `cssToOklch`/`oklchToLinear`, not the reverse). `/color` does not need to
  know aurora exists.

This keeps `/color` a TRUE generic leaf (the C3 color-consolidation target it's
meant to seed) and keeps the aurora-domain ramp logic where it belongs. The ≥2 bar
for the leaf is met by its real consumers: aurora's bake (`oklchToLinear`) + the
blob seam (`oklchToGammaRgb` + `cssToOklch`).

### 5.3 `/color` and the inv-16 / value.js-peer accounting

`/color` is the ONE blob-adjacent subpath that DOES reach value.js (it IS the
value.js-backed core — `color.ts:11-21`). That is correct and intended: value.js
lives HERE, opt-in (`AT.W1 §1:41`). The two blob subpaths (`/goo-blob`,
`/watercolor-dot`) must NOT re-export from `/color` (that's the §4.2 leak the source-
graph proof guards). The clean accounting:
- `/color` → value.js peer (opt-in; the consumer who imports `defaultBlobColorResolver`
  accepts the value.js peer — documented, deliberate).
- `/goo-blob`, `/watercolor-dot` → value.js-FREE (proven §4).
- A consumer wanting the blob with the default resolver imports BOTH `/goo-blob` (the
  primitive) AND `/color` (the resolver) — two explicit imports, value.js reach
  visible at the call site. That IS the inv-K-3 design working as intended.

---

## 6. CSS-color SOTA the seam SHOULD adopt (forward, for C3)

Not seam-blocking, but the C3 color-consolidation lens should weigh these:

- **`defaultBlobColorResolver` could ALSO ship a pure-CSS-relative recipe variant —
  but only as a CONSUMER-side convenience, never the lib default.** A consumer who
  only ever passes plain sRGB hex/named colors could inject a trivial
  `(css) => { /* their own parse */ }` and skip value.js entirely — the seam already
  permits this (it's the whole point). The lib does not need to ship that; the seam's
  existence IS the affordance. (L5 §6 flagged `oklch(from …)` as a watch-listed lever
  — but per §3.1 it can't feed the uniform, so it graduates for CSS-AUTHORED tints,
  not for the resolver.)

- **value.js's `parseCSSColor` already handles the full CSS Color 4/5 surface**
  (`lab`, `oklch`, `color(display-p3 …)`, named, hex — `color.ts:124`). So
  `defaultBlobColorResolver` is, for free, the most capable resolver in the
  constellation — it out-classes the demo's canvas trick (which silently clamped P3
  to sRGB and blended alpha against gray, `color.ts:113-117`). Worth stating as a
  POSITIVE in the W4 close: the lift doesn't just remove an anti-pattern, it upgrades
  the resolver's color-form coverage.

- **Knowledge-vs-web note:** the §3 SOTA (relative-color support %, getComputedStyle
  non-resolution, Houdini interpolation-only) is web-sourced and current (Feb-Jun
  2026). The gamma-vs-linear shader analysis (§1-2) is from reading the actual shader
  + value.js source (first-hand), corroborated by the general linear-pipeline web
  guidance — the SPECIFIC claim that THIS shader is gamma-end-to-end is from
  `metaball.frag.glsl:93-159` directly, not the web.

---

## 7. AUGMENTED-AT proposals (wave/slice + hard gate)

Build ON the AT.W1 design; these are deltas/hardens, not a re-plan.

| # | Proposal | Wave | Hard gate |
|---|---|---|---|
| **A5-1** | **Pin the seam return-space.** `ColorResolver` carries its color-space as a named contract; `defaultBlobColorResolver` returns **gamma sRGB** for W4 (faithful lift via `cssToOklch`→`oklchToGammaRgb`, NOT `oklchToLinear`). W1 doc's "linear" label + `oklchToLinear` impl reconciled BEFORE W4 codes against them. | W1-finalize → W4 | the W4 equivalence unit asserts the DECLARED space (gamma) to 1e-6; a demo-story side-by-side shows the lifted blob matches the value.js demo's base color (no darkening). |
| **A5-2** | **Two-tier inv-K-3 proof.** Add `proof:blob-value-free` (SOURCE transitive-import graph of `/goo-blob`+`/watercolor-dot` never reaches value.js or `aurora/.../color.ts`, reusing `proof-consumers-static.mjs`'s comment-stripped walker) ALONGSIDE the dist-grep floor. | W4 | source-graph proof fails-closed on a `../color` re-export; dist-grep fails-closed on a value.js literal in `dist/goo-blob.js`; BOTH green at W4 close. |
| **A5-3** | **Re-scope `/color` to a true generic leaf.** Ship `{cssToOklch, oklchToLinear, oklchToGammaRgb, defaultBlobColorResolver, OklchStop, ColorResolver}` from `/color`; KEEP `deriveAurora`/`AuroraHarmony`/`oklchStopToHex`/`flattenPalette`/`paletteToCssGradient` on `/aurora` (re-exported, not relocated). Extract `oklchToGammaRgb` as a standalone helper (the gamma `[0,1]` triple, today buried in `oklchStopToHex`). | W2 (the `/color` extraction wave) | `/color` exports contain ZERO aurora-domain symbol; aurora still re-exports the leaf with no break (`verify-export-types` + `proof:resolution` green for `/color` AND `/aurora`); the C3 lens inherits a clean generic leaf. |
| **A5-4** | **Record the CSS-native dead-ends for C3.** A `§color-seam` note in the AT.FINAL / C3 hand-off: relative-color + Houdini `<color>` cannot feed a JS uniform (`getComputedStyle` non-resolution); `@property syntax:"<color>"` is BANNED by the `light-dark()` discipline (`tokens.css:1255`). Prevents C3 relitigating the seam. | W8 (close) / C3 hand-off | the note cites `tokens.css:1255-1260` + the SOTA sources; C3 does not re-propose a CSS-native resolver or a typed-color token. |
| **A5-5** | **Bank the resolver-coverage upgrade as a W4 positive.** State in the W4 close that `defaultBlobColorResolver` (via value.js `parseCSSColor`) covers the full CSS Color 4/5 surface (oklch/lab/P3/named) the demo's canvas trick mangled — the lift UPGRADES resolution, not just removes an anti-pattern. | W4 close | the W4 capture/notes record one `oklch()` and one `color(display-p3 …)` input resolving correctly through `defaultBlobColorResolver` (a unit asserting non-sRGB inputs resolve, not throw). |

---

## 8. The one-line headline

The injected `ColorResolver: (css) => [r,g,b]` seam is the **right architecture**
(CSS-native cannot feed a JS uniform — SOTA-confirmed) and the inv-K-3 dist grep is
**sound** (value.js is a Rollup external, so the grep is complete, not heuristic) —
but AT.W1 ships it with **two unforced errors**: it pins the resolver to LINEAR RGB
against a GAMMA shader (a visible darkening bug on the headline primitive), and it
over-scopes `/color` with aurora-domain `deriveAurora`. Pin the return-space to
gamma for the faithful W4 lift, add a source-import-graph proof beneath the dist
grep, and shrink `/color` to a true generic leaf — three hardens that make the seam
ship correct and keep C3's color-consolidation target clean.

---

### Appendix — primary citations

- glass-ui: `src/components/custom/aurora/composables/color.ts:11-21,28,33-37,91-96,
  119-129,182,232-254,282`; `src/styles/tokens.css:1255-1260,1546-1562`;
  `vite.library.ts:121-137`; `scripts/proof-consumers-static.mjs:59-119,121-179`;
  `scripts/proof-package.mjs`; `src/components/custom/aurora/__tests__/color-equivalence.test.ts:1-55`;
  `dist/aurora.js` (the sole `@mkbabb/value.js` literal in dist — empirical).
- value.js: `demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts:44-70,66,198`;
  `demo/@/components/custom/goo-blob/shaders/metaball.frag.glsl:93-106,146-159`;
  `src/units/color/index.ts` (`parseCSSColor`, `oklabToRgb255`, Ottosson core).
- AT prior art: `design/AT.W1-blob-primitives.md §1,§3,§6`;
  `audit/W0-L5-precepts-architecture.md §2`; `audit/W0-L6-blob-primitives-design.md §2,§6`.
- SOTA (web, Feb–Jun 2026):
  [MDN — Using relative colors](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Relative_colors);
  [Chrome — CSS relative color syntax](https://developer.chrome.com/blog/css-relative-color-syntax);
  [MDN — getComputedStyle](https://developer.mozilla.org/en-US/docs/Web/API/Window/getComputedStyle);
  [MDN — CSS value serialization](https://developer.mozilla.org/en-US/docs/Web/API/CSS_Object_Model/CSS_value_serialization);
  [web.dev — @property](https://web.dev/articles/at-property);
  [LearnOpenGL — Gamma Correction](https://learnopengl.com/Advanced-Lighting/Gamma-Correction);
  [WebGL Color Management — Offscreen Canvas](https://offscreencanvas.com/issues/webgl-color-management/);
  [Bottosson — Okhsv/Okhsl](https://bottosson.github.io/posts/colorpicker/);
  [Evil Martians — OKLCH in CSS](https://evilmartians.com/chronicles/oklch-in-css-why-quit-rgb-hsl).
