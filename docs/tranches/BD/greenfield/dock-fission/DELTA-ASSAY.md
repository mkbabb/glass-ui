# DOCK FISSION — the DELTA-ASSAY (golden-vs-current + the UNION path)

> The single golden-vs-current delta for the dock-fission engine (`useDockFission.ts` +
> `DockGooFilter.vue` + `fission-bridge.css` + `DOCK_SPLIT_SIGNATURES`). Survival of the
> fittest: KEEP what is fit, REFINE what is weak, RE-INVENT only what is broken. ONE
> `useDockFission`, ONE goo vocabulary, NO portal fork, NO second spring, NO legacy.
> **Verdict: REFINE-dominant (the engine is FIT; the NECK SHAPE is the one RE-INVENT). ~78%.**

Live-verified Chrome `localhost:5173` `/dock/dock-gallery` + `/dock/morph-showcase` +
source-grounded on HEAD (`fission-bridge.css`, `useDockFission.ts`, `DockGooFilter.vue`,
`morph-bridge.css`, the two consumers). The three adversarial challenges
(`challenge/{1,2,3}.md`) are UNANIMOUS and every load-bearing refutation is reproduced below.

---

## 0. THE LIVE READBACK (what the painted DOM + getComputedStyle actually show)

`/dock/dock-gallery` (the Compose split surface), getComputedStyle on the mounted fission
elements:

| element | property | live value | read |
|---|---|---|---|
| `.dock-fission-neck` | `clip-path` | **`none`** | NO clip-path — the spanning neck has NO hourglass |
| `.dock-fission-neck` | `scale` | `0.04 1` | thins via uniform `scaleY` capsule (`fission-bridge.css:202-204`) |
| `.dock-fission-neck` | `border-radius` | `999px` | a capsule, never a concavity |
| `.dock-fission-neck` | `background` | `radial-gradient(... color(srgb 0.994 0.96 0.9…))` | **warm-cream** (NOT gray) |
| `.dock-fission-piece::before` | `clip-path` | **`inset(0% 0px round 999px)`** | the constant-cross-section pinch (`:462`) |
| `.dock-fission-island` | `background` | `color(srgb 0.994 0.96 0.926 / 0.8)` | **warm-cream, transmissive 0.8** (§3 holds) |
| `.dock-fission-bridge` | `overflow` | `visible` | the frame escapes the clip — **no portal needed** |
| `#dock-fission-goo` | region / interp / literals | `x=-50% width=200%` / `sRGB` / blur **7** slope **20** offset **−9** | the Safari floor is airtight; the literals are razor-tight |
| `#dock-morph-goo` | (on `/dock/morph-showcase`) | **not mounted at load** | the morph goo is a per-consumer CONDITIONAL inline graph, not the hardened shared mount |

**The headline live finding:** the spanning `.dock-fission-neck` carries `clip-path: none` +
`scale: 0.04 1` (a uniform scaleY capsule); the per-seam `.dock-fission-piece::before` carries
`clip-path: inset(...)`. **NEITHER produces a structural concavity** — a uniform scale and a
uniform inset both threshold (under blur) to a fatter rounded capsule, never an hourglass waist.
The GOLDEN's geometry diagnosis is *directionally correct* but its attribution ("both carve
inset() at `:462`") is HALF FALSE and the cited line is wrong for the spanning neck.

---

## 1. WHAT IS FIT — KEEP (survives, do NOT re-invent)

Confirmed live + source-verified — the GOLDEN §0 "fit" list holds:

1. **The Safari floor is structurally airtight** (`DockGooFilter.vue` / `#dock-fission-goo`):
   `x=-50% width=200%`, `color-interpolation-filters="sRGB"`, regular `filter:url()` (NOT
   `backdrop-filter:url` — bug 245510), static literal graph (no var-driven `stdDeviation` —
   bug 283156 absent). **KEEP the graph byte-for-byte; only the literal DEFAULTS retune.**
