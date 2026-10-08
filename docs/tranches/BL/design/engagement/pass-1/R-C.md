# D5 · pass 1 · R-C: the engagement scalar, researched and prototyped

| field | value |
|---|---|
| seat | R-C, the research seat for family D5-C (`../PORTFOLIO.md` §4 D5-C, §6 D5-C; `../REGISTRY.md` §3.3). Read: the shared sections and family C's charter only; no other family's pass-1 file |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | worktree at `a115850c`; the checkout is now `1a791c10`, docs-only between them (`git diff --stat a115850c HEAD -- src tests` empty). `src/` is the `v10.1.0` bytes (`git diff --stat v10.1.0 HEAD -- src` empty) |
| prototype | `R-C.patch`: 11 files, +236 −6, `git apply --check` clean at `1a791c10`. Built in a scratch worktree with `harness/build.mjs` (labels `rc`, `rc2`; `head` for comparison), both worktrees removed after |
| engines | Chromium 149.0.7827.55, Playwright WebKit 26.5 (Playwright 1.61.1), headless. **Playwright WebKit is not Safari.** Real Safari: **UNMEASURED (owner's safaridriver checkbox)** in every cell |
| load | 1-minute load 30-112 throughout (other seats' browsers, up to 18 headless Chromium and 8 WebKit processes beside this seat's). Every cell line in `R-C/logs/` carries its 1/5/15-minute load. No cell below is called a defect on a reading taken only under load |
| harness | `../harness/` as landed by R-H (`RH.md`), unchanged. Battery runs narrowed with `--scenes` to the trio and the passive atom. This seat's probes live in `R-C/probes/` (three of them, `c-scalar.mjs`, `c-cost.mjs`, `c-captures.mjs`, were left by an interrupted earlier R-C run with no prototype or record; read, amended where noted, and re-run here) |

## 0 · In brief

1. **The scalar works on the trio in both engines.** With one registered `--engage`, one registered `--commit` and one registered `--carry`, the prototype turns E-2, E-3, E-4, E-5 and E-9 green on Switch, Accordion trigger and Slider in Chromium, and in Playwright WebKit everywhere except the accordion trigger's pointer and touch cells, where the page closes at HEAD as well (PF-1, re-read here 2/2 on the HEAD build). E-1 and E-7 stay RED by construction (below); E-6 stays RED under Q-2's default; E-8 holds.
2. **One transition makes the pop.** `--commit` is the committed state as a level, transitioned on `--spring-panel` (the one row with an intrinsic rebound, +4.2%). A mapping reads the impulse `4c(1 − c)`: 0 at both ends, 1 half way, negative while the level overshoots. Measured: Switch peak 1.040, trough 0.993; trigger 1.030, 0.995, both engines. A host that mounts committed has no before-change style, so it pops nothing: H-8 passes 8 of 8 cells with no mount code.
3. **Momentum needs WAAPI.** A CSS transition cannot start with a given slope, so the release is one `element.animate` of `--carry`, sampled from the dock row's closed form seeded with the release velocity. The projected value is written once through the sheet's own `throwDistance` (`sheet/detents/projection.ts:60`). E-4 slider: carry 142.20 px (Chromium) and 142.22 px (WebKit); a still release carries 0.00.
4. **Four costs the charter did not name.** (a) An inherited, transitioning scalar costs style recalc in proportion to the subtree. At 2000 nodes WebKit drops from about 380 to about 80 frames over the same 4 s, read twice. (b) Every adopting host has two shorthand traps, `transition` and `background`; this seat hit both. (c) The `--engage-*` names collide with the envelope mirror; E-8 caught it. (d) A static read of the channel budget leaks through token indirection, so the budget check has to be a runtime diff.
5. **Two behaviours need a ruling, not a fix.** A fling on a value slider writes a value the finger never chose; at E-4's speed it throws to the end, and three consumer transports read `valueCommit`. And after a pointer drag the slider stays engaged (×1.042) until blur, because reka's thumb matches `:focus-visible` after a drag in both engines (it does at HEAD too).
6. **The passive answer is mechanically sound and visually close to nothing.** A Separator inside a pressed host steps from the seam ink (0.08) to the edge ink (0.16), both engines, and returns at release. In the captures it barely reads. My read for Q-1: (a) can be checked by the census, but it is not visible engagement at the ink ladder's own step. Anything stronger would be ornament under O-87.

## 1 · The prototype (`R-C.patch`)

| file (in the patched tree) | what it carries |
|---|---|
| `src/styles/glass/engage.css` (new, 92 lines) | `@property --engage`, `--commit` (`<number>`, inherits) and `--carry` (`<length>`, inherits) at `:21,27,33`. Three budgets derived from `--scale-press` and nothing else: `--rung-press-depth` = 1 − 0.96, `--rung-grow` = 1/0.96 − 1, `--commit-pop` = the press depth (`:41-45`). The PRM arm zeroes all three in one block (`:53-58`). The host block `[data-engage]` resets the scalars (so a nested host is never engaged by inheritance), defines `--commit-bump` = 4c(1 − c) (`:67`) and the shared `--scalar-scale` = 1 + bump·pop − engage·depth·(1 − bump) (`:71`), and runs `--scalar-legs` (the two scalar transitions). `--engage: 1` on `:active`, `[data-held]`, and `[data-engage~="focus"]:has(:focus-visible)` (`:78-82`); `--commit: 1` on `data-state` checked, open or on, or on `aria-pressed` (`:84-91`) |
| `src/styles/glass.css` | imports it after `grasp.css` |
| `switch/Switch.vue:45`, `switch/styles.css` | `data-engage="press"`; drops `tap-squish` (one press owner); `scale: var(--scalar-scale)` |
| `accordion/AccordionTrigger.vue:46`, `_shared/disclosure/disclosure.css:69-100` | `data-engage="press"`; `var(--scalar-legs)` appended to the trigger's own transition list; the row re-points its depth to `--scale-press-sm` (0.97); `scale: var(--scalar-scale)`; a press light leg, `background-image` = the seam ink × `--engage`; the hover rule's `background` shorthand becomes `background-color` (§4 item 2) |
| `slider/Slider.vue:97-142`, `slider/styles.css:25-58` | `data-engage="press focus"`; the engaged rung on the dock row; `scale: 1 + engage·grow` on a fine pointer, `(1 + engage·grow)/(1 + grow)` on a coarse one (rests inset, grows to its column); the carry script and its paint (`translate` on the value-follow box, `margin-inline-end` on the fill) |
| `composables/dom/useDragVelocity.ts:67-70,133-142,240-243` | `onRelease(v)`: the signed release velocity in px/s, the mean of the moves in the last 80 ms. The existing bridge measures it; no second velocity engine |
| `separator/Separator.vue:99-112` | the passive mapping: ink = seam + engage × (edge − seam) |
| `tests/components/control-bit/binary-triad.test.ts` | the triad test now asserts exactly one press owner per root (the scalar on the switch, `tap-squish` on the other two) |

Unit tests on the patched tree: `vitest run tests/styles tests/components/easing.contract.test.ts tests/components/control-bit` plus every slider, switch, accordion and separator test: 543 passed, 1 failed (`backdrop-prefix-normalization`, which needs a `dist/` that a fresh worktree does not have; environmental). `vue-tsc --noEmit -p tsconfig.src.json`: exit 0, no output.

## 2 · PORTFOLIO §6 D5-C, answered

**Q1 · style-recalc cost of an inherited, transitioning scalar** (`c-cost.mjs`, a standalone card, 20 toggles of the scalar on the press spring's own curve and clock; `logs/c-cost.log`, `logs/c-cost-reread.log`). Rows: `scale-only` (no scalar, the HEAD shape), `noinh` (`inherits: false`), `inh-none` (inherits, nothing reads it), `inh-map` (inherits, every descendant maps it).

| engine, N | scale-only | noinh | inh-none | inh-map | load |
|---|---|---|---|---|---|
| Chromium, 200: CDP RecalcStyleDuration over 20 toggles | 14.7 ms | 23.1 ms | 50.3 ms | 68.8 ms | 87-98 |
| Chromium, 2000 (read twice) | 23.1 / 23.2 ms | 31.0 / 31.0 ms | 235.7 / 257.5 ms | 427.8 / 497.4 ms | 93-112 |
| Chromium, 2000: forced recalc per frame, median | 0.1 ms | 0.1 ms | 0.8 ms | 1.3-1.4 ms | 93-112 |
| WebKit, 200: frames in 4 s (one read) | 380 | 381 | 382 | 305 | 98-107 |
| WebKit, 2000: frames in 4 s (three reads) | 380 / 379 / 379 | 382 / 380 / 382 | 380 / 376 / 382 | **88 / 79 / 80** | 63-100 |
| WebKit, 2000: forced recalc per frame, median (1 ms timer) | 0 | 0 | 2-3 ms | 4 ms | 63-100 |

Layouts: `scale-only` and `inh-map` 19 per 20 toggles (the host's `scale` is applied through style), `noinh` and `inh-none` 0. **Reading:** `inherits: true` costs in proportion to the subtree even when nothing reads the scalar (Chromium ×7.6-8.3 at 2000 nodes), and mapping it in every descendant drops WebKit to about 20 fps on 2000 nodes, read three times at different loads. On a 200-node card the cost is real but small (Chromium +45.7 ms over 20 toggles, about 2.3 ms per toggle). The prototype's hosts are controls with a handful of descendants, so the trio does not pay it. A Card host would. Pass 2: `--commit` and `--carry` are per-surface channels and should be `inherits: false` (the rule `property-regs.css` states at its head). `--engage` keeps `inherits: true` only if Q-1 rules (a), and then a host's subtree size is a stated limit.

**Q2 · does the inherited scalar make a passive atom visibly engaged?** Mechanically yes, both engines (`logs/c-scalar-rc2.log`). With `--engage: 1` on the wrapper, the Separator's ink goes from oklab(0.216 … / 0.08) to (… / 0.16). Pressing a real `data-engage` host with the mouse gives 0.08 → 0.16 (inherited `--engage` 1) → 0.08 on release. At HEAD both cells FAIL (`logs/c-scalar.log`, head block). Owner glance: `captures/sheet-rc-{chromium,webkit}-{light,dark}.png`, the last two crops, `separator-rest` against `separator-host-pressed`. My read: the step is one ink rung, and at a glance it is close to invisible in both themes. It is not noise, because it does not move at rest, but it is not engagement anyone will see either. The Skeleton was not mapped: its rest breathe already animates opacity, and an inherited mapping on top of it would put two writers on its paint.

**Q3 · can the channel budget be checked on a mapping?** Not by a static read. `c-scalar.mjs` Q-3 walks the loaded CSSOM for declarations that reference the scalars (amended here to read shorthands, which the longhand walk missed: the Separator's `background`). On the first build it listed every mapping. Once the switch and the trigger mapped through the shared `--scalar-scale` token, their `scale` vanished from the static read (`logs/c-scalar-rc2.log`: 5 mapping selectors, no `.switch`). That is the leak §1.3 item 3 names, moved from bytes to tokens. The runtime diff does not leak: C-0 sets `--engage: 1` on each root and lists what moved. Switch moves {scale}, i.e. geometry. The trigger moves {scale, background-image}, geometry and luminance. The slider moves {scale}. All are within `CHANNEL_BUDGET` 2 (`engageLadder.ts:96`). The budget check belongs in C-0.

**Q4 · does the overshoot read as bounce, and does E-2 pass from `--commit` alone?** `--engage` rides `--spring-press` and `--spring-dock`, which overshoot +0.0% (`scheme-spring.css:43,45`; both emitted curves are monotone, last stop before 1 at 0.976 and 0.973). The press and the grow land dead, as the ladder rules ("never a positional rebound", `engageLadder.ts:180`). The bounce is the commit's alone. `--spring-panel` (`scheme-spring.css:46`, +4.2%) peaks at 1.04211 (63.3% of its 0.45 s clock), so the impulse's rebound is 4 × 1.04211 × 0.04211 = 0.1755 of the pop budget. E-2 from `--commit` alone, on the Switch and the trigger: 24 of 24 Chromium cells, 20 of 24 WebKit (the 4 are §3 E-2's engine closes). The Chip was not prototyped; it would map the same `--scalar-scale` and retire its flood (`glass-chip.css:27-34`), an E-1 clean-break row.

**Q5 · does a CSS transition accept an initial slope?** No. A transition starts from the before-change value along its timing function's own curve. A `linear()` curve can bake one slope in, but it cannot take a per-release velocity, and the spring table's step responses all leave at slope 0 (first stop 0.00284 at 2.04% for press). The release is one WAAPI animation of the registered `--carry` (`Slider.vue:107-142`): 48 keyframes of `x(t) = e^(−ζωt)(A cos ω_d t + B sin ω_d t)` from x0 = −d with x′(0) = v, on the dock row's (0.30 s, ζ 0.88) over its settle (`springSettleDurationSeconds`, 0.21 s). Animating a registered property through WAAPI works in both engines (E-4 below). The largest one-frame step after release, 19.7 px at 8.4 ms in Chromium and 14.7 px at 10.0 ms in WebKit, is at or below the release's own per-frame travel: the handle leaves the finger without a velocity jump. When the projection clamps at an end, the seed is scaled by d/throw, so the speed steps down at release. That residual is stated, not measured per frame.

## 3 · REGISTRY §3.3, items 1-5

### 3.1 The E-row per witness (item 1)

Prototype readings at `rc2` (Switch and trigger) and `rc` (slider and the static rows; `rc2` changed only the switch and trigger's scale composition). Logs: `logs/battery-rc2.log`, `logs/battery-rc.log`; JSON per cell: `logs/json/`.

| witness | Chromium | Playwright WebKit | HEAD (`../BASELINE.md`) | verdict for D5-C, and who carries what is left |
|---|---|---|---|---|
| E-1 census | FAIL 0/3 (`battery-rc.log:8`) | FAIL 0/3 (`:17`) | RED | **RED by construction.** The scalar has no denominator: it says what a host maps, not which directories exist. C supplies the runtime test per class (C-0 for hosts, the Q-1 live arm for passive atoms, §3.2) and needs A's declaration for the denominator |
| E-2 commit bar (switch, accordion) | **PASS 24/24** (`battery-rc2.log:30`): Switch peak 1.040, trough 0.993 on keyboard, programmatic, pointer and coarse tap; trigger 1.030, 0.995 (tap 0.990); Tab entry quiet; mount quiet | **20/24** (`:61`); the 4 fails are the trigger's pointer and tap cells, ENGINE CLOSED 2/2 | Switch and trigger: 0 of 4 commit cells each (keyboard, programmatic, pointer, tap), mount quiet | **GREEN on the trio** where the engine can be driven. The WebKit closes reproduce on the HEAD build (`battery-rc2.log:172`, pointer and tap 2/2), so they are PF-1's, not this route's. Chip, Checkbox, Radio, Toggle, Tabs and Button were not ported: mechanical rows, one attribute and one `scale` line each, plus a retirement of their own press recipe |
| E-3 slider | **PASS 12/12** (`battery-rc.log:35`): held and focused 360.0 → 375.0 px (×1.042); phone 343.7 → 358.0 px (×1.042), box 16.0..374.0; PRM ×1.000 | **PASS 12/12** (`:53`) | RED 6/12 per engine | **GREEN**, Q-3 (c): in place on fine pointers; on coarse it rests inset by the grow ratio and grows to its column. No promotion |
| E-4 momentum (slider) | **PASS** (`battery-rc.log:62`): fling 142.20 px past release, still 0.00; PRM at rest, overshoot 0.00 | **PASS** (`:71`): 142.22 / 0.00 | RED 0.00 px | **GREEN on the slider.** The tabs drag, Sheet detents, sortable list and Carousel were not touched (`../BASELINE.md` §0.1 stands). The scalar gives each of them a paint channel (`--carry`). The rule (one projection, one seed) is the sheet's function, imported across component directories here. It belongs in `composables/motion` with the four owners as consumers (FL-8), and that move is B's question as much as C's |
| E-5 touch (accordion, switch) | **PASS 8/8** (`battery-rc2.log:76`): trigger Δscale −0.030, press-only `background-image`; PRM press-only `background-image` | **4/6** (`:89`): the switch 4/4; trigger ENGINE CLOSED 2/2 | RED (trigger: leaked hover only) | **GREEN in Chromium**; WebKit trigger cells reproduce the close at HEAD (`battery-rc2.log:180`, 0/2) |
| E-6 idle | not run | not run | RED (absent) | **RED under Q-2's default (b)**: C does not drive an idle scalar on a control. If Q-2 rules (a), a breathing mapping is one `@keyframes` on `--engage` under H-5's bound; not built |
| E-7 one writer | FAIL 2/4 (`battery-rc.log:109`): 2 writers (`ModalOverlay.vue`, `Slider.vue`); the open modal's veil carries `data-engaged` | FAIL 2/4 (`:119`) | RED | **RED, outside the scalar's reach.** The veil and loupe are teleported out of the host's inheritance (`Slider.vue` Teleport blocks), so no inherited scalar reaches them; a script mirror would be a second writer. The attribute's owner is B's or E's to name |
| E-8 clock | **PASS 5/5** (`battery-rc2.log:101`); every scalar transition reads a spring token (`--engage@120ms`, `--commit@450ms`) | 3/5 (`:113`): the trigger's two cells close the engine (HEAD closes them too, `../baseline/p1/head.log:87`) | GREEN (hold line) | **Holds.** The first cut FAILED the mirror: `--engage-press-depth`, `--engage-grow`, `--engage-legs` and `--engage-carry` landed in the envelope mirror's namespace as orphans (`battery-rc1.log`, E-8 mirror). They were renamed out of it (§4 item 1). The carry's 0.21 s is the dock settle without `--motion-tempo` (§5) |
| E-9 PRM | **PASS 18/18** (`battery-rc2.log:138`): the trigger keeps a press-only light answer under reduce (RED at HEAD); commits land in 0 frames | 12/14 (`:159`): the trigger's press cells close the engine | RED | **GREEN.** The PRM arm is one block: the three budgets go to 0, so every spatial mapping retires and every light mapping stays |

Born-RED witness for the family (C-0, `probes/c-scalar.mjs`): HEAD FAILs 7 of 8 cells (`logs/c-scalar.log`, head block: Δscale 0.000 everywhere, separator unchanged). The prototype PASSes 8 of 8 in both engines (`logs/c-scalar-rc2.log`).

### 3.2 Q-1 in a form the census can check (item 2)

C's answer is Q-1 (a), the container's engagement visible in the atom, stated as a declaration plus a runtime test that E-1's contract can read (`../harness/HARNESS.md` §2, E-1):

```ts
// composables/motion/engage/engageDeclaration.ts (proposed, not built)
export const ENGAGE_DECLARATION = {
  members: { switch: "host", accordion: "host", slider: "host", separator: "passive", skeleton: "exempt", /* … all 55 */ },
  classes: {
    host:    { rung: "press",   exemplar: "switch" },   // C-0: --engage:1 (and --commit:.5) on the root moves it
    passive: { rung: "rest",    exemplar: "passive" },  // Q-1 live arm: inside a pressed [data-engage] host a paint
                                                         // property leaves its rest value and returns at release
    exempt:  { rung: null, reason: "its rest animation owns the paint (skeleton breathe)" },
  },
};
```

The runtime arms already exist and run in both engines: C-0 for `host` and the Q-1 live arm for `passive` (`probes/c-scalar.mjs`). Neither reads source text. The channel budget is read from C-0's diff, not from the CSSOM (§2 Q3). Under Q-1's standing default (c), the same table carries `passive` as `exempt` with a reason, and nothing else changes. The table is A's mechanism. C needs one to have a denominator at all, which is the seam REGISTRY §3.4 predicted.

### 3.3 The mount case (item 3)

H-8 (`e2-commit.mjs` mount cell, `?on=1&defer=1`): **8 of 8 PASS**. Switch and trigger, light and dark, both engines: scale range 0.000 and the body still over every frame after mount (`battery-rc2.log`, the `mount(committed)` lines). This holds by construction: a registered property whose first computed value is already 1 has no before-change style, so no transition runs. No mount guard and no script. The risk PORTFOLIO §4 D5-C names ("the `--commit` keyframe fires on mount") belonged to the keyframe form in the charter's sketch (`commit-a`/`commit-b`). The transitioned level does not have it.

### 3.4 Cost on the trio, and the MIGRATION rows (item 4)

`git diff --numstat` at the prototype: 11 files, +236 −6.

| unit | lines | per-component share |
|---|---|---|
| shared: `engage.css` + its import | +95 | once for the library |
| Switch | +5 −1 (2 files) | one attribute, one `scale` line, `tap-squish` removed |
| Accordion trigger | +27 −2 (2 files) | one attribute, the transition append, the depth re-point, `scale`, the light leg, the hover shorthand fix |
| Slider | +74 −1 (2 files) + 23 in `useDragVelocity` | one attribute, two `scale` lines, two carry paint rules, the 46-line carry function |
| Separator | +8 −1 | the ink mapping |
| test | +4 −1 | the one-press-owner assertion |

The bit-sized hosts cost one attribute and one line each. A host with its own `transition` or `background` shorthand costs an audit of both (§4 item 2). Momentum costs a script per dragged surface unless the projection moves to one owner.

MIGRATION rows (consumer census read-only, authored `*.vue`/`*.ts`, `node_modules`, `dist`, `.git`, `bench`, `.worktrees` excluded):

| row | change | consumers it reaches |
|---|---|---|
| MIG-C1 | `Switch` no longer carries `.tap-squish`; its press is `[data-engage]`'s | none read `.switch.tap-squish`. The four `tap-squish`/`interactive-item` consumers (`../PORTFOLIO.md` §1.5) are unaffected until those recipes retire (E-1 clean break, one row per consumer then) |
| MIG-C2 | new public surface: `data-engage`, `--engage`, `--commit`, `--carry` (registered), `--commit-bump`, `--scalar-scale`, `--scalar-legs`, `--rung-press-depth`, `--rung-grow`, `--commit-pop` | none yet; needs an exported, documented contract before any consumer maps it (`../PORTFOLIO.md` §4 D5-C consumer impact) |
| MIG-C3 | a fling on a controlled, single-thumb, horizontal `Slider` writes a projected value, an extra `update:modelValue` and `valueCommit` after reka's | `keyframes.js/demo/components/playback/PlaybackRibbon.vue:52` (`@value-commit`, a transport scrub); `fourier-analysis/web/src/components/ui/SliderControl.vue:98` and `web/e2e/timeline-scrub.spec.ts:14,150` (the e2e reasons about `valueCommit` semantics); `<Slider>` in value.js (5 files), sci-report (6), speedtest (1), atlas (1), keyframes.js (3), fourier-analysis (2). A transport must not coast past where the finger let go. Q-4 has to scope this, or the slider takes an opt-in `momentum` prop |
| MIG-C4 | the disclosure trigger's hover writes `background-color`, not `background` | `AccordionTrigger`/`Separator` sites: keyframes.js 9 files, speedtest 5, value.js 3, fourier-analysis 3, sci-report 1. Only a site that sets its own `background-image` on the trigger sees a difference (the press veil composites with it) |
| MIG-C5 | a `Separator` inside any `[data-engage]` host steps up one ink rung while the host is engaged | separators nested in sliders, switches or triggers: none found by name; to be re-read when Card or row hosts adopt |
| MIG-C6 | `useDragVelocity({ onRelease })`, additive | none |

### 3.5 Paint: owner-glance captures (item 5)

`R-C/captures/`: one contact sheet per engine × theme for the prototype (`sheet-rc-*`) and for HEAD (`sheet-head-*`), 18 crops each. Per crop: Switch rest, pressed, pop peak, pop rebound, committed; trigger rest, pressed, pop peak, open; Slider rest, held, keyboard-focused, carry mid-flight, settled; phone rest and touch-held; Separator rest and inside a pressed host. Loose crops are beside the sheets. Built by `probes/c-captures.mjs` (`logs/c-captures.log`, `logs/c-captures-webkit.log`).

- Chromium mid-motion frames are **seeked**: every running animation is paused at a named fraction (pop peak at 20.4% of the panel clock where c = 0.5, rebound at 63.3%, carry at 23.5%), so the frame does not depend on load.
- Playwright WebKit does not restyle a dependent property from a paused, seeked registered-property transition: the switch read 1.000 at a seeked peak where E-2 reads 1.040 live. So in WebKit the pop and rebound frames are **pinned**: the scalar is written inline at the frame's value (c = 0.5, c = 1.04211) with transitions off. They are labelled "(pinned)" on the sheet.
- WebKit's trigger "pressed" frame is pinned too (`--engage: 1`), because a pointer over the trigger closes the page (PF-1). The WebKit phone frame uses a coarse context and a mouse hold, labelled as such.

What the frames show, for the seats that judge them (my read, not the gestalt verdict):
- The Switch's commit pop and rebound (×1.040, ×0.993) are small and carry state, and add no lighting layer. The press is the shipped 0.96.
- The trigger's press (×0.970 plus a seam-ink veil) on a 320 px row reads heavier than the bit's, with the hover pill under it in Chromium. Its pop (×1.030) on a full-width row is visible motion on a large box. Under O-87 ("flatter, more refined"), the row is the mapping I would expect a judge to question first.
- The slider grows ×1.042 held and focused, and stays grown after a pointer drag until blur (§4 item 5; visible in `slider-settled`). The fling's settle frame shows the value thrown to the end (§4 item 6).
- The Separator's engaged ink step is barely visible (§2 Q2).

## 4 · Findings the work forced

1. **The `--engage-*` prefix is the envelope mirror's.** `motion-registers.css:180-187` owns `--engage-<role>-<attack|release>`, and E-8's mirror cell reads every `--engage-*` on `:root` as a mirror row. The first cut's budgets and carry landed there as four orphans and FAILED E-8 in both engines (`battery-rc1.log`). They were renamed `--rung-*`, `--scalar-*`, `--carry`. The scalar itself, `--engage`, is not on `:root` as a token and does not collide. Any family that mints `--engage-<x>` will hit this.
2. **Two shorthand traps per adopting host.** (a) `[data-engage] { transition: … }` and a host's own `transition` list are the same specificity in the same layer, so whichever comes later wins and drops the other's legs: the `tap-squish` bug again (`base.css:290-296`, `control-bit.css:53-60`). The cure is `--scalar-legs`, appended to the host's own list (`disclosure.css:73`, `slider/styles.css` transition). (b) The trigger's hover `background:` shorthand reset the press veil's `background-image`, and a touch carries a sticky hover, so the press light leg vanished exactly under touch. E-5 PRM press-light FAILed 2/2 in Chromium on the first cut (`battery-rc1.log`, E-5). The cure is `background-color`.
3. **A tap commits before its press drains.** With the press and the pop summed, a coarse tap read peak 1.007, trough 0.979 on the Switch (FAIL; `battery-rc.log`, E-2 tap cells), because the 0.96 squish was still in flight when the pop began. `--scalar-scale` lets a commit in flight pre-empt the press (the `(1 − bump)` factor): tap peak 1.040 and 1.030 after the change (`battery-rc2.log`).
4. **The static channel read leaks through tokens** (§2 Q3): the budget check is C-0's runtime diff.
5. **After a pointer drag, reka's slider thumb matches `:focus-visible`** (true at 50, 600 and 1500 ms after release, both engines and at HEAD; a plain click leaves no focus; `logs/c-afterdrag.log`). At HEAD that leaves the keyboard focus ribbon on after a drag (visible in `sheet-head-chromium-light.png`, `slider-settled`). Under C the `focus` arm keeps the slider grown until blur. A modality signal that `:focus-visible` cannot supply here is a script write, and that write is not the scalar's to make.
6. **A fling on a value control is a semantic change, not only a motion.** E-4's fling (about 2500 px/s at release, `e4-momentum.mjs:5`) projects about 530 px on the dock horizon and clamps at the end. The slider lands at its maximum (`sheet-rc-*`, `slider-settled`). The witness only asks for ≥ 4 px, and the projection rule is the sheet's. Whether a value slider coasts at all is Q-4, with the transports of MIG-C3 as the case against.
7. **WebKit seek behaviour** (§3.5) is an instrument fact for every capture seat: seek-and-read works for WAAPI and CSS transitions in Chromium, but not for dependents of a registered-property transition in Playwright WebKit.
8. **The accordion trigger's WebKit closes are not this route's.** HEAD's build closes the same cells 2/2 (`battery-rc2.log:172,180`). REGISTRY's PF-1 extension (`../PORTFOLIO.md` §1.3 item 7) stands.

## 5 · Open gaps (for the agglomerator)

| id | gap | where it lands |
|---|---|---|
| C-G1 | E-1: no denominator; needs a declaration (§3.2), all 55 directories | pairs with A |
| C-G2 | E-7: the teleported veil and loupe cannot inherit; the attribute needs an owner | B or E |
| C-G3 | E-4 on the tabs drag, the Sheet, the sortable list and the Carousel; the projection rule moved from `sheet/detents/projection.ts` to one owner in `composables/motion` (FL-8) | pass 2, with B's rule |
| C-G4 | the carry: horizontal, LTR, single thumb and controlled only; vertical, inverted, RTL and uncontrolled (`defaultValue`) do not carry; the fill's carry uses `margin-inline-end` (one layout per frame for ~0.21 s on one element) | pass 2 |
| C-G5 | the carry's clock ignores `--motion-tempo` (`springSettleDurationSeconds(row)` at tempo 1) | FL-2 |
| C-G6 | `--commit` and `--carry` should be `inherits: false`; `--engage`'s inheritance cost is a stated limit on host subtree size (§2 Q1) | pass 2, measured above |
| C-G7 | the slider stays engaged after a pointer drag (§4 item 5) | a modality signal, outside the scalar |
| C-G8 | momentum on value sliders needs Q-4 scoped, or an opt-in (§4 item 6, MIG-C3) | owner (Q-4) |
| C-G9 | Checkbox, Radio, Toggle, Tabs, Chip and Button not ported; `tap-squish`, `.interactive-item`, `.glass-capsule-hover` and the Chip flood still own their presses (two press systems coexist during migration) | E-1 clean break |
| C-G10 | the Skeleton's passive answer is unmapped (its breathe owns opacity) | Q-1 ruling |
| C-G11 | E-6 untouched (Q-2 default (b)); FL-3 forced colors and reduced transparency for the press veil and the grow are not stated | pass 2 |
| C-G12 | the gestalt read of the captures by seats that did not build this (REGISTRY §2.5); real Safari UNMEASURED | critique wave; owner's checkbox |

## 6 · Artefacts and reproduce

| path (under `pass-1/`) | what |
|---|---|
| `R-C.patch` | the prototype, `git apply --check` clean at `1a791c10` |
| `R-C/probes/c-scalar.mjs` | C-0 (born-RED witness), Q-1 static and live arms, Q-3 static read (amended: shorthands) |
| `R-C/probes/c-cost.mjs` | §2 Q1 |
| `R-C/probes/c-captures.mjs` | §3.5 (amended: WebKit pinning, PF-1 pin, renamed carry) |
| `R-C/probes/c-afterdrag.mjs` | §4 item 5 |
| `R-C/probes/rc-battery.sh`, `rc2-battery.sh`, `rc-paint-cost.sh`, `rc-webkit-paint.sh` | the runs, in order |
| `R-C/logs/battery-rc1.log` | first cut (namespace collision, hover clobber; stopped at E-8) |
| `R-C/logs/battery-rc.log` | after the rename and the hover fix: E-1, E-3, E-4, E-5, E-7, E-8, E-2, E-9 |
| `R-C/logs/battery-rc2.log` | after the tap fix: E-2, E-5, E-8, E-9; HEAD's WebKit trigger cells |
| `R-C/logs/c-scalar.log`, `c-scalar-rc2.log`, `c-cost.log`, `c-cost-reread.log`, `c-afterdrag.log`, `c-captures.log`, `c-captures-webkit.log`, `json/` | as named; every cell with its load |
| `R-C/captures/` | the sheets and crops |

```sh
H=docs/tranches/BL/design/engagement/harness; R=docs/tranches/BL/design/engagement/pass-1; S=<scratch>
git worktree add --detach $S/wt HEAD && ln -s "$PWD/node_modules" $S/wt/node_modules && (cd $S/wt && git apply "$OLDPWD/$R/R-C.patch")
git worktree add --detach $S/head HEAD && ln -s "$PWD/node_modules" $S/head/node_modules
node $H/build.mjs $S/wt --label rc2 --out $S/out && node $H/build.mjs $S/head --label head --out $S/out
$R/R-C/probes/rc2-battery.sh $S/out/builds/rc2 $S/out/builds/head
$R/R-C/probes/rc-battery.sh $S/out/builds/rc2 $S/wt rc        # the full narrowed battery
$R/R-C/probes/rc-paint-cost.sh $S/out/builds/rc2 $S/out/builds/head $R/R-C/captures
$R/R-C/probes/rc-webkit-paint.sh $S/out/builds/rc2 $S/out/builds/head $R/R-C/captures
git worktree remove --force $S/wt && git worktree remove --force $S/head
```
