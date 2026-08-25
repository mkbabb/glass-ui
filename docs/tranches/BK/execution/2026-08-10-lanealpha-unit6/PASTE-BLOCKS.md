# LANE α — UNIT 6 (α4 · #42 W-SEARCH) · PASTE-BLOCKS

Literal blocks for the driver. `⊕ⁿ` and `<SHA>` are placeholders the driver fills at the
commit; nothing here invents either.

---

## 1 · COMMIT MESSAGE

```
refactor(search): land BK #42 W-SEARCH α4 — the chrome deleted with its relay, the
engine interned, and ./search cut at this commit

SearchBar DELETE-with-relay under Ruling 1 (TERMINAL-ROSTER:437 — existence ⇒ relay,
never ⇒ KEEP): four value.js edges named, all demo-side, one repo, ^7.0.0. The fuzzy
engine it was parked over moves to src/composables/search/ as ENGINE-INTERNAL per
TR:192 ⊕⁵ SE-4, with COMPOSABLE_CLASS.search = "INTERNAL" proven born-RED against the
fail-closed classifier (row removed → unclassified:["search"] → libraryEntryMap throws).

./search CUT at this unit's own commit under the driver's given word: regen-exports
drops=1 adds=0 targetMismatch=0, the one drop is ./search, package.json diff is 7
deletions and zero insertions, EXACT REPRODUCTION 68/68. The cut is TOTAL, not a
narrowing — the root barrel never carried SearchBar or any fuzzy name, so ./search was
the only door.

Beyond the charter's seven items and declared as such: the matcher REPAIR that CWT-2
§SEARCH makes this row's amended ground for SPLIT-not-DELETE. scoreEntry used best=0 as
both the not-found sentinel and a score floor, so the unbounded -0.1/excess-char term
made a present subsequence vanish at text length 11/72/133/255 for 1/2/3/5-char queries.
Presence and rank are separated; born-RED 2 of 4 arms against git-archived bytes, the
other two reported as guards rather than dressed up.

G-OVERFIT caught the orphan the deletion created — controlSizeClass, whose only call
site in the tree was SearchBar.vue:4 — and it is deleted with the table and re-export
CWT-2 had already listed. The --control-pill-h/-text CSS seams are untouched and still
read with fallbacks.

vue-tsc 0 · battery 2108 passed | 10 xf, zero α-owned failures (the 2 REDs are the
pre-named stale gitignored dist artifacts, α-caused, discharged at the batch close) ·
receipt seats:60 violations:0 BYTE-IDENTICAL · G-BUNDLE-RATCHET RED BY ROUTE.

Record: docs/tranches/BK/execution/2026-08-10-lanealpha-unit6/RECORD.md
```

---

## 2 · THE #76 RELAY ADDENDUM — AUTHORED HERE, NOT WRITTEN TO THE LEDGER

Per the charter: **do NOT write the #76 ledger file.** This block is the addendum text;
it rides the α5 `#76`-tail's single ledger write.

