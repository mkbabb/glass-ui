# AP audit — lane BETA: deferral + legacy + dead-code inventory

Read-only sweep over glass-ui at HEAD (AO close, v3.0.0 staged) plus the AN/AO-window deferrals and the cross-repo constellation. Directive: fold chronic + fresh deferrals into AP; verify the AO "last alias deleted" claim; no quick solutions, no legacy code.

## Headline

**The AO "last legacy alias deletes" claim VERIFIES.** `useSpringOrchestrator` is gone from `src/`, `demo/`, and `scripts/`; the constellation-wide grep returns nothing. The adversarial sweep finds **zero `@deprecated`, zero back-compat export alias, zero TODO/FIXME/HACK/XXX, zero commented-out code block** in `src/`/`scripts/`/configs/`.github`. The codebase is alias-clean. (Item L1 below is the lone nuance: no live alias, but a residual ergonomics-vs-alias judgement call to record, disposition KEEP.)

**The real AP intake is two FRESH consumer deferrals AO never folded:** speedtest-AQ surfaced **R0G-6** (DockIconButton 44px coarse-pointer floor) and **R0G-7** (split the `motion` barrel's keyframes eager-pull) during AQ R2 implementation, AFTER AO's wave plan was set. AO's FINAL folded only R0G-1..5; the CONSUMER-REQUEST table lists 6 and 7 as confirmed (measured on the real edge/dist), but no AO wave landed them and they leave no trace in `src/`. **Both should fold into AP.**

**One chronic deferral newly NON-EXISTENT:** the dts-build 8 GB heap prefix (BETA's only chronic carry across AM→AO) was DROPPED at AO.W2 — the chronic survivor cleared. The chronic ledger is now empty.

**One watched condition now arguably CLEARS, two stay gated, one is ambiguous** (full state §C below).

---

## §A — Fresh deferrals (NOT folded by AO; → AP)

| # | Item | Source | State at HEAD | Disposition |
|---|---|---|---|---|
| F1 | **R0G-6 — DockIconButton coarse-pointer 44px floor** | `docs/tranches/AO/CONSUMER-REQUEST-speedtest-AQ.md:24` (surfaced AQ R2 impl) | `--size-icon-btn: 2.5rem` (=40px) at `src/styles/tokens.css:814`; `--dock-control-size` falls back to it (`dock.css:633-634`). **Measured 40×40 on the real edge** — below the 44px coarse-pointer a11y floor. No coarse-pointer media-query bump in `dock.css`. | **FOLD INTO AP.** A confirmed a11y/touch defect on an existing primitive (the AO ethos — elegance/correctness transposition). Add a `(pointer: coarse)` ≥44px floor on `.dock-icon-btn` / `--dock-control-size`; fine-pointer desktop unchanged. The CONSUMER-REQUEST notes this "disproves the prior 'dock already has a 44px floor' assumption" — it is not speculative. |
| F2 | **R0G-7 — split the `motion` barrel (keyframes eager-pull)** | `docs/tranches/AO/CONSUMER-REQUEST-speedtest-AQ.md:25` (surfaced AQ R2 impl) | Barrel UNSPLIT: `src/composables/motion/index.ts` `export *`-rolls all 14 leaves as one SCC (lines 6-18). Only `useNumericTransition` + `useAnimatedNumber`(+Map) import `@mkbabb/keyframes.js`, but `motion.ts:15-27` documents the bundler walks the whole sub-tree as one SCC, so a consumer importing a cheap util (`useRAFLoop`, `useStagger`) still eager-pulls the ~125 KB keyframes chunk. | **FOLD INTO AP (investigate shape first).** This is the keyframes analogue of the L.W1 vueuse SCC-trap closure. `motion.ts:15-27` ALREADY names this as a known asymmetry ("separating keyframes-touching from keyframes-adjacent here would be a fictitious distinction") — AP must decide: carve a `/motion-keyframes` (or lazy) sub-entry so the cheap utils ship keyframes-free, OR formally re-affirm the SCC framing and decline. The acceptance signal is sourcemap-verified: cheap-util import → keyframes OFF the eager graph. |

Both ride a minor/additive bump (no break); R0G-6 is additive CSS, R0G-7 is a bundle-shape carve. Neither invents unjustified substrate — both are transpositions/corrections of existing surface.

---

## §B — Chronic deferrals (≥2-tranche)

| # | Item | Prior class | State at HEAD | Disposition |
|---|---|---|---|---|
| C1 | **dts-build 8 GB heap prefix** | AO-BETA's ONLY chronic carry (chronic P.W4→AN; "carry as latent-debt awaiting upstream vite-plugin-dts incremental-rollup") | **CLEARED at AO.W2.** The prefix was dropped at all 6 sites; the toolchain moved off api-extractor to out-of-band `vue-tsc`; build peaks 769 MB / emit 698 MB RSS (the stray `build_time.txt`/`emit_time.txt` are the evidence captures). CLAUDE.md §Build resynced. | **NONE.** The chronic survivor is gone. **Note:** the live CLAUDE.md §Build prose pasted into THIS conversation's context still narrates the 8 GB/api-extractor/6.7 GB story — confirm the on-disk CLAUDE.md was resynced at AO (AO FINAL finding 3 claims it was); if the resync missed CLAUDE.md, that stale paragraph is an AP doc-hygiene fold. Verify on-disk before assuming clean. |

The chronic ledger is otherwise **empty** — no other item has survived ≥2 tranches unaddressed.

---

## §C — Watched conditions — current trigger state

The 4 AO-FINAL watched conditions, re-checked against the live constellation (`speedtest`, `muster`, `bbnf-buddy`, `words`, `fourier-analysis`, `bbnf-lang` all present on disk):

| # | Condition | Realisation trigger | Current state | Verdict |
|---|---|---|---|---|
| W1 | Interruptible MetricStack reorder recipe | ≥2 consumers declare a **mid-drag** (re-aim-while-pointer-down) reorder | `MetricStack` has **1 consumer total** (`speedtest/src/components/speedtest/ResultStack.vue`), and it is settle-style, NOT mid-drag (no draggable/reorder binding; comment references CSS-`order` reorder). bbnf-buddy's drag-capture (`useDragCapture.ts`, `pointOps.ts`) is editor-canvas point dragging, not MetricStack reorder. | **STAYS GATED** — 0 mid-drag MetricStack consumers. |
| W2 | Dock panel-host variant | ≥2 consumers declare a **tall-vertical-pane stacked-control** pattern | **NOW 1 realised consumer** — `bbnf-buddy/src/editor/components/dock/LeftToolsDock.vue` is a vertical GlassDock hosting Tools/History layers with a hard viewport max-height cap. Notably bbnf-buddy **removed** the `DockLayerGroup` grid chain ("its inner grid chain was the source of the vertical overflow fight") and hand-rolled a `v-if` swap + viewport-cap. This is the closest realised shape to the archived panel-host AND it surfaces a real ergonomics gap in the existing `DockLayerGroup` (vertical-overflow fight). No SECOND consumer (speedtest's `Dock.vue` is a slim horizontal control strip; no other repo uses `orientation="vertical"`). | **STILL GATED at 1** — but **AP-WATCH**: bbnf-buddy's removal-of-DockLayerGroup is a signal the existing multi-layer grid mishandles the tall-vertical-overflow case. If AP touches dock at all (it touches R0G-6), worth a look at whether the overflow-fight is a `DockLayerGroup` bug independent of the 2-consumer panel-host gate. |
| W3 | Inline-edit primitive convergence (bbnf-buddy `EditableNumber` + words `EditableField`) | the 2 divergent shapes CONVERGE on one shape | Shapes STILL DIVERGE — bbnf-buddy `EditableNumber.vue` is numeric `<input>` swap + `@mkbabb/value.js` `parseCSSValueUnit` + formatter-driven; words `EditableField.vue` is `contenteditable` span + `@dblclick` + `editMode`-gated + multiline + slot-driven. No third same-shape consumer. | **STAYS GATED** — no convergence; promoting either would be the overfit trap. |
| W4 | `LabeledSlider` numeric-readout | a **3rd** consumer wants the readout cell | Consumers of slider-with-readout: bbnf-buddy `EditableSlider.vue` (full `EditableNumber` cell) + fourier `ContourSettings.vue` / `SliderControl.vue` (plain numeric `<input>`) = **2 divergent-readout consumers**. The minimum shared shape is "show value next to slider," but the readout cells differ (value.js cell vs plain input). | **STAYS GATED** — at 2 divergent shapes, not the 3rd-converged consumer the trigger names; AND it remains the CSS-bound minor-additive EPSILON flagged. Could fold as a thin optional `:show-value`/readout-slot if AP wants a small additive win, but not gate-forced. |

**Net:** W1, W3 firmly gated (no movement). W4 at 2-divergent (unchanged from AO). **W2 is the one to watch** — 1 realised tall-vertical consumer (bbnf-buddy) now exists where AO recorded 0, AND it exposes a latent `DockLayerGroup` vertical-overflow ergonomics gap; the 2-consumer panel-host gate stays unmet, but the existing-primitive bug it surfaced is independently AP-eligible.

---

## §D — Legacy / dead-code / alias sweep (inv 47 / L inv 4 / no-legacy memory)

Adversarial grep over `src/`, `scripts/`, root configs, `.github/` for `@deprecated`, back-compat, legacy, shim, TODO/FIXME/HACK/XXX, rename-prose, export aliases, commented-out code, vN.x migration comments.

| # | Hit | Location | Class | Disposition |
|---|---|---|---|---|
| L1 | `restart`/`clear` "Alias for start()/stop()" JSDoc | `src/composables/reactive/useTimer.ts:19,23`; `useInterval.ts:19,23` | Method ergonomics, NOT a back-compat alias | **KEEP.** `restart`/`clear` are distinct ergonomic method names (clear() reads as clearTimeout-replacement) on a live API, not version aliases. The word "Alias" is descriptive of intra-API convenience, not a deprecation shim. No action. |
| L2 | `useSpringOrchestrator` | — (file deleted) | DELETED at AO.W2 | **VERIFIED GONE.** No file, no `export *`, no comment ref, no constellation consumer. The "last alias deleted" claim holds. |
| L3 | `back-compat` prose mentions | `src/motion.ts:40`; `src/styles/tokens.css:302`; `src/styles/utilities.css:402`; `src/styles/index.css:17` | Descriptive prose — each says "no back-compat alias retained" OR describes single-slot rendering robustness | **KEEP.** All four are NEGATIVE assertions ("no back-compat shim retained" — `motion.ts`, `tokens.css`) or non-version robustness notes (`utilities.css:402` single-slot sibling rendering; `index.css:17` SFC-only entry, NOT a back-compat entry). No live legacy code. |
| L4 | `legacy` prose mentions | `src/keyboard.ts:6`, `src/dark.ts:7` (retired-nested-form, no alias); `src/composables/motion/useRAFLoop.ts:53,221` (`LegacyMediaQueryList` — Safari `addListener` type); `src/composables/dom/useClipboard.ts:6`, `useBreakpoint.ts:58` (legacy-DOM-API degrade); `src/styles/glass.css:14`, `tokens.css:530` | Descriptive / platform-API-degrade / no-alias assertions | **KEEP.** `LegacyMediaQueryList` is a real Safari-`addListener` fallback type (universal-rendering canon, not version legacy); the rest are "no legacy alias" assertions or legacy-browser-API degrades. No residue. |
| L5 | `shim` mentions | `scripts/profile-bundle.mjs:218,220,381` (sub-1KiB subpath "shim entries" = tiny re-export chunks); `scripts/verify-export-types.mjs:69` (rejects `typesVersions` catchall `*` shim); all `shimmer`/`shimmer-sweep` in `styles/` + Skeleton | Animation keyword + bundle-vocab + a GUARD against shims | **KEEP.** Zero deprecation shims. `verify-export-types.mjs:69` actively FORBIDS a catchall shim — a guard, not a shim. The rest is the shimmer animation family + "shim entry" = tiny-chunk bundle vocabulary. |
| L6 | Clean renames, no alias | `installDarkModeSync.ts:13` (ex-`useDarkModeSync`, O.W4); `ChassisDivider.vue:21` (ex-`RegionDivider`, AI.W1-γ); `glyph-face/keys.ts:16` (P inv 5) | Descriptive rename JSDoc; NO alias retained (grep confirms 0 residual `useDarkModeSync`/`RegionDivider` exports) | **KEEP.** These PROVE the codebase honours L inv 4 — renamed clean, no shim. Descriptive provenance only. |
| L7 | `@deprecated` | — | **ZERO hits** across `src/`/`scripts/`/configs/`.github` | clean |
| L8 | TODO/FIXME/HACK/XXX | — | **ZERO hits** in `src/`/`scripts/` | clean |
| L9 | Commented-out code blocks | — | **ZERO** (`^\s*//` followed by code-ish all resolve to prose comments, not disabled code) | clean |
| L10 | Genuine `export { X as Y }` symbol alias | — | **ZERO** (only `export { default as ... }` barrel re-exports, which are canonical) | clean |

**No legacy/alias hit contradicts the AO "last alias deleted" claim.** The sweep is adversarial and the verdict is clean — the one judgement call (L1) is ergonomics, not an alias.

---

## §E — Deferred-implementation markers across tranche docs + CLAUDE.md

Terminal / already-dispositioned items (NO AP work unless their gate flips):

| # | Item | Location | State |
|---|---|---|---|
| E1 | vaul-vue open-sheet re-snap limitation | `CLAUDE.md` §Drawer; `docs/tranches/AN/audit/W3-drawer-detents.md §A.limitation`; muster H OMEGA confirms TERMINAL-DOCUMENTED, no forced glass-ui follow-on | **TERMINAL** — upstream vaul-vue; no glass-ui workaround authored (correct). Retires on upstream fix OR a ≥2-consumer live-resnap demand. No AP work. |
| E2 | `@source` Option-B template-utility contract | `CLAUDE.md` Consumer-wiring; `docs/tranches/AN/audit/W2-tailwind-utilities.md` | **TERMINAL CANON** — Option A (pre-gen utilities into dist) rejected on payload/fragility; `@source` is the idiomatic Tailwind-v4 answer. No AP work. |
| E3 | InstrumentChassis `"scoring"` phase | `CLAUDE.md` §InstrumentChassis; `docs/tranches/AN/audit/W6` | **TERMINAL** — `"ping"` is canonical generic-active; a `"scoring"` member with no consumer = overfit. No AP work. |
| E4 | muster H DEFERRED items | `muster/docs/tranches/H/audit/OMEGA-cross-repo.md:209-210` | AN ARCHIVED items = TERMINAL-DOCUMENTED (glass-ui's gate, not muster's); `@mkbabb/pencil-boil "latest"` float = fourier-side minor hygiene, NOT glass-ui-bound. **No glass-ui-bound item in muster H.** |

muster H surfaces **no new glass-ui primitive gap** — its keystone composes shipped 3.0.0-staged primitives or is muster-bespoke.

---

## §F — Stray artefacts (repo root)

All untracked; **none gitignored** (`.gitignore` only carries `*.png`). All are **AO/audit byproducts, NOT deliverables** — they should be cleaned (or gitignored) in AP:

| File | Origin | Disposition |
|---|---|---|
| `build_time.txt`, `emit_time.txt` | `/usr/bin/time` RSS captures from the AO heap-prefix investigation (build 769 MB / emit 698 MB — the "<740 MB" evidence behind PATH-FORWARD finding 3 / the 8 GB-prefix drop) | **CLEAN UP** — investigation scratch; their finding is already recorded in AO docs. |
| `ao-gamma-demo.jpeg` | AO GAMMA empirical-state visual-canon screenshot | **CLEAN UP** — audit scratch. |
| `muster-pass1-fixed.jpeg`, `muster-pass2.jpeg`, `muster-pass2-dark.jpeg`, `muster-pass2-mobile.jpeg`, `muster-pass3-dark.jpeg`, `muster-pass3-dark-full.jpeg`, `muster-final-light.jpeg` (7) | muster cross-repo visual π-probe screenshots | **CLEAN UP** — cross-repo audit scratch; belong (if anywhere) in muster, not glass-ui root. |

AP should either `git rm`-equivalent-clean these (they're untracked, so just delete) or extend `.gitignore` (`*.jpeg`, `*.txt`, or a `*_time.txt` + screenshot pattern) so audit scratch never collects at root. Recommend **delete + gitignore pattern** so the root stays pristine (the AO close ethos: "leave the library pristine").

Also dirty: `docs/precepts` submodule (the user-domain reconcile AO FINAL §Cross-repo perimeter item 4 named) + 6 modified tranche-audit JSONs (`F/`, `K/` — pre-existing, likely build-proof re-emissions; not AP-bound).

---

## §G — Counts per category

- **Fresh deferrals (→ AP):** **2** (F1 DockIconButton 44px floor; F2 motion-barrel keyframes split) — both confirmed consumer-driven, neither folded by AO.
- **Chronic deferrals:** **0 live** (C1 the only-ever chronic — 8 GB heap prefix — CLEARED at AO.W2; ledger now empty).
- **Watched conditions:** **4** — W1/W3 firmly gated, W4 at 2-divergent (unchanged), **W2 the one to watch** (1 realised tall-vertical consumer now exists + a latent `DockLayerGroup` overflow-ergonomics gap, though the 2-consumer panel-host gate stays unmet).
- **Legacy / dead-code hits:** **0 actionable** — zero `@deprecated`, zero alias, zero TODO/FIXME/HACK/XXX, zero commented-out code; 10 grep classes all resolve to descriptive prose / ergonomics / platform-degrade / guards. **The AO "last alias deleted" claim VERIFIES.**
- **Terminal/dispositioned (no AP work):** **4** (E1 vaul-vue · E2 `@source` · E3 `"scoring"` phase · E4 muster H items).
- **Stray artefacts (clean up):** **10** (8 jpegs + 2 .txt) — AO/audit scratch at root, none gitignored.

## §H — AP fold recommendation

Fold into AP: **F1** (DockIconButton 44px coarse floor — confirmed a11y defect), **F2** (motion-barrel keyframes SCC carve — investigate shape, the asymmetry is already self-documented at `motion.ts:15-27`), and the **stray-artefact cleanup** (delete + `.gitignore` pattern). Carry forward as watched: **W2** (panel-host + the `DockLayerGroup` vertical-overflow ergonomics gap bbnf-buddy hit), **W4** (LabeledSlider readout, optional minor-additive). Verify on-disk **CLAUDE.md §Build** was resynced at AO (if not, doc-hygiene fold). No legacy purge needed — the codebase is alias-clean.
