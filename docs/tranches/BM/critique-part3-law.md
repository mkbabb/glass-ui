# BM part 3: critique by the owner's law and restraint

| field | value |
|---|---|
| seat | adversarial critic, BM part 3's formation; I did not write it |
| model | `claude-opus-5-5`, asserted from own system identity |
| lens | the owner's law and restraint: nothing changes instantly, no ornament, a gate is an invariant and not a fixture figure, no addition without a site that asked, no precept edit that weakens a law, no message that names "the owner" or carries an internal id |
| read | `FORMATION.md`, `BM.md`, `waves/BM-0.md` to `BM-13.md`, `BM-R1.md`, `BM-R2.md`, all nine `messages/`; the precepts diff `git -C docs/precepts diff origin/main bm/precepts-wip` (`afe49d9`); the laws in `CHARTER.md`, `docs/precepts/{restraint,motion-canon,affordance-map}.md` as amended, and the memories `feedback_liquid_weight_universal`, `feedback_breath_of_life_edict`, `feedback_tween_everything_intent_first`, `feedback_trenchant_design_precepts`, `feedback_slider_grows_on_use`, `feedback_no_backwards_compat`, `feedback_execution_discipline`, `feedback_writing_style`, `feedback_outward_prose_voice`, `feedback_gates_abrogation`, `feedback_no_masking_fallback`, `feedback_consumer_updates_ruling`, `feedback_overfitting_audit`, `feedback_playwright_webkit_not_safari`; to check claims against source: `study/DESIGN.md`, `study/OPEN.md`, `study/UNION.md`, `study/choices/RULING-2026-11-23.md`, `study/pass-10/toggle/sketch/dark-mode-toggle.next.css`, BL's `INBOUND.md` O-426 to O-436, `design/dock-frames/inbound/value-js-2026-11-24-four-sites.md`, and glass `src/` on master and `release/11.1.1` |
| fences | no source edit, no build, no browser. Line numbers in the precepts are `bm/precepts-wip`'s |

Precept cites below: `MC` is `motion-canon.md`, `RS` is `restraint.md`, `AM` is `affordance-map.md`, each at `afe49d9`.

## Verdict

Three objections block. BM-1 drops the one placed row that asks for the theme change as one tween, and its message to atlas endorses a page that flips in one frame. BM-3 keeps a 4.21 % overshoot on every Dialog, Sheet, Popover and Toast entrance, while the amended P7 says no entrance passes its target. BM-12 builds the goo the owner ordered, but the neck is drawn for one to three frames on an open and never on a close, so the order goes unmet and restraint's rule against motion nobody can see is broken in the same wave. Fourteen more are major and fourteen minor. The messages carry no internal id and never name "the owner"; their faults are smaller (items 30 and 31).

## Blocking

### 1. BM-1 drops "the theme change as one tween"

- **Where.** `waves/BM-1.md:27`; `messages/atlas.md:11`.
- **Claim.** The row placed on this face asks for the whole theme change to be one tween. BM-1 narrows it to the glyph starting on the frame `.dark` changes, says "BM builds no page-wide colour tween: the study designs none", and sends a known cut to the owner as a strip instead of curing it.
- **Evidence.** `BL/design/dock-frames/inbound/value-js-2026-11-24-four-sites.md:15`, item 9: "The theme press flips the ground and the plate in one frame … The theme change as one tween rides the toggle's new face (the dock-redesign minor)." `MC:31-34`: "No element changes height, width, position, corner, colour, opacity or presence between two frames." Glass's own toggle defaults to `disableTransitions: false` (`src/components/dark-mode-toggle/DarkModeToggle.vue:19`), so on a site that keeps the default every element re-tints on its own clock, and on atlas (`disableTransitions` true) the page changes in one frame. The atlas note calls that fine: "your page still flips its colours in one step, as you chose".
- **Remedy.** BM-1 designs the flip before it builds. One route that adds no per-element transition: the toggle wraps the class change in a root view transition, so the old and new themes crossfade by `opacity` on the toggle's 200 ms clock on the compositor, which also replaces `setDisableTransitions`. Under Reduce Motion the same crossfade runs (it is an opacity fade, which P6 keeps). The flip strip becomes a proof cell (no frame in which the ground has changed and the plate or words have not, or the reverse), and atlas's note says its page crosses with the glyph.

