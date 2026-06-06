# Tranche AV — fix aurora (the OETF) + the SOTA-animation/procedural folds + the design-system ripening

AV is glass-ui's post-AU tranche. AU drove the AT authored-but-unrun mass to
**READY-TO-PUBLISH** for the 3.3.0 cut — the blob trio, the `/color` leaf, the
`useWebGLCanvas` substrate, the dock-motion overhaul, the W9 supply — and the verdict on
that work is **overwhelmingly idiomatic (27/31 lanes; NO landed defect needs
re-architecture)**. AV is therefore NOT a corrective successor over a broken close — it is
the **ripening tranche**: it lands the one CORRECTNESS defect the deep audit DID surface
(the aurora OETF darkening — the user-mandated "fix aurora" headline), folds the SOTA-
animation + procedural-shader research that ripened since AU, lifts the AU-deferred BOOK
items whose triggers have since fired, and transposes the hygiene the audit named (the
33-barrel metadir, the composable-tree, the dock-context factory, the doc-currency). NO
landed AU work is re-litigated.

**Plan basis** — `audit/AUDIT-DIGEST.md` (the 4-stream audit condensed: Workflow A 32-agent
deep tranche audit, Workflow B 32-agent aurora+blob spec, Workflow C 6-agent keyframes,
live-validation dev-walk) + `audit/live-validation.md`. The SOTA-research crosswalk folds in
at the wave that wants it (a `## SOTA crosswalk (folded)` placeholder per the digest). The
conjoint-perfection round adds three more binding grounds — `audit/union-digest.md` (the
four-repo ownership map + the D1-D8 de-duplication routing), `audit/conjoint-perfection-digest.md`
(the augmented AV waves W0-W8 + the dock/animation/UI-UX perfection + the constellation map),
and `audit/conjoint-augmentations.md` (the per-fold detail). `audit/SOTA-crosswalk.md` stays
the Baseline-dated authority; `UNION-COORDINATION.md` records the cross-repo horn signals. Every
fact below is re-grounded against glass-ui HEAD `d58de1d`.

**Audit grounding (binding for every AV wave):** `audit/union-digest.md`,
`audit/conjoint-perfection-digest.md`, `audit/conjoint-augmentations.md`,
`audit/SOTA-crosswalk.md`, `audit/live-validation.md`, and the cross-repo `UNION-COORDINATION.md`.
Each AV fold cites the digest section it lands.

**Audit grounding — Band 2 (the reinvent waves W9-W17):** `audit/reinvent/INDEX.md` indexes the
6 live-audit digests grounding the reinvent arc — `storybook-digest.md` (the 11-category IA +
the prune ledger + the font-defaults location → W10), `dock-slider-digest.md` (the AU.W8b
dual-driver freeze root-cause + the single-driver rebuild + the slider two-only unification →
W9 + W11), `legacy-architecture-digest.md` (the fail-explicit policy + the god-module
decomposition + the DI/boundaries/nested-imports/test-in-src/DRY sweep → W12 + W13 + W14),
`ios26-partial-digest.md` (the iOS-26 MOTION contract + the dock velocity-continuity gap + the
speedtest-ownership ledger → W9 + W15 + W17), `ios26-tailwind-font-digest.md` (the Liquid Glass
material evolution + the modern-Tailwind v4 cohesion + the font-fix → W15 + W16 + W10), and the
slides-arm `slides-restructure-digest.md` (OUT — inv-16 name-forward, the G slides restructure).
Each Band-2 wave cites its digest in its `waves/` spec.

**Format** — mirrors AU (`AV.md` charter + `PROGRESS.md` + per-wave specs under `waves/` +
`FINAL.md`). This file is the CHARTER only — DEV (it writes no `src`). The per-wave specs
(`waves/AV.W1-aurora-fix.md`, `waves/AV.W2-blob-converge.md`, `waves/AV.W3-motion.md`, …)
are authored by the sibling fleet. AV.W0 (formalize + doc-currency) + AV.W1 (the aurora fix)
are **AT-disjoint** — they touch no published-surface contract and open BEFORE the 3.3.0
publish; the publish-gated lifts wait on E1.

---

## §0 — The directive → disposition

The user's AV-round asks, each → one disposition row. No ask is silently absorbed.

| # | The user's directive (AV round) | Disposition |
|---|---|---|
| D-1 | **"fix aurora"** | **AV.W1 HEADLINE.** The aurora shader outputs linear sRGB with NO sRGB OETF (`aurora.frag.ts:817` `fragColor = vec4(col * uAlpha, uAlpha)`) → ~2.2× too dark. The blob does it RIGHT (`metaball.frag.ts:278` applies the mandatory `linearToSrgb()`). FIX = copy the blob's path: add `linearToSrgb()` (def at `metaball.frag.ts:132-137`), insert `col = linearToSrgb(col)` before `:817`, re-bake all 11 presets, re-bless every aurora snapshot. Gate: `proof:aurora-space-gamma` (widen the blob-only `proof:blob-space-gamma`) + a shader-equivalence assert. |
| D-2 | **"shadow-cartoon-lg is to ship"** | **AV.W2 (contract-doc), library-side SATISFIED.** `--shadow-cartoon-lg` ALREADY ships canonical: `tokens.css:563 → theme.css:295 → utilities.css:638 (.shadow-cartoon-lg) → cards.css:46`. AV ships NO new token — it **documents the consumer-overridable token contract** (decks parametrize via override, NOT re-declaration). The slides-side dead re-declaration reconcile is G's arm (OUT, inv-16). |
| D-3 | **the SOTA-animation research folds** | **AV.W3 + AV.W6.** Adopt the keyframes E.W10 value.js-free LIGHT orchestration tier (`stagger`/`flip`/`Sequence`/`animate()`) + the E.W9 native-scroll/PRM bridge into glass-ui's motion composables; the 14-agent SOTA crosswalk folds at the `## SOTA crosswalk (folded)` placeholder when it lands. value.js-free → root-barrel-safe. |
| D-4 | **the deferred-fold sweep** | **§3 ledger + the lift waves.** Every AU `FINAL.md §2` BOOK + the digest's FOLD-AV / AV-GATED / KEEP-BOOK rows is transcribed with its trigger. The fired triggers fold (useIdleSchedule, Card cartoon-dark lift, the motion tier); the unmet stay BOOK with the trigger named. Zero silent punts (P-Inv 28). |
| D-5 | **"NO legacy/workarounds; gestalt transpositions for elegance/simplicity/performance"** | **AV.W5 + §6.** The audit's hygiene targets are gestalt transpositions, not patches: `scheduleAfterFirstPaint` inline → `useIdleSchedule` extract; 33 one-line subpath barrels → `src/subpaths/` metadir; orphaned top-level composables → domain sub-trees; dock provide/inject → `createDockContext<T>()` factory (−30-40 LOC). Net-deletion-or-neutral; ≥2-consumer-gated. |
| D-6 | **the storybook re-invention + prune** | **AV.W10.** The live-audit found the demo storybook IA incoherent. Re-invent it to the 11-category tree (substrates surfaced near top, dock consolidated into ONE Navigation section, debris bins dissolved); prune the demo-route orphans + the TWO genuine src orphans (metric-cell, metric-stack); record the honest push-back where a removal directive collides with a real consumer (instrument-*/glyph-face/disco-glyph SHIP); fix the demo font-canon (retired faces in the picker). Gate: `proof:storybook-ia` + `proof:no-orphan-demo-route` + `proof:font-canon`. |
| D-7 | **the dock rebuild from first principles** | **AV.W9 HIGH-PRIORITY HEADLINE (Band 2).** The live audit DISPROVED the "dock perfect-already" verdict — the dock is FROZEN at runtime (the AU.W8b `interpolate-size` native arm fights the FLIP `SpringProgress` driver; both write `width`, cancelling the motion). Rebuild on ONE driver per swap, ONE layering model, velocity-continuity on retarget, a momentum-gated press spring, and a born-RED behavioral gate. Supersedes the §1 "dock perfect-already" claim. Gate: `proof:dock-animation-live`. |
| D-8 | **the slider unification** | **AV.W11.** Collapse the six-variant `<Slider>` sprawl to exactly TWO canonical recipes — `standard` (the continuous rounded iOS knob) + `spectrum` (the gradient-track color slider); delete the four overfit variants with their scoped CSS; port every consumer. Gate: `proof:slider-two-only`. |
| D-9 | **the legacy excision + god-modules + DI/hygiene** | **AV.W12 + AV.W13 + AV.W14.** W12 — the fail-explicit policy (excise silent error-swallows; keep befitting `@supports` fallbacks documented) + the production-code legacy-commentary excision. W13 — the god-module decomposition (no `src/` file >500 lines; aurora.frag 819, useSortable 659, Progress 649, runtime 530, metaball 282). W14 — the canonical DI factory pair + no-nested-import + test-in-src relocation + pipeline-orchestration hygiene. Gates: `proof:fail-explicit`, `proof:no-legacy-commentary`, `proof:no-god-module`, `proof:no-nested-import`, `proof:no-test-in-src`, `proof:di-consistency`. |
| D-10 | **the iOS-26 Liquid Glass + modern Tailwind** | **AV.W15 + AV.W16.** W15 — the portable Liquid Glass subset as token edits + additive folds over the warm-cream identity (per-rung saturate, `--glass-edge-light` rim, content-aware under-shadow, the pointer-anchored moving specular). W16 — the modern-Tailwind v4 cohesion (`@theme inline` migration, oklch palette ramps, container queries, the registered-token lifts + `theme()`-function kills). Gates: `proof:liquid-glass-tokens`, `proof:tailwind-v4-idiom`. |
| D-11 | **the speedtest ownership** | **AV.W17.** Audit the speedtest-origin composable set; ledger each STAY-as-CORE (a general web-platform primitive with ≥2 genuine glass-ui consumers) or MOVE-to-speedtest (app-specific OR orphaned). The ≥2-consumer bar, not the ORIGIN, decides ownership; the speedtest moves are name-forward (inv-16). Gate: `proof:speedtest-boundary`. |

