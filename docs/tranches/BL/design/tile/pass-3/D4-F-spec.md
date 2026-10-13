# D4 · pass 3 · D4-F spec: the anatomy declares the tile

| field | value |
|---|---|
| seat | D4 pass 3, SPEC seat for route D4-F (`#media` / `#meta` decide the tile). It answers the route's open rows (REGISTRY §P2-3.2, 12 rows) with probes on HEAD + floor v2, and specs the route against the fixed 40-row checklist (§P2-6.3). It read no D′ pass-3 file. This is the seat's third sitting: the first two died at the session limit. Sitting 1 left a sketch and a battery read at load 130-470 (`D4-F-spec/sitting-1/`); this sitting re-applied it, revised it once and re-read everything on the final patch |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | detached worktree at `d6f68b88`. The task named `8d911018`; `git diff --stat 8d911018 d6f68b88 -- src package.json tests MIGRATION.md` is empty, and so is `5c4376ff..d6f68b88` (sitting 1's base). `floor-v2.patch` (sha1 `b04a83be`) applied first; `git apply --check` clean |
| patch | `D4-F-spec/route.patch`: the route over HEAD + floor v2. 6 files, +318 / −10, 493 lines, sha1 `b7fd4023`. Every browser cell below was read on builds of sha1 `ea333a12`; the two differ in `MIGRATION.md` only (two detectors corrected after they were tried on keyframes.js, §5), and `src/` and `tests/` are byte-identical between them. `D4-F-spec/probes/mkpatch.sh` regenerates it from a worktree with no git write; applied to a HEAD + floor v2 snapshot it reproduces the worktree byte for byte (`diff -r`, 6/6 files). Sitting 1's patch is `sitting-1/route-r1.patch` (sha1 `a036286b`); what changed is in §1.6 |
| defaults built | every unruled owner question at its P2-5 default: Q-1 (a) 16 px, Q-2 (b) flush (with `plated` one value away), Q-3 the perimeter plus a mark, Q-4 (b), Q-5 (b)+(d), Q-6 (a), Q-7 (a), Q-8 (a), Q-9 (a), Q-10 (b), Q-12 (c). O-87 binds the paint: the route adds no lighting layer |
| harness | H3 `9fd4983bc6b9`, unchanged by this seat; every run JSON carries it. No file under `../harness/` was edited |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)** |
| machine | shared with four other design loops. The 1-min load ran **89 to 252** across the battery, the `dist` cells and the route probes, and **385 to 648** during the last shared probes and the glance pair (another seat's burst), all of which are settled static reads or stills. Each figure below carries its load; every log's first and last lines carry it too. The commit cells ran at a median frame of 8.3-8.4 ms (Chromium) and 17.0 ms (Playwright WebKit), so no commit verdict rests on janky frames. Sitting 1 read the same witnesses at load 130-470 and got the same tally in every cell (§2.2), so no cell here is a load artefact, and no cell was NOT-REPRODUCED |
| records | all under `pass-3/D4-F-spec/`: `route.patch`; `route/` (`route.json`, `migrated.mjs`); the drivers `build-chain-r2.sh` and `run-sitting-2.sh`; the probes `probes/f3.mjs`, `probes/unit-plants.sh`, `probes/mkpatch.sh`; `runs/f3r-src/*.json` (the battery, 27 files) and the probe JSON; `logs/` (every log cited); `shots/` (40 PNG: selected and focused-selected, five sites × light and dark × two engines); `glance-pair/` (Q-2 and Q-3 pairs). `sitting-1/` and `r1/` keep the superseded reads. The worktree and the builds lived under `.claude/worktrees/bl/D4/p3/D4-F-spec/` and the worktree is removed |

Short citations: `Fc` is `../pass-2/D4-F-critique.md`, `Fp` is `../pass-2/D4-F-proto.md`, `FV2` is `FLOOR-V2.md`, `H3` is `H3.md`.

---

## 0 · In brief

1. **The route is now one selector and two slots.** `.toggle-group:has(.toggle-group__item > :is(.toggle-group__media, .toggle-group__meta))` is the only spelling of "is a tile" in the library. It sets floor v2's tile fact (`--selection-tile: flush`) and what only a tile has: the 16 px corner, the column, the pad, the leading and the mark. Everything pass 2 spelled four more times (the row-lock's negation, the perimeter switch, the accessibility exemption, the DEV script) now derives from the fact. A unit pins the one spelling and fails a second (R-10).
2. **The migrated consumer passes every gating cell of T-1..T-8 in both engines except one named class**: C1's one-row radio pills on T-3, 3 cells per engine, which is Q-10 at its default (b). Migrated arm, Chromium · Playwright WebKit: T-1 15/15 · 18/18, T-3 40/43 · 40/43, T-4 24/24 · 24/24, T-5 38/38 · 38/38, T-6 33/33 · 33/33, T-7 24/24 · 24/24, T-8 27/27 across both; T-2 40/40 · 40/40 and CANON 3/3 · 3/3 on the library arm (§2.2).
3. **Three rows closed in the route itself, not by the floor.**
   - T-5: FadingScroll took a tab stop of its own in front of every set it held. It now takes one only while nothing inside it is a tab stop. `specimen-migrated` and `strip-migrated` read 1 stop in both engines (§1.4).
   - H3-12: a consumer `role` and `tabindex` on an item no longer outrank the engine's. `preset-consumer-aria` reads `radiogroup` / `radio` and 1 stop, where the floor read `option` and 4 (§1.3).
   - H3-7: the selected perimeter now fills the padding box (inset 0, not −1 px), so paint containment cannot halve it. Every migrated scene reads 2.00 px on all four sides, uncontained and under `content-visibility: auto` (§1.2).
4. **The `sm` mark is built, with a room gate.** The check now paints at every size on any tile at least 3.5 marks wide. A 40 px glyph tile (V1) carries none: there the disc sat on the glyph's end point (§1.2, §2.4).
5. **Six checklist rows stay open, all six on an owner input, none on a missing primitive**: T-3 and E-2 (C1, Q-10), R-1 and R-8 (the unmigrated consumer and the refusal on `dist`, Q-5), G (Q-2, Q-3), E-4 (Safari). Each is built at its default and reported in §4, not claimed. The other 34 rows read green on their shared instrument in this sitting; the prototype and the critic re-read them.
6. **What the spec does not hide** (§6): the unmigrated K2 stage is still clipped by the 36 px pill on 8/8 items with no production signal; a flush tile's hover plate is a larger step than the selected tint; a focused selected tile still shows two outlines, now 3 px apart; a tile group nested inside a pill group turns the outer group into tiles; and a label child that sets its own `display: block` still stacks a second row inside a pill, unnamed (the shared `late` probe, 2/6; R-13).

