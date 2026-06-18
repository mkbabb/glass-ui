# BC CLEANUP-PLAN — the 8-agent assay findings (conservative + isomorphic-flagged)

> Read-only assay (we4oos254). 81 findings across 8 areas. The src/ tree is CLEAN of god-modules (BB carves held the 500 bound); the targets are demo/ SFCs + styling/composable hygiene. NOTHING here executes until the user approves. Each finding flags isomorphic (pure move/byte-identical) vs not (paint/behaviour change → extra care).

## Verdict tally

- **PRUNE**: 2
- **SPLIT**: 1
- **DEDUPE**: 1
- **COLOCATE**: 1
- **RENAME**: 1
- **STYLE-FIX**: 2
- **HOLD**: 7
- **KEEP-AS-IS**: 55
- **REFACTOR**: 5
- **KEEP-AS-IS (false-positive)**: 6

---

## PRUNE (2)

### [A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)] src/components/ui/focus-scope/FocusScope.vue, src/components/ui/focus-scope/index.ts, src/subpaths/focus-scope.ts, src/components/ui/index.ts (FocusScope re-export), package.json (./focus-scope export + typesVersions)
- **what:** src/components/ui/focus-scope/FocusScope.vue (37 lines) is a VERBATIM pass-through over reka-ui's FocusScope (defineProps<FocusScopeProps> + useForwardPropsEmits + <slot/>) that 'Adds NO style/class register' (its own docstring, line 23). Published as the /focus-scope subpath (package.json + src/subpaths/focus-scope.ts) AND re-exported by ui/index.ts, but grep across demo/ + src/ + tests/ finds ZERO consumers, ZERO story (not in demo/stories/manifest.ts), ZERO test, ZERO docs/consumer-evidence/focus-scope.md. CLAUDE.md frames it as 'the substrate-single focus-trap host (BB.W-CONTROL-TOKENS)' paired with Toaster's aria-live, but Toaster does not import it (grep src/components/ui/toast/ for FocusScope → empty). This is exactly the 'thin re-export wrapper adding no value' the assay brief flags + a substrate-without-consumer (J-inv-10 / L-inv-8).
- **do:** RETIRE the /focus-scope package (clean break, no alias per MEMORY no-backwards-compat): delete the focus-scope dir + subpath barrel, remove the ./focus-scope export + typesVersions entry, drop the ui/index.ts re-export, re-baseline proof:subpath-enumeration. A consumer needing a focus trap imports reka's FocusScope directly (the wrapper adds nothing reka doesn't ship). ALTERNATIVELY (if the team wants to keep the published a11y primitive intentionally) BOOK it with a docs/consumer-evidence/focus-scope.md + wire it as the real Toaster focus-trap host so the BB.W-CONTROL-TOKENS 'a11y pair' claim becomes true — but at HEAD the claim is unrealized and nothing consumes it.
- isomorphic: true · effort S · risk LOW

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/styles/glass-refract.css:86, src/styles/tokens/sizing.css:155-156,498, src/styles/tokens/scale-paper.css:247, src/styles/tokens/glass-fx.css:264
- **what:** A residual cluster of genuinely-orphaned tokens with zero var()/shorthand/JS/keyframe readers and (unlike --corner-k-* / --glass-spine-*) no recorded pin-rationale: --glass-refract-bevel:14% (glass-refract.css:86 — the bevel-band % is baked as a literal '14%' inside the data-URI gradient, not read from this token; the header says the sibling swell knob 'is retired'), --select-font:inherit (sizing.css:498), --dock-margin:0.5rem + --dock-menubar-reserve:4rem (sizing.css:155-156), --timeline-scrubber-height:0.5rem (scale-paper.css:247), and the bare alias --glass-shadow=var(--glass-shadow-quiet) (glass-fx.css:264 — the -quiet/-resting/-floating/-wash/-overlay rungs are consumed directly, the bare base is not).
- **do:** PRUNE these as the W-DEAD-SWEEP tail — clean delete (no-backwards-compat house rule). BUT gate-pin-check first: the codebase deliberately pins some zero-reader tokens via proof:* TOKEN-EXISTS clauses (--corner-k-soft/-sharp pinned by proof:squircle-language; --glass-spine-opacity/-blur pinned by InstrumentChassis.spine-variant.test.ts — both recorded in-file). Run the existing dead-token sweep + grep each token in scripts/proof-*.mjs before deletion; delete only the ones with NO gate pin AND NO consumer-seam comment. Conservative: do this as a small batch, re-baseline profile:budget. NOTE --timeline-segment-gradient-* and --phase-color-label are NOT in this set — they are explicit consumer-seam tokens (speedtest wires them cross-repo, recorded in scale-paper.css:305 / instrument-chassis.css:63), KEEP those.
- isomorphic: true · effort S · risk LOW


## SPLIT (1)

