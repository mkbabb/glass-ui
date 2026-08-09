# glass-ui → words — the 8.0.0 consumer addendum (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK Φ6/7 row #76 (W-CONSUMER-BAND) · **date** 2026-08-09 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76)
+ `:399` §C (words cell `:413`) — full ledger **CWT-3 §4**, cited, never restated ·
**precedent** the #85 outbound form.

Consumer-updates ruling: glass-ui 8.0.0 is published (`v8.0.0` at `17a11bc5`); words
updates via a marked addendum in ITS tranche. **No edits were made in words.** Repo
state at the census: `master` · dirty 23 · live tranche **A** (the only letter) ·
`frontend/package.json:19` `"@mkbabb/glass-ui": "^3.0.0"` — a 3.0→8.0 adopt hinge, so
these rows are adopt/migration evidence (✦² carousel KEEP by owner word, A-2 — words'
rows never read as a deletion relay).

---

## 1 · `./forms` → `./input` / `./textarea` (6: 5 module-import + 1 string-literal)

`MIGRATION.md:21` — the four doors are `./input` · `./textarea` · `./checkbox` ·
`./radio-group`; split by component:

- `frontend/src/components/custom/wordlist/WordlistTargetForm.vue:116` — `import { Input } from '@mkbabb/glass-ui/forms';`
- `frontend/src/components/custom/wordlist/modals/CreateWordListModal.vue:219` — `import { Input } from '@mkbabb/glass-ui/forms';`
- `frontend/src/components/custom/wordlist/modals/EditWordNotesModal.vue:47` — `import { Textarea } from '@mkbabb/glass-ui/forms';`
- `frontend/src/components/custom/wordlist/modals/EditWordlistModal.vue:160` — `import { Input, Textarea } from '@mkbabb/glass-ui/forms';`
- `frontend/src/components/custom/search/components/ExpandModal.vue:48` — `import { Textarea } from '@mkbabb/glass-ui/forms';`
- (string-literal, §3) `frontend/vite.config.ts:223`

## 2 · `./dropdown-menu` → `./menu` (5: 4 module-import + 1 string-literal)

One-line specifier edit; the fourteen `DropdownMenu*` SFC names are UNCHANGED
(`MIGRATION.md:20`); `.dropdown-menu__*` / `data-slot` namespaces rename to `.menu__*`
if hand-styled (`MIGRATION.md:35-40`):

- `frontend/src/components/custom/sidebar/SidebarWordListItem.vue:112`
- `frontend/src/components/custom/wordlist/WordlistGrid.vue:108`
- `frontend/src/components/custom/wordlist/WordlistTargetForm.vue:115`
- `frontend/src/components/custom/auth/UserMenu.vue:73`
- (string-literal, §3) `frontend/vite.config.ts:222`

## 3 · STRING-LITERAL CLASS — `vite.config.ts` `optimizeDeps.include` (own section)

Two of the constellation's five blind-spot edges (row66 RECORD §A1) live here; an
include entry on a dead specifier fails the pre-bundle:

- `frontend/vite.config.ts:222` — `'@mkbabb/glass-ui/dropdown-menu',` → `/menu` (block opens `:208`)
- `frontend/vite.config.ts:223` — `'@mkbabb/glass-ui/forms',` → the `/input` + `/textarea` split

Adjacent, found by cluster B outside the pinned totals: the same block literals
`'@mkbabb/glass-ui/confirm-dialog'` at `:218` (plus other subpaths across `:214-229`) —
**`./confirm-dialog` is absent from the 8.0.0 export map** too. The whole include block
gets one sweep against the published key list at the adopt.

## 4 · The new peer

8.0.0 adds `vue-component-type-helpers: ^3.0.3` to `peerDependencies`.

## 5 · Zero-classes, stated

grain 0 · specular 0 · sheet 0 · dead `./api` 0 · TagsInput 0 (the family is deleted at
8.0.0, `MIGRATION.md:26-29`; the constellation-wide census reads 0 edges across all 18
roots — nothing to do, recorded so the zero is measured).

## Not restated here

The words cell's wider surface — carousel KEEP + the three adopt riders
(`CarouselNext/Previous` deleted at `490cc46e`, words `ImageCarousel.vue:87-88` breaks;
the ariaLabel-gated a11y regression; the struck barrel doc), `BouncyToggle` U-11
(migrate to `SegmentedTabs` or record the `^3.0.0` freeze — the adopt addendum decides),
button ×29 / hover-card ×13 / toast ×11 ref-counts — is **TERMINAL-ROSTER.md:413 +
CWT-3 §4**, cited whole. Note for the hinge sweep: `./hover-card` is also absent from
the 8.0.0 map (nearest family `./popover`).

## Sum check (cluster B, quoted)

"words: 6 forms (5 module-import + 1 string-literal) + 5 dropdown-menu (4 module-import
+ 1 string-literal) = 11 = pinned 6+5 ✓" · "string-literal blind-spot: vite.config.ts:222-223
×2 = pinned ×2 ✓".

## Owed back to glass-ui

Nothing blocking; breaks beyond these rows reply on this thread → #76's routed table.
