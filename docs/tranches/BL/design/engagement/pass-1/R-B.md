# D5 · pass 1 · R-B: family B, one engage primitive

| field | value |
|---|---|
| seat | R-B, the family-B research seat of D5 pass 1 (`../REGISTRY.md` §3.1). Read: `../PORTFOLIO.md` §0-§3, §4 D5-B, §5, §6 D5-B, §7; `../REGISTRY.md`; `../BASELINE.md`; `../harness/HARNESS.md`; `RH.md`. No other family's pass-1 file was opened |
| model | `claude-opus-5-5`, asserted from own system identity |
| base | worktree at `2794898e`. The checkout moved to `2967ce43` during the run through docs-only commits (`git diff --stat 2794898e 2967ce43 -- src tests` prints nothing). `R-B.patch` passes `git apply --check` at `2967ce43` |
| engines | Chromium 149.0.7827.55, Playwright WebKit 26.5, headless, through the landed harness (`../harness/`). **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | first prototype run (rb1): 1-minute load 90-213. Final run (rb4, every number below unless marked): 45-116, most cells 45-62. Every cell line in the logs carries its load. No verdict below rests on a cell that differs between the two runs |
| prototype | `R-B.patch`: one door, `src/composables/motion/engage/useEngage.ts` (231 lines), and the release rule, `engage/release.ts` (102 lines), adopted by Slider, Switch, the accordion trigger and Separator (the passive atom); ModalOverlay stops writing `data-engaged`; the sortable list consumes the release rule's measurement |
| artefacts | `R-B/logs/rb4-final.log` (the final battery and probe, both engines), `R-B/logs/rb1-superseded.log` (the first build, and the same-load HEAD controls for E-2 and the slider's E-4), `R-B/logs/wk-isolate*.log`, `R-B/captures/` (48 PNGs and 4 contact sheets), `R-B/rb-probe.mjs`, `R-B/wk-isolate.mjs`, `R-B/wk-isolate2.mjs`, `R-B/battery.sh` |

## 0 · In brief

1. **The born-RED witness goes green on the trio.** One writer of `data-engaged`, under `engage/` (E-7 4/4, both engines), and every commit fires from the model: the switch and the accordion trigger pass the E-2 bar on the keyboard, programmatic, pointer and tap paths (Chromium 24/24, WebKit 20/24 with the 4 misses the page closes HEAD already has). HEAD at the same load: 0 of 8 commit cells (`rb1-superseded.log:42-59`).
2. **The commit is watched on `data-state`, not on a model getter.** A reka host reflects its model there whoever changed it, so an adopter passes `commit: true` and nothing else. One edge per commit on every path, 0 for a model written A→B→A in one task, 0 when the model lands before the first paint (probe, both engines).
3. **One release rule serves two of the existing owners.** The slider carries its release: 11.68 px (Chromium), 14.94 px (WebKit) against 0.00 at HEAD. The same windowed measurement cures the sortable list's E-4 differential (HEAD: the still release carries more than the fling, −5.02 px; prototype +10.44 px Chromium, +16.38 px WebKit), because HEAD's sampler has no age window and reads a held-still release as a fling.
4. **What B does not carry:** E-3 (the grow is paint and Q-3's ruling; ×1.000), E-6 (no idle answer; Q-2's default retires it), E-1 in the harness's shape (B's census is a mount registry, not a static declaration). Q-1 is answered at the door: a passive component mounts the primitive with `exempt: "<reason>"`.
5. **Five findings for the agglomerator** (§8). Two matter beyond B. (a) Playwright WebKit closes the page when any element paints `--control-surface-bg-hover`, with no input. That is a candidate root cause for PF-1 (`logs/wk-isolate2-head.log`). (b) The E-2 bar's pop arm cannot be met by a library spring without a pop of at least 4.8 %. That contradicts the spring register's own law, and an 8 % pop on a 320 px accordion row reads heavy against O-87.

## 1 · PORTFOLIO §6 D5-B, answered

