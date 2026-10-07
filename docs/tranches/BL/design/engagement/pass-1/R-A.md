# D5 · pass 1 · R-A: the declared class table, researched and prototyped

| field | value |
|---|---|
| seat | R-A, the research seat for family D5-A (`PORTFOLIO.md` §4 D5-A, §6 D5-A; `REGISTRY.md` §3.1, §3.3) |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree at `734b38a1`; the patch re-checked at `813f87d4`: `git apply --check pass-1/R-A.patch` clean. `src/` at both is the 10.1.0 bytes (`git diff --stat v10.1.0 HEAD -- src` empty) |
| prototype | `pass-1/R-A.patch`: 13 files, +308/−28. All building and running happened in a scratch worktree (`git worktree add`, `node_modules` symlinked), which was removed afterwards. No harness file changed |
| harness | `harness/` as R-H landed it (`pass-1/RH.md`), run in place: `build.mjs`, then `run.mjs --scenes switch,accordion,slider,press_switch,s6,modal,passive`. My own probes are in `pass-1/R-A/` (`mountprobe.mjs`, `driftprobe.mjs`, `capture.mjs`) |
| engines | Chromium 149.0.7827.55 and Playwright WebKit 26.5, headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | The machine was saturated by other seats: 1-minute load 418 when I started, 200-350 during the probes, 84 → 30 during the final battery (`R-A/logs/battery-proto.log:1` and its last line), and 29-228 during the captures. Every cell line in the logs carries its own load. No defect below depends on a timing that only occurred under load |
| standing law | O-87 (`REGISTRY.md`, the owner ruling) applies: the prototype adds no lighting layer, no glow, no gleam and no idle loop |

## 0 · In brief

1. **Six classes do not cover the 55 directories. Nine do.** The three added are `dragged`, `presented` and `field`. Twenty-three directories fit two classes. Two members, Chip and Card, change class by mode, so a one-row-per-directory table cannot express them. The runtime read in item 3 can (§1 Q-1).
2. **Keyframes keyed to state pop on mount in both engines, and neither guard suggested at round 0 stops it.** `@starting-style` has no effect on animations. A `data-engage-ready` attribute only delays the pop, because adding the attribute starts the animation itself. **A transition on a registered `<number>` does not fire on mount and still pops on commit** (switch mount range 0.000, commit crest 1.020, both engines). The prototype is built on that mechanism, and E-2's mount cells pass 8 of 8 with no guard (§1 Q-2).
3. **The drift check works at runtime.** Each recipe stamps its class into the registered, non-inherited `--rung-class`. Reading it from computed style matches the declaration on all 5 exemplars in both engines, and the planted swap (static → chosen) reads DRIFT in both (§1 Q-3).
4. **A should not mint a script class.** The held class's engaged rung is plain CSS and turns E-3 desk green: ×1.060 in 8 of 8 cells. Velocity (E-4: 0.00 px) and the writer of `data-engaged` (E-7: 2 writers) both need script, and both belong to D5-B (§1 Q-4).
5. **The pop derives from the `panel` row through `sin(π·c)`.** That puts its rebound at 0.132 of its crest, so the commit bar forces a crest of at least 1.0152. The prototype uses 1.020, which reads peak 1.020 and trough 0.997 in every accordion cell. The bar is a ratio, though. On a 20 px atom, 1.02 is 0.4 px; on a 320 px row, it is 6.4 px. The bar cannot tell legible from illegible (§1 Q-5, §4).
6. **Battery on the trio and the passive atoms.** E-2, E-5, E-8 and E-9 are green in Chromium. In WebKit every failing cell is the accordion trigger's pointer/tap page close (PF-1, unchanged from HEAD). E-3 desk is green; its phone arm is RED by design (Q-3 default (c): promotion belongs to D5-E). E-1 passes its four structural cells; the four runtime cells for `dragged`/`presented`/`field`/`ambient` are RED because those exemplars have no harness scene (H-2). E-4, E-6 and E-7 are RED, and the family that carries each is named (§2).

