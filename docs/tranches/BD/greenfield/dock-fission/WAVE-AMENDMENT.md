# DOCK FISSION — the WAVE-AMENDMENT (reconciled against the 116-wave union set)

> The concrete tranche amendment for the dock-fission engine, reconciled against
> `docs/tranches/BD/union/waves/` (116 waves). Reference implementation: `GOLDEN.md` (as
> HARDENED by the three challenges + folded in `DELTA-ASSAY.md` §4 D1–D9). No duplicative
> work — every fission/goo/scroll wave is dispositioned by filename below. ONE
> `useDockFission`, ONE goo vocabulary, NO portal fork, NO second spring, NO legacy.

---

## 0. THE RECONCILIATION SUMMARY

The extant union ALREADY carries the fission engine's evolution across several waves:
`BD.W-FISSION-FILAMENT` (the body-anchored SPANNING neck), `BD.W-DOCK-GOO-SPACING` (the
merge-threshold token), `W-DOCK-SCROLL-FISSION` (the scroll trigger), `BD.W-GOO-SPLIT-PERF`
(the Safari-Metal budget), `BD.W-DOCK-SUBDOCK` (the persistent terminus), `W-DOCK-HUB-API`
(the dock-as-hub). The dock-fission GOLDEN's headline — the **hourglass-neck SHAPE re-invent**
— is the ONE thing NONE of them carry: `BD.W-FISSION-FILAMENT` makes the neck SPAN the gap but
keeps the `inset()` constant-cross-section pinch (its F1 asserts the SPAN geometry, never the
silhouette concavity). So the amendment is **ONE new wave that lands the SHAPE + AUGMENTs the
spanning-neck wave to converge with it, with NO new engine and NO duplication.**

---

## 1. NEW WAVE — `BD.W-DOCK-FISSION-NECK-WAIST`

**Band 4 · dock/refine · depends:** `BE.W-DOCK-FISSION` (the orchestrator + `fission-bridge.css`
— shipped) · `BD.W-FISSION-FILAMENT` (the body-anchored SPANNING neck this wave RE-SHAPES —
GATE-SPLIT: FILAMENT lands the SPAN geometry FIRST, this wave re-cuts its SILHOUETTE) ·
`BD.W-MOTION-WEIGHT` (booked-pending — ships `--motion-weight`) · `BD.W-CARTOON-PUNCH`
(booked-pending — ships `--ease-cartoon-punch`) · `BD.W-GOO-BARBELL-NECK` (the goo-morph
amendment's NET-NEW concave-`path()` — the SHARED smooth-throat geometry this wave lifts at dock
scale, NO fork) · `BD.W-DOCK-GOO-SPACING` (the `--dock-goo-spacing` the gap-sized blur reads).

> **STATUS: IMPLEMENTATION-gated (tranche-DEV PLAN).** Edits `src/`
> (`fission-bridge.css` neck re-shape + `useDockFission.ts` `--neck-girth` write +
> `DockGooFilter.vue` literal retune). User-gated. EXTENDS the byte-tested goo — NO second
> spring, NO second clock (the BE.W-DOCK-FISSION fence held).

### The ask (the SHAPE re-invent — the load-bearing fix)

Live-confirmed on HEAD (`/dock/dock-gallery`, getComputedStyle): `.dock-fission-neck` =
`clip-path: none` + `scale: 0.04 1` (uniform scaleY capsule, `:202-204`); `.dock-fission-piece::before`
= `clip-path: inset(0% 0px round 999px)` (constant cross-section, `:462`). **NEITHER produces a
structural concavity** — both threshold (under the goo blur) to a fatter rounded capsule, never an
hourglass waist. The split reads as a fat lozenge budding a wisp, not a metaball necking + snapping.

### The mechanism (re-shape, not re-build)

