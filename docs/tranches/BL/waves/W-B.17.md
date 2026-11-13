# W-B.17: intent-first motion (the plate, the glyph, presence)

The source is INBOUND O-278, the owner on 2026-11-12, twice, verbatim (`../design/intent-motion/BRIEF.md` holds both in full):

> "items that grow smoothly from BEGINNING TO END with START AND STOP animations in and out--this is critical. Growing instantly in height or other states is not acceptable ever--all items should be tweened. ... items should have weight, momentum, and breath. Large elements and focused items should have interactivity states, idle states, and communicate progress, loading, and intent with transitions."

> "NO overuse of shading, transition, or markup--this is an AI smell. Have touch like apple."

The two bind equally. The wave also carries the hover half of O-279 (the theme toggle), the press question behind O-284 and O-285, O-286, the consumer asks in the brief (atlas: the check runnable on its own pages, and the reduced-motion fade from glass; value.js: an icon piece that drops onto any icon with one import and no wrapper; keyframes: arrows that nudge, curves that draw, a glyph that changes on a pick), and the census (`../design/intent-motion/CENSUS.md`).

**How this text was made.** The spec seat wrote it from the records. The prototype seat built every piece in a scratch worktree and measured it (`../design/intent-motion/PROTOTYPE.md`). The challenger measured again and returned twenty-one findings (`../design/intent-motion/challenge.md`). The fold seat (claude-fable-5-2, 2026-11-12) took each finding's cure into the prototype, read it again in both engines, and rewrote this text to what the readings support (`../design/intent-motion/fold.md`, with the diff as `fold/amendments.patch`). Citations follow the study: **G**, **A** and **R** are the Google, Apple and references records under `../design/intent-motion/record/`; PROTOTYPE, challenge (its findings are **C-1** to **C-21**) and fold are the three files above.

Four limits bind every number.

- Shipping Safari is unmeasured. Every WebKit reading is Playwright's WebKit build; version floors are the documented ones.
- WebKit has no layout, style or paint counter. Cost is read in Chromium by trace at 4x CPU; in WebKit only frame pacing is read.
- The pieces were measured on a harness, not on the census rows. The one real component read is `LabeledField`, twelve of them on a `glass-floating` surface.
- The fold's cost traces were taken on a busy machine (a load of 36 to 52 for its first runs, 15 to 22 for its last). Its layout times are read as upper readings, and nothing held behind them is released by them.

Release, for `INDEX.md`'s column: **it splits three ways.**

- **11.2.0:** the plate's hover, focus and on states at the strength the owner picks, the glyph's four verbs, presence, the focus ring, the authorized fades and the no-snap check.
- **Held, 11.2.0 or later, each behind one reading:** follow, the line that gives its room back, and the swap whose seat follows. They are the only pieces that tween a size, and today's reading is over budget (the section "Held behind a reading").
- **12.0.0, in W-R.1's run:** the plate in the seat the gleam leaves, the press with its one writer, the busy Button, and the deletions.

## The law as five cases

A surface changes in five ways, and each has one answer.

| # | What changes | The answer | Piece |
|---|---|---|---|
| 1 | a property on a node that stays | a CSS transition on the shared clocks | the plate, the glyph, the press, the focus ring, a node that stays |
| 2 | a node arrives | it fades in with one small travel | presence |
| 3 | a node leaves | it is held until its fade ends | presence |
| 4 | a node is replaced in its seat | two marks of one size both stay and trade places, never both above half strength; content of two sizes goes out, then in, and its seat follows | presence |
| 5 | a box's size changes with its content | the size is tweened between two measured values | follow |

Case 1 is the strongest answer and the others borrow from it wherever they can. A CSS transition on a node that stays turns round from the value on screen; a node Vue removes cannot (C-2, C-3). So anything that can reverse inside 120 ms (a line driven by hover, validation that runs on each keystroke, a toggle) is a node that stays, never `<Presence>`.

No piece runs a frame loop. Every leg is a CSS transition or one Web Animation, so the no-snap check can pause and seek each one.

## Rulings

- **R-1: the plate is a flat fill on the control's own `::before`, growing by `scale` with `opacity`.**
  - That is what Google ships (a pseudo-element or node that is always there, on two compositor properties: G C1, G C3, G M4) with the leave Google lacks (G §6: every Chat icon cuts on the way out).
  - One fill at one strength, with `opacity` carrying every lighter state, so no colour ever transitions.
  - No `clip-path` transition: it is paint in at least one engine, and hover is the most frequent change in the library.
  - Both legs ride `--ease-out`: the fade over `--duration-control`, the growth over `--spring-present-duration`. The spring token is a `linear()` list; whether WebKit hands a `linear()` leg to its compositor is unread anywhere, and the curve does not overshoot, so on a 2.7 px travel it was an ease-out by another name (C-18). A hover plate's 3 px is an effect.
  - **Its strength is the owner's pick and has no default** (R-4).
- **R-2: the plate grows only on a control about as wide as it is tall.** `--plate-from` is 0.8 by default (G C1) and 1 on a row, a tab, a text button or a card, where the hover is the fill alone (G K1, R F2; the HIG: "For an element that has little space around it, consider using a hover effect that includes tint, but not scale and shadow", A §6). In the records a hover never moves an edge more than 4 px.
- **R-3: one hover, one motion.** The plate grows and the glyph is still; or the glyph carries a verb and the plate is a fill. Never both, and never a third leg.
  - A glyph with no verb does not move. The first form grew every `svg` in a `.plate` by half a pixel a side; its own strips show no difference between the first frame and the last, and it was the leg Chromium ticked on its main thread (C-13, C-17). It is struck.
  - A hover therefore runs two animations, not three: the plate's fade with the plate's growth, or the plate's fade with the glyph's verb.
- **R-4: the plate's strength and shape are put to the owner with one image, and silence does not choose.**
  - What he named was three things at once: a coloured plate, a shape, and a glyph that takes the plate's colour. As first written the plate kept none of them: it reads 12 of 255 from its host where his frame reads 51, with the seat's own tone set (C-12; fold reads 12 again).
  - The image is `../design/intent-motion/fold/strips/plate-vs-owner-chromium.png`: his frame; **a**, the plate as built; **b**, the plate at the full strength in the seat's tone with the glyph's `color` tweened to that tone (28 of 255); **c**, b with a shape.
  - A shape, if he picks one, is not markup: a static `clip-path` on the pseudo-element from one custom property, never animated, with `scale` and `opacity` still the only legs. No path per destination ships in glass; a consumer sets its own. Its paint cost is unread.
  - Whatever he picks, G-BARE holds it: a state the gate cannot see cannot ship.
  - The plate's sites in 11.2.0 wait on this answer. Nothing else does.
- **R-5: the selection that travels between members is not rebuilt here.** `useSelectionIndicator` stays the one traveller. The dock's highlight is W-I.8's.
- **R-6: the glyph is one attribute with four values, and one `transform`.**
  - `data-glyph="grow"`, `"nudge"`, `"turn"` or `"draw"`, one spelling each. No bare form and no default on an `svg` in a `.plate`. Any other value does nothing, so the harness's `none` is not needed: a glyph with no attribute is still (C-15).
  - The contract is two inherited numbers, `--intent` and `--intent-set`, set on a `.plate` and on a control that holds a glyph, and on no other element of a consumer's page (C-15).
  - **A control that holds a hovered control stands down.** `:hover` holds on every ancestor of the pointer, so resetting the numbers on the inner control never stopped the outer one (PROTOTYPE, G-NEST; C-4). The hover rule excludes `:has(:is(.plate, button, a[href], [role="button"]):hover)`. Read in both engines: over the inner control only the inner one answers; over the trigger elsewhere only the trigger does.
  - The glyph computes one `transform`, turn outermost, then travel, then growth, on one transition leg. Three individual properties cost Chromium a style recalculation every frame, and `translate` applied outside `rotate` nudged a flipped chevron against the way it points (C-10, C-17). Read after: a hover is 14 to 15 recalculations where it was 25, and an open chevron moves 1.236 px up, the way it points.
  - Grow is a named verb at 0.13, which paints 1.08 at the default weight: the amount the dialog's close plate has today. At 0.08 it could not be seen (OQ-4, closed).
  - Draw: one dash as long as the path and a gap that passes along it once, so the curve is whole at both ends and no second path is added. The gap is 0.12 of the path by default (`--glyph-gap`); at 0.3 the curve read as broken (C-9). The offset is the sum of the two numbers, so a click that opens the trigger draws once more with the pointer already on it. The way back keeps its leg: without it a leave at 60 ms lands 0.4 of the path in one frame (fold).
  - A glyph does not move on keyboard focus (`restraint.md`: "no motion on keyboard-triggered actions"). The plate answers focus by its fade.
  - Fill and weight are not verbs: most Lucide glyphs are open strokes, and `stroke-width` is paint with no record behind it.
