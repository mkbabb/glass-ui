# Intent-first motion: proposal B, from the law inward (O-278)

Written 2026-11-12 by the proposer B seat (claude-fable-5-2). No browser was launched and nothing was built. Everything here is read from `BRIEF.md`, `STUDY.md`, `CENSUS.md`, the three records and their strips, the inbound files, the three precepts, and glass-ui's source on master at `a7e0337c5`. I have not seen the other proposal.

Citations follow the study: **G**, **A** and **R** are the Google, Apple and references records; CENSUS rows are named by their table; source lines are `src/…:line`.

Four limits on what follows:

1. **No number here is measured.** Every byte count and every cost is an estimate for the prototype seat to replace with a reading in Chromium and in WebKit, and in the owner's Safari where it differs.
2. **Safari floors are the documented ones.** The records witnessed `@starting-style` (G W11) and `linear()` (G W14) in the WebKit build. They did not witness `transition-behavior: allow-discrete` on `display`, nor `interpolate-size`. Both are marked below as owed a witness row.
3. **`interpolate-size` in Safari is not known to this seat.** To my knowledge no shipping Safari has it. The design does not depend on the answer (section 2).
4. **The dock keeps its own engine.** Its plate, reserved box and clip already exist (`src/components/dock/composables/useDockMorph.ts:79-104`), and its design has its own directory (`../dock/`). This proposal gives the dock a law and two small users (the plate and the icon), not a new size mechanism.

## 1. The law as a system

P0 says nothing changes between two frames. Read as a system, a glass surface can change in only five ways, and each way has one answer. The table is the whole design; the pieces after it are its implementation.

| # | What changes | The one answer | Who does the work | Layout per frame |
|---|---|---|---|---|
| 1 | A property on a node that stays (colour, opacity, transform, corner) | a CSS transition on the shared clocks | the platform | none |
| 2 | A node arrives | `@starting-style` | the platform | none |
| 3 | A node leaves | if it stays in the DOM: `hidden` plus `display` with `allow-discrete`. If Vue removes it: Vue's `<Transition>` holds it until its fade ends | the platform; Vue only where a node is removed | none |
| 4 | A node is replaced by another in the same seat (icon pair, label, skeleton to content) | row 3 then row 2, in that order, never both on screen | Vue's `<Transition mode="out-in">` | none (two layouts in one frame at the hand-over) |
| 5 | A box's size changes because its content changed | the size itself is tweened between two measured values | `follow()`, one function | yes, bounded (section 4) |

Three things fall out of the table before any piece is written.

- **Rows 1 to 4 need no script of glass's own.** The platform does rows 1 and 2 and half of row 3. Vue's `<Transition>` renders no element; it is the only way to keep a removed node on screen for its exit, and it is already a dependency.
- **Row 5 is the only place the design spends layout,** and section 4 argues that it must, shows what the compositor forms get wrong, and bounds the cost.
- **Reduced motion is not a sixth row.** If every travel reads its amount through `--motion-weight` (which is already 0 under reduced motion, `src/styles/tokens/scheme-motion.css:289`) and every clock reads a token, the reduced form of rows 1 to 5 is the same rules with shorter clocks and no travel. Section 5.

What the table rules out: a per-component motion engine, an observer that watches for size changes at rest, a second copy of a node kept for a cross-fade, and a wrapper added to give an animation something to hold.

## 2. What the platform gives Safari, and what the design takes

| Feature | Documented Safari floor | In the records | Verdict |
|---|---|---|---|
| `@starting-style` | 17.5 | witnessed, G W11 | **Taken** for every arrival. Glass already rests on it (`src/styles/glass/reveal.css`, the open rule), so this is no new floor. |
| `transition-behavior: allow-discrete` on `display` | 17.4 | not witnessed | **Taken** for a node that stays in the DOM and hides. Glass ships it at three sites today (`src/styles/glass/reveal.css:87`, `src/styles/animations.css:250`, `src/components/card/scroll.css:157`). Owed: one WebKit witness row. |
| `linear()` easing, in CSS and in `element.animate` | 17.2 | witnessed, G W14 | **Taken.** The spring tokens are already `linear()`. |
| `element.animate` | 13.1 | witnessed on a pseudo-element, G W9 | **Taken** for row 5 only, because its two end values are measured at run time and a Web Animation leaves no inline style behind. |
| `interpolate-size: allow-keywords` | not known to ship | not witnessed | **Not taken, and not waited for.** It is row 5 done by the engine: the same layout per frame, less script. The design uses one measured path in every engine so that Chromium tests and Safari run the same code. The day Safari ships it, three lines of measurement are deleted and nothing else moves. A second path now would be a path no test on this machine exercises. |
| Same-document view transitions | 18.0 | used by keyframes, R K4 | **Not taken for controls.** One runs at a time per document, so a second change makes the first jump to its end. It cross-fades two snapshots, which is the doubled glyph in `kf-play-click-step50ms.png`. It freezes the glass's backdrop into a picture for its length. It stays where it is today, on route changes. |
| `corner-shape`, CSS `d: path()`, anchor-driven travel | not in Safari, or Safari 26 only | G W12, W13 | Not taken. |

## 3. Piece one: presence

Rows 2, 3 and 4 of the law.

### Name and place

- `src/styles/glass/presence.css`: the recipe. It is a central partial, as `design-idioms.md` §7 asks of any recipe two surfaces compose, imported from `src/styles/glass.css`.
- `src/composables/motion/presence/Presence.ts`: one functional component, about 30 lines. It sits beside `reveal/` and `morph/` because every component and every consumer uses it. Exported from the root and from `/motion`.