```md
### [2026-08-25 · BK #42 W-SEARCH] `SearchBar` DELETE-with-relay — value.js

**DISPOSITION:** DELETED under **Ruling 1** (`TERMINAL-ROSTER.md:437` — *existence ⇒
relay, never ⇒ KEEP*). The consumer edges below are the RELAY, never a veto; the
consumer updates at its own bump under the consumer-updates ruling.

**THE WALK — re-verified on disk at the cut, read-only, zero sibling writes:**

| repo | file:line | edge | pin |
|---|---|---|---|
| value.js | `demo/palettes/BrowsePane.vue:195` | `import { SearchBar } from "@mkbabb/glass-ui/search"` | `^7.0.0` |
| value.js | `demo/palettes/PalettesPane.vue:149` | same | `^7.0.0` |
| value.js | `demo/palettes/admin/AdminPane.vue:87` | same | `^7.0.0` |
| value.js | `demo/palettes/browser/slug/PaletteSlugBar.vue:132` | same (+ `InstanceType<typeof SearchBar>` at `:166`) | `^7.0.0` |

**TWO NARROWINGS on the banked census, both measured rather than assumed — state them,
because a relay that overstates its reach teaches the consumer to discount the next one:**

1. **All four edges are in value.js's own `demo/` tree, not its published `src/`.**
   `grep -rn "SearchBar" ~/Programming/value.js/src` → **zero hits**. Nothing value.js
   ships to its own consumers is touched.
2. **The three CSS/selector sites banked as relay members are NOT AFFECTED.**
   `demo/styles/utils.css:152` (`.search-seated .input-bar-field`),
   `PaletteRenameInput.vue:4,15`, `e2e/smoke/oracles/o7-card-census.spec.ts:153` all
   read **`.input-bar` / `.input-bar-field`** — the RECIPE, which lives in
   `src/styles/utilities/components.css`, ships on `./styles`, and **SURVIVES this cut
   untouched**. They were banked on the reasonable assumption that the chrome owned its
   own class; it never did (CWT-2 D8: *"`components/search/` holds 0 CSS bytes"*).

**MIGRATION — one import statement per file, and the chrome does not come back.**
`./search` is CUT; there is no successor component and no alias. `SearchBar` was a
`<div>` root wrapping a `<Search>` glyph, an `<input type="search">` and a slot, over the
`.input-bar` recipe. **The recipe is the migration**: compose it directly, exactly as
glass-ui's own `demo/stories/dock/dock-search.vue` and value.js's own
`PaletteRenameInput.vue` already do —

```vue
<label class="input-bar" data-surface="glass">
  <Search class="size-4 shrink-0 text-muted-foreground" aria-hidden="true" />
  <input v-model="query" type="text" class="input-bar-field" placeholder="…" />
</label>
```

Three props have no successor and their removal is not a regression: `variant`
(`inline` ≡ `floating` byte-for-byte, `bare` an unpatchable prefix trap), `surface`
(three values, one effect, and a comment asserting the opposite), and `size` (the
`controlSizeClass` emitter, whose `md` rung emitted the empty string — set
`--control-pill-h` / `--control-pill-text` directly; both seams are live and read with
fallbacks). `defineExpose({ inputRef })` becomes a plain `ref` on the `<input>` —
`PaletteSlugBar.vue:166`'s `InstanceType<typeof SearchBar>` is the one line that needs a
type change rather than an import change.

**THE ENGINE IS NOT GONE, it is INTERNAL.** `useFuzzySearch` / `buildIndex` /
`searchIndex` / `fuzzyMatch` moved to `src/composables/search/` and are no longer
published (TR:192 ⊕⁵ SE-4 — *ENGINE-INTERNAL, no exported `SearchBar` chrome*). A
consumer that wants ranked fuzzy results takes them through **`useDockSearch`** on
`./dock`, which is the seam the ruling makes the engine's one public expression. No
value.js edge consumes the engine today, so this affects none of the four files above.

**BONUS, unasked-for and worth the consumer knowing:** the matcher shipped a defect that
silently dropped present matches on any field longer than ~11 characters. It is repaired
in the same commit, so a consumer adopting through `useDockSearch` gets strictly more
results than it did on `^7.0.0`, not fewer.
```

---

## 3 · ROUTED — FALSE PROSE THIS COMMIT CREATED, OUTSIDE α's FENCE

Five comment sites became FALSE at this commit. All are comments — nothing paints or
computes differently — but each names a symbol that no longer exists. For whichever lane
owns `src/styles/**` and `demo/demo.css`.