2. **The orchestrator is fit** — ONE `new SpringProgress` on `DOCK_SPRING` (verified single
   spring, no `setTimeout`/`setInterval`/`@keyframes` in `useDockFission.ts`), the
   `--dock-split-t`/`--island-t`/`--island-dx/dy`/`--split-dx/dy`/`--neck-t`/
   `--neck-specular-angle` writes, the `useLiquidFlex` tanh recoil (cap ≤1.08), the
   `usePointerVelocityField` seam-tension fed from INSIDE the one loop, the PRM `seatSync()`.
   **The DRIVE is fit; only the silhouette it PROJECTS is broken.**
3. **`DOCK_SPLIT_SIGNATURES` is descriptor-driven DATA** (search=radial / media=lateral /
   nav=inward-merge; `PLACEMENT_VECTOR` beside/above/below). **KEEP as DATA — no code path.**
4. **The `:splittable` facility ships further than IOS27-REFERENCE claimed** — `GlassDock`
   carries `:splittable`/`:splitContext`/`:splitPlacement`, `[data-dock-splittable]`
   auto-register, the drag-to-split gesture (`useDockItemDrag`), `useDockContextSilhouette`, and
   the `.dock-fission-island`/`.dock-fission-neck`/specular-sweep/ripple/merge-splash cohort all
   live. **The wiring exists; the GEOMETRY it drives is broken + one trigger is missing.**
5. **`--dock-island-reach` defaults to 9rem** (inherits from `.glass-dock-frame[data-splittable]`)
   — the island CAN land; the reach is NOT unset. The defect is the NECK SHAPE, not the reach.
6. **The bridge escapes the clip** (`overflow: visible`, live-confirmed) so the bud travels into
   real space with NO portal. **lens-c's portal fork is REJECTED — source-correct.**
7. **The ≤1.08 anti-taffy cap** over lens-c's 1.18 — volume-preserving, the loud register rides
   girth+arc, never body taffy. **KEEP the fence.**
8. **The warm-cream material both modes** (neck + island live `color(srgb 0.994 0.96 …)`, never
   gray) — the BA.W-NO-GRAY floor holds; the island reads the SAME `.glass-floating` cohort.

---

## 2. WHAT IS WEAK — REFINE (fit, evolve)

1. **The filter DEFAULTS are razor-tight** (`blur 7` / `slope 20` / `offset −9`, live-confirmed)
   vs the goo-morph-proven gooey window (`~10` / `~15` / `~−7`). A values-only retune of the
   `DockGooFilter.vue` prop defaults; the graph stays byte-unchanged (Safari facts intact). The
   props already exist (a calmer consumer dials down). **REFINE.** *(Caveat — see §4-DELTA: the
   retune target must be re-solved against a REAL rendered-throat readback, NOT the spike's
   fabricated arithmetic; the goo-morph amendment proved the spike's `10/24/-11`-style numbers
   were per-mount, not universal defaults.)*
2. **The orchestrator gains ONE additive write** — `--neck-girth = GIRTH_FLOOR + sin(π·neckT)^1.5·SWELL`
   per frame (the bell the hourglass `scaleY` reads, so the throat WELLS then PINCHES rather than
   thinning monotonically). NO second spring, NO second clock — an additive line in the existing
   `writePieces`/`seatSync`. **REFINE.**
3. **The cartoon-punch FEEL is partly unwired** — the budOut early-scale, the perpendicular arc
   lob, and the √φ overshoot share are not present on the island. These are `f(--dock-split-t)`
   compositor overlays on the EXISTING island/neck. **REFINE.** *(Caveat — see §4-DELTA: the
   `--motion-weight`/`--ease-cartoon-punch` idioms the GOLDEN cites as "the extant Band-0 idiom"
   are PHANTOM at HEAD — grep `motion-weight src/` = 0, `ease-cartoon-punch src/` = 0. They are
   booked by the motion-spring-register siblings `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH` →
   DEPEND on them; `--dock-goo-weight`/`--neck-girth`/`--neck-waist` are NET-NEW, declared as such.
   Only `--shadow-cartoon-*` is real — `bridges.css:298-316`, `cards.css:180`.)*

---

## 3. WHAT IS BROKEN — RE-INVENT (the load-bearing fix)