### Q1 · the merge

Yes, as composition behind one door; no leaf is deleted. `useEngage` composes the shipped three (`useEngage.ts:136` hand, `:152` press, `:192` velocity) and adds what none of them had: the commit edge (`:203-228`), the release carry (`:111`, `release.ts`) and the census row (`:130`).

| leaf | callers today (read) | what the caller gains | what it loses or must carry through the door |
|---|---|---|---|
| `useDockHold` | **one**: `Slider.vue:81` at HEAD. It lives in `dock/` and the dock does not call it; not public (`dock/index.ts` does not export it) | nothing changes for the slider's hand; the four attribute writes leave its template | the door imports it from `components/dock/` (a layering inversion with precedent: `motion/morph/useSelectionGroup.ts:20` imports `components/tabs`). A clean merge moves it to `engage/` with its `_shared/overlay` hold-token dependency |
| `useLiquidPress` | Button (`Button.vue:110`, 8 handler bindings at `:179-186`), DarkModeToggle (`:23`), Timeline (`:231`), DockControl (`:132`); consumers value.js ×1 (`PaletteInspector.vue:256`), speedtest ×2 (`AdminDashboardLayout.vue:177`, `SurveyReview.vue:135`, **not in PORTFOLIO §1.5**), keyframes.js (PORTFOLIO §1.5) | the door binds the handlers natively and writes the press style itself, so an adopter's template binds nothing (Button's 8 lines go) | the door must pass `pressVar` (Button `--glass-btn-press-t`, DockControl `--dock-press-t`), `shrinkDepth` (DockControl 0.04, Timeline 0.04) and `squish` through, or those CSS reads rename to one `--press-t` (a clean break with CSS rows). The prototype hard-codes `squish: false` and `--press-t`. It stays a public leaf: four consumer sites read it |
| `useDragVelocity` | **one**: Slider; root-exported (`src/index.ts:445`, `public-surface.spec.ts:267`), 0 consumer reads | `onRelease(v)`, the release velocity through the same `tanh` pole as `--flex-vel` (`useDragVelocity.ts:72,232-236`) | nothing |

The god-module risk (PORTFOLIO §4 D5-B) is real at the press: the door carries the press leaf's options or the CSS renames. The prototype keeps four parts of 10-25 lines each in one 231-line file.

### Q2 · the model watcher

Measured with `rb-probe.mjs` (`rb4-final.log:161-177` Chromium, `:347-363` WebKit), counting `data-commit` additions:

| scene | keyboard | programmatic | pointer | model A→B→A in one task | model set in the mount's own task | model set two frames after mount |
|---|---|---|---|---|---|---|
| switch | 1 · 1 | 1 · 1 | 1 · 1 | 0 · 0 | 0 · 0 | 1 · 1 |
| accordion | 1 · 1 | 1 · 1 | 1 · not driven (PF-1) | 0 · 0 | 0 · 0 | 1 · 1 |

(Chromium · WebKit.) HEAD reads 0 everywhere (no edge exists). Exactly one per commit. The `update:open` double-fire F-70 records does not reach a `data-state` observer: the DOM attribute changes once and the observer compares `oldValue` (`useEngage.ts:215-217`). Uncontrolled reka components are covered too, since `data-state` reflects reka's internal state. The async-arrival case fires (§5).

### Q3 · momentum, one rule