---

## §1 — Where AV stands (re-ground, HEAD `d58de1d`)

HEAD `d58de1d`, branch `at-dock-convergence`, version **3.2.0 in-tree, 3.3.0
READY-TO-PUBLISH** (AU staged the 3.3.0 changeset; `package.json.version` stays `3.2.0`
until the user runs `changeset version` at publish — `AU.FINAL.md §6`). The published npm
baseline is **3.2.0** (`v3.2.0`). HEAD is `d58de1d` — the AU finalization-amelioration
commit (2 ship-blockers cleared + 3 audit-found defects + test hardening) atop the AU
W0→W10 chain.

**The deep-audit verdict (Stream A):** the AU+F work is **27/31-idiomatic** — NO landed
defect needs re-architecture. AV transposes only hygiene + the deferred-fold ledger. The
single CORRECTNESS finding is the aurora OETF (Stream B), which AV.W1 lands as the headline.

**RE-SCOPE — the live-audit correction (the dock is NOT perfect-already).** The reinvent
live-audit round (`audit/reinvent/`) disproved the Stream-A "dock perfect-already" reading.
The static gates that blessed the AU.W8b dock-motion overhaul passed on SYNTAX, never on
runtime paint — and the dock is FROZEN at runtime. The AU.W8b `@supports (interpolate-size:
allow-keywords)` native CSS arm (`dock.css:400-409`) fights the JS `SpringProgress` FLIP
driver (`useLayerTransition.ts`): both write `.dock-layers` width on Chrome 129+, cancelling
the motion. The `proof:dock-motion-single-source`/`proof:dock-opacity-lockstep` gates are
STRING-MATCH scans — they assert intent, never mount a browser, never observe a painted frame,
and their scripts explicitly delegated the perceptual half downstream that never returned. So
the freeze shipped green. This is the honest lesson — a gate-vs-runtime gap the static fleet
could not see. **AV.W9 (dock-rebuild) SUPERSEDES the "dock perfect-already" claim** (and the §4
"DONE — dock-motion overhaul" entry is corrected to OPEN-FOLD → AV.W9): the native arm is the
regression, not the perfected baseline. W9 rebuilds on one driver per swap, one layering model,
velocity-continuity, and a born-RED real-browser behavioral gate (`proof:dock-animation-live`)
that fails on a zero-delta/single-frame width timeline — so this regression class cannot ship
green again. The Band-2 reinvent waves (W9-W17) carry D-6 through D-11 (§0); W9 is the
HIGH-PRIORITY headline (AT-disjoint, opens NOW).

**AV is the ripening tranche** — its braids:
1. **The aurora fix** (AV.W1) — the OETF darkening, code-confirmed at `aurora.frag.ts:817`,
   live-confirmed (the canvas renders WebGL2-armed but linear-dark). The blob is correct at
   HEAD; the fix copies the blob's path.
2. **The procedural-shader convergence + SOTA folds** (AV.W2-W3) — converge aurora + blob
   onto a SHARED color/noise GLSL chunk so the OETF can never again diverge (the root of
   this bug); adopt the keyframes LIGHT orchestration tier.
3. **The deferred-lifts** (AV.W4) — the AU BOOK items whose triggers fired: the
   shadow-cartoon contract-doc, the gated Drawer-native (IFF the 2nd consumer cleared), the
   Card-cartoon-dark supply.
4. **The hygiene transpositions** (AV.W5) — the 33-barrel metadir, the composable-tree, the
   dock-context factory, the doc-currency.
5. **The SOTA perf wave** (AV.W7) — the content-visibility offscreen-pause (the #1 unpulled
   lever), the `contain`+blur-budget pass, the on-demand `will-change` lifecycle, the
   RAF↔visibility wiring, the DPR/budget tokens. (Added by the SOTA crosswalk fold.)
6. **The SOTA procedural primitive** (AV.W8) — the constellation on a new `useCanvas2D`
   substrate (Canvas2D, sibling to `useWebGLCanvas`); ADOPT-gated on the ≥2-consumer muster.
   (Added by the SOTA crosswalk fold; resolves the prior `useCanvas2D` BOOK.)

The `waves/` dir holds the per-wave specs this table references; the SOTA-crosswalk fold
authored W7+W8 and filled the W1/W2/W3 `## SOTA crosswalk (folded)` placeholders. AV.W1's spec
(`waves/AV.W1-aurora-fix.md`) is the named binding source for the headline.

---

## §2 — The wave table (Band 1: 9 waves · Band 2: 9 waves)

The tranche runs two bands. **Band 1 (W0-W8)** is the aurora-fix + SOTA-fold + ripening arc
(below). **Band 2 (W9-W17)** is the reinvent arc the live-audit round opened — the dock-rebuild
correction (D-7) + the storybook/slider/legacy/god-module/DI/iOS-26/Tailwind/speedtest folds
(D-6, D-8 through D-11). The Band-2 table sits at §2.A. **AV.W9 (dock-rebuild) is the
high-priority Band-2 headline** — it corrects the runtime regression the static gates missed, is
AT-disjoint, and opens NOW (it does not wait on the Band-1 close). The W6 gate-close meta-wave
(LAST) absorbs every Band-2 gate.

