# Lane R — N-6 `./drawer`, N-7 the 10.0.0 records

**Seat** implement · **model** `claude-opus-5-5` (this seat's own system identity; matches `claude-opus-5*`) ·
**date** 2026-09-22 · **base** `master` @ `a08143ce` (lanes L, X, C, T all committed) · **ruling
of record** `docs/tranches/BK/execution/2026-09-22-register-wave/RULINGS.md` §2 N-6, N-7, §3 lane
R, reading §1 10-1..10-6 and §2 N-1..N-3 for the rows it records, with every other lane's
"FOR LANE R" section as the handed figures (each re-measured on the tree where the tree can
answer).

## Step-0 baseline

`git status --short` at first byte: empty. `git diff --stat`: empty. HEAD `a08143ce` (Lane L's
commit landed between the prompt's datum `695d4925` and this seat's first read; X `6875b1b3`,
C `72d8bd96`, T `9025efe2`, the driver's L ruling `5bbb2de8`).

## N-6 · `./drawer`

> RULINGS §2 N-6: "The `./sheet` row and the two `## 8.0.0` stage-paragraph sentences … rewritten
> to say Drawer folded WHOLE into Sheet at `336dacf9` ("the detent is a size"); a fold, not a
> `_Deleted —` entry."

- **Measured first.** `git show --stat 336dacf9`: "feat(sheet): land BK #39 W-DIALOG-DETENT — the
  detent is a size, the drawer folds in whole" — `src/components/drawer/**` deleted, the detent
  engine moved to `src/components/sheet/detents/`; `git tag --contains 336dacf9` → `v8.0.0`,
  `v9.0.0`. The v7.0.0 `Drawer` props (`mode`, `snapPoints`, `activeSnapPoint`, `direction`,
  `stage`) and the v8.0.0 `SheetContent` props (`side`, `detents`, `detent`) read off the tags;
  the v8.0.0 sheet story (`demo/stories/containers/sheet.vue:40,56-88`) shows the
  `<Dialog>` + `<SheetContent>` + `Dialog*` part composition and `<Dialog :modal="false">` as the
  live-behind arm.
- **A fact the ruling did not name, found while measuring.** The stage the two sentences describe
  was itself deleted in toto at `b155ca4c` ("feat(dialog): land BK #38 W-DIALOG (cut 1) — the
  dismiss axis, the stage deleted, sheet seeded"; `git tag --contains` → `v8.0.0`, `v9.0.0`):
  `git grep -c immersive v8.0.0 -- src` is empty, v7.0.0 carries it in nine files. A rewrite that
  said only "`Dialog`/`Sheet`" would state a false thing, so each bracket says Drawer folded into
  Sheet (the ruling) AND that no component accepts `stage` at 8.0.0 (the measurement). No
  `_Deleted —` entry was written for either.
- **Edits** (line numbers at close, after §10.0.0 was inserted above). `MIGRATION.md:521` — the `./sheet` row: the `Was` cell `~~—~~ \`@mkbabb/glass-ui/drawer\``,
  the old "NEW." text struck, a `[2026-09-22 · register wave N-6 — …]` bracket naming the fold at
  `336dacf9`, then the consumer map (`<Drawer>`+`<DrawerContent>` → `<Dialog>`+`<SheetContent
  side :detents>`, `mode="live-behind"` → `<Dialog :modal="false">`, the four parts → `Dialog*`,
  `direction` → `side`, `snapPoints` → `detents`, `activeSnapPoint` → `v-model:detent`,
  `DrawerStage` no successor). `MIGRATION.md:1027-1031` — "`Dialog`/~~`Drawer`~~ [2026-09-22 ·
  register wave N-6 — …]". `MIGRATION.md:1041-1044` — "~~Only `Dialog` and `Drawer` accept
  `stage="immersive"`.~~ [2026-09-22 · register wave N-6 — …]".
- **Witness.** A docs row has no test; the verifier that reads MIGRATION (`verify:package`'s
  roster arm) reads `| removed |`-grammar first cells of CSS names only (`.published-roster`: 242
  `theme` + 47 `utility`), and this table is `| Was | Now | What to do |`. Run under the battery
  below.
- **Residue (for the adjudicator, not cured — outside N-6 as ruled).** The stage's deletion at
  `b155ca4c` has no MIGRATION row of its own: `stage` on `DialogContent`/`Drawer`
  (`"none" | "dim" | "scale" | "immersive"`) and the `DrawerStage` type left at 8.0.0, and the
  §8.0.0 "immersive stage scrim" paragraph plus its "blur ontology" sentence ("one private
  immersive stage scrim beside it") still describe a scrim 8.0.0 does not ship. The brackets
  above say so where the ruling put a pen; the paragraph was not otherwise rewritten.

## N-7 · the 10.0.0 records

> RULINGS §2 N-7: "`MIGRATION.md §10.0.0` (every row above, the unlayered manifest, the hash
> pair, the italic row, the two export deletions with the consumer recipe), `CHANGELOG.md` 10.0.0
> entry measured against 9.0.0's published bytes, README/DESIGN touches. The version bump … is
> the DRIVER's act at the cut."

**Measured on the tree before writing** (each lane's FOR LANE R figure re-read where the tree can
answer; logs under `scratchpad/regwave/` (lost when the scratchpad was recreated at ~17:17 in a
session restart; every figure is stated inline below and was re-measured true by challenge A at
17:20-17:26)):
- Hash pairs: `npx tsx R-hash.mts` against `src/composables/dark/darkModeSyncScript.ts` →
  the six new figures T handed, byte for byte (`R-hash.log`); the old column is the §8.1.0
  amendment's table, already in MIGRATION.
- Published surface, 9.0.0 tarball (`npm pack @mkbabb/glass-ui@9.0.0`) vs the tree's fresh
  `dist/` (built 16:46 by L's cure, no `src/` file newer), every `exports` entry's `types` through
  the TypeScript checker (`R-surface.cjs` → `R-surface.log`): `.` 331 → 333 (+`GpuBackend`,
  `RendererStatus`); `./keyboard` 9 → 12 (+`LabeledShortcut`, `formatComboLabel`,
  `suspendShortcuts`); `./color` 16 → 14 (−`ColorResolver`, −`defaultBlobColorResolver`);
  `./fourier-field` 14 → 14 (−`ringsAt`, +`FourierSource`); `./timeline` 4 → 9 (+`HUE_OFFSET`,
  `HUE_STOPS`, `HUE_STRIDE`, `TimelineSpan`, `accentFor`); total 1271 → 1279. `exports` 68 → 68
  keys, none gone, none new; peers 9 → 9, identical; `files` `["dist"]` → `["dist",
  "MIGRATION.md"]`. Neither deleted `./color` name nor `ringsAt` was on the root barrel at 9.0.0.
- `text-caption`: 9.0.0 `dist/styles/typography/semantic.css` carries `font-style: italic`; the
  tree's carries none. `Chip` `SIZE` gains `xs` (absent in the 9.0.0 d.ts).
- Layering: `src/styles/index.css:1` and `dist/component-styles.css:1` both open with `@layer
  theme, base, components, utilities;`; `slider/styles.css:6-10` states its exception.
- The manifest: generated from L's RECORD "THE MANIFEST" lines (`L/RECORD.md:78-125`) by script
  (`R-manifest.md`), 466 rules / 48 files summed from the per-file counts — L's figure; the gate
  arm that measures the same set is run in the battery below.

**Edits.**
- `MIGRATION.md:8-200` — `## 10.0.0 — UNRELEASED` above `## 9.0.0`: the **Status.** paragraph
  (points to the two _Amended after 9.0.0_ blocks by heading instead of repeating them);
  _This file ships in the package_ (C, 10-6); _Every library style rule moves into `@layer
  components`_ (L, 10-1: what moves for a consumer, `!important`, the four library-side paint
  rows and the coarse floor, the exceptions, then the manifest table `| file | rules |
  top-level selectors |`, 48 rows); _Two names leave `./color`_ and _`ringsAt` leaves
  `./fourier-field`_ (X's rows verbatim, `| removed | migration |`, backticked bare-name first
  cell); _`AuroraAtoms` admits `interactivity.light` only on the impasto media_ (X, `| was | now
  |`); _`text-caption` is upright_ (L, 10-5, `| was | now |` — not the removal grammar, since the
  name stays); _`darkModeSyncScript()` hardens its read, and every CSP hash moves_ (T, N-3: six
  pairs + the published 9.0.0 normalize hash); _`--success` and `--warning` darken in the light
  arm_ (T, N-2).
- Committed prose the cut makes false, bracketed in MIGRATION's spaced late-row form
  (`[2026-09-22 · register wave 10-3 — …]`, `[2026-09-22 · register wave N-3 — …]`; at close
  `MIGRATION.md:248,270-272,380-382,461-462,1676`):
  the §9.0.0 `<FourierField :color-resolver>` row ("unless the file uses it for something else"
  struck, "unconditionally at 10.0.0"); the §9.0.0 "unchanged by this cut … may keep importing"
  paragraph (bracket after it); the `ColorResolver` census row (second bracket); the §8.1.0
  heading _The default emission is BYTE-IDENTICAL_ and its closing "needs nothing" sentence.
- `CHANGELOG.md` §9.0.0 — two brackets in the file's own form (`[2026-09-22 · register wave
  10-3]`, `[2026-09-22 · register wave N-3]`, the 5A precedent at `CHANGELOG.md:337,483`):
  "untouched and still ship on `./color`" → "Both leave `./color` at 10.0.0"; "needs nothing" →
  "True of 9.0.0; at 10.0.0 every emission moves, the default to 313 bytes".
- `README.md` § Usage, the synthesis paragraph — "Four utilities" → three (`text-math`,
  `text-math-body`, `fourier-f`, "because mathematical italic is notation"); the upright-caption
  workaround struck (the slant it protected is retired) and replaced with "`text-caption` is
  upright; add `italic` beside it if you want the slant back". § Documentation — "None of that
  ships … `files: ["dist"]`" → "Of that, only `MIGRATION.md` ships … `files: ["dist",
  "MIGRATION.md"]` … `node_modules/@mkbabb/glass-ui/MIGRATION.md`". § Design Tokens — one new
  paragraph after the unlayered-`:root` sentence: every other shipped rule in `@layer
  components`, `./styles.css`'s order line, what stays outside, the `!important` inversion.
  In place, not bracketed: the README is the present-tense guide to the package it ships in,
  and the O-20 doc lane amended it the same way (`a314533a`). The README quotes no `./dark` hash.
- `DESIGN.md` — nothing moves. 0 hits for "synthesis", "italic", `sha256`, `@layer`, `files`,
  `ColorResolver`, `ringsAt`; its type table's `.text-caption` row never listed italic.
- `docs/design/**`, `docs/consumer-evidence/**` — nothing moves: 0 hits for `italic`,
  `text-caption`, `ColorResolver`, `defaultBlobColorResolver`, `ringsAt`, `sha256`. (The Drawer
  mentions in `docs/design/{affordance-map,design-idioms,motion-canon}.md` are outside N-6 as
  ruled — the residue below.)

- `CHANGELOG.md:3-100` — `## 10.0.0 — UNRELEASED` above `## 9.0.0 — 2026-08-29`, in the 9.0.0
  entry's form (the pointer line, the "measured against the published bytes" paragraph, then
  `### Changed/Removed/Added/Fixed — …` sections). It covers everything from the 9.0.0 tag to
  HEAD, since that is what the next tarball carries: the register wave (layering, the three
  names, `AuroraAtoms`, `text-caption`, the dark read + hashes, the two tones) and the O-20 /
  O-26 cure waves (`git log v9.0.0..HEAD`: `46ab4124`, `c645c393`, `a314533a`, `dd8a5fe5`,
  `ae17992c`, `c1f266ad`, `650297da` — keyboard, timeline, type doors, `Chip` `xs`, `defaultDark`
  object form, the B-7 ramp, Alert glyph, tooltip ceiling, slider cursors, configurator hover,
  the Boolean cast, aurora a11y arms). Every name figure is from `R-surface.log`; the CSS name set
  re-measured directly (`@utility` 47 = 47, `@theme` 242 = 242, symmetric difference empty on
  both, 9.0.0 tarball vs tree `dist/`); the package figures from `npm pack --dry-run --json` on
  the tree (`R-cure1-pack.json`, cure round 1: 840 entries, packed 1,014,394 B, unpacked
  2,890,330 B, `MIGRATION.md` 327,286 B) against the 9.0.0 tarball (837 entries, 897,968 B packed, 2,549,378 B unpacked —
  the sum of the untarred files, equal to the pre-O-20 ratchet datum `c0d43348` rebinds from).

**Witness.** RULINGS N-6/N-7 name no test and the lane mints none (gates exactly 60; records
rows carry no born-RED leg). The tests that READ these files ran on the final bytes:
`public-surface.spec.ts`, `design/token-bridges`, `design/plate-register`,
`status-dot.contract`, `a11y/coarse-target`, `custom/blob/gl-excise`, plus
`gates/orphan-css-partial` (the A-3 arm over the manifest's set) → `Test Files 7 passed (7)` ·
`Tests 137 passed | 1 expected fail (138)` (`R-targeted.log`). `verify:package`
(`node scripts/verify-export-types.mjs`, `R-verify-package.log`): the `.published-roster` arm
passes (it runs and throws before the pack on any failure; it did not), and the run stops only at
`G-BUNDLE-RATCHET: bundle ratchet increase forbidden: 2889671 > 2562566` — the expected red
Lane C named, the driver's rebind on the committed tree. Against C's provisional 2,850,979 the
move is +38,692 B: this lane's `MIGRATION.md` +38,238 and `README.md` +614, and −160 B net in
`dist/` from the lanes that landed after C measured.

**Prettier** (repo `.prettierrc.json`): `README.md` passes. `MIGRATION.md` and `CHANGELOG.md`
already failed `--check` at HEAD (checked on `git show HEAD:` copies — N-4's no-sweep datum). Run
on the new sections alone: the CHANGELOG entry is clean; the MIGRATION section differs only in
table column padding, which the file's existing tables do not carry either (aligning the
manifest would pad 48 rows to the widest cell) — left in the file's idiom. The RECORD fails like
every other lane's RECORD (C, L, T, X all `[warn]`).

**Deviation, stated.** The first package measurement was `npm pack --dry-run --json` WITHOUT
`--ignore-scripts`, so npm ran `prepare` (`npm run build`) and rewrote `dist/` at 16:54 without
taking `scratchpad/build.lock`. No lock was held (the directory was absent) and no other lane
was building; the build was from the same committed `src/` (tree clean outside this fence), and
`verify:package` + the battery ran on it afterwards. Every later measure used
`--ignore-scripts` (the verifier's own form). Separately, `dist/component-styles.css` and
`dist/dark.js` are stamped 17:15:48-53, after this seat's 16:54 build and its last write; no
`build.lock` existed and the build is not this seat's; attribution is unknown from disk. The
driver's rebuild under the lock on the committed tree precedes the ratchet rebind.

## Battery · receipt

- Battery `timeout 900 npx vitest run` (`scratchpad/regwave/R-R-vitest.log`): **Test Files 233
  passed (233) · Tests 2258 passed | 10 expected fail (2268)**. No red, in or out of this fence.
- Gate receipt `node scripts/gate-register.mjs` (`R-receipt.log`): `seats:60 active:46
  reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2 unbound:45 drift:0
  rosterSha256:282d05cf violations:0` — unchanged.
- Cure round 1 (after the MIGRATION/CHANGELOG/RECORD cures): `npx prettier --check README.md`
  → `All matched files use Prettier code style!`; `node scripts/gate-register.mjs`
  (`R-cure1-receipt.log`) → `seats:60 active:46 reserved:5 worstCase:51 remaining:9
  external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0` —
  unchanged; `node scripts/verify-export-types.mjs` (`R-cure1-verify-package.log`) → the
  roster arm passes, the run stops at `G-BUNDLE-RATCHET: bundle ratchet increase forbidden:
  2890330 > 2562566` (the expected red, the driver's rebind).

## Where a LEDGER row and RULINGS differ

- O-26 LEDGER R-11-RIDER-2 "Open items" and RULINGS N-6 agree on the cure (the `./sheet` row and
  the two sentences, a fold not a `_Deleted —` entry). Neither names the stage's own deletion at
  `b155ca4c`; RULINGS governs the scope, and the measured fact rides inside the ruled brackets.
- O-26 LEDGER R-12 declared `text-caption` synthesis-dependent and asked the README to say four;
  RULINGS 10-5 (the later ruling) retires the italic and makes it three. RULINGS wins; the README
  says three.

## Residue (for the adjudicator; nothing here was cured)

1. The stage's deletion at `b155ca4c` (`stage` on `DialogContent`/`Drawer`, `DrawerStage`) has
   no MIGRATION row, and §8.0.0's "immersive stage scrim" paragraph and its "blur ontology"
   sentence still describe a scrim 8.0.0 does not ship (N-6's brackets say so at the two ruled
   sentences only).
2. `CHANGELOG.md` §8.0.0 says "`./sheet` mints, repairing a specifier that already had importers
   and resolved to nothing" and "`exports` 66 → 70" — the same Drawer silence N-6 cures in
   MIGRATION (O-26 measured 74 → 70), in a file N-6 did not name. MIGRATION.md §8.0.0's own
   header (:508-510) carries the same `66 → 70` / "Two keys retire" count; measured v7.0.0 74 →
   v8.0.0 70, eleven keys retired (`./drawer` among them), seven minted.
3. `docs/design/affordance-map.md:59,96`, `design-idioms.md:241,352-380` still describe the
   Drawer family (`useDrawerSnap`, `drawer/constants.ts`) as live; `motion-canon.md:216-218`
   already strikes it. Outside N-6 as ruled.
4. `MIGRATION.md` §9.0.0 and §8.1.0 _Amended after 9.0.0_ headers say "UNRELEASED on the
   registry"; they become released at the cut (the driver's bracket, below).
5. The Status paragraph points non-breaking cure-wave changes (ramp stops, Alert glyph tone,
   Boolean-cast defaults) at CHANGELOG 10.0.0 rather than minting rows N-7 did not name
   (adjudication round 1, B7).

## Files touched (driver's pathspec)

```
MIGRATION.md
CHANGELOG.md
README.md
docs/tranches/BK/execution/2026-09-22-register-wave/R/RECORD.md
```

`DESIGN.md`, `docs/design/**`, `docs/consumer-evidence/**`: measured, untouched.

## FOR THE DRIVER

- **Version bump**: `package.json` `9.0.0` → `10.0.0` (not touched here).
- **Placeholders at the cut**: `MIGRATION.md:8` `## 10.0.0 — UNRELEASED` → the file's LIVE form
  (`~~UNRELEASED~~ [<date> · LIVE: tag \`v10.0.0\` at \`<sha>\`, published with provenance by
  \`release.yml\` run <id>, \`latest\` on the registry]`, as §9.0.0); the **Status.** paragraph's
  "`package.json` declares `9.0.0`" sentence the same way. `CHANGELOG.md:3` `## 10.0.0 —
  UNRELEASED` → `## 10.0.0 — <date>`. The two _Amended after 9.0.0_ brackets ("UNRELEASED on the
  registry", §9.0.0 and §8.1.0) gain a dated "shipped in 10.0.0" bracket.
- **Re-measure after any MIGRATION.md edit and after the bump**: the CHANGELOG package
  sentence (840 entries, 2,890,330 B unpacked, `MIGRATION.md` 327,286 B) is from this tree;
  the bump and the LIVE brackets move `package.json` and `MIGRATION.md` bytes, so the figure
  and the ratchet rebind both come from the committed tree (the committed-tree-datum law).

## Cure round 1

**Seat** cure · **model** `claude-opus-5-5` (this seat's own system identity; matches
`claude-opus-5*`) · **ruling** `scratchpad/regwave/R-adjudication-1.json` (R-adjudicator round
1, `claude-fable-5-1`), 19 cureList items applied in order; nothing REJECTED applied.

- **1** (B3) `MIGRATION.md:35` — "your overrides win whatever their specificity"; paragraph
  re-wrapped.
- **2** (A6 amended) `MIGRATION.md:12-19` — the Status paragraph names the four breaking
  changes (cascade layer, three names, `AuroraAtoms` narrowing, `text-caption`'s upright
  paint); re-wrapped at 88.
- **3** (B7 amended) `MIGRATION.md:18-19` — the CHANGELOG pointer sentence appended.
- **4** (A1) `MIGRATION.md:51-53` — "declare yours `!important` in a layer ordered before
  `components`; a declaration without `!important` never beats an important one, in any layer."
- **5** (B4) `MIGRATION.md:169-170` — "(the table under _Amended after 9.0.0_ under §8.1.0)".
- **6** (A4) `MIGRATION.md:198-201` — `Alert` tone wash/rim/glyph, `Metric`'s up delta and the
  `.input-pill:user-valid` border join the reader list.
- **7** (A3, B4, A5 amended) `MIGRATION.md:524` (the `./sheet` row) — "retired with the fold";
  the stage paragraph cited by heading under §8.0.0; the two default flips (`side` defaults to
  `right`; the implicit `[0.12, 0.5, 1]` live-behind ladder) with their one-line keeps.
- **8** (B2 + A7) `MIGRATION.md:1029-1041` — "on `Dialog`/`Drawer`" struck as one unit,
  the bracket after the sentence's full stop, "deleted", no git-grep parenthetical, closed with
  a full stop; the paragraph re-wrapped (its committed tail moves line breaks only).
- **9** (B4) `MIGRATION.md:1046` — "(see the `./sheet` row under _Package subpaths_ under
  §8.0.0)"; paragraph re-wrapped.
- **10** (B1) `CHANGELOG.md:15-26` — "left the unlayered cascade — 461 in 47 files into
  `@layer components`, `paper.css`'s five into its two `@utility` definitions —"; the later
  `paper.css` clause struck; re-wrapped (the paragraph grows one line).
- **11** (A2) header model line — the transcript path and the grep provenance struck.
- **12** (A7) N-6 bullet — "nine files".
- **13** (B6) — **deviated**: the ruled `CHANGELOG.md:336,482` was true before item 10; item 10
  adds one line above both brackets, so the cite reads `CHANGELOG.md:337,483` (the 5A
  brackets, `grep -n 'residue lane 5A' CHANGELOG.md`).
- **14** (A7) the "Measured on the tree" lead — the lost-scratchpad sentence added.
- **15** (B6 amended) the Deviation paragraph — the 17:15:48-53 `dist/` stamps sentence
  appended (re-read: `dist/component-styles.css` 17:15:53, `dist/dark.js` 17:15:48).
- **16** (A3, B7) Residue 2 extended with the §8.0.0 header count; Residue 5 added.
- **17** (B5) FOR THE DRIVER — "Re-measure after any MIGRATION.md edit and after the bump".
- **18** (B5) `npm pack --dry-run --json --ignore-scripts` on the tree, no build, `dist/` as
  found (`R-cure1-pack.json`): entries 840 → 840; packed 1,014,139 → 1,014,394 B; unpacked
  2,889,671 → 2,890,330 B; `MIGRATION.md` 326,627 → 327,286 B; growth over 9.0.0 340,293 →
  340,952 B. Rewritten at `CHANGELOG.md:99-100`, the N-7 measurement paragraph (packed moved
  with the rest, so it was rewritten too) and FOR THE DRIVER. `CHANGELOG.md` is not in the
  pack, so its own edit does not move the figure.
- **19** — the three lines under _Battery · receipt_ above: prettier README pass, receipt
  `seats:60 … drift:0 … violations:0` unchanged, verifier roster arm pass then the expected
  `G-BUNDLE-RATCHET` stop at `2890330 > 2562566`.

**Witnesses re-run** (`R-cure1-targeted.log`): `public-surface.spec.ts`,
`design/plate-register`, `components/status-dot.contract`, `design/token-bridges`,
`components/a11y/coarse-target`, `components/custom/blob/gl-excise`,
`gates/orphan-css-partial` → `Test Files 7 passed (7)` · `Tests 137 passed | 1 expected fail
(138)` — identical to the pre-cure run.

**Files touched this round**: `MIGRATION.md`, `CHANGELOG.md`,
`docs/tranches/BK/execution/2026-09-22-register-wave/R/RECORD.md` (README.md untouched; the
driver's pathspec list above is unchanged).
