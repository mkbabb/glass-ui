# BM study, pass 1: Critic B (production iOS Safari and the evidence)

Seat: Critic B, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, page or source and staged nothing.

**What I read.** `CHARTER.md`, `UNION.md` (whole), `union-fold.md`, `INBOUND.md`, `READINGS.md` (no page published, no reading returned), `DESIGN.md` (pass 1's section), every file under `pass-1/`, the seven pages under `pages/`, and the parts of `read/rida-ui.md`, `read/ios27-glass.md` and `IOS27-ARCHIVE.md` the pages cite. I re-read the glass-ui source behind each census and reach claim, and the site refs the census names (hassio-config `master`, atlas `u/build-atlas-rc`, keyframes `kf45`, value.js `c45`, gaggle `site-redesign`, fourier `f45`), plus HA's installed 11.1.0 dist.

**What I ran.**
- The page check, from a copy writing only to my scratchpad, through `guarded`. It was refused both times on the kernel zone: at 17:10 (`data.kalloc.1024` at 13.49M) and at 17:17 (13.51M). The zone only climbs until a reboot (+62/s in `zone.log`), so the check stays owed. It is a headless Chromium check and could not have judged B-7, B-8 or B-9 anyway.
- `check/curve-numbers.mjs` under `guarded --light`. It reproduces `curve-numbers.json` exactly.
- R4's overlap window under `guarded --light` (B-9).
- One web search, for Safari's user-agent string on iOS 26 and later (B-11).

**Verdict.** The law (§1) restates UNION §2 faithfully. The census method is sound, and most of its rows hold. The pass fails in three places:
- Three census and reach claims are contradicted by source (B-1, B-2, B-4).
- A site's answer is misfiled (B-5), and a two-site ask is moved onto the owner's list (B-6).
- Three of the seven reading pages could return a reading that answers a different question from the one asked (B-7, B-8, B-9).

None of the pages has been run in any browser. R3 should not be published until B-7 is cured. R1 and R4 should not be published until B-8 and B-9 are cured.

---

## Objections

### B-1 (major). The focus veil is mounted by every modal dialog, not only by the slider loupe

**Claim.** §3.1 says "Focus veil | **none** | It mounts only with `loupe`". §2.1's Slider row says "the focus veil it alone mounts". §3.3 deletes it with the loupe in 12.0.0, "by the overfitting rule". §3.2 books its 469 B as a free removal at every site. Pass 1 never read the veil's other mount, so the dialog's veil is missing from law 1's reach and from Home Assistant's one-live-blur bound.

**Evidence.**
- `src/components/dialog/DialogContent.vue:195`: `<ModalOverlay veil :opacity="scrimAlpha" …>`.
- `src/components/dialog/ModalOverlay.vue:87`: `<span v-if="props.veil" class="glass-focus-veil" …>`. Its header (`:19-31`) names DialogContent as the veil's one passer, on purpose.
- The same mount ships in the 11.1.0 dist the sites load: `DialogContent-DJygHaaN.js` passes `veil: ""`, and `motion-I9NTY5vI.js` renders `class: "glass-focus-veil"`.
- `DialogContent` is imported by value.js, daraksha, fourier, keyframes and Home Assistant (`census.json`, imports).
- Home Assistant's `frontend/src/styles/scale.css:10-12` sizes the veil because its dialogs paint it. It is generated "from @mkbabb/glass-ui 11.1.0 … through the hooks it declares". §3.1 reads this as "sizes it anyway".
- The veil is "one fixed full-viewport `backdrop-filter` plate" (`tokens/glass.css`, FOCUS-VEIL cohort; UNION S6). So every modal opened in HA's WKWebView carries two live blur layers: the veil and the dialog plate. That is the bound HA states in [IN HA 2] and [IN HA bounds].

**Remedy.**
- Correct §3.1 and §2.1, and strike the veil from §3.3 and from the ledger's free removals.
- Add the Dialog row's law-1 breach: a blurred plate over a full-viewport blur.
- Open the veil's fate as its own question for pass 8 (dialogs), priced against HA's one-live-blur bound.
- The loupe deletion can stand on its own census.

### B-2 (major). `.glass-capsule` reaches every glass Button, Chip and active dock seat; the 85 B removal is mis-scoped, and law 1 misses sibling-stacked glass

**Claim.**
- §3.1 lists `.glass-capsule`'s only consumer as Home Assistant's slide thumb.
- §3.2 books "the capsule's own blur inside its track" as 85 B removed at every site.
- §2.1's GlassDock rows list law 5 only.
- Law 1 is measured as "No blurred element under a blurred ancestor".

**Evidence.**
- `ledger/measure.mjs` measures the whole rule `.glass-capsule{backdrop-filter:var(--glass-blur-floating)}`, not the indicator in its track.
- That class is composed by `Button.vue:122` (every glass-material Button), `chipVariants.ts:4` (every Chip), `Configurator.vue:431`, `DockControl.vue:97` (`{ "glass-capsule": props.active }`) and `SegmentedTabs.vue:229`. Deleting the rule unglasses all of them.
- The active dock icon seat is a second `backdrop-filter` in the dock. `dock/styles/controls/icon-button.css:216-236` says "The capsule's rim/lift `box-shadow` + `backdrop-filter` already apply", against `dock.css:76`'s "ONE backdrop-filter in the dock". The only exception is `adaptive-legibility.css:109-111` under `data-backdrop-mode="static"`.
- The seat's plate is a sibling painted before it, not an ancestor, so law 1's ancestor clause cannot see it. The "count per container: 1" clause would.

**Remedy.**
- Price T2's cure as a scoped rule: the indicator in its track takes no backdrop, which removes nothing and may add a few bytes.
- List the active DockControl's capsule under GlassDock as a law-1 breach.
- State law 1's measurement as "backdrop-filters per container, siblings included: 1", and drop the ancestor-only reading.

### B-3 (major). The ledger leaves additions unpriced and measures against a baseline BL is changing; "room inside Home Assistant's 0.2 kB" is stated past the evidence

**Claim.** §3.2: "Every site comes out lighter by about 3.8 to 4.6 KB gz … That is room for pass 2's delivery inside daraksha's 6 KB and Home Assistant's 0.2 kB."

**Evidence.**
- Two removals are not free. The veil (B-1, 469 B) and the capsule (B-2, 85 B) take about 554 B off every site's removal column.
- Unpriced additions:
  - The velocity estimator that replaces `useDragVelocity` (I9: keyframes.js's). Today Slider imports no keyframes.js (`Slider.vue:19` imports `useDragVelocity`; keyframes.js is a peer dependency). `ledger-sites.mjs` books −809 B and +0 B.
  - The ground the canvas path needs once the stack walk goes. §3.2 itself says the walk gives `resolveUnderlayRgb`, yet value.js and keyframes are charged −442 B and +0 B.
  - The forced-colours sign and the reduced-motion crossfade the pass assigns to the mark.
  - SegmentedTabs and its CSS, which HA would need for the "Day / Night / Sleeptime / Naptime" segment §2.2 lists under HA's "Mark: yes". `frontend/src/core/sheet.css:9-13` says HA "let the segmented tabs go", and the ledger charges HA no strip (`strips: false`).
- Stale baseline. The figures are cut from 11.1.0 and master, but the removals land on top of 11.2.0. `git diff --stat master bl/dock/wi8` changes `run.css` by 370 lines, and also `useDockRunMark.ts`, `useGlassBackdropLuminance.ts` and `glass-specular-track.css`.
- No release split. The charter puts new parts in 11.3.0 and removals in 12.0.0. Law 9 ("No site's first load gets heavier") is not checked for the state between them.

**Remedy.**
- Strike the two non-removals and add the four unpriced additions, each marked estimated.
- Split the ledger into 11.3.0 and 12.0.0 columns.
- Measure against the wi8 tip.
- Withdraw the HA sentence until pass 2's delivery is priced against that baseline.

### B-4 (major). The two main hosts of the mark already carry a forced-colours selection sign

**Claim.** §2.1: "SegmentedTabs … and the dock … carry none … So the two main hosts of the mark have no selection sign that survives forced colours today. Pass 5 designs it."

**Evidence.**
- `src/styles/accessibility.css:31-43`, imported by `src/styles/index.css:275`, sets `border: 2px solid Highlight !important` under `forced-colors: active` on `[aria-current]`, `[aria-selected="true"]` and `[aria-pressed="true"]`.
- SegmentedTabs sets `aria-selected` or `aria-pressed` on the chosen tab (`SegmentedTabs.vue:262`, `:265`).
- Dock seats mark the destination with `aria-current` (`useDockRunMark.ts:3`, `:61`).
- The per-component grep missed the global rule. Whether the border paints visibly on these hosts is unread: a forced-colours emulation run is owed, and refused today.

**Remedy.**
- Restate the finding: a global sign exists, and its paint on the strip and the run is unread.
- Give pass 5 the job of verifying it under emulation, not of designing a second sign. A second sign would be two marks for one state.

### B-5 (major). §2.2 files a figure-dock dial under atlas's "Mark: yes", and Q4's first decision leaves the drag's default unsaid

**Claim.**
- §2.2 lists `PlateDial.vue` under atlas's "Mark: yes".
- §3.4 says the mark lives on "SegmentedTabs strips" and never "on a chart surface where a drag means scrub or pan".

**Evidence.**
- `atlas/src/charts/frame/PlateDial.vue:2`: "one dial of a plate's figure dock".
- atlas [IN atlas 1]: "In the way on the figure docks and anywhere a drag already means something on the chart … On a plate, a drag next to the plot reads as a scrub."
- Today the strip's drag is opt-in (`:draggable`, mounted once, `value.js demo/palettes/PalettesPane.vue:156`; §3.1).
- §3.4 does not say whether the mark's follow (L1: "follows the finger") stays opt-in. That is what decides whether atlas's figure docks get a drag.

**Remedy.**
- Move `PlateDial.vue` to "Mark: no" (keep its glide; no drag).
- Add to Q4's decision that the follow is per-host opt-in, and that a strip inside a figure dock or on a chart plate never opts in.

### B-6 (major). A two-site ask is put on the owner's list with a default of no

**Claim.** §3.4 moves "sliding across a short menu's rows" onto D2 and Q20. §3.5 opens "Each removes nothing and has fewer than two sites" and proposes "No".

**Evidence.**
- §3.5's own "Who asked" cell names atlas and Home Assistant for sliding across a short menu's rows.
- INBOUND: atlas 1 ("Helps where a row of peers is chosen by sliding: … the phone section menu"); HA 1 ("Floor menu rows: fine if the lens never commits on release over a row the finger only passed").
- The fold ruled on this exactly: R-O9, "atlas and HA asked for sliding across short menus' rows, so that stays under Q4". UNION D2 says the same.
- §3.4 overturns it with no amendment line.

**Remedy.**
- Split D2. The 160 ms hold to open and the auto-scroll stay on Q20 with default no.
- Sliding across an open short menu's rows returns to Q4, for pass 6, with HA's answer to §3.7.
- Correct §3.5's preamble.

### B-7 (blocking for R3's publication). R3's D carries a blur its cited source does not give; the ask is not one look, and its comparator cannot judge what it decides

**Claim.**
- R3's D is "Apple's Maps sheet, from our own iPhone recordings", drawn with `blur(24px) saturate(1.6)` (`R3.html`, `--d-filter`).
- §3.6 says R3 decides Q10 and Q13.

**Evidence.**
- D's blur:
  - The archive gives no σ for the Maps sheet. It gives transmission only (`IOS27-ARCHIVE.md:20`) and says "the blur radius is not our problem — our `--glass-blur-quiet-radius: 7px` sits right in the measured iOS band" (`:248`).
  - The only nearby figure is "σ rising 17.8→23.7 device px" (`:224`), for the HUD backplate, in device pixels: about 6 to 8 CSS px at 3× (`:8`).
  - So 24 px is a unit slip, or not sourced at all. It also runs against the owner's "slightly less blur" and law 1.
- One look: the ask has three questions, over five grounds × four plates × two modes, plus the edge.
- The mode comparison:
  - The page's own Light and Dark buttons set `data-theme` on the page, but Safari's toolbar does not follow it. Its look follows the system appearance and the content under it (UNION G7), and it shrinks while the page scrolls.
  - So "in light and then in dark" only works if the owner switches the phone's appearance, which the ask never says.
- What the grounds can show: three of the five grounds are flat (white, black, grey) and the colour field is a smooth gradient. A blur of a flat field is that field, so the blur values of A to D can differ visibly only on the photograph. "Which frost" is therefore read on one band.
- What the comparator can calibrate: Safari's bar calibrates a bar, not the overlays (menu, sheet) Q10 must also set.
- Sources: B and C are fits from the iOS 27.0 *simulator* (`read/rida-ui.md:308`), but the legend says "as measured on rida.dev".
- A smaller inaccuracy: C's dark veil (`rgb(78 78 78 / 0.41)`) is the secant of a quadratic tone curve. It matches black and white but is about 25 levels low at mid-grey.

**Remedy.**
- Set D's blur from a source or drop the number: an ~8 px σ if the archive's band is meant.
- Cut the page to one ask: the closest letter in each system mode, with "switch your iPhone to Dark" stated.
- Keep the legibility and edge asks as a second, separate page.
- Put a textured ground (the photograph) under every plate row used for frost.
- Label B and C "simulator".
- Say that R3 calibrates bar-class plates only, and owe the overlay calibration (against Safari's own menu) to pass 3 or pass 8.

### B-8 (major). R1's C and R4's B use `shape()` commands their support test never checks; a parser failure would read as the ghost the page looks for

**Claim.** R1's C and R4's B are clipped by `shape()` when `CSS.supports("clip-path", "shape(from 0px 0px, line to 10px 10px, close)")` is true (`R1.html` script; `R4.html` script).

**Evidence.**
- The strings the pages write use `arc to … of …px cw` (R1 `rect()`, R4 `toShape`) and `curve to … with … / …` (R4 `neck`). The support test checks neither.
- A rejected value assigned to `style.clipPath` is dropped silently.
- R1's C is `border-radius: 0` with no clip, so it would render as a square frosted plate: exactly the "square or darker patch" its ask asks the owner to report. Pass 4 would then read Q1 as "the clip does not shape the backdrop".
- R4's B would render an unclipped 232 px slab.
- No browser has run either page (§3.8). The owed check is headless Chromium, whose parser is not WebKit's.

**Remedy.**
- On each page, after setting the clip, read back `getComputedStyle(el).clipPath`.
- Print "clip applied" or "clip refused" in the env line, so the owner's reading carries it.
- Feature-test the exact first-frame string, not a one-line stand-in.

### B-9 (major). R4's C shows Apple's split recipe with a doubled veil the recipe does not need, so the reading cannot separate the two

**Claim.** R4's C ("born underneath") is the F3 and law 8 candidate. The ask rejects any piece with "a dark seam or a square patch".

**Evidence.**
- In `R4.html` the bar's right edge is `220 − 68t` and the seat's left edge is `164 + 12t`, so the two translucent plates overlap for t < 0.7.
- The seat's opacity reaches 1 at t = 0.35.
- Both carry `backdrop-filter` and the veil. The bar paints after the seat, so its backdrop includes the seat's frost and the overlap band takes two veils: the doubled ink F3 names.
- On the dock spring, the full-strength overlap lasts from 56 to 106 ms at 1×, and from 225 to 423 ms at Slow ×4 (computed under `guarded --light`).
- UNION Q9 names the two web answers for a birth over a glass host: the material rising from none while over the host, or growth from the host's edge with no overlap. C uses neither.
- If the owner rejects C, the study cannot tell whether he rejected Apple's recipe or the overlap.

**Remedy.**
- Give C Q9's first answer: the seat's `backdrop-filter` and veil rise from none while it overlaps the bar, and reach full strength only once clear of it.
- Or add C′ with the seat's frost off until clear, and ask for the letter.

### B-10 (major). Law 7 is measured in 60 Hz frames, but the study designs for 30 fps, and no page reads Low Power Mode

**Claim.**
- Law 7: "no leg lands more than two fifths of its travel in one 60 Hz frame, and none is shorter than five frames".
- The reduced-motion fade is 200 ms or less, and HA asks 120 to 150 ms.

**Evidence.**
- P0a (`motion-canon.md:102-104`) adds: "A cut given two frames is still a cut."
- UNION discrepancy 1: WebKit halves page rendering updates to 30 fps in Low Power Mode; "This union designs for 30, and the iPhone reading settles it". I20 takes it as a constraint.
- Before 27.3, every `linear()` spring leg runs on the main thread (I22), so it renders at 30 fps in Low Power Mode.
- At 30 fps:
  - P0a's out row (75 to 120 ms) is 2.3 to 3.6 frames.
  - The 100 to 120 ms exits M3 plans are 3 to 3.6 frames.
  - HA's 120 to 150 ms reduced-motion fade is 3.6 to 4.5 frames.
  - All of these fail law 7's own five-frame floor.
- R2 and R6 tell the owner to keep Low Power Mode off, so the "iPhone reading" discrepancy 1 relies on is on no page.

**Remedy.**
- State law 7 in milliseconds, and add its 30 fps reading: any main-thread leg under about 167 ms shows fewer than five frames under Low Power Mode.
- List the P0a rows that fall there as owed to pass 8 and pass 10.
- Ask on R6 for a second set of numbers with Low Power Mode on. That settles discrepancy 1.

### B-11 (minor). Every page prints a frozen iOS version

**Claim.** §3.6: "Every page prints the Safari and iOS versions it ran on, so each reading carries them."

**Evidence.**
- Each page parses `OS (\d+)_(\d+)` from the user agent.
- From iOS 26, Safari reports a frozen OS token (18_6, later 18_7). Sources: the Safari 26.0 release notes as quoted by Singular (singular.net, "frozen Safari user agent"), and WebKit Bugzilla threads, among them https://bugs.webkit.org/show_bug.cgi?id=298260, where an engineer calls the freeze intentional. Only `Version/` tracks Safari.
- On the owner's phone the line will read "Safari 27.x · iOS 18.7".
- No page asks for the iPhone model either, though R2 and R6 depend on ProMotion.

**Remedy.**
- Print the Safari version alone, or label the OS token "frozen by Safari".
- Add "and your iPhone model and the iOS version in Settings" to R2's and R6's asks.

### B-12 (minor). R5's legend calls C "slower" and D "Apple's own", against the pass's own numbers and source

**Evidence.**
- `check/curve-numbers.json`: to 98 %, A (present) takes 205 ms, C (panel) 202 ms, D 188 ms.
- C is not slower than A, and D is the fastest.
- D is a fit to a simulator video (`read/rida-ui.md:308`, `:313`).

**Remedy.**
- Label each spring by time to settle and overshoot from `curve-numbers.json`.
- Call D "Apple's menu spring as fit in the iOS 27 simulator".

### B-13 (minor). R2's scope is stated wider than one dock-spring lane on one phone can read

**Evidence.**
- §3.6 quotes D's fit "within 1.1 %" only. The same Bézier family fits `present` at 3.49 % and `panel` at 13.97 % (`curve-numbers.json`), so D cannot stand for every row.
- "Which curve forms Safari 27.2 and 27.3 animate": one phone runs one version.
- R2 reads gliding against stalling, not a frame rate. No page reads Q7(a), whether accelerated animations run above 60 Hz.

**Remedy.**
- Carry the per-row fit errors into §3.6.
- Say R2 reads the installed version only.
- Mark Q7(a) owed.

### B-14 (minor). R1's ghost may show only mid-fold, over 0.5 s, across four cells, with no way to slow or hold it

**Evidence.**
- R1 folds on a fixed 0.5 s curve and has no Slow ×4, which R2, R4, R5 and R7 all have.
- The ask is "at rest and while you tap Fold".

**Remedy.** Add Slow ×4, or a held mid-fold state, so the answer takes one look.

### B-15 (minor). The equal-slot question (Q15) names Home Assistant's dock as a SegmentedTabs strip

**Evidence.**
- §3.7 lists "Home Assistant's worded tabs in `GlassTabs.ts`" under "every segment in a SegmentedTabs strip".
- `frontend/src/tiles/GlassTabs.ts:1-21` is a GlassDock whose run "holds the five tabs and scrolls".
- HA mounts no SegmentedTabs (`sheet.css` header; §3.1).

**Remedy.** Ask HA about equal seat widths on a dock run that scrolls (T4, Q5), not about SegmentedTabs.

---

## Dropped on the second reading

- **R7's `--in` and `--out` unset (a cut on first load).** Dropped: `R7.html:19-22` sets defaults on `:root`.
- **HA's CSS removals not reaching its entry.** Dropped: `styles/glass.css` in HA's 11.1.0 dist `@import`s `grasp.css` and `focus-veil.css`, and `sheet.ts` inlines the sheet into the bundle (`sheet.css:1-5`).
- **The census's loupe finding.** It holds: keyframes' hit is a comment (`EasingCatalogue.vue:39`), value.js's is its own canvas (`ImageEyedropper.vue:115`, `:218`), and no glass-ui component passes `loupe`.
- **HA's worded tabs not being glass-ui's.** Dropped: `GlassTabs.ts` mounts `GlassDock`, so the run mark reaches it. Only the Q15 wording is kept (B-15).
- **Stopping the page check after two refusals.** Dropped: the machine law says stop heavy work at the 13M refusal, and the zone only climbs.
- **gaggle's census ref (`8d7fe5d`) against the ref in its answer (`898cea9`).** Dropped: `8d7fe5d` is one commit after `898cea9`.
- **Law 2's "moved by `translate`" deciding Q15 early.** Dropped from this critique: it is UNION §2 check 2 verbatim, and Critic A's ground.
- **R2's lane A ("today's script springs") writing `transform` rather than a registered custom property.** Dropped: A is the cheaper case, so a stall in A understates today's cost and does not bias the reading.
- **Core Animation clamping a `cubic-bezier()` control point above 1 (R2's D).** Dropped: not shown by any source I hold.
