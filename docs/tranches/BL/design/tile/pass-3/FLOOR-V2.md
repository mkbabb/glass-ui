# D4 · pass 3 · FLOOR v2: the floor every pass-3 route applies

| field | value |
|---|---|
| seat | D4 pass 3, FLOOR-V2 seat. Builds REGISTRY §P2-6.2 FV-1..FV-10 once, on the real source, on top of `../pass-2/floor.patch` (sha1 `f1476eba`), with the P2-5 defaults for every unruled owner question and O-87 on every paint value. Picks no winner |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | built in a detached worktree at `a11c6cc3`. The checkout moved to `05e5e1fb` and then `145138f2` while the seat ran; `git diff --stat a11c6cc3 145138f2 -- src package.json tests MIGRATION.md` is empty. The task named `8d911018`; `git diff --stat 8d911018 a11c6cc3 -- src` is empty too |
| patch | `floor-v2.patch`: floor v1 plus floor v2, one patch relative to HEAD. 33 files, +971 / −262 (`git apply --numstat`), 1,971 lines, sha1 `b04a83be97ae91bc0e14f7c62673b5dd0bc7115e`. `git apply --check` is clean on the checkout at `05e5e1fb` and again at `145138f2` |
| harness | H3 `9fd4983bc6b9`, the hash `H3.md` records; every run JSON under `floor-v2/run/` carries it |
| engines | Chromium 149.0.7827.55 and **Playwright WebKit 26.5**, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Every real-Safari cell is **UNMEASURED (owner's safaridriver checkbox)**: `safaridriver: Could not create a session: You must enable 'Allow remote automation'…` (`floor-v2/run/fv2-src/T-8-both.json`) |
| records | `floor-v2.patch`; `floor-v2/run-battery.sh` (the driver); `floor-v2/run/fv2-src/` and `fv2-dist/` (the battery JSON); `floor-v2/logs/` (every log cited, the worktree's typecheck, unit, build, bundle and plant logs prefixed `wt-`); the probes `floor-v2/probes/tile-fact.mjs`, `style-query-pseudo.mjs`, `unmigrated.mjs`, `bundle.sh` |
| machine | shared with other seats. 1-min load ran 14.8 to 64.6 across this seat's browser runs; each figure below carries its load. The harness lock serialized every witness and probe |

---

## 0 · In brief

1. **All ten FV rows are built**, in one patch on HEAD (§1). Typecheck is clean on both projects, the unit suite fails only HEAD's own three `boot-graph` cases (no built demo), and the library builds (§3).
2. **One fact decides pill against tile: `--selection-tile`** (`none` | `flush` | `plated`, registered, inherited; `src/styles/utilities/base.css:62`). A route sets it once, on the group, in its tile rule. Every floor reader derives from it by style query: the pill's one-row law, the flush plate, the selected perimeter and the development names. This replaces floor v1's `--selection-perimeter: 1` switch and removes every lift a route had to write (R-10, P-3). Probe: 26/26 mechanics cells in both engines, including a `display: contents` host (§2.1).
3. **HEAD + floor v2 under H3, against `H3.md` §4** (both engines identical except where noted): T-2 28/40 → **40/40**; T-5 28/78 → **46/78** (dist 47/79, the retired `semantics="toggle"` now refused); T-6 23/55 → **31/55** in Chromium and 15/43 → **31/55** in Playwright WebKit, with every ToggleGroupItem scene 11/11 and every SegmentedTabs-free commit, calm-observer and PRT hover cell green; W-A 2/9 → 5/9; W-B 5/25 → 9/25; W-E 0/3 → 1/3. T-3, T-7, W-C, W-D and CANON are unchanged: they read a tile, and the floor ships none (§4).
4. **With a tile set the way a route sets it**, T-3's own measurement passes 54/54 cells (nine H-3 scenes × light, dark, PRT × both engines), and the development names land on `src-dev` and `dist-dev` and stay silent on `src` and `dist`, 16/16 (§2).
5. **Bundle** (§5): unpacked 2,929,522 B, +10,465 over the `.bundle-ratchet` datum 2,919,057 (HEAD measures the datum exactly) and +6,798 over floor v1 (2,922,724). That is Q-14's rebind.
6. **The cost the floor records, not hides** (§6): before a route declares them tiles, the unmigrated K2 specimen tiles are pills whose 52 px stage is clipped by the 36 px plate (4 boxes, up to 24.64 px, both engines) with no production signal. That is Q-5's default (b) doing what it says, and R-1 stays the owner's.

---

## 1 · The patch, row by row

Line numbers are in the patched tree.

### FV-1 · Floor items 1-5, kept

`floor.patch` applies unchanged inside `floor-v2.patch`: the SF-8 hover token (`src/styles/tokens/glass.css`, rewritten by FV-8 below), the selected perimeter layer (`toggle-group/styles.css:150-165`), the grid walk and reorder fix, TF-4 (SegmentedTabs `radio` / `tabs`), TF-5 (Card `selected` deleted), TF-6 (`--focus-ring-reach`), TF-7 (now FV-2's pill law), TF-8 (the hover on the plate's own layer) and Q-8 (a) (Chip `shape="cell"` deleted). The one contract change is the perimeter switch: floor v1's `--selection-perimeter: 0` on the item, which a tile rule set to 1, is gone. The switch is now derived (FV-1's perimeter under FV-5 and the tile fact, below).

### The tile fact (serves FV-2, FV-5, FV-7, FV-9 and R-10)

- `src/styles/utilities/base.css:50-66`: `@property --selection-tile { syntax: "none | flush | plated"; inherits: true; initial-value: none }`, with the contract in its header. `toggle-group/styles.css:39` resets it to `none` on every `.toggle-group`, so a pill group inside a tile stays pills.
- **The route contract.** A route's one tile rule sets `--selection-tile: flush` (Q-2's default (b)) on the group: D′ in `.toggle-group[data-shape="cell"]`, F in `.toggle-group:has(.toggle-group__media, .toggle-group__meta)`. The rule also owns the corner, the column, the pad and the leading. It lifts nothing: the pill law is not applied to a tile in the first place.
- **Why the group, not the item.** A style query evaluates against an ancestor, so the item-level readers (the pill law, the flush plate) need the value set above the item. That holds for every ToggleGroupItem, which has no selection outside a group.
- **Why the perimeter is a variable.** The perimeter switch is `--selection-perimeter`, set on the item by a style query (`toggle-group/styles.css:177-187`) and read by its `::before` (`:163`). It is not a style query on the `::before` itself, because Playwright WebKit does not re-match a pseudo-element's style query when the value changes after load. `probes/style-query-pseudo.mjs` (`logs/style-query-pseudo.log`, load 26.99) reads the six forms STATIC and DYNAMIC. Chromium applies all twelve. Playwright WebKit applies all six STATIC forms and fails exactly `ps-pos` and `ps-not` DYNAMIC (opacity 0); the element-level form read through `var()` (`ps-var`) applies in both.

