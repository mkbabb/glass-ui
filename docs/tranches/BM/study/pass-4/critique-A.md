# BM pass 4: critique A (the owner's law and restraint)

Seat: critic A, claude-opus-5-5 (asserted from its own system identity), 2026-11-22. No iPhone reading has returned (`READINGS.md`: none published, none returned), so every finding below is against the design text, the sketches and the page source. I changed no design, page or source.

The line judged (UNION §4, pass 4): "Shape. Fold R1 and R7. Prototype a glass plate growing from a 44 px seat into a 250 px panel by scale, by size writes and by `clip-path`; read corner fidelity and cost, and take backdrop clipping from R1. It produces design §6, a decision on Q1 and a proposal on Q19 for the owner."

**Read.**

- The study: `CHARTER.md`, `UNION.md` whole, `union-fold.md`, `INBOUND.md`, `READINGS.md`, `DESIGN.md` §1 to §3, §4, §5.0 to §5.2 and §6 whole, and `pass-3/fold.md`.
- Pass 4's files: `pages/P4-bud.html` whole, the head of `R3b.html`, `pass-4/shape/geometry.mjs` with the cost block of `geometry.json`, `probe.mjs`, the three sketches under `shape/sketch/`, `pass-4/fold/sketch/scroll-chrome.next.css`, `check/static-check.json` and `retry.log`.
- The evidence behind them:
  - Precepts: `docs/precepts/restraint.md` (:20-62, :105-215 and the ceiling table, blamed in the precepts repo) and `affordance-map.md:57-77`.
  - Today's menu: `src/styles/glass/reveal.css:95-130` and `:255-290`, `src/styles/tokens/motion-registers.css:24` and `:76-81`, commit `8d3dc8d2d` (its CHANGELOG entry and `docs/canon/motion-system.md`), and `docs/release-11.1.0/lane-L2.md:144-165`.
  - BL: `docs/tranches/BL/audit/INBOUND.md:146` (O-171), `bl/dock/wi8:src/components/dock/styles/dock.css:1-31`, `useDockBody.ts:1027-1061` and `docs/tranches/BL/waves/W-I.8.md:107` and `:145`.
  - The owner's record: `~/.dev-logs/feedback-canon/CANON.md:645-660` (C-30).

**Runs.** No browser. The kernel zone stood at 14.11M at 20:01 (`~/.claude/guard/log/zone.log`), above `guarded`'s refusal line, and no objection here needs paint: each rests on CSS that fixes the geometry. Two Node computations, both in the scratchpad: the sketches' gzipped sizes, and the contrast of a word on a collapsed scroll-chrome bar (A4-10). The sketches measure 195, 268 and 225 B, against the design's ≤ 190, 268 and 220.

Each objection was made, then its evidence re-read; five did not survive and are listed at the end.

---

## A4-1 · blocking · E, the proposed default, reverses the owner's O-171 without naming it, and §6.4 misstates today's menu

**Claim.** §6.4 makes lane E the default for every control growing into its panel and calls it "today's menu entrance (`motion-registers.css:76-81`) with the `clip-path` strip, the slide and the blur leg taken out" (`DESIGN.md:719`). Today's menu has no fade and no scale. It grows from its trigger on the owner's order, and E undoes that order.

**Evidence.**

