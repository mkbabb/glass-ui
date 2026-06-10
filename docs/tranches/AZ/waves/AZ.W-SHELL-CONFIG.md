# AZ.W-SHELL-CONFIG - the gear opens the demo configurator: the two removals, the new axes, the dark-toggle fold

**Name**: W-SHELL-CONFIG - the gear-hosted demo configurator + the floating-FAB/composables-view removals
**Opens after**: AZ open (Batch 3; ‖ W-BLOB-PAGE, W-BLOB-STUDIO, W-MOTION-SUITE, W-SHELL-IDENTITY)
**Track**: Band S (the shell) · **Type**: implementation (demo shell — demo-private chrome) · **Depends on**: W-GATES.
**Hard gate**: born-RED `proof:shell-config` — the floating PresetEditor FAB is GONE (rehomed onto a dock/options control), the composables manifest category is DELETED, the standalone SidebarDock DarkModeToggle is REMOVED (the configurator Switch is the single chrome home), and the configurator exposes the post-W54 axes (`--glass-level`, a scale axis, an optional PRM control) under the renamed "glass-ui demo Configurator" title; π capture DELTA before/after.
**Status**: SPEC

## §0 — RE-GROUND (mandatory step-0 before any edit)

RE-GREP every cite at HEAD; the digest compresses line numbers. The grounding is the C3-shell-chrome census + the E3G GAP findings, all file:line. The shape R3-4 wants does NOT exist as a clean whole — the demo configurator is a FLOATING `PresetEditor` (the thing R3-4 DELETES), the composables view is a full reference CATEGORY (R3-4 DELETES it), the dark-toggle fold is HALF-DONE (the configurator Switch exists; the standalone shell-rail toggle survives), and the two headline post-W54 axes (`--glass-level`, `--dock-scale`) are absent. Everything here is DEMO-PRIVATE chrome — no library source moves (the `--glass-level` knob already SHIPS in the library; the wave SURFACES it in the demo configurator). This is the `E1-10` "dock-as-configurator-chrome" idiom (the keyframes ChromeDock pattern: GlassDock + DockSelectTrigger + DockIconButton) — a composition recipe, NOT a new primitive.

The fleet finding ids this wave executes (re-grep each):

| finding | verdict | what it means for this wave |
|---|---|---|
| `C3-GEAR-WIRING`/`C3-GEAR-OPENS-WHAT` | VERIFIED | the gear is a `Settings2` FAB → the `PresetEditor` Sheet, titled "Preset Editor"; it already exposes preset/font/scaleBase/hueShift/grain/density/radius/cartoonShadow + a folded dark Switch. R3-4 is largely DONE except the framing + the two missing axes + the floating-FAB/composables removals. |
| `C3-GEAR-MISSING-AXES` | GAP S3 | the configurator does NOT expose `--glass-level` (the W54 maximal-glass knob, 0=opaque..1=full) nor `--dock-scale`/a scale axis; no motion/PRM control. `ConfigBaseline` has no glassLevel/scale/motion fields. |
| `C3-DARKTOGGLE-PLACEMENTS` | OPEN-DEFECT S3 | the dark toggle has THREE placements: (1) folded into PresetEditor as a Switch (KEEP — the single home), (2) a STANDALONE DarkModeToggle in SidebarDock #collapsed (REMOVE), (3) inside composable/display STORIES (KEEP — content, not chrome). |
| `C3-COMPOSABLES-VIEW` | OPEN-DEFECT S2 | the composables view is `id="composables"`, 22 stories, `reference:true`, Cog icon; REMOVE = delete the `CATEGORIES['composables']` block; the rail reference-shelf + routes derive automatically. |
| `C3-FLOATING-CONFIG-OPTION` | OPEN-DEFECT S2 | the "floating-configurator option" = the `fixed bottom-6 right-6 z-dock rounded-full` FAB SheetTrigger; REMOVE the floating affordance, rehome the open onto a dock/options control; the `,` shortcut + the window event STAY functional. |
| `C3-AZ-EDIT-LIST` | DESIGN-FINDING S2 | the EXACT edit list (E1-E5): delete the composables block (+ Cog import + the now-empty rail reference-shelf branch); remove the FAB + rehome; remove the standalone SidebarDock toggle; re-frame + add `--glass-level`/`--dock-scale`/PRM through `ConfigBaseline` + `css-writers.ts`; (E5 = a W-DOCK-NORMALIZE concern, not this wave). |
| `E3G-6`/`F3-M7` | GAP S2 | the gear-hosted demo configurator (R3-4 shape) does NOT exist; the closest substrates are the PresetEditor + usePresetEditor store + the DarkModeToggle primitive + a dock gear DockIconButton. NO lane had audited the actual AppShell gear-action wiring before C3. |

