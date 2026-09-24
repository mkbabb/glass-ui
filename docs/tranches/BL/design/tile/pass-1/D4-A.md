# D4 · pass 1 · D4-A · the corner reads the box

| field | value |
|---|---|
| seat | D4 pass 1, research seat for D4-A (a content-derived role rule). Reads PORTFOLIO §0-§2, the D4-A section, §6 D4-A, §7, and the background W.md, X.md, HARNESS.md. No other family's section was read |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | the task named `91dbcbd8`. The worktree was cut at `329708ca`. `git diff --stat 91dbcbd8 HEAD -- src vite.targets.ts package.json` is empty, so `src/` is the tree the portfolio names |
| instruments | worktree `…/scratchpad/D4/p1/D4-A-research/wt` (node_modules symlinked, removed with `git worktree remove --force` at the end). The harness `docs/tranches/BL/design/tile/harness/` from the checkout, run against four builds: `head`, `a1` (arm A1), `a2` (arm A2), `a1f` (A1 plus a selected-edge floor probe). Seven scratch probes in `…/D4-A-research/probes/`: `trap.mjs`, `univ-cost.mjs`, `a2-timing.mjs`, `a2-framed.mjs`, `f29.mjs`, `utility-override.mjs`, `glance-arms.mjs`. Patches: `a1.patch`, `a2.patch`, `a1f.patch`. Logs: `logs/*.log`. Glance PNGs: `glance/` |
| engines | Chromium 149.0.7827.55 (`channel: "chromium"`) and Playwright WebKit 26.5, from `glass-ui/node_modules/playwright`, headless. Playwright WebKit is not Safari. Real Safari: UNMEASURED (owner's safaridriver checkbox) in every cell |
| load | load average 13.7-25 during the runs (other seats building). Geometry and paint numbers are settled reads. The two timing numbers in §2.2 and §3.3 are wall-clock and are labelled as indicative |

## 0 · In brief

1. **The portfolio's A1 sketch does not work as written.** `@theme { --radius-control: calc(var(--control-rung) / 2) }` is declared on `:root`. A custom property resolves its `var()` where it is declared, so it computes once at the root and every holder inherits that one value. Measured: the corner is `0px`, a square, in both engines (`trap.mjs`, rows a1/a2). A1 works only if the formula is re-declared on the element that publishes the rung. That can be done per holder (Button's form) or in one universal rule. §2.1 gives the precise form.
2. **A1, in its working form, turns T-1, T-2 and W-A green in Chromium and in Playwright WebKit on the real source.** T-1 8/8 (HEAD 3/8) and T-2 12/12 in both engines. W-A is 3/3 in both engines once the harness emits the chip's size utilities, and 2/3 on the harness as banked. That third cell is a harness defect, not a library one (§4.3). The rung/2 corner is a named role in the item's context (`--radius-control` resolves to 20 px on the item), so the T-1-vs-W-A split that HARNESS §6 flags on Button closes.
3. **A1's multi-line corner is always its one-line corner, and it rides the comfort axis.** 20 / 18 / 22 px at fine md / sm / lg, 25 px under `--ui-scale: 1.25`, and **30 px on a coarse pointer** (the md rung becomes 60 px). A two-line coarse tile 93.8 px tall with a 30 px corner reads as a soft lozenge, not a card (`f29.mjs`). If the canon holds the multi-line holder at 16 px (`DESIGN.md:386`, the owner's "more card like", and the value both keyframes.js sites now hand-set), A1 cannot deliver it and A2 is forced.
4. **A2 lands before paint.** On mount, content change and web-font swap, the ResizeObserver stamp is set in the same rendering update as the layout that grew the box, in both engines. An auditor observer that runs after the stamp and before paint saw 0 unstamped tall boxes (`a2-timing.mjs`). Three costs remain. (a) Any script that reads layout synchronously after a change sees the stadium, and that includes the battery's own T-1 and W-A reads (A2 FAILs `wrap` in T-1 and passes a frame later). (b) The corner steps from 20 to 16 px as the box crosses the rung. (c) A server-rendered first paint would be a stadium, though no consumer server-renders today.
5. **Census.** Of 46 active stadium-role declarations and 5 utility sites in `src/`, four holders take content that can wrap: ToggleGroupItem, the pill Chip (via `.glass-capsule`), the disclosure trigger (Accordion, Collapsible), and Button, which already obeys the rule. Badge (`whitespace-nowrap`), SelectTrigger (`line-clamp-1`), the dock controls (`nowrap`), the stepper (an `iconOnly` Button) and every mark, dot, track and handle cannot wrap and keep the stadium.
6. **Nothing in the library stops `rounded-pill` or `rounded-full`.** Either utility re-imposes the stadium (30.79 px, ÷h/2 1.00) under A1 and A2 in both engines, and no console output says so. `rounded-control`, the role utility, composes correctly (20 px under A1, 16 under A2). The consumer-side answer is a lint (§3.4).
7. **A answers the corner only.** T-3, T-4, T-5, T-6 and T-7 read exactly as at HEAD under A1. A floor probe that puts the selection on the plate's own 1 px border at `--foreground` turns every ToggleGroupItem T-3 cell green in light, dark and PRT, in both engines, and T-8 16/16. That probe is the floor, not the family.

