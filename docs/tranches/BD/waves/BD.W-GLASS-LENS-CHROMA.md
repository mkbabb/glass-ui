# BD.W-GLASS-LENS-CHROMA — the chromatic-aberration RGB-split lens rim (re-decide → perf-gated build)

- **Band:** 2 — Glass material deepening · **Status:** SPEC (tranche-dev; NOT executed) · **Merged from:** DF (T2 / the original BD.W-GLASS-CHROMA-RIM) + PROC (BD.W-GLASS-LENS-CHROMA) — ONE merged chroma-rim wave · **Fold-ledger:** Class A row 2 (`→BD.W-GLASS-LENS-CHROMA`, trigger = RE-DECIDE first; if still booked + perf clears (3 SVG passes), ships; else HELD with the perf number).
- **One-line goal:** RE-DECIDE the booked chromatic-aberration RGB-split lens rim (the `--glass-lens-chroma` knob, default OFF) — confirm no BC verdict closed it — and IFF the per-frame perf clears, build it: the lens rim disperses into R/G/B per-channel displacement so a glass edge shows the prism-split a real heavy-physical-glass edge shows, the booked successor to W-LENSING's monochrome single-channel displacement. The default-OFF no-op floor byte-matches the monochrome HEAD; the warm-cream identity holds (the dispersion is on the SVG `backdrop-filter` graph, ZERO GL-shader touch).

---

## 1. Band + goal

**Band 2 — Glass material deepening.** W-LENSING (BB) shipped the squircle-bevel refraction lens — a single displacement map (R = x-shift, G = y-shift) bending the backdrop, but with the EXPLICIT recorded fence "refraction is DEPTH not hue (the displacement map carries no color … the chromatic-aberration RGB-split rim is a booked successor)." A real thick-glass edge does not just bend light uniformly — it DISPERSES it: red, green, and blue refract by slightly different amounts (chromatic aberration), so the rim carries a faint spectral split. This wave is the booked successor: a `--glass-lens-chroma` knob (default OFF) that, when ON, splits the lens displacement into THREE per-channel passes at slightly different `scale` magnitudes, recombining via channel-isolated displacement maps so the rim shows the RGB dispersion — the "unmistakably iOS / heavy physical glass" rim the awwwards hero-studios cite (`research/awwwards-herostudios.md:57` — "ultra-thin high-chroma spectral edge-splitting = heavy physical glass").

The wave is FIRST a RE-DECIDE (the FOLD-LEDGER mandates confirming no BC verdict already closed it), THEN a perf-gated build.

---

## 2. Starting state (verified on disk)

**`src/styles/glass-refract.css` — VERIFIED by reading the file.**

- `:82-98` — the `.glass-lens` rule mints `--glass-refract-bevel: 14%` (`:86`, the rim-band knob) and `--glass-refract-filter` (`:97`), the SINGLE complete self-contained `data:` URI carrying the whole 3-primitive graph: `feImage` (the squircle crossed-gradient displacement map — `id=hx` HORIZONTAL R-channel gradient + `id=vy` VERTICAL G-channel gradient, SCREEN-composited over black), `feDisplacementMap` (one pass, `scale='28'` baked, `xChannelSelector='R' yChannelSelector='G'`), `feImage` specular (the warm catch-light), `feBlend screen`. ONE displacement pass — there is NO B-channel, NO per-channel scale, NO chroma split (verified — `scale='28'` baked literal, the monochrome displacement).
- `:83-86` — the anchor comment VERBATIM: `/* The bevel-band width the squircle map encodes (the iOS edge concentration). Documents the rim thickness the baked stops fix; a consumer reads it to tune the perceived rim band on a successor re-bake. */`. **This `:85` "perceived rim band on a successor re-bake" IS the booked anchor** the CANDIDATE-WAVES cites — the chroma-rim is the re-bake the comment foresees.
- `:106-111` — the `@supports (backdrop-filter: url("#glass-refract"))` gate: `.glass-material.glass-lens, .glass-lens { backdrop-filter: var(--glass-blur-resting) var(--glass-refract-filter); }`. The lens is Chromium-only (WebKit bug 245510 open); off-Chromium paints the un-gated blur+tint base alone (the no-workaround degrade floor).
- `:34-58` — the DDR-LENS-BAKE header note records WHY the `scale` is a baked literal not a var() axis (the scope-2 head/tail var-splice was doubly broken — it emitted three tokens a `backdrop-filter` rejects + the bare-quote tail broke consumer bundlers). **This is the load-bearing constraint for the chroma build:** any multi-pass chroma filter MUST stay inside ONE complete self-contained `data:` URI token (the only form that PARSES + survives the url()-rewriter); the THREE channel passes live as three `feDisplacementMap` primitives INSIDE the one `<filter>` graph, NOT three separate `url()` tokens.