The rule (`release.ts`): **measure** the release velocity as the chord over pointer samples no older than `ACKNOWLEDGE_WINDOW_MS` before the release (`release.ts:48-58`; the window is the envelope table's existing figure, not a new one), and **settle** on a named spring row seeded with that velocity (`impulseFrames`, `release.ts:78`, sampled from keyframes.js's `SpringProgress`, played as WAAPI keyframes on the row's own `--spring-<row>-settle` clock).

| surface | owner at HEAD | E-4 at HEAD (same run) | with the rule | reading |
|---|---|---|---|---|
| slider | none (velocity dies at `pointerup`) | carry 0.00 px, both engines (`rb1-superseded.log:72-79,226-233`) | **PASS**: fling carries 11.68 px Chromium, 14.94 px WebKit; still 0.00; largest frame jump 7.2 / 6.1 px; PRM carry 0.00 (`rb4-final.log:42-52,234-244`) | the thumb leaves at the finger's velocity (saturated through `V0·tanh(v/V0)`, V0 = 900 px/s, `useDragVelocity.ts:236`) and the `dock` row (the engaged rung's spring) brings it home to the value. The value does not move: precision stays the finger's |
| sortable list | `VelocitySampler`, `sortable-list/motion.ts:82-104` | **FAIL**: still release carries 31.57 px, fling 26.55 (Chromium); +2.56 px (WebKit) (`rb4-final.log:53-61,245-253`) | **PASS**: +10.44 px Chromium, +16.38 px WebKit; still carries 0.00 | HEAD's chord has no age window and the release is not sampled (`drag.ts:354`), so a finger held still 250 ms releases with the fling's velocity. The rule's window plus one release sample cures it. The ghost's one-frame jump (74.9-80.2 px, RH §3 item 2) is untouched: it is the flight's landing, not the velocity |
| Sheet detents | own: last single-move delta (`sheet/detents/use.ts:197-199`, read at `:215`) | unreadable (the sheet paints in flow, RH §3 item 1) | not built | the same defect class by reading: no age window, so a still release projects the last move's velocity. The projection (`projection.ts`) already rides a named row; only the measurement would change. **UNMEASURED** |
| tabs drag | keyframes.js `Draggable`'s velocity window, through `useDragMorph` (`useDragMorph.ts:14-17,294-298`) | as BASELINE §0.1 | not built | a fifth owner PORTFOLIO §1.3 item 1 does not name: the measurement lives in keyframes.js |
| Carousel, Deck | the platform's scroll-snap | Chromium PASS (BASELINE §0.1) | not applicable | the platform is the owner; nothing to consume |

One rule serves the measurement for every script surface. The settle half has three shapes (an impulse carry, a projection to a detent, a rAF flight), but each one reads a named row. So the one rule is "the windowed measurement plus a named row seeded with v0", not one function.

### Q4 · the registry as the census

A mount test over one exemplar per directory covers the 55 only when each directory has an exemplar scene. The harness maps 12 (`scenes/App.vue` `SCENE_OF_DIR`). That is H-2's work for any family, and B needs all 55 where a class table needs one per class. The registry cannot be `import.meta.env.DEV`-gated: the harness builds production. The prototype records only when the page defines `globalThis.__glassEngageCensus` (`useEngage.ts:126-130`), at no cost otherwise. Passive directories: §4.

### Q5 · cost of the host getters

Measured on the trio (§6): Switch +8/−1, accordion trigger +12/−1, Slider +21/−30. Per adopter: one import, one template ref, one call and one `ref=` attribute, 4-6 code lines. The forwarded-root trap recurs as `root.value?.$el` on each reka host.

## 2 · The prototype