1. **THE NECK HAS NO STRUCTURAL WAIST (the SHAPE defect, the headline RE-INVENT).** Live-confirmed:
   `.dock-fission-neck` = `clip-path: none` + `scale: 0.04 1` (uniform scaleY capsule);
   `.dock-fission-piece::before` = `clip-path: inset(0% 0px round 999px)` (constant cross-section).
   A constant-cross-section body, blurred + thresholded, can only yield a fatter rounded capsule —
   **there is no geometry that produces a concavity.** A waist is a *concavity*; concavity needs
   two convex masses OR a clip-path that carves an hourglass. The shipped neck supplies neither.
   **RE-INVENT** both selectors to a STATIC HOURGLASS `clip-path: polygon()`/`path()` (re-cut as a
   concave silhouette, throat ≈ `--neck-waist`) + the `--neck-girth` bell on `scaleY`. This is the
   exact goo-morph GOLDEN finding restated at dock scale — but it is a **NET-NEW concave path**,
   NOT a reuse of an extant `--neck-filament` hourglass idiom (HEAD ships `inset(... round 999px)`
   — a capsule-thinner, ZERO polygon/hourglass/concave hits). *(See §4-DELTA: the corrected
   attribution — the fix adds a clip-path to the spanning neck `:172` AND replaces the inset on
   the `::before` `:462`; two distinct selectors, the GOLDEN's `:462`-for-both citation is wrong.)*

2. **The iOS-27 SCROLL trigger is unassembled (the v3 headline, genuinely born-RED).**
   `useScrollChrome` (`collapseT`/`collapsed`/`direction`) and `useDockFission` (`split()`/
   `merge()`) exist as SEPARATE primitives, never COMPOSED. The 5-tab bar buds the transport
   sub-dock on scroll → scroll-up re-merge — the reference's defining move — is the single missing
   composition. **ASSEMBLE** (compose, not build; ~30 lines on the shell). This is the ONE cleanly
   born-RED arm (all 3 challenges agree).

---

## 4. THE DELTA — golden-vs-current, the corrected diagnosis (the challenges FOLDED)

The three challenges land NINE refutations against the GOLDEN's *spec* (the design GESTALT
survives; the build-contract claims do not). Each is reproduced + FOLDED:

