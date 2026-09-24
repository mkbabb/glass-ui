# D4 · pass 1 · D4-B · the choice card (critique)

| field | value |
|---|---|
| seat | D4 pass 1, adversarial critic for family D4-B. I did not author the spec, the research or the prototype |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the checkout read `aabb675c`. `pass-1/D4-B-proto.patch` (26 files, +710 / −250) applied clean to a fresh worktree at that HEAD |
| engines | Chromium 149.0.7827.55 (`channel: "chromium"`) and Playwright WebKit 26.5, Playwright 1.61.1 from `glass-ui/node_modules`, headless. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| load | load average 36-42 during the runs (other seats building). Every number is a settled static read or a real input event |
| worktree | `…/scratchpad/D4/p1/D4-B-crit/wt`, `node_modules` and `tests-visual/node_modules` symlinked. Removed with `git worktree remove --force` before return. Git writes: worktree add and remove only. Planted variants were made by `cp` backups and in-place edits inside the worktree, then restored with `cp` |
| scratch | `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/D4/p1/D4-B-crit/`: `out/builds/{proto,proto-dev,p-t2,p-t3,p-t4,p-t5,p-t6a,p-t6b,p-t8,p-wb}`, `out/runs/*/`, `logs/run-proto.log`, `logs/plants.log`, `crit-probe.mjs`, `cm.mjs`, `gestalt/*.png` |

## 0 · Verdict in brief

**ADVANCE, at 66 % convergence.** The core holds under re-measurement:
- 16 px by construction.
- The floored 2 px perimeter as the one carrier.
- Grid arrows in the one engine.
- One tab stop.
- The Card and Chip-cell retirements.

Every witness the prototype claims green reproduces in my own run. Each also catches a planted violation, except one: T-6's commit cell, which passes with the visible commit motions removed.

Against that, I found five defects the prototype does not list, all in B's own code:
1. The commit pop plays on first paint.
2. The check mark is illegible under any non-default tone.
3. The item registry goes stale when the list is re-sorted.
4. Consumer `role` and `tabindex` override the engine.
5. The interactive-descendant refusal runs only at mount.

Each has a small fix inside the family, and none refutes it. The dominance risk is named in §5 as the re-trigger.

## 1 · Step 1: the failures I expected a tile design to hide (written before reading B)

I read PORTFOLIO §0-2 and §7 and `harness/HARNESS.md` first, and expected a family to hide these:

1. **A fill carrier with no second channel.** The fill under a PRT plate reads 1.00:1, and a green T-3 can rest on one element that a later edit drops.
2. **A carrier that spends `outline` or `box-shadow`,** and so eats the focus ring.
3. **Ring clearance that holds only in the harness host,** while any scroll port or consumer pad still cuts it.
4. **Grid arrows that work only in the grids the harness draws:** re-sorted lists, disabled items, ragged rows and RTL left out.
5. **An engagement claim resting on T-6's lenient commit cell** (HARNESS §6: any non-scale transition passes), with no iOS-27 commit, pop or glide actually held.
6. **The family re-authoring the scenes its witnesses read,** so that green means "the scene was rewritten", not "the site is cured".
7. **A DEV-only guard standing in for E-2's loud failure.**
8. **Consumer-less substrate:** props, slots or modes that no surveyed site uses.
9. **Silent bindings** (E-11): retired props accepted by `vue-tsc`, or attributes that override the component's contract.
10. **A corner rule that satisfies T-1's h/2 reading** while a narrow box still reads as a lozenge, which is the owner's actual complaint.
11. **Motion that plays when nothing was committed** (mount, re-render).
12. **A contrast floor applied to one paint,** such as the edge, and not to its sibling paints, such as the mark.

§3 below reports what each expectation found.

## 2 · Re-running the battery (my run, `logs/run-proto.log`)

`node harness/build.mjs <wt> --label proto`, then `node harness/run.mjs --build out/builds/proto --webkit`:

