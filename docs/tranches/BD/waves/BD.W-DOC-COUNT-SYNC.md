# BD.W-DOC-COUNT-SYNC — re-sync every CLAUDE.md numeric structure claim to disk + extend the structure-sync gate to the ui-dir / JS-subpath / composables-sub-tree counts

- **Band:** 7 (CLAUDE.md coherence) · **Source dim:** CMD · **BUILDS** (a `scripts/` gate widen, not pure doc).
- **One-line goal:** Re-sync the four drifted numeric structure claims in CLAUDE.md to disk truth AND extend `proof:claude-structure-sync` to guard the `ui/`-dir count, the JS-subpath count, and the composables-sub-tree count (today only the `custom/` block is gated) — DERIVED-vs-actual, never a frozen literal — so the BC cut's count-drift cannot silently recur.

---

## 1. Band + goal

Band 7 is the doc-resync band: CLAUDE.md is the structural map a fresh agent reads FIRST to route to a component. The BC cut shipped 2 new `ui/` dirs (`drawer/`, `focus-scope/`), ~21 new subpaths, and 2 new composables sub-trees (`virtual/`, plus the post-AU `color/`/`context/` already present), and every prose count trails disk. The `custom/` count (49) is correct ONLY because BA.W-HYGIENE built `proof:claude-structure-sync` to gate it; the three parallel counts have NO gate and have drifted by 1 / 18+ / 2. This wave re-syncs the prose AND extends the existing gate so the three un-gated counts are now DERIVED-checked exactly the way `custom/` is.

## 2. Starting state — the exact on-disk reality (VERIFIED by reading)

**The drifted prose claims in CLAUDE.md (all four read + counted):**

- **CLAUDE.md:54** — `│   ├── ui/  # 41 shadcn-vue base component packages + _shared (reka-ui)—42 dirs total`.
  Disk: `ls -d src/components/ui/*/ | wc -l` = **43** (verified). The 43 dirs: `_shared accordion alert avatar badge button card carousel checkbox collapsible combobox command context-menu data-table dialog drawer dropdown-menu focus-scope hover-card input label metric-pill multi-select notification number-field popover progress radio-group section select separator sheet skeleton slider switch table tabs tags-input textarea toast toggle-group toggle tooltip`. The "42 dirs total" trails by 1 (`drawer/` + `focus-scope/` landed since; `_shared` is +1 of the 42 "packages"). The "41 … packages + _shared" phrasing also needs the count re-derived: 43 dirs total = 42 packages + `_shared`.

