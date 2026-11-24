# BM study, pass 6: Critic B (production iOS Safari and the evidence)

Seat: Critic B, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, page or source, and I staged nothing. This file is the only thing I wrote in the repo.

**First line, as the plan asks of every pass.** No iPhone reading has returned (`READINGS.md`: nothing published, nothing returned), so every decision of pass 6 is provisional until pass 9. P5-mark (rebuilt) and P6-hosts are unpublished, and neither has been opened in a browser.

**What I read.**
- The study: `CHARTER.md`; `UNION.md` whole (§4's pass-6 line; §2; Q4, Q5, Q18, Q21; rows L1 to L20, T1 to T10, S1 to S9, A1 to A9, I9 to I22); `union-fold.md`; `INBOUND.md`; `READINGS.md`.
- `DESIGN.md`: pass 6's section whole (§8.1 to §8.12), with §1, §2.1, §3.1 to §3.9, §4.1 to §4.3 and §7.1 to §7.11 as amended in pass 6, and §6.3 to §6.4.
- Pass 6's files: `pass-5/fold.md` (folded by pass 6); every file under `pass-6/` (`census/`, `hosts/`, `fold/` with its sketches, `check/`, `retry.log`); `pages/P6-hosts.html` and `pages/P5-mark.html` whole; the prototype on `bm/study` (`fbf21f1fc`, `83d2331c1`, `prototypes/bm-pass-6/slider-bytes.mjs` and `.json`).
- Behind the claims:
  - glass-ui at `2dbc19a5c`: `switch/styles.css:40-66`, `Switch.vue:35-55`; `progress/Progress.vue:175-235`; `pager-dots/worm.ts:26-60`, `:180-230`; `composables/motion/morph/useLeadTrail.ts:1-60`; `carousel/projection.ts:25-70`; `slider/styles.css` (every `transition`), `slider/types.ts:1-40`; `styles/glass/control-bit.css:256-300`; `styles/utilities/a11y-overrides.css:40-55`; `tokens/scheme-motion.css:101`; `dock/DockLayerGroup.vue:50-120`; `git grep` for `trailOffset`, `useLeadTrail`, `useDragMorph`, `touch-callout`.
  - reka-ui 2.10.1 in `node_modules`: `Menu/MenuItemImpl.js:39-71`; `Slider/SliderHorizontal.js:42-82`.
  - `bl/dock/wi8` @ `d48c19ec8`: `run.css:20-40`, `:255-275`, `:495-535`; `useDockState.ts:236-300`. `release/11.1.1` @ `a5452a1a3` and `bl/slider/proto` @ `fe30f9882`: `Slider.vue`.
  - BL: `waves/W-B.18.md:38-135`, `waves/W-R.1.md:76-86`, `waves/W-B.17.md:516`, `:655`, `waves/INDEX.md`, `audit/triage-1119/PLACED.md:28`, `audit/INBOUND.md:398` (O-408).
  - BJ: `formation/ios27/IOS27-CODEX.md:29` (law 12); `addenda/2026-07-24-refinement/IOS27-ARCHIVE.md:6`, `:18`.
  - `read/ios27-glass.md:46`, `:78` (the Liquidum lines).
  - The sites, read only by `git show` and `git grep` at the refs pass 6's census names: Home Assistant `master@0f6deae4` (`frontend/src/tiles/rails.ts`, `GlassTabs.ts`, `car.ts`, `air_sheet.ts`, `garage_sheet.ts`, `people.ts`, `cards/glass-automatic/auto_card.ts`, `cards/glass-day/phases.ts`, `tiles/css/rooms.css`); daraksha `b11-occasion` (`src/gilt/gilt.css:50-66`); value.js `c45` (`demo/palettes/PalettesPane.vue:140-165`, `demo/styles/foundation.css:486-494`, `demo/shell/dock/Dock.vue:305`); sci-report `u/v19-sci` (`DemandFilter.vue:55-80`, `url-params.ts:232-238`); fourier `f45` and keyframes `kf45` (`DockLayerGroup` mounts).
  - `pass-1/census/census.json` (pass 1's import census).

**What I ran.**
- `pass-6/check/dom-run.mjs` under `guarded --light`: all twelve pages run in happy-dom with no script error, P6-hosts' drags, hold and level included. It writes nothing, so I left no trace in the pass's files.
- `git grep` and `git show` over the site refs above, and over glass-ui's branches. No checkout.
- Arithmetic in my head and in the objections: the ×1.06 grow per edge and in total; the grab offset's reach.
- I did not re-run `hosts.mjs`, `fold.mjs` or `bytes.mjs`, since each rewrites its JSON in the pass's folder. Their outputs agree with §8's figures as quoted, and `worm` agrees with `worm.ts:40-49`.

**What I tried to run.** `pass-6/check/page-check.mjs` (P6-hosts at 390 and 1440, light and dark): refused on the kernel zone (Retry, below). No objection rests on it.

**Verdict.** Pass 6 reads BL's Slider wave, the dock's run and reka's menu faithfully, keeps every decision provisional in its first line, and its arithmetic reproduces. Its host census is the weak point. It greps templates only, so it misses every Home Assistant mount, which pass 1's import census had recorded. That reverses the Q21 finding on absorbed dots, misplaces Home Assistant's day-mode segment, and sends Home Assistant a question built on a false premise (B6-1, B6-2). Two reading pages give the owner provenance the record does not support (B6-3). The stepped follow is proposed without the pointer source it needs (B6-4). The link seats take a callout suppression UNION refuses (B6-5). PagerDots is put to the owner on a letter that misdescribes it (B6-6). daraksha's knob is counted as hidden (B6-7). Seven minor points follow.

## Objections

### B6-1 (blocking). The host census misses every Home Assistant mount, so §8.2, §8.3, §8.5 and §8.10 rest on false counts

**Claim.** `census/hosts.mjs` is said to record "every host's mounts at each site's current ref" (§8, working files). On that census, §8.2 item 5 says Home Assistant's "sliders are its own today (no `<Slider` at `master@0f6deae4`)", and §8.10 asks Home Assistant whether it would mount glass-ui's Slider. §8.5 says absorbed dots "are not built: no site mounts `marks` at its current ref (no `:marks=` in `census/hosts.json`)". §8.3 and §8.5 list Switch, Progress and ToggleGroup sites without Home Assistant.

**Evidence.**
- The census greps template syntax only (`<Slider([ >]|$)`, `:marks=`, `<Switch…`, `<Progress…`, `<ToggleGroup…`). Home Assistant mounts glass-ui through Vue render functions, so every one of its mounts is invisible to it.
- At `hassio-config master@0f6deae4`, the ref the census names:
  - `frontend/src/tiles/rails.ts:27` imports `Slider` from `@mkbabb/glass-ui/slider`; `:234-247` renders it with `variant`, `size: "lg"`, `step` and `marks`. The header calls it "glass-ui's knobless `scrubber` for a quantity" (`:2`).
  - The same file builds absorbed dots on glass-ui's `marks`: "A rail with six steps or fewer draws a mark on each step still ahead of its fill" (`:18`), and `:219-226` keeps only the steps with `mark > now + step / 2` ("A step's mark only ahead of the fill"). That is UNION S9's absorb, shipped by the site with the tightest bounds.
  - Switch: `auto_card.ts:20, :138`; `air_sheet.ts:19, :113`; `garage_sheet.ts:10, :44`; `people.ts:21`. Progress: `car.ts:11, :156`. ToggleGroup (`type: "single"`): `cards/glass-day/phases.ts:98`, and eight files import it.
- Pass 1's own census, by import parsing, already had them: `pass-1/census/census.json` records Home Assistant importing `Slider` 1, `Switch` 5, `ToggleGroup` 8, `Progress` 1. Pass 6's census regressed from that method without saying so.
- The census's `ToggleGroup single` pattern (`<ToggleGroup[^>]*type="single"`) also reads one line only, so a multi-line tag at any site is missed.

**What it changes.** Q21's "absorbed dots are not built … a site that asks gets A from the engine" is reversed: the site already builds A, by hand, on `marks`. §8.10's Home Assistant question has a false premise. §8.2 item 4's stepped follow and §8.3's switch reach Home Assistant's WKWebView at 60 fps, and its entry is at 71.6 of 71.8 kB ([IN HA 5]), but no row of §8 names it as a host.

**Remedy.** Re-run the host census by pass 1's import parsing (or add an `h(Name` pattern), multi-line. Restate §8.2 item 5, §8.5's absorbed-dots paragraph, §8.6, the Switch, Progress and ToggleGroup host lists, and §2.1's thumbless row. Withdraw §8.10's Home Assistant question and ask instead whether its rails' `marks` rule and its own hand would move into the Slider, or stay Home Assistant's.

### B6-2 (major). Home Assistant's day-mode segment is a ToggleGroup, which §8.6 gives no mark, and its commit is the house's report, not the confirm

**Claim.** §8.6 closes Q4 per host: "ToggleGroup | each item's own fill (T7) | no | at `click`", and then "A pick that asks to confirm (Home Assistant's day modes) keeps §3.4's rule". §3.4's rule: "The mark settles on the pick and the confirmation opens. The model and `aria-selected` change on confirm."

**Evidence.** `cards/glass-day/phases.ts:3`: the day-mode segment is "one glass-ui `ToggleGroup type="single"` of capsules, the house's phase its selected plate". Its commit is neither the tap nor the confirm: "The plate is drawn from the select's state, never from the tap" (`:12-13`); "a press never acts. It opens the confirm sheet" (`:18`); "the plate moves when the engine reports the phase" (`:27`). This is the host Home Assistant asked the lens for ([IN HA 1]). By §8.6's ToggleGroup row it gets no mark; by its last line it gets one. The two rows cannot both hold for the one host.

**Remedy.** Decide whether a single ToggleGroup takes the mark where a site asks for it (Home Assistant), or tell Home Assistant its segment keeps its own fill. Restate §3.4's confirm rule as "the selection follows the source of truth", which for Home Assistant is the engine's report, and drop "on confirm".

### B6-3 (major). Two reading pages give the owner provenance the record does not support

**Claim.**
- §8.5: "iOS 27's reasoning-effort control ([ARC]:18 …) is a quantity, so it is occupied length." P6-hosts, section 3, letter A, tells the owner: "as iOS 27's effort control does" (`P6-hosts.html:137`).
- P5-mark, rebuilt by this pass's fold (A5-12, B5-6), letter C: "Lifts 16% while you drag it, the amount Apple's tab bar lifts" (`P5-mark.html:126`). §7.5 (amended in pass 6): "C lifts to 1.16 while dragged (Apple's, from the record's simulation …)".

**Evidence.**
- The codex line §8.5 cites in the same paragraph names the control's source: "IMG_2287/2288—the ChatGPT iOS reasoning-effort popup in two slider states", marked "[RATIFIED—quantified; provenance corrected]" (`BJ/formation/ios27/IOS27-CODEX.md:29`). The archive row that calls it an "iOS 27 element" (`IOS27-ARCHIVE.md:18`) predates that correction. The owner's own words in W-B.18 keep the two apart: "study the chatgpt app's screenshots and ios27 items" (`W-B.18.md:7`). So the record holds no Apple occupied-length control. UNION S9's "A, device" inherits the same mislabel.
- The 16 % is a third-party Flutter package's description, "not an Apple spec": "the selected tab grows 16% and is lensed through it, as in UIKit" (Liquidum 0.2.1, `read/ios27-glass.md:46`). It describes the tab growing under the lens, which is UNION L9 (the glyph's growth), not a lift of the lens. Find My's 1.14 is a resting height relative to the bar, not a lift.
- On a reading page the owner chooses by what he is told. A letter labelled as Apple's, or as iOS 27's, carries an authority the record does not give it.

**Remedy.** Correct both pages and §7.5 and §8.5: letter A on P6-hosts "as ChatGPT's iOS effort control does", or no attribution; letter C on P5-mark "16 %, a third-party rebuild's figure for the tab under the lens". Note UNION S9's provenance in §8.5. Q21's split between a choice and a quantity can stand on codex law 12's own title, "Discrete progress".

### B6-4 (major). The stepped slider's follow has no source for the finger's position, and reka's value would disagree with it by up to half a thumb

**Claim.** §8.2 item 4: "while the finger is down the fill's end follows it continuously (rule 3, one `translate` write per pointer event on the fill and the thumb, not a custom property inherited by the root); the model and `aria-valuenow` change as the finger crosses each step's boundary; at release the end settles on the chosen step". P6-hosts section 3 shows it.

**Evidence.**
- reka owns the pointer. It maps `event.clientX - rect.left - offsetPosition`, where `offsetPosition` is the grab offset taken from the thumb's rectangle on the first move (`node_modules/reka-ui/dist/Slider/SliderHorizontal.js:46-54`; UNION S7; W-B.18 R-10, "reka takes the grab offset from the node's rectangle"). It emits stepped values only. BL records that the Slider cannot reach the mapping: "Finer travel needs the Slider to own the pointer-to-value mapping, which reka does not expose" (`W-B.18.md:294`, OQ-3).
- A fill drawn at the finger and a value computed at the finger less the grab offset cross each boundary at different places, by up to half the thumb: 10 px at `md`, nearly two steps on the dashboards' 50-step filters (about 5.7 px a step). The reader would see the fill past a step while the readout and `aria-valuenow` still show the previous one.
- R-9's mechanism is one number, `--slider-p`, read by both transforms (`W-B.18.md:67-74`). The proposal adds a second writer of `translate` on reka's thumb node and on the fill, beside it, and hands back at release. Neither the hand-back nor its cost is in §8.8.
- Home Assistant, the site with the most stepped sliders, already puts its own hand in front of glass-ui's slider so that it "lands the value exactly under the finger", with detents felt as haptics (`rails.ts:5-11`, `:16-17`). That is a site answer the proposal needs and does not have.
- P6-hosts's level maps the pointer itself (`P6-hosts.html`, `Level`), with no reka and no grab offset, so its reading cannot show the disagreement.

**Remedy.** Name where the finger's position comes from (the Slider owning its pointer, UNION S7's direction), state how the drawn end and reka's value agree while the finger is down (one mapping, not two), price it in §8.8, and ask Home Assistant before proposing it to BL.

