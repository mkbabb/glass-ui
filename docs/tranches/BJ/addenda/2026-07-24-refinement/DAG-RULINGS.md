# THE TERMINAL GRAPH RULING — all 62 nodes

**Provenance.** `wf_5e7dd9f7-18a`, 16 seats, all Opus 5, 2.1M subagent tokens, 2026-07-25.
Every cluster viewed thrice: two benches assuming the graph structure is WRONG, one adjudicator.
Independent extractor (comment-stripped; resolves `./ ../ @/ import()`, `<style src>` and CSS `@import`
against the filesystem).

**Carries a PER-NODE VERDICT TABLE for all 62 components** — LOC, consumers, verdict (KEEP · KEEP-THIN ·
SPLIT · MERGE-INTO · MOVE-TO · DEMOTE · DELETE), the ground, and the new home. This is the warm seed for
every component that does not yet have a terminal spec.

**CAVEAT — the zero-consumer LOC figure in §0 is ONE RUN OF FIVE and is contested.** See `EXEC-STATE.md`
for the full spread (45-70%, definition-dependent). The MEMBERSHIP deltas and the per-node verdicts stand;
the aggregate share does not.

---

**modelId: `claude-opus-5[1m]`** · read-only; no repo file created, edited or deleted. Own re-derivation: `/private/tmp/claude-504/-Users-mkbabb-Programming-glass-ui/f7246310-06bc-4dbe-ba5d-5b9bbe793e21/scratchpad/FOLD-graph.mjs` → `FOLD-out.txt`.

# THE TERMINAL GRAPH RULING

## 0. THE GRAPH, SETTLED

Independent extractor (walks every file in every component dir; comment-stripped; resolves `./`, `../`, `@/`, `import()`, `<style src>` and CSS `@import` against the filesystem; restricted to the 62 nodes):

```
components 62 | LOC 56676 (code 34018 / comment 17620)      ← matches EXEC-STATE exactly
code+style edges 30 (40 import sites) | component→component CSS @import edges 0
clusters 36 | singletons 30 | singleton LOC 15577 (27.5%)
SCC>1: [["dropdown-menu","dock"]]                            ← the sole survivor of DAG.md
zero-code-consumer 42 | LOC 30594 (54.0%)
[19] button carousel configurator dock dropdown-menu easing fading-scroll input label labeled-field
     number-field popover search select slider switch tabs timeline tooltip   19717
[3] aurora blob fourier-field 17473 · [3] card header-ribbon surface 647 · [3] data-table skeleton table 1077
[2] chip tags-input 623 · [2] command dialog 1562
```

**The consumer census is settled and the coincidence must be recorded.** DAG.md's `42` is numerically right and 11/42 wrong in membership *in each direction*. Rule declared: a consumer is a JS/TS import from a `src/` file outside the component, excluding the three entry barrels (`src/index.ts`, `src/forms.ts`, `src/components/index.ts`), excluding CSS `@import`, excluding comments.

| | count | LOC | note |
|---|---|---|---|
| **adjudicated** | **42** | **30,594 (54.0%)** | the record |
| if `src/forms.ts` counts as a real consumer | 41 | 30,509 | `textarea` alone; the whole 41-vs-42 gap |
| after the ruled `useSelectionGroup→tabs` inversion (§3) | 43 | 32,021 | `tabs` loses its only consumer |
| DAG.md §1 | 42 | 38,204 (67%) | **LOC and membership false** |

Membership delta, both directions, exact:

- DAG says zero, has real consumers: `aurora fading-scroll label popover search select skeleton slider switch table tooltip`
- DAG says consumed, has none: `card completion-seal dark-mode-toggle drawer header-ribbon infinite-scroll instrument-chassis metric scroll-progress-rim textarea toast` — nine via `src/styles/index.css` `@import`, one via a comment, one via `forms.ts`.

---

## 1. THE SHAPE THE LIBRARY SHOULD HAVE

Six zones. Every boundary below is a *rule about what a thing may know*, not a folder preference.

```
src/
  components/<name>/          A component owns its sub-SFCs, its context, its variants, its styles.
                              It may import: _shared, composables/, styles registers, and components
                              STRICTLY BELOW it in the composition order. It may NEVER import a
                              sibling's internals, and it may never be a protocol host.
  components/_shared/         Cross-component CONTRACTS. Not a utility bin — each entry is a
                              register with ≥2 independent consumers and no component identity:
                              overlay/ surface/ menu/ field/ disclosure/ feedback/ control/
                              + the leaf helpers (class-names, axes, primitive, interaction, selection).
  composables/                Framework logic with no component identity. `composables/` means
                              composables — today 34 files in the four field modules hold 8.
                              Gains: search/ (the 431-line matcher), ink/ (1,501 lines of geometry),
                              deck/ (202 lines, zero SFCs), procedural/ (prng leaves `glass/`).
  styles/                     Tokens, theme, true globals and the glass registers. It contains
                              ZERO `@import "../components/…"`. Today it holds 20.
  index.ts                    The one barrel. `components/index.ts` (38 lines, zero importers,
                              divergent) is deleted; `forms.ts` folds in once `useVModel` dies.
  (28 .md files / 2,580 lines leave src/ for docs/)
```

**The four boundary laws that produce it**

1. **A protocol never lives in a participant.** The dock is the whole cluster's problem because `dockContext`/`useDockHold`/`isTeleportedTarget` — a 217-line participation protocol with more external readers than internal — sits inside an 8,018-line component. Every leak in the graph is a component reaching into another component's *internals*, and 6 of 7 such reaches point at these three files.
2. **One delivery lane for CSS.** `<style src="./styles.css">` on the owning SFC. Four conventions ship today (global `@import` ×14, `<style src>` ×15, `<style scoped>` ×8, none-at-all ×8) and the global lane is what fabricated nine phantom consumers, hoists 4,207 dock lines unconditionally, and lets `drawer/styles.css` own a register only `dialog` writes.
3. **A register is declared once, in `styles/`, and composed.** Not re-forked. `.glass-drag-lift` is declared twice; `.glass-value-marks` has two composers and one hand-copy; `.dock-trigger` was landed in 2 of 7 stylesheets and declared complete.
4. **Roles stay distinct; implementations converge.** checkbox/switch/radio/toggle keep their ARIA identities and share one chassis. dialog/sheet keep their placements and share one overlay.

---

## 2. PER-NODE VERDICT TABLE — all 62

