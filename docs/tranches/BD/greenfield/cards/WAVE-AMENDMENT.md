# CARDS — WAVE-AMENDMENT (concrete tranche amendments)

> Reconciles the CARD golden (`./GOLDEN.md`, three-challenge-hardened) against the extant 116-wave
> `docs/tranches/BD/union/waves/` set. No duplicative work: the field, the keyed edge, and the motion
> currency are ALREADY booked by sibling-golden amendments — the card AUGMENTS the 3 named card waves
> and CONSUMES the siblings; it mints only the thin card-specific deltas (the card-local field-floor
> fallback + the card-surface tint-seam enrollment + the press↔cast coupling). Every NEW wave references
> `./GOLDEN.md` as the reference implementation and carries a real born-RED gate (verified against the
> live `/display/card` HEAD values in `./DELTA-ASSAY.md §0`). Tranche-DEV only; build is user-gated.

---

## THE RECONCILIATION (what the siblings already own — DEPEND, do NOT re-mint)

| primitive the card needs | OWNED BY (sibling amendment, real wave) | the card's posture |
|---|---|---|
| `@utility paper-field` (the warm-cel field ground) | `BD.W-GLASS-FIELD` (glass-floor arm) + `BD.W-PAGE-FIELD` (field-floor + per-route) — ONE `@utility`, two floors, already merged in the page-background amendment | **DEPEND** + re-host demo stages; the card mints ONLY the local-orphan-fallback underlayer |
| `--glass-key` + the keyed two-stop rim + the re-based `.shadow-cartoon-*` cast | `BD.W-GLASS-KEY-EDGE` (glass-material amendment — re-points the EXISTING `rim.css:70-83` directional rim + the SHIPPED cast onto `--glass-key`, universally) | **DEPEND** — the card CONSUMES the keyed edge; it floors its OWN border-ink + rides the `.cartoon-cast` child for the moving case. NO card-local edge fork. |
| the ambient hue-bleed (`--glass-ambient-hue` ≤8%) | `BD.W-AMBIENT-TINT` (widened past the dock by the glass-material amendment) | **DEPEND** — the card-over-field gets the hue-bleed for free |
| `--motion-weight` | `BD.W-MOTION-WEIGHT` (motion-spring amendment, `@property` `initial-value:0.618`) | **DEPEND** |
| `--ease-cartoon-punch` | `BD.W-CARTOON-PUNCH` (motion-spring amendment, a raw `linear()` with a negative anticipation leg) | **DEPEND** |
| the inert `.cartoon-cast` child caster + the `@property`-registered cast props | `BD.W-CARTOON-CASTER` (cartoon-shadow amendment) + `BD.W-CARTOON-CEL-INK` (the warm mid-tone ink, fixes the dark near-white glow) | **DEPEND** + CONSUME — the card is the caster's 2nd/3rd consumer |
| `--radius-concentric` | `BD.W-CONCENTRIC-RADIUS` (on disk) | **DEPEND** |
| the `surface="filled"` gradient chip + `--icon-chip-fill-gradient` + `<IconChipCluster>` | `BD.W-ICONCHIP-GLASS` (on disk) | **DEPEND** — consumed by the enhanced-card composite |
| the bloom spine | `useLiquidReveal` + `useBloomUp` (shipped) via `BD.W-CARD-SHEET-EXPAND` (on disk) — **NOT `useElementBloom`** (golden mis-citation, corrected) | **CONSUME** |

**The load-bearing reconcile:** the golden's proposed `W-CARD-FIELD-FLOOR` and `W-CARD-KEY-EDGE` mostly
DUPLICATE `BD.W-GLASS-FIELD`/`BD.W-PAGE-FIELD` and `BD.W-GLASS-KEY-EDGE`. They are RECONCILED here — the
card does NOT mint a second field or a second edge. The card-band amendment shrinks to: AUGMENT the 3
card waves + author TWO thin card-specific waves (the local-field-floor fallback + the tint-seam
enrollment) + ONE card-motion wave (the press↔cast coupling + the shrink-lane easing). No-dup.

