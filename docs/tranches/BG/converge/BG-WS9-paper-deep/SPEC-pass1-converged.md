# BG-WS9 — Paper-deep (HandMark + grain/grit apotheosis) — SPEC pass 1 CONVERGED

Branch `tranche/BG` · HEAD `deb46b35` (4.2.0-line). Siblings read in place, read-only (VERIFIED present + readable): pencil-boil `0.4.1`, latex-paper `0.2.1`, sci-report/atlas. Foreign-tree fence ABSOLUTE — edit ONLY glass-ui, never move/park a sibling, never `/tmp`.

**Convergence status: 64% (PASS 1). Strong plan, paint UNPROVEN.** Every prototype built (direction validated); every critique returned `refine`; every mustFix is FOLDED below. The binding C-PAINT bar — a FRESH dual-engine (Chrome AND Safari) both-modes capture the building agent did NOT author — is UNMET at synthesis (no `:5199`, no committed diffs). Three calibration risks remain open against a real render (the fine-tooth `baseFrequency` band, the `surfaceScale` brushed-metal read, the Safari `lighting-color` colorspace). The born-RED→GREEN claim is currently UNVERIFIABLE (the gate scripts + the §1/§2 edits are ABSENT from the working tree). This spec is converged enough to DEVELOP; it is NOT converged enough to CLOSE — the next pass is the build + the calibrated capture.

---

## GESTALT GOAL (unchanged — re-affirmed)

The paper register is a desaturated grey speckle the user condemned verbatim as **"disgusting metallic"** (DIRECTIVE-LEDGER C-FIELD ★★★ REGRESSED · C-GRAY "over-corrected to metallic"). The metallic root is a single line — VERIFIED at `paper.css:44`: `feColorMatrix type='saturate' values='0'` over `feTurbulence baseFrequency='0.04 0.09'` + a slope-1.8/intercept-(-0.4) contrast-stretch at 0.22 multiply. A grey-RGB speckle carries no warmth by construction; a parameter re-tune of the SAME mechanism re-ships the rejected read.

WS9 makes paper a **real, warm, lit aged-paper tooth** — fiber relief lit by ONE key, ink pressed INTO the tooth (the vintage-letterpress reference) — perfects HandMark to genuinely-hand-drawn against the sci-report J/K intent, suffuses ONE paper register, and formalizes the pencil-boil/latex-paper/sci-report channel as by-name contracts. The unifying physical truth: **one light source governs glass specular, the under-shadow fill, AND the paper tooth-shadow** (iOS-27 concentricity; GU-1 `glass-key-fill`).

**The disease cure (C-PAINT) binds every wave.** A device-free gate that greens while the render is a grey film or a flat-bar underline is the #1 recurring failure (shipped 3×). Every device-free gate in this spec is explicitly NECESSARY-NOT-SUFFICIENT; the binding artifact is the FRESH dual-engine paint-pair, calibrated against a real render, never an assertion.

### Scope fences (binding — do not cross)

