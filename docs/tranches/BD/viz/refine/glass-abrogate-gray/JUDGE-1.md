# JUDGE-1 — BD.W-GLASS-ABROGATE-GRAY (iteration 1)

**VERDICT: PASS — the fix DECISIVELY meets the directive.** The dark-gray glass is abrogated.
Every flagged surface (Select dropdown · Combobox dropdown · glass Cards · toggle Buttons · the
paper-glass tiers) now reads as warm-cream LUMINOUS TRANSMISSIVE glass with READABLE text, in
BOTH light AND dark mode. Live-measured (getComputedStyle → composited OKLab) + screenshot-confirmed
on `localhost:5173`. `proof:no-gray` is GREEN (36/36) with the gray-certifying floor RAISED to a
real warm-material bar.

---

## LIVE EVIDENCE (composited over the page backdrop → OKLab; warm hue ∈ [45,85]°, plate floor C ≥ 0.010)

### Light mode

| surface (route) | composited OKLab | backdrop-filter | text contrast | reading |
|---|---|---|---|---|
| **Select dropdown panel** `/forms/select` | **L 0.799 · C 0.0126 · H 67.6°** | `blur(13px) saturate(1.6)` | **9.31:1** | warm-cream luminous, raw bg α 0.808 (transmissive, not a slab) |
| **Combobox dropdown panel** `/forms/combobox` | **L 0.799 · C 0.0125 · H 70.9°** | `blur(13px) saturate(1.6)` | — | warm, page title shows THROUGH it (transmissive) |
| glass Card tier ladder `/display/card` (20 cards) | C **0.0085–0.0133** · H **57–74°** (α 0.52→0.95) | — | — | warm wash→overlay gradient, visibly amber over aurora |
| toggle Buttons (B/I/U) `/forms/toggle` | C **0.0086–0.0128** · H **61–68°** | — | — | warm-cream pills, NOT gray glass |
| paper-glass tiers `/foundations/paper-glass` | warm-cream substrate + tier cards | — | — | warm paper + warm glass rungs |

### Dark mode

| surface | composited OKLab | backdrop-filter | text contrast | reading |
|---|---|---|---|---|
| **Select dropdown panel** | **L 0.352 · C 0.0174 · H 60.1°** | `blur(13px) saturate(1.28) brightness(1.1)` | **9.06:1** | warm-luminous dark glass, NOT flat charcoal; W-DARK-MATERIAL glow arm intact |
| glass Card tier ladder (20 cards) | C **0.0105–0.0198** · H **56–61°** | — | — | warm-dark elevation, monotonic ladder |

Resolved source tokens (live): `--card` = `light-dark(hsl(30 85% 96%), hsl(26 22% 17%))`,
`--popover: var(--card)`. The warm chroma is at the SOURCE plate-fill; the floating composite
inherits it through the unchanged `--glass-level` recipe + lifted `saturate()` transmission term.

## SCREENSHOTS (this judge's fresh captures)
`JUDGE-select-light.png` · `JUDGE-select-dark.png` · `JUDGE-combobox-light.png` ·
`JUDGE-card-light.png` (the tier ladder — the most decisive: visible warm amber→cream gradient over
aurora) · `JUDGE-toggle-light.png` · `JUDGE-paperglass-light.png`.

## GATES
`proof:no-gray` **36/36 PASS** (re-run live by judge): `card-plate-warm-light` 0.0107,
`floating-plate-warm-light` 0.0130 @ 71.3°, `dark-card-warm-not-charcoal` 0.0186 @ 59.8°, every AA
pair re-ratified (muted 5.20:1 light / 7.72:1 dark, fg 15.90:1 dark). The WARM_PLATE_FLOOR (0.01,
~2.8× the old gray-passing floor) is the new bar; born-RED on HEAD.

`proof:on-glass-fg` W4 RED is a **pre-existing, unrelated** branch artifact — its clause greps
CLAUDE.md which is `D CLAUDE.md` (deleted) in this branch's working tree; no on-glass-fg token was
touched and the on-glass AA was live-verified GREEN (text contrast 9.31:1 / 9.06:1). NOT a defect
of this fix.

## DIRECTIVE CHECK (harsh)
- **No gray cast** ✓ — every substantive plate composites warm (H 56–74°, C ≥ 0.010); the thin
  wash/quiet rungs (α 0.33–0.52) sit lower in chroma (gamut-bound, by design) but stay warm-hued,
  never gray.
- **Warm-cream LUMINOUS + TRANSMISSIVE** ✓ — `saturate(1.6)` pulls the backdrop through; α 0.808
  translucent; page text/aurora reads through the panels (the Maps-card read).
- **Readable text BOTH modes** ✓ — 9.31:1 light / 9.06:1 dark, far above AA.
- **Buttons NOT gray glass** ✓ — warm H 61–68°.
- **Tier separation / liquid-weight un-regressed** ✓ — alpha ladder monotonic; `.glass-reveal`
  bloom wired; compositor-only, PRM-carved, token-first, no legacy alias.

## REFINEMENTS
None blocking. PASS. (Optional, non-gating: the thinnest wash rung light-mode composite sits at
C ≈ 0.0055 — warm-hued but below the 0.01 plate floor because there's little material to carry
chroma at α 0.33; this is the calm-register floor, consistent with the BA.W-NO-GRAY gamut-bound
near-white plate rationale, and is NOT the gray defect the user flagged. Leave as-is.)