### [A1-god-modules] demo/layout/AppShell.vue:70-180 (+ matching template/style)
- **what:** demo/layout/AppShell.vue (686 lines) mixes TWO concerns: the route-shell (nav/help/palette/konami/route-scroller, ~L42-244 minus morph) AND a self-contained in-situ dock-orientation-morph STAGE feature (script L70-180: morphStageOpen/morphStageEl/morphEntries/V_FULL_H/H_FULL_W/useDockOrientationMorph/vtOrientation/liquidPreview/morphFacing/morphGooFilter/toggleShellMorph/openMorphStage/closeMorphStage/onToggleMorphStage + its template + a slice of the 104-line scoped style). The morph stage is the BA.W-DOCK-MORPH-INSITU demonstration — a discrete named feature with its own driver/refs/computed-filter/overlay markup glued in beside the shell.
- **do:** Extract the morph stage into demo/layout/DockMorphStage.vue (a demo-private feature SFC) owning useDockOrientationMorph + the morphEntries/vtOrientation/liquidPreview/morphGooFilter state + the stage overlay template + its scoped style; AppShell drives it via the existing glass-ui-demo:toggle-dock-morph window event it already listens for (onToggleMorphStage), so the seam is the event, not a prop tangle. Colocation idiom applied to a demo feature-shell; drops AppShell under 500. Keep the event-bus wiring identical; mount the stage from AppShell as before. MED risk: touches a live useDockOrientationMorph consumer (the shell is BA binary consumer #2) — verify the morph still fires and proof:dock-morph-insitu stays green.
- isomorphic: true · effort M · risk MED


## DEDUPE (1)

### [A1-god-modules] demo/stories/substrates/constellation.vue:27-279
- **what:** demo/stories/substrates/constellation.vue (755; script 1-459) is a sequence of ~7 INDEPENDENT canvas-overlay demos (focal/warp/refit/well/anomaly/pinnedAnomaly/nova), each = a drawX computed closure + its onMounted wiring. The draw closures repeat a near-identical label-card pattern (phase = (now % 2600)/2600; lx = x + 30*k; ly = y - 18*k; pulse math) across drawFocal/drawWarpFocal/drawAnomaly/drawPinnedAnomaly (L32/74/142/230 — measured duplication of the same phase+offset+label idiom).
- **do:** Hoist the shared canvas label-card draw helper (the phase-pulsed offset label: the (now%2600)/2600 phase, the +30k/-18k offset, the stroke/fill label box) into a demo-local demo/stories/substrates/constellationDrawHelpers.ts; each drawX calls it. DRY without over-fragmenting — per-demo field logic stays inline (each demo IS distinct), only the repeated label-card primitive hoists. Do NOT split into 7 sub-components (over-fragmentation — they share one <Constellation> harness + token-color setup). MED risk: these are canvas pixel-paint closures likely captured by π specs — the extracted helper must be byte-faithful to each call's math; if the offsets differ even slightly, parameterize rather than force-merge, and if they are NOT actually identical on close read, downgrade this to KEEP-AS-IS.
- isomorphic: true · effort M · risk MED


## COLOCATE (1)

### [A4-colocation (colocation + logical grouping)] src/components/custom/configurator/{useConfiguratorState.ts,density.ts,Configurator.vue,ConfiguratorLayer.vue,ConfiguratorRow.vue,index.ts}
- **what:** configurator/ is a multi-SFC family (Configurator.vue 325L + ConfiguratorLayer.vue 211L + ConfiguratorRow.vue 225L) whose composable useConfiguratorState.ts (253L) AND DI module density.ts (55L, createOptionalContext-based — morally a *Context.ts) both sit at the package ROOT, and the dir has NO README. Because proof:colocation derives its target set from README presence (BA.W-HYGIENE), configurator escapes the convention entirely despite being exactly the complexity tier the idiom targets (cf. aurora/dock/easing which all carry composables/ + README). Internal blast radius is small: only 3 files (Configurator.vue:8, ConfiguratorRow.vue:6, index.ts:14/20) use the ./useConfiguratorState + ./density relative paths; ZERO external importers (everything reaches via the /configurator subpath + root barrel).
- **do:** Move useConfiguratorState.ts → composables/useConfiguratorState.ts and density.ts → composables/density.ts (it is a createOptionalContext DI module, the same tier the gate routes to composables/), re-point the 3 internal relative imports (./ → ./composables/), and add a thin README.md so the dir becomes a proper gate target. The public index.ts barrel surface stays byte-identical (it just updates its own two relative paths). This is the only dir that is a real convention-escapee. CONSERVATIVE alternative if churn is unwanted: leave the file layout, add ONLY the README — that alone enrolls it in proof:colocation and the gate will then DEMAND the composables/ move, so the README+move are one coherent unit; do not add the README without the move.
- isomorphic: true · effort S · risk LOW


## RENAME (1)

### [A3-composables] src/composables/motion/usePointerVelocityField.ts:84; src/composables/glass/useSpecularPointer.ts:29; src/composables/glass/useSpecularTracking.ts
- **what:** Three return-type-naming conventions coexist: `...Return` (29 interfaces, dominant), `...Controls` (11), `...Ref` (3, the SpringRef/SpringPressRef family), PLUS three composables whose return interface is named identically to the function with no suffix (UsePointerVelocityField at usePointerVelocityField.ts:84, UseSpecularPointer at useSpecularPointer.ts:29, UseSpecularTracking). Two composables (useScrollProgress, useStaggerReveal:100) return an inline object literal with NO named return type. This is purely a vocabulary inconsistency — TypeScript infers/checks all shapes correctly; zero runtime/paint impact.
- **do:** OPTIONAL low-priority: normalize the suffix-less return interfaces (UsePointerVelocityField → UsePointerVelocityFieldReturn etc.) toward the dominant `...Return` convention for grep-discoverability. CONSERVATIVE alternative = KEEP: the `...Controls`/`...Ref` suffixes are semantically meaningful (Controls = imperative handle set, Ref = a SpringRef-extending value), so a forced single-suffix sweep would erase meaning and touch many files. Recommend KEEP unless a broader naming-canon wave runs.
- isomorphic: true · effort M · risk LOW


## STYLE-FIX (2)

### [A7-design-idioms (design-idioms localization + cohesion)] src/components/custom/typewriter/TypewriterText.vue:238
- **what:** TypewriterText.vue:238 paints the interactive-char hover as `background-color: rgba(128, 128, 128, 0.15)` — a literal mid-NEUTRAL gray. Against the warm-cream / no-gray identity (CLAUDE.md §'The warm-chroma floor': the neutral ladder is warm MATERIAL, not gray) and off-token (every other neutral in the SFC corpus composes the warm --neutral-* ladder or color-mix over --foreground/--shadow-color; the only achromatic literals elsewhere are pure white catch-lights / black shadow inks, achromatic-by-physics). TypewriterText is a PUBLISHED surface (src/subpaths/typewriter.ts → @mkbabb/glass-ui/typewriter), so this is consumer-visible cohesion drift. No gate covers literal-rgba in scoped blocks.
- **do:** Re-point onto the warm register: `color-mix(in srgb, var(--neutral-3) 30%, transparent)` (the L82 warm hover-bg rung) or `color-mix(in srgb, var(--foreground) 8%, transparent)`. NOT byte-isomorphic (gray→warm is a deliberate paint change toward the house identity, the correct break) — so it needs the per-precept isomorphism check + a quick visual confirm. Conservative + tiny; the warm shift is the intended divergence, not drift-to-preserve.
- isomorphic: false · effort S · risk LOW

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/styles/index.css:53-150,160,180,189,194
- **what:** The src/styles/index.css cascade-order LEDGER (the big header comment, lines 53-150) documents partials only through item (16) select.css, but the live @import chain continues past it — glass-refract.css (line 160), configurator.css (180), icon-chip.css (189), border-progress.css (194) — AND glass-refract.css at line 160 has NO ledger row at all (the comment jumps from '4a. glass-specular-track.css' straight to '5. paper.css'). The load-order ledger has drifted behind the import chain it claims to document.
- **do:** Append the missing ledger rows: a '4b. glass-refract.css' row (the #glass-refract SVG lens filter, @supports-gated) after the 4a glass-specular-track row, and rows for configurator/icon-chip/border-progress in the (12)-(16) component tail (the header already says 'New per-package CSS files append to that tail' — so just record them). Doc-only; touches a comment block, zero rules.
- isomorphic: true · effort S · risk LOW


## HOLD (7)

### [A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)] scripts/proof-component-orphan.mjs:11,15,206-221
- **what:** proof:component-orphan (scripts/proof-component-orphan.mjs) — the substrate-with-consumer gate — is scoped to src/components/custom/<pkg>/ ONLY (lines 11/15/219: 'every PUBLISHED custom/ component package'; the readdir + needle paths are all components/custom/). Published ui/ packages with their own subpath (focus-scope, metric-pill) are NOT walked, so a zero-consumer ui/ orphan (FocusScope) sails past the very gate built to catch it. This is the structural reason FocusScope went unnoticed.
- **do:** WIDEN the orphan gate's enumeration to ALSO walk published ui/ packages that carry a dedicated src/subpaths/<pkg>.ts (i.e. any ui/ family with its own subpath export — currently focus-scope + metric-pill), holding them to the same ≥2-consumers-OR-evidence bar. This is a gate-coverage decision (needs team sign-off on the allowlist shape), hence HOLD not an auto-change. Closes the class so a future zero-consumer ui/ subpath cannot recur.
- isomorphic: true · effort S · risk LOW

### [A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)] src/composables/motion/useAnimatedNumberMap (per src/composables/motion/core/index.ts re-export)
- **what:** useAnimatedNumberMap (composables/motion/) is exported on @mkbabb/glass-ui/motion (public surface) but has ZERO real consumers — grep finds only the core/index.ts barrel re-export (no src component, no demo, no test). It passes J-inv-10 on the 'exported' leg but is a published-API-without-binary-consumer, the same shape as FocusScope minus the wrapper-triviality.
- **do:** HOLD pending a public-API-stability decision. Unlike FocusScope it is a real composable with logic (a per-key animated-number map), and a published composable retired is a registry-consumer-probe concern (BA inv-11) — so do NOT auto-prune. Either (a) book it with a docs/consumer-evidence/use-animated-number-map.md naming the intended consumer, or (b) retire it from /motion in a deliberate clean break with the registry probe run first. Decision needed; not a same-tranche conservative change.
- isomorphic: true · effort S · risk MED

### [A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)] src/components/custom/confirm-dialog/ConfirmDialog.vue:8-12
- **what:** ConfirmDialog (custom/confirm-dialog/, 88 lines) hand-rolls its own modal scaffold (bg-overlay-scrim backdrop + an OPAQUE bg-card text-card-foreground border panel, lines 8-12) instead of composing the house <Dialog> / ModalOverlay / useSurfaceAxis glass surface. It paints a solid plate, off the AX.W54 glass-first canon + the BA.W-SURFACE-AXIS {glass·veil·opaque} grammar that Dialog/Sheet/Popover thread. Well-consumed (2 demo + 1 test), so not dead.
- **do:** HOLD — flag as a glass-cohesion / DRY divergence for the glass band (adjacent to BC.W-GLASS-PRUNE / proof:glass-cohesion scope), NOT a prune. A re-base onto <Dialog> + the surface-axis would be a BEHAVIOR/PAINT change (opaque→glass), so explicitly NON-isomorphic and needs the gestalt-gate + a design decision. Recommend the glass band evaluate whether ConfirmDialog should compose <Dialog surface="glass"> rather than hand-roll an opaque scrim+panel; conservative default is KEEP until that band decides.
- isomorphic: false · effort M · risk MED

### [A3-composables] src/components/custom/aurora/composables/cursorModel.ts; src/composables/motion/usePointerVelocityField.ts
- **what:** cursorModel.ts (aurora, a plain-object mutator feeding the WebGL attraction shader — strength/radius/targetStrength terms) shares the lerp CONSTANTS by value with usePointerVelocityField.ts (the Vue-ref push-API pure-dynamics generalization). CLAUDE.md explicitly books the fold as a successor 'IFF byte-faithful'; they genuinely diverge today (attraction model vs pure pos/vel/accel dynamics; non-Vue mutator vs ref-bearing composable). Same applies to useBlobPointer/useConstellationPointer (CLAUDE.md: 'NOT re-pointed... a booked successor IFF byte-faithful').
- **do:** HOLD (no change now). The pointer-model fold onto usePointerVelocityField is already a recorded, booked successor gated on byte-faithfulness. cursorModel carries shader-attraction terms the shared field lacks, so a fold today would NOT be isomorphic. Leave as the documented book; do not force-merge.
- isomorphic: false · effort L · risk HIGH

### [A6-tailwind-styling] src/styles/drawer.css:58
- **what:** `.glass-drawer { max-height: 97vh }` uses `vh` on a bottom-sheet drawer — the mobile-viewport trap (mobile browser chrome inflates `vh` past the visible area, so the sheet can extend under the address bar). The sibling overlay surface select.css correctly uses `60dvh`.
- **do:** Consider `97dvh` (dynamic viewport height) to match the select.css idiom and avoid the mobile chrome trap. NOT isomorphic on mobile (the visible height differs from `vh` when browser chrome is shown) — this is a paint/behaviour decision, hence HOLD not STYLE-FIX. On desktop the two are identical. Befitting given the iOS-27 mobile target, but needs a paint sign-off + a re-shoot on the W-REFLECT3 drawer capture.
- isomorphic: false · effort S · risk LOW

### [A6-tailwind-styling] src/components/custom/search/FuzzySearch.vue:111,120,125,156
- **what:** FuzzySearch carries the repo's heaviest inline-`!important` Tailwind cluster: `!border-none !bg-transparent !p-0 !rounded-none` (floating variant, :111) and `!h-6 !w-6` / `!h-7 !w-7` on `<Button size="icon">` (:120,:125,:156) — `!important` utilities fighting the Button CVA's own size variant (the cn()-can't-win specificity smell).
- **do:** These are behaviourally load-bearing (overriding a CVA variant's geometry) — removing the `!` would let the variant win and CHANGE the paint, so a naive cleanup is NOT isomorphic. The clean fix is non-isomorphic-but-befitting: give Button an `iconSize`/dimension prop (or use a smaller `size` token) so the consumer stops `!important`-fighting the variant, OR accept the override as a localized escape. Single-component scope, low blast radius; flag for a paint-decision, do not auto-strip the `!`.
- isomorphic: false · effort M · risk MED

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/styles/glass-refract.css:1,67-69
- **what:** The file src/styles/glass-refract.css is named for the OLD opt-in class .glass-refract, which W-LENSING renamed to .glass-lens (clean break, no alias — confirmed glass-refract.css:67-69). The filename now mismatches the class it ships. BUT the filename is load-bearing in 4 build/gate scripts (critical-partition.mjs:54, proof-dist-css.mjs, profile-bundle.mjs, proof-button-glass.mjs:260) AND the #glass-refract filter-id + the --glass-refract magnitude axis are KEPT DELIBERATELY (the header records: 'the lens magnitude is the refraction axis' — the axis name is intentionally retained, only the class renamed).
- **do:** KEEP the filename. Renaming glass-refract.css → glass-lens.css would force coordinated edits across critical-partition.mjs/proof-dist-css.mjs/profile-bundle.mjs/proof-button-glass.mjs for a cosmetic gain, and the #glass-refract filter-id / --glass-refract axis names are deliberately retained (the lens IS the refraction axis). This is churn with gate-coordination cost; the mismatch is documented in-file. If touched at all, it is a coordinated rename wave, not an isolated change.
- isomorphic: true · effort M · risk MED


## KEEP-AS-IS (55)

### [A1-god-modules] src/components/custom/goo-blob/shaders/metaball.wgsl.ts:39
- **what:** src/components/custom/goo-blob/shaders/metaball.wgsl.ts (483): L39 onward is ONE export const METABALL_WGSL = /* wgsl */ `...` template string (a shader source). GL-fenced (CLAUDE.md: the GL-shader fence is ABSOLUTE), under the 500 bound, and a shader is legitimately one long string. The shared procedural-color.wgsl.ts chunk is ALREADY spliced in.
- **do:** KEEP. A shader template string is one cohesive program, under bound, GL-fence-locked; further splicing risks the byte-isomorphic parity the proof:gpu-substrate-single ΔE bar locks. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] src/api/index.ts
- **what:** src/api/index.ts (483) is a PURE re-export barrel (header L1-25: re-exports from canonical homes, declares NO own types) — and its composable-return/motion-curve type run was ALREADY carved to api/types-extra.ts at BB.W-CARVE5 (joined via export type * from). Per-surface source gates grep index.ts.
- **do:** KEEP. A discovery barrel is cohesive by definition (one import surface), under bound, heavy type run already extracted. Further splitting fragments the discovery layer and could trip the per-surface source gates. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] src/components/custom/tabs/SegmentedTabs.vue
- **what:** src/components/custom/tabs/SegmentedTabs.vue (478; script 1-367, template 369-478) ALREADY follows colocation — useTabIndicator + useTabDragMorph carved into composables/ (BB.W-CARVE4), constants in constants.ts. The remaining script is the SFC's own orchestration (state, roving-tabindex keyboard contract L290-325, select/animatePress, mobile-collapse).
- **do:** KEEP. Under bound, heavy logic already in composables/. The roving-tabindex + select + press wiring is the SFC's own orchestration; a single-consumer composable extraction is below the ≥2 bar and pure churn. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] src/components/custom/dock/GlassDock.vue
- **what:** src/components/custom/dock/GlassDock.vue (464; script 1-345, template 347-464). The heavy dock logic is ALREADY carved into composables/ (dockMorphContext/dockMorphMeasure/useDockState/useDockShellProps/useLayerTransition/useDockHold/useDockClickIntegrity — 13 composable files). The SFC is the assembly point.
- **do:** KEEP. Under bound; the dock family is the model of the colocation idiom. The SFC is a thin assembly over its composables. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] src/components/custom/dock/composables/dockMorphContext.ts
- **what:** src/components/custom/dock/composables/dockMorphContext.ts (487): the dock morph orchestrator — measure/seat helpers ALREADY carved to dockMorphMeasure.ts at BB.W-CARVE4 (DOCK_SPRING byte-fenced). Owns the --dock-morph-t scalar context (createStrictContext DI). Under bound. Six reader gates grep it by name (proof:dock-morph-family F3, etc.).
- **do:** KEEP. Under bound, already once-carved, DOCK_SPRING fenced, gate-grep-locked. Further carving risks the byte-fence + the reader-gate greps and buys nothing. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] src/components/custom/aurora/composables/runtime.ts
- **what:** src/components/custom/aurora/composables/runtime.ts (452): the GL-lifecycle orchestrator (header L1-22 names its four composed seams glSetup/uniformBridge/cursorModel/frameLoop — all ALREADY separate files in composables/, + wgpuSetup). It owns only the aurora-specific glue threading those seams. Under bound.
- **do:** KEEP. The decomposition the prompt asks for already happened — runtime.ts is the thin orchestrator over glSetup/uniformBridge/cursorModel/frameLoop/wgpuSetup. Cohesive glue under bound. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] src/components/custom/constellation/constellationInteraction.ts
- **what:** src/components/custom/constellation/constellationInteraction.ts (488): the constellation pointer/warp/anomaly interaction model (sibling to constellationField/constellationDraw, the carve named in CLAUDE.md §Structure). Under bound; already separated from the field + draw siblings.
- **do:** KEEP. Already carved (field/draw/interaction triad), under bound, one cohesive interaction model. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] src/components/custom/fourier-field/composables/useFourierField.ts
- **what:** src/components/custom/fourier-field/composables/useFourierField.ts (466): the ~475-line renderer was DELIBERATELY lifted out of the SFC into this composable at BB.W-CARVE3 (the colocation symmetry useAurora/useMetaballRenderer/useConstellation carry; the SFC dropped to ~100 lines). Under bound. This file IS the result of a prior split (math.ts + presets.ts already separate).
- **do:** KEEP. It is the intended landing zone of a recent carve; the renderer is one cohesive canvas2D loop. Re-splitting would undo W-CARVE3. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] demo/stories/substrates/blob.vue
- **what:** demo/stories/substrates/blob.vue (759; script 1-370, template 372-743, style 745+). The template is dominated by ONE cohesive <Configurator> studio block (L28-302, the BlobStudioCfg-driven studio, the inv-16 dog-food) + three small swatch grids (L304-370). The 370-line script is the BlobStudioCfg interface + configurator state + palette derivation — all serving the ONE studio.
- **do:** KEEP. A single cohesive studio page (the Aurora-mirror dog-food), not a mix of separable sub-components — the Configurator studio is one unit, the swatch grids trivial. The gate does not police demo/. Splitting the studio out makes a single-consumer demo sub-component (below ≥2) for churn. HOLD only if a future second studio consumer appears.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] demo/stories/dock/overview.vue
- **what:** demo/stories/dock/overview.vue (651; script 1-99, template 101-642) hosts ~10 INDEPENDENT GlassDock FEATURE demos (media transport, nav, layers, capture L375, tap-capture L430, slider, overflow=wrap L533, shape=card grid L563). Each is a self-contained <GlassDock> specimen; the 99-line script is shared demo state.
- **do:** KEEP (lean HOLD). Each GlassDock is a distinct facility demo but short, sharing one page's state/imports; demo-only (off the gate). Splitting into 10 sub-components over-fragments a story page (the KISS / do-not-over-fragment bar). No action unless a specific demo grows.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] demo/stories/aurora/presets.ts
- **what:** demo/stories/aurora/presets.ts (588) is a PURE preset DATA table — 8 cfg({...}) authored-theme blocks (header: ported verbatim, presets-in-consumers; the library ships only the shape + neutral DEFAULT_AURORA_CONFIG). Data, not logic.
- **do:** KEEP. A preset data table is legitimately long (the prompt allows 'a manifest is legitimately long'), demo-local (presets-in-consumers fence), off the gate. Splitting authored themes across files buys nothing. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] demo/stories/manifest.ts
- **what:** demo/stories/manifest.ts (813): the demo story registry (CATEGORY_DEFAULT_BG per-category background map + the s() factory + every story row). Single source of truth for the demo route table; parsed by gates (proof:visual-runner enrollment, per-category bg).
- **do:** KEEP. A manifest/registry is legitimately long and is the SINGLE source the demo router + multiple gates read. Splitting fragments the route table and complicates gate parsers for no benefit. No action.
- isomorphic: true · effort S · risk LOW