- **Today's menu neither fades nor scales.** `reveal.css:106-121`: "A menu does not bloom: it grows from its trigger as geometry … no scale, no squish, no blur, no slide", with `--glass-reveal-enter-scale: 1`. At `:267-288` it opens on `glass-menu-grow` with `@starting-style { opacity: 1 }`.
- **E reads a dead token.** `--enter-menu-scale` (`motion-registers.css:79`), which `bud-bloom.next.css` reads, is read by nothing in `src/`. `git grep` finds it only at `:24` and `:79`.
- **The grow is an owner order.** BL `audit/INBOUND.md:146` records O-171 as "owner order 2026-11-05 eve: every height and width animated, no needless fade". It led to R-1: "the `data-reveal="menu"` plate grows from its trigger as geometry (no blur, opacity held)". R-1 shipped in 11.1.0 (`8d3dc8d2d`; CHANGELOG: "Menus grow from their trigger … no longer bloom and fade in"; `lane-L2.md:144-158`).
- **E undoes both halves.** It fades the menu in, which is the fade O-171 calls needless, and it animates no height or width.
- **§1 forbids the cut.** Its preamble says "a part the owner ordered is never cut by a study law" (`DESIGN.md:15`). §6 does not cite O-171 anywhere.
- **The owner is not told.** P4-bud's legend for E ("the menu appears at its own size, growing a little from the button") does not say that E undoes his order.
- **E is already booked as the design.** It is written into §2.1 for menus, Popover and Dialog (`DESIGN.md:51`, `:53`, `:55`), into §6.6's ledger ("12.0.0 (a default every consumer sees)") and into §6.7 ("A menu opens … It fades in").
- **The conflict cuts both ways.** `restraint.md:143`, "Transform and opacity only", is dated 2026-11-09 by blame, later than O-171. It bars C's `clip-path`, the mechanism 11.1.0 ships. It does not overrule "no needless fade". §6.4 pins C on pass 2's unadopted P5 draft rather than on line 143, which is in force. Among the five lanes, only D keeps both O-171 and line 143; A keeps them too but was refused for its corners. D keeps them at the ceiling's cost.

**Remedy.**

- Cite O-171 in §6.4 and strike the "today's menu entrance" sentence.
- Put the control-to-panel half of Q1 to the owner as the conflict it is:
  - D keeps O-171 and `restraint.md:143`, and breaks the wrapper and press ceilings.
  - C keeps O-171 and the ceiling, and breaks line 143. It is 11.1.0's mechanism, started from the seat instead of a strip.
  - E keeps line 143 and the ceiling, and reverses O-171's "no needless fade".
- Name no default until he rules. Withdraw E from §2.1, §6.6 and §6.7 as the booked design.
- Say on P4-bud's legend that E undoes the 11.1.0 grow he ordered.

## A4-2 · major · P4-bud draws glass over glass itself, in the lanes the owner judges for a square or darker patch

**Claim.** The page overlaps two frosted plates on its own, so the patch the owner is asked to report cannot be told from the backdrop spill R1 and §6.4 item 4 are reading for.

**Evidence.**

- **Lane E sits on the seat at rest.** `.lane` (`P4-bud.html:78`) and `.seat` (`:72-73`) both sit at left 16 px, top 16 px. Lane E's panel (`.pE`, `:111`, `inset: 0`, z-index 2) covers the seat (z-index 1), and the script keeps the seat for E (`:211-212`, whose comment says "E opens beside it"). At rest, E's frosted panel samples the seat's frosted circle and its three dots under "New tab". That is a blur over a blur: law 1, `restraint.md:60-62`, UNION F5. With Frost off, a second fill circle shows under the panel at 54.5 %.
- **Lanes A to D overlap in motion.** The seat fades over 80 ms (`:75`, `:116`) while the bud grows over it from frame 0. On close, the seat starts returning at once under the panel that is still receding.
- **Pass 3's hand-off is not used.** Pass 3 folded a hand-off into R5 (DESIGN §3.6, the R5 row, fold A7) so that "no plate frosts another". P4-bud does not take it.
- **The reading asks for exactly this patch.** The page's ask (`:145`) and §6.8 ask for "the letters whose corners stop looking round or show a square patch".

**Remedy.**

- Put E's panel where a menu rests, beside or below its seat at reka's side offset, not over it.
- Give A to D R5's hand-off: the seat's glass goes at frame 0 under the bud and comes back by a tween once the bud has gone.
- Rerun the static and stub checks. The reading stays owed.

## A4-3 · major · On the dock, the capsule window brings back the triple identity BL's cure removed, clips the seats at rest and moves the content; lane F builds none of it

**Claim.** "When the window is the part's own element and the glass its `::before`, nothing is added: one property per node and two animations per change" (`DESIGN.md:705`). That holds for a part with no content. On the dock it breaks a structural cure and the owner's no-clip rule, and it changes the fold's content motion without counting it.

**Evidence.**