1. **`.dock-fission-neck` (`:172`) — ADD a STATIC HOURGLASS + the girth bell.** KEEP the
   reach/rotate/scaleX span (correct — it spans `reach × island-t` along the placement vector).
   REPLACE the uniform `scaleY` thin (`:204`) with `scaleY(var(--neck-girth))`. ADD
   `clip-path: path()` (or `polygon()`) — a STATIC concave hourglass, throat ≈ `--neck-waist`,
   wide where it meets the plate + the bud, pinched at the centre. **STATIC vertices — ONLY the
   transform/scale/`--neck-girth` animate** (the bug-283156-adjacent fence; D9). Lift the
   `BD.W-GOO-BARBELL-NECK` smooth-`path()` (Bézier sides, √φ control points — no facets through
   the slope-15 threshold) at dock scale; NO fork.
2. **`.dock-fission-piece::before` (`:462`) — REPLACE the `inset()` with the SAME static
   hourglass** (parameterized by `--neck-filament`/`--seam-tension` — the pointer-pull RESIST
   still thins the throat). The constant-pinch is DELETED, not aliased.
3. **`useDockFission.ts` — write ONE `--neck-girth = GIRTH_FLOOR + sin(π·neckT)^1.5·SWELL`** per
   frame in the existing `writePieces`/`seatSync` (the bell the hourglass `scaleY` reads — the
   throat WELLS then PINCHES). Drive/spring/signatures/seam-tension/PRM-seat VERBATIM. NO second
   spring, NO second clock.
4. **`DockGooFilter.vue` — RETUNE the prop default literals** toward the gooier window. **The
   exact `blur/slope/offset` is RE-SOLVED at build-time against a REAL rendered-throat readback**
   (the spike's `neckGirth·0.34` arithmetic is fabricated — D4; the goo-morph amendment proved the
   `10/24/-11`-style numbers were per-mount, not universal). Graph byte-unchanged (sRGB +
   −50%/200% + regular `filter:url` intact). Retune `#dock-morph-goo`/`#shell-dock-morph-goo`
   in-step so no graph diverges (D8).
5. **The cartoon-punch overlay** — budOut early-scale + the perpendicular arc lob (amplitude a φ
   relation, `reach·1/φ²·…`, NOT the magic 0.06) + the √φ overshoot share, gated per the NET-NEW
   `--dock-goo-weight` (DEPENDs `--motion-weight`/`--ease-cartoon-punch`). The body squish cap
   STAYS ≤1.08 (lens-c's 1.18 REJECTED). The moving cast reads the REAL `--shadow-cartoon`.
6. **DECOUPLE the bud from the landed island (D5).** The goo-throat bud can be `D = thick/φ`; the
   LANDED island is content-sized (`inline-size: max-content`, already shipped) ≈ source thickness.
   The bud GROWS into the content-sized island as it lands. Drop "golden-minor droplet" as the
   landed-dock proportion.
7. **PRM carve (D7).** ADD `.dock-fission-neck { display: none }` (or opacity 0) to the
   `@media (prefers-reduced-motion: reduce)` block — the spanning neck currently leaks a ~0.35
   residual at the settled endpoint (its opacity is `--island-t`-driven; the reduce block at
   `:526-551` only zeroes the `::before`/`::after` cohort).

### The gate — `proof:dock-fission-waist` (born-RED → GREEN; a REAL rendered readback, NEVER arithmetic)

`scripts/proof-fission-waist.mjs` (source-structure arm) + the binding π
`tests-visual/dock-fission-waist.spec.ts` (the painted-truth readback). The π is a paired-engine
rAF frame-series on a REAL drag-to-split `/dock/dock-gallery` + the new `dock-scroll-fission`
story, BOTH modes + the **webkit** project, LIVE motion, canvas-reading the warm-cream alpha band
along the travel axis at the neck peak (p≈0.55).

- **W1 — a REAL concave waist (the headline).** `getImageData` cross-axis alpha scan of the
  rendered (post-filter) throat: `waistGirth/bodyGirth ≤ 0.45` AND a TRUE `hasLocalMinimum`
  (a second-derivative SIGN-CHANGE on the cross-axis profile, NOT `girth<0.95`) AND the minimum
  is INTERIOR while the band is CONNECTED (`min(crossAxis) > 0` — a separated two-blob gap does
  NOT count; D4/D5). **Born-RED** on HEAD: the `none`/`inset()` neck → MONOTONE convex (no
  interior local minimum) → W1 FAILS. A born-RED CONTROL captures the SHIPPED neck under the SAME
  filter and shows it FAILS the local-minimum (the paired control — D4).
- **W2 — the girth bell rises→falls.** `--neck-girth(t)` wells then pinches (≈0.16→0.92→0.16),
  not a monotone fade. Born-RED: no `--neck-girth` write on HEAD.
- **W3 — the STATIC clip-path (the Safari fence).** The hourglass vertices are STATIC literals;
  only `transform`/`scale`/`--neck-girth` animate (the detector asserts no `var()` in the
  `polygon()`/`path()` coords; D9). Paired-engine: `webkit.waistRatio ≈ chromium.waistRatio
  (±0.05)` at the WIDEST gap (the scaleX-stretch divergence surface) — with an `inset()` fallback
  if WebKit diverges >0.05.
- **W4 — a REAL second dock arrives.** `islandScale(p=1) ≥ 0.98 && islandOpacity(p=1) ≥ 0.95`;
  the landed island is content-sized (≈ source thickness), NOT the `thick/φ` bud (D5).
- **W5 — never gray (§3 + no-gray).** Plate + neck + island: `C ≥ 0.010, H ∈ [45,85]`, BOTH
  modes; the vibrant field reads THROUGH the transmissive neck + island (live: island α 0.8).
- **W6 — one-spring + compositor + PRM.** No second `new SpringProgress`/`setTimeout`/`@keyframes`
  in `useDockFission.ts`; ~3–4 transforms/frame; the goo gated to `[data-fissioning]` (not a
  steady-state re-blur); PRM → `seatSync()` one-frame + `.dock-fission-neck` opacity 0 (D7);
  N-burst caps concurrent clip-path'd filter-inputs (a smoke WebKit frame-budget check; the full
  p50 re-fires in `BD.W-GOO-SPLIT-PERF` — D9). `proof:no-layout-animation` green.