### [A1-god-modules] demo/stories/display/card.vue, demo/stories/motion/curve-gallery.vue, demo/stories/data/search.vue
- **what:** demo/stories/display/card.vue (569; template 96-569 = ~10 flat self-contained tier/surface demo sections each <60 lines: tier ladder, polymorphic root, nested-card, cartoon, veil, scroll-pane, scroll-shrink, ScrollCard, CardAction). demo/stories/motion/curve-gallery.vue (476 — ALREADY consumes the shipped <EasingPicker>/<EasingConfigurator>, the C-3 fold LANDED; bulk is gallery data + SVG plot helpers). demo/stories/data/search.vue (458 — one cohesive fuzzy-search demo with many state refs).
- **do:** KEEP all three. card.vue is a flat catalogue of short self-documenting demo sections — fine as one story page; sub-componentizing each tier over-fragments a documentation surface. curve-gallery already did its fold (consumes EasingPicker) — its remaining size is gallery DATA + plot helpers; do NOT re-split. search.vue is one demo with high ref-count but single concern. All demo-only (off the gate). No action.
- isomorphic: true · effort S · risk LOW

### [A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)] src/components/custom/color-swatch/ColorSwatch.vue, demo/stories/aurora/OklchStopRow.vue:75, demo/stories/aurora/config/PaletteLayer.vue:93, docs/consumer-evidence/color-swatch.md
- **what:** ColorSwatch (custom/color-swatch/, BA.W-CONFIG-CHASSIS) has exactly 1 real in-repo consumer (demo/stories/aurora/sections/AuroraColorSection.vue, 5 mounts) — below the ≥2 bar. It is BOOKED via docs/consumer-evidence/color-swatch.md (re-audit 2026-09-01) on the promise that the blob Seed + OKLCh stop rows re-point off raw <input type=color> onto it. But that migration has NOT landed: demo/stories/aurora/OklchStopRow.vue:75-76 + demo/stories/aurora/config/PaletteLayer.vue:93-94 STILL hand-roll <input type="color"> with the [&::-webkit-color-swatch] CSS the component was built to supersede. So the ≥2 rationale remains paper-only.
- **do:** KEEP the component (it is the correct primitive + evidence-booked, so NOT a prune). The conservative action is the DEMO re-point that was already promised: migrate the two raw <input type=color> sites onto <ColorSwatch> so the ≥2-consumer bar clears on its own and the evidence-doc escape is no longer load-bearing. NOTE: this is a demo/ edit (outside strict src/ prune scope) — flag for the demo-cleanup pass, do not retire the primitive.
- isomorphic: false · effort S · risk LOW

