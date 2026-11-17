# P15, the verify

Seat: claude-opus-5-5 (asserted from the seat's own identity; Fable is out of quota until 2026-11-21, so this verify runs on Opus by the owner's standing ruling). 2026-11-17. Read only: no browser was run and nothing was changed except this file. Two comparison images were built from the banked PNGs in the session scratchpad (Pillow, no browser).

Read: `P15-RULING.md`, `P15.md`, the three demo commits on `bl/demo` after the fast-forward (`439ebff76`, `5b84b6b9b`, `0b4a4d936`, range `f8fa9dec8..0b4a4d936`) and their diffs, the two driver commits on master (`c1a72dc8f`, `10238ad8a`, scope only), all eleven contact sheets under `shots/P15/contact/` beside their P14 counterparts, the tip crops of every changed route (the eleven dock routes and the containers routes, with `-arrival` and `-closed`), `bite/`, `shift/`, `rerun/`, `tip/check-*.txt` and `tip/sweep.jsonl`. The routes P15 did not sheet (data, display, foundations, substrates) were rebuilt from the P15 crops in the contact script's layout and diffed tile by tile against P14's sheets. Judged against `OWNER-ORDER.md` and `FORM.md`.

## Verdict

**Merge.** No page is broken, empty or worse than P14. The owner's complaint about the dock (points 11 and 12: "poor demo of the dock", "not proper dock demos on the cards") is answered on the index: P14's six bar charts are now ten different things a dock acts on. Menu's arrival behaviour is fixed, and the build found and cured a live fault on the deployed Menu page (its Options button took no pointer press). Nothing below holds the merge.

## `src/`

Untouched. `git diff --name-only f8fa9dec8..0b4a4d936` lists ten files, all under `demo/stories/` (`containers/dropdown-menu.stage.vue`, eight dock stage files, `_parts/DockScene.vue`, `_parts/MiniBars.vue`). The two driver commits touch only `docs/tranches/BL/driver/demo-site/{sweep,check}.mjs`. The shared parts P15 changed (`DockScene`, `MiniBars`) are consumed only by dock stages (`rg -l` over `demo src tests`), so no other section can move.

## Item by item

| # | Done as ruled | Reads better than P14 | Notes |
|---|---|---|---|
| 1 Canvas Tools | yes | yes, by the widest margin of the pass | An artboard where P14 had a bare field; the `/dock` card is no longer an empty tile |
| 2 One context per page | yes, with two reasoned departures | yes | Ten cards, ten forms; see below |
| 3 Menu, no focus on every switch | yes | yes (behaviour) | A3 3 of 3; the `data-reserve` cure rides the same commit |
| 4 Menu after Escape stays | yes (no code) | unchanged, as ruled | Trigger top 185.5 → 185.5 (1440), 161.2 → 161.2 (390) |
| 5 Closed crops | yes | — (driver) | Nine `-closed` crops, each from a row reading `closed: 0` |

### Item 1, Canvas Tools

`canvas-tools.stage.vue` gains a figure `ScenePage` holding one SVG (`role="img"`, "Artboard", viewBox 160×90): nine hairlines each way at `--ink-seam` (the token exists, `src/styles/tokens/color-radius.css:145`), a two-segment path through three anchors with the middle one selected, its two handles and end dots. The reflected handle (110, 42) is the true reflection of (50, 30) about (80, 36), so the drawn handle lies on the curve's tangent. Grid and Draw fade their layers on `--duration-normal`; reduced motion drops the transition. Layers, Export and Full screen are untouched, as ruled.

On the page (`tip/dock_canvas-tools-d1440.png`) it reads as a pen tool on a board: grid, curve, anchors, handles, the dock in the top-end corner. On the `/dock` card the same artboard reads at card scale. D2 (Draw, pressed while folded) moves the edit layer 1 → 0 in one leg, largest step 0.097 to 0.110; D3 holds the rect in all four dock states.

### Item 2, one context per page

Done as ruled, page by page, against the diff and the crops:

- **nav**: a titled column of rows. People (the default): four `Avatar` initials and names. Home, Reports, Settings as ruled; Off is `idle` because `StatusDot` has no `offline` state (`status-dot/StatusDot.vue:13`, states in `states.ts`). Title and rows cross-fade on the library's `fade` (`src/styles/transitions.css:15-21`).
- **rail**: a titled column of three `Metric`s (`stacked`, `lg`), three across, one column under 30rem through the new `scene-context` container. Each swaps through the library's `metric-swap`. A delta sits on the value's line (`metric/Metric.vue:62-76`), so Growth adds no height in the one-column form.
- **figure tools**: three polylines in `--foreground`, 2 px, non-scaling stroke. They read as sparklines in each figure Card.
- **dial bar**: the bars kept on a library `Card` with the same box; the hand-made plate is gone. In light the plate is now the shared tinted Card rather than P14's near-white block; the bars still read.
- **transport**: one `MusicStaff` (score mode is the default, `music-staff/MusicStaff.vue:36-43`), `material="bare"`, eight notes over two bars. The playhead and inked wipe advance on Play (D2: one leg, step 0.038 to 0.040).
- **corner controls**: PLANETS in seven tiles, a `TransitionGroup` keyed by letter. Shuffle slides five tiles in one leg each (A and T keep their places).