### 2. Every overlay entrance keeps its overshoot, and P7 says the opposite

- **Where.** `waves/BM-3.md:25`; `BM.md:62` (G-1); `MC:310-312`.
- **Claim.** BM-3 refits `--spring-panel` to `cubic-bezier(0.215, 0, 0.059, 1.288)` and keeps its 4.21 % overshoot. Panel is not only a spatial morph the owner ruled: it is the entrance curve of every Dialog, Sheet, Popover and Toast, the route zoom, the chart bars and the music staff's notes. The amended P7 states "eases only the spatial morphs the owner ruled. Every entrance rides a row that does not pass its target", and no wave makes that true. G-1 ("none but panel passes its target") passes all of this.
- **Evidence.** `src/styles/tokens/motion-registers.css:69` `--enter-overlay-spring: var(--spring-panel)` (the same on `release/11.1.1`), read by `src/styles/glass/reveal.css:49` for "Dialog/Sheet/Popover/Toast"; `motion-registers.css:97` and `src/styles/view-transition.css:171` (route zoom); `src/styles/glass/viz-enter.css:45`; `src/components/music-staff/styles.css:231`, `:288`. `MC:146-148` (P2): "mount, popover open, dialog in … no overshoot". `RS:125-128`: "Overshoot and goo belong to the spatial morphs he ruled: dock fission and fusion, the blob, the card shuffle."
- **Remedy.** BM-3's commit re-points `--enter-overlay-spring` and `--route-zoom-spring` to `present` (or `bloom`), and the chart and staff readers to a row that does not pass its target. G-1 reads consumers rather than a named row: no entrance, control or reading register resolves to a curve that passes its target.

### 3. The goo is seen for one to three frames, and not at all on a close

