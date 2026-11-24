# BM tranche: the draft

Drafted by pass 10 (claude-opus-5-5, 2026-11-24) for the formation that follows the final fold (RULING-2026-11-23, "Order of work"). Amended by the final fold for pass 10's two critiques (`pass-10/fold.md`); an amended line carries its objection's id. It follows the tranche format: `BM.md`, `PROGRESS.md`, `FINAL.md`, `waves/`, with hard gates on runtime evidence. It is a draft. The formation sets the letter, places the files, and challenges it.

The design it builds is DESIGN.md as rewritten in pass 10 and amended by the final fold. Every wave cites the section it builds, the sketch it starts from, and the bytes it moves (`pass-10/ledger/ledger.json`). Every byte figure is a standalone upper bound, so each net is indicative until G-4 reads the site's build (B10-11). What is still open is in `study/OPEN.md`, and none of it holds a wave.

## Releases

- **11.2.0 is BL's release.** BM adds two rows to it, each a value or a glyph on parts BL is already building: the toggle (O-428) and the plate's strengths (choice 5).
- **11.3.0** carries BM's new parts and changed defaults. Nothing a site calls is removed.
- **12.0.0** carries the removals and the changes a consumer can see in its API or its boxes: sheets as native scroll, the goo, the fold's window, and the deleted composables.

The release rule is BL's (`audit/triage-1119/PLACED.md:28`, G1): a changed default look goes in a minor, and a removal goes in a major.

## Gates

Seven hard gates. Each is durable: an invariant of the shipped library read at runtime, not a figure from one fixture. Gates-abrogation applies, so a wave proves itself by its strip and its page, and these seven only keep the invariants from coming back.

| Gate | The invariant | Read by | Waves |
|---|---|---|---|
| G-1 | No `--spring-*` token is a `linear()`. Each is a `cubic-bezier()` within 2.65 % of its row (panel within 3.67 %), and none but panel passes its target | the token sheet, parsed, and the curve evaluated against `SPRING_PRESETS` | BM-3 |
| G-2 | A part's animated properties are `translate`, `scale`, `rotate` and `opacity`. The named exceptions are effects of 200 ms or less (the slider ground's clip, the toggle's SVG children and its colour, a hover's colour) and two orders: the menu's grow, a clip over bloom's 370 ms (O-171; B10-9), and the dock's fusion layer (choice 24 C) | `document.getAnimations()` over each part's states in Chromium and Playwright WebKit, named exceptions listed in the gate | every wave that moves anything |
| G-3 | No change runs more than two animations on one control, counted under choice 19 B's three rules as ratified. A hover runs one movement. The named counts over two: the fold (3) and an open with the theme seat's split (5), as choice 19 B's own cost line gives them; a dialog's open and leave (3 each, as today); the toggle's tap (3, O-428); a slider with a knob and a readout (3 on a press, O-426) (A10-2, A10-7) | the same run, per state | every wave that moves anything |
| G-4 | Each site's entry stays within its bound. Home Assistant's entry stays within its 0.2 kB margin and every script within 0.8 kB; daraksha's reader route within 126 KB of eager script; gaggle's first load within its 11,282 B (B10-11) | the sites' built bundles, read once per release candidate | the release waves (BM-R1, BM-R2) |
| G-5 | Under Reduce Motion nothing changes in one frame: every property a state change moves has a running transition or animation of 100 ms or more | the G-2 run with reduced motion emulated | every wave that moves anything |
| G-6 | The 12.0.0 dock samples nothing: `--dock-surface-blur` is the zero rung, and the dock's computed `backdrop-filter` is `none` | the built dock in both engines | BM-12 (the goo ships only if it holds) |
| G-7 | The goo's close adds no frame gap over 16.7 ms: with Busy page on, a close with the filter shows no gap that the same close without it does not. It reads the ruling's "within Safari's limits" as law 7 at 60 Hz (B10-8) | rAF frame gaps over a close in Playwright WebKit, under `guarded --exclusive webkit`; an indication, which Safari's Web Inspector on an iPhone amends | BM-12 (a failing read stops it and brings σ and the layer's region to the owner) |