### B6-5 (major). `-webkit-touch-callout: none` on link seats is the callout suppression UNION A9 refuses

**Claim.** §8.1: "Seats that are links take `-webkit-touch-callout: none`, so a press that becomes a drag never raises the link preview."

**Evidence.** UNION A9: "Suppressing the context menu and callout | R | … | workaround | — | **REFUSE**." The property suppresses the system's link preview and its menu (open in a new tab, copy link) on every seat that is a link, for every reader, including those who never drag. Nothing in glass-ui or wi8 sets it today (`git grep touch-callout` finds nothing in either). What it guards against is unread: iOS raises the preview on a hold, and the fitting run's drag starts after 6 px of movement, which ends a hold. The hold that does raise it on a dock is wi8's own 500 ms pin on a collapsed dock's seat (`useDockState.ts:236-300`), which is BL's, not the drag's. P6-hosts's seats are buttons with the property already set (`P6-hosts.html`, `.seat`, `.port`), so the reading cannot test it.

**Remedy.** Strike it from §8.1. If a drag on a link seat raises the preview on the owner's iPhone, that is a reading to ask for on P6-hosts with link seats and no suppression, and the cure is BL's with the 500 ms pin.

### B6-6 (major). PagerDots' worm is put to the owner on a letter that misdescribes it, every letter removes it, and `useLeadTrail` cannot go whole