- **R-7: presence is four forms, and the node that stays is the first choice.**
  - **A node that stays** (`data-presence`, `data-absent`): absent by `opacity` and `visibility` with its seat reserved. No script; it turns round from the value on screen.
  - **A pair in one seat** (`data-presence="swap"` on both, stacked in a grid seat): Play and Pause, the checkbox's Minus and Check, the expand pair, the sort glyph. The arriving mark waits a quarter of the exit clock. The first form, out then in, left the seat empty for 50 to 75 ms, took 320 ms and could not turn round (PROTOTYPE item 4; C-7). The cost is stated: two nodes at rest where one was gated.
  - **A node Vue removes** (`<Presence>`): for content that cannot come back inside its own leave. Its leave rule holds the travel still in flight until the fade has ended (C-2).
  - **Content of two sizes** (`<Presence swap>`): out, then in, and the seat (the parent) follows from the old size to the new at the hand-over, with no call from the site. The first form measured before the old content had left, so it never ran and the trigger jumped 89 px (PROTOTYPE item 1).
  - `<Presence>` has one prop, `swap`. `reclaim` is struck: a line that Vue removes cannot return while it leaves without eleven fields jumping 9 px (C-3). The line that gives its room back is a node that stays (R-8).
  - The arrival is not `@starting-style`: a node on screen at page load would play its arrival at first paint, the fade-up on every element `restraint.md` bans.
  - Amounts and clocks, from the records: in from 4 px (A G2) or from four fifths for a pair (G C1, G C6), out as a fade alone (G C6) in about six tenths of the time (G C6, R E6, R K2, A G4).
- **R-8: follow is the one piece that animates layout, and it is held behind a reading.**
  - Every source that tweens a box's size pays layout on one contained box: Apple's flyout, 18 layouts in 2 ms (A §1); Emil's panel (R E4). `motion-canon.md` P5 names the case and allows it as a one-shot reclaim on an audited allowlist.
  - The clock grows with the distance (C-8): `--spring-present-duration` up to 40 px, rising in a line to `--duration-slow` at 320 px. One clock for every distance moved a panel's edge 49 px in a frame. P0: "larger surfaces move later and longer".
  - The curve is `--ease-standard`: it leaves rest at no speed and reaches its end exactly. The spring token is cut at its 2 % band, which was a 7.3 px last step on a 288 px travel (C-8).
  - Width is tweened only on a box whose text cannot wrap. On any other box only the block size follows, so lines never re-break mid-tween (C-8).
  - Sent back to where it came from, the running tween is played backward from where it is. Position is continuous. Speed is not: it turns at full speed. A CSS or Web Animation clock cannot carry momentum through a turn, and this text does not claim it does.
  - Follow tweens the box and not what is in it. Rows that leave a followed list fade as nodes of presence, or the box is not a row-4 cure (C-8).
  - **A line that gives its room back** is a node that stays with `data-presence="reclaim"`, and `follow()` on that node tweens its block size (and the one margin that cancels its parent's gap) between the two states. It turns round both ways (R-7).
  - Four rules bound the cost and are the allowlist row's text: one shot per change; the smallest box, never an ancestor; one writer, the only code in this wave that animates a size; and a reading before it ships. A site that fails the reading reserves its footprint and gets no second mechanism.
  - W-R.1 §2.7 ("one height engine for Collapsible and Accordion") must not become a second size writer. This wave offers `follow()` to W-R.1's OQ-11 as a candidate with no wrapper.
- **R-9: reduced motion is cured by authorized fades, not by deleting the fallback.**
  - The fallback (`src/styles/utilities/a11y-overrides.css:46-53`) is a standing ruling: a global reduced-motion rule may suppress motion and may not create a transition. It matches `*`, so it also quiets every consumer's own untokened motion.
  - Each recipe that owns a fade joins the enumerated authorized set with its opacity and colour legs on `--duration-instant`. Travel is dropped because every travel amount multiplies `--motion-weight`, which is 0 under reduced motion (`src/styles/tokens/scheme-motion.css:291`).
  - The law is the one W-I.8 §1.6 and W-B.18 R-11 already state: under reduced motion nothing travels or resizes over frames, and the change is carried by a fade of 144 ms or less. A box that follows its content lands in one frame and its content fades.
- **R-10: declared idle is a resting plate, and no breath ships.**
  - The first form breathed the plate's `opacity` on the Skeleton's clock. It cut on four edges: the attribute dropping, in both engines (PROTOTYPE item 3); the pointer arriving and leaving, in Chromium (C-1); entering busy, in Chromium.
  - The fold built the challenger's first candidate, one added Web Animation that is finished and not removed. Its on and off edges hold in both engines. Under the pointer it cuts both ways in Chromium (0.339 to 0.758 in one frame), which starts no transition on a property an animation holds; in WebKit it cuts as the pointer leaves (0.832 to 0.416). It recalculates style 132 times in 1.1 s. It is struck.
  - What passes is the second candidate: `data-idle` rests the plate at the light strength. It is a state, so its four edges are the plate's own transitions, and nothing runs at rest. Read in both engines: on, off and a press each tween, and the pointer arriving or leaving changes nothing. Apple's default button is a resting fill, not a pulse.
  - Glass sets `data-idle` on nothing. A consumer declares it on the one large or focused element of a view.
  - A breath on a control may return only in a form whose four edges each pass G-TWEEN in both engines by wall clock. That is OQ-8, and it is the owner's to want.
- **R-11: the press is tone and a shrink, held for its clock by one writer. It is a proposal for the owner.**
  - Tone: a pressed plate is at full strength. That is W-R.1 §2.3's press mark, and the two are one rule: the plate reads `:active` and `[data-press]`.
  - The shrink: a uniform `scale` to 0.97 on the control, down and back on the `press` row, no bounce, no inset shadow, no filter, no gleam. No source ships it whole (A §9, R F3, R §7). It is glass's own.
  - **`:active` alone does not make a press.** A click with no hold, which is a trackpad tap, showed no shrink and no tone at all; a 60 ms hold showed under two thirds (C-5). In WebKit a touch shows no `:active` where no touch listener exists (PROTOTYPE, the 390 cells; C-20). One writer cures both: `installPress()` (`src/composables/motion/engage/press.ts`), one passive `pointerdown` listener on the document that stamps `data-press` on the innermost `.plate` under the pointer and lifts it at the later of the release and `--spring-press-settle`.
  - It is W-R.1 §2.3's one writer of `data-press`. A glass component that is a plate calls it once in its setup; a consumer that puts `.plate` on its own markup calls it once at boot. Without it a fine pointer still presses by `:active`, with no floor.
  - **A press on a nested control presses that control alone.** `:active` holds on every ancestor as `:hover` does, and the inner button read 22.58 px, shrunk twice (C-4). The press rule carries the same `:has()` exclusion as the hover.
  - The leg is written `:where(.plate)`, so it never erases a control's own `transition` list (C-6; `src/components/button/styles.css:89-105` records the bite). The other half is then owed: a control with its own list and no `scale` leg in it cuts to 0.97 in one frame (fold). Each 12.0.0 control that declares a `transition` writes the `scale` leg into its own list.
  - The control rests at `scale: 1`, not `none`, so the return does not end by dropping a transform; that drop was one layout (PROTOTYPE failure 7; fold reads 0). The consequence is stated: a `.plate` is the containing block of a fixed-position descendant.
  - Under reduced motion the press is tone alone. As first written it still shrank, in one frame.
  - It is built only after its strip is shown to him (OWNER-READ question 1). If the writer is judged too much script for a press, the honest alternative is tone alone and no shrink.
- **R-12: the focus ring fades.** `outline-color` over `--duration-instant`, in and out, no swell. It is a colour, not a movement.
- **R-13: the no-snap check ships as a consumer's test helper** (atlas's ask), under its own subpath, outside every runtime entry. It judges a leg against its own curve **and** against an absolute bound, because the first clause alone passed `transition: all 20ms` (C-21).
- **R-14: "on" is marked once.** Hover, focus and press are every plate's. The held full-strength fill is for a control with no other on-mark: a toggle (`aria-pressed`, `data-state="on"`), a current link (`aria-current`), and a trigger while its popup is open. A tab under the travelling indicator and a disclosure row beside its turned chevron take no held fill (C-14).
- **R-15: busy has a mark of its own.** A busy plate was the pressed plate dimming to the hover plate and back, and under reduced motion busy and pressed were one picture (C-11). The plate has no busy state. A Button with a leading glyph shows the DotRing in that glyph's seat, as a pair that stays: no width change, and a mark that reads as work when nothing moves. A Button with no glyph keeps its label and takes the ring by OQ-3's second form. Unbuilt; the owner's by strip.

## Scope

### The plate (11.2.0, on the owner's pick of strength)

`src/styles/glass/plate.css`, a central partial beside `reveal.css`. One class, three optional custom properties, one attribute.

| write | meaning |
|---|---|
| `class="plate"` | the control has a hover, focus, pressed and on state from one rule |
| `--plate-tone` | the plate's one colour; default `currentColor`. A consumer with a colour per seat sets it per seat |
| `--plate-from` | the scale the plate grows from; default 0.8, 1 for a fill alone |
| `--plate-edge` | the control's border width, on a bordered control. The plate sits on the border box, so its corner and the border's are concentric (C-16; `fold/strips/border-corner-chromium.png` shows the sliver at `inset: 0`) |
| `data-idle` | the plate rests at the light strength; declared by the consumer, one per view |

