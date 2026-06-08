# A-squircle-pivot — every radius/corner-shape site audited + the rounded-vs-squircle policy map (G3)

**Lane:** AUDIT (source-level). **Severity:** major. **Verdict:** net-new-wave (G3) —
**but the SOTA half is ALREADY written** at `convergence2/R-squircle.md`; this audit is the
SOURCE-SITE half (every radius/corner-shape file:line + the re-home policy). The two fold into
ONE G3 wave. **No new W-number assigned yet** (highest authored wave = W52; G3 is net-new per
`A-tranche-wave-audit.md` which lists it as a foundational glass-IDENTITY net-new wave).

---

## 0. The cardinal finding (the source contradiction)

The user's G3 ask is precise: **rounded for cards, rounded for (small) docks, but big-docks +
the like → squircles.** The shipped AW.W23 code does the INVERSE — it squircles
`.glass-card` + `.glass-btn` + `.btn-pill` (cards + buttons) AND the big-dock. So today
EVERY glass card and EVERY glass icon-button/pill gets `corner-shape: squircle` (under the
Chrome-139 `@supports` gate), which directly contradicts "rounded for cards". G3's core job
is a **re-home** (pull squircle OFF cards/buttons, concentrate it on the big-dock family) +
a **token axis** so the corner SHAPE is as overridable as the corner RADIUS. This is a clean
break — no alias, just move the keyword per the policy.

---

## 1. Every corner-SHAPE site (audited at HEAD 5cf2980)

Only 2 live `corner-shape` declarations exist (+ 1 doc comment + 1 refraction-profile bake):

| Site | What it does | Policy verdict |
|---|---|---|
| `src/styles/glass.css:721-728` | `@supports (corner-shape: squircle)` → `corner-shape: squircle` on **`.glass-card`, `.glass-btn`, `.btn-pill`** | **RE-HOME.** Pull squircle OFF all three (cards + icon-buttons + pills stay ROUND per user). This rule is the contradiction. |
| `src/styles/dock.css:537-541` | `@supports` → `corner-shape: squircle` on the big-dock card shell `.glass-dock.variant-dock:not(.vertical).shape-card` | **KEEP + TOKENIZE.** This is the ONE site the user WANTS squircle. Re-point bare `squircle` → `var(--corner-shape-bigdock)`. |
| `src/components/custom/dock/GlassDock.vue:57` | comment documenting the dock squircle PE rationale ("reads better at the large card radius") | keep (the rationale is now the canonical policy). |
| `src/styles/glass-refract.css:1-60` | `#glass-refract` displacement filter **baked from** the squircle profile `y = ⁴√(1−(1−x)⁴)` (n=4 convex-lens corner) | **NOT a corner-shape decl** — it's the refraction substrate. Orthogonal to G3; leave. The squircle geometry already IS the lens curve. |

The `@supports` gate is correct (Safari/FF/old-Chrome fall back to `border-radius` round at
zero cost; ~65% global support May 2026). It STAYS — G3 keeps the PE tier, never makes
squircle the contract. The clip-path cross-engine fallback is REJECTED (it hard-clips the
backdrop-filter blur halo + the cartoon offset-shadow that live outside the border-box) —
recorded as a DECISION so a later agent doesn't "fix" the 35% gap with a JS path generator.

## 2. Every corner-RADIUS site (the token ladder that STAYS, the policy reads it)

`src/styles/theme.css:28-65` is the radius half of the system — already complete + token-first:

- Primitives: `--radius-{xs,sm,md,lg,xl,2xl,3xl,pill}` (4px → 16px → 24px → 9999px).
- Semantic aliases: `--radius-card`=2xl(16px), `--radius-panel`=xl(12px), `--radius-dialog`=2xl,
  `--radius-dock`=pill, `--radius-dock-card`=3xl(24px), `--radius-field`/`--radius-control`,
  `--radius-badge`=pill, `--radius-tooltip`=lg.

Consuming radius sites (these set the RADIUS box; `corner-shape` only changes the CURVE within it):
- `src/styles/glass.css:383` `.glass-card` → `--radius-card` (16px) · `:411` `.glass-btn` →
  `--radius-pill` · `:467` `.btn-pill` → `--radius-pill` · `:524` big-dock shape → `--radius-pill`.
- `src/styles/dock.css:525-531` big-dock `.shape-card` lerps `--radius-pill → --dock-card-radius`
  off `--dock-expand-t` (the single-scalar morph; W01) — the radius animates collapsed→expanded.
- `src/components/ui/card/Card.vue:129` `rounded-card` · `button/index.ts:73-75` `rounded-pill`.

