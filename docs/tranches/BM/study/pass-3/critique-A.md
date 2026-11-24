# BM pass 3: Critic A (the owner's law and restraint)

Seat: Critic A, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. I changed no design, no page and no source, and staged nothing.

Read in full: `CHARTER.md`, `study/UNION.md` (§2, §3, §4), `study/union-fold.md`, `study/INBOUND.md`, `study/READINGS.md`, `study/DESIGN.md` (passes 1 and 2 as amended, and pass 3's §5 with its amendments to §1 to §4), `pass-2/critique-A.md`, `pass-2/fold.md`. Pass 3's working files: `material/sketch/material.next.css`, `material/legibility.mjs` (head and model), `material/legibility.json` (`levels`, `transmission`), `fold/sketch/scroll-chrome.next.css`, `scroll-progress-rim.next.css`, `fading-scroll.next.css`, `retry.log`. Pages: `pages/R3b.html` (new; read with its inlined images stripped), `R5.html` (the close amended by fold A7), and `P2-scroll.html` lane B.

Checked against source at `2dbc19a5c`: `docs/precepts/restraint.md` (:20-70, :105-215), `docs/precepts/motion-canon.md` P2 (:135-144), `src/styles/tokens/glass.css` (:1-100, :150-240), `src/styles/glass/veil.css`, `src/styles/glass/a11y-fallback.css`, `src/styles/glass/control-edge.css`, `src/styles/glass/rim.css` (:40-60), `src/styles/tokens/glass-fx.css` (:95-110), `src/styles/tokens/motion-registers.css` (:60-75), `src/components/_shared/field/control.css`, `src/components/dock/styles/adaptive-legibility.css` (:40-50). BL's record: `design/dock/wi8/RULINGS-6.md` (:13-27, :90-100), `RULINGS-7.md` (:28, :62), `RULINGS-8.md` (:87-134), `verify-7.md:127`, `INPUT-plate-opacity-2026-11-15.md`, `INPUT-secondary-ink-2026-11-15.md`; the material loop `design/material/PORTFOLIO.md` (§0, §1.1), `REGISTRY.md` (:737-800, :1279, :3037, :3328), `pass-12/floor-v11.patch` (the file list, `tokens/glass.css`, `tokens/glass-fx.css`, `tokens/glass-deep.css`, the deleted composables); `FORMATION-PROGRESS.md:537-568`; `waves/INDEX.md:15`; `BK/coordination/valuejs-outbound-2026-10-19-owner-answers.md` (:1-20, :50-56). The owner's canon entry C-59 (`~/.dev-logs/feedback-canon/CANON.md:1550-1568`).

**No browser run.** At 19:06 `guarded` refused my one headless Chromium layout read of R3b (`data.kalloc.1024` at 13.93M). I retried once after the 10-minute floor, at 19:16:58, and it was refused at 13.96M. Every finding below comes from the HTML, the CSS, the sketches, pass 3's own numbers and BL's record.

I made each objection, then re-read its evidence. The ones that did not survive are listed at the end.

## Objections

### A1 (blocking). Pass 3 re-decides the glass material without BL's material loop, whose converged floor already answers Q10's core and is ruled by the owner's delegate.

**Claim.** BL ran a thirteen-pass design loop on exactly this question, D3, "the glass material in both themes as one design family: the veil, the ink on it, live-mode adaptation, and the material ladder" (`BL/design/material/PORTFOLIO.md`, header). Its floor is banked, its owner questions are answered, and its landing wave is in BL's plan. Pass 3 neither reads nor cites any of it. §5 proposes a different material, and §3.9's collision table does not list it.

**Evidence.**
- **The floor answers the same question by the same method.** `pass-12/floor-v11.patch` rewrites the material law in `tokens/glass.css`: "The veil is the theme's own ground, `--card`, painted at α … A surface that does not know its ground paints THE BOUND: the α at which the muted ink clears its contrast target over ANY input (a black ground in light, a white one in dark). Nothing samples the backdrop … Blur buys calm and occlusion, never legibility." The bound is solved in CSS from the ink, the pole and `--glass-ink-target: 4.8` ("WCAG 4.5:1 plus 0.3 of raster margin"). That is §5.1's test and §5.2's B, solved for the muted ink rather than `--foreground`, with a margin B lacks (A8).
- **The floor deletes the clamp already.** The patch deletes `useGlassBackdropLuminance.ts`, `backdropLuminanceSample.ts`, `--glass-backdrop` and `--glass-backdrop-luma-knee`. §5.3 decides the same deletion as BM's.
- **The floor differs from pass 3 where pass 3 is new.** It keeps graded radii (6/10/12/18/20 px) and the deep tier (retuned, `tokens/glass-deep.css` in the patch); it paints content at the bound too ("wash · chassis bound; quiet bound + 1 step; resting bound + 2 steps", content band), and it leaves the rim's inset legs alone. Pass 3 takes one 12 px blur, deletes the deep tier and the rim legs, and keeps content at today's thin ink at level 1.
- **The owner's side answered.** BL records "O-103 owner answers APPLIED as rulings … D3 R-21 (b), Q-1 a, Q-3 a, Q-11 a + grey content accepted, Q-14 a" (`FORMATION-PROGRESS.md:537`), then O-103a and O-103b closing row 23 (`REGISTRY.md:3037`, `:3328`). The delegate letter: "Q-3 (a), chrome as a card at the bound, matches O-87" (`valuejs-outbound-2026-10-19-owner-answers.md:55`). D3's Q-3 is "chrome: a card or glass" (`REGISTRY.md:762`), the same question R3b now puts to the owner.
- **It is in BL's plan.** `waves/INDEX.md:15`: W-0.1, "O-62 light veil recut at the token; O-66 §1/O-66a Select and Input on one field surface; menu selected row off the veil-ink plate", owner D3, unplaced. W-H.1 and W-H.5 also build on D3's floor rows (FL-6, the well rung).
- **The owner's own grey complaint is absent.** O-62 ("why are our docks grayed out, too", N-13) is the ask D3 exists to cure (`PORTFOLIO.md` §0.1). §5.2 item 6 discusses grey under C-5 without it.

**Why it matters.** Two recuts of one material would be in flight in one library, from one owner, answering one question twice. A clean break is one recut. R3b would ask the owner a question his delegate has answered, without saying so, and §5.6 credits a deletion that W-0.1 makes first (A7).

**Remedy.**
- Read D3's REGISTRY (its ruling sheets and the pass-12 and pass-13 parts) and the floor patch. Restate §5 as amendments to D3's floor, not a parallel design.
- For each place pass 3 departs from the floor, name the owner ruling it reopens and the reason. The five departures are: one blur value (restraint.md:60-62 against the floor's graded radii); the deep tier; the rim legs; the content band left thin; and one ink on chrome, where the floor solves its bound so that the muted ink holds (RU-44 and C-5 support pass 3 here, but the departure is still named).
- Add W-0.1, W-H.1 and W-H.5 to §3.9.
- Hold R3b until it says what is already ruled, and asks only what is open.

### A2 (major). R3b's one letter decides more than the page shows.

**Claim.** §5.2 and §5.3 rest three decisions on the owner's R3b letter. The page shows one of them.

**Evidence.**
- **Scope.** The page shows dock-sized plates carrying "Library" (`R3b.html:123-127`). The letter sets the mix for "the dock, bars, menus, popovers, Select, Combobox and Command content, dialogs, sheets, toasts, tooltips and hover cards" (§5.2 decision 2). No menu-, dialog- or sheet-sized plate is on the page. Home Assistant's owner bound is "these modals should be more glassy" ([IN HA, bounds]), and those are the surfaces B firms most.
- **The clamp.** §5.3: "Provisional, and conditional on the owner taking B or C on R3b. Decision: the whole clamp goes in 12.0.0." The clamp answers his order "Glass dock over VERY LIGHT materials is unreadable, darken DYNAMICALLY like iOS 27" (`adaptive-legibility.css:16-18`, quoted in §5.3). R3b never mentions it. §1's own rule, amended in pass 2 (fold A4): "a part the owner ordered is never cut by a study law".
- **Half the trade.** The note gives the legibility case ("Over the photograph A falls under 4.5 to 1 on more than half of it … B never does", `:101`). It gives none of the transmission case §5.2 computes: B keeps 31 % of the photograph's structure in light and 21 % in dark, against today's 63 % and 60 % (`legibility.json`, `transmission`). The owner chooses between legibility and see-through, and the page states only the first. The note also calls the model "Measured on a computer"; it is computed in Node (§5.9).

**Remedy.** Add one overlay-sized plate (a menu with two rows) per letter. Say on the page that B or C retires the dynamic darkening, or ask that separately. Print the transmission figures beside the contrast figures. Call the model a model.

### A3 (major). The owner's record is given one way, and the one surface C-59 names is left as it is.

**Claim.** §5.2 item 6 is headed "For the owner, both ways". It quotes the asks that favour a firmer plate and leaves out the asks against it. It also understates how firm B is.

**Evidence.**
- **The asks left out.** UNION G1, the row pass 3 reconciles, lists both sides: "glassy, translucent popups and 'these modals should be more glassy' ([IN value.js 4]; [IN HA, bounds])". Pass 3 quotes neither. C-59's canon entry also carries "Glass dialog is no different and not glassy at all. GLASS should be partially transparent." (`CANON.md:1558`).
- **B in dark is firmer than the plate BL withdrew.** The record pass 3 cites says "the dark plate at 0.4 reads near-opaque … its alpha is 0.4 × 0.18 + 0.6 = 0.67 … Two thirds solid is not 'a bit'" (`RULINGS-6.md:27`), and later "the shipped level 0.4 is a near-solid brown slab in dark" (`verify-7.md:127`). By the same arithmetic, B's dark dock plate is 0.335 × 0.14 + 0.665 = 0.71. §5.2 calls it "about as firm".
- **C-59 is about a card.** "Too glassy is this card--too transparent." Its canon summary reads "content cards not so transparent they lose their body" (`CANON.md:1553`). §5.2 uses it to rule fit (d) out "for chrome" while calling (d) "the content band's end", and decision 2 keeps the content band at today's thin ink at level 1. The card stays as transparent as it was when he said this.

**Remedy.** Quote both sides in item 6. Give B's dark alpha beside 0.4's. Either put the content band to the owner under C-59, or say why a card stays at level 1 against his words. D3's floor paints content at the bound (A1), so that ruling is also on record.

### A4 (major). Law 10 is not checked on the firmer plate. BL's record shows a firmer plate erasing the selection.

**Claim.** B changes the plate under every selection mark, hover fill, press plate and menu row highlight on chrome. Pass 3 measures words, icons and the hairline against the plate, but no state fill against it.

**Evidence.**
- Law 10 (§1): "The selection is the one thing in its view that carries the ink". UNION T9: the selection is the bar's one focal ink.
- BL measured what a firmer plate does to it: "at level 0.4 in light the selected segment's mark is nearly invisible … it weakens in dark and in both engines … In light the mark also flips from darker than its track to lighter" (`RULINGS-6.md:23`); "selected segment against its track: Chromium light 1.37:1 on today's plate, 1.09:1 on this build" (`:17`).
- BL cured that only for the dock, with fills drawn from the ink (RU-56; `RULINGS-6.md:80`). Menus' `data-highlighted` fill, the segmented capsule (`.glass-capsule`) and the press plate (L20) sit on chrome plates that B also firms.
- R3b shows no selected item, hover or highlighted row.

**Remedy.** Add the state fills to `legibility.mjs`: hover, current and press on the dock, the segmented indicator against its track, and a menu's highlighted row. Run each on A, B and C in both modes, against the plate and against each other. Put one selected seat and one highlighted row on R3b.

### A5 (major). scroll-chrome still animates three properties on one node, and §4.4 reports two.

**Claim.** Fold A4 was meant to bring the collapse within restraint's ceiling. §4.4 now reads "Per collapse: 2 properties on the node, 3 transition legs, 1 shadow layer." The sketch still animates three.

**Evidence.**
- `fold/sketch/scroll-chrome.next.css`: `.scroll-chrome { transition: scale …, opacity …, box-shadow 160ms … }` and `.scroll-chrome[data-collapsed] { scale: 0.88; opacity: 0.72; box-shadow: var(--shadow-xl); }`. P2-scroll's lane B is the same (`P2-scroll.html:97-102`).
- Restraint's ceiling: "properties animating on one node in one change | 2" (`restraint.md`, the ceiling table). It counts properties that animate, not only those that move. `box-shadow` animates over 160 ms on the same node in the same change.
- The comment's "the next elevation" steps from `--shadow-sm` to `--shadow-xl`.

**Why it matters.** The owner is told the count is within the ceiling. Pass 2 named the same count rule for SegmentedTabs (§2.1), and it applies here too. The cure for A4 traded the rise for a shadow leg and kept three.

**Remedy.** Keep two. Either drop `opacity`: a collapsed bar at 72 % is a dimmed chrome, and scale from the top edge already reads as quieting. Or keep the shadow still across the collapse. Or put the third property to the owner with the count stated as three.

### A6 (major). The overlay entrance keeps its overshoot, and the P7 draft now writes it into the canon.

**Claim.** Fold B-3 refits panel "with its peak held at its own row's" (4.20 %) and notes that "every overlay entrance rides it (`motion-registers.css:69`)" (§4.3). P2 forbids overshoot on exactly those entrances, and nothing goes to the owner.

**Evidence.**
- P2: "Controls, text and reading surfaces enter and exit on an eased curve with no overshoot: mount, popover open, dialog in, a reveal … Overshoot belongs only to the spatial morphs the owner ruled" (`motion-canon.md:137-141`).
- `--enter-overlay-spring: var(--spring-panel)` is "the .glass-reveal DEFAULT (Dialog / Sheet / Popover / Toast)" (`motion-registers.css:68-69`).
- The same study labels a menu's overshoot as needing an amendment: R5's C and D "are labelled: overshoot on a menu needs `restraint.md:125-128` and P2 amended" (§3.6).
- The drafted P7 (§4.6) now says panel's curve "passes it by no more than its own row's overshoot, 4.21 %".

**Remedy.** Move the overlay entrance off panel and onto an eased row (`present` or `bloom`), as P2 directs for the other enters. Or put the overshoot on dialogs and popovers to the owner beside R5's labelled lanes, and keep it out of the P7 draft until he rules.

### A7 (major). The ledger nets a conditional removal and credits a deletion that BL's W-0.1 makes.

**Evidence.**
- §5.6's net, "CSS −446 or better; script −2,860", includes the clamp's CSS (−187) and script (−2,860). §5.3 makes that removal "conditional on the owner taking B or C on R3b".
- This pass's own fold A8 set the rule: undecided removals are "conditional rows outside the net" (§4.7).
- D3's floor deletes both composables and the knee (`floor-v11.patch`, A1), and W-0.1 carries that floor. Pass 2 credited the specular to W-R.1 on the same ground (§3.2).
- Without the clamp, the material's own net is −446 B of CSS and no script.

**Remedy.** Move the clamp rows to a conditional line credited to W-0.1. State the material's net without them.

### A8 (minor). B is solved at the threshold, with no margin for how glyphs are drawn.

**Evidence.** B reads 4.51 over black in light and 4.51 over white in dark (§5.1 tables). These are flat grounds, where the model is exact. D3 measured that "an engine's glyph antialiasing costs up to 0.22 of ratio at a solved bound", and set the target at 4.8 for that reason (`floor-v11.patch`, `tokens/glass.css`). By that measure, a small word drawn on B over black can fall to about 4.3. "B holds 4.5:1 over every ground in both modes" is true of the model only. The primary path must work in paint.

**Remedy.** Solve with D3's margin, or adopt its target, and restate the levels.

### A9 (minor). Q14's route names a token that 11.2.0's dock does not read, and crosses a message BL has drafted.

**Evidence.**
- §5.5: "A site's own setting writes one token, `--glass-level: 0`, on its root. Every plate turns opaque." From 11.2.0 the dock reads `--glass-level-dock`, and the a11y brackets set that token (`RULINGS-8.md:132-133`). A root `--glass-level: 0` leaves the docks translucent until 12.0.0 collapses the dock level (§5.2 decision 3).
- BL's drafted message to value.js says: "the `--glass-level: 0.1` in your more-contrast block no longer reaches your docks; adding `--glass-level-dock: 0.1` to the same block keeps them at 0.1" (`RULINGS-8.md:841`). §5.8 asks value.js whether its 0.1 should stay, without that context.

- §5.5 also says "The firmer default carries Safari's readers". The default is firmer for chrome only (§5.2 decision 2). A Safari reader with Reduce Transparency on still gets content cards at today's thin ink at level 1.

**Remedy.** Say that the firmer default reaches chrome only. Name the token per release (both tokens through 11.x, one from 12.0.0). Send §5.8's value.js question through BL, or after BL's message.

### A10 (minor). The rim-leg cut reaches every capsule, card and field, and §5.4 says content is unchanged.

**Evidence.**
- The legs are `--glass-material-rim` on every rung (`rim.css:54-60`). They also sit on the card (`card/styles.css:79`), the avatar, the table, the slider and a dock tab. Every capsule reads them (`glass-capsule.css:67-68`, `:83-84`), and so does `.glass-control-edge`, the resting silhouette of input, textarea, number field, SelectTrigger and ToggleGroupItem (`control-edge.css:33-35`, `:53-58`).
- §5.4 says of content plates in dark: "BM changes nothing there". R3b's edge pair shows chrome only.
- The cut itself follows restraint: the top leg is a specular, and the owner's C-2 is "Remove, do not tune". Field boundaries keep their border (`field/control.css:100-102`), so nothing here fails 1.4.11.

**Remedy.** Correct the sentence, list the parts that lose the legs, and put one card and one button with and without them on R3b.

### A11 (minor). The chrome mix adds a third factor, and the sketch names two classes that do not exist.

**Evidence.**
- The plate becomes the tier's ink × the level × the chrome mix (`material.next.css`, `@utility glass-plate`). At mix 0.482, floating and overlay differ by about 0.02 of ink alpha over a half-card base. D3 found the same kind of firm floor made wash, quiet and resting look the same (Q-1, `REGISTRY.md:778`). Restraint: "One variant per job".
- The sketch's chrome selector names `.glass-dialog` and `.glass-sheet`. In `src/` the first is only a keyframe prefix and the second an anchor name. Dialogs, sheets and overlays compose `.glass-floating` (`overlay-plate.css:14`, `SelectContent.vue:138`, `Toast.vue`).

**Remedy.** Show whether the two chrome rungs can still be told apart under the mix. If they cannot, give chrome one value per mode, as D3's bound does. Drop the two dead names.

## Objections that did not survive the second reading

- **"One ink on chrome" (§5.2 decision 4) is an owner's decision taken by the study.** Dropped. BL's RU-44 already rules "every word in a dock is the dock's full ink. Hierarchy comes from weight and size" (`INPUT-secondary-ink-2026-11-15.md:5`), and restraint says "No muted colors" (C-5). Pass 3 extends a ruling to the rest of chrome; it should cite RU-44, but the decision stands.
- **The rim-leg cut breaks field-control boundaries (WCAG 1.4.11).** Reduced to A10. The fields keep a 1 px border in `--field-control-ink` (`field/control.css:100-102`).
- **R5's close shows the seat bare for 120 ms, a dip in its material.** Dropped. It is the cure fold A7 asked for. The return is an `opacity` tween, and the gap is the price of never stacking two frosts.
- **The opaque route leaves `blur(0) saturate(1.5)` live on every plate.** Dropped as pass 3's fault. Today's reduced-transparency bracket does the same (`a11y-fallback.css:20-25`), and pass 3 does not change it. It is a production cost for Critic B.
- **The two-band split is a new variant axis.** Dropped. The ladder already names floating and overlay as chrome and wash, quiet and resting as content (`tokens/glass.css:16-22`). Pass 3 gives the existing bands different paint.
- **One 12 px blur contradicts BL's dark dock at 11.2 px.** Dropped. Restraint's one blur value (`restraint.md:60-62`) is the rule, BL's R8-6 records the split as a breach of C-4, and §3.9 routes it to the owner.
- **R3b's legend steers the owner, against fold B-8's neutral letters.** Reduced to A2's "half the trade". B-8 governed a perception reading (what stutters). R3b asks for a choice to ship, where the legibility facts belong on the page. The fault is that only one side of the trade is printed.

## Browser read

Refused at 19:06:38 (13.93M), and again at 19:16:58 (13.96M), after the 10-minute floor. The count only climbs until a reboot, so I stopped there. The read is owed: after a reboot, run `~/.claude/guard/guarded --timeout 5 -- node <scratchpad>/p3critA/read.mjs` from the glass-ui checkout. It reads R3b at 390 and 1440 px in both schemes: the page's scroll width, the plates' computed backgrounds and filter, the edged border colour, and whether "Library" overflows a plate. Nothing above depends on it.
