# H-fourier — Adversarial hardening: the Fourier-field fold (AY.W-FF1/2)

**Lane** H-fourier · **Verdict** GAPS-FOUND (the fold under-specs the live reality; the element is REAL with a
LIVE ≥2nd consumer, but the AY plan rows treat it as a thin research-fold + an open ≥2-or-book question that the
evidence already answers) · **Source-grounded against HEAD** (`at-dock-convergence`).

---

## TL;DR — the verdict

The fourier-field is a **REAL abstracted glass-ui element, NOT research-only** — it ships at
`src/components/custom/fourier-field/{FourierField.vue,math.ts,index.ts}`, on the `/fourier-field` subpath,
with a demo story + a live hero wiring (`auth-shell`). So AY.W-FF2's framing — "Abstract fourier-field into a
glass-ui element (≥2-consumer bar or formally book)" — is **already answered for the COMPONENT** (it's
exported and demo-consumed) but **MIS-FRAMES the actual open question**, which is the **shared `/fourier-math`
LEAF**, not the component.

The real defects the fold MUST carry, none of which the two AY rows (`W-FF1` "path-forward doc" +
`W-FF2` "exported or booked") name as hard gates:

1. **W43 NEVER LANDED.** Every AX.W43 deliverable is ABSENT in live HEAD: `OUTLINE_PEAK_ALPHA = 0.24` survives
   (5 refs), no `intensity` prop, no per-variant bundle, no README, no smoke test, no gates. The component is
   **visibly broken** (captured below). The AY fold inherits a born-RED spec that was authored but stopped —
   AY.W-FF must RE-LAND it, not just "fold the research."
2. **The ≥2nd consumer is LIVE, not hypothetical.** `fourier-analysis` depends on `@mkbabb/glass-ui@^3.1.0` AND
   maintains its OWN byte-equivalent `lib/{evaluators,bases}.ts` copy of the exact math glass-ui exports. This
   is the slides-`constellation.ts`-class bespoke-copy-in-consumer the AY HEADLINE targets — the research doc's
   "keep-book, do not mint a shared subpath" disposition is STALE against the live dependency.
3. **The three hero substrates are NOT sibling-parity.** `StoryHero.vue` threads `:opacity-ceiling` into Aurora
   (and a tuned alpha into Constellation), but FourierField has **no loudness knob at all** — the `auth-shell`
   fourier hero paints at a hardcoded, un-recessable 0.24, which both reads invisible and breaks the P7/Q9
   "recess behind the glass card" contract the fold is supposed to serve.

---

## 1. The element is REAL — citizenship inventory at HEAD

| Citizenship axis | State at HEAD | Evidence |
|---|---|---|
| Component | EXISTS | `src/components/custom/fourier-field/FourierField.vue` (353 lines) |
| Math leaf | EXISTS, exported | `math.ts` + `index.ts:2-9` re-exports `comp/evalFourier/positionsAt/makeEllipticSpectrum/BasisComponent/EllipticSpectrumOptions` |
| Subpath | EXISTS | `package.json:296-298` (`./fourier-field`), `src/subpaths/fourier-field.ts`, `typesVersions` :58-59 |
| Demo story | EXISTS | `demo/stories/substrates/fourier-field.vue` + `manifest.ts:141` |
| Live hero wiring | EXISTS | `StoryHero.vue:124-132` (`kind === 'fourier'`); `manifest.ts:289-292` (`auth-shell` hero page) |
| Token | EXISTS | `--viz-fourier` (`tokens.css:542` + light-dark dark variant `:1893`,`:2012`) |
| api seat | ABSENT (comment-only) | `api/index.ts:299` mentions FourierField in prose; NO exported FourierField props/variant type |
| README | **ABSENT** | no `*.md` in the package dir |
| Smoke test | **ABSENT** | no `tests/**fourier**` |
| proof gate | **ABSENT** | no `proof:fourier-*` in `package.json` or `scripts/` |

**Verdict on "research-only?":** NO — it is a shipped, exported, live-consumed element. AY.W-FF2's "exported
or booked" gate is already satisfied for the component surface; the wave must STOP treating that as the open
question.

---

## 2. The headline defect — W43 was authored RED but NEVER landed (the component is visibly broken)

The AX.W43 spec (`docs/tranches/AX/waves/AX.W43-fourier-field-first-class.md`, 56 KB, fully born-RED with TWO
gates) specified the intensity-model fix. **None of it is in the source.** Hard evidence:

