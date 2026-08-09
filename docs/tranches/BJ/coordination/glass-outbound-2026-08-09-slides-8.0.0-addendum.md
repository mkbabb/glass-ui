# glass-ui → slides — the 8.0.0 consumer addendum + export-map diff (BK #76 W-CONSUMER-BAND)

**From** glass-ui BK Φ6/7 row #76 (W-CONSUMER-BAND) · **date** 2026-08-09 · **spec of
record** `docs/tranches/BJ/addenda/2026-07-24-refinement/TERMINAL-ROSTER.md:226` (row 76)
+ `:399` §C (slides cell `:408`, slides-k `:415`) — full ledger **CWT-3 §4**, cited,
never restated · **precedent** the #85 outbound form.

The slides 3.13.0→8.0.0 adopt hinge **executes in ITS tranche; glass-ui's duty = marked
addendum + export-map diff** (TR row 76, verbatim). This file is both. **No edits were
made in either slides tree.** Repo state at the census:

| checkout | branch | dirty | live tranche | glass-ui pin |
|---|---|---|---|---|
| `/Users/mkbabb/Programming/slides` | `main` | 0 | N (A–N present) | `"@mkbabb/glass-ui": "3.13.0"` |
| `/Users/mkbabb/Programming/slides-K` (same-origin branch) | `tranche/til-briefing-K` | 0 | K (A–F, K) | `"@mkbabb/glass-ui": "^3.2.0"` |

---

## 1 · Batch-class edges

- **forms ×1 (slides main)** — `/Users/mkbabb/Programming/slides/src/views/DeckGate.vue:5`
  — `import { Input } from "@mkbabb/glass-ui/forms";` → `./input` (`MIGRATION.md:21`;
  the four doors are `./input`/`./textarea`/`./checkbox`/`./radio-group`)
- **dropdown-menu ×1 (slides main)** — `/Users/mkbabb/Programming/slides/src/deck/DeckSettings.vue:8`
  — `} from "@mkbabb/glass-ui/dropdown-menu";` (multi-line: DropdownMenu, …Trigger,
  …Content, …Item, …Sub, …SubTrigger, …SubContent, per the F.W2 migration) → `./menu`;
  all fourteen SFC names UNCHANGED (`MIGRATION.md:20`)
- **forms ×1 (slides-K)** — `/Users/mkbabb/Programming/slides-K/src/deck/DeckGate.vue:5`
  — `import { Input } from "@mkbabb/glass-ui/forms";` → `./input`. slides-K has **no**
  dropdown-menu code edge — its `DeckSettings.vue:3` still uses
  `@mkbabb/glass-ui/popover`; K predates the F.W2 popover→dropdown migration.

## 2 · STRING-LITERAL CLASS (own section)

**Zero breaking literals in either tree.** Non-breaking package-name literals that
survive any subpath reshape, stated so nobody re-counts them: `slides/vite.config.ts:18`
+ `slides-K/vite.config.ts:18` (`if (id.includes("@mkbabb/glass-ui")) return "glass-ui";`)
and `slides/src/styles/index.css:15` (`@source ".../@mkbabb/glass-ui/dist"`).

## 3 · The 3.13.0→8.0.0 EXPORT-MAP DIFF (cluster B, verified against `npm view` + the 8.0.0 `package.json`)

**SURVIVE (9 subpaths in use):** `./constellation` (`src/decks/til-briefing/constellation.ts:40`) ·
`./status-dot` (`SlideXray.vue:3`) · `./fourier-field` (feedback-coder `Slide01.vue:10`,
`Slide05.vue:23`) · `./color` (`Slide01.vue:11`, `Slide05.vue:24`) · `./toggle-group`
(`CodedTurnBank.vue:19`) · `./dialog` (`DeckGate.vue:3`) · `./button` (`DeckGate.vue:4`,
`DeckView.vue:6`) · `./dock` (`DeckView.vue:5`, `DeckSettings.vue:10`) · `./styles`
(`src/styles/index.css:13`).

**BREAK (4 subpaths, 5 edges — in 3.13.0's map, absent from 8.0.0):**

1. `./forms` — `slides/src/views/DeckGate.vue:5` → `./input` (§1)
2. `./dropdown-menu` — `slides/src/deck/DeckSettings.vue:8` → `./menu` (§1)
3. `./controls` — `slides/src/views/HomeView.vue:4` + `slides/src/deck/DeckSettings.vue:9`
   — `import { DarkModeToggle } from "@mkbabb/glass-ui/controls";` → **`./dark-mode-toggle`**
4. `./hover-card` — `slides/src/decks/feedback-coder/components/CodedTurnBank.vue:20`
   — `import { HoverCard, HoverCardTrigger, HoverCardContent } from "@mkbabb/glass-ui/hover-card";`
   — no same-name 8.0.0 key (nearest family: `./popover`/`./menu`); the consumer decides
   the replacement in its tranche.

**HINGE BONUS:** `./deck` EXISTS at 8.0.0 — slides' five comment-class prophecies
("future @mkbabb/glass-ui/deck": `src/deck/useDeck.ts:4`, `DeckSlide.vue:10`,
`DeckPager.vue:15`, `deckKeys.ts:2`, `tests/unit/useDeck.spec.ts:4`) are now
satisfiable. The DECK-RELOCATION 51-row split table (adopt deletes rows 1-7, adopts the
substrate, retires `useCountup` onto AnimatedDigit) is banked at the §C slides cell.

**slides-K (^3.2.0), same-origin:** its `./forms` (§1) + `./controls`
(`HomeView.vue:3`, `DeckSettings.vue:5`) break identically; its `./popover`/`./separator`
(`DeckSettings.vue:3-4`) survive.

## 4 · Zero-classes + the peer

grain 0 · specular 0 · sheet 0 · dead `./api` 0 · TagsInput 0 (family deleted at 8.0.0,
`MIGRATION.md:26-29`; 0 edges constellation-wide). The `^3.0.3`
`vue-component-type-helpers` peer lands at the adopt.

## Not restated here

StatusDot rows, `deck.css` stale selectors, the fourier-field six-row relay, the ⊕⁴ U-15
`--glass-frost` cool root-fork RECONCILE (load-bearing on #22's transmission gate at the
adopt), and DECK-RELOCATION §6.2's dead `variant="hero"`/`variant="final"` FourierField
bindings (`Slide01.vue:33` · `Slide05.vue:43`) — **TERMINAL-ROSTER.md:408 + CWT-3 §4**,
cited whole.

## Sum check (cluster B, quoted)

"slides main: 1 forms + 1 dropdown-menu = 2 = pinned 1+1 ✓ · slides-K: 1 forms =
pinned 1 ✓".

## Owed back to glass-ui

Nothing blocking; breaks beyond these rows reply on this thread → #76's routed table.
