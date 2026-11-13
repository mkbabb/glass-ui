# W-B.17: intent-first motion (the plate, the glyph, presence)

The source is INBOUND O-278, the owner on 2026-11-12, twice, verbatim (`../design/intent-motion/BRIEF.md` holds both in full):

> "items that grow smoothly from BEGINNING TO END with START AND STOP animations in and out--this is critical. Growing instantly in height or other states is not acceptable ever--all items should be tweened. ... items should have weight, momentum, and breath. Large elements and focused items should have interactivity states, idle states, and communicate progress, loading, and intent with transitions."

> "NO overuse of shading, transition, or markup--this is an AI smell. Have touch like apple."

The two bind equally. The wave also carries the hover half of O-279 (the theme toggle), the press question behind O-284 and O-285, O-286, the consumer asks in the brief (atlas: the check runnable on its own pages, and the reduced-motion fade from glass; value.js: an icon piece that drops onto any icon with one import and no wrapper; keyframes: arrows that nudge, curves that draw, a glyph that changes on a pick), and the census (`../design/intent-motion/CENSUS.md`).

The spec seat (claude-fable-5-2, 2026-11-12) ran nothing. Every number here is quoted from a record, read from source on master at `a7e0337c5`, or marked *estimate* or *target*. Citations follow the study: **G**, **A** and **R** are the Google, Apple and references records under `../design/intent-motion/record/`; STUDY, CENSUS, proposal A and proposal B are the files of those names beside them.

Three limits bind every number. Shipping Safari is unmeasured; each record ran Playwright's WebKit build, and version floors are the documented ones. No frame time has been taken for any technique here. No piece has been built: the prototype seat's readings (the section "Owed before any build seat") come first, and three of them can strike a piece.

Release, for `INDEX.md`'s column: **it splits.** The pieces are additive and ship in **11.2.0**, with the cures that add a tween where today there is a cut or no hover at all. What changes a default every consumer sees ships in **12.0.0**, in W-R.1's run: the plate in the seat the gleam leaves, the press, the busy Button, and the deletions.

## The law as five cases

Proposal B's table stands as the design's frame. A surface changes in five ways, and each has one answer.

| # | What changes | The answer | Piece |
|---|---|---|---|
| 1 | a property on a node that stays | a CSS transition on the shared clocks | the plate, the glyph, the press, the focus ring |
| 2 | a node arrives | it fades in with one small travel | presence |
| 3 | a node leaves | it is held until its fade ends | presence |
| 4 | a node is replaced in its seat | 3, then 2; never both on screen | presence, as a swap |
| 5 | a box's size changes with its content | the size is tweened between two measured values | follow |

No piece runs a frame loop. Every leg is a CSS transition, a CSS animation or one Web Animation, so the no-snap check can pause and seek each one.

## Rulings

- **R-1: the plate is proposal B's mechanism with proposal A's states.**
  - Mechanism: the control's `::before`, a flat fill, growing by `scale` with `opacity`. That is what Google ships (a pseudo-element or node that is always there, on two compositor properties: G C1, G C3, G M4) with the leave Google lacks (G §6: every Chat icon cuts on the way out).
  - States: one fill at one strength, with `opacity` carrying hover, pressed and on (proposal A). Proposal B stepped the fill's colour on press with no tween of its own, which is a cut; with one fill no colour ever transitions.
  - Proposal A's clip rectangle is not taken for hover. A `clip-path` transition is paint in at least one engine and is unmeasured in both (STUDY, P4), and hover is the most frequent change in the library.
