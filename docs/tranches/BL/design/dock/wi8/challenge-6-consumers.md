# Challenge to RULINGS-6: consumer impact

Seat: an independent challenger, claude-fable-5-2, 2026-11-16. Read-only: no build, no browser, no source change. I wrote none of the rulings.

**Read.** `RULINGS-6.md` and `MEASURE-6.md` in full; `audit/dock-usage/USAGE.md` and `SURFACE.md` in full; `INBOUND.md` rows O-354 to O-388; `INPUT-hover-shift`, and the touch section of `INPUT-daraksha-2x`. Prototype source on `bl/dock/wi8` @ a68cd272c: `GlassDock.vue:451-463`, `styles/dock.css:114-127, :216-220`, `styles/run.css:455-467`, `styles/controls/tab-button.css:157-162`, `styles/controls/icon-button.css:247-252`, `tokens/sizing.css:205-282`, `tokens/glass.css:149-168`. Consumer trees by `git grep` on committed code: value.js, keyframes.js, fourier-analysis and daraksha at `origin/master`; atlas at `.u-build/atlas-rc` 88bde3b; gregg (working tree, on glass 11.1.0), speedtest, gaggle-site, slides, Home Assistant `apx-ui-r11`, hassio-config-design-lab, reddit. Not read: `COMPOSITIONS.md`, the strips, any running page.

Each objection was made, then re-read against the ruling. Those that did not survive are listed at the end.

## What holds

The removals of `useDockSearch` and `#search`, the `./dock` re-export of `useDockCtaReceive`, `useDockContext` / `provideDockContext` / `DOCK_CONTEXT_KEY` as exports, `DockSeparator`'s `anchor`, and `DockLayerGroup`'s `orientation`, `switcherPosition` and `motion`: no committed source or test in any of the eleven apps names them. `useDockSearch` also throws at mount on the shipped line (O-354, LT-1). `Popover keepDockOpen` as a no-op costs fourier nothing. The `role="group"` frame matches gregg's own rule line for line (`gregg/src/style.css:120-125`) and also reaches fourier's `display: contents` groups (`AppDock.vue:325, :332`), which helps its standing row overflow.

## Major

### C-1. RU-63: `graspHeld` is not unused. keyframes reads it.

Ruling: the exposed `graspHeld` is removed in 11.2.0, "used by none of the eleven apps".
Evidence: keyframes.js `origin/master`, `test/demo/app/dock-context-slot-resolution.test.ts:120` and `:125`: `expect(dock.vm.graspHeld).toBe(true)` and `.toBe(false)`. The same file imports `type DockContext` from `@mkbabb/glass-ui/dock` (line 30), which SURFACE.md lists among 17 types "all unused". SURFACE.md read source directories only; no app's tests were read.
What breaks: keyframes's unit suite goes red at the bump, in a test it calls its mechanism proof. The update is two lines, not one, for a saving of one name and one line.
Remedy: keep `graspHeld` through 11.2.0 and delete it in 12.0.0 with the types. The names budget still nets 6 down. Before the removals commit, grep each app's tests for every name in the table, since the audit did not.

### C-2. RU-63: `DockBackgroundToggle` is counted as 75 lines; its real cost is the demo on master, four test files and the pause control the Blob README points to.

Ruling: removed in 11.2.0, 5 names, 75 lines, "speedtest dropped the last use".
Evidence, glass master: `demo/stories/dock/overview.vue:628`, `demo/stories/substrates/blob.vue:761`, `demo/stories/substrates/fourier-field.vue:380` mount it. `tests-visual/release-11-0-2/hover-harness.ts:24, :49` mounts it in a shipped-line spec that G-14 counts. `tests-visual/blob-pause-seam.spec.ts` clicks it as the WCAG 2.2.2 pause control. `tests/components/custom/dock/DockBackgroundToggle.a11y.test.ts` and `tests/components/a11y/native-title.test.ts:24-30` test it. On the worktree, `src/components/blob/README.md` and `aurora/composables/frameLoop.ts` name it as the pause seam. `bl/demo`'s demo no longer uses it.
What breaks: no app. The demo on master does until `bl/demo` lands, so the removal has an order. G-14 says "no failure that master's snapshot does not also have", and a deleted import in the 11.0.2 hover harness is one. The library is left with no shipped pause control for a moving background, and the ruling does not say what stands in its place.
Remedy: either deprecate it in 11.2.0 and delete in 12.0.0, or keep the removal and add to RU-63: the four test files restated with their reasons, the order against `bl/demo`, and one line in the Blob and Aurora READMEs saying what a site wires to `pause()` now.