## §1 — Verified defect table (file:line at HEAD — RE-GREP)

| # | defect | evidence (file:line) | capture |
|---|---|---|---|
| D1 | the configurator is a FLOATING FAB: a `glass-btn focus-ring fixed bottom-6 right-6 z-dock … rounded-full` SheetTrigger that floats over every page; R3-4 wants the floating affordance GONE, the configurator reachable from a dock/options control | `demo/configurator/PresetEditor.vue:117` (the fixed FAB classes), `:121` (aria-label "Open configurator"), `:123` (Settings2 glyph) | `ground/C5-_compositions_settings.png` (chrome context) |
| D2 | the configurator is framed/titled "Preset Editor" / "Live-edit glass-ui tokens", not the glass-ui demo Configurator | `demo/configurator/PresetEditor.vue:133-135` (SheetTitle "Preset Editor") | — |
| D3 | the configurator is MISSING the two headline post-W54 axes: no `--glass-level` (the W54 opacity+blur knob), no `--dock-scale`/scale axis, no PRM control; `ConfigBaseline` carries only preset/font/scaleBase/hueShift/grain/density/radius/cartoonShadow/dark | `demo/configurator/preset-editor/types.ts:22-32` (ConfigBaseline fields — no glassLevel/scale/motion); `demo/configurator/PresetEditor.vue:142-342` (no glass-level/dock-scale/PRM rendered) | — |
| D4 | the composables VIEW is a full reference CATEGORY R3-4 wants removed: `id="composables"`, `reference: true`, Cog icon, 22 stories; it appears as routes + a SidebarDock reference-shelf rail entry + BottomDock tabs | `demo/stories/manifest.ts:329` (id composables), `:331` (icon Cog), `:332` (reference true), `:30` (Cog import); `demo/layout/SidebarDock.vue:58` (referenceCategories filter), `:160-163` (the reference-shelf branch under a DockSeparator) | — |
| D5 | the dark-toggle fold is HALF-DONE: the configurator Switch exists (KEEP) but a STANDALONE `DarkModeToggle` survives in SidebarDock #collapsed — R3-4 wants the configurator to be the SINGLE chrome home | `demo/configurator/PresetEditor.vue:13` (Switch import — the folded toggle, RE-GREP the render line ~332-341); `demo/layout/SidebarDock.vue:27` (DarkModeToggle import), `:209` (the standalone render) | — |
| D6 | the gear-action wiring is via a `glass-ui-demo:toggle-configurator` CustomEvent + the `,` shortcut; these STAY functional (the floating FAB visual is the "option" to remove, not the keyboard/event path) | `demo/configurator/PresetEditor.vue:34` (CONFIG_EVENT), `demo/layout/AppShell.vue:78-85` (the `,` shortcut dispatches the event), `:19` (PresetEditor import), `:158`-region (FAB mounted at shell root, RE-GREP) | — |

## §2 — Goal criterion

The demo's gear opens the glass-ui demo CONFIGURATOR — re-framed (renamed from "Preset Editor"), exposing the post-W54 design axes a demo configurator should teach (`--glass-level` the maximal-glass knob, a `--dock-scale`/scale axis, an optional PRM control) ALONGSIDE the existing token controls — and that configurator is the SINGLE home for the dark-mode toggle. The floating FAB that hovers over every page is GONE, rehomed onto a dock/options control (the dock-as-chrome idiom). The composables reference VIEW is DELETED — the demo IA no longer carries the 22-story reference category. The `,` shortcut and the window event survive (the keyboard/programmatic path is unchanged); only the floating VISUAL and the composables/standalone-toggle surfaces are removed. A visitor opens the gear and sees ONE coherent options view, reachable from the chrome, not a floating button over a reference-heavy IA.

