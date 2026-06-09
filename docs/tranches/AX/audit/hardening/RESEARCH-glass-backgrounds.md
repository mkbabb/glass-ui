# RESEARCH-glass-backgrounds — the rich-background-as-hero SOTA + the red-team of the W60 consumption recipe

**Lane** RESEARCH-glass-backgrounds (adversarial red-team + SOTA research) · **HEAD** ~89edffc (3.8.0 +
convergence W44-W61) · **Charter** Q9 / P7-W57 — *"the hero CARD itself should be GLASSY (a glass card) over the
full-page aurora/constellation/fourier background — to DEMONSTRATE the glass"* + *"each hero a UNIQUE one"*
(`USER-DEFECTS-2026-06-08-pass3.md:17,34`) · **Downstream** W60 (the page-redesign container layer) + W43
(fourier first-class) + W57 (the four hero Aurora adoptions) · **Writes no src** — research + red-team only.

> This is the hardening pass on the *composition recipe* (rich background substrate + glassy hero card +
> content) and on how each background type best demonstrates the glass. It is NOT a re-derivation of the
> fourier-field render math (W43 owns that, executed). It red-teams the SEAM W60 leans on — and finds that the
> four substrates W60 enumerates as one `StoryBackground` union are FOUR DIVERGENT APIs at HEAD, with no
> unified substrate contract, no shared loudness knob, and a uniqueness story that is real for only one of them.

---

## 0. TL;DR — the verdict

The SOTA composition recipe (background substrate at `-z-10`, a glass card floating over it, content inside the
card, an opacity/intensity ceiling recessing the background behind the card, W55 adaptive-tint carrying the
legibility) is **correct and well-grounded** in W60 + W43 + W55. The recipe is SOUND. **But the W60 spec
assumes a substrate UNIFORMITY that does not exist at HEAD** — it writes `<StoryHero :background="…">` as if
aurora / constellation / fourier / paper / grid were one swappable substrate behind one renderer, when they are
four components with four incompatible prop surfaces, four different loudness knobs (one of which does not exist
yet), three different color seams, and two different uniqueness mechanisms. The `<StoryHero>` wrapper W60 mints
becomes a four-way `v-if` adapter that hand-translates a generic descriptor into each substrate's private prop
dialect — exactly the per-substrate fork the "ONE background path" gestalt was supposed to abolish. **The
hardening action is a NET-NEW micro-wave: a `StoryBackgroundSubstrate` adapter contract (one normalized
`{ kind, color, intensity, seed }` props shape every substrate honors) authored BEFORE W60 wires it** — without
it, W60 ships the inline fork it claims to retire, just relocated inside `<StoryHero>`.

Verdict: **WEAK** — the recipe is sound, the consumption seam is incoherent. Three falsifiable challenges below
found real gaps; the chronic glass-cohesion-divergence class recurs here at the substrate layer.

---

## 1. The SOTA composition recipe — what the literature + the in-repo seams say (the SOUND half)

The rich-background-as-hero / glassmorphic-card-over-substrate pattern is the canonical 2025-26 hero idiom
(Apple iOS-26 Liquid Glass control center over the wallpaper; the dribbble/awwwards "glass card over animated
gradient mesh" hero; the Stripe/Linear gradient-canvas hero behind a frosted nav). The recipe, axis by axis,
and where glass-ui already nails it:

### 1.1 The five-layer stack (z-order, the composition canon)

```
z-10+   content (display title, prose, CTA) — INSIDE the glass card, reads AA over the card plate
 z-0    the GLASS CARD — translucent, the W52 bounded gleam + edge rim, the W56 squircle, the substrate
        visible THROUGH it (the Q9 demonstration: you SEE the background refracting through the glass)
-z-10   the rich BACKGROUND SUBSTRATE — full-bleed behind the card, recessed by an intensity/opacity ceiling
-z-20   (optional) the global PaperBackdrop shell grain (AppShell.vue:76 — stays under the per-page substrate)
```

This is exactly W60 fold 1 (`StoryHero.vue` → glass card + substrate at `-z-10`). **SOUND.** The intro.vue
HEAD already proves the mechanism works: `<Aurora :opacity-ceiling="0.6" class="absolute inset-0 -z-10">`
behind a content section (intro.vue:37-42). The ONLY HEAD gap there is that the content section is
`paper-grain-overlay rounded-card` (a NON-glass card — intro.vue:31-36), so the page does NOT demonstrate
glass-over-background — it demonstrates paper-over-aurora. That is the literal Q9 defect, correctly owned by
W60 fold 5.

### 1.2 The recessed-background discipline (the legibility precept — the load-bearing axis)

The single most-cited failure mode of this hero pattern (NN/g "Liquid Glass Is Cracked", the dribbble
glass-hero teardowns): a busy/bright background BEHIND the glass card destroys the contrast of the content
INSIDE the card. The SOTA mitigations, all three of which glass-ui has a seam for:

1. **Recess the background loudness behind the card** — Aurora's `opacityCeiling` (the outer compositing
   envelope, `Aurora.vue:33-83`); W43's minted `intensity` for fourier; constellation's `--constellation-alpha`
   field-yields-to-type dimmer. The hero recipe sets these LOW (0.5-0.7) behind a text-dense card.
