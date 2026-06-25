# TABS — WAVE-AMENDMENT (the concrete tranche reconciliation)

> How the tabs golden (+ challenge §§1-3 hardenings) lands in the extant 116-wave BD-union
> set. No duplicative work: AUGMENT the two on-disk tab waves, DEPEND the two booked motion
> tokens, CROSS-LINK the proposed dock-tab wave, RESOLVE the buttons ledger row. No NEW
> wave authored (the gestalt is fully covered by the two extant waves + the booked tokens);
> nothing pruned/excised. Reference implementation for every clause:
> `docs/tranches/BD/greenfield/tabs/GOLDEN.md`.

---

## A. AUGMENT — `BD.W-TAB-IOS-CAPSULE.md` (the MATERIAL layer)

The wave already mints the recess (C1) + the shared capsule fold (C2) + the W55 seam (C3) +
the dock-tab fold. The amendment folds FIVE hardenings:

1. **RENAME the register `.glass-tab-capsule` → `.glass-capsule`** (file `glass/tab-capsule.css`
   → `glass/glass-capsule.css`). Reason: it is a ≥3-consumer register (segmented pill · dock-tab
   selected · **Button glass**); dropping the "tab" noun lets the buttons greenfield substitute
   it without a tab in the class name. Clean break, no alias (no-legacy). Update C2/C5's
   selector + file citations.

2. **ADD the warm-floor RE-INVENT to the capsule FILL itself (the load-bearing fix).** The
   wave's C3 puts the W55 seam on the capsule but the seam's FLOOR desaturates — live-measured
   the selected indicator is `oklab(0.793 0.005 0.012)` → **chroma 0.0128 < 0.02, near-gray**
   over the aurora (the flat beige-gray slab in `golden/delta-current-light.png`). Add the warm-
   admit floor (a small compose toward `--glass-tint-source`, warm both modes) to `.glass-capsule`
   so the CAPSULE meanChroma clears 0.02, not only the track.

3. **CORRECT the §0 census + ADD the capsule-chroma born-RED arm.** The capsule (not the track)
   is where the gray lives — the wave's C3 born-RED row must scan CAPSULE meanChroma over a LIVE
   aurora, and the de-risk must exercise the real `light-dark()`/`color-mix(oklab)` seam, NOT a
   hardcoded-hsl spike (the spike proves a look-alike, not the shipping material — challenge §2-R7,
   §3-R2).

4. **ADD `.glass-capsule-hover` composing the SHARED specular-lift primitive (NOT a fork).** The
   wave is silent on hover; the user's literal "better hover" ask lands here. But `.glass-drag-lift`
   (`segmented-tabs.css:399`, `--glass-specular: 0.1` + `will-change`) ALREADY ships the two-channel
   specular-lift idiom (challenge §1-R3). Factor the shared lift primitive ONCE; `.glass-capsule-hover`
   (`--glass-specular: 0.14` + `scale: 1.015` hover / `0.97` press, fast bezier clock) and
   `.glass-drag-lift` both compose it. The non-selected pill composes `.glass-capsule-hover`. The §0
   census "hover ABSENT" → "PARTIAL (drag-lift exists, hover/press absent)".

5. **AUGMENT the gate `proof:tab-ios-capsule`** with two new born-RED arms:
   - **C6 (NEW) — the capsule is WARM, not gray.** `.glass-capsule`'s resolved fill over a live
     aurora reads meanChroma ≥ 0.02 BOTH modes (the warm-floor). **Born-RED on HEAD**: live
     capsule chroma 0.0128 < 0.02. Self-test bite: a capsule fill with no warm-admit floor →
     C6 RED.
   - **C7 (NEW) — the hover register COMPOSES, not forks.** `.glass-capsule-hover` and
     `.glass-drag-lift` resolve the SHARED specular-lift primitive (one declaration of the
     `--glass-specular` step); a second parallel specular-lift block → C7 RED.

   The nested-glass parity (challenge §2-R0) is folded into the π (below), not a source gate.

**π augment (`tests-visual/tab-ios-capsule.spec.ts`):** ADD a **paired-engine (chromium +
webkit)** arm that MEASURES the capsule-over-track luminance/blur delta and asserts it within
tolerance on BOTH engines (parity PROVEN since the capsule IS nested in the track's
backdrop-filter — never declared "by construction"). ADD the capsule meanChroma ≥ 0.02 scan over
the LIVE aurora, both modes.

---

## B. AUGMENT — `BD.W-TABS-LIQUID.md` (the MOTION layer)

The wave already specs the 5-beat blob (C1-C6) as a 2nd `useLiquidFlex` channel on the ONE
clock. The amendment folds FIVE hardenings:

1. **FENCE the drive authority to IMPERATIVE (the double-animation fix — challenge §2-R5,
   §3-R3).** `useLiquidFlex` is a pure projection; the indicator drives `--stretch` IMPERATIVELY
   (verified: `--stretch` is NOT `@property`-registered + NOT CSS-interpolated — the CSS
   transitions the composed `scale`). `--tab-blob` MUST follow: written every frame by the 2nd
   `useLiquidFlex` channel, NOT added to a CSS `transition` list. The `@property --tab-blob`
   registration exists ONLY so the discrete release-frame write doesn't snap-flicker. Correct C1's
   prose: the registered precedent is `--glass-accent`/`--progress`, NOT `--stretch` (which is the
   IMPERATIVE sibling precedent).

2. **FENCE the cap on the COMPOSED visible area, not the bare scalar (the TOP refutation —
   §1-R1/§2-R2/§3-R1 unanimous).** Live-measured composed peak is ~1.21–1.24× (blob × stretch on
   the long axis) — it BREACHES the GOLDEN's own ≤1.12 fence. Re-derive: the fence is the COMPOSED
   bbox area ≤ ~1.14; drive `--tab-blob` toward a LOWER target (~1.045) so the curve-amplified,
   stretch-composed peak lands ≤ ~1.14. C6 (the cap clause) measures `blob × stretch`, not the bare
   `--tab-blob`. Re-tune `--tab-indicator-max-stretch` 1.18 → ~1.11 once the blob carries the "grow"
   (and fix the stale 1.08/1.15 comments — challenge §1-R4).

3. **ADD the missing UPPER-bound gate arm.** The wave's π asserts the area EXCEEDS target (lower
   bound) but has NO upper bound — it would GREEN a 1.4× taffy blob. ADD to the π's grow+overshoot
   step: `peakArea/targetArea ≤ 1.14 → else RED`. A `--tab-blob`-pinned-1 control never exceeds
   (born-RED on HEAD — no blob channel); a >1.14 peak now also REDs (the taffy fence).

4. **FRAME-DENSE, N/N π (the flake fix — challenge §1-R1, §2-R1, §3-R1).** The §8 gate samples at a
   fixed dense cadence (≥30 frames or ~8ms `setInterval` over the full clock, not a 700ms race that
   yields 5 rAF frames — live-confirmed 5 frames), asserts on the MONOTONE shrink-to-fit tail (last
   N frames strictly decreasing toward target ±2%), runs the morph N times and requires N/N green.
   ADD a rapid-switch arm: fire `select()` 4× in 200ms, assert the indicator still lands fitDelta <
   0.06 (the rapid-switch desync the single `releaseTimer` must flush atomically). The spike PNGs
   are re-shot from a real GREEN run with the honest measured numbers (the committed spike froze
   `ALL_PASS: false` while §9 reported GREEN — challenge §2-R1).

5. **NAME the flood + glyph-pop sub-channels + the underline fence.** `--tab-flood-t` (the opt-in
   `::after` accent-flood, `plus-lighter`) requires `isolation: isolate` on the
   `.segmented-indicator` host + an `@supports (mix-blend-mode: plus-lighter)` floor + the gradient
   `in srgb` (additive), NOT `in oklab` (challenge §2-R4). The flood fires a beat AFTER the SPATIAL
   open (EFFECTS-after-SPATIAL, T4), PRM-static, default `--glass-accent: transparent` → no-op rest.
   The glyph scale-pop is `scale: calc(1 + 0.06 × var(--motion-weight))` on `.segmented-tab[aria-
   pressed="true"]` (NOTE: the live selection model is **`aria-pressed`**, not `aria-selected` —
   verified live; the wave/golden must target `aria-pressed`), settling AFTER the capsule (a 60ms
   delay). `--tab-blob` is written ONLY on `.segmented-indicator` (`:121`/`:129`); the underline
   `::before` (`:311`/`:324`) keeps bare `scale: var(--stretch) 1` — the blob is a pill-material
   channel, the underline is paper-ink and NEVER inflates (the §8 material fence, challenge §3-R4).

6. **DEPEND the two motion tokens — do NOT mint.** `--motion-weight` (booked: `BD.W-MOTION-WEIGHT`)
   + `--ease-cartoon-punch` (booked: `BD.W-CARTOON-PUNCH`). The GOLDEN §3a "MINT them" is REDUNDANT
   (the same reconciliation dock-core/dock-fission/goo-morph/cartoon-shadow all made) and DROPPED.
   Add a DEPEND edge; the wave CONSUMES the booked tokens, re-ships neither.

**Gate clauses that stay born-RED on HEAD (live-verified this pass):** C1 (no `--tab-blob`
registration), C2 (only ONE `useLiquidFlex` in `useTabIndicator.ts` — live confirmed), C3 (no
grow-overshoot-shrink envelope — live area peakRatio 0.74, never >1), C4 (no CSS reads
`--tab-blob`). PLUS the new arms: composed-peak ≤1.14 upper bound, capsule meanChroma ≥0.02.