**Claim.** §8.5: the worm's "elongation is Q8's question asked again … Either way `useLeadTrail` (≤ 784 B) and the worm's integrator (`worm.ts`, ≤ 1,179 B) go … P5-mark's Q8 B names the worm so the owner reads it there." §8.8: removed "if the owner takes Q8's A or B". §8.10 tells atlas and daraksha "The owner decides it as Q8, on P5-mark."

**Evidence.**
- P5-mark's B: "Stretches as it travels, as the carousel's page dots already do: its front edge leads, its back edge follows, up to a fifth longer" (`P5-mark.html:135`). The worm is not a fifth longer. Its elongation ceiling runs from one pitch to three, 28 to 84 px for hops of 1 to 11 cells (`worm.ts:40-49`; `pass-6/hosts/hosts.json`, `worm`), drawn as two bodies and a neck (`worm.ts:205-220`). No page shows the worm.
- Every Q8 letter removes the worm as built: A makes it the mark's glide, B the window's two handles, and C and D are not addressed. "If the owner takes Q8's A or B" sets no condition. The owner's answer on P5-mark would be read as his ruling on a part he never saw.
- `useLeadTrail.ts` has a second consumer. Its header: "TWO CONSUMERS, ONE LAW. `trailOffset` is exported because the carousel's interior content-lag is the same bounded velocity lag" (`:38-41`). The Carousel imports it: `src/components/carousel/projection.ts:31`, `:70`. The dashboards (HeroStage's Carousel) and fourier (GalleryFeaturedCarousel) mount the Carousel.

**Remedy.** Add today's worm as its own letter on P5-mark's strip 2 (or on P6-hosts), correct B's description, and say that every other letter retires it. Keep `trailOffset` (move it to the carousel) and restate §8.8's row as `worm.ts` plus `useLeadTrail` less `trailOffset`.

### B6-7 (major). daraksha draws a knob on purpose, so "four of six" hide the thumb is three, and daraksha's question is false

**Claim.** §8.2 item 5: "Four of six slider sites make the thumb the fill's colour by token today (… daraksha `gilt.css:58`, `:65`). Under O-408's default those overrides become redundant." §8.10: "value.js, fourier, keyframes, daraksha. You set `--slider-thumb-bg` to the fill's colour to hide the thumb."

**Evidence.** `daraksha b11-occasion:src/gilt/gilt.css:54-66`: "The knob takes glass's own token (11.0.2): the gilt's light at night, the paper's ground by day." At night the knob is `--gilt-light` on a `--gilt-body` fill; by day it is `var(--ground)` on a `--gilt-deep` fill. That is a knob in its own tone, not the fill's colour. value.js (non-spectrum, `foundation.css:490-491`), fourier (`FourierTimeline.vue:293`, `SliderControl.vue:272`) and keyframes (`style.css:255`) hide it; atlas's two slider sites set nothing. Under O-408's default daraksha's chosen knob disappears, a visible change at daraksha that §8 does not flag.

**Remedy.** "Three of six." Ask daraksha whether its day and night knob goes with the thumbless default, and drop daraksha from the question as worded.

### B6-8 (minor). The Slider's removals are dated 11.1.1, but the 11.1.1 branch still carries them

**Claim.** §8.2 item 1: "BL's R-13 stops mounting it in 11.1.1"; §8.8's release column gives 11.1.1 for the 1,525 B, the 776 B and `useDragVelocity`; §3.3 and §3.9 repeat it.

**Evidence.** `release/11.1.1` @ `a5452a1a3`, `src/components/slider/Slider.vue`: 40 lines name the loupe, 25 the veil, 21 the grasp, 2 `useDragVelocity`, the same as master. Only `bl/slider/proto` @ `fe30f9882` has none. W-B.18 is not in BL's `waves/INDEX.md`. R-13's "From 11.1.1" is BL's plan, not a release.

**Remedy.** Date the rows "BL's W-B.18, on `bl/slider/proto`, release unset". Q18's reading stands on the census either way.

### B6-9 (minor). The census's own rows show no site displays DockLayerGroup's switcher, and §3.1's `:draggable` line contradicts §8.6

**Evidence.**
- `census/hosts.json`: the two sites that mount DockLayerGroup both hide the switcher (value.js `Dock.vue:305`, daraksha `SiteDock.vue:244`, `:show-switcher="false"`). fourier and keyframes no longer mount it (`EditorControlsDock.vue:248`, `ChromeDock.vue:441`, comments only). Yet §8.6 designs the switcher's mark and drag, §2.1 keeps "Takes the mark", and §3.1 still lists four sites.
- §3.1's SegmentedTabs row still says "`:draggable` once: value.js `demo/palettes/PalettesPane.vue:156`". That prop is `PaletteInspector`'s (`PalettesPane.vue:149-156`), and §8.6 says no site sets SegmentedTabs' `:draggable`.

**Remedy.** Say in §8.6 that no site shows the switcher, and weigh it under the overfitting rule before building its drag. Amend §3.1's two rows.

### B6-10 (minor). The ledger counts the loupe rules and `useDragVelocity` twice, under two owners, and nets the halo without the ring

**Evidence.** §3.2 still lists "Slider loupe rules | 815" and "`useDragVelocity` | 809" among BM's removals, and its per-site net (5,332 B before pass 2's strikes) includes both. §8.8 credits the same loupe rules (inside its 776 B) and `useDragVelocity` to BL. The 776 B also removes the spectrum's halo (`83d2331c1`) without adding R-8's ring, which replaces it (`W-B.18.md:62-66`).