- **The sketch clips and moves the whole part.** `capsule-window.next.css` puts `overflow: clip`, the capsule radius and `translate: calc(-1 * var(--from)) 0` on the part's own element. Every child moves with that element and is clipped by it, at rest as well as during the fold.
- **BL named this arrangement as the root cause it cured.** wi8 `dock.css:4-29`: "`.glass-dock` was SIMULTANEOUSLY the glass surface, the morph clip aperture (`overflow: clip` …), AND the interactive item container — every named clip/morph defect was a downstream compensation". In the cure, the plate is "a SIBLING of the control run, NEVER its ancestor — so a control hover plate overhangs the plate edge UN-CLIPPED", and the controls are "`overflow: visible` BOTH axes ALWAYS".
- **The owner has ruled against the clipping three times.** C-30, "Nothing clips: hover, focus, pills, bars, popovers", is the source of `restraint.md:113`. The quotes: "When hovering over a button at the end of a dock, it should not clip the hover like this" (2026-07-11), and the same complaint on 2026-09-23 and 2026-11-09 (`CANON.md:645-660`). The window's arc would cut a seat's focus ring, its press plate (`affordance-map.md:57-77`) and any lifted mark that stands proud of the bar (UNION L1 and L3, 1.14×).
- **The content moves, and keeping it still costs.** With the seats inside the window, the fold slides every seat `from` px toward the fixed end (184 px on the page) and leaves the far seat showing in the disc. Keeping a chosen seat in place needs one of two things:
  - a counter-translated wrapper, which is a node added for a motion (ceiling 0);
  - a translate on each seat, which goes past two animations per change.
- **The removal has no replacement.** wi8 meets the same need with per-region `clip-path` writes (`useDockBody.ts:1045-1061`). §6.3 removes those writes and puts nothing in their place.
- **Lane F is not the proposed structure.** P4-bud puts the dots outside the window (`.dots` is a sibling of `.fw`, `:181`) and fades four of them in 80 ms (`:131`, `:133`). That is six animations per fold, none of which the design counts.
- **The mark is unaffected.** The selection mark holds no content, so the claim stands for the mark.

**Remedy.**

- Limit §6.3's "nothing is added" to parts with no content (the mark).
- For the dock and the theme seat, say where the content lives and what it does during the fold (rides the window, counter-moves or fades), and count it. Keep the plate a sibling of the controls, as wi8 does.
- Build lane F with the seats inside the structure the sketch proposes.
- Until then, the fold's shape stays open in §6.4 item 1 rather than decided.

## A4-4 · major · The window moves the box of its element at the folded rest, and the question to atlas asks only about the motion

**Claim.** When folded, the element the window sits on rests translated `-from`. Its box therefore stands 184 px (on P4-bud) past the visible disc, beyond anything the open dock covered.

**Evidence.**

- **The rect and the hit area both move.** `getBoundingClientRect` reports the displaced box. The element also hit-tests its own capsule there although it paints nothing, since the glass is its `::before`. In wi8, the plate is the element that does "pointer absorption" (`dock.css:11`).
- **atlas fails it.** Its suites "fail any box that moves on hover, open or fold", and its head-row corner seat has "0 px² over the title at rest" ([IN atlas 2, 5]). A dock root displaced at rest fails both.
- **The question undercounts.** §6.8 (`DESIGN.md:767`) asks atlas only whether a suite reads "the dock root's box during a fold".
- **Pass 3 already solved this for the rim.** There, the root never moves, and an `aria-hidden` window span slides inside it, "so no box a suite or VoiceOver reads moves" (§4.4, the ScrollProgressRim row, folds A3 and A5). That span is a node added for a motion. §6.3 claims none.

**Remedy.**

- Apply the rim's rule: the part's root keeps its box, at rest and in motion.
- Count the window span as the added node it is, and send that count to the owner beside D's.
- Restate the atlas question so it covers the folded rest, and add the hit area beyond the disc to §6.3.

## A4-5 · major · The ceiling is counted per open of the menu, not per press, so "within the ceiling" is wrong for C and E

**Claim.** §6.2's count leaves out the trigger's own answer to the press and the seat's hand-off.

**Evidence.**

