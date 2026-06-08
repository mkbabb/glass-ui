# AX.W37 — Canvas2D lifecycle substrate + text-highlight (two ≥2-consumer substrates: publish, name, and the one net-new helper)

**Band** G · PRIMITIVES · **Severity** major · **dependsOn** AX.W00 · **Charter** AX.md §3 (the
`### AX.W37` block, lines 1773-1802) + the §1 summary row (line 147) + §2 band-G membership (lines 183-184)
+ §2b band-G precept row (line 219) + §4 note 10 (the WebGL substrate is EXEMPLARY — do NOT re-litigate;
lines 2044-2048) + §4 note 12 (PUBLISH-CURRENCY / verify-against-HEAD, do not re-ship what is landed; lines
2057-2067) · **Audit** `deep-audit-corpus.json` slice `library-optimum` (index 24, F-§4.1 — the
constellation/useCanvas2D abstraction-complete-but-not-consumer-ADOPTED finding + the SCOPE-CAVEAT/CROSS-CHECK
notes) + slice `composables-state` (index 28, F1 — the `useGlassRenderer` token-first / `el.style` boundary
that frames the Canvas2D-color-resolution discipline) · `constellation-analysis-corpus.json` slice
`idiom:slides` (index 13, findings 3+4+5 — FourierField re-derives the ENTIRE canvas lifecycle + the
light-dark()-into-Canvas2D probe in TWO files + the mulberry32 dup) + slice `hist:words` (index 6, finding 1
— the ASK-2 `useTextHighlight` net-new substrate, 3 named consumers) + slice `idiom:fourier-analysis`
(index 12, finding 0 — the stale `^3.1.0` pin lists `useTextHighlight` as DONE-in-3.2.0; finding 9 — the
`cssVarToHex` Canvas2D token-resolution overlap).

---

## State (born-RED — the gate must fail at HEAD)

The wave is born-RED at HEAD `eaba94f` on three falsifiable witnesses. PER §4 NOTE 12, the live
re-diagnosis surfaced a CONSEQUENTIAL CORRECTION to the charter's "ship two NET-NEW substrates" premise:
**both substrates already EXIST in `src/` at HEAD** (landed AW.W17 + the 3.2.0 `useTextHighlight`) — but
they are UNDER-PUBLISHED, MIS-HOMED, and one is MIS-NAMED, and the one piece that is genuinely net-new is
`resolveCanvasColor`. So W37 is NOT a from-scratch authoring wave; it is a **publish / name / consume /
single-helper** wave over substrate that exists but does not clear the bar consumers can actually reach.
This is the SAME class as §4 note 12 (do not re-ship what is landed; verify against HEAD, then publish the
seam). Each witness was re-proven LIVE against HEAD, not trusted from the audit.

- **RED witness 1 (the Canvas2D lifecycle substrate is UNREACHABLE on a public subpath + is MIS-NAMED vs the
  charter's `useCanvas2D`/`useCanvasLifecycle` contract).** `src/composables/glass/canvas2d/useCanvas2D.ts`
  ships a COMPLETE Canvas2D park/freeze/dispose substrate at HEAD (the three-reason suspend Set
  `tab-hidden`/`off-screen`/`manual`, the `contentvisibilityautostatechange` + `IntersectionObserver`
  offscreen park, the `visibilitychange` tab-hidden park, the `prefers-reduced-motion` live-monitor +
  static-frame, the `ResizeObserver` dpr-fit) — the EXEMPLARY twin of `useWebGLCanvas`/`createCanvasLifecycle`
  that §4 note 10 blesses. BUT: (a) it is exported only as **`createCanvas2D`** from the internal
  `src/composables/glass/index.ts` barrel — there is NO `/canvas` subpath (`grep '"./canvas"' package.json`
  → 0; no `src/subpaths/canvas.ts`), so a 2D consumer cannot `import { useCanvas2D } from
  "@mkbabb/glass-ui/canvas"` the way the charter promises; (b) its PUBLIC name is `createCanvas2D`, NOT the
  `useCanvas2D`/`useCanvasLifecycle` contract the charter + slice-13-action + the W17 spec all name; (c) it
  has exactly ONE consumer in the whole constellation (`Constellation.vue:94`), so it clears the ≥2-consumer
  bar ON PAPER (demo story + Constellation) but NOT against the REAL intended consumers — slides'
  FourierField (622 lines) + constellation.ts both RE-DERIVE the entire substrate because they can't reach
  it. The falsifiable RED: *`grep '"./canvas"' package.json` → 0 (RED — no subpath); `grep -n
  "useCanvas2D\b" src/composables/glass/canvas2d/index.ts` → 0 (RED — the public export is `createCanvas2D`,
  not the charter name); `node -e 'import("@mkbabb/glass-ui/canvas")'` → resolution 404 (RED). After: the
  substrate ships on `/canvas` under the `useCanvas2D` (+ `useCanvasLifecycle` alias-of-record) name, the
  subpath resolves, and FourierField + constellation.ts are NAMED-and-routed consumers (GREEN).*

- **RED witness 2 (`resolveCanvasColor` does not exist — the `light-dark()`-into-Canvas2D defect is
  hand-rolled in TWO consumer files, not solved once at the library).** `grep -rn "resolveCanvasColor" src/`
  → ZERO (genuinely net-new). The constellation's own `constellationField.ts:97-103` reads tokens via a bare
  `getComputedStyle(canvas).getPropertyValue(name).trim() || fallback` — which works ONLY because W17 ships
  PLAIN-hsl `--constellation-*` tokens; a `light-dark()` token fed to `strokeStyle`/`fillStyle` is SILENTLY
  REJECTED by Canvas2D (falls back to black/transparent — the W30 cardinal defect). slides carries the
  identical root cause TWICE: `constellation.ts:107` reads `--foreground` (a `light-dark()` value) directly
  into `strokeStyle` (the W30 leak — a buggy direct read), AND `FourierField.vue:223-250` works around the
  SAME rejection with a bespoke hidden-probe-span that forces the browser to resolve `var(--token)` to an
  `rgb()` before reading it back (a clever-but-per-consumer hack). FourierField ALREADY solved exactly the
  reject the constellation hits, but the solution lives in a deck, not the library. The falsifiable RED:
  *`grep -rn "resolveCanvasColor" src/` → 0 (RED — no shared resolver); a Canvas2D readback that sets
  `strokeStyle` from a `light-dark()` token paints black/transparent, not the resolved color (RED). After:
  `resolveCanvasColor(cssVar, el)` ships on `/canvas`, resolves a `light-dark()` token to a canvas-valid
  `rgb()` via the probe-span pattern, and the readback paints the resolved color (GREEN).*

- **RED witness 3 (`useTextHighlight` is MIS-HOMED on `/dom`, not the charter's `/motion-core`, AND not on
  the keyframes-FREE+vueuse-FREE surface its consumers need).** `src/composables/dom/useTextHighlight.ts`
  ships a COMPLETE CSS Custom Highlight composable at HEAD (`CSS.highlights` + the `Highlight` constructor +
  the multiplexing contributor registry + the `setFromMatches` tree-walker + the feature-detect no-op
  fallback) — landed for 3.2.0. FuzzySearch ALREADY consumes it (`FuzzySearch.vue:79`
  `useTextHighlight("glass-search-mark")` + `:103` `setFromMatches`) — so **the charter's "RETIRE
  FuzzySearch's hand-rolled `<mark>` split" is ALREADY DONE at HEAD** (§4-note-12 class — do not re-ship).
  BUT: (a) it is published on `/dom`, while the charter + slice-6-action + idiom:fourier all name
  `/motion-core` as its home (the keyframes-FREE + vueuse-FREE surface fourier's equation-var emphasis +
  words' search marks reach); (b) the named external consumers (fourier equation vars, words search marks)
  cannot reach it on a surface they pin — fourier's stale `^3.1.0` pin (idiom:fourier finding-0) lists it as
  "DONE-in-3.2.0" but the pin never bumped, so the CONSUMER-ADOPTION half never ran. The falsifiable RED:
  *`grep -rn "useTextHighlight" src/composables/motion/core` → 0 (RED — not on `/motion-core`); the
  `/motion-core` barrel does not export `useTextHighlight` (RED). After: `useTextHighlight` reaches consumers
  on the keyframes-FREE+vueuse-FREE surface its named consumers pin, with FuzzySearch's already-landed
  consumption verified-against-HEAD (GREEN).*

The wave is RED at HEAD on all three witnesses (a complete-but-unpublished Canvas2D substrate / a missing
shared color resolver / a mis-homed text-highlight); the HardGate drives each to GREEN. The honest framing
per §4 note 12: W37 PUBLISHES + NAMES + ROUTES-CONSUMERS for substrate that EXISTS, ships the one genuinely
net-new helper (`resolveCanvasColor`), and VERIFIES — does not re-implement — the FuzzySearch `<mark>`
retirement that already landed. RATIFY the publication-surface decisions before impl (see Open Questions).

---

## Goal

The Canvas2D lifecycle substrate ships on a public `/canvas` subpath under the `useCanvas2D` /
`useCanvasLifecycle` contract (renamed from the internal `createCanvas2D`) with `resolveCanvasColor` (the
shared `light-dark()`→`rgb()` probe-span resolver) alongside, and `useTextHighlight` reaches its named
consumers on the keyframes-FREE+vueuse-FREE surface its census proves — so FourierField + constellation.ts
(canvas lifecycle), the W30 constellation Canvas2D leak (resolveCanvasColor), and fourier+words+FuzzySearch
(text-highlight) all consume ONE library substrate each instead of re-deriving it — leaving a green build,
vue-tsc, the born-RED→GREEN gates, and a live π-lane audit confirming a 2D surface parks offscreen + the
highlight marks paint.

---

## Scope (the gestalt fix — no workaround, no legacy alias, no re-implementation)

The slice's meta-class (slice-13 finding 3, the digest's "single largest under-adoption in slides"): **the
library grew the primitive, the consumer kept the copy, and the loop never closed** — compounded by the
substrate being UNREACHABLE on a subpath a consumer can import. The gestalt fix is PUBLISH + NAME + the one
net-new helper, NOT a rebuild (per §4 note 10 — the substrate internals are EXEMPLARY, do not re-litigate;
per §4 note 12 — verify against HEAD, do not re-ship). Three folds:

**(1) PUBLISH + NAME the Canvas2D lifecycle substrate on `/canvas` (witness 1) — the substrate exists; expose
it under the contract name.** TWO sub-steps:
- **(1a) RENAME the public export `createCanvas2D` → `useCanvas2D`** (the charter + slice-13-action + W17
  contract name) and add **`useCanvasLifecycle`** as the alias-of-record for the lifecycle-only framing.
  Per the no-legacy mandate this is a CLEAN BREAK — NOT a `@deprecated createCanvas2D` shim. The sole
  in-repo consumer (`Constellation.vue:94`) re-points to the new name in the SAME wave (the
  binding-verification class — a rename that leaves a stale import silently breaks; vue-tsc catches THIS one
  since it is an in-repo named import). NOTE: the factory's `create*` shape (returns a handle, not a
  ref-bundle) is the EXISTING ergonomics — RATIFY whether `useCanvas2D` keeps the handle-return or the rename
  also re-shapes to a composable-return (Open Question 1); the recommendation is rename-only (the handle is
  the right shape for an imperative canvas seam — `createCanvasLifecycle`/`useWebGLCanvas` use the same
  handle idiom, so a re-shape would diverge from the WebGL twin §4-note-10 blesses).