**`scripts/proof-lensing.mjs` — VERIFIED `:1-209`.** L1-L6 device-free + 4 self-test bites, byte-fencing the lens:
- L1 (`:112-159`) — the consuming `--glass-refract-filter` is ONE complete self-contained `data:` URI with a baked `scale='<n>'`, NOT the retired var()-spliced form; `urlTokenCount === 1`, `isDataUri`, `scaleBaked`, `!scaleVarSpliced` (`:130-134`). **This is the fence the chroma build must respect — the chroma filter stays ONE url() token.**
- L2 (`:162-193`) — the displacement map is the squircle crossed-gradient (`hx` + `vy` axis gradients, SCREEN-composited, `:172-174`), NOT a uniform `radialGradient` placeholder (`:176`); the `--glass-refract-bevel` knob minted (`:178`).
- L3 (`:196+`) — the whole lens sits behind `@supports (backdrop-filter: url(#…))`; no refraction `backdrop-filter` outside the gate.
- L6 — the GL-shader fence (`SHADER_FILES` `:99-103`) — ZERO aurora.frag / metaball.frag / webgl/shaders edit.

**The booking, VERIFIED across the corpus:**
- `docs/tranches/BC/DEFERRAL-LEDGER.md:307` — `| T2 | chromatic-aberration RGB-split rim (--glass-lens-chroma, perf-gated, 3 SVG passes) | BB.W-LENSING | BOOKED | RE-DECIDE — BC.W-GLASS-LEGIBILITY-MEASURED / BC.W-BUTTON-GLASS-IOS (Band 1): whether the chroma rim ships in the iOS-27 glass rebuild |`.
- `docs/tranches/BC/research/deferral-sweep.md:238` — the same T2 row, routed to BC Band 1 to re-decide.
- `docs/tranches/BC/research/apple-ios27.md:44` — "No chromatic aberration in Apple's web-replica spec (only R/G x/y displacement; an RGB-split rim is a 'booked successor' both in kube.io and in glass-ui)."
- **The RE-DECIDE finding (VERIFIED by grep of BOTH BC waves):** `BC.W-GLASS-LEGIBILITY-MEASURED.md` + `BC.W-BUTTON-GLASS-IOS.md` mention "chroma" ONLY as the `oklab-chroma > 0` warm-not-grey LEGIBILITY metric (`:30,50,59` etc.) — NEVER a chroma-RIM verdict. **No BC wave landed a decision on T2; it stays an open re-decide owed forward to BD.** This is the wave's first deliverable: the recorded RE-DECIDE verdict.
- `CLAUDE.md:471` (W-LENSING canon) — "refraction is DEPTH not hue (the displacement map carries no color … the chromatic-aberration RGB-split rim is a booked successor)." The chroma rim is the named successor that widens this exactly.