Every new binding names a real prop and value (`Avatar` `decorative`/`sm`, `Badge` `secondary`/`sm`, `StatusDot` `state`/`size`/`motion`/`label`, `MusicStaff` `notes`/`label`/`material`/`progress`, `Metric` `posture`/`size`/`label`/`value`/`delta`). None of them is a misnamed binding that would do nothing while the typecheck passes.

The two departures, both accepted:

- **A third staff band** (0.32rem under 20rem of context width). The build measured the `/dock` card's context at 243 px (1440) and 316 px (390), too narrow for 39 staff spaces at 0.45rem. The page cells keep the ruling's two bands (the 390 page context is 340 px). The card's score reads as a score at that size (enlarged from `tip/dock-d1440.png`).
- **Off as `idle`**: the ruling named a state the library does not have; `idle` with `motion="off"` is the library's still off mark.

**Do the eleven dock pages now differ?** Yes. The index shows ten cards with ten forms: rows with avatars (Navigation), a document (App Chrome), three figures (Section Rail), three lines (Figure Tools), bars (Dial Bar, the one bar figure left, D5b reads 1), the artboard (Canvas Tools), a score (Transport), a slide number (Pager), letter tiles (Corner Controls), a stylesheet pane (Action Row). The ten pages behind them carry the same ten contexts at full size. P14's index read as a page of bar charts; P15's does not.

**Does any still read as a wireframe or a repeat?** None reads as a repeat. Three read as sparse:

- **Section Rail at 1440**: the column Card is 704×438 and the three Metrics sit in its top 120 px, so about two thirds of the Card is blank (`tip/dock_rail-d1440.png`). At 390 and on the `/dock` card the one-column form fills the Card and reads well. On the page at 1440 it is the weakest context of the pass.
- **Navigation at 1440**: four rows in a 358 px column leave the lower quarter blank. It reads as a short list, not a wireframe.
- **Navigation and App Chrome** are siblings in form: a titled column Card holding a short list. The avatars and the dock's position keep them apart on their pages; on the index at card scale ("People / Ada, Grace…" against "Trip plan / Flights, Lodging…") they read alike.

Pager's large "2" on a blank Card is as P14 left it, and the ruling kept it.

### Item 3, Menu

