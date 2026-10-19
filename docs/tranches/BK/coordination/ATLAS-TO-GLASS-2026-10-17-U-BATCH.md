# ATLAS → GLASS · 2026-10-16 · the U batch (one relay: 11 rows, 8 questions, 3 notices)

From the sci-report / atlas U formation (build lane pass B4, design loop P2). This is the one batched relay. Nothing else from U goes to glass ahead of it or beside it. Prepared by the B4 glass-relay seat; delivered by the U parent session.

**Wave marking.** Rows G-1 to G-4: `D5A-W0 · glass-ui → 10.1.1` (the glass patch wave of atlas's release train, `loop/P2/specs/D5-SPECS.md:73-76`). Rows G-5 onward: `W-GLASS-RELAY · glass-ui → 10.1.1`, unless a row says otherwise. Questions and notices carry no vehicle.

**Why 10.1.1, and why now.** Owner ruling H-A1 (`sci-report atlas/docs/tranches/U/RULINGS-2026-09-23.md` §J): no atlas 8.0.0 rc ships on the three located 10.1.0 defects (G-1, G-2, G-3). Under the root-repo law they are cured in glass-ui as 10.1.1, before atlas `8.0.0-rc.1`. If glass declines, atlas 8.0.0 waits for the next glass 10.x that carries all three, and atlas adds no override.

**The version every row was measured on.** The defects were located in the published `@mkbabb/glass-ui@10.1.0` itself. The tarball came from `npm pack` and its integrity matches the registry and atlas's lock: `sha512-0CdyEQeDFyfYiB2CrFw8H4sfdIyp0GexcpZEmummkQ/HCSaOyLzfqz8589dIvO1UKM+W0O3PUsJc6NV4bw+79w==`. Its sha256 is `c49a783e…7891b`. Source lines are cited at tag `v10.1.0` (`d8bda2a9`). `git diff v10.1.0 HEAD -- src` on glass master is empty, so the lines hold at your HEAD too. We read the export subpaths, not filenames: styles come through `./styles` → `dist/styles/index.css`, and that file imports `../glass-ui.css`, so the SFC bundle ships too. This follows your routing table's two lessons (`BK/coordination/ATLAS-BATCH-ROUTING.md` §4).

**Glass-only repro.** Path: `~/Programming/.u-build/out/b4-glass-relay/`.
- `repro/glass-only.css` is glass 10.1.0's `./styles` compiled alone with Tailwind 4.3.2 plus `tw-animate-css`. No atlas or sci is involved.
- `repro/rows.html` is a static page.
- `tools/probe.mjs` drives Playwright 1.60.0 headless: Chromium at 1440 fine and 390 coarse, Firefox at 1440.
- `repro/probe-out.json` holds the raw rows.

Rows G-1, G-2, G-5, G-6 and G-7 reproduce on that page with glass alone. G-8 is read from code only. G-3 and G-4 reproduce on a glass-only Vue page (three engines) and in a glass unit test (below).

**Rows you already hold.** G-1 is your inbound O-74c G-1 SHEET-POSITION (`BL/audit/INBOUND.md:30`). Your own design seat also patched it locally (`BL/design/engagement/pass-1/P-B/sheet-position-local.patch`, "The Sheet's owner owns it"). G-2 is your O-78 MENU-STACKING, booked into BL W-0.4 for 10.2.0 (`BL/PLAN.md:84`, `LEDGER.md:1001`). G-3 and G-4 are the case BL W-I.2 generalises, booked for 11.0.0 (`BL/PLAN.md:206`). This relay adds the consumer facts those rows lack, and it asks for the version H-A1 needs.

---

## Part A · The 10.1.1 patch rows (H-A1 gate) · `D5A-W0 · glass-ui → 10.1.1`

### G-1 · `SheetContent` renders in document flow (F-1)

- **Located.**
  - `src/components/sheet/SheetContent.vue:106` gives every sheet `surfaceClass("floating")`, which compiles to `dist/sheet-BQJyER59.js:202`.
  - `src/styles/glass/material.css:47` sets `.glass-floating{position:relative}` at specificity 0,1,0 in `@layer components`. `ladder.css:124-132` authors it a second time.
  - The sheet's own `position: fixed` is in `src/components/sheet/styles.css:29-31`, as `:where([data-slot="sheet-content"])`. That is 0,0,0 in the same layer (`dist/components/sheet/styles.css:1`, col 18), so it always loses.
  - `DialogContent` is unaffected because it positions with the `fixed` utility (`DialogContent.vue:181`).
- **Repro (glass alone).** The element `<div data-slot="sheet-content" data-side="right" class="glass-floating">` sits at the end of a 3000 px page.
  - Stock: computed `position: relative`, box at y 3000. Off screen in Chromium at 1440 and at 390, and in Firefox at 1440.
  - The same element without the class computes `fixed` at `[1056,0,384,900]`.
  - In served atlas it opens 0 of 5 on screen per engine on the phone (`loop/P2/proto/D3-C.md:291`), and 12 of 12 cells on desk (`loop/P2/research/D5-A.md:401-413`).
- **Expected.** An open sheet is `position: fixed` and inside the viewport whatever material it wears.
- **Cure shape, measured, glass's choice.**
  - Cure A: `cn("fixed", SIDE_BORDER[props.side], surfaceClass("floating"), props.class)`, and drop `position: fixed` from the `:where()` rule. Diff at `loop/P2/proto/D5-A/r3/glass-cure-a.diff`.
  - Measured: 16 of 16 sheets fixed, in view and hit at the centre in each of three engines. Census delta: 0 of 102 elements.
  - The other shape is that material classes stop authoring `position` at all. Today they author it twice (`material.css:47`; `ladder.css:62,88,104,132,151`; `surfaces.css:21`).
  - The repro page measures cure A's arm as `fixed`.
- **Acceptance test.**
  - A `tests-visual` engine spec: mount `SheetContent` for each side in a page taller than the viewport, open it, and assert `position: fixed` and a box inside the viewport, in Chromium, Firefox and WebKit 2287.
  - A source-read unit beside `tests/components/sheet/sheet-attrs.test.ts`: the content's class list carries `fixed`, or no material rule declares `position`. happy-dom runs no cascade, hence the source read.

### G-2 · Dropdown menus carry no z rung; the Download menu opens under the dock

- **Located.**
  - `src/components/menu/DropdownMenuContent.vue:86-90` and `DropdownMenuSubContent.vue:44-48` pass `class: props.class` to `overlayContentAttrs`, with no z class (`dist/menu-BnmCOa3y.js:106-111` and `:474-479`; `grep -c z-popover` on that chunk gives 0).
  - `PopoverContent.vue:127` carries `["z-popover", props.class]` (`dist/popover-DA87hFBx.js:160`), and `SelectContent` carries `z-popover` too.
  - Reka's popper wrapper copies the content's computed `z-index`, so one class on the content is the whole cure.
- **Repro (glass alone).** A `position:fixed; z-index:var(--z-dock)` bar (40) covers a `[data-slot=menu-content]` inside a wrapper that copies its z.
  - Stock: `z-index: auto`, and 0 of 5 probe points land inside the menu.
  - With `z-popover`: 130, and 5 of 5 land inside, in every engine and viewport.
  - Atlas served build: 1 of 5 before and 5 of 5 after, in 6 of 6 cells across three engines (`research/D5-A.md:639-651`).
- **Expected.** Menu and submenu paint above `--z-dock`, at `--z-popover`.
- **Cure.** At the one shared site: both menu contents call `overlayContentAttrs({ role: 'menu' })` (`_shared/overlay/content.ts`; `DropdownMenuSubContent.vue:44-48`), so W-0.4's "one site" cure there covers the submenu too. Our per-file diff (`loop/P2/proto/D5-A/r4/z-rung.diff`, 2 files, +2 −2, green in the glass dock suite) is the less root-cause option and is offered only as a measured witness.
- **Acceptance test.** Source-read: every overlay content in `menu/` passes `z-popover`. Engine spec in `tests-visual`: a menu and a submenu opened beside a fixed `--z-dock` bar hit-test to themselves at 5 of 5 points.
- **Ask.** If 10.2.0 cannot be cut before atlas `8.0.0-rc.1`, lift W-0.4's menu leg into 10.1.1.

### G-3 · A composite nested in a dock seat loses its tab stop and its arrow keys

- **Located.**
  - In `src/components/dock/composables/useDockRun.ts`, `syncRoving` (`:211-226`) writes `target.tabIndex = idx === stop ? 0 : -1` onto `focusTargetOf(seat)` (`:95-98`). That target is the seat itself if focusable, or else its first focusable descendant. The write runs again on every subtree mutation (`:295-308`, a MutationObserver).
  - `onKeydown` (`:243-`) treats any arrow from inside a seat as a run key.
  - Bundled: `dist/dock.js:653` (the write), `:660`, and `:870` (`role: "toolbar"`).
- **What it does.**
  - The run writes `-1` onto the selected item of a ToggleGroup or SegmentedTabs nested in a container seat. At rest the group has 0 stops; after a click it has 2, because glass writes 0 onto the first item and Vue writes 0 onto the selected one.
  - An ArrowRight inside the group leaves it for the next seat. Vue never repairs the attribute, because its own value has not changed.
  - The atlas B4 adopt lane described one face of this as "adds an extra tab stop". Both faces are this one writer.
- **Repro (glass alone).** A GlassDock run of [button, a container seat holding a ToggleGroup with its first item selected plus a button, button].
  - On 10.1.0: stops = 0 (`Capacity*:-1 Share:-1 Count:-1`); the Tab walk never reaches the group; ArrowRight inside the group moves focus to seat 2.
  - Identical in Chromium, WebKit 2287 and Firefox at 1440 and 390 (`loop/P2/proto/D5-A/r4/glass-rows.txt`).
  - In atlas: 6 of 6 cells at 1440 and 3 of 3 engines at 390 lose the control (`research/D5-A.md:783-813`).
- **Expected.** A run never writes into a composite widget it does not own. A container seat keeps its descendants' own tab order, and keys pressed inside a seat the run does not rove belong to that seat.
- **Acceptance test.** `g-dock-seat-rule.test.ts` (3 tests), kept at `sci-report atlas/docs/tranches/U/loop/P2/proto/D5-A/r4/g-dock-seat-rule.test.ts`. Colocate it beside `tests/components/custom/dock/g-dock-lattice.test.ts`. It is 3 of 3 RED on 10.1.0's `useDockRun` (`r4/glass-dock-tests.txt`: `expected [] to deeply equal ['x']`; `expected null to be '2'`; focus left the inner button) and green on both cure variants.

### G-4 · The seat rule for container seats (NCX-2, H-A6)

- **Located.** Same file as G-3. `GlassDock.vue:459-462` claims `role="toolbar"` over the run whatever its seats are.
- **What the consumer side knows.**
  - **Variant b-i fails on glass alone.** b-i is "rove only a seat that is itself focusable" (`proto/D5-A/r4/seat-bi.diff`).
    - Its first `syncRoving` writes `-1` onto non-stop `div[role=button][tabindex=0]` seats. They then fail `FOCUSABLE_SELECTOR` (`src/components/_shared/focus.ts:11-20`) and drop out of the run, so they lose both Tab and arrow reach.
    - Test: `crit-seat-cx.test.ts`, RED on b-i (`expected '0' to be '1'`), kept at `loop/P2/critique/D5-A/crit-seat-cx.test.ts` (`critique/D5-A.md:40-54`).
  - **b-ii passes on glass alone.** b-ii is a declared seat marker: `data-dock-seat-target` on `DockControl` (`proto/D5-A/r4/seat-bii.diff`, 4 files, +22 −9).
  - **The third shape (spec only):** a run that holds any seat whose focus target is not the seat itself does not claim `role=toolbar`. It does no roving, has no arrow handler, and keeps a plain Tab order.
  - **In atlas, neither b-i nor b-ii gives a one-stop toolbar:** 13 to 15 Tab stops under `role=toolbar` on every glass-10 build (`proto/D5-A.md:201, 281-285`).
  - **Atlas's own run after the A-39 ruling.** A-39 moved per-figure actions out of the dock (atlas `u/build-atlas-plate` 8000ff6), so the nested toggle group of G-3 leaves atlas's run.
    - Container seats remain: the step-link viewport, the persistent foot (year range, save view, dark mode, collapse) and the membrane-provenance seat.
    - On a 10.1.0-shaped run the foot's `dock-year-range` and the membrane-provenance seat's `provenance-bar-handle` were written to `-1` (`proto/D5-A/r4/seats.txt` row 7456; row 7457 shows both at 0, so the census is state-dependent).
    - A glass-10 build of the post-A-39 tree now exists (atlas `u/build-atlas-rc` fccfcda, glass 10.1.0). Our next build pass measures the seat census there and sends the result as an addendum to this letter.
    - So the seat rule is not only "for other consumers": atlas still meets it.
- **Expected.** A dock that claims `role=toolbar` behaves as one: one stop, with arrows across seats. A run whose seats are containers either declares single-control targets (b-ii) or does not claim the toolbar role (the third shape).
- **Ask.** Drop b-i. Ship b-ii or the third shape in 10.1.1, with `g-dock-seat-rule.test.ts` and `crit-seat-cx.test.ts` colocated. Your choice decides atlas's chase: seat markers, or single-control seats. BL W-I.2's marker-based member query can generalise it in 11.0.0. 10.1.1 needs only the minimal rule.
- **If this cannot ride a 10.x, tell us.** H-A1's fallback ("the next glass 10.x that carries all three") is not met by BL as planned. W-I.2 is booked for 11.0.0, and G-3 is cured only by a seat rule.

---

## Part B · Further defects, asked for 10.1.1 (not H-A1 gating) · `W-GLASS-RELAY · glass-ui → 10.1.1`

If you judge a row semver-minor, put it in the next 10.x minor and say so in your reply.

### G-5 · Under a coarse pointer the Button's box and its rung disagree (the "r 30 on 44" row)

- **Located.**
  - Under `pointer: coarse`, `light-dark.css:19-20` sets `--ui-scale: 1.5` and `--control-floor: 44px`. So `--button-size` = `max(rung × 1.5, 44px)`: 44 / 54 / 60 / 66 for xs / sm / md / lg (`sizing.css:20, 26-29`).
  - `.button` sets `min-block-size`, `padding-inline` and `border-radius` from that rung (`button/styles.css:49, 53, 74`).
  - `Button.vue:171` also stamps `data-control-target`. The coarse floor `[data-control-target]{min-block-size: 44px}` (`utilities/responsive.css:4-9`) has the same specificity in the same layer. It is imported after the button (`dist/styles/index.css`: `button/styles.css` at byte 851, `accessibility.css` at byte 1466, and `accessibility.css` imports `./utilities/responsive.css`).
  - So it wins: the floor **lowers** the box from the rung to 44.
- **Repro (glass alone, Chromium 390, coarse).**

  | size | box | computed r | pad |
  |---|---|---|---|
  | xs | 44 | 22 | 18 |
  | sm | 44 | 27 | 23 |
  | md | 44 | 30 | 26 |
  | lg | 44 | 33 | 29 |

  - The engine clamps the painted corner: a pixel fit of the md edge gives a used radius of 22. The visible breach is therefore the pad: 26 where the pairing law on a 44 box gives 18. The computed radius also misleads any reader of computed style.
  - At 1440 (fine pointer) every size holds: 28/14/10, 36/18/14, 40/20/16, 44/22/18.
  - Your 10.0.1 record states "18 for every rung under the 44px coarse floor" (`button/styles.css:25-28`). The measurement refutes it for sm, md and lg.
- **Expected (design read).** One rung governs the box, the corner and the pad. Under coarse either the box is the rung (60 / r 30 / pad 26) or the rung is the box (44 / r 22 / pad 18). Never a 44 box with a 60 rung's pad. Which one is glass's call. The icon-only arm already chooses "box = rung" (`styles.css:251-253`, at 0,2,0).
- **Acceptance test.** An engine spec in `tests-visual` (the coarse context is `isMobile`/`hasTouch`) asserting, for xs to lg, `2 × computed radius == block-size` and `padding-inline == radius − 4px`. The source-read gate in `Button.test.ts` additionally asserts that no rule imported after `button/styles.css` lowers `min-block-size` on `.button`.

### G-6 · The phone side sheet breaks the pairing law (r 24, pad 12)

- **Located.** The side sheet's corner is `--radius-3xl` = 24 px (`sheet/styles.css:391-397`; `theme/radius.css:115`). Its pad is `--space-family` (`sheet/styles.css:558-559`), which the one width query transposes from 20 to 12 at ≤ 768 px (`sizing.css:333-341`). The radius does not transpose. The card has the same family of breach, 16 / 8 at phone width; atlas measured it 27 of 27 across 3 engines (`research/D3-C.md:385, 565`). This is your L15b-02 row.
- **Repro (glass alone).** `#sheet-bare` is r 24 / pad 20 at 1440 (holds) and r 24 / pad 12 at 390.
- **Expected (design read).** `pad = r − 4` at every width. Either the radius transposes one rung with the pad (B: r 16 with pad 12), or the pad leaves the transposition (A: r 24 with pad 20). The atlas substrate measured both (`research/D3-S1.md:366-372`, R-G1): B keeps phone density (figure fill 0.836 against 0.815), and A costs 55 to 121 px of phone height. Glass picks.
- **Acceptance test.** A source-read pairing check over every container role's (radius, pad) token pair, inside and outside the 768 query, plus the repro's two-width read in an engine spec.

### G-7 · HandMark's highlight paints solid black (`--hm-band`)

- **Located.**
  - `src/components/handmark/HandMark.vue:421` declares `--hm-band: light-dark(oklch(.86 .16 h), oklch(.44 .16 h))`, and `:79` fills the hull with it.
  - The build lowers `light-dark()` to `var(--lightningcss-light, …)var(--lightningcss-dark, …)` (`dist/glass-ui.css:1`, byte 28888). Neither switch variable is defined anywhere in the package or in a consumer's Tailwind compile of `./styles`; `grep` finds 0 definitions in `repro/glass-only.css`.
  - The two fallbacks concatenate into an invalid colour. SVG `fill` then falls to its initial value, black.
- **Repro (glass alone).** `.hm[data-v-0e9beb0b] rect{fill:var(--hm-band)}` computes the raw value `oklch(.86 .16 78)oklch(.44 .16 78)` and the fill `rgb(0,0,0)` in light and in dark, in Chromium and Firefox. In atlas it is the /demand crown gloss: 1.64:1 and 2.7:1 (`proto/D3-D.md:276-281`).
- **Expected.** An amber wash in light and its dark arm in dark.
- **Cure (glass's choice).** Declare the band per scheme the way the rest of the dark arm does (BL W-C.5's one-dark-arm law), or ship the lowered form together with its switch.
- **Acceptance test.** Engine spec: the highlight hull's computed fill is a colour that is not `rgb(0,0,0)` and that differs between `color-scheme: light` and `dark`. Build gate: no `var(--lightningcss-` reference ships without its definition.

### G-8 · Body scroll locks do not compose (ExpandableContainer vs Sheet/Dialog)

- **Located.**
  - `src/components/expandable-container/ExpandableContainer.vue:69-91` keeps its own module counter and snapshots `document.body.style.overflow` (`dist/expandable-container-CZUj9BzY.js:15-18`).
  - Dialog and Sheet use reka's `useBodyScrollLock` (reka-ui 2.10.1, `dist/shared/useBodyScrollLock.cjs:23-56`), which keeps its own snapshot.
  - Interleaved, each restores the other's `hidden`.
- **Repro (atlas, served).** Choose Enlarge inside an open sheet. After both close, `body` stays `overflow: hidden` and the next plate's act row is off screen (`proto/D3-C.md:302`, `phdiag.mjs`).
  - Atlas avoids it by closing first and acting on `close-auto-focus`. That costs 882 ms in Chromium, 913 ms in WebKit and 3,082 ms in Firefox per act (`proto/D3-C.md:303`).
  - Not reproduced glass-alone by this seat; the mechanism is read from the code.
- **Expected.** One lock with one counter: ExpandableContainer uses reka's exported `useBodyScrollLock`. Then `body` overflow returns to its pre-open value after any interleaving of opens and closes.
- **Acceptance test.** A unit test: open sheet → open container → close sheet → close container, and the reverse order; `body.style.overflow` ends at its initial value both ways.

### G-9 · `./styles` needs the "optional" peer `tw-animate-css`

- **Located.** `README.md:233` says `tw-animate-css` "is required only for the animated overlay surfaces… a Button-only consumer never needs it", and `package.json` marks it optional. But `src/styles/utilities/btn.css:97` (`dist/styles/utilities/btn.css:1`, byte 526) `@apply`s `data-[state=open]:fade-in`, which every `@import "@mkbabb/glass-ui/styles"` compiles.
- **Repro.** Compile `@import "tailwindcss"; @import "<glass>/dist/styles/index.css";` with Tailwind 4.3.2. It fails with `Cannot apply unknown utility class data-[state=open]:fade-in`. Adding `@import "tw-animate-css"` makes it compile (this seat's `tools/compile.mjs`). The atlas void critic hit the same refusal (`loop/P2/void/critique-D5-A.md:101`).
- **Expected.** Either `./styles` compiles without the optional peer, or the peer is not optional and the README says so.
- **Acceptance test.** A pack test that compiles `./styles` in a scratch consumer that has only the required peers installed.

### G-10 · MIGRATION gaps (docs; rides 10.1.1)

All checked with `grep` over the packed `MIGRATION.md` (4,768 lines):

- **`position` row (`MIGRATION.md:500`).** It says "position the dock with your own classes" and omits that the old `position="fixed"` arm also stamped the dock's z rung. A consumer that follows the row gets a fixed dock painted under the content (`z-index` 0 against 40; crest untappable 0 of 10 steps; `research/D3-S1.md:302`, U-F-S1e). Add "position **and z rung** (`z-index: var(--z-dock)`)".
- **No row for:**
  - `--popover-enter-*` (0 mentions);
  - `.glass-material` (0 mentions);
  - TypewriterText's `respectReducedMotion` prop. The component's `Props` no longer declare it (`dist/components/typewriter/TypewriterText.vue.d.ts:2-25`), while `TypewriterOptions` keeps it (`types.d.ts:103`). 0 mentions.
  - The `--glass-bg-*` family. Only `-clear` has a row (`:2635`), and `dist` declares no `--glass-bg-*` token.
  - The `--glass-opacity-*` tier alphas (beyond `-clear`).
  - ScrollProgressRim's conic perimeter ring, which became a linear fill-pill track. The atlas B4 adopt lane observed this; no 7.0.0-or-later row covers it.
- **Withdrawn (already covered):** `interaction`/`DockInteraction` (`:495`) and `--z-index-hovercard` (`:934`). Two atlas-side records said these had no row; they do.

### G-11 · A declared mark for glass's style root

- **Located.** Nothing in `dist/styles/index.css` marks a compiled sheet as glass's root. The atlas void critic built a sci root that imports glass `./styles` a second time, outside atlas's layer root. It compiles green with 139 unlayered rules, and they outrank every `@layer atlas.*` rule (`loop/P2/void/critique-D5-A.md:89-112`, CX-2).
- **Ask (minor).** A glass-declared mark, such as a `--glass-styles` custom property in a glass layer, so a consumer's build guard can refuse a second glass root. Atlas adds the `glass3` refusing fixture in its own release.
- **Acceptance test.** A source-read test that the mark exists exactly once in `dist/styles/index.css`'s graph.

---

## Part C · Questions (answers wanted; no defect asserted)

- **Q-1 · Consumer-owned dock posture.** Atlas lane R-4 and atlas R-G8 ask this. `MIGRATION.md:495` drops `interaction` because "`expand()` / `collapse()` stay exposed, so a consumer that owns posture still drives it". On 10.1.0 the hover, focus, idle, outside-click, collapsed-tap and touch writers are live against a consumer's own machine, and `collapse={false}` quiets them but never collapses. Is there an intended pole for a consumer-owned posture?
- **Q-2 · Wrapped Button curvature, and the provenance "stadium".** `button/styles.css:59-74` keeps single-line curvature on a wrapped button by design. Atlas measured a six-line uppercase mono label inside a stadium at 390 (278 × 62, r 30).
  - We route the label to atlas: it is atlas's content, and atlas will rework it through its design pass.
  - The desk case (r 20 on a 32 px box) is also atlas's: `VizAppendixDock.vue` sets `min-block-size: 2rem` on a `size="md"` Button, so the box leaves its rung. Atlas uses `size` instead.
  - Glass is asked only to confirm that a Button is meant to hold one line. If it is, a dev warning on wrap would be welcome.
- **Q-3 · `PopoverContent` tier axis.** Atlas's overlay tier can only re-point `--glass-blur-floating` and `--glass-border-floating` inline (`research/D3-S1.md:391`). Is a tier prop intended?
- **Q-4 · The causing event on `update:modelValue`.** `ToggleGroup.vue:59` and `SegmentedTabs.vue:56` (`defineModel`) emit the value only. Atlas wraps 19 sites in capture-phase intent brackets to prove a reader caused a change (`research/D3-C.md:526-531`). Would glass carry the originating event, for example a second emit argument or an `on-commit` event?
- **Q-5 · Unknown props are silent.** `GlassDock` and Card-on-Surface bind `$attrs` with `inheritAttrs: false`, so a dropped prop becomes an inert attribute (`research/D3-S1.md:386`). Atlas's adopt found 18 silent prop drops this way. Is a dev-mode warning possible? This sits close to your O-57.
- **Q-6 · `Alert` has no subpath.** 68 export keys, none `./alert`. `Alert` is reachable only from the root index.
- **Q-7 · `Metric` labels are uppercase** (`metric/styles.css:50`). Atlas's register sets labels in sentence case. Is a case axis intended, or should consumers not use `Metric` labels?
- **Q-8 · ExpandableContainer morph.** At 10 there is no `view-transition-name` capability for a figure-to-enlarged morph (atlas B4 adopt lane R-7). Intended?

## Part D · Notices (facts glass may need; no action asked)

- **N-1 · WebKit 2287 against 2311.** Playwright WebKit build 2311 crashes every atlas dashboard route on the dock's nested translucent `color-mix()`, 32 of 32 loads. Build **2287 renders the glass 10.0.1 and 10.1.0 plates alive**, 40 of 40 (`research/D3-S1.md:31, 313-315`; sci REGISTRY items 97 and 99).
  - BL's dock PF-3 floor patch was selected on 2311-only cells (`BL/design/dock/REGISTRY.md:229`).
  - The atlas release lane pins Playwright 1.60.0 → WebKit 2287.
  - Atlas's record shows this fact was owed to glass and not sent before BL dock pass 2. It is sent now.
- **N-2 · Withdrawn: cured at 10.1.0, or not glass's.**
  - The shortcut registry already returns on `defaultPrevented` (`useKeyboardShortcuts.ts:298`). That atlas row was measured on glass 7.
  - `Collapsible default-open` is cured (`Collapsible.vue:22-29`).
  - "Escape does not close the enlarged figure" (S2-1) was located in atlas's dismiss arbiter and cured there.
  - The sheet's unconditional close (`SheetContent.vue:316-344`, ruled on the record) stands. Atlas deletes its own duplicate `filter-close` instead of asking for a prop.
- **N-3 · Reply.** Please give each row a terminal disposition (CURE in a named version, ANSWER, or DECLINE with its reason) and the version that carries G-1 to G-4. The U parent ingests the reply into the U registry. Atlas's rc waits on G-1 to G-4 only.
