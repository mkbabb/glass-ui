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

**✅ FIXED — commit `07c6e6ec` (BG live-fix D1-constellation), dual-engine verified.**
`DEFAULT_PARALLAX 0.08 → 0` (`constants.ts`, default-OFF / opt-in depth — clean break, no alias) + `Constellation.vue`
`withDefaults` re-pointed to read the ONE constant (was the hardcoded `0.08`), so all three read sites resolve to the
single source. `parallaxNodePos` early-returns the unshifted node when `parallax<=0`, so the bare lattice never tracks
the cursor; a consumer wanting living-network depth passes `parallax` explicitly (e.g. sub-perceptual `0.02`). Chosen
`0` over `0.02` because on the 6180px-tall StoryHero background canvas even `0.02` slides perceptibly (off-screen
parallax origin). **Live measure:** Chrome CDP center→corner slide `58.1px → 5.7-6.3px` (drift control 2.0-2.8px),
corner→opp-corner `67.1px → 4.0px` (full-range tracking killed). WebKit JS-engine level verified on the live route
(`parallax0_offsetPx=0` fix vs `parallax008_offsetPx=40` defect; canvasCount=10, no render regression) — real Safari
off-screen WKWebView cannot snapshot the live WebGPU/WebGL2 canvas (known WebKit GPU-layer limitation, NOT a fix
issue). Gates: `vue-tsc --noEmit` 0, `proof:constellation-field` 41/41, `proof:viz-constellation`/`-tokens`/`-gen`/
`-substrate-single` PASS. DELTA + PNGs at `docs/tranches/BG/audit/visual/live-fixes/D1-constellation/`.

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

