# KS-HANDMARK — adversarial critique

**Target:** `KS-HANDMARK.md` (lane HANDMARK; wave 14.3 `BG.W-HANDMARK-PERFECT`, absorbs 14.4).
**HEAD:** `29f280c8` (tranche/BG). **Verdict:** strong, disk-accurate, greenfield-genuine — but the
**headline delta (D1) has a correctness gap that would fail its own A3 gate as written**, plus two medium
executability holes. **Convergence: 87 / 100.**

Every file:line the spec cites was re-verified on disk (the KS-A critics caught two disk-false claims; I
assumed nothing). Unlike KS-A, **all of KS-HANDMARK's corpus cites are true within ±2 lines** — see the
verification ledger at the end. The findings below are about the DESIGN, not stale cites.

---

## Findings (severity-ranked)

### F1 — D1's isotropic-space mechanism ignores the per-shape SVG CSS box multipliers; the ring (its own gate's test) stays ~14 % elliptical. **[MAJOR]**

D1 is the wave headline. Its mechanism: keep `VB_H=40`, derive `VB_W = VB_H · (box_w/box_h)`, keep
`preserveAspectRatio="none"` — claiming this becomes "**ONE uniform scale `box_h/40` on both axes**"
(spec:218) → "**round rings, un-smeared chisel caps, isotropic wobble**" (spec:221). The A3 gate + §6.2 π
BOTH assert "**ring paints round (rx≈ry)**".

This is not true as specified. `preserveAspectRatio="none"` maps the viewBox onto the **rendered SVG
element box**, and that box is NOT the `.hm` box — it is a per-shape CSS-percentage inflation of it
(`HandMark.vue:287-308`):

- underline/strike/highlight → `.hm__svg { left:-2%; width:104%; height:100% }` ⇒ rendered box = `1.04·box_w × 1.00·box_h`.
- **circle/box/bracket** → `left:-12%; width:124%; top:-22%; height:144%` ⇒ rendered box = `1.24·box_w × 1.44·box_h`.

The x/y scale ratio after the D1 derivation is `renderedW/VB_W ÷ renderedH/VB_H`:
- underline: `1.04 / 1.00 = 1.04` → **4 % residual** (imperceptible; the square cap is fine here).
- **circle: `1.24 / 1.44 = 0.861` → a 14 % x-compression that survives the fix.** A text-mode ring stays
  visibly elliptical; the box/bracket corners stay non-square.

So D1 fixes exactly the shapes it doesn't gate (underline/highlight) and leaves un-fixed exactly the shape
it DOES gate. **A3 ("ring rx≈ry") and §6.2 ("ring roundness constant") would RED on a real paint** unless
they secretly measure marking-space rx/ry (trivially round, and then the gate proves nothing). Positioned
mode compounds it: `box` coords live in the 0..100×0..40 marking space (`geometry.ts:180-182,247-252`), so
"derive `VB_W` from the box aspect" (spec:245) is self-referential — VB_W derived from coords expressed in
VB_W-space — and D1 never says how positioned mode reconciles.

**Fix owed (pick one, state it):** (a) normalize every shape's `.hm__svg` CSS to cover the `.hm` box with
**equal x/y percentages** (then `VB_W = VB_H·box_w/box_h` IS isotropic for all shapes), or (b) fold the
per-shape multiplier into the derivation: `VB_W = VB_H · (renderedW/renderedH)`, measuring the SVG element's
own box, not `.hm`. Either closes it; the spec must name one and say what positioned mode derives from.

### F2 — D7 never reconciles the D1 rename/re-anchor with the EXISTING `proof:handmark` W4 constant-presence checks. **[MEDIUM]**

`proof-handmark.mjs:198-205` (the shipped `proof:handmark` W4 arm) hard-asserts the presence of
`NOISE_AMP_FRAC`, `NOISE_OCTAVES`, `NOISE_PHI`, **and `NOISE_F0`** in `geometry.ts`. D1:
- deletes `NOISE_AMP_FRAC` → mints `NOISE_AMP_FRAC_H`. Survives by luck: `/NOISE_AMP_FRAC/` substring-matches
  `NOISE_AMP_FRAC_H`. (Fragile — worth naming so nobody "cleans up" the regex and REDs.)
- keeps `NOISE_OCTAVES`/`NOISE_PHI` (green).
- **`NOISE_F0`'s fate is unspecified.** D1 re-anchors frequency to "humps per VB_H" and mints `NOISE_LAMBDA`
  (a wavelength). If `NOISE_F0` is replaced by the wavelength derivation, **`/NOISE_F0/.test(geometry)` REDs
  the existing W4** — and D7 lists only "+W7 hull-guard / W6 widen", never an instruction to touch lines
  198-205 or their stale comment (`proof-handmark.mjs:192-197`, which still narrates the old constant story).