- **The rules count per press.** Law 4 (DESIGN §1): "Animations started per press ≤ 2". The restraint ceiling table: "animations running on a press | 2".
- **The study counts per open.** §6.2's column is "Animations per open (the menu)", and `geometry.mjs` hard-codes those numbers (`cost`, `animations_per_open`).
- **The press starts more than the menu.** It also starts the trigger's plate leg ("the full strength for a press, never shorter than the press clock", `affordance-map.md:57-77`, shipped in 11.2.0). In A to D it also starts the seat's hand-off, which P4-bud runs as its own 80 ms opacity leg (`:75`).
- **Recounted per press:** E 3 (plate, opacity, scale), A 3 to 4, C 3 to 4, D 5 to 6.
- **The claims fail on that count.** §6.4 says C is "within the ceiling" and E "within P2 and restraint's ceiling".

**Remedy.**

- Count per press, with the trigger's answer and the seat's hand-off included.
- If a press that opens a panel is to stay at two, write the rule that keeps it there. Either the plate stands down on such a press, or the bud's fade is the press's answer. Send that rule to the owner beside Q3's one-answer-per-press question (L20).

## A4-6 · major · The window lands in 11.3.0 with nothing removed in that release, and its payer is measurable but unmeasured

**Claim.** §6.6 lists "the capsule window, per part" at 220 B. Its payer is "wi8's private fold integrator (unmeasured; pass 7)", and the release split is "11.3.0 for the window; the removals in 12.0.0" (`DESIGN.md:744`).

**Evidence.**

- **One window outweighs Home Assistant's margin.** The sketch measures 225 B gzipped. Home Assistant puts glass-ui's CSS in its entry script and has 0.2 kB of margin ([IN HA 5]; §4.7). One window alone exceeds that, and §6.4 item 1 names three parts that take it.
- **The removal must outweigh the addition.** Law 9 and restraint both say so: "A seat that adds a piece states what it removes, and the removal outweighs the addition".
- **The payer is private and measurable now.** The integrator lives in `useDockBody.ts` on `bl/dock/wi8` (1,359 lines; its plate and region writes at `:1027-1061`). Nothing in the release rules holds a private file's deletion to 12.0.0. It can be bundled and measured now, as pass 1 measured `useDockRunMark`.
- **11.3.0 would carry two engines.** Shipping the window beside the integrator puts two fold engines in one release.

**Remedy.**

- Measure the integrator now.
- Land the window and the deletion in one release. That release is 12.0.0 if the window changes dock structure that consumers style.
- Price that release per site entry, Home Assistant's first.

## A4-7 · minor · As sketched, D's and C's shadow and edge either arrive by a cut at rest or never show, and the page draws no shadow

**Evidence.**

- **D's shadow is never drawn as sketched.** In `bud-windows.next.css` the panel's root `.bud-win` is the first window, with `overflow: clip`, and the plate is `.bud-win-y::before` inside it. A `box-shadow` on the plate falls outside the root's box, and the root clips it for as long as the root exists, which is always. Put on the root instead, the shadow would show at full size from frame 0 around a panel that is still a seat.
- **The design says otherwise.** §6.4 says D's "edge and shadow show only at rest" (`DESIGN.md:720`).
- **C's "lift" option is a cut.** §6.2 says C "must then extend its clip concentric past the box or lift it at rest" (`:701`). Lifting a clip at rest is a cut. 11.1.0's grow already solves this: it extends its clip 2 rem past the plate, so the shadow is inside the clip when it lets go (`reveal.css:275`; `lane-L2.md:153-155`).
- **The owner cannot see the cost.** P4-bud says "No shadows, so only the shape and the frost are compared" (`:7`), so the owner is asked to choose between D and C without seeing a cost the design lists for both.

**Remedy.**

- State D's shadow as sketched (none, or a full-size ghost), or design a shadow that tweens in.
- Give C the 11.1.0 bleed and drop "lift it at rest".
- Draw the one elevation shadow on P4-bud.

## A4-8 · minor · The new shape channels have no reduced-motion branch, and for the window §4.3's rule gives a shape cut

**Evidence.**

- **None is written.** §6 and the three sketches carry no `prefers-reduced-motion` arm. Law 7: "Under Reduce Motion it is a short fade, never a cut". P4-bud tells the owner to turn Reduce Motion off (`:147`).
- **The existing rules cut or blink.**
  - §4.3 rule 1's reduced-motion column drops the transform and keeps a fade. For the window, the shape change is the translate, so the fold's width would land in one frame.
  - Rule 2's dip would fade the whole dock and its seats out and back on every change of scroll direction.
  - BL's W-I.8 R-11 places the geometry in one frame and fades the content over 100 ms (`W-I.8.md:145`).

