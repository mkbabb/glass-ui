# chicago → glass-ui · 2026-09-22 · Button stadium pad (POST-CLOSE patch → 10.0.1)

**Inbound** (cross-session, from `lot-assay-e0`, the chicago consumer on 10.0.0; measured in
`~/Programming/chicago src/components/StayCard.vue` at a 420px viewport): `<Button as="a"
emphasis="primary" size="sm">` with a leading lucide glyph + "Listing" computes to `padding
0px 4px`, `height 36px`, `border-radius 18px`, `width 67px`; the glyph sits inside the curve
of the pill. Asked: fix at the root, add a regression check, cut 10.0.1, reply with the version.

**Standing**: BK is CLOSED at 10.0.0 (`docs/tranches/BK/FINAL.md`, `ec353260`/`a80dd5f5`) and
BL is not formed. This is a POST-CLOSE consumer defect cured as a patch under the standing
publish authorization; it rides no wave and opens no band. Record here; CHANGELOG is the
release record; MIGRATION is untouched (no break — a geometry cure with no API change).

## Measured at HEAD `a80dd5f5`

- `src/components/button/styles.css:48` `.button { padding-inline: var(--space-body); }` (md);
  `:228` and `:235` `[data-size="xs"]` / `[data-size="sm"]` `padding-inline: var(--space-atom)`;
  `:69` `border-radius: calc(var(--button-size) / 2)`; `:182` the text arm `var(--space-residue)`;
  `:247-251` icon-only `padding: 0`.
- `src/styles/tokens/sizing.css:119-121` residue/atom/body = 4/8/12 px; `:337-339` the ONE width
  query transposes body 12→8, atom 8→4, residue 4→4 under `max-width: 768px`.
- `sizing.css:26-29` the control rungs `--control-h-xs/sm/md/lg` = 28/36/40/44 px × `--ui-scale`
  (1), floored by `--control-floor` (0 at desktop; `light-dark.css:20` lifts it to
  `var(--touch-target, 2.75rem)` = 44 px under coarse). The rung does NOT transpose with width.
- So the corner is 14/18/20/22 px and never moves with width, while the pad is 8/8/12/12 at
  desktop and 4/4/8/8 under 768px. The consumer's 4 px against 18 px is exactly this. CONFIRMED.
- `tests/components/button/Button.test.ts:296-303` is the standing gate: `padding-inline` may
  not open a `calc(`, and every `padding-inline`/`gap` declaration must read a rank rung. It
  encodes "NOTHING IS MINTED" (`styles.css:22-25`) and it is what fences the cure below.

## Ruling (driver, under the owner's delegation)

1. **The cure is the register's own pairing law.** `sizing.css:108-111`: `pad(role) = r(role) − 4`
   ("room 24−20=4 · card 16−12=4 · control 10−8=2→floor"). The Button's corner is the stadium,
   `r = --button-size / 2`, so the pad the law yields is `r − residue`. ONE declaration on
   `.button`, replacing `:48`:

   ```css
   padding-inline: calc(var(--button-size) / 2 - var(--space-residue));
   ```

   and the `padding-inline` lines at `:228` and `:235` are DELETED (the size arms re-point
   `--button-size` and nothing else about the pad). The text arm keeps `--space-residue`; the
   icon-only arm keeps `padding: 0`. Yield: xs 10 · sm 14 · md 16 · lg 18 at desktop; 18 for
   every rung under the 44 px coarse floor; invariant under the width transposition (as the
   corner is); scales with `--ui-scale` (as the corner does). Nothing is minted: a rung the file
   already reads, a rank token the file already reads, the law the register already states.
2. **REFUSED — the inbound's `calc(var(--button-size) * 0.375)`.** 0.375 is a coefficient with no
   seat in the register; the pairing law gives the derivation without one. Same numbers within
   a pixel or two (10.5/13.5/15/16.5 vs 10/14/16/18), and ours is the law of record.
3. **REFUSED — the optional leading-glyph optical trim.** A second pad keyed on slot content
   would have a rule key on two axes (`styles.css:8-11`, one owner per channel, keyed on one
   attribute). The pairing pad already clears the arc with room: at sm, a 16 px glyph's corner
   meets the arc 1.9 px in from the edge; the pad is 14.
4. **Gate re-rule, `Button.test.ts:296-303`.** The `calc(` ban stands for every declaration but
   ONE: the pairing-law derivation, which must appear EXACTLY ONCE, on `.button`, spelled
   `calc(var(--button-size) / 2 - var(--space-residue))`. Add the regression the inbound asked
   for, source-read (happy-dom runs no cascade — the radius-dialog-bind idiom): (a) no
   `[data-size]` arm declares `padding-inline`; (b) every other `padding-inline`/`gap` reads the
   rank series; (c) the derived pad over the four rungs 28/36/40/44 is 10/14/16/18, each
   ≥ the 4 px residue floor and each ≥ the pad the standing form gave at desktop; (d) the corner
   and the pad read the SAME rung token. It is a born-RED witness: on the pre-cure bytes (a)
   and (c) fail. The challenger proves RED by mutation (restore the two `--space-atom` pads in
   a scratch copy → the test fails → restore).
5. **Records struck to truth, in place.** `styles.css:22-25` ("Pads and gaps read the §1.1 rank
   series … the mobile transposition") is amended: the GAP reads the series and transposes; the
   stadium PAD is derived by the pairing law and, like the corner, does not. `sizing.css:100`
   (atom · "control `xs`") and `:101` (body · "a control's own interior (`md`)") are struck to
   what still pads with those rungs after this cure (the seat measures the consumers; if none,
   the phrase is dropped, not left). The pairing-law paragraph `:108-111` gains the stadium line:
   `stadium control (h/2)−4 = 10/14/16/18`. `DESIGN.md` and the precepts name no button pad
   figure (grep clean at HEAD) — nothing to strike there.
6. **Release**: `package.json` 10.0.0 → 10.0.1 (+ lockfile); `CHANGELOG.md` gains
   `## 10.0.1 — 2026-09-22` above 10.0.0 with the measured figures (before/after pads per rung,
   the gate re-rule, the two refusals); `.bundle-ratchet` re-measured on the tree
   (`node scripts/verify-export-types.mjs` → the `forbidden: <candidate> > <datum>` figure; the
   pack is `dist` + `MIGRATION.md`, MIGRATION is untouched, the version string keeps its length,
   so the delta is the built CSS alone); driver runs `scripts/release.sh v10.0.1`, pushes the
   tag, `release.yml` publishes with provenance, driver replies to `lot-assay-e0` with the version.

## Lane

`I` implement (Opus) → `C` challenge (Opus: bytes + mutation + census) → Fable adjudicates in
place → cure → release. Seats never `git add`/`commit`; the driver commits by pathspec.