- **R-2: the plate grows only on a control about as wide as it is tall.** `--plate-from` is 0.8 by default (G C1) and 1 on a row, a tab, a text button or a card, where the hover is the fill alone (G K1, R F2; the HIG: "For an element that has little space around it, consider using a hover effect that includes tint, but not scale and shadow", A §6). In the records a hover never moves an edge more than 4 px: the Chat plate 4 px a side, Apple's card about 1.5 px, Family's button under 1 px.
- **R-3: the plate grows, or the glyph speaks; never both.** A control whose glyph carries a named verb takes the plate as a fill alone. `restraint.md`'s check is one primary motion per interaction with its coupled fade. A plate and a glyph growing together on one clock are one growth; a plate growing while an arrow slides is two motions.
- **R-4: the plate takes the control's own rounded shape and does not turn.** No pentagon, no clover, no `clip-path: path()`. The turn Google ships reads only on a shape that is not round (STUDY §2), and a path per destination is markup. This is OWNER-READ question 2's default.
- **R-5: the selection that travels between members is not rebuilt here.** `useSelectionIndicator` stays the one traveller. Proposal A's group plate (a clip rectangle on the group's `::before`) is not taken: it flattens the tab pill's rim and recess, which is W-R.1's shadow ruling to make (`W-R.1.md` §1, question 1), its paint cost is unmeasured, and the indicator it replaces is a childless out-of-flow leaf, the class W-I.8 §1.2 already rules may write its own box (D2's Q-6 (a)). The dock's highlight is W-I.8's.
- **R-6: the glyph is proposal A's contract, on one clock, with four verbs.**
  - The contract: two inherited numbers on every control, `--intent` and `--intent-set`, which every control resets. A control nested in another answers only for itself, at any depth, with no child combinators (the edit button inside keyframes' trigger, BRIEF). Proposal B's descendant selectors would move the inner glyph whenever the outer trigger is hovered.
  - Opt-in: an `svg` that is a direct child of a `.plate`, or one that carries `data-glyph`. Proposal B's rule on every `svg.lucide` inside every `button` and `a` would change every consumer's icons at a repin, which is a changed default, and it has no nested answer.
  - The default verb is grow, on `scale`. Proposal B's default, `stroke-width` 2 to 2.5, copies G M1, which is a font axis; glass's icons are SVG (STUDY §0), the leg is paint, and no record shows an SVG stroke tween.
  - Verbs: grow, nudge, turn, draw. Fill is cut (most Lucide glyphs are open strokes, and the Chat glyph's fill is a cut in the record, G C2). Weight is cut.
  - Draw is proposal B's: one dash as long as the path and a gap that passes along it once, so the curve is whole at both ends and no second path is added. Proposal A's draw needs a quiet copy of the path under the ink.
  - Clock: `--spring-present` over `--spring-present-duration`, the plate's. Proposal A put the glyph on `--spring-press` and called it free of overshoot; that row's damping is 0.8 (`src/composables/motion/spring/springPresets.ts`, the `press` row), which peaks about 1.5 % past rest (*derived*), and W-R.1 may delete the row (its OQ-5).
  - A glyph does not move on keyboard focus (`restraint.md`: "no motion on keyboard-triggered actions"). The plate answers focus by its fade.
- **R-7: presence is proposal B's piece with proposal A's pose.**
  - B's forms stand: a node that stays, a node Vue removes, a swap, a reclaim. One recipe and one clock, no duration or easing prop.
  - The arrival is not `@starting-style`. A node that carries the recipe and is on screen at page load would play its arrival at first paint, which is the fade-up on every element `restraint.md` bans (proposal A, §6 item 10). `transition-behavior: allow-discrete` on `display` is also unwitnessed in WebKit (proposal B's own limit 2; G §5 witnesses `@starting-style` alone). So a node Vue inserts arrives by Vue's own enter classes, and a node that stays is absent by `opacity` and `visibility` with its seat reserved.
  - Amounts and clocks, from the records: in from 4 px (A G2) or from four fifths for a swap (G C1, G C6), out as a fade alone (G C6) in about six tenths of the time (G C6, R E6, R K2, A G4). A swap is out, then in, so only one mark is ever on screen. The fault it cures is on film: `record/refs/strips/kf-play-click-step50ms.png` shows two ghosted glyphs and a doubled label for three frames (R K4).
  - `group` (siblings that make room) is not taken. It has no stated mechanism for a member that leaves in flow, and the DataTable's rows have the same gap (proposal B, §10).
- **R-8: follow is proposal B's, and it is the one piece that animates layout.**
  - The study's own form (settle the box, then reveal it through a clip that tweens from the old rectangle) is struck by the study's own strip: frame three of `record/refs/strips/kf-chrome-dock-hover-step75ms.png` is a new layout uncovered by a moving edge, the full row cut mid-word. A clip also cannot show a box larger than its layout, so a shrink needs the old size held anyway.
  - Every source that tweens a box's size pays layout on one contained box: Apple's flyout, 18 layouts in 2 ms (A §1); Emil's panel (R E4). `motion-canon.md` P5 names the case and allows it as a one-shot reclaim on an audited allowlist.
  - So the size itself is tweened, once per change, on the smallest box, by one writer. It ships only if the prototype's reading holds (item 1 of the owed list). A site that fails the reading reserves its footprint and gets no second mechanism.
  - W-R.1 §2.7 ("one height engine for Collapsible and Accordion") must not become a second size writer. This wave does not touch the disclosure keyframes; it offers the reclaim writer to W-R.1's OQ-11 as a candidate with no wrapper.
- **R-9: reduced motion is cured by authorized fades, not by deleting the fallback.**
  - Proposal B deleted the universal zeroing (`src/styles/utilities/a11y-overrides.css:46-53`) and shortened the clocks in the tokens. Two things rule that out. The fallback is a standing ruling: a global reduced-motion rule may suppress motion and may not create a transition (the header of that file; BJ's `BAND-FEEDBACK-MOTION.md`, §PRM-AUTHORIZED-SET). And the rule matches `*`, so it also quiets every consumer's own untokened motion; deleting it would return that motion in full to reduced-motion users.
  - The route that file already provides is taken (proposal A): each recipe that owns a fade joins the enumerated authorized set with its opacity and colour legs on `--duration-instant`. Travel is dropped because every travel amount multiplies `--motion-weight`, which is 0 under reduced motion (`src/styles/tokens/scheme-motion.css:291`).
  - The law is the one W-I.8 §1.6 and W-B.18 R-11 already state: under reduced motion nothing travels or resizes over frames, and the change is carried by a fade of 144 ms or less. A box that follows its content lands in one frame and its content fades. Proposal B's 100 ms size tween under reduced motion is not taken.
- **R-10: idle and busy are one breath of the plate, declared.** Proposal A's: `data-idle` and `aria-busy` breathe the plate's `opacity` on the Skeleton's clock (R E9: one opacity loop). Glass sets `data-idle` on nothing. A consumer declares it on the one large or focused element of a view; small controls stay still at rest (BRIEF, reading 2). The plate does not show progress: the Progress fill does.
- **R-11: the press is a proposal for the owner, and its tone ships either way.**
  - Either way: a pressed plate is at full strength for as long as the press lasts. That is W-R.1 §2.3's press mark ("as tone"), and the two must be one rule, so the plate reads `:active` and `[data-press]`.
  - The proposal: a uniform `scale` to 0.97 on the control, down and back on the `press` row, no bounce to see, no inset shadow, no brightness filter, no gleam. No source ships it whole: Apple's web press is a 2 % colour step and its one shrink is a cut (A §9), Family's press is the hover lift ending (R F3), Rauno's "~0.96" is words (R §7). It is glass's own.
  - It is built only after its strip is shown to him (OWNER-READ question 1; default yes on buttons and icon buttons, with cards, rows and large surfaces answering by tone alone). It lands in 12.0.0 beside W-R.1's deletion of the press spring.
- **R-12: the focus ring fades.** OWNER-READ question 3's default: `outline-color` over `--duration-instant`, in and out, no swell. It is a colour, not a movement.
- **R-13: the no-snap check ships as a consumer's test helper** (atlas's ask), under its own subpath, outside every runtime entry.

## Scope

### The plate (11.2.0)

`src/styles/glass/plate.css`, a central partial beside `reveal.css`, imported by the main stylesheet. One class, three optional custom properties, two attributes.

| write | meaning |
|---|---|
| `class="plate"` | the control has a hover, focus, pressed, on and busy state from one rule |
| `--plate-tone` | the plate's one colour; default `currentColor`. The same colour, stronger, is "engaged" (`affordance-map.md`). A consumer with a colour per seat sets it per seat |
| `--plate-from` | the scale the plate grows from; default 0.8, 1 for a fill alone |
| `data-idle` | the plate breathes at rest; declared by the consumer, one per view |
| `aria-busy="true"` | the plate holds at full strength and breathes |

`--fill-hover` (0.05) and `--fill-selected` (0.12) already exist (`src/styles/tokens/color-radius.css:156-157`) and set the two strengths; the dialog's close button paints the same two today (`src/components/dialog/styles.css:115-140`).

```css
@layer components {
    :where(.plate) {
        position: relative;
        isolation: isolate;
    }

    .plate::before {
        content: "";
        position: absolute;
        inset: 0;
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
            scale var(--spring-present-duration) var(--spring-present);
    }

    /* R-3: a glyph with a named verb takes the plate as a fill alone. */
    .plate:has(> [data-glyph]:not([data-glyph=""], [data-glyph="grow"])) {
        --plate-from: 1;
    }

    @media (hover: hover) {
        .plate:hover:not(:disabled, [aria-disabled="true"])::before {
            opacity: calc(var(--fill-hover) / var(--fill-selected));
            scale: 1;
        }
    }
    .plate:is(:focus-visible, [data-highlighted])::before {
        opacity: calc(var(--fill-hover) / var(--fill-selected));
        scale: 1;
    }

    .plate:is([aria-pressed="true"], [aria-expanded="true"],
              [aria-current]:not([aria-current="false"]),
              [data-state="on"], [data-state="open"], [data-state="active"],
              [aria-busy="true"])::before,
    .plate:is(:active, [data-press]):not(:disabled, [aria-disabled="true"])::before {
        opacity: 1;
        scale: 1;
    }

    @media (prefers-reduced-motion: no-preference) {
        .plate[data-idle]:not(:hover, :focus-visible, :active)::before,
        .plate[aria-busy="true"]::before {
            animation: plate-breathe var(--skeleton-breathe-duration) var(--ease-standard)
                infinite alternate;
        }
    }
}

@keyframes plate-breathe {
    to { opacity: calc(var(--fill-hover) / var(--fill-selected)); }
}
```

- The keyframe names only its far end, so each state begins from the frame on screen: an idle plate breathes up from nothing, a busy one down from full strength.
- The idle selector stands down under a pointer or a focus, because an animation outranks the hover declaration. Proposal A's rule did not, so a hovered idle plate would have kept breathing.
- The breath's clock is the Skeleton's (1.1 s each way, `src/components/skeleton/Skeleton.vue:147-160`). The build moves that literal to one token both read; `--skeleton-breathe-duration` is this text's name for it.
- At glass's default `--motion-weight` (0.618, `scheme-motion.css:138`) the plate starts at 0.876, which is 2.5 px a side on a 40 px seat. Proposal B's amounts were stated as if the weight were 1.
- In and out are one declaration: fade 0.12 s, growth 0.2 s, from wherever the plate is. The fade lands before the growth ("the fading happens FASTER than the stretching", `restraint.md`). A pointer that leaves mid-travel turns the plate round; nothing restarts.
- Safari, documented floors: individual `scale` 14.1, `:has()` 15.4, `:focus-visible` 15.4, `color-mix()` 16.2, `linear()` in the spring token 17.2. Glass's floor is 17.5 already (`@starting-style` in `src/styles/glass/reveal.css`). No fallback.
- Cost (*estimate*): about 0.4 KB gzip; 0 nodes; one pseudo-element; two compositor properties; no script, listener or observer.

### The glyph (11.2.0)

`src/styles/glass/glyph.css`. No component, directive or composable. One attribute on the `svg` (or on a `<g>` or `<path>` inside it), and at most five custom properties.

| write | while its control is hovered | tune |
|---|---|---|
| nothing, on an `svg` that is a direct child of a `.plate`; or `data-glyph` | grows by 0.08 (0.05 at the default weight: half a pixel a side at 20 px) | `--glyph-grow` |
| `data-glyph="nudge"` | moves 2 px the way it points | `--glyph-dx`, `--glyph-dy` |
| `data-glyph="turn"` | turns 15 degrees | `--glyph-turn` |
| `data-glyph="draw"`, with `pathLength="1"` on the stroke | a gap passes along the curve once; it stays passed while the control is on or open | |

On any verb, `--glyph-flip` turns the glyph by that angle while its control is on or open (a chevron: `--glyph-flip: 0.5turn`). A glyph that changes to another is presence's swap, not a verb.

```css
@layer components {
    :where(.plate, button, a[href], summary, [role="button"], [role="tab"],
           [role="option"], [role="menuitem"], [role="menuitemcheckbox"],
           [role="menuitemradio"]) {
        --intent: 0;      /* 1 while a pointer is over this control */
        --intent-set: 0;  /* 1 while this control is on, open or current */

        @media (hover: hover) {
            &:hover:not(:disabled, [aria-disabled="true"]) { --intent: 1; }
        }
        &:is([aria-pressed="true"], [aria-expanded="true"], [aria-checked="true"],
             [aria-current]:not([aria-current="false"]),
             [data-state="open"], [data-state="on"], [data-state="active"],
             [data-state="checked"]) { --intent-set: 1; }
    }

    :where([data-glyph], .plate > svg) {
        transform-box: fill-box;
        transform-origin: center;
        rotate: calc(var(--glyph-flip, 0deg) * var(--intent-set, 0));
        transition:
            scale var(--spring-present-duration) var(--spring-present),
            translate var(--spring-present-duration) var(--spring-present),
            rotate var(--spring-present-duration) var(--spring-present);
    }
    :where([data-glyph=""], [data-glyph="grow"], .plate > svg:not([data-glyph])) {
        scale: calc(1 + var(--glyph-grow, 0.08) * var(--motion-weight, 1) * var(--intent, 0));
    }
    :where([data-glyph="nudge"]) {
        translate:
            calc(var(--glyph-dx, 2px) * var(--motion-weight, 1) * var(--intent, 0))
            calc(var(--glyph-dy, 0px) * var(--motion-weight, 1) * var(--intent, 0));
    }
    :where([data-glyph="turn"]) {
        rotate: calc(
            var(--glyph-turn, 15deg) * var(--motion-weight, 1) * var(--intent, 0) +
            var(--glyph-flip, 0deg) * var(--intent-set, 0)
        );
    }
    :where([data-glyph="draw"][pathLength="1"], [data-glyph="draw"] [pathLength="1"]) {
        stroke-dasharray: 1 0.3;
        stroke-dashoffset: calc(-1.3 * max(var(--intent, 0), var(--intent-set, 0)));
        transition: stroke-dashoffset var(--duration-fast) var(--ease-standard);
    }
}
```

- The numbers are plain custom properties and do not animate. The glyph computes its own `scale`, `translate` or `rotate` from them, and the transition runs on the glyph. `:where()` keeps every rule at zero specificity, so any consumer rule wins.
- One declaration serves both ways: 0.2 s in and 0.2 s back, from wherever the glyph is (STUDY §1, the first pattern: a hover leaves the way it came; G M1, A K1).
- A flip is the state's own change and is not scaled by the weight. A chevron turns when its control opens, not under the pointer.
- On a pick (keyframes: "the curve should animate in the dropdown icon on click") the trigger's glyph is replaced, so it is a swap; while the menu is open the trigger's curve holds its passed state.
- Draw repaints the glyph's own box for 0.2 s. It is the glyph's one paint leg, and the cost gate reads it as paint. There is no path morph: `d: path()` is not in Safari (G W13).
- Safari: individual `translate` and `rotate` 14.1; `transform-box: fill-box` 11; nested rules 17.2. One thing is unwitnessed in any WebKit: `transform-box: fill-box` with an individual `rotate` on an inner `<g>`. The prototype reads it.
- Cost (*estimate*): about 0.5 KB gzip; 0 nodes; one property per glyph per hover. On hover the control and its subtree re-resolve two inherited numbers.

### Presence (11.2.0)

`src/styles/glass/presence.css` and `src/composables/motion/presence/Presence.ts`, exported from the root and from `./motion`.

```html
<!-- A node that stays, in a seat that is reserved: no import, no component. -->
<Check data-presence="swap" :data-absent="!checked || undefined" />

<!-- A node Vue removes: the component renders no element. -->
<Presence><p v-if="note">…</p></Presence>

<!-- A node replaced in its seat. -->
<Presence swap><Pause v-if="playing" /><Play v-else /></Presence>

<!-- A node whose arrival must push what follows it. -->
<Presence reclaim><p v-if="error" class="labeled-field-error">…</p></Presence>
```

Two boolean props, `swap` and `reclaim`, and no others. `<Presence>` is Vue's `<Transition>` under one of two names, `presence` or `presence-swap` (with `mode="out-in"`), and under `reclaim` it adds follow's two hooks. It renders no element and stamps nothing on its child.

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
        transition:
            opacity var(--spring-present-exit-duration) var(--ease-out),
            scale var(--spring-present-exit-duration) var(--spring-present);
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
}
```

| leg | in | out |
|---|---|---|
| opacity | `--duration-control` (0.12 s), `--ease-out` | `--spring-present-exit-duration` (0.12 s), `--ease-out` |
| travel (4 px), or scale for a swap | `--spring-present-duration` (0.2 s) on `--spring-present` | none for a plain leave; the swap's scale on the exit clock |

- A leaving node fades and does not slide back (G C6). The node that stays resets its 4 px after it is invisible.
- Nothing plays at page load: the node that stays has no arrival rule, and Vue's `<Transition>` plays none on first render.
- `[data-state="unchecked"]` is in the absent list so that a reka indicator held with `force-mount` needs no second attribute, as the checkbox mark already works (`src/styles/glass/control-bit.css:343-372`).
- Vue's `<Transition>` schedules two animation frames per enter and per leave, which is why `Button.vue:192-196` refuses it. A control that is on screen in hundreds uses the node that stays.
- Safari: individual `scale` and `translate` 14.1. No `@starting-style`, no `allow-discrete`. No fallback.
- Cost (*estimate*): about 0.5 KB gzip of CSS and 0.3 KB of script; 0 nodes; opacity, translate and scale. A swap costs two layouts in the one frame where the old node goes and the new one comes.

### Follow (11.2.0, on the reading of item 1)

`src/composables/motion/presence/follow.ts`, exported from `./motion`.

```ts
/** Call BEFORE the change. Resolves when the box has settled. */
function follow(el: HTMLElement | null): Promise<void>;
```

A component calls it from a watcher that runs before Vue patches (`watch(count, () => follow(surface.value), { flush: "pre" })`); a consumer calls it the same way, or directly before it sets state.

- It reads the box (`offsetWidth`, `offsetHeight`; layout is clean, so the read forces nothing), waits one tick for the caller's change, cancels its own earlier animation on that element, reads the box again (the one forced layout), and runs one Web Animation of `inline-size` and `block-size` between the two, with `overflow: clip` held inside the same animation. The clock is `springPreset("present")` through `springTimingFunction` times the tempo, the derivation `useElementMorph.ts` uses. A Web Animation leaves no inline style, so nothing is cleaned up.
- A change that arrives in flight starts from the size on screen. It does not keep the old tween's speed; a CSS or Web Animation clock cannot carry it. Item 7 of the owed list reads whether the restart shows.
- `reclaim` is the same writer from zero: the node's `block-size` runs 0 to its height (and back), with the one margin that cancels its parent's `row-gap`, inside `<Presence>`'s hooks. A node given to `reclaim` carries no block padding, border or margin of its own.
- **The cost is bounded by four rules, which are the allowlist row's text:** one shot per change, for at most the `present` clock; the smallest box, never an ancestor; one writer, the only code in this wave that animates a size; and a reading before it ships.
- Under reduced motion it does not run: the box lands in one frame and what arrived in it fades (R-9).
- Safari: `element.animate` 13.1; `linear()` passed to it 17.2; `overflow: clip` 16.
- It does not serve the dock, which has its own measured model (W-I.8 §1.2), a popover that flips sides (a move, not a resize), or the enlarged plate's close (a morph between two rectangles).

### The authorized fades under reduced motion (11.2.0)

In `src/styles/utilities/a11y-overrides.css`, as rows of the enumerated set that file already defines. Each row is a class or attribute selector, since the fallback it outranks is `*` in the same layer.

| recipe | what stays under reduced motion |
|---|---|
| `.plate::before` | `opacity` on `--duration-instant`; no breath |
| `[data-presence]` and the four `-active` classes of `<Presence>` | `opacity` (and `visibility`) on `--duration-instant` |
| `.focus-ring` | `outline-color` on `--duration-instant` |
| the top-layer reveal (`.glass-reveal`: dialog, sheet, popover, tooltip, menu, select, toast) | enter: `opacity` alone on `--duration-instant`; exit: an opacity-only keyframe on the same clock in place of the full one |
| the control faces (`control-bit.css`: switch, checkbox, radio), the field control, the tab label, the menu row's fill, the carousel member, the expandable trigger | the colour or opacity leg each already authors, on `--duration-instant` |

Travel needs no row: every amount in this wave's pieces multiplies `--motion-weight`. The existing local `transition: none` rows on spatial legs (the switch thumb, the tab indicator, the sheet grip, the scroll rim) stay; under the law a move lands at once and its colour fades. The dock's own reduced path is W-I.8 §1.6. The Slider's shell and readout are W-B.18's row and join this set with it.

### The press (12.0.0, on the owner's answer)

In `plate.css`, beside the plate:

```css
.plate:is(:active, [data-press]):not(:disabled, [aria-disabled="true"]) {
    scale: var(--scale-press-sm);
}
.plate {
    transition: scale var(--spring-press-duration) var(--spring-press);
}
```

Uniform, 0.97, 0.12 s down and 0.12 s back, with the plate at full strength. 0 nodes, 0 listeners, one property. A control nested in a trigger is a `.plate` of its own and takes it (O-284). It reads two names W-R.1 §2.1 deletes (`--scale-press-sm`, and the `press` row under its OQ-5) and fails W-R.1's static gate "No press scale" as written; the orchestrator amends both on a yes. On a no, the rule is not written and nothing else in this wave changes.

### The focus ring (11.2.0)

One declaration on `.focus-ring` (`src/styles/utilities/base.css:144-151`): the outline is always declared, its colour transparent at rest, and `outline-color` transitions over `--duration-instant` on `--ease-standard`. No width or offset animates.

### The no-snap check (11.2.0)

`src/testing/no-snap/`, exported as `./no-snap`, with a row in `scripts/lib/subpath-policy.mjs`. It imports nothing from Playwright; it takes any page object with an `evaluate` method.

```ts
/** Run one state change and sample it. */
function sampleChange(page, change: {
    trigger: () => Promise<void>;      // hover, click, key, a store write
    targets: string[];                 // selectors to read
    properties?: string[];             // default: the box, opacity, scale, translate, rotate,
                                       // clip-path, colours, radius, stroke-dashoffset
    step?: number;                     // ms between samples; default 1000 / 60
}): Promise<Samples>;

/** Judge the samples against the law. */
function judgeChange(samples: Samples, bound?: { slack?: number }): Verdict;
```

- **Sampling** is the recorders' method (G and A, headers): read the rest state, trigger, pause every running animation (pseudo-elements included), seek all of them to 0, step, 2 × step and so on, and read each target at each seek; then let them finish and read the end state. For a page that moves by script it takes a clock to step instead (`page.clock`), as recorder 3 did.
- **The verdict has four clauses.** A property whose rest value differs before and after has an animation covering it (otherwise it is a cut). The first sample equals the rest state and the last equals the end state. No step between two samples is more than `slack` (1.15, W-I.8's figure) times the largest step of that leg's own easing at the same spacing, times its travel; the easing is read by seeking a probe animation that carries the same timing, so nothing is parsed. A node that leaves is still in the document at every sample before its last.
- For a leg with no animation object (script on a stepped clock) the bound is the plain one: the end state is not reached in the first changed frame, and no frame covers more than a third of the travel (value.js's rubric, `inbound/VALUE-PRECEPTS-2026-11-12.md` §3).
- Glass's own G-TWEEN runs through it, so the helper a consumer gets is the one that gated the release.

### Where glass uses the pieces

**In 11.2.0**, each a few lines where today there is a cut or no hover:

| site | today | with the pieces |
|---|---|---|
| the ten failing hovers of CENSUS, less the DarkModeToggle and the text Button | no hover, or text colour alone | `class="plate"`, with `--plate-from: 1` on the rows and tabs. A site whose `::before` the gleam holds waits for 12.0.0 |
| the text Button (`button/styles.css:205-207`) | an underline that appears at once | the same underline, its `text-decoration-color` tweened on `--duration-control` |
| the DarkModeToggle | opacity 0.8 to 1 | its sun and moon take `data-glyph="turn"` (O-279's hover). Its plate is its seat's, which is W-I.8's |
| every chevron (`disclosure.css:96-98`; the SelectTrigger's classes; the menu sub-trigger, which does not move today; `dock/styles/controls/triggers.css:152-157` after W-I.8's build) | three separate rules and one missing | `data-glyph="nudge"` with `--glyph-flip` |
| icon pairs (`DockBackgroundToggle.vue:72-73`, `EasingPicker.vue:577-588`, `Checkbox.vue:48-49`, the ExpandableContainer's two icons, the DataTable sort glyph) | `v-if`, a cut | `<Presence swap>`, or the node that stays inside a mark |
| menu and select marks (`DropdownMenuCheckboxItem.vue:50-53`, `DropdownMenuRadioItem.vue:46-49`, `SelectItem.vue:76-84`) | reka mounts and unmounts them | `force-mount` with `data-presence="swap"` |
| the field's error and description line (`LabeledField.vue:50, 64-71`) | pushes the form in one frame | `<Presence reclaim>` |
| the command list in its dialog; a dialog, popover or tooltip whose content changes | resizes in one frame | one `follow()` on the surface |
| the select value and an auto-width trigger (`SelectValue.vue:35`, `SegmentedTabs.vue:162-170`); the EasingPicker's transport label | text and width jump | `<Presence swap>` on the text, `follow()` on the trigger |
| Metric's value, the Avatar's image, the DataTable's loading, empty and error states, the Command empty state, the carousel counter, the end-of-list line, the configurator's layer actions, the EasingPicker's modes and failure line | cut in | `<Presence swap>` or `<Presence>`; `follow()` where the sizes differ |
| the Timeline (`Timeline.vue:373, 578-697`) | the mark snaps on hover and state; the check and the old detail are cut | the mark is a `.plate`; the disc's `background` gains its transition; the check and the detail are swaps |
| the pager dots' edge pip and leaving pip (`PagerDots.vue:353-370, 500-504`) | shrinks at once; cut | `scale` and `opacity` on the pip's own transition; the leaving pip is held for its fade |
| small property legs: the Progress error recolour (`Progress.vue:165-168`), the data-table's selected rim (`data-table/styles.css:113-116`), the sheet grip's `inline-size` leg (`sheet/styles.css:275-288`) | no transition, or a layout leg | one transition each on the shared clocks; the grip moves by `scaleX` |

The DotRing under InfiniteScroll keeps its own `glass-dot-ring` transition (`InfiniteScroll.vue:66`, `src/components/_shared/feedback/dot-ring.css:124-160`). It is tweened both ways today, and its leave is the ring's own hand-off.

**In 12.0.0**, in W-R.1's run, each with a MIGRATION row:

- `.plate` on every control whose whole hover is the gleam (the glass Button, the SelectTrigger, the Chip, the dock's controls), in the commit that deletes the gleam (`W-R.1.md` §2.1). The dock seat's rest-fill token (W-I.8, "Inputs banked 2026-11-12") and `--plate-tone` are one token.
- The dialog's close button drops its private plate for the shared one (`dialog/styles.css:115-140`).
- Menu rows take `.plate` at `--plate-from: 1` and lose the 1 px lift and four of their six transition legs (`src/components/_shared/menu/menu.css:11, 30-36, 69`).
- The Button's loading state stops inserting a node that widens it (`Button.vue:192-198`). `loading` stamps `aria-busy`, the plate breathes and the label holds. This is the owner's by strip (OQ-3).
- The press, on the owner's answer.
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
| the press spring and its eight listeners on the Button; the press-coupled gleam; the non-uniform squash (O-285) | `W-R.1.md` §2.1 | 12.0.0 | W-R.1. The CSS press replaces it on a yes |
| the Chip's selected growth on an overshooting curve and its radial flood; the Select menu's three gradients; the indeterminate track's gradient sweep | `W-R.1.md` §2.2 and §2.5 | 12.0.0 | W-R.1. The plate's breath is what the indeterminate track becomes |
| the dock's per-control hover fills and the five-property selected seat | | 11.2.0 or 12.0.0 | W-I.8 and `W-R.1.md` §2.6, G5 |

Nothing is added to `src` that these do not outweigh: three CSS partials, one functional component, one function and a test helper.

### Not in this wave

- A shaped plate, a plate that turns, and a selection that travels (R-4, R-5).
- Members of a list that make room for each other: toasts, table rows.
- The theme flip, the enlarged plate's close, a popover's side flip, the card's condensing header, the StatusDot's silhouettes. Each is a new row (the census section).
- The dock in any state (W-I.8), the Slider (W-B.18), the text mark (W-B.16).
- A path morph between two glyphs. `d: path()` is not in Safari (G W13); Apple's SMIL route (A G7) is unmeasured in WebKit.
- An idle state on any glass default.
- Shipping Safari. Every reading will be Playwright WebKit; the app itself is one owner glance at the close (OQ-6).

## Owed before any build seat

The prototype seat reads these, in Chromium headless shell and Playwright WebKit, and writes each number into this file. Items 1 to 3 can strike a piece.

1. **Follow's layout.** Layout time per frame, at 4x CPU, on three cases: the command dialog with 50 rows, an error line in a twelve-field form, a select trigger whose value changes. The budget is 1 ms a frame (*target*, proposal B's). A case over it reserves its footprint; if all three are over, follow and `reclaim` leave the wave and their rows go to INBOUND.
2. **The plate on a blurred host.** Frame time for hover in and out across twelve plate seats on a blurred surface, and whether each engine keeps the two legs off the main thread.
3. **Leaving a breath.** The first frame after `data-idle` or `aria-busy` drops. The rule relies on the transition starting from the animated value; if WebKit starts it from the underlying value, that frame is a jump and the breath takes another form.
4. **A swap's hand-over.** That no empty frame is painted between the old mark's removal and the new one's insertion, and a second toggle at 60 ms.
5. **The inner group.** The theme toggle's sun with `transform-box: fill-box` and an individual `rotate`, in WebKit.
6. **Amounts, as strips for the owner:** the plate at 0.876 on a 44 px seat and as a fill on a row, with the leave; the glyph's grow at 16 and 24 px in both themes; the draw's gap on an easing curve; the press at 0.97 (OWNER-READ question 1); a busy Button with no ring (OQ-3).
7. **Follow, interrupted** mid-flight: whether the restart of the clock shows.
8. **Bytes:** the three partials and the script, built and gzipped. These replace the estimates in G-BYTES.

## Gates

Each gate is read once RED and once GREEN, with its bite read once. RED is master at `a7e0337c5`, or the record named. Browser cells run on the prototype seat's harness, moved to `tests-visual/intent-motion/`, in Chromium headless shell and Playwright WebKit at 1440, light, with one 390 coarse cell where it is named. Timing is the claim, so no theme or width is repeated. One browser per run, a new context per cell, every run through `guarded`, every WebKit run through `guarded --exclusive webkit`.

**Static and vitest.**

- **G-CLOCK.** `git grep -nE '[0-9.]+m?s\b|cubic-bezier|linear\(' -- src/styles/glass/plate.css src/styles/glass/glyph.css src/styles/glass/presence.css src/composables/motion/presence` prints only the `0s` legs of the node that stays. Every other duration and curve is a token. Bite: one `200ms` literal.
- **G-BYTES.** The three partials add at most 1.5 KB gzip to the built stylesheet, and `./motion` grows by at most 1 KB gzip (*estimates*; item 8's readings plus a tenth replace both before the build). No runtime entry's boot graph contains `no-snap`. Bite: importing the helper from the root barrel.
- **G-API.** A type test: `<Presence>` admits `swap` and `reclaim` and fails `vue-tsc` on `duration`, `easing`, `name` and `group`; `follow` takes one argument. `renderToString` of each `<Presence>` form emits the child and nothing else: no wrapper, no added class or attribute. Bite: a `tag` on the transition.
- **G-EXPORT.** `./no-snap` resolves from a consumer install with no Playwright in the tree, and `judgeChange` fails four planted series: a cut, a first frame off rest, a step of half the travel, a node removed before its fade ends. Bite: each plant passing.
- **G-CUT (12.0.0).** `git grep -nE 'pane-swap|metric-swap|tab-fade|button-mark|menu-row-lift' -- src` prints nothing, and the MIGRATION table names each. On master it prints `menu.css:11, 69, 88`, `Button.vue:197`, `button/styles.css:120` and the recipes in `transitions.css`.

**In a browser, both engines.**

- **G-TWEEN.** Through `./no-snap`, every cell in and out.
  - The pieces: the plate (hover, keyboard focus, press, on and off, busy on and off, idle on and off) on a 40 px seat and on a row; each glyph verb, a flip, and a leave at 60 ms; presence (plain, swap, the node that stays, reclaim); follow (grow, shrink, a second change at 80 ms); the focus ring; the press, if it ships.
  - The rows: one cell for each line of "Where glass uses the pieces", 11.2.0 and 12.0.0 each in its release.
  - Passes when: no watched property changes without an animation covering it, and no neighbour's box changes at all except under follow; the first sample equals the rest state and the last the end state (within 0.01 of opacity, 0.002 of scale, 0.5 px); no step exceeds 1.15 times the leg's own eased step; in a swap, the two marks are never both above 0.05 opacity; a leave at 60 ms continues from the value on screen.
  - One 390 coarse cell: a tap shows the plate at full strength for the press and leaves no plate after release.
  - RED: CENSUS's readings of each row; on film, the Play and Pause swap (`kf-play-click-step50ms.png`) and Google's own leave (`chat-out-board.png`), which the check must fail. Bites: `v-if` restored on one swap; the plate's `opacity` transition removed; a plate that starts at 0.75 opacity.
- **G-COST.**
  - DOM nodes added per control: 0 for every piece, counted at rest, mid-change and after. A swap holds one mark at rest.
  - Properties animated, read from `document.getAnimations()` in both engines: `opacity`, `scale`, `translate` and `rotate` only. Three declared exceptions, each named in the wave record with its box: `stroke-dashoffset` (draw, the glyph's own `svg`), `outline-color` and `text-decoration-color` (paint, one control), and `inline-size`, `block-size` and one margin (follow and `reclaim` only).
  - Chromium trace, each change in and out: 0 `Layout` events between the first and last animation frame for the plate, the glyph, the breath, the press, the focus ring and presence. Presence may lay out only in the frame a node is inserted or removed. Follow lays out each frame within item 1's budget.
  - Frame time, Chromium at 4x CPU: the longest main-thread task inside a hover across twelve seats on a blurred surface is 4 ms or less (*target*; item 2's reading replaces it). WebKit has no such counter (A, header) and is recorded as unmeasured.
  - Bites: the plate's growth written as `inset`; a `width` leg on a glyph.
- **G-REST.** A page of 40 plates, 40 glyphs and 10 nodes that stay: `document.getAnimations()` is empty at every sample of the first 500 ms after load and at rest after each change. With one `data-idle`, exactly one animation runs, on that `::before`, on `opacity`; with the pointer on it, none. `git grep -nE 'Observer|addEventListener|requestAnimationFrame|setInterval' -- src/composables/motion/presence` prints nothing. Bites: `@starting-style` on `[data-presence]` plays ten arrivals at load; the idle rule without its `:not()`.
- **G-PRM.** Under `prefers-reduced-motion: reduce`, on every G-TWEEN cell and on the surfaces of the authorized table (a dialog, a sheet, a popover, a tooltip, a menu, a select and a toast opening and closing; a switch, a checkbox, a radio, a tab change, a field taking focus, a menu row's highlight, a carousel step, the expandable trigger):
  - no `scale`, `translate`, `rotate`, `clip-path` or size takes more than two values, and no glyph verb moves at all;
  - every change that paints differently at its two ends shows `opacity` or a colour at three or more values over 50 ms to 144 ms (O-198's bound);
  - no animation loops.
  - RED: every cell lands in one frame (CENSUS, "What holds", 4). Bites: one authorized row removed; a travel amount with no `--motion-weight`.
- **G-BARE.** With scripts disabled, on static markup that uses the classes and on the server's render of each `<Presence>` form:
  - each control paints its rest state, 0 pixels from the same markup without `plate` and `data-glyph` (a channel delta over 48 of 255);
  - a control marked `aria-pressed="true"` paints its plate, and a draw curve is whole;
  - a `data-absent` node paints nothing and keeps its seat's box;
  - the plate's hover and the glyph's verbs still pass their G-TWEEN cells, since no script drives them.
  - Bite: a rest state that needs a class a script adds.
- **G-RESTRAINT.** Counted on the built CSS for each piece's selectors and on the fixture's computed styles, against these ceilings:

  | | plate | glyph | presence | follow | press | focus ring |
  |---|---|---|---|---|---|---|
  | shadows, gradients, blurs, filters | 0 | 0 | 0 | 0 | 0 | 0 |
  | wrappers or nodes added | 0 | 0 | 0 | 0 | 0 | 0 |
  | pseudo-elements | 1 | 0 | 0 | 0 | 0 | 0 |
  | transition legs declared | 2 | 3 (1 for draw) | 4 | 0 (one Web Animation) | 1 | 1 |
  | animations running in one change | 2 | 1 | 2 | 1 | 1 | 1 |

  And per control, whatever it composes: at most 3 animations running on a hover, 2 on a press, 1 at a declared idle and 0 at rest; on a hover the spatial legs are scale alone (the plate and its glyph), or one glyph verb with the plate at full size (R-3). RED: the menu row's six legs and lift (`menu.css:11, 30-36, 69`); the Button's press, a spring fed by eight listeners with a gleam coupled to it (`Button.vue:183-190`). Bites: a `box-shadow` on the plate; a nudging glyph over a plate at 0.8.
- **G-NEST.** A `.plate` button inside a `.plate` trigger: the pointer over the inner one moves the inner glyph and plate and not the outer glyph; over the trigger elsewhere, the reverse. Bite: the reset of `--intent` dropped from the inner control.
- **G-HIT (12.0.0, if the press ships).** A click 1 px inside each edge of a 40 px and a 24 px pressed control still fires; the control's `scale` never rises above 1.001 on the way back. Bite: a press to 0.9.

**The existing specs.** A spec that pins something this wave deletes (a `v-if` swap, the reka indicator's mount, the reduced-motion cut of an authorized row, the Button's ring) is rewritten with it and named in the build's record.

That is five static or vitest gates and eight browser gates; G-CUT and G-HIT are 12.0.0's. One challenge pass and one fold on the build; a critic gates on this list and adds no row.

## The census

Rows are CENSUS's twenty by number, then its tables. "This wave" means a cell of G-TWEEN.

| row | cured by |
|---|---|
| 1, the dock re-fits at once; 13, its regions mount; the corner at arm and settle; the crossfade reserve; the cross-axis height | **W-I.8** (§1.5, and the owner law of O-248) |
| 2, the focus ring | this wave (R-12), on OWNER-READ question 3's default |
| 3, the field's error line | this wave: `reclaim` |
| 4, the command list and its dialog | this wave: follow |
| 5, the Button's loading ring | this wave, 12.0.0 (OQ-3) |
| 6, the auto-width select trigger | this wave: a swap and follow. The dock's select trigger is **W-I.8**'s content episode |
| 7, the dock's active seat | **W-I.8** (the highlight and the rest-fill token) and **W-R.1** §2.6, G5 (hover against active) |
| 8, menu and select marks | this wave: the node that stays |
| 9, the other toasts jump | new row |
| 10, DataTable | states: this wave. Rows added, removed or re-sorted: new row |
| 11, reduced motion cuts everything | this wave, for the authorized table. The dock: **W-I.8** §1.6. The Slider: **W-B.18** |
| 12, icon swaps | this wave: a swap |
| 14, the slider's loupe | **W-B.18** (it removes the loupe in 11.1.1) |
| 15, popovers and tooltips | resize on a content change: this wave. The side flip: new row |
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

atlas's thirteen glass rows (`../design/intent-motion/inbound/ATLAS-SNAP-CENSUS.md`), in its order: the enlarged plate's close (new row); the whole page on light and dark (new row, with 16); the rail's fold and linger (**W-I.8**, O-275); the Collapsible's chevron (this wave); the tooltip's and the popover's open and close (they hold on master, CENSUS "What holds" 1; atlas is told); the sheet that resizes while open (this wave: follow); the plate tools tray's hover expand (**W-I.8**, O-276); the DataTable's rows, twice (new row); the Surface's rim class (new row); the carousel and the expandable trigger under reduced motion (this wave).

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

## Consumer half

Each consumer changes at its own repin. glass tells atlas of every default here at booking and at publish.

- **atlas** adopts the plate, the glyph and `./no-snap`, and builds none of its own (BRIEF). `<Presence>` and `follow()` are the "exit-aware presence wrapper" and the "measured size tween" its census names as root cures; `<Presence>` adds no element. Its own blanket (`design/foundations/base.css:91`) is atlas's to narrow; `[data-presence]` fades under reduced motion with nothing more set. Its detail sheet's `v-if="item"` is its own cut.
- **value.js.** The Palettes to Mix card swap (`demo flipRegions.ts:84`) becomes `<Presence swap>` with one `follow()` on the container: two cards' text is never on screen together, and the container makes one tween from wherever it is. The theme toggle's hover arrives with the glyph (O-279).
- **keyframes.** The direction menu's arrows take `data-glyph="nudge"` with `--glyph-dx` and `--glyph-dy`; its easing curves take `data-glyph="draw"` and `pathLength="1"`; the trigger's curve is a swap on each pick; Play and Pause become `<Presence swap>` and the whole-dock view transition around them goes (R K4). Its live scene glyphs are its own and are kept as they are.
- **speedtest.** Its idle pane breathes on `--skeleton-breathe-duration`, or by `data-idle` if the pane's action is a `.plate`. Its "idle is still" gate is already reversed (BRIEF).
- **daraksha.** Nothing to change for this wave; its dock rows are W-I.8's.
- A consumer that used `fade`, `tab-fade`, `pane-swap` or `metric-swap` as transition names moves to `<Presence>` at 12.0.0.

## Open questions

Each has a default, and the build follows it unless the answer comes first.

- **OQ-1 (owner; OWNER-READ question 1).** The press shrink. Default: yes on buttons and icon buttons; cards, rows and large surfaces answer by tone alone. The strip is item 6's.
- **OQ-2 (owner; OWNER-READ questions 2 to 4).** The plain plate, the 100 ms focus fade, and how things leave. Defaults as ruled (R-4, R-12, R-7).
- **OQ-3 (owner, by strip).** A busy Button that breathes and inserts no ring. The DotRing was ruled the library's one work-in-flight mark (`Button.vue:192-196`); here it keeps reserved seats only. Default: as written. If he keeps the ring on a Button, it mounts on first use and then stays as a node of presence, and the Button follows its own width, so the Button still holds no `<Transition>`.
- **OQ-4 (measurement).** Whether the glyph's grow is felt at the default weight (half a pixel a side at 20 px). Default: as written. If item 6's strip shows nothing, `--glyph-grow` rises until it shows, up to 0.13, which paints the 1.08 the dialog's close plate has today.
- **OQ-5 (measurement).** Whether every colour and opacity leg in the authorized table is authored today. Default: yes; a row found with none gains one on `--duration-instant` and is named in the record.
- **OQ-6 (owner's machine).** Safari itself. Default: not a release blocker; one glance at the close at a hover, a swap, an error line arriving and a menu mark.
- **OQ-7 (W-R.1's seat).** Whether `reclaim`'s writer is read as a third candidate under W-R.1's OQ-11. Default: it is read, and the engine that passes that wave's reversal gate with the fewest nodes is adopted for both.

## Records the orchestrator amends

This seat wrote this file and `../design/intent-motion/PRECEPTS-ADDENDUM.md`, and edited nothing else.

- `INDEX.md`: a row for W-B.17, 11.2.0 and 12.0.0.
- INBOUND: the ten new rows; O-278 placed here; O-279's hover placed here and its seat left with W-I.8; O-284 and O-285 (11.1.1's scope) wait on OQ-1.
- `W-R.1.md`: §2.1's press deletion and its "No press scale" gate on a yes to OQ-1; its OQ-5 (the `press` row keeps a reader on a yes); its OQ-6 (the glyph's grow is its own amount and does not read `--scale-hover`); §2.2 (the reveal's reduced-motion fade lands in 11.2.0 by this wave's authorized rows); §2.3 (the plate reads `[data-press]`); §2.7 and OQ-11 (OQ-7 here).
- `W-I.8.md`: the dock's seats may take `.plate` and `data-glyph` on its build; the theme seat's hover is `data-glyph="turn"`; the rest-fill token is `--plate-tone`.
- `W-B.18.md`, R-11: the row it calls "a library row of its own" is this wave's authorized table.
- `docs/precepts`: the addendum's three texts. Two drifts CENSUS found go with them: `affordance-map.md` lists the DataTable sort control as a composed Button, which it is not, and its HOVER-LIFT column claims `scale-hover` on Button and the dock's controls, where it was removed.

## Struck on the last pass

Read once more with the records open. Each line was in the study, a proposal or this text's first form, and is out.

- The study's reveal of a new size through a clip (P4): struck by frame three of the dock strip (R-8).
- Proposal B's arrival by `@starting-style` on a node that stays, and `allow-discrete` on `display`: it plays at page load, and it is unwitnessed in WebKit (R-7).
- Proposal B's deletion of the universal reduced-motion rule: against a standing ruling, and it would return consumers' own motion to reduced-motion users (R-9). Its 100 ms size tween under reduced motion: against W-I.8 §1.6 and W-B.18 R-11.
- Proposal B's amounts as written: they multiply `--motion-weight`, which is 0.618 by default, so its 0.8 paints 0.876 and its 4 px paints 2.5.
- Proposal B's icon rule on every `svg.lucide` in every `button`, its `stroke-width` default, and its glyph that moves on keyboard focus (R-6).
- Proposal B's step of the plate's colour on press: a cut (R-1).
- Proposal B's `group`, its replacement of the disclosure keyframes, and its claim on the layout allowlist's other rows: no mechanism for the first, and W-R.1's for the other two.
- Proposal B's deletion of the `glass-dot-ring` transition under InfiniteScroll: that recipe is the ring's own designed leave and CENSUS reads it as tweened both ways.
- Proposal A's glyph on the `press` row as "no overshoot": the row's damping is 0.8 (R-6).
- Proposal A's reliance on `--scale-hover` and `.tap-squish`: W-R.1 §2.1 deletes both.
- Proposal A's group plate, its progress edge on the plate, and its fill verb (R-5, R-10, R-6).
- Proposal A's idle rule: it kept breathing under a pointer.
- Proposal A's quiet second path under a drawn curve: markup, and proposal B's passing gap needs none.
- The study's "the plate's seat is the gleam's, so the net is zero", as an 11.2.0 claim: the gleam leaves in 12.0.0, so until then a `.plate` goes only where `::before` is free.
- From the gates: a frame-time number stated as a finding (none exists; both are targets); a WebKit layout count (WebKit has no counter); "every census row in both themes and both widths" (timing is the claim; one cell each).
- From this text's first form: a transition on the text Button's plate (it keeps its underline, tweened); a plate on the theme toggle in 11.2.0 (its seat is W-I.8's); daraksha's 12 %, 4 % and 2 % step targets as the check's bound (they fit a dock-length tween and fail any honest 100 ms one; the bound is the leg's own eased step).
