# BB.W-PRECEPT-SYNC — refresh the BINDING idiom-home (design-idioms.md) onto the BA-shipped CSS reality + mint the gate that keeps it honest

**Name**: W-PRECEPT-SYNC - the design-idioms ↔ source consistency repair + its first gate
**Opens after**: Batch 6 open (runs ‖ W-NDA-DECIDE ‖ W-AUR-KUWAHARA ‖ W-DELTA-RESHOOT ‖ W-DOC-FRESHEN — EXECUTION-DAG Batch 6, the chronic-residuals + doc-sync band; all five are doc/disposition-disjoint). Reads the BA-shipped CSS at HEAD — no source idiom moves here (this wave touches the DOC + a new gate, never a style rule).
**Agents**: 1 (one doc-refresh + gate-mint unit — the design-idioms.md edit and `proof:precept-current` are the same coherent concern; the gate reads the doc the edit writes, so they sequence within one agent, not across two)
**Hard gate**: `proof:precept-current` (born-RED) — the design-idioms.md home-map ↔ `src/styles/` consistency gate: every `@import`-partial / `@utility`-family the doc's §3 home-map NAMES resolves to a real file/recipe on disk AND every BA-shipped central-stylesheet idiom file (surface-axis · feedback-tone · menu) has a home-map row, AND no DELETED recipe (`btn-audacious`/`btn-audacious-gold`) survives as a live example. Plus the harness stays sound (`proof:gate-script-parity` + `proof:gate-manifest-sound` GREEN after the registration).
**Status**: SPEC

## The charge — the BINDING idiom-home is STALE (the P-5 doc-drift class, here with NO gate)

