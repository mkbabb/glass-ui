# W-G.5b: blob interaction (membrane, pointer, affect)

The source is INBOUND O-172, value.js's blob lane, relayed 2026-11-05. It follows **W-G.5** (W-BLOB-GREENFIELD): W2 colony, W3 cohesion, W4 drive + latch + ceiling, W6 settle, and W7 three-scalar mood. It is the last wave of the blob run (W-G.1, W-B.9, W-G.5, W-G.5b; `W-G.1.md` §0.1) and waits on W-G.5 alone. Its release is `waves/INDEX.md`'s.

The owner's order of 2026-11-05, verbatim: "Blob interaction with glass-ui and blob component facliities need a total re-design and overhaul from first-principles--with an emphaisis on interaction, goo, and satellite dynanism." The aurora line adds: "the aurora swirl and blobs are not properly visible with H value perturbed colors."

The evidence is the code and two reads by value. The frame is value `docs/tranches/X/evidence/0hm/seat5-records/color-mob390-dark.png`: the hero is one fused lump, which agrees with W-G.5 §2 ("1 component in 24 of 24"). value's read of 2026-11-09 (O-204) is in W-G.5 §2. Nothing in this wave has been measured on glass. value sends its perf budgets as a separate note once its V-1 baseline is banked.

The design runs as the convergent design loop under N-16 and the breath-of-life edict, and it runs before the build. The relay's numbers are proposals; the loop sets every number this wave does not cite, and writes it here.

## Rulings

The first five are the orchestrator's, of 2026-11-05. S's last two sentences and the sixth are the re-cut's, of 2026-11-10.

- **A-1: yes.** The rest-aspect arm of G5-G7 moves off `baseSquash` and onto the membrane's n=2 rest amplitude per mood. The gate text and its 3x separation stay. One skin replaces the squash, the trail and the noise wobble.
- **A-2: yes.** Lean becomes a static n=2 modal load toward the pointer angle. The observable is the same: the body turns toward you and the core stays pinned. The rigid-body offset goes.
- **A-3: yes.** The ω18/ζ0.35 exception row retires. Pinch-snap and `pulse()` become a modal impulse on the membrane. That deletes the last non-preset spring in the blob, and an n=0 ring that changed the area.
- **A-4: yes.** A grabbed and released bead keeps the pointer's release velocity. It is bounded only by the existing one-sided containment ceiling and restored by the pump. Clicking the body stays the J* knee impulse. G-P3 keeps its velocity clause. The 0-escape clause is what makes this safe; if it fails, the cure is the ceiling, not a bucketed fling.
- **S: yes, with one adjustment.** Pointer physics is on whenever the Blob is live (not under reduced motion and not paused), and `pressLabel` only adds the focusable button. There is no new prop. A consumer that wants a purely decorative blob sets `pointer-events: none` or `inert` on the host, which is the platform's own switch. After W-G.1 there is no software tier: a host without WebGPU paints no blob and reports through `onInitError` (`W-G.1.md` §7), and under reduced motion the blob shows one rest frame. In both, `pulse()` still emits.
- **Overshoot.** The membrane rings and a flung bead overshoots. Both are the blob's, one of the three spatial morphs where `motion-canon.md` P2 allows it. Under reduced motion neither runs.

## Scope

**M, the membrane.** The body skin is r(θ) = R_eff(1 + Σ_{n=2..4} a_n cos(n(θ − φ_n))). Each mode is a damped oscillator.
- Area is held by R_eff = R/√(1 + Σa_n²/2), with |a_n| ≤ 0.30.
- Frequency and damping ratios follow the 2-D (cylinder) capillary law, which the spec cites.
- n=2 is one new row of the spring table (`src/composables/motion/spring/springPresets.ts`). n=3 and n=4 derive from it by those ratios, so the blob has no free spring numbers.
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
- Hover acts within the stage circle only. Beads feel a soft pull toward the pointer, and the body leans (A-2). This is the hover's one motion; the stamp under the blob does not move (W-G.5 §0).
- A pointer entering the circle re-arms the loop through the W6 wake path.

**A, affect.** There is no new mood system. One method is added: `stir(x)`, an arousal impulse that decays on W7's mood clock and is clamped by the calm-floor law. The next live press clears `setMood` (W-G.5 has already deleted the `manualOverride` veto).

**Not in this wave.**
- Backing-store sizing under a CSS scale transform is W-G.1's (§3 item 4, gates G1-G15 and G1-G16).
- The reactive config is W-G.5's W6.
- The body's shading and the stamp are W-G.5's (its G5-G11 and G5-G8b).

## Gates

Each gate is RED on the commit W-G.5 leaves and GREEN on this wave's, read once each way, with its bite read once. A gate runs in a browser only where the claim is what the page paints or how the page routes input; everything the simulation decides is read from the simulation.

**In vitest, over the simulation** (`tests/components/custom/blob/colony-interaction.test.ts`): the colony, the membrane and the pointer law composed, a seeded generator, the fixed step, and pointer samples fed as data. No browser and no renderer. Times are simulated seconds.

- **G-M, the membrane's area.**
  - With all three modes at |a_n| = 0.30, the skin's enclosed area stays within 1 % of πR².
  - Bite: dropping the R_eff correction takes the drift past 1 %.
