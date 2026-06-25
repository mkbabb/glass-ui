# BD.W-CONCENTRIC-RADIUS — the `--radius-concentric` system register (Apple `containerConcentric`): a nested child's radius = parent − inset, clamped ≥ 0, pure `calc()` cross-engine FLOOR

**Band 7 (Cards/controls/glass-every-element) · depends: none inbound** — it is an INDEPENDENT system register that lands EARLY in Band 7 (the grouped-squircle card cluster + the segmented-tabs track + the dock card shell CONSUME it). READ by W-ICONCHIP-GLASS (the grouped-squircle tiles), the segmented-tabs track (re-points its inline math), and the dock card shell. Per `UNIFIED-ROSTER.md:91` (source `BE.W-CONCENTRIC-RADIUS.md` — the iOS concentric corner law) + the verified HEAD state (`segmented-tabs.css:43-47` does the concentric math INLINE; no system register exists).

> **STATUS: IMPLEMENTATION-gated.** This is the tranche-DEV PLAN doc. The build mints the register in `theme/radius.css` + re-points the segmented-tabs inline consumer; it is user-gated. The spec is in scope now. This is the BD-union restatement of the prior `BE.W-CONCENTRIC-RADIUS.md` spec, re-grounded against the verified HEAD src.

## The defect / the ask (code-grounded — verified against HEAD)

Apple's `containerConcentric` corner derivation is the iOS-27 nesting law: a child element nested inside a rounded container reads its OWN radius as the container's radius MINUS the inset gap, so the curves stay CONCENTRIC (parallel). The f_073 Control-Center grouped-squircle cluster (N controls fused into ONE frosted squircle group, each inner tile's radius derived from the group's outer radius − the gap) is the surface that reads MOST broken without it. The exact, verified HEAD state:

1. **The math is HAND-ROLLED per-surface, no system register.** `src/styles/segmented-tabs.css:43-47` (VERIFIED) does `--bouncy-track-radius: calc(var(--bouncy-slider-radius) + var(--bouncy-track-trim))` with the inline comment `/* The TRACK corner is CONCENTRIC with the pill (Apple's .containerConcentric): the pill radius + the trim inset … */` (`:43`) — the prose NAMES `containerConcentric` but re-does the `+ trim` math inline, reading NO system register. `--bouncy-track-trim: 0.1875rem` (`:38`) is the inline inset.

2. **No `--radius-concentric` register exists** (VERIFIED: `grep radius-concentric src/styles/` → 0 token hits — only the segmented-tabs prose comment + an unrelated `color-radius.css` comment). The dock card shell narrates "the concentric look" in PROSE only (`dock/shell.css` / `dock/layers.css`).

3. **The viz `concentric` is DISJOINT (no collision).** `src/components/custom/concentric/` is the radial-Fourier-ring-interference WebGPU viz (the W-CONCENTRIC-LEVELSET surface) — NOT a radius register. The naming is incidental; this wave's `--radius-concentric` is a `--radius-*` token (a `calc()` of `--radius-*` siblings), no collision with the component dir.

The ask: mint the ONE `--radius-concentric` system register (the Apple `containerConcentric` derivation, pure `calc()` cross-engine floor); re-point the segmented-tabs inline `+ trim` math onto it (clean break, no second form); make the grouped-squircle cluster + dock card shell read it.

## The mechanism — a pure-`calc()` system register in `theme/radius.css` + the consumer re-points (ZERO Houdini, ZERO `corner-shape`)

### 1. Mint the concentric register (`theme/radius.css`)

A `calc()`-based register reading ONLY `--radius-*` tokens (plain `@theme`, each alias its own override point):

```css
/* BD.W-CONCENTRIC-RADIUS — Apple containerConcentric. A child nested inside a
   rounded container reads its radius CONCENTRIC with the container: the parent
   radius MINUS the inset gap (clamped >= 0 so a child larger than the container
   curve goes square, never negative). The INWARD form (a tile inside a group);
   the OUTWARD form (a track around a pill) is the same register inverted. Pure
   calc() — the cross-engine FLOOR (no Houdini, no corner-shape); composes WITH
   the --corner-shape-* squircle CURVE (the concentric radius is the REGION). */
--radius-concentric-inset:   var(--card-pad-inline, 0.5rem); /* the default gap */
--radius-concentric:         max(0px, calc(var(--radius-parent, var(--radius-card)) - var(--radius-concentric-inset)));
--radius-concentric-outward: calc(var(--radius-child, var(--radius-control)) + var(--radius-concentric-inset));
```

- **`--radius-parent` / `--radius-child`** are the per-scope knobs a consumer sets (the container radius / the child radius); **`--radius-concentric-inset`** is the gap (default the card pad-inline so a card→chip nesting is concentric by default).
- **The INWARD form** (`--radius-concentric` = `max(0, parent − inset)`) is a tile inside a group; **the OUTWARD form** (`--radius-concentric-outward` = `child + inset`) is a wrapper around a child (the track around the pill — the segmented-tabs case).
- **The `max(0px, …)` clamp** is Apple's `containerConcentric` "never goes negative" — a child larger than the container's curve goes SQUARE, never a negative radius.