## 1 · Baseline, re-run here

`node docs/tranches/BL/design/tile/harness/run.mjs --build …/out/builds/head --out …/out --webkit` (`logs/head-battery.log`):

| witness | Chromium | Playwright WebKit |
|---|---|---|
| T-1 | FAIL 3/8 | FAIL 3/8 |
| T-2 | PASS 12/12 | PASS 12/12 |
| T-3 | FAIL 2/15 | FAIL 2/15 |
| T-4 | FAIL 8/20 | FAIL 8/20 |
| T-5 | FAIL 19/38 | (Chromium only) |
| T-6 | FAIL 17/24 | FAIL 9/14 |
| T-7 | FAIL 4/12 | — |
| T-8 | FAIL 0/16, Safari unmeasured | — |
| W-A | FAIL 1/3 | FAIL 1/3 |
| W-B / W-C / W-D / W-E | FAIL 1/13, 0/7, 0/4, 0/6 | W-D 0/4, W-E 0/6 |

This is identical to HARNESS §4, row for row.

## 2 · The mechanism, stated precisely

### 2.1 A1: the rule, and where it has to live

`trap.mjs` renders five forms on a 144 px box, one line and three lines, in both engines. Identical numbers in both:

| form | one line | three lines |
|---|---|---|
| a · `:root { --radius-control: calc(var(--control-rung) / 2) }`, holder sets `--control-rung: 40px` | `0px` → 0 | `0px` → 0 |
| b · the same formula re-declared on every element (`:where(*)`) | 20 (÷h/2 0.77 on a 52 px box) | 20 |
| c · per holder, `border-radius: calc(var(--control-rung) / 2)` (Button today) | — | 20 |
| d · a padding-driven rung, `--control-rung: calc(1lh + 12px)` | 16 = h/2 on 32 px | 16 |
| e · a reader with no rung (root rung `19998px`) | `9999px` → h/2 | h/2 |

So the strongest A1 is this. The placement is the canon's; the probe put it in `theme/radius.css`:

```css
@theme static {
    --radius-control: calc(var(--control-rung) / 2);   /* was var(--radius-pill); keeps the rounded-control utility */
}
:root { --control-rung: calc(var(--radius-pill) * 2); } /* no rung = the stadium limit, so a rung-less reader is unchanged */
@layer base {
    :where(*) { --radius-control: calc(var(--control-rung) / 2); } /* resolve against the element's OWN rung */
}
```

Each holder publishes its rung and reads the role, and nothing else:

```css
.button             { --control-rung: var(--button-size);            border-radius: var(--radius-control); }
.toggle-group__item { --control-rung: var(--toggle-group-item-size); border-radius: var(--radius-control); }
.glass-chip         { --control-rung: calc(1lh + 2 * var(--chip-pad-block));
                      padding-block: var(--chip-pad-block);           border-radius: var(--radius-control); }
.glass-chip--md     { --chip-pad-block: 0.375rem; }   /* xs .125, sm .25, lg .5; chipVariants' py-* move here */
@media (pointer: coarse) {
    .glass-chip--interactive { --control-rung: max(calc(1lh + 2 * var(--chip-pad-block)), var(--touch-target)); }
}
.disclosure-group-trigger { --control-rung: max(2.75rem, calc(1lh + 2rem)); }
```

What the rule must specify, and why:

- **The rule is re-declared, not inherited.** Form a is the portfolio sketch, and it paints squares. `:where(*, ::before, ::after)` compiles to `:where(*)`, because a pseudo-element is not valid inside `:where()`. That is harmless: pseudo-elements inherit from their originating element, and `.glass-chip::after { border-radius: inherit }` takes the used value.
- **The rung is the holder's one-line box, stated in the same place as the geometry that produces it.** Holders whose height is a token (Button, ToggleGroupItem) name the token. Padding-driven holders (Chip, disclosure trigger) state `1lh + block padding`, and that pad has to move out of utilities into the same rule. Otherwise the rung and the box are two facts that can disagree (P-3). The chip's `py-*` utilities left `chipVariants.ts` for size classes in `glass-chip.css`.
- **The rung must equal the box's floor in every cell.** Button breaks this today on a coarse pointer (§3.5): its rung is 60 px while `[data-control-target]` floors its box at 44 px.
- **`--radius-control` stops being a root-retunable value.** A consumer that set `:root { --radius-control: … }` would be overridden per element. It is not in `tokens/manifest.ts` (`radius` lists `--radius`, `-sm`, `-xl`, `-2xl`, `-pill`, `-card`, `-media`, `-button`), so it is not a public token. Retuning goes through the rung.
- **The rule states a corner, not a stadium.** `--radius-badge` and `--radius-tab` stay on `--radius-pill`, because their holders cannot wrap.

### 2.2 A1's cost: a custom property on every element

`univ-cost.mjs`: 12 000 elements, a full style recalc forced by a body class flip, median of 72 per arm, interleaved. Chromium 4.50 ms without the universal rule and 5.80 ms with it (+1.3 ms, +29 %). Playwright WebKit 11.00 and 11.00, at the timer's 1 ms resolution. These are wall-clock under load 14-19 and are indicative only. The per-holder alternative (form c) costs nothing, but it repeats the formula in every holder, which moves the single source of record from the canon into each holder's stylesheet.

### 2.3 A2: the stamp

```ts
// _shared/extent/extent.ts: one ResizeObserver per document
function stampOne(el: HTMLElement, blockSize: number) {
    const rung = parseFloat(getComputedStyle(el).getPropertyValue("--control-rung")); // @property <length>, inherits: false
    const next = blockSize > rung + 0.5 ? "block" : "line";
    if (el.dataset.extent !== next) el.dataset.extent = next;
}
```

```css
@property --control-rung { syntax: "<length>"; inherits: false; initial-value: 0px; }
@layer components { [data-extent="block"] { --radius-control: var(--radius-field); } }
.toggle-group__item { --control-rung: var(--toggle-group-item-size); border-radius: var(--radius-control); }
```

A2 has to switch the **token**, not `border-radius`. The first probe wrote `[data-extent="block"] { border-radius: var(--radius-field) }`. It tied `.toggle-group__item` at (0,1,0) in the same layer and lost on source order: the stamp landed (`data-extent="block"`) and the item still computed `9999px` (`inspect.mjs`). Switching the role token avoids that specificity contest. The holder still names its rung, so A2 needs every rung declaration A1 needs, and adds a script.

## 3 · The research questions

### 3.1 Q1 · A1 or A2: rung/2 or exactly `--radius-field`

Rendered from the real `a1` and `a2` builds, not the harness's override rule (`glance-arms.mjs`, Chromium, second item selected; sheets in `glance/{preset,specimen,strip,wrap}-{light,dark}-sheet.png`, top to bottom: head, A1, A2):

| tile | box | HEAD | A1 | A2 |
|---|---|---|---|---|
| keyframes.js preset (md) | 208×61.6 | `9999px` → 30.79 (a lozenge) | 20 px | 16 px |
| keyframes.js specimen (sm) | 150.5×100.2 | → 50.08 (an oval) | 18 px | 16 px |
| value.js strip (Chip `icon`) | 44×44 | 22 (a circle) | 22 | 22 |
| wrap ToggleGroupItem, two lines (md) | 110×47.9 | 23.95 | 20 | 16 |

Light and dark give the same geometry; only the paint differs. Both arms read as cards at fine pointer. A1 is visibly softer on the preset tile (20 against 16) and close to indistinguishable on the specimen (18 against 16). Neither arm touches the strip: `shape="icon"` is a declared circle. A tile holding a glyph and a label stays a circle under either arm, so the strip's defect is not a corner-rule defect.

What decides between them is not the fine-pointer glance but the comfort axis (§3.5). The A1 corner is `rung / 2` at one line and past it, so it grows with `--ui-scale` and the coarse lift: 25 px at scale 1.25 and 30 px at coarse md. A2 stays at 16 px in every cell once a box is past its rung.

The canon therefore has two readings:

