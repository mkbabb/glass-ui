# BI.W-SHADOW-GRAMMAR — the UF-A9 offset-stamp census

The offset-stamp family (`--shadow-cartoon-{sm,md,lg}`) is a **hard 0-blur directional
stamp** (`-3px 3px 0 …, -5px 5px 0 …, -7px 7px 0 …` — the layered warm cel ink). It is
a **card-silhouette grammar**: on a CARD the offset tucks under the corner radius, but
on a **CAPSULE/PILL** the hard directional stamp pokes off the stadium along the
bottom-left arc = the lopsided **crescent** (UF-A8 ss-08 "artifacts on the bottom left
corners of these buttons" · UF-A9 ss-26 "the dark CRESCENT past a pill's left end-cap").

**Law 4 (`proof:geometry-grammar`):** a `--shadow-cartoon-*` stamp requires a card
silhouette. A pill/capsule host takes a **soft radius-following drop** (`--shadow-md`/
`-lg`) or its glass rim + under-shadow. A stamp on a stadium-token host off this census
allowlist REDs.

## The consumer × radius-class × verdict enrollment

Every `--shadow-cartoon-*` box-shadow consumer under `src/styles/**.css`:

| # | Consumer (selector) | Source | Radius class | Verdict |
|---|---------------------|--------|--------------|---------|
| 1 | `@utility cartoon-surface` (rest) | `cards.css:318` | **card** (`--radius-card`, Card `surface="cartoon"`) | LEGAL — the offset tucks under the card corner |
| 2 | `.cartoon-surface:hover` | `cards.css:350` | **card** | LEGAL |
| 3 | `.cartoon-surface:hover .cartoon-cast` | `cards.css:352` | **card** (cast under a Card ancestor) | LEGAL |
| 4 | `.cartoon-cast` (base inert cast) | `cards.css:387` | **radius-agnostic** (`border-radius: inherit`) | LEGAL under a card ancestor; the pill case is re-pointed by row 5 |
| 5 | **`.btn-punch .cartoon-cast`** (soft-drop re-point) | `cards.css` (**this wave**) | **pill → soft** (`--shadow-lg`, NOT `--shadow-cartoon`) | **FIXED** — the Law-4 GREEN condition; the loud-CTA cast paints a soft radius-following drop, no crescent |
| 6 | `[data-slot="select-content"], [data-slot="combobox-list"]` | `select.css:134` | **card** (the dropdown PANEL is a card) | LEGAL — audited, recorded (no edit) |
| 7 | `.configurator-preset-tile.is-active` | `configurator.css:267` | **card** (`border-radius: var(--radius-card)`, `configurator.css:203`) | LEGAL |
| 8 | `.liquid-enter.is-cel > .cartoon-cast` | `glass/liquid-enter.css:172` | **card** (hero/headline enter-cast, capped to headline surfaces) | LEGAL |
| 9 | `.metric-badge:hover` | `utilities/components.css:66` | **pill** (`--radius-badge`) | **SANCTIONED** — a small `--shadow-cartoon-sm` value-lift on HOVER only, gate-owned by `proof:metric-hover`; not the default-ON loud-CTA REST crescent this law targets |
| 10 | `.glass-atom[data-cast] .cartoon-cast` (rest) | `glass/glass-atom.css:101` | **pill** | **SANCTIONED** — `data-cast` OPT-IN cel cast (default OFF), the BD.W-CARTOON-CASTER register, gate-owned by `proof:carousel-glass-atoms` / the glass-atom family |
| 11 | `.glass-atom[data-cast]:hover:not(:active) .cartoon-cast` | `glass/glass-atom.css:105` | **pill** | SANCTIONED (opt-in hover intensify) |
| 12 | `.badge-atom[data-cast] .cartoon-cast` (rest) | `glass/glass-atom.css:199` | **pill** | SANCTIONED (opt-in `data-cast`, Badge `cast` prop default false) |
| 13 | `.badge-atom[data-cast]:hover:not(:active) .cartoon-cast` | `glass/glass-atom.css:203` | **pill** | SANCTIONED (opt-in hover intensify) |
| 14 | `.shadow-cartoon-sm` | `utilities/components.css:295` | **radius-agnostic** (raw utility) | LEGAL — consumer-applied; the consumer owns the silhouette match |
| 15 | `.shadow-cartoon-md` | `utilities/components.css:299` | **radius-agnostic** | LEGAL |
| 16 | `.shadow-cartoon-lg` | `utilities/components.css:303` | **radius-agnostic** | LEGAL |

Token PLUMBING (not paints, excluded from the census): the `--cartoon-shadow*` /
`--shadow-cartoon*` token aliases in `tokens/shadow.css`, `tokens/dark-arm.css`,
`tokens/light-dark.css`, `theme/bridges.css` — these DEFINE the rungs, they do not
paint a silhouette.

## The born-RED → GREEN

- **Born-RED (1)** at HEAD: `.btn-punch` mounts the `.cartoon-cast` on the default-ON
  loud CTAs (`primary-audacious`/`gold-audacious`) with NO soft radius-following drop
  re-point, so the cast inherits the base hard `--shadow-cartoon-md` and pokes the
  crescent off the stadium (row 5 absent). `proof:geometry-grammar` Law 4 = RED(1).
- **GREEN (0)** here: row 5 lands — `.btn-punch .cartoon-cast { box-shadow: var(--shadow-lg) }`.
  The loud-CTA punch re-lands on the **soft drop + press-squish + specular gleam** (the
  ratified judgment; the BD.W-CARTOON-PUNCH weight SURVIVES). The gate flips RED(1) →
  GREEN(0), fully operative (all four laws hold).

## The card-radius allowlist (the positive contract)

`.cartoon-surface`, `.cartoon-cast` (radius-agnostic base + the `.btn-punch` soft-drop),
`[data-slot="select-content"]`, `[data-slot="combobox-list"]`, `.configurator-preset-tile`,
`.liquid-enter`, `.shadow-cartoon-{sm,md,lg}`, plus the **SANCTIONED** deliberate pill
casts (`.metric-badge`, `.glass-atom`, `.badge-atom`). A `--shadow-cartoon-*` on a
**canonical single-row pill** selector (`.glass-pill`/`.badge`/`.glass-capsule`/
`.btn-pill`/`.color-swatch`/…) OR a rule that **binds a stadium radius token** alongside
the stamp, off this allowlist, REDs (the direct-stadium regression guard; self-test:
a planted `.glass-pill { box-shadow: var(--shadow-cartoon-lg) }` flags).

## Divergence recorded — the sanctioned pill casts (rows 9-13)

The census found `--shadow-cartoon-*` casts on THREE pill registers beyond the spec's
`btn-punch` scope: `.metric-badge:hover`, `.glass-atom[data-cast]`, `.badge-atom[data-cast]`.
The decision is to **allowlist** them, NOT re-point them this wave, on three grounds:

1. **Not the flagged defect.** UF-A8/A9 (ss-08/ss-26) is the **default-ON loud-CTA REST
   crescent** — `.btn-punch` paints its cast at rest on every `-audacious` button. The
   sanctioned casts are **`data-cast` OPT-IN** (default OFF; Badge `cast` prop false by
   default) or **hover-only** (`.metric-badge`), and carry the **small** `--shadow-cartoon-sm`
   (`-2/-3/-4px`), not the button's `-md` (`-3/-5/-7px`).
2. **Gate-owned elsewhere.** `.metric-badge`'s hover cast is asserted by
   `proof:metric-hover`; the glass-atom/badge-atom casts are asserted by
   `proof:carousel-glass-atoms` / the glass-atom family. Re-pointing them would break
   those gates (out of this wave's writer scope).
3. **BD register.** They are the BD.W-CARTOON-CASTER "universal-but-graded cel" register.
   The ratified judgment scopes the offset-stamp reversal to **"the pill CTA"** (§Obligations
   USER-JUDGMENT — the paired A/B reverses ONE BD register, the button). Reversing the
   badge/atom cel register is a SEPARATE decision the user has not made.

**Booked follow-up:** a future universal cartoon-cast-on-pill reconciliation (should the
user extend the reversal to the badge/atom opt-in register) re-points rows 9-13 to the
soft drop in `glass-atom.css` + `components.css` and coordinates `proof:metric-hover` /
`proof:carousel-glass-atoms`. For BI.W-SHADOW-GRAMMAR the census FLAGS the default-ON
loud-CTA crescent (fixed) and RECORDS the opt-in casts (gate-protected).