- **G-P2, grab.**
  - A grabbed bead is within 0.02 uv of the pointer 100 ms after the pointer stops.
  - Read from the field, the body and the bead are one component while the gap is under 2k₀, and two after the latch.
  - The snap rings both the body and the bead.
  - Bite: releasing the well during the grab leaves no step at which the pair is one component with the gap above zero.
- **G-P3, fling.**
  - Launch velocity is within 10 % of release velocity.
  - No bead crosses the containment ceiling over 8 seeds × 50 random flings.
  - The median re-bond is at most 12 s.
  - Bite: lifting the ceiling's one-sided clamp lets a fling escape.
- **G-A, affect.**
  - `stir(1)` followed by idle returns arousal to its baseline within W7's clock.
  - Below the calm floor (`drive` under 0.3381), `stir(1)` does not raise the effective drive.
  - A live press after `setMood(m)` returns the mood to the automatic arc.
  - G5-G1 (settled within 5.2 s of quench, under every pinned mood) is W-G.5's gate; it is re-run here with the membrane and the pointer composed, and is not restated.
  - Bite: removing the decay from `stir`.
- **G-SPRING.**
  - The n=2 mode's frequency and damping equal the ones its spring-table row gives; n=3 and n=4 equal n=2 scaled by the capillary ratios; the grab spring is the `present` row.
  - `git grep -nE 'PULSE_OMEGA|PULSE_ZETA|response: *[0-9]|dampingFraction: *[0-9]' -- src/components/blob` prints nothing. On master it prints the ω18/ζ0.35 pair (`constants.ts:132,135`, used at `useBlobPointer.ts:3,184,233`) and the pointer follow's literal (`useBlobPointer.ts:60`, `{ response: 0.18, dampingFraction: 1.0 }`).
  - Bite: one literal restored in `useBlobPointer.ts`.
- **G-CUT (static).** `git grep -nE 'uTrail|TRAIL_N|uStretch|uPulse' -- src/components/blob` prints nothing. On master, outside the files W-G.1 deletes, it prints lines in `constants.ts`, `useBlobPointer.ts`, the uniform packer and `metaball.wgsl.ts`.

**In a browser**, harness `c=blob` (`tests-visual/blob-run/`, W-G.1's), captures canvas-cropped and connected-component labelled. Each cell runs once per engine, at one size and one theme:

- **G-M, paint** (1440×900, light).
  - A press dent shows in paint within 2 animation frames.
  - A grab-pull shows a neck in at least 3 frames before the latch: one component, waist under 0.6 × the bead diameter.
  - Bites: releasing the well during the grab removes the neck frames. A constant n=2 rest amplitude across moods fails G5-G7, which is re-read here.
- **G-P1, hover** (1440×900, light).
  - A pointer parked inside the stage circle but outside the silhouette for 2 s cuts the mean bead-to-pointer angular distance by at least 30 %, read from the lobes' angles in paint.
  - Bite: hover gated by the body hit disc (today's `useBlobPointer` `hitRadius` × 1.3).
- **G-P4, touch** (390×844, coarse pointer).
  - A drag that starts outside the body circle scrolls the page.
  - `elementFromPoint` at all four canvas corners returns the host.
  - Bite: `touch-action` on the whole box.
- **G-AURORA (the owner's aurora line)** (1440×900, light, Chromium only).
  - At hue-perturbed seeds, a bead stays legible against the aurora, measured as a bead-versus-aurora floor in OKLab L and C.
  - It reads against the aurora master ships at the cut. W-G.4, which is not in this run, re-reads it when it lands, as does value's aurora lane.
  - The floor is OQ-7. Until the design loop writes it here, the cell records readings and gates nothing.

Engines: Chromium on Metal runs all four cells. WebKit runs G-P4, which reads the DOM and needs no paint. WebKit runs G-M's paint and G-P1 only if Playwright WebKit has WebGPU on the releasing machine (`W-G.1.md` OQ-2); if it does not, those two cells are recorded as not runnable there, and real Safari is one owner glance at the close. A run that starts WebKit goes through `guarded --exclusive webkit`.

That is five vitest gates, one static gate, and at most seven browser cells, each a few seconds of pointer input. G-P3's 400 flings, with re-bonds of up to 12 s each, run in simulated time.

## Consumer half (value's side)

At its repin, value's HeroBlob drops its `pointer-events-none` wrapper (`HeroBlob.vue:15` at `56979e978`). It maps colour frames to `stir(0.04)` and a save to `pulse()`, and BlobPane is re-authored to the live atoms. value builds no local pointer physics or membrane before this lands; its one pre-landing change is `pressLabel="Pulse blob"` on the /blob hero.

## Open questions

- **OQ-7 (design loop, then owner by capture).** G-AURORA's floor. No seat has measured a bead against the aurora at hue-perturbed seeds, so there is no number to gate. Default: the loop's first capture takes eight perturbed seeds on the shell aurora and proposes the floor as the lowest bead-versus-ring difference the owner still reads as a bead; the number is written into G-AURORA before the build starts.
- **OQ-8 (design loop).** "The snap rings both the body and the bead" names no observable for the bead, which has no membrane in this wave's scope. Default: the bead's ring is its radial velocity changing sign at least once within 0.5 s of the latch; the loop confirms or replaces it.
