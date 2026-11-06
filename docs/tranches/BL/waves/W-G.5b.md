# W-G.5b: blob interaction (membrane, pointer, affect)

The source is INBOUND O-172, value.js's blob lane, relayed 2026-11-05. It follows **W-G.5** (W-BLOB-GREENFIELD), which stands as ratified: W2 colony, W3 cohesion, W4 drive + latch + ceiling, W6 settle, and W7 three-scalar mood. This wave runs after W-G.5 and after W-G.1 (one engine). Its release is an 11.x minor, named at the cut.

The owner's order of 2026-11-05, verbatim: "Blob interaction with glass-ui and blob component facliities need a total re-design and overhaul from first-principles--with an emphaisis on interaction, goo, and satellite dynanism." The aurora line adds: "the aurora swirl and blobs are not properly visible with H value perturbed colors."

The evidence so far comes from reading code; no measurement has been made yet, because value's probe never got a browser slot. The frame is value `docs/tranches/X/evidence/0hm/seat5-records/color-mob390-dark.png`. The hero there is one fused lump, which agrees with W-G.5.md:167 ("1 component in 24 of 24"). value sends its perf budgets as a separate note once its V-1 baseline is banked.

The design runs as the convergent design loop under N-16 and the breath-of-life edict. The relay's numbers are proposals; this wave sets every number it does not cite.

## Rulings (orchestrator, 2026-11-05)

- **A-1: yes.** The rest-aspect arm of G5-G7 moves off `baseSquash` and onto the membrane's n=2 rest amplitude per mood. The gate text and its 3x separation stay. One skin replaces the squash, the trail and the noise wobble.
- **A-2: yes.** Lean becomes a static n=2 modal load toward the pointer angle. The observable is the same: the body turns toward you and the core stays pinned. The rigid-body offset goes.
- **A-3: yes.** The ω18/ζ0.35 exception row retires. Pinch-snap and `pulse()` become a modal impulse on the membrane. That deletes the last non-preset spring in the blob, and an n=0 ring that changed the area.
- **A-4: yes.** A grabbed and released bead keeps the pointer's release velocity. It is bounded only by the existing one-sided containment ceiling and restored by the pump. Clicking the body stays the J* knee impulse. G-P3 keeps its velocity clause. The 0-escape clause is what makes this safe; if it fails, the cure is the ceiling, not a bucketed fling.
- **S: yes, with one adjustment.** Pointer physics is on whenever the Blob is live (not under PRM and not paused), and `pressLabel` only adds the focusable button. There is no new prop. A consumer that wants a purely decorative blob sets `pointer-events: none` or `inert` on the host, which is the platform's own switch, so no glass prop is needed. W-G.1 deletes the WebGL2 and Canvas2D tiers. The "software tier" clause therefore reduces to the engine's single fallback (the CSS ground) plus PRM, both showing one rest frame, and `pulse()` still emits.

## Scope

**M, the membrane.** The body skin is r(θ) = R_eff(1 + Σ_{n=2..4} a_n cos(n(θ − φ_n))). Each mode is a damped oscillator.
- Area is held by R_eff = R/√(1 + Σa_n²/2), with |a_n| ≤ 0.30.
- Frequency and damping ratios follow the 2-D (cylinder) capillary law, which the spec cites.
- n=2 is one new SPRING_PRESETS row. n=3 and n=4 derive from it by those ratios, so the blob has no free spring numbers.
- The dynamics don't vary with mood; only the n=2 rest amplitude does, per A-1.
- The shader uploads six floats. FBM stays as a static texture.
- Impulses (the contact well, snap, press) project onto the modes by angle.
- Cut: `pulsePhase`/`pulseAmp`, the tanh velocity squash, the 15-sphere trail (`TRAIL_N` and its uniforms), the n=0 click spring, and the lean offset.