`docs/precepts/design-idioms.md` is the LOCALIZED HOME (L inv-16, cross-referenced from `proof:colocation`'s note as a colocation target): "a contributor adding a new `@theme` alias, `@utility`, or scoped component style answers 'where does it go?' from this doc alone" (`design-idioms.md:6-10`). That contract is BROKEN at HEAD — BA shipped five new central-stylesheet CSS idioms and retired a disco recipe family, but the home-map never moved. Three concrete drifts, re-grounded at HEAD (`f3c4170e`):

1. **DELETED recipes still listed as live examples (the worst kind — points a contributor at a recipe that does not exist).** §3's home-map row for `interactive / button` (`design-idioms.md:69`) lists `btn-audacious, btn-audacious-gold` as the `utilities/btn.css` examples. Both `@utility` recipes were DELETED at BA.W-GLASS-CAL (the disco retirement — CLAUDE.md §"The calm CTA register"). The source confirms the deletion in its own header (`src/styles/utilities/btn.css:2`: "The `btn-audacious`/`btn-audacious-gold` disco recipes … were RETIRED at BA.W-GLASS-CAL.") — but the BINDING doc still names them. A contributor reading the home-map to place a button recipe is sent to a deleted exemplar.

2. **Three BA-shipped idiom files UNHOMED — the §3 home-map has no row for them.** BA minted three central-stylesheet idiom files that exist on disk and import into the cascade, with ZERO home-map coverage:
   - `src/styles/glass/surface-axis.css` (`@import` at `glass.css:50`) — the `[data-surface="glass|veil|opaque"]` shared surface-decoration axis (BA.W-SURFACE-AXIS).
   - `src/styles/feedback-tone.css` (`@import` at `index.css:159`, cascade rung 7a) — the `.feedback-tone` + `.feedback-tone-{success,warning,info,destructive}` tinted-glass tone register (BA.W-FEEDBACK-TONE).
   - `src/styles/menu.css` (`@import` at `index.css:172`, cascade rung 11a) — the `.glass-menu-row` + `.glass-menu-section` glass menu-row register (BA.W-MENU-GLASS).
   A contributor adding a feedback-tone variant or a menu-row recipe has no documented answer for where it goes — the exact failure the doc exists to prevent (§1).

3. **§2 + §9 carry no entry for the BA token/recipe axes a contributor must reason about.** The §2 `@theme`-alias rule and the §9 recorded-twin-divergence section are both stale against BA's token-first work: the warm-chroma floor (the `--neutral-*` hue/sat recalibration — a deliberate token identity, CLAUDE.md §"The warm-chroma floor"), the dark luminous-transmissive material (the dark-arm token family — CLAUDE.md §"The dark register as a luminous transmissive material"), the in-srgb `--surface-tint-*` fence (a recorded divergence twin to the already-listed `cn`/`.focus-ring`/in-srgb keeps — `design-idioms.md:236-237` even references "the `in srgb` surface-tint family (over `in oklab`)" but never homes its recipe), and the control-surface REST tier + the `.paper-ink-mark` register (BA.W-SURFACE-AXIS scopes 7-8) all live in source with no idiom-home guidance.

**The structural root cause — NO gate guards this doc.** `proof:colocation`'s note (`gates.mjs:321`) asserts the design-idioms home doc is PRESENT, and `proof:readme-meta-clean` keeps the four component READMEs + CLAUDE.md meta-clean, but NOTHING asserts `design-idioms.md`'s home-map MATCHES the `src/styles/` reality. The P-5 doc-drift class (the same class W-CI-GREEN's `readme-meta-clean` and W-DOC-FRESHEN repair for OTHER docs) is unguarded for the single most BINDING design doc. A doc that drifts silently every tranche is not a binding contract — it is archaeology. This wave refreshes it AND mints the gate that keeps it current (the doc joins the machine-locked set, so the next BA-class idiom-add cannot land without a home-map row).

## §0 — RE-GROUND (mandatory step-0; re-grep every cite at HEAD before any edit)

This wave starts from the captured drift above, re-verified against BB HEAD (`f3c4170e` at this authoring) — NOT a blind re-diagnose. design-idioms.md is the localized idiom-home; the §0 discipline is to walk the doc's OWN home-map against the live `src/styles/` tree and record every divergence BEFORE the edit, so the refresh reflects what BA SHIPPED, not what the doc remembers. If a cite has drifted further (a Batch-4 carve moved a partial, a Batch-2 retire deleted another recipe), the agent records the drift in PROGRESS and re-locates the mechanism — it does NOT re-invent the home-map from scratch (the doc's §1 "does NOT re-locate the idioms" discipline holds — this is a legibility refresh, never a cascade re-order).

```
# RE-GROUND command set — run ALL at HEAD; confirm each drift reproduces + each cite holds.

# 1. The DELETED recipes still listed as live examples (drift #1)
sed -n '69p' docs/precepts/design-idioms.md             # the §3 row naming btn-audacious/-gold
grep -n "@utility btn-audacious\|@utility btn-audacious-gold" src/styles/utilities/btn.css   # → ZERO (deleted at BA.W-GLASS-CAL)
sed -n '1,4p' src/styles/utilities/btn.css              # the source header records the deletion
grep -rn "@utility" src/styles/utilities/btn.css        # the LIVE btn.css @utility set the row SHOULD name

# 2. The three UNHOMED BA idiom files (drift #2)
ls src/styles/glass/surface-axis.css src/styles/feedback-tone.css src/styles/menu.css   # all EXIST
grep -n "surface-axis\|feedback-tone\|menu.css" src/styles/index.css src/styles/glass.css  # the cascade @import rungs
grep -n "surface-axis\|feedback-tone\|menu" docs/precepts/design-idioms.md              # → ZERO home-map rows at HEAD

# 3. §2/§9 missing BA token/recipe axes (drift #3)
grep -n "in srgb\|surface-tint" docs/precepts/design-idioms.md   # §9 NAMES the in-srgb fence (line ~236) but never HOMES its recipe
grep -n "warm-chroma\|dark.*transmissive\|control-surface\|paper-ink-mark" docs/precepts/design-idioms.md  # → ZERO
grep -rln "control-surface\|--control-surface" src/styles/        # the control-surface REST tier home (glass/surfaces.css + tokens/glass.css)
grep -rln "paper-ink-mark" src/styles/                            # the .paper-ink-mark register home (surface-axis.css + segmented-tabs.css)
grep -n "surface-tint-4\|in srgb" src/styles/tokens/color-radius.css   # the in-srgb surface-tint ladder source

# 4. The full LIVE @utility census the home-map must stay total against (the gate's source-of-truth)
grep -rhn "@import" src/styles/index.css src/styles/glass.css     # the cascade partial chain (the home-map's domain set)
grep -rh "@utility" src/styles/ | wc -l                           # 68 @utility recipes at HEAD — the home-map names the FAMILIES, not all 68

# 5. The gateless state (the structural root cause)
grep -n "design-idioms" scripts/gates.mjs                         # → only proof:colocation's note (PRESENT-check, NOT consistency)
grep -rln "design-idioms" scripts/                                # NO proof:precept-current — this wave mints it

# 6. The harness must stay sound after the gate registration
node scripts/proof-gate-script-parity.mjs                         # the file↔key bijection (stays GREEN after the new gate row)
node scripts/proof-gate-manifest-sound.mjs                        # the tags↔aggregate assertion
```

Grounding findings — confirmed at this authoring (each individually re-verified):
- `design-idioms.md:69` names `btn-audacious, btn-audacious-gold`; `grep "@utility btn-audacious" src/styles/utilities/btn.css` returns ZERO (deleted at BA.W-GLASS-CAL; the source header at `btn.css:2` records it).
- `src/styles/glass/surface-axis.css`, `src/styles/feedback-tone.css`, `src/styles/menu.css` all EXIST and import into the cascade (`glass.css:50`, `index.css:159`, `index.css:172`); `grep "surface-axis\|feedback-tone\|menu" design-idioms.md` returns ZERO home-map rows.
- `design-idioms.md:236-237` references "the `in srgb` surface-tint family (over `in oklab`)" in §9's twin-divergence preamble but never adds it as a recorded-divergence ROW (the home is named in passing, not documented).
- `grep design-idioms scripts/gates.mjs` returns only `proof:colocation`'s PRESENT-check note (`gates.mjs:321`) — no consistency gate; `scripts/proof-precept-current.mjs` does not exist.

Captures / authority cross-references:
- `docs/precepts/design-idioms.md` (the BINDING idiom-home, the target).
- CLAUDE.md §"The warm-chroma floor" + §"The dark register as a luminous transmissive material" + §"Shared surface-decoration axis" + §"The calm CTA register" (the BA idiom canon the home-map must reflect — the source of the idiom NAMES + their files).
- `src/styles/index.css` header (the cascade-ORDER ledger — the home-map documents WHERE, the index.css ledger documents the ORDER; the two must agree on the partial set).
- `scripts/proof-readme-meta-clean.mjs` (the doc-sync gate MODEL — read-LIVE-from-source so the gate cannot itself go stale; this wave's gate follows that pattern) + `scripts/proof-design-idiom-localization.mjs` (the comment-strip + pure-detector house pattern).
- BB.md §1 Batch 6 (the doc-sync charge) + §3 (the P-5 doc-drift class, "here with no gate").
- `docs/tranches/BB/EXECUTION-DAG.md:32` (Batch 6, W-PRECEPT-SYNC parallel with the chronic-residuals band).

## The drift table (file:line — RE-GREP at HEAD)

| # | drift | file:line (the cause at HEAD) | the mechanism | fix-class |
|---|---|---|---|---|
| 1 | DELETED recipe listed as live example | `design-idioms.md:69` (`btn-audacious, btn-audacious-gold`); `btn.css:2` (records the deletion) | §3's `interactive/button` home-map row names two `@utility` recipes DELETED at BA.W-GLASS-CAL; the row's example set is stale | **doc-refresh (re-point examples)** |
| 2a | `surface-axis.css` UNHOMED | `glass.css:50` (`@import`); ZERO row in `design-idioms.md` §3 | the shared `[data-surface]` surface-decoration axis has no home-map row | **doc-add (§3 row)** |
| 2b | `feedback-tone.css` UNHOMED | `index.css:159` (rung 7a); ZERO row | the `.feedback-tone` tinted-glass tone register has no home-map row | **doc-add (§3 row)** |
| 2c | `menu.css` UNHOMED | `index.css:172` (rung 11a); ZERO row | the `.glass-menu-row` glass menu register has no home-map row | **doc-add (§3 row)** |
| 3a | warm-chroma floor not in §2 | the `--neutral-*` ladder (`tokens/color-radius.css`); ZERO §2 entry | the deliberate warm-hue token recalibration (a token-identity keep) has no idiom-home guidance | **doc-add (§2 note)** |
| 3b | dark transmissive material not homed | the dark-arm token family (`dark-arm.css`/`light-dark.css`); ZERO entry | the dark luminous-material token arm has no §2 home note | **doc-add (§2 note)** |
| 3c | in-srgb surface-tint fence named-not-homed | `design-idioms.md:236-237` (named in passing); `tokens/color-radius.css:139-143` (the source) | §9 references the in-srgb fence in its preamble but never adds it as a recorded-divergence ROW | **doc-add (§9 row)** |
| 3d | control-surface REST tier + `.paper-ink-mark` unhomed | `glass/surfaces.css` (control-surface); `glass/surface-axis.css` + `segmented-tabs.css` (paper-ink-mark) | the BA.W-SURFACE-AXIS scope-7/8 registers have no home-map coverage | **doc-add (§3 rows)** |
| 4 | NO consistency gate (structural root) | `gates.mjs:321` (only `colocation`'s PRESENT-check); no `proof-precept-current.mjs` | nothing asserts the home-map ↔ `src/styles/` consistency — the doc drifts gatelessly every tranche | **gate-mint** |

## Scope (gestalt refresh, not a patch — home the new idioms idiomatically, retire the dead examples cleanly)

1. **(drift #1) Re-point the §3 `interactive/button` home-map example set off the DELETED disco recipes.** The `utilities/btn.css` row (`design-idioms.md:69`) drops `btn-audacious, btn-audacious-gold` (deleted at BA.W-GLASS-CAL) and re-points to the LIVE `@utility` set the source ships at HEAD (re-grep `grep "@utility" src/styles/utilities/btn.css` — `scale-on-hover`, `twin-line-divider`, `transition-control/collapse`, `sheet-animate`, `table-cell/head`, `rainbow-vivid/pastel`, `btn-interactive`). NO migration prose ("retired btn-audacious") in the home-map row — the home-map names what EXISTS, not what was deleted (the greenfield-no-meta discipline; the deletion archaeology lives in the source header + CLAUDE.md, not the binding home doc). Clean break: the row reads as if the live set were always the set.

2. **(drift #2) Add the three BA-shipped idiom files to the §3 home-map.** Three new rows (or sub-rows under the glass-surface domain where they cohere) in the §3 home-map table, each naming the file + its `@utility`/recipe family + a representative example, in the existing register:
   - **surface-axis** → `src/styles/glass/surface-axis.css` (the glass-surface domain — it is a `glass/*` partial, imported via `glass.css:50`): the `[data-surface="glass|veil|opaque"]` shared surface-decoration axis + the `.paper-ink-mark` register (scope 8 lands here too — re-grep `segmented-tabs.css` to confirm the ≥2-consumer split).
   - **feedback-tone** → `src/styles/feedback-tone.css` (a new top-level domain, cascade rung 7a after cards.css): `.feedback-tone` + `.feedback-tone-{success,warning,info,destructive}`.
   - **menu** → `src/styles/menu.css` (a new top-level domain, cascade rung 11a after utilities): `.glass-menu-row` + `.glass-menu-section`.
   Each row's `@import` cascade position is cross-referenced against `index.css`'s ledger (the home-map documents WHERE, index.css documents the ORDER — they must agree on the partial set). The "Rule for a NEW `@utility`" prose (§3, `:78-86`) gains a line directing a new feedback-tone variant → `feedback-tone.css` and a new menu-row recipe → `menu.css` (the cohesion-domain placement the rows establish).

3. **(drift #3a/3b) Note the BA token-identity axes in §2.** §2 (the `@theme`/token rule) gains a SHORT note (NOT a re-statement of CLAUDE.md — a pointer): the `tokens.css` raw-value source-of-record now carries the warm-chroma floor (the `--neutral-*` ladder authored at the warm hue — a deliberate token identity, the no-gray keep) and the dark luminous-transmissive material arm (the dark `--glass-*`/`--surface-tint-*` dark-arm), both consumer-overridable on `:root` per the existing §2 token-vs-alias split. The note's binding content is the placement rule ("a dark-arm token re-declaration goes in the dark-arm/light-dark partial, NOT a new parallel `--*-dark` family" — the W-DARK-MATERIAL discipline + the AW.W26 in-srgb fence), reading LIVE from the source files so the note names where the BA arms LIVE, not their values (values live in CLAUDE.md + tokens.css — the home doc points, never duplicates).

4. **(drift #3c) Add the in-srgb `--surface-tint-*` fence as a §9 recorded-divergence ROW.** §9 already references it in the preamble (`design-idioms.md:236-237`) but never documents the keep — add it to the recorded-twin table family (alongside ConfiguratorRow-vs-LabeledField + the cn/`.focus-ring`/in-srgb keeps the preamble lists): the `--surface-tint-*` ladder uses `color-mix(in srgb …)` DELIBERATELY (AW.W26 — the brand-calibrated mix the whole token ladder speaks), NOT a gap to "fix" to `in oklab`. The row records the keep + cross-references CLAUDE.md's AW.W26 record + the `tokens/color-radius.css:139-143` source. (The shader-OKLCh path is the separate correct oklab case — note the distinction, exactly as CLAUDE.md does.)

5. **(drift #2/3d) Home the control-surface REST tier + the `.paper-ink-mark` register.** The BA.W-SURFACE-AXIS scope-7 control-surface REST register (`--control-surface-{bg,border,blur,bg-hover}` — the one-material-at-rest form-family seam, re-grep its home: `glass/surfaces.css` + `tokens/glass.css`) and the scope-8 `.paper-ink-mark` register (the 2px ink hairline on paper, ≥2 consumers — the math-paper section rail + the SegmentedTabs underline; re-grep `surface-axis.css` + `segmented-tabs.css`) each get a home-map line or a §3 note. The `.paper-ink-mark` is a MARK register (no plate, no glass) — the home-map records the distinction (it rides the glass-surface domain's surface-axis.css file but is NOT a `[data-surface]` plate rung — the same distinction CLAUDE.md §"The `.paper-ink-mark` PAPER register" draws).

6. **(drift #4) Mint `proof:precept-current` — the design-idioms ↔ source consistency gate.** `scripts/proof-precept-current.mjs` (the comment-strip + pure-detector + read-LIVE-from-source house pattern, mirroring `proof-readme-meta-clean.mjs`/`proof-design-idiom-localization.mjs`) asserts the home-map is CURRENT: (a) every `@import`-partial the §3 home-map NAMES resolves to a real file on disk (no dangling home-map row); (b) every central-stylesheet idiom file the gate's KNOWN-FILE set names (surface-axis · feedback-tone · menu — the BA-shipped trio + any §3-mapped partial) has a home-map row (no unhomed shipped idiom); (c) no DELETED-recipe sentinel survives as a live example (the `btn-audacious`/`btn-audacious-gold` strings appear NOWHERE in the §3 home-map example cells — re-grep the source confirms they are gone from `src/styles/`, so a live home-map mention is provably stale). Register `proof:precept-current` in `package.json` + `scripts/gates.mjs` (the registry row + `proof:all`/parity); tag `["local","ci"]` (a static doc/source consistency check, no Playwright, runs headless). The gate is DERIVED (it reads the `@import` chain + the `@utility` census LIVE from `src/styles/`, never a hardcoded file list it can drift against — the `readme-meta-clean` "the gate cannot itself go stale" discipline).

7. **Record the wave in PROGRESS + confirm the harness stays sound.** After the doc refresh + gate mint, `proof:gate-script-parity` (file↔key bijection) and `proof:gate-manifest-sound` (tags↔aggregate) stay GREEN. The terminal check: `node scripts/proof-precept-current.mjs` exits 0 (the refreshed doc is current) AND it was born-RED on the pre-refresh doc (the drift was real).

## Triumvirate Dispatch

- **A home-map refresh reveals a deeper source mismatch.** If walking the home-map against `src/styles/` reveals not just a doc drift but a SOURCE incoherence (an idiom file that imports out of cascade order, a `@utility` in the wrong cohesion-domain file, a partial that should have been carved and was not), that is a scope-reveal: the SOURCE fix is NOT this wave's (this wave touches the DOC + the gate, never a style rule — the §1 "does NOT re-locate the idioms" discipline). Book the source fix to the owning concern (a mis-placed `@utility` → W-DEAD-SWEEP/W-CARVE3; a cascade-order bug → the owning Batch-2/4 wave) and refresh the doc onto the CURRENT (possibly-imperfect) reality, recording the booked source fix in PROGRESS. Do NOT widen into a source edit to make the doc "cleaner."
- **The gate's KNOWN-FILE set risks overfitting.** The gate's "every shipped idiom file has a home-map row" arm needs a source-of-truth for "shipped idiom file" — if the only honest source is a hardcoded list (surface-axis/feedback-tone/menu), that is the overfitting trap the `readme-meta-clean` discipline warns against (a gate that itself goes stale). Triumvirate the DERIVATION: the gate should read the `@import` chain from `index.css` + `glass.css` LIVE and assert each NAMED partial (minus the thin-root + the pure-`:root`-token partials that carry no `@utility`/recipe a contributor places) has a home-map row — a derived set, not a literal. If the derivation cannot cleanly distinguish a "places-an-idiom" partial from a pure-token partial, halt and triumvirate the heuristic rather than hardcoding the trio.
- **The doc refresh collides with W-DOC-FRESHEN's bound.** W-DOC-FRESHEN (Batch 6, parallel) owns the CLAUDE.md stale-example refresh (the `--glass-blur-resting` anti-idiom) + the README gate tables. If the design-idioms refresh needs a CLAUDE.md cross-reference edit (a §2 note pointing at a CLAUDE.md section that W-DOC-FRESHEN is concurrently editing), coordinate the single CLAUDE.md touch — this wave OWNS `design-idioms.md` + `proof-precept-current.mjs` + the gate registration; CLAUDE.md is W-DOC-FRESHEN's bound. If a CLAUDE.md edit is genuinely required, book it to W-DOC-FRESHEN, do not write CLAUDE.md here (the registry single-owner discipline).
- **Diagnostic loop halt.** If `proof:precept-current` still reds after the refresh and three iterations have not isolated whether the failure is a residual unhomed file, a stale example the refresh missed, or a gate-derivation bug (the KNOWN-FILE set false-flagging a pure-token partial), halt and triumvirate. The suspect is the gate's partial-classification heuristic (the places-an-idiom vs pure-token distinction) — the same overfitting risk the second Dispatch names.

## File Bounds

| File | Access |
|---|---|
| `docs/precepts/design-idioms.md` | modify (the home-map refresh: §3 re-point + the three new rows + the control-surface/paper-ink-mark lines; §2 token-axis note; §9 in-srgb fence row) |
| `scripts/proof-precept-current.mjs` | create (the born-RED consistency gate — read-LIVE-from-source) |
| `package.json` | modify (register `proof:precept-current` + add to `proof:all`/parity) |
| `scripts/gates.mjs` | modify (register the gate row in the registry — tags `["local","ci"]`) |
| `docs/tranches/BB/audit/W-PRECEPT-SYNC-census.md` | create (the drift census: the home-map ↔ source walk, each drift located + dispositioned doc-refresh vs booked-source-fix) |
| `docs/tranches/BB/PROGRESS.md` | modify (the discharge row + the born-RED→GREEN log + any booked source-fix) |

Do NOT touch:
- **Any `src/styles/*.css` rule** — this wave touches the DOC + the gate, NEVER a style rule (the §1 "does NOT re-locate the idioms" discipline; a source mis-placement found in the walk is BOOKED to the owning concern, not fixed here).
- **CLAUDE.md** — W-DOC-FRESHEN owns the CLAUDE.md stale-example refresh + README gate tables (Batch 6, parallel). A required CLAUDE.md cross-reference is booked to it, not written here.
- **The other BB doc-sync waves' bounds** — W-DEAD-SWEEP (the dead-token/orphan-gate-script retire — if a §3-mapped recipe turns out DEAD, that retire is W-DEAD-SWEEP's, this wave only stops naming it), W-DELTA-RESHOOT (the DELTA stale-hash re-shoots), W-DISPOSITION-RESTAMP (the disposition-register books). Disjoint.
- **W-CI-GREEN's `readme-meta-clean` bound** (Batch 0, landed) — the dock README gate-table sync is its concern; this wave's gate is `proof:precept-current` (design-idioms.md), a sibling consistency gate, not an extension of `readme-meta-clean`.
- **The standing fences** — GL shader internals; ppmycota purple (the home-map names the demo-local `--motion-accent` fence WHERE CLAUDE.md does, never imports a demo hue); the slides/value.js/kf foreign trees.

### Disjointness

One agent unit (the doc refresh + the gate are the same coherent concern — the gate reads the doc the refresh writes, so they sequence within ONE unit, never across two). Across Batch 6: W-NDA-DECIDE (the native-drawer build-or-retire), W-AUR-KUWAHARA (the painterly residual), W-DELTA-RESHOOT (the DELTA re-shoots), W-DOC-FRESHEN (CLAUDE.md + READMEs) — all doc/disposition/source-disjoint from this wave's bounds (`design-idioms.md` + `proof-precept-current.mjs` + the two registration files) by construction. The ONE shared file is `scripts/gates.mjs` (this wave registers ONE gate row); no other Batch-6 wave writes a gate registry row, so there is no contention (W-DEAD-SWEEP RETIRES gate rows in Batch 2, sequenced before Batch 6). The ONE coordination seam is a possible CLAUDE.md cross-reference — booked to W-DOC-FRESHEN, never written here.

## Hard Gate

`proof:precept-current` (born-RED at HEAD, driven GREEN by the wave) — the design-idioms.md ↔ `src/styles/` consistency gate, three falsifiable SOURCE witnesses (the comment-strip + read-LIVE-from-source house pattern), each RED at HEAD pre-wave, AND the harness-soundness regression guard:

1. **W1 — no DELETED recipe survives as a live home-map example.** The `btn-audacious`/`btn-audacious-gold` strings appear NOWHERE in the §3 home-map example cells, AND a LIVE re-grep confirms those `@utility` recipes are absent from `src/styles/` (so a home-map mention is provably stale, never a false flag on a still-live recipe). RED at HEAD: `design-idioms.md:69` lists both. **Bite (anti-evasion):** the gate reads the deleted-recipe set LIVE — it does NOT hardcode `btn-audacious`; it flags ANY home-map example token that (a) matches the `@utility`/recipe-name shape AND (b) has ZERO definition site in `src/styles/`. A future agent deleting another recipe but leaving it in the home-map reds the same way (the drift class is closed, not just this instance).

2. **W2 — every shipped central-stylesheet idiom file has a home-map row.** Each idiom-bearing `@import`-partial in the cascade chain (derived LIVE from `index.css` + `glass.css`, minus the thin-root + pure-`:root`-token partials) is NAMED in the §3 home-map. The BA trio (surface-axis · feedback-tone · menu) and every other idiom partial resolve to a home-map row. RED at HEAD: the three BA files have ZERO rows. **Bite:** the gate derives the partial set from the LIVE `@import` chain — a NEW idiom partial added in a future tranche without a home-map row reds (the gate is the structural answer to the P-5 doc-drift recurrence: the home-map cannot fall behind the cascade again).

3. **W3 — every home-map row resolves to a real file/recipe.** Every `@import`-partial the §3 home-map NAMES exists on disk, and every example recipe it names has ≥1 definition site in `src/styles/` (no dangling row, no phantom example). RED-equivalent at HEAD: the W1 dangling `btn-audacious` example is itself a W3 violation (a named example with no source). **Bite:** a home-map row pointing at a renamed/moved/deleted file reds — the bidirectional consistency (W2 = source⊆doc, W3 = doc⊆source) makes the home-map a true bijection against the idiom-bearing partial set.

4. **W4 — the harness stays sound (regression guard).** `proof:gate-script-parity` (file↔key bijection) AND `proof:gate-manifest-sound` (tags↔aggregate) stay GREEN after the `proof:precept-current` registration. RED-equivalent at HEAD: vacuously green (no new gate); W4 reds if the registration breaks the bijection or the manifest soundness. Assert shape: both gates exit 0 at close, and `proof:precept-current` is tagged `["local","ci"]` (a static check, no Playwright — it must befitting-run on the headless CI runner).

**The self-test bite (the gate proves its own bite).** `proof-precept-current.mjs` carries an inline self-test (the `proof-glass-cohesion`/`proof-surface-axis` precedent): the detector run against a SYNTHETIC stale home-map (a `btn-audacious` example + a missing surface-axis row) FLAGS both, and against the REFRESHED doc flags NEITHER — the distinguishing bite demonstrated in the gate's own fixture, so a future weakening (the detector silently passing a stale doc) is caught by the self-test, not just the live doc.

**This is a STRUCTURAL/doc wave, not a visual one** — `proof:precept-current` exit 0 (the refreshed home-map is current + the gate guards it) + the harness soundness are the binding truth; there is NO `proof:ba-gestalt` requirement (this wave paints ZERO pixels — it refreshes a binding DOC and mints its gate, no surface changes). No π readback, no DELTA frame capture — the binding artefact is the born-RED→GREEN gate log + the drift census.

## Format And Lint Cadence

`node scripts/proof-precept-current.mjs` born-RED before the doc refresh (proof the drift is real at HEAD), GREEN at close; `npm run proof:gate-script-parity` + `npm run proof:gate-manifest-sound` after the package.json/gates.mjs registration (the harness must stay sound at each step, not only at close); the gate's inline self-test runs as part of the gate (the synthetic-stale-doc fixture flags, the refreshed doc passes); `git diff --check` before close. No `typecheck`/`build` needed (zero source/style edits — the doc + the `.mjs` gate are the only changes; the gate is plain ESM, not type-checked by `vue-tsc`).

## Verification Artefacts

- `docs/tranches/BB/audit/W-PRECEPT-SYNC-census.md` — the home-map ↔ source walk: each of the §3 partials located, each BA-shipped idiom file's home-map status, each drift dispositioned (doc-refresh vs booked-source-fix).
- The `proof:precept-current` JSON artefact (born-RED log: the `btn-audacious` dangling example + the three unhomed files → GREEN log: the refreshed home-map, no dangling, no unhomed).
- The gate's inline self-test output (the synthetic-stale-doc FLAGGED, the refreshed doc PASSED — the distinguishing bite).
- The `gate-script-parity` + `gate-manifest-sound` GREEN-at-close outputs (the harness-soundness regression guard).
- The BB PROGRESS row (the discharge + any booked source-fix).

## Commit Plan

- doc-refresh commit: `docs(precepts): refresh design-idioms home-map onto the BA-shipped CSS reality — surface-axis/feedback-tone/menu homed, btn-audacious examples retired, the in-srgb fence + warm-chroma/dark-material axes noted (BB.W-PRECEPT-SYNC)` — names the three new home-map rows + the §3 re-point + the §2/§9 notes in the body.
- gate commit: `test(precepts): proof:precept-current born-RED→GREEN — the design-idioms ↔ source consistency gate + self-test + parity registration (BB.W-PRECEPT-SYNC)` — names the three witnesses + the self-test bite.
- doc/status commit: the `W-PRECEPT-SYNC-census.md` + the BB PROGRESS row.

## Dependencies

- **Depends on**: nothing structurally. It reads the BA-shipped `src/styles/` at HEAD (the idiom files all landed at BA / 4.0.0). It is Batch 6 (the chronic-residuals + doc-sync band) — after the integrity floor (Batch 0) + gestalt hardening (Batch 1), so it refreshes the doc onto the CORRECTED source (a Batch-2 dead-recipe retire or a Batch-4 carve that moved a partial is reflected in the refresh; running before those would refresh onto a soon-stale source — but the dependency is soft, the gate is DERIVED so it stays current regardless of run order).
- **Blocks**: nothing directly — but it is part of the close-honesty floor in spirit: the binding idiom-home being CURRENT + GATED is a precondition for the next tranche's "answer from this doc alone" contract to hold (L inv-16). W-REFLECT3 (Batch 7) reads a green `proof:precept-current` as part of the full-set close.
- **Coordination (soft)**: a possible CLAUDE.md cross-reference is booked to W-DOC-FRESHEN (the CLAUDE.md owner); the single `gates.mjs` registry row is sequenced after W-DEAD-SWEEP's Batch-2 gate-row retires (no contention — different rows, different batches).

## Named successors

- **W-DOC-FRESHEN (Batch 6)** — owns any CLAUDE.md cross-reference the §2 token-axis note points at (the CLAUDE.md stale-example refresh is its bound; this wave points, it edits).
- **The owning-concern book (conditional)** — if the home-map walk reveals a SOURCE mis-placement (a `@utility` in the wrong cohesion-domain file, a partial that should have been carved), the source fix is BOOKED to its owner (W-DEAD-SWEEP for a dead recipe, W-CARVE3 for a carve) and recorded in the census — this wave refreshes the doc onto the current reality, it does not unilaterally re-locate a source idiom.
- **The next-tranche idiom-add** — `proof:precept-current` is the standing guard: any future BA-class central-stylesheet idiom file lands WITH its home-map row or reds the gate (the P-5 doc-drift class is closed for the binding idiom-home, structurally — never re-booked).