### [A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)] src/components/custom/glass-panel/GlassPanel.vue, docs/tranches/BC/waves/BC.W-GLASS-PRUNE.md
- **what:** GlassPanel (custom/glass-panel/, 193 lines) is a TRUE duplicate of Card (variant≡tier, surface≡surface via the SAME useSurfaceAxis) whose only unique facility (useGlassRenderer createGlassFilter) is mechanically identical to the .glass-lens/#glass-refract feDisplacementMap. It was retired AY then restored AZ.W-PRUNE2 on a keyframes-consumer truth. The user explicitly named this ('why so many glass duplicates, prune to Glass CARDS + Glass MATERIALS').
- **do:** KEEP-AS-IS for THIS assay — BC.W-GLASS-PRUNE (SPEC, Band 1) already owns the full retire comprehensively (deletes glass-panel/ + subpath + proof:glass-panel-tiers, retires useGlassRenderer onto .glass-lens, re-authors the route as a MATERIALS gallery, runs the binding registry+constellation probe). My census CONFIRMS the duplicate diagnosis (variant/surface/tier overlap measured at GlassPanel.vue:32-56) but does NOT re-propose it — complement, no duplication. The header-ribbon sibling rides BC.W-FOLD-LEDGER (also already owned).
- isomorphic: true · effort L · risk MED

### [A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)] src/components/ui/metric-pill/MetricPill.vue
- **what:** MetricPill (ui/metric-pill/, 69 lines) is a composition-only PRESET wrapper over MetricBadge (its docstring: 'composition-only — no parallel logic vs MetricBadge', lines 9-19; bakes labelPosition=stacked + density=spacious + size=lg). Looked like a thin-wrapper prune target. Measured consumers: demoSFC=1, srcInternal=4, tests=3 — well above the bar.
- **do:** KEEP — it is a documented, well-consumed preset wrapper that adds VALUE (the audit-B-spec stacked-pill recipe baked once, composed not forked). Not a no-value re-export. The metric-* family (badge/cell/stack/pill) was already judged at AZ.W-METRIC-UNIFY (coalesceMetric core shared, divergences recorded in design-idioms §9) — no merge owed.
- isomorphic: true · effort S · risk LOW

### [A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)] src/components/custom/stacked-icons/StackedIconGroup.vue
- **what:** StackedIconGroup (custom/stacked-icons/) initially appeared as a 0/0/0 orphan in my first census — but that was a wrong-symbol grep (I searched 'StackedIcons'; the export is 'StackedIconGroup'). Re-grep finds a dedicated story (demo/stories/display/stacked-icons.vue) + a 2nd demo consumer (demo/stories/data/avatar.vue) + the api/subpath publication. Recorded so the false-positive is not mistaken for a finding.
- **do:** KEEP — genuinely consumed once the correct export symbol is used. (Methodology note: consumer census MUST grep the exact export symbol from each index.ts, not the dir-name PascalCase guess.)
- isomorphic: true · effort S · risk LOW

### [A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)] src/components/custom/* (42), src/components/ui/* (44)
- **what:** Broad census of the remaining custom/ + ui/ packages: labeled-field family (LabeledSlider 13 demo + LabeledSelect 8 + LabeledInput/Switch/Field 3 each — all well above bar; design-idioms §9 records the ConfiguratorRow-vs-LabeledField divergence as a deliberate keep), Pulse (3 demo + 6 src), IconTooltip (4+4), PaperBackdrop (5 demo, thin paper-underpaint applier — kept, well-consumed), ExpandableContainer (3+3), Pager/MetricCell/MetricStack/StatusDot/Typewriter/AnimatedDigit/ToggleChip/ScrollingText/SpaView/HeaderRibbon — all either ≥2 real consumers OR carry a docs/consumer-evidence/<pkg>.md booking (the allowlist has 40+ evidence docs covering every low-count custom/ package). ui/_shared (ModalOverlay 3 consumers, menuItemVariants, useSurfaceAxis, useStalePropWarning) all live.
- **do:** KEEP-AS-IS. The component surface is disciplined — proof:component-orphan + the docs/consumer-evidence/ allowlist already enforce J-inv-10 across custom/, and the measured counts confirm it. No speculative refactor warranted (no churn-for-churn). The ONLY real gap is the gate's ui/-blindness (separate finding) which let FocusScope slip.
- isomorphic: true · effort S · risk LOW

### [A3-composables] src/composables/context/createContext.ts; src/components/custom/goo-blob/GooBlob.vue:62
- **what:** DI pattern is uniformly adopted. createStrictContext/createOptionalContext (createContext.ts, AV.W14) is consumed by all 7 DI sites: dockContext, dockLayerContext, dockMorphContext, toggleGroupContext, sortable-list/context, drawer/drawerSnapContext, configurator/density. The ONLY raw inject(KEY,null) is GooBlob.vue:62 (BLOB_CONFIG_KEY external-provide), which createContext.ts:23-27 docstring EXPLICITLY carves out as a sanctioned exception (not a strict-or-optional triplet). No ad-hoc provide/inject or raw reactive() shadow-store found.
- **do:** KEEP. The DI factory is single-source and consistently consumed; the GooBlob bare inject is the documented external-provide exception, correct as-is.
- isomorphic: true · effort S · risk LOW

### [A3-composables] src/composables/glass/useSpecularTracking.ts; src/composables/motion/{useSpring,useSpringPress,useLiquidPress,springPresets}.ts
- **what:** Single-source state discipline holds across the would-be-duplicate clusters. (a) Specular: ONE createSpecularWriter core (useSpecularTracking.ts) + 2 deliveries (useSpecularTracking composable + vSpecular directive) + useSpecularPointer.ts:39 wrapping the SAME core for the angle channel — no second --mouse-x/y writer. (b) Spring press: useSpring (engine) → useSpringPress.ts:68 (target wrapper) → useLiquidPress.ts:132 (coupled squish+drive) — a clean composition chain, no parallel physics. (c) springPresets.ts is the no-second-authority root feeding both regen-spring-tokens.mjs and curves.ts MOTION_CURVES.
- **do:** KEEP. These are the model single-source factorings; no consolidation owed.
- isomorphic: true · effort S · risk LOW

### [A3-composables] src/index.ts:160-224; src/composables/motion/index.ts; src/composables/motion/core/index.ts
- **what:** Root-barrel SCC discipline is intact. src/index.ts uses TARGETED named re-exports for the engine-free motion-core leaves (useViewTransition/navigate L178, vReveal L187, useTextHighlight L196, useLiquidFlex L207, usePointerVelocityField L220) and NEVER `export * from "./composables/motion/core"` (verified absent) — so the keyframes-bearing /motion leaves (useSpring*, useLiquidPress, useDragMorph, useLiquidReveal, useDockCtaReceive, useCountup, useAnimatedNumberMap) and vueuse-bearing dark/keyboard stay off the root. The CLAUDE.md-claimed root members (useLiquidFlex, usePointerVelocityField) are present.
- **do:** KEEP. The barrel layering is precise and well-documented per leaf.
- isomorphic: true · effort S · risk LOW

### [A3-composables] src/components/ui/toast/use-toast.ts
- **what:** One kebab-case composable filename — src/components/ui/toast/use-toast.ts — against the camelCase `useX.ts` house norm (every other composable is camelCase). It exports `toast` + `useToast` (index.ts:7).
- **do:** KEEP. `use-toast.ts` is the shadcn-vue CANONICAL upstream filename (the toast primitive is a shadcn-vue port); renaming to useToast.ts diverges from the documented shadcn-vue pattern the ui/ dir follows. Deliberate convention keep, not drift.
- isomorphic: true · effort S · risk LOW