## Waves

### BM-0 · The precepts (docs; before every wave)

Apply `pass-10/precepts.md` on the owner's ratification of the study (O-426). In motion-canon: P3's exit clause, P0a rule 6, P5, P6, P7 and law 7's line. In restraint: `:130`, scoped to a keyed choice, and the ceiling. Then affordance-map's four rows and tabs-seam arm (e)'s added assertion. P0a's exit curve is not amended (A10-3).
**Gate:** none. It is text, read by the critics.

### 11.2.0 (BL's release)

#### BM-1 · The toggle (O-428; DESIGN §9)

The glyph from `pass-10/toggle/sketch/`, as amended by the final fold: a warm sun whose rays draw in under its disc, and a cool night that slides across to carve the crescent.

- **The night** is filled black inside the glyph's mask, and the mask keeps its own colours under forced colours, so it carves (A10-1, B10-1).
- **One clock.** The rays, the night and the colour ride one 200 ms clock, the night 50 ms behind going dark. The colour tweens; nothing changes colour between two frames (A10-2).
- **The button** becomes a `.plate` that answers hover and focus as a fill alone. Its glyph is its on-mark and its press's answer, so the plate takes no on fill from `aria-pressed`, no press tone and no shrink. That is one attribute the plate reads, BL's W-B.17 row (A10-2).
- **The count.** A tap runs three legs, named in G-3. Under Reduce Motion the rays and the night crossfade on the same 200 ms clock, and the colour still tweens (B10-4).
- **`--toggle-tone`**, set on an ancestor, replaces both colours (A10-9).

BL's 11.1.2 toggle fixes (press stall, reduced-motion cuts, the 0.2 s fade of the words) stand.

**Proof** (P10-toggle's B, repaired first), in Chromium and Playwright WebKit:

- the crescent read by pixels in light and dark, and under forced colours in a light-text and a dark-text theme;
- a tap's three legs and a hover's one, and no on fill in dark;
- the glyph's contrast in each theme, 3:1 or more against the page and the plate.

**Bytes:** +226 B in the toggle's own chunk (`pass-10/toggle/toggle.json`, re-priced). `useLiquidPress` leaves the component.
**Removes:** the toggle's own hover, focus and press rules (W-B.17's plate takes them).

#### BM-2 · The plate's strengths (choice 5, recommended; DESIGN §6.2)