| file | change |
|---|---|
| `composables/motion/engage/useEngage.ts` | new. The door: options `component`, `exempt`, `hold`, `press`, `commit`, `drag`, `heldOn`, `engagedOn`. The only file that writes `data-held`, `data-engaged`, `data-press` and `data-commit` (`:142-143,168,93-106`). The commit is the `panel` row's impulse, peaked at `HOVER_GEOMETRY_BUDGET − 1` (`:99`), on `transform` with `composite: "add"`. Under reduce the edge stays for a light leg and the geometry is not played (`:91-96`); the press drops its scale and keeps `--press-t` and `data-press` (`:161`) |
| `composables/motion/engage/release.ts` | new. `VelocitySampler` (moved from the sortable list, with the age window), `rowClockMs`, `impulseFrames`, `impulsePeak` |
| `composables/dom/useDragVelocity.ts` | `onRelease` |
| `slider/Slider.vue` | `useDockHold` + `useDragVelocity` + four template attribute writes → one `useEngage` call |
| `switch/Switch.vue` | `useEngage(root, { component: "switch", commit: true })` |
| `accordion/AccordionTrigger.vue` | `useEngage(trigger, { component: "accordion", press: true, commit: true })` |
| `_shared/disclosure/disclosure.css` | the press's light leg: `[data-press]` takes `--glass-plate-resting` (ties and follows the hover rule, so a sticky touch hover cannot hide it) |
| `separator/Separator.vue` | `useEngage(() => null, { component: "separator", exempt: "…" })` |
| `dialog/ModalOverlay.vue`, `glass/focus-veil.css` | the modal veil stops carrying `data-engaged`; it reads its overlay's `data-state="open"` |
| `sortable-list/{drag,motion}.ts` | the sampler comes from `engage/release.ts`; the release is sampled and windowed |
| `tests/styles/focus-veil.test.ts:237` | presence, not the string `"true"` (the attribute is now written by `toggleAttribute`) |

`vue-tsc --noEmit --project tsconfig.src.json`: clean. The affected unit files (15 files, 256 tests): pass, except the five `public-surface.spec.ts` cells that need a built `dist/` (absent in any fresh worktree) and the one focus-veil assertion the patch updates.

Four builds were needed: rb1 (first), rb2 (the sortable window), rb3 (the press leg's specificity), rb4 (the press leg without `color-mix`, after §8 F-1). Every number in §3 is rb4 unless marked.

## 3 · Its row on every E-witness (REGISTRY §3.3 item 1)

| witness | Chromium | Playwright WebKit | HEAD reference | verdict for B |
|---|---|---|---|---|
| E-1 | FAIL 0/3 (`rb4-final.log:152-160`) | FAIL 0/3 (`:338-346`) | FAIL 0/3 | **RED, by shape.** B exports no static `ENGAGE_DECLARATION`; its census is the mount registry (§4), 4 of the 6 probed directories present, the 2 missing not adopted. Carried by: B's registry once 55 exemplar scenes exist, or A's table if the census must be static |
| E-2 (switch, accordion) | **PASS 24/24**: peaks 1.051-1.080, troughs 0.996-0.997, settle 1.000; Tab entry and mount quiet (`:11-41`) | **20/24**: switch 12/12; accordion 8/12, the 4 misses are pointer and tap `ENGINE CLOSED, REPRODUCED 2/2` (`:203-233`) | 0/8 commit cells at the same load (`rb1-superseded.log:42-59`; WebKit `:196-213`) | **GREEN on the exemplars**, the WebKit misses being PF-1 (§8 F-1). Margin: bounce 0.003 against a bound of 0.002 (§8 F-2) |
| E-3 | FAIL 6/12: ×1.000 held, focused, touch-held (`:114-131`) | FAIL 6/12 (`:300-317`) | same | **RED.** B supplies the held edge (`[data-engaged]` 2 at 450 ms); the grow is paint plus Q-3. Carried by the family that owns the rung's look (E's promotion on coarse, an in-place recipe on fine) |
| E-4 (slider, sortable) | **PASS 4/4** (`:42-52`) | **PASS 4/4** (`:234-244`) | slider 0.00 both; sortable FAIL both (`:53-61,245-253`) | **GREEN on two surfaces**; Sheet unreadable, tabs and carousel not touched (§1 Q3) |
| E-5 (accordion, switch) | **PASS 8/8**: accordion Δscale −0.030, press-only `[background-color]`, and under PRM press-only `[background-color]` (`:62-76`) | 4/6: switch 4/4; accordion `ENGINE CLOSED, REPRODUCED 2/2` (`:254-266`) | Chromium accordion FAIL (BASELINE §2 E-5) | **GREEN in Chromium**; WebKit accordion is PF-1 (a touch sets a sticky hover, whose paint closes the page, §8 F-1) |
| E-6 | FAIL: 0 idle animations (`:132-151`) | FAIL (`:318-337`) | same | **RED (absent), RETIRE by default.** B has no idle answer and claims none: Q-2's default (b) retires S6 with the owner's words |
| E-7 | **PASS 4/4**: 1 writer, `engage/useEngage.ts`; modal open 0 `[data-engaged]`; slider held 2, PRM 2 (`:1-10`) | **PASS 4/4** (`:193-202`) | FAIL 2 writers | **GREEN** |
| E-8 (switch, accordion) | **PASS 5/5**: the commit's `script@450ms` resolves to `--spring-panel-duration`, minted [] (`:102-113`) | 3/5: accordion pointer cells close (`:288-299`) | GREEN (hold line) | **GREEN** (hold line kept); WebKit accordion PF-1 |
| E-9 (switch, accordion, slider) | **PASS 18/18** (`:77-101`) | 12/14: accordion pointer press closes (`:267-287`) | Chromium accordion press-light FAIL (BASELINE §2 E-9) | **GREEN in Chromium**; WebKit accordion PF-1 |