### C-3. RU-61: the inferred anchor changes docks the ruling does not name, and an explicit `anchor="end"` contradicts the persistent-seat rule on the ruling's own first site.

Ruling: an in-flow dock overlays its row; "A dock that is `position: fixed` or absolute is untouched"; where the consumer set no anchor, `#persistent` anchors at the start and only `#persistent-end` at the end.
Evidence:
- Sites put `position: fixed` on a wrapper and leave the dock's root in the flow of a centred flex row. keyframes `TransportDock.vue:6-9` (`fixed left-0 right-0 ... flex justify-center` on the wrapper); daraksha `SiteDock.vue:289-294`. Read on the root, both are "in the flow", so both take the margin and the inferred anchor.
- daraksha's site dock has `#persistent-end` on the Motion page only (`SiteDock.vue:232`). Its inferred anchor is centre on four pages and end on one, on the same dock, and its fission places the theme dock from the open width (`SiteDock.vue:476-555`).
- atlas `PlateDock.vue:150` sets `anchor="end"` and fills `#persistent` (`:156`, the Table view seat). With the end edge held, that seat slides the full growth toward the start. That is the fault RU-61 exists to cure, and atlas reported it ("on right-anchored docks the seats slide left under a resting pointer", INPUT-hover-shift). The gate reads a persistent seat only on keyframes's transport.
- The prop's default is `"center"` (LEDGER.md:134). "Where the consumer set none" needs that default to become unset; the ruling does not say so.
- Also affected with no anchor set: fourier `EditorControlsDock` and `AnimationControls` (`#persistent`), `CanvasControlsDock` (`#persistent-end`), Home Assistant, the atlas phone bar.
What breaks: an open transport or controls dock stops being centred and hangs to one side; on a phone a start-anchored dock centred at rest can pass the viewport's edge. Atlas's persistent seat still moves.
Remedy: RU-61 names every dock whose rest or open position changes under the inference and what each sees. It says which wins when an explicit anchor and a persistent seat disagree. It reads "in the flow" from the containing block, not the root's own `position`, or states the wrapper case. It adds atlas's `PlateDock` persistent seat and daraksha's Motion page to its cells. The opt-out is written down: `anchor="center"` restores today's growth, one line per dock.

### C-4. RU-60: the switch it deletes is daraksha's, not the dock's, and daraksha's reason for it is room, not touch.