## 1 · PORTFOLIO §6 D5-A, answered

### Q-1 · Do six classes cover all 55 directories?

No. The declaration in the patch (`src/composables/motion/engage/engageClasses.ts`) declares all 55 in nine classes. The built library reads it as `55 of 55 directories declared · members per class: pressed 1, chosen 9, held 4, dragged 5, disclosed 6, presented 4, field 3, ambient 5, static 18` (`R-A/json/E-1-chromium.json`, identical in WebKit).

| class | rung (ladder) | members | why the class exists |
|---|---|---|---|
| pressed | press | button | an action with no state |
| chosen | press (+ commit) | checkbox, chip, dark-mode-toggle, easing (EasingPicker), pager-dots, radio-group, switch, tabs, toggle-group | a committed state |
| held | engaged | dock, number-field (scrub), slider, timeline | the hand holds it |
| **dragged** (new) | press | carousel, deck, fading-scroll, infinite-scroll, sortable-list | a surface moved by the hand, whose job is momentum (E-4). It has no hold rung and no commit |
| disclosed | press (+ commit) | accordion, collapsible, expandable-container, menu, popover, select | a trigger that opens a region |
| **presented** (new) | modal | dialog, sheet, toast, tooltip | the ladder's MODAL rung (`engageLadder.ts:194-210`). None of the six classes carries it |
| **field** (new) | hover | command, input, textarea | text entry. A press rung on a caret field means nothing; its engagement is focus |
| ambient | rest | aurora, blob, constellation, fourier-field, music-staff | answers the pointer field; any idle loop is under W-F.6's bound |
| static | none, with a reason | alert, avatar, badge, card, configurator, data-table, handmark, label, labeled-field, metric, progress, scroll-progress-rim, separator, skeleton, status-dot, surface, table, typewriter | no input of its own. Its engagement belongs to its host (separator) or to its members (table, labelled field) |

Directories that fit two classes, each with its reason:

