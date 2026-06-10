# HC-liquid-research — the ONE validated research arm (W-LIQUID §7, the three named blanks)

**Date** 2026-06-09 (the day after the WWDC26 keynote; sessions publishing June 8–12) ·
**Inputs** `NECESSITY-MATRIX.md §3` + `AY.W-LIQUID.md` (post-HC-liquid-spec hardening, read first)
· **Deliverable** the spec's new **§8 RESEARCH-RESULTS** section (appended to
`docs/tranches/AY/waves/AY.W-LIQUID.md` — the filled table + 12 sources live THERE; this file is
the lane record).

**Verdict: RESEARCH-FILLED — ZERO §2 re-anchors.** Every pre-answered scaffold row survives the
reference corpus. The arm arrived to a drafted table and confirmed it; the one open mechanism
fork (§2.10 silhouette-vs-transform) RESOLVES in favor of the shipped design. One honest
UNFILLED (the measured Apple deformation %, which no published teardown carries — inference band
recorded, ≤8–10%, consistent with the 1.06–1.10 cap). One platform-blocked rider closed.

## Blank 1 — Siri-orb reference bands → FILLED (with one named UNFILLED)

- **Silhouette vs transform: ANSWERED.** No free soft-body silhouette wobble anywhere in the
  Apple register. Three channels: (1) internal-flow inside a near-stable silhouette (the
  visionOS 27 "marble-like ball"; every credible recreation — metasidd/Orb, SmoothUI siri-orb,
  kopiro/siriwave — animates gradients/waves/glow inside a FIXED circle); (2) container-geometry
  morph (the Dynamic Island, where iOS 27 Siri now lives — W42's fenced-out
  morph-between-states family, NOT this wave's flex); (3) transform-level interactive bounce
  (WWDC25 `.interactive()` scale/bounce/shimmer). → §2.7's capped scale pairs are a FAITHFUL
  transposition; NO clip-path/border-radius channel warranted. §2.10's watch item CLOSES.
- **Max deformation %: UNFILLED as a measured number** (no quantitative teardown exists);
  inference ≤8–10%; the §2.2 cap (1.08, band 1.06–1.10) STANDS — the iOS 26.x→27 arc dials
  deformation DOWN (NN/g pushback → the iOS 27 intensity slider → "much more restrained" Siri
  branding).
- **Onset/settle: CONFIRMED band.** Onset immediate (spring-driven); settle ≈270–670 ms across
  footage-anchored Dynamic Island recreations (ζ 0.57–0.75, ω₀ 10.5–20 rad/s; entry-squish arm
  ζ≈0.35); Apple's own register `.bouncy(0.35–0.4)` / `.spring(response 0.3, ζ 0.6)`. The house
  §2.5 registers (0.25/ζ0.7, 0.32/ζ0.7, snappy ζ≈0.85) sit INSIDE the envelope — no new spring.

## Blank 2 — the Apple drive-signal model → FILLED

**STATE-FIRST, amplitude as a modulation inside the listening state**: listening = pulses with
the USER's speech rhythm (Six Colors on the iOS-18 glow; siriwave's amplitude-driven sine
superposition); thinking = autonomous calm pulse (iOS 27 island "searching" glow); responding =
keyed to output (island expands to the translucent results panel); touch = the SEPARATE
`.interactive()` bounce register. → §2.6's pointer/press/focus transposition is a legitimate
mapping; `pointerStrength 0.18` + the valence band STAND; Gate 1 born as drafted.

## Blank 3 — WWDC26 freshness delta + the `contrast-color()` rider → FILLED

- **NO new Liquid Glass deformation/motion APIs at WWDC26.** The API surface remains the WWDC25
  set (`.glassEffect`/`.interactive()`/`GlassEffectContainer`/`glassEffectID`); session
  wwdc2026/269 carries adoption/refinement only. iOS 27's headline glass change is a
  **user-facing system-wide intensity slider** — Apple converged on exactly W54's one-knob
  `--glass-level` model (external validation, recorded in §8.3.a). Residual: one cheap
  design-track session-list recheck at facility-build time (sessions drop through June 12).
- **Multi-candidate `contrast-color()`: NOT shipped.** Basic black/white form is Baseline Newly
  Available (April 2026 — Chrome 147/Firefox 146/Safari 26.0, matching the shipped W55 gate at
  `src/styles/glass.css:384-404`); candidate lists + target ratios are css-color-6 DRAFT in no
  engine. The W55 warm-ink-pair refinement is BLOCKED-ON-PLATFORM, not a gap; recheck trigger =
  any engine shipping the Level-6 candidate-list form. [glass-material §5.1 rider CLOSED.]

## Lane notes

- The `dock-liquidglass-README.md:3` shipped-voice hazard was ALREADY re-grounded by
  HC-liquid-spec at read time (verified — the header now carries "SPEC ONLY, un-landed" + the
  §3.0 pointer). No action.
- Output contract honoured: zero re-anchors, one additive observation (the internal-flow channel
  makes §3.1.2's specular-rides-the-root contract register-faithful, not just convenient), no
  scope creep beyond the three blanks. The facility build re-grounds on §8 before first commit.

Full source list: `AY.W-LIQUID.md §8.4` (12 entries, all fetched 2026-06-09).