Not run here: E-2 and E-5 on Checkbox, RadioGroup, SegmentedTabs, ToggleGroupItem, Chip and Button (not adopted). The tabs drag, Sheet and Carousel E-4 cells are unchanged code. Real Safari: UNMEASURED in every row.

## 4 · Q-1 in a form the census can check (REGISTRY §3.3 item 2)

Default (c): declared exempt with a reason. B declares it at the door, in the component, not in a table:

```ts
useEngage(() => null, { component: "separator", exempt: "a rule between regions: nothing presses it and it reports no state" });
```

**The check.** Mount one exemplar per component directory with `globalThis.__glassEngageCensus` defined. PASS when every directory writes exactly one row and each row carries parts or a non-empty reason. Read on the prototype (`rb4-final.log:161-167`, `:347-353`, both engines):

| directory | row |
|---|---|
| switch | parts [commit] |
| accordion | parts [press, commit] |
| slider | parts [hold, drag] |
| separator | exempt: "a rule between regions: nothing presses it and it reports no state" |
| skeleton | no row (not adopted): FAIL, as it should |
| dialog | no row (not adopted): FAIL, as it should |

HEAD reads no row for any of the six (`:178-192`). What this costs: every passive directory (about 30) runs a composable that registers and returns. And the exemption list is a declaration spread across those files: it is visible only by running the census, never by reading one file. That is the honest difference from A's table. The census also needs an exemplar scene per directory (§1 Q4).

## 5 · The mount case (REGISTRY §3.3 item 3)

| case | reading |
|---|---|
| H-8 as the harness reads it (mounted committed, `?on=1&defer=1`) | **PASS** 4/4 per engine: scale range 0.000, body moved 0.00 px (`rb4-final.log:11-41,203-233`). The observer is attached at mount, and an initial `data-state` is not a mutation |
| the model set in the mount's own task (before the first paint) | 0 edges, both engines: the door arms one frame after mount (`useEngage.ts:220,225`) |
| the model set two frames after mount (an async load arriving) | **1 edge, both engines: it pops** |

The third row is B's open risk, and it is not B's alone. Seen from the component, an async model arriving after the first paint is the same event as E-2's programmatic commit (a model write with no input). A primitive cannot pop on one and not the other. The bar has to say which one wins (§8 F-3). If the async arrival must stay quiet, the consumer has to mark it, for example with a `hydrated` getter passed to `commit`. That is a consumer burden B can carry and no CSS family can.

## 6 · Cost on the trio, and the MIGRATION rows (REGISTRY §3.3 item 4)

`git diff --numstat` in the worktree: 11 tracked files, +89/−76, plus 2 new files, 333 lines. 13 files in `R-B.patch`.

| site | lines |
|---|---|
| Switch | +8 / −1 |
| accordion trigger | +12 / −1 (component), +9 / 0 (`disclosure.css`, the press light leg) |
| Slider | +21 / −30 |
| Separator (passive) | +6 / 0 |
| the door and the rule | 231 + 102 new |
| shared edits | `useDragVelocity` +19/−1, focus veil CSS +7/−3, ModalOverlay +1/−1, sortable +5/−38, one test line |