LOC = my census (total / code / comment). Verdicts: KEEP · KEEP-THIN · SPLIT · MERGE-INTO · MOVE-TO · DEMOTE · DELETE.

| # | component | LOC | code/comment | cons | verdict | ground | new home |
|---|---|---|---|---|---|---|---|
| 1 | **aurora** | 9003 | 5074/3232 (36%) | 4 | **KEEP-THIN** | correct-as-is; 2 budget exports wrong-home; `AV_MAX_BLOBS`/`AV_LOOP_DURATION_*` dead; 2 wgpu builders 97 identical lines; `.aurora-canvas--armed` + `data-aurora-substrate` unread | `components/aurora/` · `composables/glass/webgl/backingSize.ts` |
| 2 | **dock** | 8018 | 3586/3838 (48%) | 5 | **SPLIT** | wrong-home: hosts the cluster's participation protocol. `DockLayout` vacuous (3 self-refs, no reader). `composables/index.ts` superfluous (45 lines, 6 symbols, 3 users) | `components/dock/` + `_shared/overlay/` |
| 3 | **blob** | 5573 | 3099/2005 (36%) | 0 | **KEEP-THIN** | correct-as-is; `uniformBridgeWGPU`/`uploadBlobUniforms` self-declared "BYTE-IDENTICAL twin" (316+399); 2 dead `data-testid` | unchanged |
| 4 | **fourier-field** | 2897 | 1921/762 (26%) | 0 | **KEEP-THIN** | correct-as-is; D11 gap — zero `role`/`aria-label`/`keydown` under an `interactive` prop its sibling serves | unchanged |
| 5 | **constellation** | 2452 | 1460/857 (35%) | 0 | **KEEP-THIN** | wrong-grain inside: 5 module-name prefixes, `constellationWell.ts` = 139 lines/1 export/1 caller, 5 re-export hops, inlined DPR | unchanged, files renamed |
| 6 | **timeline** | 2263 | 1057/1043 (46%) | 0 | **SPLIT-INTO-3** | wrong-grain: 3 disjoint roles, 6 of 7 props variant-conditional, a 232-line dispatcher whose only job is the switch | `scrubber-timeline/` `segmented-timeline/` `continuous-timeline/` |
| 7 | **handmark** | 2242 | 1295/788 (35%) | 0 | **SPLIT** | wrong-home: 1,501 lines of framework-free geometry under `components/`, republished as public API | `composables/ink/` + `components/handmark/HandMark.vue` |
| 8 | **drawer** | 1625 | 874/624 (38%) | 0 | **MERGE-INTO sheet** | **superfluity — the graph's loudest edge, RULED.** `drawer.reka ⊂ dialog.reka` (8 of 8, J=0.800); 4 leaf SFCs byte-identical to dialog's modulo the name; it is dialog's edge placement + detents | `components/sheet/` |
| 9 | **configurator** | 1534 | 524/927 (**60%**) | 1 | **KEEP-THIN** | correct-as-is. "Slated for demotion" **struck** — it rested on a CSS `@import` counted as a consumer | unchanged |
| 10 | **tabs** | 1427 | 730/584 (41%) | 1 | **KEEP-THIN** | wrong-home ×3: `useTabRovingFocus` is imported *upward* by `motion/morph` and shipped on `./motion-core`; `.glass-drag-*` register declared here; viewport `matchMedia` where a container primitive exists | unchanged; roving-focus → `composables/motion/morph/` |
| 11 | **typewriter** | 1418 | 1009/206 (15%) | 0 | **KEEP-THIN** | correct-as-is; 20 `Math.random` sites against a shared seeded PRNG with 5 consumers; `utils/` + 1-file `composables/` | unchanged, flattened |
| 12 | **sortable-list** | 1140 | 824/189 (17%) | 0 | **KEEP-THIN** | wrong-grain: `composables/` holds 7 files, 1 of which is a composable | unchanged, flattened |
| 13 | **dialog** | 1072 | 676/309 (29%) | 2 | **SPLIT** | wrong-grain: 11 `isCenter` gates, disjoint class branches, disjoint springs. `DialogTrigger`/`DialogClose` vacuous (14 lines each, re-export reka) | `dialog/` + `sheet/` + `_shared/overlay/` |
| 14 | **dropdown-menu** | 1030 | 883/15 (1%) | 1 | **MOVE-TO menu** | wrong-name: 28 unshakeable reka imports covering both click and context arms, `./context-menu` unexported. `DropdownMenuGroup` vacuous (31 lines, identity `cn`, zero readers) | `components/menu/` |
| 15 | **easing** | 988 | 658/246 (25%) | 0 | **KEEP-THIN** | `EasingConfigurator.vue` vacuous — 62 lines, 6 forwarded props, no state/class/emit, and the **sole** source of the `easing→configurator` edge | unchanged |
| 16 | **pager-dots** | 846 | 464/313 (37%) | 0 | **KEEP** | correct-as-is; `pagerWindow.ts`→`window.ts`; strike the false `deck/index.ts:19` claim | unchanged |
| 17 | **data-table** | 794 | 649/65 (8%) | 0 | **KEEP** | correct-as-is; its container-measured collapse is the **right** primitive and becomes the shared one | unchanged |
| 18 | **slider** | 652 | 373/219 (34%) | 3 | **SPLIT** | wrong-grain: 13 `[data-variant="spectrum"]` rules + 3 negations = a second component wearing a flag, and it kills its own backdrop-filter | `slider/` + `slider/Spectrum.vue` |
| 19 | **select** | 611 | 415/125 (20%) | 3 | **KEEP-THIN** | correct-as-is; `SelectScrollUp/DownButton` byte-identical modulo `Up`/`Down`; `select.css` phantom cited at 6 sites, file does not exist | unchanged |
| 20 | **search** | 569 | 410/76 (13%) | 1 | **SPLIT** | wrong-grain: 431 DOM-free matcher lines vs an 83-line SFC; the matcher's only consumer is the dock, deep-imported | `composables/search/` + `components/search/` |
| 21 | **toast** | 568 | 349/153 (27%) | 0 | **KEEP-THIN** | 4 leaf SFCs (17/17/29/44) fold to slots; 4 `group-[.destructive]:` arms cannot match any emitted class; `use-toast.ts` is the one kebab file in 96 | unchanged; `queue.ts` |
| 22 | **completion-seal** | 565 | 254/268 (47%) | 0 | **KEEP-THIN** | correct-as-is — its rAF is a correct one-shot, not a loop; 1-file `composables/` | unchanged, flattened |
| 23 | **watercolor-dot** | 513 | 230/243 (47%) | 0 | **KEEP-THIN** | `prng.ts` is a 21-line byte-identity re-export shim under a no-shims law, republished on the subpath | unchanged |
| 24 | **carousel** | 498 | 313/122 (24%) | 0 | **KEEP-THIN** | `interface.ts` is the lone deviation from 19× `types.ts`; `CarouselItem.vue` is 5 lines | unchanged |
| 25 | **command** | 490 | 409/8 (2%) | 0 | **KEEP-THIN** | correct-as-is as the sole reka-Combobox wrapper; `dialogContext.ts` vacuous **and defective** (17 lines whose only effect is a broken uncontrolled dismiss); `Combobox*` types wrong-home | unchanged |
| 26 | **card** | 418 | 353/8 (2%) | 0 | **KEEP-THIN** | correct-as-is; 4 passthrough SFCs, 5 re-declared Surface defaults, unscoped `[data-variant="selection"]`, a 3-file `closest()` string edge | unchanged |
| 27 | **labeled-field** | 413 | 364/7 (2%) | 0 | **SPLIT** | `LabeledSelect` hard-narrows to `readonly string[]` — a preset in the library, and the only reason `./labeled-field` drags the overlay chain | 3 relays KEEP; `LabeledSelect`→demo |
| 28 | **metric** | 394 | 338/0 (0%) | 0 | **KEEP-THIN** | `MetricStack.vue` is 4 lines = a class; `coalesce-metric.ts` repeats the module name | unchanged |
| 29 | **popover** | 344 | 278/29 (8%) | 1 | **KEEP-THIN** | wrong-grain in mechanism: 3 token-identical Content arms where `PopoverPortal :disabled` exists and line 71 already uses it; `keepDockOpen` defaults `false`, disabling the correctness it exists to give; `isCoarsePointer` frozen at setup | unchanged |
| 30 | **toggle-group** | 328 | 286/0 (0%) | 0 | **KEEP** | correct-as-is; joins the declared control chassis | unchanged |
| 31 | **tags-input** | 316 | 271/1 (0%) | 0 | **KEEP-THIN** | correct-as-is; stays on the field register | unchanged |
| 32 | **progress** | 309 | 263/15 (5%) | 0 | **KEEP** | correct-as-is; one of two legitimate `.glass-value-marks` composers | unchanged |
| 33 | **chip** | 307 | 246/34 (11%) | 1 | **KEEP-THIN** | wrong-home: `accent-tone` is a global-cascade fixed point (3 sheets pin position against it) living in a leaf | `styles/glass/accent-tone.css` |
| 34 | **button** | 296 | 258/4 (1%) | 4 | **KEEP** | correct-as-is; the most-composed node in the tree (50 demo sites) | unchanged |
| 35 | **accordion** | 294 | 252/7 (2%) | 0 | **KEEP** | correct-as-is; 2 mechanical `fixedHostAttrs` copies | unchanged |
| 36 | **fading-scroll** | 287 | 166/89 (31%) | 1 | **KEEP-THIN** | correct-as-is; 1-file `composables/` | unchanged, flattened |
| 37 | **expandable-container** | 285 | 245/2 (1%) | 0 | **MERGE-INTO dialog** | **superfluity**: forks `document.body.style.overflow` (the only such fork in `src`, lines 77/78/89) against reka's own lock, plus its own trap, `role="dialog"` and Escape — over the same substrate | `dialog` `origin` arm |
| 38 | **scroll-progress-rim** | 252 | 186/39 (15%) | 0 | **KEEP-THIN** | superfluity: `styles.css:85-116` repaints `.glass-value-marks` from its own tokens; the register already handles its block-end origin. Domain math stays — it is *not* a `resolveValueFraction` drop-in | unchanged |
| 39 | **status-dot** | 252 | 206/10 (4%) | 0 | **KEEP-THIN** | 1 of 2 files in `src` merging `props.class` by array literal against 122 using `cn` | unchanged |
| 40 | **number-field** | 250 | 210/1 (0%) | 0 | **KEEP** | correct-as-is | unchanged |
| 41 | **avatar** | 236 | 204/0 (0%) | 0 | **KEEP** | correct-as-is; 1 mechanical + 1 superset `fixedHostAttrs` | unchanged |
| 42 | **radio-group** | 228 | 193/0 (0%) | 0 | **KEEP** | correct-as-is; role must stay distinct. Its press rule is an *ancestor* selector — the register cannot serve it unchanged | unchanged |
| 43 | **instrument-chassis** | 224 | 196/0 (0%) | 0 | **KEEP** | correct-as-is | unchanged |
| 44 | **deck** | 206 | 133/47 (23%) | 0 | **MOVE-TO composables** | wrong-home: 0 SFCs — with `_shared`, the only such dir under `components/` | `composables/deck/` |
| 45 | **tooltip** | 194 | 162/7 (4%) | 1 | **KEEP-THIN** | correct-as-is; its `<Portal>` carries no dock stamp — a structural dock-collapse defect closed by the shared Content | unchanged |
| 46 | **table** | 186 | 158/0 (0%) | 1 | **SPLIT** | wrong-grain: 6 SFCs at 14–21 lines each doing what one descendant stylesheet does; `table-cell`/`table-head` are already our `@utility` | `Table.vue` + `TableEmpty.vue` |
| 47 | **infinite-scroll** | 183 | 120/35 (19%) | 0 | **KEEP** | correct-as-is | unchanged |
| 48 | **collapsible** | 176 | 149/4 (2%) | 0 | **KEEP** | correct-as-is | unchanged |
| 49 | **switch** | 164 | 141/0 (0%) | 2 | **KEEP** | correct-as-is; the only member of the triad with both `size` and `invalid` — it sets the chassis | unchanged |
| 50 | **dark-mode-toggle** | 160 | 138/1 (1%) | 0 | **KEEP** | correct-as-is; `size="dock"` is a **declared** prop value, so the dock coupling is public, not hidden | unchanged; `styles.css` |
| 51 | **separator** | 156 | 133/0 (0%) | 0 | **KEEP** | correct-as-is; 1 mechanical copy | unchanged |
| 52 | **checkbox** | 120 | 105/0 (0%) | 0 | **KEEP** | correct-as-is. The one pair clearing the ≥2-space bar (`~radio-group`, props 0.60 / tokens 0.50) is a **chassis** fold, never a role fold | unchanged |
| 53 | **header-ribbon** | 117 | 96/3 (3%) | 0 | **KEEP** | correct-as-is; the second legitimate Surface consumer, invisible to DAG.md | unchanged |
| 54 | **alert** | 115 | 98/0 (0%) | 0 | **KEEP-THIN** | barrel↔SFC cycle; variant map minting `feedback-tone-*` belongs in `variants.ts`. **Not** an unmigrated shadcn port | unchanged |
| 55 | **surface** | 112 | 103/0 (0%) | 2 | **SPLIT** | wrong-grain: a contract with fan-in 12+ that `Omit<PrimitiveProps,"asChild">` structurally forbids composing, so 7 overlays hand-roll it. `material` is a re-minted `tier` breaching `axes.ts:9-11` | `_shared/surface/useSurface.ts` + a ~15-line SFC |
| 56 | **skeleton** | 97 | 75/8 (8%) | 1 | **KEEP** | correct-as-is | unchanged |
| 57 | **animated-digit** | 94 | 45/39 (41%) | 0 | **KEEP** | correct-as-is | unchanged |
| 58 | **label** | 94 | 79/0 (0%) | 3 | **KEEP** | correct-as-is; 1 mechanical copy | unchanged |
| 59 | **badge** | 89 | 69/12 (13%) | 0 | **KEEP-THIN** | barrel↔SFC cycle; variant map minting `badge-atom`/`glass-capsule` → `variants.ts` | unchanged |
| 60 | **input** | 85 | 74/0 (0%) | 2 | **KEEP-THIN** | correct-as-is; its `useVModel` is the entry's **only** vueuse edge | unchanged |
| 61 | **textarea** | 85 | 73/0 (0%) | 0 | **KEEP-THIN** | same; with both converted, `./forms` has no rationale | unchanged, folded into root barrel |
| 62 | **paper-backdrop** | 22 | 16/1 (5%) | 0 | **DELETE** | **vacuity** — an 18-line SFC whose body is one `<div>` carrying `@utility paper-underpaint`, which the consumer can write | subpath dropped |
| — | `src/components/index.ts` | 38 | — | 0 | **DELETE** | **vacuity** — zero importers (its own two comments say so), not in `exports`, divergent from `src/index.ts`, and it re-arms the optional-peer S0 | — |

