# BM — the tranche plan

| field | value |
|---|---|
| seat | formation seat, BM part 3 (`driver/bm-part-3.js`), resumed on the owner's order to re-deploy every workflow (2026-11-24 evening, 2026-11-25 morning, and 2026-11-27 evening after the weekly usage limit). It continues the partial formation committed at `f88841d27` and `fe281d921`. Writes this file, `waves/`, `FINAL.md`, `FORMATION.md`, `messages/`, and BM-0's edits to `docs/precepts/` |
| fold | BM part 3's fold seat (2026-11-27, `claude-opus-5-5`) amended this file, the waves, the messages and the precept branch after the two critiques. `fold-part3.md` lists every objection and what it changed; `fold-part3-precepts.patch` carries the precept amendments for `bm/precepts-wip` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | glass-ui master `0c5e98e52` on 2026-11-27 (no `src/` change since `c0fdcdc08`, where the first attempt read it); `release/11.1.1` at `871be44bc`, whose source is still `b124a311a` (judged; its third close is running); npm `latest` is 11.1.0, `release-10` 10.1.6. `audit/INBOUND.md` ends at O-438. O-437 (daraksha's seat ring, the floating Card's corner, PagerDots' ring) and O-438 (the Blob's body, a discrete Slider) arrived after the formation and are folded (§6, §7, §8) |
| inputs, read in full | `CHARTER.md`, `PROGRESS.md`; `study/DESIGN.md` (pass 10 with the final fold), `study/OPEN.md`, `study/pass-10/fold.md`, `study/choices/RULING-2026-11-23.md` (O-426 and its O-428 addendum); the drafts `study/pass-10/tranche-draft.md`, `precepts.md` and `messages/`; BL's `PLAN.md`, `waves/INDEX.md`, `waves/W-B.17.md`, `waves/W-B.18.md`, `waves/W-I.8.md` (R-2, R-6, R-12), `driver/glass-11.1.1-scope.md` (the 11.1.2 scope, every section dated 2026-11-19 to 2026-11-27), `driver/glass-11.1.1-exits-scope.md`, `audit/triage-1119/PLACED.md`, `audit/hassio-r13/PLACED.md`, `audit/hassio-r14/PLACED.md`, `design/dock-frames/inbound/value-js-2026-11-24-four-sites.md`; `audit/INBOUND.md` O-171, O-350, O-353, O-408, O-410, O-420 to O-438 |
| sites read | atlas `u/s24-atlas` (`f8e0050`) in `.u-build/s24-atlas`, and the sci dashboards `u/s24-sci` (`219a6859`), where the files changed since `fa6e3793` are the scatter, `states.ts` and tests, none of them cited; value.js `origin/master` (`561137225`); keyframes.js `origin/master` (`2a11fb1f`, `kf47` merged); fourier `origin/master` (`89337ad`); daraksha `origin/master` (`cd9c430`) and `b13` (`d22ed84`, where the files changed since `1c0ecaa` are `e2e/veil-film.spec.ts` and `src/veil/film/Layer.vue`, neither cited); gaggle `site-redesign` (`e0819ab`) and `tranche-c` (`2e91359`); Home Assistant `master` (`a9094186`, whose changes since `f58c650f` are under `docs/` only); dns-analysis `master` (`da6ed10`); slides `npig` (`3cec2cb`). Re-read by the fold on 2026-11-27 |
| fences | no source edit, no build and no browser. The sites' sources were read with `git show` and `git grep` at the local refs above, with no fetch. The only git writes are BM-0's, in the precepts repo: its `main` fast-forwarded to `origin/main` (`51edb59`, 2026-11-25), then `bm/precepts-wip` brought onto that head by a merge (`e73fcbf`) with the amendments landed on it (`afe49d9`, 2026-11-27). Nothing pushed, nothing force-pushed, precepts `main` left clean at `51edb59`. The fold's precept amendments are a patch on `afe49d9`, not a commit |

Short cites: `D§n` is `study/DESIGN.md` section n; `OPEN` is `study/OPEN.md`; `IN O-n` is BL's `audit/INBOUND.md` row; `S112` is BL's `driver/glass-11.1.1-scope.md` (the 11.1.2 scope, under its old name); `R111` is glass `release/11.1.1`.

## 1 Mode and close

**Mode.** BM builds the design the study settled. The owner ratified it on 2026-11-23 (IN O-426): every choice on the board takes its default, the four exceptions are named in D§1, and the iPhone readings are optional, so one that arrives amends a decision and none holds one back. His order on the toggle (IN O-428) is BM-1. Execution starts when the owner greenlights it. Every seat is Opus 5.5, declared on the seat (CHARTER).

**The close.** BM closes when the 12.0.0 tag is live with provenance and `FINAL.md` lands. A wave whose site has not answered its question ships the default its message names, and FINAL.md records it so. A wave held by its own condition (BM-4 and BM-11 by keyframes.js's sampler, BM-12 by G-6 or by its neck's frame count) is recorded with its reading, never re-booked silently.

**Rules every wave follows.**

- **A wave proves itself by its strip and its page.** Each wave's proof is the strip it captures (light and dark, 390 and 1440) and the page it changes, in headless Chromium and in Playwright WebKit, every run through `guarded` (WebKit runs under `guarded --exclusive webkit`). The six gates in §4 only keep the invariants from coming back (gates-abrogation). No wave adds a gate that hard-codes a roster or a count a later wave must hand-edit, and no gate reads prose.
- **Engines.** Headless Chromium is not a GPU and Playwright WebKit is not Safari. A claim about production iOS Safari rests on WebKit's source or release notes and is marked as an inference, or on an iPhone reading, which is optional (D§15).
- **Clean breaks.** No alias, shim, dual path or masking fallback. A removed public name gets a MIGRATION row in the same wave and a line in its site's message.
- **Nothing in `src/` carries a wave id, a row id or seat vocabulary in a comment.**
- **A colour token mixes one level deep.** 11.1.2 flattens every token that is a `color-mix()` of other mixed tokens, after a Playwright WebKit page crash on hovering one (IN O-436 (1)); daraksha's occasion-mode crash had the same cause (§10). A token a BM wave writes or reads for a fill, a tone or a glyph's colour reads a section colour, the plate's tone or a flat token directly, never a mix of mixes.
- **A reduced form is a named carve.** From 11.1.1 the reduced-motion rule sits in its own last layer and zeroes every transition (`R111` `styles/utilities/a11y-overrides.css:6-30`). A form a wave keeps under Reduce Motion survives it only as an `!important` declaration in `components`, written in the part's own stylesheet and named in its wave. `data-allow-motion` is not one: it keeps a transition through the theme flip's `html.no-transition` (`:49-54`) and nothing more.
- **A site's stylesheet paths keep working.** Home Assistant imports about forty of glass's stylesheets by `dist/` path (`frontend/src/core/sheet.css:23-62`). A partial a wave adds is imported by the stylesheet that needs it, so every existing path still carries it. A moved or removed path is 12.0.0's, with a MIGRATION row and a line in the site's message. Each candidate's census reads the paths each site imports, beside the names.
- **The precepts lead.** BM-0's amendments, with the fold's patch, are the law each wave builds to. Where a precept and DESIGN disagree, the wave stops and the orchestrator settles it before building.

## 2 Releases, by the release rule

Glass's minors take their numbers in the order they ship (IN O-429), so this tranche names a release by its work. The numbers are fixed when a release cuts, and the sites are told then. A changed default look, boxes included, goes in a minor; a removed or renamed public name, or one whose meaning changes, goes in a major (BL's `audit/triage-1119/PLACED.md:28`).

