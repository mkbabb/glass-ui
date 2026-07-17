# Round 1 — component surface / overfit census (?)

## Summary

Across all 188 SFCs in src/components/ (68 families), the bespoke-config-prop median is 1, yet 20 components carry >=6 and 298/408 (73%) of bespoke props ship with <=1 consumer setter (140 never set anywhere, 158 set by exactly one file) — a large F04 'shape to be abrogated' surface the BI close left standing. The worst offenders are public exports leaking internal algorithm knobs (HandMark 11 dead WobbleOptions knobs, TypewriterText 11 dead typing-model knobs), single-consumer harnesses shipped as general components (DataTable: 458 LOC, one repo-wide consumer), and decorative-flag proliferation with non-neutral defaults (Card metal:'gold', grain:true). The doc's claimed 'standing' overfit gates do not run in the current tree (proof-component-orphan.mjs survives only in stale .claude/worktrees/, unreferenced by package.json) and operate only at whole-artefact granularity, so none of this prop-level surface is enforced against.

## Findings (15)

### [major] algorithm-knob-leak

**Claim:** HandMark (public export ./handmark) exposes 19 bespoke props, 11 of them (boilFps, boilFrames, drawDelayMs, drawMs, jagged, natural, overrides, path, points, roughness, segments) direct passthroughs to the internal pencil-boil WobbleOptions, none set by any consumer anywhere in the repo — the pure F04 'shape to be abrogated' class.

**Evidence:** src/components/handmark/types.ts:33-90 declares the 19-prop HandMarkProps; the 11 named props have ZERO consumer setters (tag-scoped scan of demo/+src/+tests/, and direct grep of 'boil-fps'/'draw-ms'/etc = 0). Every non-dead prop (brush,shape,color,seed,animation,appear,amplitude,box) is set only by the single story demo/stories/motion/handmark.vue. Public via package.json exports './handmark'.

**Proposed:** fold-into-BJ-F04: collapse to brush+shape+color+animation; move geometry/boil knobs behind a single Brush object or retire (no-backwards-compat clean break).

### [major] algorithm-knob-leak

**Claim:** TypewriterText (public ./typewriter) exposes 20 props, 11 of them internal typing-simulation tuning knobs (ngramSize, variance, errorRate-family: firstAnimationSpeedFactor, maxCharsBeforeNotice, continueAfterTypoProbability, sequentialTypoDecay, correctionSpeedMultiplier, deletingSpeed, startDelay, respectReducedMotion, cursorChar) with zero consumer setters.

**Evidence:** src/components/typewriter/TypewriterText.vue:51-90 (Props interface + withDefaults). Direct grep of 'ngram-size','continue-after-typo','sequential-typo','correction-speed','first-animation','max-chars-before' across demo/+tests/ = 0 files. Only text/words/baseSpeed/loop/cursorVisible are exercised, all in the single story demo/stories/motion/typewriter.vue (instances=2, the story + its tile).

**Proposed:** fold-into-BJ-F04: bury the typo-model knobs in one opinionated 'humanize' default; retire the individual magic-number props.

### [major] single-consumer-shipped-surface

**Claim:** DataTable (public ./data-table, 458 LOC, 20 props) is consumed by exactly ONE file in the entire repo, and 4 bespoke props are dead even in that one demo — a bespoke virtualization/ARIA harness shipped as a general component.

**Evidence:** Only consumer repo-wide: demo/stories/data/data-table.vue (grep '<DataTable' across demo/src/tests = 1 story + its own SFC/composable). DataTableProps at src/components/data-table/types.ts:45-108 carries getRowAttrs, getRowId, rowRef, cardBreakpoint — all DEAD (0 setters) — plus getRowIndex/tabbableRowId/selectedRowId/ariaColCount/ariaRowCount set only by that single demo. bespoke-prop median across 188 comps is 1; DataTable is 14.

**Proposed:** fold-into-BJ-F04: relay reduction question to user — either delete the caller-windowing/ARIA-index surface (getRowAttrs/getRowIndex/rowRef/tabbableRowId) or document a named external consumer; single-repo-consumer + dead surface fails the doc's own ≥2-consumer bar.

### [major] decorative-flag-proliferation

**Claim:** Card (public ./card) carries four overlapping style axes (variant + material + surface + tier) plus six dead decorative-texture flags, and its opinionated defaults are non-neutral (metal:'gold', grain:true) — directly contradicts the opinionated-defaults/KISS edict.