| id | Chromium | Playwright WebKit | matches the prototype's table |
|---|---|---|---|
| T-1 | FAIL 4/7 | FAIL 4/7 | yes |
| T-2 | PASS 12/12 | PASS 12/12 | yes |
| T-3 | PASS 15/15 | PASS 15/15 | yes. Preset bands 1198.50 / 1215.50 / 1207.50 px² against 269; specimen 534.00 / 552.75 / 543.00 against 291. WebKit preset 1200.50 / 1213.50 / 1206.25 |
| T-4 | FAIL 16/20 | FAIL 16/20 | yes. The RED is `preset-verbatim` only |
| T-5 | FAIL 37/38 | n/a (CDP) | yes. The RED is `tabs` (`group` / `button` / `aria-pressed`); preset and specimen move Down 0 → 2 |
| T-6 | PASS 24/24 | PASS 24/24 | yes. The commit cells list `--choice-fill 60ms, --choice-edge-t 60ms, opacity::after 300ms`, plus the pop |
| T-7 | FAIL 8/12 | n/a | yes |
| T-8 | PASS 16/16, 1 unmeasured | (both) | yes |
| W-B | PASS 13/13 | n/a | yes. `tab stops 1`, `used corner 16.00` on preset, specimen and strip |
| W-A / W-C / W-D / W-E | 1/3, 5/7, 0/4, 0/6 | 1/3, —, 0/4, 0/6 | yes (the other families' witnesses) |

### 2.1 Planted violations, one per claimed-green witness (`logs/plants.log`)

| plant (build) | what I changed in the worktree | witness | result |
|---|---|---|---|
| `p-t3` | `.choice-card::before { opacity: 0 !important }`: the perimeter removed | T-3, W-B | **caught.** T-3 FAIL 0/15: the mark alone covers 185.50 of 269 px² on the preset; fill 1.40 / 1.55 / 1.46. W-B FAIL 4/13 |
| `p-t5` | `ChoiceGroup` passes `arrows: "axis"` | T-5 | **caught.** FAIL 31/38: `preset grid ArrowDown from #0 · focus 0 → 0 · moved false` |
| `p-wb` | `ChoiceCard` renders `:tabindex="0"` | W-B | **caught.** FAIL 10/13: `tab stops 4` / `8` / `6` |
| `p-t8` | `@supports (hanging-punctuation: first) { .choice-card { border-radius: 9999px } }`, a rule that applies in WebKit only (checked with `CSS.supports`: Chromium false, Playwright WebKit true) | T-8 | **caught.** FAIL 14/16: `Playwright WebKit T-1 preset #0 … 9999px→32.55 (÷h/2 1.00)` |
| `p-t4` | `.choice-group { padding: 2px }`, which is K2's old pad | T-4 | **caught.** FAIL 8/20: `specimen … painted ring px top 1.00 … left 1.00` |
| `p-t2` | `.toggle-group__item { border-radius: 12px }` | T-2 | **caught.** FAIL 4/12: `single #0 … 12px→12.00 (÷h/2 0.67)` |
| `p-t6b` | removed every commit motion: the fill and edge transitions, the pop, and the flood's opacity transition | T-6 | **caught.** FAIL 20/24: `running non-scale motions 0` |
| **`p-t6a`** | removed the fill and edge transitions and the pop; **kept only the flood's opacity transition** | T-6 | **NOT caught. PASS 24/24:** `preset commit · … running non-scale motions 1 [CSSTransition:opacity@item::after 300ms]` |

`p-t6a` is the gate that cannot fail on the property it names. In that build the state carrier (the perimeter) and the fill snap with no motion. The only motion left is the flood, whose selected-against-unselected ratio measured 1.05-1.11 in B Q4, below perception. T-6 still reads 24/24. The prototype's "T-6 GREEN" is therefore evidence that some non-scale property animates, not evidence of engagement. The spec's D-2 claim rests on the prototype's `commit-key.mjs` probe and on reading the stylesheet, not on a witness.

## 3 · Defects the prototype does not report (my probes)

All of these are in B's own files, and all were measured. `crit-probe.mjs` ran in both engines; `crit.test.ts` ran as a vitest file in the worktree and went with it; `cm.mjs` ran in Chromium.

1. **The commit pop plays on first paint.** The spec says the pop "plays on a committed change and never on first paint", and that `data-live` is set one frame after mount. But `.choice-group[data-live] .choice-card[data-state="on"] { animation: choice-commit … }` starts matching the moment `data-live` appears. The CSS animation then starts on the card that was already selected.

   Measured with no user input (a rAF loop recording `document.getAnimations()`):
   - preset: `choice-commit` running on "snappy" at 85 ms (Chromium) and 101 ms (Playwright WebKit)
   - specimen: running on "ease-in-quad" at 38 ms and 88 ms

   No witness reads this. Every mount twitches the selected card by 2.5 %: a page load, a route change, a dialog opening. That is motion without a commit.

   The fix is local: key the pop to a change, for example an attribute set by the commit handler and cleared on `animationend`, not to a mount flag.

2. **The mark ignores the floor the edge obeys.** `--choice-edge` floors lightness (L ≤ 0.42 in light, ≥ 0.80 in dark). The mark's disc paints the raw `var(--choice-tone)`, and its glyph paints `--background`. Glyph against disc, from computed colours sampled through a canvas, the same in both engines:

   | mode | tone | glyph : disc |
   |---|---|---|
   | light | default (`--foreground`) | 16.77 |
   | light | `oklch(0.93 0.09 100)` (a pale yellow) | **1.17** |
   | light | `oklch(0.88 0.06 200)` (a pale teal) | **1.35** |
   | dark | default | 15.90 |
   | dark | `oklch(0.35 0.15 265)` (a navy) | **1.68** |
   | dark | `oklch(0.45 0.2 25)` (a brick red) | **2.54** |

   In `gestalt/chromium-mark-light-oklch_0.93_0.09_100_.png` the check vanishes into the disc. `tone` is a public prop (X-7) that K2 already uses. At `md` the mark is the non-colour confirmation of the state, and with any pale or deep tone it paints a blank dot. T-3 cannot see this, because the perimeter carries its bands.

   The fix: floor the disc the way the edge is floored, or paint the glyph in the ink that contrasts with the floored tone.

3. **The item registry goes stale on a re-sort.** `ChoiceGroup.ordered` is a `computed` over `entries`. It re-sorts by `compareDocumentPosition` only when an entry registers or unregisters. A keyed `v-for` that is re-sorted moves the DOM without either event.

   Measured (vitest, jsdom): items `a,b,c,d` with `a` selected, re-sorted to `d,c,b,a`. ArrowRight on `a`, now last in the DOM, set the model to **`b`**. The DOM-order answer is `d`, wrapping to the first. The roving tab stop follows the stale order the same way.

   This is the second registry that the spec's P-3 note owes. It is not only a duplicate: it is wrong under a sort. keyframes.js's specimen set sorts and filters by family (K3 filters the list K2 renders).

4. **Consumer attributes override the engine.** `<ChoiceCard role="option" tabindex="0">` renders `role=option tabindex=0` on every card: two tab stops and no `radio` inside a `radiogroup`. Vue merges fall-through `$attrs` after the root's own bindings, so the engine's `itemAttrs` and roving tabindex lose.

   This is UIA-F-43 (F-70, `Card.vue:66-68`) with the precedence reversed. Card lost the consumer's attributes silently; ChoiceCard loses its own. The migrated Card story shape (`role="option"`) is exactly what a consumer would carry over. E-11 names this class.

   The fix: `inheritAttrs: false` and bind `$attrs` before the engine's attributes. Or refuse a consumer `role` or `tabindex` loudly.

5. **The interactive-descendant refusal runs once, at mount, and only in DEV.** A link rendered after mount (`v-if` flipped true) logged 0 refusals in the DEV test run. Production logs nothing at mount either: the prototype's matrix probe measured 0 errors in production, with ArrowRight inside the Input moving the selection to card 3.

   E-2 asks that the primary work or fail loudly. The spec leaves this "unruled", and it is a load-bearing step that reads "and then the hard part". A radio whose content steals keys in production is a masked failure. A `keydown` guard that ignores events from editable descendants would close the production half without any policy call.

6. **Confirmed from the prototype's own report: the contrast arms shift layout.** Under `prefers-contrast: more` (emulated over CDP, `cm.mjs`) the selected card's border goes 1 → 2 px and its ink moves 1 px: preset (13, 9) → (14, 10). In the flex-row strip the selected card itself grows from 40.00×56.17 to 42.00×58.17, so its siblings move. In the grids the whole row grows by 2 px (65.11 → 67.11).

   The source is the global `accessibility.css` rule the prototype names. The card already has a non-layout perimeter, so an exemption for `[data-slot="choice-card"]` is a one-selector ruling for the rule's owner. Until then, "the layout never shifts" holds in light, dark and PRT only.

## 4 · The checklist, item by item

| item | finding | evidence |
|---|---|---|
| **Vacuous convergence** | Partly. W-B's 13 cells are 4 anatomy cells plus 9 T-3 re-reads, so W-B 13/13 and T-3 15/15 are not independent. T-3 grew from 2/15 to 15/15 partly because the `card` and `chipcell` scenes were re-authored as ChoiceCards: the Card arm and Chip `cell` are deleted, not cured, so 2 of T-3's 5 scenes, and 2 of T-6's gating scenes, now re-measure the same component. That is legitimate under E-1, but "15/15" is not comparable cell for cell to HEAD's "2/15" | the `scenes.mjs` hunks in the patch; the T-3 and T-6 JSON |
| **Spec cites itself** | Present in the carrier choice. SPECS B.3's carrier table, B.4 and SF-4's B row all come from the same research seat's `register-b.mjs`. My `p-t3` plant confirms the key claim independently: with the perimeter removed, every cell fails and the mark covers 185.50 of 269 px². The claim stands, now on a second measurement | `plants.log` |
| **Gates that cannot fail** | **T-6's commit cell** (`p-t6a` passes with only an invisible flood animating). T-7 cannot see a redundant consumer rule whose value equals the library's (SF-20), which is why `specimen-verbatim` passes. No gate reads first-paint motion (§3 item 1) or mark legibility (§3 item 2) | §2.1; §3 |
| **Elegant-reduction trap** | Three load-bearing steps are deferred as rulings or "not prototyped":<br>- the shared registry (P-3), which is also the §3.3 defect<br>- the production refusal (E-2), §3.5<br>- the iOS-27 commit: no glide between cards; the pop is 1 → 1.025 → 1 over 120 ms<br>Each reads "and then the hard part" | SPECS B.5; §3 |
| **Legacy aliases, shims, dual paths** | No aliases, and the Card and Chip-cell breaks are clean. Dual paths:<br>- two item registries (`choice/context.ts`, `toggle-group/context.ts`)<br>- two arrow models in one engine (`axis` and `grid`, with `grid` used by one caller)<br>- three one-of-N primitives: ToggleGroup `single`, ChoiceGroup `single`, SegmentedTabs `toggle` (still `aria-pressed`)<br>design-idioms §9 accepts a twin only on a recorded divergence, and B's record has two rows (anatomy; the `.control-surface` chassis). The chassis row rests on SF-8, a Playwright WebKit hang in a token whose fix belongs to that token's owner. Once that fix lands, B's divergence is anatomy alone | D4-B.md Q3; SF-8 |
| **Masked fallbacks** | The DEV-only refusal is the one masked primary (§3.5). The `oklch(from …)` edge would fall to `currentColor` if relative colour failed, silently. On the target engines it resolves (T-8 green), so this is noted, not open. The `rowNeighbour` fallback to a linear step is specified behaviour, not a mask | §3.5 |
| **Unverified gestalt** | Looked at my own captures (`gestalt/chromium-*-{light,dark}.png`, plus the WebKit set). See §4.1 | below |
| **Consumer-less substrate** | These have no surveyed consumer that can adopt now:<br>- `type="multiple"` (V2 is value.js, three majors away; the battery never runs it)<br>- the scoped `#mark({ selected })` slot<br>- Chip `mode="selectable"` once V1 moves<br>`tone` has one site (K2), and it is the prop §3.2 breaks. E-7 is satisfied by export, so this is weight, not a violation. KISS asks whether `multiple` ships before V2 can adopt it | SPECS B.2; X §1 |

### 4.1 Gestalt, from my captures

- **Does it read as a card-like option? Yes at `md`.** The preset (`chromium-preset-light.png`) shows four 204×65 cards at 16 px, a name above a mono readout. The card board reads the same way. The lozenge is gone.
- **At `sm` in a narrow strip, no.** The value.js strip cards are 40.00×56.17 at 16 px, whose corner is **0.80** of their half-width (`cm.mjs`). They read as rounded lozenges, which is the owner's "too rounded" complaint moved to a different box. T-1 cannot see this, because it compares the corner with h/2 and ignores the short side. The ragged widths (40 against 51.23) are counterexample 5, visible in `chromium-strip-light.png`.
- **Is the selected card unmistakable without colour alone? Yes at `md`** (a 2 px edge, a check disc and a darker plate), **but only through edge weight at `sm`,** which has no mark. With a non-default tone at `md`, the mark stops helping (§3.2).
- **Is it uncluttered and glass-idiomatic? Middling.** In light, four grey plates sit inside a grey Card plate, the plate-on-plate sub-card read of SF-25. The selected card's near-black 2 px edge is the heaviest line on the surface (counterexample 4, confirmed in `chromium-preset-light.png` and `chromium-strip-light.png`). In dark it reads clean.
- **Is it iOS-27 grade? No.** The selection does not travel between cards. The commit is a 60 ms edge and fill change plus a 2.5 % pop, and the pop also fires on load (§3.1). D-2 and D-3 ask for engagement that bests iOS 27. What ships is a floor-grade commit that T-6 cannot distinguish from a snap (§2.1).

## 5 · Named counterexamples (new in this critique)

- **CX-1 first-paint pop:** `choice-commit` running at 38-101 ms after load with no input (§3.1).
- **CX-2 blank mark:** glyph against disc 1.17:1 on a pale yellow tone in light, 1.68:1 on navy in dark (§3.2).
- **CX-3 re-sort:** after `a,b,c,d` → `d,c,b,a`, ArrowRight from `a` selects `b` (§3.3).
- **CX-4 attribute override:** `<ChoiceCard role="option" tabindex="0">` yields N tab stops and no radio (§3.4).
- **CX-5 late interactive child:** 0 refusals (§3.5).
- **CX-6 the lenient gate:** `p-t6a` passes T-6 24/24 with the carrier snapping (§2.1).
- **CX-7 narrow sm card:** 16 px on a 40 px wide card is 0.80 of its half-width (§4.1).
- **CX-8 consumer pad:** a 2 px group pad, which utilities can impose over `@layer components`, cuts the specimen ring to 1.00 px (`p-t4`). "May not replace the padding" is prose only.

**Dominance re-trigger.** B's own Q3 says it folds into a ToggleGroup cell shape that grows the three named slots and a non-capsule chassis. Once SF-8's token fix lands, the chassis row falls away. If D4-D (or its critique) then shows the anatomy on ToggleGroupItem at the same W-B / T-3 / T-5 readings, B becomes a second one-of-N primitive with no divergence, and should be re-judged as BANK.

## 6 · Convergence and open gaps

**Convergence: 66 %.** I weighted B-owned gaps by whether they break a claim the spec makes (items 1-6 below) or leave a claim unproven (7-14). Items 15-17 are shared or other owners' and are not counted against B.

Open gaps, exactly:
1. The commit pop fires on first paint (CX-1). It breaks the spec's "never on first paint".
2. The mark's disc and glyph ignore the tone floor (CX-2). It breaks X-7 `tone` at `md`.
3. The registry is stale under re-sort (CX-3), and it is duplicated (P-3).
4. `$attrs` override the engine's role and tabindex (CX-4), the E-11 class.
5. The interactive-descendant refusal is DEV-only and mount-only, and the production keyboard fight is live (CX-5, E-2).
6. The contrast arms shift layout through the global `accessibility.css` rule. That rule's owner needs to rule on it, for example by exempting `[data-slot="choice-card"]`.
7. No witness holds the commit: T-6 passes with the carrier snapping (CX-6). The iOS-27 commit (a glide, a weighted pop) is unspecified, so D-2 and D-3 are unmet above the floor.
8. The `sm` narrow card reads as a lozenge (CX-7), and V1's widths are ragged (counterexample 5). No witness compares the corner with the short side.
9. The neutral edge is heavy in light (counterexample 4), and the plate-on-plate nesting remains (SF-25).
10. Ring-clearance padding is unenforced (CX-8).
11. `type="multiple"`, V2, F1 and C1 are outside the battery, and the second-state tile (F1 `is-bound`, counterexample 1) is unsolved.
12. The divergence record rests partly on SF-8. The dominance re-trigger is in §5.
13. Surface area: a MIGRATION entry, an E-11 guard for `<Chip shape="cell">` and Card `selected`, D1 placement of `choice/`, and the slot-order and title-typography ruling.
14. The cost of 28 blurred cards in a scroll port is not measured.
15. Real Safari, every cell: UNMEASURED (owner's safaridriver checkbox). The demo crashes Playwright WebKit on boot, HEAD and patched alike.
16. T-4 and T-7 `preset-verbatim` stay RED until the consumer migration, which is a consumer act and unproven.
17. T-5 `tabs` (SegmentedTabs `semantics="toggle"`) is not B's.

**Verdict: ADVANCE.** The mechanism is sound and reproduces in both engines. Its witnesses are live, except T-6's commit cell. Gaps 1-5 are defects with small in-family fixes, and none needs a missing primitive. The family advances with gaps 1-5 fixed and CX-1..CX-8 added as witness cells: first-paint motion, the mark against a floored tone, re-sort keys, attribute precedence, a commit cell that fails when the carrier snaps, and the corner against the short side.
