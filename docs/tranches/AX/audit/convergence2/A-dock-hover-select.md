# A-dock-hover-select — Dock icon/dropdown hover+select state (DK2)

**Lane** A · convergence-2 · **Severity** major · **Verdict** augment-existing-wave (**W45**) + a
small carve to **W09/W52** for the select/dropdown glass-material membership.
**User defect** DK2 — "the hover/select state for dock icons + dropdowns is not right at all."

> Source-audited at HEAD 5cf2980 (3.8.0+W52). No code edits. The painted state-paint is in
> `dock-controls.css` + `glass.css` (the `.glass-material` group) + the `tokens.css §10` dock
> active-ladder + §-2 spring vocab. The four dock controls do NOT share one state grammar — the
> defect is an INCONSISTENT, non-glass, indistinguishable-hover≡active four-state contract.

---

## The defect at source — the three controls paint THREE different state grammars

The dock has four interactive control families (`.dock-icon-button`, `.dock-tab-button`,
`.dock-select-trigger`, `.dock-dropdown-trigger`). They SHOULD share one glass-aware four-state
contract (standard / hover / active-or-open / focus+disabled). At HEAD they do not — each picks a
different fill source, a different glass posture, and a different hover↔active differentiation:

| Control | hover bg | active/open bg | glass-material `::before`? | hover scale |
|---|---|---|---|---|
| `.dock-icon-button` | `color-mix(in srgb, var(--card) 55%, transparent)` (translucent card glass) | `var(--dock-active-bg)` = `--muted` (OPAQUE) | **YES** (member, moving specular) | `--scale-hover-dock` (1.1) |
| `.dock-tab-button` | `--surface-tint-8` (8% foreground over transparent — glassy) | `--surface-tint-10` (10%) | NO | none |
| `.dock-select-trigger` | `var(--muted)` (OPAQUE `hsl(48 10% 95%)`) | `var(--muted)` (OPAQUE, **identical to hover**) | NO | none |
| `.dock-dropdown-trigger` | `var(--muted)` (OPAQUE) | `var(--muted)` (**identical to hover**) | NO | `--scale-hover-dock` (1.1) |

Source lines (`src/styles/dock-controls.css`):
- icon-button hover `:98-105`; active `:122-128` (reads `--dock-active-bg` = `--muted`, tokens.css:1089).
- tab-button hover `:247-250`; active `:263-266` (surface-tint ladder — the ONLY glass-correct family).
- select/dropdown hover `:418-422` (`background: var(--muted)`); active/open `:452-466` (`background:
  var(--muted)` — **byte-identical to the hover state**); chevron flip `:481-483`.

