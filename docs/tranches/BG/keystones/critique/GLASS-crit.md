# KS-GLASS — adversarial critique

**Critic: opus (adversarial). Date 2026-07-01. HEAD `fa6ed40a`. Target: `keystones/KS-GLASS.md`.**
**Convergence: 82%** (one CRITICAL open → below the ≥85%-zero-critical binding bar; the rest is binding-ready).

The spec is genuinely strong: SOTA is cited + current (WebKit 245510 dated 2026-06, samasante honesty
caveat, iOS-27 reduced-transparency), the greenfield loop is real (4 contested questions, ≥3 directions
each, self-challenge that names the vacuous-green trap on F2.3's bundle gate), the protected set is respected
byte-for-byte, and the §4.13.2 constant reconcile (adopt shipped `0.003` over never-on-disk `0.0045` via a
single-source `refractConstants.ts` + a 1:1 GLSL/WGSL mapping table) is a clean, disk-grounded resolution of
COHERENCE F1 — better than either the corpus or the plan. Findings below, most-severe first; every claim
carries file:line.

---

## CRITICAL

### C1 — F2.2 step-4 "RETIRE the inert ambient axis" is FACTUALLY WRONG; the axis is LIVE and its retire breaks a shipped feature

**Spec (§4 F2.2 #4, KS-GLASS.md:333-337):** "the INERT ambient axis: `--glass-ambient-hue` +
`--glass-ambient-strength` (`glass.css:391-405`) RETIRE — the strength is written NOWHERE (the axis paints
nothing at ×0%) … Clean-break residual includes the JS leg: `useGlassBackdropLuminance`'s ambient-hue write
path … **zero writers, zero readers, zero residual `var()` after the sweep**."

**Disk truth (contradicts every clause):**
- `--glass-ambient-strength` **IS written** — `bloomUpField.ts:76` (`setProperty("--glass-ambient-strength",
  `${pct}%`)`) and ramped by `useBloomUp.ts:49`. "Written NOWHERE" is false.
- `--glass-ambient-hue` has **≥3 writers**: `bloomUpField.ts:71`, `useGlassBackdropLuminance.ts:440`, plus
  `useBloomUp`'s field-warm path.
- Both are **LIVE-READ** into the tint seam: `liquid-morph.css:34-35`
  (`--glass-tint-source: var(--glass-ambient-hue); --glass-tint-strength: var(--glass-ambient-strength)`) and
  again at `:64-69` (the `--glass-ambient-strength-field` field-warm ceiling). "Zero readers" is false.
- `useBloomUp`/`bloomUpField` are **NOT in the dead-cut** (10.5 deletes useHaptic/useCelebrationBurst/
  useVizChoreography/useLiquidMorph/useDockContextSilhouette — cursor:83; useBloomUp absent) and were **just
  CARVED DONE** at `BH.B2.4a W-bh-carves (worm/bloomUp)` (EXECUTION-PROGRESS.md:171, `6daf7ef3`). The axis is
  the substrate of the shipped BE.W-AMBIENT-TINT bloom-up field-warm — an actively-maintained leaf.

**Why it's CRITICAL, not cosmetic:** a build agent executing F2.2 as written deletes tokens with 3+ live
writers and two live `liquid-morph.css` reads. Either (a) `clean-break-residual` REDs on the residual
`var(--glass-ambient-hue)` in `liquid-morph.css` (the gate the spec itself specifies), or (b) the agent
follows the "carve out with the tokens" instruction, deletes the readers too, and **silently kills the
bloom-up field warming** — a shipped feature. The spec inherited a stale corpus reading (GLASS-corpus.md
§1c:89 + §2a:149 conflated "the `@property` DEFAULT initial is 0%" with "never written at runtime"; useBloomUp
writes it dynamically).

**Fix (one of):** (i) DROP the ambient retire from F2.2 — the axis is live, not inert; the RESPEC "the FIELD
delivers the transmissive read, not a 5th axis" premise is refuted by useBloomUp being the axis's live
consumer. OR (ii) if the RESPEC genuinely wants the axis gone, `useBloomUp`+`bloomUpField`+the
`useGlassBackdropLuminance:440` write MUST be retired FIRST as a **fold-candidate note to the orchestrator**
(a motion-lane concern, out of KS-GLASS's frozen scope) — the spec cannot assert "zero writers" over a
surviving writer. Either way the "zero writers/readers/residual" sentence must be struck; it is false on disk.

---

## MAJOR

### M1 — F2.1 §4.3 layering double-counts the plate (a build-agent ambiguity; "zero interpretation" bar)

**Spec (§4 F2.1 #3, KS-GLASS.md:376-381):** `.glass-defined` sets
`background-image: linear-gradient(var(--glass-plate-tinted), var(--glass-plate-tinted)),
linear-gradient(var(--glass-floor-fill), var(--glass-floor-fill));`. But 3.5's `@utility glass-fill` (§3.1,
:104) sets `background: var(--glass-plate-tinted)` (the **shorthand** → background-COLOR). The base rung
already paints the plate as background-color; `.glass-defined` then re-declares the plate AGAIN as the top
image layer. Final composite over white = **plate(image) ⊕ floor(image) ⊕ plate(color)** — the plate
contributes twice. The prose ("the floor layered UNDER the transmissive fill", :151/:376) describes ONE plate
+ a floor beneath; the literal CSS produces two plates sandwiching the floor.

**Why it matters:** the paint difference is real (a paint-changing wave, so not itself illegal), but the
mechanism is ambiguous for a build agent — must `.glass-defined` also set `background-color: transparent` to
collapse to the described single-plate-over-floor stack, or is the double-plate intended and the Fable
`--glass-floor-fill-max` calibration compensates? The spec must state ONE of these explicitly (the "a build
agent needs zero interpretation" bar). Cleanest: `.glass-defined { background-image: linear-gradient(floor),
linear-gradient(floor)` is wrong direction (floor over plate); the correct single-plate form is to keep the
base plate as background-color and set `background-image` to the floor ALONE positioned to sit *under* — which
CSS cannot do (image layers always paint over background-color). So the two-image form IS needed for
plate-over-floor ordering, and the base `background:` color must be zeroed on `.glass-defined` to avoid the
third redundant layer. State it.

---

## MINOR

### m1 — 13.2 names an absorbed wave `12.7 W-GATE-UNIFORM-BLUR` absent from the frozen cursor

**Spec (§4 13.2, KS-GLASS.md:432):** "Absorbs 12.8 `W-SAFARI-PARITY-GATE` + **12.7 `W-GATE-UNIFORM-BLUR`** +
13.4 SOTA-ladder." The frozen cursor row 13.2 (EXECUTION-PROGRESS.md:68) source column reads
"`13.2+12.8; … 13.1/13.4/13.5 fold`" — 12.8 and the 13.x folds are traceable; **12.7 / `W-GATE-UNIFORM-BLUR`
appears NOWHERE in the cursor** (grep 0). The corpus repeats the claim (GLASS-corpus.md:332) but the corpus is
not the frozen source. Per the fence "every named id EXISTS in the cursor" — either verify 12.7's provenance
(a prior-pass fold) and cite it, or drop the reference. Low severity (an absorption claim, not a self-inserted
row), but it is the one traceability gap.

### m2 — 13.2 "five sampleBG sites" enumerates only three

**Spec (§3.4:220-221 + §4.13.2 #4:459):** "The five sites: the hero glass CTA · the dock plate · the
`.glass-deep` Card tier · **the two remaining `sampleBG` wrapper sites** (`GLASS-corpus.md §3/13.2` —
≥2-consumer bar cleared at birth)." GLASS-corpus.md §3/13.2 (:376-378) says "5 refracting sites" but names only
the same three. The ≥2-consumer bar is cleared by the three; the "two remaining" are unnamed anywhere, so the
"wire sampleBG at 5 sites" deliverable is not executable as a checklist. Down-state to "≥3 named sites (bar
cleared); the 4th/5th enumerated or the 5-count dropped." (The ≥2 bar is not at risk — this is a precision/
executability nit only.)

---

## Checks that PASSED (no finding)

- **Wave-binding:** all 7 ids (0.7, 3.5, 3.10, 13.2, F2.1, F2.2, F2.3) exist in cursor rows 64-71; no
  self-inserted rows; preconds match the cursor (F2.2: 3.5+F8.5+dead-cut; F2.1: 3.5+FIELD-AURORA; 3.10: 3.5
  hard + F5.1 soft). The F2.2-before-F2.1 inversion (so `.glass-defined` composes the factored recipe) is
  correctly carried from R9.
- **Protected set (SYNTHESIS §4:110-116):** `--glass-level`/`--glass-depth` composition + six-layer composite
  + alpha ladder (0.30/0.50/0.65/0.80/0.95) + `in srgb` surface-tint fence + φ constants + DOCK_SPRING —
  all declared byte-untouched; F2.2 zero-pixel by contract; 3.5 zero-pixel at defaults; F2.1/F2.3/13.2 change
  paint ONLY at their born-RED witness. No violation.
- **0.7 orphan claim VERIFIED:** `grep var(--glass-blur-dock) src/` = 0 (the composed token has zero live
  readers; the self-compose at glass.css:164-169 is the only writer). The clean orphan-delete framing is
  correct, and the KILLED `proof:retired-token-consumers` (foreign-tree fence) is honored.
- **§3.1 tint-recipe home:** the `@utility glass-fill` GOLDEN correctly closes the substitution trap
  structurally (compose-at-element); direction (a) `:root` pre-compose correctly rejected with the documented
  4× trap citation. The 9-ref count (2 decls surfaces.css:292/306 + 7 reads) matches disk.
- **§4.13.2 constant reconcile:** adopting shipped `chromatic_aberration * 0.003` (glassShader.wgsl:13,
  130-132) as the anchor over the never-on-disk `0.0045`, via `refractConstants.ts` + a lockstep string-scan
  fence, genuinely resolves COHERENCE F1 without re-deriving. Strong.
- **Precepts:** the `--glass-key` no-azimuth fence (§5, glass-fx.css:106-117), the light-dark() inset-shadow
  trap (F2.2 #3 one-mechanism-per-token-TYPE + no-color-feeds-inset bite), the `in oklab` vs `in srgb` fence
  (`--glass-floor-fill` srgb-BY-DESIGN as an alpha-of-card plate leg), zero `backdrop-filter:url()` in the
  material path, compositor-only+PRM (13.2 drapery-dropped keeps static refraction, P6) — all correctly
  honored. The P1 "spring vs bezier" ambient-hue wording tension (research §7 flag 1) is resolved in §5:521
  ("eased, never a hard swap; the mechanism is a bezier") — but note this reconcile is now MOOT if C1 forces
  the ambient axis to STAY (the wording tension re-opens against a live axis; re-address under C1's fix).

---

## Must-fix for binding-ready (100)

1. **[CRITICAL] C1** — strike the "inert / zero writers / zero readers" ambient claim; DROP the F2.2 ambient
   retire OR record useBloomUp+bloomUpField retirement as an out-of-scope fold-candidate note. The axis is
   live (bloomUpField.ts:71/76, useGlassBackdropLuminance.ts:440, liquid-morph.css:34-35/64-69) and just
   carved DONE at row 1.7.
2. **[MAJOR] M1** — disambiguate F2.1 §4.3: state that `.glass-defined` zeroes the base `background-color`
   (single plate over floor) OR that the double-plate is intended-and-Fable-calibrated. No interpretation left
   to the build agent.
3. **[MINOR] m1** — verify/cite or drop the `12.7 W-GATE-UNIFORM-BLUR` absorption (absent from the cursor).
4. **[MINOR] m2** — name the 4th/5th `sampleBG` site or restate the deliverable as "≥3 named (bar cleared)".
