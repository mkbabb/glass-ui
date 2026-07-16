# BI.W-PAGER-WORM — the liquid dot-morph indicator + the two-edge driver

Band B4 (pager greenfield). The headline dot-MORPH mechanism: the selected indicator stretches,
travels, and re-forms on the next dot with liquid weight (the Google-worm edict). Ships the pager's
ONE two-edge driver.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-I1** — "/navigation/carousel is absolutely broken… The currently selected deck dot should
  MORPH from one dot to another… is just totally broken." — the dot-MORPH half + the empty-pager
  root cause (this wave owns the row; W-CAROUSEL-REBUILD discharges the §page-rebuild half, W-PAGER-A11Y
  the keyboard half, W-PAGER-RETIRES the retire list — all cite this row, none re-own it).
- **D-PAGER PASS-1 §0 Defect 1** — the pager paints EMPTY/SMEARED (the σ=8 filter-scale annihilation:
  `0.281 < 0.389` clamp) — confirmed engine-agnostic (SAF: PagerDots renders EMPTY on both engines).
- **SUFFUSION-MAP R9** (the lead/trail two-edge driver) · **R10** (the squish re-register) · **R11**
  (worm-scoped goo ids).

## §Design

Decided mechanism — D-PAGER PASS-1 §1 (the hybrid: PAGER-B's two-edge driver ⊕ PAGER-A's scoped
paint) + PASS-4B **ruling 13** (ONE arm at 13px; the composed moving capture decides). NO
re-litigating the codebase-truth diagnosis (§0) or the driver architecture (§3).

- **The three-layer split** (`PagerDots.vue`): BED (N crisp CSS circles, NO filter, ever — the active
  bed pip dims ~0.35 under the worm) · WORM (a separate `aria-hidden pointer-events:none` group holding
  ONLY the indicator masses, translucency once at the layer) · INTERACTION (the transparent button grid —
  W-PAGER-A11Y owns the roving contract). The filter is DECOUPLED from the bed by construction.
- **The two-edge driver — the ONE pager integrator, minted here.**
  `useLeadTrail` (`src/composables/motion/morph/useLeadTrail.ts`; on `/motion-core` + root barrel —
  keyframes-FREE, the `usePointerVelocityField` precedent that closes gap G2): a spring/damped LEAD edge
  targeting `centerOf(active)` px + a critically-damped trailing follower (`trail += (lead−trail)·(1−exp(−dt/τ))`,
  τ≈270ms) computed inside the SAME subscription — ONE rAF, zero per-frame `getComputedStyle`.
  Direction-agnostic (`lo=min/hi=max`). Interruption is FREE (retarget re-seats, velocity carries).
  Release-at-arrival is EMERGENT (the trail catching the lead — no timer). Hand-rolled damped integrator is the
  keyframes-free default; kf `useSpring` only if `/pager` is proven kf-legal (G2 — prefer the hand-roll).
