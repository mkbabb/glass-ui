# AT.W0 — L5: precepts + architecture + the gestalt transpositions

**Lens L5** — the architectural-debt / gestalt-transposition lens for tranche AT
(the first glass-ui tranche after AS closed at **3.2.0**). Author analysis +
plan only; NO src/ code. Every claim is `file:line`-cited against glass-ui HEAD
and the value.js sibling demo.

The user RULED two things going in: **P5 = outer-only rounding is canonical**
(AS.W7 was right; fourier adjusts on its side — not a glass-ui change), and the
AT headline is to **lift goo-blob + watercolor-dot out of value.js's demo into
glass-ui subpaths with a REQUIRED injected color-resolver seam** (inv-K-3 — no
value.js default baked in). This lens asks: what is the elegant SHAPE of that
lift, what architectural debt does it expose, and what survived AS that should
be cleanly removed.

The standing directive binds throughout: *architectural transpositions for
elegance / simplicity / performance are necessary and desirable; NO legacy
code.*

---

## §0 — The provenance the AT ask inherits (so AT does not re-decide it)

P3 (Metaballs + BlobDot) is **not** a fresh idea — it is a chronic the
constellation has carried for **7+ tranches** and AS terminally routed it here:

- `AS/audit/W0b-L4-deferred.md:49` — "P3 Metaballs (WebGL) + BlobDot (SVG
  watercolor) family … NOT in src (`grep Metaball src/ = 0`). Net-new PUBLIC
  surface — ships **post-v1.0.0** (after value.js K.W6), **with the
  color-resolver consumer-INJECTED (§4.3)**. … value.js carries both blob
  systems locally (legitimate — the home does not exist yet)."
- `AS/design/AS.W5-constellation-primitives.md:28` (P3 row) — "owns
  footprint==render-resolution + corner-anchor token + PRM single-frame";
  `:87` "**SHIP→AS post-v1.0.0** (net-new public surface; after value.js K.W6)".
- `AS/design/AS.W5-constellation-primitives.md:75` (open question 3) — "The
  grand-audit specifies the color-resolver is INJECTED (no value.js default) …
  glass-ui's own `cssToRgb` at `color.ts` is a candidate but couples aurora's
  canvas-2d probe into the blob primitive. Confirm the resolver stays
  consumer-injected."

**The gate is now CLEAR.** P3's trigger was "post-v1.0.0 / after value.js K.W6".
glass-ui is at 3.2.0 — v1.0.0 long since cut. The two blob systems exist, fully
built and consumer-proven, in value.js's demo. AT is the home that finally
exists. This lens does NOT relitigate whether to lift; it designs the lift to be
**elegant**, not a transcription.

---

## §1 — The headline architectural finding: ONE WebGL substrate, not a fourth parallel one

### §1.1 — glass-ui already runs THREE divergent WebGL/shader substrates

There is no shared WebGL bootstrap in glass-ui. Three independent
compile/link/uniform implementations live in the tree today:

| # | Substrate | File | Shape | Consumers |
|---|---|---|---|---|
| 1 | Aurora runtime | `src/components/custom/aurora/composables/runtime.ts` | inline `compile()` (`:121`), `link()` (`:135`), `gl.createVertexArray` (`:320`), own RAF/visibility/resize/PRM/dispose loop (`:301` arm, `:554` dispose) | `useAurora` → `Aurora.vue` |
| 2 | Glass frost program | `src/composables/glass/webgl/frostShader.ts` | own `compileShader()` (`:168`), `createFrostProgram()` (`:140`), `getFrostUniforms()` (`:206`) | **ZERO** — orphan (see §4.1) |
| 3 | SVG-filter glass | `src/composables/glass/useGlassRenderer.ts` | not WebGL — canvas-2D displacement-map + `<feImage>`/`<feDisplacementMap>` SVG filter (`:138` `createGlassFilter`) | `GlassPanel.vue` only |

