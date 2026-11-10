# W-R.1: restraint, as glass-ui 12.0.0

Sources: the owner's restraint precept (`docs/precepts/restraint.md`, precepts cb5b0fa, with glass's amendments in c2f64ed; INBOUND O-203), and the cross-app restraint audit of 2026-11-09 (INBOUND O-208; evidence in `~/.dev-logs/feedback-canon/PLAN.md` and its `*-verify` folders).

It is a major because it deletes public exports. It runs on its own branch, cut from master after 11.1.0 merges. Its cures remove or plainen. None swaps one ornament for another, and identity stays (glass, the palette, typefaces, the aurora and the blob).

## Scope

**Deletions (O-203).**
- The specular gleam: `v-specular`, `createSpecularWriter`, `useSpecularPointer`, the `--glass-specular-*` rungs and the `.glass-material::before` gleam.
- The press indent: `--scale-press*`, `tap-squish`, and the squish legs of `useSpringPress`, `useLiquidPress` and `useLiquidFlex` on controls.
- Enter overshoot on controls, text and reader surfaces (`transitions.css`, onto the eased register).
- `affordance-map.md`'s G and P columns, removed in the same commit.

**Budgets (restraint checks).**
- One shadow layer per surface, at most 3 elevations.
- One `backdrop-filter` value library-wide, and no blur inside a blur. value measured fourier `/equation` under software compositing: frame p50 is 58 ms as shipped and 8 ms with `backdrop-filter: none`, with 28 blur layers, 25 of them nested.
- No `text-shadow`, no coloured or glow shadows.
- At most 3 radius tokens per view.
- No gradient outside the data and identity list. That names the Configurator stage's and aside's `radial-gradient`s, and ToggleGroup's chip `linear-gradient` tint.

**The audit's component findings (O-208).**
- **G2, Tooltip:** collision padding, so the box keeps a gutter from the viewport edge (value's tooltip spans x 1019–1440 at 1440).
- **G4, ToggleGroup:** selected state is not carried by bold (weight stays the item's own; C-9). Off-state text reaches 4.5:1 once the stacked chip tint is deleted (C-45).
- **G5, DockControl:** hover and active fills read as distinct states (C-39). `shape="tab"` seats share their row's height (38 px against 44 px today; C-46).
- **G6, material:**
  - Listbox and menu surfaces read as surfaces, not smudges at alpha .18–.22 (C-59).
  - The popover panel is warm on cream, not taupe-grey (C-5).
  - The CommandDialog scrim does not grey a cream page (C-5).
- **G7, DropdownMenuItem:** a real gap between glyph and label, and a visible `aria-current="page"` state.
- **G8, Command:** opening scrolls the selected item into view (daraksha's surah finder opens at row 1 with 93 selected).
- **G9, the easing selector:**
  - One tab register, not a third style (C-42).
  - Bezier mode draws no step staircase (C-100).
  - Presets show curve previews (C-78).
- **K1 and K2 (keyframes; extending G9), EasingPicker:**
  - A prop hides its own preset list, for a host whose gallery is the selector.
  - Seeded `initial.points` that match a catalogue curve show that curve's name, not "Custom".
  - Each mode draws only its own curve.
- **K9 (keyframes; C-9), weight:** `.text-subheading`, the ConfiguratorLayer trigger label, the catalogue's family headings and SubPaneHeader set weight 400. Size carries the step.
- **G15 (fourier; C-9), Metric:** `.metric__label` is set in sentence case at body weight, with no uppercase and no wide tracking, and `.metric__value` takes regular weight. Size carries the hierarchy (fourier `/morph` reads "PHASE idle / N 50 …" in caps and bold today).
- **G11, per-component CSS entry points:** a consumer importing 9 components ships only their rules, not 2,618 rules and 17 backdrop-filter values. Each component subpath gets its own stylesheet entry.
- **G12, field skins:** one field skin library-wide. NumberField's filled skin and Select's transparent skin become one (C-5, C-18).

## Gates

Every item is RED on 11.1.0 and GREEN on the branch, in Chromium and WebKit at 390 and 1440, light and dark. Each budget is a static check over the built CSS plus a paint check per component in the demo, and each check is shown to bite by a planted violation. The CHANGELOG's 12.0.0 entry lists every deleted export and the plain migration, in consumer prose.