Extrapolated, not measured: about 25 interactive adopters at 4-12 lines each, plus about 30 passive adopters at 4-6 lines each, comes to roughly 300-450 lines across about 55 component files.

| row | what breaks | who reads it | action |
|---|---|---|---|
| M-B1 | `data-engaged`'s value: `"true"` → present-empty | no authored consumer (PORTFOLIO §1.5); `tests/styles/focus-veil.test.ts:237` | updated in the patch |
| M-B2 | the modal veil no longer carries `data-engaged`; it reads `[data-state="open"] > .glass-focus-veil` | no consumer reads `.glass-focus-veil` (PORTFOLIO §1.5) | none |
| M-B3 | `useDragVelocity` gains `onRelease` (additive) | root export, 0 consumer reads | none |
| M-B4 | `VelocitySampler` moves from `sortable-list/motion.ts` to `composables/motion/engage/release.ts` | internal (`sortable-list/index.ts` exports components and `SortableId` only) | none |
| M-B5 (not in the prototype) | if `useEngage` replaces `useLiquidPress` as the public press | value.js ×1, speedtest ×2, keyframes.js (PORTFOLIO §1.5) | a MIGRATION row per consumer in its own tranche; the prototype keeps `useLiquidPress` as a public leaf and breaks nothing |
| M-B6 (not in the prototype) | `.tap-squish` and `.interactive-item` stay as the no-JS floor under B | fourier-analysis, chicago, keyframes.js | none under B |

`useEngage` is not exported in the prototype. Exporting it is a pass-2 decision.

## 7 · Paint (REGISTRY §3.3 item 5)

`R-B/captures/`: per engine and theme, the switch and the accordion trigger at rest, pressed, at the commit's peak (60 ms after a programmatic commit) and committed; the slider at rest, held (full viewport: the veil and the loupe), mid-carry 40 ms after a fling, and settled. 48 PNGs at 2× and one contact sheet each: `sheet-chromium-light.png`, `sheet-chromium-dark.png`, `sheet-webkit-light.png`, `sheet-webkit-dark.png`. WebKit's accordion press is a held Space (its pointer path closes the page, §8 F-1). Real Safari: UNMEASURED.

**The gestalt read is not this seat's to give** (REGISTRY §2.5: seats that did not build the route). Author notes for those seats, against O-87:
- The switch's commit is an 8 % swell with a 0.3 % rebound, on top of the thumb's travel. It reads as a pop, and nothing in iOS's switch pops. On a 44 px switch it is about 3.5 px.
- On the full-width accordion row the same 8 % is about 26 px of growth at 320 px. Uniform in ratio, it is far heavier on a wide control. A size-aware or pixel-capped amplitude is the obvious refinement, and §8 F-2 bounds how small it can get while E-2 stays as written.
- The press light leg (the resting plate) is clear in light and nearly invisible in dark (`sheet-chromium-dark.png`, accordion-2-pressed).
- No lighting layer is added. The commit is geometry only, the press light is one existing plate token, and the slider carry is a translate.

## 8 · Findings for the agglomerator

