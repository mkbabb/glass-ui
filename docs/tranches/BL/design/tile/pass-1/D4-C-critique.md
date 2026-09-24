# D4 · pass 1 · D4-C · critique: selection as a behaviour

| field | value |
|---|---|
| seat | D4-C adversarial critic. I did not author the family, its spec or its prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree at `65a88cae`. `git diff --stat 91dbcbd8 HEAD -- src tests demo scripts vite.targets.ts package.json` is empty. `D4-C-proto.patch` applies cleanly (`git apply --check` exit 0; one trailing-blank-line warning) |
| worktree | `…/scratchpad/D4/p1/D4-C-crit/wt`, patch applied, `node_modules` symlinked (the checkout has no `tests-visual/node_modules`). Plants were written into worktree files and restored by copy. The restore check hashes `git diff` plus every file under the untracked `src/components/selection/` and `tests/components/selection/`. My first plant script hashed `git diff` only, which cannot see untracked files, and one plant leaked into the register file. I caught the leak, restored the file from the patch (`cmp` identical to the patch's copy on all 7 new files), deleted the contaminated bundle and rebuilt every plant (`plants.sh`, `RESTORED-IDENTICAL`). Removed with `git worktree remove --force` before return |
| harness | the worktree's copy of `harness/`, which carries the family's `scenes.mjs` arm (from the patch). Builds `card` (Card `size="sm"`, `tier="wash"`, `:shadow="false"`), `bare` (`D4C_TILE=bare`, flush options), `dev` (`--dev`) and one bundle per plant. A separate probe page (`crit/app/App.vue`, `crit/build.mjs`) holds five scenes the battery does not have |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, headless, 1000×900 at DSF 2. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| load | load average 72 at the worktree add, peaking at 219 during the battery. Every number is a settled static read or a real input event |
| scratch | `C=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-C-crit`: `logs/`, `out/runs/{card,bare}/`, `out-plants/`, `crit/`, `shots/`, `plants.sh`, `plant2.sh`, `plant3.sh`, `shots.mjs` |

## 0 · Verdict

**BANK, convergence 50 %.** The prototype is honest. Every number it reports reproduces cell for cell in both engines, on both arms, and the gates it claims run green on a clean build. The witnesses it claims green catch real plants of their own kind (T-2, T-3's edge, T-5, T-8 and W-C all go RED). The mechanism holds up and can be reused: the geometric cross-axis walk, SegmentedTabs moving to `radiogroup`, and the deletion of Card's `selected` arm with its after-`$attrs` bindings.

It is BANK and not ADVANCE for four reasons:

1. **The commit is keyed on focus, not on commit.** Tabbing into a group whose choice is already made plays the `selection-commit` pop on the selected item every time. A choice the consumer's model makes (keyframes.js going from `NO_PRESET` to a matching preset) gets no pop.
2. **The paint it adds is unwitnessed.** Zeroing every `--selection-fill` still passes T-3 18/18. With the pop deleted, T-6 still passes 30/30.
3. **The contracts are DEV-only, and production is silent.** An interactive child and a consumer `data-state` binding each break the option with no console output. `type="multiple"` over a Card or a div produces four unnamed `generic` nodes with no pressed state, and neither guard fires, in DEV or in production.
4. **The gestalt reads as a web radio-card, not an iOS-27 option.** The value.js strip loses its flood and its circle.

The multi-line tile problem is also dominated on size. D4-C spends +746 −567 across 39 files: a new subpath, five plate arms, a global `@property`, a restated `transition` union and four lines of slot plumbing per site. D4-D, by its own critique (`D4-D-critique.md`, ADVANCE 55 %), answers the same tile with one declared prop. I did not measure D4-D myself.

**Re-trigger.** Re-open D4-C as the winner if a consumer needs a one-of-N set whose options are Cards or Surfaces rather than pills (the card board, a plan picker), or if the winning family has to express a Surface option. On those sites the plate truly varies, and "the container owns the plate" is the thesis. Whatever wins can harvest the grid walk and the SegmentedTabs ARIA now; neither needs D4-C.

## 1 · Step 1: the failures I expected a tile design to hide (written before reading the spec)

From PORTFOLIO §0-2, §7 and HARNESS.md only:

1. **A carrier that passes bare and dies in the shipped composition.** The consumer already spends `outline` and `border` on its own selection (§1.3 item 5), so a register edge on `border-color` loses to consumer paint on the verbatim scene.
2. **Correct by composition means correct only where composed.** Every site that keeps ToggleGroupItem or a pill Chip still wraps into a stadium (T-1 `wrap`).
3. **A grid-arrow engine change that moves the dock or SegmentedTabs.**
4. **DEV-only refusals.** The library ships the broken behaviour in production (E-2).
5. **A family witness shaped to the family.** A cell that passes whenever the family's own marker is present.
6. **A decorative paint no witness reads.** A fill at 1.2-1.4:1 beside an edge that carries T-3, so the fill could be dead and nothing fails.
7. **A commit that T-6 cannot tell from a repaint** (HARNESS §6: any colour transition passes).
8. **The ToggleGroupItem WebKit hover hang** carried into any design that keeps the pill.
9. **Interactive content inside a radio** (a GalleryCard-class option).
10. **A second selection path**: a hand-painted selected state somewhere the primitive does not reach.

Items 1, 2, 4, 5, 6, 7, 8, 9 and 10 turned up (§3); item 3 did not (T-2 12/12, the `tabs` cells unchanged).

## 2 · Re-run and plants

### 2.1 The battery, re-run (`logs/run-card.log`, `logs/run-bare.log`)

| witness | prototype claims (`r2` / `r2-bare`) | my `card` build | my `bare` build | engines |
|---|---|---|---|---|
| T-1 | FAIL 6/9 | FAIL 6/9 | FAIL 6/9 | Chromium and Playwright WebKit |
| T-2 | PASS 12/12 | PASS 12/12 | not run | both |
| T-3 | PASS 18/18 | PASS 18/18. Carrier area light / dark / PRT: preset 324.50 / 341.00 / 328.00 (bar 269), card 552.00 / 567.00 / 559.75 (bar 294), Chromium. Playwright WebKit preset 416.75 / 430.00 / 420.00, card 455 / 470 / 462. Fill 1.26-1.38:1 | PASS 18/18 | both |
| T-4 | FAIL 12/24 | FAIL 12/24. `preset-verbatim` 0.00 px every side; `specimen` 0.50 px top and left in Playwright WebKit | FAIL 12/24 | both |
| T-5 | PASS 44/44 | PASS 44/44 | not run | Chromium (CDP) |
| T-6 | PASS 30/30 | PASS 30/30 in both. Info cell `single`, Playwright WebKit: `engine failure … no answer within 120 s (hung)` | not run | both |
| T-7 | FAIL 8/12 | FAIL 8/12 | not run | Chromium |
| T-8 | PASS 16/16 | PASS 16/16, real Safari UNMEASURED | PASS 16/16 | Chromium + Playwright WebKit |
| W-C | PASS 13/13 | PASS 13/13 | PASS 13/13 | Chromium |
| preset-verbatim T-3 (info) | 0.00 / 174.25 / 0.00 | 0.00 / 174.25 / 0.00 px² (Chromium), 0.00 / 165.75 / 0.00 (Playwright WebKit) | | |

**Gates.**
- `npm run typecheck` in the worktree: the first run, before a library build, exited 2 on `FourierField.smoke.test.ts` (`Cannot find module '@mkbabb/glass-ui/fourier-math'`, a self-import that resolves through `dist`). After `npx vite build` (exit 0; it emits `dist/selection.{js,d.ts}`, and `--selection-fill` is in `dist/glass-ui.css`), typecheck exits 0 with 0 errors.
- Touched vitest suites, run before the library build (`logs/vitest-touched.log`): 43 files, 622 passed, 6 failed. Five of the six failures need a built `dist-demo`/`dist` or a clean tree (boot-graph ×3, backdrop-prefix dist arm, comment-ratio "free of lane dirt"). The sixth is `glass-subtlety` "DISCOVERS its hosts", a 5000 ms timeout at load average 150. None of them is in a file the patch touches. I did not re-run the whole suite; the prototype's 2320-pass run stands unreplicated by me.

### 2.2 One planted violation per claimed-green witness

Each plant is built from the prototype plus one edit (`plants.sh`, `plant2.sh`, `plant3.sh`), and run in Chromium unless marked (`logs/plants.log`, `logs/nofill-all.log`).

| witness | plant | result | reading |
|---|---|---|---|
| T-2 | register corner at (0,1,0): `[data-selection-item] { border-radius: var(--radius-ctx) }` | PASS 12/12 | the plant was inert: `.toggle-group__item`'s own `--radius-pill` outranks it, so no paint changed. Not a witness fault |
| T-2 | `[data-selection-item][data-selection-item][data-state] { border-radius: var(--radius-field) !important }` | **FAIL 4/12**: `single` 16.00 on 36 (÷h/2 0.89), `vertical` 16.00 on 40 (0.80); the `tabs` cells pass (SegmentedTabs is not stamped) | caught |
| T-3 | edge at the canon's `--ink-perimeter` instead of the full tone | **FAIL 13/18**: preset light, card light and PRT 0.00 px²; strip light 25.25, chipcell light 38.25 | caught |
| T-3 | **every `--selection-fill` write set to `transparent`** (the five arms paint nothing) | **PASS 18/18**, fill 1.00-1.02:1 in every cell | **the fill and its five arms are invisible to T-3** (§3 C-2) |
| T-5 | cross-axis walk off (`crossStep` returns false) | **FAIL 36/44**: preset, specimen, card, surface Up/Down do not move | caught |
| W-C | the same | **FAIL 9/13** | caught |
| W-C | Card binds `tabindex="0"` after `$attrs` again (the UIA-F-43 class) | **FAIL 12/13**: card `tab stops 4`. The cell "item's own stamp" **PASSES** (`role radio · tabindex 0 · group-stamped true`) with Card declaring its own tabindex | caught by the tab-stop cell only; the own-stamp cell passes on any stamped item (§5 item 3) |
| T-8 | a WebKit-only `@supports (-webkit-touch-callout: none) or (font: -apple-system-body)` rule puts stamped items back on `9999px` | **FAIL 14/16**: Playwright WebKit T-1 preset 30.79 → 40.88 → 50.96 (÷h/2 1.00), specimen 50.08 → 68.23 | caught |
| T-6 | `selection-commit` animation deleted | **PASS 30/30** | **the pop is invisible to T-6** |
| T-6 | register `transition` reduced to `scale` only, pop deleted (colour snaps) | **FAIL 29/30**. Only `chipcell` fails. Preset, specimen, card and surface pass the commit cell on `CSSTransition:opacity@item::before` at 24-51 ms | the commit cell is nearly vacuous: an unrelated 24 ms `::before` blip reads as "the commit" |
| T-6 | every fill transparent | **FAIL 28/30**: `card` hover light 0.00 %, PRM 0.00 %. Preset 3.53 %, specimen 2.70 %, surface 3.15 % still pass on the edge lift | the one thing the fill carries: Card's hover light channel |

## 3 · Counterexamples (measured)

Probe page `crit/`, production build unless marked (`logs/probe-prod-chromium.json`, `logs/probe2-{prod,dev}.json`), Chromium.

- **C-1 · The commit pop fires on focus, not on commit.** Scene `pop`, four Card options with `b` already chosen. A real Tab from the `before` sentinel lands on `b`, the model stays `b`, and `b.getAnimations()` holds `selection-commit` `running`. Shift+Tab out and Tab back in runs it again. A programmatic commit (`model = "d"`, focus elsewhere) runs only the 180 ms `border-*-color` and `--selection-fill` transitions and no pop. The spec keys the pop on `[data-state="on"]:focus` "so a page that loads with a choice made does not pop". What it actually does is pop on every keyboard entry, and it misses every commit that does not move focus. keyframes.js `NO_PRESET` → preset is exactly that case.
- **C-2 · Five arms, a global `@property` and a restated `transition` union paint something no gate reads.** With every fill zeroed, T-3 stays 18/18 and T-6 loses only the card's hover light (§2.2). The edge carries selection on its own, as SF-3 predicts. So the plate contract the spec calls "nobody enforces" guards a paint whose only measured job is one hover cell. Either the fill is decoration, and the arms are P-1 weight, or it is a carrier, and a witness must read it. The spec takes neither position.
- **C-3 · N-of-M on a non-button container is inaudible.** Scene `multi` (`type="multiple"`; items 1-2 Card, 3-4 `div`). The group reads `role="group"`. Each item carries `aria-pressed` with no `role`, and the CDP AX node for every item is `generic`, name `""`, no `pressed` property, focusable. Chromium drops `aria-pressed` on a generic. Neither DEV guard fires (`multi_logs: []` in DEV and production). The spec lists X-4 as landed ("`type="multiple"` carries the same anatomy") and names V2 as a `type="multiple"` site; the anatomy lands, the semantics do not. Only a `<button>` host is correct.
- **C-4 · A consumer binding written after `v-bind="itemProps"` erases the selected paint, silently in production.** Scene `override` (`:data-state="selected ? 'picked' : 'idle'"` after `itemProps`). After a real click on `c`: model `c`, `aria-checked="true"`, `data-state="picked"`, and the border stays the seam `oklab(… / 0.16)`, so no tone edge. Production logs nothing. DEV throws `the option's stamp did not land on <div>: data-state="on" (found "picked")`.
- **C-5 · An interactive child ships broken in production.** The same scene's option `b` holds a `<button>`. Production Tab order: `inner-button → c → after`, so the button is a stop ahead of the group's own stop, with no console output. DEV throws the named refusal from the mounted and updated hooks. This reproduces the spec's counterexample 3.
- **C-6 · The roving order is stale after a keyed reorder.** Scene `pop`: reverse the `v-for` list after mount, so the DOM order is `d, c, b, a`. Click `d`, then press ArrowRight twice: focus goes to `a`, then `b`, where the DOM order says `c`, then `b`. `ordered` sorts by `compareDocumentPosition` inside a `computed` that tracks only the registry, and a keyed move does not re-register. This is inherited from HEAD's `ToggleGroup.domSorted`. D4-C carries it to every container that becomes an option.
- **C-7 · Refuted: `useAttrs()` reactivity (the spec's counterexample 8).** Scene `attrs`: bumping a counter bound as `:data-count` and `:title` on `SelectionItem` reaches the element at once (`"0","t0"` → `"1","t1"`), before any selection change. The slot re-renders when attrs change. Close that gap.
- **C-8 · A second selection path in the patch itself.** `demo/stories/data/search.vue` (an `aria-activedescendant` listbox) writes `role="option"`/`aria-selected` on a Card by hand, plus a scoped `.search-result[aria-selected="true"]` border rule. The behaviour covers radio and pressed, not listbox options, so the first listbox after Card lost `selected` hand-paints its own selected state.
- **C-9 · The pill has two ring rules.** `ToggleGroupItem` keeps `focus-ring` and gains the register's `[data-selection-item]:focus-visible { outline … }`. The values agree today, but that is two sources of one fact (P-3). The pill also keeps `.toggle-group__item[data-state="on"]` ink and weight rules beside the register's state, so the pill has two state registers.
- **C-10 · The transition list the register imposes** (scene `trans`, computed style). Plain Card `box-shadow, border-color` at 0.18 s; plain Chip `scale 0.3s` plus colours at 0.2 s. Every stamped host (Card, Surface, Chip, pill) computes the same eight-property list, with `scale` at 0.12 s. The Chip's 0.3 s `ease-cartoon-punch` scale is gone. A host that animates a ninth property (a `translate` lift, a `filter`) has it snap once stamped, with no error.

## 4 · Gestalt (the prototype's captures and my own, `shots/`)

I read `gestalt/tiles-after-{preset,bare-preset,strip,specimen,preset-verbatim}-*.png` and `crop-after-*`, then my own `shots/chromium-{card,bare}-{preset,specimen,strip,card}-{light,dark}-{rest,focus-selected,hover2}.png` and the Playwright WebKit rests.

- **Card-like option: yes.** At 16 px, both the Card arm and the flush arm read as cards, not lozenges. The flush arm (`shots/chromium-bare-preset-*`) reads as one card holding four options; the Card arm reads as four grey cards in a card (SF-25).
- **Selected unmistakable without colour alone: yes, by contrast shape.** A 1 px full-ink edge plus a darker fill; it survives greyscale. In light it is a near-black line around a pale card, the heaviest mark on the page (`tiles-after-preset-light`, my `chromium-card-card-light-rest`). In dark it is a white hairline that reads well.
- **Focus apart from selection: yes, but subordinate.** Focus on the selected tile is a grey 0.48 ring outside the black edge (`shots/chromium-card-preset-light-focus-selected.png`). It reads as a double outline, weaker than the selection it sits beside.
- **Uncluttered and glass-idiomatic: partly.** The flush arm is quiet. The Card arm stacks a second veil. Nothing about the selected state is glass: no lift, no specular, no flood. It is a flat fill and an outline, like a shadcn RadioCard.
- **iOS-27 grade: no.** The commit is a 180 ms colour change plus a 1.025 settle that is keyed to focus (C-1). The strip (V1) regresses from the HEAD accent flood and circles to flat 44 px squircles with a black edge (`tiles-after-strip-light`, `shots/chromium-card-strip-dark-hover2`). That breaks D-2 for the one consumer that already had an iOS-grade commit.
- **The shipped kf tile is unchanged** (`tiles-after-preset-verbatim-light`): the consumer's dashed violet outline, and no register edge.

## 5 · The checklist

1. **Vacuous convergence.** Partly. The prototype "matches the spec cell for cell" because it ran the research seat's code through the research seat's scene arm. That is replication, not independent evidence. My re-run is a third replication on the same `scenes.mjs` family arm. The T-cells on preset, specimen and strip therefore measure the family's own transcription of how keyframes.js and value.js would migrate (SelectionGroup over Card `wash`, `shadow=false`), not a consumer that has migrated. The prototype says so by labelling `preset-verbatim` as consumer paint.
2. **Spec cites itself.** SPECS §C.3 cites D4-C §3, which cites run `c5`, built from the same probe the prototype re-implements. Every "measured" row in §C.3 has a single origin. The shared facts (SF-3, SF-4, SF-8) are independent: four seats measured them.
3. **Gates that cannot fail.** Three found.
   - W-C's "item's own stamp" cell is `stampedByGroup || (role null && tabindex null)`: it passes on any stamped item, including a Card that declares `tabindex="0"` itself (§2.2).
   - T-6's commit cell passes on a 24 ms `::before` opacity blip with the register's colour snapping (§2.2).
   - T-3 cannot see the fill: 18/18 with every fill transparent.

   None of them hides a failure the family claims, but together they mean the family's two D-2 claims (the pop and the "commit flood") and its five arms rest on no witness.
4. **Elegant-reduction trap.** Yes, twice.
   - "The container owns the shape": the best nested option has no container (the spec's own counterexample 1), so the register's `:where([data-selection-item]) { border-radius: var(--radius-ctx) }` plus `--radius-ctx: var(--radius-field)` is a declared tile shape under another name.
   - "One register": the register cannot write the fill at any specificity, so it needs five arms, and it cannot leave `transition` alone, so it restates an eight-property union. That is two plate contracts with no gate.
5. **Legacy aliases, shims, dual paths.**
   - Card's `selected` is a clean delete (E-1).
   - Chip's `staticAttrs` becomes pass-everything when `data-selection-item` is in attrs. That is a backdoor: any consumer who writes the marker on a static chip gets `role`, `tabindex` and `on*` through, bypassing the refusal the filter exists for.
   - Dual paths: the two ring rules and two state registers on the pill (C-9), and the hand-painted listbox selection in `search.vue` (C-8).
6. **Masked fallbacks.**
   - The contract guards are DEV-only, and production ships C-4 and C-5 silently (E-2: the primary must fail loud).
   - The fill can be dead while the edge paints, and nothing notices (C-2). By SF-3 the edge is the primary, so this is not strictly a primary masked by a fallback, but the arms are then P-1 weight.
7. **Unverified gestalt.** The prototype's captures predate its pause. Mine are fresh and agree with its reading (§4). My own reading adds the strip regression and the heavy light edge as D-2/D-3 misses.
8. **Consumer-less substrate.**
   - `SelectionGroup` has one in-library consumer (ToggleGroup) and one demo (`display/card.vue`), so it is not substrate without a consumer.
   - Its multi-line option path has zero external consumers until keyframes.js migrates K1/K2 (E-6).
   - The Chip arm serves V1 only, and value.js must cross three majors first (SF-22).
   - Chip `shape="cell"` has zero consumer sites (SF-19), yet the harness migrates V1 onto it (the strip scene renders `shape="cell"` where the site ships `shape="icon"`).

## 6 · Convergence and open gaps

**50 %.** The prototype runs; every claim it makes reproduces; five of the six claimed-green witnesses catch a plant of their kind, and T-6 catches one of three. What remains open is below.

**Open gaps (exact):**
1. C-1: the commit pop is keyed on `:focus`. It fires on every Tab entry and never on a commit that does not move focus (a programmatic model change).
2. C-2: the fill layer, the five arms, the global `@property --selection-fill` and the restated `transition` union carry nothing T-3 reads, and only the card's hover light in T-6. Delete them, or give them a witness.
3. C-3: `type="multiple"` over a non-button container produces unnamed `generic` nodes with no pressed state, and no guard fires. X-4 is not landed.
4. C-4, C-5: the stamp readback and the content refusal are DEV-only. Production ships a lost selected paint and an option holding a tab-stop button without a sound (E-2).
5. C-6: roving order is stale after a keyed reorder (inherited from HEAD ToggleGroup, now on every container).
6. C-8: listbox options (`aria-selected`) have no path; `search.vue` hand-paints its own selected edge.
7. C-9: two ring rules and two state registers on the pill (P-3).
8. The Chip `staticAttrs` marker backdoor (§5 item 5).
9. C-10: the host transition union; a host property outside the union snaps once stamped.
10. The V1 strip loses its flood and its circle (D-2 regression); the harness moves V1 from `shape="icon"` to `shape="cell"`.
11. The full-tone 1 px edge reads heavy in light. Edge weight or tone was not measured against a lighter 2 px edge.
12. No witness reads the iOS-27 commit (SF-10). W-C's own-stamp cell cannot fail on a stamped item.
13. T-1 `wrap` ×3: control-role holders still track content (untouched by the family).
14. T-4 `specimen` 1.00 px Chromium / 0.50 px Playwright WebKit: consumer port clearance (SF-6).
15. T-4 and T-7 `preset-verbatim`; T-3 `preset-verbatim` 0.00 px² in light and PRT: consumer paint until keyframes.js deletes `SpringPhysicsFacet.vue:197-215`.
16. The ToggleGroupItem hover hang in Playwright WebKit (T-6 `single`, 120 s): SF-8, not understood.
17. A deselectable single (X-6: kf `NO_PRESET`, fourier F5) is unspecified.
18. Real Safari: every cell UNMEASURED (owner's safaridriver checkbox).

Closed by this seat: the spec's counterexample 8 (`useAttrs()` reactivity) is refuted (C-7). The unit-suite and typecheck gap is closed by the prototype, and I replicated typecheck (exit 0 after the library build) and the library build (exit 0).

## 7 · Artefacts

Under `C=/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-C-crit/`:
- `logs/`: `run-card.log`, `run-bare.log`, `plants.log`, `nofill-all.log`, `probe-prod-chromium.json`, `probe2-prod.json`, `probe2-dev.json`, `typecheck.log`, `typecheck2.log`, `lib-build.log`, `vitest-touched.log`, `wt-state-{before,after}.sha`.
- `out/runs/{card,bare}/*.json`: every witness cell. `out-plants/<plant>/`: the planted runs. `out/builds/`: the bundles (`card`, `bare`, `dev`, `p-*`).
- `crit/`: the probe page (`app/App.vue`, `build.mjs`, `probe.mjs`, `probe2.mjs`) and its `prod`/`devb` builds.
- `shots/`: my captures, Chromium and Playwright WebKit.
- `plants.sh`, `plant2.sh`, `plant3.sh`, `shots.mjs`.

The worktree was removed with `git worktree remove --force`; `git worktree list` shows no D4-C-crit entry.
