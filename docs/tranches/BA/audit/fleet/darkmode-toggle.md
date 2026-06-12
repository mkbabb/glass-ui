# BA fleet lane — darkmode-toggle (R8-3)

LANE SCOPE: R8-3 — the gear Configurator APPEARANCE → Dark mode row (1) does NOT flip the
mode and (2) renders a plain `<Switch>` instead of the animated `DarkModeToggle` sun/moon.
Root-cause the broken binding, verify both directions live, assess the proper control against
the R4-3 spec, and sweep ALL demo dark controls for the same wiring class.

DISCIPLINE: AUDIT-ONLY. Live-probed on :5199, dark mode (the demo booted dark). Evidence
PNGs banked beside this report.

---

## VERDICT

Two distinct defects on the SAME row, both confirmed live + root-caused to file:line:

- **F1 (S2, mechanical) — the dark Switch is wired through a `delta.dark` shadow state that
  desyncs from the live `isDark` ref, so the toggle is a NO-OP and boots out of sync.**
- **F2 (S3, design) — the control is a generic `<Switch>`, not the canonical animated
  `DarkModeToggle` sun/moon; R8-3 names that as wrong.**

The wiring class (F1) is **ISOLATED** to the configurator row — every OTHER demo dark control
reads the live `isDark`/`toggleDark` directly and works.

---

## F1 — the dark toggle is a NO-OP (mechanical, S2)

### Live reproduction (:5199, demo booted DARK)

| probe | observed |
|---|---|
| boot state | `html.dark` = `true`, `localStorage['vueuse-color-scheme']` = `"dark"` → page IS dark |
| Dark-mode switch at boot | `aria-checked: false`, `data-state: unchecked` → switch reads **OFF** while the page is dark — **MISMATCH** (`mismatch: true`) |
| click switch → ON (`aria-checked` false→true) | `html.dark` stays `true`, `colorScheme` stays `dark` — **mode did NOT flip** |
| click switch → OFF (`aria-checked` true→false) | `html.dark` STILL `true` — **mode did NOT flip** either direction |

Captures: `darkmode-configurator-open-dark.png` (the gear view with the OFF switch over the
dark page), `darkmode-switch-mismatch-dark.png` (the Appearance section, switch OFF / page dark).

### Root cause — the `delta.dark` shadow desync

The row is bound to a computed that reads/writes a SEPARATE delta state instead of the live
dark ref:

- `demo/configurator/PresetEditor.vue:93-96` — `darkModel` getter = `cfg.effective("dark")`,
  setter = `cfg.setField("dark", v)`.
- `demo/configurator/PresetEditor.vue:188` — `<Switch v-model="darkModel" />`.

The getter is disconnected from `isDark`:

- `demo/configurator/preset-editor/store.ts:105-117` — `effective("dark")` returns
  `delta.dark ?? DEFAULT_CONFIG.dark`. `DEFAULT_CONFIG.dark` is `false`
  (`demo/configurator/preset-editor/defaults.ts:53`). It **never reads `isDark.value`**, so a
  page booted dark (system / persisted) ALWAYS shows the switch as `false` (OFF). This is the
  boot mismatch.

The setter only toggles on a delta divergence, and the equal-to-default short-circuit drops
the toggle entirely on the way back:

- `store.ts:168-174` — `setField("dark", v)`: sets `delta.dark = v`, then `if (v !== isDark.value) toggleDark()`. When the page is already dark (`isDark.value === true`) and the user
  flips the switch toward ON (`v = true`), `true !== true` is **false** → `toggleDark()` is
  **never called** → mode unchanged.
- `store.ts:152-161` — the generic equal-to-default guard in `setField` fires FIRST: when
  `v = false` (user turns the switch OFF) and `false === DEFAULT_CONFIG.dark (false)`, it
  routes to `clearField("dark")` and **returns before ever reaching the dark-toggle branch**.
- `store.ts:123-145` — `clearField` deletes `delta.dark` and explicitly does NOT touch the
  global (`store.ts:142` comment: "`dark` has no CSS prop — handled via useGlobalDark"), but
  nothing re-syncs `isDark`. So clearing the dark delta leaves the global stuck wherever it
  was. The OFF path is therefore ALSO a no-op.

Net: the only path that CAN flip the mode is `setField("dark", v)` with `v` diverging from
both `DEFAULT_CONFIG.dark` AND `isDark.value` — which the boot-desync makes unreachable in the
common dark-booted case. The `watch(isDark)` at `store.ts:278-288` mirrors EXTERNAL flips back
INTO the delta, but the row's own getter still reads `delta.dark ?? false`, so the displayed
state and the live state diverge whenever no delta is set.

### Why the canonical control does NOT have this bug (the contrast)

`DarkModeToggle.vue` (`src/components/custom/controls/DarkModeToggle.vue:111,122-123,93`) reads
`isDark` directly for both its label/`aria-pressed` AND calls `toggleDark()` on click. It owns
NO shadow delta — it is a thin view over the live singleton, so it can NEVER desync. The
configurator's bug is structurally the introduction of a second source of truth (`delta.dark`)
for a value that already has a global owner (`useGlobalDark().isDark`).