**Self-test bites (each MUST red):** (a) the HEAD `none`/`inset()` neck → W1 RED. (b) a monotone
`--neck-girth` → W2 RED. (c) a `var()` in the clip-path coords → W3 RED (the Safari bite). (d) a
`thick/φ` landed island → W4 RED. (e) a gray neck → W5 RED. (f) a second spring/clock → W6 RED.
(g) the spanning neck not opacity-0 under reduce → W6 RED (the PRM leak bite).

---

## 2. AUGMENT — `BD.W-FISSION-FILAMENT.md`

**The convergence (NOT a dup — a GATE-SPLIT).** `BD.W-FISSION-FILAMENT` makes the per-piece neck
BODY-ANCHORED + SPANNING (its F1 asserts the `--neck-span-*` span geometry; the blur reads
`--dock-goo-spacing`). But it KEEPS the `inset()` constant-cross-section pinch as the throat
("its width necking via the SAME `--neck-inset` clip-path pinch (`:315-319` — kept, it now pinches
a SPANNING band)"). The new `BD.W-DOCK-FISSION-NECK-WAIST` RE-CUTS that throat SILHOUETTE to the
concave hourglass. **Reconcile so the two land coherently:**
- ADD to `BD.W-FISSION-FILAMENT` a forward note: "the `::before` throat SILHOUETTE is the
  `inset()` capsule HERE (span geometry); `BD.W-DOCK-FISSION-NECK-WAIST` re-cuts it to the static
  hourglass `path()` (the concavity). FILAMENT lands the SPAN; NECK-WAIST lands the SHAPE — ONE
  neck, two arms, no dup."
- Its F1 (`f1BodyAnchored` — the span transform) stays GREEN by construction (the hourglass is
  still a `transform`-driven `::before`, now with a static concave clip instead of an inset).
- Its π's "spanning throat" frame-series GAINS the W1 waist assert (the throat now reads a real
  concavity, not just a span) — re-confirmed at NECK-WAIST's close.