D7 must state: does `NOISE_F0` survive the re-anchor, and if not, the W4 arm + its comment are updated in
the same wave (clean-break hygiene). This is a real green→red the spec is currently silent on.

### F3 — D6's offscreen-park is wired to the `appear:'visible'` IO only; `boil`/`draw-then-boil` marks with `appear:'mount'|'manual'` never park (the invariant-8 hole stays open for them). **[MEDIUM]**

D6 says "**replace the one-shot draw IO** … fires `play()` once on first intersection (the existing
`appear:'visible'` contract)". But on disk the IO is constructed **only inside the `appear==='visible'`
branch** (`HandMark.vue:189-199`). A `<HandMark animation="boil" appear="mount">` arms the boil at
`:187` and `play()`s at `:188` with **no IO at all**; the demo's own draw-on specimen uses `appear="manual"`
(`handmark.vue:72`), and a masthead that boils-on-mount is exactly the driver case §3.Q4 sanctions.

§6.4 states offscreen-still as a **universal** boil property ("offscreen it is STILL (zero frames)"), and D6
scopes disconnect on `drawn && !boils` — implying the IO should serve the boil concern independent of
`appear`. But the spec never says the IO must now be created whenever **`boils || appear==='visible'`**, not
just `appear==='visible'`. Without that, invariant-8 is closed for the visible-appear path and left open for
mount/manual boils — an incomplete close of the exact hole 14.4 exists to fix. One sentence in D6 fixes it.

### F4 — Cross-lane coherence: KS-PAPER §4.3.3 frames the congruence as **azimuth**; KS-HANDMARK D5 picks **pitch** and calls the pencil grain "isotropic — no azimuth channel". Legitimate, but the divergence is unflagged. **[MEDIUM]**

D5 cites "the KS-PAPER §4.3 congruence contract" and resolves it as: pencil grain stays "**isotropic — no
azimuth channel to couple; PITCH is the congruence axis**" (spec:292). But KS-PAPER `§4.3` point 3
(`KS-PAPER.md:460-462`) states the seam as "*a graphite mark pressed into the tooth is the deboss read in
hand-voice; **the shared azimuth is the congruence**.*" The paper tooth carries a real directional deboss
(azimuth 290.56°, ≤35 % directional, `KS-PAPER.md:191,462`); KS-HANDMARK declares its pencil grain
directionless and swaps the congruence axis to pitch.

KS-HANDMARK "owns the wave," so its choice governs — but the two binding specs now assert **different
congruence axes for the same phenomenon**, and D5 doesn't say "I diverge from §4.3.3's azimuth framing
because the brush-local `feTurbulence` grain is isotropic." An executor reading both would not know whether
to couple azimuth (paper's word) or pitch (handmark's word). Add one explicit reconcile sentence; ideally
flag it to the orchestrator as a KS-PAPER §4.3.3 wording fix so the two specs agree.

### F5 — precision + executability nits. **[MINOR]**

- **D1 prose overclaims.** "ONE uniform scale `box_h/40` on both axes" is false even for the underline (the
  104 %/100 % box leaves 4 %). Say "near-uniform (the ±4 % overshoot residual)" or fold the 1.04 in.
- **D4 token home unspecified.** D4 mints `--handmark-draw-ease: var(--ease-out-expo)` but never names the
  file it lands in (the §6 easing table lives in `scheme-spring.css`, verified `:215,220`). Name it for
  zero-interpretation. (The literal floor `var(--handmark-draw-ease, cubic-bezier(0.16,1,0.3,1))` and the P1
  bezier-not-spring assert are correct.)
- **D3 threading implicit.** The `--handmark-amplitude` multiplier affects `naturalUnderlinePoints`
  (computed reactively in `useHandMark`, not in the SFC measure), so it must thread through `normalizeProps`
  the way `baselineFrac` does. D3 lists the right files but should state the thread explicitly (the
  `naturalUnderlinePoints` signature also gains a param — and the D7 audit gate must call it with the new
  signature; A2's "(seed, box)" pin implies this but doesn't say the arity changed).

---

## What holds up (credit where due)

- **Disk fidelity: excellent.** Every corpus cite verified within ±2 lines (§ ledger). The five BA highlighter
  deltas (`brush.ts:261-278`, `HandMark.vue:266,277-286,309-312`), the natural morphology
  (`geometry.ts:93-155`), the pre-measure fallback (`:186-190`), the curvature-coupled pressure
  (`ink.ts:102-119`), the unguarded `getStroke` (`ink.ts:184`), the seven brush rows — all as claimed.