### API

Two forms, one recipe.

```html
<!-- A node that stays in the DOM: no import, no component. -->
<p data-presence :hidden="!description">…</p>

<!-- A node Vue removes: the component adds no element. -->
<Presence><p v-if="error">…</p></Presence>

<!-- A node replaced in its seat. -->
<Presence swap><Pause v-if="playing" /><Play v-else /></Presence>

<!-- A node whose arrival must push what follows it. -->
<Presence reclaim><p v-if="error" class="labeled-field-error">…</p></Presence>

<!-- Keyed siblings that make room for each other. -->
<Presence group><Toast v-for="t in toasts" :key="t.id" … /></Presence>
```

Three boolean props (`swap`, `reclaim`, `group`) and no others. There is no duration prop, no easing prop and no name prop: the clock is the recipe's.

### The CSS, in full sketch

```css
@layer components {
    /* Present. This rule's clocks are the ones a thing ARRIVES on. */
    :where([data-presence]) {
        transition:
            opacity var(--duration-fast) var(--ease-out),
            translate var(--spring-present-duration) var(--spring-present),
            scale var(--spring-present-duration) var(--spring-present),
            display var(--spring-present-exit-duration) allow-discrete;

        @starting-style {
            opacity: 0;
            translate: 0 calc(4px * var(--motion-weight));
        }
    }

    /* Gone. This rule's clock is the one a thing LEAVES on: shorter, and a fade
       alone. `[hidden]` is the standing node; `.presence-leave-to` is the node Vue
       is about to remove. */
    :where([data-presence][hidden]),
    .presence-leave-to {
        opacity: 0;
        transition:
            opacity var(--spring-present-exit-duration) var(--ease-out),
            scale var(--spring-present-exit-duration) var(--ease-out),
            display var(--spring-present-exit-duration) allow-discrete;
    }
    :where([data-presence][hidden]) {
        display: none;
    }

    /* A swap arrives from four fifths of its size and leaves toward it, with no
       slide: the seat does not move, the mark in it changes. */
    :where([data-presence="swap"]) {
        @starting-style {
            opacity: 0;
            translate: none;
            scale: calc(1 - 0.2 * var(--motion-weight));
        }
    }
    .presence-leave-to:where([data-presence="swap"]) {
        scale: calc(1 - 0.2 * var(--motion-weight));
        transition-duration: var(--duration-instant);
    }

    /* Siblings in a group travel to their new seats. */
    .presence-move {
        transition: transform var(--spring-present-duration) var(--spring-present);
    }
}
```

### The component, in full sketch

```ts
// src/composables/motion/presence/Presence.ts
import { Transition, TransitionGroup, h, type FunctionalComponent } from "vue";
import { reclaimHooks } from "./follow";

interface PresenceProps {
    swap?: boolean;
    reclaim?: boolean;
    group?: boolean;
}

export const Presence: FunctionalComponent<PresenceProps> = (props, { slots }) =>
    h(
        props.group ? TransitionGroup : Transition,
        {
            name: "presence",
            mode: props.swap ? "out-in" : undefined,
            // The arrival is the platform's: mark the node before it is inserted and
            // `@starting-style` does the rest. Vue's enter classes carry no CSS.
            onBeforeEnter: (el: Element) =>
                el.setAttribute("data-presence", props.swap ? "swap" : ""),
            ...(props.reclaim ? reclaimHooks : null),
        },
        slots,
    );
Presence.props = ["swap", "reclaim", "group"];
```

`reclaimHooks` is twelve lines over `follow()`'s size writer and is sketched in section 4.

### What animates, and on which clock

| Leg | In | Out |
|---|---|---|
| opacity | `--duration-fast` (0.2 s) on `--ease-out` | `--spring-present-exit-duration` (0.12 s) on `--ease-out` |
| travel (4 px), or scale from 0.8 for a swap | `--spring-present-duration` (0.2 s) on `--spring-present` | none for a plain leave; scale to 0.8 in `--duration-instant` (0.1 s) for a swap |

`present` is the critically damped row (`springPresets.ts`: response 0.22, damping 1.0), so nothing here overshoots (P2). The opacity leg is an effect on a bezier and the travel is spatial on its own spring clock (P1, P4). No new clock is made.

- **In:** it starts faint and 4 px low, eases up and settles. A swap starts at four fifths, as Google's plate does (G C1) and as Emil's popover nearly does (R E6).
- **Out:** it fades in six tenths of the time and does not travel. That is the study's patterns 2 and 3 (G C6, R E6, R K2) and OWNER-READ question 4's default.
- **A swap** is Apple's two legs (A G7): the old mark leaves in 0.1 s, the new one arrives on the spring, which is nine tenths there in about 0.1 s. Only one mark is ever on screen, so there is no doubled glyph (R K4, and Benji Taylor's line in R §7).

### Reduced motion

`--motion-weight` is 0, so the 4 px and the 0.8 both collapse and the fade remains, on the reduced clocks of section 5. No rule is written here.

### Safari

17.5, set by `@starting-style`. No fallback: an older engine shows the node arrive with no fade, and that is outside the stated floor.

### Cost (estimates)

- About 0.5 KB of CSS and 0.4 KB of script, minified and compressed.
- **DOM nodes added: 0.** `<Presence>` renders none. A standing node uses the node that is already there.
- Properties animated: opacity, translate, scale. All three composite.
- No layout per frame. A swap costs two layouts in the one frame where the old node goes and the new one comes.
- One caveat, stated plainly: Vue's `<Transition>` schedules two animation frames per enter and per leave. `Button.vue:192-196` refuses it for that reason. The Button therefore uses the standing-node form (section 8), and so should any control that is on screen in hundreds.