---

## A. AUGMENT — the three NAMED card waves (cited by filename)

### A1 — `BD.W-COLOR-CARD.md` — AUGMENT (keep premise; add the keyed cast read)

**File:** `docs/tranches/BD/union/waves/BD.W-COLOR-CARD.md`

KEEP AS-IS — the Pantone glass color-card over a LIVE `<AuroraProtagonist>` field is the canonical
"veil card over a colorful field" case; the field contract makes its premise structural (it was already
ahead of the disease). **Amendment (one clause):** the veil card reads the `--glass-key` keyed CAST
(DEPEND `BD.W-GLASS-KEY-EDGE`) so the floating-as-the-color read gains a lifted-off-the-field WEIGHT,
even though `veil` strips the box border + rim by design (the cast is the only edge a veil keeps — it
must AGREE with the field's key). Add to its π: the veil card casts a warm keyed shadow onto the field
(not `none`), both modes. No gate-family change, no new src/.

### A2 — `BD.W-CARD-SHEET-EXPAND.md` — AUGMENT (carry the squash-stretch weight + the deep field-card)

**File:** `docs/tranches/BD/union/waves/BD.W-CARD-SHEET-EXPAND.md`

KEEP AS-IS — the card is the bloom source/target on the ONE union spine (`useLiquidReveal`/`useBloomUp`;
the wave already correctly DELETES the `useLiquidMorph` path). **Amendments (three clauses):**
1. the grow carries the squash-stretch WEIGHT (GOLDEN §5) — the grown sheet squashes toward the field
   on settle (the `dock` spring ~+4.6% overshoot IS the cel follow-through; couple it to the keyed cast
   shrinking as it settles). DEPEND `BD.W-MOTION-WEIGHT`.
2. the grown sheet IS the `tier="deep"` field-card (GOLDEN §7) — assert the expanded sheet reads
   see-through over the field (composited α < 0.95) with `--radius-concentric` children.
3. correct the citation: the bloom spine is `useLiquidReveal`/`useBloomUp`, **NOT `useElementBloom`**
   (which is not on disk — the W-FLIP-SPINE runner name; this wave already names the real files, so this
   is a golden-text correction, not a wave edit). No new gate; extend C1 to assert `useBloomUp`.

### A3 — `BD.W-MAPS-CARD.md` — AUGMENT + RENAME → `BD.W-FIELD-CARD-COMPOSITE`

**File:** `docs/tranches/BD/union/waves/BD.W-MAPS-CARD.md` → rename to `BD.W-FIELD-CARD-COMPOSITE.md`

The composite IS GOLDEN §7 (the generalized iOS-27 enhanced card). The wave already strips most of the
overfit (its content is sibling-assembled, presets-in-consumers, no library hue absorption). **Amendments:**
1. **RENAME** to strip the hardcoded facility name (D7 / W-NO-HARDCODED-REF) — `W-MAPS-CARD` →
   `W-FIELD-CARD-COMPOSITE`; the Maps frame is the EXEMPLAR (a now-playing / document / places card are
   ONE assembly with different slotted content + consumer hue), never the name. Update its Disposition
   links + the `proof:maps-card` gate id → `proof:field-card-composite`.
2. **the ONE-`--glass-key`-scene clause (the better-than-reference lever, GOLDEN §7):** the card + chip
   cluster + floating controls all share ONE `--glass-key`, so the whole composite reads as a single lit
   SCENE over the field (the reference has flat omnidirectional rims; ours has a coherent keyed scene).
   Add a π readback: the chip-cluster cast + the card cast + the control discs' rims all derive the SAME
   key direction. DEPEND `BD.W-GLASS-KEY-EDGE`.
3. **compose `<Card tier="deep">`** instead of hand-wiring `deep` + sheet + accent per consumer (the
   tier-combination is the assembly; mint only the 3 genuinely-new sub-pieces — search-pill-avatar,
   disclosure-header, list-row — exactly as the wave already specs).

---

## B. NEW WAVES — the thin card-specific deltas (each born-RED, references `./GOLDEN.md`)

### B1 — NEW `BD.W-CARD-FIELD-FLOOR` (the card-local orphan field underlayer)

**File to author:** `docs/tranches/BD/union/waves/BD.W-CARD-FIELD-FLOOR.md`
**Reference:** `./GOLDEN.md §2` (leg b — the structural field contract).
**Depends:** `BD.W-GLASS-FIELD`/`BD.W-PAGE-FIELD` (the `@utility paper-field` it composes).

**Scope (the smallest possible new surface — the per-card case is the ORPHAN exception, challenge R5):**
- The COMMON case is ancestor-supplied: the card's demo stages re-host onto `<ShowcaseFrame tier="field">`
  over `paper-field`, and a card GRID/scroll wrapper mounts ONE field (not per-card). This is a re-host,
  zero new src/.
- The FALLBACK: a `<Card>` with NO `.paper-field` behind it (the `:has()` / field-presence-behind check,
  NOT `closest('.paper-field')` — the field is a fixed sibling, not an ancestor, so `closest` fails 100%,
  per the glass-material C#1·R3 lesson) mounts a STATIC local `paper-field` underlayer on the host
  `background-image` longhand BELOW `.paper-grid` (the proven `cards.css` coexistence seam — under
  content, under both pseudos). One static `radial-gradient`, compositor-cached, zero JS, PRM-static.

**Born-RED gate — `proof:card-field-floor` (`tags:["local","ci"]`, the source arm; π is binding):**
- **K1a field-behind-card** — every `<Card>` demo has a field behind it (ancestor-supplied OR the local
  fallback). **Born-RED on HEAD: 0 `.paper-field` on `/display/card` (53 glass, 20 cards) — live.**
- **K1b no-double-paint** — a card WITH a field ancestor does NOT mount the local underlayer (the
  presence-behind gate); a card grid mounts ONE field, not N (the orphan-only-fallback assert).
- **K1c grid-cost** — a 50-card grid scroll trace shows no long-frame > 16ms during fling (the
  `backdrop-filter` blur-resample budget — challenge R5), both engines.
- **Anti-evasion:** a per-card underlayer painted UNCONDITIONALLY (not orphan-gated) REDs; a
  `closest('.paper-field')` ancestor check (instead of presence-behind) REDs.

### B2 — NEW `BD.W-CARD-MATERIAL-FLOOR` (the card-surface tint-seam enrollment)

**File to author:** `docs/tranches/BD/union/waves/BD.W-CARD-MATERIAL-FLOOR.md`
**Reference:** `./GOLDEN.md §4` (leg a — the warm material floor, reconciled to the shipped seam).
**Depends:** none new — re-points the SHIPPED `--glass-tint-*` seam (`glass/surfaces.css:283-307`).

**Scope (the challenge-R2 blast-radius fix — genuinely shared, NOT a fork, NOT a global re-tint):**
- ENROLL the card's resting/quiet surface selectors onto the SAME `:where(.btn-glass,
  .segmented-indicator, …)` seam the tinted rungs already live on (ONE rule, DRY) — so the card reads the
  EXISTING `--glass-bg-resting-tinted`/`-quiet-tinted` rungs (verified `glass/surfaces.css:297,302`).
- Set a CARD-LOCAL non-zero `--glass-tint-strength` scoped to the card surface (NOT the global `0%`
  default at `glass/surface-axis.css:83`), so the card clears the warm-chroma floor (C ≥ 0.02 warm) in
  the MATERIAL — before the field even lands — while every OTHER seam-reader stays at `0%`.

**Born-RED gate — `proof:card-material-floor` (`tags:["local","ci"]`):**
- **K2 composite-warm** — the card composited over its field resolves C ≥ 0.02 warm (H ∈ [45,88]) at the
  material floor. **Born-RED on HEAD: `--glass-tint-strength: 0%`, card fill C≈0.014 → composite C 0.0097
  — live.**
- **K2-blast (the challenge-R2 enumeration)** — the 6 seam-readers (`drawer.css`, `menu.css`,
  `cards.css` veil, `jubilance.css`, `.btn-glass`, `.segmented-indicator`) are BYTE-UNCHANGED at their
  `0%` floor (the card-local strength does not leak). Each is an explicit bite.
- **K4 dark-luminous** — the dark card over its field resolves C ≥ 0.02 warm, L in the glow band (not
  charcoal). **Born-RED on HEAD: dark card `oklab(0.395 0.0097 0.0166)` charcoal — live.**
- **Anti-evasion:** raising the GLOBAL `--glass-tint-strength` off `0%` REDs (the blast-radius bite); a
  card-scoped tinted rung that is NOT on the shared `:where()` (a fork) REDs.

### B3 — NEW `BD.W-CARD-CEL-MOTION` (the press↔cast coupling + the keyed border-floor + the shrink-lane easing)

**File to author:** `docs/tranches/BD/union/waves/BD.W-CARD-CEL-MOTION.md`
**Reference:** `./GOLDEN.md §3` (the keyed cel-lift consumption) + `§5` (squash-stretch) + `§6` (shrink weight).
**Depends:** `BD.W-GLASS-KEY-EDGE` (the rim+cast), `BD.W-CARTOON-CASTER` (the `.cartoon-cast` child +
the `@property` cast props), `BD.W-MOTION-WEIGHT`, `BD.W-CARTOON-PUNCH`.

**Scope (the card-side CONSUMPTION of the sibling edge + motion currency — no edge fork, no new spring):**
- **The border-ink floor** — the card's own border-ink floors UP 4%→≥8% warm (the defined-edge floor).
  The keyed conic rim is a `@supports (mask-composite: exclude)` ENHANCEMENT over the SHIPPED two-stop
  directional rim as the cross-engine floor (challenge R1 — never a hard mask-composite dependency).
- **The moving cast** rides the inert `.cartoon-cast` child layer (CONSUME `BD.W-CARTOON-CASTER`) — NOT
  a transitioned `box-shadow` with an unregistered `--cast-dist` (the triple-dead no-op + grid paint-
  storm the challenges proved). The cast props are `@property`-registered; the shadow is driven THROUGH
  the var (no hardcoded `16px`/`4px` literal), on a `linear()` overshoot with a 1-frame follow-through.
- **The dark-mode cast** is a plain per-mode warm-umber arm (CONSUME `BD.W-CARTOON-CEL-INK`) — fixes the
  live near-white `color(srgb 0.914 …)` sticker-glow (the `--shadow-color`/`--foreground` flip). NO
  `light-dark()` over an inset fragment (the recorded trap).
- **The hover** arcs toward `--glass-key` (vol-preserving ~1.015, X·Y≈1) on the `--spring-smooth` clock;
  the press↔cast SHADOW-GAP coupling (squash closes the gap, release overshoots open) + morph-more-on-
  move (a velocity term on the `useLiquidPress` drive). Re-point the `cartoon-surface` `:hover` flat
  `translate` to the arc.
- **The 4 scroll-shrink lanes** re-express through the `linear()`-sampled spring/punch curve
  (`--ease-cartoon-punch` × `--motion-weight`) — fixes the live `linear both` (`CardHeader.vue:193,205,
  215,224`); KEEP the 0..120/0..80 cliff + the architecture. Re-point `--card-header-bg` to the tinted
  warm-admit seam (the stuck header lifts to keyed warm-glass, not the flat `--card` 60% srgb mix).
- **The catch-light over text (challenge R5/R3/R1)** — name `mix-blend-mode: screen` on the `::after`
  catch-light, clip it OFF the text column (or below content), gate it OFF under
  `prefers-contrast: more`.

**Born-RED gate — `proof:card-cel-motion` (`tags:["local","ci"]`):**
- **K3 defined-edge** — border-ink α ≥ 8%; lit-edge-vs-host ΔL ≥ 3:1 (WCAG 1.4.11). **Born-RED on HEAD:
  4%-α border — live.**
- **K5 one-key** — the rim, catch-light, and cast all derive the SAME `--glass-key` (the cast offsets
  OPPOSITE the lit rim edge — a painted-direction π). **Born-RED on HEAD: omnidirectional rim, the cast
  flat/inverted — live.**
- **K6 squash-weight (the frame-series — challenge R1/R2)** — a press frame-series shows the card
  squashing (scale ≠ 1, X·Y ≈ 1) AND the cast SHRINKING (the gap closes); the cast rides a transform
  layer (compositor), NOT a `box-shadow` repaint; the cast props are `@property`-registered (a drift to
  an unregistered prop REDs). PRM → one static frame.
- **K7 shrink-weight** — the 4 lanes ease with the spring/punch curve, not `linear`; PRM-static.
  **Born-RED on HEAD: `linear both` ×4 — live (`CardHeader.vue`).**
- **K-AA text-over-overlay (challenge R5/R3/R1)** — the composited text pixel WITH the catch-light +
  specular clears ≥4.5:1 over the dense composite, both modes; under `prefers-contrast: more` the
  catch-light blend is OFF.
- **Anti-evasion:** a transitioned `box-shadow` with an unregistered `--cast-dist` REDs; a hardcoded
  `16px`/`4px` hover/active shadow literal (the var not read) REDs; a `linear` shrink REDs; a `light-
  dark()` over an inset cast fragment REDs.

---

## C. THE BINDING π + GATE-FAMILY SPLIT (challenge R7 — honest about the gate cost)

The composite-warm / edge / key / squash asserts sample a PAINTED composited pixel (`getImageData`) over
a REAL field, in TWO engines — that is a **π / visual-spec mechanism**, NOT the device-free `proof:no-gray`
SOURCE script. Author them in `tests-visual/`:
- `tests-visual/card-cel.spec.ts` — K2/K3/K4/K5/K6/K-AA painted readback, both modes, Chromium **AND
  the webkit project**. The WebKit run is LOAD-BEARING (challenge R1/R1): a captured `_card-*-webkit.png`
  for the conic-rim miter + the `oklch` conic banding; the keyed edge degrades to the two-stop rim on
  WebKit if `mask-composite: exclude` does not paint.
- The `proof:card-*` source gates (B1/B2/B3) assert the WIRING (selectors/tokens/`@property` regs present,
  the blast-radius bites, the anti-evasion bites) — device-free, `["local","ci"]`. The PAINT is the π.

---

## D. NO-DUP LEDGER (reconciled vs the 116-wave set — nothing PRUNED, nothing EXCISED, no dup authored)

- **PRUNE:** none — every existing card wave survives (AUGMENT, not delete).
- **EXCISE:** none from the wave set. From the GOLDEN text: the mis-citation `useElementBloom` (→
  `useBloomUp`), the stale `surfaces.css:286` paths (→ `glass/surfaces.css:283-307`), the
  `shadow.css:9` cast cite (→ `:95`), and the "surface variants" API mislabel (the shipped axes are
  `tier`×`surface`) — all corrected in `./DELTA-ASSAY.md §0`.
- **NO new field wave** (DEPEND `BD.W-GLASS-FIELD`/`BD.W-PAGE-FIELD`); **NO new edge wave** (DEPEND
  `BD.W-GLASS-KEY-EDGE`); **NO new motion currency** (DEPEND `BD.W-MOTION-WEIGHT`/`BD.W-CARTOON-PUNCH`);
  **NO new caster** (DEPEND `BD.W-CARTOON-CASTER`/`BD.W-CARTOON-CEL-INK`); **NO `surface="lens"`
  member**; **NO new card component**.
- **NET:** 3 AUGMENTs (`BD.W-COLOR-CARD`, `BD.W-CARD-SHEET-EXPAND`, `BD.W-MAPS-CARD`→rename) + 3 NEW thin
  card-specific waves (`BD.W-CARD-FIELD-FLOOR`, `BD.W-CARD-MATERIAL-FLOOR`, `BD.W-CARD-CEL-MOTION`) + the
  π split. The card RESOLVES onto the shared warm-glass register; it forks nothing.
