# Orchestrator note: the restraint precept binds this release (owner, 2026-11-09)

Every seat reads this. The owner's new precept is `docs/precepts/restraint.md` (precepts cb5b0fa; glass bumped its submodule to c2f64ed in master on 2026-11-09). Read the precept in full: `git -C ~/Programming/glass-ui/docs/precepts show c2f64ed:restraint.md`. Its quotes:
- "Ensure NO over affected or over engineered, over shaded, or over text mark-uped UI or elements thereof."
- On specular: "Remove, do not tune."
- On the press: "I don't like how these indent on click."

glass amended its own docs to match. `affordance-map.md` retires GLEAM-TRACK and PRESS-SQUISH, and `motion-canon.md` P2 now allows no overshoot on controls, text or reader surfaces. Overshoot and goo stay only on dock fission and fusion, the blob and the card shuffle.

For 11.1.0:
1. **Add nothing the precept bans.** That covers gleam or specular, a press indent, overshoot on a control, text or reader surface, a second shadow layer, a coloured or glow shadow, `text-shadow`, a blur nested inside a blur, and gradient fills outside the data and identity list. It also covers a standing caption or restated label, bold dropdown options, units or titles, and `transition-all`. A lane item that seems to need one of these is built without it; record why.
2. **Critics treat a violation in anything this release added or changed as a defect, with evidence.** The precept's checks are the measure. The fix seat removes the violation; it never tunes it.
3. **Pre-existing gleam, press-indent and enter-overshoot code is NOT cured here.** Deleting it removes public exports (`v-specular`, the press composables and tokens), which would break consumers in a minor. It is booked as its own major (INBOUND O-203). Do not half-cure it in 11.1.0: no tuning a rung to 0, and no shim.
4. **The dock capsule (O-199) is an owner ruling, not "pill by reflex".** It stands.

## O-204 (3): the Blob wrapper's paint containment clips its overscan. It joins lane L4 (material).

`src/components/blob/Blob.vue:342` puts `content-visibility: auto` on `.goo-blob-wrapper`. That implies paint containment, which clips the canvas's 1.6× overscan to the wrapper box, so the goo can never spill past |uv| 0.5 and satellites crowd the body. The owner's order (2026-11-09): "satellite blobs and goo morphing needs to be more pronounced, less shaded".

The cure keeps the offscreen park, which is why `content-visibility` was added (the intersection observer and the RAF park), and lets the overscan paint. Containment that skips offscreen work must not clip paint, so use the observer path that already exists, or `contain` without `paint`. Record which and why. A consumer's own anchor clips outside the wrapper (value clips 0.75rem out).

Gates, in Chromium (ANGLE Metal) and WebKit, at 390 and 1440, light and dark:
- A bead placed at |uv| 0.6 paints outside the wrapper box.
- The offscreen park still stops the RAF, with zero frames while scrolled away.

The witness must be RED on v11.0.0.