`--fill-hover` (0.05) and `--fill-selected` (0.12) exist (`src/styles/tokens/color-radius.css:156-157`) and are the two strengths as built. They are what R-4's image shows as **a**, and they do not ship as the plate's strengths unless he picks them.

```css
@layer components {
    :where(.plate) {
        position: relative;
        isolation: isolate;
    }

    .plate::before {
        content: "";
        position: absolute;
        inset: calc(-1 * var(--plate-edge, 0px));
        z-index: -1;
        border-radius: inherit;
        pointer-events: none;
        /* One flat fill at the "on" strength. Opacity carries every lighter state. */
        background: color-mix(
            in oklab,
            var(--plate-tone, currentColor) calc(var(--fill-selected) * 100%),
            transparent
        );
        opacity: 0;
        scale: calc(1 - (1 - var(--plate-from, 0.8)) * var(--motion-weight, 1));
        transition:
            opacity var(--duration-control) var(--ease-standard),
            scale var(--spring-present-duration) var(--ease-out);
    }

    /* R-3: a glyph with a verb takes the plate as a fill alone. */
    .plate:has([data-glyph="grow"], [data-glyph="nudge"],
               [data-glyph="turn"], [data-glyph="draw"]) {
        --plate-from: 1;
    }

    /* R-10: declared idle rests at the light strength. A state, not a loop. */
    .plate[data-idle]::before {
        opacity: calc(var(--fill-hover) / var(--fill-selected));
        scale: 1;
    }

    @media (hover: hover) {
        .plate:hover:not(:disabled, [aria-disabled="true"],
                :has(:is(.plate, button, a[href], [role="button"]):hover))::before {
            opacity: calc(var(--fill-hover) / var(--fill-selected));
            scale: 1;
        }
    }
    .plate:is(:focus-visible, [data-highlighted])::before {
        opacity: calc(var(--fill-hover) / var(--fill-selected));
        scale: 1;
    }

    /* R-14: held on only where the control has no other on-mark. */
    .plate:is([aria-pressed="true"], [data-state="on"],
              [aria-current]:not([aria-current="false"]),
              :is([aria-haspopup], [role="combobox"]):is([aria-expanded="true"], [data-state="open"]))::before,
    .plate:is(:active, [data-press]):not(:disabled, [aria-disabled="true"],
            :has(:is(.plate, button, a[href], [role="button"]):is(:active, [data-press])))::before {
        opacity: 1;
        scale: 1;
    }
}
```

- In and out are one declaration: fade 0.12 s, growth 0.2 s, from wherever the plate is. The fade lands before the growth ("the fading happens FASTER than the stretching", `restraint.md`). A pointer that leaves mid-travel turns the plate round; nothing restarts. Read clean in both engines by both seats.
- At glass's default `--motion-weight` (0.618, `scheme-motion.css:138`) the plate starts at 0.876, which is 2.7 px a side on a 44 px seat (read).
- Safari, documented floors: individual `scale` 14.1, `:has()` 15.4, `:focus-visible` 15.4, `color-mix()` 16.2. Glass's floor is 17.5 already. No fallback.
- Cost, read: 0 nodes; one pseudo-element; two compositor properties; 0 layouts; no script, listener or observer for hover, focus or on.

### The glyph (11.2.0)

`src/styles/glass/glyph.css`. No component, directive or composable. One attribute on the `svg` (or on a `<g>` or `<path>` inside it), and at most six custom properties.

| write | while its control is hovered | tune |
|---|---|---|
| `data-glyph="grow"` | grows by 0.13 (0.08 at the default weight) | `--glyph-grow` |
| `data-glyph="nudge"` | moves 2 px the way it points, flipped or not | `--glyph-dx`, `--glyph-dy` |
| `data-glyph="turn"` | turns 15 degrees | `--glyph-turn` |
| `data-glyph="draw"`, with `pathLength="1"` on the stroke | a gap passes along the curve once, and once more when the control opens | `--glyph-gap` |

On any verb, `--glyph-flip` turns the glyph by that angle while its control is on or open (a chevron: `--glyph-flip: 0.5turn`). A glyph that changes to another is a pair (R-7), not a verb.

```css
@layer components {
    :where(.plate,
           :is(button, a[href], summary, [role="button"], [role="tab"], [role="option"],
               [role="menuitem"], [role="menuitemcheckbox"], [role="menuitemradio"]):has([data-glyph])) {
        --intent: 0;      /* 1 while a pointer is over this control and no control inside it */
        --intent-set: 0;  /* 1 while this control is on, open or current */

        @media (hover: hover) {
            &:hover:not(:disabled, [aria-disabled="true"],
                    :has(:is(.plate, button, a[href], [role="button"]):hover)) { --intent: 1; }
        }
        &:is([aria-pressed="true"], [aria-expanded="true"], [aria-checked="true"],
             [aria-current]:not([aria-current="false"]),
             [data-state="open"], [data-state="on"], [data-state="active"],
             [data-state="checked"]) { --intent-set: 1; }
    }

    :where([data-glyph]) {
        --glyph-g: 0;
        --glyph-x: 0px;
        --glyph-y: 0px;
        --glyph-r: 0deg;
        transform-box: fill-box;
        transform-origin: center;
        transform:
            rotate(calc(var(--glyph-flip, 0deg) * var(--intent-set, 0)
                        + var(--glyph-r) * var(--motion-weight, 1) * var(--intent, 0)))
            translate(calc(var(--glyph-x) * var(--motion-weight, 1) * var(--intent, 0)),
                      calc(var(--glyph-y) * var(--motion-weight, 1) * var(--intent, 0)))
            scale(calc(1 + var(--glyph-g) * var(--motion-weight, 1) * var(--intent, 0)));
        transition: transform var(--spring-present-duration) var(--ease-out);
    }
    :where([data-glyph="grow"]) { --glyph-g: var(--glyph-grow, 0.13); }
    :where([data-glyph="nudge"]) {
        --glyph-x: var(--glyph-dx, 2px);
        --glyph-y: var(--glyph-dy, 0px);
    }
    :where([data-glyph="turn"]) { --glyph-r: var(--glyph-turn, 15deg); }
    :where([data-glyph="draw"][pathLength="1"], [data-glyph="draw"] [pathLength="1"]) {
        stroke-dasharray: 1 var(--glyph-gap, 0.12);
        stroke-dashoffset: calc(-1 * (1 + var(--glyph-gap, 0.12))
                                * (var(--intent, 0) + var(--intent-set, 0)));
        transition: stroke-dashoffset var(--duration-fast) var(--ease-standard);
    }
}
```