**Remedy.** One row per removal with one owner: strike the 815 and 809 from BM's per-site net, as pass 2 struck the specular, grasp and veil. Net the ring against the halo.

### B6-11 (minor). The reduced-motion dips for the Switch and Progress have no mechanism that survives the library's fallback, and none is priced

**Claim.** §8.3: "Under reduced motion the thumb dips … 200 ms (rule 2's reduced form)". §8.5: Progress's `transition: none` "takes the dip of §4.3's reduced column". §8.8: "Added: nothing beyond §7.8's mark".

**Evidence.** Both parts move by CSS transitions today (`switch/styles.css:49`; `Progress.vue:188`). Rule 2's reduced form is the WAAPI player's (§4.3). Under reduced motion the fallback sets every CSS transition to 0 s and every CSS animation to 0.01 ms, `!important`, in an earlier layer (`a11y-overrides.css:46-53`). A CSS dip is cut. The dip therefore needs the player in Switch and Progress (new JS in each, not in §8.8), or enrolment in the authorised set (the owner's ruling, §4.3 rule 1). §4.3's own examples put the switch thumb under rule 1, not rule 2.

**Remedy.** Name the mechanism per part, price it in §8.8, or list both under §4.3's enrolment question.

### B6-12 (minor). "On the compositor" and the §2.1 amendments are stated as settled

**Evidence.** §8.3: "20 px in 214 ms, 6.4 frames at 30 fps, on the compositor". The switch rides `--spring-dock` (`switch/styles.css:49`), a 48-stop `linear()`, which runs on the page's thread in 27.2, every iOS 26 Safari and Home Assistant's WKWebView (§4.1). It reaches the compositor only if the owner takes the token trade and R2's lane D glides (§4.3). Pass 5's fold (B4-3) made this correction for the bud. Pass 6's amendments to §2.1 (the run mark, the switch, the thumbless slider, PagerDots) carry no "provisional until P6-hosts" marker, where pass 4's and pass 5's did, and pass 10 rewrites from §2.1.

**Remedy.** Write "on the compositor if the single-curve tokens are taken (§4.3)". Mark each pass-6 amendment in §2.1 provisional.

### B6-13 (minor). P6-hosts reads the choice's sign on the page ground only, while §8.7 argues from the worst ground

**Evidence.** §8.7 puts the edge's case as "3:1 in both modes on the page ground (3.54 light, 4.68 dark) and over the worst ground under R3b's A (3.29, 3.72), and below 3:1 under B and C". P6-hosts section 2 draws its strips on the page's flat `--card` (`P6-hosts.html`, `.letter`), with no plate and no ground behind them. The owner's Light and Dark answer reads the page-ground case only.

**Remedy.** Say in §8.7 that the worst-ground figures stay a model, or put one strip of section 2 over the worst ground (black in light, white in dark) under R3b's A.

### B6-14 (minor). The ×1.06 argument compares per-edge travel with a whole-size figure

**Evidence.** §8.2 item 2: "×1.06 moves each edge of a 12, 20 or 28 px band by 0.36, 0.60 or 0.84 px … where the library's own note puts 0.8 px below the scale channel's legible floor (`control-bit.css:289-290`)". The note's 0.8 px is the whole change of a 20 px face at 4 % ("4% of a 20px painted face is 0.8px"), and the same sentence puts 1.2 px whole below the floor (`--lq-stretch-x` "on a 20px object is 1.2px"). In whole terms ×1.06 is 0.72, 1.2 and 1.68 px. The conclusion holds for 12 and 20 px by the note's own 1.2. `hosts.json`'s `under_legible_floor_0_8px` treats 0.8 px per edge as the floor, so its "false" for 28 px rests on a metric the note does not give. The note is a library comment, not a reading.

**Remedy.** Compare in whole terms and call it a model. P5-mark's B (1.06) is where the owner reads the amount.

## Dropped on the second reading

- **P6-hosts has no Busy page switch,** though §8.1 refuses B partly because a non-passive `touchmove` would stall the run's scroll on a busy page. B is refused on three other grounds, any one enough (§8.1), so the stall claim carries no decision.
- **The reasoning-effort control reclassified as a quantity.** I first read it as a relabel to escape law 12 against O-4. Codex law 12's own title is "Discrete progress as fill-pill + dots", so the quantity reading has the record's support. Only its provenance stays (B6-3).
- **The switch face's clock.** §8.3 says 214 ms; the face's colour transitions on `--duration-fast`, 0.2 s (`control-bit.css:279-282`; `scheme-motion.css:101`). Six frames at 30 fps either way, so law 7 holds.
- **The phone dock's fit.** "On a phone dock of four or five seats that run fits" is uncited, but five 44 px seats and their gaps fit a 358 px row with room.
- **iOS's edge swipe on a fitting run's drag.** Nothing places a dock seat in the system's edge zone, and P6-hosts reads the drag on the phone.
- **P6-hosts samples its settle at 120 keyframes a second** where the library's player uses 12 to 24. That changes the curve's fidelity, not its thread (both use the `linear` keyword between keyframes), and the reading is of feel.

## What the pass does not touch, checked

- **The pages run.** `dom-run.mjs` reproduces: twelve pages, no script error, P6-hosts' drags, hold, levels and keys exercised. It says nothing about layout or paint.
- **reka's menu.** `MenuItemImpl.js:39`, `:54` return early unless `isMouseEvent`, so a finger sliding down an open menu highlights nothing (§8.4), as stated.
- **wi8's run.** The header's "A JS flick projector cannot coexist with them" and the five properties measured in "real Safari 26.4" (`run.css:28-36`), `pan-x` (`:268`), `pan-y` on the vertical run (`:508`) and `[data-run-fits]` as `overflow: visible` (`:528-530`) are as §8.1 quotes them.
- **The kinematics.** `fold.json`'s release table (5.7, 11.5, 19.1 px past the rest), its capped seeds and its half-pixel ends (225 to 383 ms) are as §4.3 and §7.2 quote them. `hosts.json`'s step jumps and worm ceilings match their formulas and `worm.ts:40-49`.
- **The prototype's bytes.** `slider-bytes.json` gives 4,388 → 2,863 B and 1,987 → 1,211 B, as §8.2 quotes them. (B6-10 is about who is credited, not the figures.)
- **The loupe census.** No site mounts `loupe`, by template or by import, Home Assistant included (`pass-1/census/census.json`; `git grep` at each ref). Q18's reading stands.
- **gaggle's GPU words.** Pass 6 adds no GPU code to any chunk.
- **One live blur (Home Assistant).** No host in §8 adds a blur. The mark and the fills sample no backdrop.
- **WKWebView at 60.** The follow (rule 3) is page work at the page's rate, as §4.3 says. In Low Power Mode it is 30 fps, which §8 does not state for the two new follows (the fitting run's drag, the stepped slider's fill). Today's step jumps are drawn at the same rate, so nothing gets worse.

## Retry

`pass-6/check/page-check.mjs` was refused on the kernel zone at 22:11:36 (`data.kalloc.1024` at 14.48M), after the pass's six refusals from 21:10 to 22:02 (14.29M to 14.45M, `pass-6/retry.log`). The zone log shows the count still climbing at about 55 a second (`~/.claude/guard/log/zone.log`, 22:10, 14,475,093), and it falls only on a reboot, so I did not hold the seat for the hour. The page check, `pass-6/fold/forced-colors.mjs` and `pass-4/critique-B-check.mjs` stay owed as §8.12 records them. No headless engine draws WebKit's backdrop or reads the iPhone's frame rate, so none of them replaces P5-mark or P6-hosts on the owner's phone.