**No PRUNE.** The wave is fit (the span is the right geometry); it is AUGMENTED with the
forward-ref so the throat shape is owned by exactly one wave.

---

## 3. AUGMENT — `W-DOCK-SCROLL-FISSION.md`

**The genuinely born-RED assembly arm (all 3 challenges agree).** `useScrollChrome` +
`useDockFission` exist as separate primitives, never composed — the v3 scroll-fission headline is
unassembled. This wave is ALREADY the right home for the trigger. AUGMENT:
- DEPEND-on `BD.W-DOCK-FISSION-NECK-WAIST` so the FIRST live scroll-island renders the hourglass
  neck (the scroll fission is the highest-value surface for the W1 waist π).
- Its π gains the `dock-scroll-fission` story as a W1/W4/W5 capture surface (the 5-tab →
  transport-triad → re-merge — the literal Apple-Music read; born-RED on HEAD: no composition).
- Its CONVERGENCE note updates: the assembly is ~30 lines (compose, not build); the SHAPE it
  reveals is owned by NECK-WAIST.

**No PRUNE.** The scroll compose is the cleanly-born-RED arm; AUGMENTED to carry the waist π.

---

## 4. AUGMENT — `BD.W-GOO-SPLIT-PERF.md`

The hourglass goo is HEAVIER (blur ~10, clip-path filter-inputs, the `search` 1→N burst = N
clip-path'd filter-inputs animating on WebKit). The perf regression is BORN in NECK-WAIST (D9).
AUGMENT `BD.W-GOO-SPLIT-PERF`:
- It re-fires its real-Metal p50 budget over the FINAL hourglass goo cost AFTER NECK-WAIST lands
  (the DOWNSTREAM re-capture edge — already its idiom).
- ADD a clause: the N-burst caps concurrent clip-path'd filter-inputs (or renders the N necks
  through ONE shared goo region) — NECK-WAIST ships a SMOKE check; PERF owns the full p50.

**No PRUNE.**

---

## 5. THE MORPH ARM — RE-SCOPE (NOT a dead-wire fix; D1/D2/D8)

**No new wave; fold into the morph-family's existing home.** The GOLDEN's "dead morph-goo wire /
one-token fix" is FICTION (`--dock-bridge-goo-filter` is wired in `morph-showcase.vue:277` +
`AppShell.vue:488`, gated to `t∈(0.18,0.82)`; the `gooFilter(morphBridge)!=='none'` arm is
born-GREEN). The REAL defect: the spring `morph.t` never DWELLS in the `(0.18,0.82)` window
(live-sampled `filter: none` across the whole morph), AND `#dock-morph-goo` is a per-consumer
inline graph (`x=-10% width=120%`, NO sRGB, slope-20/offset-9 — the §L7 antithesis).

- **AUGMENT `W-GOO-MORPH-REFINE.md`** (the morph-goo refinement home): RE-SCOPE its goo arm to
  (1) verify/widen the `(0.18,0.82)` occlusion dwell so the goo fuses a gooier CROSSFADE-CONCEAL
  — NOT a fission-grade waist (the V↔H reflow has no two-persistent-mass throat; the platform
  cannot interpolate a mismatched-topology silhouette — D2); (2) HARDEN/COLLAPSE `#dock-morph-goo`
  + `#shell-dock-morph-goo` onto the shared `<DockGooFilter>` mount (sRGB + −50%/200% + the matched
  literals) so they are not 3rd/4th Chrome-only divergent graphs (D8). KEEP the JS wire (DRY); do
  NOT add a competing CSS `[data-morphing]` assignment.
- Its gate asserts the FUSION OUTCOME at a FORCED `morph.t≈0.5` (a gooier conceal in painted
  pixels), NOT the `!== 'none'` token-presence (which tests wiring that already ships).

**If `W-GOO-MORPH-REFINE` was SUPERSEDED by the goo-morph amendment's `BD.W-GOO-BARBELL-NECK`**
(the ledger goo-morph row records SUPERSEDE W-GOO-CAROUSEL-DECK + W-GOO-MORPH-REFINE), route the
morph-goo re-scope onto `BD.W-GOO-BARBELL-NECK`'s morph-consumer arm instead — same content, the
correct live home. NO new wave; NO duplication.

