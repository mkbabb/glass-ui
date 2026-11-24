# BM — the tranche plan

| field | value |
|---|---|
| seat | formation seat, BM part 3 (`driver/bm-part-3.js`). Writes this file, `waves/`, `FINAL.md`, `FORMATION.md`, `messages/`, and BM-0's edits to `docs/precepts/` |
| model | `claude-opus-5-5`, asserted from own system identity |
| HEAD | glass-ui master `c0fdcdc08` (the seat began at `fff9e958e`; the commits between are BL records); `release/11.1.1` at `b124a311a` (judged, cutting); npm `latest` is 11.1.0 |
| inputs, read in full | `CHARTER.md`, `PROGRESS.md`; `study/DESIGN.md` (pass 10 with the final fold), `study/OPEN.md`, `study/pass-10/fold.md`, `study/choices/RULING-2026-11-23.md` (O-426 and its O-428 addendum); the drafts `study/pass-10/tranche-draft.md`, `precepts.md` and `messages/`; BL's `PLAN.md`, `waves/INDEX.md`, `waves/W-B.17.md`, `waves/W-B.18.md`, `waves/W-I.8.md` (R-6, R-12), `driver/glass-11.1.1-scope.md` (the 11.1.2 scope, every section dated 2026-11-19 to 2026-11-24), `driver/glass-11.1.1-exits-scope.md`, `audit/hassio-r14/PLACED.md`, `design/dock-frames/inbound/value-js-2026-11-24-four-sites.md`; `audit/INBOUND.md` O-420 to O-436 (O-436, placed after the run's inputs were written, gives BM-1 the theme flip and every wave the one-level colour rule below) |
| sites read | atlas `u/s24-dd-atlas` (`ac0b7cc`) and the sci dashboards `u/s24-prod-sci` (`65fc0e81`); value.js `origin/master` (`561137225`); keyframes.js `origin/master` (`a690ede9`) and `kf47`; fourier `origin/master` (`39a335a`); daraksha `b13` (`1c0ecaa`); gaggle `site-redesign` (`e0819ab`) and `tranche-c`; Home Assistant `master` (`f58c650f`); dns-analysis `master` (`7644558`); slides `npig` (`3cec2cb`) |
| fences | no source edit, no build, no browser, no git write. The sites' sources were read with `git show` and `git grep` only |

Short cites: `D§n` is `study/DESIGN.md` section n; `OPEN` is `study/OPEN.md`; `IN O-n` is BL's `audit/INBOUND.md` row; `S112` is BL's `driver/glass-11.1.1-scope.md` (the 11.1.2 scope, under its old name).

## 1 Mode and close

**Mode.** BM builds the design the study settled. The owner ratified it on 2026-11-23 (IN O-426): every choice on the board takes its default, the four exceptions are named in D§1, and the iPhone readings are optional, so one that arrives amends a decision and none holds one back. His order on the toggle (IN O-428) is BM-1. Execution starts when the owner greenlights it. Every seat is Opus 5.5, declared on the seat (CHARTER).

**The close.** BM closes when the 12.0.0 tag is live with provenance and `FINAL.md` lands. A wave whose site has not answered its question ships the default its message names, and FINAL.md records it so. A wave held by its own gate (BM-8 by its reading, BM-12 by G-6 or G-7) is recorded with the gate's reading, never re-booked silently.

**Rules every wave follows.**

- **A wave proves itself by its strip and its page.** Each wave's proof is the strip it captures (light and dark, 390 and 1440) and the page it changes, in headless Chromium and in Playwright WebKit, every run through `guarded` (WebKit runs under `guarded --exclusive webkit`). The seven gates in §4 only keep the invariants from coming back (gates-abrogation). No wave adds a gate that hard-codes a roster or a count a later wave must hand-edit.
- **Engines.** Headless Chromium is not a GPU and Playwright WebKit is not Safari. A claim about production iOS Safari rests on WebKit's source or release notes and is marked as an inference, or on an iPhone reading, which is optional (D§15).
- **Clean breaks.** No alias, shim, dual path or masking fallback. A removed public name gets a MIGRATION row in the same wave and a line in its site's message.
- **Nothing in `src/` carries a wave id, a row id or seat vocabulary in a comment.**
- **A colour token mixes one level deep.** 11.1.2 flattens every token that is a `color-mix()` of other mixed tokens, after a Playwright WebKit page crash on hovering one (IN O-436 (1)). A token a BM wave writes or reads for a fill, a tone or a glyph's colour reads a section colour, the plate's tone or a flat token directly, never a mix of mixes.
- **The precepts lead.** BM-0's amendments are the law each wave builds to. Where a precept and DESIGN disagree, the wave stops and the orchestrator settles it before building.