### Band 1 (W0-W8)

W0 (formalize) is DEV; W1–W8 are IMPL (the headline-first ordering: the aurora fix lands
ahead of the convergence + folds; the two SOTA-headline waves W7 perf + W8 constellation land
before the W6 close meta-wave, which DERIVES from the post-W7/W8 surface). Each wave names a
falsifiable HARD gate. **W7 (perf) + W8 (constellation-primitive) were added by the SOTA-
crosswalk fold** (see `## SOTA crosswalk` below); the ordering is W0→W1→W2→W3→W4→W5→W7→W8→W6,
with W6 (the close) LAST.

| Wave | What | Type | HARD gate (one-line, falsifiable) |
|---|---|---|---|
| **AV.W0** | Formalize the CHARTER into `tranches/AV/`; re-ground against `d58de1d`; bind zero-deferral at open (P-Inv 28); the doc-currency fixes — author `src/api.ts` flat barrel (the only subpath without one) + reconcile the `/api` header tally (literal block, not the claimed 70/67+3) + add `drawer.css`/`instrument-rail.css`/`fonts.css` to the CLAUDE.md styles block. **Conjoint fold:** D8 — bump the keyframes devDep `^2.2.0 → ^2.2.0 \|\| ^3.0.0` for peer parity (dev/test then runs the version downstream resolves; `package.json` devDep line 622 currently excludes v3 while the peer range allows it). Stage the value.js peer+devDep bump `^0.10.0 → ^0.11.0` (E-valuepeer) READY-TO-LAND on the 3.3.0 cut, gated on value.js publishing 0.11.0 FIRST (the `^0.10.0` range excludes 0.11.0; runtime edge already settled by `proof:blob-color-equivalence`). See `waves/AV.W0-formalize.md` + `audit/union-digest.md` D8 + `audit/conjoint-perfection-digest.md` §6 publish spine | DEV | `proof:av-w0-reground` — `AV.md`+`PROGRESS.md` exist; HEAD `d58de1d` ancestor-reachable; every digest item tagged; `src/api.ts` resolves; the 3 omitted CSS rungs listed in CLAUDE.md; keyframes devDep range == peer range |
| **AV.W1** | **AURORA-FIX (the user-mandated headline).** Add `linearToSrgb()` to `aurora.frag.ts` (copy `metaball.frag.ts:132-137`); insert `col = linearToSrgb(col)` before `:817`; re-bake all 11 presets via `profile-aurora.mjs`; update `DESIGN.md §7`; re-bless every aurora snapshot. PLUS the quality lift: fwidth-based stroke AA (replace the fixed smoothstep bands at `:493-494,:509-510,:554-558`). Gaussian softmax (`:206-234`) KEPT (atmospheric aesthetic). See `waves/AV.W1-aurora-fix.md` | IMPL | `proof:aurora-space-gamma` green (widened from `proof:blob-space-gamma`: `flipsToLinear && hasOetf` over BOTH shaders) + a shader-equivalence assert (linear→gamma output matches expected sRGB within float tolerance); bite: strip the OETF → red |
| **AV.W2** | **Blob+aurora procedural-shader convergence.** Converge the duplicated shader math (the `linearToSrgb` OETF + the rotated-octave FBM + the OKLCh↔OKLab Ottosson matrices) onto ONE shared GLSL chunk both shaders inline from one source — deletes the duplication + guarantees the OETF can never again diverge (the root of this bug). Converge both onto the injected `ColorResolver` seam (the `/color` leaf). PLUS document the shadow-cartoon-lg consumer-override contract (D-2). See `waves/AV.W2-blob-converge.md` | IMPL | `proof:shader-shared-source` — one OETF/FBM/matrix source; both `aurora.frag.ts` + `metaball.frag.ts` inline it; a duplicate-definition grep = 0; bite: re-inline a divergent copy → red |
| **AV.W3** | **Motion-composables + keyframes orchestration-tier adoption.** Adopt the keyframes E.W10 value.js-free LIGHT tier (`stagger`/`flip`/`flipShared`/`Sequence`/`animate()`) into `useStaggerReveal` + the new `useCountup`/`vReveal`; adopt the E.W9 native-scroll/PRM bridge. Deletes any hand-rolled stagger/sequence. value.js-free → root-barrel-safe. **Conjoint folds (`audit/union-digest.md` D1-D3, `audit/conjoint-augmentations.md`):** D1 — `useStagger.ts:135` + `useStaggerReveal.ts:68` compose keyframes `stagger()` for the delay ramp (CONDITIONAL — adopt IFF a non-linear `from`/`ease` consumer wants it, else BOOK; linear-only relocation churn is not warranted). D2 — migrate the `useLayerTransition.ts:178-269` + `useGlassCarousel.ts:122-207` FLIP measure/pin/invert onto keyframes `flip()`/`ElementMorph`, keeping each driver (layer = `SpringProgress`, carousel = CSS-transition). D3 — `useCountup` lifts onto `NumericAnimation` (/motion, keyframes-bearing), fixing the rAF leak via `onScopeDispose`. C2 — spring-coverage sweep: retire the three `--ease-apple-spring` cubic-bezier sites onto `--spring-*` `linear()` tokens, then delete the token. C3 — dock velocity-continuity: re-seat the live `SpringProgress` `(value, velocity)` on gesture-interrupt/retarget instead of reconstructing from the static `DOCK_SPRING` preset (the highest-leverage interaction-motion win). Plus the Baseline CSS folds (typed-VT, `@starting-style`, `color-mix(in oklch)` phase-tint). See `waves/AV.W3-motion.md` | IMPL | `proof:motion-value-free` (the adopted tier imports no `@vueuse/core` nor value.js on the root barrel) + `proof:motion-composables-consumer` (each adopted composable names ≥2 consumers); bite: a hand-rolled stagger survives → red |
| **AV.W4** | **Shadow-contract + Drawer-native (gated) + Card-cartoon supply.** Document the `--shadow-cartoon-lg` override contract (library-side already ships — D-2). Drawer `:native`/`GlassNativeDrawer`: **AV-GATED** — author IFF the 2nd native consumer cleared (muster live-behind FIRM; speedtest-native UNMET at AU close), ELSE stays BOOK. Card `surface="cartoon"` dark arm: FOLD IFF the 7-liftable set resolves a ≥2 with genuinely divergent dark offset/border values, ELSE BOOK. See `waves/AV.W4-supply.md` | IMPL | `proof:shadow-contract + proof:card-cartoon-consumers` — each landed item names ≥2 distinct consumers; the gated items that DON'T clear stay BOOK with the trigger; bite: drop a consumer → red |
| **AV.W5** | **Architectural transpositions (the hygiene gestalt).** `scheduleAfterFirstPaint` (`useAurora.ts:74`, Aurora-only) → extract `useIdleSchedule(task, timeout)` (rIC + Safari double-rAF fallback + cancel) IFF a 2nd consumer; 33 one-line subpath barrels → `src/subpaths/` metadir (batch-resolve in `vite.library.ts`, zero runtime delta); orphaned top-level composables → domain sub-trees (`reactive/`, `platform/`); dock provide/inject → `createDockContext<T>()` factory over `dockContext.ts`+`dockLayerContext.ts` (−30-40 LOC). PLUS the D7 goo-blob arm — hoist `easeInOut`/`easeIn`/`easeOut` to a component-scoped `goo-blob/easing.ts`. See `waves/AV.W5-transpositions.md` | IMPL | `proof:subpath-enumeration` (every subpath resolves from `src/subpaths/`; `exports` map unchanged) + `proof:no-orphan-composable` (one factory, two contexts; LOC-delta ≤0); bite: a stray top-level barrel survives → red |
| **AV.W7** | **SOTA perf + a11y wave (the §2.F compositor/content-visibility folds + the G1/G2 motion-a11y).** F1 offscreen RAF-pause (`content-visibility:auto` + `contentvisibilityautostatechange`, IO `rootMargin:200px` fallback) gating the substrate's `shouldContinue()`/`armed` seam — the SOTA #2 ADOPT, the single biggest unpulled perf lever; F2 `contain:content`/`strict` on aurora/blob hosts + clamp `--glass-blur-*` to the 8-15px band (overlay 24px is the one out-of-band token); F3 on-demand `will-change` lifecycle in `useLayerTransition`; F4 wire aurora+blob RAF to `useIntersectionPause` + `document.visibilityState`; F5 inheritance-bomb guard; F6 DPR≤2 → named token + budget caps. **Conjoint a11y folds (`audit/conjoint-perfection-digest.md` §3, `audit/conjoint-augmentations.md`):** G1 — lift the prefers-reduced-motion freeze from aurora's `runtime.ts:197` into `useWebGLCanvas` so goo-blob + every future AV surface inherit it as a platform guarantee (blob reads PRM once at init today, never re-monitors); G2 — author the WCAG 2.2.2 Level-A pause/play `DockIconButton` for the continuously-running AV backgrounds (goo-blob already returns `pause()`/`resume()`; no UI control binds them). See `waves/AV.W7-perf.md`. Depends on AV.W1/W2 (the shaders) | IMPL | `proof:offscreen-pause` — the substrate parks its RAF when content-hidden/offscreen; bite: remove the content-visibility hook → the loop runs offscreen → RED. (OffscreenCanvas+Worker + F7 LoAF frame-budget gate DEFER with triggers) |
| **AV.W8** | **Constellation procedural primitive + the `useCanvas2D` substrate (the SOTA D1+E1 headline; ADOPT-gated).** Build the constellation as a glass-ui Canvas2D primitive (proximity-graph + spatial binning + optional Verlet settle) on a NEW `useCanvas2D` substrate (sibling to `useWebGLCanvas`, composing `useRAFLoop` + `useIntersectionPause`) — Canvas2D NOT WebGL (below the crossover; no GPU-init tax; SOTA E1). D2 draw discipline (polyline batching, NO `shadowBlur` — pre-rendered glow sprite, floored coords, never `getImageData` per-frame). The slides red ANOMALY skin (`drawAnomaly`) stays a consumer overlay (FOLD-G extract), never baked into the primitive. The SOTA RESOLVES the prior `useCanvas2D` BOOK (§3.3) → ADOPT-gated. **Conjoint gate (`audit/union-digest.md` D4, `audit/conjoint-perfection-digest.md` §3):** the 2nd resolving consumer is the slides **G.W2** swap (constellation hand-rolled RAF → `useRAFLoop` + `useIntersectionPause` + reduced-motion seam); the 1st is the glass-ui demo story. CONDITIONAL: lands at ≥2 resolving consumers, else GATED-NOT-LANDED with the slides G.W2 swap named as the 2nd-consumer trigger. See `waves/AV.W8-constellation-primitive.md` | IMPL (CONDITIONAL) | `proof:canvas2d-substrate-consumer` — `useCanvas2D` + `Constellation` each map to ≥2 resolving-at-HEAD consumers; bite: drop the demo story → RED. OR GATED-NOT-LANDED (no `src/`, no gate, trigger named) |
| **AV.W6** | **Gate-fleet hardening + SOTA folds + close (LAST wave).** Register every AV gate in `gates.mjs` with its `{local,ci,release,sibling}` tag (NOT hand-listed in ci.yml); confirm the 14-agent SOTA crosswalk is folded at every wave's placeholder (W1/W2/W3 filled + W7/W8 authored — see `## SOTA crosswalk`); the overfitting audit (PROPS); `AV.FINAL` citing a green run id per wave; re-verify the AU chain on AV's OWN green CI (inv-27). Opens AFTER W7+W8 (the close DERIVES from the post-perf/post-constellation surface). PLUS the `/api` discovery-layer completion (the ~10 composables + ~13 option/return types named in `audit/union-digest.md` §4). The close ABSORBS the Band-2 gates (§2.A) — every W9-W17 gate registers in `gates.mjs` here. See `waves/AV.W6-gates-close.md` | IMPL (LAST) | `proof:av-final` — full matrix green over a clean tree (Band-1 + Band-2 gates); overfitting audit zero orphans; `gates:verify-ci` green; `FINAL.md` cites a green run id per wave |