2. **Darken the glass card adaptively where the backdrop is bright** — W55's `--glass-backdrop: light` bucket +
   the `color-mix(in oklab)` tint-toward-ink. This is the iOS-26/27 "locally darken the glass over light
   content" move. **W55 is the load-bearing legibility partner of this whole recipe** — without it the maximal
   glass-first card over a bright aurora is the exact G2 collapse.
3. **Clamp the content to an AA floor** — the 4.5:1 body target the W55 π-readback gate asserts.

**SOUND** — the seams exist. The hardening note (§4) is that the recipe must wire all three TOGETHER per-hero,
and the W60 spec only explicitly wires #1 (the `intensity`/`opacityCeiling` prop); the W55 bucket (#2) is named
as a cross-ref CONVERGE fold, not a per-hero wiring obligation. That is a recipe under-specification (§4.3).

### 1.3 How each background TYPE best demonstrates the glass (the per-substrate aesthetic — the research ask)

This is the substantive research deliverable: each substrate demonstrates a DIFFERENT property of the glass,
which is precisely why "each hero a unique one" is the right call (not arbitrary variety — a deliberate
demonstration matrix):

| Substrate | What it demonstrates about the glass | Best-fit hero | The glass-read it proves |
|-----------|--------------------------------------|---------------|--------------------------|
| **Aurora** (WebGL painterly drift) | **Refraction + chromatic depth.** Soft, large-scale color fields with no hard edges → the glass blur/saturate reads as a *lensing* of a continuous color field. The bounded gleam (W52) catches the brightest aurora lobe. | brand front-door (intro, hero) | the glass *refracts* — color bleeds and softens through it |
| **Constellation** (Canvas2D proximity lattice) | **Edge + line distortion under blur.** Thin hairlines + node dots behind glass → the `backdrop-filter: blur()` visibly SMEARS the lines into soft bands directly behind the card while they stay crisp outside it. The single best demonstration that the blur is REAL (a flat tint would not smear lines). | system / index / structural hero | the glass *blurs* — sharp geometry goes soft only behind the card |
| **Fourier-field** (Canvas2D epicycle comet) | **Specular + motion-trail catch.** A bright moving comet head (W43's phosphor head-glow) passing behind the glass → the specular gleam + the edge rim CATCH the moving bright point, a living highlight that tracks. Demonstrates the glass reacts to a moving light source. | math / graphics hero | the glass *catches light* — a moving bright source lights the rim |
| **Paper** (CSS grain) | **The calm/quiet baseline + the warm-cream identity.** Low-frequency grain → the glass reads as a quiet frosted plate over texture (the "regular" not "clear" register). The contrast/legibility-EASY case. | dense-content / data pages | the glass *frosts* — a calm textured ground, max legibility |
| **Grid** (CSS ruled lines — W60 net-new) | **Geometric blur + alignment.** Hard ruled lines behind glass → like constellation but ORTHOGONAL: the blur softens a regular grid into a moiré-free wash directly behind the card, and the card's squircle corner reads against the straight rules. | blueprint / technical / token pages | the glass *softens structure* — a precise grid goes diffuse behind it |

This matrix is the design rationale W60's "each hero a unique one" should encode — and it is NOT in the W60
spec (W60 fold 5 says "aurora for brand, constellation for system, fourier for math" but does not say WHY each
demonstrates a distinct glass property). **Hardening action: fold this demonstration-matrix rationale into
W60's hero-assignment ratify** so the substrate choice is principled, not aesthetic-arbitrary. The matrix also
exposes that **constellation is the single STRONGEST glass demonstrator** (line-smear under blur is the most
unambiguous "the blur is real" proof) yet W57 made ALL FOUR heros Aurora — the weakest single demonstrator for
proving blur (soft color fields smear invisibly). The user's "each unique" instinct is correct and
underexploited.

---

## 2. The red-team — three falsifiable challenges that found a real weakness

### CHALLENGE 1 (BROKEN seam): the four substrates are FOUR DIVERGENT APIs — `<StoryHero :background>` is an inline fork in disguise

W60 writes the descriptor as `background?: "paper" | "grid" | "aurora" | "constellation" | "fourier"` resolved
through ONE `<StoryHero>` renderer (W60 §scope fold 1-2, the "ONE background path, no inline fork" gestalt). But
the four live components share **almost no prop surface** — source-confirmed at HEAD:

| Axis | Aurora | Constellation | Fourier-field | Paper |
|------|--------|---------------|---------------|-------|
| **substrate** | WebGL2 (`useAurora`) | Canvas2D (`useCanvas2D`) | Canvas2D (`useCanvas2D`) | none (CSS div) |
| **color seam** | `config.palette: OklchStop[]` | `--constellation-*` CSS tokens | `color: string` + REQUIRED `colorResolver` | `--glass-grain` token |
| **loudness knob** | `opacityCeiling?: number` [0,1] | `--constellation-alpha` (CSS, not a prop) | **NONE at HEAD** (W43 mints `intensity`) | `opacity?: number\|string` |
| **uniqueness key** | NONE (palette is the only variance) | `seed?: number\|string` | `seed?: string` | NONE |
| **variant axis** | `renderMode`, `config` | `count/link/speed` | `variant: "hero"\|"final"` | `frequency: "clean"\|"aged"` |

`grep`-confirmed: `FourierField.vue` has **zero** `intensity`/`opacityCeiling` knob at HEAD (the W43 `intensity`
prop is a SPEC deliverable, NOT landed); Aurora has **zero** `seed` (its only per-instance variance is the
palette); paper + aurora have no seed so "each hero unique via `:seed`" is impossible for two of the five
substrates.

So the `<StoryHero>` "ONE renderer" is forced to be:
```vue
<Aurora v-if="kind==='aurora'" :config="resolvePalette(palette)" :opacity-ceiling="intensity" />
<Constellation v-else-if="kind==='constellation'" :seed="seed" :style="{'--constellation-alpha': intensity}" />
<FourierField v-else-if="kind==='fourier'" :color="color" :color-resolver="r" :seed="seed" /> <!-- no intensity knob! -->
<div v-else-if="kind==='grid'" class="story-bg-grid" />
<PaperBackdrop v-else :opacity="intensity" />
```
That `v-if` chain IS the inline fork — it hand-translates the generic `{kind, color, intensity, seed}` into five
private dialects, with `intensity` silently dropping on fourier (no knob) and `seed` silently dropping on aurora
+ paper (no seam). **The W60 gate (`proof:page-container`) asserts "no inline-Aurora fork survives" but a
`v-if`-per-substrate adapter inside `<StoryHero>` PASSES that gate while BEING the fork** — the gate checks the
wrong thing. This is a born-broken seam: the descriptor promises uniformity the components cannot honor.

**Falsifiable:** `grep -L "intensity\|opacityCeiling" src/components/custom/fourier-field/FourierField.vue`
returns the file (no loudness knob); `grep -c seed src/components/custom/aurora/Aurora.vue` = 0 (no uniqueness
key). The descriptor's `intensity` + `seed` axes are unsatisfiable on a subset of substrates.

### CHALLENGE 2 (WEAK uniqueness): "each hero unique" is real for ONLY constellation + fourier; aurora-heros differ only by palette

The user's directive is *"each hero a UNIQUE one"* and the W43 research leans hard on `seed` as "the uniqueness
key — ONE component → N unique fields" (W43 §6.2). That is true for **constellation** (`seed` → fresh field)
and **fourier** (`seed` → fresh elliptic spectrum). But:
- **Aurora has no `seed`.** Two Aurora heros with the same palette are IDENTICAL drifts. The only Aurora
  variance is `config.palette` / `config.nuclei` — a hand-authored config, not a one-line seed. So "each Aurora
  hero unique" requires hand-authoring a distinct palette per hero (the `aurora-hero.ts` `HERO_PALETTES` map —
  3 palettes for 4 heros, intro + hero SHARE `rose-indigo-amber`). **Two W57 heros are NOT unique today.**