## 2 Releases, by the release rule

Glass's minors take their numbers in the order they ship (IN O-429), so this tranche names a release by its work. The numbers are fixed when a release cuts, and the sites are told then. A changed default look goes in a minor and a removal in a major (BL's `audit/triage-1119/PLACED.md:28`).

| Release | Whose | What of BM's it carries |
|---|---|---|
| **11.1.1** | BL's exits patch, judged and cutting | Nothing. Its exits are the base BM-6 builds on (IN O-434) |
| **11.1.2** | BL's | Nothing. BM's waves keep its cures (§6) |
| **the first minor after 11.1.2** | atlas's asks (GL-5 (a), (b), (d) and GL-10, the Dialog that enters from its opener) and Home Assistant's AvatarStack (LF-55, with LF-30's first half) | Nothing. BM-6 builds its veil on that Dialog (§7) |
| **the dock-redesign minor** | BL's W-I.8, with W-B.17's plate | BM-1, the toggle's new face; BM-2, the plate's strengths |
| **BM's parts minor** | BM's | BM-3 to BM-8, BM-13, and its candidate BM-R1. Nothing a site calls is removed |
| **12.0.0** | the removals, and the changes a consumer sees in its API or its boxes | BM-9 to BM-12, and its candidate BM-R2 |

**Order.** BM's parts minor ships after the dock-redesign minor: BM-5 lands on BL's slider build, BM-4 replaces the run mark the redesign ships, and BM-2's ladder is the one the redesign's plate reads. The first minor after 11.1.2 may ship before or after the dock-redesign minor. If BM's parts minor were to cut before it, BM-6 builds the veil on today's Dialog and GL-10's entrance lands on top of it.

## 3 The design, and its yields

The design is D§1's eleven laws under the owner's standing law, built as D§3 to D§9 set out. Where the law yields to an order, the order is named in the wave that carries it. There are five (D§1):

1. **The goo** (choice 24 C; `restraint.md` Motion): its filter and its two nodes, and on a dock that mounts it, a close painted on the page's thread while the filter is on. BM-12.
2. **Overshoot** on the spatial morphs the owner ruled, and nowhere else. BM-3.
3. **The menu's grow** (O-171): a clip on the page's thread over `bloom`'s 370 ms. BM-6.
4. **The toggle** (O-428): its colour beside the current seat's ink, and three legs on a tap. BM-1.
5. **A slider with both a knob and a readout** (O-426): three legs on a press. BM-5.

The owner's two open questions (OPEN §1) hold no wave: `--ease-cartoon-punch`'s overshoot on controls (BM-3 corrects its comment and leaves its curve) and the toast's vanish (no wave reaches it).

## 4 Hard gates

Seven, each an invariant of the shipped library read at runtime, not a figure from one fixture. G-2 and G-3 read their named exceptions from the precepts (`motion-canon.md` P5, `restraint.md`'s ceiling), so the precept is the one list and a gate never carries a roster of its own.

| Gate | The invariant | Read by | Holds from |
|---|---|---|---|
| **G-1** | No `--spring-*` token is a `linear()`. Each is a `cubic-bezier()` within 2.65 % of its `SPRING_PRESETS` row's closed form (panel within 3.67 %), and none but panel passes its target | the built token sheet, parsed; each curve evaluated against its row | BM-3 |
| **G-2** | A part's animated properties are `translate`, `scale`, `rotate`, `transform` and `opacity`, except the effects of 200 ms or less and the two orders `motion-canon.md` P5 names (the menu's grow over 370 ms; the dock's fusion layer) | `document.getAnimations()` and the computed transition lists over each part's states, in Chromium and Playwright WebKit | every wave that moves anything |
| **G-3** | No change runs more than two animations on one control, counted by `restraint.md`'s ceiling and its counting rules. The counts over two are the ones the ceiling names | the G-2 run, per state | every wave that moves anything |
| **G-4** | Each site's built entry stays within its bound: Home Assistant's entry within its 0.2 kB margin and every script within 0.8 kB; daraksha's reader route within 126 KB of eager script; gaggle's first load within its 11,282 B margin; atlas: nothing new runs at mount on /sci | each site's own build at the candidate, read once | each candidate that carries a BM wave: the dock-redesign minor's (for BM-1 and BM-2), BM-R1, BM-R2 |
| **G-5** | Under Reduce Motion nothing changes in one frame: every property a state change moves has a running transition or animation of 100 ms or more | the G-2 run with reduced motion emulated | every wave that moves anything |
| **G-6** | The 12.0.0 dock samples nothing: `--dock-surface-blur` is the zero rung, and the dock's computed `backdrop-filter` is `none` | the built dock in both engines | BM-12. The goo ships only if it holds |
| **G-7** | The goo's close adds no frame gap over 16.7 ms: with Busy page on, a close with the filter shows no gap that the same close without it does not | rAF frame gaps over a close in Playwright WebKit under `guarded --exclusive webkit`; an indication, which Safari's Web Inspector on an iPhone amends | BM-12. A failing read stops it and brings σ and the layer's region to the owner |

## 5 Waves

| Wave | What | Release | DESIGN | Starts from | Gates | Sites | Status | File |
|---|---|---|---|---|---|---|---|---|
| BM-0 | The precepts | before every wave | §12 | `study/pass-10/precepts.md` | none (text) | all | complete (applied, uncommitted; the tabs-seam assertion moves to BM-4) | `waves/BM-0.md` |
| BM-1 | The toggle's new face (O-428) | the dock-redesign minor | §9 | `study/pass-10/toggle/sketch/` | G-2, G-3, G-5 | atlas, keyframes, gaggle, slides | planned | `waves/BM-1.md` |
| BM-2 | The plate's strengths (choice 5, C) | the dock-redesign minor | §6.2 | W-B.17's `plate.css` | G-2, G-3, G-5 | every dock site | planned | `waves/BM-2.md` |
| BM-3 | Springs on curves Safari's compositor takes | BM's parts minor | §4.2 | `SPRING_PRESETS`; keyframes.js | G-1, G-2, G-5 | every site | planned; its settle player waits on keyframes.js | `waves/BM-3.md` |
| BM-4 | The one selection mark | BM's parts minor | §8.1 | `pass-6/fold/` | G-2, G-3, G-5 | every site with a segmented strip, a dock run or a Switch | planned | `waves/BM-4.md` |
| BM-5 | The slider while held (choice 23, C), with the finger target (GL-15) | BM's parts minor | §8.3 | `study/pass-10/slider/sketch/` | G-2, G-3, G-5 | every slider site | planned | `waves/BM-5.md` |
| BM-6 | Presentations | BM's parts minor | §5.2, §6.3 to §6.5 | 11.1.1's exits | G-2, G-3, G-5 | every site with an overlay | planned | `waves/BM-6.md` |
| BM-7 | The rim's window | BM's parts minor | §4.3 | `study/pass-2/delivery/sketch/scroll-progress-rim.next.css` | G-2, G-5 | atlas, fourier, gaggle | planned | `waves/BM-7.md` |
| BM-8 | The capsule window in 11.x, conditional | BM's parts minor, or 12.0.0 with BM-11 | §3 | `pass-4/shape/` | G-2, G-5 | every dock site | planned; ships in the minor only on its reading | `waves/BM-8.md` |
| BM-13 | FourierField on `@mkbabb/fourier` | BM's parts minor | — (IN O-428 (3)) | `@mkbabb/fourier` 0.1.0 | G-4 | slides; glass's demo | planned | `waves/BM-13.md` |
| BM-R1 | BM's parts minor's candidate | BM's parts minor | §11 | — | G-4 | every site | planned | `waves/BM-R1.md` |
| BM-9 | The removals | 12.0.0 | §4.3, §7.5, §8.1 | the census at the sites' refs of the day | each removal's census | every site | planned | `waves/BM-9.md` |
| BM-10 | Sheets as native scroll | 12.0.0 | §6.4 | `pass-9/fold/` | G-2, G-5 | atlas, keyframes, gaggle, Home Assistant | planned | `waves/BM-10.md` |
| BM-11 | The fold | 12.0.0 | §7.1 | `pass-7/fuse/`, `pass-8/fold/sketch/fold-cover.next.css` | G-2, G-3, G-5 | every dock site | planned | `waves/BM-11.md` |
| BM-12 | The goo | 12.0.0 | §7.3, §7.4 | `study/pass-10/goo/goo.next.css` | G-6, G-7, G-2, G-3, G-5 | a dock with a seat beside it | planned; gated on G-6 and G-7 | `waves/BM-12.md` |
| BM-R2 | 12.0.0's candidate | 12.0.0 | §11 | — | G-4 | every site | planned | `waves/BM-R2.md` |

**Dependencies.** BM-0 before every wave. BM-1 and BM-2 on W-B.17's plate in the dock-redesign minor. BM-5 on BL's slider build (W-B.18 at `fe30f9882`, with O-408's thumbless default). BM-4 on the dock-redesign's run. BM-3's settle player on keyframes.js's sampler; its single-curve tokens on nothing. BM-11 on BM-8's window (or builds it). BM-12 on BM-11 and on W-I.8's 12.0.0 `beside` slot, and on G-6, which W-R.1 writes. BM-10 on 11.1.2's phone-scroll cure. Each candidate after its release's waves.

**Parallelism.** At most five seats at once across every live run (the machine law). BM-3, BM-4, BM-5 and BM-7 touch disjoint files and may run together; BM-6 shares `_shared/overlay/` with nothing else in the minor; BM-11 and BM-12 run in order on one branch.

## 6 The 11.1.1 and 11.1.2 work BM keeps

Each is settled in BL's scope files. BM builds on it and never undoes it, and the wave named carries a cell that keeps it.

| Cure | Release | Kept by |
|---|---|---|
| Every floating surface leaves on one even curve, `--exit-curve` = `cubic-bezier(0.3, 0.2, 0.7, 0.8)`, on a clock from the motion tokens and shorter than its entrance (the exits scope, row 3), no frame over a fifth, the same exit on every dismissal route, reversal from where it is (IN O-434; `release/11.1.1` `motion-registers.css:148-152`, CHANGELOG 11.1.1) | 11.1.1 | BM-6 |
| The Slider's touch intent: on a coarse pointer `touch-action: pan-y`, no value until 10 px more along the track than across it, a tap sets the value once at its release (LF-57; S112, the 2026-11-24 LF-56/57 section) | 11.1.2 | BM-5 |
| The dock's press-outside and teleport checks read `composedPath()` (LF-56) | 11.1.2 | BM-6 (the touch slide), BM-11, BM-12 |
| The dock's `:has(:empty)` rules become root attributes, `data-summary` and `data-persistent` (IN O-433) | 11.1.2 | BM-11, BM-12 |
| The toggle's fixed name, "Dark mode", with `aria-pressed` (GL-7) | 11.1.2 | BM-1 |
| The pointer light leaves every surface; a state's rest light stays until the dock redesign shows selection by fill steps (S112, "the pointer light leaves cards too") | 11.1.2 | BM-2 is the fill step. BM writes no specular rule |
| The phone-scroll cure, the detented scrim, GL-11, GL-13 | 11.1.2 | BM-10 |
| `useSelectionGroup` scrolls only its own run (GL-18); a run whose seats fit is no scroller (O-430 item 7); a run lets a vertical swipe through (GL-16) | 11.1.2 | BM-4 |
| Every spring easing's last step within 0.1 % (O-430 item 6; O-311) | 11.1.2 | BM-3 replaces the tokens after it; G-1 compares against the closed form, not today's list |
| The dock's words and glyph change on the plate's clock (O-430 item 9, first half); reduced motion trades the dock's faces by a fade in place (item 8) | 11.1.2 | BM-1, BM-11 |

## 7 Parts other tranches own, which BM must not collide with

| Part | Whose, and when | How BM stays clear |
|---|---|---|
| The span-bar and ring part (Home Assistant's LF-23 and LF-24, amended into one part with two forms, shown to the owner before it is built) | BL, the release it rides with (`audit/hassio-r14/PLACED.md`) | BM-7's window lives inside `ScrollProgressRim` and BM-5's fill inside the Slider. Neither publishes a window primitive, a span token or a ring. If the span-bar part wants D§3's capsule window, it takes the geometry from the study, not a BM export |
| The AvatarStack (LF-55, with LF-30's first half) | the first minor after 11.1.2 | It seats in a `DockControl` in Home Assistant's faces seat. BM-12's plate inside the fusion layer draws the seat's glass only and never touches the seat's content or its size |
| The Dialog that enters from its opener (GL-10) | the first minor after 11.1.2 | BM-6 builds the veil and presence on that Dialog and adds no second entrance. D§13's D15 and D§14.1 item 9 recorded a dialog's growth from its button as a form the owner might take; GL-10 now takes it, by atlas's ask. G-3 reads the Dialog's open and leave at the count the ceiling names (3 each); if GL-10's entrance runs more, the count is that release's to name in the ceiling, not BM's to cut |
| DataTable's sticky head, column-fit report, caption and row header (GL-5 (a), (b), (d)) | the first minor after 11.1.2 | BM touches no table |
| The dock redesign (W-I.8): the width that glides on a transform (O-430 item 3), a tooltip prop on DockControl and DockTrigger and a hover-only option on the provider (item 11 (a), (c)), and the seat beside the dock (item 12) | the dock-redesign minor | BM-11 builds the fold on the redesign's dock. Item 12 in that minor is W-I.8's R-12: the theme seat as a round dock of its own beside the main one, anchored, which neither parts nor fuses (D§7.3, "no split ships on frosted chrome"). The goo that joins them is BM-12, in 12.0.0 on the dock that samples nothing (G-6). The four-site placement's note "(BM choice 24, C)" on item 12 is read as that later join |
| W-I.8 R-6's 12.0.0 fission seat | 12.0.0 | Its `beside` slot is W-I.8's to build. Its neck is replaced by BM-12's goo, which the owner ratified (choice 24 C, O-426); R-6's clip-path crop criterion is superseded by G-6 and G-7 (§8) |
| The floating Configurator's card radius (O-428 (3)) and the demo's icon set | 11.1.2 | BM touches neither |

## 8 Rows placed in BM, and rows that are BL's, sent with this tranche

Two rows other placements gave this tranche:

- **GL-15, the Slider's finger target** (IN O-429; S112, the 2026-11-24 atlas section: "The finger-size target comes with the Slider's expanded view (O-426) … in BM's tranche"). BM-5 sets `--slider-touch-target` to 2.75rem on a coarse pointer (BL's triage row G1 (c), `audit/triage-1119/PLACED.md:28`), so the root's box, which is the hit region in every state, is a finger's size. The final fold keeps R-298's thumbless slider as the default (O-408; D§8.3).
- **FourierField on `@mkbabb/fourier`** (IN O-428 (3): "a cross-repo row for the tranche formation, BM part 3"). BM-13.

BL's rows, sent with this tranche:

- **W-B.18, R-10 and R-11.** BM-5's construction replaces the disc rules and the card shell. O-408's build names the thumbless attribute, which BM-5 reads. It lands in BM's parts minor with BL's slider removals.
- **W-B.17, in the dock-redesign minor.** The plate's ladder at C's two rungs (BM-2). The toggle's button as a `.plate`. One attribute the plate reads, with which a control whose glyph is its on-mark keeps only its hover and focus answers: no on fill from `aria-pressed`, no press tone and no shrink. The toggle is its first reader (BM-1), and fourier's own toggle, which wears `DockControl` with `aria-pressed`, is a second.
- **The Carousel's reduced press** is the dip, 100 ms out and 100 ms in (D§5.3), in BM's parts minor.
- **W-R.1, in 12.0.0.** The dock's zero rung written as `backdrop-filter: none` (G-6), the veil's register, and the luminance clamp's removal with D3.
- **W-I.8 R-6.** The 12.0.0 fission seat's neck is BM-12's goo, and its crop criterion gives way to G-6 and G-7. The `beside` slot stays W-I.8's.
- **`accessibility.css`.** Both arms narrow to `:not(.selection-option)` in BM-4, in the release that ships the mark.

## 9 Critical files

| Wave | Files it changes (glass-ui `src/`) |
|---|---|
| BM-1 | `components/dark-mode-toggle/DarkModeToggle.vue`, `dark-mode-toggle.css`; `styles/accessibility.css` only if its selection arms ring the toggle |
| BM-2 | `styles/glass/plate.css` (W-B.17's, on `bl/intent/proto` until the dock-redesign minor), `styles/tokens/color-radius.css` (`--fill-hover`, `--fill-selected` and their dark values) |
| BM-3 | `scripts/regen-spring-tokens.mjs`, `styles/tokens/scheme-spring.css`, the settle player beside `composables/motion/` |
| BM-4 | the mark's writer and sheet, `components/tabs/`, `dock/styles/run.css`, `styles/accessibility.css`, `useDockRunMark` (deleted) |
| BM-5 | `components/slider/styles.css`, `Slider.vue`; `styles/tokens/sizing.css` (`--slider-touch-target` on a coarse pointer) |
| BM-6 | `components/_shared/overlay/`, `components/dialog/`, `components/sheet/` (presence), `styles/glass/reveal.css` |
| BM-7 | `components/scroll-progress-rim/` |
| BM-8, BM-11 | `components/dock/` (the plate and controls windows) |
| BM-9 | the deleted composables and `cta-seat.css`; `components/fading-scroll/`; scroll-chrome; the `./fourier-math` subpath (`scripts/lib/subpath-policy.mjs:209`, `package.json`) and the maths names in `components/fourier-field/index.ts` |
| BM-10 | `components/sheet/detents/` |
| BM-12 | the dock's split module (new, imported only with a seat beside the dock) |
| BM-13 | `components/fourier-field/`, `package.json` |

## 10 What is open

- **The owner's word** (OPEN §1): O-1, `--ease-cartoon-punch`'s overshoot on controls; O-2, the toast's vanish. Today's form ships until he answers.
- **The sites' word** (OPEN §2): each question is in its site's message under `messages/`, with the default that ships until it answers. Only one holds a step of a wave: BM-3's settle player waits on keyframes.js. Reading the sources raised a few more, each with its default: whether atlas's RangeFacet and daraksha's scrubbers keep knobs (thumbless), whether color moves its theme into the seat beside the dock (it stays in its menus), when daraksha moves into glass's seat (at 12.0.0), whether Home Assistant's faces move beside the dock and its rails keep their hand (they stay; the growth is on), whether gaggle's phone menu opts out of the touch slide (on), and whether slides' toggle moves into the seat (it stays).
- **Optional iPhone checks** (OPEN §4): each amends what it names. BM-8 ships in the minor only where its own reading holds.
- **Not BM's** (OPEN §6): the blur register and the 12.0.0 veil are W-R.1's; the run's caps in 12.0.0 are BL's.

## 11 Escape clause

A wave whose proof fails in a way its DESIGN section did not foresee stops, and the failure goes to the owner with the law and the measure it fails (D§1). G-6 failing stops BM-12, and no dock draws a split without it. G-7 failing stops BM-12 and brings σ and the layer's region to the owner. A site's word that arrives amends its part and never holds a wave, except that BM-3's settle player lands when keyframes.js's sampler does. A precept that a wave cannot meet is put to the owner before the wave builds around it.