| Release | Whose | What of BM's it carries |
|---|---|---|
| **11.1.1** | BL's exits patch, judged and cutting | Nothing. Its exits are the base BM-6 builds on (IN O-434) |
| **11.1.2** | BL's | Nothing. BM's waves keep its cures (§6) |
| **the first minor after 11.1.2** | atlas's asks (GL-5 (a), (b), (d) and GL-10, the Dialog that enters from its opener), Home Assistant's AvatarStack (LF-55, with LF-30's first half), and the floating Card's room corner (IN O-437 (1)) | Nothing. BM-6 builds its veil on that Dialog (§7) |
| **the dock-redesign minor** | BL's W-I.8, with W-B.17's plate | BM-1, the toggle's new face and the theme's one crossfade; BM-2, the plate's strengths |
| **BM's parts minor** | BM's | BM-3, BM-4 (with BM-3's settle player), BM-5, BM-6, BM-7, BM-13, BM-14, BM-15, and its candidate BM-R1. Nothing a site calls is removed |
| **12.0.0** | the removals, the names whose meaning changes, and the parts that need its dock that samples nothing | BM-9, BM-10 (`v-model:detent` at rest), BM-11 (with the capsule window BM-8 drew), BM-12, and its candidate BM-R2 |

**Order.** BM's parts minor ships after the dock-redesign minor: BM-5 lands on BL's slider build, BM-4 replaces the run mark the redesign ships, and BM-2's ladder is the one the redesign's plate reads. The first minor after 11.1.2 may ship before or after the dock-redesign minor. If BM's parts minor were to cut before it, BM-6 builds the veil on today's Dialog and GL-10's entrance lands on top of it. If keyframes.js's sampler has not shipped when BM's parts minor cuts, BM-4 waits with BM-3's step 2 for the next minor, named by its work, and today's mark stays.

**BL's rows booked to the old 11.3.0.** BL placed rows to "11.3.0" before the release rule: atlas's G3, G6, G10, G11, G14 and G15 and value.js's G1, G6 to G10 and G17 (`audit/triage-1119/PLACED.md:22-34`), and Home Assistant's LF-15, LF-16, LF-18 to LF-20, LF-22, LF-27, LF-28, LF-30's second half, LF-31 and LF-35 to LF-37 (IN O-412), with the span-bar and ring part (LF-23, LF-24). They are BL's. Each takes the minor it ships in, named by its work, and rides BM's parts minor only if BL has it built when BM-R1 cuts; BM-R1 then reads it in the candidate's census and each site's budget. Five meet BM's waves, and §7 says how BM stays clear of each: value.js's G1 is BM-5's thumbless default; value.js's G6 (O-410's one opening) and G7 (a short phone Select at its trigger) meet BM-6; LF-16's drag region meets BM-10; LF-18's thumb rung meets BM-5's knob.

## 3 The design, and its yields

The design is D§1's eleven laws under the owner's standing law, built as D§3 to D§9 set out. Where the law yields to an order, the order is named in the wave that carries it. There are seven:

1. **The goo** (choice 24 C; `restraint.md` Motion): its filter and its two nodes, and on a dock that mounts it, a close painted on the page's thread while the filter is on. BM-12.
2. **Overshoot** on the spatial morphs the owner ruled, and nowhere else. BM-3 moves every entrance, control and reading register off the one row that passes its target.
3. **The menu's grow** (O-171, choice 10 C): a clip on the page's thread over `bloom`'s 370 ms, for a menu or a select. BM-6.
4. **The toggle** (O-428): its colour beside the current seat's ink, and three legs on a tap, all on one 200 ms clock. BM-1.
5. **A slider with both a knob and a readout** (O-426): three legs on a press. BM-5.
6. **The fold and the split** (choice 19 B's own cost line): the fold runs 3, and an open with the seat's split 5. BM-11, BM-12.
7. **A dialog's open and its leave** (choice 12 B, Q22): 3 each, the veil being the third leg. BM-6. GL-10's Dialog that enters from its opener fits that count or goes to the owner before it is built.

The owner's one open question (OPEN §1) holds no wave: the toast's vanish (O-2), which no wave reaches. O-1, `--ease-cartoon-punch`'s overshoot on controls, closes on `restraint.md`'s check ("no overshoot on a control") and P2 ("mount, popover open, dialog in … no overshoot"): BM-3 moves the token's control and entrance readers onto a row that does not pass its target, and FINAL tells the owner, who may reverse it.

## 4 Hard gates

Six, each an invariant of the shipped library read at runtime, not a figure from one fixture, and a seventh row that is a reading. No gate carries a roster or reads a precept's prose: an exception is known by what its own part carries (P5 names the selectors; `restraint.md` names `data-motion-count`).

| Gate | The invariant | Read by | Holds from |
|---|---|---|---|
| **G-1** | No `--spring-*` token is a `linear()`. Each is a `cubic-bezier()` that leaves rest at zero slope. A token's curve passes 1 only where its `SPRING_PRESETS` row's damping is below one, and by no more than that row's closed-form overshoot. No entrance, control or reading register (`--enter-*`, `--route-*`, and the timing function of every running transition in the G-2 run outside the parts P5 names) resolves to a curve that passes 1 | the built token sheet, parsed, each curve evaluated against its row; the G-2 run's computed timing functions. Each fit's distance from its closed form is recorded in FINAL as a reading, measured against the closed form, not today's lists | BM-3 |
| **G-2** | A part's animated properties are `translate`, `scale`, `rotate`, `transform` and `opacity`, except an effect of 200 ms or less on the page's thread and the two orders P5 names, read by the selector each part carries (`[data-reveal="menu"]`; the fusion layer's own element) | `document.getAnimations()` and the computed transition lists over each part's states, in Chromium and Playwright WebKit | every wave that moves anything |
| **G-3** | No change runs more than two animations on one control, counted by `restraint.md`'s counting rules, except on a part whose root carries `data-motion-count`, which runs no more than its count | the G-2 run, per state | every wave that moves anything |
| **G-4** | *A reading, not a gate.* Each site's own budget check at each candidate, run by the site or by BM on the site's build: Home Assistant's entry margin and per-script cap, daraksha's `scripts/check-budget.mjs`, gaggle's gate 29 and vendor gate, atlas's suites. Recorded in FINAL §4. A built entry over its site's bound cuts back the wave that tipped it before the release | each site's own check | each candidate that carries a BM wave: the dock-redesign minor's, BM-R1, BM-R2 |
| **G-5** | Nothing changes in one frame, with Reduce Motion off and on: every property a state change moves has a running transition or animation, and its sampled frames land no more than two fifths of the travel in one 60 Hz frame over at least five frames (P0a; 167 ms or more on the page's thread) | the G-2 run, in both modes | every wave that moves anything |
| **G-6** | The 12.0.0 dock samples nothing: `--dock-surface-blur` is the zero rung, and the dock's computed `backdrop-filter` is `none` | the built dock in both engines | BM-12. The goo ships only if it holds |
| **G-7** | The goo's filter is on only while it must be: the layer mounts only on a dock with a seat beside it; its filter attribute is present from a close's first frame through the folded rest and is cleared on the first frame of an open whose gap reaches 6 px; nothing under the layer animates a layout property | the built dock, frame by frame, in both engines | BM-12. The frame gaps a close with the filter shows on a busy page are a recorded reading (Playwright WebKit, then Safari's Web Inspector when one comes), which amends σ and the layer's region and never holds the wave |

## 5 Waves

| Wave | What | Release | DESIGN | Starts from | Gates | Sites | Status | File |
|---|---|---|---|---|---|---|---|---|
| BM-0 | The precepts | before every wave | §12 | `study/pass-10/precepts.md` | none (text) | all | complete, unjudged: on precepts `bm/precepts-wip` at `afe49d9`, atop `origin/main` (`51edb59`), not pushed; the fold's amendments are `fold-part3-precepts.patch`, to apply on the branch before it is judged | `waves/BM-0.md` |
| BM-1 | The toggle's new face (O-428) and the theme's one crossfade (O-353, O-430 item 9) | the dock-redesign minor | §9 | `study/pass-10/toggle/sketch/`, amended by the fold | G-2, G-3, G-5 | atlas, keyframes, gaggle, slides; fourier through `useGlobalDark` | planned | `waves/BM-1.md` |
| BM-2 | The plate's strengths (choice 5, C) | the dock-redesign minor | §6.2 | W-B.17's `plate.css` | G-2, G-3, G-5 | every dock site | planned | `waves/BM-2.md` |
| BM-3 | Springs on curves Safari's compositor takes | BM's parts minor | §4.2 | `SPRING_PRESETS`; keyframes.js | G-1, G-2, G-5 | every site | planned; its settle player waits on keyframes.js | `waves/BM-3.md` |
| BM-4 | The one selection mark | BM's parts minor, with BM-3's step 2 | §8.1 | `pass-6/fold/` | G-2, G-3, G-5 | every site with a segmented strip, a dock run or a Switch | planned; lands with BM-3's settle player | `waves/BM-4.md` |
| BM-5 | The slider while held (choice 23, C), with the finger target (GL-15) and the thumbless default (O-408) | BM's parts minor | §8.3 | `study/pass-10/slider/sketch/` | G-2, G-3, G-5 | every slider site | planned | `waves/BM-5.md` |
| BM-6 | Presentations | BM's parts minor | §5.2, §6.3 to §6.5 | 11.1.1's exits | G-2, G-3, G-5 | every site with an overlay | planned | `waves/BM-6.md` |
| BM-7 | The rim's window | BM's parts minor | §4.3 | `study/pass-2/delivery/sketch/scroll-progress-rim.next.css` | G-2, G-5 | atlas, fourier | planned | `waves/BM-7.md` |
| BM-13 | FourierField on `@mkbabb/fourier` | BM's parts minor | — (IN O-428 (3)) | `@mkbabb/fourier` 0.1.0 | none; the field's own proof | slides; glass's demo | planned | `waves/BM-13.md` |
| BM-14 | The discrete slider (IN O-438 (2)) | BM's parts minor | none: designed in the wave | Slider's `size`, `step` and `marks` | G-2, G-3, G-5 | value.js first | planned; its design comes first | `waves/BM-14.md` |
| BM-15 | The Blob's body (IN O-438 (1)) | BM's parts minor | none: designed in the wave | 11.1.2's jitter reading | G-2, G-5 | value.js | planned; waits on 11.1.2's reading | `waves/BM-15.md` |
| BM-R1 | BM's parts minor's candidate | BM's parts minor | §11 | — | G-4's reading | every site | planned | `waves/BM-R1.md` |
| BM-8 | The capsule window | 12.0.0, inside BM-11 | §3 | `pass-4/shape/` | with BM-11 | every dock site | moved into BM-11 by the fold: no 11.x path | `waves/BM-8.md` |
| BM-9 | The removals | 12.0.0 | §4.3, §7.5, §8.1 | the census at the sites' refs of the day | each removal's census | every site | planned | `waves/BM-9.md` |
| BM-10 | Sheets as native scroll | 12.0.0 | §6.4 | `pass-9/fold/` | G-2, G-5 | atlas, keyframes, gaggle, Home Assistant | planned | `waves/BM-10.md` |
| BM-11 | The fold, on the capsule window | 12.0.0 | §7.1, §3 | `pass-7/fuse/`, `pass-8/fold/sketch/fold-cover.next.css`, `pass-4/shape/` | G-2, G-3, G-5 | every dock site | planned; its settle waits on BM-3's step 2 | `waves/BM-11.md` |
| BM-12 | The goo | 12.0.0 | §7.3, §7.4 | `study/pass-10/goo/goo.next.css` | G-6, G-7, G-2, G-3, G-5 | a dock with a seat beside it | planned; its neck's frame count first, then G-6 and G-7 | `waves/BM-12.md` |
| BM-R2 | 12.0.0's candidate | 12.0.0 | §11 | — | G-4's reading | every site | planned | `waves/BM-R2.md` |

**Dependencies.** BM-0 (with the fold's patch) before every wave. BM-1 and BM-2 on W-B.17's plate in the dock-redesign minor. BM-5 on BL's slider build (W-B.18 at `fe30f9882`); it builds the thumbless default and the knob itself, since no BL ref names either. BM-4 on the dock-redesign's run and on BM-3's step 2. BM-3's settle player on keyframes.js's sampler; its single-curve tokens on nothing. BM-11 builds the capsule window and waits on BM-3's step 2 for its settle. BM-12 on BM-11, on W-I.8's 12.0.0 `beside` slot, and on G-6, which W-R.1 writes. BM-10 on 11.1.2's phone-scroll cure. BM-15 on 11.1.2's Blob reading. Each candidate after its release's waves.

**Parallelism.** At most five seats at once across every live run (the machine law). BM-3, BM-5, BM-7 and BM-13 touch disjoint files and may run together; BM-4 follows BM-3; BM-14 follows BM-5 on the same sheet; BM-6 shares `_shared/overlay/` with nothing else in the minor; BM-11 and BM-12 run in order on one branch.

## 6 The 11.1.1 and 11.1.2 work BM keeps

Each is settled in BL's scope files, and the wave named carries a cell that keeps it. One change is made on purpose: BM-6 removes two of 11.1.1's exit legs (the side slide and the menu's clip running back) by P0a rule 3 and choice 11 B, keeping every one of O-434's witnesses (BM-6; §8 tells BL).

| Cure | Release | Kept by |
|---|---|---|
| Every floating surface leaves on one even curve, `--exit-curve` = `cubic-bezier(0.3, 0.2, 0.7, 0.8)`, on a clock from the motion tokens and shorter than its entrance (the exits scope, row 3), no frame over a fifth, the same exit on every dismissal route, reversal from where it is (IN O-434; `R111` `motion-registers.css:148-152`, CHANGELOG 11.1.1) | 11.1.1 | BM-6, which keeps the curve, the clock and every witness, and drops the slide that P0a rule 3 bars |
| The Slider's touch intent: on a coarse pointer `touch-action: pan-y`, no value until 10 px more along the track than across it, a tap sets the value once at its release (LF-57; S112, the 2026-11-24 LF-56/57 section) | 11.1.2 | BM-5, BM-14 |
| The dock's press-outside and teleport checks read `composedPath()` (LF-56) | 11.1.2 | BM-6 (the touch slide), BM-11, BM-12 |
| The dock's `:has(:empty)` rules become root attributes, `data-summary` and `data-persistent` (IN O-433) | 11.1.2 | BM-11, BM-12 |
| A selected seat's ring stays whole while the dock morphs: the morph clip leaves room on the block axis for the `--dock-active-shadow` spread (IN O-437 (3); S112, "daraksha's seat ring (O-437)") | 11.1.2 | BM-11, whose controls window leaves the same room |
| The toggle's fixed name, "Dark mode", with `aria-pressed` (GL-7) | 11.1.2 | BM-1 |
| The pointer light leaves every surface; a state's rest light stays until the dock redesign shows selection by fill steps (S112, "the pointer light leaves cards too") | 11.1.2 | BM-2 is the fill step. BM writes no specular rule |
| The phone-scroll cure, the detented scrim, GL-11, GL-13 | 11.1.2 | BM-10 |
| A phone Select keeps its sheet form from open until its content unmounts, so it never re-anchors to its trigger on its first closed frame (atlas's film G-1, IN O-434; `b0748ff69`, `_shared/overlay/sheet-width.ts`) | 11.1.1 | BM-6 |
| A Sheet's exit: on every side and every dismissal route the frame before the unmount shows 1 % or less of it (atlas's film G-2) | 11.1.2 | BM-6, BM-10 |
| A coarse pointer's touch target stays at least 44 px and adds nothing to any ancestor's scrollable overflow (atlas's film G-3: a Slider or SegmentedTabs at the inline edge of an `overflow: auto` scroller leaves its `scrollWidth` at its `clientWidth`) | 11.1.2 | BM-4, BM-5 (at fine and coarse pointers, since its grown ground overhangs the track) |
| A detented sheet's region scrolls on the block axis only, and a focus ring at its inline edge stays whole (atlas's film G-4) | 11.1.2 | BM-10 |
| `useSelectionGroup` scrolls only its own run (GL-18); a run whose seats fit is no scroller (O-430 item 7); a run lets a vertical swipe through (GL-16) | 11.1.2 | BM-4 |
| Every spring easing's last step within 0.1 % (O-430 item 6; O-311) | 11.1.2 | BM-3 replaces the tokens after it; G-1 compares against the closed form, not today's list |
| The dock's words and glyph change on the plate's clock (O-430 item 9, first half); reduced motion trades the dock's faces by a fade in place (item 8) | 11.1.2 | BM-1 (whose crossfade is item 9's second half), BM-11 |
| The Blob's jitter measured, and a fault cured with its witness (IN O-438 (1); S112, "the hero Blob's jitter (O-438)") | 11.1.2 | BM-15 builds on the reading |

## 7 Parts other tranches own, which BM must not collide with

| Part | Whose, and when | How BM stays clear |
|---|---|---|
| The span-bar and ring part (Home Assistant's LF-23 and LF-24, amended into one part with two forms, shown to the owner before it is built) | BL; placed "11.3.0, O-412" (`audit/hassio-r14/PLACED.md:8`), the old number of BM's parts minor. It rides that minor only if it is designed, shown and built when BM-R1 cuts; otherwise the minor it ships in, named by its work | BM-7's window lives inside `ScrollProgressRim` and BM-5's fill inside the Slider. Neither publishes a window primitive, a span token or a ring. BM-7's window reveals a stroke's length on a border and the dock's capsule window (BM-11) reveals a plate, so no shared helper is made now. If the span-bar part takes D§3's capsule window, the dock's window rules move to one private partial both read, in the release that ships the second reader, with no copy |
| The AvatarStack (LF-55, with LF-30's first half) | the first minor after 11.1.2 | It seats in a `DockControl` in Home Assistant's faces seat. BM-12's plate inside the fusion layer draws the seat's glass only and never touches the seat's content or its size |
| The Dialog that enters from its opener (GL-10) | the first minor after 11.1.2 | BM-6 builds the veil and presence on that Dialog and adds no second entrance. D§13's D15 and D§14.1 item 9 recorded a dialog's growth from its button as a form the owner might take; GL-10 now takes it, by atlas's ask. A dialog's open and leave run 3 each (§3, yield 7); GL-10's entrance fits that count or goes to the owner before it is built |
| The floating Card's room corner (IN O-437 (1)) | the first minor after 11.1.2 | BM touches no Card corner. BM-2's plate and BM-6's veil read no `--radius-card` |
| DataTable's sticky head, column-fit report, caption and row header (GL-5 (a), (b), (d)) | the first minor after 11.1.2 | BM touches no table |
| The dock redesign (W-I.8): the width that glides on a transform (O-430 item 3), a tooltip prop on DockControl and DockTrigger and a hover-only option on the provider (item 11 (a), (c)), and item 12, the seat that comes out beside an anchored dock | the dock-redesign minor (IN O-430) | BM-11 builds the fold on the redesign's dock. W-I.8 as written meets the theme seat in that minor with its controls dock: "a round dock of its own at the foot's end corner, on the dock's baseline, which neither parts nor fuses" (R-6), placed by the site in a corner, "One per corner … Glass couples no two docks" (R-12). The `beside` slot, the second plate and the neck are 12.0.0's (R-6; `W-I.8.md:221`). BM reads that corner dock as the minor's answer to item 12: the main dock stays where it is because nothing couples it to the seat. The messages say so. If BL takes item 12 up as a seat adjacent to the dock in that minor, the four messages that name the seat are amended before they are sent (§8) |
| W-I.8 R-6's 12.0.0 fission seat | 12.0.0 | Its `beside` slot is W-I.8's to build. Its neck is replaced by BM-12's goo, which the owner ratified (choice 24 C, O-426); R-6's clip-path crop criterion is superseded by G-6, G-7 and BM-12's neck count (§8) |
| The floating Configurator's card radius (O-428 (3)) and the demo's icon set | 11.1.2 | BM touches neither |
| value.js's G6, O-410's one opening for every popup ("from the trigger, by shape, 200 ms"), and G7, a short phone Select (seven rows or fewer, no search) opening at its trigger, which the owner answered yes | BL's, booked to the old 11.3.0 | BM-6's grow meets O-410 for a menu and a select (from its trigger, on a spring, settling), and its proof reads where the clip stands at 200 ms. If G6 or G7 rides BM's parts minor, its form and BM-6's are settled as one before either builds (§1). The touch slide works on G7's anchored list and on the sheet form alike |
| Home Assistant's LF-16, a drag region on the detented Sheet (grip, chrome or all, with all the default) | BL's, booked to the old 11.3.0 | BM-10 states, before it builds, what each of the prop's three values does on the native scroller, and a value the scroller cannot honour leaves with a MIGRATION row |
| Home Assistant's LF-18, one thumb rung read by the Switch, the Slider and a capsule | BL's, booked to the old 11.3.0 | BM-5's knob reads LF-18's rung for its colour if LF-18 lands first, and writes no rung of its own |
| Home Assistant's collapsible floors as an Accordion of `type="multiple"`, and its one dock in the shell (IN O-432) | answered, the dashboard's own; no glass row | BM changes neither Accordion nor the dock's mount. BM-5 keeps O-432's slider answer (the live value on `update:modelValue`, the service call on `valueCommit`, the fill's colour through `--slider-range-bg`) |

## 8 Rows placed in BM, and rows that are BL's, sent with this tranche

Four rows other placements gave this tranche:

- **GL-15, the Slider's finger target** (IN O-429; S112, the 2026-11-24 atlas section: "The finger-size target comes with the Slider's expanded view (O-426) … in BM's tranche"). BM-5 sets `--slider-touch-target` to 2.75rem on a coarse pointer (BL's triage row G1 (c), `audit/triage-1119/PLACED.md:28`), so the root's box, which is the hit region in every state, is a finger's size. The final fold keeps R-298's thumbless slider as the default (O-408; D§8.3), and BM-5 builds it.
- **FourierField on `@mkbabb/fourier`** (IN O-428 (3): "a cross-repo row for the tranche formation, BM part 3"). BM-13.
- **A discrete Slider form** (IN O-438 (2)): "a slider with a small set of steps shows its stops as dots the value snaps to, on a thicker track, at a length set by its stop count", beside the grow-on-use. BM-14.
- **The Blob's body** (IN O-438 (1)): the calmer motion, the larger satellites and the fuller body, as a design default for BM's parts minor once 11.1.2 has measured the jitter. BM-15.

BL's rows, sent with this tranche:

- **W-B.18.** BM-5's construction replaces R-10 and R-11 (the expanded view's shell and disc) on `fe30f9882`, and lands with BL's slider removals (R-13 and W-B.18's "Deleted" list) in BM's parts minor. R-13 makes `expand` "opt-in in 11.2.0 and the default in 12.0.0"; the owner's ratification (O-426, exception 23) supersedes that, and BM-5 ships it on by default in BM's parts minor. No BL ref names a thumbless attribute (IN O-408: "no token removes the thumb"), so BM-5 builds the thumbless default and the knob prop, with value.js's G1. BM-5's shell takes no pointer, against R-10's challenge finding 3; BM-5 says why (its wave file).
- **W-B.17, in the dock-redesign minor.** The plate's ladder at C's two rungs (BM-2). The toggle's button as a `.plate`, growing from four fifths. One attribute the plate reads, with which a control whose glyph is its on-mark keeps only its hover and focus answers: no on fill from `aria-pressed`, no press tone and no shrink. The attribute also lifts the dock's own paint from such a control: `icon-button.css`'s active paint on `[aria-pressed="true"]` (`R111` `:207`, `v11.1.0` `:198`) and the rest light's selector (`R111` `material.css:350-375`). The toggle is its first reader (BM-1), and fourier's own toggle, which wears `DockControl` with `aria-pressed` and so rests filled in dark today, is a second.
- **The Carousel's reduced press** is the dip, 100 ms out and 100 ms in (D§5.3). It is BL's row with no BM wave, and rides BM's parts minor if BL lands it by BM-R1.
- **11.1.1's exit legs.** BM-6 removes the closed side slide (`R111` `styles/glass/reveal.css:246-257`) and the menu's clip running back into its strip (`:309-311`), by P0a rule 3 ("it fades and does not slide back") and choice 11 B. The sheet form's slide stays (`:258-259`, `:316-318`). BL is asked to confirm against O-434's witnesses, which BM-6's proof re-reads.
- **W-R.1, in 12.0.0.** The dock's zero rung written as `backdrop-filter: none` (G-6), the veil's register, and the luminance clamp's removal with D3.
- **W-I.8.** (a) R-6: the 12.0.0 fission seat's neck is BM-12's goo, and its crop criterion gives way to G-6, G-7 and BM-12's neck count; the `beside` slot stays W-I.8's. (b) Item 12 of the four-site study is placed in the dock-redesign minor (IN O-430), while R-6 and R-12 give the theme seat a corner controls dock there and couple no two docks. BM reads the corner dock as that minor's answer (§7); BL is asked to confirm it or to amend W-I.8, and the messages follow BL's word.
- **`accessibility.css`.** Both arms narrow to `:not(.selection-option)` in BM-4, in the release that ships the mark.

## 9 Critical files

| Wave | Files it changes (glass-ui `src/`) |
|---|---|
| BM-1 | `components/dark-mode-toggle/DarkModeToggle.vue`, `dark-mode-toggle.css`; `composables/dark/useGlobalDark.ts` (the flip inside a view transition, through `composables/motion/core/useViewTransition.ts`); `styles/view-transition.css` (the theme crossfade and its reduced form); `styles/accessibility.css` only if its selection arms ring the toggle |
| BM-2 | `styles/glass/plate.css` (W-B.17's, on `bl/intent/proto` until the dock-redesign minor), `styles/tokens/color-radius.css` (`--fill-hover`, `--fill-selected` and their dark values), `components/dock/styles/controls/icon-button.css` and `styles/glass/material.css` (the on-mark attribute's two exemptions) |
| BM-3 | `scripts/regen-spring-tokens.mjs`, `styles/tokens/scheme-spring.css`, `styles/tokens/motion-registers.css` (the overlay and route registers onto `bloom`), `styles/glass/viz-enter.css`, `components/music-staff/styles.css`, the `--ease-cartoon-punch` readers on a control or an entrance, the settle player beside `composables/motion/` |
| BM-4 | the mark's writer and sheet, `components/tabs/`, `dock/styles/run.css`, `styles/accessibility.css`, `useDockRunMark` (deleted) |
| BM-5 | `components/slider/styles.css`, `Slider.vue`, `types.ts` (the knob prop); `styles/tokens/sizing.css` (`--slider-touch-target` on a coarse pointer) |
| BM-6 | `components/_shared/overlay/`, `components/dialog/`, `components/sheet/` (presence), `styles/glass/reveal.css` |
| BM-7 | `components/scroll-progress-rim/` |
| BM-11 (with BM-8's window) | `components/dock/` (the plate and controls windows) |
| BM-9 | the deleted composables and `cta-seat.css`; `components/fading-scroll/`; scroll-chrome; the `./fourier-math` subpath (`scripts/lib/subpath-policy.mjs:209`, `package.json`) and the maths names in `components/fourier-field/index.ts`; `:draggable` on SegmentedTabs and DockLayerGroup's switcher |
| BM-10 | `components/sheet/detents/` |
| BM-12 | the dock's split module (new, imported only with a seat beside the dock) |
| BM-13 | `components/fourier-field/`, `package.json` |
| BM-14 | `components/slider/` (named at its design) |
| BM-15 | `components/blob/config.ts`, `presets.ts` (the defaults) |

## 10 What is open

- **The owner's word** (OPEN §1): O-2, the toast's vanish. Today's form ships until he answers. O-1 closes on the law (§3), and FINAL tells him.
- **The sites' word** (OPEN §2): each question is in its site's message under `messages/`, with the default that ships until it answers and the candidate that fixes it. Only one holds a step of a wave: BM-3's settle player, and with it BM-4's mark and BM-11's settle, wait on keyframes.js. Reading the sources raised a few more, each with its default: whether atlas's RangeFacet, daraksha's scrubbers and any of keyframes' or fourier's sliders keep knobs (thumbless), whether daraksha's docks have room for the 44 px touch root (they take it), whether color moves its theme into a dock of its own (it stays in its menus), when daraksha moves into glass's seat (at 12.0.0), whether Home Assistant's faces move beside the dock and its rails keep their hand (they stay; the growth is on), whether atlas and Home Assistant set the touch slide on their two menus (it ships off), and whether slides' toggle moves into a dock of its own (it stays).
- **BL's word** (§8): the corner controls dock as the dock-redesign minor's answer to item 12, and the two 11.1.1 exit legs BM-6 removes.
- **daraksha's occasion-mode crash** (OPEN §2; D§10.8). daraksha found it on 2026-11-24 (`b13`, `3eb1f60`): its occasion dress set the dock's plate-border tokens to a `color-mix()`, glass mixes those again inside its own `color-mix()`, and WebKit's page process aborts resolving the nested mix. Its fix draws the ring as one relative colour, and its spec `e2e/veil-webkit.spec.ts` enters and leaves the mode at 390, 430 and 1440 with the page alive throughout. That answers the steps and the page; daraksha's message asks for the WebKit or Safari version. The spec reads the occasion's word from daraksha's private sources, so glass cannot run it; daraksha's message asks it to run the spec on each candidate that reaches it (the dock-redesign minor's, with BM-2's plate, and BM's parts minor's, with BM-5's slider), and until it passes there no glass part is called safe in the occasion mode. §1's one-level rule is the same fault from glass's side.
- **Optional iPhone checks** (OPEN §4): each amends what it names. P4-bud's lane F no longer decides an 11.x ship, since the window ships only in 12.0.0 (BM-8).
- **Not BM's** (OPEN §6): the blur register and the 12.0.0 veil are W-R.1's; the run's caps in 12.0.0 are BL's.

## 11 Escape clause

A wave whose proof fails in a way its DESIGN section did not foresee stops, and the failure goes to the owner with the law and the measure it fails (D§1). G-6 failing stops BM-12, and no dock draws a split without it. A neck that cannot draw on five frames or more at 60 Hz, on an open and on a close, within Safari's limits holds BM-12, and σ, the frame counts and the cost go to the owner before it builds. A site's word that arrives amends its part and never holds a wave, except that BM-3's settle player, and with it BM-4 and BM-11's settle, land when keyframes.js's sampler does. A precept that a wave cannot meet is put to the owner before the wave builds around it.