---

## §2.A — The wave table BAND 2 (W9-W17, the reinvent arc)

The 9 reinvent waves the live-audit round (`audit/reinvent/INDEX.md` + the 6 digests) opened.
Execution order: **AV.W9 (dock-rebuild) is the high-priority headline** — it corrects the runtime
regression the static gates missed, is AT-disjoint, and opens NOW; the remaining waves
(storybook · slider · legacy/god-module/DI · iOS-26/Tailwind · speedtest) sequence per their
named dependencies. The W6 gate-close (Band 1, LAST) absorbs every gate below.

| Wave | What | Type | HARD gate (one-line, falsifiable) |
|---|---|---|---|
| **AV.W9** | **DOCK-REBUILD (the high-priority Band-2 headline — corrects the runtime regression).** Collapse the dock size-morph to ONE driver per swap (retire the AU.W8b `interpolate-size` native arm that fights the FLIP `SpringProgress` driver); re-author the layering model as ONE design (one size authority, one opacity authority, one visibility authority); re-seat the live `SpringProgress` from its `(value, velocity)` on retarget (velocity-continuity); convert dock-control press to a momentum-gated spring (100% damping for taps); author the born-RED behavioral gate. Opens after W3 (motion). See `waves/AV.W9-dock-rebuild.md` | IMPL | `proof:dock-animation-live` — born-RED on HEAD goes GREEN: a real-browser rAF probe asserts the dock container width AND child opacity each morph monotonically over ≥3 frames and co-settle within ±1 frame (≤16.7ms) on collapse/expand/switch; bite: the frozen dock fails the ≥3-frame assert → RED |
| **AV.W10** | **Storybook re-invention + prune + font-fix (DEMO-SURFACE REFORM).** Rewrite the demo IA to the 11-category tree (Substrates surfaced near top, dock consolidated into ONE Navigation section, debris bins dissolved); prune the demo-route orphans + the TWO genuine src orphans (metric-cell, metric-stack); RECORD the honest push-back (instrument-*/glyph-face/disco-glyph SHIP — real consumers, NOT cut); fix the demo font-canon (drop the retired faces from the picker; audit the library `--font-stack-serif`). Opens after W6. See `waves/AV.W10-storybook-prune.md` | DEMO-SURFACE + FONT-FIX | `proof:storybook-ia` (the manifest tree matches the §1 IA EXACTLY, no `MissingStory:*`) + `proof:no-orphan-demo-route` (every story ↔ exactly one manifest row, bidirectional) + `proof:font-canon` (no font reference to a non-shipped face); all three born-RED at HEAD, green at close |
| **AV.W11** | **Slider unification (TWO-only collapse).** Collapse the six-variant `<Slider>` sprawl to exactly TWO canonical recipes — `standard` (the continuous rounded iOS knob, borderless, halo-on-state) + `spectrum` (the gradient-track color slider); delete `timeline`/`glass-pill`/`glass-cartoon`/`glass-scrubber` with their scoped CSS; port every consumer. Opens after W1. See `waves/AV.W11-slider-unification.md` | IMPL | `proof:slider-two-only` — exactly two slider primitives ship (`standard` + `spectrum`), no orphan `[data-variant]` block, the standard thumb resolves to a fully-rounded continuous-track knob; born-RED on HEAD (6 keys, four orphan blocks) |
| **AV.W12** | **Legacy-excision + fail-explicit (DEV).** Disposition every silent path in `src/` to EXCISE / FAIL-EXPLICIT / KEEP+BEFITTING (befitting `@supports` fallbacks kept + documented; silent error-swallows excised or surfaced); move the production-code legacy commentary (the `api/index.ts` per-version tranche archaeology) to `CHANGELOG.md`/`docs/`; hoist the `mediumOil_crayon` special-case to a peer medium; seal the four shader-ID `Record`s into typed dispatch. Opens after the W0-W8 arc. See `waves/AV.W12-legacy-excision.md` | DEV | `proof:fail-explicit` (no silent error-swallow in `src/` — every `catch` re-throws/surfaces a flag/carries a `// fail-explicit:` sentinel + surface) + `proof:no-legacy-commentary` (no tranche-letter/`vN.N.N` archaeology in `api/index.ts`/`index.ts` bodies); born-RED at HEAD |
| **AV.W13** | **God-module decomposition.** Split the five named god-modules into cohesive sub-modules owning ONE responsibility seam apiece — `aurora.frag` 819, `useSortable` 659, `Progress.vue` 649, `runtime.ts` 530, `metaball.frag` 282-but-conflated — no behaviour change (snapshots + tests stable); fix the carousel-progress break via a surfaced prop-boundary contract. Opens after W2 (the shared GLSL chunk must exist). See `waves/AV.W13-god-module-decomposition.md` | IMPL | `proof:no-god-module` — no `src/` `.ts`/`.vue` file >500 lines (warn at 300); `typecheck`/`build` green; every test passes unchanged; aurora+blob snapshots byte-stable; born-RED on HEAD (5 modules >500) |
| **AV.W14** | **DI + service-boundaries + pipeline-orchestration + hygiene (REFACTOR, public API unchanged).** Generalize W5's dock-only factory into ONE canonical DI pair (`createStrictContext`/`createOptionalContext`) over all four context triplets; hoist the inline type-position import; relocate all 60 test files from in-src `__tests__/` to a top-level `tests/` tree; formalize the build-pipeline + render-loop service-boundary; single-source the residual D1-D8 DRY (PRNG, `visibilitychange`, WebGL compile/link). Opens after W5 + W2/W13. See `waves/AV.W14-di-orchestration-hygiene.md` | REFACTOR | `proof:no-nested-import` + `proof:no-test-in-src` + `proof:di-consistency` (three NEW born-RED gates green); the PUBLIC API surface BYTE-UNCHANGED (`proof:package`/`proof:resolution`/`verify-export-types` same entry set); LOC delta recorded |
| **AV.W15** | **iOS-26 Liquid Glass design-evolution (IMPL + doc).** Land the portable Liquid Glass subset as token edits + additive folds over the warm-cream identity — per-rung saturate/brightness on the lower rungs, `--glass-edge-light` full-perimeter rim, content-aware under-shadow, the pointer-anchored MOVING specular (`@property`-animated masked radial driven by `--mouse-x/--mouse-y`, reduced-motion-guarded, opt-in on dock/Button/Card); the no-glass-on-glass discipline doc; the iOS-spring cross-ref to W9/W11. Opens after W4 + W5. See `waves/AV.W15-ios26-liquid-glass.md` | IMPL + doc | `proof:liquid-glass-tokens` — the new tokens exist (`--glass-edge-light{,-dark}`, the per-rung saturate, the `--glass-specular-track*` recipe, the content-aware under-shadow modifier); the `@supports`-gating holds (the `feDisplacementMap` garnish is PE-only); the PRM/reduced-transparency contract + the AA floors survive; born-RED |
| **AV.W16** | **Modern-Tailwind v4 cohesion (IMPL + gate).** Close the remaining non-idiomatic v4 lifts — the `@theme inline` migration (each token mints ONE global var, not two), the oklch palette ramps (even-lightness rungs), container queries (the dock/chassis read their OWN box), the ~14 registered-token lift sites + the 2 `theme(colors.…)`-function kills + the bare-`[--var]` → paren shorthand. Opens after W5 + W15. See `waves/AV.W16-modern-tailwind.md` | IMPL + gate | `proof:tailwind-v4-idiom` — zero `theme(colors.…)` sites; no `<utility>-[var(--x)]` arbitrary wrap where a bridge resolves the named utility; the dock/chassis container-query context exists; `@theme` completeness (every primitive bridged or allowlisted); extends `proof:design-idiom-localization`; born-RED |
| **AV.W17** | **Speedtest-ownership coordination (coordination + name-forward, DEV-only — ONE doc, no src).** Ledger the eight speedtest-origin composables — each STAY-as-CORE (a general web-platform primitive with ≥2 genuine glass-ui consumers) or MOVE-to-speedtest (app-specific OR orphaned), the verdict backed by a HEAD consumer-grep; the ≥2-consumer bar (not the ORIGIN) decides ownership; the speedtest moves are name-forward (inv-16, glass-ui writes no speedtest source). Opens after W14. See `waves/AV.W17-speedtest-ownership.md` | COORDINATION | `proof:speedtest-boundary` SPECIFIED born-RED-on-orphan — every glass-ui composable in the speedtest-origin set has ≥2 genuine glass-ui consumers OR is removed; no app-specific orphan survives; cross-references `proof:no-orphan-composable` (W14) |

