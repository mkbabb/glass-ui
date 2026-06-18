# W-PRECEPT-SYNC — the design-idioms ↔ source home-map walk (census)

**Wave**: BB.W-PRECEPT-SYNC — refresh `docs/precepts/design-idioms.md` onto the BA-shipped CSS reality + mint `proof:precept-current`.
**Re-grounded at HEAD**: `ff2af9e3` (the wave spec authored at `f3c4170e`; HEAD moved — line numbers re-grepped below, the precepts submodule at `5f0dd8a9`).
**Discipline**: this wave touches the DOC + the gate, NEVER a `src/styles/*.css` rule (the §1 "does NOT re-locate the idioms" bound). A source mis-placement found in the walk is BOOKED to its owning concern, not fixed here.

---

## The walk — the §3 home-map file cells against the live `src/styles/` tree

The §3 home-map (`design-idioms.md:66-76`) names cohesion DOMAINS (the `@utility`-recipe placement map), not every per-component partial. Walking each named file cell against disk:

| home-map file cell | on disk | live examples (re-grepped) | drift |
|---|---|---|---|
| `src/styles/typography.css` | EXISTS (thin `@import` root over `typography/*`) | `text-display-*`, semantic type, engraved/depth | none |
| `src/styles/utilities/btn.css` | EXISTS | `scale-on-hover`, `twin-line-divider`, `transition-control/collapse`, `sheet-animate`, `table-cell/head`, `rainbow-vivid/pastel`, `btn-interactive` | **DRIFT #1** — names `btn-audacious`/`btn-audacious-gold` (DELETED at BA.W-GLASS-CAL; ZERO def site in `src/styles/`; `btn.css:2` records the deletion) |
| `src/styles/utilities/animate.css` | EXISTS | (NO `@utility` survives — `popover-animate`/`slide-in-from-side` DELETED) | **DRIFT #1b (re-ground find)** — names `popover-animate`/`slide-in-from-side` (DELETED at BB.W-LIQUID-REVEAL; `animate.css:8-9` records the deletion). SAME drift-class as #1, NOT in the spec's captured set — found at the §0 re-ground walk |
| `src/styles/utilities/a11y-overrides.css` | EXISTS | `touch-hit-area` + `@media` overrides | none |
| `src/styles/glass/*.css` (glob) | EXISTS (globs surface-axis.css too) | `glass-progress-rail` (the deck-position rail @utility) | none on the glob; the surface-axis idiom is glob-COVERED but its `[data-surface]`/`.paper-ink-mark` register is undocumented (see drift #2a / #3d) |
| `src/styles/paper.css` | EXISTS | paper underpaint + grain | none |
| `src/styles/cards.css` | EXISTS | `cartoon-surface` | none |
| `src/styles/dock-controls.css` | EXISTS (thin root over `dock-controls/*`) | dock-control surface utilities | none |
| `src/styles/instrument-chassis.css` | EXISTS | chassis bezel + `[data-phase]` ink bus | none |

## The BA-shipped idiom files — home-map coverage

Three BA shared-register recipe-class idiom files landed at 4.0.0. Each `@import`s into the cascade; each introduces a SHARED recipe register ≥2 component families compose (the §3 placeable-recipe domain):

| idiom file | `@import` rung (re-grepped) | the register | home-map row at HEAD |
|---|---|---|---|
| `src/styles/feedback-tone.css` | `index.css:165` (cascade ledger rung 7a, `index.css:97` self-tags it "the ONE shared tinted-glass tone register") | `.feedback-tone` + `.feedback-tone-{success,warning,info,destructive}` (BA.W-FEEDBACK-TONE) | **DRIFT #2b — ZERO** |
| `src/styles/menu.css` | `index.css:179` (cascade ledger rung 11a, `index.css:133`/`173` self-tag it "the glass menu-row + menu-section register") | `.glass-menu-row` + `.glass-menu-section` (BA.W-MENU-GLASS) | **DRIFT #2c — ZERO** |
| `src/styles/glass/surface-axis.css` | `glass.css:51` (under `glass/*`, glob-COVERED by the glass-surface row) | `[data-surface="glass\|veil\|opaque"]` shared surface-decoration axis + the `.paper-ink-mark` MARK register (BA.W-SURFACE-AXIS) | **DRIFT #2a — glob-covered but the `[data-surface]`/`.paper-ink-mark` register is undocumented** |

## §2 / §9 token-axis coverage

| axis | source home (re-grepped) | doc at HEAD | drift |
|---|---|---|---|
| warm-chroma floor (`--neutral-*` warm hue/sat recalibration; the no-gray keep) | `tokens/color-radius.css` (the ladder) | ZERO §2 note | **DRIFT #3a** |
| dark luminous-transmissive material (the dark-arm `--glass-*`/`--surface-tint-*`) | `tokens/dark-arm.css` + `tokens/light-dark.css` | ZERO §2 note | **DRIFT #3b** |
| in-srgb `--surface-tint-*` fence (over `in oklab`, AW.W26) | `tokens/color-radius.css:139-143` (light arm) + `tokens/dark-arm.css:316` (dark arm, `oklch(from …)` ink source) | NAMED in §9 preamble (`design-idioms.md:235`) but NO recorded-divergence ROW | **DRIFT #3c** |
| control-surface REST tier (`--control-surface-{bg,border,blur,bg-hover}`) | `glass/surfaces.css` + `tokens/glass.css` | ZERO §3 line | **DRIFT #3d (control-surface)** |
| `.paper-ink-mark` MARK register (≥2 consumers) | `glass/surface-axis.css` + `segmented-tabs.css` | ZERO §3 line | **DRIFT #3d (paper-ink-mark)** |

## The structural root cause — no consistency gate

`grep design-idioms scripts/gates.mjs` returns ONLY `proof:colocation`'s PRESENT-check note (the doc must EXIST). `scripts/proof-precept-current.mjs` does not exist at HEAD. Nothing asserts the home-map ↔ `src/styles/` consistency — the P-5 doc-drift class is unguarded for the single most binding design doc. **DRIFT #4** — the gate-mint.

---

## Disposition

Every drift is a **doc-refresh** (the home-map names what EXISTS, the greenfield-no-meta discipline) + the gate-mint. ZERO source mis-placements surfaced in the walk (no `@utility` in the wrong cohesion file, no out-of-cascade-order partial, no carve-that-should-have-happened) — so **no source fix is booked to an owning concern**. The re-ground find (drift #1b, `popover-animate`/`slide-in-from-side`) is the SAME drift-class as #1 (a DELETED recipe still named as a live example) and is folded into the same §3 re-point.

| # | drift | fix-class | owner |
|---|---|---|---|
| 1 | `btn-audacious`/`btn-audacious-gold` listed as live | doc-refresh (§3 re-point) | this wave |
| 1b | `popover-animate`/`slide-in-from-side` listed as live (re-ground find) | doc-refresh (§3 re-point) | this wave |
| 2a | surface-axis `[data-surface]`/`.paper-ink-mark` undocumented | doc-add (§3 row + line) | this wave |
| 2b | feedback-tone.css UNHOMED | doc-add (§3 row) | this wave |
| 2c | menu.css UNHOMED | doc-add (§3 row) | this wave |
| 3a | warm-chroma floor not in §2 | doc-add (§2 note) | this wave |
| 3b | dark transmissive material not homed | doc-add (§2 note) | this wave |
| 3c | in-srgb surface-tint fence named-not-homed | doc-add (§9 row) | this wave |
| 3d | control-surface + paper-ink-mark unhomed | doc-add (§3 lines) | this wave |
| 4 | NO consistency gate | gate-mint (`proof:precept-current`) | this wave |

**No booked source fix.** The doc refreshes onto the CURRENT (coherent) reality.

---

## The gate's derivation — the overfitting-trap resolution (Triumvirate Dispatch #2)

`proof:precept-current` is DERIVED (it reads the home-map + the cascade `@import` chain + the live `@utility`/recipe census from `src/styles/`, never a hardcoded file list). The three falsifiable witnesses + the resolution of the "places-an-idiom vs pure-token partial" distinction:

- **W1 (no DELETED recipe as a live example).** The gate reads the deleted-recipe set LIVE — it flags ANY home-map example token that matches the `@utility`/recipe-name shape AND has ZERO definition site in `src/styles/`. It does NOT hardcode `btn-audacious`; a future deleted-then-still-named recipe reds the same way. This catches drift #1 AND #1b.
- **W2 (every shipped shared-register idiom file is homed).** The KNOWN-FILE set is NOT a script literal. The gate derives it from the cascade-ledger SELF-TAGGING: a top-level `index.css` `@import` partial whose cascade-ledger comment self-describes it as a shared `register`/`axis`/`recipe` (the BA shared-idiom convention — feedback-tone rung 7a "tone register", menu rung 11a "menu-row + menu-section register") MUST have a §3 home-map file-cell. The glass `glass/*.css` glob is honored (surface-axis is glob-covered). Per-component partials (configurator/drawer/segmented-tabs — whose ledger describes a COMPONENT family, not a shared register) are NOT flagged. This is the principled distinction the Dispatch demands instead of a hardcoded trio.
- **W3 (every home-map row resolves to a real file/recipe).** Every §3 file cell exists on disk; every example recipe it names has ≥1 def site in `src/styles/`. The W1 dangling example is itself a W3 violation — the bidirectional bijection (W2 source⊆doc, W3 doc⊆source).
- **The self-test bite.** The detector against a SYNTHETIC stale home-map (a `btn-audacious` example + a missing feedback-tone row) FLAGS both; against the REFRESHED doc flags NEITHER.
- **W4 (harness soundness).** `proof:gate-script-parity` + `proof:gate-manifest-sound` stay GREEN after the `proof:precept-current` registration; the gate is tagged `["local","ci"]` (static doc/source check, no Playwright).

Born-RED at HEAD (the `btn-audacious`/`popover-animate` dangling examples + the two unhomed BA files) → GREEN at close (the refreshed home-map).