### [A3-composables] src/components/custom/configurator/useConfiguratorState.ts; src/components/ui/progress/useProgressGeometry.ts; src/components/ui/_shared/*.ts
- **what:** Seven use* composables sit at a component DIR ROOT rather than under a composables/ subdir: configurator/useConfiguratorState.ts, watercolor-dot/useWatercolorBlob.ts, carousel/useCarousel.ts, progress/useProgressGeometry.ts, toast/use-toast.ts, _shared/{useStalePropWarning,useSurfaceAxis}.ts. None of these dirs has a composables/ subdir at all — they are flat multi-file dirs, internally consistent. The colocation convention's composables/ subdir is scoped to COMPLEX feature-dirs (WebGL/multi-composable); these are simpler.
- **do:** KEEP. The convention is 'composables/ if needed' (CLAUDE.md §Structure custom/). A single-composable dir with no other composables to group does not need the subdir; proof:colocation passes. _shared composables are correctly cross-family. Forcing a composables/ subdir per dir would be churn.
- isomorphic: true · effort S · risk LOW

### [A3-composables] src/components/custom/{aurora,goo-blob,dot-flow-field,concentric}/composables/uniformBridgeWGPU.ts
- **what:** The four per-viz uniformBridgeWGPU.ts files (aurora 186L, goo-blob 293L, dot-flow-field 209L, concentric 157L) share a PATTERN (vec4-lane packing, the 'ONE layout declaration → no std140 mismatch' idiom) and the oklchToLinear leaf, but each declares a bespoke struct layout for its own shader uniforms (nuclei vs satellites vs rings vs waves). The only genuinely shared math (oklchToLinear) is ALREADY single-sourced in composables/color.
- **do:** KEEP. These are legitimate per-viz divergences — a shared abstraction would still require each viz to declare its own layout table, adding indirection without removing real duplication. The shared leaf (color math) is already factored. Not a dedupe target.
- isomorphic: true · effort M · risk MED

### [A3-composables] src/components/custom/goo-blob/composables/easing.ts
- **what:** goo-blob/composables/easing.ts (easeInOut/easeIn/easeOut) is a component-scoped fold of three quadratic curves previously inline in useBlobMood/useBlobSatellites. Its header documents that the use is SINGLE-COMPONENT, so the correct home is component-scoped (NOT a keyframes consumption, NOT a public composable), the curves are byte-identical to the prior inline forms, and the distinct smoothstep stays inline at its single site by KISS.
- **do:** KEEP. A model example of the judge-don't-force discipline — a documented single-component fold that correctly avoids over-promoting to a public composable. No action.
- isomorphic: true · effort S · risk LOW

### [A3-composables] src/components/custom/dock/composables/*.ts
- **what:** Dock composables family is well-bounded and non-overlapping: all 13 files <500L (largest dockMorphContext.ts 487, useDockState 450, useLayerTransition 385). The morph helpers are cleanly distinct concerns — useDockMorphWindow (transition-window timing), dockMorphMeasure (geometry/seat helpers carved for the bound), dockMorphContext (DI orchestrator/driver), useDockOrientationMorph (V↔H scalar driver), useLayerTransition (layer FLIP). State roots are local single-purpose refs (t/morphing/expanded/isPinned/keepOpenCount), no shadow-store duplication.
- **do:** KEEP. dockMorphContext.ts (487L) is the only file near the 500-line bound — worth a watch on the next growth, but it is within bound and cohesive (the dockMorphMeasure carve already drained it). No action.
- isomorphic: true · effort S · risk LOW

### [A4-colocation (colocation + logical grouping)] src/components/custom/constellation/, src/components/custom/handmark/, src/components/custom/timeline/
- **what:** constellation/ carries 4 root-level constellation*.ts (constellationField 220L, constellationDraw 239L, constellationInteraction 488L, constellationTypes 391L) ALONGSIDE a composables/ dir (useConstellation 447L, createConstellationField 118L, useConstellationPointer 179L). At first glance this looks like a root/composables split-apart. It is NOT: the root files are pure algorithm/type modules (field math, draw routines, interaction physics, public prop types) and the composables/ holds only the Vue-bound use*/create* wrappers that consume them. proof:colocation only requires use*/Context.ts to live under composables/ — which they do. handmark/ (brush/freehand/geometry/ink/texture at root + useHandMark in composables/) and timeline/ (geometry.ts 262L at root, no composables/ because it has no use* fn) follow the same correct pattern.
- **do:** KEEP. The algorithm-modules-at-root vs Vue-composables-in-composables/ split is a consistent, principled house pattern across all three large dirs and satisfies the convention exactly. Forcing the algorithm modules into composables/ would be contrivance (they are not composables) and would churn many relative imports for zero gain.
- isomorphic: true · effort S · risk LOW

### [A4-colocation (colocation + logical grouping)] src/components/custom/watercolor-dot/prng.ts
- **what:** watercolor-dot/prng.ts (21L) looks like a duplicate PRNG fork of the shared src/utils/prng.ts leaf. It is not: it is a thin RE-EXPORT (`export { mulberry32, hashString } from "../../../utils/prng"`) plus 2 watercolor-local helpers (randomRadii, radiiToCSS). This is documented verbatim in CLAUDE.md:240 ("watercolor keeps its border-radius helpers local") — a recorded single-source keep, not a fork.
- **do:** KEEP. Recorded divergence in CLAUDE.md; the core PRNG is single-sourced and only the 2 single-component radius helpers are local. The only nit is the filename (prng.ts implies a PRNG home when it is really radii-helpers + re-export), but renaming would break the byte-identical named surface the comment guarantees — not worth the churn.
- isomorphic: true · effort S · risk LOW

### [A4-colocation (colocation + logical grouping)] src/components/custom/{header-ribbon,stacked-icons,icon-chip,goo-blob}/types.ts
- **what:** Small single-purpose types.ts files in otherwise-flat dirs: header-ribbon/types.ts (10L), stacked-icons/types.ts (18L), icon-chip/types.ts (86L), goo-blob/types.ts (372L). The 10L/18L ones could look like over-engineered single-file splits.
- **do:** KEEP. A Vue SFC cannot re-export standalone types, so a colocated types.ts is the canonical house home (CLAUDE.md names this 'the SFC-cannot-re-export-a-type colocated home' for DockSectionDescriptor). Even the 10L header-ribbon/types.ts is correct by that rule; inlining the type into the SFC would make it unexportable from the package barrel.
- isomorphic: true · effort S · risk LOW

### [A4-colocation (colocation + logical grouping)] src/components/custom/pager-dots/, src/components/custom/spa-view/
- **what:** pager-dots/ and spa-view/ show `constants✗` in the gate output but PASS — they are single-SFC dirs (PagerDots.vue / SpaView.vue + index.ts) that carry a README, which makes them gate TARGETS, yet have no composables/ and no constants.ts. This could look like either an over-engineered README on a trivial dir or a missing-constants gap.
- **do:** KEEP. constants✗ is a vacuous non-violation: the gate only demands constants.ts when a composables/ dir exists. These are correctly-flat single-file dirs; the BA.W-HYGIENE note in proof-colocation.mjs explicitly sanctions 'a README-bearing simple dir' (underline/ precedent). No constants to home, no composable to relocate, no contrivance to add.
- isomorphic: true · effort S · risk LOW

### [A4-colocation (colocation + logical grouping)] src/components/custom/controls/
- **what:** controls/ is a plural-named dir containing exactly one control (DarkModeToggle.vue + index.ts). A 'controls' dir with one control reads like vestigial nesting.
- **do:** KEEP. It is documented in the CLAUDE.md §Structure listing as controls/DarkModeToggle.vue and reaches consumers via the /controls subpath; flattening DarkModeToggle to a top-level dir would rename the subpath (a public-surface break for a cosmetic gain). Not worth it. The dir-set ≡ disk is gate-locked by proof:claude-structure-sync, so the listing already ratifies this shape.
- isomorphic: true · effort S · risk LOW

### [A4-colocation (colocation + logical grouping)] src/styles/
- **what:** The styles/ tree: every monolith that grew past 500L (theme.css, typography.css, tokens.css, glass.css, utilities.css, dock.css, dock-controls.css) is a thin @import root over a same-named subdir (theme/, typography/, tokens/ [14 files], glass/ [10], utilities/ [7], dock/ [9], dock-controls/ [5]) with cascade-order headers.
- **do:** KEEP. This is the §5 god-module carve discipline executed exactly: cohesion-domain partials, byte-isomorphic dist, cascade order preserved + header-documented, machine-locked by proof:no-god-module + read-css-monoliths.mjs. The dir-vs-file pairing (dock-controls/ next to dock-controls.css) is the intended @import-root pattern, not a duplicate. Nothing to regroup.
- isomorphic: true · effort S · risk LOW

### [A4-colocation (colocation + logical grouping)] src/subpaths/
- **what:** subpaths/ mirror: 72 trivial one-line barrels (`export * from "../components/custom/<dir>"`), batch-resolved by the vite.library.ts glob.
- **do:** KEEP. This is the documented AV.W5.A mirror convention (CLAUDE.md §Structure) — a new subpath barrel never has to be hand-added; zero surface delta. No grouping change warranted.
- isomorphic: true · effort S · risk LOW

### [A4-colocation (colocation + logical grouping)] src/components/custom/
- **what:** No composable name collisions across custom/ dirs (find -name 'use*.ts' | basename | uniq -d is empty) — no forked/duplicated composable logic to DEDUPE in this area.
- **do:** KEEP. Confirms there is no cross-dir composable duplication to consolidate; the ≥2-consumer shared composables already live correctly in src/composables/ subtrees, not forked into feature dirs.
- isomorphic: true · effort S · risk LOW