**Deleted outright: 2 (paper-backdrop, `components/index.ts`). Merged away: 2 (drawer, expandable-container). Zero components are deleted on consumer count.** Every zero-consumer node above clears both bars — none is vacuous, none is superfluous — exactly as Rule 2 requires.

---

## 3. EDGE RULINGS — all 30

### 3a. The dock leak set — 7 sites, 5 edges, the whole reason the cluster exists

| edge | site | ruling |
|---|---|---|
| `dropdown-menu→dock` | `DropdownMenuContent.vue:11` | **SEVER-VIA `_shared/overlay/dock-participation.ts`** |
| `popover→dock` | `Popover.vue:8`, `PopoverContent.vue:13` | **SEVER-VIA `_shared/overlay`** — `Popover.vue:8` disappears entirely with `keepDockOpen` |
| `select→dock` | `SelectContent.vue:32` | **SEVER-VIA `_shared/overlay`** |
| `slider→dock` | `Slider.vue:12` (`dockContext`) | **SEVER-VIA the `useDockHold` return** — it already returns `dock?.held`; lines 74 and 164 are pure redundancy |
| `slider→dock` | `Slider.vue:13` (`useDockHold`) | **SEVER-VIA `_shared/overlay`** — `useDockHold` must move **with** `dockContext` or this edge survives the relocation |
| `dock→search` | `useDockSearch.ts:53` → `../../search/composables` | **SEVER-VIA `composables/search/`** — becomes a composable edge, not a component edge |
| `dock→dropdown-menu` | `DockTrigger.vue:11` | **KEEP** — ordinary upward composition, the one correct edge in the cluster; becomes `dock→menu` |

