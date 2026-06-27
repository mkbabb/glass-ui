# BG-WS9 — Paper-deep (HandMark + grain/grit apotheosis) — SPEC pass 1

Branch `tranche/BG` · HEAD `deb46b35` (4.2.0-line). Siblings read in place, read-only: pencil-boil `0.4.1`, latex-paper `0.2.1`, sci-report/atlas. Foreign-tree fence ABSOLUTE — edit ONLY glass-ui, never move/park a sibling, never `/tmp`.

---

## GESTALT GOAL

The paper register is currently a desaturated grey speckle that the user condemned verbatim as **"disgusting metallic"** (DIRECTIVE-LEDGER C-FIELD ★★★ REGRESSED · C-GRAY "over-corrected to metallic"). The author's own `paper.css` header tuned `--paper-grain-tooth` to a "PLAINLY VISIBLE letterpress bite" bar — which is exactly the read the user rejected. The HandMark engine is a near-masterpiece but ships three live, externally-evidenced defects (the worst a headless-green/visually-broken aspect-crush), and four parallel feTurbulence textures fragment the "one paper register" goal.

WS9 makes paper a **real, warm, lit aged-paper tooth** — fiber relief lit by ONE key, ink pressed INTO the tooth (the vintage-letterpress reference) — perfects HandMark to genuinely-hand-drawn against the sci-report J/K intent, suffuses ONE paper register across every paper surface, and formalizes the pencil-boil/latex-paper/sci-report cross-repo channel as by-name contracts. The unifying physical truth: **one light source governs glass specular, the under-shadow fill, AND the paper tooth-shadow** (iOS-27 concentricity; the GU-1 `glass-key-fill` ask made the shadow-law spine of the paper register).

The disease cure (C-PAINT) binds every wave: the convergence verdict comes from a FRESH dual-engine (Chrome AND Safari) both-modes capture the building agent did NOT author. A device-free gate that greens while the render is a grey film or a flat-bar underline is the #1 recurring failure (shipped 3×); the binding artifact is the paint, not the gate.

### Scope fences (binding — do not cross)

- **WS9 owns grain CHARACTER, not the backdrop.** WS1 (`BG.W-FIELD-AURORA`) retires `.paper-field` wholesale + demotes the global grain mount to opt-in. WS9 does **NOT** touch `.paper-field` (paper.css:94-284) nor the `[data-paper-field]` AppShell mount — it owns the `--paper-grain-tooth` token + the `.paper-underpaint`/`.paper-grain-overlay` utilities (paper.css:40-92) + the scale-paper.css grain tokens + the HandMark dir + the cross-repo docs. The rebuilt tooth rides whatever backdrop WS1 lands; the token is the same whatever sits behind it. **Sequence WS9 grain after WS1's backdrop decision** so the π capture rides the final backdrop.
- **The glass whisper fence (BD P2 cardinal).** `--glass-grain-opacity` (0.025 light / 0.045 dark) stays BYTE-UNTOUCHED — "paper is loud, glass is a whisper; that separation IS the design." The DRY consolidation unifies the noise TEXTURE source, never the OPACITY; loud/whisper is an opacity rung off ONE source (the AX.W54 `--glass-level` one-source-scalar-rungs precedent).
- **The atlas publish-then-consume contract.** `--paper-aged-texture` is consumed BY NAME by the atlas masthead (`background-clip:text`, recipes.css). It CANNOT be renamed or silently pruned — it stays a real published token, re-authored onto the warm-lit source (the atlas gets a free upgrade, fallback-first on its next bump). `--paper-clean-texture` is internal-only → clean-break DELETE.
- **The three-underline-register fence (proof:handmark W6).** `.paper-ink-mark` (structural 2px hairline) stays STRAIGHT — never wobbled/perturbed. HandMark wobbles. One pencil-boil engine under every wobble; zero wobble under the structural mark.
- **The [S2] seed reconcile.** The family seeds via the HOUSE `mulberry32`+`hashString` and FEEDS pencil-boil a house-derived integer; it imports ZERO `mulberry32` from pencil-boil. A "deepen pencil-boil" ask is CONTENT-ONLY, never a vendored fork.
- **The deckle is FENCED.** The literal torn-paper absolute-px amplitude param on `naturalUnderlinePoints` is FORBIDDEN by atlas FD1/DL2 §P4 skeuomorphic-restraint — do NOT publish it. Grain-only is the close.

