# glass-ui → bbnf-lang—the 9.0.0 consumer addendum (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK row #76 (W-CONSUMER-BAND) · **date** 2026-09-17 · **spec of record**
`docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76) ·
**warrant** `MIGRATION.md` §9.0.0's dated bracket ("the edge routes to the #76 band for its
own relay addendum") · **precedent** the #85 outbound form (the nine 8.0.0 addenda at
`docs/tranches/BJ/coordination/glass-outbound-2026-08-09-*`).

Consumer-updates ruling: glass-ui 9.0.0 is published (`v9.0.0` at `d4f7b24f`, provenance
run 33273556530, `latest` on the registry). bbnf-lang updates via a marked addendum in ITS
tranche. **No edits were made in bbnf-lang.** Repo state at the census:
`playground/package.json:13` `"@mkbabb/glass-ui": "^3.0.0"`—a stale-major pin; 9.0.0
does not satisfy `^3`, so nothing below breaks today. It fires at re-pin.

bbnf-lang rode the constellation-remainder page at 8.0.0 (one edge: `./controls` →
`./dark-mode-toggle`). This is its first addendum of its own, because 9.0.0 removes a
subpath only bbnf-lang and value.js's demo tree ever imported.

---

## 1 · `./search`—REMOVED, no replacement (1 file, 2 lines)

`MIGRATION.md` §9.0.0, "The `./search` subpath is removed, and this one takes the room with
the door" (landed `76b594c8`, BK #42 W-SEARCH):

- `playground/src/components/docs/DocsSidebar.vue:4`—`import { FuzzySearch, useFuzzySearch } from "@mkbabb/glass-ui/search";`
- `playground/src/components/docs/DocsSidebar.vue:5`—`import type { SearchableItem } from "@mkbabb/glass-ui/search";`

The subpath is gone and nothing republishes its names (per-tag: present at v3.0.0 /
v7.0.0 / v8.0.0, absent at v9.0.0; no `dist/search.js`). The fuzzy engine is
ENGINE-INTERNAL (`src/composables/search/`, ruled ⊕⁵ SE-4)—it serves the library's own
dock search and is not a public surface. `SearchBar` was deleted with its CVA; the
`.input-bar` recipe on `./styles` (which survives untouched) is the paint that was always
under it. `SearchableItem` and every other `/search` type die with the door.

The repair is yours and is one import statement: type your own items and bring your own
fuzzy matcher (or the browser's), keeping `.input-bar` for the paint.

## 2 · What survives in the same file—untouched

- `playground/src/components/docs/DocsSidebar.vue:6`—`import { buildTreeIndex, useScrollTracker } from "@mkbabb/glass-ui/sidebar";`
- `playground/src/components/docs/DocsSidebar.vue:7`—`import type { SidebarSection } from "@mkbabb/glass-ui/sidebar";`

`./sidebar` is in the 68-key 9.0.0 export map and ships `dist/sidebar.js`. Nothing to do.

## 3 · Zero-classes, stated

`./canvas` 0 · `./dropdown-menu` 0 · `./forms` 0 · `./controls` 1 (the 8.0.0 row, unchanged
—`NavBar.vue:6` → `./dark-mode-toggle`) · `./toggle-chip` 0 · grain 0 · TagsInput 0.
Beyond the two lines above the 9.0.0 export-map diff adds no edge for bbnf-lang; the
26-edge subpath spread banked at the 8.0.0 remainder page is the adopt's own sweep across
six majors (the stale pin is the row).

## 4 · One token you read that 9.0.0 no longer declares

`playground/src/components/landing/CodeCardFan.vue:68` reads `--ease-spring`. It left the
published `@theme` roster between 7.0.0 and 9.0.0 with no migration row (one of thirteen;
the table lands in `MIGRATION.md` with the O-20 cure wave). At `^3.0.0` it still resolves
for you; at the re-pin the read computes to nothing unless you carry the value locally or
re-point to the surviving spring rungs the table names.

## Sum check

"bbnf-lang: `./search` 1 file × 2 lines (1 value import + 1 type import) = the FIFTH
constellation edge the batch-close audit found (`MIGRATION.md` §9.0.0 bracket) ✓ ·
`./sidebar` in the same file survives ✓ · token reads: `--ease-spring` ×1 ✓".

## Owed back to glass-ui

Nothing blocking; breaks beyond these rows reply on this thread → #76's routed table.
