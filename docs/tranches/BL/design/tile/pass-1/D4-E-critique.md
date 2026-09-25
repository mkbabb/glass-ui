# D4 · pass 1 · D4-E · critique (no multi-line selectable)

| field | value |
|---|---|
| seat | D4 pass 1, adversarial critic for family D4-E. I did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity (Opus) |
| HEAD | worktree seeded at `ad02b0f8`; `git apply --check` of `pass-1/D4-E-proto.patch` (shasum `a5b42334…70e`, the same as the prototype reports) clean, applied |
| engines | Chromium 149 and Playwright WebKit 26.5, headless, from `glass-ui/node_modules/playwright`. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-E-crit/` (below: `$K`). Worktree `$K/wt`, removed before return. Harness: a private copy of the prototype's private harness (`$K/harness`, E scenes plus its two fixes), plus my probes `cx.mjs`, `none.mjs`, `focus.mjs`, `mountlog.mjs`, `shots.mjs` and one extra scene (`hostx`). Plant sources in `$K/pl/<id>/src`, plant harness copies `$K/harness-p7`, `$K/harness-pwe`. Logs `$K/logs/`, cells `$K/out/runs/`, captures `$K/cap/` |
| verdict | **RETIRE** as a family center, at **30 %** convergence. The pieces that are family-independent (radio semantics on SegmentedTabs, `focus-ring` on tabs, the full-ink selected edge measurement, the Card `selected` deletion) carry to whichever family advances (§7) |

## 1 · STEP 1: the failures I expected a tile design to hide (written before reading SPECS §D4-E or the prototype)

From PORTFOLIO §0-2, §7 and HARNESS.md only:

1. **Convergence by rewriting the consumer.** The born-RED rows are consumer compositions. A family that authors the "migrated" composition itself can turn T-3, T-7 and its own witness green without the library answering the consumer as it ships.
2. **A self-paired T-7.** T-7 compares a verbatim scene to its bare pair. If the family writes both, they can be the same markup.
3. **A DEV-only guard that no consumer runs.** HARNESS `--dev` aliases `src`. A library's `import.meta.env.DEV` branch may be compiled out of `dist`, so a green DEV cell would say nothing about keyframes.js.
4. **A "loud" failure that is really a silent fallback** (E-2): a collapse, a clamp or a crush that paints something plausible where the primary died.
5. **The problem answered by forbidding it.** The owner asked for card-like tiles (N-9). "No multi-line selectable" can satisfy T-1 by removal and never give the owner a card.
6. **A fill-only selected state.** SF-3 at HEAD: 1.20 / 1.23 / 1.00. Any green T-3 has to rest on an edge or a mark, and that edge must not read as a focus ring.
7. **The ToggleGroupItem hover.** 0.00 % light channel and a Playwright WebKit crash at HEAD (HARNESS §4). Any family that keeps the host inherits both.
8. **Dead gate arms.** A lock that pins the block size makes "grows past its rung" unfalsifiable.
9. **Unanswered census sites** (the specimen gallery OD-7, V2, F1) moved into "the consumer's to change".

Every one of these shows up below except that item 6's carrier is real (it is load-bearing, §3).

## 2 · Reproduction (my runs, patched library, E compositions, production build `e` unless marked)

| witness | Chromium | Playwright WebKit | prototype said | agrees |
|---|---|---|---|---|
| T-2 | PASS 20/20 | PASS 20/20 | 20/20 · 20/20 | yes |
| T-3 | FAIL 13/21 (E cells 12/12: preset p95 3.57 / 5.11 / 3.46, preset-tg 5.82 / 8.36 / 8.10, specimen 4.16 / 5.82 / 4.60, strip 7.18 / 8.61 / 8.11) | FAIL 13/21 (preset 11.57 / 15.78 / 16.20; PRT is the forced level-0 path) | 13/21 · 13/21 | yes, to the digit |
| T-4 | FAIL 20/28 (E cells whole, 2.00 px; specimen 2.00-3.00) | FAIL 20/28 | 20/28 · 20/28 | yes |
| T-5 | FAIL 28/42 (E scenes radiogroup / radio, 1 stop, axis arrows move and check) | (Chromium only) | 28/42 | yes |
| T-6 | FAIL 19/31 (preset SegmentedTabs 6/6: hover light 73.68 %, PRM 73.68 %, scale 1.015, press 0.97, commit 200 ms colour + 220 ms press, coarse 0.61 %; preset-tg and specimen hover light 0.00 %, p95 1.04 / 1.02, PRM 0.00 %) | FAIL 17/31 (preset 6/6, hover light 74.10 %; preset-tg and specimen hover light 0.00 % and "Page crashed" on both) | 19/31 · 17/31 | yes |
| T-7 | PASS 12/12 | (Chromium only) | 12/12 | yes (but see §4 CX-8) |
| W-E production | FAIL 4/9 | FAIL 4/9 | 4/9 · 4/9 | yes |
| W-E DEV (`e-dev`) | FAIL 6/9 | FAIL 6/9 | 6/9 · 6/9 | yes |
| units | `vitest` on the six re-pointed files (Card, segmented-tabs, ToggleGroup, search-contracts, tabs-seam, radius-role-canon): 6 files, 111 passed, 1 expected fail | | | |
| library build | `vite build` in the worktree, exit 0, `glass-ui:ready` | | | |

Logs: `$K/logs/run-e.log`, `run-edev.log`, `t6-e-*.log`, `lib-build.log`.

## 3 · Planted violations (one per witness the prototype claims green)

Each plant is one edit to a copy of the patched `src` (or of the scene file for T-7 and W-E), built with the same harness.

| witness | plant | result | caught |
|---|---|---|---|
| T-2 | `border-radius: 6px !important` on `.toggle-group__item` (`pl/t2`) | FAIL 8/20: preset-tg, single, vertical at 6.00 px (÷h/2 0.30-0.33); the SegmentedTabs cells stay PASS, which is right (the plant does not touch them) | yes |
| T-3 | the two full-ink edges deleted: `border-color: var(--foreground)` on `[data-state="on"]` and `border: 1.5px solid var(--foreground)` on the indicator (`pl/t3`) | FAIL 1/21: preset-tg 1.20 / 1.23 / 1.00, specimen 1.19 / 1.22 / 1.00, strip 1.20 / 1.22 / 1.00, carrier area 0.00 px² in every cell | yes. The edge is the entire carrier; the fill under it is still SF-3's 1.2:1 |
| T-4 | `focus-ring` removed from the tab (`pl/t4`, HEAD's state) | FAIL 16/28: preset and preset-verbatim fail in dark (UA `outline: auto 1px`, 1.00 px per side) but **pass in light** (2.00 px) | half. The witness cannot tell the UA auto outline from the ring in light. A harness weakness, not E's |
| T-5 | the SegmentedTabs group role back to `"group"` (`pl/t5`) | preset and tabs read `group` of `button` with `aria-pressed`: FAIL | yes |
| T-6 | the tabs' 8 % hover plate set to 0 % (`pl/t6`) | FAIL: preset hover light 0.00 % (p95 1.00:1), PRM 0.00 %; scale, press and commit still PASS | yes. The tabs' light channel is the 8 % plate and nothing else |
| T-7 | a verbatim branch added to the preset scene with `.kf-seg .segmented-tab { border-radius: 4px }` (`harness-p7`) | FAIL 8/12: `9999px → 4px` on all four corners in all four states | yes, once the scene has a verbatim branch at all (§4 CX-8) |
| W-E cell 1 | a two-row ToggleGroupItem (name over a `0.5 s` caption, `flex-direction: column`) in preset-tg (`harness-pwe`) | FAIL: "4 not one line … 2 rows" in both DEV and production | yes |
| W-E refusal | the same plant: mount-time console errors (`mountlog.mjs`) | DEV alias build: 4 refusals in Chromium, 4 in Playwright WebKit. Production: 0 and 0 | only in a build no consumer runs (CX-1) |

## 4 · Counterexamples

**CX-1 · The refusal is compiled out of the library that consumers install.** `one-line.ts` guards on `import.meta.env.DEV`. Vite's library build replaces that with `false`, and the branch is dropped. Measured: the patched worktree's `dist/` (223 files, built here) contains the refusal text in 0 files, and the ToggleGroup chunk has 0 `ResizeObserver` / `MutationObserver` / `console.error`. The same holds for the existing idiom the spec cites: Button's retired-prop guard (`Button.vue:131`) is absent from the checkout's `dist/button-*.js` and from keyframes.js's installed `node_modules/@mkbabb/glass-ui/dist`. So keyframes.js, value.js, fourier-analysis and chicago never see the refusal in their own dev servers. The harness's `--dev` build aliases `@glass` to `src` and is the only configuration where W-E's refusal cells can pass. The "library refuses" half of the family's born-RED witness is green only in a build nobody ships (expected failure 3).

**CX-2 · SegmentedTabs now invents a selection.** The patch deleted `if (!responsiveCfg.value) return model.value` from `stripValue` (`useTabResponsive.ts`), so a model that matches no option falls back to the first enabled one. `none.mjs`, preset scene, `sel=none` (model `__none__`), both engines: `smooth` has `aria-checked="true"` and `data-active`, and the readout under it says "custom · no preset". The same probe with HEAD's four tabs files swapped in (`pl/headtabs`): no tab active in either engine. This is the keyframes.js `NO_PRESET` case (`SpringPhysicsFacet.vue:140`) that the spec lists as open. It is worse than open: the patch paints a false answer, and assistive tech announces "smooth, checked". It is a regression the prototype did not report (its T-4 JSON reads `preset sel=none · item 0 (selected)` without comment).

**CX-3 · The measured collapse fires on a strip that fits.** `cx.mjs`, scene `hostx`, a 420 px column, the four `tabs` options (286 px strip). Inside a `display: contents` wrapper, and inside an inline `<span>`, the strip mounts as an 87.5 px Select and never expands, in both engines. `hostRoom()` reads `parentElement.clientWidth`, which is 0 for both. A plain block parent keeps the strip (285.9 wide). `display: contents` wrappers are ordinary in Vue component trees.

**CX-4 · The measured collapse misses a strip that overflows.** Same scene: a `class="w-full"` strip in a 420 px host whose labels grow after mount (a reactive label change, like an i18n switch or a web font landing). After the change, `scrollWidth` is 870 (Chromium) and 871 (Playwright WebKit) against `clientWidth` 420, and the strip does not collapse and logs nothing. The ResizeObserver watches border boxes, and the strip's box did not change size; the `watch([subset, vertical])` resets the flag but never calls `measure()`. In paint (`cap/cx-chromium-crop.png`) two of the four options hang outside the track with no plate. The spec's "measured overflow, never a breakpoint" holds only when the overflow also resizes the strip.

**CX-5 · The collapse is a masking fallback (E-2).** `specimen-st` is the spec's own K2 variant. Under the patch it becomes a name-only Select with every portrait gone, and nothing is logged: the DEV refusal does not fire (the options are one line), the collapse is silent by design, and the page paints a plausible control. The primary (the filmstrip) is dead and the fallback paints over it. The prototype records this as a spec contradiction (B-1) and the FamilyTabs scroller collapse (B-11). It is the E-2 pattern: nothing fails loud.

**CX-6 · The chicago site is not "untouched".** SPECS §E.1 says C1 needs no edit. `chicago/src/App.vue:95` passes `:responsive="{ breakpoint: '640px', ariaLabel: 'Filter apartments' }"` (read-only grep; chicago pins `@mkbabb/glass-ui` 10.1.0). The patch deletes `breakpoint` from `SegmentedTabsResponsive`, so chicago's adopt is an excess-property type error, and its behaviour changes from a 640 px fold to the measured rule. Under E-6 this belongs in chicago's own tranche, but the spec's "no edit" claim is false.

**CX-7 · The family answers the owner by refusing his request.** N-9 (PORTFOLIO §0): "The smooth and bouncy pills … are too rounded and should be more card like." E keeps the stadium on every option (T-2 20/20, `--radius-pill` untouched, the canon test passing "as written") and moves the content out. T-1 goes green by removal, which the portfolio itself flagged (§7: "T-1 by removal, not by rule"). The research seat says it (§1.2): "N-9's 'fixed at the root' is met for the corner. It is not met for the owner's picture." The owner's picture is the problem.

**CX-8 · T-7 is green by construction on the preset scene.** In the private harness the E `preset` branch has no `verbatim` arm: `preset-verbatim` renders the same markup as `preset` (the only `verbatim` bindings are on the specimen plates and the strip items, and those add content-ink rules only). T-7 12/12 compares the family's composition with itself on four of the twelve cells and with ink-only variants on the other eight. It says nothing about keyframes.js, which today paints `border-radius: var(--radius-field)` on both tile sets (SF-14). The witness does work (the `harness-p7` plant fails 8/12), so the defect is in the scene, not the script (expected failure 2).

**CX-9 · A dead arm in both the guard and the witness.** With `block-size: var(--toggle-group-item-size)`, `offsetHeight` always equals `min-block-size`, so `one-line.ts`'s `rung > 0 && h > rung + 0.5` cannot fire on ToggleGroupItem. On SegmentedTabs `min-block-size` is 0, so the rung arm is skipped outright. W-E cell 1's `r.h > r.rung + 0.5` is dead for the same reason (every E item reads "1.00 rungs"). Only the `rows()` heuristic can refuse or fail, and it has two known blind spots (a line inside a graphic's band, a line beside a glyph) (expected failure 8).

**CX-10 · Neither new mechanism has a durable test.** `grep` in the patched `tests/` finds no reference to `useTabResponsive`, `segmented-tabs__mobile`, `useOneLineOptions` or `one-line`. happy-dom has no layout, so a unit test could not see either the collapse or the refusal. The only evidence is the prototype's scratch probes (`p2-phone.mjs`, `p2-headviol.mjs`) and mine.

**CX-11 · The selected edge speaks the focus ring's language.** At rest the selected option wears a 1.5 px (tabs) or 1 px (ToggleGroupItem) full-ink ring. With focus on it (`focus.mjs`, `cap/focus-*.png`) it wears two concentric rings, the selection ring and the 2 px `--ink-perimeter` ring at a 2 px offset. SF-5 keeps the two on different CSS properties, but in paint a mouse user sees one ring that looks like focus, and a keyboard user sees a double ring. The prototype's own reading (§4, B-7): the pill eyeglass "reads more like an outlined chip than a lens".

**CX-12 · ToggleGroupItem cannot carry E's engagement.** My T-6 run: the 8 % plate the patch adds to `.toggle-group__item[data-state="off"]:hover` moves 0.00 % of pixels (p95 1.04:1 on preset-tg, 1.02:1 on specimen) in Chromium and in Playwright WebKit, with and without PRM, and Playwright WebKit reports "Page crashed" on both scenes. The rule writes `background-color`, which paints under the `.control-surface` background-image layers (R3-02-08, PORTFOLIO §1.4), so it cannot show: the patch ships a hover rule that is dead in paint. The same plate on the tabs, which have no plate layer, moves 73.68 % · 74.10 %. Two of the three consumer sites (the specimens and the strip) sit on ToggleGroupItem.

## 5 · The checklist

| item | answer | evidence |
|---|---|---|
| vacuous convergence | **Yes.** Every E-green T-3, T-5, T-7 and W-E cell is on a composition the family wrote. On the consumer as it ships, adopting the patch (`p2-headsc`, the prototype's run) gives T-3 8/15, T-4 4/20, W-E 0/6 and tiles crushed to 208×40 and 150.5×36. The born-RED witness moves only when keyframes.js rebuilds its scenes | §2; CX-8; prototype §3.2 |
| spec cites itself | **Partly.** SPECS §E.1's site table and §E.3 numbers are D4-E's own research and prototype runs, not independent measurements. One of its claims is false on disk (C1, CX-6), and its K2 variants contradict its own overflow rule (B-1) | CX-6; prototype B-1 |
| gates that cannot fail | **Yes, three.** T-7 on the self-paired preset scene (CX-8); the guard's and W-E's rung arm under the lock (CX-9); W-E's refusal in any shipped build, which cannot pass (CX-1). And one half-gate: T-4 cannot see a missing `focus-ring` in light (§3) | §3, CX-1, CX-8, CX-9 |
| elegant-reduction trap | **Yes.** "Detail belongs to the selection" is the whole mechanism, and the hard part reads "and then the consumer rebuilds its scene". K2 (the owner-approved gallery, OD-7) keeps a second row as a caption and shows 3.3 plates where HEAD shows six; V2, F1 and F2 have no E answer; `NO_PRESET` and F5's "none" arm are open and the patch now paints a false answer (CX-2) | research §0 item 1, §1.4; CX-2 |
| legacy aliases, shims, dual paths | **One dual path, one naming leftover.** The collapse renders one control as two different components chosen at runtime (strip or Select), with a second option list (`stripOptions`) for one of them. `showMobileSelect`, `mobileAriaLabel` and `segmented-tabs__mobile` keep "mobile" names for a rule that is no longer about mobile. No aliases; `toggle` → `radio` and the `breakpoint` removal are clean breaks | patch `useTabResponsive.ts`, `SegmentedTabs.vue` |
| masked fallbacks | **Yes.** The collapse (CX-3, CX-5): a strip that should paint becomes a Select with no signal, and one that should collapse overflows with no signal (CX-4). The production crush of an unmigrated tile is loud in paint (a 1.8 px text spill, names reduced to dots, prototype B-5), but its explaining message is stripped (CX-1), so a consumer sees broken paint with no reason given | CX-1, CX-3, CX-4, CX-5 |
| unverified gestalt | **Looked, §6.** It is uncluttered, but it does not read as a card-like option (by design), and the selected state is unmistakable only through a ring that doubles as a focus cue | §6 |
| consumer-less substrate | **Yes.** `_shared/one-line.ts` has two internal sites (E-7 met) and zero effect in any consumer's build (CX-1). The measured collapse has a consumer (chicago), but it is the site the spec says needs no edit and that breaks (CX-6) | CX-1, CX-6 |

## 6 · Gestalt (my captures, Chromium, `$K/cap/e-*.png`, `focus-*.png`, `cx-*.png`)

- **K1, SegmentedTabs preset** (`e-preset-light.png`): one glass track of four names, the selected "Snappy" on a taupe body ringed in dark ink, and one readout line under it that wraps at the 460 px host. It is calm and uncluttered, which answers "cluttered". It does not answer "should be more card like". The ringed eyeglass reads as an outlined chip.
- **K1 as a ToggleGroup row** (`e-preset-tg-dark.png`): four separate dark pills; the selected one has a near-white ring and bold type. Clear, and weight is a second carrier here, since the content is the library's bare label.
- **K2 filmstrip** (`e-specimen-light.png`): 122×44 stadium plates each holding a tiny curve and ball, with uppercase mono captions under them, three and a bit in view. The selected plate is ringed. It reads as a row of pill buttons with labels beneath: two rows per option, one of them outside the plate. The comparative race the scene exists for is legible across three plates.
- **K2 as `specimen-st`** (`e-specimen-st-light.png`): the header "ease-in-quad" over a Select reading "ease-in-quad ⌄". Every portrait is gone.
- **V1 strip** (`e-strip-dark.png`): 40 px glyph circles under family eyebrows; the selected one ringed in near-white. Clear and quiet.
- **Selected without colour alone:** yes in every E scene, through a luminance ring. It is the same shape as the focus ring (CX-11).
- **iOS-27 grade:** no. iOS segmented controls lift the selected thumb as a raised light body; they do not outline it. The ToggleGroup commit is a 180 ms colour change with no flood, pop or glide (SF-10), and its hover is invisible in light (CX-12).

## 7 · Convergence, open gaps, verdict

**Convergence: 30 %.** The pieces that hold are measured and reproduced: the one-line lock does what it says in both engines, the full-ink edge is a real and load-bearing carrier (T-3 12/12 on the E cells, 1/21 without it), SegmentedTabs as a radiogroup passes T-5, the tabs' `focus-ring` passes T-4 in dark where HEAD failed, and the Card `selected` deletion removes a consumer-less arm and SF-17 with it. What does not hold is the family's center: it fixes the corner by refusing the tile the owner asked for, its guard never reaches a consumer, and its one new mechanism (the measured collapse) misfires both ways and hides the misfire.

**Open gaps (exact):**
1. CX-7: the owner's N-9 ask ("more card like") is refused, not met.
2. CX-1: the DEV refusal is absent from `dist`; no consumer can be refused.
3. CX-2: an off-list model paints and announces the first option as checked (regression; keyframes.js `NO_PRESET`, fourier-analysis F5).
4. CX-3: false collapse under `display: contents` and inline parents, with no re-expansion.
5. CX-4: missed collapse when content outgrows a fixed-width strip; options spill outside the track.
6. CX-5 / B-1 / B-11: the collapse silently replaces intended strips and scrollers (the spec's own `specimen-st`, the demo FamilyTabs).
7. CX-6: chicago `App.vue:95` breaks on adopt, contrary to SPECS C1.
8. CX-8: T-7's preset pair is self-identical; the shipped consumer paint is never compared.
9. CX-9: the rung arm of both the guard and W-E is dead under the lock.
10. CX-10: no durable test for the collapse or the refusal.
11. CX-11: the selected ring reads as a focus ring; focused-and-selected is a double ring.
12. CX-12 / SF-8 / SF-9: ToggleGroupItem hover light 0.00 % (the patch's 8 % plate paints under the control-surface layers: dead CSS) and the Playwright WebKit crash, on two of the three consumer sites.
13. K2, V2, F1, F2 have no E composition that keeps what the scene is for (research §0 item 1, §1.4).
14. T-4's light cell cannot distinguish the UA `outline: auto` from the ring (harness).
15. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell.

**Verdict: RETIRE.** The family is refuted against the problem statement, not merely dominated: the problem is a multi-line tile the owner wants card-like, and E's answer is that the tile may not exist. Its evidence that the library can enforce the rule is a DEV build no consumer runs (CX-1), and its new mechanism introduces a masked fallback and a false-selection regression (CX-2..CX-5). A BANK would need a re-trigger under which "no multi-line option" becomes the owner's wish, and N-9 rules that out.

**Harvest (family-independent; each is re-measured by whichever family advances, not adopted from here):**
- SegmentedTabs `semantics: "radio" | "tabs"` through the engine's `groupRole` / `itemAttrs` (T-5 PASS on preset and tabs), without the `stripValue` regression (CX-2).
- `focus-ring` on the tab (T-4 dark 1.00 → 2.00 px).
- The measurement that the selected carrier needs a full-ink edge (T-3 12/12 with it, 1/21 without), as input to SF-4, with CX-11's focus-ring resemblance as the design question it raises.
- The hover plate finding (8 % moves 73.52 % on tabs; 0.00 % on ToggleGroupItem) as input to SF-9.
- Card `selected` deletion (no consumer in four repos; two demo stories re-pointed; SF-17 cured).
- The overflow collapse is **not** harvested. If a successor wants it, it needs an explicit opt-in, a loud DEV signal on collapse, a host measurement that survives `display: contents`, and a trigger on content growth, which is the breakpoint opt-in's shape again.
