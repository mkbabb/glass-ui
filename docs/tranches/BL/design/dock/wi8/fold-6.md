# W-I.8, the sixth fold

2026-11-16. Seat: fold. Model: claude-fable-5-2.

This folds the three challenges to `RULINGS-6.md` (`challenge-6-restraint.md`, `challenge-6-measurement.md`, `challenge-6-consumers.md`) into that file, in place. Every accepted objection is a paragraph in its ruling that begins *Amended (fold 6: ...)*; the final order, ready list, REMOVES list, budget arithmetic and owner questions are the last section of `RULINGS-6.md`.

I read, reasoned and wrote. I ran no browser and no build, changed no source, and staged nothing. `OWNER-READ.md` is not edited; the amended question texts are at the end of `RULINGS-6.md` for the seat that owns that page.

## What was read

In full: `RULINGS-6.md` and the three challenge files. To check evidence, on the worktree `.claude/worktrees/bl/dock/wi8` at `a68cd272c`: `measure/logs/m6-ru50-s2probe.chromium.txt`; `useDockBody.ts:500-530`; `useDockRun.ts:284-296`; `ControlsDock.vue:14-30`, `:52-64`, `:83-86`; `DockOutlet.vue`; `GlassDock.vue:451-463`; `tab-button.css:155-163`; `icon-button.css:244-252`; a grep of `src/components/tooltip` for a touch branch; a grep of `release-10-1-5.spec.ts` for the reserve tests. On other trees: keyframes.js `origin/master`, `test/demo/app/dock-context-slot-resolution.test.ts`; glass `master`, every use of `DockBackgroundToggle` under `demo`, `tests` and `tests-visual`. `OWNER-READ.md` questions 2 and 12 to 17; `RULINGS-4.md` RU-30; `SURFACE.md:125`; `LEDGER.md:134`.

Not read: the strips, the other logs, the other apps' trees. Where an objection rests on those, I took the challenger's citation as given and say so.

## The count

Twenty-eight objections: 1 blocking, 18 major, 9 minor. Twenty-six accepted, two accepted in part, none rejected outright. The two parts not taken are in rows R-2 with C6-M2, and C6-M10.

## The blocking objection

**C6-M1, accepted.** The probe log bears it out. Cap 267: `fits true, region 242, capped 250`. Cap 266: `fits false, region 242, capped 250, flips 3`. The region is the same 242 at both caps because the padding is 12.5 px at one and 12 px at the other, so with the inset in place at 266 the run's client box is 249, and RU-54's step 2 lands on port 250, span 250, flag off, the row s2 fails. RU-54 now: does not list s2 as cured; reads `s2chain` at 266 and 268 with the inset forced on first; and if the box reads 249, reads the run once more with the inset removed and keeps the inset when nothing is hidden, which is master's state and satisfies s2 as written. RU-30 is narrowed to match. The restated s2 is the fallback and needs the orchestrator's line.

## Every objection

