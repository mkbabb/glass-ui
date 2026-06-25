## BE.W-LENS-PRISM — WIRE the chromatic-aberration dispersion fringe onto the glass lens rim

- **Band:** 2 — Liquid Glass material, Safari-first · **Severity:** major · **Status:** SPEC (tranche-dev; NOT executed) · **Deps:** **HARD sequence — lands AFTER BE.W-LENS-SAFARI** (PRISM WIRES the dispersion onto the lens rim that LENS-SAFARI establishes as the cross-engine floor; PRISM is NOT an independent parallel wave — it reads the lens). `--glass-edge-dispersion` already EXISTS (glass-fx.css:223) — this is WIRING, not a mint. **Sequence:** strictly after LENS-SAFARI.
- **One-line goal:** WIRE the EXISTING `--glass-edge-dispersion` chromatic-aberration fringe (a warm rim fringe + a cool rim fringe, glass-fx.css:223 — today consumed ONLY by the opt-in `.glass-chromatic` utility, NOT the lens) onto the `.glass-lens` refractive rim, so the iOS-27 prismatic edge-dispersion (light splitting into its warm/cool spectrum AT the refracting edge) reads on the lens where the displacement-map bends the backdrop — the polished-glass rim fringe Apple shows, composed onto the real refraction rather than as a standalone garnish.

---

## Goal — what ships, the iOS-27 betters-claim

The iOS-27 liquid-glass lens shows CHROMATIC ABERRATION at the refracting rim — the edge where the glass bends the backdrop also SPLITS the light into a warm fringe (one side) and a cool fringe (the other), the prismatic polished-glass signature. The substrate is ALREADY shipped on BOTH halves but DISCONNECTED:

- `--glass-edge-dispersion` (glass-fx.css:223) is the warm/cool inset-fringe pair — BUT it is consumed ONLY by `.glass-chromatic` (surfaces.css:398), a standalone opt-in garnish that composes the fringe OVER the rim with NO connection to the lens refraction.
- `.glass-lens` (glass-refract.css) is the real refraction (the squircle displacement map bending the backdrop) — BUT it carries NO dispersion fringe; the bent backdrop has no spectral split at the rim.