**Evidence:** src/components/card/Card.vue:15-24 (CardProps extends SurfaceProps) + defaults at Card.vue:31-39 include deep:false, grain:true, specular:'off', grid:false, metal:'gold'. Tag-scoped scan over 28 Card instances: metal, grain, grid, deep, specular, dataHueStrength are DEAD (0 setters); variant/selected/dataHue set by only card.vue. A general Card defaulting to gold metal + grain-on is the F04 abrogation target.

**Proposed:** fold-into-BJ-F04: collapse variant/material/surface/tier to one axis; retire metal/grid/deep/specular/dataHueStrength or gate them behind a single decorative preset.

### [major] variant-axis-proliferation

**Claim:** GlassDock (public ./dock) declares 16 props across 5 variant axes (12 values); the entire `position` axis (fixed|inline|sticky, 3 values) plus autoLuminance, containerName, viewTransitionName are dead across all 40 dock instances.

**Evidence:** src/components/dock/composables/useDockShellProps.ts:18 (DockProps). Tag-scoped scan over 40 GlassDock instances: position, autoLuminance, containerName, viewTransitionName = 0 setters; layout, interaction, search, size = 1 setter each. Variant axes from census: position[fixed,inline,sticky], shape[pill,rounded,card], orientation[h,v], overflow[grow,wrap], layout[linear,grid].

**Proposed:** fold-into-BJ-F04: retire the dead `position` variant axis + 3 dead knobs; the dock's own SFC comment already excised sibling machinery, extend that to the prop surface.

### [major] absent-gate-over-declared-enforcement

**Claim:** The overfitting-audit doc asserts two 'standing gates' (proof:component-orphan, proof:consumer-evidence-live) 'enforce the >=2-consumer bar continuously', but those gate scripts exist ONLY in stale .claude/worktrees/ — they are absent from scripts/ and unreferenced by package.json, so nothing enforces the bar, and even the gate is whole-artefact granularity, never prop-level.

**Evidence:** docs/audits/overfitting-audit.md:5 and :88 claim continuous enforcement. `ls scripts/*orphan*` = no matches; proof-component-orphan.mjs found only under .claude/worktrees/bi-p*/scripts/. package.json scripts have no proof:*/gate/orphan target (test=vitest run). Census shows 298/408 bespoke props (73%) with <=1 consumer setter — unchecked by any gate.

**Proposed:** build: either restore a runnable orphan gate wired into package.json OR correct the doc's 'standing/continuous' claim; add a prop-granularity dead-config check to catch the F04 class the artefact-level gate structurally cannot see.

### [minor] algorithm-knob-leak

**Claim:** FourierField (public ./fourier-field, 273 LOC) exposes 8 props of which 5 (color, colorResolver, freeze, intensity, seed) are dead across all 3 instances — a procedural-viz component whose config surface exists only to look configurable.

**Evidence:** src/components/fourier-field/FourierField.vue; tag-scoped scan: color, colorResolver, freeze, intensity, seed = 0 setters; the component appears in only 3 instances (single story + tiles). Public via package.json exports './fourier-field'.

**Proposed:** fold-into-BJ-F04: retire colorResolver/seed/freeze/intensity knobs to opinionated defaults; relay keep-or-cut question to user.

### [minor] leaky-cross-component-coupling

**Claim:** Slider (a form primitive, public ./slider) carries a dock-awareness prop `keepDockOpen` (default true) that is never set by any consumer — a control primitive encoding knowledge of an unrelated dock component.

**Evidence:** src/components/slider/types.ts:25 `keepDockOpen?: boolean`; default true at Slider.vue:27; wired to useDockHold at Slider.vue:97. Tag-scoped scan over 34 Slider instances: keepDockOpen = 0 setters (DEAD). Couples the slider surface to dock internals with no consumer demand.

**Proposed:** retire: move dock-hold behavior into the dock context/provide rather than a slider prop; clean break.

### [minor] demo-device-shipped-as-component

**Claim:** Configurator (public ./configurator, 383 LOC, 10 props) is a demo-configuration device on the public surface; layers, activeLayer, asideWidth are dead and its consumers are the demo shell only.

**Evidence:** src/components/configurator/Configurator.vue; tag-scoped scan: activeLayer, asideWidth, layers = 0 setters; asideSide/size set by 1 file each (VizStudio.vue/configurator.vue). Public via package.json exports './configurator'. Sibling ConfiguratorRow (224 LOC) is consumed only within the configurator family.