| # | GOLDEN claim | reality (live + source) | FOLD |
|---|---|---|---|
| **D1** (R1, all 3, TOP) | the V↔H morph goo is a "DEAD WIRE — `--dock-bridge-goo-filter` set NOWHERE, grep 0 hits, always `none`" + a born-RED gate arm | **FALSE.** `grep -rn dock-bridge-goo-filter src/ demo/` = 3 hits: `morph-bridge.css:60` (the `var(…, none)` default) + `morph-showcase.vue:277` + `AppShell.vue:488` SET it, gated to `t∈(0.18,0.82)`. The wire is two-sited + idiomatically gated. The `gooFilter(morphBridge) !== 'none'` arm is born-GREEN at the showcase, not RED. | **STRIKE the "dead-wire / set NOWHERE / one-token fix" framing entirely.** Delete the `morph-bridge.css` token-set row + the §9 "FIXES the dead wire" bullet + the `gooFilter(morphBridge)!=='none'` born-RED arm. |
| **D2** (R1b/R2/R3, ch2+ch3) | the morph goo "fuses a waist at the midpoint" — a fission-grade metaball | **FALSE in two ways.** (a) The V↔H morph is a column→row REFLOW (one plate crossfaded into a differently-shaped plate via View-Transitions) — there are NOT two persistent masses with a throat between them; the platform CANNOT continuously interpolate a mismatched-topology silhouette (the showcase page copy states this binding limit). (b) Live-sampled, the morph bridge reads `filter: none` across the whole morph — the spring `morph.t` never dwells in the `(0.18,0.82)` gate window (the gate/spring-path bug), NOT an unset token. (c) `#dock-morph-goo` is a per-consumer inline graph (`x=-10% width=120%`, NO `sRGB`, slope-20/offset-9) — the ANTITHESIS of the §L7 contract; not mounted at load. | **RE-SCOPE the morph arm to its REAL defect:** (1) the `(0.18,0.82)` occlusion gate is never satisfied by the preview spring path → verify/widen the dwell so the goo has frames to fuse a gooier CROSSFADE-CONCEAL (NOT a waist — the reflow has no throat); (2) HARDEN/COLLAPSE `#dock-morph-goo` onto the shared `<DockGooFilter>` mount (sRGB + −50%/200% + retuned literals) so it is not a 3rd divergent Chrome-only graph. KEEP the wire in JS (DRY); do NOT add a competing CSS `[data-morphing]` assignment. |
| **D3** (R3/R4, all 3) | "BOTH `.dock-fission-neck` AND `.dock-fission-piece::before` carve with `clip-path: inset()` at `:462`" | **HALF FALSE (live-confirmed).** The spanning `.dock-fission-neck` (`:172-214`) = `clip-path: none` + `scale: 0.04 1` (uniform scaleY capsule), NO inset. ONLY the per-seam `::before` (`:434-462`) uses `inset()`. The `:462` line is the `::before` block; double-cited for two selectors. | **CORRECT the attribution.** State once, generally: "NEITHER neck has a structural concavity — one is a scaleY capsule (`:204`), one is an inset capsule (`:462`); both threshold to a convex capsule." The fix ADDS a clip-path to the spanning neck AND REPLACES the inset on the `::before` — two distinct edits. Born-RED against the silhouette of the neck that PAINTS per surface (spanning on the gallery split; per-piece on the n>2 burst). |
| **D4** (R2/R3/R4 §8, all 3, TOP-2) | the §8 spike "de-risked live — waist/body 0.31 π-measured via canvas-readback; the authoritative pixel evidence" | **FABRICATED.** `dock-fission-barbell.html` `measure()` is `throat = dockThick · neckGirth · 0.34; ratio = throat/dockThick` ≡ `neckGirth · 0.34` — pure input arithmetic, the `0.34` a hardcoded constant the comment mislabels as the clip throat (the actual polygon throat ≈ 12%). NO `getImageData`/`getContext`/`getComputedStyle` in the file. `hasLocalMinimum = islandScale>0.2 && neckGirth<0.95` is a tautology over the input scalars — true for a flat slab. The number is engine-blind (prints identical in a terminal). The screenshot CONTRADICTS the table (a tiny detaching wisp at the asserted "islandScale 0.904" dwell). | **STRIKE "de-risked live / π-measured / authoritative pixel evidence."** Demote §8 to "parameter sketch + ONE Chrome screenshot." Move the burden to the born-RED gate: a REAL `getImageData` cross-axis alpha scan of the rendered throat + a second-derivative `hasLocalMinimum` (sign-change, not `girth<0.95`) + a born-RED CONTROL (the SHIPPED neck under the SAME filter FAILS the local-minimum). The waist target is re-solved against the MEASURED post-threshold throat, never the arithmetic. |
| **D5** (R5/R8/R9, all 3) | the asymmetric `D = dockThickness/φ` island is "the golden-minor droplet" + ≤0.45 waist gate | **OVERFIT + LOOSE.** `D = thick/φ ≈ 40px` makes the dwell bud a wisp dwarfed by the 188px plate — reads as a flicked droplet, not a control migrating into its own dock (iOS-27 buds a chip the size of the transport triad). And `waistRatio ≤ 0.45` leans on the tautological `hasLocalMinimum`; a separated two-blob state trivially passes (alpha dips to ZERO between disjoint masses — NOT an hourglass throat). | **DECOUPLE the bud diameter (the goo-throat droplet, can be `thick/φ`) from the LANDED island footprint (content-sized `max-content`, ≈ source thickness — the island already ships `inline-size: max-content`). The bud GROWS into the content-sized island as it lands. Drop "golden-minor droplet" as the landed-dock proportion (keep √φ for the typography ladder). TIGHTEN the gate: assert the local minimum occurs while the band is CONNECTED (`min(crossAxis) > 0` AND `< 0.45·body` AND interior), sampled at the dwell peak — a separated gap or a fat capsule both correctly RED. |
| **D6** (R5/R3, ch1+ch3) | reuse "the Band-0 `--motion-weight` idiom" + "a `--ease-cartoon-punch` linear() dip" | **PHANTOM.** `grep motion-weight src/` = 0; `grep ease-cartoon-punch src/` = 0. Only `--shadow-cartoon-*` is real (`bridges.css:298-316`). The "reuse extant idiom" deftness claim is partly fabricated. | **RECONCILE to the booked siblings:** `--motion-weight` + `--ease-cartoon-punch` are now booked by `BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH` (the cartoon-shadow + goo-morph amendments both DEPEND on them) → DEPEND, don't alias-as-extant. Declare `--dock-goo-weight`/`--neck-girth`/`--neck-waist` NET-NEW in the tokens row. Reuse `--shadow-cartoon` for the moving cast (real). |
| **D7** (R7, ch2) | "PRM → necks `display:none`, zero neck frames" | **LEAK.** The `@media reduce` block (`fission-bridge.css:526-551`) sets `display:none` on the `::before`/`::after` cohort but NOT on the spanning `.dock-fission-neck` (`:172`), whose opacity is `--island-t`-driven → ~0.35 residual at the settled endpoint. A static vestibular-decorative filament leaks. | **ADD `.dock-fission-neck { display: none }` (or opacity 0) to the `@media reduce` block** OR confirm `seatSync()` writes island-t to the merged endpoint under PRM. Add a PRM gate assert: `getComputedStyle('.dock-fission-neck').opacity === '0'` under emulated reduce. |
| **D8** (R7/R8, all 3) | three byte-identical goo graphs ("merge flagged, out of scope") | **SELF-CONTRADICTED.** This wave RETUNES `#dock-fission-goo` (blur 7→10 etc.) while `#dock-morph-goo` keeps its own literals + `#shell-dock-morph-goo` is a FOURTH mount — diverging graphs the GOLDEN claims are "byte-identical" + "one goo vocabulary library-wide." Touching the morph filter (D2) already opens that file. | **EITHER retune `#dock-morph-goo` to the SAME literals in this wave (keep them identical as claimed) OR pull the `<GooFilter :id :blur :slope :offset>` merge INTO this wave** (the DRY-honest move, ~30 lines, comparable to the scroll-fission compose). The amendment chooses: DRY-DEFER the merge to a sibling but retune `#dock-morph-goo` in-step so no graph diverges. |
| **D9** (R9, ch2) | "W-GOO-SPLIT-PERF re-fires downstream, untouched here" | **PERF BORN HERE.** The heavier hourglass goo (blur 10, clip-path filter-inputs, the `search` 1→N burst = N clip-path'd filter-inputs animating on WebKit) is introduced in THIS wave; G6 bounds only the 1→2 case. The clip-path-under-filter-under-per-frame-transform triple is a known WebKit raster-divergence surface, UN-tested. | **PIN the hourglass `polygon()`/`path()` to STATIC vertex literals** (animate only `scaleX`/`scaleY`/`--neck-girth`, never the polygon coords — the bug-283156-adjacent class). Add a G6 sub-assert capping N concurrent clip-path'd filter-inputs (or render the N-burst through ONE shared goo region). Move a SMOKE WebKit frame-budget check into this wave; the full `W-GOO-SPLIT-PERF` p50 re-fires downstream over the FINAL goo cost. |

---

## 5. THE UNION PATH — the deft integration (KISS, reuse extant, no dual-path, no legacy)

**ONE `useDockFission`, evolved in place. The drive/spring/signatures/seam-tension/PRM-seat are
verbatim. We re-author the SHAPE the bridge CSS carves, compose the one missing trigger, retune
the literals, and reconcile the morph arm to its REAL defect.** The fission topology survives —
this is a refinement-in-place, never a re-fork.

| file | change | kind |
|---|---|---|
| `src/styles/dock/fission-bridge.css` | **THE HEADLINE RE-INVENT.** `.dock-fission-neck` (`:172`): KEEP the reach/rotate/scaleX span; REPLACE the uniform `scaleY` thin with `scaleY(var(--neck-girth))` + ADD a STATIC `clip-path: polygon()`/`path()` hourglass (throat `--neck-waist`, STATIC vertices — only the transform animates). `.dock-fission-piece::before` (`:462`): REPLACE `clip-path: inset(…)` with the SAME static hourglass. ADD `.dock-fission-neck` to the `@media reduce` carve (D7). KEEP the specular-sweep + ripple + merge-splash VERBATIM. | **RE-INVENT (broken geometry) — load-bearing** |
| `src/components/custom/dock/composables/useDockFission.ts` | EXTEND `writePieces` + `seatSync`: write ONE `--neck-girth = GIRTH_FLOOR + sin(π·neckT)^1.5·SWELL` per frame + the budOut/arc/overshoot island writes. Drive/spring/signatures/seam-tension/PRM-seat verbatim. NO second spring/clock. | **REFINE (weak)** |
| `src/components/custom/dock/DockGooFilter.vue` | RETUNE default literals toward the gooier window — **but the exact `blur/slope/offset` is re-SOLVED at build-time against a REAL rendered-throat readback** (the spike's numbers are fabricated — D4). Graph byte-unchanged. | **REFINE (values, build-derived)** |
| `src/styles/dock/morph-bridge.css` + `morph-showcase.vue` + `AppShell.vue` + `#dock-morph-goo`/`#shell-dock-morph-goo` | RE-SCOPE the morph arm to its REAL defect (D2): verify/widen the `(0.18,0.82)` dwell so the goo fuses a gooier CROSSFADE-CONCEAL (NOT a waist — the reflow has no throat); HARDEN/COLLAPSE `#dock-morph-goo` onto the shared mount (sRGB + −50%/200% + matched literals, D8). KEEP the JS wire (DRY). | **REFINE (gate-window + graph-harden) — NOT a dead-wire fix** |
| `src/styles/tokens/` (dock scheme) | ADD `--neck-girth` (`@property` typed), `--neck-waist` (the throat), `--dock-goo-weight` — all NET-NEW (D6). DEPEND on `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH` for `--motion-weight`/`--ease-cartoon-punch`. | tokens (NET-NEW) |
| `src/components/custom/dock/GlassDock.vue` | UNCHANGED structurally. COMPOSE `useScrollChrome` → `useDockFission` for the scroll trigger (`:fissionOnScroll`). | **REFINE (the wire)** |
| `demo/stories/dock/dock-scroll-fission.vue` (new) | the live shell `GlassDock :splittable :fissionOnScroll :splitContext="media"` over a scrollable field — the 5-tab → transport-triad → re-merge (the v3 read), the π surface. `dock-gallery` + `morph-showcase` inherit the hourglass neck. | demo |
| `useDockContextSilhouette.ts` / `useScrollChrome.ts` / `useDockItemDrag.ts` / `DOCK_SPLIT_SIGNATURES` / `PLACEMENT_VECTOR` / box-INVIOLATE | UNCHANGED — REUSED. | **reuse** |

**NO LEGACY:** the `inset()` constant-pinch + the uniform-scaleY capsule are DELETED, not aliased
— replaced in the same amendment. The orchestrator drive, the `DOCK_SPLIT_SIGNATURES` map, the
Safari filter graph, the `PLACEMENT_VECTOR`, the box-INVIOLATE fence all SURVIVE verbatim (fit).
Clean break only where broken. NO portal fork (the frame escapes the clip — live-confirmed). The
goo `<GooFilter id>` merge stays DRY-deferred to a sibling, but `#dock-morph-goo` is retuned
in-step so no graph diverges.

---

## 6. THE CONVERGENCE VERDICT

- **Triage: REFINE-dominant.** The engine (orchestrator, spring, signatures, Safari filter,
  `:splittable` facility, material) is FIT (KEEP). The ONE RE-INVENT is the neck SHAPE (a
  net-new static-hourglass concave `clip-path`). The scroll trigger is an ASSEMBLE (compose).
- **Convergence ~78%** — engine + facility ~100% fit; the neck-shape re-invent + the scroll
  compose + the filter retune + the morph re-scope are the build-time deltas. The remaining ~22%
  is build-time: the REAL rendered-throat readback re-tuning the literals (the spike never
  measured it), the static-hourglass `path()` (no facets), the PAIRED Chromium+Safari-Metal
  capture (zero Safari evidence today), the decoupled bud/landed proportion, the morph gate-window
  fix + graph harden, the N-burst perf cap, and the PRM spanning-neck carve.

See `WAVE-AMENDMENT.md` for the concrete tranche reconciliation.