The deep specifier is **not** the fault: importing `dock/index.ts` would pull the 8,018-line subtree into every popover. The *location* is the fault.

### 3b. The cycle

**`dock → dropdown-menu → dock`. SEVERED by relocation, not inversion.** After the move the pair is a 1-edge DAG, `dock → menu`. Verified: no import loop exists at file granularity anywhere in this pair, so the sever costs nothing at runtime and buys the cluster's dissolution. The library's other 9 file-granularity SCCs — drawer (7 files), constellation (4), aurora (3), tabs (3), `_shared/selection↔interaction`, alert, badge, `glass/webgl`, `composables/color` — are invisible to the component projection and are booked as their own rows, not as a refutation of it.

### 3c. Remaining edges

| edges | ruling | what breaks |
|---|---|---|
| `blob→aurora` (1) · `fourier-field→aurora` (3) | **SEVER-VIA `composables/glass/webgl/backingSize.ts`** | nothing — 4 specifiers re-point. `backingSize.ts:20` already names both ceilings. Only `AV_DPR_MAX`+`resolveBudgetDpr` move; `clampBudget` has 17 aurora call sites and stays |
| `easing→configurator` (1) | **SEVER** by deleting `EasingConfigurator.vue` | `./easing` loses one export; 3 tags at the call site |
| `labeled-field→select` (1) | **SEVER** by demoting `LabeledSelect` | `./labeled-field` stops dragging the overlay chain |
| `card→surface` · `header-ribbon→surface` | **SEVER-VIA `_shared/surface`** | both lose `material=`; `HeaderRibbon.vue:29 material="functional"` → `tier="floating"`. Breaking, allowed |
| `command→dialog` (2) | **KEEP direction · SEVER the CSS payload** | `command/styles.css` must not name a dialog class. Invert: `DialogContent` gains the padding axis; `CommandDialogProps extends DialogContentProps` |
| `timeline→popover` (1) | **KEEP, on `continuous-timeline` only** | today all three variants carry it because the dispatcher statically imports all three |
| `carousel→button` · `number-field→button` (2) · `easing→button` | **KEEP** | nothing |
| `easing→{select,slider}` · `labeled-field→{input,label,slider,switch}` · `configurator→{fading-scroll,label}` · `tabs→{select,tooltip}` · `tags-input→chip` · `data-table→{table,skeleton}` | **KEEP** | nothing; `data-table`'s re-points at the 2 surviving table SFCs |
| `useSelectionGroup→tabs` (upward, ships on `./motion-core`) | **INVERT** — `useTabRovingFocus` → `composables/motion/morph/rovingFocus.ts` | nothing: the file imports `vue` only, so the vueuse/keyframes fence its own header defends survives the move |
| `styles/* → components/*` ×20 CSS `@import` | **INVERT** | 14 sheets become `<style src>`; 5 genuine registers (`_shared/feedback`, `_shared/menu`, `_shared/field/field-surfaces`, `dialog/placement`, `chip/accent-tone`) move **up** into `styles/`. Afterwards the count is **zero**. Cost: per-subpath consumers gain CSS tree-shaking and lose implicit load order — the three cascade-position comments at `glass.css:55,60` and `grain-overlay.css:9` move with `accent-tone.css` or are struck |
| `tabs⇄dock` (class-mediated, `.glass-drag-*`, no import) | **SEVER** — one declaration site in `styles/glass/glass-capsule.css`, not two | `tabs/styles/drag.css` keeps only the indicator z-index and the `:has()` pointer repair |
| `dock→search` (class-mediated, `.input-bar` descendant) | **SEVER-VIA a `data-` hook** | the dock stops depending on search's rendered class contract |
| `dialog⇄drawer` (reka 0.800, **no import edge**) | **SEVER-VIA `_shared/overlay` and the merge in §4** | see §4.2 |