- `FourierField.vue:103` — `const OUTLINE_PEAK_ALPHA = 0.24;` STILL present. `grep -c OUTLINE_PEAK_ALPHA src/` → **5**, not 0.
- `FourierField.vue:282` — the trail body STILL decays QUADRATICALLY: `c.globalAlpha = OUTLINE_PEAK_ALPHA * age * age;` — the exact W43 RED witness ("a quadratic kills the body").
- `FourierField.vue:237,242` — the epicycle arms still paint at `0.24*0.6*0.5 ≈ 0.072` and `0.24*0.6 ≈ 0.144` (sub-perceptible).
- `FourierField.vue:294` — the head glow shares `OUTLINE_PEAK_ALPHA` (NOT the strongest layer; W43 §2.2 wanted `headGlowAlpha > peakAlpha`).
- NO `intensity` prop on the `defineProps` (`:40-57`) — `grep intensity FourierField.vue` → none.
- NO per-variant bundle fields (`peakAlpha`/`headGlowAlpha`/`headGlowBlur`/`epicycleRatios`/`trailFadeExp`/`trailFloor`) in `VariantPreset` (`:59-99`).
- The per-frame color resolve (`:212-222`) re-runs `colorResolver` + `cssToOklch` + `deriveHue` + `oklchToGammaRgb` **every frame** — the W43 §3 zero-alloc hoist was never done.

**Captured visual truth** (the live render in the demo storybook, the cardinal-lesson DELTA, both modes):
- `docs/tranches/AX/audit/visual/W18-fourier-field-desktop-light.png`
- `docs/tranches/AX/audit/visual/W18-fourier-field-desktop-dark.png`

Both show the `final` preset (epicycles OFF) rendering as **only a tiny faint red comet stub in the corner** —
the curve is effectively invisible. Because `final` has `epicycles: false` (`:96`), the comet trail is the
ONLY thing it draws, so the 0.24-quadratic-fade renders the WHOLE preset invisible. The `hero` preset shows
faint scaffolding circles but a barely-visible trail. This is a SHIPPED, EXPORTED, LIVE-CONSUMED element that
does not read.

**Fold consequence:** AY.W-FF1 is NOT "fold research into a path-forward doc" — the path forward already exists
(the W43 spec + the SOTA research). AY.W-FF1 should be a thin **rebase-the-RED-spec** wave, and AY.W-FF2 must
LAND the intensity model + render recipe + zero-alloc hoist + citizenship, with the W43 gates AUTHORED (they
never were). The AY row's gate ("path-forward doc" / "exported or booked") is **under-specced** — it does not
demand the legibility fix that is the entire reason the field exists.

---

## 3. The ≥2nd-consumer question — the AY framing is STALE; the live answer is "promote the math leaf"

AY.W-FF2 asks "≥2-consumer bar or formally book." The research doc (§5) answers "keep-book, the sibling is an
independent verbatim port, fine at 2 repos." **Both are stale against the live dependency.**

Live evidence:
- `fourier-analysis/web/package.json:14` — `"@mkbabb/glass-ui": "^3.1.0"` (the sibling ALREADY consumes glass-ui).
- `fourier-analysis/web/src/lib/bases.ts:27-46` `fourierPositionsAt` is **byte-equivalent** to glass-ui's `math.ts:64-83` `positionsAt`.
- `fourier-analysis/web/src/lib/evaluators.ts:9-26` `evaluateFourier` is **byte-equivalent** to glass-ui's `math.ts:39-56` `evalFourier`.

This is precisely the "fix at the ROOT, not a bespoke copy in the consumer" precept that AY's headline names
(the slides-`constellation.ts` exemplar to KILL). The sibling carries a duplicated math copy of code glass-ui
ALREADY EXPORTS via `/fourier-field`. The two-repos-two-copies state IS the divergence AY exists to close.

**The nuance that makes this a real spec input, not a glib "promote it":** the sibling's `bases.ts` ALSO carries
`evaluateBasis` dispatch over chebyshev/legendre (polynomial bases) — glass-ui correctly ships ONLY the fourier
arm. So the shared leaf is the **fourier-only** `{evalFourier, positionsAt, comp, BasisComponent}` core, and the
sibling's polynomial bases stay sibling-local. The promotion is real but BOUNDED. AY.W-FF2 must DECIDE: either
(a) promote a `/fourier-math` (or fold the leaf into an existing math/`@mkbabb/value.js`-adjacent subpath) and
have the sibling import it — closing the duplication at the root — OR (b) book it with a CONCRETE trigger
("when fourier-analysis next bumps glass-ui, replace its `lib/evaluators+bases` fourier arm with the import").
The current AY row leaves this as a hand-wave; the fold's job is to RESOLVE it with the live dependency as the
deciding evidence.

---

## 4. Cohesion defect — the three hero substrates are NOT sibling-parity (breaks P7/Q9)

The W43 research §6.2 + the AY page-redesign premise is that each hero rotates one of {aurora, constellation,
fourier-field} as its full-page background behind a GLASSY hero card, with a per-hero loudness recession so the
card stays legible. The live `StoryHero.vue` does NOT honor this for fourier:

