# Concentric — DELTA-ASSAY (golden-vs-current; the UNION path)

> Survival-of-the-fittest assay of the GOLDEN (`GOLDEN.md`, hardened by `challenge/{1,2,3}.md`)
> against the CURRENT HEAD implementation, live-inspected `/substrates/concentric` (`:5173`, both
> modes, painted-pixel readback + screenshots) + grep-verified across the 6 concentric source files,
> the gate, the demo preset, the manifest, and the 3 union waves. **Verdict: REFINE (~83% converged).**
> The level-set field is FIT and already shipped; the work is the FINISHING LAYER on the kept
> fragment — opaque hypsometric fill + hillshade relief + two-tier index/minor ink + per-mode warm
> ground + velocity cursor-heave — plus a gate rewrite, a preset purge, and a stale-doc de-stale. NOT
> a rebuild. The boldest mechanism is EYE-PROVEN (the spike panels read as vivid living relief maps);
> its committed numeric witness is BORN-DEAD and must be re-captured before any π floor inherits it.

---

## 0. METHOD — what was actually verified (not name-presence)

- Read GOLDEN.md + all three challenges in full; folded their landed refutations into this assay.
- Read the 6 live concentric source files at HEAD: `Concentric.vue`, `constants.ts`,
  `composables/{useConcentric,levelField,concentricGLSetup,concentricWGPUSetup,uniformBridgeWGPU}.ts`,
  `shaders/concentric.{wgsl,glsl}.ts`.
- Read the gate `scripts/proof-concentric.mjs` + ran it live (`node` → **RED**, **exit 1**).
- Read the demo `presets.ts:67-77` (teal literal) + `manifest.ts:657` (stale ellipsoid copy).
- Read the 3 union waves: `BD.W-CONCENTRIC-LEVELSET.md`, `BD.W-PAPERGRID-WARP.md`,
  `BD.W-CONCENTRIC-RADIUS.md`; the teal-purge gate `scripts/proof-teal-navy-purge.mjs`.
- LIVE-INSPECTED `/substrates/concentric` (`:5173`) both modes: screenshots
  (`delta-head-canvas-{light,dark}.png`) + a real canvas painted-pixel readback (light:
  **avgChroma 0.092, warmFrac 1.0, grayFrac 0, lumVar 0.0005, single hue-bin [30,60]**).