**Resulting topology:** one 14-node composition cluster `{button carousel easing select slider number-field configurator fading-scroll label labeled-field input switch tabs tooltip}` — a legitimate control/field tree, not a leak — plus `{dock, menu}`, `{command, dialog}`, `{data-table, table, skeleton}`, `{chip, tags-input}`, and everything else a genuine singleton. Zero cycles. The 17,473-LOC procedural cluster, the second largest in the library, dissolves entirely.

---

## 4. THE MERGE / SPLIT SET

**4.1 `_shared/overlay/` — NEW. The seat that dissolves the dock cluster.**
```ts
export function useDockParticipation(el)   // context + hold + isTeleportedTarget + portal ATTRS beside their reader
export function useKeepOpen(trigger)       // the ONE latch/acquire/release/dispose; 4 sites supply a trigger only
export function overlayContentAttrs(o)     // surface axis + φ pad ladder + reveal attrs + the dock stamp
export { fixedHostAttrs, floatingHostAttrs }  // forwarding as an ALLOW list; the 38-entry denylist deleted
```
Closes by construction: the missing `data-glass-dock-portal` on tooltip and sub-content, the 4× φ-pad spread (`1rem` / `--spacing(2)` / `--spacing(1)`), the 10 hand-copied portal stamps against 3 readers, and 4 independently-latched `keepOpen` acquires. `resolveSurfaceClass.ts` (6 lines, constant for 6 of its 7 callers) dies here.

**4.2 `dialog` SPLIT → `dialog` + `sheet`; `drawer` MERGES INTO `sheet`.** The decisive evidence is not the 0.800 — it is that **`drawer.reka` is a strict subset of `dialog.reka`** (8 of 8 contained in 10; the two extras are `DialogClose` and `DialogTrigger`), and that `DrawerTitle`/`DrawerDescription`/`Header`/`Footer` are byte-identical to dialog's modulo the component name and one comment block.
```ts
<Dialog origin?="element">                         // centred; origin= absorbs expandable-container
<Sheet side="top|right|bottom|left" :detents?>     // edge-placed; detents present ⇒ the drawer's snap physics
// both compose _shared/overlay: Portal · Scrim · Panel(Title/Description/Header/Footer)
// dialog's 11 isCenter gates vanish with the split; useDrawerSnap (492 lines) is imported wholesale, not rewritten
```
`Drawer` retires as a public name. `HtmlHTMLAttributes` (the `<html>` element interface, used in exactly 6 drawer files and nowhere else in `src`) goes with it.

**4.3 `surface` SPLIT → `_shared/surface/useSurface.ts` + a ~15-line SFC.**
```ts
const { class: cls, attrs } = useSurface({ tier, shadow, rim, grain })  // emits data-shadow, so material-roles.css:20 finally paints
// `material` / SurfaceMaterial DELETED (a re-minted `tier`, breaching axes.ts:9-11); `tier` is the one axis
```

**4.4 `dropdown-menu` MOVE → `components/menu/`.** Same SFC names, one directory, `./menu` subpath, `./dropdown-menu` gone. `context.ts` (was `useMenuTrigger.ts`) keeps `PART_PAIRS` — and **popover adopts that same table**, replacing three hand-written arms with one fold.

**4.5 `timeline` SPLIT → three components.**
```
<ScrubberTimeline>  <SegmentedTimeline>  <ContinuousTimeline>   // 232-line dispatcher DELETED, not re-homed
// only ContinuousTimeline keeps the popover edge; the other two shed it
```

**4.6 `slider` SPLIT → `Slider.vue` + `Spectrum.vue`.** 13 variant rules and 3 negations become a sibling; `Slider.vue`'s 381-line `<style scoped>` becomes `slider/styles.css`; the two `backdrop-filter: none` declarations that blank the spectrum's glass are cured in the split, not around it.

**4.7 `handmark` SPLIT → `composables/ink/` + `HandMark.vue`.** 1,501 framework-free lines leave `components/`. The optional-peer S0 (`@mkbabb/pencil-boil` imported unbranched at `ink.ts:27` and `useHandMark.ts:21`, both on the `./handmark` static graph) is fixed in the same cut.

**4.8 `search` SPLIT → `composables/search/` (243+149+34+5 = 431) + `components/search/SearchBar.vue` (83).** Two empty variant arms collapse.

**4.9 `deck` MOVE → `composables/deck/`.** 0 SFCs; subpath unchanged.

**4.10 `table` SPLIT.** `Table.vue` + `TableEmpty.vue` survive; `TableBody/Caption/Cell/Head/Header/Row` (98 lines total) become one descendant stylesheet.

**4.11 `labeled-field` SPLIT.** Three relays keep; `LabeledSelect` — whose `items: readonly string[]` is a preset living in the library — demotes to demo.

**4.12 The control chassis.**
```ts
type ControlProps = { size?: ControlSize; invalid?: boolean; disabled?: boolean }
// checkbox · switch · radio-group · toggle-group all take it; classes:
//   control-surface glass-control-edge focus-ring tap-squish
// Roles stay reka-distinct. Four controls answer this four different ways today.
```
This is the fold DAG.md §4 item 2 asked for, and it is **INSUFFICIENCY redress** (D12 direction 2): checkbox has no `size`, radio-group has no `size`, toggle-group has neither.