- **Paper + grid have no per-instance variance at all** — every paper hero is the same grain, every grid hero
  the same rules. Uniqueness for those is purely the palette/token tint.

So the uniqueness story is THREE different mechanisms (seed for 2, palette-config for 1, token-tint for 2),
and the W43/W60 "seed is THE uniqueness key" framing over-generalizes from the two Canvas2D substrates to a
five-substrate set where it holds for two. **Falsifiable:** `aurora-hero.ts` `HERO_PALETTES` has 3 keys; the
four heros map intro+hero both → `"rose-indigo-amber"` (intro.vue:11, and hero.vue per W57). Two heros share a
background; the "each unique" gate (W60 HardGate "each HERO declares a UNIQUE substrate") only checks substrate
KIND distinctness, not within-kind uniqueness — two Aurora heros with the same palette pass.

### CHALLENGE 3 (WEAK / cohesion): the glass-card-over-background recipe is NOT proven to hold the W55 legibility floor — and W60 does not wire W55 per-hero

W60 fold 5 (the glassy hero) + the W55 cross-ref say "the hero card reads glass-first because W54 flipped the
default" and "W55 carries the legibility." But the recipe has a SEQUENCING + WIRING gap the live audit will hit:
- W60's `<StoryHero>` glass card over a BRIGHT aurora is the exact W55 G2 case (content-on-glass over a
  light/busy backdrop). For the card content to clear 4.5:1, **the hero's glass-card ancestor must set
  `--glass-backdrop: light`** (W55 fold) — but W60's `<StoryHero>` spec does NOT wire this. W60 says it
  "consumes" W55 but the per-page bucket wiring is described as "the page-redesign waves' consumption, not W55's
  edit" (W55 §CONVERGE) AND "W55 is a cross-ref, not a W60 obligation" (W60 §CONVERGE) — **so neither wave
  owns wiring `--glass-backdrop: light` onto the hero card over a bright substrate.** It falls in the gap
  between the two specs. The live audit (W60 HardGate "the display title + prose clear AA over the
  opacity-ceiling-clamped substrate") WILL find the title illegible over a bright aurora unless `<StoryHero>`
  sets the bucket — and the spec gives the implementer no instruction to.
- The recessing is ALSO only via `intensity`/`opacityCeiling`, but fourier has no such knob (Challenge 1), so a
  fourier hero card cannot recess its background at all until W43 lands `intensity` — making W60's fourier-hero
  legibility **hard-blocked on W43**, a dependency W60 lists but whose CONSEQUENCE (no recess → no AA floor on a
  fourier hero) is not called out.

**Falsifiable:** `grep "glass-backdrop" docs/tranches/AX/waves/AX.W60-page-redesign-container-layer.md` — W55's
bucket is named only in the CONVERGE cross-ref prose, never in a `<StoryHero>` FileBounds edit or a HardGate
assertion. The legibility floor for the glass-over-bright-background hero is un-owned at the wiring layer.

---

## 3. The chronic class — glass-cohesion divergence recurs at the SUBSTRATE layer

The keyframes I.W6 coordination finding (19 dock/Button specular tracks bloom where Card is clean) is the
glass-cohesion-divergence chronic at the COMPONENT layer. This lane found the SAME class one layer down, at the
**background substrate** layer:

- **The four rich substrates have four divergent API surfaces** (Challenge 1) — the same "N divergent models,
  not ONE" pattern. There is no `BackgroundSubstrate` contract the way there is a `CardTier` axis or a glass
  ladder. Each substrate was minted independently (Aurora AM-band, Constellation AX.W17, FourierField AX.W43,
  Paper foundational) with NO shared props convention.
- **Slip history:** the divergence has existed since each substrate was minted and has NEVER been reconciled.
  W57 (the four-hero Aurora adoption) papered over it by using ONLY Aurora for all four heros (one API, no
  divergence surfaced). W60 is the FIRST wave to demand all five substrates behind one descriptor — so W60 is
  where the un-reconciled divergence finally bites, and W60's spec does not acknowledge it (it assumes the
  uniformity). This is the classic "the cohesion debt was hidden because only one member was ever used; the
  unifying wave inherits the un-paid debt."
