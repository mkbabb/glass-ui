# 10.1.2 critique b1 (fresh adversarial critic, round 1)

Model: claude-opus-5-5. Branch `release/10.1.2` at `00153793e`, 16 commits over `v10.1.1`,
all read. Source was not edited. Engine runs used two scratch trees (`git archive v10.1.1`,
`git archive release/10.1.2`), each with the branch's spec and harness plus my own probe
spec and harness. All runs went through `guarded`, and every WebKit run through
`guarded --exclusive webkit` on Playwright WebKit 2287. Chromium was `chromium-headless-new`,
one worker.

## Verdict

G-4 (b-ii) survives every attack I made. O-101 cures the sequence its gate names
(collapse, then breakpoint, then expand). It does not cure the ask behind that gate: the
expanded endpoint is still latched only while the dock is expanded. When the pane changes
while a morph is in flight, the stale reservation and the document overflow come back
(D-1).

## Gates

| Gate | Result |
|---|---|
| `npm run typecheck` (worktree) | exit 0 |
| `npm run build` (worktree) | exit 0. Worktree status unchanged |
| `npx vitest run --maxWorkers=2` (worktree) | 245 files passed. 2361 passed, 10 expected fail, 1 skipped |
| `npm run verify:package` (worktree) | `terminal: CLEAN`, version 10.1.2. Both root entries of `package-lock.json` read 10.1.2 |
| Branch `g-dock-seat-rule` + `crit-seat-cx` + `dockMorphMeasure` on the v10.1.1 tree | 14 failed, 11 passed. Seat files: 13 of 19 RED (matches the CHANGELOG). Morph: the O-101 unit arm RED |
| Branch `release-10-1-2.spec.ts` on the v10.1.1 tree, Chromium and WebKit, light | 16 of 20 RED per engine. The 4 green are the all-declared and composites regression arms at each width. All four O-101 cells are RED (592 reserved for 160, scrollWidth 491 at 390; 160 reserved for 592) |
| Branch `release-10-1-2.spec.ts` + `release-10-1-1.spec.ts` on the branch tree, Chromium and WebKit, light | all green (O-102(3), G-3, O-102(6) and the Skeleton arms included) |
| Branch `release-10-1-2.spec.ts` on the branch tree, Chromium and WebKit, dark (`colorScheme: dark`) | all green |

## Attacks that did not land

- **Lost tab stops, in paint.** Atlas scene, Tab from `before`. On 10.1.1 the walk goes `seat-0, after`
  in both engines, both widths and both schemes: filter, gear, handle, years and dark toggle
  are skipped. On the branch the walk is `seat-0, filter, gear, ...`, and the capture shows
  the focus ring on the gear at 390 and 1440, light and dark.
- **Every glass seat primitive declares itself.** I seated one run with all of them:
  `DockControl`, `DockTrigger` for popover, dropdown and select, `DockBackgroundToggle`,
  `DockControl as-child` around an `<a>`, and `DockSeparator`. Every child except the
  separator carries `data-glass-dock-seat`, which confirms MIGRATION's as-child claim. The
  run claims `toolbar` and has one Tab stop. ArrowRight walks seat-0 through seat-5 and does
  not wrap. Home and End land on the terminals. The live region names the seat. Checked in
  both engines at both widths. The branch's own witnesses cover only the popover arm of
  `DockTrigger`. I found no other glass component that is a dock seat: `SegmentedTabs` and
  `DockLayerGroup`'s tablist are composites.
- **No focusability inference is left.** `FOCUSABLE_SELECTOR` is still imported. It is read
  only by `announce()` to name an undeclared child, never to decide membership. The toolbar
  waivers match by fixed shape (`.dock-separator`, and reka's
  `select[aria-hidden="true"][tabindex="-1"]`).
- **Morph refactor.** The watcher was split into a pre-flush swap and a post-flush arm.
  Collapse and expand settle correctly in all runs. The O-102(3) focus-return and
  menu-close witnesses pass in both engines. The W7 flip capture still writes no endpoint.
- **Vertical docks.** I wrote a vertical probe (collapse, breakpoint, expand). On 10.1.1 it
  is RED (584 reserved for 152, and 152 reserved for 584). On the branch it is GREEN
  (152/152, 584/584).
- **No public type change.** `useDockMorphOrchestrator` and `useDockExpandedSize` are not
  reachable from any package export (only `./dock` exists, and it does not re-export them).
  So MIGRATION's "no type change" holds.

## Defects