**The technique reference (verified):** `research/awwwards-herostudios.md:57,171` — the ybouane/liquidglass + naughtyduk/liquidGL WebGL displacement/chromatic-aberration glass libs; glass-ui books the dispersion-on-the-rim as the W-LENSING successor. It SHARES the dispersion technique with the goo-blob dispersion (Band 3 / Geeks3D / Maxime Heckel cites) — but glass-ui's chroma rim is the SVG `backdrop-filter` path (portable, no GL shader), distinct from the goo-blob's in-shader dispersion (which is the GL path).

---

## 3. The build

**The build is TWO-PHASE: a recorded RE-DECIDE verdict, THEN a perf-gated build. If perf bites → re-stamp HELD with the recorded number (no build).**

### Phase 1 — RE-DECIDE (the mandated first step)
Record the verdict in `docs/tranches/BD/audit/W-GLASS-LENS-CHROMA-DECIDE.md`: confirmed by grep that NO BC.W-GLASS-LEGIBILITY-MEASURED / BC.W-BUTTON-GLASS-IOS verdict closed T2 (the BC "chroma" mentions are all the legibility `oklab-chroma > 0` metric, not the chroma rim). The booking stands open → proceed to Phase 2 (the perf-gated build). The verdict names the perf bar (3 `feDisplacementMap` passes — the most expensive idiom × 3) as the gating condition.

### Phase 2 — the perf-gated build (IFF the per-frame cost clears)
The default-OFF chromatic-aberration lens rim:

1. **Mint `--glass-lens-chroma` on `.glass-lens`** (`glass-refract.css`, beside `--glass-refract-bevel` `:86`) — a typed register, the dispersion magnitude. Default `0` (the NEUTRAL identity — at 0 the lens renders byte-identical to the monochrome HEAD, the no-op floor). It is a `<number>` (the per-channel scale OFFSET in px the R and B passes diverge from the G base — e.g. R = `scale - chroma`, B = `scale + chroma`, the physical dispersion where red bends least, blue most).