- **WS9 owns grain CHARACTER, not the backdrop.** WS9 does NOT touch `.paper-field` (paper.css:94-284) nor the `[data-paper-field]` AppShell mount (WS1's). It owns `--paper-grain-tooth` (paper.css:44) + the `.paper-underpaint`/`.paper-grain-overlay` utilities (paper.css:48-92) + the scale-paper.css grain tokens + the HandMark dir + the cross-repo docs. **Sequence WS9 grain AFTER WS1's backdrop decision** so the π rides the final backdrop.
- **The glass whisper fence (BD P2 cardinal).** `--glass-grain-opacity` (0.025 light / 0.045 dark) stays BYTE-UNTOUCHED. The DRY consolidation unifies the noise TEXTURE source, never the OPACITY; loud/whisper is an opacity rung off ONE source.
- **The atlas publish-then-consume contract.** `--paper-aged-texture` (scale-paper.css:132) is consumed BY NAME by the atlas masthead (`background-clip:text`). It CANNOT be renamed or pruned — it stays a real published token, re-authored onto the warm-lit source (fallback-first on the atlas next bump). `--paper-clean-texture` (scale-paper.css:131) is internal-only → clean-break DELETE.
- **The three-underline-register fence (proof:handmark W6).** `.paper-ink-mark` (structural 2px hairline) stays STRAIGHT — never wobbled. HandMark wobbles. One pencil-boil engine under every wobble; zero wobble under the structural mark.
- **The [S2] seed reconcile.** The family seeds via the HOUSE `mulberry32`+`hashString` (utils/prng.ts) and FEEDS pencil-boil a house-derived integer; it imports ZERO `mulberry32` from pencil-boil (VERIFIED at ink.ts:18-19). A "deepen pencil-boil" ask is CONTENT-ONLY, never a vendored fork.
- **The deckle is FENCED.** The literal torn-paper absolute-px amplitude param on `naturalUnderlinePoints` is FORBIDDEN by atlas FD1/DL2 §P4 skeuomorphic-restraint — do NOT publish it. Grain-only is the close.

---

## MECHANISM (validated + hardened per critique)

### 1. The warm lit-tooth grain (the headline) — `BG.W-PAPER-GRAIN-REAL`

**Validated direction (P1, build=true, est 82%):** `feColorMatrix saturate=0` IS the metallic root (proven OLD chroma 0). Replacing it with `feDiffuseLighting` + a warm lighting-color restores intrinsic warmth (P1 measured chroma 10.8 / hue 38.8° amber over the lit relief); the 4× zoom is decisive — OLD reads as a flat grey metallic cloud, NEW as warm sepia fiber tooth. This is the right MODEL (light the height-map matte-diffuse), not a knob turn.

**The hardened recipe (folds the 42%-critique mustFix — all SEVEN):**

```
<filter color-interpolation-filters='sRGB'>
  <feTurbulence type='fractalNoise'
                baseFrequency='<FINE fiber-tooth band — see M1>'
                numOctaves='4' seed='7' stitchTiles='stitch'/>
  <feDiffuseLighting surfaceScale='<calibrated — see M5>' diffuseConstant='1'
                     lighting-color='<in-gamut sRGB/hex warm ecru — see M2>'>
    <feDistantLight azimuth='<literal, derived from --glass-key-direction — see M3>'
                    elevation='55'/>
  </feDiffuseLighting>
</filter>
```

- **M1 — FINE fiber tooth, NOT macro blotch (MUSTFIX, folded).** The pass-1 `baseFrequency='0.012 0.024'` is a macro-blotch downgrade (it is LOWER than HEAD's already-too-coarse `0.04 0.09`); `feDiffuseLighting` on coarse noise yields soft hills, not paper tooth. Re-pin into the FINE micro-relief band (high-freq, e.g. the ~`0.07–0.14` anisotropic range with the laid-line direction carried by the X/Y asymmetry), CALIBRATED against a real render — never by assertion. **Tiling constraint:** `stitchTiles='stitch'` auto-snaps the frequency to a seamless period, but the chosen base × the `--paper-grain-tile` (140px) must land near an integer cycle to avoid a residual seam (the pass-1 `0.012×140=1.68` is a seam risk; the build re-pins the tile and/or freq so cycles-per-tile is integer). Adopt P1's build-proven fine value as the starting point, then calibrate.
- **M2 — the warm lighting-color is in-gamut sRGB/hex, NOT oklch (MUSTFIX, folded — the highest unflagged cross-engine risk).** A data-URI `lighting-color` cannot read `var()` AND Safari SVG `lighting-color` `oklch()` support inside a data-URI is UNPROVEN (no `src/` precedent). An un-resolved `oklch()` falls back to white → the metallic read returns IN SAFARI ONLY (a silent one-engine regression). Ship the warm ecru as an in-gamut sRGB hex equivalent of `oklch(0.97 0.022 78)` (a warm-amber near-white, ~`#F8F3E9`-class — the build picks the exact in-gamut hex and the gate asserts it resolves to a warm hue, chroma ≥ the house warm floor 0.020). The warm `lighting-color` is the single highest-leverage move; it MUST survive both engines.
- **M3 — ONE key, azimuth derived + gate-locked (MUSTFIX, folded — the spine-drift falsifier).** The under-shadow leans down-left (`--glass-key-direction: -0.375`, X = Y·(-0.375) → shadow offset LEFT) ⇒ the key light comes from the UPPER-RIGHT. In SVG's Y-down convention the `feDistantLight` direction vector is `(cos az, sin az)` with `+y` = screen-DOWN, so a light from upper-right (`+x`, `−y`, 20.56° off the up-vertical) is `azimuth ≈ 290°` (NOT the pass-1 245°, which lights upper-LEFT and contradicts the under-shadow — the recorded "down-left" comment was wrong). A data-URI cannot read the token, so the azimuth is a HARDCODED literal; the gate carries a clause asserting **the literal azimuth EQUALS the `--glass-key-direction`-derived angle** (`atan2`-of-the-token, documented convention) — without it the one-key spine drifts silently. The π "brighter corner" assertion is fixed to UPPER-RIGHT (the key hemisphere). This is acceptance #4 made machine-real.
- **M4 — surfaceScale calibrated against the brushed-metal read (MUSTFIX, folded).** `surfaceScale` + a single distant key on fine noise can read as a directional brushed-metal band. Lower/calibrate `surfaceScale` (the pass-1 `1.6` is a starting hypothesis, not a proven value) so the relief reads as matte paper tooth, not anisotropic metal sheen — proven in the live π, not asserted. Diffuse (matte) over specular is correct (specular = plastic/metal); the risk is the diffuse-on-coarse-directional combination, which M1 (fine) + M4 (calibrated scale) jointly defeat.
- **M5 — opacity/blend re-derived for the speckle→relief swap (MUSTFIX, folded).** The HEAD `0.22 light / 0.16 dark` alpha was tuned for high-contrast speckle; the lit relief carries its character in the directional highlight/shadow, not the alpha. Re-derive the alpha so the warm TOOTH is JND-visible WITHOUT re-breaking the visibility bar AND without re-reading as a flat film — calibrated in pixels against a real render. **KEEP** the multiply(light)/screen(dark) blend law (ink sinks into pits → darken; fiber catches light → lighten; the law already condemns overlay/soft-light — do not regress), the sRGB pin, and the static+seeded+cached raster (paper does not shimmer).

**The letterpress DEBOSS rider.** Ink/marks pressed INTO the tooth: a static inset/text-shadow pair (dark top-left + warm highlight bottom-right) keyed to the SAME `--glass-key-direction` azimuth as the grain. PRM-safe (static, zero animation). Composes with the masthead grain-clip (§2).

**Cross-engine fallback (the booked escape).** feTurbulence PRNG is engine-unspecified; the `paper.css` "identical Chrome↔Safari" claim is UNVERIFIED + load-bearing. P1/P2 already showed the lit model builds; the OPEN risk is whether `feDiffuseLighting` SURFACE RELIEF (not just noise pattern) diverges cross-engine. The acceptance is STATISTICAL ("reads as warm lit tooth" — luminance variance + directional highlight/shadow + a warm hue), not pixel-identity. If the live dual-engine capture shows the lit relief diverges UNACCEPTABLY, OR the warm tooth STILL reads metallic to the user, escalate to the **committed warm raster paper-asset fallback** (a real scanned/generated tooth tile — same token, same blend, engine-stable by construction; a real scanned tooth cannot read metallic). The spec carries lit-tooth as primary, raster-asset as the prototype-gated fallback.

### 2. ONE paper register — `BG.W-PAPER-SUFFUSE`

**Validated direction (DRY-consolidation proof, build=false, est 80%; critique 55% refine — the cross-repo fence half is ~90% strong, the suffuse arm depends on §1 converging).** Four feTurbulence sources collapse to ONE warm-lit-tooth SOURCE with opacity rungs:

| token | disposition |
|---|---|
| `--paper-grain-tooth` (paper.css:44) | the ONE warm-lit source (re-engineered in §1). The loud paper rung. |
| `--paper-aged-texture` (scale-paper.css:132) | KEPT (atlas LIVE by-name consume — VERIFIED asymmetric vs clean) — re-authored as a distinct coarser/higher-octave warm-lit aged-stock rung. NOT an alias; a genuinely-distinct frequency. |
| `--paper-clean-texture` (scale-paper.css:131) | clean-break DELETE (internal-only, no cross-repo contract — VERIFIED no atlas consume). |
| HandMark `texture.ts` per-mark grain | stays per-instance; fed the SHARED field in §4 (graphite-in-tooth). |

**Re-point the VERIFIED consumer map off the deleted token:**
- LIVE `var()` reads: `.paper-texture` (cards.css:127) → warm-lit source at paper opacity; glass-tier whisper grain (`.glass-material::after`, ladder.css:447) + dock-shell grain (dock/shell.css:255) → warm-lit source at the BYTE-UNTOUCHED `--glass-grain-opacity` (0.025/0.045). A warm whisper over warm glass beats the present grey-whisper-over-warm dissonance (strictly better; opacity unchanged so the fence holds).
- DEAD PROSE mentions to scrub (no `var()`): `utilities/btn.css:101`, `dock-controls/tab-button.css:100` (disco-retired comments), `glass/ladder.css:429` (the engage-decode comment).
- GATE re-points to follow the rename: `proof:glass-cohesion` (lines 553/561/575/579/581 — the grain-always-present clause + the none→image swap fixture), `proof:glass-cal` (lines 292/295 — the disco-grain D3 detector), `proof:paper-grid:5`. These read `--paper-clean-texture` by name; re-point them onto the surviving source so the rename does not de-fang them.

**The grain-on-headline textured-ink register (the J-PAPER suffuse target).** A SCOPED `background-clip:text` utility that clips the warm-lit tooth into display letterforms (grain WEARS the type) — **headline-only, NEVER prose** (J-PATH:236 role-separation). `@supports`-fenced with a solid-ink fallback (J-HANDMARK §6 — never a hollow glyph). This is the register the atlas hand-rolls as `masthead-headline-grain`; shipping it lets the atlas consume-and-delete its fork.

**latex-paper editorial idiom (corrected premise).** `/theme` (`src/vue/theme.css`) is editorial DOCUMENT typography (theorem/math/section left-rails, paper-quote) — ZERO grain, uses the FORBIDDEN `hsl(var(--token))` double-wrap. The grain stays glass-ui's. The adopt is the STRUCTURAL idiom (left-rail accent rails for paper-flavored content — the math-paper register), re-expressed via `@theme`/`@utility`, NEVER pasted raw. No token conflict.

**Sequencing:** SUFFUSE consumes §1's source — it cannot converge until GRAIN-REAL's warm-hue/relief is proven in pixels. The DRY DELETE-clean is safe (zero live `--paper-clean-texture` consumer survives the re-point); the cross-repo fence is the strong half.

### 3. HandMark perfected — `BG.W-HANDMARK-PERFECT`

The residuals (VERIFIED at HEAD), each a real-paint defect a device-free gate misses:

- **(a) The aspect-crush — #1 evidenced atlas ask (J-GLASS-ROOT).** `viewBox="0 0 100 40"` (constants.ts VB_W=100/VB_H=40, aspect 2.5) + `preserveAspectRatio="none"` (HandMark.vue:240) → a short word renders at px-aspect 11-17 (atlas LIVE-MEASURED 16.83), CRUSHING the vertical wobble to a flat bar — the exact headless-green trap (a gate reading the path `d` PASSES while the render is a ruler). **Validated fix (P2, build=true, est 86%; critique 58% refine):** derive `vbH = VB_W / boxAspect` from the measured `.hm` box px-aspect so `preserveAspectRatio="none"` scales the wobble SHAPE uniformly (humps stop being x-stretched flat); thread `vbH` as an optional param (default `VB_H`) preserving box/circle/bracket + positioned-mode byte-for-byte. P2 proved the rendered wobble band-aspect INVARIANT (22.10 for every box) + 44/44 tests + vue-tsc EXIT=0. **Constraint (OPEN RISK #3):** box-mode circle/box/bracket DEPEND on `preserveAspectRatio="none"` to stretch to the datum rect — the text-mode fix must NOT touch the positioned-box path. **REFINE→fold:** the 58% verdict requires the LIVE capture showing the wobble survives short AND long words on a fresh dual-engine pair (the px-aspect ≈ vb-aspect invariant in pixels, not just the numerical render model).
- **(b) The hull `se` empty-fragment guard.** `freehand.ts getSvgPathFromStroke` returns `""` when `stroke.length < 4` → a degenerate `ribbon:'hull'` mark (short word) emits `<path d="">` → renders nothing. boil/marker/crayon/highlighter ALL use hull. **Validated fix (P3, build=true, est 88%; critique 73% refine):** an `outline.length` guard in `ink.ts` (a non-degenerate fallback path) — born-RED witness CONFIRMED (`getStroke` of a 0.5-unit centerline → `outline.length=3` → `""`); post-guard non-empty 1ch→40ch (30-test proof). **REFINE→fold (the three mustFix):**
  1. APPLY the sketch to ink.ts (it is UNMODIFIED at HEAD — VERIFIED working-tree clean); re-run build + the 67-test handmark suite + vue-tsc against the LANDED change, not a transient scratch.
  2. WIRE a REGISTERED born-RED→GREEN witness: `proof:handmark` today only greps the highlighter `ribbon:'hull'` preset string — ZERO guard coverage. Extend `proof:handmark` (or the new `proof:handmark-audit`) with a clause asserting the hull guard yields a NON-EMPTY path AND switches `kind` to stroke on the degenerate outline. Extend `tests-visual/handmark.spec.ts` (hull non-empty 1ch→40ch).
  3. PRODUCE one LIVE dual-engine capture that ACTUALLY EXERCISES the fallback (C-PAINT cardinal). The guard NEVER fires in text-mode underlines (they span the full viewBox), making the existing handmark.vue π VACUOUS for this fix — the exact headless-green trap. Stand up a hull-brush BOX-MODE tiny datum (`<HandMark shape="box" brush="marker">` / `shape="bracket" brush="crayon">` over a 1-char datum) in the demo and capture it rendering a VISIBLE band (never a vanish), both modes.
  4. FIX the adjacent stale doc-drift in the SAME edit (no-legacy/DRY): `ink.ts` header line 9 (`'stroke' (pen/crayon — plain stroked <path>)`) and line 200 (`the shipped stroke-crayon`) still describe crayon as a STROKE brush — it is `ribbon:'hull'` (brush.ts:183). The prototype touches this exact branch; reconcile the comments to the actual ribbon assignments.
- **(c) The `amplitude` knob.** `NOISE_AMP_FRAC` is a frozen const; the atlas booked a published `amplitude` (wobble÷stroke 0.23→≥0.6, font-proportional) and was told it shipped — ABSENT. **Cleanest cut:** REPURPOSE the existing `wobble` Brush scalar (brush.ts:71, today "micro displacement scale") to drive the centerline amplitude (`amp = span * NOISE_AMP_FRAC * f(wobble)`), decoupling excursion from `weight` — no 13th scalar. Expose through `HandMarkProps`/the brush. Additive, fallback-first (default byte-identical). **OPEN RISK #4:** the fold is wide-blast (every existing render — slides masthead, demo); keep additive/fallback-first OR byte-verify against existing consumers.
- **(d) The draw-easing token + IO threshold.** HandMark.vue:88 hardcodes `cubic-bezier(.16,1,.3,1)` → `var(--ease-out-expo)` (token at bridges.css:356, byte-identical — token-first close, liquid-weight law). HandMark.vue:199 IO `threshold:0.35` → near-0 any-intersect (a thin 1px underline on a tall viewport may never cross 35% → draw-on never fires → invisible mark).
- **(e) The phantom gate.** `proof:handmark-audit` is CITED (proof-handmark.mjs:197 + gates.mjs:1396) as the binding spacing-CV/non-periodicity discriminator but the FILE DOES NOT EXIST (VERIFIED absent). MINT it (the φ-incommensurate spacing-CV ≥0.30 floor over 400 seeds — the real boil-quality witness) so the boil non-periodicity claim stops being unguarded. The hull-guard witness (b.2) may ride this gate.
- **(f) CLAUDE.md canon reconcile.** Line 584 describes the stale `NATURAL_AMP_FRAC`/`PERIODS_MIN..MAX` mechanism; the impl is `NOISE_AMP_FRAC`/φ-incommensurate octaves (the rework ALREADY landed on tranche/BG, geometry.ts:93-155 — do NOT re-architect; VERIFY live both modes, retune amplitude/pressure only if a fresh capture reads mechanical). Reconcile in the same wave (proof:handmark greps CLAUDE.md).

### 4. Pencil/boil deepened — `BG.W-PENCIL-BOIL-DEEPEN`

- **Graphite-in-tooth (the DRY + physically-true win).** A pencil/crayon stroke's grain mask samples the SAME shared warm-lit paper-tooth field the page uses (texture.ts already does `feComposite operator="in"` punching paper-through holes — re-point its noise to the ONE suffused field) so graphite physically catches in the page's tooth. "ONE paper register suffused" made physical. **Depends on §1 + §2 landing the shared field.**
- **The pencil pressure profile engages.** The curvature-coupled `addPressure` (ink.ts:102, presses harder on straights, lighter through wobble) exists but pencil is `ribbon:'stroke'` so it never drives a variable-width body. Route a pencil-tooth pressure profile so a pencil reads as graphite-on-tooth and a crayon as wax-in-pits (depth/relief from the lit field, not the flat threshold).
- **Boil LIVE + offscreen-park.** The demo home story (motion/handmark.vue) animates 1/7 sections today. Make boil LIVE on a calm PRM-gated loop; wire an IntersectionObserver/content-visibility offscreen-park for boil (HandMark.vue has IO only for the draw-on trigger; a continuous-boil mark scrolled offscreen keeps re-perturbing every shared-rAF tick). PRM-gated (the mark BREATHES, the grain stays static); the `BOIL_BUDGET=1`-per-route ceiling holds.
- **Liquid-weight (universal law).** Draw-on rides `--ease-out-expo` (decelerating arrival = weight); boil rides the PRM-honoring useLineBoil cadence. Never linear.

### 5. The ONE key-light spine + cross-repo asks — `BG.W-PAPER-CROSSREPO-ASKS`

**Land GU-1 as the shadow-law spine.** Mint `--glass-key-direction: -0.375` (= tan 20.56° down-left) in the glass-fx.css keystone, derive the three under-shadow X offsets (glass-fx.css:430-432, today X=0) via `calc(Y * var(--glass-key-direction))`, re-point the dock-wrap cast (overflow.css:143). Then the §1 feDiffuseLighting azimuth (M3) + the §1 deboss direction derive from the SAME token — ONE key unifies cel-cast (45° KEY) + under-shadow (20.56° FILL) + paper tooth-shadow. Frame as single-source-of-light truth (NOT Material key+ambient). Re-approve the 7 under-shadow baselines (sub-pixel, human-imperceptible). **The azimuth↔token coupling is gate-locked (M3): the literal azimuth in the data-URI must EQUAL the token-derived angle** — the data-URI cannot read `var()`, so a numeric-agreement gate clause is the only thing keeping the spine from drifting silently.

**The asks-and-consumes ledger** (`docs/tranches/BG/coordination/asks-and-consumes.md`, the BB/BC precedent shape — content-only, foreign-tree fence; VERIFIED the WAVE_BOUNDS + `../`-escape-reds pattern in `proof-crossrepo-asks.mjs`):

- **INBOUND (honor):** GU-1 (SATISFIED above). The aspect/amplitude/hull asks (J-GLASS-ROOT — SATISFIED by §3). The deckle px-amplitude param (FENCED — gated on a signed skeuomorphic-restraint exception; NOT published).
- **OUTBOUND to pencil-boil@0.4.1 (by-name, glass-ui-local interim + CONSUME marker, never a sibling edit):** (a) host the φ-incommensurate fractal value-noise wobble as a shared `amplitude`-bearing primitive (glass-ui RE-INVENTED it in `naturalUnderlinePoints`); (b) a scheduler offscreen-park/visibility gate on `useLineBoil`; (c) a pressure/variable-width body so glass-ui consume-and-deletes the vendored `freehand.ts` (379L) AND the dead `perfect-freehand` peer; (d) confirm the booked `snap` option. PRESERVE [S2] (house mulberry32 feeds pencil-boil, zero pencil-boil-mulberry32 import).
- **OUTBOUND to latex-paper@0.2.1:** document the seam — `/theme` owns STRUCTURAL editorial typography, glass-ui owns paper TEXTURE; no grain ask. The ask (if any) is a complete-`hsl()` token contract so the editorial register paints against glass-ui's tokens.
- **TO sci-report/atlas:** the consume contract — the atlas folds its local `HandUnderline.vue`/`useHandMarkClock.ts` hand-rolls (scroll-scrub, dark-lift, masthead-headline-grain) onto the shipped `<HandMark>` + the §2 grain-clip utility once §3 lands (the DEC-8 fold, fallback-first per H-ROOT-1).

**Dead-dep cleanup (no-legacy).** Drop `perfect-freehand ^1.2.3` from package.json `peerDependencies` (line 1063) + `peerDependenciesMeta` (line 1085) — NEVER imported; vendored `freehand.ts` is the truth. Re-text the index.ts/README/CLAUDE.md profile:budget note that still call it a live optional peer.

**The gate.** `proof:crossrepo-asks-paper` (the existing `proof:crossrepo-asks` is BB-scoped — value.js/kf/speedtest). Reuse the W4 foreign-tree-fence-by-construction pattern: WAVE_BOUNDS touch ZERO sibling path; a `../pencil-boil/…` escape REDs. Freshness header with the three sibling HEAD versions (pencil-boil 0.4.1, latex-paper 0.2.1, sci-report/atlas). Every ask names a CONSUMER wave that exists + a terminal disposition (the no-silent-drop law).

---

## FILES TOUCHED (unchanged from pass-1 + the gate re-point map made exact)

**Grain (§1, §2):** `src/styles/paper.css` (re-engineer `--paper-grain-tooth` line 44 + deboss; do NOT touch 94-284); `src/styles/tokens/scale-paper.css` (DELETE 131, re-author 132); re-point `cards.css:127`, `glass/ladder.css:447`, `dock/shell.css:255`; scrub dead-prose `btn.css:101`, `tab-button.css:100`, `ladder.css:429`; `paper-backdrop/PaperBackdrop.vue:50` (consider retiring `frequency` prop); a new `@utility`/`@supports` grain-on-headline block.

**HandMark (§3, §4):** `HandMark.vue` (measured viewBox a, easing token + IO threshold d); `constants.ts` (viewBox derivation, amplitude wiring); `geometry.ts` (amplitude through `naturalUnderlinePoints`, box-mode untouched); `ink.ts` (hull se-guard b + the stale-comment reconcile lines 9/200 + the pencil pressure profile §4); `brush.ts`/`types.ts` (repurpose `wobble`, publish the prop); `texture.ts` (graphite-in-tooth re-point §4); `composables/useHandMark.ts` (boil offscreen-park §4).

**Key-light spine + cross-repo (§5):** `glass-fx.css` (mint `--glass-key-direction`, derive 3 X); `dock/overflow.css:143`; `package.json` (drop perfect-freehand lines 1063/1085); `docs/tranches/BG/coordination/asks-and-consumes.md` (NEW); `GU-1-glass-key-fill.md` (mark SATISFIED).

**Gates:** `proof-paper-grain.mjs` (NEW — born-RED on the speckle; carries the azimuth↔token numeric-agreement clause + the raised warm-hue floor); `proof-handmark-audit.mjs` (NEW — the phantom spacing-CV gate + the hull-guard witness); `proof-crossrepo-asks-paper.mjs` (NEW — the paper relay, foreign-tree fence); re-point the `--paper-clean-texture` reads in `proof-handmark.mjs`/`proof-glass-cohesion.mjs:553-581`/`proof-glass-cal.mjs:292`/`proof-paper-grid.mjs:5`; register all in `gates.mjs`.

**π specs:** `tests-visual/paper-grain.spec.ts` (NEW — warm-hue + directional-relief readback, both modes, the RAISED MIN_CHROMA + the upper-right-brighter-corner assertion); `tests-visual/handmark.spec.ts` (EXTEND — aspect-correct px-aspect ≈ vb-aspect, hull non-empty 1ch→40ch via a box-mode datum, amplitude).

**CLAUDE.md:** reconcile stale handmark canon (line 584); the grain re-engineer note; the cross-repo relay note.

**Demo:** `motion/handmark.vue` (re-stage 7 slabs as glass/veil `tier="field"` over a contained warm paper field; boil LIVE; the brush continuum as a switcher; ADD the box-mode hull-guard datum — the binding hull capture surface); `foundations/paper-texture.vue`, `paper-glass.vue`, `compositions/math-paper.vue` (suffusion specimens).

---

## WAVE BREAKDOWN

| wave | scope | gate(s) | π bar |
|---|---|---|---|
| **BG.W-PAPER-GRAIN-REAL** | warm feDiffuseLighting lit tooth replacing the grey speckle; FINE fiber band (M1); sRGB/hex warm ecru (M2); azimuth derived + gate-locked (M3); surfaceScale calibrated (M4); alpha re-derived (M5); the letterpress deboss rider | `proof:paper-grain` (born-RED on the speckle; warm-hue floor ≥ house 0.020 on source; azimuth==token clause) | warm-hue + directional-relief (upper-right brighter), JND TOOTH not film, both modes, Chrome+Safari, calibrated vs a real render |
| **BG.W-PAPER-SUFFUSE** | ONE warm-lit source; DELETE `--paper-clean-texture` + re-point the VERIFIED consumer map; KEEP `--paper-aged-texture` (atlas contract); grain-on-headline `@supports`; latex-paper structural idiom; glass-opacity fence byte-untouched; follow the gate renames | `proof:paper-grain` (suffuse arm) + `proof:suffuse` extend | ONE register across ~12 surfaces; glass whisper still a whisper; headline-clip headline-only with solid fallback |
| **BG.W-HANDMARK-PERFECT** | aspect-correct viewBox (a, P2); hull se-guard (b, P3) + LIVE box-mode capture + the doc-drift reconcile; amplitude knob (c); draw-easing token + IO threshold (d); mint `proof:handmark-audit` (e); canon reconcile (f) | `proof:handmark` (+ hull-guard clause) + `proof:handmark-audit` (NEW) | px-aspect ≈ vb-aspect short+long; hull non-empty 1ch→40ch in a BOX-MODE datum; box-mode intact; spacing-CV ≥0.30; marks read hand-made |
| **BG.W-PENCIL-BOIL-DEEPEN** | graphite-in-tooth (shared field, depends §1/§2); pencil pressure profile; boil LIVE + offscreen-park; demo re-stage | `proof:handmark` (boil-park arm) | pencil reads graphite-on-tooth; boil breathes hump-irregular; PRM static |
| **BG.W-PAPER-CROSSREPO-ASKS** | land GU-1 key spine + the azimuth-coupling lock; the 3 by-name contracts; drop dead perfect-freehand peer (1063/1085); `proof:crossrepo-asks-paper` + freshness header | `proof:crossrepo-asks-paper` (NEW) | foreign-tree fence by construction; every ask names a consumer wave + disposition |

**Sequence:** GRAIN-REAL → SUFFUSE (consumes the source) → HANDMARK-PERFECT (independent) → PENCIL-BOIL-DEEPEN (consumes the shared field + the engine fixes) → CROSSREPO-ASKS (the key spine + the relay close). **GU-1's `--glass-key-direction` token lands FIRST** (value-only/additive) because GRAIN-REAL's azimuth (M3) derives from it — the gate clause needs the token present.

---

## ACCEPTANCE / REAL-PAINT-π BAR (C-PAINT binding — NECESSARY-NOT-SUFFICIENT device-free)

The binding artifact for EVERY wave is a FRESH dual-engine (Chrome AND Safari) both-modes capture the building agent did NOT author, CALIBRATED against a real render (never an assertion). Stand up the demo at `:5199`, drive Chrome + Safari over motion/handmark.vue + a paper-grain route + math-paper, both modes, DPR 1/2/3.

1. **Grain reads as warm LIT tooth, not metallic speckle.** A captured grain swatch over warm cream AND over a flat card resolves a WARM hue (chroma ≥ a defensible perceptible floor — calibrated against the real render, NOT the pass-1 0.004/0.005 that greens grey; the source `lighting-color` clears the house warm floor 0.020), JND-visible, with directional highlight/shadow relief leaning the KEY hemisphere (upper-right brighter), reading as TOOTH not a flat grey film and not a brushed-metal band. A naive viewer distinguishes it from the rejected grey speckle. Deterministic-enough Chrome↔Safari (sRGB-pinned; statistical-character parity, not pixel-identity).
2. **HandMark reads genuinely hand-drawn.** The text-mode underline renders at px-aspect ≈ vb-aspect across short AND long words (the wobble survives, not crushed). A `ribbon:'hull'` mark renders a non-empty thin-thick-thin band 1ch→40ch in a BOX-MODE datum that actually exercises the guard. The boil reads hump-to-hump-irregular (spacing-CV ≥0.30). The amplitude knob lifts wobble÷stroke to ≥0.6. Box-mode circle/box/bracket still stretch to the datum rect.
3. **ONE paper register suffused.** Every paper surface inherits the ONE warm-lit source; the glass whisper stays a whisper (opacity byte-untouched). The grain-on-headline clips the tooth into display type (headline-only) with a solid-ink `@supports` fallback.
4. **One key coherent.** The cel-cast, under-shadow fill, and paper tooth-shadow all lean the same hemisphere (`--glass-key-direction`); the gate asserts the literal data-URI azimuth EQUALS the token-derived angle.
5. **PRM-safe + cross-engine.** Grain static under reduce; boil/draw-on collapse to the finished frame; no `:global(.dark)` in scoped SFCs; every 0-alpha gradient stop an explicit `oklch(L C H / 0)`; multiply/screen blend only; no `backdrop-filter:url()`.
6. **The disease has a witness — AS A COMMITTED DIFF.** `proof:paper-grain` born-RED on HEAD's grey speckle and GREEN on the lit tooth, landed in the working tree (the pass-1 "real-files born-RED→GREEN" was UNVERIFIABLE — the script + the §1/§2 edits were absent); `proof:handmark-audit` exists (the cited phantom) with the hull-guard clause WIRED. Device-free gates are necessary-not-sufficient; the live π is the gate.

---

## FOLDED / DEFERRED ITEMS

- **`BG.W-PENCIL-BOIL-DEEPEN` kept as a lean wave** — graphite-in-tooth + pressure + boil-live is a substantive distinct mechanism; the OUTBOUND pencil-boil asks live in CROSSREPO-ASKS (no duplication).
- **The deckle (torn-paper px-amplitude param)** — FENCED, not published (atlas FD1/DL2 §P4 skeuomorphic-restraint). Recorded in the relay as a gated ask.
- **Anisotropic crayon grain (`grainFreqY`/`grainAniso`, a 13th Brush scalar)** — deferred root-signable; carried fallback-first, NOT added.
- **The committed raster paper-asset fallback** — booked behind the live capture (engaged if the lit tooth diverges unacceptably cross-engine OR still reads metallic to the user). A real scanned tooth cannot read metallic — the ultimate escape.
- **The `appear="scroll"` view-timeline draw-scrub + theme-reactive dark-lift `color`** (sci-report consumer hand-rolls) — booked to the relay as a future fold; not blocking.
- **GU-1's DEFERRED tier** (the `--shadow-sm…2xl` paper family + SortableList drag-lift) — stays the chartered follow-on per the GU-1 holdout ledger.
- **`perfect-freehand` consume-and-delete of `freehand.ts`** — booked to the pencil-boil pressure-primitive ask landing (the peer drop ships NOW; the vendored body retires when pencil-boil publishes the primitive).

---

## OPEN RISKS (the unconverged frontier)

1. **Cross-engine determinism of the lit tooth (the load-bearing falsifier).** feTurbulence PRNG is engine-unspecified; the "identical Chrome↔Safari" claim is unverified. The lit MODEL builds (P1); whether `feDiffuseLighting` SURFACE RELIEF diverges cross-engine is UNPROVEN. Mitigation: statistical-character acceptance + the raster-asset fallback.
2. **Safari `lighting-color` colorspace (folded to M2, unproven).** `oklch()` in an SVG data-URI `lighting-color` may not resolve in Safari → white → metallic IN SAFARI ONLY. M2 mandates an in-gamut sRGB/hex equivalent; the capture must confirm the warm key survives Safari.
3. **The fine-tooth `baseFrequency` + `surfaceScale` calibration (M1/M4, real-render-gated).** Fine micro-relief vs the brushed-metal band read is a pixel judgement, not an assertion; needs the live render to lock the numbers + the seamless-tile integer-cycle check.
4. **The metallic-rejection recurrence.** The mechanism BG re-opens was JUST user-rejected. The DIFFERENT model + the warm light + the born-RED witness + the naive-viewer judgement defend it, but the ultimate falsifier is the user's eye on a fresh capture. If it STILL reads metallic → the raster asset.
5. **The aspect-correct viewBox must not break box-mode (#3 §3a).** P2 proved the render model; the LIVE capture must confirm box/circle/bracket still stretch.
6. **The font-proportional amplitude fold is wide-blast (#4 §3c).** Keep additive/fallback-first OR byte-verify against existing consumers.
7. **The glass-whisper consolidation touches glass files.** The opacity fence is the hard invariant; coordinate with WS3/WS8; verify on a glass route.
8. **No live server at synthesis time (`:5199` down).** WS9 CANNOT close on source-green; the verification rig (demo + Chrome + Safari) is a close PRECONDITION, and the binding artifact is the dual-engine capture-pair. The born-RED→GREEN gate + the §1/§2 edits + all three new gate scripts are ABSENT from the working tree at synthesis — the build is the first deliverable of the next pass.
