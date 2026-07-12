# BI.W-RADIUS-GRAMMAR — the concentric-radius relay (Law 1) + capsule-vs-card (Law 2)

Band B1 (geometry grammar). Introduces `proof:geometry-grammar` (the ONE 4-law gate) and discharges
Laws 1+2. Laws 3+4 stay RED until their sibling waves (W-METAL-RIM-BAND, W-SHADOW-GRAMMAR) land.

## §Mandate

Discharges (registry rows this wave OWNS):
- **UF-A1** — "super rounded … Section is totally wrong and un-idiomatic … rounded more like a card"
  (the library-wide capsule-vs-card mandate; ss-04/05). The LAW is minted here; its configurator-section
  application lands in W-CONFIG-IN-SHEET.
- **UF-A2 / UF-H3** — vertical SegmentedTabs track balloons (ss-19; live-measured 10003px on a 92×132 box).
- **FAM-4** "Vertical tabs track balloons" · **GEO-1** (radius-grammar) · **GEO-5** (no concentric law) ·
  **GEO-6** (ToggleGroup single-select track pill vs card-item mismatch — fold).
- **bld:radius-grammar** (CHRONIC-DISPOSITIONS §2, ⚠ DISEASE, rode BE→BG un-decided) — BUILD, landed here.
- **Ruling 11** (PASS-4B) — the Law-1 concentric relay WIRES to its three real nesting sites; this wave
  mints the relay + wires site #2 (vertical tabs track → indicator arc). Sites #1/#3 (configurator
  sections, gear-sheet-nested sections) are W-CONFIG-IN-SHEET landing obligations.

## §Design

Decided mechanism — D-GLASS PASS-1 §4 (Laws 1+2), ADVANCED at PASS-4B (glass 80, converged: the born-RED→
GREEN `proof:geometry-grammar` differential is BUILT + measured in the `bi-p4b-glass` worktree). NO
re-litigating: the gate + the fix shape are decided.

- **Law 1 — concentric relay `inner = max(floor, ctx − inset)`.** A plain INHERITED custom-prop relay (Apple
  `ConcentricRectangle`, iOS 26): a container publishes `--radius-ctx` (its resolved radius) + `--radius-inset`
  (its inner pad); a nested CARD-class surface writes `border-radius: max(var(--radius-floor,4px),
  calc(var(--radius-ctx) − var(--radius-inset)))`. The **2-level relay is the contract** (covers 4/5 audited
  sites); depth-N `inherit()` is BOOKED (Chrome-only, non-Baseline), NEVER a masking fallback. New tokens in
  `theme/radius.css`: `--radius-ctx`, `--radius-inset`, `--radius-floor`.
- **Law 2 — capsule-vs-card.** A stadium radius (`--radius-pill/-tab/-control/-badge/-dock`/`9999px`) is legal
  ONLY on a single-control-row interactive strip. A COLUMN-STACK (`*--vertical`/`flex-direction:column`) VARIANT
  of a stadium base must re-bind the family radius var to a BOUNDED rung. Mint **`--radius-strip`** (≈12px,
  between `--radius-control` and `--radius-card`); the vertical tab track reads it; the shipped concentric calc
  (`segmented-tabs.css:47`) derives the indicator arc for free. The **capsule-exemption is an ANCHORED allowlist**
  (`DOCK_UNCONDITIONAL` = `.glass-dock`/`.dock-icon-button`/…; `SINGLE_ROW_PILL` = `.glass-chip`/`.badge`/
  `.segmented-tab`/…) — NOT an open noun-match (the pass-3 noun-hole closed: `.dock-layer-list` column-stack is
  NOT exempt).
- **Law-1×Law-2 coupling:** the concentric derivation applies to CARD-class surfaces ONLY; a capsule member reads
  the pill token UNCONDITIONALLY (pill-in-pill exemption, verified live on dock controls).