---

## §2.5 — SOTA crosswalk (the binding authority)

The 14-agent SOTA-animation/procedural web-research crosswalk landed AFTER the 6 base AV
waves were authored. Its **binding authority** is
**`docs/tranches/AV/audit/SOTA-crosswalk.md`** — the Baseline-dated synthesis (the §1 Baseline
crosswalk table + the §2.A–G fold list, every fold cited [B1–B14] and grounded against the
live shaders/substrate). Every AV SOTA fold MUST cite that file. The fold landed two ways:

1. **The per-wave `## SOTA crosswalk (folded)` placeholders are FILLED** — W1 (aurora: A6 IGN
   dither at 1/255 LSB pre-quantization + the `--av-dither` token, the A4 fwidth-AA sweep
   extension, the mandatory prefers-reduced-motion RAF gate), W2 (convergence: A7 shared
   snoise leaf DEFER with the constellation trigger; the splice-mechanism ratification), W3
   (motion: C2 `linear()`-spring coverage sweep, C3 dock velocity-continuity, the
   `@starting-style`/VT/typed-VT/`color-mix(in oklch)` Baseline-dated CSS folds).
2. **Two NEW waves were authored from the two material SOTA work-streams the charter was
   missing** — **AV.W7 (perf)** from §2.F (the content-visibility offscreen-pause + containment
   + budget caps) and **AV.W8 (constellation-primitive)** from §2.D+E (the D1/E1 procedural
   headline + the `useCanvas2D` substrate). The wave table (§2) now runs 9 waves.

