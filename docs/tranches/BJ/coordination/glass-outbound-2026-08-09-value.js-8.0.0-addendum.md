# glass-ui → value.js — the 8.0.0 consumer addendum (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK Φ6/7 row #76 (W-CONSUMER-BAND) · **date** 2026-08-09 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76)
+ `:399` §C (value cell `:407`) — full ledger **CWT-3 §4**, cited, never restated ·
**precedent** the #85 outbound form (whose §2 is this repo's easing inbound half, MARKED
ADDENDUM, NOT OPTIONAL — adopt the two together).

Consumer-updates ruling: 8.0.0 is published (`v8.0.0` at `17a11bc5`); value.js updates
via a marked addendum in ITS tranche. **No edits were made in value.js.** Repo state at
the census: branch `tranche-u` · dirty 12 · live tranche **X** (A–X) · `package.json:83`
`"@mkbabb/glass-ui": "^7.0.0"`.

---

## 1 · `./forms` → `./input` (1 module-import edge)

`MIGRATION.md:21` — the four doors are `./input`/`./textarea`/`./checkbox`/`./radio-group`:

- `demo/ui/input/index.ts:1` — `export { Input } from "@mkbabb/glass-ui/forms";` → `./input`

## 2 · `grain` — REMOVED from the whole library (1 prop edge)

- `demo/picker/controls/ComponentSliders/ComponentSliders.vue:29` — `:grain="false"` on
  a glass-ui `<Card>`. Delete the attribute (`MIGRATION.md:440`). Under
  `vueCompilerOptions.checkUnknownProps` a retained `<Card grain>` is a **hard typecheck
  error**; without the flag, a silent no-op.

Homonym/observational hits qualified OUT by the enumerator: `ComponentSliders.vue:10`
(comment) · `demo/styles/shell.css:160` (comment) ·
`e2e/smoke/oracles/o19-netting-luma.spec.ts:23` + `gradient-pixels.ts:43` ("paper-grain"
prose) · `o7-card-census.spec.ts:104/224/234` — the o7 oracle READS `el.dataset.grain`
(observation, not the seam). Forward note on that oracle: at 8.0.0 the `data-grain`
attribute never renders, so its grain column reads `undefined` — re-pin the oracle's
expectation at the adopt rather than reading the absence as a regression.

## 3 · STRING-LITERAL CLASS

**Zero** in this repo (the five constellation blind-spot edges live at atlas-active,
words, speedtest — row66 RECORD §A1).

## 4 · Zero-classes + the peer

dropdown-menu 0 · sheet 0 · dead `./api` 0 · specular 0 · TagsInput 0. The
`vue-component-type-helpers ^3.0.3` peer lands in `peerDependencies` at the adopt.

## Not restated here

The select re-export ×3, easing ×6 (#85 §2 — the live `role` regression, the three
seat-law retirements, `data-testid`→`data-slot`), the `--slider-track-bg` ×4 relay **now
BREAKING at 8.0.0** (the typed track seam landed `abb1eba2`, no alias — o19 A-5), A-16
RTL (consume `dir`/`inverted`), A-18 WatercolorSwatch into #84's indicator slot, A-15
`paintedTintOf` retirement, A-10 `useSliderAnnouncements.ts` deletion at the #35 adopt —
**TERMINAL-ROSTER.md:407 + CWT-3 §4 + the #85 addendum**, cited whole.

## Sum check (cluster D, quoted)

"1+1 = pinned 1+1 ✓".

## Owed back to glass-ui

Nothing blocking; breaks beyond these rows reply on this thread → #76's routed table.

> QUALIFY-OUT (verify pass): 7 files under `docs/tranches/V/megatranche/audit/` import glass-ui subpaths incl. `./dropdown-menu` (`probe-L4-barrel/sub-entry.js:1`) — audit-record fixtures outside the pinned census (not built code); the zero-claim above is for live code only.

---

## 5 · ADDENDUM OF 2026-08-25 — the #42 relay (BK #76 α5, the single ledger write)

Authored at `docs/tranches/BK/execution/2026-08-10-lanealpha-unit6/PASTE-BLOCKS.md`
§2 and landed here verbatim; the α4 seat wrote no ledger byte, per its charter.

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