`--muted` resolves to `--neutral-1` = `hsl(48 10% 95%)` light / `hsl(24 6% 11%)` dark (tokens.css:340-341,
1623-1624) — a **fully opaque, no-alpha soft-field plate**. Over the W52 liquid-glass dock shell (and
DK G2's very-light backdrops), the select/dropdown hover stamps a solid cream rectangle — the literal
antithesis of glass, and the loudest "not right" tell. Worse: **hover and open paint the same color**, so
an open `<DockSelectTrigger>` is visually indistinguishable from a merely-hovered one — there is no
"this picker is OPEN" affordance at all.

### Four compounding sub-defects (the gestalt, not four patches)

1. **Non-glass fill on the pickers (the headline).** `.dock-select-trigger`/`.dock-dropdown-trigger`
   are NOT `.glass-material` group members (`glass.css:54-62` lists only `.glass-material` rungs +
   `.glass-card` + `.dock-icon-button`) and paint OPAQUE `--muted` on hover+active. The dock-icon-button
   already moved to translucent `--card` glass (AT.W7-dock-b) + the moving `::before` specular (AX.W09);
   the pickers were left on the pre-glass `--muted` flat plate. They never got the glass treatment.

2. **hover ≡ active is indistinguishable on the pickers.** select/dropdown hover (`:418`) and
   active/open (`:452`) both resolve `var(--muted)` — zero delta. An open dropdown reads identical to a
   hovered-closed one. The icon-button has the same hazard latent: its hover (`--card` 55%) and active
   (`--dock-active-bg` = `--muted`) cross fill SOURCES (translucent-card vs opaque-muted), so on a light
   backdrop a hovered icon (translucent) can read LIGHTER than an active one (opaque) — backwards.

3. **No cross-family state grammar.** Four controls, four fill vocabularies — `--card` mix,
   `--surface-tint-*`, `--muted`, `--dock-active-bg`. There is no single `--dock-control-hover-bg` /
   `--dock-control-active-bg` token pair the whole family reads (the way `--dock-press-spring` already
   unifies the press at `dock-controls.css:37-44`). The icon-button has a `--dock-icon-hover-bg` knob
   but the pickers/tabs have none, so a consumer cannot retint the family's hover from one override.

4. **Inconsistent hover-scale + missing glass `::before` on the pickers.** dropdown-trigger lifts
   `--scale-hover-dock` (1.1) on hover (`:424-426`); select-trigger deliberately does NOT (DockSelectTrigger
   comment: anchors content smoothly). That asymmetry is DEFENSIBLE (a select pops a positioned menu the
   trigger anchors; the dropdown doesn't), but the pickers ALSO carry no moving specular `::before` while
   the icon-button does — so the "glass catch-light on hover" cue is present on icons, absent on pickers,
   for no design reason. The state read is incoherent across the family.

---

## The gestalt fix — ONE glass-aware four-state contract the whole dock-control family reads

Token-first, component-over-class, no per-control patch. Mint ONE shared state-token pair + route all
four controls through it, and bring the pickers into the `.glass-material` group so they inherit the
same moving specular the icon-button has:

1. **Mint the family state tokens (tokens.css §10 dock block).** A glass-translucent hover + a DISTINCT
   active fill, both alpha-bearing so the dock substrate shows through (never opaque `--muted`):
   ```
   --dock-control-hover-bg:  color-mix(in srgb, var(--card) 55%, transparent);  /* the icon-button's value, generalized */
   --dock-control-active-bg: color-mix(in srgb, var(--foreground) 12%, transparent); /* a tint LADDER step ABOVE hover — distinct, still translucent */
   ```
   Re-point `--dock-active-bg` (currently `--muted`, tokens.css:1089) onto `--dock-control-active-bg` so
   the icon-button active stops being opaque too (the O.W6 active-ladder consumers — bbnf-buddy
   ToolsLayer, speedtest — still override per-instance; the DEFAULT becomes glass-correct). The
   `--surface-tint-*` ladder is the right family precedent (foreground-over-transparent, the house
   tint pattern per CLAUDE.md AW.W26) — generalize it, retire the `--muted` flat plate.

2. **Route all four controls through the pair (dock-controls.css).** select/dropdown hover →
   `var(--dock-control-hover-bg)`; select/dropdown active/open → `var(--dock-control-active-bg)` (NOT
   `--muted`, so hover ≠ open — the picker now reads OPEN distinctly). tab-button stays on its
   surface-tint ladder OR converges onto the same pair (surface-tint-8/10 ≈ the same intent — fold for
   one grammar). icon-button hover keeps `--dock-control-hover-bg`; its active reads the re-pointed
   `--dock-active-bg`. ONE comma-group, ONE source per state.

3. **Bring the pickers into `.glass-material` (glass.css:54-62 + :80-88 group lists).** Add
   `.dock-select-trigger`/`.dock-dropdown-trigger` to the `.glass-material` membership comma-groups so
   they inherit the SAME bounded edge-gleam `::before` (W52's re-authored gleam) the icon-button has —
   one glass catch-light vocabulary across the whole family. They already share the
   `--dock-fg-on-aurora` legibility base (dock-controls.css:402-408), so the membership is the missing
   half. (Requires the W09 pointer-track seam OR a static-anchor gleam — KISS: the pickers don't need
   pointer tracking, a hover-only static edge gleam is enough; ratify whether to add `useSpecularTracking`
   to the picker SFCs or keep a CSS-only hover gleam.)

4. **The open-state affordance is the active fill + the existing chevron flip.** select-trigger already
   flips its chevron 180° on `[data-state="open"]` (`:481-483`) — KEEP it; pair it with the now-distinct
   `--dock-control-active-bg` so OPEN = (chevron up + translucent active fill), HOVER = (translucent
   hover fill, chevron down). That is the smooth, glass-aware, four-state read the user wants.

All magnitudes are `--dock-*`/`--surface-tint-*` tokens; no buried literal; the spring vocab
(`--dock-press-spring` = `--duration-fast var(--spring-smooth)`, dock-controls.css:43) and the
`--dock-motion-fast` surface fades are already correct (W05) — the fix is the FILL SOURCE +
glass-material membership + the hover≠active differentiation, not the timing.

---

## DEDUP — which wave owns this

- **W45 (dock region-model + DockSeparator + mobile `--dock-scale`)** — the natural HOME for the
  token-mint + the dock-controls.css state-grammar reauthor. W45 already owns `dock-controls.css` +
  `tokens.css §10` dock block + the cross-family dock-control state contract (it adds the `> svg` glyph
  rule, deletes the coarse floor, threads `--dock-scale` through the cascade). Its scope is the dock
  control GEOMETRY/structure; this finding adds the dock control STATE-PAINT grammar to the same files,
  same `tokens.css §10` block, same cohesive "one dock-control contract" gestalt. **AUGMENT W45** with a
  6th fold: "ONE glass-aware four-state contract — mint `--dock-control-{hover,active}-bg`, route all
  four controls through it, kill the opaque `--muted` picker fill, make hover≠active on the pickers."
  This does NOT overlap W45's region-model/scale arms (line-disjoint within dock-controls.css — the
  state-paint comma-groups vs the `> svg`/floor rules).

- **W09 (specular tune) / W52 (liquid-glass material)** — own `.glass-material` group MEMBERSHIP +
  the `::before` gleam recipe. Bringing the pickers INTO `.glass-material` (fold 3) is a one-line
  comma-group addition to `glass.css:54-62`/`:80-88` that belongs with the W52 material reauthor (it is
  the same "every glass surface gets ONE bounded edge gleam" gestalt). W52 is live-pending/DEVELOPED; if
  W52 is integrated, this is a small follow-up carve. **Carve fold 3 to W09/W52** (the glass-material
  membership line); folds 1/2/4 land in W45 (the token-mint + dock-controls.css state grammar).

- **NOT W50** (dropdown TYPE-scale — font-size only, the `--dropdown-text` token; orthogonal to the
  dock-control state PAINT). **NOT W51** (`--ui-scale` sizing — geometry, not state color). **NOT W05**
  (the spring vocab is already correct — the press timing is not the defect).

**Net:** AUGMENT **W45** (fold 1/2/4 — the token-mint + the four-state grammar reauthor in
dock-controls.css/tokens.css §10) and CARVE the one-line `.glass-material` membership for the pickers to
**W09/W52** (fold 3). No net-new wave — W45 owns the dock-control contract files and the gestalt is the
same "one coherent dock-control treatment" W45 already authors.

---

## Source reference (the load-bearing lines)

- `src/styles/dock-controls.css:98-128` — icon-button hover (`--card` 55% glass) + active (`--dock-active-bg` = `--muted` opaque).
- `src/styles/dock-controls.css:247-266` — tab-button hover/active (surface-tint ladder — the glass-correct precedent).
- `src/styles/dock-controls.css:418-466` — **select/dropdown hover==active both `var(--muted)`** (the headline defect: opaque + indistinguishable).
- `src/styles/glass.css:54-62, 80-88, 172-191` — `.glass-material` membership (icon-button IN, pickers OUT) + the `::before` gleam hover/active.
- `src/styles/tokens.css:1089` — `--dock-active-bg: var(--muted)` (the opaque default to re-point).
- `src/styles/tokens.css:340-341, 427-430` — `--muted`=`--neutral-1`=`hsl(48 10% 95%)` opaque vs the `--surface-tint-*` translucent ladder.