This wave WIRES them: the `.glass-lens` rim composes the `--glass-edge-dispersion` fringe AT the refracting edge, so the dispersion reads as the SPECTRAL split of the light the lens is actively bending (the warm fringe on the lens's warm-shift edge, the cool on the cool-shift edge), DIRECTIONAL with the lens's own displacement axis. The fringe rides the SAME `prefers-reduced-transparency` bracket the dispersion already carries (it is a transparency garnish — dropped under `reduce`).

**The betters-claim:** Apple's lens dispersion is a fixed rim fringe; glass-ui's composes the warm/cool spectral split onto the ACTIVE refraction edge (the displacement-bent backdrop gets its prismatic split AT the bend), and the fringe is the warm-cream/NCSU-warm biased pair (NOT iOS-blue — the warm-cream identity), so the prism reads as warm-craft glass, not cold tech glass.

---

## Starting state — the exact HEAD src + the born-RED anchor (verified on disk)

**`src/styles/tokens/glass-fx.css:215-226` — VERIFIED by reading.** `--glass-fringe-warm: oklch(0.92 0.06 40 / 0.22)` + `--glass-fringe-cool: oklch(0.90 0.05 230 / 0.16)` + `--glass-edge-dispersion: inset 0.75px 0 0 0 var(--glass-fringe-warm), inset -0.75px 0 0 0 var(--glass-fringe-cool);` — the warm/cool directional inset-fringe pair EXISTS (AW.W23). The comment: "the two directional inset rings read as light refracting through the glass edge."

**`src/styles/glass/surfaces.css:388-400` — VERIFIED.** The dispersion is consumed ONLY by `.glass-chromatic`:
```css
@media (prefers-reduced-transparency: no-preference) {
    .glass-chromatic { box-shadow: var(--glass-edge-dispersion), var(--glass-material-rim); }
}
```
**The born-RED anchor:** `--glass-edge-dispersion` is consumed by `.glass-chromatic` (a standalone garnish) and NOWHERE ELSE (grep `glass-edge-dispersion` → exactly 2 hits: the mint at glass-fx.css:223 + the `.glass-chromatic` consumer at surfaces.css:398). **The `.glass-lens` refractive rim does NOT compose the dispersion** — the lens has refraction but no spectral split.

**`src/styles/glass-refract.css:106-114` — VERIFIED.** The `.glass-lens` / `.glass-material.glass-lens` rule composes the `#glass-refract` displacement filter INSIDE the `@supports (backdrop-filter: url(#…))` block (Chromium-only). The lens carries the `--glass-blur-resting` + the refract filter — NO `box-shadow` dispersion fringe.

**Born-RED summary:** the dispersion fringe exists but is wired ONLY to `.glass-chromatic`; the `.glass-lens` rim has no spectral split. The gate (a source assert that the lens composes `--glass-edge-dispersion`) reds at HEAD until the wiring lands. The π getImageData over the lens rim reads no warm/cool fringe split at the refraction edge — RED until wired.

---

## Build — the mechanism on the named existing substrate

**WIRING the EXISTING dispersion onto the lens rim — ZERO new token, ZERO new mechanism (the fringe is shipped; this composes it onto the lens).** Sequenced AFTER BE.W-LENS-SAFARI establishes the cross-engine lens rim.

1. **Compose the dispersion onto the `.glass-lens` rim.** In `glass-refract.css` (or the lens rim seam BE.W-LENS-SAFARI establishes), the `.glass-lens` `box-shadow` rim composes `--glass-edge-dispersion` AT the rim (beside the `--glass-material-rim`), under the SAME `@media (prefers-reduced-transparency: no-preference)` bracket the `.glass-chromatic` consumer uses:
   ```css
   @media (prefers-reduced-transparency: no-preference) {
       .glass-lens { box-shadow: var(--glass-edge-dispersion), var(--glass-material-rim); }
   }
   ```
   The fringe is an `inset box-shadow` (a PAINT property, compositor-safe — no layout). It rides the lens rim where the displacement map bends the backdrop, so the spectral split reads AT the refracting edge.
2. **Directional coupling (the betters-move — optional refinement).** The dispersion fringe is DIRECTIONAL (warm one edge, cool the other — the `inset 0.75px` vs `inset -0.75px`). On the lens, bias the fringe direction to the lens's displacement axis (the squircle map shifts the R channel horizontally, G vertically — the warm fringe biases the R-shift edge). This is a `--glass-lens-dispersion-bias` knob (default the existing left/right split) — a consumer dials it; the default reads correctly.
3. **The press coupling (the lens already swells under `:active`).** The lens's `--glass-btn-press-t` press-swell (the displacement scale couples to the press) — the dispersion fringe INTENSIFIES with the press (a `--glass-edge-dispersion` whose alpha reads the press-t), so the spectral split blooms as the glass deforms under press. This rides the EXISTING `--glass-btn-press-t` drive (no new press path) — the fringe alpha couples to it (the W-MOTION-CANON P3 fade-coupled-to-transform — the dispersion is the EFFECTS leg of the press SPATIAL leg).

**Compositor-only / Safari-safe / PRM notes:** the fringe is an `inset box-shadow` (paint, no layout) — `proof:no-layout-animation` GREEN. The dispersion rides the `prefers-reduced-transparency: no-preference` bracket (dropped under `reduce` — it is a transparency garnish, the accessibility floor; the existing AW.W23 discipline). Under `prefers-reduced-motion`, the press-coupled intensification snaps (the press itself is PRM-snapped — no in-between fringe frames). The fringe is `box-shadow` (works on Safari — the dispersion is the cross-engine rim garnish, NOT a `url()` filter; it composes onto BE.W-LENS-SAFARI's cross-engine lens rim, so Safari gets the prism even where the displacement filter is Chromium-only — the rim fringe is the cross-engine floor of the prism, the displacement bend the enhancement).

---

## Gate — proof:lensing EXTENDED (the dispersion-on-lens clause), born-RED → GREEN

**EXTEND `proof:lensing` in place (NOT a new gate) — add the dispersion-on-lens clause.** `proof:lensing` (scripts/proof-lensing.mjs, L1-L6) is the EXISTING lens source gate (verified property-only — L2 hasCrossedGradients regex, L4 press-path regex). Born-RED: the new clause asserts the lens composes the dispersion — RED at HEAD (the lens has no fringe).

- **L7 (NEW) — the lens rim composes the dispersion.** Assert `.glass-lens` composes `--glass-edge-dispersion` in its `box-shadow` rim (the WIRING — the dispersion is no longer `.glass-chromatic`-only). RED at HEAD (the lens carries no dispersion).
- **L8 (NEW) — the dispersion rides the transparency bracket.** Assert the lens-dispersion composition is INSIDE `@media (prefers-reduced-transparency: no-preference)` (the garnish drops under `reduce` — the AW.W23 discipline). RED if the fringe leaks the bracket.
- **L9 (NEW) — the press coupling reads the EXISTING press-t.** Assert the dispersion intensification (if wired) reads `--glass-btn-press-t` (NOT a new press path — the W-MOTION-CANON P3 coupling). RED if a second press drive is forked.
- **The self-test bite:** a lens with NO dispersion fringe → L7 RED ("the lens refracts but does not disperse — the prism is incomplete"); a dispersion fringe OUTSIDE the `no-preference` bracket → L8 RED (the garnish must drop under reduce); a fringe coupling a NEW `--lens-press` drive instead of `--glass-btn-press-t` → L9 RED.

**Extend-vs-new:** EXTEND `proof:lensing` (the lens gate) in place — the dispersion-on-lens is a lens property, the same gate's domain (NOT a 2nd gate; the `--glass-edge-dispersion` mint is already gated by its existence, the WIRING is a lens clause). The `proof:lensing-safari` gate (BE.W-LENS-SAFARI) owns the real-displace rim-vs-interior pixel readback; PRISM's L7-L9 are SOURCE clauses on `proof:lensing` + the dispersion fringe reads in the π.

---

## π — the binding paint readback

**Extend `tests-visual/lensing.spec.ts` (Chromium + WebKit, LOCAL real-render) — the dispersion-on-lens arm.** VISUAL wave → a `proof:ba-gestalt` glass/CTA verdict + a captured DELTA, both modes. NO source-green close; "is GREEN at this wave close; W-REFLECT re-confirms on the union tree" FORBIDDEN (G8).

- **The binding readback (the prism reads):** mount a `.glass-lens` surface over a busy backdrop and getImageData ACROSS the lens rim band — sample the rim's left edge vs right edge and assert a WARM hue shift on one edge + a COOL hue shift on the other (the spectral split — the dispersion fringe reads at the refracting rim). proof:lensing's existing π is getComputedStyle-only (no getImageData — verified lensing.spec.ts:72-90); THIS arm adds the REAL pixel fringe readback. BEFORE: the lens rim has no warm/cool split (refraction without dispersion). AFTER: the warm fringe ΔE on one edge, cool on the other.
- **The press-bloom arm:** capture the lens at rest vs `:active` and assert the dispersion fringe INTENSIFIES under press (the spectral split blooms with the deform — the coupled EFFECTS leg).
- **Both modes + Safari (where liquid):** the WebKit project asserts the dispersion fringe paints on Safari (the rim fringe is the cross-engine floor of the prism — `box-shadow`, not `url()`; it composes onto BE.W-LENS-SAFARI's Safari lens rim so the prism reads on Safari even where the displacement bend is Chromium-only).
- **PRM:** under `prefers-reduced-transparency: reduce` the fringe DROPS (the garnish gone, the lens still refracts) — the π asserts the fringe is absent under reduce (the accessibility floor).
- **The captured DELTA** at `docs/tranches/BE/audit/visual/W-LENS-PRISM-DELTA.md` — the lens rim with the warm/cool spectral split vs the bare-refraction lens, the press-bloom, the reduce-drop, both modes. **G7-revokable** via surface-hash freshness on `glass-refract.css`/`glass-fx.css`/`surfaces.css`.

---

## Jubilance — the sited delights

- **FLOOR — the prismatic edge-split.** The lens rim shows the warm/cool spectral split AT the refracting edge (the iOS-27 polished-glass cue) — the delight is the light splitting into its spectrum as the glass bends it. Sited at the lens rim.
- **OPT-IN/FLOOR — the press-bloom.** The spectral split INTENSIFIES as the glass deforms under press (the coupled EFFECTS leg) — the prism blooms with the gesture. Compositor-only (the fringe alpha reads the press-t), PRM-snapped.
- **The fences keep it CALM** — the fringe is a 0.75px inset, low-alpha (0.22/0.16), warm-cream-biased — a polished-glass garnish, NOT a disco rainbow (the §6 calm register; the disco family stays gone).

---

## Fences — what stays byte-untouched / warm-cream identity / no-legacy

1. **The dispersion token is byte-untouched** — `--glass-fringe-warm`/`--glass-fringe-cool`/`--glass-edge-dispersion` (glass-fx.css:215-226) are NOT re-minted; this is WIRING the EXISTING fringe onto the lens (the `.glass-chromatic` consumer stays — the fringe gains a SECOND consumer, the lens).
2. **The lens displacement filter is byte-untouched** — the `#glass-refract` data-URI, the squircle map, the `scale='28'` (glass-refract.css) are unchanged; the dispersion is an ADDITIVE `box-shadow` rim, never a filter-graph edit (the §7 GL/SVG-filter fence — the displacement map carries ZERO color, the fringe is the rim garnish).
3. **The warm-cream identity holds** — the fringe is the warm-cream/NCSU-warm biased pair (`oklch(… 40)` warm + `oklch(… 230)` low-alpha cool — NOT iOS-blue); the prism reads warm-craft, not cold-tech.
4. **The transparency bracket is binding** — the dispersion rides `prefers-reduced-transparency: no-preference` and DROPS under `reduce` (the AW.W23 garnish discipline — accessibility absolute).
5. **The press coupling reads the EXISTING drive** — `--glass-btn-press-t` (the W-BUTTON-GLASS / W-PRESS-UNIFY press) — NO second press path (the one-drive discipline).
6. **HARD sequence after LENS-SAFARI** — PRISM reads the lens rim LENS-SAFARI establishes (the cross-engine floor); it is NOT scheduled parallel. No legacy: the lens gains the dispersion (additive); no retirement.
7. **Safari-safe via the rim fringe** — the dispersion `box-shadow` is the cross-engine prism floor (Safari paints it); the displacement bend stays the Chromium enhancement (the lens is two-tier, BE.W-LENS-SAFARI's architecture).

**Risk:** the fringe over the ACTIVE refraction (the bent backdrop) may double-up with the displacement's own chromatic-looking edge — the π over the rim band is the calibration (the fringe should READ as a distinct warm/cool split, not a muddy double-edge); the 0.75px / low-alpha keeps it subtle. The fringe is the deliverable; the directional bias is the consumer's dial.