### [A5-brittle-selectors] src/components/custom/goo-blob/composables/useMetaballRenderer.ts:359
- **what:** `watch(paletteStops, () => canvasHandle?.wake(), { deep: true })` watches `paletteStops: Ref<string[]>` directly (no snapshot), so deep IS load-bearing for in-place array mutation — the correct counterpart to the GooBlob.vue:160 finding.
- **do:** KEEP — deep is required here (Ref<string[]> watched directly, no primitive snapshot).
- isomorphic: true · effort S · risk LOW

### [A5-brittle-selectors] src/components/custom/aurora/composables/useAurora.ts:228, src/components/custom/tabs/composables/useTabIndicator.ts:272, src/components/custom/search/composables/useFuzzySearch.ts:67
- **what:** `watch(getCfg, …, {deep:true})` (useAurora) + `watch(()=>options.value, …, {deep:true})` (useTabIndicator) + `watch(sourceItems, …, {deep:true})` (useFuzzySearch) — all watch reactive OBJECTS/ARRAYS mutated in place (config slider-drag, tab descriptor array, source data array). Each is documented; deep is genuinely required.
- **do:** KEEP — deep load-bearing on real nested-reactive watch targets, each with a documented rationale.
- isomorphic: true · effort S · risk LOW

### [A5-brittle-selectors] src/components/ui/card/CardHeader.vue, src/components/custom/metric-stack/MetricRow.vue, src/components/custom/metric-badge/MetricBadge.vue, src/components/custom/timeline/ContinuousMarkers.vue, src/components/custom/timeline/ContinuousTimeline.vue
- **what:** Zero live `:deep()` in any SFC <style> across src/. All 7 grep hits (CardHeader.vue, MetricRow.vue ×2, MetricBadge.vue, ContinuousMarkers.vue, ContinuousTimeline.vue) are COMMENTS documenting that the prior :deep() reach was RETIRED in favor of token-only (`var(--token,…)`) or `:slotted()` reaches. The :deep() sledgehammer chronic is already closed.
- **do:** KEEP — no action; the de-fanging is complete and well-documented.
- isomorphic: true · effort S · risk LOW

### [A5-brittle-selectors] src/styles/**/*.css + src/**/*.vue (sweep)
- **what:** Zero `:global(` inside any <style scoped> block across src/ (the recurring vue-scoped :global() drop footgun — feedback_vue_scoped_global_drop, design-idioms §8). `proof:no-scoped-global` keeps it RED-on-reintroduction; allowlist empty. The plain-ancestor `.dark .x` idiom is used everywhere a dark arm is needed.
- **do:** KEEP — chronic structurally closed; nothing to do.
- isomorphic: true · effort S · risk LOW

### [A5-brittle-selectors] src/components/ui/card/CardHeader.vue:160/182/214, src/components/ui/card/ScrollCardHeader.vue:63, src/components/custom/metric-stack/MetricRow.vue:308
- **what:** `:slotted()` usage (CardHeader.vue `> :slotted([data-slot=…])` child form; ScrollCardHeader.vue; MetricRow.vue `.metric-row :slotted(.metric-row__description), :slotted(.result-description)` descendant form) is the PRECISE documented house idiom (design-idioms §7, MetricRow is the reference). The MetricRow descendant (non-`>`) form is scoped under `.metric-row` and the dual `.result-description` selector is the sanctioned consumer-styling seam. No bare/document-leaking :slotted.
- **do:** KEEP — correct slotted-content targeting per the documented idiom; not misuse.
- isomorphic: true · effort S · risk LOW

### [A5-brittle-selectors] src/styles/glass/surfaces.css:44, src/styles/utilities/base.css:106, src/styles/dock/morph.css:327/392, src/styles/dock/rail-extend.css:229/233/288/294
- **what:** `:has()` (20 sites across glass/surfaces.css, utilities/base.css, dock/morph.css, dock/rail-extend.css) is always SCOPED to a component root (`.glass-card:has(:focus-visible)`, `.labeled-field:has(:user-invalid)`, `.glass-dock-frame:has(.glass-dock.collapsed)`) — never bare `body`/element — and each carries an `@supports not selector(:has(*))` class fallback (glass/a11y-fallback.css). Disciplined, not fragile.
- **do:** KEEP — scoped + fallback'd; the correct modern pattern.
- isomorphic: true · effort S · risk LOW

### [A5-brittle-selectors] src/styles/instrument-chassis.css:412, src/styles/dock/rail-extend.css:294, src/styles/dock/layers.css:96, src/styles/dock/layer-group.css:279
- **what:** Deepest CSS descendant chains: ONE 4-level chain (instrument-chassis.css:413, a comma-grouped `.instrument-chassis .instrument-dial .{dial-divider,chassis-divider--vertical} .bezel-line` pair inside a @container block) + ~6 three-level chains in dock partials. All are component-internal, house-owned BEM (`.dock-hairline-*`, `.dock-layer-*`) scoped to a single component root — not cross-component descendant reaches.
- **do:** KEEP — nesting depth tracks real DOM structure within one component; flattening would not reduce coupling (same owned class set). Not brittle.
- isomorphic: true · effort S · risk LOW

### [A5-brittle-selectors] src/components/ui/**, src/components/custom/tabs/composables/useTabIndicator.ts, src/components/custom/timeline/ScrubberTimeline.vue:36
- **what:** All 14 `v-bind="$attrs"` SFCs are paired with `inheritAttrs:false` (no double-bind). `tag="div"` (Notification.vue:4, MetricStack) is the Vue built-in `<TransitionGroup tag>` prop, NOT a stale reka binding. `:model-value`/`@update:model-value` pairs are consistent kebab-case. getBoundingClientRect/offset reads are in pointer handlers (ScrubberTimeline:36) or post-flush nextTick (useTabIndicator updateSliders, JS-slider path) — never in a synchronous reactive/computed path.
- **do:** KEEP — $attrs discipline intact, layout reads in correct contexts, no stale reka prop bindings statically detectable.
- isomorphic: true · effort S · risk LOW

### [A5-brittle-selectors] src/composables/sidebar/useSidebarFollow.ts:59, src/composables/sidebar/useScrollTracker.ts:108, src/composables/glass/useGlassBackdropLuminance.ts:147
- **what:** Manual DOM queries are all correct-by-design: useSidebarFollow.ts:59 `nav.querySelector('[data-toc-id="…"]')` is SCOPED to the nav ref + uses CSS.escape on the dynamic id + a data-attr (the robust pattern); useScrollTracker.ts:108/134/224 `document.getElementById(id)` resolves consumer-supplied TOC anchors that live OUTSIDE the sidebar tree (the correct API); useGlassBackdropLuminance.ts:147 querySelector is on a CONSUMER-supplied selector string (documented API surface).
- **do:** KEEP — each query is scoped/escaped/consumer-contracted appropriately; none should be a ref (they reach content outside the component or are API surface).
- isomorphic: true · effort S · risk LOW

### [A7-design-idioms (design-idioms localization + cohesion)] src/components/custom/timeline/ContinuousMarkers.vue:233, src/components/custom/timeline/SegmentedTimeline.vue:173
- **what:** The marker shadow `box-shadow: 0 1px 2px color-mix(in srgb, var(--shadow-color) 12%, transparent)` is byte-identical across exactly 2 SFCs (ContinuousMarkers.vue:233, SegmentedTimeline.vue:173). It is a candidate DEDUPE-to-token, BUT: it already composes the house --shadow-color token form correctly (Conventions §shadows-compose-via-color-mix), no existing --shadow-* token has its `0 1px 2px` geometry (closest is --shadow-lg `0 4px 20px`), and it is a per-component bespoke marker dot shadow with only 2 callsites in the same timeline family.
- **do:** KEEP. Minting a --shadow-marker token for 2 same-family callsites that already token-compose correctly is churn against the ≥2-consumer-with-real-divergence bar; it would add a token-indirection for no consumer-override benefit. If a 3rd timeline-family surface ever needs it, mint --shadow-timeline-marker in tokens/shadow.css then (named-successor). No change now.
- isomorphic: true · effort S · risk LOW

### [A7-design-idioms (design-idioms localization + cohesion)] docs/precepts/design-idioms.md, src/styles/index.css
- **what:** The single localized design-idiom home is REAL and SINGLE-SOURCE: docs/precepts/design-idioms.md (the binding home-map) + src/styles/index.css cascade ledger, machine-locked by proof:precept-current (§3 home-map ↔ src/styles census, GREEN: 11 file cells, 26 examples, 199-name census, 0 dangling) + proof:design-idiom-localization (GREEN: 472 files, 0 text-[var]/shadow-[var] wraps, 1 justified allowlist) + proof:var-in-arbitrary-guard. The idioms are NOT scattered.
- **do:** KEEP. The home + the two gates are exactly the localized-single-source the mandate asks for. The only gaps are the prose blind-spots above (§2/§5/§3-thin-root), all doc-only.
- isomorphic: true · effort S · risk LOW

### [A7-design-idioms (design-idioms localization + cohesion)] src/styles/{glass/surfaces.css,instrument-chassis.css,typography/utilities.css,utilities/btn.css,floating-panel.css,dock/layer-group.css}
- **what:** @apply discipline (design-idioms §4) is PERFECT in practice: 0 @apply inside any SFC <style scoped> block across 37 scoped SFCs; all 12 @apply live in CSS partials and compose real @theme/Tailwind utilities (glass/surfaces.css flex/inline-flex/cursor compositions, instrument-chassis.css @apply twin-line-divider, typography/utilities.css @apply text-mono-caption — the §3 'eyebrow vocabulary composed once' idiom, btn.css data-state animate). No hand-repeated style/animation/color pattern that should be an @utility was found (recurring transition shorthands compose var(--duration-*)/var(--ease-*) tokens correctly, max 2 same callsites — below the ≥2-with-divergence bar).
- **do:** KEEP. The @apply usage is idiomatic and the no-SFC-scoped-@apply discipline is intact. No consolidation owed.
- isomorphic: true · effort S · risk LOW

