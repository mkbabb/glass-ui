# Paper Morphism — WAVE-AMENDMENT (concrete tranche reconciliation)

Reference implementation: `docs/tranches/BD/greenfield/paper-morphism/GOLDEN.md`
(+ the 3 challenge hardenings folded; see `DELTA-ASSAY.md`).
Reconciled against the extant 116-wave set in `docs/tranches/BD/union/waves/`.
**No new parallel wave** — the paper register has exactly ONE wave; it is AUGMENTED in place.

---

## AUGMENT — `BD.W-PAPER-MORPHISM` (the ONE paper wave; rewrite its scope)

**File:** `docs/tranches/BD/union/waves/BD.W-PAPER-MORPHISM.md`

The landed wave is a DEMO-LOCAL strength recalibration over the self-cancelling `overlay`
blend — a no-op (the blend cannot move a near-white pixel; live-proven). It also predates the
`--paper-grain-opacity` split (it describes the grain reading 0.025; the split landed). **Replace
its scope** with the LIBRARY-register texture+blend+calibration redesign. Keep its coverage legs
+ π skeleton, re-based.

### Scope changes
1. **RE-TEXTURE** (`src/styles/paper.css`) — replace the single `feTurbulence bf=0.65 4-oct` +
   `feBlend multiply in2=SourceGraphic` cloud (lines 17, 39) with the NEW `--paper-grain-tooth`
   token: coarse anisotropic `baseFrequency='0.04 0.09'` 2-oct, `feColorMatrix saturate=0`,
   `feComponentTransfer` slope-1.8/intercept-(-0.4) RGB contrast-stretch + `feFuncA slope=0
   intercept=1` (full opaque alpha — challenge-2 R2), `<filter color-interpolation-filters='sRGB'>`
   (pin sRGB — challenge-2 R1). Tile 140px. DELETE the `feBlend` mud op. NO fiber band
   (challenge-1 R1 — it paints std 0.0/0.40).
2. **BLEND LAW** (`paper.css`) — tooth `::after` + underpaint: `multiply` (light, `:21,:43`) /
   `screen` (dark, `:26,:49` — was `soft-light`). Plain per-mode arms.
3. **RE-CALIBRATE** `--paper-grain-opacity` — `glass-fx.css:23` (light) + `dark-arm.css:225`
   (dark): same token NAME, values RE-DERIVED from the live painted std on the pinned-sRGB
   coarse texture at the **no-squint floor std ≥ 4.5 light** (challenge-3 R2), NOT inherited
   from the golden's linearRGB/JND-3.0 capture. Golden's 0.22/0.16 = the START anchor (expect
   step-down under sRGB). Mint `--paper-grain-tile: 140px`.
4. **UNIFY scale-paper** — `--paper-clean-texture`/`--paper-aged-texture` (`scale-paper.css:118-119`)
   re-expressed as `--paper-grain-tooth` + a per-variant `bf`/`seed` delta (clean tighter, aged
   coarser); DROP baked `opacity='0.04'/'0.06'` (challenge-2 R3). Consumers (`cards.css:11`,
   `glass/ladder.css:447`, `dock/shell.css:257`) re-resolve for free.
5. **WASH** — `--story-paper-wash` light off `transparent` → `color-mix(in srgb,
   var(--foreground) 4%, transparent)` (`story-hero.css:27`); keep `.dark` 7% (`:57`).
6. **COVERAGE** — wire `ShowcaseFrame :grain` on `typography.vue` (the headline miss — KEPT
   from the landed wave) + the print specimens; `Card :grain`/`surface="paper"` on
   `math-paper` worksheet + `paper-glass` specimens. DROP the `--story-paper-grain` demo-rung
   indirection (now redundant — the library token reads directly; KISS).
7. **OPT-IN PUNCH** — the `--paper-emboss` `::before` raking-light sweep (default 0),
   `vSpecular`-composed via `--specular-angle` (`glass-specular-track.css`), `screen`/`overlay`
   highlight blend (NOT soft-light), `--motion-rest` ramp, PRM→0. ONE tooth `::after` + ONE
   emboss `::before` (the freed-from-fiber pseudo — challenge-1 R2).
8. **a11y** — EXTEND `paper.css:55-59` PRM-reduced-transparency bracket to reach the `::before`
   emboss + `--paper-grain-opacity: 0` + wash→opaque; ADD `--paper-grain-opacity: 0` to the
   EXISTING `a11y-fallback.css:15` (reduced-transparency) + `:64` (forced-colors) brackets,
   beside `--glass-grain-opacity: 0`. (Challenge-3's "a11y-fallback.css does not exist"
   refutation is FALSE — the file exists at `src/styles/glass/a11y-fallback.css`; this
   instruction is correct.)