---

## 6. NO-OP / REUSE (reconciled, no edit)

- **`BD.W-DOCK-GOO-SPACING`** — the `--dock-goo-spacing` token the gap-sized blur reads; NECK-WAIST
  CONSUMES it (the throat softness scales with the gap). NO edit (SIBLING-CONSUMES).
- **`BD.W-DOCK-SUBDOCK`** — the persistent re-seat terminus; its neck-π is born-RED-until-FILAMENT.
  NECK-WAIST re-cuts the silhouette FILAMENT spans → SUBDOCK's neck reads a real waist for free.
  NO edit.
- **`W-DOCK-HUB-API`** — the dock-as-hub (the sub-dock as a generalized spawned dock); the scroll
  fission is its flagship instance. NO edit (the scroll arm is in W-DOCK-SCROLL-FISSION).
- **`BD.W-MOTION-WEIGHT` / `BD.W-CARTOON-PUNCH`** — booked-pending siblings shipping
  `--motion-weight`/`--ease-cartoon-punch` (referenced across 23 amendment docs); NECK-WAIST
  DEPENDs (does NOT alias-as-extant — D6). NO edit here.
- **`BD.W-GOO-BARBELL-NECK`** — the goo-morph amendment's NET-NEW concave-`path()` engine; the
  SHARED smooth-throat geometry NECK-WAIST lifts at dock scale (`useGooMorph` at viewport scale vs
  `useDockFission` at dock scale — two engines, two scales, ONE `path()` idiom REUSED). NO dup.

**No wave PRUNED or EXCISED.** The 116-wave set is reconciled: ONE new wave
(`BD.W-DOCK-FISSION-NECK-WAIST`), four AUGMENTs (FISSION-FILAMENT, SCROLL-FISSION, GOO-SPLIT-PERF,
GOO-MORPH-REFINE/BARBELL-NECK), the rest NO-OP/REUSE. The EXCISIONS are from the GOLDEN/source,
not the waves: the `inset()` constant-pinch + the uniform-scaleY capsule (DELETED in NECK-WAIST),
and the GOLDEN's fabricated §8 π + the "dead-wire / one-token fix" framing (struck in DELTA-ASSAY
§4 D1/D4). NO portal fork, NO second engine, NO legacy.

---

## 7. THE BORN-RED LEDGER (which arm reds on HEAD, why)

| arm | surface | born-RED on HEAD because |
|---|---|---|
| W1 waist | `/dock/dock-gallery` drag-split | `clip-path: none`/`inset()` neck → monotone convex, no interior local minimum (live-confirmed `scale:0.04 1`) |
| W2 girth bell | rAF readback | no `--neck-girth` write in `useDockFission.ts` |
| W3 static-clip Safari | webkit project | the hourglass `path()` does not exist; zero Safari evidence today |
| W4 real second dock | dwell→land | the landed island is content-sized already (W4 mostly GREEN — the bud/landed decouple is the refine) |
| W5 no-gray §3 | both modes | mostly GREEN (warm-cream live) — the assert FLOORS the existing fit |
| W6 one-spring/PRM | source + reduce | one-spring GREEN; the `.dock-fission-neck` opacity-under-reduce LEAKS ~0.35 → the PRM bite reds |
| scroll assembly | `dock-scroll-fission` story | no `useScrollChrome`→`useDockFission` composition exists (the cleanest born-RED) |
| morph fusion | `/dock/morph-showcase` forced `t≈0.5` | the dwell window is never satisfied (live `filter:none`); `#dock-morph-goo` is a Chrome-only divergent graph |

The HEADLINE born-RED (W1) is REAL and de-risked by the GOLDEN's painted screenshot (the concavity
is genuine in pixels even though the §8 numeric table is fabricated — D4); the gate makes the FIRST
true rendered-pixel measurement of it, with a paired control proving the shipped neck fails.
