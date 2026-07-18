# INBOX → BJ: the glass-refract.css @supports gate LIES on WebKit — `.glass-lens` ships with ZERO backdrop filter on the Safari floor

verified-model: claude-fable-5 (system-context model ID, verbatim). Sender: IOS27-MICRO pass-2
cure seat F5, 2026-07-18. Class: routed defect row — the IOS27-MICRO charter forbids src/ edits
from that tranche (chip-D outcome adopted, repair routed; the consumer-updates ruling is not
triggered — no API changes). Suggested home: BAND-MATERIAL (owns `glass-refract.css` and the
material canon) with the born-RED gate authored in BAND-GATES per the band split.

## The defect (CONFIRMED in paint, WebKit 26.5)

`src/styles/glass-refract.css:98` gates the refraction composite on
`@supports (backdrop-filter: url("#glass-refract"))`. WebKit 26.5 (Playwright webkit-2311,
`Version/26.5 Safari/605.1.15`):

- `CSS.supports` returns **true** for the fragment form, the shipped gate form, and the shipped
  data-URI value (bare and after `blur(8px)`); computed style retains the full composite.
- Paint **drops the WHOLE value** — including the blur leg. Probe chips over a striped scene
  (gradient-energy, video path; background baseline 0.0756): blur-only 0.0018 (frosted);
  `url(#)` 0.0748; `blur+url(#)` 0.0749; `blur+<verbatim shipped data-URI>` 0.0748 — all three
  url()-bearing chips stone sharp. Fragment vs data-URI: no divergence, both die.

Consequence: on the Safari floor the gate ENGAGES, the gated declaration
(`backdrop-filter: var(--glass-cell-backdrop-filter, var(--glass-blur-resting) var(--glass-refract-filter))`)
overrides the un-gated blur base, and **`.glass-lens` paints with no backdrop filter at all** —
worse than the intended degrade (blur-only). Shipped in glass-ui 7.0.0. Chrome 150 is unaffected
(the full value paints; the gate tells the truth there). The header comment's own premise
("a non-supporting engine never reaches this block", `glass-refract.css:57-60`) is false on
WebKit: it reaches the block and then drops the paint.

Evidence: `docs/tranches/IOS27-MICRO/passes/PASS-2/safari-arm.md` §F5 (U1 RED) +
`docs/tranches/IOS27-MICRO/prototypes/f5-optical-medium/PROBE-NOTES.md` "PASS-2 SAFARI ARM" +
`f5-wk-u1-chips.png` (video frame: A frosted, B/C/D sharp). The probe page carries a permanent
chip D in the verbatim shipped form (`prototypes/f5-optical-medium/index.html`, U1 panel).
Related history: WebKit bug 245510 (already cited in the file header).

## The exact repair (for the BJ wave to execute)

CSS `@supports` cannot discriminate this engine — it lies by accepting at parse. The gate must
move to a runtime latch, the `supportsCssTimeline`-class harden
(`src/composables/motion/scroll/supportsCssTimeline.ts` is the pattern kin: never trust a
detector that cannot reject).

1. **`src/styles/glass-refract.css`** — delete the `@supports (backdrop-filter:
   url("#glass-refract"))` wrapper (it is the lying organ; keeping it inside a latch would be
   belt on a proven-false detector). The refraction composite moves behind a root latch:

   ```css
   :root[data-glass-refract="on"] .glass-material.glass-lens,
   :root[data-glass-refract="on"] .glass-lens {
       backdrop-filter: var(
           --glass-cell-backdrop-filter,
           var(--glass-blur-resting) var(--glass-refract-filter)
       );
   }
   ```

   The un-gated blur base stays exactly as shipped — with the latch off, every engine paints
   blur (the intended degrade, restored). No masking fallback: the garnish engages only where
   proven; the base never rides in the latched block.

2. **New `supportsBackdropRefract` latch** (home per the colocation rules; suggested
   `src/composables/glass/`) — sets `data-glass-refract="on"` once per session. The detection
   ladder, honesty-ordered:
   - `CSS.supports("backdrop-filter", "url(#x)")` false → OFF (Firefox-class honest rejection).
   - The negative probe (`CSS.supports("backdrop-filter", "gl-not-a-filter")` must be false) →
     else OFF (happy-dom/jsdom always-true shims, the supportsCssTimeline lesson).
   - **The accept-and-drop class (WebKit) is NOT discriminable by any supports/computed read —
     proven: all four forms return true while paint drops the whole value.** The latch therefore
     needs a functional arm. Candidate: an SVG-filter displacement readback through
     `ctx.filter = "url(#probe)"` on an offscreen 2D canvas (the one url()-filter pipeline with
     JS-readable output). This is a PROXY (2D raster ≠ backdrop pipeline) and one-directional —
     it must be validated per engine by the wave's live-π before it is trusted; if validation
     fails, the latch ships capability-scoped to engines where the composite is paint-proven at
     cut time, and the born-RED gate below keeps that scoping honest forever.
3. **The born-RED gate (BAND-GATES class, live-π/paint-arm organ):** on WebKit, `.glass-lens`
   over a striped scene must paint gradient energy within tolerance of its blur-only twin — the
   lens may NEVER paint sharper than its own blur base, on any engine. At HEAD this gate is RED
   on WebKit 26.5 (0.0748-sharp vs 0.0018-frosted twin); the latch flips it GREEN. Keep it as a
   standing regression lock — it also catches the day WebKit ships url() for real (the latch's
   functional arm goes true, the gate stays green, the garnish lights up).
4. Consumer surface: zero API change; `.glass-lens` consumers untouched; MIGRATION.md row not
   needed. Demo/witness pages need no edits (the latch is root-level).

## Capture spec caution (the 7.0.0 lesson)

The repair's WebKit paint verification must ride the video/screencast path — Playwright WebKit
`page.screenshot()` is backdrop-filter-BLIND and will false-FAIL the green side of the gate
(safari-arm.md §0, harness law 1, paired sanity PNGs beside it).