9. **FENCE** — `--glass-grain-opacity` BYTE-UNTOUCHED 0.025 light / 0.045 dark;
   `.glass-material::after` keeps reading it. `proof:glass-cal` re-asserted GREEN.

### Behavioral-break flags (no-legacy clean breaks)
- underpaint dark `soft-light` → `screen`; light `--story-paper-wash` `transparent` → 4% tint;
  `--story-paper-grain` demo rung RETIRED; `--paper-clean/aged-texture` SVGs replaced. No
  aliases, no migration shims.

### REWRITE the π / gate — `proof:paper-morphism` (re-based; see DELTA-ASSAY §4)
The landed wave's P1 (`--story-paper-grain` exists) is RETIRED (the rung is dropped). New gate:
1. live-route painted std-dev **≥ 4.5** (light) on the washed plate — measured on the REAL
   `::after` node, not a canvas proxy (challenge-1 R3).
2. tooth blend == multiply(light)/screen(dark).
3. texture == coarse contrast-stretched tooth + resolved `color-interpolation-filters` == sRGB
   + dominant-period ≥ ~16px (challenge-2 R1 / challenge-3 R2).
4. `--story-paper-wash` != transparent (light).
5. fence: `--glass-grain-opacity` == 0.025 (light) AND 0.045 (dark) — per-mode (challenge-3 R4).
6. warm-floor mean-chroma < gray-threshold on BOTH the opaque plate AND a through-glass tile
   over a saturated field (challenge-3 R5).
7. @webkit paired arm: live-route std within tolerance (honest only post-sRGB-pin).

**Born-RED at live HEAD** (verified Chrome `:5173`, screenshot `golden/delta-head-light.png`):
flat cream, std 0.02–0.86, `overlay` blend, wash transparent, tooth token empty.

### FOLD into this wave (sub-legs, NOT new waves)
- The `position:fixed` underpaint 8-stack containment (the page-deep audit finding
  `viz/page-deep/foundations-paper-texture-*.md`) rides the same `paper.css` edit. No
  `BD.W-PAPER-BACKDROP-CONTAIN` wave exists to fold; it is an audit note.

---

## NEW de-risk leg (build-time, inside the AUGMENTED wave — not a separate wave)

- **Through-glass + WebKit spike** (challenge-3 R5): a `paper-grain-overlay::after`
  (multiply/screen) on a real `.glass-material` tile over a saturated aurora field, measured in
  Chrome AND Playwright-webkit, asserting (a) std ≥ floor through the glass, (b) mean-chroma
  stays warm (no field-chroma pickup → no gray), (c) WebKit std within Chrome tolerance. This
  closes the §3 "paper felt through glass" claim (the most identity-load-bearing, least-proven
  application) and the coarse-tooth re-measure on DPR 3.

---

## PRUNE / EXCISE

- **EXCISE** the `--story-paper-grain` demo-rung mechanism from the landed wave's mechanism
  section (legs 1–2) — superseded by the corrected library token (no dual-path).
- **No wave deleted** — `BD.W-PAPER-MORPHISM` is augmented, not pruned.

## NO-DUP (cross-pointed, not overlapping)

- `BD.W-PAPERGRID-WARP` / `BC.W-VIZ-PAPERGRID` — geometric LINE grid (`.paper-grid`), an
  orthogonal register; composes WITH the grain. KEEP separate.
- `BD.W-TOKEN-TOUR-GLASS` + page-composition waves — downstream consumers; KEEP separate.
- `proof:glass-cal` / `proof:no-gray` — cross-asserted GREEN-by-construction (library token
  untouched).

## Touched files (build-time)

`src/styles/paper.css` · `src/styles/tokens/glass-fx.css` · `src/styles/tokens/dark-arm.css` ·
`src/styles/tokens/scale-paper.css` · `src/styles/glass/a11y-fallback.css` ·
`demo/stories/story-hero.css` · `demo/.../ShowcaseFrame.vue` consumers (`typography.vue`,
`math-paper`, `paper-glass`) · `scripts/proof-paper-morphism.mjs` (rewrite) ·
`tests-visual/paper-morphism.spec.ts` (re-base to live-route + @webkit).