2. **Author the 3-pass chroma displacement filter** — a SECOND complete self-contained `data:` URI (`--glass-refract-filter-chroma`), structured as ONE `<filter>` graph with THREE `feDisplacementMap` primitives, each isolating ONE channel of the SourceGraphic via an `feColorMatrix` (R-only / G-only / B-only), displaced at the per-channel scale (R at `scale-chroma`, G at `scale`, B at `scale+chroma`), then `feComposite`/`feBlend` recombined. The displacement maps reuse the SAME squircle crossed-gradient (no new map — the dispersion is in the differing per-channel `scale`, not a new bevel profile). **The whole graph stays ONE `url("data:…")` token** (the L1 fence — three passes INSIDE one filter, not three url() tokens). Because a CSS `var()` cannot splice into the baked `scale` literals (the DDR-LENS-BAKE CSSWG #542 limit), the chroma magnitude is a DISCRETE set of pre-baked filter variants (e.g. a `--glass-refract-filter-chroma` at the default dispersion + a `[data-lens-chroma="strong"]` variant), NOT a continuous var()-driven scale — the same discrete-swap discipline DDR-LENS-BAKE established for the monochrome scale.

3. **The consuming selector** — INSIDE the EXISTING `@supports (backdrop-filter: url(#…))` gate (`:106`), the chroma filter is reached behind `.glass-lens[data-lens-chroma]` (or a `--glass-lens-chroma > 0` toggle): `.glass-lens[data-lens-chroma] { backdrop-filter: var(--glass-blur-resting) var(--glass-refract-filter-chroma); }`. The bare `.glass-lens` (no chroma attr) keeps the monochrome `--glass-refract-filter` (`:109`) byte-untouched. Off-Chromium degrades to the blur+tint base (no chroma, no break — the L3 floor preserved).

**Fences honoured:**
- **The DDR-LENS-BAKE single-data-URI fence** (L1) — the chroma filter is ONE complete self-contained `data:` URI, baked scales, NOT a var()-spliced or multi-token form (the only bundler-safe + parse-valid form). The three passes live inside the one `<filter>`.
- **The GL-shader fence** (L6) — ZERO aurora.frag / metaball.frag / webgl/shaders touch. The chroma is the SVG `backdrop-filter` graph (the §7 fence — the same fence the monochrome lens respects).
- **Warm-cream identity** — the dispersion is a per-channel REFRACTION offset (a physical-optics split of the SAME backdrop), NOT a hue INJECTION (the filter adds no color of its own; it splits the existing backdrop's RGB). The warm-cream `--card` base, the warm-ink rim, the warm-cream specular core are UNTOUCHED. The chroma is a faint EDGE-BAND dispersion (masked to the bevel rim via the crossed-gradient's steep-at-rim profile), never a full-plate rainbow.
- **The default-OFF no-op floor** — at `--glass-lens-chroma: 0` / no `data-lens-chroma`, the `.glass-lens` resolves the monochrome filter byte-identically (`color-mix`-style identity: zero dispersion = the single displacement). `proof:lensing` L1-L6 stay GREEN by construction (the monochrome path is the default).
- **One-GL-per-route** N/A (SVG filter, not a GL context). **Profile:budget** — the bundle weight gain is the second data-URI string (a few KB raw; the chroma filter ships in the `/styles` cascade — verify it stays under the CSS ceiling, but the BINDING gate is the per-frame `proof:nested-backdrop-budget` cost of the 3-pass filter, NOT the bundle bytes).
- **`@supports`-gated PE-only** — the chroma rim is NEVER promoted to the card/primitive substrate (the same fence the monochrome lens carries — `feDisplacementMap` × 3 is resize-expensive; it stays an opt-in garnish over the blur base).

---

## 4. The gate — born-RED → GREEN: `proof:glass-chroma` (or a new L7/L8 clause in `proof:lensing`)

**Born-RED on the current tree** (the chroma filter + the `--glass-lens-chroma` knob do not exist) **→ GREEN at the build.** The cleanest design is a NEW gate `proof:glass-chroma` (a sibling to `proof:lensing`, mirroring the comment-strip + pure-detector house pattern), OR new clauses appended to `proof:lensing` (L7-L9). Either way the clauses:

- **C1 — the chroma knob + filter are minted.** `--glass-lens-chroma` declared on `.glass-lens` (default `0`, the neutral identity) AND `--glass-refract-filter-chroma` is a SECOND complete self-contained `data:` URI carrying THREE `feDisplacementMap` passes (the per-channel split). Born-RED at HEAD (`grep --glass-lens-chroma glass-refract.css` → exit 1; `grep -c feDisplacementMap` on the chroma filter → must be ≥ 3).
- **C2 — the THREE per-channel passes split.** The chroma filter carries three displacement passes at DIFFERING scale magnitudes (R < G < B, the physical dispersion ordering — red bends least), each channel-isolated (an `feColorMatrix` R-only/G-only/B-only per pass). Born-RED at HEAD (no chroma filter); a chroma filter with three IDENTICAL scales (no actual dispersion) reds (the no-op-pretending-to-disperse evasion).
- **C3 — the default-OFF no-op floor.** The bare `.glass-lens` (no `data-lens-chroma` / `--glass-lens-chroma: 0`) resolves the MONOCHROME `--glass-refract-filter` byte-identical to HEAD; `proof:lensing` L1-L6 cross-asserted GREEN (the chroma is purely additive behind the opt-in attr — the monochrome path untouched). Born-RED if the chroma build edited the monochrome filter.
- **C4 — the DDR-LENS-BAKE single-data-URI fence.** The chroma filter is ONE `url("data:…")` token (`urlTokenCount === 1`, `isDataUri`), baked scales, NO `var(--…)` splice into a `scale`, NO bare-quote tail. Born-RED if the build used a var()-spliced or multi-token form (the broken scope-2 revival).
- **C5 — the GL-shader fence holds.** ZERO aurora.frag / metaball.frag / webgl/shaders edit in the wave's bounds (the chroma is SVG, the §7 fence — mirrors `proof:lensing` L6).
- **C6 — the @supports gate + the PE-only fence.** The chroma `backdrop-filter` sits INSIDE the `@supports (backdrop-filter: url(#…))` block (off-Chromium degrades clean); the chroma rim is NEVER on a base card/primitive substrate rule (opt-in `.glass-lens[data-lens-chroma]` only).
- **C7 — a perf-gate clause (the budget record).** Like `proof:glass-legibility` L4's honest-budget pattern: the chroma ships ONLY with a recorded `proof:nested-backdrop-budget` clearance (the 3-pass per-frame cost number recorded in the chroma filter's inline note); a silent ship with no recorded perf number reds (the honest-gate — 3 SVG displacement passes is the cost, the budget must be recorded).