The `watch` on `mode` re-arms `arrival` before the pane mounts (default pre-flush; `StageSwap`'s out-in transition mounts the new pane later still), so the mount's open keeps focus out and a later press or key takes it in. A3 reads 3 of 3 on the tip (`focus button "Dropdown"` after both returns, then focus inside the menu after a press on Options) and failed as predicted on the P14 build (focus inside the menu's content on both returns).

The `data-reserve` finding checks out: `src/components/dock/styles/dock.css:260-262` sets `pointer-events: none` on any `[data-reserve]`, and P14's stage put that attribute on the Options button's box, so the live Menu page could reopen its list by keyboard only. Renaming the demo's attribute to `data-arrival` is the right cure; the library rule serves its own reserved-footprint hosts. The global attribute name is a collision hazard for any consumer and is worth one line to the library (below).

### Items 4 and 5

Item 4 has no code. A2's added condition holds the trigger's top within 1 px from arrival to Escape in all three cells.

Item 5: the sweep writes no plain crop on the three arrival routes and nine `-closed` crops, each from a row reading `closed: 0` (`tip/sweep.jsonl`). The containers sheets take the closed crops (labelled "closed"); `contact-arrival.png` keeps the open ones. Dialog and Sheet closed show the header, a `fit` stage with one trigger and the two switches, which is the evidence P14's verify said was missing.

## Anything worse than P14

Nothing found.

- **Dock and containers**: compared sheet against sheet in all three cells (above). Context Card boxes sit where P14 put them; the dock pages change only inside their contexts.
- **The untouched sections**: rebuilt in the contact script's layout and diffed against P14's sheets. Every tile in data, display, foundations and substrates matches within noise (mean absolute difference 0.0 to 1.9 of 255, no pixel area over 40), except Buttons at 390 (mean 9.5). That one is the lede, "Commands at four emphases and two tones.", committed in `8fb5b65a5`, P14's own last commit and the base of this pass; P14's sheet was taken before it.
- **`/`**: identical to P14 except the Dock card, which now shows the People rows in place of bars.
- **Hover shift**: nav, chrome, rail, pager, corner controls as P14; canvas tools 9 and figure tools 22 as their P14 baseline; transport 22 against 24 (the two playhead entries gone). Every remaining entry is a dock box (F8, the library's).
- **Checker and sweep**: no failure on 78 routes in any cell. The sweep's Command fail is P13's; Timeline at 390 (0.401 against 0.4, a route P15 did not touch) passes on two reruns.

## Blocking candidates, each judged twice

None holds. Each was weighed as a hold and released.

1. **Section Rail's blank two thirds at 1440.**
   - First judgment, against the hold rule: not broken (D1 to D4 pass), not empty (a title and three figures), not worse than P14 (P14 showed a bar chart, one of six alike, which is what the owner objected to).
   - Second judgment, as the owner at 1440: the first look lands on three numbers floating at the top of a tall blank plate. That is a design weakness, but the page still shows what the rail does. A press on a section swaps the figures, so the context answers its dock. Not a hold; it is the first item for the next pass.
2. **Dialog's trigger focus ring is clipped after Escape** (`tip/containers_dialog-{d1440,l1440,m390}-closed.png`). Only the ring's four corner arcs show, because `.stage-swap { overflow: clip }` (`demo/chassis/variants/StageSwap.vue:48`) wraps the Dialog trigger and shrinks to the button's rectangle. Sheet uses no StageSwap and Menu stretches its pane to the stage (`dropdown-menu.stage.vue`, `:deep(.stage-swap-pane) { block-size: 100% }`), so both draw a whole ring.
   - First judgment: the file and the clip date from the first rebuild (`5cb1928fa`, `c083b052e`) and P15 changed neither, so the page is the same as P14. Not worse.
   - Second judgment: it is a real keyboard-focus defect, and both the ruling ("its focus ring shows in the crop") and the build ("carries its focus ring after Escape, as the ruling expects") looked at it and missed the clip. P15's own new crop is what exposes it. Holding the merge would not cure it, and the merge does not add it. Not a hold; a demo row for the next pass.
3. **Menu's closed stage is a tall blank box with Options at the top** (`tip/containers_dropdown-menu-*-closed.png`).
   - First judgment: ruled to stay (item 4), the same page as P14.
   - Second judgment, as the owner: a visitor who closes the list sees 400 px of empty stage. But the list arrives open and reopens on every switch, so the first screen and every switch show the component large and first. Not a hold.

## Copy and FORM limits

- No page file, route row, lede, variant label or snippet changed, so every FORM word count outside the stage is as P14.
- The added copy is the ruling's list, plus the build's badge counts 12, 4 and 2. Context names are one word each ("Enrolment" follows the site's British spelling, as "recognise" in Dialog).
- `rg -P -i -f driver/register-lint.pattern` over the 391 added lines of `git diff f8fa9dec8..0b4a4d936 -- demo`: no hits (rerun here).
- The FORM banned-word grep (checker line 10, `\b[A-Z]{1,3}-?\d+\b`) reads `article.innerText` with the stage included (`check.mjs:292-295`). Nav's Reports rows "Q2", "Q3", "Q4" would match it if a read ever reached that tab, as Figure Tools' table view ("Q1" to "Q4", since P14) would. They are quarter names, not ticket ids, and neither shows at load, so line 10 passes. A note for whoever widens the checker, not a fault.
- `Metric`'s uppercase labels (COAST, PIEDMONT) are the library's styling, reported against the library under FORM line 9, not counted as page-authored capitals.

## Owed, not holding the merge

- **Next demo items**: Section Rail's blank lower Card at 1440 (and Navigation's lower quarter): let the column contexts size to their content or take a body that fills them. Dialog's clipped focus ring: give `StageSwap` room for a focus ring, or stretch Dialog's pane as Menu does. Pager's bare "2", if the owner wants every context full.
- The two driver commits (`c1a72dc8f`, `10238ad8a`) are on master locally, unpushed; push them with the merge.
- `ROUTES.md:115-116` still says Dialog and Sheet open on a press (the orchestrator's).
- WebKit ran on 11 routes, not P14's 18; Safari.app was not run.

## The library's rows

As the ruling booked them: O-390 e (light Dialog and Sheet ink, the focus veil's pool; the arrival crops still show it) for 11.1.2; F8, O-386, O-387 (the dock's growth on hover, the redesign) for 11.2.0. One line to add, not a P15 fault: `[data-reserve] { pointer-events: none }` in `dock.css:260` matches any element with that attribute anywhere on a page. A consumer that uses the name for its own purpose loses pointer input without warning, as the demo's Menu did on the live site. A scoped selector or a namespaced attribute would close it.
