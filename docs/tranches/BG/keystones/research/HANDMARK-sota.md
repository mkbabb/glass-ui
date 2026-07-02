# HANDMARK — SOTA research (KS-B, lane HANDMARK)

**Scope:** the hand voice in digital design, 2026, grounding wave **14.3 W-HANDMARK-PERFECT**
(+ the pencil-boil arm absorbing 14.4) and the **three-underline-register fence** (binding context).
Fence: research only; no src edits. Build on the shipped facility (`src/components/custom/handmark/`)
and the BD GOLDEN (`docs/tranches/BD/greenfield/handmark/GOLDEN.md`) — this report gives the SOTA
verdicts the keystone spec cites, it does NOT re-derive the design.

The facility today: a 12-scalar/4-enum `Brush` continuum → `ink.ts` (`ribbon:'stroke' | 'hull'`) →
vendored perfect-freehand → static seeded `feTurbulence` grain, headless clock in `useHandMark.ts`,
real-baseline measure in the SFC. `aria-hidden` overlay, `mulberry32` house seed. The one weak mark is
`naturalUnderlinePoints` (`geometry.ts:68`) — a sinusoid that reads as a spell-check squiggle
(autocorr peak ~0.8). The GOLDEN already SPIKED the fix (φ-incommensurate value-noise, born-RED→GREEN).

---

## 1. Variable-width stroke — the pressure engine