### [A7-design-idioms (design-idioms localization + cohesion)] src/styles/theme/*.css
- **what:** @theme single-source (§2 'never declare a @theme alias in any other stylesheet') HOLDS: every real @theme block is under theme/* (radius/bridges/literals — 5 @theme each). The 5 grep hits OUTSIDE theme/ (base-misc.css, typography/scale.css+utilities.css, tokens/offsets.css, tokens/color-radius.css) are ALL in comments (cross-references / archaeology notes), zero real declarations.
- **do:** KEEP. The bridge is genuinely single-source; this confirms the §2 RULE prose stays valid even after the §2 'ONE file' wording is corrected per the first finding.
- isomorphic: true · effort S · risk LOW

### [A7-design-idioms (design-idioms localization + cohesion)] src/components/**/*.vue, src/styles/**/*.css
- **what:** Cohesion sweep across the SFC corpus is CLEAN against the warm-cream/glass/audacious-type aesthetic: only 1 stray hex in any .vue (ColorSwatch.vue:26 `#3a7bd5` — a v-model default-value in a DOC COMMENT, legitimate consumer data not a paint token), pill/circle radii (SortableList 999px, Pulse 9999px, timeline 50%) are correct geometry not radius-token drift, the Progress hsl(0 0% 100%)/hsl(0 0% 0%) are pure white catch-lights + black shadow inks (achromatic-by-physics house pattern), zero :global() footguns in any scoped block (§8 GREEN), zero central-recipe duplication in scoped blocks (§7 GREEN), all 8 carved partial dirs hold every file <500 lines (sizing.css 499 at the edge, compliant).
- **do:** KEEP. The aesthetic is cohesive; the only true drift is the TypewriterText neutral-gray (separate finding). No off-token shadow/radius/hue cohesion issues beyond it.
- isomorphic: true · effort S · risk LOW

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/components/custom/timeline/ContinuousMarkers.vue:233, src/components/custom/timeline/SegmentedTimeline.vue:173
- **what:** The marker-dot drop-shadow recipe 'box-shadow: 0 1px 2px color-mix(in srgb, var(--shadow-color) 12%, transparent)' is repeated verbatim across two timeline SFC scoped blocks (ContinuousMarkers.vue:233 + SegmentedTimeline.vue:173).
- **do:** KEEP. Only 2 sites, both inside ONE feature-dir's <style scoped> blocks (the timeline family — GlassTimeline → ContinuousTimeline/ScrubberTimeline/SegmentedTimeline → ContinuousMarkers/ContinuousRail, all internally consumed, only GlassTimeline exported). Per design-idioms §7 a one-component-private structure stays scoped; minting a --timeline-marker-shadow token for a 2-site within-family repeat is over-engineering (the ≥2-CENTRAL-consumer bar is not met — both are the same family). Below the churn threshold.
- isomorphic: true · effort S · risk LOW

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/styles/tokens/scale-paper.css:100-122, demo/stories/story-hero.css:13-16
- **what:** Two grid-background implementations exist: the LIBRARY --paper-grid-* family (32px minor / 128px major blueprint grid on the card host, the .paper-grid utility — scale-paper.css + cards.css + Card.vue) and the DEMO --story-grid-* family (28px blueprint grid for StoryHero page backgrounds — demo/stories/story-hero.css).
- **do:** KEEP. Deliberate library-vs-demo pair, not duplication: scale-paper.css:100-101 explicitly records the library grid is 're-expressed as a library [token], the demo .story-bg-grid speaks'. Different cells (32px vs 28px), different surfaces (card interior felt-through-glass vs full-page background), and the demo is a CONSUMER (presets-in-consumers fence). Merging would force the library token onto the demo's page-background sizing — wrong axis.
- isomorphic: true · effort S · risk LOW

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/components/custom/watercolor-dot/prng.ts:7
- **what:** watercolor-dot/prng.ts looks like a parallel PRNG implementation alongside the shared src/utils/prng.ts.
- **do:** KEEP. It is NOT a fork — it re-exports { mulberry32, hashString } from the shared ../../../utils/prng leaf and only ADDS watercolor-local helpers (randomRadii/radiiToCSS). Verified all 6 other custom dirs (constellation, handmark/geometry+ink, goo-blob, fourier-field) import the SAME shared core — the AV.W14 single-source discipline holds repo-wide, zero copied mulberry32 bodies.
- isomorphic: true · effort S · risk LOW

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/components/ui/carousel/CarouselPager.vue, src/components/custom/pager-dots/PagerDots.vue
- **what:** CarouselPager.vue and PagerDots both touch 'pager' surfaces — possible parallel pager implementations.
- **do:** KEEP. Disjoint registers: CarouselPager is a chevron prev/next + 'X / N' counter control (composes .glass-pager-ring); PagerDots is the dot-ring indicator (the BA.W-PAGER unified register that already absorbed CarouselDots). They share the .glass-pager-ring chassis (surfaces.css) — the dedup already happened. No overlap to merge.
- isomorphic: true · effort S · risk LOW

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/styles/dock-controls/
- **what:** The src/styles/dock-controls/ dir splits the 5 dock control families into 5 partials (icon-button 143L, tab-button 143L, dark-mode-toggle 109L, triggers 135L, touch-floor 94L) — possible over-split.
- **do:** KEEP. Each partial is a cohesive distinct control family under the 500-line bound, with the thin dock-controls.css root carrying the shared :where() comma-group (the AZ.W-CARVE discipline, design-idioms §5). Merging back to one file would re-create the AU.W8b.3 god-module. Correctly carved by cohesion, not over-split.
- isomorphic: true · effort S · risk LOW

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/styles/tokens/shadow.css, src/styles/theme/literals.css
- **what:** The repeated color-mix(in srgb, var(--shadow-color) N%, transparent) recipe appears 30+ times repo-wide (shadow-color 12% ×10, 8% ×7, etc.).
- **do:** KEEP. This is the DOCUMENTED house shadow-composition convention (CLAUDE.md Conventions: 'All shadows compose via color-mix(in srgb, var(--shadow-color) N%, transparent) over --shadow-color: var(--foreground)'). The recurrence is concentrated in tokens/shadow.css where the named --shadow-* tokens are DEFINED (the source-of-record); consumers read the named tokens, not the raw mix. The few SFC-level pastes (timeline) are within-family scoped. Not duplication — it is the token-generation site.
- isomorphic: true · effort S · risk LOW

### [A8-dry-kiss] /Users/mkbabb/Programming/glass-ui/src/styles/theme/bridges.css, src/styles/theme/literals.css, src/styles/theme/radius.css
- **what:** The 261 raw 'no var() reader' tokens my first sweep flagged (incl. --z-index-*, --blur-glass-*, --shadow-glass-*, --spacing-icon-*, --transition-duration-*, --text-*, --tracking-*, --ease-spring-*, --color-rainbow-*, --radius-button/control/field/tooltip/xs, --metal-shimmer-color, --glass-bg-floating-tinted, --glass-btn-press-t, --glass-backdrop-luma).
- **do:** KEEP — all false positives. They resolve via channels a naive var() grep misses: (a) @theme/@theme inline aliases that GENERATE Tailwind utilities (z-toast, blur-glass-floating, rounded-button, text-shadow-*); (b) the Tailwind shorthand bg-(--token) form (--glass-bg-floating-tinted read in button/index.ts:44); (c) JS setProperty writes (--glass-btn-press-t in Button.vue:118, --glass-backdrop-luma in useGlassBackdropLuminance.ts:311); (d) @keyframes-internal reads (--metal-shimmer-color in metal-shimmer-sweep); (e) getComputedStyle JS reads (--constellation-* in constellationDraw.ts:53). A dead-token gate must account for all five forms — the existing proof gates evidently do (the codebase keeps deliberately-pinned dead tokens with recorded rationale). Do NOT prune.
- isomorphic: true · effort S · risk LOW


---
## Per-area summaries

### A1-god-modules — GOD-MODULE BREAKUP (files >450 lines)
Headline: the src/ side is essentially CLEAN — the no-god-module gate (scripts/proof-no-god-module.mjs, HARD_LIMIT 500, scans src/ ONLY, RATCHET_BASELINES=={} drained) is satisfied by every remaining src file, and the prompt's snapshot is stale (mediums.glsl.ts is already carved away — does not exist; the live aurora shaders moved to constants/shaders/). The 8 src files in the 450-500 band are all either pure data/shader strings (legitimately long, fenced) or already-colocated SFCs whose composables were carved (BB.W-CARVE3/4/5). The real targets are demo/ SFCs, which the gate does NOT police — and most are cohesive single-purpose story pages. Counts: PRUNE 0, SPLIT 1 (AppShell morph-stage extraction), DEDUPE 1 (constellation draw-overlay helper), KEEP-AS-IS 13.

METHOD: Read CLAUDE.md (in-context) + docs/precepts/design-idioms.md §5 (cohesion-aware @import-partial carve) + §7 (colocation feature-dir convention). Measured every target with wc -l, mapped SFC script/template/style boundaries with grep, inspected each src file's internal structure (composable i

