# P-A2 — route A on F5, both CK-02 commit arms (D5 pass 2)

Seat: P-A2 prototype. Model: claude-opus-5-5. Built on HEAD plus `pass-2/F5.patch` (sha1 prefix `c557d6d50fe6`; F5 was still running and had written no F5.md when this seat snapshotted it, and the file is unchanged at close). Two builds of the same members: the light commit (arm iii, Q-5 (a)) and the geometric commit (arm ii). Every number below comes from a command this seat ran. Logs are in `pass-2/A2/logs/`, battery JSON in `pass-2/A2/json/`, and frames in `pass-2/A2/glance/`. Load is the 1/5/15-minute average.

## 1. Patches

| patch | files | +/− vs HEAD | `git apply --check` |
|---|---|---|---|
| `pass-2/P-A2-light.patch` (sha1 `45d0b34d0412`) | 157 | +1825 / −1231 | OK at 5e9f70dd1 and at b06cacc35 |
| `pass-2/P-A2-geom.patch` (sha1 `cb5181c6e2c5`) | 158 | +1815 / −1232 | OK at b06cacc35 |

Each patch contains F5 as well as A2, so either one applies on its own at HEAD. The two arms differ in 7 files (+88/−99): `utilities/engage.css`, the three control-bit shells (the light build's `[data-engage-light]` span), `control-bit.css` (header comment), `scale-paper.css` (`--scale-commit-pop` 1.02 and `--scale-commit-pop-bit` 1.05) and the comment in `springPresets.ts`.

## 2. Cost (CK-23)

`git diff --shortstat` between trees built with `git apply --cached` on a scratch index:

| delta | files | + | − |
|---|---|---|---|
| F5 alone, vs HEAD | 43 | 1175 | 602 |
| A2 light, over HEAD+F5 | 125 | 652 | 631 |
| ↳ src | 105 | 574 | 502 |
| ↳ tests | 10 | 56 | 111 |
| ↳ demo | 8 | 12 | 17 |
| A2 geom, over HEAD+F5 | 126 | 642 | 632 |

Over F5 the change is roughly net zero in lines: two recipes are deleted (`.tap-squish` and `.interactive-item`), along with `animatePress`, the chip's flood, `pillHoverClass` and the `--scale-press` reconciliation. In their place come one stamp per member and one seat block.

## 3. What was built

- **Adoption (CK-01).**
  - Checkbox, Radio and Switch are `engage-chosen`; their face is marked `[data-engage-face]`.
  - Chip uses the mode map: selectable → chosen, action → pressed, removable and static → static. The action chip goes through the door (`useEngage(…, {commit:"call"})`).
  - SegmentedTabs, ToggleGroupItem and the dark-mode toggle are `engage-chosen`.
  - Button is `engage-pressed`. Its gleam's opacity is re-keyed to the `control-engage` envelope.
  - Every other declared directory stamps its class: static, dragged, disclosed, field, ambient, held or presented. Card, dialog, toast, popover and configurator parts are stamped too.
  - `modes` gains `surface`, `configurator` and `popover` (disclosed trigger, presented panel). HandMark is re-declared `ambient`, because it re-inks on pointerenter and pointerdown.
- **CK-03, the tabs mount glide.** The indicator mounts with `display: none` until it is first placed. An element without a before-change style does not transition, so the first placement lands with no glide (probe `A2/probe/mount.mjs`: placed at x 135.7 px on its first painted frame). A programmatic commit goes through `squishOnTravel` like a hand commit. The 220 ms WAAPI squish (`animatePress`) is deleted.
- **Light commit (arm iii).** The seat's light is a gate × charge product, on the face's `::after` or on the face's last child `[data-engage-light]` (over the mark). It is keyed on `[data-state=checked|on|open]` or the door's `[data-commit="b"]`. The two states swap which leg runs on the attack and which on the release. As a result the light rises and drains on every edge, from transitions alone; it shows nothing at mount or at rest, and it stays under PRM (it is light). The amplitude is `--fill-selected`, and the light is `--neutral-0` in light mode and `--foreground` in dark.
- **Geometric commit (arm ii).** `--rung-commit` (a registered number) runs on the `--spring-panel` row. The pop is `scale: 1 + (crest − 1)·sin(π·c)`, written inside each `@utility` so the utilities layer outranks the components-layer transition lists. The crest is 1.02 on surfaces and 1.05 on the 20 px control bit.
- **The held arm, in place, on fine pointers.** `engage-held` grows to `--scale-engage` (1.06) on the `dock` row while `[data-engaged]`, under `(hover: hover) and (pointer: fine)`, with `scale: none` under PRM. A coarse pointer does not grow in place (Q-3 (c)). The door now calls `loud("--scale-engage")` when an engaged held host cannot read the token (E-11).
- **Recipes for presented and ambient.** Both are stamps only. The presented plate's paint belongs to the veil, and the ambient field's to its own field.

## 4. Retirement of `.tap-squish` and `.interactive-item` (with MIGRATION rows)

Both recipes are deleted from `utilities/base.css`, and `.interactive-item:focus-visible` is removed from the a11y overrides.

- `.glass-menu-row` now owns the radius, user-select and the disabled rule, and its scale legs are gone. Menu items, the sub-trigger and `rowClass.ts` compose `glass-menu-row focus-ring`.
- SelectTrigger and ConfiguratorLayer's trigger use `engage-disclosed`.
- EasingPicker's handles carry their own scale transition.
- Demo consumers are rewritten with Tailwind hover and select utilities.
- Twelve comment references are corrected.

MIGRATION, siblings read-only. Counts come from grep over each main tree, excluding node_modules, dist, docs and worktrees.

| sibling | recipe | sites | replacement |
|---|---|---|---|
| chicago | `tap-squish` | `src/TempApp.vue` ×3 (on DockControl) | drop it; the dock's press is D2's (CK-11) |
| speedtest | `tap-squish` | 5 files ×1 (SurveyResultDock, AdminDashboardLayout, AdminDataSourceToggle, PhaseTimeline, AddressAutocomplete) | the member's engage class, or a light `active:` utility |
| keyframes.js | `tap-squish` | `demo/…/EasingField.vue` ×1 | drop it (the easing root is `engage-chosen`) |
| keyframes.js | `interactive-item` | `demo/app/dock/menu/MbabbMenu.vue` ×1 (comment) | `glass-menu-row focus-ring` |
| fourier-analysis | `interactive-item` | `web/e2e/f-w14v-c3.spec.ts` ×1 | `menu__item glass-menu-row` |
| value.js | both | `bench/paired/sheets/*.css` ×2 each, `demo/DESIGN.md` ×1 | a doc and bench sheet refresh, done in value.js's own session (live, untouched here) |

## 5. CK-11 — D2 coordination (the capsule's dock-tab press)

No member of an engagement class composes `.glass-capsule-hover` any more; Button, Chip, Select and SegmentedTabs all dropped it. It remains on three sites:

- the dock icon button, `DockControl.vue:92`, which is D2's;
- the configurator's preset chip;
- the demo preset tiles.

Its scale lift and its snap stay in place for D2 to retire, together with the dock-tab press that chicago's `tap-squish` used to double. When D2 lands its dock press, the class can be deleted outright. The dock is the one member the latch still reads as unproven (§6, CK-01), and it is D2's fence.

## 6. Readings per CK row and engine

Chromium and Playwright WebKit are measured; WebKit was restarted every 60 navigations. **Real Safari: UNMEASURED (owner's safaridriver checkbox).**

### CK-01 — adoption and latch (E-1)

| reading | Chromium | WebKit |
|---|---|---|
| full battery (pre-stamp) | 79/87 · load 23.6/37.0/51.2 | 79/87 · load 11.0/17.4/34.8 |
| r2 (stamps and loud check rebuilt) | 81/86 · load 27.4/18.3/21.8 | 81/86 · load 25.9/20.0/22.2 |
| **r3 (gallery widened: blob config, data-table, deck, popover, toast, configurator)** | **89/94** · load 21.9/21.6/22.4 | **89/94** · load 23.7/22.1/22.6 |

**Latch: 54 of 55.** Only `dock` is unproven, and it is D2's.

The other r3 fails:

- **`static-inert label`.** Reka's `Label` attaches a mousedown handler (it suppresses double-click selection). The census counts any handler, so this is a false positive in the census. The fix belongs to H2's rule, not to the member.
- **`runtime presented (sheet) PRM press-light`.** "No target while pressed": under PRM, pressing the sheet removes the probe's target. The sheet is not one of this seat's members; the same cell passes without PRM.
- **`runtime ambient (aurora)`, and its PRM row.** Headless Aurora has no WebGPU paint. Chromium reads 0.00 levels; WebKit reads 1.14 against a drift of 1.13. This is the engine's limit, inherited.

`E-1 single` passes in both engines. So do the denominator check (55/55) and the runtime cells for pressed, chosen, held, dragged, disclosed and field, with and without PRM.

### CK-02 — the commit on all eight members (E-2, 108 cells per engine)

| arm build | Chromium | WebKit |
|---|---|---|
| **geom**, `--commit-arms i,ii,iii` | **108/108** · load 33.9/27.9/25.0 | **108/108** · load 24.9/28.2/26.3 |
| **light**, default arms i,iii | 92/108 · load 18.4/34.3/49.6 | 91/108 · load 9.7/13.3/29.4 |

The geom build commits by arm ii on every non-tabs member, in both engines and both themes. The tabs commit by arm i (the indicator's travel). In Chromium, one accordion cell admits ii+iii.

Light build, per member (Chromium / WebKit):

| member | light theme | dark theme |
|---|---|---|
| button, checkbox, chip, chipaction, toggle | iii, 4/4 · 4/4 | iii, 4/4 · 4/4 |
| tabs | i, 4/4 · 4/4 | i, 4/4 · 4/4 |
| switch | 0/4 · 0/4 (rise 0.0003–0.0064) | 3/4 · 4/4 |
| radio | 0/4 · 0/4 (rise 0.0024–0.0027) | 0/4 · 0/4 (rise 0.0000) |
| accordion | 1/4 · 1/4 (rise 0.0003–0.0034) | 4/4 · 2/4 (0.0099–0.0100 against a 0.01 bound) |

**Q-5 evidence.** On a near-white light-theme face, arm iii cannot clear its 0.01 bound at this amplitude.

- The switch track rests at 0.92, and the radio and the accordion row at 0.957. A white light at `--fill-selected` over these faces has a ceiling of about 0.005. Clearing 0.01 would need roughly 25 % white over the face, which is a new and louder token. O-87 asks for flatter, so this seat did not mint one.
- On the radio in dark, the rest-to-peak swing comes from the dot's own fill on a 200 ms `duration-fast` leg, which runs on no envelope clock. The seat's rise is therefore read as 0.0000.

The light arm passes on every surface member and fails on the three near-white faces. The geom arm passes all eight, in both engines.

### CK-03 — tabs mount glide

Cured: no glide on mount (probe above), and `animatePress` is deleted. The E-5 tabs rows pass: 56/56 in Chromium (load 15.3/24.2/41.9) and 56/56 in WebKit (load 11.7/12.2/23.4).

### CK-11 — D2 coordination

As stated in §5. On this route, `engage-*` members compose no `glass-capsule-hover`. The ToggleGroup, Button, Chip and Select unit tests assert it.

### CK-13 — FL-3 arms

Probe `A2/probe/fl3.mjs`, log `logs/fl3-chromium.log`, Chromium emulation, load 14.3/16.7/19.9.

- **Forced colours.** The commit seat computes `display: none` on all eight members, at rest and 60 ms into a commit. The system palette owns the fill.
- **Reduced transparency.** The seat stays (`display: block`) and its opacity rises to 0.98–0.997 at 60 ms. It is an opaque-ink event, not a translucent material.
- The tabs have no seat; their commit is the indicator's travel.
- Playwright WebKit cannot emulate either medium: UNMEASURED (engine limit). Real Safari: UNMEASURED.
- **Geom arm.** The pop is geometry. Under PRM it is retired by E-9's spatial rows (Chromium 60/60, WebKit 60/60 on the light build). The geom build's own E-9 was not run: only E-2 was run on geom.

### CK-19 — runtime probe per class (E-1 runtime)

Pressed, chosen, held, dragged, disclosed and field pass in both engines, with and without PRM. Presented passes without PRM; its PRM row fails as described under CK-01. Ambient fails headless (engine limit).

### Other rows (light build)

| row | Chromium | WebKit |
|---|---|---|
| E-3 | 20/22 · load 14.1/27.0/44.6 | 20/22 · load 11.7/12.8/26.8 |
| E-4 | 12 pass, 2 fail, 4 unmeasured · load 13.9/26.2/43.9 | 9 pass, 2 fail, 8 unmeasured · load 12.2/12.4/24.3 |
| E-6 | 4 pass, 2 fail, 8 unmeasured | 2 pass, 2 fail, 8 unmeasured |
| E-7 | 5/7 | 5/7 |
| E-8 | 19/19 | 19/19 |
| E-9 | 60/60 | 60/60 |
| E-10 | 3/3 | battery 2/3 at load 18.8/14.1/21.3, then 3/3 and 3/3 on two re-runs (load 18.8/17.7/20.0 and 22.2/18.7/20.3) |
| E-11 (r2) | 2 pass, 2 unmeasured · load 30.3/20.2/22.4 | 2 pass, 2 unmeasured · load 29.7/21.5/22.7 |

- **E-3.** The phone touch-held reads ×1.000 against a ×1.03 bound. This is Q-3 (c): the coarse promotion is not this class's, and it carries to E.
- **E-4.** `tabsdrag release PRM` is NOT DRIVEN (0.0 px). Sortable release continuity reads 75.5 px in Chromium and 81.1 px in WebKit against a 62.0 px bound. Both rows are F5's or the owner's. The sheet cells are UNMEASURED: the surface is in flow (REGISTRY §P1-7).
- **E-6.** RED by construction (Q-2).
- **E-7.** Two files write each of the `data-held` and `data-press` attributes: `GlassDock.vue` (D2) and `PagerDots.vue`, besides the door.
- **E-10.** The WebKit hand-off drop failed once, at 0.0107 against a 0.0102 bound, then passed both re-runs: NOT-REPRODUCED.
- **E-11.** Before the door's loud check it read SILENT DEGRADATION (1 pass, 1 fail). With the check it passes.

### CK-25 — the owner-glance set (`pass-2/A2/glance/`)

- **Light build, class exemplars.** Rest, pressed, held, engaged, committed and released; light and dark; fine and coarse; Chromium and Playwright WebKit. Files: `light-{chromium,webkit}-{fine,coarse}.png`, 18 rows each, plus `light-index.json`. Load 13.2–18.4.
- **Q-5 pair, the same nine commit scenes in both arms, fine pointer, both engines.**
  - Files: `light-q5-{chromium,webkit}-fine.png` and `geom-{chromium,webkit}-fine.png`, plus their index JSON.
  - In the committed column, the geom sheets read ×1.050 (switch), ×1.049 (checkbox), ×1.050 (radio), ×1.020 (chip), ×1.019 (chipaction), ×1.021 (button), ×1.019 (accordion) and ×1.015 (toggle).
  - The light sheets read ×1.000 on all of those except the button's ×1.001 (the door's press residue). The light wash is barely visible on the near-white light-theme faces, which matches the E-2 readings.
- **Frames.** 432 class-exemplar frames and the Q-5 frames are in `glance/frames/` (10 MB in total).
- Real Safari: UNMEASURED (owner's safaridriver checkbox).

### Unit gates (logs `gates-light-final.log`, `gates-geom.log`)

| gate | light | geom |
|---|---|---|
| `npm run build` | exit 0 · load 20.4 | exit 0 · load 28.9 |
| `demo:dist:build` | exit 0 | exit 0 |
| `typecheck` (both vue-tsc projects) | exit 0 | exit 0 |
| `vitest --maxWorkers=2` | **240/240 files**, 2327 passed, 10 expected fail, 1 skipped · load 21.1 | 239/240, then boot-graph 14/14 once dist-demo was built |

On the geom first pass the only failures were boot-graph's three "dist-demo absent" cells.

## 7. Open gaps

1. **Q-5 is the owner's.** The light arm fails 16 of 108 cells in Chromium and 17 in WebKit, all on near-white light-theme faces (switch, radio, accordion) and on the radio in dark. The geom arm passes 108/108 in both engines. Making arm iii clear its bound would need a louder light token, against O-87.
2. **CK-01 latch 54/55.** The dock is D2's. `static-inert label` is a census false positive (reka's mousedown handler), for H2.
3. **Sheet PRM press-light.** The target vanishes on press under reduce. This is the sheet's (F5's or the owner's); it is not an A2 member.
4. **Ambient (Aurora) is unreadable headless.** Engine limit.
5. **E-3 phone touch-held** goes to tranche E (Q-3 (c)).
6. **E-4.** `tabsdrag release PRM` NOT DRIVEN and sortable release continuity (75.5 / 81.1 px against 62.0) are F5's or the owner's. The sheet cells are UNMEASURED (in flow, §P1-7).
7. **E-7.** The `data-held` writer in GlassDock is D2's. The `data-press` writer in PagerDots should move behind the door; this seat left it.
8. **`.glass-capsule-hover`** remains on DockControl (D2), the configurator preset chip and the demo preset tiles. It is to be retired with D2's dock press.
9. **Not run on the geom build:** E-1 and E-3 to E-11. Its stamps and door are identical to the light build's (seven differing files, §1).
10. **FL-3 in WebKit** is UNMEASURED (engine limit).
11. **Real Safari** is UNMEASURED in every row (owner's safaridriver checkbox).
12. **Sibling MIGRATION rows** (§4) wait on their own sessions. value.js has a live session and was not touched.
