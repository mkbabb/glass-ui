# AZ.R4-SHELL — the gear-as-PresetEditor, glassy editor rows, panel-padding rung · DELTA

<!-- surface-paths: demo/configurator/PresetEditor.vue, demo/configurator/useConfiguratorOpen.ts, demo/layout/SidebarDock.vue, src/styles/tokens/offsets-sizing.css, src/styles/floating-panel.css, src/components/ui/dropdown-menu/DropdownMenuContent.vue, src/components/ui/dropdown-menu/DropdownMenuSubContent.vue -->
<!-- surface-hash: c331b378fc9284bb28a56067d2e401281fccde00e40b096e219b60e04da5a728 -->
<!-- AZ.W-GATES (D6) content-hash freshness model: fresh IFF the seven surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes,
     surfaceHash convention). Stamped at the own-surface capture against the live
     demo shell on :5199 (the user's truth surface) with the R4-SHELL edits in place. -->

This corrective refines R3-4 atop the Batch-3 W-SHELL-CONFIG landed state. Batch 3
had already rehomed the configurator open onto the SidebarDock gear, killed the
floating FAB, and led the editor with the dark-mode toggle — so R4-3 items (1)+(2)
were largely standing. R4-SHELL closes the remaining gaps the R4/R5 audits named:
the editor rows that were NOT yet glassy registers (R4-4), the panel-padding rung
the slides consumer flagged tight (R5-4), and the missing `aria-expanded` a11y
contract on the gear trigger.

## R4-3 — the gear IS the PresetEditor view (re-confirmed; dark-at-TOP)

The SidebarDock gear (`.demo-sidebar-gear` DockIconButton) dispatches the shipped
`glass-ui-demo:toggle-configurator` window event; `PresetEditor.vue` opens its
right-side `<Sheet>` as the gear's content — ONE surface, never a route to a story.
The "Appearance" section LEADS with the Dark-mode row (the readback `firstLabel:
"Dark mode"`), superseding the bottom-of-rail dark-toggle placement inside this view.
The floating FAB stays dead. (Captures: `R4-SHELL-preset-editor-{light,dark}.png`.)

## R4-4 — every editor row is a house glass register (the binding fix)

Two rows still painted off-register and are converted onto the shipped SegmentedTabs:

- **Preset** — was a `<RadioGroup>` of hand-rolled `<label>` cards (bare radios). Now a
  `<SegmentedTabs variant="segmented">` over the `{Glass-UI default, Neutral, Custom}`
  enum (the spring-slider pill register), with the active preset's prose on a single
  description line below (the rationale survives the conversion).
- **Density** — was a bare `<button>` triplet with hand-rolled active styling. Now a
  `<SegmentedTabs variant="segmented">` over `{Cozy, Comfortable, Compact}`.

The readback proves the conversion: `radioGroups: 0` (zero bare radiogroups remain in
the dialog), and two `.segmented-tabs[role="group"]` strips render. Every other row was
already on-register (glass `<Switch>` for the toggles, the glass `<Slider>` for the
numeric axes, the glass `<Select>` for the font long-lists). (Capture:
`R4-SHELL-preset-segmented-{light,dark}.png`.)

## R5-4 — the panel-padding rung at the root (token-first)

`--panel-padding: 0.375rem` (+ `--panel-padding-roomy: 1rem` reserved) minted in
`tokens/offsets-sizing.css §10`. `.floating-panel` and the `.dropdown-menu-content` /
`.dropdown-sub-content` recipes now read `padding: var(--panel-padding)`; the prior
hand-set `p-1` (4px) is removed from the DropdownMenu SFC `cn()` chains so the token is
the sole authority. A live demo DropdownMenu content surface resolves the rung to **6px
both modes** (readback `dropdownContentPadding.{light,dark}.paddingTop: "6px"`), up from
the tight 4px — comfortable, retunable from one override. The slides `.deck-settings`
interim arm retires on this. (Capture: `R4-SHELL-dropdown-padding-{light,dark}.png`.)

## Item 5 — end-to-end + a11y

- **open → edit → live-apply**: clicking the Density "Compact" segment wrote
  `--density-pad: -0.25rem` + `--density-gap: -0.125rem` to `:root` through the
  SegmentedTabs model (readback `liveApply.changed: true`, `pressedLabel: "Compact"`),
  no reload, no re-render.
- **aria-expanded on the trigger**: a new shared open singleton
  (`demo/configurator/useConfiguratorOpen.ts`) is the ONE source of truth both the
  PresetEditor Sheet (`v-model:open`) and the gear (`:aria-expanded="configOpen"`)
  bind. The gear — the interactive trigger — carries `aria-expanded` reflecting it
  (readback `gearExpanded: "true"` while open / `"false"` at rest), honoring the
  CLAUDE.md GlassDock aria contract (the presentational dock ROOT never carries it).
- **focus into the panel**: the reka-ui Dialog focus trap moves focus inside the Sheet
  on open (probe `focusInside: true`).

## Capture provenance

`tests-visual/_r4-shell-config-capture.spec.ts` — one-shot generator, driven against
the running demo on :5199 (`GLASS_UI_DEMO_URL`). 1280×860 viewport, both color modes.
The evidence is the .png set + `R4-SHELL-readback.json`. typecheck green;
`proof:register-ios` green.

## Files

| file | change |
|---|---|
| `demo/configurator/PresetEditor.vue` | Preset RadioGroup → SegmentedTabs (+ description line); Density button-triplet → SegmentedTabs; consume the shared open singleton; drop the now-dead `cn`/`RadioGroup`/`ref` imports |
| `demo/configurator/useConfiguratorOpen.ts` | NEW — the shared `open` singleton (one source of truth for the gear's aria-expanded + the Sheet model) |
| `demo/layout/SidebarDock.vue` | the gear DockIconButton gains `:aria-expanded="configOpen"` off the shared singleton |
| `src/styles/tokens/offsets-sizing.css` | mint `--panel-padding` (0.375rem) + `--panel-padding-roomy` (1rem) |
| `src/styles/floating-panel.css` | `.floating-panel` + the dropdown content family read `padding: var(--panel-padding)` |
| `src/components/ui/dropdown-menu/DropdownMenu{,Sub}Content.vue` | drop the tight `p-1` (the CSS rung is now the sole padding authority) |
