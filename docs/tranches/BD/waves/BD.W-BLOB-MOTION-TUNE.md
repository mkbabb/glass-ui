# BD.W-BLOB-MOTION-TUNE

## (1) Band + goal

**Band 3 — Procedural viz parity + GL-fence tails.**

Surface the two blob motion-honesty tunes with the live working blob in hand (the BC condition): (arm 1) the click pulse-zeta underdamp — does `PULSE_ZETA=0.35` flinch or visibly ring-back?; (arm 2) the flick-pseudopod stretch-axis read (~6% within noise) — either make the stretch axis genuinely READ or honest-DOWN the demo copy. An either-or per item, a recorded decision on the live engine, never a re-book blind.

## (2) Starting state — the exact on-disk reality

**Arm 1 — the pulse-zeta (VERIFIED):**
- `src/components/custom/goo-blob/constants.ts:132,135`: `PULSE_OMEGA = 18` (ring frequency rad/s), `PULSE_ZETA = 0.35` (the underdamped damping, `< 1` = overshoot-then-settle). VERIFIED.
- `useBlobPointer.ts:140-150`: the click-impulse is a SEMI-IMPLICIT (symplectic) Euler on the damped harmonic oscillator `x'' = -ω²x - 2ζωx'` — `accel = -PULSE_OMEGA² · pulse - 2·PULSE_ZETA·PULSE_OMEGA · pulseVel` (:141), velocity-first then position; settles to 0 when both are tiny (:146-149). The `click(amp)` kicks `pulseVel += amp * PULSE_OMEGA` (:190). At ζ=0.35 the oscillator overshoots then RINGS BACK (a visible bounce, multiple zero-crossings before settle) — the question is whether that reads as the iOS flinch (a single decisive overshoot, no ring-back) or an over-springy wobble.

**Arm 2 — the flick-pseudopod stretch (VERIFIED):**
- `uploadBlobUniforms.ts:138-146`: velocity-driven squash-and-stretch (W10) — `uVelocity` = the spring velocity mapped to body space, `uStretch = cInt.stretch`. The shader elongates the body along the velocity axis by `uStretch`.
- The `stretch` axis is DEMOTED (`demo/stories/substrates/blob.vue:65-80` — VERIFIED): "The `stretch` axis is DEMOTED (AY.W-BLOB-CONFIG …). The SHIPPED calm default (pointerStrength 0.10 + stretch 0.5) stays the calm default … a fast flick reads a visible taffy-pull" (the LOUD register a tuning session dials, :77). The calm `stretch: 0.5` default makes the flick stretch-axis read ~6% (within rasterizer/AA noise) — the demo copy CLAIMS a "visible taffy-pull on a flick" but at the calm default the stretch barely reads (the honesty gap).
- The excited preset (`blob.vue:202-204`) dials `clickImpulse: 0.9` + the louder lean register ("leans HARD and taffy-pulls on a flick — the D5 surfaced register in use").

The decisions (FOLD-LEDGER): `ay-blob-pulse-zeta-bounce` "HELD → a one-constant underdamp tune on the live engine; surface with the working blob"; `ay-blob-flick-pseudopod-copy` "HELD → either make the stretch axis read OR honest-down the demo copy on the live walk (a recorded either-or, not a re-book)." BC.W-GOOBLOB-MEATBALL cured the blob-broken base; the working blob is now in hand (the BD condition).

## (3) The build — live-engine tunes, either-or per arm

**Arm 1 — the pulse-zeta underdamp (a one-constant tune, surface-then-decide).**
Walk the live blob: click the bead, observe the pulse response. The decision:
- IF the ζ=0.35 read is an over-springy ring-back (visible multiple bounces): raise `PULSE_ZETA` toward the critically-damped flinch (e.g. `0.5-0.6` — a decisive overshoot then settle, NO ring-back) — a ONE-CONSTANT edit in `constants.ts:135`, the symplectic integrator + the `click()` kick UNCHANGED. The iOS-canonical flinch is a single decisive overshoot.
- IF ζ=0.35 already reads as the flinch (no perceptible ring-back at the live frame-rate): re-stamp the row DECIDED-KEEP with the recorded live-walk verdict (the constant is correct — a terminal decision, not a re-book).

**Arm 2 — the flick-pseudopod stretch-axis (read-or-honest-down, either-or; PREFER the CPU path — off the GL fence).**
Walk the live blob: fast-flick the cursor, observe the stretch read. The decision:
- IF the stretch axis CAN be made to read within budget: raise the calm-default `stretch` mapping so a flick at the calm default reads a genuine (small but perceptible) taffy-pull — the demo copy's "visible taffy-pull on a flick" becomes TRUE at the default, not only the LOUD excited preset. The change is a calm-default tune, NOT a re-author of the W10 squash-stretch mechanism. **PREFER the CPU-side path — the `cInt.stretch` default written at `uniformBridgeWGPU.ts:197` (`f32[OFF.s6 + 3]`) + `uploadBlobUniforms.ts:146` (`gl.uniform1f(U.uStretch, cInt.stretch)`)** — raising the CPU-side stretch value is OFF THE GL-SHADER FENCE ENTIRELY (no `.frag`/`.wgsl` edit, both backends read the SAME `uStretch` lane unchanged), so it incurs NO shader re-touch, NO M2/M3 collision, NO parity re-record. The velocity→stretch GAIN in the shader (`metaball.wgsl.ts:178` / `metaball.frag.ts:122`, the `tanh(speed * 1.6) * uStretch` term) is the LAST resort — only if the CPU-side default cannot reach the read within budget (see §6 for the GL-fence consequence if it lands).
- IF the stretch axis CANNOT read at the calm default within budget (the ~6% is the honest ceiling without over-dialing into taffy-slop): HONEST-DOWN the demo copy — re-word `blob.vue`'s "visible taffy-pull on a flick" at the calm default to the truth (the taffy-pull is the LOUD excited-preset register; the calm default reads a SUBTLE lean), keeping the LOUD register accurate. A recorded copy-honesty decision, not a re-book.