**Remedy.**

- Name each channel's reduced-motion branch in §6. For E: a fade with no scale.
- For the window: BL's R-11 or a stated alternative, with the cut it makes put to the owner under law 7.

## A4-9 · minor · P4-bud's own motion breaks law 7 in four places

**Evidence.**

- **Legs under the floor.** The seat's and the dots' opacity legs run 80 ms (`:75`, `:131`) and the rows' closing fade 60 ms (`:82`). Law 7's floor in §1 is 83 ms.
- **A cut between lanes.** Picking a letter hides the open lane by `display: none` (`:78-79`, `:207`).
- **An untweened legend.** The legend's current line changes colour with no transition (`:64`).
- **Content before shape.** On unfold, the dots come back in 80 ms with no delay while the window opens over 120 ms (`:133`, `:232`), so the marks drawn on glass stand on the bare stripes before their plate arrives. P3 puts content after shape (`motion-canon.md:97-100`).
- **The clocks are swapped.** The fold runs its unfold on the exit clock (0.6) and its fold on the entrance clock (`:247`).

**Remedy.**

- Make every leg at least 83 ms.
- Let a lane leave by its own close before the next one shows.
- Tween the legend.
- Delay the dots' return until the window has passed them.

## A4-10 · minor · The scroll-chrome sketch pass 4 rewrote keeps the collapsed bar at 0.72 opacity, which breaks the bound pass 4 adopted

**Evidence.**

- **The sketch dims the whole bar.** `pass-4/fold/sketch/scroll-chrome.next.css`: `.scroll-chrome[data-collapsed] { scale: 0.88; opacity: 0.72; }`.
- **§5.0's bound is set at full opacity.** It adopts D3's law: chrome's "fill alone must hold legibility" at 4.8:1 over the worst flat ground.
- **Dimmed, every letter falls short in dark.** With §5.0's alphas and glass-ui's default colours, the lowest contrast of a word on a collapsed bar is:

  | Letter | Light | Dark |
  |---|---|---|
  | A | 7.05 | 3.64 |
  | B | 3.00 | 2.78 |
  | C | 2.22 | 2.20 |

  My script uses the same method as `material-fold.mjs` and reproduces §5.0's full-opacity figures (12.84 / 7.45 for A, 4.81 / 4.81 for B).
- **The floor is carried over unexamined.** 0.72 is today's floor (`scroll-chrome.css:46-52`, `--chrome-fade-depth: 0.28`).

**Remedy.** Either the collapsed bar dims nothing (scale only, one property), or the bound is solved at the dimmed opacity. Put the choice to the owner with R3b's letter.

---

## Dropped on the second read

1. **The run's caps.** §6.3 calls the caps' compositor route a failure. A rounded window that slides past a square edge turns a square end round on `translate` alone, with a truncated arc in between, so "fails" overstates. The outcome, a still clip sent to the owner as a picture in pass 3, is the cut restraint favours. The reason is wrong; the decision is not. Left to critic B.
2. **E's bytes.** §6.6 says ≤ 190 B; I measure 195. The difference does not matter.
3. **E's reach to Popover and Dialog.** §2.1 extends E's channel to both without a prototype. Q1 names every shape change, so the reach is in scope. Its fault is A4-1's.
4. **Two inks on P4-bud.** The page shows two filled buttons at once (the letter and Frost). It is a reading instrument, and each button shows its state by its word and its fill, as pass 1's fold set.
5. **Q19.** The proposal keeps `restraint.md:143` and argues from O-260 and discrepancy 6. Nothing to object.

## What holds

- §6's first line says that no reading has returned, that the browser runs were refused, and which runs are owed, with their commands. The second attempt that came under the 10-minute floor is recorded.
- A is refused on its first-frame corners and B on layout and three properties per node. Both refusals are restraint's.
- The capsule window as the selection mark's width channel is exact, runs on the compositor and adds nothing (A4-3 does not reach it).
- D and C go to the owner with the ceiling and the thread they break named. A4-1 asks only that O-171 be named beside them.
- The Q19 proposal is the restraint-keeping answer, put as a proposal.