## §3 — Scope

1. **Remove the floating FAB, rehome the open (D1/D6 — C3 E2).** DELETE the `fixed bottom-6 right-6 z-dock … rounded-full` FAB SheetTrigger from `PresetEditor.vue`; rehome the open affordance onto a dock/options control — a `#collapsed` or trailing `DockIconButton` (gear glyph) on the `SidebarDock` (or a new options dock control) that dispatches the SAME `glass-ui-demo:toggle-configurator` event. The `,` shortcut + the window event STAY functional (they are NOT the "floating option" — the FAB visual is). This is the `E1-10` dock-as-configurator-chrome idiom (GlassDock + DockIconButton).
2. **Delete the composables view (D4 — C3 E1).** DELETE the `CATEGORIES['composables']` block from `manifest.ts` (`:329`-region); drop the now-unused `Cog` import (`:30`); the SidebarDock rail reference-shelf branch (`:160-163`) goes empty when `referenceCategories` is empty — remove the branch + its `DockSeparator` if it leaves a dangling divider. The routes derive automatically from `CATEGORIES`, so no router edit beyond the manifest deletion. (Per the no-legacy invariant: clean break, no alias — the composables stories are gone, not hidden.)
3. **Remove the standalone dark toggle (D5 — C3 E3).** DELETE the standalone `DarkModeToggle` from `SidebarDock.vue` `#collapsed` (`:209`-region) + its import (`:27`); the configurator Switch (`PresetEditor.vue` ~332-341) is the SINGLE chrome home. The composable/display STORY placements (`use-token-color`, `dark-mode-toggle`) are CONTENT, not chrome — KEEP them.
4. **Re-frame + add the axes (D2/D3 — C3 E4).** Rename "Preset Editor" → the glass-ui demo Configurator (the SheetTitle + the subtitle); ADD a `--glass-level` slider (0..1, the W54 opacity+blur knob — the demo SURFACES the shipped library knob, writing it to `:root` via `css-writers.ts`), a `--dock-scale`/scale axis slider, and an optional `prefers-reduced-motion` control — threading the new fields through `preset-editor/types.ts` `ConfigBaseline` + `defaults.ts` + `css-writers.ts` (the existing write path). The dark Switch stays (the fold from §3.3's removal lands here as the single home).
5. **The dark-toggle fold consolidation (cross-cut of D5).** Confirm the configurator Switch is the ONLY chrome dark toggle after §3.3; the C3-DARKTOGGLE three-placement audit reduces to ONE chrome placement (the Switch) + the content-story placements (kept).
6. **The born-RED gate `proof:shell-config`** (§6).

NOTE on R3-5/E5: the `dock/overview.vue:370` bottom-nav-silhouette Home → `#persistent` move (C3 E5) and the broader dock-normalization are W-DOCK-NORMALIZE's scope (`AZ.md` Band D), NOT this wave — this wave is the gear/configurator/removals only. The named successor for the dock-normalization edits is W-DOCK-NORMALIZE.

### §3a — Triumvirate Dispatch

- **File-bounds expansion**: if rehoming the FAB onto a dock control (§3.1) requires a new library DockIconButton variant or a dock-control API change (it should not — the gear is a glyph button), the scope-reveal trigger fires — triumvirate (the dock-as-chrome composition is the research lane; the library dock controls already ship).
- **Hard-gate failure**: if deleting the composables category (§3.2) leaves a dangling rail/route/tab reference that breaks the shell build (the `referenceCategories` filter, the BottomDock tabs), the diagnostic-loop trigger fires on the third build-red iteration — triumvirate (the manifest→rail/route derivation is the research lane). The C3-COMPOSABLES-VIEW finding says the derivation is automatic, so a break here is a reveal worth researching.
- **Disjointness**: this wave OWNS `manifest.ts` (the composables-block deletion) — W-MOTION-SUITE also READS/registers /motion rows in `manifest.ts`. The composables block (`:328-357`) and the /motion rows are DISJOINT line regions; sequence this wave's DELETION first if they collide at integration. This wave does NOT touch the dock/overview normalization (W-DOCK-NORMALIZE) nor the foundations logo (W-SHELL-IDENTITY).

## §4 — File Bounds

| File | Access |
|---|---|
| `demo/configurator/PresetEditor.vue` | modify-carve (DELETE the FAB; re-frame the title; add the glass-level/dock-scale/PRM controls; keep the Switch — D1/D2/D3/D4) |
| `demo/configurator/preset-editor/types.ts` | modify (add glassLevel/scale/motion to `ConfigBaseline` — D3) |
| `demo/configurator/preset-editor/defaults.ts` | modify (the new-field defaults — D3) |
| `demo/configurator/preset-editor/css-writers.ts` | modify (write `--glass-level`/`--dock-scale`/PRM to `:root` — D3) |
| `demo/stories/manifest.ts` | modify-carve (DELETE the composables category block + the Cog import — D4; disjoint from W-MOTION-SUITE's /motion rows) |
| `demo/layout/SidebarDock.vue` | modify-carve (DELETE the standalone DarkModeToggle + its import; rehome the configurator-open gear control; remove the empty reference-shelf branch — D1/D4/D5) |
| `demo/layout/AppShell.vue` | modify (the FAB mount removed at shell root; the `,` shortcut + event STAY — D6) |
| `scripts/proof-shell-config.mjs` | create (the born-RED gate) |
| `scripts/gates.mjs` | modify (register the row — coordinate with W-GATES) |

Do NOT touch: the library `src/` (the `--glass-level` knob already ships — the demo SURFACES it; no library edit). The composable/display dark-toggle STORIES (`use-token-color.vue`, `dark-mode-toggle.vue` — content, kept). The `dock/overview.vue` bottom-nav normalization (W-DOCK-NORMALIZE). The foundations ℱ logo (W-SHELL-IDENTITY). The BottomDock home/nav pattern (W-DOCK-NORMALIZE).

### §4a — Disjointness

This wave is ONE agent unit (the gear/configurator/removals are a coupled shell-chrome redesign — the FAB removal, the dock-control rehome, the composables deletion, the toggle fold, and the new axes are one coherent change). The `manifest.ts` shared-file risk with W-MOTION-SUITE is sequenced (composables-block deletion first; the /motion rows are a disjoint region). `scripts/gates.mjs` appended after W-GATES (Batch 0).

## §5 — Agent Units

### AZ.W-SHELL-CONFIG.1 the gear-hosted demo configurator + the removals

- **Goal**: the gear opens a re-framed glass-ui demo Configurator exposing the post-W54 axes and owning the single dark toggle; the floating FAB and the composables view are gone.
- **Mechanism**: DELETE the fixed FAB + rehome the open onto a dock gear control; DELETE the composables manifest category (+ Cog import + the empty rail branch); DELETE the standalone SidebarDock DarkModeToggle; re-frame the title + add `--glass-level`/`--dock-scale`/PRM through `ConfigBaseline`/`defaults.ts`/`css-writers.ts`.
- **Files**: the §4 set.
- **Sub-gate**: `proof:shell-config` GREEN (the §6 conditions) + the π DELTA pair on disk.

## §6 — Hard Gate (born-RED `proof:shell-config`)

A SPECIFICATION authored as `scripts/proof-shell-config.mjs`, born-RED against HEAD. Bites:

1. **FAB-GONE (deletion proof + π).** Assert `PresetEditor.vue` renders NO `fixed bottom-6 right-6 … rounded-full` FAB SheetTrigger; a live π capture of every route shows NO floating gear button hovering over the page. The configurator opens from a DOCK control (a `DockIconButton` gear) + the `,` shortcut (still functional — a runtime check the event still toggles). RED today (`PresetEditor.vue:117`).
2. **COMPOSABLES-GONE (deletion proof).** Assert `manifest.ts` has NO `id: "composables"` category and NO `Cog` import; the composables routes no longer resolve. RED today (`manifest.ts:329`).
3. **SINGLE-DARK-HOME (deletion proof + source-witness).** Assert `SidebarDock.vue` imports NO `DarkModeToggle` and renders none in `#collapsed`; the ONLY chrome dark toggle is the configurator Switch. RED today (`SidebarDock.vue:27,209`).
4. **AXES-PRESENT (source-witness + π).** Assert `ConfigBaseline` carries `glassLevel`/`scale`/`motion` fields, `css-writers.ts` writes `--glass-level`/`--dock-scale`/the PRM signal to `:root`, and the live configurator renders the sliders; a runtime check drives the `--glass-level` slider and reads the changed `:root` value (a real `--glass-level` write, the W54 knob taking effect). RED today (`types.ts:22-32` no such fields).
5. **RE-FRAMED (π).** The configurator title reads the glass-ui demo Configurator, not "Preset Editor". RED today (`PresetEditor.vue:133-135`).
6. **DELTA.** The captured before/after pair (the floating-FAB-gone overview, the configurator open with the new axes, the IA without composables), light+dark, on disk under `ground/W-SHELL-CONFIG-`.

## §7 — Format And Lint Cadence

`npm run typecheck` after the `ConfigBaseline`/`css-writers` edits and at close; `git diff --check` before close. The composables deletion must leave the shell BUILD green (the manifest→route/rail derivation) — `npm run build` (or the dev-server boot) is the integration check after §3.2. Gate defaults `:5199`.

## §8 — Verification Artefacts

- `ground/W-SHELL-CONFIG-floating-fab-{before,after}-{light,dark}.png`
- `ground/W-SHELL-CONFIG-configurator-axes.png` (the open configurator with --glass-level/--dock-scale/PRM)
- `ground/W-SHELL-CONFIG-ia-no-composables.png`
- `ground/W-SHELL-CONFIG-glass-level-write.json` (the runtime --glass-level slider→:root readback)
- `scripts/proof-shell-config.mjs` (the gate, GREEN)
- the `proof:shell-config` PASS log

## §9 — Commit Plan

- one implementation commit: `feat(AZ): gear-hosted demo configurator — remove floating FAB + composables view + standalone dark toggle; add --glass-level/--dock-scale/PRM axes; re-frame title` (body: names the two removals as clean breaks per the no-legacy invariant, the dark-toggle single-home consolidation, the W-DOCK-NORMALIZE deferral for E5).
- the gate-registration line + a status commit at close.

## §10 — Dependencies

- **Depends on**: W-GATES (proof:all crashable).
- **Blocks**: nothing hard. Reads `manifest.ts` disjoint from W-MOTION-SUITE (sequence the composables deletion first). The dock-normalization edits (R3-5 E5) are deferred to W-DOCK-NORMALIZE (the named successor); the foundations ℱ logo to W-SHELL-IDENTITY.

## §11 — Archaeology

`B1-W-SB3` / `A1-11` record R3-4 as a NEW post-AY-close redesign mandate with no implementation at HEAD (it was never claimed addressed). `E3G-6`/`F3-M7` note that BEFORE the C3 census NO lane had audited the actual AppShell gear-action wiring — the C3-AZ-EDIT-LIST (E1-E5) is the exact verified edit set this wave executes (minus E5, deferred). New guardrail: §6.2 COMPOSABLES-GONE is a deletion-proof, not a "hidden" check — the no-legacy invariant means the category is DELETED (no alias, no reference:false hide), and the manifest→route/rail derivation is the build-integration check. The C3-NORMALIZATION-SCOPE finding (R3-5 must be SCOPED to nav docks, not feature-demo docks) is recorded here as the boundary: this wave does NOT force home controls onto feature docks — that scoping lives in W-DOCK-NORMALIZE.