- **The loudness-knob naming divergence** is itself a chronic mini-instance: `opacityCeiling` (aurora) vs
  `--constellation-alpha` (constellation, a CSS var not a prop) vs `intensity` (fourier, W43-minted) vs
  `opacity` (paper). Four names for "how loud is this background." The W43 research even NOTES it ("the Aurora
  `opacityCeiling` shape" — W43 §2.3 explicitly models fourier's `intensity` on aurora's `opacityCeiling` but
  does NOT rename either to converge them). A convergence wave that mints `intensity` modeled on
  `opacityCeiling` but keeps both names is the half-converge that leaves the divergence in place.

---

## 4. Gestalt hardening actions — to PERFECT the glass-background composition

### 4.1 (HEADLINE) A net-new micro-wave: the `StoryBackgroundSubstrate` adapter contract, authored BEFORE W60 wires it

Mint a ONE normalized props shape every rich substrate honors — `{ color?, intensity?, seed? }` plus the
substrate-specific config — and an adapter (`resolveBackground(descriptor)`) that is the SINGLE translation
point, so `<StoryHero>` calls ONE component, not a five-way `v-if`. Two viable shapes:
- **(a) demo-side adapter** (`demo/stories/StoryBackgroundSubstrate.vue`) — owns the `v-if`-per-kind ONCE, in
  ONE file, normalizing `intensity`→`opacityCeiling`/`--constellation-alpha`/(fourier `intensity` when W43
  lands)/`opacity`, and `seed`→(constellation/fourier seed; aurora palette-rotation; paper no-op). This keeps
  the fork but CENTRALIZES it (one adapter, gate-checkable) instead of inlining it in `<StoryHero>`. Lower-risk,
  demo-only, ships now.