---

## 5. DIRECTORY SETTLEMENT

**Pruned / agglomerated** — long-running dirs and sand alike:

| today | after | why |
|---|---|---|
| `dock/composables/` 15 files, 13 repeating the module name, + a 45-line barrel with 3 users | `dock/composables/{context,crossfadeContext,morphMeasure,railContext,useClickIntegrity,useMorph,useOverflowFit,useSearch,useShellProps,useSpring,useState,useTouchGate}.ts` | module-name stripping; barrel deleted |
| `aurora|blob|fourier-field/composables/` — 34 files holding 8 composables | `<field>/renderer/*.ts` + `<field>/composables/use*.ts` | `composables/` must mean composables; the real seam is the render arm |
| 6 single-file `composables/` dirs (completion-seal, easing, fading-scroll, handmark, pager-dots, typewriter) + 4 two-file | flat `useX.ts` beside the SFC | a directory is not earned by one file |
| `sortable-list/composables/` (7 files, 1 composable) | flat | wrong-grain |
| `typewriter/utils/` | flat | wrong-grain |
| `styles/` holding 20 `@import "../components/…"` | **zero** | one CSS lane |
| `dock/styles/` 19 files / 4,207 lines, `controls.css` outside the barrel | one barrel, `controls.css` inside it, `--dock-*` tokens home from `styles/tokens/` (36 declared outside, 54 inside) | a component's stylesheet cannot be assembled by the root sheet |

**Module-name stripping, applied library-wide:** `constellation{Field,Interaction,Render,Types,Well}.ts` → `{field,interaction,render,types}.ts` (well folds into interaction: 139 lines, 1 export, 1 caller) · `fourierField{GL,WGPU}Setup.ts` → `{glSetup,wgpuSetup}.ts` · `blob{Simulation}`/`resolveBlobSurface`/`uploadBlobUniforms` → `{simulation,resolveSurface,uploadUniforms}.ts` · `useBlob{Mood,Pointer,Satellites}` → `use{Mood,Pointer,Satellites}` · `aurora{FallbackGround,ImageSource}` → `{fallbackGround,imageSource}` · `chipVariants`→`variants` · `toggleGroupContext`→`context` · `popoverContext`→`context` · `useMenuTrigger`→`context` · `dialogStageContext`→`stageContext` · `sheet-motion`→`motion` · `coalesce-metric`→`coalesce` · `pagerWindow`→`window` · `searchVariants`→`variants` · `useConfiguratorState`→`state` · `useDataTable{Responsive,RowIdentity}`→`{responsive,rowIdentity}` · `useTab{DragMorph,Responsive}`→`{dragMorph,responsive}` · `useCompletionSeal`→`useSeal` · `useEasingPicker`→`usePicker` · `use-toast`→`queue` · `dark-mode-toggle.css`→`styles.css` · `dock/styles/dock.css`→`core.css` · `_shared/{disclosure/disclosure-context, disclosure/disclosure.css, feedback/feedback-tone.css, field/field-control.css, field/fieldControl.ts, menu/menu.css, menuRowClass}` → `{disclosure/{context.ts,styles.css}, feedback/tone.css, field/{control.css,control.ts}, menu/{styles.css,rowClass.ts}}`. **Inverse fault, same fix:** `carousel/interface.ts` → `types.ts` (19 modules use `types.ts`; this is the lone deviation). SFC PascalCase is the Vue idiom and is deliberately untouched.

**Naming conventions, one each:** `types.ts` · `variants.ts` · `context.ts` · `styles.css` · `useX.ts` (camelCase; `toast/use-toast.ts` is the only kebab file among 96).

**Test displacement.** `find src \( -name '*.test.*' -o -name '*.spec.*' \)` → **empty**; the "tests inside src" edict is already satisfied. What is **not** satisfied is isomorphism:

- Strike the non-source segments: `tests/components/custom/**` (16 dirs) and `tests/components/ui/**` (13 entries) — 28 directories interposed on paths that have no `src/components/custom` or `src/components/ui` to mirror.
- One path per source file: `dropdown-menu` has three homes (`dropdown-menu.contract.test.ts`, `dropdown-menu.public-contracts.test-d.ts`, `custom/dropdown-menu/DropdownMenuTrigger.action.test.ts`) → one, under `tests/components/menu/`.
- `.spec` → `.test` (`tests/menuRowClass.spec.ts` at the root).
- `tests/components/custom/blob/metaball-color.glsl-port.ts` is a fixture, not a test — out of the test tree.
- Follow the node moves: `tests/composables/{search,ink,deck}/`, `tests/components/{scrubber,segmented,continuous}-timeline/`, `tests/components/sheet/`; strike `paper-backdrop.contract.test.ts` and `table.contract.test.ts`'s six sub-component cases; `expandable-container.contract.test.ts` folds into `dialog`'s.

**Prose.** 28 Markdown files / 2,580 lines live inside `src/` — outside the 56,676 census and outside the 34%-prose figure entirely. `package.json files: ["dist"]`, so none of it ships. Move to `docs/` or count it; do not leave it uncounted.

**Export surface.** 72 subpaths today, and it is an accretion, not a design: **10 components have no subpath at all** (`accordion alert avatar checkbox input radio-group skeleton table tags-input textarea`) while `paper-backdrop` (16 code lines) has one. After the plan: −`./paper-backdrop`, −`./forms` (folded once `useVModel` dies), −`./styles.css` (one CSS lane), −`./dropdown-menu` +`./menu`, −`./drawer` +`./sheet`, `./timeline` → 3. Net ≈ 71, and the rule becomes stateable: **one subpath per public component, no exceptions in either direction.**

---

## 6. WHAT THE GRAPH CANNOT DECIDE — and the instrument