- **Mode-split** (one directory, two classes at runtime): chip (chosen when selectable, pressed when it is an action, `Chip.vue:42,52`); card (static, chosen when `selected` is present, `card/Card.vue` header).
- **Composite** (a primary class plus a sub-surface of another class): tabs (chosen; the draggable indicator is dragged, `tabs/composables/useTabDragMorph.ts`); sortable-list (dragged; the lift is held); dock (held; its controls are pressed; its run is dragged); sheet and toast (presented; the detents and the swipe are dragged); number-field (held scrub; field entry); timeline (held; pressed transport); command (field; pressed items); menu, select and popover (disclosed trigger; presented content); tooltip (presented; disclosed by hover/focus); dark-mode-toggle (chosen; it composes `useLiquidPress`, a pressed recipe); easing (chosen in EasingPicker; static in EasingCurve, "zero interactive descendants"); pager-dots (chosen; the worm is a dragged body).
- **Static, but runs a loop that carries state**: skeleton (`skeleton-breathe 1.1s … infinite alternate`, `Skeleton.vue:99`, a loading signal with a literal clock) and status-dot (the liveness pulse ring, `StatusDot.vue:16,246-251`). The class row needs to say a static member may report state with a loop. Otherwise these two contradict their own row.
- **Static or ambient**: surface (the plate primitive; whether its material answers the pointer field is D5-D's question).
- **Dragged or static**: fading-scroll and infinite-scroll (their motion is platform scroll).

The six-become-twelve risk (`PORTFOLIO.md` §4 D5-A known risks) is real: nine classes already. The mode-split is the deeper finding. The table's key is the directory, but for chip and card the truth is the rendered element. Q-3's runtime read handles this: it reads the class the rendered element composes. So the table can declare a directory's primary class, and the census can check each rendered mode.

**Q-1 in a form the census can check (REGISTRY §3.3 item 2).** The answer is the default (c), declared exempt with a reason, made checkable in two steps:
1. The `static` row is `{ rung: null, reason: "no input of its own: its engagement is its host's … or its members' …" }`. E-1's `class carries a rung` cell reads it and passes.
2. Every static member composes `engage-static`, which stamps `--rung-class: static`. The drift read in Q-3 proves the composition at runtime: separator and skeleton MATCH in both engines, and the plant (separator recomposed as chosen) reads DRIFT. A proposed third cell, not built: a static member's root carries no focusable role, no `tabindex` and no handler. That is a runtime DOM read, not bytes, and it would catch an interactive component hiding in `static`.

### Q-2 · The mount pop

`R-A/mountprobe.mjs` puts four mechanisms on the HEAD build (the scene app at `734b38a1`) as injected CSS. Each pop is on `transform`, so the HEAD paint is the V0 baseline. Mount: `?on=1&defer=1`, sampled for 800 ms across `__e.mount()`. Commit: mounted off, then `__e.commit()`. A guard that also silences the commit is vacuous, so both cells are printed. Source: `R-A/logs/mountprobe.log`, load 193-245.

| variant | Switch mount (checked) | Switch commit | Chip mount (on) | Chip commit | Chromium = WebKit? |
|---|---|---|---|---|---|
| V0 HEAD | 0.000 QUIET | 0.000 (no pop) | 0.000 QUIET | 0.092 (the flood) | yes |
| V1 keyframes keyed to the state (the D5-A sketch, `PORTFOLIO.md:184-190`) | **0.060 POPS** | 0.060 | **0.064 POPS** | 0.125 | yes |
| V2 V1 + `@starting-style` | **0.060 POPS** | 0.060 | **0.064 POPS** | 0.125 / 0.123 | yes |
| V3 V1 gated on `[data-engage-ready]`, stamped two frames after insertion | **0.060 POPS** | 0.060 | **0.064 POPS** | 0.125 / 0.113 | yes |
| V4 transition on a registered `<number>`, scale = 1 + 0.02·sin(π·c) | **0.000 QUIET** | 0.023 (crest 1.020) / 0.022 | **0.000 QUIET** | 0.024 (on top of the flood) | yes |

Readings:
- `@starting-style` applies to transitions, not to animations. It cannot stop a keyframe mount pop.
- The ready guard **moves the pop instead of stopping it**: adding the attribute changes `animation-name` from none to the pop, which starts the animation. A guard would have to key on the state *changing*, which CSS cannot express. My first V3 reading (`R-A/logs/mountprobe-first.log`) was QUIET and SILENT in Chromium because the observer was installed before `documentElement` existed and never stamped the attribute. That was a probe defect, and it is the vacuous guard the commit cell exists to catch. The corrected run is the table above.
- A transition has no before-style on an inserted element, so V4 is quiet on mount with no guard, and a programmatic commit takes the same path as a gesture.

### Q-3 · The drift check

Each `engage-<class>` utility sets `--rung-class: <class>`, registered `syntax: "<custom-ident>"; inherits: false; initial-value: unclassed`. `R-A/driftprobe.mjs` reads `getComputedStyle(el).getPropertyValue("--rung-class")` on each exemplar and compares it with `window.__e.decl.members[dir]`, which comes from the built library (`R-A/logs/driftprobe.log`, loads 29.7-31.1):

| element | Chromium | WebKit |
|---|---|---|
| switch root | MATCH chosen | MATCH chosen |
| accordion trigger | MATCH disclosed | MATCH disclosed |
| slider root | MATCH held | MATCH held |
| separator | MATCH static | MATCH static |
| skeleton | MATCH static | MATCH static |
| plant: separator recomposed `engage-static` → `engage-chosen` | **DRIFT** (computed chosen, declared static) | **DRIFT** |
| switch thumb (a child; must not inherit) | MATCH `unclassed` | MATCH `unclassed` |

At HEAD every row reads `""` and the declaration is absent (`R-A/logs/driftprobe-run1.log`).

The limit, which I reasoned through but did not measure: an element that composes *two* class utilities gets whichever utility the stylesheet emits last, so a computed read cannot see the double composition. The runtime remedy is a DOM read, not bytes: at most one `engage-*` class per element. I recommend it as a second drift cell. Separately, an answer computed this way is per element, which is what makes the chip/card mode-split checkable (Q-1).

### Q-4 · `held` needs script: does A accept one script class, or pair with B?

Pair with B. Measured:
- The engaged rung in place is CSS alone. `engage-held` grows the root to `--scale-engage` on the `dock` row when the root is `[data-held]`, `:active` or `:has(:focus-visible)`, on a fine pointer only. E-3 desk reads ×1.060 pointer-held and keyboard-focused, 8 of 8 cells across both engines and themes. The PRM arms read ×1.000, and the phone gutter box stays at 16.0..374.0 px (`R-A/json/E-3-*.json`). `data-held` already comes from `useDockHold` (`Slider.vue:81,269`).
- Velocity: E-4 slider fling carry 0.00 px and settle 0.00 px in both engines (`battery-proto.log`, E-4 lines). `useDragVelocity` tears its rAF down at `pointerup` by contract (`composables/dom/useDragVelocity.ts:12-14`), and nothing projects the release. That needs script.
- The writer: E-7 still reads 2 writers (`ModalOverlay.vue`, `Slider.vue`). The witness requires the writer under `src/composables/motion/engage/`, which means a composable.

A script class inside A would give A two kinds of recipe, a utility and a composable, for one fact. B's primitive is that composable. The seam is the one `REGISTRY.md` §3.4 predicts: A's `held` class and D's momentum gap both point at B's velocity rule.

### Q-5 · The pop's form, derived and not minted

- `press` lands dead by construction (`engageLadder.ts:174-178`; LAW 0, `springPresets.ts:13-18`), so it cannot rebound.
- `panel` is the one row whose rebound is intrinsic (`springPresets.ts:93-101`). Its emitted curve peaks at 1.04211 (`scheme-spring.css:62`), so M_panel = 0.0421.
- Animating scale between two values on `panel` gives successive extrema in the ratio M, so a bounce of 0.002 would need a 4.8 % pop.
- The prototype's form: `c` rides `panel` from 0 to 1, and scale = `1 + (crest − 1)·sin(π·c)`. The crest falls at c = ½ and rest at c = 1. While `panel` overshoots c past 1, the scale dips below rest by sin(π·0.0421) = 0.132 of the crest. The only figure is the crest, `--scale-commit-pop: 1.02`, a scale-register row (`scale-paper.css`).
- The bar (`POP 0.015`, `BOUNCE 0.002`, `harness/lib.mjs:246`) then requires a crest ≥ 1 + 0.002/0.132 = **1.0152**. Measured at 1.02: peak 1.020, trough 0.997, settle 1.000 on every accordion commit cell (keyboard, programmatic, pointer, coarse tap; light and dark; Chromium, and WebKit for the keyboard and programmatic cells; `R-A/json/E-2-*.json`).
- Where a body exists (Q-5 default (a)), the body travels on the same `panel` row instead of popping. The Switch thumb travels 20.00 px and overshoots 0.84 px, every Switch cell in both engines.

Tension, stated rather than resolved: the spring table's charter says "a celebration's liveliness belongs to the LIGHT channel … never to a geometry bounce" (`springPresets.ts:55-57`). The ladder's press rung says "never a positional rebound" (`engageLadder.ts:180`). E-2's pop arm demands a geometry bounce, which the register's own charter disowns. And the Switch lane's removed comment (HEAD `switch/styles.css:40-48`) had ruled a 0.63 px thumb overshoot "sub-pixel excursion on a perceptible clock, the worst of both". The prototype's 0.84 px overshoot passes the bar (0.5 px) on the same argument the lane rejected. These are owner/agglomerator questions, not a defect in the prototype (§4).

## 2 · Family A's row on every E-witness (REGISTRY §3.3 item 1)

The final run is `R-A/logs/battery-proto.log` (11:15-11:43, load 84.0 → 29.9), JSON in `R-A/json/`. Narrowed to the trio, the passive scene, the S6 Switch and the modal: `--scenes switch,accordion,slider,press_switch,s6,modal,passive`. HEAD comparisons are `BASELINE.md` §0-§2.

| witness | Chromium | Playwright WebKit | A's row | carried by |
|---|---|---|---|---|
| E-1 | FAIL 12/16 | FAIL 10/16 | **Structural cells green** (declaration present; 55/55; no stray; every class names a rung or a reason). Runtime green for pressed, chosen, held and disclosed, plus each PRM press-light. **RED**: runtime `dragged`/`presented`/`field`/`ambient`, "no harness scene exemplifies …" (H-2). WebKit's disclosed runtime cells are the PF-1 page close | H-2 (exemplar scenes per declared class). The `ambient` cell also needs a pointer-field test, because a press is the wrong probe for it |
| E-2 | **PASS 24/24** | FAIL 20/24: the 4 failures are accordion pointer/tap `ENGINE CLOSED, REPRODUCED 2/2` (PF-1, as at HEAD) | **green on the trio.** HEAD read Switch 0 of 8 commit cells and the accordion 0 of 8 (`BASELINE.md` §2 E-2). Mount cells 8/8 quiet | PF-1's owner (WebKit pointer crash) |
| E-3 | FAIL 10/12 | FAIL 10/12 | **Desk green**, ×1.060 pointer-held and keyboard-focused; PRM green; gutter green. **Phone touch-held RED ×1.000 by design**: Q-3 default (c), so no in-place grow on a coarse pointer | D5-E (promotion on coarse) |
| E-4 | FAIL 1/2 | FAIL 1/2 | **RED**: slider carry 0.00 / settle 0.00 (PRM cell passes, vacuously) | D5-B (the velocity rule) |
| E-5 | **PASS 8/8** | FAIL 4/6: the 2 failures are the accordion's PF-1 close | **green**: the accordion trigger now answers a held touch with a press-only `background-color` (HEAD: `press-only []`, `BASELINE.md` §2 E-5), and keeps it under reduce | PF-1 |
| E-6 | FAIL (present 0, light and dark) | FAIL | **RED (absent), by A's own row**: `chosen` carries no idle loop. Under Q-2 default (b), S6's breathing is RETIRE with the owner's words, not a rung | owner (Q-2) |
| E-7 | FAIL 2/4 | FAIL 2/4 | **RED, unchanged**: 2 writers; the open modal's veil carries `data-engaged` | the shared E-7 split (`PORTFOLIO.md` §2.3) plus D5-B's writer |
| E-8 | **PASS 5/5** | FAIL 3/5: the accordion literal cells close the page (PF-1) | **green.** Every animation in a press or commit reads a clock token (`--rung-press@120ms`, `--rung-commit@450ms`, `background-color@55ms` = `press-drain` attack). See §3 for the first run's mirror FAIL | PF-1 |
| E-9 | **PASS 18/18** | FAIL 12/14: the accordion press-spatial cells close the page (PF-1) | **green**: under reduce every spatial leg retires (`scale: none`, the body transition removed) and each light leg stays | PF-1 |

Real Safari: UNMEASURED (owner's safaridriver checkbox) in every row. Every WebKit FAIL on the trio is the accordion trigger's pointer/tap close. The same cells close at HEAD (`BASELINE.md` §2 E-2, `PORTFOLIO.md` §1.3 item 7), and every WebKit keyboard and programmatic cell on that trigger passes.

### 2.1 The mount case on A's mechanism (REGISTRY §3.3 item 3, H-8)

E-2 `mount(committed)`: Switch and accordion, light and dark, both engines, **8 of 8 PASS**, `scale range 0.000 body moved 0.00 px` over every frame (`R-A/json/E-2-*.json`). No guard is involved; the mechanism comparison is Q-2's table.

## 3 · What the run itself corrected

1. **The `--engage-*` namespace belongs to the envelope mirror.** My first build named the registered properties `--engage-class/-press/-commit/-grow`. E-8's mirror FAILed in both engines with `orphans [--engage-class, --engage-press, --engage-commit, --engage-grow]` (`R-A/logs/battery-proto-run1.log`, E-8 lines): a registered property with an initial value appears on `:root`, which is the namespace the mirror audits against `ENGAGE_ENVELOPES`. I renamed them to `--rung-*`, and E-8 mirror reads `8 --engage-* tokens · orphans []` (final run). The witness was right; any family that registers properties needs this rule.
2. **A blind rename would have corrupted the envelope tokens.** `--engage-press` is a prefix of `--engage-press-drain-attack`. My rename used a negative lookahead (`(?![\w-])`). A BSD `sed \b` pass that would have matched the prefix failed harmlessly first (0 substitutions).
3. **The ready-guard probe was vacuous on its first run** (Q-2).
4. **Two `glass-subtlety.test.ts` cases failed under load** (a different case each run, at 353 s and 14.9 s) and passed 7/7 files at load 386-408 in the final run (`R-A/logs/vitest.log`: 115 passed, 1 expected fail). They count as NOT-REPRODUCED. One failure was real and deterministic: `binary-triad.test.ts:304` asserted `tap-squish` on the Switch root. The patch migrates it to name each member's press recipe, so the switch reads `engage-chosen`.

## 4 · For the gestalt read (REGISTRY §2.5, §3.3 item 5)

**Captures**: `pass-1/R-A/captures/{head,proto}-{chromium,webkit}-{light,dark}-{switch,accordion,slider}-{state}.png`, 96 files at 2x. The states:
- Switch: rest, pressed, crest, committed.
- Accordion: rest, pressed (WebKit: `pressed-kbd`, by keyboard, because the pointer closes the page), crest, committed.
- Slider: rest, held, released, focused.

Each capture's measured scale is in `R-A/logs/capture.log`. The HEAD set is the before; the proto set is the after.

What the author reads in them. This is not a verdict: the iOS-27 read belongs to seats that did not build this.
- Slider held and focused: the track widens 6 %, from 360 to 381.6 px, on the dock row. The loupe and veil are unchanged. In dense consumer rows (below) a 6 % grow may crowd neighbours; E-3 needs only ≥ ×1.03.
- Accordion: the press is a flat `--fill-selected` flood on the whole stadium. No glow and no edge are added (O-87). At 12 % it reads close to a selected state. The crest frame shows the row 2 % wider, 6.4 px on 320 px, with the label shifting. I judge it the least deft element of the prototype: iOS list rows do not pop. A chevron-led commit would be more refined (`transition-disclosure` already springs it), but E-2 cannot read a rotation.
- Switch: the thumb's travel now has a 0.84 px overshoot on the `panel` clock (0.45 s settle against 0.21 s on `dock`). Whether that reads as weight or as the "late tick" the switch lane rejected is the question in Q-5.

**The bar's blind spot.** POP and BOUNCE are ratios. A 1.02 crest is 0.4 px on a 20 px checkbox. The control-bit lane's own legibility floor says 4 % of a 20 px face is 0.8 px, below the scale channel (`styles/glass/control-bit.css:286-290`). A chosen atom could pass E-2 with motion nobody sees. That is the "gate that cannot fail" mode on the critic's checklist. Proposed harness row: a pixel floor beside the ratio (crest ≥ max(0.015 × w, k px)), for the agglomerator.

## 5 · Cost and MIGRATION (REGISTRY §3.3 item 4)

Measured from the patch with `git diff --numstat` (13 files, +308/−28):

| part | files | lines |
|---|---|---|
| the declaration (`engageClasses.ts`, all 55 members, 9 classes) and its export (`motion/index.ts`) | 2 | +122 |
| the recipes (`utilities/engage.css`: 4 registered properties, 4 utilities) and their import | 2 | +164 |
| the scale rows (`--scale-engage: 1.06`, `--scale-commit-pop: 1.02`, `scale-paper.css`) | 1 | +7 |
| Switch: `tap-squish` → `engage-chosen`, the thumb marked `data-engage-body`, and its own travel transition and PRM block deleted (the recipe owns them now) | 2 | +4/−19 |
| Accordion trigger: `engage-disclosed` | 1 | +1/−1 |
| Slider: `engage-held`; its root's own `transition: color` deleted (the unlayered rule outranked the utility, so the recipe carries that leg) | 2 | +1/−2 |
| Separator, Skeleton: `engage-static` (Skeleton's second changed line is the comment that quotes its class list) | 2 | +4/−4 |
| test migration (`binary-triad.test.ts`) | 1 | +5/−2 |

The per-component cost is one class token, plus deletions where a component's own press or travel recipe moves into its class. The fixed cost is ~290 lines, and every future member reuses it. Extrapolated to the full family (`PORTFOLIO.md` §4 cost): ~40 class-list edits, the four press recipes folded into class recipes, and the census test rewritten.

MIGRATION rows. Consumer reads come from a read-only `grep` over value.js, keyframes.js, fourier-analysis, chicago, slides, sci-report, atlas and speedtest, with `node_modules`, `dist`, `.git`, `bench` and `.worktrees` excluded:

| row | source | consumers |
|---|---|---|
| none for the trio's API | the trio patch renames no public class, prop or export; `.tap-squish` stays (Checkbox and Radio still compose it) | — |
| paint: the slider grows ×1.06 while held or focused on a fine pointer | `engage-held` | value.js `demo/scenes/ConfigSliderPane.vue`, `demo/workbenches/{generate/GenerateControls,extract/ExtractControls}.vue`, `demo/picker/controls/ComponentSliders/ComponentSliders.vue`; fourier-analysis `web/src/components/ui/SliderControl.vue`, `visualization/EditorControlsDock.vue`, `shared/FourierTimeline.vue`. No consumer overrides the slider's `scale` or `transition` (one read, `ConfigSliderPane.vue:227`, adds a coarse hit-area `::before`, compatible) |
| paint: accordion press flood and commit pop; switch thumb overshoot | `engage-disclosed`, `engage-chosen` | every consumer of the components (no override found) |
| full-family, not built here | `.tap-squish` and `.interactive-item` folded into class recipes (E-1, no alias) | fourier-analysis (`tap-squish` ×3, `interactive-item` ×9), chicago (`tap-squish` ×3), keyframes.js (`interactive-item` ×1), per `PORTFOLIO.md` §1.5; not re-grepped |

## 6 · Open, for the agglomerator

1. H-2: exemplar scenes for `dragged`, `presented`, `field` and `ambient`. `ambient` needs a pointer-field cell, not a press.
2. The chip/card mode-split: the table declares a directory's primary class and the runtime read checks each mode. Built only as the read (Q-3); no chip prototype.
3. The double-composition cell (≤ 1 `engage-*` class per element) and the static no-interactivity cell: proposed, not built.
4. A pixel floor for E-2's pop arm (§4), and the charter tension between E-2's geometry bounce and `springPresets.ts:55-57` (Q-5).
5. Skeleton's and StatusDot's state loops under the `static` row, and Skeleton's `1.1s` literal (`Skeleton.vue:99`) against E-8's no-literal law. That is out of the trio's scope.
6. Real Safari for every row: UNMEASURED (owner's safaridriver checkbox).
7. Not run: `vue-tsc` and the full vitest suite; only the 7 related files were run.

## 7 · Reproduce

```sh
H=docs/tranches/BL/design/engagement/harness; P=docs/tranches/BL/design/engagement/pass-1; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules
git -C $S/wt apply "$PWD/$P/R-A.patch"
node $H/build.mjs $S/wt --label proto --out $S/out
node $H/run.mjs --build $S/out/builds/proto --wt $S/wt --out $S/out/runs/proto --verbose --scenes switch,accordion,slider,press_switch,s6,modal,passive
node $P/R-A/driftprobe.mjs $S/out/builds/proto webkit
git -C $S/wt apply -R "$PWD/$P/R-A.patch" && node $H/build.mjs $S/wt --label head --out $S/out
node $P/R-A/mountprobe.mjs $S/out/builds/head webkit
node $P/R-A/capture.mjs $S/out/builds/proto proto $S/captures webkit
git worktree remove --force $S/wt
```