**✅ FIXED — commit `e40e5095` (BG live-fix D2-paper-grain), dual-engine verified.**
Root cause CONFIRMED: `3f200f1d` (BG.W-PAPER-GRAIN-OPTIN) + `274a2a6e` (BG.W-FIELD-AURORA) retired the universal warm
`<PaperBackdrop>`/`.paper-field` plane, so the saturate=0 GRAY grain tooth (which by paper.css LIBRARY FENCE derives
warmth from the SUBSTRATE behind it) had no warm substrate on the foundations STORY pages — desaturating those surfaces
below the BA.W-NO-GRAY warm-chroma floor (C 0.02). The 10.25 W-CATEGORY-CARD-WARM fix covered only the category-landing
bento sub-cards; the same class was still live on `/foundations/paper-glass` (glass-tier tiles C 0.009-0.015) and
`/foundations/paper-texture` (6× `<PaperBackdrop>` `position:fixed` grain planes escaping their panels into a full-page
gray noise wash), plus the StoryHero `--story-paper-wash` was transparent in LIGHT (grain read DEAD in Chrome / GRAY in
Safari). **Demo-local fix (library grain utility BYTE-UNTOUCHED — the gray-tooth-warmth-from-substrate fence holds; the
W-CATEGORY-CARD-WARM precedent):** (1) `paper-glass.vue` wraps the tier-tile grid in `.paper-glass-tier-field` with a
recessive WARM CSS radial (`::before`, oklch warm hue 62, isolation:isolate, z-index:-1) + a `.dark` warm-ember arm +
a `prefers-reduced-transparency` warm-solid floor (NO live GL); (2) `paper-texture.vue` `contain:paint` on every
`<PaperBackdrop>` wrapper (`.paper-grain-host`) contains the `position:fixed` grain per-panel + wires
`--paper-underpaint-color` to the scope panel `background-color`; (3) `story-hero.css` `--story-paper-wash` LIGHT
`transparent → color-mix(in srgb, var(--card) 70%, transparent)` (mirrors the working dark arm); (4)
`scripts/proof-demo-radial-calm.mjs` adds `foundations/paper-glass.vue` to the documented `RADIAL_KEEP_FILES` allowlist
(the gate's own prescribed remedy + the exact SectionLanding precedent). **Measured:** paper-glass tiles `C 0.009-0.015
→ C 0.02-0.045 warm (H67-78°)`, paper-texture full gray wash → warm-cream page with per-panel grain, StoryHero hero
page-bg hue H56-74° (warm band). Both engines, both modes. Gates: `proof:demo-radial-calm`, `-no-paper-field`, `-stage`,
`-category-card-warm`, `-no-gray`, `-suffuse`, `-demo-design` PASS; `vue-tsc --noEmit` 0. DELTA + PNGs at
`docs/tranches/BG/audit/visual/live-fixes/D2-paper-grain/`. **RELATED-BUT-OUT-OF-SCOPE (documented, NOT fixed — the
shell/field hunter's domain):** the StoryHero WASH-CARD (the big translucent hero card on grain pages) reads gray-cream
because it is a translucent wash plate over the RECESSIVE center shell aurora (not a grain surface); `/foundations/intro`
category-card header zones read gray on a bespoke colorful hero page.

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

**✅ FIXED (the discrete live regression) — commit `8947288a` (BG live-fix D3-dock / BG.W-DOCK-COLLAPSE-DIR), dual-engine verified.**
Root cause CONFIRMED: the `--dock-live` convex-blend SIZE scalar (`src/styles/dock/layers.css`) read the raw morph
PROGRESS `--dock-morph-t` (always 0→1) instead of the DIRECTIONAL `--dock-expand-t` (the expanded-ness `morph.css`
derives: expand `t`, collapse `1−t`). Reading the raw progress made the convex blend `collapsed + Δ·t` play
collapsed→expanded for BOTH directions — correct on expand, but on COLLAPSE it ballooned the box UP to the full
expanded footprint (~440px reversal), held there as the spring settled at t=1, then SNAPPED to collapsed when
`[data-morphing]` cleared (the live "morph hover flicker"). The chrome (bg/border/blur) + child stagger were ALREADY on
the directional scalar; the fix aligns SIZE with them: `clamp(0, var(--dock-morph-t,1), 1) → clamp(0, var(--dock-expand-t,1), 1)`.
Expand is byte-identical (`.expanded[data-morphing]` derives `--dock-expand-t == --dock-morph-t`); only
`.collapsed[data-morphing]` (`1−t`) changes, so the collapse now shrinks monotonically expanded→collapsed with NO
reversal. Compositor-only (drives `scale` via `--dock-size-scale`, no layout property animates). The E4 gate fact
(`proof:dock-engine`) was updated to assert the directional `--dock-expand-t` AND **tightened to pin the match to the
blend clamp** (`clamp(0, var(--dock-expand-t`) so a revert to the raw `--dock-morph-t` genuinely REDs the gate (verified:
reverting line 92 to the bug → E4 FAIL; restoring → PASS). **Dual-engine:** Chrome CDP (ANGLE Metal M5 Max) live trace
shows the collapse shrinks monotonically 496→59 with ZERO reversal (cycle 2/3 endSnap=0); Playwright WebKit corroborates
(reversals >30px up = 0); real Safari/WKWebView confirms the resting dock paint is unregressed (the fix touches only the
in-flight morph). Gates: `proof:dock-engine`, `-dock-morph-family`, `-dock-arbitrary` PASS, `proof:no-layout-animation`
LOCKED; `proof:dock-no-scale-pop` device-free W1/W2 arm PASS (the live W3/W4 arm fail-closes only for lack of a running
`:5199` demo — a local-only π arm, not a CI regression); `vue-tsc --noEmit` 0. DELTA + PNGs at
`docs/tranches/BG/audit/visual/live-fixes/D3-dock/`.

**RECORDED — NOT fixed (out-of-scope of the discrete regression repair):**
- **Residual first-collapse-only 15px end-snap (44→59) on a dock that starts EXPANDED.** `--dock-collapsed-px` holds its
  seeded floor (~44) until the ResizeObserver measures the resting collapsed render (59) after the first collapse, so
  cycle 1 ends with a 15px snap, cycles 2+ are endSnap=0. Default docks (`startCollapsed:true`) measure the box at mount
  so their first collapse is already clean. A `dockMorphMeasure.ts` seed-staleness, orthogonal to the directional fix,
  far milder than the fixed 440px balloon; chasing it risks the device-free endpoint gates for negligible gain.
- **WS2 dock convergence rows 4.x** (dock-morph-unify / busy-single / cut) remain UNBUILT per the re-spec — the
  directional-blend fix is the discrete live regression repair, NOT the WS2 architectural convergence.

---

## Process note
The live-defect-hunt is the BINDING diagnosis (live repro + source root-cause + π). The hypotheses above seed it;
they are NOT the verdict. Every fix-wave that results folds into the amended tranche plan at `RESPEC.md`, and the
constellation D-1 (user-reported, obvious, high) is a named must-fix in the final wave set.