| question | why the graph is blind | the instrument |
|---|---|---|
| Does a zero-consumer component *earn its place*? | in-degree measures composition, not demand; 42 nodes at zero and every one clears the vacuity/superfluity bar | D5 story census + owner intent. The graph's job here ends at "ask the question" |
| Does each glass surface resolve a non-`none` `backdrop-filter`? | CSS classes are text to the extractor | paired π capture, chrome-devtools + `safaridriver`. Two named surfaces already measured failing; the spectrum slider and `.timeline-rail`-in-Firefox are added by this fold |
| Do the dual GL **and** WGPU arms both survive? (~9,279 LOC across three fields) | both arms are live code with identical shape | a device/support matrix measurement. **This must precede any `renderer/` reorganisation** — reshaping 9,279 lines that may then be deleted is wasted work |
| `command-dialog` padding: `:show-close="false"` or a `DialogContent` padding axis? | the overlap is proven statically; the *remedy* is a paint choice | paired capture at `demo/stories/containers/command.vue:185`, open, light+dark, Chromium + safari-app. Rule 6 — do not land either first |
| Can `tap-squish` serve radio-group? | the register is a self-selector; radio's rule is an *active-ancestor* selector over a `<span>` inside the `<button>` | a press-state capture on keyboard `Space` and on a padding-landing pointer press. This is the reason the four-control chassis needs a declared invariant *before* anything folds |
| Intra-node duplication (`SelectScrollUp/DownButton`, byte-identical) | the metric compares nodes, never files within one — blind by construction | a file-level clone detector. "One candidate pair in 1,891" is a **floor**, not a result |
| Is a comment documentation or a tombstone? | prose is stripped before extraction, by design | D1 historical assay per row. At least 14 shipped self-assertions are measurably false (enumerated in §7) |
| Is `configurator` (60% prose, 19 props) *right*, or merely non-vacuous? | the graph rules on structure; this is a design question | D12 proportion pass |

---

## 7. DISPROVEN — consolidated; no later round may re-raise these

**From `DAG.md` itself** (§0–§2 must be re-authored before any figure in them is cited again):

