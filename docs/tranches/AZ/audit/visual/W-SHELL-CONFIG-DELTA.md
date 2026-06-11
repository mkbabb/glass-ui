# AZ.W-SHELL-CONFIG — the gear opens the glass-ui demo Configurator: the floating FAB dies, the composables view is deleted, the standalone dark toggle folds into the configurator Switch, and the post-W54 axes (--glass-level / --ui-scale / PRM) are surfaced · DELTA

<!-- surface-paths: demo/configurator/PresetEditor.vue, demo/configurator/preset-editor/types.ts, demo/configurator/preset-editor/defaults.ts, demo/configurator/preset-editor/css-writers.ts, demo/configurator/preset-editor/store.ts, demo/stories/manifest.ts, demo/layout/SidebarDock.vue, demo/layout/AppShell.vue, demo/demo.css, scripts/proof-shell-config.mjs, tests-visual/shell-config.spec.ts -->
<!-- surface-hash: b74b681fa3f1b6b834975b092bce849a5c7e696303f0dad4717c77627d5f20b8 -->
<!-- AZ.W-GATES content-hash freshness model: fresh IFF the eleven surface-paths'
     bytes are byte-identical to capture time (sha256 of the "\n"-joined bytes, computed
     via proof-live-verified-ledger.mjs::surfaceHash). Stamped at the own-surface capture
     against the current AZ-tree bytes — the configurator + overview + IA PNGs were shot
     on :5199 with the wave's source edits in place. -->

R3-4 (refined by R4-3) lands: the demo's gear opens the re-framed **glass-ui demo
Configurator**, exposing the post-W54 design axes (`--glass-level`, `--ui-scale`, an
optional reduced-motion control) ALONGSIDE the token controls, and that configurator is
the SINGLE chrome home for the dark-mode toggle. The floating FAB that hovered over every
page is GONE (rehomed onto the SidebarDock gear control). The composables reference VIEW
is DELETED. The `,` shortcut + the window event survive untouched.

## §0 re-ground — the cites shifted under Batch-2; RE-GREPPED at HEAD

`SidebarDock.vue` moved a lot under W-DOCK-CONTEXT (the route-driven `<DockLayerGroup>`)
and W-RAIL-EXTEND (the `<DockRail>` `#rail` slot). The digest's `:27`/`:58`/`:160-163`/`:209`
cites for the import / `referenceCategories` / reference-shelf / standalone-toggle were
re-located before the edit. The `--ui-scale` token cites held: the `@property --ui-scale`
registration at `property-regs.css:133` (default 1, inherits:true), the master-comfort-scalar
comment at `offsets-sizing.css:81`, and the `--dock-scale: calc(var(--ui-scale) *
var(--dock-local-scale, 1))` derivation at `offsets-sizing.css:243` — all verified, all
LIBRARY-shipped (the demo SURFACES the knobs, zero library edit).

## The moves

1. **Remove the floating FAB; rehome the open (D1/D6).** The `fixed bottom-6 right-6 z-dock
   … rounded-full` FAB `SheetTrigger` is DELETED from `PresetEditor.vue` (the `Settings2`
   FAB glyph + `SheetTrigger` import with it). The `<Sheet>` is now open-controlled by `open`,
   driven by the `,` shortcut + the `glass-ui-demo:toggle-configurator` window event (both
   STILL functional) + the rehomed dock gear. The open is rehomed onto a `Settings2`
   `DockIconButton` at the trailing END of the SidebarDock's default slot, behind a
   `<DockSeparator>` — the dock-as-configurator-chrome idiom (the home-top / utility-at-the-end
   nav-pattern). **Placement note**: the gear is in the `#full` (default) slot tail, NOT
   `#collapsed` — an `always-expanded` dock NEVER collapses, so its summary pane (which hosts
   `#collapsed`) stays `opacity:0/visibility:hidden`; the utility belongs in the always-visible
   full pane.

2. **Delete the composables view (D4).** The `CATEGORIES['composables']` block + the `Cog`
   import are DELETED from `manifest.ts` (clean break, no alias — the 22-story reference shelf
   is gone, not hidden). The routes/rail derive automatically from `CATEGORIES`. The now-dead
   `referenceCategories` computed + the reference-shelf template branch are removed from
   `SidebarDock.vue` (the `!c.reference` guard stays as a harmless forward filter — intro.vue
   reads it, out of bounds to edit).

3. **Remove the standalone dark toggle (D5).** The standalone `DarkModeToggle` (+ its import)
   is DELETED from `SidebarDock.vue`. The configurator's dark `Switch` is the SINGLE chrome
   home. The composable/display dark-toggle STORIES are CONTENT — kept.

4. **Re-frame + add the axes (D2/D3).** The title is re-framed "Preset Editor" →
   "glass-ui demo Configurator". A new **Appearance** section leads the body — the dark Switch
   at the TOP (R4-3), then a `--glass-level` slider (0..1.5, the W54 maximal-glass knob), a
   UI-scale slider (0.85..1.5, writing `--ui-scale` the GLOBAL knob — the dock's `--dock-scale`
   derives from it for free), and a reduced-motion `Switch`. The three axes thread through
   `ConfigBaseline` / `ConfigDelta` / `WritableField` (`types.ts`), `DEFAULT_CONFIG` +
   `FIELD_CSS_VARS` (`defaults.ts`), the `writeField` switch (`css-writers.ts`), and the
   `applyDelta` re-apply loop (`store.ts`).