`grep compileShader\|linkProgram\|createVertexArray src/` returns exactly these
three files. There is **no `src/composables/glass/webgl/webgl-utils.ts`** — the
shared primitive value.js DOES have (`value.js/demo/@/lib/animation/webgl-utils.ts`:
`compileShader` `:1`, `linkProgram` `:18`, `createQuadVAO` `:36`, `getUniforms`
`:61`).

### §1.2 — the to-be-lifted metaball renderer would be a FOURTH copy

`value.js/demo/@/components/custom/goo-blob/composables/useMetaballRenderer.ts`
is a 343-line full WebGL2 lifecycle (`:105` `initGL`, `:147` `resize`, `:162`
`render`, `:256` `onVisibilityChange`, `:285` `onContextLost`, `:304`
`destroy`). It re-implements, beat-for-beat, what the aurora runtime already
owns:

- WebGL2 context creation with `alpha/premultipliedAlpha` (`useMetaballRenderer.ts:106`
  vs `runtime.ts:304`).
- `prefers-reduced-motion` single-frame carve (`useMetaballRenderer.ts:84,251,278`
  vs aurora's `:197`).
- `document.visibilitychange` tab-hidden suspend (`useMetaballRenderer.ts:256,272`
  vs aurora's `SuspendReason` set, `runtime.ts:57-61,240`).
- `ResizeObserver` + DPR-capped resize (`useMetaballRenderer.ts:147,265` vs
  aurora's `:338,349`).
- `webglcontextlost`/`restored` re-init (`useMetaballRenderer.ts:270,285,293`).
- RAF-outruns-destroy null-canvas guard (`useMetaballRenderer.ts:189-194`) — the
  exact race aurora's `SuspendReason`/`isRunning` model already solves.

A naive lift drops a fourth copy of this machinery into glass-ui. That violates
the standing directive head-on ("NO legacy code"; gestalt over incremental) AND
the substrate-without-consumer / no-double-mint invariant (J inv 10 / L inv 8)
that AS leaned on hardest (`AS.md:69`, `AS.W5-…:5` "no double-mint of landed
substrate").

### §1.3 — THE TRANSPOSITION: extract one `useWebGLCanvas` substrate; metaball + aurora both consume it

The aurora runtime's RAF/suspend/visibility/resize/PRM/context-loss/dispose
machinery is **already the canonical, hardened, tested version** of exactly what
the metaball renderer hand-rolls. AP.W3 even proved the suspend-set model makes
"resume-while-suspended structurally unreachable" (`runtime.ts:57-61`). The
elegant AT shape is:

1. Extract a `src/composables/glass/webgl/` substrate — `compileProgram` +
   `createQuadVAO` + `getUniforms` (lift value.js's `webgl-utils.ts` 4 helpers
   into glass-ui as the shared low-level layer) PLUS a `useWebGLCanvas`
   composable owning the lifecycle envelope: context creation, the
   `SuspendReason`-set RAF loop, visibility/intersection/PRM suspends,
   DPR-capped resize, context-loss recovery, dispose. This is aurora's
   `runtime.ts` envelope generalized — the per-shader bit (uniform upload +
   `drawArrays`) becomes an injected `drawFrame(gl, t)` callback.
2. **Aurora's runtime re-expresses on top of it** (its draw becomes the
   injected callback; the envelope deletes from `runtime.ts`). This is the
   honest gestalt move — not "add a new util next to the old one" but "the old
   bespoke envelope BECOMES the shared one, and aurora is its first consumer."
   That instantly satisfies the ≥2-consumer bar for the new substrate (aurora +
   metaball = 2 real WebGL consumers) and removes ~150 LOC of aurora-private
   lifecycle.
3. The metaball renderer (`goo-blob`) is the SECOND consumer — it supplies only
   its uniform-upload `drawFrame` + the satellite/mood/pointer state.

This is the architecturally-correct reading of the AT ask. "Lift goo-blob into
glass-ui" is NOT "copy 343 lines"; it is "glass-ui grows the WebGL substrate it
was always missing, aurora adopts it, and the blob is the second adopter." The
performance win is real (one audited RAF/visibility model instead of two
divergent ones; aurora's `SuspendReason` correctness extends to the blob for
free), and the simplicity win is the deletion of the parallel envelope.

> **Gate this transposition behind a byte-identity proof.** The risk is
> regressing aurora's frame output while refactoring its envelope. AT must carry
> a `drawFrame`-byte-identical assertion (the exact discipline AP.W3 used —
> "drawFrame byte-identical", commit `69d8202`), so the aurora re-expression is
> provably inert at the pixel level.

### §1.4 — scope honesty: watercolor-dot is NOT WebGL — keep the substrates separate

`useWatercolorBlob.ts` is a pure-JS `border-radius` animator (8 independent
sinusoidal vertices, `:87` `tick`, `:107` `radiiToCSS`) with NO canvas/GL/shader
anywhere. `WatercolorDot.vue` is a `<div>`/`<button>` with
`filter: url(#watercolor-filter)` (`:65`) and a CSS `border-radius` morph. It is
the CHEAP blob — the right primitive for palette dots / swatches, zero GPU.

So AT ships **two distinct primitives, deliberately not unified**:
`goo-blob` (WebGL metaball, on the new `useWebGLCanvas`) and `watercolor-dot`
(CSS border-radius morph, on the existing `useRAFLoop` motion leaf —
`useWatercolorBlob`'s hand-rolled `requestAnimationFrame` at `:108,128` should
re-express on `src/composables/motion/useRAFLoop.ts`, the library's audited RAF
owner, rather than minting a third raw-rAF loop). Forcing them onto one
substrate would be the WRONG abstraction (a CSS morph has no GL context). The
unification is WITHIN the WebGL family (§1.3), not across the two blob families.

---

## §2 — The color-resolver seam (inv-K-3): make it a FIRST-CLASS library primitive, not re-invented per blob

### §2.1 — the seam already exists THREE times, divergently, across the constellation

The "resolve a CSS color string → numeric channels for a shader/derive" problem
is solved three different ways right now:

| Site | Mechanism | SSR-safe? | Status |
|---|---|---|---|
| value.js metaball | `cssColorToRgb` via **1×1 canvas-2D `getImageData`** (`useMetaballRenderer.ts:44-70`) | NO (needs `document`) | the to-be-lifted code |
| glass-ui aurora (current) | `cssToOklch` via **value.js `parseCSSColor`** (`color.ts:119-129`) | YES (no `document`) | shipped, canonical |
| glass-ui aurora (deleted) | former 1×1-canvas `cssToRgb` `_parseCtx` | NO | **DELETED** at K.W2c (`color.ts:8,110` — "the … css->rgb 1×1-canvas … are DELETED") |

The decisive fact: **glass-ui already deleted the exact canvas-2D trick the
metaball renderer still uses**, on purpose, and replaced it with the SSR-safe
value.js parser path (`color.ts:108-118` — "Replaces the former 1×1-canvas
`cssToRgb` DOM trick, so this now works in SSR / happy-dom"). Lifting
`useMetaballRenderer.ts:44-70` verbatim would **re-introduce the deleted
canvas-2D resolver** into glass-ui — a direct legacy-code regression. inv-K-3
("no value.js default baked in") and the existing K.W2c deletion both point the
same way: the blob must NOT carry its own resolver.

### §2.2 — THE TRANSPOSITION: a `ColorResolver` inject contract shared by goo-blob + watercolor-dot + (optionally) aurora

inv-K-3 says the resolver is consumer-INJECTED with no value.js default. The
elegant shape is a **typed injection contract**, not a per-primitive prop:

```
// shape only — authored in AT.W-impl, not here
export type ColorResolver = (css: string) => RGB;       // [r,g,b] in [0,1]
export const COLOR_RESOLVER_KEY: InjectionKey<ColorResolver>;
export function useColorResolver(): ColorResolver;       // inject-or-throw
```

- `goo-blob` calls `useColorResolver()` instead of its inline `cssColorToRgb`.
  The component THROWS (dev-loud) if no resolver is provided — inv-K-3's "no
  baked-in default" enforced structurally, not by a silent gray fallback (the
  metaball's `[0.5,0.5,0.5]` default at `useMetaballRenderer.ts:61` is exactly
  the silent-mask anti-pattern `color.ts:113-117` calls out — "the canvas
  silently returned gray"; AT must NOT carry it).
- The per-frame memoise + cap (`useMetaballRenderer.ts:54-67`) is a real
  performance concern worth keeping — but it belongs in the resolver wiring /
  `useColorResolver` envelope, not duplicated in each blob.
- The constellation already HAS the canonical resolver to inject: value.js
  exports `parseCSSColor` (consumed by `color.ts:124`). A value.js consumer
  injects a `parseCSSColor`-backed resolver; a non-value.js consumer injects a
  `getComputedStyle`/canvas one of its own. glass-ui ships **no default** — that
  is the whole point of inv-K-3, and it is what keeps the blob subpath
  value.js-peer-FREE (see §3.2).

> **Why a first-class primitive, not a prop:** the seam recurs across goo-blob
> (WebGL, needs `[r,g,b]`), watercolor-dot (CSS, technically needs nothing — it
> consumes the raw string — but a consumer may want normalized tint math), and
> aurora's `cssToOklch` is the same family one gamut up. A shared
> `ColorResolver` inject contract is the ≥2-consumer-justified abstraction; a
> per-blob `:resolver` prop re-invents the wiring at every call site and can't be
> provided once at an app root. The inject contract is the gestalt; the prop is
> the patch.

> **Open scope question for AT.W0/W1 (do NOT over-build):** does aurora's
> `cssToOklch` also migrate behind `ColorResolver`? Aurora's path is OKLCh, not
> `[r,g,b]`, and is already SSR-safe + value.js-backed. The conservative,
> non-overfit answer is: ship `ColorResolver` as the RGB-channel contract for
> the two blobs (≥2 consumers, clean), and leave aurora's OKLCh path as-is — it
> is a different return type with a different gamut contract, and folding it in
> risks a speculative generalization. Recorded as a W1 design decision, leaning
> "blobs only".

---

## §3 — How the blob subpaths fit the bundle / subpath architecture

### §3.1 — the per-subpath split is a hand-listed entry map — blobs slot in cleanly

`vite.library.ts:3-56` is an explicit `{ name: resolve("src/<name>.ts") }`
entry map; `aurora` is `:17`. Each entry → one `dist/<name>.js` tree-shakeable
chunk, mirrored by a `src/<name>.ts` flat barrel, a `package.json` exports entry
(`{ types, import }`), and a `typesVersions["*"]` row. The `/aurora` chunk is the
template: a standalone WebGL chunk (≈16 KiB-gzip per CLAUDE.md) the root barrel
does NOT transitively reach (aurora is on a subpath, not the curated root
barrel).

AT's blob subpaths follow this **exactly**:

- New custom packages `src/components/custom/goo-blob/` +
  `src/components/custom/watercolor-dot/` (each with its own `index.ts` package
  barrel — CLAUDE.md "every dir has a package barrel").
- New flat barrels `src/goo-blob.ts` + `src/watercolor-dot.ts`.
- New `vite.library.ts` entries → `dist/goo-blob.js` + `dist/watercolor-dot.js`.
- New `package.json` `exports` + `typesVersions` rows.
- `@source` scan already covers `dist` for consumers (CLAUDE.md consumer-wiring).

This is the same per-subpath mechanical ritual every existing custom package
follows — `release.sh`'s subpath-publication probe (inv L.W0 Lane III) and
`verify-export-types` cover the new entries automatically once listed.

### §3.2 — keep the blobs OFF the root barrel and OFF the value.js peer (the two bundle traps)

Two architecture hazards AT must design around:

1. **Root-barrel reachability.** The root barrel is the curated vueuse-FREE /
   keyframes-FREE surface (Design-Axis-6). Blobs are heavy isolated WebGL chunks
   — they belong on subpaths ONLY (like `/aurora`, `/dock`), NEVER re-exported
   from `src/index.ts`. CLAUDE.md is explicit: the 26 non-cherry-picked custom
   packages "reach consumers only via their dedicated subpath."

2. **value.js peer creep.** The whole inv-K-3 injected-resolver design exists so
   the blob subpath does **not** hard-depend on `@mkbabb/value.js`. If the blob
   imported `parseCSSColor` directly (the way `color.ts:21` does for aurora),
   `/goo-blob` would drag the value.js peer onto every blob consumer's graph.
   The injected `ColorResolver` keeps `/goo-blob` + `/watercolor-dot`
   peer-clean — value.js is the consumer's choice of resolver, not the blob's
   dependency. **AT should add (or extend) a static-import-graph gate proving
   `dist/goo-blob.js` has zero `@mkbabb/value.js` static refs** — the precise
   analog of the vueuse-reachability gate AS named-forward for DataTable
   (`AS/FINAL.md:170-172`). This is the bundle-correctness floor for inv-K-3.

### §3.3 — shader asset format divergence (a small consistency debt to settle in AT)

Aurora ships shaders as **`.ts` modules** exporting a string
(`aurora.frag.ts` → `FRAGMENT_SRC`, imported `runtime.ts:12-13`). value.js's
metaball ships **`.glsl?raw`** (`useMetaballRenderer.ts:3-4`). Lifting the blob
forces a choice. The `.ts`-module form is the glass-ui house convention (no
`?raw` loader assumption, no `.glsl` content-scan edge), so AT should convert
`metaball.frag.glsl` → a `metaball.frag.ts` string module to match aurora. Minor,
but it is the kind of unflagged inconsistency that becomes a chronic if not
settled at lift time.

---

## §4 — Legacy / dead substrate that survived AS and should be cleanly removed in AT

### §4.1 — `frostShader.ts` is a complete WebGL orphan (zero consumers, not even barrel-exported)

`src/composables/glass/webgl/frostShader.ts` (`createFrostProgram` `:140`,
`compileShader` `:168`, `getFrostUniforms` `:206`) has **zero consumers**:
`grep -rln 'frostShader\|createFrostProgram\|getFrostUniforms' src/` returns only
the file itself. It is NOT in the `glass/index.ts` barrel (which exports only
`useGlassRenderer`/`createGlassFilter`/`destroyGlassFilter`). It is dead WebGL
substrate — an entire compile/link/uniform implementation with no caller and no
public surface.

This is a textbook overfitting-audit `delete-unused` verdict
(`overfitting-audit.md:24`: "no consumers and not public"). It survived AS's
overfitting pass (`AS.FINAL.md:57` "18/18, zero orphans") — meaning the AS audit
scope did not enumerate `composables/glass/webgl/`, or counted the file's own
internal calls. **AT must DELETE `frostShader.ts`** as part of the WebGL-substrate
consolidation (§1.3): it is the dead third copy, and the AT WebGL sweep is the
natural moment to remove it. NO migration shim, NO "keep for safety" — clean
break per the standing directive.

> Note also `useGlassRenderer`/`createGlassFilter` (the SVG-filter, non-WebGL
> path) has exactly ONE consumer (`GlassPanel.vue:78`) yet is **root-barrel
> exported** (`src/index.ts:166` `export * from "./composables/glass"`). It
> clears the overfitting bar as exported public API, but AT should confirm it
> belongs on the root barrel vs a `/glass-panel`-adjacent subpath — flagged for
> the L4 deferred-ledger lens, not a blocker here.

### §4.2 — the silent-gray resolver default must NOT be lifted

`useMetaballRenderer.ts:61` returns `[0.5,0.5,0.5]` when `resolverCtx` is null —
the silent-mask the aurora deletion explicitly repudiated (`color.ts:113`).
Lifting it would be importing a known anti-pattern. AT's `ColorResolver`
inject-or-throw contract (§2.2) is the clean-break replacement.

### §4.3 — value.js's local blob deps are demo-private and must be re-homed, not copied

The lift pulls in transitive deps that are value.js-demo-private:
`useBlobMood` (136 LOC), `useBlobPointer` (69), `useBlobSatellites` (294),
`@composables/prng` (`mulberry32`/`hashString`/`randomRadii`/`radiiToCSS`,
reused at 3 value.js sites: watercolor-dot, blob-satellites, color-generation).
These come over as the blob package's OWN co-located composables
(`goo-blob/composables/`), NOT as new public surface. `prng.ts` is the one
shared dep — it should land as a blob-package-private util (or
`src/composables/dom`-adjacent if a 2nd glass-ui consumer is witnessed; lean
package-private to avoid speculative export). The `SvgFilters.vue`
`#watercolor-filter` global (`value.js/…/svg-filters/SvgFilters.vue:5`,
referenced `WatercolorDot.vue:65`) is an app-global SVG `<filter>` def the
component depends on — AT must decide whether `watercolor-dot` ships its own
self-contained filter def (preferred — a primitive that depends on an
undocumented app-global `id` is a hidden coupling) or documents the requirement.

---

## §5 — The screenshot-capture precept (prompt-5's edict): it did NOT land in docs/precepts — AT must add it

### §5.1 — confirmed absent from the shared precepts submodule

`grep -rn 'per-tranche capture\|capture convention\|capture-manifest\|before/after\|screenshot convention' docs/precepts/` returns **nothing** beyond an
unrelated commit-ledger mention in a 2026-04-30 reaudit
(`audits/REAUDIT-2026-04-30/06-throughput-commit.md:375,530`). The
`WAVE_SPEC.md:143` reference is generic ("screenshots, logs, benchmark files …"
in an output-discipline list), not a capture CONVENTION. There is **no precept**
governing per-tranche before/after visual evidence.

### §5.2 — AS already named it forward, and it is owed

AS's own path-forward booked it explicitly: `AS/audit/W0b-path-forward.md:124`
— "**Named-forward: a per-tranche capture convention in the precepts so root
scratch stops re-accumulating**." AS's capture work proves the need: it ran a
full CAPTURE agent against the live demo
(`AS/audit/visual/W-capture-manifest.md`) but dumped output to a **gitignored
`as-verify/` scratch dir** with an ad-hoc manifest — exactly the
re-accumulating-root-scratch problem the named-forward calls out. No two
tranches did it the same way.

### §5.3 — THE TRANSPOSITION: AT authors the capture precept, and it is load-bearing FOR THIS TRANCHE

The blob lift is a **visual** change to a **visual** library — it is the
canonical case where before/after capture is the only honest verification (a
metaball's gooey merge, a watercolor dot's organic morph, the aurora
re-expression's byte-identity). AT is not just the tranche that SHOULD add the
precept; it is the tranche that NEEDS it.

The precept (authored in the precepts repo's own flow per inv-16 — glass-ui
writes only glass-ui; the submodule is name-forward, `AS.FINAL.md:183-188`)
should fix:

- a canonical capture LOCATION (gitignored, e.g. `.cache/captures/<tranche>/`,
  matching the `.cache/gates/` pure-output discipline inv-θ already
  established at AS.W2, `AS.md:78`) — so capture output is NEVER a tracked-state
  side effect and root scratch stops accumulating.
- a before/after PAIR discipline (pre-impl baseline captured at the DEV
  boundary; post-impl captured at close; the visual defect ledger keyed to the
  pair) — AS's `W7-visual-defect-ledger.md` is the shape, missing only the
  convention.
- light + dark, fixed viewport, the dark-sync re-assert caveat
  (`W-capture-manifest.md` already learned this the hard way) — bank the lesson.

> Process: glass-ui CANNOT commit `docs/precepts/` from inside its submodule
> (inv-16, reinforced `AS.FINAL.md:183`). AT records the precept as a
> NAME-FORWARD to the precepts owner's flow, then advances the glass-ui pin —
> AND uses the convention immediately for its own blob captures (the precept can
> be applied before it is pinned). This is the same two-step AS used for the
> irreversible-release-step precept.

---

## §6 — Other precept-binding observations (recorded, routed)

- **Overfitting bar for the blobs is MET on real consumers** (inv-J-10 / the
  "≥2 distinct consumer CONTEXTS" rule). goo-blob: `BlobPane.vue` +
  `color-picker/visual/HeroBlob.vue` (2 value.js contexts) + a glass-ui demo
  story = ≥2 today, before any other constellation adopter. watercolor-dot:
  consumed at ≥7 value.js sites (`MixSourceSelector`, `MixResultDisplay`,
  `palette-browser/*`, `EditDrawer`, `SpectrumCanvas`, `dock/Dock.vue`, …) +ge a
  glass-ui demo. Both clear the bar as net-new PUBLIC subpaths regardless. The
  NEW `useWebGLCanvas` substrate clears it via aurora + goo-blob (§1.3); the NEW
  `ColorResolver` clears it via goo-blob + watercolor-dot (or goo-blob + a 2nd
  injected resolver site). Each AT artefact has its ≥2 named in advance — no
  speculative substrate.

- **No-backwards-compat / clean-break (inv 47 / L inv 4):** the lift DELETES the
  metaball's canvas-2D resolver (§2.1), DELETES `frostShader.ts` (§4.1), and
  re-expresses aurora's envelope onto the shared substrate (§1.3) — three clean
  breaks, zero shims. The watercolor-dot's raw-rAF loop is replaced by
  `useRAFLoop`, not paralleled.

- **Token-first (J inv):** P3's "corner-anchor token + footprint==render
  resolution" (`AS.W5-…:28`) means the blob's geometry is token-driven
  (`--blob-*` custom properties), matching `GooBlob.vue`'s existing
  `--blob-color` (`:6`) pattern. AT must token-ify the blob's tunable surface
  rather than ship the 28-field `BLOB_CONFIG_DEFAULTS` literal
  (`goo-blob/types.ts:100-133`) as the only knob — that literal is a demo-tuning
  artefact, not a token-first public contract. The `BlobConfig` inject key
  (`types.ts:135`) is a reasonable advanced-override escape hatch, but the
  primary surface should be tokens + a small prop set.

- **CSS-platform lever named-forward (AS):** `relative-color oklch(from …)` was
  WATCH-listed (`AS/audit/W0b-L4-deferred.md:52`) precisely because it "deletes
  the canvas-2d `cssToRgb` probe". The blob lift is the witnessed-consumer
  moment that lever was waiting for — if a `ColorResolver` implementation can be
  a pure-CSS `oklch(from …)` recipe, AT graduates that lever opportunistically.
  Recorded for the modern-web lens (L6), not decided here.

---

## §7 — Proposed AT transposition waves

Dev/impl boundary after W1 (bbnf format). Every wave carries a HARD GATE.

| Wave | Disposition | Contents | Hard gate |
|---|---|---|---|
| **AT.W0** | DEV — audit | This 5/6-lens deep audit; the WebGL-substrate-unification feasibility (aurora envelope generalizable to `useWebGLCanvas`); the `ColorResolver` contract shape + the aurora-fold scope decision (§2.2 open q); the blob dep-tree re-home map (§4.3); confirm `frostShader.ts` orphan + the screenshot-precept absence. | Every finding `file:line`-cited; the ≥2 witness named per artefact; the byte-identity risk for the aurora fold flagged. |
| **AT.W1** | DEV — design | Design slices: (1) `useWebGLCanvas` + lifted `webgl-utils` substrate shape + the aurora re-expression plan; (2) the `ColorResolver` / `useColorResolver` inject-or-throw contract; (3) the two blob subpath barrels + `vite.library.ts`/`package.json`/`typesVersions` deltas + the value.js-peer-free import-graph gate; (4) the token-first `--blob-*` surface + corner-anchor + PRM single-frame; (5) the screenshot-capture precept text (name-forward draft). **END DEV BOUNDARY.** | Each slice has an acceptance check; the aurora byte-identity assertion specified; the import-graph gate specified. |
| **AT.W2** | IMPL — WebGL substrate (headline transposition) | Extract `src/composables/glass/webgl/` (`compileProgram`/`createQuadVAO`/`getUniforms` + `useWebGLCanvas` lifecycle envelope); **re-express aurora `runtime.ts` onto it** (envelope deletes from runtime); DELETE the orphan `frostShader.ts` (§4.1). | aurora `drawFrame` byte-identical (the AP.W3 discipline); aurora `__tests__` green; `frostShader` refs = 0; net LOC DOWN. |
| **AT.W3** | IMPL — the `ColorResolver` seam (inv-K-3) | `ColorResolver` type + `COLOR_RESOLVER_KEY` + `useColorResolver()` inject-or-throw; the per-frame memoise envelope. NO baked default. | inject-or-throw verified (no silent gray); a value.js-backed resolver wires in a demo story; resolver is the ONLY color path the blob has. |
| **AT.W4** | IMPL — `goo-blob` subpath | Lift goo-blob (component + mood/pointer/satellites + `metaball.frag.ts` string module) onto `useWebGLCanvas` + `useColorResolver`; token-first `--blob-*` surface; new subpath + exports + typesVersions; the import-graph gate (`dist/goo-blob.js` has 0 `@mkbabb/value.js` static refs). | subpath resolves (release.sh probe + verify-export-types); import-graph gate green; before/after capture (per the new precept) shows the gooey merge renders. |
| **AT.W5** | IMPL — `watercolor-dot` subpath | Lift watercolor-dot onto `useRAFLoop` + (optional) `useColorResolver`; self-contained `#watercolor-filter` SVG def or documented requirement; new subpath + exports. | subpath resolves; before/after capture shows the organic morph; PRM single-frame honored. |
| **AT.W6** | IMPL — close | Overfitting audit (every AT artefact ≥2 OR demo OR not-shipped; INCLUDING the `frostShader` deletion and `composables/glass/webgl/` re-scope); full gate matrix green; AT.FINAL; the SemVer minor (net-new subpaths = additive) published through the repaired CI; the screenshot-capture precept name-forward recorded + pin advanced. | gates green; capture-precept applied to AT's own evidence; clean publish. |

**Wave count: 7** (W0 audit + W1 design DEV; W2–W6 IMPL). The headline
transposition is W2 (one WebGL substrate, aurora adopts it, dead frost deleted)
— it lands FIRST of the impl set because both blobs (W4) consume it. W3
(`ColorResolver`) is the inv-K-3 seam both blobs need. W4/W5 are the two
subpaths. The screenshot-precept threads W1 (author) → W4/W5 (apply) → W6
(record/pin).

---

## §8 — Summary of the architectural posture AT takes

AT is **not** a transcription tranche. The naive reading ("copy two demo
components into glass-ui") would inject a fourth parallel WebGL envelope, a
re-deleted canvas-2D resolver, and a silent-gray default — three legacy-code
regressions against the standing directive. The elegant reading is three clean
transpositions:

1. **One WebGL substrate** — aurora's hardened RAF/suspend/visibility/resize/PRM
   envelope generalizes to `useWebGLCanvas`; aurora becomes its first consumer
   (envelope deletes from `runtime.ts`), goo-blob its second; the orphan
   `frostShader.ts` is deleted. Elegance + simplicity + performance, one audited
   loop instead of three divergent ones.
2. **One color-resolver seam** — a first-class `ColorResolver` inject-or-throw
   contract (inv-K-3, no baked default), shared by both blobs, keeping the
   subpaths value.js-peer-free, enforced by an import-graph gate.
3. **One capture convention** — the screenshot/before-after precept AS
   named-forward, authored now and applied to AT's own visual evidence, output
   to gitignored `.cache/captures/` (matching inv-θ's pure-output discipline).

Every artefact has its ≥2 witness named in advance; every deletion is a clean
break with no shim; the blobs slot into the existing per-subpath bundle
architecture exactly as `/aurora` does. P5 (outer-only rounding) is RULED and
untouched — not a glass-ui change.