1. "**56 clusters, 53 isolated singletons, 43,929 LOC (78%)**" — FALSE. **36 / 30 / 15,577 (27.5%).**
2. "**The component graph is nearly EDGELESS**" — FALSE. **30 edges, 40 import sites.** Of the 12 edges recorded, **5 are phantoms** pointing at the component's *own* subdirectories (`aurora→composables`, `aurora→constants`, `blob→shaders`, `fourier-field→shaders`, `typewriter→utils`); only 7 of 30 real edges were seen. Cause: `dag3.mjs:106-109` `from "\.\./([a-z-]+)/` — requires a trailing slash, never resolves against the component-name set, and `[a-z-]` cannot match `.`, so every `../../X/` import is invisible.
3. "**42 of 62, 38,204 LOC, 67%**" — the LOC and the membership are FALSE (**30,594 / 54.0%**), and **11 of 42 members are wrong in each direction**. Cause: CSS `@import` and comment mentions counted as code consumers.
4. "**The one cluster of consequence: dock·slider·select·popover·dropdown-menu, 10,655 LOC**" — FALSE. That cluster is **19 nodes / 19,717 LOC**.
5. "**CSS classes: zero pairs score ≥0.34 anywhere; components are not duplicating each other's glass**" — UNSUPPORTED. 13 of 509 class tokens are JS identifiers, and 22 of 62 components fall under the MIN-4 degenerate guard, so the space is both polluted and half-dark. Recomputed top pair `progress~slider` **0.308**, intersection `[glass-liquid-fill, glass-track-well, glass-value-mark, glass-value-marks]` — genuine register sharing sitting 0.032 under the bar.
6. "**blob~fourier 0.45 on composables — not a fold candidate**" — the space was self-referential (`aurora.composables` lists aurora's own module-private files). Library-resolved: **blob~fourier 0.643, aurora~fourier 0.474, aurora~blob 0.471.**
7. "**configurator — slated for demotion**" — STRUCK. It rested on `src/styles/index.css` miscounted as a src consumer.
8. **SURVIVES INTACT:** the cycle `dock → dropdown-menu → dock`. It is the only DAG.md headline that re-derives.

**From the prior similarity passes:** v1's `alert ≈ toast ~1.0` (they legitimately share `_shared/feedback` — correct sharing) and its 6,000-line restructure (`composables/glass/webgpu/` already existed at 1,228 LOC with all four fields composing it); v2's `aurora ~ search = 1.0` (both had one class token, harvested from a comment).

**From the benches, this round:**

9. "The five dock leakers bypass the sanctioned barrel" **as a fault** — the deep import is tree-shake-correct; `dock/index.ts` would pull 8,018 lines into every popover.
10. "The `.dock-trigger` unification is done; `.dock-select-trigger`/`.dock-dropdown-trigger` are dead aliases" — **INVERTED.** Legacy names carry rules in **7** CSS files (`styles/index.css`, `styles/glass/material.css`, `styles/utilities/a11y-overrides.css`, `dock/styles/index.css`, `controls.css`, `controls/triggers.css`, `controls/touch-floor.css`); `.dock-trigger` appears in **2**. Deleting them today strips the dock trigger's entire glass material, focus ring and disabled state.
11. "Timeline re-forks the slider's track material" — FALSE, and backwards: `.glass-track` carries no material at all; `.timeline-rail` is the one that resolves `backdrop-filter`, and it is `.glass-track-well` (slider, progress) that computes `none`.
12. "SegmentedTabs is an overflow-scrolling strip, so the missing `scrollIntoView` strands a tab" — FALSE. `grep -rn 'overflow|scrollLeft|scroll-snap' src/components/tabs/` → zero; `tabs/index.ts:5` records the overflow axis as **retired**.
13. "`completion-seal`'s rAF is an unbounded loop" — FALSE. One-shot single-frame arm with full cancel bookkeeping. "`watercolor-dot` is an offender" — FALSE; it is the `useRAFLoop` exemplar.
14. "`data-table` is a member of the 19-node cluster" — FALSE; it heads its own 3-node cluster.
15. "Five vacuous `dropdown-menu` leaves, ~150 lines, five public names" — FALSE. **One** (`DropdownMenuGroup`, 31 lines). `Shortcut` has a live rule, `Sub` resolves the click/context union, `SelectGroup` adds geometry, `SelectSeparator` carries the de-shadcn'd warm hairline.
16. "`Surface.vue:44` is a `fixedHostAttrs` copy" and "replace all eleven hand-rollers" — FALSE. **6** are mechanical; 4 are supersets (need an extra-keys parameter); 3 (`TooltipTrigger`, `CollapsibleTrigger`, `PopoverTrigger`) strip `as` only and are correct-by-design; `Surface.vue` is the legitimate inverse.
17. "`tap-squish` is a drop-in for `.radio-group__face`" — FALSE. Five surface legs vs three, self-selector vs active-ancestor, and the press target is a different element from the painted surface.
18. "`resolveValueFraction` is identical to `ScrollProgressRim`'s math" — FALSE. Degenerate-`max` behaviour differs (`0` vs fall-back-to-1-and-divide).
19. "The deck is consumer #2 of the one `pagerWindow` oracle" (`deck/index.ts:19`) — FALSE; `find src/components/deck` shows no PagerDots import.
20. "`DrawerContent` uses `useSpringMount`" (`useSpringMount.ts:3-4`) — FALSE; it never imports it.
21. "`budget.ts` is wholly library-level" — FALSE. `clampBudget` has 17 aurora call sites; only `AV_DPR_MAX`+`resolveBudgetDpr` are exclusively foreign. Its `:59` and `:21-22` self-assertions are **true**; only `:9` is false.
22. "The graph's cycle claim is FALSE because file-granularity SCCs exist" — REFUSED. The claim is true at the declared projection; the 9 file-granularity SCCs are an **additional** row, not a refutation.
23. "`chip` reaches `value.js`" — the quarantine holds (EXEC-STATE, re-confirmed by static trace of `dist/`).
24. "Three of six giants misclassified" / "five of six" — it is **four** (`aurora blob fourier-field timeline`); `constellation` and `handmark` are genuinely edgeless.
25. "54 zero-consumer components" — self-contradicting; it applied the very regex the same bench had just proven broken.
26. **Shipped false self-assertions** (D1 `PROSE-ONLY` tombstones, each measured): `dialog/placement.css:12` (`data-placement` count in `dist/glass-ui.css` = 0) · `triggers.css:14-16` ("back-compat-free continuity" over a half-migration) · `freehand.ts:9-11` + `handmark/index.ts:10` (four brushes set `ribbon:"hull"`, not one) · `ContinuousTimeline.vue:291-301` (nothing is mount-gated; dist emits both sheets unconditionally) · `useTabResponsive.ts:16-19` (claims a hand-rolled lifecycle as a virtue against `useBreakpoint`) · `forms.ts:6-7,22` (names non-existent root exports, cites `MIGRATION.md` against the greenfield edict) · `controls.css:43` (`useDockItemDrag` exists only in that comment) · `select.css` phantom at 6 sites and `dock-controls.css` phantom at 5 — neither file exists.

---

## 8. LOC LEDGER — against 56,676 (34,018 code / 17,620 comment)

**Deleted outright, code (each figure measured):**

| item | lines |
|---|---|
| `timeline/GlassTimeline.vue` dispatcher | 232 |
| `blob` uniform-bridge twin (self-declared "BYTE-IDENTICAL") | 316 |
| `aurora/composables/wgpuSetup.ts` — two builders → one | 97 |
| `constellation/createConstellationField.ts` + 5 re-export hops + `Well` fold | ~130 |
| toast's 4 leaf SFCs (17+17+29+44) | 107 |
| table's 6 leaf SFCs (14×4 + 21×2) | 98 |
| drawer's 4 leaves, one copy survives in `_shared/overlay` | 95 |
| `easing/EasingConfigurator.vue` | 62 |
| `dock/composables/index.ts` | 45 |
| `PopoverContent` 3 arms → 1 | ~40 |
| `src/components/index.ts` | 38 |
| `_shared/menu` geometry dedupe (command + menu item blocks) | ~40 |
| 6 mechanical `fixedHostAttrs` copies | ~36 |
| `scroll-progress-rim/styles.css:85-116` | 32 |
| `DropdownMenuGroup.vue` | 31 |
| `dialog` Trigger + Close (reka re-export) | 28 |
| `SelectScrollUpButton.vue` (direction-parameterised) | 24 |
| `expandable-container` body-lock fork `:70-92` | 23 |
| `watercolor-dot/prng.ts` | 21 |
| `paper-backdrop/PaperBackdrop.vue` | 18 |
| `command/dialogContext.ts` | 17 |
| `_shared/resolveSurfaceClass.ts` | 6 |
| `RETIRED_FLOATING_ATTRS` denylist → allow list | ~40 |
| `scripts/gen-component-styles.mjs` + `./styles.css` + 20 `@import` lines | ~60 |
| **code deleted** | **≈ 1,636 (4.8% of code)** |

**Relocated, not deleted** (leaves `components/`, stays in the tree): `composables/ink/` 1,501 · `composables/search/` 431 · `_shared/overlay/` 217 · `composables/deck/` 202 · `_shared/surface/` ~100 · `backingSize` 2 exports · `styles/glass/{accent-tone,overlay-stage,drag}.css`. **≈ 2,500 lines cross a zone boundary.**

**Growth, itemised and justified against deletion first:**

| addition | lines | justification |
|---|---|---|
| `_shared/overlay/{keep-open-token, content}.ts` | ~60 | replaces 4 independently-latched acquires and 10 hand-copied portal stamps; **net negative** at the call sites |
| `ControlProps` on 4 controls | ~32 | **D12-INSUFFICIENT**: checkbox and radio-group have no `size`; two of four have no `invalid` |
| `fourier-field` keyboard path + `role`/`aria-label` | ~25 | **D11**: a shipped a11y gap under a live `interactive` prop, which its sibling already serves |
| `sheet/` + 2 timeline directories | 0 | pure relocation of existing branches |
| **total growth** | **≈ 117** | every line is affordance the audit marked missing, not machinery |

**Net: −1,519 code lines (−4.5%), −2,580 Markdown lines out of `src/`, +117 affordance.** Comment share is left to a D1 assay per row rather than a blanket strike — but the 14 false self-assertions in §7 item 26 come out unconditionally, since a comment that is measurably untrue is worse than no comment.

**Regeneration order — nothing downstream may be re-derived before this.** Fix `dag3.mjs:106-109` (optional trailing path segment; resolve every specifier against the filesystem and against the component-name set; walk every file in the directory, not the root SFC) **and** the `srcConsumers` extractor at `:105` (strip comments; JS/TS `import` only; exclude CSS `@import`; declare the barrel-exclusion rule in the output). Then regenerate. Then re-author `DAG.md` §0–§2, `EXEC-STATE.md` "Lead-verified facts" rows 2–3, and every count in `REDUCTION.md` derived from the edge set or the `42 / 38,204 / 67%` triple. The similarity, prop-space and token results use different extractors and are untouched — except that the CSS-class and composables spaces must be re-run under the degenerate guard before either is cited again.