5. **The PRM signal is live, not dead (§6.4).** `motion` writes `--demo-reduce-motion: reduce`
   to `:root`; a `@container style(--demo-reduce-motion: reduce)` bracket in `demo.css` consumes
   it (the SHIPPED `@container style()` bucket mechanism — the `--glass-backdrop` / `--density`
   precedent — NOT a media-query override, which `:root` cannot force). false strips the signal
   (the system PRM governs alone).

## HG1 — FAB-GONE: no floating gear hovers over the page

`W-SHELL-CONFIG-floating-fab-after-{light,dark}.png` (the overview, both schemes) — the
bottom-right corner is clear; only the centered BottomDock floats. The π G1 assert walks every
`position:fixed` button/anchor near the bottom-right and confirms NONE is a rounded-full /
configurator-labeled FAB.

## HG2 — RE-FRAMED + the axes render; the dark toggle leads

`W-SHELL-CONFIG-configurator-axes.png` — the open configurator titled "glass-ui demo
Configurator", the Appearance section leading with **Dark mode** (top), then **Glass level**,
**UI scale**, **Reduce motion**. The old "Preset Editor" title is gone (π G2 asserts count 0).

## HG3 — the axes write LIVE :root values (the binding runtime truth)

`W-SHELL-CONFIG-axes-write.json` — driving the sliders (ArrowLeft ×4 on glass, ArrowRight ×4
on scale) writes:

| axis | before (:root inline) | after | the proof |
|---|---|---|---|
| `--glass-level` | (unset) | `0.8` | the W54 maximal-glass knob took effect |
| `--ui-scale` | (unset) | `1.2` | the GLOBAL comfort scalar took effect |
| `--dock-scale` (derived) | `1` | `1.2` | **moved for free** via `calc(--ui-scale * --dock-local-scale)` — the demo NEVER writes `--dock-scale` directly |

## HG4 — the IA carries no composables

`W-SHELL-CONFIG-ia-no-composables.png` — the rail + bottom dock with no Composables entry.
The `/composables/use-token-color` route falls through to the no-match "Pick a story" frame
(π G5 asserts no Composables nav affordance renders).

## HG5 — `proof:shell-config` born-RED → GREEN

```
proof:shell-config — the gear-hosted demo-configurator gate (device-free SOURCE arm)
  9/9 pass
    ✓ fab-gone            — no fixed-FAB SheetTrigger
    ✓ composables-gone    — no id:"composables" / no Cog import
    ✓ single-dark-home    — no standalone DarkModeToggle; the configurator Switch is the home
    ✓ axes-glass-level    — ConfigBaseline.glassLevel + css-writers --glass-level
    ✓ axes-ui-scale-not-dock-scale — --ui-scale written, --dock-scale NOT written directly
    ✓ axes-prm-if-present — the motion field writes a live --demo-reduce-motion (no dead field)
    ✓ re-framed-title     — "glass-ui demo Configurator"
    ✓ rehome-gear-dispatch — Settings2 gear dispatches glass-ui-demo:toggle-configurator
    ✓ pi-readback-spec-exists
```

Born-RED proof (the pre-edit shape): the fixed FAB + "Preset Editor" title + no
glass-level/scale/PRM fields + the composables category + the standalone DarkModeToggle —
fab-gone/composables-gone/single-dark-home/axes/re-framed all RED, the gate exits non-zero.

## Gates

- `proof:shell-config` — 9/9 GREEN (device-free deletion proofs + source-witnesses).
- `tests-visual/shell-config.spec.ts` — 6/6 GREEN (G1 FAB-gone, G2 `,`-shortcut + re-framed,
  G3 dock-gear open, G4 the live `--glass-level`/`--ui-scale`→`--dock-scale` readbacks, G5
  IA-no-composables, G-CLOSE captures; LIVE_VERIFIED_LOCAL_ONLY, ledger-backstopped).
- `npm run typecheck` — GREEN.
- `npm run build` — GREEN (the shell route/rail derivation is clean post-composables-deletion).
- Adjacent fleet GREEN: `proof:shell-identity`, `proof:rail-extend`, `proof:dock-contextual-layers`,
  `proof:register-ios`, `proof:dock-unify`, `proof:page-redesign`, `proof:no-orphan-composable`.
- `proof:easter-eggs` — GREEN after the E6 reconcile: the standalone shell-rail dark toggle
  (the E5/E6 mount) is removed, so E6 re-anchors on the DarkModeToggle COMPONENT's `eclipse`
  register (the source-of-truth home of the affordance), not the removed rail mount.
- `proof:storybook-ia` — the composables fixture entry is removed (12 → 11 categories,
  auto-derived). The gate's remaining RED is the `motion`/`scroll-vt` drift owned by
  W-MOTION-SUITE (a disjoint fixture region — coordinate at integration).

## Scope-fence honored

DEMO-shell + demo-configurator chrome only. The library `--glass-level` / `--ui-scale`
knobs already ship (the demo SURFACES them — zero library-source edit). The `DockIconButton`
/ `DockSeparator` / `Sheet` / `Switch` / `Slider` are CONSUMED. The dock/overview bottom-nav
normalization (R3-5 E5) is deferred to W-DOCK-NORMALIZE; the foundations ℱ logo to
W-SHELL-IDENTITY; the R4-4 glassy-control refresh + R4-2 IA-noise prune to the R4-SHELL
successor corrective. The 22 orphaned `demo/stories/composables/*.vue` files are inert (no
route reaches them) and left in place — the directory is out of this wave's File Bounds; a
follow-up file sweep can delete them.