**The radius axis is NOT changed by G3.** The squircle reads ONLY at the LARGE radius (the
big-dock's `--radius-3xl`/24px), which is exactly why "rounded for cards/pills" works — at a
16px card radius or a stadium pill the superellipse is imperceptible, so dropping squircle off
them is visually free. The whole point: corner SHAPE is a SECOND axis the user wants tokenized
PARALLEL to the existing corner RADIUS axis. There is no `--corner-shape-*` / `--squircle-k`
companion today — that's the gap.

## 3. The G3 recipe (consumes R-squircle's CSS approach — token-first)

R-squircle.md §3 has the full implementable recipe; the source-audit confirms it lands cleanly:

1. **Mint `--corner-k-*` + `--corner-shape-*` in `theme.css`** alongside the radius primitives
   (plain `@theme`): `--corner-k-squircle: 2` (MDN: `squircle == superellipse(2) == n4`),
   `--corner-k-soft: 1.7`, `--corner-k-sharp: 2.4`; semantic `--corner-shape-card: round`,
   `--corner-shape-pill: round`, `--corner-shape-bigdock: superellipse(var(--corner-k-squircle))`,
   `--corner-shape-panel: round`. The POLICY lives in these aliases.
2. **Re-home glass.css:721-728** — DELETE the `.glass-card`/`.glass-btn`/`.btn-pill` squircle
   block (they're round per `--corner-shape-card`/`-pill`). Clean break, no alias.
3. **Tokenize dock.css:539** — `corner-shape: squircle` → `corner-shape: var(--corner-shape-bigdock)`.
4. **Record the clip-path REJECTION** + keep the `@supports` PE gate.
5. **`proof:squircle-policy`** device-free gate: assert the `@supports` gate is leak-free; assert
   the policy (big-dock reads a superellipse; card/button read round/unset). π-arm Chrome-139:
   `getComputedStyle(...).cornerShape === "superellipse(2)"` on big-dock, `round`/unset on a card.

## 4. The "and the like" candidate list (NEEDS-USER-DECISION facet)

User said "big-docks + the like → squircles". The big-dock is unambiguous. The "and the like"
large-radius family is a design call — candidate members (surface to user, do NOT guess):
- Dialogs / `--radius-dialog` (2xl) — large overlay, plausible squircle.
- Large panels / `--radius-panel`, the Configurator panel.
- Sheets / Drawer top corners.
- Hero glass overlays.
NOT: cards (explicitly round), pills/buttons/badges (round/stadium), inputs/controls (small radius).
The G3 wave must enumerate these as a candidate list with the default = big-dock ONLY, and let
the user opt additional surfaces in (each just reads `--corner-shape-<surface>`).

## 5. Dedup against existing waves (CRITICAL)

- **R-squircle (sibling convergence2 SOTA lane) — SAME wave, the OTHER half.** R-squircle is
  the SOTA technique + browser-support + the CSS recipe; A-squircle-pivot is the SOURCE-SITE
  audit + the re-home policy map. They are NOT two waves — they are the research+audit pair
  that feeds ONE net-new G3 wave. **Dedup: fold both into the single G3 wave plan; do not
  mint two.**
- **W42 (liquid-morph-substrate) §19.11 — DECONFLICTED, composes, not a dup.** W42 owns a
  CONTINUOUS, animatable `--superellipse-k` axis `calc()`'d off `--morph-t` for the DOCK
  silhouette's liquid reshape (corner-roundness relaxes as the dock expands) — a MOTION axis
  on ONE surface, and it's a SCOPED-GO flagged door that ships only if the dock consumer
  actually drives it. **G3 is the STATIC library-wide SHAPE TOKEN SYSTEM + the policy.** They
  share ONE `k` vocabulary: G3 mints `--corner-k-squircle`; W42's dock-morph `calc()`s its
  animated `k` against it. **G3 must land the token band so W42 reads it — cross-ref both.**
  No duplicate `k` definition.
- **AW.W23 (shipped) — G3 EXTENDS + RE-HOMES, not duplicates.** The 2 bare `corner-shape:
  squircle` keywords are AW.W23's. G3 tokenizes + re-homes per the user's policy.
- **W52 (liquid-glass material) — no overlap.** W52 = the blur/specular/edge-gleam MATERIAL;
  it inherits whatever silhouette `corner-shape` paints. Orthogonal.
- **W45 (dock region-model + mobile scale) — no overlap.** W45 = dock LAYOUT/scale, not corner
  shape. The big-dock squircle stays a glass/dock-css concern.
- **A-glass-tokens / G1 (glass-first-class) — orthogonal axis.** That convergence2 lane itself
  records "the squircle wave (G3) is orthogonal (radius axis, not level)". G1=level axis,
  G3=shape axis. Distinct.

**Verdict: net-new-wave (G3), folding R-squircle (SOTA) + A-squircle-pivot (this audit).**
W42 reads G3's `k` token band (cross-ref). AW.W23's 2 keywords are extended + re-homed. The
"and the like" membership is a needs-user-decision facet inside the wave.