### What it deletes

- `fade`, `tab-fade`, `pane-swap` and `metric-swap` in `src/styles/transitions.css`, with their reduced-motion arm (about 70 of that file's 164 lines). No component uses them (CENSUS, "What holds", 3).
- The `glass-dot-ring` transition recipe InfiniteScroll carries alone (`src/components/infinite-scroll/InfiniteScroll.vue:66`).
- The keyed remount that slides the Timeline's detail in and cuts the old one (`src/components/timeline/Timeline.vue:373, 682-697`).
- keyframes' whole-dock view transition around a glyph swap (R K4), once it adopts the swap.

### What it cures

- CENSUS snaps 8 (menu and select marks), 10 (DataTable state changes, as a swap of the body), 12 (every icon pair), 14 (the slider's loupe, as a standing node with `hidden`), 17 (avatar image and Metric value), 18 (Timeline check and detail), 19 (the pip that leaves the window).
- With `reclaim`: snap 3 (the field's error line), and the EasingPicker's mode and failure lines.
- With `group`: snap 9 (the other toasts).
- BRIEF: value.js's card swap that showed two cards' text side by side (a swap never shows two); daraksha's dots that teleport; keyframes' Play and Pause; the theme toggle's glyph (O-279).
- atlas: the DataTable rows on search and sort (two rows of its thirteen), and the third of its own list that has nothing wrapping what comes and goes (BRIEF).

## 4. Piece two: follow

Row 5 of the law: a box whose content changed reaches its new size by a tween.

### The decision, and what it costs

This piece tweens `inline-size` and `block-size`. That is a layout property animated for a bounded time, and `motion-canon.md` P5 and the BRIEF both say no layout per frame. I am proposing it anyway, in the open, for these reasons.

1. **Followers must move.** When a line arrives in a form, everything below it moves down. No compositor property on the line can move boxes the line does not know. The canon already names this case and allows it: "a genuine discrete layout RECLAIM … a one-shot bounded-CLS transition, named on the gate's narrow audited allowlist" (P5). Glass ships it today for the accordion (`src/components/_shared/disclosure/disclosure.css:100-122`).
2. **The compositor forms are wrong on the frames.** I worked both through.
   - A clip that opens from the old rectangle shows the new layout from the first frame. Anything anchored to the moving edge (a trigger's chevron, centred text, a right-aligned action) jumps to its new place at once and is then uncovered. Frame three of `kf-chrome-dock-hover-step75ms.png` is that picture: the full row, cut mid-word. A clip also cannot show a box larger than its layout, so a shrink needs the old size held in layout anyway. And it cuts the surface's one shadow and its edge along the moving side for the length of the tween, then returns them in one frame.
   - A scale with a counter-scale needs the surface's fill on a separate layer from its content. The dock has one. A popover, a dialog and a button do not, and giving them one is a wrapper or a rebuild of the material.
3. **The size itself is right on every frame.** The corners, the edge, the shadow and the backdrop are the real ones. Content anchored to an edge rides that edge. A centred dialog stays centred. A check that reads the box's rectangle reads the truth, with no clip to account for.
4. **It is what Apple ships.** "Measure in script, write the height … let a CSS transition on `height` run" (A §8), on one contained box: 18 layouts in 2 ms for the whole flyout (A §1).
5. **It is what `interpolate-size` is.** The brief names that feature as the platform's route. It animates the same property.

The cost is bounded by four rules, which are the allowlist row's text:

- **One shot.** `follow()` runs once per change, for at most the `present` clock (0.2 s). Never from a scroll, a pointer move or a loop.
- **The smallest box.** It runs on the node whose size changed, not on an ancestor.
- **One writer.** It is the only code in glass that animates a size. The allowlist goes from its several rows to this one (see the deletions).
- **A reading before it ships.** The prototype reads layout time per frame on three cases: the command dialog with 50 rows, an error line in a twelve-field form, and a select trigger in the dock. A proposed budget is 1 ms of layout per frame at 4x CPU slowdown. If a case fails it, that case reserves its footprint instead (below) and does not get a second mechanism.

**Where no size should change at all,** the cheaper cure is to reserve the footprint, and the design prefers it: an icon pair in one seat, a check mark in a menu row, a counter with tabular digits. Those are presence alone.

### Name and place

`src/composables/motion/presence/follow.ts`, beside `Presence.ts`. Exported from `/motion` (it reads the spring table through keyframes.js, as `useElementMorph.ts` does).

### API

```ts
/** Call BEFORE the change. Resolves when the box has settled. */
function follow(el: HTMLElement | null): Promise<void>;
```

One function, one argument. A component calls it from a watcher that runs before Vue patches:

```ts
watch(filteredCount, () => follow(surface.value), { flush: "pre" });
```

A consumer calls it the same way, or directly before it sets state in a handler.

### The script, in full sketch

```ts
// src/composables/motion/presence/follow.ts
import { nextTick } from "vue";
import { readReducedMotion } from "../core/useReducedMotion";
import { presentClock } from "./clock"; // springPreset("present") through
                                        // springTimingFunction, times motionTempo():
                                        // the derivation useElementMorph.ts uses.
const ID = "follow";

interface Box { w: number; h: number }
const box = (el: HTMLElement): Box => ({ w: el.offsetWidth, h: el.offsetHeight });

function size(el: HTMLElement, from: Box, to: Box, extra?: PropertyIndexedKeyframes) {
    const { duration, easing } = readReducedMotion()
        ? { duration: 100, easing: "ease-out" }
        : presentClock();
    return el.animate(
        {
            overflow: ["clip", "clip"], // held for the tween, gone with it
            ...(from.w !== to.w && { inlineSize: [`${from.w}px`, `${to.w}px`] }),
            ...(from.h !== to.h && { blockSize: [`${from.h}px`, `${to.h}px`] }),
            ...extra,
        },
        { id: ID, duration, easing },
    );
}

export async function follow(el: HTMLElement | null): Promise<void> {
    if (!el) return;
    const from = box(el);              // layout is clean: no forced layout. Mid-flight,
                                       // this is the size on screen now.
    await nextTick();                  // the caller's change is in the DOM
    el.getAnimations().find((a) => a.id === ID)?.cancel();
    const to = box(el);                // the one forced layout
    if (from.w === to.w && from.h === to.h) return;
    await size(el, from, to).finished.catch(() => {});
}

/** `<Presence reclaim>`: a node that arrives or leaves in flow. */
export const reclaimHooks = {
    onEnter(el: HTMLElement, done: () => void) {
        const gap = parseFloat(getComputedStyle(el.parentElement!).rowGap) || 0;
        size(el, { w: el.offsetWidth, h: 0 }, box(el), {
            marginBlockStart: [`${-gap}px`, "0px"], // the parent's gap arrives with the line
        }).finished.then(done, done);
    },
    onLeave(el: HTMLElement, done: () => void) {
        const gap = parseFloat(getComputedStyle(el.parentElement!).rowGap) || 0;
        size(el, box(el), { w: el.offsetWidth, h: 0 }, {
            marginBlockStart: ["0px", `${-gap}px`],
        }).finished.then(done, done);
    },
};
```

Notes the prototype must hold it to:

- A Web Animation leaves no inline style. When it ends the box is at its natural size with nothing to clean up. No custom property, no attribute, no `transitionend` listener.
- `offsetWidth` and `offsetHeight` are whole pixels and ignore transforms, so a dialog mid-reveal measures true. The half-pixel this can lose is below notice; if a strip shows it, read `getBoundingClientRect()` on an untransformed node.
- A node given to `reclaim` carries no block padding, border or margin of its own, or it cannot reach zero. `labeled-field-error` is a bare `<p>`; the rule goes in the piece's header comment.
- A change that arrives mid-flight starts from the size on screen, so the box never jumps. It does not keep the old tween's speed. P0 asks for the gesture's velocity; a CSS or Web Animation clock cannot carry it. For a 0.2 s correction I judge the restart invisible, and the strip must show whether I am right.
- A floating surface re-places itself as it resizes (reka's positioner listens for size). That is script per frame for 0.2 s that glass already pays on any resize; the reading should include it.

### What animates, and on which clock

`inline-size`, `block-size`, and for a reclaim the one margin that cancels the parent's gap. All on `--spring-present` and its own 0.2 s clock, read from the same table through script. No overshoot. Apple's correction between two open states is 120 ms (A G3); `present` is nine tenths there by about 100 ms.

- **In and out** are the same motion: the box travels from the size it had to the size it has. A grow and a shrink differ only in sign.

### Reduced motion

The same tween at 100 ms on `ease-out`. A box that changes size is not a slide, a zoom or a spin, and P0 says reduced motion is never a cut. If the spec seat reads P6 more strictly, the alternative is a one-frame size change under the content's fade; that is one line here.

### Safari

13.1 for `element.animate`; 17.2 for a `linear()` curve passed to it; 16 for `overflow: clip`. All below the floor presence already sets. No fallback.

### Cost (estimates)

- About 0.5 KB of script, minified and compressed. No CSS.
- **DOM nodes added: 0.** No observer, no listener, nothing at rest.
- Two reads and one write per change. The first read is free; the second forces one layout.
- **Layout on every frame of the tween,** of the box's subtree if it is out of flow, and of what follows it if it is in flow. This is the piece's whole cost and the reading above is owed before it ships.
- A glass surface that grows filters the newly covered backdrop as it grows. Any way of growing glass does.

### What it deletes

- The `disclosure-open` and `disclosure-close` keyframes and their per-kind size variables (`src/components/_shared/disclosure/disclosure.css:100-122`): the accordion and collapsible body become `reclaim`.
- The configurator's private `grid-template-rows` reveal (`src/components/configurator/ConfiguratorLayer.vue:236-247`).
- The `width` and `height` transition legs on the tab indicator (`src/components/tabs/styles/segmented.css:162-164`), which then travels by `translate` and `scale` alone.
- The `inline-size` transition on the sheet grip (`src/components/sheet/styles.css:275-288`).
- DockCrossfade's running-max reserve, which grows in one frame and never shrinks (`src/components/dock/DockCrossfade.vue:89-105`).
- From `proof:no-layout-animation`'s allowlist: every row but this one.

### What it cures

- CENSUS snaps 3 (with `reclaim`), 4 (the command list and its dialog), 5 (the Button widening for its ring), 6 (the auto-width select trigger and its value text, with a swap on the text), 15 (a popover or tooltip whose content changed), and the "content changes size" rows for Dialog, Card, Popover and Accordion.
- BRIEF: value.js's 590 px double hop (the container follows its content in one tween from wherever it is); the transport button whose label changes its width (CENSUS, EasingPicker).
- atlas: the filter drawer's sheet that changes size while open, (`inbound/ATLAS-SNAP-CENSUS.md`, the SheetContent row of its glass table), and the plate that grows by a whole table (item 10 of its headline list, on atlas's side through the same function).

### What it does not cure

- **The dock** (snaps 1 and 13; daraksha's 56 to 60 px; atlas's rail). The dock's capture already knows both endpoints when content changes at rest (`dockMorphMeasure.ts:186-230`) and nothing tweens between them. The cure is to arm the dock's own morph on that delta. It belongs to the dock's design, on the dock spring, with the plate and clip it already has.
- **A popover that flips sides** (half of snap 15). That is a move, not a resize. It is row 1 of the law, on reka's wrapper, and needs a look at what reka allows.
- **The enlarged plate's close** (atlas's most visible row; snap 20). It is a morph between two rectangles and belongs to `useElementMorph.ts`, played backward. ExpandableContainer has the enter and lacks the exit.
- **The theme flip** (snap 16). Open in the study, and open here.

## 5. The reduced form, in the tokens

Not a piece: one arm in two token files.

### What changes

```css
/* src/styles/tokens/scheme-spring.css, last of the token partials */
@media (prefers-reduced-motion: reduce) {
    :root {
        /* --motion-weight: 0 is already set (scheme-motion.css:289): every travel
           that multiplies by it is gone. */
        --spring-press: var(--ease-out);
        --spring-present: var(--ease-out);
        --spring-dock: var(--ease-out);
        --spring-panel: var(--ease-out);
        --spring-bloom: var(--ease-out);
        --spring-world: var(--ease-out);
        --spring-press-settle: 0.1s;
        --spring-present-settle: 0.1s;
        --spring-dock-settle: 0.1s;
        --spring-panel-settle: 0.1s;
        --spring-bloom-settle: 0.1s;
        --spring-world-settle: 0.1s;
        --duration-fast: var(--duration-instant);
        --duration-normal: var(--duration-instant);
        --duration-slow: var(--duration-instant);
        --duration-panel: var(--duration-instant);
        --idle-play: paused;
    }
}
```

Every transition glass writes already reads these (P4 and P7 make that a rule). So under reduced motion a fade takes 0.1 s, a thing that must still change place or size (an indicator, a thumb, a followed box) does so in 0.1 s with no spring, and every travel that is only ornament to an arrival (the 4 px, the 0.8) is zero. Loops read `animation-play-state: var(--idle-play, running)` and stop.

### What it deletes

- The universal zeroing (`src/styles/utilities/a11y-overrides.css:46-53`): `transition-duration: 0s !important` on every element is what makes reduced motion a cut (CENSUS snap 11).
- The local `transition: none` declarations that sit in reduced-motion blocks (the switch, tab indicator, pager, sheet grip, slider, expandable trigger, scroll rim, carousel, configurator, Progress; CENSUS "What holds", 4), and the recipe-local arm in `transitions.css`.
- The dock spring's and DockCrossfade's jump to the end (`useDockSpring.ts:103`, `DockCrossfade.vue:218-221`) become a 0.1 s run of the same code.

### What it cures, and what it owes

- Snap 11, and atlas's two reduced-motion rows (the carousel and the expandable trigger).
- atlas's ask for the fade "as a token or helper": it is the tokens. Any consumer transition written on glass's clocks reduces itself, and `data-presence` does so by construction.
- Owed by the spec seat: a sweep of the twelve infinite animations to read `--idle-play`, and of the exit keyframes to confirm each reads a token clock. P6's text in `motion-canon.md` describes a carve that no longer exists and is rewritten to this.

Safari: custom properties in a media query, all versions. Cost: about 0.2 KB, and it removes more than that.

## 6. The smallest users: the plate

Row 1 of the law, on a pseudo-element.

### Name and place

`src/styles/glass/plate.css`, a central partial. One class, `.plate`.

### API

```html
<button class="plate">…</button>
```

Two custom properties, both optional: `--plate-fill` (the flat colour) and `--plate-from` (the scale it grows from; 0.8 by default, 1 for a row or a wide control, where it is a fill alone).

### The CSS, in full sketch

```css
@layer components {
    .plate {
        position: relative;
        isolation: isolate;
    }

    .plate::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        border-radius: inherit;
        background: var(--plate-fill, color-mix(in oklab, currentColor 8%, transparent));
        opacity: 0;
        scale: calc(1 - (1 - var(--plate-from, 0.8)) * var(--motion-weight));
        pointer-events: none;
        transition:
            opacity var(--duration-control) var(--ease-standard),
            scale var(--spring-present-duration) var(--spring-present);
    }

    @media (hover: hover) {
        .plate:hover::before {
            opacity: 1;
            scale: 1;
        }
    }

    .plate:is(:focus-visible, :active, [data-highlighted], [data-state="open"])::before {
        opacity: 1;
        scale: 1;
    }

    /* Received: the same plate, a step deeper. */
    .plate:active::before {
        background: var(
            --plate-fill-press,
            color-mix(in oklab, currentColor 14%, transparent)
        );
    }
}
```

No template: the pseudo-element is the seat the specular disc holds today (`src/styles/glass/material.css:128-143`), so a control gains nothing.

### What animates, and on which clock

Two properties on one pseudo-element: opacity on `--duration-control` (0.12 s), scale on the `present` spring's 0.2 s. The fade lands before the growth, which is the owner's "the fading happens FASTER than the stretching" (C-12, `restraint.md`).

- **In:** the plate is already there at four fifths (G C1, G M4) and grows to the control's own shape. No turn, and the plate takes the control's radius (OWNER-READ question 2's default).
- **Out:** the same declaration run backward (the study's pattern 1; A K1). This is the leave Google does not have (G §6).
- **In a group,** the selected plate is one shape that travels. Glass has that writer (`src/composables/motion/morph/useSelectionIndicator.ts`); the dock's seats take it instead of fading one highlight out and another in. Nothing new is written for it here.

### Reduced motion

`--motion-weight` is 0, so the plate does not grow; it fades in 0.1 s.

### Safari

Individual `scale`: 14.1. `color-mix`: 16.2. No fallback.

### Cost (estimates)

About 0.3 KB. 0 nodes. Two compositor properties. No script, no listener, no layout.

### What it deletes

- The pointer-tracked specular disc: its selector group and recipe (`src/styles/glass/material.css:128-143, 225, 235, 247`), `src/styles/glass-specular-track.css`, `src/styles/tokens/property-regs-specular.css`, the `v-specular` directive and its position writer, and the Button's arming of it (`Button.vue:166`). Already ruled out (C-2); this is what stands in its seat.
- The capsule's gleam-only hover (`src/styles/glass/glass-capsule.css:93-116`).
- The dock's three per-control hover fills (`icon-button.css:126-131`, `tab-button.css:67-72`, `triggers.css:72-77`) and the five-property selected seat (`icon-button.css:188-232`).
- The dialog close button's private plate (`src/components/dialog/styles.css:115-140`), which becomes `class="plate"`.
- The menu row's 1 px lift and four of its six transition legs (`src/components/_shared/menu/menu.css:11, 30-36, 69`).

### What it cures

- The ten failing hovers and four weak ones in CENSUS's hover table, the Timeline mark's untweened grow (snap 18), and snap 7 (the dock's seat).
- BRIEF: keyframes' flat-sided hover plate on labelled triggers; daraksha's highlight that vanished on leave; O-286 (the toggle group's glow becomes a flat fill).

## 7. The smallest users: the icon

Row 1 of the law, on the glyph's own node.

### Name and place

`src/styles/glass/icon.css`, a central partial. No component, no directive, no import.

### API

**None for the default.** Any Lucide glyph inside a pressable control answers its control's hover with no attribute at all. One attribute names a different verb:

```html
<ChevronDown data-icon="turn" />            <!-- turns when its control opens -->
<ArrowRight data-icon="nudge" />            <!-- 2 px the way it points -->
<svg data-icon="draw">…<path pathLength="1" …/></svg>   <!-- glass's own curves -->
<Play data-icon="still" />                  <!-- opts out -->
```

Three custom properties, each optional: `--icon-x`, `--icon-y`, `--icon-turn`. Lucide passes attributes through to its `<svg>`, so this works on any icon in any consumer, in a trigger or a menu item, with no wrapper (BRIEF, the value.js and keyframes asks).

### The CSS, in full sketch

```css
@layer components {
    :where(svg.lucide, [data-icon]) {
        transition:
            stroke-width var(--duration-control) var(--ease-standard),
            translate var(--spring-present-duration) var(--spring-present),
            rotate var(--spring-present-duration) var(--spring-present);
    }

    /* The host is any pressable control. Its engaged states are hover (pointer
       devices only), keyboard focus, reka's row highlight, and open or pressed. */
    :where(button, a, summary, [role="menuitem"], [role="option"], [role="tab"], .plate) {
        &:is(:focus-visible, [data-highlighted], [data-state="open"], [aria-pressed="true"]),
        &:hover {
            /* The default: the glyph's own weight, as Material tweens its font's. */
            :where(svg.lucide:not([data-icon])) {
                stroke-width: 2.5;
            }
            :where([data-icon~="nudge"]) {
                translate:
                    calc(var(--icon-x, 2px) * var(--motion-weight))
                    calc(var(--icon-y, 0px) * var(--motion-weight));
            }
            :where([data-icon~="draw"] [pathLength="1"]) {
                stroke-dashoffset: -1.3;
            }
        }
        /* A turn follows state, not hover: a chevron that turns under the pointer
           would say "open" before it is. */
        &:is([data-state="open"], [aria-expanded="true"]) :where([data-icon~="turn"]) {
            rotate: var(--icon-turn, 180deg);
        }
    }

    /* The curve's own stroke: one dash as long as the path and a gap that waits
       past its end. Engaged, the gap runs the length of the curve once; at both
       ends the curve is whole. */
    :where([data-icon~="draw"] [pathLength="1"]) {
        stroke-dasharray: 1 0.3;
        stroke-dashoffset: 0;
        transition: stroke-dashoffset var(--duration-fast) var(--ease-standard);
    }
}
```

The `&:hover` arm sits inside `@media (hover: hover)` in the real file; it is flattened here to keep the sketch readable.

A state pair (Play and Pause, copy and check, Minus and Check, sun and moon) is not this file's job. It is `<Presence swap>`: the icon is presence's smallest user.

### What animates, and on which clock

One property per glyph, on the glyph's own `<svg>` or its own path.

| Verb | Property | Amount | Clock | Learns from |
|---|---|---|---|---|
| default | `stroke-width` | 2 to 2.5 | `--duration-control`, 0.12 s | G M1: the glyph's weight, one property, in and out |
| `nudge` | `translate` | 2 px | `present`, 0.2 s | A G8: a 4 px slide; halved for a 16 px glyph |
| `turn` | `rotate` | 180 degrees by default | `present`, 0.2 s | the three chevron rules glass has |
| `draw` | `stroke-dashoffset` | one pass | `--duration-fast`, 0.2 s | benji.org's drawn underline (R §5); the owner's ask on the easing cards |

- **In and out:** each is one transition and runs backward on leave, on the same clock (the study's pattern 1).
- **On click:** the host's open or pressed state engages the same rule, so the trigger's curve draws when its menu opens (BRIEF, keyframes' ask), and stays engaged while it is open.
- Flat fills only; nothing here shades (owner, 17:05).

### Reduced motion

The weight change keeps, on 0.1 s: it is a paint, not a movement. The nudge is zero by `--motion-weight`. The turn and the draw run in 0.1 s.

### Safari

Individual `translate` and `rotate`: 14.1. CSS nesting: 16.5; the nested `:where()` form used here needs 17.2. `stroke-width` and `stroke-dashoffset` transitions: all versions. No CSS path morph: `d: path()` is not in Safari (G W13), and none is proposed.

### Cost (estimates)

- About 0.4 KB of CSS. 0 nodes. No script.
- `stroke-width` and `stroke-dashoffset` repaint the glyph's box (16 to 24 px square) on each frame for 0.12 to 0.2 s. That is paint, not compositor, and the reading must say what it is. The nudge and turn composite.
- No layout.

### What it deletes

- The three separate chevron rules: `src/components/dock/styles/controls/triggers.css:152-157`, `src/components/_shared/disclosure/disclosure.css:96-98`, and the SelectTrigger's template classes.
- The DarkModeToggle's private icon spring and the `data-allow-motion` opt-out that exists for it (`src/components/dark-mode-toggle/dark-mode-toggle.css:77-83`; `a11y-overrides.css`, the carve): its sun and moon become a swap, its hover the default verb.
- With the swap: every bare `v-if` icon pair (`DockBackgroundToggle.vue:72-73`, `EasingPicker.vue:577-588`, `Checkbox.vue:48-49`, `DataTable.vue:401`).

### What it cures

- Snap 12. The sub-trigger chevron that does not move (CENSUS, menu table). atlas's Collapsible chevron with no transition.
- BRIEF: O-279 (the theme toggle); "each icon should have animated hover states"; keyframes' direction arrows (`nudge`, with `--icon-x` and `--icon-y` per arrow) and easing curves (`draw`).

## 8. The users in the components, by the law

How the worst cases read once the pieces exist. Each is a few lines in a component that has none today.

| Site | Today | With the pieces |
|---|---|---|
| Button's loading ring (`Button.vue:192-198`) | `v-if`, widens the button at once, leaves by a cut | The ring mounts on first use and then stays: `<DotRing v-if="everLoading" data-presence :hidden="!loading" />`. `watch(() => props.loading, () => follow(host), { flush: "pre" })`. No `<Transition>`, so the Button still schedules nothing at rest. |
| LabeledField's error line (`LabeledField.vue:64-71`) | `v-if`, pushes the form | `<Presence reclaim>` around the `<p>`. |
| Command list (`CommandList.vue`) | resizes per keystroke | one `watch(count, () => follow(dialog), { flush: "pre" })`. |
| Select value (`SelectValue.vue:35`) | text and width jump | `<Presence swap>` on the text keyed by value; `follow(trigger)` on the same watch. |
| Menu and select marks | reka mounts and unmounts | `force-mount` on the indicator with `data-presence="swap"` and `hidden`: the standing-node form, as the checkbox mark already is (`control-bit.css:343-372`). |
| Toaster (`Toaster.vue:107-122`) | siblings jump | `<Presence group>` around the list. |
| DataTable (`DataTable.vue:285-480`) | a `v-if` chain; rows cut | `<Presence swap>` on the body keyed by state and by sort and filter; `follow()` on the table's box. Row-by-row travel is cut (section 10). |
| Metric, Avatar | value and image cut in | `<Presence swap>`; no size change, so no `follow`. |
| Skeleton to content, anywhere | a cut | `<Presence swap>`, with `follow()` if the sizes differ. This is the whole of "in progress" to "done" for a large element; no new piece is needed (the study says the same). |

Idle states get nothing from this proposal. A large element's idle is one opacity loop that reads `--idle-play`; small controls stay still at rest (BRIEF, point 2 of the three).

## 9. Press (a proposal for the owner, as the study has it)

One rule, beside the plate, shown to the owner as a strip before it is a ruling (BRIEF, point 1; OWNER-READ question 1).

```css
.plate:active {
    scale: var(--scale-press-sm); /* 0.97, uniform */
    transition: scale var(--spring-present-exit-duration) var(--ease-out);
}
.plate {
    transition: scale var(--spring-present-duration) var(--spring-present);
}
```

Down in 0.12 s, back in 0.2 s, no bounce (`present` is critically damped), with the plate a step deeper. A control nested in a trigger is a `.plate` too and takes it (O-284). It deletes the Button's press spring and its eight listeners (`Button.vue:183-190`), the gleam coupled to it, and the non-uniform squash (O-285). 0 nodes, 0 listeners, one property.

## 10. The second pass: what I cut, reading it as the owner would

"NO overuse of shading, transition, or markup." I went back over the draft with that sentence and removed the following. Each was in the design before this pass.

**Mechanisms**

- **A second size writer that clips.** I had `follow()` choose between a clip and a size by an attribute. Two mechanisms for one row of the law is a variant; the clip is wrong on edge-anchored content and on shrink (section 4). One writer.
- **Moving the followers by transform.** A walk up the tree that translates every following sibling by the same amount. It is exact only in plain block flow, breaks in a grid, and is unbounded. Cut for the size itself.
- **An observer that follows any size change.** It needs no call sites, and it watches every surface at rest. The BRIEF forbids that. Cut for one explicit call.
- **A `useFollow` composable** wrapping a one-line watcher. Cut; the watcher is the API.
- **The `interpolate-size` arm.** A path only one engine takes.
- **View transitions for controls.**
- **A `<PresenceGroup>` component.** Folded into one prop.
- **Row-by-row travel in the DataTable.** A table row cannot be taken out of flow to leave, so it needs its own mechanism. The body swaps as one and the table follows. If the owner wants rows to travel, that is a later, separate piece.

**Transitions**

- **Travel on the way out.** A thing that leaves fades; it does not also slide (G C6). One leg fewer on every exit.
- **A stagger on arriving items.** Apple staggers its flyout links (A G2). On a control it is a second motion. Cut.
- **The plate's turn, and shaped plates.** The turn only reads on a shape that is not round (the study, section 2), and a path per destination is markup. The plate is the control's own shape.
- **A colour transition on the plate's press.** The fill steps a shade deeper under the finger with no tween of its own; the plate's opacity and scale are already the motion. (Apple's press is a cut of 2 %, A B1. If the no-snap check reads colour, this one leg returns.)
- **The icon's grow.** A glyph that scales as its plate scales is two growths for one hover. The plate grows; the glyph gains weight.
- **The `fill` verb** (outline to filled, as Chat's glyphs do, G C2). It duplicates the default verb's meaning, and most Lucide glyphs are open strokes that fill badly.
- **A draw verb for Lucide glyphs.** It needs each path's length, so a script or an attribute per path. `draw` is kept only for curves glass authors itself, where `pathLength="1"` is already in hand and the owner asked for it by name.
- **An opacity dip on a surface when its size lands under reduced motion.** A second effect to excuse the first.
- **The blur on a surface as it opens** (`src/styles/glass/reveal.css:139, 159, 179`; `motion-registers.css:73, 80`). Not mine to add or keep; it is the study's over-do row 6, and with presence defined as opacity plus one small travel it has no place. Listed here so the spec seat removes it with the rest.

**Shading**

- Nothing in this proposal adds a shadow, a gradient, a rim or a blur. The plate is one flat fill from one custom property. Its seat is the one the gleam leaves.

**Markup**

- **An attribute on every icon.** The default verb needs none.
- **A class on the node inside `<Presence>`.** The component marks it.
- **Props for duration, easing and distance.** The recipe has one clock; a consumer who needs another sets the tokens.

What is left: **two attributes** (`data-presence`, `data-icon`), **one class** (`.plate`), **one component** with three boolean props, **one function**, and a token arm. About 2.3 KB by estimate, against the directive, the position writer, the three style files, the four unused recipes, the press spring and the keyframes it removes.

## 11. Rows and cases, in one table

| Piece | CENSUS snaps | BRIEF cases and INBOUND rows |
|---|---|---|
| presence | 8, 10, 12, 14, 17, 18, 19; 3 with `reclaim`; 9 with `group` | value.js's two cards side by side; daraksha's dots; keyframes' Play and Pause; O-279; O-250 and O-261's remainder; atlas's DataTable rows |
| follow | 3, 4, 5, 6, 15 (resize half) | value.js's 590 px hop; atlas's sheet and plate that resize |
| reduced form | 11 | atlas's ask for the fade; its two reduced-motion rows |
| plate | 7, 18 (the mark's hover); 14 hover rows | keyframes' flat-sided plate; daraksha's vanished highlight; O-286 |
| icon | 12 (with the swap) | O-279; "each icon should have animated hover states"; keyframes' arrows and curves; atlas's chevron |
| press | | O-284, O-285; OWNER-READ question 1 |
| not cured here | 1, 13 (the dock's own engine); 2 (the focus ring: OWNER-READ question 3; under its default it is one `outline-color` transition, row 1 of the law); 16 (theme flip, open); 20 (a morph played backward) | O-248, O-275, O-276 (the dock's design); O-264 (Sheet overshoot, a tuning); O-254 (the Slider); O-253 (haptics) |

## 12. What the prototype seat must read first

In this order, because each can change the design.

1. **Layout per frame for `follow()`** on the three cases in section 4, in Chromium and WebKit. This is the proposal's one open risk.
2. **`display` with `allow-discrete` on a `[hidden]` node in WebKit,** in and out, as a witness row beside G W11.
3. **`@starting-style` on a node Vue inserts inside `<Transition>`,** where the reclaim hook reads a size in the same task. By the specification the starting style applies at that first style update; the strip must show the fade starting from zero.
4. **A swap's hand-over frame:** that no empty frame is painted between the old mark's removal and the new one's insertion.
5. **The plate at 0.8 on a 44 px control and at 1 on a row,** as strips, with the leave.
6. **The default icon verb at 16 and 24 px,** in both themes: whether a half-unit of stroke is felt, and what its repaint costs.
7. **A `follow()` that is interrupted mid-flight:** whether the restart of the clock is visible.

## Open questions for the spec seat

- Whether the allowlist row for `follow()` is accepted as P5's reclaim, or whether the owner should be asked. I have argued it; I have not been granted it.
- Whether reduced motion keeps a 0.1 s size tween (this proposal) or lands a size in one frame under a fade (P6's stricter reading).
- Whether `interpolate-size` is in the owner's Safari. If it is, section 4's measurement lines can go; the design does not otherwise change.
