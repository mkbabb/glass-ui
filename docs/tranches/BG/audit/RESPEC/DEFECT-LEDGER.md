# LIVE-INTERACTION DEFECT LEDGER — user-reported, the re-spec must address

These are LIVE / INTERACTION defects (cursor-move, hover, scroll) the device-free gates + static captures
CANNOT catch — they only surface in a real browser with pointer interaction. Each is a first-class input to
the re-spec: the audit must DIAGNOSE (live-browser repro + source root-cause) then SPEC a fix-wave. "Likely
introduced by us" — treat as regressions from the BB→BG band, not as designed behaviour.

The LIVE-INTERACTION DEFECT-HUNT (a dedicated batch-3 workflow, run as the immediate next workflow — NOT
concurrent with the running re-spec Pass 1, to avoid the rate wall) reproduces each on a real Chrome (DevTools
MCP / the C18 capture harness with synthetic pointer-move) + real Safari, root-causes it in src/, and writes
the fix-spec here. Then the fix-waves fold into the amended tranche plan.

---

## D-1 · Constellation: ALL dots track the cursor and shift around  ★ HIGH (user-reported, obvious)

**Report:** "the constellation dots — ALL of them — track the cursor and shift around."

**Root-cause CONFIRMED (orchestrator source-read 2026-06-29 — diagnosis-complete, fix is a clean one-token wave):**
`DEFAULT_PARALLAX = 0.08` (`constants.ts:143`), default-ON for EVERY instance (`Constellation.vue:49 parallax: 0.08`),
applied to ALL nodes via `parallaxNodePos` (`constellationField.ts:359-374`): `ox = (pointer.x − cx) · parallax · z`,
`oy = (pointer.y − cy) · parallax · z`. So at the canvas edge a deep node (z≈1) shifts by `(w/2)·0.08 ≈ 4% of width`
≈ **24–48px of WHOLE-LATTICE slide** that tracks the cursor — exactly the report. The source comment claims 0.08 is
"SUB-PERCEPTUAL … not a behavior break"; the user perceives otherwise, so the claim is FALSE at 0.08.
**THE FIX (well-specified, the live-hunt only picks the value + verifies the π — the cause is found):** drop
`DEFAULT_PARALLAX` to genuinely sub-perceptual (≈0.02, ≤~6px edge-shift) OR default it OFF (0, opt-in depth) — per the
user's "reads as a bug," default-OFF/near-zero is favored. Clean break (no alias). Update `constants.ts` +
`Constellation.vue` default + any story relying on it; the π is a pointer-sweep frame-series asserting distant-node
displacement ≈ 0. ≥2-consumer bar already met (every Constellation instance).

**(For completeness — NOT the culprit, do not touch):**
The culprit is the **parallax-depth screen offset**, NOT the local lean.
- `constellationField.ts:~71` — the projection applies, to EVERY node, a screen-position offset
  `parallax · z · (pointer − center)` (BC.W-VIZ-CONSTELLATION §6 "Awwwards living depth"). Because it is applied
  to ALL nodes (each carries a depth `z ∈ [0,1]`), a moving cursor slides the WHOLE lattice — exactly "all dots
  track + shift." If `parallax` is too large, default-on where unwanted, or not center-relative-bounded, this
  reads as a bug.
- `constellationTypes.ts:~330` — the `parallax` config member + its default.
- The `stepField` LOCAL lean (`constellationField.ts:160-199`) is correctly distance-gated
  (`d > 0.5 && d < infl=180·k`) — only nodes WITHIN 180px lean. This is NOT global; it is NOT the bug. Do not
  "fix" the lean.
- The BB.B4 `usePointerVelocityField` momentum term (lines 172-197) is ALSO inside the distance gate — bounded
  (`VEL_LEAN_CAP 0.16`), so not the global-shift cause either.

**Fix direction (to be confirmed by the live-hunt):** tune the parallax magnitude DOWN to a sub-perceptual
depth cue (or gate it to near-cursor nodes via the same `z`-and-distance falloff), make it honestly opt-in /
PRM-off, and verify on a live pointer-sweep that distant dots are effectively still. Keep the intended local
gather + the depth READ; kill the whole-lattice slide. ≥2-consumer + π (pointer-sweep frame-series: distant-node
displacement ≈ 0) lock it.

**Verify route:** the constellation story (motion/constellation or wherever it mounts) + any page embedding it.

---

## D-2 · Paper grain issues  ★ MED (user-reported "paper grain issues, etc.")

**Report:** "the paper grain issues" — folds the earlier "awful metallic wash on sub-category items" family.

**Candidate regressions:**
- `3f200f1d` BG.W-PAPER-GRAIN-OPTIN — demoted the UNIVERSAL 0.22 grain plane to per-surface opt-in (removed the
  AppShell `<PaperBackdrop>` mount; grain is now `paper-grain-overlay`/`<PaperBackdrop>` opt-in). Risk: grain now
  ABSENT where a surface expected the universal plane (a flat/under-textured page), OR the opt-in surfaces
  over-grain. Already-fixed sibling: 10.25 BG.W-CATEGORY-CARD-WARM (the metallic-wash on category cards). Confirm
  no OTHER surface still reads cool/metallic or grain-dead.
- `274a2a6e` BG.W-FIELD-AURORA — retired `.paper-field` onto the recessive shell `<Aurora>`. Risk: interaction
  between the shell aurora field + per-surface grain reading wrong on some routes.

**Fix direction:** live-survey the category/foundations/forms pages for grain-dead or metallic-wash surfaces;
spec the per-surface grain application so every page that should read tactile-warm does, none reads gray/metallic.

---

## D-3 · Dock issues  ★ MED (user-reported "the dock issues, etc.")

**Report:** "the dock issues."

**Candidate regressions / open items:**
- `cd9ce46` BG.W-GLASS-BLUR-PEER [paint-pending] — demoted the dock off glass-deep onto the unified 8px blur leg.
  Risk: dock legibility/depth regression vs the prior deep-glass dock; the paint is still PENDING (unverified).
- The standing dock feedback cluster (project memory: dock re-architecture + rail, morph hover flicker, persistent
  controls, iOS hover register, dynamic darkening) — confirm which are LIVE-broken vs already-closed.
- WS2 dock convergence (rows 4.x) is PENDING — the dock-morph-unify / busy-single / cut work is unbuilt; the live
  dock issues may be pre-existing items WS2 was meant to fix.

**Fix direction:** live-survey the dock across routes (hover, collapse/expand morph, rail, both modes); enumerate
the concrete live defects; map each to a KEEP/AMEND in WS2 or a new fix-wave.

---

## Process note
The live-defect-hunt is the BINDING diagnosis (live repro + source root-cause + π). The hypotheses above seed it;
they are NOT the verdict. Every fix-wave that results folds into the amended tranche plan at `RESPEC.md`, and the
constellation D-1 (user-reported, obvious, high) is a named must-fix in the final wave set.