```
src/styles/utilities/components.css:29   "`controlSizeClass(size)` (_shared/control.ts) re-points"
src/styles/utilities/components.css:31   "so the SearchBar/FuzzySearch `size` prop retunes the field height WITHOUT a"
src/styles/utilities/components.css:57   "`controlSizeClass(\"sm\")` rung re-points it to `--control-text-sm` (quieter);"
src/styles/glass/control-surfaces.css:23 "control keeps its default size. The shared `controlSizeClass(size)`"
demo/demo.css:88                         "`controlSizeClass` data seam) that the published library ships via"
```

**The truthing, ready to paste** (the SEAMS survive; only the TS emitter died):

```
[2026-08-25 · BK #42 W-SEARCH] ~~`controlSizeClass(size)`~~ — the emitter is DELETED
(its only call site in the tree was `SearchBar.vue`, deleted at #42; `G-OVERFIT`'s
EXPORT-REACH arm named it the same hour). THE SEAM IS UNCHANGED and this rule still
reads it: set `--control-pill-h` / `--control-pill-text` on the element and the
fallback below yields to it. What died is a Tailwind class-string builder whose `md`
rung emitted the empty string, not the size axis.
```

Also routed, measured-dead and deliberately NOT struck by adjacency (struck-by-adjacency
is how scope leaks — unit 5's `--dock-morph-max-stretch` precedent):

```
src/styles/tokens/sizing.css:70   --search-icon-size  — lost its LAST reader at this
                                   commit (SearchBar.vue was the sole one)
src/styles/tokens/sizing.css:71-73 --search-button-size · --search-result-text ·
                                   --search-result-text-secondary — ZERO readers
                                   ALREADY, before this unit. Not #42's doing.
```

---

## 4 · OBSERVED — A GAP IN β2's LANDED ACT (not edited here)

`tests/public-surface.spec.ts:509-527` is the retired-subpath falsifier: every cut key
must be absent from **both** `exports` and `typesVersions`. This unit added `search` to
it. **`canvas` is missing** — #21 (β2, `96f0f257`) cut `./canvas` and did not add its
row, so that cut is unproven by the one gate built to prove exactly this class.

One word for the owning lane. Not taken here: editing a sibling lane's proof is not a
courtesy.

```
            "metric-stack",
+           // [<date> · BK #21 W-DAG-REDUCE] `canvas` — the falsifier the cut owed.
+           "canvas",
            // [2026-08-25 · BK #42 W-SEARCH] `search` — …
```

---

## 5 · VERIFY LINES — verbatim, REAL exit codes off the process

```
$ npx vue-tsc --noEmit > /tmp/bk-a4-tsc2.txt 2>&1; echo $?
0                                        (output file: 0 bytes — zero diagnostics)

$ npx vitest run > /tmp/bk-a4-battery2.txt 2>&1; echo $?
1
 Test Files  2 failed | 222 passed (224)
      Tests  2 failed | 2108 passed | 10 expected fail (2120)
 FAIL tests/public-surface.spec.ts:784   — dist ships components/dock/styles/overflow.css
                                           where source ships run.css   [α6-caused, driver]
 FAIL tests/gates/boot-graph.test.ts     — dist-demo STALE               [α-caused, driver]
 α4-OWNED FAILURES: ZERO

$ npx vitest run tests/composables/search/ tests/components/custom/dock/ \
      tests/styles/ tests/gates/overfit-structure.test.ts > … 2>&1; echo $?
0
 Test Files  42 passed (42)
      Tests  568 passed | 6 expected fail (574)

$ node scripts/gate-register.mjs; echo $?
0
seats:60 active:46 reserved:5 worstCase:51 remaining:9 external:11 bound:13 armOnly:2
unbound:45 drift:0 rosterSha256:282d05cf violations:0
  → diff vs this seat's own step-0 capture: BYTE-IDENTICAL. Nothing minted.

$ node scripts/regen-exports.mjs; echo $?
0
[component]  disk=56  PUBLISH=48 INTERNAL=8   unclassified=0 stale=0
[composable] disk=10  PUBLISH=3  INTERNAL=3 CURATED=4  unclassified=0 stale=0
REGEN: exportKeys 68/68  jsSubpaths=62  drops=0 adds=0 targetMismatch=0 tvDrops=0 tvAdds=0
  >>> EXACT REPRODUCTION: YES

$ node scripts/import-dag.mjs; echo $?
0

G-BUNDLE-RATCHET   RED BY ROUTE — the single batch-close rebind carries β0's +1215 and
                   the driver's −71. verify:package's ratchet arm REDs LAWFULLY.
                   Stated, not papered; NOT re-measured this seat.
```

**The α4 battery delta, derived (§6.1 of the RECORD):** `+4` new arms `−1` `it.each` case
(`subpathRuntimeExports` 55 → 54 rows) = **+3 tests, 0 failures, 0 xfail**. HEAD's
baseline was therefore `2117`; this close is `2120`.
`tests-visual/search-custom.spec.ts`'s deletion moves it by **zero** — Playwright specs
have never been in the vitest battery.

---

## 6 · π — ENQUEUE ONLY, ZERO CAPTURED

No browser was opened by this seat. One NEW cell, owed by this unit's own act; the unit-5
`PI-QUEUE.md` cells carry unchanged.

```
π-SEARCH-ROUTE   /data/search — the REBUILT field. The `.input-bar` recipe
                 hand-composed (light + dark): the plate reads translucent, the glyph
                 rides the field type, the pill is the control rung. Plus the keyboard
                 walk: ArrowDown moves `aria-selected` across the ranked cards and
                 `aria-activedescendant` follows. NOTHING captured this seat.
```

---

## ⊕ⁿ cursor block (paste verbatim, fill n at landing)

[2026-08-25 · driver, at landing — C1 of the adjudicator's four record-vehicle cures:
the block line 3 promised and no section delivered, authored in unit-5's format from
this file's own §1/§5/§6 text.]

```
⊕ⁿ α4 IMPLEMENT (claude-opus-5[1m], 2026-08-25) — #42 W-SEARCH CLOSED at base c1a97a33,
commit <SHA>. Engine → src/composables/search/ (4 files + 3 relocated tests,
ENGINE-INTERNAL per TR:192 ⊕⁵ SE-4); SearchBar/searchVariants/barrel DELETED with relay
(value.js ×4 SFC + 3 CSS + 2 docs edges, Ruling 1 TR:437 — existence ⇒ relay, never ⇒
KEEP; addendum AUTHORED at PASTE-BLOCKS §2, the #76 ledger file untouched, rides α5's
single ledger write); COMPOSABLE_CLASS.search = "INTERNAL" proven born-RED against the
fail-closed classifier (row removed → unclassified:["search"] → libraryEntryMap throws);
useDockSearch re-pointed with bracket; ./search CUT at this unit's own commit under the
driver's given word — package.json exactly 7 deletions / 0 insertions, the root barrel
never carried a fuzzy name so ./search was the only door. BEYOND CHARTER, DECLARED: the
scoreEntry matcher REPAIR (best=0 was both not-found sentinel and score floor, so the
unbounded excess-char term vanished present subsequences at text length 11/72/133/255
for 1/2/3/5-char queries; presence and rank separated; born-RED 2 of 4 arms vs
git-archived bytes, the other two reported as guards not dressed up); G-OVERFIT caught
controlSizeClass orphaned by the deletion (sole call site SearchBar.vue:4) → deleted.
π-SEARCH-ROUTE ENQUEUED, zero captured by any α4 seat.
VERIFY, real exit codes: vue-tsc 0 (0 bytes) · battery EXIT=1, 2 failed | 2108 passed |
10 expected fail (2120), α4-OWNED FAILURES ZERO — both REDs the pre-named α-caused
stale-dist pair, driver's at the batch close · α-slice EXIT=0, 42 files, 568 | 6 xf
(574) · receipt EXIT=0 seats:60 active:46 reserved:5 worstCase:51 remaining:9
external:11 bound:13 armOnly:2 unbound:45 drift:0 rosterSha256:282d05cf violations:0
BYTE-IDENTICAL · regen EXIT=0 EXACT 68/68, drops=1 adds=0 on the cut then exact ·
import-dag EXIT=0 · G-BUNDLE-RATCHET RED BY ROUTE, stated not re-measured.
Adjudicated CURE-REQUIRED on record-vehicle grounds only (C1-C4, zero tree bytes);
cures driver-applied at landing, disclosed in the commit.
```