- **Wave binding: clean.** 14.3 is the only bound id; `EXECUTION-PROGRESS.md:82` confirms the row text
  ("handmark + handmark-audit + boil-park arm (absorbs 14.4)", precond independent). No self-inserted rows.
  Fold-candidates (BD Move-3 weight, Move-4/5 ℱ-redraw, the dead `perfect-freehand` peer → F8, full demo
  matrix, wet-edge REJECTED) are correctly framed as orchestrator notes; the peer drop is verified routed to
  `bg-build-map` row 5 (`W-PAPER-CROSSREPO-ASKS`), not smuggled here.
- **Protected set: untouched.** No spring/dock/glass machinery; `NOISE_LAMBDA` is a handmark-home constant,
  not a protected φ member — the sanctioned in-home evolution. Foreign-tree fence absolute (D6 = no
  pencil-boil edit, composes the public `start/stop`).
- **Greenfield loop: genuine.** Q1-Q4 each carry ≥3 directions → GOLDEN → a self-challenge that actually
  surfaces work (Q3's self-challenge is what unearths D6). Not a rubber-stamp.
- **SOTA: cited + current.** perfect-freehand (Ruiz/tldraw, MIT), rough.js (Shihn), Excalidraw #7239, the
  Visini/paper-animation boil-cadence band (~4.4-12 fps; the 4-frame/0.9 s = 4.4 fps arithmetic checks),
  max.hn multiply highlighter, Smashing/TPGI a11y. The REJECT-as-engine / ADOPT-the-lesson verdicts are the
  right calls and map to real code.
- **Precepts: conformant.** Draw-on = EFFECTS ⇒ bezier (D4, P1); boil = discrete-cadence living-line,
  PRM-static; compositor-only; clean-break rename (no alias); token-first knobs; ≥2-consumer (demo + atlas
  masthead). The three-underline fence held both directions (D3 floor ≥0.25 blocks the `amplitude:0`
  back-door to a hairline).

---

## Verification ledger (spec cite → disk)

| Spec claim | Disk | OK |
|---|---|---|
| `preserveAspectRatio="none"` `HandMark.vue:240-241` | `:241` | ✓ |
| `drawTransition` hardcodes `cubic-bezier(.16,1,.3,1)` `:84-89` | `:87` | ✓ |
| one-shot draw IO `play()`+`disconnect()` `:189-199` | `:189-199` (visible branch only — F3) | ✓ |
| multiply un-walled, no `isolation` `:277-286`; `[data-behind]` `:309-312`; cap `:266` | all | ✓ |
| `getStroke` unconditional `ink.ts:184-198`; `addPressure` `:102-119` | `:184`, `:102-119` | ✓ |
| `naturalUnderlinePoints` `geometry.ts:93-155`; fallback `:186-190`; `natural` auto `useHandMark.ts:101` | all | ✓ |
| `NOISE_AMP_FRAC` `constants.ts:61`; `HIGHLIGHT_RISE` `:30`; VB aspect 2.5 `:9-11` | all | ✓ |
| seven brush rows (pen/boil/pencil/crayon/ring/marker/highlighter) `brush.ts:108-280` | all | ✓ |
| `naturalUnderlinePoints` exported `index.ts:42`; `--ease-out-expo` `scheme-spring.css:215,220` | both | ✓ |
| row 14.3 `EXECUTION-PROGRESS.md:82`; peer-drop → F8 `bg-build-map` row 5 | both | ✓ |
| KS-PAPER §4.3 congruence exists | `KS-PAPER.md:449-464` (but azimuth vs pitch — F4) | ✓/⚠ |
| existing `proof:handmark` W4 requires `NOISE_F0` | `proof-handmark.mjs:198-205` (D7 silent — F2) | ⚠ |

---

## To reach 100

1. **F1** — respecify D1 so the isotropic guarantee reaches circle/box/bracket (normalize the per-shape
   `.hm__svg` CSS to equal x/y %, or derive `VB_W` from the rendered SVG box); state the positioned-mode
   derivation. This is the wave headline and its own A3 gate depends on it.
2. **F2** — D7 states `NOISE_F0`'s fate and (if deleted) updates `proof-handmark.mjs:198-205` + its comment
   in-wave.
3. **F3** — D6 constructs the persistent IO whenever `boils || appear==='visible'`, closing invariant-8 for
   mount/manual boils.
4. **F4/F5** — one reconcile sentence for the azimuth↔pitch congruence divergence; name D4's token file;
   state D3's `normalizeProps` thread + the `naturalUnderlinePoints` arity change.

None touch scope/preconds/protected-set; all are sharpenings within the 14.3 row.
