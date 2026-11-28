# BM part 3: critique by evidence and consumers

| field | value |
|---|---|
| seat | adversarial critic, BM part 3's formation; I did not write it |
| model | `claude-opus-5-5`, asserted from own system identity |
| lens | evidence and consumers: each wave's DESIGN section, sketch and ledger figure against what it says; its release against the release rule (IN O-429); collisions with parts other tranches own; each message's claims against the site's source and glass's source on `release/11.1.1` and the BL scope files; promises with no wave behind them; OPEN §2 questions left out |
| read | `FORMATION.md`, `BM.md`, `waves/BM-0.md` to `BM-13.md`, `BM-R1.md`, `BM-R2.md`, the nine `messages/`; the precepts diff `git -C docs/precepts diff origin/main bm/precepts-wip` (`afe49d9`); `study/DESIGN.md`, `study/OPEN.md`, `study/choices/RULING-2026-11-23.md`, `study/pass-10/` (toggle and slider sketches, `toggle.json`, `slider.json`, `ledger/ledger.json`), `pass-2/delivery/curves.json`, `pass-3/fold/panel-fit.json`, `pass-6/fold/forced-colors.json`; BL's `audit/INBOUND.md` O-171, O-408, O-410, O-420 to O-437, `driver/glass-11.1.1-scope.md`, `driver/glass-11.1.1-exits-scope.md`, `audit/hassio-r13/PLACED.md`, `audit/hassio-r14/PLACED.md`, `audit/triage-1119/PLACED.md`, `design/dock-frames/inbound/value-js-2026-11-24-four-sites.md`, `design/dock/wi8/MEASURE-9.md`, `waves/W-I.8.md`, `W-B.17.md`, `W-B.18.md`, `W-R.1.md`; glass `src/` on master, `release/11.1.1` (`871be44bc`), `v11.1.0`, `bl/intent/proto`, `fe30f9882`; every site at the refs in `BM.md`'s header, read with `git show` and `git grep` |
| fences | no source edit, no build, no browser, no fetch. Nothing staged or committed |

Short cites follow `BM.md`: `D§n`, `OPEN`, `IN O-n`, `S112`. `R111` is glass `release/11.1.1`.

## Verdict

Two objections block. Four of the messages, and BM.md §7, promise the seat beside the dock in the dock-redesign minor, but the wave that owns that minor puts the `beside` slot in 12.0.0 and says glass couples no two docks. BM-1's Reduce Motion form, DESIGN §5.3's premise and the P6 amendment rest on a carve that glass's source says does not exist: `data-allow-motion` is not exempt from the reduced-motion rule. Fifteen objections are major. Five of them: the toggle's colour cuts on atlas's flip; fourier's toggle already sits on a filled plate today; BM-5's shell overhangs into an ancestor's scroll width; the thumbless attribute BM-5 reads exists in no branch; and a rim nobody feeds from a scroll timeline. Sixteen are minor. Most site citations hold. The list of those that were checked and stand is at the end.

## Blocking

### 1. The seat beside the dock has no wave in the dock-redesign minor