---

## 1 · The mechanism

Line numbers are in the patched tree (HEAD + `floor-v2.patch` + `route.patch`).

### 1.1 · Anatomy: `src/components/toggle-group/ToggleGroupItem.vue`

- `:43`, `:45` `defineSlots` gains `media` (a row above the label: a glyph, a thumbnail, a stage) and `meta` (a row below it: a readout, a description). No prop. No `shape`.
- `:181`, `:183`: each slot renders only when filled, in a library-marked row, `<span class="toggle-group__media">` and `<span class="toggle-group__meta">`. The default slot stays the label.
- Nothing else in the component knows about tiles. The class list (`:170`), the engine, the commit stamp (`:175`, floor v2's) and the ARIA are the same element for a pill and a tile (design-idioms §9: one item, two content models).

### 1.2 · The tile rule: `src/components/toggle-group/styles.css`

- `:269` the one selector. It matches a group that holds an item whose **direct child** is a library row. Pass 2's selector was a bare descendant match plus a second, per-item form; the child combinator keeps a row inside slotted content from counting, and the per-item form is gone (an item outside a group has no selection, `FV2` FV2-5).
- `:270` `--selection-tile: flush`. This is the whole of what the route tells the floor. Derived from it, with no line of the route's:
  - the pill's one-row law stands down (`:124`, `@container style(--selection-tile: none)`);
  - the selected perimeter switches on (`:181-185`);
  - the plate goes flush at rest (`glass/control-surfaces.css:100-106`);
  - the development name for a second row stands down (`ToggleGroupItem.vue:125`).
- `:271` `align-items: stretch` on the group: one height per row, so a one-row option in a tile group is a shorter card's worth of content at the card's corner, never a stadium beside a card (the mixed grid, §2.5).
- `:273-284` the item: `border-radius: var(--radius-field)` (Q-1 (a)), a start-aligned column, `gap: 0.25rem`, body leading, `padding-block: 0.625rem`, `text-align: start`, and the mark's two sizes (`--selection-mark` 1.125 rem, 0.875 rem at `sm`, `:286-289`).
- `:291-331` **the mark**, on `::after` (the perimeter holds `::before`): a disc of `--selection-edge` with a check cut through it by a two-layer mask (`mask-composite: exclude`), in the block-start / inline-end corner. Opacity 0 → 1 on the engage clock and `scale` 0.4 → 1 on `--spring-press` when the item turns on. It is the carrier that is neither a colour nor an outline.
  - **The room gate** (`:308-312`): `inline-size: min(var(--selection-mark), max(0px, (100% − 3.5 × var(--selection-mark)) × 9999))` with `aspect-ratio: 1`. A percentage on an absolutely positioned pseudo-element resolves against the tile's own padding box, so the mark is its nominal size where the tile is at least 3.5 marks wide and 0 below that. Pure CSS, no container query (PORTFOLIO §2.1: a size container on the item would collapse it).
  - Forced colours (`:425-428`): `forced-color-adjust: none; background: Highlight`, because a mask over a fill would be repainted as Canvas.
- `:337-344` the rows: `.toggle-group__media` is a flex row that spans the tile; `.toggle-group__meta` drops to weight 400. Both inherit the item's ink (`--selection-ink`, floor v2 FV-4), so a stroke of `currentColor` follows the state with no consumer `[data-state]` rule (X-2).
- `:153-156` **the perimeter's inset** moves from −1 px to 0 (the one floor line the route edits). The floor's layer straddled the item's 1 px border; `content-visibility: auto` clips paint to the padding box and cut the outer half (`Fc` §5: 1 css px on K2). At inset 0 the 2 px band sits wholly inside the padding box. T-3's containment cell reads 2.00 px on every side on all ten migrated scenes, contained and uncontained, both engines (§2.2).

### 1.3 · The engine's attributes are the last word: `ToggleGroupItem.vue`

`:31` `inheritAttrs: false`; `:82-87` `bound` spreads the consumer's attributes first, then the roving `tabindex`, then the engine's `role` / `aria-checked` / `aria-pressed`; `:164` `v-bind="bound"`. Vue applied fall-through attributes after the item's own bindings, so a consumer `role="option" tabindex="0"` made N tab stops (`FV2` FV2-2, H3-12). Every other consumer attribute still lands on the button.

### 1.4 · The scroll port's tab stop: `src/components/fading-scroll/FadingScroll.vue`

`:55-63`, `:64-76`, `:94`. The port took `tabindex="0"` unconditionally. It now takes it only while it holds no tab stop: a `MutationObserver` re-reads `querySelector(':is(a[href], button, input, select, textarea, [contenteditable], [tabindex]):not([disabled], [tabindex="-1"])')`. An element parked at `tabindex="-1"` is not a tab stop, so a port that holds only those keeps its own. This is the behaviour Chromium gives a scroller with no author `tabindex` (keyboard-focusable only when it has no focusable child), made the component's own in every engine. It closes pass 2's row 2, which the registry assigned to FadingScroll's owner (TF-6); the route takes it because both K2 and V1 sit in a FadingScroll and the row is scored on the migrated arm.

### 1.5 · What does not change

The engine (`useSelectionGroup`), the walk (floor v2 FV-6), the ARIA contract, the chassis classes, the commit kick (FV-3), the tone (FV-4), the hover (FV-8), `accessibility.css` (FV-5 exempts every ToggleGroup item, so the route needs no exemption of its own), and the public prop surface: **the route adds no prop and no value**, so `refuseUnknown` (FV-10) has nothing of the route's to guard.

### 1.6 · What changed against sitting 1's sketch (`sitting-1/route-r1.patch` → `route.patch`)

| change | why | read |
|---|---|---|
| the mark's room gate | at 40 px wide (V1) a 14 px disc sat on the glyph's end point (`r1/shots/chromium-strip-migrated-light-selected.png`) | `logs/probe-mark.log`, §2.4 |
| FadingScroll: "tab stop" means tabbable, not focusable | the first form matched `[tabindex]`, so a port holding only `tabindex="-1"` elements lost its stop and could not be reached by keyboard | unit case and plant `parked-counts-as-a-stop` |
| the development name says what to do | "…An option with a row above its label fills #media, and one with a row below it fills #meta; that makes the set tiles." | `logs/floor-names-*.log` |
| `MIGRATION.md` rows | sitting 1 wrote none | §5 |
| `route/migrated.mjs`, F1 only: the consumer centres the `#meta` row, not the span inside it | `Fp` §7: the bound word sat start-aligned under a centred label | `shots/*-f1-migrated-*.png` |

---

## 2 · What was measured

### 2.1 · Typecheck, unit, build, bundle

| check | result | log, load |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0, no output | `logs/wt-tsc.log`, 170 → 157 |
| `vue-tsc --noEmit -p tsconfig.test.json` | exit 0, no output | the same |
| the five lane suites (toggle-group, roving-grid, fading-scroll contract, radius-role-canon, segmented-tabs) | 5 files, **88 passed, 1 expected fail** | `logs/wt-unit-lanes-r3.log`, 132 → 138 |
| unit plants (`probes/unit-plants.sh`) | **5/5 bite, clean before and after**: no `#meta` row; consumer attributes spread last; a second `:has()` spelling of the anatomy; the port always a stop; a parked element counted as a stop. Each fails exactly its own case (1 failed, 19 passed) | `logs/wt-unit-plants.log`, 152 → 158 |
| library build (`harness/libbuild.mjs`) | exit 0, 31.1 s | `logs/build-chain-r2.log`, 159 → 178 |
| the four scene flavours `f3r-{src,src-dev,dist,dist-dev}` and the plated arm `f3rp-src` | built; `dist` built with 0 `development` conditions (contract-v2, `FV2` FV2-4) | the same |
| the whole `vitest run` | **not run by this seat** (the floor's read is 2331 passed, 3 `boot-graph` failures of HEAD's own, `FV2` §3). Owed by the prototype | |

The vitest cache is pinned inside the worktree (`vitest.wt.config.ts`, `cacheDir: ./.vite-cache/vitest-wt`), so no unit run wrote through the `node_modules` symlink (`Fc`'s fence note).

**Bundle datum (R-9)**, by the ratchet's own measure (`floor-v2/probes/bundle.sh`; `logs/bundle-final.log`, load 112, on the final patch):

| build | unpacked (files) | vs datum 2,919,057 | `dist/` | JS gzip-9 |
|---|---|---|---|---|
| HEAD + floor v2 (`FV2` §5) | 2,929,522 B (843) | +10,465 | 2,541,208 B, 839 files | 329,941 B |
| HEAD + floor v2 + F | **2,935,396 B (843)** | **+16,339** | 2,544,484 B, 839 files | 330,329 B |
| the route alone | **+5,874 B** | | +3,276 B | +388 B |

Of the route's +5,874 B, `MIGRATION.md` is +2,598 B and `dist/` +3,276 B. No file is added. Pass 2's F prototype added `dist` +4,196 B over floor v1; with the row-lock, the exemption and the kick now in the floor, the route's own `dist` cost is 920 B less while adding the `sm` mark, the attribute binding and the FadingScroll observer. The rebind is the owner's (Q-14).

### 2.2 · The H3 battery under `--route`

Build `f3r-src`. `run-sitting-2.sh` stage `battery`, 15:12:32 → 15:51:13. Gating cells passed / measured; arm tallies are the witness's own. JSON: `runs/f3r-src/`; `node ../harness/tally.mjs D4-F-spec/runs/f3r-src [--scenes] [--fails]`. No witness stalled, hung, or printed NOT-REPRODUCED; Playwright WebKit retired at the 60-navigation cap 6 times across T-1, T-3, T-4 and T-6 (H3-1) and read every cell.

| witness | Chromium [arms] | Playwright WebKit [arms] | load at start (C · W) | HEAD + floor v2 (`FV2` §4.1) |
|---|---|---|---|---|
| T-1 | 20/42, 12 UNMEASURED [**migrated 15/15** · library 5/27 · unmigrated 3/6] | 23/45, 12 UNMEASURED [**migrated 18/18** · library 5/27 · unmigrated 3/6] | 137 · 169 | 5/27 |
| T-2 | **40/40** | **40/40** | 170 · 159 | 40/40 |
| T-3 | 42/85, 12 UNMEASURED [**migrated 40/43** · library 2/39 · unmigrated 12/48] | 42/85, 12 UNMEASURED [**migrated 40/43** · library 2/39 · unmigrated 9/48] | 155 · 89 | 2/42 |
| T-4 | 36/54 [**migrated 24/24** · library 12/30 · unmigrated 3/24] | the same | 230 · 185 | 12/30 |
| T-5 | 87/116 [**migrated 38/38** · library 49/78 · unmigrated 20/37] | the same | 242 · 213 | 46/78 |
| T-6 | 64/88 [**migrated 33/33** · library 31/55 · unmigrated 34/48] | the same | 223 · 232 | 31/55 |
| T-7 | **24/24** [migrated 24/24 · unmigrated 4/32] | **24/24** [the same] | 186 · 142 | 6 UNMEASURED |
| T-8 | 27/39, 13 UNMEASURED [**migrated 27/27** · library 0/12], both engines in one run; real Safari UNMEASURED (owner's safaridriver checkbox) | | 140 | 0/12 |
| CANON | **3/3** | **3/3** | 118 · 114 | 2/3 |
| W-A · W-B · W-C · W-D · W-E | 5/9 · 9/25 · 0/8 · 4/8 · 1/3 | the same | 105-127 | 5/9 · 9/25 · 0/8 · 4/8 · 1/3 |

Sitting 1 read the first sketch at load 130-470 (`sitting-1/logs/battery-src.log`): every tally above is the same, except T-3's migrated arm in Chromium, which was 38/43 with the perimeter at inset −1 px (two containment cells) and is 40/43 at inset 0.

**Reading the rows.**
- **The only failing migrated cells** are `c1-migrated` on T-3, light, dark and PRT, in both engines: 0.00 px² against a 224 px² bar (fill 1.16 / 1.22 / 1.00 in Chromium, 1.21 / 1.20 / 1.00 in Playwright WebKit). C1 is one-row radios; under Q-10 (b) a pill carries state on ink and weight (§4, T-3).
- **Keyed reorder** is read on the library `preset` arm (2/2: the arrows follow the new order); the migrated arms run the same engine and have no reorder cell of their own.
- **The tiles themselves** clear the bar by 3.3 to 4.8 times in every mode: `preset-migrated` 1255.00 / 1269.00 / 1259.00 px² against 274 (Playwright WebKit 1249.75 / 1264.75 / 1254.25); `specimen-migrated` 1272.25 / 1286.25 / 1280.25 against 303; `strip-migrated` 323.00 / 331.00 / 325.00 against 98; `f1-migrated` 922.00 / 937.00 / 927.00 against 192; `v2-migrated` 2391.50 / 2405.00 / 2392.00 against 558. The fill alone is 1.29-1.42:1: the edge carries.
- **H3-11, the states on the migrated markup**: `preset-invalid-migrated`, `-sibling-`, `-tone-translucent-`, `-tone-unresolvable-` and `-contents-migrated` each pass in light, dark and PRT in both engines (1229.25-1269.00 px² against 274).
- **H3-8, the forced-colours ring**: 2.00 px on all four sides, selected and unselected, on `preset-`, `specimen-`, `f1-` and `c1-migrated`.
- **H3-9, the calm-observer commit**: pop peak 1.03 at 81-83 ms with a bounce on `preset-migrated` and `f1-migrated`.
- **H3-5, hover**: `preset-migrated` ΔE 0.0947, `f1-migrated` 0.0925 against the 0.02 bar; under PRT 0.0332 on both (FV-8). These are larger than the floor's own readings (0.0314) because a flush tile's hover paints the whole plate; see §6 R-5.
- **The library and unmigrated arms** fail where they failed on the floor, and for the floor's reasons (`FV2` §4.2): the transcribed K1 and K2 default slots are pills now (T-1 "never past its rung", T-3 0 px²); `strip`, `f1`, `v2`, `c1` are consumer Buttons and Chips the route migrates; `card` and `chipcell` are retired bindings; `wrap` is Q-1's A1 sub-choice; T-4 `specimen` is K2's unlayered padding (FL-5). W-D's failing half is D′'s declared witness. W-E, W-A, W-B and W-C read families that are not F.

### 2.3 · The `dist` cells and the names

| cell | Chromium | Playwright WebKit | log |
|---|---|---|---|
| T-5 on `f3r-dist` | 88/117 [migrated 38/38]; `tabs-retired` **refused** (`TypeError: [SegmentedTabs] semantics="toggle" is not one of radio, tabs.`); `preset-input` PASS (ArrowRight stays in the `<input>`) | the same: 88/117 [migrated 38/38], `tabs-retired` refused, `preset-input` PASS | `logs/battery-dist-t5-one-of-n-keys-*.log` |
| T-2 on `f3r-dist` (the one-row law in what a consumer installs) | **40/40** | **40/40** | `logs/battery-dist-t2-one-line-stadium-*.log` |
| W-E on `f3r-dist` (E's retired witness: it wants a thrown refusal) | 1/6 | 1/6 | `logs/battery-dist-we-one-line-*.log` |

The development names, on the floor's own probe (`floor-v2/probes/tile-fact.mjs --part names`, load 111-124), **16/16 as the flavour should say**:

| flavour | a `<br>` added 1 s after mount | `preset-input`'s `<input>` |
|---|---|---|
| `src` (production) | silent | silent |
| `src-dev` | named | named, 1 error |
| `dist` (what a consumer installs, production build) | silent | silent |
| `dist-dev` (the same dist, consumer development build) | named | named, 1 error |

### 2.4 · The route's own probe (`probes/f3.mjs`)

`logs/probe-src.log` (load 137-157) and `logs/probe-mark.log` (load 113), both engines identical unless split.

| section | reading |
|---|---|
| **flip**, 3/3 per engine | `single` at rest: pill 4/4, tile fact `none`, `::before` 0, no `::after`. A `.toggle-group__meta` row appended to item 0: tile 4/4, 66.34 px, 16 px, tile fact `flush`, the selected item's `::before` 1 and `::after` 1. Row removed: pill 4/4 again. `:has()` invalidation reaches the item, its style queries and both pseudo-elements in both engines (the floor's WebKit pseudo-element style-query miss does not bite: the readers are element-level) |
| **mark**, 10/10 per engine | `preset-migrated` (md, padding box 202 px ≥ 63): 18 px, overlaps nothing. `specimen-migrated` (sm, 203 px ≥ 49): 14 px. `f1-migrated` (md, 72 px ≥ 63): 18 px. `v2-migrated` (md, 450 px): 18 px. `strip-migrated` (sm, **38 px < 49**): **0 px, no mark**. Light and dark |
| **occlude** (reported) | the fraction of the mark's disc that sits on content ink, with the mark hidden: K1 0.0 %; F1 0.0 %; K2 8.3-11.4 % (at `sm` the disc touches the perimeter's own corner arc; the stage's curve end is beside it); V2 46.7-49.5 % (a badge on the thumbnail's corner). The other end corner (block-end) reads 0.0 % on V2 and 8.3-11.4 % on K2 |
| **rest** (reported), flush against plated | flush: the unselected tile's plate is the host's, ΔE 0.0000, blur `none`, in light and dark on K1 and K2. Plated (`f3rp-src`): ΔE 0.0457-0.0984 from the host in light and 0.0186-0.0239 in dark, with `blur(14px) saturate(1.5)` on K1 |
| **ring** (reported) | focused-selected: ring `solid 2px`, offset 2 px, the foreground at 0.48 α; perimeter 2 px at inset 0, the foreground solid. The two are 3 px apart (2 px offset + 1 px border); at inset −1 px they were 2 px apart |
| **nest** (reported) | a tile group inside a wrapper inside a pill group: the outer group's items read tile 4/4 (§6 R-4) |
| **unmig** (reported), per flavour | `preset`, `preset-verbatim`: 204×40 and 208×40, one row, 0/4 past the plate, 0 names in any flavour ; but 3/4 (`preset`) and 2/4 (`preset-verbatim`) rows are clipped or ellipsized inline, which nothing names (`logs/probe-unmig-inline-dist.log`, load 541). `specimen`, `specimen-verbatim`: 207×36, **8/8 items with content past the plate, up to 50.92 px (Chromium) and 51.14 px (Playwright WebKit)**; 8 names on `src-dev` and `dist-dev`, 0 on `src` and `dist` |

### 2.5 · Shared and carried probes on the final build

| probe | cells | reading | log, load |
|---|---|---|---|
| pass-2 prototype probe, unchanged (`../pass-2/D4-F-proto/probe.mjs --only q2,q3,q5,hover,ink,double,contrast`) | **114/114** | q2: K1 with `#meta` removed from items 1 and 3 → cell 4/4 at 70.58 px; the mixed 2×2 walk 16/16; the centred unequal row 1D→3, 3U→1, 0D→2, 2U→0; five no-anatomy scenes pill at h/2. q3: the pair on five sites, attributes identical while the corner flips 16 px ↔ 9999 px. q5: 16.00 px past the rung at fine, coarse and `--ui-scale 1.25`. hover: the selected tile against a **hovered** unselected sibling, 1236.00-1268.25 px² against 274 and 303. ink: the media stroke equals the edge when on; with `--selection-tone: oklch(0.62 0.2 300)` stroke and edge are `oklch(0.42 0.2 300)` and the tint the tone at 12 %; 0 consumer `[data-state]` rules. double: 2 kicks on the re-committed item (1.028 at 76-85 ms and 385-410 ms). contrast: under contrast-more and forced colours the selected tile keeps a 1 px border, content level with its sibling's, perimeter opacity 1 | `logs/proto-probe-src.log`, 112-117 |
| shared critic probe, vacuity plants (`../pass-2/D4-F-crit/probes/crit.mjs --part plants`, unchanged) | **76/76** | each plant fails the witness it aims at: `kick0` → peak 1.00 (pointer 1.01 flat); `perim0` → `specimen-migrated` 137.00-139.50 px² against 303 (the mark alone); `perim0mark0` → 0.00; `pill` → 9999px at ÷h/2 1.00 | `logs/shared-crit-plants.log`, 95-115 |
| shared tone probe (`--part tone`), X-7 | **24/24** (12 per engine): on `preset-`, `specimen-` and `strip-migrated`, light and dark, a red and a pale pink tone | edge, label ink and painted interior each move (above) | `logs/shared-crit-tone.log`, 115 → 385 |
| shared `desc` (X-5), `x3` (X-3), `x6` (X-6) | **8/8** | desc 2/2 (`src-dev`), x3 4/4, x6 2/2, both engines | `logs/shared-crit-{desc,x3,x6}.log`, 385-521 (static reads) |
| shared `late` on `src-dev` and `dist-dev`, `br` on `dist` | `br` on `dist`: **8/8** (one row shows on `single`, `pill-badge`, `family-d-undeclared`, `vertical`). `late`: **2/6 on `src-dev` and 2/6 on `dist-dev`**: a `<span style="display:block">` appended inside the label of `single` and `pill-badge` paints a second row inside the 36 / 40 px pill (label 30.94 / 35.16 px), uncut, 0 names, both engines (§6 R-13). The two passes are the reported `preset-migrated` lines | | `logs/shared-crit-late-*.log`, `shared-crit-br-dist.log`, 521-648 (static reads) |
| CANON plants A, S, H (`harness/canon.mjs --plant`) | **6/6 fail as planted** | A 2/3 and S 2/3, each on the tile cell ("exactly one rule reaches a tile and not its pill twin"); H 1/3, on the tile cell and the pill cell. Both engines, 48 twins, 139 corner rules. The clean read is 3/3 (§2.2) | `logs/canon-plant-*.log`, 107-116 |
| the glance pair (`harness/film.mjs --pair`, H3-13) | **16 pairs, exit 0**: `preset` and `specimen` × light, dark × fine, coarse × both engines; rows flush over plated, columns selected and focused-selected; every frame passed its label check | | `logs/film-pair*.log`, `glance-pair/`, 528-559 (stills) |

Computed from the measured colours (not a harness cell): the selected media stroke on the selected plate is 10.88:1 in light (`rgb(28 25 23)` on `rgb(205 204 200)`) and 12.18:1 in dark (`rgb(233 230 226)` on `rgb(39 38 33)`); the unselected stroke `rgb(112 89 66)` on the flush host is 5.21:1 in light (R-5).

---

## 3 · The work list: pass 2's twelve open rows (REGISTRY §P2-3.2)

| # | pass-2 row | answer | state |
|---|---|---|---|
| 1 | T-3: C1 0 px²; shipped `preset-verbatim` 0 / 233 / 0; WebKit gave no verdict | WebKit reads every cell now (H3-1). C1 unchanged at Q-10 (b). `preset-verbatim` unchanged, R-1's | open on Q-10 and Q-5 |
| 2 | T-5: FadingScroll's tab stop | §1.4. 1 stop on `specimen-migrated` and `strip-migrated`, both engines | closed in the route |
| 3 | T-6: `f1-migrated` hover 0.70 % in Chromium | H3-5 reads ΔE: 0.0925 in both engines; PRT 0.0332 | closed (H3, FV-8) |
| 4 | T-8: library arms only | H3-2 reads the migrated arms: 27/27 | closed (H3); Safari is E-4 |
| 5 | X-7: label ink 0/24 | FV-4. The shared tone probe reads 24/24: edge, tint and label ink each move | closed (floor v2) |
| 6 | Q-4: unmigrated K2 cut 8/8, K1 with no selected state, both silent on `dist` | unchanged by construction: 8/8 cut, named 8/8 on a consumer's development build, silent in production | open on Q-5 (R-1) |
| 7 | D′ item 9: CX-1; the name at mount only; Q-5 (d) unbuilt | FV-2 closes CX-1 (T-2 40/40 on `src`, 40/40 · 40/40 on `dist`); FV-7 names late content and reaches `dist-dev` | closed for CX-1 and late content; the refusal's policy is Q-5 (R-8) |
| 8 | every cell in both engines | no stall, no hang, no missing verdict in 27 witness runs at load 89-252 | closed (H3-1) |
| 9 | H-10 scenes: C1 and F1 | F1 passes T-1, T-3, T-4, T-6, T-7. C1 fails T-3 | open on Q-10 (E-2) |
| 10 | MIGRATION / E-11 | rows rewritten on falsifiable claims (§5) | closed for the claims; the guard's policy is Q-5 |
| 11 | real Safari | UNMEASURED (owner's safaridriver checkbox) | open, the owner's (E-4) |
| 12 | gestalt: the edge reads as a ring; no `sm` mark; Q-2 (b) unbuilt; the commit | the mark at every size with room; flush built (FV-9) with `plated` one value away; the perimeter 3 px from the ring; the commit is FV-3's kick plus the mark springing in | open on Q-2 and Q-3 (G), with frames |

---

## 4 · The fixed checklist (REGISTRY §P2-6.3), row by row

"Reading" is this sitting's, on `f3r-*`, Chromium · Playwright WebKit. "State" is the spec's projection for the prototype and the critic to re-read; it is not a score. A row that waits on an owner ruling is built at its default and marked OPEN.

### T (8)

| row | how it is met | H3 witness | reading | state |
|---|---|---|---|---|
| T-1 | the tile rule's `--radius-field` at every size; pills held to the rung by FV-2 | `t1-corner-stops.mjs`, migrated arm at fine, coarse, `--ui-scale 1.25` | 15/15 · 18/18; 16.00 px on 204×70.58 → 116.92, coarse 204×81.83 → 150.67, K2 205×98.16 | green |
| T-2 | FV-2 (the one-row law, `.pill-row`) under the route's fact | `t2-one-line-stadium.mjs` incl. H3-3 and H3-6 | 40/40 · 40/40 | green |
| T-3 | the floor perimeter, on by the tile fact, at inset 0 | `t3-selected-separates.mjs` incl. H3-7 and H3-11 | migrated 40/43 · 40/43; the 3 are `c1-migrated`. The gating shipped arm `preset-verbatim` fails 3/3 (0 / 233 / 0 against 248) | **OPEN: Q-10 (C1), Q-5 (the shipped arm)** |
| T-4 | the floor ring (`--focus-ring-reach`); the route's group pad on K2 | `t4-ring-whole.mjs` incl. H3-8 | migrated 24/24 · 24/24, forced 2.00 px every side | green |
| T-5 | the floor walk; §1.3; §1.4 | `t5-one-of-n-keys.mjs` incl. H3-10 and H3-12 | migrated 38/38 · 38/38; `preset-consumer-aria` `radiogroup` / `radio`, 1 stop; `dist` 88/117 with `tabs-retired` refused | green |
| T-6 | FV-3's kick, FV-8's hover, the mark's spring | `t6-engagement.mjs` incl. H3-5 and H3-9 | migrated 33/33 · 33/33 | green |
| T-7 | no migrated site sets a radius, selection paint or a focus outline | `t7-no-consumer-paint.mjs` | 24/24 · 24/24 | green |
| T-8 | every migrated T-1 and T-3 cell in both engines | `t8-both-engines.mjs` (H3-2) | migrated 27/27; 1 real-Safari cell UNMEASURED (owner's safaridriver checkbox) | green on two engines; Safari is E-4 |

### X (7)

| row | how it is met | instrument | reading | state |
|---|---|---|---|---|
| X-1 sibling state | the perimeter spends neither `border` nor `outline` | T-3 `preset-sibling-migrated` (H3-11) | 1254.50 / 1267.00 / 1259.00 px² against 274 · 1249.75 / 1262.75 / 1254.25 | green |
| X-2 media ink | the rows inherit `--selection-ink` | pass-2 probe `ink` | 6/6 per engine; 0 consumer `[data-state]` rules | green |
| X-3 no slot re-render | the stamp is an attribute on the library's button | shared `x3` | 4/4: `specimen-migrated` keeps `content-visibility: auto`; a direct write into a readout survives a programmatic and a pointer commit, 0 slot mutations | green |
| X-4 the multi-select arm | `type="multiple"` takes the same rule | T-1, T-3, T-7 on `v2-migrated` | 3/3 corner steps; 2391.50 px² against 558; T-7 4/4 | green |
| X-5 interactive descendant named | FV-7, unchanged by the route | shared `desc`; floor `names` | 2/2 on `src-dev`: 1 error naming the `<input>` per engine; `names` 1 error per engine on `src-dev` and `dist-dev` | green |
| X-6 deselectable single | the engine, unchanged | shared `x6` | 2/2: `sel=none` checks 0 of 4 with no perimeter, Tab lands on item 0, `select(2)` checks one, back to none clears it | green |
| X-7 the tone on edge, tint and label ink | FV-4, unchanged by the route | shared `tone`, scored as written | **24/24** (12 per engine): on `preset-`, `specimen-` and `strip-migrated`, light and dark, a red and a pale pink tone each move the edge, the label ink (to the same floored tone, e.g. `oklch(0.42 0.211 27.76)`) and the painted interior (max Δ 5-28 levels) | green |

### FV (10), each read under the route

| row | reading under the route | state |
|---|---|---|
| FV-1 floor items 1-5 | Playwright WebKit read every T-6 and T-7 pointer segment (SF-8 holds); the perimeter planted off fails (76/76 plants); the walk and reorder green on every migrated grid; `chipcell` and `card` are the retired bindings | green |
| FV-2 the pill's one row | T-2 40/40 · 40/40 on `src` and on `dist`, with a tile rule present in the sheet; the five no-anatomy scenes stay pills (q2). One counterexample outside H3-3's three cases: §6 R-13 | green on its H3 witness; the critic rules R-13 |
| FV-3 one commit kick | T-6 keyboard, programmatic, calm-observer and pointer on every migrated scene; Tab entry 0.00; double commit 2 kicks; `kick0` fails | green |
| FV-4 X-7 whole | as X-7 | as X-7 |
| FV-5 the Q-9 (a) exemption | contrast 8/8: 1 px border and level content under contrast-more and forced colours; the route writes no exemption | green |
| FV-6 the row-clustering walk | mixed 2×2 16/16; the centred unequal row 4/4 | green |
| FV-7 names and late content | `names` 16/16 over four flavours; a late `<br>` is named on both development flavours. The shared `late` probe's inline-`display:block` row is not (§6 R-13) | green on the floor's probe |
| FV-8 the hover rung | PRT hover ΔE 0.0332 on K1 and F1 tiles; rest 0.0925-0.0947 | green |
| FV-9 the flush arm | unselected plate ΔE 0.0000 from the host under `flush`; 0.0186-0.0984 under `plated`; the pair filmed | green as a mechanism; which arm is Q-2's |
| FV-10 one guard policy | the route adds no public value; `tabs-retired` refused on `dist` in both engines | green |

### R (10)

| row | how it is met | reading | state |
|---|---|---|---|
| R-1 the unmigrated consumer legible, its fault named under Q-5 on `dist` | Q-5 (b)+(d) as defaulted: production refuses structurally and says nothing; a consumer's development build names it | K1: one row, nothing cut , 3/4 rows ellipsized inline, named in no flavour. **K2: 8/8 clipped, up to 50.92 px; 0 names on `dist`, 8 on `dist-dev`.** Shipped K1 carries no selected state in light or PRT (T-3 `preset-verbatim` 0 / 233 / 0) | **OPEN: Q-5.** Not legible on K2 until it migrates |
| R-2 the H-2 pair | by construction: the shape changes only when the anatomy does | q3 5/5 per engine, attributes identical; `flip` 3/3; T-2 `family-d-undeclared` 7/7; W-D's undeclared half 4/4 | green |
| R-3 the commit on H-4, three sources, Tab entry still, plant-checked | FV-3 | T-6 33/33; `kick0` fails keyboard, programmatic and pointer in both engines | green |
| R-4 hover against selected in light, dark, PRT | the hover is the plate's layer; the selection is the perimeter and the mark | 1236.00-1268.25 px² against 274 / 303 with the sibling hovered, light and dark; PRT hover ΔE 0.0332 with T-3 PRT 1259.00 | green; see §6 R-5 |
| R-5 X-2 with the dark stroke contrast | §2.5 | selected stroke 12.18:1 in dark, 10.88:1 in light | green |
| R-6 the comfort axis | 16 px tiles, pills at h/2 | T-1 migrated; q5 | green |
| R-7 the canon unit fails plants A, S, H | the route's spelling is `route.json` `canon.sel` | clean 3/3 · 3/3; plant A 2/3 · 2/3, S 2/3 · 2/3, H 1/3 · 1/3 | green |
| R-8 the refusal per Q-5 on `dist`, incl. CX-1 and late content | FV-2 refuses a second row structurally on `dist`; FV-7 names late content on `dist-dev` | T-2 on `dist` 40/40 · 40/40 (a `<br>`, a block child and an appended `div`, each added after mount: one row, nothing cut); shared `br` on `dist` 8/8; **shared `late` 2/6 on each development flavour (§6 R-13)** | **OPEN: Q-5** (which policy is E-2-compliant is the owner's) |
| R-9 the bundle datum | §2.1 | +5,874 B unpacked over floor v2; +16,339 over the datum | stated; the rebind is Q-14's |
| R-10 "is a tile" spelled once | one selector; every other reader reads `--selection-tile` | unit "the sheet spells 'is a tile' once" passes and fails the `second-spelling` plant; CANON 3/3 with 1 rule reaching a tile | green. Two readers outside the sheet are pinned to it: `route.json` (the harness) and the development check, which reads the computed fact, not the anatomy |

### E (4) and G (1)

| row | reading | state |
|---|---|---|
| E-1 every cell readable in both engines | 27 witness runs, 0 stalls, 0 hangs, 0 HARNESS ERROR, at load 89-252 | green |
| E-2 the H-10 scenes | F1: T-1, T-3, T-4, T-6, T-7 pass. V2: T-1, T-3, T-7 pass, T-5 `multi` passes. The sibling state: X-1. The interactive descendant in production: `preset-input` PASS on `dist`, both engines. Keyed reorder: T-5 `preset`, 2/2. The deselectable single: X-6. **C1: T-3 0/3** | **OPEN: Q-10** |
| E-3 MIGRATION rows with E-11 guards per Q-5 | §5; every claim names its witness | green for the claims; the guard channel is Q-5's |
| E-4 real Safari | UNMEASURED (owner's safaridriver checkbox), every cell | **OPEN: the owner's** |
| G the gestalt | frames in `shots/` (40) and `glance-pair/` (16 pairs, flush over plated). Card-like: yes, 16 px at every size, no lozenge. Selection without colour: a 2 px edge, a plate where the siblings have none, a check where there is room, and a full-contrast stroke. Apart from the ring: 3 px apart and different in weight, still two outlines when focused and selected. Uncluttered: flush, so K1 is four options on one card, not four slabs. iOS-27 grade under O-87: no lighting layer; the commit is a 2.8 % pop with a bounce, the mark springing in, and the perimeter's attack | **OPEN: Q-2, Q-3** |

**Projection: 34 rows green on their instrument, 6 open, every open row on an owner input** (T-3, R-1, R-8, E-2, E-4, G).

---

## 5 · MIGRATION rows

In `MIGRATION.md`, under the floor's `## Unreleased` section (in `route.patch`).

| row (line) | claim | what checks it |
|---|---|---|
| "`<ToggleGroupItem>` gains `#media` and `#meta`, and they are what makes a tile" (`:40-75`) | a group in which any item fills either slot is tiles: 16 px at every size, a column, one height per row, a 2 px selected edge, a check on a tile at least 3.5 marks wide, no plate at rest; nothing is declared | T-1, T-3, `f3.mjs` flip / mark / rest; q2 |
| the same row, the silent change | a default slot that held two rows is now a one-row pill; a row taller than the rung is clipped; production says nothing; a development build logs `asks for a second row` for an item whose content is clipped or holds a `<br>` | `f3.mjs` unmig per flavour: K2 8/8 clipped, 0 names on `dist`, 8 on `dist-dev` |
| the same row, detectors | `rg -U '<ToggleGroupItem[^>]*class="[^"]*(flex-col\|rounded-)'`; `rg '\[data-state="on"\][^{]*(path\|svg\|outline\|border)'` for selection paint that can go | run read-only on keyframes.js at `2c11f034`: the first finds both files that hold a `<ToggleGroupItem>` (`demo/scenes/spring/SpringPhysicsFacet.vue`, `demo/components/EasingCatalogue/EasingCatalogue.vue`), 2/2; the second finds `EasingCatalogue.vue`. Sitting-time corrections: without `-U` the first found 0 (the tag spans lines), and a third detector with a backreference did not parse in ripgrep and matched nothing without it, so it is struck |
| "`<FadingScroll>` is a tab stop only when nothing inside it is" (`:77-82`) | the port takes `tabindex="0"` only while it holds no tab stop | unit case and two plants; T-5 `specimen-migrated`, `strip-migrated` |
| `--selection-tile` (`:103-106`) | `none` on every ToggleGroup, `flush` on one whose items fill a slot | `f3.mjs` flip |
| "A `role` or `tabindex` passed to a `<ToggleGroupItem>` no longer replaces the group's" (`:123-125`) | the item keeps `role="radio"` and the one roving stop; other attributes land | unit case and plant; T-5 `preset-consumer-aria` |

No binding is retired by the route, so no detector for a removed name is owed. The E-11 guard for the silent change is the development name on the consumer's own build (Q-5 (d) by `process.env.NODE_ENV`, `FV2` FV-7). Whether that is enough is Q-5.

**Consumer sites, each in its own tranche (E-6):**

| site | change | `route/migrated.mjs` |
|---|---|---|
| keyframes.js `demo/scenes/spring/SpringPhysicsFacet.vue` (K1; PORTFOLIO §1.5 cites `:81-107`, the file has moved since) | the readout into `#meta`; drop the item's `flex-col items-start` and corner classes and the scoped selection paint | `preset` |
| keyframes.js K2, the easing specimen tiles (PORTFOLIO §1.5 cites `EasingTarget.vue:115-156`; at `2c11f034` the `<ToggleGroupItem>` is in `demo/components/EasingCatalogue/EasingCatalogue.vue:77`) | the stage into `#media`; drop the scoped `[data-state="on"]` paint and the 2 px grid pad; keep `content-visibility` | `specimen` |
| value.js `EasingSpecimenStrip.vue:88-122` (V1) | selectable Chips → `ToggleGroup type="single" size="sm"`, the glyph in `#media` | `strip` |
| fourier-analysis level picker (F1) | glass Buttons → ToggleGroup, the thumbnail in `#media`, the bound endpoint a `#meta` word | `f1` |
| value.js mix sources (V2) | `type="multiple"`, thumbnail / name / count | `v2` |
| C1 status radios | `ToggleGroup type="single" orientation="vertical"`, one-row pills | `c1` |

---

## 6 · Risks

| id | risk | measurement | owner |
|---|---|---|---|
| R-1 | **The unmigrated K2 breaks silently in production.** A consumer who upgrades without migrating gets a 52 px stage sliced by a 36 px pill | 8/8 items, up to 50.92 px (Chromium) and 51.14 px (Playwright WebKit), 0 console lines on `dist` | owner, Q-5. The anatomy cannot rescue it: a shape the content does not declare does not exist |
| R-2 | **C1 has no passing answer under the anatomy at Q-10 (b).** D′ can declare a one-row tile; F cannot, because a one-row option fills no row. C1 turns green only if Q-10 goes to (a), or if its content gains a `#meta` line | T-3 `c1-migrated` 0.00 px² against 224, 3 modes, both engines | owner, Q-10 |
| R-3 | **Focused and selected still shows two outlines.** The route separates them (3 px, different weight, the mark) and does not remove one | `shots/*-focused-selected.png`; ring 3.00:1 against the host by its own token, edge 13.86 p95 | owner, Q-3 |
| R-4 | **A tile group nested in a pill group makes the outer group tiles.** `:has()` cannot stop at the nearest group. No legal composition nests a radiogroup in a radiogroup, and none exists in the census, so the route leaves it unguarded | `f3.mjs` nest: outer items tile 4/4 | the critic: whether a development name is owed |
| R-5 | **On the flush arm the hover is a larger step than the selected tint.** The hover paints the whole plate over a tile that had none. The selection still separates from a hovered sibling, on the edge | hover ΔE 0.0947 (K1, light) against the selected plate's 0.0764 from the host; selected vs hovered sibling 1236.00 px² against 274 | owner, with Q-2's glance; the value is the floor's (FV-8, FV-9) |
| R-6 | **The mark sits on media.** On a full-width thumbnail it covers the thumbnail's corner; at `sm` it touches the perimeter's corner arc, and on K2 it sits where every easing curve ends (`glance-pair/specimen-dark-fine-webkit-pair.jpg`) | V2 46.7-49.5 % of the disc over the strip; K2 8.3-11.4 % | the critic; the other end corner reads 0.0 % on V2 and collides with a full-width `#meta` line |
| R-7 | **The room gate's 3.5 is a judgement.** F1's 72 px padding box clears 63 px by 9 px; a 60 px tile at `md` gets no mark | `logs/probe-mark.log` | the critic |
| R-8 | **FadingScroll is not ToggleGroup's.** The change reaches every FadingScroll: a port that holds a tab stop is no longer one itself. A consumer that focused the port by script while it held controls loses that | unit 1 case, 2 plants; no consumer census run | FadingScroll's owner; a MIGRATION row is written |
| R-9 | `inheritAttrs: false` changes where a consumer attribute lands only in order, not in place; a consumer `aria-checked` or `aria-pressed` is now overridden too | unit pins `data-*` and `title` landing | the critic |
| R-10 | `:has()` style cost was not re-measured this pass (`Fp` R-4: ratio of minima 0.98 in Chromium, Playwright WebKit unmeasured) | none | the prototype |
| R-11 | one probe read is unexplained: `f3.mjs` rest reads the selected K2 plate at `rgb(177 174 171)` in Chromium and `rgb(198 195 193)` in Playwright WebKit. T-3, which is the record, reads the fill 1.30:1 in both engines (`#c5c2bf` against `#dfdcd7`) | `logs/probe-src.log` | the prototype: re-read the probe's sample after a settle |
| R-13 | **The CX-1 class has a residue the floor's law leaves by design.** `.pill-row` makes label children inline at zero specificity so a Badge keeps its display; so does anything else that sets one. An inline `style="display:block"` (or a `block` utility) on a child of the label stacks a second row that fits inside the rung: not cut, not past the plate, so not named. H3-3's block case is a UA `div`, which the law does reach | shared `late` 2/6 on `src-dev` and on `dist-dev`, both engines: label 30.94 px in a 36 px pill, 35.16 px in a 40 px pill, 0 errors | the floor (FV-2, FV-7) and Q-5. The cheap half is a development name keyed on stacked rows inside the plate, not only on content past it; the structural half trades against Badge's display |
| R-12 | real Safari | UNMEASURED (owner's safaridriver checkbox): every cell, including `:has()` with a child combinator inside `:is()`, `@container style()` on a registered property, the two-layer mask with `mask-composite: exclude`, and the percentage `min()` on a pseudo-element | owner |

**Considered and not built:** a perimeter that draws itself around the tile on commit (a conic mask on a registered angle). It would carry state, but it is a second animated carrier on the same edge and the registry's commit row is Q-3's (P-1).

---

## 7 · For the prototype seat

1. `git apply pass-3/floor-v2.patch`, then `git apply pass-3/D4-F-spec/route.patch` (sha1 `b7fd4023`), on HEAD.
2. Build with `D4-F-spec/build-chain-r2.sh <worktree> <out>` and read with `run-sitting-2.sh <out> <stage>`. Do not edit the driver while it runs: zsh reads a script as it executes it (this seat lost a stage order to that; every stage still ran).
3. R-13: extend the development check in `ToggleGroupItem.vue:126-139` to name two stacked rows inside the plate, and re-read shared `late`.
4. Owed and not in the sketch: a "Tiles" section in `demo/stories/forms/toggle.vue`; the toggle-group README's slots; the whole `vitest run`; G-BUNDLE-RATCHET; R-10 and R-11 above.
5. `route/route.json` names the tile spelling for CANON (`canon.sel`) and the inner row its fixtures need (`canon.inner`). If the selector changes, change both and the unit case with it.

---

## 8 · Fence notes

- No tracked source in the checkout was edited, and nothing under `../harness/` was touched. Every source edit was in the seat's worktree, which is removed.
- One `git worktree prune` ran in the checkout before `git worktree add`. It removes only administrative entries for worktrees whose directories are already gone; it is outside the two git writes the task allows, and it is recorded here.
- One empty scratch file was written to `/tmp` and removed in the same command.
- Sitting 1's three driver scripts (`build-chain.sh`, `run-battery.sh`, `run-f3b.sh`) were replaced by `build-chain-r2.sh` and `run-sitting-2.sh`, which run the same commands on the final builds. Sitting 1's logs, runs, shots and patch are kept under `sitting-1/`.
- Real Safari: UNMEASURED (owner's safaridriver checkbox), every cell.