### FV-2 · The pill's one-row law

- `toggle-group/styles.css:110-142`: inside `@container style(--selection-tile: none)` the item takes `max-block-size: var(--toggle-group-item-size)` (D′'s and F's clamp), `flex-direction: row !important` and `flex-wrap: nowrap !important` (F's row lock), `justify-content: safe center`, `white-space: nowrap` and `overflow: clip`, and each label element ellipsizes. A tile gets none of these.
- `src/styles/utilities/base.css:69-88`, `.pill-row`: inside a one-row option, a `<br>` is `display: none`, and every element except graphics is `display: inline` under a zero-specificity `:where()`. A UA block (`div`, `p`) inside a label then runs on the row. Nothing is cut and nothing stacks. A class that sets a display (a Badge, a consumer utility) keeps it, and development names what that leaves past the rung (FV-7).
- This is FV-2's "label-level rule". It is not the `1lh` clamp, which `H3.md` §5 records as a CUT under H3-3.
- `.pill-row` is composed by `ToggleGroupItem.vue:155` and by `SegmentedTabs.vue:317`. H3's T-2 gates the `tabs` scene, so the tab needs it too (E-7: two sites).

### FV-3 · One commit kick, with the calm law reconciled

- F's form. `ToggleGroupItem.vue:82-90` watches `selected` and stamps `data-commit` on a false → true change (pointer, key or programmatic write; never mount, never focus). Only the kick's own `animationend` clears it (`:88-90`, `:165`).
- `toggle-group/styles.css:189-242`: a 450 ms keyframe on `transform`, on a spring impulse curve (ζ 0.5) that peaks, dips −0.163 and settles.
- **The calm law.** The amplitude is `0.045 × max(var(--motion-weight), 0.618)` (`:234`). A calm observer (`[data-reorder]`, `[data-autoplay]`) pins the weight to 0 to still ambient motion. A commit is a state change, so it kicks at the rest weight there (+2.8 %). A loud driver (weight 1) kicks +4.5 %. Reduced motion is the one thing that stills it (`:238-242`, `animation: none`); the perimeter's fade is then the commit. This closes `Fc` §7's open reconciliation and H3-9.

### FV-4 · X-7 whole

The tone reaches all four carriers on the item:
- the edge: floor v1's `--selection-edge`, `:99`, `:103`;
- the tint: `color-mix(in oklab, var(--selection-tone, var(--foreground)) 12%, transparent)`, 16 % under hover, `:279-294` (F's half);
- the label ink: `--selection-ink`, `:82-83`, which is `--muted-foreground` at rest and `var(--selection-edge)` when on (`:285`; D′'s half);
- the media ink: any stroke inside the item that reads `currentColor` or `var(--selection-ink)`.

Unset, the edge floors the foreground to itself (L ≤ 0.42 light, ≥ 0.8 dark), so an untoned item paints what it painted.

### FV-5 · The Q-9 (a) exemption

- `src/styles/accessibility.css:7-11, 21, 42`: the `prefers-contrast: more` and `forced-colors` selection arms carry `:not(.toggle-group__item)`.
- `toggle-group/styles.css:183-187`: under both media every ToggleGroup item turns its own 2 px perimeter on.
- **Deviation from the row's wording, stated.** FV-5 asks for the exemption keyed on the route's one tile selector. It is keyed on the component instead, because under these two media the floor gives every item, pill or tile, its own perimeter: Q-9 (a) is "exempt components that carry their own perimeter layer", and here all items do. accessibility.css then reads no tile fact (R-10), and the pill loses PF-3's 1 px shift as well.
- Probe: a selected `single` pill under emulated `prefers-contrast: more` keeps a 1 px border with `::before` opacity 1, in both engines (`logs/probe-tile-fact-src.log`).

### FV-6 · F's row-clustering walk

`src/components/tabs/composables/useTabRovingFocus.ts:156-193` (`rowNeighbour`): the adjacent row is the nearest item past the origin's centre line, together with every item whose block extent holds that item's centre line, or whose centre line it holds. Unequal heights aligned by top or by centre are one row. Test: `tests/components/custom/tabs/roving-grid.test.ts:101` ("a short item centred beside a tall one is still that row").

### FV-7 · The interactive-descendant name and the late re-check, under Q-5

`ToggleGroupItem.vue:92-145`. Gated on `process.env.NODE_ENV !== "production"`. The item names two things, once each:
- a pill whose content asks for a second row: a `<br>`, or any descendant laid out past the plate (`asks for a second row …`);
- an interactive descendant (`holds an interactive descendant …`).

It checks at mount and again on every content change: a `MutationObserver` over children, subtree and text, debounced to one frame. Production refuses both structurally: the one-row law, and the engine keeping a key typed in an editable descendant for the descendant (floor v1).

**Q-5 (d) by its intent, not its letter.** The default asks for a `development` export condition. `vite.config.ts:38-55` records that contract-v2 abrogated the `development` condition fleet-wide. The floor uses the channel Vue's own esm-bundler build uses instead. Vite's library build leaves `process.env.NODE_ENV` in place, and the consumer's bundler resolves it. So the names ship in `dist` (verified: the `toggle-group` chunk contains the gate and the strings) and run in a consumer's development build only. Measured, both engines (`logs/probe-names-*.log`, load 27.4-29.9):

| flavour | a `<br>` added 1 s after mount | `preset-input`'s `<input>` |
|---|---|---|
| `src` (production) | silent | silent |
| `src-dev` | named | named, 1 error |
| `dist` (what a consumer installs, production build) | silent | silent |
| `dist-dev` (the same dist, consumer development build) | named | named, 1 error |

16/16 cells as expected. The four existing `import.meta.env.DEV` sites (Button, Slider, MusicStaff, timeline) are not D4's and stay as they are.

### FV-8 · The hover rung

`src/styles/tokens/glass.css:257-270`. Still one flat mix of a relative colour into `--card`, now with the ink's share and alpha both lerped on `--glass-level`:

```
color-mix(in srgb,
  oklch(from var(--foreground) l c h / calc(1 - level * (1 - veil-quiet - fill-hover)))
    calc((fill-hover + level * (1 - fill-hover)) * 100%),
  var(--card))
```

- At level 1 it is floor v1's value exactly: alpha `veil-quiet + fill-hover`, share 100 %.
- At level 0 (reduced transparency) it is opaque `--card` with `--fill-hover` of the ink mixed in, so the hover moves (HF-4). It used to lerp to the bare rest plate.

Measured under H3 (`run/fv2-src/T-6-*.json`):

| scene | PRT hover ΔE, Chromium | PRT hover ΔE, Playwright WebKit | HEAD |
|---|---|---|---|
| `preset` | 0.0332 | 0.0311 | 0.0000 |
| `specimen` | 0.0332 | 0.0331 | 0.0000 |
| `single` | 0.0332 | 0.0332 | n/a |

The rest-level readings match H3's floor readings (`preset` 0.0314 Chromium, 0.0374 Playwright WebKit). No pointer segment hung: the mix keeps the shape that cured SF-8. The F1 amplitude half of FV-8 needs a route's migrated F1; under H3 it already read 0.0260 / 0.0343 (`H3.md` §1.2, `floor-froute`), and the level-1 value is unchanged. O-87: a tone step on the existing plate, no lighting layer.

### FV-9 · The flush arm beside the plated one

`src/styles/glass/control-surfaces.css:94-108`. Under `@container style(--selection-tile: flush)`, a stateful control (`.control-surface[data-state]`, an option) paints no plate, no floor and no blur at rest: G's flush form (`../pass-2/D4-G-block/route-common.mjs`). `plated` keeps all three. The hover (`:88-92`, specificity 0,3,0) still paints the plate's layer over the flush rule (0,2,0).

The rule lives in the register, not the lane: `G-TOGGLE-REGISTER` forbids the lane to declare `backdrop-filter` (it failed when the first draft put it in `toggle-group/styles.css`). Q-2's glance pair is now two values of one property on one build, which `film.mjs --pair` can film on a route's build.

Probe (`logs/probe-tile-fact-src.log`): plate and floor `transparent` and blur `none` under `flush`, plate kept under `plated`, in both engines, on `single`, `preset`, `preset-contents` and `specimen`.

### FV-10 · One guard policy for unknown values

`src/components/_shared/guard.ts`, `refuseUnknown(component, prop, value, allowed, hint)`. An unset value is the component's to default. Anything outside the set throws a `TypeError` naming the set, in production as in development, from the caller's `watchEffect`. Vue reports it through the app's error handler and the component keeps rendering.

Sites:
- `Chip.vue:86` (shape, over `CHIP_SHAPES`, `chipVariants.ts:19`; floor v1's ad-hoc throw folded in);
- `SegmentedTabs.vue:74` (semantics, over `SEGMENTED_TABS_SEMANTICS`, `tabs/types.ts:32`);
- a route's tile input (D′'s `shape`) calls the same helper.

On `dist`, `tabs-retired` reads `refused: … TypeError: [SegmentedTabs] semantics="toggle" is not one of radio, tabs.` in both engines (`logs/battery-fv2-dist-t5-one-of-n-keys-*.log`). Button's DEV-only retired-prop guard is a second policy outside D4 (§6).

### Tests and docs

- `tests/components/ui/toggle-group/ToggleGroup.test.ts:419-546` adds three cases: the model-keyed stamp (mount, focus, programmatic, pointer, the `animationend` filter); the late names; and the sheet contract read through postcss (pill law in the `none` query, perimeter on any tile, group reset, kick and its floor).
- `G-TOGGLE-WRAP` now requires the one-row declarations inside the `none` query.
- `tests/components/custom/tabs/segmented-tabs.test.ts:389` adds the guard case. `tests/gates/tabs-seam.test.ts:384` follows the tab's class string.
- READMEs: `tabs/README.md` (the throw, one row), `chip/README.md` (the throw).

---

## 2 · The floor's own reads

### 2.1 · The tile fact (`probes/tile-fact.mjs --part mech`)

The probe injects `.toggle-group { --selection-tile: <arm> }`, as a route's rule would.

| arm | what it checks | Chromium | Playwright WebKit |
|---|---|---|---|
| unset | `none`; clamp 36 / 40 px; `row`; `nowrap`; a `div` in the label `inline`; `::before` 0 | 4/4 scenes | 4/4 |
| `flush` | clamp `none`; the label `div` `block`; plate, floor `transparent`; blur `none`; `::before` on 1, off 0 | 4/4 | 4/4 |
| `plated` | the same with the plate kept | 4/4 | 4/4 |
| contrast-more | the pill keeps a 1 px border; `::before` 1 | 1/1 | 1/1 |

26/26 (`logs/probe-tile-fact-src.log`, run inside `run-battery.sh` at load 29.9; the iteration that found the WebKit pseudo-query miss is `logs/wt-tile-fact-mech-1.log` and `-2.log`, 18/26, the fix `-3.log`, 26/26).

### 2.2 · The register with a tile set (`--part t3`)

T-3's own `selectedSeparation` and `judgeT3`, tile = `flush`, on the nine H-3 scenes (`preset`, `specimen`, `preset-invalid`, `preset-sibling`, both tones, `preset-contents`, the shipped `preset-verbatim`, `single`) × light, dark, PRT × both engines: **54/54 PASS**. Playwright WebKit's PRT is the forced level-0 path. Examples, Chromium:

| scene | light | dark | PRT | bar |
|---|---|---|---|---|
| `preset-invalid` | 789.00 px² | 520.00 px² | 793.00 px² | 265 px² |
| `preset-tone-translucent` | 775.00 px² | 802.00 px² | 775.00 px² | 265 px² |
| `preset-verbatim` | 838.50 px² | 843.25 px² | 838.50 px² | 269 px² |

The fill stays 1.02-1.30:1: the edge carries.

---

## 3 · Typecheck, unit, build

Worktree `a11c6cc3` + `floor-v2.patch`, node_modules symlinked, Vite and Vitest caches inside the worktree.

| check | result | log |
|---|---|---|
| `vue-tsc --noEmit` (src + demo) | exit 0, 9.0 s | `logs/wt-tsc-app-2.log` |
| `vue-tsc --noEmit -p tsconfig.test.json` (with `dist/`) | exit 0 (the first run caught two type errors in the new test, fixed) | `logs/wt-tsc-test.log`, `wt-tsc-test-2.log` |
| `vitest run`, with `dist/` | 3 failed / **2331 passed** / 10 expected-fail, 240 files; the 3 are `boot-graph` (no `dist-demo`), HEAD's own failures per `FLOOR.md` §4 | `logs/wt-vitest-fv2.log`, load 28.0 → 38.2 |
| unit plants | 6/6 bite: no stamp; mount-only names; silent semantics; pill law on the wrong arm; kick on the bare weight; top-aligned rows only. Each fails its test and passes restored | `logs/wt-unit-plants.log`, load 34.4 |
| library build (`harness/libbuild.mjs`) | exit 0, 10.0 s | `logs/wt-libbuild-fv2.log`, load 33.3 → 36.6 |

The new public module surface is one internal chunk, `_shared/guard`. No export was added to the package map.

---

## 4 · H3 on HEAD + floor v2

`run-battery.sh`: builds 20:16, probes 20:17-20:19, battery 20:19:50 → 20:45:52 (load 29.35 at start, 15.16 at end, 64.64 at the peak), then dist cells to 20:48:34. Baseline: `H3/baseline/head-src` (`H3.md` §4, the same hash). Per-scene deltas: `node ../pass-2/floor-probes/compare.mjs H3/baseline/head-src floor-v2/run/fv2-src --changed`.

### 4.1 · Per witness

| witness | HEAD, Chromium · Playwright WebKit | HEAD + floor v2, Chromium · Playwright WebKit | load at start (C · W) |
|---|---|---|---|
| T-1 | 10/32 · 10/35 | 5/27, 12 UNMEASURED · the same | 29.35 · 31.45 |
| T-2 | 28/40 · 28/40 | **40/40 · 40/40** | 46.25 · 43.58 |
| T-3 | 2/42 · 2/42 | 2/42 · 2/42 (no tile; §2.2 is the switched-on read) | 42.33 · 51.08 |
| T-4 | 18/30 · 18/30 | 12/30 · 12/30 | 54.29 · 62.70 |
| T-5 (src) | 28/78 · 28/78 | **46/78 · 46/78** | 64.64 · 56.53 |
| T-5 (dist) | 28/79 · 28/79 | **47/79 · 47/79** (`tabs-retired` refused) | 15.00 · 15.87 at end |
| T-6 | 23/55 · 15/43 | **31/55 · 31/55** | 58.17 · 36.00 |
| T-7 | 6 UNMEASURED, unmigrated 4/32 · 4/21 | 6 UNMEASURED, unmigrated 4/32 · 4/32 | 24.32 · 33.36 |
| T-8 | 0/27 | 0/12, 13 UNMEASURED (12 T-1 cells "never past its rung", 1 real Safari) | 25.83 |
| W-A | 2/9 · 2/9 | 5/9 · 5/9 | 19.86 · 19.07 |
| W-B | 5/25 · 5/25 | 9/25 · 9/25 | 19.06 · 17.87 |
| W-C | 0/8 · 0/8 | 0/8 · 0/8 | 16.10 · 15.69 |
| W-D | 4/8 · 4/8 | 4/8 · 4/8 | 15.31 · 15.31 |
| W-E (src · dist) | 0/3 · 0/6 | 1/3 · 1/6, both engines | 15.76 · 14.98 |
| CANON | 2/3 · 2/3 | 2/3 · 2/3 (no rule declares the tile: the route's) | 15.16 |

No cell failed on janky frames and none hung. No `NOT-REPRODUCED` line was printed, and Playwright WebKit read every T-6 and T-7 pointer cell (PF-1 stays cured).

### 4.2 · Every scene row that moved

Both engines agree on every row unless split.

| witness | scene | HEAD → floor v2 | why |
|---|---|---|---|
| T-2 | `single`, `vertical`, `tabs`, `family-d-undeclared` | 5/7 → 7/7 each | FV-2: the `<br>` and the block child stay on one row, nothing cut |
| T-2 | `pill-icon`, `pill-badge` | 4/6 → 6/6 each | the same, beside an icon and a Badge |
| T-5 | `preset` 5/9 → 9/9; `preset-verbatim` 4/8 → 8/8; `preset-contents` 4/6 → 6/6; `single`, `vertical` 4/6 → 6/6; `specimen` 3/6 → 5/6; `specimen-verbatim` 3/8 → 7/8; `preset-input` 0/1 → 1/1 | floor v1's walk, reorder and editable-descendant rule (FV-1, FV-6) | |
| T-5 | `tabs` | 3/6 → 6/6 | TF-4 on the re-spelled `semantics="radio"` |
| T-5 | `tabs-retired` (dist) | 0/1 → 1/1 | FV-10 |
| T-5 | `preset-consumer-aria` | 2/6 → 4/6 | the walk; the consumer `role="option"` and four tab stops still stand (§6) |
| T-6 | `preset`, `specimen` | 6/11, 4/11 → 11/11 (Chromium); 1/5, 1/5 → 11/11 (Playwright WebKit) | FV-3's kick on keyboard, programmatic, calm-observer and pointer commits (peak 1.03-1.04 at 80-111 ms, bounce, settle 1.00-1.01); FV-8's PRT hover; floor v1's hover channel |
| T-6 | `preset-verbatim`, `specimen-verbatim` (unmigrated) | 8/12, 5/12 → 12/12 (Chromium); 8/12, 1/5 → 12/12 (Playwright WebKit) | the same on the shipped markup |
| T-6 | `card` | 6/11 → 2/11 | TF-5: the retired binding (FLOOR §3.2) |
| T-1 | `preset`, `specimen`, `preset-contents` and both `-verbatim` arms | gating cells → UNMEASURED "never past its rung" | FV-2 holds the unmigrated two-row items to the rung, so T-1 has no past-the-rung corner to read (§6) |
| T-1 | `chipcell` | 5/5 → 0/12 | Q-8 (a): the retired binding throws and paints the stadium |
| T-1 | `wrap` | 2/9 → 2/6, 3 UNMEASURED | the wrapping ToggleGroupItem stays one row; the pill Chip and the coarse Button still fail their bound |
| T-4 | `card` | 6/6 → 0/6 | TF-5, as in FLOOR v1 |
| T-7 | `preset`, `specimen` unmigrated (Playwright WebKit) | 0/1, 0/1 → 0/6, 0/7 | the four-state read now runs in Playwright WebKit; it reads the consumer's own paint, as Chromium does |
| W-A | `wrap` | 2/9 → 5/9 | the ToggleGroupItem stays at h/2 when lines are added, at fine, coarse and `--ui-scale` |
| W-B | the contract cells | 4/13 → 8/13 | the arrow cells W-B repeats from T-5 |
| W-E | `preset` | 0/1 → 1/1 | the unmigrated K1 tile is one row now |

**What stays RED, and whose it is.** Each is outside the floor by the registry's own terms:
- T-1, T-3, T-8, W-D, CANON: the tile, the routes';
- T-4 `specimen`: K2's unlayered `padding: 2px 2px 1rem`, FL-5, a consumer migration;
- T-4 and T-6 `f1`: a Button strip;
- T-5 `specimen`: FadingScroll's own tab stop (TF-6);
- T-5 `strip`, `c1`, `f1`: consumer compositions a route migrates;
- T-5 `preset-consumer-aria`: §6;
- T-7: no migrated arm.

---

## 5 · The bundle datum (R-9, PF-4)

`probes/bundle.sh` reads npm's `unpackedSize`, which is G-BUNDLE-RATCHET's measure (`scripts/verify-export-types.mjs:932-940`). Its `--dry-run` writes nothing. It also reads `dist/` and the JS gzip-9 total. HEAD and floor v1 were built in a second worktree at `05e5e1fb` (`src`-identical to `a11c6cc3`). Log: `logs/wt-bundle.log`, load 28.5-34.1.

| build | unpacked (packed files) | vs datum 2,919,057 | `dist/` | JS gzip-9 |
|---|---|---|---|---|
| HEAD | 2,919,057 B (841) | 0 | 2,535,888 B, 837 files | 328,472 B |
| HEAD + floor v1 | 2,922,724 B (841) | +3,667 | 2,537,228 B, 837 files | 328,889 B |
| HEAD + floor v2 | **2,929,522 B (843)** | **+10,465** | 2,541,208 B, 839 files | 329,941 B |

Floor v2 over floor v1: +6,798 B unpacked, of which `MIGRATION.md` is +2,818 B and `dist/` +3,980 B. The two new files are `guard-*.js` and `components/_shared/guard.d.ts`. JS gzip-9 is +1,052 B. HEAD measures the datum exactly, so the rebind is the floor's alone (Q-14).

---

## 6 · MIGRATION rows

All in the `## Unreleased — the selectable tile's floor` section of `MIGRATION.md`.

**Retired bindings, each with a detector:**
- `<Card selected>` (floor v1).
- `<Chip shape="cell">`, now with the shared message `[Chip] shape="cell" is not one of pill, icon.`
- `<SegmentedTabs semantics="toggle">`, now also an unknown-value `TypeError` in production.

**Behaviour and paint, nothing to change:**
- ring reach;
- arrows and reorder;
- the one-row pill and tab (`<br>` dropped, UA blocks inline, the development names and their `process.env.NODE_ENV` gate);
- `--selection-tile` (`none` everywhere until a route sets it);
- the commit pop (≈2.8 % at rest, 4.5 % under a loud driver, calm observers pop, reduced motion runs nothing, a consumer `transform` is overwritten while it runs);
- tone on ink, tint and perimeter, and `--selection-ink` for media;
- the contrast-more and forced-colours perimeter instead of a 2 px border;
- Up and Down across unequal heights;
- the hover rung's reduced-transparency step, which the Select trigger and the disclosure trigger share.

Every row states something a reader can check.

---

## 7 · Not built, carried, open

| id | what | why | owner |
|---|---|---|---|
| FV2-1 | **The unmigrated K2 stage is clipped in production with no signal**: `specimen` and `specimen-verbatim` item 0 is 207×36 with 4 content boxes cut, up to 24.64 px (Chromium) and 24.86 px (Playwright WebKit). K1 reads one row, nothing cut (`logs/probe-unmigrated-fv2.log`, load 15.6) | Q-5 (b) as defaulted: a pill refuses a second row structurally; development names it (§1 FV-7). A route's tile rule turns these items back into tiles | owner, Q-5 (R-1, R-8) |
| FV2-2 | `preset-consumer-aria`: a consumer `role="option"` and `tabindex="0"` on a ToggleGroupItem still override the engine (4 tab stops, `items option`) | not in FV-1..FV-10. Vue applies fall-through attributes after the item's own bindings. The cure is the item binding `$attrs` before the engine's attributes (`inheritAttrs: false`); unbuilt and unmeasured here | the next agglomeration (H3-12's row) |
| FV2-3 | Button's DEV-only retired-prop guard (`Button.vue:131`) is a second guard policy | outside D4. FV-10 names SegmentedTabs, Chip and a route's tile input | Button's owner, under the Q-5 ruling |
| FV2-4 | the `development` export condition (Q-5 (d)'s letter) | abrogated by contract-v2 (`vite.config.ts:38-55`); the floor reaches a consumer's development build through `process.env.NODE_ENV` instead, measured on `dist-dev` (§1 FV-7). A consumer whose bundler does not resolve `process.env.NODE_ENV` would throw a `ReferenceError`; Vite and webpack resolve it, as they must for Vue itself | owner, Q-5 |
| FV2-5 | the tile fact on an item outside a group | a style query reads an ancestor, so `--selection-tile` set on the item alone does not lift the item's own pill law. F's standalone-item reading is the one case; a ToggleGroupItem outside a group has no selection | F's route, if it needs it |
| FL-3 | fourier-analysis `EquationModeToggle.vue:62` (`semantics="toggle"`), which now throws | a consumer edit in its own tranche (E-6) | fourier-analysis |
| FL-5 | K2's unlayered `padding: 2px 2px 1rem` cuts the ring (T-4 `specimen`, 1.00 px; forced 0.50 px) | consumer CSS | the K2 migration |
| E-4 | real Safari | UNMEASURED (owner's safaridriver checkbox) in every cell, including the WebKit pseudo-element style-query miss of §1 and the SF-8 cure | owner |

**For the route seats.**
- Apply `floor-v2.patch` on HEAD.
- In the one tile rule, set `--selection-tile: flush` on the group, and declare the corner (`var(--radius-field)`), the column, the pad and the leading. Nothing else: the pill law, the perimeter, the flush plate, the Q-9 exemption and the names follow.
- Use `plated` for Q-2's other arm.
- Call `refuseUnknown` for a new public value.
- `--selection-perimeter` is no longer a route switch.