- **Where.** `waves/BM-12.md:20`; `study/DESIGN.md:268`, `:622`.
- **Claim.** On an open "the neck draws on 3 frames at 60 Hz and 1 at 30"; on the dock row's close "8 → −1.73 px at 30 Hz, so a fold shows no bridge". The wave pays a filter, two nodes, the fold painted on the page's thread and two CPU blurs per repaint for a neck that either flashes or never draws. It puts the shortfall on the owner's list and builds anyway. No gate reads it: G-7 reads frame gaps only.
- **Evidence.** The order (`RULING-2026-11-23.md:21`): "animated that fission and separation in goo with safari compat". `MC:105-107`: "a leg is at least five frames long. A cut given two frames is still a cut." `RS:229-230`: "A motion nobody can see is a cost with no intent: cut it too."
- **Remedy.** Before BM-12 builds, the neck draws for five frames or more at 60 Hz on both the open and the close (for example, the sampled keyframes hold the gap's pass through 0 to 5 px, or σ rises), and that frame count is a proof cell in both engines. If it cannot be met within Safari's limits, the wave is held and the question goes to the owner with σ, the frame counts and the cost, not as a list item behind a shipped build.

## Major

### 4. BM-7 cuts a reveal under Reduce Motion

- **Where.** `waves/BM-7.md:18`, from `study/DESIGN.md:103`.
- **Claim.** "a reveal lands in its end state" is an instant change.
- **Evidence.** The amended P6, `MC:251-253`: "A fill's length, such as a progress line's reveal, is an effect … Under reduced motion it keeps a tween". `study/DESIGN.md:157`: "A quantity's length (Progress, a level, the rim) tweens". `MC:45`: reduced motion "never makes a cut".
- **Remedy.** The rim's reveal keeps a 100 to 150 ms ease-out under Reduce Motion (its window carries `data-allow-motion`, as the toggle's glyph does, since P6 classes a fill's length as an effect). Correct DESIGN's rule-4 row to match.

### 5. BM-5 takes the expanded view away under Reduce Motion

- **Where.** `waves/BM-5.md:27`.
- **Claim.** "Under Reduce Motion nothing grows." The view is an affordance, not an ornament: the owner kept it "for easier UX on mobile and desktop" and on by default. Reduce Motion should shorten its travel, not remove it.
- **Evidence.** `RULING-2026-11-23.md:19`: "every slider has it on by default, on a phone and on a desktop". `feedback_slider_grows_on_use`: "a restraint … sweep exempts the Slider's expanded view." `MC:251` treats a fill's extent as an effect.
- **Remedy.** Under Reduce Motion the grown ground reaches g by an opacity fade (one leg, counted once), so the larger target and the ring at g stay; only a knob's `scale` stays still.

### 6. The toggle's tap runs 250 ms, not one 200 ms clock

- **Where.** `waves/BM-1.md:18`, `:23`; `study/pass-10/toggle/sketch/dark-mode-toggle.next.css:31`, `:45`, `:57`.
- **Claim.** The clock is `--spring-present-duration` (0.2 s, `scheme-spring.css:103` on `release/11.1.1`) and the night's leg carries a 50 ms delay, so a tap's answer ends at 250 ms. Shortening the legs to fit 200 ms puts a page-thread leg under 167 ms, which the 30 fps line bars.
- **Evidence.** `RS:129-130`: "hover and toggle feedback at 200ms or less". `MC:109-110`: "A leg on the page's thread runs 167 ms or more".
- **Remedy.** Drop the 50 ms stagger: the rays and the night start together on one 200 ms leg, which also removes a timing. If the stagger is wanted, it goes to the owner as part of the O-428 yield, with its 250 ms.

### 7. The toggle's hover moves nothing

- **Where.** `waves/BM-1.md:20`, `:23`; sketch `:19` (`--plate-from: 1`).
- **Claim.** The toggle's hover is a fade of a plate that does not grow, over a glyph that does not move. Every other seat's hover runs a fade and a growth (`waves/BM-2.md:19`).
- **Evidence.** `MC:39-41`: "The small marks move too. An icon answers hover and state by growing, morphing or drawing on … a hover plate grows from the control". `MC:64`: "A plate behind a 40 px control grows from four fifths". `feedback_tween_everything_intent_first`: SVGs "that grow, morph and animate in and out smoothly on hover".
- **Remedy.** Drop `--plate-from: 1` so the toggle's plate grows from four fifths like every seat, inside the ceiling's one fade and one movement. A glyph verb on hover (the rays reaching 1 px out) is the other route.

### 8. Speed-carrying legs ship on transitions until keyframes.js lands, against the amended rule 6

- **Where.** `waves/BM-4.md:12`; `waves/BM-11.md:12`; `waves/BM-3.md:6`.
- **Claim.** BM-4's retarget mid-glide and its release, and BM-11's settle, ride rule 1's token "until it lands". The amended rule 6 says such a body turns round on the settle player because "a transition would restart it from still".
- **Evidence.** `MC:93-97`; `MC:35-37` ("keeps the velocity of the gesture that started it"); `BM.md:27`: "Where a precept and DESIGN disagree, the wave stops".
- **Remedy.** Hold the speed-carrying legs (BM-4's retarget and drag release, BM-11's settle) until BM-3's step 2, and say so in each wave's status. If that cannot wait, the interim goes to the owner as a named exception to rule 6.

### 9. The ceiling gains departures with no order behind them

- **Where.** `RS:218-222`; `BM.md:46-52`, `:122`; `waves/BM-6.md:29`.
- **Claim.** The amended ceiling admits counts over two "each by an order or as today", and "a dialog's open and its leave, 3 each, as today" is not an order. `BM.md` §3 names five yields; neither the fold's 3 nor the dialog's 3 is among them. `BM.md:122` and `BM-6.md:29` go further and pre-authorize the next release to raise the ceiling: "if GL-10's entrance runs more, the count is that release's to name in the ceiling, not BM's to cut". This text was drafted in pass 10, after the 2026-11-23 ratification (`RULING-2026-11-23.md:36`).
- **Evidence.** `RS:196`: "Past any line below is too many." `RS:228`: "A seat that adds a piece states what it removes, and the removal outweighs the addition."
- **Remedy.** Strike "as today". Either bring the dialog to two, or name its three in `BM.md` §3 as a yield with the ratification that carries it (Q22, O-426), as the fold's three is named under choice 19 B. Strike the GL-10 sentence in both files: the Dialog that enters from its opener fits three or goes to the owner.

### 10. `--ease-cartoon-punch`: the law already answers, and the tranche keeps the overshoot anyway

- **Where.** `waves/BM-3.md:33`; `study/OPEN.md:13` (O-1); `BM.md:54`.
- **Claim.** A 22 % overshoot eases chips, atoms, the Select trigger and the slider. The study's own words: "P2 and restraint's check … bar overshoot on a control … The law leans toward removing it." Asking the owner again re-opens a settled law, and the violation ships until he answers.
- **Evidence.** Readers: `src/styles/glass/glass-chip.css:30`, `glass-atom.css:50-51`, `src/components/slider/styles.css:317`, `src/components/select/SelectTrigger.vue:72`. `RS:23`: "The latest ruling wins." `RS:24-27`: where the motion canon "still prescribe[s] … a bouncy enter …, this file wins". `RS:127-128`: "Check: no overshoot on a control".
- **Remedy.** BM-3 moves the control readers onto a row that does not pass its target, and the token keeps only non-control readers (or leaves in 12.0.0). FINAL tells the owner what was done; O-1 closes on the law.

### 11. The touch slide ships on for a site that refused it

- **Where.** `waves/BM-6.md:21`, `:49`; `messages/gaggle.md:18`, `:37`.
- **Claim.** Two sites asked for the slide and gaggle said no, yet it ships on for every short menu at every site, and gaggle's note asks the question it already answered.
- **Evidence.** `study/UNION.md:105`: "Sliding across a short menu's rows has two askers: atlas's phone section menu … and HA's floor menu …; gaggle's phone menu and value.js's long menus are against it".
- **Remedy.** The slide is a prop on the menu's content, off by default, which atlas's `DockSectionSelect` and Home Assistant's floor menu set (their notes name it). gaggle's note says its menu stays as it is, without a question. Bytes fall for every site that does not set it.

### 12. BM-4 ports a drag no site uses and a mark onto a switcher no site shows

- **Where.** `waves/BM-4.md:19`, `:16`, `:59`.
- **Claim.** The drag is built "only where the host opts in (`:draggable`; no site sets it today)". DockLayerGroup's switcher gets the new mark, but every site that mounts the group hides it, and the site table lists "daraksha's DockLayerGroup" as a host.
- **Evidence.** daraksha `origin/master` `src/shell/SiteDock.vue:244` and value.js `demo/shell/dock/Dock.vue:305` both set `:show-switcher="false"`. `study/DESIGN.md` §8.1: "no site shows it, so the overfitting rule decides whether the switcher stays". `feedback_overfitting_audit`; `feedback_execution_discipline` rule 1; `RS:228`.
- **Remedy.** BM-4 ports neither. The drag, `:draggable` and the switcher leave in 12.0.0 under BM-9 with MIGRATION rows unless a site asks before BM-4 lands. Correct BM-4's site table.

### 13. BM-13's minor ships shims

- **Where.** `waves/BM-13.md:21`.
- **Claim.** `./fourier-math` and the barrel's maths names "stay until 12.0.0, each a call into the package with glass's signature". That is a wrapper kept for importers BM-9's census says do not exist.
- **Evidence.** `BM.md:24`: "No alias, shim, dual path or masking fallback." `feedback_no_backwards_compat`; `feedback_consumer_updates_ruling`. `waves/BM-9.md:35`: no site imports `fourier-math` on 2026-11-24.
- **Remedy.** Move BM-13 to 12.0.0 with BM-9's removal, so the swap and the cut are one change with no wrapper. If the field must move in the minor, leave the public names as glass's own code, untouched, and remove them in 12.0.0.

### 14. No hard gate reads the tween law outside Reduce Motion

- **Where.** `BM.md:58-68`.
- **Claim.** G-2 and G-3 cap what moves; G-5 checks that nothing changes in one frame only "with reduced motion emulated". The owner's first law has no gate in the default mode.
- **Evidence.** `MC:50-52`: "A gate for any wave that touches motion: sample the frames of each state change it ships, in and out; no two consecutive frames may differ by more than the eased step allows". `feedback_tween_everything_intent_first`: "Gate every motion wave by sampled frames, in and out."
- **Remedy.** G-5 reads both modes: every property a state change moves has a running transition or animation, and its sampled frames meet P0a's two-fifths and five-frame check.

### 15. G-1 and G-4 are fixture figures and rosters

- **Where.** `BM.md:58`, `:62`, `:65`.
- **Claim.** `BM.md` says each gate is "an invariant of the shipped library read at runtime, not a figure from one fixture". G-1 carries the study's fit tolerances (2.65 %, 3.67 %) and a roster ("none but panel"); G-4 carries four sites and four numbers, read on the sites' builds, not the library.
- **Evidence.** `feedback_gates_abrogation`: "never author a new gate that hardcodes a roster/count a future wave must hand-edit".
- **Remedy.** G-1: no `--spring-*` is a `linear()`; each leaves rest at zero slope; a row passes its target only if its `SPRING_PRESETS` damping is below one, and by no more than its closed form's overshoot; plus item 2's consumer check. G-4 leaves the gate list: each site's own budget check, run at the candidate, goes into FINAL's table as a reading.

### 16. G-2 and G-3 parse their exceptions from precept prose

- **Where.** `BM.md:58`.
- **Claim.** "G-2 and G-3 read their named exceptions from the precepts." A gate that reads a markdown paragraph is the prose-grep class the abrogation ruling names, and it breaks the day someone re-words the precept.
- **Evidence.** `feedback_gates_abrogation`: gates that "assert frozen snapshots … (rosters, exact counts, prose greps)".
- **Remedy.** Each exception marks itself in the source (the menu's content and the fusion layer carry one attribute the gate reads), and the precept names that attribute. The gate then holds no list and reads no prose.

### 17. G-7 holds a wave on Playwright WebKit frame timing it calls an indication

- **Where.** `BM.md:68`; `waves/BM-12.md:11`, `:43`.
- **Claim.** G-7 stops BM-12 on rAF frame gaps in Playwright WebKit with Busy page on, and the plan itself calls the reading "an indication". Headless WebKit has no GPU, and this engine build has given results opposite to Safari's in this repo. The owner's ruling says a device reading never holds a decision back, so the gate stands in for a reading it cannot be.
- **Evidence.** `feedback_playwright_webkit_not_safari`: "engine build vs shipping app give OPPOSITE results". `RULING-2026-11-23.md:15`.
- **Remedy.** G-7 becomes structural: the filter attribute is present only from a close's first frame through the folded rest and is cleared at the 6 px gap; the layer mounts only with a seat; nothing under it animates a layout property. The frame-gap figure becomes a recorded reading, amended by Safari's Web Inspector when one arrives.

## Minor

### 18. P6's new line sets a ceiling with no floor

`MC:251-253` ("a tween of 150 ms or less") and `study/DESIGN.md:155`, `:157` allow a 20 ms tween, which `MC:105-107` calls a cut. Write "100 to 150 ms on the compositor; 167 to 200 ms on the page's thread".

### 19. The 30 fps line disclaims a bound and cites a ruling that predates it

`MC:112-113`: "it sets no bound on the share of a leg's travel drawn in one 30 Hz frame", cited as "ratified 2026-11-23". The sentence comes from pass 10 (`study/pass-10/precepts.md:44`), after the ratification. Strike the disclaimer; cite pass 10 and the final fold for the line.

### 20. P0a's "How long" table is not reconciled with the 30 fps line

`MC:75` gives a hover fill or tint 100 to 200 ms; `MC:109-110` bars a page-thread leg under 167 ms. A colour tint at 120 ms passes one and fails the other. Note in the table that a page-thread leg runs 167 to 200 ms.

### 21. P3 contradicts the menu's grow

`MC:157`: "Every entrance pairs opacity with scale or translate". The menu's grow keeps opacity at 1 and moves a clip (`waves/BM-6.md:18`). Name the grow in P3 as the order that stands past it, as P5 does.

### 22. P5 attributes the page-thread clip to O-171

`MC:228-230` cites O-171 ("every height and width animated, no needless fade"), which names no thread and no clip. The 370 ms clip on the page's thread is choice 10's default, ratified under O-426. Cite each for what it gave.

### 23. P5's toast carve-out cites no licence

`MC:239-241` exempts the toast's 317 ms blur "until he rules", while `src/styles/glass/dissolve.css:4` records the owner's ask ("THE OWNER'S ASK, VERBATIM (WAVES:662)"). Either list the vanish with the two orders that stand past P5, with its ask and its length, or put it to him with restraint's "Transform and opacity only" (`RS:145-146`) as the line it crosses.

### 24. P6's toggle sentence contradicts itself

`MC:263-268`: the glyph crossfades and its colour tweens under reduced motion, then "and PRM still overrides even that". Rewrite so the sentence says what runs under Reduce Motion and nothing else.

### 25. BM-4's ink trade runs on the glide's clock

`waves/BM-4.md:18`: the two words trade ink as the mark glides, 225 to 383 ms. A colour runs on the page's thread, and `MC:191-192` admits only an effect of 200 ms or less. State the trade's clock at 167 to 200 ms.

### 26. BM-4's glide passes its rest on a control

`waves/BM-4.md:18`: "passing its rest by 0.30 % at most", about 0.9 px on a 300 px hop. `MC:69`: "overshoot: none on a control"; `RS:127-128`. Sample from a row that does not pass its target, or clamp the last keyframe, or name it as a yield.

### 27. First gestures that degrade without a sign

The touch slide "loads on a menu's first touch" (`waves/BM-6.md:21`) and daraksha's settle player "loads on the first touch" (`waves/BM-3.md:29`), so the first slide or the first fling can run without them. `feedback_no_masking_fallback`: the primary paints or fails loud. Load each on the trigger's first pointer or focus, and add a proof cell for the first gesture.

### 28. BM-12's shadow swap has no proof cell

`waves/BM-12.md:19`: on an open the filter clears at the 6 px gap, and its drop-shadow gives way to each plate's own shadow on a moving frame. Add a pixel-delta cell for that frame, so the swap is shown not to step.

### 29. BM-8's minor ship waits on an optional reading

`BM.md:18` ("BM-8 by its reading"); `waves/BM-8.md:12`. The ruling says a reading "never holds one back". Ship the window with BM-11 in 12.0.0, where the dock samples nothing and the risk it guards against does not exist; one path, not two.

### 30. The messages carry three internal terms, one offered cut and no dates

- "the veil's" (`messages/dns-analysis.md:12`, `home-assistant.md:16`, `slides.md:17`) and "frosted chrome" (`daraksha.md:19`) are the study's words. Say "the dimmed layer behind the dialog" and "a dock that blurs what's behind it".
- `home-assistant.md:34` offers "a half-pixel step on a still frame", an instant change, as an option. Leave it out, or offer only forms that tween.
- `feedback_outward_prose_voice` rule 2 asks for "by when". No question gives one. Each can say by when its default locks (for example, before the candidate of the release it reaches).

### 31. Two notes say the slider's box never changes and leave out the 44 px touch root

`messages/keyframes.md:16` ("the root's box never moves") and the daraksha note say nothing of `--slider-touch-target` at 2.75rem on a coarse pointer (`waves/BM-5.md:25`). daraksha's two scrubbers sit inside docks (`src/name/NameDock.vue:116`, `src/portraits/PortraitsDock.vue:79`), where a taller root can change the dock's height on a phone. Tell both, and ask daraksha whether its docks have the room.

## What passes the lens

- The messages: none names "the owner", none carries a wave, row or gate id, each signs "Thanks, / Mike", and `rg -P -i -f docs/tranches/BL/driver/register-lint.pattern` finds nothing in them.
- The restraint amendment on keyed actions (`RS:129-134`) brings the check into line with P0: a keyed action now moves, and only a keyed choice fades.
- The P5 rewrite (`MC:186-198`) narrows what may move and names the 27.3 floor for `linear()`.
- BM-6 keeps 11.1.1's exits (O-434), BM-5 keeps 11.1.2's touch intent and the two value events (LF-57, O-432), BM-11 and BM-12 keep the root attributes (O-433), BM-2 writes no specular rule and leaves the rest light to the redesign (the pointer-light section), BM-7 and BM-5 publish nothing the span-bar and ring part needs (O-431, O-435), and the release names follow O-429. Each was folded as the binding inputs say.
- BM-2's plate carries its tone at one `opacity`, so no colour transitions and no token mixes past one level.