| id | finding | evidence | routes to |
|---|---|---|---|
| F-1 | **Playwright WebKit closes the page when any element paints `--control-surface-bg-hover`**, with no input: on the accordion trigger and on the Switch root. That token is `color-mix(in oklab, var(--glass-plate-quiet), var(--glass-plate-resting) 35%)` (`styles/tokens/glass.css:257`). Its two inputs alone paint fine (`color(srgb … / 0.1)`, `/ 0.14`), and so does `scale: 0.97`. The hover rules that paint it are `disclosure.css:75` and `glass/control-surfaces.css:84`. This is a candidate root cause for PF-1 (the ToggleGroupItem and accordion pointer-entry closes) | `logs/wk-isolate2-head.log` (HEAD build); `logs/wk-isolate-rb3.log` (the rb3 press leg mixed that token and closed the page on a held Space, which no input had done at HEAD: `logs/wk-isolate-head.log`); rb4 without it: alive (`logs/wk-isolate-rb4.log`) | PF-1's owner (D4). Real Safari UNMEASURED |
| F-2 | **The E-2 bar's pop arm against the spring register's law.** `springPresets.ts` says exactly one row rebounds and "a celebration's liveliness belongs to the LIGHT channel … never to a geometry bounce". The bar needs a bounce ≥ 0.002 after a peak ≥ 0.015. On the one rebounding row (`panel`, ζ 0.71) successive extrema shrink by e^(−πζ/√(1−ζ²)) = 0.042, so the peak must be at least 0.048. The prototype peaks at 0.08 and passes with 0.001 to spare (trough 0.997). The travel arm (overshoot ≥ 0.5 px) needs the same rebound on a body | `rb4-final.log:11-41` | the agglomerator: the bar's bounce arm, the register's law, or Q-5's commit form yields. O-87 weighs against a bigger pop |
| F-3 | **E-2's programmatic cell and H-8's async arrival are one event** (a model write with no input, after the first paint). B fires both | §5 | the checklist: state which one wins |
| F-4 | **The sortable list's still release carries the fling's velocity** (no age window, release not sampled). Chromium: still 31.57 px against fling 26.55 px | `rb4-final.log:53-61`; cured at `:42-52` | B's rule (in the patch) |
| F-5 | **The Sheet's detent velocity is a last-move delta** with no age window (`sheet/detents/use.ts:197-199`): the same class as F-4, by reading | unmeasured (the sheet paints in flow) | B's rule, once RH §3 item 1 is fixed |
| F-6 | A fifth velocity owner: keyframes.js `Draggable` under `useDragMorph` (the tabs drag) | `useDragMorph.ts:14-17,294-298` | PORTFOLIO §1.3 item 1's census |
| F-7 | speedtest reads `useLiquidPress` ×2 | `AdminDashboardLayout.vue:177`, `SurveyReview.vue:135` | PORTFOLIO §1.5's consumer census |

## 9 · Open gaps (B's own)

1. E-1 in the harness's shape: B's census needs either an adapter from the mount registry to the `{members, classes}` shape or a witness that reads the registry. It also needs 55 exemplar scenes.
2. The press options (`pressVar`, `shrinkDepth`, `squish`) through the door, or the CSS renames (§1 Q1). Not built.
3. The Sheet (F-5) and the tabs drag on the rule. Not built.
4. The async-arrival pop (§5). Needs the checklist's ruling (F-3).
5. The commit amplitude (§7, F-2). The 8 % figure reuses the ladder's hover budget; it is a reuse of a figure meant for another job, not a ruling.
6. The other 21 interactive directories and about 30 passive ones are not adopted. Of the trio's family, Checkbox, RadioGroup, Tabs, ToggleGroupItem, Chip and Button are not run.
7. Real Safari in every cell (owner's safaridriver checkbox). WebKit's accordion pointer and touch cells stay unreadable until PF-1 (F-1) is fixed.

## 10 · Reproduce

```sh
E=docs/tranches/BL/design/engagement; H=$E/harness; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules
git -C $S/wt apply "$PWD/$E/pass-1/R-B.patch"
node $H/build.mjs $S/wt --label rb4 --out $S/out
node $H/build.mjs "$PWD" --label head --out $S/out          # reads src only, writes nothing in the checkout
# battery.sh is the exact sequence run here (edit its S= line): every witness on rb4, the HEAD sortable control, then
node $E/pass-1/R-B/rb-probe.mjs --build $S/out/builds/rb4 --engine chromium --label rb4 --shots $E/pass-1/R-B/captures
node $E/pass-1/R-B/wk-isolate2.mjs --build $S/out/builds/head --engine webkit   # F-1
git worktree remove --force $S/wt
```
