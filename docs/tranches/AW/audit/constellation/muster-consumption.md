# muster-consumption — exemplary consumer, but mounts the simple-collapse GlassDock → 3.4.0-gated

muster (`@mkbabb/muster-frontend`, CSP/sudoku solver) is a clean, disciplined glass-ui consumer:
correct CSS wiring, subpath-first imports, cascade-correct `:root` token overrides, no dead-local
re-declarations. The ONE blast-radius item: its `CommandDock.vue` mounts `<GlassDock>` on EXACTLY
the simple two-layer collapse path (`startCollapsed` + `#collapsed` slot + default slot) that the
AW.W1 spec names as broken in 3.3.0. muster must NOT bump to `^3.3.0`; its consume path is 3.4.0.

## Findings

1. **GlassDock blast-radius — muster is squarely in it.** `frontend/src/components/dock/CommandDock.vue:118-237`
   mounts `<GlassDock variant="dock" position="fixed" :start-collapsed="true" :collapse-delay="2500">`
   with a `#collapsed` slot (the live verdict pill, :129-196) and a default slot (the expanded action
   strip, :203-236). This is the plain default-+-`#collapsed`-slot collapse path — the exact path
   `AW.md` D-1/§1 says AV.W9 broke in 3.3.0 ("the default + `#collapsed` slot path that slides
   consume: the state toggles to expanded, but the width does not morph"). muster's dock is the
   primary chrome (Run/Share/Export/Recent/Reset/Settings + dark-mode toggle + identity slot), so the
   frozen-width-morph regression would degrade muster's most-used surface. The dock also imports
   `DockIconButton`/`DockTabButton` (CommandDock.vue:37-40) and `DarkModeToggle size="dock"` (:235).

2. **Version pin is `^3.1.0`; installed + locked at 3.1.0 (PRE-regression).** `frontend/package.json:17`
   pins `"@mkbabb/glass-ui": "^3.1.0"`. `frontend/package-lock.json` resolves `3.1.0`
   (`node_modules/@mkbabb/glass-ui/package.json` version `3.1.0`). So muster TODAY runs the
   pre-regression dock — it is NOT broken at HEAD. The hazard is a fresh `npm install` / lockfile
   refresh: `^3.1.0` floats up to 3.3.0 and inherits the frozen collapse. The 3.4.0 fix (AW.W1) is
   the safe target; a bump to ^3.3.0 in the interim is the trap.

3. **Staleness ledger is two minors behind.** muster's own docs only know the **3.0.0** adoption
   (`docs/tranches/I/I.md:26,51`, `I/audit/PATH-FORWARD.md:25`, `I/audit/W5-shapeb.md:51`): they plan
   a `^2.1.0 → ^3.0.0` pin-bump + 2 stale-comment scrubs + a `useIdleReady` AuroraHost adoption, all
   "gated on glass-ui publishing." But muster is already at `^3.1.0` installed — so the I-tranche
   "gated 3.0.0 adoption" prose is itself stale (the bump happened, beyond 3.0.0). Nothing in muster's
   docs anticipates 3.2.0/3.3.0 or the GlassDock regression. Per the discipline rules, verify against
   files, not the ledger: the ledger is behind reality here.

4. **CSS wiring — all four binding requirements present and correct.** `frontend/src/styles.css`
   carries: `@import "tailwindcss"` (:1), `@import "tw-animate-css"` (:2), `@import "@mkbabb/glass-ui/styles"`
   (:3, single import — AN.W1 fold honored; the second `styles.css` import survives only inside a
   comment at :273, NOT live), `@source "../node_modules/@mkbabb/glass-ui/dist"` (:12, the content-scan
   with a correct AN.W2 rationale block), and `@variant dark (&:where(.dark, .dark *))` (:14). This is
   a textbook consumer-wiring block.

5. **Token overrides are cascade-correct (no dead-local re-declarations).** All overrides ride
   `:root` / `:root:not(.dark)` (styles.css:42-117): `--configurator-aside-width` (:85, the consumer
   preset per presets-in-consumer precept), `--card` warm-near-white (:105), `--glass-highlight` /
   `--glass-specular` / `--glass-under-shadow-*` (:108-116). The `:root:not(.dark)` scoping is
   deliberate (a documented pass-3 fix, :88-103) so warm-cream light tokens never leak into glass-ui's
   `.dark` block. `--shadow-dock` is NOT re-declared — it inherits from glass-ui (:67-68, cites
   upstream tokens.css:543-546). This is exactly the "override on the cascade, never re-declare a dead
   local" contract.

6. **Subpath discipline is strong.** 40+ import sites, all flat per-package subpaths
   (`/button`, `/dock`, `/configurator`, `/slider`, `/number-field`, `/forms`, `/keyboard`, `/popover`,
   `/sheet`, `/collapsible`, `/badge`, `/status-dot`, `/metric-badge`, `/metric-cell`, `/metric-stack`,
   `/progress`, `/tabs`, `/toggle-chip`, `/sortable-list`, `/instrument-chassis`, `/controls`,
   `/pulse`, `/command`, `/dialog`, `/label`, `/motion`, `/motion-core`, `/api`). The ONLY root-barrel
   import is `Drawer*` in `MobileInstrumentSheet.vue:25-31` — intentional + documented (:23-24:
   "glass-ui ships no /drawer subpath; it is a prop/type-only family with no isolated chunk").

7. **vueuse-bearing surfaces correctly via subpath.** `Input` via `@mkbabb/glass-ui/forms`
   (CommandPalette.vue:51, SettingsDialog.vue:38, ShareButton.vue:33, OriginPrefsPopover.vue:35,
   VoterRow.vue:22), `registerShortcut` via `/keyboard` (CommandPalette.vue:52), `useUserInvalidAria`
   via `/forms` (main.ts:2). No vueuse-bearing symbol pulled through the root barrel.

8. **Motion surface stable across 3.1.0→3.3.0 (verified in installed dist + 3.3.0 src).** muster
   imports `useSpring` + `useAnimatedNumberMap` from `/motion` (WinnerHero.vue:44, RankedVerdict.vue:42,
   useVerdictMoment.ts:59, VerdictStage.vue:12 `SpringRef`) and `useStagger` + `startViewTransition` +
   `useYieldToMain` from `/motion-core` (useVerdictMoment.ts:60, useReRank.ts:59). All six symbols are
   present in the installed `dist/motion.js` + `dist/motion-core.js` AND in glass-ui 3.3.0 source
   (`src/composables/motion/core/index.ts` re-exports useStaggerReveal/useViewTransition/useYieldToMain;
   `/motion` re-exports useSpring). A `^3.3.0` bump would NOT break the motion imports — the only
   3.3.0 hazard is the dock.

9. **Slider keep-dock-open contract is consumed correctly.** `SignalsLayer.vue:116`
   (`:keep-dock-open="true"`) and `CommandPalette.vue:490` (`:keep-dock-open="false"`) both bind the
   glass-ui Slider contract. SignalsLayer's slider sits inside the instrument aside (NOT the dock), so
   it explicitly opts in; the palette slider opts out. Note: muster's Sliders are NOT descendants of the
   `<GlassDock>` (the dock is a thin action strip, tuning lives in the aside) — so the AW.W3
   dock-with-slider refinement does not directly touch muster, but the keep-dock-open binding is wired.

10. **Aurora consumed via dynamic import + `/api` config front-door.** `AuroraHost.vue:54`
    (`await import("@mkbabb/glass-ui/aurora")`, idle-gated) + `useAuroraConfig.ts:47`
    (`DEFAULT_AURORA_CONFIG` + `AuroraConfig` from `/api`). muster hand-derives OKLCh stops from HSL in
    a consumer composable (useAuroraConfig.ts:42-43). The AW.W5 `deriveScene(seed, mood)` / AW.W4
    painterly arc are PLANNED (unimplemented) — muster cannot adopt them yet, but it is a natural
    future consumer of the derive-color front door (it already does bespoke HSL→OKLCh derivation).

## Wave-forming input

- **AW.W1 (dock collapse fix) — muster is a named downstream beneficiary alongside slides.** The W1
  spec's behavioral frame-timing gate should treat muster's `CommandDock.vue` shape (`startCollapsed`
  + `:collapse-delay` + `#collapsed` + default slot, horizontal, `variant="dock"`, `position="fixed"`)
  as a canonical fixture of the simple-collapse path. Sequencing edge: muster's `^3.1.0`→3.4.0 bump
  must wait on the 3.4.0 publish; document in the constellation ledger that muster MUST skip 3.3.0
  (the float-up trap). File bounds for the consumer side (post-publish, USER-DOMAIN): one-line pin
  bump `frontend/package.json:17` + lockfile refresh.

- **AW.W2/W3 (lockstep + spring unification) — pure visual upside for muster's dock, zero consumer
  edit.** muster's dock collapse/expand is the daily-driver chrome; the dock-shrinks-first-then-fades
  lag and the springy iOS motion land for free on the 3.4.0 bump. No muster source change.

- **AW.W5 (derive-color front door) — muster is a plausible consumer #2+ for `deriveScene`.** muster
  already hand-derives an OKLCh palette from a single brand/winner hue in `useAuroraConfig.ts:42-64`
  (winnerCategoryHue → tint drift). If `deriveScene(seed, mood)` ships, muster's bespoke HSL→OKLCh
  block is a candidate migration. NOT an ask now (planned/unimplemented); flag as future demand signal
  for the ≥2-consumer rule.

- **Staleness reconciliation item.** muster's I-tranche docs (`docs/tranches/I/*`) describe a
  "gated 3.0.0 adoption" that has already happened (installed `^3.1.0`). A future muster tranche
  should retire that stale prose; the constellation ADOPTION-ASKS ledger should record muster at
  `^3.1.0` installed (not the documented `^2.1.0`/`^3.0.0`).

## Anti-findings (verified FINE / already done)

- **CSS wiring is complete and correct** — all four binding requirements present (styles.css:1-14);
  single `/styles` import honors AN.W1; `@source` glob present with rationale.
- **No dead-local token re-declarations** — every override is on `:root`/`:root:not(.dark)`;
  `--shadow-dock` correctly inherited, not orphaned (styles.css:67-68).
- **Subpath discipline is strong** — 40+ sites flat-subpathed; the sole root-barrel use (`Drawer*`)
  is correct and documented.
- **vueuse surfaces (Input/forms, keyboard) correctly via subpath**, never through the root barrel.
- **Motion imports resolve across 3.1.0→3.3.0** — all six symbols present in installed dist + 3.3.0
  src; no motion-side break on a future bump.
- **Stack versions satisfy glass-ui peers** — vue `^3.5.34` (peer `^3.5`), tailwindcss `^4.3.0`
  (peer `^4.0`), vite `^8.0.14`, `@vueuse/core` `^14.3.0` (peer `^14.0`), `@lucide/vue` `^1.16.0`
  (peer `^1.16.0`), vaul-vue `^0.4` (peer `^0.4`), tw-animate-css `^1.4.0`, value.js `^0.10.0`
  (matches glass-ui's own value.js pin `^0.10.0`), reka-ui 2.9.8 installed (peer `^2.0`). All green.
- **GlassDock ARIA contract honored** — root left presentational, no `aria-expanded` on root
  (CommandDock.vue:16-23 documents + complies); aria-live status region single + discrete (:186-194).

## Summary

muster consumes glass-ui `^3.1.0` (installed + locked at 3.1.0, pre-regression) across 40+ flat-subpath
import sites — exemplary wiring: all four binding CSS requirements present (styles.css:1-14), cascade-correct
`:root` token overrides with no dead locals, vueuse surfaces via subpath, only `Drawer*` from the root barrel
(documented). BLAST RADIUS: `CommandDock.vue:118` mounts `<GlassDock :start-collapsed :collapse-delay="2500">`
with `#collapsed` + default slots — exactly the simple two-layer collapse path AW.W1 names broken in 3.3.0.
muster is NOT broken today (locked at 3.1.0) but its `^3.1.0` range floats up to the regression on any fresh
install — it MUST skip 3.3.0 and consume the 3.4.0 fix. Motion imports (useSpring/useStagger/useAnimatedNumberMap/
startViewTransition/useYieldToMain) all resolve across 3.1.0→3.3.0; no motion-side break. Stack versions satisfy
every glass-ui peer (vue 3.5.34, tailwind 4.3, vite 8, vueuse 14.3, reka 2.9.8, value.js 0.10 aligned). The
staleness ledger (docs/tranches/I/*) is two minors behind — it still describes a "gated 3.0.0 adoption" that
already happened. AW.W1 fix benefits muster's daily-driver dock chrome for a one-line pin bump (USER-DOMAIN).

Digest path: /Users/mkbabb/Programming/glass-ui/docs/tranches/AW/audit/constellation/muster-consumption.md