- **Where.** `BM.md:124` (§7), `waves/BM-1.md:60`, `waves/BM-12.md:12`, `:56`; `messages/value-js.md:13`, `messages/keyframes.md:11`, `messages/daraksha.md:19` and its question 5, `messages/slides.md:11` and its question 1.
- **Claim.** BM.md reads W-I.8's R-12 as "the theme seat as a round dock of its own beside the main one, anchored". Four messages promise that seat in the dock-redesign minor ("the toggle in its own round dock to the right of the main one, with the main dock anchored"; "what your /cube page's open dock has been waiting for"; "what `src/shell/SiteDock.vue` has been waiting for").
- **Evidence.** `BL/waves/W-I.8.md:125`: "R-6: the fission seat is not in 11.2.0 (RU-14). The `beside` slot, the second plate and the neck are moved to 12.0.0." `W-I.8.md:146-157`, R-12: a `ControlsDock` that "rests in a corner" (`corner` prop, four corners), "One per corner … **Glass couples no two docks.**" `W-I.8.md:221`: the `beside` slot is "12.0.0, behind R-6's crop". `BL/design/dock/wi8/MEASURE-9.md:451`: "The tip has no fission seat (`src/components/dock/index.ts:72-78`)." The only placement into the minor is the four-site file's item 12 (`value-js-2026-11-24-four-sites.md:18`), which no W-I.8 row or ruling has taken up.
- **Remedy.** Before any of the four messages goes out, BL amends W-I.8 with a row that places the seat beside the main dock, anchored, in the dock-redesign minor (item 12, the ruling's addendum). Without that row, the messages say the 11.x theme seat is a corner controls dock the site places, and glass joins the two docks in 12.0.0. daraksha's question 5 then needs a new default. BM.md §7 quotes R-12 and R-6 as they stand.

### 2. `data-allow-motion` does not pass the reduced-motion rule; BM-1, D§5.3 and P6 say it does

- **Where.** `waves/BM-1.md:22`; `study/DESIGN.md:153` (§5.3's opening line); precepts `motion-canon.md:251-253` and `:264-268` on `afe49d9`; `waves/BM-1.md:45` (G-5).
- **Claim.** "The glyph's groups keep `data-allow-motion`, so the universal carve lets the crossfade through." P6 as amended: a fill's length "keeps a tween of 150 ms or less … and the universal carve lets it through"; the toggle "crossfade[s] on the glyph's own 200 ms clock and its colour still tweens".
- **Evidence.** `R111` `src/styles/utilities/a11y-overrides.css:6-29`: the rule sits in `@layer reduced-motion` and sets `transition-duration: 0s` on `*, *::before, *::after`. "`[data-allow-motion]` is not carved: a user who asks for reduced motion outranks a per-element allowance." A glass fade that survives is "an `!important` declaration in `components`" (reveal.css, dissolve.css, transitions.css). Master (`a11y-overrides.css:26-29`, `:46-53`) says the same with `!important`. The sketch's reduced crossfade is a normal declaration (`pass-10/toggle/sketch/dark-mode-toggle.next.css:59-73`), so the reduced-motion rule wins and the crossfade cuts. Its colour transition is on the button (`:21`), so the colour cuts as well. The 200 ms clock also exceeds BL's own ruling for 11.1.1 (exits scope row 8, `S112:101`: opacity and colour "at most 150 ms"), and it exceeds the 150 ms in P6's own new sentence.
- **Remedy.** Each reduced form a wave relies on gets an `!important` carve in `components`, named in its wave: BM-1's crossfade and colour, BM-4's mark fade, BM-5's readout fade and ring, BM-6's exits, BM-7's reveal. D§5.3's opening line and the P6 amendment describe the mechanism as `R111` has it. The toggle's reduced clock comes down to 150 ms, or the owner rules the 200 ms as an exception to O-350 before BM-0 is merged.

## Major

### 3. On atlas's flip the toggle's colour cuts

- **Where.** `waves/BM-1.md:19`, `:27`; `messages/atlas.md:11`.
- **Claim.** "The colour tweens with the glyph, so nothing changes colour between two frames." atlas: "the rays, the night and the colour all on one 200 ms clock … while the glyph keeps its tween."
- **Evidence.** atlas sets `disableTransitions` true (`DockThemeToggle.vue:12`, `:35` on `u/s24-atlas`). Glass then puts `html.no-transition` on the root, and `html.no-transition *:not([data-allow-motion])` zeroes every transition (master `a11y-overrides.css:72-74`). In the sketch, `data-allow-motion` is on `.toggle-night` and `.toggle-rays` (`DarkModeToggle.next.vue:28`, `:31`), but `transition: color …` is on `.dark-mode-toggle-button` (`dark-mode-toggle.next.css:21`), which does not carry the attribute. The shapes tween and the amber turns indigo in one frame.
- **Remedy.** Move the colour leg onto an element that carries `data-allow-motion` (the `svg`, with `currentColor` inherited from it), or put the attribute on the button and keep its other legs off the flip. Make the flip strip's `disable-transitions` cell read the glyph's computed colour frame by frame.

### 4. fourier's toggle already rests filled; the on-mark attribute names one rule of three

- **Where.** `messages/fourier.md:13`; `waves/BM-2.md:21`; `BM.md:139`.
- **Claim.** "That plate rests at full strength on any control whose `aria-pressed` is true … In dark mode it would sit on a filled plate as if it were a second current seat." The attribute "keeps the plate to hover and focus with no held fill".
- **Evidence.** fourier pins 11.1.0 (`web/package.json:22`). On `v11.1.0` and `R111`, `src/components/dock/styles/controls/icon-button.css:198` paints `background: var(--dock-active-bg)` on `.dock-icon-button[aria-pressed="true"]`. `--dock-control-active-bg` is foreground at 14 % in dark (`R111` `tokens/dark-arm.css:301`). `material.css:350-375` lights its `::before` at rest. `DockControl` renders `.dock-icon-button glass-specular-track` (`R111` `DockControl.vue:95`), and fourier passes `:aria-pressed="isDark"` (`DarkModeToggle.vue:39`) with no override. So fourier's toggle already rests filled in dark. Its own comment (`:28-30`) assumes that leaving out `active` avoids the paint. BM-2 has the attribute exempt only W-B.17's "On, held" list (`bl/intent/proto` `plate.css:65-71`).
- **Remedy.** BL's row and BM-2 have the attribute also exempt `icon-button.css:198`'s active paint and the rest-light selector (`material.css:368-375`, which 11.1.2 keeps). The fourier message says the toggle sits filled in dark on 11.1.0 and that the attribute cures it. BM-2's proof films fourier's toggle in dark at `v11.1.0`, which should read RED.

### 5. BM-5's shell adds to an ancestor's scroll width, the fault atlas filmed

- **Where.** `waves/BM-5.md:34`, `:50`; `BM.md:110`; `messages/atlas.md:20`.
- **Claim.** "The finger target here rides the root's own box … so … no scroller around it gains a sideways scroll." atlas: "the target adds nothing to the scrollable width of the filter body around it."
- **Evidence.** The sketch's shell is always full size and overhangs the root on the inline axis: `pass-10/slider/sketch/slider-expand-c.css:85`, `inset-inline: calc(-1 * var(--slider-g))`. At rest it is hidden only by `clip-path` (`:95-98`), and `clip-path` does not take a box out of its ancestor's scrollable overflow. The sketch does not clip the root. At the inline edge of an `overflow: auto` body, the scroller gains g (8 px) at every pointer. This is the class of fault atlas's film G-3 recorded: "The 44 px `::after` on `.slider-thumb` and `.segmented-tab` made atlas's Filters body scroll 12 px sideways" (`S112:291`).
- **Remedy.** Keep the shell's inline overhang inside the root (padding on the root's inline ends equal to g, or the shell inset to the track), or contain it so it adds no scrollable overflow. Run G-3's witness at a fine pointer as well as a coarse one. Until it reads, atlas's message does not claim zero.

### 6. The thumbless attribute BM-5 reads exists in no branch

- **Where.** `BM.md:91`, `:138`; `waves/BM-5.md:12`, `:20`, `:24`; `messages/atlas.md:21`, `value-js.md:18`, `daraksha.md:26`, `keyframes.md:16`.
- **Claim.** "O-408's build names the thumbless attribute, which BM-5 reads." A knob is "O-408's attribute". BM-5 depends on "W-B.18 at `fe30f9882`, with O-408's thumbless default".
- **Evidence.** `git grep -i 'thumbless'` over `src/components/slider` on all 697 local and remote refs finds nothing. `fe30f9882` draws the disc as the thumb's `::before`, and its commit says the shell "takes the pointer while grown". BM-5 sets the shell to `pointer-events: none` and does not cite W-B.18's challenge finding 3, which built it that way and found the grown surface "folded away when the pointer reached it" (`W-B.18.md`, R-10). IN O-408: "no token removes the thumb."
- **Remedy.** BM-5 builds the thumbless default and the knob attribute itself, names both, and gives them a CHANGELOG line. Otherwise it names the BL wave and the ref that builds them. Either way, BM-5 cites finding 3 and says why a hit region of the root's box alone answers it.

### 7. No scroll timeline feeds the rim; both sites feed it from script

- **Where.** `waves/BM-7.md:16`; `messages/fourier.md:20`, `atlas.md:23`.
- **Claim.** "A rim fed by the page's scroll rides a scroll timeline (rule 4), and nothing is written per frame."
- **Evidence.** `ScrollProgressRim` takes only `value` and writes `--scroll-progress-rim-fill` from it (`R111` `ScrollProgressRim.vue:26-38`, `:72-91`). It has no scroll-timeline mode. atlas passes `:value="progress"` (`DockProgressRim.vue:20`) and fourier `:value="rimValue"` (`AppDock.vue:785`). Both are written per scroll frame by the site's script. The amended P5 says "Nothing writes a custom property per frame to drive motion".
- **Remedy.** BM-7 either adds a scroll source to the rim (a new prop, which the two sites adopt and their messages ask for) or drops the claim and names the per-frame write. Its proof's "only `translate` on the rim" cell runs on the sites' own feeding, not on a demo timeline.

### 8. BM.md's release rule puts box changes in 12.0.0, but BM-5 ships one in the minor

- **Where.** `BM.md:40`; `waves/BM-R2.md:7`; `waves/BM-5.md:25`.
- **Claim.** 12.0.0 carries "the changes a consumer sees in its API or its boxes". BM-5's finger target changes every slider's root box on touch, in BM's parts minor.
- **Evidence.** BM-5's own text: "The token's new default grows every slider's root on touch, a changed default look, which is why it rides this minor" (`sizing.css:305` 1.5rem to 2.75rem; `slider/styles.css:124-131`, `min-block-size`). BL placed it as a changed default in a minor (`audit/triage-1119/PLACED.md:28`, G1 (c)).
- **Remedy.** §2 and BM-R2 state the rule as BL's placement has it: a changed default look, boxes included, goes in a minor, and a removed or renamed public name in a major.

### 9. BL's other "11.3.0" rows ride the number BM calls its own

- **Where.** `BM.md:39` (§2), §7; `waves/BM-6.md`, `waves/BM-10.md`, `waves/BM-5.md`.
- **Claim.** "BM's parts minor | BM's". §7 lists other tranches' parts but none booked to the old 11.3.0.
- **Evidence.** BL booked about fifteen rows to "11.3.0": in `audit/triage-1119/PLACED.md`, value.js's G1, G6, G7, G8, G9, G10 and G17 and atlas's G3, G6, G10, G11, G14 and G15; Home Assistant's LF-16 and LF-18 (`audit/hassio-r13/PLACED.md:18`, `:22`); and the span-bar and ring part, "placed 11.3.0, O-412" (`audit/hassio-r14/PLACED.md:8`). Several cut across BM waves. value.js's G6 places O-410's "one opening (out of the trigger, by shape, read as done by 200 ms)" for all five popup surfaces, against BM-6's 370 ms grow. value.js's G7 default opens a list of seven rows or fewer anchored rather than as a sheet, which changes the surface BM-6's touch slide rides. LF-16 adds a drag-region prop (grip, chrome or all) to the detented Sheet, and BM-10's scroller "takes no pointer" in 12.0.0. LF-18's thumb rung sits beside BM-5's knob.
- **Remedy.** §2 says which of BL's 11.3.0 rows ride BM's parts minor, and BM-R1 lists them in the candidate and in G-4. Rows that take a minor of their own are named by their work. BM-6 cites O-410 and value.js's G6 and G7, and BM-10 says what becomes of LF-16's prop in 12.0.0.

### 10. P5's amendment widens O-171 to popovers

- **Where.** precepts `motion-canon.md:228-230` (`afe49d9`); `waves/BM-6.md:18`; `messages/slides.md:16`.
- **Claim.** "A menu, select or popover grows from its button by a clip of its own shape, on `bloom`, over 370 ms."
- **Evidence.** O-171 R-1 names "the `data-reveal="menu"` plate" only (`BL/audit/INBOUND.md:146`). On `R111` a Popover is the panel role and reads the `overlay` register (`_shared/overlay/content.ts:30-34`), and `--enter-overlay-spring` is `--spring-panel`. `study/choices/CHOICES.md:537`: "Dialogs, popovers and toasts grow from 94 % on the panel spring over 0.45 s … a menu grows by a clip." Choice 10 C is "today's grow", which is the menu's clip.
- **Remedy.** The amendment names menus and selects. The popover's opening goes with O-410's placement (objection 9).

### 11. BM-6 drops legs of 11.1.1's exits without naming them

- **Where.** `waves/BM-6.md:17`; `BM.md:97` ("BM builds on it and never undoes it").
- **Claim.** "Where an exit still carries a travel or scale leg after 11.1.1, this wave drops that leg and keeps the fade."
- **Evidence.** On `R111`, `styles/glass/reveal.css:246-259` translates every closed `.glass-reveal` by `--glass-reveal-slide` toward its side. The menu's clip "runs back into the strip as the plate fades, on the exit clock" (`:265-266`, `:312-314`). These are the exits the owner's O-434 order produced, and atlas's films G-1 and G-2 are read against them.
- **Remedy.** BM-6 lists each 11.1.1 exit leg it removes, by file and line, and asks BL whether removing it undoes O-434's cure. Otherwise it keeps those legs and amends P3's exit clause to match.

### 12. BM-10's proof skips the non-modal sheet, atlas's only case

- **Where.** `waves/BM-10.md:38`; `messages/atlas.md:32`.
- **Claim.** The proof reads "the sheet inside reka's Dialog on `bm/study`, its focus trap and its scroll lock". atlas's sheet question is left out because both sheets are non-modal.
- **Evidence.** atlas's two detented sheets sit in `:modal="false"` Dialogs (`FilterPanel.vue:470`, `EntityDetail.vue:404` on `u/s24-atlas`). In that case the page is not locked, and there atlas measured a swipe on the Filters drawer moving the page 285 to 507 px (IN O-423, R-096).
- **Remedy.** Add a non-modal cell to BM-10's proof in FilterPanel's shape (detents 0.9 and 1, a 940 px list): no page movement under a swipe, and `v-model:detent` once per rest.

### 13. The 12.0.0 census reads names, not the stylesheets Home Assistant imports by path

- **Where.** `waves/BM-9.md:35`, `:41`; `waves/BM-R2.md:15`; `study/pass-10/ledger/ledger.json` row 21; `messages/home-assistant.md:25`.
- **Claim.** The census checks that "no site imports a removed name". "The collapsing bar reaches Home Assistant." The message says "The collapsing bar becomes a state the scroll direction sets."
- **Evidence.** Home Assistant imports 38 glass files by `dist/` path (`frontend/src/core/sheet.css:23-60` at `f58c650f`), among them `styles/scroll-chrome.css`, `components/sheet/styles.css`, `components/dialog/styles.css`, `components/slider/styles.css` and `components/dock/styles/index.css`. A file BM moves, or a new partial a wave needs (BM-5's registered properties), breaks Home Assistant's build or drops silently there. Nothing in `frontend/src` reads `.scroll-chrome`, `--chrome-collapse-t` or `useScrollChrome`, so Home Assistant only loads the sheet and has no collapsing bar.
- **Remedy.** Each candidate's census includes the stylesheet paths each site imports. Home Assistant's message names the imported files that change in 12.0.0. The collapsing-bar line says the stylesheet changes, or goes.

### 14. G-1's bounds come from a different reference than the one it reads

- **Where.** `BM.md:62`; `waves/BM-3.md:27`, `:48`; `BM.md:113`.
- **Claim.** Each curve is "within 2.65 % of its `SPRING_PRESETS` row's closed form (panel within 3.67 %)".
- **Evidence.** 2.65 and 3.67 are errors against today's `linear()` tokens, not the closed form: `pass-2/delivery/curves.json` (`err_vs_token_pct`) and `pass-3/fold/panel-fit.json:23` (`capped_at_row.err_vs_token_pct: 3.67`). The refitted panel has no closed-form error on record. curves.json gives panel's token-to-spring gap as 0.47 %, so its closed-form error may lie above 3.67 %.
- **Remedy.** Compute each fit's error against the closed form and set G-1's bounds from those numbers, or say G-1 reads against the tokens 11.1.2's generator writes.

### 15. The messages state the goo as certain; it rests on an open owner question and two gates

- **Where.** `messages/daraksha.md:30` and question 5; `value-js.md:27`; `keyframes.md:19`; `home-assistant.md:27`.
- **Claim.** daraksha: "Glass takes over the seat's pull-apart." Its question 5's default keeps its own split until 12.0.0.
- **Evidence.** G-6 needs W-R.1 to write the dock's zero rung (`BM.md:67`, `:141`). W-R.1 still holds the blur register as the owner's open question: "OQ-2 … No default value is built on a guess" (`BL/waves/W-R.1.md:184`; OPEN §6). If G-6 or G-7 fails, BM-12 does not ship (`BM.md:172`).
- **Remedy.** The four messages say the goo comes in 12.0.0 if the dock samples nothing there and its cost per frame holds. daraksha's question 5 says what happens to its split if the goo does not ship.

### 16. daraksha's other two "REMOVE AT GLASS 11.2.0" markers go unanswered

- **Where.** `messages/daraksha.md:19`.
- **Claim.** The message maps "REMOVE AT GLASS 11.2.0" to the dock-redesign minor for the split alone.
- **Evidence.** `src/shell/SiteDock.vue:146` (`LINGER_MS = 6000`, "REMOVE AT GLASS 11.2.0 (glass takes the timings as tokens)") and `:154` (the dock hold, "REMOVE AT GLASS 11.2.0") on `origin/master` and `b13`. W-I.8 R-2 ships `--dock-linger` at 6 s and "All five hold by default" in that minor (`W-I.8.md:76`, `:78`).
- **Remedy.** The message tells daraksha that the dock-redesign minor also lets it delete the linger timer and the hold at those lines, or says where they land if R-2 moves.

### 17. O-437 arrived after the formation and is not folded

- **Where.** `BM.md:7` ("still ends at O-436"), §6, §7; `waves/BM-11.md:20`; `messages/daraksha.md`.
- **Claim.** None. The row arrived at 18:34 (`72c7caaf7`), after the formation's writes at 18:19 to 18:21.
- **Evidence.** IN O-437: daraksha's selected-seat ring (1.5 px `--dock-active-shadow`) is clipped while the dock morphs. 11.1.2 gives the morph clip room for it (`S112`, "daraksha's seat ring (O-437)"). The floating Card's room corner goes to the first minor after 11.1.2, and PagerDots keeps `ring` on. BM-11's controls window is grown by 5 px "so a 3 px focus ring at a 2 px offset is never cut", and the window says nothing about the active ring.
- **Remedy.** §6 gains the ring-room cure, kept by BM-11 (the window's cross-axis room covers the `--dock-active-shadow` spread), and §7 gains the floating Card's corner. daraksha's message carries the three answers.

## Minor

18. **Refs moved after the formation's read.** `u/s24-sci` is now `dd14d009` (was `fa6e3793`), daraksha `b13` is `d22ed84` (was `1c0ecaa`), and Home Assistant `master` is `8eb92c90` (was `f58c650f`). No cited file changed in any of them (dashboards' scatter and `states.ts`; `e2e/veil-film.spec.ts` and `src/veil/film/Layer.vue`; Home Assistant docs only). Remedy: the header's refs.
19. **Ledger reaches.** Row 0 has the toggle reaching value.js, which mounts none (FORMATION, BM-1:56). Rows 5 and 6 have the rim reaching gaggle, which mounts none (BM-7:43). So gaggle's "about 1.3 KB of stylesheet" (`gaggle.md:19`) carries 46 B of a rim it does not draw, and the figure is about 1.2 KB without it. Remedy: correct both rows and the figure.
20. **`sheet.ts:427`** is a comment line. `SheetContent` is at `:428-429` (`waves/BM-10.md:50`).
21. **dns-analysis.** "about 41 KB gzipped per route" (`dns-analysis.md:5`): the spike measured +41.42 kB gzipped on the one migrated page's chunk (`docs/tranches/E/waves/W1.md:325`). Remedy: "on the one page it migrated".
22. **The skew's default.** slides' question 2 says "From 12.0.0 a side sheet enters with no shear by default". The default has been `0deg` since the token arrived in 11.1.0 (`R111` `sheet/styles.css:37-44`: "0 by default … to opt in"). BM-10:21 does not say whether a set token still shears under rule 1 in 12.0.0. Remedy: say both.
23. **atlas's own toggle name.** `DockThemeToggle.vue:34` passes `:aria-label="name"` ("Switch to dark theme" or "light theme"). That overrides glass's fixed "Dark mode", since `forwardedAttrs` spreads `rest` last (`DarkModeToggle.vue:27-33`), and with `aria-pressed` the state is read twice. BM-1's site row says "nothing" for atlas. Remedy: BM-1's row and atlas's message ask atlas to drop the label at `:34` to take GL-7's name.
24. **OPEN §2's WebKit version.** daraksha's question 1 asks about a phone or Playwright, not the WebKit or Safari version OPEN §2 lists. Remedy: ask it.
25. **Knobs not asked of keyframes and fourier.** Both lose visible thumbs by default (`keyframes.md:16`; fourier's `FourierTimeline.vue:222` is a scrubber), but only atlas, value.js and daraksha are asked whether a slider keeps a knob. BM-5's site table says "nothing" for keyframes. Remedy: ask both.
26. **fourier's carousel dip** (`fourier.md:22`) is BL's row (`BM.md:140`), with no BM wave behind it. Remedy: say it rides the minor if BL lands it.
27. **"Over 200 ms".** atlas:11, keyframes:11, gaggle:11, dns-analysis:11, slides:11 and `affordance-map.md:181` say the tap is one 200 ms clock. The sketch delays one leg by 50 ms (`dark-mode-toggle.next.css:45`, `:57`), so the tap ends at 250 ms. The law critic has the rule; the messages misstate the figure.
28. **BM-2's six readers.** Card's derived "both" rung (`bl/intent/proto` `card/styles.css:189`, `--fill-hover + --fill-selected`) falls from 0.17 to 0.165 in light and 0.15 in dark, and every selected state from 0.12 to 0.10. Only a strip reads them, though `color-radius.css:149-154` asks 3:1 where the fill is the only carrier. "There is no third rung" (BM-2:18) holds for the plate only. Remedy: a contrast reading for Card and SortableList selected at the new rung.
29. **The span-bar part's release and the window geometry.** §7 says "the release it rides with". Its placement reads "placed 11.3.0, O-412" (`hassio-r14/PLACED.md:8`), the old number of BM's parts minor. BM-7, BM-8 and BM-11 and that part would each draw D§3's window. Remedy: name the release, and say whether one private helper serves the sites rather than three copies.
30. **Home Assistant's question 1** can be partly answered from source. It mounts `DialogContent` and `SheetContent` (`sheet.ts:47-52`, `:428`, `:449`) and a `DropdownMenu` (`dock_menu.ts:10-12`). Only which of them load in the entry needs the build.
31. **atlas's goo line.** "the goo that joins a seat to its dock never loads for you" (`atlas.md:28`) sits beside D§7.3 and BM-12:52, which have atlas fusing "a dock and its own seat", and BM-12 lists atlas among sites that may move their theme into the seat. Remedy: "loads only if a dock of yours puts a seat beside it".
32. **BM-5's labels.** Its header calls W-B.18 R-10 and R-11 "BL's slider removals", but they are the expanded view's construction. The removals are R-13 and W-B.18's "Deleted" list. W-B.18 R-13 also makes `expand` "opt-in in 11.2.0 and the default in 12.0.0", which BM-5's default-on in the minor supersedes, and BM.md §8 does not say so. Remedy: relabel, and send R-13's change to BL with §8.
33. **Cite drift.** BM-1:19 cites `light-dark.css:187, :190` after naming `--section-color-5` and then `-2`, but `:187` is `-2`. BM-1:27's `a11y-overrides.css:72-74` is master's; on `R111` it is `:49-52`.

## OPEN §2 against the messages

| Site | OPEN §2 asks | In the message |
|---|---|---|
| keyframes | sampler export; `Draggable` follow; the release | questions 1 to 3 |
| daraksha | the crash's steps, page and WebKit version; the pill seat; the gold | spec run (1), phone or Playwright (1), no version (item 24); 4; 2 |
| Home Assistant | overlays; filter held at rest as its fuse; one blur; rails `:expand`; "a row only passed" | 1; 4; 3; 2; 5 |
| value.js | gradient track; knob; theme seat | answered from source, then narrowed (1); 2; 3 |
| atlas | 8 px neighbours; suites; menu height; its two sheets; `--toggle-tone` | 1; 3; 4; answered from source (but see item 12); 6 |
| fourier | timeline and SliderControl; near the canvas; tests | 1; 2; 3 |
| gaggle | `v-model:detent` mid-drag; gate 29 and the vendor gate; the lamp | 1; 2; 3 |
| slides | toggle's place; `--sheet-enter-skew` | 1; 2 (see item 22) |
| dns-analysis | adoption; route bound | 1; 2 |

## Checked and standing

- Every cited study file exists: the toggle and slider sketches, the ledger, `curves.json`, the pass 2, 3, 4, 6, 7, 8, 9 and 10 sketches and readings, `pages/P8-present.html`. Every DESIGN section a wave cites exists, and the figures quoted from it match: D§4.2's curves, D§4.3's −87 B, D§6.2's ladder, D§7.4's switching times and bytes, D§11's rows.
- `toggle.json` gives 251 and 246 B today and 312 and 411 B proposed (+226 B). `slider.json` gives 2,320 to 2,363 B (+43 B). The ledger's per-site 11.3.0 sums give value.js's, daraksha's and Home Assistant's "about 1.2 KB of stylesheet, 0.8 KB of script, 1 KB on intent".
- `R111` `motion-registers.css:152` is `cubic-bezier(0.3, 0.2, 0.7, 0.8)`, and master `:149` is `var(--ease-out)`. `accessibility.css:9-51` is as BM-1 and BM-4 cite it, with `forced-colors.json` giving 8 px. `segmented.css:165-169` and `:184-187`, `tabs-seam.test.ts:222-234`, `useSelectionGroup.ts:2` and `:200`, and `run.css:276` (`pan-x`) are as cited. `useDockRunMark` is internal. `useSpringMount`'s callers are `DialogContent` and `SheetContent`. `subpath-policy.mjs:209` and the fourier-field barrel are as cited, and so are `bl/intent/proto`'s `--fill-hover 0.05` and `--fill-selected 0.12` with their six readers.
- keyframes.js 6.5.0: `index.ts:37`, `:52`, `:57`, `sample.ts:75` (unexported), `draggable.ts:127`, and `DEFAULT_VELOCITY_WINDOW = 100`. `@mkbabb/fourier` 0.1.0's exports and `sideEffects: false` match BM-13, and its `spectrumOf` is the same DFT as glass's `dftFromPoints`. I did not query npm.
- Every site pin and every cited site line in the nine messages and the wave tables reads as stated at the cited refs. The exceptions are items 20 and 23 and the claims objected to above.