**perfect-freehand** (steveruizok, MIT — https://github.com/steveruizok/perfect-freehand). Two-step:
spline the input points, then build the outline; width is driven by per-point pressure. With no stylus
data it **simulates pressure from inter-point distance** (close points = slow = thick; far = fast =
thin), tuned by `thinning`/`smoothing`/`taper`(start,end)/`cap`. This is the frontier default (tldraw,
Excalidraw pencil).
- **ADOPT — already vendored** (`freehand.ts`, treeshaken unless a brush uses `ribbon:'hull'`). The
  GOLDEN's routing of `boil`/`crayon`/`marker` through the hull is exactly the right use of it — a wax
  stick and a juicy marker MUST swell and taper, not render as flat rulers.
- **REFINE beyond pf's default:** pf simulates pressure from *velocity* (a static seeded path has none).
  The GOLDEN feeds `addPressure` a **curvature-coupled** swell instead (straight → high pressure → thick;
  tight wobble → low pressure → thin). This is the correct physical model for a *deterministic* mark
  (a hand presses harder on straights) and is the single move that turns "a wiggly line" into "a pen
  line." SOTA-consistent, and stronger than pf's velocity heuristic for our seeded case. **Keep it.**
- **taper asymmetry:** pf exposes `taper.start`/`taper.end`; the GOLDEN's √φ run-out (`{start:14,end:22}`)
  matches real ink physics (lift-off tail longer than the nib-down lead). Sound.

## 2. The sketch aesthetic — and the cautionary tale

**rough.js** (pshihn — https://roughjs.com/ · algorithms: https://shihn.ca/posts/2020/roughjs-algorithms/):
every point gets a random offset scaled by a `roughness` scalar; fills are crosshatch. **Excalidraw**
builds its whole identity on it — imperfect lines "signal informal + evolving, reduce the pressure to be
perfect."
- **REJECT as an engine.** rough.js is a *shape-sketcher* (jittered polylines + hatch fill) — the wrong
  register for a warm variable-width **ink** mark over text. Our hull body is the right primitive.
- **ADOPT the lesson (load-bearing):** Excalidraw issue **#7239** — *"Adaptive roughness reduces
  hand-drawn feel"* (https://github.com/excalidraw/excalidraw/issues/7239) — documents that scaling
  roughness DOWN by object size **killed the hand character**; users could no longer feel the hand even
  with "sloppiness" on. This is the direct evidence for the GOLDEN's `NOISE_AMP_FRAC = 0.05` (~2.3× the
  HEAD 0.022): **the wobble must be VISIBLE.** A sub-perceptual amplitude is the failure Excalidraw shipped
  and had to walk back. The keystone's gestalt bar should read "the mark reads HAND-made at a glance,"
  never "technically wobbled but visually clean."

## 3. The boil (living line) — and why we do NOT filter it

Traditional **line-boil** = redraw the same frame with tiny variation; played back the differences
vibrate. The web SOTA is **feTurbulence + feDisplacementMap**, driven by SMIL, stepping `baseFrequency`
through discrete values (Visini, widely shared HN Jul-2025 — https://camillovisini.com/coding/simulating-hand-drawn-motion-with-svg-filters ;
no-JS variant https://kirgroup.net/blog/2025/07/21-SVG-Hand-Drawing-without-js.html): typical
`numOctaves=2`, `seed=1`, `scale≈5`, `<animate baseFrequency="0.01;0.025;0.015;0.03" calcMode="discrete"
dur=".9">` → **4 discrete frames ≈ 4.4 fps.** The universally-reported truth: **a LOW frame rate (~8-12fps,
discrete) reads as hand-drawn; smooth 60fps reads as digital-wobble** (Paper Animation on the boil effect —
https://paper-animation.com/blog/understanding-boil-effect-animation).
- **REJECT the filter mechanism for our boil.** Animating `feDisplacementMap` repaints the whole filter
  region **every frame** — a GPU-hostile per-frame filter storm that violates our compositor-only +
  `proof:offscreen-pause` floor, and it is non-deterministic across engines (Chrome vs Safari turbulence
  differ). Our boil is **filter-FREE**: the wobble lives in the control points (φ-incommensurate value
  noise off `mulberry32`), so it is deterministic, seedable, and cheap. This is the *correct* divergence
  from SOTA — we get the hand vibration without the repaint cost.
- **ADOPT the CADENCE.** The living-line clock (`useLineBoil`) should cycle at a **discrete ~10-12fps**,
  not smooth rAF — that is the single parameter the whole field agrees on. Cite the ~4.4fps SMIL default
  as the floor and ~12fps as the ceiling; anything at 60fps looks wrong. (Verify the shipped
  `useLineBoil` frame cadence against this in execution.)
- **PRM:** the boil is decorative continuous motion → the clock must early-return static under
  `prefers-reduced-motion` (already the shipped behavior; keep it inviolable).

## 4. The highlighter — translucency + blend over text

CSS-frontier realistic highlighter (pugson, max.hn — https://max.hn/blog/how-to-create-a-highlighter-marker-effect-in-css):
a **`mix-blend-mode: multiply`** band (marker ink darkens the text beneath, ink-on-ink, never occludes it),
a **gradient that ramps opacity low→high→low** (the pen lays less color at the run-out — the physical
taper), **uneven `border-radius` + negative margins** for the not-held-straight edge, SVG for the frayed
edge. MDN: multiply "always as dark as the background" (https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode).
- **ADOPT — and note our lead is stronger.** Our highlighter already ships the hull variable-width body
  (the real "frayed edge") + the `HIGHLIGHT_RISE` low-seat on the x-height band + `mix-blend-mode:
  multiply` **un-walled** (the `.hm` root carries NO `isolation:isolate`, so the band composites against
  the page text behind it — the exact stacking-context trap the CSS-only recipes warn about). The GOLDEN's
  gradient-opacity taper maps 1:1 onto pf's `taper.end` run-out on the hull — we get the low→high→low ramp
  as *stroke width*, not a background gradient. Keep multiply; do not swap to `screen`/`overlay` (those
  read as glow, not ink).

## 5. Where the hand voice WORKS vs kitsch (the editorial restraint line)

The frontier consensus (award editorial + annotation UIs): the hand mark earns its place as **emphasis,
marginalia, correction, wayfinding, and celebration** — a *single deliberate* mark that says "a human
pointed here." It becomes kitsch when it is the *default body texture* (everything wobbles), or when it
competes with content color. This is the same proportion law as our one-color-event rule.
- **ADOPT as the acceptance line:** the calm underline is `weight:0` (no bounce, no cast); the **cartoon
  weight (anticipation + nib-bead + cel-cast) is OPT-IN and reserved for DRIVER marks** — the ℱ-redraw
  showpiece and the gold completion-seal (a celebratory/hero mark earns the punch; body copy does not).
  This is exactly the GOLDEN Move-3 restraint (loud is opt-in, calm is default) and it is the correct
  editorial line. The keystone should state the ceiling explicitly: **no more than one hand-mark event
  per surface**, mirroring `.section-label--tinted` / one-color-event.
- **The three-underline-register fence stays binding** (README §0.6): `.paper-ink-mark` (straight
  structural hairline — NEVER wobbled) vs `HandMark shape="underline"` (the hand wobble) vs the deck-local
  red-pen glyphs (consumer CSS, not this family). One pencil-boil engine under every wobble; zero wobble
  under the structural mark. This IS the restraint line made structural — keep it.

## 6. Accessibility of decorative marks

Frontier a11y (TPGI, Smashing "Accessible SVG Patterns," Scott O'Hara):
- **Decorative** SVG (the emphasis underline/highlight/circle over already-readable text) → **`aria-hidden="true"`,
  no `<title>`/`<desc>`** — omit from the a11y tree so it is not double-announced. The slotted word stays
  real selectable text.
  https://www.smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/ ·
  https://www.tpgi.com/using-aria-enhance-svg-accessibility/
- **Informative** graphic → `role="img"` + accessible name (`aria-label`/`aria-labelledby`).
- **ADOPT — already correct.** Our marks are `aria-hidden` overlays (decorative-over-real-text = the
  textbook case). The **completion-seal keeps its `role="status"`/`aria-live` shell** — that is the ONE
  place the mark carries meaning the text alone does not convey (a state change), so it is the correct
  exception, not a family inconsistency. The keystone should record: hand marks are `aria-hidden` by
  construction; the seal's live-region is the sanctioned exception; the ℱ-egg (long-press easter egg) is
  decorative and hidden.

---

## Verdict summary

| SOTA input | Verdict | Where it lands |
|---|---|---|
| perfect-freehand variable-width + simulated pressure | **ADOPT** (vendored) | hull body for boil/crayon/marker |
| pf velocity-pressure default | **REFINE** → curvature-coupled | `addPressure` swell (GOLDEN Move 1) |
| rough.js sketch engine | **REJECT** (wrong register) | — |
| Excalidraw #7239 adaptive-roughness regression | **ADOPT the lesson** | `NOISE_AMP_FRAC=0.05` — wobble must be VISIBLE |
| feTurbulence+feDisplacementMap SMIL boil | **REJECT mechanism** (repaint storm, non-deterministic) | filter-free control-point noise instead |
| ~4.4-12fps discrete boil cadence | **ADOPT** | `useLineBoil` discrete ~10-12fps (verify shipped) |
| highlighter `mix-blend-mode: multiply` + opacity taper | **ADOPT** (already led) | multiply un-walled + hull run-out taper |
| editorial restraint (one deliberate mark) | **ADOPT as ceiling** | weight>0 opt-in; ≤1 hand-event/surface |
| `aria-hidden` decorative / `role=img` informative | **ADOPT** (already correct) | marks hidden; seal keeps `role=status` |

**The gestalt bar for 14.3:** the mark reads **hand-made at a glance** (Excalidraw #7239 — never
sub-perceptual), the boil **vibrates like a living line** at a discrete low cadence (never 60fps-smooth,
never a filter storm), the highlighter **darkens like real ink** (multiply, un-walled), the calm body
underline stays **quiet** (weight 0) while a hero/celebration mark **earns its cartoon punch** (weight>0) —
warm, deterministic, compositor-only, PRM-clean, one hand-event per surface.

### Sources
- perfect-freehand — https://github.com/steveruizok/perfect-freehand · https://www.npmjs.com/package/perfect-freehand
- rough.js — https://roughjs.com/ · algorithms https://shihn.ca/posts/2020/roughjs-algorithms/
- Excalidraw adaptive-roughness regression — https://github.com/excalidraw/excalidraw/issues/7239
- SVG hand-drawn motion (Visini) — https://camillovisini.com/coding/simulating-hand-drawn-motion-with-svg-filters
- No-JS SVG boil (kirgroup) — https://kirgroup.net/blog/2025/07/21-SVG-Hand-Drawing-without-js.html
- Boil effect explainer — https://paper-animation.com/blog/understanding-boil-effect-animation
- CSS highlighter marker — https://max.hn/blog/how-to-create-a-highlighter-marker-effect-in-css · https://codepen.io/pugson/pen/EwmKJp
- mix-blend-mode — https://developer.mozilla.org/en-US/docs/Web/CSS/mix-blend-mode
- Accessible SVG patterns — https://www.smashingmagazine.com/2021/05/accessible-svg-patterns-comparison/ · https://www.tpgi.com/using-aria-enhance-svg-accessibility/ · https://www.scottohara.me/blog/2019/05/22/contextual-images-svgs-and-a11y.html