- **(1b) SHIP the `/canvas` subpath.** Add `src/subpaths/canvas.ts` (`export * from
  "../composables/glass/canvas2d"` — the TRIVIAL one-line mirror barrel the `vite.library.ts` glob
  batch-resolves), the `./canvas` `package.json` `exports` block (`{ types, import }` contract-v2 shape) +
  the `typesVersions['*']['canvas']` entry, and the `proof:resolution` / `verify-export-types` coverage. The
  CLAUDE.md "subpath publication is binary" precept (L.W0 Lane III) — the release-script probes every
  published subpath before tag, so the `/canvas` entry is gated. RATIFY the subpath NAME (`/canvas` per the
  charter vs `/canvas-lifecycle` for parity with the WebGL substrate's framing — Open Question 2;
  recommendation `/canvas` per the charter literal).

**(2) SHIP `resolveCanvasColor(cssVar, el)` on `/canvas` (witness 2) — the ONE genuinely net-new artefact.**
A pure CPU helper that resolves a CSS custom-property to a Canvas2D-VALID `rgb()`/`rgba()` string via the
FourierField probe-span pattern (`getComputedStyle()` on a transient hidden probe element that forces the
browser to evaluate `light-dark()`/`color-mix()`/`var()` chains to a concrete computed color before readback
— Canvas2D `strokeStyle`/`fillStyle` SILENTLY REJECT `light-dark()`, so a raw `getPropertyValue` read of
such a token paints black/transparent). The helper:
- takes `(cssVar: string, el: HTMLElement)` (the var name + an element on the cascade — the canvas host or
  any descendant), returns the resolved `rgb()`/`rgba()` string (and the canvas-friendly form a consumer
  hands straight to `strokeStyle`);
- feature/SSR-guards (no `document` → returns the token unchanged or a documented fallback, the
  befitting-silent browser-API path — NOT a library-internal throw);
- is the library's SINGLE-SOURCE answer to the `light-dark()`-into-Canvas2D class the constellation
  (constellationField.ts), W30 (slides constellation.ts), and FourierField (the bespoke probe) each hit.
  W17 reads PLAIN-hsl `--constellation-*` tokens so it does NOT need the resolver TODAY (the W17 spec §6
  COORDINATE note) — but the resolver is the documented escape for ANY future `light-dark()` token in a
  canvas, and FourierField + the W30 slides side are its named consumers.
