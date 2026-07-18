# CRIT-F4 — adversarial critique of ENERGY-FIELD (IOS27-MICRO pass 1)

verified-model: claude-fable-5 (system-context model ID, verbatim). Adversarial-critic seat,
2026-07-18. Not an author of any F4 artifact.

Read in full: SPEC-F4-ENERGY-FIELD.md, research/F4-ENERGY-FIELD.md, prototypes/f4-energy-field/
(index.html + PROBE-NOTES.md incl. VERIFIED), analysis/MARKS.md, registry/REGISTRY.md. Claims
were checked against the kin sources on disk (useDragVelocity.ts, writeVelocityWeight.ts,
property-regs.css, springPresets.ts, useSpring.ts, useScrollTrigger.ts/scrollReader.ts) and
against re-run arithmetic (node).

## What survives the assault

Credit where due, so the gaps below read as gaps and not as a demolition: the kin audit is
accurate on disk (the 0.7 clamp, the tanh 0.06 law, the EMA 0.35/0.65, the per-frame inheriting
`--motion-weight` write, the `inherits:false` registration of `--flex-vel` — all verified);
`useSpring().velocity` exists as claimed; the boundary (modulation plane vs carrier plane) is
drawn honestly and re-drawn per hallmark; the novelty claim (no 2025–2026 library ships energy
as a CSS-var style contract) is researched, not asserted; the no-idle discipline, PRM pinning,
unclamped publication, and MAX-fold structure are real and Chrome-paint-verified; the VERIFIED
section reports its own defect with a root cause instead of hiding it. The family is not
vacuous. It is also not converged.

## Open gaps, enumerated

### G1 — Safari is absent from every verification, and Safari is the named risk

Spec §5 names the riskiest claim as "per-frame per-element energy writes stay cheap **in
Safari**"; spec §4 admits the ~850x invalidation benchmark is Chrome-measured and that
backdrop re-sample cost under energy-modulated transforms needs a Safari read (U6). The
VERIFIED pass is Chrome 150 only. The `abs()`/`max()` transform calc — which, per PROBE-NOTES'
own no-masking-fallback note, silently kills the whole transform if it fails to parse — is
unconfirmed in Safari. REGISTRY bounds require "Chrome+Safari both verified in paint." The
prototype proved the easier neighbor of its own riskiest claim.
**Close:** drive index.html in Safari 26 from the serialized browser seat; capture a trace
(style-recalc ms/frame during the fling + a real scroll), a screenshot pair, and an explicit
smear-computes check; append a VERIFIED-SAFARI section with the numbers.

### G2 — the scroll defect is ruled but not cured, and the spec was never amended

VERIFIED root-caused the dead scroll channel (Chrome fires `scrollend` after every discrete
`scrollTop` assignment; each closes the channel) and ruled "scrollend is not a safe close edge
in Chrome; close on the 160ms debounce." As shipped: index.html still closes on `scrollend`
unconditionally (the listener at the channel), the encoded scroll acceptance row still cannot
pass, the 30-consumer fan-out cost — the highest-fan-out case of the riskiest claim — was never
measured in paint (the dock gesture exercises ~11 consumers at 22 writes/frame; the list is
32), and spec §1 still names `scrollend` as a co-equal closing edge while §6 lists U8 as open.
The ruling exists only in PROBE-NOTES.
**Close:** patch the channel (debounce-primary; ignore `scrollend` while scroll events arrived
within the last ~2 frames), re-run the burst to a measured PASS with the list-scope writes/frame
and µs/frame captured, and amend spec §1 + U8 to the ruling.

### G3 — the live prototype violates the spec's own continuity contract

