# BM design

The one design document of the BM study. Each pass writes its own section and links its pages; a pass that overturns an earlier section amends it in place with a line saying so; pass 10 rewrites the whole. Row ids (L1, F9, G7 …), checks (§2's 1 to 9) and questions (Q1 to Q21) are `UNION.md`'s. Site answers are `INBOUND.md`'s; iPhone readings are `READINGS.md`'s.

---

## Pass 1 (2026-11-22, claude-opus-5-5): the law, its reach, the census and the first readings

**No iPhone reading has returned** (`READINGS.md`: none published, none returned). Every decision here that rests on the blur, the shape of a backdrop or the frame rate is provisional until pass 9. The census (§3.1) and the byte ledger (§3.2) are readings of source and need no phone.

Working files: `pass-1/census/` (the census script and its output), `pass-1/ledger/` (the byte measurement, the per-site ledger), `pass-1/check/` (the page checks and the curve numbers). Reading pages: `pages/R1.html` to `pages/R7.html` (§3.6).

### §1 The law

UNION §2's nine checks, restated as what a person sees and how each is measured, with two of the owner's standing laws added as 10 and 11 (amended in pass 2, fold A12). Every part BM touches is held to all eleven. A part that fails a law goes to the owner with the law and the measurement it fails; a part the owner ordered is never cut by a study law (amended in pass 2, fold A4, replacing "A part that cannot pass is cut, not excepted"). Law 5's easing clause binds every spring part alike, the switch included; pass 2's §4 is its cure.

| # | Law | What a person sees | Measured by | Read on the iPhone by |
|---|---|---|---|---|
| 1 | One backdrop per container, one blur value | Glass never frosts glass. A tab's highlight, a dialog's inner panel and a held slider are tints on their plate. Every glass surface carries the same frost; a thicker rung is a firmer tint, not more blur | `backdrop-filter` count per container, siblings included: 1 (a sibling painted before a glass plate is sampled by it as an ancestor would be; amended in pass 2, fold B-2). No blurred element under a blurred ancestor. One blur radius in the token set; today there are five, 10 to 22 px (`src/styles/tokens/glass.css:67-71`). *Amended in pass 4 (fold B3-1):* pass 3's 12 px is struck. The value is not BM's: the owner's O-260 sets the 12.0.0 register (floating and overlay 0, so the dock, menus, sheets and dialogs sample no backdrop; content 4, 6 and 8 px; saturate 1), and W-R.1's question 4 writes it. That its content rungs are three values against `restraint.md:60-62`'s one is W-R.1's to put to the owner (§3.9) | R3b (rebuilt in pass 4); R3 withdrawn as the blur reading (§5.7) |
| 2 | One mark per selection group | The choice is one shape that travels between options and rests on the one let go over | One inert, `aria-hidden` node per group, moved by `translate`, with a width correction only as Q15 allows (amended in pass 2, fold A7). The selection itself is `aria-selected` or `aria-current`, with a sign that survives forced colours (A4) | R2 (how it travels) |
| 3 | Commit at the decision | A tap selects at once. A drag selects what the finger lifts over. Sliding past an option never fires it | The model changes on the tap or on `pointerup`, before the settle plays. No commit for a slot passed. A costly load fires once per commit ([IN value.js 1]) | — (logic) |
| 4 | Two per press, two per node | A press answers with at most two motions, and no node does more than two things at once | Animations started per press ≤ 2; properties per node per change ≤ 2 (`restraint.md:184-206`, the ceiling table), counted per part | — (count) |
| 5 | Accelerated properties | Motion keeps gliding while the page is busy | Animated properties within `translate`, `scale`, `opacity` (and `backdrop-filter` only if the owner amends `restraint.md:143`, Q19), on an easing Safari 27.2 hands to its compositor (`linear()` only from 27.3, I22). Amended in pass 2: §4.3 sets how. A transition rides the row's single `cubic-bezier()` token, a settle with speed rides keyframes sampled from the row, and no custom property is written per frame. That measure is provisional until R2 and P2-scroll return (pass 9; amended in pass 3, fold B-9) | R2, P2-scroll |
| 6 | Nothing refracts | No lens bends the page behind it | No `backdrop-filter: url()`, no page snapshot. WebKit drops a reference filter at compositing (`RenderLayerBacking.cpp:L1051-1054`, [IOS §2.2]) | — (source) |
| 7 | P0a's amounts and clocks | Every change starts and stops. Under Reduce Motion it is a short fade, never a cut | P0a's tables (`motion-canon.md:55-100`), in milliseconds (amended in pass 2, fold B-10): no leg lands more than two fifths of its travel in 16.7 ms, and none is shorter than 83 ms; the reduced-motion branch is a fade of 200 ms or less (11.1.1's rule, [GI §4.2]; Home Assistant asks 120 to 150 ms, [IN HA 4]). Its 30 fps reading: in Low Power Mode WebKit halves page rendering to 30 fps (I20), so any leg that runs on the page's thread and lasts under 167 ms shows fewer than five frames there. Every P0a row under 167 ms falls there (the press, the out row, the hover's low end, the exits, HA's fade: `pass-2/delivery/curves.json`, `frames`), which is why §4 puts short legs on the compositor | R2, with Low Power Mode on |
| 8 | A split starts under its source | A piece of glass that splits off is born from the piece it leaves | On frame 0 of a fission, the new plate's box lies inside its source's (F3; 284 24:33) | R4; P7-fuse (added in pass 7, §9.2) |
| 9 | Additions are paid for | No site's first load gets heavier | The ledger (§3.2) in gzipped bytes per site; the removal outweighs the addition (`restraint.md:210`) | — (bytes) |
| 10 | One focal ink per view | The selection is the one thing in its view that carries the ink | One ink-carrying sign per selection state in a view: the mark, or the selected label, or the press plate (L20), never two at full strength (`docs/precepts/README.md:78`; UNION T9, G10). Added in pass 2, fold A12 | — (count) |
| 11 | Intent first | Every control that a mark or a bud serves answers the pointer before the press | A hover answer on every pressable host of the mark or the bud, within P0a's hover row (`restraint.md:166-167`; `affordance-map.md`, Intent first). Added in pass 2, fold A12 | — (count) |

**One breach the union did not list.** SegmentedTabs: "Under reduced motion the indicator snaps and the colour fade stays" (`src/components/tabs/styles/segmented.css:32`). That is a cut under law 7, the same fault as scroll-chrome's reduced-motion snap (M8). It goes with T1: under reduced motion the mark crossfades from seat to seat (A1).

### §2 Reach: every part and every site under the law

#### 2.1 The parts

"Takes the mark" means the part's selection becomes the one mark of law 2 (L1). "Own fill" means each item carries its own state fill and nothing travels between items (D3, T7).

| Part | Under the law | What it loses | Laws it breaks today | Rows |
|---|---|---|---|---|
| SegmentedTabs | Takes the mark | The indicator's `width` and `height` legs, pending Q15 (amended in pass 2, fold A7); the capsule's own blur inside the track's blur, by a rule scoped to the indicator in its track (`glass-capsule.css:57`, `:79-81`; fold B-2); the reduced-motion snap (`segmented.css:32`) | 1, 4, 5, 7 | T1, T2, L1 |
| DockLayerGroup's switcher | Takes the mark. *Amended in pass 7 (fold B6-9):* no site shows the switcher (value.js `Dock.vue:305` and daraksha `SiteDock.vue:244` set `:show-switcher="false"`; fourier and keyframes no longer mount it), so it is weighed under the overfitting rule before its mark or drag is built | Its own indicator path (`DockLayerGroup.vue:131-154`, the second wiring of `useDragMorph`) | — (its drag follows the finger by script, as any follow must; its settle becomes the mark's) | T3 |
| GlassDock's run mark | Takes the mark; a run that scrolls is Q5 (pass 6). *Amended in pass 6 (§8.1):* a run that fits takes the drag where the host opts in; a run that scrolls keeps its native scroll and its mark only glides (provisional until P6-hosts; amended in pass 7, fold B6-12) | `useDockRunMark`'s five per-frame length writes (`useDockRunMark.ts:171-179`) | 4, 5 | T4 |
| GlassDock's active seat | Its capsule stands down where the run's mark marks it (`run.css:599-603` already does this for a marked run) | The active DockControl's own `.glass-capsule` backdrop, a second blur beside the plate's (`dock/styles/controls/icon-button.css:216-236`, against `dock.css:76`'s "ONE backdrop-filter in the dock"). Added in pass 2, fold B-2 | 1 | F5 |
| Switch thumb | Takes the mark's settle only: the thumb glides between its two seats on the dock spring. No lift and no drag; the drag is S2, on the owner's list (amended in pass 2, fold A5). *Amended in pass 6 (§8.3):* its press squish (`.tap-squish`) goes for the face's press tone, and under reduced motion the thumb dips instead of cutting (provisional until P6-hosts; the dip survives the library's reduced-motion fallback only by enrolment, §4.3; amended in pass 7, folds B6-12, A6-14) | Nothing: it already moves by `translate` alone (`switch/styles.css:46-55`) | 5 (its spring is a `linear()`, I22; cured by §4.3 rule 1, the single-curve token); 7 (under Reduce Motion the library's fallback sets every transition to 0 s, `a11y-overrides.css:46-53`, so the thumb cuts; cured by §4.3's reduced-motion column. Amended in pass 3, fold A1) | S1 |
| Slider thumb | Keeps today's glide; takes no lift and no lens (amended in pass 2, fold A5, with [IN value.js 1] and [IN HA 1]: a lens over a slider reads as a second thumb) | The loupe (§3.3), the grasp carriers and the focus veil mount (both pending W-R.1, §3.9), `useDragVelocity`'s per-frame customs, the synthetic `pointermove`; the halo is pass 6's. *Amended in pass 6 (§8.2):* BL's Slider wave (W-B.18, on `bl/slider/proto`, release unset; amended in pass 7, fold B6-8) already disposes of this row: the loupe, the veil, the carriers and the velocity bridge stop mounting (R-13), the press deform goes (R-5; G1(a), 11.1.2), and the halo's two shadows become the ring's edge (R-8). BM credits it and adds §8.2's reading | 1 (the veil is a second live blur), 5 (per-frame customs) | S1, S3, S5, S6, S7, L12 |
| Thumbless slider | No mark: a state of the one slider *Amended in pass 6 (§8.2, §8.5):* the quantity form of the one engine: the fill is occupied length from the origin, its end the slider's one sign. BL makes it the default in 11.3.0 (O-408, triage G1); ~~four of six slider sites already set it by token~~ three of six hide the thumb by token, and daraksha's knob, in its own tone on purpose, goes under the default (amended in pass 7, folds A6-9, B6-7; provisional until P6-hosts) | Nothing | — | S4 |
| PagerDots' worm | Open: the one mark or occupied length (Q21, pass 6). ~~*Amended in pass 6 (§8.5):* a choice, so the one mark; its stretch is Q8's answer (a plain glide under A, the window's two handles under B), played by rule 2~~ *Amended in pass 7 (folds A6-5, B6-6):* out of Q8's coupling. The dots' goo is the owner's order (O-95) and question (O-295), with BL's Q-CR-3, CR-04 and CR-05 open; they go to him beside BL's HomeView study (§3.9) | Nothing until he rules; `trailOffset` stays with the carousel (§8.8) | 5 (per-frame writes, a custom property among them); P7 (a third off-spine integrator) | S9 |
| ToggleGroup | Own fill *Confirmed in pass 6 (§8.6):* T7 holds, "a ROW, not a strip" (`SegmentedTabs.vue:20-27`). Single toggle groups are mounted (fourier 3, gaggle's F3 prototype 1, `pass-6/census/hosts.json`; *amended in pass 7, folds B6-1, B6-2:* and Home Assistant's day modes, `phases.ts:98`, mounted by render function, `pass-7/fold/hosts.json`); their on-fills trade in place by P0a rule 4, as menu rows do. Home Assistant asked the lens for its day modes ([IN HA 1]); the mark is SegmentedTabs', so that segment takes the mark by becoming a strip or keeps its fill (§8.6) | Nothing | — | T7 |
| Menu rows (DropdownMenu, ContextMenu, Select, Combobox, Command items) | Own `data-highlighted` fill; two rows trade it in place (P0a rule 4) *Amended in pass 6 (§8.4):* BL's W-B.17 already gives the rows the plate and removes the lift (`W-B.17.md:516`); a finger sliding across rows highlights none today (reka's highlight is mouse-only), which is pass 8's (Q11) | The −1 px row lift (`affordance-map.md:171`) | affordance-map's one hover, one motion (`:92`) | D3 |
| DropdownMenu and Select content | Buds from its trigger's box (F9). *Amended in pass 4 (§6.4), provisional until P4-bud:* enters at its own size by opacity and a 0.96 scale from its trigger, unless the owner takes the windowed or the clipped bud. *Amended in pass 5 (folds A4-1, B4-1):* that reversed the owner's O-171. Pending the owner on P4-bud; until he rules, today's grow from the trigger ships (`reveal.css:267-292`) | The `clip-path` strip (`reveal.css:267-292`) | 5 (`clip-path`) | F9, D1, M3 |
| ContextMenu content | Opens at the press point; it has no control box to bud from. Pass 8 | — | — | D12 |
| Popover | Buds when a control opens it (Q9, pass 8). *Amended in pass 4 (§6.4):* its shape channel is the menu's. *Amended in pass 5 (folds B4-1, B4-8):* provisional, pending the owner on P4-bud | — | — | D14 |
| HoverCard and Tooltip | No bud: a hover opens them, and atlas bars any fusion between a hover card and a dock ([IN atlas 2]) | Nothing | — | D13 |
| Dialog | Buds from the button that opens it (F9); its delivery is Q6's. *Amended in pass 4 (§6.4):* its shape channel is the menu's. *Amended in pass 5 (folds B4-1, B4-8):* provisional, pending the owner on P4-bud | `useSpringMount`'s per-frame Vue writes, if Q6 replaces them. The focus veil it mounts on every open (`DialogContent.vue:195`, `ModalOverlay.vue:87`) is its own question, Q22 (pass 8), weighed against HA's one live blur and its "these modals should be more glassy" (added in pass 2, fold A1) | 1 (a blurred plate over a full-viewport blur), 5 | D15, S6 |
| CommandDialog | Its inner plate becomes a tint | The nested blur (`material.css:50-62`) | 1 | D15, F5 |
| Sheet | Detents as a native snap scroller (Q12, pass 8) | The `block-size` detent leg | 5 | D16 |
| GlassDock fold | After 11.2.0, on Q6's delivery and Q1's shape. *Amended in pass 4 (§6.3):* the shape is the capsule window. *Amended in pass 5 (folds A4-3, B4-7, B4-8):* provisional, if P4-bud's F holds; the window is wi8's own plate, a sibling of the seats, and the seats' motion through the fold is pass 7's to count. *Amended in pass 7 (§9.4):* counted. The controls' element is a second window during the change, the glass's edge cuts each seat and no seat fades, and the first seat trades with the folded glyph on a 100 ms leg; the row and the fade go to the owner on P7-fuse | wi8's private rAF integrator and its content window `w` | 5 (`inset`, `border-radius`, `clip-path` per frame) | F7 |
| The theme seat | Fission on F3, the bridge on Q2; one live fuse at a time. *Amended in pass 7 (§9.2, §9.3, §9.6):* born underneath (F3) in 11.x and by default; the goo goes to the owner for 12.0.0's frostless dock as his order, with its price; one split or join in flight per document; provisional until P7-fuse | daraksha's own neck, at daraksha | — | F8 |
| `useLiquidReveal`, `useDockCtaReceive` | Folded into the bud, or deleted in 12.0.0. *Amended in pass 7 (§9.5):* deleted in 12.0.0; the fold into the bud is declined | Both (no mount; §3.1), and `cta-seat.css`, which every dock site's sheet imports | — | F10 |
| Blob | Unchanged: identity | Nothing | — | F11 |
| Glass plates (the ladder) | One blur value (12 px); rungs differ in ink only; the chrome band mixes its rung with the card colour, the content band does not (§5.2). Amended in pass 3, which replaces "rungs differ in tint". *Amended in pass 4 (folds A1, B3-1, B3-2), provisional until R3b:* BL's D3 floor and the owner's O-260 decide the ladder. From 12.0.0 chrome is `--card` at the bound with no blur, and content sits at the bound plus steps with 4 to 8 px. BM proposes no material code and credits none of the removals in the next cell (§5.0) | The specular catch-light; the grasp register; four of the five radii, the deep tier and the rim's inset legs (§5.2, §5.4) | 1 (five blur radii, and the level scales the blur) | G1, G4, G5, L7, L8 |
| Backdrop luminance clamp | Goes whole in 12.0.0 if the owner takes a chrome mix on R3b (§5.3). Amended in pass 3, which replaces "the whole clamp waits on Q10". *Amended in pass 4 (fold A7):* the deletion is D3's floor's, carried by W-0.1 and W-H.1, and credited there | The whole clamp: composable, sampler, the clamp in the plate, GlassDock's mount | the no-workaround law (the walk); legibility (its two ink steps cannot carry a word over the far end of either mode, §5.1) | G7 |
| FadingScroll | Kept; no edge mask over a scroller that holds glass | Nothing | — | M7 |
| scroll-chrome | Kept; the dock's scroll fold is built on it | The reduced-motion snap | 7 | M8, T8 |
| ScrollProgressRim | Kept, by the owner's order; delivery is pass 2's | Nothing yet | 5 (`clip-path` transition) | M9 |
| The overlay substrate | reka or native `popover` (Q11, pass 8) | The presence keyframe, if it moves | — | M2, D11 |
| Everything else (accordion, avatar, badge, button, card, carousel, checkbox, chip, collapsible, data table, input, radio group, table, textarea, toast) | Own state signs; no mark, no bud. Laws 1 and 7 still reach them through the material and the motion canon; a button's press is the plate's (L20, Q3 only where a mark also answers) | Whatever the material loses (the catch-light, the grasp) | per part; pass 10 runs them under access | — |

**Law 2's forced-colours sign, by host.** Amended in pass 2 (fold B-4): a global rule already draws it. `src/styles/accessibility.css:31-43`, imported by `src/styles/index.css`, sets `border: 2px solid Highlight !important` under `forced-colors: active` on `[aria-current]`, `[aria-selected="true"]` and `[aria-pressed="true"]`, which SegmentedTabs (`SegmentedTabs.vue:262`, `:265`) and the dock's seats (`aria-current`) carry. Switch, Slider and ToggleGroup also carry their own rules. Whether the border paints visibly on the strip and the run is unread; pass 5 verifies it under emulation (owed: browser runs are refused today) and designs no second sign, which would be two marks for one state. *Amended in pass 5 (§7.6):* the sign is kept and no second one is added, but it becomes an `outline` at −2 px offset. As a `border` on a tab with `border: none` (`segmented.css`, `.segmented-tab`) it adds 4 px to the chosen tab's max-content width, and the pill strip's `1fr` columns grow with it whenever the widest tab is chosen. The emulation read is still owed (`pass-5/mark/forced-colors.mjs`, refused). *Amended in pass 6 (folds A5-10, B5-2):* the outline is withdrawn, since `outline` is every focus ring's channel and focus lands on the chosen option. The sign is drawn on the mark itself (a 2 px Highlight border under forced colours), so it travels with the mark and moves no option's box; the global rule's selector gains `:not(.selection-option)` and leaves every other host as it is (§7.6). Owed: `pass-6/fold/forced-colors.mjs`.

**Per press (law 4), where the source shows the count** (added in pass 2, fold A3). Counted from source; every other host is counted where its pass designs it (the mark in pass 5, the hosts in pass 6, the bud in pass 8).

| Part | Properties one node changes in one change | Animations one press starts | Over the ceiling |
|---|---|---|---|
| SegmentedTabs indicator | 3: `translate`, `width`, `height` in one transition list (`segmented.css:164-170`) | the indicator's three legs, and the colour of the label leaving and of the label arriving (`segmented.css:211`): 5 | yes, both |
| GlassDock run mark | 4, written each frame: `inset`, `width`, `height`, `border-radius` (`useDockRunMark.ts:171-179`) | the mark's glide; the seats' own legs are counted in pass 5. *Amended in pass 6 (fold A5-7):* counted in §7.3's dock rows | yes, per node |
| GlassDock fold (wi8) | 3, written each frame: the plate's `inset` and `border-radius`, each region's `clip-path` (UNION F7) | — (not a press) | yes, per node |
| Slider press (master) | the thumb's `translate`; the grasp carriers, the loupe and the veil each mount and animate | at least 4 | yes |

#### 2.2 The sites

Each cell quotes or cites the site's answer ([IN site n]) and the census file that carries it (§3.1). "Mark" is the one selection mark; "fusion" is any split, fuse or bud.

| Site | Mark: yes | Mark: no | Fusion: yes | Fusion: no | Bounds that bind |
|---|---|---|---|---|---|
| atlas | The rail's sections; short segments such as the Filters sheet's One year / All years / Compare ([IN atlas 1]); SegmentedTabs in `VizOptionsBand.vue`, `YearScrubber.vue`, and the dashboards' four filters | Figure docks, among them `PlateDial.vue` ("one dial of a plate's figure dock", `:2`), which keeps its glide and takes no drag (moved here in pass 2, fold B-5); anything a drag already means on a chart (trend scrubbing, map pan, the scatter); long result lists, which must never settle on the nearest | The dials' popovers, More, the phone section menu, the dock folding to its disc ([IN atlas 2]) | The plate's controls joining the head row; never between two figures; never between a hover card and a dock | No box moves on hover, open or fold; no new mount cost (a +19 % blocking-time regression was just cleared) ([IN atlas 5]) |
| gaggle | The report dock's six sections and the Chart/Table segment (`dashboard/src/report/page/PageDock.vue`) ([IN gaggle 1]) | The day table (rows are tap targets under a floating dock); the phone menu below 768 | Find growing out of its seat ([IN gaggle 2]) | A fused lamp must not read as a button: the lamp is a readout | 11,282 B first-load margin; no GPU words in chunks gaggle may fetch; three rows above the dock at 390 ([IN gaggle 5]) |
| value.js, daraksha, fourier, keyframes | Colour's channel tabs, Mix's mode tabs (`MixSourceSelector.vue`), the reader's Page / Verses / Focus, fourier's Controls / Canvas pair (`EditorControlsDock.vue`), a site dock's seats on a phone ([IN value.js 1]) | Any track a finger drags (channel sliders, fourier's timeline, Name's and Portraits' scrubs); the reader's text; long menus | The theme seat's split and fuse, "goo … must work in Safari" (the first customer); a trigger into its menu; the dock's fold, "faster, less fade"; colour's picker card from its seat ([IN value.js 2]) | Page cards; the occasion mode's frames | daraksha: about 6 KB of 480 KB free, 125 KB per route (the reader at 126). Load on intent, not eagerly. Reduced transparency turns glass opaque; reduced motion is a short fade ([IN value.js 5]) |
| Home Assistant | The worded dock tabs (`frontend/src/tiles/GlassTabs.ts`); the Day / Night / Sleeptime / Naptime segment, which settles without firing because each pick asks to confirm ([IN HA 1]) | The light sliders; the lock slide | The faces seat and the dock; a tile into its detail sheet; the floor menu from its trigger ([IN HA 2]) | More than one live lens or fuse at a time (each is a blur layer in WKWebView) | Entry 71.6 of 71.8 kB gz; every script 438.2 of 439 kB; WKWebView, so no 120 Hz path; the lens degrades to today's fill with no jank ([IN HA 5]) |

### §3 The census, the ledger, and the first decisions

#### 3.1 Census of the candidate deletions

**Method.** `pass-1/census/census.mjs` runs `git grep` over each site's current ref and parses every import from `@mkbabb/glass-ui`. It reads git objects only and checks nothing out. Refs: atlas `u/build-atlas-rc@62405c0` (`src/`); atlas's dashboards in sci-report `u/v19-sci@df25605f` (`dashboards/`); value.js `c45@243d0b364`; daraksha `b11-occasion@406de8f`; fourier `f45@22dc445` (`web/`); keyframes `kf45@13f9825a`; gaggle `site-redesign@8d7fe5d` (`dashboard/`); Home Assistant `master@cbed400d` (`frontend/`). Docs, `dist` and `.d.ts` are excluded; tests are counted apart. I read every hit on a removal. Comments, and value.js's copies of glass-ui's built CSS under `bench/paired/sheets/`, are not counted as consumers. Output: `pass-1/census/census.json`.