- **(b) library-side substrate contract** — a `BackgroundSubstrate` props interface the four `src/` components
  adopt (rename `opacityCeiling`→`intensity` clean-break per the no-backwards-compat precept; add `seed` to
  Aurora as a palette-permutation key). Higher-leverage (the divergence is FIXED, not centralized) but a
  library edit touching four components — needs its own wave + the ≥2-consumer bar (W60 + a second consumer).
  This is the GESTALT fix (abolish the divergence) the architectural-approach precept prefers over the (a)
  workaround.

**Recommendation:** ship (a) as a W60 sub-fold NOW (un-blocks W60's "ONE path" gate honestly), and MINT (b) as
a net-new convergence wave (`StoryBackgroundSubstrate-unify`) for the library substrate-API reconciliation —
the real gestalt. Without (a), W60's "no inline fork" gate is a false-green (Challenge 1).

### 4.2 Amend W60's `proof:page-container`: assert the adapter, not just "no inline `<Aurora>`"

The gate must RED on a five-way `v-if`-per-substrate inside `<StoryHero>` (the relocated fork), not just on a
surviving inline `<Aurora>` in a hero SFC. Assert `<StoryHero>` delegates to the ONE `resolveBackground` /
`<StoryBackgroundSubstrate>` adapter. Otherwise the gate passes the exact fork it claims to forbid.

### 4.3 Amend W60 `<StoryHero>` FileBounds: WIRE `--glass-backdrop: light` on the hero card over a bright substrate

Close the Challenge-3 ownership gap: `<StoryHero variant="hero">` over a bright background (aurora/grid/bright
palettes) MUST set `--glass-backdrop: light` on the glass-card ancestor so the W55 adaptive-tint engages and
the content clears AA. Make this a `<StoryHero>` obligation (not a per-page hand-wire) keyed off a
`background.luminance: "light"|"dark"` descriptor field. Add the AA-readback to the W60 live audit per hero.

### 4.4 Fold the demonstration-matrix (§1.3) into W60's hero-assignment ratify + REBALANCE the substrate roster

Record WHY each substrate demonstrates a distinct glass property (refraction/blur-smear/specular-catch/frost/
structure-soften), and REBALANCE off the all-Aurora W57 default: constellation is the strongest single
blur-demonstrator (line-smear under `backdrop-filter` is the most unambiguous "the blur is real" proof) and is
currently unused as a hero — assign it to a structural hero. Aurora alone (soft color fields) is the WEAKEST
proof that the blur is real (a flat tint smears the same). The demonstration matrix is the principled
hero→substrate map.

### 4.5 Resolve the uniqueness divergence (Challenge 2): give Aurora a `seed` / palette-permutation, or accept palette-as-uniqueness EXPLICITLY

Either (a) add a `seed` to Aurora that permutes the nuclei/warp phase for a unique drift per hero (the
constellation/fourier parity — the gestalt), or (b) record EXPLICITLY that Aurora uniqueness is palette-only
and ensure the four heros get four DISTINCT palettes (fix the intro+hero shared `rose-indigo-amber`). The W60
"each hero unique" gate must check within-kind uniqueness (distinct seed OR distinct palette), not just distinct
substrate kind. A prototype to run: mount two Aurora heros same-palette side by side and confirm they read
identical (the falsifiable proof the seed gap matters).

### 4.6 Prototype: the glass-card-over-each-substrate legibility sweep (the live DELTA the cardinal lesson demands)

Before W60 closes, run the ONE prototype that de-risks the whole recipe: a glass card (the W54 default, W56
squircle) over EACH of the five substrates at hero loudness, light + dark, ≥2 viewports, with the W55 bucket
ON — capture the AA-readback per substrate. This is the "complete only on a live real-device DELTA" gate for
the composition recipe itself, and it will surface (a) which substrate+palette combos blow the AA floor even
with W55, (b) whether the fourier-no-intensity-knob blocks its hero's recess, (c) whether constellation's
line-smear actually reads as the strong glass demonstration the matrix predicts. No such capture exists at HEAD
(the `audit/visual/` dir is the inventory-flagged gap).

---

## 5. Sources

- glass-ui source read VERBATIM at HEAD: `src/components/custom/aurora/Aurora.vue` (opacityCeiling/config/
  renderMode seam, no seed), `constellation/Constellation.vue` + `constellationField.ts` (seed/--constellation-
  alpha/drawOverlay), `fourier-field/FourierField.vue` (color/colorResolver/seed/variant, NO intensity at HEAD),
  `paper-backdrop/PaperBackdrop.vue` (opacity/frequency), `demo/stories/foundations/intro.vue` (the live
  hero — Aurora behind a NON-glass paper-grain card), `demo/stories/aurora-hero.ts` (3 palettes / 4 heros).
- Wave specs: `AX.W60-page-redesign-container-layer.md` (the consumption recipe red-teamed here),
  `AX.W43-fourier-field-first-class.md` + `W43-fourier-field-SOTA.md` (the intensity model, executed),
  `AX.W54-glass-first-class.md` (the glass-default the card consumes), `AX.W55-adaptive-glass-legibility.md`
  (the legibility floor the recipe leans on), `AX.W57-demo-radial-reauthor.md` (the all-Aurora hero default).
- `USER-DEFECTS-2026-06-08-pass3.md` Q9/P7 (the glassy-hero-over-unique-background directive).
- SOTA register: iOS-26/27 Liquid Glass control-center-over-wallpaper (WWDC25 §219, via R-ios27 in W55),
  NN/g "Liquid Glass Is Cracked" (the busy-backdrop-kills-contrast failure mode), the gradient-canvas-hero +
  frosted-card idiom (Stripe/Linear/awwwards glass-hero teardowns).