### Gestalt remedy direction

Dark is GLOBAL state with a canonical owner (`useGlobalDark`), not a per-preset CSS-token
field. The fix direction is to STOP modeling `dark` as a `delta`/CSS-writer field and instead
bind the row DIRECTLY to the live `isDark` ref (a writable computed over `isDark` that calls
`toggleDark()` on the divergent write) — the same single-source view `DarkModeToggle` already
is. The persisted-preset "dark" notion (boot re-seed, reset-to-default) belongs to the
`useGlobalDark` seam (`initialValue` / `darkModeSyncScript`), not a shadow delta the row reads.
This collapses F1 entirely: no delta, no desync, no equal-to-default short-circuit. It pairs
with F2 — once the row reads `isDark` directly, dropping in the `DarkModeToggle` component is
the natural shape.

---

## F2 — the control is a plain Switch, not the sun/moon DarkModeToggle (design, S3)

R8-3 verbatim: "it's not even the proper darkmode toggle button/icon." The row renders
`<Switch v-model="darkModel" />` (`PresetEditor.vue:188`), a generic on/off pill. The library
OWNS the canonical animated control — `DarkModeToggle` (the Kevin-Powell sun↔moon SVG with the
spring sun-ray rotation + sliding moon disc, `src/components/custom/controls/DarkModeToggle.vue`),
the SAME control every demo-content dark story uses.

### What R4-3 actually specified (the spec audit)

R4-3 (`docs/tranches/AZ/audit/USER-AUDIT-2026-06-11-R4.md:12`) said the gear opens the Preset
Editor "with the **dark-mode toggle component at the TOP**." The phrase is "dark-mode toggle
**component**" — i.e. the `DarkModeToggle`, placed FIRST. The AZ implementation
(`W-SHELL-CONFIG`) instead folded it as a generic `<Switch>` and the reflect doc
(`docs/tranches/AZ/audit/reflect/shell-ia.md:25-26`) recorded R4-3 PASS on the basis of
"first control 'Dark mode'" — it greened on PLACEMENT (top of Appearance) but substituted a
Switch for the named component. So R8-3 is the user re-asserting the original R4-3 intent: the
control at the top of the gear must be the animated `DarkModeToggle`, not a Switch.

### Gestalt remedy direction

Replace the `<Switch>` in the Appearance → Dark mode row with the canonical
`DarkModeToggle` (it already lays out as an inline button; `size="control"` or `size="md"`
fits the row's right-aligned control slot). This is also the F1 fix carrier — the component is
self-syncing, so adopting it removes BOTH the wrong-control complaint and the desync. The
`can-reset` affordance on the row (`PresetEditor.vue:184-185`) should re-point to the
`useGlobalDark` reset (mode→system/default), not `clearField('dark')`.

---

## Sweep — ALL demo dark controls (the wiring-class census)

Every OTHER demo dark control reads the live `isDark`/`toggleDark` directly — NONE share the
`delta.dark` shadow-state class. The bug is isolated to the configurator row.

| site | file:line | wiring | status |
|---|---|---|---|
| Configurator Appearance row | `PresetEditor.vue:93-96,188` + `store.ts:105,168-174` | `effective/setField('dark')` over a `delta.dark` shadow | **BROKEN (F1)** |
| use-token-color story | `demo/stories/composables/use-token-color.vue:24,37` | `<DarkModeToggle>` + reads `isDark` | OK (demo content) |
| use-global-dark story | `demo/stories/composables/use-global-dark.vue:12-13,24` | calls `siteA.toggleDark()` directly | OK (demo content) |
| use-dark-mode-sync story | `demo/stories/composables/use-dark-mode-sync.vue:19,30` | calls `toggleDark()` directly | OK (demo content) |
| dark-mode-toggle display story | `demo/stories/display/dark-mode-toggle.vue:31,50,66,81` | `<DarkModeToggle>` (size axis) | OK (demo content) |
| SidebarDock standalone toggle | `demo/layout/SidebarDock.vue:181,267-268` (comments only) | REMOVED at AZ — configurator is the single chrome home | correctly retired |

The chrome single-home contract (R3-4: configurator is the ONE chrome dark control, standalone
SidebarDock toggle removed) is INTACT in structure — but the one surviving chrome control is
the broken one, so the demo currently has NO working chrome dark toggle. The story-content
toggles still flip the global (they are the de-facto working path the user must fall back to),
which is exactly the confusing split R8-3 surfaces.

---

## Evidence files (beside this report)

- `darkmode-configurator-open-dark.png` — the gear Configurator open over the dark page;
  Appearance → Dark mode row shows the switch in the OFF position.
- `darkmode-switch-mismatch-dark.png` — the Appearance section, switch OFF (`unchecked`) while
  `html.dark` is active — the boot mismatch.
- Live probe log (in-report table): boot `aria-checked:false`/`html.dark:true`; click→ON leaves
  `html.dark:true`; click→OFF leaves `html.dark:true` — NO-OP both directions.