W-B.17's plate in the control's own tone (`--plate-tone`), at the dock's measured ladder, on two rungs: hover 6.5 % in light and 5 % in dark, and on (current, open, pressed) 10 %. A tinted seat's plate takes its tone, and its glyph keeps its colour. No third rung and no drawn shape (A10-4, B10-13).
**Proof** (P10-plate's C, repaired first), in light and dark:

- each strength drawn by `opacity` over one fill, with no colour leg;
- a hover runs two legs at most;
- a tinted seat keeps its own colour on the plate.

**Bytes:** two token values and a dark value, with no new rule. If they are `--fill-hover` and `--fill-selected`, their six other readers (Button, Card, Configurator, SortableList, Timeline, the control bit) move with them, and the strip shows each.

### 11.3.0

#### BM-3 · Springs on curves Safari's compositor takes (choice 4 B; DESIGN §4.2)

The six single-curve tokens replace the `linear()` tokens (rule 1). keyframes.js's sampler and the `playSpring` player carry every settle with a speed (rule 2), loaded on intent where a site is at its cap. The player waits on keyframes.js's sampler export (`study/OPEN.md`). `--ease-cartoon-punch`'s comment is corrected; its overshoot on controls is open (DESIGN §14.1). That WebKit's compositor takes these curves is read from its source and release notes, not from an iPhone.
**Gates:** G-1, G-2, G-5.
**Bytes:** CSS −1,487 B at every site; JS +655 B, on intent.

#### BM-4 · The one selection mark (choices 15 A to 21 A; DESIGN §8.1)

One writer for SegmentedTabs, a dock run, the switcher and the switch's thumb. A plain capsule moved by `translate`, with equal options and no lift or stretch. Keys fade it across.

Under forced colours and more contrast its sign is drawn on the mark, and both arms of `accessibility.css` narrow to `:not(.selection-option)`. Today's 2 px border moves a strip's boxes by 8 px in both modes, and an unlayered override cannot reach it, because it is a layered `!important` (`pass-6/fold/forced-colors.json`). The wave ships with `useDockRunMark`'s deletion.

**Gates:** G-2, G-3, G-5, and tabs-seam arm (e) as amended. No option's box moves when the choice moves, in plain, forced-colours and more-contrast modes, under the keyboard and Reduce Motion (A10-12).
**Bytes:** CSS +585 −494; JS +914 −1,349. `useSelectionIndicator`'s −534 B is credited only when the wave shows it leaving each entry's import graph. SegmentedTabs and ToggleGroup reach it through `useSelectionGroup` (B10-11).

#### BM-5 · The slider while held: C (choice 23; DESIGN §8.3)

`pass-10/slider/sketch/slider-expand-c.css`, as amended by the final fold, replaces W-B.18's expanded-view section.

- **The ground.** The slider's own ground grows out of the band by one clip: g/2 after a 120 ms mouse dwell, g on a press or Tab. It grows and returns on one 200 ms clock (A10-6, B10-4). It takes no pointer in any state (B10-6).
- **The fill** keeps its size.
- **The knob.** A thumbless slider never draws one. Where a site asks for a knob, it grows by `scale`.
- **The readout** enters from 0.9 and leaves by fading.
- **The focus ring** is the track's outline at g, and it shows only on Tab (A10-5).
- **The count.** A slider with a knob and a readout runs three legs on a press, named in G-3 (A10-7).

It is on by default, with `:expand="false"` to opt out, and it lands on BL's O-408 thumbless build.

**Gates and proof:**

- G-2 (the ground's clip is the named effect), G-3 and G-5.
- The real sheet, re-run with `property-regs.css` and the token partials loaded (A10-11), shows the ground tweening in and out, and the ground containing the band on every frame.
- A site's colour ground grows in that colour.
- The ring stands at g with no jump as Tab leaves.
- A tap within g of the root reaches a neighbour.

**Bytes:** +43 B over BL's sheet (re-priced), which in the same release drops 776 B of sheet and 1,525 B of script.

#### BM-6 · Presentations (choices 10 C, 11 B, 12 B, 14 B; DESIGN §5.2, §6.3 to §6.5)

- Presence waits on the content's own finite legs only. The presence hold goes, and Dialog and the side Sheet stop calling `useSpringMount`.
- Every exit is a 120 ms fade on `--exit-curve`, today's `--ease-out` (A10-3).
- A menu grows from its button by today's clip on `bloom`, the owner's O-171, named in G-2 with its 370 ms (B10-9).
- A panel born from a seat on a plate is placed by a side offset.
- The held fill waits for the panel to land, and ContextMenu's grow starts from a seed.
- The touch slide across a short menu is loaded on a menu's first touch, in a chunk of at most 377 B (A10-10).
- Under a dialog the veil is the one blur.

**Gates:** G-2, G-3, G-5. A busy ring inside a Dialog does not hold the page `aria-hidden` (pass 9's `presentWithSpinner`, both engines). One menu and one dialog under the keyboard, forced colours, more contrast and Reduce Motion (A10-12). The touch slide's chunk is measured.
**Bytes:** an entry with a Dialog or side Sheet −221 B, and one with menus only +458 B. The touch slide adds at most 377 B on intent. gaggle carries these rows (B10-11).

#### BM-7 · The rim's window (choice 26 B; DESIGN §4.3)

The ScrollProgressRim reveals its stroke by a translated window. A rim fed by the scroll rides a scroll timeline.
**Gates:** G-2, G-5.
**Bytes:** CSS +273 −319.

#### BM-8 · The capsule window in 11.x (DESIGN §3), conditional

The window ships in 11.3.0 only where P4-bud's F, with Frost on, shows no square patch and keeps G's frost on an iPhone. Otherwise it waits for BM-11. The window takes `pointer-events: none` and its `::before` takes `auto`.

With that cure, the neighbour, the gap and the far corner hit nothing, in Chromium and Playwright WebKit. The window's rounded end does not bound the hit, so the two square corners outside the disc's round on the clipped side take it: about 290 px² at 52 px. That corner is accepted. A static `clip-path` on the window would make it a backdrop root and stop the blur (B10-7).

**Proof:** `window-hit.mjs` with critic B's two added points, (300, 126) and (250, 102), in both engines, then Safari.

#### BM-R1 · 11.3.0's release candidate

**Gate:** G-4 on every site's built entry, and on Home Assistant's every script, closing the ledger per entry.

### 12.0.0

#### BM-9 · The removals

- `useSpringMount`, `useSelectionIndicator` (export), `useTabDragMorph`, `useDockCtaReceive`, `useLiquidReveal` and `cta-seat.css` go.
- FadingScroll takes its fixed ramps, and its fallback script goes.
- scroll-chrome becomes a state.
- The run's caps go if BL and the owner rule so.

**Gate:** each removal's census is re-run at the sites' refs of the day. Nothing a site imports is removed without its message (DESIGN §17).

#### BM-10 · Sheets as native scroll (choice 13 B; DESIGN §6.4)

The detent engine becomes a snap scroller with 1 px rungs, committing on `scrollend`. Its scroller takes no pointer. A desktop sheet draws no grip. The shear stays a token at 0.

It ships with one fault stated (B10-12). Before Safari 27.3, and in Home Assistant's WKWebView until iOS ships 27.3's engine, a sheet flicked past its last detent can be slow to settle, and `v-model:detent` waits for it. An iPhone reading on iOS 26 or 27.2 amends it.

**Proof:** pass 9's sheet check, in both engines, inside reka's Dialog on `bm/study`, with its focus trap and scroll lock.
**Bytes:** CSS +246; JS +977 −1,546.

#### BM-11 · The fold (choice 25 B; DESIGN §7.1)

The plate is the capsule window. The glass's edge cuts each seat, and only the first trades with the folded sign. wi8's per-frame plate path goes.
**Gates:** G-2, G-3 (the fold is 3, named), G-5. The window's six hit points as in BM-8. The fold under the keyboard, forced colours and Reduce Motion (A10-12).
**Bytes:** CSS +393; JS −1,356.

#### BM-12 · The goo (choice 24 C; DESIGN §7.4)

`pass-10/goo/goo.next.css`: the fusion layer and the seat's plate, the filter from the first moving frame of a close through the folded rest, off at a 6 px gap on an open, and one filtered region per document. There is no second path.

On the three docks that mount it, every close runs on the page's thread while the filter is on, by the owner's order (B10-8).

**Gates:** G-6, before anything else; if it fails, the goo does not ship. G-7, the close's cost; if it fails, the wave stops and σ and the layer's region go to the owner. The goo is also read under the keyboard, forced colours and Reduce Motion.
**Fact checks** (DESIGN §15.2; they amend, never block): the paint cost per frame on a phone, in Low Power Mode, under a scroll with the dock folded, and in Home Assistant's app; and WebKit's layers under the filter.
**Bytes:** +468 B in the dock's split module, which only a dock with a seat beside it imports: eager at value.js, daraksha and Home Assistant (A10-10). daraksha deletes up to 2,024 B of its own.

#### BM-R2 · 12.0.0's release candidate

**Gate:** G-4.

## Rows that are BL's, sent with this draft

- W-B.18 R-10 and R-11: C replaces the disc rules and the card shell. O-408's build names the thumbless attribute, which C reads.
- W-B.17: the plate's two rungs at C's strengths. One attribute the plate reads, which keeps a control whose glyph is its on-mark at its hover and focus answers: no on fill from `aria-pressed`, no press tone and no shrink (A10-2).
- The Carousel's reduced press is the dip, 100 ms out and 100 ms in (choice 8 A; pass 9's fold, A9-11).
- W-R.1: the dock's zero rung written as `backdrop-filter: none` (G-6), and the veil's register in 12.0.0.
- `accessibility.css`: both arms narrowed in BM-4, in the same release as the mark.