---

## MECHANISM (the idiomatic approach, concrete)

### 1. The warm lit-tooth grain (the headline) — `BG.W-PAPER-GRAIN-REAL`

The metallic read has a single root: `feColorMatrix saturate=0` strips all chroma → a grey-RGB speckle carries no warmth by construction, and the harsh slope-1.8/intercept-(-0.4) contrast-stretch over the warm field reads as a woven metallic wash at 0.22 multiply. A parameter re-tune of the SAME mechanism re-ships the rejected speckle. The fix is a **fundamentally different tooth model**, not a knob turn.

**SOTA: light the noise as a height-map (feDiffuseLighting, verified ABSENT in `src/`).** Replace the flat grey speckle with a matte-lit fiber relief:

```
<filter color-interpolation-filters='sRGB'>
  <feTurbulence type='fractalNoise' baseFrequency='0.012 0.024'  ← anisotropic fiber (laid-line direction)
                numOctaves='4' seed='7' stitchTiles='stitch'/>
  <feDiffuseLighting surfaceScale='1.6' diffuseConstant='1'
                     lighting-color='oklch(0.97 0.022 78)'>       ← WARM ECRU, never white (white = the metallic read)
    <feDistantLight azimuth='<derived from --glass-key-direction>' elevation='55'/>
  </feDiffuseLighting>
</filter>
```