| Candidate | Sites that consume it | Where |
|---|---|---|
| Slider `loupe` | **none** | 18 source files across seven checkouts import `Slider`; none of them contains the word `loupe`. Colour's Extract loupe is value.js's own canvas (`useLoupeCanvas`, `demo/workbenches/extract/ImageEyedropper/ImageEyedropper.vue:115`, `:218`) |
| Focus veil | **every site that opens a centred Dialog** (amended in pass 2, fold A1 and B-1; the first reading said "none") | The Slider mounts it only with `loupe`, but `DialogContent.vue:195` mounts `<ModalOverlay veil …>` on every open and `ModalOverlay.vue:87` paints `.glass-focus-veil`. Seven of the eight checkouts import `/dialog`. Home Assistant sizes it because its dialogs show it (`frontend/src/styles/scale.css:10-12`: the Dialog's 13rem core and 7rem bloom at 16 px) |
| Grasp carriers | none mount their own; every `Slider` and every dock carries them | Home Assistant suppresses the slider's (`frontend/src/styles/tokens.css:77-83`) |
| Specular catch-light | atlas uses the class | `src/platform/chrome/dock/components/DockCrest.vue:62`. gaggle zeroes it (`dashboard/src/report/styles/page.css:528-530`); Home Assistant zeroes it (`tokens.css:58`, `tiles/css/rooms.css:65-66`) and imports its file (`core/sheet.css:28`) |
| Luminance clamp | every dock site (8), through `GlassDock` | value.js and keyframes hand the dock a canvas (`demo/shell/dock/Dock.vue:301`; `demo/app/dock/ChromeDock.vue:461`), so they run the canvas path; the other six run the static walk |
| `useLiquidReveal`, `useDockCtaReceive` | none | — |
| `useDragVelocity`, `useSpringMount` | none directly | Every `Slider` uses `useDragVelocity`; Dialog and Sheet use `useSpringMount` |
| `useSelectionIndicator`, `useDragMorph`, the presence keyframe `glass-reveal-hold` | none | `useDragMorph` appears in one keyframes test only |
| scroll-chrome's reduced-motion snap | Home Assistant, by its stylesheet | `frontend/src/core/sheet.css:41` imports `scroll-chrome.css`. No site mounts glass-ui's `useScrollChrome`; atlas has its own of that name (`src/platform/chrome/dock/composables/useScrollChrome.js`) |
| The menu's `clip-path` strip, the −1 px row lift | every site that opens a glass-ui menu or select | internal; no site names them |
| `--glass-level` set by a site (for Q14, pass 3) | value.js; fourier through glass's escape | value.js `demo/styles/foundation.css:1034-1039` (more contrast: 0.1) and `:1081-1083` (reduced transparency: 0, which never fires in Safari, [IOS §2.1]); fourier's `.glass-opaque` (`web/src/components/visualization/VisualizationView.vue:579-590`) |
| CommandDialog's inner plate | atlas, daraksha, fourier | `DockSearchPalette.vue`, `src/scripture/Contents.vue`, `web/src/components/paper/search/PaperSearchModal.vue`. The cure is internal |
| `.glass-capsule` | every site, through glass-ui's own parts (amended in pass 2, fold B-2); Home Assistant also names it | Composed by every glass Button (`Button.vue:122`), every Chip (`chipVariants.ts:4`), the active DockControl (`DockControl.vue:97`) and SegmentedTabs (`SegmentedTabs.vue:229`); Home Assistant's slide thumb (`frontend/src/tiles/slide.ts:191`). It is not a removal: T2's cure is a rule scoped to the indicator in its track |
| SegmentedTabs (T1) | atlas 3, dashboards 4, value.js 2, fourier 2, keyframes 2 | ~~`:draggable` once: value.js `demo/palettes/PalettesPane.vue:156`~~ no site sets SegmentedTabs' `:draggable`; that line is `PaletteInspector`'s prop (amended in pass 7, fold B6-9). daraksha, gaggle and Home Assistant mount none |
| DockLayerGroup (T3) | value.js, daraksha, fourier, keyframes. *Amended in pass 7 (fold B6-9):* at pass 6's refs value.js and daraksha mount it with `:show-switcher="false"`, and fourier and keyframes no longer mount it (comments only) | `demo/shell/dock/Dock.vue`, `src/shell/SiteDock.vue`, `EditorControlsDock.vue`, `demo/app/dock/ChromeDock.vue` |
| FadingScroll (M7's guard) | value.js 11, keyframes 14, fourier 5, atlas 1 | A same-file search for glass inside a FadingScroll finds one candidate: keyframes `demo/scenes/spring/SpringPhysicsFacet.vue:97-215` holds a ToggleGroup whose blur its own comment discusses (`:173`). value.js `demo/shell/PaneShell.vue:47-55` puts the Card around the scroller, not inside it. Whether that ToggleGroup loses its frost under the mask, and what value.js's panes slot into `PaneShell`'s scroller, is pass 2's |

#### 3.2 The ledger, both sides (Q17)

**Amended in pass 2 (folds A2, A11, B-1, B-2, B-3).** Four rows below are not BM's to credit, and the additions were under-priced:

- The specular catch-light (980 B) is deleted by BL's W-R.1 (`W-R.1.md:37`), in the same 12.0.0. It is credited to W-R.1, not to BM.
- The grasp register (383 B) and the focus veil (469 B) are W-R.1's to rule on (`W-B.18.md:117`), and the veil is mounted by every centred Dialog (§3.1). Both are struck from BM's removals until W-R.1 rules and Q22 is answered.
- The capsule's own blur (85 B) was the whole `.glass-capsule` rule, which every glass Button, Chip and active seat composes. T2's cure is a scoped rule that removes nothing.
- Unpriced additions, now entered as estimates: the release-velocity estimator that replaces `useDragVelocity` (kf `Draggable`'s; not yet measured, pass 6 prices it with the slider; *amended in pass 6 (§8.8):* it is keyframes.js's and ships in kf, which every site that drags through glass-ui already loads, so glass-ui adds no bytes for it; the per-route figure is pass 10's); the ground the canvas path needs once the stack walk goes (value.js and keyframes; pass 3; *amended in pass 3:* none, if the whole clamp goes, §5.3); the reduced-motion crossfade of the mark (pass 5; a CSS rule, under 100 B). No second forced-colours sign is added (§2.1).
- The sentence that found "room for pass 2's delivery inside … Home Assistant's 0.2 kB" is withdrawn. Pass 2's ledger (§4.7) is split by release and carries the delivery's price.
- The figures are cut from 11.1.0 and master. BM's removals land on top of 11.2.0, which changes `run.css`, `useDockRunMark.ts`, `useGlassBackdropLuminance.ts` and `glass-specular-track.css` (`git diff --stat master bl/dock/wi8`). Re-measuring against the shipped 11.2.0 and closing per entry (daraksha's routes, HA's entry) is pass 10's, with built bundles.

**Removals, measured** (`pass-1/ledger/measure.mjs`, output `ledger.json`). CSS is cut from the 11.1.0 dist the sites load (Home Assistant's installed copy of the published package); JS is each module bundled alone from master with rolldown, minified, every import outside it external. Each figure is a standalone `gzip -9`, so it is an upper bound on the saving inside a site's larger bundle.

| Removal | gz bytes | Reaches |
|---|---|---|
| Specular catch-light (`glass-specular-track.css` and the material rules) | 980 | every site's stylesheet |
| Grasp register (`grasp.css`) | 383 | every site |
| Focus veil (`focus-veil.css`) | 469 | every site |
| Slider loupe rules | 815 | every site |
| The capsule's own blur inside its track | 85 | every site |
| Luminance clamp, the stack walk alone (`backdropLuminanceSample.ts:203-279`, cut out and measured by `measure-walk.mjs`) | 442 | every dock site. The walk also gives the canvas path its underlay (`resolveUnderlayRgb`), so refusing it leaves value.js's and keyframes' canvas path needing its ground from elsewhere: pass 3. *Amended in pass 3:* the whole clamp goes if the owner takes a chrome mix (§5.3), and the canvas path with it, so no ground is needed |
| Luminance clamp, whole (composable, sampler, math; the sampler module alone is 1,008) | 2,860 | every dock site, if Q10's test holds |
| `useDockRunMark` (replaced by the mark) | 1,349 | every dock site |
| `useDragVelocity` (replaced by kf's estimator, I9) | 809 | every slider site |
| The menu's `clip-path` strip (replaced by the bud) | 346 | every menu site |
| `useLiquidReveal`, `useDockCtaReceive` | 278, 1,181 | none: nothing mounts them, so a bundler drops them. They cut source and API only. *Amended in pass 7 (§9.5):* the dock's sheet imports `cta-seat.css` at every dock site (`dock/styles/index.css:80`), ≤ 278 B, which goes with them |
| The loupe's script inside `Slider.vue` | not measured. *Amended in pass 6 (§8.2, measured on bm/study `83d2331c1`):* `Slider.vue` without the loupe, the veil mount, the grasp carriers and the velocity bridge is 2,863 B against 4,388 (−1,525); its sheet without the loupe rules, the weight-train and the spectrum halo, 1,211 against 1,987 (−776). Every one of these removals is BL's W-B.18 (R-5, R-8, R-13); the figures are BM's reading of them | every slider site |

**Additions, estimated.** The one mark's writer: about 600 B, by its analogue `useSelectionIndicator` (534 B measured), replacing that writer and the run mark's. *Amended in pass 4 (§6.6): the bud adds at most 190 B (lane E) or 268 B (lane D), measured from the sketches.* The bud: about 450 B, by its analogues `useLiquidReveal` (278 B) and the strip it replaces (346 B). The delivery (Q6) is pass 2's and is priced in §4.7 (amended in pass 2). Any Q20 part the owner keeps is priced when he keeps it.

**Per site** (`pass-1/ledger/ledger-sites.mjs`, output `ledger-sites.json`):

| Site | Removed (upper bound) | Added (estimate) | Net | Further if the whole clamp goes |
|---|---|---|---|---|
| atlas (library and dashboards) | 5,332 | 704 | −4,628 | −2,418 |
| value.js | 5,332 | 704 | −4,628 | −2,418 (it runs the canvas path) |
| daraksha | 5,332 | 704 | −4,628 | −2,418 |
| fourier | 5,332 | 704 | −4,628 | −2,418 |
| keyframes | 5,332 | 704 | −4,628 | −2,418 (canvas path) |
| gaggle | 4,523 | 704 | −3,819 | −2,418 |
| Home Assistant | 5,332 | 704 | −4,628 | −2,418 |

Every site comes out lighter by about 3.8 to 4.6 KB gz before the delivery is priced. The mark's estimate is charged in full even where it also replaces a site's `useSelectionIndicator`, so the additions lean high. The figures are per site, not yet per route or entry; pass 10 closes them against built bundles.

*Amended in pass 2:* with the specular, grasp, veil and capsule rows struck (above), the per-site net is about −2.0 KB for a dock and slider site and about −1.2 KB for gaggle (Critic A's recount, A11), before pass 2's delivery, which §4.7 prices.

*Amended in pass 7 (fold B6-10):* the Slider loupe rules (815) and `useDragVelocity` (809) are BL's W-B.18 removals (§8.8) and are struck from BM's per-site net too, as pass 2 struck the specular, grasp and veil. That takes about 1.6 KB more off BM's credit at every slider site. BM's net per site is pass 10's, from built bundles.

#### 3.3 Q18, the slider loupe: a conflict with BL, not a BM decision

*Amended in pass 2 (folds A1, A2).* The census stands: no site mounts `loupe` (§3.1). But the focus veil does not go with it, since every centred Dialog mounts the veil (§3.1, Q22), and BL has already ruled on the loupe twice, differently: W-R.1 keeps it, "hung from its track by CSS anchor positioning" (`W-R.1.md:81`), and W-B.18's R-13 has the Slider mount no loupe, veil or grasp carriers from 11.1.1 (`W-B.18.md:114-117`, `:155`). Pass 1's "delete it in 12.0.0" is withdrawn as a BM decision. It goes to the orchestrator and the owner as a conflict between BL's two lines and the census, with BM's reading: no consumer, so by the overfitting rule (`docs/precepts/README.md:10-12`) it goes in 12.0.0 unless the owner keeps it. The owner's "slow and unintuitive; redesign multitouch-first" concerns value.js's own Extract canvas, which this does not touch. *Amended in pass 6 (§8.2):* the census holds at the current refs (`pass-6/census/hosts.json`: value.js's five hits are its own `useLoupeCanvas`, keyframes' one a comment). BM's reading stands, with the prototype's bytes. BL's own Slider wave stops mounting the loupe (W-B.18 R-13, on `bl/slider/proto`; release unset, since `release/11.1.1`'s Slider still mounts it; amended in pass 7, fold B6-8), so the conflict is now between W-R.1:81 and W-B.18 R-13, both BL's; it is the orchestrator's and the owner's, and BM sides with R-13.

#### 3.4 Q4, first decision: where the mark lives, and what a release commits

*Provisional until Home Assistant answers its question (§3.7) and pass 6 closes the hosts.* *Amended in pass 6:* closed per host in §8.6, provisional until P6-hosts and Home Assistant's answer.

- **The mark lives on a short row of peers chosen by tap or slide:** SegmentedTabs strips, a dock's run of seats, DockLayerGroup's switcher, the switch. By site: atlas's rail sections and short filter segments; gaggle's report dock and Chart/Table segment; value.js's channel and mode tabs, the reader's Page / Verses / Focus, fourier's Controls / Canvas, a site dock's seats on a phone; Home Assistant's worded dock tabs and its day-mode segment.
- **It never lives** on a track a finger already drags (every slider), on a chart surface where a drag means scrub or pan, on long lists or long menus, on table rows, or on reading text. Menu rows keep their own fill (D3) and move no mark.
- **The follow is per host, opt in** (added in pass 2, fold B-5). A host takes the mark's glide by default and its drag only when it opts in, as SegmentedTabs' `:draggable` does today. A strip inside a figure dock or on a chart plate never opts in (atlas's `PlateDial.vue`).
- **Sliding across an open short menu's rows is a yes** for atlas's phone section menu and Home Assistant's floor menu, with law 3's commit, pending HA's answer (§3.7). It moves no mark: each row keeps its own fill, and two rows trade it in place (D3). (Restored in pass 2, fold A6 and B-6: pass 1 had moved it onto the owner's list, against the fold's R-O9.) The 160 ms hold that opens a menu under the finger, and its auto-scroll, stay on the owner's list (§3.5).
- **The commit** follows law 3. A tap commits at once. A drag commits the item under the release point. A slot passed never commits, and a costly load (colour's and fourier's data, [IN value.js 1]) fires once, on the commit. Cancel (`pointercancel`) returns the mark to the selection and commits nothing (L16).
- **A pick that asks to confirm** (Home Assistant's day modes; amended in pass 2, fold A13). The mark settles on the pick and the confirmation opens. The model and `aria-selected` change on confirm. On cancel the mark returns to the selection along L16's path. Until then the pick is the mark's motion only, and the one ink-carrying sign (law 10) stays on the selection. *Restated in pass 7 (fold B6-2):* the selection follows its source of truth. Home Assistant's day modes draw their plate from the engine's report, never from the tap or the confirm (`phases.ts:12-13`, `:27`), so there the sign moves when the house reports the phase, and "on confirm" is withdrawn. The segment is a single ToggleGroup (§8.6).

#### 3.5 Q20, the owner's list: additions no site asked for

Each removes nothing and has fewer than two sites (amended in pass 2, fold A6: sliding across an open short menu's rows has two sites and is no longer on this list; §3.4). The owner decides each. The proposed default is **no**; a part he keeps is opt-in, limited as stated, and priced in the ledger when kept.

| Part | What a person would get | Who asked | Proposed default |
|---|---|---|---|
| D2's hold, to open a menu under the finger | A 160 ms hold on a menu button opens it under the finger, and the lift picks a row (rida's menu@13146) | none for the hold | No. If kept: short menus only |
| D4, auto-scroll while holding near a menu's edge | 120 to 800 pt/s within 42 pt of the edge (pcc@10404) | none | No |
| D8, open on the current row | The current section's row shows its fill when the menu opens (menu@32997) | none | No |
| D12, hold progress on a long press | A colour leg while a long press runs, not a lift (a lift moves a box on open) | none | No |
| S2, drag a switch across its slots | The thumb follows the finger and settles on a side; a tap still toggles | none | No |

#### 3.6 The reading pages (for the owner's iPhone)

Each page is one self-contained file under `study/pages/`, written to the page contract, for the orchestrator to publish privately. The first line of each says what to look at and what to send back.

| Page | Shows | Send back | Decides |
|---|---|---|---|
| `R1.html`, Glass Corner Ghosts | Four frosted plates over stripes: A rounded by `border-radius`; B square, cut by `clip-path: inset(… round …)`; C square, cut by `clip-path: shape()`; D rounded and stretched by a non-uniform `scale`. A Fold button folds each to a disc; Slow ×4 and a Half-fold hold keep the mid-fold on screen (pass 2, fold B-14). B's and C's clips are read back from the computed style and each cell says "clip applied" or "clip refused" (fold B-8) | The letters where a square or darker patch shows outside the round edge, or “none” | Q1 (pass 4): whether a clip shapes the backdrop in WebKit, the O-132 ghost ([IOS §4.7]) |
| `R2.html`, Four Ways to Settle | One flicked settle on the dock spring, four ways: A script writes `transform` each frame (today's JS springs); B WAAPI with the spring as `linear()` (today's CSS springs); C 16 keyframes sampled from the spring with `linear` between; D one fitted `cubic-bezier()` carrying the release velocity (within 1.1 % of the spring, `pass-1/check/curve-numbers.json`; across the table's rows the single-curve family fits within 1 to 2.7 %, `pass-2/delivery/curves.json`, fold B-13). A “Busy page” switch holds the page's thread three quarters of the time. It reads the Safari the phone runs, one version per phone, and reads gliding against stalling, not a frame rate (Q7(a) stays owed, §4.8). *Amended in pass 3 (folds B-2, B-10, A2):* the dots move by `translate`; C is the settle player as sketched (bend-placed keyframes on the row's own clock); all four share the row's clock; Go also works mid-glide, where A and C turn with their speed and B and D restart from still, so the owner sees a retarget on a busy page | The letters that stutter while busy, then again with Low Power Mode on (fold B-10); the iPhone model and the iOS version from Settings (fold B-11); a screen recording if he can | Q6, Q7 (pass 2): which curve forms the installed Safari animates off the page's thread |
| `R3.html`, Glass Material Fits | Rebuilt in pass 2 (folds A8, A9, A15, B-7). Three bar-sized plates over the owner's photograph, each with one blur value in both modes: A glass-ui today (16 px, saturate 1.5, warm ink 0.14); B the Maps sheet's amounts on the warm ink (7 px, the archive's "our 7px sits right in the measured iOS band", `IOS27-ARCHIVE.md:248`; saturate 1.6 for its +62 %, `:20`; a near-clear 3 % ink, labelled against the owner's "Too glassy … too transparent", `restraint.md:63-65`); C Apple's menu glass as fit in the iOS 27 simulator by rida.dev (12 px, saturate 1.2, a 53.5 % white wash), labelled a change of ink that needs `restraint.md:28-30` and `:148` amended. Left out, with the reason on the page: rida's tab-bar fit (a white wash like C), the thick panel (a two-part blur, and an overlay, not a bar) and the ladder's rungs (a second question). No in-page theme switch: Safari's bar follows the phone's appearance | The letter closest to Safari's own bar, once in Light and once with the phone switched to Dark | Q10 (pass 3), for bar-class plates only. Legibility over white, black, grey and the colour field, and the edge (Q13), move to a second page owed to pass 3 (R3b, made in pass 3: §5.7); overlays are calibrated against Safari's own menu in passes 3 and 8. *Amended in pass 4 (folds B3-1, B3-7):* withdrawn as the reading for the blur and held unpublished. O-260 sets the blur, and each lane changes blur, saturate and veil together, so a pick names a tint family only |
| `R4.html`, Glass Split and Join | A bar and a round seat parting and fusing three ways: A two plates meeting edge to edge with their facing corners squaring; B one plate clipped to two lobes and a thinning neck (`shape()`, or `path()` where `shape()` is absent), its clip read back and reported as applied or refused (fold B-8); C the seat born under the bar's end and sliding out, no neck, carrying no frost or tint while it is under the bar and taking its glass by a tween once clear, so two translucent plates never overlap (fold B-9) | A, B or C | Q2 (pass 7) |
| `R5.html`, Menu Opening Springs | One menu budding from a 44 px seat, at the seats' one blur (fold A10): A `present` (98 % in 205 ms, no overshoot); B `bloom` (315 ms, 0.15 %); C `panel` (202 ms, a 4.2 % overshoot); D Apple's menu spring as fit in the iOS 27 simulator by rida.dev (188 ms, 2.6 %) (fold B-12, from `pass-1/check/curve-numbers.json`). C and D are labelled: overshoot on a menu needs `restraint.md:125-128` and P2 amended (fold A9). The seat hands its glass to the menu at frame 0 and takes it back by an `opacity` tween of its one pseudo-element once the menu has gone, so no plate frosts another and no blur value changes (amended in pass 3, fold A7); the page says its per-frame size writes are a stand-in until Q1, so the reading is of shape and timing. *Amended in pass 4:* Q1 refuses size writes (§6.4); R5's stand-in stays, labelled, since R5 reads timing | The letter that opens most like Safari's own menu | Q9 (pass 8) |
| `R6.html`, Touch Event Rate | A drag pad counting, per best second: pointer moves, coalesced finger positions, passive touch moves, page frames | The four numbers, then four more with Low Power Mode on (fold B-10, which settles UNION discrepancy 1); the iPhone model and the iOS version from Settings (fold B-11) | Q7, I10, I11 (pass 2) |
| `R7.html`, How Glass Arrives | A card entering A at full glass by `opacity` and `scale`, B by its `backdrop-filter` rising from blur 0 with the tint on its own layer and the word after; same 0.2 s present spring in, 0.12 s out | A or B | Q19, for the owner's ruling on `restraint.md:143` |

Every page prints the Safari version it ran on. From Safari 26 the user agent carries a frozen OS token, so the iOS version is asked for, not read (amended in pass 2, fold B-11). Every page's buttons answer on a 160 ms transition at the body weight, and a toggle keeps its word and shows its state by its fill (fold A14). R3's photograph is the owner's own `fourier-analysis/assets/animals/giraffe.webp`, scaled to 760 px and inlined as a JPEG. The page check in headless Chromium at 390 and 1440 px (`pass-1/check/page-check.mjs`) is recorded in §3.8.

#### 3.7 Questions for the sites

- **value.js (Q18).** The census reads colour's Extract loupe as value.js's own canvas (`useLoupeCanvas`, `ImageEyedropper.vue:115`, `:218`), not glass-ui's `Slider` `loupe`, and finds no site mounting `loupe`. Confirm both, and that nothing planned will mount it before 12.0.0 removes it.
- **Home Assistant (Q4).** "Fine if the lens never commits on release over a row the finger only passed": suppose a finger presses the floor menu's button, slides down across Upstairs and lifts on Garage. The rule above commits Garage and never Upstairs. Is Upstairs the row you mean? Or do you mean a row under the finger when it lifts after sliding past the end of the list, which you would want to commit nothing?
- **Home Assistant.** Your `tokens.css:77-83` suppresses the slider's grasp carrier and `scale.css:10-12` sizes the focus veil; `tokens.css:58` and `rooms.css:65-66` zero the specular. All three go in 12.0.0. Does anything you show depend on any of them?
- **atlas.** `DockCrest.vue:62` uses `glass-specular-track`, the retired hover glint, which goes in 12.0.0. Does the crest need anything in its place, or does it rest plain?
- **gaggle.** `page.css:528-530` zeroes the specular, which goes in 12.0.0; your override can go with it. Is the report dock's Chart/Table segment glass-ui's SegmentedTabs or your own? The census finds no `/tabs` import.
- **Every site (Q15).** If every segment in a SegmentedTabs strip took the same width (Apple's default), would any strip of yours move a box your suites check, or grow wider? By the census: atlas `PlateDial.vue`, `VizOptionsBand.vue`, `YearScrubber.vue` and the dashboards' four filters; value.js `AdminNamesPanel.vue`, `MixSourceSelector.vue`, `PalettesPane.vue`; fourier `EquationModeToggle.vue`, `GalleryView.vue`; keyframes `EasingCatalogue.vue`, `useSelectedControlSurface.ts`.
- **Home Assistant (Q15, Q5; amended in pass 2, fold B-15).** Your worded tabs (`GlassTabs.ts`) are a GlassDock run that scrolls, not a SegmentedTabs strip. If every seat in that run took the same width, would a tab's label be cut, or the run scroll where it does not today?
- **Every site (Q20).** The owner's list (§3.5): if any of the five parts would serve a page of yours, say which page; otherwise nothing is needed.

#### 3.8 What pass 1 did not do

- **The page check is owed.** `guarded` refused the headless Chromium check of R1 to R7 twice on the kernel zone: `data.kalloc.1024` at 13.42M at 16:52 and 13.46M at 17:02 (`pass-1/check/retry.log`). The count only climbs until a reboot, and the owner's machine law says to stop heavy work at that refusal and ask him to reboot, so I stopped retrying after the second attempt. Without the browser, each page passed a static check of the contract (title and viewport tag in the first 8 KB, no wrapper tags, no dialogs, nothing loaded from outside, every colour a token) and `node --check` on its script (`pass-1/check/scripts/`). The check at 390 and 1440 px, light and dark, with every control pressed once, is `pass-1/check/page-check.mjs`; it runs as written once the Mac has rebooted, before or with the orchestrator's publish.
- **No prototype needed glass-ui's source or build**, so the `bm/study` worktree was not made. The pages carry their own CSS, with glass-ui's token values copied in.
- Q15's answer, the delivery (Q6), the material (Q10), the shape (Q1) and the neck (Q2) are later passes', on the readings above.

#### 3.9 Collisions with BL (added in pass 2, fold A2)

BL's 12.0.0 wave, W-R.1, already disposes of parts BM touches. BM credits none of its removals and overturns none of its lines; each collision is listed for the pass that meets it and for the orchestrator.

| W-R.1 line | BM's position | Settled by |
|---|---|---|
| Deletes the specular gleam (`W-R.1.md:37`) | The same removal; credited to W-R.1 | — |
| Owns the grasp and veil registers (`W-B.18.md:117`) | BM's Q22 (the veil under every Dialog) feeds W-R.1's ruling | W-R.1, with pass 8 |
| Keeps the loupe, anchored (`:81`) | No consumer (§3.1); BM would delete it (§3.3) | the orchestrator and the owner |
| "A commit is an instant state change" under reduced motion (`:84`) | Law 7: reduced motion is a fade, never a cut | passes 5 and 10, with BL |
| One release rule for the velocity owners, "the tabs drag" among them (`:82`) | Law 3 and I9: the release velocity seeds the settle, which carries the commit's mark | pass 5, with BL |
| The dock's plate, BL's dock line rather than W-R.1: `--glass-level-dock`, 1 in light and 0.7 in dark, which also scales the dark dock's blur to about 11.2 px (RULINGS-8, RU-93 and R8-6; added in pass 3) | The level becomes the accessibility and site knob only; the chrome band's firmness is a separate mix, 0.482 light and 0.335 dark, that never touches the blur (§5.2). At 0.7 a dark word reads 1.90 over white (§5.1). *Amended in pass 4 (fold A1):* the chrome's firmness is D3's bound (§5.0), not a BM mix | the owner on R3b and BL's question 10, then 12.0.0 |
| O-260, the owner's low-blur register for 12.0.0 (`audit/INBOUND.md:235`), written by W-R.1 §1 question 4 (added in pass 4, fold B3-1) | Binding. Pass 3's 12 px is struck; from 12.0.0 no chrome surface samples a backdrop, which pass 4's shape channel builds on (§6). That its content rungs are three values against `restraint.md:60-62`'s one is W-R.1's to put to him | W-R.1 and the owner |
| O-338: a page-sized plate is static by default (`audit/INBOUND.md:313`; added in pass 4, fold B3-1) | Binding on the content band, which BM no longer designs | W-R.1 |
| D3's material floor (`design/material/pass-12/floor-v11a.patch`), placed as W-0.1 (unplaced, `waves/INDEX.md:15`), with W-H.1 (the sampler's deletion) and W-H.5 (its floor rows) (added in pass 4, fold A1) | BM's material is D3's floor. BM sends D3 its legibility model and one question for the owner, which ink the chrome bound holds (§5.0, R3b). The clamp's deletion is credited there | BL's D3, the owner on R3b |
| W-R.1 §1 question 1, the rim and the shadow count (added in pass 4, fold A10) | BM's edge (§5.4) is a proposal to it | W-R.1 |
| W-R.1's gate "No overshoot on an enter" (`W-R.1.md`, §3; added in pass 4, fold A6) | BM agrees: the overlay entrance moves to `present` (§4.3) | — |
| O-260's "the dock … samples no backdrop", against the source (added in pass 5, fold B4-4) | The dock reads the resting rung (`shell.css:58`, master and wi8), which O-260 sets to 8 px, so the dock still blurs in 12.0.0 unless `--dock-surface-blur` moves to the zero rung. A zero radius composes `blur(0px) saturate(1)`, still a backdrop layer, so a zero rung must be written `backdrop-filter: none`. Both are conditions on §6's 12.0.0 path for the fold and the split | W-R.1 (question 4) and BL's dock line |
| W-B.17 R-14, the held fill on "a trigger while its popup is open" (added in pass 5, fold A4-5) | Counted in every press that opens a panel (§6.2, §7.4) | the owner, with Q3 |
| W-R.1 `:84`, "A commit is an instant state change" under reduced motion (pass 5's reading) | The commit is instant: the model and `aria-selected` change at once. What the reader sees is the mark's tone leg, a crossfade from seat to seat, which W-R.1's "the tone stays" keeps; no spatial leg plays (§7.3) | BL, with passes 5 and 10 |
| W-B.17 R-14 ("Hover, focus and press are every plate's") and W-R.1:79 (the press as tone) against pass 5's §7.4, which gave a selection group's press to the word's ink (added in pass 6, folds A5-4, A5-5) | Pass 5's answer is withdrawn; BM proposes the plate's press tone, as BL rules it, on every option, the chosen one's under the mark. A lift (Q3's B to D) would make the mark the press's answer and stand the plate down | the owner, with Q3 |
| W-B.17 R-6, which rests on `restraint.md:131` ("no motion on keyboard-triggered actions") (added in pass 6, fold A5-9) | BM's Q16 proposal, the fade across, keeps line 131; Q16's B would amend it and reach R-6 | the owner, with Q16 |
| W-R.1:80, the held grow ×1.06 on the block axis on Slider and NumberField, against BL's own G1(a) cure for 11.1.2, "no held transform, in either orientation or under reduced motion" (`audit/triage-1119/PLACED.md:28`) (added in pass 6, §8.2) | On a 12, 20 and 28 px track, ×1.06 moves each edge 0.36, 0.60 and 0.84 px (`pass-6/hosts/hosts.json`, `heldGrow`), where the library's own note puts 0.8 px below the scale channel's legible floor (`control-bit.css:289-290`; restated in whole terms in §8.2 item 2, amended in pass 7, fold B6-14). BM's slider takes no held transform (G1(a)); Q3's B shows the same amount on the mark, uniform | BL, then the owner |
| The loupe: W-R.1:81 keeps it, anchored; W-B.18 R-13 removes it (added in pass 6, §8.2; R-13's release is unset, amended in pass 7, fold B6-8) | No consumer at any site's current ref (`pass-6/census/hosts.json`); BM removes it, measured on the prototype | the orchestrator and the owner |
| W-R.1:82, the release rule, names the Slider first among the velocity owners whose release velocity seeds a named row (added in pass 7, fold A6-13) | A continuous slider's value is the finger's at lift and seeds nothing (§8.2 item 3); a stepped one takes R-9's step travel (§8.2 item 4) | BL, with the question in §8.10 |
| The dots: O-95 ("Goo. Breath of life. Movement of momentum", `audit/INBOUND.md:57`) and O-295 ("like apple and google", `:270`); BL's HomeView study leaves Q-CR-3 (the sum law against the goo), CR-04 (a resting capsule about 3× the pip) and CR-05 (an indicator whose length follows the scroll) to the owner (`design/reference/apple-homeview/GAP.md:155`, `:257`); W-E.12 cures the worm's length read, W-F.3 cure 4 bounds the trail with "the elongation kept" (`W-F.3.md:46`), W-B.17 takes "19, pager dots" (`:646`) (added in pass 7, folds A6-5, B6-6) | BM withdraws pass 6's coupling of the worm to Q8 and claims no removal; the dots are the owner's, beside BL's study | the owner, with BL |

---

## Pass 2 (2026-11-22, claude-opus-5-5): delivery

**No iPhone reading has returned** (`READINGS.md`: none published, none returned), and every browser run of this pass was refused on the kernel zone (`pass-2/retry.log`). Q6's decision below is provisional until R2, R6 and the new page P2-scroll return. Its numbers are computed outside a browser and need no phone; what the phone settles is which curves Safari plays off the page's thread.

Pass 2 first folded pass 1's two critiques (`pass-1/fold.md`: 30 objections, 27 accepted, 3 accepted in part, none rejected). The amendments are marked where they land in §1 to §3 and on the pages.

Working files, all under `pass-2/`:

- `delivery/curves.mjs` and `curves.json`: the settle four ways as numbers.
- `delivery/sketch/`: the proposed delivery as design sketches (not library source): `playSpring.ts`, `useScrollChrome.next.ts`, `scroll-chrome.next.css`, `fading-scroll.next.css`, `scroll-progress-rim.next.css`.
- `delivery/sketch-check.mjs` and `sketch-check.json`: the player's fidelity, checked without a browser.
- `delivery/ledger.mjs` and `ledger.json`: the delivery's bytes, both sides, by release.
- `probe/probe.mjs`: the headless readings, written and owed (refused).
- `check/static-check.mjs` and `static-check.json`: the page contract, checked statically. `check/stub-run.mjs` runs each page's script through its start-up and two presses of every control against a stub DOM. `check/page-check.mjs` is the browser check, owed (refused).
- `retry.log`: the refusals.

### §4 Delivery

#### 4.1 What WebKit's compositor takes, and the one fact that splits the design

From the reads (UNION I12, I22; [IOS §2.3-2.4]):

- WebKit hands animations of `transform`, `translate`, `scale`, `rotate`, `opacity`, `filter` and `backdrop-filter` to its compositor. It never hands over a custom property, `clip-path`, `mask`, `border-radius`, `box-shadow` or a colour.
- Before the 27.3 beta, an animation eased by `linear()` or `steps()`, a composed animation, or one with a `playbackRate` other than 1 runs on the page's thread whatever property it moves. Every `--spring-*` token is a 48-stop `linear()` (`scheme-spring.css:60-61`). So in Safari 27.2, every iOS 26 Safari and Home Assistant's WKWebView, every spring transition glass-ui plays runs on the page's thread. This is an inference from the 27.3 release note, which R2 reads.
- Scroll-driven animations run off the page's thread from 26.4, for those same properties only.
- Low Power Mode halves the page's rendering to 30 fps (I20).

The fact that splits the design: **a CSS transition takes one timing function per property.** A transition reaches the compositor in 27.2 only with a `cubic-bezier()` or a keyword. A keyframe animation can carry any curve as samples, with keyword easing between them, which is how a spring becomes compositor work in 27.2 (an inference; R2's lane C reads it). Most of glass-ui's state changes are transitions, and P0a rule 6 wants them so, since a transition turns round from the value on screen. So the curve form decides the thread, and the two kinds of motion need two forms.

#### 4.2 One settle, four ways, as numbers (Q6)

`delivery/curves.mjs` reads the six `SPRING_PRESETS` rows and the shipped tokens, and checks its closed form against them: the settle clocks it recomputes equal the tokens' (0.12 to 0.57 s). D's fits are Nelder-Mead on the largest error, which replaces pass 1's grid fit (fold B-13).

| Candidate | What the browser is given | Fidelity | Velocity | Thread in 27.2 |
|---|---|---|---|---|
| A, script writes each frame | nothing: the page writes `translate` per frame (kf today) | exact | exact | the page's, by construction |
| B, `linear()` | the spring as a 48-stop curve | the shipped token: within 1.9 to 2.3 % of the spring on the 2 % rows, which jump their last 2 % at the end (`model`) | only by a composed or per-release curve, both 27.3-only | the page's until 27.3 (I22) |
| C, sampled keyframes | 8 to 32 samples of the row's closed form from the release position and velocity, `linear` between, placed densest where the curve bends | within 1.06 px at every row, for travel of 100 and 300 px and release speeds of −600 to 2400 px/s, with 14 to 24 keyframes (`sketch-check.json`). *Amended in pass 3 (folds A2, B-1):* that figure was for `translate` alone, on an absolute quarter-pixel horizon that ran the dock row 340 to 428 ms, played `scale` as a 4 ms cut and stopped `opacity` at three quarters. The amended player ends at the row's own band and lands its last step at the end, as the token does: from rest every row's clock equals its token within 10 ms; with speed it runs 109 to 597 ms; the error is the band itself, 2.0 to 2.2 % of travel on the 2 % rows and 0.5 to 0.9 % on the 0.5 % rows, for `translate`, `scale` and `opacity` alike, with 12 to 24 keyframes (`pass-3/fold/sketch-check.json`). A long travel on a 2 % row therefore steps its last 2 % at the end, exactly as today's token does (LAW 0b's own trade) | exact, and a retarget starts from the spring's own state, so the speed carries. *Amended in pass 3 (fold B-2):* the state is read from the running animation's `currentTime` and the new animation starts at the same frame time; on a late page (gaps of 0, 16.7, 45 ms) the body turns within 0.13 px of where it was drawn and keeps its speed (`sketch-check.json`, `retarget`) | the compositor's, if R2's lane C glides (inference) |
| D, one fitted `cubic-bezier()` | one curve per change | from rest, leaving rest at no speed and never passing the target on the five rows P2 keeps from overshooting: within 0.95 to 2.65 % of today's tokens (`tokenReplacement`: bloom 0.95, press 1.48, dock 1.89, present 1.96, world 2.44, panel 2.65). With a release speed on the dock row, a free fit is within 0.25 to 2.62 % (`trueSpring`), but at release speeds from −6 to 12 travels a second it passes its target by 0.7 to 2.9 % to imitate the spring's tail, where the spring itself passes it by 0.3 % at most; P2 forbids that on a control | only in the first control point, one fit per speed | the compositor's, in every Safari |

Two more numbers bear on the choice:

- **A transition that turns round kinks.** It restarts at its curve's start slope, which is zero for every spring. On the dock row a 100 px glide peaks at 837 px/s 50 ms in; a mark retargeted there drops from 837 px/s to rest in one frame (`kink`). C carries the speed through a retarget; a transition cannot.
- **The tokens' bytes.** The six `linear()` tokens are 1,637 B gzipped in the CSS every site loads; six single curves are 150 B (`delivery/ledger.json`).

#### 4.3 Q6, decided (provisional until R2 and P2-scroll, pass 9)

One source, the `SPRING_PRESETS` table, and five deliveries, by what the motion is. *Amended in pass 3 (folds A1, A9, A12, B-4, B-9, B-10, B-11):* a reduced-motion column; rules 2 and 3 no longer decide Q8 or Q12; one node never mixes a held animation with a transition on the same property; the other `linear()` curves are given a delivery; which column a reading settles; the token trade put to the owner.

| Motion | Examples | Delivery | 27.2 and earlier | 27.3 | Under Reduce Motion (added in pass 3, fold A1) |
|---|---|---|---|---|---|
| 1. A state change that can turn round | hover, press, toggle, open and close, the switch thumb, a bar collapsing | a CSS transition of `translate`, `scale` or `opacity` on the row's token, which becomes D: the closest single `cubic-bezier()` that leaves rest at no speed and, on every row but panel, never passes its target | compositor | compositor | the transform is dropped and an `opacity` fade of 150 ms or less is kept (P6). The library's fallback sets every transition to 0 s (`a11y-overrides.css:46-53`), so each such fade survives only by enrolment in the authorised set (BJ's §PRM-AUTHORIZED-SET). Enrolling them is the owner's ruling, taken with BL, whose W-R.1 rules a reduced-motion commit an instant change (`W-R.1.md:84`) |
| 2. A release, a settle with speed, a retarget | the mark sent to a tapped tab (a second tap may retarget it mid-glide), the mark's settle after a drag, a fling, a dialog's spring, the slider thumb let go; a sheet's detent unless Q12 moves detents to native scroll (fold A9) | C: keyframes sampled from the row's closed form from the body's position and speed, played by `element.animate()`; a retarget samples again from the spring's own state, read from the running animation's `currentTime`; on finish the end value is committed and the animation cancelled, and a press that starts a follow commits the value on screen first (`pass-3/fold/sketch/playSpring.ts`). In the library the sampler is keyframes.js's (P7) | compositor (R2, lane C) | compositor | a Web Animation is outside the CSS fallback, so the player reads the same reduced-motion gate kf uses and drops the movement: a `translate` or `scale` change dips the node's `opacity` and lands its geometry while hidden, in 200 ms; an `opacity` change is a 150 ms fade. The mark crossfades from seat to seat this way (A1) |
| 3. A follow, while the finger is down | dragging the mark, a thumb, a sheet | one write of `translate` per pointer event, at the finger; past a bound, Q8 (fold A9); no spring in the follow. The spring starts at release, as 2 | the page's, by nature; 60 Hz in production Safari (I10) | the same | the follow stays: it is the reader's own finger, not a motion the page adds |
| 4. A function of scroll position | a progress line fed by the page's scroll, a reveal tied to scroll | a scroll-driven animation of an accelerated property, or nothing animated at all: native scroll under a still paint | compositor from 26.4 | compositor | a line that tracks the reader's own scroll stays; a reveal tied to scroll lands in its end state |
| 5. A state set by scrolling | a bar that collapses on scroll down | the direction sets an attribute once per change; the change plays as 1 | compositor | compositor | as 1 |

Nothing writes a custom property each frame to drive any of these. One node never carries a held (filled) animation and a transition on the same property (fold A12).

*Amended in pass 6 (folds B5-5, A5-1, B5-4), rule 2:* a played `translate` ends when the body stays within half a pixel of its rest, not at the row's 2 % band. At the band the dock row still has 0.8 px to go on a 38 px hop and 4.6 px at 165 px/s on a 228 px hop, which would land in one step; at half a pixel those settles end at 225 and 361 ms (`pass-6/fold/fold.json`, `band`). `scale` and `opacity` keep the row's band. A release's seed is the body's own speed, capped so the settle passes its rest by no more than a settle from a standing start does plus a quarter pixel, and zero when the body moves away from its rest; uncapped, the dock row seeded at 600 px/s passes its rest by 11.5 px (`fold.json`, `release`). W-R.1's "lands without passing its rest" (`W-R.1.md:82`) and P0a's "overshoot: none on a control" are met in pixels. Sketch: `pass-6/fold/sketch/playSpring.ts` (`horizon`, `seedCap`).

*Amended in pass 7 (folds A6-7, A6-14, B6-11), rule 1's reduced column:* where the transform is the state's only sign of place (the switch thumb), it dips: out where it is, landed while hidden, in, 200 ms. Where the motion is a quantity's length (Progress, a level, the rim), the length tweens over 150 ms or less on an ease-out, so the quantity's one sign never hides. A choice's mark keeps rule 2's dip. Each survives the library's fallback (`a11y-overrides.css:46-53`) only by enrolment in the authorised set, the owner's ruling above; enrolled, each is a CSS rule of under 100 B, and otherwise the switch loads the player.

**Which column a reading settles** (fold B-10). The owner's phone runs one Safari. A reading on 27.2 settles the 27.2 column and leaves the 27.3 column a release-note inference ([27.3] 190761783); a reading on 27.3 settles that column and leaves 27.2 an inference. In 27.2 an accelerated animation is a Core Animation animation; in 27.3 WebKit runs it in the remote layer tree ([IOS §2.3]), so a Low Power Mode reading on one does not carry to the other.

**The other `linear()` curves** (fold B-4, from a `git grep` of `src/` for `linear(` and `steps(`):

- `--ease-cartoon-punch` (`scheme-motion.css:163`), a 13-stop `linear()` with a dip and a 22 % overshoot, eases `translate` and `scale` on `glass-atom.css:50-51`, `scale` on `glass-chip.css:30`, `transform` on `slider/styles.css:317`, the entrance keyframes of `liquid-enter.css:121`, `:176`, and `rotate` on `utilities/btn.css:83`. Its comment (`:157-158`) calls it "compositor-safe, both engines"; before 27.3 it is not (I22), and the comment is corrected with that evidence. Its overshoot on controls is restraint's question (`restraint.md:125-128`), not a fit: it goes to the owner as one, beside the token trade below.
- `--ease-scroll-spring: var(--spring-world)` (`scroll-choreography.css:54`, `:113`) eases a scroll-driven animation; it takes world's single curve with the token swap (2.44 % from today's), which also hands it to the compositor before 27.3.
- `handmark/stroke.ts:81-98` builds a `linear()` at run time for a `stroke-dashoffset` draw, a page-thread property whatever its curve. It is left alone.

**The token trade, for the owner** (fold B-11). The tokens serve transitions, which take one curve, so their choice is `linear()` (today) against one `cubic-bezier()` (D). Before 27.3, and in Home Assistant's WKWebView on iOS 26, D runs on the compositor and `linear()` does not; from 27.3 both do, and `linear()` is exact where D is up to 2.65 % off (3.67 % for panel, below). The share of readers on 27.3 when 11.3.0 ships is Q7(d), unanswered. The study proposes D, and the owner decides with Q7(d) beside it.

**Why each candidate lands where it does.**

- **B is dominated.** It equals C from 27.3 and is page-thread work before it; C works in both. The `linear()` tokens leave, which also frees 1,487 B net in every site's CSS.
- **D serves transitions and C serves releases.** A transition can take only one curve, and D's constrained fit holds today's tokens within 2.65 %. A release needs the speed, a retarget needs the state, and C gives both exactly. D with a speed would need a fit per row and speed (a runtime fitter or a table) and passes its target on controls.
- **A stays only for the follow,** where the page's thread cannot be avoided.

**What the owner sees change.** Every spring transition's shape moves by at most 2.65 % of its travel (2.6 px in 100 px; panel's largest, dock's 1.89 %). No control's curve overshoots, and every curve leaves rest at no speed. *Amended in pass 3 (fold B-3):* panel's free fit peaked at 5.61 %, a ζ 0.676 spring, under the owner's floor ("Panel, at ζ 0.71, is the bounciest row", `docs/precepts/README.md:94`), and every overlay entrance rides it (`motion-registers.css:69`). Panel is refitted with its peak held at its own row's: `cubic-bezier(0.215, 0, 0.059, 1.288)`, peak 4.20 % (ζ 0.71), 3.67 % from today's token (`pass-3/fold/panel-fit.json`). So panel's shape moves by up to 3.67 % and keeps its overshoot; every other row moves by at most 2.44 %. *Amended in pass 4 (fold A6):* no overlay entrance keeps that overshoot. P2 forbids it on popover open and dialog in (`motion-canon.md:137-141`), and W-R.1's gate plants `--spring-panel` on the overlay row as a red, so `--enter-overlay-spring` (`motion-registers.css:69`) moves to `present`, and panel's curve eases only the spatial morphs the owner ruled. A mark retargeted mid-glide keeps its speed instead of stopping dead. The same motions keep gliding while the page is busy, which is what R2 and P2-scroll ask him to look at. P2-scroll's B, D and F already move on the dock row's single curve, so he sees it there.

**What R2 settles.**

- If lane C stutters on 27.2 while D does not, rule 2 falls back to D with a fitted table, and the overshoot it buys on controls goes to the owner.
- If lane B does not stutter on 27.2, the I22 inference was wrong. The token swap still pays for itself in bytes, but its fidelity cost becomes the owner's call.
- R2's second run, with Low Power Mode on, shows whether compositor legs keep their pace when the page's rendering halves. If they do, law 7's 30 fps reading (§1) is met by rules 1, 2 and 4. If they do not, every P0a row under 167 ms needs lengthening in passes 8 and 10.

#### 4.4 The four scroll-linked parts

Each is prototyped as a pair on `pages/P2-scroll.html`, today's beside the proposal, with the "Busy page" switch R2 uses.

| Part | Today | Proposed | What a person sees | Bytes (gz) | Page | Decision |
|---|---|---|---|---|---|---|
| **FadingScroll** (M7) | Each edge's ramp is a registered length scrubbed by a `scroll(self)` timeline over the first and last 16 px of travel (`base-misc.css:52-158`, `base.css:39-48`), and a script writes the same lengths where timelines are missing, which includes every Safari before 26 (`useFadingScroll.ts`). Registered properties never reach the compositor, so the mask is rebuilt on the page's thread in those slivers | The ramps never change. The scroll port reaches into its host's padding by the ramp's width and pads itself by the same width, so at rest each ramp covers empty padding (a sharp edge) and content passes under it once scrolled (`sketch/fading-scroll.next.css`). No timeline, no registered property, no script, the same in every engine | At rest, the same sharp edges. Scrolled, content dissolves into the host's padding rather than inside the old box edge, as iOS content dissolves under a bar. A host with less than 1rem of padding on the scroll axis: the port overflows it by the difference; a host that clips cuts the ramp, and at a viewport edge the page would scroll sideways (corrected in pass 3, fold A10: the earlier text said the content would be inset, which the sketch does not do) | removes 904 (the fallback script) and the component's own share of the 430, re-measured by pass 10 (fold B-5); adds 201. 12.0.0 (`useFadingScroll` is exported) | C, D | **Adopt, provisional until P2-scroll (pass 9)**, on its reading and the sites' answer on padding (§4.9). M7's guard stands: the mask still makes the port a backdrop root. *Amended in pass 3 (folds A10, B-5):* the change belongs to the component's own port class (`pass-3/fold/sketch/fading-scroll.next.css`); the shared `.fading-scroll` register that SelectContent (`:159`), CommandList (`:41`) and `.card-scroll-host` (`card/scroll.css:39-55`) compose keeps today's rules until pass 8 designs the overlays' inset and the card's own pass its sticky header. The designed behaviour on a padless host is the overflow, with no runtime branch |
| **scroll-chrome** (M8, T8) | `useScrollChrome` writes the registered `--chrome-collapse-t` on every frame of a scroll, from which `transform`, `opacity` and `box-shadow` are computed on the page's thread; at a 140 ms stop it snaps to 0 or 1 in one frame (`useScrollChrome.ts`, `apply` in the stop timer), with no transition on the property (`property-regs-specular.css:78-82`). That snap is a cut under P0, the union listed only the reduced-motion one | The collapse is a state. The direction, once it has held for 8 px, sets `data-collapsed`, and the stylesheet plays `scale`, `translate` and `opacity` on the dock row's curve; the lifted shadow is the state pseudo-element's `opacity` (`sketch/scroll-chrome.next.css`, `sketch/useScrollChrome.next.ts`). Reduced motion keeps a 150 ms fade of the quiet and drops the scale. *Amended in pass 3 (folds A4, A1):* that moved three properties on one node and added a second shadow layer on a pseudo-element made for the motion (`restraint.md:197`, `:201`, `:202`). Now two properties move, `scale` from the top edge and `opacity`; the bar's one shadow steps from `--shadow-sm` to `--shadow-xl` as a 160 ms effect leg; no `::after`, no rise (`pass-3/fold/sketch/scroll-chrome.next.css`). Per collapse: 2 properties on the node, 3 transition legs, 1 shadow layer. *Amended in pass 4 (fold A5):* that was three animated properties, since `box-shadow` also animated on the node in the same change. The shadow now stays as it is across the collapse: 2 properties, 2 legs, 1 still shadow layer (`pass-4/fold/sketch/scroll-chrome.next.css`; P2-scroll's B). The reduced-motion fade survives the fallback only by enrolment in the authorised set (§4.3). *Amended in pass 5 (fold A4-10):* at opacity 0.72 a word on the collapsed bar falls under D3's 4.8 in dark for every R3b letter (A 3.64, B 2.78, C 2.20). The collapse is now `scale` alone: 1 property, 1 leg, the bar at full opacity; under reduced motion it does not collapse (`pass-5/fold/sketch/scroll-chrome.next.css`; P2-scroll's B). Solving the bound at a dimmed opacity instead is the owner's, with R3b's letter | Today the bar shrinks in step with the finger over 116 px and snaps when the scroll stops. Proposed, it begins to shrink when the scroll turns downward and finishes in 210 ms whatever the speed, as iOS's tab bar minimizes (T8). Nothing snaps | removes 417 + 897; adds 330 + 384. 12.0.0 | A, B | **Adopt, provisional until P2-scroll (pass 9; fold B-9).** No site mounts `useScrollChrome`; Home Assistant imports `scroll-chrome.css` (`sheet.css:41`) and is asked (§4.9). The dock's scroll fold (T8) takes its trigger from this; its shape change is pass 4's (Q1) |
| **ScrollProgressRim**, border edge (M9) | The stroke is revealed by `clip-path: inset(…)`, its change played on `--spring-dock` (a `linear()`); `clip-path` is page-thread work, and reduced motion sets `transition: none`, so each tick cuts (`scroll-progress-rim/styles.css:122-135`, `:143-148`) | The rim's root is a window with a still, square clip that slides by the unfilled share, and the stroke inside slides back by the same share, so the stroke stays on the host's border and only the window's edge moves. Both legs are `translate` on the dock row's curve (`sketch/scroll-progress-rim.next.css`). The fill pill (`edge="inset"`) takes the same pair, with its gradient on a pseudo-element so the band is revealed, not slid | The same line along the same border, following the radius, edge to edge, by the owner's order (`docs/precepts/README.md:105-108`). It keeps gliding while the page is busy. Under reduced motion its length tweens over 120 ms instead of jumping | removes 319; adds 273. 11.3.0 (internal styles), held until the sites answer on the root's box (§4.9) | E, F | **Adopt, provisional until P2-scroll (pass 9; fold B-9).** The `value` prop stays: atlas feeds it beat progress (`DockProgressRim.vue`) and fourier a job's progress (`useDockProgress.ts`), so a scroll timeline cannot replace the script's value. The reduced-motion tween needs a P6 line (§4.6). *Amended in pass 3 (folds A3, A5, A13, B-6, B-7):* the rim splits by its feed. Fed by the page's scroll (gaggle's report dock, "how far down the page the reader is", `PageDock.vue:4`; fourier's reading progress, `useDockProgress.ts:4-6`), the window and stroke ride a `scroll(root)` timeline with no script and no transition, so the line never trails the finger (rule 4). Fed a value (atlas's beats, fourier's job), it keeps `value` and the single-curve transition. The root, which carries `role="progressbar"`, never moves and clips at the host; an `aria-hidden` window span with a square `overflow: clip` slides inside it, so no box a suite or VoiceOver reads moves; the RTL arm is kept; F on P2-scroll reads this clip. The inset pill is left out of the change and keeps today's clip, since a clip would cut its dots (`styles.css:10-15`) (`pass-3/fold/sketch/scroll-progress-rim.next.css`) |
| **The run's caps** (I13) | In 11.2.0 (wi8) the plate's cut-cap writes are deleted (W-I.8 R-1). What remains is the run's own clip animating `border-*-radius` on the `--dock-run` timeline: square when flush, the plate's rest corner at 1 % of a pitch, the cut corner by a whole pitch (`bl/dock/wi8:run.css:733-747`, `:857-915`). `border-radius` never reaches the compositor, so the clip is repainted on the page's thread on every scroll frame in the first and last pitch | After 11.2.0 ships, the run's clip rests at the plate's rest corner, still. The timeline, the four keyframes, the reduced-motion arm and the rule that turns them off on a run that fits all go | Nothing at the run's ends moves with scroll. A seat resting flush against an end is clipped by the plate's arc, as the plate itself is. The peek of the next seat still tells the reader the run scrolls (W-I.1) | 597, conditional and outside the 12.0.0 net until BL and the owner rule (fold A8) | — | **Proposed, after BL.** *Amended in pass 3 (fold A8):* restraint says nothing clips (`restraint.md:113`) and the proposal ends BL's "flush = completeness" grammar (`wi8:run.css:752-760`), so the clipped flush seat goes to the owner as a picture, beside BL's reduced-motion branch, which already rests the clip that way (`wi8:run.css:770-787`). *Amended in pass 4 (§6.3): tried, and it fails: a corner whose radius changes can ride neither `translate`, which keeps the radius, nor `scale`, which bends it; the still clip stands.* UNION I13's other route, the caps on an accelerated property, is pass 4's to try: a corner that changes shape is Q1's question (a non-uniform scale bends the radius). BL's ninth pass is not disturbed. The flush seat's ring and fill under a still clip need one headless Chromium capture (clips draw alike in both engines; owed, refused today). Observation for BL: wi8's run clip still travels to `--dock-cap-cut` while the plate no longer cuts (§4.9) |

#### 4.5 The follow under load (I10)

keyframes.js's `Draggable` sets its spring's target on each `pointermove` and emits the spring's value on each animation frame (`keyframes.js src/animation/orchestration/drag/draggable.ts:286-296`). So the drawn position trails the finger by the spring's step, and the draw waits for the page's thread twice: once for the event and once for the frame. Rule 3 writes `translate` in the move handler at the finger, and starts the spring at release.

`probe/probe.mjs` reads the gap between the pointer and the drawn position at each frame, kf's follow against a direct write, with the page's thread idle and then busy 45 of every 60 ms, in headless Chromium. It is owed, refused today. It reads lag in pixels, not a frame rate. keyframes' 14 ms late touch while a scene plays ([IN value.js 3]) is the same contention. The delivery cannot lift the 60 Hz cap (I10); it can keep the follow's own work to one style write per event. R6 reads the event rate on the phone.

*Amended in pass 3 (fold B-12).* A style write in a `pointermove` handler is still drawn at the next rendering update, so a direct write waits for the event and the frame just as kf's follow does. What it removes is the spring's trail: kf sets its spring's target per move and draws the spring's value (`draggable.ts:286-296`), so the drawn position lags the finger by the spring's own response, a quantity of the spring's parameters, not of the browser. The probe's direct lane reads zero lag by construction, and its kf lane reads that trail; neither reads where the puck is drawn when the frame is shown. Event delivery on the phone is R6's alone, and the probe's scroll counts are Chromium's, never evidence for WebKit.

#### 4.6 Precept amendments, drafted (for pass 10 and the owner)

**P5, rewritten** (it now names properties WebKit does not composite, discrepancy 2):

> P5: the compositor's properties. Motion (anything that moves, scales or fades a body) animates only `translate`, `scale`, `rotate`, `transform` and `opacity`, and the glass's `backdrop-filter` only where the owner has amended `restraint.md:143` (Q19). These are the properties WebKit hands to its compositor. `clip-path`, `mask`, `border-radius`, `box-shadow`, colours and every registered custom property run on the page's thread in WebKit. They may carry an effect of 200 ms or less (a hover fill, a tint), never a body's travel, a scroll-linked change or a breath. The curve must be one the compositor takes in every Safari the library supports: a `cubic-bezier()` or a keyword for a transition, keyframes with keyword easing for a played settle. `linear()` and `steps()` reach WebKit's compositor only from 27.3. Nothing writes a custom property per frame to drive motion. Layout properties never animate (unchanged).

*Amended in pass 3 (folds B-11, A11).* The `linear()` sentence is bounded: it holds while the oldest Safari the library supports is older than 27.3, and is struck when that floor reaches 27.3. The P5 draft breaks one shipped part, which the owner rules on with Q19: the toast's vaporize, which drives `backdrop-filter` from the registered `--vap-blur` and `--vap-saturate` over 317 ms (`dissolve.css:60-72`; `animations.css:397-405`), a design measured on the device ([ARC] §4b).

**P7, amended** (the one source and the one clock keep their table; the delivery is added):

> The `--spring-*` tokens are generated from `SPRING_PRESETS` as the closest single `cubic-bezier()` that leaves rest at no speed and, on every row but panel, never passes its target (within 2.65 % of the former `linear()`); panel's curve passes it by no more than its own row's overshoot, 4.21 % (within 3.67 %; amended in pass 3, fold B-3), and eases only the spatial morphs the owner ruled; every entrance rides a row that does not pass its target (amended in pass 4, fold A6). A settle that carries a speed is played as compositor keyframes that keyframes.js samples from the same row, and a retarget samples again from the spring's own state. keyframes.js computes; the browser plays. A follow writes `translate` per pointer event and runs no spring. The off-spine set is unchanged; wi8's private integrator is not admitted (F7).

**P6, one line** (for the owner, with ScrollProgressRim):

> A fill's length, such as a progress line's reveal, is an effect, not a body's travel. Under reduced motion it keeps a tween of 150 ms or less on an ease-out, and the universal carve lets it through.

**Law 7 and P0a** (with fold B-10): a leg under 167 ms is a compositor leg (rules 1, 2 or 4), or it shows fewer than five frames in Low Power Mode.

**P0a rule 6, amended** (added in pass 3, fold A11). Today: "Anything that can come back inside a tenth of a second is a node that stays and changes by a CSS transition" (`motion-canon.md:93-95`). Drafted:

> Anything that can come back inside a tenth of a second is a node that stays. A state change turns round on a CSS transition. A body that carries a speed (a release, a settle, a mark retargeted mid-glide) turns round on the settle player, which starts again from the spring's own position and speed; a transition would restart it from still.

#### 4.7 The delivery's bytes, by release

`delivery/ledger.mjs` measures CSS cut from the 11.1.0 dist the sites load, the run's caps from wi8's `run.css`, and JS with each file bundled alone. Each figure is a standalone `gzip -9`, an upper bound inside a site's bundle.

| Release | Added | Removed | Net |
|---|---|---|---|
| 11.3.0 | 1,078: the six single-curve tokens (150), `playSpring` (655), the rim's window (273) | 1,956: the six `linear()` tokens (1,637), the rim's clip legs (319) | **−878** |
| 12.0.0 | 915: FadingScroll's fixed ramps (201), the state-driven scroll-chrome (330 + 384) | 4,036: FadingScroll's scrubbed ramps and fallback (430 + 904), scroll-chrome's ramp and machine (417 + 897), `useSpringMount` (791), the run's caps (597) | **−3,121** |

*Amended in pass 3 (folds A6, A8, B-5).* The rows above net CSS against JS and count three removals that are not yet decided. Split by asset kind, with the undecided removals outside the net:

| Release | CSS added | CSS removed | JS added | JS removed | Net CSS | Net JS |
|---|---|---|---|---|---|---|
| 11.3.0 | 423: the six single-curve tokens (150), the rim's window (273) | 1,956: the six `linear()` tokens (1,637), the rim's clip legs (319) | 655: `playSpring` | 0 | **−1,533** | **+655** |
| 12.0.0 | 531: FadingScroll's fixed ramps (201), the state-driven scroll-chrome sheet (330) | 417: scroll-chrome's ramp; FadingScroll's own share of the 430 is re-measured by pass 10 (B-5) | 384: the state-driven `useScrollChrome` | 1,801: FadingScroll's fallback (904), scroll-chrome's machine (897) | **+114, less FadingScroll's share (between +114 and −316)** | **−1,417** |
| conditional, outside the net | — | 597: the run's caps (BL and the owner, A8) | — | 791: `useSpringMount` (pass 8, Q9 and Q12, A8) | — | — |

Where it lands:

- **daraksha counts JS only**, per route's eager set: 125 KB a route, 126 for the reader's, set by the owner on 21 Nov, against 125.3 KB measured (`check-budget.mjs:2-4`, `:33-35`). 11.3.0 adds the player's 655 B of JS to every route the dock is on and removes no JS from it, which leaves the reader's route about 45 B; the mark's writer (about 600 B, §3.2) would take it over. So for daraksha the player and the mark load on intent, on the first touch of a seat, as value.js asked ([IN value.js 5]), or they ride the release whose JS removals pay for them (`useDockRunMark`, `useDragVelocity`, 12.0.0). "11.3.0 is lighter for every site" is withdrawn until the per-entry figure exists (pass 10).
- **Home Assistant** ships no CSS asset: its build puts glass-ui's CSS in the entry's script (`package.json`, `gate:no-css-asset`; `bundle_budget.ts:28`), so its entry nets the two kinds, −1,533 + 655 = −878 B, inside its 0.2 kB margin.
- **The other sites** load CSS and JS as separate assets; their caps (gaggle's first-load margin, atlas's blocking time) are counted per entry in pass 10.
- The rim reaches atlas, fourier and gaggle. FadingScroll's pieces reach value.js, keyframes, fourier, atlas and gaggle. `scroll-chrome.css` reaches Home Assistant; `useScrollChrome` reaches no site, so it cuts source and API only. `useSpringMount` reaches every site that opens a Dialog or Sheet, once pass 8 decides it.

Pass 1's corrected ledger (§3.2) is separate and adds to this.

#### 4.8 Readings owed

| Reading | Where | Owed to | For |
|---|---|---|---|
| Which settles stutter while the page is busy, then again with Low Power Mode on | `pages/R2.html` | the owner's iPhone | Q6, Q7(b), law 7's 30 fps reading |
| Pointer, coalesced and touch event rates, then again with Low Power Mode on | `pages/R6.html` | the owner's iPhone | Q7(c), I10, I11, UNION discrepancy 1 |
| Which of A to F stutter, freeze, jump or lag behind the finger, one pair at a time, with Busy page off and then on, with a screen recording (rebuilt in pass 3, fold B-8) | `pages/P2-scroll.html` | the owner's iPhone | §4.4's four decisions |
| Accelerated animations above 60 Hz in 27.2 and 27.3 (Q7(a)) | no page can read it: a frame rate needs an instrument, not an eye | the owner, with a 120 Hz capture if he has one | Q7(a) |
| kf's follow against a direct write, idle and busy; main-thread style recalcs and paints for A, B, E, F while scrolling | `probe/probe.mjs` | headless Chromium, after a reboot | §4.5, §4.4 |
| The eight pages at 390 and 1440, light and dark, every control pressed once | `check/page-check.mjs` | headless Chromium, after a reboot | the page contract |
| A seat resting flush against a run's end, under the still clip | one capture on wi8 | headless Chromium, after 11.2.0 ships | §4.4, the run's caps |

#### 4.9 Questions for the sites, and one new question

- **Q22 (new; folds A1 and B-1; pass 8).** Every centred Dialog mounts the full-viewport focus veil under its plate (`DialogContent.vue:195`). Law 1 counts that as a blurred plate over a blurred layer, and Home Assistant's WKWebView pays for two live blurs per modal. Against it stands HA's own "these modals should be more glassy". Does the veil stay, become a tint, or go? It is weighed with W-R.1, which owns the register.
- **keyframes.js (through the value.js session).** Would kf's `Draggable` take a follow that writes the pointer's value directly while the finger is down and starts the spring at release? Would kf export a sampler that returns compositor keyframes for a `SPRING_PRESETS` row from a position and a speed (`sketch/playSpring.ts`'s `offsets` and `springState`)? P7 names kf the one brain, so the sampler belongs there.
- **value.js, keyframes, fourier, atlas, gaggle (FadingScroll).** If a FadingScroll reached into its host's padding by 1rem on its scroll axis and padded itself by the same, would any host of yours lack that padding, or would a suite of yours read the port's box? *Restated in pass 3 (fold A10):* where a host has less than 1rem of padding on the scroll axis, the port overflows it by the difference; a host that clips cuts the fade, and a host at the viewport's edge would let the page scroll sideways. Which of your hosts, if any, is like that?
- **atlas, fourier, gaggle (ScrollProgressRim).** *Restated in pass 3 (folds A3, A5).* The border rim's root, the element with `role="progressbar"`, would keep its box and clip; inside it a hidden window would slide by `translate`. A rim fed by the page's scroll would follow a scroll timeline with no script; a rim fed a value would tween its length, over 120 ms under reduced motion. Does a suite of yours read the rim root's box or the stroke's `clip-path`? gaggle and fourier: is the value you feed your rim the page's scroll position alone (gaggle's `PageDock.vue:4`, fourier's `useDockProgress.ts:4-6`), or something else at times?
- **Home Assistant.** `sheet.css:41` imports `scroll-chrome.css`. Does anything of yours set or read `--chrome-collapse-t`, which the proposal removes for a `data-collapsed` state?
- **Every site.** The `--spring-*` tokens would change from `linear()` curves to single `cubic-bezier()` curves within 2.65 % of today's shape, on the same clocks. Does a suite of yours read a spring token's value or a computed `transition-timing-function`?
- **BL (the glass-ui dock session).** On wi8, the run's clip still animates from the rest corner to `--dock-cap-cut` over a pitch (`run.css:857-915`) while the plate no longer cuts (R-1). Is that intended? BM proposes, after 11.2.0 ships, that the run's clip rest still at the plate's corner and that the `--dock-run` timeline go in 12.0.0.

#### 4.10 What pass 2 did not do

- **Every browser run was refused** on the kernel zone, four times from 17:21 to 17:55 at 13.53M to 13.64M (`pass-2/retry.log`), so the pages are checked without a browser only: all eight pass the contract and `node --check` (`check/static-check.json`), and all eight scripts run through start-up and two presses of every control against a stub DOM with no error (`check/stub-run.mjs`). Neither says anything about layout or paint. The page check, the probe and the flush-seat capture are owed, with their commands at the head of each script.
- **No library source was edited** and no prototype needed glass-ui's build, so the `bm/study` worktree was not made. The sketches under `delivery/sketch/` are design sketches; `sketch-check.mjs` checks the player's numbers in Node.
- **P5 and P7 are drafted, not applied.** Pass 10 applies them on the owner's word, with the P6 line.

---

## Pass 3 (2026-11-22, claude-opus-5-5): material and edge

**No iPhone reading has returned** (`READINGS.md`: none published, none returned). R3 (pass 1's material page) and R3b (this pass's) are owed, so Q10, Q13 and Q14 below are provisional until they return and pass 9 runs. The legibility test is a model computed in Node, not a device reading, and every browser run of this pass was refused on the kernel zone (`pass-3/retry.log`).

Pass 3 first folded pass 2's two critiques (`pass-2/fold.md`: 26 objections, all accepted, none in part, none rejected). The amendments are marked "amended in pass 3, fold …" where they land in §1 to §4 and on R2, R5 and P2-scroll.

Working files, all under `pass-3/`:

- `fold/`: the fold's computations. `sketch/playSpring.ts` (the amended player), checked by `sketch-check.mjs` into `sketch-check.json`; `panel-fit.mjs` and `panel-fit.json`; the amended sketches `scroll-chrome.next.css`, `scroll-progress-rim.next.css` and `fading-scroll.next.css`.
- `material/legibility.mjs` and `legibility.json`: the legibility test (§5.1).
- `material/ledger.mjs` and `ledger.json`: the material's bytes and a census of the material tokens at each site (§5.6).
- `material/sketch/material.next.css`: the material as a design sketch, not library source.
- `material/aurora-ground.mjs` and `material/ground/aurora.jpg`: the default aurora's static field, rendered for R3b.
- `check/`: pass 2's page checks with R3b added.
- `retry.log`: the refusals.

### §5 Material and edge

#### 5.0 Restated in pass 4 (folds A1, A3, A7, A8, A11, B3-1, B3-3, B3-4, B3-8)

*No reading has returned; this restatement is provisional until R3b returns (pass 9).* It replaces §5.2's decisions; §5.1 to §5.9 stand as pass 3's record with the amendments marked in them.

Pass 3 designed the material beside two records it did not cite, and together they decide most of what §5.2 decided.

- **The owner's blur register, O-260** (2026-11-11, via atlas; BL `audit/INBOUND.md:235`, booked for 12.0.0 at `FORMATION-PROGRESS.md:912`): wash 4 px, quiet 6, resting 8, floating and overlay 0, saturate 1, no blur on controls. The floating and overlay rungs carry the dock, menus, sheets and dialogs, so from 12.0.0 none of them samples a backdrop, and "their fill alone must hold legibility". O-338 adds that a page-sized plate is static by default (`:313`). W-R.1 writes the value (§1 question 4).
- **BL's material floor, D3** (`design/material/pass-12/floor-v11a.patch`, `tokens/glass.css` §8; placed as W-0.1, unplaced). The plate is `--card` at α. A surface that does not know its ground paints the bound: the α at which the muted ink holds `--glass-ink-target: 4.8` (4.5:1 plus 0.3 for glyph antialiasing) over the worst flat ground, computed in CSS from the site's own ink and card. Chrome rungs sit at the bound, content at the bound plus steps. Nothing samples the backdrop, so the clamp is deleted. The owner's delegate ruled chrome a card at the bound and accepted grey content off paper (O-103, `FORMATION-PROGRESS.md:537`).

So **BM proposes no material code**, and the sketch `pass-3/material/sketch/material.next.css` is withdrawn. What pass 3 found stands as input to D3 and W-R.1: today's plates fail at the far end of each mode (§5.1, items 1 and 2), and a fill at a solved bound holds words over any ground with no blur (item 3).

One question stays open for the owner: **which ink the chrome bound is solved for.** D3 solves it for the muted ink. Pass 3 extended BL's RU-44 ("every word in a dock is the dock's full ink", `INPUT-secondary-ink-2026-11-15.md:5`) to all chrome. With one ink, the bound can be solved for `--foreground`, and the plate is lighter.

On D3's law at O-260's blur, with glass-ui's default colours and the 4.8 target (`pass-4/fold/material-fold.json`; a model computed in Node, not a device reading):

| Letter on R3b | The bound holds | α light | α dark | Lowest word contrast, light / dark | Photograph's structure kept, light / dark | Mean luminance change, light / dark | Saturation change, light / dark |
|---|---|---|---|---|---|---|---|
| A, D3's floor | the muted ink at 4.8 | 0.897 | 0.872 | 12.84 / 7.45 (muted 4.80 / 4.81) | 10 % / 13 % | +73.8 % / −58.6 % | −69 % / −68 % |
| B, one ink | `--foreground` at 4.8 | 0.545 | 0.739 | 4.81 / 4.81 (muted would fall to 1.80 / 3.11) | 45 % / 26 % | +44.8 % / −49.6 % | −55 % / −70 % |
| C, icons | `--foreground` at 3.3 | 0.437 | 0.616 | 3.31 / 3.30 | 56 % / 38 % | +36.0 % / −41.4 % | −45 % / −61 % |

A's light α, 0.897, sits beside D3's own 0.891 for the static muted ink (`REGISTRY.md`, Q-12), so the model reproduces D3's bound.

Against the record:

- **The withdrawn dark plate.** BL turned down a dark dock at total opacity 0.672 as near-solid (`RULINGS-6.md:27`; RU-57). A (0.872) and B (0.739) are firmer, and C (0.616) is a little lighter. Pass 3's B was 0.712, not "about as firm" (B3-3).
- **Frost.** The archive defines blurred and frosted glass by the Maps sheet: mean L −2 %, structure 80 % kept, saturation +62 % ([ARC] §5(i), `IOS27-ARCHIVE.md:248`). No letter is near it, and with no blur none can be, since the plate shows the page's detail at a lower contrast instead of a frost. B in light is about half cream with no blur, the mechanism the record names for O-2's "far too trite, shiny, and bright--not like blurred and frosted glass" (`BJ/addenda/2026-07-24-refinement/PROPORTION-CATEGORIES.md:103`). O-260, of 2026-11-11, is the later ruling (`restraint.md:23`). "B is frost" is withdrawn (B3-4).
- **Both ways.** For a firmer chrome: C-59, "Too glassy is this card--too transparent", and W-R.1's G6, which reads it for menus ("surfaces, not smudges at alpha .18 to .22"). Against: "Glass dialog is no different and not glassy at all. GLASS should be partially transparent." (C-59's own canon entry, `CANON.md:1558`), Home Assistant's "these modals should be more glassy" (2026-11-15, four days after O-260) and value.js's glassy, translucent popups ([IN value.js 4]; [IN HA, bounds]). O-260 and Home Assistant's ask meet on its modals; that is the owner's (A3).
- **The content band.** Pass 3 kept cards at today's thin ink. C-59 is about a card, and D3's floor paints content at the bound plus steps, so BM's content band is withdrawn and content is D3's (A3).
- **The chrome rungs.** D3's floor puts floating and the dock at the bound and overlay and sheet one step above it (`tokens/glass.css` §8 in the patch), so the rungs stay apart by D3's steps. The third factor pass 3 added goes with its sketch (A11).
- **The colours.** Every figure here is for glass-ui's default `--card`, `--foreground` and muted ink. Seven of eight site checkouts re-point one of them (B3-8). D3's law computes the bound in CSS from the site's own colours, and that is the cure; pass 10 reads the sites' resolved bounds.

For the owner, on R3b (rebuilt, §5.7): per background, the letters whose small words he cannot read, in Light and in Dark; then A, B or C for each mode; then the edge. BL's D3 is sent the question and the model (§3.9).

#### 5.1 The legibility test, without the static walk

**Method** (`material/legibility.mjs`). Each plate is modelled the way the filter and the plate paint it: the backdrop blurred by a Gaussian whose σ is the CSS radius, saturated by the Filter Effects matrix, then the plate's colour composited over it, in gamma sRGB. The colours are glass-ui's tokens, listed at the head of the script: light text `--foreground` hsl(24 10% 10%) on the card hsl(30 85% 96%), with the ink oklch(0.28 0.035 70); dark text hsl(30 14% 90%) on hsl(26 22% 17%), with oklch(0.17 0.03 70); the rung alphas from `tokens/glass.css` (base 0.14 light and 0.18 dark, step 0.04). The grounds: flat white, black and mid grey; the photograph R3 uses (`fourier-analysis/assets/animals/giraffe.webp`, 380 px wide); the default aurora's static field (`DEFAULT_AURORA_CONFIG`, `presets.ts:460-505`, mirrored from `auroraFallbackGround.ts`), which has one palette in both modes, so in dark it is a bright ground under dark glass. For each plate on each ground the script takes the text's WCAG contrast against the plate at every pixel under it. No row runs the static walk; one row puts the clamp at its ceiling.

Each cell is the lowest contrast on the plate, then the share of the plate under 4.5:1. B and C are this pass's candidates (below); the Apple rows are rida.dev's simulator fits (G1 (a) and (b)) carrying glass-ui's text.

*Light*

| Plate | White | Black | Grey | Photograph | Aurora |
|---|---|---|---|---|---|
| Today, dock rung (16 px) | 14.47 (0) | 1.17 (100 %) | 3.89 (100 %) | 1.70 (55 %) | 4.31 (21 %) |
| Today, resting rung (16 px) | 13.35 (0) | 1.16 (100 %) | 3.70 (100 %) | 1.67 (61 %) | 4.07 (29 %) |
| Today, overlay rung (22 px) | 11.30 (0) | 1.14 (100 %) | 3.34 (100 %) | 1.75 (70 %) | 3.62 (39 %) |
| Today's dock, clamp at its ceiling (+2 steps) | 12.30 (0) | 1.15 (100 %) | 3.52 (100 %) | 1.64 (65 %) | 3.84 (35 %) |
| Apple's menu, fit (a) | 17.33 (0) | 4.89 (0) | 9.88 (0) | 6.93 (0) | 9.22 (0) |
| Apple's bar, fit (b) | 17.25 (0) | 4.71 (0) | 9.71 (0) | 7.02 (0) | 8.87 (0) |
| **B**: dock rung at level 0.482, 12 px | 15.34 (0) | 4.51 (0) | 8.88 (0) | 6.31 (0) | 8.28 (0) |
| **C**: dock rung at level 0.599, 12 px | 15.14 (0) | 3.00 (100 %) | 7.51 (0) | 4.76 (0) | 7.01 (0) |

*Dark*

| Plate | White | Black | Grey | Photograph | Aurora |
|---|---|---|---|---|---|
| Today, dock rung (16 px) | 1.09 (100 %) | 16.62 (0) | 3.99 (100 %) | 1.88 (68 %) | 1.78 (100 %) |
| Today, resting rung (16 px) | 1.19 (100 %) | 16.57 (0) | 4.26 (100 %) | 2.05 (63 %) | 1.94 (100 %) |
| Today, overlay rung (22 px) | 1.45 (100 %) | 16.45 (0) | 4.88 (0) | 2.47 (50 %) | 2.32 (100 %) |
| Today's dock, clamp at its ceiling | 1.31 (100 %) | 16.51 (0) | 4.56 (0) | 2.24 (57 %) | 2.12 (100 %) |
| BL 11.2.0's dark dock, level 0.7 (RU-93), 11.2 px | 1.90 (100 %) | 15.40 (0) | 5.41 (0) | 3.01 (37 %) | 2.89 (65 %) |
| Apple's menu, fit (a) | 3.49 (100 %) | 13.07 (0) | 6.84 (0) | 4.74 (0) | 4.68 (0) |
| Apple's bar, fit (b) | 1.59 (100 %) | 13.06 (0) | 2.96 (100 %) | 1.97 (98 %) | 1.99 (100 %) |
| **B**: dock rung at level 0.335, 12 px | 4.51 (0) | 13.36 (0) | 7.97 (0) | 5.91 (0) | 5.77 (0) |
| **C**: dock rung at level 0.496, 12 px | 3.00 (100 %) | 14.33 (0) | 6.72 (0) | 4.34 (7 %) | 4.20 (35 %) |

What the test shows:

1. **Today's plates fail at the far end of each mode.** In light a word on the dock reads 1.17 over black and falls under 4.5:1 on 55 % of the photograph; in dark it reads 1.09 over white, under 4.5:1 on 68 % of the photograph and on all of the aurora. A firmer rung barely helps (the overlay rung: 70 % and 50 % of the photograph).
2. **The clamp cannot cure it.** It earns at most two steps of ink (α +0.08, `glass/veil.css:56-71`). In light it adds dark ink under dark words and lowers every reading (the photograph: 55 % under 4.5:1 becomes 65 %). In dark it pushes the right way, and two steps are far too few: 1.09 becomes 1.31 over white. More ink does not make a word legible over the far end of its mode; the card colour under the word does. *Amended in pass 4 (fold B3-6):* the light sentence overstates the clamp. The model put its ceiling under every pixel, but the clamp adds ink only past its knee, over a bright measured backdrop, and resolves exactly the rung's own ink at or below it (`glass/veil.css:37-40`). In light that ink lands where dark words already read, so the 65 % arises only where the one sample point is bright over a photograph that is dark elsewhere. The dark result stands.
3. **glass-ui's own lever holds.** `--glass-level` mixes a rung toward solid `--card` (`tokens/glass.css:165-174`). The least level at which a `--foreground` word holds 4.5:1 over the worst flat ground (black in light, white in dark) on the dock rung is 0.482 in light and 0.335 in dark (B). For 3:1, which icons and large words need, it is 0.599 and 0.496 (C) (`legibility.json`, `levels`). *Amended in pass 4 (folds A8, B3-8):* these are solved at the threshold, with no margin for glyph antialiasing, and for glass-ui's default colours only; §5.0 re-solves them at D3's 4.8 on D3's law. B holds 4.5:1 over every ground in both modes: its lowest readings are 6.31 on the photograph and 8.28 on the aurora in light, 5.91 and 5.77 in dark. C holds icons everywhere; for small words in dark, 7 % of the photograph and 35 % of the aurora fall under 4.5:1.
4. **Per rung the level barely moves.** It runs from 0.479 (wash) to 0.492 (overlay) in light and from 0.318 (wash) to 0.401 (overlay) in dark (`legibility.json`, `byRung`). Among the rungs chrome uses (dock, floating, overlay), the dock's is the strictest in both modes, so one level per mode holds every chrome rung with its own ink.
5. **The blur does not decide it.** Over the photograph at R3's three values, 7, 12 and 16 px, B's lowest reading is 5.76, 6.31 and 6.56 in light and 5.89 to 5.94 in dark; today's is 1.32 to 1.70 and 1.85 to 1.88 (`blurSweep`). The blur value is chosen by look, on R3.
6. **Secondary text does not hold on a translucent plate.** The muted ink on B reads 1.69 in light over black and 2.91 in dark over white. A mid-tone ink reads against black or white, never against the mid-tone a firm plate becomes over the far end of its mode. The dock already lifts its muted text to `--foreground` (`dock/styles/adaptive-legibility.css:47-48`).

#### 5.2 Q10: the four fits per surface, under one blur value

*Provisional until R3 and R3b return (pass 9).*

Each fit, read against the test:

- **(a) Apple's menu** (sim): a 53.5 % veil of rgb(253) in light, 65.1 % of rgb(49) in dark. B covers the backdrop with the card colour by 1 − level: 51.8 % in light, 66.5 % in dark, within 2 points of Apple's veil in each mode. The least amount of glass-ui's card that keeps glass-ui's words at 4.5:1 over any ground is, in amount, the veil Apple's menu carries. B takes that amount in glass-ui's own colours: the warm ink keeps its hue (R-O8) and the card is glass-ui's, so `restraint.md:28-30` and `:148` need no amendment, where R3's lane C, Apple's white wash, does. B also lets about as much of the page through: over the photograph it keeps 31 % of the backdrop's structure in light and 21 % in dark, against Apple's menu's 34 % and 26 % and today's dock's 63 % and 60 % (`transmission`, the archive's measure, [ARC] §5(i)). Apple's dark menu with glass-ui's off-white text reads 3.49 over white: the same amount holds 4.5:1 only with white text. *Amended in pass 4 (fold B3-10):* "within 2 points" counts the card layer only. With its ink, B covers 56.6 % in light and 71.2 % in dark, 3 and 6 points more than the fit's 53.5 % and 65.1 %. The amounts match by coincidence: B was solved for glass-ui's colours, not fitted to Apple's.
- **(b) Apple's bar body** (sim): it holds in light (4.71 over black) and fails in dark (1.59 over white; 98 % of the photograph under 4.5:1). Apple flips small bars with what is behind them instead (G7, refused). Its tone curve treats the three channels alike and would replace the ink (G2), and its two-part blur is not one `blur()` (G1). **Not taken.**
- **(c) The thick panel's two-part blur** (σ 6.7 and 21.7): it breaks law 1, and no single `blur()` reproduces it. **Not taken.**
- **(d) The Maps detent sheet** ([ARC]:20): structure 80 % kept, saturation +62 %. Today's dock is close to it (63 % kept, +8 %), and §5.1 shows it fails as chrome. *Amended in pass 4 (fold B3-4):* 63 % and +8 % are not close to 80 % and +62 %. It is the content band's end; the owner's "Too glassy is this card--too transparent" (C-59, `restraint.md:63-65`) rules it out for chrome.

**Decision.** *Superseded in pass 4 by §5.0; decisions 1 to 6 stand as pass 3's record. Decision 1's 12 px is struck (O-260, fold B3-1). Decision 2's content band is withdrawn (fold A3), and its chrome mix becomes D3's bound, solved for the ink the owner picks on R3b. Decision 3's second factor is withdrawn (fold A11). Decision 4 is R3b's B. Decision 6's "B is frost" is withdrawn (fold B3-4).*

1. **One blur value, 12 px, in both modes.** It is fit (a)'s light σ, between today's 16 px and the Maps sheet's 7, and "slightly less blur" (C-4, `restraint.md:63-64`). The dark menu's 8.4 is not taken: law 1 holds one value, and the plate's mix carries the words, not the blur (§5.1, item 5). R3 settles the value among 7, 12 and 16. The five radii (10 to 22 px, `tokens/glass.css:69-73`) become one, and the deep tier's boost (`tokens/glass-deep.css`, `glass/deep.css`) goes with them.
2. **Two bands.** The *chrome band* carries words over whatever the page scrolls beneath it: the dock, bars, menus, popovers, Select, Combobox and Command content, dialogs, sheets, toasts, tooltips and hover cards. It mixes its rung with the card at B's level, 0.482 in light and 0.335 in dark (the owner chooses B or C on R3b). The *content band* sits on the site's own ground (cards, panes, the controls' rest register, buttons and chips on the page) and keeps today's thin ink at level 1. A control placed over an image the site does not control, such as a button on a photograph, takes the chrome band. Rungs differ in ink only, in both bands.
3. **The level becomes the accessibility and site knob only.** Today it is also a firmness (BL's dark dock at 0.7, RU-93), and it scales the blur with it, so BL's dark dock blurs 11.2 px against 16 elsewhere (RULINGS-8, R8-6). The chrome's mix becomes a second factor. It multiplies the level where the plate is composed, at the element (`@utility glass-plate`, `glass/veil.css`), and never touches the blur. The level stays 1 by default, 0.3 under more contrast and 0 for opaque. Sketch: `material/sketch/material.next.css`.
4. **One ink on chrome.** Secondary text on a chrome plate takes `--foreground`, as the dock's text does today (`adaptive-legibility.css:47-48`); hierarchy on chrome comes from size and weight. A second ink would need a plate close to opaque (§5.1, item 6).
5. **An overlay is firmer than a control (G9)** by the band: every chrome plate is firmer than any content plate. Inside the chrome band a firmer rung adds ink at the same mix and still holds (§5.1, item 4). A plate keeps its rung while it moves (R-O7).
6. **For the owner, both ways.** C-59 asks for frost, not clear glass, and B is frost. C-5 asks for no grey surfaces (`restraint.md:66`). B's plates are the card colour showing through: oklch(0.950 0.011 71) on the warm page in light and oklch(0.249 0.017 60) in dark (`plateOnPage`). They are warmer than today's (chroma 0.007) and than Apple's grey menu (0.001), but the dark one is a dark warm brown that may still read as grey; R3b shows it. In dark, B is about as firm as the plate BL ruled more than "a bit" firmer (RULINGS-6, row 5: level 0.4, "Two thirds solid is not 'a bit'"). Nothing thinner holds a word over a white ground in dark. That is the owner's to weigh on R3b: B holds words everywhere; C is lighter and lets words fall under 4.5:1 over a bright photograph or the aurora in dark; BL's 0.7, due in 11.2.0, reads 1.90 over white.

#### 5.3 The luminance clamp (G7)

*Provisional, and conditional on the owner taking B or C on R3b.*

*Amended in pass 4 (folds A7, B3-6):* the deletion is D3's floor's (it deletes `useGlassBackdropLuminance.ts`, `backdropLuminanceSample.ts`, `--glass-backdrop` and the knee), carried by W-0.1 and W-H.1, and BM credits none of it. R3b now says that each letter replaces the dock's darkening that follows the page. The canvas path stays outside any BM removal until value.js and keyframes answer §5.8.

**Decision: the whole clamp goes in 12.0.0.** That means the composable, the sampler and its math (2,860 B gz, pass 1), the knee token, the `@property` registration and the clamp expression in `@utility glass-plate` (187 B), and GlassDock's mount (`GlassDock.vue:123-125`). The reasons are §5.1, items 2 and 3: the clamp's two steps of ink cannot carry a word over the far end of either mode, and the mix carries it without reading the backdrop at all. The canvas path goes too, so value.js's and keyframes' canvas handoff (`demo/shell/dock/Dock.vue:301`, `demo/app/dock/ChromeDock.vue:461`) needs no ground, and §3.2's open item closes.

The owner's request behind the clamp, as the dock's source quotes it, was "Glass dock over VERY LIGHT materials is unreadable, darken DYNAMICALLY like iOS 27" (`adaptive-legibility.css:16-18`). Apple's answer is the flip (G7). It needs the backdrop's pixels, which a page has only from a canvas it paints itself. A fixed mix is the answer a page can give over any ground, and it is no workaround.

If the owner keeps A, words over the far end of each mode fail in both modes. The only legitimate dynamic route left is then the canvas path, for pages that hand the dock a canvas; the static walk stays refused.

#### 5.4 Q13: the edge

*Provisional until R3b's edge pair returns, and the owner.*

*Amended in pass 4 (folds A10, B3-10).* The edge is W-R.1's §1 question 1 (one rim leg or none, with the shadow count), so the decision below is a proposal to it. Three corrections:

- The rim's inset legs are `--glass-material-rim` on every rung, so they also leave the card (`card/styles.css:79`), the avatar, the table, the slider, a dock tab, every capsule (`glass-capsule.css:67-68`, `:83-84`) and `.glass-control-edge`, the resting edge of input, textarea, number field, SelectTrigger and ToggleGroupItem (`control-edge.css:33-35`, `:53-58`). Fields keep their 1 px border (`field/control.css:100-102`). "BM changes nothing there" is withdrawn.
- Apple's rim reading is rida.dev's simulator fit of a menu (pcc@6405, sim), and MacRumors' darkened edge names no mode.
- On D3's law with no blur, the plate's stand-off is now measured over all five grounds (`material-fold.json`, `edge`, median). B in light stands 1.04 off white and 1.02 off the page; in dark 1.26 off the page and 1.30 off black, its lowest. The 8 % hairline stands 1.13 to 1.17 off the plate in light and 1.17 to 1.23 in dark. The cut between the modes is left to R3b's edge pair, which now shows the page, white, the photograph and the aurora.

**What is known.**

- Apple's measured menu rim darkens in light mode only (pcc@6405). iOS 27 adds "a darkened edge around Liquid Glass elements" (MacRumors).
- The owner wants a crisp edge and no halo (the dock-halo order). He also said: "Some docks have this distinct black border, which is totally wrong."
- Today glass-ui draws a hairline of `--foreground` at 4 to 8 % (8 % on the dock, `tokens/glass.css:225-232`). On top of it sit the rim's inset legs: a 10 % white catch-light at the top and under-shade legs of the foreground (`tokens/glass-fx.css:100-105`, `tokens/dark-arm.css`).

**Measured** (`legibility.json`, `edge`, with the 8 % warm hairline). In light, B's plate stands 1.12 off the warm page and 1.14 off white, and the hairline stands 1.17 off the plate. In dark, B's plate stands 1.23 off the page by itself, where today's dark dock stands 1.00: it does not stand off the page at all.

**Decision.**

- **One edge on chrome, in light only.** It is the warm hairline at 8 %, drawn as the plate's border and never as a shadow layer (G5). In dark there is none, because the plate stands off the page by its own colour. Apple's measured rim does the same.
- **The rim's inset legs go** (213 B gz). The top catch-light is a specular (G4, `restraint.md:50-52`), and the under-shade legs are inner shading. atlas reads them in its own shadow lists with a `#0000` fallback (`PlateDial.vue:283-284`, `PlateDock.vue:644-645`), and daraksha zeroes them (`HeadDock.vue:180-181`).
- **Under more contrast**, which Safari exposes from 14.1, the edge shows in both modes at about half the foreground. That is the 3:1 against the plate that WCAG 1.4.11 asks; it is arithmetic, and pass 10 measures it. The selected mark takes the same border, which is A3's contrasting border and value.js's "the selected item still reads without the lens" ([IN value.js 5]). *Amended in pass 5 (§7.6):* the chosen option takes it, as a 1 px `outline` inset on the option, not on the mark: the mark is a window whose fill runs past its visible end (§6.3), so a border on the fill would be cut there. *Amended in pass 6 (folds A5-10, B5-2):* struck back. The mark is a plain capsule under the proposed letters, so the border goes on the mark, at the perimeter rung, and travels with it; `outline` stays the focus ring's (§7.6).
- **Content plates in dark** do not stand off the page either (today's resting rung: 1.00), so in dark their edge is the elevation shadow's (G6). BM changes nothing there. Whether the shadow is enough is the owner's, on the pages pass 10 builds.

#### 5.5 Q14: Reduce Transparency and the Liquid Glass setting

*Provisional until the owner.*

*Amended in pass 4 (folds A9, B3-9).*

- The firmer default reaches chrome only; content follows D3's content rungs.
- The route holds for chrome with A or B on R3b, each solved to hold a word over any ground. With C, small words can fall under 4.5:1 for these readers as for everyone.
- The token per release: through 11.x a site's switch writes `--glass-level: 0` and `--glass-level-dock: 0`, since the dock reads its own from 11.2.0 (`RULINGS-8.md:132-133`); from 12.0.0, one token if W-0.1 folds the dock's into it.
- At level 0 a plate's `backdrop-filter` resolves to `none`, not `blur(0px)`, which is still a backdrop layer (inference from [IOS §2.3]). That is a note for W-0.1.

**What is known.**

- Safari exposes no `prefers-reduced-transparency` (BCD `media.json:L1926`; `MediaQueryFeatures.cpp`, [IOS §2.1]), so glass-ui's rule (`a11y-fallback.css:20-25`) never fires there.
- iOS 27's Liquid Glass setting (More Clear, Default, More Tinted) has no media feature either [IOS §1.10, §2.1].
- `prefers-contrast: more` is exposed from Safari 14.1.
- rida.dev handles neither (`read/rida-ui.md:338`).
- value.js asks that reduced transparency turn the glass opaque [IN value.js 5]. It already writes `--glass-level: 0` under the media query (`demo/styles/foundation.css:1081-1083`), which never fires in Safari.

**Decision.**

- **The firmer default carries Safari's readers.** B is the material for every reader, not a stand-in for the missing signal, so it is not a masking fallback. A reader with Reduce Transparency on gets chrome whose words hold 4.5:1 over any ground, whatever Safari tells the page.
- **The media rule stays as it is**, for any browser that exposes the feature.
- **A site's own setting writes one token**, `--glass-level: 0`, on its root. Every plate turns opaque, and the blur drops with it because the level still scales the blur. glass-ui documents the token and ships no settings control. A site with a settings surface (value.js, daraksha) adds the switch there. There is no user-agent sniffing.
- **The Liquid Glass setting has no route.** Safari readers get the site's default whatever they set there.
- **Increase Contrast keeps its bracket** (level 0.3) and gains the edge in both modes (§5.4).

#### 5.6 The bytes (Q17), and who names the tokens that change

**Bytes** (`material/ledger.mjs`, `ledger.json`). The CSS is cut from the 11.1.0 dist the sites load, as in pass 1, and each figure is a standalone `gzip -9`, an upper bound inside a site's sheet.

| Change | gz bytes | Reaches | Release |
|---|---|---|---|
| Four of the five blur radii and their composed recipes | −76 | every site | 12.0.0 |
| The deep tier | −355 | every site | 12.0.0 |
| The rim's inset legs (tokens only; each shadow list that reads them also loses a layer, uncounted) | −213 | every site | 12.0.0 |
| The clamp's CSS (knee, registration, the clamp in the plate) | −187 | every site | 12.0.0 |
| The clamp's script (pass 1) | −2,860 | every site that mounts GlassDock (all eight checkouts, §3.1) | 12.0.0 |
| The material sketch, whole: one radius, the chrome mix, the edge, the plate, two brackets | +385 at most (its plate rule and brackets replace rules that ship today) | every site | 12.0.0 |
| **Net** | CSS −446 or better; script −2,860 | | |

*Amended in pass 4 (folds A7, B3-2):* every row above is BL's. The radii and the rim legs are W-R.1's (questions 4 and 1), and so is the deep tier; the clamp is D3's (W-0.1, W-H.1). They stay listed for the record and are credited to BM nowhere. BM's material code is withdrawn (§5.0), so its material net is 0 B and Home Assistant's entry is untouched by §5. The census below stays as input for W-0.1 and W-R.1.

**Census** (`ledger.json`, `census`, at the refs of §3.1; Home Assistant now at `master@1c0b560a`):

- **Blur tokens by name.** value.js `demo/styles/shell.css:743-747` (`--glass-blur-resting` and its radius); daraksha `src/shell/SiteDock.vue:542-543`; Home Assistant `frontend/src/styles/tokens.css:69` and `tiles/css/sheet.css:20` (`--glass-blur-floating: none`); keyframes defines its own `--glass-blur-subtle` (`scripts/build/vite/critical-css.ts:61`). Under one value each reads `--glass-blur`: a clean break, no alias.
- **The deep tier.** No site names it, and no site passes Surface's `deep`. glass-ui's primary Button composes it (`Button.vue:123`) and loses its 5 px boost.
- **The rim legs.** atlas (8 lines in `PlateDial.vue` and `PlateDock.vue`) and daraksha (`HeadDock.vue:180-181`).
- **The clamp's CSS.** No site; one comment in atlas.
- **The veil tokens.** value.js (`ComponentSliders.vue:294-305`, the quiet and wash rungs); daraksha (`HeadDock.vue:172-173` sets the dock and wash veils to 0; `ControlsSeat.vue:183`); Home Assistant re-points the ink (`tokens.css:33`, `tiles/css/plate.css:179`); gaggle's are prototypes only.

Home Assistant's ink and card are its own, so B's levels, computed on glass-ui's, must be recomputed for its tokens. That is owed to pass 10.

#### 5.7 The reading page

Each page follows the contract of §3.6.

| Page | Shows | Send back | Decides |
|---|---|---|---|
| `R3b.html`, Glass Word Legibility (*rebuilt in pass 4, folds A1, A2, A4, B3-3, B3-5, B3-6, B3-7, B3-10*) | Three chrome panels per background, each a dock pill (a selected seat and the word "Library") above a two-row menu with one highlighted row in today's fill. The backgrounds are white, black, grey, the photograph twice and the aurora. No panel blurs (O-260). A is D3's floor (the muted ink's bound, with a grey second line); B is one ink (the foreground's bound); C is for icons (the foreground at 3.3). One note says each replaces the dock's darkening that follows the page, and that in Dark A and B are firmer than the dock he turned down. Then B with and without the hairline over the page, white, the photograph and the aurora. No figure is printed. Built by `pass-4/fold/build-r3b.mjs` | Per background, the letters whose small words he cannot read, in Light and in Dark; the letter to ship for each mode; "with edge" or "without" for each mode | The ink the chrome bound holds (§5.0); Q13, as a proposal to W-R.1 |

R3 still decides the blur value, and how close the frost is to Safari's own bar. *Amended in pass 4 (folds B3-1, B3-7):* it decides neither. O-260 sets the blur, and each R3 lane changes blur, saturate and veil together, so a pick names a tint family only. R3 is held unpublished.

#### 5.8 Questions for the sites

- **value.js and daraksha (Q14).** *Amended in pass 4 (fold A9): sent through BL, after BL's message on `--glass-level-dock` (`RULINGS-8.md:841`), not on its own.* Safari never tells a page that Reduce Transparency is on. glass-ui would document one token for a site's own setting: `--glass-level: 0` on the root turns every glass plate opaque. Would colour and daraksha offer that switch in their settings, and where? Your `foundation.css:1034-1039` sets the level to 0.1 under more contrast, where glass-ui sets 0.3; should yours stay?
- **value.js and keyframes (G7).** Your docks hand GlassDock a canvas (`Dock.vue:301`, `ChromeDock.vue:461`) so the luminance clamp can read it. If the clamp goes in 12.0.0, does that canvas handoff serve anything else?
- **atlas (Q13).** `PlateDial.vue:283-284` and `PlateDock.vue:644-645` put glass-ui's rim legs into your own shadow lists. The legs go in 12.0.0. Do those plates need any edge in their place, or does the one border on chrome serve?
- **daraksha (Q10).** The head dock sets its veils to 0 (`HeadDock.vue:172-173`) and zeroes the rim (`:180-181`). Under the chrome mix it would carry the card colour at about half strength in light and two thirds in dark. Is the head dock chrome, meant to keep a word readable over the reading text, or should it stay clear?
- **Home Assistant (Q10, Q14).** `tokens.css:69` and `tiles/css/sheet.css:20` set `--glass-blur-floating: none`, and `tokens.css:84-85` sets `backdrop-filter: none`. Which surfaces are these meant to flatten? Under one blur value the token is `--glass-blur`. Should a sheet with no blur still take the chrome mix (about half card colour), or be opaque?

#### 5.9 Readings owed, and what pass 3 did not do

| Reading | Where | Owed to | For |
|---|---|---|---|
| The letter closest to Safari's own bar, in Light and in Dark | `pages/R3.html` | the owner's iPhone | Q10: the blur value and the frost |
| The letter to ship over the five grounds, in Light and in Dark; edge or none, for each mode | `pages/R3b.html` | the owner's iPhone | Q10: the chrome mix; Q13 |
| The nine pages at 390 and 1440 px, light and dark, every control pressed once | `check/page-check.mjs` | headless Chromium, after a reboot | the page contract |
| B's levels for Home Assistant's own ink and card | `material/legibility.mjs` with HA's tokens | pass 10 | Q10 at HA |
| The more-contrast edge's alpha, measured | — | pass 10 | Q13 |
| A menu beside Safari's own menu, in Light and in Dark (added in pass 4, fold B3-7) | pass 8's page | the owner's iPhone | the overlay half of §5.0 |
| Each state fill (hover, current, press, the segmented indicator against its track, a menu's highlighted row) against each R3b letter, in both modes (added in pass 4, fold A4) | `material-fold.mjs`, extended | pass 5, with the mark's fill | law 10 on chrome |
| The sites' resolved bounds under their own `--card` and `--foreground` (added in pass 4, fold B3-8) | the sites' built CSS | pass 10 | §5.0 at each site |

- **Every browser run was refused** on the kernel zone: three attempts from 18:40 to 18:58, at 13.83M, 13.87M and 13.90M (`pass-3/retry.log`). The second came 8 minutes after the first, under the 10-minute floor; the third kept it. The count falls only on a reboot, so the check is owed, with its command at the head of `check/page-check.mjs`. All nine pages pass the static contract check (`check/static-check.json`), and all nine scripts run through start-up and two presses of every control against a stub DOM with no error (`check/stub-run.mjs`). Neither says anything about layout or paint.
- **The legibility test is a model**, not a device reading. It assumes WebKit blurs and saturates in gamma sRGB and composites the plate over the result, which is the order the CSS specifies. R3b is its device reading.
- **No library source was edited**, and no prototype needed glass-ui's build, so the `bm/study` worktree was not made.

---

## Pass 4 (2026-11-22, claude-opus-5-5): shape

**No iPhone reading has returned** (`READINGS.md`: none published, none returned). R1 and R7, which this pass folds, are unread, and P4-bud is new, so Q1's decision and the Q19 proposal below are provisional until pass 9. Every browser run of this pass was refused on the kernel zone (`pass-4/retry.log`). The shape figures are geometry computed in Node, and the thread each lane runs on is WebKit's split from its source (UNION I12), not a reading.

Pass 4 first folded pass 3's two critiques (`pass-3/fold.md`: 21 objections, 18 accepted, 3 accepted in part, none rejected; corrected in pass 5, fold B4-10, from "17 accepted, 4 accepted in part"). The amendments are marked "amended in pass 4, fold …" where they land in §1 to §5 and on R3b and P2-scroll. The largest is §5.0. BM stops designing the material, which BL's D3 floor and the owner's O-260 already decide, and keeps one question for the owner. That fold also gives this pass its premise: **from 12.0.0 no chrome surface samples a backdrop.**

Working files, all under `pass-4/`:

- `fold/`: the fold's computations. `material-fold.mjs` and `material-fold.json` (§5.0); `build-r3b.mjs` (R3b rebuilt); `sketch/scroll-chrome.next.css` (fold A5).
- `shape/geometry.mjs` and `geometry.json`: every lane's outline against the ideal, frame by frame, and its cost and counts.
- `shape/sketch/`: `capsule-window.next.css`, `bud-bloom.next.css`, `bud-windows.next.css`. These are design sketches, not library source.
- `shape/probe.mjs`: the page's own work per lane in headless Chromium. Written and owed (refused).
- `check/`: the page checks with P4-bud added (`static-check`, `stub-run`, and `page-check`, which also takes the P4-bud strips). The page check is owed (refused).
- `retry.log`: the refusals.

### §6 Shape

#### 6.1 R1 and R7, folded with O-260

R1 asks whether WebKit's backdrop follows a clip or a non-uniform scale: the O-132 frame, "a squared rounded rectangle, with a darker square ghost" (`docs/release-10.1.5/inbound-O-132.md:5`). R7 asks whether glass should arrive at full strength by opacity and scale or by its frost rising from nothing. Neither has returned.

O-260 changes what both decide. From 12.0.0 the floating and overlay rungs sample no backdrop (§5.0). Those rungs carry every surface that changes shape: the dock's fold, a menu or popover out of its control, a dialog, a sheet and the theme seat's split. So the ghost R1 looks for can arise only while chrome still blurs, which means 11.3.0, where BM's new parts land by the charter. No content plate in BM's scope changes shape.

So the shape channel is chosen on three grounds: what a person sees of the corners, which thread runs it, and restraint's ceiling. The backdrop adds one condition, for 11.3.0 only. A channel whose backdrop R1 or P4-bud shows spilling past its round edge waits for 12.0.0's chrome.

*Amended in pass 5 (fold B4-4):* "every surface that changes shape" reads "every one but the dock". The dock reads the resting rung (`shell.css:58`), which O-260 sets to 8 px, and a zero radius still composes a backdrop layer (`blur(0px) saturate(1)`). The 12.0.0 path for the fold and the split is conditional on two changes sent to W-R.1 and BL (§3.9): the dock's `--dock-surface-blur` moves to the zero rung, and a zero rung is written `backdrop-filter: none`.

#### 6.2 A control growing into its panel, five ways

The brief's motion: a 44 px seat (a circle, radius 22) grows into a 250 × 188 menu panel (radius 16, `--radius-card`, `overlay-plate.css:64`; 188 is four 44 px rows and two 10 px pads), anchored at the seat's corner. The ideal at progress p is a rounded rectangle 44 + 206p wide and 44 + 144p tall, with a circular corner that runs from 22 to 16. Each lane's outline is compared with that ideal at 21 steps (`shape/geometry.json`, `bud`). Each lane is built on `pages/P4-bud.html`.

| Lane | What moves | Corners as drawn | Largest gap from the ideal | The edge while it moves | WebKit thread | Page work each frame | Nodes added | Animations per open (the menu) | Properties per node |
|---|---|---|---|---|---|---|---|---|---|
| A, stretched | the full panel's `scale`, from the seat's corner | ellipses 16·sx × 16·sy. At frame 0, 2.8 × 3.7 px: the seat's circle drawn as a near-square | 7.79 px at frame 0, 3.88 px midway | thinned to 0.18 px at frame 0 | compositor | none | 0 | 2 (the scale, the content's fade) | 1 |
| B, resized | `width`, `height`, `border-radius` | exact | 0 | 1 px throughout | page | style, layout, paint; in 11.x the backdrop re-rendered | 0 | 4 | 3 |
| C, cut | `clip-path: inset(… round r)` over the full panel | exact | 0 | none on the growing sides until the clip reaches the panel's box | page | style and the clip's path (no layout) | 0 | 2 | 1 |
| D, windows | three windows of the panel's own shape and the plate, by `translate` | the panel's own radius, 16, at every frame | 2.49 px at frame 0 (16 against the seat's 22), 1.24 midway, 0 at rest | only on the plate's own two sides until rest | compositor | none | 2 | 4 | 1 |
| E, fades in | the panel's `opacity` and a uniform `scale` 0.96 → 1 from its control | the panel's own, scaled: circular at every frame | not a bud: it never takes the seat's shape | 1 px, scaled by at most 4 % | compositor | none | 0 | 2 | 2 |

The shadow follows the same split. A clip, whether C's or D's windows, also clips the plate's own shadow until it reaches the panel's box. C must then extend its clip concentric past the box or lift it at rest. D's windows clip the shadow for as long as they exist, unless the shadow is drawn outside them. B and E keep the shadow whole, and A stretches it.

*Amended in pass 5 (folds A4-5, A4-7, B4-3).*

- **The shadow, as sketched.** D's plate is a `::before` inside a root with `overflow: clip`, so its shadow never shows; on the root instead it would stand at full size around a panel that is still a seat. C takes 11.1.0's bleed, a clip extended 2rem past the plate (`reveal.css:275`), so the shadow is inside the clip when it lets go; "lift it at rest" was a cut and is struck. P4-bud now draws the one elevation shadow on every lane, so D's missing shadow shows.
- **The thread column assumes the single-curve tokens.** The sketches ease on `--spring-*`, which are 48-stop `linear()` curves today, so in 27.2, every iOS 26 Safari and Home Assistant's WKWebView every lane above runs on the page's thread. "Compositor" for A, D and E holds only if the owner takes the single-curve tokens (§4.3) and R2's lane D glides. Under today's tokens E's advantage over C is smaller: both are timed on the page's thread, E sets a layer's transform and opacity each frame, and C also rebuilds its clip path each frame.
- **Per press, not per open** (law 4). A press that opens a menu also brings the trigger's plate to its held fill (W-B.17 R-14, "a trigger while its popup is open"). Per press in the library: C as today's grow, its rows at full opacity from the first frame, **2**; C with a row fade, A and E **3**; B and D **5**. On P4-bud, where each lane is born over its seat, the seat's hand-off adds one to A to D. Only today's grow is within the ceiling. §7.4 writes the rule for the owner: a panel entrance that moves two properties needs the trigger's plate to stand down on that press.

#### 6.3 A capsule that changes width: the window is exact

A capsule plate at its widest, seen through a window of the same capsule, is a capsule at every width, when the window's `translate` sets one end and the plate's sets the other. On a quarter-pixel grid, at 21 widths from 236 to 52 px, the visible region and the ideal capsule disagree nowhere (`geometry.json`, `F_window`). Scaling the same capsule bends its ends to 5.7 × 26 px at the disc, 7.28 px from round (`G_scale`). When the window is the part's own element and the glass its `::before`, nothing is added: one property per node and two animations per change, both on the compositor (`shape/sketch/capsule-window.next.css`). Pass 2's ScrollProgressRim window (§4.4) is the same mechanism with a square clip.

*Amended in pass 5 (folds A4-3, A4-4, B4-5, B4-8).*

- **"Nothing is added" holds for a part with no content:** the selection mark. On the dock the sketch put `overflow: clip` on the part's own element, which clips every seat at rest (against C-30, "Nothing clips") and rebuilds the triple identity wi8 cured: "`.glass-dock` was SIMULTANEOUSLY the glass surface, the morph clip aperture … AND the interactive item container" (`dock.css:4-29`). For the dock the window is wi8's own plate, `.dock-plate`, a sibling of the controls, with the glass on its `::before` (free in wi8; the plate's `::after` is the paper grain, `dock.css:207`). No seat is inside it. The seats' motion through the fold is wi8's own (the controls clip on the morph axis while the dock morphs, `shell.css`) and is pass 7's to count with the window. P4-bud's F draws this structure; its dots fade on their own legs, which the page counts.
- **The box and the hit region at the folded rest.** Folded, the window stands translated by the fold's travel (184 px on P4-bud), so its box spans 236 px for a 52 px disc, and `getBoundingClientRect` reports it. The window takes `pointer-events: none` and its `::before` takes `auto`; the window's rounded clip bounds the `::before`, so the hit area is the visible disc. Whether WebKit hit-tests a pseudo-element under a host with `pointer-events: none` this way is `pass-4/critique-B-check.mjs`'s second cell, owed. The dock's root never moves, the rim's rule (§4.4). No node is added, since `.dock-plate` exists. The atlas question (§6.8) now covers the plate's box at the folded rest.
- **Every use below is conditional:** each holds if P4-bud's F holds on the owner's iPhone (§6.4 item 1).

Where it serves:

- **The dock's fold, stadium to disc** (F7, T8). It replaces wi8's per-frame writes of the plate's `inset` and `border-radius` and each region's `clip-path`, the third seam off P7's spine. Pass 7 maps it onto wi8's elements once 11.2.0 ships; BL is asked which element can be the window (§6.8). *Amended in pass 7 (§9.4):* mapped. The plate is the window, and the controls' element is a second window during the change, so the seats are cut by the edge and do not fade; BL is asked whether wi8's tree allows it (§9.10).
- **The selection mark's width between content-sized slots** (Q15). A capsule mark can change its width on the compositor with exact ends. Equal slots are then no longer needed to keep the mark on `translate` (law 5), and the strips whose boxes atlas's suites check keep their content-sized slots. That is pass 5's.
- **The theme seat's split from the bar** (F3, F8). ~~Pass 7's.~~ *Answered in pass 7 (§9.3):* the seat slides out from under the disc on the window's own legs.
- **The run's caps** (I13, which pass 2 handed on). A corner whose radius changes can ride neither `translate`, which keeps the radius, nor `scale`, which bends it. The accelerated route fails, and pass 2's still clip stands (amended in §4.4).

#### 6.4 Q1, decided (provisional until R1 and P4-bud, pass 9)

1. **A capsule that changes width takes the window** (§6.3): the fold, the mark's width and the split. Its ends are exact and it runs on the compositor with no node added. It ships in 11.3.0 if P4-bud's F, with Frost on, shows no square patch on the owner's iPhone. Otherwise it waits for 12.0.0, when chrome has no backdrop.
2. **Stretching and resizing are refused for every shape change.** A's first frame is the square-cornered plate the owner saw in Safari, and its edge thins to a fifth of a pixel. B lays the page out every frame and changes three properties on one node (laws 4 and 5; P5, "Layout properties never animate").
3. **A control growing into its panel has no lane that passes every law.** The proposal for the owner, on P4-bud:
   - **E is the default.** The panel enters at its own size by opacity and a 0.96 scale from its control, on the present row's single curve (`shape/sketch/bud-bloom.next.css`). It needs one node, two properties and nothing added, all on the compositor, and is within P2 and restraint's ceiling. It is today's menu entrance (`motion-registers.css:76-81`) with the `clip-path` strip, the slide and the blur leg taken out. It does not take the control's shape. Atlas quotes the owner asking for "tips and menus that bloom from their anchor; state changes that morph instead of cutting" (atlas `docs/precepts/README.md:95-99`, [IN atlas 2]). E is the bloom from the anchor. It is not iOS 27's morph out of the button, which D and C are.
   - **D is the morph within law 5.** Its corners hold the panel's radius on the compositor at every frame. It adds two wrappers for a motion (the ceiling is 0) and runs four animations per open (the ceiling is 2), and its edge and shadow show only at rest (`shape/sketch/bud-windows.next.css`). It also needs the panel's size less the control's, read once per open. It ships only if the owner amends the ceiling for this one primitive.
   - **C is the morph with nothing added.** It is exact and within the ceiling, but `clip-path` runs on the page's thread in WebKit (P5's draft forbids it for a body's travel), and its backdrop in 11.x is unread (R1's B and C). It ships only if the owner amends P5 for it.

   UNION F9's "the plate starts at the control's box and grows into the panel as one plate" is not adopted as written. Under law 5 and the ceiling the panel enters as E, unless the owner takes D or C. The spring row, the exit and the neighbour that yields stay pass 8's (Q9).
4. **The backdrop in 11.3.0.** D and F rest on WebKit clipping a backdrop by an ancestor's rounded `overflow: clip`, which no source the reads cite settles. P4-bud reads it with Frost on. Neither an `overflow: clip` nor a `translate` on an ancestor makes a backdrop root (MDN's list, [IOS §2.2]), so the plate's blur still samples the page. C rests on R1. A lane that spills waits for 12.0.0.

*Amended in pass 5 (folds A4-1, A4-3, A4-8, B4-1, B4-3, B4-4, B4-7). Items 1 to 3 are restated; item 5 is new.*

1. **The window's two release paths.** It ships in 11.3.0 only if P4-bud's F, with Frost on, shows no square patch **and** F's frost looks like G's: a window whose blur silently stops would pass the first test alone, and that would be a masking fallback. Its 12.0.0 path is conditional on F with Frost off (WebKit clipping a translated `::before` by its translated, rounded parent, backdrop or not) and on §6.1's two conditions for the dock. For the dock the fold's shape stays open until pass 7 counts the seats' motion through it (§6.3).
2. **Stretching and resizing are refused for every shape change** (unchanged). The squared caps of the O-132 frame match a non-uniform scale in value.js's trace, which is Playwright WebKit 26.4, not Safari: elliptical caps rx 3.6 against ry 28 px while the root scaled, and a radius snap at settle (`docs/release-10.1.5/inbound-O-132.md`, the addendum). That trace did not name the "darker square ghost", which stays unread for every lane.
3. **A control growing into its panel: the shipped grow stands until the owner rules.** Today's menu grows from its trigger by a rounded clip with its opacity at 1 from the first frame (`reveal.css:106-121`, `:267-292`), by the owner's O-171 of 2026-11-05, "every height and width animated, no needless fade" (BL `audit/INBOUND.md:146`; R-1, shipped in 11.1.0). Pass 4 named E the default and called it "today's menu entrance … taken out"; both are withdrawn. E fades the menu in and scales it, which reverses O-171, and a study law never cuts an owner order (§1). The three lanes go to the owner as a conflict between his rulings, with no default named:
   - **C, today's grow started from the button**, keeps O-171 and the ceiling (2 per press, §6.2). It breaks `restraint.md:143` (2026-11-09, "Transform and opacity only"), and its clip runs on the page's thread in WebKit.
   - **D, the windows**, keeps O-171 and line 143. It breaks the wrapper ceiling (two nodes added for a motion) and the press ceiling (5 per press).
   - **E, the fade**, keeps line 143 and runs within the ceiling only if the trigger's plate stands down on that press (3 per press otherwise). It reverses O-171's "no needless fade", and it never takes the control's shape, which value.js, gaggle and Home Assistant asked for ([IN value.js 2; gaggle 2; HA 2]).
   
   On today's `linear()` tokens all three are timed on the page's thread in 27.2, iOS 26 and WKWebView. On the single-curve tokens D and E move to the compositor and C does not. E as the library would build it is restated on `.glass-reveal`, whose `@starting-style` and keyframe exit already ship (`pass-5/fold/sketch/bud-bloom.next.css`, fold B4-2).
5. **Reduced motion, per channel (new).** A bud under reduced motion appears at its rest shape by an opacity fade of 150 ms, with no geometry, in every lane. The window's fold has two forms, which go to the owner under law 7: BL's R-11 (the plate's shape lands in one frame and the content fades over 100 ms, `W-I.8.md:145`), which cuts the shape; or the plate's opacity dips for 100 ms, its translate lands while hidden, and it returns over 100 ms, which cuts nothing and dims the plate for 200 ms.

#### 6.5 Q19, a proposal for the owner (R7 unread)

**Keep `restraint.md:143`, "Transform and opacity only."** Glass arrives at full strength by opacity and scale, which is R7's A.

- From 12.0.0 the chrome that enters and leaves (the dock, menus, popovers, dialogs, sheets and toasts) samples no backdrop (O-260). A `backdrop-filter` rising from `none` has nothing to act on there. The content plates that keep a blur are not presentations.
- In 11.x a rising frost changes the blur value during the motion (discrepancy 6). ~~Its `backdrop-filter` transition also runs on a `linear()` spring curve, which WebKit hands to its compositor only from 27.3 (I22).~~ *Struck in pass 5 (fold B4-3): R7 runs both its lanes on `linear()`, so that condition does not separate them.*
- The toast's vaporize, which drives `backdrop-filter` from two registered properties (`dissolve.css:60-72`), is the one shipped part the P5 draft breaks (§4.6). The toast composes `.glass-floating`, so under O-260 it has no backdrop to vaporize from 12.0.0. Whether it keeps its vaporize through 11.x is the owner's, with R7.

R7 stays on the owner's list to overrule this. His B would apply to 11.x chrome only.

#### 6.6 Bytes (Q17)

Measured as standalone `gzip -9` of each sketch with its comments stripped (an upper bound inside a site's sheet):

| Change | Adds | Removes | Release |
|---|---|---|---|
| The menu's entrance as E | ≤ 190 B; the `--enter-menu-*` register it reads already ships | the `clip-path` strip, 346 B (§3.2) | 12.0.0 (a default every consumer sees) |
| D instead, if the owner takes it | 268 B, plus the size read per open | the strip, 346 B | 12.0.0 |
| The capsule window, per part | 220 B | wi8's private fold integrator (unmeasured; pass 7). For the mark it is part of the writer §3.2 already prices (about 600 B, replacing `useDockRunMark`'s 1,349 B) | 11.3.0 for the window; the removals in 12.0.0 |

E nets between −156 and −346 B in every site's sheet, Home Assistant's 0.2 kB entry margin included. The window's 220 B arrives with the parts that use it, and pass 10 closes each per entry.

*Amended in pass 5 (folds A4-6, B4-2, B4-9).*

- **No net is claimed.** Every figure in the table is a standalone `gzip -9`, an upper bound on both sides, so the difference bounds nothing; Home Assistant has no sheet, its CSS rides its entry's script (§4.7). The per-entry net is pass 10's, from built bundles. The sentence above is withdrawn.
- **E restated** on `.glass-reveal` (fold B4-2) adds no rule of its own: it changes the menu register's neutral lines (`reveal.css:116-120`) to read `--enter-menu-scale` (0.96, `motion-registers.css:79`, read by nothing today) and sets `--enter-menu-blur` and `--enter-menu-slide` to 0 (today 2px and 0.5rem, `:80-81`), and it removes the grow and recede rules and keyframes (the strip, ≤ 346 B). E is no longer proposed as a default (§6.4 item 3).
- **The window's payer, measured.** wi8's plate path in `useDockBody.ts` (the plate's `inset` and radius writes, each region's `clip-path`, `currentRadius`; lines 899-908 and 1011-1170) is ≤ 1,356 B gzipped, of ≤ 7,431 B for the composable (`pass-5/fold/measure-integrator.json`). The window (≤ 225 B by the critics' measure) and that path's deletion land in one release, 12.0.0: the glass moves to the plate's `::before`, and consumers style `.dock-plate`. 11.3.0 carries no second fold engine.

#### 6.7 What a person sees

- ~~**A menu opens** where it will rest. It fades in and settles from 96 % of its size toward its button over 0.2 s, with its own corners, edge and shadow all the way. Nothing sweeps, cuts or squares. If the owner picks D, the menu grows out of the button through rounded windows instead, its corners round throughout, and its edge and shadow land when it does.~~ *Restated in pass 5 (folds A4-1, B4-1):* **a menu opens** as it does today, growing from its button with its rows at full strength from the first frame, until the owner picks on P4-bud. If he picks D, it grows out of the button through rounded windows, its corners round throughout and no shadow until rest; if E, it fades in at its own size from 96 %.
- **The dock folds** with both ends round at every frame. It narrows from one side to a circle and keeps gliding on a busy page. ~~The square-cornered frame the owner reported in Safari (O-132) has no lane that draws it.~~ *Restated in pass 5 (fold B4-7):* no lane draws the squared plate by its geometry; whether F or D draws the darker ghost is P4-bud's reading.
- **On a busy page**, A, D, E and F keep gliding where B and C stall. That is the inference from WebKit's split (UNION I12), and P4-bud's Busy page reads it on his iPhone.

#### 6.8 Readings owed, and the questions

| Reading | Where | Owed to | For |
|---|---|---|---|
| The letters whose corners stop looking round or show a square patch; those that stutter with Busy page on; the one that best grows out of its button; then F or G for the fold, all with Frost on and off | `pages/P4-bud.html` | the owner's iPhone | Q1 (§6.4); the 11.3.0 condition (item 4) |
| The ghost under a clip or a stretch | `pages/R1.html` (unchanged) | the owner's iPhone | §6.4 items 3 and 4 |
| A or B for how glass arrives | `pages/R7.html` (unchanged) | the owner's iPhone | Q19 (§6.5) |
| The page's own work per lane, in Chromium | `shape/probe.mjs` | headless Chromium, after a reboot | §6.2's page-work column, in one engine |
| The ten pages at 390 and 1440 px, light and dark, every control pressed once, and P4-bud's strips (each lane held halfway, the fold midway) | `check/page-check.mjs` | headless Chromium, after a reboot | the page contract; §6.2 in pictures |

Questions for the sites (the orchestrator sends them):

- **BL (the glass-ui dock session).** After 11.2.0, BM proposes that the dock's fold be a capsule window (§6.3): the dock's plate at its open width, seen through a capsule window of the same size, each moved by `translate`, with no per-frame `inset`, `border-radius` or `clip-path` writes. In wi8, which element could be the window without adding one, and does any region's `clip-path` need to survive the fold?
- **atlas (box identity).** A menu would open by a fade and a 0.96 scale from its trigger, and a dock would fold by a `translate` of its own element and its glass. Neither moves a layout box, but `getBoundingClientRect` includes transforms. Do your suites read the open menu's box during its first 0.2 s, or the dock root's box during a fold? *Restated in pass 5 (fold A4-4):* the dock's root never moves. Its plate (`.dock-plate`) would move by `translate`: folded, the plate's box would reach 184 px past the visible disc at rest, though only the disc takes taps. Does a suite of yours read the plate's box, folded or folding, or only the root's?
- **Every site that opens a glass-ui menu.** The `clip-path` strip that uncovers a menu today would go in 12.0.0 (§6.6). Does a suite of yours read a menu's computed `clip-path`, or wait on its `transitionend`?

#### 6.9 What pass 4 did not do

- **Every browser run was refused** on the kernel zone: three attempts from 19:38 to 19:52, at 14.04M to 14.09M (`pass-4/retry.log`). I stopped there, since the count falls only on a reboot. The page check, P4-bud's strips and the Chromium probe are owed, with their commands at the head of each script. All ten pages pass the static contract check (`check/static-check.json`), and all ten scripts run through start-up and two presses of every control against a stub DOM with no error (`check/stub-run.mjs`). Neither says anything about layout or paint. The second attempt came under the 10-minute floor, which the log records.
- **No library source was edited.** No prototype needed glass-ui's build, so the `bm/study` worktree was not made. The sketches are design sketches.
- **The theme seat's split and the neck** are pass 7's, on R4. With no backdrop on chrome from 12.0.0, a filter on the fusing plates no longer kills a blur (F2's reason for refusing the goo filter). Pass 7 weighs that, against `filter: url()` being CPU work in WebKit (`Page.cpp:L5281-5303`, [IOS §2.2]). *Answered in pass 7 (§9.2):* the goo is put to the owner for 12.0.0's frostless dock, with the fold painted on the page's thread while it fuses as its price; 11.x has no bridge.

---

## Pass 5 (2026-11-22, claude-opus-5-5): the mark

**No iPhone reading has returned** (`READINGS.md`: none published, none returned), and no site has answered pass 1's Q15 question (`INBOUND.md` holds part 1's answers only). P5-mark, this pass's page, is new and unread, so every decision below on Q3, Q8, Q15 and Q16 is a proposal on the owner's word, provisional until pass 9. Every browser run of this pass was refused on the kernel zone (`pass-5/retry.log`). The kinematics and the fills are computed in Node (`pass-5/mark/mark.json`); what the mark looks like in motion is P5-mark's reading.

**The gate, for the orchestrator.** No page has been published in five passes. R1, R2, R3b, R4, R5, R6, R7, P2-scroll, P4-bud and P5-mark are written to the page contract, pass the static check, and run without a script error in happy-dom (`pass-5/check/static-check.json`, `dom-run.txt`). None has been opened in a browser by this pass (refused). Every "provisional until pass 9" waits on their publication (fold B4-8).

Pass 5 first folded pass 4's two critiques (`pass-4/fold.md`: 20 objections, 19 accepted, 1 accepted in part, none rejected). The amendments are marked "amended in pass 5, fold …" where they land in §2, §3.9, §4.4 and §6, on P4-bud and P2-scroll, and in three sketches under `pass-5/fold/sketch/`. The largest: today's menu grow stands until the owner rules, because it is his O-171 order, and BM's lanes go to him as a conflict between his rulings (§6.4 item 3).

Working files, all under `pass-5/`:

- `fold/`: `measure-integrator.mjs` and `.json` (wi8's fold path, A4-6); `sketch/bud-bloom.next.css`, `capsule-window.next.css`, `scroll-chrome.next.css` (the amended sketches).
- `mark/mark.mjs` and `mark.json`: the travel, the stretch, the lift, the clocks, and every state fill over each R3b letter.
- `mark/sketch/mark.next.css` and `selectionMark.next.ts`: the mark as a design sketch; `mark/ledger.mjs` and `ledger.json`: its bytes.
- `mark/forced-colors.mjs`: law 2's forced-colours sign under emulation, written and owed (refused).
- `check/`: `static-check`, `dom-run` (happy-dom, replacing the hand stub), `page-check` (the browser check, owed).
- `retry.log`: the refusals.

### §7 The mark

#### 7.1 What the record holds

**The eyeglass, measured on an iPhone** (BG `RESEARCH-KINEMATICS.md`, a Find My recording at 60 fps). On a two-slot tap the pill slides continuously through the middle tab; it departs at 150 ms and settles by 467 ms; its spring fits response 0.32 to 0.40 s and damping 0.65 to 0.85; it stretches 1.15 to 1.25× along its travel and releases the stretch at arrival (*amended in pass 6, fold B5-12:* one two-slot travel, graded [M], its peak near arrival at centre 0.80; the stretch as a change of length with exact ends is this design's choice, not the record's); at rest it stands 1.14× the bar's height; its rim refracts; its glyph turns the app's accent as it arrives (§1, §2c, §2d, §3).

**The eyeglass, built.** BG built it to the owner's order of 2026-07-10 ("perfect, within the bounds of CSS and modern web design, the eye-glass ios27 tabs toggle select effect", `EYEGLASS-TABS-DIRECTIVE.md`). In Safari 26 it degraded to a proud frosted capsule with no refraction: the resolved filter was `blur(13px) saturate(1.6)` with a no-op `url()`; it stood 1.114× its slot, overshot 2.75 %, and squished to 1.1015× in travel (`BG.W-EYEGLASS-TABS-DELTA.md`, Arm B and Signature #3). *Amended in pass 6 (fold B5-12):* the 2.75 % and the 1.1015× are Arm A's, Chromium's kinematics (`:28-56`); Arm B ran the system WebKit.framework on macOS 26 (`:11-12`), not an iPhone. BG's `RESEARCH-FEASIBILITY.md` adds one binding fact this design uses, that `backdrop-filter: url()` is Chromium-only, which is UNION L11's.

**O-4 removed it** (2026-10-19): "The tabs animations on the filter on the homepage is flashy and too gaudy--more glass-ui and subtle". The spec that replaced it: "one object moves, the indicator, at its own size, in one monotone leg; the strip does not move and no tab scales on hover or press" (`tests-visual/SegmentedTabs.glide.spec.ts:3-6`); tabs-seam arm (e) asserts the lens, the stretch, the press squish, the capsule hover and the label delay absent (`tests/gates/tabs-seam.test.ts:24-27`).

**What survives, by today's laws.**

- Kept, and already shipped: the continuous slide through the options between (O-4 keeps it), on a spring (the dock row: settles in 214 ms, overshoots 0.30 %, 90 % of the way in 159 ms; `mark.json`, `travel`).
- Refused by law: refraction (law 6); the rim, the specular and the glow (G4, L8); the rest height proud of the bar (O-4, "at its own size"); the squish at constant area (O-4; `affordance-map.md:22-26`); the accent glyph as a second sign beside the mark (law 10).
- Open, for the owner on P5-mark: a lift while the mark is held, which is Apple's grammar for touch and hold (UNION L1, L3); a stretch along the travel, which is a change of length, not a squash (Find My's measured 1.15 to 1.25×); a stretch past the ends (L6); the option widths (Q15); the keyboard's glide (Q16).

**A finding on Q15.** SegmentedTabs' pill strip already has equal slots. The horizontal strip is `display: inline-grid; grid-auto-flow: column; grid-auto-columns: 1fr` (`segmented.css`, `.segmented-tabs`), and in an auto-sized grid every `1fr` column takes the widest item's max-content width (CSS Grid, "find the size of an fr"). The indicator's `width` and `height` legs (`segmented.css:163-171`) therefore animate only when the strip resizes, in the vertical strip (heights by content), and in the underline (`display: flex`, content-sized). Pass 1's question to the sites, "would equal slots move a box?", is answered by the source for every pill strip: their slots are equal today. It stands for the underline and for Home Assistant's worded dock run (`GlassTabs.ts`, a GlassDock run, §3.7). *Amended in pass 6 (fold B5-3):* only where the strip has room. `1fr` is `minmax(auto, 1fr)` and `.segmented-tab` does not wrap, so a strip narrower than n times its widest label gives its columns unequal widths, and nothing keys the strip's form on its own room (`useTabResponsive` is opt-in and reads the viewport). Pass 1's question stands for strips in narrow containers, and a narrow strip takes the window (§7.2).

#### 7.2 The mark, every state, on a strip and on a dock run

One inert, `aria-hidden` node per selection group (law 2). *Amended in pass 6 (folds A5-2, B5-7):* where the options are equal and nothing changes the visible length (every pill strip with room, every dock run of one-wide seats under wi8's RU-28, and every letter the study proposes), the mark is a plain capsule its option's size, moved by `translate` alone; its box is the pill, so the O-4 glide spec and tabs-seam arm (e) read it as they read the indicator today. Only where the visible length changes (Q15's B, Q8's B and C, a strip without room, the underline) is it the window of §6.3, its fill on its `::before`, carrying §6.4 item 1's condition and anchored by the end that keeps it inside its group. Pass 5's text, which made every mark a window, follows struck: ~~It is a window of its widest capsule, its fill on its `::before` (§6.3), so where options differ in width it keeps exact round ends while both pieces move by `translate`; where they are equal (every pill strip, every dock run of one-wide seats, wi8 RU-28) the fill never moves and the window's `translate` is the whole motion.~~ Its fill is the plate's held fill, travelling: the colour and strength W-B.17 gives a control that is on (the owner's pick of strength; `--fill-selected`, the foreground at 0.12, as built), and a tab under it takes no held fill of its own (W-B.17 R-14). No rim, no gleam, no shadow, no blur (law 1). The underline's mark is a hairline with square ends, which changes length by `scale` on its inline axis exactly, one node and two properties. Sketches: `pass-5/mark/sketch/mark.next.css`, `selectionMark.next.ts`; built and running on P5-mark. *Amended in pass 6:* replaced by `pass-6/fold/sketch/mark.next.css`, `selectionMark.next.ts` (which now carries its input) and `playSpring.ts`. The group sets ~~`touch-action: pan-y` and~~ `user-select: none`, and `touch-action: pan-y` only where its host opts into the drag (`[data-draggable]`): `touch-action` intersects up the ancestors, so on a strip that has not opted in it would kill a sideways pan that starts there (amended in pass 7, fold A6-12). A run that scrolls keeps `pan-x` and takes no drag (§8.1) (fold B5-11).

| State | What a person sees | What moves | Delivery (§4.3) | Clock |
|---|---|---|---|---|
| Rest | The chosen option sits on a soft fill; its word is at full ink, the others at the muted ink | nothing | — | — |
| Hover, fine pointer | An option's own fill grows in at the light strength, the chosen option's too, under the mark (amended in pass 6, fold A5-6); nothing else moves (W-B.17 R-2: on a tab the hover is the fill alone) | the option's `::before` opacity | rule 1 | 150 ms |
| Press | ~~Its word starts toward full ink.~~ The pressed option's own fill takes the press tone, its hover strength deepened by 2 % of the ink (P0a's press; W-R.1, "deepens the hover wash"); on the chosen option it shows through the mark. The mark does not move yet (amended in pass 6, folds A5-4, A5-5, A5-6) | the option's `::before` opacity | rule 1 | about 100 ms (P0a's press clock) |
| Tap (the commit, at `click`) | The model and `aria-selected` change at once; the mark glides through the options between and settles on the tapped one; the two words trade ink as it goes | the mark's `translate`; the two labels' colour | rule 2, the dock row; the labels on the page thread (a colour never reaches the compositor, §4.1) | 225 to 383 ms to half a pixel (§4.3, amended); 180 ms, 5.4 frames at 30 fps (amended in pass 6, folds A5-13, B5-9) |
| A second tap mid-glide | The mark turns toward the new option without stopping first | the mark's `translate`, restarted from its own position and speed | rule 2 | to half a pixel from the turn |
| Press on the chosen option, then slide (a host that opts in, §3.4) | The mark follows the finger after 6 px, from where it is drawn: the grab is taken where the slack runs out, so it never jumps (amended in pass 6, fold A5-3); the pressed fill stands down; options passed are never chosen | one `translate` write per pointer event | rule 3 | the finger's |
| Release | The option under the finger is chosen at once (law 3, fold B5-11); the mark settles on it with its own speed, capped so it passes its rest by no more than a settle from a standing start does plus a quarter pixel, and with none when it was held at an end or moves away (amended in pass 6, folds A5-1, B5-4) | the mark's `translate` | rule 2, seeded by keyframes.js's estimator over 80 ms (UNION I9), capped (`seedCap`) | to half a pixel |
| Settle | The mark comes to rest on its option, passing it by at most 0.30 % of its travel (0.11 px on a 38 px hop, 0.89 px on 300 px), which no one sees; then nothing runs | the mark's `translate`, its last sampled frame committed into the style when the keyframes end | rule 2 | 225 ms on 38 px to 383 ms on 300 px, from a standing start (amended in pass 6, fold B5-5; `pass-6/fold/fold.json`, `band`) |
| Cancel (a scroll takes the touch) | The mark returns to the chosen option; nothing is chosen | the mark's `translate` | rule 2 | to half a pixel |
| Arrow keys | Focus and, under automatic activation, the choice move one option; the mark fades across (Q16's proposal, amended in pass 6, fold A5-9), or glides on the row the owner picks | the mark's `opacity`, its `translate` landed while hidden; or its `translate` | the player's reduced form; or rule 2 | 100 + 100 ms |
| Reduce Motion | The commit is instant; the mark fades out where it was and in where it goes; the words trade ink | the mark's `opacity` (out, land hidden, in) | the player's reduced form | 100 + 100 ms |
| Forced colours | The fill is forced away with every background; the mark is drawn as a 2 px Highlight ring, which travels with it (amended in pass 6, folds A5-10, B5-2) | as the mark | as the mark | as the mark |
| More contrast | The mark takes a one-pixel edge at the perimeter rung (`--ink-perimeter`, 0.48), on itself (amended in pass 6, folds A5-10, B5-2) | as the mark | as the mark | as the mark |

On a **dock run** the same table holds with seats for options. The mark lives in the run's scrolled box, as wi8's does, so it scrolls with the seats natively; a run that scrolls under a drag is Q5's (pass 6). On **DockLayerGroup's switcher** it travels on the block axis when the switcher is a column. The **switch thumb** keeps its own two-seat glide (§2.1).

**What W-R.1 rules, read with this.** "A commit is an instant state change" under reduced motion (`W-R.1.md:84`): the commit is instant here, and "the tone stays" is the mark's fade, so no spatial leg plays and nothing cuts (§3.9). The release rule (`:82`): the release velocity seeds a named row and the body lands without passing its rest. ~~The dock row passes it by 0.30 %, which is the row's own and under any pixel on a mark.~~ *Amended in pass 6 (folds A5-1, B5-4):* that held only from a standing start. A seed of the finger's speed passed the rest by 5.7 to 19.1 px; the seed is now the mark's own speed, capped as in the Release row, so the mark passes its rest by under a pixel on any hop up to 300 px.

#### 7.3 Counted per press (law 4)

The ceiling is two animations running on a press and two properties per node in one change (`restraint.md`, the ceiling table). "The words trade ink" is two labels changing colour. Counted per node, every selection press is at least three: the mark and the two labels.

**Why the labels must keep their two inks** (`mark.json`, `fills`, a model on D3's law at O-260, not a device reading). No selection fill stands 3:1 off what it sits on, which a fill needs when it is a state's only sign (`color-radius.css:150-155`): over each R3b letter and ground the mark, the dock's current seat and a menu's highlighted row stand 1.01 to 1.53 off their plate. A fill strong enough for 3:1, the foreground at 0.47 in light and 0.38 in dark on the page ground (`least_fg_alpha_for_3_to_1`), leaves the chosen word at 5.44 and 4.14 there, and at 1.59 in both modes over the worst ground under letter B (black under light, white under dark). So the word's ink co-carries the choice (UNION T9, "the selected tab reads first"), and one label can only give up full ink as another takes it.

*Amended in pass 6 (fold B5-1):* the step between the two inks was never reported. The two inks stand 2.67:1 apart in light and 1.55:1 in dark; as rendered on a strip under R3b's A, the chosen word on the mark reads 10.65 and the unchosen word on the well 5.04 in light (a ratio of 2.11), and 8.92 against 8.01 in dark (1.11). On a dock run the current icon and a resting one stand 1.85:1 apart in light and 1.46:1 in dark, and in dark the current icon reads no higher against its seat (8.01) than a resting one against the plate (8.12) (`pass-6/fold/fold.json`, `inks`). The register admits a co-carrier ("Where a glyph or a stroke CO-carries the state, these two rungs suffice", `color-radius.css:149-150`), so the fill and the ink meet its letter; in dark, and on any icon run, the co-carrier is weak. The one sign at 3:1 the register offers is its perimeter rung on the mark: one edge at `--ink-perimeter` (0.48) stands 3.54 off the well in light and 4.68 in dark on the page ground, and 3.29 and 3.72 over the worst ground under R3b's A; under B and C it falls to 2.25 and 1.89 in light. Whether the mark carries that edge is the owner's, on P6-hosts (§8.7); the count rule's premise below is restated as "the word's ink co-carries the choice", not as a sign at 3:1.

**The count rule proposed to the owner:** a selection's two labels trading ink count once, as the mark's coupled colour leg ("one primary motion per interaction, plus its coupled fade", `restraint.md`, Motion). Without it every selection group in the library is over the ceiling by construction. It is a precept amendment for pass 10, on his word.

| Host and choice | Press (tap) | Drag and release | Properties per node | Over the ceiling, by the rule / per node |
|---|---|---|---|---|
| SegmentedTabs today (master) | the indicator's `translate`, `width`, `height`, two labels: 5 | the same | 3 (`segmented.css:165-168`) | yes / yes |
| Dock run today (wi8) | five lengths each frame on one node, the seats' legs | — | 4 (`useDockRunMark.ts:173-177`, five custom properties) | yes / yes |
| The mark, A everywhere (proposed) | `translate`, the labels' trade: 2 | the follow, then `translate` and the trade: 2 | 1 | no / yes (3) |
| Q3 B, lifts while dragged | 2 | `scale` up, then `translate`, `scale` back, the trade: 3 | 2 | yes (3) / yes (4) |
| Q3 C, lifts on every press | `scale`, `translate`, the trade: 3 | 3 | 2 | yes / yes |
| Q3 D, the word grows | the word's `scale` and colour, `translate`, the trade: 3 | 3 | 2 (the label) | yes / yes |
| Q8 B, stretches in travel | two handles (window and fill), the trade: 3 | 3 | 1 | yes / yes |
| Q8 C, past the ends | 2 | the follow writes two handles past an end; two return on release, the trade: 3 | 1 | yes / yes |
| Q15 B, content widths | two handles, the trade: 3 | 3 | 1 | yes / yes |
| Q16 B or C, keys | `translate` or `opacity`, the trade: 2 | — | 1 | no / yes (3) |

~~A click from a fine pointer adds one more where the clicked option was hovered: its light fill fades as the mark arrives (P0a rule 4, two marks trading one seat).~~ *Amended in pass 6 (fold A5-7):* the hover fill now stays under the arriving mark (A5-6), so a click from a fine pointer adds nothing. Rows the table above lacked:

| Host and choice | Press (tap) | Drag and release | Properties per node | Over the ceiling, by the rule / per node |
|---|---|---|---|---|
| The mark, A, press as the plate's tone (amended) | the plate's `opacity`; then at commit `translate` and the trade: 1 on the press, 2 on the commit | the plate stands down, the follow, then `translate` and the trade: 2 | 1 | no / yes (3) |
| Dock run today (wi8): the seat | the seat's `scale` to `--scale-press-dock` (0.96, `icon-button.css:150-151`), its brightness by the per-frame `--dock-press-t` (`:100-101`), the mark's five lengths: 3 | — | 2 on the seat | yes / yes |
| Dock run, proposed | the seat's plate `opacity` (the press tone), then the mark's `translate` and the icons' trade: 1, then 2 | as the strip | 1 | no / yes (3) |
| A narrow strip (B5-3), the window | two handles and the trade: 3 | 3 | 1 | yes / yes |

The seat's press `scale` is the retired PRESS-SQUISH (`affordance-map.md`, the restraint ruling, C-39) and goes. `--dock-press-t` is a custom property written per frame (law 5) and goes for the plate's press tone. The seat's active paint already stands down where the run is marked (`run.css:570-574`).

#### 7.4 One answer per press (UNION L20; Q3's half) and the panel rule (fold A4-5)

*Amended in pass 6 (folds A5-4, A5-5): the paragraph below decided a third answer to a press, the word's ink, which no letter showed, which the owner never saw, and which BL rules otherwise (W-B.17 R-14, "Hover, focus and press are every plate's"; W-R.1:79, the press as tone). It is withdrawn and struck. The proposal: in a selection group the press is the plate's, as BL rules it. The pressed option's own fill takes the press tone (its hover strength deepened by 2 % of the ink), and on the chosen option that fill shows through the mark, so the mark adds no property. The words trade ink at the commit. A lift, if the owner keeps one (Q3's B to D), makes the mark the press's answer, and the plate stands down under it. P5-mark's first strip shows both answers; §3.9 lists the collision.*

~~**In a selection group the plate does not answer a press.** The pressed option's word does: it starts toward full ink on `pointerdown`, and the commit carries the same colour on, on the same node, so the press adds no animation. The plate answers hover only, and the mark answers the commit.~~ Pass 5's two reasons, of which the second stands (a mark that left on `pointerdown` would flinch on a scroll):

- The plate's press tone beside the mark would be two marks for one state (`restraint.md`, "marks for one state | 1") and a third animation.
- A mark that left on `pointerdown` would flinch on every touch that becomes a scroll: on a strip with `touch-action: pan-y` a vertical pan fires `pointercancel`, and the mark would leave and come back.

**A press that opens a panel** answers with the panel's entrance, and the trigger's held fill (W-B.17 R-14) follows the panel rather than running beside it. Today's grow (one leg) plus the held fill is two; a two-property entrance (P4-bud's E) is two only if the held fill waits for the panel to land. This rule goes to the owner with Q3 and is pass 8's to apply.

#### 7.5 The four decisions, proposed (provisional until P5-mark returns, pass 9)

- *Amended in pass 6 (folds A5-8, A5-12, B5-6):* P5-mark now shows Q3 as five letters, each on its own strip: **A** glides, and the option's own fill answers the press (today's glide; the proposal); **B** lifts to 1.06 while dragged (BL's held amount, uniform so the ends stay round); **C** lifts to 1.16 while dragged (~~Apple's, from the record's simulation~~ 16 %, a third-party rebuild's figure for the tab under the lens, Liquidum, `read/ios27-glass.md:46`: not an Apple spec and not a lift; amended in pass 7, fold B6-3; Find My rests at 1.14 on device); **D** travels to the pressed option at `pointerdown`, lifts there, and commits when the finger lets go over it, returning otherwise; **E** the word or icon grows a twelfth. No P0a row allows a lift on hold, so B to D need P0a's press row amended; §3.9 lists W-R.1:80's held grow beside them. Pass 5's paragraph follows, its letters renamed and its "nobody can see it" withdrawn until he has looked.
- **Q3, the look and the lift. Proposed: A, it glides and never lifts.** O-4 holds: one object, at its own size. On a phone, a lift while dragging sits under the finger. At 1.08 its edges move 1.3 to 3.8 px beyond a mark a fingertip covers (`mark.json`, `lift`), and "a motion nobody can see is a cost with no intent" (`restraint.md`, the ceiling). B, Apple's lift while held, is the owner's alternative: a uniform `scale` of 1.08 on the window, about the visible capsule's centre, on the press row in and the dock row out. 1.08 keeps every edge within P0a's 4 px for marks up to 100 px wide; Home Assistant's 120 px worded tab would move 4.8 px. The lift carries no shadow, which would be a second property (UNION L13). C and D are on the page so he can refuse them by sight. P5-mark's first strip asks.
- **Q8, stretch. Proposed: A, no stretch.** B is a stretch of length with exact ends and no rebound: the leading edge rides the dock row, the trailing edge the same damping at 1.396 times the response, and their gap is capped softly at a fifth of the width. It peaks at 1.15 for one slot, 1.19 for two and 1.20 for three, Find My's measured range, and lands at its own size (`mark.json`, `stretch`). It costs a second animated handle per change and lengthens the visible settle from 214 to 299 ms (the trailing edge). C stretches the far edge toward a finger past the end, capped the same way, and returns on the dock row with no bounce. Neither is a squash, so `affordance-map.md`'s gel rule does not name them; O-4's "at its own size" does, and the owner rules. P5-mark's second strip asks, for every letter he would keep.
- **Q15, widths. Proposed: A, keep equal options in every pill strip, as today.** No box moves. Content-sized options are kept where the host is content-sized (the underline, by `scale`; Home Assistant's worded run, by the window), whose ends stay exact. B on P5-mark shows content-sized pill strips. It would move boxes at every site that mounts a strip, against atlas's bound ([IN atlas 5]), and is shown so he can refuse it by sight.
- *Amended in pass 6 (fold A5-9):* **Q16's proposal is C, the fade across.** `restraint.md:129-131` was restated under P0 and reconciles the two ("'Still' never means a cut … no motion on keyboard-triggered actions"): a fade meets both and strikes nothing. B is the owner's alternative; it needs line 131 amended, and it reaches W-B.17 R-6, which rests on the same line (§3.9). The paragraph below is pass 5's, its "supersedes" withdrawn.
- **Q16, the keyboard. Proposed: B, a shorter glide on the press row** (response 0.20 s, damping 0.80; about 120 ms). Arrow keys are frequent ("Frequent actions are fast", `restraint.md`), and P0 (2026-11-12) supersedes `restraint.md:129-131`'s "no motion on keyboard-triggered actions" (2026-11-09; UNION discrepancy 3). 120 ms is 3.6 frames at 30 fps, so this leg must be a compositor leg (law 7), which the player's keyframes are if R2's lane C glides. C, the fade across, is the reduced-motion form and 200 ms long. P5-mark's fourth strip asks.

#### 7.6 Law 2's sign under forced colours and more contrast

*Amended in pass 6 (folds A5-10, B5-2):* the outline below is withdrawn. `outline` is every focus ring's channel in the library (`base.css:130-131`, and under forced colours `a11y-overrides.css:113-138`), focus lands on the chosen option under a roving tabindex, the global rule reaches every toggle and current link at every site, and a ring on the option would jump while the mark glides. **The sign is drawn on the mark itself:** a 2 px `Highlight` border with `forced-color-adjust: none` under forced colours, and a 1 px edge at the perimeter rung under more contrast. It travels with the mark, takes no focus channel, and moves no option's box. The global rule's selector gains `:not(.selection-option)` and leaves every other host as it is. It is a fix, 11.3.0. `pass-6/fold/forced-colors.mjs` reads, for today's dist and the proposal, the chosen option's border and focused outline, the mark's border and every box as the choice moves, with forced colours and with more contrast; it is owed (refused). Pass 5's text follows.

By source the sign survives. `accessibility.css:31-43` rings any `aria-selected="true"`, `aria-pressed="true"` or `aria-current` element in Highlight under `forced-colors: active`, which SegmentedTabs' chosen tab and the dock's current seat carry, and the mark's fill is forced away with every background.

The ring is a `border`, and that moves boxes. A 2 px border on an auto-sized grid item adds 4 px to its max-content contribution, and the pill strip sizes every `1fr` column to the widest item. So under forced colours every column grows 4 px when the widest option is chosen, and the boxes move as the choice moves to or from it. That fails atlas's bound in forced colours. **Proposed: the ring is an `outline` at −2 px offset**, which moves no box. It is one rule in `accessibility.css` and a fix, so 11.3.0. The same outline, at about half the foreground and 1 px, is the chosen option's ring under more contrast. It replaces §5.4's "the selected mark takes the same border": a border on the mark's fill is cut by the window wherever the fill runs past it. `pass-5/mark/forced-colors.mjs` reads the ring and the boxes under emulation, against the 11.1.0 dist the sites load; it is owed (refused). Amends §2.1's forced-colours paragraph.

#### 7.7 The state fills against the R3b letters (owed by pass 3's fold, A4)

`mark.json`, `fills`: each fill composited over each letter's chrome plate (`--card` at the letter's α over the ground, D3's law at O-260's no-blur chrome), glass-ui's default colours, a model. The worst ground is black under light and white under dark.

| Letter (α light / dark) | The chosen word on the mark (`--fill-selected` over the well), page / worst ground, light | the same, dark | The dock's current seat, worst ground, light / dark | A menu's highlighted row, worst ground, light / dark |
|---|---|---|---|---|
| A, D3's floor (0.897 / 0.872) | 10.65 / 8.56 | 8.92 / 6.15 | 9.22 / 5.26 | 10.74 / 8.42 |
| B, one ink (0.545 / 0.739) | 10.78 / **3.57** | 9.39 / **4.45** | **3.80** / **3.67** | **4.23** / 5.77 |
| C, icons (0.437 / 0.616) | 10.82 / **2.60** | 9.85 / **3.35** | **2.75** / **2.71** | **2.99** / **4.12** |

- **A holds every word on every fill over every flat ground** (its lowest, 5.26, is the dock's current seat in dark over white). Bold marks a word under D3's 4.8.
- **B, which R3b offers as "one ink", holds the bare plate (4.8, by construction) and loses the chosen word.** Over black in light every fill drops it under 4.5:1: 3.57 on the mark over the well, 4.02 on the mark straight on the plate, 3.80 on the dock's current seat, 4.23 on a highlighted row and on the well, 4.39 on today's capsule, 4.47 under a hover. Over white in dark: 3.67 on the dock's current seat, 3.82 on the mark straight on the plate, 4.45 on it over the well, 4.36 under a hover. That breaks law 10 on chrome: the selection's word is the one word that must read.
- **The cure, if the owner picks B:** solve the chrome bound for the word on the strongest fill the plate carries, not on the bare plate. That is α 0.654 in light and 0.772 in dark with the mark on the strip's well, 0.605 and 0.823 with it straight on the plate, and 0.629 and 0.840 for the dock's current seat, against B's 0.545 and 0.739 (`bound_solved_on_the_fill`). It is an input to BL's D3 (W-0.1) through §3.9: a bound solved over the darkest fill that carries a word. R3b's B letter is amended in words only: it holds the bare plate, and its chosen word needs the firmer α above.
- A fill's own contrast with its plate is low on every letter and ground (1.01 to 1.70, every fill in the table), which is why the word's ink co-carries the choice (§7.3).
- *Amended in pass 6 (fold A5-11): "A holds every word" was solved for the chosen word alone.* The unchosen word on the strip's well, and the edge §8.7 puts to the owner (`pass-6/fold/fold.json`, `inks`):

| Letter | The unchosen word on the well, page / worst, light | the same, dark | The perimeter edge off the well, page / worst, light | the same, dark |
|---|---|---|---|---|
| A | 5.04 / **4.02** | 8.01 / 5.44 | 3.54 / 3.29 | 4.68 / 3.72 |
| B | 5.11 / **1.58** | 8.39 / **3.73** | 3.56 / 2.25 | 4.79 / 2.91 |
| C | 5.13 / **1.12** | 8.74 / **2.66** | 3.56 / 1.89 | 4.88 / 2.34 |

  So under A the unchosen word over black in light falls under 4.5:1 (4.02), and under B and C it is lost. The BL question (§7.10) now asks for the bound to hold the muted word on the well as well, or for the well to be solved apart.

#### 7.8 What it replaces, and the bytes (Q17)

`pass-5/mark/ledger.json`. Standalone `gzip -9` on both sides, upper bounds, so no net is claimed; the per-entry net is pass 10's.

| | gz bytes | Release |
|---|---|---|
| Added: the mark's stylesheet (the window, its fill, the options' ink and hover, the forced-colours and more-contrast rings) | ≤ 539 (it also replaces rules in `segmented.css` it does not subtract) | 11.3.0 |
| Added: the writer, the player external (the player is §4.7's 655) | ≤ 434 | 11.3.0 |
| Removed: `useDockRunMark` (wi8's run mark, internal) | ≤ 1,349 | 11.3.0 |
| Removed: the run mark's rules in `run.css` | ≤ 494 | 11.3.0 |
| Removed: `useSelectionIndicator`, exported from `/motion-core` and imported by no site (§3.1) | ≤ 534 | glass-ui's own parts stop using it in 11.3.0; its export goes in 12.0.0 |

Also removed, unmeasured: SegmentedTabs' `width` and `height` legs; the indicator's own blur inside the track's (T2, law 1); its rim paint (W-R.1's question 1).

*Amended in pass 6 (folds B5-10, A5-14):* the writer above had no input. With its input (press, follow, release, cancel, tap, keys) the writer is ≤ 914 B and the amended stylesheet ≤ 585 B (`pass-6/fold/ledger.json`; player and estimator external). `useTabDragMorph` (≤ 449 B, `pass-6/hosts/bytes.json`) and its wiring of `useDragMorph` (≤ 1,327 B) go with the new follow. The additions lean on `useDockRunMark`'s removal, which waits on BL, so the mark ships in the release that deletes it, or loads on intent where a site is at its cap: with pass 2's player, daraksha's reader route keeps about 45 B and Home Assistant's entry 0.2 kB.

#### 7.9 The reading page

Written to §3.6's contract.

| Page | Shows | Send back | Decides |
|---|---|---|---|
| `P5-mark.html`, Glass Selection Mark | Four strips, each with its letters. **1 · Holding it**, a four-word strip and a five-seat dock run: A glides and never lifts (today's); B lifts while dragged; C lifts on every press; D the word grows instead. **2 · Stretch**, the same two hosts: A keeps its size (today's); B stretches as it travels; C stretches past the ends. **3 · Widths**, a three-word strip with one long word: A equal (today's); B each as wide as its word. **4 · Arrow keys**, two buttons that do what the arrow keys do: A glides as a tap (0.21 s); B a shorter glide (0.12 s); C fades across. The mark, the words' ink and the commit are as §7.2 in every strip; the travel is sampled from the dock row and played as keyframes, the follow writes `translate` per move, and the stretch plays two edges from their own springs | One letter per strip; in strip 2, every letter he would keep | Q3, Q8, Q15, Q16 |

*Amended in pass 6 (folds B5-8, A5-8, A5-12, B5-6, B5-11, A5-3):* rebuilt. Every letter has its own strip and run, stacked and labelled; the ask names Light and then Dark, and asks whether a moving shape ever shows a square end, with Busy page off and on; strip 1 has five letters (A to E, §7.5); strip 2 shows D as "both"; the release, the settle's end, the follow's start, the commit under the finger and the trade's clock are as amended. Its first line asks for one letter per strip. It prints the Safari version, and tells him to turn Reduce Motion off if it is on. It needs no glass-ui build. Its script runs in happy-dom without error (`check/dom-run.txt`); the check at 390 and 1440 is owed (refused).

#### 7.10 Questions for the sites (the orchestrator sends them)

- **BL (D3, W-0.1).** *Amended in pass 6 (fold A5-11): the question also asks for the muted word on the strip's well (4.02 under A over black in light).* Solved for the foreground on the bare plate, the chrome bound loses the chosen word on the state fills over the worst ground. Under R3b's one-ink letter, in light over black: 3.57 on the selection fill, 3.80 on the dock's current seat, 4.23 on a highlighted menu row; in dark over white, 3.67 on the dock's current seat. Would D3 solve the bound for the word on the strongest fill that carries one? On glass-ui's defaults that is 0.654 in light (the selection fill over a strip's well) and 0.840 in dark (the dock's current seat) (§7.7).
- **BL (W-B.17).** BM's selection mark takes the plate's held fill as its own colour and strength, so the owner's pick of the plate's "on" strength also sets the mark's. Is W-B.17 content for its strength token to be read by a node that travels (R-5 leaves the travelling selection outside W-B.17)?
- **BL (the dock).** wi8's run mark writes five lengths every frame. With every seat one wide (RU-28), would wi8 take a mark that moves by `translate` alone in 11.3.0, played by keyframes sampled from the dock row?
- *Amended in pass 6 (folds A5-2, B5-7): the next two questions are restated. Under the proposed letters the mark's element is the pill you see, so the window's "fifth wider" applies only to content-sized options.*
- **Home Assistant.** Your worded dock tabs are a GlassDock run. Are its seats as wide as their words, and does any suite of yours read the run mark's box (`.dock-run-mark`)? ~~The proposed mark's element is a window wider than the pill you see, by a fifth of the widest seat.~~ If they are as wide as their words, the mark there becomes a window over its fill, and its element is wider than the pill you see.
- **atlas.** ~~The proposed mark's element is a window about a fifth wider than the pill you see.~~ The proposed mark's element stays the pill you see in every strip with room. Does a suite of yours read `.segmented-indicator`'s box? Under forced colours the chosen tab's ring would ~~become an outline~~ move onto the mark as a Highlight border, which moves no box, where today's border can move a strip's columns by 4 px. Does any of your suites run under forced colours?
- **gaggle (restated from pass 1, unanswered).** Is the report dock's Chart/Table segment glass-ui's SegmentedTabs or your own?

#### 7.11 Readings owed, and what pass 5 did not do

| Reading | Where | Owed to | For |
|---|---|---|---|
| One letter per strip; every letter kept in strip 2 | `pages/P5-mark.html` | the owner's iPhone | Q3, Q8, Q15, Q16 |
| The corners, Busy page and the fold, with Frost on and off (rebuilt, fold B4-6) | `pages/P4-bud.html` | the owner's iPhone | Q1; the control-to-panel conflict (§6.4 item 3) |
| Which settles stutter while the page is busy | `pages/R2.html` | the owner's iPhone | rule 2's thread, on which Q16's 120 ms leg rests |
| The ring and the boxes under forced colours | `pass-5/mark/forced-colors.mjs` | headless Chromium, after a reboot | §7.6 |
| The eleven pages at 390 and 1440, light and dark, P5-mark's drags and P4-bud's strips | `pass-5/check/page-check.mjs` | headless Chromium, after a reboot | the page contract; §7's pictures |
| The window's hit region under a `pointer-events: none` host | `pass-4/critique-B-check.mjs` | headless Chromium, after a reboot | §6.3 |

- **Every browser run was refused** on the kernel zone (`pass-5/retry.log`). Each page passes the static contract check, and each page's script runs through start-up, two presses of every control and P5-mark's drags in happy-dom with no error. Neither says anything about layout or paint.
- **No library source was edited.** P5-mark needs no glass-ui build, so the `bm/study` worktree was not made. The sketches are design sketches.
- **Pass 6's hosts** are not designed here: the run that scrolls (Q5), the slider's thumb and the loupe (Q18), the switch, menu rows, and occupied length (Q21).
- **Precept drafts owed to pass 10** from this pass: the count rule (§7.3); ~~tabs-seam arm (e) and the glide spec read the indicator's box, which under the window is the window and not the pill (both must read the visible extent, and arm (e)'s "at its own size" stands only if the owner keeps Q8's A); `restraint.md:129-131` struck for P0 (Q16).~~ *Amended in pass 6 (folds A5-2, A5-9):* the glide spec and arm (e) stand, since the proposed mark's box is the pill; `restraint.md:129-131` stands, since Q16's proposal is the fade.

---

## Pass 6 (2026-11-22, claude-opus-5-5): the mark in every host

**No iPhone reading has returned** (`READINGS.md`: none published, none returned), and no site has answered a question from passes 1 to 5 (`INBOUND.md` holds part 1's answers only). Every decision below is a proposal on the owner's word, provisional until pass 9. Every browser run of this pass was refused on the kernel zone, at 14.29M to 14.45M over six attempts in an hour (`pass-6/retry.log`). The census, the kinematics, the inks and the bytes are read in Node; what the hosts look like in motion is P5-mark's and P6-hosts' reading.

**The gate, for the orchestrator.** No page has been published in six passes. Twelve pages (R1 to R7, R3b, P2-scroll, P4-bud, P5-mark rebuilt, P6-hosts new) pass the static contract check and run without a script error in happy-dom (`pass-6/check/static-check.mjs`, `dom-run.mjs`); none has been opened in a browser by this pass.

Pass 6 first folded pass 5's two critiques (`pass-5/fold.md`: 26 objections, 24 accepted, 2 accepted in part, none rejected). The amendments are marked "amended in pass 6, fold …" where they land: §2.1, §3.9 (four new rows), §4.3 rule 2, §5.4, and §7.1 to §7.11; P5-mark is rebuilt, and the mark's sketches are replaced under `pass-6/fold/sketch/`. The largest: the mark is a plain capsule wherever nothing changes its length, so the window, the glide spec's box and arm (e) are left as they are (§7.2); a release's seed is the mark's own speed, capped so it never visibly passes its rest (§4.3); the press is the plate's, as BL rules it (§7.4); the forced-colours sign is drawn on the mark itself (§7.6); and Q16's proposal is the fade (§7.5).

Working files, all under `pass-6/`:

- `fold/`: `fold.mjs` and `.json` (the release, the settle's end, the inks, the clocks); `ledger.mjs` and `.json`; `forced-colors.mjs` (owed); `sketch/mark.next.css`, `selectionMark.next.ts`, `playSpring.ts`.
- `census/hosts.mjs` and `.json`: every host's mounts at each site's current ref (`git grep`, read only).
- `hosts/hosts.mjs` and `.json` (the held grow, the stepped jumps, the worm's ceilings, the switch's clocks); `hosts/bytes.mjs` and `.json`.
- `check/`: the static check, the happy-dom run and the browser check (owed); `retry.log`.
- The prototype: `bm/study` (`.claude/worktrees/bm/study`), commits `fbf21f1fc` and `83d2331c1`: the Slider without the loupe, the veil mount, the grasp carriers, the velocity bridge, the weight-train and the spectrum halo, with `prototypes/bm-pass-6/slider-bytes.mjs`. It is a byte reading of BL's own removals, not a design of BM's (§8.2).

### §8 The mark in every host

#### 8.1 Q5: a dock run that scrolls

**What the run is** (`bl/dock/wi8` @ `d48c19ec8`). The run is a native snap scroller: `scroll-snap-type: x mandatory`, `touch-action: pan-x`, `overscroll-behavior-x: contain` (`run.css:25-38`, `:260-271`; the vertical dock's run the same on the block axis, `:500-512`). Its header gives the reason: "A JS flick projector cannot coexist with them — `touchmove` is non-cancelable once native scroll begins, so owning the gesture means `touch-action: none`, which un-scrollers the run." A run whose seats all show is not a scroll port (`[data-run-fits]`, RU-52, `:528-530`). Every seat is one seat wide (RU-28). The mark lives in the run's scrolled box, so it scrolls with the seats with no listener. A touch held still for 500 ms on a collapsed dock's seat pins the dock open, and the release presses nothing (`useDockState.ts:236-300`, `DOCK_LONG_PRESS_MS = 500`, slop 10 px).

**Proposed: A.** A run that fits takes the mark's drag, where the host opts in (§3.4): on `[data-run-fits]` the run's `touch-action` becomes `pan-y` (`pan-x` on a vertical dock), so a slide along the run is the mark's and a slide across it scrolls the page. A run that scrolls keeps its native scroll: a slide scrolls it, a tap moves the mark (rule 2), and nothing writes per scroll frame. value.js asked for the drag on "a site dock's seats on a phone, where sliding to find Home or a page is the natural gesture" ([IN value.js 1]); on a phone dock of four or five seats that run fits.

**B, shown for refusal:** hold a seat 300 ms to pick the mark up, then slide, with the run scrolling itself near its ends. Four costs, any one enough:

- A hold already means something on the dock: on a collapsed dock it pins the dock open. The same hold would mean two things by the dock's state.
- To take the slide after the hold, the run needs a non-passive `touchmove` listener, and WebKit then waits on the page's thread before every scroll of the run starts. The scroll the run exists for would stall while the page is busy, against law 5's "motion keeps gliding while the page is busy".
- The edge scroll is a loop writing `scrollLeft` each frame: per-frame page work for a motion the finger does not make.
- No site asked for it. It is UNION's D2 and D4 in a dock (the 160 ms hold and its auto-scroll), already on the owner's list with no customer (Q20).

**The commit on a run of links** follows law 3: a tap navigates at `click`; a drag on a fitting run navigates once, at release, to the seat under the finger; a seat passed never navigates. ~~Seats that are links take `-webkit-touch-callout: none`, so a press that becomes a drag never raises the link preview.~~ *Struck in pass 7 (folds A6-6, B6-5):* that reversed UNION A9 (REFUSE) unannounced and took the link preview from every reader. Whether a press that moves 6 px before the preview's hold raises it at all is a reading owed (§8.12); if it does, the cure is BL's, with the 500 ms pin. Counted: a tap is the seat plate's press tone, then the mark's `translate` and the icons' trade (§7.3's dock rows).

P6-hosts' first section shows A (a fitting run that drags and a scrolling run that taps) beside B.

#### 8.2 The slider: its thumb, the thumbless slider, and the loupe (Q18)

**BL owns the Slider, and has already ruled most of this host.** Its Slider wave (`BL/waves/W-B.18.md`, built on `bl/slider/proto` @ `fe30f9882`) and the 11-19 triage (`audit/triage-1119/PLACED.md:28`, G1) rule:

- one height and one radius for track, fill and thumb (R-1, R-2), the thumb's centre travelling between the end centres (R-3);
- the press deform, the velocity smear and the release overshoot deleted, and the fill keeping its strength while held (R-5; G1(a), "no held transform, in either orientation or under reduced motion", 11.1.2);
- the spectrum's two halo shadows replaced by a 2 px ring whose edge thickens to 3 px on hover, hold and focus (R-8; G1(d) puts the ring to the owner);
- the fill as a capsule as long as the track, moved by `translate` and clipped by the track's round end (R-9). That is §6.3's window with the track as its clip: the same engine as the mark, reached independently;
- the loupe, the focus veil, the grasp carriers and the drag-velocity bridge no longer mounted, from 11.1.1 by BL's plan, a release not yet cut (R-13; amended in pass 7, fold B6-8);
- the expanded view, a shell that grows from the track by `clip-path` and a disc that grows ×1.29 to ×1.67 inside it, opt-in and then the default (R-10, R-11; G1(b) places it in 11.3.0);
- the thumbless slider as the default (O-408, the owner on 2026-11-19: "capped and invisible, like you're just pulling the track"; G1, 11.3.0); a 2.75rem touch target on coarse pointers (G1(c)); a vertical start that scrolls the page (G1(e)); a drag resolution apart from the key step (G1(f)); a neutral origin (G1(g)).

BM credits all of it. What BM adds, with two proposals to BL's own lines (items 2 and 4), which go to BL as questions (§8.10):

1. **Q18, the loupe: it goes.** No site mounts it at its current ref (`census/hosts.json`: value.js's five hits are its own `useLoupeCanvas`, keyframes' one a comment). BL's R-13 stops mounting it (on `bl/slider/proto`; release unset, since `release/11.1.1`'s Slider still mounts it; amended in pass 7, fold B6-8), and W-R.1:81 keeps it, anchored; the two are BL's own lines, and BM sides with R-13 (§3.9). Measured on the prototype, `Slider.vue` without the loupe, the veil mount, the grasp carriers and the velocity bridge is 2,863 B gz against 4,388 (−1,525), and its sheet without the loupe, the weight-train and the halo 1,211 against 1,987 (−776) (`bm/study` `83d2331c1`, `prototypes/bm-pass-6/slider-bytes.json`); `useDragVelocity` (809 B) leaves every slider site with it. These are BL's removals; the figures are BM's reading of them.
2. **The held answer is one.** BL has three lines on a held slider: W-R.1:80's ×1.06 grow on the block axis, G1(a)'s "no held transform", and R-10's disc growing inside its shell. ~~×1.06 moves each edge of a 12, 20 or 28 px band by 0.36, 0.60 or 0.84 px (`hosts/hosts.json`), where the library's own note puts 0.8 px below the scale channel's legible floor (`control-bit.css:289-290`).~~ *Amended in pass 7 (fold B6-14):* the note's figures are whole changes of a 20 px face ("`--lq-stretch-x` on a 20px object is 1.2px and 4% of a 20px painted face is 0.8px", `control-bit.css:286-290`). In whole terms ×1.06 changes a 12, 20 or 28 px band by 0.72, 1.2 or 1.68 px: below the note's floor at 12 and 20 px, and not shown below it at 28. It is a model; the owner reads the amount on P5-mark's B. BM proposes that W-R.1:80's grow goes: the held state is the track's deeper ink (R-7) and, if the owner keeps the expanded view (his O-254), its disc. No lift and no lens on the thumb (§2.1).
3. **A continuous slider's value is the finger's at lift.** Nothing settles after release and no speed carries the value on: a value the release velocity moved past the finger would be one the reader did not choose (law 3). So among W-R.1:82's velocity owners the Slider seeds nothing unless it is stepped.
4. ~~**A stepped slider follows the finger, and its value steps.**~~ **A stepped slider travels a step at each boundary it crosses** (restated in pass 7, folds A6-1, A6-2, B6-4; the follow below is the owner's alternative). Today a stepped slider's fill and thumb jump a whole step each time the finger crosses a boundary, since reka writes the position from the stepped value and the thumb transitions only `transform`; R-9 keeps that ("A value the pointer drags … lands on the frame it arrives"). On a 300 px track a jump is 70 px for 5 positions, 31 px for 10 and 15 px for 20 (`hosts/hosts.json`, `steps`). The dashboards' funding-year slider is one step a year (`DemandFilter.vue:63-67`), so a ten-year span jumps 31 px a step; their quantised filters take 50 steps (`TRACK_STEPS`, `url-params.ts:238`), about 6 px. Every one of those jumps is an instant change (P0). **Proposed:** while the finger is down the fill's end follows it continuously (rule 3, one `translate` write per pointer event on the fill and the thumb, not a custom property inherited by the root); the model and `aria-valuenow` change as the finger crosses each step's boundary; at release the end settles on the chosen step (rule 2, the capped seed of §4.3). A key or a press on the track already travels (R-9). ~~P6-hosts' third section shows it (A) against today's jump (C).~~ *Amended in pass 7 (folds A6-1, A6-2, B6-4):* **proposed instead, the step travel.** Each step boundary the finger crosses plays R-9's own one-step travel ("A value the slider changes in one step … travels on `--spring-press`", `W-B.18.md:73`), so the fill and the thumb rest on a step at every rest, nothing between steps disagrees with `aria-valuenow`, and nothing is added (0 B). The follow above stays the owner's alternative on two conditions. The Slider must own its pointer-to-value mapping, which reka does not expose (`SliderHorizontal.js:46-54`; W-B.18 OQ-3), so the drawn end and the value come from one mapping; otherwise they disagree by up to half a thumb. And Home Assistant, whose rails put their own hand in front of the Slider to land "the value exactly under the finger" (`rails.ts:5-11`), answers first (§8.10). The follow costs the player (≤ 655 B, §4.7) on any slider entry that does not already load it, plus that mapping, unmeasured (§8.8). P6-hosts' third section shows the follow (A), the step travel (B) and a one-step mark (C); today's jump is named, not offered.
5. ~~**Thumbless is the default the sites already set.** Four of six slider sites make the thumb the fill's colour by token today (value.js `foundation.css:491`; fourier `FourierTimeline.vue:293`, `SliderControl.vue:272`; keyframes `style.css:255`; daraksha `gilt.css:58`, `:65`). Under O-408's default those overrides become redundant, and each site can drop them (§8.10). Home Assistant's "the slider thumb should be more glass-ui" ([IN HA], 2026-11-15) is answered by mounting glass-ui's Slider: its sliders are its own today (no `<Slider` at `master@0f6deae4`).~~ *Restated in pass 7 (folds A6-9, B6-7, B6-1):* **thumbless is the default three sites already set.** value.js (`foundation.css:491`), fourier (`FourierTimeline.vue:293`, `SliderControl.vue:272`) and keyframes (`style.css:255`) make the thumb the fill's colour by token; under O-408's default those overrides become redundant (§8.10). daraksha gives its knob its own tone on purpose, "the gilt's light at night, the paper's ground by day" (`gilt.css:54-66`), so the default removes a knob it styles: a visible change at daraksha, named beside BL's credit and asked (§8.10). Home Assistant already mounts glass-ui's Slider, knobless, by render function (`rails.ts:27`, `:234`, its `scrubber`), with its own hand in front and its own `marks` rule (`pass-7/fold/hosts.json`); pass 6's "its sliders are its own" read templates only and is withdrawn.
6. **Law 5 against W-B.18's animated set.** The expanded view and the ring animate `clip-path`, `background-color`, `outline-width`, `outline-offset` and `border-color` (W-B.18, "What animates"), which run on the page's thread. On `--spring-present` (0.2 s) each shows 6 frames at 30 fps, so law 7 holds; law 5 does not. The expanded view is the owner's order (O-254), so the study does not cut it (§1); it sends BL the measure and one question (§8.10): the track's ink and the ring's thickening could each be an `opacity` leg on a plate, as W-B.17's plates are.

#### 8.3 The switch

Today (master): the thumb travels by a `translate` transition on the dock row (`switch/styles.css:49`); the face squishes to 0.96 on press (`Switch.vue:46`, `tap-squish`); under reduced motion the thumb's transition is `none` (`:61-63`), a cut. W-R.1 deletes `tap-squish` in 12.0.0 (`W-R.1.md:38`) and makes the press a tone (`:79`).

**Proposed:** the thumb glides between its two seats on the dock row's single curve (rule 1; 20 px in 214 ms, 6.4 frames at 30 fps, on the compositor if the single-curve tokens are taken, §4.3; on today's `linear()` token it runs on the page's thread before 27.3; amended in pass 7, fold B6-12). The press is the face's press tone (W-R.1). Under reduced motion the thumb dips: it fades out where it is, lands while hidden and fades in, 200 ms (rule 2's reduced form), never a cut (§3.9's `:84` row). Counted: the press is 1 (the tone); the commit is 2 (the thumb's `translate`, the face's colour on its 214 ms clock). The drag stays on the owner's list (S2, Q20). *Amended in pass 7 (folds A6-14, B6-11, B6-1):* the dip survives the fallback only by enrolment (§4.3, rule 1's reduced column), else the switch loads the player. Home Assistant mounts five Switches by render function (`pass-7/fold/hosts.json`), in its WKWebView at 60 fps, where the thumb's leg runs on the page's thread until the token trade.

#### 8.4 Menu rows

A menu's highlight is where the pointer or focus is, not a choice, so law 2 does not reach it: each row keeps its own `data-highlighted` fill, and two rows trade it in place (D3, P0a rule 4). BL's W-B.17 already gives the rows the plate and removes the 1 px lift and four of their six transition legs (`W-B.17.md:516`); BM credits it. The press is the row plate's press tone. A Select's chosen row carries its check glyph, and no fill.

**Sliding across the rows on a touch screen highlights nothing today.** reka-ui 2.10.1 highlights a row on `pointermove` only for a mouse (`MenuItemImpl`, `isMouseEvent`), so a finger sliding down an open menu passes no row and its release selects none. §3.4 puts that slide on atlas's phone section menu and Home Assistant's floor menu, with law 3's commit (the row under the release point; a row passed never commits; HA: "fine if the lens never commits on release over a row the finger only passed"). It needs glass-ui code on the overlay substrate, which is pass 8's with Q11.

#### 8.5 Q21: the one mark, or occupied length

**Proposed: one engine, two meanings.** The engine is a capsule moved by `translate`, a window over its fill wherever its length changes (§6.3). What it means is set by the host:

- **A choice** is one mark at its own size, travelling between options (O-4, 2026-10-19: "one object moves, the indicator, at its own size"): tabs and segments, a dock's seats, DockLayerGroup's switcher, the switch's thumb, ~~PagerDots~~ (the dots are the owner's, beside BL's HomeView study, §3.9; amended in pass 7, fold A6-5).
- **A quantity** is occupied length, anchored at its origin, whose moving end is the sign: a slider's value (thumbed or thumbless, §8.2), a stepped level, a progress bar.

BJ's codex law 12 (`IOS27-CODEX`, ratified before O-4) made selection itself occupied length and said "never translate a fixed-width thumb". O-4 is later and rules the choice; law 12 still rules the quantity. ~~iOS 27's reasoning-effort control~~ The reasoning-effort control in ChatGPT's iOS app ([ARC]:18, whose "iOS 27 element" label the ratified codex corrects: "IMG_2287/2288—the ChatGPT iOS reasoning-effort popup", `IOS27-CODEX.md:29`; UNION S9 inherits the old label; amended in pass 7, folds A6-4, B6-3) (a 349 × 72 pt track whose pill grows from 154 to 208 pt, one pitch per step) is a quantity, so it is occupied length. The split between a choice and a quantity stands on law 12's own title, "Discrete progress", not on this control.

**What already holds.** Progress is occupied length today: its fill is a full-length bar moved by `translateX` and clipped by its rail, on the dock row (`Progress.vue:182-196`). Its reduced-motion arm is `transition: none` (`:226-228`), a cut, which ~~takes the dip of §4.3's reduced column~~ takes a quantity's reduced form, its length tweened over 150 ms or less, so a bar fed every 100 to 200 ms never hides its one sign (amended in pass 7, fold A6-7). It also loses its discharge glow, a white inset shadow at 0.12 played when the quantity lands (`Progress.vue:203-224`), against the ceiling's "glows: 0" and law 5; no BL wave names it, so it is BM's removal for 12.0.0 (fold A6-10). Home Assistant mounts Progress once, by render function (`car.ts:156`; fold B6-1). BL's R-9 builds the Slider's fill the same way.

~~**Absorbed dots** (a level's fill taking in the step dots it passes) are not built: no site mounts `marks` at its current ref (no `:marks=` in `census/hosts.json`), and atlas and sci-report draw their own stops. P6-hosts' third section shows a level as occupied length (A, proposed), as a one-step mark (B) and as today's stepped jump (C); a site that asks gets A from the engine with no new part.~~ *Restated in pass 7 (folds B6-1, A6-3):* **absorbed dots are built by one site, by hand, on `marks`.** Home Assistant's rails draw a mark on each step "still ahead of its fill" (`rails.ts:18`, `:219-226`), so a dot is gone once the fill passes it; pass 6's census read templates only and missed it. In the engine a dot needs no motion of its own: the dots lie still under the fill, which covers each as it passes. P6-hosts' third section draws them so, with the fill as one `translate` clipped by the track: the follow (A), the step travel (B, proposed) and a one-step mark (C). Whether Home Assistant's rule moves into the Slider is asked (§8.10). atlas and sci-report draw their own stops.

**PagerDots.** A page indicator is a choice, so it takes the mark. Its worm today is a fourth spring integrator off the spine: `useLeadTrail` steps three masses each frame and writes `translate`, `scale`, `opacity` and `--stretch` (`composables/motion/morph/useLeadTrail.ts`; law 5, and P7's one-sampler draft), and its elongation is capped at `clamp(pitch, |span|·0.55, 3·pitch)` (`pager-dots/worm.ts:40-49`): 28, 30.8, 46.2, 77 and 84 px for hops of 1, 2, 3, 5 and 11 cells at a 28 px pitch (`hosts/hosts.json`, `worm`). That elongation is Q8's question asked again: under Q8's A the worm becomes the mark's glide; under B it becomes the window's two handles played by rule 2. Either way `useLeadTrail` (≤ 784 B) and the worm's integrator (`worm.ts`, ≤ 1,179 B) go (`hosts/bytes.json`, standalone upper bounds). A carousel's page index is set by scrolling (rule 5), so the mark moves when the index changes, not with each scroll frame. Two sites mount it (the dashboards' `HeroStage.vue:115`, under a Carousel; daraksha's `PortraitsPage.vue:558`; fourier's carousel uses `CarouselPager`'s chevrons, not the dots), and P5-mark's Q8 B names the worm so the owner reads it there. ~~BL's W-B.17 holds the worm with no cure (`W-B.17.md:655`); this is BM's proposal to it.~~

*Withdrawn in pass 7 (folds A6-5, B6-6, A6-15):* the paragraph above coupled the dots to Q8, a question asked on a tab strip, and claimed `useLeadTrail` whole. The dots' goo is the owner's order (O-95, "Goo. Breath of life. Movement of momentum") and question (O-295, "like apple and google"), and BL's HomeView study leaves Q-CR-3, CR-04 and CR-05 to him (`GAP.md:155`, `:257`), with cures held in W-E.12, W-F.3 (cure 4, "the elongation kept") and W-B.17 ("19, pager dots"). So BM proposes nothing for the dots: they go to the owner beside BL's study (§3.9). "A carousel's page index is set by scrolling (rule 5)" is withdrawn until CR-05 is ruled, and `trailOffset` stays, since the carousel imports it (`projection.ts:31`).

**ToggleGroup** stays T7's row of separate buttons, each with its own fill. Single toggle groups are mounted (fourier 3: `FunctionInput.vue:190`, `NotationPills.vue:30`, `BasisSelector.vue:166`; gaggle's F3 prototype 1); their on-fills trade in place, as menu rows do. *Amended in pass 7 (folds B6-1, B6-2):* Home Assistant's day modes are one too (`phases.ts:98`), the host it asked the lens for, and their plate follows the engine's report. The mark stays SegmentedTabs': the segment takes it by becoming a strip, or keeps its own fill, and Home Assistant is asked which (§8.10).

#### 8.6 Q4, closed per host (provisional until P5-mark, P6-hosts and Home Assistant's answer)

| Host | The sign | Drag | Commit | Release |
|---|---|---|---|---|
| SegmentedTabs, pill, with room | the mark, a plain capsule (§7.2) | where the host opts in (`:draggable`; no site sets it at its current ref, `census/hosts.json`) | at `click`; at release, the option under the finger | the capped seed |
| SegmentedTabs, pill, without room; vertical strip | the mark as a window (§7.2, B5-3) | as above | as above | as above |
| SegmentedTabs, underline | a hairline, `scale` on its inline axis | no | at `click` | — |
| Dock run that fits | the mark, a plain capsule | where the host opts in, with `pan-y` (§8.1) | navigation at `click`, or once at release | the capped seed |
| Dock run that scrolls | the mark, in the scrolled box | no: a slide scrolls | navigation at `click` | — |
| DockLayerGroup's switcher | the mark, on the block axis in a column; no site shows it (amended in pass 7, fold B6-9) | its follow today (`DockLayerGroup.vue:131-154`) becomes the mark's, if the overfitting rule keeps the switcher | as SegmentedTabs | the capped seed |
| Switch | the thumb, the mark of a two-seat group | no (S2) | at `click` | — |
| PagerDots | ~~the mark (§8.5)~~ the owner's, beside BL's HomeView study (amended in pass 7, fold A6-5) | no | at `click` | — |
| Slider, continuous | occupied length | the finger's own, rule 3 | the model as it moves; `valueCommit` once at release | none: the value is the finger's |
| Slider, stepped | occupied length | ~~rule 3, continuous~~ the step travel: R-9's leg at each boundary crossed (amended in pass 7, folds A6-1, B6-4) | each step boundary crossed; `valueCommit` once at release | ~~the capped seed, onto the step~~ none: the fill rests on the step it last travelled to |
| Progress | occupied length | — | — | — |
| Menu rows | their own fill | a slide across an open menu: pass 8 | at release over a row (law 3) | — |
| ToggleGroup | each item's own fill (T7); Home Assistant's day modes, whose fill follows the engine's report (amended in pass 7, fold B6-2) | no | at `click`; at Home Assistant, at the report | — |

~~A pick that asks to confirm (Home Assistant's day modes) keeps §3.4's rule.~~ A pick that asks to confirm follows its source of truth (§3.4, restated in pass 7, fold B6-2). Home Assistant has not answered §3.7's question, so the menu row's commit is provisional on it.

#### 8.7 The choice's sign, for the owner (B5-1)

The fill and the word's ink carry a choice together, and the register allows it (`color-radius.css:149-150`); in dark, and on a run of icons, the co-carrier is weak (§7.3). One edge at the perimeter rung on the mark would give the choice a sign at 3:1 in both modes on the page ground (3.54 light, 4.68 dark) and over the worst ground under R3b's A (3.29, 3.72), and below 3:1 under B and C (§7.7). It is one more line, on a fill that has no other~~, which the owner's "crisp edge, no halo" allows~~. *Amended in pass 7 (folds A6-8, B6-13):* that order is about the dock's plate (`docs/precepts/README.md:120-122`), not a licence for a line on a mark, and precept 2 bars stacked hairlines (`:77`). Every host the edge would sit in already has an edge, the strip's track its rim and wi8's plate its border, and the mark sits 3 px inside the track, so its edge runs beside the track's. B removes nothing. P6-hosts' second section now draws each host's own edge on both letters and B's edge as a 1 px border (G5), so the owner judges the stacking he would get. The worst-ground figures above stay a model, read on R3b's grounds, not on P6-hosts. P6-hosts' second section shows A (the fill and the ink, today's) and B (the same with the edge), on a strip and on a run of icons, to be read in Light and then in Dark. Under more contrast the mark takes this edge in every case (§7.6).

#### 8.8 Bytes (Q17)

Standalone `gzip -9`, upper bounds on both sides, so no net is claimed; the per-entry net is pass 10's.

| | gz bytes | Release | Whose |
|---|---|---|---|
| Removed: the loupe, the veil mount, the grasp carriers and the velocity bridge from `Slider.vue` | 1,525 | ~~11.1.1~~ unset, on `bl/slider/proto` (fold B6-8) | BL (W-B.18 R-13) |
| Removed: the loupe rules, the weight-train and the spectrum halo from the Slider's sheet | 776, less R-8's ring, which replaces the halo and is unmeasured (fold B6-10) | ~~11.1.1, 11.1.2~~ unset (fold B6-8) | BL (R-5, R-8, R-13; G1(a)) |
| Removed: `useDragVelocity` | ≤ 809 | ~~11.1.1~~ unset (fold B6-8) | BL (R-13) |
| ~~Removed: `useLeadTrail` and the worm's integrator~~ | ~~≤ 784 + ≤ 1,179~~ | none claimed: the dots are the owner's, and `trailOffset` stays with the carousel (folds A6-5, A6-15) | — |
| Removed: `useTabDragMorph` and its wiring of `useDragMorph` | ≤ 449; `useDragMorph`'s ≤ 1,327 only if the switcher's follow moves too or the switcher goes (folds A6-15, B6-9) | 12.0.0 | BM (fold B5-10) |
| Added: nothing beyond §7.8's mark | — | — | the dock run and the switcher use the one writer and the one player; ~~PagerDots and the stepped slider's settle~~ the stepped slider's step travel is R-9's and adds 0 B (fold A6-2) |
| Added, only if the owner takes the stepped follow (§8.2 item 4; fold A6-2) | the player, ≤ 655, on any slider entry that does not already load it; the Slider's own pointer mapping, unmeasured | 12.0.0 | BM, with BL's OQ-3 |

#### 8.9 Counted per press (law 4)

| Host, proposed | Press | Commit or release | Properties per node | Over the ceiling, by §7.3's rule / per node |
|---|---|---|---|---|
| Dock run that scrolls, a tap | the seat plate's tone: 1 | the mark's `translate`, the icons' trade: 2 | 1 | no / yes (3) |
| Dock run that fits, a drag | the tone, which stands down as the follow starts: 1 | the follow, then the settle and the trade: 2 | 1 | no / yes (3) |
| Switch | the face's tone: 1 | the thumb's `translate`, the face's colour: 2 | 1 each | no / no |
| Slider, stepped, a drag | the track's ink (R-7): 1 | ~~the follow; at release the settle onto the step: 1~~ R-9's travel at each boundary crossed, one at a time, retargeted if the next comes first: 1 (amended in pass 7, fold A6-1) | 1 on the fill, 1 on the thumb | no / no |
| Slider, with the expanded view | the track's ink, the shell's `clip-path` and `opacity`, the disc's `scale`: 4 legs on 3 nodes | — | 2 on the shell | yes / no (BL's, the owner's order O-254; §8.2 item 6) |
| Menu rows, the pointer moves to a row | the leaving row's fill out, the arriving one's in: 2 | the menu's exit, pass 8's | 1 | no / no |
| ~~PagerDots, a tap~~ | — | withdrawn with §8.5's PagerDots paragraph (fold A6-5) | — | — |

#### 8.10 Questions for the sites (the orchestrator sends them)

- **BL (the dock, wi8).** On a run that fits (`[data-run-fits]`), would wi8 take a drag of the mark, with the run's `touch-action` set to `pan-y` (`pan-x` on a vertical dock) where the host opts in? A run that scrolls would keep its native scroll, and its mark would move only on a tap.
- **BL (the Slider, W-B.18 and W-R.1).** Three of your lines speak to a held slider: W-R.1:80's ×1.06 grow, G1(a)'s "no held transform" and R-10's disc. ×1.06 changes a 12 px band by 0.72 px in all (fold B6-14). Would W-R.1:80's grow go, leaving the deeper ink and, with the expanded view, the disc? And on the loupe, W-R.1:81 keeps it while R-13 stops mounting it in 11.1.1; which line stands?
- **BL (the Slider, stepped).** *Restated in pass 7 (folds A6-1, B6-4):* R-9 lands a dragged value "on the frame it arrives", so a stepped slider's fill jumps a whole step at each boundary (70 px on a 300 px track with five steps). Would R-9 play its own one-step travel on `--spring-press` (`W-B.18.md:73`) at each boundary a drag crosses? And if the owner takes the follow instead, would the Slider own its pointer-to-value mapping (OQ-3), so that the drawn end and the value come from one mapping?
- **BL (the Slider, law 5).** The expanded view and the ring animate `clip-path`, `background-color`, `outline-width`, `outline-offset` and `border-color`. Could the track's ink and the ring's thickening each be an `opacity` leg on a plate, as W-B.17's plates are?
- **BL (the Slider, W-R.1:82; added in pass 7, fold A6-13).** W-R.1:82 names the Slider first among the velocity owners whose release velocity seeds a named row. BM reads a continuous slider's value as the finger's at lift, which nothing seeds (§8.2 item 3), and a stepped one as R-9's step travel. Would W-R.1:82 leave the Slider out of its seeded set?
- **atlas.** Your range filters are stepped sliders (`RangeFacet.vue`; in the dashboards `DemandFilter`'s funding years, one step a year, and the 50-step `EcfFilter`, `SciFilter` and `UsfFilter`). ~~Would a fill that follows the finger between steps, and settles on the step at release, break anything you test? The model would still change only at each step.~~ *Restated in pass 7 (folds A6-1, B6-4):* would a fill that travels to each step as the finger crosses into it (a short glide in place of today's jump) break anything you test, and would the fill following the finger between steps, if the owner takes it? The value would still change only at each step.
- **value.js, fourier, keyframes** (restated in pass 7, folds A6-9, B6-7). You set `--slider-thumb-bg` to the fill's colour to hide the thumb. When glass-ui makes the thumbless slider the default (11.3.0), would you drop that override?
- **daraksha** (added in pass 7, folds A6-9, B6-7). Your dock's sliders give the knob its own tone, the gilt's light at night and the paper's ground by day (`gilt.css:54-66`). Under the thumbless default (11.3.0) that knob would no longer be drawn. Should it stay, and if so as what?
- ~~**Home Assistant.** Your sliders are your own. Would you mount glass-ui's Slider for your light sliders once it is thumbless by default?~~ **Home Assistant** (replaced in pass 7, folds B6-1, A6-16, B6-4, B6-2). Your rails mount glass-ui's Slider, knobless, with your own hand in front that lands the value under the finger, and pass a `marks` list that keeps only the steps ahead of the fill (`rails.ts:5-18`, `:219-226`). Would that hand and that rule move into the Slider, or stay yours? On BL's prototype the Slider is at most 2,863 B of script and 1,211 B of sheet gzipped (`prototypes/bm-pass-6/slider-bytes.json`); whatever moved in would be priced against your 0.2 kB margin. And your day modes are a single ToggleGroup whose plate follows the engine's report: should they take the travelling mark by becoming a SegmentedTabs strip, or keep their own fill?
- **atlas (the dashboards) and daraksha.** Your carousels show glass-ui's PagerDots, whose worm stretches as it travels (up to three dots long). Is that stretch a look you want kept? ~~The owner decides it as Q8, on P5-mark.~~ The owner decides it beside BL's HomeView study, not on P5-mark (amended in pass 7, fold A6-5).

#### 8.11 The reading page

Written to §3.6's contract.

| Page | Shows | Send back | Decides |
|---|---|---|---|
| `P6-hosts.html`, Glass Mark Hosts | **1 · A dock that scrolls**: A, a four-seat run that drags and a nine-seat run that scrolls and taps; B, hold to pick the mark up, with the run scrolling itself near its ends. **2 · Which one is chosen**, a word strip and an icon run: A, the fill and the ink (today's); B, the same with one edge at the perimeter rung. **3 · A level**, five steps: ~~A, occupied length that takes in the dots; B, a one-step mark; C, today's stepped jump~~ A, the fill follows the finger and settles on the step; B, the fill travels a step at each boundary crossed (R-9's travel, proposed); C, a one-step mark; the dots lie still under the fill, and today's jump is named, not offered (amended in pass 7, folds A6-1, A6-3, A6-4). Every option shows its own hover plate and press tone, section 2 draws each host's own edge, and no seat suppresses the link callout (folds A6-6, A6-8, A6-11) | One letter per section, section 2 in Light and then in Dark | Q5; the choice's sign (B5-1); Q21 and the stepped slider |
| `P5-mark.html`, Glass Selection Mark (rebuilt) | As §7.9, amended | One letter per strip | Q3, Q8, Q15, Q16 |

It prints the Safari version, and tells him to turn Reduce Motion off if it is on. It needs no glass-ui build. Its script runs in happy-dom without error; the check at 390 and 1440 is owed (refused).

#### 8.12 Readings owed, and what pass 6 did not do

| Reading | Where | Owed to | For |
|---|---|---|---|
| One letter per section | `pages/P6-hosts.html` | the owner's iPhone | Q5, the choice's sign, Q21 |
| One letter per strip, in Light and Dark, with Busy page off and on | `pages/P5-mark.html` (rebuilt) | the owner's iPhone | Q3, Q8, Q15, Q16 |
| The twelve pages at 390 and 1440, light and dark, P5-mark's and P6-hosts' strips and runs | `pass-6/check/page-check.mjs` | headless Chromium, after a reboot | the page contract; §7's and §8's pictures |
| The sign and the boxes under forced colours and more contrast, today and proposed, with focus | `pass-6/fold/forced-colors.mjs` | headless Chromium, after a reboot | §7.6 |
| Pass 5's owed checks (the window's hit region; P4-bud's strips) | `pass-4/critique-B-check.mjs`; `pass-5/check/page-check.mjs`, now `pass-6`'s | headless Chromium, after a reboot | §6.3 |
| Whether a press that becomes a drag on a link seat raises iOS's link preview (added in pass 7, folds A6-6, B6-5) | owed: a fitting run of link seats with no suppression; no page carries one yet | the owner's iPhone | §8.1 |

- **Every browser run was refused** on the kernel zone (`pass-6/retry.log`). The pages pass the static check and run in happy-dom; neither says anything about layout or paint.
- **The prototype edits only the Slider**, on `bm/study`, and it reproduces BL's W-B.18 removals to read their bytes; it does not build W-B.18's mechanism or its expanded view, which `bl/slider/proto` holds.
- **The menu's touch slide and its substrate** are pass 8's (Q11). The DockLayerGroup switcher's follow is listed (§8.6), not rebuilt.
- **Precept drafts owed to pass 10** from this pass: the slider's "value is the finger's at lift" beside W-R.1:82's release rule; ~~the stepped follow~~ the step travel (amended in pass 7, fold A6-1) beside W-B.18 R-9; Q21's two meanings beside codex law 12.

---

## Pass 7 (2026-11-22, claude-opus-5-5): fusion and fission, first round

**No iPhone reading has returned** (`READINGS.md`: none returned), R4 included, and no site has answered a question from passes 1 to 6. Every decision below is a proposal, provisional until pass 9. Every browser run of this pass was refused on the kernel zone: five attempts from 22:20 to 23:05, at 14.51M to 14.65M (`pass-7/retry.log`). Two attempts fell under the ten-minute floor, which the log records; a wrapper enforced the floor after that. I stopped at the fifth, since the count rose at every attempt and falls only on a reboot. The geometry, the clocks and the costs are read in Node (`pass-7/fuse/fuse.json`); what the split and the fold look like is P7-fuse's reading.

Pass 7 first folded pass 6's two critiques (`pass-6/fold.md`: 30 objections, 29 accepted, 1 accepted in part, none rejected). The amendments are marked "amended in pass 7, fold …" where they land: §2.1, §3.1 to §3.4, §3.9 (two new rows), §4.3 (rule 1's reduced column), §7.2, §7.5, §8.1 to §8.3 and §8.5 to §8.12. P6-hosts' third section is rebuilt (the follow, the step travel, a one-step mark; the fill one `translate` clipped by the track, the dots still under it), every option on it takes its own hover plate and press tone, and section 2 draws each host's own edge. P6-hosts and P5-mark lose the link-callout suppression, and P5-mark's C and B are corrected. The largest changes:

- The stepped slider's proposal is now R-9's own step travel at each boundary crossed, which adds nothing (§8.2 item 4).
- PagerDots leave Q8 and go to the owner beside BL's HomeView study (§8.5).
- Home Assistant mounts glass-ui's Slider, Switch, Progress and a single ToggleGroup by render function, which pass 6's census missed (`pass-7/fold/hosts.json`).

Working files, under `pass-7/`:

- `fold/hosts.mjs` and `.json`: the census again, by import, with render-function mounts.
- `fuse/fuse.mjs` and `.json`: the necks' waists against the gap, the goo's rest erosion, the fold's clocks on three rows and the filter's repaint area.
- `fuse/sketch/`: `seat-under.next.css` (the split), `goo.next.css` (the bridge) and `fold-cover.next.css` (the fold).
- `check/`: `static-check.mjs` and `dom-run.mjs` (both run, and all thirteen pages pass), `page-check.mjs` and `crop.mjs` (owed).
- `retry.log`: every refused browser run.
- No prototype needed glass-ui's build, and this pass did not touch `bm/study`.

### §9 Fusion and fission

#### 9.1 R4, folded unread

R4 (`pages/R4.html`) asks which of three splits reads as one piece of glass: A, two pieces whose facing corners square off where they touch; B, one piece cut to two shapes and a waist; C, a seat born under the bar's end that takes its frost once clear. It has not returned. Three things have changed what it decides since pass 1:

- **O-260.** From 12.0.0 the dock and its seats sample no backdrop (§5.0), on §6.1's two conditions. RU-14's failures were readings of a backdrop under a filter and under a clip: "An SVG filter on the container erased the backdrop in WebKit", and the cut leaf read a flat deviation of 204 to 209 in WebKit (`W-I.8.md:126`). On a plate that samples nothing, a cut or a filter acts on a flat fill. That is what changes from the version that failed, which UNION Q2 asks before a third bridge: the material, not the neck.
- **The window** (§6.3). The fold no longer needs per-frame writes, so a split can ride the fold's own legs.
- **BL's R-6.** The fission seat left 11.2.0 for 12.0.0 behind one still crop. The crop is a leaf over a striped ground, cut by `clip-path: path()` to two capsules and a waist of tangent arcs, held at five openings in WebKit and once in Safari. It passes if every glass pixel on a flat ground is within 2 (of 255) of the plate's centre and no junction column differs from its neighbours by more than 4 (`W-I.8.md:125-128`). Until then the theme seat ships as a round dock of its own (OQ-5, `:348`). P7-fuse hosts that crop as its second (§9.2).

R4 stays on the owner's list unchanged, as the reading for 11.x's frosted dock. P7-fuse asks the same question on 12.0.0's material, with frost as a switch.

#### 9.2 Q2: the bridge, four ways on one page

The geometry: a 236 × 52 px dock whose plate is §6.3's window, and a 52 px round seat that rests 8 px past its end (daraksha's gap, `--phi-space-n1`, `SiteDock.vue:479`). At fold progress p (0 folded, 1 open) the seat's left edge less the plate's end is 60p − 52 px, so the two touch at p = 0.867 and part fully at rest. Each waist below is the least height of the filled shape between the facing ends, modelled in Node at a quarter pixel (`pass-7/fuse/fuse.json`, `necks`).

| Gap (px) | 0 | 1 | 2 | 3 | 4 | 5 | 6 | 8 | 16 |
|---|---|---|---|---|---|---|---|---|---|
| Apple's blend as rida.dev fit it (a smooth-min of radius 24·smoothstep((7.33 − gap)/7.33), UNION F1; the quadratic variant is assumed) | 37.5 | 35 | 30 | 23 | 11.5 | 0 | 0 | 0 | 0 |
| The goo: blur σ 4 px, then an alpha threshold at 0.5 | 23 | 20.5 | 17.5 | 14 | 9.5 | 0 | 0 | 0 | 0 |
| R4's B, the path neck | 52 | 49.4 | 46.8 | 44.3 | 41.8 | 39.3 | 36.8 | 32.0 | 13.9 |
| daraksha's neck element (`SiteDock.vue:528-560`) | 36.2 | 27.7 | 20.4 | 14.1 | 9.1 | 5.1 | 2.3 | 0 | 0 |

The goo pinches at the gap Apple's fit does: at 5 px with σ 4, and at 4, 6, 7 and 9 px with σ 3, 5, 6 and 8. Its waist is narrower than Apple's before the pinch. R4's B pinches only at 24 px, so on a seat that rests 8 px out its neck never breaks.

Section 1 of `pages/P7-fuse.html` shows four letters on stripes and a band, all on the dock row:

- **A · Born underneath** (F3, Apple's recipe; R4's C). The seat starts under the disc and slides out with the window on the same spring. Its plate's fill rises as it comes clear and its glyph over the last 70 % of its way, and nothing joins the two. It needs three legs (`translate` on the seat, `opacity` on its fill and on its glyph) and adds no node. All three run on the compositor when played by rule 2, or by rule 1 on the single-curve tokens (`fuse/sketch/seat-under.next.css`). Its cost is the overlap. While the seat is part way out, the ground under the overlap shows through both plates at 0.103 × (1 − 0.897f) of its strength in light, where f is the seat's fill (0.128 × (1 − 0.872f) in dark), against 0.103 through the plate alone. So at the plate's end there is a darker lens, about half as clear at f = 0.5, for the first 52 px of the seat's travel. A shows F1's contact only at 0 and 1: two circles touch at a point, then part.
- **B · Edges meet** (UNION Q2's second candidate; R4's A). As A, with the facing ends going square as they touch and round again over 8 px either side; their radius is 26 × min(1, |gap|/8). That draws F1's contact scalar as a radius, written on two nodes each frame on the page's thread, so law 5 fails. P7-fuse shows it so the owner sees what the radius buys.
- **C · Goo** (the owner's order: "goo (metaball pull-apart, fusing back on collapse)" that "must work in Safari", O-279, O-289, [IN value.js 2]; goo is allowed on dock fission and fusion, `restraint.md:125-128`). The two plates are the only children of one layer and are drawn solid. The layer takes `filter: url(#glass-fuse)` (an `feGaussianBlur` of σ 4 px, then an `feColorMatrix` alpha row `0 0 0 20 −9.5`, in sRGB) followed by one `drop-shadow`, and carries the plate's alpha as its opacity. The union is therefore painted once, with no seam and no doubled overlap by construction (`fuse/sketch/goo.next.css`, and the filter's markup in its head). C is not a leaf, so R-6's junction has nowhere to arise. Its neck is the device record's shape: a Live Activity's two lobes join through "a meniscus waist" ([ARC]:29, UNION F2). At rest its round ends sit 0.25 px inside the true capsule, 0.5 px at the worst point on the end, and its sides do not move (`fuse.json`, `rest`). M5 ("no blur in motion") is kept: the blur is a step inside the filter, and what is drawn is a crisp edge. Its costs:
  1. **It holds only on a plate with no backdrop.** A filter on an ancestor makes it the backdrop root (F2), so in 11.x it would stop the dock's frost; from 12.0.0 it needs §6.1's two conditions. UNION F2's refusal stands for every rung that samples a backdrop. Pass 7 narrows it for the frostless chrome only.
  2. **It moves the fold onto the page's thread while it is on.** WebKit does not composite an element with `filter: url()` (`RenderLayerBacking.cpp:L1025-1031`). It paints it in the web process on each repaint, on the CPU by default (`Page.cpp:L5281-5303`), so the window's translates under it are painted each frame. That is a 320 × 76 px region, or 218,880 device px at DPR 3, through the blur for the dock row's 20 frames at 60 Hz (10 at 30) (`fuse.json`, `cost`). Law 5 fails for those frames. The sketch turns the filter on only while the seat is in reach (`data-fusing`, set and cleared once per change). The step at the ends when it turns on (up to 0.5 px) is unread: P7-fuse keeps the filter on throughout. `color-interpolation-filters="sRGB"` keeps the chain out of SVG's default linearRGB; whether iOS Safari then draws it through CoreGraphics is unread ([IOS §2.2]).
  3. **It adds one wrapper for a motion** (the plates' layer), against the ceiling's 0.
- **D · One piece, cut** (UNION Q2's first candidate, with `path()` for `shape()`; R4's B and RU-14's leaf). One plate is clipped each frame to the capsule, the seat and two fillets of tangent arcs. Their waist follows Apple's fit, so it pinches at 5 px, not R4's 24. The clip path is written each frame on the page's thread (`clip-path` is not accelerated in WebKit, [IOS §4.7]), and the clip cuts away the plate's own shadow. D held is BL's R-6 crop on 12.0.0's material.

**Hold where they part** stops all four letters 2.5 px apart, the middle of the neck's life. Each further tap holds at the next of R-6's openings (0, 1.25, 3.75 and 5 px), and the last tap lets go. The owner's screenshots of the first hold in Light and Dark are the second crop, from Safari. `pass-7/check/crop.mjs` reads R-6's bar on D and C at all five openings in WebKit and Chromium, on a flat ground, with frost off and on; it is owed, since the run was refused.

**Q2, provisional (pass 9 decides it on P7-fuse and the crop).**

- **11.x: no bridge.** The split is F3's recipe alone (A). The goo cannot be drawn on frosted chrome, and the cut and the radius run on the page's thread.
- **12.0.0: A is the default, and C goes to the owner as his order, with its price.** C is the only bridge that draws F1's contact continuously without a per-frame write of the library's own, and the only one with no seam by construction. It is offered on three conditions: §6.1's two for the frostless dock; that P7-fuse's C reads as one piece on his iPhone; and that it keeps gliding with Busy page on, since its fold is painted on the page's thread while it fuses. The owner ordered the goo, so the laws it breaks go to him with their measures (§1): law 5 for the frames it is on, and the one wrapper.
- **B and D are refused for the split.** Each writes a radius or a path every frame on the page's thread, and D also cuts away its shadow. D held stays as the reading that reopens BL's R-6.
- **F1, the contact law,** has a channel only through C. Under A it shows only at 0 and 1, as UNION F1 foresaw.
- **No third leaf is built.** What changed since RU-14 is the material, and C is not a leaf.

#### 9.3 The theme seat, born underneath (F8)

- **Where it sits.** The seat is a sibling of the dock's plate and of the controls, placed at the open plate's end plus the gap. Folded, it rests translated back by `--seat-from`: the open width less the disc's, plus the gap and the seat's width less the disc's. At frame 0 its box then lies inside the disc (law 8). It takes no pointer while folded. `--seat-from` is read once per layout, and nothing is written per frame.
- **One clock.** Its legs ride the window's token (rule 1) or the window's sampled spring (rule 2), so the plate, the seat and the gap never drift apart, and a reversal turns back from where each is drawn. That keeps daraksha's "one clock for the whole body" (`SiteDock.vue:85-92`) without its MutationObserver, its per-frame `--fission-t` and its neck.
- **A seat wider than the disc.** daraksha's seat becomes a pill on a page with its "i" (`SiteDock.vue:497-504`, `:282-291`). A pill's box cannot lie inside a 52 px disc at frame 0, so law 8 fails unless the seat's own plate is a window (§6.3) that widens from the disc's width as it comes out. That costs one more `translate`, on its `::before`. daraksha is asked (§9.10).
- **Reduced motion.** The dip (§4.3): out, landed while hidden, in, over 200 ms. On rule 1 it survives the library's fallback only by enrolment in the authorised set; played, the player does it. daraksha's own reduced form already fades the seat where it stands (`SiteDock.vue:561-583`).
- **Counted.** The split is 3 legs on 3 nodes (1 property each), with nothing written per frame and no node added (the seat exists). With the fold's own legs (§9.4), an open press is above the ceiling of 2; §9.7 counts it.
- **The sites.**
  - daraksha removes its seat, its neck, the mirror script and the `.fission` rules when it adopts. Gzipped, standalone and with comments stripped, those blocks are at most 864 B of script, 898 B of styles and 262 B of markup (`SiteDock.vue:68-137`, `:468-584`, `:280-292`), less whatever stays of its hold (`keepOpen("grasp")`).
  - gaggle's lamp in a split seat is a readout: it takes no hover plate and no press tone ("A fused lamp must not read as a button", [IN gaggle 2]).
  - Home Assistant's faces seat and the dock fuse, and the folded dock keeps the faces shown ([IN HA 2]). There the folded face is the faces, so the trade at the disc (§9.4) carries them instead of a page glyph.
  - atlas fuses nothing but a dock and its own seat ("never between two figures; never between a hover card and a dock", [IN atlas 2]).

#### 9.4 The fold, faster and with less fade (F7)

Today's 11.2.0 grammar (wi8) writes the plate's `inset` and radius and each region's `clip-path` every frame. Its content rides one window, w(x) = clamp(1 − x/0.55, 0, 1): the leaving content gets 82 ms, and the entering content runs from about 68 ms to the landing. "Content is seen until the plate's edge covers it" (`W-I.8.md:91-103`; R-3, C-1). value.js passed on the order for "faster, less fade" (FORTIETH K, [IN value.js 2]).

The proposal (`fuse/sketch/fold-cover.next.css`; P7-fuse section 2's B):

- **The plate is §6.3's window.** The controls' own element becomes a second window of the plate's shape for the length of the change only (`data-morphing`). Its one child, the row of seats, stands still by the counter-translate. The glass's edge then cuts each seat exactly as it passes, and **no seat fades**: wi8's C-1 is kept and its `w` is dropped.
- **The one fade left is the trade at the disc.** The first seat and the folded glyph cross over 100 ms, starting when the fold is half done (75 ms into the dock row) and at once when it opens. A trade sampled from the fold's progress (over p from 0.5 to 0.1) would last 47 ms on the press row, under law 7's 83 ms floor; a fixed leg holds the floor on any row.
- **Nothing is written per frame.** Played by rule 2, every leg is a Web Animation of `translate` or `opacity`, on the compositor in every release. By rule 1 it waits for the single-curve tokens (§4.3).

Faster: the rows the fold may ride, over its 184 px (`fuse.json`, `clocks`):

| Row (response, damping) | To 90 % | To half a pixel | Past its rest | Frames at 30 fps |
|---|---|---|---|---|
| dock (0.30, 0.88), wi8's | 159 ms | 339 ms | 0.55 px | 10.2 |
| present (0.22, 1.0) | 137 ms | 285 ms | 0 | 8.6 |
| press (0.20, 0.80) | 95 ms | 248 ms | 2.79 px | 7.4 |

B answers "less fade" by taking the fade out: under wi8's `w` a seat is gone at 82 ms whatever the plate is doing, and under B each seat stays until the edge takes it. "Faster" is the row, which the owner picks by letter: B keeps the dock row, and C plays B on the press row, at 90 % in 95 ms against 159, passing its rest by 2.8 px (the ruled spatial morphs allow it, `motion-canon.md:135-144`). Section 2's A is wi8's grammar as modelled.

The cost: the controls' element clips while the fold runs. That breaks "nothing clips" (`restraint.md:113`, C-30) for the length of the change, as wi8's lane clip already does (`W-I.8.md:58`); at rest nothing clips. The content inside the element must be one row that can stand still. A region that rides the plate's end (`#persistent-end`, `W-I.8.md:58`) has to sit outside the controls' window and ride the plate's edge by its own `translate`. Whether wi8's tree allows that is BL's question (§9.10). Under reduced motion the fold keeps §6.4 item 5's two forms for the owner.

#### 9.5 A seat's call to action (F10)

- **Nothing mounts either composable** at any site's current ref (§3.1; the import census in `pass-7/fold/hosts.json`). wi8 already stops re-exporting `useDockCtaReceive` from the dock, since "no app imported it" (wi8 `src/components/dock/index.ts:67`).
- **Every dock site still ships its sheet.** The dock's sheet imports `cta-seat.css` (the ghost and the reserve for a landing call to action) on master, `release/11.1.1` and wi8 (`src/components/dock/styles/index.css:80`). Its ≤ 278 B gzipped (standalone, comments stripped) therefore rides every dock site's CSS for a composable no one mounts. §3.2 missed that consumer credit; it listed the composables' 278 and 1,181 B as cutting source and API only.
- **Its motion breaks the law as built.** The ghost at 0.35 (`cta-seat.css:58`) is a second sign of the seat's state (law 10). The flight scales the call to action's box into the seat's, in a ratio band of 0.2 to 1.4 (`useDockCtaReceive.ts:57-58`), which §6.4 item 2 refuses for a shape change. Both composables carry a 4 px blur channel (`useLiquidReveal.ts:72`; `useDockCtaReceive.ts:12`), against M5.
- **Proposed: delete `useDockCtaReceive`, `useLiquidReveal` and `cta-seat.css` in 12.0.0** (the overfitting rule). F10's other branch, folding them into F9's primitive, is declined, since no site uses them.
- **If a site asks,** the join is §9.3 read backward. The call to action is drawn at the seat's height and travels to it by `translate`, narrowing to the seat's width through a capsule window, with its label fading out first. At arrival its plate hands over to the seat's own by opacity. Nothing of this is built.

#### 9.6 One live fuse at a time

Home Assistant: "each fused surface is a blur layer in WKWebView, so at most one live lens or fuse at a time" ([IN HA 2]). The rule proposed: **one split or join in flight per document.** A second waits for the first to land and then plays from its own start, never landing at once. No split starts while a lens is live (the mark's lift, Q3). In 11.x the rule bounds A's two blurred plates overlapping during a split. From 12.0.0 chrome has no blur, and the rule bounds C's filter to one region at a time. It is one flag in the dock's split code, unmeasured and under 100 B.

#### 9.7 Counts (law 4)

| Change | Animations | Nodes × properties | Written per frame | Wrappers added | Thread |
|---|---|---|---|---|---|
| The fold, wi8 (11.2.0) | the content's fades on `w` | the plate 2, each region 1 | the plate's `inset` and radius, each region's `clip-path` | 0 | page |
| The fold, proposed (B) | 6: the plate's window and fill, the controls' window and row, the trade's two | 6 × 1 | 0 | 0 | compositor (rule 2) |
| The split, A, on top of the fold | 3 | 3 × 1 | 0 | 0 | compositor (rule 2) |
| The split, B | as A | as A | 2 radii (4 corners) | 0 | page |
| The split, C | as A, under the filter | as A | the layer, repainted | 1 | page, while fusing |
| The split, D | the cut replaces the plate's window | 1 clip | the clip's path | 0 | page |

Every fold lane, wi8's included, is above the ceiling's 2 per press, and so is every split. As §6.2 did for the bud, the count goes to the owner with a rule to rule on: a window and its counter-translated child count as one shape, and a crossfade's two legs as one. Counted that way the proposed fold is 3 (the plate, the row and the trade) and an open with A's split is 5. Each plate keeps its one shadow; C draws one `drop-shadow` on the union while it fuses; there are no glows.

#### 9.8 Bytes

Standalone `gzip -9` with comments stripped, an upper bound on both sides (§6.6's rule). No net is claimed; pass 10 closes each per entry from built bundles.

| Change | Adds | Removes | Release |
|---|---|---|---|
| The split, A | ≤ 354 B (`seat-under.next.css`) | at daraksha, its own block: ≤ 864 + 898 + 262 B | 12.0.0, with R-6's `beside` slot |
| The bridge, C, if the owner takes it | ≤ 190 B, and 201 B of filter markup | — | 12.0.0 |
| The fold, B | ≤ 265 B (`fold-cover.next.css`) | wi8's plate path, ≤ 1,356 B (§6.6), and its content window `w`, unmeasured | 12.0.0 |
| The call to action | — | `cta-seat.css`, ≤ 278 B at every dock site; `useDockCtaReceive` (1,181 B) and `useLiquidReveal` (278 B), which cut source and API only | 12.0.0 |
| One live fuse | < 100 B, unmeasured | — | 12.0.0 |

#### 9.9 The reading page

Written to §3.6's contract.

| Page | Shows | Send back | Decides |
|---|---|---|---|
| `P7-fuse.html`, Glass Split and Fuse | **1 · A seat that leaves the dock and joins it**: A born underneath; B edges meet; C goo (no frost); D one piece, cut. Open runs the split and the join; "Hold where they part" holds at 2.5 px, then at R-6's other openings. **2 · The fold**: A, the seats fade together as the glass narrows (wi8's grammar, modelled); B, the glass's edge cuts each seat and only the first trades with the folded sign (proposed); C, B on the press row. Slow ×4, Busy page, and Frost on A, B and D | One letter for section 1 with two held screenshots, in Light and in Dark; one letter for section 2, with Busy page off and then on | Q2 (§9.2); the fold's row and its fade (§9.4) |
| `P6-hosts.html`, Glass Mark Hosts (amended by the fold) | As §8.11, amended: section 3 rebuilt; host edges, option plates; no callout suppression | One letter per section, section 2 in Light and then in Dark | Q5; the choice's sign; Q21 and the stepped slider |
| `P5-mark.html`, Glass Selection Mark (corrected by the fold) | As §7.9: C's 16 % named as a third-party rebuild's figure; B no longer names the page dots; no callout suppression | One letter per strip | Q3, Q8, Q15, Q16 |

P7-fuse prints the Safari version and tells the owner to turn Reduce Motion off if it is on. It needs no glass-ui build. The plates are the 12.0.0 chrome (`--card` at D3's bound, 0.897 light and 0.872 dark, no blur). Its script runs in happy-dom without error; the check at 390 and 1440 px is owed (refused).

#### 9.10 Questions for the sites

- **BL (the dock).**
  1. R-6's crop failed on a backdrop under a filter and under a clip. On 12.0.0's frostless chrome neither has a backdrop to act on. Would R-6 read its crop on 12.0.0's material, with P7-fuse's D held as that crop?
  2. BM proposes that the controls' element be a second window of the plate's shape during a fold, its one child standing still (§9.4). In wi8, is there one element that holds every seat and can stand still, and where would `#persistent-end` ride?
  3. Does the dock root's box span the open width while folded? The seat is placed from it (§9.3).
  4. Would R-6's `beside` seat sit as a sibling of the plate and the controls, outside both?
- **daraksha.** Your theme seat becomes a pill on a page with its "i". Born under a 52 px disc, a pill cannot start inside it. Would the "i" stay in the seat, whose plate would then widen from the disc's width as it comes out (one more motion), or move into the dock? And should glass hold the dock open while a hand is on the seat, as your `keepOpen("grasp")` does now?
- **value.js.** You passed on the order for the split in goo that works in Safari, and for a fold that is "faster, less fade". The goo can only be drawn on a dock with no frost (12.0.0), and while it plays, the page draws the fold rather than the GPU. For the fold, does "less fade" mean the seats are cut by the glass's edge with no fade at all (P7-fuse section 2's B), or a shorter fade?
- **Home Assistant.** Your faces seat fuses with the dock, and the folded dock keeps the faces. Is the faces seat one the fold keeps in the dock (wi8's `#persistent`), or a separate seat that splits off as the dock opens? And would "one split or join at a time per page" meet your "one live lens or fuse at a time"?
- **gaggle.** Your lamp would sit in a split seat as a readout, with no hover or press answer. Does the lamp ever open anything?
- **atlas.** Folded, the theme seat rests translated inside the disc, and its box moves with it as the dock opens. Does a suite of yours read a dock seat's box during a fold or an open?

#### 9.11 Readings owed, and what pass 7 did not do

| Reading | Where | Owed to | For |
|---|---|---|---|
| One letter per section; two held screenshots, in Light and Dark; section 2 with Busy page on | `pages/P7-fuse.html` | the owner's iPhone | Q2, F7's row and fade |
| The split on 11.x's frosted dock | `pages/R4.html` (unchanged) | the owner's iPhone | §9.2, 11.x |
| R-6's bar on D and C at five openings, frost off and on, on a flat ground | `pass-7/check/crop.mjs` | Playwright WebKit (exclusive) and headless Chromium, after a reboot | §9.2; BL's R-6 |
| P5-mark, P6-hosts and P7-fuse at 390 and 1440 px, light and dark, with P7-fuse's held frames | `pass-7/check/page-check.mjs` | headless Chromium, after a reboot | the page contract; §9's pictures |
| The goo's paint cost per frame on a phone | P7-fuse's C with Busy page on | the owner's iPhone | §9.2, C's cost 2 |
| Pass 6's owed checks (the twelve pages, forced colours, the window's hit region) | `pass-6/check/page-check.mjs`, `pass-6/fold/forced-colors.mjs`, `pass-4/critique-B-check.mjs` | headless Chromium, after a reboot | §6.3, §7.6, §8 |

- **Every browser run was refused** on the kernel zone (`pass-7/retry.log`). The pages pass the static check and run in happy-dom; neither says anything about layout or paint.
- **No library source was edited.** The sketches are design sketches.
- **The bud** (F9, Q9) is pass 8's; nothing here touches it.