### D-1 · medium · O-101: the expanded endpoint is still latched only while expanded, and goes stale when the pane changes mid-morph

- **Where.** `src/components/dock/composables/dockMorphMeasure.ts`. The line
  `if (expanded.value) expandedPx = rootSize` is unchanged. While the dock is collapsed, a
  content resize still leaves `expandedPx` at the old pane's span. The branch re-reads it
  only in `measure()`, when the morph arms. `capture()` returns early whenever the root has
  `[data-morphing]`, so neither the arm-time `measure()` nor the ResizeObserver can update
  the endpoint while a morph runs.
- **The ask this misses.** INBOUND O-101a says: "re-measure the expanded endpoint whenever
  the content box changes, collapsed or not; never latch only while expanded". The task
  repeats it: "is never latched only while expanded".
- **Witness: the latch survives collapsed (Chromium).** Expand and collapse at 1440, then
  resize to 390 and wait 400 ms. The collapsed dock still publishes
  `--dock-expanded-px: 592px` for a pane whose expanded box is 160.
- **Witness: reversal.** Expand at 1440 and collapse. 60 ms into the collapse morph, resize
  to 390 and call `expand()`.

  | Engine | Branch (light and dark) | 10.1.1 |
  |---|---|---|
  | Chromium | 62–63 of ~110 frames have `scrollWidth` 491 > `clientWidth` 390. Last morph frame reserves 592, then snaps to 160 at settle | 59 overflowing frames |
  | WebKit 2287 | 47 of 83 frames overflow (491 vs 390). 592 reserved for 160 | 46 overflowing frames |

  At 390→1440 the branch reserves 160 for 592 in both engines, a 432 px snap at settle.
- **Witness: pane changes during an expand morph.** Collapse at 1440. Call `expand()`, then
  60 ms in resize to 390.

  | Engine | Branch | 10.1.1 |
  |---|---|---|
  | Chromium | 57–62 overflowing frames at 491/390, 592 reserved, snap to 160 | same |
  | WebKit 2287 | 46 overflowing frames, 592 reserved, snap to 160 | same |

  At 390→1440: 160 reserved for 592 in both engines.
- **Status.** This is not a regression: 10.1.1 fails the same way. But it is the same
  defect O-101 asked to remove (a reserved box that outlives its pane, a document that
  scrolls sideways, then a snap), on a path the arm-time measure cannot reach. The branch's
  witnesses do not catch it, because each one changes the pane only while the dock is at
  rest.
- **Cure shape (glass's choice).** Re-base the expanded endpoint whenever the content box
  changes, in either posture and during a morph: for example `chrome + fullSize`, read from
  the full pane's own layout span, which `offsetWidth` reports untransformed. A pane change
  during a morph should then retarget the reserved box rather than leave it. Keep the W7
  flip guard. Add engine arms for the reversal and mid-expand sequences at 1440→390 and
  390→1440.

### D-2 · low · the O-101 engine witness is horizontal only

- `tests-visual/release-10-1-2.spec.ts` drives only a horizontal dock. The cure reaches
  `block-size` on a vertical dock: my probe is RED on 10.1.1 and GREEN on the branch. But no
  committed witness holds it, and `layers.css` has a separate `.vertical` reservation rule.
  Add a vertical cell.

### D-3 · low · one docstring still states the bare toolbar rule

The full rule is "every child is a declared seat, glass's `DockSeparator` and reka's form
`<select>` aside". `useDockRun.ts`, `UseDockRunReturn.toolbar`, drops the exemptions: "True
while every child of the run is a declared seat". `constants.ts`, `GlassDock.vue`,
`isToolbar`'s own docstring, the unit header and the CHANGELOG all state them. This is
cosmetic.

## Notes, not defects

- The toolbar claim waives two non-seat shapes (`DockSeparator` and reka's form select).
  The ruling's literal text says "every child". The waivers follow APG (a toolbar holds
  separators) and the hidden form control, and they read no focusability. I take them as a
  faithful reading.
- `src/components/dock/README.md` does not mention the marker. Its first example seats
  `DockControl`s inside a `div.contents[role=group]`, which leaves a run with no toolbar role
  and one stop per control. Roving is unchanged from 10.1.1. "No other change" keeps the
  README out of 10.1.2.
- Scratch artefacts only, not committed. Paint captures:
  `{chromium,webkit}-{old,new}-{390,1440}-{light,dark}-third-stop.png`. Probes:
  `tests-visual/critic.spec.ts`, `critic2.spec.ts` and `critic/harness.ts` in the scratch
  trees.