**Proposed:** fold-into-BJ-F04 or demo-only-private: relocate under demo/ private helpers unless a named external consumer is documented (fails the doc's own >=2-consumer bar).

### [minor] single-consumer-shipped-surface

**Claim:** Constellation (public ./constellation, 16 props) has its bespoke surface exercised almost entirely by its own single story; freeze, parallax, speed are dead and 8 further props are single-consumer.

**Evidence:** src/components/constellation/Constellation.vue; tag-scoped scan over 11 instances: freeze, parallax, speed = 0 setters; accentEdges, pinned, pointerReactive, wander, warpAutoRelease, warpOnClick, backgroundInteractive = 1 setter each (own story + StoryHero). Public via package.json exports './constellation'.

**Proposed:** fold-into-BJ-F04: retire freeze/parallax/speed; relay the physics-knob surface reduction to user.

### [minor] decorative-flag-proliferation

**Claim:** DialogContent (9 bespoke props, 498 LOC) adds a 4-value `stage` variant axis (none|dim|scale|immersive) plus placement/backdrop knobs, all driven by a single consumer — configuration surface beyond any exercised need.

**Evidence:** src/components/dialog/DialogContent.vue; census variant axis stage:[none,dim,scale,immersive]; tag-scoped scan over 24 instances shows the stage/backdrop-halo cohort set by 1 story. Recent commits (24b63d01, 189ae15c) added the --glass-halo-* token cohort + graded backdrop axis — surface growth at close time.

**Proposed:** fold-into-BJ-F04: verify each stage value has a live demo; collapse dim/scale/immersive if visually duplicative (mirrors the F08 aurora-preset reduction).

### [minor] wrapper-surface-duplication

**Claim:** The labeled-field family (LabeledSelect 12 props, LabeledInput/LabeledSlider/LabeledSwitch) re-declares field surface (errorLive, invalid, layout, requirement dead on LabeledSelect) that duplicates the wrapped control's own props.

**Evidence:** src/components/labeled-field/LabeledSelect.vue: tag-scoped scan over 14 instances shows errorLive, invalid, layout, requirement, placeholder, required, disabled = 0 setters (7/12 dead). The wrappers restate LabeledField + inner-control axes.

**Proposed:** fold-into-BJ-F04: thin the Labeled* wrappers to slot-forwarding; retire the duplicated validation/layout props.

### [minor] single-consumer-shipped-surface

**Claim:** The easing family (public ./easing: EasingPicker 7 props/519 LOC + EasingConfigurator 6 props) are single-consumer demo devices; label, playback, readout (Picker) and preset, steps, term (Configurator) are dead.

**Evidence:** src/components/easing/EasingPicker.vue + EasingConfigurator.vue; tag-scoped scan: EasingPicker label/playback/readout = 0 setters, whole component in 4 instances; EasingConfigurator preset/steps/term = 0 setters, 3 instances. Public via package.json exports './easing'.

**Proposed:** fold-into-BJ-F04 / demo-only-private: relay whether easing tooling belongs on the public surface at all.

### [note] algorithm-knob-leak

**Claim:** AnimatedDigit and WatercolorDot ship procedural knobs with no consumer: AnimatedDigit damping/digitCount/mode are dead; WatercolorDot (316 LOC, 6 bespoke props) is single-consumer with a solid|ghost variant.

**Evidence:** src/components/animated-digit/AnimatedDigit.vue tag-scan: damping, digitCount, mode = 0 setters; src/components/watercolor-dot/WatercolorDot.vue: variant[solid,ghost] + 5 further bespoke props mostly single-consumer over 7 instances. Both public subpath exports.

**Proposed:** fold-into-BJ-F04: retire the dead physics knobs to opinionated defaults.

### [note] passthrough-surface-inflation

**Claim:** Progress (public ./progress, 12 props) inflates its surface with reka-ui passthroughs never used (as, asChild, getValueLabel, getValueText dead) while every meaningful prop is set only by its own story — 299 LOC for a single-consumer bar.

**Evidence:** src/components/progress/Progress.vue; tag-scoped scan over 16 instances: as, asChild, getValueLabel, getValueText = 0 setters; modelValue, max, marks, status, orientation, indeterminate = 1 setter each (own story). Only `variant` reaches 2 consumers.

**Proposed:** fold-into-BJ-F04: drop the unused reka passthroughs (as/asChild/getValue*); confirm the 299 LOC is warranted for the exercised surface.