**The Baseline ADOPT/DEFER verdicts** (today 2026-06; "WA" Widely-Available, "NA" Newly-Avail,
"Limited" not-Baseline — full table in the crosswalk §1):

| Capability | Baseline | Verdict |
|---|---|---|
| `linear()` physics easing | WA — crosses WA 2026-06-11 | **ADOPT** — `--spring-*` tokens shipped; W3-C2 retires the `--ease-apple-spring` cubic-beziers |
| `oklch()` / `color-mix(in oklch)` | WA — 2025-11-09 | **ADOPT** — W3 dock phase-tint tiers; aurora/blob token seeds |
| `@starting-style` + `allow-discrete` | NA — 2024-08-06 | **ADOPT** — W3 widen `.glass-top-layer` grammar to dock/popover/tooltip |
| same-doc View Transitions | NA — 2025-10-14 | **ADOPT** — W3 widen `useViewTransition` to dock layer/tab + presets |
| typed/active VT | NA — 2026-01-13 | **ADOPT (layered)** — W3 directional dock-layer slides, 2nd PE tier |
| `content-visibility:auto` + state-change | NA — 2025-09-15 | **ADOPT** — **AV.W7 F1 headline** (the #1 unpulled perf lever) |
| constellation primitive / Canvas2D substrate | (technique) | **ADOPT-gated** — **AV.W8** (resolves the `useCanvas2D` BOOK) |
| OffscreenCanvas+Worker | WA — 2025-09-27 | **DEFER** — trigger: profiled LoAF main-thread contention (W7 §3a) |
| WebGPU render path | Limited | **DEFER** — WebGL2 stays substrate; `navigator.gpu`-detection only |
| `interpolate-size`/`calc-size()` | Limited (Chromium-only) | **DEFER** — trigger: 2-of-3 engines (keep FLIP/`dim` axis) |
| scroll-driven `scroll()`/`view()` | Limited (FF flag-gated) | **DEFER** — `@supports`-primary posture correct; trigger: FF unflips (W3 §5) |

The crosswalk's **5 highest-value ADOPTS** (§3): (1) IGN dither at LSB [W1-A6]; (2) offscreen
RAF-pause [W7-F1]; (3) substrate reduced-motion freeze lift + WCAG-2.2.2 pause toggle [W7/G2];
(4) dock velocity-continuity [W3-C3]; (5) `contain`+blur-budget + `linear()`-spring convergence
[W7-F2 / W3-C2]. The **one binding caution:** scroll-driven + WebGPU LOOK finished but are NOT
Baseline — they stay `@supports`/`navigator.gpu`-gated with working fallbacks (the existing
`scroll-driven.css`/`useWebGLCanvas` postures are correct and MUST NOT be promoted to sole
paths this tranche).

## §3 — The deferred-fold ledger (transcribed; zero silent punts — P-Inv 28)

Every AU `FINAL.md §2` BOOK + the digest's FOLD-AV / AV-GATED / KEEP-BOOK / FOLD-G rows,
each tagged with its AV disposition + named trigger. Vocabulary: **FOLD-AV** (executes in AV
at the named wave) · **AV-GATED** (folds IFF a named trigger clears in-tranche, else stays
BOOK) · **KEEP-BOOK** (carried, trigger named, glass-ui holds the lever) · **FOLD-G** /
**KEEP-BOOK-G** (slides' arm, OUT — inv-16 name-forward) · **DEFERRED** (documented, not in
the manifest).

### §3.1 — FOLD-AV (executes this tranche)

| Item | Wave | Trigger that fired |
|---|---|---|
| `useCountup` / `vReveal` | **AV.W3** | slides DeckNav (1 real) + the demo → ≥2; AT-disjoint, opens now |
| Card `surface="cartoon"` dark arm | **AV.W4** | 7-liftable set (FG.W-card-badge); FOLD IFF the ≥2 has genuinely divergent dark values |
| keyframes LIGHT orchestration tier (`stagger`/`flip`/`Sequence`) | **AV.W3** | E.W10 shipped it value.js-free; the highest-value AV fold (Stream C) — deletes glass-ui's hand-rolled stagger/sequence |
| `useIdleSchedule` extract | **AV.W5** | a 2nd consumer of the rIC/double-rAF idle primitive (today Aurora-only at `useAurora.ts:74`) |
| the 33-barrel metadir + composable-tree + dock-context factory | **AV.W5** | the user's gestalt-transposition directive (D-5); net-deletion-or-neutral |
| **the SOTA perf folds** (F1 offscreen-pause, F2 contain/blur-budget, F3 will-change lifecycle, F4 RAF↔visibility wiring, F6 DPR/budget tokens) | **AV.W7** (NEW) | the SOTA crosswalk §2.F — the #1 unpulled perf lever (content-visibility, Baseline NA 2025-09-15) + the `backdrop-filter` budget pass; grounded against `useWebGLCanvas.ts` (no content-visibility/IO at HEAD) |
| **the SOTA constellation primitive + `useCanvas2D` substrate** (D1+E1) | **AV.W8** (NEW; CONDITIONAL) | the SOTA crosswalk §2.D/E ADOPT-gates the prior `useCanvas2D` BOOK (§3.3); lands at ≥2 resolving consumers, else GATED with the slides G.W2 swap as the 2nd-consumer trigger |

### §3.2 — AV-GATED (folds IFF the trigger clears in-tranche)

| Item | Wave | Gate condition |
|---|---|---|
| Drawer `:native` / `GlassNativeDrawer` (#32) | **AV.W4** | muster live-behind FIRM; a 2nd native consumer UNMET at AU close. Author IFF cleared (speedtest-native grep ≥1), ELSE KEEP-BOOK. Partially discharged by `Drawer mode="live-behind"` (AN.W3) |

### §3.3 — KEEP-BOOK (carried, trigger named)

| Item | Trigger to revisit |
|---|---|
| `proof:webgl-golden` (blob pixel-golden) — **the chronic** | a stable headless WebGL2-live capture runner (the 8-assert CPU-equivalence + the aurora capture-render already cover GPU correctness; the pixel golden adds only a redundant byte-comparison). `../AU/audit/proof-webgl-golden-DEFERRED.md` |
| `text-box-trim` — **the chronic (AS→AT→AU, now 3+ tranches)** | a real SFC consumer (0 SFC consumers at HEAD; no SFC touch pays the diff) |
| anchor-positioning (dock popovers) | reka `PopperContent` yields a per-content positioning seam (today floating-ui inline-transforms; native `anchor()` would double-position) |
| ~~`useCanvas2D` constellation lift~~ — **RESOLVED by the SOTA crosswalk (D1/E1) → FOLD-AV AV.W8 (ADOPT-gated).** The SOTA marks the constellation the named headline procedural deliverable + Canvas2D the correct substrate; the BOOK moves from "technique unproven" to ADOPT-gated-on-muster. The ≥2-consumer gate is now the only open question (the slides G.W2 swap + a glass-ui demo story). See §3.1 + `waves/AV.W8-constellation-primitive.md`. | (was: a 2nd Canvas2D consumer — now the muster, not the technique) |
| the role-typed `<Role>Dock` base COMPONENT | a 2nd consumer needing the role-typed base beyond the README vocabulary (keyframes D.W5 the named candidate — E1b conditional) |

### §3.4 — FOLD-G / KEEP-BOOK-G (slides' arm — OUT, inv-16 name-forward)

| Item | Disposition |
|---|---|
| F.W-dock-consume pin-bump (`3.3.0` npm) · F-01 close-hack retire (→ Dialog `showClose`, shipped AU.W9) · feedback-coder shadow-orphan reconcile (D-2 slides-side) · constellation RAF-park → `useRAFLoop`/`useIntersectionPause` · drawAnomaly skin extract | **FOLD-G** |
| `markRaw` the slide component refs (LV-1 — all 6 slides emit the Vue `markRaw` perf warning; `deck.ts` makes `content.slides[].component` deeply reactive) | **FOLD-G** (→ G.W0; idiomatic KISS perf fix the snapshot tests never surface) |
| FG.W-deck (`/deck` lift, ≥2 UNMET — `_fixture` dev-only; unblock = an AV demo Deck story) · `useCanvas2D` (2nd-consumer gate) | **KEEP-BOOK-G** |

---

## §4 — Prompt-coverage recap (every engagement ask → DONE or OPEN-FOLD)

The digest's matrix. Every ask is DONE (the AU/F session closed it) or OPEN-FOLD (the AV
wave that owns it). Zero ask is unaccounted.

| Ask | Status |
|---|---|
| the polish-tier splits · `defineModel` ×8 · strict-templates · the idiom-lift · vueuse-free root · Fraunces ship · `/color` leaf · `useWebGLCanvas` substrate · the blob trio · the a11y sites · the W9 folds | **DONE** (AU W2→W10; cited in `AU.FINAL.md §1`) |
| **dock-motion overhaul** | **OPEN-FOLD → AV.W9** (CORRECTED from DONE — the AU.W8b native arm FROZE the dock at runtime; the static gates blessed syntax, not paint. See the §1 re-scope) |
| **the storybook re-invention + prune + font-fix** | **OPEN-FOLD → AV.W10** (D-6; the live-audit found the demo IA incoherent) |
| **the dock rebuild from first principles** | **OPEN-FOLD → AV.W9** (D-7; the high-priority Band-2 headline, AT-disjoint, opens now) |
| **the slider unification (two-only)** | **OPEN-FOLD → AV.W11** (D-8) |
| **the legacy excision + god-modules + DI/hygiene** | **OPEN-FOLD → AV.W12 + AV.W13 + AV.W14** (D-9) |
| **the iOS-26 Liquid Glass + modern Tailwind** | **OPEN-FOLD → AV.W15 + AV.W16** (D-10) |
| **the speedtest ownership** | **OPEN-FOLD → AV.W17** (D-11; coordination + name-forward, inv-16) |
| slides: progress / few-dollars / pptx / squish / XRAY / constellation / 11→6 deck-rework · keyframes LIGHT barrel | **DONE** (the F/E session) |
| **fix aurora (the OETF)** | **OPEN-FOLD → AV.W1** (the user-mandated headline; code- + live-confirmed) |
| **shadow-cartoon-lg ships** | **DONE library-side** (`tokens.css:563` chain); **OPEN-FOLD → AV.W2** (contract-doc) + G (slides reconcile) |
| **the SOTA-animation folds** | **OPEN-FOLD → AV.W3** (keyframes LIGHT tier + the C2/C3 spring + Baseline CSS folds) **+ AV.W1/W2** (the IGN dither + the shared-noise DEFER) **+ AV.W7** (the §2.F perf wave) **+ AV.W8** (the §2.D/E constellation primitive). The 14-agent crosswalk (`audit/SOTA-crosswalk.md`) is the binding authority — see `§2.5` |
| doc-currency (`src/api.ts` missing · `/api` tally drift · CLAUDE.md styles omits 3 CSS) | **OPEN-FOLD → AV.W0** |
| mid-range 700-1000px tablet band · `/deck` consumer #2 · slides CLAUDE.md | **OPEN-FOLD** (G's arm — OUT; `/deck` #2 unblocks via an AV demo Deck story) |

---

## §5 — Cross-repo shape post-3.3.0

**The ownership map (four repos, one acyclic chain `value.js ← keyframes.js ← glass-ui ←
slides`; `audit/union-digest.md` §1, `UNION-COORDINATION.md`):** value.js owns color + parsing
(the Ottosson OKLab/OKLCh primitives, `parseCSSColor`, the `cssLinear()`/`linear()` serializer)
— a SINK with no `@mkbabb/*` runtime edge; keyframes.js owns animation (the `SpringProgress`
solver + the value.js-free LIGHT tier `stagger`/`flip`/`Sequence`/`drag`/`decay`); glass-ui owns
the CORE UI primitives + the modern-web substrates (`useWebGLCanvas`, `/motion-core`, the
`/color` leaf, the `--spring-*` regen-token chain); slides owns the deck content + the editorial
constellation. The DAG is airtight — no leaf re-implements an upstream's math, no back-import
(`proof:color-acyclic`, `proof:single-color-core`).

**The publish hinge.** A single edge **E1** (glass-ui 3.3.0 → npm, **USER-DOMAIN**) fans out to
keyframes D.W5 (the dock rename `TopDock→ChromeDock` + the `<Role>Dock` E1b conditional) ∥ slides
G.W1 (the pin-bump + deploy) ∥ value.js M.W7 (the blob extirpation onto `/goo-blob` +
`/watercolor-dot`). **value.js `0.11.0` (M tranche) publishes FIRST** — the `^0.10.0 → ^0.11.0`
peer bump rides the 3.3.0 cut (the `^0.10.0` range excludes 0.11.0; the runtime edge is already
settled by `proof:blob-color-equivalence` 8/8 ~2e-16, so this is a SemVer-range manifest knot,
not a code change). The publish spine is `value.js 0.11.0 → glass-ui 3.3.0 (peer bump) →
{keyframes D.W5 ∥ slides G.W1 ∥ value.js M.W7}`. **E1b** (`<Role>Dock` reciprocal) is conditional
on keyframes D.W5 becoming the 2nd consumer.

**Demos-consume-glass-ui, name-forward (`audit/union-digest.md` §4).** Both sibling demos
consume glass-ui idiomatically for chrome. The name-forward asks glass-ui supplies this tranche:
export + document `useDockState` + the `DockLayerContext` shape + the `keepOpen`/`release`/`expand`
imperative seal (so the value.js demo wires reactive dock state instead of bare template refs);
document the `ColorResolver` + `defaultBlobColorResolver` injection seam for `/goo-blob` +
`/watercolor-dot` consumers; complete the `/api` discovery layer (~10 composables + ~13 option
types). No demo-side code is forced now — coordination records the muster (value.js demo migrates
its watercolor-dot/goo-blob copies onto the subpaths post-publish; keyframes demo adopts the full
`/keyboard` surface).

**The slides arm.** The deck-language pass landed in slides G.W0 — the deck conceit + the writing
rules are formed; G.W4-language is the slides-local language wave. Slides also lands D5 (delete
the 4 easing-token forks, alias glass-ui `--ease-out-expo`/`--ease-standard`), D6 (pin
`--spring-deck: var(--spring-smooth)`, retire the CSS recompute half), the FOUC fix
(`content="light dark"`), and G.W2 (the constellation RAF swap — the 2nd consumer that unblocks
AV.W8). All slides work is OUT (inv-16 name-forward); glass-ui writes only glass-ui.

**The speedtest arm (W17 — a name-forward edge).** The reinvent round adds a fifth repo to the
coordination surface: speedtest, the consumer that ORIGINATED eight of glass-ui's composables.
AV.W17 ledgers each STAY-as-CORE (a general web-platform primitive glass-ui genuinely consumes
≥2× — origin is provenance, not title) or MOVE-to-speedtest (app-specific OR orphaned in
glass-ui). The MOVE items are NAME-FORWARD asks the speedtest session executes (land the
composable + tests in speedtest, repoint local imports); glass-ui's side is the REMOVE from the
barrel + subpath + `/api` + `exports` IFF it has no glass-ui consumer. The edge is one-way
(glass-ui → speedtest); inv-16 holds — glass-ui writes no speedtest source. W17 authors ONLY the
ownership spec; the glass-ui-side removals are a later IMPL wave's work, gated on that spec.

**AV.W0-W1 are AT-disjoint** — they touch no published-surface contract (the aurora OETF fix
re-bakes presets + re-blesses snapshots, all internal to the `/aurora` chunk; the doc-currency
is docs-only). They open BEFORE the 3.3.0 publish. The publish-gated lifts (any slides-supply
consumption) wait on E1. **AV.W9 (dock-rebuild) is likewise AT-disjoint** — it touches no
published-surface contract (the dock motion is internal to the `/dock` chunk) and opens NOW as
the high-priority Band-2 headline.

This tranche is glass-ui-internal — every cross-repo item is NAME-FORWARD; glass-ui writes
only glass-ui. The 3.3.0 publish leg stays USER-DOMAIN, confirm-first (the boundary is
irreversibility).

---

## §6 — Precepts in force (HARD gates, not sentiments)

- **inv P1 — no legacy / no workaround.** Every clean break carries NO alias. The aurora OETF
  fix REPLACES the wrong output (it does not add a `legacyDark` flag); the shared GLSL chunk
  DELETES the duplicated math (it does not keep both copies behind a switch); the metadir
  MOVES the barrels (it does not leave the top-level forwarders). A grep for any retired form
  outside its deletion commit = 0.
- **inv P2 — gestalt transposition over patch (D-5).** Each AV.W5 transposition is
  net-deletion-or-neutral at its core, proved by before/after LOC + a ≥2-consumer assert. The
  shared GLSL chunk is the canonical case: it deletes duplication AND structurally precludes
  the very OETF divergence that caused this bug.
- **inv P3 — KISS.** The aurora fix is the blob's existing path copied — the simplest correct
  fix, not a re-architecture (the 27/31 verdict forbids re-architecture). The `markRaw`
  LV-1 fold (G's arm) is the same idiom: the minimal idiomatic perf fix.
- **inv P4 — token-first.** `--shadow-cartoon-lg` is a consumer-overridable token; AV
  documents the override contract (decks parametrize via override, NEVER re-declaration). No
  consumer edits library source for styling.
- **inv P5 — visual-load-bearing (≥2-consumer).** Every new public surface clears the
  ≥2-DISTINCT-consumer-CONTEXT bar (J-inv-10: convergence, not census). `useIdleSchedule`,
  the Card-cartoon-dark arm, the Drawer-native, and the motion-tier adoptions are each
  FOLD-IF / AV-GATED on a named ≥2; the unmet stay BOOK. The overfitting audit tallies PROPS.
- **inv P6 — the keyframes value.js-free seam.** The motion-tier adoption (AV.W3) consumes
  ONLY the keyframes LIGHT barrel (value.js-free) → root-barrel-safe. The dock driver seam
  (`SpringProgress.play`, one solver, peer `^2.2.0||^3.0.0`) is correct; no seam risk.
- **inv-27 — green-means-green.** Every "done" cites AV's OWN green CI run id. AV re-verifies
  the AU chain on a tranche-gated close; no wave closes on a campaign-record or narration.
- **inv P7 — the SOTA-crosswalk is the binding authority; Baseline-gate-with-fallback.**
  Every SOTA fold cites `docs/tranches/AV/audit/SOTA-crosswalk.md` (Baseline-dated). A
  capability that is NOT Baseline-WA (scroll-driven, WebGPU, `interpolate-size`, typed-VT) is
  `@supports`/`navigator.gpu`-gated with a working fallback — NEVER promoted to a sole path
  this tranche. The crosswalk's ADOPT marks are adopted; its DEFERs stay BOOK with the trigger
  named (no speculative fold — KISS). The two SOTA-headline waves (W7 perf, W8 constellation)
  carry exactly the §2.F / §2.D+E ADOPT rows; the OffscreenCanvas/WebGPU/F7-LoAF/snoise-leaf
  DEFERs are recorded with their triggers, not folded.
- **inv-θ — green-means-green for the gate fleet.** Every new AV gate
  (`proof:aurora-space-gamma`, `proof:shader-shared-source`, `proof:motion-value-free`,
  `proof:motion-composables-consumer`, `proof:shadow-contract + proof:card-cartoon-consumers`, `proof:subpath-enumeration`,
  `proof:no-orphan-composable`, the SOTA-wave gates `proof:offscreen-pause` (W7) +
  `proof:canvas2d-substrate-consumer` (W8, LANDED-case only), the Band-2 reinvent gates
  `proof:dock-animation-live` (W9, the born-RED real-browser frame-sampler),
  `proof:storybook-ia` + `proof:no-orphan-demo-route` + `proof:font-canon` (W10),
  `proof:slider-two-only` (W11), `proof:fail-explicit` + `proof:no-legacy-commentary` (W12),
  `proof:no-god-module` (W13), `proof:no-nested-import` + `proof:no-test-in-src` +
  `proof:di-consistency` (W14), `proof:liquid-glass-tokens` (W15), `proof:tailwind-v4-idiom`
  (W16, extends `proof:design-idiom-localization`), `proof:speedtest-boundary` (W17, SPECIFIED
  born-RED-on-orphan — the gate REGISTRATION + the glass-ui-side removals are a later IMPL
  wave's), plus the DEV meta-gates `av-w0-reground`/`av-final`) is registered in `gates.mjs`
  with its `{local,ci,release,sibling}` tag, NOT hand-listed in ci.yml. `git status` clean after
  `proof:all`; `gates:verify-ci` fails closed on drift. Each born-RED gate reddens on a
  deliberate inject.

**USER-DOMAIN boundaries (inv-16 / inv-16′):** the dirty `docs/precepts` submodule is NOT
touched in-flight. The 3.3.0 publish leg is confirm-first; agents NEVER run an irreversible
release step.

---

**AV headline:** *Fix aurora (the OETF) + the SOTA-animation/procedural folds (the IGN dither,
the `linear()`-spring convergence, the content-visibility offscreen-pause [W7], the
constellation primitive on a `useCanvas2D` substrate [W8]) + the design-system ripening (motion
composables, the gated supply, the hygiene transpositions) + the derived-fact gate fleet — then
the reinvent arc the live-audit begot: the dock rebuilt from first principles [W9] over the
runtime regression the static gates could not see, the storybook re-invention [W10], the slider
two-only collapse [W11], the legacy-excision + god-module decomposition + DI/hygiene [W12-W14],
the iOS-26 Liquid Glass + modern-Tailwind cohesion [W15-W16], and the speedtest-ownership ledger
[W17].* The SOTA crosswalk (`audit/SOTA-crosswalk.md`) is the binding Baseline-dated authority;
it grew Band 1 from 7 to 9 waves. The reinvent live-audit (`audit/reinvent/INDEX.md`) added Band
2 (W9-W17) — its lesson is the gate-vs-runtime gap: a static fleet can ship a frozen dock green.