- **Keep `DESIGN.md:386` and the 16 px field row for any multi-line holder.** Then A1 is ruled out, A2 is forced, and A2's costs (§3.2) are the price. This is the reading consistent with the owner's "more card like" (a card does not get rounder on touch) and with both keyframes.js sites, which set `--radius-field` themselves today (`SpringPhysicsFacet.vue:198`, `EasingTarget.css:116`, at keyframes.js `5cf0f58a`). Under A2 those two overrides delete with zero visual change.
- **Amend.** Row 385 becomes `--radius-control | calc(var(--control-rung) / 2) | rung/2 | a control, one line or wrapped`. Row 386 narrows to text-entry fields (Textarea, and the dialog-nested field). The canon then accepts 18-22 px at fine pointer and 25-33 px on the comfort axis for a selectable tile. Under A1 the two keyframes.js overrides delete with a visible change (16 → 20 and 16 → 18).

**Seat reading.** A1 is the right rule for a control that wraps (a Button label, a pill Chip, a disclosure heading): a wrapped control should keep its control curvature, and A1 does so continuously and without script. A1 is the wrong rule for a holder that is multi-line by design, because the owner asked that holder to be a card, and A1 makes it a larger pill on touch. The content cannot tell the two cases apart, so one role rule for both has to pick one number. The measurements favour A2 for the number and A1 for the mechanism. The owner should see `glance/preset-light-sheet.png` and the coarse numbers side by side (30 against 16 on a 93.8 px tile). An owner-glance capture at the coarse cell is not banked; it is owed (§7).

### 3.2 Q2 · A2 timing

`a2-timing.mjs`, a plain page carrying the stamp code verbatim, both engines. Mutations run at the end of a rAF callback. Two readers:

1. An **auditor** ResizeObserver created after the stamp's. The spec delivers it after the stamp in the same broadcast, just before paint.
2. A **rAF-start** reader, one frame later.

The font swap is triggered at frame 30 by adding a Fira Code family whose file is served 700 ms late (`font-display: swap`).

| event | Chromium 149 | Playwright WebKit 26.5 |
|---|---|---|
| mount (a two-line holder appended) | stamp and auditor both at f5: h 54.38, 16px, `block` | f5: h 54.38, 16px, `block` |
| content change (one line → two, at f20) | f20: h 54.38, 16px, `block` | f20: the same |
| font swap (fallback 40 px → Fira 54.38 px) | `loadingdone` f114; stamp and auditor f115, 16px, `block` | stamp and auditor f73, 16px, `block` (WebKit fired no `loadingdone` event; the swap is visible in the height) |
| auditor reads with h > rung and no `block` stamp | **0** | **0** |
| rAF-start reads with h > rung and no stamp | 1: f115, `static` h 54.38 `9999px` | 1: f73, the same |
| Chromium screencast, painted frames decoded | 7 frames, 14 corner reads, **0** stadium corners on a tall holder | n/a |