- **CLAUDE.md:420** — `glass-ui ships **68 flat JS subpaths** … **73 entries total** … the gate is the source of truth on the exact count: **72 JS subpath exports** at HEAD`.
  Disk: `package.json` exports keys = **96 total** (verified `node -e`); excluding the 6 CSS/font entries (`./styles`, `./styles/critical`, `./styles/deferred`, `./styles/fonts`, `./styles.css`, `./fonts/*`) + the `.` root → **89 JS subpath exports** (the count `proof:subpath-enumeration`'s `jsSubpathExports()` computes: `key !== "."`, no glob, `import` matches `^\./dist/(.+)\.js$`). So "68 flat JS subpaths" trails by 21, "73 entries total" trails by 23 (real total 96), "72 JS subpath exports at HEAD" trails by 17 (real 89). The §420 prose itself ALREADY self-describes this drift ("the prose figure here trails the gate when an out-of-bound subpath is added") — but the GATE it cites (`proof:subpath-enumeration`) never reads CLAUDE.md, so the trailing is never machine-caught.

- **CLAUDE.md:915** — `The dist is a **76-entry per-subpath split**` and **CLAUDE.md:935** — `the **76-entry split** makes it unnecessary`. Two instances of "76-entry", real JS-subpath count = 89.

- **CLAUDE.md:164** — `composables/  # v1.0 public composables—**9 coherent sub-trees**` and **CLAUDE.md:198** — `index.ts … re-exports all **8 sub-trees**`.
  Disk: `ls -d src/composables/*/ | wc -l` = **11** (verified): `color context dark dom glass keyboard motion reactive sidebar sortable virtual`. "9 coherent sub-trees" trails by 2; "8 sub-trees" trails by 3. (Note the :164 "9" and :198 "8" are ALSO internally inconsistent — the same doc gives two figures for the same set.)

**The gate today (`scripts/proof-claude-structure-sync.mjs`, read in full):**

- It parses ONLY the `custom/` block. `parseDoc()` (`:73-100`) finds the header line matching `/^│\s+├──\s+custom\/\s+#.*custom package dirs/` (`:76-78`), extracts `declaredCount` from `/#\s*(\d+)\s+custom package dirs/` (`:82`), and walks DIRECT-CHILD dir lines via `/^│\s+│\s+├──\s+([a-z0-9][a-z0-9-]*)\/(?:\s|$)/` (`:96`).
- It asserts (a) SET EQUALITY both directions vs `diskDirs()` (`readdirSync(CUSTOM_DIR)` filtered to directories, `:61-66`) — a dir on disk missing from doc REDs, a dir in doc absent from disk REDs (`:120-134`); and (b) `declaredCount === disk.length` — DERIVED, not a literal "33" (`:136-144`, the explicit header-spec discipline at `:16-19`).
- It has NO ui-dir / subpath / composables-tree arm (grep clean — only `custom/`).
- It writes a byte-stable artefact via `gate-output.mjs` (`writeGateArtifact`, `:168-174`), tagged via the sibling-house style. The `[local,ci]` tag set is inherited from the gate register (the gate is device-free).
- It ALSO carries the P-4 untracked-visual-png integrity assert (`:47-57,152-165`) — UNTOUCHED by this wave.

## 3. The build — precisely what changes

**Two coupled halves, both DERIVED-vs-actual (never a frozen literal):**

### (A) The CLAUDE.md prose re-sync (the doc half)

Edit the four claims to disk truth (CLEAN, no alias — MEMORY no-backwards-compat):

- **:54** → `42 packages + _shared (reka-ui)—43 dirs total` (re-derived: 43 dirs = 42 packages + `_shared`; the "41 shadcn-vue base component packages" lead also re-counted to 42, since `drawer/` + `focus-scope/` are packages).
- **:420** → `glass-ui ships **89 flat JS subpaths** … **96 entries total** in package.json exports including the `./` root … the gate is the source of truth: **89 JS subpath exports** at HEAD`. (The self-describing "the prose figure here trails the gate" sentence is REPLACED by a now-accurate figure + the standing cross-reference to `proof:subpath-enumeration` as the live count source — and now ALSO to the extended `proof:claude-structure-sync` arm that machine-checks the prose.)
- **:915** + **:935** → `89-entry per-subpath split` (×2).
- **:164** → `**11 coherent sub-trees**`; **:198** → `re-exports all **11 sub-trees**` (the two figures reconciled to ONE — 11 — fixing both the drift AND the :164/:198 internal inconsistency).

The COUNTS are re-derived from disk at write-time; the wave records the exact derivation (43 ui dirs, 89 JS subpaths, 11 composables sub-trees) so a reviewer can re-run the three `ls`/`node -e` probes and confirm.

### (B) The gate extension (the BUILD half — `scripts/proof-claude-structure-sync.mjs`)

Extend the gate with THREE new DERIVED arms, mirroring the `custom/` arm's shape EXACTLY (the `:11-23` header spec, the `:136-144` DERIVED-not-frozen discipline):

1. **UI-DIR-COUNT arm.** Parse the §Structure `ui/` header line (`/^│\s+├──\s+ui\/\s+#.*\b(\d+)\s+dirs total/` — the new "43 dirs total" form) and assert `declaredUiCount === diskUiDirs().length`, where `diskUiDirs()` = `readdirSync(resolve(ROOT,"src/components/ui"))` filtered to directories. DERIVED — a new ui/ dir must re-sync the count, never green a frozen "43".

2. **JS-SUBPATH-COUNT arm.** Parse the §Subpath-surface prose claim (`/\*\*(\d+) flat JS subpaths\*\*/` — the "**89 flat JS subpaths**" form at :420) and assert `declaredSubpathCount === jsSubpathCount(pkg)`, where `jsSubpathCount` REUSES `proof-subpath-enumeration.mjs`'s exported `jsSubpathExports(pkg).size` (IMPORT it — ONE source of truth on the count, never a second hand-rolled counter; the gate already exports `jsSubpathExports` at `:49`). DERIVED — a new subpath must re-sync the prose. (The "96 entries total" and "89-entry split" figures are ALSO parsed + asserted as secondary derived facts: total = `Object.keys(pkg.exports).length`; split = the same `jsSubpathExports` size.)

3. **COMPOSABLES-SUB-TREE arm.** Parse the §Structure `composables/` header (`/^├──\s+composables\/\s+#.*\b(\d+)\s+coherent sub-trees/` — the "**11 coherent sub-trees**" form at :164) AND the barrel-comment claim (`/re-exports all (\d+) sub-trees/` at :198) and assert BOTH equal `diskComposablesDirs().length` (`readdirSync(resolve(ROOT,"src/composables"))` filtered to directories) — closing the :164/:198 internal-inconsistency class (the two figures MUST now agree AND match disk).

Each arm pushes a violation in the existing `violations[]` accumulator + records its facts in the `facts` object (the artefact shape is preserved — additive keys: `uiDiskCount`/`declaredUiCount`, `subpathCount`/`declaredSubpathCount`, `composablesDiskCount`/`declaredComposablesCount`). The console summary gains three lines mirroring `:177-180`.

**No new gate** — this is an in-place extension of the SAME `proof:claude-structure-sync` (the BA.W-HYGIENE precedent: extend-in-place, no parallel gate). The `custom/` arm + the P-4 png arm are byte-untouched.

## 4. The gate — born-RED → GREEN design

The gate IS `proof:claude-structure-sync`, extended. The clauses:

- **Existing (untouched):** the `custom/` set-equality both-directions + `declaredCount === disk.length` (43) + the P-4 untracked-png assert. These stay GREEN.
- **New SS-UI:** `declaredUiCount === diskUiDirs().length`. **Born-RED on HEAD** (doc says "42 dirs total", disk = 43) → GREEN after the :54 re-sync.
- **New SS-SUBPATH:** `declaredSubpathCount === jsSubpathExports(pkg).size`. **Born-RED on HEAD** (doc says "68 flat JS subpaths" / "72 JS subpath exports", disk = 89) → GREEN after the :420 re-sync. (Secondary: "73 entries total" vs 96, "76-entry split" ×2 vs 89.)
- **New SS-COMPOSABLES:** `declaredComposablesCount === diskComposablesDirs().length` AND the :164 figure === the :198 figure. **Born-RED on HEAD** (doc says "9" + "8", disk = 11) → GREEN after the :164/:198 re-sync.

**The self-test bite (the planted-defect that MUST red):** the gate's unit fixture (or a synthetic-stale harness mirroring the gate's own pattern) feeds a CLAUDE.md copy with a re-frozen literal — e.g. the doc says "**89 flat JS subpaths**" but a synthetic 90th subpath is added to the fixture `pkg.exports` → the SS-SUBPATH arm MUST flag (proving the count is DERIVED, not a frozen "89" greened forever). Mirror the existing-gate `custom/` self-test discipline: a planted ui-dir/subpath/composables-dir drift in BOTH directions reds. The DERIVED-not-frozen fence is the load-bearing self-test (the CANDIDATE-WAVES.md DERIVED-NOT-FROZEN FENCE :274).