- **The paint arm — ruling 13, BOTH branches specced, the pass-5 moving capture decides:**
  - **Arm A (default IFF it reads liquid at 60fps within the G3 Safari raster budget ≤4ms/frame):** a
    worm-only 3-mass barbell under a NEW `#pager-worm-goo` `{blur:4, slope:18, offset:-6}` (single-body
    peak 0.72 > 0.33 — the true smooth throat), region a snug pad, static graph (WebKit bug 283156),
    `color-interpolation-filters="sRGB"` (bug 136418). Regular `filter:url()` only; `backdrop-filter:url()`
    NEVER (bug 245510).
  - **Arm B (ships IFF Arm A misses the budget/liquid read):** the clip-path-only barbell
    (`#pager-neck-throat` objectBoundingBox clip — a structural waist, NO filter, maximally Safari-safe).
    The edict is satisfied by the DYNAMIC two-edge stretch (elongate→travel→reform reads liquid in
    MOTION; the static waist proportion is secondary — ruling 13's recorded rule).
  - NO dual path at 13px either way. The losing arm is BANKED with the capture as its record.
    If NO waist reads at 13px, the dot register ships the single-mass elongating capsule (same engine's
    stadium mode) and the true barbell re-homes to the hero-scale exhibit (W-CAROUSEL-REBUILD §hero).
- **The squish** rides `useLiquidFlex` (ONE law), re-registered off the 1.45 taffy value into the
  1.08–1.2 band (R10; caps: tabs 1.08 · pager ~1.2).
- **PRM (P6):** worm coalesces to ONE body, snaps to target with zero in-between frames (`--stretch`
  stays 1; filter dropped / `display:none` on Arm A), only the fade survives; bed static.
- **Honest degrade (Arm A only):** `@supports not (filter: url(#x))` renders the un-merged clip-path
  barbell — a VISIBLE honest partial, NEVER the current empty pill (which IS the no-masking-fallback
  crime). Arm B needs no gate.

## §Work

- `src/composables/motion/morph/useLeadTrail.ts` (NEW) — the two-edge lead/trail integrator; keyframes-free;
  exported on `/motion-core` + root barrel; the `drive(fractionalIndex)` seam for W-CAROUSEL-REBUILD's
  drag-scrub.
- `src/components/custom/pager-dots/PagerDots.vue` — the three-layer split; the bed loses its filter
  (`.pager-goo-layer { filter }` over the bed DELETED — W-PAGER-RETIRES executes the token/id side);
  wire the worm group to `useLeadTrail`; the worm-scoped `--pager-goo-filter` (Arm A) or the
  `#pager-neck-throat` clip (Arm B).
- `src/components/custom/goo-filter/GooFilter.vue` — add `#pager-worm-goo` `{blur:4, slope:18, offset:-6}`
  to `LIBRARY_IDS` (Arm A); the plate-scale `#pager-goo` (`:55`, σ8/18/−7) survives only for a live plate
  consumer (else W-PAGER-RETIRES excises it under the G8 fence).
- `gooBarbellGeometry.ts` (`projectBarbell`) — KEPT byte-for-byte, re-pointed onto the worm-only group.
- `src/styles/glass/surfaces.css` (`.glass-pager-ring` ~447) + `pager-dots/constants.ts` — KEPT.
- `DeckPager.vue` — zero-edit beneficiary (the ≥2-consumer bar by construction).

## §Acceptance

Gate: **`proof:pager-worm`** (NEW; `["local","ci"]` for the source arms, the live paint LOCAL).
Born-RED at HEAD: PagerDots paints EMPTY (the σ8 annihilation) — the connected-component readback finds
zero worm mass. GREEN here.
- W1 — the bed group carries NO `filter` (the decouple); the worm group is `aria-hidden pointer-events:none`.
- W2 — `useLeadTrail` exists once, keyframes-free (no `@mkbabb/keyframes.js` import on the `/motion-core`
  reach), with ONE self-parking rAF owned by the pager worm.
- W3 — exactly ONE 13px paint arm ships (no dual path); the losing arm's capture is banked in
  `docs/tranches/BI/audit/visual/W-PAGER-WORM-DELTA.md`.
- W4 — `useLiquidFlex` cap in the 1.08–1.2 band (the 1.45 taffy value GONE).
- W5 — PRM: one body, deterministic snap, zero elongated frames, fade survives, bed static.
- W6 (Arm A only) — the `@supports not (filter:url())` floor renders the un-merged clip-path barbell;
  the empty-pill state is structurally unreachable.
- Self-test bites: a planted whole-layer bed filter REDs; a planted second worm driver (a `--goo-t`
  transition-restart) REDs; a planted taffy cap >1.2 REDs; a planted empty-pill (no honest floor) REDs.

## §π/DELTA

`tests-visual/pager-worm.spec.ts` (NEW; LOCAL real-GPU) + `W-PAGER-WORM-DELTA.md`. Every claim a capture:
- **The pass-5 decider (ruling 13):** the composed MOVING worm — Arm A AND Arm B — 1-hop + 4-hop +
  rapid-retarget, a 40-frame travel series with flood-fill connected-component + waist measurement (bar:
  ONE connected component, waist/body ≤0.45 for the "readable waist"; the bed's N pips stay individually
  crisp). Chrome AND **real Metal WebKit**, BOTH modes. Plus the Safari filter-raster ms/frame trace over
  a 5-step autoplay loop (Arm A; budget ≤4ms/frame). This capture DECIDES which arm ships + banks the loser.
- The PRM snap (zero elongated frames), the spam-click 0→4→1→4 interruption trace (no flicker/collapse-regrow),
  the drag-scrub 1:1 continuity (shared with W-CAROUSEL-REBUILD's capture).
- Rides the W-PI-IN-CLOSE binding-π battery + the W-GESTALT-LEDGER-FILE navigation verdict (re-earned on
  a fresh capture).

## §Obligations

- **Device run (SAF-1):** the ruling-13 decider MUST run on real Metal WebKit (headless SwiftShader lies
  on filter raster — the pass-5 `pager-capture` with the hardened compact-return contract; the schema cap
  killed two prior attempts on oversized returns). `dis:safari-metal-verify` seam.
- **User judgment:** the pager multi-hop SLIDE-vs-STRETCH read (SUFFUSION-MAP §4.2) rides the same capture
  — the map constrains, the user decides the arm if the numbers are ambiguous.
- No cross-repo ask: `DeckPager` inherits the fix zero-edit; slides' local DeckPager imports nothing from
  glass-ui's pager (G8 fence recorded).

## §Dispositions

- **`--pager-worm-duration: 1.8s`** (the wrong clock, reads broken-slow vs the 3.8s autoplay) → the value
  RETIRES onto the spring settle / retimed clock — EXECUTED by W-PAGER-RETIRES (this wave supplies the
  driver that makes release-at-arrival emergent; the token cut is the retire wave's).
- **`useGooMorph` for the pager** → retires FOR THE PAGER ONLY if Arm B (or the driver) wins the paint
  level; `useGooMorph` + `gooBarbellGeometry` STAY (carousel-plate/deck-plate consumers, G8) — executed by
  W-PAGER-RETIRES. No re-book.
- **PAGER-C (painted canvas strip)** BANKED with the named re-trigger (a continuous full-width mercury rail
  with ≥12 simultaneously-fused nodes) · **PAGER-D (view-transition)** RETIRED (empirically disproven; no
  re-open). Recorded, no re-book.