- **`wants:concentric-radius` reconcile:** the retired `--radius-concentric` shared register stays DEFINITION-
  ABSENT (grep=0 verified §5); the Law-1 relay is a DISTINCT mint (`--radius-ctx`/`-inset`/`-floor`), and the
  per-surface `containerConcentric` idiom (segmented-tabs.css:43) is KEPT + generalized.

## §Work

- `scripts/proof-geometry-grammar.mjs` — LAND from `.claude/worktrees/bi-p4b-glass/scripts/proof-geometry-grammar.mjs`
  (postcss 4-law rule-walk + 14-bite selftest, verified). Register in `scripts/gates.manifest.mjs` (`geometry-grammar`,
  tags `["local","ci"]`).
- `src/styles/theme/radius.css:44-64` — mint `--radius-ctx`/`--radius-inset`/`--radius-floor` (§ new block) +
  `--radius-strip: 0.75rem` beside `--radius-field`.
- `src/styles/segmented-tabs.css:46,66-72` — the `.segmented-tabs--vertical` arm re-binds `--bouncy-slider-radius`
  off `--radius-tab` onto `--radius-strip` (the horizontal `.segmented-tabs` byte-untouched); the concentric
  track-radius calc (`:47`) re-resolves the bounded indicator arc for free.
- `src/components/ui/toggle-group/ToggleGroup.vue:46-49` — the single-select track publishes `--radius-ctx`/
  `--radius-inset` (the `p-1` inset) so a `variant="card"` item derives `track = card + 4px` (GEO-6 auto-fall).
- Wire the vertical-track indicator as the Law-1 site #2 `var(--radius-ctx)` reader (satisfies the gate's
  READER-REQUIRED clause the moment the relay mints — no dead relay).

## §Acceptance

Gate: **`proof:geometry-grammar`** (`["local","ci"]`). Born-RED at HEAD: 4 violations (one per law).
This wave discharges **Law 1** + **Law 2** clauses → RED(4) → RED(2, Laws 3+4 pending).
- Law 1: `--radius-ctx/-inset/-floor` MINTED **and** ≥1 `var(--radius-ctx)` reader (relay-unminted + relay-unread
  both born-RED at HEAD; GREEN here).
- Law 2: no stadium radius on a column-stack surface off the anchored exemption (born-RED at HEAD:
  `.segmented-tabs--vertical` inherits `--radius-pill`; GREEN here on `--radius-strip`).
- Self-test: 14 bites (≥1 flag + ≥1 pass per law; the noun-hole `.dock-layer-list` flags; `.glass-dock` exemption
  passes) — always GREEN (proves the detector is not hollow).

## §π/DELTA

`tests-visual/geometry-grammar.spec.ts` — the W-GEOMETRY-GESTALT capture (the gate docstring's binding truth):
- vertical tab track on `--radius-strip` (getComputedStyle `border-radius` ≈ 12px + trim, NOT the ~46px stadium
  clamp) + the indicator arc concentric (glide/squish frame-series, no clip, transform-origin intact);
- the dock pill-in-pill exemption HELD (`.glass-dock` still 9999px);
- ToggleGroup single-select track = card+4px when items are `variant="card"`.
- Chromium + real WebKit, BOTH modes. LOCAL-only.

## §Obligations

- Device run: real-WebKit capture rides the band's W-METAL-RIM-BAND / W-SHADOW-GRAMMAR gestalt device run (the
  whole-surface pixel-sampled readback, ruling 10).
- No cross-repo ask (additive tokens + a column-stack radius re-point; the `--radius-*` aliases are library-internal).

## §Dispositions

- **bld:radius-grammar** (⚠ DISEASE) → BUILD, LANDED. Terminal.
- **wants:concentric-radius** → RETIRE-verified (the `--radius-concentric` shared register stays absent) + KEEP
  the per-surface idiom (now generalized into the Law-1 relay). Terminal, no re-book.
- **GEO-6** → folded (the concentric law auto-derives the track rung per item variant).
- Liveness probe (CHRONIC-DISPOSITIONS §8): a multi-row/tall box binding a pill token REDs; the relay-unread
  clause REDs a minted-but-dead `--radius-ctx`.