- `StoryHero.vue:64-70` computes `opacityCeiling` (hero 0.6 / page 0.4, or a declared `intensity`).
- `:112` — `<Aurora :opacity-ceiling="opacityCeiling">` ✓ recedes.
- `:116-123` — `<Constellation>` carries its own tuned alpha (`--constellation-alpha` knob) ✓.
- `:124-132` — `<FourierField>` gets **NO loudness knob** — it has no `intensity` prop to accept one (§2). So
  the `auth-shell` fourier hero (`manifest.ts:289-292`) paints at the hardcoded, un-recessable 0.24.

Net: the fourier hero is BOTH invisible (the 0.24 quadratic fade) AND un-tunable (no `intensity` to recess it
the way aurora is recessed). The W43 §2.3 `intensity` prop (the verbatim Aurora `opacityCeiling` shape) is the
direct fix AND the parity-restoring move — `StoryHero.vue:124` must thread `:intensity="opacityCeiling"` once
the prop exists. The AY fold MUST gate on this three-substrate parity, not just on the component-internal
intensity model.

---

## 5. SOTA-recipe gaps the fold should carry (the research is sound; these are the un-done refinements)

The W43 SOTA research doc is high quality and largely correct. The un-done refinements it specs that AY.W-FF2
must actually implement (none are in HEAD):

- **R1 — amplitude-descending sort.** `grep sort math.ts FourierField.vue` → **none**. `makeEllipticSpectrum`
  emits `[+1,−1,+2,−2,…]` emission order; the draw pass never sorts largest-first.
- **R2 — 3-pass phosphor-comet render** with the dark/light blend fork (`lighter` on ink, `source-over` on
  cream). HEAD has a flat single-pass `globalAlpha` stroke + one `shadowBlur=14` head pass; no additive blend,
  no per-variant `headGlowBlur`, no `trailFloor` (the body never "survives").
- **Zero-alloc color hoist** (§3) — un-done (§2).

**Caveat on the research's own internal-consistency (a finding against the SOURCE doc):** the §2.2 bundle table
gives hero `peakAlpha=0.55`/`headGlowAlpha=0.62` while §2.2's closing paragraph and the AX.W43 FileBounds say
"hero peak≈0.55, **trail head ≈0.35**." The 0.55-vs-0.35 trail-head reading is reconciled only by "the value
AFTER the `intensity` default ride at a recessed hero loudness" — which is circular, since `intensity` defaults
to 1 (no ride). The AY fold must PIN ONE unambiguous target set (the resting paint alpha, intensity=1) so the
visibility gate measures a single defined number, not a "record both readings" hedge that no gate can assert.

---

## 6. Naming + plan-hygiene defects (administrative, but they'll bite execution)

- **Wave-id mismatch.** `AY.md:62-63` names the waves `W-FF1`/`W-FF2`; `AUDIT-LEDGER.md:27` folds directive #8
  into `AY.W-fourier-fold` (singular). These must reconcile to ONE id before dispatch or the orchestrator
  loses the thread.
- **No authored wave spec exists.** `docs/tranches/AY/waves/` is EMPTY — neither `W-FF1` nor `W-FF2` is
  authored. The fold has only the AY.md table row (one line, gate = "path-forward doc"). This is the
  under-spec: a one-line "path-forward doc" gate for a wave that must re-land a stopped born-RED spec + decide
  a live cross-repo duplication + restore three-substrate parity.

---

## 7. Convergence criteria — what "perfected" means for this lane

The fourier-field fold is DONE when:
1. `grep -c OUTLINE_PEAK_ALPHA src/` → 0 (clean break, no alias); the per-variant intensity bundle + the
   `intensity?: number` prop (Aurora `opacityCeiling` shape, clamp `[0,~2]`) are on the public surface.
2. The 3-pass phosphor-comet render + the dark/light blend fork + R1 sort + the zero-alloc hoist are landed.
3. A CAPTURED live DELTA (light + dark) shows BOTH presets clearly legible — the `final` preset (trail-only) is
   no longer a corner stub; hero/final are visibly distinct as a family at the pinned resting alpha.
4. `StoryHero.vue:124` threads `:intensity` so the fourier hero recedes at parity with the aurora hero (P7/Q9).
5. Citizenship complete: README (research-backed) + api seat (the variant/props type exported) + smoke test +
   the two gates (`proof:fourier-field-intensity` static + `proof:fourier-field-visibility-live` device) AUTHORED
   and green.
6. The cross-repo math duplication is RESOLVED: either the fourier-only math leaf is promoted to a shared
   surface and `fourier-analysis` imports it (root fix), OR it is booked with a concrete dependency-bump trigger.

---

## 8. Chronic-miss flag

The W43 intensity model has now been carried across TWO tranches (AX.W43 authored-but-stopped → AY.W-FF
inherited) without landing in source. The visible-invisibility defect (the 0.24-whisper) is the SAME defect the
AX born-RED witness named, still present at HEAD. This is a CHRONIC-MISS-adjacent fold: the risk is AY.W-FF1
again produces "a path-forward doc" (the doc already exists, twice) instead of LANDING the fix. The gate must
be the live capture + the deleted-constant grep, not another research artefact.