- **Diffuse, not specular** — specular = plastic/metal/shiny; diffuse = matte paper. The lighting reads the turbulence alpha as a Z height-field → high points catch light, valleys fall to shadow = real surface relief. "Direct color application appears as monotonous grain" (Codrops, the exact defect verbatim).
- **The warm `lighting-color` is the single highest-leverage move.** A warm ecru light is what separates paper from metal/graphite. `saturate=0` is precisely WHY it reads metallic; lighting with chroma restores the aged-stock warmth.
- **One key.** The `azimuth` derives from the SAME `--glass-key-direction` corner the glass lensing + under-shadow obey (mechanism §5) — paper tooth-shadow and glass specular agree. Lower `elevation` (~55→45) steepens the tooth contrast if needed.
- **KEEP** the multiply(light)/screen(dark) blend law (physically true: ink sinks into pits → darken; fiber catches light → lighten), the sRGB pin (cross-engine determinism), and the static+seeded+cached raster (paper does not shimmer). The blend already condemns overlay/soft-light (collapse to identity on the cream/ink poles) — do not regress it.
- **Opacity stays JND-visible AND warm.** Do NOT merely lower 0.22 (re-breaks the author's visibility bar). The directional shadow carries the tooth; tune the alpha to keep it perceptible while the warmth does the character work.

**The letterpress DEBOSS rider.** Ink/marks pressed INTO the tooth: a static inset/text-shadow pair (dark top-left + warm highlight bottom-right) keyed to the SAME `--glass-key-direction` azimuth as the grain. PRM-safe (static, zero animation). Composes with the masthead grain-clip (mechanism §2) for the full letterpress lockup.

**Cross-engine fallback.** feTurbulence PRNG is engine-unspecified (the `paper.css` "identical Chrome↔Safari" claim is unverified + load-bearing). P1/P2 prototypes diff Chrome vs Safari. The acceptance is statistical ("reads as warm lit tooth" — luminance variance + directional highlight/shadow + a warm hue), not pixel-identity. If P1 shows the lit relief diverges UNACCEPTABLY cross-engine, the booked fallback is a committed warm raster paper asset (a real scanned/generated tooth tile) — same token, same blend, engine-stable by construction. The spec carries lit-tooth as primary, raster-asset as the prototype-gated fallback.

### 2. ONE paper register — `BG.W-PAPER-SUFFUSE`

Four feTurbulence sources collapse to ONE warm-lit-tooth SOURCE with opacity rungs:

| token | disposition |
|---|---|
| `--paper-grain-tooth` (paper.css) | the ONE warm-lit source (re-engineered in §1). The loud paper rung. |
| `--paper-aged-texture` (scale-paper.css:132) | KEPT (atlas contract) — re-authored as a distinct coarser/higher-octave warm-lit aged-stock rung. NOT an alias; a genuinely-distinct frequency. |
| `--paper-clean-texture` (scale-paper.css:131) | clean-break DELETE (internal-only, no cross-repo contract). |
| HandMark `texture.ts` per-mark grain | stays per-instance (the mark's own ink-into-fiber); fed the SHARED field in §4 (graphite-in-tooth). |

Re-point `--paper-clean-texture`'s consumers off the deleted token: `.paper-texture` (cards.css:127) → the warm-lit source at paper opacity; the glass-tier whisper grain (`.glass-material::after`, ladder.css:447) + dock-shell grain (dock/shell.css:255) → the warm-lit source at the BYTE-UNTOUCHED `--glass-grain-opacity` (0.025/0.045). A warm whisper over warm glass beats the present grey-whisper-over-warm dissonance (strictly better; opacity unchanged so the fence holds). The btn.css:101 + tab-button.css:100 references are disco-retired PROSE comments — scrub the dead mention.

**The grain-on-headline textured-ink register (the J-PAPER suffuse target).** A SCOPED `background-clip:text` utility that clips the warm-lit tooth into display letterforms (grain WEARS the type) — **headline-only, NEVER prose** (the J-PATH:236 role-separation). `@supports`-fenced with a solid-ink fallback (the atlas J-HANDMARK §6 fence — never a hollow glyph). This is the register the atlas hand-rolls as `masthead-headline-grain`; shipping it lets the atlas consume-and-delete its fork.

**latex-paper editorial idiom (corrected premise).** `/theme` (`src/vue/theme.css`) is editorial DOCUMENT typography (theorem/math/section left-rails, paper-quote) — ZERO grain, and uses the FORBIDDEN `hsl(var(--token))` double-wrap. The SEED's "/theme is a grain source" is WRONG; the grain stays glass-ui's. The adopt is the STRUCTURAL idiom (left-rail accent rails for paper-flavored content — the math-paper register), re-expressed via `@theme`/`@utility`, NEVER pasted raw (Tailwind-first). No token conflict.

### 3. HandMark perfected — `BG.W-HANDMARK-PERFECT`

The genuine residuals (confirmed at HEAD), each a real-paint defect a device-free gate misses:

- **(a) The aspect-crush — #1 evidenced atlas ask (J-GLASS-ROOT).** `viewBox="0 0 100 40"` (aspect 2.5) + `preserveAspectRatio="none"` (HandMark.vue:240, constants.ts:9-11) → a short word renders at px-aspect 11-17 (atlas LIVE-MEASURED 16.83), CRUSHING the vertical wobble to a flat bar. A gate reading the path `d` PASSES while the render is a ruler — the exact headless-green trap. **Fix:** emit a MEASURED non-square viewBox (height derived from the measured `.hm` box px-aspect) OR a measured-box projection, preserving the `baselineFrac`/draw-on/clip-wipe seams. **Constraint:** box-mode circle/box/bracket DEPEND on `preserveAspectRatio="none"` to stretch to the datum rect — the text-mode fix must NOT touch the positioned-box path (P2 proves both).
- **(b) The hull `se` empty-fragment guard.** `freehand.ts` `getSvgPathFromStroke` returns `""` when `stroke.length < 4` → a degenerate `ribbon:'hull'` mark (short word) emits `<path d="">` → renders nothing. boil/marker/crayon/highlighter ALL use hull. **Fix:** an `outline.length` guard in `ink.ts` (a non-degenerate fallback path), so a hull mark never silently vanishes (P3 proves non-empty 1ch→40ch).
- **(c) The `amplitude` knob.** `NOISE_AMP_FRAC=0.05` is a frozen const; the atlas booked a published `amplitude` (wobble÷stroke 0.23→≥0.6, font-proportional) and was told it shipped — it is ABSENT. **Cleanest cut:** REPURPOSE the existing `wobble` Brush scalar (brush.ts:69) to drive the centerline amplitude (`amp = span * NOISE_AMP_FRAC * f(wobble)`), decoupling excursion from `weight` — no 13th scalar. Expose it through `HandMarkProps`/the brush so a thin pen carries a confident waver without fattening. Additive, fallback-first (default byte-identical).
- **(d) The draw-easing token + IO threshold.** HandMark.vue:87 hardcodes `cubic-bezier(.16,1,.3,1)` → `var(--ease-out-expo)` (token exists at bridges.css:356, byte-identical — token-first close). HandMark.vue:197 IO `threshold:0.35` → near-0 any-intersect (a thin 1px underline on a tall viewport may never cross 35% → draw-on never fires → invisible mark).
- **(e) The phantom gate.** `proof:handmark-audit` is CITED (proof-handmark.mjs:197 + gates.mjs:1396) as the binding spacing-CV/non-periodicity discriminator but the FILE DOES NOT EXIST. MINT it (the φ-incommensurate spacing-CV ≥0.30 floor over 400 seeds — the real boil-quality witness) so the boil non-periodicity claim stops being unguarded.
- **(f) CLAUDE.md canon reconcile.** Line 584 describes the stale `NATURAL_AMP_FRAC`/`PERIODS_MIN..MAX` mechanism; the impl is `NOISE_AMP_FRAC`/φ-incommensurate octaves. Reconcile in the same wave (proof:handmark greps CLAUDE.md — keep them honest).

The boil morphology rework (φ-incommensurate value-noise, spacing-CV ~0.41) ALREADY landed on tranche/BG (geometry.ts:93-155) — do NOT re-architect it; VERIFY live both modes and retune amplitude/pressure only if a fresh capture still reads mechanical.

### 4. Pencil/boil deepened — `BG.W-PENCIL-BOIL-DEEPEN`

- **Graphite-in-tooth (the DRY + physically-true win).** A pencil/crayon stroke's grain mask samples the SAME shared warm-lit paper-tooth field the page uses (texture.ts already does `feComposite operator="in"` punching paper-through holes — re-point its noise to the ONE suffused field) so graphite physically catches in the page's tooth. The "ONE paper register suffused" headline made physical.
- **The pencil pressure profile engages.** The curvature-coupled `addPressure` (ink.ts:102, presses harder on straights, lighter through wobble) exists but pencil is `ribbon:'stroke'` so it never drives a variable-width body. Route a pencil-tooth pressure profile so a pencil reads as graphite-on-tooth and a crayon as wax-in-pits (depth/relief from the lit field, not the flat threshold).
- **Boil LIVE + offscreen-park.** The demo home story (motion/handmark.vue) animates 1/7 sections today. Make boil LIVE on a calm PRM-gated loop, and wire an IntersectionObserver/content-visibility offscreen-park for boil (HandMark.vue has IO only for the draw-on trigger; a continuous-boil mark scrolled offscreen keeps re-perturbing every shared-rAF tick). PRM-gated (the mark BREATHES, the grain stays static); the `BOIL_BUDGET=1`-per-route ceiling holds.
- **Liquid-weight (universal law).** Draw-on rides `--ease-out-expo` (decelerating arrival = weight); boil rides the PRM-honoring useLineBoil cadence. Never linear.

### 5. The ONE key-light spine + cross-repo asks — `BG.W-PAPER-CROSSREPO-ASKS`

**Land GU-1 as the shadow-law spine of the paper register.** Mint `--glass-key-direction: -0.375` (= tan 20.56° down-left) in the glass-fx.css keystone, derive the three under-shadow X offsets (glass-fx.css:430-432, today X=0) via `calc(Y * var(--glass-key-direction))`, re-point the dock-wrap cast (overflow.css:143). Then the §1 feDiffuseLighting azimuth + the §1 deboss direction derive from the SAME token — ONE key unifies cel-cast (45° KEY) + under-shadow (20.56° FILL) + paper tooth-shadow. This realizes the atlas's "glass + paper share ONE umber cast" ask and the warm-umber under-shadow already recorded at HEAD (commit fc61c3e7). Frame as single-source-of-light truth (NOT Material key+ambient — Material centers ambient). Re-approve the 7 under-shadow baselines (sub-pixel, human-imperceptible).

**The asks-and-consumes ledger** (`docs/tranches/BG/coordination/asks-and-consumes.md`, the BB/BC precedent shape — content-only, foreign-tree fence):

- **INBOUND (honor):** GU-1 (SATISFIED above). The aspect/amplitude/hull asks (J-GLASS-ROOT — SATISFIED by §3). The deckle px-amplitude param (FENCED — gated on a signed skeuomorphic-restraint exception; NOT published).
- **OUTBOUND to pencil-boil@0.4.1 (by-name, glass-ui-local interim + CONSUME marker, never a sibling edit):** (a) host the φ-incommensurate fractal value-noise wobble as a shared `amplitude`-bearing primitive (glass-ui RE-INVENTED it in `naturalUnderlinePoints`); (b) a scheduler offscreen-park/visibility gate on `useLineBoil`; (c) a pressure/variable-width body so glass-ui consume-and-deletes the vendored `freehand.ts` (379L) AND the dead `perfect-freehand` peer; (d) confirm the booked `snap` option. PRESERVE [S2] (house mulberry32 feeds pencil-boil, zero pencil-boil-mulberry32 import).
- **OUTBOUND to latex-paper@0.2.1:** document the seam — `/theme` owns STRUCTURAL editorial typography, glass-ui owns paper TEXTURE; no grain ask. The ask (if any) is a complete-`hsl()` token contract so the editorial register paints against glass-ui's tokens.
- **TO sci-report/atlas:** the consume contract — the atlas folds its local `HandUnderline.vue`/`useHandMarkClock.ts` hand-rolls (scroll-scrub, dark-lift, masthead-headline-grain) onto the shipped `<HandMark>` + the §2 grain-clip utility once §3 lands (the DEC-8 fold, fallback-first per H-ROOT-1).

**Dead-dep cleanup (no-legacy).** Drop `perfect-freehand ^1.2.3` from package.json `peerDependencies` + `peerDependenciesMeta` (NEVER imported; vendored `freehand.ts` is the truth). Re-text the index.ts/README/CLAUDE.md profile:budget note that still call it a live optional peer.

**The gate.** `proof:crossrepo-asks-paper` (the existing `proof:crossrepo-asks` is BB-scoped — value.js/kf/speedtest). Reuse the W4 foreign-tree-fence-by-construction pattern: WAVE_BOUNDS touch ZERO sibling path; a `../pencil-boil/…` escape REDs. Freshness header with the three sibling HEAD versions (pencil-boil 0.4.1, latex-paper 0.2.1, sci-report/atlas). Every ask names a CONSUMER wave that exists + a terminal disposition (the no-silent-drop law).

---

## FILES TOUCHED

**Grain (§1, §2):**
- `src/styles/paper.css` — re-engineer `--paper-grain-tooth` to the warm feDiffuseLighting lit tooth + the deboss register; the `.paper-underpaint`/`.paper-grain-overlay` utilities unchanged in shape. (Do NOT touch `.paper-field` 94-284 — WS1.)
- `src/styles/tokens/scale-paper.css` — DELETE `--paper-clean-texture` (131); re-author `--paper-aged-texture` (132) as a distinct warm-lit aged rung.
- `src/styles/cards.css:127`, `src/styles/glass/ladder.css:447`, `src/styles/dock/shell.css:255` — re-point off `--paper-clean-texture` onto the warm-lit source (glass/dock at the byte-untouched `--glass-grain-opacity`).
- `src/styles/utilities/btn.css:101`, `src/styles/dock-controls/tab-button.css:100` — scrub the dead disco-prose `--paper-clean-texture` mentions.
- `src/components/custom/paper-backdrop/PaperBackdrop.vue:50` — `--paper-aged-texture` consume unchanged (token re-authored under it); consider retiring the `frequency` prop (clean/aged collapses to a tile/opacity delta).
- A new `@utility`/`@supports` block for the grain-on-headline textured-ink register (paper.css or a new `paper-headline.css`).

**HandMark (§3, §4):**
- `src/components/custom/handmark/HandMark.vue` — measured viewBox (a), draw-easing token + IO threshold (d).
- `src/components/custom/handmark/constants.ts` — viewBox derivation hooks; amplitude wiring.
- `src/components/custom/handmark/geometry.ts` — amplitude through `naturalUnderlinePoints`; the box-mode path untouched.
- `src/components/custom/handmark/ink.ts` — the hull `se` empty-fragment guard (b); the pencil pressure profile (§4).
- `src/components/custom/handmark/brush.ts` / `types.ts` — repurpose `wobble` for amplitude; publish the prop.
- `src/components/custom/handmark/texture.ts` — graphite-in-tooth re-point onto the shared field (§4).
- `src/components/custom/handmark/composables/useHandMark.ts` — boil offscreen-park (§4).

**Key-light spine + cross-repo (§5):**
- `src/styles/tokens/glass-fx.css` — mint `--glass-key-direction`; derive the 3 under-shadow X.
- `src/styles/dock/overflow.css:143` — re-point the dock-wrap cast.
- `package.json` — drop the `perfect-freehand` peer + meta.
- `docs/tranches/BG/coordination/asks-and-consumes.md` — NEW (the relay ledger).
- `docs/tranches/BG/coordination/GU-1-glass-key-fill.md` — mark SATISFIED.

**Gates:**
- `scripts/proof-paper-grain.mjs` — NEW (the warm-lit-source + blend-law + no-`--paper-clean-texture`-survivor + warm-hue witness, born-RED on the speckle).
- `scripts/proof-handmark-audit.mjs` — NEW (the phantom spacing-CV gate the codebase already cites).
- `scripts/proof-crossrepo-asks-paper.mjs` — NEW (the paper relay, foreign-tree fence).
- `scripts/proof-handmark.mjs` / `proof-glass-cohesion.mjs` / `proof-glass-cal.mjs` / `proof-paper-grid.mjs` — re-point the `--paper-clean-texture` references (cohesion:561 + fixtures 579/581) to the surviving source; follow the rename.
- `scripts/gates.mjs` — register the new gates.

**π specs (tests-visual/):**
- `tests-visual/paper-grain.spec.ts` — NEW (warm-hue + directional-relief readback, both modes).
- `tests-visual/handmark.spec.ts` — EXTEND (aspect-correct px-aspect ≈ vb-aspect, hull non-empty, amplitude).

**CLAUDE.md** — reconcile the stale handmark canon (line 584); the grain re-engineer note; the cross-repo relay note.

**Demo:**
- `demo/stories/motion/handmark.vue` — re-stage the 7 opaque slabs as glass/veil cards (tier="field") over a contained warm paper field; boil LIVE; the brush continuum as a switcher (the binding real-paint surface).
- `demo/stories/foundations/paper-texture.vue`, `paper-glass.vue`, `compositions/math-paper.vue` — the suffusion specimens.

---

## WAVE BREAKDOWN

| wave | scope | gate(s) | π bar |
|---|---|---|---|
| **BG.W-PAPER-GRAIN-REAL** | warm feDiffuseLighting lit tooth replacing the grey speckle; the letterpress deboss rider; azimuth from `--glass-key-direction` | `proof:paper-grain` (born-RED on the speckle) | warm-hue + directional-relief, both modes, Chrome+Safari |
| **BG.W-PAPER-SUFFUSE** | ONE warm-lit source; DELETE `--paper-clean-texture` + re-point; KEEP `--paper-aged-texture` (atlas contract); grain-on-headline textured-ink; latex-paper editorial idiom; glass-opacity fence | `proof:paper-grain` (suffuse arm) + `proof:suffuse` extend | ONE register across ~12 surfaces; glass whisper still a whisper |
| **BG.W-HANDMARK-PERFECT** | aspect-correct viewBox; hull se-guard; amplitude knob; draw-easing token; IO threshold; mint `proof:handmark-audit`; canon reconcile | `proof:handmark` + `proof:handmark-audit` (NEW) | px-aspect ≈ vb-aspect; hull non-empty 1ch→40ch; box-mode intact; marks read hand-made |
| **BG.W-PENCIL-BOIL-DEEPEN** | graphite-in-tooth (shared field); pencil pressure profile; boil LIVE + offscreen-park; demo re-stage | `proof:handmark` (boil-park arm) | pencil reads graphite-on-tooth; boil breathes; PRM static |
| **BG.W-PAPER-CROSSREPO-ASKS** | land GU-1 key spine; the 3 by-name contracts; drop dead perfect-freehand peer; `proof:crossrepo-asks-paper` + freshness header | `proof:crossrepo-asks-paper` (NEW) | foreign-tree fence by construction; every ask names a consumer wave |

Sequence: GRAIN-REAL → SUFFUSE (consumes the source) → HANDMARK-PERFECT (independent) → PENCIL-BOIL-DEEPEN (consumes the shared field + the engine fixes) → CROSSREPO-ASKS (the key spine + the relay close). CROSSREPO-ASKS's GU-1 token can land FIRST if GRAIN-REAL's azimuth needs it (the token is value-only/additive).

---

## ACCEPTANCE / REAL-PAINT-π BAR (C-PAINT binding)

The binding artifact for EVERY wave is a FRESH dual-engine (Chrome AND Safari) both-modes capture the building agent did NOT author — NOT a getComputedStyle gate (the trap that shipped 3×). Stand up the demo at `:5199`, drive Chrome + Safari over motion/handmark.vue + a paper-grain route + math-paper, both modes, DPR 1/2/3.

1. **Grain reads as warm LIT tooth, not metallic speckle.** A captured grain swatch over warm cream AND over a flat card resolves a WARM hue (not grey/metallic), JND-visible, with directional highlight/shadow relief (luminance variance, NOT a flat grey ΔL film). A naive viewer distinguishes it from the rejected grey speckle. Deterministic-enough Chrome↔Safari (sRGB-pinned; statistical-character parity, not pixel-identity).
2. **HandMark reads genuinely hand-drawn.** The text-mode underline renders at px-aspect ≈ vb-aspect across short AND long words (the wobble survives, not crushed to a flat bar). A `ribbon:'hull'` mark renders a non-empty thin-thick-thin band 1ch→40ch. The boil reads hump-to-hump-irregular (spacing-CV ≥0.30). The amplitude knob lifts wobble÷stroke to ≥0.6. Box-mode circle/box/bracket still stretch to the datum rect.
3. **ONE paper register suffused.** Every paper surface inherits the ONE warm-lit source; the glass whisper stays a whisper (opacity byte-untouched). The grain-on-headline clips the tooth into display type (headline-only) with a solid-ink `@supports` fallback.
4. **One key coherent.** The cel-cast, under-shadow fill, and paper tooth-shadow all lean the same hemisphere (`--glass-key-direction`).
5. **PRM-safe + cross-engine.** Grain static under reduce; boil/draw-on collapse to the finished frame; no `:global(.dark)` in scoped SFCs; every 0-alpha gradient stop an explicit `oklch(L C H / 0)`; multiply/screen blend only; no `backdrop-filter:url()`.
6. **The disease has a witness.** `proof:paper-grain` is born-RED on HEAD's grey speckle and GREEN on the lit tooth (the metallic defect finally falsifiable); `proof:handmark-audit` exists (the cited phantom). Device-free gates are necessary-not-sufficient; the live π is the gate.

---

## FOLDED / DEFERRED ITEMS

- **`BG.W-PENCIL-BOIL-DEEPEN` kept as a lean wave** (not folded) — graphite-in-tooth + pressure + boil-live is a substantive distinct mechanism, but the OUTBOUND pencil-boil asks live in CROSSREPO-ASKS (no duplication).
- **The deckle (torn-paper px-amplitude param)** — FENCED, not published (atlas FD1/DL2 §P4 skeuomorphic-restraint; grain-only is the close). Recorded in the relay as a gated ask.
- **Anisotropic crayon grain (`grainFreqY`/`grainAniso`, a 13th Brush scalar)** — deferred root-signable (J-HANDMARK §2); carried fallback-first, NOT added.
- **The committed raster paper-asset fallback** — booked behind P1 (engaged only if the lit tooth diverges unacceptably cross-engine).
- **The `appear="scroll"` view-timeline draw-scrub + theme-reactive dark-lift `color`** (sci-report consumer hand-rolls) — booked to the relay as a future fold; not blocking (the §3 amplitude/aspect/hull asks are the close).
- **GU-1's DEFERRED tier** (the `--shadow-sm…2xl` paper family + SortableList drag-lift) — stays the chartered follow-on per the GU-1 holdout ledger.
- **`perfect-freehand` consume-and-delete of `freehand.ts`** — booked to the pencil-boil pressure-primitive ask landing (the peer drop ships now; the vendored body retires when pencil-boil publishes the primitive).

---

## OPEN RISKS

1. **Cross-engine determinism of the lit tooth (the load-bearing falsifier).** feTurbulence PRNG is engine-unspecified; the `paper.css` "identical Chrome↔Safari" claim is unverified. P1/P2 MUST diff Chrome vs Safari. Mitigation: statistical-character acceptance (not pixel-identity) + the booked raster-asset fallback. If feDiffuseLighting itself diverges in surface relief (not just noise pattern), escalate to the raster asset.
2. **The metallic-rejection recurrence.** The mechanism BG re-opens was JUST user-rejected. A parameter re-tune re-ships it. The spec mandates the DIFFERENT model (lit relief + warm light) + a born-RED witness + a naive-viewer paint judgement — but the ultimate falsifier is the user's eye on a fresh capture. If the warm lit tooth STILL reads metallic to the user, escalate to the raster asset (a real scanned tooth cannot read metallic).
3. **The aspect-correct viewBox must not break box-mode.** The text-mode fix and the positioned-box (`preserveAspectRatio="none"`) path share `shapeGeom` — P2 proves circle/box/bracket still stretch to the datum rect.
4. **The font-proportional amplitude fold is wide-blast.** Repurposing `wobble` for centerline amplitude changes every existing HandMark render (slides masthead, demo). Keep it additive/fallback-first (default byte-identical) or byte-verify against existing consumers.
5. **The glass-whisper consolidation touches glass files** (ladder.css/dock/shell.css). The opacity fence is the hard invariant; coordinate the texture re-point with WS3/WS8 so it does not regress glass identity (warm whisper at the same 0.025 is strictly better, but verify on a glass route).
6. **No live server at synthesis time** (`:5199` down). WS9 cannot close on source-green; the verification rig (demo + Chrome + Safari) is a close PRECONDITION, and the binding artifact is the dual-engine capture-pair. The spec says so explicitly — or it ships broken a 4th time.