**P, the pointer.**
- Hit-testing runs on the CPU against the colony positions the simulation already holds. There is no DOM clip tracking the outline.
- The hit layer is one static circle inscribed at the orbit envelope (the ceiling is 0.475 uv). The canvas corners stay with the host page.
- Fine pointer:
  - A press on the body dents it and rings the modes.
  - A drag on the body is a capped modal load.
  - A press on a bead grabs it on `present` (ζ 1) while the capillary well keeps acting, so pulling out draws a neck that pinches at the W4 latch.
- Coarse pointer:
  - `touch-action: none` applies only on a static circle at the body radius.
  - Beads take a tap impulse only, so a scroll that starts beside the body still scrolls.
- Hover acts within the stage circle only. Beads feel a soft pull toward the pointer, and the body leans (A-2).
- A pointer entering the circle re-arms the loop through the W6 wake path.

**A, affect.** There is no new mood system. One method is added: `stir(x)`, an arousal impulse that decays on W7's mood clock and is clamped by the calm-floor law. The next live press clears `setMood` (the `manualOverride` veto is already deleted).

**Not in this wave.**
- Backing-store sizing under a CSS scale transform: `backingSize.ts:47` reads `getBoundingClientRect`, so a `scale(0.35)` host undersizes the store. This goes to the **W-G.1** addendum.
- The reactive config duplicates W-G.5 W6.

## Gates

Each gate is RED on HEAD and GREEN on the branch, run twice, in Chromium headless (ANGLE Metal) and WebKit, light and dark, at 390×844 and 1440×900. Captures are canvas-cropped and connected-component labelled.

- **G-M, paint.**
  - A press dent shows in paint within 2 rAF.
  - A grab-pull shows a neck in at least 3 frames before the latch: one component, waist under 0.6 × the bead diameter.
  - Area drift is at most 1% at a_n = 0.3.
  - `git grep -nE 'uTrail|TRAIL_N|uStretch|uPulse' -- src/components/blob` returns nothing.
  - Bites: dropping the R_eff correction makes area drift past 1%. A constant n=2 rest amplitude across moods fails G5-G7.
- **G-P1, hover.**
  - A pointer parked inside the stage circle but outside the silhouette for 2 s cuts the mean bead-to-pointer angular distance by at least 30%.
  - Bite: hover gated by the body hit disc (today's `useBlobPointer` hitRadius × 1.3).
- **G-P2, grab.**
  - A grabbed bead is within 0.02 uv of the pointer 100 ms after the pointer stops.
  - It is one component while the gap is under 2k₀, and two after the latch.
  - The snap rings both the body and the bead.
  - Bite: releasing the well during the grab removes the neck frames.
- **G-P3, fling.**
  - Launch velocity is within 10% of release velocity.
  - No escapes over 8 seeds × 50 random flings.
  - The median re-bond is at most 12 s.
- **G-P4, touch.**
  - On a 390 coarse pointer, a drag that starts outside the body circle scrolls the page.
  - `elementFromPoint` at all four canvas corners returns the host.
  - Bite: `touch-action` on the whole box.
- **G-A, affect.**
  - `settled` is true within 5.2 s of quench under any pinned mood, which extends G5-G1.
  - `stir(1)` followed by idle returns to baseline within W7's clock.
  - Bite: restoring the `manualOverride` veto.
- **G-SPRING.** `git grep -nE 'omega|zeta|stiffness|damping' -- src/components/blob` matches no literal outside a SPRING_PRESETS reference.
- **G-AURORA (the owner's aurora line).** At hue-perturbed seeds, a bead stays legible against the aurora, measured as the bead-versus-aurora dL/dC floor, which is set in this wave. This runs jointly with value's aurora lane and W-G.4.

## Consumer half (value's side)

At its repin, value's HeroBlob drops its `pointer-events-none` wrapper. It maps colour frames to `stir(0.04)` and a save to `pulse()`, and BlobPane is re-authored to the live atoms. value builds no local pointer physics or membrane before this lands; its one pre-landing change is `pressLabel="Pulse blob"` on the /blob hero.