### A2-prune-census: component prune census (src/components/custom/ ×42, ui/ ×44, composables)
Headline: the component surface is overwhelmingly healthy under J-inv-10 — nearly every published package clears ≥2-consumers OR has a consumer-evidence booking. ONE clean PRUNE surfaced (FocusScope: a zero-consumer verbatim reka pass-through in ui/ that escapes proof:component-orphan because that gate is custom/-scoped only). The glass-card/material/panel sprawl the user named is ALREADY fully owned by BC.W-GLASS-PRUNE (GlassPanel + useGlassRenderer retire) — I complement, do not duplicate it. Counts: PRUNE 1 (FocusScope) · HOLD 4 (orphan-gate coverage gap, ColorSwatch booked-migration-pending, useAnimatedNumberMap exported-but-consumerless, ConfirmDialog opaque-not-glass) · KEEP-AS-IS the remaining ~80 packages (all evidenced).

METHODOLOGY: I read CLAUDE.md (structure/conventions/idioms) + design-idioms.md + BC.W-GLASS-PRUNE.md + BC DEFERRAL-LEDGER first to fit house vocabulary and AVOID duplicating BC scope. Consumer counts via grep over demo/ + src/ (excluding self-dir + subpaths/ + api/ + index.ts) + tests/, using each 

### A3-composables — COMPOSABLES + STATE/STORE CONSISTENCY (src/composables/ 9 sub-trees + every per-component composables/ dir)
The composables surface is in excellent shape — the area's load-bearing disciplines all hold. DI is uniformly the createStrictContext/createOptionalContext pair (the one raw inject — GooBlob BLOB_CONFIG_KEY — is the factory's own documented carve-out); single-source is rigorous (createSpecularWriter core with 2 deliveries + an angle wrapper; the useSpring→useSpringPress→useLiquidPress spring chain; springPresets.ts as the no-second-authority root feeding both the CSS regen + curves.ts; oklchToLinear single-sourced in composables/color); the root-barrel SCC discipline is meticulous (targeted re-exports, no wildcard leak of keyframes/vueuse-bearing leaves). Findings are dominated by KEEP-AS-IS + a few low-value cosmetic naming inconsistencies (all isomorphic). Counts: prune 0, refactor 0 high-value, rename 2 (low-priority, optional), dedupe 0 (all near-twins are recorded legitimate divergences), keep/hold 6.

Scope walked: all 9 src/composables/ sub-trees (color/context/dark/dom/glass/motion/reactive/sidebar/sortable) + every per-component composables/ dir (17 dirs) + the 7 component-root use* files. Grounding: read createContext.ts (the DI factory) in full; usePointerVelocityField/cursorModel/useSpecula

### A4-colocation (colocation + logical grouping)
The feature-dir colocation idiom is in very good shape: proof:colocation PASSES (14 README-derived targets all constants/composables/readme-clean), the styles/ tree is an exemplary thin-@import-root-over-cohesive-partials carve (theme/, typography/, tokens/, glass/, utilities/, dock/, dock-controls/), the subpaths/ mirror is the documented trivial one-liner set, and the algorithm-modules-at-root vs composables/-for-Vue-wrappers split (constellation, handmark, timeline) is a consistent, sane house pattern. The ONE genuine COLOCATE candidate is configurator/ (a 3-SFC + composable + DI-module family that keeps its composable + DI module at the package ROOT and has no README, so it escapes the gate). All other potential flags resolve to KEEP-AS-IS — recorded keeps or correct simple-dir layouts. Counts: COLOCATE 1, KEEP-AS-IS 8, notes-only on the rest.

Scope discipline: I made ZERO edits (plan-posture). All findings are grounded in real file:line + measured line counts and the live `node scripts/proof-colocation.mjs` output (status PASS). The gate's target set is README-DERIVED (BA.W-HYGIENE deriveTargetDirs), so a complex dir without a README is 

### A5-brittle-selectors — CSS selectors + reactivity (src/ only, read-only assay)
The assay area is exceptionally clean — the house has already closed the chronics this assay targets. Headline: PRUNE 0, REFACTOR 2 (1 real multi-instance DOM-query bug, 1 redundant-deep micro), KEEP-confirmed 7. ZERO live :deep() in src (all 7 references are comments documenting their removal); ZERO :global() inside any <style scoped> (the vue-scoped :global() drop chronic is fully closed, allowlist empty); :slotted()/:has()/$attrs all used per the documented house idioms. Deepest CSS chain is 4 levels (one comma-grouped @container pair, house-owned BEM). The two actionable findings: (1) FuzzySearch.vue:34 document-global querySelector that breaks under multi-instance / dual-surface mount; (2) GooBlob.vue:160 a redundant { deep:true } on a getter that already snapshots to primitives.

Posture: read-only, zero edits made. The two REFACTOR findings are the only non-KEEP verdicts and both are S-effort/LOW-risk; everything else is a confirmed KEEP (verifying the chronics this assay targets are already closed). RANKED value: (1) FuzzySearch.vue:34 is the one genuine latent bug — a doc

### A6-tailwind-styling — non-idiomatic Tailwind + the 4 styling focuses (arbitrary values vs tokens, monolithic-vs-colocated stylesheet placement, deprecated/archaic CSS, fragile rules: magic numbers / brittle calc / viewport-unit traps / z-index coupling)
The styling surface is in exceptionally good health — the documented disciplines (var-in-arbitrary §6, cohesion-domain @import carve §5, token-first, clean-break retirements, scoped-dark-arm §8) are all live and holding. ZERO live var-in-arbitrary shorthand violations; ZERO archaic vendor prefixes (all -webkit-* are still-required Safari/WebKit paths); ZERO dead retired recipes (all popover-animate/btn-audacious/vaul/scroll-fade matches are clean-break docstrings, not live rules); z-index is a clean tokenized --z-* ladder with only correct LOCAL stacking literals; no SFC redefines a central glass recipe. Counts: prune 0, refactor 0, dedupe 0 actionable, style-fix 0 isomorphic, HOLD 2 (mobile-viewport + inline-important, both paint/behaviour decisions), KEEP-AS-IS 6 (including one high-value false-positive to record so a future cleanup doesn't break it). The single most important finding is defensive: the 14× repeated oklab glass-tint seam LOOKS like prime DRY bait but is DELIBERATELY element-local (the substitution-vs-inheritance trap) — flag it KEEP so it is not "fixed" into a regression.

METHOD: read CLAUDE.md (full, in-context) + docs/precepts/design-idioms.md §§1-12 first, then swept src/ (.vue + .css, excluding .glsl.ts/.wgsl.ts shaders per the GL fence). Verified each documented discipline is LIVE not just claimed.

WHAT IS NOT BROKEN (the clean bill — recorded so the orchestrat

### A7-design-idioms (design-idioms localization + cohesion)
The localized design-idiom home is REAL and SINGLE-SOURCE, and in strong shape: docs/precepts/design-idioms.md + the index.css cascade ledger are the one home, machine-locked by proof:precept-current (§3 home-map) + proof:design-idiom-localization (no text-[var]/shadow-[var] wraps) + proof:var-in-arbitrary-guard — all GREEN. @apply discipline is perfect (0 @apply in SFC scoped blocks; all 12 @apply live in CSS partials as idiomatic compositions). @theme is genuinely single-source (every real @theme block is in theme/*; the 5 out-of-theme hits are all comments). Cohesion is tight (1 stray neutral-gray, zero :global() footguns, zero central-recipe duplication in scoped blocks, all partials <500 lines). The findings are NARROW: 3 prose-drift spots in design-idioms.md that the gate structurally cannot parse (§2 calls theme.css "ONE file" post-carve; §5 carved-dir list is stale; §3 typography/dock-controls rows point at thin roots not the carved sub-partials), and 1 off-aesthetic neutral-gray on a published component. Counts: prune 0, refactor/doc-fix 4, dedupe-candidate 1 (KEEP), keep/confirm 4.

METHOD: read design-idioms.md + CLAUDE.md (structure/conventions) first, then diffed the doc's claimed home-map/dir-list against the disk cascade (index.css + every src/styles/*.css @import chain), ran both idiom gates for ground truth (proof:precept-current PASS, proof:design-idiom-localization PAS

### A8-dry-kiss — DRY/KISS repo-wide (duplication, CSS @import structure, parallel impls, over-abstraction, dead tokens/exports)
glass-ui is a heavily-disciplined, already-well-DRY'd codebase: prior waves ran W-DEAD-SWEEP (token sweeps), W-CARVE×5 (god-module drains to the 500-line bound), and enforce colocation + the ≥2-consumer bar + the subpaths/ mirror via dedicated proof:* gates. My exhaustive sweep found NO high-value structural duplication, NO parallel implementations to merge, NO over-split CSS partials, and NO orphan subpath barrels (72/72 resolve). The genuine findings are SMALL and conservative: 2 doc-drift items (the index.css cascade ledger trails the live @import chain; the glass-refract.css filename is stale post-.glass-lens-rename) and a residual cluster of ~5-6 genuinely-orphaned tokens (the W-DEAD-SWEEP tail). Counts: PRUNE 1 (dead-token cluster, gate-pin-pending), REFACTOR 0, STYLE-FIX/doc 2, KEEP-AS-IS 8 (false-positive duplication that is deliberate house pattern).

METHOD: Read CLAUDE.md + design-idioms.md first (token-first, component-over-class, ≥2-consumer, colocation, §5 carve, §7 colocation-CSS, §9 recorded divergences). Then: (1) ran a node-based dead-token sweep over all 908 src/styles tokens — but it has heavy false-positive rates because tokens resolv

