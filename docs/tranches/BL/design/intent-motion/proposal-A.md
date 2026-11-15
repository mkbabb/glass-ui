# Proposal A: from the mark outward (O-278)

Written 2026-11-12 by proposer A (claude-fable-5-2). No browser was launched and nothing was built. Everything here is read from `BRIEF.md`, `STUDY.md`, `CENSUS.md`, `OWNER-READ.md`, the three records and their strips, the three precepts, and glass-ui's source on master at `a7e0337c5`. I have not seen the other proposal.

Three limits carry over from the study and bind every number below. Shipping Safari is unmeasured; version floors are the documented ones, and Playwright's WebKit is not Safari. No frame time has been taken for any technique here. Byte counts are estimates from the sketches, not builds.

## 0. The proposal in short

Two things, both CSS, both with no script at rest:

1. **The glyph.** One attribute, `data-glyph`, on the `svg` itself. On hover the glyph makes one small motion of its own (grow, nudge, turn, fill or draw) and returns the same way. Between two states it leaves and arrives by one shared pose (scale 0.8, opacity 0), so a swap is two short legs and never two ghosted copies.
2. **The plate.** One class, `plate`, on the control. The control's `::before`, the seat the pointer gleam holds today, becomes a flat fill inside a rounded clip rectangle. The rectangle and the fill's strength are the whole vocabulary: it grows 4 px from inside the control on hover, deepens when pressed or on, travels between the members of a group when selection moves, fills from one edge to show progress, and breathes to show idle or work.

The same two rules, with nothing added, give a large element its four states (section 4).

| | Adds | Removes |
|---|---|---|
| Files | 2 CSS files, about 110 lines, under 4 KB raw (estimate) | 2 CSS files and 2 TS files outright (389 lines); up to 2 more TS files (400 lines) if the press goes to CSS; about 300 further CSS lines across 9 files |
| DOM nodes | 0 | 1 per group that has an indicator element today (tabs, toggle group, dock switcher) |
| Components, composables, directives | 0 | `vSpecular`, `useSpecularTracking`; `useLiquidPress` and `useSpringPress` at five call sites, subject to OWNER-READ question 1 |
| Listeners at rest | 0 | 8 per Button, the pointer listeners behind `v-specular` on every glass control |
| Clocks | 0 new | the hand-written 1.8 s pulse is untouched; the 3 s gradient sweep goes |

## 1. The contract between a control and its glyph

