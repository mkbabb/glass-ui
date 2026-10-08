# D5 · pass 1 · SPECS: one spec per surviving family

| field | value |
|---|---|
| seat | D5 pass 1, the synthesis seat (`../REGISTRY.md` §3.1, "synthesize") |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | `da1ab7b7`; `git diff --stat v10.1.0 HEAD -- src` prints nothing (`src/` is the 10.1.0 bytes, as for every pass-1 seat) |
| inputs | `../PORTFOLIO.md`, `../REGISTRY.md` (§2 checklist, §2.3 H-rows, §2.4 Q-1..Q-5, §2.5 gestalt, §3 plan, O-87), `../BASELINE.md`, `../harness/HARNESS.md`, and every file under `pass-1/`: `R-A.md`..`R-E.md` with their patches, `RH.md`, `RW.md`. `../../../CHARTER.md` design-loop section |
| instruments | one worktree at HEAD (removed after). (1) `git apply --check` of each patch alone and of ten ordered pairs (`syn/pairs.sh`, `syn/logs/patch-composition.log`). (2) R-A's and R-D's prototypes rebuilt with `../harness/build.mjs` and read by `syn/afterdrag.mjs` (the slider after a pointer drag; `syn/logs/afterdrag-{ra,rd}.log`). (3) The minimum commit crest per mapping, computed from the emitted `--spring-panel` curve (`src/styles/tokens/scheme-spring.css:62`; the computation is in §2, seam S-6) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load 92-160 throughout (other seats' browsers). Each probe line in `syn/logs/` carries its load. The probe reads geometry held for 1.5 s, not timing |
| standing defaults | Q-1 (c), Q-2 (b), Q-3 (c), Q-4 (b), Q-5 (a) until the owner rules (`../PORTFOLIO.md` §7). O-87 binds every rung's paint |

## 0 · In brief

1. **Three families survive: A, B, E.** A absorbs C and D. All three of those prototypes independently built the same mechanism: a registered `<number>` transitioned on a spring row and mapped to geometry. That mechanism makes the commit mount-safe with no guard, and it gives a keyboard, programmatic, pointer and tap commit one path (S-1, read from the three patches). D's census also became a class table, its key drifting from substrate to behaviour (S-2). Under the charter's rule ("two routes that share a mechanism share a family", `CHARTER.md:56`), they are one family. What C and D contribute that A did not build is folded into A's spec, with its source.
2. **C's and D's standalone charters are RETIRE-CANDIDATE, with the evidence.** C: no denominator (E-1 RED by construction), no reach to the teleported veil (E-7 RED), and its one unique claim, the inherited passive answer, measured as one ink rung "close to invisible" at a cost that drops WebKit to about 20 fps on a 2000-node host (`R-C.md` §2 Q1-Q2). D: its census "counts substrates", but 18 of 55 directories compose no shared recipe and 14 compose more than one (`R-D.md` §5 item 1). It cannot commit a stateless component and has no momentum by construction. Neither center carries its charter. Their mechanisms live on in A (and C's momentum leg in B).
3. **B stays alive as its own family.** It is incompatible with A on two axes. The commit: B fires a script edge from a `data-state` observer, A transitions a CSS phase. The census: B's is a mount registry, A's is a declared table. B also owns three things no CSS route can do, which every surviving route needs: the release-velocity rule (E-4), the one writer of `data-engaged` (E-7), and a commit edge for stateless controls (Button, action Chip). The REGISTRY §3.4 seam "A's held class and D's momentum gap both point at B's velocity rule" is **confirmed** (S-3).
4. **E stays alive, partial by design.** Its promote-in-place stage composes with A or B. Two of its claims conflict with A, and both are measured. The Switch as a stage client fights the census family's commit on the same `scale` (S-5). The slider's in-place grow is owned twice. The spec settles both: the stage serves hand-held controls only, and it owns the slider's engaged rung on every pointer.
5. **One defect shared by A and D, measured here.** Their in-place keyboard arm (`.glass-slider:…:has(:focus-visible)`) keeps the slider at ×1.060 for at least 1.5 s after a pointer drag, in both engines. Reka focuses the thumb by script, so `:focus-visible` matches. A plain click returns to ×1.000 (`syn/logs/afterdrag-ra.log`, `afterdrag-rd.log`, load 133-143). E-3 cannot see this, because it has no release cell. R-C and R-E saw the same reka behaviour on their own builds. Candidate row X-1 (§6).
6. **No prototype stacks on another.** Each patch applies alone at HEAD. All ten ordered pairs fail, on `Switch.vue`, `Slider.vue`, `focus-veil.css`, `ModalOverlay.vue` or the barrel (`syn/logs/patch-composition.log`). The prototype wave builds from these specs, not by stacking patches.

## 1 · The registry after synthesis

| id | family | status | why |
|---|---|---|---|
| D5-A | the declared register (A's table and class recipes; C's phase mapping; D's recipe placement on substrates, the bit's light press and the PF-1 token cure) | **ALIVE** (absorbs C, D) | the three prototypes share the commit mechanism (S-1) and A's and D's share the census mechanism (S-2) |
| D5-B | one engage primitive | **ALIVE** | incompatible with A on the commit path and the census; sole owner of the velocity rule, the writer and the stateless edge (S-3, S-4) |
| D5-C | the engagement scalar | **MERGED into A** (scalar and phase) and **B** (momentum); standalone charter **RETIRE-CANDIDATE** | §0 item 2; `R-C.md` §3.1 E-1, E-7 rows, §2 Q1-Q2 |
| D5-D | the material carries it | **MERGED into A**; standalone charter **RETIRE-CANDIDATE** | §0 item 2; `R-D.md` §5 items 1, 2, 4 |
| D5-E | the engaged stage | **ALIVE** (partial by design) | the only construction for the ladder's promotion reading; composes with A or B |
| D5-X1..X3 | not minted | unchanged | `../PORTFOLIO.md` §5; `RW.md` §4 reconfirms X3 (element-scoped View Transitions are Chromium-only) |

## 2 · The seams, checked

| id | seam | verdict | evidence |
|---|---|---|---|
| S-1 | A, C and D commit by one mechanism | **CONFIRMED** | A: `--rung-commit` registered `<number>`, `scale = 1 + (crest − 1)·sin(π·c)`, transitioned on `--spring-panel` (R-A.patch, `utilities/engage.css`). C: `--commit` level on `--spring-panel`, `4c(1 − c)` (`R-C.md` §1). D: `--commit-t`, `scale(1 + amp·sin(π·t))` on `--spring-panel` (R-D.patch, `glass/commit.css`). All three pass H-8 with no guard (8/8 per engine in each `R-*.md`). The keyframe sketch in the portfolio popped on mount in both engines, and neither `@starting-style` nor a ready guard stopped it (`R-A.md` §1 Q-2) |
| S-2 | A's and D's census are one mechanism | **CONFIRMED** | both export `ENGAGE_DECLARATION` `{members, classes}` over 55 directories, read by E-1 (A: 9 classes, `R-A.md` §1; D: 10, `R-D.md` §1). Of D's ten, `field`, `drag`, `overlay`, `static` and `row` name behaviour, not a material |
| S-3 | REGISTRY §3.4: "A's `held` class and D's momentum gap both point at B's velocity rule" | **CONFIRMED** | A: slider carry 0.00 px both engines, "pair with B" (`R-A.md` §1 Q-4). D: 0.00 px, "D merges with B for E-4" (`R-D.md` §5 item 4). B: the slider carries 11.68 px (Chromium) and 14.94 px (WebKit), and the sortable list's differential turns positive (`R-B.md` §1 Q3). C's carry is the same machinery (a WAAPI spring seeded with the measured velocity, `R-C.md` §2 Q5; `RW.md` §3.2: CSS alone reverses velocity on retarget in 5/5 cells, a seeded curve keeps it in 8/8) |
| S-4 | REGISTRY §3.4: "C's inherited scalar is one candidate answer to Q-1 for A and D" | **CONFIRMED as a candidate, weak** | it works mechanically in both engines: a Separator inside a pressed host steps from ink 0.08 to 0.16 (`R-C.md` §2 Q2). The author reads it as close to invisible. The inheritance costs ×7.6-8.3 style recalc at 2000 nodes in Chromium even with no reader, and WebKit falls to 79-88 frames in 4 s when every descendant maps it (`R-C.md` §2 Q1). It stays a Q-1 (a) variant row in A's spec, not built by default |
| S-5 | REGISTRY §3.4: "E pairs with any census family (it answers the rung beyond press and nothing else)" | **PARTLY REFUTED** | E did more than the rung beyond press. It made the Switch a stage client, and its held grow then masked the Switch's commit: pointer commit peak 1.046-1.052 with no bounce (`R-E.md` §2 E-2). A, C and D write the Switch's commit on `scale` or `transform` on the same host. E also grows the slider in place (×1.060), as A and D do on fine pointers. Pairing works only when E's clients are hand-held controls (the ladder's engaged rung) and E owns the slider's engaged rung alone. Both rules are in the specs below |
| S-6 | the commit's amplitude against E-2's bar | **the mapping decides it** | from the emitted `--spring-panel` curve (peak 1.04211, M = 0.04211). For the bar (pop ≥ 0.015, bounce ≥ 0.002), the minimum crest is **1.0152** for `sin(π·c)` (rebound 0.1319 of the crest), **1.0150** for `4c(1 − c)` (0.1755), and **1.0475** for a direct impulse on `panel` (0.0421, B's form). On a 44 px switch these are 0.67 px, 0.66 px and 2.09 px; on a 320 px row, 4.85 px, 4.80 px and 15.20 px. A phase mapping lets the commit be about a third the size of B's at the same bar. That weighs on O-87 ("deft") and on F-2 (`R-B.md` §8) |
| S-7 | one writer of `data-engaged` | **three candidates, one slot** | B `engage/useEngage.ts`, D `engage/useGraspEngaged.ts` and E `engage/engageStage.ts` each pass E-7 4/4 alone. Composed, the writer is the module that owns the held state's look: the stage when E is present, B's door otherwise (§5) |
| S-8 | the in-place keyboard arm | **REFUTED for A and D** | §0 item 5. E removed its own focus arm for the same reason (`R-E.md` §2 E-3), and C's slider stays engaged until blur (`R-C.md` §4 item 5) |
| S-9 | the async model arrival (`R-B.md` §8 F-3) | **family-independent** | an async model arriving after first paint is a programmatic commit, and every family's E-2 programmatic cell passes because that write pops. A CSS transition fires on any state change after the first style, just as B's observer does. Every surviving family pops on async arrival. The checklist rules on it; no family can be scored on it alone |
| S-10 | PF-1 localized | **CONFIRMED by two seats independently** | B: Playwright WebKit closes the page when any element paints `--control-surface-bg-hover`, with no input (`R-B.md` §8 F-1). D: re-pointing the accordion hover off that token lets its pointer and tap cells read; re-pointing the token itself lets ToggleGroupItem's read (`R-D.md` §5 item 5). Token: `src/styles/tokens/glass.css:257`; painters: `src/components/_shared/disclosure/disclosure.css:76`, `src/styles/glass/control-surfaces.css:84`. PF-1's owner is D4's. A's spec carries the disclosure side because its trigger recipe repaints that hover |

## 3 · D5-A · the declared register (absorbs C and D)

**Charter.** One table declares what every component directory is (its class) and what each class owes (rung, commit form, reason). Each class has one recipe of registered phases, transitioned on spring-table rows and mapped to geometry or light. The census reads the table, then proves at runtime that each rendered element composes the recipe its row declares. Velocity, the writer and the stateless commit edge are B's parts, consumed and not re-implemented. The engaged rung for hand-held controls is E's when E is present.

### 3.1 Mechanism, with targets

| piece | target (HEAD unless marked) | source in pass 1 |
|---|---|---|
| the declaration | new `src/composables/motion/engage/engageClasses.ts`, exported from `src/composables/motion/index.ts` as `ENGAGE_DECLARATION` (the harness contract, `../harness/HARNESS.md` §2 E-1) | R-A.patch (55 members, 9 classes) |
| classes | `pressed`, `chosen`, `held`, `dragged`, `disclosed`, `presented`, `field`, `ambient`, `static` (`R-A.md` §1 Q-1 table). Chip and Card are mode-split: the table declares the primary class, and the runtime read checks each rendered mode | R-A; D's ten-class cover (`R-D.md` §1) is the check that nine covers every interactive directory |
| the class stamp | `@property --rung-class { syntax: "<custom-ident>"; inherits: false; initial-value: unclassed }`, set by each recipe. The census compares the computed value with the declaration per exemplar. Names stay `--rung-*`: `--engage-*` on `:root` is the envelope mirror's namespace, and E-8 fails an orphan there (`R-A.md` §3 item 1; `R-C.md` §4 item 1) | R-A driftprobe: MATCH 5/5 and planted DRIFT, both engines |
| the phases | registered `<number>`s, `inherits: false`: `--rung-press` on `--spring-press`, `--rung-commit` on `--spring-panel`, `--rung-grow` on `--spring-dock`. The commit maps `1 + (crest − 1)·sin(π·c)`, crest `--scale-commit-pop` (a scale-register row, `src/styles/tokens/scale-paper.css`) at the bar's minimum, 1.0152 (S-6) | A, C, D (S-1) |
| where the recipe lives | as a substrate rule where a substrate exists, as an `@utility engage-<class>` where none does. The control bit: `src/styles/glass/control-bit.css` (the bit presses in **light** on its face, `--fill-selected`, not by host scale; at 20 px the scale channel is below the legible floor, `control-bit.css:286-290`, and a host squish summed with the pop fails the coarse tap: peak 1.004, `R-D.md` §3). The disclosure trigger: `src/components/_shared/disclosure/disclosure.css:69-100` (press in light on the press-drain attack; hover under `(hover: hover)` only, repainted off `--control-surface-bg-hover`, S-10). The capsule: `src/styles/glass/glass-capsule.css:118-139`, `glass-chip.css:27-57` (the Chip flood folds into the class's commit, an E-1 row). Utilities: `src/styles/utilities/engage.css` (new) | D's placement and light press; A's utilities |
| press recipes retired | `.tap-squish` (`src/styles/utilities/base.css:300-340`), `.interactive-item` (`base.css:253-259`), `.glass-capsule-hover` press (`glass-capsule.css:128-131`). Clean break, no alias. One MIGRATION row per consumer (§3.6) | FL-1 |
| commit form per class (Q-5 (a)) | `chosen` atoms with no body pop. Where a body exists, the body travels on `panel` (Switch thumb: 20.00 px, overshoot 0.84 px, both engines, `R-A.md` §1 Q-5). `disclosed` pops at the minimum crest (the 320 px row's 4.85 px total excursion is the O-87 risk, §3.7). `pressed` (stateless) commits through B's edge, below | A, D |
| the stateless commit (unbuilt) | B's door writes a parity attribute on each commit edge of a stateless control (`data-commit="a" ↔ "b"`). The recipe maps parity to `--rung-commit` 0 ↔ 1, and `sin(π·c)` pops in both directions. One CSS commit mechanism for every class; B supplies only the edge. The initial parity has no before-change style, so the mount stays quiet | this seat's proposal, from S-1 and `R-D.md` §5 item 2 |
| the held class | on a fine pointer: grow on `[data-held]` only (`useDockHold` writes it, `src/components/slider/Slider.vue:81`). **The `:has(:focus-visible)` arm is struck** (S-8). On coarse, or wherever E is present: no in-place grow, the rung is E's | A, D; S-8 |
| census test | `tests/styles/engage-ladder.test.ts:95-135` (the byte detector) is replaced by the declaration read plus the runtime arm. Two cells A proposed but did not build: at most one `engage-*` class per element (a DOM read), and no focusable role, `tabindex` or handler on a `static` member's root | `R-A.md` §1 Q-3, Q-1 |

### 3.2 E-rows

| row | measured on the merged mechanism's parts | how A meets it |
|---|---|---|
| E-1 | structure PASS (55/55, no stray, every class names a rung or a reason), both engines, in both A and D. Runtime PASS for `pressed`, `chosen`, `held`, `disclosed` (A) and control-bit, disclosure, track (D). RED: `dragged`, `presented`, `field`, `ambient` have no scene (`R-A.md` §2; `R-D.md` §2). The capsule's PRM light leg FAILs (the HEAD Chip defect) | H-2: one scene per class (input, menu or select, sortable-list, card, dialog with a `target`). An `ambient` pointer-field cell (a pointer move changes paint), because a press is the wrong probe. The capsule recipe's PRM light leg. The overlay exemplar must FAIL, not throw (`e1-census.mjs:53`, `R-D.md` §2) |
| E-2 | A 24/24 Chromium, 20/24 WebKit; C 24/24, 20/24; D 46/48, 48/48. Every WebKit miss is the accordion's PF-1 close, cured in D's build by the hover re-point. D's two Chromium misses are the radio ArrowDown moving focus without selecting, HEAD too (`R-D.md` §2) | the trio and Checkbox/Radio as built. To build: Tabs (cure the shipped mount glide, 121-123 px, `../BASELINE.md` §2 E-2), ToggleGroupItem, Chip, and Button through the parity edge |
| E-3 | desk ×1.060 (A, D) and ×1.042 (C) pointer-held and focused; PRM ×1.000; phone ×1.000 by design | desk pointer-held on `[data-held]`. Keyboard: struck (S-8); the keyboard engaged rung needs a modality signal, which belongs to B's door (§4). Phone: E's |
| E-4 | 0.00 px (A, D) | B's release rule (consumed) |
| E-5 | Chromium A 8/8, C 8/8, D 12/12; WebKit D 12/12 (with the hover re-point), A and C 4/6 (PF-1) | the disclosure light press plus the S-10 re-point. The chip and tabs press-light under PRM is still open (`../BASELINE.md` §0) |
| E-6 | RED (absent), every family | Q-2 default (b): S6 RETIRE with the owner's words (W-J.2 §3.2 item 5). A mints no idle rung. Skeleton's and StatusDot's state loops stand under `static` with a stated clause, and Skeleton's `1.1s` literal (`Skeleton.vue:99`) moves onto a clock token (`R-A.md` §6 item 5) |
| E-7 | A RED (2 writers); D GREEN with `useGraspEngaged` | the writer is B's door or E's stage (S-7). A writes no attribute |
| E-8 | holds in A, C, D (`--rung-press@120ms`, `--rung-commit@450ms`, minted []) | the `--rung-*` namespace rule |
| E-9 | A 18/18, D 30/30 both engines (trio) | each recipe's reduce arm retires its spatial legs and keeps its light leg |

Real Safari: UNMEASURED in every row. `RW.md` §4 seam (b) adds one cell A depends on: on iOS Safari `:active` needs a `touchstart` listener on the element or an ancestor, and a CSS press rung is silent without one. FL-7 cell, UNMEASURED.

### 3.3 Q-1 (passive components), census-checkable

Default (c). `static` is `{ rung: null, reason }`. Each static member composes `engage-static`, which stamps `--rung-class: static`, and the runtime read MATCHes the declaration (separator and skeleton, both engines, `R-A.md` §1 Q-3). The proposed no-interactivity cell catches an interactive component hiding in `static`. If the owner rules Q-1 (a), the variant is C's: `--engage` inherits from a host and the atom maps it, with the limits measured in S-4. If the owner rules (b), it needs the `ambient`/plate pointer-field cell and a `card` scene (`R-D.md` §4).

### 3.4 Mount case (H-8)

Quiet by construction. A transition needs a before-change style, and an inserted element has none: 8/8 per engine in A, C and D. The async arrival pops like every other family (S-9).

### 3.5 Cost

Measured on the trio: A +308/−28 in 13 files, about 290 of them the fixed table and recipes (`R-A.md` §5). D +197/−26 in 15 files (`R-D.md` §6). Per member: one class token, plus deletions where its own press or travel moves into the class. The full library, extrapolated: about 40 class-list edits, three press recipes retired, the census test rewritten, and H-2's scenes.

### 3.6 MIGRATION rows

| row | consumers (read-only census, `../PORTFOLIO.md` §1.5, `R-B.md` F-7) |
|---|---|
| `.tap-squish` retired | fourier-analysis ×3, chicago ×3 |
| `.interactive-item` retired | fourier-analysis ×9, keyframes.js ×1 |
| `.glass-capsule-hover` press and the Chip flood fold into class recipes | no authored consumer read found by name; re-grep at build |
| the slider's in-place grow on fine pointers (×1.06) | value.js 4 files, fourier-analysis 3 (`R-A.md` §5); no override found |
| new public surface: `ENGAGE_DECLARATION`, `--rung-*`, `--scale-commit-pop`, `--scale-engage` | additive; exported with a stated contract |

### 3.7 Risks

1. **The bar against the register's law.** `springPresets.ts:55-57` puts a celebration's liveliness in the light channel, "never to a geometry bounce". E-2's pop arm demands a geometry bounce, and iOS lands zero-velocity arrivals dead (`RW.md` §4 seam (a)). The minimum crest (S-6) is the least A can do while E-2 stands as written. A light-channel commit needs the agglomerator to change E-2.
2. **Ratio bars on wide rows.** 1.0152 is 4.85 px of excursion on a 320 px row and 0.30 px on a 20 px bit. The bit uses travel or light instead. The row is the O-87 risk (`R-A.md` §4; `R-D.md` §7).
3. **The table drifts from the rendered element.** The `--rung-class` read covers single composition; double composition needs the DOM cell (§3.1).
4. **Taxonomy growth.** Nine classes at the first pass (six were proposed).
5. **The Switch overshoot** (0.84 px) passes the 0.5 px travel arm on the argument the switch lane once rejected (HEAD `switch/styles.css:40-48`, `R-A.md` §1 Q-5).

## 4 · D5-B · one engage primitive

**Charter.** One door, `useEngage(host, options)`, owns a component's engagement state and is the only writer of `data-held`, `data-engaged`, `data-press` and `data-commit`. It fires the commit edge from the model as reflected in `data-state`, carries the release velocity into the settle through one rule, and records the census at mount.

### 4.1 Mechanism, with targets

| piece | target | source |
|---|---|---|
| the door | new `src/composables/motion/engage/useEngage.ts`: hand `:136`, press `:152`, velocity `:192`, commit `:203-228`, census `:126-131` (R-B.patch line refs) | R-B |
| the hand | `useDockHold` (`src/components/dock/composables/useDockHold.ts:86`) moves to `engage/` with its `_shared/overlay` hold-token dependency. Today the door imports across `components/` (a layering inversion, `R-B.md` §1 Q1) | R-B; P-1 (colocation edict: a global composable lives in `composables/`) |
| the press | `useLiquidPress` (`src/composables/motion/spring/useLiquidPress.ts:141`) behind the door. The door passes `pressVar`, `shrinkDepth` and `squish` through, or the CSS reads rename to one `--press-t`. The leaf stays public (value.js ×1, speedtest ×2, keyframes.js) | `R-B.md` §1 Q1, §9 item 2 (unbuilt) |
| the commit edge | a `MutationObserver` on `data-state`, comparing `oldValue`, armed one frame after mount: one edge per commit on every path, 0 for A→B→A in one task (`R-B.md` §1 Q2, both engines). **Geometry: the phase mapping**, played as WAAPI keyframes sampled from `1 + (crest − 1)·sin(π·c(t))` with `c(t)` the `panel` row, crest 1.0152. That replaces the direct impulse, whose minimum is 1.0475 (S-6). Unbuilt; the edge is built | R-B; S-6 |
| the stateless edge | `commit: () => …` for a component with no `data-state` (Button, action Chip): the door fires on the call. The edge is the same | `R-B.md` §5; unbuilt |
| the release rule | new `src/composables/motion/engage/release.ts`: the windowed chord over samples no older than `ACKNOWLEDGE_WINDOW_MS` (`engageEnvelopes.ts:51`), plus one release sample; the settle is a named spring row seeded with v0 (WAAPI) | R-B `release.ts:48-58,78`; C's carry is the same machinery (S-3) |
| consumers of the rule (FL-8) | slider: carry and return to the value (the value does not move; Q-4 (b)). Sortable list: `VelocitySampler` moves from `src/components/sortable-list/motion.ts:82` into `release.ts` (built). Sheet: `src/components/sheet/detents/use.ts:197-199` (a last-move delta, no window) takes the rule, and its projection (`sheet/detents/projection.ts:60`) is unchanged. Tabs drag: keyframes.js `Draggable` under `useDragMorph` (a fifth owner, `R-B.md` F-6) stays, stating why. Carousel and Deck: the platform | R-B; C's MIG-C3 is the reason the slider does not project a value |
| the veil split | `src/components/dialog/ModalOverlay.vue:74` drops `data-engaged`; `src/styles/glass/focus-veil.css:153,160` key the modal veil on `[data-state="open"] > .glass-focus-veil` | B, D, E (all three built it alike) |
| the keyboard engaged signal (unbuilt) | the door knows the input modality (it sees `pointerdown` before a script focus), so it can write `data-held` for a keyboard engagement only when focus did not arrive from a pointer. That is the clean signal S-8 lacks | this seat, from S-8 and `R-E.md` §8 item 2 |

### 4.2 E-rows

| row | measured | how B meets it |
|---|---|---|
| E-1 | RED by shape: no static declaration; the mount registry reads 4 of 6 probed directories (`R-B.md` §4) | an adapter from the registry rows to `{members, classes}`, read on a page that mounts one exemplar per directory. That needs 55 scenes where A needs 9 (`R-B.md` §1 Q4). If B takes A's table for the exemption list instead, B's census is A's |
| E-2 | Switch and accordion: Chromium 24/24, WebKit 20/24 (the 4 PF-1 closes), peaks 1.051-1.080, bounce margin 0.001 | the phase-form commit at crest 1.0152 (S-6); stateless controls through `commit()`; S-10's re-point for WebKit |
| E-3 | RED: B writes the held edge (`[data-engaged]` 2 at 450 ms) but no look | the look is A's recipe on fine pointers or E's stage. B supplies the keyboard engaged signal (§4.1) |
| E-4 | **PASS** slider and sortable, both engines; Sheet unreadable (it paints in flow: `src/styles/glass/ladder.css:124-131` beats `sheet/styles.css:29-32`, `RH.md` §3 item 1); tabs and carousel untouched | the rule on the Sheet once its position defect is cured (not D5's); the tabs' fifth owner stated |
| E-5 | Chromium 8/8; WebKit accordion PF-1 | S-10 |
| E-6 | RED | Q-2 (b) RETIRE |
| E-7 | **PASS 4/4** both engines | the door is the writer, or it calls E's stage, which then is |
| E-8 | PASS 5/5 (`script@450ms` resolves to `--spring-panel-duration`) | holds |
| E-9 | Chromium 18/18 | under reduce the door keeps the edge for a light leg and plays no geometry (`useEngage.ts:91-96`) |

### 4.3 Q-1, census-checkable

Default (c), declared at the door: `useEngage(() => null, { component, exempt: "<reason>" })`. A page that defines `globalThis.__glassEngageCensus` reads one row per mounted directory. PASS when every directory writes exactly one row with parts or a reason (`R-B.md` §4: separator exempt, skeleton and dialog missing → FAIL, as they should). The exemption list is spread across about 30 files and is visible only by running the census.

### 4.4 Mount case

H-8 PASS 4/4 per engine: an initial `data-state` is not a mutation, and the door arms one frame after mount. A model set in the mount's own task gives 0 edges. A model set two frames after mount pops (S-9).

### 4.5 Cost

Trio: 11 tracked files +89/−76, plus 333 new lines (door 231, rule 102) (`R-B.md` §6). Per adopter: one import, one template ref, one call, one `ref=`, 4-12 lines. Extrapolated: 300-450 lines across about 55 component files, including about 30 passive adopters at 4-6 lines each.

### 4.6 MIGRATION rows

`R-B.md` §6 M-B1..M-B6. Of those, M-B1 (`data-engaged` becomes present-empty) and M-B2 (the veil split) carry over unchanged to any composition. M-B5 (if `useEngage` replaces `useLiquidPress` publicly) reaches value.js, speedtest and keyframes.js, one row each in its own tranche.

### 4.7 Risks

1. **The press options make the door a god module** unless they collapse to one `--press-t` contract (`R-B.md` §1 Q1).
2. **Script-only state.** Before hydration and without JS there is no commit. The press falls back to `:active`; under A's retirements no `.tap-squish` floor remains. B must state its no-JS floor, or keep a class recipe for it, which would be A's mechanism inside B.
3. **The forwarded-root trap per adopter** (`root.value?.$el` on each reka host).
4. **Census cost.** 55 scenes, against A's 9.

## 5 · D5-E · the engaged stage (partial by design)

**Charter.** The ladder's engaged rung, "the control promoted out of its own footprint" as a singleton (`src/composables/motion/engage/engageLadder.ts:182-193`, `singleton: true` at `:190`), is one facility. A held control is promoted where it stands into the top layer; a footprint holds its place and anchors it. The stage owns the one veil and is the one writer of `data-engaged`.

### 5.1 Mechanism, with targets

| piece | target | source |
|---|---|---|
| the stage | new `src/composables/motion/engage/engageStage.ts` (169 lines): `engageStage`, `releaseStage`, `useEngageStage`. The host takes `popover="manual"` and `showPopover()` with no DOM move. Pointer capture and focus survive; a moved node loses both, both engines (`R-E.md` §1 Q-1) | R-E |
| the pin | `.engage-footprint { anchor-name: --engage-footprint }` inserted as the host's previous sibling. `[popover][data-engage-stage] { position-anchor; left: anchor(left); top: anchor(top); inline-size: anchor-size(width) }`. Geometry is read once per engage and per scroll, never per frame (`writeGeometry`). New `src/styles/glass/engage-stage.css` | R-E |
| the grow | `scale: min(var(--scale-engage), 1 + 2·max(0, room − --space-section)/width) var(--scale-engage)` on `--spring-dock`. Inline growth is capped by the page gutter rung (`src/styles/tokens/sizing.css:105`); a full-width phone control grows along the block axis only | R-E |
| the veil | one stage-owned `.glass-focus-veil`, itself a manual popover shown just before the host. Not `::backdrop`: Playwright WebKit runs no transition on a `::backdrop` engaged after open, and with `@starting-style` it restarts the ramp at about 405 ms (`R-E.md` §1 Q-3) | R-E |
| the slider | `src/components/slider/Slider.vue:277-315`: both `Teleport`s, the veil-centre code, the scroll re-take and the inline z-raise are deleted. The loupe becomes the root's child (378 → 292 lines) | R-E |
| clients | hand-held controls only: Slider, NumberField scrub, the colour spectrum, the dock grasp. **The Switch is not a client** (S-5: its held grow masked its commit; A declares it `chosen`) | this seat, from S-5 |
| the release | the stage's settle on `--spring-dock` is seeded with B's release velocity (unbuilt, `R-E.md` §8 item 3) | S-3 |

### 5.2 E-rows

| row | measured | how E meets it |
|---|---|---|
| E-1, E-2, E-5, E-6, E-9 | unchanged from HEAD except the Switch rows the client rule removes | the census family's (A or B) |
| E-3 | desk pointer-held ×1.060 PASS ×2 per engine; phone gutter PASS; PRM PASS ×4; keyboard RED (the arm was removed after it leaked, the same mechanism as S-8); phone touch-held RED, because the bound is infeasible on the library scene: ×1.03 of 358 px is 368.7 px, past the 358 px gutter (`R-E.md` §2) | keyboard: B's modality signal writes the hold that engages the stage (§4.1). Phone: the agglomerator restates the arm as area or block size ≥ ×1.03 inside the gutter. The prototype reads block ×1.058, inline ×1.000, gutter 16..374 |
| E-4 | RED (the stage release carries no velocity) | B's rule seeds the settle |
| E-7 | **PASS 4/4** both engines; the modal veil 0 | the stage is the writer whenever E is present (S-7) |
| E-8 | Chromium PASS 17/17; WebKit's 4 FAILs are PF-1 closes | holds |

### 5.3 Q-1, census-checkable

(c) by construction. Static: the stage's clients are the files that call `useEngageStage`, declared `held` (rung `engaged`) in the census family's table. Runtime: a client's exemplar held 450 ms carries `[data-engage-stage][data-engaged]`; a non-client's carries 0 of both (Separator and Skeleton, both engines and themes, `R-E.md` §3).

### 5.4 Mount case

The stage engages on the hold's edge only (`watch(held)`, never `immediate`): H-8 PASS on Switch and accordion, both engines. A control that unmounts while held releases at once and leaves no footprint or veil.

### 5.5 Cost

12 files, src +317/−116 (`R-E.md` §5). Most of the cost is paint verification, not code.

### 5.6 MIGRATION rows

`R-E.md` §5 items 1-4. Item 2 is the consumer-visible one: while held, a client is in the top layer, escapes ancestor clipping and `overflow`, and has an `.engage-footprint` sibling, which can change a consumer's `:first-child`, `+` or `~` selectors for the duration of a hold. No authored consumer reads the veil, the loupe or `data-engaged` (`R-E.md` §5).

### 5.7 Risks

1. **Footprint insertion beside Vue-managed nodes** under a parent re-render during a hold: untested (`R-E.md` §8 item 5).
2. **Phone geometry is nearly invisible.** A 1.4 px thickening; on the phone, the veil carries the engagement. A larger block-axis grow needs a ladder figure (FL-2) and the owner's glance.
3. **Two-handed touch.** The singleton releases the first slider (G6). Real two-finger scrubbing is unread (the instrument does not drive reka).
4. **Headless WebKit paints no `backdrop-filter`** at all, so the veil's blur is UNMEASURED there; real Safari UNMEASURED.

## 6 · Composition, incompatibility, and the prototype wave

**What composes.** E sits on either census family. B's release rule, writer and stateless edge are consumed by A whatever wins. The veil split (`ModalOverlay.vue:74` → `data-state="open"`) is identical in B, D and E and lands in any composition.

**What stays incompatible (why both A and B are alive).**

| axis | A | B |
|---|---|---|
| commit path | CSS phase transition on `data-state` (mount-safe by style semantics; works without JS) | script edge from a `data-state` observer (sees stateless commits natively; nothing before hydration) |
| census | one declared table, 9 classes, 9 exemplar scenes | a mount registry spread across ~55 files, 55 scenes |
| passive (Q-1 c) | one `static` row and a runtime stamp | one `exempt` call per passive file |

If B adopts A's table for its census and A adopts B's edge only for stateless controls, the remaining difference is the commit path for state-bearing controls. The agglomerator should then decide whether B is still a family or has become A's script part.

**Prototype wave (REGISTRY §3.1).** Each seat builds in its own worktree from HEAD, on the trio plus Separator, with the paint captures of `../REGISTRY.md` §2.5:

| seat | builds | adds beyond pass 1 |
|---|---|---|
| P-A | A's spec | the minimum crest 1.0152; Checkbox, Radio, Chip and Button (stateless, through a minimal parity edge) to exercise the capsule and the stateless commit; the `[data-held]`-only held arm, read by `syn/afterdrag.mjs`; the S-10 re-point on the disclosure trigger; H-2 scenes for `field` and `dragged` at least |
| P-B | B's spec | the phase-form WAAPI commit (S-6); the stateless `commit()` on Button; the keyboard modality signal; the release rule on the Sheet if its position defect is cured in the prototype's worktree (stated as a local fix, not D5's) |
| P-E | E on top of P-A's or P-B's tree, whichever lands first | the Switch removed as a client; B's velocity seeding the stage settle; the keyboard engagement through B's signal; the area/block-size phone read beside E-3's arm as written |

## 7 · For the agglomerator: candidate checklist rows (each with its reason; this seat adds none)

| id | candidate | reason | evidence |
|---|---|---|---|
| X-1 | E-3 release cell: after a pointer drag and release, the slider is back to ×1 ± 0.002 within its exit clock | A and D stay at ×1.060 for ≥ 1.5 s after a drag, both engines; E-3 cannot see it | `syn/logs/afterdrag-{ra,rd}.log` |
| X-2 | E-3 phone arm: area or block size ≥ ×1.03 on a control that fills its column | the arm as written is infeasible on the library scene | `R-E.md` §2 |
| X-3 | E-2 pixel floor beside the ratio, or a light-channel commit read | a 1.0152 crest is 0.30 px on a 20 px bit; iOS commits in light (law 19) | S-6; `R-A.md` §4; `RW.md` §4 (a) |
| X-4 | rule on the async arrival (S-9) | one event, every family | `R-B.md` §5 |
| X-5 | E-2 asserts the state changed before grading (radio ArrowDown) | the cell can grade a commit that never happened | `R-D.md` §8 item 3 |
| X-6 | E-7's static detector counts `v-bind` object spreads | a spread writer passes vacuously | `R-D.md` §2 |
| X-7 | a held-light sustain bound (light at hold +1 s ≥ at +200 ms) | a pulsing hold passes E-3 and E-5 | `RW.md` §4 (c) |
| X-8 | FL-7 cell: iOS Safari `:active` precondition (a `touchstart` listener) | a CSS press rung may be silent on a real iPhone | `RW.md` §4 (b); UNMEASURED |
| X-9 | the shipped defects the battery surfaced, routed to their owners: the Sheet paints in flow; the sortable fling teleports; SegmentedTabs' drag is gone under reduce; SegmentedTabs glides on mount; PF-1's token | each is live at HEAD | `RH.md` §3; `../BASELINE.md` §5; S-10 |
| X-10 | REGISTRY §2.1 updates: E-5 WebKit is now read (H-4); E-9 is RED, not "not measured" | P-3, cite the source | `RH.md` §3 item 6; `../BASELINE.md` §5 item 7 |

E-6: no family proposes an idle rung, and the corpus and O-87 both side with Q-2's default (`RW.md` §1, idle row). S6's RETIRE needs the owner's words (W-J.2 §3.2 item 5).

## 8 · Artefacts and reproduce

| path (under `pass-1/`) | what |
|---|---|
| `SPECS.md` | this file |
| `syn/afterdrag.mjs`, `syn/logs/afterdrag-ra.log`, `syn/logs/afterdrag-rd.log` | S-8 / X-1, both engines, each line with its load |
| `syn/pairs.sh`, `syn/logs/patch-composition.log` | §0 item 6 |

```sh
E=docs/tranches/BL/design/engagement; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules
bash $E/pass-1/syn/pairs.sh $S/wt                                   # composition (leaves the tree clean)
git -C $S/wt apply "$PWD/$E/pass-1/R-A.patch" && node $E/harness/build.mjs $S/wt --label ra --out $S/out
node $E/pass-1/syn/afterdrag.mjs --build $S/out/builds/ra [--engine webkit]
git -C $S/wt checkout -- . && git -C $S/wt clean -fd src && git -C $S/wt apply "$PWD/$E/pass-1/R-D.patch"
node $E/harness/build.mjs $S/wt --label rd --out $S/out && node $E/pass-1/syn/afterdrag.mjs --build $S/out/builds/rd [--engine webkit]
git worktree remove --force $S/wt
```