Spec §1: "the handoff is carried by velocity SEEDING … release-frame jump ≤0.032, energy 0.811
on both sides." The prototype's live path (`dockRelease`) seeds the spring at `vy * 0.35`. For
the 1150 px/s flick the field steps 0.818 → 0.382 at the release frame — a jump of 0.436,
~14x the contract bound (re-run arithmetic, confirmed). U-CONT gates only the offline replay,
which seeds unscaled — the unit tests a different code path than the page runs. The 0.35 factor
is defensible physics (displacement-space velocity under the rubber map is less than finger
velocity), but no artifact reconciles finger-space vs body-space energy, and the browser seat
never measured the live release-frame jump.
**Close:** either decouple the field seed from the carrier seed (spring channel born at the
pointer's dying velocity for ENERGY purposes; the carrier spring may seed scaled), or amend the
spec with an explicit rubber-region carve-out and a new bound; then measure the live jump in
paint and gate it.

### G4 — gates that cannot fail, presented as acceptance evidence

(a) The slider "byte-identical" regression compares `min(0.7, E)` against
`min(cap 0.7, E × gain 1.0)` computed from the same EMA state in the same file — identical by
construction; max |Δ| = 0.0000 is a tautology. The shipped pipeline differs materially:
`useDragVelocity` saturates BEFORE the EMA (tanh-then-EMA vs the prototype's EMA-then-tanh —
nonlinear, not commutative), projects a single axis (the prototype uses hypot: a diagonal drag
on a horizontal slider now smears where the shipped law would not), decays `frameDelta` by 0.6,
and quantizes `toFixed(4)`. None of that is replayed. (b) U-LAW tests `tanh(v/1000)` against
constants derived from `tanh(v/1000)`. (c) U-FOLD's "MAX inflation 1.00x PASS" checks e/e ≈ 1.
(d) "charge fired 282ms before travel" equals the press-hold duration by construction (charge
on pointerdown, travel on pointerup).
**Close:** write the one honest regression — identical synthetic pointer streams through the
shipped `useDragVelocity` code and the facility, per-frame deltas under a stated tolerance
on-axis, the off-axis behavior change documented as a deliberate break or fixed; demote
(b)–(d) to regression locks in the notes. The "byte-identical feel" claim in the spec cleanup
ledger stands or falls on this.

### G5 — the threshold grammar contradicts its own arithmetic

Slow-place E = 0.273 sits ABOVE θ_g = 0.25, so the glow fires at ~3.1% opacity — yet spec §1
("a slow place shows no fireworks"), PROBE-NOTES judge item 3 ("the slow drag shows NO glow"),
and the VERIFIED row ("no glow — PASS") all assert none. Sub-perceptual is plausible but is a
different claim than zero, and none of the three artifacts states it. Separately the wash
overlay bypasses the grammar entirely: `opacity = E·0.55 + charge·0.40` — any nonzero energy
washes, no threshold, on the same page that sells "threshold grammar" as a mechanical
guarantee.
**Close:** pick a side — raise θ_g above the slow-place mark (e.g. 0.30) or restate the claim
as sub-perceptual with a measured luminance delta; give the wash a role-row threshold or
document it as charge-envelope territory exempt from θ_g, in the spec, not implicitly.

### G6 — the closed role table is not what the prototype demonstrates

Spec §1 defines the row schema as {gain, deformation verb, glow threshold, specular threshold,
delay}. The prototype's ROLE_TABLE carries {gain, cap} — `cap` is not in the spec schema at
all, despite "caps move into role gains" being a headline U3 ruling — while the verbs,
thresholds, and delay live as hand-authored per-element CSS full of exactly the numbers the
contract forbids (0.05, 0.06, 0.10, −8px, 0.16 …). The load-bearing hard part — how a real
component receives its role's verb CSS so it truly "picks a role, never a number" (in a
Tailwind-first library: `@utility` per role? a data-attribute contract? generated per-role
classes?) — is neither specified nor listed as an open gap. This is the elegant-reduction
trap: "one scalar, five verbs" is the elegant half; the delivery of the verbs is the hard half,
and it is currently invisible.
**Close:** reconcile the row schema (cap in or out, one answer); add the verb-delivery surface
to the open-gaps table as pass-2 work with a named candidate mechanism; note the prototype's
hand-authored CSS as a bounded dishonesty.

### G7 — two scopes writing one element is unaddressed

The spec's composition story covers energy summation (nested scopes don't inherit;
double-counting prevented by construction). It does not cover write contention: explicit
ancestor coupling adds an element as a consumer of a second scope, after which both scopes'
`publish()` race on the same `--energy` property every frame — last writer wins, and an element
can flicker between two values. The prototype never exercises the case (the rail couples to
dock only).
**Close:** a composition rule in the spec — per-element single-writer registry, MAX-in-JS at
the element across its scopes, or an outright prohibition on dual membership — plus one
prototype case exercising it.

### G8 — the periphery verb does not produce the MARKS behavior, and its teardown leaks

MARKS §5 measures the rail as a delayed pop-in (~80–160ms behind, then caught up). A 100ms
linear transition retargeted by a fresh inline write every frame is not a delay — it is an
exponential low-pass (each retarget covers ~frame/100ms of the remaining gap). VERIFIED's own
numbers show the artifact: rail at 0.370 at t=725ms while the dock had fallen to 0.175 — a
~½-second tail, not a 100ms echo. Separately, `_quiet()` skips periphery consumers when
bleeding, and nothing else zeroes them: on the bleed path (a release that is not seed-worthy —
e.g. a horizontal fling on the dock, where `seedWorthy` checks only `vy`), the rail strands at
its last written energy indefinitely (opacity 0.45 + 0.5·E — visibly frozen glowing).
**Close:** either respec periphery honestly as "smoothed follower, τ≈100ms" and re-argue it
against MARKS §5, or implement a real delay; route periphery through the same bleed-to-zero at
quiet (its transition already softens the landing).

### G9 — evidence durability and verb coverage

