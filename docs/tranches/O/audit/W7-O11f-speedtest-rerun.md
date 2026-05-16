# O11/f—speedtest consumer re-audit (W7 close ceremony rerun)

**Agent**: O.W7 O11/f consumer re-audit lane (round-3 / W7 close)
**Target**: `/Users/mkbabb/Programming/speedtest` (READ-ONLY)
**Glass-ui reference**: master HEAD @ `25e1b5a` (O.W6 close; v1.4.0)
**Speedtest tip**: master `695b1f43` (ahead 6 of origin/master `b7173fb7`; AC.r3 audit cohort + r3-r-2 hardening + r3-r-3 user-decisions ratified—docs-only)
**Audit date**: 2026-05-14
**Baseline**: `docs/tranches/O/audit/O11-Lane-f-speedtest.md` (O-open round-2; CLEAN at consumer-import surface)
**Cap**: 20 min

---

## TL;DR

**CLEAN.** All 6 dispatch findings verify at HEAD with no regression from the O-open baseline. Glass-ui v1.4.0 has shipped the AC.W6 cohort substrate; speedtest has NOT yet adopted (adoption opportunity, not regression). Aurora throw-default is tolerated (no `onInitError` wired at the single consumer site—speedtest's chosen disposition per O.W1 Lane A cross-repo audit §"Disposition 1—Accept the throw"). `useDarkModeSync → installDarkModeSync` rename touches 3 references across 2 files; consumer migration deferred to AC tranche per the W4 Lane B proof's coordination note.

---

## § Per-finding disposition

### Finding 1—A5 wire intact

**VERIFIED INTACT.**

```
vite.config.ts:9   import { assertDistFresh } from "@mkbabb/glass-ui/freshness";
vite.config.ts:14  assertDistFresh({ root: path.resolve(__dirname, "..", "glass-ui") });
```

The N.W0 Lane A5 wire (commit `b7173fb7` on origin/master) persists at HEAD `695b1f43`. The 6 ahead-of-origin commits are all docs-only (`docs(AC/r3*)` series—audit cohorts, hardening synthesis, plan amendments, user-decisions ratification). Zero src/ or vite-config mutation since the N.W0 wire landed.

**Verdict**: A5 wire CLEAN. No regression.

---

### Finding 2—AC.W6 cohort handoff (6 glass-ui-side deliverables)

**LANDED in glass-ui at HEAD; speedtest can now adopt.** Verified each deliverable against glass-ui's source tree:

| AC.W6 dep | Glass-ui state | Speedtest state |
|---|---|---|
| Fira Code self-host | FLAGGED—`src/fonts/` only contains README.md; woff2 binaries pending orchestrator network-fetch | Still consumes Google Fonts via `styles/style.css:63` (`--font-mono: "Fira Code", monospace`)—awaits binary ship to migrate |
| `.text-hero` @utility | LANDED—`src/styles/typography.css:108-112` (composes `--type-display-audacious` cap with `--text-hero-size/-leading/-tracking` consumer knobs) | NOT YET ADOPTED—consumer still owns `.text-hero` declaration at `styles/tokens.css:253-276` (~25 LOC) + 35-line defending comment; speedtest-specific `[data-idle]` / `[data-just-lifted]` cascade at lines 348-376 stays per AC-r3 acceptance |
| WCAG `--chart-{phase}-label` companions | LANDED—`src/styles/tokens.css:543-546` (light L≈0.40) + `:914-917` (dark L≈0.85)—ping/download/upload/jitter all shipped | NOT YET ADOPTED—speedtest label sites continue reading `var(--chart-{phase})` (canvas hue); awaits AC.W6c.T2 consumer-side migration |
| `--meter-track-stroke` dark fix | LANDED—`src/styles/tokens.css:557` (light: `var(--foreground)`) + `:922` (dark: `var(--foreground)`)—bg-on-bg dark-mode invisibility fixed | DUPLICATED consumer-side at `styles/tokens.css:86 + :381`; retire-on-adopt opportunity (one-line removal each side) |
| IconTooltip 44×44 hit-area | LANDED—`src/styles/tokens.css:692` (`--icon-tooltip-hit-area: 44px`) + IconTooltip.vue slot wraps with `.icon-tooltip-trigger` enforcing min-width/min-height | TRANSPARENT INHERITANCE—speedtest's 8 IconTooltip sites (Dock.vue x7 + AddressAutocomplete.vue x1) inherit the WCAG floor automatically; no consumer-side change required |
| Dock touch-target media query | LANDED—`src/styles/dock.css:943-944` (`@media (pointer: coarse) { --dock-control-size: var(--dock-touch-target, 2.75rem) }` + `--size-icon-btn` companion) | TRANSPARENT INHERITANCE—speedtest's `<GlassDock>` at `Dock.vue` inherits the lift on coarse-pointer devices; no consumer-side change required |

**Cohort consumability**: 5 of 6 deliverables consumable today (4 transparent + 1 requires consumer-side adoption work for `.text-hero` / chart-label / `--meter-track-stroke` retire). 1 deliverable (Fira Code self-host) consumable shape-only; awaits woff2 ship before speedtest can flip the `@import` at `styles/style.css:63`.

**Verdict**: Handoff complete for 5/6; 1 flagged for orchestrator network-fetch (documented as the W6 Lane D open question Q1, persists at W7 close).

---

### Finding 3—Aurora init fail-explicit (W1 Lane A consumer-side state)

**Verified: throw-default TOLERATED.** Speedtest's single Aurora consumer at `src/App.vue:5-9` does NOT wire `onInitError`:

```vue
<Aurora
    ref="auroraRef"
    class="pointer-events-none fixed inset-0 z-behind h-full w-full"
    :config="auroraConfig"
/>
```

Per O.W1 Lane A proof §"Cross-repo audit (speedtest)" §"Disposition for speedtest", the consumer has three forward paths:

1. **Accept the throw** (current state—no consumer code change).
2. **Opt back into silent-warn** (`<Aurora :on-init-error="(err) => console.warn('[Aurora]', err)" ...>`).
3. **Custom report** (wire to telemetry surface—speedtest's `useAuroraPolicy` composable is the natural seam).

Speedtest at HEAD has chosen path 1 by inaction. The disposition is acceptable per the Lane A proof (invariant 24—library-internal contract violations throw to the consumer's error handler; the consumer is free to bubble or wrap as it sees fit). Speedtest's Aurora consumer composition is:

- Mount: `App.vue:5` (`<Aurora>` with `auroraConfig` from `useSpeedtestAuroraConfig()`).
- Config: `src/config/auroraConfig.ts` exports `SPEEDTEST_AURORA_CONFIG` + `useSpeedtestAuroraConfig()` (light/dark forks via `useGlobalDark`).
- Policy composable: `src/composables/useAuroraPolicy.ts` wraps reduced-motion + intersection-pause.

`useAurora` is NOT called directly by speedtest (only the `<Aurora>` SFC is consumed—confirms the round-2 baseline tally).

**Verdict**: Aurora init fail-explicit CLEAN at consumer side. Throw-default acceptable; opt-in silent path available if speedtest later chooses to wire telemetry.

---

### Finding 4—`useDarkModeSync → installDarkModeSync` rename

**3 references across 2 files** (matches W4 Lane B cross-repo audit citation 1:1):

```
src/components/speedtest/MeterColumn.vue:61          useDarkModeSync,   (import-list entry)
src/components/speedtest/MeterColumn.vue:110         useDarkModeSync(() => { ... });   (call-site)
src/components/dashboard/composables/useEChartsTheme.ts:3    import { useDarkModeSync } from "@mkbabb/glass-ui";
src/components/dashboard/composables/useEChartsTheme.ts:68   useDarkModeSync(() => { ... });
```

(The 4th match—`MeterColumn.vue:106`—is a comment reference, not a runtime call site.)

Glass-ui has shipped the rename at O.W4 (commit `ea71fe9`—v1.3.0). The export remains reachable from `@mkbabb/glass-ui` root barrel (per W4 Lane B proof §"Verification"—`installDarkModeSync` lives at `composables/motion/installDarkModeSync.ts` and exits the root barrel through `composables/motion/index.ts`).

**Migration path** (mechanical, three replacements):

```diff
 // src/components/speedtest/MeterColumn.vue
-import { useDarkModeSync, ... } from "@mkbabb/glass-ui";
+import { installDarkModeSync, ... } from "@mkbabb/glass-ui";
-useDarkModeSync(() => { ... });
+installDarkModeSync(() => { ... });

 // src/components/dashboard/composables/useEChartsTheme.ts
-import { useDarkModeSync } from "@mkbabb/glass-ui";
+import { installDarkModeSync } from "@mkbabb/glass-ui";
-useDarkModeSync(() => { ... });
+installDarkModeSync(() => { ... });
```

No behaviour change; semver-visible per W4 Lane B `MIGRATION.md` v1.3.0 entry. Speedtest can defer until AC.W6 (which is already coordinated with glass-ui v1.2.0+; v1.3.0 supersedes that anchor) or AC.W8 (consumer-side patina sweep—per `docs/tranches/AC/AC.md` revision-3-r-2 W8 plan).

**Verdict**: Rename CLEAN at library side; consumer-side adoption pending—properly deferred per W4 Lane B's "Speedtest consumer coordination" open question (orchestrator owns the v1.3.0 cohort PR; speedtest user owns the actual adoption commit).

---

### Finding 5—Dock-DI BINARY-TRANSPARENT confirmation

**VERIFIED BINARY-TRANSPARENT** (W6 close verdict holds at W7).

```bash
$ rg -n 'glassDockContext|glassDockId|dockKeepOpen|dockRelease|dockHeld|dockExpanded|dockLayerGroup' src/ vite.config.ts
# (zero matches)
$ rg -n 'useDockContext|useOptionalDockContext|provideDockContext' src/
# (zero matches)
```

Speedtest reaches into NONE of the 7 dock inject keys / context helpers. The dock-cohort touchpoint is the public component API only:

```ts
// src/components/dock/Dock.vue
import {
    GlassDock,
    DockIconButton,
    DockTabButton,
    DockLayerGroup,
    DockLayer,
} from "@mkbabb/glass-ui/dock";
import { IconTooltip } from "@mkbabb/glass-ui/icon-tooltip";
```

The 5 in-library consumer migrations (Slider, HoverPopover, PopoverContent, SelectContent, DropdownMenuContent) per O.W2 Lane A proof are entirely library-internal. Speedtest's `<GlassDock>` composition at `Dock.vue:181+` uses `:always-expanded="true"` (constant expanded—no `dockExpanded` reactive signal dependency). No `<HoverPopover>` consumers in speedtest src/.

**Verdict**: Dock-DI consolidation BINARY-TRANSPARENT to speedtest. Confirms the W6 close verdict at W7 close. Zero consumer migration cost.

---

### Finding 6—AB.W3 substrate consumption pattern preserved

**VERIFIED PRESERVED.** All 5 surfaces from the O-open round-2 β-audit citation remain:

**Pulse aura/dots** (5 sites across 3 files):

```
src/components/speedtest/ResultStack.vue:69         import { Pulse } from "@mkbabb/glass-ui/pulse";
src/components/speedtest/ResultStack.vue (template)  <Pulse variant="aura" ...>
src/components/speedtest/PhaseTimeline.vue:62       import { Pulse } from "@mkbabb/glass-ui/pulse";
src/components/speedtest/PhaseTimeline.vue (template) <Pulse variant="aura" ...>
src/components/speedtest/SpeedtestResults.vue:47    <Pulse :count="3" variant="dots" />
src/components/speedtest/SpeedtestResults.vue:164   import { Pulse } from "@mkbabb/glass-ui/pulse";
src/components/speedtest/SpeedtestResults.vue (templates) 2 × <Pulse variant="aura" ...>
```

**Progress gradient** (1 site):

```
src/components/speedtest/MeterColumn.vue            <Progress variant="gradient" ... />
```

The CSS-side gate (`.pulse-aura` visibility—`once` prop iteration) at SpeedtestResults.vue still drives the AB.W3 contract correctly—substrate is CSS-gated, not orchestrator-fired.

**Verdict**: AB.W3 substrate consumption pattern PRESERVED 1:1. No drift since round-2 baseline.

---

## § Substrate non-regression

| Substrate | Round-2 (O-open) state | W7 (HEAD) state | Drift |
|---|---|---|---|
| A5 freshness wire | `vite.config.ts:2,~14` | `vite.config.ts:9,14` | None (same shape) |
| 17 glass-ui subpaths | 17 distinct | **19 distinct** (added `/glyph-face` + `/instrument-chassis` via test mocks; both removed from active src/ per `AppSettingsButton.vue` comment retiring `<GlyphFace>`) | Test mocks reference subpaths whose runtime consumers have been retired—clean-up opportunity at AC.W8 |
| Dock cohort consumers | 6 (5 in-library + speedtest-only externally) | 6 (unchanged) | None |
| AB.W3 Pulse aura/dots | 5 sites / 3 files | 5 sites / 3 files | None |
| AB.W3 Progress gradient | 1 site / `MeterColumn.vue` | 1 site / `MeterColumn.vue` | None |
| Aurora consumer | `App.vue:5` (no `onInitError`) | `App.vue:5` (no `onInitError`) | None—throw-default tolerated |
| useDarkModeSync references | 3 across 2 files (per W4 Lane B audit) | 3 across 2 files (unchanged) | None—library renamed, consumer not yet migrated (deferred) |

**Speedtest git posture**: master ahead 6 of origin (was 4 at O-open round-2). All 6 ahead-of-origin commits are docs-only (`docs(AC/r3*)`). No src/ mutation since the N.W0 A5 wire. No orchestrator git action required.

**Verdict**: ZERO substrate regression across all 6 dispatch findings + 7 audit dimensions.

---

## § Adoption opportunities (AC.W6 cohort + W4 Lane B rename)

Glass-ui v1.4.0 at HEAD ships the substrate AC.W6 needs. Speedtest can now adopt; the W6 Lane D proof §"Cross-repo adoption" enumerates per-deliverable handoff steps. Aggregated below:

### Tier-1 (transparent—no consumer code change)

1. **IconTooltip 44px hit-area**—speedtest's 8 IconTooltip consumers (Dock.vue x7 + AddressAutocomplete.vue x1) inherit the WCAG 2.5.5 floor automatically. F2.I-04 (AC.W6d.T2) closes by upgrade alone.
2. **Dock touch-target media query**—speedtest's `<GlassDock>` consumer at `Dock.vue:166-185` inherits the `--dock-control-size: 2.75rem` lift on coarse-pointer devices. F2.AA-03 closes by upgrade alone.

### Tier-2 (mechanical retire—adoption-friendly)

3. **Retire consumer-side `--meter-track-stroke`**—drop `styles/tokens.css:86` (`:root`) + `:381` (`.dark`). Glass-ui canonical now ships both values correctly (dark-mode bg-on-bg invisibility fixed). 2-LOC reduction.
4. **Retire consumer-side `.text-hero` class**—drop `styles/tokens.css:253-276` (~25 LOC) + the 35-line defending comment block. Use glass-ui `@utility text-hero` with `--text-hero-size` consumer knob for the container-query-driven clamp (per W6 Lane D §"Cross-repo adoption" example). Speedtest-specific `[data-idle]` / `[data-just-lifted]` cascade rules at lines 348-376 STAY (AC-r3 acceptance: speedtest-specific register, not substrate dup). Estimated -60 LOC consumer-side.
5. **Migrate label sites to `--chart-{phase}-label`**—`MeterColumn.vue` label text + sibling consumers reading `var(--chart-{phase})` for color → switch to `var(--chart-{phase}-label)`. Canvas-side strokes continue reading `--chart-{phase}` (canvas hue preserved per F1.V-04 spec). Closes WCAG body-contrast gap (was 2.69:1 for upload, 3.78:1 for ping).

### Tier-3 (gated—awaits orchestrator action)

6. **Fira Code self-host migration**—flip `styles/style.css:63` from Google Fonts `@import` to local `@font-face` per W6 Lane D §"Cross-repo adoption" recipe. **GATED on Fira Code woff2 ship**—orchestrator network-fetch step at glass-ui's `src/fonts/` (deferred at W6 Lane D, persists at W7).

### Tier-4 (rename adoption—deferred)

7. **`useDarkModeSync → installDarkModeSync` rename**—2 files, 3 references (MeterColumn.vue + useEChartsTheme.ts). Mechanical sed-replace. Defer to AC.W6 or AC.W8 patina sweep per W4 Lane B's coordination note.

**Total estimated speedtest LOC absorption at AC.W6 adoption close**: ~70 LOC net reduction (tier-2 retires) + 5 consumer-side migrations (tier-2 label sites + tier-4 rename). Tier-3 is gated externally.

---

## § Risks and unknowns

- **R1—Fira Code woff2 binaries still not shipped at glass-ui HEAD.** `src/fonts/README.md` is the only artefact in the directory; orchestrator network-fetch step from W6 Lane D Q1 has not run. This is the single open external dependency for full AC.W6 cohort consumability. Carry-forward to P or W6 Lane D follow-up.
- **R2—`<InstrumentChassis>` / `<GlyphFace>` test mocks now reference retired runtime consumers.** Per `AppSettingsButton.vue:7,28` comments, both substrates were retired from active speedtest src/ (no runtime `<GlyphFace>` / `<InstrumentChassis>` template usage). Test mocks at `src/__tests__/App.surveyEntry.test.ts:76,84` still reference the subpaths. Non-regression for O—these are consumer-side test fixture cleanup candidates for AC.W8.
- **R3—Speedtest local-only AC.r3 plan amendments** (6 commits ahead of origin/master) document the AC.W6 dependency on glass-ui v1.2.0. Now that glass-ui has shipped v1.4.0 (O.W6 close), the AC.W6 anchor supersedes—orchestrator should signal to speedtest user that the underlying substrate is now LIVE at v1.4.0, not v1.2.0 as the AC.r3 plan documents. Coordination-tier note; not a glass-ui-side action.
- **R4—`useAuroraPolicy` canonicalisation candidacy** (single-consumer at speedtest)—unchanged from round-2 baseline. Defer until a second Aurora consumer materialises.

---

## § Verdict

**CLEAN.**

All 6 dispatch findings verify at HEAD with zero regression from the O-open round-2 baseline. The W7 close ceremony returns CLEAN for speedtest as a glass-ui consumer:

- A5 wire INTACT.
- AC.W6 cohort handoff COMPLETE (5/6 deliverables consumable at glass-ui v1.4.0 HEAD; 1 flagged externally for Fira Code woff2 fetch).
- Aurora init fail-explicit TOLERATED (no `onInitError` wired; throw-default acceptable per W1 Lane A proof's path 1).
- `useDarkModeSync → installDarkModeSync` consumer migration PENDING but properly deferred to AC.W6/W8.
- Dock-DI BINARY-TRANSPARENT confirmed (zero inject keys reached; W6 close verdict holds).
- AB.W3 substrate consumption pattern PRESERVED 1:1.

**No BLOCKER. No MINOR.** Adoption opportunities documented as carry-forward to AC tranche (consumer-owned), not as O tranche outstanding work.

---

## § Verification (commands run)

```bash
# A5 wire
grep -n "assertDistFresh\|glass-ui/freshness" vite.config.ts

# useDarkModeSync references
grep -rn "useDarkModeSync\|installDarkModeSync" src/

# Aurora consumer + onInitError sweep
grep -n "Aurora\|onInitError\|auroraRef" src/App.vue

# Dock-DI inject keys sweep
grep -rn "glassDockContext|glassDockId|dockKeepOpen|dockRelease|dockHeld|dockExpanded|dockLayerGroup|useDockContext|useOptionalDockContext" src/

# Subpath enumeration
grep -rn "@mkbabb/glass-ui" src/ vite.config.ts | awk -F'"' '{print $2}' | sort -u

# AB.W3 substrate consumption
grep -rn "variant=\"aura\"\|variant=\"dots\"\|variant=\"gradient\"\|<Progress " src/

# AC.W6 cohort tokens consumer-side
grep -rn "text-hero\|--text-hero\|--meter-track-stroke\|--chart-.*-label\|--icon-tooltip-hit-area\|--dock-touch-target" styles/ src/

# Dock composition consumer
grep -n "from \"@mkbabb/glass-ui" src/components/dock/Dock.vue

# Glass-ui side AC.W6 cohort verification
grep -n "text-hero\|--chart-.*-label\|--meter-track-stroke\|--icon-tooltip-hit-area\|--dock-touch-target" \
    /Users/mkbabb/Programming/glass-ui/src/styles/{typography,tokens,dock}.css
```

Files spot-verified: `vite.config.ts`, `src/App.vue`, `src/components/dock/Dock.vue`, `src/components/speedtest/{MeterColumn,PhaseTimeline,ResultStack,SpeedtestResults}.vue`, `src/components/dashboard/composables/useEChartsTheme.ts`, `src/config/auroraConfig.ts`, `src/composables/useAuroraPolicy.ts`, `styles/tokens.css`, `styles/style.css`, `docs/tranches/AC/PROGRESS.md`. Glass-ui-side: `package.json` (v1.4.0), `src/fonts/` (README only), `src/styles/{typography,tokens,dock}.css`.

**No git mutation performed** (read-only per hardened agent git clause).

---

**Audit completed by**: O.W7 O11/f consumer re-audit lane (READ-ONLY, 20-min cap)
**Method**: 6-finding dispatch verification + cohort handoff cross-walk + substrate non-regression sweep + adoption opportunity enumeration
**Verdict**: CLEAN