---

## C. DEPEND (no edit — consume booked tokens)

- **`BD.W-MOTION-WEIGHT`** → ships `--motion-weight` (1/φ, PRM→0). Tabs CONSUMES.
- **`BD.W-CARTOON-PUNCH`** → ships `--ease-cartoon-punch` (the raw `linear()`). Tabs CONSUMES.

Both born-RED-verified empty on `:root` this pass (the gate arms that `var()` them stay RED until
the booked waves land — the correct dependency order).

---

## D. CROSS-LINK (shared register, no re-mint)

- **`BD.W-DOCK-TAB-INDICATOR`** (IOS27-REFERENCE T4, ~60%, PROPOSED — not yet on disk). When
  authored, its per-glyph scale-pop + one-shot dock accent-flood CONSUME the SAME `--tab-flood-t`
  flood `::after` recipe + the glyph-pop register the tabs amendment ships (the flood lives in
  `.glass-capsule`'s parameterized `::after`, dormant at `--tab-flood-t: 0`). No re-mint — the
  dock-tab selected arm re-points onto the shared `.glass-capsule` + reads the shared flood. (This
  cross-link is recorded so the dock-tab wave, when formed, DEPENDs the tabs amendment rather than
  forking a parallel flood.)

---

## E. RESOLVE (downstream ledger close)

- **buttons row (§6, `glassy-like-tabs`)** — RESOLVED by the `.glass-capsule` +
  `.glass-capsule-hover` extraction (A.1, A.4). The buttons greenfield composes the two classes +
  sets `--glass-accent`; "make buttons glassy like the tabs" is a one-recipe substitution. No
  parallel button-glass fork; the buttons row's build is the CONSUME of this amendment's register.

---

## F. PRUNE / EXCISE

- **PRUNE: none.** Both tab waves are fit and AUGMENTED, not superseded.
- **EXCISE from the GOLDEN (folded, not built):** the §3a "MINT `--motion-weight`/
  `--ease-cartoon-punch`" instruction (REDUNDANT — booked elsewhere); the §6 "not nested → parity
  by construction" claim (FALSE — the capsule IS nested; parity is PROVEN by the paired-engine π);
  the §9 cherry-picked spike numbers (`fitDelta 0.000`, `peak 1.163×` — non-reproducible; re-shot
  honest); the §1/§3b "caps ≤1.12" bare-scalar fence (re-derived onto the COMPOSED area ≤1.14); the
  §2c "hover ABSENT" census (corrected to PARTIAL — `.glass-drag-lift` exists).
- **No NEW wave authored** — the gestalt is fully covered by `BD.W-TAB-IOS-CAPSULE` (material) +
  `BD.W-TABS-LIQUID` (motion) + the two booked motion tokens. Authoring a third would double-spec.

---

## G. The born-RED summary (what fails on HEAD, live-verified)

| Gate arm | Wave | HEAD live state | Verdict |
|---|---|---|---|
| `--tab-blob` `@property` registered | TABS-LIQUID C1 | `(empty)` on `:root` | RED |
| 2nd `useLiquidFlex` blob channel | TABS-LIQUID C2 | one channel only (`:172`) | RED |
| 5-beat grow→overshoot→shrink | TABS-LIQUID C3 | area peakRatio 0.74, never >1 | RED |
| CSS reads `--tab-blob` | TABS-LIQUID C4 | no reader | RED |
| composed peak ≤ 1.14 (NEW upper bound) | TABS-LIQUID π | n/a (no blob); composed live ~1.21 if naively built | RED-able |
| recess inset leg on track | TAB-IOS-CAPSULE C1 | track rim-only (no recess groove) | RED |
| `.glass-capsule` factored, ≥2 consumers | TAB-IOS-CAPSULE C2 | inline composite, no shared class | RED |
| capsule meanChroma ≥ 0.02 (NEW C6) | TAB-IOS-CAPSULE C6 | capsule chroma 0.0128 | RED |
| `.glass-capsule-hover` composes shared lift (NEW C7) | TAB-IOS-CAPSULE C7 | no hover register (color-only) | RED |
| `--motion-weight` / `--ease-cartoon-punch` | DEPEND booked | `(empty)` on `:root` | RED until deps land |

Artefacts captured this pass: `golden/delta-current-light.png` (the flat-gray slab over the
aurora — the load-bearing visual defect). Live readback: capsule `oklab(0.793 0.005 0.012)`
chroma 0.0128; track `srgb .994 .96 .926` (warm); `--tab-indicator-max-stretch: 1.18`; far-tab
glide cxRange 236px / stretchMax 1.13 / area peakRatio 0.74.