| id | ruling | severity | disposition | what changed in RULINGS-6, or why not |
|---|---|---|---|---|
| R-1 | RU-56 | major | accepted | The 1.3:1 floor is withdrawn. The mark reads no weaker than each engine's own v11.0.2 reading on the same cell. The 1.1:1 hover floor is withdrawn; the hovered-beside-current strip is shot at three steps for the owner (question 18), and the gate reads 1.2 until he picks |
| R-2 | RU-57 | major | accepted | G-15 excludes rungs and no longer picks. Each row of the ladder strip carries its plate-against-field reading in both schemes and both postures. The default is the first rung GREEN on ink and firmer than v11.0.2's plate by that reading. The "one veil step firmer" claim carries its reading or is not said |
| R-3 | RU-60 | major | accepted | The lift activates the seat. One listener, on the run. The README says the page's heading names the page. The ship gate is withdrawn unless question 13 makes it one |
| R-4 | RU-61 | major | accepted | The anchor inferred from slots is out of 11.2.0 and waits for 12.0.0 or a yes to question 15. A strip of the open plate over atlas's legend is added and is the owner's to see before RU-61 joins the pass |
| R-5 | RU-63 | major | accepted | Two name counts are reported (all public names; names a site is expected to use). Lines are stated against v11.0.2 too: 391 over. Each added name is cited or goes: `collapse`, `pinned`, `update:pinned` go unless a site line is cited; `within` is cited (atlas, fourier); `controlCount` is cited (`ControlsDock.vue:55`, `:61`); `data-dock-glyph` is cited to Home Assistant's `ha-icon`, not daraksha |
| R-6 | RU-58 | minor | accepted | The census line reads the share token, not 0.9. The question-17 strip gains a third row at the word-derived size. No mixed-dock rule until the owner picks |
| R-7 | RU-63, RU-64 | minor | accepted | The development warning for crowded persistent seats is struck. The ready list names what each added clause replaces (none do; three things are removed) |
| C6-M1 | RU-54 | blocking | accepted | See above |
| C6-M2 | RU-57 | major | accepted in part | Taken: the control row (today's veil, full ink), every rung read since the ladder is not monotone, the owner picks from the strip, readings at 390 and on daraksha's ground. Not taken as written: a plate clause in G-15 with a floor and ceiling now. The two numbers on record (1.04 and 1.70) are my pixel readings of one strip, and the owner has judged neither as a bound; they are used as exclusions for the default, and a bound is written after he picks. R-2 asked for no new gate, and this agrees with it |
| C6-M3 | RU-56 | major | accepted | Merged with R-1. The unbounded third clause is struck. The plant is read again at the level RU-57 takes, both engines and schemes; if the baked plates do not bite there, the plant is hover and current set to one value |
| C6-M4 | RU-63 | major | accepted | Recounted by SURFACE.md's method on both sides. The draft's 14 additions were 13 listed, and 18 with the five slots (`ControlsDock.vue:83-86`, `DockOutlet.vue:39-40`). Removals without types: 16, so the draft was 2 up. After the fold: 15 added, 18 removed with `DockControl`'s three unused props brought forward: 3 down. The bound is restated to "fewer names than v11.1.0, by the published table", with the reason. The build seat publishes the table before the removals commit |
| C6-M5 | RU-52 | major | accepted | One reading first: `scrollLeft` at `focus`, `focusin` and after `reach`, `reach` stubbed, both engines. The second form is struck. The reserve tests RU-52 restates are listed before the cure (`e4`, `release-10-1-5.spec.ts:723`, is one) and `run.css:369`'s text is rewritten |
| C6-M6 | RU-55 | major | accepted | The pinned fixture stays and k3 gains a cell with unsized glyphs at a viewport that caps the 310 px dock. 21 against 24 px goes to the owner in question 17's strip |
| C6-M7 | RU-61 | major | accepted | The gate reads the px of neighbour under the open plate and whether a focusable element is covered, printed in the strip. A covered control is the owner's question |
| C6-M8 | RU-54 | major | accepted | The key's third number is the root's extent together with the other regions' border boxes, which RU-53's cure already stores. New cell: a capped dock whose `#persistent` seat changes width, with a plant |
| C6-M9 | RU-63 | minor | accepted | v11.0.2 is the one baseline all three numbers are reported against. `useDockBody.ts`'s own count (1,378) and the lines added outside the dock directory are reported beside the total. The 10,880 bound stays and is stated as 391 over v11.0.2; 12.0.0's bound is 10,489 |
| C6-M10 | RU-53 | minor | accepted in part | Taken: the engine-only exit needs the orchestrator's or owner's line; finding 2 is a hypothesis until `dock:rect` is read, and the 27 and 11 are not quoted before that. Not taken: a gated bound on summed layout time. The time is recorded beside the count; no reading exists to set a bound from, and G-2's step bounds already read a slow frame's effect on the motion (RU-48's reason for not adopting a like gate) |
| C6-M11 | RU-60 | minor | accepted | The plant is the hold timer removed. The real-Safari reading is a clause of the gate |
| C-1 | RU-63 | major | accepted | `graspHeld` stays through 11.2.0 and goes in 12.0.0. Checked: keyframes `origin/master`, `dock-context-slot-resolution.test.ts:120`, `:125`. Step 2 of the order greps every app's tests for every removed name first |
| C-2 | RU-63 | major | accepted | The removal stays, with its conditions written into the REMOVES list: it lands after `bl/demo` or edits the three master stories; the 11.0.2 hover harness and `blob-pause-seam` are restated with reasons; the two a11y tests go with it; the Blob and Aurora READMEs say what a site wires to `pause()`. Checked on master. Deprecating instead was not chosen: no app uses it, and question 12 puts the choice to the owner with the pause control named |
| C-3 | RU-61 | major | accepted | The inference is out of 11.2.0 (with R-4), and the seven docks it would move are named for 12.0.0. An explicit anchor outranks a persistent seat, and atlas is told the two fixes for `PlateDock`. "In the flow" is the root's own computed position, with the fixed-wrapper case stated as a hypothesis. Cells added: atlas's `PlateDock` persistent seat, daraksha's Motion page, keyframes's transport both ways. `anchor="center"` is written down as the opt-out for the day the default changes |
| C-4 | RU-60, RU-63 | major | accepted | Checked: glass's tooltip source has no touch or pointer-type branch. The REMOVES row is struck. The build is new Tooltip behaviour and the build seat first reads why a touch shows no name. Placement: a name never covers another control; no free side, no name. The ADDS row says `dockTip.ts` stays |
| C-5 | RU-55, RU-63 | major | accepted | The tab seat's glyph rule takes the same four forms as the icon seat's, and G-13's census reads a tab seat holding a picture. LF-3 and daraksha-2x's tab-glyph row are marked open until built. The sites whose tab glyphs shrink are listed beside question 17. Checked: `tab-button.css:158` is `> svg` only |
| C-6 | RU-57 | major | accepted | Level 1 is preferred for this reason too. If a lower rung is taken, the strip carries a wash-tier dock beside a default one, and gregg, speedtest and slides are told the number before the tag |
| C-7 | RU-56 | minor | accepted | The new fills are declared on `.glass-dock`; the `:root` lines stay for a loose `DockControl`. One loose cell joins G-15's clause. value.js, gregg and speedtest are told their fills now follow their ink |
| C-8 | RU-63 | minor | accepted | The sentence is in the ADDS row: the sites' three trigger tokens outrank the new default, and fourier's line becomes deletable |
| C-9 | RU-63 | minor | accepted | A paragraph under WAITS names who is told what, and step 10 of the order sends the messages at booking and before the tag |
| C-10 | RU-63, RU-56 | minor | accepted | O-364 (3) is cited in the gregg line with RU-1 as its answer. O-367a is cited and closed under RU-56 |

## What the fold decided that no challenge asked for

- **Which way the s2 band goes.** C6-M1 asked for a written choice after the reading. The fold writes the default now: the inset stays through the band, because that leaves a shipped test alone. It is a hypothesis until `s2chain` reads the box.
- **Three props of `DockControl` come forward.** `type`, `as` and `asChild` have no user in SURFACE.md. Without them the names budget nets zero. They are removed only if the grep of every app's tests finds no use.
- **1.2 as the hover step until the owner picks.** It is WebKit's shipped mark reading from finding 3, the weakest separation that ships today as a mark.

## What is still not known

- Whether the client box at cap 266 reads 249 with the inset on. The arithmetic says so; no run has.
- Whether the inset moves a persistent region's border box. If it does, the amended key for RU-54 loops as the old one did.
- Whether level 1 with full ink reads firmer than today's plate. The challengers' eyes say barely.
- Whether a root in flow inside a fixed wrapper is harmed by the margin.
- The name counts. Mine are from the prototype's source and SURFACE.md; the build seat's published table is the record.

## Second round: the completeness check

2026-11-16. Seat: fold, second round. Model: claude-fable-5-2. I read `RULINGS-6.md` and this file in full, `INPUT-daraksha-2x-2026-11-15.md`, and on the worktree at `a68cd272c` the two glyph rules (`tab-button.css:158-162`, `icon-button.css:249`). No browser, no build, no source change, nothing staged.

| item | ruling | disposition | what changed in RULINGS-6 |
|---|---|---|---|
| (5) INPUT-daraksha-2x row 2 carried two dispositions: "built" on the triage line, "open" in RU-55's C-5 amendment. This file's C-5 row claimed the mark had been made; it had been made on LF-3 only | RU-65 (new), RU-55, RU-63's triage line | accepted | The triage line now reads: rows 1 and 4 built; row 2 built for a direct `svg` only and open for a picture or a marked child until the tab seat's rule takes all four forms. RU-65 states the disposition, when the row closes (the four-form rule built and G-13's census reading a tab seat with a picture), the plant (the rule cut back to `> svg`), and that an *Amended* paragraph outranks the triage line wherever each sits |

The C-5 row above is now true as written. The final order and the final ready list are unchanged: step 4 and G-13's second census line already carry the work. No owner question is added.