Ruling: "the dock's switch that silences Tooltip on touch is deleted. No new prop"; the ADDS table says the name on press and hold replaces daraksha's `dockTip.ts`.
Evidence: no file under `src/components/dock` or `src/components/tooltip` on `bl/dock/wi8` turns Tooltip off on touch (`git grep -i tooltip` over the dock's code finds comments only; the tooltip folder has no touch or pointer-type branch). daraksha `origin/master` `src/shell/dockTip.ts`: "A tooltip that covers another control is a defect, so a label opens only where it has free room ... On a phone the pages' pill sits directly above the controls", returning `hover && !stacked`. Five daraksha files pass it to Tooltip's `disabled`.
What follows: there may be nothing in glass to delete, so the build is new touch behaviour in Tooltip, which RU-60 sizes as a deletion. And `dockTip.ts` is not retired by it: on daraksha's stacked phone layout a name above the seat lands on the pages pill, the case the file exists to prevent.
Remedy: the build seat first reads why a touch shows no name (reka's Tooltip, or a site switch). RU-60 states where the name sits when the seat has another control directly above it. The ADDS row for daraksha is corrected to what is true: `dockTip.ts` stays until that placement is ruled.

### C-5. RU-55 and RU-63: "LF-3 rides RU-45" is not true as built. A tab seat sizes only a direct `svg`.

Ruling: a glyph beside a word is 1.5 em; triage: "LF-3 rides RU-45"; daraksha-2x row 2 (glyph size for tab-shaped controls) "built".
Evidence: `tab-button.css:157-162` is `.dock-tab-button > svg`. The icon seat's rule (`icon-button.css:249`) covers `svg, img, picture, [data-dock-glyph]`. Home Assistant's worded tab is `shape: "tab"` with an `ha-icon` element for its glyph (`frontend/src/tiles/dock_parts.ts:93, :271`). LF-3 is hassio's ask: "the dock sizes only an icon seat's glyph" (O-377a).
What breaks: nothing new, but the ask is recorded as met and is not. Home Assistant's tab glyphs and any site picture in a tab seat stay unsized, on the dock where the owner saw icons too small (O-377).
Remedy: RU-55's invariant names the same four glyph forms for a seat with a word, and G-13's census reads a tab seat that holds a picture. RU-55 also lists the sites whose unsized tab glyphs drop from 24 to 21 px (speedtest's primary seats, gaggle's and gregg's tabs, keyframes's Apply CSS), since the owner's order was larger icons and question 17 is still open.

### C-6. RU-57: any plate level under 1 flattens the veil steps three sites set, and no gate cell reads a site's override.

Ruling: the ladder runs 1, 0.85, 0.7, 0.55, 0.4 and G-15 picks the first GREEN on glass's ten compositions.
Evidence: the level is set on `.glass-dock` (`dock.css:218-220`) and scales the plate's ink against solid `--card` (`glass.css:164-167`), whatever tier the site chose. gregg `Figure.vue:1366-1368` gives a pair dock `--dock-plate-expanded-tier: var(--glass-veil-wash)` and no shadow, so that docks holding a real choice read heavier than the pair. speedtest sets `--glass-veil` on `.dock-plate` (`design/register.css:235`). slides sets both tiers (`decks/parkway-lab/theme.css`). At level 0.4 every one of these is 60 % solid card and the distance between two tiers shrinks to four tenths.
What breaks: gregg's quiet pair docks on its figures read as full plates; speedtest's and slides's tuned plates firm up with no change on their side.
Remedy: RU-57 says level 1 is preferred for this reason too, not only for "a bit". If a lower rung is taken, the strips include a wash-tier dock beside a default one, and gregg, speedtest and slides are told the number before the tag.

## Minor

### C-7. RU-56: three apps use `DockControl` outside any dock, and the lines it touches are at `:root`.

`sizing.css:220-221` defines the hover and active fills at `:root`. SURFACE.md:43 and USAGE.md:68-70: value.js's four workbenches, daraksha's popovers and atlas use `DockControl` as a plain glass button with no `GlassDock` around it. The ruling says "inside a dock" but lists the `:root` lines and gates only docks. Say where the new fills are scoped, and add one loose `DockControl` cell to the gate. value.js, gregg and speedtest also rebind `--dock-fg-on-aurora` on `.glass-dock` (USAGE.md:39-41, :302, :339); the fills now follow that ink, which the three should be told.

### C-8. RU-63, the trigger's seat height: say that a site's own trigger tokens still win.

Six apps mount `DockTrigger`. atlas and speedtest set `--dock-trigger-padding-*` (SURFACE.md:182) and fourier sets `--dock-trigger-min-height`. The add changes every trigger's default box in a run. One sentence is missing: the three tokens outrank the new default, and fourier's line becomes deletable.

### C-9. Three 11.2.0 bookings in INBOUND move out, and no consumer is named to be told.

- The scroll fold to 11.3.0. O-378: atlas "will be a first user of the scroll fold"; fourier folds on scroll in app code (USAGE.md:117-118).
- One base size to 12.0.0. O-377 calls LF-1 "the one that matters most" and O-377a books it "W-I.8 / 11.2.0 ... dock first"; speedtest's unthreaded `--dock-scale` is the same ask.
- gregg's yielding persistent-end (O-383, row 4), not built.
Each is ruled openly and with a reason; none is dropped. RU-58 names a message to atlas for the glyph default. These three need the same line, to atlas, fourier, hassio, speedtest and gregg.

### C-10. Two W-I.8 bookings the triage does not name.

- O-364 (3): gregg's question whether a dock mounted open and pressed open should hold against an outside press. INBOUND booked it as a W-I.8 input. RU-1 (pass 2) answers it in effect (a press outside is a dismissal), and gregg keeps `dockFold.ts`'s pin. Say so in the gregg line.
- O-367a: "The selected seat's rim: W-I.8." RU-56 answers "no ring, no shadow" without citing the row. Cite it, so the specular ruling's hand-off is closed on the record.

## Dropped on the second reading

- *The `role="group"` frame breaks atlas's dial groups.* Its groups carry no role (`PlateControls.vue:128`) and `PeriodControl`'s group is not a direct child of the run.
- *Removing the tier properties breaks gregg and slides.* The prototype still reads both (`dock.css:123-127`); they wait for 12.0.0 as ruled. The level is the live risk, which is C-6.
- *`keepDockOpen` as a no-op breaks fourier.* G-8 is GREEN with the holds built; the prop does nothing harmful.
- *RU-52's visible overflow shows content sites relied on the run to clip.* I found no site reading to support it.
- *The dock entry's size (O-384).* G-16 at v11.0.2's size meets the blocked site's budget, since that site ships on 11.0.2 today.
