# BM pass 6: critique A (the owner's law and restraint)

Seat: critic A, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, page or source and staged nothing.

I read `CHARTER.md`, `study/UNION.md` whole, `union-fold.md`, `INBOUND.md`, `READINGS.md` (nothing published, nothing returned), `DESIGN.md` §1 to §4.3, §6.3 and §7 to §8 with every pass-6 amendment, `pass-5/critique-A.md` (for form) and `pass-5/fold.md` (pass 6's fold). From pass 6's working files I read `pages/P6-hosts.html` and the rebuilt `pages/P5-mark.html` in full, `fold/sketch/mark.next.css`, `fold/sketch/selectionMark.next.ts`, `fold/ledger.json`, `hosts/hosts.mjs` and `.json`, `hosts/bytes.mjs` and `.json`, `census/hosts.mjs` and `.json`, `check/static-check.json`, `retry.log`, and the `bm/study` commits `fbf21f1fc` and `83d2331c1` (stat and `slider-bytes.json`).

I re-read the sources the objections rest on: `restraint.md:184-210` (the ceiling); `docs/precepts/README.md:74-80`, `:116-122`; BJ `IOS27-CODEX.md:29` (law 12); BJ `IOS27-ARCHIVE.md:18`; BL `audit/INBOUND.md` rows O-95, O-250, O-261, O-295; BL `design/reference/apple-homeview/GAP.md:155`, `:214`, `:257`; BL `waves/W-B.17.md:497`, `:646`, `:655`; `W-B.18.md:67-73`; `W-R.1.md:78-84`; `W-E.12.md:1-40`; `W-F.3.md:20`, `:46`; `waves/INDEX.md:68`, `:73`; `triage-1119/PLACED.md:28`; glass-ui master `2dbc19a5c`: `src/components/progress/Progress.vue:175-235`, `src/components/slider/Slider.vue:1-24` (and on `bl/slider/proto`), `src/composables/motion/morph/useLeadTrail.ts:1-80`, `src/components/carousel/projection.ts:20-75`, `src/components/dock/DockLayerGroup.vue:20-22`, `:154`, `src/composables/motion/index.ts:32`, `src/styles/glass/glass-capsule.css:60-95`; `bl/dock/wi8` `src/components/dock/styles/dock.css:92-165`; daraksha `b11-occasion:src/gilt/gilt.css:54-66`; fourier `f45:web/src/components/ui/SliderControl.vue:266-273`; value.js `c45:demo/styles/foundation.css:486-492`. `git grep` for `touch-callout` on master and wi8 `src` (none), for `useDragMorph|useLeadTrail|trailOffset` at each site's census ref (none), and for O-95, O-295, Q-CR-3, CR-04, CR-05, W-E.12, W-F.3, A9, `callout`, `discharge` and `ChatGPT` in `DESIGN.md` (none, but the one `callout` at `:1049`).

No page was loaded. One no-op probe through `guarded` was refused on the kernel zone (`data.kalloc.1024` at 14.48M), as every pass-6 run was. The counts below come from the pages' and the sketches' source.

Each objection was made, then its evidence re-read; those that did not survive are listed at the end.

## Objections

### A6-1 (blocking, for publishing P6-hosts' section 3). The level's letters leave the owner one lawful choice, and the smallest lawful cure is missing

**Claim.** Section 3 asks Q21 and the stepped slider with three letters (`P6-hosts.html:136-147`). C is today's jump, which §8.2 itself calls "an instant change (P0)" (`DESIGN.md:1070`), so the owner's standing law bars it. B is a one-step mark, the grammar §8.5 gives a choice and refuses for a quantity (`DESIGN.md:1088-1091`). That leaves A, the proposal. A reading taken from this page would decide Q21 and the stepped slider by construction, where UNION gives Q21 to "pass 6; the owner" (`UNION.md:271`).

**Evidence.** BL's R-9 already ships a step travel: "A value the slider changes in one step (an arrow, Page, Home or End key; a press on the track away from the thumb) travels on `--spring-press`" (`W-B.18.md:73`). Played for each step boundary a drag crosses, that travel cures the jump with no new part: the fill and thumb rest on a step at every rest, `translate` on a single curve is §4.3 rule 1 (compositor), and nothing follows the finger between steps. It meets P0 and costs nothing, and the page doesn't show it. The proposal (§8.2 item 4) instead shows a fill between steps that does not match `aria-valuenow`, and it needs a follow, a seeded settle and an estimator (A6-2).

**Remedy.** Add the step travel as a letter, either replacing C or beside it as D. Label C as today's jump, which the law bars, so the owner does not choose it believing it is lawful. State in §8.2 and §8.11 that the owner chooses between the follow-and-settle and the step travel.

### A6-2 (major). The stepped slider's follow and settle add code to every slider site, and the ledger prices them at nothing

**Claim.** §8.8's last row says "Added: nothing beyond §7.8's mark … the stepped slider's settle use[s] the one writer and the one player" (`DESIGN.md:1138`). Item 4 needs, in the Slider, a pointer follow that writes `translate` on the fill and thumb per event, overriding reka's position from the value. At release it needs rule 2's player, the `seedCap`, and keyframes.js's 80 ms estimator (`DESIGN.md:1070`; `fold/sketch/selectionMark.next.ts` imports `playSpring`, `seedCap` and `estimateVelocity`).

**Evidence.** The Slider imports none of these today (`Slider.vue:19-23` on master: `useDragVelocity`, `useFrameCoalesce`, `useDockHold`, `valueDomain`, `useMotionAxis`; `bl/slider/proto` the same without `useDragVelocity`). The mark's writer is built for a strip or a run, not a range. The slider sites that would pay are atlas's `RangeFacet` and five dashboard filters, all `:step="1"`, plus value.js 6, daraksha 2, fourier 2 and keyframes 5 (`census/hosts.json`). Many of these pages mount no strip or dock run. Law 9 counts gzipped bytes per site entry, and Q17 counts "each entry a site loads" (`UNION.md:267`). daraksha has about 6 KB free, and atlas fails any new mount cost ([IN value.js 5; atlas 5]). The figure that leaves the Slider, `useDragVelocity` (809 B), is credited to BL (`DESIGN.md:1133-1135`), so BM's addition has nothing of its own to offset it.

**Remedy.** Price item 4 per slider entry: the follow, the player, `seedCap` and the estimator, less what is already shared on that entry. Name what it removes, or take A6-1's step travel, which adds nothing.

### A6-3 (major). P6-hosts' letter A shows absorbed dots that §8.5 says are not built, and their cost is not counted

**Claim.** §8.5: "**Absorbed dots** … are not built … a site that asks gets A from the engine with no new part" (`DESIGN.md:1097`). The page labels A "The fill grows from the start to the step, taking in the dots it passes" (`P6-hosts.html:137`), and §8.11 asks the owner to choose "A, occupied length that takes in the dots".

**Evidence.** The dots are a new part on the page. Each dot fades on its own `opacity` transition (`:86-87`), delayed to the moment the spring's end reaches its centre. That delay comes from a reach-time solver over the sampled spring (`showDots(i, when)` and `reach()`, `:336-355`). A tap from Lowest to Highest starts four dot fades plus the window's two `translate` legs (`:195-203`, the `::before` counter-leg), six animations against the ceiling's two per press (`restraint.md:204`). §8.9's stepped-slider row counts one leg on the fill and nothing for the dots (`DESIGN.md:1147`). Owner precept 1 names the pager dot among the small items that earn their place or go (`docs/precepts/README.md:76`). The page also draws the fill as a two-handle window, where §8.5 and R-9 describe one `translate` clipped by the track (`DESIGN.md:1095`). If the owner picks A because the dots disappear into the fill, he picks something the design does not ship. If the design ships it, its cost is uncounted.

**Remedy.** Draw A as the design proposes: the fill clipped by the track, with the dots either absent or static. If the absorbing dots are kept, make them their own letter with their count and bytes, and §8.5 says what they remove.

### A6-4 (major). A third-party app's control is presented to the owner as the iOS 27 canon

**Claim.** §8.5 cites "iOS 27's reasoning-effort control ([ARC]:18 …)" as the quantity exemplar (`DESIGN.md:1093`). The page tells the owner that letter A behaves "as iOS 27's effort control does" (`P6-hosts.html:137`).

**Evidence.** The ratified codex corrects that provenance. Law 12 reads "(IMG_2287/2288—the ChatGPT iOS reasoning-effort popup in two slider states …)", marked "[RATIFIED—quantified; provenance corrected]" (`IOS27-CODEX.md:29`). The archive row the pass cites carries the uncorrected label (`IOS27-ARCHIVE.md:18`), and UNION S9 inherited it (`UNION.md:148`). The owner's law binds every judgement to the iOS 27 canon, so a letter labelled as the canon is steered toward. The two stills show two states, not how the pill moves between them, so they do not support the follow either.

**Remedy.** Relabel the source as one iOS app's control in §8.5, S9's citation and on the page, or cite the Apple sibling the codex names (the Search pill to page-dot morph). Drop "as iOS 27's … does" from the letter.

### A6-5 (major). PagerDots' goo is decided by the answer to a tab-strip question, against the owner's open questions on the dots

**Claim.** §8.5 makes PagerDots "a choice, so it takes the mark" and ties its elongation to Q8: under Q8's A, "the worm becomes the mark's glide", and "Either way `useLeadTrail` … and the worm's integrator … go" (`DESIGN.md:1099`). Q8 is read on P5-mark's tab strip and dock run, where letter B is labelled "as the carousel's page dots already do" (`P5-mark.html:135`). The proposed default is A. O-4's "at its own size" was said of tabs. So an answer about tabs would delete the dots' stretch, and the page never says so.

**Evidence.** The owner has his own orders and open questions on the dots, and §8.5 cites none of them:
- O-95: "carousel elements and animations like on … apple-homeview … Goo. Breath of life. Movement of momentum" (BL `audit/INBOUND.md:57`).
- O-295: "This needs to be like apple and google": a short pill, a smooth slide and scale, dots shrinking toward the ends, booked as a W-B.17 design row (`INBOUND.md:270`).
- BL's O-95 study left Q-CR-3 to the owner, "the sum law … bans the goo", and recommends keeping the elongation in flight: "the edict asks the dots themselves to goo-morph" (`GAP.md:257`). No ruling is found in the repository.
- The study also left CR-04, a resting capsule about 3× the pip (`GAP.md:155`), and CR-05, an indicator whose length is a function of scroll position (`GAP.md:155`). CR-05 is rule 4, where §8.5 makes the pager's index rule 5 ("the mark moves when the index changes").

BL also has worm cures in its record, so §8.5's "BL's W-B.17 holds the worm with no cure" does not describe BL's position on the worm. W-E.12 cures the worm's length read (`INDEX.md:68`). W-F.3 cure 4 bounds the trail by the origin with "the elongation kept" (`W-F.3.md:46`; `GAP.md:214`, A5). W-B.17 takes "19, pager dots" this wave (`W-B.17.md:646`). §3.9 lists none of these. A part the owner ordered is never cut by a study law (§1, `DESIGN.md:15`).

**Remedy.** Take PagerDots out of Q8's coupling. Add §3.9 rows for O-95, O-295, Q-CR-3, CR-04, CR-05, W-E.12 and W-F.3. Send the dots to the owner as their own question beside BL's HomeView study, or leave them to BL. Withdraw "a carousel's page index is set by scrolling (rule 5)" until CR-05 is ruled.

### A6-6 (major). Suppressing the link callout reverses UNION A9 without saying so

**Claim.** §8.1: "Seats that are links take `-webkit-touch-callout: none`, so a press that becomes a drag never raises the link preview" (`DESIGN.md:1049`). Both pages ship the suppression on every option: P6-hosts on `.port` and `.seat` (`:63`, `:73`), and P5-mark on `.tab` (`:82`).

**Evidence.** UNION A9, "Suppressing the context menu and callout", is a workaround row ruled **REFUSE** (`UNION.md:209`). The study's rule is that a pass overturning a row amends it with a line saying so (`DESIGN.md:3`). §8.1 does neither, and nothing in master or wi8 `src` sets the property today (`git grep`). The suppression removes a platform affordance from dock links: the long-press preview with Open in New Tab and Copy Link. Its scope ("seats that are links") is wider than the opt-in drag that needs it (§3.4). Whether a press that moves 6 px before the preview's hold raises the preview at all is unread on the iPhone, and the suppression is decided before that reading.

**Remedy.** Withdraw it, or put it to the owner as an amendment of A9 with what it costs. If he keeps it, scope it to a fitting run whose host opts into the drag, and read on the iPhone first whether a moving press raises the preview.

### A6-7 (major). Under Reduce Motion, Progress would blink its fill on every update

**Claim.** §8.5 cures Progress's reduced-motion cut by having it "take the dip of §4.3's reduced column" (`DESIGN.md:1095`). The dip fades the node out, lands it while hidden, and fades it back in over 200 ms (`DESIGN.md:302`).

**Evidence.** Progress is built for continuous feeds. Its own comment says "A continuously-fed bar therefore trails its announced value by ≤ the 0.22s settle" (`Progress.vue:183-188`), and fourier feeds it a job's progress (`EquationView.vue:644`, `census/hosts.json`). A dip on every update hides the quantity's one sign for 100 ms per tick, so a bar fed every 100 to 200 ms is never steady under Reduce Motion. The same goes for a stepped slider stepped by a held arrow key. Pass 2 gave the closest relative, ScrollProgressRim, a different form: "Under reduced motion its length tweens over 120 ms instead of jumping" (`DESIGN.md:343`). So two occupied-length parts get two reduced forms.

**Remedy.** Give every quantity one reduced form that never hides the fill, the rim's short length tween, and put it to the owner with the rim's P6 line (§4.6). Or crossfade the old fill into the new one. Keep the dip for a choice's mark.

### A6-8 (major). The edge letter misreads the owner's dock order and hides the hairlines it would stack

**Claim.** §8.7 offers one edge at the perimeter rung on the mark: "It is one more line, on a fill that has no other, which the owner's 'crisp edge, no halo' allows" (`DESIGN.md:1125`). P6-hosts section 2 B draws it on bare wells (`P6-hosts.html:63`, `:80`, `:82`).

**Evidence.**
- The "crisp edge" order is about the dock's own plate, "No glow and no halo on any dock surface. The edge is crisp" (`docs/precepts/README.md:120-122`). It is not a license to add a line to a mark.
- Owner precept 2 bars "stacked hairlines or borders" (`README.md:77`). Every host the edge would sit in already has an edge. The strip's track carries two rim layers (`.glass-capsule-track`, `glass-capsule.css:79-86`). wi8's dock plate carries rims and a border (`dock.css:96-97`, `:137-165`).
- The mark sits 3 px inside the track all along its top and bottom (`inset-block: 3px` on the page). So the edge runs parallel to the host's rim on every strip, and inside the plate's border at a run's end seat.
- The page draws neither host edge, so the owner cannot see the stacking he is asked to judge.
- The page draws the edge as an inset `box-shadow`, where UNION G5 says "at most one edge, drawn as the plate's border and never as a second shadow layer" (`UNION.md:158`).

**Remedy.** Draw each host's own rim or border on the page beside B, and strike "which the owner's 'crisp edge, no halo' allows". Draw B as the border G5 names. Say that B removes nothing, or name what it replaces.

### A6-9 (major). "The default the sites already set" misreads daraksha, and the question sent to it carries a false premise

**Claim.** §8.2 item 5: "Four of six slider sites make the thumb the fill's colour by token today (… daraksha `gilt.css:58`, `:65`)" (`DESIGN.md:1071`). §8.10 asks daraksha "You set `--slider-thumb-bg` to the fill's colour to hide the thumb … would you drop that override?" (`DESIGN.md:1159`).

**Evidence.** daraksha gives its knob a colour of its own on purpose: "The knob takes glass's own token (11.0.2): the gilt's light at night, the paper's ground by day". The thumb is `--gilt-light` over a `--gilt-body` range in dark, and `--ground` over a `--gilt-deep` range in light (`b11-occasion:src/gilt/gilt.css:54-66`). Three sites hide the thumb by token: value.js (`foundation.css:491`), fourier (`FourierTimeline.vue:293`, `SliderControl.vue:271-273`) and keyframes (`style.css:255`). That is three of six, not four. Under O-408's thumbless default, daraksha's dock sliders lose a knob it styles deliberately. That is a visible change at a site, and §8.2 does not name it.

**Remedy.** Correct item 5 to three of six. Ask daraksha whether its knob should survive the thumbless default, not whether it will drop an override it does not have. Name the change at daraksha beside O-408's credit to BL.

### A6-10 (minor). Progress is adopted as "what already holds" with its completion glow unlisted

**Claim.** §8.5 brings Progress into the occupied-length family as a part that already holds (`DESIGN.md:1095`) and names only its reduced-motion cut.

**Evidence.** Progress plays "one discharge glow when the quantity lands", a `@keyframes progress-discharge` that animates an inset `box-shadow` to white at 0.12 (`Progress.vue:203-224`). Its own reduced-motion arm calls it "pure decoration" (`:231`). UNION L8 and G4 refuse glow ("Remove, do not tune.", `UNION.md:54`, `:157`), the ceiling allows "gradients, gleams, glows | 0" (`restraint.md:198`), and `box-shadow` never reaches the compositor (law 5). No BL wave names it (`git grep discharge`).

**Remedy.** List the discharge glow under what Progress loses, for 12.0.0. If a BL wave already removes it, credit that wave.

### A6-11 (minor). P6-hosts models the mark without the hover and press answers the design counts

**Claim.** P6-hosts' header says its mark is "the one selection mark of DESIGN §7 as amended in pass 6" (`P6-hosts.html:4-10`). Its seats, words and level have no hover plate and no press tone, only a colour transition (`:71-82`).

**Evidence.** §7.2's Hover and Press rows give every option its own plate, the chosen one included. §8.1 and §8.9 count "a tap is the seat plate's press tone, then the mark's `translate` and the icons' trade" (`DESIGN.md:1049`, `:1144-1145`). The rebuilt P5-mark draws both (`P5-mark.html:87-91`). The owner will read a dock and a level that show nothing under the finger until the commit, against "every component shows engagement". He will also read two different marks on the same pass's two pages.

**Remedy.** Add the option plate's hover and press tone to P6-hosts, as on P5-mark.

### A6-12 (minor). `touch-action: pan-y` is set on every group, although only a host that opts in takes the drag

**Claim.** §7.2 as amended in pass 6 and the sketch set `touch-action: pan-y` on every `.selection-group` (`DESIGN.md:856`; `fold/sketch/mark.next.css:8-16`). §3.4 makes the drag opt-in.

**Evidence.** A touch's allowed pans are the intersection of `touch-action` along its ancestors, up to the scroller that would pan. So a strip that has not opted in still blocks a sideways pan that starts on it, inside any horizontally scrolling band, and the gesture it takes is dead.

**Remedy.** Scope `pan-y` to a group whose host opts in (`[data-draggable]`), and leave other groups at the default.

### A6-13 (minor). The Slider's "seeds nothing" contradicts W-R.1:82, and the collision is listed nowhere a reader of §3.9 would find it

**Claim.** §8.2 item 3: "among W-R.1:82's velocity owners the Slider seeds nothing unless it is stepped" (`DESIGN.md:1069`).

**Evidence.** W-R.1:82 names the Slider first among the velocity owners whose "measured release velocity seeds a named preset row". §3.9's only `:82` row concerns the tabs drag. §8.10 asks BL four Slider questions, and this is not one of them. It appears only as a precept draft owed to pass 10 (`DESIGN.md:1187`).

**Remedy.** Add a §3.9 row for it and a question to BL in §8.10.

### A6-14 (minor). The switch's reduced form is borrowed from rule 2 without reconciling rule 1, and it is not priced

**Claim.** §8.3 gives the switch thumb a 200 ms dip, "rule 2's reduced form" (`DESIGN.md:1078`). §4.3 files the switch thumb under rule 1, whose reduced column keeps a fade of 150 ms or less and drops the transform (`DESIGN.md:301`).

**Evidence.** For the switch, rule 1's column would cut the thumb's position, so the dip is the right outcome. But rule 1's column is left as it is, so it now contradicts the switch it lists. The switch moves by one CSS transition today (`switch/styles.css:49`). A dip needs either a Web Animation or a pair of keyframes that restart on each toggle, and neither is priced (§8.8).

**Remedy.** Amend rule 1's reduced column: where the transform is the state's sign, it dips. Price the switch's dip.

### A6-15 (minor). Two removals in §8.8 do not stand as written

**Claim.** §8.8 removes "`useLeadTrail` … ≤ 784" and "`useTabDragMorph` and its wiring of `useDragMorph` … ≤ 449 + ≤ 1,327" (`DESIGN.md:1136-1137`).

**Evidence.**
- `useLeadTrail.ts` has a second consumer. The carousel's `projection.ts:31` imports `trailOffset` from it, "one law, two consumers" (`useLeadTrail.ts:39-41`), and BL's W-F.3 cure 4 binds both (`W-F.3.md:46`). The module cannot go whole.
- The 1,327 B is the whole of `useDragMorph`, which DockLayerGroup also imports (`DockLayerGroup.vue:20-22`, `:154`) and `motion/index.ts:32` exports. It is freed only if the switcher's follow moves too, which §8.12 says is "listed, not rebuilt". No site imports either module (`git grep` at each census ref).

**Remedy.** Keep `trailOffset` (or move it to the carousel) and credit the rest. Tie the 1,327 B to the switcher's move.

### A6-16 (minor). The question to Home Assistant asks it to mount the Slider without its price

**Claim.** §8.10 asks Home Assistant "Would you mount glass-ui's Slider for your light sliders once it is thumbless by default?" (`DESIGN.md:1160`).

**Evidence.** Home Assistant's entry is 71.6 of 71.8 kB gz, and "a lens must come from the library's existing parts or replace something" ([IN HA 5]). Law 9: no site's first load gets heavier. The question gives neither the Slider's gzipped bytes for that entry nor what it would replace (`rails.ts`).

**Remedy.** State the Slider's per-entry bytes, using the prototype's after-BL figures (2,863 + 1,211 B gz, plus reka's slider), and the code it would replace.

## Dropped on the second reading

- **Q18 decided before value.js answered.** The census answers the question pass 1 put to value.js (its five hits are its own `useLoupeCanvas`), and §8.2 leaves the BL conflict to the orchestrator and the owner. Dropped.
- **The `bm/study` prototype reproduces BL's removals.** It is labelled not for merge and credited to BL, and no BM decision rests on it. Dropped.
- **§8.1 A adds a drag mode to the dock.** value.js, gaggle and atlas asked for a slide along a dock or rail ([IN value.js 1; gaggle 1; atlas 1]), so it is not a Q20 addition. Dropped.
- **Codex law 12's "never translate a fixed-width thumb" against the switch.** Law 12's own scope is discrete progress, and §8.5's two meanings keep it, with the amendment owed to pass 10. Dropped.
- **The 200 ms dip against Home Assistant's 120-150 ms.** That figure is from a study, not one of HA's bounds; law 7 allows 200 ms. Dropped.
- **P5-mark draws the chosen option's press as the mark's own colour (+0.03, not +0.02).** It is under a pixel of colour, and the page says so (`P5-mark.html:291`). Dropped.
- **No happy-dom output in `pass-6/check/`** (pass 5 kept `dom-run.txt`). This is a matter of evidence, so it is left to critic B.

## Summary

Pass 6 does its line: Q5, Q18, Q21 and the rest of Q4 each have a proposal. Several of its choices cut, as restraint asks:
- a continuous slider's value is the finger's at lift;
- the thumb takes no lift;
- menu rows keep their own fill;
- the dock's hold-to-grab is refused on four costs;
- the loupe goes, and BL's sub-pixel held grow is questioned.

What fails the law is concentrated in three places:
- **The level on P6-hosts.** Its letters leave one lawful choice and leave out R-9's own step travel (blocking for that section). It shows dots the design does not build, and it credits a ChatGPT control to iOS 27. The proposal behind it adds a follow, a player and an estimator to every slider site, and the ledger prices that at nothing.
- **PagerDots.** The worm's goo would be removed by the answer to a tab-strip question, while the owner's O-95 and O-295 and BL's Q-CR-3, CR-04 and CR-05 go uncited.
- **Two unannounced reversals.** The link-callout suppression reverses UNION A9, and Progress's reduced-motion dip would blink a quantity on every tick.

The edge letter is shown without the host hairlines it would stack against.