**The self-test bite (the planted defect that MUST red):**
- (i) a chroma filter with three IDENTICAL per-channel scales (a fake-dispersion no-op) MUST red C2 (the dispersion-magnitude assert has teeth).
- (ii) a chroma build that EDITED the monochrome `--glass-refract-filter` MUST red C3 + `proof:lensing` L1 (the no-op floor / monochrome-untouched assert).
- (iii) a var()-spliced chroma `scale` (the retired scope-2 revival) MUST red C4 (the DDR-LENS-BAKE fence).
- (iv) a chroma `backdrop-filter` OUTSIDE the `@supports` gate OR on a base `.glass-card`/`.glass-resting` rule MUST red C6 (the degrade-floor / PE-only fence).
- (v) a ship with no recorded budget number MUST red C7 (the honest perf-gate — mirrors L4's silent-stay bite).

---

## 5. Paint verification (both modes — the BC anti-disease law)

**This is a VISUAL wave — it earns a `proof:ba-gestalt` glass verdict and a CAPTURED paint delta on real GPU (Chromium — the lens is Chromium-only), both modes × desktop+mobile, per the BC gestalt-first-capture law. NO source-green close; "rides W-REFLECT3" FORBIDDEN (G8).**

- **π readback** — author `tests-visual/glass-chroma.spec.ts` (Chromium, LOCAL real-render) — on a `.glass-lens[data-lens-chroma]` surface over a HIGH-CONTRAST backdrop edge (a black/white boundary behind the glass, where dispersion reads strongest), capture the rim band and assert the RGB channels SEPARATE at the edge (a red fringe on one side, a blue fringe on the other — the chromatic split), distinct per-channel at the rim, both modes. AND the OFF state (`.glass-lens` no attr) byte-matches the monochrome HEAD (no fringe — the no-op floor). Born-RED on HEAD (no chroma filter → no fringe).
- **Captured DELTA (chrome-devtools-MCP)** — a side-by-side of the lens rim chroma-OFF (monochrome bend) vs chroma-ON (the RGB-split fringe) over a sharp backdrop edge, both modes, with the per-frame budget number annotated (the 3-pass perf proof). A human reads: the chroma-ON rim shows the heavy-physical-glass prism split a real thick glass edge carries; the chroma-OFF rim byte-matches HEAD. The awwwards hero-studios spectral-edge ground (`research/awwwards-herostudios.md:57`) is annotated alongside. Lands at `docs/tranches/BD/audit/visual/W-GLASS-LENS-CHROMA-DELTA.md`.
- **The frame-budget capture IS load-bearing** — the 3-pass filter under a scroll/resize jiggle, the per-frame trace showing the median under 16.7ms (the number that AUTHORIZED the ship). If it bites → no build, re-stamp HELD with this number (Phase-2 abort).
- **WebKit/degrade** — the lens is Chromium-only; on WebKit the `@supports` gate fails and the surface paints the blur+tint base alone (no chroma, no break) — verify the degrade floor holds (a `getComputedStyle` `backdrop-filter` readback on WebKit resolves the un-gated blur, NOT a broken `url()` reference).
- **If perf bites (Phase-2 abort):** no paint, no `proof:ba-gestalt` verdict — the FOLD-LEDGER re-stamps HELD with the recorded budget number (the W-PRUNE-CONSOLIDATE zero-pixel precedent). The RE-DECIDE verdict (Phase 1) is the recorded outcome.

---

## 6. Fences + risks (what must NOT break)

1. **The DDR-LENS-BAKE single-data-URI fence is ABSOLUTE** (`proof:lensing` L1). The chroma filter is ONE complete self-contained `data:` URI with baked scales — the ONLY form that PARSES as a `backdrop-filter` value AND survives a consumer bundler's url()-rewriter. The three passes live INSIDE one `<filter>` graph; NO var()-spliced scale (the CSSWG #542 limit holds), NO multi-token form (the broken scope-2 three-token form reds), NO bare-quote tail (the ENOENT bundler break). Re-introducing the scope-2 var()-splice is the forbidden stale revival.
2. **The GL-shader fence holds** (`proof:lensing` L6 / C5). The chroma is the SVG `backdrop-filter` graph — ZERO aurora.frag / metaball.frag / webgl/shaders / procedural-color.glsl touch. This is DISTINCT from the goo-blob in-shader dispersion (Band 3, the GL path) — the two share the dispersion CONCEPT, never the implementation seam (file-line-disjoint).
3. **The warm-cream identity holds.** The dispersion is a physical-optics REFRACTION split of the SAME backdrop (red bends least, blue most), NOT a hue injection — the filter adds no color of its own. Masked to the bevel rim band (the steep-at-rim squircle profile), it is a faint EDGE fringe, never a full-plate rainbow (the garish-neon read forbidden). No ppmycota/cool hue enters a token.
4. **The default-OFF no-op floor is byte-exact** (C3). At `--glass-lens-chroma: 0` / no `data-lens-chroma`, the lens is the monochrome HEAD byte-for-byte — `proof:lensing` L1-L6 stay GREEN by construction. The chroma is PURELY additive behind the opt-in attr; the monochrome `--glass-refract-filter` (`:97`) is byte-untouched.
5. **The @supports + PE-only degrade floor** (L3 / C6). The chroma sits inside `@supports (backdrop-filter: url(#…))`; off-Chromium degrades to the blur+tint base alone (no broken `url()` ref). The chroma rim is NEVER promoted to the card/primitive substrate (`feDisplacementMap` × 3 is resize-expensive — opt-in garnish only).
6. **The budget is binding** (C7). The 3-pass filter ships ONLY on a recorded `proof:nested-backdrop-budget` clearance (3 SVG displacement passes is the most expensive idiom × 3). A silent ship with no recorded number is the forbidden over-spend; the conservative HELD fall (Phase-2 abort) is the honest outcome IFF the budget bites.
7. **Presets-in-consumers** — the library ships the chroma rim DEFAULT-OFF as an opt-in identity register; a consumer opts in via the `data-lens-chroma` attr / the `--glass-lens-chroma` knob (the same library register). No demo hue, no consumer-local fork.

**Risk:** the 3-pass `feDisplacementMap` filter is genuinely 3× the most expensive idiom — it may bite the per-frame budget on real GPU (especially mobile under throttle). The DECISION is the work: RE-DECIDE → perf-MEASURE → land-or-hold. The wave is NOT "ship chroma" — it is "re-decide the booking, then ship IFF perf clears, else re-stamp HELD with the recorded number." Both outcomes are honest dispositions (the no-silent-drop discipline). A second risk: dispersion that reads as a CHROMA SMEAR (too wide a band) rather than a crisp rim fringe — the band is masked to the steep-at-rim squircle profile + capped LOW (the `--glass-lens-chroma` default is a faint divergence), bounded by the warm-cream identity (a faint heavy-glass fringe, not a prism toy).