The single rAF-start hit in each engine is the font-load case. The font-load task ran between two frames, the rAF read forced a layout with the new font, and the observer stamped later in the same rendering update. So no painted frame shows the stadium; a **synchronous reader** does. Because each mutation ran inside a rAF callback, the 0 counts for mount and content change are specified (observer delivery follows layout and precedes paint in HTML's "update the rendering"), not only observed. The screencast corroborates this and is weak on its own (7 frames).

The synchronous-read cost is concrete. The battery's T-1 and W-A add a line and read in the same task, so A2 fails `wrap` (`logs/…`, T-1 5/8 on `a2`: `wrap #0 ToggleGroupItem … 110.00×47.89 9999px→23.95`). Read one frame later, the same holder is flat at 16 in both engines (`a2-framed.mjs`: `+1 sync 47.9 9999px→23.95 ext=line | +1 framed 47.9 16px→16.00 ext=block`). Library FLIP code, a consumer measuring for a morph, or a test reading `getComputedStyle` right after a change would see the stadium.

Two further costs:

- **The step at the rung.** The corner drops from 20 px (a one-line stadium at 40) to 16 px as soon as the box passes 40.5 px (`a2-framed.mjs`: `mount 40.0 9999px→20.00 | +1 framed 47.9 16px→16.00`). On a coarse pointer it drops from 30 to 16 at 60.5 px. A1 has no step.
- **Without script the holder is a stadium.** That is E-2's "the defect returning silently", for a server-rendered first paint. No consumer server-renders today: no Nuxt, vite-ssg, `createSSRApp` or `renderToString` for Vue in value.js, keyframes.js, fourier-analysis or chicago. fourier-analysis's one `renderToString` is KaTeX (`web/src/lib/equation/render.ts:128`). The case exists in the library contract, not in the constellation.

Real Safari: UNMEASURED (owner's safaridriver checkbox).

### 3.3 Q3 · Census: stadium-role holders whose content can wrap

`grep -rnE 'border-radius:[^;]*var\(--radius-(pill|control|tab|badge|dock)\)' src` (minus `theme/radius.css` and comment lines) gives **46 declarations**. `grep -rnoE '\brounded-(pill|full|control|tab|badge|dock)\b' src` gives **5 utility sites**, plus the 4 conflict-map entries in `_shared/class-names.ts:208-224` and 2 comment mentions. The portfolio's "29 and 9" used a different cut; these are this seat's counts.

| holder | declaration | wraps? | composes the rule? |
|---|---|---|---|
| ToggleGroupItem | `toggle-group/styles.css:70` | yes (the tiles, UIA-KF-046) | **yes**; the rung is `--toggle-group-item-size` |
| pill Chip | `glass/glass-capsule.css:70` via `.glass-chip` | yes (UIA-V-180 in value.js; W-A 110 px cap) | **yes**; the rung is `1lh + 2 × pad`, and the pad moves into `glass-chip.css` |
| disclosure trigger (Accordion, Collapsible) | `_shared/disclosure/disclosure.css:41` (`--radius-control`) | yes (a heading; UIA-F-100) | **yes** for `.disclosure-group-trigger` (rung `max(2.75rem, 1lh + 2rem)`). **No** for a bare CollapsibleTrigger, whose padding is the consumer's: it has no rung to publish and stays the stadium limit (counterexample C-3) |
| Button | `button/styles.css:74` | yes | already obeys it; folds onto the role |
| `.configurator-preset-chip` | `configurator/styles.css:483` | unlikely: `shrink-0` keeps max-content (`Configurator.vue:392`). Not measured | only if its row constrains width |
| `.menu__trigger:focus-visible` | `glass/overlay-plate.css:188` | the corner is set only while focused; the label could wrap | owed: a trigger whose corner changes on focus is its own defect |
| stepper (UIA-KF-111) | an `iconOnly` Button (`NumberFieldStep.vue:51-60`) | no (a glyph) | rides Button; nothing to do |
| Badge | `rounded-badge`, `badge/index.ts:44` | no (`whitespace-nowrap`) | no |
| SelectTrigger | `rounded-pill`, `SelectTrigger.vue:59` | no (`line-clamp-1`) | no |
| dock tab button and dropdown trigger | `dock/styles/controls/tab-button.css:39`, `triggers.css:45` | no (`white-space: nowrap`, `:50`, `:34`) | no (D2 owns the dock) |
| dock icon button, touch floor, shell, shape | `icon-button.css:48`, `touch-floor.css:114`, `shell.css:387,442`, `shape.css:68` | no | no |
| `.input-pill`, `.field-control[data-kind=input]`, `.input-bar` | `control-surfaces.css:29`, `field/control.css:153`, `utilities/components.css:20` | no (single-line inputs) | no; `--radius-control` readers with no rung keep 9999 (form e) |
| marks, dots, tracks, handles, grips, thumbs | StatusDot ×5, avatar ×2, PagerDots ×2, slider ×2, switch, radio-group, control-bit face, dot-ring, sortable handle, sheet grip, dialog close, dark-mode toggle, expandable trigger (a glyph), Timeline ×2, scroll rim, pager ring, liquid fill, track well, scrollbar thumb, chip remove ×2, menu radio dot | no | no |
| utilities: ConfiguratorRow reset, SelectItem dot, Skeleton | `rounded-pill` / `rounded-full` | no | no |

So the rule has four composers: ToggleGroupItem, the pill Chip, the disclosure group trigger, and Button. The other readers of `--radius-control` are unaffected: with no rung published they resolve to the stadium limit (form e). One consumer reader is fourier-analysis `.preset-pill { border-radius: var(--radius-control) }` on a Button (`FunctionInput.vue:290-292`). It resolves against the Button's own rung, so it reads 20 px on one line, unchanged.

### 3.4 Q4 · What stops a consumer utility

`utility-override.mjs`, the `preset` scene, the class added to item 0; utilities injected in `@layer utilities` exactly as Tailwind v4 emits them:

| build | none | `rounded-pill` | `rounded-full` | `rounded-control` | console |
|---|---|---|---|---|---|
| A1, Chromium | 20.00 | 30.79 (÷h/2 1.00) | 30.79 | 20.00 | 0 |
| A2, Chromium | 16.00 | 30.79 | 30.79 | 16.00 | 0 |
| A1, Playwright WebKit | 20.00 | 30.79 | 30.79 | 20.00 | 0 |

Today nothing stops it. The utilities layer outranks components, and `cn()`'s radius bucket (`class-names.ts:208-224`) lets the consumer's class win because the holder's recipe carries no radius utility. The library cannot refuse the utility without `!important`, which would break every legitimate override. The options, from strongest:

1. **A consumer lint.** In each consumer's own tranche (E-6), flag `rounded-(pill|full)` on `ToggleGroupItem`, `Chip` (pill), `Button`, `AccordionTrigger` and `CollapsibleTrigger`, and point to `rounded-control`, which composes (measured above). The lint names the role, not a value.
2. **A DEV warning.** Under A2 the observer already holds each holder; in DEV it can compare the used corner with the stamp's expected value and warn once. Under A1 the check has to be a DEV-only `onMounted` read in each holder. Neither was built here, so both are UNMEASURED.
3. **Nothing.** The consumers already cleared this case: keyframes.js removed `rounded-pill` in `9262899b` (X §2), and no remaining F-30b consumer site puts `rounded-pill` or `rounded-full` on a multi-line holder (X §4.2 lists fourier-analysis F5 `rounded-full` on a single-line pill, where it is legal).

### 3.5 Q5 · F-29: the corner under `--ui-scale` and the coarse floor

`f29.mjs` on `a1`, `wrap` scene. Each cell reads one line → +1 line → +2 lines, as box height → used corner. Chromium and Playwright WebKit agree to 0.1 px.

| cell | ToggleGroupItem | pill Chip | Button |
|---|---|---|---|
| fine | rung 40: 40→20 · 47.9→20 · 78.5→20 | rung `1lh + .75rem` = 33.4: 33.4→12.95 (width-clamped, §4.3) · 54.8→16.70 · 76.2→16.70 | rung 40: 40→20 · 52.4→20 · 86.1→20 |
| coarse | rung 60: 60→30 · 93.8→30 · 162.7→30 | rung 44: 44→22 · 54.8→22 · 76.2→22 | **rung 60, box floor 44**: 44→22 · 102.9→30 · 178.6→30 |
| `:root { --ui-scale: 1.25 }` | rung 50: 50→25 · 59.4→25 · 97.6→25 | unchanged (the chip does not ride the scale) | rung 50: 50→25 · 86.1→25 · 149.2→25 |
| `[data-scene] { --ui-scale: 1.25 }` (a subtree) | unchanged, 40→20 | unchanged | unchanged, 40→20 |
| coarse and `:root { --ui-scale: 0.8 }` | rung 44: 44→22 | rung 44: 44→22 | 44→22 · 69.3→22 |

- **The corner follows the rung** under the root scale and the coarse lift, in both engines. The 44 px floor holds (`max(calc(2.5rem × 0.8), 2.75rem)` = 44).
- **A subtree `--ui-scale` moves neither the box nor the corner.** `--control-h-*` are declared on `:root` (`tokens/sizing.css:26-29`) and inherit as resolved token streams. That is F-29's own finding and is outside A's scope. A1 is consistent with it: the corner follows whatever rung the box actually has.
- **Button on a coarse pointer is a live counterexample to "the rung is the box".** `--button-size` is 60 px, while `[data-control-target]` (`utilities/responsive.css:5-8`) floors the box at 44. The corner is a 22 px stadium at 44 and 30 at 102.9, so between 44 and 60 px it tracks content. The same holds at HEAD, since Button's law predates this family. A1 has to rule that the rung and the floor come from one declaration.

## 4 · The probe on the real source

### 4.1 What changed (`a1.patch`, 140 lines, 6 files)

`src/styles/theme/radius.css` (the role, the root rung, the universal rule), `src/components/button/styles.css:74`, `src/components/toggle-group/styles.css:67-70`, `src/styles/glass/glass-chip.css` (the rung, the pad and four size classes), `src/components/chip/chipVariants.ts` (`py-*` → `glass-chip--{size}`), `src/components/_shared/disclosure/disclosure.css` (the group trigger's rung). `a2.patch` (76 lines): `extent.ts`, the `ToggleGroupItem.vue` wiring, the registered rung and the token switch. `a1f.patch` adds one declaration to A1: `.toggle-group__item[data-state="on"] { border-color: var(--foreground) }`.

### 4.2 The battery

`node docs/tranches/BL/design/tile/harness/run.mjs --build …/out/builds/<label> --out …/out --webkit` (`logs/a1-battery.log`, `logs/a1f-battery.log`), plus `t1-corner-stops.mjs` on `a2`:

| witness | HEAD | A1 | A1 + floor edge | A2 |
|---|---|---|---|---|
| T-1 | 3/8 · 3/8 | **8/8 · 8/8** | 8/8 · 8/8 | 5/8 (Chromium; `wrap` fails on the synchronous read, §3.2) |
| T-2 | 12/12 · 12/12 | 12/12 · 12/12 | 12/12 · 12/12 | not run |
| T-3 | 2/15 · 2/15 | 2/15 · 2/15 | **8/15 · 8/15** | not run |
| T-4 | 8/20 · 8/20 | 8/20 · 8/20 | 8/20 · 8/20 | not run |
| T-5 | 19/38 | 19/38 | — | — |
| T-6 | 17/24 · 9/14 | 17/24 · 9/14 | — | — |
| T-7 | 4/12 | 4/12 | — | — |
| T-8 | 0/16 | 4/16 | **16/16**, Safari unmeasured | — |
| W-A (the §7 witness) | 1/3 · 1/3 | 2/3 · 2/3 as banked; **3/3 · 3/3** with the chip's utilities emitted | 2/3 · 2/3 | FAIL on the synchronous read; flat 16 a frame later |
| W-B, W-C, W-D, W-E | 1/13, 0/7, 0/4, 0/6 | unchanged | — | — |

Cells read Chromium · Playwright WebKit.

A1's T-1 cells, Chromium (Playwright WebKit identical to 0.03 px):

- preset `rung 40 · 208×61.58 20px→20 | 81.75→20 | 101.92→20 · named --radius-control`
- specimen `rung 36 · 150.53×100.16 18px→18 …`
- wrap ToggleGroupItem 20 flat, pill Chip 16.70 flat, Button 20 flat, all `named --radius-control`
- card and chipcell 16 (unchanged)

A1 + floor, T-3, per mode (light / dark / PRT):

| scene | fill ratio | ≥3:1 edge band | carrier bar |
|---|---|---|---|
| preset | 1.21 / 1.22 / 1.00 | 322.5 / 338 / 322.5 px² | 269 px² |
| specimen | 1.19 / 1.22 / 1.00 | 389 / 406.75 / 389 px² | 250 px² |

All six cells PASS in both engines. The edge carries while the fill stays at 1.2:1, and in PRT the fill carries nothing at all. Strip light and PRT, chipcell light and PRT, and card in all modes stay RED: those are Chip's flood and Card's arm, not holders this family changes. T-4 is unchanged at 8/20. The failing cells are the FadingScroll cut (`specimen … painted ring px top 1.00 … left 1.00`) and the consumer's dashed outline (`preset-verbatim … 0.00` on every side), neither of which a corner can reach.

### 4.3 A harness defect found on the way

`scenes.mjs:282-284` sources `src/components/**/*.vue`, `_shared/**/*.ts` and `**/index.ts` only, so `chip/chipVariants.ts`'s utilities (`px-3.5`, `py-1.5`, `size-10` and the rest) never reach the harness CSS. The check: `grep -o '\.px-3\\\.5\|\.py-1\\\.5\|\.size-10' out/builds/head/dist/assets/*.css` returns nothing; only `.aspect-square` and `.glass-chip--cell` are present. At HEAD the harness's one-line pill Chip is 25.9×21.4 (no padding at all), where the library's is 53.9×33.4. Under A1 the canonical harness chip is 25.91 wide and 33.41 tall, so the width clamps the corner (12.95, ÷h/2 0.78) and W-A calls that "one line at h/2 false".

A copy of the harness in the worktree with one added line, `@source "${wt}/src/components/**/*Variants.ts"`, emits them. There W-A is 3/3 in both engines: `wrap Chip pill · 53.91×33.41 16.70→16.70 (÷h/2 1.00) | 110×76.22 →16.70 | 110×119.03 →16.70`. The chip, strip and chipcell rows of every witness at HEAD measure a chip the library does not ship. The owner of the harness should widen the `@source`.

## 5 · Public API and consumer impact

- **Library API.** No prop and no component. The token meaning of `--radius-control` changes from "the stadium" to "half the control rung", and `--control-rung` becomes the holder-published input. `--radius-control` is not in `tokens/manifest.ts`. A2 adds an internal `_shared/extent/` module, a registered `@property --control-rung`, and a `data-extent` attribute on holders. That attribute is new public DOM.
- **Tests re-pointed** (`npx vitest run` in the worktree on A1: 5 failed, 77 passed, 1 expected-fail):
  - `radius-role-canon.test.ts` "collapses the pill role onto exactly 9999px": `--radius-control` leaves the pill role
  - `radius-role-canon.test.ts` "Button resolves its stadium against the control rung": the text pin `calc(var(--button-size) / 2)`
  - `radius-role-canon.test.ts:555-568`: the pin the portfolio names
  - `Button.test.ts` §5 RUNG: the same text pin
  - `chip.contract.test.ts` "carries an xs rung": `py-0.5` moved to CSS

  Every one is a source-text pin; none is a paint assertion.
- **keyframes.js** (`5cf0f58a`): delete `.preset-cell { border-radius: var(--radius-field) }` (`SpringPhysicsFacet.vue:197-198`) and `.specimen-tile { border-radius: … }` (`EasingTarget.css:115-116`). Under A2 this is a zero-pixel change (16 → 16). Under A1 it is visible (16 → 20 and 16 → 18). The dashed outline, the type pins and the washes stay: A does not touch state, so T-7 stays RED at K1 and K2 whatever the arm.
- **value.js** (`^7.0.0`): the strip is a declared circle, so nothing changes. ConsoleRail composes no library holder, so nothing changes. UIA-V-180 (the admin tag chip) gains the rule only once value.js is on a Chip that composes it, which is three majors away (X §5.4).
- **fourier-analysis**: `.preset-pill { border-radius: var(--radius-control) }` stays at 20 px on one line, unchanged. HarmonicLevelGrid (F1), a two-line Button tile, reads 20 px under A1 (as today) and 16 under A2 if Button composes the stamp. That is where PORTFOLIO §1.3 item 2 is live.
- **chicago**: nothing (single-line sets).

## 6 · Weaknesses, as named counterexamples

- **C-1 · the literal A1 paints squares.** A `:root` formula resolves against the root's missing rung: `0px` in both engines (`trap.mjs` a1/a2). Any reader that "simplifies" the universal rule away ships squares loudly. That is E-2's loud failure, but only if the change is ever painted.
- **C-2 · A1 rounds up on touch.** The coarse md tile is 93.8 px tall with a 30 px corner, and 25 px at `--ui-scale: 1.25`. "Card like" does not survive the comfort axis.
- **C-3 · a holder with consumer-owned padding has no rung.** A bare `CollapsibleTrigger` stays the stadium limit under both arms: the rule needs a declared rung, and A2's comparison needs one too.
- **C-4 · the rung and the floor disagree.** Button on a coarse pointer: rung 60, box floor 44, so the corner tracks content from 22 to 30 between 44 and 60 px (§3.5).
- **C-5 · A2 and synchronous readers.** A read in the same task as a change sees the stadium: the battery's own T-1 `wrap` cell, and the font-load rAF read in both engines (§3.2).
- **C-6 · A2 steps.** The corner drops 20 → 16 at 40.5 px, and 30 → 16 at 60.5 px on a coarse pointer.
- **C-7 · the consumer utility.** `rounded-pill` and `rounded-full` re-impose the stadium silently under both arms (§3.4).
- **C-8 · A cures the corner and nothing else.** T-3 is 2/15 under A1 until a floor carries the selection. T-4, T-5, T-6 and T-7 are unchanged. Playwright WebKit's ToggleGroupItem hover hang (HARNESS §6) remains in T-6's WebKit cells, 9/14 at HEAD and under A1.
- **C-9 · A1 costs every element.** Style recalc is +1.3 ms per 12 000 elements in Chromium (indicative, §2.2).
- **C-10 · the nesting inversion.** A 20 px tile inside the 16 px host card is rounder than its container (visible in `glance/preset-light-sheet.png`, middle row). The nesting law exempts a discrete child control, but a tile that fills its card edge to edge reads as a nested plate.

## 7 · Open

- The owner's ruling on §3.1: amend `DESIGN.md:385-386` (A1), or keep the 16 px row (A2 forced). A coarse-cell owner glance (30 against 16) is not banked.
- Real Safari for every cell: UNMEASURED (owner's safaridriver checkbox).
- The DEV warning for consumer utilities (§3.4 option 2): not built.
- Button's coarse rung/floor split (C-4) needs one declaration; it is Button's and F-29's to settle.
- The harness `@source` widening (§4.3); until it lands, chip rows at every label measure an unpadded chip.
- T-1's content-change read is synchronous. If A2 is chosen, the battery needs a framed read, or A2 is judged by §3.2 instead.
- A CollapsibleTrigger rung, or a ruling that a bare trigger is not a holder (C-3).