A glyph has to know when its control is pointed at, and a control nested in another control (the edit button inside keyframes' dropdown trigger, O-284) must answer only to itself. Two numbers on the control do this, and nothing else is needed.

```css
/* in src/components/_shared/intent/glyph.css, first rule */
@layer components {
    :where(.plate, button, a[href], summary, [role="button"], [role="tab"],
           [role="option"], [role="menuitem"], [role="menuitemcheckbox"],
           [role="menuitemradio"]) {
        --intent: 0;      /* 1 while a pointer is over the control */
        --intent-set: 0;  /* 1 while the control is on, open or current */

        @media (hover: hover) {
            &:hover:not(:disabled, [aria-disabled="true"]) { --intent: 1; }
        }
        &:is([aria-pressed="true"], [aria-expanded="true"], [aria-checked="true"],
             [aria-current]:not([aria-current="false"]),
             [data-state="open"], [data-state="on"], [data-state="active"],
             [data-state="checked"]) { --intent-set: 1; }
    }
}
```

- Every control resets both numbers, so a nested control shadows its parent's. No `@scope`, no child combinators, any depth.
- The numbers are plain custom properties. They do not animate. A glyph computes its own `scale`, `translate` or `rotate` from them, and the transition runs on the glyph.
- `--intent` is set by a hovering pointer only. Keyboard focus does not move a glyph (`restraint.md`: no motion on keyboard actions; `menu.css` already holds that a keyboard highlight never moves a row). The plate answers focus by its fade (section 3).
- `:where()` keeps the list at zero specificity, so any consumer rule wins.

## 2. The glyph

### Name and place

`src/components/_shared/intent/glyph.css`, beside `plate.css` and a short `README.md`. `_shared/` is where the cross-component recipes already live with their styles (`_shared/menu/menu.css`, `_shared/disclosure/disclosure.css`, `_shared/feedback/dot-ring.css`). `src/styles/index.css` imports both files in the slot `glass-specular-track.css` holds today (line 204), which that file vacates.

There is no component, no directive and no composable. `src/styles/glass/mark.css` already uses "mark" for the inert annotations (badge, separator, label), so this piece is named for what it is.

### API

One attribute on the `svg` (or on a `<g>` inside it), and at most three custom properties.

| Write | What the glyph does while its control is hovered | Tune |
|---|---|---|
| `data-glyph` | grows to `--scale-hover` (1.08, the existing token) | |
| `data-glyph="nudge"` | moves 2 px the way it points | `--glyph-dx`, `--glyph-dy` |
| `data-glyph="turn"` | turns 15 degrees | `--glyph-turn` |
| `data-glyph="fill"` | its outline fills with its own colour, flat; stays filled while the control is on | |
| `data-glyph="draw"` | a stroke marked `pathLength="1"` draws on; stays drawn while the control is on | |

On any verb, `--glyph-flip` turns the glyph by that angle while the control is on or open (a chevron: `--glyph-flip: 0.5turn`).

A glyph that comes or goes takes the pose. Three ways reach the same rule: `data-glyph-off` on a glyph that stays mounted; Vue's built-in `<Transition name="glyph" mode="out-in">`, which renders no element; or a component-local selector keyed on the row's own state.

Glass's own controls need no attribute on slotted icons: an `svg` that is a direct child of a `.plate` grows by default. That is the owner's "each icon should have animated hover states" with no change in any consumer. The fence in `motion-canon.md` still bounds the amount (8 % of a 20 px glyph is 0.8 px a side) and nothing moves at rest.

### The CSS, in full

```css
@layer components {
    /* (the two numbers of section 1 open this file) */

    :is([data-glyph], :where(.plate) > svg) {
        transform-box: fill-box;
        transform-origin: center;
        rotate: calc(var(--glyph-flip, 0deg) * var(--intent-set, 0));
        transition:
            scale var(--spring-press-duration) var(--spring-press),
            translate var(--spring-press-duration) var(--spring-press),
            rotate var(--spring-press-duration) var(--spring-press),
            opacity var(--duration-control) var(--ease-standard),
            fill-opacity var(--duration-control) var(--ease-standard),
            stroke-dashoffset var(--duration-fast) var(--ease-out-expo);
    }

    /* The five verbs. One per glyph. */
    :is([data-glyph=""], [data-glyph="grow"], :where(.plate) > svg:not([data-glyph])) {
        scale: calc(1 + (var(--scale-hover) - 1) * var(--intent, 0));
    }
    [data-glyph="nudge"] {
        translate:
            calc(var(--glyph-dx, 2px) * var(--intent, 0))
            calc(var(--glyph-dy, 0px) * var(--intent, 0));
    }
    [data-glyph="turn"] {
        rotate: calc(
            var(--glyph-turn, 15deg) * var(--intent, 0) +
            var(--glyph-flip, 0deg) * var(--intent-set, 0)
        );
    }
    [data-glyph="fill"] {
        fill: currentColor;
        fill-opacity: max(var(--intent, 0), var(--intent-set, 0));
    }
    [data-glyph="draw"] {
        stroke-dasharray: 1;
        stroke-dashoffset: calc(1 - max(var(--intent, 0), var(--intent-set, 0)));
    }

    /* The pose: how a glyph is absent. Declared after the verbs so it wins. */
    [data-glyph][data-glyph-off],
    .glyph-enter-from,
    .glyph-leave-to {
        opacity: 0;
        scale: 0.8;
    }
    [data-glyph="draw"]:is([data-glyph-off], .glyph-enter-from, .glyph-leave-to) {
        scale: 1;
        stroke-dashoffset: 1;
    }
    /* Vue waits for the legs that run, not the longest one declared. */
    .glyph-enter-active,
    .glyph-leave-active { transition-property: scale, opacity; }
    .glyph-enter-active[data-glyph="draw"] { transition-property: stroke-dashoffset, opacity; }

    @media (prefers-reduced-motion: reduce) {
        [data-glyph],
        :where(.plate) > svg,
        [data-glyph][data-glyph-off],
        .glyph-enter-from,
        .glyph-leave-to {
            scale: none;
            translate: none;
            stroke-dashoffset: 0;
            transition:
                opacity var(--duration-control) var(--ease-standard),
                fill-opacity var(--duration-control) var(--ease-standard) !important;
        }
    }
}
```

### The templates

```vue
<!-- 1. Any icon, any consumer. No import beyond the stylesheet, no wrapper. -->
<button class="plate"><Settings data-glyph="turn" /></button>

<!-- 2. A menu item's arrow moves the way it points (keyframes' direction menu). -->
<DropdownMenuItem><ArrowLeft data-glyph="nudge" style="--glyph-dx: -2px" /> Reverse</DropdownMenuItem>

<!-- 3. Every chevron in glass: one attribute replaces three separate rules. -->
<ChevronDown data-glyph="nudge" style="--glyph-dx: 0px; --glyph-dy: 2px; --glyph-flip: 0.5turn" />

<!-- 4. A state pair (DockBackgroundToggle.vue:72-73). Out, then in: 120 ms each. -->
<Transition name="glyph" mode="out-in">
    <Play v-if="paused" data-glyph :size="18" aria-hidden="true" />
    <Pause v-else data-glyph :size="18" aria-hidden="true" />
</Transition>

<!-- 5. A menu check that stays mounted (DropdownMenuCheckboxItem.vue:50-53).
        The reka indicator span goes; the row's own data-state keys the pose. -->
<Check data-glyph class="menu-mark" aria-hidden="true" />
```
```css
/* menu.css, one rule */
.glass-menu-row:not([data-state="checked"]) > .menu-mark { opacity: 0; scale: 0.8; }
```
```vue
<!-- 6. The theme toggle (O-279). The sun turns 30 degrees under the pointer and
        half a turn with the theme. The private transition block goes. -->
<g class="toggle-sun" data-glyph="turn" data-allow-motion
   style="--glyph-turn: 30deg; --glyph-flip: 0.5turn">…</g>
```
```css
:where(.dark) .dark-mode-toggle-button { --intent-set: 1; }
```
```vue
<!-- 7. An easing card (the owner on keyframes, 2026-11-12). The curve is in the
        card's svg twice: a quiet track, and the ink that draws over it on hover
        and stays while the card is chosen. In the trigger, the chosen curve
        arrives by the pose and so draws on at each pick. -->
<svg viewBox="0 0 24 24" aria-hidden="true">
    <path :d="curve" class="easing-track" />
    <path :d="curve" pathLength="1" data-glyph="draw" />
</svg>
```

### What animates, and on which clock

| Change | Property | Clock | Why this one |
|---|---|---|---|
| grow, nudge, turn, flip | `scale`, `translate` or `rotate` | `--spring-press` over `--spring-press-duration` (0.12 s, no overshoot) | the smallest mass in the library takes its fastest dead-landing row; the checkbox mark and the dialog's close plate already ride it |
| fill | `fill-opacity` | `--ease-standard` over `--duration-control` (0.12 s) | a colour change, so a bezier (`motion-canon.md` P1) |
| draw | `stroke-dashoffset` | `--ease-out-expo` over `--duration-fast` (0.2 s) | P1 names this curve for a draw-on |
| pose, in and out | `scale` with `opacity` | `--spring-press` and `--duration-control`, 0.12 s each | coupled fade (P3) |

No new clock. Each spring leg reads its own duration (P4).

### In and out

- **Hover.** One declaration serves both ways: 120 ms in, 120 ms back, from wherever the glyph is. A pointer that leaves mid-travel turns the glyph round; nothing restarts and nothing cuts. This is the study's first pattern: a hover leaves the way it came.
- **A swap.** Out-in: the old glyph shrinks to 0.8 and fades over 120 ms, then the new one grows from 0.8 over 120 ms. That is 240 ms in two legs, which is Apple's menu icon (A G7). The two glyphs are never both visible, so there is no ghosting (the fault in `kf-play-click-step50ms.png`).
- **A mark that stays mounted** (the menu check) tweens in and out on the same pose with no script.

### Reduced motion

Travel goes and the fade stays. Scale, nudge and draw rest at their end values; fill keeps its 120 ms fade; a swap becomes an opacity cross-step of 120 ms out and 120 ms in. A chevron's flip lands at once; the plate under its control carries that change by its fade. The `!important` on the transition is the existing route for a narrow reduced-motion authorization (`a11y-overrides.css`, the comment on its authorized set): a class selector outranks the universal `*` rule in the same layer. These two rows join that enumerated set.

### Safari

| Feature | Documented floor |
|---|---|
| individual `scale`, `translate`, `rotate` | 14.1 |
| `transform-box: fill-box` | 11 |
| `:is()`, `:where()` | 14 |
| `max()` inside `calc()` | 11.1 |
| CSS nesting (section 1's rule) | 17.2; the dock's control sheets already nest |
| `linear()` in the spring tokens | 17.2; this is glass's floor today, not a new one |

No fallback is needed and none is proposed. `@starting-style` is not used, on purpose (section 6). One thing is unverified in any WebKit: `transform-box: fill-box` with an individual `rotate` on an inner `<g>` (the theme toggle). The toggle's two groups are centred in the view box, so it works with or without the property; the prototype reads it.

### Cost

- Bytes: about 60 lines, about 2.2 KB raw (estimate).
- DOM nodes added: 0. A state pair under `<Transition>` holds one `svg` at rest. The menu check swaps a conditional `span` and `svg` for one `svg` that stays.
- Properties animated: one per glyph on hover; two during a pose.
- Layout per frame: none. Grow, nudge, turn and the pose are transform and opacity. Fill and draw repaint a box of 16 to 24 px; that is paint and the reading must say so.
- Script: none on hover. Vue's own transition code runs during a swap and never at rest.
- Style work on hover: the control and its subtree re-resolve one inherited number, 1 to 3 nodes.
- Frame time: not measured (section 7).

### What it deletes

| What | Where | Lines today |
|---|---|---|
| The theme toggle's private icon transitions and its own reduced-motion block; its opacity-only hover | `src/components/dark-mode-toggle/dark-mode-toggle.css:16-28, 77-99` | about 30 |
| Three separate chevron rules | `src/components/dock/styles/controls/triggers.css:152-157`; `src/components/_shared/disclosure/disclosure.css:96-98`; the `transition-disclosure in-data-[state=open]:rotate-180` class on `SelectTrigger.vue` | about 12 |
| The reka indicator wrappers around the menu and select marks | `DropdownMenuCheckboxItem.vue:50-53`, `DropdownMenuRadioItem.vue:46-49`, `SelectItem.vue:76-84` | 3 spans |
| The Minus and Check `v-if` inside the checkbox mark | `src/components/checkbox/Checkbox.vue:48-49` | swap by pose |
| The text sort glyph (↕ ↑ ↓) | `src/components/data-table/DataTable.vue:170-174, 401` | one arrow: absent by the pose when unsorted, flipped when descending |
| `fade`, `tab-fade`, `pane-swap`, `metric-swap` and their reduced-motion arms, which no component uses | `src/styles/transitions.css:15-82, 129-156` | about 95 |
| On keyframes' side, once it adopts: the whole-dock view transition that hides its Play and Pause swap | R K4 | consumer |

`data-allow-motion` on the toggle's groups stays. It exists so the icon survives the theme flip's transition kill, and that flip is census row 16, which this proposal does not cure.

### What it cures

- CENSUS worst snaps: **12** (every icon swap by `v-if`), **8** (menu and select marks), the sort glyph in **10**, the Maximize and Minimize swap in **20**, and **17** where the seat is reserved (a Metric value or an avatar image entering under `<Transition name="glyph">`).
- CENSUS hover: the DarkModeToggle row, and with the plate the other nine failing rows.
- CENSUS menu table: the sub-trigger chevron that does not move when its submenu opens.
- BRIEF: "each icon should have animated hover states" with one attribute and no wrapper; O-279; the direction menu's arrows; the easing curve on hover and in the trigger on click; atlas's unanimated Collapsible chevron (its glass row 4).
- The owner at 17:05 ("flat in color, not shaded"): the fill verb is one flat `currentColor`.

## 3. The plate

### Name and place

`src/components/_shared/intent/plate.css`. The class is `plate`; a group whose selection travels is `plate-group`.

### API

| Write | Meaning |
|---|---|
| `class="plate"` on a control | it has a hover, focus, pressed and on state, all from one rule |
| `--plate-round` | the control's corner; the control states it once and its own `border-radius` reads it |
| `--plate-tone` | the control's one colour (default `--foreground`). The same colour, deeper, is "engaged" (`affordance-map.md`). A consumer with a palette per page sets this per seat, which gives keyframes' coloured icons their plates and Google's per-destination colour without a second mechanism |
| `class="plate-group"` on the parent of `.plate` members | selection is one shape that travels |
| `--plate-l`, `--plate-r`, `--plate-t`, `--plate-b` on the group | where the selected member sits, as insets from the group's edges |
| `data-plate-fill` with `--plate-fill` (0 to 1) on a busy plate | how far the work has got. The attribute marks the plate as measured, so it does not breathe |
| `data-idle`, `aria-busy="true"` | section 4 |

That is the whole surface. `--fill-hover` (0.05) and `--fill-selected` (0.12) already exist (`src/styles/tokens/color-radius.css:156-157`) and set the two strengths.

### The CSS, in full

```css
@layer components {
    :where(.plate, .plate-group) {
        position: relative;
        isolation: isolate;
        border-radius: var(--plate-round, var(--radius-control));
    }

    :is(.plate, .plate-group)::before {
        content: "";
        position: absolute;
        inset: 0;
        z-index: -1;
        pointer-events: none;
        /* One flat fill at the "on" strength. Opacity carries every lighter state,
           so no colour ever transitions. */
        background: color-mix(
            in oklab,
            var(--plate-tone, var(--foreground)) calc(var(--fill-selected) * 100%),
            transparent
        );
        opacity: 0;
        /* The one shape. --plate-g is how far the plate stands in from its seat. */
        clip-path: inset(
            calc(var(--plate-t, 0px) + var(--plate-g, 0px))
            calc(var(--plate-r, 0px) + var(--plate-g, 0px))
            calc(var(--plate-b, 0px) + var(--plate-g, 0px))
            calc(var(--plate-l, 0px) + var(--plate-g, 0px))
            round var(--plate-round, var(--radius-control))
        );
        transition:
            opacity var(--duration-control) var(--ease-standard),
            clip-path var(--spring-present-duration) var(--spring-present);
    }

    /* Rest: 4 px inside the control, not painted. */
    .plate::before { --plate-g: 4px; }

    /* Pointed at, or focused: grown to the edge, at the light strength. */
    @media (hover: hover) {
        .plate:hover:not(:disabled, [aria-disabled="true"])::before {
            --plate-g: 0px;
            opacity: calc(var(--fill-hover) / var(--fill-selected));
        }
    }
    .plate:is(:focus-visible, [data-highlighted])::before {
        --plate-g: 0px;
        opacity: calc(var(--fill-hover) / var(--fill-selected));
    }

    /* On, open or current: the full strength, held. */
    .plate:is([aria-pressed="true"], [aria-expanded="true"],
              [aria-current]:not([aria-current="false"]),
              [data-state="on"], [data-state="open"], [data-state="active"])::before {
        --plate-g: 0px;
        opacity: var(--plate-set, 1);
    }

    /* Pressed: the full strength for as long as the press lasts. */
    .plate:active:not(:disabled, [aria-disabled="true"])::before {
        --plate-g: 0px;
        opacity: 1;
    }

    /* A group: one shape for the selection. Members keep their hover and press. */
    .plate-group .plate { --plate-set: 0; }
    .plate-group::before {
        transition:
            opacity var(--duration-control) var(--ease-standard),
            clip-path var(--spring-dock-duration) var(--spring-dock);
    }
    .plate-group[data-plate]::before { opacity: 1; }

    @media (prefers-reduced-motion: reduce) {
        :is(.plate, .plate-group)::before {
            --plate-g: 0px;
            transition: opacity var(--duration-control) var(--ease-standard) !important;
        }
        /* Travel becomes a fade in place: the old member fades out, the new one in. */
        .plate-group::before { content: none; }
        .plate-group .plate { --plate-set: 1; }
    }
}
```

### The templates

```vue
<!-- 1. A dock seat (DockControl.vue:92-103). The classes glass-specular-track,
        glass-capsule-hover and the conditional glass-capsule go; v-specular goes. -->
<Primitive :class="cn(isTab ? 'dock-tab-button' : 'dock-icon-button', 'plate', props.class)" …>
```
```css
/* icon-button.css: the seat states its corner, and keeps its painted inset */
.dock-icon-button {
    --plate-round: var(--radius-control);
    --plate-t: var(--dock-control-safe-inset); /* and r, b, l */
}
```
```vue
<!-- 2. A run of equal seats. No measuring: the template binds the index. -->
<div class="dock-run plate-group" :data-plate="activeIndex >= 0 ? '' : undefined"
     :style="{ '--plate-i': activeIndex }">
```
```css
.dock-run.plate-group {
    --plate-l: calc(var(--plate-i) * (var(--dock-control-size) + var(--dock-gap)));
    --plate-r: calc(100% - var(--plate-l) - var(--dock-control-size));
}
```
```vue
<!-- 3. Tabs, the toggle group, the dock switcher: members of unequal width.
        The indicator element goes. useSelectionIndicator keeps its one measure
        per selection change and writes four insets on the group instead of
        translate, width and height on a div. -->
<div class="segmented-tabs plate-group" :data-plate="…" :style="selection.plateStyle.value">
    <button v-for="tab in tabs" class="segmented-tab plate" …>
```
```vue
<!-- 4. The dialog's close button. Its private plate (dialog/styles.css:115-140)
        becomes the shared one; the look is the same. -->
<DialogClose class="plate" data-slot="dialog-close" style="--plate-round: var(--radius-circle)">
    <X data-glyph="turn" style="--glyph-turn: 90deg" />
</DialogClose>
```

A menu row, a text Button, a Collapsible trigger, the sort header, the sortable handle, the Timeline mark, the toast's close and the ExpandableContainer trigger each gain the class and lose their own hover rule.

### How the shape carries intent

One rectangle, five readings, and no shape that is not the control's own:

| Intent | The rectangle | The strength | Clock |
|---|---|---|---|
| "Pressable" | grows 4 px, from inside the control to its edge | 0 to 0.42 | `--spring-present` (0.2 s): "a menu, plate, toast or orb born from its anchor" is that row's stated job |
| "Received" | holds at the edge | to 1 | the fade alone, 0.12 s |
| "On", "open", "you are here" | holds at the edge | 1, held | the same |
| "This one now" (a group) | travels and resizes to the next member, corners true on every frame | 1 | `--spring-dock` (0.21 s): "member FLIP, the selection lens, indicator glide" |
| "This far" (progress) | its far edge follows `--plate-fill` | 1 | `--spring-present` |

The growth is a fixed 4 px, not a fraction. On a 40 px seat that is Google's 0.8 (G C1). On a 400 px card it is 1 % a side, which is Apple's card (A K1). One rule gives the small control a motion you see and the large one a change you feel, with no size-specific tuning. This is also why the plate uses a clip rectangle and not a scale: a scale cannot hold a constant travel across sizes, cannot hold true corners while it changes width, and cannot fill from one edge.

The plate (larger, 0.2 s) and the glyph (smaller, 0.12 s) start together and the glyph lands first. The weight is in the two clocks; there is no delay or stagger.

### In and out

- Hover and focus: one declaration, 0.2 s in and 0.2 s back, the fade inside it at 0.12 s both ways. The leave is what Google's bar lacks and what daraksha saw missing ("a highlight that vanished on leave").
- Press: the strength rises in 0.12 s and falls back to the hover strength in 0.12 s on release.
- Selection in a group: the rectangle leaves one member and reaches the next as one motion, 0.21 s, interruptible from wherever it is.

### Reduced motion

The rectangle does not grow or travel. Hover, press and on are a 0.12 s fade of the same fill. In a group the travelling shape is switched off and each member's own plate fades instead, so selection cross-fades in place. Nothing cuts.

### Safari

| Feature | Documented floor |
|---|---|
| `clip-path: inset(… round …)` and its transition | 13.1 unprefixed. A transition between two rounded insets ran identically in Playwright WebKit and Chromium (R E7) |
| `color-mix()` | 16.2; glass uses it throughout |
| `:focus-visible` | 15.4 |
| CSS nesting, `linear()` | 17.2, as for the glyph |

No fallback. The question that is open is cost, not support: whether either engine composites a `clip-path` transition is unmeasured (STUDY, P4), so this proposal counts it as paint of one flat rectangle per frame.

### Cost

- Bytes: about 50 lines, about 1.7 KB raw (estimate).
- DOM nodes added: 0. The pseudo-element is the one the gleam holds today. Each group with an indicator element loses that element.
- Properties animated: two, `opacity` and `clip-path`. No colour, shadow, filter or radius animates.
- Layout per frame: none. The tab indicator's `width` and `height` legs, which are layout per frame today, go.
- Script: none for hover, focus, press or on. A group of equal seats needs none at all. A group of unequal members does one read and one write per selection change, in the writer that exists.
- Paint: one flat fill inside a control. On a control inside a blurred surface this is the same class of work as the `background-color` fade those controls run today.
- Frame time: not measured (section 7).

### What it deletes

| What | Where | Lines today |
|---|---|---|
| The pointer gleam: the masked radial gradient, its blend, its typed properties, its opt-in transition block | `src/styles/glass/material.css:128-260` (about 130); `src/styles/glass-specular-track.css` (68); `src/styles/tokens/property-regs-specular.css` (82) | about 280 |
| Its script and directive, and their exports | `src/composables/glass/useSpecularTracking.ts` (146), `vSpecular.ts` (93); `v-specular` on Button, DockControl, DockTrigger | 239 |
| The hover that was only a gleam | `src/styles/glass/glass-capsule.css:88-116` | about 28 |
| The dock's three per-control hover fills | `icon-button.css:126-131`, `tab-button.css:67-72`, `triggers.css:72-77` | about 18 |
| The selected seat's five properties, its own backdrop filter and its three shadow layers | `icon-button.css:188-232`; the conditional `glass-capsule` class at `DockControl.vue:96-97` | about 45 |
| The selected fade on tab seats and triggers | `tab-button.css:96-99`, `triggers.css:115-140` | about 30 |
| Three indicator elements with their `width` and `height` transitions and the tab pill's three shadow layers | `src/components/tabs/styles/segmented.css:150-166`; `src/components/dock/styles/layer-group.css:343-360`; the toggle group's | 3 nodes, about 40 |
| The menu row's six transition legs, written three times, and its 1 px lift | `src/components/_shared/menu/menu.css:11-69` | about 55 |
| The dialog close's private plate | `src/components/dialog/styles.css:115-140` | about 25 |
| The text Button's untweened underline | `src/components/button/styles.css:205-207` | 3 |
| The Chip's selected growth on an overshooting curve and its radial flood | `src/styles/glass/glass-chip.css:26-57` | about 30 |
| The press spring, if the owner takes OWNER-READ question 1: `.tap-squish:active` already gives a uniform shrink to 0.97 on the press spring with no script, and the plate gives the deeper tone | `useLiquidPress.ts` (294) and `useSpringPress.ts` (106) once Button, DockControl, DarkModeToggle, Card and Timeline stop calling them; the eight listeners at `Button.vue:183-190`; the brightness filter and press variables at `icon-button.css:67-102`; the press-coupled gleam at `button/styles.css:282-296` | about 450 |

Removing `vSpecular`, `useSpecularTracking` and `useLiquidPress` from the public exports is a breaking change. `restraint.md` already orders the gleam out ("Remove, do not tune"), and `affordance-map.md` says the release that deletes it rewrites the map's table on the same commit.

### What it cures

- CENSUS worst snaps: **7** (the dock's highlight travels; no border or backdrop switches on), the hover half of **18** (the Timeline mark).
- CENSUS hover table: all ten failing rows and the glass Button and Chip rows marked weak. Every passing row that fades in place now grows.
- CENSUS tabs table: the indicator no longer animates layout properties (`motion-canon.md` P5).
- STUDY over-do rows 1, 2, 4, 8, 9, and 5 if the press goes.
- BRIEF: keyframes' flat-sided hover plate (the clip's `round` keeps the corner on every frame); O-286 (the radial glow under the pointer is the gleam); the selected half of O-287; O-285 and O-284 by the CSS press (a nested control carries its own `.plate` and `.tap-squish`, and section 1 keeps its glyph its own); daraksha's highlight that jumps and that vanished on leave; the seat states of O-276; the seat-highlight part of O-248; atlas's ask to adopt the plate with nothing of its own (a class).

## 4. Large elements: the same two ideas, unchanged

A large element shows four states (`affordance-map.md`, "Intent first"). Each is already in the two rules above, plus one keyframe.

```css
/* plate.css, the last rule */
@layer components {
    .plate[aria-busy="true"]::before {
        --plate-g: 0px;
        --plate-r: calc((1 - var(--plate-fill, 1)) * 100%);
        opacity: 1;
    }
    @media (prefers-reduced-motion: no-preference) {
        .plate:is([data-idle], [aria-busy="true"]:not([data-plate-fill]))::before {
            animation: plate-breathe 1.1s var(--ease-standard) infinite alternate;
        }
    }
}
@keyframes plate-breathe {
    to { opacity: calc(var(--fill-hover) / var(--fill-selected)); }
}
```

The clip's insets are physical, so under `:dir(rtl)` the busy rule writes `--plate-l` in place of `--plate-r`, as `Progress.vue:192-194` does for its fill.

The keyframe names only its far end. It starts from whatever the plate is showing: an idle plate breathes from nothing up to the hover strength, and a busy plate from the full strength down to it. So entering either state begins at the current frame. The clock is the Skeleton's breathe (1.1 s, alternate, `--ease-standard`; `Skeleton.vue:147-160`), the one loading rhythm glass has; no new clock.

| State | What shows it | How it is entered and left |
|---|---|---|
| **Idle** | `data-idle`: the plate breathes between nothing and the hover strength. It says "this is where you act" in the element's own colour. Declared, never default; one per view, on the primary action or the focused element. | From rest, so the first frame is the rest frame. A pointer arriving takes over with the hover rule. Stops under reduced motion. |
| **Interactive** | The plate grows 4 px and the glyph answers (sections 2 and 3). On a card that is a 1 % change. | As above. |
| **In progress** | `aria-busy="true"`, which Button and others already stamp. The plate holds at the full strength and breathes down to the hover strength; with `data-plate-fill` it stops breathing and its far edge shows how far. A leading glyph may swap to the DotRing by the pose, in its own seat. | From pressed (strength 1), so pressing a button and its work starting are one continuous state. |
| **Done** | `aria-busy` drops. The plate eases back to rest. The glyph swaps to a check whose stroke draws on, by the pose. | 0.12 s fade; 240 ms swap. |

Per element, what changes in glass:

| Element | Idle | Interactive | In progress | Done |
|---|---|---|---|---|
| Button | `data-idle` on the one primary action (speedtest's Start) | plate, glyph, CSS press | `loading` stamps `aria-busy`; the plate breathes. **No ring is inserted**, so the width never changes | the consumer's own glyph swaps under `<Transition name="glyph">` |
| Dock | none added; its rest is the fold by dwell (O-275) | seats are plates; selection travels | a working seat carries `aria-busy` | the seat's glyph swaps back |
| Card (selectable) | none | plate at 4 px; selected holds | `aria-busy` on the card | a leading glyph draws its check |
| Dialog, Sheet | `data-idle` on the primary action if the consumer declares it | close button and actions are plates | the action is busy, not the surface: one layer per surface | the action's glyph, then the surface's own exit |
| DataTable | none | sort header is a plate; its arrow flips | skeleton rows, as today | (size: section 5) |
| Timeline | the active mark is a plate with `data-idle` | marks are plates | the active mark | the check draws on, as today, and now leaves by the pose |
| Metric | none | none | the skeleton, as today | the value enters by the pose |
| Progress | none | none | indeterminate: the fill breathes at full width | the full bar is the fact |
| Toast | none | close is a plate | none | a tone glyph draws on at arrival |

Deleted on the way:

| What | Where |
|---|---|
| The ring mounted into the Button by `v-if`, which widens it at once and leaves by a cut | `src/components/button/Button.vue:192-198` and its `.button-mark` rules. `DotRing` itself stays for seats that are reserved (InfiniteScroll) |
| The indeterminate gradient sweep on `background-position`, a paint per frame | `src/styles/glass/track-flow.css` (115 lines), once Progress and Timeline breathe |
| The completion glow, an animated inset shadow | `src/components/progress/Progress.vue:205-222` |

Cures: CENSUS worst snap **5**; the gaps in the census's large-element table (no progress state on Dialog, Card, Dock or Command; no done state outside Progress and Timeline); the Progress rows "indeterminate band on and off" (the breath begins from the current frame); STUDY over-do row 10 for the track. The Skeleton's shimmer variant is marked owner-ruled in its own source and is left alone. The StatusDot's pulse is left alone; `mark.css` rules it one of the register's two rest carriers.

## 5. What these two ideas do not cure

Stated so nobody reads it as covered.

- **Any box whose size changes.** CENSUS worst snaps 1, 3, 4, 6, 9, 13, 15 and 20, the dock's width, height and corner (R K1, `inbound/GLASS-DOCK-JUMPS.md`), atlas's enlarged plate and its sheet. A plate is a fill inside a box that already has its size. It cannot be stretched into the box piece: a clip on the surface itself would cut the surface's shadow for the length of the tween, which is its own snap. These rows need the study's P4.
- **Rows that enter or leave a list** (snaps 9, 10, 19's departing pip). The pose serves one thing in a reserved seat.
- **The theme flip** (16), **the focus ring** (2, OWNER-READ question 3), **the slider's loupe** (14).
- **The universal reduced-motion rule** (11). These two pieces carry their own fades through it; every other component still cuts until that rule changes.
- **The no-snap check** atlas asked for. Both pieces are plain CSS transitions between two computed values, so a frame sampler can pause and seek them; the check itself is not in this proposal.

## 6. The owner's pass: what was cut

Read again as he would, with "NO overuse of shading, transition, or markup" in hand. Each line was in the first draft and is gone.

1. **A shaped plate.** No pentagon, clover or `clip-path: path()` in glass, and no hook for one. Shape changes are changes of the control's own rounded rectangle. This is OWNER-READ question 2's default; if he wants shapes on dock page icons, that is a later, consumer-side piece.
2. **The plate's turn.** Google's 45 degrees only reads on a shape that is not round.
3. **A sixth verb, weight** (`stroke-width` 2 to 2.5, the nearest thing to Google's font axis). It re-rasters the glyph and cannot be told from grow at 16 px.
4. **Combined verbs.** One motion per glyph. The attribute takes one word.
5. **A glyph that moves on keyboard focus.** Focus is answered by the plate's fade alone.
6. **A press inset on the plate** (1 px in). The press is the fill deepening; a shrink, if he wants one, is the control's own and is one answer, not two.
7. **A second tone for "on".** The fill never changes colour, so no colour transition exists on the plate at all. Opacity carries every state.
8. **A shorter exit clock for hover.** One declaration, both ways.
9. **A delay between plate and glyph.** The two clocks already order them.
10. **`@starting-style` on glyphs.** It would fade every icon up at page load, which is the "fade-up on every element" `restraint.md` bans. Arrival is by the pose, only where something actually arrives.
11. **A lift for large elements** (Apple's 1 % scale with a deepening shadow). The 4 px plate already says it; no shadow animates anywhere in this proposal.
12. **A flash at done.** No discharge glow, no pulse of the plate. The check drawing on is the statement.
13. **A breathing glyph.** Idle is the plate's opacity and nothing else, and only where declared. Small controls stay still.
14. **The ring inside the Button.** One fewer node, and the width jump goes with it.
15. **A nudge that reverses when its menu is open.**
16. **A wrapper component for state pairs.** Vue's `<Transition>` renders no element and the pose is already CSS.
17. **Any `will-change`, any gradient, any shadow, any blur, any border** on either piece.

What is left, counted per interaction: on hover, two properties on one pseudo-element and one on the glyph; on press, one; on a selection, one. At rest, no animation exists on any control that has not declared `data-idle`.

## 7. What the prototype seat must read

In Chromium and in WebKit, and stated per engine:

1. **A dock seat inside the blurred dock:** frame time for hover in and out, and whether the `clip-path` leg is composited or painted. If the paint is over budget on a blurred host, the one honest change is that the in-place plate grows by `scale` on small seats; the group, progress and large-element forms need the rectangle and keep it. That is a design decision on a reading, not a runtime fallback.
2. **A five-seat group:** selection travel end to end, corners on every frame, largest step against daraksha's targets (12 % of travel; first 4 %; last 2 %).
3. **Leaving a breath:** the first frame after `aria-busy` or `data-idle` drops. The rule relies on the transition starting from the animated value; if WebKit starts it from the underlying value, that frame is a jump and the breath needs another form.
4. **A state pair:** Play and Pause under `<Transition name="glyph" mode="out-in">`, sampled every 20 ms, with a second toggle at 60 ms to read the interruption.
5. **An inner group:** the theme toggle's sun with `transform-box: fill-box` and an individual `rotate`.
6. **Forty plates at rest:** zero running animations and zero listeners.
7. **A nested control:** the pointer over a button inside a trigger moves the inner glyph and not the outer one.
8. **Bytes:** both files built and gzipped.

## 8. Three things only the owner can settle, each with a strip

1. **Press.** With the press spring gone, a press is `.tap-squish`'s uniform 0.97 with the plate at full strength. This is OWNER-READ question 1 with its mechanism named.
2. **The tab pill.** As the group's plate it is one flat fill. Today it is a raised capsule with a rim and a recess. The strip should show both.
3. **A busy Button with no ring.** The plate breathes and the label holds. The DotRing was ruled the library's one work-in-flight mark; here it keeps reserved seats only.