Fences honored: arm 1 is a ONE-CONSTANT tune (the spring fence — `PULSE_OMEGA`/the integrator/the kick are untouched; only ζ moves, a tuning value not a clock re-architecture). arm 2 is EITHER a calm-default mapping tune OR a demo-copy honest-down (no shader re-author; the W10 mechanism is untouched). **GL-shader fence: arm 2 PREFERS the CPU-side `cInt.stretch` default (off the GL fence entirely — no shader touch, the recommended path); a shader-gain edit is the last resort and, if it lands, rides the SAME ONE metaball re-touch BD.W-GOOBLOB-SQUIRCLE-REFRACT + BD.W-GOOBLOB-SAT-SHADE establish (never a second independent re-touch) — see §6.** Warm-cream identity held (these are MOTION tunes, no color). The demo copy honesty is a demo-private edit (zero src paint for arm 2's honest-down path).

## (4) The gate — born-RED → GREEN

**Extend `proof:goo-redress` in-place OR `proof:blob-motion` (new):**
- **M1 pulse-zeta decision recorded** — `PULSE_ZETA` carries its DECIDED value (either re-tuned toward the flinch OR the recorded-KEEP verdict in a colocated decision note); the constant + the live-walk verdict are coherent.
- **M2 flick-pseudopod decision recorded** — EITHER the calm-default stretch reads (the mapping/gain raised + a π assert the flick stretch-axis exceeds the noise floor) OR the demo copy is honest-down (the "visible taffy-pull at the calm default" claim removed/corrected, the LOUD register accurate). A synthetic mismatched state (the copy claims a pull the default does not produce) reds.
- **M3 spring fence** — `PULSE_OMEGA` + the symplectic integrator + the `click()` kick UNCHANGED (only ζ may move); the W10 squash-stretch mechanism untouched (only the calm-default mapping/gain).
- **Self-test bite** — a synthetic demo copy claiming a flick taffy-pull at a calm default that does NOT produce one reds M2 (the honesty bite).

Born-RED on HEAD: M1+M2 fail (no recorded decision; the copy claims a pull the default does not read).

## (5) Paint verification

- **Arm 1:** the click-pulse frame-series — the bead flinches (a single decisive overshoot, NO ring-back) at the decided ζ, both modes × desktop. If ζ was re-tuned, the before/after shows the ring-back killed.
- **Arm 2:** the flick stretch-axis read — EITHER a frame-series showing the calm-default flick produces a perceptible (above-noise) stretch along the velocity axis, OR (if honest-down) the demo copy matches the live read (the calm default is subtle, the LOUD preset taffy-pulls). Both modes × desktop.
- `proof:ba-gestalt` goo verdict on the fresh capture (the per-wave paint discipline — no terminal-reflect funnel).

## (6) Fences + risks

- **EITHER-OR per arm** — each arm is a recorded decision (tune OR keep / read OR honest-down), NOT a mandated build. A re-stamp with the live-walk verdict is the correct disposition where the live read is already honest.
- **Spring fence (arm 1)** — only `PULSE_ZETA` may move (a tuning value); `PULSE_OMEGA`, the symplectic integrator, the `click()` kick are byte-untouched. This is NOT a spring/clock re-architecture.
- **W10 mechanism (arm 2)** — the velocity-driven squash-stretch is untouched; only the calm-default mapping/gain (or the demo copy) changes. The LOUD excited-preset register stays accurate.
- **GL-shader fence (arm 2) — PREFER the CPU path to stay OFF the fence entirely.** The recommended resolution is the CPU-side `cInt.stretch` default (`uniformBridgeWGPU.ts:197` + `uploadBlobUniforms.ts:146`) — NO shader touch, both backends read the unchanged `uStretch` lane (`metaball.wgsl.ts:162` `s6.w` / `metaball.frag.ts:118`). ONLY if the gain must move in the shader (the `tanh(speed * 1.6) * uStretch` term at `metaball.wgsl.ts:178` / `metaball.frag.ts:122`) does the GL fence engage: that `uStretch` read-region is DISJOINT from BD.W-GOOBLOB-SQUIRCLE-REFRACT arm 1's `surfaceNormalFromGrad` dome-Z (`:221-222` / `:179-180`) — no line overlap, no M2 collision (M2 asserts only the dome-Z snippet). A shader-gain edit would then RIDE the SAME metaball re-touch SQUIRCLE+SAT-SHADE establish (ONE lockstep `.frag`+`.wgsl`+packer move, §3a in SQUIRCLE), and re-record its parity row via BD.W-VIZ-PARITY-METAL — NEVER a second independent metaball re-touch. The `uStretch` lane is already packed (`s6.w`), so a gain-only edit adds no new uniform (M3 typed-struct undisturbed).
- **No over-dial** — arm 2's "make it read" must not over-dial into the taffy-slop the calm default exists to avoid (the anti-slop bar — a perceptible-but-small stretch, not a stretched-thin neck).