### 2. The segmented-tabs track re-points (clean break, no second inline form)

`segmented-tabs.css:47` changes from the inline `calc(var(--bouncy-slider-radius) + var(--bouncy-track-trim))` to read the OUTWARD register: on the track scope set `--radius-child: var(--bouncy-slider-radius)` + `--radius-concentric-inset: var(--bouncy-track-trim)`, then `--bouncy-track-radius: var(--radius-concentric-outward)`. ONE vocabulary — the `+ trim` literal is GONE (clean break, no dual form). The resolved value is byte-identical to the prior inline math (the π proves the re-point is value-preserving).

### 3. The grouped-squircle cluster + dock card shell read it

- **The grouped-squircle cluster (W-ICONCHIP-GLASS reads it — consumer #2).** Each nested tile inside a frosted group sets `--radius-parent: <group-radius>` + `--radius-concentric-inset: <group-pad>` and reads `border-radius: var(--radius-concentric)` (the INWARD form — every tile concentric with the group). This wave MINTS the register + documents the read; W-ICONCHIP-GLASS is the consumer.
- **The dock card shell** (`dock/shell.css`) — its prose-concentric narration becomes a real read (the dock card inside the dock frame at the dock pad-inset).

The ≥2-consumer bar is met by construction: the segmented-tabs track (re-pointed) + the grouped cluster + the dock card shell.

## The gate — `proof:concentric-radius` (NEW, device-free source gate, born-RED → GREEN)

`scripts/proof-concentric-radius.mjs`, `tags: ["local","ci"]`. Born-RED by construction (`--radius-concentric` ABSENT; the inline `+ trim` form lives). The detector comment-strips the CSS, reads the token + the consumer re-points, and exports a pure detector for the self-test bites. **THE LOAD-BEARING DESIGN PRINCIPLE: the gate asserts the RESOLVED derivation (the `max(0…, parent − inset)` math + the byte-value-preserving re-point), the cross-engine pure-`calc()` floor, AND the no-second-inline-form clean break — never a bare `/radius-concentric/.test()` presence (the register's VALUE is the contract, not its name).**

- **CR1 — the register is minted ONCE with the clamped derivation.** `--radius-concentric` + `--radius-concentric-inset` + `--radius-concentric-outward` exist in EXACTLY ONE place (`theme/radius.css`); the INWARD derivation is `max(0px, calc(parent − inset))` (the clamp present — a register WITHOUT the `max(0px, …)` clamp REDs, "Apple's containerConcentric never goes negative"); the OUTWARD form is the inverse `calc(child + inset)`. The gate PARSES the `calc()` (not a name-presence) — a `calc(parent − inset)` with no `max(0px, …)` clamp REDs (the negative-radius bite). RED at HEAD (token absent).
- **CR2 — the cross-engine FLOOR (pure `calc()`, no Houdini/corner-shape).** The concentric register reads ONLY `--radius-*` tokens via `calc()`/`max()` — NO `@property` registration, NO `corner-shape`, NO `paint()` worklet (the concentric REGION is orthogonal to the squircle CURVE — a consumer composes both, but the register itself never reads `corner-shape`). The gate scans the register's value for a Houdini/`corner-shape` coupling. RED if the register couples a non-`calc()` dependency.
- **CR3 — the inline consumer re-points, value-preserving, NO second form.** `segmented-tabs.css` reads `--radius-concentric-outward` (NOT the inline `calc(--bouncy-slider-radius + --bouncy-track-trim)` literal — the `+ trim` form is GONE); the resolved value is byte-identical to the prior inline math. The ANTI-EVASION bite: NO second inline `calc(<radius> + <…trim/inset>)` / `calc(<parent> − <inset>)` concentric form survives OUTSIDE the register anywhere in `src/styles/`. RED at HEAD (the inline form lives at `segmented-tabs.css:47`).
- **CR4 — the ≥2-consumer bar + the REGION-vs-CURVE canon.** At least TWO surfaces read the register (segmented-tabs track + the grouped cluster / dock card shell); the canon (the Apple `containerConcentric` derivation + the REGION-vs-CURVE orthogonality — the concentric radius is the REGION, the `--corner-shape-*` squircle is the CURVE within it) is recorded. RED at HEAD (zero readers).

**Self-test bites (each planted defect MUST red):**
- (a) a `--radius-concentric` WITHOUT the `max(0px, …)` clamp (a child larger than the container goes NEGATIVE) → CR1 RED (the negative-radius bite — "Apple's containerConcentric never goes negative").
- (b) a second inline `calc(<radius> + <trim>)` concentric form smuggled into another partial → CR3 RED (the second-form bite).
- (c) a concentric register coupling `corner-shape`/`@property`/`paint()` → CR2 RED (the REGION-vs-CURVE confusion — the cross-engine floor must be pure `calc()`).
- (d) a single-consumer register (only the segmented-tabs track reads it) → CR4 RED (the ≥2-consumer bite).

**What reds on the pre-fix tree:** CR1 (the register is absent), CR2 (trivially — no register to scan, the gate reds at CR1), CR3 (the inline `+ trim` form lives), CR4 (zero readers). GREEN only after the register is minted with the clamp + the segmented-tabs re-points + ≥2 consumers read it.

## The binding π — `tests-visual/concentric-radius.spec.ts`

VISUAL wave → a `proof:ba-gestalt` glass-band verdict (the grouped-cluster card row) + a captured DELTA, both modes. The WebKit project is LOAD-BEARING (the cross-engine floor — the f_073 cluster reads concentric on Safari where `corner-shape` would not). NO source-green close.

- **THE CONCENTRIC LAW (the binding readback).** Mount a grouped-squircle cluster (a frosted group with N nested tiles, the f_073 idiom — built by W-ICONCHIP-GLASS but the concentric DERIVATION is THIS wave's) and `getComputedStyle` the resolved `border-radius` on the group vs each tile. Assert each tile's resolved radius = `group-radius − gap` (the concentric law — the curves are PARALLEL, the visual signature). A tile LARGER than the group's curve resolves `0px` (the clamp — square, never negative).
- **THE SEGMENTED-TABS RE-POINT (value-preserving).** The track's resolved radius = pill radius + trim (the outward concentric — byte-identical to the prior inline math, proving the re-point is value-preserving — the BEFORE/AFTER resolved value matches).
- **BOTH MODES + SAFARI (the cross-engine floor).** The WebKit project asserts the concentric radius RESOLVES on Safari (the betters-move — `corner-shape` would not, but the REGION `calc()` math does); the `getImageData` corner-pixel readback confirms the parallel curves paint.
- **THE CAPTURED DELTA** at `docs/tranches/BD/audit/visual/W-CONCENTRIC-RADIUS-DELTA.md` — the grouped cluster with concentric tile curves vs a non-concentric (arbitrary-radius) tile set, both modes, the parallel-curve signature visible.

## The gestalt row

**Union-roster surface: the grouped-squircle card cluster (the concentric tile curves).** The verdict requirement: a FRESH both-mode `:5199` capture (+ the webkit project — the cross-engine floor), surface-hash freshness floor. The gestalt judgement: the nested tiles' curves run PARALLEL to the group (the iOS-27 nesting law — every curve concentric, the visual order of the grouped cluster), AND the segmented-tabs track is byte-identical to the prior inline math. Born-FAIL on HEAD (no concentric register; the tiles read an arbitrary radius, curves not parallel). GREEN at its OWN close; W-REFLECT re-confirms on fresh pixels. Wired into the union roster by W-GESTALT-WIRE.

## Fences

- **The `--radius-*` ladder + the `--corner-shape-*` axis are byte-untouched** — concentric is an ADDITIVE register reading the existing `--radius-*` tokens; the CURVE axis (`corner-shape`) is unchanged (the REGION-vs-CURVE orthogonality — they compose, both apply).
- **The viz `concentric` component is untouched** — `src/components/custom/concentric/` (the Fourier-ring viz) is unrelated; the `--radius-concentric` register is a `--radius-*` token, no collision.
- **Cross-engine FLOOR, no Houdini (the betters-move).** The register is pure `calc()`/`max()` (Baseline); it works on Safari where `corner-shape` does not. No `@property`, no `paint()` (CR2).
- **Clean break, no alias.** The segmented-tabs inline `+ trim` form is RETIRED onto the register (no dual form — CR3); a consumer retunes the gap via `--radius-concentric-inset` on a scope (presets-in-consumers).
- **The warm-cream identity is irrelevant** (a radius register carries no color/material — it is geometry); no animation (a static radius resolution — `proof:no-layout-animation` is irrelevant).

## Disposition links

- **`UNIFIED-ROSTER.md:91` (W-CONCENTRIC-RADIUS, source `BE.W-CONCENTRIC-RADIUS.md` — the `--radius-concentric` nested-radii register, the iOS concentric corner law)** → BUILT (the spec — the BD-union restatement re-grounded against the verified HEAD src). The register + the consumer re-point + the cross-engine floor are the clauses. CLOSED at the spec level.
- **The prior `BE.W-CONCENTRIC-RADIUS.md`** → this BD-union spec is its restatement; the HEAD src references (`segmented-tabs.css:43-47` inline math, no register) re-verified on disk. The mechanism is unchanged (pure `calc()` register + the segmented-tabs re-point).
- **READ BY W-ICONCHIP-GLASS** (the grouped-squircle tiles read the INWARD `--radius-concentric`) + the segmented-tabs track (re-points its inline math) + the dock card shell — the ≥2-consumer bar met by construction.
- **The MIGRATION row** (a future external consumer of the inline `+ trim` form migrates onto `--radius-concentric-outward`) is documentary; no live external consumer at HEAD.