- Read the committed `golden/spike-shot.png` (the GOLDEN's cited PIXEL-PROOF).

---

## 1. THE HEADLINE DELTA — the GOLDEN's source claims are TRUE at HEAD (the respec already shipped)

The GOLDEN.md §0 "SOURCE-VERIFY" is **accurate**: HEAD is ALREADY a true curl-warped level-set field.

- `levelField.ts:93 sampleHeight` = `heightField(valueNoise, waveFlow(...))` (3-octave value-noise
  terrain) + `waveSwell` + cursor Gaussian, warped by the shared `waveField` leaf + `curlFBM`. The two
  shaders (`concentric.wgsl.ts:120`, `.glsl.ts:101`) transcribe it line-for-line. The `ringField.ts`
  radial sum-of-sines ring engine is **RETIRED** (the file is gone; only stale DOC/copy survive).
- LIVE render (both modes) shows **genuine irregular nested level-sets that bend/merge/split** — NOT
  circles, NOT ellipses. Field math = FIT.
- The IQ gradient-free `contourInk` (`band=|fract(fN+0.5)−0.5|`, `aaW=fwidth(fN)`) ships and is the
  level-set extraction operator. FIT.
- The substrate / cursor physics (`createGpuSubstrate` WGPU-primary + WebGL2 fallback,
  `usePointerVelocityField` fed via `onFrame`, the spring-eased `amp` 0→1.06 overshoot, the velocity-led
  `lead 0.1` well) all ship. FIT.

**The consequence for the wave set (a key reconcile, see §5): the on-disk `BD.W-CONCENTRIC-LEVELSET.md`
is STALE.** It still specs the `ringField.ts` → `field:"rings"|"levelset"` field-source SWAP as future
work — but HEAD has ALREADY performed that swap (there is no `ringField.ts`, no `rings` mode, no opt-in
axis; the level-set is the sole path). That wave's mechanism is DONE; its body must be re-pointed at the
finishing layer the GOLDEN actually requires.

---

## 2. THE DELTA — KEEP / REFINE / RE-INVENT (survival of the fittest)

### KEEP byte-untouched (FIT — verified live + grep)
| Surface | Why it survives |
|---|---|
| `waveField.{ts,glsl.ts,wgsl.ts}` shared leaf + `curlFBM`/`CURL_FBM_*` | The single-source basis; the paper-grid kinship. No second noise basis. Live: genuine irregular level-sets. |
| `levelField.ts sampleHeight` (the JS oracle) | The twin the two shaders transcribe. Numeric-parity source. |
| `contourInk` IQ operator (both shaders) | Perfect GPU AA, density auto-tracks `1/|∇H|`. Byte-frozen. |
| `createGpuSubstrate` lifecycle + offscreen-pause + PRM freeze + `usePointerVelocityField` + spring `amp` + velocity-led well | The substrate + cursor physics. Live-confirmed working. |
| `uniformBridgeWGPU.ts` single-source layout table | std140↔WGSL mismatch structurally impossible. The new tunables extend it. |

### REFINE (WEAK — the field is right, the FINISH is missing)
| Surface | Defect (live-verified) | The fix |
|---|---|---|
| `fs_main`/`main()` compositing (`concentric.wgsl.ts:178-186`, `.glsl.ts:153-159`) | **THE ROOT DEFECT.** Default `background:"transparent"` → out is `vec4(rgb*ink, ink)`. The warm `tone` ramp ONLY tints the LINES; between lines alpha=0, the flat page shows through. **Live readback: lumVar 0.0005 (FLAT — no relief), single hue-bin [30,60] (monochrome amber wash).** Reads as a faint pencil sketch, not a survey. | Opaque hypsometric FILL + `tanh` tone expansion + analytic hillshade + two-tier index/minor + ink-of-own-band + per-mode warm ground + opaque out. ~20 lines, byte-mirrored WGSL↔GLSL (§3). |
| `constants.ts` `DEFAULT_CONCENTRIC_CONFIG` | `background:"transparent"` (the bleed-through cause); `WARM_IDENTITY_PALETTE` is 3 mono-warm stops (h:80/62/44 — all one family → the monochrome wash). | Flip `background` default to a per-mode warm floor; WIDEN the palette to a warm-DIVERGENT hypsometric tint (challenge-A: ≥N warm hue bins, deep-plum/rose → ember → amber → wheat → warm-gold, hues spanning [330..90] wrapping through red, NEVER [180,270]). Add the relief tunables. |
| `levelField.ts` | The JS twin must add the `tanh` tone + the ∇H finite-diff (shared `e`) so parity holds. | REFINE the consumers; NO field-math change. Pin `e` as a SHARED constant (challenge R8). |
| `presets.ts:67-77 CONCENTRIC_THEME_PALETTE` | `h:250/210/190` + bg `h:255` — teal-on-navy, all inside the purge band [180,270]. (Legal as presets-in-consumers + the demo already LEADS warm via `useTheme=FALSE`, so it is NOT default-shown — but it is a cool literal the iOS-27 §3 "colorful field" should not endorse.) | PURGE to warm-divergent (sunset-coral → magenta-ember over warm-plum, all hue ∉ [180,270]). |

### RE-INVENT (BROKEN — fix wholesale)
| Surface | Defect | The fix |
|---|---|---|
| `proof:concentric.mjs` | **FULLY RED against HEAD** (asserts `sampleRingField`/`ringField.ts`/`buildRingFamily`/`axisRatio`/`ringIsolineInk`/`ellipsoidalGradMag` — 0 of these exist). A false-FAIL gate guarding a retired surface. (Note: it DOES `process.exit(1)` — challenge R3's "exits 0" was a `tail`-pipe artifact; the machinery is fine.) | REWRITE clause-by-clause to the level-set + finishing-layer gate (§4). |
| `manifest.ts:657` (LIVE on the page) | "radial Fourier ring-interference field — concentric **ellipsoid rings**... an **ellipsoidal norm** reads a tilted disc as ellipses." The NAIVE-ELLIPSOID vocabulary the binding law forbids, rendered in the user-visible hero. (Challenge-2 R2 — escapes the GOLDEN's de-stale list.) | RE-WRITE to "living level-set hypsometric survey." ADD `manifest.ts` to the de-stale row + the gate L2 census. |
| Stale docstrings: `README.md`, `useConcentric.ts:60` ("the ONE math source `ringField.ts`"), `levelField.ts` header (clean), `concentric.{wgsl,glsl}.ts` headers (clean), `Concentric.vue` StoryHero | Dead "ring-interference / `ringField.ts`" copy over the right viz. | De-stale to "level-set hypsometric survey." |

---

## 3. THE BOLDEST MOVE — EYE-PROVEN, numeric-witness BORN-DEAD (challenge R1/D, folded)

The GOLDEN's opaque hypsometric relief (§2) composites in ONE pass on the kept fragment:
`tanh` tone → opaque warm FILL → one ∇H hillshade → two-tier index/minor `contourInk` → ink-of-own-band
→ per-mode arm → **opaque out** (drops the premultiply blend → CHEAPER than today).

**EYE-PROVEN.** The committed `golden/spike-shot.png` panels read as **vivid warm living relief maps** —
light = dark-ink survey on cream with visible hillshade; dark = luminous amber etch on deep ember. The
design reads. The mechanism is correct and cross-engine-trivial (`tanh`/`floor`/`fract`/`select↔step`/
`mix`, OKLab-in-linear, sRGB OETF, no `backdrop-filter:url`, no `color-mix(in oklch)`).

**NUMERIC WITNESS BORN-DEAD (challenge R1 + D, both LAND — folded as a build precondition).** The SAME
`spike-shot.png` prints its OWN on-canvas readback as **`avgChroma 0.000 / warmFrac 0.000 / grayFrac
1.000 / lumVar 0.000` in BOTH panels** — the EXACT INVERSE of the GOLDEN.md §2.1 table (0.494/0.419 etc.)
and the §5 π-floor parentheticals that cite it. The `getImageData` probe raced the paint / read a
cleared buffer (the same gotcha the live dark-mode readback hit here: samples=0). **Disposition:** the
spike is a VISUAL witness only; the numeric "PIXEL-PROVEN" floors are unproven. The amendment (a) strips
"PIXEL-PROVEN" until re-captured, (b) re-shoots the spike reading the drawn context after ≥2 rAF over the
painted interior, (c) the π gate asserts a **non-cleared-buffer precondition** (`nonzeroFrac > 0.9`
FIRST) before any chroma/lumVar assert, so a black readback FAILS LOUDLY instead of silently passing
grayFrac (challenge R4/D). The π floors are set from the HONEST re-capture, not the phantom table.

---

## 4. THE UNION PATH — deft, KISS, no legacy, no dual-path

The integration is a fragment-`main()` recomposition + tunables on the EXISTING uniform struct + a gate
rewrite + a preset purge + a doc de-stale. **No new composable, no new shader file, no re-fork, no second
noise basis, no `field` axis.** All five challenge hardenings that LAND are folded:

1. **Opaque hypsometric FILL is the spine** (the load-bearing root-fix). Deletes the lines-over-nothing
   bleed-through. Output `alpha=1` on the default background.
2. **`tanh` tone expansion** (`tone=0.5+0.5·tanh(H·toneGain)`) fills the compressed band so basins+ridges
   hit the ramp ends — the live `lumVar 0.0005` flatness cause.
3. **Two-tier index/minor contour** — `isIndex` a pure `f(level)` (`floor`+`mod`+select, the form the
   spike actually used — challenge R5; NOT the `step` form §4.1 named); the `hw` half-width is FED to the
   byte-frozen `contourInk`, not re-derived. The map grammar.
4. **Analytic hillshade** — one ∇H finite-diff (shared `e` constant, challenge R8) dotted with a fixed
   cel light → 2.5-D relief. The cheapest relief pop; lifts lumVar above floor.
5. **Per-mode warm ground via plain per-mode arms** (NOT CSS `light-dark()` — the inset-shadow trap),
   resolved in the CONSUMED palette stops + the background token. **ONE color path in the shader** — the
   shader samples the palette it is given; it does NOT branch "light vs dark" internally (challenge R9 —
   no second color seam, L4-clean). Drop the GOLDEN's `uMode` in-shader darken/lighten branch.
6. **Warm-DIVERGENT palette** (challenge-A) — the default `WARM_IDENTITY_PALETTE` widens to a true
   multi-warm hypsometric tint (≥N hue bins), and the π gate adds a **hue-SPREAD floor** (a single-bin
   amber wash REDS). "Never teal" must not collapse into "never anything but amber."
7. **Cursor-HEAVE on the cartoon-punch envelope** (challenge-B, partial fold) — scale the EXISTING
   `cursorWell` depth+radius by `usePointerVelocityField.velocity` magnitude JS-side in
   `packConcentricUniforms` (so `velocityHeave` is **free** — no uniform lane). The well-engage uses the
   `--ease-cartoon-punch` shape where reachable (a real pre-dip→overshoot, the one curve a spring cannot
   give — design.md:309) rather than asserting the monotone spring substitutes. The index contours pack
   around the bulge automatically (1/|∇H|). The cursor term needs a `smoothstep` falloff so the heave is
   a soft bulge, NOT the hard-edged quad the live dark render shows (challenge R3 — root-cause the box
   before scaling it; a C1-smooth gate clause).
8. **Contour-continuity under heave** (challenge R4) — clamp/floor `aaW` against a DPR-aware minimum so
   the index line stays CONTINUOUS where the heave packs contours (steep `|∇H|` saturates `fwidth`). The
   π pairs "heave compresses spacing" with "...without fragmenting the line."

### The uniform-lane HONESTY fix (challenge R2/C, folded)
The GOLDEN's "NO struct resize, zero new fork" is FALSE: 4 spare float lanes (`u0.w`, `norm.zw`,
`line.w`) cannot hold the ~9 new scalars. The amendment **adds ONE `tune: vec4<f32>` (toneGain, shadeAmp,
indexMul, inkDarken) + folds `lightDir.xy`/`indexEvery` into `norm.zw`/`line.w`** — the bind GROUP is
unchanged, the struct grows by +16B via the single-source layout table (where a std140 mismatch is
structurally impossible). `velocityHeave` is JS-side (free). `castLen`/cel-cast is **CUT entirely**
(challenge R6/2-R6 — a parked-0 dead lane is anti-KISS; it becomes its own future wave with its own gate
if wanted). Bump `CONCENTRIC_UNIFORM_BYTES` 208 → 224. The honest accounting: **4 new scalars in 1 new
vec4 + 3 folded into spares; +16B grow, no new bind group.**

### Aristotelian proportion — DERIVE, don't dress (challenge R7, folded)
Drop the post-hoc "5/13 = Fibonacci" framing. If proportion is wanted, set `indexEvery=8` over 13 levels
(8/13 ≈ 0.615 ≈ 1/φ, genuinely golden) OR derive the 4-stop ramp spacing from √φ for real. Otherwise
state it as a bias, not a φ derivation.

---

## 5. RECONCILE WITH THE EXTANT 116-WAVE SET (no dup)

- **`BD.W-CONCENTRIC-LEVELSET.md` — AMEND (its mechanism is DONE; re-point at the finishing layer).**
  The field-source swap it specs HAS SHIPPED (no `ringField.ts`, no `rings` mode, the level-set is sole).
  Its real fences (shared basis L1, no-second-noise L1, numeric parity L5, kept `contourInk` L4) are kept;
  its STALE clauses (`field:"rings"|"levelset"` axis L1/L2, byte-identical-default L2, `sampleRingField`
  naming, `levelJitter` as the only distinctness mechanism) are excised and replaced with the GOLDEN
  finishing layer (opaque fill + index hierarchy + hillshade + cursor-heave + per-mode ground). This is
  the amendment BODY — no new "levelset" wave.
- **`BD.W-PAPERGRID-WARP.md` — DISJOINT, kindred. NO edit.** Concentric reads the SAME `waveField`+
  `curlFBM` leaf; the +1 warp octave lands ONCE there and concentric inherits it. Concentric does NOT
  re-deepen the warp.
- **`BD.W-CONCENTRIC-RADIUS.md` — ORTHOGONAL namespace collision. NO interaction.** It is the
  `--radius-concentric` CSS `calc()` register (Apple `containerConcentric`), explicitly NOT the viz
  (its §3 fence says so). No edit.
- **`proof:teal-navy-purge` — HARDEN.** Add the demo `CONCENTRIC_THEME_PALETTE` (h:250/210/190/255) to
  the census as a re-theme target (it is currently demo-legal but cool); the warm-divergent re-theme
  re-greens it. The gate's T1 (library constants) + T2 (concentric.vue `useTheme` default FALSE) already
  fire — the new arm covers the demo preset literal itself.
- **`BD.W-FIELD-ENGINE` / `BD.W-WAVE-FIELD-HARNESS` — predecessor edges, KEPT.** The shared basis + the
  numeric harness (`shader-eval-harness.assertParity`) are the parity net the rewritten gate L6 composes.
- **`BD.W-PAGE-BACKGROUND` — CONSUME, do not dup.** Concentric's page chassis routes the shared warm-mesh;
  concentric is now self-sufficient (opaque) so it CONTRIBUTES a field rather than revealing a flat plate.
  This is the SAME systemic colorful-field finding the §6 ledger flags (glass-material + aurora + goo-blob).

---

## 6. CONVERGENCE — ~83%

The design is source-true, the field is FIT and already shipped, the boldest move is EYE-PROVEN, the
born-RED is genuine (gate exits 1). The remaining ~17% is build-time de-risk that the amendment specs but
cannot bank in a tranche-DEV assay: (a) the HONEST spike re-capture (the committed witness is born-dead),
(b) the non-cleared-buffer π precondition + the real painted-pixel floors set from the honest numbers,
(c) the warm-DIVERGENT palette + the hue-spread gate clause, (d) the cursor-box root-cause + the C1-smooth
+ contour-continuity clauses, (e) the +16B struct grow + the honest lane accounting, (f) the WebKit
paired-π (the GLSL twin paints on Safari). REFINE, not re-invent.
