## BE.W-CONCENTRIC-RADIUS — the `--radius-concentric(parent, inset)` system register (Apple containerConcentric)

- **Band:** 2 — Liquid Glass material, Safari-first · **Severity:** major · **Status:** SPEC (tranche-dev; NOT executed) · **Deps:** none inbound; READ by the grouped-squircle-cluster card-betters (BE.W-ICONCHIP-GLASS), the segmented-tabs track (already does the math inline — re-points onto this), the dock card shell, and any nested-glass cluster. **Sequence:** independent — lands EARLY in Band 2 (it is a system register the cluster/card waves consume). Cross-engine FLOOR (pure `calc()` — no Houdini, no `corner-shape`).
- **One-line goal:** Mint `--radius-concentric` — the ONE Apple-`containerConcentric` radius-derivation register (a child's corner radius = `parent-radius − inset` clamped ≥ 0) — so a nested glass element (a chip inside a card inside a group) reads its radius CONCENTRIC with its container off ONE named system register, replacing the per-surface hand-rolled `calc(parent + trim)` the segmented-tabs track already does inline (segmented-tabs.css:43) and that every grouped-squircle cluster will need.

---

## Goal — what ships, the iOS-27 betters-claim

Apple's `containerConcentric` corner derivation is the iOS-27 nesting law: a child element nested inside a rounded container reads its OWN radius as the container's radius MINUS the inset gap, so the curves stay CONCENTRIC (parallel) — the f_073 Control-Center grouped-squircle cluster is the surface that reads MOST broken without it (N controls fused into ONE frosted squircle group, each inner tile's radius derived from the group's outer radius − the gap). At HEAD this math is HAND-ROLLED per-surface: segmented-tabs.css:43 does `--bouncy-track-radius: calc(var(--bouncy-slider-radius) + var(--bouncy-track-trim))` (the OUTWARD form — track radius = pill radius + trim) and dock/shell.css:387 + dock/layers.css:405 narrate "the concentric look" in PROSE only. There is NO system register.

This wave mints the ONE register:

1. **`--radius-concentric` — the Apple-`containerConcentric` derivation.** A `calc()`-based register: a child reads its radius as `max(0, var(--radius-parent) - var(--radius-concentric-inset))` (the INWARD nesting — a child inside a parent at gap `inset` reads parent − inset; clamped ≥ 0 so a child larger than its container's curve goes square, never negative). Expressed as overridable token knobs: `--radius-parent` (the container's radius, the child reads it) + `--radius-concentric-inset` (the gap, default the card pad-inline). The OUTWARD form (a wrapper around a child — the track around the pill) is the same register inverted: `calc(var(--radius-child) + var(--radius-concentric-inset))`.
2. **The consumers re-point.** The segmented-tabs track (segmented-tabs.css:43) re-points its inline `calc(var(--bouncy-slider-radius) + var(--bouncy-track-trim))` onto the OUTWARD concentric register (ONE vocabulary — no second `+ trim` literal); the grouped-squircle cluster (BE.W-ICONCHIP-GLASS) reads the INWARD form for each nested tile; the dock card shell narration becomes a real read.

**The betters-claim:** Apple ships `containerConcentric` as a SwiftUI shape modifier; glass-ui ships it as a pure-CSS `calc()` system register that works on EVERY engine (no Houdini, no `corner-shape` — it is radius MATH, the cross-engine floor) AND composes with the `--corner-shape-*` squircle axis (the concentric radius is the REGION, the corner-shape is the CURVE within it — orthogonal, both apply). One register, every nesting depth, every engine.

---

## Starting state — the exact HEAD src + the born-RED anchor (verified on disk)

**`src/styles/theme/radius.css` — VERIFIED by reading `:16-117`.** The full `--radius-*` ladder (xs/sm/md/xl/2xl/3xl/pill + the semantic aliases card/dialog/panel/field/control/dock/tab) + the `--corner-shape-*` axis (AX.W56, `:96-117`). **There is NO `--radius-concentric` register** (grep `radius-concentric` → 0 hits in src — the born-RED anchor: the system register is ABSENT).

**`src/styles/segmented-tabs.css:43-46` — VERIFIED.** `--bouncy-track-radius: calc(var(--bouncy-slider-radius) + var(--bouncy-track-trim))` with the inline comment `/* The TRACK corner is CONCENTRIC with the pill (Apple's .containerConcentric): the pill radius + the trim inset … */` — the HAND-ROLLED outward-concentric the register replaces (the prose names `containerConcentric` but does NOT read a system register — it re-does the `+ trim` math inline).

**`src/styles/dock/shell.css:387` + `src/styles/dock/layers.css:405` — VERIFIED.** `/* … a FINITE concentric radius above 2xl, below pill */` and `/* … so the concentric look holds */` — PROSE narration of the concentric intent, NO register read (the grep confirms: the ONLY non-prose `concentric` references in src are these comments + the viz `concentric` component, which is the Fourier-ring viz, UNRELATED).

**The viz `concentric` is DISJOINT.** `src/components/custom/concentric/` is the radial-Fourier-ring-interference WebGPU viz (PROCEDURAL-SUITE.md) — NOT a radius register. The naming is incidental; this wave's `--radius-concentric` is a radius MATH register, no collision (the viz is a component dir, the register is a `--radius-*` token).

**Born-RED summary:** `--radius-concentric` + `--radius-concentric-inset` + `--radius-parent` are ABSENT; the segmented-tabs track does the math inline; the dock narrates it in prose; no grouped-cluster register exists. The gate's TOKEN-AXIS-EXISTS clause reds at HEAD until the register is minted + the inline consumer re-points.

---

## Build — the mechanism on the named existing substrate

**A pure-`calc()` system register in `radius.css` + the consumer re-points — ZERO Houdini, ZERO `corner-shape` (the cross-engine floor), ZERO new compositing.**

1. **`radius.css` — mint the concentric register.** Add (plain `@theme`, the radius-sibling rationale — each alias its own override point):
   ```css
   /* BE.W-CONCENTRIC-RADIUS — Apple containerConcentric. A child nested inside a
      rounded container reads its radius CONCENTRIC with the container: the parent
      radius MINUS the inset gap (clamped >= 0 so a child larger than the container
      curve goes square, never negative). The INWARD form (a tile inside a group);
      the OUTWARD form (a track around a pill) is the same register inverted. Pure
      calc() — the cross-engine FLOOR (no Houdini, no corner-shape); composes WITH
      the --corner-shape-* squircle CURVE (the concentric radius is the REGION). */
   --radius-concentric-inset: var(--card-pad-inline, 0.5rem); /* the default gap */
   --radius-concentric:        max(0px, calc(var(--radius-parent, var(--radius-card)) - var(--radius-concentric-inset)));
   --radius-concentric-outward: calc(var(--radius-child, var(--radius-control)) + var(--radius-concentric-inset));
   ```
   `--radius-parent` + `--radius-child` are the per-scope knobs a consumer sets (the container radius / the child radius); `--radius-concentric-inset` is the gap (default the card pad-inline so a card→chip nesting is concentric by default). The `max(0px, …)` is the clamp (Apple's `containerConcentric` never goes negative).
2. **The segmented-tabs track re-point.** Change segmented-tabs.css:43 from the inline `calc(--bouncy-slider-radius + --bouncy-track-trim)` to read the OUTWARD register: set `--radius-child: var(--bouncy-slider-radius)` + `--radius-concentric-inset: var(--bouncy-track-trim)` on the track scope, then `--bouncy-track-radius: var(--radius-concentric-outward)`. ONE vocabulary — the `+ trim` literal is GONE (clean break, no second inline form).
3. **The grouped-squircle cluster consumer (BE.W-ICONCHIP-GLASS reads it).** Each nested tile inside a frosted group sets `--radius-parent: <group-radius>` + `--radius-concentric-inset: <group-pad>` and reads `border-radius: var(--radius-concentric)` — the INWARD form, every tile concentric with the group. This wave MINTS the register + documents the read; ICONCHIP-GLASS is consumer #2 (the ≥2-consumer bar met by construction: segmented-tabs track + the cluster + the dock card shell).
4. **The dock card shell narration becomes a read.** dock/shell.css:387's prose-concentric reads the register (the dock card inside the dock frame at the dock pad-inset).

**Compositor-only / Safari-safe / PRM notes:** the register is a `border-radius` VALUE (pure `calc()` of `--radius-*` tokens) — NOT a paint or layout ANIMATION (a static radius resolution; `proof:no-layout-animation` is irrelevant — no animation). `max()`/`calc()` are Baseline (every engine); NO Houdini `@property`, NO `corner-shape` (that is the SEPARATE squircle CURVE axis — concentric is the REGION, they compose). Safari resolves the `calc()` identically (the cross-engine floor — this is the move that makes the f_073 cluster read on Safari where `corner-shape` would not). No PRM leg (no motion).

---

## Gate — proof:concentric-radius (NEW), born-RED → GREEN

**A NEW device-free source gate — `proof:concentric-radius`, `['local','ci']`.** Born-RED by construction (`--radius-concentric` ABSENT; `proof-concentric-radius.mjs` absent).

- **CR1 — the register is minted ONCE.** `--radius-concentric` + `--radius-concentric-inset` + `--radius-concentric-outward` exist in EXACTLY ONE place (`theme/radius.css`); the derivation is `max(0…, parent − inset)` (the INWARD clamp) + the outward inverse. RED at HEAD (token absent).
- **CR2 — the cross-engine FLOOR (pure calc, no Houdini/corner-shape).** The concentric register reads ONLY `--radius-*` tokens via `calc()`/`max()` — NO `@property` reg, NO `corner-shape`, NO `paint()` worklet. (The concentric REGION is orthogonal to the squircle CURVE — a consumer composes both, but the register itself never reads `corner-shape`.) RED if the register couples a Houdini/corner-shape dependency.
- **CR3 — the inline consumer re-points (no second form).** segmented-tabs.css reads `--radius-concentric-outward` (NOT the inline `+ trim` literal — the `calc(--bouncy-slider-radius + --bouncy-track-trim)` form is GONE). The ANTI-EVASION bite: no second inline `calc(… + …trim)`/`calc(parent − inset)` concentric form survives OUTSIDE the register. RED at HEAD (the inline form lives).
- **CR4 — the ≥2-consumer bar + the canon.** At least TWO surfaces read the register (segmented-tabs track + the grouped cluster / dock card shell); the canon (the Apple `containerConcentric` derivation + the REGION-vs-CURVE orthogonality) is recorded. RED at HEAD (zero readers).
- **The self-test bite (the planted defect that MUST red):** a register WITHOUT the `max(0…)` clamp (a child larger than the container goes NEGATIVE radius) → CR1 RED ("the concentric derivation must clamp ≥ 0 — Apple's containerConcentric never goes negative"); a second inline `+ trim` concentric form smuggled into another partial → CR3 RED; a concentric register coupling `corner-shape` → CR2 RED (the REGION-vs-CURVE confusion).

**Extend-vs-new:** NEW gate. It does NOT extend `proof:squircle-language` (that asserts the `--corner-k-*` / `--corner-shape-*` CURVE axis is minted — the concentric REGION is orthogonal). The two compose (a surface reads `--radius-concentric` for the region AND `--corner-shape-*` for the curve) but are gate-distinct.

---

## π — the binding paint readback

**`tests-visual/concentric-radius.spec.ts` (NEW, Chromium + WebKit, LOCAL real-render).** VISUAL wave → a `proof:ba-gestalt` glass-band verdict (the grouped-cluster card row) + a captured DELTA, both modes. NO source-green close; "rides W-REFLECT3" FORBIDDEN (G8).

- **The binding readback:** mount a grouped-squircle cluster (a frosted group with N nested tiles, the f_073 idiom — built by BE.W-ICONCHIP-GLASS but the concentric DERIVATION is THIS wave's) and getComputedStyle the resolved `border-radius` on the group vs each tile. Assert each tile's resolved radius = `group-radius − gap` (the concentric law — the curves are PARALLEL, the visual signature). Also: a tile larger than the group's curve resolves `0px` (the clamp — square, never negative). BEFORE: no concentric register; the tiles read an arbitrary radius (curves not parallel).
- **The segmented-tabs track re-point proof:** the track's resolved radius = pill radius + trim (the outward concentric — byte-identical to the prior inline math, proving the re-point is value-preserving).
- **Both modes + Safari (where liquid):** the WebKit project asserts the concentric radius RESOLVES on Safari (the cross-engine floor — the f_073 cluster reads concentric on Safari, the betters-move; `corner-shape` would not, but the REGION math does). The getImageData corner-pixel readback confirms the parallel curves paint.
- **The captured DELTA** at `docs/tranches/BE/audit/visual/W-CONCENTRIC-RADIUS-DELTA.md` — the grouped cluster with concentric tile curves vs a non-concentric (arbitrary-radius) tile set, both modes, the parallel-curve signature visible. **G7-revokable** via surface-hash freshness on `radius.css` + the consumer partials.

---

## Jubilance — the sited delights

- **FLOOR — the concentric curve harmony.** The nested tiles' curves run PARALLEL to the group (the iOS-27 nesting law) — the delight is the visual order of the grouped cluster, every curve concentric. Sited at the grouped-squircle card cluster.
- **No motion jubilance** — concentric is a RADIUS register (the curves are static); the motion is the cluster's own.

---

## Fences — what stays byte-untouched / warm-cream identity / no-legacy

1. **The `--radius-*` ladder + the `--corner-shape-*` axis are byte-untouched** — concentric is an ADDITIVE register reading the existing `--radius-*` tokens; the CURVE axis (corner-shape) is unchanged (the REGION-vs-CURVE orthogonality).
2. **The viz `concentric` component is untouched** — `src/components/custom/concentric/` (the Fourier-ring viz) is unrelated; the `--radius-concentric` register is a `--radius-*` token, no collision.
3. **Cross-engine FLOOR, no Houdini** — the register is pure `calc()`/`max()` (Baseline); it works on Safari where `corner-shape` does not (the betters-move). No `@property`, no `paint()`.
4. **Clean break, no alias** — the segmented-tabs inline `+ trim` form is RETIRED onto the register (no dual form); a consumer retunes the gap via `--radius-concentric-inset` on a scope (presets-in-consumers).
5. **The warm-cream identity is irrelevant** (a radius register carries no color/material — it is geometry).
6. **No new compositing seam, no animation** — the register is a static radius resolution.

**Risk:** the default `--radius-concentric-inset` (the card pad-inline) may not match every nesting's gap — but it is the SCOPE knob (a consumer sets `--radius-concentric-inset` per cluster); the π proves the derivation is correct for the declared gap, the default is the convenience. The register is the deliverable; the per-surface gap is the consumer's.