- It rides the `/canvas` subpath (next to `useCanvas2D`) — the cohesive home for the Canvas2D-color
  resolution concern. (NOTE the slice-28 boundary: the `useGlassRenderer` token-first / NO-`el.style`-color
  discipline frames this — `resolveCanvasColor` is a token READER, never a token WRITER; it injects no style,
  it resolves a value for the consumer's own `ctx` write.)

**(3) VERIFY + RE-HOME `useTextHighlight` (witness 3) — the substrate + the FuzzySearch retirement exist;
move it to the named home + route the external consumers.** TWO sub-steps:
- **(3a) RE-HOME `useTextHighlight` onto `/motion-core`** (the charter + slice-6 + idiom:fourier named home —
  the keyframes-FREE + vueuse-FREE surface; `useTextHighlight` imports only `vue` `getCurrentScope`/
  `onScopeDispose`, so it is BOTH keyframes-free AND vueuse-free and belongs on the keyframes-FREE+vueuse-FREE
  `/motion-core` surface its named consumers reach). **RATIFY** whether this is a MOVE (relocate
  `src/composables/dom/useTextHighlight.ts` → the motion/core subtree + re-point `/dom`'s barrel) or a
  DUAL-PUBLISH (Open Question 3). Per the no-backwards-compat memory + one-path mandate the recommendation is
  a clean MOVE to `/motion-core` (its home should be ONE surface; `/dom` was the wrong home — text-highlight
  is a motion/decoration concern, not a DOM-observer concern), re-pointing the in-repo consumer
  (`FuzzySearch.vue`) in the same wave. The `::highlight(<name>)` style rule the composable's contract
  depends on must ship in the `/styles` cascade — VERIFY the `::highlight(glass-search-mark)` rule exists
  (`utilities.css` already references the highlight surface per the grep) and is the canonical paint-identity.
- **(3b) VERIFY the FuzzySearch `<mark>` retirement against HEAD — do NOT re-implement (§4 note 12).**
  `FuzzySearch.vue:79`/`:103` ALREADY consumes `useTextHighlight("glass-search-mark")` +
  `setFromMatches(container, query, fuzzySpans)` — the hand-rolled `<mark>`-splitting is GONE at HEAD. W37
  VERIFIES this (the gate asserts FuzzySearch renders marks via `CSS.highlights` with ZERO `<mark>` DOM
  mutation + the feature-detect fallback) and ROUTES the external adoptions (fourier equation vars, words
  search marks) to the consumer-adoption ledger. MUST NOT "re-retire" a retirement that landed — the wave's
  text-highlight arm is publication-home + verify + route, not re-author.

**The honest meta-truth (record in the audit json):** the charter's "two net-new ≥2-consumer substrates"
title is FALSIFIED at HEAD — both substrates exist; W37's real work is PUBLICATION-SURFACE + NAMING + the one
net-new helper (`resolveCanvasColor`) + ROUTING the under-adopted consumers. This is itself the §4-note-12
discipline made concrete for the G-band: verify against HEAD, do not re-ship, publish the seam consumers
can't reach.

---

## FileBounds (the EXACT files this wave may touch — for parallel-dispatch disjointness)

| File | Edit |
|------|------|
| `src/composables/glass/canvas2d/useCanvas2D.ts` | RENAME the public factory `createCanvas2D` → `useCanvas2D`; ADD `useCanvasLifecycle` as the alias-of-record (1a). Do NOT rebuild the internals (§4 note 10). ADD `resolveCanvasColor(cssVar, el)` here OR in a sibling `canvas2d/resolveCanvasColor.ts` (RATIFY — recommendation: a sibling file, single-concern; fold 2). |
| `src/composables/glass/canvas2d/resolveCanvasColor.ts` | **NEW** (recommended) — the probe-span `light-dark()`→`rgb()` resolver (fold 2). |
| `src/composables/glass/canvas2d/index.ts` | EXPORT `useCanvas2D` + `useCanvasLifecycle` + `resolveCanvasColor` (+ the existing types); DROP the `createCanvas2D` name (clean break, no `@deprecated` alias). |
| `src/composables/glass/index.ts` | RE-EXPORT the renamed surface (`useCanvas2D`/`useCanvasLifecycle`/`resolveCanvasColor`) — drop the `createCanvas2D` re-export (`:12`). |
| `src/subpaths/canvas.ts` | **NEW** — the one-line `/canvas` mirror barrel (`export * from "../composables/glass/canvas2d"`); the `vite.library.ts` glob auto-resolves the chunk (1b). |
| `package.json` | ADD the `./canvas` `exports` block (contract-v2 `{ types, import }`) + `typesVersions['*']['canvas']` (1b); ADD the `proof:resolve-canvas-color` + (if re-homing) the re-pointed `proof:text-highlight` script entries; the `proof:canvas2d-substrate` entry (`:629`) stays (its test path is unchanged — only the export NAME inside it changes). |
| `src/components/custom/constellation/Constellation.vue` | RE-POINT the import `createCanvas2D` → `useCanvas2D` (`:3`, `:94`) — the in-repo binding-verification re-point (1a). Do NOT touch the render/overlay logic (W17 owns it). |
| `src/composables/motion/core/` (the `/motion-core` subtree + its barrel) | RECEIVE `useTextHighlight` (the MOVE target per 3a — relocate the file + add the barrel export). |
| `src/composables/dom/useTextHighlight.ts` · `src/composables/dom/index.ts` | If MOVE (3a): DELETE the file from `dom/` + drop the `dom/index.ts` re-export (`:41`) + the header-comment refs (`:5`,`:21`). If DUAL-PUBLISH: leave + add the `/motion-core` re-export (RATIFY). |
| `src/components/custom/search/FuzzySearch.vue` | RE-POINT the `useTextHighlight` import to its new home IF re-homed (3a); otherwise UNTOUCHED — the `<mark>` retirement is already landed (3b, verify-only). |
| `src/styles/utilities.css` | VERIFY the `::highlight(glass-search-mark)` style rule is the canonical paint identity (3a) — touch only if the rule is missing/mis-scoped. |
| `src/api/index.ts` | ADD the canonical PUBLIC types if the discovery layer should carry them (`Canvas2DFrame`/`Canvas2DOptions`/`Canvas2DHandle`/`Canvas2DSuspendReason`, `UseTextHighlightControls`, the `resolveCanvasColor` signature type) — RATIFY (Open Question 4; recommendation: add the canvas + text-highlight types since they are now public-subpath surface). |
| `docs/tranches/AX/audit/W37-canvas2d-text-highlight.json` | **NEW** — the born-RED→GREEN audit artefact (the three witnesses + the §4-note-12 "exists-but-unpublished" correction + the per-fold disposition + the paired-π BEFORE/AFTER + DELTA + the FourierField/constellation.ts/fourier/words consumer-adoption ROUTES). |

**OUT of bounds:** the `useCanvas2D` internals — the suspend-Set/observer/PRM/resize machinery (§4 note 10
EXEMPLARY, do NOT re-litigate; W37 renames + publishes, never rebuilds); slides' `FourierField.vue` +
`constellation.ts` sibling source (**W30/W31** — separate tracked repo; W37 writes NO slides source, it
ROUTES the adoption); the W17 `--constellation-*` plain-hsl token block + the `drawOverlay`/`stepOverlay`
seam (**W17** owns `constellationField.ts` + `Constellation.vue`'s render logic — W37 touches `Constellation.vue`
ONLY for the `createCanvas2D`→`useCanvas2D` import re-point); the W30 slides constellation.ts `light-dark()`
leak FIX (**W30** owns the slides side; W37 ships the `resolveCanvasColor` LIBRARY helper the W30 fix or a
future token routes through); the `useGlassRenderer` detector/filter split (**W26** + **W20**); the
`useTokenColor`/`cssVarToHex` CPU token→hex restructure (**W21**'s composable-justify ledger — `resolveCanvasColor`
is the Canvas2D-string resolver, a DIFFERENT concern from a `{hex,rgb}` CPU leaf; note the fourier
`cssVarToHex` consumer-#2 to W21, do not merge the two helpers here); fourier's `^3.1.0`→`^3.6.0` pin bump
(**W34** consumer-adoption ledger); the WebGL `createCanvasLifecycle`/`useWebGLCanvas` substrate (untouched —
W37 is the 2D TWIN, not a WebGL edit).

---

## Disjointness (sibling waves it must NOT overlap)

- **vs W17 (constellation tokens + warp + slides adopt).** This is the PRIMARY coordinate. Both depend only
  on W00 → **CONCURRENT-eligible** (W17 spec §"vs AX.W37" lines 283-289 confirms). **COORDINATE, not
  collide:** W37 OWNS `src/composables/glass/canvas2d/` (rename + resolveCanvasColor + subpath); W17 OWNS
  `constellationField.ts` + `Constellation.vue`'s render/overlay logic + the `--constellation-*` plain-hsl
  tokens. The ONE shared file is `Constellation.vue` — W37 touches it ONLY for the `createCanvas2D`→`useCanvas2D`
  import re-point (`:3`,`:94`); W17 touches it for the `drawOverlay`/`stepOverlay`/`focalIndex` render seam.
  These are DISJOINT hunks (an import line vs the render block). SEQUENCE: the cleanest order is **W37-then-W17**
  (W37 renames first, W17 builds on the renamed import) — but if concurrent, the two hunks merge cleanly; if
  W17 lands first, W37 just re-points the import W17 left. W17 reads PLAIN-hsl tokens so it needs NO
  `resolveCanvasColor` today; the resolver is W37's future-token escape. NEITHER wave rebuilds `useCanvas2D`.
- **vs W30 (slides baseline — the constellation Canvas2D light-dark() leak).** W30 is the SLIDES side
  (separate tracked repo): it fixes `constellation.ts:107`'s `--foreground` direct read (the leak) + executes
  the e2e specs. W37 ships the LIBRARY-side `resolveCanvasColor` helper the W30 fix CAN route through (or that
  a future `light-dark()` token must). **Disjoint by repo:** W37 writes glass-ui src; W30 writes slides src.
  W37 ROUTES the FourierField probe-deletion + the constellation.ts adoption to W30/W31; it does not edit
  them. The slice-13 finding-4 "the leak has TWO instances" — W30 fixes instance (a) on the slides side; W37
  ships the shared resolver so instance (b) (FourierField's bespoke probe) can be DROPPED when slides adopts
  (routed, not executed here).
- **vs W20 / W26 (the `useGlassRenderer` token-first / detector-vs-filter split).** Slice-28 frames the
  Canvas2D-color discipline (NO `el.style` color writes; token-first). **Disjoint by file + concern:** W20
  deletes the GlassPanel-dependent imperative filter; W26 carves the detector. W37's `resolveCanvasColor` is
  a token READER (resolves a value for a consumer's `ctx` write) — it touches NEITHER `useGlassRenderer.ts`
  NOR `el.style`. Shared concept (token→color resolution), zero shared file.
- **vs W21 (composable recategorize-ledger + `useTokenColor` justify).** W21 closes the `use-token-color
  wtf` justify/restructure (idiom:fourier finding-9 — if W21 ships a CPU `resolveTokenColor(css)→{hex,rgb}`
  leaf, fourier's `cssVarToHex` is its consumer-#2). **Disjoint by helper:** `resolveCanvasColor` (W37) is a
  Canvas2D-string resolver (probe-span → `rgb()` for `strokeStyle`); `useTokenColor`/a `{hex,rgb}` leaf (W21)
  is a reactive/CPU token→typed-color composable. Do NOT merge them in W37 — NOTE the overlap + the fourier
  `cssVarToHex` consumer to W21's ledger so the restructure considers whether the two converge; W37 ships the
  Canvas2D-string concern only.
- **vs W22 (font register).** No shared file; W37 carries NO font surface. Fully disjoint.
- **vs W36 (forced-colors glass-language skin).** Sibling G-band a11y/substrate wave; **disjoint by surface**
  — W36 ships the `@media (forced-colors:active)` skin (tier panes/hue dots/focus); W37 ships the Canvas2D +
  text-highlight substrates. No shared file. (A `::highlight()` under forced-colors is a W36/W37 coordinate
  IF the highlight must survive HCM — NOTE it, do not author here; recommendation: the highlight is decorative
  search-match emphasis, not load-bearing structure, so HCM degradation is befitting-silent — W36 owns the
  forced-colors policy.)
- **vs W34 (cross-constellation idiom census receiver).** The FourierField canvas-lifecycle adoption + the
  constellation.ts deletion + the fourier/words `useTextHighlight` adoptions + the fourier pin-bump
  (`^3.1.0`→`^3.6.0`) all ROUTE to W34's per-consumer adoption ledger. W37 SHIPS + NAMES + PUBLISHES the
  library seams; W34 censuses + routes the consumer adoptions (executed sibling-side). Disjoint: W37 = library
  surface; W34 = consumer routing.

---

## Triumvirate (implement / adversarially-verify / gate-author split)

- **Implement (≤2 agents — file-disjoint arms).** Arm A (the Canvas2D substrate — folds 1+2): rename
  `createCanvas2D`→`useCanvas2D` + add `useCanvasLifecycle`, re-point `Constellation.vue`'s import, ship the
  `/canvas` subpath barrel + `package.json` `exports`/`typesVersions`, author `resolveCanvasColor` (the
  probe-span resolver), add the public types to `/api` (per ratify). Arm B (text-highlight — fold 3):
  RE-HOME `useTextHighlight` onto `/motion-core` (relocate + barrel + re-point `FuzzySearch.vue`'s import),
  VERIFY the `::highlight(glass-search-mark)` rule, VERIFY the FuzzySearch `<mark>` retirement against HEAD
  (do NOT re-implement), route the fourier/words adoptions. `vue-tsc` + `npm run build` at every interval (a
  rename that leaves a stale in-repo import reds vue-tsc immediately — the binding-verification canary).
- **Adversarially-verify (≤1 read-only lane).** Re-runs the three RED witnesses against the patched tree:
  asserts `node -e 'import("@mkbabb/glass-ui/canvas")'` RESOLVES (witness 1) + the public export is
  `useCanvas2D`/`useCanvasLifecycle` not `createCanvas2D` + `Constellation.vue` imports the new name; asserts
  `resolveCanvasColor` resolves a `light-dark()` token to a canvas-valid `rgb()` (NOT black/transparent —
  witness 2); asserts `useTextHighlight` reaches `/motion-core` + FuzzySearch renders marks via
  `CSS.highlights` with ZERO `<mark>` DOM mutation (witness 3). ADVERSARIAL twists: (a) tries to "pass" by
  leaving a `@deprecated createCanvas2D` alias (confirms the CLEAN BREAK — the rename is one-path, no legacy
  alias); (b) tries to "pass" `resolveCanvasColor` against a PLAIN-hsl token only (confirms the resolver
  handles the `light-dark()` case the constellation's bare `getPropertyValue` does NOT — the actual defect);
  (c) confirms `useCanvas2D`'s INTERNALS are byte-unchanged except the export name (the §4-note-10
  do-not-re-litigate guardrail); (d) confirms the text-highlight arm did NOT re-implement an
  already-retired `<mark>` split (§4-note-12 — verify, don't re-ship); (e) confirms the `/canvas` subpath
  carries the `useCanvas2D` substrate (≥2 REAL consumers once FourierField+constellation.ts adopt — not a
  manufactured demo-only second consumer).
- **Gate-author (≤1 agent — net-new resolve + re-baseline existing).** Authors `proof:resolve-canvas-color`
  (a mounted/jsdom-or-π readback: set `strokeStyle`/`fillStyle` from a `light-dark()` token via
  `resolveCanvasColor`, assert the resolved pixel is the expected color, NOT black/transparent — born-RED
  since the helper does not exist); RE-POINTS `proof:canvas2d-substrate` (the existing test at `:629` —
  update the `createCanvas2D`→`useCanvas2D` rename inside it, keep the three-reason-park assertion);
  re-baselines / authors `proof:text-highlight` (FuzzySearch renders via `CSS.highlights`, zero `<mark>`
  mutation, feature-detect fallback — verify-against-HEAD, born-GREEN on the substrate but RED on the
  `/motion-core` home assertion until re-homed); confirms `proof:resolution` + `verify-export-types` GREEN
  with the new `/canvas` subpath. Confirms each assertion FAILS at `eaba94f` and PASSES on the patched tree.

(All within the AX ≤6-implementation / ≤7-read-only ceiling — this wave's actual count is 4: 2 implement +
1 verify + 1 gate.)

---

## HardGate (born-RED→GREEN + the MANDATORY VISUAL-TRUTH live audit)

**Headless / structural gates — born-RED→GREEN.**

1. **`proof:canvas2d-substrate` GREEN (re-pointed)** — the existing vitest park/freeze/dispose contract
   (`:629`, `tests/composables/glass/canvas2d/useCanvas2D.test.ts`) re-points the
   `createCanvas2D`→`useCanvas2D` rename and stays GREEN (the three-reason suspend Set — a `tab-show` cannot
   lift an `off-screen` suspension; PRM paints ONE static frame then parks; `dispose()` idempotent). A test
   artefact. **Born-RED** transiently if the rename leaves the test importing the dead `createCanvas2D` name;
   GREEN after the test + barrel re-point.
2. **`proof:resolve-canvas-color` (net-new) GREEN** — a readback assertion: `resolveCanvasColor` resolves a
   `light-dark()` (and a `var()`/`color-mix()`) token to a canvas-valid `rgb()`/`rgba()` string; a Canvas2D
   surface that sets `strokeStyle`/`fillStyle` from the RESOLVED value paints the expected color, while the
   RAW token paints black/transparent (the falsifiable contrast). A runtime/readback artefact (jsdom or the
   π-lane). **Born-RED** at HEAD (the helper does not exist; `grep -rn "resolveCanvasColor" src/` → 0); GREEN
   after the helper ships.
3. **`proof:text-highlight` GREEN** — FuzzySearch renders match marks via `CSS.highlights` (the named
   `glass-search-mark` highlight, the `::highlight()` paint) with ZERO `<mark>` DOM mutation, AND the
   feature-detect no-op fallback path is exercised. A runtime artefact. The substrate + FuzzySearch
   consumption are ALREADY GREEN at HEAD (§4 note 12) — the gate VERIFIES (does not re-ship) + asserts the
   `/motion-core` home after the re-home. **Born-RED** on the `/motion-core` home assertion until re-homed;
   GREEN after.
4. **`vue-tsc --noEmit` GREEN (the rename canary)** — after `createCanvas2D`→`useCanvas2D` + the
   `useTextHighlight` re-home, NO unresolved `createCanvas2D` import survives in the typegraph (the in-repo
   `Constellation.vue` + `FuzzySearch.vue` re-points land). A build artefact. **Born-RED** if a stale import
   survives the rename; GREEN after the re-points.
5. **`npm run build` + `verify-export-types` + `proof:resolution` GREEN** — the `/canvas` subpath resolves
   (`node -e 'import("@mkbabb/glass-ui/canvas")'` succeeds), the `dist/canvas.js` + `dist/canvas.d.ts` chunk
   emits (the `vite.library.ts` glob + `flatten-subpath-types.mjs`), and the `package.json` `./canvas`
   `exports` + `typesVersions` are probed by the release-script subpath-publication clause (L.W0 Lane III —
   "subpath publication is binary"). A build/deletion artefact. **Born-RED** at HEAD (no `/canvas` subpath →
   `import("@mkbabb/glass-ui/canvas")` 404s); GREEN after the subpath ships.
6. A **rename-PROOF** (valid build/diff artefact, NOT a runtime grep): `grep -rc "createCanvas2D"
   src/` → 0 (the clean break — no surviving `createCanvas2D` name, no `@deprecated` alias); `grep -rn
   "useCanvas2D\|useCanvasLifecycle" src/composables/glass/canvas2d/index.ts` → both present;
   `grep -rn "useTextHighlight" src/composables/motion/core` → present (the `/motion-core` home).

These are build / test / runtime-readback / resolution artefacts (the precept-valid forms per SPEC.md §Hard
Gates lines 96-103) — NOT grep-for-source-string-as-runtime-behaviour gates. The `proof:resolve-canvas-color`
+ `proof:text-highlight` gates assert RUNTIME paint (the resolved pixel / the `CSS.highlights` paint with
zero DOM mutation), which IS the behaviour. The rename-PROOF asserts the SOURCE clean-break (no legacy
alias), a build/diff fact, not runtime behaviour.

**VISUAL-TRUTH live audit (NON-NEGOTIABLE per AX.W00 — the wave's close criterion).** A live Playwright +
frontend-design pass, in **light AND dark** at **≥ 3 viewports** (375×667 / 1280×800 / 1440×900), on the
APPEARANCE/INTERACTION axis (NOT a headless proof alone):

- **A 2D surface on `useCanvas2D` PARKS offscreen + under reduced-motion + tab-hidden:** mount a 2D consumer
  (the constellation demo story, or a minimal `useCanvas2D` fixture) in the π-lane; scroll it offscreen and
  confirm the rAF loop parks (no frames attach — the `IntersectionObserver` `off-screen` reason); hide the
  tab and confirm it parks (`document.hidden`); enable `prefers-reduced-motion` and confirm it paints ONE
  static frame then freezes; un-park and confirm it re-arms. The substrate's three-reason park is the
  load-bearing contract — the live audit confirms the REAL device parks, not the headless mock.
- **`resolveCanvasColor` paints the RESOLVED color, not black:** in the π-lane, render a 2D surface whose
  stroke reads a `light-dark()` token through `resolveCanvasColor`; confirm the stroke paints the resolved
  hue in BOTH light and dark (the token flips), NOT the silent-rejected black/transparent. This is the W30
  cardinal-defect class proven FIXED at the library layer.
- **The highlight marks PAINT via `CSS.highlights`:** type a query into the FuzzySearch demo; confirm the
  matched substrings highlight (the `::highlight(glass-search-mark)` paint) with NO `<mark>` wrapper in the
  DOM (inspect — the text node is unsplit); confirm the feature-detect fallback degrades gracefully on an
  engine without `CSS.highlights` (befitting-silent — the list still reads, just unmarked).

**The wave does NOT close on the headless gates alone** — the executed live audit (captured as a paired-π
BEFORE/AFTER + DELTA artefact under `docs/tranches/AX/audit/`) is the binding close criterion. The
BEFORE/AFTER pair is load-bearing: the BEFORE state (the substrate exists but is unreachable on a subpath /
no shared resolver / `useTextHighlight` mis-homed) → the AFTER (a `/canvas` subpath a consumer imports / the
resolved-color paint / the `/motion-core` home) — the DELTA is the proof the under-adoption loop closed.

---

## Cadence (sub-step order)

1. **Live re-diagnosis ritual (W00 wave-open).** Re-confirm the three RED witnesses against HEAD `eaba94f`
   live: `createCanvas2D` ships complete but has NO `/canvas` subpath + is mis-named (`grep '"./canvas"'
   package.json` → 0; the export is `createCanvas2D`); `resolveCanvasColor` does NOT exist (`grep` → 0) and
   a `light-dark()` token paints black in Canvas2D; `useTextHighlight` ships on `/dom` (not `/motion-core`)
   AND FuzzySearch ALREADY consumes it (the `<mark>` retirement is landed). Record in `audit/W37-…json` as
   the born-RED baseline + the §4-note-12 "exists-but-unpublished" correction to the charter's "net-new"
   premise. Do NOT re-implement what exists — re-prove, then publish/name/route.
2. **PUBLISH + NAME the Canvas2D substrate (fold 1).** (1a) Rename `createCanvas2D`→`useCanvas2D` + add
   `useCanvasLifecycle`; re-point `Constellation.vue`'s import. (1b) [post-RATIFY subpath name] ship
   `src/subpaths/canvas.ts` + the `./canvas` `package.json` `exports`/`typesVersions`. `vue-tsc` + `npm run
   build` + confirm `/canvas` resolves.
3. **SHIP `resolveCanvasColor` (fold 2).** [post-RATIFY file location] author the probe-span
   `light-dark()`→`rgb()` resolver on `/canvas`; SSR/feature-guard (befitting-silent); export from the
   barrel; add the type to `/api` per ratify. `vue-tsc` + `npm run build`.
4. **RE-HOME + VERIFY `useTextHighlight` (fold 3).** [post-RATIFY move-vs-dual-publish] (3a) move
   `useTextHighlight` onto `/motion-core`, re-point `FuzzySearch.vue`'s import, verify the
   `::highlight(glass-search-mark)` rule. (3b) VERIFY the FuzzySearch `<mark>` retirement against HEAD (do
   NOT re-implement). `vue-tsc` + `npm run build`.
5. **Gates GREEN.** Author `proof:resolve-canvas-color`; re-point `proof:canvas2d-substrate`; author/verify
   `proof:text-highlight`; confirm `proof:resolution` + `verify-export-types` GREEN with `/canvas`; run the
   rename-PROOF; run the VISUAL-TRUTH live audit (2D surface parks / resolved color paints / highlight marks
   paint); ROUTE the FourierField + constellation.ts + fourier + words adoptions to W30/W31/W34; capture the
   paired-π BEFORE/AFTER + DELTA; write `audit/W37-…json` to GREEN.

---

## Artefacts (the audit json + evidence it emits)

- `docs/tranches/AX/audit/W37-canvas2d-text-highlight.json` — the born-RED→GREEN ledger: the three RED
  witnesses (the unpublished+mis-named Canvas2D substrate; the missing `resolveCanvasColor`; the mis-homed
  `useTextHighlight` + the already-landed FuzzySearch retirement), the §4-note-12 "exists-but-unpublished"
  correction, the per-fold disposition (publish+rename / net-new helper / re-home+verify), the post-wave
  GREEN measurements (`/canvas` resolves, the resolved-color paint, the `/motion-core` home, zero `<mark>`
  mutation), the RATIFY decisions recorded, and the consumer-adoption ROUTES.
- The post-build `dist/` proof: `dist/canvas.js` + `dist/canvas.d.ts` ARE EMITTED (the subpaths-glob
  auto-resolve evidence) + `verify-export-types` probes the new `./canvas` entry GREEN.
- The paired-π **BEFORE/AFTER + DELTA** capture (the W00 protocol): the 2D-surface park (a hand-rolled-park
  consumer can't reach the substrate → a `/canvas`-imported surface that parks offscreen/tab-hidden/PRM), the
  resolved-color paint (a `light-dark()` token painting black → painting the resolved hue in light+dark), the
  highlight (already-landed `CSS.highlights` paint, verified at the `/motion-core` home) — at ≥ 3 viewports ×
  light/dark.
- A consumer-adoption ROUTE annex (routed, NOT executed here): FourierField + constellation.ts adopt
  `useCanvas2D` (delete the 622-line + 510-line re-derivations) → **W30/W31**; FourierField drops its bespoke
  probe onto `resolveCanvasColor` → **W30/W31**; fourier equation-var + words search-mark `useTextHighlight`
  adoptions → **W34**; the fourier `^3.1.0`→`^3.6.0` pin bump (which pulls the `/motion-core`
  `useTextHighlight` + the `/canvas` substrate) → **W34**; the `cssVarToHex`/`useTokenColor` overlap NOTE →
  **W21**.

---

## CommitPlan (conventional-commit messages, one per sub-step)

1. `test(canvas): W37 born-RED baseline — the Canvas2D substrate is unpublished+mis-named, resolveCanvasColor is missing, useTextHighlight is mis-homed (AX.W37)`
2. `feat(canvas): publish the Canvas2D lifecycle substrate on /canvas — rename createCanvas2D→useCanvas2D + useCanvasLifecycle, ship the subpath, re-point Constellation (AX.W37 fold 1)`
3. `feat(canvas): resolveCanvasColor — the shared probe-span light-dark()→rgb() resolver for Canvas2D strokeStyle/fillStyle (AX.W37 fold 2)`
4. `refactor(motion-core): re-home useTextHighlight onto the keyframes-free+vueuse-free surface; verify the landed FuzzySearch CSS.highlights retirement (AX.W37 fold 3)`
5. `chore(AX.W37): resolve-canvas-color + canvas2d-substrate + text-highlight gates GREEN + /canvas resolution + paired-π capture + W30/W31/W34/W21 route notes`

(One conventional-commit per sub-step; the orchestrator owns the index — agents NEVER stage/commit/stash per
the hardened agent git clause. These are the messages the orchestrator authors.)

---

## Dependencies (dependsOn from the charter + why)

- **AX.W00 (π visual-runtime lane) — the close machinery (the ONLY hard dependsOn; charter line 1774).**
  Every G-band visual/substrate wave closes on the π-lane live audit, not the headless gates alone (the
  cardinal AX precept). The 2D-surface-parks-offscreen readback, the `resolveCanvasColor` resolved-color
  paint, and the `CSS.highlights` mark paint all run in the W00 workspace. W37 cannot close on the structural
  gates alone (a green `proof:resolution` over a `/canvas` subpath whose substrate does NOT actually park
  offscreen would be exactly the AW cardinal failure — a green gate over a broken live behaviour).
- **AX.W17 (constellation port) — a COORDINATE, NOT a hard dependsOn.** Both depend only on W00 →
  CONCURRENT-eligible (W17 spec §6 + §"vs AX.W37"). W17 reads PLAIN-hsl `--constellation-*` tokens (no
  `light-dark()`), so it needs NO `resolveCanvasColor` today; the constellation already composes the Canvas2D
  substrate at HEAD. The cleanest order is W37-then-W17 (W37 renames the import W17 builds on), but the two
  hunks in `Constellation.vue` (the import line vs the render seam) merge cleanly if concurrent. Neither
  rebuilds `useCanvas2D`.
- **Downstream (NOT blockers — the consumer-adoption half):** **AX.W30/W31** (slides — separate repo) adopt
  `useCanvas2D` (delete FourierField's 622-line + constellation.ts's 510-line re-derivations) + drop
  FourierField's bespoke probe onto `resolveCanvasColor`. **AX.W34** receives the fourier+words
  `useTextHighlight` adoptions + the fourier pin bump (which pulls the published `/canvas` + `/motion-core`
  surfaces). **AX.W21** receives the `cssVarToHex`/`useTokenColor` overlap note. These are ROUTED, not
  executed in W37 — the consumer-adoption loop is W30/W31/W34's, the library publication is W37's.
- **Why no hard graphics/dock dependency:** W37 ships LIBRARY SUBSTRATE surface (rename + subpath + a CPU
  helper + a re-home) — it touches no aurora/blob/dock source, no shader, no morph clock. It is a G-band
  primitives wave that can run as soon as the π-lane (W00) exists; it does NOT wait on the graphics or dock
  bands.

---

## Archaeology (the git commits / prior-tranche lineage the audit cited)

- **AW.W17 (`da0495b`)** — the commit that landed BOTH the neutral `<Constellation>` + `drawOverlay` seam
  AND the `useCanvas2D` Canvas2D substrate (`src/composables/glass/canvas2d/useCanvas2D.ts` header: "AW.W17 —
  `useCanvas2D`: the Canvas2D lifecycle substrate, the park/freeze/dispose PARALLEL to `useWebGLCanvas`
  (AU.W6)"). The substrate is COMPLETE + EXEMPLARY at HEAD — but AW.W17 published it only on the internal
  `glass/` barrel under the `create*` name, with the constellation demo story as the only second consumer
  (the slice-24 "consumer-READY in form but not consumer-ADOPTED" finding). The real intended consumers
  (slides' FourierField + constellation.ts) never ported — the AW.W17 extraction was a greenfield component
  modeled on slides, NOT a port of slides onto it, and no follow-up re-pointed the consumers (slice-24
  rootCause; the §13 "consumer adoptions (dirty-tree blocked)" bucket).
- **AU.W6 (`useWebGLCanvas`/`createCanvasLifecycle`)** — the WebGL substrate the Canvas2D twin parallels (§4
  note 10 "EXEMPLARY, do NOT re-litigate"). The `create*` handle-return idiom W37 keeps for `useCanvas2D`
  derives from this twin — a re-shape would diverge from the blessed WebGL substrate.
- **glass-ui 3.2.0 (`useTextHighlight` on `/dom`)** — the CSS Custom Highlight composable landed for 3.2.0
  (idiom:fourier finding-0 lists it among the "4 DONE-in-3.2.0 asks"). FuzzySearch was re-pointed onto it in
  the same era (`FuzzySearch.vue:79` `useTextHighlight("glass-search-mark")` + the header comment "rather
  than a `<mark>` splitter — the matched chars paint via `::highlight(glass-search-mark)`") — so the
  charter's "retire the FuzzySearch `<mark>` split" was ALREADY DELIVERED at HEAD (§4 note 12 — verify, do
  not re-ship). The mis-home on `/dom` (vs the charter's `/motion-core`) + the un-bumped fourier `^3.1.0`
  pin are the residual gaps W37 closes.
- **words A.W5-P2b + GRAND-AUDIT-FOLD §5 (ASK-2)** — the cross-repo ASK that named `useTextHighlight` with
  three consumers (fourier equation vars, words search marks, glass-ui FuzzySearch) and the binary-substrate
  bar cleared 3×; words A.W5-P2b GATES on it. The substrate landed; the words/fourier adoption half routes to
  W34.
- **slides `FourierField.vue` (feedback-coder deck, the 5-commit net-new deck)** — 622 lines re-deriving the
  ENTIRE canvas lifecycle (the IO/RO/MO/MQL observers `:519-579`, the rAF loop `:484-499`, the PRM
  static-frame `:525-533`, AND the `light-dark()`-into-Canvas2D probe `:223-250`) — the "single largest
  under-adoption in slides" (slice-13 finding-3). The probe-span pattern at `:223-250` is the EXACT
  `resolveCanvasColor` design — FourierField already solved the reject the constellation hits, in a deck
  instead of the library.
- **slides `til-briefing/constellation.ts`** — 510 lines, the `mulberry32` dup (`:18-26`), the drift
  (`:173-195`), and the W30 `--foreground` `light-dark()` leak (`:107` into `strokeStyle`). It re-derives the
  same lifecycle FourierField does — both die when slides adopts `useCanvas2D` (routed to W30/W31).
- **HEAD `eaba94f`** (batch-1 integration, UNPUBLISHED) — the audit baseline: `useCanvas2D` complete but no
  `/canvas` subpath + named `createCanvas2D`; `resolveCanvasColor` absent; `useTextHighlight` on `/dom` with
  FuzzySearch already consuming it. Per §4 note 12, the substrates EXIST — W37 publishes/names/routes, it
  does not re-implement.

---

## PreceptAlignment (the SPECIFIC precepts this wave is pursuant to + must not violate)

Per §2b the band-G binding precepts (pinned `docs/precepts/` @ `63240e6`):

- **substrate-with-consumer / wire-before-retire (precepts/README.md line 8 "Substrate and consumer land
  together. A primitive that is not consumed is unfinished work."; SPEC.md "Every wave lands substrate with
  its consumer").** The Canvas2D substrate cleared the ≥2-consumer bar ON PAPER (demo + Constellation) but
  NOT against the REAL consumers (FourierField + constellation.ts re-derive it because they can't reach it on
  a subpath). W37 PUBLISHES it on `/canvas` so the named consumers (≥2 thrice over per the charter:
  FourierField, constellation, GooBlob/Aurora-adjacent 2D needs) CAN land WITH it — the
  substrate-with-consumer loop closes (the adoption executes sibling-side via W30/W31/W34, routed not
  dropped). `useTextHighlight` clears the bar 3× (fourier/words/FuzzySearch) — W37 puts it on the surface
  those consumers reach (`/motion-core`, keyframes-FREE+vueuse-FREE). MUST NOT ship a `/canvas` subpath that
  no consumer can adopt (a manufactured demo-only second consumer) — the ROUTES to W30/W31/W34 are the
  binding wire-before-the-loop-closes evidence.
- **no-overfitting (precepts/README.md lines 10-12 "A public surface, helper … needs a current consumer and
  evidence. Otherwise delete it."; audits/overfitting-audit.md).** Every artefact W37 ships has named
  consumers WITH evidence: `useCanvas2D`/`useCanvasLifecycle` (Constellation at HEAD + FourierField +
  constellation.ts routed); `resolveCanvasColor` (FourierField's bespoke probe + the W30 slides leak +
  constellation's future `light-dark()` escape); the `/motion-core` `useTextHighlight` home
  (fourier+words+FuzzySearch). MUST NOT ship `resolveCanvasColor` as speculative substrate (it has 2 named
  consumers + a documented future-token escape) NOR merge it with W21's `useTokenColor`/`cssVarToHex` concern
  (a DIFFERENT helper — Canvas2D-string vs CPU `{hex,rgb}` — noted to W21, not pre-merged here). The
  `useCanvas2D` internals are NOT re-litigated (§4 note 10 — EXEMPLARY).
- **one-path / no-legacy-code (no-backwards-compat memory; SPEC.md "no shadow APIs or temporary compatibility
  layers").** The `createCanvas2D`→`useCanvas2D` rename is a CLEAN BREAK — NO `@deprecated createCanvas2D`
  alias, the sole in-repo consumer re-points in the same wave (the rename-PROOF asserts `grep -rc
  "createCanvas2D" src/` → 0). The `useTextHighlight` re-home is a MOVE to ONE surface (`/motion-core`), not
  a dual-publish that leaves two homes (RATIFY — recommendation: clean move). `resolveCanvasColor` is the
  library's SINGLE-SOURCE answer to the `light-dark()`-into-Canvas2D class (one resolver, not a per-consumer
  probe). MUST NOT leave the old `create*` name, the `/dom` home, or two color-resolution paths.
- **fail-explicit on library-internal violations vs befitting-silent browser-API degradation (the two are
  never collapsed; §0).** `resolveCanvasColor`'s SSR/feature-guard (no `document`/`CSS`) is a BEFITTING-SILENT
  browser-API path (returns the token unchanged or a documented fallback — NOT a library-internal throw); the
  `useCanvas2D` PRM-freeze + the `useTextHighlight` feature-detect no-op are likewise befitting-silent
  platform-capability degradations. There is NO library-internal failure mode in W37 that should fail loud
  (it is a publication + helper wave) — but the gate MUST NOT accept a silent `console.warn`+return masking a
  real resolution failure (SPEC.md §Hard Gates line 112). The `light-dark()` REJECTION the resolver fixes is
  a Canvas2D platform behaviour (befitting-silent at the browser layer); the resolver makes the consumer's
  intent EXPLICIT (resolve before write), it does not collapse the two.
- **no-silent-deferrals (SPEC.md "consumer will be wired later is NOT a valid gate" line 109; the §16.4
  zero-loss).** The consumer-adoption half (FourierField + constellation.ts canvas-lifecycle adoption, the
  fourier+words text-highlight adoption, the fourier pin bump) is NOT silently dropped — each is ROUTED to a
  NAMED destination (W30/W31 for the slides-side adoptions, W34 for the cross-repo idiom census + pin bump,
  W21 for the `useTokenColor` overlap). W37 ships the LIBRARY surface; the adoption executes at the named
  consumer wave. MUST NOT close W37 with a bare "FourierField will adopt later" — the ROUTES are the
  zero-loss evidence.
- **Gates close on evidence (precepts/README.md lines 13-14; SPEC.md §Hard Gates lines 96-103 —
  build/test/runtime/diff/deletion, NOT "grep found a source string" for runtime behaviour, line 108).** The
  gates are `proof:resolve-canvas-color` (a RUNTIME readback — the resolved pixel vs the black-rejected raw
  token), `proof:canvas2d-substrate` (a TEST artefact — the three-reason park), `proof:text-highlight` (a
  RUNTIME artefact — the `CSS.highlights` paint with zero `<mark>` mutation), the `vue-tsc`/`npm run build`/
  `verify-export-types`/`proof:resolution` BUILD canaries, and the rename-PROOF (a build/diff fact — no
  legacy alias). The close is the executed live π-lane Playwright pass (2D surface parks / resolved color
  paints / highlight marks paint), never a headless proof alone — the cardinal AX precept.
- **documentation-is-part-of-the-change (precepts/README.md line 16; SPEC.md "wave close updates docs").**
  The `useCanvas2D.ts` header comment (currently "AW.W17 — `useCanvas2D`: …" — it already uses the
  RIGHT name in the comment while the EXPORT is `createCanvas2D`; the rename reconciles the two) + the
  `/canvas` subpath addition to CLAUDE.md's subpath surface census + the `/motion-core` `useTextHighlight`
  home reconcile + the README per canonical-readme-shape IF the `/canvas` substrate warrants one. MUST NOT
  leave the export-name/comment-name divergence (a doc-truth fix) NOR a stale CLAUDE.md subpath count.

---

## Open questions / RATIFY-BEFORE-IMPL

1. **`useCanvas2D` rename shape — keep the `create*` handle-return or re-shape to a composable-return
   (RATIFY-BEFORE-IMPL).** The substrate currently exports `createCanvas2D` (returns a handle —
   `arm()`/`suspend()`/`resume()`/`dispose()`), matching the `useWebGLCanvas`/`createCanvasLifecycle` WebGL
   twin idiom (§4 note 10 EXEMPLARY). **Recommendation: rename-ONLY** (`createCanvas2D` → `useCanvas2D`, add
   `useCanvasLifecycle` as the lifecycle-only alias-of-record) — KEEP the handle return; a re-shape to a
   ref-bundle would diverge from the blessed WebGL twin and re-litigate internals §4 note 10 forbids. RATIFY
   that the rename does not touch the handle shape, only the export name.
2. **The subpath NAME — `/canvas` vs `/canvas-lifecycle` (RATIFY-BEFORE-IMPL).** The charter literal is
   `/canvas`; a `/canvas-lifecycle` name would parallel the lifecycle framing of the WebGL substrate.
   **Recommendation: `/canvas`** (the charter literal + the shorter consumer import). RATIFY before the
   `package.json` `exports` block is authored (the subpath name is a published contract — a later rename is
   itself a breaking change).
3. **`useTextHighlight` MOVE vs DUAL-PUBLISH (RATIFY-BEFORE-IMPL).** It ships on `/dom` at HEAD; the charter
   + census name `/motion-core`. **Recommendation: a clean MOVE to `/motion-core`** (one home, per the
   one-path mandate — text-highlight is a motion/decoration concern, not a DOM-observer concern; `/dom` was
   the wrong home) + re-point the in-repo `FuzzySearch.vue` import. A DUAL-PUBLISH (leave `/dom`, add
   `/motion-core`) violates one-path (two homes for one composable). RATIFY before relocating so the file
   moves once. (CONFIRM the `useTextHighlight` import graph is keyframes-FREE + vueuse-FREE — it imports only
   `vue` `getCurrentScope`/`onScopeDispose`, so `/motion-core` is valid; verified at HEAD.)
4. **`/api` discovery-layer types — add the canvas + text-highlight public types (RATIFY-BEFORE-IMPL).** The
   `/canvas` substrate now has public-subpath surface (`Canvas2DFrame`/`Canvas2DOptions`/`Canvas2DHandle`/
   `Canvas2DSuspendReason`, the `resolveCanvasColor` signature, `UseTextHighlightControls`).
   **Recommendation: ADD them to `/api`** (the discovery layer carries the canonical public types per L.W1
   Lane B; a published subpath's types belong in the census). RATIFY whether all four canvas types + the
   text-highlight controls type are promoted, or only the consumer-facing subset.
5. **§4-note-12 verification guardrail (RATIFY the don't-re-ship discipline).** The charter titles W37 "two
   NET-NEW substrates" but BOTH exist at HEAD (the live re-diagnosis correction). **Recommendation: the
   wave-open live re-diagnosis MUST confirm `useCanvas2D` + `useTextHighlight` are LANDED (not net-new) and
   the FuzzySearch `<mark>` retirement is DONE** — so W37 PUBLISHES/NAMES/ROUTES + ships the ONE net-new
   helper (`resolveCanvasColor`), and does NOT re-implement landed substrate (the §4-note-12 verify-against-HEAD
   discipline). RATIFY that the audit json records this correction explicitly so the "net-new" title is not
   re-read as a from-scratch authoring mandate.