- The numbers are plain custom properties and do not animate. The glyph computes its one `transform` from them, and the transition runs on the glyph. `:where()` keeps every rule at zero specificity, so any consumer rule wins.
- One declaration serves both ways: 0.2 s in and 0.2 s back, from wherever the glyph is (STUDY §1; G M1, A K1).
- A flip is the state's own change and is not scaled by the weight. Under reduced motion it turns in one frame with no fade, which G-PRM fails; that is open (the section "Open against the gates").
- Draw repaints the glyph's own box for 0.2 s each way. It is the glyph's one paint leg, and the cost gate reads it as paint. There is no path morph: `d: path()` is not in Safari (G W13).
- An inner `<g>` turns about its own centre under `transform-box: fill-box` in both engines (the theme toggle's rays; read by both seats).
- Safari: `transform-box: fill-box` 11; nested rules 17.2; `:has()` 15.4. No fallback.
- Cost, read: 0 nodes; one property per glyph per hover; 0 layouts; a hover is 14 to 15 style recalculations in Chromium where the three-property form was 25.

### Presence (11.2.0)

`src/styles/glass/presence.css` and `src/composables/motion/presence/Presence.ts`, exported from the root and from `./motion`.

```html
<!-- A node that stays, in a seat that is reserved: no import, no component. -->
<span class="note" data-presence :data-absent="!copied || undefined">Copied</span>

<!-- A pair in one seat. Both stay; the seat is a grid. -->
<Pause data-presence="swap" :data-absent="!playing || undefined" />
<Play  data-presence="swap" :data-absent="playing || undefined" />

<!-- A node Vue removes: the component renders no element. -->
<Presence><p v-if="note">…</p></Presence>

<!-- Content of two sizes, replaced in its seat. The seat follows. -->
<Presence swap><span :key="value">{{ value }}</span></Presence>
```

One boolean prop, `swap`, and no other. `<Presence>` is Vue's `<Transition>` under one of two names, `presence` or `presence-swap` (with `mode="out-in"`). It renders no element and stamps nothing on its child.

```css
@layer components {
    /* A node Vue inserts or removes. */
    .presence-enter-active,
    .presence-swap-enter-active {
        transition:
            opacity var(--duration-control) var(--ease-out),
            translate var(--spring-present-duration) var(--spring-present),
            scale var(--spring-present-duration) var(--spring-present);
    }
    .presence-leave-active,
    .presence-swap-leave-active {
        /* The travel still in flight is held until the fade has ended. */
        transition:
            opacity var(--spring-present-exit-duration) var(--ease-out),
            scale var(--spring-present-exit-duration) var(--spring-present),
            translate 0s var(--spring-present-exit-duration);
    }
    .presence-enter-from {
        opacity: 0;
        translate: 0 calc(4px * var(--motion-weight, 1));
    }
    .presence-leave-to { opacity: 0; }
    .presence-swap-enter-from,
    .presence-swap-leave-to {
        opacity: 0;
        scale: calc(1 - 0.2 * var(--motion-weight, 1));
    }

    /* A node that stays. Absent, it keeps its seat and takes no pointer. */
    [data-presence] {
        transition:
            opacity var(--duration-control) var(--ease-out),
            translate var(--spring-present-duration) var(--spring-present),
            scale var(--spring-present-duration) var(--spring-present),
            visibility 0s;
    }
    [data-presence]:is([data-absent], [data-state="unchecked"]) {
        opacity: 0;
        visibility: hidden;
        translate: 0 calc(4px * var(--motion-weight, 1));
        transition:
            opacity var(--spring-present-exit-duration) var(--ease-out),
            scale var(--spring-present-exit-duration) var(--spring-present),
            translate 0s var(--spring-present-exit-duration),
            visibility 0s var(--spring-present-exit-duration);
    }
    [data-presence="swap"]:is([data-absent], [data-state="unchecked"]) {
        translate: none;
        scale: calc(1 - 0.2 * var(--motion-weight, 1));
    }
    /* A pair: both stay, stacked. The one arriving waits a quarter of the exit clock. */
    [data-presence="swap"] {
        grid-area: 1 / 1;
        scale: 1;
    }
    [data-presence="swap"]:not([data-absent], [data-state="unchecked"]) {
        transition-delay: calc(var(--spring-present-exit-duration) / 4), 0s, 0s, 0s;
    }
    /* A line that stays and gives its room back; follow() tweens between the two. */
    [data-presence="reclaim"]:is([data-absent]) {
        translate: none;
        block-size: 0;
        overflow: clip;
    }
}
```

| leg | in | out |
|---|---|---|
| opacity | `--duration-control` (0.12 s), `--ease-out` | `--spring-present-exit-duration` (0.12 s), `--ease-out` |
| travel (4 px), or scale for a pair | `--spring-present-duration` (0.2 s) on `--spring-present` | none for a plain leave; the pair's scale on the exit clock |

- A leaving node fades and does not slide back (G C6). The travel it had left when told to leave runs on under the fade and is not dropped in a frame.
- **The pair, read in both engines:** on a straight change the two marks never both show above 0.29 and the seat's brighter mark never falls under 0.31; the change is whole by 130 to 150 ms. Turned round at 60 ms each mark continues from the value on screen, and the seat dips to between 0.16 and 0.21 for one or two frames. With no wait the two cross at 0.44 to 0.49 each, which is the ghosting he disliked on keyframes (`record/refs/strips/kf-play-click-step50ms.png`); with half the exit clock the seat dims to 0.15 to 0.18 and a turn holds it dim for 60 to 84 ms. A quarter is the build. The strips are `fold/strips/pair-chromium.png` and `pair-webkit.png`.
- The pair rests at `scale: 1`, so its change lays out 0 times.
- **`<Presence>` does not turn round on a return.** Told to come back while it leaves, Vue drops the leaving node and inserts a new one from nothing: opacity reads 0.22, then 0, in both engines. That is why R-7 sends anything reversible to a node that stays, and it is a G-TWEEN cell that `<Presence>` is not asked to pass.
- Nothing plays at page load: the node that stays has no arrival rule, and Vue's `<Transition>` plays none on first render.
- `[data-state="unchecked"]` is in the absent list so that a reka indicator held with `force-mount` needs no second attribute (`src/styles/glass/control-bit.css:343-372`).
- Vue's `<Transition>` schedules two animation frames per enter and per leave, which is why `Button.vue:192-196` refuses it. A control that is on screen in hundreds uses the node that stays.
- Safari: individual `scale` and `translate` 14.1. No `@starting-style`, no `allow-discrete`. No fallback.
- Cost, read: 0 nodes added by `<Presence>`; a pair holds two marks at rest; opacity, translate and scale.

### Held behind a reading: follow, the line that gives its room back, the swap's seat

`src/composables/motion/presence/follow.ts`, exported from `./motion`.

```ts
/** Call BEFORE the change. Resolves when the box has settled. */
function follow(el: HTMLElement | null): Promise<void>;
```

A component calls it from a watcher that runs before Vue patches (`watch(count, () => follow(surface.value), { flush: "pre" })`); a consumer calls it the same way, or directly before it sets state.

- It reads the box (`offsetWidth`, `offsetHeight`, the block-start margin), waits one tick for the caller's change, cancels its own earlier animation on that element, reads the box again (the one forced layout), and runs one Web Animation of `block-size` (and `inline-size` on a box that cannot wrap, and the margin where it changed) between the two, with `overflow: clip` held inside the same animation. Clock and curve are R-8's, read from the tokens with no literal fallback. A Web Animation leaves no inline style.
- **Read, in both engines:** the 50-row panel shrinks 288 px in 0.42 s; it leaves rest at 0.3 px a frame and its last step is 0.14 px in Chromium and 0.06 px in WebKit, where it was 7.3; its largest step is 18 px in an 8.3 ms frame (20 px in an 11 ms one in WebKit), where the first form moved 49 px in a 16.7 ms one. Sent back at 80 ms it turns where it is and returns to 372 px by the same path, with no jump in position (Chromium: 349.91, 342.13, then 348.77, 354.94 px).
- **The line, read on the real `LabeledField`:** its error line as a node that stays, with `follow()` from one `flush: "pre"` watcher on `invalid`. In, out, in then out at 60 ms and out then in at 60 ms: the field below never moves more than 3.6 px in a frame in Chromium, nor more than 5.1 px in a 14 ms frame in WebKit, of a 23 px travel. The 9 px jump of C-3 is gone.
- **The swap's seat, read:** the select trigger's text leaves in 0.12 s, and from the hand-over the trigger grows 102.9 to 192.3 px in a tween of 0.24 s; its neighbour never moves more than 8.2 px in a frame (10.2 in WebKit) where it jumped 89.
- Under reduced motion none of the three runs: the box lands in one frame and what arrived in it fades (R-9).
- Safari: `element.animate` 13.1; `overflow: clip` 16.
- It does not serve the dock, which has its own measured model (W-I.8 §1.2), a popover that flips sides (a move, not a resize), or the enlarged plate's close (a morph between two rectangles).

**Why they are held.** BRIEF's fifth point is "no layout per frame", and each of these lays out once a frame for its whole clock. The budget is 1 ms a frame at 4x CPU, and a margin of 6 % is treated as over (C-19). The fold's readings, Chromium at 4x, over three runs on a busy machine; the median is the last run's:

| case | layouts | longest (ms), by run | median (ms) | verdict |
|---|---|---|---|---|
| the error line in, twelve real `LabeledField`s on `glass-floating` | 26 | 1.17 to 1.22 | 0.78 | over |
| the same, out | 27 | 1.11 to 1.32 | 0.60 | over |
| the 50-row panel, shrinking | 52 to 53 | 0.96 to 1.32 | 0.07 | over, or inside the margin |
| the same, growing | 53 to 54 | 1.09 to 1.39 | 0.07 | over |
| the select trigger's seat | 33 | 1.04 to 1.17 | 0.19 | over |

PROTOTYPE read the bare form at 0.94 ms and the panel at 0.80 to 0.88 ms on a shorter clock. The real field is dearer than the bare one: its median alone is three quarters of the budget. Neither set releases the pieces. Each ships when:

1. its longest layout on the real component (`LabeledField` in a sheet, `CommandDialog`, `SelectTrigger`) is 0.94 ms or under at 4x on a quiet machine, in Chromium by trace;
2. in WebKit, no more than one frame in ten of its clock is over 20 ms (on the harness's line the fold reads one frame at 21 ms and none over 25);
3. `proof:no-layout-animation` reads size keys in `.animate(` calls, with `follow.ts` as its one allowlisted row. Today that proof scans `@keyframes`, `transition` declarations and Vue recipe classes, so this writer is outside what it reads, which P5 calls a silent escape;
4. for a list, its rows fade (R-8), and for a popover or tooltip with wrapped text, a strip shows no line re-breaking.

A case that fails reserves its footprint: the error line keeps one line's room and is a plain node that stays, which costs nothing and cannot push. That is a changed default for every form (its height at rest), so it is a 12.0.0 row if it is needed.

### The authorized fades under reduced motion (11.2.0)

In `src/styles/utilities/a11y-overrides.css`, as rows of the enumerated set that file already defines. Each row is a class or attribute selector, since the fallback it outranks is `*` in the same layer.

| recipe | what stays under reduced motion |
|---|---|
| `.plate::before` | `opacity` on `--duration-instant` |
| `[data-presence]` and the four `-active` classes of `<Presence>` | `opacity` (and `visibility`) on `--duration-instant` |
| `.focus-ring` | `outline-color` on `--duration-instant` |
| the top-layer reveal (`.glass-reveal`: dialog, sheet, popover, tooltip, menu, select, toast) | enter: `opacity` alone on `--duration-instant`; exit: an opacity-only keyframe on the same clock in place of the full one |
| the control faces (`control-bit.css`: switch, checkbox, radio), the field control, the tab label, the menu row's fill, the carousel member, the expandable trigger | the colour or opacity leg each already authors, on `--duration-instant` |

The first three rows are built and read: every plate, presence, pair and focus cell fades over 100 ms at seven sampled values, and no scale, translate or rotate takes more than two values. The last two rows are unbuilt. Travel needs no row: every amount in this wave's pieces multiplies `--motion-weight`. The existing local `transition: none` rows on spatial legs stay. The dock's own reduced path is W-I.8 §1.6. The Slider's shell and readout are W-B.18's row and join this set with it.

### The press (12.0.0, on the owner's answer)

In `plate.css`, beside the plate, with `src/composables/motion/engage/press.ts`:

```css
:where(.plate) {
    scale: 1;
    transition: scale var(--spring-press-duration) var(--spring-press);
}
.plate:is(:active, [data-press]):not(:disabled, [aria-disabled="true"],
        :has(:is(.plate, button, a[href], [role="button"]):is(:active, [data-press]))) {
    scale: var(--scale-press-sm);
}
@media (prefers-reduced-motion: reduce) {
    .plate:is(:active, [data-press]) { scale: none; }
}
```

```ts
/** Install once per document. Safe to call again. */
function installPress(doc?: Document): void;
```

- Uniform, 0.97, 0.12 s down and 0.12 s back, with the plate at full strength. 0 nodes, one property, one listener on the document and none per control.
- **Read, both engines:** with the writer, a click with no hold reaches 0.97 and the full plate and returns, and so does a 60 ms hold; without it the no-hold click reads 1 and 0.417, no press at all. A tap at 390 coarse shows the full plate and 0.97 and leaves no plate, in WebKit too, where without the writer it painted nothing. A press on a nested control shrinks that control alone (23.28 px, which is 24 × 0.97) and the trigger stays at 1; a press on the trigger elsewhere shrinks the trigger and leaves the inner plate at 0. The control's `scale` never rises above 1 on the way back. The press in and out lay out 0 times.
- It reads two names W-R.1 §2.1 deletes (`--scale-press-sm`, and the `press` row under its OQ-5) and fails W-R.1's static gate "No press scale" as written; the orchestrator amends both on a yes. `PagerDots.vue:361` writes `data-press` in place today; under W-R.1's one-writer rule it stops. On a no, the shrink rule is not written, the writer still ships for the tone, and nothing else in this wave changes.

### The focus ring (11.2.0)

One declaration on `.focus-ring` (`src/styles/utilities/base.css:144-151`): the outline is always declared, its colour transparent at rest, and `outline-color` transitions over `--duration-instant` on `--ease-standard`. No width or offset animates. Built and read in both engines.

### The no-snap check (11.2.0)

`src/testing/no-snap/`, exported as `./no-snap`, with a row in `scripts/lib/subpath-policy.mjs`. It imports nothing from Playwright; it takes any page object with an `evaluate` method.

```ts
/** Run one state change and sample it. */
function sampleChange(page, change: {
    trigger: () => Promise<void>;      // hover, click, key, a store write
    targets: string[];                 // selectors to read
    properties?: string[];             // default: the box, opacity, scale, translate, rotate,
                                       // transform, clip-path, colours, radius, stroke-dashoffset
    step?: number;                     // ms between samples; default 1000 / 60
}): Promise<Samples>;

/** Judge the samples against the law. */
function judgeChange(samples: Samples, bound?: { slack?: number }): Verdict;
```

- **Sampling** is the recorders' method (G and A, headers): read the rest state, trigger, pause every running animation (pseudo-elements included), seek all of them to 0, step, 2 × step and so on, and read each target at each seek; then let them finish and read the end state. For a page that moves by script it takes a clock to step instead (`page.clock`).
- **The verdict has five clauses.**
  1. A property whose rest value differs before and after has an animation covering it (otherwise it is a cut).
  2. The first sample equals the rest state and the last equals the end state.
  3. No step between two samples is more than `slack` (1.15, W-I.8's figure) times the largest step of that leg's own easing at the same spacing, times its travel. The easing is read by seeking a probe animation that carries the same timing, so nothing is parsed.
  4. **No leg moves more than 0.4 of its travel between two 60 Hz samples, and a leg has at least five samples.** The plate's 0.339 and presence's 0.388 pass. A 34 ms leg (0.49, four samples) and a 20 ms leg (0.83, three) passed clause 3 and fail here, read in both engines (C-21).
  5. A node that leaves is still in the document at every sample before its last.
- For a leg with no animation object (script on a stepped clock) the bound is the plain one: the end state is not reached in the first changed frame, and no frame covers more than a third of the travel (value.js's rubric, `inbound/VALUE-PRECEPTS-2026-11-12.md` §3).
- The sampler matches an animation to its target by element and pseudo-element, reads a CSS animation's easing from a probe, skips a transition an animation cancelled, compares colours premultiplied, and takes its last sample 0.01 ms inside the end (PROTOTYPE, "Notes on the helper").
- A wall-clock mode is owed for turns: a change turned round at 60 ms cannot be seeked, and the fold read those by one `getComputedStyle` per frame. The helper takes that recorder in before G-TWEEN's turned cells are written.
- Glass's own G-TWEEN runs through it, so the helper a consumer gets is the one that gated the release.

### Where glass uses the pieces

**In 11.2.0**, each a few lines where today there is a cut or no hover:

| site | today | with the pieces |
|---|---|---|
| the ten failing hovers of CENSUS, less the DarkModeToggle and the text Button | no hover, or text colour alone | `class="plate"`, with `--plate-from: 1` on the rows and tabs, at the strength he picks. A site whose `::before` the gleam holds waits for 12.0.0 |
| the text Button (`button/styles.css:205-207`) | an underline that appears at once | the same underline, its `text-decoration-color` tweened on `--duration-control` |
| the DarkModeToggle | opacity 0.8 to 1 | its sun and moon take `data-glyph="turn"` (O-279's hover). Its plate is its seat's, which is W-I.8's |
| every chevron (`disclosure.css:96-98`; the SelectTrigger's classes; the menu sub-trigger, which does not move today; `dock/styles/controls/triggers.css:152-157` after W-I.8's build) | three separate rules and one missing | `data-glyph="nudge"` with `--glyph-flip` |
| icon pairs (`DockBackgroundToggle.vue:72-73`, `EasingPicker.vue:577-588`, `Checkbox.vue:48-49`, the ExpandableContainer's two icons, the DataTable sort glyph) | `v-if`, a cut | a pair that stays: both marks mounted, stacked in a grid seat |
| menu and select marks (`DropdownMenuCheckboxItem.vue:50-53`, `DropdownMenuRadioItem.vue:46-49`, `SelectItem.vue:76-84`) | reka mounts and unmounts them | `force-mount` with `data-presence="swap"` |
| Metric's value, the Avatar's image, the DataTable's loading, empty and error states, the Command empty state, the carousel counter, the end-of-list line, the configurator's layer actions, the EasingPicker's modes and failure line | cut in | a node that stays where it can come back inside 120 ms; `<Presence>` where it cannot |
| the Timeline (`Timeline.vue:373, 578-697`) | the mark snaps on hover and state; the check and the old detail are cut | the mark is a `.plate`; the disc's `background` gains its transition; the check is a pair; the detail is `<Presence swap>` |
| the pager dots' edge pip and leaving pip (`PagerDots.vue:353-370, 500-504`) | shrinks at once; cut | `scale` and `opacity` on the pip's own transition; the leaving pip is held for its fade |
| small property legs: the Progress error recolour (`Progress.vue:165-168`), the data-table's selected rim (`data-table/styles.css:113-116`), the sheet grip's `inline-size` leg (`sheet/styles.css:275-288`) | no transition, or a layout leg | one transition each on the shared clocks; the grip moves by `scaleX` |

**Held with follow**, each on its own reading:

| site | today | with the pieces |
|---|---|---|
| the field's error and description line (`LabeledField.vue:50, 64-71`) | pushes the form in one frame | the line stays, `data-presence="reclaim"`, with one `follow()` in the field. Built and read in the prototype |
| the command list in its dialog; a dialog or sheet whose content changes | resizes in one frame | one `follow()` on the surface; its rows fade |
| a popover or tooltip whose content changes | resizes in one frame | block size alone follows; claimed only after a strip with wrapped text |
| the select value and an auto-width trigger (`SelectValue.vue:35`, `SegmentedTabs.vue:162-170`); the EasingPicker's transport label | text and width jump | `<Presence swap>` on the text; the trigger is its seat and follows |

The DotRing under InfiniteScroll keeps its own `glass-dot-ring` transition (`InfiniteScroll.vue:66`, `src/components/_shared/feedback/dot-ring.css:124-160`). It is tweened both ways today.

**In 12.0.0**, in W-R.1's run, each with a MIGRATION row:

- `.plate` on every control whose whole hover is the gleam (the glass Button, the SelectTrigger, the Chip, the dock's controls), in the commit that deletes the gleam (`W-R.1.md` §2.1). The outline Button and the SelectTrigger set `--plate-edge`. The dock seat's rest-fill token (W-I.8, "Inputs banked 2026-11-12") and `--plate-tone` are one token.
- Each of those controls that declares its own `transition` writes the press's `scale` leg into that list (R-11).
- The dialog's close button drops its private plate for the shared one (`dialog/styles.css:115-140`).
- Menu rows take `.plate` at `--plate-from: 1` and lose the 1 px lift and four of their six transition legs (`src/components/_shared/menu/menu.css:11, 30-36, 69`).
- The Button's loading state stops inserting a node that widens it (`Button.vue:192-198`). With a leading glyph, the ring takes that glyph's seat as a pair (R-15). This is the owner's by strip (OQ-3).
- The press and its writer, on the owner's answer.
- `fade`, `tab-fade`, `pane-swap` and `metric-swap` with their reduced-motion arm leave `src/styles/transitions.css`. No component uses them (CENSUS, "What holds", 3), but they are published class names.

### What glass deletes with it

| what | where | release | owner |
|---|---|---|---|
| bare `v-if` swaps of icons, marks, lines and states | the sites above | 11.2.0 | this wave |
| the reka indicator's conditional mount around menu and select marks | three files above | 11.2.0 | this wave |
| three separate chevron rules | above | 11.2.0 | this wave |
| the Timeline's keyed remount that cuts the old detail | `Timeline.vue:373, 682-697` | 11.2.0 | this wave |
| the `inline-size` leg on the sheet grip | `sheet/styles.css:275-288` | 11.2.0 | this wave |
| the dialog close's private plate; the menu row's lift and four legs; the Button's inserted ring and its `.button-mark` rules; the four unused transition recipes | above | 12.0.0 | this wave |
| the pointer gleam, its directive, its writer and its tokens; the capsule's gleam-only hover | `W-R.1.md` §2.1 | 12.0.0 | W-R.1. The plate is what stands in the seat |
| the press spring and its eight listeners on the Button; the press-coupled gleam; the non-uniform squash (O-285) | `W-R.1.md` §2.1 | 12.0.0 | W-R.1. One document listener and the CSS press replace them on a yes |
| the Chip's selected growth on an overshooting curve and its radial flood; the Select menu's three gradients; the indeterminate track's gradient sweep | `W-R.1.md` §2.2 and §2.5 | 12.0.0 | W-R.1 |
| the dock's per-control hover fills and the five-property selected seat | | 11.2.0 or 12.0.0 | W-I.8 and `W-R.1.md` §2.6, G5 |

And from this wave's own first form, at the fold: the breath and its keyframe; the busy state of the plate; the default grow on every `svg` in a plate; two of the glyph's three transition legs; the bare `data-glyph` spelling; the `reclaim` prop; the two numbers on every button and link of a page.

Nothing is added to `src` that these do not outweigh: three CSS partials, one functional component, two functions and a test helper.

### Not in this wave

- A breath on any control (R-10), and an idle state on any glass default.
- A plate that turns, a path per destination, and a selection that travels (R-4, R-5).
- Members of a list that make room for each other: toasts, table rows.
- The theme flip, the enlarged plate's close, a popover's side flip, the card's condensing header, the StatusDot's silhouettes. Each is a new row (the census section).
- The dock in any state (W-I.8), the Slider (W-B.18), the text mark (W-B.16).
- A path morph between two glyphs. `d: path()` is not in Safari (G W13); Apple's SMIL route (A G7) is unmeasured in WebKit.
- Shipping Safari. Every reading is Playwright WebKit; the app itself is one owner glance at the close (OQ-6).

## Open against the gates

Each of these fails a gate below as the prototype stands. None is waived. The build cures it or the orchestrator rules on it.

1. **A plain arrival lays out once at its end** (PROTOTYPE failure 7): when Vue's enter classes leave, the node's `translate` drops to `none`, which is one layout under 0.1 ms. G-COST allows presence a layout only in the frame a node is inserted or removed. The pair and the press are cured by a resting value; a node Vue inserts has no rule left to hold one.
2. **A flipped chevron under reduced motion** turns half a turn in one frame with no fade (PROTOTYPE failure 6). G-PRM asks for a fade on any change that paints differently at its two ends.
3. **Follow's content under reduced motion** lands with no fade unless its rows are nodes of presence (R-8).
4. **The cost of every size tween**, above.
5. **The hover strength** as built fails G-BARE's floor (R-4).

## Gates

Each gate is read once RED and once GREEN, with its bite read once. RED is master at `a7e0337c5`, or the record named. Browser cells run on the prototype's harness, moved to `tests-visual/intent-motion/`, in Chromium headless shell and Playwright WebKit at 1440, light, with one 390 coarse cell where it is named. Timing is the claim, so no theme or width is repeated. One browser per run, a new context per cell, every run through `guarded`, every WebKit run through `guarded --exclusive webkit`.

**Static and vitest.**

- **G-CLOCK.** `git grep -nE --untracked '[0-9.]+m?s([^a-z-]|$)|cubic-bezier|linear\(' -- src/styles/glass/plate.css src/styles/glass/glyph.css src/styles/glass/presence.css src/composables/motion/presence src/composables/motion/engage/press.ts` prints only the `0s` legs of presence. Every other duration and curve is a token, and no script keeps a literal fallback for one. (The first form's `\b` matched nothing on Apple Git 2.50.1 and did not bite; PROTOTYPE.) Bite: one `200ms` literal.
- **G-BYTES.** The three partials add at most 1.39 KB gzip to the built stylesheet, and `./motion` grows by at most 1.72 KB gzip. Those are the fold's readings plus a tenth: 1260 B for the partials (the prototype's were 1151 B) and 1560 B for `<Presence>`, `follow`, the swap's seat and the press writer together, Vue external (941 B before the writer, the seat, the distance clock and the turn). No runtime entry's boot graph contains `no-snap`. Bite: importing the helper from the root barrel.
- **G-API.** A type test: `<Presence>` admits `swap` and fails `vue-tsc` on `reclaim`, `duration`, `easing`, `name` and `group`; `follow` takes one argument. `renderToString` of each `<Presence>` form emits the child and nothing else. Bite: a `tag` on the transition.
- **G-EXPORT.** `./no-snap` resolves from a consumer install with no Playwright in the tree, and `judgeChange` fails five planted series: a cut, a first frame off rest, a step of half the travel, a node removed before its fade ends, and a 34 ms linear leg (the first four read without a browser, the fifth in both engines). Bite: each plant passing.
- **G-PROOF.** `proof:no-layout-animation` fails on an `el.animate({ blockSize })` planted outside `follow.ts`. RED today: it passes the plant.
- **G-CUT (12.0.0).** `git grep -nE 'pane-swap|metric-swap|tab-fade|button-mark|menu-row-lift' -- src` prints nothing, and the MIGRATION table names each.

**In a browser, both engines.**

- **G-TWEEN.** Through `./no-snap`, every cell in and out.
  - The pieces: the plate (hover, keyboard focus, press, on and off, the four idle edges: idle on, idle off, pointer on, pointer off) on a 40 px seat and on a row; each glyph verb, a flip, and a leave at 60 ms; presence (the node that stays, the pair, `<Presence>`, `<Presence swap>` with its seat); the line that gives its room back; follow (grow, shrink, sent back at 80 ms); the focus ring; the press, if it ships.
  - **Turned round at 60 ms**, by wall clock: the node that stays, the pair, the line (both turns), and `<Presence>` told to leave while it arrives. Each continues from the value on screen: no property, and no neighbour's box, steps more than clause 4's bound in the frame of the turn. `<Presence>` told to return while it leaves is not a cell: R-7 forbids the use.
  - The press on the real Button and the real SelectTrigger, reading every leg each declares: none is a cut, the `scale` leg included (C-6).
  - The rows: one cell for each line of "Where glass uses the pieces", each in its release.
  - Passes when: no watched property changes without an animation covering it, and no neighbour's box changes at all except under follow; the first sample equals the rest state and the last the end state (within 0.01 of opacity, 0.002 of scale, 0.5 px); no step exceeds 1.15 times the leg's own eased step, nor 0.4 of its travel; in a pair, the two marks are never both above 0.5 opacity and on a straight change the brighter is never under 0.25.
  - One 390 coarse cell, both engines: a tap shows the plate at full strength and leaves no plate after release.
  - RED: CENSUS's readings of each row; on film, the Play and Pause swap (`kf-play-click-step50ms.png`) and Google's own leave (`chat-out-board.png`), which the check must fail. Bites: `v-if` restored on one pair; the plate's `opacity` transition removed; a plate that starts at 0.75 opacity; the `translate` hold dropped from the leave rule.
- **G-COST.**
  - DOM nodes added per control: 0 for every piece, counted at rest, mid-change and after. A pair holds its two marks at rest and adds none in a change.
  - Properties animated, read from `document.getAnimations()` in both engines: `opacity`, `scale`, `translate` and `transform` only. Three declared exceptions, each named in the wave record with its box: `stroke-dashoffset` (draw, the glyph's own `svg`), `outline-color` and `text-decoration-color` (paint, one control), and `inline-size`, `block-size` and one margin (follow only).
  - Chromium trace, each change in and out: 0 `Layout` events between the first and last animation frame for the plate, the glyph, the press, the focus ring, the pair and the node that stays. `<Presence>` may lay out only in the frame a node is inserted or removed. Follow lays out each frame within the held section's budget.
  - Style recalculations in a 350 ms hover on a 44 px seat, Chromium at 4x: 16 or fewer (read: 14 to 15; the three-property glyph read 25).
  - Frame time, Chromium at 4x: the longest main-thread task inside a hover across twelve seats on a blurred surface is 4 ms or less (PROTOTYPE read 4.00). WebKit has no such counter and is recorded as unmeasured.
  - Bites: the plate's growth written as `inset`; the glyph's verb written as individual `scale`.
- **G-REST.** A page of 40 plates, 40 glyphs and 10 nodes that stay, with the press writer installed: `document.getAnimations()` is empty at every sample of the first 500 ms after load and at rest after each change, a declared idle element included. `git grep -nE 'Observer|addEventListener|requestAnimationFrame|setInterval|setTimeout' -- src/composables/motion/presence src/composables/motion/engage/press.ts` prints the writer's three listener lines and its one timer, and nothing under `presence/`. Bites: `@starting-style` on `[data-presence]` plays ten arrivals at load; a listener per control.
- **G-PRM.** Under `prefers-reduced-motion: reduce`, on every G-TWEEN cell and on the surfaces of the authorized table:
  - no `scale`, `translate`, `rotate`, `transform`, `clip-path` or size takes more than two values, no glyph verb moves at all, and a press does not shrink;
  - every change that paints differently at its two ends shows `opacity` or a colour at three or more values over 50 ms to 144 ms (O-198's bound);
  - no animation loops.
  - RED: every cell lands in one frame (CENSUS, "What holds", 4). Bites: one authorized row removed; a travel amount with no `--motion-weight`.
- **G-BARE.** With scripts disabled, on static markup that uses the classes and on the server's render of each `<Presence>` form:
  - each control paints its rest state the same as the same markup without `plate` and `data-glyph`: no pixel differs by more than 2 of 255 in any channel;
  - **every state the plate paints is seen:** hovered, on and pressed each differ from the host by 24 of 255 or more in their largest channel, in light and in dark, on a bare host and on a 6 % filled bar, and on differs from hovered by 12 or more. As built, hover reads 12 and fails; the full strength in a seat's tone reads 28. (The first form used one threshold, 48, for both jobs: it was lenient where it should be strict and could not see a pressed plate at 28; PROTOTYPE, C-12.);
  - a draw curve is whole;
  - a `data-absent` node paints nothing and keeps its seat's box;
  - the plate's hover and the glyph's verbs still pass their G-TWEEN cells, since no script drives them.
  - Bite: a rest state that needs a class a script adds.
- **G-RESTRAINT.** Counted on the built CSS for each piece's selectors and on the fixture's computed styles, against these ceilings:

  | | plate | glyph | presence | follow | press | focus ring |
  |---|---|---|---|---|---|---|
  | shadows, gradients, blurs, filters | 0 | 0 | 0 | 0 | 0 | 0 |
  | wrappers or nodes added | 0 | 0 | 0 | 0 | 0 | 0 |
  | pseudo-elements | 1 | 0 | 0 | 0 | 0 | 0 |
  | transition legs declared | 2 | 1 | 4 | 0 (one Web Animation) | 1 | 1 |
  | animations running in one change | 2 | 1 | 2 | 1 | 1 | 1 |
  | listeners | 0 | 0 | 0 | 0 | 1 on the document | 0 |

  And per control, whatever it composes: at most 2 animations running on a hover, 2 on a press and 0 at rest; on a hover exactly one of them is spatial (R-3). One on-mark per control (R-14): an active tab under its indicator and an open disclosure row each read a plate at 0. RED: the menu row's six legs and lift (`menu.css:11, 30-36, 69`); the Button's press, a spring fed by eight listeners with a gleam coupled to it (`Button.vue:183-190`). Bites: a `box-shadow` on the plate; a nudging glyph over a plate at 0.8; `[data-state="active"]` returned to the plate's on list.
- **G-NEST.** A `.plate` button inside a `.plate` trigger, hover and press: the pointer over the inner one moves the inner plate and not the outer plate or glyph, and a press there shrinks the inner control alone (its box is its size times 0.97, once); over the trigger elsewhere, the reverse. Bite: the `:has()` exclusion dropped from either rule.
- **G-HIT (12.0.0, if the press ships).** A click 1 px inside each edge of a 40 px and a 24 px pressed control still fires. A click with no hold reaches 0.97 and the full plate, and returns. The control's `scale` never rises above 1.001 on the way back. Bites: a press to 0.9; the writer not installed.
- **G-CORNER.** A crop at 4x of the outline Button and the SelectTrigger with the plate on: no host pixel shows between the plate and the inner edge of the border at any corner. Bite: `--plate-edge` unset.

**The existing specs.** A spec that pins something this wave deletes (a `v-if` swap, the reka indicator's mount, the reduced-motion cut of an authorized row, the Button's ring) is rewritten with it and named in the build's record.

That is six static or vitest gates and nine browser gates; G-CUT and G-HIT are 12.0.0's. One challenge pass and one fold on the build; a critic gates on this list and adds no row.

## The census

Rows are CENSUS's twenty by number, then its tables. "This wave" means a cell of G-TWEEN.

| row | cured by |
|---|---|
| 1, the dock re-fits at once; 13, its regions mount; the corner at arm and settle; the crossfade reserve; the cross-axis height | **W-I.8** (§1.5, and the owner law of O-248) |
| 2, the focus ring | this wave (R-12), on OWNER-READ question 3's default |
| 3, the field's error line | this wave: the line that gives its room back, held |
| 4, the command list and its dialog | this wave: follow with rows that fade, held |
| 5, the Button's loading ring | this wave, 12.0.0 (R-15, OQ-3) |
| 6, the auto-width select trigger | this wave: a swap whose seat follows, held. The dock's select trigger is **W-I.8**'s content episode |
| 7, the dock's active seat | **W-I.8** (the highlight and the rest-fill token) and **W-R.1** §2.6, G5 (hover against active) |
| 8, menu and select marks | this wave: the node that stays |
| 9, the other toasts jump | new row |
| 10, DataTable | states: this wave. Rows added, removed or re-sorted: new row |
| 11, reduced motion cuts everything | this wave, for the authorized table. The dock: **W-I.8** §1.6. The Slider: **W-B.18** |
| 12, icon swaps | this wave: a pair that stays |
| 14, the slider's loupe | **W-B.18** (it removes the loupe in 11.1.1) |
| 15, popovers and tooltips | resize on a content change: this wave, block size only, held. The side flip: new row |
| 16, the theme flip | new row |
| 17, Avatar and Metric | this wave |
| 18, the Timeline | this wave |
| 19, pager dots | this wave (the remainder of O-250 and O-261) |
| 20, ExpandableContainer and the card's condense | new rows; the two expand icons are this wave's |

From the tables, beyond the twenty:

- **This wave:** the ten failing hovers; the menu sub-trigger's chevron; the checkbox's Minus and Check; the EasingPicker's rows; the Command empty state; the carousel counter; the end-of-list line; the configurator's layer actions; the Progress error recolour; the data-table's selected rim; the sheet grip.
- **W-I.8:** every other dock row (the face swap under reduced motion, the active seat's paint, the select trigger).
- **W-R.1:** the dock's press darken and squish, and the Chip's selected growth (§2.1, §2.2); the Sheet's overshoot is 11.1.1's (O-264); the accordion's height engine and its reversal (§2.7); the indeterminate band's sweep, the skeleton's and the configurator's shimmer (§2.5, the gradient list); the gleam-only hovers (§2.1, with this wave's plate).
- **W-B.18:** the Slider's rows. **W-B.16:** HandMark's shape swap leaves with HandMark.
- **Holds, no cure:** the top-layer open and close, the switcher's indicator, the worm, the sortable, the deck.

atlas's thirteen glass rows (`../design/intent-motion/inbound/ATLAS-SNAP-CENSUS.md`), in its order: the enlarged plate's close (new row); the whole page on light and dark (new row, with 16); the rail's fold and linger (**W-I.8**, O-275); the Collapsible's chevron (this wave); the tooltip's and the popover's open and close (they hold on master, CENSUS "What holds" 1; atlas is told); the sheet that resizes while open (this wave: follow, held); the plate tools tray's hover expand (**W-I.8**, O-276); the DataTable's rows, twice (new row); the Surface's rim class (new row); the carousel and the expandable trigger under reduced motion (this wave).

**New rows for INBOUND**, for the orchestrator to number:

1. The theme flip re-tints the page in one frame, and `disableTransitions` forces it (`src/composables/dark/useGlobalDark.ts:92-111`; atlas `Dock.vue:89`). It needs an owner ruling before a design: Rauno's guideline is that a theme switch triggers no transitions (R §7), and the law says nothing changes in one frame.
2. The ExpandableContainer's close is a cut, its scrim snaps in and the page reflows under it (`src/components/expandable-container/styles.css:6-16, 41-46`). atlas's most visible glass row. The cure is the enter's morph played backward (`useElementMorph.ts`), with the in-flow box held.
3. Members of a list do not make room by a tween: the other toasts when one arrives or leaves (`Toaster.vue:107-122`), DataTable rows added, removed or re-sorted (`DataTable.vue:438-470`; atlas's two rows). A table row cannot be taken out of flow to leave, so this is its own piece.
4. A popover or tooltip flips sides in one frame when its room changes (`PopoverContent.vue:61`, `TooltipContent.vue:40`). It is a move on reka's positioner.
5. The condensing card header's height jumps with its `font-size` (`src/components/card/scroll.css:100-106`).
6. The StatusDot's seven silhouettes swap border, size and fill with no transition (`StatusDot.vue:126-236`).
7. The Surface's rim class appears and leaves in one frame (atlas, `AuroraVeilStage.vue:76`). It waits on W-R.1's rim ruling.
8. The configurator's section reveal animates `grid-template-rows` (`ConfiguratorLayer.vue:236-247`); it should take whichever height engine W-R.1 §2.7 adopts.
9. Swaps that fire only on a resize or a prop change, left as they are and recorded: the tabs' phone select against the strip, the table against cards, the typewriter's cursor seat, the Separator's label, the Label's annotation, the dialog's close button by its dismiss prop, a toast updated in place, the Slider's marks.
10. On keyframes, the ToggleGroup's "radial hover glow" (O-286) is by inference the gleam's disc (STUDY §4). One frame confirms it, and W-R.1 §2.1 then closes it.
11. A size tween that keeps its speed through a turn. No CSS or Web Animation clock can; it needs the spring in script that W-I.8's dock already has. It is a row only if the owner sees the turn in follow's strip.

## Consumer half

Each consumer changes at its own repin. glass tells atlas of every default here at booking and at publish.

- **atlas** adopts the plate, the glyph and `./no-snap`, and builds none of its own (BRIEF). It is told four things: the two numbers are set only on a `.plate` and on a control that holds a glyph, not on every button of its pages; a press needs `installPress()` once at boot where it puts `.plate` on its own markup; anything that can come back inside 120 ms is a node that stays, and `<Presence>` is for what cannot; and the size pieces are held. Its own blanket (`design/foundations/base.css:91`) is atlas's to narrow; `[data-presence]` fades under reduced motion with nothing more set. Its detail sheet's `v-if="item"` is its own cut.
- **value.js.** The Palettes to Mix card swap (`demo flipRegions.ts:84`) becomes `<Presence swap>`: two cards' text is never on screen together, and the container follows at the hand-over with no call (held with follow). The theme toggle's hover arrives with the glyph (O-279).
- **keyframes.** The direction menu's arrows take `data-glyph="nudge"` with `--glyph-dx` and `--glyph-dy`; its easing curves take `data-glyph="draw"` and `pathLength="1"`, and the trigger's curve draws once more on the click that opens it; Play and Pause become a pair that stays and the whole-dock view transition around them goes (R K4). The edit button in the trigger is a `.plate` of its own and shrinks alone (O-284). Its live scene glyphs are its own and are kept as they are.
- **speedtest.** Its idle pane breathes by its own rule on `--skeleton-breathe-duration`. It is told what the two seats read: a CSS breath that is removed cuts to nothing in both engines, so it lets the iteration in flight finish before the pane changes phase; and a pointer over a breathing element cuts in Chromium if the hover and the breath share a property. If the pane's action is a `.plate`, `data-idle` rests it at the light strength with no loop.
- **daraksha.** Nothing to change for this wave; its dock rows are W-I.8's.
- A consumer that used `fade`, `tab-fade`, `pane-swap` or `metric-swap` as transition names moves to `<Presence>` at 12.0.0.

## Open questions

- **OQ-1 (owner; OWNER-READ question 1).** The press shrink, shown as built: tone and a 0.97 shrink that a tap completes, by one document listener. Default: yes on buttons and icon buttons; cards, rows and large surfaces answer by tone alone.
- **OQ-2 (owner; OWNER-READ question 2).** The plate's strength and shape, by the image. **No default.** The plate's sites wait.
- **OQ-3 (owner, by strip).** A busy Button shows the ring in its leading glyph's seat (R-15). The strip is owed by the build seat, beside the first form's breath. Default: as written; a Button with no glyph mounts the ring on first use, keeps it as a node of presence and follows its own width.
- **OQ-4.** Closed: grow is a named verb at 0.13.
- **OQ-5 (measurement).** Whether every colour and opacity leg in the authorized table is authored today. Default: yes; a row found with none gains one on `--duration-instant` and is named in the record.
- **OQ-6 (owner's machine).** Safari itself. Default: not a release blocker; one glance at the close at a hover, a pair, a tap on a phone and a menu mark.
- **OQ-7 (W-R.1's seat).** Whether `follow()` is read as a third candidate under W-R.1's OQ-11. Default: it is read, and the engine that passes that wave's reversal gate with the fewest nodes is adopted for both.
- **OQ-8 (owner; OWNER-READ question 5).** Idle. Default: a resting plate, no loop (R-10). A breath is built only if he asks for it, and then only in a form that passes four edges in both engines.
- **OQ-9 (owner, by strip).** The draw's gap: `fold/strips/draw-gap-chromium.png` shows 0.12 in and back, and 0.3. Default: 0.12.
- **OQ-10 (owner, by strip).** The pair: `fold/strips/pair-chromium.png` beside `record/refs/strips/kf-play-click-step50ms.png`. Default: as built.

## Records the orchestrator amends

The fold seat wrote this file, `../design/intent-motion/fold.md`, `OWNER-READ.md` and `PRECEPTS-ADDENDUM.md`, and edited nothing else in the main checkout.

- `INDEX.md`: a row for W-B.17: 11.2.0, held, and 12.0.0.
- INBOUND: the eleven new rows; O-278 placed here; O-279's hover placed here and its seat left with W-I.8; O-284 and O-285 (11.1.1's scope) wait on OQ-1.
- `W-R.1.md`: §2.1's press deletion and its "No press scale" gate on a yes to OQ-1; §2.3, where `installPress` is the one writer of `data-press` and `PagerDots.vue:361` stops writing it; its OQ-5 (the `press` row keeps a reader on a yes); its OQ-6 (the glyph's grow is its own amount and does not read `--scale-hover`); §2.2 (the reveal's reduced-motion fade lands in 11.2.0 by this wave's authorized rows); §2.7 and OQ-11 (OQ-7 here).
- `W-I.8.md`: the dock's seats may take `.plate` and `data-glyph` on its build; the theme seat's hover is `data-glyph="turn"`; the rest-fill token is `--plate-tone`.
- `W-B.18.md`, R-11: the row it calls "a library row of its own" is this wave's authorized table.
- `docs/precepts`: the addendum's texts. Two drifts CENSUS found go with them: `affordance-map.md` lists the DataTable sort control as a composed Button, which it is not, and its HOVER-LIFT column claims `scale-hover` on Button and the dock's controls, where it was removed.

## Struck

From the study, the proposals and this text's first form, with the records open:

- The study's reveal of a new size through a clip (P4): struck by frame three of the dock strip.
- Proposal B's arrival by `@starting-style` and `allow-discrete` on `display`; its deletion of the universal reduced-motion rule; its 100 ms size tween under reduced motion; its amounts stated as if the weight were 1; its icon rule on every `svg.lucide` in every `button`; its `stroke-width` default; its glyph that moves on keyboard focus; its step of the plate's colour on press; its `group`.
- Proposal A's glyph on the `press` row as "no overshoot"; its reliance on `--scale-hover` and `.tap-squish`; its group plate, its progress edge on the plate, and its fill verb; its quiet second path under a drawn curve.
- The study's "the plate's seat is the gleam's, so the net is zero", as an 11.2.0 claim.
- Daraksha's 12 %, 4 % and 2 % step targets as the check's bound.

At the fold, each by a reading:

- The breath, in both forms tried (R-10): four edges cut in the first, two in the second.
- The plate's busy state (R-15): it was the pressed plate dimming.
- The default grow on every glyph (R-3): not seen in its own strips.
- Three individual transform properties on the glyph (R-6): a recalculation a frame, and a nudge against a flipped chevron's point.
- The two numbers on every control of a page, the bare `data-glyph` and the undefined `none` (R-6).
- "A control nested in another answers only for itself" by resetting two numbers (R-6): its ancestors answered too, on hover and on press.
- `:active` as the whole press (R-11): a tap showed nothing.
- `.plate { transition }` at class specificity (R-11): it erases a control's own list.
- A swap of two icons as out, then in (R-7): an empty seat, 320 ms, and no turn.
- `<Presence reclaim>` (R-7): a 9 px jump on a return.
- `follow()` called before a swap (R-7): it never ran.
- One clock and the spring's cut curve for every size (R-8): 49 px in a frame and a 7 px last step.
- The persistent fill on tabs and disclosure rows (R-14): a second mark.
- One threshold of 48 for G-BARE: it could not see the plate.
- A step clause measured only against a leg's own curve (R-13): it passed a cut given two frames.
- The claim that the plate needs "no script, listener or observer": true of hover, focus and on; a press needs one listener on the document.