The artifacts underwriting U1/U3 (`f4-fold-probe.mjs`) and the prototype's expecteds
(`f4-core-check.mjs`, `f4-gesture-sim.mjs`) live only in the ephemeral session scratchpad —
the rulings rest on scripts no future pass can re-run or review. F1 and F3 committed `check.mjs`
beside their prototypes; F4 did not. Paint evidence covers two of the five verbs (container
smear + specular streak, in f4-dock-live-energy.png); lens bloom/arrival heat, content
counter-lag with depth grading, and the periphery echo have numeric readout rows but no
captured screenshots — the live-verify law wants the delta artifact, and "the role verbs read
as life" is claim #2 of the riskiest claim.
**Close:** commit the three .mjs checks into `prototypes/f4-energy-field/`; capture the three
missing verb screenshot pairs (tab press-charge/arrival, scroll counter-lag mid-flick,
periphery echo at two timestamps).

### G10 — uncited Safari versions in the spec

Spec §4 asserts "fractional pointer coords 26.2" and "`scrollend` 26.2" with no citation. The
research digest — the spec's own input — explicitly says "scrollend support in Safari
unverified this pass," and every other platform claim in the digest carries a WebKit/MDN link.
An unverified item was upgraded to a bare assertion between research and spec. Given G2 (the
ruling is debounce-primary anyway), the scrollend claim may simply be deletable. Minor kin
naming slip in the same section's lineage: the scroll velocity ref lives on
`useScrollTrigger`, not `scrollReader` — the digest has it right, the spec's shorthand does not.
**Close:** cite WebKit release notes for both versions or strike them; fix the kin name.

### G11 — fast/faster discrimination is numerically preserved but perceptually thin

The U3 ruling (publish unclamped) is sold as the MARKS §6 acceptance ("1150 vs 2600 px/s").
Unclamped tanh maps that 2.26x velocity ratio to ΔE = 0.17, and the shown consumers translate
it to ~1.7% of container scaleY — likely imperceptible. The discriminator MARKS actually
measures (27px carry into the ceiling) comes from seeded spring velocity — carrier-plane, and
the prototype's carry numbers match MARKS via the tuned stand-in, which validates the stand-in's
tuning, not the field. The clamp critique is correct; the affirmative claim overreaches.
**Close:** fold into U7 with a perceptual check on the probe page — a judge must distinguish
flick from fling from field-driven channels alone in a captured pair — or re-scope the §3 row
to "discrimination preserved for seeding and thresholds," which is what the field actually
delivers.

### G12 — the depth grade is an index sawtooth, not viewport depth

`depthGain: 1 + 0.2·(i % 8)/7` approximates "deeper visible rows" only for an aligned first
screenful; after any scroll offset the deepest visible row can carry gain 1.0 and the pattern
repeats every 8 rows. MARKS §5 grades by depth in the viewport. Unlisted in the dishonesties
ledger.
**Close:** compute the grade from position-in-viewport at write time (one rect read per row at
channel-open, not per frame), or add the liberty to the dishonesty ledger with the pass-2 fix
named.

### G13 — acknowledged-open rows, carried

The spec's own table honestly lists: U6 (subsumed by G1), U7 (absorbs G11), U9 glow grammar,
the role-gain initial values, and the carrier seeding contract at the round-2 merge. Listed
here so the count is complete; not double-penalized beyond their interaction with G1/G11.

## Failure-mode checklist, disposition

- vacuous convergence — partial hit: G4's four cannot-fail gates inflate the PASS table.
- spec-cites-itself circularity — hit at G5 (θ_g chosen at the slow-place mark, then claimed as
  "no fireworks") and mildly at U-CONT (the acceptance bound is the probe's own measurement —
  legitimate as a regression lock, not as acceptance).
- gates that cannot fail — hit: G4.
- elegant-reduction trap — hit: G6 (the verb-delivery surface is the unnamed hard part).
- legacy aliases — clean (the ledger retires `--atom-drag-v`, no alias).
- masked fallbacks — near-hit at G2: the dead scroll channel presents as silent E=0, not loud;
  the cure is specified but unapplied.
- unverified gestalt — hit at G9 (3 of 5 verbs have no paint capture).
- consumer-less substrate — clean: real in-tree consumers named (slider, scroll lists, specular
  gating, engagement wash) plus the cleanup ledger's migrations.
- Safari claims without version-cited evidence — hit: G10; and G1 leaves every Safari behavior
  claim evidence-free in paint.
- prototype dishonesty — partial hit: the bounded-dishonesties section is genuinely honest, but
  the riskiest claim's Safari half was swapped for Chrome (G1) and the continuity contract's
  live path was swapped for an offline replay (G3).

## Convergence

The architecture core — the scalar triple, kind-exclusive channels, MAX fold, regime gating,
two-delivery directive, no-idle discipline, PRM pinning, unclamped publication — is designed,
argued from real kin, and Chrome-paint-verified. Against that: the named-risk platform has zero
evidence (G1), one shipped defect is uncured with the spec unamended (G2), the live path
violates the family's own continuity law (G3), four acceptance rows are tautologies (G4), and
the spec/prototype disagree on the role-table schema with the delivery mechanism unspecified
(G6). Twelve substantive gaps, three of them material to the riskiest claim itself.

**Convergence: 62%.** Elegance earns nothing; the modulation plane earns its number when
Safari has been in the room.