**Born-RED proof on the CURRENT tree:** running the extended gate at HEAD (before the :54/:164/:198/:420 edits) reds on all three new arms (42≠43, "9"/"8"≠11, "68"/"72"≠89) — a real bar, not a vacuous green.

## 5. Paint verification — the device-free assertion (no paint)

This is a DOC + GATE wave — **zero pixels change** (BB inv-4: a doc-and-gate wave changes ZERO paint, so it earns NO `proof:ba-gestalt` verdict — the W-PRUNE-CONSOLIDATE / W-NDA-DECIDE precedent). The binding verification is the device-free gate run:

- The extended `proof:claude-structure-sync` is **born-RED on HEAD** (the three new arms flag the drift) and **GREEN after the build** (prose re-synced + gate extended), on `[local,ci]` (device-free — no browser, no demo, no GPU).
- The DERIVED-not-frozen self-test bite proves the arms cannot be gamed by re-freezing a literal.
- A reviewer re-runs the three disk probes (`ls -d src/components/ui/*/ | wc -l` = 43; `node -e jsSubpathExports` = 89; `ls -d src/composables/*/ | wc -l` = 11) and confirms the prose matches.

The BC anti-disease law (no source-green close) is satisfied by construction: the gate is the binding truth for a count-doc wave (there is no painted surface to capture — the "paint" of a structure-ledger is the count itself, machine-checked).

## 6. Fences + risks

- **DERIVED-NOT-FROZEN (load-bearing).** Each new arm MUST be `declared === disk-derived`, never a literal compare — else the gate greens a frozen number and the drift re-opens the moment the next dir/subpath lands. Mirror the `:136-144` `custom/` discipline + the `:16-19` header spec verbatim.
- **ONE count source.** The SS-SUBPATH arm IMPORTS `jsSubpathExports` from `proof-subpath-enumeration.mjs` (the gate already exports it at `:49`) — it does NOT re-roll a second subpath counter (a fork would drift from the enumeration gate; the no-second-engine discipline). The two gates share the ONE counter.
- **PARSE-ANCHOR fragility.** The new regexes must match the EXACT re-synced prose form (e.g. "43 dirs total", "**89 flat JS subpaths**", "**11 coherent sub-trees**"). If a future edit re-words the line, the parse-anchor drift is caught by the gate's own not-found violation (mirroring `:115-118` — a not-found header REDs, never silently passes). Record the exact expected forms in the gate header comment.
- **NO custom/ regression.** The `custom/` arm + the P-4 png arm are byte-untouched; `facts` keys are ADDITIVE (the artefact shape stays parseable by any consumer reading `diskCount`/`declaredCount`).
- **The :420 self-describing sentence.** The "the prose figure here trails the gate" caveat is REMOVED (it was the symptom of the un-gated drift; now the prose is gate-checked, so the caveat is false — a now-accurate figure + the standing cross-reference replaces it). Do NOT leave the stale caveat beside a now-gated number.
- **No-silent-drop (CMD Class H).** This wave discharges FOLD-LEDGER Class H row 1 ("ui/ 42 dirs (disk 43) + 68/76/72 subpaths (disk 89) + 9/8 sub-trees (disk 11)"). The FOLD-LEDGER + CANDIDATE-WAVES summary docs are re-synced to the gate-canonical **89** (the JS-subpath count excluding the `./` root: 96 export keys − 1 root − 6 CSS/font = 89; a "90" would wrongly include the root). The ledger and the prose now agree on the true number — DERIVED, not frozen.
